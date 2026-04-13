import React from 'react';
import { motion } from 'framer-motion';
import type { DomainKey } from '@/lib/clarity/types';
import { DIMENSION_META, getDimensionTier } from '../../data/dimensions';
import TierBadge from './TierBadge';

interface DimensionBarProps {
  dimensionKey: DomainKey;
  score: number;
  onClick?: () => void;
  delay?: number;
  showTier?: boolean;
}

const DimensionBar: React.FC<DimensionBarProps> = ({
  dimensionKey,
  score,
  onClick,
  delay = 0,
  showTier = false,
}) => {
  const meta = DIMENSION_META[dimensionKey];
  const Icon = meta.icon;
  const pct = Math.min((score / 20) * 100, 100);
  const tier = getDimensionTier(score);

  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      onClick={onClick}
      className={`w-full text-left ${
        onClick
          ? 'cursor-pointer rounded-xl p-3 -mx-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none'
          : ''
      }`}
      {...(onClick ? { type: 'button' as const } : {})}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <Icon size={16} className={meta.tailwindText} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {meta.name}
          </span>
          {showTier && <TierBadge tier={tier} size="sm" />}
        </div>
        <span className="text-sm font-bold text-gray-900 dark:text-white">
          {Math.round(score)}/20
        </span>
      </div>
      <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${meta.tailwindBg}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </Wrapper>
  );
};

export default DimensionBar;
