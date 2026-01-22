/**
 * Unified type exports
 * Import shared types from this single entry point.
 */

export type * from "../drizzle/schema";
export * from "./_core/errors";

// ============================================
// Axolotl Game Types
// ============================================

// Pet species available in Megaxolotls
export type PetSpecies = 'axolotl' | 'other_species_1' | 'other_species_2' | 'other_species_3';

// Axolotl color variations
export type AxolotlColor = 'leucistic' | 'melanoid' | 'golden' | 'copper' | 'wild' | 'albino';

// Morph stages for axolotls (evolution)
export type MorphStage = 'axolol' | 'axolump' | 'axoloot';

export interface AxolotlStats {
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  spAtk: number; // Special Attack
  spDef: number; // Special Defense
}

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  level: number;
  experience: number;
  stats: AxolotlStats;
  currentHp: number;
  status: 'healthy' | 'poisoned' | 'burned' | 'paralyzed' | 'frozen';
  moves: Move[];
  createdAt: Date;
  nftTokenId?: string; // On-chain NFT ID
}

// Axolotl-specific pet with morph stages
export interface AxolotlPet extends Pet {
  species: 'axolotl';
  color: AxolotlColor;
  morphStage: MorphStage; // Evolution stage: Axolol -> Axolump -> Axoloot
}

export interface Move {
  id: string;
  name: string;
  type: 'physical' | 'special' | 'status';
  power: number;
  accuracy: number;
  pp: number; // Power Points
  currentPp: number;
  description: string;
  learnedAtLevel?: number; // Level when move is learned
  learnedAtMorphStage?: MorphStage; // Morph stage when move is learned
}

export interface BattleState {
  id: string;
  playerPet: Pet;
  opponentPet: Pet;
  currentTurn: 'player' | 'opponent';
  turnCount: number;
  battleLog: BattleAction[];
  isFinished: boolean;
  winner?: 'player' | 'opponent' | 'draw';
  startedAt: Date;
  endedAt?: Date;
}

export interface BattleAction {
  turn: number;
  actor: 'player' | 'opponent';
  action: 'move' | 'item' | 'switch' | 'forfeit';
  moveId?: string;
  damage?: number;
  effectiveness?: 'super' | 'normal' | 'weak';
  critical?: boolean;
  message: string;
  timestamp: Date;
}

export interface CareAction {
  type: 'feed' | 'train' | 'heal' | 'play';
  timestamp: Date;
  expGained: number;
  hpRestored?: number;
  statBoost?: Partial<AxolotlStats>;
  morphStageChanged?: MorphStage; // If pet evolved during care
}

export interface GameState {
  playerPets: Pet[];
  currentBattle?: BattleState;
  careHistory: CareAction[];
  totalBattles: number;
  wins: number;
  losses: number;
}

// Animation states for sprites
export type AnimationState = 'idle' | 'attack' | 'defend' | 'hurt' | 'faint' | 'celebrate' | 'morph';

export interface SpriteAnimationConfig {
  state: AnimationState;
  duration: number;
  loop: boolean;
  scale?: number;
  rotation?: number;
}

// Morph stage progression
export const MORPH_STAGE_LEVELS: Record<MorphStage, number> = {
  'axolol': 1,
  'axolump': 20,
  'axoloot': 50,
};

export const MORPH_STAGE_NAMES: Record<MorphStage, string> = {
  'axolol': 'Axolol (Young)',
  'axolump': 'Axolump (Adult)',
  'axoloot': 'Axoloot (Elder)',
};
