import { Link } from 'react-router-dom';
import { HandGlyph } from './SignArt';
import { cn } from '../lib/utils';

interface LogoProps {
  compact?: boolean;
  to?: string;
  className?: string;
}

export function Logo({ compact = false, to = '/aprender', className }: LogoProps) {
  return (
    <Link
      to={to}
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label="Manos, ir al inicio"
    >
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-lift transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105">
        <HandGlyph className="h-7 w-7" />
        <span className="absolute inset-x-0 top-0 h-1/2 bg-white/10" />
      </span>
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[22px] font-semibold tracking-tight text-ink">
            Manos
          </span>
          <span className="mt-0.5 text-[9px] font-black uppercase tracking-[0.22em] text-brand-500">
            LSP · Perú
          </span>
        </span>
      ) : null}
    </Link>
  );
}
