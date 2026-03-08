/**
 * 18 Elemental Types System for Megaxolotls
 * Categorized into: Chemical, Physical, and Additional types
 */

export type ElementalCategory = 'chemical' | 'physical' | 'additional';

export type ElementalType18 =
  // Chemical types (Borracha, Papel, Sal, Açúcar, Vidro)
  | 'rubber'
  | 'paper'
  | 'salt'
  | 'sugar'
  | 'glass'
  // Physical types (Areia, Terra, Água, Fogo, Gelo)
  | 'sand'
  | 'earth'
  | 'water'
  | 'fire'
  | 'ice'
  // Additional types (Elétrico, Grama, Psíquico, Dragão, Fada, Sombra)
  | 'electric'
  | 'grass'
  | 'psychic'
  | 'dragon'
  | 'fairy'
  | 'shadow';

export interface ElementalTypeInfo {
  name: string;
  emoji: string;
  category: ElementalCategory;
  color: string;
  bgColor: string;
}

export const ELEMENTAL_TYPES_18: Record<ElementalType18, ElementalTypeInfo> = {
  // Chemical types
  rubber: {
    name: 'Rubber',
    emoji: '🛞',
    category: 'chemical',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/30 border-yellow-400',
  },
  paper: {
    name: 'Paper',
    emoji: '📄',
    category: 'chemical',
    color: 'text-amber-300',
    bgColor: 'bg-amber-500/30 border-amber-400',
  },
  salt: {
    name: 'Salt',
    emoji: '🧂',
    category: 'chemical',
    color: 'text-white',
    bgColor: 'bg-white/20 border-white',
  },
  sugar: {
    name: 'Sugar',
    emoji: '🍬',
    category: 'chemical',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/30 border-pink-400',
  },
  glass: {
    name: 'Glass',
    emoji: '🔷',
    category: 'chemical',
    color: 'text-cyan-300',
    bgColor: 'bg-cyan-500/30 border-cyan-400',
  },
  // Physical types
  sand: {
    name: 'Sand',
    emoji: '🏜️',
    category: 'physical',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-600/30 border-yellow-500',
  },
  earth: {
    name: 'Earth',
    emoji: '🌍',
    category: 'physical',
    color: 'text-green-700',
    bgColor: 'bg-green-700/30 border-green-600',
  },
  water: {
    name: 'Water',
    emoji: '💧',
    category: 'physical',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/30 border-blue-400',
  },
  fire: {
    name: 'Fire',
    emoji: '🔥',
    category: 'physical',
    color: 'text-red-400',
    bgColor: 'bg-red-500/30 border-red-400',
  },
  ice: {
    name: 'Ice',
    emoji: '❄️',
    category: 'physical',
    color: 'text-blue-200',
    bgColor: 'bg-blue-300/30 border-blue-200',
  },
  // Additional types
  electric: {
    name: 'Electric',
    emoji: '⚡',
    category: 'additional',
    color: 'text-yellow-300',
    bgColor: 'bg-yellow-400/30 border-yellow-300',
  },
  grass: {
    name: 'Grass',
    emoji: '🌿',
    category: 'additional',
    color: 'text-green-400',
    bgColor: 'bg-green-500/30 border-green-400',
  },
  psychic: {
    name: 'Psychic',
    emoji: '🧠',
    category: 'additional',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/30 border-purple-400',
  },
  dragon: {
    name: 'Dragon',
    emoji: '🐉',
    category: 'additional',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/30 border-indigo-400',
  },
  fairy: {
    name: 'Fairy',
    emoji: '✨',
    category: 'additional',
    color: 'text-pink-300',
    bgColor: 'bg-pink-400/30 border-pink-300',
  },
  shadow: {
    name: 'Shadow',
    emoji: '🌑',
    category: 'additional',
    color: 'text-gray-600',
    bgColor: 'bg-gray-700/30 border-gray-600',
  },
};

/**
 * Type effectiveness chart (18x18)
 * 2 = super effective, 1 = normal, 0.5 = not very effective
 */
