import { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../lib/store';
import { t, loc } from '../../lib/i18n';
import { C } from '../../lib/theme';
import { addr, nameOf, dstr, todayStr, ftime, initials } from '../../lib/util';
import StatusDot from '../../components/StatusDot';
import Icon from '../../components/Icon';
import { BUILD } from '../../lib/build';

const DAY = 864e5;
const sod = (d) => { const x = new Date(d); x.setHours(12, 0, 0, 0); return x; };

// Home: greeting, quote and "My Appointments" with a week or month calendar
export default function Home() {
  const ins = useSafeAreaInsets();
  const { me, leads, S, user, isChef } = useApp();
  const [sel, setSel] = useState(todayStr());
  const [mode, setMode] = useState('week');
  const [all, setAll] = useState(false);
  const selD = sod(sel + 'T12:00:00');

  const appts = useMemo(() => leads.filter((l) => l.meeting && (all && isChef ? true : l.owner === user.uid)), [leads, user, all, isChef]);
  const byDay = useMemo(() => { const m = {}; for (const l of appts) { const k = dstr(new Date(l.meeting)); (m[k] = m[k] || []).push(l); } return m; }, [appts]);
  const items = (byDay[sel] || []).slice().sort((a, b) => a.meeting - b.meeting);

  const days = useMemo(() => {
    if (mode === 'week') { const s = new Date(selD.getTime() - selD.getDay() * DAY); return Array.from({ length: 7 }, (_, i) => new Date(s.getTime() + i * DAY)); }
    const first = new Date(selD.getFullYear(), selD.getMonth(), 1, 12); const start = new Date(first.getTime() - first.getDay() * DAY);
    return Array.from({ length: 42 }, (_, i) => new Date(start.getTime() + i * DAY));
  }, [sel, mode]); // eslint-disable-line
  const move = (dir) => {
    if (mode === 'week') setSel(dstr(new Date(selD.getTime() + dir * 7 * DAY)));
    else setSel(dstr(new Date(selD.getFullYear(), selD.getMonth() + dir, 1, 12)));
  };
  const h = new Date().getHours();
  const hello = h < 12 ? t('goodMorning') : h < 17 ? t('goodDay') : t('goodEvening');
  const wd = Array.from({ length: 7 }, (_, i) => new Date(2023, 0, 1 + i).toLocaleDateString(loc(), { weekday: 'short' }));

  return (
    <View style={{ flex: 1, backgroundColor: C.surface, paddingTop: ins.top }}>
      <View style={st.top}><Text style={{ fontSize: 11, color: C.muted }}>KnockKnock · {BUILD}</Text><View style={st.av}><Text style={st.avT}>{initials(me?.name)}</Text></View></View>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={st.hero}>
          <Text style={{ fontSize: 30 }}>👋</Text>
          <Text style={st.hello}>{hello}, {me?.name || ''}</Text>
          <Text style={st.quote}>{t('quote')}</Text>
        </View>
        <View style={st.bar}>
          <Pressable onPress={() => isChef && setAll((v) => !v)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={st.red}>{all && isChef ? t('team') : t('myAppointments')}</Text><Icon name="chevD" size={16} color={C.red} />
          </Pressable>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Pressable hitSlop={8} onPress={() => setSel(todayStr())}><Text style={st.red}>{t('today')}</Text></Pressable>
            <View style={st.seg}>
              <Pressable onPress={() => setMode('week')} style={[st.segB, mode === 'week' && st.segOn]}><Icon name="week" size={18} color={C.ink} /></Pressable>
              <Pressable onPress={() => setMode('month')} style={[st.segB, mode === 'month' && st.segOn]}><Icon name="month" size={18} color={C.ink} /></Pressable>
            </View>
          </View>
        </View>
        <View style={st.cal}>
          <View style={st.monthRow}>
            <Pressable hitSlop={12} onPress={() => move(-1)}><Icon name="chevL" size={20} color={C.red} /></Pressable>
            <Text style={st.month}>{selD.toLocaleDateString(loc(), { month: 'long', year: 'numeric' })}</Text>
            <Pressable hitSlop={12} onPress={() => move(1)}><Icon name="chevR" size={20} color={C.red} /></Pressable>
          </View>
          <View style={st.week}>{wd.map((w) => <Text key={w} style={st.wd}>{w}</Text>)}</View>
          <View style={st.grid}>
            {days.map((d) => {
              const k = dstr(d); const on = k === sel; const has = !!byDay[k]; const dim = mode === 'month' && d.getMonth() !== selD.getMonth();
              return (
                <Pressable key={k} onPress={() => setSel(k)} style={st.cell} accessibilityState={{ selected: on }}>
                  <View style={[st.dot, has && { backgroundColor: '#8c8c8c' }, on && { backgroundColor: C.red }]}>
                    <Text style={[st.dn, (has || on) && { color: '#fff' }, dim && !on && !has && { color: C.line }]}>{d.getDate()}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
        <Text style={st.dayH}>{selD.toLocaleDateString(loc(), { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</Text>
        {items.length ? items.map((l) => {
          const s = S.st(l.status);
          return (
            <Pressable key={l.id} onPress={() => router.push(`/lead/${l.id}`)} style={({ pressed }) => [st.item, pressed && { backgroundColor: C.soft }]}>
              <StatusDot st={s} size={26} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={st.iS}>{s.label || t('st_ny')}</Text><Text style={st.iTime}>{ftime(l.meeting)}</Text></View>
                <Text style={st.iN} numberOfLines={1}>{nameOf(l) || l.company || '-'}</Text>
                <Text style={st.iN} numberOfLines={1}>{[addr(l), l.city, l.zip].filter(Boolean).join(', ')}</Text>
              </View>
            </Pressable>
          );
        }) : <Text style={st.none}>{t('noAppts')}</Text>}
      </ScrollView>
    </View>
  );
}
const st = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingBottom: 6 },
  av: { width: 30, height: 30, borderRadius: 15, backgroundColor: C.teal, alignItems: 'center', justifyContent: 'center' }, avT: { color: '#fff', fontSize: 11, fontWeight: '800' },
  hero: { alignItems: 'center', backgroundColor: '#f0f0f0', paddingHorizontal: 22, paddingVertical: 14, gap: 8 },
  hello: { fontSize: 20, fontWeight: '800', color: C.ink, textAlign: 'center' },
  quote: { fontSize: 13.5, color: '#444', textAlign: 'center', lineHeight: 20 },
  bar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderColor: C.line },
  red: { color: C.red, fontWeight: '800', fontSize: 14 },
  seg: { flexDirection: 'row', backgroundColor: '#ececec', borderRadius: 8, padding: 2 },
  segB: { width: 44, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 6 }, segOn: { backgroundColor: '#fff' },
  cal: { backgroundColor: '#f0f0f0', paddingBottom: 12 },
  monthRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 32, paddingVertical: 14 },
  month: { color: C.red, fontWeight: '800', fontSize: 16, textTransform: 'capitalize' },
  week: { flexDirection: 'row', paddingHorizontal: 8 }, wd: { flex: 1, textAlign: 'center', color: C.red, fontWeight: '800', fontSize: 13, textTransform: 'capitalize' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8 },
  cell: { width: `${100 / 7}%`, alignItems: 'center', paddingVertical: 5 },
  dot: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' }, dn: { fontSize: 13, color: C.ink },
  dayH: { fontSize: 14, fontWeight: '800', color: C.ink, paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#f0f0f0', textTransform: 'capitalize' },
  item: { flexDirection: 'row', gap: 10, padding: 14, backgroundColor: C.surface, borderBottomWidth: 4, borderColor: '#f0f0f0' },
  iS: { fontSize: 14.5, fontWeight: '800', color: C.ink }, iTime: { fontSize: 12, fontWeight: '800', color: C.ink }, iN: { fontSize: 14, color: C.ink, marginTop: 3 },
  none: { textAlign: 'center', color: C.ink, fontSize: 14, paddingHorizontal: 60, paddingVertical: 16, lineHeight: 20 },
});
