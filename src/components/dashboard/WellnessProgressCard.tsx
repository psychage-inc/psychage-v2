import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, Wrench, Calendar } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useWellnessProgress } from '@/hooks/useWellnessProgress';

const WellnessProgressCard: React.FC = () => {
  const reduced = useReducedMotion();
  const progress = useWellnessProgress();

  const stats = [
    {
      icon: Calendar,
      label: 'Days Active',
      value: progress.daysActive,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      icon: BookOpen,
      label: 'Articles Read',
      value: progress.articlesRead,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
    },
    {
      icon: Wrench,
      label: 'Tools Used',
      value: progress.toolsUsed.length,
      color: 'text-teal-500',
      bg: 'bg-teal-500/10',
    },
    {
      icon: TrendingUp,
      label: 'Tool Sessions',
      value: progress.totalToolSessions,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
    },
  ];

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.35 }}
    >
      <div className="p-5 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp size={14} className="text-primary" />
          </div>
          <span className="text-xs font-medium text-gray-500 dark:text-neutral-400 tracking-wide uppercase">
            Your Journey
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                <stat.icon size={14} className={stat.color} />
              </div>
              <div>
                <motion.span
                  initial={reduced ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="text-lg font-display font-bold text-gray-900 dark:text-white tabular-nums"
                >
                  {stat.value}
                </motion.span>
                <p className="text-[10px] text-gray-400 dark:text-neutral-500 leading-tight">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {progress.toolsUsed.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-neutral-800">
            <p className="text-[10px] text-gray-400 dark:text-neutral-500 mb-1.5">
              Tools you've used
            </p>
            <div className="flex flex-wrap gap-1">
              {progress.toolsUsed.map((tool) => (
                <span
                  key={tool}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-surface-hover text-text-secondary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WellnessProgressCard;
