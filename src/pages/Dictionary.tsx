import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Hand,
  Search,
  SearchX,
  Sparkles,
  X,
} from 'lucide-react';
import { DemoNote } from '../components/DemoNote';
import { HandGlyph } from '../components/SignArt';
import { Modal } from '../components/Modal';
import { SignArt } from '../components/SignArt';
import { categories, getCategory } from '../data/categories';
import { signs } from '../data/signs';
import { useDemoStore } from '../store/demoStore';
import { cn } from '../lib/utils';
import type { CategoryId } from '../types';

type Filter = 'all' | 'alfabeto' | CategoryId;

const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const letterColors = [
  ['#6C4CF1', '#8E70FF'],
  ['#FF6B6B', '#FF8A7A'],
  ['#0D9488', '#2DD4BF'],
  ['#F59E0B', '#FBBF24'],
  ['#F97316', '#FB923C'],
  ['#3B82F6', '#60A5FA'],
];

function LetterCard({ letter, index, onClick }: { letter: string; index: number; onClick: () => void }) {
  const palette = letterColors[index % letterColors.length];
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-card text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
      style={{
        background: `radial-gradient(circle at 22% 18%, rgba(255,255,255,.3), transparent 35%), linear-gradient(145deg, ${palette[0]}, ${palette[1]})`,
      }}
      aria-label={`Ver letra ${letter} del alfabeto dactilológico`}
    >
      <HandGlyph className="absolute -bottom-4 -right-2 h-24 w-24 text-white/20 transition group-hover:scale-105" />
      <span className="absolute left-3 top-2.5 text-[8px] font-black uppercase tracking-[0.15em] text-white/65">
        LSP demo
      </span>
      <span className="absolute inset-0 grid place-items-center font-display text-4xl font-semibold text-white drop-shadow-sm">
        {letter}
      </span>
      <span className="absolute bottom-2.5 left-3 text-[8px] font-bold text-white/60">
        Alfabeto
      </span>
    </button>
  );
}

function SignCard({ signId }: { signId: string }) {
  const sign = signs.find((item) => item.id === signId);
  const viewedSignIds = useDemoStore((state) => state.viewedSignIds);
  if (!sign) return null;
  const category = getCategory(sign.category);
  const viewed = viewedSignIds.includes(sign.id);

  return (
    <Link
      to={`/diccionario/${sign.id}`}
      className="group overflow-hidden rounded-3xl border border-line bg-card shadow-soft transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
    >
      <div className="relative">
        <SignArt sign={sign} frame={1} showWatermark={false} className="aspect-[4/3]" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/20 px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white/90 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: category.color2 }} />
          {category.label}
        </span>
        {viewed ? (
          <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-white/85 text-emerald-600 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5" />
          </span>
        ) : null}
      </div>
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-muted">{sign.gloss}</p>
            <h3 className="mt-0.5 truncate font-display text-xl font-semibold text-ink">
              {sign.translation}
            </h3>
          </div>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-surface text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1" aria-label={`Dificultad ${sign.difficulty} de 3`}>
            {[1, 2, 3].map((level) => (
              <span
                key={level}
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  level <= sign.difficulty ? 'bg-brand-400' : 'bg-line',
                )}
              />
            ))}
            <span className="ml-1 text-[9px] font-bold text-muted">nivel {sign.difficulty}</span>
          </div>
          <span className="text-[9px] font-black uppercase tracking-wide text-muted">Ver seña</span>
        </div>
      </div>
    </Link>
  );
}

