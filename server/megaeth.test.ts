import { describe, expect, it } from 'vitest';

// MegaETH constants
const MEGAETH = {
  chainId: 4326,
  chainIdHex: '0x10e6',
  name: 'MegaETH',
  rpcUrl: 'https://mainnet.megaeth.com/rpc',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorer: 'https://explorer.megaeth.com',
  isTestnet: false,
  isMainnet: true,
} as const;

describe('MegaETH Configuration', () => {
  describe('Chain Configuration', () => {
    it('should have correct chain ID', () => {
      expect(MEGAETH.chainId).toBe(4326);
    });

    it('should have correct chain ID hex', () => {
      expect(MEGAETH.chainIdHex).toBe('0x10e6');
    });

    it('should have MegaETH name', () => {
      expect(MEGAETH.name).toBe('MegaETH');
    });

    it('should have valid RPC URL', () => {
      expect(MEGAETH.rpcUrl).toBe('https://mainnet.megaeth.com/rpc');
      expect(MEGAETH.rpcUrl).toMatch(/^https:\/\//);
    });

    it('should be mainnet, not testnet', () => {
      expect(MEGAETH.isMainnet).toBe(true);
      expect(MEGAETH.isTestnet).toBe(false);
    });
  });

  describe('Native Currency', () => {
    it('should have ETH as native currency', () => {
      expect(MEGAETH.nativeCurrency.symbol).toBe('ETH');
      expect(MEGAETH.nativeCurrency.name).toBe('Ethereum');
    });

    it('should have 18 decimals for ETH', () => {
      expect(MEGAETH.nativeCurrency.decimals).toBe(18);
    });
  });

  describe('Block Explorer', () => {
    it('should have valid block explorer URL', () => {
      expect(MEGAETH.blockExplorer).toBe('https://explorer.megaeth.com');
      expect(MEGAETH.blockExplorer).toMatch(/^https:\/\//);
    });
  });

  describe('Chain ID Conversion', () => {
    it('should convert decimal chain ID to hex correctly', () => {
      const decimal = MEGAETH.chainId;
      const hex = '0x' + decimal.toString(16);
      expect(hex).toBe(MEGAETH.chainIdHex);
    });

    it('should convert hex chain ID to decimal correctly', () => {
      const hex = MEGAETH.chainIdHex;
      const decimal = parseInt(hex, 16);
      expect(decimal).toBe(MEGAETH.chainId);
    });
  });

  describe('Helper Functions', () => {
    const isMegaETH = (chainId: number): boolean => {
      return chainId === MEGAETH.chainId;
    };

    it('should identify MegaETH chain ID', () => {
      expect(isMegaETH(4326)).toBe(true);
    });

    it('should not identify other chain IDs as MegaETH', () => {
      expect(isMegaETH(1)).toBe(false); // Ethereum mainnet
      expect(isMegaETH(11155111)).toBe(false); // Sepolia
      expect(isMegaETH(137)).toBe(false); // Polygon
    });
  });
});
