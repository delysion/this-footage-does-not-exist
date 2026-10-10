/** A later visit to the altered room. No frame here claims to document the missing interval. */
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (start: number, end: number, value: number) => {
  const x = clamp((value - start) / (end - start));
  return x * x * (3 - 2 * x);
};

export function AftermathAction({ seconds, roomSrc, handSrc, reducedMotion = false }: {
  seconds: number;
  roomSrc: string;
  handSrc: string;
  reducedMotion?: boolean;
}) {
  const close = reducedMotion ? Number(seconds >= 1.8 && seconds < 9.3) : ease(1.25, 2.55, seconds) * (1 - ease(9.15, 9.9, seconds));
  const approach = reducedMotion ? Number(seconds >= 3.2 && seconds < 8.5) : ease(3.0, 5.9, seconds);
  const retreat = reducedMotion ? Number(seconds >= 8.5) : ease(7.45, 9.1, seconds);
  const handOpacity = reducedMotion ? Number(seconds >= 3.2 && seconds < 8.5) : ease(2.85, 3.55, seconds) * (1 - ease(8.75, 9.45, seconds));
  const contact = reducedMotion ? Number(seconds >= 5.9 && seconds < 9.3) : ease(5.78, 6.15, seconds) * (1 - ease(9.15, 9.9, seconds));
  const pressure = reducedMotion ? 0 : ease(5.85, 6.3, seconds) * (1 - ease(7.25, 7.8, seconds));
  const handX = -39 + 39 * approach - 34 * retreat;
  const handY = 8.8 + 2.2 * approach - 1.8 * retreat;
  const handAngle = reducedMotion ? 0 : -5.5 + 6.4 * approach - 3.2 * retreat;
  const roomTransform = `translate(${-24 * close}%, ${-16 * close}%) scale(${1 + .88 * close})`;

  return <div className="aftermath-action" role="img" aria-label="At a later time, the altered room holds the damaged black shoe behind glass. A human hand reaches the case, touches the glass, pauses, then withdraws without reaching the shoe.">
    <img className="aftermath-room" src={roomSrc} alt="" draggable="false" style={{transform:roomTransform}} />
    <div className="aftermath-close-vignette" style={{opacity:close}} />
    <div className="aftermath-hand" style={{opacity:handOpacity,transform:`translate(${handX}%, ${handY}%) rotate(${handAngle}deg) scaleX(${1 - .009 * pressure})`}}>
      <img src={handSrc} alt="" draggable="false" />
    </div>
    <div className="aftermath-reflection" style={{opacity:handOpacity * contact * .42,transform:`translate(${handX + 1.25}%, ${handY + .5}%) rotate(${handAngle}deg)`}}>
      <img src={handSrc} alt="" draggable="false" />
    </div>
    <div className="aftermath-contact" style={{opacity:close * contact}} />
    <div className="aftermath-glass" style={{opacity:close * (.26 + .42 * contact)}} />
    <div className="aftermath-grain" />
  </div>;
}
