import { defineChain } from 'viem';

/**
 * MegaETH Mainnet Configuration
 * ChainID: 4326 (0x10e6)
 * Currency: ETH
 * RPC: https://mainnet.megaeth.com/rpc
 */
export const megaETH = defineChain({
  id: 4326,
  name: 'MegaETH',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.megaeth.com/rpc'],
    },
    public: {
      http: ['https://mainnet.megaeth.com/rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'MegaETH Explorer',
      url: 'https://explorer.megaeth.com',
    },
  },
  testnet: false,
});

/**
 * Supported chains for Megaxolotls
 */
export const SUPPORTED_CHAINS = [megaETH];

/**
 * Default chain for the app
 */
export const DEFAULT_CHAIN = megaETH;
