/**
 * MegaETH Network Constants
 * Official MegaETH mainnet configuration
 */

export const MEGAETH = {
  // Network identification
  chainId: 4326,
  chainIdHex: '0x10e6',
  name: 'MegaETH',
  
  // RPC endpoint
  rpcUrl: 'https://mainnet.megaeth.com/rpc',
  
  // Native currency
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  
  // Block explorer
  blockExplorer: 'https://explorer.megaeth.com',
  
  // Network type
  isTestnet: false,
  isMainnet: true,
} as const;

/**
 * Check if a chain ID is MegaETH
 */
export const isMegaETH = (chainId: number): boolean => {
  return chainId === MEGAETH.chainId;
};

/**
 * Get MegaETH network info
 */
export const getMegaETHInfo = () => {
  return {
    chainId: MEGAETH.chainId,
    chainIdHex: MEGAETH.chainIdHex,
    name: MEGAETH.name,
    rpcUrl: MEGAETH.rpcUrl,
    blockExplorer: MEGAETH.blockExplorer,
  };
};
