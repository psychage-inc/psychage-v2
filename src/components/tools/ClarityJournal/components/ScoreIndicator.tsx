import React from 'react';
import type { ScoreLevel } from '../types';
import { getScoreColor, getScoreLabel } from '../scoring';

interface ScoreIndicatorProps {
  label: string;
  score: number;
  maxScore: number;
  level: ScoreLevel;
  invertedDescription?: boolean; // For WHO-5 where higher is better
}

const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({
  label,
  score,
  maxScore,
  level,
  invertedDescription = false,
}) => {
  const colorClass = getScoreColor(level);
  const levelLabel = invertedDescription
    ? (level === 'low' ? 'Good' : level === 'moderate' ? 'Fair' : 'Low')
    : getScoreLabel(level);

  return (
    <div className={`flex items-center justify-between p-3 rounded-xl border ${colorClass}`}>
      <div>
        <span className="text-sm font-medium">{label}</span>
        <span className="ml-2 text-xs opacity-75">({score}/{maxScore})</span>
      </div>
      <span className="text-xs font-semibold uppercase tracking-wide" aria-label={`${label}: ${levelLabel}`}>
        {levelLabel}
      </span>
    </div>
  );
};

export default ScoreIndicator;
