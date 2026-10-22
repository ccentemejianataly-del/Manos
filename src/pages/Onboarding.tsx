import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  Flame,
  Hand,
  HeartHandshake,
  Layers3,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { Mascot } from '../components/Mascot';
import { SignArt } from '../components/SignArt';
import { getSign } from '../data/signs';
import { useDemoStore } from '../store/demoStore';
import { cn } from '../lib/utils';
import type { Sign } from '../types';

const goals = [
  {
    minutes: 10,
    title: 'Relajado',
    description: 'Un paso pequeño al día',
    detail: '10 min · 20 XP',
    icon: Clock3,
  },
  {
    minutes: 20,
    title: 'Constante',
    description: 'El ritmo ideal para avanzar',
    detail: '20 min · 40 XP',
    icon: Flame,
    recommended: true,
  },
  {
    minutes: 30,
    title: 'Intenso',
    description: 'Más práctica, más señas',
    detail: '30 min · 60 XP',
    icon: Star,
  },
];

const sampleSigns = ['hola', 'gracias', 'familia']
  .map((id) => getSign(id))
  .filter((sign): sign is Sign => Boolean(sign));

export function Onboarding() {
  const navigate = useNavigate();
  const completeOnboarding = useDemoStore((state) => state.completeOnboarding);
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState(20);

  const finish = () => {
    completeOnboarding(goal);
    navigate('/aprender', { replace: true });
  };

  const skip = () => {
    completeOnboarding(20);
    navigate('/aprender', { replace: true });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 -top-48 h-[560px] w-[560px] rounded-full bg-brand-300/25 blur-3xl dark:bg-brand-700/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-56 -left-32 h-[520px] w-[520px] rounded-full bg-coral-400/20 blur-3xl dark:bg-coral-500/10"
        aria-hidden="true"
      />

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Logo />
        <span className="chip border-brand-100 bg-brand-50 text-brand-600 dark:border-brand-800 dark:bg-brand-900/25 dark:text-brand-300">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          Demo LSP · Perú
        </span>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-89px)] max-w-6xl items-center gap-10 px-4 pb-12 pt-2 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:pb-16">
        <section className="max-w-xl">
          <div className="mb-6 flex items-center gap-2" aria-label={`Paso ${step + 1} de 3`}>
            {[0, 1, 2].map((item) => (
              <span
                key={item}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  item === step ? 'w-10 bg-brand-500' : item < step ? 'w-4 bg-brand-300' : 'w-4 bg-line',
                )}
              />
            ))}
            <span className="ml-1 text-[10px] font-black uppercase tracking-[0.16em] text-muted">
              Paso {step + 1} de 3
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            >
              {step === 0 ? (
                <div>
                  <div className="mb-5 flex items-center gap-2 lg:hidden">
                    <Mascot className="h-20 w-20" mood="wave" />
                    <span className="rounded-2xl rounded-bl-md bg-card px-3 py-2 text-xs font-extrabold text-ink shadow-soft">
                      ¡Hola! Soy Manitos.
                    </span>
                  </div>
                  <span className="chip border-brand-100 bg-brand-50 text-brand-600 dark:border-brand-800 dark:bg-brand-900/25 dark:text-brand-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    Aprende Lengua de Señas Peruana
                  </span>
                  <h1 className="mt-5 font-display text-[2.7rem] font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl">
                    Tus manos ya saben{' '}
                    <span className="relative whitespace-nowrap text-brand-500">
                      hablar
                      <svg
                        className="absolute -bottom-1 left-0 h-2.5 w-full text-brand-300"
                        viewBox="0 0 200 12"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path d="M2 9C52 2 148 2 198 9" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
                      </svg>
                    </span>
                    .
                  </h1>
                  <p className="mt-5 max-w-md text-lg font-semibold leading-8 text-muted">
                    Lecciones cortas, imágenes interactivas y mucha práctica para descubrir la LSP
                    a tu ritmo.
                  </p>

                  <div className="mt-7 grid max-w-md grid-cols-3 gap-2">
                    {[
                      { icon: ShieldCheck, label: 'Sin vidas' },
                      { icon: BookOpen, label: 'Sin anuncios' },
                      { icon: HeartHandshake, label: 'A tu ritmo' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center gap-1.5 rounded-2xl border border-line bg-card/75 px-2 py-3 text-center shadow-soft"
                      >
                        <item.icon className="h-5 w-5 text-brand-500" />
                        <span className="text-[11px] font-extrabold text-ink">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button type="button" onClick={() => setStep(1)} className="btn-primary group w-full sm:w-auto">
                      Empezar
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                    <button type="button" onClick={skip} className="btn-ghost w-full sm:w-auto">
                      Solo quiero explorar
                    </button>
                  </div>
                </div>
              ) : null}

              {step === 1 ? (
                <div>
                  <span className="chip border-brand-100 bg-brand-50 text-brand-600 dark:border-brand-800 dark:bg-brand-900/25 dark:text-brand-300">
                    <Flame className="h-3.5 w-3.5" />
                    Tu meta diaria
                  </span>
                  <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                    ¿Cuánto quieres practicar?
                  </h1>
                  <p className="mt-3 max-w-md text-base font-semibold leading-7 text-muted">
                    Elige un ritmo cómodo. Puedes cambiarlo después en Ajustes.
                  </p>

                  <div className="mt-6 space-y-2.5">
                    {goals.map((item) => {
                      const selected = goal === item.minutes;
                      return (
                        <button
                          key={item.minutes}
                          type="button"
                          onClick={() => setGoal(item.minutes)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-3xl border p-3.5 text-left transition',
                            selected
                              ? 'border-brand-400 bg-brand-50 shadow-soft ring-4 ring-brand-500/10 dark:bg-brand-900/25'
                              : 'border-line bg-card hover:border-brand-200 hover:bg-surface/60',
                          )}
                          aria-pressed={selected}
                        >
                          <span
                            className={cn(
                              'grid h-11 w-11 shrink-0 place-items-center rounded-2xl',
                              selected ? 'bg-brand-500 text-white' : 'bg-surface text-brand-500',
                            )}
                          >
                            <item.icon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="font-display text-lg font-semibold text-ink">
                                {item.title}
                              </span>
                              {item.recommended ? (
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
                                  Recomendado
                                </span>
                              ) : null}
                            </span>
                            <span className="mt-0.5 block text-xs font-semibold text-muted">
                              {item.description}
                            </span>
                          </span>
                          <span className="text-right">
                            <span className="block text-xs font-black text-ink">{item.detail}</span>
                            <span
                              className={cn(
                                'mt-1 ml-auto grid h-5 w-5 place-items-center rounded-full border',
                                selected
                                  ? 'border-brand-500 bg-brand-500 text-white'
                                  : 'border-line text-transparent',
                              )}
                            >
                              <Check className="h-3 w-3" />
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-7 flex items-center gap-3">
                    <button type="button" onClick={() => setStep(0)} className="btn-secondary">
                      Atrás
                    </button>
                    <button type="button" onClick={() => setStep(2)} className="btn-primary group flex-1">
                      Continuar
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div>
                  <span className="chip border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    Todo listo
                  </span>
                  <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                    Tu primera seña te espera.
                  </h1>
                  <p className="mt-3 max-w-md text-base font-semibold leading-7 text-muted">
                    Empieza con saludos y palabras cotidianas. En pocos minutos podrás reconocer tus
                    primeras señas.
                  </p>

                  <div className="mt-6 rounded-3xl border border-line bg-card p-4 shadow-soft">
                    <div className="flex items-center justify-between border-b border-line pb-3">
                      <div>
                        <p className="label">Tu plan inicial</p>
                        <p className="mt-1 font-display text-xl font-semibold text-ink">
                          {goal} min al día
                        </p>
                      </div>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-900/30 dark:text-brand-300">
                        <Clock3 className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {[
                        { icon: Layers3, value: '2', label: 'unidades' },
                        { icon: BookOpen, value: '10', label: 'lecciones' },
                        { icon: Hand, value: '20', label: 'señas' },
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl bg-surface/70 p-2.5 text-center">
                          <item.icon className="mx-auto h-4 w-4 text-brand-500" />
                          <p className="mt-1 font-display text-lg font-semibold text-ink">{item.value}</p>
                          <p className="text-[10px] font-extrabold text-muted">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-amber-200/70 bg-amber-50/80 px-3.5 py-2.5 text-[11px] font-semibold leading-5 text-amber-900 dark:border-amber-700/40 dark:bg-amber-900/15 dark:text-amber-100">
                    Contenido de demostración. La validación lingüística con la comunidad sorda
                    peruana está pendiente.
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <button type="button" onClick={() => setStep(1)} className="btn-secondary">
                      Atrás
                    </button>
                    <button type="button" onClick={finish} className="btn-primary group flex-1">
                      Empezar a aprender
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </section>

        <section
          className="relative hidden min-h-[560px] flex-col items-center justify-center gap-5 lg:flex"
          aria-hidden="true"
        >
          <div className="absolute inset-x-10 bottom-2 top-10 rounded-[3rem] border border-brand-100/70 bg-card/55 shadow-card backdrop-blur-sm dark:border-brand-800/50 dark:bg-card/40" />
          <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300/25 blur-3xl dark:bg-brand-600/15" />

          <div className="relative z-10 flex items-end gap-1">
            <Mascot className="h-52 w-52" mood={step === 2 ? 'celebrate' : 'wave'} />
            <div className="mb-12 whitespace-nowrap rounded-2xl rounded-bl-md border border-line bg-card px-3 py-2 text-xs font-extrabold text-ink shadow-card">
              {step === 2 ? '¡Vamos a empezar!' : '¡Hola! Soy Manitos.'}
            </div>
          </div>

          <div className="relative z-10 grid w-full max-w-[470px] grid-cols-3 gap-3 px-4">
            {sampleSigns.map((sign, index) => (
              <div
                key={sign.id}
                className={cn(
                  'overflow-hidden rounded-3xl border-4 border-card bg-card shadow-card',
                  index === 0 && '-rotate-2',
                  index === 1 && 'translate-y-2 rotate-2',
                  index === 2 && '-rotate-1',
                )}
              >
                <SignArt
                  sign={sign}
                  frame={index === 1 ? 2 : 1}
                  showWatermark={false}
                  className="aspect-[4/5]"
                />
                <div className="px-2.5 py-2">
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted">LSP</p>
                  <p className="truncate text-sm font-extrabold text-ink">{sign.translation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
