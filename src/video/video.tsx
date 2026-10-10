import { AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { eventTime, reconstructions, type ArtworkCut } from '../ui/SceneArtwork';

const paper = '#f2e8db';
const mono = 'Courier New, monospace';
const room = (cut: ArtworkCut) => staticFile(`art/${cut === 'master' ? 'master-room-v2' : `room-${cut}-v2`}.webp`);
const shoe = staticFile('art/master-shoe-v2.webp');

function ImageShot({src, frame, detail = false, direction = 1}: {src: string; frame: number; detail?: boolean; direction?: number}) {
  const scale = detail ? 1.04 + frame * .00024 : 1.012 + frame * .00026;
  const pan = direction * frame * .035;
  return <AbsoluteFill style={{overflow:'hidden',background:'#080706'}}>
    <Img src={src} style={{width:'100%',height:'100%',objectFit:'cover',transform:`translateX(${pan}px) scale(${scale})`,filter: detail ? 'contrast(1.02)' : undefined}} />
    <AbsoluteFill style={{background:'radial-gradient(ellipse at 49% 55%,transparent 42%,#0009 100%),linear-gradient(0deg,#03030383,transparent 35%,transparent 72%,#03030365)'}} />
  </AbsoluteFill>;
}

function Opening() {
  const frame = useCurrentFrame();
  const appear = interpolate(frame,[0,18,55],[0,1,1],{extrapolateRight:'clamp'});
  return <AbsoluteFill style={{color:paper,background:'#070707'}}>
    <ImageShot src={room('master')} frame={frame} />
    <AbsoluteFill style={{background:'linear-gradient(90deg,#080706e9, #080706a0 45%,transparent 85%)'}} />
    <div style={{position:'absolute',left:112,top:242,opacity:appear}}>
      <div style={{font:`14px ${mono}`,letterSpacing:3,color:'#d6a17e'}}>EVENT 011 — 11 SECONDS MISSING</div>
      <h1 style={{font:'300 106px/.89 Arial,sans-serif',letterSpacing:-8,margin:'32px 0 22px'}}>ELEVEN SECONDS.<br/><i style={{fontFamily:'Georgia,serif',fontWeight:400,color:'#edcab4'}}>ZERO FRAMES.</i></h1>
      <div style={{font:'italic 26px Georgia,serif',color:'#e1cab7'}}>Four histories of an event no camera ever saw.</div>
      <div style={{font:`14px ${mono}`,letterSpacing:4,color:'#cbb7a8',marginTop:40}}>02:17:08 ━━━━━ 02:17:19</div>
    </div>
  </AbsoluteFill>;
}

function Chapter({index}: {index:number}) {
  const frame = useCurrentFrame();
  const scene = reconstructions[index];
  const cut = scene.id;
  const previous: ArtworkCut = index === 0 ? 'master' : reconstructions[index-1].id;
  const reveal = interpolate(frame,[0,34],[0,100],{extrapolateRight:'clamp'});
  const detail = frame >= 174 && frame < 219;
  const activeFrame = detail ? frame - 174 : frame < 174 ? frame : frame - 219;
  const accent = ['#efc4ae','#d2e4e8','#e9b76d','#f4dfb5'][index];
  const claimStyle = index === 1 ? {font:`56px ${mono}`,letterSpacing:-4} : index === 2 ? {font:'bold 72px Arial,sans-serif',letterSpacing:-4,textTransform:'uppercase' as const} : index === 3 ? {font:'64px Georgia,serif',letterSpacing:-3} : {font:'italic 68px Georgia,serif',letterSpacing:-3};
  const textOpacity = detail ? 0 : interpolate(frame,[0,24,45,164,172,220,233],[0,0,1,1,0,0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{color:paper,background:'#070707'}}>
    {!detail && <>
      {frame < 34 && <ImageShot src={room(previous)} frame={frame} direction={index%2 ? -1 : 1} />}
      <AbsoluteFill style={{clipPath:frame < 34 ? `inset(0 ${100-reveal}% 0 0)` : undefined}}><ImageShot src={room(cut)} frame={activeFrame} direction={index%2 ? 1 : -1} /></AbsoluteFill>
    </>}
    {detail && <ImageShot src={shoe} frame={activeFrame} detail direction={index%2 ? -1 : 1} />}
    <div style={{position:'absolute',top:57,left:77,font:`11px ${mono}`,letterSpacing:3,textShadow:'0 2px 12px #000'}}>CAM 06 / SYNTHETIC<br/><strong style={{display:'block',marginTop:12,font:`20px ${mono}`,letterSpacing:2}}>{eventTime(frame/24)}</strong></div>
    <div style={{position:'absolute',top:54,right:80,font:`15px ${mono}`,letterSpacing:3,color:accent}}>0{index+1} / 04</div>
    <div style={{position:'absolute',bottom:94,left:84,opacity:textOpacity,textShadow:'0 3px 22px #000'}}>
      <div style={{font:`13px ${mono}`,letterSpacing:3,color:accent}}>{scene.name} / RECONSTRUCTION 0{index+1}</div>
      <div style={{...claimStyle,margin:'16px 0 16px'}}>{scene.claim}</div>
      <div style={{font:`11px ${mono}`,letterSpacing:3,color:accent}}>{scene.imprint}</div>
    </div>
    <div style={{position:'absolute',bottom:0,left:0,width:`${frame/264*100}%`,height:2,background:accent}} />
  </AbsoluteFill>;
}

function Silence() {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background:'#000',color:'#9d958b'}}>
    <div style={{position:'absolute',bottom:'11%',width:'100%',textAlign:'center',font:`13px ${mono}`,letterSpacing:5}}>00:{String(Math.floor(frame/24)).padStart(2,'0')}</div>
  </AbsoluteFill>;
}

function Aftermath() {
  const frame = useCurrentFrame();
  const detailOpacity = interpolate(frame,[65,92,143,180],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const zeroOpacity = interpolate(frame,[10,31],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const verdictOpacity = interpolate(frame,[186,224],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{color:paper,background:'#060505'}}>
    <ImageShot src={room('final')} frame={frame} direction={-1} />
    <div style={{opacity:detailOpacity}}><ImageShot src={shoe} frame={Math.max(0,frame-65)} detail /></div>
    <div style={{position:'absolute',top:72,left:104,font:`12px ${mono}`,letterSpacing:3,opacity:zeroOpacity,textShadow:'0 2px 10px #000'}}>ORIGINAL FRAMES RECOVERED: 0</div>
    <div style={{position:'absolute',bottom:90,left:103,font:'300 91px/1.05 Arial,sans-serif',letterSpacing:-6,opacity:verdictOpacity,textShadow:'0 3px 30px #000'}}>NOTHING WAS RECORDED.<br/><i style={{fontFamily:'Georgia,serif',fontWeight:400,color:'#e7cbb1'}}>EVERYTHING WAS DECIDED.</i></div>
  </AbsoluteFill>;
}

export const Film = () => <AbsoluteFill style={{background:'#000'}}>
  <Sequence from={0} durationInFrames={1200}><Audio src={staticFile('tone-bed.wav')} volume={.9} /></Sequence>
  <Sequence from={0} durationInFrames={144}><Opening /></Sequence>
  {reconstructions.map((scene,index) => <Sequence key={scene.id} from={144+index*264} durationInFrames={264}><Chapter index={index} /></Sequence>)}
  <Sequence from={1200} durationInFrames={264}><Silence /></Sequence>
  <Sequence from={1464} durationInFrames={288}><Aftermath /></Sequence>
</AbsoluteFill>;
