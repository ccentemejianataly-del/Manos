import { useId } from 'react';
import { getCategory } from '../data/categories';
import { useDemoStore } from '../store/demoStore';
import type { HandConfig, Sign, SignMotion } from '../types';
import { cn } from '../lib/utils';

const fingerPresets: Record<HandConfig, [number, number, number, number]> = {
  open: [0.92, 1, 0.96, 0.82],
  flat: [0.82, 0.86, 0.84, 0.78],
  fist: [0.16, 0.16, 0.16, 0.16],
  index: [0.98, 0.18, 0.18, 0.18],
  v: [0.98, 0.96, 0.18, 0.18],
  three: [0.98, 0.96, 0.94, 0.18],
  four: [0.98, 0.96, 0.94, 0.9],
  pinch: [0.32, 0.5, 0.48, 0.32],
  thumb: [0.2, 0.2, 0.2, 0.2],
};

const spreadPresets: Record<HandConfig, [number, number, number, number]> = {
  open: [-7, -2, 3, 8],
  flat: [0, 0, 0, 0],
  fist: [0, 0, 0, 0],
  index: [-4, 0, 0, 0],
  v: [-7, 7, 0, 0],
  three: [-6, 0, 6, 0],
  four: [-7, -2, 3, 8],
  pinch: [0, 0, 0, 0],
  thumb: [0, 0, 0, 0],
};

const frameTransforms: Record<
  SignMotion,
  Array<{ x: number; y: number; rotate: number }>
> = {
  wave: [
    { x: 0, y: 0, rotate: -9 },
    { x: 0, y: 0, rotate: 0 },
    { x: 0, y: 0, rotate: 9 },
  ],
  forward: [
    { x: -8, y: 0, rotate: -2 },
    { x: 0, y: 0, rotate: 0 },
    { x: 11, y: -2, rotate: 2 },
  ],
  down: [
    { x: 0, y: -8, rotate: -2 },
    { x: 0, y: 3, rotate: 0 },
    { x: 0, y: 13, rotate: 2 },
  ],
  up: [
    { x: 0, y: 12, rotate: 2 },
    { x: 0, y: 2, rotate: 0 },
    { x: 0, y: -8, rotate: -2 },
  ],
  circle: [
    { x: -4, y: 0, rotate: -7 },
    { x: 3, y: 0, rotate: 2 },
    { x: 8, y: -1, rotate: 8 },
  ],
  shake: [
    { x: -4, y: 0, rotate: -4 },
    { x: 4, y: 0, rotate: 4 },
    { x: -2, y: 0, rotate: -2 },
  ],
  none: [
    { x: 0, y: 0, rotate: 0 },
    { x: 0, y: 0, rotate: 0 },
    { x: 0, y: 0, rotate: 0 },
  ],
};

const positionOffsets = {
  high: -9,
  mid: 2,
  low: 13,
};

interface HandProps {
  config: HandConfig;
  skin?: string;
  skinDark?: string;
  scale?: number;
  x?: number;
  y?: number;
  rotate?: number;
  mirrored?: boolean;
}

function Hand({
  config,
  skin = '#F2B98A',
  skinDark = '#D99B6C',
  scale = 1,
  x = 0,
  y = 0,
  rotate = 0,
  mirrored = false,
}: HandProps) {
  const lengths = fingerPresets[config];
  const spreads = spreadPresets[config];
  const baseX = [81, 101, 121, 140];
  const fingerWidths = [18, 18, 18, 16];
  const thumbAngle = config === 'open' || config === 'four' ? -38 : -27;

  return (
    <g
      transform={`translate(${x} ${y}) scale(${mirrored ? -scale : scale} ${scale}) rotate(${rotate} 121 144)`}
    >
      <g transform={`rotate(${thumbAngle} 70 142)`}>
        <rect x="56" y="102" width="21" height="64" rx="10.5" fill={skin} />
        <circle cx="66.5" cy="103" r="10.5" fill={skin} />
      </g>

      {lengths.map((length, index) => {
        const fingerLength = 14 + length * 65;
        const fingerX = baseX[index] + spreads[index];
        const fingerY = 102 - fingerLength;
        return (
          <g key={`${config}-${index}`}>
            <rect
              x={fingerX}
              y={fingerY}
              width={fingerWidths[index]}
              height={fingerLength + 24}
              rx={fingerWidths[index] / 2}
              fill={skin}
            />
            <rect
              x={fingerX + 4}
              y={fingerY + 6}
              width={fingerWidths[index] - 8}
              height={Math.max(8, fingerLength * 0.45)}
              rx={4}
              fill="#FFD3B0"
              opacity="0.35"
            />
          </g>
        );
      })}

      <rect x="102" y="182" width="38" height="42" rx="15" fill={skin} />
      <path
        d="M76 101C76 90 84 83 96 83H148C160 83 168 91 168 103V170C168 190 154 204 134 204H110C90 204 76 190 76 170Z"
        fill={skin}
      />
      <path
        d="M88 116C88 108 94 103 102 103H143C151 103 157 109 157 117V145C157 153 151 159 143 159H102C94 159 88 153 88 145Z"
        fill="#FFD3B0"
        opacity="0.3"
      />
      <path
        d="M104 187V167M128 187V160M151 182V159"
        stroke={skinDark}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.38"
      />
      <path
        d="M86 170C97 178 113 182 130 181C145 180 155 175 162 168"
        stroke={skinDark}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.28"
      />
      <rect x="104" y="199" width="34" height="24" rx="12" fill={skinDark} opacity="0.38" />
    </g>
  );
}

