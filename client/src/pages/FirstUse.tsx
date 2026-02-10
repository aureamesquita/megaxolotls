import React from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useLocation } from 'wouter';
import { Zap, Wallet, Sparkles, ArrowRight } from 'lucide-react';
import { useFirstUse } from '@/hooks/useFirstUse';

/**
 * FirstUseScreen - Onboarding screen for first-time users
 * Shows after wallet connection for the first time
 */
export default function FirstUse() {
  const { address, isConnected } = useAccount();
  const { completeTutorial } = useFirstUse();
  const [, setLocation] = useLocation();

  if (!isConnected) {
    setLocation('/');
    return null;
  }

  const handleStartTutorial = () => {
    setLocation('/tutorial');
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
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
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
        {/* Welcome Section */}
        <motion.div className="text-center mb-12 max-w-2xl" variants={itemVariants}>
          <div className="mb-6 inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-cyan rounded-full blur-2xl opacity-50" />
              <div className="relative bg-gradient-to-br from-neon-pink to-neon-cyan p-1 rounded-full">
                <div className="bg-slate-950 rounded-full p-4">
                  <Sparkles className="w-12 h-12 text-neon-cyan" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green bg-clip-text text-transparent">
            Welcome, Trainer!
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-4">
            You're now connected to the Megaxolotls ecosystem on MegaETH
          </p>

          <div className="bg-black/40 border border-neon-cyan/30 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-400 mb-2">Connected Wallet</p>
            <p className="text-neon-cyan font-mono text-sm break-all">{address}</p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-3xl w-full"
          variants={containerVariants}
        >
          {[
            {
              icon: '🦎',
              title: 'Collect Pets',
              desc: 'Mint and own unique Axolotls as NFTs on the blockchain',
            },
            {
              icon: '⚔️',
              title: 'Battle & Compete',
              desc: 'Challenge other trainers in turn-based strategic battles',
            },
            {
              icon: '💎',
              title: 'Earn Rewards',
              desc: 'Win LIP and MEGAX tokens through battles and achievements',
            },
            {
              icon: '🔗',
              title: 'True Ownership',
              desc: 'Your pets are real NFTs - trade, sell, or keep them forever',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-lg border border-neon-cyan/30 bg-black/40 hover:border-neon-pink/50 transition-all"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-neon-cyan font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={handleStartTutorial}
          className="group relative px-8 py-4 font-bold text-lg text-black bg-gradient-to-r from-neon-pink to-neon-cyan rounded-lg overflow-hidden transition-all"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative flex items-center gap-2 bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent group-hover:text-black transition-colors">
            Start Tutorial
            <ArrowRight className="w-5 h-5" />
          </div>
        </motion.button>

        {/* Footer */}
        <motion.p className="mt-12 text-gray-500 text-sm" variants={itemVariants}>
          Chain: MegaETH (4326) • Network: Mainnet
        </motion.p>
      </motion.div>
    </div>
  );
}
