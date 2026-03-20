import React from 'react';
import { Brain } from 'lucide-react';
import type { FourHorsemenResult, DetectedPattern } from '../types';
import { FourHorsemenCard } from './FourHorsemenCard';
import { PatternCard } from './PatternCard';

interface ClinicalInsightsProps {
  fourHorsemen: FourHorsemenResult | null;
  patterns: DetectedPattern[];
  skipPartner: boolean;
}

export const ClinicalInsights: React.FC<ClinicalInsightsProps> = ({
  fourHorsemen,
  patterns,
  skipPartner,
}) => {
  const showHorsemen = !skipPartner && fourHorsemen && fourHorsemen.overallRisk !== 'low';
  const hasPatterns = patterns.length > 0;

  if (!showHorsemen && !hasPatterns) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Brain size={20} className="text-indigo-600" />
        <h2 className="font-display font-bold text-xl text-gray-900">
          Clinical Insights
        </h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Patterns detected in your responses, grounded in validated research
      </p>

      <div className="space-y-4">
        {showHorsemen && <FourHorsemenCard fourHorsemen={fourHorsemen} />}

        {hasPatterns && (
          <div className="space-y-3">
            {patterns.map((pattern, i) => (
              <PatternCard key={pattern.key} pattern={pattern} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
