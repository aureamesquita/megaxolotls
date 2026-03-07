import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShopItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  price: number; // LIP tokens
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  category: 'consumable' | 'equipment' | 'axolotl'; // axolotl para futuro
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'hp-potion',
    name: 'HP Potion',
    emoji: '🧪',
    description: 'Restores 30 HP to your pet',
    price: 50,
    rarity: 'common',
    category: 'consumable',
  },
  {
    id: 'energy-drink',
    name: 'Energy Drink',
    emoji: '⚡',
    description: 'Restores 50 Energy',
    price: 75,
    rarity: 'uncommon',
    category: 'consumable',
  },
  {
    id: 'rare-candy',
    name: 'Rare Candy',
    emoji: '🍬',
    description: 'Grants 1 Level instantly',
    price: 200,
    rarity: 'rare',
    category: 'consumable',
  },
  {
    id: 'evolution-stone',
    name: 'Evolution Stone',
    emoji: '💎',
    description: 'Triggers evolution for your pet',
    price: 500,
    rarity: 'epic',
    category: 'equipment',
  },
  {
    id: 'power-band',
    name: 'Power Band',
    emoji: '💪',
    description: '+10% Attack Power',
    price: 300,
    rarity: 'rare',
    category: 'equipment',
  },
  {
    id: 'speed-boots',
    name: 'Speed Boots',
    emoji: '👟',
    description: '+15% Speed',
    price: 300,
    rarity: 'rare',
    category: 'equipment',
  },
  {
    id: 'shield-charm',
    name: 'Shield Charm',
    emoji: '🛡️',
    description: '+20% Defense',
    price: 400,
    rarity: 'epic',
    category: 'equipment',
  },
  {
    id: 'lucky-egg',
    name: 'Lucky Egg',
    emoji: '🥚',
    description: '+50% XP gain',
    price: 600,
    rarity: 'epic',
    category: 'equipment',
  },
  {
    id: 'master-ball',
    name: 'Master Ball',
    emoji: '⚪',
    description: 'Guaranteed capture (future)',
    price: 1000,
    rarity: 'legendary',
    category: 'consumable',
  },
  {
    id: 'axolotl-egg',
    name: 'Axolotl Egg',
    emoji: '🦎',
    description: 'Hatch a new Axolotl (future)',
    price: 2000,
    rarity: 'legendary',
    category: 'axolotl',
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
 * Shop Screen - Buy items with LIP tokens
 */
export default function Shop() {
  const [, setLocation] = useLocation();
  const [userLIP] = useState(1250); // Mock balance
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<Set<string>>(new Set());
  const [showPurchaseAnimation, setShowPurchaseAnimation] = useState(false);

  const handlePurchase = (item: ShopItem) => {
    if (userLIP >= item.price) {
      // Trigger purchase animation
      setShowPurchaseAnimation(true);
      setPurchasedItems((prev) => new Set(prev).add(item.id));

      // Reset animation after 1 second
      setTimeout(() => {
        setShowPurchaseAnimation(false);
        setSelectedItem(null);
      }, 1000);
    }
  };

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
          <ShoppingCart className="w-5 h-5" />
          SHOP
        </h1>
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
          <span className="text-sm font-bold text-neon-cyan">💰</span>
          <span className="text-sm font-bold text-white">{userLIP.toLocaleString()}</span>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="flex-1 flex flex-col gap-6 px-4 py-6 overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Items Grid */}
        <motion.div className="max-w-6xl mx-auto w-full" variants={itemVariants}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {SHOP_ITEMS.map((item) => {
              const canAfford = userLIP >= item.price;
              const isPurchased = purchasedItems.has(item.id);

              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                  }}
                  className={`relative p-4 rounded-lg bg-gradient-to-br ${getRarityColor(item.rarity)} border-2 ${getRarityBorder(item.rarity)} transition-all text-left group ${!canAfford ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-neon-cyan/50'}`}
                  whileHover={canAfford ? { scale: 1.02 } : {}}
                  whileTap={canAfford ? { scale: 0.98 } : {}}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-3xl">{item.emoji}</div>
                      {isPurchased && (
                        <motion.div
                          className="p-1 rounded-full bg-neon-green/20 border border-neon-green"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check className="w-4 h-4 text-neon-green" />
                        </motion.div>
                      )}
                    </div>

                    <h3 className="font-bold text-white text-sm mb-1">{item.name}</h3>
                    <p className="text-xs text-white/80 mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-white">💰</span>
                        <span className="text-sm font-bold text-white">{item.price}</span>
                      </div>
                      {!canAfford && (
                        <span className="text-xs text-red-400 font-bold">INSUFFICIENT</span>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Item Details Panel */}
        {selectedItem && (
          <motion.div
            className="max-w-2xl mx-auto w-full p-6 rounded-lg bg-black/60 border border-neon-cyan/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedItem.emoji}</div>
                <div>
                  <h3 className="text-2xl font-bold text-neon-cyan">{selectedItem.name}</h3>
                  <p className="text-sm text-gray-400 capitalize">{selectedItem.rarity} • {selectedItem.category}</p>
                </div>
              </div>
              <motion.button
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-all"
                whileHover={{ scale: 1.1 }}
              >
                ✕
              </motion.button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs text-gray-400 mb-2">Description</p>
                <p className="text-sm text-white">{selectedItem.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Price</p>
                  <p className="text-lg font-bold text-neon-cyan flex items-center gap-1">
                    <span>💰</span>
                    {selectedItem.price}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Your Balance</p>
                  <p className="text-lg font-bold text-white">{userLIP.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Rarity</p>
                  <p className="text-sm font-bold text-white capitalize">{selectedItem.rarity}</p>
                </div>
              </div>
            </div>

            {/* Purchase Button */}
            <motion.button
              onClick={() => handlePurchase(selectedItem)}
              disabled={userLIP < selectedItem.price || purchasedItems.has(selectedItem.id)}
              className={`w-full p-3 rounded-lg font-bold transition-all ${
                userLIP >= selectedItem.price && !purchasedItems.has(selectedItem.id)
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-black hover:shadow-lg hover:shadow-neon-cyan/50'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={userLIP >= selectedItem.price && !purchasedItems.has(selectedItem.id) ? { scale: 1.02 } : {}}
              whileTap={userLIP >= selectedItem.price && !purchasedItems.has(selectedItem.id) ? { scale: 0.98 } : {}}
            >
              {purchasedItems.has(selectedItem.id) ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  Purchased
                </span>
              ) : userLIP < selectedItem.price ? (
                'Insufficient LIP'
              ) : (
                'Purchase'
              )}
            </motion.button>

            {/* Purchase Animation */}
            {showPurchaseAnimation && purchasedItems.has(selectedItem.id) && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="text-6xl"
                  initial={{ scale: 0, y: -50 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  ✨
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Categories Info */}
        <motion.div className="max-w-2xl mx-auto w-full" variants={itemVariants}>
          <div className="p-4 rounded-lg border border-dashed border-neon-cyan/30 bg-black/20 text-center">
            <p className="text-xs text-gray-400">
              💡 Tip: Consumables are one-time use. Equipment provides permanent bonuses. Axolotl items are coming soon!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
