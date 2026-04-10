/**
 * Sleep Architect V2 — Pure Calculation Functions
 *
 * All sleep metrics, scores, debt, and correlation computations.
 * These are pure functions with no side effects — safe for testing.
 */

import type {
  SleepEntry,
  SleepMetrics,
  SleepScoreBreakdown,
  SleepDebtResult,
  SleepMoodCorrelation,
  SleepMetricKey,
  MoodMetricKey,
} from './types';
import { SLEEP_RECOMMENDATIONS } from './constants';

// ─── Time Helpers ───────────────────────────────────────────────────────────

/** Parse "HH:MM" to minutes since midnight */
export function parseTime(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + (m || 0);
}

/** Convert minutes since midnight to "HH:MM" (wraps >1440) */
export function formatTime(minutes: number): string {
  const wrapped = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(wrapped / 60);
  const m = wrapped % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

/** Format minutes as "Xh Ym" */
export function formatDuration(minutes: number): string {
  const h = Math.floor(Math.abs(minutes) / 60);
  const m = Math.round(Math.abs(minutes) % 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/**
 * Minutes between two HH:MM times (handles midnight crossing).
 * Assumes end is after start (wrapping through midnight if needed).
 */
export function minutesBetween(start: string, end: string): number {
  const s = parseTime(start);
  const e = parseTime(end);
  if (e > s) return e - s;
  return 1440 - s + e;
}

// ─── Entry Metrics ──────────────────────────────────────────────────────────

/** Compute derived sleep metrics from a single diary entry */
export function calculateMetrics(entry: SleepEntry): SleepMetrics {
  const time_in_bed_minutes = minutesBetween(entry.bedtime, entry.out_of_bed_time);
  const sleep_latency_minutes = entry.sleep_onset_minutes;
  const wake_after_sleep_onset = entry.night_waking_duration_minutes;
  const total_sleep_minutes = Math.max(
    0,
    time_in_bed_minutes - sleep_latency_minutes - wake_after_sleep_onset
  );
  const sleep_efficiency =
    time_in_bed_minutes > 0
      ? (total_sleep_minutes / time_in_bed_minutes) * 100
      : 0;

  // Midpoint of sleep: lights_out + onset + (total_sleep / 2)
  const lights_out_min = parseTime(entry.lights_out);
  const sleep_start = lights_out_min + sleep_latency_minutes;
  const midpoint_min = sleep_start + total_sleep_minutes / 2;
  const midpoint_of_sleep = formatTime(midpoint_min);

  return {
    time_in_bed_minutes,
    total_sleep_minutes,
    sleep_efficiency,
    sleep_latency_minutes,
    wake_after_sleep_onset,
    midpoint_of_sleep,
  };
}

// ─── Sleep Score (0–100) ────────────────────────────────────────────────────

const SCORE_WEIGHTS = {
  duration: 0.25,
  efficiency: 0.25,
  quality: 0.2,
  consistency: 0.15,
  latency: 0.15,
};

function scoreDuration(avgMinutes: number, ageRange: string): number {
  const rec = SLEEP_RECOMMENDATIONS[ageRange] ?? SLEEP_RECOMMENDATIONS.adult_26_64;
  if (avgMinutes >= rec.min && avgMinutes <= rec.max) return 100;
  if (avgMinutes < rec.min) {
    const deficit = rec.min - avgMinutes;
    return Math.max(0, 100 - deficit * 0.5);
  }
  // Over max
  const excess = avgMinutes - rec.max;
  return Math.max(0, 100 - excess * 0.3);
}

function scoreEfficiency(avgEfficiency: number): number {
  // 85%+ is target
  return Math.min(100, (avgEfficiency / 85) * 100);
}

function scoreQuality(avgQuality: number): number {
  return (avgQuality / 5) * 100;
}

function scoreConsistency(entries: SleepEntry[]): number {
  if (entries.length < 2) return 100;
  const bedtimes = entries.map((e) => {
    const mins = parseTime(e.bedtime);
    // Normalize around midnight: convert PM times to negative
    return mins > 720 ? mins - 1440 : mins;
  });
  const mean = bedtimes.reduce((a, b) => a + b, 0) / bedtimes.length;
  const variance =
    bedtimes.reduce((sum, t) => sum + (t - mean) ** 2, 0) / bedtimes.length;
  const stddev = Math.sqrt(variance);
  // 0 stddev = 100 score, 60+ min stddev = 0 score
  return Math.max(0, Math.min(100, 100 - (stddev / 60) * 100));
}

function scoreLatency(avgLatency: number): number {
  // Ideal: 10–20 min
  if (avgLatency >= 10 && avgLatency <= 20) return 100;
  if (avgLatency < 10) {
    // Falling asleep too fast may indicate sleep deprivation
    return Math.max(60, 100 - (10 - avgLatency) * 4);
  }
  // Too long
  return Math.max(0, 100 - (avgLatency - 20) * 2);
}

/** Calculate composite sleep score from last N days of entries */
export function calculateSleepScore(
  entries: SleepEntry[],
  ageRange: string = 'adult_26_64'
): SleepScoreBreakdown {
  if (entries.length === 0) {
    return {
      overall: 0,
      duration: 0,
      efficiency: 0,
      quality: 0,
      consistency: 0,
      latency: 0,
    };
  }

  const metrics = entries.map(calculateMetrics);
  const avgDuration =
    metrics.reduce((s, m) => s + m.total_sleep_minutes, 0) / metrics.length;
  const avgEfficiency =
    metrics.reduce((s, m) => s + m.sleep_efficiency, 0) / metrics.length;
  const avgQuality =
    entries.reduce((s, e) => s + e.sleep_quality, 0) / entries.length;
  const avgLatency =
    entries.reduce((s, e) => s + e.sleep_onset_minutes, 0) / entries.length;

  const duration = scoreDuration(avgDuration, ageRange);
  const efficiency = scoreEfficiency(avgEfficiency);
  const quality = scoreQuality(avgQuality);
  const consistency = scoreConsistency(entries);
  const latency = scoreLatency(avgLatency);

  const overall = Math.round(
    duration * SCORE_WEIGHTS.duration +
      efficiency * SCORE_WEIGHTS.efficiency +
      quality * SCORE_WEIGHTS.quality +
      consistency * SCORE_WEIGHTS.consistency +
      latency * SCORE_WEIGHTS.latency
  );

  return {
    overall: Math.min(100, Math.max(0, overall)),
    duration: Math.round(duration),
    efficiency: Math.round(efficiency),
    quality: Math.round(quality),
    consistency: Math.round(consistency),
    latency: Math.round(latency),
  };
}

// ─── Sleep Debt ─────────────────────────────────────────────────────────────

export function calculateSleepDebt(
  entries: SleepEntry[],
  targetMinutes: number
): SleepDebtResult {
  const last14 = entries.slice(-14);
  const daily_deficits = last14.map((entry) => {
    const metrics = calculateMetrics(entry);
    const deficit = Math.max(0, targetMinutes - metrics.total_sleep_minutes);
    return { date: entry.date, deficit_minutes: deficit };
  });

  const total_debt_minutes = daily_deficits.reduce(
    (sum, d) => sum + d.deficit_minutes,
    0
  );

  // Estimate recovery: assume user can get ~30 min extra per night
  const recovery_days_estimate =
    total_debt_minutes > 0 ? Math.ceil(total_debt_minutes / 30) : 0;

  return {
    total_debt_minutes,
    daily_deficits,
    recovery_days_estimate,
  };
}

// ─── Optimal Bedtime Calculator ─────────────────────────────────────────────

export interface BedtimeSuggestion {
  bedtime: string;
  cycles: number;
  sleep_duration_minutes: number;
  recommended: boolean;
}

export function calculateOptimalBedtimes(
  wakeTime: string,
  onsetMinutes: number = 15,
  targetCycles: number = 5
): BedtimeSuggestion[] {
  const wakeMin = parseTime(wakeTime);

  return [6, 5, 4, 3].map((cycles) => {
    const sleepMin = cycles * 90;
    const totalMin = sleepMin + onsetMinutes;
    const bedMin = wakeMin - totalMin;
    return {
      bedtime: formatTime(bedMin),
      cycles,
      sleep_duration_minutes: sleepMin,
      recommended: cycles === targetCycles,
    };
  });
}

// ─── Streak Calculation ─────────────────────────────────────────────────────

export function calculateStreak(
  entries: SleepEntry[]
): { current: number; best: number; weekly_count: number } {
  if (entries.length === 0) return { current: 0, best: 0, weekly_count: 0 };

  // Sort by date descending
  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Current streak
  let current = 0;
  const firstDate = new Date(sorted[0].date);
  firstDate.setHours(0, 0, 0, 0);
  const daysSinceFirst = Math.floor(
    (today.getTime() - firstDate.getTime()) / 86400000
  );

  // If most recent entry is more than 1 day old, streak is 0
  if (daysSinceFirst > 1) {
    current = 0;
  } else {
    current = 1;
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1].date);
      const curr = new Date(sorted[i].date);
      prev.setHours(0, 0, 0, 0);
      curr.setHours(0, 0, 0, 0);
      const diff = Math.floor(
        (prev.getTime() - curr.getTime()) / 86400000
      );
      if (diff === 1) {
        current++;
      } else {
        break;
      }
    }
  }

  // Best streak (scan all entries)
  let best = 1;
  let tempStreak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].date);
    const curr = new Date(sorted[i].date);
    prev.setHours(0, 0, 0, 0);
    curr.setHours(0, 0, 0, 0);
    const diff = Math.floor(
      (prev.getTime() - curr.getTime()) / 86400000
    );
    if (diff === 1) {
      tempStreak++;
      best = Math.max(best, tempStreak);
    } else {
      tempStreak = 1;
    }
  }
  best = Math.max(best, current);

  // Weekly count (entries in the last 7 days)
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekly_count = sorted.filter(
    (e) => new Date(e.date) >= weekAgo
  ).length;

  return { current, best, weekly_count };
}

