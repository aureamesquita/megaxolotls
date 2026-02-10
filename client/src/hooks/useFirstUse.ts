import { useEffect, useState } from 'react';

const FIRST_USE_KEY = 'megaxolotls_first_use';
const TUTORIAL_COMPLETE_KEY = 'megaxolotls_tutorial_complete';
const PLAYTIME_START_KEY = 'megaxolotls_playtime_start';
const TOTAL_PLAYTIME_KEY = 'megaxolotls_total_playtime';

/**
 * Hook para gerenciar first-use, tutorial e time tracking
 */
export const useFirstUse = () => {
  const [isFirstUse, setIsFirstUse] = useState(false);
  const [tutorialComplete, setTutorialComplete] = useState(false);
  const [playtimeMinutes, setPlaytimeMinutes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize on mount
  useEffect(() => {
    const firstUse = !localStorage.getItem(FIRST_USE_KEY);
    const tutorialDone = localStorage.getItem(TUTORIAL_COMPLETE_KEY) === 'true';
    const totalPlaytime = parseInt(localStorage.getItem(TOTAL_PLAYTIME_KEY) || '0', 10);

    setIsFirstUse(firstUse);
    setTutorialComplete(tutorialDone);
    setPlaytimeMinutes(totalPlaytime);

    // Mark first use
    if (firstUse) {
      localStorage.setItem(FIRST_USE_KEY, 'true');
      localStorage.setItem(PLAYTIME_START_KEY, Date.now().toString());
    }

    setIsLoading(false);
  }, []);

  // Update playtime every minute
  useEffect(() => {
    if (isLoading || isFirstUse) return;

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
  }, [isLoading, isFirstUse]);

  const completeTutorial = () => {
    localStorage.setItem(TUTORIAL_COMPLETE_KEY, 'true');
    setTutorialComplete(true);
  };

  const formatPlaytime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return {
    isFirstUse,
    tutorialComplete,
    playtimeMinutes,
    formattedPlaytime: formatPlaytime(playtimeMinutes),
    completeTutorial,
    isLoading,
  };
};
