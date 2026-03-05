import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, Heart, Droplets, Utensils, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

type PetMood = 'happy' | 'neutral' | 'sad' | 'tired';
type RoomType = 'Hall' | 'Bedroom' | 'Cozy' | 'Medsroom' | 'Playroom' | 'Breedroom';

const ROOMS: RoomType[] = ['Hall', 'Bedroom', 'Cozy', 'Medsroom', 'Playroom', 'Breedroom'];

const getRoomEmoji = (room: RoomType): string => {
  switch (room) {
    case 'Hall': return '🏛️';
    case 'Bedroom': return '🛏️';
    case 'Cozy': return '🪑';
    case 'Medsroom': return '⚕️';
    case 'Playroom': return '🎮';
    case 'Breedroom': return '🥚';
  }
};

const getRoomColor = (room: RoomType): string => {
  switch (room) {
    case 'Hall': return 'from-purple-600 to-purple-700';
    case 'Bedroom': return 'from-blue-600 to-blue-700';
    case 'Cozy': return 'from-orange-600 to-orange-700';
    case 'Medsroom': return 'from-green-600 to-green-700';
    case 'Playroom': return 'from-pink-600 to-pink-700';
    case 'Breedroom': return 'from-yellow-600 to-yellow-700';
  }
};

interface PetState {
  hunger: number; // 0-100
  happiness: number; // 0-100
  energy: number; // 0-100
  mood: PetMood;
}

const getMoodEmoji = (mood: PetMood): string => {
  switch (mood) {
    case 'happy': return '😊';
    case 'neutral': return '😐';
    case 'sad': return '😢';
    case 'tired': return '😴';
  }
};

const getMoodColor = (mood: PetMood): string => {
  switch (mood) {
    case 'happy': return 'text-neon-green';
    case 'neutral': return 'text-neon-cyan';
    case 'sad': return 'text-red-400';
    case 'tired': return 'text-purple-400';
  }
};

const PET_STATE_STORAGE_KEY = 'megaxolotls-pet-state';

const loadPetState = (): PetState => {
  const saved = localStorage.getItem(PET_STATE_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load pet state:', e);
    }
  }
  return {
    hunger: 50,
    happiness: 70,
    energy: 60,
    mood: 'neutral',
  };
};

const savePetState = (state: PetState) => {
  localStorage.setItem(PET_STATE_STORAGE_KEY, JSON.stringify(state));
};

/**
 * Care Screen - Tamagotchi-style pet care (2010s mobile app aesthetic)
 */
