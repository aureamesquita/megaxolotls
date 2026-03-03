import { Move } from '@shared/types';

/**
 * Struggle move - automatically available when no other moves are left
 * Deals 50% recoil damage to user
 */
export const STRUGGLE_MOVE: Move = {
  id: 'struggle',
  name: 'Struggle',
  type: 'physical',
  power: 50,
  accuracy: 100,
  pp: 999,
  currentPp: 999,
  damage: 40,
  energyCost: 0, // Free move
  description: 'A desperation move used when all other moves have run out. Deals recoil damage to the user.',
  learnedAtLevel: 1,
};

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
    damage: 50,
    energyCost: 2,
    description: 'Small, angry, and faster than sound. It doesn\'t stop until it hits something.',
    learnedAtLevel: 1,
    imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663121114243/GJvqazxoVoTsgpXK.jpg',
  },
  {
    id: 'water-pulse',
    name: 'Water Pulse',
    type: 'special',
    power: 60,
    accuracy: 100,
    pp: 3,
    currentPp: 3,
    damage: 65,
    energyCost: 3,
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
    damage: 0,
    energyCost: 2,
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
    damage: 0,
    energyCost: 2,
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
    damage: 80,
    energyCost: 4,
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
    damage: 45,
    energyCost: 2,
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
    damage: 70,
    energyCost: 3,
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
    damage: 120,
    energyCost: 5,
    description: 'Ultimate water attack. Requires recharge after use.',
    learnedAtLevel: 50,
  },
];

/**
 * Get 4 random moves for battle demo
 * If fewer than 4 moves are available, add Struggle as fallback
 */
export const getRandomBattleMoves = (count: number = 4): Move[] => {
  const shuffled = [...AXOLOTL_MOVES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  
  // If less than 4 moves, add Struggle as fallback
  if (selected.length < count) {
    selected.push(STRUGGLE_MOVE);
  }
  
  return selected;
};

/**
 * Get moves by level
 * Always includes Struggle as fallback
 */
export const getMovesByLevel = (level: number): Move[] => {
  const moves = AXOLOTL_MOVES.filter((move) => (move.learnedAtLevel ?? 1) <= level);
  // Always include Struggle
  if (!moves.find((m) => m.id === 'struggle')) {
    moves.push(STRUGGLE_MOVE);
  }
  return moves;
};

/**
 * Get available moves for battle
 * Filters out moves with 0 PP and adds Struggle if no moves available
 */
export const getAvailableBattleMoves = (moves: Move[]): Move[] => {
  const available = moves.filter((move) => move.currentPp > 0);
  
  // If no moves available, return only Struggle
  if (available.length === 0) {
    return [STRUGGLE_MOVE];
  }
  
  return available;
};
