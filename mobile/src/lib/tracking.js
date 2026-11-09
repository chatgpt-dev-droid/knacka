// Background route tracking during the workday ("Starta dagen" / "Avsluta dagen").
// The task must be defined in module scope, so this file is imported from the root layout.
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, auth, authReady } from './firebase';
import { dstr } from './util';

export const TRACK_TASK = 'knacka-route-tracking';
const MIN_GAP_M = 15;
let last = null;

function meters(a, b) { const dy = (a.lat - b.lat) * 111320, dx = (a.lng - b.lng) * 111320 * Math.cos((a.lat * Math.PI) / 180); return Math.sqrt(dx * dx + dy * dy); }

async function save(raw) {
  const u = auth.currentUser || (await authReady());
  if (!u) return;
  const pts = [];
  for (const p of raw) {
    if (p.acc && p.acc > 80) continue; // skip poor fixes
    const q = { lat: +p.lat.toFixed(6), lng: +p.lng.toFixed(6), t: p.t || Date.now() };
    if (last && meters(last, q) < MIN_GAP_M) continue;
    pts.push(q); last = q;
  }
  if (!pts.length) return;
  const latest = pts[pts.length - 1];
  const name = (await AsyncStorage.getItem('knacka-myname')) || '';
  await Promise.all([
    setDoc(doc(db, 'live', u.uid), { lat: latest.lat, lng: latest.lng, t: latest.t, on: true, name }, { merge: true }),
    setDoc(doc(db, 'tracks', `${u.uid}_${dstr(new Date(latest.t))}`), { uid: u.uid, day: dstr(new Date(latest.t)), points: arrayUnion(...pts), updated: Date.now() }, { merge: true }),
  ]);
}

TaskManager.defineTask(TRACK_TASK, async ({ data, error }) => {
  if (error || !data || !data.locations || !data.locations.length) return;
  try { await save(data.locations.map((l) => ({ lat: l.coords.latitude, lng: l.coords.longitude, acc: l.coords.accuracy, t: l.timestamp }))); } catch (e) { console.warn('tracking', e); }
});

// Foreground fallback (Expo Go, or when "Always" location is not granted): the route is saved while the app is open.
const FG_KEY = 'knacka-day-fg';
let fgOn = false;
AsyncStorage.getItem(FG_KEY).then((v) => { fgOn = v === '1'; }).catch(() => {});
export function recordFix(h) { if (fgOn) save([{ lat: h.lat, lng: h.lng, acc: h.acc, t: h.t }]).catch(() => {}); }

export async function isDayRunning() {
  try { if (await Location.hasStartedLocationUpdatesAsync(TRACK_TASK)) return true; } catch (e) { /* not available */ }
  return fgOn || (await AsyncStorage.getItem(FG_KEY).catch(() => null)) === '1';
}

/** Returns 'ok' (background) | 'fg' (only while the app is open) | 'denied' */
export async function startDay(myName) {
  let fg;
  try { fg = await Location.requestForegroundPermissionsAsync(); } catch (e) { return 'denied'; }
  if (fg.status !== 'granted') return 'denied';
  await AsyncStorage.setItem('knacka-myname', myName || '').catch(() => {});
  last = null;
  try {
    const bg = await Location.requestBackgroundPermissionsAsync();
    if (bg.status === 'granted') {
      await Location.startLocationUpdatesAsync(TRACK_TASK, {
        accuracy: Location.Accuracy.High, distanceInterval: 20, timeInterval: 30000, deferredUpdatesInterval: 60000,
        showsBackgroundLocationIndicator: true, pausesUpdatesAutomatically: false, activityType: Location.ActivityType.Fitness,
        foregroundService: { notificationTitle: 'Knacka – arbetsdagen pågår', notificationBody: 'Din rutt sparas tills du trycker Avsluta dagen.', notificationColor: '#0b6e7f' },
      });
      return 'ok';
    }
  } catch (e) { /* background location is not available in this build */ }
  fgOn = true;
  await AsyncStorage.setItem(FG_KEY, '1').catch(() => {});
  return 'fg';
}

export async function endDay() {
  try { if (await Location.hasStartedLocationUpdatesAsync(TRACK_TASK)) await Location.stopLocationUpdatesAsync(TRACK_TASK); } catch (e) { /* not running */ }
  fgOn = false;
  await AsyncStorage.removeItem(FG_KEY).catch(() => {});
  const u = auth.currentUser;
  if (u) await setDoc(doc(db, 'live', u.uid), { on: false, t: Date.now() }, { merge: true }).catch(() => {});
}

export const openAppSettings = () => Linking.openSettings();
