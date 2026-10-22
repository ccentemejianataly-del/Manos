import type { Sign } from '../types';

export const signs: Sign[] = [
  {
    id: 'hola',
    gloss: 'HOLA',
    translation: 'Hola',
    category: 'saludos',
    variant: 'LSP',
    description:
      'Mano abierta a la altura del hombro, con un movimiento breve de muñeca y contacto visual.',
    nonManualMarkers: 'Contacto visual y sonrisa leve.',
    difficulty: 1,
    related: ['adios', 'buenos-dias'],
    visual: {
      hand: 'open',
      position: 'high',
      motion: 'wave',
      hotspots: [
        { id: 'mano', x: 56, y: 42, label: 'Mano abierta' },
        { id: 'hombro', x: 48, y: 68, label: 'Altura del hombro' },
      ],
    },
  },
  {
    id: 'gracias',
    gloss: 'GRACIAS',
    translation: 'Gracias',
    category: 'saludos',
    variant: 'LSP',
    description:
      'Mano plana que sale desde la zona del mentón hacia adelante, con un movimiento corto.',
    nonManualMarkers: 'Inclinación leve de cabeza y sonrisa.',
    difficulty: 1,
    related: ['por-favor', 'hola'],
    visual: {
      hand: 'flat',
      position: 'mid',
      motion: 'forward',
      hotspots: [
        { id: 'mano', x: 61, y: 48, label: 'Mano plana' },
        { id: 'menton', x: 58, y: 35, label: 'Cerca del mentón' },
      ],
    },
  },
  {
    id: 'buenos-dias',
    gloss: 'BUENOS DÍAS',
    translation: 'Buenos días',
    category: 'saludos',
    variant: 'LSP',
    description:
      'Mano abierta que parte desde la zona de la boca y avanza hacia adelante, como un saludo matutino.',
    nonManualMarkers: 'Cejas elevadas y sonrisa.',
    difficulty: 2,
    related: ['hola', 'adios'],
    visual: {
      hand: 'open',
      position: 'high',
      motion: 'forward',
    },
  },
  {
    id: 'adios',
    gloss: 'ADIÓS',
    translation: 'Adiós',
    category: 'saludos',
    variant: 'LSP',
    description:
      'Mano abierta en alto que se agita de lado a lado con un movimiento suave de muñeca.',
    nonManualMarkers: 'Sonrisa y contacto visual.',
    difficulty: 1,
    related: ['hola', 'gracias'],
    visual: {
      hand: 'open',
      position: 'high',
      motion: 'wave',
    },
  },
  {
    id: 'mama',
    gloss: 'MAMÁ',
    translation: 'Mamá',
    category: 'familia',
    variant: 'LSP',
    description:
      'Mano plana cerca del mentón que se mueve brevemente hacia adelante. Es una seña de demostración.',
    nonManualMarkers: 'Expresión afectuosa.',
    difficulty: 1,
    related: ['papa', 'familia'],
    visual: {
      hand: 'flat',
      position: 'mid',
      motion: 'forward',
      hotspots: [
        { id: 'mano', x: 59, y: 46, label: 'Mano plana' },
        { id: 'menton', x: 58, y: 32, label: 'Cerca del mentón' },
      ],
    },
  },
  {
    id: 'papa',
    gloss: 'PAPÁ',
    translation: 'Papá',
    category: 'familia',
    variant: 'LSP',
    description:
      'Mano plana cerca de la frente que se mueve brevemente hacia adelante.',
    nonManualMarkers: 'Contacto visual.',
    difficulty: 1,
    related: ['mama', 'familia'],
    visual: {
      hand: 'flat',
      position: 'high',
      motion: 'forward',
    },
  },
  {
    id: 'hermano',
    gloss: 'HERMANO',
    translation: 'Hermano',
    category: 'familia',
    variant: 'LSP',
    description:
      'Dos manos con el índice extendido que se aproximan y separan frente al cuerpo.',
    nonManualMarkers: 'Mirada hacia las manos.',
    difficulty: 2,
    related: ['familia', 'mama'],
    visual: {
      hand: 'index',
      secondHand: 'index',
      position: 'mid',
      motion: 'circle',
      layout: 'left',
    },
  },
  {
    id: 'familia',
    gloss: 'FAMILIA',
    translation: 'Familia',
    category: 'familia',
    variant: 'LSP',
    description:
      'Dos manos abiertas que dibujan un círculo frente al cuerpo, integrando a las personas del grupo.',
    nonManualMarkers: 'Sonrisa y contacto visual.',
    difficulty: 2,
    related: ['mama', 'papa'],
    visual: {
      hand: 'open',
      secondHand: 'open',
      position: 'mid',
      motion: 'circle',
      layout: 'left',
    },
  },
  {
    id: 'uno',
    gloss: 'UNO',
    translation: 'Uno',
    category: 'numeros',
    variant: 'LSP',
    description:
      'Índice extendido hacia arriba; el resto de los dedos permanece cerrado.',
    nonManualMarkers: 'Sin marcador especial.',
    difficulty: 1,
    related: ['dos', 'tres'],
    visual: {
      hand: 'index',
      position: 'mid',
      motion: 'none',
    },
  },
  {
    id: 'dos',
    gloss: 'DOS',
    translation: 'Dos',
    category: 'numeros',
    variant: 'LSP',
    description: 'Índice y dedo medio extendidos en forma de V.',
    nonManualMarkers: 'Sin marcador especial.',
    difficulty: 1,
    related: ['uno', 'tres'],
    visual: {
      hand: 'v',
      position: 'mid',
      motion: 'none',
    },
  },
  {
    id: 'tres',
    gloss: 'TRES',
    translation: 'Tres',
    category: 'numeros',
    variant: 'LSP',
    description:
      'Tres dedos extendidos: índice, medio y anular; el resto se recoge.',
    nonManualMarkers: 'Sin marcador especial.',
    difficulty: 1,
    related: ['dos', 'cuatro'],
    visual: {
      hand: 'three',
      position: 'mid',
      motion: 'none',
    },
  },
  {
    id: 'cuatro',
    gloss: 'CUATRO',
    translation: 'Cuatro',
    category: 'numeros',
    variant: 'LSP',
    description: 'Cuatro dedos extendidos, con el pulgar recogido hacia la palma.',
    nonManualMarkers: 'Sin marcador especial.',
    difficulty: 1,
    related: ['tres', 'uno'],
    visual: {
      hand: 'four',
      position: 'mid',
      motion: 'none',
    },
  },
  {
    id: 'rojo',
    gloss: 'ROJO',
    translation: 'Rojo',
    category: 'colores',
    variant: 'LSP',
    description:
      'Índice extendido hacia la zona de los labios, con un movimiento breve hacia abajo.',
    nonManualMarkers: 'Contacto visual.',
    difficulty: 2,
    related: ['azul', 'amarillo'],
    visual: {
      hand: 'index',
      position: 'mid',
      motion: 'down',
    },
  },
  {
    id: 'azul',
    gloss: 'AZUL',
    translation: 'Azul',
    category: 'colores',
    variant: 'LSP',
    description:
      'Mano abierta a la altura del hombro con un giro suave de muñeca.',
    nonManualMarkers: 'Cejas neutras.',
    difficulty: 2,
    related: ['rojo', 'amarillo'],
    visual: {
      hand: 'open',
      position: 'high',
      motion: 'circle',
    },
  },
  {
    id: 'amarillo',
    gloss: 'AMARILLO',
    translation: 'Amarillo',
    category: 'colores',
    variant: 'LSP',
    description:
      'Mano plana que rota desde la muñeca, manteniendo los dedos juntos.',
    nonManualMarkers: 'Sonrisa leve.',
    difficulty: 2,
    related: ['rojo', 'azul'],
    visual: {
      hand: 'flat',
      position: 'high',
      motion: 'wave',
    },
  },
  {
    id: 'agua',
    gloss: 'AGUA',
    translation: 'Agua',
    category: 'comida',
    variant: 'LSP',
    description:
      'Tres dedos extendidos cerca del mentón, con un movimiento corto hacia abajo.',
    nonManualMarkers: 'Contacto visual.',
    difficulty: 2,
    related: ['pan', 'leche'],
    visual: {
      hand: 'three',
      position: 'mid',
      motion: 'down',
      hotspots: [
        { id: 'dedos', x: 55, y: 43, label: 'Tres dedos extendidos' },
        { id: 'menton', x: 56, y: 31, label: 'Cerca del mentón' },
      ],
    },
  },
  {
    id: 'pan',
    gloss: 'PAN',
    translation: 'Pan',
    category: 'comida',
    variant: 'LSP',
    description:
      'Una mano plana se desliza sobre la otra, como si se cortara un pan.',
    nonManualMarkers: 'Sin marcador especial.',
    difficulty: 2,
    related: ['agua', 'leche'],
    visual: {
      hand: 'flat',
      secondHand: 'flat',
      position: 'mid',
      motion: 'down',
      layout: 'below',
    },
  },
  {
    id: 'leche',
    gloss: 'LECHE',
    translation: 'Leche',
    category: 'comida',
    variant: 'LSP',
    description:
      'Dos puños que se cierran y abren frente al cuerpo, con un movimiento repetido.',
    nonManualMarkers: 'Sin marcador especial.',
    difficulty: 2,
    related: ['agua', 'pan'],
    visual: {
      hand: 'fist',
      secondHand: 'fist',
      position: 'mid',
      motion: 'down',
      layout: 'left',
    },
  },
  {
    id: 'por-favor',
    gloss: 'POR FAVOR',
    translation: 'Por favor',
    category: 'frases',
    variant: 'LSP',
    description:
      'Mano plana sobre el pecho que dibuja un círculo suave, acompañando la petición.',
    nonManualMarkers: 'Inclinación de cabeza.',
    difficulty: 2,
    related: ['gracias', 'si'],
    visual: {
      hand: 'flat',
      position: 'mid',
      motion: 'circle',
    },
  },
  {
    id: 'si',
    gloss: 'SÍ',
    translation: 'Sí',
    category: 'frases',
    variant: 'LSP',
    description:
      'Puño cerrado que se mueve hacia abajo, acompañado de un asentimiento de cabeza.',
    nonManualMarkers: 'Cabeza que asiente.',
    difficulty: 1,
    related: ['gracias', 'por-favor'],
    visual: {
      hand: 'fist',
      position: 'mid',
      motion: 'down',
      hotspots: [
        { id: 'punio', x: 55, y: 49, label: 'Puño cerrado' },
        { id: 'movimiento', x: 51, y: 70, label: 'Movimiento hacia abajo' },
      ],
    },
  },
];

export const signMap = Object.fromEntries(signs.map((sign) => [sign.id, sign])) as Record<
  string,
  Sign
>;

export function getSign(id: string): Sign | undefined {
  return signMap[id];
}

export function getRelatedSigns(sign: Sign): Sign[] {
  return sign.related.map((id) => signMap[id]).filter(Boolean);
}
