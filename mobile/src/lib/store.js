import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, doc, onSnapshot, setDoc, getDoc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from './firebase';
import { makeStatus } from './status';
import { setLang, t } from './i18n';
import { DAY, dstr, todayStr, inPoly } from './util';
import { recordFix } from './tracking';

export const CHEF_EMAILS = ['hej@fiskaren.nu', 'karen@fiskaren.nu'];
const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }) {
  const [phase, setPhase] = useState('loading'); // loading | signedOut | verify | pending | ready
  const [user, setUser] = useState(null);
  const [me, setMe] = useState(null);
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [areas, setAreas] = useState([]);
  const [settings, setSettings] = useState({});
  const [live, setLive] = useState([]);
  const [here, setHere] = useState(null);
  const [toast, setToast] = useState(null);
  const [lang, setLangState] = useState('en');
  const pendingName = useRef('');
  const toastTimer = useRef(null);
  const hereRef = useRef(null);

  // language preference
  useEffect(() => { AsyncStorage.getItem('knacka-lang').then((l) => { if (l) { setLang(l); setLangState(l); } }).catch(() => {}); }, []);
  const changeLang = useCallback((l) => { setLang(l); setLangState(l); AsyncStorage.setItem('knacka-lang', l).catch(() => {}); }, []);

  const showToast = useCallback((msg, action, fn) => {
    clearTimeout(toastTimer.current);
    setToast({ msg, action, fn, id: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), action ? 5000 : 2400);
  }, []);

  // ---------- auth + profile ----------
  useEffect(() => {
    let offProfile = null;
    const off = onAuthStateChanged(auth, async (u) => {
      if (offProfile) { offProfile(); offProfile = null; }
      setUser(u);
      if (!u) { setMe(null); setPhase('signedOut'); return; }
      setPhase('loading');
      const ref = doc(db, 'users', u.uid);
      let snap = null;
      try { snap = await getDoc(ref); } catch (e) { snap = null; }
      if (!snap || !snap.exists()) {
        const email = (u.email || '').toLowerCase();
        const chef = CHEF_EMAILS.includes(email);
        if (chef && !u.emailVerified) { setPhase('verify'); return; }
        const name = pendingName.current || email.split('@')[0].replace(/^./, (c) => c.toUpperCase());
        try { await setDoc(ref, { name, email: u.email, role: chef ? 'chef' : 'saljare', active: chef, created: Date.now() }); }
        catch (e) { console.warn(e); setPhase('pending'); return; }
      }
      offProfile = onSnapshot(ref, (s) => {
        const d = s.data();
        if (!d) return;
        setMe({ id: s.id, ...d });
        setPhase(d.active ? 'ready' : 'pending');
      }, () => setPhase('pending'));
    });
    return () => { off(); if (offProfile) offProfile(); };
  }, []);

  // ---------- live data ----------
  useEffect(() => {
    if (phase !== 'ready') return undefined;
    const offs = [
      onSnapshot(collection(db, 'users'), (q) => setUsers(q.docs.map((d) => ({ id: d.id, ...d.data() })))),
      onSnapshot(collection(db, 'leads'), (q) => setLeads(q.docs.map((d) => { const x = { id: d.id, ...d.data() }; x.hist = x.hist || []; return x; }))),
      onSnapshot(collection(db, 'areas'), (q) => setAreas(q.docs.map((d) => { const x = d.data(); return { id: d.id, name: x.name, rep: x.rep, color: x.color, poly: (x.poly || []).map((p) => [p.lat, p.lng]) }; }))),
      onSnapshot(doc(db, 'settings', 'main'), (s) => setSettings(s.data() || {})),
    ];
    // only the chef follows the team's live positions
    if (me?.role === 'chef') offs.push(onSnapshot(collection(db, 'live'), (q) => setLive(q.docs.map((d) => ({ id: d.id, ...d.data() }))), () => {}));
    return () => offs.forEach((f) => f());
  }, [phase, me?.role]);

  // ---------- my position (foreground) ----------
  useEffect(() => {
    if (phase !== 'ready') return undefined;
    let sub = null; let cancelled = false;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted' || cancelled) return;
      sub = await Location.watchPositionAsync({ accuracy: Location.Accuracy.High, distanceInterval: 8 }, (p) => {
        const h = { lat: p.coords.latitude, lng: p.coords.longitude, t: Date.now(), acc: p.coords.accuracy };
        hereRef.current = h; setHere(h); recordFix(h);
      });
    })();
    return () => { cancelled = true; if (sub) sub.remove(); };
  }, [phase]);
  const posNow = useCallback(() => { const h = hereRef.current; return h && Date.now() - h.t < 180000 ? { lat: h.lat, lng: h.lng } : {}; }, []);

  // ---------- derived ----------
  const S = useMemo(() => makeStatus(settings.statuses), [settings.statuses]);
  const isChef = me?.role === 'chef';
  const team = useMemo(() => users.filter((u) => u.active), [users]);
  const rep = useCallback((id) => (id === 'ai' ? { name: 'AI' } : users.find((u) => u.id === id) || { name: '—' }), [users]);
  const areaOf = useCallback((lat, lng) => areas.find((a) => a.poly.length > 2 && inPoly(lat, lng, a.poly)) || null, [areas]);
  const leadById = useCallback((id) => leads.find((l) => l.id === id), [leads]);

  // ---------- actions ----------
  const updLead = useCallback((id, patch) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    return setDoc(doc(db, 'leads', id), { ...patch, updated: Date.now() }, { merge: true }).catch((e) => { console.warn(e); showToast(t('err_gen')); });
  }, [showToast]);

  const setStatus = useCallback((lead, k) => {
    Haptics.selectionAsync().catch(() => {});
    const h = { t: Date.now(), rep: user.uid, s: k, ...posNow() };
    const before = { status: lead.status || 'ny', revisit: lead.revisit || null, owner: lead.owner || null };
    const patch = { status: k };
    if (S.isRevisit(k) && !lead.revisit) patch.revisit = dstr(new Date(Date.now() + 14 * DAY));
    if (S.isClosed(k)) patch.revisit = null;
    if (!lead.owner) patch.owner = user.uid;
    setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, ...patch, hist: [...(l.hist || []), h] } : l)));
    setDoc(doc(db, 'leads', lead.id), { ...patch, hist: arrayUnion(h), updated: Date.now() }, { merge: true }).catch((e) => console.warn(e));
    showToast(t('statusSet') + S.st(k).label, t('undo'), () => {
      setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, ...before, hist: (l.hist || []).filter((x) => x.t !== h.t || x.s !== h.s) } : l)));
      setDoc(doc(db, 'leads', lead.id), { ...before, hist: arrayRemove(h), updated: Date.now() }, { merge: true }).catch(() => {});
      showToast(t('undone'));
    });
  }, [user, S, posNow, showToast]);

  const addNote = useCallback((lead, text) => {
    const n = { t: Date.now(), rep: user.uid, text, ...posNow() };
    setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, notes: [...(l.notes || []), n] } : l)));
    setDoc(doc(db, 'leads', lead.id), { notes: arrayUnion(n), updated: Date.now() }, { merge: true }).catch(() => {});
    showToast(t('noteAdded'));
  }, [user, posNow, showToast]);

  const newLeadAt = useCallback(async (lat, lng) => {
    const ref = doc(collection(db, 'leads'));
    const lead = { lat, lng, street: '', num: '', first: '', last: '', phone: '', email: '', note: '', status: 'ny', revisit: null, meeting: null, owner: user.uid, created: Date.now(), updated: Date.now(), hist: [{ t: Date.now(), rep: user.uid, type: 'create', ...posNow() }] };
    setLeads((ls) => [...ls, { id: ref.id, ...lead }]);
    setDoc(ref, lead).catch((e) => console.warn(e));
    // native reverse geocoding (Apple/Google) fills street, number, zip, city
    Location.reverseGeocodeAsync({ latitude: lat, longitude: lng }).then((r) => {
      const a = r && r[0]; if (!a) return;
      const patch = {};
      if (a.street) patch.street = a.street;
      if (a.streetNumber) patch.num = a.streetNumber;
      if (a.postalCode) patch.zip = a.postalCode;
      if (a.city || a.subregion) patch.city = a.city || a.subregion;
      if (Object.keys(patch).length) updLead(ref.id, patch);
    }).catch(() => {});
    return ref.id;
  }, [user, posNow, updLead]);

  const setMeeting = useCallback((lead, ts) => {
    const h = { t: Date.now(), rep: user.uid, type: 'appt', meeting: ts || null, ...posNow() };
    setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, meeting: ts || null, hist: [...(l.hist || []), h] } : l)));
    setDoc(doc(db, 'leads', lead.id), { meeting: ts || null, hist: arrayUnion(h), updated: Date.now() }, { merge: true }).catch(() => {});
  }, [user, posNow]);
  const editNote = useCallback((lead, n, text) => {
    const notes = (lead.notes || []).map((x) => (x.t === n.t && x.text === n.text ? { ...x, text } : x));
    setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, notes } : l)));
    setDoc(doc(db, 'leads', lead.id), { notes, updated: Date.now() }, { merge: true }).catch(() => {});
  }, []);
  const deleteNote = useCallback((lead, n) => {
    const notes = (lead.notes || []).filter((x) => !(x.t === n.t && x.text === n.text));
    setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, notes } : l)));
    setDoc(doc(db, 'leads', lead.id), { notes, updated: Date.now() }, { merge: true }).catch(() => {});
  }, []);

  const deleteLead = useCallback((id) => { setLeads((ls) => ls.filter((l) => l.id !== id)); return deleteDoc(doc(db, 'leads', id)).catch(() => {}); }, []);
  const assignLead = useCallback((lead, to) => {
    const h = { t: Date.now(), rep: user.uid, type: 'assign', to, ...posNow() };
    setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, owner: to, hist: [...(l.hist || []), h] } : l)));
    setDoc(doc(db, 'leads', lead.id), { owner: to, hist: arrayUnion(h), updated: Date.now() }, { merge: true }).catch(() => {});
    showToast(t('saved'));
  }, [user, posNow, showToast]);
  const saveUser = useCallback((id, patch) => setDoc(doc(db, 'users', id), patch, { merge: true }).then(() => showToast(t('saved'))).catch(() => showToast(t('err_gen'))), [showToast]);

  const value = {
    phase, user, me, users, team, leads, areas, settings, live, here, S, isChef, lang,
    rep, areaOf, leadById, posNow, toast, showToast, setToast, changeLang, pendingName,
    updLead, setStatus, addNote, setMeeting, editNote, deleteNote, newLeadAt, deleteLead, assignLead, saveUser,
    logout: () => signOut(auth),
    todayStr,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
