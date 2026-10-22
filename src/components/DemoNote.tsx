import { Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface DemoNoteProps {
  className?: string;
  compact?: boolean;
}

export function DemoNote({ className, compact = false }: DemoNoteProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-2 rounded-2xl border border-amber-200/70 bg-amber-50/80 px-3.5 py-2.5 text-amber-900 dark:border-amber-700/40 dark:bg-amber-900/15 dark:text-amber-100',
        className,
      )}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <p className={cn('font-semibold leading-5', compact ? 'text-[11px]' : 'text-xs')}>
        Contenido de demostración. Las ilustraciones y descripciones son simuladas; la validación
        lingüística con la comunidad sorda peruana está pendiente.
      </p>
    </div>
  );
}
