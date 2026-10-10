import { useCallback, useEffect, useRef, useState } from 'react';
import { artworkFiles, eventTime, gestureFile, reconstructions, SceneArtwork, shoeFile, type Reconstruction } from './SceneArtwork';
import { AftermathAction } from './AftermathAction';

type Scene = 'archive' | Reconstruction | 'original';
type RevealPhase = 'silence' | 'aftermath' | 'verdict';
const isCut = (scene: Scene): scene is Reconstruction => reconstructions.some(item => item.id === scene);
const indexOf = (scene: Scene) => reconstructions.findIndex(item => item.id === scene);

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

function useScore(scene: Scene, enabled: boolean, paused: boolean) {
  const audio = useRef<{ context: AudioContext; low: OscillatorNode; high: OscillatorNode; gain: GainNode } | null>(null);
  useEffect(() => {
    if (enabled && !audio.current) {
      const context = new AudioContext();
      const low = context.createOscillator();
      const high = context.createOscillator();
      const gain = context.createGain();
      low.type = 'sine'; high.type = 'triangle'; gain.gain.value = 0;
      low.connect(gain); high.connect(gain); gain.connect(context.destination);
      low.start(); high.start();
      audio.current = { context, low, high, gain };
    }
    const a = audio.current;
    if (!a) return;
    void a.context.resume();
    const now = a.context.currentTime;
    if (scene === 'original') {
      a.gain.gain.cancelScheduledValues(now);
      a.gain.gain.setValueAtTime(0, now);
      return;
    }
    if (!enabled || paused || !isCut(scene)) {
      a.gain.gain.setTargetAtTime(0, now, .07);
      return;
    }
    const score = {
      romance: [110, 164.81, .020], security: [55, 73.42, .022],
      revolution: [73.42, 146.84, .026], commerce: [164.81, 329.62, .013],
    }[scene];
    a.low.frequency.setTargetAtTime(score[0], now, .35);
    a.high.frequency.setTargetAtTime(score[1], now, .35);
    a.gain.gain.setTargetAtTime(score[2], now, .28);
    if (scene === 'security' || scene === 'revolution') {
      const pulse = window.setInterval(() => {
        const time = a.context.currentTime;
        a.gain.gain.setTargetAtTime(scene === 'security' ? .004 : .038, time, .025);
        a.gain.gain.setTargetAtTime(score[2], time + .18, .055);
      }, scene === 'security' ? 610 : 890);
      return () => window.clearInterval(pulse);
    }
  }, [scene, enabled, paused]);
  useEffect(() => () => { if (audio.current) void audio.current.context.close(); }, []);
  return useCallback(() => {
    const a = audio.current;
    if (!a) return;
    const now = a.context.currentTime;
    a.gain.gain.cancelScheduledValues(now);
    a.gain.gain.setValueAtTime(0, now);
  }, []);
}

