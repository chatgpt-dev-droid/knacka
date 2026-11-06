(function(){
"use strict";
/* ================= texts ================= */
const T={sv:{
 tMap:"Karta",tLeads:"Leads",tCal:"Kalender",tComp:"Tävling",tMore:"Mer",searchPh:"Sök adress eller namn",
 cancel:"Avbryt",placeHere:"Placera här",
 knocks:"knack",leadsW:"leads",sales:"sälj",today:"idag",
 st_ny:"Ej besökt",st_borta:"Inte hemma",st_nej:"Nej tack",st_igen:"Kom tillbaka",st_int:"Intresserad",st_mote:"Möte bokat",st_kund:"Kund",st_aldrig:"Knacka ej",
 street:"Gata",number:"Nr",first:"Förnamn",last:"Efternamn",phone:"Telefon",email:"E-post",
 contact:"Kontakt",note:"Anteckning",notePh:"T.ex. har hund, ring efter 18",revisit:"Återbesök",meeting:"Möte",history:"Historik",
 call:"Ring",sms:"SMS",nav:"Navigera",revisitSms:"Återbesöks-SMS",showMap:"Visa på kartan",del:"Ta bort lead",delQ:"Ta bort för gott?",yesDel:"Ja, ta bort",
 w1:"1 vecka",w2:"2 veckor",w4:"4 veckor",w8:"8 veckor",clear:"Rensa",remindOn:"Påminnelse",saved:"Sparat",statusSet:"Status: ",
 noAddr:"Adress saknas",noArea:"Utanför område",lastVisit:"senast",never:"aldrig besökt",
 all:"Alla",mine:"Mina",dueToday:"Återbesök",interested:"Intresserade",meetings:"Möten",customers:"Kunder",
 leadsTitle:"Leads",noLeads:"Inga leads här än. Gå till kartan och tryck på + för att lägga till den första.",sortNear:"Närmast",sortRecent:"Senaste",
 calTitle:"Kalender",overdue:"Försenade återbesök",nothingDay:"Inget inbokat den här dagen.",sendAll:"Skicka återbesöks-SMS",sendAllSub:"Tryck på Skicka för varje kund. Meddelandet är färdigskrivet.",send:"Skicka",sent:"Skickat",copy:"Kopiera",copied:"Kopierat",
 compTitle:"Tävling",day:"Idag",week:"Veckan",month:"Månaden",mKnocks:"Knackningar",mLeads:"Leads",mSales:"Sälj",you:"du",
 moreTitle:"Mer",role_chef:"Chef",role_saljare:"Säljare",areas:"Områden",visited:"besökta",
 tmpl:"Meddelandemall för återbesök",tmplHelp:"{namn}, {säljare}, {adress} och {datum} fylls i automatiskt.",tmplChefOnly:"Bara chefen kan ändra mallen.",statuses:"Statusar",lang:"Språk",
 filterTitle:"Visa på kartan",onlyMine:"Bara mina leads",showAreas:"Visa områden",done:"Klar",
 tapPlace:"Flytta kartan så att nålen hamnar på huset.",longPress:"Tips: zooma in så syns husnumren. Håll fingret på ett hus (eller tryck +) för att lägga en nål – adressen fylls i automatiskt.",
 tmplDefault:"Hej {namn}! Det är {säljare} från Fiskaren.nu. Jag kommer förbi på {adress} igen {datum} som vi pratade om. Passar det inte, svara bara på det här SMS:et. Hälsningar {säljare}",
 min:"min",h:"tim",d:"d",ago:"sedan",at:"kl",
 // auth
 login:"Logga in",register:"Skapa konto",yourName:"Ditt namn",password:"Lösenord",pwHint:"Minst 6 tecken",forgot:"Glömt lösenordet?",resetSent:"Vi har skickat ett mejl för att välja nytt lösenord.",
 needEmail:"Skriv din e-post först.",logout:"Logga ut",loading:"Laddar…",
 pendingTitle:"Väntar på godkännande",pendingText:"Ditt konto är skapat. Chefen behöver godkänna dig innan du kommer in. Be henne öppna Mer → Team i appen.",check:"Kolla igen",
 verifyTitle:"Bekräfta din e-post",verifyText:"Vi har skickat en länk till {e}. Klicka på den och tryck sedan Fortsätt.",cont:"Fortsätt",resend:"Skicka länken igen",notVerified:"E-posten är inte bekräftad än.",
 err_wrong:"Fel e-post eller lösenord.",err_inuse:"Det finns redan ett konto med den e-posten. Logga in istället.",err_weak:"Lösenordet måste vara minst 6 tecken.",err_email:"E-postadressen ser inte rätt ut.",err_net:"Ingen kontakt med servern. Kolla internet och försök igen.",err_gen:"Något gick fel. Försök igen.",err_name:"Skriv ditt namn.",
 deactivated:"Ditt konto är avstängt. Kontakta chefen.",
 // team/areas
 team:"Team",approve:"Godkänn",deactivate:"Stäng av",activate:"Aktivera",pending:"Väntar",inactive:"Avstängd",roleLbl:"Roll",
 drawArea:"Rita nytt område",drawHelp:"Tryck på kartan för varje hörn av området.",undo:"Ångra",areaName:"Områdets namn",assigned:"Ansvarig säljare",saveArea:"Spara område",areaNeed3:"Sätt minst tre hörn.",delArea:"Ta bort",delAreaQ:"Ta bort området?",
 nobody:"Ingen",offline:"Offline – ändringar sparas och skickas när du har nät igen.",
 noAreas:"Inga områden än.",satView:"Satellit",mapView:"Karta"},
en:{
 tMap:"Map",tLeads:"Leads",tCal:"Calendar",tComp:"Compete",tMore:"More",searchPh:"Search address or name",
 cancel:"Cancel",placeHere:"Place here",
 knocks:"knocks",leadsW:"leads",sales:"sales",today:"today",
 st_ny:"Not visited",st_borta:"Not home",st_nej:"Not interested",st_igen:"Come back",st_int:"Interested",st_mote:"Appointment",st_kund:"Customer",st_aldrig:"Do not knock",
 street:"Street",number:"No.",first:"First name",last:"Last name",phone:"Phone",email:"Email",
 contact:"Contact",note:"Note",notePh:"E.g. has a dog, call after 6pm",revisit:"Revisit",meeting:"Appointment",history:"History",
 call:"Call",sms:"SMS",nav:"Navigate",revisitSms:"Revisit SMS",showMap:"Show on map",del:"Delete lead",delQ:"Delete for good?",yesDel:"Yes, delete",
 w1:"1 week",w2:"2 weeks",w4:"4 weeks",w8:"8 weeks",clear:"Clear",remindOn:"Reminder",saved:"Saved",statusSet:"Status: ",
 noAddr:"No address",noArea:"Outside areas",lastVisit:"last",never:"never visited",
 all:"All",mine:"Mine",dueToday:"Revisits",interested:"Interested",meetings:"Appointments",customers:"Customers",
 leadsTitle:"Leads",noLeads:"No leads here yet. Go to the map and tap + to add the first one.",sortNear:"Nearest",sortRecent:"Recent",
 calTitle:"Calendar",overdue:"Overdue revisits",nothingDay:"Nothing booked this day.",sendAll:"Send revisit SMS",sendAllSub:"Tap Send for each customer. The message is ready.",send:"Send",sent:"Sent",copy:"Copy",copied:"Copied",
 compTitle:"Compete",day:"Today",week:"Week",month:"Month",mKnocks:"Knocks",mLeads:"Leads",mSales:"Sales",you:"you",
 moreTitle:"More",role_chef:"Manager",role_saljare:"Seller",areas:"Areas",visited:"visited",
 tmpl:"Revisit message template",tmplHelp:"{namn}, {säljare}, {adress} and {datum} are filled in automatically.",tmplChefOnly:"Only the manager can change the template.",statuses:"Statuses",lang:"Language",
 filterTitle:"Show on map",onlyMine:"Only my leads",showAreas:"Show areas",done:"Done",
 tapPlace:"Move the map so the pin sits on the house.",longPress:"Tip: zoom in to see house numbers. Press and hold a house (or tap +) to drop a pin – the address fills in automatically.",
 tmplDefault:"Hi {namn}! It's {säljare} from Fiskaren.nu. I'll stop by {adress} again {datum} as we discussed. If it doesn't suit you, just reply to this text. Best, {säljare}",
 min:"min",h:"h",d:"d",ago:"ago",at:"at",
 login:"Log in",register:"Create account",yourName:"Your name",password:"Password",pwHint:"At least 6 characters",forgot:"Forgot password?",resetSent:"We sent you an email to choose a new password.",
 needEmail:"Enter your email first.",logout:"Log out",loading:"Loading…",
 pendingTitle:"Waiting for approval",pendingText:"Your account is created. The manager needs to approve you before you can get in. Ask them to open More → Team in the app.",check:"Check again",
 verifyTitle:"Confirm your email",verifyText:"We sent a link to {e}. Click it, then tap Continue.",cont:"Continue",resend:"Send the link again",notVerified:"The email isn't confirmed yet.",
 err_wrong:"Wrong email or password.",err_inuse:"There's already an account with that email. Log in instead.",err_weak:"The password must be at least 6 characters.",err_email:"That email address doesn't look right.",err_net:"Can't reach the server. Check your internet and try again.",err_gen:"Something went wrong. Try again.",err_name:"Enter your name.",
 deactivated:"Your account is switched off. Contact the manager.",
 team:"Team",approve:"Approve",deactivate:"Switch off",activate:"Activate",pending:"Waiting",inactive:"Switched off",roleLbl:"Role",
 drawArea:"Draw new area",drawHelp:"Tap the map at each corner of the area.",undo:"Undo",areaName:"Area name",assigned:"Assigned seller",saveArea:"Save area",areaNeed3:"Set at least three corners.",delArea:"Delete",delAreaQ:"Delete the area?",
 nobody:"Nobody",offline:"Offline – changes are saved and sent when you're back online.",
 noAreas:"No areas yet.",satView:"Satellite",mapView:"Map"}};

const CHEF_EMAILS=["hej@fiskaren.nu","karen@fiskaren.nu"];
const STATUS=[
 {k:"borta",ic:"–",c:"var(--st-borta)"},{k:"nej",ic:"✕",c:"var(--st-nej)"},{k:"igen",ic:"↻",c:"var(--st-igen)"},{k:"int",ic:"★",c:"var(--st-int)"},
 {k:"mote",ic:"◷",c:"var(--st-mote)"},{k:"kund",ic:"✓",c:"var(--st-kund)"},{k:"aldrig",ic:"!",c:"var(--st-aldrig)"}];
const ST=Object.fromEntries(STATUS.map(s=>[s.k,s]));ST.ny={k:"ny",ic:"",c:"var(--st-ny)"};
const AREA_COLS=["#0b6e7f","#e39b14","#7b5bd6","#1f9d55","#d64541","#2d7ff9"];
const CENTER=[59.2622,18.0128];
const DAY=864e5;

/* ================= local prefs ================= */
const PK="knacka-prefs";
let P={lang:"sv",filter:{hide:[],mine:false,areas:true}};
try{const x=JSON.parse(localStorage.getItem(PK)||"null");if(x)P=Object.assign(P,x)}catch(e){}
function savePrefs(){try{localStorage.setItem(PK,JSON.stringify(P))}catch(e){}}

/* ================= state ================= */
const S={me:null,uid:null,users:[],leads:[],areas:[],tmpl:null};
const t=k=>(T[P.lang]&&T[P.lang][k])||T.sv[k]||k;
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const isChef=()=>S.me&&S.me.role==="chef";
const team=()=>S.users.filter(u=>u.active);
const rep=id=>S.users.find(u=>u.id===id)||{name:"—"};
const loc=()=>P.lang==="sv"?"sv-SE":"en-GB";
function dstr(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
const todayStr=()=>dstr(new Date());
const addr=l=>l.street?(l.street+" "+(l.num||"")).trim():t("noAddr");
const nameOf=l=>(l.first||l.last)?((l.first||"")+" "+(l.last||"")).trim():"";
function rel(ts){if(!ts)return t("never");const m=Math.round((Date.now()-ts)/6e4);if(m<60)return Math.max(m,0)+" "+t("min")+" "+t("ago");const h=Math.round(m/60);if(h<24)return h+" "+t("h")+" "+t("ago");return Math.round(h/24)+" "+t("d")+" "+t("ago")}
function fdate(s){if(!s)return"";const d=new Date(s+"T12:00:00");return d.toLocaleDateString(loc(),{weekday:"short",day:"numeric",month:"short"})}
function ftime(ts){return new Date(ts).toLocaleTimeString(loc(),{hour:"2-digit",minute:"2-digit"})}
function fdt(ts){return new Date(ts).toLocaleDateString(loc(),{day:"numeric",month:"short"})+" "+ftime(ts)}
const lastVisit=l=>l.hist&&l.hist.length?l.hist[l.hist.length-1].t:0;
let here=null;
function dist(l){const p=here||CENTER;const dy=(l.lat-p[0])*111320,dx=(l.lng-p[1])*111320*Math.cos(p[0]*Math.PI/180);return Math.sqrt(dx*dx+dy*dy)}
const fdist=m=>m<1000?Math.round(m/10)*10+" m":(m/1000).toFixed(1).replace(".",",")+" km";
function toast(msg){const e=$("toast");e.textContent=msg;e.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>e.hidden=true,2400)}
function copyText(txt,el){try{navigator.clipboard.writeText(txt).then(()=>toast(t("copied")),()=>{if(el)el.select()})}catch(e){if(el)el.select()}}
const telHref=p=>"tel:"+String(p||"").replace(/[^\d+]/g,"");
const smsHref=(p,body)=>"sms:"+String(p||"").replace(/[^\d+]/g,"")+(body?"?&body="+encodeURIComponent(body):"");
function fillTmpl(l){
  const d=l.meeting?fdate(dstr(new Date(l.meeting)))+" "+t("at")+" "+ftime(l.meeting):(l.revisit?fdate(l.revisit):"");
  return (S.tmpl||t("tmplDefault")).replace(/\{namn\}/g,l.first||"").replace(/\{säljare\}/g,S.me?S.me.name:"").replace(/\{adress\}/g,addr(l)).replace(/\{datum\}/g,d).replace(/Hej !/,"Hej!").replace(/Hi !/,"Hi!");
}
function inPoly(y,x,p){let ins=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const yi=p[i][0],xi=p[i][1],yj=p[j][0],xj=p[j][1];if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))ins=!ins}return ins}
const areaOf=(lat,lng)=>S.areas.find(a=>inPoly(lat,lng,a.poly))||null;

