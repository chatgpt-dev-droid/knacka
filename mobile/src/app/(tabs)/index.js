import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { View, Text, Pressable, TextInput, FlatList, StyleSheet, Keyboard, Alert } from 'react-native';
import MapView, { Polygon, Polyline, Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useApp } from '../../lib/store';
import { t } from '../../lib/i18n';
import { C, R, shadow } from '../../lib/theme';
import { addr, nameOf, todayStr, initials, rel } from '../../lib/util';
import { startDay, endDay, isDayRunning, openAppSettings } from '../../lib/tracking';
import Pin from '../../components/Pin';
import Peek from '../../components/Peek';
import Icon from '../../components/Icon';
import StatusDot from '../../components/StatusDot';
import { IconBtn } from '../../components/ui';
import { useDatePick } from '../../components/DatePick';

const STHLM = { latitude: 59.3293, longitude: 18.0686, latitudeDelta: 0.03, longitudeDelta: 0.03 };
const MAX_PINS = 450;
const TRACK_COLORS = ['#2d7ff9', '#e0399a', '#e39b14', '#7b5bd6', '#1f9d55', '#d64541'];

export default function MapScreen() {
  const ins = useSafeAreaInsets();
  const { leads, S, here, user, me, isChef, live, areas, newLeadAt, showToast, users } = useApp();
  const map = useRef(null);
  const [region, setRegion] = useState(null);
  const [sel, setSel] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [sat, setSat] = useState(false);
  const [mine, setMine] = useState(false);
  const [q, setQ] = useState('');
  const [searching, setSearching] = useState(false);
  const [day, setDay] = useState(false);
  const [showTeam, setShowTeam] = useState(true);
  const [tracks, setTracks] = useState([]);
  const centered = useRef(false);
  const picker = useDatePick();

  useEffect(() => { isDayRunning().then(setDay); }, []);

  // first fix → centre on me
  useEffect(() => {
    if (here && !centered.current && map.current) { centered.current = true; map.current.animateToRegion({ latitude: here.lat, longitude: here.lng, latitudeDelta: 0.006, longitudeDelta: 0.006 }, 600); }
  }, [here]);

  // today's routes (chef: everyone, seller: own)
  useEffect(() => {
    if (!user) return undefined;
    const qy = isChef ? query(collection(db, 'tracks'), where('day', '==', todayStr())) : query(collection(db, 'tracks'), where('uid', '==', user.uid), where('day', '==', todayStr()));
    return onSnapshot(qy, (s) => setTracks(s.docs.map((d) => d.data())), () => setTracks([]));
  }, [user, isChef]);

  const lead = sel ? leads.find((l) => l.id === sel) : null;

  const visible = useMemo(() => {
    let ls = leads.filter((l) => typeof l.lat === 'number' && typeof l.lng === 'number');
    if (mine) ls = ls.filter((l) => l.owner === user.uid);
    if (region) {
      const pad = 0.25;
      const la = region.latitudeDelta * (0.5 + pad), lo = region.longitudeDelta * (0.5 + pad);
      ls = ls.filter((l) => Math.abs(l.lat - region.latitude) < la && Math.abs(l.lng - region.longitude) < lo);
    }
    if (ls.length > MAX_PINS && region) ls = ls.sort((a, b) => ((a.lat - region.latitude) ** 2 + (a.lng - region.longitude) ** 2) - ((b.lat - region.latitude) ** 2 + (b.lng - region.longitude) ** 2)).slice(0, MAX_PINS);
    return ls;
  }, [leads, region, mine, user]);

  const today = todayStr();
  const stats = useMemo(() => {
    let k = 0, ld = 0, sa = 0;
    for (const l of leads) for (const h of l.hist || []) {
      if (h.rep !== user.uid || !h.s) continue;
      const d = new Date(h.t); const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (ds !== today) continue;
      k++; if (S.isLead(h.s)) ld++; if (S.isSale(h.s)) sa++;
    }
    return { k, ld, sa };
  }, [leads, user, S, today]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase(); if (!s) return [];
    return leads.filter((l) => `${addr(l)} ${l.apt || ''} ${nameOf(l)} ${l.phone || ''} ${l.city || ''}`.toLowerCase().includes(s)).slice(0, 30);
  }, [q, leads]);

  const open = useCallback((l) => { setSel(l.id); setPlacing(false); }, []);
  const goTo = (l) => { Keyboard.dismiss(); setSearching(false); setQ(''); setSel(l.id); map.current?.animateToRegion({ latitude: l.lat, longitude: l.lng, latitudeDelta: 0.003, longitudeDelta: 0.003 }, 500); };
  const locate = () => { if (here) map.current?.animateToRegion({ latitude: here.lat, longitude: here.lng, latitudeDelta: 0.004, longitudeDelta: 0.004 }, 500); };

  const confirmPlace = async () => {
    if (!region) return;
    setPlacing(false);
    const id = await newLeadAt(region.latitude, region.longitude);
    setSel(id);
  };

  const toggleDay = async () => {
    if (day) { await endDay(); setDay(false); showToast(t('endDay') + ' ✓'); return; }
    const r = await startDay(me?.name);
    if (r === 'ok') { setDay(true); showToast(t('dayOn')); }
    else if (r === 'needAlways') Alert.alert(t('needBgTitle'), t('needBg'), [{ text: t('cancel'), style: 'cancel' }, { text: t('openSettings'), onPress: openAppSettings }]);
    else Alert.alert(t('needBgTitle'), t('needBg'), [{ text: t('cancel'), style: 'cancel' }, { text: t('openSettings'), onPress: openAppSettings }]);
  };

  const teamLive = isChef && showTeam ? live.filter((x) => x.on && x.id !== user.uid && typeof x.lat === 'number' && Date.now() - (x.t || 0) < 30 * 60000) : [];
  const colorFor = (uid) => TRACK_COLORS[Math.abs([...uid].reduce((a, c) => a + c.charCodeAt(0), 0)) % TRACK_COLORS.length];
  const nameFor = (uid) => (users.find((u) => u.id === uid) || {}).name || '';

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <MapView ref={map} style={StyleSheet.absoluteFill} provider={PROVIDER_DEFAULT} initialRegion={STHLM}
        mapType={sat ? 'hybrid' : 'standard'} showsUserLocation showsMyLocationButton={false} showsPointsOfInterest={false} showsBuildings toolbarEnabled={false}
        onRegionChangeComplete={setRegion} onPress={() => { if (sel) setSel(null); setSearching(false); Keyboard.dismiss(); }} rotateEnabled={false} pitchEnabled={false}>
        {areas.filter((a) => a.poly.length > 2).map((a) => (
          <Polygon key={a.id} coordinates={a.poly.map(([la, lo]) => ({ latitude: la, longitude: lo }))} strokeColor={a.color || C.accent} fillColor={(a.color || '#0b6e7f') + '1f'} strokeWidth={2} tappable={false} />
        ))}
        {(showTeam ? tracks : tracks.filter((x) => x.uid === user.uid)).filter((x) => (x.points || []).length > 1).map((x) => (
          <Polyline key={x.uid} coordinates={x.points.map((p) => ({ latitude: p.lat, longitude: p.lng }))} strokeColor={colorFor(x.uid)} strokeWidth={4} lineCap="round" lineJoin="round" />
        ))}
        {visible.map((l) => <Pin key={l.id} lead={l} st={S.st(l.status)} selected={l.id === sel} onPress={open} />)}
        {teamLive.map((x) => (
          <Marker key={'live' + x.id} coordinate={{ latitude: x.lat, longitude: x.lng }} anchor={{ x: 0.5, y: 0.5 }} tracksViewChanges={false} title={x.name || nameFor(x.id)} description={`${t('lastSeen')} ${rel(x.t)}`}>
            <View style={[st.live, { backgroundColor: colorFor(x.id) }]}><Text style={st.liveT}>{initials(x.name || nameFor(x.id))}</Text></View>
          </Marker>
        ))}
      </MapView>

      {/* top: search + today */}
      <View style={[st.top, { paddingTop: ins.top + 8 }]} pointerEvents="box-none">
        <View style={[st.search, shadow]}>
          <Icon name="search" size={20} color={C.muted} />
          <TextInput value={q} onChangeText={(v) => { setQ(v); setSearching(true); }} onFocus={() => setSearching(true)} placeholder={t('searchPh')} placeholderTextColor={C.muted} style={st.searchIn} returnKeyType="search" clearButtonMode="while-editing" />
        </View>
        {searching && results.length ? (
          <View style={[st.results, shadow]}>
            <FlatList keyboardShouldPersistTaps="handled" data={results} keyExtractor={(l) => l.id} renderItem={({ item }) => (
              <Pressable onPress={() => goTo(item)} style={({ pressed }) => [st.res, pressed && { backgroundColor: C.soft }]}>
                <StatusDot st={S.st(item.status)} size={26} />
                <View style={{ flex: 1 }}><Text style={st.resT} numberOfLines={1}>{addr(item)}{item.apt ? `, ${item.apt}` : ''}</Text>{nameOf(item) ? <Text style={st.resS}>{nameOf(item)}</Text> : null}</View>
              </Pressable>
            )} />
          </View>
        ) : (
          <View style={st.statRow} pointerEvents="none">
            <Stat n={stats.k} l={t('knocks')} /><Stat n={stats.ld} l={t('leadsW')} /><Stat n={stats.sa} l={t('sales')} />
          </View>
        )}
      </View>

      {/* right rail */}
      {!searching ? (
        <View style={[st.rail, { top: ins.top + 116 }]}>
          <IconBtn name="layers" label="Satellit" active={sat} onPress={() => setSat((v) => !v)} />
          <IconBtn name="target" label="Min plats" onPress={locate} />
          <IconBtn name="filter" label={t('mine')} active={mine} onPress={() => { setMine((v) => !v); showToast(!mine ? t('mine') : t('all')); }} />
          {isChef ? <IconBtn name="users" label={t('teamLive')} active={showTeam} badge={live.filter((x) => x.on && x.id !== user.uid && Date.now() - (x.t || 0) < 30 * 60000).length || null} onPress={() => setShowTeam((v) => !v)} /> : null}
        </View>
      ) : null}

      {/* placing a new pin */}
      {placing ? (
        <>
          <View pointerEvents="none" style={st.cross}><View style={st.crossPin}><Icon name="plus" size={22} color="#fff" /></View><View style={st.crossStem} /></View>
          <View style={[st.placeBar, { bottom: 16 }]}>
            <Text style={st.placeHint}>{t('placeHint')}</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable onPress={() => setPlacing(false)} style={[st.pill, st.pillGhost]}><Text style={st.pillGT}>{t('cancel')}</Text></Pressable>
              <Pressable onPress={confirmPlace} style={[st.pill, { flex: 1 }]}><Text style={st.pillT}>{t('placeHere')}</Text></Pressable>
            </View>
          </View>
        </>
      ) : null}

      {/* bottom: day + add */}
      {!lead && !placing ? (
        <View style={st.bottom} pointerEvents="box-none">
          <Pressable onPress={toggleDay} style={({ pressed }) => [st.day, shadow, day && st.dayOn, pressed && { transform: [{ scale: 0.97 }] }]} accessibilityRole="button" accessibilityLabel={day ? t('endDay') : t('startDay')}>
            <View style={[st.dayDot, day && { backgroundColor: '#fff' }]} />
            <Text style={[st.dayT, day && { color: '#fff' }]}>{day ? t('endDay') : t('startDay')}</Text>
          </Pressable>
          <Pressable onPress={() => { setSel(null); setPlacing(true); }} style={({ pressed }) => [st.fab, shadow, pressed && { transform: [{ scale: 0.94 }] }]} accessibilityRole="button" accessibilityLabel={t('placeHere')}>
            <Icon name="plus" size={30} color="#fff" width={3} />
          </Pressable>
        </View>
      ) : null}

      {lead ? <Peek lead={lead} onClose={() => setSel(null)} picker={picker} bottom={0} /> : null}
      {picker.node}
    </View>
  );
}

