import { describe, expect, it } from 'vitest';

// Mock moves data
const AXOLOTL_MOVES = [
  {
    id: 'bulletbol',
    name: 'Bulletbol',
    type: 'physical',
    power: 40,
    accuracy: 100,
    pp: 2,
    currentPp: 2,
    description: 'Small, angry, and faster than sound.',
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
    description: 'Emits a pulse of water to attack the enemy.',
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
    description: 'Poisons the target with toxic spikes.',
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
    description: 'Heals the user by 50% of max HP.',
    learnedAtLevel: 12,
  },
];

describe('Move Card System', () => {
  describe('AXOLOTL_MOVES', () => {
    it('should have at least 4 moves', () => {
      expect(AXOLOTL_MOVES.length).toBeGreaterThanOrEqual(4);
    });

    it('should have valid move structure', () => {
      AXOLOTL_MOVES.forEach((move) => {
        expect(move.id).toBeDefined();
        expect(move.name).toBeDefined();
        expect(move.type).toMatch(/^(physical|special|status)$/);
        expect(move.power).toBeGreaterThanOrEqual(0);
        expect(move.accuracy).toBeGreaterThanOrEqual(0);
        expect(move.accuracy).toBeLessThanOrEqual(100);
        expect(move.pp).toBeGreaterThan(0);
        expect(move.currentPp).toBeGreaterThanOrEqual(0);
        expect(move.description).toBeDefined();
      });
    });

    it('should have unique move IDs', () => {
      const ids = AXOLOTL_MOVES.map((m) => m.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('Move types and damage', () => {
    it('should have status moves with 0 power', () => {
      const statusMoves = AXOLOTL_MOVES.filter((m) => m.type === 'status');
      statusMoves.forEach((move) => {
        expect(move.power).toBe(0);
      });
    });

    it('should have physical and special moves with power > 0', () => {
      const damagingMoves = AXOLOTL_MOVES.filter((m) => m.type !== 'status');
      damagingMoves.forEach((move) => {
        expect(move.power).toBeGreaterThan(0);
      });
    });

    it('should have reasonable power values', () => {
      AXOLOTL_MOVES.forEach((move) => {
        expect(move.power).toBeLessThanOrEqual(200);
      });
    });
  });

  describe('Move learning', () => {
    it('should have moves learned at different levels', () => {
      const levels = AXOLOTL_MOVES.map((m) => m.learnedAtLevel).filter(Boolean);
      const uniqueLevels = new Set(levels);
      expect(uniqueLevels.size).toBeGreaterThan(1);
    });

    it('should have at least one level 1 move', () => {
      const level1Moves = AXOLOTL_MOVES.filter((m) => (m.learnedAtLevel ?? 1) === 1);
      expect(level1Moves.length).toBeGreaterThan(0);
    });
  });
});
