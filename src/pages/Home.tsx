import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Dumbbell,
  Flame,
  Hand,
  Lock,
  Play,
  Sparkles,
  Star,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import { DemoNote } from '../components/DemoNote';
import { InstallAppCard } from '../components/InstallAppCard';
import { Mascot } from '../components/Mascot';
import { Modal } from '../components/Modal';
import { ProgressRing } from '../components/ProgressRing';
import { SignArt } from '../components/SignArt';
import { getCategory } from '../data/categories';
import { getSign } from '../data/signs';
import {
  getCompletedCountForUnit,
  getNextLesson,
  units,
} from '../data/units';
import { getDailyGoalXp, useDemoStore } from '../store/demoStore';
import { cn, formatLongDate, percent } from '../lib/utils';
import type { Lesson, Unit } from '../types';

const nodeOffsets = [
  'translate-x-0',
  'translate-x-[34px] sm:translate-x-[64px]',
  'translate-x-0',
  '-translate-x-[34px] sm:-translate-x-[64px]',
  'translate-x-0',
];

function GoalCard({ compact = false }: { compact?: boolean }) {
  const xpToday = useDemoStore((state) => state.xpToday);
  const dailyGoal = useDemoStore((state) => state.dailyGoal);
  const goalXp = getDailyGoalXp(dailyGoal);
  const value = percent(xpToday, goalXp);

  return (
    <div className={cn('card p-4', compact && 'p-3.5')}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="label">Meta de hoy</p>
          <p className="mt-1 font-display text-xl font-semibold text-ink">
            {xpToday} <span className="text-sm font-semibold text-muted">/ {goalXp} XP</span>
          </p>
          <p className="mt-1 text-[11px] font-bold text-muted">
            {value >= 100 ? '¡Meta cumplida! Puedes seguir practicando.' : 'Cada lección te acerca.'}
          </p>
        </div>
        <ProgressRing value={value} size={compact ? 62 : 74} strokeWidth={7}>
          <span className="text-xs font-black text-brand-600 dark:text-brand-300">{value}%</span>
        </ProgressRing>
      </div>
    </div>
  );
}

function StreakCard() {
  const streakDays = useDemoStore((state) => state.streakDays);
  const lastPracticeDate = useDemoStore((state) => state.lastPracticeDate);
  const today = new Date();
  const todayNumber = today.getDay();

  return (
    <div className="card overflow-hidden p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="label">Racha</p>
          <p className="mt-1 flex items-center gap-1.5 font-display text-xl font-semibold text-ink">
            <Flame className="h-5 w-5 text-coral-500" />
            {streakDays} {streakDays === 1 ? 'día' : 'días'}
          </p>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-coral-50 text-coral-500 dark:bg-coral-500/15">
          <Flame className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-1">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => {
          const isToday = todayNumber === (index === 6 ? 0 : index + 1);
          const isActive = Boolean(lastPracticeDate) && isToday;
          return (
            <div key={`${day}-${index}`} className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  'grid h-7 w-7 place-items-center rounded-full text-[9px] font-black transition',
                  isActive
                    ? 'bg-brand-500 text-white'
                    : isToday
                      ? 'border-2 border-brand-300 bg-brand-50 text-brand-600 dark:bg-brand-900/30'
                      : 'bg-surface text-muted',
                )}
              >
                {isActive ? <Flame className="h-3.5 w-3.5" /> : day}
              </span>
              <span className="text-[8px] font-bold text-muted">
                {isToday ? 'Hoy' : ''}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-[11px] font-semibold text-muted">
        {streakDays > 0
          ? 'Vuelve mañana para mantenerla.'
          : 'Completa una lección para iniciar tu racha.'}
      </p>
    </div>
  );
}

function LessonNode({
  lesson,
  index,
  status,
  onClick,
}: {
  lesson: Lesson;
  index: number;
  status: 'completed' | 'current' | 'available';
  onClick: () => void;
}) {
  return (
    <div className={cn('relative z-10 flex flex-col items-center', nodeOffsets[index])}>
      {status === 'current' ? (
        <span className="mb-1.5 rounded-full bg-brand-500 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-white shadow-lift">
          Ahora
        </span>
      ) : (
        <span className="mb-1.5 h-[22px]" aria-hidden="true" />
      )}
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'relative grid h-16 w-16 place-items-center rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 active:scale-95',
          status === 'completed' &&
            'bg-brand-500 text-white shadow-lift ring-4 ring-brand-100 dark:ring-brand-900/40',
          status === 'current' &&
            'animate-pulse-soft bg-card text-brand-600 shadow-card ring-4 ring-brand-300/70 dark:text-brand-300',
          status === 'available' &&
            'border-2 border-line bg-card text-muted shadow-soft hover:border-brand-200 hover:text-brand-500',
        )}
        aria-label={`${lesson.title}${status === 'completed' ? ', completada' : ''}`}
      >
        {status === 'completed' ? (
          <Check className="h-7 w-7" strokeWidth={3} />
        ) : status === 'current' ? (
          <Play className="ml-0.5 h-7 w-7 fill-current" strokeWidth={2} />
        ) : (
          <Star className="h-6 w-6" strokeWidth={2.4} />
        )}
        <span
          className={cn(
            'absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full text-[8px] font-black shadow-sm',
            status === 'completed'
              ? 'bg-emerald-400 text-emerald-950'
              : status === 'current'
                ? 'bg-amber-400 text-amber-950'
                : 'bg-surface text-muted',
          )}
        >
          {index + 1}
        </span>
      </button>
      <span className="mt-2 w-24 text-center text-[11px] font-extrabold leading-4 text-ink/80">
        {lesson.title}
      </span>
    </div>
  );
}

