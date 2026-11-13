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
 drawArea:"Rita nytt område",drawHelp:"Tryck på kartan för varje hörn av området.",undo:"Ångra",undone:"Ångrat",areaName:"Områdets namn",assigned:"Ansvarig säljare",saveArea:"Spara område",areaNeed3:"Sätt minst tre hörn.",delArea:"Ta bort",delAreaQ:"Ta bort området?",
 nobody:"Ingen",offline:"Offline – ändringar sparas och skickas när du har nät igen.",
 noAreas:"Inga områden än.",satView:"Satellit",mapView:"Karta",
 details:"Detaljer",bookMeeting:"Boka möte",setRevisit:"Återbesök",addNotePh:"Skriv en anteckning…",assignedTo:"Ansvarig",info:"Info",activity:"Aktivitet",back:"Tillbaka",
 company:"Företag",address:"Adress",apt:"Lgh",zip:"Postnummer",city:"Ort",statusH:"Status",
 evAssign:"Ny ansvarig",evAssignTo:"Tilldelad",evCreate:"Lead skapad",evStatus:"Status:",evNote:"Anteckning",noActivity:"Ingen aktivitet än.",noLocation:"Ingen plats",by:"av",
 stEditH:"Statusar",stEditHelp:"Namn, färg, ikon och vad statusen betyder. Ändringen gäller hela teamet.",stAdd:"Lägg till status",stSave:"Spara statusar",stName:"Namn",stColor:"Färg",stIcon:"Ikon",stType:"Betyder",
 fl_sale:"Försäljning",fl_lead:"Intresserad/lead",fl_revisit:"Återbesök",fl_closed:"Knacka inte igen",fl_none:"Övrigt",stDel:"Ta bort",stNeedName:"Varje status behöver ett namn.",
 mapTitle:"Knacka",list:"Lista",searchH:"Sök",
 fl_nothome:"Inte hemma",fl_smssent:"SMS skickat",
 elksAll:"Skicka till alla automatiskt",elksConfirm:"Skicka {n} SMS nu via 46elks?",elksYes:"Ja, skicka",elksBusy:"Skickar…",elksDone:"Skickade {ok} av {n}",elksFail:"Kunde inte skicka",
 replied:"svar",repliedTitle:"Kunder som svarat",custReplied:"Kunden har svarat på SMS",smsH:"SMS-inställningar",elksFromL:"Avsändarnummer hos 46elks (t.ex. +46766861234)",aiOnL:"AI svarar automatiskt på SMS",aiInfoL:"Det här vet AI:n (produkter, priser, villkor)",aiInfoHelp:"AI:n svarar bara utifrån den här texten. Håll den uppdaterad.",optedOut:"Avregistrerad från SMS",
 evSmsIn:"SMS från kunden",evSmsOut:"SMS skickat",customer:"Kund",nhChip:"inte hemma idag",nhTitle:"SMS till dagens Inte hemma",nhSub:"Alla får ett eget SMS med sitt namn. Tryck Skicka nästa, skicka i SMS-appen och kom tillbaka – statusen blir SMS skickat.",
 nhNone:"Inga Inte hemma med telefonnummer idag.",nhNoPhone:"utan telefonnummer kan inte få SMS",nhNoConsent:"Saknar samtycke",nhNext:"Skicka nästa",nhAllDone:"Alla SMS är skickade",nhMsg:"Meddelande",nhLeft:"kvar",
 smsOk:"Ok med SMS (samtycke)",myPhone:"Ditt mobilnummer (syns i SMS)",tmplNH:"SMS till Inte hemma",tmplNHHelp:"{namn}, {säljare}, {telefon} och {adress} fylls i automatiskt.",
 tmplNHDefault:"Hej {namn}! Jag var förbi på {adress} idag från Fiskaren.nu men du var inte hemma. Vi kör fisk och skaldjur hem till dörren. Vill du veta mer eller beställa? Svara på det här SMS:et eller ring mig. Hälsningar {säljare}, {telefon}",
 notes:"Anteckningar",addNote:"Spara anteckning",noteAdded:"Anteckning sparad",noNotes:"Inga anteckningar än.",
 gcal:"+ Google-kalender",ical:"+ iPhone-kalender",revToday:"återbesök idag",
 planRoute:"Planera rutt",routeStops:"stopp",openGmaps:"Öppna i Google Maps",endRoute:"Avsluta rutt",routeMax:"Google Maps tar max 10 stopp åt gången – resten visas på kartan.",noStops:"Inga stopp med plats den här dagen.",
 impTitle:"Importera från SalesRabbit",impHelp:"Exportera dina leads från SalesRabbit som CSV-fil (Leads → markera alla → Export) och välj filen här. Dubbletter hoppas över.",impPick:"Välj CSV-fil",impFound:"rader i filen",impNew:"nya leads",impDup:"finns redan",impFix:"adresser med trasiga å/ä/ö rättas",impNoPos:"saknar koordinater – adressen slås upp (ca 1 s per adress)",impGo:"Importera",impBusy:"Importerar…",impGeo:"Slår upp adresser",impDone:"Klart! Importerade",impFail:"kunde inte placeras på kartan",impCols:"Kolumner som hittades",impBad:"Kunde inte läsa filen. Är det en CSV-fil från SalesRabbit?"},
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
 drawArea:"Draw new area",drawHelp:"Tap the map at each corner of the area.",undo:"Undo",undone:"Undone",areaName:"Area name",assigned:"Assigned seller",saveArea:"Save area",areaNeed3:"Set at least three corners.",delArea:"Delete",delAreaQ:"Delete the area?",
 nobody:"Nobody",offline:"Offline – changes are saved and sent when you're back online.",
 noAreas:"No areas yet.",satView:"Satellite",mapView:"Map",
 details:"Details",bookMeeting:"Book meeting",setRevisit:"Revisit",addNotePh:"Write a note…",assignedTo:"Assigned to",info:"Info",activity:"Activity",back:"Back",
 company:"Business",address:"Address",apt:"Apt",zip:"Postal code",city:"City",statusH:"Status",
 evAssign:"Reassigned",evAssignTo:"Assigned to",evCreate:"Lead created",evStatus:"Status:",evNote:"Note",noActivity:"No activity yet.",noLocation:"No location",by:"by",
 stEditH:"Statuses",stEditHelp:"Name, colour, icon and what the status means. Changes apply to the whole team.",stAdd:"Add status",stSave:"Save statuses",stName:"Name",stColor:"Colour",stIcon:"Icon",stType:"Means",
 fl_sale:"Sale",fl_lead:"Interested/lead",fl_revisit:"Revisit",fl_closed:"Don't knock again",fl_none:"Other",stDel:"Delete",stNeedName:"Every status needs a name.",
 mapTitle:"Knacka",list:"List",searchH:"Search",
 fl_nothome:"Not home",fl_smssent:"SMS sent",
 elksAll:"Send to all automatically",elksConfirm:"Send {n} SMS now via 46elks?",elksYes:"Yes, send",elksBusy:"Sending…",elksDone:"Sent {ok} of {n}",elksFail:"Couldn't send",
 replied:"replies",repliedTitle:"Customers who replied",custReplied:"The customer replied by SMS",smsH:"SMS settings",elksFromL:"Sender number at 46elks (e.g. +46766861234)",aiOnL:"AI replies to SMS automatically",aiInfoL:"What the AI knows (products, prices, terms)",aiInfoHelp:"The AI only answers from this text. Keep it up to date.",optedOut:"Unsubscribed from SMS",
 evSmsIn:"SMS from customer",evSmsOut:"SMS sent",customer:"Customer",nhChip:"not home today",nhTitle:"SMS to today's Not home",nhSub:"Everyone gets their own SMS with their name. Tap Send next, send it in the SMS app and come back – the status becomes SMS sent.",
 nhNone:"No Not home leads with a phone number today.",nhNoPhone:"without a phone number can't get an SMS",nhNoConsent:"No consent",nhNext:"Send next",nhAllDone:"All SMS sent",nhMsg:"Message",nhLeft:"left",
 smsOk:"OK to SMS (consent)",myPhone:"Your mobile number (shown in SMS)",tmplNH:"SMS to Not home",tmplNHHelp:"{namn}, {säljare}, {telefon} and {adress} are filled in automatically.",
 tmplNHDefault:"Hi {namn}! I stopped by {adress} today from Fiskaren.nu but you weren't home. We deliver fish and seafood to your door. Want to know more or order? Reply to this text or call me. Best, {säljare}, {telefon}",
 notes:"Notes",addNote:"Save note",noteAdded:"Note saved",noNotes:"No notes yet.",
 gcal:"+ Google Calendar",ical:"+ iPhone calendar",revToday:"revisits today",
 planRoute:"Plan route",routeStops:"stops",openGmaps:"Open in Google Maps",endRoute:"End route",routeMax:"Google Maps takes at most 10 stops at a time – the rest are shown on the map.",noStops:"No stops with a location this day.",
 impTitle:"Import from SalesRabbit",impHelp:"Export your leads from SalesRabbit as a CSV file (Leads → select all → Export) and choose the file here. Duplicates are skipped.",impPick:"Choose CSV file",impFound:"rows in the file",impNew:"new leads",impDup:"already exist",impNoPos:"have no coordinates – the address is looked up (about 1 s each)",impGo:"Import",impBusy:"Importing…",impGeo:"Looking up addresses",impDone:"Done! Imported",impFail:"could not be placed on the map",impCols:"Columns found",impBad:"Couldn't read the file. Is it a CSV file from SalesRabbit?"}};

