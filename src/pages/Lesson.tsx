import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  Flame,
  Hand,
  Languages,
  Link2,
  ListOrdered,
  Play,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { Modal } from '../components/Modal';
import { SignArt } from '../components/SignArt';
import { getCategory } from '../data/categories';
import { getSign } from '../data/signs';
import { getLesson, getUnitForLesson } from '../data/units';
import { buildLessonExercises, getExerciseAnswerLabel } from '../lib/exercises';
import { useDemoStore } from '../store/demoStore';
import { cn } from '../lib/utils';
import type { Exercise, Sign } from '../types';

const optionLetters = ['A', 'B', 'C', 'D'];

function PromptIcon({ type }: { type: Exercise['type'] }) {
  if (type === 'sign_to_meaning') return <Hand className="h-4 w-4" />;
  if (type === 'meaning_to_sign') return <Languages className="h-4 w-4" />;
  if (type === 'match_pairs') return <Link2 className="h-4 w-4" />;
  return <ListOrdered className="h-4 w-4" />;
}

function promptCopy(type: Exercise['type']): { eyebrow: string; title: string; hint: string } {
  if (type === 'sign_to_meaning') {
    return {
      eyebrow: 'Observa la seña',
      title: '¿Qué significa?',
      hint: 'Elige la opción que mejor la describe.',
    };
  }
  if (type === 'meaning_to_sign') {
    return {
      eyebrow: 'Encuentra la seña',
      title: '¿Cuál corresponde?',
      hint: 'Selecciona la ilustración correcta.',
    };
  }
  if (type === 'match_pairs') {
    return {
      eyebrow: 'Conecta las parejas',
      title: 'Une cada seña con su significado',
      hint: 'Toca una seña y luego su significado.',
    };
  }
  return {
    eyebrow: 'Piensa en el movimiento',
    title: 'Ordena los fotogramas',
    hint: 'Toca los fotogramas en el orden correcto.',
  };
}

function getPairSigns(exercise: Extract<Exercise, { type: 'match_pairs' }>): Array<{
  signId: string;
  sign: Sign;
  letter: string;
}> {
  return exercise.pairs
    .map((pair, index) => {
      const sign = getSign(pair.signId);
      return sign ? { signId: pair.signId, sign, letter: optionLetters[index] ?? '?' } : null;
    })
    .filter((item): item is { signId: string; sign: Sign; letter: string } => Boolean(item));
}

