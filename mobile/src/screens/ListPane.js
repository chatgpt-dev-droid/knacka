import { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '../lib/store';
import { t } from '../lib/i18n';
import { C, shadow } from '../lib/theme';
import { applyFilter } from '../lib/filter';
import { addr, nameOf, meters, fdist, lastVisit } from '../lib/util';
import StatusDot from '../components/StatusDot';
import Icon from '../components/Icon';

const SEARCH = [['all', 'sAll'], ['name', 'sName'], ['first', 'sFirst'], ['last', 'sLast'], ['biz', 'sBiz'], ['street', 'sStreet'], ['city', 'sCity'], ['notes', 'sNotes']];
const SORT = [['updated', 'oUpdated'], ['name', 'oName'], ['street', 'oStreet'], ['dist', 'oDist'], ['appt', 'oAppt']];
const hay = (l, by) => ({
  all: `${addr(l)} ${l.apt || ''} ${nameOf(l)} ${l.company || ''} ${l.phone || ''} ${l.email || ''} ${l.city || ''} ${l.zip || ''}`,
  name: nameOf(l), first: l.first || '', last: l.last || '', biz: l.company || '', street: addr(l), city: l.city || '', notes: (l.notes || []).map((n) => n.text).join(' '),
}[by] || '').toLowerCase();

// "List" tab: red search bar with Search By, Sort By and a map shortcut on every row
export default function ListPane({ filter, onMap }) {
  const { leads, S, user, here } = useApp();
  const [q, setQ] = useState('');
  const [by, setBy] = useState('all');
  const [sort, setSort] = useState('dist');
  const [asc, setAsc] = useState(true);
  const [open, setOpen] = useState(null); // 'search' | 'sort'

  const list = useMemo(() => {
    let ls = applyFilter(leads, filter, user.uid);
    const s = q.trim().toLowerCase();
    if (s) ls = ls.filter((l) => hay(l, by).includes(s));
    const rows = ls.map((l) => ({ l, d: here && typeof l.lat === 'number' ? meters([here.lat, here.lng], [l.lat, l.lng]) : null }));
    const key = { updated: (x) => -(Math.max(lastVisit(x.l), x.l.updated || 0)), name: (x) => nameOf(x.l).toLowerCase() || '￿', street: (x) => addr(x.l).toLowerCase(), dist: (x) => x.d ?? 1e12, appt: (x) => x.l.meeting || 9e15 }[sort];
    rows.sort((a, b) => { const ka = key(a), kb = key(b); return (ka < kb ? -1 : ka > kb ? 1 : 0) * (asc ? 1 : -1); });
    return rows.slice(0, 400);
  }, [leads, filter, q, by, sort, asc, here, user]);

  return (
    <View style={{ flex: 1, backgroundColor: C.surface }}>
      <View style={st.bar}>
        <View style={st.search}>
          <Icon name="search" size={20} color={C.red} />
          <TextInput value={q} onChangeText={setQ} style={st.in} autoCorrect={false} onFocus={() => setOpen(null)} />
          <Pressable onPress={() => setOpen(open === 'search' ? null : 'search')} hitSlop={6}><Text style={st.scope}>▾ {t(SEARCH.find((x) => x[0] === by)[1])}</Text></Pressable>
        </View>
        <Pressable hitSlop={8} onPress={() => setOpen(open === 'sort' ? null : 'sort')} accessibilityLabel={t('sortBy')}><Icon name="sort" size={28} color="#fff" width={2.6} /></Pressable>
      </View>
      <FlatList data={list} keyExtractor={(x) => x.l.id} initialNumToRender={20} windowSize={9} removeClippedSubviews keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<Text style={st.empty}>{t('noLeads')}</Text>}
        renderItem={({ item: { l, d } }) => (
          <Pressable onPress={() => router.push(`/lead/${l.id}`)} style={({ pressed }) => [st.row, pressed && { backgroundColor: C.soft }]}>
            <View style={{ justifyContent: 'center' }}><StatusDot st={S.st(l.status)} size={32} /></View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={st.name}>{nameOf(l) || l.company || '-'}</Text>
              <Text style={st.addr}>{addr(l)}{l.apt ? ` ${l.apt}` : ''}</Text>
              {l.city || l.zip ? <Text style={st.addr}>{[l.city, [l.region, l.zip].filter(Boolean).join(' ')].filter(Boolean).join(', ')}</Text> : null}
            </View>
            <View style={{ alignItems: 'flex-end', gap: 4 }}>
              <Text style={st.d}>{d != null ? fdist(d) : ''}</Text>
              <Pressable hitSlop={10} onPress={() => onMap(l)} accessibilityLabel={t('tMap')}><Icon name="map" size={22} color={C.red} /></Pressable>
            </View>
          </Pressable>
        )} />
      {open ? (
        <View style={[st.drop, shadow]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={st.dropH}>{open === 'search' ? t('searchBy') : t('sortBy')}</Text>
            {open === 'sort' ? <Pressable hitSlop={8} onPress={() => setAsc((v) => !v)}><Text style={st.ascT}>▾ {asc ? t('asc') : t('desc')}</Text></Pressable> : null}
          </View>
          {(open === 'search' ? SEARCH : SORT).map(([k, label]) => {
            const on = (open === 'search' ? by : sort) === k;
            return (
              <Pressable key={k} onPress={() => { (open === 'search' ? setBy : setSort)(k); setOpen(null); }} style={st.opt}>
                <View style={{ width: 26 }}>{on ? <Icon name="check" size={18} color={C.red} /> : null}</View><Text style={st.optT}>{t(label)}</Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

const st = StyleSheet.create({
  bar: { backgroundColor: C.red, padding: 8, flexDirection: 'row', alignItems: 'center', gap: 10 },
  search: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fff', borderRadius: 4, paddingHorizontal: 10, height: 40 },
  in: { flex: 1, fontSize: 15, color: C.ink, height: 40 },
  scope: { fontSize: 14, color: C.red },
  row: { flexDirection: 'row', gap: 14, paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderColor: '#ececec' },
  name: { fontSize: 14, fontWeight: '800', color: C.ink }, addr: { fontSize: 13.5, color: C.ink, marginTop: 3 },
  d: { fontSize: 11, color: C.muted, fontVariant: ['tabular-nums'], minHeight: 14 },
  empty: { textAlign: 'center', color: C.muted, fontSize: 15, marginTop: 40, paddingHorizontal: 20 },
  drop: { position: 'absolute', top: 56, left: 0, right: 0, backgroundColor: C.surface, padding: 16, paddingBottom: 20 },
  dropH: { fontSize: 18, fontWeight: '800', color: C.ink, marginBottom: 6 }, ascT: { fontSize: 16, color: C.red },
  opt: { flexDirection: 'row', alignItems: 'center', paddingLeft: 90, paddingVertical: 7 }, optT: { fontSize: 16.500, color: C.ink },
});
