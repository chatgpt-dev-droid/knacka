import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../lib/store';
import { t } from '../../lib/i18n';
import { C } from '../../lib/theme';
import CalendarPane from '../../screens/CalendarPane';

// Home: greeting + "My appointments", like SalesRabbit
export default function Home() {
  const ins = useSafeAreaInsets();
  const { me } = useApp();
  const h = new Date().getHours();
  const hello = h < 10 ? t('goodMorning') : h < 17 ? t('goodDay') : t('goodEvening');
  const header = (
    <View style={[st.hero]}>
      <Text style={st.wave}>👋</Text>
      <Text style={st.hello}>{hello}, {me?.name || ''}</Text>
      <Text style={st.quote}>{t('quote')}</Text>
      <Text style={st.mine}>{t('myAppointments')}</Text>
    </View>
  );
  return <View style={{ flex: 1, paddingTop: ins.top, backgroundColor: C.bg }}><CalendarPane embedded header={header} /></View>;
}
const st = StyleSheet.create({
  hero: { alignItems: 'center', paddingHorizontal: 24, paddingVertical: 14, gap: 6 },
  wave: { fontSize: 30 },
  hello: { fontSize: 21, fontWeight: '800', color: C.ink, textAlign: 'center' },
  quote: { fontSize: 13.5, color: C.muted, textAlign: 'center', lineHeight: 19 },
  mine: { alignSelf: 'flex-start', fontSize: 15, fontWeight: '800', color: C.red, marginTop: 10 },
});
