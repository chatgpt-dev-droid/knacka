import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { View, Text, Pressable, TextInput, FlatList, StyleSheet, Keyboard, Alert } from 'react-native';
import MapView, { Polygon, Polyline, Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useApp } from '../lib/store';
import { t } from '../lib/i18n';
import { C, R, shadow } from '../lib/theme';
import { addr, nameOf, todayStr, initials, rel } from '../lib/util';
import { startDay, endDay, isDayRunning, openAppSettings } from '../lib/tracking';
import { applyFilter } from '../lib/filter';
import Pin from '../components/Pin';
import Peek from '../components/Peek';
import Icon from '../components/Icon';
import StatusDot from '../components/StatusDot';
import { useDatePick } from '../components/DatePick';

const STHLM = { latitude: 59.2836, longitude: 18.0306, latitudeDelta: 0.06, longitudeDelta: 0.06 };
const MAX_PINS = 450;
const TRACK_COLORS = ['#2d7ff9', '#e0399a', '#e39b14', '#7b5bd6', '#1f9d55', '#d64541'];

const Tool = ({ name, onPress, active, label }) => (
  <Pressable onPress={onPress} hitSlop={4} accessibilityRole="button" accessibilityLabel={label}
    style={({ pressed }) => [st.tool, active && { backgroundColor: C.soft }, pressed && { opacity: 0.6 }]}>
    <Icon name={name} size={20} color={active ? C.accent : C.ink} />
  </Pressable>
);

