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
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });

const errors = [];
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(String(error)));

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
  if (count === 0) throw new Error(`No button found with text: ${label}`);
  await delay(220);
}

async function waitText(label) {
  await page.waitForFunction(
    (text) => document.body.innerText.toLowerCase().includes(text.toLowerCase()),
    { timeout: 7000 },
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

async function screenshot(name, fullPage = true) {
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage });
  console.log(`saved ${name}.png`);
}

await page.goto('http://127.0.0.1:5173/#/onboarding', { waitUntil: 'domcontentloaded' });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'domcontentloaded' });
await waitText('Tus manos ya saben');
await delay(300);

// Onboarding flow: goal and summary.
await clickText('Empezar');
await waitText('¿Cuánto quieres practicar?');
await delay(350);
await screenshot('18-onboarding-goal-desktop');
await clickText('Intenso');
await clickText('Continuar');
await waitText('Tu primera seña te espera');
await delay(350);
await screenshot('19-onboarding-summary-desktop');
await clickText('Empezar a aprender');
await waitText('Tu siguiente paso');
await delay(500);

const afterOnboarding = await page.evaluate(() => {
  const raw = localStorage.getItem('manos-lsp-demo-v1');
  return raw ? JSON.parse(raw).state : null;
});
if (!afterOnboarding?.onboardingCompleted) throw new Error('Onboarding was not completed');
if (afterOnboarding.dailyGoal !== 30) throw new Error('Daily goal was not saved');
console.log('ok: onboarding state persisted with dailyGoal', afterOnboarding.dailyGoal);

// The onboarding route must not be reachable once completed.
await page.goto('http://127.0.0.1:5173/#/onboarding', { waitUntil: 'domcontentloaded' });
await delay(400);
if (!page.url().endsWith('#/aprender')) {
  throw new Error(`Expected onboarding redirect, got ${page.url()}`);
}
console.log('ok: completed onboarding redirects to /aprender');

// Settings and theme.
await page.goto('http://127.0.0.1:5173/#/ajustes', { waitUntil: 'domcontentloaded' });
await waitText('Apariencia');
await delay(300);
await screenshot('20-settings-desktop');
await clickText('Oscuro');
await delay(400);
const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
if (!isDark) throw new Error('Dark theme was not applied');
console.log('ok: dark theme applied');
await clickText('Oscuro');
await page.click('button[aria-label="Reducir movimiento"]');
await page.click('button[aria-label="Descripciones de texto"]');
await delay(350);
await screenshot('21-settings-dark-desktop');
const settingsState = await page.evaluate(() => {
  const raw = localStorage.getItem('manos-lsp-demo-v1');
  return raw ? JSON.parse(raw).state.settings : null;
});
if (!settingsState?.reducedMotion) throw new Error('Reduced motion was not saved');
if (settingsState?.showTextAlternatives) throw new Error('Text alternatives toggle was not saved');
console.log('ok: accessibility settings persisted');

await page.goto('http://127.0.0.1:5173/#/aprender', { waitUntil: 'domcontentloaded' });
await delay(500);
await screenshot('22-home-dark-desktop');

// Stubs and profile.
await page.goto('http://127.0.0.1:5173/#/practicar', { waitUntil: 'domcontentloaded' });
await waitText('Práctica libre');
await expectText('Próximamente');
await expectText('Sin cámara en esta demo');
await screenshot('23-practice-dark-desktop');

await page.goto('http://127.0.0.1:5173/#/clasificacion', { waitUntil: 'domcontentloaded' });
await waitText('Liga Manos');
await expectText('La clasificación todavía no está disponible');
await screenshot('24-leaderboard-dark-desktop');

await page.goto('http://127.0.0.1:5173/#/perfil', { waitUntil: 'domcontentloaded' });
await waitText('Pequeños grandes pasos');
await expectText('Primera seña');
await screenshot('25-profile-dark-desktop');

// Mobile settings and profile.
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://127.0.0.1:5173/#/ajustes', { waitUntil: 'domcontentloaded' });
await waitText('Apariencia');
await delay(350);
await screenshot('26-settings-mobile', false);

await page.goto('http://127.0.0.1:5173/#/perfil', { waitUntil: 'domcontentloaded' });
await waitText('Pequeños grandes pasos');
await delay(350);
await screenshot('27-profile-mobile', false);

// Reset demo from settings.
await page.goto('http://127.0.0.1:5173/#/ajustes', { waitUntil: 'domcontentloaded' });
await waitText('Datos de la demo');
await clickText('Reiniciar demo');
await waitText('¿Reiniciar la demo?');
await clickText('Sí, reiniciar');
await waitText('Tus manos ya saben');
await delay(400);
if (!page.url().endsWith('#/onboarding')) {
  throw new Error(`Expected onboarding after reset, got ${page.url()}`);
}
const resetState = await page.evaluate(() => {
  const raw = localStorage.getItem('manos-lsp-demo-v1');
  return raw ? JSON.parse(raw).state : null;
});
if (resetState?.onboardingCompleted) throw new Error('Reset did not clear onboarding');
console.log('ok: demo reset returns to onboarding');
await screenshot('28-onboarding-reset-mobile', false);

console.log('errors:', errors.length ? errors : 'none');
await browser.close();
