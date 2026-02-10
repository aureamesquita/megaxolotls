import { useAccount, useReadContract } from 'wagmi';
import { AXOLOTL_NFT_ABI } from '@/lib/contracts/axolotlNFT';

/**
 * Hook to read Axolotl NFT balance from contract
 * Returns the number of Axolotls owned by the connected wallet
 */
export const useAxolotlBalance = () => {
  const { address, isConnected } = useAccount();

  // Contract address - replace with actual deployed address
  const contractAddress = process.env.VITE_AXOLOTL_CONTRACT_ADDRESS as `0x${string}` | undefined;

  const { data: balance, isLoading, error } = useReadContract({
    address: contractAddress,
    abi: AXOLOTL_NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address && !!contractAddress,
    },
  });

  return {
    balance: balance ? Number(balance) : 0,
    isLoading,
    error,
    hasAxolotls: balance ? Number(balance) > 0 : false,
  };
};

/**
 * Hook to read Axolotl metadata by token ID
 */
export const useAxolotlMetadata = (tokenId?: bigint) => {
  const contractAddress = process.env.VITE_AXOLOTL_CONTRACT_ADDRESS as `0x${string}` | undefined;

  const { data: metadata, isLoading, error } = useReadContract({
    address: contractAddress,
    abi: AXOLOTL_NFT_ABI,
    functionName: 'getAxolotlData',
    args: tokenId ? [tokenId] : undefined,
    query: {
      enabled: !!tokenId && !!contractAddress,
    },
  });

  return {
    metadata,
    isLoading,
    error,
  };
};

/**
 * Hook to read all token IDs owned by an address
 */
export const useAxolotlTokens = () => {
  const { address, isConnected } = useAccount();
  const contractAddress = process.env.VITE_AXOLOTL_CONTRACT_ADDRESS as `0x${string}` | undefined;

  const { data: tokens, isLoading, error } = useReadContract({
    address: contractAddress,
    abi: AXOLOTL_NFT_ABI,
    functionName: 'tokensOfOwner',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address && !!contractAddress,
    },
  });

  return {
    tokens: tokens ? (tokens as bigint[]) : [],
    isLoading,
    error,
  };
};
