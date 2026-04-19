/**
 * Weekly Digest — Template-generated natural language summary.
 */

import React, { useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import type { SleepEntry } from '@/lib/sleep/types';
import { generateWeeklyDigest } from '@/lib/sleep/templates';

interface WeeklyDigestProps {
  entries: SleepEntry[];
}

const WeeklyDigest: React.FC<WeeklyDigestProps> = ({ entries }) => {
  const digest = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const twoWeeksAgo = new Date(now);
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const weekStr = weekAgo.toISOString().split('T')[0];
    const twoWeekStr = twoWeeksAgo.toISOString().split('T')[0];

    const thisWeek = entries
      .filter((e) => e.date >= weekStr)
      .sort((a, b) => a.date.localeCompare(b.date));
    const lastWeek = entries
      .filter((e) => e.date >= twoWeekStr && e.date < weekStr)
      .sort((a, b) => a.date.localeCompare(b.date));

    return generateWeeklyDigest(thisWeek, lastWeek);
  }, [entries]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-5 border border-indigo-100 dark:border-indigo-800">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen size={16} className="text-indigo-500" />
        <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white">
          Weekly Summary
        </h4>
      </div>
      <p className="text-sm text-gray-700 dark:text-neutral-300 leading-relaxed">
        {digest}
      </p>
    </div>
  );
};

export default WeeklyDigest;
