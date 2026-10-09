import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
const scenes=[
 {name:'ROMANCE',line:'At 02:17:08, someone stayed.',tag:'THE LAST LIGHT BETWEEN TWO PEOPLE',tone:'#b7443e'},
 {name:'SECURITY',line:'Subject enters frame. Intent: hostile.',tag:'THREAT CONFIDENCE 98.4%',tone:'#6e899b'},
 {name:'REVOLUTION',line:'At 02:17:08, a city stood up.',tag:'THE FIRST NIGHT OF THE UPRISING',tone:'#c0873d'},
 {name:'COMMERCE',line:'The memory, made yours.',tag:'AUTHENTIC MOMENT™ · €11 / FRAME',tone:'#c0ad82'},
];
const fade=(f:number,d:number)=>interpolate(f,[0,18,d-18,d],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
function Room({kind,frame}:{kind:number;frame:number}){
 const drift=interpolate(frame,[0,264],[0,kind===2?-18:12]);
 return <svg width="100%" height="100%" viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" style={{position:'absolute',inset:0}}>
  <defs><linearGradient id="r" x2="1" y2="0"><stop stopColor="#08090b"/><stop offset=".5" stopColor={kind===0?'#39201c':kind===1?'#19232a':kind===2?'#392b1d':'#2d2920'}/><stop offset="1" stopColor="#090a0b"/></linearGradient><radialGradient id="light"><stop stopColor={scenes[kind].tone} stopOpacity=".5"/><stop offset="1" stopColor={scenes[kind].tone} stopOpacity="0"/></radialGradient></defs>
  <rect width="1200" height="675" fill="url(#r)"/><ellipse cx="600" cy="350" rx="410" ry="310" fill="url(#light)"/><path d="M0 525 290 470 550 505 820 461 1200 520v155H0Z" fill="#090a0c"/>
  <path d="M510 137h192v354H510z" fill="#241310" stroke="#a74739" strokeWidth="2"/><path d="M528 155h157v310H528z" fill="#8c4237" opacity=".42"/>
  <g transform={`translate(${drift} ${Math.sin(frame/25)*3})`}><path d="M488 278q-32 1-37 42l-14 121 37 7 18-90 8 101 55-3-8-127q-6-49-59-51Z" fill="#141113" stroke="#d1a793" strokeOpacity=".18" strokeWidth="2"/><circle cx="467" cy="248" r="24" fill="#181415"/></g>
  <g transform={`translate(${-drift} ${Math.sin(frame/31+2)*3})`}><path d="M718 270q36-2 47 40l22 112-37 12-26-78 7 102-59 5-4-130q1-53 50-61Z" fill="#141113" stroke="#d1a793" strokeOpacity=".18" strokeWidth="2"/><circle cx="741" cy="241" r="23" fill="#181415"/></g>
  {kind===2&&<path d="M0 520q28-70 55 0 25-110 54 0 35-140 66 0 36-95 67 0 23-115 56 0 36-157 64 0 30-100 63 0 23-125 57 0 34-95 61 0 30-145 60 0 39-100 68 0 28-139 62 0 38-91 69 0 28-119 57 0 31-128 62 0 30-110 57 0v155H0Z" fill="#100f0d"/>}
  <path d="m619 502 58-4 22 17-7 12-88 1q-9-15 15-26Z" fill="#a39682"/>
  {kind===1&&<g stroke="#d2e0ea80" fill="none"><rect x="385" y="173" width="430" height="300"/><circle cx="600" cy="336" r="23"/><path d="M600 165v18M376 323h18"/></g>}
 </svg>;
}
function Chapter({kind}:{kind:number}){
 const f=useCurrentFrame();const {durationInFrames}=useVideoConfig();const s=scenes[kind];
 const scale=interpolate(f,[0,durationInFrames],[1.04,1.12]);
 return <AbsoluteFill style={{background:'#090908',opacity:fade(f,durationInFrames),overflow:'hidden'}}>
  <div style={{position:'absolute',inset:0,transform:`scale(${scale})`}}><Room kind={kind} frame={f}/></div><AbsoluteFill style={{background:'linear-gradient(90deg,#080706bd,transparent 80%),linear-gradient(0deg,#080706aa,transparent 47%)'}}/>
  <div style={{position:'absolute',left:100,right:100,top:65,display:'flex',justifyContent:'space-between',font:'12px Courier New',letterSpacing:4,color:'#b9ad9e'}}><span>THIS FOOTAGE DOES NOT EXIST</span><span>02:17:08—02:17:19</span></div>
  <div style={{position:'absolute',left:112,top:590,color:'#eee3d6'}}><div style={{font:'12px Courier New',letterSpacing:3,color:s.tone,marginBottom:18}}>{s.tag}</div><div style={{font:'italic 48px Georgia',maxWidth:900}}>{s.line}</div></div>
  <div style={{position:'absolute',right:100,top:72,font:'44px Courier New',color:'#e9dfd5'}}>0{kind+1}<small style={{fontSize:14,color:'#a3998e'}}> / 04</small></div>
  {kind===3&&<div style={{position:'absolute',right:180,bottom:150,border:'1px solid #dfc79a',borderRadius:'50%',width:100,height:100,display:'grid',placeContent:'center',textAlign:'center',font:'32px Georgia',color:'#e7d3ad',transform:`rotate(${f*.4}deg)`}}>M<small style={{font:'7px Courier New'}}>MEMORY / 011</small></div>}
 </AbsoluteFill>;
}
function Opening(){const f=useCurrentFrame();return <AbsoluteFill style={{background:'#100e0c',justifyContent:'center',alignItems:'center',color:'#eee6dd',opacity:fade(f,144)}}><div style={{position:'absolute',inset:0}}><Room kind={0} frame={f}/><AbsoluteFill style={{background:'#090807bb'}}/></div><div style={{position:'relative',textAlign:'center'}}><p style={{font:'12px Courier New',letterSpacing:5,color:'#c98b78'}}>RESTRICTED ARCHIVE · CAMERA 06</p><h1 style={{font:'300 92px/1 Arial',letterSpacing:-7,margin:'35px 0'}}>THIS FOOTAGE<br/><i style={{fontFamily:'Georgia',fontWeight:400,color:'#dbb5a5'}}>DOES NOT EXIST</i></h1><p style={{font:'13px Courier New',letterSpacing:3,color:'#dcc7b8'}}>02:17:08 ━━━━━━━ 02:17:19<br/><small style={{fontSize:10,letterSpacing:4}}>11 SECONDS MISSING</small></p><p style={{marginTop:45,font:'13px Courier New'}}>Four reconstructions are available.</p></div></AbsoluteFill>}
function Reveal(){const f=useCurrentFrame();const opacity=interpolate(f,[0,30,190,240],[0,1,1,.78],{extrapolateRight:'clamp'});return <AbsoluteFill style={{background:'#050505',color:'#e8e3dc',justifyContent:'center',alignItems:'center',textAlign:'center',opacity}}><div style={{font:'11px Courier New',letterSpacing:4,color:'#9b8172'}}>REQUEST COMPLETE</div><h2 style={{font:'300 54px/1.2 Courier New',letterSpacing:-3,margin:'34px 0'}}>ORIGINAL FRAMES<br/>RECOVERED: <i style={{fontStyle:'normal',color:'#b76b58'}}>0</i></h2><div style={{font:'11px Courier New',letterSpacing:4,color:'#c7bbae'}}>FOUR RECONSTRUCTIONS. NO ORIGINAL.</div><p style={{font:'10px/2 Courier New',letterSpacing:1.5,color:'#82796f',marginTop:34}}>YOU HAVE SEEN FOUR VERSIONS OF WHAT HAPPENED.<br/>YOU HAVE SEEN NONE OF IT.</p></AbsoluteFill>}
export const Film=()=> <AbsoluteFill style={{background:'#070707'}}><Audio src={staticFile('tone-bed.wav')} volume={0.7}/><Sequence from={0} durationInFrames={144}><Opening/></Sequence>{scenes.map((_,i)=><Sequence key={i} from={144+i*264} durationInFrames={264}><Chapter kind={i}/></Sequence>)}<Sequence from={1200} durationInFrames={240}><Reveal/></Sequence></AbsoluteFill>;
