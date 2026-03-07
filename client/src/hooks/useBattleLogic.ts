import { useState, useCallback } from 'react';
import { Move } from '@shared/types';
import { ElementalType, calculateFinalDamage, getTypeMatchupDescription } from '@/lib/elementalTypes';

export interface BattleState {
  playerHP: number;
  playerEnergy: number;
  playerMaxHP: number;
  playerMaxEnergy: number;
  playerType: ElementalType;
  enemyHP: number;
  enemyEnergy: number;
  enemyMaxHP: number;
  enemyMaxEnergy: number;
  enemyType: ElementalType;
  selectedMove: Move | null;
  enemySelectedMove: Move | null;
  battleLog: string[];
  isPlayerTurn: boolean;
  battleEnded: boolean;
  winner: 'player' | 'enemy' | null | 'draw';
}

const INITIAL_STATE: BattleState = {
  playerHP: 100,
  playerEnergy: 5,
  playerMaxHP: 100,
  playerMaxEnergy: 5,
  playerType: 'Water',
  enemyHP: 100,
  enemyEnergy: 5,
  enemyMaxHP: 100,
  enemyMaxEnergy: 5,
  enemyType: 'Fire',
  selectedMove: null,
  enemySelectedMove: null,
  battleLog: ['Battle started!'],
  isPlayerTurn: true,
  battleEnded: false,
  winner: null,
};

export const useBattleLogic = (playerType: ElementalType = 'Water', enemyType: ElementalType = 'Fire') => {
  const initialState = { ...INITIAL_STATE, playerType, enemyType };
  const [state, setState] = useState<BattleState>(initialState);

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

      // Calculate damage with type matching and STAB
      const playerDamage = calculateFinalDamage(
        move.damage,
        prev.playerType,
        prev.playerType,
        prev.enemyType
      );
      const aiDamage = calculateFinalDamage(
        aiMove.damage,
        prev.enemyType,
        prev.enemyType,
        prev.playerType
      );

      // Get type matchup descriptions
      const playerTypeDesc = getTypeMatchupDescription(prev.playerType, prev.enemyType);
      const enemyTypeDesc = getTypeMatchupDescription(prev.enemyType, prev.playerType);

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
        `You used ${move.name}! Dealt ${playerDamage} damage! ${playerTypeDesc}`,
        `Enemy used ${aiMove.name}! Dealt ${aiDamage} damage! ${enemyTypeDesc}`,
      ];

      // Check if battle ended
      let battleEnded = false;
      let winner: 'player' | 'enemy' | null = null;

      // Check for draw first (both at 0 HP)
      if (newEnemyHP <= 0 && newPlayerHP <= 0) {
        battleEnded = true;
        winner = null; // Draw
        newLog.push('Draw! Both Axolotls fainted!');
      } else if (newEnemyHP <= 0) {
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
    setState(initialState);
  }, [initialState]);

  return {
    state,
    selectMove,
    resetBattle,
    playerType,
    enemyType,
  };
};
