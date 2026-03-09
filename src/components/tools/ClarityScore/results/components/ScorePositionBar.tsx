import React from 'react';
import type { ScoreTier } from '@/lib/clarity/types';

const TIER_DISPLAY: Record<ScoreTier, string> = {
  thriving: 'thriving',
  balanced: 'balanced',
  struggling: 'concerning',
  distressed: 'distressed',
  crisis: 'crisis',
};

interface ScorePositionBarProps {
  score: number;
  maxScore?: number;
  tier: ScoreTier;
}

interface Zone {
  tier: ScoreTier;
  label: string;
  min: number;
  max: number;
  bg: string;
}

const ZONES_100: Zone[] = [
  { tier: 'crisis', label: '0–19', min: 0, max: 19, bg: 'bg-red-400' },
  { tier: 'distressed', label: '20–39', min: 20, max: 39, bg: 'bg-orange-400' },
  { tier: 'struggling', label: '40–59', min: 40, max: 59, bg: 'bg-amber-400' },
  { tier: 'balanced', label: '60–79', min: 60, max: 79, bg: 'bg-teal-400' },
  { tier: 'thriving', label: '80–100', min: 80, max: 100, bg: 'bg-emerald-400' },
];

const ZONES_20: Zone[] = [
  { tier: 'crisis', label: '0–3', min: 0, max: 3, bg: 'bg-red-400' },
  { tier: 'distressed', label: '4–7', min: 4, max: 7, bg: 'bg-orange-400' },
  { tier: 'struggling', label: '8–11', min: 8, max: 11, bg: 'bg-amber-400' },
  { tier: 'balanced', label: '12–15', min: 12, max: 15, bg: 'bg-teal-400' },
  { tier: 'thriving', label: '16–20', min: 16, max: 20, bg: 'bg-emerald-400' },
];

/** Horizontal bar showing 5 tier zones with a position marker */
const ScorePositionBar: React.FC<ScorePositionBarProps> = ({
  score,
  maxScore = 100,
  tier,
}) => {
  const zones = maxScore === 20 ? ZONES_20 : ZONES_100;
  const position = Math.min(Math.max((score / maxScore) * 100, 1), 99);

  return (
    <div
      className="w-full"
      role="img"
      aria-label={`Score position: ${Math.round(score)} out of ${maxScore}, ${tier}`}
    >
      {/* Zone labels */}
      <div className="flex mb-1">
        {zones.map((zone) => (
          <div
            key={zone.tier}
            className="flex-1 text-center"
          >
            <span
              className={`text-[10px] font-medium ${
                zone.tier === tier
                  ? 'text-gray-900 dark:text-white font-bold'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {zone.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bar with zones */}
      <div className="relative h-3 rounded-full flex overflow-hidden">
        {zones.map((zone, i) => (
          <div
            key={zone.tier}
            className={`flex-1 ${zone.bg} ${
              zone.tier === tier ? 'opacity-100' : 'opacity-40'
            } ${i === 0 ? 'rounded-l-full' : ''} ${
              i === zones.length - 1 ? 'rounded-r-full' : ''
            }`}
          />
        ))}

        {/* Position marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-gray-900 border-[3px] border-gray-900 dark:border-white shadow-md z-10 transition-all duration-500"
          style={{ left: `${position}%` }}
        />
      </div>

      {/* Tier labels */}
      <div className="flex mt-1">
        {zones.map((zone) => (
          <div key={zone.tier} className="flex-1 text-center">
            <span
              className={`text-[10px] capitalize ${
                zone.tier === tier
                  ? 'text-gray-700 dark:text-gray-300 font-semibold'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            >
              {TIER_DISPLAY[zone.tier]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScorePositionBar;
