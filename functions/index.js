/* Knacka – SMS via 46elks + AI-svar (Claude)
 *
 * sendSms      (callable)  – appen skickar personliga SMS till valda leads
 * incomingSms  (webhook)   – 46elks anropar denna när en kund svarar; AI svarar
 *
 * Hemligheter (firebase functions:secrets:set …):
 *   ELKS_USER, ELKS_PASS  – API-användare/lösenord från 46elks
 *   ANTHROPIC_KEY         – API-nyckel från console.anthropic.com
 *   WEBHOOK_KEY           – valfri lång slumpsträng, läggs i webhook-adressen
 */
const {onCall, onRequest, HttpsError} = require("firebase-functions/v2/https");
const {defineSecret} = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();
const FV = admin.firestore.FieldValue;

const ELKS_USER = defineSecret("ELKS_USER");
const ELKS_PASS = defineSecret("ELKS_PASS");
const ANTHROPIC_KEY = defineSecret("ANTHROPIC_KEY");
const WEBHOOK_KEY = defineSecret("WEBHOOK_KEY");

const REGION = "europe-north1";
const MODEL = "claude-haiku-5-5";
const MAX_AI_REPLIES_PER_DAY = 5;

/* ---------- helpers ---------- */
function e164(p) {
  let s = String(p || "").replace(/[^\d+]/g, "");
  if (!s) return "";
  if (s.startsWith("00")) s = "+" + s.slice(2);
  if (s.startsWith("0")) s = "+46" + s.slice(1);
  if (!s.startsWith("+")) s = "+" + s;
  return /^\+\d{8,15}$/.test(s) ? s : "";
}
const today = () => new Date().toLocaleDateString("sv-SE", {timeZone: "Europe/Stockholm"});

async function elksSend(from, to, message) {
  const body = new URLSearchParams({from, to, message});
  const auth = Buffer.from(ELKS_USER.value() + ":" + ELKS_PASS.value()).toString("base64");
  const r = await fetch("https://api.46elks.com/a1/sms", {
    method: "POST",
    headers: {"Authorization": "Basic " + auth, "Content-Type": "application/x-www-form-urlencoded"},
    body,
  });
  const txt = await r.text();
  if (!r.ok) throw new Error("46elks " + r.status + ": " + txt.slice(0, 200));
  return JSON.parse(txt);
}

async function settings() {
  const s = await db.collection("settings").doc("main").get();
  return s.exists ? s.data() : {};
}
function statusByFlag(st, flag, fallback) {
  const list = Array.isArray(st.statuses) && st.statuses.length ? st.statuses : [];
  const f = list.find((x) => x.flag === flag);
  return f ? f.k : fallback;
}

/* ---------- 1. send personal SMS to selected leads ---------- */
exports.sendSms = onCall({region: REGION, secrets: [ELKS_USER, ELKS_PASS]}, async (req) => {
  if (!req.auth) throw new HttpsError("unauthenticated", "Logga in först.");
  const me = await db.collection("users").doc(req.auth.uid).get();
  if (!me.exists || !me.data().active) throw new HttpsError("permission-denied", "Kontot är inte aktivt.");
  const items = Array.isArray(req.data && req.data.items) ? req.data.items.slice(0, 200) : [];
  if (!items.length) throw new HttpsError("invalid-argument", "Inga mottagare.");

  const st = await settings();
  const from = st.elksFrom;
  if (!from) throw new HttpsError("failed-precondition", "Inget avsändarnummer är inställt (Mer → SMS-inställningar).");
  const sentKey = statusByFlag(st, "smssent", "smss");

  const results = [];
  for (const it of items) {
    const ref = db.collection("leads").doc(String(it.id));
    const snap = await ref.get();
    if (!snap.exists) { results.push({id: it.id, ok: false, error: "finns inte"}); continue; }
    const l = snap.data();
    const to = e164(l.phone);
    const text = String(it.text || "").slice(0, 640);
    if (!to) { results.push({id: it.id, ok: false, error: "inget nummer"}); continue; }
    if (l.smsOptOut) { results.push({id: it.id, ok: false, error: "avregistrerad"}); continue; }
    if (!text) { results.push({id: it.id, ok: false, error: "tom text"}); continue; }
    try {
      const r = await elksSend(from, to, text);
      const now = Date.now();
      await ref.set({
        phoneE164: to, status: sentKey, smsSent: today(), updated: now,
        hist: FV.arrayUnion({t: now, rep: req.auth.uid, s: sentKey, via: "46elks"}),
        sms: FV.arrayUnion({t: now, dir: "out", by: req.auth.uid, text, id: r.id || null}),
      }, {merge: true});
      results.push({id: it.id, ok: true});
    } catch (e) {
      logger.error("sendSms", e);
      results.push({id: it.id, ok: false, error: String(e.message || e).slice(0, 120)});
    }
  }
  return {results};
});