const AI_INFO_DEFAULT='Fiskaren.nu levererar fisk och skaldjur hem till dörren i Stockholm med omnejd. Beställ på fiskaren.nu. Telefon 076-230 09 97.\nPrenumeration: leverans var 4:e eller var 8:e vecka. Man kan också köpa en gång.\nFri frakt från 1 600 kr. Extra 5 % rabatt från 3 600 kr. Större förpackningar är billigare per kilo.\nExempel på priser (minsta förpackning):\n- Torskrygg MSC 1 kg 695 kr\n- Torskfilé 1 kg 299 kr\n- Lax sashimi 1 kg 789 kr\n- Landodlad lax 1 kg 589 kr\n- Sej rygg 1 kg 299 kr\n- Koljafilé 1 kg 420 kr\n- Gösfilé 1 kg 479 kr\n- Rödspätta 1 kg 529 kr\n- Hälleflundra 1 kg 869 kr\n- Räkor 40/60 1 kg 499 kr\n- Scampi Black Tiger 6/8 1 kg 799 kr\n- Kammusslor 10/20 1 kg 849 kr\n- Panerad torsk 1 kg 289 kr\n- Laxburgare sashimi 1 kg 339 kr\n- Regnbågsrom 200 g 389 kr\n- Kalix löjrom 250 g 1 299 kr\nHela sortimentet och aktuella priser finns på fiskaren.nu.';
const CHEF_EMAILS=["hej@fiskaren.nu","karen@fiskaren.nu"];
/* ---------- status system (editable by chef) ---------- */
const ICON_PATHS={
 question:'<path d="M9.2 9.2a2.9 2.9 0 1 1 4.2 2.6c-.9.5-1.4 1.1-1.4 2.1v.6"/><path d="M12 18.3v.1"/>',
 send:'<path d="M20.5 3.5 3.5 11l6.5 2.5 2.5 6.5z"/><path d="m10 13.5 4-4"/>',
 book:'<path d="M5 4.5h5.5A2.5 2.5 0 0 1 13 7v12.5a2 2 0 0 0-2-2H5z"/><path d="M19 4.5h-3.5A2.5 2.5 0 0 0 13 7v12.5a2 2 0 0 1 2-2h4z"/>',
 crown:'<path d="M3.5 17.5h17"/><path d="M4.5 7.5 8.5 11 12 5l3.5 6 4-3.5-1.6 9.5H6.1z"/>',
 star:'<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
 bag:'<path d="M9.2 4.5h5.6l-1.4 2.6h-2.8z"/><path d="M8.6 7.1h6.8c2.6 2.2 4.1 5 4.1 7.8 0 2.9-2.4 4.6-7.5 4.6s-7.5-1.7-7.5-4.6c0-2.8 1.5-5.6 4.1-7.8z"/><path d="M13.8 11.3c-.4-.6-1-.9-1.8-.9-1.1 0-1.8.6-1.8 1.4 0 1.9 3.7.9 3.7 2.8 0 .8-.8 1.4-1.9 1.4-.8 0-1.5-.3-1.9-.9M12 9.6v.8M12 16v.8"/>',
 check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
 home:'<path d="M4 11 12 4.5l8 6.5"/><path d="M6 9.5V19.5h12V9.5"/><path d="M10 19.5v-5h4v5"/>',
 refresh:'<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 4.5v4.5H15"/>',
 alert:'<path d="M12 5.5v8.5"/><path d="M12 18.4v.1"/>',
 lock:'<rect x="5.5" y="10.5" width="13" height="9" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
 x:'<path d="M7 7l10 10M17 7 7 17"/>',
 minus:'<path d="M6.5 12h11"/>',
 clock:'<circle cx="12" cy="12" r="7.5"/><path d="M12 8v4.2l2.8 1.8"/>',
 door:'<path d="M6.5 20V4.5h9V20"/><path d="M4.5 20h15"/><path d="M12.6 12.3v.1"/>',
 heart:'<path d="M12 19.5s-7-4.3-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.1c0 5.1-7 9.4-7 9.4z"/>',
 fish:'<path d="M3.5 12c3-4.5 9-6 13.5-1.5L20.5 7v10l-3.5-3.5C12.5 18 6.5 16.5 3.5 12z"/><path d="M8 11.2v.1"/>',
 phone:'<path d="M20.5 16.4v2.6a1.8 1.8 0 0 1-2 1.8A17.6 17.6 0 0 1 3.2 5.5a1.8 1.8 0 0 1 1.8-2h2.6a1.8 1.8 0 0 1 1.8 1.5c.1.8.3 1.6.6 2.4a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14.4 14.4 0 0 0 5.1 5.1l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.4.6a1.8 1.8 0 0 1 1.5 1.8z"/>',
 sms:'<path d="M20 15.5a1.8 1.8 0 0 1-1.8 1.8H8l-4 3.2V5.8A1.8 1.8 0 0 1 5.8 4h12.4A1.8 1.8 0 0 1 20 5.8z"/><path d="M8 9.5h8M8 12.8h5"/>',
 mail:'<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 6 8-6"/>',
 nav:'<path d="m3.5 11 17-7.5-7.5 17-2-7.5z"/>',
 cal:'<rect x="4" y="5.5" width="16" height="14.5" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
 note:'<path d="M5 4.5h10.5l3.5 3.5v11.5H5z"/><path d="M8.5 11h7M8.5 14.5h5"/>',
 user:'<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 back:'<path d="m15 5-7 7 7 7"/>',
 search:'<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
 route:'<circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8.2 18h7.3a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7H15.8"/>',
 layers:'<path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8z"/><path d="m3.5 12 8.5 4.5 8.5-4.5"/><path d="m3.5 16 8.5 4.5 8.5-4.5"/>',
 target:'<circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="2.6"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5"/>',
 filter:'<path d="M4 6.5h16M7 12h10M10 17.5h4"/>',
 pin:'<path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
 trash:'<path d="M5 7h14M9.5 7V4.5h5V7M7 7l1 12.5h8L17 7"/>',
 locoff:'<path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z"/><path d="M12 7.5v3.5"/><path d="M12 13.6v.1"/>'};
const ICON_NAMES=["question","send","book","crown","star","bag","check","home","refresh","alert","lock","x","minus","clock","door","sms","heart","fish","phone"];
function svgI(name,size,sw){return `<svg width="${size||22}" height="${size||22}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw||2.2}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name]||""}</svg>`}
// flag: sale | lead | revisit | closed | none
const DEFAULT_STATUSES=[
 {k:"abo",label:"Abonemag",color:"#237804",icon:"crown",flag:"sale"},
 {k:"sk",label:"Stjärnkund",color:"#eb2f96",icon:"star",flag:"sale"},
 {k:"sald",label:"Såld",color:"#95de64",icon:"bag",flag:"sale"},
 {k:"k",label:"Kund",color:"#13c2c2",icon:"check",flag:"sale"},
 {k:"p",label:"Pensioner",color:"#5cdbd3",icon:"home",flag:"none"},
 {k:"kt",label:"Kom tillbaka",color:"#95de64",icon:"refresh",flag:"revisit"},
 {k:"lead",label:"Lead",color:"#13c2c2",icon:"alert",flag:"lead"},
 {k:"kih",label:"Kunden är inte hemma",color:"#ffcb00",icon:"lock",flag:"nothome"},
 {k:"smss",label:"SMS",color:"#722ed1",icon:"send",flag:"smssent"},
 {k:"nh",label:"Inte hemma",color:"#fa8c16",icon:"question",flag:"nothome"},
 {k:"avsl",label:"Avslutat abonemaget",color:"#a8071a",icon:"refresh",flag:"closed"},
 {k:"nej",label:"Inte intresserad",color:"#f5222d",icon:"x",flag:"closed"},
 {k:"other",label:"Other",color:"#722ed1",icon:"minus",flag:"none"},
 {k:"bro",label:"Broschyr",color:"#ffcb00",icon:"book",flag:"none"},
 {k:"brok",label:"Broschyr Kund",color:"#5cdbd3",icon:"book",flag:"sale"}];
const LEGACY_STATUSES=[
 {k:"borta",label:"Inte hemma",color:"#8d9aa6",icon:"minus",flag:"nothome"},{k:"nej",label:"Nej tack",color:"#d64541",icon:"x",flag:"closed"},
 {k:"igen",label:"Kom tillbaka",color:"#e39b14",icon:"refresh",flag:"revisit"},{k:"int",label:"Intresserad",color:"#7b5bd6",icon:"star",flag:"lead"},
 {k:"mote",label:"Möte bokat",color:"#2d7ff9",icon:"clock",flag:"lead"},{k:"kund",label:"Kund",color:"#1f9d55",icon:"check",flag:"sale"},
 {k:"aldrig",label:"Knacka ej",color:"#2b2f33",icon:"lock",flag:"closed"}];
const ST_NY={k:"ny",label:"",color:"#ffffff",icon:"",flag:"none"};
const stList=()=>(S.statuses&&S.statuses.length?S.statuses:DEFAULT_STATUSES);
function st(k){if(!k||k==="ny")return ST_NY;return stList().find(s=>s.k===k)||LEGACY_STATUSES.find(s=>s.k===k)||{k,label:k,color:"#8d9aa6",icon:"minus",flag:"none"}}
const stLabel=k=>k==="ny"?t("st_ny"):st(k).label;
const isSale=k=>!!k&&st(k).flag==="sale";
const isLead=k=>!!k&&st(k).flag==="lead";
const isRevisitSt=k=>!!k&&st(k).flag==="revisit";
const isClosed=k=>!!k&&(st(k).flag==="closed"||st(k).flag==="sale");
const isNotHome=k=>!!k&&st(k).flag==="nothome";
function stDot(k,size){const s=st(k);const sz=size||34;return k==="ny"||!k?`<span class="sdot new" style="width:${sz}px;height:${sz}px"></span>`:`<span class="sdot" style="--c:${s.color};width:${sz}px;height:${sz}px">${svgI(s.icon,Math.round(sz*.52),2.6)}</span>`}

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
const rep=id=>id==="ai"?{name:"AI"}:(S.users.find(u=>u.id===id)||{name:"—"});
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
let here=null,hereT=0;
function dist(l){const p=here||CENTER;const dy=(l.lat-p[0])*111320,dx=(l.lng-p[1])*111320*Math.cos(p[0]*Math.PI/180);return Math.sqrt(dx*dx+dy*dy)}
const fdist=m=>m<1000?Math.round(m/10)*10+" m":(m/1000).toFixed(1).replace(".",",")+" km";
function toast(msg,action,fn){const e=$("toast");e.innerHTML="";const sp=document.createElement("span");sp.textContent=msg;e.appendChild(sp);
  if(action){const b=document.createElement("button");b.className="toastbtn";b.textContent=action;b.onclick=()=>{e.hidden=true;fn()};e.appendChild(b)}
  e.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>e.hidden=true,action?5000:2400)}
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
    const byId=new Map(S.leads.map(l=>[l.id,l]));
    S.leads=q.docs.map(d=>{const data=d.data();data.hist=data.hist||[];const ex=byId.get(d.id);
      if(ex){Object.keys(ex).forEach(k=>{if(k!=="id"&&!(k in data))delete ex[k]});Object.assign(ex,data);if(pend&&pend.l===ex)Object.assign(ex,pend.patch);return ex}
      return Object.assign({id:d.id},data)});
    if(openId){const ae=document.activeElement;if(!ae||!/INPUT|TEXTAREA|SELECT/.test(ae.tagName))rerenderLead(openId)}
    drawPins();drawAddresses();statStrip();if(tab!=="map"&&tab!=="more"&&$("sheet").hidden){const y=$("v-"+tab).scrollTop;renderTab();$("v-"+tab).scrollTop=y}
  },e=>console.error(e)));
  dataUnsubs.push(db.collection("areas").onSnapshot(q=>{S.areas=q.docs.map(d=>{const x=d.data();return {id:d.id,name:x.name,rep:x.rep,color:x.color,poly:(x.poly||[]).map(p=>[p.lat,p.lng])}});drawAreas();if(tab==="more")moreView()},e=>console.error(e)));
  dataUnsubs.push(db.collection("settings").doc("main").onSnapshot(s=>{const d=s.data()||{};S.tmpl=d.tmpl||null;S.tmplNH=d.tmplNH||null;S.elksFrom=d.elksFrom||"";S.aiSmsOn=d.aiSmsOn!==false;S.aiInfo=d.aiInfo||null;S.statuses=Array.isArray(d.statuses)&&d.statuses.length?d.statuses:null;Object.values(markers).forEach(m=>m.__k=null);drawPins();if(tab==="more")moreView()},e=>console.error(e)));
  locate(false);
}
window.addEventListener("online",()=>$("offline").hidden=true);
window.addEventListener("offline",()=>$("offline").hidden=false);
if(!navigator.onLine)$("offline").hidden=false;

