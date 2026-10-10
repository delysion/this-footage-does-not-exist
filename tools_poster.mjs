import { chromium } from 'playwright';
import { mkdir, readFile } from 'node:fs/promises';

await mkdir('artifacts', {recursive:true});
const posterImage = (await readFile('public/art/room-final-v2.webp')).toString('base64');
const browser = await chromium.launch({headless:true,channel:'chrome'});
for (const [width,height,path] of [[1600,900,'artifacts/poster.png'],[1200,630,'public/preview.png']]) {
  const page = await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
  await page.setContent(`<!doctype html><meta charset="utf-8"><style>
  *{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#070605;color:#f3e9dc}
  img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.83)}
  .wash{position:absolute;inset:0;background:linear-gradient(90deg,#060504eb 0%,#0605047e 45%,transparent 80%),linear-gradient(0deg,#0009,transparent 42%)}
  .text{position:absolute;top:15%;left:7%;max-width:82%}.eyebrow{font:12px 'Courier New',monospace;letter-spacing:.24em;color:#dfad87}
  h1{font:300 ${width===1600?112:82}px/.88 Arial,sans-serif;letter-spacing:-.075em;margin:30px 0 29px}
  h1 i{font:italic 400 1em Georgia,serif;letter-spacing:-.065em;color:#eac8ad}
  .sub{font:italic ${width===1600?26:21}px Georgia,serif;color:#e6d2c1}
  .foot{position:absolute;bottom:7%;left:7%;font:12px 'Courier New',monospace;letter-spacing:.22em;color:#d2beab}
  </style><img src="data:image/webp;base64,${posterImage}"><div class="wash"></div><div class="text"><div class="eyebrow">EVENT 011 / NO SOURCE FRAMES</div><h1>ELEVEN SECONDS.<br><i>ZERO FRAMES.</i></h1><div class="sub">Four histories of an event no camera ever saw.</div></div><div class="foot">NOTHING WAS RECORDED. EVERYTHING WAS DECIDED.</div>`);
  await page.locator('img').evaluate(img => img.decode());
  await page.screenshot({path});
  await page.close();
}
await browser.close();
console.log('artifacts/poster.png and public/preview.png');
