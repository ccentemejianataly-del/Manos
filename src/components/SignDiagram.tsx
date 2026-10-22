import { useState } from 'react';
import { MousePointerClick } from 'lucide-react';
import type { Sign } from '../types';
import { SignArt } from './SignArt';
import { cn } from '../lib/utils';

interface SignDiagramProps {
  sign: Sign;
  className?: string;
}

export function SignDiagram({ sign, className }: SignDiagramProps) {
  const hotspots = sign.visual.hotspots ?? [];
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = hotspots.find((hotspot) => hotspot.id === activeId);

  if (hotspots.length === 0) return null;

  return (
    <div className={cn('relative overflow-hidden rounded-3xl border border-line bg-card shadow-soft', className)}>
      <div className="relative aspect-[4/3]">
        <SignArt
          sign={sign}
          frame={1}
          showMotion={false}
          showWatermark={false}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        {hotspots.map((hotspot, index) => (
          <button
            key={hotspot.id}
            type="button"
            onClick={() => setActiveId(activeId === hotspot.id ? null : hotspot.id)}
            className={cn(
              'absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 text-xs font-black shadow-lg transition',
              activeId === hotspot.id
                ? 'scale-110 border-white bg-ink text-white'
                : 'border-white/90 bg-white/90 text-ink hover:scale-110',
            )}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            aria-label={hotspot.label}
            aria-pressed={activeId === hotspot.id}
          >
            {index + 1}
          </button>
        ))}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-2xl bg-black/35 px-3 py-2 text-white backdrop-blur-md">
          <MousePointerClick className="h-4 w-4 shrink-0 text-white/80" />
          <p className="text-xs font-bold leading-5">
            {active ? active.label : 'Toca los puntos para revisar la forma de la mano.'}
          </p>
        </div>
      </div>
    </div>
  );
}
