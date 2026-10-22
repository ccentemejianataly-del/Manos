import type { Lesson, Unit } from '../types';

export const units: Unit[] = [
  {
    id: 'primeros-pasos',
    title: 'Primeros pasos',
    description: 'Saludos y palabras de cortesía para empezar a comunicarte.',
    color: '#6C4CF1',
    color2: '#A78BFA',
    lessons: [
      {
        id: 'hola-adios',
        unitId: 'primeros-pasos',
        title: 'Hola y adiós',
        objective: 'Reconocer y practicar dos saludos esenciales en LSP.',
        signIds: ['hola', 'adios'],
        xp: 20,
      },
      {
        id: 'cortesia',
        unitId: 'primeros-pasos',
        title: 'Con cortesía',
        objective: 'Aprender a dar las gracias y pedir algo por favor.',
        signIds: ['gracias', 'por-favor'],
        xp: 20,
      },
      {
        id: 'afirmar',
        unitId: 'primeros-pasos',
        title: 'Sí, gracias',
        objective: 'Expresar acuerdo y agradecimiento en una conversación breve.',
        signIds: ['si', 'gracias'],
        xp: 20,
      },
      {
        id: 'buenos-dias',
        unitId: 'primeros-pasos',
        title: 'Buenos días',
        objective: 'Usar un saludo adecuado para empezar el día.',
        signIds: ['buenos-dias', 'hola'],
        xp: 20,
      },
      {
        id: 'repaso-1',
        unitId: 'primeros-pasos',
        title: 'Repaso de saludos',
        objective: 'Combinar lo aprendido en situaciones cotidianas.',
        signIds: ['hola', 'gracias', 'adios', 'por-favor'],
        xp: 20,
      },
    ],
  },
  {
    id: 'saludos-presentaciones',
    title: 'Saludos y presentaciones',
    description: 'Presenta a tu familia, cuenta y nombra lo que te rodea.',
    color: '#FF6B6B',
    color2: '#FFA69E',
    lessons: [
      {
        id: 'mi-familia',
        unitId: 'saludos-presentaciones',
        title: 'Mi familia',
        objective: 'Identificar las señas para mamá y papá.',
        signIds: ['mama', 'papa'],
        xp: 20,
      },
      {
        id: 'en-familia',
        unitId: 'saludos-presentaciones',
        title: 'En familia',
        objective: 'Hablar de hermanos y del grupo familiar.',
        signIds: ['hermano', 'familia'],
        xp: 20,
      },
      {
        id: 'numeros-1',
        unitId: 'saludos-presentaciones',
        title: 'Números 1 y 2',
        objective: 'Practicar los primeros números con las manos.',
        signIds: ['uno', 'dos'],
        xp: 20,
      },
      {
        id: 'numeros-2',
        unitId: 'saludos-presentaciones',
        title: 'Números 3 y 4',
        objective: 'Ampliar el conteo con tres y cuatro.',
        signIds: ['tres', 'cuatro'],
        xp: 20,
      },
      {
        id: 'mi-entorno',
        unitId: 'saludos-presentaciones',
        title: 'Colores y comida',
        objective: 'Nombrar colores y alimentos de la vida diaria.',
        signIds: ['rojo', 'azul', 'amarillo', 'agua', 'pan', 'leche'],
        xp: 20,
      },
    ],
  },
];

export const allLessons: Lesson[] = units.flatMap((unit) => unit.lessons);

export const lessonMap = Object.fromEntries(
  allLessons.map((lesson) => [lesson.id, lesson]),
) as Record<string, Lesson>;

export function getLesson(id: string): Lesson | undefined {
  return lessonMap[id];
}

export function getUnitForLesson(lessonId: string): Unit | undefined {
  return units.find((unit) => unit.lessons.some((lesson) => lesson.id === lessonId));
}

export function getNextLesson(completedLessonIds: string[]): Lesson | undefined {
  return allLessons.find((lesson) => !completedLessonIds.includes(lesson.id));
}

export function getCompletedCountForUnit(unit: Unit, completedLessonIds: string[]): number {
  return unit.lessons.filter((lesson) => completedLessonIds.includes(lesson.id)).length;
}