/* ================= map ================= */
let map=null,markers={},areaLayers=[],selId=null,meMarker=null,placing=false,drawing=null;
function pinIcon(l){
  const s=st(l.status);
  const hidden=P.filter.hide.includes(l.status)||(P.filter.mine&&l.owner!==S.uid);
  const cls="rpin"+(l.status==="ny"?" new":"")+(l.id===selId?" sel":"")+(hidden?" dim":"");
  return L.divIcon({className:"",html:`<div class="${cls}" style="--c:${s.color}">${l.status==="ny"?"":svgI(s.icon,15,2.8)}</div>${l.num?`<b class="pnum">${esc(l.num)}</b>`:""}`,iconSize:[30,30],iconAnchor:[15,15]});
}
function iconKey(l){return [l.status,l.id===selId,P.filter.hide.includes(l.status)||(P.filter.mine&&l.owner!==S.uid),l.num||""].join("|")}
function refreshPin(id){const l=S.leads.find(x=>x.id===id);const m=markers[id];if(l&&m){const k=iconKey(l);if(m.__k!==k){m.setIcon(pinIcon(l));m.__k=k}}}
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
    const k=iconKey(l);const m0=markers[l.id];
    if(m0){if(m0.__k!==k){m0.setIcon(pinIcon(l));m0.__k=k}const ll=m0.getLatLng();if(ll.lat!==l.lat||ll.lng!==l.lng)m0.setLatLng([l.lat,l.lng])}
    else{const m=L.marker([l.lat,l.lng],{icon:pinIcon(l),keyboard:true,title:addr(l)}).addTo(map);m.__k=k;m.on("click",()=>{if(!drawing)openLead(l.id)});markers[l.id]=m}
  });
  Object.keys(markers).forEach(k=>{if(!seen[k]){map.removeLayer(markers[k]);delete markers[k]}});
}
function locate(fly){
  if(!navigator.geolocation){if(fly&&map)map.flyTo(CENTER,17);return}
  navigator.geolocation.getCurrentPosition(p=>{
    here=[p.coords.latitude,p.coords.longitude];hereT=Date.now();
    if(map){if(!meMarker)meMarker=L.marker(here,{icon:L.divIcon({className:"",html:'<div class="me-dot"></div>',iconSize:[16,16],iconAnchor:[8,8]}),interactive:false,zIndexOffset:1000}).addTo(map);else meMarker.setLatLng(here);if(fly||!locate.done)map.setView(here,17);locate.done=true}
  },()=>{if(fly&&map)map.flyTo(CENTER,17)},{enableHighAccuracy:true,timeout:10000,maximumAge:30000});
}
if(navigator.geolocation){try{navigator.geolocation.watchPosition(p=>{here=[p.coords.latitude,p.coords.longitude];hereT=Date.now();if(meMarker)meMarker.setLatLng(here)},()=>{},{enableHighAccuracy:true,maximumAge:15000})}catch(e){}}

/* ================= stats strip ================= */
function statStrip(){
  if(!S.me)return;
  const st=new Date();st.setHours(0,0,0,0);const s0=st.getTime();let k=0,ld=0,sa=0;
  S.leads.forEach(l=>l.hist.forEach(h=>{if(h.s&&h.rep===S.uid&&h.t>=s0){k++;if(isLead(h.s))ld++;if(isSale(h.s))sa++}}));
  $("statstrip").innerHTML=`<span class="stat"><span class="av" style="width:22px;height:22px;font-size:11px">${esc((S.me.name||"?")[0])}</span>${t("today")}</span>
    <span class="stat"><b>${k}</b> ${t("knocks")}</span><span class="stat"><b>${ld}</b> ${t("leadsW")}</span><span class="stat"><b>${sa}</b> ${t("sales")}</span>`;
  const due=S.leads.filter(l=>l.revisit&&l.revisit<=todayStr()&&!isClosed(l.status)&&l.owner===S.uid).length;
  if(due)$("statstrip").insertAdjacentHTML("beforeend",`<button class="stat due" id="dueChip">↻ <b>${due}</b> ${t("revToday")}</button>`);
  const nh=nhToday().length;
  if(nh)$("statstrip").insertAdjacentHTML("beforeend",`<button class="stat nh" id="nhChip">${svgI("sms",16)} <b>${nh}</b> ${t("nhChip")}</button>`);
  if($("nhChip"))$("nhChip").onclick=groupSms;
  const rp=S.leads.filter(l=>l.needsAttention&&(isChef()||l.owner===S.uid)).length;
  if(rp)$("statstrip").insertAdjacentHTML("afterbegin",`<button class="stat rp" id="rpChip">${svgI("sms",16)} <b>${rp}</b> ${t("replied")}</button>`);
  if($("rpChip"))$("rpChip").onclick=repliesSheet;
  if($("dueChip"))$("dueChip").onclick=()=>{calDay=todayStr();showTab("cal")};
  $("calCount").hidden=!due;$("calCount").textContent=due;
  const fc=P.filter.hide.length+(P.filter.mine?1:0);$("filterBadge").hidden=!fc;$("filterBadge").textContent=fc;
  const pend=isChef()?S.users.filter(u=>!u.active&&!u.off).length:0;
  $("moreCount").hidden=!pend;$("moreCount").textContent=pend;
}

/* ================= sheet ================= */
let sheetHideT=null,sheetKey=null;
function openSheet(html,key){
  const sh=$("sheet"),sc=$("scrim");clearTimeout(sheetHideT);
  const same=key&&key===sheetKey&&!sh.hidden&&sh.classList.contains("open");const y=sh.scrollTop;
  sh.innerHTML='<div class="grab"></div>'+html;sheetKey=key||null;
  if(sh.hidden){sh.hidden=false;sc.hidden=false;void sh.offsetHeight}
  sh.classList.add("open");sc.classList.add("open");sh.scrollTop=same?y:0;
}
function closeSheet(){
  flushSave();
  const sh=$("sheet"),sc=$("scrim");sh.classList.remove("open");sc.classList.remove("open");sheetKey=null;
  clearTimeout(sheetHideT);sheetHideT=setTimeout(()=>{sh.hidden=true;sc.hidden=true},230);
  if(openMode==="peek"){openMode=null;openId=null}
  if(selId&&openMode!=="detail"){const id=selId;selId=null;refreshPin(id)}
  if(tab!=="map"&&tab!=="more")renderTab();
}
/* saving while typing */
let pend=null;const noteDraft={};
function queueSave(l,key,val){if(pend&&pend.l!==l)flushSave();if(!pend)pend={l,patch:{}};pend.patch[key]=val;l[key]=val;clearTimeout(pend.timer);pend.timer=setTimeout(flushSave,700)}
function flushSave(){if(!pend)return;const p=pend;pend=null;clearTimeout(p.timer);updLead(p.l,p.patch);refreshPin(p.l.id)}
window.addEventListener("pagehide",flushSave);document.addEventListener("visibilitychange",()=>{if(document.hidden)flushSave()});
$("scrim").onclick=closeSheet;
(function(){const sh=$("sheet");let y0=null,dy=0;
  sh.addEventListener("touchstart",e=>{const tg=e.target;if(sh.scrollTop>0&&!tg.closest(".grab"))return;if(tg.closest("input,textarea,select,button,a"))return;y0=e.touches[0].clientY;dy=0;sh.style.transition="none"},{passive:true});
  sh.addEventListener("touchmove",e=>{if(y0==null)return;dy=Math.max(0,e.touches[0].clientY-y0);if(dy>0)sh.style.transform=`translateY(${dy}px)`},{passive:true});
  sh.addEventListener("touchend",()=>{if(y0==null)return;sh.style.transition="";sh.style.transform="";if(dy>90)closeSheet();y0=null})})();
