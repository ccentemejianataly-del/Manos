import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { achievements as achievementDefinitions } from '../data/achievements';
import type { DemoSettings, LessonResult, RawLessonResult } from '../types';
import { todayKey, yesterdayKey } from '../lib/utils';

interface DemoState {
  onboardingCompleted: boolean;
  displayName: string;
  dailyGoal: number;
  xpTotal: number;
  xpToday: number;
  streakDays: number;
  lastPracticeDate: string | null;
  completedLessonIds: string[];
  bestCombo: number;
  unlockedAchievementIds: string[];
  viewedSignIds: string[];
  settings: DemoSettings;
  lastResult: LessonResult | null;
  completeOnboarding: (dailyGoal: number, displayName?: string) => void;
  completeLesson: (result: RawLessonResult) => LessonResult;
  markSignViewed: (signId: string) => string[];
  setDisplayName: (name: string) => void;
  setDailyGoal: (goal: number) => void;
  updateSettings: (patch: Partial<DemoSettings>) => void;
  resetDemo: () => void;
}

const defaultSettings: DemoSettings = {
  theme: 'system',
  reducedMotion: false,
  showTextAlternatives: true,
  mirror: false,
};

const initialState = {
  onboardingCompleted: false,
  displayName: 'Invitado',
  dailyGoal: 20,
  xpTotal: 0,
  xpToday: 0,
  streakDays: 0,
  lastPracticeDate: null as string | null,
  completedLessonIds: [] as string[],
  bestCombo: 0,
  unlockedAchievementIds: [] as string[],
  viewedSignIds: [] as string[],
  settings: defaultSettings,
  lastResult: null as LessonResult | null,
};

function findNewAchievements(state: {
  completedLessonIds: string[];
  xpTotal: number;
  viewedSignIds: string[];
  streakDays: number;
}, alreadyUnlocked: string[]): string[] {
  return achievementDefinitions
    .filter(
      (achievement) =>
        !alreadyUnlocked.includes(achievement.id) && achievement.condition(state),
    )
    .map((achievement) => achievement.id);
}

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      ...initialState,

      completeOnboarding: (dailyGoal, displayName) => {
        set((state) => ({
          onboardingCompleted: true,
          dailyGoal,
          displayName: displayName?.trim() || state.displayName,
        }));
      },

      completeLesson: (input) => {
        const state = get();
        const today = todayKey();
        const isSameDay = state.lastPracticeDate === today;
        const nextStreak = isSameDay
          ? Math.max(1, state.streakDays)
          : state.lastPracticeDate === yesterdayKey()
            ? state.streakDays + 1
            : 1;
        const nextCompleted = Array.from(
          new Set([...state.completedLessonIds, input.lessonId]),
        );
        const nextXpTotal = state.xpTotal + input.xpEarned;
        const nextXpToday = isSameDay
          ? state.xpToday + input.xpEarned
          : input.xpEarned;
        const achievementState = {
          completedLessonIds: nextCompleted,
          xpTotal: nextXpTotal,
          viewedSignIds: state.viewedSignIds,
          streakDays: nextStreak,
        };
        const newlyUnlocked = findNewAchievements(
          achievementState,
          state.unlockedAchievementIds,
        );
        const result: LessonResult = {
          ...input,
          unlocked: newlyUnlocked,
        };

        set({
          completedLessonIds: nextCompleted,
          xpTotal: nextXpTotal,
          xpToday: nextXpToday,
          streakDays: nextStreak,
          lastPracticeDate: today,
          bestCombo: Math.max(state.bestCombo, input.bestCombo),
          unlockedAchievementIds: [
            ...state.unlockedAchievementIds,
            ...newlyUnlocked,
          ],
          lastResult: result,
        });

        return result;
      },

      markSignViewed: (signId) => {
        const state = get();
        if (state.viewedSignIds.includes(signId)) {
          return [];
        }

        const nextViewed = [...state.viewedSignIds, signId];
        const newlyUnlocked = findNewAchievements(
          {
            completedLessonIds: state.completedLessonIds,
            xpTotal: state.xpTotal,
            viewedSignIds: nextViewed,
            streakDays: state.streakDays,
          },
          state.unlockedAchievementIds,
        );

        set({
          viewedSignIds: nextViewed,
          unlockedAchievementIds: [
            ...state.unlockedAchievementIds,
            ...newlyUnlocked,
          ],
        });

        return newlyUnlocked;
      },

      setDisplayName: (name) => {
        set({ displayName: name.trim() || 'Invitado' });
      },

      setDailyGoal: (goal) => {
        set({ dailyGoal: goal });
      },

      updateSettings: (patch) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...patch,
          },
        }));
      },

      resetDemo: () => {
        set({
          ...initialState,
          settings: { ...defaultSettings },
        });
      },
    }),
    {
      name: 'manos-lsp-demo-v1',
      version: 1,
      partialize: (state) => ({
        onboardingCompleted: state.onboardingCompleted,
        displayName: state.displayName,
        dailyGoal: state.dailyGoal,
        xpTotal: state.xpTotal,
        xpToday: state.xpToday,
        streakDays: state.streakDays,
        lastPracticeDate: state.lastPracticeDate,
        completedLessonIds: state.completedLessonIds,
        bestCombo: state.bestCombo,
        unlockedAchievementIds: state.unlockedAchievementIds,
        viewedSignIds: state.viewedSignIds,
        settings: state.settings,
      }),
    },
  ),
);

export function getDailyGoalXp(dailyGoal: number): number {
  return dailyGoal * 2;
}
