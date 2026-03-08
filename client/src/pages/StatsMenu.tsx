/**
 * Axolotl Stats Menu - Mobile Game Style
 * Display comprehensive pet stats and information
 */

import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Heart, Shield, Zap as Speed } from 'lucide-react';

interface AxolotlStats {
  id: string;
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
  morphStage: 'axolol' | 'axolump' | 'axoloot';
  color: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  spAtk: number;
  spDef: number;
  moves: Array<{
    name: string;
    type: string;
    power: number;
  }>;
  traits: string[];
  nftTokenId?: string;
}

const mockAxolotl: AxolotlStats = {
  id: '1',
  name: 'Sparkle',
  level: 25,
  experience: 7500,
  maxExperience: 10000,
  morphStage: 'axolump',
  color: 'leucistic',
  health: 85,
  maxHealth: 100,
  attack: 72,
  defense: 68,
  speed: 65,
  spAtk: 78,
  spDef: 70,
  moves: [
    { name: 'Aqua Jet', type: 'water', power: 40 },
    { name: 'Ice Beam', type: 'ice', power: 90 },
    { name: 'Thunder Wave', type: 'electric', power: 0 },
    { name: 'Recover', type: 'normal', power: 0 },
  ],
  traits: ['Swift Swim', 'Hydration', 'Regenerator'],
  nftTokenId: '0x1a2b3c4d5e6f7g8h9i0j',
};

export default function StatsMenu() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState<'stats' | 'moves' | 'traits'>('stats');
  const axolotl = mockAxolotl;

  const xpPercent = (axolotl.experience / axolotl.maxExperience) * 100;

  const StatBar = ({
    label,
    value,
    max,
    color,
  }: {
    label: string;
    value: number;
    max: number;
    color: string;
  }) => {
    const percent = (value / max) * 100;
    return (
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">{label}</span>
          <span className="text-xs font-bold text-neon-cyan">{value}</span>
        </div>
        <div className="w-full h-3 bg-gray-800 rounded border border-gray-700 overflow-hidden">
          <motion.div
            className={`h-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-2xl font-bold">Stats Menu</h1>
        <div className="w-10" />
      </div>

      {/* Pet Header Card */}
      <motion.div
        className="mb-6 p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-neon-pink/30 rounded-lg backdrop-blur"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-neon-cyan/20 border-2 border-neon-cyan flex items-center justify-center text-3xl">
            🦎
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-neon-cyan">{axolotl.name}</h2>
            <p className="text-sm text-gray-400">
              {axolotl.morphStage.charAt(0).toUpperCase() + axolotl.morphStage.slice(1)} • Lvl{' '}
              {axolotl.level}
            </p>
            {axolotl.nftTokenId && (
              <p className="text-xs text-neon-pink font-mono mt-1">
                NFT: {axolotl.nftTokenId.slice(0, 10)}...
              </p>
            )}
          </div>
        </div>

        {/* XP Bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Experience</span>
            <span className="text-xs font-bold text-neon-cyan">
              {axolotl.experience} / {axolotl.maxExperience}
            </span>
          </div>
          <div className="w-full h-4 bg-gray-800 rounded border border-neon-cyan/30 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        {(['stats', 'moves', 'traits'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`flex-1 py-2 px-3 rounded font-bold transition-all ${
              selectedTab === tab
                ? 'bg-neon-cyan text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={selectedTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {selectedTab === 'stats' && (
          <div className="p-6 bg-black/40 border border-neon-cyan/30 rounded-lg backdrop-blur">
            <h3 className="text-lg font-bold text-neon-cyan mb-4">Base Stats</h3>
            <StatBar label="HP" value={axolotl.health} max={axolotl.maxHealth} color="bg-red-500" />
            <StatBar label="Attack" value={axolotl.attack} max={100} color="bg-orange-500" />
            <StatBar label="Defense" value={axolotl.defense} max={100} color="bg-blue-500" />
            <StatBar label="Sp. Atk" value={axolotl.spAtk} max={100} color="bg-purple-500" />
            <StatBar label="Sp. Def" value={axolotl.spDef} max={100} color="bg-green-500" />
            <StatBar label="Speed" value={axolotl.speed} max={100} color="bg-yellow-500" />
          </div>
        )}

        {selectedTab === 'moves' && (
          <div className="space-y-3">
            {axolotl.moves.map((move, idx) => (
              <motion.div
                key={idx}
                className="p-4 bg-black/40 border border-neon-cyan/30 rounded-lg backdrop-blur"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-neon-cyan">{move.name}</h4>
                  <span className="px-2 py-1 rounded bg-purple-500/30 border border-purple-400 text-xs text-purple-300">
                    {move.type}
                  </span>
                </div>
                {move.power > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Zap className="w-4 h-4" />
                    Power: {move.power}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {selectedTab === 'traits' && (
          <div className="space-y-3">
            {axolotl.traits.map((trait, idx) => (
              <motion.div
                key={idx}
                className="p-4 bg-gradient-to-r from-neon-pink/20 to-neon-cyan/20 border border-neon-pink/30 rounded-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <p className="font-bold text-neon-pink">{trait}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
