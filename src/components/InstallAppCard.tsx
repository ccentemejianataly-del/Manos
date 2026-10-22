import { useState } from 'react';
import type { ReactNode } from 'react';
import { Download, Loader2, MoreVertical, Share, Smartphone } from 'lucide-react';
import { Modal } from './Modal';
import { useInstallPrompt } from '../lib/useInstallPrompt';
import { cn } from '../lib/utils';

interface InstallAppCardProps {
  className?: string;
}

function InstallStep({ number, children }: { number: number; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 text-[11px] font-black text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
        {number}
      </span>
      <span className="pt-0.5 text-xs font-semibold leading-5 text-muted">{children}</span>
    </li>
  );
}

export function InstallAppCard({ className }: InstallAppCardProps) {
  const { canInstall, isInstalled, isIOS, install } = useInstallPrompt();
  const [helpOpen, setHelpOpen] = useState(false);
  const [installing, setInstalling] = useState(false);

  if (isInstalled) return null;

  const handleInstall = async () => {
    if (!canInstall) {
      setHelpOpen(true);
      return;
    }

    setInstalling(true);
    try {
      await install();
    } finally {
      setInstalling(false);
    }
  };

  const actionLabel = canInstall ? 'Instalar app' : isIOS ? 'Añadir a inicio' : 'Cómo instalar';

  return (
    <>
      <section
        className={cn(
          'relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 via-card to-card p-4 shadow-soft dark:border-brand-800/70 dark:from-brand-900/25 dark:via-card dark:to-card',
          className,
        )}
        aria-labelledby="install-app-title"
      >
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-500 text-white shadow-lift">
            <Smartphone className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p id="install-app-title" className="text-sm font-extrabold text-ink">
              Instala Manos en tu teléfono
            </p>
            <p className="mt-1 text-[11px] font-semibold leading-5 text-muted">
              Añade el ícono a tu pantalla de inicio y ábrela como una app.
            </p>
            <button
              type="button"
              onClick={handleInstall}
              disabled={installing}
              className="btn-primary mt-3 w-full py-2.5 text-xs"
            >
              {installing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {installing ? 'Abriendo instalador…' : actionLabel}
            </button>
            <p className="mt-2 text-center text-[10px] font-semibold text-muted">
              No requiere tienda ni cuenta.
            </p>
          </div>
        </div>
      </section>

      <Modal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        title="Instala Manos en tu teléfono"
        description="Añade el ícono a la pantalla de inicio y abre la demo como una app."
        size="sm"
        footer={
          <button type="button" onClick={() => setHelpOpen(false)} className="btn-primary w-full">
            Entendido
          </button>
        }
      >
        <ol className="space-y-3">
          {isIOS ? (
            <>
              <InstallStep number={1}>
                Abre esta página en <strong className="text-ink">Safari</strong>.
              </InstallStep>
              <InstallStep number={2}>
                Toca el botón <strong className="text-ink">Compartir</strong>{' '}
                <Share className="inline h-3.5 w-3.5 -translate-y-px" aria-hidden="true" /> en la
                barra del navegador.
              </InstallStep>
              <InstallStep number={3}>
                Elige <strong className="text-ink">Añadir a pantalla de inicio</strong>.
              </InstallStep>
              <InstallStep number={4}>
                Confirma con <strong className="text-ink">Añadir</strong>.
              </InstallStep>
            </>
          ) : (
            <>
              <InstallStep number={1}>
                Abre el menú del navegador{' '}
                <MoreVertical className="inline h-3.5 w-3.5 -translate-y-px" aria-hidden="true" />.
              </InstallStep>
              <InstallStep number={2}>
                Busca <strong className="text-ink">Instalar aplicación</strong> o{' '}
                <strong className="text-ink">Añadir a pantalla de inicio</strong>.
              </InstallStep>
              <InstallStep number={3}>
                Confirma la instalación. El ícono aparecerá junto a tus otras apps.
              </InstallStep>
            </>
          )}
        </ol>

        <div className="mt-4 rounded-2xl bg-surface/70 p-3 text-[11px] font-semibold leading-5 text-muted">
          {isIOS
            ? 'En iPhone y iPad, la instalación se hace desde Safari. Si abriste la demo en otro navegador, copia la dirección y ábrela en Safari.'
            : 'Si no aparece la opción de instalar, abre esta página en Chrome o Safari y vuelve a intentarlo.'}{' '}
          La instalación no crea una cuenta: tu progreso sigue guardado en este navegador.
        </div>
      </Modal>
    </>
  );
}
