import React from 'react';
import { motion } from 'framer-motion';
import { Move } from '@shared/types';
import { X } from 'lucide-react';

interface MoveCardDetailProps {
  move: Move;
  onClose: () => void;
}

export const MoveCardDetail: React.FC<MoveCardDetailProps> = ({ move, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl overflow-hidden border-2 border-neon-cyan shadow-2xl"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/80 rounded-full transition-all"
        >
          <X className="w-5 h-5 text-neon-cyan" />
        </button>

        {/* Move Image Background */}
        {move.imageUrl && (
          <div className="relative h-64 overflow-hidden">
            <img
              src={move.imageUrl}
              alt={move.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900" />
          </div>
        )}

        {/* Move Info */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-black text-neon-cyan">{move.name}</h2>
              <span className="text-2xl">⚡</span>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded-full text-xs font-bold uppercase">
                {move.type}
              </span>
              <span className="px-3 py-1 bg-neon-pink/20 text-neon-pink rounded-full text-xs font-bold">
                Cost: {move.energyCost}
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 bg-black/40 rounded border border-neon-cyan/20">
              <p className="text-xs text-gray-400 mb-1">Damage</p>
              <p className="text-xl font-bold text-neon-cyan">{move.damage}</p>
            </div>
            <div className="p-3 bg-black/40 rounded border border-neon-green/20">
              <p className="text-xs text-gray-400 mb-1">Power</p>
              <p className="text-xl font-bold text-neon-green">{move.power}</p>
            </div>
            <div className="p-3 bg-black/40 rounded border border-neon-pink/20">
              <p className="text-xs text-gray-400 mb-1">Accuracy</p>
              <p className="text-xl font-bold text-neon-pink">{move.accuracy}%</p>
            </div>
            <div className="p-3 bg-black/40 rounded border border-yellow-500/20">
              <p className="text-xs text-gray-400 mb-1">PP</p>
              <p className="text-xl font-bold text-yellow-400">{move.pp}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-sm text-gray-300 italic">{move.description}</p>
          </div>

          {/* Learned At */}
          {move.learnedAtLevel && (
            <div className="p-3 bg-black/60 rounded border border-neon-cyan/20">
              <p className="text-xs text-gray-400">Learned at Level {move.learnedAtLevel}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
