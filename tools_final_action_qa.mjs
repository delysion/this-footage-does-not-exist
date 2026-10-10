import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const url = process.argv[2] ?? 'http://localhost:4174/';
const directory = process.argv[3] ?? 'screenshots-ending-B';
await mkdir(directory, {recursive:true});
const browser = await chromium.launch({headless:true,channel:'chrome'});
const results = [];
for (const [label,width,height] of [['desktop',1440,900],['mobile',390,844]]) {
  const page = await browser.newPage({viewport:{width,height}});
  const errors = [];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error') errors.push(m.text());});
  page.on('response',r=>{if(r.status()>=400) errors.push(`${r.status()} ${r.url()}`);});
  await page.goto(url,{waitUntil:'networkidle'});
  await page.getByRole('button',{name:/ENTER THE GAP/}).click();
  await page.getByRole('button',{name:/SHOW ORIGINAL FOOTAGE/}).click();
  const clockOnly = await page.locator('.silence-timecode').isVisible() && await page.locator('.aftermath-action').count()===0;
  await page.locator('.aftermath-action').waitFor({state:'visible',timeout:14000});
  await page.waitForTimeout(1200);
  await page.screenshot({path:`${directory}/${label}-room-return.png`});
  await page.waitForTimeout(5200);
  await page.screenshot({path:`${directory}/${label}-glass-contact.png`});
  const contact = await page.locator('.aftermath-contact').evaluate(e=>getComputedStyle(e).opacity);
  await page.waitForTimeout(2600);
  await page.screenshot({path:`${directory}/${label}-withdrawal.png`});
  const noSlogan = await page.getByText('NOTHING WAS RECORDED.').count()===0;
  const overflow = await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  results.push({label,clockOnly,contact,noSlogan,overflow,errors});
  await page.close();
}
await browser.close();
console.log(JSON.stringify({url,results},null,2));
if(results.some(r=>!r.clockOnly||!r.noSlogan||r.overflow||r.errors.length)) process.exitCode=1;
