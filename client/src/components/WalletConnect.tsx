import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';

export const WalletConnect: React.FC = () => {
  const {
    address,
    isConnected,
    isConnecting,
    connectMetaMask,
    connectWalletConnect,
    disconnectWallet,
    balance,
  } = useWallet();

  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  if (isConnected) {
    return (
      <div className="relative">
        <motion.button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple text-white font-semibold hover:shadow-lg hover:shadow-neon-pink/50 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Wallet className="w-4 h-4" />
          {shortAddress}
        </motion.button>

        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-56 bg-gray-900 border border-neon-cyan rounded-lg shadow-xl shadow-neon-cyan/20 z-50"
            >
              <div className="p-4 space-y-3">
                <div className="text-sm text-gray-400">
                  <p className="mb-1">Address</p>
                  <button
                    onClick={copyAddress}
                    className="flex items-center justify-between w-full p-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    <code className="text-xs text-neon-cyan">{address}</code>
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="text-sm text-gray-400">
                  <p className="mb-1">Network</p>
                  <p className="text-neon-cyan font-semibold">MegaETH (4326)</p>
                </div>

                <div className="text-sm text-gray-400">
                  <p className="mb-1">Balance</p>
                  <p className="text-neon-green font-semibold">{balance} ETH</p>
                </div>

                <button
                  onClick={() => {
                    disconnectWallet();
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded bg-red-900/30 hover:bg-red-900/50 text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={connectMetaMask}
          disabled={isConnecting}
          className="bg-gradient-to-r from-neon-pink to-neon-purple hover:shadow-lg hover:shadow-neon-pink/50"
        >
          {isConnecting ? 'Connecting...' : 'MetaMask'}
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={connectWalletConnect}
          disabled={isConnecting}
          variant="outline"
          className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
        >
          {isConnecting ? 'Connecting...' : 'WalletConnect'}
        </Button>
      </motion.div>
    </div>
  );
};
