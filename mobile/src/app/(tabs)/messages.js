import { useMemo } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../lib/store';
import { t } from '../../lib/i18n';
import { C } from '../../lib/theme';
import { addr, nameOf, rel } from '../../lib/util';
import StatusDot from '../../components/StatusDot';
import Icon from '../../components/Icon';

// Messages: SMS conversations with customers (sent by sellers, answered by customers or the AI)
export default function Messages() {
  const ins = useSafeAreaInsets();
  const { leads, S, user, isChef } = useApp();
  const convos = useMemo(() => leads.filter((l) => (l.sms || []).length && (isChef || l.owner === user.uid))
    .map((l) => ({ l, last: l.sms[l.sms.length - 1] })).sort((a, b) => b.last.t - a.last.t), [leads, user, isChef]);
  return (
    <View style={{ flex: 1, backgroundColor: C.surface, paddingTop: ins.top }}>
      <Text style={st.title}>{t('tMessages')}</Text>
      <FlatList data={convos} keyExtractor={(x) => x.l.id}
        ListEmptyComponent={<View style={st.empty}><Icon name="sms" size={34} color={C.muted} /><Text style={st.emptyT}>{t('noConvos')}</Text></View>}
        renderItem={({ item: { l, last } }) => (
          <Pressable onPress={() => router.push(`/lead/${l.id}`)} style={({ pressed }) => [st.row, pressed && { backgroundColor: C.soft }]}>
            <StatusDot st={S.st(l.status)} size={36} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[st.name, l.smsUnread && { color: C.red }]} numberOfLines={1}>{nameOf(l) || addr(l)}</Text>
                <Text style={st.time}>{rel(last.t)}</Text>
              </View>
              <Text style={st.msg} numberOfLines={2}>{last.dir === 'in' ? '' : `${t('you')}: `}{last.text}</Text>
            </View>
          </Pressable>
        )} />
    </View>
  );
}
const st = StyleSheet.create({
  title: { fontSize: 17, fontWeight: '800', color: C.ink, textAlign: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: C.line },
  row: { flexDirection: 'row', gap: 12, padding: 14, borderBottomWidth: 1, borderColor: C.soft },
  name: { fontSize: 15.5, fontWeight: '800', color: C.ink, flex: 1 }, time: { fontSize: 12, color: C.muted },
  msg: { fontSize: 14, color: C.muted, marginTop: 2 },
  empty: { alignItems: 'center', gap: 10, marginTop: 120 }, emptyT: { color: C.muted, fontSize: 15 },
});
