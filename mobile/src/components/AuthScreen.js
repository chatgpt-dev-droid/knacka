import { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useApp } from '../lib/store';
import { t } from '../lib/i18n';
import { C, R } from '../lib/theme';
import { Btn, Field, Chip } from './ui';

function errMsg(e) {
  const c = (e && e.code) || '';
  if (/wrong-password|user-not-found|invalid-credential|invalid-login/.test(c)) return t('err_wrong');
  if (/email-already-in-use/.test(c)) return t('err_inuse');
  if (/weak-password/.test(c)) return t('err_weak');
  if (/invalid-email/.test(c)) return t('err_email');
  if (/network/.test(c)) return t('err_net');
  return t('err_gen');
}

export default function AuthScreen() {
  const { phase, user, logout, pendingName, lang, changeLang } = useApp();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [pw, setPw] = useState('');
  const [msg, setMsg] = useState(null); const [busy, setBusy] = useState(false);

  const Logo = (
    <View style={{ alignItems: 'center' }}><Image source={require('../../assets/logo.png')} style={{ width: 150, height: 150, borderRadius: 34 }} accessibilityLabel="Knock Knock Knock" /></View>
  );

  if (phase === 'pending' || phase === 'verify') {
    const verify = phase === 'verify';
    return (
      <SafeAreaView style={st.wrap}><View style={st.card}>{Logo}
        <Text style={st.h}>{verify ? t('verifyTitle') : t('pendingTitle')}</Text>
        <Text style={st.p}>{verify ? t('verifyText').replace('{e}', user?.email || '') : t('pendingText')}</Text>
        {msg ? <Text style={st.err}>{msg}</Text> : null}
        <View style={{ gap: 10, marginTop: 16 }}>
          {verify ? <Btn title={t('cont')} onPress={async () => { await user.reload(); if (auth.currentUser.emailVerified) { await auth.currentUser.getIdToken(true); await logout(); setMsg(null); } else setMsg(t('notVerified')); }} /> : null}
          {verify ? <Btn kind="ghost" title={t('resend')} onPress={() => sendEmailVerification(user).catch(() => {})} /> : null}
          <Btn kind="ghost" title={t('logout')} onPress={logout} />
        </View>
      </View></SafeAreaView>
    );
  }

  const submit = async () => {
    setMsg(null);
    if (mode === 'reg' && !name.trim()) return setMsg(t('err_name'));
    setBusy(true);
    try {
      if (mode === 'reg') {
        pendingName.current = name.trim();
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), pw);
        if (['hej@fiskaren.nu', 'karen@fiskaren.nu'].includes(email.trim().toLowerCase())) await sendEmailVerification(cred.user).catch(() => {});
      } else await signInWithEmailAndPassword(auth, email.trim(), pw);
    } catch (e) { setMsg(errMsg(e)); }
    setBusy(false);
  };

  return (
    <SafeAreaView style={st.wrap}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={st.card} keyboardShouldPersistTaps="handled">
          {Logo}
          <View style={st.seg}>
            {[['login', t('login')], ['reg', t('register')]].map(([k, l]) => (
              <Text key={k} onPress={() => setMode(k)} style={[st.segB, mode === k && st.segOn]} accessibilityRole="button">{l}</Text>
            ))}
          </View>
          <View style={{ gap: 12 }}>
            {mode === 'reg' ? <Field label={t('yourName')} value={name} onChangeText={setName} autoCapitalize="words" /> : null}
            <Field label={t('email')} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <Field label={t('password')} value={pw} onChangeText={setPw} autoCapitalize="none" placeholder={mode === 'reg' ? t('pwHint') : ''} secure />
            {msg ? <Text style={st.err}>{msg}</Text> : null}
            <Btn title={mode === 'reg' ? t('register') : t('login')} onPress={submit} disabled={busy} />
            {mode === 'login' ? <Text style={st.link} onPress={async () => { if (!email.trim()) return setMsg(t('needEmail')); try { await sendPasswordResetEmail(auth, email.trim()); setMsg(t('resetSent')); } catch (e) { setMsg(errMsg(e)); } }}>{t('forgot')}</Text> : null}
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 20, justifyContent: 'center' }}>
            <Chip title="Svenska" on={lang === 'sv'} onPress={() => changeLang('sv')} />
            <Chip title="English" on={lang === 'en'} onPress={() => changeLang('en')} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: C.bg },
  card: { padding: 20, paddingTop: 40, gap: 16, maxWidth: 440, width: '100%', alignSelf: 'center' },
  logo: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  logoK: { width: 54, height: 54, borderRadius: 16, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' },
  logoKT: { color: '#fff', fontSize: 30, fontWeight: '900' },
  logoT: { fontSize: 30, fontWeight: '900', color: C.ink, letterSpacing: -0.5 },
  logoS: { fontSize: 13, fontWeight: '700', color: C.muted },
  seg: { flexDirection: 'row', backgroundColor: C.soft, borderRadius: 12, padding: 3 },
  segB: { flex: 1, textAlign: 'center', paddingVertical: 11, fontWeight: '700', color: C.muted, borderRadius: 9, overflow: 'hidden' },
  segOn: { backgroundColor: C.surface, color: C.ink },
  h: { fontSize: 22, fontWeight: '800', color: C.ink, marginTop: 10 },
  p: { fontSize: 16, color: C.muted, lineHeight: 22 },
  err: { backgroundColor: '#fbe9e7', borderRadius: R.sm, padding: 12, color: C.ink, fontWeight: '600' },
  link: { color: C.accent, fontWeight: '700', textAlign: 'center', paddingVertical: 8 },
});
