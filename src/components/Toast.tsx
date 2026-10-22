import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  tone?: 'success' | 'info';
}

export function Toast({ message, tone = 'success' }: ToastProps) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          className="fixed bottom-24 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-extrabold text-canvas shadow-card lg:bottom-8"
          role="status"
        >
          <span
            className={
              tone === 'success'
                ? 'grid h-5 w-5 place-items-center rounded-full bg-emerald-400 text-ink'
                : 'grid h-5 w-5 place-items-center rounded-full bg-brand-400 text-white'
            }
          >
            <Check className="h-3.5 w-3.5" />
          </span>
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
