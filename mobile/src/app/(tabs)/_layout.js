import { Tabs } from 'expo-router';
import Icon from '../../components/Icon';
import { useApp } from '../../lib/store';
import { t } from '../../lib/i18n';
import { C } from '../../lib/theme';
import { useRevisitReminders } from '../../lib/notify';

// Same four tabs as SalesRabbit: Home, Messages, SalesHub, Tools
export default function TabLayout() {
  const { leads, user, S, isChef, users } = useApp();
  useRevisitReminders(leads, user?.uid, S);
  const unread = leads.filter((l) => l.smsUnread && (isChef || l.owner === user?.uid)).length;
  const pend = isChef ? users.filter((u) => !u.active && !u.off).length : 0;
  const ic = (name) => ({ color }) => <Icon name={name} size={24} color={color} />;
  return (
    <Tabs initialRouteName="saleshub" screenOptions={{ headerShown: false, tabBarActiveTintColor: C.red, tabBarInactiveTintColor: C.muted, tabBarLabelStyle: { fontWeight: '700', fontSize: 11 } }}>
      <Tabs.Screen name="index" options={{ title: t('tHome'), tabBarIcon: ic('cal') }} />
      <Tabs.Screen name="messages" options={{ title: t('tMessages'), tabBarIcon: ic('sms'), tabBarBadge: unread || undefined }} />
      <Tabs.Screen name="saleshub" options={{ title: 'SalesHub', tabBarIcon: ic('map') }} />
      <Tabs.Screen name="tools" options={{ title: t('tTools'), tabBarIcon: ic('more'), tabBarBadge: pend || undefined }} />
    </Tabs>
  );
}
