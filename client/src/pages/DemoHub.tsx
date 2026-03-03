import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, Zap, Sparkles } from 'lucide-react';

/**
 * Demo Hub Page
 * Landing page for demo features (Battle, Care, Pets)
 */
export default function DemoHub() {
  const [, setLocation] = useLocation();

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

  const demoFeatures = [
    {
      title: 'Battle Arena',
      description: 'Experience turn-based combat with strategic move selection. Test your tactics against AI opponents.',
      icon: '⚔️',
      color: 'from-neon-green to-neon-cyan',
      action: () => setLocation('/battle-demo'),
      buttonText: 'Enter Battle',
    },
    {
      title: 'Care Rooms',
      description: 'Visit different rooms to boost your Axolotl stats. Each room provides unique stat bonuses.',
      icon: '💚',
      color: 'from-neon-pink to-neon-green',
      action: () => setLocation('/care'),
      buttonText: 'Visit Care',
    },
    {
      title: 'Pet Gallery',
      description: 'Browse your collection of Axolotls with different rarities and evolution stages.',
      icon: '🦎',
      color: 'from-neon-cyan to-neon-pink',
      action: () => setLocation('/pets'),
      buttonText: 'View Pets',
    },
  ];

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
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.div className="w-full max-w-4xl mb-8" variants={itemVariants}>
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </motion.div>

        {/* Title */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-5xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green bg-clip-text text-transparent">
            DEMO HUB
          </h1>
          <p className="text-lg text-gray-300">
            Explore the features of Megaxolotls
          </p>
        </motion.div>

        {/* Demo Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full"
          variants={containerVariants}
        >
          {demoFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              className="group relative"
              variants={itemVariants}
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-pink/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Card Content */}
              <div className="relative p-8 rounded-xl border border-neon-cyan/30 bg-black/40 hover:border-neon-pink/50 transition-all hover:bg-black/60 h-full flex flex-col">
                <div className="text-5xl mb-4">{feature.icon}</div>

                <h2 className="text-2xl font-bold text-neon-cyan mb-3">
                  {feature.title}
                </h2>

                <p className="text-gray-400 text-sm mb-6 flex-grow">
                  {feature.description}
                </p>

                <motion.button
                  onClick={feature.action}
                  className={`w-full px-6 py-3 font-bold text-lg text-white bg-gradient-to-r ${feature.color} rounded-lg overflow-hidden transition-all hover:shadow-lg`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {feature.buttonText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          className="mt-16 text-center text-gray-500 text-sm"
          variants={itemVariants}
        >
          <p>These are demo features. Connect your wallet to play with real NFTs.</p>
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
