import fs from 'node:fs';
import puppeteer from 'puppeteer-core';

const outDir = 'public/icons';
fs.mkdirSync(outDir, { recursive: true });

const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#8E70FF"/>
      <stop offset="1" stop-color="#5636D6"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" fill="url(#bg)"/>
  <circle cx="55" cy="9" r="17" fill="#ffffff" opacity=".08"/>
  <circle cx="8" cy="58" r="22" fill="#ffffff" opacity=".05"/>
  <path d="M22 54V37L17 30C15 27 17 24 20 24C22 24 23 25 25 27L28 31V14C28 11 30 9 33 9C36 9 38 11 38 14V26L41 22C43 19 47 20 48 23C49 25 48 27 46 29L43 33V31C43 28 45 26 48 26C51 26 53 28 53 31V39C53 48 47 54 38 54H22Z" fill="#ffffff"/>
  <path d="M28 37V42M34 35V43M40 36V42" stroke="#6C4CF1" stroke-width="2.4" stroke-linecap="round" opacity=".5"/>
</svg>`;

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
});

const page = await browser.newPage();

for (const { size, name } of [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 512, name: 'maskable-512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
]) {
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  await page.setContent(
    `<style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#5636D6}svg{display:block;width:100%;height:100%}</style>${iconSvg}`,
  );
  await page.screenshot({ path: `${outDir}/${name}`, type: 'png' });
  console.log(`saved ${outDir}/${name}`);
}

await browser.close();
