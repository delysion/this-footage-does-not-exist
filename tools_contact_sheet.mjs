import { chromium } from 'playwright';
import { mkdir, readFile } from 'node:fs/promises';

await mkdir('artifacts', { recursive: true });
const frames = [
  ['00 / ROOM', 'master-room-v2.webp'],
  ['01 / MEMORIAL', 'room-romance-v2.webp'],
  ['02 / EVIDENCE', 'room-security-v2.webp'],
  ['03 / MONUMENT', 'room-revolution-v2.webp'],
  ['04 / PRODUCT', 'room-commerce-v2.webp'],
  ['05 / AFTERMATH', 'room-final-v2.webp'],
];
const figures = await Promise.all(frames.map(async ([name,file]) => {
  const data = await readFile(`public/art/${file}`);
  return `<figure><img src="data:image/webp;base64,${data.toString('base64')}"><figcaption>${name}</figcaption></figure>`;
}));
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1800, height: 800 }, deviceScaleFactor: 1 });
await page.setContent(`<!doctype html><style>
  *{box-sizing:border-box}body{margin:0;padding:20px;background:#0a0908;color:#dbd2c6;font:11px 'Courier New',monospace;letter-spacing:.2em}
  main{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}figure{margin:0;background:#151311}
  img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}figcaption{padding:13px 3px 1px}
</style><main>${figures.join('')}</main>`);
await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
await page.screenshot({ path: 'artifacts/six-frame-contact-sheet.png', fullPage: true });
await browser.close();
console.log('artifacts/six-frame-contact-sheet.png');
