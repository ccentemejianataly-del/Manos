import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Check,
  Eye,
  Flame,
  Pencil,
  Settings,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import { AchievementBadge } from '../components/AchievementBadge';
import { DemoNote } from '../components/DemoNote';
import { achievements } from '../data/achievements';
import { getCompletedCountForUnit, units } from '../data/units';
import { useDemoStore } from '../store/demoStore';
import { cn, percent } from '../lib/utils';

export function Profile() {
  const displayName = useDemoStore((state) => state.displayName);
  const setDisplayName = useDemoStore((state) => state.setDisplayName);
  const xpTotal = useDemoStore((state) => state.xpTotal);
  const streakDays = useDemoStore((state) => state.streakDays);
  const completedLessonIds = useDemoStore((state) => state.completedLessonIds);
  const viewedSignIds = useDemoStore((state) => state.viewedSignIds);
  const unlockedAchievementIds = useDemoStore((state) => state.unlockedAchievementIds);
  const bestCombo = useDemoStore((state) => state.bestCombo);
  const [editing, setEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState(displayName);

  const initial = displayName.trim().charAt(0).toUpperCase() || 'I';

  const saveName = () => {
    setDisplayName(nameDraft);
    setEditing(false);
  };

  const stats = [
    { label: 'XP total', value: xpTotal, icon: Zap, tone: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300' },
    { label: 'Racha', value: `${streakDays} ${streakDays === 1 ? 'día' : 'días'}`, icon: Flame, tone: 'bg-coral-500/10 text-coral-500' },
    { label: 'Lecciones', value: `${completedLessonIds.length}/10`, icon: BookOpen, tone: 'bg-brand-50 text-brand-500 dark:bg-brand-900/30 dark:text-brand-300' },
    { label: 'Señas vistas', value: `${viewedSignIds.length}/20`, icon: Eye, tone: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label">Tu espacio</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Mi perfil
          </h1>
          <p className="mt-1 text-sm font-semibold text-muted">
            Tu recorrido de demostración por la Lengua de Señas Peruana.
          </p>
        </div>
        <Link to="/ajustes" className="btn-secondary">
          <Settings className="h-4 w-4" />
          Ajustes
        </Link>
      </div>

      <section className="card overflow-hidden">
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 px-5 pb-7 pt-6 text-white sm:px-7">
          <div className="pointer-events-none absolute -right-10 -top-20 h-52 w-52 rounded-full border-[24px] border-white/10" />
          <div className="relative z-10 flex flex-wrap items-center gap-4">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-[1.6rem] border-4 border-white/25 bg-white/15 font-display text-4xl font-semibold backdrop-blur-sm">
              {initial}
            </span>
            <div className="min-w-0 flex-1">
              {editing ? (
                <div className="flex max-w-sm items-center gap-2">
                  <input
                    value={nameDraft}
                    onChange={(event) => setNameDraft(event.target.value)}
                    maxLength={24}
                    autoFocus
                    className="w-full rounded-xl border border-white/30 bg-white/15 px-3 py-2 text-sm font-extrabold text-white outline-none placeholder:text-white/50 focus:border-white/70"
                    aria-label="Cambiar nombre"
                  />
                  <button
                    type="button"
                    onClick={saveName}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-brand-700"
                    aria-label="Guardar nombre"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setNameDraft(displayName);
                    }}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/15 text-white"
                    aria-label="Cancelar"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-3xl font-semibold leading-tight">{displayName}</h2>
                  <button
                    type="button"
                    onClick={() => {
                      setNameDraft(displayName);
                      setEditing(true);
                    }}
                    className="grid h-8 w-8 place-items-center rounded-xl bg-white/15 text-white/80 transition hover:bg-white/25 hover:text-white"
                    aria-label="Editar nombre"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              <p className="mt-1 text-xs font-semibold text-white/70">
                Aprendiendo LSP · Perú · {unlockedAchievementIds.length} de 6 logros
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-extrabold text-white/90">
                  <Trophy className="h-3 w-3 text-amber-300" />
                  Mejor combo: {bestCombo}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-extrabold text-white/90">
                  <Flame className="h-3 w-3 text-coral-300" />
                  Racha de {streakDays}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4 sm:p-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-line bg-surface/50 p-3">
              <span className={cn('grid h-9 w-9 place-items-center rounded-xl', stat.tone)}>
                <stat.icon className="h-4 w-4" />
              </span>
              <p className="mt-2 font-display text-xl font-semibold text-ink">{stat.value}</p>
              <p className="text-[10px] font-extrabold text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="label">Logros</p>
              <h2 className="section-title mt-1">Pequeños grandes pasos</h2>
            </div>
            <span className="text-[10px] font-extrabold text-muted">
              {unlockedAchievementIds.length} / {achievements.length}
            </span>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {achievements.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                unlocked={unlockedAchievementIds.includes(achievement.id)}
              />
            ))}
          </div>
        </section>

        <aside className="space-y-3">
          <div className="card p-4">
            <p className="label">Tu camino</p>
            <div className="mt-3 space-y-3">
              {units.map((unit, index) => {
                const completed = getCompletedCountForUnit(unit, completedLessonIds);
                const value = percent(completed, unit.lessons.length);
                return (
                  <div key={unit.id}>
                    <div className="flex items-center justify-between text-[11px] font-extrabold">
                      <span className="text-ink">
                        {index + 1}. {unit.title}
                      </span>
                      <span className="text-muted">{completed}/{unit.lessons.length}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-line/70">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${value}%`,
                          background: `linear-gradient(90deg, ${unit.color}, ${unit.color2})`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              to="/aprender"
              className="mt-4 flex items-center justify-between rounded-2xl bg-surface/70 px-3 py-2.5 text-xs font-extrabold text-brand-600 transition hover:bg-surface dark:text-brand-300"
            >
              Continuar aprendiendo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <Link
            to="/diccionario"
            className="group flex items-center gap-3 rounded-3xl border border-line bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-200"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-900/30 dark:text-brand-300">
              <Eye className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-sm font-semibold text-ink">Explorar el diccionario</span>
              <span className="mt-0.5 block text-[10px] font-semibold text-muted">
                {20 - viewedSignIds.length} señas por descubrir
              </span>
            </span>
            <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-0.5" />
          </Link>

          <DemoNote compact />
        </aside>
      </div>
    </div>
  );
}
