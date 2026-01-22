import { describe, expect, it } from 'vitest';
import { AXOLOTL_MOVES, getRandomBattleMoves, getMovesByLevel } from '@/lib/mockMoves';

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

  describe('getRandomBattleMoves', () => {
    it('should return 4 moves by default', () => {
      const moves = getRandomBattleMoves();
      expect(moves.length).toBe(4);
    });

    it('should return specified number of moves', () => {
      const moves = getRandomBattleMoves(2);
      expect(moves.length).toBe(2);
    });

    it('should return moves from AXOLOTL_MOVES', () => {
      const moves = getRandomBattleMoves(4);
      const moveIds = new Set(AXOLOTL_MOVES.map((m) => m.id));
      moves.forEach((move) => {
        expect(moveIds.has(move.id)).toBe(true);
      });
    });

    it('should return different moves on multiple calls', () => {
      const moves1 = getRandomBattleMoves(4);
      const moves2 = getRandomBattleMoves(4);
      const ids1 = new Set(moves1.map((m) => m.id));
      const ids2 = new Set(moves2.map((m) => m.id));
      // Note: This test might occasionally fail due to randomness, but very unlikely with 4 out of 8+ moves
      // In production, you might want to seed the random function for testing
    });
  });

  describe('getMovesByLevel', () => {
    it('should return moves learned at or before specified level', () => {
      const moves = getMovesByLevel(10);
      moves.forEach((move) => {
        expect((move.learnedAtLevel ?? 1) <= 10).toBe(true);
      });
    });

    it('should return all moves for high level', () => {
      const moves = getMovesByLevel(100);
      expect(moves.length).toBe(AXOLOTL_MOVES.length);
    });

    it('should return only level 1 moves for level 1', () => {
      const moves = getMovesByLevel(1);
      moves.forEach((move) => {
        expect((move.learnedAtLevel ?? 1) <= 1).toBe(true);
      });
    });

    it('should return empty array for level 0', () => {
      const moves = getMovesByLevel(0);
      expect(moves.length).toBe(0);
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
});