export function Lesson() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const lesson = lessonId ? getLesson(lessonId) : undefined;
  const unit = lesson ? getUnitForLesson(lesson.id) : undefined;
  const exercises = useMemo(
    () => (lesson ? buildLessonExercises(lesson) : []),
    [lesson],
  );
  const completeLesson = useDemoStore((state) => state.completeLesson);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [matchSelectedSign, setMatchSelectedSign] = useState<string | null>(null);
  const [matchMapping, setMatchMapping] = useState<Record<string, string>>({});
  const [frameOrder, setFrameOrder] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [correctFirstTry, setCorrectFirstTry] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [exitOpen, setExitOpen] = useState(false);

  const resetForLesson = () => {
    setStarted(false);
    setIndex(0);
    setSelected(null);
    setMatchSelectedSign(null);
    setMatchMapping({});
    setFrameOrder([]);
    setChecked(false);
    setIsCorrect(false);
    setAttempts({});
    setScores({});
    setCorrectFirstTry(0);
    setCombo(0);
    setMaxCombo(0);
    setEarnedXp(0);
    setExitOpen(false);
  };

  useEffect(() => {
    resetForLesson();
    // Reset only when a different lesson is opened.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  if (!lesson) return <Navigate to="/aprender" replace />;

  const current = exercises[index];
  const total = exercises.length;
  const targetSigns = lesson.signIds
    .map((id) => getSign(id))
    .filter((sign): sign is Sign => Boolean(sign));

  const canCheck = (() => {
    if (!current) return false;
    if (current.type === 'sign_to_meaning' || current.type === 'meaning_to_sign') {
      return Boolean(selected);
    }
    if (current.type === 'match_pairs') {
      return Object.keys(matchMapping).length === current.pairs.length;
    }
    return frameOrder.length === 3;
  })();

  const resetInteraction = () => {
    setSelected(null);
    setMatchSelectedSign(null);
    setMatchMapping({});
    setFrameOrder([]);
    setChecked(false);
    setIsCorrect(false);
  };

  const evaluate = (exercise: Exercise): boolean => {
    if (exercise.type === 'sign_to_meaning' || exercise.type === 'meaning_to_sign') {
      return selected === exercise.answer;
    }
    if (exercise.type === 'match_pairs') {
      return exercise.pairs.every((pair) => matchMapping[pair.signId] === pair.text);
    }
    return (
      frameOrder.length === exercise.answer.length &&
      frameOrder.every((frame, frameIndex) => frame === exercise.answer[frameIndex])
    );
  };

  const handleCheck = () => {
    if (!current || !canCheck || checked) return;
    const correct = evaluate(current);
    const previousAttempts = attempts[current.id] ?? 0;

    setChecked(true);
    setIsCorrect(correct);
    setAttempts((previous) => ({ ...previous, [current.id]: previousAttempts + 1 }));

    if (correct) {
      if (scores[current.id] === undefined) {
        const points = previousAttempts === 0 ? 10 : 5;
        setScores((previous) => ({ ...previous, [current.id]: points }));
        setEarnedXp((previous) => previous + points);
      }

      if (previousAttempts === 0) {
        setCorrectFirstTry((previous) => previous + 1);
        setCombo((previous) => {
          const nextCombo = previous + 1;
          setMaxCombo((currentMax) => Math.max(currentMax, nextCombo));
          return nextCombo;
        });
      } else {
        setCombo(0);
      }
    } else {
      setCombo(0);
    }
  };

  const handleRetry = () => {
    resetInteraction();
  };

  const finishLesson = () => {
    const totalExercises = exercises.length;
    const accuracy =
      totalExercises > 0 ? Math.round((correctFirstTry / totalExercises) * 100) : 0;
    const result = completeLesson({
      lessonId: lesson.id,
      xpEarned: lesson.xp + earnedXp,
      accuracy,
      correctFirstTry,
      total: totalExercises,
      bestCombo: Math.max(maxCombo, combo),
    });
    navigate(`/leccion/${lesson.id}/resultado`, { state: result, replace: true });
  };

  const handleContinue = () => {
    if (!checked) return;
    if (index >= total - 1) {
      finishLesson();
      return;
    }
    setIndex((previous) => previous + 1);
    resetInteraction();
  };

  const openExit = () => {
    if (started) {
      setExitOpen(true);
    } else {
      navigate('/aprender');
    }
  };

  if (!started) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-canvas">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-36 -top-40 h-[430px] w-[430px] rounded-full bg-brand-300/25 blur-3xl dark:bg-brand-700/15"
          aria-hidden="true"
        />
        <header className="relative z-10 mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={openExit}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-muted shadow-soft transition hover:text-ink"
            aria-label="Salir de la lección"
          >
            <X className="h-5 w-5" />
          </button>
          <span className="chip border-brand-100 bg-brand-50 text-brand-600 dark:border-brand-800 dark:bg-brand-900/25 dark:text-brand-300">
            <Sparkles className="h-3 w-3" />
            Contenido demo
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-surface text-xs font-black text-muted">
            {index + 1}/{total}
          </span>
        </header>

        <main className="relative z-10 mx-auto max-w-3xl px-4 pb-12 pt-3 sm:px-6 sm:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-[2rem] border border-line bg-card shadow-card"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 px-5 pb-7 pt-6 text-white sm:px-8">
              <div className="pointer-events-none absolute -right-12 -top-20 h-52 w-52 rounded-full border-[24px] border-white/10" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/65">
                    {unit?.title ?? 'Lección'} · {lesson.xp} XP
                  </p>
                  <h1 className="mt-1 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                    {lesson.title}
                  </h1>
                  <p className="mt-2 max-w-md text-sm font-semibold leading-6 text-white/75">
                    {lesson.objective}
                  </p>
                </div>
                <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 sm:grid">
                  <Hand className="h-7 w-7" />
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <p className="label">En esta lección</p>
                <span className="text-[10px] font-extrabold text-muted">
                  {total} ejercicios · {targetSigns.length} señas
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {targetSigns.map((sign) => {
                  const category = getCategory(sign.category);
                  return (
                    <div
                      key={sign.id}
                      className="overflow-hidden rounded-2xl border border-line bg-card"
                    >
                      <SignArt sign={sign} className="aspect-square" />
                      <div className="px-2.5 py-2">
                        <p className="text-[8px] font-black uppercase tracking-wider text-muted">
                          {category.label}
                        </p>
                        <p className="truncate text-xs font-extrabold text-ink">
                          {sign.translation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-surface/70 px-3.5 py-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <p className="text-xs font-semibold leading-5 text-muted">
                  Responde sin prisas. Puedes reintentar un ejercicio; no hay vidas ni penalizaciones.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStarted(true)}
                className="btn-primary group mt-5 w-full py-4 text-base"
              >
                Empezar
                <Play className="h-4 w-4 fill-current transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="mt-3 text-center text-[10px] font-semibold text-muted">
                LSP · Perú · Ilustraciones de demostración
              </p>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={() => navigate('/aprender')}
            className="mx-auto mt-5 flex items-center gap-1.5 text-xs font-extrabold text-muted transition hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al inicio
          </button>
        </main>
      </div>
    );
  }

  if (!current) {
    return <Navigate to="/aprender" replace />;
  }

  const copy = promptCopy(current.type);
  const progress = total > 0 ? ((index + 1) / total) * 100 : 0;
  const answerLabel = getExerciseAnswerLabel(current);

  return (
    <div className="min-h-screen bg-canvas pb-56">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-canvas/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={openExit}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted transition hover:bg-surface hover:text-ink"
            aria-label="Salir de la lección"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <div className="h-2.5 overflow-hidden rounded-full bg-line/80">
              <div
                className="h-full rounded-full bg-brand-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {combo > 1 ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[10px] font-black text-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
                <Flame className="h-3 w-3" />
                {combo}
              </span>
            ) : null}
            <span className="text-[10px] font-black text-muted">
              {index + 1}/{total}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-5 sm:px-6 sm:pt-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="chip border-brand-100 bg-brand-50 text-brand-600 dark:border-brand-800 dark:bg-brand-900/25 dark:text-brand-300">
            <PromptIcon type={current.type} />
            {copy.eyebrow}
          </span>
          <span className="text-[10px] font-bold text-muted">{index + 1} de {total}</span>
        </div>

        <div className="mb-2">
          <h1 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            {copy.title}
          </h1>
          <p className="mt-1 text-sm font-semibold text-muted">{copy.hint}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-5"
          >
            {current.type === 'sign_to_meaning' ? (
              <div className="space-y-4">
                <div className="mx-auto max-w-md overflow-hidden rounded-[2rem] border border-line shadow-card">
                  <SignArt
                    sign={getSign(current.signId)!}
                    className="aspect-[4/3] w-full"
                    label="Seña de demostración para identificar"
                  />
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {current.options.map((option, optionIndex) => {
                    const isAnswer = checked && option === current.answer;
                    const isWrong = checked && selected === option && option !== current.answer;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => !checked && setSelected(option)}
                        disabled={checked}
                        className={cn(
                          'flex items-center gap-3 rounded-2xl border-2 bg-card p-3.5 text-left transition',
                          isAnswer
                            ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                            : isWrong
                              ? 'border-coral-400 bg-coral-500/10'
                              : selected === option
                                ? 'border-brand-400 bg-brand-50 dark:bg-brand-900/25'
                                : 'border-line hover:border-brand-200 hover:bg-surface/50',
                        )}
                        aria-pressed={selected === option}
                      >
                        <span
                          className={cn(
                            'grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-black',
                            isAnswer
                              ? 'bg-emerald-500 text-white'
                              : isWrong
                                ? 'bg-coral-500 text-white'
                                : selected === option
                                  ? 'bg-brand-500 text-white'
                                  : 'bg-surface text-muted',
                          )}
                        >
                          {isAnswer ? <Check className="h-4 w-4" /> : isWrong ? <X className="h-4 w-4" /> : optionLetters[optionIndex]}
                        </span>
                        <span className="text-sm font-extrabold text-ink">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {current.type === 'meaning_to_sign' ? (
              <div className="space-y-4">
                <div className="rounded-[2rem] border border-line bg-card px-5 py-6 text-center shadow-soft">
                  <p className="label">Seña de</p>
                  <p className="mt-1 font-display text-4xl font-semibold text-ink">
                    “{getSign(current.signId)?.translation}”
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {current.options.map((optionId, optionIndex) => {
                    const sign = getSign(optionId);
                    if (!sign) return null;
                    const isAnswer = checked && optionId === current.answer;
                    const isWrong = checked && selected === optionId && optionId !== current.answer;
                    return (
                      <button
                        key={optionId}
                        type="button"
                        onClick={() => !checked && setSelected(optionId)}
                        disabled={checked}
                        className={cn(
                          'group relative overflow-hidden rounded-2xl border-2 bg-card text-left transition',
                          isAnswer
                            ? 'border-emerald-400 ring-4 ring-emerald-400/15'
                            : isWrong
                              ? 'border-coral-400 ring-4 ring-coral-400/15'
                              : selected === optionId
                                ? 'border-brand-400 ring-4 ring-brand-400/15'
                                : 'border-line hover:-translate-y-0.5 hover:border-brand-200',
                        )}
                        aria-pressed={selected === optionId}
                        aria-label={`Opción ${optionLetters[optionIndex]}`}
                      >
                        <SignArt sign={sign} frame={1} showWatermark={false} className="aspect-[4/3]" />
                        <span className="absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-lg bg-black/25 text-[10px] font-black text-white backdrop-blur-sm">
                          {optionLetters[optionIndex]}
                        </span>
                        {isAnswer ? (
                          <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-white shadow-lg">
                            <Check className="h-4 w-4" />
                          </span>
                        ) : isWrong ? (
                          <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-coral-500 text-white shadow-lg">
                            <X className="h-4 w-4" />
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {current.type === 'match_pairs' ? (
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <p className="label">Señas</p>
                    {getPairSigns(current).map((item) => {
                      const mappedText = matchMapping[item.signId];
                      const pair = current.pairs.find((candidate) => candidate.signId === item.signId);
                      const pairIsCorrect = checked && pair && mappedText === pair.text;
                      const pairIsWrong = checked && mappedText && mappedText !== pair?.text;
                      return (
                        <button
                          key={item.signId}
                          type="button"
                          onClick={() => {
                            if (checked) return;
                            if (mappedText) {
                              setMatchMapping((previous) => {
                                const next = { ...previous };
                                delete next[item.signId];
                                return next;
                              });
                              setMatchSelectedSign(null);
                            } else {
                              setMatchSelectedSign(matchSelectedSign === item.signId ? null : item.signId);
                            }
                          }}
                          disabled={checked}
                          className={cn(
                            'flex w-full items-center gap-2.5 rounded-2xl border-2 bg-card p-2 text-left transition',
                            pairIsCorrect
                              ? 'border-emerald-400'
                              : pairIsWrong
                                ? 'border-coral-400'
                                : matchSelectedSign === item.signId
                                  ? 'border-brand-400 ring-4 ring-brand-400/10'
                                  : 'border-line hover:border-brand-200',
                          )}
                          aria-pressed={matchSelectedSign === item.signId}
                        >
                          <SignArt
                            sign={item.sign}
                            frame={1}
                            showWatermark={false}
                            className="h-20 w-20 shrink-0 rounded-xl"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[9px] font-black uppercase tracking-wider text-muted">
                              Seña {item.letter}
                            </span>
                            <span className="mt-0.5 block truncate text-xs font-extrabold text-ink">
                              {mappedText ?? 'Sin pareja'}
                            </span>
                          </span>
                          {pairIsCorrect ? <Check className="h-5 w-5 shrink-0 text-emerald-500" /> : null}
                          {pairIsWrong ? <X className="h-5 w-5 shrink-0 text-coral-500" /> : null}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-2">
                    <p className="label">Significados</p>
                    {current.pairs
                      .slice()
                      .sort((a, b) => a.text.localeCompare(b.text))
                      .map((pair) => {
                        const assignedSignId = Object.entries(matchMapping).find(
                          ([, text]) => text === pair.text,
                        )?.[0];
                        const assigned = assignedSignId
                          ? getPairSigns(current).find((item) => item.signId === assignedSignId)
                          : undefined;
                        const isCorrectPair =
                          checked && assignedSignId === pair.signId && matchMapping[pair.signId] === pair.text;
                        const isWrongPair =
                          checked &&
                          Boolean(assignedSignId) &&
                          assignedSignId !== pair.signId;
                        return (
                          <button
                            key={pair.text}
                            type="button"
                            onClick={() => {
                              if (checked || !matchSelectedSign) return;
                              setMatchMapping((previous) => {
                                const next: Record<string, string> = {};
                                Object.entries(previous).forEach(([signId, text]) => {
                                  if (text !== pair.text) next[signId] = text;
                                });
                                next[matchSelectedSign] = pair.text;
                                return next;
                              });
                              setMatchSelectedSign(null);
                            }}
                            disabled={checked}
                            className={cn(
                              'flex w-full items-center gap-2 rounded-2xl border-2 bg-card px-3 py-3 text-left text-sm font-extrabold text-ink transition',
                              isCorrectPair
                                ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                                : isWrongPair
                                  ? 'border-coral-400 bg-coral-500/10'
                                  : assigned
                                    ? 'border-brand-300 bg-brand-50/60 dark:bg-brand-900/20'
                                    : 'border-line hover:border-brand-200',
                            )}
                          >
                            <span
                              className={cn(
                                'grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[10px] font-black',
                                assigned
                                  ? 'bg-brand-500 text-white'
                                  : 'bg-surface text-muted',
                              )}
                            >
                              {assigned ? assigned.letter : '·'}
                            </span>
                            <span className="flex-1">{pair.text}</span>
                            {isCorrectPair ? <Check className="h-4 w-4 text-emerald-500" /> : null}
                            {isWrongPair ? <X className="h-4 w-4 text-coral-500" /> : null}
                          </button>
                        );
                      })}
                  </div>
                </div>
                <p className="text-center text-[10px] font-semibold text-muted">
                  Toca una seña, luego su significado. Vuelve a tocar la seña para deshacer.
                </p>
              </div>
            ) : null}

            {current.type === 'frame_order' ? (
              <div className="space-y-4">
                <div className="rounded-[2rem] border border-line bg-card p-3 shadow-soft">
                  <div className="mb-2 flex items-center justify-between px-1">
                    <p className="label">Tu secuencia</p>
                    {frameOrder.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => !checked && setFrameOrder([])}
                        disabled={checked}
                        className="inline-flex items-center gap-1 text-[10px] font-extrabold text-muted transition hover:text-ink disabled:opacity-40"
                      >
                        <RotateCcw className="h-3 w-3" /> Reiniciar
                      </button>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 1, 2].map((slot) => {
                      const frame = frameOrder[slot];
                      const sign = getSign(current.signId);
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            if (checked || frame === undefined) return;
                            setFrameOrder((previous) => previous.filter((_, i) => i !== slot));
                          }}
                          className={cn(
                            'relative aspect-square overflow-hidden rounded-2xl border-2 transition',
                            frame !== undefined
                              ? slot === 2
                                ? 'border-emerald-300'
                                : 'border-brand-300'
                              : 'border-dashed border-line bg-surface/40',
                          )}
                          aria-label={frame !== undefined ? `Quitar fotograma ${frame + 1}` : `Espacio ${slot + 1}`}
                        >
                          {frame !== undefined && sign ? (
                            <>
                              <SignArt sign={sign} frame={frame} showWatermark={false} className="h-full w-full" />
                              <span className="absolute left-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-md bg-black/30 text-[9px] font-black text-white">
                                {slot + 1}
                              </span>
                            </>
                          ) : (
                            <span className="grid h-full place-items-center text-2xl font-black text-muted/30">
                              {slot + 1}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="label mb-2">Fotogramas disponibles</p>
                  <div className="grid grid-cols-3 gap-2">
                    {current.frames.map((frame) => {
                      const sign = getSign(current.signId);
                      const isUsed = frameOrder.includes(frame);
                      return (
                        <button
                          key={frame}
                          type="button"
                          onClick={() => {
                            if (checked || isUsed || frameOrder.length >= 3) return;
                            setFrameOrder((previous) => [...previous, frame]);
                          }}
                          disabled={checked || isUsed}
                          className={cn(
                            'relative aspect-square overflow-hidden rounded-2xl border-2 transition',
                            isUsed
                              ? 'border-line opacity-35'
                              : 'border-line hover:-translate-y-0.5 hover:border-brand-300',
                          )}
                          aria-label={`Añadir fotograma ${frame + 1}`}
                        >
                          {sign ? (
                            <SignArt sign={sign} frame={frame} showWatermark={false} className="h-full w-full" />
                          ) : null}
                          {isUsed ? (
                            <span className="absolute inset-0 grid place-items-center bg-card/45">
                              <Check className="h-6 w-6 text-brand-500" />
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <p className="text-center text-[10px] font-semibold text-muted">
                  La secuencia correcta va del inicio del movimiento al final.
                </p>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl">
          <AnimatePresence>
            {checked ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className={cn(
                  'mb-3 flex items-start gap-2.5 rounded-2xl px-3.5 py-2.5',
                  isCorrect
                    ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-100'
                    : 'bg-coral-500/10 text-coral-700 dark:text-coral-200',
                )}
                role="status"
                aria-live="polite"
              >
                <span
                  className={cn(
                    'mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-white',
                    isCorrect ? 'bg-emerald-500' : 'bg-coral-500',
                  )}
                >
                  {isCorrect ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-black">
                    {isCorrect ? '¡Muy bien!' : 'Casi lo tienes'}
                  </p>
                  <p className="mt-0.5 break-words text-[11px] font-semibold leading-5 opacity-80">
                    {isCorrect
                      ? previousIsFirstTry(current.id, attempts)
                        ? 'Primera respuesta correcta. ¡Sigue así!'
                        : 'Lo lograste. Este ejercicio ya está practicado.'
                      : `La respuesta correcta era: ${answerLabel}`}
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="flex gap-2.5">
            {checked && !isCorrect ? (
              <button type="button" onClick={handleRetry} className="btn-secondary flex-1">
                <RotateCcw className="h-4 w-4" />
                Reintentar
              </button>
            ) : null}
            <button
              type="button"
              onClick={checked ? handleContinue : handleCheck}
              disabled={!checked && !canCheck}
              className={cn(
                'btn-primary group flex-1 py-3.5',
                checked && isCorrect && 'bg-emerald-500 hover:bg-emerald-600',
              )}
            >
              {checked ? (index >= total - 1 ? 'Terminar lección' : 'Continuar') : 'Comprobar'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={exitOpen}
        onClose={() => setExitOpen(false)}
        title="¿Salir de la lección?"
        description="El progreso de esta lección no se guardará. Tu racha y XP se mantienen."
        size="sm"
        footer={
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => navigate('/aprender')} className="btn-secondary">
              Salir
            </button>
            <button type="button" onClick={() => setExitOpen(false)} className="btn-primary">
              Seguir practicando
            </button>
          </div>
        }
      >
        <div className="flex items-center gap-2 rounded-2xl bg-surface/70 p-3 text-xs font-semibold text-muted">
          <ChevronLeft className="h-4 w-4 shrink-0" />
          Puedes volver a esta lección cuando quieras.
        </div>
      </Modal>
    </div>
  );
}

function previousIsFirstTry(exerciseId: string, attempts: Record<string, number>): boolean {
  return (attempts[exerciseId] ?? 0) <= 1;
}
