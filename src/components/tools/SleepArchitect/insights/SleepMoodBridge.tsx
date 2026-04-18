/**
 * Sleep-Mood Bridge — Cross-tool correlation display.
 * Computes Pearson correlations between sleep and mood data.
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SleepEntry, SleepMoodCorrelation } from '@/lib/sleep/types';
import { calculateSleepMoodCorrelations } from '@/lib/sleep/calculations';

interface SleepMoodBridgeProps {
  sleepEntries: SleepEntry[];
}

function correlationIcon(r: number): React.ReactNode {
  if (Math.abs(r) < 0.2)
    return <Minus size={14} className="text-gray-400" />;
  if (r > 0)
    return <TrendingUp size={14} className="text-emerald-500" />;
  return <TrendingDown size={14} className="text-red-500" />;
}

function significanceColor(sig: string): string {
  switch (sig) {
    case 'strong':
      return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300';
    case 'moderate':
      return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300';
    case 'weak':
      return 'bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-neutral-400';
    default:
      return 'bg-gray-50 dark:bg-neutral-800 text-gray-400 dark:text-neutral-500';
  }
}

const SleepMoodBridge: React.FC<SleepMoodBridgeProps> = ({
  sleepEntries,
}) => {
  // Try to load mood entries from localStorage (Mood Journal / Clarity Journal)
  const moodEntries = useMemo(() => {
    try {
      const raw = localStorage.getItem('psychage_mood_entries');
      if (raw) return JSON.parse(raw);
      // Fallback: try clarity journal entries
      const clarity = localStorage.getItem('psychage_clarity_journal');
      if (clarity) {
        const entries = JSON.parse(clarity);
        return entries.map((e: any) => ({
          date: e.date,
          valence: e.mood_score ?? e.valence,
          anxiety: e.anxiety,
          energy: e.energy,
        }));
      }
      return [];
    } catch {
      return [];
    }
  }, []);

  const correlations = useMemo(
    () => calculateSleepMoodCorrelations(sleepEntries, moodEntries),
    [sleepEntries, moodEntries]
  );

  const topCorrelations = correlations.filter(
    (c) => c.significance !== 'none'
  ).slice(0, 3);

  if (sleepEntries.length < 14 || moodEntries.length < 14) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-neutral-700">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 size={20} className="text-teal-500" />
          <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
            Sleep-Mood Patterns
          </h3>
        </div>
        <div className="text-center py-8">
          <div className="text-3xl mb-3">🔬</div>
          <p className="text-sm text-gray-500 dark:text-neutral-400 max-w-sm mx-auto">
            We need at least 14 days of both sleep and mood data to find
            patterns. Keep logging in both the Sleep Architect and Mood Journal.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400 dark:text-neutral-500">
            <div>
              Sleep: {sleepEntries.length}/14 days
            </div>
            <div>
              Mood: {moodEntries.length}/14 days
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-neutral-700">
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 size={20} className="text-teal-500" />
        <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
          Sleep-Mood Patterns
        </h3>
      </div>

      {topCorrelations.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-neutral-400">
          No significant correlations found yet. This may improve with more data.
        </p>
      ) : (
        <div className="space-y-3">
          {topCorrelations.map((c, i) => (
            <motion.div
              key={`${c.sleep_metric}-${c.mood_metric}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 dark:bg-neutral-700/50 rounded-xl p-4 border border-gray-100 dark:border-neutral-700"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {correlationIcon(c.correlation_coefficient)}
                  <span className="text-xs font-bold text-gray-700 dark:text-neutral-300">
                    {c.sleep_metric} → {c.mood_metric}
                  </span>
                </div>
                <span
                  className={cn(
                    'text-[10px] font-bold px-2 py-0.5 rounded-full',
                    significanceColor(c.significance)
                  )}
                >
                  {c.significance} (r={c.correlation_coefficient})
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-neutral-400 leading-relaxed">
                {c.insight}
              </p>
              <div className="text-[10px] text-gray-400 dark:text-neutral-500 mt-1">
                Based on {c.sample_size} matched days
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SleepMoodBridge;
