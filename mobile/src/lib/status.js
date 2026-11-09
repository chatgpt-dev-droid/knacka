// Same status model as the web app (settings/main.statuses). flag: sale | lead | revisit | nothome | smssent | closed | none
export const DEFAULT_STATUSES = [
 { k: "abo", short: "ABO", label: "Abonemag", color: "#237804", icon: "crown", flag: "sale" },
 { k: "sk", short: "sk", label: "Stjärnkund", color: "#eb2f96", icon: "star", flag: "sale" },
 { k: "sald", short: "Såld", label: "Såld", color: "#95de64", icon: "bag", flag: "sale" },
 { k: "k", short: "K", label: "Kund", color: "#13c2c2", icon: "check", flag: "sale" },
 { k: "p", short: "P", label: "Pensioner", color: "#5cdbd3", icon: "home", flag: "none" },
 { k: "kt", short: "KT", label: "Kom tillbaka", color: "#95de64", icon: "refresh", flag: "revisit" },
 { k: "lead", short: "Lead", label: "Lead", color: "#13c2c2", icon: "alert", flag: "lead" },
 { k: "kih", short: "KIH", label: "Kunden är inte hemma", color: "#ffcb00", icon: "lock", flag: "nothome" },
 { k: "smss", short: "SMS", label: "SMS", color: "#722ed1", icon: "send", flag: "smssent" },
 { k: "nh", short: "IH", label: "Inte hemma", color: "#fa8c16", icon: "question", flag: "nothome" },
 { k: "avsl", short: "AA", label: "Avslutat abonemaget", color: "#a8071a", icon: "refresh", flag: "closed" },
 { k: "nej", short: "II", label: "Inte intresserad", color: "#f5222d", icon: "x", flag: "closed" },
 { k: "other", short: "O", label: "Other", color: "#722ed1", icon: "minus", flag: "none" },
 { k: "bro", short: "B", label: "Broschyr", color: "#ffcb00", icon: "book", flag: "none" },
 { k: "brok", short: "BK", label: "Broschyr Kund", color: "#5cdbd3", icon: "book", flag: "sale" }];
export const LEGACY = [
  { k: 'borta', label: 'Inte hemma', color: '#8d9aa6', icon: 'minus', flag: 'nothome' }, { k: 'nej', label: 'Nej tack', color: '#d64541', icon: 'x', flag: 'closed' },
  { k: 'igen', label: 'Kom tillbaka', color: '#e39b14', icon: 'refresh', flag: 'revisit' }, { k: 'int', label: 'Intresserad', color: '#7b5bd6', icon: 'star', flag: 'lead' },
  { k: 'mote', label: 'Möte bokat', color: '#2d7ff9', icon: 'clock', flag: 'lead' }, { k: 'kund', label: 'Kund', color: '#1f9d55', icon: 'check', flag: 'sale' },
  { k: 'aldrig', label: 'Knacka ej', color: '#2b2f33', icon: 'lock', flag: 'closed' },
];
export const NY = { k: 'ny', label: '', color: '#ffffff', icon: '', flag: 'none' };
export const makeStatus = (list) => {
  const L = list && list.length ? list : DEFAULT_STATUSES;
  const st = (k) => (!k || k === 'ny' ? NY : L.find((s) => s.k === k) || LEGACY.find((s) => s.k === k) || { k, label: k, color: '#8d9aa6', icon: 'minus', flag: 'none' });
  const f = (k) => st(k).flag;
  return {
    list: L, st,
    short: (k) => { const x = st(k); return x.short || x.label; },
    isSale: (k) => !!k && f(k) === 'sale', isLead: (k) => !!k && f(k) === 'lead', isRevisit: (k) => !!k && f(k) === 'revisit',
    isNotHome: (k) => !!k && f(k) === 'nothome', isClosed: (k) => !!k && (f(k) === 'closed' || f(k) === 'sale'),
    byFlag: (flag) => (L.find((s) => s.flag === flag) || {}).k,
  };
};
