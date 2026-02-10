import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const PLAYTIME_START_KEY = 'megaxolotls_playtime_start';
const TOTAL_PLAYTIME_KEY = 'megaxolotls_total_playtime';

/**
 * PlaytimeTracker - Global component that tracks and displays playtime
 * Should be placed in the main layout/header and persists across all pages
 */
export const PlaytimeTracker: React.FC = () => {
  const [playtimeMinutes, setPlaytimeMinutes] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Initialize and update playtime every minute
  useEffect(() => {
    // Get initial playtime
    const totalPlaytime = parseInt(localStorage.getItem(TOTAL_PLAYTIME_KEY) || '0', 10);
    setPlaytimeMinutes(totalPlaytime);

    // Initialize start time if not exists
    if (!localStorage.getItem(PLAYTIME_START_KEY)) {
      localStorage.setItem(PLAYTIME_START_KEY, Date.now().toString());
    }

    // Update playtime every minute
    const interval = setInterval(() => {
      const startTime = parseInt(localStorage.getItem(PLAYTIME_START_KEY) || Date.now().toString(), 10);
      const elapsed = Math.floor((Date.now() - startTime) / 1000 / 60); // minutes
      const total = parseInt(localStorage.getItem(TOTAL_PLAYTIME_KEY) || '0', 10);
      const newTotal = total + elapsed;

      localStorage.setItem(TOTAL_PLAYTIME_KEY, newTotal.toString());
      localStorage.setItem(PLAYTIME_START_KEY, Date.now().toString());
      setPlaytimeMinutes(newTotal);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const formatPlaytime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 border border-neon-cyan/30 hover:border-neon-pink/50 transition-all"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Clock className="w-4 h-4 text-neon-cyan" />
      </motion.div>
      <span className="text-sm font-bold text-neon-cyan">{formatPlaytime(playtimeMinutes)}</span>
    </motion.div>
  );
};
