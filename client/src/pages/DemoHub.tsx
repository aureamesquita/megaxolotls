import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, Zap } from 'lucide-react';

/**
 * DemoHub - App menu screen (Tamagotchi-style)
 * Less marketing, more app-like interface
 */
export default function DemoHub() {
  const [, setLocation] = useLocation();
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const demoOptions = [
    {
      id: 'battle',
      title: 'Battle',
      emoji: '⚔️',
      description: 'Turn-based combat',
      color: 'from-red-500 to-orange-500',
      action: () => setLocation('/battle-demo'),
    },
    {
      id: 'care',
      title: 'Care',
      emoji: '💚',
      description: 'Pet care & rooms',
      color: 'from-green-500 to-emerald-500',
      action: () => setLocation('/care'),
    },
    {
      id: 'pets',
      title: 'Pets',
      emoji: '🦎',
      description: 'Pet gallery',
      color: 'from-cyan-500 to-blue-500',
      action: () => setLocation('/pets'),
    },
    {
      id: 'teams',
      title: 'Teams',
      emoji: '👥',
      description: 'Team building',
      color: 'from-purple-500 to-pink-500',
      action: () => setLocation('/teams'),
    },
    {
      id: 'bag',
      title: 'Bag',
      emoji: '🎒',
      description: 'Inventory & items',
      color: 'from-yellow-500 to-orange-500',
      action: () => setLocation('/bag'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 flex flex-col">
      {/* Top bar */}
      <motion.div
        className="flex items-center justify-between px-4 py-3 border-b border-neon-cyan/20 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.button
          onClick={() => setLocation('/')}
          className="p-2 hover:bg-neon-cyan/10 rounded-lg transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 text-neon-cyan" />
        </motion.button>
        <h1 className="text-lg font-bold text-neon-cyan flex items-center gap-2">
          <Zap className="w-5 h-5" />
          DEMO
        </h1>
        <div className="w-9" /> {/* Spacer for alignment */}
      </motion.div>

      {/* Main content */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Pet display area */}
        <motion.div
          className="mb-12 text-center"
          variants={itemVariants}
        >
          <div className="text-7xl mb-4 animate-bounce">🦎</div>
          <h2 className="text-2xl font-bold text-neon-cyan mb-2">MEGAXOLOTLS</h2>
          <p className="text-sm text-gray-400">Select a demo to try</p>
        </motion.div>

        {/* Demo buttons grid */}
        <motion.div
          className="w-full max-w-sm space-y-3"
          variants={containerVariants}
        >
          {demoOptions.map((demo) => (
            <motion.button
              key={demo.id}
              onClick={() => {
                setSelectedDemo(demo.id);
                setTimeout(() => demo.action(), 200);
              }}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                selectedDemo === demo.id
                  ? `border-neon-cyan bg-gradient-to-r ${demo.color} shadow-lg shadow-neon-cyan/50 scale-105`
                  : 'border-neon-cyan/30 bg-black/40 hover:border-neon-cyan/60 hover:bg-black/60'
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{demo.emoji}</div>
                <div className="text-left flex-1">
                  <div className="font-bold text-white text-lg">{demo.title}</div>
                  <div className="text-xs text-gray-300">{demo.description}</div>
                </div>
                <motion.div
                  animate={selectedDemo === demo.id ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  →
                </motion.div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Bottom info */}
        <motion.div
          className="mt-12 text-center text-xs text-gray-500"
          variants={itemVariants}
        >
          <p>Demo mode • No wallet required</p>
        </motion.div>
      </motion.div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
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
            }}
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
