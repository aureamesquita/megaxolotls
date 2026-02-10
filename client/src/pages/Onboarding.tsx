import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount, useChainId } from 'wagmi';
import { useLocation } from 'wouter';
import { megaETH } from '@/lib/chains';
import { CheckCircle, AlertCircle, Zap } from 'lucide-react';

/**
 * Onboarding Page
 * Guides users through adding MegaETH to MetaMask
 */
export default function Onboarding() {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const [, setLocation] = useLocation();
  const [setupComplete, setSetupComplete] = useState(false);
  const [addingNetwork, setAddingNetwork] = useState(false);

  // Auto-redirect if setup is complete
  useEffect(() => {
    if (isConnected && chainId === megaETH.id) {
      setSetupComplete(true);
      const timer = setTimeout(() => {
        setLocation('/');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isConnected, chainId, setLocation]);

  const handleAddMegaETH = async () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      alert('MetaMask not detected. Please install MetaMask.');
      return;
    }

    setAddingNetwork(true);
    try {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x10e6', // 4326 in hex
            chainName: 'MegaETH',
            nativeCurrency: {
              name: 'Ethereum',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://mainnet.megaeth.com/rpc'],
            blockExplorerUrls: ['https://explorer.megaeth.com'],
          },
        ],
      });
    } catch (error: any) {
      if (error.code !== 4001) {
        console.error('Failed to add network:', error);
      }
    } finally {
      setAddingNetwork(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 sm:p-8">
      {/* Background grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(255, 16, 240, 0.05) 25%, rgba(255, 16, 240, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 16, 240, 0.05) 75%, rgba(255, 16, 240, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 16, 240, 0.05) 25%, rgba(255, 16, 240, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 16, 240, 0.05) 75%, rgba(255, 16, 240, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
            Welcome to Megaxolotls
          </h1>
          <p className="text-gray-400 text-lg">Set up MegaETH to get started</p>
        </motion.div>

        {/* Setup Complete State */}
        {setupComplete && (
          <motion.div
            className="p-8 bg-neon-green/10 border border-neon-green rounded-lg text-center mb-8"
            variants={itemVariants}
          >
            <CheckCircle className="w-16 h-16 text-neon-green mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-neon-green mb-2">Setup Complete!</h2>
            <p className="text-gray-300">You're all set to start playing Megaxolotls.</p>
            <p className="text-sm text-gray-400 mt-2">Redirecting to home...</p>
          </motion.div>
        )}

        {/* Main Content */}
        {!setupComplete && (
          <>
            {/* Step 1: Connect Wallet */}
            <motion.div
              className="p-6 bg-black/40 border border-neon-cyan/30 rounded-lg mb-6"
              variants={itemVariants}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-neon-pink text-black font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
                  <p className="text-gray-400 mb-4">
                    First, connect your MetaMask or WalletConnect wallet. Look for the wallet connection button in the top right corner.
                  </p>
                  {isConnected ? (
                    <div className="flex items-center gap-2 text-neon-green">
                      <CheckCircle className="w-5 h-5" />
                      <span>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-400">
                      <AlertCircle className="w-5 h-5" />
                      <span>Not connected yet</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Step 2: Add MegaETH */}
            <motion.div
              className="p-6 bg-black/40 border border-neon-cyan/30 rounded-lg mb-6"
              variants={itemVariants}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-neon-cyan text-black font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Add MegaETH Network</h3>
                  <p className="text-gray-400 mb-4">
                    Click the button below to add MegaETH to your MetaMask. This will allow you to interact with the Megaxolotls smart contract.
                  </p>
                  <button
                    onClick={handleAddMegaETH}
                    disabled={!isConnected || addingNetwork}
                    className="flex items-center gap-2 px-4 py-2 bg-neon-pink hover:bg-neon-pink/80 disabled:bg-gray-600 text-black font-semibold rounded-lg transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    {addingNetwork ? 'Adding...' : 'Add MegaETH to MetaMask'}
                  </button>
                  {chainId === megaETH.id && (
                    <div className="flex items-center gap-2 text-neon-green mt-4">
                      <CheckCircle className="w-5 h-5" />
                      <span>MegaETH network added!</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Step 3: Network Details */}
            <motion.div
              className="p-6 bg-black/40 border border-neon-cyan/30 rounded-lg mb-6"
              variants={itemVariants}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-neon-green text-black font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-4">MegaETH Network Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between p-2 bg-gray-900/50 rounded">
                      <span className="text-gray-400">Chain ID:</span>
                      <span className="text-neon-cyan font-mono">4326 (0x10e6)</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-900/50 rounded">
                      <span className="text-gray-400">Currency:</span>
                      <span className="text-neon-cyan">ETH</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-900/50 rounded">
                      <span className="text-gray-400">Decimals:</span>
                      <span className="text-neon-cyan">18</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-900/50 rounded">
                      <span className="text-gray-400">RPC URL:</span>
                      <span className="text-neon-cyan font-mono text-xs break-all">
                        mainnet.megaeth.com/rpc
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-900/50 rounded">
                      <span className="text-gray-400">Explorer:</span>
                      <span className="text-neon-cyan font-mono text-xs">
                        explorer.megaeth.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Info Box */}
            <motion.div
              className="p-4 bg-neon-cyan/10 border border-neon-cyan/50 rounded-lg text-center"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-300">
                Once you've completed all steps, you'll be redirected to the main game. Ready to catch some Axolotls? 🦎
              </p>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
