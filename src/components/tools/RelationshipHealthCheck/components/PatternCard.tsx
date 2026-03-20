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
    borderColor: 'border-red-200',
    bgColor: 'bg-red-50',
    badgeColor: 'bg-red-100 text-red-700',
    label: 'Concern',
  },
  warning: {
    icon: <AlertTriangle size={16} />,
    borderColor: 'border-amber-200',
    bgColor: 'bg-amber-50',
    badgeColor: 'bg-amber-100 text-amber-700',
    label: 'Worth Noting',
  },
  info: {
    icon: <Info size={16} />,
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    badgeColor: 'bg-blue-100 text-blue-700',
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
        <div className={`mt-0.5 shrink-0 ${pattern.severity === 'concern' ? 'text-red-500' : pattern.severity === 'warning' ? 'text-amber-500' : 'text-blue-500'}`}>
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <h4 className="font-bold text-sm text-gray-900">{pattern.title}</h4>
            <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${config.badgeColor}`}>
              {config.label}
            </span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-2">
            {pattern.description}
          </p>
          <div className="bg-white/60 rounded-lg p-2.5">
            <p className="text-[11px] text-gray-500 leading-relaxed italic">
              {pattern.scienceNote}
            </p>
            {framework && (
              <p className="text-[10px] text-gray-400 mt-1">
                — {framework.shortName} ({framework.authors}, {framework.year})
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
