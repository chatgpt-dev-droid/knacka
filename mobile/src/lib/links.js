import { Linking, Platform } from 'react-native';
import { telUrl } from './util';
export const call = (p) => Linking.openURL(telUrl(p)).catch(() => {});
export const mail = (e) => Linking.openURL('mailto:' + e).catch(() => {});
export function navigate(lat, lng, label) {
  const url = Platform.OS === 'ios' ? `maps://?daddr=${lat},${lng}&dirflg=d` : `google.navigation:q=${lat},${lng}`;
  Linking.openURL(url).catch(() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`));
}
/** Opens a multi-stop route in Google Maps (works on both platforms, app or web). */
export function openRoute(stops, from) {
  if (!stops.length) return;
  const p = (s) => `${s.lat},${s.lng}`;
  const dest = stops[stops.length - 1];
  const wps = stops.slice(0, -1).slice(0, 9).map(p).join('|');
  let url = `https://www.google.com/maps/dir/?api=1&travelmode=walking&destination=${p(dest)}`;
  if (from) url += `&origin=${from.lat},${from.lng}`;
  if (wps) url += `&waypoints=${encodeURIComponent(wps)}`;
  Linking.openURL(url).catch(() => {});
}
/** Nearest-neighbour ordering from a start point. */
export function orderStops(stops, start) {
  const left = stops.slice(); const out = []; let cur = start || left[0];
  const d = (a, b) => (a.lat - b.lat) ** 2 + ((a.lng - b.lng) * Math.cos((a.lat * Math.PI) / 180)) ** 2;
  while (left.length) { let bi = 0; for (let i = 1; i < left.length; i++) if (d(cur, left[i]) < d(cur, left[bi])) bi = i; cur = left.splice(bi, 1)[0]; out.push(cur); }
  return out;
}
