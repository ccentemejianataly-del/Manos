import { signs } from '../data/signs';
import type { Exercise, Lesson, Sign } from '../types';

function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function uniqueById(items: Sign[]): Sign[] {
  return Array.from(new Map(items.map((item) => [item.id, item])).values());
}

export function buildLessonExercises(lesson: Lesson): Exercise[] {
  const random = createRandom(hashString(lesson.id));
  const targetSigns = lesson.signIds
    .map((id) => signs.find((sign) => sign.id === id))
    .filter((sign): sign is Sign => Boolean(sign));
  const otherSigns = signs.filter((sign) => !lesson.signIds.includes(sign.id));

  if (targetSigns.length === 0) {
    return [];
  }

  const exercises: Exercise[] = [];
  const directSigns = targetSigns.slice(0, 3);

  directSigns.forEach((sign, index) => {
    const distractors = shuffle(otherSigns, random)
      .filter((candidate) => candidate.translation !== sign.translation)
      .slice(0, 3);
    const options = shuffle([sign.translation, ...distractors.map((item) => item.translation)], random);

    exercises.push({
      id: `${lesson.id}-meaning-${index + 1}`,
      type: 'sign_to_meaning',
      signId: sign.id,
      options,
      answer: sign.translation,
    });
  });

  const signForChoice = targetSigns[Math.floor(random() * targetSigns.length)];
  const choiceDistractors = shuffle(otherSigns, random)
    .filter((candidate) => candidate.id !== signForChoice.id)
    .slice(0, 3);

  exercises.push({
    id: `${lesson.id}-choice`,
    type: 'meaning_to_sign',
    signId: signForChoice.id,
    options: shuffle([signForChoice.id, ...choiceDistractors.map((item) => item.id)], random),
    answer: signForChoice.id,
  });

  const pairPool = uniqueById([
    ...targetSigns,
    ...shuffle(otherSigns, random),
  ]).slice(0, 4);

  exercises.push({
    id: `${lesson.id}-pairs`,
    type: 'match_pairs',
    pairs: shuffle(
      pairPool.map((sign) => ({ signId: sign.id, text: sign.translation })),
      random,
    ),
  });

  const frameSign = targetSigns[Math.floor(random() * targetSigns.length)];
  exercises.push({
    id: `${lesson.id}-frames`,
    type: 'frame_order',
    signId: frameSign.id,
    frames: shuffle([0, 1, 2], random),
    answer: [0, 1, 2],
  });

  return exercises;
}

export function getExerciseAnswerLabel(exercise: Exercise): string {
  if (exercise.type === 'sign_to_meaning') {
    return exercise.answer;
  }

  if (exercise.type === 'meaning_to_sign') {
    return signs.find((sign) => sign.id === exercise.answer)?.translation ?? '';
  }

  if (exercise.type === 'match_pairs') {
    return exercise.pairs
      .map((pair) => {
        const sign = signs.find((item) => item.id === pair.signId);
        return `${sign?.gloss ?? pair.signId} → ${pair.text}`;
      })
      .join(' · ');
  }

  return 'Inicio → movimiento → final';
}
