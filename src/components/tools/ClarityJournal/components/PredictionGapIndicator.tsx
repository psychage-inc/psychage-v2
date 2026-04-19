import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PredictionGapIndicatorProps {
  predicted: number;
  actual: number;
}

const PredictionGapIndicator: React.FC<PredictionGapIndicatorProps> = ({ predicted, actual }) => {
  const gap = actual - predicted;

  if (gap === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-neutral-400">
        <Minus className="w-3 h-3" /> As expected
      </span>
    );
  }

  if (gap > 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-green-600">
        <TrendingUp className="w-3 h-3" /> +{gap} better than expected
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs text-amber-600">
      <TrendingDown className="w-3 h-3" /> {gap} lower than expected
    </span>
  );
};

export default PredictionGapIndicator;
