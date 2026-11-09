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
export default function StreetPane({ filter, onMap }) {
  const { leads, S, here, user, addNote } = useApp();
  const [street, setStreet] = useState(null);
  const [noteFor, setNoteFor] = useState(null);
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
      <Pressable onPress={() => router.push(`/lead/${l.id}`)} style={({ pressed }) => [st.row, pressed && { backgroundColor: C.soft }]}>
        <StatusDot st={s} size={30} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={st.num}>{l.num || '–'}{l.apt ? ` ${l.apt}` : ''}</Text>
          <Text style={st.sub}>{l.status && l.status !== 'ny' ? s.label : t('st_ny')}</Text>
          {last ? <Text style={st.note} numberOfLines={2}>{last.text}</Text> : null}
          {lastVisit(l) ? <Text style={st.date}>{fdt(lastVisit(l))}</Text> : null}
        </View>
        <Pressable hitSlop={8} onPress={() => setNoteFor(l)}><Icon name="note" size={20} color={C.red} /></Pressable>
        <Pressable hitSlop={8} onPress={() => onMap(l)}><Icon name="map" size={20} color={C.red} /></Pressable>
      </Pressable>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, backgroundColor: C.surface }} contentContainerStyle={{ paddingHorizontal: 12, gap: 6, paddingVertical: 8 }}>
        {streets.map((x) => (
          <Pressable key={x} onPress={() => setStreet(x)} style={[st.pill, x === cur && { backgroundColor: C.red, borderColor: C.red }]}>
            <Text style={[st.pillT, x === cur && { color: '#fff' }]}>{x}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={st.bar}><Text style={st.street}>{cur || t('noStreet')}</Text><Text style={st.count}>{onStreet.length} {t('leadsW')}</Text></View>
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
  pill: { borderWidth: 1, borderColor: C.line, borderRadius: 999, paddingHorizontal: 12, height: 32, justifyContent: 'center' },
  pillT: { fontSize: 13, fontWeight: '700', color: C.ink },
  bar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: C.surface, borderBottomWidth: 1, borderColor: C.line },
  street: { fontSize: 16, fontWeight: '800', color: C.red }, count: { fontSize: 13, color: C.muted, fontWeight: '700' },
  sec: { fontSize: 14, color: C.muted, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: C.surface, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderColor: C.soft },
  num: { fontSize: 16, fontWeight: '800', color: C.ink }, sub: { fontSize: 13, color: C.muted },
  note: { fontSize: 13.5, color: C.ink, marginTop: 4 }, date: { fontSize: 12, color: C.muted, marginTop: 2 },
});
