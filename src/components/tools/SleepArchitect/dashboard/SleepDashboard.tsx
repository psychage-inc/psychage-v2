/**
 * Sleep Dashboard — Tab container with score, charts, and weekly digest.
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Moon, Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import type { useSleepEntries } from '../hooks/useSleepEntries';
import { useSleepScore } from '../hooks/useSleepScore';
import SleepScoreGauge from './SleepScoreGauge';
import DashboardSummaryCards from './DashboardSummaryCards';
import DurationChart from './DurationChart';
import EfficiencyChart from './EfficiencyChart';
import QualityTrend from './QualityTrend';
import WeeklyDigest from './WeeklyDigest';

interface SleepDashboardProps {
  sleepData: ReturnType<typeof useSleepEntries>;
  onSignIn?: () => void;
}

type TimeRange = '7' | '30' | '90';

const SleepDashboard: React.FC<SleepDashboardProps> = ({ sleepData, onSignIn }) => {
  const { isAuthenticated } = useAuth();
  const [range, setRange] = useState<TimeRange>('7');
  const score = useSleepScore(sleepData.entries, parseInt(range), sleepData.settings.age_range);

  const filteredEntries = useMemo(() => {
    return sleepData
      .getRecentEntries(parseInt(range))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [sleepData, range]);

  if (sleepData.entryCount < 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <Moon size={48} className="mx-auto mb-4 text-gray-300 dark:text-neutral-600" />
        <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
          No data yet
        </h3>
        <p className="text-sm text-gray-500 dark:text-neutral-400 max-w-md mx-auto">
          Log your first night in the Diary tab to start seeing your sleep
          dashboard with scores, trends, and weekly insights.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time range toggle */}
      <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 rounded-xl p-1 border border-gray-100 dark:border-neutral-700 w-fit">
        {(['7', '30', '90'] as TimeRange[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-bold transition-colors',
              range === r
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-300'
            )}
          >
            {r}d
          </button>
        ))}
      </div>

      {/* Score + Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <SleepScoreGauge score={score} />
        </div>
        <div className="lg:col-span-3">
          <DashboardSummaryCards
            entries={sleepData.entries}
            scoreOverall={score.overall}
          />
          <div className="mt-6">
            <WeeklyDigest entries={sleepData.entries} />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DurationChart
          entries={filteredEntries}
          targetMinutes={sleepData.settings.target_sleep_minutes}
        />
        <EfficiencyChart entries={filteredEntries} />
      </div>

      <QualityTrend entries={filteredEntries} />

      {/* Level 3: Range auth prompt */}
      {!isAuthenticated && range !== '7' && onSignIn && (
        <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-xl px-4 py-3">
          <Cloud size={16} className="text-indigo-400 flex-shrink-0" />
          <p className="text-xs text-indigo-600 dark:text-indigo-300 flex-1">
            Sign in to preserve your full history across devices and sessions.
          </p>
          <button
            type="button"
            onClick={onSignIn}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex-shrink-0"
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
};

export default SleepDashboard;
