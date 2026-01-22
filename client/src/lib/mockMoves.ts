import { Move } from '@shared/types';

/**
 * Mock moves data for Axolotls
 * Used for battle system testing and UI development
 */
export const AXOLOTL_MOVES: Move[] = [
  {
    id: 'bulletbol',
    name: 'Bulletbol',
    type: 'physical',
    power: 40,
    accuracy: 100,
    pp: 2,
    currentPp: 2,
    description: 'Small, angry, and faster than sound. It doesn\'t stop until it hits something.',
    learnedAtLevel: 1,
  },
  {
    id: 'water-pulse',
    name: 'Water Pulse',
    type: 'special',
    power: 60,
    accuracy: 100,
    pp: 3,
    currentPp: 3,
    description: 'Emits a pulse of water to attack the enemy. May confuse the target.',
    learnedAtLevel: 5,
  },
  {
    id: 'toxic-spikes',
    name: 'Toxic Spikes',
    type: 'status',
    power: 0,
    accuracy: 90,
    pp: 4,
    currentPp: 4,
    description: 'Poisons the target with toxic spikes. Damage increases each turn.',
    learnedAtLevel: 8,
  },
  {
    id: 'regenerate',
    name: 'Regenerate',
    type: 'status',
    power: 0,
    accuracy: 100,
    pp: 2,
    currentPp: 2,
    description: 'Heals the user by 50% of max HP. Can be used to recover from damage.',
    learnedAtLevel: 12,
  },
  {
    id: 'gill-blast',
    name: 'Gill Blast',
    type: 'special',
    power: 75,
    accuracy: 95,
    pp: 2,
    currentPp: 2,
    description: 'Powerful blast of water from the gills. High critical hit ratio.',
    learnedAtLevel: 20,
  },
  {
    id: 'aqua-jet',
    name: 'Aqua Jet',
    type: 'physical',
    power: 40,
    accuracy: 100,
    pp: 3,
    currentPp: 3,
    description: 'Charges at the enemy with water-covered body. Always goes first.',
    learnedAtLevel: 15,
  },
  {
    id: 'mud-bomb',
    name: 'Mud Bomb',
    type: 'special',
    power: 65,
    accuracy: 85,
    pp: 2,
    currentPp: 2,
    description: 'Throws mud at the enemy. May lower Special Defense.',
    learnedAtLevel: 18,
  },
  {
    id: 'hydro-cannon',
    name: 'Hydro Cannon',
    type: 'special',
    power: 150,
    accuracy: 90,
    pp: 1,
    currentPp: 1,
    description: 'Ultimate water attack. Requires recharge after use.',
    learnedAtLevel: 50,
  },
];

/**
 * Get 4 random moves for battle demo
 */
export const getRandomBattleMoves = (count: number = 4): Move[] => {
  const shuffled = [...AXOLOTL_MOVES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * Get moves by level
 */
export const getMovesByLevel = (level: number): Move[] => {
  return AXOLOTL_MOVES.filter((move) => (move.learnedAtLevel ?? 1) <= level);
};
