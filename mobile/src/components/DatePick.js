import { useState } from 'react';
import { Modal, View, Platform, StyleSheet, Pressable } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Btn, H3 } from './ui';
import { C, R } from '../lib/theme';
import { t, loc } from '../lib/i18n';

/** Imperative-ish date/time picker. mode: 'date' | 'datetime'. */
export function useDatePick() {
  const [req, setReq] = useState(null); // {mode, value, title, cb}
  const [val, setVal] = useState(new Date());
  const open = (mode, value, title, cb) => {
    const v = value ? new Date(value) : new Date();
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({ value: v, mode: 'date', onChange: (e, d) => {
        if (e.type !== 'set' || !d) return;
        if (mode === 'date') return cb(d);
        DateTimePickerAndroid.open({ value: d, mode: 'time', is24Hour: true, onChange: (e2, d2) => { if (e2.type === 'set' && d2) cb(d2); } });
      } });
      return;
    }
    setVal(v); setReq({ mode, title, cb });
  };
  const node = req ? (
    <Modal transparent animationType="slide" onRequestClose={() => setReq(null)}>
      <Pressable style={st.back} onPress={() => setReq(null)} />
      <View style={st.sheet}>
        <H3 style={{ textAlign: 'center' }}>{req.title}</H3>
        <DateTimePicker value={val} mode={req.mode} display="inline" locale={loc()} minuteInterval={5} themeVariant="light" accentColor={C.accent} onChange={(e, d) => d && setVal(d)} />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Btn kind="ghost" title={t('cancel')} onPress={() => setReq(null)} style={{ flex: 1 }} />
          <Btn title={t('done')} onPress={() => { const cb = req.cb; setReq(null); cb(val); }} style={{ flex: 1 }} />
        </View>
      </View>
    </Modal>
  ) : null;
  return { open, node };
}

const st = StyleSheet.create({
  back: { flex: 1, backgroundColor: 'rgba(16,37,45,0.35)' },
  sheet: { backgroundColor: C.surface, padding: 16, paddingBottom: 34, gap: 12, borderTopLeftRadius: R.lg, borderTopRightRadius: R.lg },
});
