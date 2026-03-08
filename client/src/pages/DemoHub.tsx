import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, PawPrint, Smartphone } from 'lucide-react';

const tryLockLandscape = async () => {
  if (typeof window === 'undefined') return;

  try {
    const orientationApi = window.screen.orientation as ScreenOrientation & {
      lock?: (orientation: 'landscape') => Promise<void>;
    };

    if (orientationApi?.lock) {
      await orientationApi.lock('landscape');
    }
  } catch {
    // Browser support for orientation lock varies; we still keep a portrait warning UI fallback.
  }
};

export default function DemoHub() {
  const [, setLocation] = useLocation();
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);

  useEffect(() => {
    const evaluateOrientation = () => {
      if (typeof window === 'undefined') return;
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;
      setIsPortraitMobile(isMobile && isPortrait);
    };

    evaluateOrientation();
    tryLockLandscape();
    window.addEventListener('resize', evaluateOrientation);
    window.addEventListener('orientationchange', evaluateOrientation);

    return () => {
      window.removeEventListener('resize', evaluateOrientation);
      window.removeEventListener('orientationchange', evaluateOrientation);
    };
  }, []);

  const demoOptions = [
    { id: 'pets', title: 'Pets', emoji: '🫧', description: 'Gallery & moods', action: () => setLocation('/pets') },
    { id: 'care', title: 'Care', emoji: '🧼', description: 'Feed + clean', action: () => setLocation('/care') },
    { id: 'battle', title: 'Battle', emoji: '⚔️', description: 'Friendly duels', action: () => setLocation('/battle-demo') },
    { id: 'shop', title: 'Shop', emoji: '🛍️', description: 'Cute cosmetics', action: () => setLocation('/shop') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#23183d] via-[#2f1f50] to-[#1d1533] p-3 sm:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-5xl flex-col rounded-[2.2rem] border border-pink-200/30 bg-[#120f24]/80 p-4 shadow-2xl shadow-pink-900/30 backdrop-blur">
        <motion.div
          className="mb-4 flex items-center justify-between rounded-2xl border border-pink-100/20 bg-pink-300/10 px-3 py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button onClick={() => setLocation('/')} className="rounded-full bg-black/20 p-2 text-pink-100 hover:bg-black/35">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-sm font-bold tracking-wide text-pink-100">Axolotl Pocket</h1>
          <PawPrint className="h-4 w-4 text-pink-100" />
        </motion.div>

        {isPortraitMobile ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-cyan-100/30 bg-cyan-300/10 p-6 text-center">
            <Smartphone className="mb-3 h-10 w-10 text-cyan-100" />
            <h2 className="text-xl font-bold text-cyan-100">Rotate for best play</h2>
            <p className="mt-2 max-w-xs text-sm text-cyan-100/80">
              Demo mode is optimized for landscape. Please rotate your phone to continue.
            </p>
            <button
              className="mt-4 rounded-xl border border-cyan-100/40 px-4 py-2 text-sm font-semibold text-cyan-100"
              onClick={tryLockLandscape}
            >
              Try auto-rotate again
            </button>
          </div>
        ) : (
          <div className="grid flex-1 gap-4 md:grid-cols-[1.1fr_1.6fr]">
            <motion.div
              className="mb-1 overflow-hidden rounded-3xl border border-white/15 bg-black/20 md:mb-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <img src="/images/axolotl-sticker.svg" alt="Axolotl mascot" className="mx-auto h-40 w-40 object-contain py-4" />
              <p className="px-4 pb-4 text-center text-sm text-pink-100/85">Pick what your axie friend should do next!</p>
            </motion.div>

            <div className="grid content-start gap-3 sm:grid-cols-2">
              {demoOptions.map(demo => (
                <motion.button
                  key={demo.id}
                  onClick={() => {
                    setSelectedDemo(demo.id);
                    setTimeout(() => demo.action(), 170);
                  }}
                  className={`flex min-h-20 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                    selectedDemo === demo.id
                      ? 'border-cyan-200/60 bg-cyan-300/20'
                      : 'border-pink-100/20 bg-pink-100/10 hover:bg-pink-100/15'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-xl">{demo.emoji}</span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-pink-100">{demo.title}</span>
                    <span className="block text-xs text-pink-100/70">{demo.description}</span>
                  </span>
                  <span className="text-pink-100/75">›</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 text-center text-xs text-pink-100/60">Demo mode • Landscape-first on mobile • No wallet required</div>
      </div>
    </div>
  );
}
