import { useState, useEffect, useCallback } from 'react';

export type MorphStage = 'Axolol' | 'Axolump' | 'Axoloot';

export interface PetXPState {
  level: number;
  experience: number;
  morphStage: MorphStage;
  nextLevelXP: number;
  totalXP: number;
}

const XP_PER_LEVEL = 100; // XP needed for each level
const LEVEL_UP_THRESHOLD = 20; // Level at which Axolol → Axolump
const FINAL_EVOLUTION_THRESHOLD = 50; // Level at which Axolump → Axoloot

/**
 * Calculate morph stage based on level
 */
const calculateMorphStage = (level: number): MorphStage => {
  if (level >= FINAL_EVOLUTION_THRESHOLD) return 'Axoloot';
  if (level >= LEVEL_UP_THRESHOLD) return 'Axolump';
  return 'Axolol';
};

/**
 * Hook to manage pet XP, leveling, and evolution
 * Persists to localStorage
 */
export function useXPSystem(petId: string = 'default-pet') {
  const storageKey = `pet-xp-${petId}`;

  // Initialize from localStorage
  const [xpState, setXPState] = useState<PetXPState>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      level: 1,
      experience: 0,
      morphStage: 'Axolol' as MorphStage,
      nextLevelXP: XP_PER_LEVEL,
      totalXP: 0,
    };
  });

  const [levelUpNotification, setLevelUpNotification] = useState<{
    level: number;
    morphStage?: MorphStage;
  } | null>(null);

  // Persist to localStorage whenever xpState changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(xpState));
  }, [xpState, storageKey]);

  /**
   * Add experience and handle level ups
   */
  const addExperience = useCallback(
    (amount: number) => {
      setXPState((prev) => {
        let newExp = prev.experience + amount;
        let newLevel = prev.level;
        let newTotalXP = prev.totalXP + amount;
        const levelUps: number[] = [];

        // Handle multiple level ups
        while (newExp >= prev.nextLevelXP) {
          newExp -= prev.nextLevelXP;
          newLevel += 1;
          levelUps.push(newLevel);
        }

        const newMorphStage = calculateMorphStage(newLevel);
        const hasEvolved = newMorphStage !== prev.morphStage;

        // Show notification for first level up or evolution
        if (levelUps.length > 0) {
          setLevelUpNotification({
            level: newLevel,
            morphStage: hasEvolved ? newMorphStage : undefined,
          });
          setTimeout(() => setLevelUpNotification(null), 3000);
        }

        return {
          level: newLevel,
          experience: newExp,
          morphStage: newMorphStage,
          nextLevelXP: XP_PER_LEVEL,
          totalXP: newTotalXP,
        };
      });
    },
    []
  );

  /**
   * Get XP progress to next level (0-100)
   */
  const getXPProgress = useCallback((): number => {
    return Math.round((xpState.experience / xpState.nextLevelXP) * 100);
  }, [xpState.experience, xpState.nextLevelXP]);

  /**
   * Get remaining XP to next level
   */
  const getXPRemaining = useCallback((): number => {
    return xpState.nextLevelXP - xpState.experience;
  }, [xpState.experience, xpState.nextLevelXP]);

  /**
   * Check if pet can evolve
   */
  const canEvolve = useCallback((): boolean => {
    const nextStage = calculateMorphStage(xpState.level + 1);
    return nextStage !== xpState.morphStage;
  }, [xpState.level, xpState.morphStage]);

  /**
   * Reset XP (for testing)
   */
  const resetXP = useCallback(() => {
    const newState: PetXPState = {
      level: 1,
      experience: 0,
      morphStage: 'Axolol',
      nextLevelXP: XP_PER_LEVEL,
      totalXP: 0,
    };
    setXPState(newState);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return {
    ...xpState,
    addExperience,
    getXPProgress,
    getXPRemaining,
    canEvolve,
    resetXP,
    levelUpNotification,
  };
}

/**
 * Get XP reward based on battle outcome
 */
export function getBattleXPReward(
  playerWon: boolean,
  opponentLevel: number = 1
): number {
  if (!playerWon) return 10; // Consolation XP for loss
  return 25 + opponentLevel * 5; // Base 25 XP + bonus based on opponent level
}

/**
 * Get morph stage display name
 */
export function getMorphStageName(stage: MorphStage): string {
  return stage;
}

/**
 * Get morph stage emoji
 */
export function getMorphStageEmoji(stage: MorphStage): string {
  switch (stage) {
    case 'Axolol':
      return '🦎';
    case 'Axolump':
      return '🦎✨';
    case 'Axoloot':
      return '👑🦎';
  }
}

/**
 * Get level thresholds
 */
export const EVOLUTION_THRESHOLDS = {
  AXOLOL_TO_AXOLUMP: LEVEL_UP_THRESHOLD,
  AXOLUMP_TO_AXOLOOT: FINAL_EVOLUTION_THRESHOLD,
};
