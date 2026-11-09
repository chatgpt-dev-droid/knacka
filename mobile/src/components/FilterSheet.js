import { Modal, View, Text, Pressable, Switch, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../lib/store';
import { t } from '../lib/i18n';
import { C } from '../lib/theme';
import { DEFAULT_FILTER } from '../lib/filter';
import Icon from './Icon';
import StatusDot from './StatusDot';

export default function FilterSheet({ visible, value, onChange, onClose }) {
  const ins = useSafeAreaInsets();
  const { S, isChef } = useApp();
  const set = (k, v) => onChange({ ...value, [k]: v });
  const sts = value.statuses || [];
  const toggleSt = (k) => set('statuses', sts.includes(k) ? sts.filter((x) => x !== k) : [...sts, k]);
  const Row = ({ k, label }) => (
    <View style={st.row}><Text style={st.rowT}>{label}</Text><Switch value={!!value[k]} onValueChange={(v) => set(k, v)} trackColor={{ true: C.red }} /></View>
  );
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={[st.head, { paddingTop: 14 }]}>
        <Pressable hitSlop={12} onPress={onClose}><Icon name="x" size={22} color={C.ink} /></Pressable>
        <Text style={st.title}>{t('filter')}</Text>
        <Pressable hitSlop={12} onPress={() => onChange(DEFAULT_FILTER)}><Text style={st.reset}>{t('reset')}</Text></Pressable>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: ins.bottom + 90 }}>
        <Row k="my" label={t('myLeads')} />
        <Row k="others" label={t('othersLeads')} />
        <Row k="areas" label={t('areasL')} />
        {isChef ? <Row k="team" label={t('userLocations')} /> : null}
        <Text style={st.sec}>{t('statusH')}</Text>
        {S.list.map((s) => (
          <Pressable key={s.k} onPress={() => toggleSt(s.k)} style={st.row}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><StatusDot st={s} size={26} /><Text style={st.rowT}>{s.label}</Text></View>
            {sts.includes(s.k) ? <Icon name="check" size={20} color={C.red} /> : null}
          </Pressable>
        ))}
      </ScrollView>
      <View style={[st.foot, { paddingBottom: ins.bottom + 12 }]}>
        <Pressable onPress={onClose} style={st.apply}><Text style={st.applyT}>{t('apply')}</Text></Pressable>
      </View>
    </Modal>
  );
}

const st = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderColor: C.line },
  title: { fontSize: 17, fontWeight: '800', color: C.ink },
  reset: { fontSize: 15, fontWeight: '700', color: C.red },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, minHeight: 54, borderBottomWidth: 1, borderColor: C.soft },
  rowT: { fontSize: 16, color: C.ink },
  sec: { fontSize: 13, fontWeight: '800', color: C.muted, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 6, textTransform: 'uppercase' },
  foot: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 12, backgroundColor: C.surface, borderTopWidth: 1, borderColor: C.line },
  apply: { height: 50, borderRadius: 25, backgroundColor: C.red, alignItems: 'center', justifyContent: 'center' },
  applyT: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
