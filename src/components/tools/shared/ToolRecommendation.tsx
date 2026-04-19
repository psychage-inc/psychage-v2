import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  PenTool,
  Moon,
  NotebookPen,
  BrainCircuit,
  HeartHandshake,
  Pill,
  Users,
  ShieldAlert,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import type { ToolSignal } from '@/lib/tool-orchestration/types';
import { getRecommendations } from '@/lib/tool-orchestration/recommendations';

const ICON_MAP: Record<string, React.ElementType> = {
  PenTool,
  Moon,
  NotebookPen,
  BrainCircuit,
  HeartHandshake,
  Pill,
  Users,
  ShieldAlert,
};

interface ToolRecommendationProps {
  signal: ToolSignal;
  title?: string;
  maxItems?: number;
  className?: string;
}

/**
 * Cross-tool recommendation component — shown after tool completion.
 * Visual pattern: exact copy of CrossToolLinks.tsx from Sleep Architect.
 */
const ToolRecommendation: React.FC<ToolRecommendationProps> = ({
  signal,
  title = 'What to Try Next',
  maxItems = 3,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const recommendations = useMemo(
    () => getRecommendations(signal).slice(0, maxItems),
    [signal, maxItems]
  );

  if (recommendations.length === 0) return null;

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : staggerContainer}
      initial="hidden"
      animate="visible"
      className={`bg-white dark:bg-neutral-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-neutral-700 ${className}`}
    >
      <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-4">
        {title}
      </h3>

      <div className="space-y-2">
        {recommendations.map((rec) => {
          const Icon = ICON_MAP[rec.iconName] || BrainCircuit;

          return (
            <motion.div
              key={rec.slug}
              variants={prefersReducedMotion ? undefined : staggerItem}
            >
              <Link
                to={rec.path}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor:
                      'color-mix(in srgb, var(--color-primary) 12%, transparent)',
                  }}
                >
                  <Icon
                    size={18}
                    className="text-[var(--color-primary)]"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {rec.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-neutral-400 truncate">
                    {rec.relevanceReason}
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-300 dark:text-neutral-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors flex-shrink-0"
                />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ToolRecommendation;