export default function App() {
  const [scene, setScene] = useState<Scene>('archive');
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  const [phase, setPhase] = useState<RevealPhase>('silence');
  const [silenceSeconds, setSilenceSeconds] = useState(0);
  const [aftermathSeconds, setAftermathSeconds] = useState(0);
  const silenceStartedAt = useRef(0);
  const reduced = useReducedMotion();
  const cutSound = useScore(scene, sound, paused);

  useEffect(() => {
    const delayed = window.setTimeout(() => {
      [...Object.values(artworkFiles), shoeFile, gestureFile].forEach(source => { const image = new Image(); image.src = source; });
    }, 450);
    return () => window.clearTimeout(delayed);
  }, []);

  const select = useCallback((next: Reconstruction, preserveTime = true) => {
    setSeconds(current => preserveTime && isCut(scene) && current < 11 ? current : 0);
    setScene(next); setPaused(false); setAutomatic(false);
  }, [scene]);
  const move = useCallback((step: number) => {
    const next = reconstructions[(indexOf(scene) + step + 4) % 4];
    select(next.id);
  }, [scene, select]);
  const start = () => { setSeconds(0); setScene('romance'); setPaused(false); setAutomatic(true); };
  const reveal = () => {
    cutSound();
    silenceStartedAt.current = performance.now();
    setSilenceSeconds(0); setAftermathSeconds(0); setPhase('silence');
    setScene('original'); setAutomatic(false); setPaused(false);
  };
  const replay = () => { setScene('archive'); setSeconds(0); setPaused(false); setAutomatic(false); };

  useEffect(() => {
    if (!isCut(scene) || paused) return;
    let frame = 0;
    let last = 0;
    let accumulated = 0;
    const tick = (now: number) => {
      if (!last) last = now;
      const delta = Math.min(.08, (now - last) / 1000);
      last = now;
      accumulated += delta;
      if (accumulated >= 1 / 30) {
        const advance = accumulated;
        accumulated = 0;
        setSeconds(current => Math.min(11, current + advance));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [scene, paused]);

  useEffect(() => {
    if (!automatic || seconds < 11 || !isCut(scene)) return;
    const following = reconstructions[indexOf(scene) + 1];
    if (!following) { setAutomatic(false); return; }
    const timer = window.setTimeout(() => { setScene(following.id); setSeconds(0); }, 350);
    return () => window.clearTimeout(timer);
  }, [automatic, scene, seconds]);

  useEffect(() => {
    if (scene !== 'original') return;
    let frame = 0;
    const tick = () => {
      const elapsed = performance.now() - silenceStartedAt.current;
      if (elapsed < 11000) {
        setSilenceSeconds(Math.floor(elapsed / 1000));
      } else {
        setSilenceSeconds(11);
        setAftermathSeconds(Math.min(10, (elapsed - 11000) / 1000));
        setPhase(elapsed >= 21000 ? 'verdict' : 'aftermath');
      }
      if (elapsed < 22000) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [scene]);

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && isCut(scene)) { event.preventDefault(); move(1); }
      if (event.key === 'ArrowLeft' && isCut(scene)) { event.preventDefault(); move(-1); }
      if (event.key === ' ' && isCut(scene) && event.target === document.body) { event.preventDefault(); setPaused(value => !value); }
      if (event.key === 'Escape' && scene !== 'archive') replay();
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [scene, move]);

  const current = isCut(scene) ? reconstructions[indexOf(scene)] : null;
  return <main className={`installation ${scene} phase-${phase}`}>
    <header className="masthead">
      <span className="identity">ELEVEN SECONDS. ZERO FRAMES.</span>
      <span className="archive-id">ARCHIVE 011 / CAMERA 06</span>
      <button className="sound-control" onClick={() => setSound(value => !value)} aria-label={sound ? 'Mute sound' : 'Enable sound'} aria-pressed={sound}>{sound ? 'SOUND ON' : 'SOUND OFF'}</button>
    </header>
    <section className="stage" aria-label={scene === 'original' ? 'Original footage request' : 'Missing archive interval'}>
      {scene !== 'original' && <SceneArtwork cut={current?.id ?? 'master'} seconds={current ? seconds : 0} reducedMotion={reduced} />}
      {scene === 'original' && phase !== 'silence' && <AftermathAction seconds={aftermathSeconds} reducedMotion={reduced} roomSrc={artworkFiles.final} handSrc={gestureFile} />}
      <div className="stage-vignette" aria-hidden="true" />
      {scene === 'archive' && <div className="opening">
        <p className="overline">EVENT 011 — 11 SECONDS MISSING</p>
        <h1>ELEVEN SECONDS.<br/><em>ZERO FRAMES.</em></h1>
        <p className="subtitle">Four histories of an event no camera ever saw.</p>
        <div className="gap-timeline" aria-hidden="true"><span>02:17:08</span><i/><span>02:17:19</span></div>
        <p className="availability">FOUR RECONSTRUCTIONS AVAILABLE</p>
        <button className="primary-action" onClick={start}>ENTER THE GAP <span aria-hidden="true">↗</span></button>
      </div>}
      {current && <>
        <div className="timecode" aria-label={`Archive timecode ${eventTime(seconds)}`}><span>CAM 06 / SYNTHETIC</span><strong>{eventTime(seconds)}</strong></div>
        <div className="scene-caption" style={{opacity: seconds >= 1.8 && seconds < 7.45 ? 0 : 1}}><span>{current.name} / RECONSTRUCTION 0{indexOf(scene) + 1}</span><h2>{current.claim}</h2><p>{current.imprint}</p></div>
        <div className="progress-line" aria-label={`${Math.floor(seconds)} of 11 seconds`}><i style={{width:`${seconds / 11 * 100}%`}} /></div>
      </>}
      {scene === 'original' && phase === 'silence' && <div className="reveal reveal-silence">
        <p className="silence-timecode" role="timer" aria-live="off">00:{String(silenceSeconds).padStart(2, '0')}</p>
      </div>}
    </section>
    <footer className="controls">
      <div className="transport">
        {current ? <><button onClick={() => move(-1)} aria-label="Previous reconstruction">←</button><button onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play sequence' : 'Pause sequence'}>{paused ? '▶' : 'Ⅱ'}</button><button onClick={() => move(1)} aria-label="Next reconstruction">→</button></> : <span>{scene === 'original' ? 'END OF AVAILABLE RECORD' : '02:17:08—02:17:19'}</span>}
      </div>
      <nav className="chapters" aria-label="Reconstruction chapters">
        {reconstructions.map((item, index) => <button key={item.id} className={scene === item.id ? 'selected' : ''} aria-current={scene === item.id ? 'step' : undefined} onClick={() => select(item.id)}><span>0{index + 1}</span>{item.name}</button>)}
      </nav>
      <div className="end-action">{current ? <button onClick={reveal}>SHOW ORIGINAL FOOTAGE <span aria-hidden="true">↗</span></button> : scene === 'original' && phase === 'verdict' ? <button onClick={replay}>REPLAY <span aria-hidden="true">↺</span></button> : null}</div>
    </footer>
  </main>;
}
