import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const url = process.argv[2] ?? 'http://localhost:4174/';
await mkdir('screenshots', { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const failures = [];
const report = { url, desktop: {}, tablet: {}, mobile: {}, reducedMotion: {}, failures };
const captureErrors = page => {
  page.on('pageerror', error => failures.push(`pageerror: ${error.message}`));
  page.on('console', message => { if (message.type() === 'error') failures.push(`console: ${message.text()}`); });
  page.on('response', response => { if (response.status() >= 400) failures.push(`HTTP ${response.status()}: ${response.url()}`); });
};
const chapterNames = ['ROMANCE', 'SECURITY', 'REVOLUTION', 'COMMERCE'];
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
captureErrors(desktop);
await desktop.goto(url, { waitUntil: 'networkidle' });
report.desktop.title = await desktop.title();
await desktop.screenshot({ path: 'screenshots/opening-desktop.png' });
await desktop.getByRole('button', { name: /ENTER THE GAP/ }).click();
for (const [index, name] of chapterNames.entries()) {
  if (index) await desktop.getByRole('button', { name: new RegExp(name) }).click();
  await desktop.waitForTimeout(750);
  const time = await desktop.locator('.timecode strong').innerText();
  const artwork = await desktop.locator('.scene-art').getAttribute('aria-label');
  report.desktop[name.toLowerCase()] = { time, artwork, visible: await desktop.getByText(`RECONSTRUCTION 0${index+1}`).count() > 0 };
  await desktop.screenshot({ path: `screenshots/${name.toLowerCase()}-desktop.png` });
}
await desktop.getByRole('button', { name: 'Pause sequence' }).click();
const pausedAt = await desktop.locator('.timecode strong').innerText();
await desktop.waitForTimeout(450);
report.desktop.pause = pausedAt === await desktop.locator('.timecode strong').innerText();
await desktop.getByRole('button', { name: 'Play sequence' }).click();
await desktop.waitForTimeout(450);
report.desktop.play = pausedAt !== await desktop.locator('.timecode strong').innerText();
await desktop.locator('.sound-control').click();
report.desktop.soundOn = await desktop.locator('.sound-control').getAttribute('aria-pressed') === 'true';
await desktop.locator('.sound-control').click();
await desktop.keyboard.press('ArrowLeft');
report.desktop.keyboardLeft = await desktop.locator('.installation').getAttribute('class').then(value => value.includes('revolution'));
await desktop.keyboard.press('ArrowRight');
report.desktop.keyboardRight = await desktop.locator('.installation').getAttribute('class').then(value => value.includes('commerce'));
const preciseSilenceDuration = desktop.evaluate(() => new Promise(resolve => {
  const root = document.querySelector('.installation');
  const trigger = document.querySelector('.end-action button');
  trigger.addEventListener('click', () => {
    const startedAt = performance.now();
    const observer = new MutationObserver(() => {
      if (root.classList.contains('phase-zero')) {
        observer.disconnect();
        resolve(Math.round(performance.now() - startedAt));
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
  }, { once: true });
}));
await desktop.getByRole('button', { name: /SHOW ORIGINAL FOOTAGE/ }).click();
report.desktop.sourceBlank = await desktop.locator('.scene-art').count() === 0;
report.desktop.clockStartsAtZero = await desktop.locator('.silence-timecode').innerText() === '00:00';
await desktop.waitForTimeout(5000);
await desktop.screenshot({ path: 'screenshots/silence-desktop.png' });
report.desktop.onlyClockDuringSilence = await desktop.locator('.zero-line').count() === 0 && await desktop.locator('.reveal').innerText() === await desktop.locator('.silence-timecode').innerText();
await desktop.locator('.zero-line').waitFor({ state: 'visible', timeout: 9000 });
report.desktop.silenceDurationMs = await preciseSilenceDuration;
report.desktop.silenceDurationPass = report.desktop.silenceDurationMs >= 11000 && report.desktop.silenceDurationMs <= 11100;
await desktop.getByRole('heading', { name: /FOUR HISTORIES/ }).waitFor({ state: 'visible', timeout: 5000 });
await desktop.waitForTimeout(2200);
await desktop.screenshot({ path: 'screenshots/reveal-desktop.png' });
report.desktop.reveal = await desktop.locator('.reveal').innerText();
await desktop.getByRole('button', { name: /REPLAY/ }).click();
report.desktop.replay = await desktop.getByRole('heading', { name: /ELEVEN SECONDS/ }).isVisible();
await desktop.getByRole('button', { name: /ENTER THE GAP/ }).click();
await desktop.keyboard.press('Escape');
report.desktop.keyboardEscape = await desktop.getByRole('heading', { name: /ELEVEN SECONDS/ }).isVisible();
await desktop.reload({ waitUntil: 'networkidle' });
report.desktop.hardRefresh = await desktop.getByRole('button', { name: /ENTER THE GAP/ }).isVisible();
report.desktop.overflow = await desktop.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
await desktop.close();

const tablet = await browser.newPage({ viewport: { width: 768, height: 1024 }, deviceScaleFactor: 1 });
captureErrors(tablet);
await tablet.goto(url, { waitUntil: 'networkidle' });
await tablet.getByRole('button', { name: /ENTER THE GAP/ }).click();
report.tablet.chapterVisible = await tablet.getByRole('button', { name: /SHOW ORIGINAL FOOTAGE/ }).isVisible();
report.tablet.overflow = await tablet.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
await tablet.screenshot({ path: 'screenshots/romance-tablet.png' });
await tablet.close();

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
captureErrors(mobile);
await mobile.goto(url, { waitUntil: 'networkidle' });
await mobile.screenshot({ path: 'screenshots/opening-mobile.png' });
await mobile.getByRole('button', { name: /ENTER THE GAP/ }).click();
for (const [index, name] of chapterNames.entries()) {
  if (index) await mobile.getByRole('button', { name: new RegExp(name) }).click();
  report.mobile[name.toLowerCase()] = await mobile.locator('.scene-art').isVisible();
  await mobile.screenshot({ path: `screenshots/${name.toLowerCase()}-mobile.png` });
}
await mobile.getByRole('button', { name: /SHOW ORIGINAL FOOTAGE/ }).click();
await mobile.screenshot({ path: 'screenshots/silence-mobile.png' });
await mobile.getByRole('heading', { name: /FOUR HISTORIES/ }).waitFor({ state: 'visible', timeout: 16000 });
await mobile.waitForTimeout(2200);
await mobile.screenshot({ path: 'screenshots/reveal-mobile.png' });
report.mobile.overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
await mobile.close();

const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
captureErrors(reduced);
await reduced.goto(url, { waitUntil: 'networkidle' });
await reduced.getByRole('button', { name: /ENTER THE GAP/ }).click();
const before = await reduced.locator('.timecode strong').innerText();
await reduced.waitForTimeout(1000);
report.reducedMotion.timeStatic = before === await reduced.locator('.timecode strong').innerText();
await reduced.getByRole('button', { name: /SHOW ORIGINAL FOOTAGE/ }).click();
report.reducedMotion.clockVisible = await reduced.locator('.silence-timecode').isVisible();
await reduced.locator('.zero-line').waitFor({ state: 'visible', timeout: 14000 });
report.reducedMotion.elevenSecondSilenceRetained = await reduced.locator('.zero-line').isVisible();
await reduced.close();

const poster = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await poster.goto(url, { waitUntil: 'networkidle' });
await poster.screenshot({ path: 'public/preview.png' });
await poster.close();
await browser.close();
console.log(JSON.stringify(report, null, 2));
if (failures.length || report.desktop.overflow || report.mobile.overflow || !report.desktop.silenceDurationPass) process.exitCode = 1;
