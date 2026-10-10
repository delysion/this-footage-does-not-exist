export type Reconstruction = 'romance' | 'security' | 'revolution' | 'commerce';

export const reconstructions: { id: Reconstruction; name: string; claim: string; imprint: string }[] = [
  { id: 'romance', name: 'ROMANCE', claim: 'They almost touched.', imprint: 'A MOMENT TO KEEP' },
  { id: 'security', name: 'SECURITY', claim: 'Contact imminent.', imprint: 'SIMULATED CONFIDENCE / 98.4%' },
  { id: 'revolution', name: 'REVOLUTION', claim: 'The first gesture.', imprint: 'IT BEGAN HERE' },
  { id: 'commerce', name: 'COMMERCE', claim: 'The moment is yours.', imprint: 'MEMORY No. 011 / RESERVE NOW' },
];

export const eventTime = (seconds: number) => {
  const centiseconds = Math.min(1100, Math.max(0, Math.floor(seconds * 100)));
  return `02:17:${String(8 + Math.floor(centiseconds / 100)).padStart(2, '0')}.${String(centiseconds % 100).padStart(2, '0')}`;
};

const palettes = {
  romance: { room: '#2b1716', light: '#c35a4c', floor: '#140b0c', figure: '#170d10', rim: '#e6a992', text: '#f1c0aa' },
  security: { room: '#15212a', light: '#809fb2', floor: '#081118', figure: '#071017', rim: '#a7c0cd', text: '#b9d6e3' },
  revolution: { room: '#342315', light: '#d89b4d', floor: '#130e0c', figure: '#150f0d', rim: '#e5bd80', text: '#efcf9c' },
  commerce: { room: '#29251f', light: '#d0ba89', floor: '#0d0c0b', figure: '#15130f', rim: '#e4d4aa', text: '#eaddbd' },
};

