import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const outDir = '.screens';
fs.mkdirSync(outDir, { recursive: true });

const base = process.env.BASE_URL ?? 'http://127.0.0.1:5173';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--font-render-hinting=none'],
});

const errors = [];
const page = await browser.newPage();
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(String(error)));

async function settle() {
  await page.waitForSelector('#root', { timeout: 10000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((resolve) => setTimeout(resolve, 700));
}

async function assert(condition, label) {
  if (!condition) {
    console.error(`FAIL: ${label}`);
    await browser.close();
    process.exit(1);
  }
  console.log(`ok: ${label}`);
}

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

// --- mobile: install card visible on home ---
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(`${base}/#/aprender`, { waitUntil: 'domcontentloaded' });
await page.evaluate((nextState) => {
  localStorage.setItem('manos-lsp-demo-v1', JSON.stringify({ state: nextState, version: 1 }));
}, state);
await page.reload({ waitUntil: 'domcontentloaded' });
await settle();

const cardInfo = await page.evaluate(() => {
  const card = document.querySelector('[aria-labelledby="install-app-title"]');
  const button = card?.querySelector('button');
  return {
    visible: Boolean(card),
    label: button?.textContent?.trim() ?? '',
    promptAvailable: Boolean(window.__manosInstallPrompt),
  };
});
await assert(cardInfo.visible, 'mobile home shows install card');
console.log(`info: card action "${cardInfo.label}" (native prompt available: ${cardInfo.promptAvailable})`);
await page.screenshot({ path: `${outDir}/29-install-card-mobile.png` });
console.log('saved 29-install-card-mobile.png');

if (cardInfo.promptAvailable) {
  // --- native install prompt path (headless Chrome fires beforeinstallprompt on localhost) ---
  await page.evaluate(() => {
    const event = window.__manosInstallPrompt;
    const originalPrompt = event.prompt.bind(event);
    event.prompt = () => {
      window.__manosPromptCalls = (window.__manosPromptCalls ?? 0) + 1;
      return originalPrompt();
    };
  });

  await page.evaluate(() => {
    const card = document.querySelector('[aria-labelledby="install-app-title"]');
    card?.querySelector('button')?.click();
  });
  await new Promise((resolve) => setTimeout(resolve, 400));

  const afterClick = await page.evaluate(() => ({
    promptCalls: window.__manosPromptCalls ?? 0,
    label: document
      .querySelector('[aria-labelledby="install-app-title"] button')
      ?.textContent?.trim(),
  }));
  await assert(afterClick.promptCalls === 1, 'native prompt was invoked once');
  await assert(
    afterClick.label?.includes('Abriendo instalador') === true,
    'card shows loading state while installer is open',
  );

  // Safety timeout: if the browser never resolves `userChoice`, the button must recover.
  await new Promise((resolve) => setTimeout(resolve, 11_000));
  const recovered = await page.evaluate(() => ({
    label: document
      .querySelector('[aria-labelledby="install-app-title"] button')
      ?.textContent?.trim(),
    promptAvailable: Boolean(window.__manosInstallPrompt),
  }));
  await assert(
    recovered.label === 'Cómo instalar' && recovered.promptAvailable === false,
    `button recovers after unanswered prompt (label "${recovered.label}")`,
  );
}

// --- fallback instructions modal ---
await page.evaluate(() => {
  const card = document.querySelector('[aria-labelledby="install-app-title"]');
  card?.querySelector('button')?.click();
});
await new Promise((resolve) => setTimeout(resolve, 500));

const helpOpen = await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]');
  return Boolean(
    dialog &&
      dialog.textContent?.includes('Instala Manos en tu teléfono') &&
      dialog.textContent?.includes('Añadir a pantalla de inicio'),
  );
});
await assert(helpOpen, 'fallback opens instructions modal');
await new Promise((resolve) => setTimeout(resolve, 700));
await page.screenshot({ path: `${outDir}/30-install-help-mobile.png` });
console.log('saved 30-install-help-mobile.png');

await page.evaluate(() => {
  const button = [...document.querySelectorAll('button')].find(
    (item) => item.textContent?.trim() === 'Entendido',
  );
  button?.click();
});
await new Promise((resolve) => setTimeout(resolve, 900));
const modalClosed = await page.evaluate(
  () => document.querySelectorAll('[role="dialog"]').length === 0,
);
await assert(modalClosed, 'instructions modal closes');

// --- card hides once the app is installed ---
await page.evaluate(() => {
  window.dispatchEvent(new Event('appinstalled'));
});
await new Promise((resolve) => setTimeout(resolve, 400));
const hiddenAfterInstall = await page.evaluate(
  () => !document.querySelector('[aria-labelledby="install-app-title"]'),
);
await assert(hiddenAfterInstall, 'install card hides after appinstalled');
await page.screenshot({ path: `${outDir}/31-install-accepted-mobile.png` });
console.log('saved 31-install-accepted-mobile.png');

await page.reload({ waitUntil: 'domcontentloaded' });
await settle();
const hiddenAfterReload = await page.evaluate(
  () => !document.querySelector('[aria-labelledby="install-app-title"]'),
);
await assert(hiddenAfterReload, 'install card stays hidden after reload (flag persisted)');

// --- desktop: card hidden ---
await page.evaluate(() => localStorage.removeItem('manos-lsp-installed'));
await page.setViewport({ width: 1440, height: 1050, deviceScaleFactor: 1 });
await page.goto(`${base}/#/aprender`, { waitUntil: 'domcontentloaded' });
await settle();
const desktopHidden = await page.evaluate(() => {
  const card = document.querySelector('[aria-labelledby="install-app-title"]');
  return !card || card.checkVisibility() === false;
});
await assert(desktopHidden, 'install card hidden on desktop (lg)');

// --- manifest + icons reachable ---
const manifestLink = await page.evaluate(
  () => document.querySelector('link[rel="manifest"]')?.getAttribute('href') ?? '',
);
await assert(manifestLink.includes('manifest.webmanifest'), 'index links the web app manifest');

const manifest = await page.evaluate(async () => {
  const response = await fetch('./manifest.webmanifest');
  if (!response.ok) return null;
  return response.json();
});
await assert(
  Boolean(
    manifest &&
      manifest.short_name === 'Manos' &&
      manifest.display === 'standalone' &&
      manifest.start_url &&
      manifest.icons?.length >= 3,
  ),
  'manifest is valid (name, display, start_url, icons)',
);

const iconStatuses = await page.evaluate(async () => {
  const paths = [
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/maskable-512.png',
    './icons/apple-touch-icon.png',
  ];
  return Promise.all(paths.map(async (path) => (await fetch(path, { method: 'HEAD' })).status));
});
await assert(
  iconStatuses.every((status) => status === 200),
  `all install icons are served (${iconStatuses.join(', ')})`,
);

// --- service worker (only expected on production builds) ---
if (process.env.EXPECT_SW === '1') {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const swInfo = await page.evaluate(async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    return {
      count: registrations.length,
      active: registrations.some((reg) => reg.active?.state === 'activated'),
      controlled: Boolean(navigator.serviceWorker.controller),
    };
  });
  await assert(
    swInfo.count >= 1 && swInfo.active && swInfo.controlled,
    `service worker registered and controlling the page (${JSON.stringify(swInfo)})`,
  );
}

await browser.close();
console.log('errors:', errors.length ? errors : 'none');
if (errors.length) process.exit(1);