function MotionArrow({ motion, markerId }: { motion: SignMotion; markerId: string }) {
  if (motion === 'none') return null;

  const common = {
    fill: 'none',
    stroke: 'rgba(255,255,255,0.82)',
    strokeWidth: 3,
    strokeLinecap: 'round' as const,
    strokeDasharray: '5 7',
    markerEnd: `url(#${markerId})`,
    opacity: 0.9,
  };

  if (motion === 'forward') {
    return <path d="M172 118C193 116 207 116 218 118" {...common} />;
  }

  if (motion === 'down') {
    return <path d="M172 174C181 191 181 202 174 216" {...common} />;
  }

  if (motion === 'up') {
    return <path d="M174 96C182 79 182 66 176 53" {...common} />;
  }

  if (motion === 'circle') {
    return <path d="M174 88C202 105 205 145 178 165C162 177 143 174 134 163" {...common} />;
  }

  if (motion === 'shake') {
    return (
      <>
        <path d="M156 82C178 73 203 75 220 88" {...common} />
        <path d="M220 142C199 153 176 154 154 146" {...common} />
      </>
    );
  }

  return (
    <>
      <path d="M178 76C207 88 216 112 197 128" {...common} />
      <path d="M191 124L197 129L200 121" {...common} strokeDasharray="0" />
    </>
  );
}

interface SignArtProps {
  sign: Sign;
  frame?: number;
  mirrored?: boolean;
  className?: string;
  label?: string;
  showMotion?: boolean;
  showWatermark?: boolean;
}

export function SignArt({
  sign,
  frame = 1,
  mirrored = false,
  className,
  label,
  showMotion = true,
  showWatermark = true,
}: SignArtProps) {
  const category = getCategory(sign.category);
  const reducedMotion = useDemoStore((state) => state.settings.reducedMotion);
  const rawId = useId();
  const markerId = `arrow-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const safeFrame = Math.min(Math.max(frame, 0), 2);
  const transform = frameTransforms[sign.visual.motion][safeFrame];
  const positionY = positionOffsets[sign.visual.position];
  const hasSecondHand = Boolean(sign.visual.secondHand);
  const layout = sign.visual.layout ?? 'left';

  const mainHand = hasSecondHand ? (
    layout === 'below' ? (
      <Hand
        config={sign.visual.hand}
        x={45}
        y={-26 + positionY}
        scale={0.72}
        rotate={transform.rotate}
      />
    ) : (
      <Hand
        config={sign.visual.hand}
        x={82}
        y={11 + positionY}
        scale={0.66}
        rotate={transform.rotate}
      />
    )
  ) : (
    <Hand
      config={sign.visual.hand}
      x={10 + transform.x}
      y={-6 + positionY + transform.y}
      rotate={transform.rotate}
    />
  );

  const secondHand = sign.visual.secondHand ? (
    layout === 'below' ? (
      <Hand
        config={sign.visual.secondHand}
        x={45}
        y={70 + positionY}
        scale={0.68}
        rotate={-transform.rotate * 0.5 - 7}
      />
    ) : (
      <Hand
        config={sign.visual.secondHand}
        x={-7}
        y={29 + positionY}
        scale={0.64}
        rotate={-transform.rotate * 0.5 + 5}
        mirrored
      />
    )
  ) : null;

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        background: `radial-gradient(circle at 24% 17%, rgba(255,255,255,0.32), transparent 34%), linear-gradient(145deg, ${category.color}, ${category.color2})`,
      }}
    >
      <div className="pointer-events-none absolute -right-7 -top-9 h-28 w-28 rounded-full border border-white/20" />
      <div className="pointer-events-none absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-white/10 blur-[2px]" />
      <div className="pointer-events-none absolute bottom-5 right-4 h-2 w-2 rounded-full bg-white/45" />
      <div className="pointer-events-none absolute right-10 top-7 h-1.5 w-1.5 rounded-full bg-white/35" />

      <svg
        viewBox="0 0 240 240"
        role="img"
        aria-label={label ?? `Ilustración de demostración de la seña ${sign.gloss} en LSP`}
        className="relative h-full w-full"
        style={{ transform: mirrored ? 'scaleX(-1)' : undefined }}
      >
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="4.5"
            markerHeight="4.5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.9)" />
          </marker>
          <filter id={`${markerId}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="7" stdDeviation="7" floodColor="#3A1D0E" floodOpacity="0.2" />
          </filter>
        </defs>

        <g
          style={{
            transformOrigin: '120px 150px',
            transition: reducedMotion
              ? 'none'
              : 'transform 480ms cubic-bezier(0.22, 0.8, 0.25, 1)',
            transform: `translate(${transform.x * 0.5}px, ${transform.y * 0.5}px)`,
          }}
          filter={`url(#${markerId}-shadow)`}
        >
          {secondHand}
          {mainHand}
        </g>

        {showMotion ? <MotionArrow motion={sign.visual.motion} markerId={markerId} /> : null}
      </svg>

      {showWatermark ? (
        <div className="pointer-events-none absolute left-3 top-2.5 flex items-center gap-1.5">
          <span className="rounded-full bg-black/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-white/85 backdrop-blur-sm">
            LSP
          </span>
          <span className="text-[9px] font-bold text-white/60">demo</span>
        </div>
      ) : null}
    </div>
  );
}

export function HandGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <path
        d="M22 57V37L17 30C15 27 17 24 20 24C22 24 23 25 25 27L28 31V13C28 10 30 8 33 8C36 8 38 10 38 13V26L41 22C43 19 47 20 48 23C49 25 48 27 46 29L43 33V31C43 28 45 26 48 26C51 26 53 28 53 31V39C53 49 47 57 37 57H22Z"
        fill="currentColor"
      />
      <path
        d="M28 37V42M34 35V43M40 36V42"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
