import { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable, TextInput, Modal, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { collection, onSnapshot, query, where, doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useApp } from '../../lib/store';
import { t } from '../../lib/i18n';
import { C } from '../../lib/theme';
import { initials, rel } from '../../lib/util';
import Icon from '../../components/Icon';

// Messages: chat between the people on the team
export default function Messages() {
  const ins = useSafeAreaInsets();
  const { user, team, rep } = useApp();
  const [chats, setChats] = useState([]);
  const [picking, setPicking] = useState(false);
  const [sel, setSel] = useState([]);
  const [q, setQ] = useState('');
  const [mode, setMode] = useState('abc');

  useEffect(() => onSnapshot(query(collection(db, 'chats'), where('members', 'array-contains', user.uid)),
    (s) => setChats(s.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => (b.updated || 0) - (a.updated || 0))), () => setChats([])), [user]);

  const others = useMemo(() => team.filter((u) => u.id !== user.uid && (u.name || '').toLowerCase().includes(q.trim().toLowerCase()))
    .sort((a, b) => (mode === 'abc' ? (a.name || '').localeCompare(b.name || '') : (a.role || '').localeCompare(b.role || ''))), [team, user, q, mode]);
  const title = (c) => c.members.filter((m) => m !== user.uid).map((m) => rep(m).name).join(', ') || '-';
  const start = async () => {
    if (!sel.length) return;
    const members = [user.uid, ...sel].sort();
    const id = members.join('_').slice(0, 200);
    await setDoc(doc(db, 'chats', id), { members, updated: Date.now() }, { merge: true }).catch(() => {});
    setPicking(false); setSel([]); router.push(`/chat/${id}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.surface, paddingTop: ins.top }}>
      <View style={st.head}>
        <Text style={st.title}>{t('tMessages')}</Text>
        <Pressable hitSlop={12} style={st.compose} onPress={() => setPicking(true)} accessibilityLabel={t('newChat')}><Icon name="compose" size={24} color={C.ink} /></Pressable>
      </View>
      <FlatList data={chats.filter((c) => c.last)} keyExtractor={(c) => c.id}
        ListEmptyComponent={<View style={st.empty}><Icon name="chat" size={34} color={C.muted} /><Text style={st.emptyT}>{t('noConvos')}</Text></View>}
        renderItem={({ item: c }) => (
          <Pressable onPress={() => router.push(`/chat/${c.id}`)} style={({ pressed }) => [st.row, pressed && { backgroundColor: C.soft }]}>
            <View style={st.av}><Text style={st.avT}>{initials(title(c))}</Text></View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={st.name} numberOfLines={1}>{title(c)}</Text><Text style={st.time}>{rel(c.last.t)}</Text></View>
              <Text style={st.msg} numberOfLines={1}>{c.last.by === user.uid ? `${t('you')}: ` : ''}{c.last.text}</Text>
            </View>
          </Pressable>
        )} />
      <Modal visible={picking} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setPicking(false)}>
        <View style={st.pHead}>
          <Pressable hitSlop={10} onPress={() => { setPicking(false); setSel([]); }}><Text style={st.red}>{t('cancel')}</Text></Pressable>
          <View style={st.seg}>
            {[['abc', 'ABC'], ['team', 'Team']].map(([k, l]) => <Pressable key={k} onPress={() => setMode(k)} style={[st.segB, mode === k && st.segOn]}><Text style={st.segT}>{l}</Text></Pressable>)}
          </View>
          <Pressable hitSlop={10} onPress={start}><Text style={[st.red, { fontWeight: '800' }, !sel.length && { opacity: 0.4 }]}>{t('done')}</Text></Pressable>
        </View>
        <View style={st.search}><Icon name="search" size={18} color={C.muted} /><TextInput value={q} onChangeText={setQ} placeholder={t('searchUsers')} placeholderTextColor={C.muted} style={{ flex: 1, fontSize: 16, color: C.ink }} /></View>
        <View style={st.uHead}><Text style={st.uH}>{t('users')}</Text><Pressable onPress={() => setSel(others.map((u) => u.id))}><Text style={st.red}>{t('selectAll')}</Text></Pressable></View>
        {others.map((u) => {
          const on = sel.includes(u.id);
          return (
            <Pressable key={u.id} onPress={() => setSel(on ? sel.filter((x) => x !== u.id) : [...sel, u.id])} style={st.uRow}>
              <Text style={st.uN}>{u.name}</Text>
              <Text style={st.role}>{u.role === 'chef' ? t('manager') : t('rep')}</Text>
              <View style={[st.radio, on && { backgroundColor: C.red }]}>{on ? <Icon name="check" size={14} color="#fff" width={3} /> : null}</View>
            </Pressable>
          );
        })}
      </Modal>
    </View>
  );
}
const st = StyleSheet.create({
  head: { alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: C.line },
  title: { fontSize: 17, fontWeight: '800', color: C.ink }, compose: { position: 'absolute', right: 14, top: 8 },
  row: { flexDirection: 'row', gap: 12, padding: 14, borderBottomWidth: 1, borderColor: C.soft, alignItems: 'center' },
  av: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.teal, alignItems: 'center', justifyContent: 'center' }, avT: { color: '#fff', fontWeight: '800' },
  name: { fontSize: 15.5, fontWeight: '800', color: C.ink, flex: 1 }, time: { fontSize: 12, color: C.muted }, msg: { fontSize: 14, color: C.muted, marginTop: 2 },
  empty: { alignItems: 'center', gap: 10, marginTop: 260 }, emptyT: { color: C.ink, fontSize: 15 },
  pHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderColor: C.line },
  red: { color: C.red, fontSize: 16 },
  seg: { flexDirection: 'row', backgroundColor: '#e3e3e3', borderRadius: 8, padding: 2 }, segB: { paddingHorizontal: 16, paddingVertical: 5, borderRadius: 6 }, segOn: { backgroundColor: '#fff' }, segT: { fontSize: 13, fontWeight: '700', color: C.ink },
  search: { flexDirection: 'row', alignItems: 'center', gap: 8, margin: 8, paddingHorizontal: 14, height: 38, borderRadius: 19, backgroundColor: '#e3e3e3' },
  uHead: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10 }, uH: { fontSize: 16, fontWeight: '800', color: C.ink },
  uRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderColor: C.line },
  uN: { flex: 1, fontSize: 16, fontWeight: '600', color: C.ink }, role: { fontSize: 15, color: C.muted },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: C.red, alignItems: 'center', justifyContent: 'center' },
});
