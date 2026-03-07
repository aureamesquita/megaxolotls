/**
 * Sistema de Tipos Elementares para Axolotls
 * Baseado em Pokémon-style type matching
 */

export type ElementalType = 'Water' | 'Fire' | 'Grass' | 'Electric' | 'Psychic' | 'Dark';

export interface TypeMatchup {
  superEffective: ElementalType[]; // 2x damage
  notVeryEffective: ElementalType[]; // 0.5x damage
  neutral: ElementalType[]; // 1x damage
}

/**
 * Tabela de type match-ups
 * Define qual tipo é super efetivo contra qual
 */
export const TYPE_MATCHUPS: Record<ElementalType, TypeMatchup> = {
  Water: {
    superEffective: ['Fire', 'Electric'],
    notVeryEffective: ['Water', 'Grass'],
    neutral: ['Psychic', 'Dark'],
  },
  Fire: {
    superEffective: ['Grass', 'Electric'],
    notVeryEffective: ['Fire', 'Water'],
    neutral: ['Psychic', 'Dark'],
  },
  Grass: {
    superEffective: ['Water', 'Electric'],
    notVeryEffective: ['Grass', 'Fire'],
    neutral: ['Psychic', 'Dark'],
  },
  Electric: {
    superEffective: ['Water', 'Grass'],
    notVeryEffective: ['Electric', 'Fire'],
    neutral: ['Psychic', 'Dark'],
  },
  Psychic: {
    superEffective: ['Dark', 'Fire'],
    notVeryEffective: ['Psychic', 'Water'],
    neutral: ['Grass', 'Electric'],
  },
  Dark: {
    superEffective: ['Psychic', 'Grass'],
    notVeryEffective: ['Dark', 'Electric'],
    neutral: ['Water', 'Fire'],
  },
};

/**
 * Calcula o multiplicador de dano baseado no type matching
 * @param attackType - Tipo do ataque
 * @param defendType - Tipo do defensor
 * @returns Multiplicador de dano (0.5, 1, 2)
 */
export function calculateTypeEffectiveness(attackType: ElementalType, defendType: ElementalType): number {
  const matchup = TYPE_MATCHUPS[attackType];

  if (matchup.superEffective.includes(defendType)) {
    return 2; // Super efetivo = 2x damage
  }

  if (matchup.notVeryEffective.includes(defendType)) {
    return 0.5; // Não muito efetivo = 0.5x damage
  }

  return 1; // Neutro = 1x damage
}

/**
 * Calcula o bônus STAB (Same Type Attack Bonus)
 * Se o Axolotl tem o mesmo tipo do ataque, recebe 1.5x de bônus
 * @param axolotlType - Tipo do Axolotl
 * @param attackType - Tipo do ataque
 * @returns Multiplicador STAB (1 ou 1.5)
 */
export function calculateSTAB(axolotlType: ElementalType, attackType: ElementalType): number {
  return axolotlType === attackType ? 1.5 : 1;
}

/**
 * Calcula o dano final considerando type matching e STAB
 * @param baseDamage - Dano base do ataque
 * @param attackerType - Tipo do atacante
 * @param attackType - Tipo do ataque
 * @param defenderType - Tipo do defensor
 * @returns Dano final
 */
export function calculateFinalDamage(
  baseDamage: number,
  attackerType: ElementalType,
  attackType: ElementalType,
  defenderType: ElementalType
): number {
  const typeEffectiveness = calculateTypeEffectiveness(attackType, defenderType);
  const stab = calculateSTAB(attackerType, attackType);

  // Adiciona variação aleatória (±10%)
  const variance = 0.9 + Math.random() * 0.2;

  return Math.round(baseDamage * typeEffectiveness * stab * variance);
}

/**
 * Retorna descrição do type matching para UI
 */
export function getTypeMatchupDescription(attackType: ElementalType, defendType: ElementalType): string {
  const effectiveness = calculateTypeEffectiveness(attackType, defendType);

  if (effectiveness === 2) {
    return '💥 Super Effective!';
  }

  if (effectiveness === 0.5) {
    return '🛡️ Not Very Effective';
  }

  return '⚔️ Neutral';
}

/**
 * Emojis para cada tipo
 */
export const TYPE_EMOJIS: Record<ElementalType, string> = {
  Water: '💧',
  Fire: '🔥',
  Grass: '🌿',
  Electric: '⚡',
  Psychic: '🧠',
  Dark: '🌑',
};

/**
 * Cores para cada tipo
 */
export const TYPE_COLORS: Record<ElementalType, string> = {
  Water: 'from-blue-500 to-cyan-500',
  Fire: 'from-red-500 to-orange-500',
  Grass: 'from-green-500 to-lime-500',
  Electric: 'from-yellow-500 to-amber-500',
  Psychic: 'from-purple-500 to-pink-500',
  Dark: 'from-slate-700 to-slate-900',
};
