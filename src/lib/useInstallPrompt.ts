import { useCallback, useEffect, useState } from 'react';
import {
  getInstallPrompt,
  hasInstalledFlag,
  isIOSDevice,
  isStandaloneDisplay,
  markAppInstalled,
  promptAppInstall,
  subscribeInstallPrompt,
} from './install';

export function useInstallPrompt() {
  const [hasPrompt, setHasPrompt] = useState(() => Boolean(getInstallPrompt()));
  const [isInstalled, setIsInstalled] = useState(() => isStandaloneDisplay() || hasInstalledFlag());
  const isIOS = isIOSDevice();

  useEffect(() => {
    const syncPrompt = () => setHasPrompt(Boolean(getInstallPrompt()));
    const syncInstalled = () => setIsInstalled(isStandaloneDisplay() || hasInstalledFlag());
    const unsubscribe = subscribeInstallPrompt(syncPrompt);
    const displayMode = window.matchMedia('(display-mode: standalone)');

    displayMode.addEventListener('change', syncInstalled);
    window.addEventListener('appinstalled', syncInstalled);

    return () => {
      unsubscribe();
      displayMode.removeEventListener('change', syncInstalled);
      window.removeEventListener('appinstalled', syncInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    const outcome = await promptAppInstall();
    setHasPrompt(Boolean(getInstallPrompt()));
    if (outcome === 'accepted') {
      markAppInstalled();
      setIsInstalled(true);
    }
    return outcome;
  }, []);

  return {
    canInstall: hasPrompt,
    isInstalled,
    isIOS,
    install,
  };
}