// ─── Sleep-Mood Correlation ─────────────────────────────────────────────────

interface MoodEntry {
  date: string;
  valence?: number;
  anxiety?: number;
  energy?: number;
  irritability?: number;
}

function pearsonCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  if (n < 3) return 0;

  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    sumXY += dx * dy;
    sumX2 += dx * dx;
    sumY2 += dy * dy;
  }

  const denominator = Math.sqrt(sumX2 * sumY2);
  if (denominator === 0) return 0;
  return sumXY / denominator;
}

function classifyCorrelation(
  r: number
): 'strong' | 'moderate' | 'weak' | 'none' {
  const abs = Math.abs(r);
  if (abs >= 0.6) return 'strong';
  if (abs >= 0.4) return 'moderate';
  if (abs >= 0.2) return 'weak';
  return 'none';
}

function getSleepMetricValues(
  entries: SleepEntry[],
  metric: SleepMetricKey
): Map<string, number> {
  const map = new Map<string, number>();
  for (const entry of entries) {
    const m = calculateMetrics(entry);
    switch (metric) {
      case 'duration':
        map.set(entry.date, m.total_sleep_minutes);
        break;
      case 'efficiency':
        map.set(entry.date, m.sleep_efficiency);
        break;
      case 'quality':
        map.set(entry.date, entry.sleep_quality);
        break;
      case 'latency':
        map.set(entry.date, m.sleep_latency_minutes);
        break;
      case 'consistency':
        // Consistency is a rolling metric, not per-entry
        map.set(entry.date, parseTime(entry.bedtime));
        break;
    }
  }
  return map;
}

