import React from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useLocation } from 'wouter';
import {
  Wallet,
  Zap,
  Coins,
  Users,
  Backpack,
  Swords,
  Heart,
  Egg,
  ShoppingBag,
  Trophy,
  BookOpen,
  Settings,
  LogOut,
} from 'lucide-react';
import { useFirstUse } from '@/hooks/useFirstUse';
import { useAuth } from '@/_core/hooks/useAuth';
import { PlaytimeTracker } from '@/components/PlaytimeTracker';

/**
 * Dashboard/Home Screen - Main game hub after login
 * Shows wallet info, tokens, and navigation menu
 */
export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { logout } = useAuth();
  const [, setLocation] = useLocation();

  if (!isConnected) {
    setLocation('/');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    setLocation('/');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
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

  const menuItems = [
    { icon: Users, label: 'Pets', color: 'from-neon-pink to-purple-500' },
    { icon: Users, label: 'Teams', color: 'from-neon-cyan to-blue-500' },
    { icon: Backpack, label: 'Bag', color: 'from-yellow-400 to-orange-500' },
    { icon: Swords, label: 'Stadium', color: 'from-red-500 to-pink-500' },
    { icon: Heart, label: 'Care', color: 'from-green-400 to-emerald-500' },
    { icon: Egg, label: 'Breed', color: 'from-purple-400 to-indigo-500' },
    { icon: ShoppingBag, label: 'Shop', color: 'from-blue-400 to-cyan-500' },
    { icon: Trophy, label: 'Ranking', color: 'from-yellow-500 to-amber-500' },
    { icon: BookOpen, label: 'Changelog', color: 'from-pink-400 to-rose-500' },
  ];

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

      {/* Header */}
      <motion.div
        className="relative z-10 border-b border-neon-cyan/20 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-neon-cyan" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
                MEGAXOLOTLS
              </h1>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <PlaytimeTracker />
              <motion.button
                onClick={handleLogout}
                className="p-2 hover:bg-neon-cyan/10 rounded-lg transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5 text-gray-400 hover:text-neon-cyan" />
              </motion.button>
            </div>
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
        {/* Wallet & Network Info */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8" variants={containerVariants}>
          {/* Wallet Address */}
          <motion.div
            className="p-6 rounded-lg border border-neon-cyan/30 bg-black/40 hover:border-neon-pink/50 transition-all"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Wallet className="w-5 h-5 text-neon-cyan" />
              <span className="text-sm text-gray-400">Wallet</span>
            </div>
            <p className="text-neon-cyan font-mono text-xs break-all">{address}</p>
          </motion.div>

          {/* Network */}
          <motion.div
            className="p-6 rounded-lg border border-neon-cyan/30 bg-black/40"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-5 h-5 text-neon-green" />
              <span className="text-sm text-gray-400">Network</span>
            </div>
            <p className="text-neon-green font-bold">MegaETH</p>
            <p className="text-xs text-gray-500">Chain ID: 4326</p>
          </motion.div>

          {/* Settings */}
          <motion.button
            onClick={() => setLocation('/settings')}
            className="p-6 rounded-lg border border-neon-cyan/30 bg-black/40 hover:border-neon-pink/50 transition-all flex items-center justify-center gap-3"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <Settings className="w-5 h-5 text-gray-400 hover:text-neon-cyan" />
            <span className="text-gray-400 hover:text-neon-cyan">Settings</span>
          </motion.button>
        </motion.div>

        {/* Token Balances */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8" variants={containerVariants}>
          {/* LIP Token */}
          <motion.div
            className="p-6 rounded-lg border-2 border-neon-cyan/50 bg-gradient-to-br from-black/60 to-neon-cyan/10 hover:border-neon-pink/50 transition-all cursor-pointer"
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neon-cyan/20 rounded-lg">
                <Coins className="w-6 h-6 text-neon-cyan" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">LIP Token</p>
                <p className="text-2xl font-bold text-neon-cyan">0.00</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Gameplay token • Earn from battles</p>
          </motion.div>

          {/* MEGAX Token */}
          <motion.div
            className="p-6 rounded-lg border-2 border-neon-pink/50 bg-gradient-to-br from-black/60 to-neon-pink/10 hover:border-neon-cyan/50 transition-all cursor-pointer"
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neon-pink/20 rounded-lg">
                <Coins className="w-6 h-6 text-neon-pink" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">MEGAX Token</p>
                <p className="text-2xl font-bold text-neon-pink">0.00</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Governance token • Trade & govern</p>
          </motion.div>
        </motion.div>

        {/* Navigation Menu */}
        <motion.div variants={containerVariants}>
          <h2 className="text-xl font-bold text-neon-cyan mb-6">Game Menu</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={idx}
                  onClick={() => setLocation(`/${item.label.toLowerCase()}`)}
                  className={`p-6 rounded-lg border border-neon-cyan/30 bg-black/40 hover:border-neon-pink/50 transition-all flex flex-col items-center gap-3 group`}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`p-3 bg-gradient-to-br ${item.color} rounded-lg group-hover:shadow-lg group-hover:shadow-neon-pink/50 transition-all`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-bold text-gray-300 group-hover:text-neon-cyan transition-colors">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
