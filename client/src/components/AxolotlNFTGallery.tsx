import React from 'react';
import { motion } from 'framer-motion';
import { useAxolotlBalance, useAxolotlTokens } from '@/hooks/useAxolotlBalance';
import { ExternalLink, Loader } from 'lucide-react';
import { megaETH } from '@/lib/chains';

/**
 * Axolotl NFT Gallery Component
 * Displays owned Axolotls with metadata and explorer links
 */
export const AxolotlNFTGallery: React.FC = () => {
  const { balance, isLoading: balanceLoading, hasAxolotls } = useAxolotlBalance();
  const { tokens, isLoading: tokensLoading } = useAxolotlTokens();

  const contractAddress = process.env.VITE_AXOLOTL_CONTRACT_ADDRESS;
  const isLoading = balanceLoading || tokensLoading;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-6 h-6 text-neon-cyan animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Balance Summary */}
      <motion.div
        className="p-6 bg-gradient-to-r from-neon-pink/10 to-neon-cyan/10 border border-neon-cyan/30 rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-1">Your Axolotls</p>
            <p className="text-3xl font-bold text-neon-cyan">{balance}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm mb-1">Status</p>
            <p className={`font-semibold ${hasAxolotls ? 'text-neon-green' : 'text-gray-400'}`}>
              {hasAxolotls ? '🦎 Ready to Battle!' : 'No Axolotls Yet'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* NFT List */}
      {hasAxolotls && tokens.length > 0 ? (
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-lg font-semibold text-neon-cyan mb-4">Your Collection</h3>

          {tokens.map((tokenId, index) => (
            <motion.div
              key={tokenId.toString()}
              className="p-4 bg-black/40 border border-neon-cyan/30 rounded-lg hover:border-neon-pink/50 transition-colors"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-white mb-1">Axolotl #{tokenId.toString()}</p>
                  <div className="flex gap-4 text-xs text-gray-400">
                    <span>Token ID: <span className="text-neon-cyan font-mono">{tokenId.toString()}</span></span>
                    <span>Status: <span className="text-neon-green">Owned</span></span>
                  </div>
                </div>

                {/* View on Explorer Link */}
                {contractAddress && (
                  <a
                    href={`${megaETH.blockExplorers?.default.url}/nft/${contractAddress}/${tokenId.toString()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 p-2 hover:bg-neon-pink/20 rounded-lg transition-colors"
                    title="View on MegaETH Explorer"
                  >
                    <ExternalLink className="w-5 h-5 text-neon-pink" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="p-8 bg-black/40 border border-dashed border-gray-600 rounded-lg text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-gray-400 mb-4">No Axolotls in your collection yet.</p>
          <p className="text-sm text-gray-500">
            Mint your first Axolotl NFT to get started!
          </p>
        </motion.div>
      )}

      {/* Contract Info */}
      {contractAddress && (
        <motion.div
          className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-xs text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="mb-2">
            Contract: <span className="text-neon-cyan font-mono break-all">{contractAddress}</span>
          </p>
          <a
            href={`${megaETH.blockExplorers?.default.url}/address/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-pink hover:text-neon-pink/80 transition-colors inline-flex items-center gap-1"
          >
            View on Explorer <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      )}
    </div>
  );
};
