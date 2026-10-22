export type CategoryId =
  | 'saludos'
  | 'familia'
  | 'numeros'
  | 'colores'
  | 'comida'
  | 'frases';

export interface Category {
  id: CategoryId;
  label: string;
  color: string;
  color2: string;
  soft: string;
  icon: 'hand' | 'users' | 'hash' | 'palette' | 'utensils' | 'message';
}

export type HandConfig =
  | 'open'
  | 'flat'
  | 'fist'
  | 'index'
  | 'v'
  | 'three'
  | 'four'
  | 'pinch'
  | 'thumb';

export type SignMotion = 'wave' | 'forward' | 'down' | 'up' | 'circle' | 'shake' | 'none';

export type HandPosition = 'high' | 'mid' | 'low';

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  label: string;
}

export interface SignVisual {
  hand: HandConfig;
  secondHand?: HandConfig;
  position: HandPosition;
  motion: SignMotion;
  layout?: 'left' | 'right' | 'below';
  hotspots?: Hotspot[];
}

export interface Sign {
  id: string;
  gloss: string;
  translation: string;
  category: CategoryId;
  variant: 'LSP';
  description: string;
  nonManualMarkers: string;
  difficulty: 1 | 2 | 3;
  related: string[];
  visual: SignVisual;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  objective: string;
  signIds: string[];
  xp: number;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  color: string;
  color2: string;
  lessons: Lesson[];
}

export interface ExerciseBase {
  id: string;
}

export type Exercise =
  | (ExerciseBase & {
      type: 'sign_to_meaning';
      signId: string;
      options: string[];
      answer: string;
    })
  | (ExerciseBase & {
      type: 'meaning_to_sign';
      signId: string;
      options: string[];
      answer: string;
    })
  | (ExerciseBase & {
      type: 'match_pairs';
      pairs: Array<{ signId: string; text: string }>;
    })
  | (ExerciseBase & {
      type: 'frame_order';
      signId: string;
      frames: number[];
      answer: number[];
    });

export interface RawLessonResult {
  lessonId: string;
  xpEarned: number;
  accuracy: number;
  correctFirstTry: number;
  total: number;
  bestCombo: number;
}

export interface LessonResult extends RawLessonResult {
  unlocked: string[];
}

export interface DemoSettings {
  theme: 'light' | 'dark' | 'system';
  reducedMotion: boolean;
  showTextAlternatives: boolean;
  mirror: boolean;
}

export interface AchievementState {
  completedLessonIds: string[];
  xpTotal: number;
  viewedSignIds: string[];
  streakDays: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'sparkles' | 'flame' | 'zap' | 'compass' | 'book' | 'medal';
  condition: (state: AchievementState) => boolean;
}
