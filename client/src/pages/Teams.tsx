import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, Plus, X, Trophy, Users } from 'lucide-react';

/**
 * Mock pet data for team composition
 */
const MOCK_PETS = [
  {
    id: 1,
    name: 'Aqua',
    species: 'Axolotl',
    level: 15,
    morphStage: 'Axolol',
    rarity: 'Rare',
    image: '🦎',
    stats: { hp: 45, attack: 50, defense: 40, speed: 35 },
  },
  {
    id: 2,
    name: 'Blaze',
    species: 'Axolotl',
    level: 22,
    morphStage: 'Axolump',
    rarity: 'Epic',
    image: '🔥',
    stats: { hp: 55, attack: 65, defense: 45, speed: 40 },
  },
  {
    id: 3,
    name: 'Nova',
    species: 'Axolotl',
    level: 8,
    morphStage: 'Axolol',
    rarity: 'Common',
    image: '✨',
    stats: { hp: 35, attack: 40, defense: 30, speed: 45 },
  },
  {
    id: 4,
    name: 'Titan',
    species: 'Axolotl',
    level: 35,
    morphStage: 'Axoloot',
    rarity: 'Legendary',
    image: '👑',
    stats: { hp: 75, attack: 80, defense: 70, speed: 50 },
  },
];

const MAX_TEAM_SIZE = 3;

/**
 * Teams Screen - Build and manage teams
 */
export default function Teams() {
  const [, setLocation] = useLocation();
  const [team, setTeam] = useState<typeof MOCK_PETS>([]);
  const [selectedTeamName, setSelectedTeamName] = useState('My Team');

  const addToTeam = (pet: typeof MOCK_PETS[0]) => {
    if (team.length < MAX_TEAM_SIZE && !team.find((p) => p.id === pet.id)) {
      setTeam([...team, pet]);
    }
  };

  const removeFromTeam = (petId: number) => {
    setTeam(team.filter((p) => p.id !== petId));
  };

  const calculateTeamStats = () => {
    if (team.length === 0) return { hp: 0, attack: 0, defense: 0, speed: 0 };
    return {
      hp: Math.round(team.reduce((sum, p) => sum + p.stats.hp, 0) / team.length),
      attack: Math.round(team.reduce((sum, p) => sum + p.stats.attack, 0) / team.length),
      defense: Math.round(team.reduce((sum, p) => sum + p.stats.defense, 0) / team.length),
      speed: Math.round(team.reduce((sum, p) => sum + p.stats.speed, 0) / team.length),
    };
  };

  const availablePets = MOCK_PETS.filter((p) => !team.find((t) => t.id === p.id));
  const teamStats = calculateTeamStats();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Background grid */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(255, 16, 240, 0.05) 25%, rgba(255, 16, 240, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 16, 240, 0.05) 75%, rgba(255, 16, 240, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 16, 240, 0.05) 25%, rgba(255, 16, 240, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 16, 240, 0.05) 75%, rgba(255, 16, 240, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Glow orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-neon-pink rounded-full blur-3xl opacity-20"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ top: '-10%', left: '-10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-neon-cyan rounded-full blur-3xl opacity-20"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ bottom: '-10%', right: '-10%' }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col px-4 sm:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="flex items-center justify-between mb-8" variants={itemVariants}>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setLocation('/dashboard')}
              className="p-2 hover:bg-neon-cyan/10 rounded-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-6 h-6 text-neon-cyan" />
            </motion.button>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
                TEAMS
              </h1>
              <p className="text-gray-400 text-sm">Build and manage your Axolotl teams</p>
            </div>
          </div>
          <Trophy className="w-8 h-8 text-neon-cyan" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
          {/* Team Composition */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="p-8 rounded-lg border border-neon-cyan/30 bg-black/40">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-neon-cyan" />
                <h2 className="text-2xl font-bold text-neon-cyan">
                  Team Composition ({team.length}/{MAX_TEAM_SIZE})
                </h2>
              </div>

              <input
                type="text"
                value={selectedTeamName}
                onChange={(e) => setSelectedTeamName(e.target.value)}
                className="w-full px-4 py-2 mb-6 rounded-lg bg-black/60 border border-neon-cyan/30 text-neon-cyan placeholder-gray-500 focus:outline-none focus:border-neon-pink"
                placeholder="Team name"
              />

              {/* Team Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[...Array(MAX_TEAM_SIZE)].map((_, idx) => {
                  const pet = team[idx];
                  return (
                    <motion.div
                      key={idx}
                      className="relative p-6 rounded-lg border-2 border-neon-cyan/30 bg-black/60 hover:border-neon-pink/50 transition-all"
                      whileHover={{ y: -5 }}
                    >
                      {pet ? (
                        <>
                          <motion.button
                            onClick={() => removeFromTeam(pet.id)}
                            className="absolute top-2 right-2 p-1 bg-red-500/20 hover:bg-red-500/40 rounded transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <X className="w-4 h-4 text-red-400" />
                          </motion.button>
                          <div className="text-5xl mb-3 text-center">{pet.image}</div>
                          <h3 className="font-bold text-neon-cyan text-center mb-2">{pet.name}</h3>
                          <div className="text-xs text-gray-400 text-center space-y-1">
                            <p>Lvl {pet.level} • {pet.morphStage}</p>
                            <p className="text-neon-pink">{pet.rarity}</p>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-32 text-gray-500">
                          <Plus className="w-8 h-8" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Team Stats */}
              {team.length > 0 && (
                <motion.div
                  className="p-6 rounded-lg bg-gradient-to-r from-neon-cyan/10 to-neon-pink/10 border border-neon-cyan/20"
                  variants={itemVariants}
                >
                  <h3 className="text-lg font-bold text-neon-cyan mb-4">Team Average Stats</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: 'HP', value: teamStats.hp, color: 'text-red-400' },
                      { label: 'ATK', value: teamStats.attack, color: 'text-orange-400' },
                      { label: 'DEF', value: teamStats.defense, color: 'text-blue-400' },
                      { label: 'SPD', value: teamStats.speed, color: 'text-yellow-400' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Save Button */}
              <motion.button
                className="w-full mt-6 px-6 py-3 font-bold text-lg text-white bg-gradient-to-r from-neon-pink to-neon-cyan rounded-lg hover:shadow-lg hover:shadow-neon-pink/50 transition-all disabled:opacity-50"
                disabled={team.length === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Team
              </motion.button>
            </div>
          </motion.div>

          {/* Available Pets */}
          <motion.div variants={itemVariants}>
            <div className="p-8 rounded-lg border border-neon-cyan/30 bg-black/40 sticky top-8">
              <h2 className="text-xl font-bold text-neon-cyan mb-6">Available Pets</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {availablePets.map((pet) => (
                  <motion.button
                    key={pet.id}
                    onClick={() => addToTeam(pet)}
                    className="w-full p-4 rounded-lg border border-neon-cyan/30 bg-black/60 hover:border-neon-pink/50 hover:bg-black/80 transition-all text-left"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{pet.image}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-neon-cyan text-sm truncate">{pet.name}</p>
                        <p className="text-xs text-gray-400">Lvl {pet.level} • {pet.morphStage}</p>
                        <p className="text-xs text-neon-pink">{pet.rarity}</p>
                      </div>
                      <Plus className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
