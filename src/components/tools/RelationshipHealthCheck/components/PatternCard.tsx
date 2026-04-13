import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import type { DetectedPattern, PatternSeverity } from '../types';
import { FRAMEWORKS } from '../frameworks';

interface PatternCardProps {
  pattern: DetectedPattern;
  index?: number;
}

const SEVERITY_CONFIG: Record<
  PatternSeverity,
  { icon: React.ReactNode; borderColor: string; bgColor: string; badgeColor: string; label: string }
> = {
  concern: {
    icon: <AlertCircle size={16} />,
    borderColor: 'border-red-200 dark:border-red-900',
    bgColor: 'bg-red-50 dark:bg-red-900/10',
    badgeColor: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    label: 'Concern',
  },
  warning: {
    icon: <AlertTriangle size={16} />,
    borderColor: 'border-amber-200 dark:border-amber-900',
    bgColor: 'bg-amber-50 dark:bg-amber-900/10',
    badgeColor: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    label: 'Worth Noting',
  },
  info: {
    icon: <Info size={16} />,
    borderColor: 'border-border',
    bgColor: 'bg-surface',
    badgeColor: 'bg-primary/10 text-primary',
    label: 'Insight',
  },
};

export const PatternCard: React.FC<PatternCardProps> = ({ pattern, index = 0 }) => {
  const config = SEVERITY_CONFIG[pattern.severity];
  const framework = FRAMEWORKS[pattern.frameworkRef];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className={`rounded-xl border ${config.borderColor} ${config.bgColor} p-4`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 shrink-0 ${pattern.severity === 'concern' ? 'text-red-500 dark:text-red-400' : pattern.severity === 'warning' ? 'text-amber-500 dark:text-amber-400' : 'text-primary'}`}>
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <h4 className="font-semibold text-sm text-text-primary">{pattern.title}</h4>
            <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${config.badgeColor}`}>
              {config.label}
            </span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed mb-2">
            {pattern.description}
          </p>
          <div className="bg-surface-hover dark:bg-surface-active rounded-lg p-2.5 border border-border">
            <p className="text-[11px] text-text-tertiary leading-relaxed italic">
              {pattern.scienceNote}
            </p>
            {framework && (
              <p className="text-[10px] text-text-tertiary mt-1">
                -- {framework.shortName} ({framework.authors}, {framework.year})
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
