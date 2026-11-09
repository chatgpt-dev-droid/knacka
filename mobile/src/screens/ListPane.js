import { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '../lib/store';
import { t } from '../lib/i18n';
import { C } from '../lib/theme';
import { applyFilter } from '../lib/filter';
import { addr, nameOf, meters, fdist, lastVisit } from '../lib/util';
import StatusDot from '../components/StatusDot';
import Icon from '../components/Icon';

// SalesRabbit's "List" tab: red search bar, nearest first, map shortcut on every row
export default function ListPane({ filter, onMap }) {
  const { leads, S, user, here } = useApp();
  const [q, setQ] = useState('');
  const [inNotes, setInNotes] = useState(false);

  const list = useMemo(() => {
    let ls = applyFilter(leads, filter, user.uid);
    const s = q.trim().toLowerCase();
    if (s) ls = ls.filter((l) => `${addr(l)} ${l.apt || ''} ${nameOf(l)} ${l.company || ''} ${l.phone || ''} ${l.email || ''} ${l.city || ''} ${l.zip || ''} ${inNotes ? (l.notes || []).map((n) => n.text).join(' ') : ''}`.toLowerCase().includes(s));
    const withD = ls.map((l) => ({ l, d: here && typeof l.lat === 'number' ? meters([here.lat, here.lng], [l.lat, l.lng]) : null }));
    if (here) withD.sort((a, b) => (a.d ?? 1e12) - (b.d ?? 1e12));
    else withD.sort((a, b) => Math.max(lastVisit(b.l), b.l.updated || 0) - Math.max(lastVisit(a.l), a.l.updated || 0));
    return withD.slice(0, 400);
  }, [leads, filter, q, inNotes, here, user]);

  return (
    <View style={{ flex: 1, backgroundColor: C.surface }}>
      <View style={st.bar}>
        <View style={st.search}>
          <Icon name="search" size={18} color={C.muted} />
          <TextInput value={q} onChangeText={setQ} placeholder={t('searchPh')} placeholderTextColor={C.muted} style={st.in} clearButtonMode="while-editing" />
          <Pressable onPress={() => setInNotes((v) => !v)} hitSlop={6}><Text style={st.scope}>{inNotes ? t('allInclNotes') : t('allExNotes')} ▾</Text></Pressable>
        </View>
      </View>
      <FlatList data={list} keyExtractor={(x) => x.l.id} initialNumToRender={20} windowSize={9} removeClippedSubviews
        ListEmptyComponent={<Text style={st.empty}>{t('noLeads')}</Text>}
        renderItem={({ item: { l, d } }) => (
          <Pressable onPress={() => router.push(`/lead/${l.id}`)} style={({ pressed }) => [st.row, pressed && { backgroundColor: C.soft }]}>
            <StatusDot st={S.st(l.status)} size={32} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={st.name} numberOfLines={2}>{nameOf(l) || l.company || '-'}</Text>
              <Text style={st.addr} numberOfLines={2}>{[addr(l) + (l.apt ? ` ${l.apt}` : ''), [l.city, l.zip].filter(Boolean).join(' ')].filter(Boolean).join('\n')}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', gap: 6 }}>
              {d != null ? <Text style={st.d}>{fdist(d)}</Text> : null}
              <Pressable hitSlop={10} onPress={() => onMap(l)} accessibilityLabel={t('tMap')}><Icon name="map" size={20} color={C.red} /></Pressable>
            </View>
          </Pressable>
        )} />
    </View>
  );
}

const st = StyleSheet.create({
  bar: { backgroundColor: C.red, padding: 8 },
  search: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, height: 38 },
  in: { flex: 1, fontSize: 15, color: C.ink, height: 38 },
  scope: { fontSize: 12.5, color: C.red, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingHorizontal: 14, paddingVertical: 11, borderBottomWidth: 1, borderColor: C.soft },
  name: { fontSize: 14.5, fontWeight: '800', color: C.ink }, addr: { fontSize: 13, color: C.ink, marginTop: 2, lineHeight: 18 },
  d: { fontSize: 11.5, color: C.muted, fontVariant: ['tabular-nums'] },
  empty: { textAlign: 'center', color: C.muted, fontSize: 15, marginTop: 40, paddingHorizontal: 20, lineHeight: 21 },
});
