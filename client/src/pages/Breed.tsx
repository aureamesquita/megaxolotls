import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, Heart, Zap } from 'lucide-react';
import { useBreedingLogic, type AxolotlGenotype, type OffspringResult } from '@/hooks/useBreedingLogic';

/**
 * Mock Axolotls com genótipo completo
 */
const MOCK_AXOLOTLS: AxolotlGenotype[] = [
  {
    id: 'axolotl-1',
    name: 'Pinky',
    level: 25,
    morphStage: 1,
    traits: {
      color: 'pink',
      pattern: 'solid',
      size: 'large',
      ability: 'regeneration',
      rarity: 'uncommon',
    },
    genes: {
      color: ['pink', 'pink'],
      pattern: ['solid', 'spotted'],
      size: ['large', 'medium'],
      ability: ['regeneration', 'poison'],
    },
    breedingCooldown: 0,
  },
  {
    id: 'axolotl-2',
    name: 'Goldie',
    level: 22,
    morphStage: 1,
    traits: {
      color: 'gold',
      pattern: 'spotted',
      size: 'medium',
      ability: 'poison',
      rarity: 'rare',
    },
    genes: {
      color: ['gold', 'white'],
      pattern: ['spotted', 'marble'],
      size: ['medium', 'small'],
      ability: ['poison', 'strength'],
    },
    breedingCooldown: 0,
  },
  {
    id: 'axolotl-3',
    name: 'Marble',
    level: 30,
    morphStage: 2,
    traits: {
      color: 'white',
      pattern: 'marble',
      size: 'large',
      ability: 'speed',
      rarity: 'epic',
    },
    genes: {
      color: ['white', 'white'],
      pattern: ['marble', 'striped'],
      size: ['large', 'large'],
      ability: ['speed', 'regeneration'],
    },
    breedingCooldown: 0,
  },
];

const TRAIT_EMOJIS = {
  color: {
    pink: '🩷',
    white: '⚪',
    gold: '🟡',
    black: '⚫',
    melanoid: '🖤',
  },
  pattern: {
    solid: '▪️',
    spotted: '🔘',
    striped: '▬',
    marble: '🎨',
  },
  size: {
    small: '🐜',
    medium: '🦎',
    large: '🐉',
  },
  ability: {
    regeneration: '✨',
    poison: '☠️',
    speed: '⚡',
    strength: '💪',
  },
};

/**
 * Breed Screen - Cruzar Axolotls para gerar offspring
 */