export const TYPE_MATCHUPS_18: Record<ElementalType18, Record<ElementalType18, number>> = {
  rubber: {
    rubber: 1,
    paper: 0.5,
    salt: 1,
    sugar: 1,
    glass: 1,
    sand: 1,
    earth: 1,
    water: 2,
    fire: 0.5,
    ice: 1,
    electric: 0.5,
    grass: 1,
    psychic: 1,
    dragon: 1,
    fairy: 1,
    shadow: 1,
  },
  paper: {
    rubber: 2,
    paper: 1,
    salt: 1,
    sugar: 1,
    glass: 1,
    sand: 2,
    earth: 1,
    water: 1,
    fire: 0.5,
    ice: 1,
    electric: 1,
    grass: 2,
    psychic: 1,
    dragon: 1,
    fairy: 1,
    shadow: 1,
  },
  salt: {
    rubber: 1,
    paper: 1,
    salt: 1,
    sugar: 2,
    glass: 0.5,
    sand: 1,
    earth: 1,
    water: 2,
    fire: 1,
    ice: 1,
    electric: 1,
    grass: 1,
    psychic: 1,
    dragon: 1,
    fairy: 1,
    shadow: 1,
  },
  sugar: {
    rubber: 1,
    paper: 1,
    salt: 0.5,
    sugar: 1,
    glass: 1,
    sand: 1,
    earth: 1,
    water: 1,
    fire: 2,
    ice: 0.5,
    electric: 1,
    grass: 1,
    psychic: 1,
    dragon: 1,
    fairy: 1,
    shadow: 1,
  },
  glass: {
    rubber: 1,
    paper: 1,
    salt: 2,
    sugar: 1,
    glass: 1,
    sand: 2,
    earth: 1,
    water: 1,
    fire: 0.5,
    ice: 1,
    electric: 1,
    grass: 1,
    psychic: 1,
    dragon: 1,
    fairy: 1,
    shadow: 2,
  },
  sand: {
    rubber: 1,
    paper: 0.5,
    salt: 1,
    sugar: 1,
    glass: 0.5,
    sand: 1,
    earth: 1,
    water: 1,
    fire: 2,
    ice: 1,
    electric: 2,
    grass: 0.5,
    psychic: 1,
    dragon: 1,
    fairy: 1,
    shadow: 1,
  },
  earth: {
    rubber: 1,
    paper: 1,
    salt: 1,
    sugar: 1,
    glass: 1,
    sand: 1,
    earth: 1,
    water: 1,
    fire: 2,
    ice: 1,
    electric: 2,
    grass: 0.5,
    psychic: 1,
    dragon: 1,
    fairy: 1,
    shadow: 1,
  },
  water: {
    rubber: 0.5,
    paper: 1,
    salt: 0.5,
    sugar: 1,
    glass: 1,
    sand: 2,
    earth: 2,
    water: 0.5,
    fire: 2,
    ice: 1,
    electric: 1,
    grass: 0.5,
    psychic: 1,
    dragon: 0.5,
    fairy: 1,
    shadow: 1,
  },
  fire: {
    rubber: 2,
    paper: 2,
    salt: 1,
    sugar: 0.5,
    glass: 1,
    sand: 1,
    earth: 1,
    water: 0.5,
    fire: 0.5,
    ice: 2,
    electric: 1,
    grass: 2,
    psychic: 1,
    dragon: 0.5,
    fairy: 1,
    shadow: 1,
  },
  ice: {
    rubber: 1,
    paper: 1,
    salt: 2,
    sugar: 2,
    glass: 1,
    sand: 2,
    earth: 2,
    water: 0.5,
    fire: 0.5,
    ice: 0.5,
    electric: 1,
    grass: 2,
    psychic: 1,
    dragon: 2,
    fairy: 1,
    shadow: 1,
  },
  electric: {
    rubber: 0.5,
    paper: 1,
    salt: 1,
    sugar: 1,
    glass: 1,
    sand: 0.5,
    earth: 1,
    water: 2,
    fire: 1,
    ice: 1,
    electric: 0.5,
    grass: 0.5,
    psychic: 1,
    dragon: 0.5,
    fairy: 1,
    shadow: 1,
  },
  grass: {
    rubber: 1,
    paper: 0.5,
    salt: 1,
    sugar: 1,
    glass: 1,
    sand: 0.5,
    earth: 2,
    water: 2,
    fire: 0.5,
    ice: 1,
    electric: 1,
    grass: 0.5,
    psychic: 1,
    dragon: 0.5,
    fairy: 1,
    shadow: 1,
  },
  psychic: {
    rubber: 1,
    paper: 1,
    salt: 1,
    sugar: 1,
    glass: 1,
    sand: 1,
    earth: 1,
    water: 1,
    fire: 1,
    ice: 1,
    electric: 1,
    grass: 1,
    psychic: 0.5,
    dragon: 1,
    fairy: 2,
    shadow: 0.5,
  },
  dragon: {
    rubber: 1,
    paper: 1,
    salt: 1,
    sugar: 1,
    glass: 1,
    sand: 1,
    earth: 1,
    water: 1,
    fire: 1,
    ice: 1,
    electric: 1,
    grass: 1,
    psychic: 1,
    dragon: 2,
    fairy: 0.5,
    shadow: 1,
  },
  fairy: {
    rubber: 1,
    paper: 1,
    salt: 1,
    sugar: 1,
    glass: 1,
    sand: 1,
    earth: 1,
    water: 1,
    fire: 0.5,
    ice: 1,
    electric: 1,
    grass: 1,
    psychic: 2,
    dragon: 2,
    fairy: 1,
    shadow: 2,
  },
  shadow: {
    rubber: 1,
    paper: 1,
    salt: 1,
    sugar: 1,
    glass: 0.5,
    sand: 1,
    earth: 1,
    water: 1,
    fire: 1,
    ice: 1,
    electric: 1,
    grass: 1,
    psychic: 2,
    dragon: 1,
    fairy: 0.5,
    shadow: 0.5,
  },
};

export function getTypeInfo(type: ElementalType18): ElementalTypeInfo {
  return ELEMENTAL_TYPES_18[type];
}

export function getTypeEffectiveness(
  attackerType: ElementalType18,
  defenderType: ElementalType18
): number {
  return TYPE_MATCHUPS_18[attackerType]?.[defenderType] ?? 1;
}

export function getTypesByCategory(category: ElementalCategory): ElementalType18[] {
  return (Object.entries(ELEMENTAL_TYPES_18) as [ElementalType18, ElementalTypeInfo][])
    .filter(([, info]) => info.category === category)
    .map(([type]) => type);
}
