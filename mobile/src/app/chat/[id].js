import { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { collection, onSnapshot, query, orderBy, limit, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useApp } from '../../lib/store';
import { t } from '../../lib/i18n';
import { C } from '../../lib/theme';
import { ftime } from '../../lib/util';
import Icon from '../../components/Icon';

export default function Chat() {
  const { id } = useLocalSearchParams();
  const ins = useSafeAreaInsets();
  const { user, rep } = useApp();
  const [msgs, setMsgs] = useState([]);
  const [members, setMembers] = useState([]);
  const [txt, setTxt] = useState('');
  const list = useRef(null);
  useEffect(() => { getDoc(doc(db, 'chats', id)).then((s) => setMembers((s.data() || {}).members || [])).catch(() => {}); }, [id]);
  useEffect(() => onSnapshot(query(collection(db, 'chats', id, 'msgs'), orderBy('t', 'desc'), limit(200)), (s) => setMsgs(s.docs.map((d) => ({ id: d.id, ...d.data() }))), () => {}), [id]);
  const send = () => {
    const v = txt.trim(); if (!v) return; setTxt('');
    const m = { t: Date.now(), by: user.uid, text: v };
    addDoc(collection(db, 'chats', id, 'msgs'), m).catch(() => {});
    setDoc(doc(db, 'chats', id), { last: m, updated: m.t }, { merge: true }).catch(() => {});
  };
  const title = members.filter((m) => m !== user.uid).map((m) => rep(m).name).join(', ') || t('tMessages');
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.surface }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[st.head, { paddingTop: ins.top + 8 }]}>
        <Pressable hitSlop={14} onPress={() => router.back()} style={{ position: 'absolute', left: 10, bottom: 8 }}><Icon name="chevL" size={26} color={C.ink} /></Pressable>
        <Text style={st.title} numberOfLines={1}>{title}</Text>
      </View>
      <FlatList ref={list} inverted data={msgs} keyExtractor={(m) => m.id} contentContainerStyle={{ padding: 12, gap: 8 }} renderItem={({ item: m }) => {
        const mine = m.by === user.uid;
        return (
          <View style={{ alignItems: mine ? 'flex-end' : 'flex-start' }}>
            {!mine && members.length > 2 ? <Text style={st.who}>{rep(m.by).name}</Text> : null}
            <View style={[st.bub, mine ? { backgroundColor: C.red } : { backgroundColor: '#ececec' }]}><Text style={{ fontSize: 15.5, color: mine ? '#fff' : C.ink }}>{m.text}</Text></View>
            <Text style={st.time}>{ftime(m.t)}</Text>
          </View>
        );
      }} />
      <View style={[st.bar, { paddingBottom: ins.bottom + 8 }]}>
        <TextInput value={txt} onChangeText={setTxt} placeholder={t('msgPh')} placeholderTextColor={C.muted} multiline style={st.in} />
        <Pressable onPress={send} disabled={!txt.trim()} style={[st.send, !txt.trim() && { opacity: 0.4 }]}><Icon name="send" size={20} color="#fff" /></Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
const st = StyleSheet.create({
  head: { alignItems: 'center', paddingBottom: 10, paddingHorizontal: 50, borderBottomWidth: 1, borderColor: C.line }, title: { fontSize: 16, fontWeight: '800', color: C.ink },
  bub: { maxWidth: '80%', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8 }, time: { fontSize: 11, color: C.muted, marginTop: 2 }, who: { fontSize: 11.500, color: C.muted, marginBottom: 2 },
  bar: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, padding: 8, borderTopWidth: 1, borderColor: C.line },
  in: { flex: 1, minHeight: 40, maxHeight: 120, borderRadius: 20, backgroundColor: '#f0f0f0', paddingHorizontal: 14, paddingVertical: 9, fontSize: 16, color: C.ink },
  send: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.red, alignItems: 'center', justifyContent: 'center' },
});
