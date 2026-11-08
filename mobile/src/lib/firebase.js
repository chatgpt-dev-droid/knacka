import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Same Firebase project as the web app (app.fiskaren.nu). These values are public; data is protected by firestore.rules.
const config = {
  apiKey: 'AIzaSyDcvPU5OHwyEySo0B4Cr_cLixnQt63KjFY',
  authDomain: 'knacka-fiskaren.firebaseapp.com',
  projectId: 'knacka-fiskaren',
  storageBucket: 'knacka-fiskaren.firebasestorage.app',
  messagingSenderId: '874026355291',
  appId: '1:874026355291:web:865cde53c920baa32b0d7e',
};

const first = getApps().length === 0;
export const app = first ? initializeApp(config) : getApp();
export const auth = first ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) }) : getAuth(app);
export const db = first ? initializeFirestore(app, { experimentalAutoDetectLongPolling: true }) : getFirestore(app);
export const functions = getFunctions(app, 'europe-north1');

/** Resolves once Firebase has restored the signed-in user (needed in background tasks). */
export function authReady() {
  return new Promise((resolve) => {
    if (auth.currentUser) return resolve(auth.currentUser);
    const off = auth.onAuthStateChanged((u) => { off(); resolve(u); });
  });
}
