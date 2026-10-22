import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Flame,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import { DemoNote } from '../components/DemoNote';
import { Mascot } from '../components/Mascot';

export function Leaderboard() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <p className="label">Liga Manos</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Compara tu constancia, no tu perfección
        </h1>
        <p className="mt-1 max-w-xl text-sm font-semibold leading-6 text-muted">
          La liga semanal es una idea para una próxima versión. Esta demo no tiene clasificación
          activa ni competición real.
        </p>
      </div>

      <section className="overflow-hidden rounded-[2rem] border border-line bg-card shadow-card">
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-400 via-amber-500 to-coral-500 px-5 pb-8 pt-7 text-white sm:px-8">
          <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full border-[26px] border-white/15" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-white/95">
                <Trophy className="h-3 w-3" />
                Próximamente
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Una liga amable
              </h2>
              <p className="mt-2 max-w-md text-sm font-semibold leading-6 text-white/80">
                Sin gemas, sin energía y sin castigos por no entrar. Solo tú, tu racha y ganas de
                seguir aprendiendo LSP.
              </p>
            </div>
            <Mascot className="hidden h-28 w-28 shrink-0 sm:block" mood="celebrate" />
          </div>
        </div>

        <div className="grid gap-2.5 p-5 sm:grid-cols-3 sm:p-7">
          {[
            {
              icon: Flame,
              title: 'Racha semanal',
              description: 'La constancia suma más que una respuesta perfecta.',
            },
            {
              icon: Users,
              title: 'Grupos pequeños',
              description: 'Comparte el proceso con personas de un ritmo similar.',
            },
            {
              icon: ShieldCheck,
              title: 'Sin compra de ventajas',
              description: 'Todo el contenido y los logros seguirán siendo gratuitos.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-line bg-surface/50 p-3.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-card text-amber-600 shadow-sm dark:text-amber-300">
                <item.icon className="h-4 w-4" />
              </span>
              <p className="mt-2 text-sm font-extrabold text-ink">{item.title}</p>
              <p className="mt-1 text-[11px] font-semibold leading-5 text-muted">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-5 mb-5 rounded-2xl border border-dashed border-amber-300/70 bg-amber-50/70 p-4 text-center dark:border-amber-700/40 dark:bg-amber-900/15 sm:mx-7 sm:mb-7">
          <div className="flex items-center justify-center gap-2 text-amber-800 dark:text-amber-200">
            <Sparkles className="h-4 w-4" />
            <p className="text-xs font-extrabold">La clasificación todavía no está disponible.</p>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-amber-900/65 dark:text-amber-100/65">
            Sigue con tus lecciones: tu progreso ya se está guardando en este navegador.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 border-t border-line p-5 sm:flex-row sm:p-7">
          <Link to="/aprender" className="btn-primary flex-1">
            <HeartHandshake className="h-4 w-4" />
            Seguir aprendiendo
          </Link>
          <Link to="/perfil" className="btn-secondary">
            Ver mi progreso
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <DemoNote />
    </div>
  );
}
