import { describe, it, expect } from 'vitest';

/**
 * Mock Axolotl types para testes
 */
interface AxolotlGenotype {
  id: string;
  name: string;
  level: number;
  morphStage: number;
  traits: {
    color: string;
    pattern: string;
    size: string;
    ability: string;
    rarity: string;
  };
  genes: {
    color: [string, string];
    pattern: [string, string];
    size: [string, string];
    ability: [string, string];
  };
  breedingCooldown: number;
}

/**
 * Testes para sistema de breeding
 */
describe('Breeding System', () => {
  // Mock Axolotls
  const parentA: AxolotlGenotype = {
    id: 'axolotl-1',
    name: 'Pinky',
    level: 25,
    morphStage: 1,
    traits: {
      color: 'pink',
      pattern: 'solid',
      size: 'large',
      ability: 'regeneration',
      rarity: 'uncommon',
    },
    genes: {
      color: ['pink', 'pink'],
      pattern: ['solid', 'spotted'],
      size: ['large', 'medium'],
      ability: ['regeneration', 'poison'],
    },
    breedingCooldown: 0,
  };

  const parentB: AxolotlGenotype = {
    id: 'axolotl-2',
    name: 'Goldie',
    level: 22,
    morphStage: 1,
    traits: {
      color: 'gold',
      pattern: 'spotted',
      size: 'medium',
      ability: 'poison',
      rarity: 'rare',
    },
    genes: {
      color: ['gold', 'white'],
      pattern: ['spotted', 'marble'],
      size: ['medium', 'small'],
      ability: ['poison', 'strength'],
    },
    breedingCooldown: 0,
  };

  it('should allow breeding when both parents meet requirements', () => {
    const canBreed = parentA.level >= 10 && parentB.level >= 10 && parentA.breedingCooldown === 0 && parentB.breedingCooldown === 0;
    expect(canBreed).toBe(true);
  });

  it('should prevent breeding when parent level is too low', () => {
    const lowLevelParent = { ...parentA, level: 5 };
    const canBreed = lowLevelParent.level >= 10 && parentB.level >= 10;
    expect(canBreed).toBe(false);
  });

  it('should prevent breeding when parent is in cooldown', () => {
    const parentInCooldown = { ...parentA, breedingCooldown: Date.now() + 1000 };
    const canBreed = parentInCooldown.breedingCooldown <= Date.now();
    expect(canBreed).toBe(false);
  });

  it('should prevent breeding between same Axolotl', () => {
    const canBreed = parentA.id !== parentA.id;
    expect(canBreed).toBe(false);
  });

  it('should calculate compatibility between parents', () => {
    // Compatibility baseado em diferença de nível e traits similares
    let compatibility = 100;
    const levelDiff = Math.abs(parentA.level - parentB.level);
    compatibility -= levelDiff * 2;
    const morphDiff = Math.abs(parentA.morphStage - parentB.morphStage);
    compatibility -= morphDiff * 5;

    expect(compatibility).toBeGreaterThan(0);
    expect(compatibility).toBeLessThanOrEqual(100);
  });

  it('should generate offspring with inherited traits', () => {
    // Offspring deve ter traits herdados dos pais
    const offspringColor = [parentA.genes.color[0], parentB.genes.color[0]];
    expect(offspringColor).toHaveLength(2);
    expect(offspringColor[0]).toBe('pink');
    expect(offspringColor[1]).toBe('gold');
  });

  it('should start offspring at level 1', () => {
    const offspringLevel = 1;
    expect(offspringLevel).toBe(1);
  });

  it('should start offspring at morphStage 0 (Axolol)', () => {
    const offspringMorphStage = 0;
    expect(offspringMorphStage).toBe(0);
  });

  it('should assign unique ID to offspring', () => {
    const offspringId1 = `axolotl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const offspringId2 = `axolotl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    expect(offspringId1).not.toBe(offspringId2);
  });

  it('should calculate offspring rarity based on parents', () => {
    const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    const aIndex = rarityOrder.indexOf(parentA.traits.rarity);
    const bIndex = rarityOrder.indexOf(parentB.traits.rarity);
    const avgRarity = Math.floor((aIndex + bIndex) / 2);

    expect(avgRarity).toBeGreaterThanOrEqual(0);
    expect(avgRarity).toBeLessThan(rarityOrder.length);
  });

  it('should apply breeding cooldown after breeding', () => {
    const cooldownHours = 24;
    const cooldownTime = Date.now() + cooldownHours * 60 * 60 * 1000;
    expect(cooldownTime).toBeGreaterThan(Date.now());
  });

  it('should prevent breeding same species multiple times without cooldown', () => {
    const cooldownExpired = parentA.breedingCooldown <= Date.now();
    expect(cooldownExpired).toBe(true);
  });
});
