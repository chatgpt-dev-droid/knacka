// Local reminder at 08:00 on days with revisits/meetings. Rescheduled whenever leads change.
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { t } from './i18n';
import { dstr } from './util';

Notifications.setNotificationHandler({ handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: false, shouldSetBadge: false }) });

export function useRevisitReminders(leads, uid, S) {
  const asked = useRef(false);
  useEffect(() => {
    if (!uid) return;
    const id = setTimeout(async () => {
      try {
        if (!asked.current) { asked.current = true; const p = await Notifications.getPermissionsAsync(); if (!p.granted) await Notifications.requestPermissionsAsync(); }
        if (Platform.OS === 'android') await Notifications.setNotificationChannelAsync('reminders', { name: 'Påminnelser', importance: Notifications.AndroidImportance.DEFAULT });
        await Notifications.cancelAllScheduledNotificationsAsync();
        const mine = leads.filter((l) => l.owner === uid && !S.isClosed(l.status));
        const now = Date.now();
        for (let i = 0; i < 14; i++) {
          const at = new Date(); at.setDate(at.getDate() + i); at.setHours(8, 0, 0, 0);
          if (at.getTime() <= now) continue;
          const ds = dstr(at);
          const n = mine.filter((l) => l.revisit === ds || (l.meeting && dstr(new Date(l.meeting)) === ds)).length;
          if (!n) continue;
          await Notifications.scheduleNotificationAsync({ content: { title: t('remindTitle'), body: t('remindBody').replace('{n}', n) }, trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: at, channelId: 'reminders' } });
        }
        // meetings: 30 min heads-up
        for (const l of mine) if (l.meeting && l.meeting - 30 * 60000 > now && l.meeting - now < 14 * 864e5) {
          await Notifications.scheduleNotificationAsync({ content: { title: t('meeting') + ' ' + new Date(l.meeting).toTimeString().slice(0, 5), body: `${l.street || ''} ${l.num || ''} ${l.first || ''}`.trim() }, trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: new Date(l.meeting - 30 * 60000), channelId: 'reminders' } });
        }
      } catch (e) { /* notifications are best effort */ }
    }, 2500);
    return () => clearTimeout(id);
  }, [leads, uid, S]);
}
