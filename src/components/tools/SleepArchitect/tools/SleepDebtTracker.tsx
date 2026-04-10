/**
 * Sleep Debt Tracker — Visual meter showing accumulated sleep debt.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSleepDebt } from '../hooks/useSleepDebt';
import { formatDuration } from '@/lib/sleep/calculations';
import type { useSleepEntries } from '../hooks/useSleepEntries';

interface SleepDebtTrackerProps {
  sleepData: ReturnType<typeof useSleepEntries>;
}

function debtColor(minutes: number): string {
  if (minutes === 0) return 'bg-emerald-500';
  if (minutes < 60) return 'bg-teal-500';
  if (minutes < 180) return 'bg-amber-500';
  if (minutes < 360) return 'bg-orange-500';
  return 'bg-red-500';
}

function debtLabel(minutes: number): string {
  if (minutes === 0) return 'No debt — well done!';
  if (minutes < 60) return 'Minimal debt';
  if (minutes < 180) return 'Moderate debt';
  if (minutes < 360) return 'Significant debt';
  return 'High debt — prioritize rest';
}

const SleepDebtTracker: React.FC<SleepDebtTrackerProps> = ({ sleepData }) => {
  const debt = useSleepDebt(
    sleepData.entries,
    sleepData.settings.target_sleep_minutes
  );

  const maxDebt = 600; // 10 hours
  const debtPercent = Math.min(100, (debt.total_debt_minutes / maxDebt) * 100);

  if (sleepData.entryCount < 3) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={20} className="text-amber-500" />
          <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
            Sleep Debt
          </h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Log at least 3 nights to see your sleep debt calculation.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-5">
        <Clock size={20} className="text-amber-500" />
        <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
          Sleep Debt (14-day)
        </h3>
      </div>

      {/* Debt meter */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
          <span>0h</span>
          <span className="font-bold text-gray-900 dark:text-white">
            {formatDuration(debt.total_debt_minutes)}
          </span>
          <span>10h+</span>
        </div>
        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${debtPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={cn('h-full rounded-full', debtColor(debt.total_debt_minutes))}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
          {debtLabel(debt.total_debt_minutes)}
        </p>
      </div>

      {/* Recovery estimate */}
      {debt.total_debt_minutes > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl p-3 flex items-start gap-2">
          <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-300">
            At your current rate, you could recover this debt in approximately{' '}
            <span className="font-bold">{debt.recovery_days_estimate} days</span>{' '}
            by sleeping an extra 30 minutes each night.
          </p>
        </div>
      )}

      {/* Daily deficits */}
      {debt.daily_deficits.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Recent deficits
          </h4>
          <div className="flex gap-1">
            {debt.daily_deficits.slice(-7).map((d) => {
              const height = Math.max(4, Math.min(40, (d.deficit_minutes / 120) * 40));
              return (
                <div
                  key={d.date}
                  className="flex-1 flex flex-col items-center justify-end"
                >
                  <div
                    className={cn(
                      'w-full rounded-t-sm',
                      d.deficit_minutes > 0
                        ? 'bg-red-300 dark:bg-red-700'
                        : 'bg-emerald-300 dark:bg-emerald-700'
                    )}
                    style={{ height: `${height}px` }}
                    title={`${d.date}: ${d.deficit_minutes > 0 ? `-${formatDuration(d.deficit_minutes)}` : 'On target'}`}
                  />
                  <span className="text-[8px] text-gray-400 dark:text-gray-500 mt-1">
                    {new Date(d.date + 'T12:00:00').toLocaleDateString('en-US', {
                      weekday: 'narrow',
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SleepDebtTracker;
