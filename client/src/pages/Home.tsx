import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useLocation } from 'wouter';
import { Zap, Wallet, Sparkles } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';

interface Window {
  ethereum?: any;
}

/**
 * Megaxolotls Splash Screen
 * Epic landing page with Web3 login
 */
export default function Home() {
  const { isConnected } = useAccount();
  const { connectMetaMask, isConnecting } = useWallet();
  const [, setLocation] = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Redirect based on connection and first-use status
  useEffect(() => {
    if (isConnected) {
      const hasSeenFirstUse = localStorage.getItem('megaxolotls_first_use');
      if (!hasSeenFirstUse) {
        setLocation('/first-use');
      } else {
        const tutorialComplete = localStorage.getItem('megaxolotls_tutorial_complete') === 'true';
        if (!tutorialComplete) {
          setLocation('/tutorial');
        } else {
          setLocation('/dashboard');
        }
      }
    }
  }, [isConnected, setLocation]);

  // Track mouse for glow effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
      } as any,
    },
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(255, 16, 240, 0.05) 25%, rgba(255, 16, 240, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 16, 240, 0.05) 75%, rgba(255, 16, 240, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 16, 240, 0.05) 25%, rgba(255, 16, 240, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 16, 240, 0.05) 75%, rgba(255, 16, 240, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Glow orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-neon-pink rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          } as any}
          style={{ top: '-10%', left: '-10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-neon-cyan rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          } as any}
          style={{ bottom: '-10%', right: '-10%' }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo/Title Section */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.div
            className="mb-6 inline-block"
            variants={floatingVariants}
            animate="animate"
          >
            <div className="relative">
              {/* Glow effect around logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-cyan rounded-full blur-2xl opacity-50" />
              <div className="relative bg-gradient-to-br from-neon-pink to-neon-cyan p-1 rounded-full">
                <div className="bg-slate-950 rounded-full p-4">
                  <Zap className="w-12 h-12 text-neon-cyan" />
                </div>
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl font-black mb-4 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green bg-clip-text text-transparent">
            MEGAXOLOTLS
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-2 font-light tracking-wider">
            Capture • Battle • Evolve
          </p>

          <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto">
            A Web3 gaming experience on MegaETH where your Axolotls are true NFT assets
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl w-full"
          variants={containerVariants}
        >
          {[
            {
              icon: '🦎',
              title: 'Collect Axolotls',
              desc: 'Mint unique NFT Axolotls with 3 evolution stages',
            },
            {
              icon: '⚔️',
              title: 'Epic Battles',
              desc: 'Turn-based combat with strategic move selection',
            },
            {
              icon: '🔗',
              title: 'Web3 Native',
              desc: 'Full ownership on MegaETH blockchain',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-lg border border-neon-cyan/30 bg-black/40 hover:border-neon-pink/50 transition-all hover:bg-black/60"
              variants={itemVariants}
              whileHover={{ y: -5, borderColor: 'rgb(255, 16, 240)' }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-neon-cyan font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center justify-center flex-wrap"
          variants={itemVariants}
        >
          <motion.button
            onClick={connectMetaMask}
            disabled={isConnecting}
            className="px-8 py-4 font-bold text-lg text-white bg-gradient-to-r from-neon-pink to-neon-cyan rounded-lg overflow-hidden transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-neon-pink/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </div>
          </motion.button>

          <motion.button
            onClick={() => setLocation('/demo-hub')}
            className="px-8 py-4 font-bold text-lg text-black bg-neon-cyan rounded-lg hover:bg-neon-green transition-all hover:shadow-lg hover:shadow-neon-cyan/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Try Demo
            </div>
          </motion.button>


        </motion.div>

        {/* Footer Info */}
        <motion.div
          className="mt-16 text-center text-gray-500 text-sm"
          variants={itemVariants}
        >
          <p>Powered by MegaETH • Built with React + Viem + Wagmi</p>
          <p className="mt-2">Chain ID: 4326 • Network: MegaETH Mainnet</p>
        </motion.div>
      </motion.div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 300 - 150],
              opacity: [0, 1, 0],
            }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
              } as any}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
