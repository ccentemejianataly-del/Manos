import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Home,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import { Confetti } from '../components/Confetti';
import { DemoNote } from '../components/DemoNote';
import { Mascot } from '../components/Mascot';
import { ProgressRing } from '../components/ProgressRing';
import { achievementMap } from '../data/achievements';
import { getLesson, getNextLesson } from '../data/units';
import { useDemoStore } from '../store/demoStore';
import type { LessonResult } from '../types';

export function Result() {
  const { lessonId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const lastResult = useDemoStore((state) => state.lastResult);
  const completedLessonIds = useDemoStore((state) => state.completedLessonIds);
  const result = (location.state as LessonResult | null) ?? lastResult;

  if (!result || result.lessonId !== lessonId) {
    return <Navigate to="/aprender" replace />;
  }

  const lesson = getLesson(result.lessonId);
  const nextLesson = getNextLesson(completedLessonIds);
  const unlockedAchievements = result.unlocked
    .map((id) => achievementMap[id])
    .filter(Boolean);
  const exerciseXp = Math.max(0, result.xpEarned - (lesson?.xp ?? 20));

  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas">
      <Confetti />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-700/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[460px] w-[460px] rounded-full bg-brand-300/25 blur-3xl dark:bg-brand-700/15"
        aria-hidden="true"
      />

      <header className="relative z-10 mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          to="/aprender"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-muted transition hover:text-ink"
        >
          <Home className="h-4 w-4" />
          Inicio
        </Link>
        <span className="chip border-brand-100 bg-brand-50 text-brand-600 dark:border-brand-800 dark:bg-brand-900/25 dark:text-brand-300">
          <Sparkles className="h-3 w-3" /> Lección completada
        </span>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-4 pb-12 pt-2 sm:px-6 sm:pt-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden rounded-[2rem] border border-line bg-card shadow-card"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 px-5 pb-8 pt-7 text-center text-white sm:px-8">
            <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full border-[28px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-24 left-1/4 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="relative z-10 mx-auto flex max-w-md flex-col items-center">
              <Mascot className="h-28 w-28" mood="celebrate" />
              <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/65">
                {lesson?.title ?? 'Lección'}
              </p>
              <h1 className="mt-1 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                ¡Muy bien hecho!
              </h1>
              <p className="mt-2 text-sm font-semibold leading-6 text-white/75">
                Sumaste una nueva práctica a tu camino con la LSP.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-amber-200/70 bg-amber-50/80 p-4 text-center dark:border-amber-700/40 dark:bg-amber-900/15">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300">
                  <Zap className="h-5 w-5" />
                </span>
                <p className="mt-2 font-display text-3xl font-semibold text-ink">+{result.xpEarned}</p>
                <p className="text-[10px] font-black uppercase tracking-wide text-muted">XP ganados</p>
                <p className="mt-1 text-[10px] font-bold text-muted">
                  {lesson?.xp ?? 20} por completar + {exerciseXp} por ejercicios
                </p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-3xl border border-emerald-200/70 bg-emerald-50/70 p-4 text-center dark:border-emerald-800/40 dark:bg-emerald-900/15">
                <ProgressRing value={result.accuracy} size={72} strokeWidth={7} color="#10B981">
                  <span className="text-sm font-black text-emerald-700 dark:text-emerald-300">
                    {result.accuracy}%
                  </span>
                </ProgressRing>
                <p className="mt-2 text-[10px] font-black uppercase tracking-wide text-muted">
                  Precisión
                </p>
                <p className="mt-0.5 text-[10px] font-bold text-muted">Respuestas al primer intento</p>
              </div>

              <div className="rounded-3xl border border-brand-100 bg-brand-50/70 p-4 text-center dark:border-brand-800/50 dark:bg-brand-900/20">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                  <Target className="h-5 w-5" />
                </span>
                <p className="mt-2 font-display text-3xl font-semibold text-ink">
                  {result.correctFirstTry}<span className="text-base text-muted">/{result.total}</span>
                </p>
                <p className="text-[10px] font-black uppercase tracking-wide text-muted">Aciertos</p>
                <p className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-muted">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  Sin vidas ni bloqueos
                </p>
              </div>
            </div>

            {unlockedAchievements.length > 0 ? (
              <div className="mt-4 rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-card p-4 dark:border-brand-800 dark:from-brand-900/25 dark:to-card">
                <div className="flex items-center gap-2 text-brand-700 dark:text-brand-200">
                  <Trophy className="h-4 w-4" />
                  <p className="text-[11px] font-black uppercase tracking-[0.12em]">
                    Nuevo logro desbloqueado
                  </p>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {unlockedAchievements.map((achievement) => (
                    <span
                      key={achievement.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-extrabold text-ink shadow-soft"
                    >
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      {achievement.title}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  nextLesson ? navigate(`/leccion/${nextLesson.id}`) : navigate('/aprender')
                }
                className="btn-primary group flex-1 py-3.5"
              >
                {nextLesson ? 'Siguiente lección' : 'Volver al inicio'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={() => navigate(`/leccion/${result.lessonId}`)}
                className="btn-secondary"
              >
                <RotateCcw className="h-4 w-4" />
                Repetir
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-extrabold text-muted">
              <Link to="/aprender" className="transition hover:text-ink">
                Ir al inicio
              </Link>
              <span>·</span>
              <Link to="/perfil" className="transition hover:text-ink">
                Ver mis logros
              </Link>
            </div>

            <DemoNote className="mt-5" compact />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
