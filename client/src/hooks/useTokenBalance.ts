import { useAccount, useReadContract } from 'wagmi';
import { useMemo } from 'react';

/**
 * ERC-20 Token ABI (minimal for balanceOf)
 */
const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
  },
] as const;

/**
 * Hook to read ERC-20 token balance
 */
export function useTokenBalance(
  tokenAddress: `0x${string}` | undefined,
  decimals: number = 18
) {
  const { address } = useAccount();

  const { data: balance, isLoading, error } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!tokenAddress,
    },
  });

  // Convert balance from wei to human-readable format
  const formattedBalance = useMemo(() => {
    if (!balance) return '0';
    const num = Number(balance);
    const divisor = Math.pow(10, decimals);
    return (num / divisor).toFixed(2);
  }, [balance, decimals]);

  return {
    balance: formattedBalance,
    rawBalance: balance,
    isLoading,
    error,
  };
}

/**
 * Hook to read LIP token balance
 * LIP is a mock token for the game (using a placeholder address)
 */
export function useLIPBalance() {
  // Using a placeholder token address - in production, this would be the real LIP token
  const LIP_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000001' as const;
  
  return useTokenBalance(LIP_TOKEN_ADDRESS, 18);
}

/**
 * Hook to read MEGAX token balance
 * MEGAX is a mock token for the game (using a placeholder address)
 */
export function useMAGAXBalance() {
  // Using a placeholder token address - in production, this would be the real MEGAX token
  const MEGAX_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000002' as const;
  
  return useTokenBalance(MEGAX_TOKEN_ADDRESS, 18);
}

/**
 * Hook to read both LIP and MEGAX balances
 */
export function useGameTokenBalances() {
  const lip = useLIPBalance();
  const megax = useMAGAXBalance();

  return {
    lip,
    megax,
    isLoading: lip.isLoading || megax.isLoading,
    error: lip.error || megax.error,
  };
}