/* ================= firebase ================= */
firebase.initializeApp(window.FIREBASE_CONFIG);
const auth=firebase.auth();
const db=firebase.firestore();
try{db.enablePersistence({synchronizeTabs:true}).catch(()=>{})}catch(e){}
const FV=firebase.firestore.FieldValue;
const unsubs=[];
function updLead(l,patch){Object.assign(l,patch);patch.updated=Date.now();db.collection("leads").doc(l.id).set(patch,{merge:true}).catch(err)}
function err(e){console.error(e);toast(e&&e.code==="permission-denied"?t("deactivated"):t("err_gen"))}

/* ================= auth screens ================= */
let pendingName="",authMode="login";
function authScreen(html){$("auth").innerHTML=`<div class="authcard"><div class="logo"><i>K</i><div><b>Knacka</b><small>Fiskaren.nu</small></div></div>${html}</div>`;$("auth").hidden=false}
function errMsg(e){const c=e&&e.code||"";if(/wrong-password|user-not-found|invalid-credential|invalid-login/.test(c))return t("err_wrong");if(/email-already-in-use/.test(c))return t("err_inuse");if(/weak-password/.test(c))return t("err_weak");if(/invalid-email/.test(c))return t("err_email");if(/network/.test(c))return t("err_net");return t("err_gen")}
function showLogin(msg){
  authScreen(`
    <div class="seg" style="margin-top:18px"><button id="aL" aria-pressed="${authMode==="login"}">${t("login")}</button><button id="aR" aria-pressed="${authMode==="reg"}">${t("register")}</button></div>
    <form id="aForm" class="sec" novalidate>
      ${authMode==="reg"?`<div class="field"><label for="aName">${t("yourName")}</label><input type="text" id="aName" autocomplete="name"></div>`:""}
      <div class="field"><label for="aEmail">${t("email")}</label><input type="email" id="aEmail" autocomplete="email" inputmode="email"></div>
      <div class="field"><label for="aPw">${t("password")}</label><input type="password" id="aPw" autocomplete="${authMode==="reg"?"new-password":"current-password"}" placeholder="${authMode==="reg"?t("pwHint"):""}"></div>
      <div class="autherr" id="aErr" ${msg?"":"hidden"}>${esc(msg||"")}</div>
      <button class="btn" type="submit" id="aGo">${authMode==="reg"?t("register"):t("login")}</button>
      ${authMode==="login"?`<button type="button" class="linkbtn" id="aForgot">${t("forgot")}</button>`:""}
    </form>
    <div class="seg" style="margin-top:14px"><button id="lsv2" aria-pressed="${P.lang==="sv"}">Svenska</button><button id="len2" aria-pressed="${P.lang==="en"}">English</button></div>`);
  $("aL").onclick=()=>{authMode="login";showLogin()};$("aR").onclick=()=>{authMode="reg";showLogin()};
  $("lsv2").onclick=()=>{P.lang="sv";savePrefs();applyLang();showLogin()};$("len2").onclick=()=>{P.lang="en";savePrefs();applyLang();showLogin()};
  const fail=m=>{$("aErr").textContent=m;$("aErr").hidden=false;$("aGo").disabled=false};
  $("aForm").onsubmit=async e=>{
    e.preventDefault();$("aErr").hidden=true;
    const em=$("aEmail").value.trim(),pw=$("aPw").value;
    if(authMode==="reg"){const n=$("aName").value.trim();if(!n)return fail(t("err_name"));pendingName=n}
    $("aGo").disabled=true;
    try{
      if(authMode==="reg")await auth.createUserWithEmailAndPassword(em,pw);
      else await auth.signInWithEmailAndPassword(em,pw);
    }catch(x){fail(errMsg(x))}
  };
  if($("aForgot"))$("aForgot").onclick=async()=>{const em=$("aEmail").value.trim();if(!em)return fail(t("needEmail"));try{await auth.sendPasswordResetEmail(em);$("aErr").textContent=t("resetSent");$("aErr").hidden=false;$("aErr").classList.add("ok")}catch(x){fail(errMsg(x))}};
}
function showPending(){
  authScreen(`<h2 style="margin-top:18px">${t("pendingTitle")}</h2><p class="sub" style="font-size:15px">${t("pendingText")}</p>
    <div class="sec"><button class="btn" id="pChk">${t("check")}</button><button class="btn ghost" id="pOut">${t("logout")}</button></div>`);
  $("pChk").onclick=()=>location.reload();$("pOut").onclick=()=>auth.signOut();
}
function showMsg(title,text){authScreen(`<h2 style="margin-top:18px">${esc(title)}</h2><p class="sub" style="font-size:15px">${esc(text)}</p><div class="sec"><button class="btn ghost" id="pOut">${t("logout")}</button></div>`);$("pOut").onclick=()=>auth.signOut()}
function showVerify(user){
  authScreen(`<h2 style="margin-top:18px">${t("verifyTitle")}</h2><p class="sub" style="font-size:15px">${esc(t("verifyText").replace("{e}",user.email))}</p>
    <div class="autherr" id="vErr" hidden></div>
    <div class="sec"><button class="btn" id="vGo">${t("cont")}</button><button class="btn ghost" id="vRe">${t("resend")}</button><button class="btn ghost" id="pOut">${t("logout")}</button></div>`);
  $("vGo").onclick=async()=>{await user.reload();if(auth.currentUser.emailVerified){await auth.currentUser.getIdToken(true);onUser(auth.currentUser)}else{$("vErr").textContent=t("notVerified");$("vErr").hidden=false}};
  $("vRe").onclick=()=>user.sendEmailVerification().then(()=>toast(t("sent"))).catch(err);
  $("pOut").onclick=()=>auth.signOut();
}
async function onUser(user){
  unsubs.splice(0).forEach(u=>u());
  if(!user){S.me=null;S.uid=null;$("app").hidden=true;showLogin();return}
  authScreen(`<p class="sub" style="margin-top:20px">${t("loading")}</p>`);
  S.uid=user.uid;
  const ref=db.collection("users").doc(user.uid);
  let snap;
  try{snap=await ref.get()}catch(e){snap=null}
  if(!snap||!snap.exists){
    const email=(user.email||"").toLowerCase();
    const chefEmail=CHEF_EMAILS.includes(email);
    if(chefEmail&&!user.emailVerified){try{await user.sendEmailVerification()}catch(e){}return showVerify(user)}
    const name=pendingName||(email.split("@")[0]).replace(/^./,c=>c.toUpperCase());
    const doc={name,email:user.email,role:chefEmail?"chef":"saljare",active:chefEmail,created:Date.now()};
    try{await ref.set(doc)}catch(e){console.error(e);return showMsg(t("err_gen"),String(e.message||e))}
    snap=await ref.get();
  }
  // live profile
  unsubs.push(ref.onSnapshot(s=>{
    const d=s.data();if(!d)return;
    const was=S.me&&S.me.active;
    S.me=Object.assign({id:s.id},d);
    if(!d.active){$("app").hidden=true;stopData();return showPending()}
    $("auth").hidden=true;$("app").hidden=false;
    if(!was)startData();
    renderTab();statStrip();
  },e=>{console.error(e);showPending()}));
}
auth.onAuthStateChanged(onUser);

