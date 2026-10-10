import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { eventTime, reconstructions, SceneArtwork } from '../ui/SceneArtwork';

const mono = 'Courier New, monospace';
const ivory = '#efe7dc';

function Opening() {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background:'#080707',color:ivory,justifyContent:'center',alignItems:'center',overflow:'hidden'}}>
    <SceneArtwork cut="romance" seconds={0} reducedMotion />
    <AbsoluteFill style={{background:'linear-gradient(90deg,#090707dc,#090707ac 50%,#090707d4)'}} />
    <div style={{position:'relative',textAlign:'center',opacity:Math.min(1,frame/22)}}>
      <p style={{font:`12px ${mono}`,letterSpacing:4,color:'#d7a18e'}}>EVENT 011 — 11 SECONDS MISSING</p>
      <h1 style={{font:'300 99px/.99 Arial',letterSpacing:-7,margin:'35px 0 18px'}}>ELEVEN SECONDS.<br/><i style={{fontFamily:'Georgia',fontWeight:400,color:'#e4bca7'}}>ZERO FRAMES.</i></h1>
      <p style={{font:'italic 25px Georgia',color:'#d9c4b3'}}>Four histories of an event no camera ever saw.</p>
      <p style={{font:`13px ${mono}`,letterSpacing:4,color:'#d9c1b2',marginTop:46}}>02:17:08 ━━━━━━━ 02:17:19</p>
      <p style={{font:`10px ${mono}`,letterSpacing:4,color:'#b29e90',marginTop:33}}>FOUR SYNTHETIC RECONSTRUCTIONS AVAILABLE</p>
    </div>
  </AbsoluteFill>;
}

function Chapter({index}:{index:number}) {
  const frame = useCurrentFrame();
  const scene = reconstructions[index];
  const seconds = Math.min(11,frame/24);
  const accent = ['#e4ad98','#b8d7e4','#e7bb75','#e4d0aa'][index];
  const claimFont = index === 1 ? `52px ${mono}` : index === 2 ? 'bold 68px Arial' : index === 3 ? '60px Georgia' : 'italic 62px Georgia';
  return <AbsoluteFill style={{background:'#070707',color:ivory,overflow:'hidden'}}>
    <SceneArtwork cut={scene.id} seconds={seconds} />
    <AbsoluteFill style={{background:'linear-gradient(0deg,#040404e8,transparent 26%,transparent 75%,#0404047b)',boxShadow:'inset 0 0 170px #0009'}} />
    <div style={{position:'absolute',top:53,left:72,font:`12px ${mono}`,letterSpacing:3,color:'#d4c4b7'}}>CAM 06 / SYNTHETIC<br/><strong style={{display:'block',marginTop:12,font:`22px ${mono}`,letterSpacing:2,color:ivory}}>{eventTime(seconds)}</strong></div>
    <div style={{position:'absolute',top:60,right:72,font:`51px ${mono}`,letterSpacing:-6}}>0{index+1}<small style={{font:`12px ${mono}`,letterSpacing:2,color:'#b3a596'}}> / 04</small></div>
    <div style={{position:'absolute',bottom:97,left:83,textShadow:'0 2px 14px #000'}}>
      <div style={{font:`12px ${mono}`,letterSpacing:3,color:accent}}>{scene.name} / RECONSTRUCTION 0{index+1}</div>
      <div style={{font:claimFont,letterSpacing:index===2?-3:-2,margin:'17px 0 18px',textTransform:index===2?'uppercase':'none'}}>{scene.claim}</div>
      <div style={{font:`11px ${mono}`,letterSpacing:3,color:accent}}>{scene.imprint}</div>
    </div>
    {index===1 && <div style={{position:'absolute',top:195,right:145,font:`11px ${mono}`,letterSpacing:2,color:'#c5dce6'}}>INFERENCE ONLY ↗</div>}
    {index===3 && <div style={{position:'absolute',right:142,bottom:211,width:116,height:116,border:'1px solid #e1c99e',borderRadius:'50%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',font:'48px Georgia',color:'#ecd9b0'}}>M<small style={{font:`9px ${mono}`,letterSpacing:2}}>011</small></div>}
    <div style={{position:'absolute',bottom:0,left:0,width:`${seconds/11*100}%`,height:3,background:accent}} />
  </AbsoluteFill>;
}

function Reveal() {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background:'#030303',color:ivory,justifyContent:'center',alignItems:'center',textAlign:'center'}}>
    {frame<40 && <div style={{font:`12px ${mono}`,letterSpacing:3,color:'#aa9e91'}}>REQUESTING SOURCE FRAMES ···</div>}
    {frame>=100 && <div style={{font:`12px ${mono}`,letterSpacing:3,color:'#c6beb3',opacity:Math.min(1,(frame-100)/20)}}>ORIGINAL FRAMES RECOVERED: 0</div>}
    {frame>=157 && <h2 style={{font:'300 96px/1.04 Arial',letterSpacing:-6,margin:'35px 0 0',opacity:Math.min(1,(frame-157)/33)}}>FOUR HISTORIES.<br/><i style={{fontFamily:'Georgia',fontWeight:400,color:'#e5cdb8'}}>ZERO FRAMES.</i></h2>}
  </AbsoluteFill>;
}

export const Film = () => <AbsoluteFill style={{background:'#030303'}}>
  <Sequence from={0} durationInFrames={1200}><Audio src={staticFile('tone-bed.wav')} volume={.72} /></Sequence>
  <Sequence from={0} durationInFrames={144}><Opening /></Sequence>
  {reconstructions.map((scene,index) => <Sequence key={scene.id} from={144+index*264} durationInFrames={264}><Chapter index={index} /></Sequence>)}
  <Sequence from={1200} durationInFrames={240}><Reveal /></Sequence>
</AbsoluteFill>;