export default function Care() {
  const [, navigate] = useLocation();
  const [petState, setPetState] = useState<PetState>(loadPetState);
  const [petAnimating, setPetAnimating] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  const currentRoom = ROOMS[currentRoomIndex];

  const nextRoom = () => {
    setCurrentRoomIndex((prev) => (prev + 1) % ROOMS.length);
  };

  const prevRoom = () => {
    setCurrentRoomIndex((prev) => (prev - 1 + ROOMS.length) % ROOMS.length);
  };

  // Calculate mood based on stats
  useEffect(() => {
    let newMood: PetMood = 'neutral';
    if (petState.energy < 20) {
      newMood = 'tired';
    } else if (petState.hunger > 80) {
      newMood = 'sad';
    } else if (petState.happiness > 80 && petState.hunger < 40) {
      newMood = 'happy';
    }
    setPetState((prev) => ({ ...prev, mood: newMood }));
  }, [petState.hunger, petState.happiness, petState.energy]);

  const showFeedback = (text: string) => {
    setFeedbackText(text);
    setTimeout(() => setFeedbackText(''), 2000);
  };

  const feed = () => {
    setPetAnimating(true);
    setPetState((prev) => {
      const newState = {
        ...prev,
        hunger: Math.max(0, prev.hunger - 30),
        happiness: Math.min(100, prev.happiness + 10),
      };
      savePetState(newState);
      return newState;
    });
    showFeedback('Nom nom! 😋');
    setTimeout(() => setPetAnimating(false), 500);
  };

  const play = () => {
    setPetAnimating(true);
    setPetState((prev) => {
      const newState = {
        ...prev,
        happiness: Math.min(100, prev.happiness + 25),
        energy: Math.max(0, prev.energy - 20),
        hunger: Math.min(100, prev.hunger + 15),
      };
      savePetState(newState);
      return newState;
    });
    showFeedback('Wheee! 🎉');
    setTimeout(() => setPetAnimating(false), 500);
  };

  const sleep = () => {
    setPetAnimating(true);
    setPetState((prev) => {
      const newState = {
        ...prev,
        energy: 100,
        hunger: Math.min(100, prev.hunger + 10),
      };
      savePetState(newState);
      return newState;
    });
    showFeedback('Zzzzz... 😴');
    setTimeout(() => setPetAnimating(false), 1500);
  };

  const pet = () => {
    setPetAnimating(true);
    setPetState((prev) => {
      const newState = {
        ...prev,
        happiness: Math.min(100, prev.happiness + 15),
      };
      savePetState(newState);
      return newState;
    });
    showFeedback('Purr! 💕');
    setTimeout(() => setPetAnimating(false), 400);
  };

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
    <div className="relative w-full min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 flex flex-col">
      {/* Top bar with room selector */}
      <motion.div
        className="border-b border-neon-cyan/20 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* First row: Back button and title */}
        <div className="flex items-center justify-between px-4 py-3">
          <motion.button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-neon-cyan/10 rounded-lg transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 text-neon-cyan" />
          </motion.button>
          <h1 className="text-lg font-bold text-neon-cyan">CARE</h1>
          <div className="w-9" />
        </div>

        {/* Second row: Room selector */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-neon-cyan/10">
          {/* Left arrow */}
          <motion.button
            onClick={prevRoom}
            className="p-2 hover:bg-neon-pink/10 rounded-lg transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 text-neon-pink" />
          </motion.button>

          {/* Room name and emoji */}
          <motion.div
            key={currentRoom}
            className={`flex-1 text-center px-4 py-2 rounded-lg bg-gradient-to-r ${getRoomColor(currentRoom)} text-white font-bold`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl mb-1">{getRoomEmoji(currentRoom)}</div>
            <div className="text-sm">{currentRoom}</div>
          </motion.div>

          {/* Right arrow */}
          <motion.button
            onClick={nextRoom}
            className="p-2 hover:bg-neon-cyan/10 rounded-lg transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5 text-neon-cyan" />
          </motion.button>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-between px-4 py-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Pet display area */}
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <div className="text-sm text-gray-400 mb-2">Your Axolotl</div>
          <motion.div
            className="text-8xl mb-4 cursor-pointer"
            animate={
              petAnimating
                ? {
                    y: [0, -20, 0],
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.1, 1],
                  }
                : { y: 0 }
            }
            transition={{ duration: 0.5 }}
            onClick={pet}
          >
            🦎
          </motion.div>
          <motion.div
            className={`text-5xl ${getMoodColor(petState.mood)}`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            {getMoodEmoji(petState.mood)}
          </motion.div>

          {/* Feedback text */}
          {feedbackText && (
            <motion.div
              className="text-2xl mt-4 font-bold text-neon-green"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {feedbackText}
            </motion.div>
          )}
        </motion.div>

        {/* Stats display */}
        <motion.div
          className="w-full max-w-sm space-y-3"
          variants={itemVariants}
        >
          {/* Hunger */}
          <div className="bg-black/40 border border-neon-cyan/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-bold text-gray-300">Hunger</span>
              </div>
              <span className="text-sm text-gray-400">{petState.hunger}%</span>
            </div>
            <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-full"
                initial={{ width: 0 }}
                animate={{ width: `${petState.hunger}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Happiness */}
          <div className="bg-black/40 border border-neon-cyan/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <span className="text-sm font-bold text-gray-300">Happiness</span>
              </div>
              <span className="text-sm text-gray-400">{petState.happiness}%</span>
            </div>
            <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-pink-500 to-neon-pink h-full"
                initial={{ width: 0 }}
                animate={{ width: `${petState.happiness}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Energy */}
          <div className="bg-black/40 border border-neon-cyan/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-bold text-gray-300">Energy</span>
              </div>
              <span className="text-sm text-gray-400">{petState.energy}%</span>
            </div>
            <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-yellow-500 to-neon-green h-full"
                initial={{ width: 0 }}
                animate={{ width: `${petState.energy}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="w-full max-w-sm grid grid-cols-2 gap-3"
          variants={itemVariants}
        >
          <motion.button
            onClick={feed}
            disabled={petState.hunger < 20}
            className="p-4 rounded-lg bg-gradient-to-br from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl mb-1">🍖</div>
            <div className="text-xs">Feed</div>
          </motion.button>

          <motion.button
            onClick={play}
            disabled={petState.energy < 30}
            className="p-4 rounded-lg bg-gradient-to-br from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl mb-1">🎮</div>
            <div className="text-xs">Play</div>
          </motion.button>

          <motion.button
            onClick={sleep}
            disabled={petState.energy > 90}
            className="p-4 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl mb-1">😴</div>
            <div className="text-xs">Sleep</div>
          </motion.button>

          <motion.button
            onClick={pet}
            className="p-4 rounded-lg bg-gradient-to-br from-neon-cyan to-blue-600 hover:from-neon-cyan hover:to-blue-500 transition-all font-bold text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl mb-1">👋</div>
            <div className="text-xs">Pet</div>
          </motion.button>
        </motion.div>

        {/* Bottom tip */}
        <motion.div
          className="text-center text-xs text-gray-500"
          variants={itemVariants}
        >
          <p>Tap the pet to pet it! 💕</p>
        </motion.div>
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
