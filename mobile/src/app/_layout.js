import '../lib/tracking'; // registers the background location task
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppProvider, useApp } from '../lib/store';
import AuthScreen from '../components/AuthScreen';
import { C } from '../lib/theme';

function Toast() {
  const { toast, setToast } = useApp();
  const ins = useSafeAreaInsets();
  if (!toast) return null;
  return (
    <View pointerEvents="box-none" style={[st.toastWrap, { bottom: ins.bottom + 84 }]}>
      <View style={st.toast} accessibilityLiveRegion="polite">
        <Text style={st.toastT}>{toast.msg}</Text>
        {toast.action ? <Pressable hitSlop={10} onPress={() => { setToast(null); toast.fn(); }}><Text style={st.toastA}>{toast.action}</Text></Pressable> : null}
      </View>
    </View>
  );
}

function Gate() {
  const { phase } = useApp();
  if (phase === 'loading') return <View style={st.center}><ActivityIndicator size="large" color={C.accent} /></View>;
  if (phase !== 'ready') return <AuthScreen />;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="lead/[id]" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="chat/[id]" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppProvider>
          <StatusBar style="dark" />
          <Gate />
          <Toast />
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const st = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.bg },
  toastWrap: { position: 'absolute', left: 16, right: 16, alignItems: 'center' },
  toast: { backgroundColor: C.ink, borderRadius: 14, paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', gap: 16, alignItems: 'center', maxWidth: 480 },
  toastT: { color: '#fff', fontWeight: '700', fontSize: 15, flexShrink: 1 },
  toastA: { color: '#fff', fontWeight: '800', fontSize: 15, textDecorationLine: 'underline' },
});
