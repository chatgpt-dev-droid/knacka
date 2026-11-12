import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { BUILD } from '../lib/build';
import { useApp } from '../lib/store';
import { t } from '../lib/i18n';
import { C, R } from '../lib/theme';
import { initials } from '../lib/util';
import { endDay } from '../lib/tracking';
import { Btn, Chip, Field, H3, Sub } from '../components/ui';

export default function More({ embedded, header }) {
  const ins = useSafeAreaInsets();
  const { me, user, users, isChef, saveUser, logout, lang, changeLang, showToast } = useApp();
  const [phone, setPhone] = useState(me?.phone || '');
  const pending = users.filter((u) => !u.active && !u.off);
  const others = users.filter((u) => u.id !== user.uid && (u.active || u.off));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ paddingTop: embedded ? 8 : ins.top + 8, padding: 16, gap: 14, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
      {header || (embedded ? null : <Text style={st.h1}>{t('moreTitle')}</Text>)}
      <View style={[st.card, { flexDirection: 'row', alignItems: 'center', gap: 12 }]}>
        <View style={st.av}><Text style={st.avT}>{initials(me?.name)}</Text></View>
        <View style={{ flex: 1 }}><H3>{me?.name}</H3><Sub>{me?.email}  ·  {t('role_' + (me?.role || 'saljare'))}</Sub></View>
      </View>

      <View style={st.card}>
        <Field label={t('myPhone')} value={phone} onChangeText={setPhone} keyboardType="phone-pad" onEndEditing={() => { if ((me?.phone || '') !== phone.trim()) saveUser(user.uid, { phone: phone.trim() }); }} />
        <H3>{t('lang')}</H3>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Chip title="Svenska" on={lang === 'sv'} onPress={() => changeLang('sv')} />
          <Chip title="English" on={lang === 'en'} onPress={() => changeLang('en')} />
        </View>
      </View>

      {isChef ? (
        <View style={st.card}>
          <H3>{t('team')}</H3>
          {pending.map((u) => (
            <View key={u.id} style={st.uRow}>
              <View style={{ flex: 1 }}><Text style={st.uN}>{u.name}</Text><Sub>{u.email}  ·  {t('pending')}</Sub></View>
              <Btn small title={t('approve')} onPress={() => saveUser(u.id, { active: true, off: false })} />
            </View>
          ))}
          {others.map((u) => (
            <View key={u.id} style={st.uRow}>
              <View style={{ flex: 1 }}><Text style={st.uN}>{u.name}</Text><Sub>{u.email}  ·  {u.active ? t('role_' + u.role) : t('inactive')}</Sub></View>
              {u.role !== 'chef' ? <Btn small kind="ghost" title={u.active ? t('deactivate') : t('activate')} onPress={() => saveUser(u.id, u.active ? { active: false, off: true } : { active: true, off: false })} /> : null}
            </View>
          ))}
          <Sub>{t('statusesHelp')}</Sub>
        </View>
      ) : null}

      <Btn kind="ghost" title={t('logout')} onPress={async () => { await endDay(); logout(); }} />
      <Text style={{ textAlign: 'center', color: C.muted, fontSize: 12 }}>KnockKnock {Constants.expoConfig?.version || ''} · {BUILD}</Text>
    </ScrollView>
  );
}

const st = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '900', color: C.ink, letterSpacing: -0.4 },
  card: { backgroundColor: C.surface, borderRadius: R.lg, padding: 14, gap: 10 },
  av: { width: 48, height: 48, borderRadius: 24, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' },
  avT: { color: '#fff', fontWeight: '900', fontSize: 17 },
  uRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 4 },
  uN: { fontSize: 15.5, fontWeight: '800', color: C.ink },
});
