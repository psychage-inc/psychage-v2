/**
 * Sleep Architecture Calculation Model
 *
 * Pure functions for computing sleep metrics, cycle architecture,
 * and recommendations. All times are in minutes from midnight (0–1440+).
 *
 * Assumptions:
 * - Average sleep cycle: ~90 min (range 80–110 min)
 * - Adults typically have 4–6 complete cycles per night
 * - N3 (deep sleep) is concentrated in early cycles
 * - REM increases with each successive cycle
 * - Sleep latency default: 15 minutes
 * - These are population-level estimates, not medical advice
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export type AgeGroup = 'teen' | 'adult' | 'older_adult';
export type Chronotype = 'early_bird' | 'neutral' | 'night_owl';

export interface Nap {
  id: string;
  startTime: string; // HH:MM
  durationMinutes: number;
}

export interface UserProfile {
  ageGroup: AgeGroup;
  chronotype: Chronotype;
  targetSleepHours: number;
  caffeineCutoffTime: string; // HH:MM or ''
  exerciseTime: string; // HH:MM or ''
}

export interface SleepPlanInputs {
  bedtime: string; // HH:MM
  wakeTime: string; // HH:MM
  sleepLatencyMinutes: number;
  awakeningsCount: number;
  awakeningMinutesEach: number;
  naps: Nap[];
  profile: UserProfile;
}

export interface CycleArchitecture {
  cycleNumber: number;
  durationMinutes: number;
  n1Percent: number;
  n2Percent: number;
  n3Percent: number;
  remPercent: number;
  startMinuteFromSleep: number;
  endMinuteFromSleep: number;
}

export type NapClassification = 'power_nap' | 'short_nap' | 'deep_risk' | 'full_cycle';

export interface NapAnalysis {
  nap: Nap;
  classification: NapClassification;
  label: string;
  description: string;
  inertiaRisk: boolean;
  tooCloseToSleep: boolean; // within 6h of bedtime
}

export interface RiskFlag {
  type: 'too_short' | 'too_long' | 'low_efficiency' | 'nap_too_late' | 'caffeine_warning' | 'irregular_schedule';
  severity: 'info' | 'warning' | 'danger';
  message: string;
}

export interface RecommendedWakeTime {
  time: string; // HH:MM
  cycles: number;
  totalSleepMinutes: number;
  label: string;
}

export interface SleepPlanOutput {
  // Core metrics
  timeInBedMinutes: number;
  totalSleepTimeMinutes: number;
  sleepEfficiency: number; // 0–1
  wasoMinutes: number; // wake after sleep onset

  // Architecture
  estimatedCycles: number;
  cycleArchitecture: CycleArchitecture[];

  // Nap analysis
  napAnalysis: NapAnalysis[];

  // Recommendations
  recommendedWakeTimes: RecommendedWakeTime[];
  recommendedBedtimes: RecommendedWakeTime[];

  // Risk flags
  riskFlags: RiskFlag[];
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Parse "HH:MM" to minutes since midnight */
export function parseTime(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** Convert minutes since midnight to "HH:MM" (handles >1440 by wrapping) */
export function formatTime(minutes: number): string {
  const wrapped = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(wrapped / 60);
  const m = wrapped % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

/** Format minutes as "Xh Ym" */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/**
 * Compute minutes between two HH:MM times, assuming wake is after bed.
 * Handles crossing midnight (e.g., bed 23:00, wake 07:00 = 480 min).
 */
export function minutesBetween(bedtime: string, wakeTime: string): number {
  const bed = parseTime(bedtime);
  const wake = parseTime(wakeTime);
  if (wake > bed) return wake - bed;
  // Crosses midnight
  return (1440 - bed) + wake;
}

// ─── Cycle Architecture ─────────────────────────────────────────────────────

/**
 * Distribute sleep stages across cycles.
 *
 * Real data trends (approximate for healthy adults):
 * - Cycle 1: ~5% N1, ~50% N2, ~25% N3, ~20% REM → heavy N3
 * - Cycle 2: ~5% N1, ~45% N2, ~30% N3, ~20% REM → peak N3
 * - Cycle 3: ~5% N1, ~55% N2, ~15% N3, ~25% REM → declining N3, rising REM
 * - Cycle 4: ~5% N1, ~55% N2, ~10% N3, ~30% REM → minimal N3
 * - Cycle 5+: ~5% N1, ~55% N2, ~5% N3, ~35% REM → predominantly REM
 */
function getStageDistribution(cycleNumber: number, _totalCycles: number): {
  n1: number; n2: number; n3: number; rem: number;
} {
  // clamp to reasonable range
  const i = Math.min(cycleNumber, 6);

  // N3 declines; REM increases
  const n3 = Math.max(2, 30 - (i - 1) * 7);
  const rem = Math.min(40, 15 + (i - 1) * 6);
  const n1 = 5;
  const n2 = 100 - n1 - n3 - rem;

  return { n1, n2, n3, rem };
}

/**
 * Build per-cycle architecture from total available sleep minutes.
 * Each cycle ~90 min, but we distribute the remainder across cycles.
 */
export function buildCycleArchitecture(totalSleepMinutes: number): CycleArchitecture[] {
  if (totalSleepMinutes <= 0) return [];

  const avgCycleLength = 90;
  const numCycles = Math.max(1, Math.round(totalSleepMinutes / avgCycleLength));

  // Distribute total sleep across cycles, slight variation early=shorter late=longer
  const cycles: CycleArchitecture[] = [];
  let remaining = totalSleepMinutes;
  let elapsed = 0;

  for (let i = 1; i <= numCycles; i++) {
    // Slight natural variation: early cycles ~85–90 min, later ~90–100 min
    const baseDuration = i <= 2 ? 85 : i <= 4 ? 90 : 95;
    // On last cycle, take whatever remains
    const duration = i === numCycles ? remaining : Math.min(baseDuration, remaining);
    if (duration <= 0) break;

    const dist = getStageDistribution(i, numCycles);

    cycles.push({
      cycleNumber: i,
      durationMinutes: Math.round(duration),
      n1Percent: dist.n1,
      n2Percent: dist.n2,
      n3Percent: dist.n3,
      remPercent: dist.rem,
      startMinuteFromSleep: Math.round(elapsed),
      endMinuteFromSleep: Math.round(elapsed + duration),
    });

    elapsed += duration;
    remaining -= duration;
  }

  return cycles;
}

// ─── Nap Classification ─────────────────────────────────────────────────────

export function classifyNap(nap: Nap, bedtime: string): NapAnalysis {
  const dur = nap.durationMinutes;
  let classification: NapClassification;
  let label: string;
  let description: string;
  let inertiaRisk = false;

  if (dur <= 20) {
    classification = 'power_nap';
    label = 'Power Nap';
    description = 'Mostly light sleep (N1/N2). Refreshing with low inertia.';
  } else if (dur <= 30) {
    classification = 'short_nap';
    label = 'Short Nap';
    description = 'Light sleep stages. May brush the edge of N3.';
  } else if (dur <= 60) {
    classification = 'deep_risk';
    label = 'Deep Sleep Nap';
    description = 'Likely enters N3 deep sleep. Risk of grogginess (sleep inertia) on waking.';
    inertiaRisk = true;
  } else {
    classification = 'full_cycle';
    label = 'Full Cycle Nap';
    description = 'Includes a complete cycle with REM. Best if ≥90 min to avoid inertia.';
    inertiaRisk = dur < 80; // if cut short before cycle ends
  }

  // Check if nap is within 6h of bedtime
  const napEnd = parseTime(nap.startTime) + dur;
  const bedMin = parseTime(bedtime);
  const gapToBed = bedMin > napEnd ? bedMin - napEnd : (1440 - napEnd) + bedMin;
  const tooCloseToSleep = gapToBed < 360; // 6 hours

  return { nap, classification, label, description, inertiaRisk, tooCloseToSleep };
}

// ─── Risk Flags ─────────────────────────────────────────────────────────────

export function computeRiskFlags(
  tst: number,
  efficiency: number,
  napAnalyses: NapAnalysis[],
  profile: UserProfile,
  bedtime: string
): RiskFlag[] {
  const flags: RiskFlag[] = [];

  if (tst < 360) {
    flags.push({
      type: 'too_short',
      severity: 'danger',
      message: `Total sleep time is ${formatDuration(tst)} — under 6 hours. Most adults need 7–9 hours.`,
    });
  } else if (tst < 420) {
    flags.push({
      type: 'too_short',
      severity: 'warning',
      message: `Total sleep time is ${formatDuration(tst)} — on the low end. Consider extending if you feel tired.`,
    });
  }

  if (tst > 600) {
    flags.push({
      type: 'too_long',
      severity: 'info',
      message: `Total sleep time is ${formatDuration(tst)} — over 10 hours. Consistently oversleeping may indicate underlying issues.`,
    });
  }

  if (efficiency < 0.85) {
    flags.push({
      type: 'low_efficiency',
      severity: efficiency < 0.75 ? 'danger' : 'warning',
      message: `Sleep efficiency is ${Math.round(efficiency * 100)}%. Aim for ≥85%.`,
    });
  }

  const lateNaps = napAnalyses.filter(n => n.tooCloseToSleep);
  if (lateNaps.length > 0) {
    flags.push({
      type: 'nap_too_late',
      severity: 'warning',
      message: `${lateNaps.length} nap(s) within 6 hours of bedtime. Late naps can delay sleep onset.`,
    });
  }

  // Caffeine check
  if (profile.caffeineCutoffTime) {
    const cutoff = parseTime(profile.caffeineCutoffTime);
    const bed = parseTime(bedtime);
    const gap = bed > cutoff ? bed - cutoff : (1440 - cutoff) + bed;
    if (gap < 360) {
      flags.push({
        type: 'caffeine_warning',
        severity: 'warning',
        message: `Caffeine cutoff is less than 6 hours before bedtime. Consider moving it earlier.`,
      });
    }
  }

  return flags;
}

// ─── Recommended Times ──────────────────────────────────────────────────────

/**
 * Given a wake time and latency, compute recommended bedtimes for 3–6 cycles.
 */
export function getRecommendedBedtimes(
  wakeTime: string,
  latencyMinutes: number
): RecommendedWakeTime[] {
  const wakeMins = parseTime(wakeTime);
  const labels = ['', '', '', 'Light (4.5h)', 'Minimum (6h)', 'Balanced (7.5h)', 'Full (9h)'];

  return [6, 5, 4, 3].map(cycles => {
    const sleepMin = cycles * 90;
    const totalMin = sleepMin + latencyMinutes;
    const bedMin = wakeMins - totalMin;
    return {
      time: formatTime(bedMin),
      cycles,
      totalSleepMinutes: sleepMin,
      label: labels[cycles] || `${cycles} cycles`,
    };
  });
}

/**
 * Given a bedtime and latency, compute recommended wake times at cycle boundaries.
 */
export function getRecommendedWakeTimes(
  bedtime: string,
  latencyMinutes: number
): RecommendedWakeTime[] {
  const bedMins = parseTime(bedtime);
  const sleepStart = bedMins + latencyMinutes;
  const labels = ['', '', '', 'Light (4.5h)', 'Minimum (6h)', 'Balanced (7.5h)', 'Full (9h)'];

  return [3, 4, 5, 6].map(cycles => {
    const sleepMin = cycles * 90;
    const wakeMins = sleepStart + sleepMin;
    return {
      time: formatTime(wakeMins),
      cycles,
      totalSleepMinutes: sleepMin,
      label: labels[cycles] || `${cycles} cycles`,
    };
  });
}

// ─── Main Calculation ───────────────────────────────────────────────────────

export function computeSleepPlan(inputs: SleepPlanInputs): SleepPlanOutput {
  const { bedtime, wakeTime, sleepLatencyMinutes, awakeningsCount, awakeningMinutesEach, naps, profile } = inputs;

  // Time in bed
  const tib = minutesBetween(bedtime, wakeTime);

  // WASO: wake after sleep onset
  const waso = awakeningsCount * awakeningMinutesEach;

  // Total sleep time = TIB - latency - WASO
  const tst = Math.max(0, tib - sleepLatencyMinutes - waso);

  // Sleep efficiency
  const efficiency = tib > 0 ? tst / tib : 0;

  // Cycle architecture
  const cycleArchitecture = buildCycleArchitecture(tst);
  const estimatedCycles = cycleArchitecture.length;

  // Nap analysis
  const napAnalysis = naps.map(n => classifyNap(n, bedtime));

  // Recommended times
  const recommendedWakeTimes = getRecommendedWakeTimes(bedtime, sleepLatencyMinutes);
  const recommendedBedtimes = getRecommendedBedtimes(wakeTime, sleepLatencyMinutes);

  // Risk flags
  const riskFlags = computeRiskFlags(tst, efficiency, napAnalysis, profile, bedtime);

  return {
    timeInBedMinutes: tib,
    totalSleepTimeMinutes: tst,
    sleepEfficiency: efficiency,
    wasoMinutes: waso,
    estimatedCycles,
    cycleArchitecture,
    napAnalysis,
    recommendedWakeTimes,
    recommendedBedtimes,
    riskFlags,
  };
}

// ─── Preset Definitions ─────────────────────────────────────────────────────

export interface SleepPreset {
  id: string;
  label: string;
  description: string;
  apply: (current: SleepPlanInputs) => Partial<SleepPlanInputs>;
}

export const PRESETS: SleepPreset[] = [
  {
    id: '8h',
    label: '8h Sleep',
    description: '5+ cycles, well-rounded night',
    apply: (current) => {
      const wake = parseTime(current.wakeTime);
      return { bedtime: formatTime(wake - 8 * 60 - current.sleepLatencyMinutes) };
    },
  },
  {
    id: '7.5h_5cycles',
    label: '7.5h (5 cycles)',
    description: 'Exactly 5 × 90-minute cycles',
    apply: (current) => {
      const wake = parseTime(current.wakeTime);
      return { bedtime: formatTime(wake - 7.5 * 60 - current.sleepLatencyMinutes) };
    },
  },
  {
    id: '6h_4cycles',
    label: '6h (4 cycles)',
    description: 'Minimum useful rest',
    apply: (current) => {
      const wake = parseTime(current.wakeTime);
      return { bedtime: formatTime(wake - 6 * 60 - current.sleepLatencyMinutes) };
    },
  },
  {
    id: 'power_nap',
    label: 'Power Nap',
    description: 'Add a 20-minute afternoon nap',
    apply: () => ({
      naps: [{ id: crypto.randomUUID(), startTime: '14:00', durationMinutes: 20 }],
    }),
  },
  {
    id: 'full_cycle_nap',
    label: 'Full Cycle Nap',
    description: 'Add a 90-minute nap (1 full cycle)',
    apply: () => ({
      naps: [{ id: crypto.randomUUID(), startTime: '13:00', durationMinutes: 90 }],
    }),
  },
];

// ─── Default Values ─────────────────────────────────────────────────────────

export const DEFAULT_PROFILE: UserProfile = {
  ageGroup: 'adult',
  chronotype: 'neutral',
  targetSleepHours: 8,
  caffeineCutoffTime: '',
  exerciseTime: '',
};

export const DEFAULT_INPUTS: SleepPlanInputs = {
  bedtime: '23:00',
  wakeTime: '07:00',
  sleepLatencyMinutes: 15,
  awakeningsCount: 0,
  awakeningMinutesEach: 10,
  naps: [],
  profile: DEFAULT_PROFILE,
};