export default function MapPane({ filter, focus }) {
  const { leads, S, here, user, me, isChef, live, areas, newLeadAt, showToast, users } = useApp();
  const map = useRef(null);
  const [region, setRegion] = useState(null);
  const [sel, setSel] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [sat, setSat] = useState(false);
  const [q, setQ] = useState('');
  const [searching, setSearching] = useState(false);
  const [day, setDay] = useState(false);
  const [tracks, setTracks] = useState([]);
  const centered = useRef(false);
  const picker = useDatePick();

  useEffect(() => { isDayRunning().then(setDay); }, []);
  useEffect(() => {
    if (here && !centered.current && map.current) { centered.current = true; map.current.animateToRegion({ latitude: here.lat, longitude: here.lng, latitudeDelta: 0.006, longitudeDelta: 0.006 }, 600); }
  }, [here]);
  // a lead chosen in the List or Street tab
  useEffect(() => {
    if (!focus) return;
    const l = leads.find((x) => x.id === focus.id);
    if (l && map.current) { setSel(l.id); map.current.animateToRegion({ latitude: l.lat, longitude: l.lng, latitudeDelta: 0.003, longitudeDelta: 0.003 }, 500); }
  }, [focus]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user) return undefined;
    const qy = isChef ? query(collection(db, 'tracks'), where('day', '==', todayStr())) : query(collection(db, 'tracks'), where('uid', '==', user.uid), where('day', '==', todayStr()));
    return onSnapshot(qy, (s) => setTracks(s.docs.map((d) => d.data())), () => setTracks([]));
  }, [user, isChef]);

  const lead = sel ? leads.find((l) => l.id === sel) : null;
  const shown = useMemo(() => applyFilter(leads, filter, user.uid).filter((l) => typeof l.lat === 'number' && typeof l.lng === 'number'), [leads, filter, user]);

  // zoomed out → red count bubbles, zoomed in → status pins
  const clusters = useMemo(() => {
    if (!region || region.latitudeDelta < 0.012) return null;
    const cell = region.latitudeDelta / 7, cellLo = region.longitudeDelta / 5;
    const g = new Map();
    for (const l of shown) {
      if (Math.abs(l.lat - region.latitude) > region.latitudeDelta || Math.abs(l.lng - region.longitude) > region.longitudeDelta) continue;
      const key = Math.floor(l.lat / cell) + ':' + Math.floor(l.lng / cellLo);
      const c = g.get(key) || { n: 0, la: 0, lo: 0, id: key };
      c.n++; c.la += l.lat; c.lo += l.lng; g.set(key, c);
    }
    return [...g.values()].map((c) => ({ ...c, la: c.la / c.n, lo: c.lo / c.n }));
  }, [shown, region]);

  const visible = useMemo(() => {
    if (clusters || !region) return [];
    const la = region.latitudeDelta * 0.75, lo = region.longitudeDelta * 0.75;
    let ls = shown.filter((l) => Math.abs(l.lat - region.latitude) < la && Math.abs(l.lng - region.longitude) < lo);
    if (ls.length > MAX_PINS) ls = ls.sort((a, b) => ((a.lat - region.latitude) ** 2 + (a.lng - region.longitude) ** 2) - ((b.lat - region.latitude) ** 2 + (b.lng - region.longitude) ** 2)).slice(0, MAX_PINS);
    if (sel && !ls.find((l) => l.id === sel) && lead) ls.push(lead);
    return ls;
  }, [shown, region, clusters, sel, lead]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase(); if (!s) return [];
    return leads.filter((l) => `${addr(l)} ${l.apt || ''} ${nameOf(l)} ${l.phone || ''} ${l.city || ''}`.toLowerCase().includes(s)).slice(0, 30);
  }, [q, leads]);

  const open = useCallback((l) => { setSel(l.id); setPlacing(false); }, []);
  const goTo = (l) => { Keyboard.dismiss(); setSearching(false); setQ(''); setSel(l.id); map.current?.animateToRegion({ latitude: l.lat, longitude: l.lng, latitudeDelta: 0.003, longitudeDelta: 0.003 }, 500); };
  const locate = () => { if (here) map.current?.animateToRegion({ latitude: here.lat, longitude: here.lng, latitudeDelta: 0.004, longitudeDelta: 0.004 }, 500); else showToast(t('noGps')); };
  const confirmPlace = async () => { if (!region) return; setPlacing(false); const id = await newLeadAt(region.latitude, region.longitude); setSel(id); };

  const toggleDay = async () => {
    if (day) { await endDay(); setDay(false); showToast(t('endDay') + ' ✓'); return; }
    const r = await startDay(me?.name);
    if (r === 'ok') { setDay(true); showToast(t('dayOn')); }
    else Alert.alert(t('needBgTitle'), t('needBg'), [{ text: t('cancel'), style: 'cancel' }, { text: t('openSettings'), onPress: openAppSettings }]);
  };

  const teamLive = isChef && filter.team ? live.filter((x) => x.on && x.id !== user.uid && typeof x.lat === 'number' && Date.now() - (x.t || 0) < 30 * 60000) : [];
  const colorFor = (uid) => TRACK_COLORS[Math.abs([...uid].reduce((a, c) => a + c.charCodeAt(0), 0)) % TRACK_COLORS.length];
  const nameFor = (uid) => (users.find((u) => u.id === uid) || {}).name || '';

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <MapView ref={map} style={StyleSheet.absoluteFill} provider={PROVIDER_DEFAULT} initialRegion={STHLM}
        mapType={sat ? 'hybrid' : 'standard'} showsUserLocation showsMyLocationButton={false} showsPointsOfInterest={false} showsBuildings toolbarEnabled={false}
        onRegionChangeComplete={setRegion} onPress={() => { if (sel) setSel(null); setSearching(false); Keyboard.dismiss(); }} rotateEnabled={false} pitchEnabled={false}>
        {filter.areas ? areas.filter((a) => a.poly.length > 2).map((a) => (
          <Polygon key={a.id} coordinates={a.poly.map(([la, lo]) => ({ latitude: la, longitude: lo }))} strokeColor={a.color || C.accent} fillColor={(a.color || '#0b6e7f') + '1f'} strokeWidth={2} tappable={false} />
        )) : null}
        {(filter.team ? tracks : tracks.filter((x) => x.uid === user.uid)).filter((x) => (x.points || []).length > 1).map((x) => (
          <Polyline key={x.uid} coordinates={x.points.map((p) => ({ latitude: p.lat, longitude: p.lng }))} strokeColor={colorFor(x.uid)} strokeWidth={4} lineCap="round" lineJoin="round" />
        ))}
        {clusters ? clusters.map((c) => (
          <Marker key={'c' + c.id + c.n} coordinate={{ latitude: c.la, longitude: c.lo }} anchor={{ x: 0.5, y: 0.5 }} tracksViewChanges={false}
            onPress={() => map.current?.animateToRegion({ latitude: c.la, longitude: c.lo, latitudeDelta: region.latitudeDelta / 3.5, longitudeDelta: region.longitudeDelta / 3.5 }, 400)}>
            <View style={[st.clu, c.n > 99 && { width: 44, height: 44, borderRadius: 22 }]}><Text style={st.cluT}>{c.n}</Text></View>
          </Marker>
        )) : visible.map((l) => <Pin key={l.id} lead={l} st={S.st(l.status)} selected={l.id === sel} onPress={open} />)}
        {teamLive.map((x) => (
          <Marker key={'live' + x.id} coordinate={{ latitude: x.lat, longitude: x.lng }} anchor={{ x: 0.5, y: 0.5 }} tracksViewChanges={false} title={x.name || nameFor(x.id)} description={`${t('lastSeen')} ${rel(x.t)}`}>
            <View style={[st.live, { backgroundColor: colorFor(x.id) }]}><Text style={st.liveT}>{initials(x.name || nameFor(x.id))}</Text></View>
          </Marker>
        ))}
      </MapView>

      {/* left tool column, like SalesRabbit */}
      <View style={[st.col, { left: 10 }]}>
        <Tool name="search" label={t('searchPh')} active={searching} onPress={() => setSearching((v) => !v)} />
        <Tool name="route" label={day ? t('endDay') : t('startDay')} active={day} onPress={toggleDay} />
        <Tool name="plus" label={t('placeHere')} active={placing} onPress={() => { setSel(null); setPlacing(true); }} />
      </View>
      {/* right column */}
      <View style={[st.col, { right: 10 }]}>
        <Tool name="layers" label="Satellit" active={sat} onPress={() => setSat((v) => !v)} />
        <Tool name="target" label="Min plats" onPress={locate} />
      </View>

      {searching ? (
        <View style={st.searchWrap}>
          <View style={[st.search, shadow]}>
            <Icon name="search" size={19} color={C.muted} />
            <TextInput autoFocus value={q} onChangeText={setQ} placeholder={t('searchPh')} placeholderTextColor={C.muted} style={st.searchIn} returnKeyType="search" clearButtonMode="while-editing" />
            <Pressable hitSlop={10} onPress={() => { setSearching(false); setQ(''); Keyboard.dismiss(); }}><Icon name="x" size={19} color={C.muted} /></Pressable>
          </View>
          {results.length ? (
            <View style={[st.results, shadow]}>
              <FlatList keyboardShouldPersistTaps="handled" data={results} keyExtractor={(l) => l.id} renderItem={({ item }) => (
                <Pressable onPress={() => goTo(item)} style={({ pressed }) => [st.res, pressed && { backgroundColor: C.soft }]}>
                  <StatusDot st={S.st(item.status)} size={26} />
                  <View style={{ flex: 1 }}><Text style={st.resT} numberOfLines={1}>{nameOf(item) || '–'}</Text><Text style={st.resS} numberOfLines={1}>{addr(item)}{item.city ? `, ${item.city}` : ''}</Text></View>
                </Pressable>
              )} />
            </View>
          ) : null}
        </View>
      ) : null}

      {day && !lead && !placing ? <View style={[st.dayPill, shadow]}><View style={st.dayDot} /><Text style={st.dayT}>{t('dayOn')}</Text></View> : null}

      {placing ? (
        <>
          <View pointerEvents="none" style={st.cross}><View style={st.crossPin}><Icon name="plus" size={22} color="#fff" /></View><View style={st.crossStem} /></View>
          <View style={st.placeBar}>
            <Text style={st.placeHint}>{t('placeHint')}</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable onPress={() => setPlacing(false)} style={[st.pill, st.pillGhost]}><Text style={st.pillGT}>{t('cancel')}</Text></Pressable>
              <Pressable onPress={confirmPlace} style={[st.pill, { flex: 1 }]}><Text style={st.pillT}>{t('placeHere')}</Text></Pressable>
            </View>
          </View>
        </>
      ) : null}

      {!lead && !placing ? (
        <Pressable onPress={locate} style={({ pressed }) => [st.nav, shadow, pressed && { opacity: 0.7 }]} accessibilityLabel="Min plats">
          <Icon name="nav" size={20} color={C.ink} />
        </Pressable>
      ) : null}

      {lead ? <Peek lead={lead} onClose={() => setSel(null)} picker={picker} /> : null}
      {picker.node}
    </View>
  );
}

