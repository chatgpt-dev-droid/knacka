import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, StyleSheet } from 'react-native';
import * as SMS from 'expo-sms';
import { useApp } from '../lib/store';
import { t } from '../lib/i18n';
import { C, R } from '../lib/theme';
import { addr, nameOf, dstr, todayStr } from '../lib/util';
import { openRoute, orderStops } from '../lib/links';
import { isDayRunning, startDay, endDay, openAppSettings } from '../lib/tracking';
import { Btn, H3, Sub } from '../components/ui';
import Icon from '../components/Icon';

// Knacka's own extras that SalesRabbit does not have: workday GPS, route for today's appointments, group SMS to today's "not home"
export default function DayPane() {
  const { leads, S, user, here, me, settings, updLead, showToast } = useApp();
  const today = todayStr();
  const [day, setDay] = useState(false);
  const [busy, setBusy] = useState(false);
  const [picked, setPicked] = useState(null);
  useEffect(() => { isDayRunning().then(setDay); }, []);
  const mine = leads.filter((l) => l.owner === user.uid);
  const appts = mine.filter((l) => l.meeting && dstr(new Date(l.meeting)) === today && typeof l.lat === 'number');
  const nh = mine.filter((l) => S.isNotHome(l.status) && l.phone && (l.hist || []).some((h) => h.s === l.status && dstr(new Date(h.t)) === today));
  const sel = picked || nh.filter((l) => l.smsOk).map((l) => l.id);
  const smsKey = S.byFlag('smssent');
  const fill = (l) => (settings.tmplNH || t('tmplNHDefault')).replace(/\{namn\}/g, l.first || '').replace(/\{adress\}/g, addr(l)).replace(/\{säljare\}/g, me?.name || '').replace(/\{telefon\}/g, me?.phone || '').replace(/Hej\s+!/, 'Hej!');
  const send = async () => {
    const go = nh.filter((l) => sel.includes(l.id));
    if (!go.length) return;
    if (!(await SMS.isAvailableAsync())) return Alert.alert('SMS', t('err_gen'));
    setBusy(true); let sent = 0;
    for (const l of go) {
      const r = await SMS.sendSMSAsync([l.phone], fill(l)).catch(() => ({ result: 'cancelled' }));
      if (r.result === 'cancelled') break;
      sent++;
      const patch = { smsOk: true, smsSent: Date.now(), sms: [...(l.sms || []), { t: Date.now(), dir: 'out', by: user.uid, text: fill(l) }] };
      if (smsKey) patch.status = smsKey;
      updLead(l.id, patch);
    }
    setBusy(false); if (sent) showToast(`${sent} SMS ✓`);
  };
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
      <View style={st.card}>
        <H3>{t('trackInfoTitle')}</H3><Sub>{t('trackInfo')}</Sub>
        <Btn icon={day ? 'stop' : 'play'} kind={day ? 'ghost' : 'primary'} title={day ? t('endDay') : t('startDay')} onPress={async () => {
          if (day) { await endDay(); setDay(false); return; }
          const r = await startDay(me?.name); if (r === 'ok') { setDay(true); showToast(t('dayOn')); } else Alert.alert(t('needBgTitle'), t('needBg'), [{ text: t('cancel'), style: 'cancel' }, { text: t('openSettings'), onPress: openAppSettings }]);
        }} />
      </View>
      <View style={st.card}>
        <H3>{t('planRoute')}</H3>
        <Btn icon="route" kind="ghost" title={`${t('planRoute')} (${appts.length} ${t('routeStops')})`} onPress={() => (appts.length ? openRoute(orderStops(appts, here), here) : showToast(t('noStops')))} />
      </View>
      <View style={st.card}>
        <H3>{t('nhTitle')}</H3><Sub>{t('nhSub')}</Sub>
        {nh.length ? nh.map((l) => {
          const on = sel.includes(l.id);
          return (
            <Pressable key={l.id} onPress={() => setPicked(on ? sel.filter((x) => x !== l.id) : [...sel, l.id])} style={st.row}>
              <View style={[st.check, on && { backgroundColor: C.red, borderColor: C.red }]}>{on ? <Icon name="check" size={14} color="#fff" width={3} /> : null}</View>
              <Text style={{ flex: 1, fontSize: 15, color: C.ink }} numberOfLines={1}><Text style={{ fontWeight: '700' }}>{nameOf(l) || '-'}</Text>  {addr(l)}</Text>
            </Pressable>
          );
        }) : <Sub>{t('nhNone')}</Sub>}
        {nh.length ? <Btn icon="sms" title={`SMS → ${sel.length}`} disabled={busy || !sel.length} onPress={send} /> : null}
      </View>
    </ScrollView>
  );
}
const st = StyleSheet.create({
  card: { backgroundColor: C.surface, borderRadius: R.lg, padding: 14, gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 40 },
  check: { width: 22, height: 22, borderRadius: 5, borderWidth: 2, borderColor: C.line, alignItems: 'center', justifyContent: 'center' },
});
