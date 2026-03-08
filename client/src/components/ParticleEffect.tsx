/**
 * Particle Effect Component for Attack Animations
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ElementalType18, getTypeInfo } from '@/lib/elementalTypes18';

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface ParticleEffectProps {
  type: ElementalType18;
  x: number;
  y: number;
  count?: number;
  duration?: number;
  onComplete?: () => void;
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({
  type,
  x,
  y,
  count = 12,
  duration = 1000,
  onComplete,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const typeInfo = getTypeInfo(type);

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const speed = 3 + Math.random() * 2;
      return {
        id: `particle-${i}`,
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
      };
    });
    setParticles(newParticles);

    // Cleanup timer
    const timer = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [type, x, y, count, duration, onComplete]);

  const getParticleColor = (): string => {
    const colorMap: Record<ElementalType18, string> = {
      rubber: '#fbbf24',
      paper: '#b45309',
      salt: '#ffffff',
      sugar: '#ec4899',
      glass: '#06b6d4',
      sand: '#b91c1c',
      earth: '#15803d',
      water: '#0ea5e9',
      fire: '#ef4444',
      ice: '#bfdbfe',
      electric: '#fcd34d',
      grass: '#22c55e',
      psychic: '#a855f7',
      dragon: '#6366f1',
      fairy: '#f472b6',
      shadow: '#4b5563',
    };
    return colorMap[type] || '#ffffff';
  };

  return (
    <div className="fixed pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: getParticleColor(),
            left: particle.x,
            top: particle.y,
            boxShadow: `0 0 8px ${getParticleColor()}`,
          }}
          animate={{
            x: particle.vx * 50,
            y: particle.vy * 50 + 50,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: duration / 1000,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

interface DamagePopupProps {
  damage: number;
  isCritical?: boolean;
  x: number;
  y: number;
  onComplete?: () => void;
}

export const DamagePopup: React.FC<DamagePopupProps> = ({
  damage,
  isCritical = false,
  x,
  y,
  onComplete,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className={`fixed font-bold text-lg pointer-events-none ${
        isCritical ? 'text-yellow-300' : 'text-red-400'
      }`}
      style={{
        left: x,
        top: y,
      }}
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ opacity: 0, y: -60, scale: 1.5 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {isCritical && '⚡ '}
      {damage}
      {isCritical && ' CRITICAL!'}
    </motion.div>
  );
};

interface ImpactEffectProps {
  x: number;
  y: number;
  type?: 'hit' | 'heal' | 'critical';
  onComplete?: () => void;
}

export const ImpactEffect: React.FC<ImpactEffectProps> = ({
  x,
  y,
  type = 'hit',
  onComplete,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const colors = {
    hit: '#ef4444',
    heal: '#22c55e',
    critical: '#fbbf24',
  };

  return (
    <motion.div
      className="fixed pointer-events-none rounded-full"
      style={{
        left: x,
        top: y,
        width: 40,
        height: 40,
        border: `3px solid ${colors[type]}`,
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 2, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    />
  );
};