document.addEventListener("keydown",e=>{if(e.key==="Escape"){if(openMode==="detail")closeDetail();else closeSheet()}});
const icon={
 call:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
 sms:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
 nav:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 19-9-9 19-2-8-8-2z"/></svg>',
 rev:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></svg>',
 x:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'};
function toLocalInput(ts){const d=new Date(ts);return dstr(d)+"T"+String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")}

/* ================= lead: quick card + details ================= */
const posNow=()=>here&&hereT&&Date.now()-hereT<180000?{lat:here[0],lng:here[1]}:{};
const curLead=id=>S.leads.find(x=>x.id===id);
const initials=n=>String(n||"?").split(/\s+/).map(x=>x[0]||"").join("").slice(0,2).toUpperCase();
function fullAddr(l){const a=addr(l);const tail=[l.zip,l.city].filter(Boolean).join(" ");return tail&&l.street?a+", "+tail:a}
function allNotes(l){const n=(l.notes||[]).slice();if(l.note)n.unshift({t:l.created||0,rep:l.owner,text:l.note,legacy:1});return n}

function setStatus(l,k){
  flushSave();try{navigator.vibrate&&navigator.vibrate(12)}catch(e){}
  const h=Object.assign({t:Date.now(),rep:S.uid,s:k},posNow());
  const before={status:l.status,revisit:l.revisit||null,owner:l.owner||null};
  const patch={status:k};
  if(isRevisitSt(k)&&!l.revisit)patch.revisit=dstr(new Date(Date.now()+14*DAY));
  if(isClosed(k))patch.revisit=null;
  if(!l.owner)patch.owner=S.uid;
  l.hist.push(h);Object.assign(l,patch);patch.updated=Date.now();patch.hist=FV.arrayUnion(h);
  db.collection("leads").doc(l.id).set(patch,{merge:true}).catch(err);
  refreshPin(l.id);statStrip();
  toast(t("statusSet")+stLabel(k),t("undo"),()=>{l.hist=l.hist.filter(x=>x!==h);Object.assign(l,before);
    db.collection("leads").doc(l.id).set(Object.assign({},before,{hist:FV.arrayRemove(h),updated:Date.now()}),{merge:true}).catch(err);refreshPin(l.id);statStrip();rerenderLead(l.id);toast(t("undone"))});
}
function addNoteTo(l,txt){
  const n=Object.assign({t:Date.now(),rep:S.uid,text:txt},posNow());
  l.notes=(l.notes||[]).concat(n);delete noteDraft[l.id];
  db.collection("leads").doc(l.id).set({notes:FV.arrayUnion(n),updated:Date.now()},{merge:true}).catch(err);toast(t("noteAdded"));
}
function statusRow(l){return `<div class="strow" role="group" aria-label="Status">${stList().map(x=>`<button class="stb" data-st="${x.k}" aria-pressed="${l.status===x.k}">${stDot(x.k,56)}<span>${esc(x.label)}</span></button>`).join("")}</div>`}
function bindStatusRow(root,l){root.querySelectorAll("[data-st]").forEach(b=>b.onclick=()=>{setStatus(l,b.dataset.st);rerenderLead(l.id)})}
function actionRow(l){return `<div class="actrow">
  <a class="act" href="${telHref(l.phone)}" aria-disabled="${!l.phone}" aria-label="${t("call")}">${svgI("phone",22)}<span>${t("call")}</span></a>
  <a class="act" href="${smsHref(l.phone,"")}" aria-disabled="${!l.phone}" aria-label="${t("sms")}">${svgI("sms",22)}<span>${t("sms")}</span></a>
  <a class="act" href="mailto:${esc(l.email||"")}" aria-disabled="${!l.email}" aria-label="${t("email")}">${svgI("mail",22)}<span>${t("email")}</span></a>
  <a class="act" href="https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}" target="_blank" rel="noopener" aria-label="${t("nav")}">${svgI("nav",22)}<span>${t("nav")}</span></a></div>`}
function dateChips(l){
  const m=l.meeting?fdt(l.meeting):t("bookMeeting");const r=l.revisit&&!isClosed(l.status)?t("revisit")+" "+fdate(l.revisit):t("setRevisit");
  return `<div class="chips dchips">
    <label class="chip ic ${l.meeting?"on":""}">${svgI("cal",18)}<span>${esc(m)}</span><input type="datetime-local" class="overpick" data-pick="meeting" value="${l.meeting?toLocalInput(l.meeting):""}" aria-label="${t("meeting")}"></label>
    <label class="chip ic ${l.revisit&&!isClosed(l.status)?"on":""}">${svgI("refresh",18)}<span>${esc(r)}</span><input type="date" class="overpick" data-pick="revisit" value="${l.revisit||""}" aria-label="${t("revisit")}"></label></div>`}
function bindDateChips(root,l){root.querySelectorAll("[data-pick]").forEach(inp=>inp.addEventListener("change",()=>{const k=inp.dataset.pick;const v=inp.value;
  updLead(l,{[k]:k==="meeting"?(v?new Date(v).getTime():null):(v||null)});statStrip();toast(t("saved"));rerenderLead(l.id)}))}

/* ----- quick card (peek) ----- */
let openId=null,openMode=null,detailTab="info";
function rerenderLead(id){if(openId!==id)return;if(openMode==="peek")openLead(id);else if(openMode==="detail")openDetail(id,detailTab,true)}
function openLead(id){
  if(pend&&pend.l.id!==id)flushSave();
  const l=curLead(id);if(!l)return;
  const prev=selId;selId=id;openId=id;openMode="peek";
  if(map){if(prev&&prev!==id)refreshPin(prev);refreshPin(id)}
  const s=st(l.status);const nm=nameOf(l);const notes=allNotes(l);
  openSheet(`
    <div class="peekhead">${stDot(l.status,46)}
      <div class="ph-t"><b>${esc(nm||addr(l))}</b><span>${l.status==="ny"?t("st_ny"):esc(s.label)}${lastVisit(l)?`, ${rel(lastVisit(l))}`:""}</span></div>
      <button class="btn sm ghost" id="toDetail">${t("details")}</button></div>
    ${nm?`<div class="peekaddr">${esc(fullAddr(l))}</div>`:([l.zip,l.city].filter(Boolean).length?`<div class="peekaddr sub">${esc([l.zip,l.city].filter(Boolean).join(" "))}</div>`:"")}
    ${l.needsAttention||l.smsUnread?`<button class="replied" id="toReplies">${svgI("sms",18)} ${t("custReplied")}</button>`:""}
    ${statusRow(l)}
    ${dateChips(l)}
    <div class="sec"><h3>${t("notes")}</h3>
      ${notes.length?notes.slice(-2).reverse().map(n=>`<div class="bubble"><p>${esc(n.text)}</p><small>${n.legacy?esc(rep(n.rep).name):fdt(n.t)+", "+esc(rep(n.rep).name)}</small></div>`).join(""):""}
      <form class="composer" id="qnForm"><input type="text" id="qn" placeholder="${t("addNotePh")}" value="${esc(noteDraft[l.id]||"")}" autocomplete="off" enterkeyhint="send"><button class="sendbtn" aria-label="${t("addNote")}">${svgI("plus",20,2.6)}</button></form>
    </div>
    ${actionRow(l)}
    <div class="assigned">${t("assignedTo")}: <b>${esc(rep(l.owner).name)}</b></div>`,"peek:"+l.id);
  const sh=$("sheet");
  bindStatusRow(sh,l);bindDateChips(sh,l);
  $("toDetail").onclick=()=>openDetail(l.id,"info");
  if($("toReplies"))$("toReplies").onclick=()=>openDetail(l.id,"notes");
  const qn=$("qn");qn.addEventListener("input",()=>{noteDraft[l.id]=qn.value});
  $("qnForm").onsubmit=e=>{e.preventDefault();const v=qn.value.trim();if(!v)return qn.focus();addNoteTo(l,v);openLead(l.id)};
}

/* ----- details page ----- */
function closeDetail(){const d=$("detail");flushSave();d.classList.remove("open");setTimeout(()=>{if(!d.classList.contains("open"))d.hidden=true},260);
  if(openMode==="detail"){openMode=null;openId=null;if(selId){const x=selId;selId=null;refreshPin(x)}}if(tab!=="map"&&tab!=="more")renderTab()}
function openDetail(id,tabName,keepScroll){
  const l=curLead(id);if(!l)return;
  if(!$("sheet").hidden){const sh=$("sheet"),sc=$("scrim");sh.classList.remove("open");sc.classList.remove("open");sheetKey=null;setTimeout(()=>{sh.hidden=true;sc.hidden=true},230)}
  openId=id;openMode="detail";detailTab=tabName||"info";selId=id;
  const d=$("detail");const body=d.querySelector(".dbody");const y=keepScroll&&body?body.scrollTop:0;
  const s=st(l.status);const nm=nameOf(l);
  const tabs=[["info",t("info")],["notes",t("notes")],["act",t("activity")]];
  d.innerHTML=`<header class="dhead">
      <button class="iconbtn flat" id="dBack" aria-label="${t("back")}">${svgI("back",24,2.4)}</button>
      <div class="dtitle"><b>${esc(nm||addr(l))}</b><span>${l.status==="ny"?"":stDot(l.status,22)} ${l.status==="ny"?t("st_ny"):esc(s.label)}</span></div>
      <span style="width:46px"></span></header>
    <nav class="dtabs" role="tablist">${tabs.map(([k,lbl])=>`<button role="tab" data-dt="${k}" aria-selected="${detailTab===k}">${lbl}</button>`).join("")}</nav>
    <div class="dbody">${detailTab==="info"?infoTab(l):detailTab==="notes"?notesTab(l):actTab(l)}</div>
    ${detailTab==="notes"?`<form class="composer docked" id="dnForm"><textarea id="dn" rows="1" placeholder="${t("addNotePh")}">${esc(noteDraft[l.id]||"")}</textarea><button class="sendbtn" aria-label="${t("addNote")}">${svgI("plus",20,2.6)}</button></form>`:""}`;
  if(d.hidden){d.hidden=false;void d.offsetHeight}d.classList.add("open");
  d.querySelector(".dbody").scrollTop=y;
  $("dBack").onclick=closeDetail;
  d.querySelectorAll("[data-dt]").forEach(b=>b.onclick=()=>{flushSave();openDetail(id,b.dataset.dt)});
  if(detailTab==="info")bindInfo(d,l);
  if(detailTab==="notes"){const dn=$("dn");dn.addEventListener("input",()=>{noteDraft[l.id]=dn.value;dn.style.height="auto";dn.style.height=Math.min(dn.scrollHeight,140)+"px"});
    $("dnForm").onsubmit=e=>{e.preventDefault();const v=dn.value.trim();if(!v)return dn.focus();addNoteTo(l,v);openDetail(id,"notes")};
    const b=d.querySelector(".dbody");b.scrollTop=b.scrollHeight}
}
function fld(id,label,val,type,wide){return `<div class="field ${wide?"wide":""}"><label for="${id}">${label}</label><input type="${type||"text"}" id="${id}" value="${esc(val||"")}" autocomplete="off"></div>`}
function infoTab(l){
  const chef=isChef();const area=areaOf(l.lat,l.lng);
  return `${actionRow(l)}
    <section class="dsec"><h3>${t("contact")}</h3>
      <div class="fgrid">${fld("f_company",t("company"),l.company,"text",1)}${fld("f_first",t("first"),l.first)}${fld("f_last",t("last"),l.last)}
      ${fld("f_phone",t("phone"),l.phone,"tel",1)}${fld("f_email",t("email"),l.email,"email",1)}</div>
      <label class="check"><input type="checkbox" id="f_smsok" ${l.smsOk?"checked":""}> ${t("smsOk")}</label></section>
    <section class="dsec"><h3>${t("address")}</h3>
      <div class="fgrid">${fld("f_street",t("street"),l.street,"text",1)}${fld("f_num",t("number"),l.num)}${fld("f_apt",t("apt"),l.apt)}${fld("f_zip",t("zip"),l.zip)}${fld("f_city",t("city"),l.city)}</div>
      <div class="sub">${area?esc(area.name):t("noArea")}</div></section>
    <section class="dsec"><h3>${t("assignedTo")}</h3>
      ${chef?`<select id="f_owner">${team().map(u=>`<option value="${u.id}" ${l.owner===u.id?"selected":""}>${esc(u.name)}</option>`).join("")}</select>`:`<p class="plain">${esc(rep(l.owner).name)}</p>`}</section>
    <section class="dsec"><h3>${t("statusH")}</h3>${statusRow(l)}</section>
    <section class="dsec"><h3>${t("meeting")}</h3>
      <input type="datetime-local" id="f_meet" value="${l.meeting?toLocalInput(l.meeting):""}" aria-label="${t("meeting")}">
      ${l.meeting?`<div class="chips"><a class="chip" href="${gcalUrl(l,"mote")}" target="_blank" rel="noopener">${t("gcal")}</a><a class="chip" href="${icsHref(l,"mote")}" download="mote.ics">${t("ical")}</a></div>`:""}</section>
    <section class="dsec"><h3>${t("revisit")}</h3>
      <div class="chips">${[1,2,4,8].map(w=>{const d=dstr(new Date(Date.now()+w*7*DAY));return `<button class="chip" data-rev="${d}" aria-pressed="${l.revisit===d}">${t("w"+w)}</button>`}).join("")}<button class="chip" id="revClear">${t("clear")}</button></div>
      <input type="date" id="f_rev" value="${l.revisit||""}" aria-label="${t("revisit")}">
      ${l.revisit?`<div class="chips"><a class="chip" href="${gcalUrl(l,"igen")}" target="_blank" rel="noopener">${t("gcal")}</a><a class="chip" href="${icsHref(l,"igen")}" download="aterbesok.ics">${t("ical")}</a></div>`:""}</section>
    ${(isChef()||l.owner===S.uid)?`<section class="dsec" id="delWrap"><button class="btn danger" id="delBtn">${svgI("trash",18)} ${t("del")}</button></section>`:""}`;
}
function bindInfo(root,l){
  const bt=(id,key)=>{const e=$(id);if(!e)return;e.addEventListener("input",()=>queueSave(l,key,e.value));e.addEventListener("blur",flushSave)};
  [["f_company","company"],["f_first","first"],["f_last","last"],["f_phone","phone"],["f_email","email"],["f_street","street"],["f_num","num"],["f_apt","apt"],["f_zip","zip"],["f_city","city"]].forEach(x=>bt(...x));
  bindStatusRow(root,l);
  $("f_smsok").onchange=e=>{updLead(l,{smsOk:e.target.checked});toast(t("saved"))};
  const ow=$("f_owner");if(ow)ow.onchange=()=>{const to=ow.value;const h=Object.assign({t:Date.now(),rep:S.uid,type:"assign",to},posNow());l.hist.push(h);l.owner=to;
    db.collection("leads").doc(l.id).set({owner:to,hist:FV.arrayUnion(h),updated:Date.now()},{merge:true}).catch(err);refreshPin(l.id);toast(t("saved"))};
  const dt=(id,key,tr)=>{const e=$(id);e.addEventListener("change",()=>{flushSave();updLead(l,{[key]:tr(e.value)});statStrip();toast(t("saved"));openDetail(l.id,"info",true)})};
  dt("f_rev","revisit",v=>v||null);dt("f_meet","meeting",v=>v?new Date(v).getTime():null);
  root.querySelectorAll("[data-rev]").forEach(b=>b.onclick=()=>{updLead(l,{revisit:b.dataset.rev});statStrip();openDetail(l.id,"info",true);toast(t("remindOn")+": "+fdate(l.revisit))});
  $("revClear").onclick=()=>{updLead(l,{revisit:null});statStrip();openDetail(l.id,"info",true)};
  const del=$("delBtn");if(del)del.onclick=()=>{$("delWrap").innerHTML=`<p class="plain"><b>${t("delQ")}</b></p><div class="confirm"><button class="btn ghost" id="delNo">${t("cancel")}</button><button class="btn danger" id="delYes">${t("yesDel")}</button></div>`;
    $("delNo").onclick=()=>openDetail(l.id,"info",true);$("delYes").onclick=()=>{S.leads=S.leads.filter(x=>x.id!==l.id);db.collection("leads").doc(l.id).delete().catch(err);selId=null;closeDetail();drawPins();statStrip()}};
}
function notesTab(l){
  const n=allNotes(l).map(x=>Object.assign({kind:"note"},x)).concat((l.sms||[]).map(x=>Object.assign({kind:"sms"},x)));
  n.sort((a,b)=>(a.t||0)-(b.t||0));
  if(l.needsAttention||l.smsUnread){db.collection("leads").doc(l.id).set({needsAttention:false,smsUnread:false},{merge:true}).catch(()=>{});l.needsAttention=false;l.smsUnread=false;setTimeout(statStrip,50)}
  if(!n.length)return `<div class="empty">${t("noNotes")}</div>`;
  return `${l.smsOptOut?`<div class="note" style="margin-top:12px">${t("optedOut")}</div>`:""}<div class="chat">${n.map(x=>{
    if(x.kind==="sms"&&x.dir==="in")return `<div class="msg"><span class="av sm cust">${esc(initials(nameOf(l)||"?"))}</span><div><div class="mhead"><b>${esc(nameOf(l)||l.phone||t("customer"))}</b><small>SMS, ${fdt(x.t)}</small></div><div class="bubble cust"><p>${esc(x.text)}</p></div></div></div>`;
    if(x.kind==="sms")return `<div class="msg"><span class="av sm">${esc(initials(rep(x.by).name))}</span><div><div class="mhead"><b>${esc(rep(x.by).name)}</b><small>SMS, ${fdt(x.t)}</small></div><div class="bubble sms"><p>${esc(x.text)}</p></div></div></div>`;
    return `<div class="msg"><span class="av sm">${esc(initials(rep(x.rep).name))}</span><div><div class="mhead"><b>${esc(rep(x.rep).name)}</b>${x.legacy?"":`<small>${fdt(x.t)}</small>`}</div><div class="bubble"><p>${esc(x.text)}</p></div></div></div>`}).join("")}</div>`;
}
function distBadge(e,l){
  if(e.lat==null)return `<span class="dist none">${t("noLocation")} ${svgI("locoff",18)}</span>`;
  const m=legM([e.lat,e.lng],[l.lat,l.lng]);const ok=m<=75;
  return `<span class="dist ${ok?"ok":"far"}">${fdist(m)} ${svgI(ok?"check":"alert",18,2.6)}</span>`;
}
function actTab(l){
  const ev=[];
  l.hist.forEach(h=>{
    if(h.type==="assign")ev.push({t:h.t,ic:`<span class="av sm">${esc(initials(rep(h.to).name))}</span>`,title:t("evAssign"),by:h.rep,detail:t("evAssignTo")+" "+rep(h.to).name,e:h});
    else if(h.type==="create")ev.push({t:h.t,ic:`<span class="sdot new" style="width:36px;height:36px"></span>`,title:t("evCreate"),by:h.rep,e:h});
    else ev.push({t:h.t,ic:stDot(h.s,36),title:t("evStatus")+" "+stLabel(h.s),by:h.rep,e:h});
  });
  (l.sms||[]).forEach(m=>ev.push({t:m.t,ic:`<span class="sdot" style="--c:${m.dir==="in"?"var(--accent)":"#4f7cff"};width:36px;height:36px">${svgI("sms",18)}</span>`,title:m.dir==="in"?t("evSmsIn"):t("evSmsOut"),by:m.dir==="in"?null:m.by,detail:m.text,e:{}}));
  (l.notes||[]).forEach(n=>ev.push({t:n.t,ic:`<span class="sdot" style="--c:var(--soft);color:var(--ink);width:36px;height:36px">${svgI("note",18)}</span>`,title:t("evNote"),by:n.rep,detail:n.text,e:n}));
  if(!l.hist.some(h=>h.type==="create")&&l.created)ev.push({t:l.created,ic:`<span class="sdot new" style="width:36px;height:36px"></span>`,title:t("evCreate"),by:l.owner,e:{}});
  ev.sort((a,b)=>b.t-a.t);
  if(!ev.length)return `<div class="empty">${t("noActivity")}</div>`;
  let out="",day="";
  ev.forEach(x=>{const d=new Date(x.t).toLocaleDateString(loc(),{weekday:"short",day:"numeric",month:"short",year:new Date(x.t).getFullYear()!==new Date().getFullYear()?"numeric":undefined});
    if(d!==day){out+=`<div class="dayhead">${d}</div>`;day=d}
    out+=`<div class="ev">${x.ic}<div class="evt"><b>${esc(x.title)}</b><small>${x.by?t("by")+" "+esc(rep(x.by).name)+" ":""}${t("at")} ${ftime(x.t)}</small>${x.detail?`<p>${esc(x.detail)}</p>`:""}</div>${distBadge(x.e,l)}</div>`});
  return `<div class="activity">${out}</div>`;
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
  const l={id:ref.id,lat,lng,street:pre?pre.street:"",num:pre?pre.num:"",first:"",last:"",phone:"",email:"",note:"",status:"ny",revisit:null,meeting:null,owner:S.uid,created:Date.now(),updated:Date.now(),hist:[Object.assign({t:Date.now(),rep:S.uid,type:"create"},posNow())]};
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
$("searchBtn").onclick=()=>{$("searchRow").hidden=false;$("statstrip").hidden=true;setTimeout(()=>$("q").focus(),30)};
$("searchClose").onclick=()=>{$("q").value="";$("searchRow").hidden=true;$("results").hidden=true;$("statstrip").hidden=false};
$("routeBtn").onclick=()=>{const ts=todayStr();const list=S.leads.filter(l=>l.owner===S.uid&&((l.revisit&&l.revisit<=ts&&!isClosed(l.status))||(l.meeting&&dstr(new Date(l.meeting))===ts)));planRoute(list)};

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
  if(!q){$("results").hidden=true;return}
  const hits=S.leads.filter(l=>(addr(l)+" "+nameOf(l)+" "+(l.phone||"")).toLowerCase().includes(q)).slice(0,12);
  $("statstrip").hidden=true;$("results").hidden=false;
  $("resultsBox").innerHTML=hits.length?hits.map(l=>{return `<button data-id="${l.id}">${stDot(l.status,28)}<span style="min-width:0"><b>${esc(addr(l))}</b><br><small style="color:var(--muted)">${esc(nameOf(l)||stLabel(l.status))}</small></span></button>`}).join(""):`<div class="empty">—</div>`;
  $("resultsBox").querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>{const l=S.leads.find(x=>x.id===b.dataset.id);$("q").value="";$("results").hidden=true;$("searchRow").hidden=true;$("statstrip").hidden=false;$("q").blur();map.flyTo([l.lat,l.lng],18);openLead(l.id)});
});

