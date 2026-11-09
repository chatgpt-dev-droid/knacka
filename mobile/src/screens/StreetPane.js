import { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '../lib/store';
import { t } from '../lib/i18n';
import { C } from '../lib/theme';
import { applyFilter } from '../lib/filter';
import { lastVisit, fdt, meters } from '../lib/util';
import StatusDot from '../components/StatusDot';
import Icon from '../components/Icon';
import NoteSheet from '../components/NoteSheet';

// SalesRabbit's "Street" tab: the nearest street, house numbers split in even and odd
export default function StreetPane({ filter }) {
  const { leads, S, here, user, addNote, showToast } = useApp();
  const [street, setStreet] = useState(null);
  const [noteFor, setNoteFor] = useState(null);
  const [pick, setPick] = useState(false);
  const [hi, setHi] = useState(null);
  const shown = useMemo(() => applyFilter(leads, filter, user.uid).filter((l) => l.street), [leads, filter, user]);
  const nearest = useMemo(() => {
    if (!here) return shown[0]?.street || null;
    let best = null, bd = 1e12;
    for (const l of shown) { if (typeof l.lat !== 'number') continue; const d = meters([here.lat, here.lng], [l.lat, l.lng]); if (d < bd) { bd = d; best = l; } }
    return best?.street || null;
  }, [shown, here]);
  const cur = street || nearest;
  const streets = useMemo(() => {
    if (!here) return [];
    const m = new Map();
    for (const l of shown) { if (typeof l.lat !== 'number') continue; const d = meters([here.lat, here.lng], [l.lat, l.lng]); if (!m.has(l.street) || m.get(l.street) > d) m.set(l.street, d); }
    return [...m.entries()].sort((a, b) => a[1] - b[1]).slice(0, 12).map((x) => x[0]);
  }, [shown, here]);
  const onStreet = shown.filter((l) => l.street === cur);
  const n = (l) => parseInt(l.num, 10);
  const even = onStreet.filter((l) => n(l) % 2 === 0).sort((a, b) => n(a) - n(b));
  const odd = onStreet.filter((l) => !(n(l) % 2 === 0)).sort((a, b) => (n(a) || 0) - (n(b) || 0));

  const Row = ({ l }) => {
    const s = S.st(l.status); const last = (l.notes || [])[l.notes?.length - 1];
    return (
      <Pressable onPress={() => setHi(l.id)} style={[st.row, hi === l.id && { borderWidth: 1.5, borderColor: C.red }]}>
        <StatusDot st={s} size={30} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={st.num}>{l.num || '–'}{l.apt ? ` ${l.apt}` : ''}</Text>
          <Text style={st.sub}>{l.status && l.status !== 'ny' ? s.label : t('st_ny')}</Text>
          {last ? <Text style={st.note} numberOfLines={2}>{last.text}</Text> : null}
          {lastVisit(l) ? <Text style={st.date}>{fdt(lastVisit(l))}</Text> : null}
        </View>
        <Pressable hitSlop={8} onPress={() => setNoteFor(l)}><Icon name="note" size={20} color={C.red} /></Pressable>
        <Pressable hitSlop={8} onPress={() => router.push(`/lead/${l.id}`)}><Icon name="pencil" size={20} color={C.red} /></Pressable>
      </Pressable>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <View style={st.bar}>
        <Pressable hitSlop={8} onPress={() => setPick((v) => !v)}><Text style={st.street}>{cur || t('noStreet')}</Text></Pressable>
        <Pressable hitSlop={8} onPress={() => showToast(`${cur || ''}: ${onStreet.length} ${t('leadsW')}`)}><Text style={st.info}>{t('streetInfo')}</Text></Pressable>
      </View>
      {pick ? (
        <View style={st.pickBox}>
          {streets.map((x) => <Pressable key={x} onPress={() => { setStreet(x); setPick(false); }} style={st.pickRow}><Text style={[st.pickT, x === cur && { color: C.red, fontWeight: '800' }]}>{x}</Text></Pressable>)}
        </View>
      ) : null}
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Text style={st.sec}>{t('even')}</Text>
        {even.map((l) => <Row key={l.id} l={l} />)}
        <Text style={st.sec}>{t('odd')}</Text>
        {odd.map((l) => <Row key={l.id} l={l} />)}
      </ScrollView>
      <NoteSheet visible={!!noteFor} onClose={() => setNoteFor(null)} onAdd={(txt) => { addNote(noteFor, txt); setNoteFor(null); }} />
    </View>
  );
}
const st = StyleSheet.create({
  info: { fontSize: 16, color: C.red },
  pickBox: { backgroundColor: C.surface, borderBottomWidth: 1, borderColor: C.line }, pickRow: { paddingHorizontal: 16, paddingVertical: 10 }, pickT: { fontSize: 15, color: C.ink },
  bar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: C.surface, borderBottomWidth: 1, borderColor: C.line },
  street: { fontSize: 16, color: C.red }, count: { fontSize: 13, color: C.muted, fontWeight: '700' },
  sec: { fontSize: 14, color: C.muted, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: C.surface, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderColor: C.soft },
  num: { fontSize: 15, fontWeight: '800', color: C.ink }, sub: { fontSize: 14, color: '#9a9a9a', marginTop: 6 },
  note: { fontSize: 13.5, color: C.ink, marginTop: 4 }, date: { fontSize: 12, color: C.muted, marginTop: 2 },
});
