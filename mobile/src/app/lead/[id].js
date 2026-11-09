import { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Switch, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../lib/store';
import { t } from '../../lib/i18n';
import { C, R } from '../../lib/theme';
import { addr, nameOf, fdt, fdate, ftime, meters, fdist, initials, dstr, DAY } from '../../lib/util';
import { call, mail, navigate } from '../../lib/links';
import Icon from '../../components/Icon';
import StatusDot from '../../components/StatusDot';
import { Chip, Field, H3, Sub, Btn } from '../../components/ui';
import { useDatePick } from '../../components/DatePick';

const FIELDS = [['company', 'company'], ['first', 'first'], ['last', 'last'], ['phone', 'phone', 'phone-pad'], ['email', 'email', 'email-address']];
const AFIELDS = [['street', 'street'], ['num', 'number'], ['apt', 'apt'], ['zip', 'zip', 'number-pad'], ['city', 'city']];

export default function LeadDetail() {
  const { id } = useLocalSearchParams();
  const ins = useSafeAreaInsets();
  const { leadById, S, setStatus, updLead, addNote, rep, deleteLead, isChef, user, team, assignLead, areaOf } = useApp();
  const lead = leadById(id);
  const [tab, setTab] = useState('info');
  const [draft, setDraft] = useState({});
  const [note, setNote] = useState('');
  const timer = useRef(null);
  const pending = useRef({});
  const picker = useDatePick();

  // Debounced autosave: every keystroke is queued, flushed 700 ms after typing stops and when leaving the page.
  const flush = () => { clearTimeout(timer.current); const p = pending.current; pending.current = {}; if (Object.keys(p).length) updLead(id, p); };
  useEffect(() => () => flush(), []); // eslint-disable-line react-hooks/exhaustive-deps
  const edit = (k, v) => { setDraft((d) => ({ ...d, [k]: v })); pending.current[k] = v; clearTimeout(timer.current); timer.current = setTimeout(flush, 700); };

  if (!lead) return <View style={[st.wrap, { paddingTop: ins.top + 20 }]}><Btn kind="ghost" title={t('cancel')} onPress={() => router.back()} /></View>;
  const val = (k) => (draft[k] !== undefined ? draft[k] : lead[k] || '');
  const s = S.st(lead.status);
  const area = areaOf(lead.lat, lead.lng);
  const canDel = isChef || lead.owner === user.uid;

  // activity: status changes, notes, sms – newest first, with distance from the house
  const events = [
    ...(lead.hist || []).map((h) => ({ ...h, kind: h.type === 'create' ? 'create' : h.type === 'assign' ? 'assign' : 'status' })),
    ...(lead.notes || []).map((n) => ({ ...n, kind: 'note' })),
    ...(lead.sms || []).map((m) => ({ ...m, kind: m.dir === 'in' ? 'smsIn' : 'smsOut', rep: m.by })),
  ].sort((a, b) => b.t - a.t);

  const notes = (lead.notes || []).slice().sort((a, b) => b.t - a.t);
  const saveNote = () => { const v = note.trim(); if (!v) return; addNote(lead, v); setNote(''); };

  return (
    <KeyboardAvoidingView style={st.wrap} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[st.head, { paddingTop: ins.top + 6 }]}>
        <Pressable hitSlop={12} onPress={() => { flush(); router.back(); }} style={st.back} accessibilityLabel="Tillbaka"><Icon name="back" size={26} color={C.ink} /></Pressable>
        <StatusDot st={s} size={40} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={st.title} numberOfLines={1}>{nameOf(lead) || lead.company || t('noName')}</Text>
          <Text style={st.sub} numberOfLines={1}>{lead.status && lead.status !== 'ny' ? s.label : t('st_ny')}</Text>
          <Text style={st.sub} numberOfLines={1}>{[`${addr(lead)}${lead.apt ? ` ${lead.apt}` : ''}`, lead.city, lead.zip].filter(Boolean).join(', ')}</Text>
        </View>
      </View>
      <View style={st.tabs}>
        {[['info', t('info')], ['notes', `${t('notes')}${notes.length ? ` (${notes.length})` : ''}`], ['act', t('activity')]].map(([k, l]) => (
          <Pressable key={k} onPress={() => setTab(k)} style={[st.tab, tab === k && st.tabOn]} accessibilityRole="tab" accessibilityState={{ selected: tab === k }}>
            <Text style={[st.tabT, tab === k && { color: C.ink }]}>{l}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 18, paddingBottom: ins.bottom + 40 }} keyboardShouldPersistTaps="handled">
        {tab === 'info' ? (
          <>
            <View style={st.quick}>
              <Quick icon="phone" label={t('call')} disabled={!lead.phone} onPress={() => call(lead.phone)} />
              <Quick icon="mail" label={t('mailL')} disabled={!lead.email} onPress={() => mail(lead.email)} />
              <Quick icon="nav" label={t('nav')} onPress={() => navigate(lead.lat, lead.lng)} />
            </View>
            <View style={{ gap: 10 }}>
              <H3>{t('statusH')}</H3>
              <View style={st.grid}>
                {S.list.map((x) => (
                  <Pressable key={x.k} onPress={() => setStatus(lead, x.k)} style={[st.gbtn, lead.status === x.k && st.gOn]} accessibilityRole="button" accessibilityState={{ selected: lead.status === x.k }}>
                    <StatusDot st={x} size={36} /><Text style={st.gT} numberOfLines={1}>{x.label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              <Chip icon="clock" on={!!lead.meeting} title={lead.meeting ? fdt(lead.meeting) : t('bookMeeting')} onPress={() => picker.open('datetime', lead.meeting || Date.now() + DAY, t('bookMeeting'), (d) => updLead(id, { meeting: d.getTime() }))} />
              <Chip icon="refresh" on={!!lead.revisit} title={lead.revisit ? fdate(lead.revisit) : t('setRevisit')} onPress={() => picker.open('date', lead.revisit ? lead.revisit + 'T12:00:00' : Date.now() + 14 * DAY, t('setRevisit'), (d) => updLead(id, { revisit: dstr(d) }))} />
              {lead.meeting || lead.revisit ? <Chip icon="x" title={t('clear')} onPress={() => updLead(id, { meeting: null, revisit: null })} /> : null}
            </View>
            <View style={st.card}>
              <H3>{t('assignedTo')}</H3>
              {isChef ? (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {team.map((u) => <Chip key={u.id} title={u.name} on={lead.owner === u.id} onPress={() => assignLead(lead, u.id)} />)}
                </View>
              ) : <Sub>{rep(lead.owner).name}</Sub>}
            </View>
            <View style={st.card}>
              <H3>{t('contact')}</H3>
              {FIELDS.map(([k, l, kb]) => <Field key={k} label={t(l)} value={val(k)} onChangeText={(v) => edit(k, v)} keyboardType={kb} autoCapitalize={k === 'email' ? 'none' : 'words'} />)}
              <View style={st.row}>
                <Text style={{ flex: 1, fontSize: 15, color: C.ink, fontWeight: '600' }}>{t('smsOk')}</Text>
                <Switch value={!!lead.smsOk} onValueChange={(v) => updLead(id, { smsOk: v })} trackColor={{ true: C.accent }} />
              </View>
            </View>
            <View style={st.card}>
              <H3>{t('address')}</H3>
              {AFIELDS.map(([k, l, kb]) => <Field key={k} label={t(l)} value={val(k)} onChangeText={(v) => edit(k, v)} keyboardType={kb} />)}
            </View>
            {canDel ? <Btn kind="danger" icon="trash" title={t('del')} onPress={() => Alert.alert(t('delQ'), addr(lead), [{ text: t('cancel'), style: 'cancel' }, { text: t('yesDel'), style: 'destructive', onPress: () => { deleteLead(id); router.back(); } }])} /> : null}
          </>
        ) : null}

        {tab === 'notes' ? (
          <>
            <View style={{ gap: 8 }}>
              <TextInput value={note} onChangeText={setNote} placeholder={t('addNotePh')} placeholderTextColor={C.muted} multiline style={st.noteIn} />
              <Btn title={t('notes') + ' +'} disabled={!note.trim()} onPress={saveNote} />
            </View>
            {notes.length ? notes.map((n) => (
              <View key={n.t} style={st.noteCard}>
                <Text style={st.noteT}>{n.text}</Text>
                <Text style={st.noteM}>{rep(n.rep).name}  ·  {fdt(n.t)}{n.lat ? `  ·  ${fdist(meters([n.lat, n.lng], [lead.lat, lead.lng]))}` : ''}</Text>
              </View>
            )) : <Sub>{t('noNotes')}</Sub>}
          </>
        ) : null}

        {tab === 'act' ? (
          events.length ? events.map((e, i) => {
            const day = new Date(e.t).toDateString();
            const head = i === 0 || new Date(events[i - 1].t).toDateString() !== day;
            return (
              <View key={e.t + e.kind + i}>
                {head ? <Text style={st.day}>{new Date(e.t).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</Text> : null}
                <Event e={e} lead={lead} last={i === events.length - 1 || new Date(events[i + 1].t).toDateString() !== day} />
              </View>
            );
          }) : <Sub>{t('noActivity')}</Sub>
        ) : null}
      </ScrollView>
      {picker.node}
    </KeyboardAvoidingView>
  );
}

function Event({ e, lead, last }) {
  const { S, rep } = useApp();
  const who = rep(e.rep).name;
  let dot = null, title = '';
  if (e.kind === 'status') { const s = S.st(e.s); dot = <StatusDot st={s} size={30} />; title = `${t('evStatus')} ${s.label || t('st_ny')}`; }
  else if (e.kind === 'create') { dot = <View style={[st.evI, { backgroundColor: '#5f747d' }]} />; title = t('evCreate'); }
  else if (e.kind === 'assign') { const n = rep(e.to).name; dot = <View style={[st.evI, { backgroundColor: C.accent }]}><Text style={st.evIn}>{initials(n)}</Text></View>; title = `${t('evAssignTo')} ${n}`; }
  else if (e.kind === 'note') { dot = <View style={[st.evI, { backgroundColor: '#d64541' }]}><Icon name="note" size={15} color="#fff" /></View>; title = t('evNote'); }
  else { dot = <View style={[st.evI, { backgroundColor: C.sms }]}><Icon name="sms" size={15} color="#fff" /></View>; title = e.kind === 'smsIn' ? t('evSmsIn') : t('evSmsOut'); }
  const d = typeof e.lat === 'number' ? meters([e.lat, e.lng], [lead.lat, lead.lng]) : null;
  return (
    <View style={st.ev}>
      <View style={{ alignItems: 'center', width: 30 }}>{dot}{!last ? <View style={st.line} /> : null}</View>
      <View style={{ flex: 1, gap: 2, paddingBottom: 16 }}>
        <Text style={st.evT}>{title}</Text>
        {e.text ? <Text style={st.evX}>{e.text}</Text> : null}
        <Text style={st.evM}>{who && who !== '—' ? `${t('by')} ${who} ` : ''}{t('at')} {ftime(e.t)}</Text>
      </View>
      <View style={st.loc}>
        <Text style={[st.evM, d != null && d <= 75 && { color: C.ok, fontWeight: '700' }]}>{d != null ? fdist(d) : t('noLocation')}</Text>
        <Icon name="nav" size={13} color={d != null && d <= 75 ? C.ok : C.muted} />
      </View>
    </View>
  );
}

const Quick = ({ icon, label, onPress, disabled }) => (
  <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [st.q, disabled && { opacity: 0.35 }, pressed && { backgroundColor: C.soft }]} accessibilityRole="button" accessibilityLabel={label}>
    <Icon name={icon} size={22} color={C.accent} /><Text style={st.qT}>{label}</Text>
  </Pressable>
);

const st = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: C.bg },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, paddingBottom: 10, backgroundColor: C.surface },
  back: { width: 36, height: 44, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 19, fontWeight: '800', color: C.ink }, sub: { fontSize: 13.5, color: C.muted, marginTop: 1 },
  tabs: { flexDirection: 'row', backgroundColor: C.surface, borderBottomWidth: 1, borderColor: C.line },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12, borderBottomWidth: 3, borderColor: 'transparent' },
  tabOn: { borderColor: C.accent }, tabT: { fontWeight: '800', color: C.muted, fontSize: 14.5 },
  quick: { flexDirection: 'row', gap: 8 },
  q: { flex: 1, alignItems: 'center', gap: 4, paddingVertical: 12, backgroundColor: C.surface, borderRadius: R.md, borderWidth: 1, borderColor: C.line },
  qT: { fontSize: 12.5, fontWeight: '700', color: C.ink },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  gbtn: { width: '23.5%', alignItems: 'center', gap: 4, paddingVertical: 8, borderRadius: R.md, backgroundColor: C.surface, borderWidth: 1.5, borderColor: 'transparent' },
  gOn: { borderColor: C.ink }, gT: { fontSize: 12, fontWeight: '700', color: C.ink },
  card: { backgroundColor: C.surface, borderRadius: R.lg, padding: 14, gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 44 },
  noteIn: { minHeight: 90, borderRadius: 12, borderWidth: 1, borderColor: C.line, backgroundColor: C.surface, padding: 12, fontSize: 16, color: C.ink, textAlignVertical: 'top' },
  noteCard: { backgroundColor: C.surface, borderRadius: R.md, padding: 12, gap: 6 },
  noteT: { fontSize: 15.5, color: C.ink, lineHeight: 21 }, noteM: { fontSize: 12.5, color: C.muted },
  ev: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  evI: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  evIn: { color: '#fff', fontSize: 11, fontWeight: '800' },
  line: { width: 2, flex: 1, backgroundColor: C.line, marginTop: 4 },
  loc: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  day: { fontSize: 15, fontWeight: '800', color: C.ink, marginBottom: 10, marginTop: 4 },
  evT: { fontSize: 15, fontWeight: '700', color: C.ink }, evX: { fontSize: 14.5, color: C.ink }, evM: { fontSize: 12.5, color: C.muted },
  dist: { borderRadius: R.pill, paddingHorizontal: 8, paddingVertical: 3 }, distT: { fontSize: 12, fontWeight: '800' },
});
