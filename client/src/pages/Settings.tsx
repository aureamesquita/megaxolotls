import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, Music, Zap, LogOut } from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';

type DialogFrame = 'classic' | 'neon' | 'cyberpunk' | 'minimal';

interface Settings {
  soundEnabled: boolean;
  musicVolume: number;
  sfxVolume: number;
  dialogFrame: DialogFrame;
}

const DIALOG_FRAMES: { id: DialogFrame; name: string; preview: string }[] = [
  {
    id: 'classic',
    name: 'Classic',
    preview: '📦 Traditional frame style',
  },
  {
    id: 'neon',
    name: 'Neon',
    preview: '✨ Glowing neon borders',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    preview: '🤖 High-tech futuristic',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    preview: '⚡ Clean and simple',
  },
];

export default function Settings() {
  const [, navigate] = useLocation();
  const { user, logout } = useAuth();
  const logoutMutation = trpc.auth.logout.useMutation();
  
  const [settings, setSettings] = useState<Settings>({
    soundEnabled: true,
    musicVolume: 70,
    sfxVolume: 80,
    dialogFrame: 'neon',
  });

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('megaxolotls-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem('megaxolotls-settings', JSON.stringify(newSettings));
  };

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logoutMutation.mutateAsync();
      logout();
      navigate('/');
    }
  };

  const toggleSound = () => {
    saveSettings({ ...settings, soundEnabled: !settings.soundEnabled });
  };

  const updateMusicVolume = (volume: number) => {
    saveSettings({ ...settings, musicVolume: volume });
  };

  const updateSfxVolume = (volume: number) => {
    saveSettings({ ...settings, sfxVolume: volume });
  };

  const updateDialogFrame = (frame: DialogFrame) => {
    saveSettings({ ...settings, dialogFrame: frame });
  };

  return (
    <div className="min-h-screen bg-black/80 text-white p-4 sm:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <h1 className="text-4xl font-black bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent">
          Settings
        </h1>
      </motion.div>

      {/* Settings Sections */}
      <div className="max-w-2xl space-y-6">
        {/* Account Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-neon-cyan/30 rounded-lg p-6 bg-black/40"
        >
          <h2 className="text-xl font-bold text-neon-cyan mb-4">Account</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Wallet Address</label>
              <p className="text-white font-mono text-sm mt-1 break-all">
                {user?.email || 'Not connected'}
              </p>
            </div>
            
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded bg-red-900/30 hover:bg-red-900/50 text-red-400 transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </motion.section>

        {/* Audio Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-neon-cyan/30 rounded-lg p-6 bg-black/40"
        >
          <h2 className="text-xl font-bold text-neon-cyan mb-4 flex items-center gap-2">
            <Music className="w-5 h-5" />
            Audio
          </h2>

          <div className="space-y-6">
            {/* Sound Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {settings.soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-neon-pink" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-500" />
                )}
                <span className="text-white">Sound Effects</span>
              </div>
              <button
                onClick={toggleSound}
                className={`px-4 py-2 rounded font-semibold transition-all ${
                  settings.soundEnabled
                    ? 'bg-neon-cyan text-black hover:bg-neon-green'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {settings.soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Music Volume */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white">Music Volume</label>
                <span className="text-neon-pink font-semibold">{settings.musicVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.musicVolume}
                onChange={(e) => updateMusicVolume(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
              />
            </div>

            {/* SFX Volume */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white">SFX Volume</label>
                <span className="text-neon-pink font-semibold">{settings.sfxVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.sfxVolume}
                onChange={(e) => updateSfxVolume(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-pink"
              />
            </div>
          </div>
        </motion.section>

        {/* Dialog Frame Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border border-neon-cyan/30 rounded-lg p-6 bg-black/40"
        >
          <h2 className="text-xl font-bold text-neon-cyan mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Dialog Frame Style
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DIALOG_FRAMES.map((frame) => (
              <motion.button
                key={frame.id}
                onClick={() => updateDialogFrame(frame.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  settings.dialogFrame === frame.id
                    ? 'border-neon-pink bg-neon-pink/10'
                    : 'border-neon-cyan/30 bg-black/20 hover:border-neon-cyan/50'
                }`}
              >
                <div className="font-semibold text-white mb-1">{frame.name}</div>
                <div className="text-sm text-gray-400">{frame.preview}</div>
              </motion.button>
            ))}
          </div>

          {/* Frame Preview */}
          <div className="mt-6 p-4 rounded-lg border-2 border-neon-cyan/30 bg-black/60">
            <div className={`p-4 rounded text-white text-sm ${
              settings.dialogFrame === 'classic' ? 'border-2 border-gray-400' :
              settings.dialogFrame === 'neon' ? 'border-2 border-neon-cyan shadow-lg shadow-neon-cyan/50' :
              settings.dialogFrame === 'cyberpunk' ? 'border-2 border-neon-pink shadow-lg shadow-neon-pink/50' :
              'border-0'
            }`}>
              Preview: This is how dialogs will look with the {settings.dialogFrame} frame style.
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