function getMoodMetricValue(
  entry: MoodEntry,
  metric: MoodMetricKey
): number | undefined {
  return entry[metric];
}

function generateInsight(
  sleepMetric: SleepMetricKey,
  moodMetric: MoodMetricKey,
  r: number,
  significance: string
): string {
  const sleepLabels: Record<SleepMetricKey, string> = {
    duration: 'sleep duration',
    efficiency: 'sleep efficiency',
    quality: 'sleep quality',
    latency: 'time to fall asleep',
    consistency: 'bedtime consistency',
  };
  const moodLabels: Record<MoodMetricKey, string> = {
    valence: 'overall mood',
    anxiety: 'anxiety levels',
    energy: 'energy levels',
    irritability: 'irritability',
  };

  const direction = r > 0 ? 'increases' : 'decreases';
  const sleepDir = r > 0 ? 'better' : 'worse';

  if (significance === 'none') {
    return `No clear relationship found between ${sleepLabels[sleepMetric]} and ${moodLabels[moodMetric]}.`;
  }

  return `When your ${sleepLabels[sleepMetric]} is ${sleepDir}, your ${moodLabels[moodMetric]} tends to ${moodMetric === 'anxiety' || moodMetric === 'irritability' ? (r < 0 ? 'decrease' : 'increase') : direction}.`;
}

export function calculateSleepMoodCorrelations(
  sleepEntries: SleepEntry[],
  moodEntries: MoodEntry[]
): SleepMoodCorrelation[] {
  if (sleepEntries.length < 14 || moodEntries.length < 14) return [];

  const correlations: SleepMoodCorrelation[] = [];
  const sleepMetrics: SleepMetricKey[] = [
    'duration',
    'efficiency',
    'quality',
    'latency',
  ];
  const moodMetrics: MoodMetricKey[] = [
    'valence',
    'anxiety',
    'energy',
    'irritability',
  ];

  for (const sm of sleepMetrics) {
    const sleepMap = getSleepMetricValues(sleepEntries, sm);

    for (const mm of moodMetrics) {
      const sleepVals: number[] = [];
      const moodVals: number[] = [];

      for (const moodEntry of moodEntries) {
        const sleepVal = sleepMap.get(moodEntry.date);
        const moodVal = getMoodMetricValue(moodEntry, mm);
        if (sleepVal !== undefined && moodVal !== undefined) {
          sleepVals.push(sleepVal);
          moodVals.push(moodVal);
        }
      }

      if (sleepVals.length < 14) continue;

      const r = pearsonCorrelation(sleepVals, moodVals);
      const significance = classifyCorrelation(r);

      correlations.push({
        sleep_metric: sm,
        mood_metric: mm,
        correlation_coefficient: Math.round(r * 100) / 100,
        sample_size: sleepVals.length,
        significance,
        insight: generateInsight(sm, mm, r, significance),
      });
    }
  }

  // Sort by absolute correlation strength
  correlations.sort(
    (a, b) =>
      Math.abs(b.correlation_coefficient) -
      Math.abs(a.correlation_coefficient)
  );

  return correlations;
}

// ─── Crisis Detection ───────────────────────────────────────────────────────

import { CRISIS_KEYWORDS } from './constants';

export function detectCrisisContent(text: string): boolean {
  if (!text || text.trim().length === 0) return false;
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some((keyword) => lower.includes(keyword));
}
