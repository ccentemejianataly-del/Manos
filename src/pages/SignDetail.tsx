import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Play,
  Share2,
  Sparkles,
} from 'lucide-react';
import { DemoNote } from '../components/DemoNote';
import { SignArt } from '../components/SignArt';
import { SignDiagram } from '../components/SignDiagram';
import { SignSequence } from '../components/SignSequence';
import { Toast } from '../components/Toast';
import { achievementMap } from '../data/achievements';
import { getCategory } from '../data/categories';
import { getRelatedSigns, getSign } from '../data/signs';
import { useDemoStore } from '../store/demoStore';
import { cn } from '../lib/utils';
import type { HandConfig, HandPosition, SignMotion } from '../types';

const handLabels: Record<HandConfig, string> = {
  open: 'Mano abierta',
  flat: 'Mano plana',
  fist: 'Puño cerrado',
  index: 'Índice extendido',
  v: 'Dos dedos en V',
  three: 'Tres dedos',
  four: 'Cuatro dedos',
  pinch: 'Pellizco',
  thumb: 'Pulgar',
};

const motionLabels: Record<SignMotion, string> = {
  wave: 'Ondulación',
  forward: 'Hacia adelante',
  down: 'Hacia abajo',
  up: 'Hacia arriba',
  circle: 'Movimiento circular',
  shake: 'De lado a lado',
  none: 'Sin desplazamiento',
};

const positionLabels: Record<HandPosition, string> = {
  high: 'Altura alta',
  mid: 'Altura media',
  low: 'Altura baja',
};

export function SignDetail() {
  const { signId } = useParams();
  const navigate = useNavigate();
  const sign = signId ? getSign(signId) : undefined;
  const markSignViewed = useDemoStore((state) => state.markSignViewed);
  const showTextAlternatives = useDemoStore((state) => state.settings.showTextAlternatives);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!sign) return;
    setSaved(false);
    const unlocked = markSignViewed(sign.id);
    if (unlocked.length > 0) {
      const titles = unlocked
        .map((id) => achievementMap[id]?.title)
        .filter(Boolean)
        .join(', ');
      setToast(`Nuevo logro: ${titles}`);
    }
  }, [sign, markSignViewed]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  if (!sign) {
    return <Navigate to="/diccionario" replace />;
  }

  const category = getCategory(sign.category);
  const related = getRelatedSigns(sign);
  const twoHands = Boolean(sign.visual.secondHand);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast('Enlace copiado');
    } catch {
      setToast('No se pudo copiar el enlace');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/diccionario"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-2 text-xs font-extrabold text-muted shadow-soft transition hover:border-brand-200 hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Diccionario
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={share}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-2 text-xs font-extrabold text-muted shadow-soft transition hover:border-brand-200 hover:text-brand-600"
          >
            <Share2 className="h-3.5 w-3.5" />
            Compartir
          </button>
          <button
            type="button"
            onClick={() => {
              setSaved((value) => !value);
              setToast(saved ? 'Seña quitada de guardados' : 'Seña guardada en esta sesión');
            }}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-extrabold shadow-soft transition',
              saved
                ? 'border-brand-200 bg-brand-50 text-brand-600 dark:bg-brand-900/25 dark:text-brand-300'
                : 'border-line bg-card text-muted hover:border-brand-200 hover:text-brand-600',
            )}
            aria-pressed={saved}
          >
            {saved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
            {saved ? 'Guardada' : 'Guardar'}
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] lg:items-start">
        <section className="space-y-4">
          <SignSequence sign={sign} />

          {sign.visual.hotspots && sign.visual.hotspots.length > 0 ? (
            <div>
              <div className="mb-2 flex items-end justify-between">
                <div>
                  <p className="label">Puntos clave</p>
                  <h2 className="section-title mt-0.5">Forma y ubicación</h2>
                </div>
                <span className="text-[10px] font-extrabold text-muted">Diagrama interactivo</span>
              </div>
              <SignDiagram sign={sign} />
            </div>
          ) : null}
        </section>

        <section className="card overflow-hidden">
          <div
            className="relative px-5 pb-5 pt-6 text-white"
            style={{
              background: `linear-gradient(145deg, ${category.color}, ${category.color2})`,
            }}
          >
            <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full border-[18px] border-white/15" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
              {category.label} · LSP Perú
            </span>
            <p className="mt-4 text-[11px] font-black uppercase tracking-[0.2em] text-white/65">
              {sign.gloss}
            </p>
            <h1 className="mt-1 font-display text-4xl font-semibold leading-tight">
              {sign.translation}
            </h1>
            <p className="mt-2 text-xs font-semibold text-white/75">
              Seña de demostración · nivel {sign.difficulty} de 3
            </p>
          </div>

          <div className="space-y-4 p-5">
            {showTextAlternatives ? (
              <>
                <div>
                  <p className="label">Descripción</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-muted">{sign.description}</p>
                </div>
                <div className="rounded-2xl bg-surface/70 p-3.5">
                  <p className="label">Expresión no manual</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-ink">
                    {sign.nonManualMarkers}
                  </p>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-line p-3.5 text-xs font-semibold leading-5 text-muted">
                Las descripciones de texto están ocultas en Ajustes. Las ilustraciones siguen
                disponibles con su texto alternativo.
              </div>
            )}

            <div>
              <p className="label">Cómo se forma</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="chip">{handLabels[sign.visual.hand]}</span>
                <span className="chip">{twoHands ? 'Dos manos' : 'Una mano'}</span>
                <span className="chip">{positionLabels[sign.visual.position]}</span>
                <span className="chip">{motionLabels[sign.visual.motion]}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/practicar')}
              className="btn-primary w-full"
            >
              <Play className="h-4 w-4 fill-current" />
              Practicar esta seña
            </button>
            <p className="text-center text-[10px] font-semibold text-muted">
              La práctica libre estará disponible próximamente.
            </p>
          </div>
        </section>
      </div>

      <DemoNote />

      <section>
        <div className="mb-2 flex items-end justify-between">
          <div>
            <p className="label">Sigue explorando</p>
            <h2 className="section-title mt-0.5">Señas relacionadas</h2>
          </div>
          <Link
            to="/diccionario"
            className="inline-flex items-center gap-1 text-xs font-extrabold text-muted transition hover:text-brand-600"
          >
            Ver todas <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {related.map((item) => {
            const relatedCategory = getCategory(item.category);
            return (
              <Link
                key={item.id}
                to={`/diccionario/${item.id}`}
                className="group overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition hover:-translate-y-0.5 hover:border-brand-200"
              >
                <SignArt sign={item} frame={1} className="aspect-[4/3]" />
                <div className="p-3">
                  <p className="text-[9px] font-black uppercase tracking-wider text-muted">
                    {relatedCategory.label}
                  </p>
                  <p className="mt-0.5 text-sm font-extrabold text-ink">{item.translation}</p>
                </div>
              </Link>
            );
          })}
          <Link
            to="/practicar"
            className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 p-3 text-center transition hover:bg-brand-50 dark:border-brand-800 dark:bg-brand-900/15"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-xs font-extrabold text-ink">Más práctica</span>
            <span className="text-[9px] font-bold text-muted">Próximamente</span>
          </Link>
        </div>
      </section>

      <Toast message={toast} />
    </div>
  );
}
