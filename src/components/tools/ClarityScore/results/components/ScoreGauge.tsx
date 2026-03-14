import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import type { ScoreTier } from '@/lib/clarity/types';
import { getScoreTierColor } from '@/lib/clarity/scoring';
import TierBadge from './TierBadge';

const TIER_SENTENCES: Record<ScoreTier, string> = {
  thriving: 'Strong wellness across most dimensions',
  balanced: 'Solid foundation with room to grow',
  struggling: 'Some areas need attention',
  distressed: 'Significant challenges detected',
  crisis: 'Immediate support recommended',
};

interface ScoreGaugeProps {
  score: number;
  tier: ScoreTier;
  label: string;
  animate?: boolean;
}

const SIZE = 200;
const STROKE_WIDTH = 14;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC_SWEEP = 0.75; // 270° arc

/** Animated SVG circular gauge showing the composite Clarity Score */
const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  tier,
  label,
  animate: shouldAnimate = true,
}) => {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const motionScore = useMotionValue(0);
  const displayScore = useTransform(motionScore, (v) => Math.round(v));
  const scoreRef = useRef<HTMLSpanElement>(null);

  const colors = getScoreTierColor(tier);
  const strokeHex: Record<ScoreTier, string> = {
    thriving: '#10b981',
    balanced: '#0d9488',
    struggling: '#f59e0b',
    distressed: '#f97316',
    crisis: '#ef4444',
  };

  // Animate score number
  useEffect(() => {
    if (prefersReduced || !shouldAnimate) {
      motionScore.set(score);
      return;
    }
    const controls = animate(motionScore, score, {
      duration: 1.2,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [score, shouldAnimate, prefersReduced, motionScore]);

  // Keep DOM text in sync with motion value
  useEffect(() => {
    const unsubscribe = displayScore.on('change', (v) => {
      if (scoreRef.current) scoreRef.current.textContent = String(v);
    });
    return unsubscribe;
  }, [displayScore]);

  const filledLength = CIRCUMFERENCE * ARC_SWEEP * (score / 100);
  const gapLength = CIRCUMFERENCE * ARC_SWEEP - filledLength;
  const emptyArc = CIRCUMFERENCE * (1 - ARC_SWEEP);

  return (
    <div
      className="flex flex-col items-center"
      aria-label={`Clarity Score: ${score} out of 100, ${label}`}
      role="img"
    >
      <div className="relative w-full max-w-[12.5rem]">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="transform rotate-[135deg] w-full h-auto"
      >
        {/* Background arc */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          className="text-gray-200 dark:text-gray-700"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={`${CIRCUMFERENCE * ARC_SWEEP} ${emptyArc}`}
          strokeLinecap="round"
        />
        {/* Filled arc */}
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={strokeHex[tier]}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={`${filledLength} ${gapLength + emptyArc}`}
          initial={
            shouldAnimate && !prefersReduced
              ? { strokeDasharray: `0 ${CIRCUMFERENCE}` }
              : undefined
          }
          animate={{ strokeDasharray: `${filledLength} ${gapLength + emptyArc}` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>

      {/* Score number overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          ref={scoreRef}
          className="text-5xl sm:text-6xl font-display font-bold text-gray-900 dark:text-white"
        >
          {prefersReduced || !shouldAnimate ? score : 0}
        </span>
        <span className="text-sm text-gray-400 dark:text-gray-500 -mt-1">
          out of 100
        </span>
      </div>
      </div>

      {/* Tier badge + interpretive sentence */}
      <div className="-mt-4 flex flex-col items-center">
        <TierBadge tier={tier} label={label} size="lg" />
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2 max-w-[180px]">
          {TIER_SENTENCES[tier]}
        </p>
      </div>
    </div>
  );
};

export default ScoreGauge;
