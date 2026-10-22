import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto('http://127.0.0.1:5173/#/ajustes', { waitUntil: 'domcontentloaded' });
await page.evaluate(() => {
  localStorage.setItem(
    'manos-lsp-demo-v1',
    JSON.stringify({
      state: {
        onboardingCompleted: true,
        settings: {
          theme: 'dark',
          reducedMotion: false,
          showTextAlternatives: true,
          mirror: false,
        },
      },
      version: 1,
    }),
  );
});
await page.reload({ waitUntil: 'domcontentloaded' });
await new Promise((resolve) => setTimeout(resolve, 500));

const result = await page.evaluate(() => {
  const find = (text) =>
    [...document.querySelectorAll('p, div')].find(
      (element) => element.children.length === 0 && element.textContent?.includes(text),
    );
  const demo = [...document.querySelectorAll('div')].find(
    (element) => element.textContent?.startsWith('Contenido de demostración'),
  );
  const mutedParagraph = find('La app está enfocada exclusivamente');
  const noteText = demo?.querySelector('p');
  const style = (element) => {
    if (!element) return null;
    const computed = getComputedStyle(element);
    return { color: computed.color, background: computed.backgroundColor, fontSize: computed.fontSize };
  };
  return {
    dark: document.documentElement.classList.contains('dark'),
    demoNote: style(demo),
    demoNoteText: style(noteText),
    mutedParagraph: style(mutedParagraph),
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
