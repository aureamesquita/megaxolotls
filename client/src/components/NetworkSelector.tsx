import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useSwitchChain } from 'wagmi';
import { megaETH } from '@/lib/chains';
import { ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * NetworkSelector Component
 * Allows users to switch between supported networks
 * Shows warning if connected to wrong network
 */
export const NetworkSelector: React.FC = () => {
  const { chainId, isConnected } = useAccount();
  const { switchChain, isPending } = useSwitchChain();
  const [showDropdown, setShowDropdown] = useState(false);

  const isCorrectNetwork = chainId === megaETH.id;
  const networkName = chainId === megaETH.id ? 'MegaETH' : 'Unknown Network';

  const handleSwitchNetwork = async () => {
    if (switchChain) {
      switchChain({ chainId: megaETH.id });
      setShowDropdown(false);
    }
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className="relative">
      {/* Network Button */}
      <motion.button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-all ${
          isCorrectNetwork
            ? 'bg-neon-green/20 border border-neon-green text-neon-green hover:bg-neon-green/30'
            : 'bg-red-900/30 border border-red-500 text-red-400 hover:bg-red-900/50'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isCorrectNetwork ? (
          <CheckCircle className="w-4 h-4" />
        ) : (
          <AlertCircle className="w-4 h-4" />
        )}
        <span className="text-sm">{networkName}</span>
        <ChevronDown className="w-4 h-4" />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-64 bg-gray-900 border border-neon-cyan rounded-lg shadow-xl shadow-neon-cyan/20 z-50"
          >
            <div className="p-4 space-y-3">
              {/* Current Network Info */}
              <div className="text-sm">
                <p className="text-gray-400 mb-2">Current Network</p>
                <div className={`p-3 rounded-lg border ${
                  isCorrectNetwork
                    ? 'bg-neon-green/10 border-neon-green/50'
                    : 'bg-red-900/20 border-red-500/50'
                }`}>
                  <p className={`font-semibold ${isCorrectNetwork ? 'text-neon-green' : 'text-red-400'}`}>
                    {networkName}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Chain ID: {chainId || 'Unknown'}
                  </p>
                </div>
              </div>

              {/* Warning if wrong network */}
              {!isCorrectNetwork && (
                <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
                  <p className="text-xs text-red-400">
                    ⚠️ You are connected to the wrong network. Please switch to MegaETH to continue.
                  </p>
                </div>
              )}

              {/* Switch Network Button */}
              {!isCorrectNetwork && (
                <button
                  onClick={handleSwitchNetwork}
                  disabled={isPending}
                  className="w-full px-3 py-2 bg-neon-pink hover:bg-neon-pink/80 disabled:bg-gray-600 text-black font-semibold rounded-lg transition-colors text-sm"
                >
                  {isPending ? 'Switching...' : 'Switch to MegaETH'}
                </button>
              )}

              {/* Network Details */}
              <div className="pt-3 border-t border-gray-700 space-y-2 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Chain ID:</span>
                  <span className="text-neon-cyan font-mono">{megaETH.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Currency:</span>
                  <span className="text-neon-cyan">{megaETH.nativeCurrency.symbol}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span>RPC:</span>
                  <span className="text-neon-cyan font-mono text-right text-[10px] break-all">
                    {megaETH.rpcUrls.default.http[0]}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowDropdown(false)}
                className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
