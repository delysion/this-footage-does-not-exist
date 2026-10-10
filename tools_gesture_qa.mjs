import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const url = process.argv[2] ?? 'http://localhost:4174/';
const out = process.argv[3] ?? 'screenshots-gesture';
const targetSecond = Number(process.argv[4] ?? '12.5');
await mkdir(out, {recursive:true});
const browser = await chromium.launch({headless:true,channel:'chrome'});
const report = {url,shots:{},errors:[]};
for (const [cut,width,height] of [['romance',1440,900],['security',1440,900],['revolution',1440,900],['commerce',1440,900],['romance-mobile',390,844]]) {
  const page = await browser.newPage({viewport:{width,height}});
  page.on('pageerror',e => report.errors.push(e.message));
  page.on('console',m => {if(m.type()==='error')report.errors.push(m.text())});
  await page.goto(url,{waitUntil:'networkidle'});
  const chapter = cut.replace('-mobile','').toUpperCase();
  await page.getByRole('button',{name:new RegExp(chapter)}).click();
  await page.waitForFunction(target => {
    const text = document.querySelector('.timecode strong')?.textContent ?? '';
    return Number(text.slice(-5)) >= target;
  },targetSecond,{timeout:9000});
  const left = await page.locator('.gesture-left').evaluate(el => getComputedStyle(el).transform);
  const right = await page.locator('.gesture-right').evaluate(el => getComputedStyle(el).transform);
  const opacity = await page.locator('.gesture-shot').evaluate(el => getComputedStyle(el).opacity);
  await page.screenshot({path:`${out}/${cut}.png`});
  report.shots[cut] = {left,right,opacity};
  await page.close();
}
await browser.close();
console.log(JSON.stringify(report,null,2));
