import type { Achievement } from '../types';

export const achievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'Primera seña',
    description: 'Completa tu primera lección.',
    icon: 'sparkles',
    condition: (state) => state.completedLessonIds.length >= 1,
  },
  {
    id: 'three-lessons',
    title: 'Aprendiz',
    description: 'Completa 3 lecciones.',
    icon: 'medal',
    condition: (state) => state.completedLessonIds.length >= 3,
  },
  {
    id: 'five-lessons',
    title: 'Constante',
    description: 'Completa 5 lecciones.',
    icon: 'flame',
    condition: (state) => state.completedLessonIds.length >= 5,
  },
  {
    id: 'xp-100',
    title: '100 XP',
    description: 'Acumula 100 XP en la demo.',
    icon: 'zap',
    condition: (state) => state.xpTotal >= 100,
  },
  {
    id: 'explorer',
    title: 'Explorador',
    description: 'Consulta 5 señas en el diccionario.',
    icon: 'compass',
    condition: (state) => state.viewedSignIds.length >= 5,
  },
  {
    id: 'collector',
    title: 'Coleccionista',
    description: 'Consulta 10 señas en el diccionario.',
    icon: 'book',
    condition: (state) => state.viewedSignIds.length >= 10,
  },
];

export const achievementMap = Object.fromEntries(
  achievements.map((achievement) => [achievement.id, achievement]),
) as Record<string, Achievement>;
