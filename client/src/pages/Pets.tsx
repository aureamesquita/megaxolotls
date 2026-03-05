import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ChevronLeft, Filter, SortAsc, Zap, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Pet {
  id: string;
  name: string;
  species: 'Axolotl' | 'Future1' | 'Future2' | 'Future3';
  level: number;
  experience: number;
  hp: number;
  maxHp: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  morphStage: 'Axolol' | 'Axolump' | 'Axoloot';
  image: string;
  stats: {
    attack: number;
    defense: number;
    speed: number;
    spAtk: number;
    spDef: number;
  };
}

// Mock data
const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Sparkle',
    species: 'Axolotl',
    level: 5,
    experience: 250,
    hp: 100,
    maxHp: 100,
    rarity: 'rare',
    morphStage: 'Axolol',
    image: 'https://bi.fbcd.co/posts/axolotl-drawing-final-result-63bdad49f098a088673675.jpg',
    stats: { attack: 45, defense: 50, speed: 48, spAtk: 52, spDef: 50 },
  },
  {
    id: '2',
    name: 'Blaze',
    species: 'Axolotl',
    level: 8,
    experience: 450,
    hp: 120,
    maxHp: 120,
    rarity: 'epic',
    morphStage: 'Axolump',
    image: 'https://www.emilydrawing.com/wp-content/uploads/2024/09/How-To-Draw-an-Axolotl-Steps-10.jpg',
    stats: { attack: 65, defense: 60, speed: 55, spAtk: 70, spDef: 65 },
  },
  {
    id: '3',
    name: 'Aqua',
    species: 'Axolotl',
    level: 3,
    experience: 100,
    hp: 80,
    maxHp: 80,
    rarity: 'common',
    morphStage: 'Axolol',
    image: 'https://bi.fbcd.co/posts/axolotl-drawing-final-result-63bdad49f098a088673675.jpg',
    stats: { attack: 40, defense: 42, speed: 45, spAtk: 48, spDef: 45 },
  },
  {
    id: '4',
    name: 'Nova',
    species: 'Axolotl',
    level: 12,
    experience: 800,
    hp: 150,
    maxHp: 150,
    rarity: 'legendary',
    morphStage: 'Axoloot',
    image: 'https://www.emilydrawing.com/wp-content/uploads/2024/09/How-To-Draw-an-Axolotl-Steps-10.jpg',
    stats: { attack: 85, defense: 80, speed: 75, spAtk: 90, spDef: 85 },
  },
];

const rarityColors: Record<Pet['rarity'], string> = {
  common: 'from-gray-400 to-gray-500',
  uncommon: 'from-green-400 to-emerald-500',
  rare: 'from-blue-400 to-cyan-500',
  epic: 'from-purple-400 to-pink-500',
  legendary: 'from-yellow-400 to-orange-500',
};

const rarityBgColors: Record<Pet['rarity'], string> = {
  common: 'border-gray-400/50 bg-gray-400/10',
  uncommon: 'border-green-400/50 bg-green-400/10',
  rare: 'border-blue-400/50 bg-blue-400/10',
  epic: 'border-purple-400/50 bg-purple-400/10',
  legendary: 'border-yellow-400/50 bg-yellow-400/10',
};