/* ================= filter ================= */
$("filterBtn").onclick=()=>{
  const render=()=>{openSheet(`
    <div class="shead"><h2>${t("filterTitle")}</h2><button class="x" id="sx">${icon.x}</button></div>
    <div class="legend" style="margin-top:14px">${["ny",...stList().map(s=>s.k)].map(k=>{const on=!P.filter.hide.includes(k);return `<button class="chip fchip" data-f="${k}" aria-pressed="${on}">${stDot(k,24)}${esc(stLabel(k))}</button>`}).join("")}</div>
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
  const F={all:l=>l.status!=="ny"||nameOf(l),mine:l=>l.owner===S.uid,due:l=>l.revisit&&l.revisit<=ts&&!isClosed(l.status),int:l=>isLead(l.status),mote:l=>!!l.meeting,kund:l=>isSale(l.status)};
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
  const nm=nameOf(l);
  const right=extra||(l.revisit&&!isClosed(l.status)?`↻ ${fdate(l.revisit)}`:fdist(dist(l)));
  return `<button class="li" data-id="${l.id}">${stDot(l.status,36)}
    <span class="t"><b>${esc(nm||addr(l))}</b><small>${nm?esc(addr(l))+", ":""}${esc(rep(l.owner).name)}, ${rel(lastVisit(l))}</small><span class="pill" style="--c:${l.status==="ny"?"var(--muted)":st(l.status).color};margin-top:4px">${esc(stLabel(l.status))}</span></span>
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
    if(l.revisit===ds&&!isClosed(l.status))ev.push({l,kind:"igen",sort:new Date(ds+"T23:00").getTime()});
  });
  return ev.sort((a,b)=>a.sort-b.sort);
}
function calView(){
  const ts=todayStr();if(!calDay)calDay=ts;
  const days=[];for(let i=0;i<14;i++)days.push(dstr(new Date(Date.now()+i*DAY)));
  const overdue=S.leads.filter(l=>mineOrChef(l)&&l.revisit&&l.revisit<ts&&!isClosed(l.status));
  const items=calItems(calDay);const withPhone=items.filter(e=>e.l.phone);
  $("calPane").innerHTML=`
    <div class="phead"><h1>${t("calTitle")}</h1></div>
    <div class="days">${days.map(d=>{const dt=new Date(d+"T12:00");const has=calItems(d).length;return `<button class="day" data-d="${d}" aria-pressed="${d===calDay}">${dt.toLocaleDateString(loc(),{weekday:"short"})}<b>${dt.getDate()}</b>${has?'<span class="n"></span>':""}</button>`}).join("")}</div>
    ${overdue.length&&calDay===ts?`<h3>${t("overdue")} · ${overdue.length}</h3><div class="list">${overdue.map(l=>liRow(l,`<span style="color:var(--st-nej)">${fdate(l.revisit)}</span>`)).join("")}</div>`:""}
    <div class="phead"><h3>${fdate(calDay)} · ${items.length}</h3><span class="row" style="gap:6px">${(items.length||(calDay===ts&&overdue.length))?`<button class="btn sm" id="route">${t("planRoute")}</button>`:""}${withPhone.length?`<button class="btn sm ghost" id="bulk">${t("sendAll")} (${withPhone.length})</button>`:""}</span></div>
    <div class="list">${items.length?items.map(e=>liRow(e.l,e.kind==="mote"?`◷ ${ftime(e.l.meeting)}`:`↻ ${t("revisit")}`)).join(""):`<div class="empty">${t("nothingDay")}</div>`}</div>`;
  bindRows($("calPane"));
  $("calPane").querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>{calDay=b.dataset.d;calView()});
  if($("bulk"))$("bulk").onclick=()=>bulkSms(withPhone.map(e=>e.l));
  if($("route"))$("route").onclick=()=>{const set=new Map();items.forEach(e=>set.set(e.l.id,e.l));if(calDay===ts)overdue.forEach(l=>set.set(l.id,l));planRoute([...set.values()])};
}
function bulkSms(list){
  const render=()=>{openSheet(`
    <div class="shead"><h2>${t("sendAll")}</h2><button class="x" id="sx">${icon.x}</button></div>
    <div class="sub">${t("sendAllSub")}</div>
    <div class="list" style="margin-top:14px">${list.map(l=>{return `<div class="li" style="cursor:default">${stDot(l.status,36)}
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
  S.leads.forEach(l=>l.hist.forEach(h=>{if(h.s&&h.t>=s0&&score[h.rep]){score[h.rep].k++;if(isLead(h.s))score[h.rep].ld++;if(isSale(h.s))score[h.rep].sa++}}));
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
    ${chef?`<h3>${t("impTitle")}</h3><div class="card"><div class="sub" style="margin:0">${t("impHelp")}</div><label class="btn ghost" for="impFile" style="cursor:pointer">${t("impPick")}</label><input type="file" id="impFile" accept=".csv,text/csv" hidden></div>`:""}
    <div class="card"><div class="field"><label for="myPhone">${t("myPhone")}</label><input type="tel" id="myPhone" value="${esc(S.me.phone||"")}" autocomplete="tel"></div></div>
    ${chef?`<h3>${t("smsH")}</h3><div class="card">
      <div class="field"><label for="elksFrom">${t("elksFromL")}</label><input type="tel" id="elksFrom" value="${esc(S.elksFrom||"")}" autocomplete="off"></div>
      <label class="check"><input type="checkbox" id="aiOn" ${S.aiSmsOn?"checked":""}> ${t("aiOnL")}</label>
      <div class="field"><label for="aiInfo">${t("aiInfoL")}</label><textarea id="aiInfo" rows="10">${esc(S.aiInfo||AI_INFO_DEFAULT)}</textarea><div class="sub" style="margin:0">${t("aiInfoHelp")}</div></div></div>`:""}
    <h3>${t("tmplNH")}</h3>
    <div class="card"><textarea id="tmplNH" rows="5" ${chef?"":"readonly"}>${esc(S.tmplNH||t("tmplNHDefault"))}</textarea><div class="sub" style="margin:0">${chef?t("tmplNHHelp"):t("tmplChefOnly")}</div></div>
    <h3>${t("tmpl")}</h3>
    <div class="card"><textarea id="tmpl" rows="4" ${chef?"":"readonly"}>${esc(S.tmpl||t("tmplDefault"))}</textarea><div class="sub" style="margin:0">${chef?t("tmplHelp"):t("tmplChefOnly")}</div></div>
    <h3>${t("stEditH")}</h3>
    ${chef?`<div class="card" id="stEditor"><div class="sub" style="margin:0">${t("stEditHelp")}</div><div id="stRows"></div><button class="btn ghost" id="stAddB">${svgI("plus",18)} ${t("stAdd")}</button><button class="btn" id="stSaveB">${t("stSave")}</button></div>`
      :`<div class="card"><div class="legend">${stList().map(x=>`<span>${stDot(x.k,24)}${esc(x.label)}</span>`).join("")}</div></div>`}
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
    $("impFile").onchange=e=>{const f=e.target.files&&e.target.files[0];if(f)readImport(f);e.target.value=""};
    stEditor();
    $("tmpl").onchange=()=>{const v=$("tmpl").value.trim();db.collection("settings").doc("main").set({tmpl:v&&v!==t("tmplDefault")?v:null},{merge:true}).then(()=>toast(t("saved"))).catch(err)};
  }
  $("myPhone").onchange=()=>{const v=$("myPhone").value.trim();S.me.phone=v;db.collection("users").doc(S.uid).set({phone:v},{merge:true}).then(()=>toast(t("saved"))).catch(err)};
  if(chef){const sv=(o)=>db.collection("settings").doc("main").set(o,{merge:true}).then(()=>toast(t("saved"))).catch(err);
    $("elksFrom").onchange=()=>sv({elksFrom:$("elksFrom").value.replace(/[^\d+]/g,"")});
    $("aiOn").onchange=()=>sv({aiSmsOn:$("aiOn").checked});
    $("aiInfo").onchange=()=>sv({aiInfo:$("aiInfo").value.trim()});}
  if(chef)$("tmplNH").onchange=()=>{const v=$("tmplNH").value.trim();db.collection("settings").doc("main").set({tmplNH:v&&v!==t("tmplNHDefault")?v:null},{merge:true}).then(()=>toast(t("saved"))).catch(err)};
  $("lsv").onclick=()=>{P.lang="sv";savePrefs();applyLang();moreView()};
  $("len").onclick=()=>{P.lang="en";savePrefs();applyLang();moreView()};
}




/* ================= group SMS: today's Not home ================= */
function nhToday(){
  const st0=new Date();st0.setHours(0,0,0,0);const s0=st0.getTime();
  return S.leads.filter(l=>isNotHome(l.status)&&l.hist.some(h=>h.s===l.status&&h.t>=s0&&(h.rep===S.uid)));
}
function fillNH(l){
  const name=(l.first||"").trim();
  let txt=(S.tmplNH||t("tmplNHDefault")).replace(/\{namn\}/g,name).replace(/\{säljare\}/g,S.me?S.me.name:"").replace(/\{telefon\}/g,(S.me&&S.me.phone)||"").replace(/\{adress\}/g,addr(l));
  return txt.replace(/Hej !/,"Hej!").replace(/Hi !/,"Hi!").replace(/,\s*$/,"").replace(/, $/,"");
}
function smsSentStatus(){return (stList().find(x=>x.flag==="smssent")||{}).k}
async function ensureSmsStatus(){
  if(smsSentStatus())return smsSentStatus();
  const add={k:"smss",label:"SMS skickat",color:"#4f7cff",icon:"sms",flag:"smssent"};
  const list=stList().concat(add);S.statuses=list;
  if(isChef())db.collection("settings").doc("main").set({statuses:list},{merge:true}).catch(err);
  return add.k;
}
let nhSel=null;
function groupSms(){
  const all=nhToday();const withPhone=all.filter(l=>l.phone);const noPhone=all.length-withPhone.length;
  if(!nhSel)nhSel=new Set(withPhone.filter(l=>l.smsOk).map(l=>l.id));
  const queue=withPhone.filter(l=>nhSel.has(l.id));
  const next=queue[0];
  openSheet(`<div class="shead"><h2>${t("nhTitle")}</h2><button class="x" id="sx">${icon.x}</button></div>
    <p class="sub">${t("nhSub")}</p>
    ${withPhone.length?`<div class="list" style="margin-top:12px">${withPhone.map(l=>`<label class="li nhrow"><input type="checkbox" data-nh="${l.id}" ${nhSel.has(l.id)?"checked":""}>
      <span class="t"><b>${esc(nameOf(l)||addr(l))}</b><small>${esc(l.phone)}${nameOf(l)?", "+esc(addr(l)):""}</small>${l.smsOk?"":`<span class="pill" style="--c:var(--st-igen);margin-top:4px">${t("nhNoConsent")}</span>`}</span>
      <a class="btn sm ghost" data-one="${l.id}" href="${smsHref(l.phone,fillNH(l))}">${t("send")}</a></label>`).join("")}</div>`:`<div class="empty">${t("nhNone")}</div>`}
    ${noPhone?`<p class="sub">${noPhone} ${t("nhNoPhone")}.</p>`:""}
    ${next?`<div class="sec"><h3>${t("nhMsg")}</h3><div class="bubble"><p>${esc(fillNH(next))}</p></div>
      ${S.elksFrom?`<div id="elksWrap"><button class="btn" id="elksAll">${t("elksAll")} (${queue.length})</button></div>`:""}
      <a class="btn ${S.elksFrom?"ghost":""}" id="nhNext" href="${smsHref(next.phone,fillNH(next))}">${t("nhNext")}: ${esc(nameOf(next)||addr(next))} (${queue.length} ${t("nhLeft")})</a></div>`:(withPhone.length?`<div class="sec"><div class="note">${t("nhAllDone")}</div></div>`:"")}`,"nh");
  $("sx").onclick=()=>{nhSel=null;closeSheet()};
  $("sheet").querySelectorAll("[data-nh]").forEach(c=>c.onchange=()=>{c.checked?nhSel.add(c.dataset.nh):nhSel.delete(c.dataset.nh);groupSms()});
  const mark=async id=>{const l=curLead(id);if(!l)return;const k=await ensureSmsStatus();
    const h=Object.assign({t:Date.now(),rep:S.uid,s:k},posNow());l.hist.push(h);l.status=k;l.smsSent=todayStr();
    db.collection("leads").doc(l.id).set({status:k,smsSent:todayStr(),hist:FV.arrayUnion(h),updated:Date.now()},{merge:true}).catch(err);
    nhSel.delete(id);refreshPin(id);statStrip();setTimeout(groupSms,500)};
  $("sheet").querySelectorAll("[data-one]").forEach(a=>a.addEventListener("click",()=>mark(a.dataset.one)));
  if($("nhNext"))$("nhNext").addEventListener("click",()=>mark(next.id));
  if($("elksAll"))$("elksAll").onclick=()=>{const w=$("elksWrap");w.innerHTML=`<p class="plain"><b>${t("elksConfirm").replace("{n}",queue.length)}</b></p><div class="confirm"><button class="btn ghost" id="eNo">${t("cancel")}</button><button class="btn" id="eYes">${t("elksYes")}</button></div>`;
    $("eNo").onclick=groupSms;$("eYes").onclick=async()=>{$("eYes").disabled=true;$("eYes").textContent=t("elksBusy");await ensureSmsStatus();
      try{const fn=firebase.app().functions("europe-north1").httpsCallable("sendSms");
        const r=await fn({items:queue.map(l=>({id:l.id,text:fillNH(l)}))});const res=(r.data&&r.data.results)||[];const ok=res.filter(x=>x.ok).length;
        res.filter(x=>x.ok).forEach(x=>nhSel.delete(x.id));toast(t("elksDone").replace("{ok}",ok).replace("{n}",queue.length));groupSms()}
      catch(e){console.error(e);toast(t("elksFail")+": "+(e.message||""));groupSms()}}};
}

/* ================= SMS replies ================= */
function repliesSheet(){
  const list=S.leads.filter(l=>l.needsAttention&&(isChef()||l.owner===S.uid)).sort((a,b)=>(b.updated||0)-(a.updated||0));
  openSheet(`<div class="shead"><h2>${t("repliedTitle")}</h2><button class="x" id="sx">${icon.x}</button></div>
    <div class="list" style="margin-top:12px">${list.map(l=>{const last=(l.sms||[]).filter(x=>x.dir==="in").slice(-1)[0];return `<button class="li" data-rp="${l.id}">${stDot(l.status,36)}<span class="t"><b>${esc(nameOf(l)||addr(l))}</b><small>${esc(last?last.text:"")}</small></span><span class="r">${last?fdt(last.t):""}</span></button>`}).join("")}</div>`,"replies");
  $("sx").onclick=closeSheet;
  $("sheet").querySelectorAll("[data-rp]").forEach(b=>b.onclick=()=>openDetail(b.dataset.rp,"notes"));
}
/* ================= status editor (chef) ================= */
let stDraft=null;
function stEditor(){
  if(!$("stRows"))return;
  if(!stDraft)stDraft=JSON.parse(JSON.stringify(stList()));
  const flags=["sale","lead","revisit","nothome","smssent","closed","none"];
  $("stRows").innerHTML=stDraft.map((x,i)=>`<div class="strow-ed">
    <span class="sdot" style="--c:${x.color};width:40px;height:40px">${svgI(x.icon,20,2.6)}</span>
    <div class="ed">
      <input type="text" data-i="${i}" data-f="label" value="${esc(x.label)}" aria-label="${t("stName")}" placeholder="${t("stName")}">
      <div class="edrow"><input type="color" data-i="${i}" data-f="color" value="${esc(x.color)}" aria-label="${t("stColor")}">
      <select data-i="${i}" data-f="icon" aria-label="${t("stIcon")}">${ICON_NAMES.map(n=>`<option value="${n}" ${x.icon===n?"selected":""}>${n}</option>`).join("")}</select>
      <select data-i="${i}" data-f="flag" aria-label="${t("stType")}">${flags.map(f=>`<option value="${f}" ${x.flag===f?"selected":""}>${t("fl_"+f)}</option>`).join("")}</select>
      <button class="iconbtn flat sm" data-del="${i}" aria-label="${t("stDel")}">${svgI("trash",18)}</button></div></div></div>`).join("");
  $("stRows").querySelectorAll("[data-f]").forEach(el=>el.addEventListener(el.tagName==="INPUT"&&el.type==="text"?"input":"change",()=>{stDraft[+el.dataset.i][el.dataset.f]=el.value;if(el.dataset.f!=="label")stEditor()}));
  $("stRows").querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{stDraft.splice(+b.dataset.del,1);stEditor()});
  $("stAddB").onclick=()=>{stDraft.push({k:"s"+Date.now().toString(36),label:"",color:"#0b6e7f",icon:"check",flag:"none"});stEditor();const ins=$("stRows").querySelectorAll('input[type=text]');ins[ins.length-1].focus()};
  $("stSaveB").onclick=()=>{if(stDraft.some(x=>!x.label.trim()))return toast(t("stNeedName"));
    const clean=stDraft.map(x=>({k:x.k,label:x.label.trim(),color:x.color,icon:x.icon,flag:x.flag}));
    db.collection("settings").doc("main").set({statuses:clean},{merge:true}).then(()=>{stDraft=null;toast(t("saved"))}).catch(err)};
}
/* ================= calendar export ================= */
function calTimes(l,kind){
  if(kind==="mote"&&l.meeting){const s=new Date(l.meeting),e=new Date(l.meeting+30*6e4);return {s,e,allDay:false}}
  const d=new Date((l.revisit||todayStr())+"T00:00:00");return {s:d,e:new Date(d.getTime()+DAY),allDay:true};
}
const z2=n=>String(n).padStart(2,"0");
const utcStamp=d=>d.getUTCFullYear()+z2(d.getUTCMonth()+1)+z2(d.getUTCDate())+"T"+z2(d.getUTCHours())+z2(d.getUTCMinutes())+"00Z";
const dayStamp=d=>d.getFullYear()+z2(d.getMonth()+1)+z2(d.getDate());
function calText(l,kind){return {title:(kind==="mote"?t("meeting"):t("revisit"))+": "+(nameOf(l)||addr(l)),details:[nameOf(l),l.phone,(l.notes&&l.notes.length?l.notes[l.notes.length-1].text:l.note)||""].filter(Boolean).join("\n")+"\nKnacka – app.fiskaren.nu",where:addr(l)}}
function gcalUrl(l,kind){const c=calTimes(l,kind),x=calText(l,kind);const dates=c.allDay?dayStamp(c.s)+"/"+dayStamp(c.e):utcStamp(c.s)+"/"+utcStamp(c.e);
  return "https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(x.title)+"&dates="+dates+"&details="+encodeURIComponent(x.details)+"&location="+encodeURIComponent(x.where)}
function icsHref(l,kind){const c=calTimes(l,kind),x=calText(l,kind);const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Fiskaren//Knacka//SV","BEGIN:VEVENT","UID:"+l.id+"-"+kind+"@knacka","DTSTAMP:"+utcStamp(new Date()),
  c.allDay?"DTSTART;VALUE=DATE:"+dayStamp(c.s):"DTSTART:"+utcStamp(c.s),c.allDay?"DTEND;VALUE=DATE:"+dayStamp(c.e):"DTEND:"+utcStamp(c.e),
  "SUMMARY:"+x.title.replace(/[,;]/g," "),"LOCATION:"+x.where.replace(/[,;]/g," "),"DESCRIPTION:"+x.details.replace(/\n/g,"\\n").replace(/[,;]/g," "),
  "BEGIN:VALARM","TRIGGER:-PT30M","ACTION:DISPLAY","DESCRIPTION:"+x.title.replace(/[,;]/g," "),"END:VALARM","END:VEVENT","END:VCALENDAR"].join("\r\n");
  return "data:text/calendar;charset=utf-8,"+encodeURIComponent(ics)}

