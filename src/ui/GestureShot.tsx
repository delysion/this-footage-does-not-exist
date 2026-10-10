import type { Reconstruction } from './SceneArtwork';

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (start: number, end: number, value: number) => {
  const x = clamp((value - start) / (end - start));
  return x * x * (3 - 2 * x);
};

/** One source gesture, subjected to four different institutional edits. */
export function GestureShot({ cut, seconds, reducedMotion = false, roomSrc, gestureSrc = '/art/gesture-hands.webp' }: {
  cut: Reconstruction;
  seconds: number;
  reducedMotion?: boolean;
  roomSrc: string;
  gestureSrc?: string;
}) {
  const local = Math.max(0, seconds - 1.8);
  const opacity = reducedMotion ? Number(seconds >= 1.8 && seconds < 7.4) : smooth(1.5, 2.0, seconds) * (1 - smooth(7.05, 7.5, seconds));
  let sourceTime = clamp(local / 5.6);
  if (cut === 'romance') sourceTime = Math.min(.65, sourceTime * 1.18);
  if (cut === 'revolution') sourceTime = Math.min(.66, sourceTime * 1.65);
  if (cut === 'commerce') sourceTime = (local % 2.4) / 2.4 * .7;
  if (reducedMotion) sourceTime = .58;
  const reach = smooth(.05, .63, sourceTime);
  const withdrawal = smooth(.68, .98, sourceTime);
  const leftX = -3.1 + 6.2 * reach - 4.9 * withdrawal;
  const rightX = 3.1 - 6.2 * reach + 4.9 * withdrawal;
  const hesitation = reducedMotion ? 0 : Math.sin(sourceTime * 18) * .28 * (1 - reach);
  const frozen = local > 1.9;
  const subjectClaimed = frozen && cut !== 'security';
  const rightOpacity = subjectClaimed ? 1 - smooth(2.2, 3.5, local) * .7 : 1;

  let cameraScale = 1.11;
  let cameraShift = 0;
  if (cut === 'security') {
    // The same reach is recut as an approach, a cropped hand, then a retreat.
    const edit = Math.floor(local / .92) % 4;
    cameraScale = edit === 0 ? 1.16 : edit === 2 ? 1.75 : 1.45;
    cameraShift = edit === 1 ? 17 : edit === 3 ? -17 : 0;
  } else if (cut === 'revolution') {
    cameraScale = local < 2.2 ? 1.13 : 1.42;
    cameraShift = local < 2.2 ? 0 : 4;
  } else if (cut === 'commerce') {
    cameraScale = 1.02;
  }
  if (reducedMotion) { cameraScale = 1.08; cameraShift = 0; }

  return <div className={`gesture-shot gesture-${cut}`} aria-hidden="true" style={{opacity}}>
    <div className="gesture-room" style={{backgroundImage:`url(${roomSrc})`}} />
    <div className="gesture-shadow" />
    <div className="gesture-camera" style={{transform:`translateX(${cameraShift}%) scale(${cameraScale})`}}>
      <img className="gesture-hand gesture-left" src={gestureSrc} alt="" draggable="false" style={{transform:`translateX(${leftX}%) rotate(${reducedMotion ? 0 : -1.65 * reach + hesitation}deg)`}} />
      <img className="gesture-hand gesture-right" src={gestureSrc} alt="" draggable="false" style={{transform:`translateX(${rightX}%) rotate(${reducedMotion ? 0 : 1.3 * reach - hesitation}deg)`,opacity:rightOpacity}} />
    </div>
    {cut === 'romance' && frozen && <div className="gesture-memorial"><i/><span>THE MOMENT KEPT</span></div>}
    {cut === 'security' && local > 1.5 && <div className="gesture-custody"><span>SUBJECT / HELD</span><i/></div>}
    {cut === 'revolution' && frozen && <div className="gesture-multiples">
      {[0,1,2].map(number => <div key={number} className="gesture-print" style={{left:`${10 + number * 29}%`,opacity:reducedMotion ? .58 : smooth(2.1 + number * .34, 2.6 + number * .34, local) * .58}}><img src={gestureSrc} alt="" /></div>)}
    </div>}
    {cut === 'commerce' && <div className="gesture-vitrine"><span>EDITION 011</span><i/></div>}
  </div>;
}
