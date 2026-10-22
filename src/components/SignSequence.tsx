import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, FlipHorizontal2, Pause, Play, RotateCcw } from 'lucide-react';
import type { Sign } from '../types';
import { useDemoStore } from '../store/demoStore';
import { SignArt } from './SignArt';
import { cn } from '../lib/utils';

interface SignSequenceProps {
  sign: Sign;
  className?: string;
}

export function SignSequence({ sign, className }: SignSequenceProps) {
  const reducedMotion = useDemoStore((state) => state.settings.reducedMotion);
  const defaultMirror = useDemoStore((state) => state.settings.mirror);
  const [frame, setFrame] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [mirrored, setMirrored] = useState(defaultMirror);

  useEffect(() => {
    setFrame(1);
    setPlaying(false);
    setMirrored(defaultMirror);
  }, [sign.id, defaultMirror]);

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const interval = window.setInterval(() => {
      setFrame((current) => (current + 1) % 3);
    }, 820);
    return () => window.clearInterval(interval);
  }, [playing, reducedMotion]);

  const goTo = (nextFrame: number) => {
    setFrame((nextFrame + 3) % 3);
    setPlaying(false);
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-card">
        <SignArt
          sign={sign}
          frame={frame}
          mirrored={mirrored}
          className="aspect-square w-full sm:aspect-[4/3]"
        />
        <div className="absolute bottom-3 left-3 rounded-full bg-black/25 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm">
          Fotograma {frame + 1} / 3
        </div>
        <button
          type="button"
          onClick={() => setMirrored((value) => !value)}
          className={cn(
            'absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40',
            mirrored && 'bg-white/90 text-ink hover:bg-white',
          )}
          aria-label={mirrored ? 'Ver sin espejo' : 'Ver en espejo'}
          aria-pressed={mirrored}
          title={mirrored ? 'Ver sin espejo' : 'Ver en espejo'}
        >
          <FlipHorizontal2 className="h-[18px] w-[18px]" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-2 rounded-2xl border border-line bg-card p-2 shadow-soft">
        <button
          type="button"
          onClick={() => goTo(frame - 1)}
          className="grid h-10 w-10 place-items-center rounded-xl text-muted transition hover:bg-surface hover:text-ink"
          aria-label="Fotograma anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {[0, 1, 2].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => goTo(item)}
              className={cn(
                'h-2.5 rounded-full transition-all',
                item === frame ? 'w-7 bg-brand-500' : 'w-2.5 bg-line hover:bg-brand-200',
              )}
              aria-label={`Ir al fotograma ${item + 1}`}
              aria-current={item === frame}
            />
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              if (reducedMotion) return;
              setPlaying((value) => !value);
            }}
            disabled={reducedMotion}
            className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500 text-white shadow-lift transition hover:bg-brand-600 disabled:opacity-40"
            aria-label={playing ? 'Pausar secuencia' : 'Reproducir secuencia'}
            title={reducedMotion ? 'Movimiento reducido activado' : undefined}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => goTo(frame + 1)}
            className="grid h-10 w-10 place-items-center rounded-xl text-muted transition hover:bg-surface hover:text-ink"
            aria-label="Fotograma siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setFrame(0);
              setPlaying(false);
            }}
            className="grid h-10 w-10 place-items-center rounded-xl text-muted transition hover:bg-surface hover:text-ink"
            aria-label="Volver al inicio"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
