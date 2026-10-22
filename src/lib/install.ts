export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt: () => Promise<void>;
}

type InstallPromptListener = () => void;

const listeners = new Set<InstallPromptListener>();

const INSTALLED_FLAG_KEY = 'manos-lsp-installed';

declare global {
  interface Window {
    __manosInstallPrompt?: BeforeInstallPromptEvent;
    __manosInstallBound?: boolean;
  }
}

function notifyInstallPromptListeners() {
  listeners.forEach((listener) => listener());
}

if (typeof window !== 'undefined' && !window.__manosInstallBound) {
  window.__manosInstallBound = true;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.__manosInstallPrompt = event as BeforeInstallPromptEvent;
    notifyInstallPromptListeners();
  });

  window.addEventListener('appinstalled', () => {
    markAppInstalled();
  });
}

export function getInstallPrompt(): BeforeInstallPromptEvent | null {
  if (typeof window === 'undefined') return null;
  return window.__manosInstallPrompt ?? null;
}

export function subscribeInstallPrompt(listener: InstallPromptListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function hasInstalledFlag(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(INSTALLED_FLAG_KEY) === '1';
  } catch {
    return false;
  }
}

export function markAppInstalled() {
  window.__manosInstallPrompt = undefined;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(INSTALLED_FLAG_KEY, '1');
    } catch {
      // El modo privado puede bloquear localStorage; basta con el estado en memoria.
    }
  }
  notifyInstallPromptListeners();
}

export function clearInstalledFlag() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(INSTALLED_FLAG_KEY);
  } catch {
    // Ignorar fallos de storage.
  }
  notifyInstallPromptListeners();
}

export function isStandaloneDisplay(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function isIOSDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  const iPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || iPadOS;
}

const installTimeout = Symbol('install-timeout');

export async function promptAppInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
  const prompt = getInstallPrompt();
  if (!prompt) return 'unavailable';

  // Algunos navegadores (o entornos sin diálogo real) dejan `prompt()` o `userChoice` sin
  // resolver; con este tope el botón nunca se queda girando para siempre.
  const timeout = new Promise<typeof installTimeout>((resolve) => {
    setTimeout(() => resolve(installTimeout), 10_000);
  });

  const fail = (): 'unavailable' => {
    window.__manosInstallPrompt = undefined;
    notifyInstallPromptListeners();
    return 'unavailable';
  };

  try {
    const promptShown = await Promise.race([prompt.prompt().then(() => null), timeout]);
    if (promptShown === installTimeout) return fail();

    const choice = await Promise.race([prompt.userChoice, timeout]);
    if (choice === installTimeout) return fail();

    window.__manosInstallPrompt = undefined;
    notifyInstallPromptListeners();
    return choice.outcome;
  } catch {
    return fail();
  }
}
