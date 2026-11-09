import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { t } from '../../lib/i18n';
import { C } from '../../lib/theme';
import CompetePane from '../../screens/CompetePane';
import SettingsPane from '../../screens/SettingsPane';

export default function Tools() {
  const ins = useSafeAreaInsets();
  const [tab, setTab] = useState('comp');
  return (
    <View style={{ flex: 1, backgroundColor: C.bg, paddingTop: ins.top }}>
      <Text style={st.title}>{t('tTools')}</Text>
      <View style={st.tabs}>
        {[['comp', t('tComp')], ['set', t('settings')]].map(([k, l]) => (
          <Pressable key={k} onPress={() => setTab(k)} style={[st.tab, tab === k && st.tabOn]}><Text style={[st.tabT, tab === k && { color: C.red }]}>{l}</Text></Pressable>
        ))}
      </View>
      {tab === 'comp' ? <CompetePane embedded /> : <SettingsPane embedded />}
    </View>
  );
}
const st = StyleSheet.create({
  title: { fontSize: 17, fontWeight: '800', color: C.ink, textAlign: 'center', paddingVertical: 10, backgroundColor: C.surface },
  tabs: { flexDirection: 'row', backgroundColor: C.surface, borderBottomWidth: 1, borderColor: C.line },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, borderBottomWidth: 2.5, borderColor: 'transparent' },
  tabOn: { borderColor: C.red }, tabT: { fontSize: 14.5, fontWeight: '700', color: C.muted },
});
