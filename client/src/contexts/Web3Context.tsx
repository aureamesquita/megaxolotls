import React, { createContext, useContext, ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { metaMask, walletConnect } from '@wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { megaETH, SUPPORTED_CHAINS } from '@/lib/chains';

// Get WalletConnect Project ID from environment (use import.meta.env for Vite)
const WALLET_CONNECT_PROJECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

// Build connectors array - only add walletConnect if projectId is available
const connectors = [metaMask()];
if (WALLET_CONNECT_PROJECT_ID) {
  connectors.push(
    walletConnect({
      projectId: WALLET_CONNECT_PROJECT_ID,
    })
  );
}

// Configure Wagmi with MegaETH as primary chain
const config = createConfig({
  chains: [megaETH, ...SUPPORTED_CHAINS],
  connectors,
  transports: {
    [megaETH.id]: http('https://mainnet.megaeth.com/rpc'),
  },
});

// Create React Query client
const queryClient = new QueryClient();

interface Web3ContextType {
  isConnected: boolean;
  address?: string;
  chainId?: number;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

/**
 * Web3Provider - Wraps app with Wagmi and React Query
 * Configured for MegaETH mainnet (chainID 4326)
 * 
 * Note: WalletConnect is optional and only enabled if VITE_WALLET_CONNECT_PROJECT_ID is set
 */
export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3Context must be used within Web3Provider');
  }
  return context;
};
