/**
 * Sleep Score Hook — Computes the composite sleep score from recent entries
 */

import { useMemo } from 'react';
import type { SleepEntry, SleepScoreBreakdown } from '@/lib/sleep/types';
import { calculateSleepScore } from '@/lib/sleep/calculations';

export function useSleepScore(
  entries: SleepEntry[],
  days: number = 7,
  ageRange: string = 'adult_26_64'
): SleepScoreBreakdown {
  return useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString().split('T')[0];
    const recent = entries
      .filter((e) => e.date >= cutoffStr)
      .sort((a, b) => a.date.localeCompare(b.date));
    return calculateSleepScore(recent, ageRange);
  }, [entries, days, ageRange]);
}
