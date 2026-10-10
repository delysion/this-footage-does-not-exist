import { useCallback, useEffect, useRef, useState } from 'react';

type Scene = 'archive'|'romance'|'security'|'revolution'|'commerce'|'original';
const cuts: {id:Scene;title:string;label:string;line:string;stamp:string}[] = [
 {id:'romance',title:'ROMANCE',label:'A meeting, almost remembered.',line:'At 02:17:08, someone stayed.',stamp:'THE LAST LIGHT BETWEEN TWO PEOPLE'},
 {id:'security',title:'SECURITY',label:'An approach. A breach. A suspect.',line:'Subject enters frame. Intent: hostile.',stamp:'THREAT CONFIDENCE 98.4%'},
 {id:'revolution',title:'REVOLUTION',label:'The night the crowd began.',line:'At 02:17:08, a city stood up.',stamp:'THE FIRST NIGHT OF THE UPRISING'},
 {id:'commerce',title:'COMMERCE',label:'Keep the moment. Own the feeling.',line:'The memory, made yours.',stamp:'AUTHENTIC MOMENT™ · €11 / FRAME'},
];
const indexOf=(s:Scene)=>cuts.findIndex(c=>c.id===s);

function Vision({scene}:{scene:Scene}) {
 const special=scene==='original';
 return <svg className={`vision ${scene}`} viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" role="img" aria-label={special?'An empty black frame with a red doorway outline':'Stylized reconstruction of the same surveillance interval'}>
  <defs>
   <linearGradient id="room" x1="0" x2="1" y1="1" y2="0"><stop stopColor="#08090b"/><stop offset=".51" stopColor="#27201c"/><stop offset="1" stopColor="#090b0e"/></linearGradient>
   <radialGradient id="halo"><stop stopColor="var(--glow)" stopOpacity=".58"/><stop offset="1" stopColor="var(--glow)" stopOpacity="0"/></radialGradient>
   <filter id="soft"><feGaussianBlur stdDeviation="18"/></filter>
   <filter id="grain"><feTurbulence baseFrequency=".78" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values=".3 0 0 0 0 .3 0 0 0 0 .3 0 0 0 0 0 0 0 .13 0"/></filter>
  </defs>
  {!special&&<><rect width="1200" height="675" fill="url(#room)"/><ellipse cx="590" cy="360" rx="410" ry="300" fill="url(#halo)" filter="url(#soft)"/>
   <path className="architecture" d="M0 525 290 470 550 505 820 461 1200 520v155H0Z"/><path className="door" d="M510 137h192v354H510z"/><path className="doorlight" d="M528 155h157v310H528z"/>
   <g className="person p1"><path className="figure f1" d="M488 278q-32 1-37 42l-14 121 37 7 18-90 8 101 55-3-8-127q-6-49-59-51Z"/><circle className="head" cx="467" cy="248" r="24"/></g>
   <g className="person p2"><path className="figure f2" d="M718 270q36-2 47 40l22 112-37 12-26-78 7 102-59 5-4-130q1-53 50-61Z"/><circle className="head" cx="741" cy="241" r="23"/></g>
   <path className="shoe" d="m619 502 58-4 22 17-7 12-88 1q-9-15 15-26Z"/>
   {scene==='revolution'&&<><path className="crowd" d="M0 500q28-64 53 0 29-98 59 0 29-115 59 0 31-79 61 0 27-136 58 0 35-96 67 0 27-128 57 0 31-89 61 0 31-132 63 0 29-96 59 0 36-120 68 0 28-87 57 0 27-116 57 0 35-69 65 0 31-106 62 0 30-80 59 0 35-126 67 0 24-72 49 0v175H0Z"/></>}
   <rect width="1200" height="675" filter="url(#grain)" opacity=".18"/>
  </>}
  {special&&<><rect width="1200" height="675" fill="#050505"/><path d="M510 137h192v354H510z" fill="none" stroke="#6e2b27" strokeWidth="1" opacity=".32"/><path d="M528 155v310" stroke="#9f5145" strokeWidth="1" opacity=".25"/></>}
 </svg>;
}

function useTone(scene:Scene, enabled:boolean) {
 const ctx=useRef<AudioContext|null>(null); const osc=useRef<OscillatorNode|null>(null); const gain=useRef<GainNode|null>(null);
 useEffect(()=>{
  if(!enabled||scene==='archive'||scene==='original'){ if(gain.current) gain.current.gain.setTargetAtTime(0,ctx.current!.currentTime,.15); return; }
  const Ctx=window.AudioContext; if(!ctx.current) ctx.current=new Ctx(); const c=ctx.current; void c.resume();
  if(!osc.current){osc.current=c.createOscillator();gain.current=c.createGain();osc.current.type='sine';osc.current.connect(gain.current);gain.current.connect(c.destination);osc.current.start();}
  const freqs:Record<string,number>={romance:110,security:55,revolution:73.42,commerce:164.81};
  osc.current!.frequency.setTargetAtTime(freqs[scene]??80,c.currentTime,.5);gain.current!.gain.setTargetAtTime(.035,c.currentTime,.35);
  return ()=>{if(gain.current&&ctx.current)gain.current.gain.setTargetAtTime(0,ctx.current.currentTime,.2);};
 },[scene,enabled]);
}

