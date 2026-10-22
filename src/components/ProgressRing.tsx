import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackClassName?: string;
  className?: string;
  children?: ReactNode;
  label?: string;
}

export function ProgressRing({
  value,
  size = 92,
  strokeWidth = 8,
  color = '#6C4CF1',
  trackClassName = 'text-line',
  className,
  children,
  label = 'Progreso diario',
}: ProgressRingProps) {
  const safeValue = Math.min(Math.max(value, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (safeValue / 100) * circumference;

  return (
    <div
      className={cn('relative inline-grid place-items-center', className)}
      role="img"
      aria-label={`${label}: ${Math.round(safeValue)}%`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={trackClassName}
          stroke="currentColor"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 700ms cubic-bezier(0.22, 0.8, 0.25, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}
