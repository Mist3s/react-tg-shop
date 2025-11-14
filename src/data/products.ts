import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'dragonwell-green',
    name: 'Лунцзин «Изумрудные листья»',
    description:
      'Классический китайский зелёный чай с ореховым ароматом и шелковистым послевкусием. Подходит для ежедневного заваривания.',
    category: 'green',
    tags: ['Зелёный', 'Ханчжоу', 'Весна'],
    image:
      'https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'dragonwell-50', weight: '50 г', price: 450 },
      { id: 'dragonwell-100', weight: '100 г', price: 820 },
      { id: 'dragonwell-250', weight: '250 г', price: 1850 }
    ]
  },
  {
    id: 'lapsang-black',
    name: 'Чжэншань Сяочжун',
    description:
      'Копчёный красный чай из Уишань. Дымный профиль с нотами сухофруктов и шоколада для любителей насыщенных вкусов.',
    category: 'black',
    tags: ['Чёрный', 'Уишань', 'Копчёный'],
    image:
      'https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'lapsang-50', weight: '50 г', price: 480 },
      { id: 'lapsang-100', weight: '100 г', price: 860 },
      { id: 'lapsang-250', weight: '250 г', price: 1900 }
    ]
  },
  {
    id: 'ali-shan-oolong',
    name: 'Гаошань Алишань Улун',
    description:
      'Высокогорный тайваньский улун с цветочным ароматом, сливочным телом и долгим сладким послевкусием.',
    category: 'oolong',
    tags: ['Улун', 'Тайвань', 'Высокогорный'],
    image:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'ali-50', weight: '50 г', price: 620 },
      { id: 'ali-100', weight: '100 г', price: 1150 },
      { id: 'ali-250', weight: '250 г', price: 2600 }
    ]
  },
  {
    id: 'sheng-puer',
    name: 'Шэн Пуэр «Весенние вершины»',
    description:
      'Свежий шэн пуэр с бодрящим характером, фруктовыми и цветочными нотами. Отлично подходит для чайных церемоний.',
    category: 'puer',
    tags: ['Пуэр', 'Юньнань', 'Весна'],
    image:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'sheng-100', weight: '100 г', price: 980 },
      { id: 'sheng-200', weight: '200 г', price: 1750 },
      { id: 'sheng-357', weight: '357 г', price: 2950 }
    ]
  },
  {
    id: 'tea-set',
    name: 'Подарочный набор «Пять стихий»',
    description:
      'Подборка лучших чаёв сезона в мини-упаковках: зелёный, улун, красный, белый и пуэр в стильной коробке.',
    category: 'sets',
    tags: ['Набор', 'Подарок'],
    image:
      'https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'set-1', weight: '5 × 25 г', price: 2500 },
      { id: 'set-2', weight: '5 × 50 г', price: 4200 }
    ]
  },
  {
    id: 'tea-set2',
    name: 'Подарочный набор «Пять стихий»',
    description:
      'Подборка лучших чаёв сезона в мини-упаковках: зелёный, улун, красный, белый и пуэр в стильной коробке.',
    category: 'sets',
    tags: ['Набор', 'Подарок'],
    image:
      'https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'set-12', weight: '5 × 25 г', price: 2500 },
      { id: 'set-22', weight: '5 × 50 г', price: 4200 }
    ]
  },
  {
    id: 'tea-set3',
    name: 'Подарочный набор «Пять стихий»',
    description:
      'Подборка лучших чаёв сезона в мини-упаковках: зелёный, улун, красный, белый и пуэр в стильной коробке.',
    category: 'sets',
    tags: ['Набор', 'Подарок'],
    image:
      'https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'set-13', weight: '5 × 25 г', price: 2500 },
      { id: 'set-23', weight: '5 × 50 г', price: 4200 }
    ]
  },
  {
    id: 'tea-set4',
    name: 'Подарочный набор «Пять стихий»',
    description:
      'Подборка лучших чаёв сезона в мини-упаковках: зелёный, улун, красный, белый и пуэр в стильной коробке.',
    category: 'sets',
    tags: ['Набор', 'Подарок'],
    image:
      'https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'set-14', weight: '5 × 25 г', price: 2500 },
      { id: 'set-24', weight: '5 × 50 г', price: 4200 }
    ]
  },
  {
    id: 'tea-set5',
    name: 'Подарочный набор «Пять стихий»',
    description:
      'Подборка лучших чаёв сезона в мини-упаковках: зелёный, улун, красный, белый и пуэр в стильной коробке.',
    category: 'sets',
    tags: ['Набор', 'Подарок'],
    image:
      'https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'set-15', weight: '5 × 25 г', price: 2500 },
      { id: 'set-25', weight: '5 × 50 г', price: 4200 }
    ]
  },
  {
    id: 'tea-set6',
    name: 'Подарочный набор «Пять стихий»',
    description:
      'Подборка лучших чаёв сезона в мини-упаковках: зелёный, улун, красный, белый и пуэр в стильной коробке.',
    category: 'sets',
    tags: ['Набор', 'Подарок'],
    image:
      'https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'set-16', weight: '5 × 25 г', price: 2500 },
      { id: 'set-26', weight: '5 × 50 г', price: 4200 }
    ]
  },
  {
    id: 'tea-set7',
    name: 'Подарочный набор «Пять стихий»',
    description:
      'Подборка лучших чаёв сезона в мини-упаковках: зелёный, улун, красный, белый и пуэр в стильной коробке.',
    category: 'sets',
    tags: ['Набор', 'Подарок'],
    image:
      'https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=600&q=80',
    variants: [
      { id: 'set-17', weight: '5 × 25 г', price: 2500 },
      { id: 'set-27', weight: '5 × 50 г', price: 4200 }
    ]
  }
];

export const categories = [
  { id: 'all', label: 'Все' },
  { id: 'green', label: 'Зелёный' },
  { id: 'black', label: 'Чёрный' },
  { id: 'oolong', label: 'Улун' },
  { id: 'puer', label: 'Пуэр' },
  { id: 'sets', label: 'Наборы' }
] as const;
