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

TaskManager.defineTask(TRACK_TASK, async ({ data, error }) => {
  if (error || !data || !data.locations || !data.locations.length) return;
  try {
    const u = auth.currentUser || (await authReady());
    if (!u) return;
    const pts = [];
    for (const loc of data.locations) {
      if (loc.coords.accuracy && loc.coords.accuracy > 80) continue; // skip poor fixes
      const p = { lat: +loc.coords.latitude.toFixed(6), lng: +loc.coords.longitude.toFixed(6), t: loc.timestamp || Date.now() };
      if (last && meters(last, p) < MIN_GAP_M) continue;
      pts.push(p); last = p;
    }
    if (!pts.length) return;
    const latest = pts[pts.length - 1];
    const name = (await AsyncStorage.getItem('knacka-myname')) || '';
    await Promise.all([
      setDoc(doc(db, 'live', u.uid), { lat: latest.lat, lng: latest.lng, t: latest.t, on: true, name }, { merge: true }),
      setDoc(doc(db, 'tracks', `${u.uid}_${dstr(new Date(latest.t))}`), { uid: u.uid, day: dstr(new Date(latest.t)), points: arrayUnion(...pts), updated: Date.now() }, { merge: true }),
    ]);
  } catch (e) {
    console.warn('tracking', e);
  }
});

export async function isDayRunning() {
  try { return await Location.hasStartedLocationUpdatesAsync(TRACK_TASK); } catch (e) { return false; }
}

/** Returns 'ok' | 'denied' | 'needAlways' */
export async function startDay(myName) {
  const fg = await Location.requestForegroundPermissionsAsync();
  if (fg.status !== 'granted') return 'denied';
  const bg = await Location.requestBackgroundPermissionsAsync();
  if (bg.status !== 'granted') return 'needAlways';
  await AsyncStorage.setItem('knacka-myname', myName || '');
  last = null;
  await Location.startLocationUpdatesAsync(TRACK_TASK, {
    accuracy: Location.Accuracy.High,
    distanceInterval: 20,
    timeInterval: 30000,
    deferredUpdatesInterval: 60000,
    showsBackgroundLocationIndicator: true,
    pausesUpdatesAutomatically: false,
    activityType: Location.ActivityType.Fitness,
    foregroundService: {
      notificationTitle: 'Knacka – arbetsdagen pågår',
      notificationBody: 'Din rutt sparas tills du trycker Avsluta dagen.',
      notificationColor: '#0b6e7f',
    },
  });
  return 'ok';
}

export async function endDay() {
  try { if (await Location.hasStartedLocationUpdatesAsync(TRACK_TASK)) await Location.stopLocationUpdatesAsync(TRACK_TASK); } catch (e) { /* not running */ }
  const u = auth.currentUser;
  if (u) await setDoc(doc(db, 'live', u.uid), { on: false, t: Date.now() }, { merge: true }).catch(() => {});
}

export const openAppSettings = () => Linking.openSettings();
