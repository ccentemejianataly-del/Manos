import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Check,
  Contrast,
  Flame,
  Monitor,
  Moon,
  RotateCcw,
  Sparkles,
  Sun,
  Type,
} from 'lucide-react';
import { DemoNote } from '../components/DemoNote';
import { Modal } from '../components/Modal';
import { useDemoStore } from '../store/demoStore';
import { cn } from '../lib/utils';
import type { DemoSettings } from '../types';

function Toggle({
  checked,
  onChange,
  label,
  description,
  icon: Icon,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description: string;
  icon: typeof Sun;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-card p-3.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface text-brand-500">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-extrabold text-ink">{label}</p>
        <p className="mt-0.5 text-[11px] font-semibold leading-5 text-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full transition-colors',
          checked ? 'bg-brand-500' : 'bg-line',
        )}
        aria-label={label}
      >
        <span
          className={cn(
            'absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all',
            checked ? 'left-6' : 'left-1',
          )}
        />
      </button>
    </div>
  );
}

const themes: Array<{ id: DemoSettings['theme']; label: string; icon: typeof Sun }> = [
  { id: 'light', label: 'Claro', icon: Sun },
  { id: 'dark', label: 'Oscuro', icon: Moon },
  { id: 'system', label: 'Sistema', icon: Monitor },
];

const dailyGoals = [
  { minutes: 10, label: 'Relajado', xp: 20 },
  { minutes: 20, label: 'Constante', xp: 40 },
  { minutes: 30, label: 'Intenso', xp: 60 },
];

export function Settings() {
  const navigate = useNavigate();
  const settings = useDemoStore((state) => state.settings);
  const updateSettings = useDemoStore((state) => state.updateSettings);
  const dailyGoal = useDemoStore((state) => state.dailyGoal);
  const setDailyGoal = useDemoStore((state) => state.setDailyGoal);
  const resetDemo = useDemoStore((state) => state.resetDemo);
  const [resetOpen, setResetOpen] = useState(false);

  const handleReset = () => {
    resetDemo();
    setResetOpen(false);
    navigate('/onboarding', { replace: true });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <p className="label">Personaliza la experiencia</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Ajustes
        </h1>
        <p className="mt-1 text-sm font-semibold text-muted">
          Todo es opcional. La demo funciona igual con cualquier configuración.
        </p>
      </div>

      <section className="card p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Contrast className="h-4 w-4 text-brand-500" />
          <h2 className="section-title">Apariencia</h2>
        </div>
        <div className="mt-4">
          <p className="label">Tema</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {themes.map((theme) => {
              const active = settings.theme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => updateSettings({ theme: theme.id })}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-2xl border-2 p-3 text-xs font-extrabold transition',
                    active
                      ? 'border-brand-400 bg-brand-50 text-brand-700 dark:bg-brand-900/25 dark:text-brand-200'
                      : 'border-line bg-card text-muted hover:border-brand-200 hover:text-ink',
                  )}
                  aria-pressed={active}
                >
                  <theme.icon className="h-5 w-5" />
                  {theme.label}
                  {active ? <Check className="h-3 w-3" /> : <span className="h-3" />}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <Toggle
            checked={settings.reducedMotion}
            onChange={(value) => updateSettings({ reducedMotion: value })}
            label="Reducir movimiento"
            description="Desactiva animaciones y la reproducción automática de secuencias."
            icon={Sparkles}
          />
          <Toggle
            checked={settings.showTextAlternatives}
            onChange={(value) => updateSettings({ showTextAlternatives: value })}
            label="Descripciones de texto"
            description="Muestra descripciones y apoyos escritos en las fichas de señas."
            icon={Type}
          />
          <Toggle
            checked={settings.mirror}
            onChange={(value) => updateSettings({ mirror: value })}
            label="Ver secuencias en espejo"
            description="Ideal si practicas frente a un espejo. Puedes cambiarlo en cada seña."
            icon={BookOpen}
          />
        </div>
      </section>

      <section className="card p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-coral-500" />
          <h2 className="section-title">Meta diaria</h2>
        </div>
        <p className="mt-1 text-xs font-semibold text-muted">
          Elige cuánto tiempo quieres dedicarle a la demo cada día.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {dailyGoals.map((goal) => {
            const active = dailyGoal === goal.minutes;
            return (
              <button
                key={goal.minutes}
                type="button"
                onClick={() => setDailyGoal(goal.minutes)}
                className={cn(
                  'rounded-2xl border-2 p-3 text-left transition',
                  active
                    ? 'border-brand-400 bg-brand-50 dark:bg-brand-900/25'
                    : 'border-line bg-card hover:border-brand-200',
                )}
                aria-pressed={active}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-ink">{goal.minutes} min</span>
                  {active ? <Check className="h-4 w-4 text-brand-500" /> : null}
                </div>
                <p className="mt-0.5 text-[10px] font-bold text-muted">
                  {goal.label} · {goal.xp} XP
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="card p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-brand-500" />
          <h2 className="section-title">Idioma y contenido</h2>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-2xl bg-surface/60 p-3.5">
          <div>
            <p className="text-sm font-extrabold text-ink">Lengua de Señas Peruana</p>
            <p className="mt-0.5 text-[11px] font-semibold text-muted">
              LSP · Perú · contenido de demostración
            </p>
          </div>
          <span className="chip border-brand-100 bg-brand-50 text-brand-600 dark:border-brand-800 dark:bg-brand-900/25 dark:text-brand-300">
            Fijado
          </span>
        </div>
        <p className="mt-2 text-[11px] font-semibold leading-5 text-muted">
          La app está enfocada exclusivamente en LSP. Otras lenguas de señas y variedades regionales
          se evaluarán en una próxima etapa junto con la comunidad sorda.
        </p>
      </section>

      <section className="card p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4 text-coral-500" />
          <h2 className="section-title">Datos de la demo</h2>
        </div>
        <p className="mt-1 text-xs font-semibold leading-5 text-muted">
          Borra el progreso guardado en este navegador: XP, racha, lecciones, señas vistas y logros.
        </p>
        <button type="button" onClick={() => setResetOpen(true)} className="btn-danger mt-3">
          <RotateCcw className="h-4 w-4" />
          Reiniciar demo
        </button>
      </section>

      <DemoNote />

      <p className="pb-2 text-center text-[10px] font-bold text-muted">
        Manos · Demo inicial 0.1.0 · Hecha para explorar LSP
      </p>

      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="¿Reiniciar la demo?"
        description="Se borrarán tu XP, racha, lecciones completadas, señas vistas y logros guardados en este navegador. No afecta a ningún servicio externo."
        size="sm"
        footer={
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setResetOpen(false)} className="btn-secondary">
              Cancelar
            </button>
            <button type="button" onClick={handleReset} className="btn-danger">
              Sí, reiniciar
            </button>
          </div>
        }
      >
        <div className="rounded-2xl bg-coral-500/10 px-3.5 py-3 text-xs font-semibold leading-5 text-coral-700 dark:text-coral-200">
          Esta acción no se puede deshacer. Podrás empezar de nuevo desde el onboarding.
        </div>
      </Modal>
    </div>
  );
}
