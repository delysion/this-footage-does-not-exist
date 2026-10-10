import { chromium } from 'playwright';

const browser = await chromium.launch({headless:true,channel:'chrome'});
const page = await browser.newPage({viewport:{width:1280,height:720}});
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.goto('http://127.0.0.1:8010/tools_video_check.html');
const results = [];
for (const [label,file,seek] of [['A','ending-A-existing.mp4',71],['B','ending-B-action.mp4',67.4]]) {
  const video = page.locator('video');
  await video.evaluate((element, source) => {element.src=source;element.load();}, `/artifacts/${file}`);
  await page.waitForFunction(() => document.querySelector('video').readyState >= 1,undefined,{timeout:20000});
  await video.evaluate((element,time) => {element.currentTime=time;},seek);
  await page.waitForFunction(time => {
    const element = document.querySelector('video');
    return Math.abs(element.currentTime-time)<0.1 && element.readyState>=2;
  },seek,{timeout:20000});
  const before = await video.evaluate(element => element.currentTime);
  await video.evaluate(element => element.play());
  await page.waitForTimeout(1200);
  const after = await video.evaluate(element => element.currentTime);
  const state = await video.evaluate(element => ({duration:element.duration,width:element.videoWidth,height:element.videoHeight,readyState:element.readyState,paused:element.paused,error:element.error?.message??null}));
  await page.screenshot({path:`artifacts/endings/ending-${label}-browser-playback.png`});
  results.push({label,before,after,...state,playbackAdvanced:after>before+.5});
  await video.evaluate(element => element.pause());
}
await browser.close();
console.log(JSON.stringify({results,errors},null,2));
if(errors.length || results.some(item=>!item.playbackAdvanced || item.error || item.width!==1600 || item.height!==900)) process.exitCode=1;
