import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const outDir = '.screens';
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });

const errors = [];
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(String(error)));

const state = {
  onboardingCompleted: true,
  displayName: 'Prueba',
  dailyGoal: 20,
  xpTotal: 0,
  xpToday: 0,
  streakDays: 0,
  lastPracticeDate: null,
  completedLessonIds: [],
  bestCombo: 0,
  unlockedAchievementIds: [],
  viewedSignIds: [],
  settings: {
    theme: 'light',
    reducedMotion: false,
    showTextAlternatives: true,
    mirror: false,
  },
};

await page.goto('http://127.0.0.1:5173/#/onboarding', { waitUntil: 'domcontentloaded' });
await page.evaluate((nextState) => {
  localStorage.setItem('manos-lsp-demo-v1', JSON.stringify({ state: nextState, version: 1 }));
}, state);
await page.goto('http://127.0.0.1:5173/#/leccion/hola-adios', { waitUntil: 'domcontentloaded' });
await page.reload({ waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => document.body.innerText.includes('Empezar'), { timeout: 8000 });

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function clickText(label) {
  const count = await page.evaluate((text) => {
    const buttons = [...document.querySelectorAll('button')].filter((button) =>
      button.textContent?.replace(/\s+/g, ' ').trim().includes(text),
    );
    buttons[0]?.click();
    return buttons.length;
  }, label);
  if (count === 0) {
    const labels = await page.evaluate(() =>
      [...document.querySelectorAll('button')].map((button) =>
        button.textContent?.replace(/\s+/g, ' ').trim(),
      ),
    );
    throw new Error(`No button found with text: ${label}. Buttons: ${JSON.stringify(labels)}`);
  }
  await delay(180);
}

async function waitText(label) {
  await page.waitForFunction(
    (text) => document.body.innerText.includes(text),
    { timeout: 6000 },
    label,
  );
}

async function waitForButton(label) {
  await page.waitForFunction(
    (text) =>
      [...document.querySelectorAll('button')].some((button) =>
        button.textContent?.replace(/\s+/g, ' ').trim().includes(text),
      ),
    { timeout: 6000 },
    label,
  );
}

async function expectText(label) {
  const visible = await page.evaluate(
    (text) => document.body.innerText.toLowerCase().includes(text.toLowerCase()),
    label,
  );
  if (!visible) throw new Error(`Expected text not found: ${label}`);
  console.log(`ok: ${label}`);
}

async function screenshot(name) {
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
  console.log(`saved ${name}.png`);
}

const translations = {
  HOLA: 'Hola',
  ADIÓS: 'Adiós',
  GRACIAS: 'Gracias',
  'POR FAVOR': 'Por favor',
  'BUENOS DÍAS': 'Buenos días',
  MAMÁ: 'Mamá',
  PAPÁ: 'Papá',
  HERMANO: 'Hermano',
  FAMILIA: 'Familia',
  UNO: 'Uno',
  DOS: 'Dos',
  TRES: 'Tres',
  CUATRO: 'Cuatro',
  ROJO: 'Rojo',
  AZUL: 'Azul',
  AMARILLO: 'Amarillo',
  AGUA: 'Agua',
  PAN: 'Pan',
  LECHE: 'Leche',
  SÍ: 'Sí',
};

await clickText('Empezar');
await waitText('Comprobar');
console.log('lesson started');

// Exercise 1: make a deliberate mistake, verify retry, then solve it.
await page.evaluate(() => {
  const option = [...document.querySelectorAll('button[aria-pressed]')].find(
    (button) => !button.textContent?.includes('Hola'),
  );
  option?.click();
});
await delay(200);
await clickText('Comprobar');
await waitText('Casi lo tienes');
await expectText('La respuesta correcta era: Hola');
await expectText('Reintentar');
await screenshot('13-flow-feedback-wrong');

await clickText('Reintentar');
await clickText('Hola');
await clickText('Comprobar');
await waitText('¡Muy bien!');
await expectText('Lo lograste');
await screenshot('14-flow-feedback-retry');
await clickText('Continuar');

// Exercise 2: correct on the first try.
await waitForButton('Adiós');
await clickText('Adiós');
await clickText('Comprobar');
await waitText('¡Muy bien!');
await clickText('Continuar');

// Exercise 3: identify the matching sign from the written prompt.
await waitText('¿Cuál corresponde?');
await delay(400);
const promptTranslation = await page.evaluate(() => {
  const prompt = [...document.querySelectorAll('p')].find((item) =>
    item.textContent?.trim().startsWith('“'),
  );
  return prompt?.textContent?.replace(/[“”]/g, '').trim() ?? '';
});
const promptGloss = Object.entries(translations).find(([, value]) => value === promptTranslation)?.[0];
if (!promptGloss) throw new Error(`Could not resolve prompt: ${promptTranslation}`);
await page.evaluate((gloss) => {
  const option = [...document.querySelectorAll('button')].find((button) => {
    const label = button.querySelector('svg')?.getAttribute('aria-label') ?? '';
    return label.includes(`seña ${gloss} `);
  });
  option?.click();
}, promptGloss);
await delay(200);
await clickText('Comprobar');
await waitText('¡Muy bien!');
await clickText('Continuar');

// Exercise 4: match all pairs by gloss.
await waitText('Une cada seña con su significado');
await delay(400);
const pairGlosses = await page.evaluate(() =>
  [...document.querySelectorAll('button')]
    .filter((button) => button.textContent?.includes('Seña '))
    .map((button) => {
      const label = button.querySelector('svg')?.getAttribute('aria-label') ?? '';
      const match = label.match(/seña (.+) en LSP/);
      return match?.[1] ?? '';
    })
    .filter(Boolean),
);
if (pairGlosses.length !== 4) throw new Error(`Expected 4 pairs, found ${pairGlosses.length}`);

for (const gloss of pairGlosses) {
  await page.evaluate((targetGloss) => {
    const button = [...document.querySelectorAll('button')].find((candidate) => {
      const label = candidate.querySelector('svg')?.getAttribute('aria-label') ?? '';
      return label.includes(`seña ${targetGloss} `) && candidate.textContent?.includes('Seña ');
    });
    button?.click();
  }, gloss);
  await delay(120);
  const translation = translations[gloss];
  await page.evaluate((text) => {
    const button = [...document.querySelectorAll('button')].find(
      (candidate) =>
        !candidate.querySelector('svg') && candidate.textContent?.includes(text),
    );
    button?.click();
  }, translation);
  await delay(120);
}
await clickText('Comprobar');
await waitText('¡Muy bien!');
await screenshot('15-flow-match-pairs');
await clickText('Continuar');

// Exercise 5: put frames in order 1, 2, 3.
await waitText('Ordena los fotogramas');
await delay(400);
for (const frame of [1, 2, 3]) {
  await page.evaluate((label) => {
    const button = [...document.querySelectorAll('button')].find(
      (candidate) => candidate.getAttribute('aria-label') === `Añadir fotograma ${label}`,
    );
    button?.click();
  }, frame);
  await delay(160);
}
await clickText('Comprobar');
await waitText('¡Muy bien!');
await screenshot('16-flow-frame-order');
await clickText('Terminar lección');

await waitText('¡Muy bien hecho!');
await expectText('XP ganados');
await expectText('Precisión');
await expectText('Primera seña');
await screenshot('17-flow-result');

const saved = await page.evaluate(() => {
  const raw = localStorage.getItem('manos-lsp-demo-v1');
  return raw ? JSON.parse(raw).state : null;
});
if (!saved) throw new Error('No persisted state found');
if (!saved.completedLessonIds.includes('hola-adios')) {
  throw new Error('Lesson was not marked as completed');
}
if (!saved.unlockedAchievementIds.includes('first-lesson')) {
  throw new Error('First lesson achievement was not unlocked');
}
console.log('persisted completion:', saved.completedLessonIds, saved.xpTotal, saved.xpToday);
console.log('unlocked:', saved.unlockedAchievementIds);
console.log('errors:', errors.length ? errors : 'none');

await browser.close();