/* ================= data listeners ================= */
let dataUnsubs=[];
function stopData(){dataUnsubs.splice(0).forEach(u=>u())}
function startData(){
  stopData();
  initMap();
  dataUnsubs.push(db.collection("users").onSnapshot(q=>{S.users=q.docs.map(d=>Object.assign({id:d.id},d.data()));renderTab();drawAreas()},e=>console.error(e)));
  dataUnsubs.push(db.collection("leads").onSnapshot(q=>{
    S.leads=q.docs.map(d=>{const x=Object.assign({id:d.id},d.data());x.hist=x.hist||[];return x});
    drawPins();drawAddresses();statStrip();if(tab!=="map"&&tab!=="more"&&$("sheet").hidden){const y=$("v-"+tab).scrollTop;renderTab();$("v-"+tab).scrollTop=y}
  },e=>console.error(e)));
  dataUnsubs.push(db.collection("areas").onSnapshot(q=>{S.areas=q.docs.map(d=>{const x=d.data();return {id:d.id,name:x.name,rep:x.rep,color:x.color,poly:(x.poly||[]).map(p=>[p.lat,p.lng])}});drawAreas();if(tab==="more")moreView()},e=>console.error(e)));
  dataUnsubs.push(db.collection("settings").doc("main").onSnapshot(s=>{S.tmpl=(s.data()||{}).tmpl||null},e=>console.error(e)));
  locate(false);
}
window.addEventListener("online",()=>$("offline").hidden=true);
window.addEventListener("offline",()=>$("offline").hidden=false);
if(!navigator.onLine)$("offline").hidden=false;

/* ================= map ================= */
let map=null,markers={},areaLayers=[],selId=null,meMarker=null,placing=false,drawing=null;
function pinIcon(l){
  const s=ST[l.status]||ST.ny;
  const hidden=P.filter.hide.includes(l.status)||(P.filter.mine&&l.owner!==S.uid);
  const cls="pin"+(l.status==="ny"?" new":"")+(l.id===selId?" sel":"")+(hidden?" dim":"");
  return L.divIcon({className:"",html:`<div class="${cls}" style="--c:${s.c}"><span>${s.ic}</span></div>${l.num?`<b class="pnum">${esc(l.num)}</b>`:""}`,iconSize:[26,26],iconAnchor:[13,30]});
}
function initMap(){
  if(map)return;
  map=L.map("map",{zoomControl:false}).setView(CENTER,17);
  BASES.map=L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:20,maxNativeZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'});
  BASES.sat=L.layerGroup([L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:20,maxNativeZoom:19,attribution:"Bild © Esri, Maxar, Earthstar Geographics"}),
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png",{maxZoom:20,subdomains:"abcd",attribution:'© OpenStreetMap © CARTO'})]);
  setBase(P.base||"map");
  addrLayer=L.layerGroup().addTo(map);
  map.on("moveend zoomend",()=>{clearTimeout(addrT);addrT=setTimeout(loadAddresses,350);$("map").classList.toggle("zfar",map.getZoom()<18)});
  $("map").classList.toggle("zfar",map.getZoom()<18);
  map.on("contextmenu",e=>{if(!placing&&!drawing)newLeadAt(e.latlng.lat,e.latlng.lng)});
  map.on("click",e=>{$("results").hidden=true;$("statstrip").hidden=false;if(drawing){drawing.pts.push([e.latlng.lat,e.latlng.lng]);drawPreview()}});
  setTimeout(()=>map.invalidateSize(),50);
}
/* ---------- base layer + house numbers ---------- */
const USE_OVERPASS=false; // husnummer visas i OSM-kartan; egna klickbara nummer kan slås på senare
const BASES={};let curBase=null,addrLayer=null,addrT=null;const addrs=new Map();const fetched=[];let addrBusy=false;
function setBase(k){if(!map)return;if(curBase)map.removeLayer(BASES[curBase]);curBase=k;BASES[k].addTo(map);P.base=k;savePrefs();
  const b=$("baseBtn");if(b){b.setAttribute("aria-pressed",k==="sat");b.title=k==="sat"?t("mapView"):t("satView")}}
