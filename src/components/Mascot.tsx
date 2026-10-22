import { useId } from 'react';
import { cn } from '../lib/utils';

type MascotMood = 'happy' | 'wave' | 'celebrate' | 'calm';

interface MascotProps {
  className?: string;
  mood?: MascotMood;
  float?: boolean;
}

export function Mascot({ className, mood = 'happy', float = true }: MascotProps) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const bodyId = `mascot-body-${id}`;
  const highlightId = `mascot-highlight-${id}`;
  const shadowId = `mascot-shadow-${id}`;
  const isCelebrating = mood === 'celebrate';
  const isCalm = mood === 'calm';

  return (
    <div
      className={cn(
        'relative select-none',
        float && !isCalm && 'animate-floaty',
        className,
      )}
      aria-hidden="true"
    >
      {isCelebrating ? (
        <>
          <span className="absolute -left-2 top-7 text-2xl">✦</span>
          <span className="absolute -right-1 top-2 text-xl text-amber-400">✦</span>
          <span className="absolute bottom-10 right-0 text-lg text-coral-400">✦</span>
        </>
      ) : null}

      <svg viewBox="0 0 230 230" className="h-full w-full drop-shadow-[0_18px_24px_rgba(76,49,158,0.18)]">
        <defs>
          <linearGradient id={bodyId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8E70FF" />
            <stop offset="100%" stopColor="#5A39E0" />
          </linearGradient>
          <linearGradient id={highlightId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C4B4FF" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#C4B4FF" stopOpacity="0" />
          </linearGradient>
          <filter id={shadowId} x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#2F1A75" floodOpacity="0.23" />
          </filter>
        </defs>

        <ellipse cx="115" cy="213" rx="54" ry="9" fill="#3A2880" opacity="0.12" />

        <g filter={`url(#${shadowId})`}>
          <path
            d="M64 190V110C64 96 72 88 84 88C92 88 97 92 100 99V70C100 55 108 48 119 48C130 48 138 55 138 70V101C141 94 146 90 154 90C164 90 171 97 171 109V154C171 186 150 202 120 202H95C77 202 64 198 64 190Z"
            fill={`url(#${bodyId})`}
          />
          <path
            d="M78 128C88 112 111 105 137 111C152 114 162 121 168 131C155 137 143 140 128 140C107 140 90 136 78 128Z"
            fill={`url(#${highlightId})`}
          />
          <path
            d="M82 171C97 181 130 184 158 170"
            stroke="#4526B7"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.42"
            fill="none"
          />
        </g>

        <g>
          <ellipse cx="97" cy="132" rx="7.5" ry="9" fill="#2C185F" className="mascot-eye" />
          <ellipse cx="143" cy="132" rx="7.5" ry="9" fill="#2C185F" className="mascot-eye" />
          <circle cx="99.5" cy="129" r="2.4" fill="white" />
          <circle cx="145.5" cy="129" r="2.4" fill="white" />
          <ellipse cx="82" cy="151" rx="8" ry="4.5" fill="#FF9F9F" opacity="0.6" />
          <ellipse cx="158" cy="151" rx="8" ry="4.5" fill="#FF9F9F" opacity="0.6" />
          {isCalm ? (
            <path
              d="M107 157C113 161 126 161 132 157"
              stroke="#2C185F"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            <path
              d="M103 154C109 166 126 166 134 154"
              stroke="#2C185F"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </g>

        <g transform="translate(168 82) rotate(18)">
          <path
            d="M0 18C11 12 25 18 29 31C32 43 25 52 16 53C8 54 0 47 0 36V18Z"
            fill="#7C5CFA"
          />
          <path
            d="M8 28C13 25 20 27 22 33"
            stroke="#C4B4FF"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
            fill="none"
          />
        </g>

        {mood === 'wave' ? (
          <g transform="translate(34 118) rotate(-20)">
            <path
              d="M0 8C-10 2 -23 7 -27 20C-31 33 -24 44 -13 45C-4 46 4 39 4 28V8Z"
              fill="#7C5CFA"
            />
            <path
              d="M-20 18C-14 14 -7 16 -5 22"
              stroke="#C4B4FF"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.55"
              fill="none"
            />
          </g>
        ) : null}
      </svg>
    </div>
  );
}
