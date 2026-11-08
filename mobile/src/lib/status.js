// Same status model as the web app (settings/main.statuses). flag: sale | lead | revisit | nothome | smssent | closed | none
export const DEFAULT_STATUSES = [
  { k: 'abo', label: 'ABO', color: '#1d7a2a', icon: 'crown', flag: 'sale' },
  { k: 'sk', label: 'sk', color: '#e0399a', icon: 'star', flag: 'lead' },
  { k: 'sald', label: 'Såld', color: '#6cc95a', icon: 'bag', flag: 'sale' },
  { k: 'k', label: 'K', color: '#11a8a6', icon: 'check', flag: 'none' },
  { k: 'p', label: 'P', color: '#3fc4bc', icon: 'home', flag: 'none' },
  { k: 'kt', label: 'KT', color: '#6cc95a', icon: 'refresh', flag: 'revisit' },
  { k: 'lead', label: 'Lead', color: '#11a8a6', icon: 'alert', flag: 'lead' },
  { k: 'kih', label: 'KIH', color: '#e9a800', icon: 'lock', flag: 'closed' },
  { k: 'nh', label: 'Inte hemma', color: '#8d9aa6', icon: 'door', flag: 'nothome' },
  { k: 'smss', label: 'SMS skickat', color: '#4f7cff', icon: 'sms', flag: 'smssent' },
];
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
    isSale: (k) => !!k && f(k) === 'sale', isLead: (k) => !!k && f(k) === 'lead', isRevisit: (k) => !!k && f(k) === 'revisit',
    isNotHome: (k) => !!k && f(k) === 'nothome', isClosed: (k) => !!k && (f(k) === 'closed' || f(k) === 'sale'),
    byFlag: (flag) => (L.find((s) => s.flag === flag) || {}).k,
  };
};
