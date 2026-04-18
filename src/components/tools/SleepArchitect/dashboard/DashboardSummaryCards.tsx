/**
 * Dashboard Summary Cards — 4-card grid with key metrics and week-over-week comparison.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, TrendingUp, TrendingDown, Minus, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SleepEntry } from '@/lib/sleep/types';
import { calculateMetrics, formatDuration, calculateStreak } from '@/lib/sleep/calculations';

interface DashboardSummaryCardsProps {
  entries: SleepEntry[];
  scoreOverall: number;
}

function average(vals: number[]): number {
  return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
}

function getTrend(current: number, previous: number): { icon: React.ReactNode; text: string; color: string } {
  const diff = current - previous;
  if (Math.abs(diff) < 0.5) return { icon: <Minus size={12} />, text: 'Steady', color: 'text-gray-400' };
  if (diff > 0) return { icon: <TrendingUp size={12} />, text: `+${diff.toFixed(0)}`, color: 'text-emerald-600 dark:text-emerald-400' };
  return { icon: <TrendingDown size={12} />, text: `${diff.toFixed(0)}`, color: 'text-red-600 dark:text-red-400' };
}

const DashboardSummaryCards: React.FC<DashboardSummaryCardsProps> = ({
  entries,
  scoreOverall,
}) => {
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const twoWeeksAgo = new Date(now);
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const weekStr = weekAgo.toISOString().split('T')[0];
  const twoWeekStr = twoWeeksAgo.toISOString().split('T')[0];

  const thisWeek = entries.filter((e) => e.date >= weekStr);
  const lastWeek = entries.filter((e) => e.date >= twoWeekStr && e.date < weekStr);

  const thisMetrics = thisWeek.map(calculateMetrics);
  const lastMetrics = lastWeek.map(calculateMetrics);

  const avgDurThis = average(thisMetrics.map((m) => m.total_sleep_minutes));
  const avgDurLast = average(lastMetrics.map((m) => m.total_sleep_minutes));
  const avgEffThis = average(thisMetrics.map((m) => m.sleep_efficiency));
  const avgEffLast = average(lastMetrics.map((m) => m.sleep_efficiency));

  const durTrend = getTrend(avgDurThis, avgDurLast);
  const effTrend = getTrend(avgEffThis, avgEffLast);
  const streak = calculateStreak(entries);

  const cards = [
    {
      label: 'Avg Duration',
      value: formatDuration(avgDurThis),
      trend: lastWeek.length > 0 ? durTrend : null,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800',
      icon: <Clock size={20} />,
    },
    {
      label: 'Avg Efficiency',
      value: `${Math.round(avgEffThis)}%`,
      trend: lastWeek.length > 0 ? effTrend : null,
      color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20 border-sky-100 dark:border-sky-800',
      icon: <Zap size={20} />,
    },
    {
      label: 'Sleep Score',
      value: `${scoreOverall}`,
      trend: null,
      color: scoreOverall >= 60
        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800'
        : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800',
      icon: <TrendingUp size={20} />,
    },
    {
      label: 'Streak',
      value: `${streak.current} day${streak.current !== 1 ? 's' : ''}`,
      trend: null,
      extra: `Best: ${streak.best}`,
      color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800',
      icon: <Flame size={20} />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className={cn(
            'rounded-2xl p-4 border',
            card.color
          )}
        >
          <div className="mb-2">{card.icon}</div>
          <div className="text-xs font-medium text-gray-500 dark:text-neutral-400">
            {card.label}
          </div>
          <div className="text-xl font-bold font-display">{card.value}</div>
          {card.trend && (
            <div className={cn('flex items-center gap-1 text-[10px] font-bold mt-1', card.trend.color)}>
              {card.trend.icon}
              <span>{card.trend.text} vs last week</span>
            </div>
          )}
          {(card as any).extra && (
            <div className="text-[10px] text-gray-400 dark:text-neutral-500 mt-1">
              {(card as any).extra}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardSummaryCards;