/* ================= route planning ================= */
let routeLayer=null;
function legM(a,b){const dy=(a[0]-b[0])*111320,dx=(a[1]-b[1])*111320*Math.cos(a[0]*Math.PI/180);return Math.sqrt(dx*dx+dy*dy)}
function planRoute(list){
  const stops=list.filter(l=>l.lat&&l.lng);
  if(!stops.length)return toast(t("noStops"));
  const start=here||(map?[map.getCenter().lat,map.getCenter().lng]:CENTER);
  // nearest neighbour
  const left=stops.slice(),order=[];let cur=start;
  while(left.length){let bi=0,bd=Infinity;left.forEach((l,i)=>{const d=legM(cur,[l.lat,l.lng]);if(d<bd){bd=d;bi=i}});const n=left.splice(bi,1)[0];order.push(n);cur=[n.lat,n.lng]}
  // 2-opt
  const P=[start,...order.map(l=>[l.lat,l.lng])];
  const len=a=>{let s=0;for(let i=1;i<a.length;i++)s+=legM(a[i-1],a[i]);return s};
  let improved=true,guard=0;
  while(improved&&guard++<50){improved=false;
    for(let i=1;i<P.length-1;i++)for(let k=i+1;k<P.length;k++){
      const a=P[i-1],b=P[i],c=P[k],d=P[k+1];
      const delta=legM(a,c)+(d?legM(b,d):0)-legM(a,b)-(d?legM(c,d):0);
      if(delta<-1){P.splice(i,k-i+1,...P.slice(i,k+1).reverse());order.splice(i-1,k-i+1,...order.slice(i-1,k).reverse());improved=true}
    }}
  showRoute(start,order,len(P));
}
function showRoute(start,order,meters){
  closeSheet();showTab("map");endRoute(true);
  routeLayer=L.layerGroup().addTo(map);
  const pts=[start,...order.map(l=>[l.lat,l.lng])];
  L.polyline(pts,{color:"#2d7ff9",weight:4,opacity:.85,dashArray:"8 6",interactive:false}).addTo(routeLayer);
  order.forEach((l,i)=>L.marker([l.lat,l.lng],{icon:L.divIcon({className:"",html:`<div class="rnum">${i+1}</div>`,iconSize:[22,22],iconAnchor:[11,42]}),zIndexOffset:900,interactive:false}).addTo(routeLayer));
  map.fitBounds(L.latLngBounds(pts).pad(0.15));
  const first=order.slice(0,10);
  const dest=first[first.length-1];
  const wp=first.slice(0,-1).map(l=>l.lat+","+l.lng).join("|");
  const url="https://www.google.com/maps/dir/?api=1"+(here?"&origin="+here[0]+","+here[1]:"")+"&destination="+dest.lat+","+dest.lng+(wp?"&waypoints="+encodeURIComponent(wp):"");
  $("routeInfo").innerHTML=`<b>${order.length} ${t("routeStops")}</b> · ${fdist(meters)}`+(order.length>10?`<small>${t("routeMax")}</small>`:"");
  $("routeGo").href=url;$("routebar").hidden=false;$("fabs").hidden=true;
}
function endRoute(silent){if(routeLayer){map.removeLayer(routeLayer);routeLayer=null}$("routebar").hidden=true;if(!silent)$("fabs").hidden=false}
$("routeEnd").onclick=()=>endRoute();

