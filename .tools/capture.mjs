import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const outDir = '.screens';
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--font-render-hinting=none'],
});

const errors = [];

async function newPage(width, height) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(String(error)));
  return page;
}

async function settle(page) {
  await page.waitForSelector('#root', { timeout: 10000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((resolve) => setTimeout(resolve, 700));
}

async function shot(page, name, fullPage = true) {
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage });
  console.log(`saved ${name}.png`);
}

const page = await newPage(1440, 1050);
await page.goto('http://127.0.0.1:5173/#/onboarding', { waitUntil: 'domcontentloaded' });
await settle(page);
await shot(page, '01-onboarding-desktop');

const state = {
  onboardingCompleted: true,
  displayName: 'Lucía',
  dailyGoal: 20,
  xpTotal: 80,
  xpToday: 35,
  streakDays: 3,
  lastPracticeDate: new Date().toISOString().slice(0, 10),
  completedLessonIds: ['hola-adios', 'cortesia', 'afirmar'],
  bestCombo: 4,
  unlockedAchievementIds: ['first-lesson', 'three-lessons'],
  viewedSignIds: ['hola', 'gracias', 'familia'],
  settings: {
    theme: 'light',
    reducedMotion: false,
    showTextAlternatives: true,
    mirror: false,
  },
};

await page.evaluate((nextState) => {
  localStorage.setItem(
    'manos-lsp-demo-v1',
    JSON.stringify({ state: nextState, version: 1 }),
  );
}, state);

await page.reload({ waitUntil: 'domcontentloaded' });
await settle(page);

await page.goto('http://127.0.0.1:5173/#/aprender', { waitUntil: 'domcontentloaded' });
await settle(page);
await shot(page, '02-home-desktop');

await page.goto('http://127.0.0.1:5173/#/diccionario', { waitUntil: 'domcontentloaded' });
await settle(page);
await shot(page, '03-dictionary-desktop');

await page.goto('http://127.0.0.1:5173/#/diccionario/hola', { waitUntil: 'domcontentloaded' });
await settle(page);
await shot(page, '04-detail-desktop');

await page.goto('http://127.0.0.1:5173/#/leccion/hola-adios', { waitUntil: 'domcontentloaded' });
await settle(page);
await shot(page, '05-lesson-intro-desktop');

await page.evaluate(() => {
  const button = [...document.querySelectorAll('button')].find((item) =>
    item.textContent?.includes('Empezar'),
  );
  button?.click();
});
await new Promise((resolve) => setTimeout(resolve, 700));
await shot(page, '06-lesson-exercise-desktop');

await page.evaluate(() => {
  const options = [...document.querySelectorAll('button')].filter((item) =>
    ['Hola', 'Adiós', 'Gracias', 'Agua', 'Pan', 'Familia', 'Uno', 'Dos'].some((label) =>
      item.textContent?.trim().startsWith(label),
    ),
  );
  options[0]?.click();
});
await new Promise((resolve) => setTimeout(resolve, 300));
await page.evaluate(() => {
  const button = [...document.querySelectorAll('button')].find((item) =>
    item.textContent?.includes('Comprobar'),
  );
  button?.click();
});
await new Promise((resolve) => setTimeout(resolve, 500));
await shot(page, '07-lesson-feedback-desktop');

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://127.0.0.1:5173/#/aprender', { waitUntil: 'domcontentloaded' });
await settle(page);
await shot(page, '08-home-mobile', false);

await page.goto('http://127.0.0.1:5173/#/diccionario', { waitUntil: 'domcontentloaded' });
await settle(page);
await shot(page, '09-dictionary-mobile', false);

await page.goto('http://127.0.0.1:5173/#/diccionario/hola', { waitUntil: 'domcontentloaded' });
await settle(page);
await shot(page, '10-detail-mobile', false);

await page.goto('http://127.0.0.1:5173/#/leccion/hola-adios', { waitUntil: 'domcontentloaded' });
await settle(page);
await shot(page, '11-lesson-mobile', false);

await page.evaluate(() => localStorage.clear());
await page.goto('http://127.0.0.1:5173/#/onboarding', { waitUntil: 'domcontentloaded' });
await page.reload({ waitUntil: 'domcontentloaded' });
await settle(page);
await shot(page, '12-onboarding-mobile', false);

await browser.close();
console.log('errors:', errors.length ? errors : 'none');
