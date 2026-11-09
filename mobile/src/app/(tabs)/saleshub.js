import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { t } from '../../lib/i18n';
import { C } from '../../lib/theme';
import { DEFAULT_FILTER } from '../../lib/filter';
import Icon from '../../components/Icon';
import FilterSheet from '../../components/FilterSheet';
import MapPane from '../../screens/MapPane';
import ListPane from '../../screens/ListPane';
import StreetPane from '../../screens/StreetPane';

export default function SalesHub() {
  const ins = useSafeAreaInsets();
  const [tab, setTab] = useState('map');
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [showFilter, setShowFilter] = useState(false);
  const [focus, setFocus] = useState(null);
  const [placeSignal, setPlaceSignal] = useState(0);
  const n = ['my', 'others', 'areas', 'team'].filter((k) => filter[k]).length + ((filter.statuses || []).length ? 1 : 0);
  const toMap = (l) => { setFocus({ id: l.id, at: Date.now() }); setTab('map'); };
  return (
    <View style={{ flex: 1, backgroundColor: C.surface }}>
      <View style={[st.head, { paddingTop: ins.top + 4 }]}>
        <Pressable hitSlop={10} onPress={() => setShowFilter(true)} accessibilityLabel={t('filter')}>
          <Icon name="sliders" size={24} color={C.ink} />{n ? <View style={st.dot}><Text style={st.dotT}>{n}</Text></View> : null}
        </Pressable>
        <Text style={st.title}>SalesHub</Text>
        <Pressable hitSlop={10} onPress={() => { setTab('map'); setPlaceSignal(Date.now()); }} accessibilityLabel={t('placeHere')}><Icon name="plus" size={24} color={C.ink} /></Pressable>
      </View>
      <View style={st.tabs}>
        {[['map', t('tMap')], ['list', t('tList')], ['street', t('tStreet')]].map(([k, l]) => (
          <Pressable key={k} onPress={() => setTab(k)} style={[st.tab, tab === k && st.tabOn]} accessibilityRole="tab" accessibilityState={{ selected: tab === k }}>
            <Text style={[st.tabT, tab === k && { color: C.red }]}>{l}</Text>
          </Pressable>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        <View style={[StyleSheet.absoluteFill, tab !== 'map' && { opacity: 0 }]} pointerEvents={tab === 'map' ? 'auto' : 'none'}><MapPane filter={filter} focus={focus} placeSignal={placeSignal} /></View>
        {tab === 'list' ? <View style={StyleSheet.absoluteFill}><ListPane filter={filter} onMap={toMap} /></View> : null}
        {tab === 'street' ? <View style={StyleSheet.absoluteFill}><StreetPane filter={filter} onMap={toMap} /></View> : null}
      </View>
      <FilterSheet visible={showFilter} value={filter} onChange={setFilter} onClose={() => setShowFilter(false)} />
    </View>
  );
}
const st = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8 },
  title: { fontSize: 17, fontWeight: '800', color: C.ink },
  dot: { position: 'absolute', top: -6, right: -7, minWidth: 15, height: 15, borderRadius: 8, backgroundColor: C.red, alignItems: 'center', justifyContent: 'center' }, dotT: { color: '#fff', fontSize: 9.500, fontWeight: '800' },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderColor: C.line },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, borderBottomWidth: 2.5, borderColor: 'transparent' },
  tabOn: { borderColor: C.red }, tabT: { fontSize: 15, fontWeight: '700', color: C.ink },
});
