import { Tabs } from 'expo-router';
import Icon from '../../components/Icon';
import { useApp } from '../../lib/store';
import { t } from '../../lib/i18n';
import { C } from '../../lib/theme';
import { useRevisitReminders } from '../../lib/notify';

export default function TabLayout() {
  const { leads, user, S, todayStr, isChef, users } = useApp();
  const due = leads.filter((l) => l.owner === user?.uid && l.revisit && l.revisit <= todayStr() && !S.isClosed(l.status)).length;
  const pend = isChef ? users.filter((u) => !u.active && !u.off).length : 0;
  useRevisitReminders(leads, user?.uid, S);
  const ic = (name) => ({ color }) => <Icon name={name} size={24} color={color} />;
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: C.accent, tabBarInactiveTintColor: C.muted, tabBarLabelStyle: { fontWeight: '700', fontSize: 11 } }}>
      <Tabs.Screen name="index" options={{ title: t('tMap'), tabBarIcon: ic('map') }} />
      <Tabs.Screen name="leads" options={{ title: t('tLeads'), tabBarIcon: ic('list') }} />
      <Tabs.Screen name="calendar" options={{ title: t('tCal'), tabBarIcon: ic('cal'), tabBarBadge: due || undefined }} />
      <Tabs.Screen name="compete" options={{ title: t('tComp'), tabBarIcon: ic('trophy') }} />
      <Tabs.Screen name="more" options={{ title: t('tMore'), tabBarIcon: ic('more'), tabBarBadge: pend || undefined }} />
    </Tabs>
  );
}
