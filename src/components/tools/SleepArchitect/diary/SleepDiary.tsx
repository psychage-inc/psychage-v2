/**
 * Sleep Diary — Tab container with calendar view, entry list, and morning check-in.
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, Calendar, List, Flame, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SleepEntry } from '@/lib/sleep/types';
import type { useSleepEntries } from '../hooks/useSleepEntries';
import MorningCheckIn from './MorningCheckIn';
import SleepCalendar from './SleepCalendar';
import SleepEntryCard from './SleepEntryCard';

interface SleepDiaryProps {
  sleepData: ReturnType<typeof useSleepEntries>;
}

type DiaryView = 'calendar' | 'list';

const SleepDiary: React.FC<SleepDiaryProps> = ({ sleepData }) => {
  const [view, setView] = useState<DiaryView>('calendar');
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [editingEntry, setEditingEntry] = useState<SleepEntry | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  const today = new Date().toISOString().split('T')[0];
  const loggedToday = sleepData.getEntryByDate(today) !== null;

  const handleSave = useCallback(
    (entry: SleepEntry) => {
      sleepData.addEntry(entry);
      setShowCheckIn(false);
      setEditingEntry(null);
    },
    [sleepData]
  );

  const handleEdit = useCallback((entry: SleepEntry) => {
    setEditingEntry(entry);
    setShowCheckIn(true);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      sleepData.deleteEntry(id);
    },
    [sleepData]
  );

  const handleDateSelect = useCallback(
    (date: string) => {
      setSelectedDate(date);
      const existing = sleepData.getEntryByDate(date);
      if (existing) {
        setEditingEntry(existing);
        setShowCheckIn(true);
      } else if (date <= today) {
        setEditingEntry(null);
        setShowCheckIn(true);
      }
    },
    [sleepData, today]
  );

  const sortedEntries = [...sleepData.entries].sort(
    (a, b) => b.date.localeCompare(a.date)
  );

  return (
    <div className="space-y-6">
      {/* Check-in modal/card */}
      <AnimatePresence>
        {showCheckIn && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <MorningCheckIn
              initialDate={selectedDate || today}
              existingEntry={editingEntry}
              onSave={handleSave}
              onClose={() => {
                setShowCheckIn(false);
                setEditingEntry(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls bar */}
      {!showCheckIn && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl p-1 border border-gray-100 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setView('calendar')}
              className={cn(
                'p-2 rounded-lg transition-colors',
                view === 'calendar'
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              )}
              aria-label="Calendar view"
            >
              <Calendar size={16} />
            </button>
            <button
              type="button"
              onClick={() => setView('list')}
              className={cn(
                'p-2 rounded-lg transition-colors',
                view === 'list'
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              )}
              aria-label="List view"
            >
              <List size={16} />
            </button>
          </div>

          {!loggedToday && (
            <button
              type="button"
              onClick={() => {
                setSelectedDate(today);
                setEditingEntry(null);
                setShowCheckIn(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold text-sm px-4 py-2 rounded-xl transition-colors"
            >
              <PenLine size={14} />
              Log Today
            </button>
          )}
        </div>
      )}

      {/* Streak */}
      {sleepData.streak.current > 0 && !showCheckIn && (
        <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 rounded-xl px-4 py-2.5">
          <Flame size={18} className="text-orange-500" />
          <span className="text-sm font-bold text-orange-700 dark:text-orange-300">
            {sleepData.streak.current}-day streak
          </span>
          <span className="text-xs text-orange-500 dark:text-orange-400">
            &middot; Best: {sleepData.streak.best} days &middot;{' '}
            {sleepData.streak.weekly_count}/7 this week
          </span>
        </div>
      )}

      {/* Content */}
      {!showCheckIn && (
        <>
          {view === 'calendar' ? (
            <SleepCalendar
              entries={sleepData.entries}
              onSelectDate={handleDateSelect}
              selectedDate={selectedDate}
            />
          ) : (
            <div className="space-y-3">
              {sortedEntries.length === 0 ? (
                <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                  <Moon size={32} className="mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">No entries yet</p>
                  <p className="text-xs mt-1">
                    Tap "Log Today" to record your first night
                  </p>
                </div>
              ) : (
                sortedEntries.map((entry) => (
                  <SleepEntryCard
                    key={entry.id}
                    entry={entry}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SleepDiary;
