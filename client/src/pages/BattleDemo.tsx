import React from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { BattleArena } from '@/components/BattleArena';
import { getRandomBattleMoves } from '@/lib/mockMoves';
import { Move } from '@shared/types';

export default function BattleDemo() {
  const [, setLocation] = useLocation();
  const [battleMoves] = React.useState<Move[]>(getRandomBattleMoves(4));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 sm:p-8">
      {/* Background grid pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(255, 16, 240, 0.05) 25%, rgba(255, 16, 240, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 16, 240, 0.05) 75%, rgba(255, 16, 240, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 16, 240, 0.05) 25%, rgba(255, 16, 240, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 16, 240, 0.05) 75%, rgba(255, 16, 240, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => setLocation('/')}
          className="mb-8 flex items-center gap-2 px-4 py-2 text-neon-cyan hover:text-neon-pink transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
            MEGAXOLOTLS
          </h1>
          <p className="text-gray-400 text-lg">Battle System - Turn-Based Combat</p>
        </div>

        {/* Battle Arena with HP/Energy bars and AI opponent */}
        <BattleArena availableMoves={battleMoves} />
      </div>
    </div>
  );
}
