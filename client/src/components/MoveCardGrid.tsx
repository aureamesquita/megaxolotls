import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Move } from '@shared/types';
import { MoveCard } from './MoveCard';

interface MoveCardGridProps {
  moves: Move[];
  onMoveSelect?: (move: Move) => void;
  title?: string;
}

/**
 * Move Card Grid Component - Displays 4 moves in a grid
 * Used for battle move selection with zoom animation
 */
export const MoveCardGrid: React.FC<MoveCardGridProps> = ({
  moves,
  onMoveSelect,
  title = 'Select Your Move',
}) => {
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);

  const handleMoveSelect = (move: Move) => {
    setSelectedMove(move);
    onMoveSelect?.(move);
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  return (
    <div className="w-full">
      {/* Title */}
      {title && (
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-neon-cyan mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] } as any}
        >
          {title}
        </motion.h2>
      )}

      {/* Grid container */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {moves.map((move, index) => (
          <motion.div key={move.id} variants={itemVariants}>
            <MoveCard
              move={move}
              onSelect={handleMoveSelect}
              isSelected={selectedMove?.id === move.id}
              size="medium"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Selected move info */}
      {selectedMove && (
        <motion.div
          className="mt-8 p-4 bg-black/40 border border-neon-pink rounded-lg text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] } as any}
        >
          <p className="text-sm text-gray-300">
            Selected: <span className="text-neon-pink font-bold">{selectedMove.name}</span>
          </p>
        </motion.div>
      )}
    </div>
  );
};
