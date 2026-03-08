import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Move } from '@shared/types';
import { useBattleLogic } from '@/hooks/useBattleLogic';
import { MoveCardDetail } from './MoveCardDetail';

interface BattleArenaProps {
  availableMoves: Move[];
  onBattleEnd?: (winner: 'player' | 'enemy' | 'draw' | null) => void;
}

export const BattleArena: React.FC<BattleArenaProps> = ({ availableMoves, onBattleEnd }) => {
  const { state, selectMove, resetBattle } = useBattleLogic();
  const [selectedMoveDetail, setSelectedMoveDetail] = useState<Move | null>(null);

  const handleMoveClick = (move: Move) => {
    if (!state.battleEnded) {
      selectMove(move, availableMoves);
    }
  };

  const handleReset = () => {
    resetBattle();
  };

  // Calculate bar widths
  const playerHPPercent = (state.playerHP / state.playerMaxHP) * 100;
  const enemyHPPercent = (state.enemyHP / state.enemyMaxHP) * 100;
  const playerEnergyPercent = (state.playerEnergy / state.playerMaxEnergy) * 100;
  const enemyEnergyPercent = (state.enemyEnergy / state.enemyMaxEnergy) * 100;

  return (
    <div className="w-full">
      {/* Battle Arena */}
      <div className="mb-8 p-6 bg-black/40 border border-neon-cyan/30 rounded-lg backdrop-blur">
        {/* Players Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {/* Player */}
          <div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-neon-cyan font-bold text-lg">Your Axolotl</h3>
                <span className="px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400 text-blue-300 text-xs font-bold">💧 Water</span>
              </div>
              <p className="text-gray-400 text-sm">Axolol (Level 5)</p>
              {/* Player Axolotl Image */}
              <div className="mt-3 rounded overflow-hidden border border-neon-cyan/30 h-40 bg-black/60">
                <img
                  src="https://bi.fbcd.co/posts/axolotl-drawing-final-result-63bdad49f098a088673675.jpg"
                  alt="Your Axolotl"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* HP Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-400">HP</span>
                <span className="text-sm text-neon-cyan font-bold">
                  {Math.ceil(state.playerHP)} / {state.playerMaxHP}
                </span>
              </div>
              <div className="w-full h-6 bg-gray-800 rounded border border-neon-cyan/30 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-neon-cyan"
                  initial={{ width: '100%' }}
                  animate={{ width: `${playerHPPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Energy Bar */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-400">Energy</span>
                <span className="text-sm text-neon-pink font-bold">
                  {state.playerEnergy} / {state.playerMaxEnergy}
                </span>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded border border-neon-pink/30 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-500 to-neon-pink"
                  initial={{ width: '100%' }}
                  animate={{ width: `${playerEnergyPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Enemy */}
          <div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-neon-pink font-bold text-lg">Enemy Axolotl</h3>
                <span className="px-3 py-1 rounded-full bg-red-500/30 border border-red-400 text-red-300 text-xs font-bold">🔥 Fire</span>
              </div>
              <p className="text-gray-400 text-sm">Axolol (Level 5)</p>
              {/* Enemy Axolotl Image */}
              <div className="mt-3 rounded overflow-hidden border border-neon-pink/30 h-40 bg-black/60">
                <img
                  src="https://www.emilydrawing.com/wp-content/uploads/2024/09/How-To-Draw-an-Axolotl-Steps-10.jpg"
                  alt="Enemy Axolotl"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* HP Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-400">HP</span>
                <span className="text-sm text-neon-pink font-bold">
                  {Math.ceil(state.enemyHP)} / {state.enemyMaxHP}
                </span>
              </div>
              <div className="w-full h-6 bg-gray-800 rounded border border-neon-pink/30 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 to-neon-pink"
                  initial={{ width: '100%' }}
                  animate={{ width: `${enemyHPPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Energy Bar */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-400">Energy</span>
                <span className="text-sm text-neon-green font-bold">
                  {state.enemyEnergy} / {state.enemyMaxEnergy}
                </span>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded border border-neon-green/30 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-500 to-neon-green"
                  initial={{ width: '100%' }}
                  animate={{ width: `${enemyEnergyPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Battle Log */}
        <div className="mb-6 p-4 bg-black/60 rounded border border-neon-cyan/20 h-32 overflow-y-auto">
          <div className="space-y-2">
            {state.battleLog.map((log, idx) => (
              <motion.p
                key={idx}
                className="text-sm text-gray-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {log}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Move Selection */}
        {!state.battleEnded && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {availableMoves.map((move) => (
              <div key={move.id} className="relative">
                <motion.button
                  onClick={() => handleMoveClick(move)}
                  disabled={state.playerEnergy < move.energyCost}
                  className="w-full p-3 rounded border border-neon-cyan/30 bg-black/40 hover:border-neon-pink/50 hover:bg-black/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-sm font-bold text-neon-cyan mb-1">{move.name}</div>
                  <div className="text-xs text-gray-300 mb-1">
                    {move.elementalType === 'water' && '💧 Water'}
                    {move.elementalType === 'fire' && '🔥 Fire'}
                    {move.elementalType === 'grass' && '🌿 Grass'}
                    {move.elementalType === 'electric' && '⚡ Electric'}
                    {move.elementalType === 'ice' && '❄️ Ice'}
                    {move.elementalType === 'normal' && '⭕ Normal'}
                    {!move.elementalType && '⭕ Normal'}
                  </div>
                  <div className="text-xs text-gray-400">DMG: {move.damage}</div>
                  <div className="text-xs text-neon-pink">Cost: {move.energyCost}</div>
                </motion.button>
                <button
                  onClick={() => setSelectedMoveDetail(move)}
                  className="absolute top-1 right-1 w-5 h-5 bg-neon-cyan/20 hover:bg-neon-cyan/40 rounded text-xs text-neon-cyan font-bold transition-all"
                >
                  ?
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Move Detail Modal */}
        {selectedMoveDetail && (
          <MoveCardDetail move={selectedMoveDetail} onClose={() => setSelectedMoveDetail(null)} />
        )}

        {/* Battle End */}
        {state.battleEnded && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2
              className={`text-3xl font-bold mb-4 ${
                state.winner === 'player'
                  ? 'text-neon-green'
                  : state.winner === 'enemy'
                  ? 'text-neon-pink'
                  : 'text-yellow-400'
              }`}
            >
              {state.winner === 'player' ? '🎉 VICTORY!' : state.winner === 'enemy' ? '💀 DEFEAT!' : '🤝 DRAW!'}
            </h2>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-neon-cyan text-black font-bold rounded hover:bg-neon-green transition-all"
            >
              New Battle
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