export function Dictionary() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const viewedSignIds = useDemoStore((state) => state.viewedSignIds);

  const filteredSigns = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return signs.filter((sign) => {
      const matchesCategory = filter === 'all' || filter === sign.category;
      const matchesQuery =
        !normalized ||
        sign.translation.toLowerCase().includes(normalized) ||
        sign.gloss.toLowerCase().includes(normalized) ||
        sign.description.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [filter, query]);

  const filteredLetters = useMemo(() => {
    const normalized = query.trim().toUpperCase();
    if (!normalized) return alphabet;
    return alphabet.filter((letter) => letter.includes(normalized));
  }, [query]);

  const isAlphabet = filter === 'alfabeto';

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label">Aprende a tu ritmo</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Diccionario visual
          </h1>
          <p className="mt-1 max-w-xl text-sm font-semibold leading-6 text-muted">
            20 señas de demostración y el alfabeto dactilológico peruano para explorar cuando quieras.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-2xl border border-line bg-card px-3 py-2 shadow-soft">
          <BookOpen className="h-4 w-4 text-brand-500" />
          <span className="text-xs font-extrabold text-ink">
            {signs.length} señas · {alphabet.length} letras
          </span>
        </div>
      </div>

      <div className="card p-3 sm:p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar una seña, palabra o letra..."
            className="input pl-10 pr-10"
            aria-label="Buscar en el diccionario"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-surface text-muted transition hover:text-ink"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>

        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={cn(
              'shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-extrabold transition',
              filter === 'all'
                ? 'border-brand-500 bg-brand-500 text-white shadow-soft'
                : 'border-line bg-card text-muted hover:border-brand-200 hover:text-ink',
            )}
          >
            Todas
          </button>
          {categories.map((category) => {
            const active = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setFilter(category.id)}
                className={cn(
                  'shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-extrabold transition',
                  active
                    ? 'border-transparent text-white shadow-soft'
                    : 'border-line bg-card text-muted hover:text-ink',
                )}
                style={active ? { backgroundColor: category.color } : undefined}
              >
                {category.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setFilter('alfabeto')}
            className={cn(
              'shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-extrabold transition',
              filter === 'alfabeto'
                ? 'border-brand-500 bg-brand-500 text-white shadow-soft'
                : 'border-line bg-card text-muted hover:border-brand-200 hover:text-ink',
            )}
          >
            Alfabeto
          </button>
        </div>
      </div>

      {isAlphabet ? (
        <section aria-labelledby="alphabet-title">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="label">Deletrea con tus manos</p>
              <h2 id="alphabet-title" className="section-title mt-1">
                Alfabeto dactilológico
              </h2>
            </div>
            <span className="text-[10px] font-extrabold text-muted">
              {filteredLetters.length} letras
            </span>
          </div>
          {filteredLetters.length > 0 ? (
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9">
              {filteredLetters.map((letter, index) => (
                <LetterCard
                  key={letter}
                  letter={letter}
                  index={alphabet.indexOf(letter) + index}
                  onClick={() => setSelectedLetter(letter)}
                />
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <SearchX className="mx-auto h-8 w-8 text-muted" />
              <p className="mt-2 font-display text-lg font-semibold text-ink">No encontramos esa letra</p>
              <button type="button" onClick={() => setQuery('')} className="btn-secondary mt-3">
                Limpiar búsqueda
              </button>
            </div>
          )}
          <div className="mt-4 flex items-start gap-2 rounded-2xl border border-brand-100 bg-brand-50/70 px-3.5 py-3 text-brand-900 dark:border-brand-800 dark:bg-brand-900/20 dark:text-brand-100">
            <Hand className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-xs font-semibold leading-5">
              Cada letra abrirá una ficha de demostración. Las configuraciones de mano del alfabeto
              dactilológico peruano todavía no están validadas lingüísticamente.
            </p>
          </div>
        </section>
      ) : (
        <section aria-labelledby="signs-title">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="label">Explora por categoría</p>
              <h2 id="signs-title" className="section-title mt-1">
                {filter === 'all' ? 'Todas las señas' : getCategory(filter).label}
              </h2>
            </div>
            <span className="text-[10px] font-extrabold text-muted">
              {filteredSigns.length} de {signs.length} señas
              {viewedSignIds.length > 0 ? ` · ${viewedSignIds.length} vistas` : ''}
            </span>
          </div>

          {filteredSigns.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
              {filteredSigns.map((sign) => (
                <SignCard key={sign.id} signId={sign.id} />
              ))}
            </div>
          ) : (
            <div className="card p-10 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-surface text-muted">
                <SearchX className="h-7 w-7" />
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                No encontramos resultados
              </h3>
              <p className="mt-1 text-sm font-semibold text-muted">
                Prueba con otra palabra o cambia de categoría.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setFilter('all');
                }}
                className="btn-secondary mt-4"
              >
                Ver todas las señas
              </button>
            </div>
          )}
        </section>
      )}

      <DemoNote />

      <Modal
        open={Boolean(selectedLetter)}
        onClose={() => setSelectedLetter(null)}
        title={`Letra ${selectedLetter ?? ''}`}
        description="Alfabeto dactilológico peruano · ficha de demostración"
        size="sm"
      >
        {selectedLetter ? (
          <div className="space-y-4">
            <div
              className="relative aspect-square overflow-hidden rounded-3xl"
              style={{
                background:
                  'radial-gradient(circle at 28% 20%, rgba(255,255,255,.32), transparent 35%), linear-gradient(145deg, #6C4CF1, #8E70FF)',
              }}
            >
              <HandGlyph className="absolute -bottom-10 -right-8 h-52 w-52 text-white/20" />
              <span className="absolute inset-0 grid place-items-center font-display text-[8rem] font-semibold leading-none text-white">
                {selectedLetter}
              </span>
              <span className="absolute left-4 top-3 text-[9px] font-black uppercase tracking-[0.16em] text-white/65">
                LSP · demo
              </span>
            </div>
            <div className="flex items-start gap-2 rounded-2xl border border-amber-200/70 bg-amber-50/80 px-3.5 py-3 text-amber-900 dark:border-amber-700/40 dark:bg-amber-900/15 dark:text-amber-100">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-xs font-semibold leading-5">
                La ilustración de esta letra es una referencia visual de demostración. La forma
                exacta de la mano se validará con la comunidad sorda peruana.
              </p>
            </div>
            <Link to="/practicar" className="btn-primary w-full" onClick={() => setSelectedLetter(null)}>
              Practicar el alfabeto
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
