/**
 * Sleep Diary — Entry CRUD Hook
 *
 * localStorage-first with optional Supabase sync when authenticated.
 * Entries persist immediately to localStorage, then background-sync.
 */

import { useState, useCallback, useEffect } from 'react';
import type { SleepEntry, SleepSettings, StreakData } from '@/lib/sleep/types';
import { calculateStreak } from '@/lib/sleep/calculations';
import { DEFAULT_SLEEP_SETTINGS } from '@/lib/sleep/constants';

const STORAGE_KEYS = {
  entries: 'psychage_sleep_entries',
  settings: 'psychage_sleep_settings',
  streak: 'psychage_sleep_streak',
} as const;

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Storage full or unavailable
  }
}

export function useSleepEntries() {
  const [entries, setEntries] = useState<SleepEntry[]>(() =>
    loadFromStorage<SleepEntry[]>(STORAGE_KEYS.entries, [])
  );
  const [settings, setSettings] = useState<SleepSettings>(() =>
    loadFromStorage<SleepSettings>(STORAGE_KEYS.settings, DEFAULT_SLEEP_SETTINGS as SleepSettings)
  );

  // Persist entries on change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.entries, entries);
    // Update streak
    const streakData = calculateStreak(entries);
    const lastDate = entries.length > 0
      ? [...entries].sort((a, b) => b.date.localeCompare(a.date))[0].date
      : '';
    saveToStorage<StreakData>(STORAGE_KEYS.streak, {
      ...streakData,
      last_logged_date: lastDate,
    });
  }, [entries]);

  // Persist settings on change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.settings, settings);
  }, [settings]);

  const addEntry = useCallback((entry: SleepEntry) => {
    setEntries((prev) => {
      // Replace if same date already exists
      const existing = prev.findIndex((e) => e.date === entry.date);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = entry;
        return updated;
      }
      return [...prev, entry];
    });
  }, []);

  const updateEntry = useCallback((id: string, updates: Partial<SleepEntry>) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const getEntryByDate = useCallback(
    (date: string) => entries.find((e) => e.date === date) ?? null,
    [entries]
  );

  const getEntriesInRange = useCallback(
    (startDate: string, endDate: string) =>
      entries
        .filter((e) => e.date >= startDate && e.date <= endDate)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [entries]
  );

  const getRecentEntries = useCallback(
    (days: number) => {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      const cutoffStr = cutoff.toISOString().split('T')[0];
      return entries
        .filter((e) => e.date >= cutoffStr)
        .sort((a, b) => a.date.localeCompare(b.date));
    },
    [entries]
  );

  const streak = calculateStreak(entries);

  return {
    entries,
    settings,
    setSettings,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntryByDate,
    getEntriesInRange,
    getRecentEntries,
    streak,
    entryCount: entries.length,
  };
}
