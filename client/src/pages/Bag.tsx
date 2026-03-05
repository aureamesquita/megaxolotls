import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, Coins, Trash2 } from 'lucide-react';

interface BagItem {
  id: string;
  name: string;
  emoji: string;
  quantity: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  description: string;
}

const MOCK_ITEMS: BagItem[] = [
  {
    id: 'potion-hp',
    name: 'HP Potion',
    emoji: '🧪',
    quantity: 5,
    rarity: 'common',
    description: 'Restores 30 HP',
  },
  {
    id: 'potion-energy',
    name: 'Energy Drink',
    emoji: '⚡',
    quantity: 3,
    rarity: 'uncommon',
    description: 'Restores 50 Energy',
  },
  {
    id: 'rare-candy',
    name: 'Rare Candy',
    emoji: '🍬',
    quantity: 1,
    rarity: 'rare',
    description: 'Grants 1 Level',
  },
  {
    id: 'evolution-stone',
    name: 'Evolution Stone',
    emoji: '💎',
    quantity: 0,
    rarity: 'epic',
    description: 'Triggers evolution',
  },
  {
    id: 'legendary-egg',
    name: 'Legendary Egg',
    emoji: '🥚',
    quantity: 0,
    rarity: 'legendary',
    description: 'Summons a legendary pet',
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
 * Bag Screen - Item inventory (app mobile style)
 */
export default function Bag() {
  const [, navigate] = useLocation();
  const [lipBalance] = useState(1250); // Mock LIP balance
  const [items, setItems] = useState<BagItem[]>(MOCK_ITEMS);
  const [selectedItem, setSelectedItem] = useState<BagItem | null>(null);

  const useItem = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 flex flex-col">
      {/* Top bar */}
      <motion.div
        className="flex items-center justify-between px-4 py-3 border-b border-neon-cyan/20 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.button
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-neon-cyan/10 rounded-lg transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 text-neon-cyan" />
        </motion.button>
        <h1 className="text-lg font-bold text-neon-cyan">BAG</h1>
        <div className="w-9" />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="flex-1 flex flex-col px-4 py-6 overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LIP Token Card */}
        <motion.div
          className="mb-6 p-4 rounded-lg bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border-2 border-yellow-500/50"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Coins className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">LIP Balance</p>
                <p className="text-2xl font-bold text-yellow-400">{lipBalance}</p>
              </div>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </motion.div>

        {/* Items count */}
        <motion.div className="mb-4 text-sm text-gray-400" variants={itemVariants}>
          <p>
            Items: <span className="text-neon-cyan font-bold">{totalItems}</span> / 20
          </p>
        </motion.div>

        {/* Items grid */}
        <motion.div className="grid grid-cols-2 gap-3" variants={containerVariants}>
          {items.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedItem?.id === item.id
                  ? `border-neon-cyan bg-black/60 shadow-lg shadow-neon-cyan/50`
                  : `${getRarityBorder(item.rarity)} bg-black/40 hover:bg-black/60`
              } ${item.quantity === 0 ? 'opacity-50' : ''}`}
              variants={itemVariants}
              whileHover={item.quantity > 0 ? { scale: 1.05 } : {}}
              whileTap={item.quantity > 0 ? { scale: 0.95 } : {}}
              disabled={item.quantity === 0}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">{item.emoji}</div>
                <p className="text-xs font-bold text-gray-300 truncate">{item.name}</p>
                <p className="text-sm font-bold text-neon-cyan mt-1">×{item.quantity}</p>
                <div
                  className={`mt-2 inline-block px-2 py-0.5 rounded text-xs font-bold bg-gradient-to-r ${getRarityColor(
                    item.rarity
                  )} text-white`}
                >
                  {item.rarity}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Item details panel */}
        {selectedItem && (
          <motion.div
            className="mt-6 p-4 rounded-lg bg-black/60 border border-neon-cyan/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-neon-cyan">{selectedItem.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{selectedItem.description}</p>
              </div>
              <div className="text-4xl">{selectedItem.emoji}</div>
            </div>

            {/* Use button */}
            {selectedItem.quantity > 0 && (
              <motion.button
                onClick={() => {
                  useItem(selectedItem.id);
                  setSelectedItem(null);
                }}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-blue-500 hover:from-neon-cyan hover:to-blue-600 text-white font-bold transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Use Item
              </motion.button>
            )}

            {selectedItem.quantity === 0 && (
              <div className="text-center text-gray-500 py-2">
                <p>No items in inventory</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Empty state */}
        {items.every((item) => item.quantity === 0) && !selectedItem && (
          <motion.div
            className="flex-1 flex items-center justify-center text-center"
            variants={itemVariants}
          >
            <div>
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-400">Bag is empty</p>
              <p className="text-sm text-gray-500 mt-2">Complete battles to earn items</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 300 - 150],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
