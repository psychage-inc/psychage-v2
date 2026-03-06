import React from 'react';
import type { CulturalCompetency } from '@/lib/providers/types';

interface CulturalBadgeProps {
  competency: CulturalCompetency;
}

export const CulturalBadge: React.FC<CulturalBadgeProps> = ({ competency }) => (
  <span className="inline-flex items-center text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded-full border border-purple-100 dark:border-purple-800">
    {competency.label}
  </span>
);
