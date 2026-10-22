import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ChevronRight,
  Dumbbell,
  Flame,
  Home,
  Trophy,
  User,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Logo } from './Logo';
import { ProgressRing } from './ProgressRing';
import { getDailyGoalXp, useDemoStore } from '../store/demoStore';
import { cn, percent } from '../lib/utils';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  soon?: boolean;
}

const mainNav: NavItem[] = [
  { to: '/aprender', label: 'Aprender', icon: Home },
  { to: '/diccionario', label: 'Diccionario', icon: BookOpen },
  { to: '/practicar', label: 'Práctica', icon: Dumbbell, soon: true },
  { to: '/clasificacion', label: 'Clasificación', icon: Trophy, soon: true },
  { to: '/perfil', label: 'Perfil', icon: User },
];

const bottomNav: NavItem[] = [
  { to: '/aprender', label: 'Aprender', icon: Home },
  { to: '/diccionario', label: 'Diccionario', icon: BookOpen },
  { to: '/clasificacion', label: 'Liga', icon: Trophy, soon: true },
  { to: '/perfil', label: 'Perfil', icon: User },
];

function Sidebar() {
  const displayName = useDemoStore((state) => state.displayName);
  const streakDays = useDemoStore((state) => state.streakDays);
  const xpToday = useDemoStore((state) => state.xpToday);
  const dailyGoal = useDemoStore((state) => state.dailyGoal);
  const goalXp = getDailyGoalXp(dailyGoal);
  const goalPercent = percent(xpToday, goalXp);
  const initial = displayName.trim().charAt(0).toUpperCase() || 'I';

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[250px] flex-col border-r border-line bg-card/85 p-5 backdrop-blur-xl lg:flex">
      <Logo />

      <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-brand-600 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-300">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
        Demo inicial
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1.5" aria-label="Navegación principal">
        {mainNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-extrabold transition',
                isActive
                  ? 'bg-brand-500 text-white shadow-lift'
                  : 'text-muted hover:bg-surface hover:text-ink',
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn('h-5 w-5 shrink-0', isActive ? 'text-white' : 'text-muted')}
                  strokeWidth={2.4}
                />
                <span className="flex-1">{item.label}</span>
                {item.soon ? (
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide',
                      isActive ? 'bg-white/20 text-white' : 'bg-surface text-muted',
                    )}
                  >
                    Pronto
                  </span>
                ) : null}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 space-y-3">
        <div className="rounded-3xl border border-line bg-surface/70 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="label">Meta de hoy</p>
              <p className="mt-1 flex items-center gap-1 text-sm font-extrabold text-ink">
                <Zap className="h-4 w-4 text-amber-500" />
                {xpToday} / {goalXp} XP
              </p>
            </div>
            <ProgressRing value={goalPercent} size={54} strokeWidth={6}>
              <span className="text-[10px] font-black text-brand-600">{goalPercent}%</span>
            </ProgressRing>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-muted">
            <Flame className="h-4 w-4 text-coral-500" />
            Racha de {streakDays} {streakDays === 1 ? 'día' : 'días'}
          </div>
        </div>

        <NavLink
          to="/perfil"
          className="flex items-center gap-3 rounded-2xl border border-line bg-card p-2.5 transition hover:border-brand-200"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-sm font-black text-white">
            {initial}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-extrabold text-ink">{displayName}</span>
            <span className="block text-[10px] font-bold text-muted">LSP · Perú</span>
          </span>
          <ChevronRight className="h-4 w-4 text-muted" />
        </NavLink>
      </div>
    </aside>
  );
}

function MobileHeader() {
  const displayName = useDemoStore((state) => state.displayName);
  const streakDays = useDemoStore((state) => state.streakDays);
  const initial = displayName.trim().charAt(0).toUpperCase() || 'I';

  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-canvas/85 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-line bg-card px-2.5 py-1.5 text-xs font-black text-ink shadow-soft">
            <Flame className="h-3.5 w-3.5 text-coral-500" />
            {streakDays}
          </span>
          <NavLink
            to="/perfil"
            className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-sm font-black text-white shadow-soft"
            aria-label="Ir al perfil"
          >
            {initial}
          </NavLink>
        </div>
      </div>
    </header>
  );
}

function BottomNavigation() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card px-2 pt-1.5 shadow-[0_-10px_30px_rgba(33,26,53,0.08)] lg:hidden"
      aria-label="Navegación móvil"
    >
      <div className="safe-bottom mx-auto grid max-w-lg grid-cols-4">
        {bottomNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            aria-label={item.soon ? `${item.label}, próximamente` : undefined}
            className={({ isActive }) =>
              cn(
                'relative flex flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 text-[10px] font-extrabold transition',
                isActive ? 'text-brand-600 dark:text-brand-300' : 'text-muted',
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    'relative grid h-9 w-12 place-items-center rounded-2xl transition',
                    isActive ? 'bg-brand-50 dark:bg-brand-900/40' : '',
                  )}
                >
                  <item.icon
                    className={cn('h-5 w-5', isActive ? 'text-brand-600 dark:text-brand-300' : '')}
                    strokeWidth={2.4}
                  />
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export function AppShell() {
  const location = useLocation();
  const reducedMotion = useDemoStore((state) => state.settings.reducedMotion);

  return (
    <div className="min-h-screen bg-canvas">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-brand-200/20 blur-3xl dark:bg-brand-700/10" />
        <div className="absolute -bottom-40 left-1/4 h-[360px] w-[360px] rounded-full bg-coral-400/10 blur-3xl" />
      </div>

      <Sidebar />

      <div className="relative lg:pl-[250px]">
        <MobileHeader />
        <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-4 sm:px-6 lg:px-8 lg:pb-12 lg:pt-8">
          <motion.div
            key={location.pathname}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      <BottomNavigation />
    </div>
  );
}
