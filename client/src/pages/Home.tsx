import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useLocation } from 'wouter';
import { Sparkles, Wallet, Heart, ExternalLink } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';

const getMetaMaskInstallLink = () => {
  if (typeof window === 'undefined') {
    return 'https://metamask.io/download/';
  }

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    return `https://metamask.app.link/dapp/${window.location.host}`;
  }

  return 'https://metamask.io/download/';
};

export default function Home() {
  const { isConnected } = useAccount();
  const { connectMetaMask, isConnecting } = useWallet();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isConnected) {
      const hasSeenFirstUse = localStorage.getItem('megaxolotls_first_use');
      if (!hasSeenFirstUse) {
        setLocation('/first-use');
      } else {
        const tutorialComplete = localStorage.getItem('megaxolotls_tutorial_complete') === 'true';
        setLocation(tutorialComplete ? '/dashboard' : '/tutorial');
      }
    }
  }, [isConnected, setLocation]);

  const handleConnectWallet = () => {
    if (typeof window !== 'undefined' && (window as Window & { ethereum?: unknown }).ethereum) {
      connectMetaMask();
      return;
    }

    window.open(getMetaMaskInstallLink(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#23183d] via-[#2f1f50] to-[#1d1533] p-4 sm:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-md flex-col rounded-[2.2rem] border border-pink-200/30 bg-[#120f24]/80 p-4 shadow-2xl shadow-pink-900/30 backdrop-blur">
        <motion.header
          className="mb-4 rounded-3xl bg-gradient-to-br from-pink-300/20 via-purple-300/15 to-cyan-300/20 p-4"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-pink-100">
              Mobile App Preview
            </span>
            <Sparkles className="h-5 w-5 text-pink-200" />
          </div>
          <h1 className="text-3xl font-black text-pink-100">MegaXolotls</h1>
          <p className="mt-2 text-sm text-pink-100/80">Your cutest on-chain axolotl companion world.</p>
        </motion.header>

        <motion.div
          className="relative mb-4 overflow-hidden rounded-3xl border border-white/15 bg-black/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <img src="/images/axolotl-hero.svg" alt="Cute axolotl hero art" className="h-52 w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#120f24] to-transparent p-4">
            <p className="text-sm font-semibold text-pink-100">Raise, cuddle, and battle magical axolotls ✨</p>
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-3 gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {['Feed', 'Play', 'Battle'].map(item => (
            <div key={item} className="rounded-2xl border border-pink-200/20 bg-pink-100/10 p-3 text-center text-xs font-semibold text-pink-100">
              {item}
            </div>
          ))}
        </motion.div>

        <div className="mt-auto space-y-3 pt-6">
          <motion.button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-400 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-pink-500/30 transition hover:brightness-105 disabled:opacity-70"
            whileTap={{ scale: 0.98 }}
          >
            <Wallet className="h-4 w-4" />
            {isConnecting ? 'Connecting wallet...' : 'Connect Wallet'}
          </motion.button>

          <p className="flex items-center justify-center gap-1 text-center text-xs text-pink-100/65">
            No wallet extension detected? We will open MetaMask install/deeplink.
            <ExternalLink className="h-3 w-3" />
          </p>

          <motion.button
            onClick={() => setLocation('/demo-hub')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-200/30 bg-cyan-300/10 px-4 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/20"
            whileTap={{ scale: 0.98 }}
          >
            <Heart className="h-4 w-4" />
            Enter Cuteness Demo
          </motion.button>

          <p className="text-center text-xs text-pink-100/70">WalletConnect API keys are optional. MetaMask flow works without them.</p>
        </div>
      </div>
    </div>
  );
}
