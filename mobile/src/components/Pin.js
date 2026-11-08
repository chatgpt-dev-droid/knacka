import { memo, useEffect, useState } from 'react';
import { Marker } from 'react-native-maps';
import StatusDot from './StatusDot';

// Custom markers are rasterised once; we re-enable tracking briefly whenever the look changes.
function Pin({ lead, st, selected, onPress }) {
  const [track, setTrack] = useState(true);
  useEffect(() => { setTrack(true); const id = setTimeout(() => setTrack(false), 500); return () => clearTimeout(id); }, [st.k, st.color, selected]);
  return (
    <Marker coordinate={{ latitude: lead.lat, longitude: lead.lng }} onPress={(e) => { e.stopPropagation && e.stopPropagation(); onPress(lead); }}
      tracksViewChanges={track} anchor={{ x: 0.5, y: 0.5 }} zIndex={selected ? 999 : 1}>
      <StatusDot st={st} size={selected ? 38 : 28} selected={selected} />
    </Marker>
  );
}
export default memo(Pin);
