import { useAccount } from 'wagmi';
import { useState, useCallback } from 'react';
import type { MorphStage } from './useXPSystem';

export interface ContractXPResult {
  newLevel: number;
  newMorphStage: MorphStage;
  evolved: boolean;
}

/**
 * Hook to interact with AxolotlNFT contract for XP management
 * Uses Viem for contract interactions (with mock implementation for demo)
 */
export function useContractXP() {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Add experience to a pet NFT via contract
   * In production, this would call the actual contract function
   */
  const addExperienceToNFT = useCallback(
    async (tokenId: number, xpAmount: number): Promise<ContractXPResult | null> => {
      if (!isConnected || !address) {
        setError('Wallet not connected');
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Mock implementation - simulates contract call
        // In production, replace with actual Viem contract write call:
        // const { request } = await publicClient.simulateContract({
        //   address: AXOLOTL_NFT_ADDRESS,
        //   abi: AXOLOTL_NFT_ABI,
        //   functionName: 'addExperienceWithEvolution',
        //   args: [BigInt(tokenId), BigInt(xpAmount)],
        //   account: address,
        // });
        // const hash = await walletClient.writeContract(request);

        // Simulate contract response
        const mockResult = simulateAddExperience(tokenId, xpAmount);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        return mockResult;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [address, isConnected]
  );

  /**
   * Get pet metadata from contract
   */
  const getPetMetadata = useCallback(
    async (tokenId: number) => {
      if (!isConnected) {
        setError('Wallet not connected');
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Mock implementation
        const mockMetadata = {
          level: 5,
          experience: 250,
          morphStage: 'Axolol' as MorphStage,
          name: `Axolotl #${tokenId}`,
          species: 'AXOLOTL',
        };

        await new Promise((resolve) => setTimeout(resolve, 300));

        return mockMetadata;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [isConnected]
  );

  return {
    addExperienceToNFT,
    getPetMetadata,
    isLoading,
    error,
    isConnected,
  };
}

/**
 * Simulate contract experience addition
 * Mirrors the Solidity contract logic
 */
function simulateAddExperience(tokenId: number, xpAmount: number): ContractXPResult {
  // Mock stored state (in real app, this would be from contract)
  const mockStorageKey = `pet-contract-${tokenId}`;
  const stored = localStorage.getItem(mockStorageKey);
  const petState = stored
    ? JSON.parse(stored)
    : { level: 1, experience: 0, morphStage: 'Axolol' as MorphStage };

  // Add experience
  let newExp = petState.experience + xpAmount;
  let newLevel = Math.floor(newExp / 100) + 1;

  // Calculate morph stage (mirrors Solidity logic)
  let newMorphStage: MorphStage = 'Axolol';
  if (newLevel >= 50) {
    newMorphStage = 'Axoloot';
  } else if (newLevel >= 20) {
    newMorphStage = 'Axolump';
  }

  const evolved = newMorphStage !== petState.morphStage;

  // Save mock state
  localStorage.setItem(
    mockStorageKey,
    JSON.stringify({
      level: newLevel,
      experience: newExp,
      morphStage: newMorphStage,
    })
  );

  return {
    newLevel,
    newMorphStage,
    evolved,
  };
}

/**
 * Get XP reward based on battle outcome (mirrors Solidity logic)
 */
export function getContractXPReward(playerWon: boolean, opponentLevel: number = 1): number {
  if (!playerWon) return 10;
  return 25 + opponentLevel * 5;
}

/**
 * Get evolution thresholds
 */
export const CONTRACT_EVOLUTION_THRESHOLDS = {
  AXOLOL_TO_AXOLUMP: 20,
  AXOLUMP_TO_AXOLOOT: 50,
};
