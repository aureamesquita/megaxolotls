import React from 'react';
import { MoveCardGrid } from '@/components/MoveCardGrid';
import { getRandomBattleMoves } from '@/lib/mockMoves';
import { Move } from '@shared/types';

export default function BattleDemo() {
  const [battleMoves] = React.useState<Move[]>(getRandomBattleMoves(4));
  const [selectedMove, setSelectedMove] = React.useState<Move | null>(null);

  const handleMoveSelect = (move: Move) => {
    setSelectedMove(move);
    console.log('Selected move:', move);
  };

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
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
            MEGAXOLOTLS
          </h1>
          <p className="text-gray-400 text-lg">Battle System - Move Selection Demo</p>
        </div>

        {/* Battle info */}
        <div className="mb-8 p-6 bg-black/40 border border-neon-cyan/30 rounded-lg backdrop-blur">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Your Axolotl</p>
              <p className="text-neon-cyan font-bold text-lg">Axolol (Level 5)</p>
            </div>
            <div>
              <p className="text-gray-400">Enemy Axolotl</p>
              <p className="text-neon-pink font-bold text-lg">Axolol (Level 5)</p>
            </div>
          </div>
        </div>

        {/* Move card grid */}
        <div className="mb-12">
          <MoveCardGrid
            moves={battleMoves}
            onMoveSelect={handleMoveSelect}
            title="Select Your Move"
          />
        </div>

        {/* Instructions */}
        <div className="p-6 bg-black/40 border border-neon-cyan/30 rounded-lg backdrop-blur text-center">
          <p className="text-gray-300 mb-3">
            💡 <strong>Desktop:</strong> Hover over cards to zoom
          </p>
          <p className="text-gray-300">
            📱 <strong>Mobile:</strong> Tap or swipe to zoom and select moves
          </p>
        </div>
      </div>
    </div>
  );
}
