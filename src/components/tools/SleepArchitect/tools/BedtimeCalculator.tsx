/**
 * Optimal Bedtime Calculator — Suggests bedtimes based on wake time and sleep cycles.
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { calculateOptimalBedtimes, formatDuration } from '@/lib/sleep/calculations';
import type { BedtimeSuggestion } from '@/lib/sleep/calculations';

interface BedtimeCalculatorProps {
  averageOnset?: number;
}

const BedtimeCalculator: React.FC<BedtimeCalculatorProps> = ({
  averageOnset = 15,
}) => {
  const [wakeTime, setWakeTime] = useState('07:00');
  const [targetCycles, setTargetCycles] = useState(5);

  const suggestions = useMemo(
    () => calculateOptimalBedtimes(wakeTime, averageOnset, targetCycles),
    [wakeTime, averageOnset, targetCycles]
  );

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-neutral-700">
      <div className="flex items-center gap-2 mb-5">
        <Sunrise size={20} className="text-amber-500" />
        <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
          Optimal Bedtime Calculator
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 block mb-1.5">
            Wake Time
          </label>
          <input
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none font-display font-bold text-lg"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-neutral-400 block mb-1.5">
            Target Cycles
          </label>
          <div className="flex gap-2">
            {[3, 4, 5, 6].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setTargetCycles(c)}
                className={cn(
                  'flex-1 py-3 rounded-xl text-sm font-bold transition-colors border',
                  targetCycles === c
                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-600 dark:border-indigo-500'
                    : 'border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-neutral-400 hover:border-gray-300 dark:hover:border-neutral-500'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {averageOnset > 0 && (
        <p className="text-[10px] text-gray-400 dark:text-neutral-500 mb-4">
          Based on your average sleep onset of {averageOnset} minutes
        </p>
      )}

      <div className="space-y-2">
        {suggestions.map((s) => (
          <motion.div
            key={s.cycles}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              'flex items-center justify-between p-4 rounded-xl border transition-all',
              s.recommended
                ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-700'
                : 'bg-gray-50 dark:bg-neutral-700/50 border-gray-100 dark:border-neutral-700'
            )}
          >
            <div className="flex items-center gap-3">
              {s.recommended && (
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
              <div>
                <div className="font-display font-bold text-lg text-gray-900 dark:text-white">
                  {s.bedtime}
                </div>
                <div className="text-[10px] text-gray-500 dark:text-neutral-400">
                  {s.cycles} cycles &middot;{' '}
                  {formatDuration(s.sleep_duration_minutes)} of sleep
                </div>
              </div>
            </div>
            {s.recommended && (
              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/40 px-2 py-0.5 rounded-full">
                Recommended
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BedtimeCalculator;
