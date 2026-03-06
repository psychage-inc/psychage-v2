import React from 'react';
import type { ScoreTier } from '@/lib/clarity/types';
import { getScoreTierColor } from '@/lib/clarity/scoring';

interface TierBadgeProps {
  tier: ScoreTier;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

const tierBgClasses: Record<ScoreTier, string> = {
  thriving: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  balanced: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  struggling: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  distressed: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  crisis: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const TierBadge: React.FC<TierBadgeProps> = ({ tier, label, size = 'md' }) => {
  const colors = getScoreTierColor(tier);
  const displayLabel = label || tier.charAt(0).toUpperCase() + tier.slice(1);

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${sizeClasses[size]} ${tierBgClasses[tier]}`}
    >
      {displayLabel}
    </span>
  );
};

export default TierBadge;
