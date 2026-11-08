import { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '../lib/store';
import { t } from '../lib/i18n';
import { C, R, shadow } from '../lib/theme';
import { addr, nameOf, rel, lastVisit, fdate, fdt, meters, fdist, initials, dstr, DAY } from '../lib/util';
import { call, navigate } from '../lib/links';
import Icon from './Icon';
import StatusDot from './StatusDot';
import { Chip } from './ui';

export default function Peek({ lead, onClose, picker, bottom }) {
  const { S, setStatus, addNote, updLead, rep, here, areaOf, settings, me } = useApp();
  const [note, setNote] = useState('');
  if (!lead) return null;
  const st = S.st(lead.status);
  const owner = rep(lead.owner);
  const area = areaOf(lead.lat, lead.lng);
  const dist = here ? meters([here.lat, here.lng], [lead.lat, lead.lng]) : null;
  const notes = (lead.notes || []).slice(-2).reverse();
  const save = () => { const v = note.trim(); if (!v) return; addNote(lead, v); setNote(''); };
  const smsBody = (settings.tmplNH || t('tmplNHDefault')).replace('{namn}', lead.first || '').replace('{adress}', addr(lead)).replace('{säljare}', me?.name || '').replace('{telefon}', me?.phone || '');

  return (
    <View style={[st_.sheet, shadow, { paddingBottom: bottom + 12 }]}>
      <View style={st_.grab} />
      <Pressable onPress={() => router.push(`/lead/${lead.id}`)} style={st_.head} accessibilityRole="button" accessibilityLabel={t('details')}>
        <StatusDot st={st} size={42} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={st_.addr} numberOfLines={1}>{addr(lead)}{lead.apt ? `, ${lead.apt}` : ''}</Text>
          <Text style={st_.meta} numberOfLines={1}>{[nameOf(lead) || null, lead.status === 'ny' || !lead.status ? t('st_ny') : st.label, rel(lastVisit(lead)), dist != null ? fdist(dist) : null].filter(Boolean).join('  ·  ')}</Text>
        </View>
        <Pressable hitSlop={12} onPress={onClose} accessibilityLabel={t('cancel')}><Icon name="x" size={22} color={C.muted} /></Pressable>
      </Pressable>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={st_.stRow} keyboardShouldPersistTaps="handled">
        {S.list.map((s) => (
          <Pressable key={s.k} onPress={() => setStatus(lead, s.k)} style={({ pressed }) => [st_.stBtn, lead.status === s.k && st_.stOn, pressed && { transform: [{ scale: 0.94 }] }]} accessibilityRole="button" accessibilityLabel={s.label} accessibilityState={{ selected: lead.status === s.k }}>
            <StatusDot st={s} size={40} />
            <Text style={st_.stL} numberOfLines={1}>{s.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={st_.chips}>
        <Chip icon="clock" on={!!lead.meeting} title={lead.meeting ? fdt(lead.meeting) : t('bookMeeting')} onPress={() => picker.open('datetime', lead.meeting || Date.now() + DAY, t('bookMeeting'), (d) => updLead(lead.id, { meeting: d.getTime() }))} />
        <Chip icon="refresh" on={!!lead.revisit} title={lead.revisit ? fdate(lead.revisit) : t('setRevisit')} onPress={() => picker.open('date', lead.revisit ? lead.revisit + 'T12:00:00' : Date.now() + 14 * DAY, t('setRevisit'), (d) => updLead(lead.id, { revisit: dstr(d) }))} />
      </View>

      <View style={st_.noteRow}>
        <TextInput value={note} onChangeText={setNote} placeholder={t('addNotePh')} placeholderTextColor={C.muted} style={st_.noteIn} onSubmitEditing={save} returnKeyType="done" blurOnSubmit />
        <Pressable onPress={save} disabled={!note.trim()} style={[st_.noteBtn, !note.trim() && { opacity: 0.4 }]} accessibilityLabel={t('notes')}><Icon name="plus" size={22} color="#fff" /></Pressable>
      </View>
      {notes.map((n) => <Text key={n.t} style={st_.note} numberOfLines={2}>{n.text}  <Text style={{ color: C.muted }}>· {rel(n.t)}</Text></Text>)}

      <View style={st_.acts}>
        <Act icon="phone" label={t('call')} disabled={!lead.phone} onPress={() => call(lead.phone)} />
        <Act icon="sms" label={t('sms')} disabled={!lead.phone} onPress={() => import('expo-sms').then((m) => m.sendSMSAsync([lead.phone], smsBody)).catch(() => {})} />
        <Act icon="nav" label={t('nav')} onPress={() => navigate(lead.lat, lead.lng)} />
        <Act icon="note" label={t('details')} onPress={() => router.push(`/lead/${lead.id}`)} />
      </View>
      <View style={st_.foot}>
        <View style={st_.av}><Text style={st_.avT}>{initials(owner.name)}</Text></View>
        <Text style={st_.footT} numberOfLines={1}>{t('assignedTo')}: {owner.name}{area ? `  ·  ${area.name}` : ''}</Text>
      </View>
    </View>
  );
}

function Act({ icon, label, onPress, disabled }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [st_.act, disabled && { opacity: 0.35 }, pressed && { backgroundColor: C.soft }]} accessibilityRole="button" accessibilityLabel={label}>
      <Icon name={icon} size={22} color={C.accent} />
      <Text style={st_.actT}>{label}</Text>
    </Pressable>
  );
}

const st_ = StyleSheet.create({
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: C.surface, borderTopLeftRadius: R.lg, borderTopRightRadius: R.lg, paddingTop: 8, gap: 10 },
  grab: { alignSelf: 'center', width: 40, height: 5, borderRadius: 3, backgroundColor: C.line },
  head: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16 },
  addr: { fontSize: 19, fontWeight: '800', color: C.ink },
  meta: { fontSize: 13.5, color: C.muted, marginTop: 2 },
  stRow: { paddingHorizontal: 12, gap: 4 },
  stBtn: { width: 66, alignItems: 'center', gap: 4, paddingVertical: 6, borderRadius: R.md },
  stOn: { backgroundColor: C.soft },
  stL: { fontSize: 12, fontWeight: '700', color: C.ink, maxWidth: 62 },
  chips: { flexDirection: 'row', gap: 8, paddingHorizontal: 16 },
  noteRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16 },
  noteIn: { flex: 1, minHeight: 44, borderRadius: 12, borderWidth: 1, borderColor: C.line, backgroundColor: C.bg, paddingHorizontal: 12, fontSize: 16, color: C.ink },
  noteBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' },
  note: { paddingHorizontal: 16, fontSize: 14, color: C.ink },
  acts: { flexDirection: 'row', borderTopWidth: 1, borderColor: C.line, marginTop: 2 },
  act: { flex: 1, alignItems: 'center', gap: 3, paddingVertical: 10 },
  actT: { fontSize: 12, fontWeight: '700', color: C.ink },
  foot: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16 },
  av: { width: 26, height: 26, borderRadius: 13, backgroundColor: C.soft, alignItems: 'center', justifyContent: 'center' },
  avT: { fontSize: 11, fontWeight: '800', color: C.ink },
  footT: { fontSize: 13, color: C.muted, flex: 1 },
});