export default function Breed() {
  const [, setLocation] = useLocation();
  const [parentA, setParentA] = useState<AxolotlGenotype | null>(null);
  const [parentB, setParentB] = useState<AxolotlGenotype | null>(null);
  const [offspring, setOffspring] = useState<OffspringResult | null>(null);
  const [isBreeding, setIsBreeding] = useState(false);

  const { breedingCost, canBreed, calculateCompatibility, breedAxolotls, calculateBreedingCooldown } =
    useBreedingLogic();

  const handleBreed = () => {
    if (!parentA || !parentB) return;

    const canBreedResult = canBreed(parentA, parentB, Date.now());
    if (!canBreedResult) {
      alert('Cannot breed these Axolotls. Check level and cooldown.');
      return;
    }

    setIsBreeding(true);

    // Simulate breeding animation
    setTimeout(() => {
      const newOffspring = breedAxolotls(parentA, parentB);
      if (newOffspring) {
        setOffspring(newOffspring);
      }
      setIsBreeding(false);
    }, 2000);
  };

  const handleConfirmOffspring = () => {
    if (!offspring) return;

    // Save offspring to localStorage
    const savedOffspring = localStorage.getItem('bred_axolotls');
    const offspringList = savedOffspring ? JSON.parse(savedOffspring) : [];
    offspringList.push(offspring);
    localStorage.setItem('bred_axolotls', JSON.stringify(offspringList));

    alert(`🎉 ${offspring.name} hatched successfully!`);
    setOffspring(null);
    setParentA(null);
    setParentB(null);
  };

  const compatibility = parentA && parentB ? calculateCompatibility(parentA, parentB) : 0;
  const canBreedNow = parentA && parentB && canBreed(parentA, parentB, Date.now());

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
          <Heart className="w-5 h-5" />
          BREED
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
        {/* Breeding Setup */}
        {!offspring && (
          <>
            {/* Parent Selection */}
            <motion.div className="max-w-4xl mx-auto w-full" variants={itemVariants}>
              <h2 className="text-sm font-bold text-neon-cyan mb-4">Select Parents</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Parent A */}
                <div className="space-y-3">
                  <p className="text-xs text-gray-400">Parent A</p>
                  <div className="space-y-2">
                    {MOCK_AXOLOTLS.map((axolotl) => (
                      <motion.button
                        key={axolotl.id}
                        onClick={() => setParentA(axolotl)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          parentA?.id === axolotl.id
                            ? 'border-neon-cyan bg-neon-cyan/10'
                            : 'border-neon-cyan/30 bg-black/40 hover:border-neon-cyan/60'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-white">{axolotl.name}</h3>
                            <p className="text-xs text-gray-400">Lvl {axolotl.level}</p>
                          </div>
                          <div className="text-2xl">🦎</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Parent B */}
                <div className="space-y-3">
                  <p className="text-xs text-gray-400">Parent B</p>
                  <div className="space-y-2">
                    {MOCK_AXOLOTLS.map((axolotl) => (
                      <motion.button
                        key={axolotl.id}
                        onClick={() => setParentB(axolotl)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          parentB?.id === axolotl.id
                            ? 'border-neon-green bg-neon-green/10'
                            : 'border-neon-cyan/30 bg-black/40 hover:border-neon-cyan/60'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-white">{axolotl.name}</h3>
                            <p className="text-xs text-gray-400">Lvl {axolotl.level}</p>
                          </div>
                          <div className="text-2xl">🦎</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Compatibility & Traits Preview */}
            {parentA && parentB && (
              <motion.div className="max-w-4xl mx-auto w-full space-y-4" variants={itemVariants}>
                {/* Compatibility */}
                <div className="p-4 rounded-lg bg-black/40 border border-neon-cyan/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-neon-cyan">Compatibility</p>
                    <p className="text-sm font-bold text-white">{compatibility}%</p>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-green"
                      initial={{ width: 0 }}
                      animate={{ width: `${compatibility}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Traits Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Parent A Traits */}
                  <div className="p-4 rounded-lg bg-black/40 border border-neon-cyan/30">
                    <p className="text-xs font-bold text-neon-cyan mb-3">{parentA.name}'s Traits</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span>{TRAIT_EMOJIS.color[parentA.traits.color]}</span>
                        <span className="text-gray-400">Color:</span>
                        <span className="text-white capitalize">{parentA.traits.color}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{TRAIT_EMOJIS.pattern[parentA.traits.pattern]}</span>
                        <span className="text-gray-400">Pattern:</span>
                        <span className="text-white capitalize">{parentA.traits.pattern}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{TRAIT_EMOJIS.size[parentA.traits.size]}</span>
                        <span className="text-gray-400">Size:</span>
                        <span className="text-white capitalize">{parentA.traits.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{TRAIT_EMOJIS.ability[parentA.traits.ability]}</span>
                        <span className="text-gray-400">Ability:</span>
                        <span className="text-white capitalize">{parentA.traits.ability}</span>
                      </div>
                    </div>
                  </div>

                  {/* Parent B Traits */}
                  <div className="p-4 rounded-lg bg-black/40 border border-neon-green/30">
                    <p className="text-xs font-bold text-neon-green mb-3">{parentB.name}'s Traits</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span>{TRAIT_EMOJIS.color[parentB.traits.color]}</span>
                        <span className="text-gray-400">Color:</span>
                        <span className="text-white capitalize">{parentB.traits.color}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{TRAIT_EMOJIS.pattern[parentB.traits.pattern]}</span>
                        <span className="text-gray-400">Pattern:</span>
                        <span className="text-white capitalize">{parentB.traits.pattern}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{TRAIT_EMOJIS.size[parentB.traits.size]}</span>
                        <span className="text-gray-400">Size:</span>
                        <span className="text-white capitalize">{parentB.traits.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{TRAIT_EMOJIS.ability[parentB.traits.ability]}</span>
                        <span className="text-gray-400">Ability:</span>
                        <span className="text-white capitalize">{parentB.traits.ability}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Breed Button */}
                <motion.button
                  onClick={handleBreed}
                  disabled={!canBreedNow || isBreeding}
                  className={`w-full p-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                    canBreedNow && !isBreeding
                      ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-black hover:shadow-lg hover:shadow-neon-cyan/50'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={canBreedNow && !isBreeding ? { scale: 1.02 } : {}}
                  whileTap={canBreedNow && !isBreeding ? { scale: 0.98 } : {}}
                >
                  {isBreeding ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                        <Zap className="w-5 h-5" />
                      </motion.div>
                      Breeding in progress...
                    </>
                  ) : canBreedNow ? (
                    <>
                      <Heart className="w-5 h-5" />
                      Breed ({breedingCost} LIP)
                    </>
                  ) : (
                    'Cannot breed'
                  )}
                </motion.button>
              </motion.div>
            )}
          </>
        )}

        {/* Offspring Result */}
        {offspring && (
          <motion.div
            className="max-w-2xl mx-auto w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            variants={itemVariants}
          >
            <div className="p-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-neon-cyan text-center">
              <motion.div
                className="text-7xl mb-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🥚
              </motion.div>

              <h2 className="text-3xl font-bold text-white mb-2">Egg Hatched!</h2>
              <p className="text-lg text-white/90 mb-6">{offspring.name} was born</p>

              {/* Offspring Traits */}
              <div className="bg-black/40 rounded-lg p-4 mb-6 text-left space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Color</p>
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      {TRAIT_EMOJIS.color[offspring.traits.color]}
                      {offspring.traits.color}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Pattern</p>
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      {TRAIT_EMOJIS.pattern[offspring.traits.pattern]}
                      {offspring.traits.pattern}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Size</p>
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      {TRAIT_EMOJIS.size[offspring.traits.size]}
                      {offspring.traits.size}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Ability</p>
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      {TRAIT_EMOJIS.ability[offspring.traits.ability]}
                      {offspring.traits.ability}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-600">
                  <p className="text-xs text-gray-400 mb-1">Rarity</p>
                  <p className="text-sm font-bold text-white capitalize">{offspring.rarity}</p>
                </div>
              </div>

              {/* Confirm Button */}
              <motion.button
                onClick={handleConfirmOffspring}
                className="w-full p-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-green text-black font-bold hover:shadow-lg hover:shadow-neon-cyan/50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Collection
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Info */}
        <motion.div className="max-w-2xl mx-auto w-full" variants={itemVariants}>
          <div className="p-4 rounded-lg border border-dashed border-neon-cyan/30 bg-black/20 text-center text-xs text-gray-400">
            <p>💡 Offspring inherit traits from both parents. Higher compatibility = better stats!</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