export default function App(){
 const [scene,setScene]=useState<Scene>('archive'); const [sound,setSound]=useState(false); const [paused,setPaused]=useState(false); const [seen,setSeen]=useState<Scene[]>([]);
 useTone(scene,sound&&!paused);
 const move=useCallback((n:number)=>{const next=cuts[(indexOf(scene)+n+4)%4];setScene(next.id);setSeen(v=>v.includes(next.id)?v:[...v,next.id]);setPaused(false)},[scene]);
 const start=()=>{setScene('romance');setSeen(['romance']);setPaused(false)};
 const replay=()=>{setScene('archive');setSeen([]);setPaused(false)};
 useEffect(()=>{const k=(e:KeyboardEvent)=>{if(e.key==='ArrowRight'&&indexOf(scene)>=0)move(1);if(e.key==='ArrowLeft'&&indexOf(scene)>=0)move(-1);if(e.key==='Escape'&&scene!=='archive')setScene('archive')};window.addEventListener('keydown',k);return()=>window.removeEventListener('keydown',k)},[scene,move]);
 const current=cuts[indexOf(scene)];
 return <main className={`installation ${scene} ${paused?'paused':''}`}>
  <div className="ambient" aria-hidden="true"/><header className="masthead"><span className="mark">ARCHIVE / 04</span><span>FIELD NOTE 11—A</span><button className="sound" onClick={()=>setSound(!sound)} aria-label={sound?'Mute sound':'Enable sound'}>{sound?'SOUND ON':'SOUND OFF'}</button></header>
  <section className="stage" aria-live="polite">
   <Vision scene={scene}/><div className="frame-edge"/>
   {scene==='archive'&&<div className="opening"><p className="eyebrow">EVENT 011 — 11 SECONDS MISSING</p><h1>THIS FOOTAGE<br/><em>DOES NOT EXIST</em></h1><div className="gap"><span>02:17:08</span><i/><span>02:17:19</span><b>NO RECORDED FRAMES</b></div><p className="premise">Four reconstructions are available.</p><button className="enter" onClick={start}>ENTER THE GAP <span>↗</span></button></div>}
   {current&&<div className="caption"><span>{current.stamp}</span><h2>{current.line}</h2></div>}
   {scene==='security'&&<div className="reticle" aria-hidden="true"><i/><span>SUBJECT 02 · 98.4%</span></div>}
   {scene==='commerce'&&<div className="seal">M<br/><small>MEMORY / No. 011</small></div>}
   {scene==='original'&&<div className="reveal"><span className="eyebrow">REQUEST COMPLETE</span><h2>ORIGINAL FRAMES<br/>RECOVERED: <i>0</i></h2><p>FOUR RECONSTRUCTIONS. NO ORIGINAL.</p><small>YOU HAVE SEEN FOUR VERSIONS OF WHAT HAPPENED.<br/>YOU HAVE SEEN NONE OF IT.</small></div>}
   {current&&<div className="index" aria-hidden="true">0{indexOf(scene)+1}<span> / 04</span></div>}
  </section>
  <footer className="controls">
   <div className="control-left">{scene==='archive'?<span>11 SECONDS ABSENT FROM THE RECORD</span>:scene==='original'?<span>END OF AVAILABLE RECORD</span>:<><button onClick={()=>move(-1)} aria-label="Previous reconstruction">←</button><span>PREVIOUS / NEXT</span><button onClick={()=>move(1)} aria-label="Next reconstruction">→</button></>}</div>
   <nav className="chapters" aria-label="Reconstructions">{cuts.map((c,i)=><button key={c.id} className={scene===c.id?'active':''} aria-label={`View ${c.title.toLowerCase()} reconstruction`} aria-current={scene===c.id?'step':undefined} onClick={()=>{setScene(c.id);setSeen(v=>v.includes(c.id)?v:[...v,c.id])}}><i>{String(i+1).padStart(2,'0')}</i><span>{c.title}</span></button>)}</nav>
   <div className="control-right">{scene==='archive'?<span>02:17:08 — 02:17:19</span>:scene==='original'?<button className="request" onClick={replay}>REPLAY ↺</button>:<><button className="pause" onClick={()=>setPaused(!paused)}>{paused?'PLAY':'PAUSE'} {paused?'▶':'Ⅱ'}</button><button className="request" onClick={()=>setScene('original')}>SHOW ORIGINAL FOOTAGE <span>↗</span></button></>}</div>
  </footer>
  <div className="sr-only" aria-live="polite">{seen.length} of 4 reconstructions viewed</div>
 </main>;
}
