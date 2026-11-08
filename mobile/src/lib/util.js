import { t, loc } from './i18n';
export const DAY = 864e5;
export const dstr = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
export const todayStr = () => dstr(new Date());
export const addr = (l) => (l.street ? `${l.street} ${l.num || ''}`.trim() : t('noAddr'));
export const nameOf = (l) => `${l.first || ''} ${l.last || ''}`.trim();
export const lastVisit = (l) => (l.hist && l.hist.length ? l.hist[l.hist.length - 1].t : 0);
export function rel(ts) { if (!ts) return t('never'); const m = Math.round((Date.now() - ts) / 6e4); if (m < 60) return `${Math.max(m, 0)} ${t('min')} ${t('ago')}`; const h = Math.round(m / 60); if (h < 24) return `${h} ${t('h')} ${t('ago')}`; return `${Math.round(h / 24)} ${t('d')} ${t('ago')}`; }
export const fdate = (s) => (s ? new Date(s + 'T12:00:00').toLocaleDateString(loc(), { weekday: 'short', day: 'numeric', month: 'short' }) : '');
export const ftime = (ts) => new Date(ts).toLocaleTimeString(loc(), { hour: '2-digit', minute: '2-digit' });
export const fdt = (ts) => new Date(ts).toLocaleDateString(loc(), { day: 'numeric', month: 'short' }) + ' ' + ftime(ts);
export function meters(a, b) { const dy = (a[0] - b[0]) * 111320, dx = (a[1] - b[1]) * 111320 * Math.cos((a[0] * Math.PI) / 180); return Math.sqrt(dx * dx + dy * dy); }
export const fdist = (m) => (m < 1000 ? `${Math.round(m / 10) * 10} m` : `${(m / 1000).toFixed(1).replace('.', ',')} km`);
export const initials = (n) => String(n || '?').split(/\s+/).map((x) => x[0] || '').join('').slice(0, 2).toUpperCase();
export function inPoly(y, x, p) { let ins = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) { const yi = p[i][0], xi = p[i][1], yj = p[j][0], xj = p[j][1]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) ins = !ins; } return ins; }
export const telUrl = (p) => 'tel:' + String(p || '').replace(/[^\d+]/g, '');
export const smsUrl = (p, body) => 'sms:' + String(p || '').replace(/[^\d+]/g, '') + (body ? '?&body=' + encodeURIComponent(body) : '');