/* ================= import (SalesRabbit CSV) ================= */
function parseCSV(text){
  text=text.replace(/^\uFEFF/,"");
  const first=text.split(/\r?\n/)[0]||"";const delim=(first.split(";").length>first.split(",").length)?";":(first.split("\t").length>first.split(",").length?"\t":",");
  const rows=[];let row=[],f="",q=false;
  for(let i=0;i<text.length;i++){const c=text[i];
    if(q){if(c==='"'){if(text[i+1]==='"'){f+='"';i++}else q=false}else f+=c}
    else if(c==='"')q=true;else if(c===delim){row.push(f);f=""}else if(c==="\n"){row.push(f);rows.push(row);row=[];f=""}else if(c!=="\r")f+=c}
  if(f||row.length){row.push(f);rows.push(row)}
  return rows.filter(r=>r.some(x=>x.trim()));
}
const COLS={
  first:["first name","firstname","förnamn","fornamn","first"],last:["last name","lastname","efternamn","last"],name:["full name","name","namn","customer","kund"],
  phone:["phone","mobile","mobil","telefon","cell","tel"],email:["email","e-mail","e-post","mail"],
  street:["street address","address 1","address1","address","adress","street","gata","gatuadress"],num:["house number","street number","husnummer","nummer"],
  zip:["zip","postal","postnummer","postcode"],city:["city","ort","stad","postort"],
  lat:["latitude","lat"],lng:["longitude","lng","lon","long"],kstatus:["knacka status"],status:["status","disposition","lead status"],meeting:["appointment","möte","meeting"],
  note:["notes","note","anteckning","anteckningar","comments","kommentar"],owner:["owner","assigned","rep","user","säljare","saljare","created by"],
  date:["last visit","updated","modified","date","created","datum"]};
function mapCols(head){
  const h=head.map(x=>x.trim().toLowerCase());const used=new Set();const m={};
  Object.entries(COLS).forEach(([k,alts])=>{for(const a of alts){const i=h.findIndex((x,j)=>!used.has(j)&&(x===a));if(i>=0){m[k]=i;used.add(i);return}}
    for(const a of alts){const i=h.findIndex((x,j)=>!used.has(j)&&x.includes(a));if(i>=0){m[k]=i;used.add(i);return}}});
  return m;
}
function mapStatus(v){const raw=(v||"").trim();if(!raw)return"ny";
  const exact=stList().find(x=>x.label.toLowerCase()===raw.toLowerCase());if(exact)return exact.k;
  const lv=raw.toLowerCase();const byFlag=f=>(stList().find(x=>x.flag===f)||{}).k;
  if(/do not|dnk|knacka ej|no soliciting/.test(lv))return byFlag("closed")||"aldrig";
  if(/sold|customer|kund|sale|won|såld|abonnemang/.test(lv))return byFlag("sale")||"kund";
  if(/come back|callback|call back|go back|återkom|aterkom|later|kom tillbaka|revisit/.test(lv))return byFlag("revisit")||"igen";
  if(/interest|lead|hot|warm|intresse|appoint|möte/.test(lv))return byFlag("lead")||"int";
  if(/not interested|nej/.test(lv))return byFlag("closed")||"nej";
  return (stList().find(x=>x.flag==="none")||{}).k||"borta"}
