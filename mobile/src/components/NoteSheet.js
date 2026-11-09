import { useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { t } from '../lib/i18n';
import { C } from '../lib/theme';
import Icon from './Icon';

// SalesRabbit's "Note" sheet: X – Note – Add
export default function NoteSheet({ visible, onClose, onAdd }) {
  const [txt, setTxt] = useState('');
  const add = () => { const v = txt.trim(); if (!v) return; onAdd(v); setTxt(''); };
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' }} onPress={onClose} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={st.sheet}>
          <View style={st.head}>
            <Pressable hitSlop={12} onPress={onClose}><Icon name="x" size={20} color={C.ink} /></Pressable>
            <Text style={st.title}>{t('note')}</Text>
            <Pressable hitSlop={12} onPress={add} disabled={!txt.trim()}><Text style={[st.add, !txt.trim() && { opacity: 0.4 }]}>{t('add')}</Text></Pressable>
          </View>
          <TextInput autoFocus value={txt} onChangeText={setTxt} placeholder={t('addNotePh')} placeholderTextColor={C.muted} multiline style={st.in} maxLength={5000} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
const st = StyleSheet.create({
  sheet: { backgroundColor: C.surface, borderTopLeftRadius: 16, borderTopRightRadius: 16, minHeight: 230 },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderColor: C.soft },
  title: { fontSize: 16, fontWeight: '800', color: C.ink },
  add: { fontSize: 16, fontWeight: '800', color: C.red },
  in: { minHeight: 160, padding: 16, fontSize: 16, color: C.ink, textAlignVertical: 'top' },
});
