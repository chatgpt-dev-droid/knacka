import { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Alert, Modal } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SMS from 'expo-sms';
import * as Clipboard from 'expo-clipboard';
import { useApp } from '../../lib/store';
import { t, loc } from '../../lib/i18n';
import { C } from '../../lib/theme';
import { addr, nameOf, ftime, meters, fdist, initials, dstr, todayStr, DAY } from '../../lib/util';
import { call, mail, navigate } from '../../lib/links';
import Icon from '../../components/Icon';
import StatusDot from '../../components/StatusDot';
import NoteSheet from '../../components/NoteSheet';
import { useDatePick } from '../../components/DatePick';

const apptTxt = (ts) => new Date(ts).toLocaleDateString(loc(), { weekday: 'short', month: 'short', day: 'numeric' }) + ' ' + t('at') + ' ' + ftime(ts);

// Lead details – Info / Notes / Activity, laid out like SalesRabbit
export default function LeadDetail() {
  const { id } = useLocalSearchParams();
  const ins = useSafeAreaInsets();
  const { leadById, S, setStatus, updLead, addNote, editNote, deleteNote, setMeeting, rep, deleteLead, isChef, user, team, assignLead, showToast } = useApp();
  const lead = leadById(id);
  const [tab, setTab] = useState('info');
  const [draft, setDraft] = useState({});
  const [noting, setNoting] = useState(false);
  const [editing, setEditing] = useState(null);
  const [menu, setMenu] = useState(null);
  const [apptMenu, setApptMenu] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const timer = useRef(null);
  const pending = useRef({});
  const picker = useDatePick();

  // autosave: every keystroke is queued, written 700 ms after typing stops and when leaving the page
  const flush = () => { clearTimeout(timer.current); const p = pending.current; pending.current = {}; if (Object.keys(p).length) updLead(id, p); };
  useEffect(() => () => flush(), []); // eslint-disable-line
  const edit = (k, v) => { setDraft((d) => ({ ...d, [k]: v })); pending.current[k] = v; clearTimeout(timer.current); timer.current = setTimeout(flush, 700); };

  if (!lead) return <View style={{ flex: 1, paddingTop: ins.top + 20, alignItems: 'center' }}><Pressable onPress={() => router.back()}><Text style={{ color: C.red, fontWeight: '800' }}>{t('cancel')}</Text></Pressable></View>;
  const val = (k) => (draft[k] !== undefined ? draft[k] : lead[k] || '');
  const s = S.st(lead.status);
  const canDel = isChef || lead.owner === user.uid;
  const pickAppt = () => picker.open('datetime', lead.meeting || Date.now() + DAY, t('setAppt'), (d) => setMeeting(lead, d.getTime()));

  const events = [
    ...(lead.hist || []).map((h) => ({ ...h, kind: h.type || 'status' })),
    ...(lead.notes || []).map((n) => ({ ...n, kind: 'note' })),
    ...(lead.sms || []).map((m) => ({ ...m, kind: m.dir === 'in' ? 'smsIn' : 'smsOut', rep: m.by })),
  ].sort((a, b) => b.t - a.t);
  const notes = (lead.notes || []).slice().sort((a, b) => b.t - a.t);
  const dayLabel = (ts) => (dstr(new Date(ts)) === todayStr() ? t('todayCaps') : new Date(ts).toLocaleDateString(loc(), { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase());
  const when = (ts) => (dstr(new Date(ts)) === todayStr() ? `${t('today')} ${t('at')} ${ftime(ts)}` : `${new Date(ts).toLocaleDateString(loc(), { month: 'short', day: 'numeric', year: 'numeric' })} ${t('at')} ${ftime(ts)}`);

  const F = ({ k, label, kb, flex, cap }) => (
    <View style={[st.f, flex && { flex }]}>
      <Text style={st.fl}>{label}</Text>
      <TextInput value={val(k)} onChangeText={(v) => edit(k, v)} keyboardType={kb} autoCapitalize={cap || 'words'} autoCorrect={false} style={st.fi} />
    </View>
  );
  const Sec = ({ children, info }) => <View style={st.sec}><Text style={st.secT}>{children}</Text>{info ? <View style={st.i}><Text style={st.iT}>i</Text></View> : null}</View>;

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.surface }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[st.head, { paddingTop: ins.top + 6 }]}>
        <Pressable hitSlop={14} onPress={() => { flush(); router.back(); }} style={st.back} accessibilityLabel="Back"><Icon name="chevL" size={26} color={C.ink} /></Pressable>
        <Text style={st.title} numberOfLines={1}>{nameOf(lead) || lead.company || '-'}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}><StatusDot st={s} size={16} /><Text style={st.sub}>{lead.status && lead.status !== 'ny' ? s.label : t('st_ny')}</Text></View>
        <View style={st.tabs}>
          {[['info', t('info')], ['notes', t('notes')], ['act', t('activity')]].map(([k, l]) => (
            <Pressable key={k} onPress={() => setTab(k)} style={[st.tab, tab === k && st.tabOn]} accessibilityRole="tab" accessibilityState={{ selected: tab === k }}>
              <Text style={[st.tabT, tab === k && { color: C.red }]}>{l}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {tab === 'info' ? (
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: ins.bottom + 40, backgroundColor: '#f0f0f0' }}>
          <View style={st.quick}>
            <Q icon="phone" off={!lead.phone} onPress={() => call(lead.phone)} />
            <Q icon="chat" off={!lead.phone} onPress={() => SMS.sendSMSAsync([lead.phone], '').catch(() => {})} />
            <Q icon="mail" off={!lead.email} onPress={() => mail(lead.email)} />
            <Q icon="share" onPress={() => navigate(lead.lat, lead.lng)} />
          </View>
          <Sec>{t('contactCaps')}</Sec>
          <View style={st.block}>
            {F({ k: 'company', label: t('company') })}
            <View style={st.rowF}>{F({ k: 'first', label: t('first'), flex: 1 })}{F({ k: 'last', label: t('last'), flex: 1 })}</View>
            {F({ k: 'phone', label: t('phone'), kb: 'phone-pad' })}
            {F({ k: 'email', label: t('email'), kb: 'email-address', cap: 'none' })}
            <View style={st.rowF}>
              <Pressable onPress={() => navigate(lead.lat, lead.lng)} style={{ justifyContent: 'center', paddingTop: 10 }}><Icon name="target" size={22} color={C.red} /></Pressable>
              <View style={[st.f, { flex: 3 }]}>
                <Text style={st.fl}>{t('street')}</Text>
                <TextInput value={draft._addr !== undefined ? draft._addr : `${lead.street || ''} ${lead.num || ''}`.trim()} style={st.fi} autoCorrect={false}
                  onChangeText={(v) => { const m = v.trim().match(/^(.*?)\s+(\d+\s*[A-Za-z]?)$/); setDraft((d) => ({ ...d, _addr: v })); pending.current.street = m ? m[1] : v.trim(); pending.current.num = m ? m[2].replace(/\s+/g, '') : ''; clearTimeout(timer.current); timer.current = setTimeout(flush, 700); }} />
              </View>
              {F({ k: 'apt', label: t('apt'), flex: 1 })}
            </View>
            <Text style={st.country}>{t('country')}</Text>
            <View style={st.rowF}>{F({ k: 'city', label: t('city'), flex: 2 })}{F({ k: 'region', label: t('region'), flex: 2 })}{F({ k: 'zip', label: t('zip'), kb: 'number-pad', flex: 1.4 })}</View>
          </View>
          <Sec>{t('assignedCaps')}</Sec>
          <Pressable style={st.line} disabled={!isChef} onPress={() => setAssigning(true)}><Text style={st.lineT}>{rep(lead.owner).name}</Text></Pressable>
          <Sec info>{t('statusCaps')}</Sec>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: C.surface }} contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 10 }}>
            {S.list.map((x) => (
              <Pressable key={x.k} onPress={() => setStatus(lead, x.k)} style={st.stBtn} accessibilityLabel={x.label} accessibilityState={{ selected: lead.status === x.k }}>
                <View style={[st.ring, lead.status === x.k && { borderColor: x.color }]}><StatusDot st={x} size={36} /></View>
                <Text style={st.stL} numberOfLines={1}>{x.short || x.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Sec>{t('apptCaps')}</Sec>
          <Pressable style={st.line} onPress={() => (lead.meeting ? setApptMenu(true) : pickAppt())}>
            <Text style={lead.meeting ? st.lineT : st.setAppt}>{lead.meeting ? apptTxt(lead.meeting) : t('setAppt')}</Text>
          </Pressable>
          {canDel ? (
            <Pressable style={st.del} onPress={() => Alert.alert(t('delTitle'), t('delQ'), [{ text: t('no'), style: 'cancel' }, { text: t('yes'), style: 'destructive', onPress: () => { deleteLead(id); router.back(); } }])}>
              <Icon name="trash" size={19} color={C.red} /><Text style={st.delT}>{t('del')}</Text>
            </Pressable>
          ) : null}
        </ScrollView>
      ) : null}

      {tab === 'notes' ? (
        <>
          <ScrollView contentContainerStyle={{ padding: 14, gap: 18 }}>
            {notes.map((n) => (
              <View key={n.t + n.text} style={{ flexDirection: 'row', gap: 10 }}>
                <View style={st.av}><Text style={st.avT}>{initials(rep(n.rep).name)}</Text></View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View><Text style={st.nName}>{rep(n.rep).name}</Text><Text style={st.nDate}>{when(n.t)}</Text></View>
                    <Pressable hitSlop={12} onPress={() => setMenu(n)}><Icon name="dots" size={22} color={C.muted} width={3} /></Pressable>
                  </View>
                  <View style={st.bubble}><Text style={st.nText}>{n.text}</Text></View>
                </View>
              </View>
            ))}
          </ScrollView>
          <Pressable onPress={() => setNoting(true)} style={[st.addBar, { paddingBottom: ins.bottom + 14 }]}><Text style={{ color: C.muted, fontSize: 15 }}>{t('addNotePh')}</Text></Pressable>
        </>
      ) : null}

      {tab === 'act' ? (
        <ScrollView contentContainerStyle={{ paddingBottom: ins.bottom + 30, backgroundColor: '#f0f0f0' }}>
          {events.length ? events.map((e, i) => {
            const head = i === 0 || dstr(new Date(events[i - 1].t)) !== dstr(new Date(e.t));
            return <View key={e.t + e.kind + i}>{head ? <Text style={st.dayH}>{dayLabel(e.t)}</Text> : null}<Event e={e} lead={lead} /></View>;
          }) : <Text style={{ padding: 20, color: C.muted }}>{t('noActivity')}</Text>}
        </ScrollView>
      ) : null}

      <NoteSheet visible={noting} onClose={() => setNoting(false)} onAdd={(txt) => { addNote(lead, txt); setNoting(false); }} />
      <NoteSheet visible={!!editing} initial={editing?.text} onClose={() => setEditing(null)} onAdd={(txt) => { editNote(lead, editing, txt); setEditing(null); }} />
      <Sheet visible={!!menu} onClose={() => setMenu(null)} items={[
        [t('edit'), 'pencil', () => setEditing(menu)],
        [t('copy'), 'note', () => { Clipboard.setStringAsync(menu.text); showToast(t('copied')); }],
        [t('delete'), 'trash', () => deleteNote(lead, menu), true],
      ]} />
      <Sheet visible={apptMenu} onClose={() => setApptMenu(false)} title={lead.meeting ? apptTxt(lead.meeting) : ''} items={[
        [t('reschedule'), 'pencil', pickAppt],
        [t('cancelAppt'), 'trash', () => setMeeting(lead, null), true],
      ]} />
      <Sheet visible={assigning} onClose={() => setAssigning(false)} title={t('assignedTo')} items={team.map((u) => [u.name, 'users', () => assignLead(lead, u.id)])} />
      {picker.node}
    </KeyboardAvoidingView>
  );
}

