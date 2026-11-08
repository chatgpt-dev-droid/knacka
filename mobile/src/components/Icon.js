import Svg, { Path, Circle, Rect } from 'react-native-svg';

const P = {
  crown: ['M3.5 17.5h17', 'M4.5 7.5 8.5 11 12 5l3.5 6 4-3.5-1.6 9.5H6.1z'],
  star: ['m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z'],
  bag: ['M9.2 4.5h5.6l-1.4 2.6h-2.8z', 'M8.6 7.1h6.8c2.6 2.2 4.1 5 4.1 7.8 0 2.9-2.4 4.6-7.5 4.6s-7.5-1.7-7.5-4.6c0-2.8 1.5-5.6 4.1-7.8z', 'M13.8 11.3c-.4-.6-1-.9-1.8-.9-1.1 0-1.8.6-1.8 1.4 0 1.9 3.7.9 3.7 2.8 0 .8-.8 1.4-1.9 1.4-.8 0-1.5-.3-1.9-.9M12 9.6v.8M12 16v.8'],
  check: ['m5 12.5 4.5 4.5L19 7.5'],
  home: ['M4 11 12 4.5l8 6.5', 'M6 9.5V19.5h12V9.5', 'M10 19.5v-5h4v5'],
  refresh: ['M19.5 12a7.5 7.5 0 1 1-2.2-5.3', 'M19.5 4.5v4.5H15'],
  alert: ['M12 5.5v8.5', 'M12 18.4v.1'],
  lock: ['M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5'],
  x: ['M7 7l10 10M17 7 7 17'], minus: ['M6.5 12h11'],
  clock: ['M12 8v4.2l2.8 1.8'],
  door: ['M6.5 20V4.5h9V20', 'M4.5 20h15', 'M12.6 12.3v.1'],
  heart: ['M12 19.5s-7-4.3-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.1c0 5.1-7 9.4-7 9.4z'],
  fish: ['M3.5 12c3-4.5 9-6 13.5-1.5L20.5 7v10l-3.5-3.5C12.5 18 6.5 16.5 3.5 12z', 'M8 11.2v.1'],
  phone: ['M20.5 16.4v2.6a1.8 1.8 0 0 1-2 1.8A17.6 17.6 0 0 1 3.2 5.5a1.8 1.8 0 0 1 1.8-2h2.6a1.8 1.8 0 0 1 1.8 1.5c.1.8.3 1.6.6 2.4a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14.4 14.4 0 0 0 5.1 5.1l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.4.6a1.8 1.8 0 0 1 1.5 1.8z'],
  sms: ['M20 15.5a1.8 1.8 0 0 1-1.8 1.8H8l-4 3.2V5.8A1.8 1.8 0 0 1 5.8 4h12.4A1.8 1.8 0 0 1 20 5.8z', 'M8 9.5h8M8 12.8h5'],
  mail: ['m4 7 8 6 8-6'], nav: ['m3.5 11 17-7.5-7.5 17-2-7.5z'],
  cal: ['M4 10h16M8.5 3.5v4M15.5 3.5v4'], note: ['M5 4.5h10.5l3.5 3.5v11.5H5z', 'M8.5 11h7M8.5 14.5h5'],
  plus: ['M12 5v14M5 12h14'], back: ['m15 5-7 7 7 7'], search: ['m20 20-4.2-4.2'],
  route: ['M8.2 18h7.3a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7H15.8'],
  layers: ['m12 3.5 8.5 4.5-8.5 4.5L3.5 8z', 'm3.5 12 8.5 4.5 8.5-4.5', 'm3.5 16 8.5 4.5 8.5-4.5'],
  target: ['M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5'], filter: ['M4 6.5h16M7 12h10M10 17.5h4'],
  trash: ['M5 7h14M9.5 7V4.5h5V7M7 7l1 12.5h8L17 7'], play: ['M8 5.5v13l10-6.5z'], stop: [],
  users: ['M3 19.5a6 6 0 0 1 12 0', 'M15.5 14.2a5 5 0 0 1 5.5 5.3'], locoff: ['M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z', 'M12 7.5v3.5', 'M12 13.6v.1'],
  map: ['M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z', 'M9 4v14M15 6v14'], list: ['M8 6h13M8 12h13M8 18h13', 'M3.5 6v.1M3.5 12v.1M3.5 18v.1'],
  trophy: ['M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z', 'M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3'], more: ['M5 12v.1M12 12v.1M19 12v.1'],
};
const EXTRA = {
  lock: (c, w) => <Rect x="5.5" y="10.5" width="13" height="9" rx="2" stroke={c} strokeWidth={w} fill="none" />,
  clock: (c, w) => <Circle cx="12" cy="12" r="7.5" stroke={c} strokeWidth={w} fill="none" />,
  mail: (c, w) => <Rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke={c} strokeWidth={w} fill="none" />,
  cal: (c, w) => <Rect x="4" y="5.5" width="16" height="14.5" rx="2" stroke={c} strokeWidth={w} fill="none" />,
  search: (c, w) => <Circle cx="11" cy="11" r="6.5" stroke={c} strokeWidth={w} fill="none" />,
  route: (c, w) => <><Circle cx="6" cy="18" r="2.2" stroke={c} strokeWidth={w} fill="none" /><Circle cx="18" cy="6" r="2.2" stroke={c} strokeWidth={w} fill="none" /></>,
  target: (c, w) => <><Circle cx="12" cy="12" r="7.5" stroke={c} strokeWidth={w} fill="none" /><Circle cx="12" cy="12" r="2.6" stroke={c} strokeWidth={w} fill="none" /></>,
  stop: (c) => <Rect x="6.5" y="6.5" width="11" height="11" rx="2" fill={c} />,
  users: (c, w) => <><Circle cx="9" cy="8" r="3.2" stroke={c} strokeWidth={w} fill="none" /><Circle cx="17" cy="9" r="2.5" stroke={c} strokeWidth={w} fill="none" /></>,
};
export default function Icon({ name, size = 22, color = '#10252d', width = 2.2 }) {
  const paths = P[name] || [];
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {EXTRA[name] ? EXTRA[name](color, width) : null}
      {paths.map((d, i) => <Path key={i} d={d} stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" fill={name === 'play' ? color : 'none'} />)}
    </Svg>
  );
}
export const ICON_NAMES = Object.keys(P);
