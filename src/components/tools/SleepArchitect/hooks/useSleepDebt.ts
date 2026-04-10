/**
 * Sleep Debt Hook — Computes rolling sleep debt from diary entries
 */

import { useMemo } from 'react';
import type { SleepEntry, SleepDebtResult } from '@/lib/sleep/types';
import { calculateSleepDebt } from '@/lib/sleep/calculations';

export function useSleepDebt(
  entries: SleepEntry[],
  targetMinutes: number = 480
): SleepDebtResult {
  return useMemo(() => {
    const sorted = [...entries].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    return calculateSleepDebt(sorted, targetMinutes);
  }, [entries, targetMinutes]);
}
