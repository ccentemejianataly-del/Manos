import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { useDemoStore } from '../store/demoStore';

const colors = ['#6C4CF1', '#FF6B6B', '#F59E0B', '#0D9488', '#3B82F6', '#FF8A7A', '#A78BFA'];

interface ConfettiProps {
  pieces?: number;
}

export function Confetti({ pieces = 46 }: ConfettiProps) {
  const reducedMotion = useDemoStore((state) => state.settings.reducedMotion);
  const items = useMemo(
    () =>
      Array.from({ length: pieces }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.9}s`,
        duration: `${2.3 + Math.random() * 2}s`,
        drift: `${-70 + Math.random() * 140}px`,
        spin: `${360 + Math.random() * 720}deg`,
        color: colors[index % colors.length],
        width: `${6 + Math.random() * 6}px`,
        height: `${10 + Math.random() * 9}px`,
      })),
    [pieces],
  );

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className="confetti-piece"
          style={
            {
              left: item.left,
              backgroundColor: item.color,
              width: item.width,
              height: item.height,
              '--delay': item.delay,
              '--duration': item.duration,
              '--drift': item.drift,
              '--spin': item.spin,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
