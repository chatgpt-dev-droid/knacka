import { useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../lib/store';
import { t } from '../lib/i18n';
import { C, R } from '../lib/theme';
import { initials } from '../lib/util';
import { Chip } from '../components/ui';

function since(p) {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  if (p === 'week') { const wd = (d.getDay() + 6) % 7; d.setDate(d.getDate() - wd); }
  if (p === 'month') d.setDate(1);
  return d.getTime();
}

export default function Compete({ embedded, header }) {
  const ins = useSafeAreaInsets();
  const { leads, team, S, user } = useApp();
  const [p, setP] = useState('day');
  const [m, setM] = useState('k');

  const rows = useMemo(() => {
    const from = since(p);
    const by = {}; team.forEach((u) => { by[u.id] = { u, k: 0, l: 0, s: 0 }; });
    for (const lead of leads) for (const h of lead.hist || []) {
      if (!h.s || h.t < from || !by[h.rep]) continue;
      by[h.rep].k++; if (S.isLead(h.s)) by[h.rep].l++; if (S.isSale(h.s)) by[h.rep].s++;
    }
    return Object.values(by).sort((a, b) => b[m] - a[m] || b.k - a.k);
  }, [leads, team, S, p, m]);
  const max = Math.max(1, ...rows.map((r) => r[m]));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ paddingTop: embedded ? 8 : ins.top + 8, padding: 16, gap: 12 }}>
      {header || (embedded ? null : <Text style={st.h1}>{t('compTitle')}</Text>)}
      <View style={st.seg}>
        {[['day', t('day')], ['week', t('week')], ['month', t('month')]].map(([k, l]) => <Text key={k} onPress={() => setP(k)} style={[st.segB, p === k && st.segOn]}>{l}</Text>)}
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {[['k', t('mKnocks')], ['l', t('mLeads')], ['s', t('mSales')]].map(([k, l]) => <Chip key={k} title={l} on={m === k} onPress={() => setM(k)} />)}
      </View>
      {rows.map((r, i) => (
        <View key={r.u.id} style={[st.row, r.u.id === user.uid && { borderColor: C.accent }]}>
          <Text style={[st.rank, i < 3 && { color: ['#c99400', '#8d9aa6', '#b06a2c'][i] }]}>{i + 1}</Text>
          <View style={st.av}><Text style={st.avT}>{initials(r.u.name)}</Text></View>
          <View style={{ flex: 1, gap: 6 }}>
            <Text style={st.name} numberOfLines={1}>{r.u.name}{r.u.id === user.uid ? ` (${t('you')})` : ''}</Text>
            <View style={st.track}><View style={[st.fill, { width: `${(r[m] / max) * 100}%` }]} /></View>
            <Text style={st.sub}>{r.k} {t('knocks')}  ·  {r.l} {t('leadsW')}  ·  {r.s} {t('sales')}</Text>
          </View>
          <Text style={st.big}>{r[m]}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const st = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '900', color: C.ink, letterSpacing: -0.4 },
  seg: { flexDirection: 'row', backgroundColor: C.soft, borderRadius: 12, padding: 3 },
  segB: { flex: 1, textAlign: 'center', paddingVertical: 10, fontWeight: '800', color: C.muted, borderRadius: 9, overflow: 'hidden' },
  segOn: { backgroundColor: C.surface, color: C.ink },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.surface, borderRadius: R.md, padding: 12, borderWidth: 1.5, borderColor: 'transparent' },
  rank: { width: 22, fontSize: 18, fontWeight: '900', color: C.muted, textAlign: 'center' },
  av: { width: 38, height: 38, borderRadius: 19, backgroundColor: C.soft, alignItems: 'center', justifyContent: 'center' },
  avT: { fontWeight: '900', color: C.ink },
  name: { fontSize: 16, fontWeight: '800', color: C.ink },
  track: { height: 6, borderRadius: 3, backgroundColor: C.soft, overflow: 'hidden' }, fill: { height: 6, backgroundColor: C.accent, borderRadius: 3 },
  sub: { fontSize: 12.5, color: C.muted },
  big: { fontSize: 24, fontWeight: '900', color: C.ink, fontVariant: ['tabular-nums'], minWidth: 34, textAlign: 'right' },
});
