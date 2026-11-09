import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import * as SMS from 'expo-sms';
import { useApp } from '../lib/store';
import { t } from '../lib/i18n';
import { C, R, shadow } from '../lib/theme';
import { addr, nameOf, fdt, DAY } from '../lib/util';
import { call, mail, navigate } from '../lib/links';
import Icon from './Icon';
import StatusDot from './StatusDot';
import NoteSheet from './NoteSheet';

// Bottom card when a pin is tapped – same layout as SalesRabbit's mobile app
export default function Peek({ lead, onClose, picker }) {
  const { S, setStatus, addNote, updLead, rep, settings, me } = useApp();
  const [noting, setNoting] = useState(false);
  if (!lead) return null;
  const s = S.st(lead.status);
  const owner = rep(lead.owner);
  const notes = (lead.notes || []).slice(-2).reverse();
  const smsBody = (settings.tmplNH || t('tmplNHDefault')).replace('{namn}', lead.first || '').replace('{adress}', addr(lead)).replace('{säljare}', me?.name || '').replace('{telefon}', me?.phone || '');
  const full = [addr(lead), lead.city, lead.zip].filter(Boolean).join(', ');

  return (
    <View style={[st.sheet, shadow]}>
      <View style={st.grab} />
      <View style={st.head}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <StatusDot st={s} size={32} />
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={st.name} numberOfLines={1}>{nameOf(lead) || lead.company || '-'}</Text>
            <Text style={st.stTxt} numberOfLines={1}>{lead.status && lead.status !== 'ny' ? `${s.label}${s.short && s.short !== s.label ? ` (${s.short})` : ''}` : t('st_ny')}</Text>
          </View>
        </View>
        <Pressable onPress={() => router.push(`/lead/${lead.id}`)} style={st.details} accessibilityRole="button"><Text style={st.detailsT}>{t('details')}</Text></Pressable>
      </View>
      <Pressable onPress={onClose} hitSlop={6}><Text style={st.addr} numberOfLines={2}>{full}</Text></Pressable>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={st.stRow}>
        {S.list.map((x) => (
          <Pressable key={x.k} onPress={() => setStatus(lead, x.k)} style={({ pressed }) => [st.stBtn, pressed && { transform: [{ scale: 0.92 }] }]} accessibilityLabel={x.label} accessibilityState={{ selected: lead.status === x.k }}>
            <View style={[st.ring, lead.status === x.k && { borderColor: x.color }]}><StatusDot st={x} size={34} /></View>
            <Text style={st.stL} numberOfLines={1}>{x.short || x.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={st.chips}>
        <Pressable style={st.chip} onPress={() => picker.open('datetime', lead.meeting || Date.now() + DAY, t('bookMeeting'), (d) => updLead(lead.id, { meeting: d.getTime() }))}>
          <Icon name="cal" size={16} color={C.red} /><Text style={st.chipT}>{lead.meeting ? fdt(lead.meeting) : t('appointment')}</Text>
        </Pressable>
        <Pressable style={st.chip} onPress={() => picker.open('date', lead.revisit ? lead.revisit + 'T12:00:00' : Date.now() + 14 * DAY, t('setRevisit'), (d) => updLead(lead.id, { revisit: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }))}>
          <Icon name="refresh" size={16} color={C.red} /><Text style={st.chipT}>{lead.revisit || t('setRevisit')}</Text>
        </Pressable>
      </View>

      <Text style={st.sec}>{t('notesCaps')}</Text>
      <Pressable onPress={() => setNoting(true)} style={st.noteIn}><Text style={{ color: C.muted, fontSize: 14.5 }}>{t('addNotePh')}</Text></Pressable>
      {notes.map((n) => <Text key={n.t} style={st.note} numberOfLines={2}>{n.text}</Text>)}

      <View style={st.acts}>
        <Act icon="phone" disabled={!lead.phone} onPress={() => call(lead.phone)} label={t('call')} />
        <Act icon="sms" disabled={!lead.phone} onPress={() => SMS.sendSMSAsync([lead.phone], smsBody).catch(() => {})} label={t('sms')} />
        <Act icon="mail" disabled={!lead.email} onPress={() => mail(lead.email)} label={t('mailL')} />
        <Act icon="nav" onPress={() => navigate(lead.lat, lead.lng)} label={t('nav')} />
      </View>
      <Text style={st.foot}>{t('assignedTo')}: <Text style={{ fontWeight: '800', color: C.ink }}>{owner.name}</Text></Text>
      <NoteSheet visible={noting} onClose={() => setNoting(false)} onAdd={(txt) => { addNote(lead, txt); setNoting(false); }} />
    </View>
  );
}

const Act = ({ icon, onPress, disabled, label }) => (
  <Pressable onPress={onPress} disabled={disabled} hitSlop={8} accessibilityLabel={label} style={({ pressed }) => [st.act, disabled && { opacity: 0.3 }, pressed && { opacity: 0.6 }]}>
    <Icon name={icon} size={22} color={C.ink} />
  </Pressable>
);

const st = StyleSheet.create({
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: C.surface, borderTopLeftRadius: R.lg, borderTopRightRadius: R.lg, paddingTop: 8, paddingBottom: 12, gap: 8 },
  grab: { alignSelf: 'center', width: 38, height: 5, borderRadius: 3, backgroundColor: C.line },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16 },
  name: { fontSize: 16, fontWeight: '800', color: C.ink },
  stTxt: { fontSize: 13, color: C.muted, marginTop: 1 },
  details: { borderWidth: 1.5, borderColor: C.red, borderRadius: R.pill, paddingHorizontal: 14, paddingVertical: 7 },
  detailsT: { color: C.red, fontWeight: '800', fontSize: 14 },
  addr: { paddingHorizontal: 16, fontSize: 13.5, color: C.ink },
  stRow: { paddingHorizontal: 10, gap: 2 },
  stBtn: { width: 56, alignItems: 'center', gap: 3, paddingVertical: 4 },
  ring: { borderWidth: 2.5, borderColor: 'transparent', borderRadius: 22, padding: 1.5 },
  stL: { fontSize: 11.5, fontWeight: '600', color: C.ink, maxWidth: 54 },
  chips: { flexDirection: 'row', gap: 8, paddingHorizontal: 16 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: C.line, borderRadius: R.pill, paddingHorizontal: 12, height: 34 },
  chipT: { fontSize: 13, fontWeight: '600', color: C.ink },
  sec: { paddingHorizontal: 16, fontSize: 12, fontWeight: '800', color: C.ink, letterSpacing: 0.4 },
  noteIn: { marginHorizontal: 16, height: 40, borderRadius: 20, backgroundColor: C.soft, justifyContent: 'center', paddingHorizontal: 14 },
  note: { paddingHorizontal: 16, fontSize: 13.5, color: C.ink },
  acts: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 30, paddingTop: 4 },
  act: { width: 46, height: 40, alignItems: 'center', justifyContent: 'center' },
  foot: { textAlign: 'center', fontSize: 13, color: C.muted },
});