/** The positions, doorway, damaged shoe and central gesture are identical in all four cuts. */
export function SceneArtwork({ cut, seconds, reducedMotion = false }: { cut: Reconstruction; seconds: number; reducedMotion?: boolean }) {
  const p = palettes[cut];
  const t = Math.min(11, Math.max(0, seconds));
  const reach = Math.min(1, Math.max(0, (t - 1.2) / 6.2));
  const drift = reducedMotion ? 0 : Math.sin(t * 0.7) * 1.7;
  const light = Math.min(1, Math.max(0, (t - 4) / 4));
  const camera = cut === 'romance' ? 1.055 + t * .003 : cut === 'security' ? 1.07 : cut === 'revolution' ? 1.015 - t * .002 : 1.065 + t * .001;
  const dx = cut === 'security' ? -8 + Math.floor(t / 2.75) * 3 : cut === 'romance' ? -6 : cut === 'revolution' ? 0 : 4;
  const dy = cut === 'revolution' ? -11 : cut === 'commerce' ? -7 : 0;
  const transform = `translate(${600 - 600 * camera + dx} ${337.5 - 337.5 * camera + dy}) scale(${camera})`;
  const figureA = -reach * 19;
  const figureB = reach * 20;
  const handA = 547 + reach * 36;
  const handB = 667 - reach * 39;
  return <svg className="scene-art" style={{position:'absolute',inset:0,width:'100%',height:'100%'}} viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${cut} reconstruction: the same red doorway, two figures reaching toward each other and a damaged black shoe`}>
    <defs>
      <linearGradient id="scene-room" x2="1" y2="0"><stop stopColor="#060606"/><stop offset=".48" stopColor={p.room}/><stop offset="1" stopColor="#060708"/></linearGradient>
      <radialGradient id="scene-light"><stop stopColor={p.light} stopOpacity={cut === 'security' ? '.38' : '.58'}/><stop offset="1" stopColor={p.light} stopOpacity="0"/></radialGradient>
      <linearGradient id="door-red" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#5b1817"/><stop offset=".5" stopColor="#b84636"/><stop offset="1" stopColor="#4e1719"/></linearGradient>
      <linearGradient id="floor-light" x2="0" y2="1"><stop stopColor={p.light} stopOpacity=".15"/><stop offset="1" stopColor={p.light} stopOpacity="0"/></linearGradient>
      <filter id="scene-blur"><feGaussianBlur stdDeviation="22"/></filter>
      <filter id="scene-grain"><feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    </defs>
    <rect width="1200" height="675" fill="url(#scene-room)"/>
    <g transform={transform}>
      <ellipse cx="609" cy="319" rx="335" ry="275" fill="url(#scene-light)" filter="url(#scene-blur)"/>
      <path d="M0 515 316 468 510 488 703 477 921 462 1200 519v156H0Z" fill={p.floor}/>
      <path d="M0 521 510 488 703 477 1200 522" fill="none" stroke={p.rim} strokeOpacity=".15" strokeWidth="1"/>
      {cut === 'revolution' && <g opacity=".8" fill="#1b120d" stroke={p.rim} strokeOpacity=".26" strokeWidth="2">
        <path d="M0 530q31-81 62 0 32-106 66 0 35-77 70 0 33-97 68 0 33-70 67 0 35-114 70 0 36-78 71 0 32-103 67 0 35-76 70 0 36-118 70 0 32-88 65 0 36-106 72 0 37-83 71 0 33-105 67 0 35-72 67 0 32-120 65 0 38-87 72 0 32-91 65 0v145H0Z"/>
        <path d="M130 530q-17-104 4-131 27-23 48 5l24 126m-52-137v-76m19 101 48-70m809 182q17-104-4-131-27-23-48 5l-24 126m52-137v-76m-19 101-48-70" fill="none" stroke={p.rim} strokeOpacity=".38" strokeWidth="8"/>
        <circle cx="155" cy="380" r="25"/><circle cx="1007" cy="380" r="25"/>
        <path d="m159 339 10-111 19 2-9 111m817-2 10-111 19 2-9 111" fill="none" stroke="#21120d" strokeWidth="12"/>
        <path d="M142 225h99v53h-99zm815 0h99v53h-99z" fill="#6f3d20" stroke="none"/>
      </g>}
      <path d="M510 136h192v355H510z" fill="#10090a" stroke="url(#door-red)" strokeWidth="12"/>
      <path d="M526 151h160v324H526z" fill="#7e2a26" opacity={cut === 'security' ? '.34' : '.69'}/>
      <path d="M526 151h160v324H526z" fill="url(#scene-light)" opacity={.16 + light * .28}/>
      <path d="M508 489h196" stroke="#cf5541" strokeWidth="3" opacity=".67"/>
      <path d="M525 151v325m161-325v325" stroke="#d7705a" strokeWidth="1" opacity=".33"/>
      <g transform={`translate(${figureA} ${drift})`} fill={p.figure} stroke={p.rim} strokeOpacity=".29" strokeWidth="2">
        <path d="M466 269q-34 7-42 56l-13 155 84 1 39-153q0-44-68-59Z"/>
        <path d="M440 464 426 536h25l29-75m23 0 7 75h27l-4-75" strokeWidth="5"/>
        <circle cx="473" cy="242" r="25"/>
        <path d={`M516 315 Q550 ${333 - reach * 18} ${handA} ${325 - reach * 7}`} fill="none" stroke={p.figure} strokeWidth="22" strokeLinecap="round"/>
        <path d={`M516 315 Q550 ${333 - reach * 18} ${handA} ${325 - reach * 7}`} fill="none" stroke={p.rim} strokeOpacity=".28" strokeWidth="2"/>
      </g>
      <g transform={`translate(${figureB} ${-drift})`} fill={p.figure} stroke={p.rim} strokeOpacity=".29" strokeWidth="2">
        <path d="M740 269q36 2 47 56l19 153-89 3-39-147q-5-52 62-65Z"/>
        <path d="m731 463-7 73h-28l-6-75m79 1 24 75h25l-17-75" strokeWidth="5"/>
        <circle cx="741" cy="242" r="25"/>
        <path d={`M692 316 Q661 ${331 - reach * 17} ${handB} ${325 - reach * 7}`} fill="none" stroke={p.figure} strokeWidth="22" strokeLinecap="round"/>
        <path d={`M692 316 Q661 ${331 - reach * 17} ${handB} ${325 - reach * 7}`} fill="none" stroke={p.rim} strokeOpacity=".28" strokeWidth="2"/>
      </g>
      <ellipse cx="656" cy="535" rx="87" ry="15" fill="#000" opacity=".7"/>
      <path d="M618 500q14-9 39-8l17 9 21 7 12 17-7 10-96 1q-10-10-2-21Z" fill="#0a0b0e" stroke={p.rim} strokeOpacity=".55" strokeWidth="2"/>
      <path d="m632 495 18 8m20-2-9 12m39 11-100 3" fill="none" stroke={p.rim} strokeOpacity=".56" strokeWidth="2"/>
      <path d="m650 501 9 15-9-4-6 7" fill="none" stroke="#e0b9a3" strokeOpacity=".64" strokeWidth="2"/>
      {cut === 'romance' && <><ellipse cx="608" cy="326" rx="164" ry="130" fill="url(#scene-light)" opacity=".12"/><path d="M420 560q200 60 365-4" fill="none" stroke={p.rim} strokeOpacity=".14" strokeWidth="2"/></>}
      {cut === 'security' && <g fill="none" stroke={p.text} strokeOpacity=".62" strokeWidth="1.4">
        <path d="M397 192h32m-32 0v35m408-35h-32m32 0v35M397 483h32m-32 0v-35m408 35h-32m32 0v-35"/>
        <circle cx="608" cy="323" r="35"/><path d="M608 278v18m0 57v18m-46-47h18m55 0h18"/>
        <path d="M575 314h-30m102 0h-30" strokeDasharray="4 5"/>
        <rect x="596" y="486" width="116" height="56" strokeDasharray="6 4"/>
      </g>}
      {cut === 'revolution' && <><path d="M322 90 608 347 898 90" fill="none" stroke={p.light} strokeOpacity={.08 + light * .12} strokeWidth="72"/><path d="M403 582h407" stroke={p.rim} strokeOpacity=".31" strokeWidth="2"/></>}
      {cut === 'commerce' && <g fill="none" stroke={p.text} strokeOpacity=".43" strokeWidth="1"><circle cx="653" cy="520" r="103"/><circle cx="653" cy="520" r="111" strokeDasharray="2 8"/><path d="M758 509h122M530 521H450"/></g>}
    </g>
    <rect width="1200" height="675" filter="url(#scene-grain)" opacity={cut === 'commerce' ? '.035' : '.075'} style={{mixBlendMode:'screen'}}/>
    <rect width="1200" height="675" fill="none" stroke={p.text} strokeOpacity=".11" strokeWidth="2"/>
  </svg>;
}
