import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CameraOff,
  Dumbbell,
  ListChecks,
  Sparkles,
} from 'lucide-react';
import { DemoNote } from '../components/DemoNote';
import { Mascot } from '../components/Mascot';

const futureFeatures = [
  {
    icon: ListChecks,
    title: 'Repaso inteligente',
    description: 'Ejercicios cortos con las señas que más te cuesta recordar.',
  },
  {
    icon: Sparkles,
    title: 'Práctica por categoría',
    description: 'Elige saludos, familia, números o el alfabeto y practica a tu manera.',
  },
  {
    icon: CameraOff,
    title: 'Sin cámara en esta demo',
    description: 'Aún no hay reconocimiento de señas. La validación lingüística sigue pendiente.',
  },
];

export function Practice() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <p className="label">Práctica libre</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Un espacio para repetir sin prisa
        </h1>
        <p className="mt-1 max-w-xl text-sm font-semibold leading-6 text-muted">
          Esta sección llegará en una próxima versión. Mientras tanto, puedes repasar cualquier
          lección o explorar el diccionario.
        </p>
      </div>

      <section className="overflow-hidden rounded-[2rem] border border-line bg-card shadow-card">
        <div className="relative overflow-hidden bg-gradient-to-br from-coral-500 via-coral-500 to-brand-600 px-5 pb-8 pt-7 text-white sm:px-8">
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border-[26px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-20 left-1/4 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-white/90">
                <Dumbbell className="h-3 w-3" />
                Próximamente
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Practica a tu manera
              </h2>
              <p className="mt-2 max-w-md text-sm font-semibold leading-6 text-white/75">
                Estamos diseñando una práctica libre con repasos cortos, sin vidas, sin anuncios y
                sin contenido bloqueado.
              </p>
            </div>
            <Mascot className="hidden h-28 w-28 shrink-0 sm:block" mood="calm" />
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <div className="grid gap-2.5 sm:grid-cols-3">
            {futureFeatures.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-line bg-surface/50 p-3.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-card text-brand-500 shadow-sm">
                  <feature.icon className="h-4 w-4" />
                </span>
                <p className="mt-2 text-sm font-extrabold text-ink">{feature.title}</p>
                <p className="mt-1 text-[11px] font-semibold leading-5 text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <Link to="/diccionario" className="btn-primary flex-1">
              <BookOpen className="h-4 w-4" />
              Explorar el diccionario
            </Link>
            <Link to="/aprender" className="btn-secondary">
              Volver a aprender
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <DemoNote />
    </div>
  );
}