/* ---------- 2. incoming SMS → AI reply ---------- */
const SYSTEM = (st, lead, seller) => `Du svarar på SMS för Fiskaren.nu, ett företag i Stockholm som levererar fisk och skaldjur hem till dörren, oftast som prenumeration.
Kunden fick ett SMS från säljaren ${seller || "Fiskaren"} efter att hen knackat dörr${lead.street ? " på " + lead.street + " " + (lead.num || "") : ""}. Kundens namn: ${[lead.first, lead.last].filter(Boolean).join(" ") || "okänt"}.

FAKTA (använd bara detta – hitta aldrig på priser, produkter, datum eller löften):
${st.aiInfo || "(ingen produktinfo inlagd – be kunden kolla fiskaren.nu eller säg att säljaren hör av sig)"}

REGLER:
- Svara på svenska (eller kundens språk), kort: högst 300 tecken, vänligt och personligt, som en människa på företaget. Inga emojis i överflöd, inga länkar utom fiskaren.nu.
- Nämn aldrig att varorna är frysta eller färska och skriv inget om fångst eller frysning.
- Kan du inte svara säkert utifrån FAKTA, eller vill kunden beställa, boka, ändra något, klaga eller prata med en människa: säg vänligt att ${seller || "säljaren"} hör av sig snart, och sätt handoff=true.
- Säg aldrig att du är en AI om du inte blir tillfrågad; blir du tillfrågad, svara ärligt att det är ett automatiskt svar och att en människa kan höra av sig.
- Lova inga rabatter eller leveransdagar som inte står i FAKTA.
- Om kunden inte vill ha fler SMS: bekräfta kort, intent="stop".

Svara ENDAST med JSON: {"reply":"…","intent":"interested|order|question|not_interested|stop|other","handoff":true|false}`;

async function askClaude(system, history) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {"x-api-key": ANTHROPIC_KEY.value(), "anthropic-version": "2023-06-01", "content-type": "application/json"},
    body: JSON.stringify({model: MODEL, max_tokens: 400, system, messages: history}),
  });
  const j = await r.json();
  if (!r.ok) throw new Error("Claude " + r.status + ": " + JSON.stringify(j).slice(0, 200));
  const text = (j.content || []).map((c) => c.text || "").join("").trim();
  const m = text.match(/\{[\s\S]*\}/);
  const out = JSON.parse(m ? m[0] : text);
  out.reply = String(out.reply || "").slice(0, 600);
  return out;
}

exports.incomingSms = onRequest({region: REGION, secrets: [ELKS_USER, ELKS_PASS, ANTHROPIC_KEY, WEBHOOK_KEY]}, async (req, res) => {
  try {
    if (req.query.key !== WEBHOOK_KEY.value()) { res.status(403).send(""); return; }
    const from = e164(req.body.from);
    const message = String(req.body.message || "").trim().slice(0, 1000);
    if (!from || !message) { res.status(200).send(""); return; }

    const q = await db.collection("leads").where("phoneE164", "==", from).limit(1).get();
    if (q.empty) { logger.info("SMS från okänt nummer", from); res.status(200).send(""); return; }
    const ref = q.docs[0].ref;
    const lead = q.docs[0].data();
    const now = Date.now();
    await ref.set({sms: FV.arrayUnion({t: now, dir: "in", text: message}), smsUnread: true, updated: now}, {merge: true});

    // STOP – avregistrera, svara en gång
    if (/^\s*(stopp?|stop|avsluta|avregistrera)\b/i.test(message)) {
      const bye = "Du är avregistrerad och får inga fler SMS från Fiskaren.nu. Ha en fin dag!";
      await ref.set({smsOptOut: true, smsOk: false, sms: FV.arrayUnion({t: now + 1, dir: "out", by: "ai", text: bye})}, {merge: true});
      res.set("Content-Type", "text/plain").status(200).send(bye); return;
    }
    if (lead.smsOptOut) { res.status(200).send(""); return; }

    // max AI-svar per dag
    const d = today();
    const aiToday = (lead.sms || []).filter((x) => x.by === "ai" && new Date(x.t).toLocaleDateString("sv-SE", {timeZone: "Europe/Stockholm"}) === d).length;
    if (aiToday >= MAX_AI_REPLIES_PER_DAY) {
      await ref.set({needsAttention: true}, {merge: true});
      res.status(200).send(""); return;
    }

    const st = await settings();
    if (st.aiSmsOn === false) { await ref.set({needsAttention: true}, {merge: true}); res.status(200).send(""); return; }
    const seller = lead.owner ? ((await db.collection("users").doc(lead.owner).get()).data() || {}).name : "";
    const history = (lead.sms || []).concat([{dir: "in", text: message}]).slice(-12)
      .map((x) => ({role: x.dir === "in" ? "user" : "assistant", content: x.text}));
    // Claude kräver att första meddelandet är från användaren
    while (history.length && history[0].role !== "user") history.shift();
    // slå ihop följd av samma roll
    const msgs = [];
    for (const h of history) { if (msgs.length && msgs[msgs.length - 1].role === h.role) msgs[msgs.length - 1].content += "\n" + h.content; else msgs.push({...h}); }
    // ge AI:n vårt första SMS som kontext
    const firstOut = (lead.sms || []).find((x) => x.dir === "out");
    const sys = SYSTEM(st, lead, seller) + (firstOut ? `\n\nDitt första SMS till kunden var: "${firstOut.text}"` : "");

    const ai = await askClaude(sys, msgs);
    const patch = {sms: FV.arrayUnion({t: Date.now(), dir: "out", by: "ai", text: ai.reply, intent: ai.intent || "other"}), updated: Date.now()};
    if (ai.handoff || ai.intent === "order" || ai.intent === "interested") patch.needsAttention = true;
    if (ai.intent === "interested" || ai.intent === "order") {
      const leadKey = statusByFlag(st, "lead", "lead");
      patch.status = leadKey;
      patch.hist = FV.arrayUnion({t: Date.now(), rep: "ai", s: leadKey, via: "sms"});
    }
    if (ai.intent === "stop") { patch.smsOptOut = true; patch.smsOk = false; }
    await ref.set(patch, {merge: true});
    res.set("Content-Type", "text/plain").status(200).send(ai.reply || "");
  } catch (e) {
    logger.error("incomingSms", e);
    res.status(200).send(""); // svara aldrig med fel till kunden
  }
});