const Stat = ({ n, l }) => (<View style={[st.stat, shadow]}><Text style={st.statN}>{n}</Text><Text style={st.statL}>{l}</Text></View>);

const st = StyleSheet.create({
  top: { position: 'absolute', left: 0, right: 0, paddingHorizontal: 12, gap: 8 },
  search: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.surface, borderRadius: R.md, paddingHorizontal: 12, height: 48 },
  searchIn: { flex: 1, fontSize: 16, color: C.ink, height: 48 },
  results: { backgroundColor: C.surface, borderRadius: R.md, maxHeight: 340, overflow: 'hidden' },
  res: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderColor: C.soft },
  resT: { fontSize: 15, fontWeight: '700', color: C.ink }, resS: { fontSize: 13, color: C.muted },
  statRow: { flexDirection: 'row', gap: 8 },
  stat: { flexDirection: 'row', alignItems: 'baseline', gap: 5, backgroundColor: C.surface, borderRadius: R.pill, paddingHorizontal: 12, paddingVertical: 7 },
  statN: { fontSize: 16, fontWeight: '900', color: C.ink, fontVariant: ['tabular-nums'] }, statL: { fontSize: 12.5, fontWeight: '700', color: C.muted },
  rail: { position: 'absolute', right: 12, gap: 10 },
  bottom: { position: 'absolute', left: 12, right: 12, bottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  day: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: C.surface, borderRadius: R.pill, height: 52, paddingHorizontal: 18 },
  dayOn: { backgroundColor: C.ok },
  dayDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.ok },
  dayT: { fontSize: 16, fontWeight: '800', color: C.ink },
  fab: { width: 64, height: 64, borderRadius: 32, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' },
  cross: { position: 'absolute', left: '50%', top: '50%', marginLeft: -20, marginTop: -54, alignItems: 'center' },
  crossPin: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff' },
  crossStem: { width: 3, height: 14, backgroundColor: C.accent },
  placeBar: { position: 'absolute', left: 12, right: 12, backgroundColor: C.surface, borderRadius: R.lg, padding: 14, gap: 10, ...shadow },
  placeHint: { fontSize: 14.5, color: C.muted, textAlign: 'center' },
  pill: { height: 50, borderRadius: R.md, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  pillT: { color: '#fff', fontWeight: '800', fontSize: 16 },
  pillGhost: { backgroundColor: C.soft }, pillGT: { color: C.ink, fontWeight: '800', fontSize: 16 },
  live: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff' },
  liveT: { color: '#fff', fontWeight: '900', fontSize: 12 },
});