const covered=(s,w,n,e)=>fetched.some(f=>s>=f[0]&&w>=f[1]&&n<=f[2]&&e<=f[3]);
async function loadAddresses(){
  if(!USE_OVERPASS){if(addrLayer)addrLayer.clearLayers();return}
  if(!map||!addrLayer)return;
  if(map.getZoom()<17){addrLayer.clearLayers();return}
  const b=map.getBounds().pad(0.3);const s=b.getSouth(),w=b.getWest(),n=b.getNorth(),e=b.getEast();
  if(!covered(s,w,n,e)&&!addrBusy&&navigator.onLine){
    addrBusy=true;
    const q=`[out:json][timeout:20];(node["addr:housenumber"](${s},${w},${n},${e});way["addr:housenumber"](${s},${w},${n},${e}););out center 800;`;
    try{
      const r=await fetch("https://overpass-api.de/api/interpreter",{method:"POST",body:"data="+encodeURIComponent(q),headers:{"Content-Type":"application/x-www-form-urlencoded"}});
      if(r.ok){const j=await r.json();(j.elements||[]).forEach(el=>{const tg=el.tags||{};const lat=el.lat||(el.center&&el.center.lat),lng=el.lon||(el.center&&el.center.lon);if(!lat||!tg["addr:housenumber"])return;
        addrs.set(el.type+el.id,{lat,lng,street:tg["addr:street"]||"",num:tg["addr:housenumber"]})});fetched.push([s,w,n,e])}
    }catch(x){console.warn("adresser",x)}
    addrBusy=false;
  }
  drawAddresses();
}
function drawAddresses(){
  if(!addrLayer)return;addrLayer.clearLayers();
  if(!map||map.getZoom()<17)return;
  const b=map.getBounds();
  const taken=new Set(S.leads.map(l=>((l.street||"")+"|"+(l.num||"")).toLowerCase()));
  addrs.forEach(a=>{
    if(!b.contains([a.lat,a.lng]))return;
    if(taken.has((a.street+"|"+a.num).toLowerCase()))return;
    const m=L.marker([a.lat,a.lng],{icon:L.divIcon({className:"",html:`<div class="hn">${esc(a.num)}</div>`,iconSize:[30,20],iconAnchor:[15,10]}),title:(a.street+" "+a.num).trim(),zIndexOffset:-500});
    m.on("click",()=>{if(!drawing&&!placing)newLeadAt(a.lat,a.lng,{street:a.street,num:a.num})});
    addrLayer.addLayer(m);
  });
}
function drawAreas(){
  if(!map)return;areaLayers.forEach(x=>map.removeLayer(x));areaLayers=[];
  if(!P.filter.areas)return;
  S.areas.forEach((a,i)=>{
    if(a.poly.length<3)return;
    const col=a.color||AREA_COLS[i%AREA_COLS.length];
    const p=L.polygon(a.poly,{color:col,weight:2,dashArray:"6 5",fillOpacity:.05,interactive:false}).addTo(map);
    p.bindTooltip(a.name+(a.rep?" · "+rep(a.rep).name:""),{permanent:true,direction:"center",className:"area-label"});
    areaLayers.push(p);
  });
}
function drawPins(){
  if(!map)return;
  const seen={};
  S.leads.forEach(l=>{
    seen[l.id]=1;
    if(markers[l.id]){markers[l.id].setIcon(pinIcon(l));markers[l.id].setLatLng([l.lat,l.lng])}
    else{const m=L.marker([l.lat,l.lng],{icon:pinIcon(l),keyboard:true,title:addr(l)}).addTo(map);m.on("click",()=>{if(!drawing)openLead(l.id)});markers[l.id]=m}
  });
  Object.keys(markers).forEach(k=>{if(!seen[k]){map.removeLayer(markers[k]);delete markers[k]}});
}
function locate(fly){
  if(!navigator.geolocation){if(fly&&map)map.flyTo(CENTER,17);return}
  navigator.geolocation.getCurrentPosition(p=>{
    here=[p.coords.latitude,p.coords.longitude];
    if(map){if(!meMarker)meMarker=L.marker(here,{icon:L.divIcon({className:"",html:'<div class="me-dot"></div>',iconSize:[16,16],iconAnchor:[8,8]}),interactive:false,zIndexOffset:1000}).addTo(map);else meMarker.setLatLng(here);if(fly||!locate.done)map.setView(here,17);locate.done=true}
  },()=>{if(fly&&map)map.flyTo(CENTER,17)},{enableHighAccuracy:true,timeout:10000,maximumAge:30000});
}
if(navigator.geolocation){try{navigator.geolocation.watchPosition(p=>{here=[p.coords.latitude,p.coords.longitude];if(meMarker)meMarker.setLatLng(here)},()=>{},{enableHighAccuracy:true,maximumAge:15000})}catch(e){}}

/* ================= stats strip ================= */
function statStrip(){
  if(!S.me)return;
  const st=new Date();st.setHours(0,0,0,0);const s0=st.getTime();let k=0,ld=0,sa=0;
  S.leads.forEach(l=>l.hist.forEach(h=>{if(h.rep===S.uid&&h.t>=s0){k++;if(h.s==="int"||h.s==="mote")ld++;if(h.s==="kund")sa++}}));
  $("statstrip").innerHTML=`<span class="stat"><span class="av" style="width:22px;height:22px;font-size:11px">${esc((S.me.name||"?")[0])}</span>${t("today")}</span>
    <span class="stat"><b>${k}</b> ${t("knocks")}</span><span class="stat"><b>${ld}</b> ${t("leadsW")}</span><span class="stat"><b>${sa}</b> ${t("sales")}</span>`;
  const due=S.leads.filter(l=>l.revisit&&l.revisit<=todayStr()&&!["kund","aldrig","nej"].includes(l.status)&&l.owner===S.uid).length;
  $("calCount").hidden=!due;$("calCount").textContent=due;
  $("filterBadge").hidden=!(P.filter.hide.length||P.filter.mine);
  const pend=isChef()?S.users.filter(u=>!u.active&&!u.off).length:0;
  $("moreCount").hidden=!pend;$("moreCount").textContent=pend;
}