function splitAddr(a){a=(a||"").trim();let m=a.match(/^(.*?)[\s,]+(\d+\s*[A-Za-z]?(?:\s*-\s*\d+)?)$/);if(m)return {street:m[1].trim(),num:m[2].replace(/\s+/g,"")};
  m=a.match(/^(\d+\s*[A-Za-z]?)\s+(.*)$/);if(m)return {street:m[2].trim(),num:m[1].replace(/\s+/g,"")};return {street:a,num:""}}
function readImport(file){
  const fr=new FileReader();
  fr.onload=()=>{let rows;try{rows=parseCSV(String(fr.result))}catch(e){rows=null}
    if(!rows||rows.length<2)return toast(t("impBad"));
    const head=rows[0],m=mapCols(head);
    if(m.street==null&&m.lat==null)return toast(t("impBad"));
    const g=(r,k)=>m[k]!=null?(r[m[k]]||"").trim():"";
    const exist=new Set(S.leads.map(l=>((l.street||"")+"|"+(l.num||"")).toLowerCase()));
    const items=[];let dup=0;
    // leads saved earlier with "?" where å/ä/ö should be: repaired from the file instead of imported twice
    const rx=v=>new RegExp("^"+String(v||"").toLowerCase().replace(/[.*+^${}()|[\]\\]/g,"\\$&").replace(/\?/g,".")+"$");
    const broken=S.leads.filter(l=>(l.street||"").includes("?")).map(l=>({l,re:rx(l.street),num:(l.num||"").toLowerCase()}));
    const repairs=[];
    const existPos=new Set(S.leads.filter(l=>typeof l.lat==="number"&&typeof l.lng==="number").map(l=>l.lat.toFixed(5)+","+l.lng.toFixed(5)));
    rows.slice(1).forEach(r=>{
      let {street,num}=splitAddr(g(r,"street"));if(g(r,"num"))num=g(r,"num");
      let first=g(r,"first"),last=g(r,"last");if(!first&&!last&&g(r,"name")){const p=g(r,"name").split(/\s+/);first=p.shift()||"";last=p.join(" ")}
      if(street&&!street.includes("?")){const bi=broken.findIndex(x=>x.num===num.toLowerCase()&&x.re.test(street.toLowerCase()));
        if(bi>=0){const l=broken.splice(bi,1)[0].l;const u={street,updated:Date.now()};
          if((l.city||"").includes("?")&&g(r,"city"))u.city=g(r,"city");
          if((l.first||"").includes("?")&&rx(l.first).test(first.toLowerCase()))u.first=first;
          if((l.last||"").includes("?")&&rx(l.last).test(last.toLowerCase()))u.last=last;
          repairs.push({id:l.id,u});exist.add((street+"|"+num).toLowerCase());return}}
      // rows without a street name (or with coordinates typed as the street) are recognised by their position instead
      const coordSt=/^\s*-?\d+[.,]\d+\s*[,;]\s*-?\d+[.,]\d+\s*$/.test(street);if(coordSt){street="";num=""}
      if(!street){const la0=parseFloat(g(r,"lat").replace(",",".")),lo0=parseFloat(g(r,"lng").replace(",","."));
        if(isFinite(la0)&&isFinite(lo0)){const pk=la0.toFixed(5)+","+lo0.toFixed(5);if(existPos.has(pk)){dup++;return}existPos.add(pk)}}
      const key=(street+"|"+num).toLowerCase();if(street&&exist.has(key)){dup++;return}exist.add(key);
      let lat=parseFloat(g(r,"lat").replace(",",".")),lng=parseFloat(g(r,"lng").replace(",","."));if(!(lat>54&&lat<70&&lng>10&&lng<25)){lat=NaN;lng=NaN}
      const ow=g(r,"owner").toLowerCase();const owner=(team().find(u=>ow&&(u.email.toLowerCase()===ow||ow.includes((u.name||"").toLowerCase().split(" ")[0])))||{}).id||S.uid;
      const dt=Date.parse(g(r,"date"));const mt=Date.parse(g(r,"meeting"));const ks=g(r,"kstatus");
      items.push({first,last,phone:g(r,"phone"),email:g(r,"email"),street,num,zip:g(r,"zip"),city:g(r,"city"),
        lat:isFinite(lat)?lat:null,lng:isFinite(lng)?lng:null,status:ks||mapStatus(g(r,"status")),statusRaw:ks?stLabel(ks):g(r,"status"),note:g(r,"note"),owner,t:isFinite(dt)?dt:Date.now(),meeting:isFinite(mt)?mt:null});
    });
    importSheet(head,m,items,dup,rows.length-1,repairs);
  };
  fr.readAsText(file);
}
function importSheet(head,m,items,dup,total,repairs=[]){
  const noPos=items.filter(i=>i.lat==null).length;
  const stc={};items.forEach(i=>stc[i.status]=(stc[i.status]||0)+1);
  openSheet(`<div class="shead"><h2>${t("impTitle")}</h2><button class="x" id="sx">${icon.x}</button></div>
    <div class="sec"><div class="card" style="gap:6px">
      <div><b>${total}</b> ${t("impFound")} · <b>${items.length}</b> ${t("impNew")} · ${dup} ${t("impDup")}</div>
      ${repairs.length?`<div class="sub" style="margin:0"><b>${repairs.length}</b> ${t("impFix")}</div>`:""}
      ${noPos?`<div class="sub" style="margin:0"><b>${noPos}</b> ${t("impNoPos")}</div>`:""}
      <div class="chips">${Object.entries(stc).map(([k,n])=>`<span class="pill" style="--c:${k==="ny"?"var(--muted)":st(k).color}">${esc(stLabel(k))} ${n}</span>`).join("")}</div></div>
    <h3>${t("impCols")}</h3><div class="sub" style="margin:0">${Object.entries(m).map(([k,i])=>`${k} ← <b>${esc(head[i])}</b>`).join(" · ")}</div>
    <div class="list">${items.slice(0,3).map(i=>`<div class="li" style="cursor:default;grid-template-columns:1fr auto"><span class="t"><b>${esc((i.street+" "+i.num).trim()||"—")}</b><small>${esc((i.first+" "+i.last).trim())} ${esc(i.phone)} · ${esc(i.statusRaw||"")}</small></span><span class="r">${esc(rep(i.owner).name)}</span></div>`).join("")}</div>
    <div id="impProg" class="sub" hidden></div>
    <button class="btn" id="impGo" ${items.length||repairs.length?"":"disabled"}>${t("impGo")} ${items.length}</button></div>`,"import");
  $("sx").onclick=closeSheet;
  $("impGo").onclick=()=>runImport(items,repairs);
}
async function geocode(i){
  // several attempts: exact address with zip, then with town, then street only in the town
  const sn=(i.street+" "+i.num).trim(),city=/län$|county$/i.test(i.city||"")?"":(i.city||"");
  const tries=[[sn,[i.zip,city].filter(Boolean).join(" ")],[sn,city],[sn,i.zip],[sn,"Stockholms län"],[i.street,city||i.zip]].map(x=>x.filter(Boolean).join(", "));
  const seen=new Set();
  for(const q of tries){if(!q||seen.has(q))continue;seen.add(q);
    // never more than one lookup per second, also after a hit, otherwise the map service starts refusing
    const wait=1150-(Date.now()-(geocode.last||0));if(wait>0)await new Promise(r=>setTimeout(r,wait));geocode.last=Date.now();
    try{let r=await fetch("https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=se&q="+encodeURIComponent(q));
      if(r.status===429||r.status>=500){await new Promise(x=>setTimeout(x,6000));geocode.last=Date.now();r=await fetch("https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=se&q="+encodeURIComponent(q))}
      const j=await r.json();
      if(j&&j[0]){const la=parseFloat(j[0].lat),lo=parseFloat(j[0].lon);if(la>58.5&&la<60.5&&lo>16.5&&lo<19.8)return [la,lo]}}catch(e){}
    // second map service (Photon) when the first one finds nothing or refuses
    try{const r=await fetch("https://photon.komoot.io/api/?limit=1&lat=59.33&lon=18.06&q="+encodeURIComponent(q));const j=await r.json();const f=j&&j.features&&j.features[0];
      if(f&&(f.properties.countrycode||"").toUpperCase()==="SE"&&(!i.num||!f.properties.housenumber||String(f.properties.housenumber).toLowerCase()===String(i.num).toLowerCase()||q===tries[tries.length-1])){const [lo,la]=f.geometry.coordinates;if(la>58.5&&la<60.5&&lo>16.5&&lo<19.8)return [la,lo]}}catch(e){}}
  return null;
}

async function runImport(items,repairs=[]){
  const go=$("impGo"),pr=$("impProg");go.disabled=true;go.textContent=t("impBusy");pr.hidden=false;
  try{for(let s0=0;s0<repairs.length;s0+=400){const b=db.batch();repairs.slice(s0,s0+400).forEach(x=>b.update(db.collection("leads").doc(x.id),x.u));await b.commit()}}catch(e){err(e);return}
  const toDoc=i=>({lat:i.lat,lng:i.lng,street:i.street,num:i.num,zip:i.zip||"",city:i.city||"",first:i.first,last:i.last,phone:i.phone,email:i.email,note:"",status:i.status,
    revisit:isRevisitSt(i.status)?dstr(new Date(Date.now()+7*DAY)):null,meeting:i.meeting||null,owner:i.owner,created:i.t,updated:Date.now(),
    hist:i.status==="ny"?[]:[{t:i.t,rep:i.owner,s:i.status}],notes:i.note?[{t:i.t,rep:i.owner,text:i.note}]:[],source:"salesrabbit"});
  const write=async list=>{for(let s0=0;s0<list.length;s0+=400){const b=db.batch();list.slice(s0,s0+400).forEach(i=>b.set(db.collection("leads").doc(),toDoc(i)));await b.commit()}};
  let done=0,failed=0;
  // 1) everything that already has a position goes in right away
  const ok=items.filter(i=>i.lat!=null),need=items.filter(i=>i.lat==null);
  try{for(let s0=0;s0<ok.length;s0+=400){await write(ok.slice(s0,s0+400));done=Math.min(ok.length,s0+400);pr.textContent=`${t("impBusy")} ${done} / ${items.length}`}}catch(e){err(e);return}
  // 2) the rest is looked up on the map and saved 20 at a time, so nothing is lost if the page closes
  let buf=[];
  for(let n=0;n<need.length;n++){
    const p=await geocode(need[n]);if(p){need[n].lat=p[0];need[n].lng=p[1];buf.push(need[n])}else failed++;
    if(buf.length>=20||n===need.length-1){try{await write(buf)}catch(e){err(e);return}done+=buf.length;buf=[]}
    pr.textContent=`${t("impGeo")}: ${n+1} / ${need.length} · ${t("impBusy")} ${done}`;
    await new Promise(r=>setTimeout(r,300));
  }
  pr.textContent=`${t("impDone")} ${done}.`+(failed?` ${failed} ${t("impFail")}.`:"");go.textContent=t("done");go.disabled=false;go.onclick=closeSheet;
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
