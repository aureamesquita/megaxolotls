import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useLocation } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { useFirstUse } from '@/hooks/useFirstUse';
import { PlaytimeTracker } from '@/components/PlaytimeTracker';

/**
 * Tutorial Screen - Interactive onboarding for first-time users
 * Teaches game mechanics and counts playtime
 */
export default function Tutorial() {
  const { isConnected } = useAccount();
  const { completeTutorial } = useFirstUse();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  if (!isConnected) {
    setLocation('/');
    return null;
  }

  const tutorialSteps = [
    {
      title: 'Welcome to Megaxolotls',
      description: 'You are now a Megaxolotls trainer! Your journey begins here.',
      icon: '🦎',
      content: 'Megaxolotls is a Web3 gaming experience where you collect, battle, and care for unique Axolotl NFTs on the MegaETH blockchain.',
    },
    {
      title: 'Your First Pet',
      description: 'Mint your first Axolotl NFT',
      icon: '✨',
      content: 'Each Axolotl is a unique NFT with stats, abilities, and three evolution stages: Axolol → Axolump → Axoloot. You truly own your pets!',
    },
    {
      title: 'Battle System',
      description: 'Engage in turn-based strategic battles',
      icon: '⚔️',
      content: 'Challenge other trainers to battles. Select moves strategically, manage your pet\'s health, and win to earn LIP and MEGAX tokens.',
    },
    {
      title: 'Care & Breeding',
      description: 'Nurture your pets to make them stronger',
      icon: '💚',
      content: 'Feed, train, and breed your Axolotls to increase their stats. Breeding creates new unique offspring with combined traits!',
    },
    {
      title: 'Earn Rewards',
      description: 'Accumulate tokens and climb the ranking',
      icon: '💎',
      content: 'Win battles to earn LIP (gameplay token) and MEGAX (governance token). Trade them on DEXes or use them in-game.',
    },
  ];

  const step = tutorialSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
      setLocation('/home');
    }
  };

  const handleSkip = () => {
    completeTutorial();
    setLocation('/home');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Background grid */}
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

      {/* Content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Progress indicator */}
        <div className="mb-8 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-neon-cyan font-bold">
              Step {currentStep + 1} of {tutorialSteps.length}
            </span>
            <PlaytimeTracker />
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Tutorial card */}
        <motion.div
          className="w-full max-w-2xl bg-black/40 border border-neon-cyan/30 rounded-lg p-8 sm:p-12"
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon */}
          <div className="text-6xl mb-6 text-center">{step.icon}</div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green bg-clip-text text-transparent">
            {step.title}
          </h2>

          {/* Description */}
          <p className="text-center text-neon-cyan font-semibold mb-6">{step.description}</p>

          {/* Content */}
          <p className="text-center text-gray-300 mb-8 leading-relaxed">{step.content}</p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={handleSkip}
              className="px-6 py-3 font-bold text-gray-300 border-2 border-gray-600 rounded-lg hover:border-neon-cyan/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skip Tutorial
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="group relative px-8 py-3 font-bold text-black bg-gradient-to-r from-neon-pink to-neon-cyan rounded-lg overflow-hidden transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex items-center gap-2 bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent group-hover:text-black transition-colors">
                {currentStep === tutorialSteps.length - 1 ? 'Start Game' : 'Next'}
                <ChevronRight className="w-5 h-5" />
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Dots indicator */}
        <div className="mt-12 flex gap-2">
          {tutorialSteps.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentStep ? 'bg-neon-cyan w-8' : 'bg-gray-600'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
