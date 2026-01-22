import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Move } from '@shared/types';

interface MoveCardProps {
  move: Move;
  onSelect?: (move: Move) => void;
  isSelected?: boolean;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Move Card Component - Inspired by Pokémon TCG design
 * Shows move details with zoom animation on hover/touch
 */
export const MoveCard: React.FC<MoveCardProps> = ({
  move,
  onSelect,
  isSelected = false,
  size = 'medium',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Type colors for neon theme
  const typeColors: Record<string, { bg: string; border: string; glow: string }> = {
    physical: {
      bg: 'from-red-600 to-red-800',
      border: 'border-red-400',
      glow: 'shadow-red-500/50',
    },
    special: {
      bg: 'from-purple-600 to-purple-800',
      border: 'border-purple-400',
      glow: 'shadow-purple-500/50',
    },
    status: {
      bg: 'from-cyan-600 to-blue-800',
      border: 'border-cyan-400',
      glow: 'shadow-cyan-500/50',
    },
  };

  const typeColor = typeColors[move.type] || typeColors.physical;

  const sizeMap = {
    small: 'w-24 h-32',
    medium: 'w-32 h-44',
    large: 'w-40 h-56',
  };

  const cardSize = sizeMap[size];

  // Card container animation
  const containerVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    expanded: { scale: 1 },
  };

  // Glow effect animation
  const glowVariants = {
    initial: { opacity: 0.5 },
    hover: { opacity: 1 },
    expanded: { opacity: 1 },
  };

  return (
    <>
      <motion.div
        className={`${cardSize} relative cursor-pointer`}
        variants={containerVariants}
        initial="initial"
        whileHover="hover"
        onClick={() => setIsExpanded(true)}
        onTap={() => setIsExpanded(true)}
      >
        {/* Card background with glow */}
        <motion.div
          className={`absolute inset-0 rounded-xl bg-gradient-to-b ${typeColor.bg} ${typeColor.border} border-2 overflow-hidden ${typeColor.glow} shadow-lg`}
          variants={glowVariants}
          initial="initial"
          whileHover="hover"
        >
          {/* Neon border glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />

          {/* Card content */}
          <div className="relative h-full p-2 sm:p-3 flex flex-col justify-between text-white">
            {/* Header */}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-xs sm:text-sm truncate flex-1">{move.name}</h3>
              <div className="flex items-center gap-1 bg-black/50 px-1.5 py-0.5 rounded text-xs font-bold">
                <span>⚡</span>
                <span>{move.pp}</span>
              </div>
            </div>

            {/* Type badge */}
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
              {move.type}
            </div>

            {/* Damage/Power display */}
            <div className="flex justify-between items-center bg-black/40 rounded px-2 py-1">
              <span className="text-xs">DMG</span>
              <span className="font-bold text-sm">{move.power}</span>
            </div>

            {/* Accuracy */}
            <div className="text-xs text-gray-200">
              ACC: {move.accuracy}%
            </div>

            {/* Footer quote */}
            <p className="text-xs italic text-gray-300 line-clamp-2">
              "{move.description}"
            </p>
          </div>
        </motion.div>

        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-neon-pink"
            animate={{ boxShadow: ['0 0 10px rgba(255, 16, 240, 0.5)', '0 0 20px rgba(255, 16, 240, 1)'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Fullscreen expanded view */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              className="w-full max-w-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Expanded card */}
              <div
                className={`rounded-2xl bg-gradient-to-b ${typeColor.bg} ${typeColor.border} border-4 overflow-hidden ${typeColor.glow} shadow-2xl p-6 text-white`}
              >
                {/* Close button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white font-bold text-xl transition-colors"
                >
                  ✕
                </button>

                {/* Title */}
                <h2 className="text-3xl font-bold mb-2">{move.name}</h2>

                {/* Cost and type */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-lg">
                    <span className="text-lg">⚡</span>
                    <span className="font-bold">Cost: {move.pp}</span>
                  </div>
                  <div className="uppercase text-sm font-bold px-3 py-1 bg-black/40 rounded-lg">
                    {move.type}
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-black/40 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-300 mb-1">DAMAGE</div>
                    <div className="text-2xl font-bold text-neon-pink">{move.power}</div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-300 mb-1">ACCURACY</div>
                    <div className="text-2xl font-bold text-neon-cyan">{move.accuracy}%</div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-black/40 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-bold text-neon-cyan mb-2">DESCRIPTION</h3>
                  <p className="text-sm text-gray-200">{move.description}</p>
                </div>

                {/* Learned info */}
                {move.learnedAtLevel && (
                  <div className="text-xs text-gray-300 mb-4">
                    Learned at Level {move.learnedAtLevel}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      onSelect?.(move);
                      setIsExpanded(false);
                    }}
                    className="flex-1 bg-neon-pink hover:bg-neon-pink/80 text-black font-bold py-2 rounded-lg transition-colors"
                  >
                    Select Move
                  </button>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="flex-1 bg-black/50 hover:bg-black/70 text-white font-bold py-2 rounded-lg transition-colors border border-gray-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
