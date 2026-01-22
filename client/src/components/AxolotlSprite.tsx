import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimationState, MorphStage, MORPH_STAGE_NAMES } from '@shared/types';

interface AxolotlSpriteProps {
  morphStage: MorphStage;
  color: string;
  animationState?: AnimationState;
  size?: 'small' | 'medium' | 'large';
  interactive?: boolean;
}

export const AxolotlSprite: React.FC<AxolotlSpriteProps> = ({
  morphStage,
  color,
  animationState = 'idle',
  size = 'medium',
  interactive = true,
}) => {
  const [currentAnimation, setCurrentAnimation] = useState<AnimationState>(animationState);
  const [isHovered, setIsHovered] = useState(false);

  const sizeMap = {
    small: 120,
    medium: 200,
    large: 300,
  };

  const spriteSize = sizeMap[size];

  const getMorphScale = () => {
    switch (morphStage) {
      case 'axolol':
        return 0.8;
      case 'axolump':
        return 1;
      case 'axoloot':
        return 1.2;
      default:
        return 1;
    }
  };

  const bodyVariants: any = {
    idle: {
      y: [0, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    attack: {
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    defend: {
      scale: [1, 0.95, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    hurt: {
      x: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.4,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    faint: {
      rotate: 90,
      opacity: 0.5,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    celebrate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    morph: {
      scale: [1, 1.3, 1],
      rotate: [0, 360, 0],
      transition: {
        duration: 1.5,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const tailVariants: any = {
    idle: {
      rotate: [0, 15, -15, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1],
      },
    },
    attack: {
      rotate: [0, 30, 0],
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
    defend: {
      rotate: [-10, 10, -10],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const gillsVariants: any = {
    idle: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const morphScale = getMorphScale();

  return (
    <div
      className="flex items-center justify-center cursor-pointer relative"
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      onClick={() =>
        interactive && setCurrentAnimation(currentAnimation === 'idle' ? 'attack' : 'idle')
      }
    >
      <motion.svg
        width={spriteSize}
        height={spriteSize}
        viewBox="0 0 200 200"
        className="drop-shadow-lg"
        animate={currentAnimation}
        variants={bodyVariants}
        initial="idle"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="bodyGradient">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.7" />
          </radialGradient>
        </defs>

        {/* Body */}
        <motion.ellipse
          cx="100"
          cy="120"
          rx={45 * morphScale}
          ry={50 * morphScale}
          fill="url(#bodyGradient)"
          filter="url(#glow)"
        />

        {/* Head */}
        <motion.circle
          cx="100"
          cy="70"
          r={35 * morphScale}
          fill={color}
          filter="url(#glow)"
        />

        {/* Eyes */}
        <circle cx={85 * morphScale} cy={60 * morphScale} r="5" fill="white" />
        <circle cx={115 * morphScale} cy={60 * morphScale} r="5" fill="white" />
        <circle cx={85 * morphScale} cy={60 * morphScale} r="3" fill="black" />
        <circle cx={115 * morphScale} cy={60 * morphScale} r="3" fill="black" />

        {/* Mouth */}
        <path
          d={`M ${95 * morphScale} ${80 * morphScale} Q ${100 * morphScale} ${85 * morphScale} ${105 * morphScale} ${80 * morphScale}`}
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Gills */}
        <motion.g variants={gillsVariants} animate="idle">
          <path
            d={`M ${70 * morphScale} ${90 * morphScale} Q ${65 * morphScale} ${100 * morphScale} ${70 * morphScale} ${110 * morphScale}`}
            stroke="#FF10F0"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
            strokeLinecap="round"
          />
          <path
            d={`M ${130 * morphScale} ${90 * morphScale} Q ${135 * morphScale} ${100 * morphScale} ${130 * morphScale} ${110 * morphScale}`}
            stroke="#FF10F0"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Tail */}
        <motion.path
          d={`M ${145 * morphScale} ${120 * morphScale} Q ${170 * morphScale} ${110 * morphScale} ${180 * morphScale} ${130 * morphScale}`}
          stroke={color}
          strokeWidth={8 * morphScale}
          fill="none"
          strokeLinecap="round"
          variants={tailVariants}
          animate={currentAnimation === 'idle' ? 'idle' : currentAnimation}
        />

        {/* Front legs */}
        <ellipse
          cx={75 * morphScale}
          cy={155 * morphScale}
          rx={12 * morphScale}
          ry={8 * morphScale}
          fill={color}
        />
        <ellipse
          cx={125 * morphScale}
          cy={155 * morphScale}
          rx={12 * morphScale}
          ry={8 * morphScale}
          fill={color}
        />

        {/* Back legs */}
        <ellipse
          cx={70 * morphScale}
          cy={175 * morphScale}
          rx={10 * morphScale}
          ry={6 * morphScale}
          fill={color}
          opacity="0.8"
        />
        <ellipse
          cx={130 * morphScale}
          cy={175 * morphScale}
          rx={10 * morphScale}
          ry={6 * morphScale}
          fill={color}
          opacity="0.8"
        />
      </motion.svg>

      {/* Morph stage indicator */}
      <div className="absolute bottom-0 left-0 right-0 text-center text-xs font-semibold text-neon-cyan">
        {MORPH_STAGE_NAMES[morphStage]}
      </div>

      {/* Hover hint */}
      {interactive && isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-8 text-xs text-neon-pink font-semibold whitespace-nowrap"
        >
          Click to attack!
        </motion.div>
      )}
    </div>
  );
};