function UnitCard({
  unit,
  index,
  completedLessonIds,
  currentLessonId,
  onSelectLesson,
}: {
  unit: Unit;
  index: number;
  completedLessonIds: string[];
  currentLessonId?: string;
  onSelectLesson: (lesson: Lesson) => void;
}) {
  const completed = getCompletedCountForUnit(unit, completedLessonIds);
  const progress = percent(completed, unit.lessons.length);

  return (
    <section className="card overflow-hidden">
      <div
        className="border-b border-line p-4 sm:p-5"
        style={{
          background: `linear-gradient(135deg, ${unit.color}18, transparent 72%)`,
        }}
      >
        <div className="flex items-start gap-3">
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-lift"
            style={{ background: `linear-gradient(135deg, ${unit.color}, ${unit.color2})` }}
          >
            <Hand className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="label">Unidad {index + 1}</span>
              {progress === 100 ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <Check className="h-2.5 w-2.5" /> Completada
                </span>
              ) : null}
            </div>
            <h3 className="mt-0.5 font-display text-xl font-semibold text-ink">{unit.title}</h3>
            <p className="mt-0.5 text-xs font-semibold leading-5 text-muted">{unit.description}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="whitespace-nowrap font-display text-lg font-semibold leading-tight text-ink">
              {completed}<span className="text-xs text-muted">/{unit.lessons.length}</span>
            </p>
            <p className="text-[9px] font-black uppercase tracking-wide text-muted">lecciones</p>
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-line/70">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${unit.color}, ${unit.color2})`,
            }}
          />
        </div>
      </div>

      <div className="relative px-4 pb-7 pt-6">
        <div className="absolute bottom-10 left-1/2 top-10 w-0 -translate-x-1/2 border-l-2 border-dashed border-brand-200/80 dark:border-brand-800" />
        <div className="relative flex flex-col items-center gap-5">
          {unit.lessons.map((lesson, lessonIndex) => (
            <LessonNode
              key={lesson.id}
              lesson={lesson}
              index={lessonIndex}
              status={
                completedLessonIds.includes(lesson.id)
                  ? 'completed'
                  : lesson.id === currentLessonId
                    ? 'current'
                    : 'available'
              }
              onClick={() => onSelectLesson(lesson)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Home() {
  const navigate = useNavigate();
  const displayName = useDemoStore((state) => state.displayName);
  const completedLessonIds = useDemoStore((state) => state.completedLessonIds);
  const unlockedAchievementIds = useDemoStore((state) => state.unlockedAchievementIds);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const nextLesson = getNextLesson(completedLessonIds);
  const selectedSigns = selectedLesson
    ? selectedLesson.signIds.map((id) => getSign(id)).filter(Boolean)
    : [];

  const openLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const startLesson = () => {
    if (!selectedLesson) return;
    const lessonId = selectedLesson.id;
    setSelectedLesson(null);
    navigate(`/leccion/${lessonId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="label">{formatLongDate()}</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Hola, {displayName}
            <span className="ml-2 inline-block origin-bottom-right animate-[wave_2s_ease-in-out_infinite] text-2xl sm:text-3xl">
              👋
            </span>
          </h1>
          <p className="mt-1 text-sm font-semibold text-muted">
            {nextLesson ? 'Tu siguiente lección está lista.' : '¡Ya recorriste toda la demo!'}
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-2xl border border-line bg-card px-3 py-2 shadow-soft sm:flex">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-900/30 dark:text-brand-300">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wide text-muted">Logros</p>
            <p className="text-sm font-black text-ink">{unlockedAchievementIds.length} / 6</p>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 p-5 text-white shadow-card sm:p-7">
        <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full border-[28px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute bottom-5 left-6 h-1.5 w-1.5 rounded-full bg-white/50" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/65">
              {nextLesson ? 'Tu siguiente paso' : 'Demo completada'}
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold leading-tight sm:text-3xl">
              {nextLesson ? nextLesson.title : '¡Bien hecho!'}
            </h2>
            <p className="mt-1.5 max-w-md text-xs font-semibold leading-5 text-white/75 sm:text-sm sm:leading-6">
              {nextLesson
                ? nextLesson.objective
                : 'Explora el diccionario y repasa las señas que quieras.'}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  nextLesson ? navigate(`/leccion/${nextLesson.id}`) : navigate('/diccionario')
                }
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-extrabold text-brand-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-50 active:translate-y-0"
              >
                {nextLesson ? 'Continuar' : 'Explorar diccionario'}
                <Play className="h-4 w-4 fill-current" />
              </button>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-extrabold text-white/90 backdrop-blur-sm">
                <Zap className="h-3.5 w-3.5 text-amber-300" />
                +{nextLesson?.xp ?? 20} XP
              </span>
            </div>
          </div>
          <Mascot className="hidden h-28 w-28 shrink-0 min-[420px]:block" mood="wave" />
        </div>
      </section>

      <div className="grid gap-3 lg:hidden">
        <div className="grid gap-3 min-[480px]:grid-cols-2">
          <GoalCard compact />
          <StreakCard />
        </div>
        <InstallAppCard />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="label">Tu ruta</p>
              <h2 className="section-title mt-1">Aprende paso a paso</h2>
            </div>
            <Link
              to="/diccionario"
              className="inline-flex items-center gap-1 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-extrabold text-muted transition hover:border-brand-200 hover:text-brand-600"
            >
              Diccionario
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {units.map((unit, index) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              index={index}
              completedLessonIds={completedLessonIds}
              currentLessonId={nextLesson?.id}
              onSelectLesson={openLesson}
            />
          ))}

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to="/diccionario"
              className="group flex items-center gap-3 rounded-3xl border border-line bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-200"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-900/30 dark:text-brand-300">
                <BookOpen className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-base font-semibold text-ink">
                  Diccionario visual
                </span>
                <span className="mt-0.5 block text-[11px] font-semibold text-muted">
                  20 señas y alfabeto dactilológico
                </span>
              </span>
              <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
            </Link>

            <Link
              to="/practicar"
              className="group flex items-center gap-3 rounded-3xl border border-line bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-200"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-coral-500/10 text-coral-500">
                <Dumbbell className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 font-display text-base font-semibold text-ink">
                  Práctica libre
                  <span className="rounded-full bg-surface px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide text-muted">
                    Pronto
                  </span>
                </span>
                <span className="mt-0.5 block text-[11px] font-semibold text-muted">
                  Repasa a tu manera en una próxima versión
                </span>
              </span>
              <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
            </Link>
          </div>

          <DemoNote />
        </div>

        <aside className="hidden space-y-3 lg:block">
          <GoalCard />
          <StreakCard />

          <div className="card overflow-hidden">
            <div className="bg-gradient-to-br from-amber-50 to-card p-4 dark:from-amber-900/15 dark:to-card">
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300">
                  <Trophy className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base font-semibold text-ink">Liga Manos</p>
                  <p className="text-[10px] font-bold text-muted">Próximamente</p>
                </div>
              </div>
              <p className="mt-3 text-xs font-semibold leading-5 text-muted">
                Compara tu constancia con otras personas que también están aprendiendo LSP.
              </p>
            </div>
            <Link
              to="/clasificacion"
              className="flex items-center justify-between border-t border-line px-4 py-3 text-xs font-extrabold text-brand-600 transition hover:bg-surface dark:text-brand-300"
            >
              Ver avance
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-brand-100 bg-brand-50/70 p-4 dark:border-brand-800 dark:bg-brand-900/20">
            <div className="flex items-center gap-2 text-brand-700 dark:text-brand-200">
              <Target className="h-4 w-4" />
              <p className="text-xs font-black">Consejo de hoy</p>
            </div>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-brand-900/70 dark:text-brand-100/70">
              Practica frente a un espejo y cuida la expresión de tu rostro: también comunica.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-2xl px-1 text-[10px] font-black uppercase tracking-wide text-muted">
            <span className="inline-flex items-center gap-1">
              <Lock className="h-3 w-3" /> Sin bloqueos
            </span>
            <span>LSP · Perú</span>
          </div>
        </aside>
      </div>

      <Modal
        open={Boolean(selectedLesson)}
        onClose={() => setSelectedLesson(null)}
        title={selectedLesson?.title ?? 'Lección'}
        description={
          selectedLesson
            ? `${selectedLesson.objective} · +${selectedLesson.xp} XP`
            : undefined
        }
        size="md"
        footer={
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setSelectedLesson(null)} className="btn-secondary">
              Ahora no
            </button>
            <button type="button" onClick={startLesson} className="btn-primary group">
              {completedLessonIds.includes(selectedLesson?.id ?? '') ? 'Repasar lección' : 'Empezar lección'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        }
      >
        {selectedLesson ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2.5">
              {selectedSigns.map((sign) => {
                if (!sign) return null;
                const category = getCategory(sign.category);
                return (
                  <div
                    key={sign.id}
                    className="overflow-hidden rounded-2xl border border-line bg-card"
                  >
                    <SignArt sign={sign} className="aspect-[4/3]" />
                    <div className="px-3 py-2">
                      <p className="text-[9px] font-black uppercase tracking-wider text-muted">
                        {category.label}
                      </p>
                      <p className="text-sm font-extrabold text-ink">{sign.translation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-surface/70 px-3.5 py-2.5 text-xs font-semibold text-muted">
              <Sparkles className="h-4 w-4 shrink-0 text-brand-500" />
              Incluye ejercicios de significado, selección, parejas y orden de fotogramas.
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
