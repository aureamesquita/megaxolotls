import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, Coins, Trash2, Package } from 'lucide-react';

interface BagItem {
  id: string;
  name: string;
  emoji: string;
  quantity: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  description: string;
  source?: 'petitems' | 'consumable';
}

const MOCK_ITEMS: BagItem[] = [
  {
    id: 'lip-token',
    name: 'LIP Token',
    emoji: '💰',
    quantity: 1250,
    rarity: 'legendary',
    description: 'In-game currency for purchases',
    source: 'consumable',
  },
  {
    id: 'potion-hp',
    name: 'HP Potion',
    emoji: '🧪',
    quantity: 5,
    rarity: 'common',
    description: 'Restores 30 HP',
    source: 'petitems',
  },
  {
    id: 'potion-energy',
    name: 'Energy Drink',
    emoji: '⚡',
    quantity: 3,
    rarity: 'uncommon',
    description: 'Restores 50 Energy',
    source: 'petitems',
  },
  {
    id: 'rare-candy',
    name: 'Rare Candy',
    emoji: '🍬',
    quantity: 1,
    rarity: 'rare',
    description: 'Grants 1 Level',
    source: 'petitems',
  },
  {
    id: 'evolution-stone',
    name: 'Evolution Stone',
    emoji: '💎',
    quantity: 0,
    rarity: 'epic',
    description: 'Triggers evolution',
    source: 'petitems',
  },
];

const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'common':
      return 'from-gray-500 to-gray-600';
    case 'uncommon':
      return 'from-green-500 to-green-600';
    case 'rare':
      return 'from-blue-500 to-blue-600';
    case 'epic':
      return 'from-purple-500 to-purple-600';
    case 'legendary':
      return 'from-yellow-500 to-orange-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

const getRarityBorder = (rarity: string): string => {
  switch (rarity) {
    case 'common':
      return 'border-gray-500';
    case 'uncommon':
      return 'border-green-500';
    case 'rare':
      return 'border-blue-500';
    case 'epic':
      return 'border-purple-500';
    case 'legendary':
      return 'border-yellow-500';
    default:
      return 'border-gray-500';
  }
};

/**
 * Bag Screen - Inventory management with LIP tokens and PetItems
 */
export default function Bag() {
  const [, setLocation] = useLocation();
  const [selectedItem, setSelectedItem] = useState<BagItem | null>(null);

  // Separate LIP token from other items
  const lipToken = MOCK_ITEMS.find((item) => item.id === 'lip-token');
  const otherItems = MOCK_ITEMS.filter((item) => item.id !== 'lip-token');
  const petItems = otherItems.filter((item) => item.source === 'petitems');

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
          <Package className="w-5 h-5" />
          BAG
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
        {/* LIP Token Badge */}
        {lipToken && (
          <motion.div className="max-w-2xl mx-auto w-full" variants={itemVariants}>
            <div className={`p-6 rounded-lg bg-gradient-to-br ${getRarityColor(lipToken.rarity)} border-2 ${getRarityBorder(lipToken.rarity)} relative overflow-hidden`}>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{lipToken.emoji}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{lipToken.name}</h2>
                    <p className="text-sm text-white/80">{lipToken.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-white">{lipToken.quantity.toLocaleString()}</p>
                  <p className="text-xs text-white/60">Available</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PetItems Section */}
        <motion.div className="max-w-2xl mx-auto w-full" variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-neon-cyan flex items-center gap-2">
              <Coins className="w-4 h-4" />
              PetItems ({petItems.length})
            </h2>
            <p className="text-xs text-gray-400">From PetItems Dex</p>
          </div>

          {petItems.length === 0 ? (
            <div className="p-6 rounded-lg border-2 border-dashed border-neon-cyan/30 text-center">
              <p className="text-gray-400 text-sm">No items yet. Earn items by battling and caring for your pets!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {petItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`relative p-4 rounded-lg bg-gradient-to-br ${getRarityColor(item.rarity)} border-2 ${getRarityBorder(item.rarity)} hover:shadow-lg hover:shadow-${item.rarity}-500/50 transition-all text-left group ${item.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={item.quantity > 0 ? { scale: 1.02 } : {}}
                  whileTap={item.quantity > 0 ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-3xl mb-1">{item.emoji}</div>
                      <h3 className="font-bold text-white text-sm">{item.name}</h3>
                      <p className="text-xs text-white/80 mt-1">{item.description}</p>
                    </div>
                    <div className="text-right">
                      {item.quantity > 0 && (
                        <motion.div
                          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 border border-white/40"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <span className="text-xs font-bold text-white">{item.quantity}</span>
                        </motion.div>
                      )}
                      {item.quantity === 0 && (
                        <p className="text-xs font-bold text-white/60">OUT</p>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Item Details Panel */}
        {selectedItem && (
          <motion.div
            className="max-w-2xl mx-auto w-full p-6 rounded-lg bg-black/60 border border-neon-cyan/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-neon-cyan">{selectedItem.name}</h3>
              <motion.button
                onClick={() => setSelectedItem(null)}
                className="p-1 hover:bg-red-500/20 rounded transition-all"
                whileHover={{ scale: 1.2 }}
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </motion.button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 mb-1">Description</p>
                <p className="text-sm text-white">{selectedItem.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Rarity</p>
                  <p className="text-sm font-bold text-white capitalize">{selectedItem.rarity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Quantity</p>
                  <p className="text-sm font-bold text-white">{selectedItem.quantity}</p>
                </div>
              </div>

              {selectedItem.quantity > 0 && (
                <motion.button
                  className="w-full mt-4 p-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-green text-black font-bold hover:shadow-lg hover:shadow-neon-cyan/50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Use Item
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* PetItems Dex Placeholder */}
        <motion.div className="max-w-2xl mx-auto w-full" variants={itemVariants}>
          <div className="p-6 rounded-lg border-2 border-dashed border-neon-cyan/30 text-center bg-black/20">
            <p className="text-sm font-bold text-neon-cyan mb-2">📚 PetItems Dex</p>
            <p className="text-xs text-gray-400">
              Registry of all available items from PetItemsDex contract. Items are managed by the Dex and tracked via PetItems ERC-1155 semi-fungible tokens.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