export default function Pets() {
  const [, setLocation] = useLocation();
  const [selectedRarity, setSelectedRarity] = useState<Pet['rarity'] | 'all'>('all');
  const [selectedSpecies, setSelectedSpecies] = useState<Pet['species'] | 'all'>('all');
  const [sortBy, setSortBy] = useState<'level' | 'rarity' | 'newest'>('level');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const filteredAndSortedPets = useMemo(() => {
    let filtered = mockPets.filter(pet => {
      if (selectedRarity !== 'all' && pet.rarity !== selectedRarity) return false;
      if (selectedSpecies !== 'all' && pet.species !== selectedSpecies) return false;
      return true;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'level') return b.level - a.level;
      if (sortBy === 'rarity') {
        const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      }
      return 0; // newest (default order)
    });

    return filtered;
  }, [selectedRarity, selectedSpecies, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Header */}
      <motion.div
        className="relative z-20 border-b border-neon-cyan/20 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setLocation('/dashboard')}
              className="p-2 hover:bg-neon-cyan/10 rounded-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-neon-cyan" />
            </motion.button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
              MY PETS
            </h1>
          </div>
          <div className="text-sm text-gray-400">
            {filteredAndSortedPets.length} Axolotls
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Filters */}
        <motion.div className="mb-8 p-6 rounded-lg border border-neon-cyan/30 bg-black/40" variants={itemVariants}>
          <div className="flex flex-col gap-6">
            {/* Rarity Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-neon-pink" />
                <label className="text-sm font-bold text-gray-300">Rarity</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['all', 'common', 'uncommon', 'rare', 'epic', 'legendary'] as const).map(rarity => (
                  <button
                    key={rarity}
                    onClick={() => setSelectedRarity(rarity)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      selectedRarity === rarity
                        ? 'bg-neon-cyan text-black'
                        : 'bg-black/40 border border-neon-cyan/30 text-gray-300 hover:border-neon-cyan/50'
                    }`}
                  >
                    {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Species Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-neon-cyan" />
                <label className="text-sm font-bold text-gray-300">Species</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['all', 'Axolotl', 'Future1', 'Future2', 'Future3'] as const).map(species => (
                  <button
                    key={species}
                    onClick={() => setSelectedSpecies(species)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      selectedSpecies === species
                        ? 'bg-neon-pink text-black'
                        : 'bg-black/40 border border-neon-pink/30 text-gray-300 hover:border-neon-pink/50'
                    }`}
                  >
                    {species === 'all' ? 'All' : species}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <SortAsc className="w-4 h-4 text-neon-green" />
                <label className="text-sm font-bold text-gray-300">Sort By</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['level', 'rarity', 'newest'] as const).map(sort => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      sortBy === sort
                        ? 'bg-neon-green text-black'
                        : 'bg-black/40 border border-neon-green/30 text-gray-300 hover:border-neon-green/50'
                    }`}
                  >
                    {sort.charAt(0).toUpperCase() + sort.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pets Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
          {filteredAndSortedPets.map(pet => (
            <motion.div
              key={pet.id}
              onClick={() => setSelectedPet(pet)}
              className={`relative p-6 rounded-lg border-2 transition-all cursor-pointer group overflow-hidden ${rarityBgColors[pet.rarity]}`}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[pet.rarity]} opacity-0 group-hover:opacity-10 transition-opacity`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Image */}
                <div className="mb-4 h-40 rounded-lg overflow-hidden bg-black/40 border border-neon-cyan/20">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Name & Level */}
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-neon-cyan">{pet.name}</h3>
                  <p className="text-sm text-gray-400">Lv. {pet.level} • {pet.morphStage}</p>
                </div>

                {/* Stats */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">HP</span>
                    <div className="flex-1 mx-2 h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-red-400"
                        style={{ width: `${(pet.hp / pet.maxHp) * 100}%` }}
                      />
                    </div>
                    <span className="text-red-400 font-bold">{pet.hp}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">XP</span>
                    <div className="flex-1 mx-2 h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-neon-cyan to-neon-green"
                        style={{ width: `${(pet.experience / 1000) * 100}%` }}
                      />
                    </div>
                    <span className="text-neon-cyan font-bold">{pet.experience}</span>
                  </div>
                </div>

                {/* Rarity Badge */}
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 bg-gradient-to-r ${rarityColors[pet.rarity]} text-white`}>
                  {pet.rarity.toUpperCase()}
                </div>

                {/* Battle Button */}
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    setLocation(`/battle-demo?petId=${pet.id}`);
                  }}
                  className="w-full bg-gradient-to-r from-neon-pink to-neon-cyan text-black font-bold hover:shadow-lg hover:shadow-neon-pink/50 transition-all"
                >
                  BATTLE
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Pet Detail Modal */}
      {selectedPet && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedPet(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-slate-900 to-purple-900 border-2 border-neon-cyan/50 rounded-lg p-8 max-w-md w-full mx-4"
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="mb-6 h-64 rounded-lg overflow-hidden">
              <img src={selectedPet.image} alt={selectedPet.name} className="w-full h-full object-cover" />
            </div>

            <h2 className="text-2xl font-bold text-neon-cyan mb-2">{selectedPet.name}</h2>
            <p className="text-gray-400 mb-4">
              {selectedPet.species} • Lv. {selectedPet.level} • {selectedPet.morphStage}
            </p>

            {/* Detailed Stats */}
            <div className="mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Attack</span>
                <div className="flex-1 mx-3 h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${(selectedPet.stats.attack / 100) * 100}%` }} />
                </div>
                <span className="text-red-400 font-bold">{selectedPet.stats.attack}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Defense</span>
                <div className="flex-1 mx-3 h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${(selectedPet.stats.defense / 100) * 100}%` }} />
                </div>
                <span className="text-blue-400 font-bold">{selectedPet.stats.defense}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Speed</span>
                <div className="flex-1 mx-3 h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: `${(selectedPet.stats.speed / 100) * 100}%` }} />
                </div>
                <span className="text-yellow-400 font-bold">{selectedPet.stats.speed}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Sp. Atk</span>
                <div className="flex-1 mx-3 h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${(selectedPet.stats.spAtk / 100) * 100}%` }} />
                </div>
                <span className="text-purple-400 font-bold">{selectedPet.stats.spAtk}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Sp. Def</span>
                <div className="flex-1 mx-3 h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${(selectedPet.stats.spDef / 100) * 100}%` }} />
                </div>
                <span className="text-green-400 font-bold">{selectedPet.stats.spDef}</span>
              </div>
            </div>

            <Button
              onClick={() => setLocation(`/battle-demo?petId=${selectedPet.id}`)}
              className="w-full bg-gradient-to-r from-neon-pink to-neon-cyan text-black font-bold hover:shadow-lg hover:shadow-neon-pink/50 transition-all"
            >
              START BATTLE
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
