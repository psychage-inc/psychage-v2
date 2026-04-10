/**
 * Sleep Dashboard — Tab container with score, charts, and weekly digest.
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
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
}

type TimeRange = '7' | '30' | '90';

const SleepDashboard: React.FC<SleepDashboardProps> = ({ sleepData }) => {
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
        <Moon size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
        <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
          No data yet
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Log your first night in the Diary tab to start seeing your sleep
          dashboard with scores, trends, and weekly insights.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time range toggle */}
      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl p-1 border border-gray-100 dark:border-gray-700 w-fit">
        {(['7', '30', '90'] as TimeRange[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-bold transition-colors',
              range === r
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
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
    </div>
  );
};

export default SleepDashboard;
