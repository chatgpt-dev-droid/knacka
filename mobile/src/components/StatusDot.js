import { View } from 'react-native';
import Icon from './Icon';
import { C } from '../lib/theme';

export default function StatusDot({ st, size = 34, selected }) {
  if (!st || st.k === 'ny') {
    return <View style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 2.5, borderColor: '#8d9aa6', backgroundColor: C.surface }} />;
  }
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: st.color, alignItems: 'center', justifyContent: 'center',
      ...(selected ? { borderWidth: 3, borderColor: C.ink } : null) }}>
      <Icon name={st.icon} size={Math.round(size * 0.5)} color="#fff" width={2.6} />
    </View>
  );
}
