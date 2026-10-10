import { GestureShot } from './GestureShot';

export type Reconstruction = 'romance' | 'security' | 'revolution' | 'commerce';
export type ArtworkCut = Reconstruction | 'master' | 'final';

export const reconstructions: { id: Reconstruction; name: string; claim: string; imprint: string }[] = [
  { id: 'romance', name: 'ROMANCE', claim: 'A relic.', imprint: 'THE PRIVATE BECOMES A MEMORIAL' },
  { id: 'security', name: 'SECURITY', claim: 'Exhibit A.', imprint: 'INFERENCE ONLY · NO SOURCE FRAMES' },
  { id: 'revolution', name: 'REVOLUTION', claim: 'The first gesture.', imprint: 'AN ANONYMOUS BODY BECOMES A SYMBOL' },
  { id: 'commerce', name: 'COMMERCE', claim: 'Edition 011.', imprint: 'THE EXPERIENCE IS NOW AVAILABLE' },
];

export const eventTime = (seconds: number) => {
  const centiseconds = Math.min(1100, Math.max(0, Math.floor(seconds * 100)));
  return `02:17:${String(8 + Math.floor(centiseconds / 100)).padStart(2, '0')}.${String(centiseconds % 100).padStart(2, '0')}`;
};

export const artworkFiles: Record<ArtworkCut, string> = {
  master: '/art/master-room-v2.webp',
  romance: '/art/room-romance-v2.webp',
  security: '/art/room-security-v2.webp',
  revolution: '/art/room-revolution-v2.webp',
  commerce: '/art/room-commerce-v2.webp',
  final: '/art/room-final-v2.webp',
};
export const shoeFile = '/art/master-shoe-v2.webp';
export const gestureFile = '/art/gesture-hands.webp';

/** Every institutional image is an edit of the preceding image in one physical room. */
export function SceneArtwork({ cut, seconds, reducedMotion = false }: { cut: ArtworkCut; seconds: number; reducedMotion?: boolean }) {
  const t = Math.max(0, seconds);
  const isFinal = cut === 'final';
  const finalClose = Math.min(1, Math.max(0, (t - 2.8) / 1.7));
  const finalReturn = 1 - Math.min(1, Math.max(0, (t - 6.4) / 1.5));
  const detailOpacity = cut === 'master' ? 0 : isFinal ? finalClose * finalReturn : t >= 7.2 && t < 9.25 ? 1 : 0;
  const roomZoom = reducedMotion ? 1 : isFinal ? 1.015 + Math.min(t, 9) * .007 : cut === 'master' ? 1.02 : 1.012 + Math.min(t, 11) * (cut === 'security' ? .0035 : .0022);
  const roomShift = reducedMotion ? 0 : isFinal ? Math.min(t, 9) * -.16 : cut === 'security' ? Math.min(t, 11) * -.1 : cut === 'revolution' ? Math.min(t, 11) * .08 : 0;
  const label = cut === 'master' ? 'the unaltered fictional room with a red doorway, two distant figures and one damaged black shoe' : cut === 'final' ? 'the transformed room retains memorial, evidence, political banners and luxury display, while the doorway stands empty' : `${cut} reconstruction of the same room, doorway, two figures and damaged shoe; one reaching gesture is edited into an institutional claim`;
  return <div className={`scene-art scene-${cut}`} role="img" aria-label={label}>
    <img className="room-image" src={artworkFiles[cut]} alt="" draggable="false" style={{ transform: `translateX(${roomShift}%) scale(${roomZoom})` }} />
    <img className="object-image" src={shoeFile} alt="" draggable="false" style={{ opacity: reducedMotion ? 0 : detailOpacity }} />
    {cut !== 'master' && cut !== 'final' && <GestureShot cut={cut} seconds={t} reducedMotion={reducedMotion} roomSrc={artworkFiles[cut]} gestureSrc={gestureFile} />}
    <div className="film-breath" aria-hidden="true" />
  </div>;
}
