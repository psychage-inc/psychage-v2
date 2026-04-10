/**
 * Sleep Calendar — Month grid showing entries with color-coded quality.
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SleepEntry } from '@/lib/sleep/types';

interface SleepCalendarProps {
  entries: SleepEntry[];
  onSelectDate: (date: string) => void;
  selectedDate?: string;
}

function qualityColor(quality: number): string {
  if (quality >= 5) return 'bg-emerald-400 dark:bg-emerald-500';
  if (quality >= 4) return 'bg-teal-400 dark:bg-teal-500';
  if (quality >= 3) return 'bg-amber-400 dark:bg-amber-500';
  if (quality >= 2) return 'bg-orange-400 dark:bg-orange-500';
  return 'bg-red-400 dark:bg-red-500';
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SleepCalendar: React.FC<SleepCalendarProps> = ({
  entries,
  onSelectDate,
  selectedDate,
}) => {
  const [viewDate, setViewDate] = useState(new Date());

  const entryMap = useMemo(() => {
    const map = new Map<string, SleepEntry>();
    entries.forEach((e) => map.set(e.date, e));
    return map;
  }, [entries]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  // Monday-based: 0 = Mon, 6 = Sun
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const today = new Date().toISOString().split('T')[0];

  const prevMonth = () =>
    setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () =>
    setViewDate(new Date(year, month + 1, 1));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white">
          {viewDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </h4>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for offset */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const entry = entryMap.get(dateStr);
          const isToday = dateStr === today;
          const isSelected = dateStr === selectedDate;
          const isFuture = dateStr > today;

          return (
            <motion.button
              key={dateStr}
              type="button"
              onClick={() => !isFuture && onSelectDate(dateStr)}
              disabled={isFuture}
              whileTap={!isFuture ? { scale: 0.9 } : undefined}
              className={cn(
                'aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all relative',
                isFuture && 'opacity-30 cursor-not-allowed',
                isSelected && 'ring-2 ring-indigo-500 ring-offset-1 dark:ring-offset-gray-800',
                isToday && !isSelected && 'ring-1 ring-indigo-300 dark:ring-indigo-600',
                !entry && !isFuture && 'hover:bg-gray-50 dark:hover:bg-gray-700/50',
              )}
            >
              <span
                className={cn(
                  'font-medium',
                  entry
                    ? 'text-white'
                    : isToday
                      ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-gray-600 dark:text-gray-400'
                )}
              >
                {day}
              </span>
              {entry && (
                <div
                  className={cn(
                    'absolute inset-1 rounded-lg -z-10',
                    qualityColor(entry.sleep_quality)
                  )}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-3 mt-4 text-[10px] text-gray-400 dark:text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-red-400" />
          <span>Poor</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
          <span>Fair</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-teal-400" />
          <span>Good</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
          <span>Great</span>
        </div>
      </div>
    </div>
  );
};

export default SleepCalendar;