function Sheet({ visible, onClose, items, title }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }} onPress={onClose} />
      <View style={st.sheet}>
        <View style={st.grab} />
        {title ? <Text style={st.sheetT}>{title}</Text> : null}
        {items.map(([label, icon, fn, red]) => (
          <Pressable key={label} onPress={() => { onClose(); setTimeout(fn, 250); }} style={st.sheetRow}>
            <Icon name={icon} size={20} color={red ? C.red : C.ink} /><Text style={[st.sheetL, red && { color: C.red }]}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </Modal>
  );
}

function Event({ e, lead }) {
  const { S, rep } = useApp();
  const who = rep(e.rep).name;
  let dot, title, extra = e.text || null;
  if (e.kind === 'status') { dot = <StatusDot st={S.st(e.s)} size={30} />; title = t('evStatusT'); extra = S.st(e.s).label || null; }
  else if (e.kind === 'create') { dot = <View style={[st.evI, { backgroundColor: '#13c2c2' }]}><Icon name="check" size={16} color="#fff" /></View>; title = t('evCreate'); }
  else if (e.kind === 'assign') { dot = <View style={[st.evI, { backgroundColor: '#bfbfbf' }]}><Text style={st.evIn}>{initials(rep(e.to).name)}</Text></View>; title = t('evReassign'); extra = `${t('evLeadTo')} ${rep(e.to).name}`; }
  else if (e.kind === 'appt') { dot = <Icon name="cal" size={24} color={C.red} />; title = e.meeting ? t('evAppt') : t('evApptOff'); extra = e.meeting ? apptTxt(e.meeting) : null; }
  else if (e.kind === 'note') { dot = <Icon name="note" size={24} color={C.red} />; title = t('evNote'); }
  else { dot = <Icon name="chat" size={24} color={C.red} />; title = e.kind === 'smsIn' ? t('evSmsIn') : t('evSmsOut'); }
  const d = typeof e.lat === 'number' ? meters([e.lat, e.lng], [lead.lat, lead.lng]) : null;
  const near = d != null && d <= 75;
  return (
    <View style={st.ev}>
      <View style={{ width: 32, alignItems: 'center' }}>{dot}</View>
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={st.evT}>{title}</Text>
        <Text style={st.evM}>{who && who !== '—' ? `${t('by')} ${who} ` : ''}{t('at')} {ftime(e.t)}</Text>
        {extra ? <Text style={st.evX}>{extra}</Text> : null}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Text style={[st.evD, { color: d == null ? C.red : near ? C.ink : C.red }]}>{d != null ? fdist(d) : t('noLocation')}</Text>
        <Icon name="pin" size={16} color={d == null ? '#8c8c8c' : near ? '#52c41a' : C.red} />
      </View>
    </View>
  );
}

const Q = ({ icon, onPress, off }) => (
  <Pressable onPress={onPress} disabled={off} style={({ pressed }) => [st.q, pressed && { opacity: 0.6 }]}><Icon name={icon} size={20} color={off ? '#b5b5b5' : C.ink} /></Pressable>
);

const st = StyleSheet.create({
  head: { alignItems: 'center', backgroundColor: C.surface, borderBottomWidth: 1, borderColor: C.line, paddingHorizontal: 50 },
  back: { position: 'absolute', left: 10, bottom: 52 },
  title: { fontSize: 15, fontWeight: '800', color: C.ink }, sub: { fontSize: 13, color: C.ink },
  tabs: { flexDirection: 'row', gap: 6, marginTop: 8 },
  tab: { paddingHorizontal: 14, paddingVertical: 8, borderBottomWidth: 2.5, borderColor: 'transparent' }, tabOn: { borderColor: C.red },
  tabT: { fontSize: 15, fontWeight: '700', color: C.ink },
  quick: { flexDirection: 'row', justifyContent: 'center', gap: 24, paddingVertical: 10, backgroundColor: C.surface },
  q: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#efefef', alignItems: 'center', justifyContent: 'center' },
  sec: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#f0f0f0', paddingHorizontal: 16, paddingVertical: 10 },
  secT: { fontSize: 13, color: '#555', letterSpacing: 0.3 },
  i: { width: 15, height: 15, borderRadius: 8, backgroundColor: C.ink, alignItems: 'center', justifyContent: 'center' }, iT: { color: '#fff', fontSize: 10, fontWeight: '900' },
  block: { backgroundColor: C.surface, paddingHorizontal: 16, paddingBottom: 8 },
  rowF: { flexDirection: 'row', gap: 12 },
  f: { borderBottomWidth: 1.5, borderColor: '#d9d9d9', paddingTop: 10 },
  fl: { fontSize: 11.5, color: '#9a9a9a', paddingLeft: 4 }, fi: { fontSize: 16, color: C.ink, paddingVertical: 5, paddingLeft: 4, minHeight: 32 },
  country: { fontSize: 16, fontWeight: '700', color: C.ink, paddingVertical: 14, borderBottomWidth: 1.5, borderColor: '#d9d9d9' },
  line: { backgroundColor: C.surface, paddingHorizontal: 16, paddingVertical: 15 }, lineT: { fontSize: 16, color: C.ink },
  setAppt: { fontSize: 16, fontWeight: '800', color: C.red },
  stBtn: { width: 52, alignItems: 'center', gap: 4 }, ring: { borderWidth: 2.5, borderColor: 'transparent', borderRadius: 23, padding: 1.5 },
  stL: { fontSize: 13, color: C.ink, maxWidth: 50 },
  del: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 22 }, delT: { color: C.red, fontWeight: '800', fontSize: 15 },
  av: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.teal, alignItems: 'center', justifyContent: 'center' }, avT: { color: '#fff', fontSize: 10, fontWeight: '800' },
  nName: { fontSize: 14, fontWeight: '800', color: C.ink }, nDate: { fontSize: 12, color: C.muted, marginTop: 2 },
  bubble: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0', borderRadius: 8, padding: 9, marginTop: 8, maxWidth: '92%' }, nText: { fontSize: 14, color: C.ink, lineHeight: 19 },
  addBar: { borderTopWidth: 1, borderColor: C.line, paddingHorizontal: 30, paddingTop: 16 },
  dayH: { fontSize: 12.5, color: '#555', paddingHorizontal: 16, paddingVertical: 9, backgroundColor: '#f0f0f0' },
  ev: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', backgroundColor: C.surface, paddingHorizontal: 14, paddingVertical: 14, borderBottomWidth: 1, borderColor: '#f0f0f0' },
  evI: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }, evIn: { color: '#fff', fontSize: 10, fontWeight: '800' },
  evT: { fontSize: 14.5, fontWeight: '700', color: C.ink }, evM: { fontSize: 12, color: C.muted }, evX: { fontSize: 12.5, color: C.ink }, evD: { fontSize: 12 },
  sheet: { backgroundColor: C.surface, borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingHorizontal: 18, paddingBottom: 36, paddingTop: 8 },
  grab: { alignSelf: 'center', width: 38, height: 5, borderRadius: 3, backgroundColor: C.line, marginBottom: 10 },
  sheetT: { fontSize: 17, fontWeight: '700', color: C.ink, paddingVertical: 8 },
  sheetRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 13 }, sheetL: { fontSize: 16, color: C.ink },
});
