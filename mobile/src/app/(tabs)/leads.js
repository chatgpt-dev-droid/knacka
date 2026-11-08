import { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable, TextInput, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../lib/store';
import { t } from '../../lib/i18n';
import { C, R } from '../../lib/theme';
import { addr, nameOf, rel, lastVisit, meters, fdist, todayStr, fdate } from '../../lib/util';
import StatusDot from '../../components/StatusDot';
import Icon from '../../components/Icon';
import { Chip } from '../../components/ui';

export default function Leads() {
  const ins = useSafeAreaInsets();
  const { leads, S, user, here, rep } = useApp();
  const [q, setQ] = useState('');
  const [f, setF] = useState('mine');
  const [sort, setSort] = useState(here ? 'near' : 'recent');
  const today = todayStr();
  const filters = [['mine', t('mine')], ['all', t('all')], ['due', t('dueL')], ['lead', t('interested')], ['meet', t('meetings')], ['sale', t('customers')]];

  const list = useMemo(() => {
    let ls = leads;
    if (f === 'mine') ls = ls.filter((l) => l.owner === user.uid);
    if (f === 'due') ls = ls.filter((l) => l.revisit && l.revisit <= today && !S.isClosed(l.status));
    if (f === 'lead') ls = ls.filter((l) => S.isLead(l.status));
    if (f === 'meet') ls = ls.filter((l) => l.meeting && l.meeting > Date.now() - 864e5);
    if (f === 'sale') ls = ls.filter((l) => S.isSale(l.status));
    const s = q.trim().toLowerCase();
    if (s) ls = ls.filter((l) => `${addr(l)} ${l.apt || ''} ${nameOf(l)} ${l.phone || ''} ${l.city || ''} ${l.zip || ''}`.toLowerCase().includes(s));
    const withD = ls.map((l) => ({ l, d: here && typeof l.lat === 'number' ? meters([here.lat, here.lng], [l.lat, l.lng]) : null }));
    if (sort === 'near' && here) withD.sort((a, b) => (a.d ?? 1e12) - (b.d ?? 1e12));
    else withD.sort((a, b) => Math.max(lastVisit(b.l), b.l.updated || 0) - Math.max(lastVisit(a.l), a.l.updated || 0));
    return withD.slice(0, 500);
  }, [leads, f, q, sort, here, user, S, today]);

  return (
    <View style={[st.wrap, { paddingTop: ins.top + 8 }]}>
      <Text style={st.h1}>{t('leadsTitle')}</Text>
      <View style={st.search}>
        <Icon name="search" size={20} color={C.muted} />
        <TextInput value={q} onChangeText={setQ} placeholder={t('searchPh')} placeholderTextColor={C.muted} style={st.searchIn} clearButtonMode="while-editing" />
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}>
          {filters.map(([k, l]) => <Chip key={k} title={l} on={f === k} onPress={() => setF(k)} />)}
        </ScrollView>
      </View>
      <View style={st.bar}>
        <Text style={st.count}>{list.length} {t('leadsW')}</Text>
        <View style={{ flexDirection: 'row', gap: 14 }}>
          {[['near', t('sortNear')], ['recent', t('sortRecent')]].map(([k, l]) => <Text key={k} onPress={() => setSort(k)} style={[st.sort, sort === k && { color: C.accent }]}>{l}</Text>)}
        </View>
      </View>
      <FlatList data={list} keyExtractor={(x) => x.l.id} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24, gap: 8 }}
        initialNumToRender={20} windowSize={9} removeClippedSubviews
        ListEmptyComponent={<Text style={st.empty}>{t('noLeads')}</Text>}
        renderItem={({ item: { l, d } }) => {
          const s = S.st(l.status);
          const extra = l.meeting && l.meeting > Date.now() ? `${t('meeting')} ${new Date(l.meeting).toLocaleDateString()}` : l.revisit ? `${t('revisit')} ${fdate(l.revisit)}` : rel(lastVisit(l));
          return (
            <Pressable onPress={() => router.push(`/lead/${l.id}`)} style={({ pressed }) => [st.row, pressed && { backgroundColor: C.soft }]}>
              <StatusDot st={s} size={36} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={st.addr} numberOfLines={1}>{addr(l)}{l.apt ? `, ${l.apt}` : ''}</Text>
                <Text style={st.meta} numberOfLines={1}>{[nameOf(l), l.status && l.status !== 'ny' ? s.label : t('st_ny'), extra, f === 'all' ? rep(l.owner).name : null].filter(Boolean).join('  ·  ')}</Text>
              </View>
              {d != null ? <Text style={st.d}>{fdist(d)}</Text> : null}
              {l.smsUnread ? <View style={st.unread} /> : null}
            </Pressable>
          );
        }} />
    </View>
  );
}

const st = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: C.bg, gap: 10 },
  h1: { fontSize: 28, fontWeight: '900', color: C.ink, paddingHorizontal: 16, letterSpacing: -0.4 },
  search: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.surface, borderRadius: R.md, paddingHorizontal: 12, height: 46, marginHorizontal: 16, borderWidth: 1, borderColor: C.line },
  searchIn: { flex: 1, fontSize: 16, color: C.ink, height: 46 },
  bar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 },
  count: { fontSize: 13.5, fontWeight: '700', color: C.muted }, sort: { fontSize: 13.5, fontWeight: '800', color: C.muted },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.surface, borderRadius: R.md, padding: 12 },
  addr: { fontSize: 16, fontWeight: '800', color: C.ink }, meta: { fontSize: 13, color: C.muted, marginTop: 2 },
  d: { fontSize: 13, fontWeight: '700', color: C.muted, fontVariant: ['tabular-nums'] },
  unread: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.sms },
  empty: { textAlign: 'center', color: C.muted, fontSize: 15, marginTop: 40, paddingHorizontal: 20, lineHeight: 21 },
});
