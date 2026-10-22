import { BookOpen, Compass, Flame, Lock, Medal, Sparkles, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Achievement } from '../types';
import { cn } from '../lib/utils';

const iconMap: Record<Achievement['icon'], LucideIcon> = {
  sparkles: Sparkles,
  flame: Flame,
  zap: Zap,
  compass: Compass,
  book: BookOpen,
  medal: Medal,
};

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  className?: string;
}

export function AchievementBadge({ achievement, unlocked, className }: AchievementBadgeProps) {
  const Icon = iconMap[achievement.icon];

  return (
    <div
      className={cn(
        'relative flex items-start gap-3 rounded-2xl border p-3.5 transition',
        unlocked
          ? 'border-brand-100 bg-gradient-to-br from-brand-50 to-white shadow-soft dark:border-brand-800 dark:from-brand-900/30 dark:to-card'
          : 'border-line bg-surface/60',
        className,
      )}
    >
      <span
        className={cn(
          'grid h-11 w-11 shrink-0 place-items-center rounded-2xl',
          unlocked
            ? 'bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lift'
            : 'bg-card text-muted',
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <p className={cn('text-sm font-extrabold', unlocked ? 'text-ink' : 'text-muted')}>
            {achievement.title}
          </p>
          {!unlocked ? <Lock className="h-3 w-3 text-muted/70" /> : null}
        </div>
        <p className="mt-0.5 text-xs font-semibold leading-5 text-muted">
          {achievement.description}
        </p>
      </div>
    </div>
  );
}
