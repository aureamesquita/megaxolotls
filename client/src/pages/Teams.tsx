import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, Plus, X, Trophy, Users, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'Common':
      return 'from-gray-600 to-gray-700';
    case 'Uncommon':
      return 'from-green-600 to-green-700';
    case 'Rare':
      return 'from-blue-600 to-blue-700';
    case 'Epic':
      return 'from-purple-600 to-purple-700';
    case 'Legendary':
      return 'from-yellow-600 to-yellow-700';
    default:
      return 'from-gray-600 to-gray-700';
  }
};

/**
 * Teams Screen - Build and manage teams (PetTeams contract integration)
 */
export default function Teams() {
  const [, setLocation] = useLocation();
  const [team, setTeam] = useState<typeof MOCK_PETS>([]);
  const [selectedTeamName, setSelectedTeamName] = useState('My Team');
  const [isSaving, setIsSaving] = useState(false);

  const addToTeam = (pet: (typeof MOCK_PETS)[0]) => {
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

  const saveTeam = async () => {
    if (team.length === 0) {
      alert('Team must have at least 1 pet');
      return;
    }

    setIsSaving(true);
    try {
      // Mock contract call - would call PetTeams.createTeam() in production
      console.log('Saving team:', {
        name: selectedTeamName,
        petIds: team.map((p) => p.id),
      });

      // Simulate contract interaction
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(`Team "${selectedTeamName}" saved successfully!`);
    } catch (error) {
      console.error('Error saving team:', error);
      alert('Failed to save team');
    } finally {
      setIsSaving(false);
    }
  };

  const availablePets = MOCK_PETS.filter((p) => !team.find((t) => t.id === p.id));
  const teamStats = calculateTeamStats();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 flex flex-col">
      {/* Top bar */}
      <motion.div
        className="flex items-center justify-between px-4 py-3 border-b border-neon-cyan/20 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.button
          onClick={() => setLocation('/dashboard')}
          className="p-2 hover:bg-neon-cyan/10 rounded-lg transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 text-neon-cyan" />
        </motion.button>
        <h1 className="text-lg font-bold text-neon-cyan flex items-center gap-2">
          <Users className="w-5 h-5" />
          TEAMS
        </h1>
        <div className="w-9" />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="flex-1 flex flex-col gap-6 px-4 py-6 overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Team name input */}
        <motion.div className="max-w-2xl mx-auto w-full" variants={itemVariants}>
          <label className="block text-sm font-bold text-neon-cyan mb-2">Team Name</label>
          <input
            type="text"
            value={selectedTeamName}
            onChange={(e) => setSelectedTeamName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-neon-cyan/30 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-all"
            placeholder="Enter team name..."
          />
        </motion.div>

        {/* Team composition */}
        <motion.div className="max-w-2xl mx-auto w-full" variants={itemVariants}>
          <h2 className="text-sm font-bold text-neon-cyan mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Your Team ({team.length}/{MAX_TEAM_SIZE})
          </h2>

          {team.length === 0 ? (
            <div className="p-6 rounded-lg border-2 border-dashed border-neon-cyan/30 text-center">
              <p className="text-gray-400 text-sm">Select pets to build your team</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {team.map((pet) => (
                <motion.div
                  key={pet.id}
                  className={`relative p-4 rounded-lg bg-gradient-to-br ${getRarityColor(pet.rarity)} border border-white/20`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-2xl mb-1">{pet.image}</div>
                      <h3 className="font-bold text-white text-sm">{pet.name}</h3>
                      <p className="text-xs text-white/80">
                        Lv. {pet.level} • {pet.morphStage}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => removeFromTeam(pet.id)}
                      className="p-1 hover:bg-red-500/20 rounded transition-all"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4 text-red-400" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Team stats */}
          {team.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-lg bg-black/40 border border-neon-cyan/20">
              <div className="text-center">
                <p className="text-xs text-gray-400">HP</p>
                <p className="text-lg font-bold text-red-400">{teamStats.hp}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">ATK</p>
                <p className="text-lg font-bold text-orange-400">{teamStats.attack}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">DEF</p>
                <p className="text-lg font-bold text-blue-400">{teamStats.defense}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">SPD</p>
                <p className="text-lg font-bold text-yellow-400">{teamStats.speed}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Available pets */}
        <motion.div className="max-w-2xl mx-auto w-full" variants={itemVariants}>
          <h2 className="text-sm font-bold text-neon-cyan mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Available Pets ({availablePets.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availablePets.map((pet) => (
              <motion.button
                key={pet.id}
                onClick={() => addToTeam(pet)}
                className={`p-4 rounded-lg bg-gradient-to-br ${getRarityColor(pet.rarity)} border border-white/20 hover:border-white/40 transition-all text-left`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-2xl mb-1">{pet.image}</div>
                    <h3 className="font-bold text-white text-sm">{pet.name}</h3>
                    <p className="text-xs text-white/80">
                      Lv. {pet.level} • {pet.morphStage}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white/60">{pet.rarity}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Save button */}
        <motion.div className="max-w-2xl mx-auto w-full" variants={itemVariants}>
          <Button
            onClick={saveTeam}
            disabled={team.length === 0 || isSaving}
            className="w-full bg-gradient-to-r from-neon-cyan to-neon-green text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-neon-cyan/50 transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                ⚙️
              </motion.div>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2 inline" />
                Save Team to Contract
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
