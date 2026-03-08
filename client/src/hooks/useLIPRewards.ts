/**
 * Hook for managing LIP token rewards from battle victories
 */

import { useState, useCallback } from 'react';

export interface BattleReward {
  amount: number;
  eligible: boolean;
  reason?: string;
  timestamp: Date;
}

interface RewardRequirements {
  minLevel: number;
  cooldownMs: number;
  baseReward: number;
}

const REWARD_REQUIREMENTS: RewardRequirements = {
  minLevel: 5,
  cooldownMs: 3600000, // 1 hour cooldown
  baseReward: 100, // 100 LIP tokens
};

export function useLIPRewards() {
  const [lastRewardTime, setLastRewardTime] = useState<number>(0);
  const [totalRewardsEarned, setTotalRewardsEarned] = useState<number>(0);

  const calculateReward = useCallback(
    (playerLevel: number, opponentLevel: number, isVictory: boolean): BattleReward => {
      const now = Date.now();
      const timeSinceLastReward = now - lastRewardTime;

      // Check eligibility
      if (!isVictory) {
        return {
          amount: 0,
          eligible: false,
          reason: 'Only victories grant LIP rewards',
          timestamp: new Date(),
        };
      }

      if (playerLevel < REWARD_REQUIREMENTS.minLevel) {
        return {
          amount: 0,
          eligible: false,
          reason: `Minimum level ${REWARD_REQUIREMENTS.minLevel} required`,
          timestamp: new Date(),
        };
      }

      if (timeSinceLastReward < REWARD_REQUIREMENTS.cooldownMs) {
        const minutesRemaining = Math.ceil(
          (REWARD_REQUIREMENTS.cooldownMs - timeSinceLastReward) / 60000
        );
        return {
          amount: 0,
          eligible: false,
          reason: `Cooldown active. Next reward in ${minutesRemaining}m`,
          timestamp: new Date(),
        };
      }

      // Calculate reward amount based on level difference
      const levelDifference = Math.max(0, opponentLevel - playerLevel);
      const multiplier = 1 + levelDifference * 0.1; // +10% per level difference
      const rewardAmount = Math.floor(REWARD_REQUIREMENTS.baseReward * multiplier);

      return {
        amount: rewardAmount,
        eligible: true,
        timestamp: new Date(),
      };
    },
    [lastRewardTime]
  );

  const claimReward = useCallback(
    (reward: BattleReward) => {
      if (reward.eligible) {
        setLastRewardTime(Date.now());
        setTotalRewardsEarned((prev) => prev + reward.amount);

        // Save to localStorage
        const savedRewards = localStorage.getItem('lipRewards');
        const rewardsData = savedRewards ? JSON.parse(savedRewards) : [];
        rewardsData.push({
          amount: reward.amount,
          timestamp: reward.timestamp.toISOString(),
        });
        localStorage.setItem('lipRewards', JSON.stringify(rewardsData));

        return true;
      }
      return false;
    },
    []
  );

  const getTimeUntilNextReward = useCallback((): number => {
    const timeSinceLastReward = Date.now() - lastRewardTime;
    const timeRemaining = Math.max(0, REWARD_REQUIREMENTS.cooldownMs - timeSinceLastReward);
    return Math.ceil(timeRemaining / 1000); // Return in seconds
  }, [lastRewardTime]);

  const loadRewardsFromStorage = useCallback(() => {
    const savedRewards = localStorage.getItem('lipRewards');
    if (savedRewards) {
      const rewardsData = JSON.parse(savedRewards);
      const total = rewardsData.reduce((sum: number, r: any) => sum + r.amount, 0);
      setTotalRewardsEarned(total);

      // Set last reward time from most recent reward
      if (rewardsData.length > 0) {
        const lastReward = rewardsData[rewardsData.length - 1];
        setLastRewardTime(new Date(lastReward.timestamp).getTime());
      }
    }
  }, []);

  return {
    calculateReward,
    claimReward,
    getTimeUntilNextReward,
    loadRewardsFromStorage,
    totalRewardsEarned,
    lastRewardTime,
    requirements: REWARD_REQUIREMENTS,
  };
}
