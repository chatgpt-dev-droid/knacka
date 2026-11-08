import { Pressable, Text, View, StyleSheet, TextInput } from 'react-native';
import { C, R, shadow } from '../lib/theme';
import Icon from './Icon';

export function Btn({ title, onPress, kind = 'primary', icon, disabled, style, small }) {
  const ghost = kind === 'ghost', danger = kind === 'danger';
  return (
    <Pressable onPress={onPress} disabled={disabled} accessibilityRole="button" accessibilityLabel={title}
      style={({ pressed }) => [s.btn, small && s.btnSm, ghost && s.btnGhost, danger && s.btnDanger, disabled && { opacity: 0.5 }, pressed && { opacity: 0.8, transform: [{ scale: 0.985 }] }, style]}>
      {icon ? <Icon name={icon} size={18} color={ghost || danger ? (danger ? C.bad : C.ink) : C.accentInk} /> : null}
      <Text style={[s.btnT, small && { fontSize: 14 }, ghost && { color: C.ink }, danger && { color: C.bad }]}>{title}</Text>
    </Pressable>
  );
}
export function IconBtn({ name, onPress, label, active, size = 46, flat, badge }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} hitSlop={6}
      style={({ pressed }) => [s.ibtn, { width: size, height: size }, !flat && shadow, flat && { backgroundColor: 'transparent' }, active && { backgroundColor: C.accent }, pressed && { transform: [{ scale: 0.94 }] }]}>
      <Icon name={name} size={22} color={active ? C.accentInk : C.ink} />
      {badge ? <View style={s.badge}><Text style={s.badgeT}>{badge}</Text></View> : null}
    </Pressable>
  );
}
export function Chip({ title, onPress, on, icon, style }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: !!on }}
      style={({ pressed }) => [s.chip, on && s.chipOn, pressed && { opacity: 0.8 }, style]}>
      {icon ? <Icon name={icon} size={17} color={on ? C.accent : C.muted} /> : null}
      <Text style={[s.chipT, on && { color: C.ink }]}>{title}</Text>
    </Pressable>
  );
}
export function Field({ label, value, onChangeText, onEndEditing, keyboardType, style, multiline, placeholder, autoCapitalize, secure }) {
  return (
    <View style={[{ gap: 5 }, style]}>
      {label ? <Text style={s.label}>{label}</Text> : null}
      <TextInput value={value} onChangeText={onChangeText} onEndEditing={onEndEditing} onBlur={onEndEditing} keyboardType={keyboardType} multiline={multiline}
        placeholder={placeholder} placeholderTextColor={C.muted} autoCapitalize={autoCapitalize} secureTextEntry={!!secure} autoCorrect={false} style={[s.input, multiline && { minHeight: 80, textAlignVertical: 'top' }]} />
    </View>
  );
}
export const H3 = ({ children, style }) => <Text style={[s.h3, style]}>{children}</Text>;
export const Sub = ({ children, style }) => <Text style={[s.sub, style]}>{children}</Text>;

export const s = StyleSheet.create({
  btn: { minHeight: 50, borderRadius: R.md, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, paddingHorizontal: 16 },
  btnSm: { minHeight: 40, paddingHorizontal: 12, borderRadius: R.sm },
  btnGhost: { backgroundColor: C.surface, borderWidth: 1.5, borderColor: C.line },
  btnDanger: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#efb7b3' },
  btnT: { color: C.accentInk, fontWeight: '800', fontSize: 16 },
  ibtn: { borderRadius: R.md, backgroundColor: C.surface, alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 3, right: 1, minWidth: 18, paddingHorizontal: 5, borderRadius: 9, backgroundColor: C.bad, alignItems: 'center' },
  badgeT: { color: '#fff', fontSize: 11, fontWeight: '800', lineHeight: 17 },
  chip: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 14, borderRadius: R.pill, borderWidth: 1.5, borderColor: C.line, backgroundColor: C.surface },
  chipOn: { borderColor: C.accent },
  chipT: { fontWeight: '700', fontSize: 14, color: C.muted },
  label: { fontSize: 13, fontWeight: '700', color: C.muted },
  input: { minHeight: 46, borderRadius: 12, borderWidth: 1, borderColor: C.line, backgroundColor: C.bg, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, color: C.ink },
  h3: { fontSize: 16, fontWeight: '800', color: C.ink },
  sub: { fontSize: 14, color: C.muted },
});
