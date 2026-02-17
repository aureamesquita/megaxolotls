import { useState, useCallback } from 'react';
import { Move } from '@shared/types';

export interface BattleState {
  playerHP: number;
  playerEnergy: number;
  playerMaxHP: number;
  playerMaxEnergy: number;
  enemyHP: number;
  enemyEnergy: number;
  enemyMaxHP: number;
  enemyMaxEnergy: number;
  selectedMove: Move | null;
  enemySelectedMove: Move | null;
  battleLog: string[];
  isPlayerTurn: boolean;
  battleEnded: boolean;
  winner: 'player' | 'enemy' | null;
}

const INITIAL_STATE: BattleState = {
  playerHP: 100,
  playerEnergy: 5,
  playerMaxHP: 100,
  playerMaxEnergy: 5,
  enemyHP: 100,
  enemyEnergy: 5,
  enemyMaxHP: 100,
  enemyMaxEnergy: 5,
  selectedMove: null,
  enemySelectedMove: null,
  battleLog: ['Battle started!'],
  isPlayerTurn: true,
  battleEnded: false,
  winner: null,
};

export const useBattleLogic = () => {
  const [state, setState] = useState<BattleState>(INITIAL_STATE);

  // AI chooses random move
  const getAIMove = useCallback((availableMoves: Move[]): Move => {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }, []);

  // Select player move and trigger AI response
  const selectMove = useCallback((move: Move, availableMoves: Move[]) => {
    setState((prev) => {
      // Check if player has enough energy
      if (prev.playerEnergy < move.energyCost) {
        return {
          ...prev,
          battleLog: [...prev.battleLog, `Not enough energy! Need ${move.energyCost}, have ${prev.playerEnergy}`],
        };
      }

      // Get AI move
      const aiMove = getAIMove(availableMoves);

      // Calculate damage (simple formula: base damage with some variance)
      const playerDamage = move.damage + Math.floor(Math.random() * 10 - 5);
      const aiDamage = aiMove.damage + Math.floor(Math.random() * 10 - 5);

      // Apply damage
      let newEnemyHP = prev.enemyHP - playerDamage;
      let newPlayerHP = prev.playerHP - aiDamage;

      // Clamp HP to 0
      newEnemyHP = Math.max(0, newEnemyHP);
      newPlayerHP = Math.max(0, newPlayerHP);

      // Update energy
      const newPlayerEnergy = Math.max(0, prev.playerEnergy - move.energyCost);
      const newEnemyEnergy = Math.max(0, prev.enemyEnergy - aiMove.energyCost);

      // Regenerate 1 energy per turn (max 5)
      const playerEnergyRegen = Math.min(5, newPlayerEnergy + 1);
      const enemyEnergyRegen = Math.min(5, newEnemyEnergy + 1);

      // Build battle log
      const newLog = [
        ...prev.battleLog,
        `You used ${move.name}! Dealt ${playerDamage} damage!`,
        `Enemy used ${aiMove.name}! Dealt ${aiDamage} damage!`,
      ];

      // Check if battle ended
      let battleEnded = false;
      let winner: 'player' | 'enemy' | null = null;

      if (newEnemyHP <= 0) {
        battleEnded = true;
        winner = 'player';
        newLog.push('Victory! Enemy defeated!');
      } else if (newPlayerHP <= 0) {
        battleEnded = true;
        winner = 'enemy';
        newLog.push('Defeat! You were defeated!');
      }

      return {
        ...prev,
        playerHP: newPlayerHP,
        playerEnergy: playerEnergyRegen,
        enemyHP: newEnemyHP,
        enemyEnergy: enemyEnergyRegen,
        selectedMove: move,
        enemySelectedMove: aiMove,
        battleLog: newLog,
        battleEnded,
        winner,
      };
    });
  }, [getAIMove]);

  // Reset battle
  const resetBattle = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    selectMove,
    resetBattle,
  };
};
