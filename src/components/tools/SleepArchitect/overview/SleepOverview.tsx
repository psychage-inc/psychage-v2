/**
 * Sleep Overview — Landing tab with quick stats and CTA to log.
 * Shows a summary of recent sleep data and encourages daily logging.
 */

import { motion } from 'framer-motion';
import {
  Moon,
  PenLine,
  BarChart3,
  Clock,
  Flame,
  Wind,
  Brain,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useSleepScore } from '../hooks/useSleepScore';
import { formatDuration, calculateMetrics } from '@/lib/sleep/calculations';
import type { SleepTab } from '@/lib/sleep/types';
import type { useSleepEntries } from '../hooks/useSleepEntries';
import SleepDisclaimer from '../shared/SleepDisclaimer';
import SaveDataPrompt from '../shared/SaveDataPrompt';

interface SleepOverviewProps {
  sleepData: ReturnType<typeof useSleepEntries>;
  onNavigateTab: (tab: SleepTab) => void;
  onSignIn?: () => void;
}

function scoreColor(score: number): string {
  if (score >= 80) return 'text-teal-600 dark:text-teal-400';
  if (score >= 60) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 40) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

function scoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Attention';
}

const SleepOverview: React.FC<SleepOverviewProps> = ({
  sleepData,
  onNavigateTab,
  onSignIn,
}) => {
  const { isAuthenticated } = useAuth();
  const score = useSleepScore(sleepData.entries);
  const recentEntries = sleepData.getRecentEntries(7);
  const hasData = recentEntries.length > 0;

  // Check if user already logged today
  const today = new Date().toISOString().split('T')[0];
  const loggedToday = sleepData.getEntryByDate(today) !== null;

  // Recent averages
  const recentMetrics = recentEntries.map(calculateMetrics);
  const avgDuration =
    recentMetrics.length > 0
      ? recentMetrics.reduce((s, m) => s + m.total_sleep_minutes, 0) /
        recentMetrics.length
      : 0;
  const avgEfficiency =
    recentMetrics.length > 0
      ? recentMetrics.reduce((s, m) => s + m.sleep_efficiency, 0) /
        recentMetrics.length
      : 0;

  return (
    <div className="space-y-8">
      {/* Hero / CTA */}
      {!hasData ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <Moon size={40} className="mb-4 opacity-80" />
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
              Start your sleep journey
            </h2>
            <p className="text-indigo-100 text-sm md:text-base mb-6 max-w-lg">
              Log your first night to unlock sleep scores, trends, personalized
              insights, and wind-down tools designed to help you sleep better.
            </p>
            <button
              type="button"
              onClick={() => onNavigateTab('diary')}
              className="inline-flex items-center gap-2 bg-white dark:bg-neutral-900 text-indigo-600 font-bold text-sm px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              <PenLine size={16} />
              Log your first night
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sleep Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 bg-white dark:bg-neutral-800 rounded-[2rem] p-6 md:p-8 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-neutral-700 text-center"
          >
            <div className="text-xs font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider mb-4">
              Sleep Score (7 days)
            </div>
            <div
              className={cn(
                'text-6xl font-display font-bold mb-2',
                scoreColor(score.overall)
              )}
            >
              {score.overall}
            </div>
            <div className={cn('text-sm font-bold', scoreColor(score.overall))}>
              {scoreLabel(score.overall)}
            </div>
            {recentEntries.length < 3 && (
              <div className="text-xs text-gray-400 dark:text-neutral-500 mt-3">
                Log {3 - recentEntries.length} more night
                {3 - recentEntries.length !== 1 ? 's' : ''} for a more accurate
                score
              </div>
            )}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 grid grid-cols-2 gap-4"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-gray-100 dark:border-neutral-700">
              <Clock size={20} className="text-indigo-500 mb-2" />
              <div className="text-xs font-medium text-gray-500 dark:text-neutral-400">
                Avg Duration
              </div>
              <div className="text-xl font-bold font-display text-gray-900 dark:text-white">
                {formatDuration(avgDuration)}
              </div>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-gray-100 dark:border-neutral-700">
              <BarChart3 size={20} className="text-sky-500 mb-2" />
              <div className="text-xs font-medium text-gray-500 dark:text-neutral-400">
                Avg Efficiency
              </div>
              <div className="text-xl font-bold font-display text-gray-900 dark:text-white">
                {Math.round(avgEfficiency)}%
              </div>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-gray-100 dark:border-neutral-700">
              <Flame size={20} className="text-orange-500 mb-2" />
              <div className="text-xs font-medium text-gray-500 dark:text-neutral-400">
                Current Streak
              </div>
              <div className="text-xl font-bold font-display text-gray-900 dark:text-white">
                {sleepData.streak.current} day
                {sleepData.streak.current !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-gray-100 dark:border-neutral-700">
              <Moon size={20} className="text-violet-500 mb-2" />
              <div className="text-xs font-medium text-gray-500 dark:text-neutral-400">
                Nights Logged
              </div>
              <div className="text-xl font-bold font-display text-gray-900 dark:text-white">
                {sleepData.entryCount}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Log Today CTA */}
      {hasData && !loggedToday && (
        <motion.button
          type="button"
          onClick={() => onNavigateTab('diary')}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-2xl p-5 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-3">
            <PenLine size={20} />
            <div className="text-left">
              <div className="font-bold text-sm">Log last night's sleep</div>
              <div className="text-indigo-200 text-xs">
                Takes about 30 seconds
              </div>
            </div>
          </div>
          <ChevronRight size={20} className="text-indigo-200" />
        </motion.button>
      )}

      {/* Quick Actions Grid */}
      {hasData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <button
            type="button"
            onClick={() => onNavigateTab('dashboard')}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-gray-100 dark:border-neutral-700 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors text-left group"
          >
            <BarChart3
              size={20}
              className="text-indigo-500 mb-2 group-hover:scale-110 transition-transform"
            />
            <div className="font-bold text-sm text-gray-900 dark:text-white">
              View Dashboard
            </div>
            <div className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">
              Charts, trends, and weekly digest
            </div>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('wind-down')}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-gray-100 dark:border-neutral-700 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors text-left group"
          >
            <Wind
              size={20}
              className="text-purple-500 mb-2 group-hover:scale-110 transition-transform"
            />
            <div className="font-bold text-sm text-gray-900 dark:text-white">
              Wind Down
            </div>
            <div className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">
              Breathing, relaxation, and brain dump
            </div>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('insights')}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-gray-100 dark:border-neutral-700 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors text-left group"
          >
            <Brain
              size={20}
              className="text-teal-500 mb-2 group-hover:scale-110 transition-transform"
            />
            <div className="font-bold text-sm text-gray-900 dark:text-white">
              Sleep Insights
            </div>
            <div className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">
              Sleep-mood patterns and correlations
            </div>
          </button>
        </motion.div>
      )}

      {/* Save Data Prompt (shown after 3+ entries when not authenticated) */}
      {!isAuthenticated && onSignIn && (
        <SaveDataPrompt
          entryCount={sleepData.entryCount}
          onSignIn={onSignIn}
        />
      )}

      <SleepDisclaimer />
    </div>
  );
};

export default SleepOverview;
