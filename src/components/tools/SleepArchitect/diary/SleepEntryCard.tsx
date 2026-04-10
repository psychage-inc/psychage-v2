/**
 * Sleep Entry Card — Displays a single diary entry's summary.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Clock, Zap, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SleepEntry } from '@/lib/sleep/types';
import { calculateMetrics, formatDuration } from '@/lib/sleep/calculations';

interface SleepEntryCardProps {
  entry: SleepEntry;
  onEdit: (entry: SleepEntry) => void;
  onDelete: (id: string) => void;
}

const QUALITY_EMOJIS = ['', '😫', '😕', '😐', '🙂', '😴'];

function efficiencyColor(eff: number): string {
  if (eff >= 90) return 'text-emerald-600 dark:text-emerald-400';
  if (eff >= 85) return 'text-teal-600 dark:text-teal-400';
  if (eff >= 75) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

const SleepEntryCard: React.FC<SleepEntryCardProps> = ({
  entry,
  onEdit,
  onDelete,
}) => {
  const metrics = calculateMetrics(entry);
  const dateObj = new Date(entry.date + 'T12:00:00');
  const dayLabel = dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{QUALITY_EMOJIS[entry.sleep_quality]}</span>
          <div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">
              {dayLabel}
            </div>
            <div className="text-[10px] text-gray-400 dark:text-gray-500">
              {entry.bedtime} → {entry.wake_time}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(entry)}
            className="p-1.5 text-gray-300 dark:text-gray-600 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            aria-label="Edit entry"
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(entry.id)}
            className="p-1.5 text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            aria-label="Delete entry"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <Moon size={14} className="text-violet-500 mx-auto mb-0.5" />
          <div className="text-xs font-bold text-gray-900 dark:text-white">
            {formatDuration(metrics.total_sleep_minutes)}
          </div>
          <div className="text-[10px] text-gray-400 dark:text-gray-500">Sleep</div>
        </div>
        <div className="text-center">
          <Zap size={14} className="text-sky-500 mx-auto mb-0.5" />
          <div
            className={cn(
              'text-xs font-bold',
              efficiencyColor(metrics.sleep_efficiency)
            )}
          >
            {Math.round(metrics.sleep_efficiency)}%
          </div>
          <div className="text-[10px] text-gray-400 dark:text-gray-500">
            Efficiency
          </div>
        </div>
        <div className="text-center">
          <Clock size={14} className="text-amber-500 mx-auto mb-0.5" />
          <div className="text-xs font-bold text-gray-900 dark:text-white">
            {entry.sleep_onset_minutes}m
          </div>
          <div className="text-[10px] text-gray-400 dark:text-gray-500">
            Onset
          </div>
        </div>
      </div>

      {/* Substance badges */}
      {(entry.substances.caffeine_last_time ||
        entry.substances.alcohol ||
        entry.substances.exercise ||
        entry.substances.medication_sleep_aid) && (
        <div className="flex flex-wrap gap-1 mt-2">
          {entry.substances.caffeine_last_time && (
            <span className="text-[10px] font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded-full">
              Caffeine {entry.substances.caffeine_last_time}
            </span>
          )}
          {entry.substances.alcohol && (
            <span className="text-[10px] font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded-full">
              Alcohol
            </span>
          )}
          {entry.substances.exercise && (
            <span className="text-[10px] font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-full">
              Exercise
            </span>
          )}
          {entry.substances.medication_sleep_aid && (
            <span className="text-[10px] font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full">
              Sleep aid
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SleepEntryCard;