const st = StyleSheet.create({
  col: { position: 'absolute', top: 10, backgroundColor: C.surface, borderRadius: 10, paddingVertical: 2, ...shadow },
  tool: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
  searchWrap: { position: 'absolute', top: 10, left: 60, right: 60, gap: 6 },
  search: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.surface, borderRadius: 10, paddingHorizontal: 10, height: 42 },
  searchIn: { flex: 1, fontSize: 16, color: C.ink, height: 42 },
  results: { backgroundColor: C.surface, borderRadius: 10, maxHeight: 320, overflow: 'hidden' },
  res: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10, paddingVertical: 9, borderBottomWidth: 1, borderColor: C.soft },
  resT: { fontSize: 15, fontWeight: '700', color: C.ink }, resS: { fontSize: 13, color: C.muted },
  nav: { position: 'absolute', right: 12, bottom: 16, width: 44, height: 44, borderRadius: 22, backgroundColor: C.surface, alignItems: 'center', justifyContent: 'center' },
  dayPill: { position: 'absolute', left: 12, bottom: 18, flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.surface, borderRadius: R.pill, paddingHorizontal: 14, height: 40 },
  dayDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: C.ok },
  dayT: { fontSize: 13.5, fontWeight: '700', color: C.ink },
  cross: { position: 'absolute', left: '50%', top: '50%', marginLeft: -20, marginTop: -54, alignItems: 'center' },
  crossPin: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.red, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff' },
  crossStem: { width: 3, height: 14, backgroundColor: C.red },
  placeBar: { position: 'absolute', left: 12, right: 12, bottom: 16, backgroundColor: C.surface, borderRadius: R.lg, padding: 14, gap: 10, ...shadow },
  placeHint: { fontSize: 14.5, color: C.muted, textAlign: 'center' },
  pill: { height: 48, borderRadius: R.md, backgroundColor: C.red, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  pillT: { color: '#fff', fontWeight: '800', fontSize: 16 },
  pillGhost: { backgroundColor: C.soft }, pillGT: { color: C.ink, fontWeight: '800', fontSize: 16 },
  clu: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#d9363e', alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: 'rgba(217,54,62,0.28)' },
  cluT: { color: '#fff', fontWeight: '800', fontSize: 12.5 },
  live: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff' },
  liveT: { color: '#fff', fontWeight: '900', fontSize: 12 },
});
