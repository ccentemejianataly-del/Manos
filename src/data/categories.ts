import type { Category, CategoryId } from '../types';

export const categories: Category[] = [
  {
    id: 'saludos',
    label: 'Saludos',
    color: '#6C4CF1',
    color2: '#A78BFA',
    soft: '#EEE9FF',
    icon: 'hand',
  },
  {
    id: 'familia',
    label: 'Familia',
    color: '#FF6B6B',
    color2: '#FFA69E',
    soft: '#FFECEA',
    icon: 'users',
  },
  {
    id: 'numeros',
    label: 'Números',
    color: '#0D9488',
    color2: '#5EEAD4',
    soft: '#DDFBF5',
    icon: 'hash',
  },
  {
    id: 'colores',
    label: 'Colores',
    color: '#F59E0B',
    color2: '#FDE68A',
    soft: '#FFF6D8',
    icon: 'palette',
  },
  {
    id: 'comida',
    label: 'Comida',
    color: '#F97316',
    color2: '#FDBA74',
    soft: '#FFF0E4',
    icon: 'utensils',
  },
  {
    id: 'frases',
    label: 'Frases',
    color: '#3B82F6',
    color2: '#93C5FD',
    soft: '#E8F1FF',
    icon: 'message',
  },
];

export const categoryMap = Object.fromEntries(
  categories.map((category) => [category.id, category]),
) as Record<CategoryId, Category>;

export function getCategory(id: CategoryId): Category {
  return categoryMap[id];
}
