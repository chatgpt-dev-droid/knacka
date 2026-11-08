import { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import * as SMS from 'expo-sms';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../lib/store';
import { t, loc } from '../../lib/i18n';
import { C, R } from '../../lib/theme';
import { addr, nameOf, dstr, todayStr, ftime, fdate, DAY } from '../../lib/util';
import { openRoute, orderStops } from '../../lib/links';
import StatusDot from '../../components/StatusDot';
import { Btn, H3, Sub } from '../../components/ui';

export default function Calendar() {
  const ins = useSafeAreaInsets();
  const { leads, S, user, here, me, settings, updLead, showToast } = useApp();
  const today = todayStr();
  const [day, setDay] = useState(today);
  const [busy, setBusy] = useState(false);
  const days = useMemo(() => Array.from({ length: 21 }, (_, i) => dstr(new Date(Date.now() + (i - 3) * DAY))), []);
  const mineL = useMemo(() => leads.filter((l) => l.owner === user.uid), [leads, user]);

  const overdue = mineL.filter((l) => l.revisit && l.revisit < today && !S.isClosed(l.status));
  const items = mineL.filter((l) => (l.revisit === day && !S.isClosed(l.status)) || (l.meeting && dstr(new Date(l.meeting)) === day))
    .sort((a, b) => (a.meeting || 9e15) - (b.meeting || 9e15));
  const count = (d) => mineL.filter((l) => (l.revisit === d && !S.isClosed(l.status)) || (l.meeting && dstr(new Date(l.meeting)) === d)).length;

  // today's "Inte hemma" with a phone number
  const nh = mineL.filter((l) => S.isNotHome(l.status) && l.phone && (l.hist || []).some((h) => h.s === l.status && dstr(new Date(h.t)) === today));
  const smsKey = S.byFlag('smssent');
  const fill = (l) => (settings.tmplNH || t('tmplNHDefault')).replace(/\{namn\}/g, l.first || '').replace(/\{adress\}/g, addr(l)).replace(/\{säljare\}/g, me?.name || '').replace(/\{telefon\}/g, me?.phone || '').replace(/\s+!/g, '!').replace(/Hej\s*!/, 'Hej!');

  const sendNH = async () => {
    const ok = nh.filter((l) => l.smsOk);
    if (!ok.length) return Alert.alert(t('nhTitle'), t('nhNoConsent'));
    if (!(await SMS.isAvailableAsync())) return Alert.alert(t('nhTitle'), t('err_gen'));
    setBusy(true);
    let sent = 0;
    for (const l of ok) {
      // each customer gets an own message with their name; the phone's SMS app opens for every one
      const r = await SMS.sendSMSAsync([l.phone], fill(l)).catch(() => ({ result: 'cancelled' }));
      if (r.result === 'cancelled') break;
      sent++;
      const patch = { smsSent: Date.now(), sms: [...(l.sms || []), { t: Date.now(), dir: 'out', by: user.uid, text: fill(l) }] };
      if (smsKey) patch.status = smsKey;
      updLead(l.id, patch);
    }
    setBusy(false);
    if (sent) showToast(`${sent} SMS ✓`);
  };

  const route = () => {
    const stops = items.concat(day === today ? overdue : []).filter((l) => typeof l.lat === 'number');
    if (!stops.length) return showToast(t('noStops'));
    openRoute(orderStops(stops, here), here);
  };

  return (
    <ScrollView style={st.wrap} contentContainerStyle={{ paddingTop: ins.top + 8, paddingBottom: 30, gap: 14 }}>
      <Text style={st.h1}>{t('calTitle')}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingHorizontal: 16 }} contentOffset={{ x: 3 * 60, y: 0 }}>
        {days.map((d) => {
          const dt = new Date(d + 'T12:00:00'); const on = d === day; const n = count(d);
          return (
            <Pressable key={d} onPress={() => setDay(d)} style={[st.day, on && st.dayOn]} accessibilityRole="button" accessibilityState={{ selected: on }}>
              <Text style={[st.dW, on && { color: '#fff' }]}>{dt.toLocaleDateString(loc(), { weekday: 'short' })}</Text>
              <Text style={[st.dN, on && { color: '#fff' }, d === today && !on && { color: C.accent }]}>{dt.getDate()}</Text>
              <View style={[st.dot, { opacity: n ? 1 : 0 }, on && { backgroundColor: '#fff' }]} />
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={{ paddingHorizontal: 16, gap: 10 }}>
        <Btn icon="route" title={`${t('planRoute')} (${items.length + (day === today ? overdue.length : 0)} ${t('routeStops')})`} onPress={route} />

        {day === today ? (
          <View style={st.card}>
            <H3>{t('nhTitle')}</H3>
            <Sub>{t('nhSub')}</Sub>
            {nh.length ? nh.map((l) => (
              <View key={l.id} style={st.nhRow}>
                <Text style={{ flex: 1, fontSize: 15, color: C.ink, fontWeight: '600' }} numberOfLines={1}>{nameOf(l) || addr(l)}  <Text style={{ color: C.muted, fontWeight: '400' }}>{addr(l)}</Text></Text>
                {!l.smsOk ? <Text style={st.noC}>{t('nhNoConsent')}</Text> : null}
              </View>
            )) : <Sub>{t('nhNone')}</Sub>}
            {nh.some((l) => l.smsOk) ? <Btn icon="sms" title={`${t('sms')} → ${nh.filter((l) => l.smsOk).length}`} onPress={sendNH} disabled={busy} /> : null}
          </View>
        ) : null}

        {day === today && overdue.length ? <Text style={st.sec}>{t('overdue')} ({overdue.length})</Text> : null}
        {day === today ? overdue.map((l) => <Item key={l.id} l={l} S={S} sub={fdate(l.revisit)} />) : null}

        <Text style={st.sec}>{fdate(day)}</Text>
        {items.length ? items.map((l) => <Item key={l.id} l={l} S={S} sub={l.meeting && dstr(new Date(l.meeting)) === day ? `${t('meeting')} ${ftime(l.meeting)}` : t('revisit')} />) : <Sub>{t('nothingDay')}</Sub>}
      </View>
    </ScrollView>
  );
}

const Item = ({ l, S, sub }) => (
  <Pressable onPress={() => router.push(`/lead/${l.id}`)} style={({ pressed }) => [st.item, pressed && { backgroundColor: C.soft }]}>
    <StatusDot st={S.st(l.status)} size={34} />
    <View style={{ flex: 1, minWidth: 0 }}>
      <Text style={st.iT} numberOfLines={1}>{addr(l)}{l.apt ? `, ${l.apt}` : ''}</Text>
      <Text style={st.iS} numberOfLines={1}>{[sub, nameOf(l)].filter(Boolean).join('  ·  ')}</Text>
    </View>
  </Pressable>
);

const st = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: C.bg },
  h1: { fontSize: 28, fontWeight: '900', color: C.ink, paddingHorizontal: 16, letterSpacing: -0.4 },
  day: { width: 54, alignItems: 'center', paddingVertical: 8, borderRadius: R.md, backgroundColor: C.surface, gap: 2 },
  dayOn: { backgroundColor: C.accent },
  dW: { fontSize: 12, fontWeight: '700', color: C.muted, textTransform: 'capitalize' }, dN: { fontSize: 19, fontWeight: '900', color: C.ink },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.accent },
  card: { backgroundColor: C.surface, borderRadius: R.lg, padding: 14, gap: 10 },
  nhRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  noC: { fontSize: 12, fontWeight: '700', color: '#9a6100', backgroundColor: '#fdf0dc', paddingHorizontal: 8, paddingVertical: 3, borderRadius: R.pill, overflow: 'hidden' },
  sec: { fontSize: 15, fontWeight: '800', color: C.ink, marginTop: 6, textTransform: 'capitalize' },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.surface, borderRadius: R.md, padding: 12 },
  iT: { fontSize: 16, fontWeight: '800', color: C.ink }, iS: { fontSize: 13, color: C.muted, marginTop: 2 },
});
