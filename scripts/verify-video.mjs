import { chromium } from 'playwright';

const browser = await chromium.launch({headless:true, executablePath:process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const page = await browser.newPage();
await page.goto(process.env.QA_URL || 'http://localhost:4173/',{waitUntil:'networkidle'});
const result=await page.evaluate(async()=>{
 const v=document.createElement('video');v.src='/this-footage-does-not-exist.mp4';v.muted=true;v.controls=true;v.preload='auto';v.style.width='960px';v.style.height='540px';document.body.appendChild(v);v.load();
 await new Promise((resolve,reject)=>{v.addEventListener('loadedmetadata',resolve,{once:true});v.addEventListener('error',()=>reject(new Error(`video error ${v.error?.code}`)),{once:true});setTimeout(()=>reject(new Error('metadata timeout')),15000)});
 await v.play(); const before=v.currentTime;await new Promise(r=>setTimeout(r,1800));
 return {durationSeconds:v.duration,width:v.videoWidth,height:v.videoHeight,readyState:v.readyState,advancedSeconds:+(v.currentTime-before).toFixed(2),audioTracksApi:('audioTracks' in v)?v.audioTracks.length:'unavailable in Chromium'};
});
await page.locator('video').screenshot({path:'screenshots/video-playback.png'});
console.log(JSON.stringify(result,null,2));
if(result.durationSeconds<59||result.advancedSeconds<1||!result.width||!result.height)process.exitCode=1;
await browser.close();
