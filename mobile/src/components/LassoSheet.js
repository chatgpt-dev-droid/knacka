import { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Alert, StyleSheet } from 'react-native';
import { collection, doc, writeBatch, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useApp } from '../lib/store';
import { t } from '../lib/i18n';
import { C, R, shadow } from '../lib/theme';
import { orderStops, openRoute } from '../lib/links';
import Icon from './Icon';
import StatusDot from './StatusDot';

const COLORS = ['#141414', '#5b3cc4', '#1d6ff2', '#d9660b', '#f5c400', '#4cd137', '#1cc7b1', '#e0122d', '#e0128c'];

// "Lasso Options": what to do with the leads inside the drawn shape
export default function LassoSheet({ leads, poly, onClose, onRoute }) {
  const { S, user, team, isChef, here, showToast } = useApp();
  const [off, setOff] = useState([]); // statuses switched off
  const [view, setView] = useState('main'); // main | area | assign | status | areaAssign
  const [title, setTitle] = useState('');
  const [areaRep, setAreaRep] = useState(null);
  const [color, setColor] = useState(COLORS[7]);
  const [pick, setPick] = useState(null);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);

  const counts = useMemo(() => { const c = {}; for (const l of leads) { const k = l.status || 'ny'; c[k] = (c[k] || 0) + 1; } return c; }, [leads]);
  const chosen = useMemo(() => leads.filter((l) => !off.includes(l.status || 'ny')), [leads, off]);
  const users = team.filter((u) => (u.name || '').toLowerCase().includes(q.trim().toLowerCase()));

  const batch = async (fn, okMsg) => {
    if (!chosen.length || busy) return;
    setBusy(true);
    try {
      for (let i = 0; i < chosen.length; i += 400) { const b = writeBatch(db); chosen.slice(i, i + 400).forEach((l) => fn(b, doc(db, 'leads', l.id), l)); await b.commit(); }
      showToast(okMsg); onClose();
    } catch (e) { showToast(t('noPerm')); }
    setBusy(false);
  };
  const assign = () => pick && batch((b, ref) => b.set(ref, { owner: pick, hist: arrayUnion({ t: Date.now(), rep: user.uid, type: 'assign', to: pick }), updated: Date.now() }, { merge: true }), `${chosen.length} ${t('leadsW')} ✓`);
  const change = () => pick && batch((b, ref) => b.set(ref, { status: pick, hist: arrayUnion({ t: Date.now(), rep: user.uid, s: pick }), updated: Date.now() }, { merge: true }), `${chosen.length} ${t('leadsW')} ✓`);
  const del = () => {
    const mine = isChef ? chosen : chosen.filter((l) => l.owner === user.uid);
    if (!mine.length) return showToast(t('noPerm'));
    Alert.alert(t('delTitle'), t('delMany').replace('{n}', mine.length), [{ text: t('no'), style: 'cancel' }, { text: t('yes'), style: 'destructive', onPress: async () => {
      try { for (let i = 0; i < mine.length; i += 400) { const b = writeBatch(db); mine.slice(i, i + 400).forEach((l) => b.delete(doc(db, 'leads', l.id))); await b.commit(); } showToast(`${mine.length} ✓`); onClose(); } catch (e) { showToast(t('noPerm')); }
    } }]);
  };
  const route = () => {
    if (!chosen.length) return;
    const stops = orderStops(chosen.filter((l) => typeof l.lat === 'number'), here);
    onRoute(stops);
    Alert.alert(t('routeMade'), `${stops.length} ${t('routeStops')}`, [{ text: t('done') }, { text: t('openMaps'), onPress: () => openRoute(stops.slice(0, 10), here) }]);
  };
  const createArea = async () => {
    try {
      await setDoc(doc(collection(db, 'areas')), { name: title.trim() || 'Untitled', rep: areaRep, color, poly: poly.map((p) => ({ lat: p.latitude, lng: p.longitude })), created: Date.now() });
      showToast(t('saved')); onClose();
    } catch (e) { showToast(t('noPerm')); }
  };

  const Act = ({ icon, label, onPress, on = true }) => (
    <Pressable onPress={onPress} disabled={!on} style={[st.act, !on && { opacity: 0.35 }]}>
      <View style={st.actI}><Icon name={icon} size={22} color={C.ink} /></View><Text style={st.actT}>{label}</Text>
    </Pressable>
  );
  const UserList = ({ value, onPick }) => (
    <>
      <View style={st.search}><Icon name="search" size={18} color={C.red} /><TextInput value={q} onChangeText={setQ} placeholder={t('searchPh')} placeholderTextColor={C.muted} style={{ flex: 1, fontSize: 16, color: C.ink }} /></View>
      <ScrollView style={{ maxHeight: 260 }} keyboardShouldPersistTaps="handled">
        {users.map((u) => (
          <Pressable key={u.id} onPress={() => onPick(u.id)} style={st.uRow}>
            <View style={{ flex: 1 }}><Text style={st.uN}>{u.name}</Text><Text style={st.uR}>{u.role === 'chef' ? 'Owner' : t('rep')}</Text></View>
            {value === u.id ? <Icon name="check" size={20} color={C.red} /> : null}
          </Pressable>
        ))}
      </ScrollView>
    </>
  );

  return (
    <View style={[st.sheet, shadow]}>
      {view === 'area' || view === 'areaAssign' ? (
        <>
          <View style={st.head}>
            <Pressable hitSlop={12} onPress={() => setView('main')}><Icon name="x" size={20} color={C.ink} /></Pressable>
            <Text style={st.headT}>{t('newArea')}</Text>
            <Pressable onPress={createArea} style={st.create}><Text style={st.createT}>{t('create')}</Text></Pressable>
          </View>
          {view === 'areaAssign' ? (
            <>
              <View style={st.sub}><Pressable hitSlop={10} onPress={() => setView('area')}><Text style={st.red}>{t('cancel')}</Text></Pressable><Text style={st.subT}>{t('assignTo')}</Text><Pressable hitSlop={10} onPress={() => setView('area')}><Text style={[st.red, { fontWeight: '800' }]}>{t('done')}</Text></Pressable></View>
              {UserList({ value: areaRep, onPick: setAreaRep })}
            </>
          ) : (
            <View style={{ paddingHorizontal: 16, paddingBottom: 14, gap: 12 }}>
              <View><Text style={st.lab}>{t('titleOpt')}</Text><TextInput value={title} onChangeText={setTitle} placeholder="Untitled" placeholderTextColor={C.ink} style={st.val} /></View>
              <View><Text style={st.lab}>{t('team')}</Text><Text style={st.val}>Fiskaren</Text></View>
              <Pressable onPress={() => setView('areaAssign')}><Text style={st.lab}>{t('assignedTo')}</Text><Text style={[st.val, !areaRep && { color: C.muted }]}>{areaRep ? (team.find((u) => u.id === areaRep) || {}).name : 'None'}</Text></Pressable>
              <View><Text style={st.lab}>{t('color')}</Text>
                <View style={{ flexDirection: 'row', gap: 9, marginTop: 6 }}>{COLORS.map((c) => <Pressable key={c} onPress={() => setColor(c)} style={[st.col, { backgroundColor: c }, color === c && st.colOn]} />)}</View>
              </View>
            </View>
          )}
        </>
      ) : (
        <>
          <View style={{ paddingHorizontal: 16, paddingTop: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={st.title}>{t('lassoOpts')}</Text><Pressable hitSlop={12} onPress={onClose}><Icon name="x" size={20} color={C.muted} /></Pressable></View>
            <Text style={st.count}>{chosen.length} {t('leadsCap')}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 8 }}>
            {S.list.map((x) => {
              const n = counts[x.k] || 0; const on = !off.includes(x.k) && n > 0;
              return (
                <Pressable key={x.k} onPress={() => setOff(off.includes(x.k) ? off.filter((k) => k !== x.k) : [...off, x.k])} style={{ width: 48, alignItems: 'center', gap: 4 }} accessibilityLabel={x.label} accessibilityState={{ selected: on }}>
                  <View style={[st.ring, on && { borderColor: C.ink }, !n && { opacity: 0.45 }]}><StatusDot st={x} size={34} /></View>
                  <Text style={[st.n, !on && { color: '#b5b5b5' }]}>{on ? n : 0}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
          {view === 'assign' ? (
            <>
              <View style={st.sub}><Pressable hitSlop={10} onPress={() => { setView('main'); setPick(null); }}><Text style={[st.red, { fontWeight: '800' }]}>{t('cancel')}</Text></Pressable><Text /><Pressable hitSlop={10} onPress={assign} disabled={!pick}><Text style={[st.red, { fontWeight: '800' }, !pick && { opacity: 0.4 }]}>{t('done')}</Text></Pressable></View>
              {UserList({ value: pick, onPick: setPick })}
            </>
          ) : view === 'status' ? (
            <>
              <View style={st.sub}><Pressable hitSlop={10} onPress={() => { setView('main'); setPick(null); }}><Icon name="chevL" size={22} color={C.red} /></Pressable><Text style={st.subT}>{t('changeStatus')}</Text><Pressable hitSlop={10} onPress={change} disabled={!pick}><Text style={[st.red, !pick && { opacity: 0.4 }]}>{t('update')}</Text></Pressable></View>
              <ScrollView style={{ maxHeight: 300 }}>
                {S.list.map((x) => (
                  <Pressable key={x.k} onPress={() => setPick(x.k)} style={st.sRow}>
                    <StatusDot st={x} size={34} />
                    <View style={{ flex: 1 }}><Text style={st.uN}>{x.label}</Text><Text style={st.uR}>{x.short || x.label}</Text></View>
                    <View style={[st.radio, pick === x.k && { backgroundColor: C.red }]} />
                  </Pressable>
                ))}
              </ScrollView>
            </>
          ) : (
            <View style={st.acts}>
              <Act icon="share" label={t('createArea')} onPress={() => setView('area')} />
              <Act icon="users" label={t('assignLeads')} on={!!chosen.length} onPress={() => { setPick(null); setView('assign'); }} />
              <Act icon="star" label={t('changeStatus2')} on={!!chosen.length} onPress={() => { setPick(null); setView('status'); }} />
              <Act icon="route" label={t('createRoute')} on={!!chosen.length} onPress={route} />
              <Act icon="trash" label={t('deleteLeads')} on={!!chosen.length} onPress={del} />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const st = StyleSheet.create({
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: C.surface, borderTopLeftRadius: R.lg, borderTopRightRadius: R.lg, paddingBottom: 14 },
  title: { fontSize: 16, fontWeight: '800', color: C.ink }, count: { fontSize: 13, color: C.ink, marginTop: 6 },
  ring: { borderWidth: 2.5, borderColor: 'transparent', borderRadius: 22, padding: 1.5 }, n: { fontSize: 14, fontWeight: '800', color: C.ink },
  acts: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 6, paddingTop: 6 },
  act: { width: 68, alignItems: 'center', gap: 8 }, actI: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#efefef', alignItems: 'center', justifyContent: 'center' },
  actT: { fontSize: 13, color: C.ink, textAlign: 'center', lineHeight: 18 },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 }, headT: { fontSize: 16, fontWeight: '700', color: C.ink },
  create: { backgroundColor: C.red, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 7 }, createT: { color: '#fff', fontWeight: '700', fontSize: 14 },
  lab: { fontSize: 11.5, color: C.muted }, val: { fontSize: 16, color: C.ink, paddingVertical: 4 },
  col: { width: 28, height: 28, borderRadius: 14 }, colOn: { borderWidth: 3, borderColor: '#bbb' },
  sub: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 }, subT: { fontSize: 16, fontWeight: '700', color: C.ink },
  red: { color: C.red, fontSize: 15 },
  search: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 8, paddingHorizontal: 14, height: 40, borderRadius: 20, backgroundColor: '#e3e3e3' },
  uRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderColor: '#ececec' },
  uN: { fontSize: 16, color: C.ink }, uR: { fontSize: 13, color: C.muted, marginTop: 3 },
  sRow: { flexDirection: 'row', alignItems: 'center', gap: 22, paddingHorizontal: 22, paddingVertical: 9, borderBottomWidth: 1, borderColor: '#ececec' },
  radio: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: C.red },
});