/* ================= sheet ================= */
function openSheet(html){$("sheet").innerHTML='<div class="grab"></div>'+html;$("sheet").hidden=false;$("scrim").hidden=false;$("sheet").scrollTop=0}
function closeSheet(){$("sheet").hidden=true;$("scrim").hidden=true;if(selId){const id=selId;selId=null;const l=S.leads.find(x=>x.id===id);if(l&&markers[id])markers[id].setIcon(pinIcon(l))}if(tab!=="map"&&tab!=="more")renderTab()}
$("scrim").onclick=closeSheet;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSheet()});
const icon={
 call:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
 sms:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
 nav:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 19-9-9 19-2-8-8-2z"/></svg>',
 rev:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></svg>',
 x:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'};
function toLocalInput(ts){const d=new Date(ts);return dstr(d)+"T"+String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")}

function openLead(id){
  const l=S.leads.find(x=>x.id===id);if(!l)return;
  const prev=selId;selId=id;
  if(map){if(prev&&markers[prev]){const p=S.leads.find(x=>x.id===prev);if(p)markers[prev].setIcon(pinIcon(p))}if(markers[id])markers[id].setIcon(pinIcon(l))}
  const area=areaOf(l.lat,l.lng);const s=ST[l.status]||ST.ny;const nm=nameOf(l);
  const revChip=w=>{const d=dstr(new Date(Date.now()+w*7*DAY));return `<button class="chip" data-rev="${d}" aria-pressed="${l.revisit===d}">${t("w"+w)}</button>`};
  const canDel=isChef()||l.owner===S.uid;
  openSheet(`
    <div class="shead"><h2>${esc(addr(l))}</h2><button class="x" id="sx" aria-label="${t("cancel")}">${icon.x}</button></div>
    <div class="sub">${nm?esc(nm)+" · ":""}<span class="pill" style="--c:${l.status==="ny"?"var(--muted)":s.c}">${t("st_"+l.status)}</span> · ${area?esc(area.name):t("noArea")} · ${esc(rep(l.owner).name)} · ${t("lastVisit")} ${rel(lastVisit(l))}</div>
    <div class="stbar">${STATUS.map(x=>`<button class="stb" data-st="${x.k}" aria-pressed="${l.status===x.k}"><i style="--c:${x.c}">${x.ic}</i>${t("st_"+x.k)}</button>`).join("")}<button class="stb" id="toMap"><i style="--c:var(--soft);color:var(--accent)">${icon.nav}</i>${t("showMap")}</button></div>
    ${l.revisit&&!["kund","nej","aldrig"].includes(l.status)?`<div class="reminder" style="margin-top:14px">${icon.rev}<span>${t("remindOn")}: ${fdate(l.revisit)}</span></div>`:""}
    ${l.meeting?`<div class="reminder" style="margin-top:10px;--st-igen:var(--st-mote)">◷ <span>${t("meeting")}: ${fdt(l.meeting)}</span></div>`:""}
    <div class="actions">
      <a class="act" href="${telHref(l.phone)}" aria-disabled="${!l.phone}">${icon.call}${t("call")}</a>
      <a class="act" href="${smsHref(l.phone,"")}" aria-disabled="${!l.phone}">${icon.sms}${t("sms")}</a>
      <a class="act" href="https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}" target="_blank" rel="noopener">${icon.nav}${t("nav")}</a>
      <a class="act" href="${smsHref(l.phone,fillTmpl(l))}" aria-disabled="${!l.phone||(!l.revisit&&!l.meeting)}">${icon.rev}${t("revisitSms")}</a>
    </div>
    <div class="sec"><h3>${t("contact")}</h3>
      <div class="grid2"><div class="field"><label for="f_first">${t("first")}</label><input type="text" id="f_first" value="${esc(l.first)}" autocomplete="off"></div>
      <div class="field"><label for="f_last">${t("last")}</label><input type="text" id="f_last" value="${esc(l.last)}" autocomplete="off"></div></div>
      <div class="grid2"><div class="field"><label for="f_phone">${t("phone")}</label><input type="tel" id="f_phone" value="${esc(l.phone)}" autocomplete="off"></div>
      <div class="field"><label for="f_email">${t("email")}</label><input type="email" id="f_email" value="${esc(l.email)}" autocomplete="off"></div></div>
      <div class="grid2" style="grid-template-columns:2fr 1fr"><div class="field"><label for="f_street">${t("street")}</label><input type="text" id="f_street" value="${esc(l.street)}" autocomplete="off"></div>
      <div class="field"><label for="f_num">${t("number")}</label><input type="text" id="f_num" value="${esc(l.num)}" autocomplete="off"></div></div>
    </div>
    <div class="sec"><h3>${t("revisit")}</h3>
      <div class="chips">${[1,2,4,8].map(revChip).join("")}<button class="chip" id="revClear">${t("clear")}</button></div>
      <input type="date" id="f_rev" value="${l.revisit||""}" aria-label="${t("revisit")}">
    </div>
    <div class="sec"><h3>${t("meeting")}</h3><input type="datetime-local" id="f_meet" value="${l.meeting?toLocalInput(l.meeting):""}" aria-label="${t("meeting")}"></div>
    <div class="sec"><h3>${t("note")}</h3><textarea id="f_note" rows="3" placeholder="${t("notePh")}">${esc(l.note)}</textarea></div>
    ${l.hist.length?`<div class="sec"><h3>${t("history")}</h3><div class="timeline">${l.hist.slice().reverse().map(h=>`<div class="tl"><i style="--c:${(ST[h.s]||ST.ny).c}"></i><span>${t("st_"+h.s)} · ${esc(rep(h.rep).name)}</span><small>${fdt(h.t)}</small></div>`).join("")}</div></div>`:""}
    ${canDel?`<div class="sec" id="delWrap"><button class="btn danger" id="delBtn">${t("del")}</button></div>`:""}`);
  $("sx").onclick=closeSheet;
  $("sheet").querySelectorAll("[data-st]").forEach(b=>b.onclick=()=>{
    const k=b.dataset.st;const h={t:Date.now(),rep:S.uid,s:k};
    const patch={status:k};
    if(k==="igen"&&!l.revisit)patch.revisit=dstr(new Date(Date.now()+14*DAY));
    if(k==="kund"||k==="nej"||k==="aldrig")patch.revisit=null;
    if(!l.owner)patch.owner=S.uid;
    l.hist.push(h);Object.assign(l,patch);patch.updated=Date.now();patch.hist=FV.arrayUnion(h);
    db.collection("leads").doc(l.id).set(patch,{merge:true}).catch(err);
    drawPins();statStrip();toast(t("statusSet")+t("st_"+k));
    if(k==="borta"||k==="nej"||k==="aldrig")closeSheet();else openLead(l.id);
  });
  $("toMap").onclick=()=>{closeSheet();showTab("map");map.flyTo([l.lat,l.lng],18);setTimeout(()=>openLead(l.id),450)};
  const bind=(id,key,tr,reopen)=>{const e=$(id);e.addEventListener("change",()=>{updLead(l,{[key]:tr?tr(e.value):e.value});drawPins();statStrip();toast(t("saved"));if(reopen)openLead(l.id)})};
  bind("f_first","first",null,true);bind("f_last","last");bind("f_phone","phone",null,true);bind("f_email","email");bind("f_street","street");bind("f_num","num");bind("f_note","note");
  bind("f_rev","revisit",v=>v||null,true);bind("f_meet","meeting",v=>v?new Date(v).getTime():null,true);
  $("sheet").querySelectorAll("[data-rev]").forEach(b=>b.onclick=()=>{updLead(l,{revisit:b.dataset.rev});statStrip();openLead(l.id);toast(t("remindOn")+": "+fdate(l.revisit))});
  $("revClear").onclick=()=>{updLead(l,{revisit:null});statStrip();openLead(l.id)};
  if($("delBtn"))$("delBtn").onclick=()=>{$("delWrap").innerHTML=`<div class="sub" style="font-weight:700;color:var(--ink)">${t("delQ")}</div><div class="confirm"><button class="btn ghost" id="delNo">${t("cancel")}</button><button class="btn danger" id="delYes">${t("yesDel")}</button></div>`;
    $("delNo").onclick=()=>openLead(l.id);$("delYes").onclick=()=>{S.leads=S.leads.filter(x=>x.id!==l.id);selId=null;db.collection("leads").doc(l.id).delete().catch(err);closeSheet();drawPins();statStrip()}};
}

/* ================= new lead ================= */
async function reverseGeo(lat,lng){
  try{
    const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&addressdetails=1&lat=${lat}&lon=${lng}&accept-language=sv`);
    if(!r.ok)return null;const j=await r.json();const a=j.address||{};
    return {street:a.road||a.pedestrian||a.footway||"",num:a.house_number||""};
  }catch(e){return null}
}
function newLeadAt(lat,lng,pre){
  const ref=db.collection("leads").doc();
  const l={id:ref.id,lat,lng,street:pre?pre.street:"",num:pre?pre.num:"",first:"",last:"",phone:"",email:"",note:"",status:"ny",revisit:null,meeting:null,owner:S.uid,created:Date.now(),updated:Date.now(),hist:[]};
  S.leads.push(l);
  const {id,...doc}=l;ref.set(doc).catch(err);
  drawPins();drawAddresses();openLead(l.id);
  if(pre&&pre.street&&pre.num)return;
  reverseGeo(lat,lng).then(a=>{
    if(!a||(!a.street&&!a.num))return;
    const patch={};if(!l.street&&a.street)patch.street=a.street;if(!l.num&&a.num)patch.num=a.num;
    if(Object.keys(patch).length){updLead(l,patch);if(selId===l.id&&!$("sheet").hidden){const fs=$("f_street"),fn=$("f_num");if(fs&&!fs.value)fs.value=l.street;if(fn&&!fn.value)fn.value=l.num;const h=$("sheet").querySelector(".shead h2");if(h)h.textContent=addr(l)}}
  });
}
function startPlacing(){placing=true;$("cross").hidden=false;$("placebar").hidden=false;$("fabs").hidden=true;toast(t("tapPlace"))}
function endPlacing(){placing=false;$("cross").hidden=true;$("placebar").hidden=true;$("fabs").hidden=false}
$("addBtn").onclick=startPlacing;
$("placeCancel").onclick=endPlacing;
$("placeOk").onclick=()=>{const c=map.getCenter();endPlacing();newLeadAt(c.lat,c.lng)};
$("locBtn").onclick=()=>locate(true);
$("baseBtn").onclick=()=>setBase(curBase==="sat"?"map":"sat");

/* ================= draw area (chef) ================= */
let drawLayer=null;
function startDrawing(){
  closeSheet();showTab("map");drawing={pts:[]};$("fabs").hidden=true;$("drawbar").hidden=false;toast(t("drawHelp"));drawPreview();
}
function drawPreview(){
  if(drawLayer){map.removeLayer(drawLayer);drawLayer=null}
  if(!drawing)return;
  const g=L.layerGroup();
  if(drawing.pts.length>1)L.polygon(drawing.pts,{color:"#0b6e7f",weight:3,fillOpacity:.12,interactive:false}).addTo(g);
  drawing.pts.forEach(p=>L.circleMarker(p,{radius:6,color:"#fff",weight:2,fillColor:"#0b6e7f",fillOpacity:1,interactive:false}).addTo(g));
  drawLayer=g.addTo(map);$("drawCount").textContent=drawing.pts.length;
}
function endDrawing(){drawing=null;drawPreview();$("drawbar").hidden=true;$("fabs").hidden=false}
$("drawUndo").onclick=()=>{if(drawing){drawing.pts.pop();drawPreview()}};
$("drawCancel").onclick=endDrawing;
$("drawDone").onclick=()=>{
  if(!drawing||drawing.pts.length<3)return toast(t("areaNeed3"));
  const pts=drawing.pts.slice();
  openSheet(`<div class="shead"><h2>${t("drawArea")}</h2><button class="x" id="sx">${icon.x}</button></div>
    <div class="sec"><div class="field"><label for="arName">${t("areaName")}</label><input type="text" id="arName" autocomplete="off"></div>
    <div class="field"><label for="arRep">${t("assigned")}</label><select id="arRep"><option value="">${t("nobody")}</option>${team().map(u=>`<option value="${u.id}">${esc(u.name)}</option>`).join("")}</select></div>
    <button class="btn" id="arSave">${t("saveArea")}</button></div>`);
  $("sx").onclick=closeSheet;
  $("arSave").onclick=()=>{const name=$("arName").value.trim()||(t("areas")+" "+(S.areas.length+1));
    db.collection("areas").add({name,rep:$("arRep").value||null,color:AREA_COLS[S.areas.length%AREA_COLS.length],poly:pts.map(p=>({lat:p[0],lng:p[1]})),created:Date.now()}).then(()=>toast(t("saved"))).catch(err);
    closeSheet();endDrawing()};
};

/* ================= search ================= */
$("q").addEventListener("input",()=>{
  const q=$("q").value.trim().toLowerCase();
  if(!q){$("results").hidden=true;$("statstrip").hidden=false;return}
  const hits=S.leads.filter(l=>(addr(l)+" "+nameOf(l)+" "+(l.phone||"")).toLowerCase().includes(q)).slice(0,12);
  $("statstrip").hidden=true;$("results").hidden=false;
  $("resultsBox").innerHTML=hits.length?hits.map(l=>{const s=ST[l.status]||ST.ny;return `<button data-id="${l.id}"><span class="pin${l.status==="ny"?" new":""}" style="--c:${s.c};width:20px;height:20px;flex:none"><span style="font-size:10px">${s.ic}</span></span><span style="min-width:0"><b>${esc(addr(l))}</b><br><small style="color:var(--muted)">${esc(nameOf(l)||t("st_"+l.status))}</small></span></button>`}).join(""):`<div class="empty">—</div>`;
  $("resultsBox").querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>{const l=S.leads.find(x=>x.id===b.dataset.id);$("q").value="";$("results").hidden=true;$("statstrip").hidden=false;$("q").blur();map.flyTo([l.lat,l.lng],18);openLead(l.id)});
});

/* ================= filter ================= */
$("filterBtn").onclick=()=>{
  const render=()=>{openSheet(`
    <div class="shead"><h2>${t("filterTitle")}</h2><button class="x" id="sx">${icon.x}</button></div>
    <div class="legend" style="margin-top:14px">${["ny",...STATUS.map(s=>s.k)].map(k=>{const s=ST[k];const on=!P.filter.hide.includes(k);return `<button class="chip" data-f="${k}" aria-pressed="${on}" style="display:flex;gap:8px;align-items:center;justify-content:flex-start"><span class="pin${k==="ny"?" new":""}" style="--c:${s.c};width:18px;height:18px;flex:none"><span style="font-size:9px">${s.ic}</span></span>${t("st_"+k)}</button>`}).join("")}</div>
    <div class="sec"><div class="chips"><button class="chip" id="fMine" aria-pressed="${P.filter.mine}">${t("onlyMine")}</button><button class="chip" id="fAreas" aria-pressed="${P.filter.areas}">${t("showAreas")}</button></div></div>
    <div class="sec"><button class="btn" id="fDone">${t("done")}</button></div>`);
    $("sx").onclick=closeSheet;$("fDone").onclick=closeSheet;
    $("sheet").querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{const k=b.dataset.f;P.filter.hide=P.filter.hide.includes(k)?P.filter.hide.filter(x=>x!==k):[...P.filter.hide,k];savePrefs();drawPins();statStrip();render()});
    $("fMine").onclick=()=>{P.filter.mine=!P.filter.mine;savePrefs();drawPins();statStrip();render()};
    $("fAreas").onclick=()=>{P.filter.areas=!P.filter.areas;savePrefs();drawAreas();render()};
  };render();
};

/* ================= leads view ================= */
let lf="all",lsort="near",lq="";
function leadsView(){
  const ts=todayStr();
  const F={all:l=>l.status!=="ny"||nameOf(l),mine:l=>l.owner===S.uid,due:l=>l.revisit&&l.revisit<=ts&&!["kund","aldrig","nej"].includes(l.status),int:l=>l.status==="int",mote:l=>l.status==="mote",kund:l=>l.status==="kund"};
  let rows=S.leads.filter(F[lf]);
  if(lq){const q=lq.toLowerCase();rows=S.leads.filter(l=>(addr(l)+" "+nameOf(l)+" "+(l.phone||"")).toLowerCase().includes(q))}
  rows.sort(lsort==="near"?(a,b)=>dist(a)-dist(b):(a,b)=>(b.updated||lastVisit(b))-(a.updated||lastVisit(a)));
  const cnt=k=>S.leads.filter(F[k]).length;
  $("leadsPane").innerHTML=`
    <div class="phead"><h1>${t("leadsTitle")}</h1><div class="seg" style="width:auto"><button id="sN" aria-pressed="${lsort==="near"}">${t("sortNear")}</button><button id="sR" aria-pressed="${lsort==="recent"}">${t("sortRecent")}</button></div></div>
    <label class="search" style="box-shadow:none;border:1px solid var(--line)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="lq" type="search" value="${esc(lq)}" placeholder="${t("searchPh")}" autocomplete="off"></label>
    <div class="chips scroll">${[["all","all"],["mine","mine"],["due","dueToday"],["int","interested"],["mote","meetings"],["kund","customers"]].map(([k,lbl])=>`<button class="chip" data-lf="${k}" aria-pressed="${lf===k}">${t(lbl)} · ${cnt(k)}</button>`).join("")}</div>
    <div class="list">${rows.length?rows.slice(0,200).map(l=>liRow(l)).join(""):`<div class="empty">${t("noLeads")}</div>`}</div>`;
  bindRows($("leadsPane"));
  $("sN").onclick=()=>{lsort="near";leadsView()};$("sR").onclick=()=>{lsort="recent";leadsView()};
  $("leadsPane").querySelectorAll("[data-lf]").forEach(b=>b.onclick=()=>{lf=b.dataset.lf;lq="";leadsView()});
  const qi=$("lq");qi.oninput=()=>{lq=qi.value;const pos=qi.selectionStart;leadsView();const n=$("lq");n.focus();try{n.setSelectionRange(pos,pos)}catch(e){}};
}
function liRow(l,extra){
  const s=ST[l.status]||ST.ny;const nm=nameOf(l);
  const right=extra||(l.revisit&&!["kund","nej","aldrig"].includes(l.status)?`↻ ${fdate(l.revisit)}`:fdist(dist(l)));
  return `<button class="li" data-id="${l.id}"><span class="dot${l.status==="ny"?" new":""}" style="--c:${s.c}">${s.ic||"·"}</span>
    <span class="t"><b>${esc(nm||addr(l))}</b><small>${nm?esc(addr(l))+" · ":""}<span class="pill" style="--c:${l.status==="ny"?"var(--muted)":s.c}">${t("st_"+l.status)}</span> · ${esc(rep(l.owner).name)} · ${rel(lastVisit(l))}</small></span>
    <span class="r">${right}</span></button>`;
}
function bindRows(root){root.querySelectorAll(".li[data-id]").forEach(b=>b.onclick=()=>openLead(b.dataset.id))}

/* ================= calendar ================= */
let calDay=null;
const mineOrChef=l=>isChef()||l.owner===S.uid;
function calItems(ds){
  const ev=[];
  S.leads.forEach(l=>{
    if(!mineOrChef(l))return;
    if(l.meeting&&dstr(new Date(l.meeting))===ds)ev.push({l,kind:"mote",sort:l.meeting});
    if(l.revisit===ds&&!["kund","nej","aldrig"].includes(l.status))ev.push({l,kind:"igen",sort:new Date(ds+"T23:00").getTime()});
  });
  return ev.sort((a,b)=>a.sort-b.sort);
}
function calView(){
  const ts=todayStr();if(!calDay)calDay=ts;
  const days=[];for(let i=0;i<14;i++)days.push(dstr(new Date(Date.now()+i*DAY)));
  const overdue=S.leads.filter(l=>mineOrChef(l)&&l.revisit&&l.revisit<ts&&!["kund","nej","aldrig"].includes(l.status));
  const items=calItems(calDay);const withPhone=items.filter(e=>e.l.phone);
  $("calPane").innerHTML=`
    <div class="phead"><h1>${t("calTitle")}</h1></div>
    <div class="days">${days.map(d=>{const dt=new Date(d+"T12:00");const has=calItems(d).length;return `<button class="day" data-d="${d}" aria-pressed="${d===calDay}">${dt.toLocaleDateString(loc(),{weekday:"short"})}<b>${dt.getDate()}</b>${has?'<span class="n"></span>':""}</button>`}).join("")}</div>
    ${overdue.length&&calDay===ts?`<h3>${t("overdue")} · ${overdue.length}</h3><div class="list">${overdue.map(l=>liRow(l,`<span style="color:var(--st-nej)">${fdate(l.revisit)}</span>`)).join("")}</div>`:""}
    <div class="phead"><h3>${fdate(calDay)} · ${items.length}</h3>${withPhone.length?`<button class="btn sm" id="bulk">${t("sendAll")} (${withPhone.length})</button>`:""}</div>
    <div class="list">${items.length?items.map(e=>liRow(e.l,e.kind==="mote"?`◷ ${ftime(e.l.meeting)}`:`↻ ${t("revisit")}`)).join(""):`<div class="empty">${t("nothingDay")}</div>`}</div>`;
  bindRows($("calPane"));
  $("calPane").querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>{calDay=b.dataset.d;calView()});
  if($("bulk"))$("bulk").onclick=()=>bulkSms(withPhone.map(e=>e.l));
}
function bulkSms(list){
  const render=()=>{openSheet(`
    <div class="shead"><h2>${t("sendAll")}</h2><button class="x" id="sx">${icon.x}</button></div>
    <div class="sub">${t("sendAllSub")}</div>
    <div class="list" style="margin-top:14px">${list.map(l=>{const s=ST[l.status]||ST.ny;return `<div class="li" style="cursor:default"><span class="dot" style="--c:${s.c}">${s.ic}</span>
      <span class="t"><b>${esc(nameOf(l)||addr(l))}</b><small>${esc(l.phone)} · ${esc(addr(l))}</small></span>
      <span class="r">${l.smsSent===todayStr()?`<span class="pill" style="--c:var(--st-kund)">✓ ${t("sent")}</span>`:`<a class="btn sm" data-sms="${l.id}" href="${smsHref(l.phone,fillTmpl(l))}">${t("send")}</a>`}</span></div>`}).join("")}</div>
    <div class="sec"><h3>${t("tmpl")}</h3><textarea id="prev" rows="4" readonly>${esc(list[0]?fillTmpl(list[0]):"")}</textarea><button class="btn ghost" id="cp">${t("copy")}</button></div>`);
    $("sx").onclick=closeSheet;$("cp").onclick=()=>copyText($("prev").value,$("prev"));
    $("sheet").querySelectorAll("[data-sms]").forEach(a=>a.addEventListener("click",()=>{const l=S.leads.find(x=>x.id===a.dataset.sms);updLead(l,{smsSent:todayStr()});setTimeout(render,400)}));
  };render();
}

/* ================= competition ================= */
let cp="week",cm="k";
function compView(){
  const st=new Date();st.setHours(0,0,0,0);
  if(cp==="week"){st.setDate(st.getDate()-((st.getDay()+6)%7))}
  if(cp==="month")st.setDate(1);
  const s0=st.getTime();
  const score={};team().forEach(u=>score[u.id]={k:0,ld:0,sa:0});
  S.leads.forEach(l=>l.hist.forEach(h=>{if(h.t>=s0&&score[h.rep]){score[h.rep].k++;if(h.s==="int"||h.s==="mote")score[h.rep].ld++;if(h.s==="kund")score[h.rep].sa++}}));
  const rows=team().map(u=>({u,v:score[u.id][cm],all:score[u.id]})).sort((a,b)=>b.v-a.v);
  const max=Math.max(1,...rows.map(x=>x.v));
  const pod=(x,place)=>x?`<div class="pod ${place===1?"first":""}"><span class="medal">${place===1?"🥇":place===2?"🥈":"🥉"}</span><span class="av">${esc(x.u.name[0])}</span><span style="font-weight:800">${esc(x.u.name)}${x.u.id===S.uid?` <small>(${t("you")})</small>`:""}</span><b>${x.v}</b></div>`:"<div></div>";
  $("compPane").innerHTML=`
    <div class="phead"><h1>${t("compTitle")}</h1></div>
    <div class="seg"><button data-p="day" aria-pressed="${cp==="day"}">${t("day")}</button><button data-p="week" aria-pressed="${cp==="week"}">${t("week")}</button><button data-p="month" aria-pressed="${cp==="month"}">${t("month")}</button></div>
    <div class="chips"><button class="chip" data-m="k" aria-pressed="${cm==="k"}">${t("mKnocks")}</button><button class="chip" data-m="ld" aria-pressed="${cm==="ld"}">${t("mLeads")}</button><button class="chip" data-m="sa" aria-pressed="${cm==="sa"}">${t("mSales")}</button></div>
    ${rows.length>=2?`<div class="podium">${pod(rows[1],2)}${pod(rows[0],1)}${pod(rows[2],3)}</div>`:""}
    <div class="list">${rows.map((x,i)=>`<div class="li" style="cursor:default;${x.u.id===S.uid?"background:color-mix(in srgb,var(--accent) 8%,transparent)":""}"><span class="av" style="width:34px;height:34px">${i+1}</span>
      <span class="t"><b>${esc(x.u.name)}</b><small>${x.all.k} ${t("knocks")} · ${x.all.ld} ${t("leadsW")} · ${x.all.sa} ${t("sales")}</small><span class="bar" style="display:block;margin-top:6px"><i style="width:${x.v/max*100}%"></i></span></span>
      <span class="r" style="font-family:var(--display);font-size:20px;font-weight:800;color:var(--ink)">${x.v}</span></div>`).join("")}</div>`;
  $("compPane").querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{cp=b.dataset.p;compView()});
  $("compPane").querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{cm=b.dataset.m;compView()});
}

/* ================= more ================= */
function moreView(){
  if(!S.me)return;const chef=isChef();
  const pend=S.users.filter(u=>!u.active&&!u.off),act=S.users.filter(u=>u.active),off=S.users.filter(u=>!u.active&&u.off);
  const urow=(u,btns)=>`<div class="li" style="cursor:default"><span class="av" style="width:34px;height:34px">${esc((u.name||"?")[0])}</span><span class="t"><b>${esc(u.name)}${u.id===S.uid?` <small style="display:inline;color:var(--muted)">(${t("you")})</small>`:""}</b><small>${esc(u.email)}</small></span><span class="r">${btns}</span></div>`;
  $("morePane").innerHTML=`
    <div class="phead"><h1>${t("moreTitle")}</h1></div>
    <div class="card"><div class="row"><span class="av" style="width:48px;height:48px;font-size:19px">${esc((S.me.name||"?")[0])}</span><div style="flex:1;min-width:0"><b style="font-size:17px">${esc(S.me.name)}</b><div class="sub" style="margin:0">${t("role_"+S.me.role)} · ${esc(S.me.email)}</div></div></div>
      <button class="btn ghost" id="logout">${t("logout")}</button></div>
    ${chef?`<h3>${t("team")}</h3><div class="list">
      ${pend.map(u=>urow(u,`<span class="pill" style="--c:var(--st-igen)">${t("pending")}</span> <button class="btn sm" data-ok="${u.id}">${t("approve")}</button>`)).join("")}
      ${act.map(u=>urow(u,u.id===S.uid?`<span class="pill" style="--c:var(--accent)">${t("role_"+u.role)}</span>`:`<select data-role="${u.id}" aria-label="${t("roleLbl")}" style="width:auto;padding:6px 8px"><option value="saljare" ${u.role==="saljare"?"selected":""}>${t("role_saljare")}</option><option value="chef" ${u.role==="chef"?"selected":""}>${t("role_chef")}</option></select> <button class="btn sm ghost" data-off="${u.id}">${t("deactivate")}</button>`)).join("")}
      ${off.map(u=>urow(u,`<span class="pill" style="--c:var(--muted)">${t("inactive")}</span> <button class="btn sm ghost" data-ok="${u.id}">${t("activate")}</button>`)).join("")}
    </div>
    <div class="phead"><h3>${t("areas")}</h3><button class="btn sm" id="newArea">${t("drawArea")}</button></div>
    <div class="list">${S.areas.length?S.areas.map(a=>{const ls=S.leads.filter(l=>inPoly(l.lat,l.lng,a.poly));const v=ls.filter(l=>l.status!=="ny").length;return `<div class="li" style="cursor:default;grid-template-columns:1fr auto" id="ar_${a.id}"><span class="t"><b>${esc(a.name)}</b><small>${v}/${ls.length} ${t("visited")}</small><span class="bar" style="display:block;margin-top:6px"><i style="width:${ls.length?v/ls.length*100:0}%;background:${a.color||"var(--accent)"}"></i></span></span>
      <span class="r"><select data-a="${a.id}" aria-label="${t("assigned")}" style="width:auto;padding:6px 8px"><option value="">${t("nobody")}</option>${team().map(u=>`<option value="${u.id}" ${a.rep===u.id?"selected":""}>${esc(u.name)}</option>`).join("")}</select> <button class="btn sm ghost" data-delarea="${a.id}">${t("delArea")}</button></span></div>`}).join(""):`<div class="empty">${t("noAreas")}</div>`}</div>`:""}
    <h3>${t("tmpl")}</h3>
    <div class="card"><textarea id="tmpl" rows="4" ${chef?"":"readonly"}>${esc(S.tmpl||t("tmplDefault"))}</textarea><div class="sub" style="margin:0">${chef?t("tmplHelp"):t("tmplChefOnly")}</div></div>
    <h3>${t("statuses")}</h3>
    <div class="card"><div class="legend">${["ny",...STATUS.map(s=>s.k)].map(k=>{const s=ST[k];return `<span><i style="--c:${k==="ny"?"var(--soft)":s.c};${k==="ny"?"color:var(--muted);border:2px solid var(--muted)":""}">${s.ic}</i>${t("st_"+k)}</span>`}).join("")}</div></div>
    <h3>${t("lang")}</h3>
    <div class="seg"><button id="lsv" aria-pressed="${P.lang==="sv"}">Svenska</button><button id="len" aria-pressed="${P.lang==="en"}">English</button></div>
    <div class="note">${t("longPress")}</div>`;
  $("logout").onclick=()=>{stopData();auth.signOut()};
  if(chef){
    $("morePane").querySelectorAll("[data-ok]").forEach(b=>b.onclick=()=>db.collection("users").doc(b.dataset.ok).set({active:true,off:false},{merge:true}).then(()=>toast(t("saved"))).catch(err));
    $("morePane").querySelectorAll("[data-off]").forEach(b=>b.onclick=()=>db.collection("users").doc(b.dataset.off).set({active:false,off:true},{merge:true}).then(()=>toast(t("saved"))).catch(err));
    $("morePane").querySelectorAll("[data-role]").forEach(s=>s.onchange=()=>db.collection("users").doc(s.dataset.role).set({role:s.value},{merge:true}).then(()=>toast(t("saved"))).catch(err));
    $("morePane").querySelectorAll("[data-a]").forEach(s=>s.onchange=()=>db.collection("areas").doc(s.dataset.a).set({rep:s.value||null},{merge:true}).then(()=>toast(t("saved"))).catch(err));
    $("morePane").querySelectorAll("[data-delarea]").forEach(b=>b.onclick=()=>{const row=$("ar_"+b.dataset.delarea);row.querySelector(".r").innerHTML=`<span style="font-size:13px;font-weight:700;color:var(--ink)">${t("delAreaQ")}</span> <button class="btn sm ghost" data-no>${t("cancel")}</button> <button class="btn sm danger" data-yes>${t("yesDel")}</button>`;
      row.querySelector("[data-no]").onclick=moreView;row.querySelector("[data-yes]").onclick=()=>db.collection("areas").doc(b.dataset.delarea).delete().catch(err)});
    $("newArea").onclick=startDrawing;
    $("tmpl").onchange=()=>{const v=$("tmpl").value.trim();db.collection("settings").doc("main").set({tmpl:v&&v!==t("tmplDefault")?v:null},{merge:true}).then(()=>toast(t("saved"))).catch(err)};
  }
  $("lsv").onclick=()=>{P.lang="sv";savePrefs();applyLang();moreView()};
  $("len").onclick=()=>{P.lang="en";savePrefs();applyLang();moreView()};
}

/* ================= tabs ================= */
let tab="map";
document.querySelectorAll("nav.tabs button").forEach(b=>b.onclick=()=>showTab(b.dataset.tab));
function showTab(x){
  tab=x;
  document.querySelectorAll("nav.tabs button").forEach(b=>b.setAttribute("aria-current",b.dataset.tab===tab?"page":"false"));
  ["map","leads","cal","comp","more"].forEach(v=>$("v-"+v).hidden=v!==tab);
  if(tab==="map"&&map)setTimeout(()=>map.invalidateSize(),30);
  renderTab();
}
function renderTab(){if(!S.me||!S.me.active)return;statStrip();if(tab==="leads")leadsView();if(tab==="cal")calView();if(tab==="comp")compView();if(tab==="more")moreView()}
function applyLang(){
  document.documentElement.lang=P.lang;
  document.querySelectorAll("[data-t]").forEach(e=>e.textContent=t(e.dataset.t));
  document.querySelectorAll("[data-ph]").forEach(e=>e.placeholder=t(e.dataset.ph));
  drawAreas();statStrip();
}
applyLang();
})();
