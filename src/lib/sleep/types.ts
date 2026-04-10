/**
 * Sleep Architect V2 — Type Definitions
 *
 * All TypeScript interfaces for the sleep diary, dashboard,
 * intelligence tools, wind-down, and insights modules.
 */

// ─── Sleep Diary Types ──────────────────────────────────────────────────────

export interface SleepEntry {
  id: string;
  date: string; // ISO date YYYY-MM-DD
  bedtime: string; // HH:MM (24h)
  lights_out: string; // HH:MM (when actually tried to sleep)
  sleep_onset_minutes: number;
  wake_time: string; // HH:MM
  out_of_bed_time: string; // HH:MM
  night_wakings: number;
  night_waking_duration_minutes: number;
  sleep_quality: 1 | 2 | 3 | 4 | 5;
  morning_mood: 1 | 2 | 3 | 4 | 5;
  dream_recall: boolean;
  dream_notes?: string;
  naps: NapEntry[];
  substances: SubstanceLog;
  notes?: string;
  created_at: string; // ISO datetime
}

export interface NapEntry {
  start: string; // HH:MM
  end: string; // HH:MM
}

export interface SubstanceLog {
  caffeine_last_time?: string; // HH:MM
  alcohol: boolean;
  alcohol_units?: number;
  screens_before_bed_minutes?: number;
  exercise: boolean;
  exercise_time?: string; // HH:MM
  medication_sleep_aid: boolean;
}

// ─── Computed Metrics ───────────────────────────────────────────────────────

export interface SleepMetrics {
  time_in_bed_minutes: number;
  total_sleep_minutes: number;
  sleep_efficiency: number; // 0–100
  sleep_latency_minutes: number;
  wake_after_sleep_onset: number;
  midpoint_of_sleep: string; // HH:MM
}

// ─── Sleep Score ────────────────────────────────────────────────────────────

export interface SleepScoreBreakdown {
  overall: number; // 0–100
  duration: number;
  efficiency: number;
  quality: number;
  consistency: number;
  latency: number;
}

// ─── Sleep Debt ─────────────────────────────────────────────────────────────

export interface SleepDebtResult {
  total_debt_minutes: number;
  daily_deficits: { date: string; deficit_minutes: number }[];
  recovery_days_estimate: number;
}

// ─── Chronotype ─────────────────────────────────────────────────────────────

export type ChronotypeAnimal = 'lion' | 'bear' | 'wolf' | 'dolphin';
export type ChronotypeCategory =
  | 'definitely_morning'
  | 'moderately_morning'
  | 'neither'
  | 'moderately_evening'
  | 'definitely_evening';

export interface ChronotypeResult {
  score: number; // 4–25 (rMEQ range)
  category: ChronotypeCategory;
  animal: ChronotypeAnimal;
  label: string;
  description: string;
  ideal_bedtime: string;
  ideal_wake_time: string;
}

export interface ChronotypeQuestion {
  id: number;
  question: string;
  options: { value: number; label: string }[];
}

// ─── Hygiene Audit ──────────────────────────────────────────────────────────

export type HygienePriority = 'high' | 'medium' | 'low';

export interface HygieneItem {
  id: string;
  label: string;
  priority: HygienePriority;
}

export interface HygieneCategory {
  id: string;
  title: string;
  icon: string; // lucide-react icon name
  items: HygieneItem[];
}

// ─── Sleep-Mood Bridge ──────────────────────────────────────────────────────

export type SleepMetricKey =
  | 'duration'
  | 'efficiency'
  | 'quality'
  | 'latency'
  | 'consistency';
export type MoodMetricKey = 'valence' | 'anxiety' | 'energy' | 'irritability';

export interface SleepMoodCorrelation {
  sleep_metric: SleepMetricKey;
  mood_metric: MoodMetricKey;
  correlation_coefficient: number; // Pearson r
  sample_size: number;
  significance: 'strong' | 'moderate' | 'weak' | 'none';
  insight: string;
}

// ─── CBT-I Education ────────────────────────────────────────────────────────

export interface CBTICard {
  id: string;
  title: string;
  summary: string;
  technique: string;
  source: string;
}

// ─── Breathing Exercise ─────────────────────────────────────────────────────

export type BreathingPattern = '4-7-8' | 'box' | 'diaphragmatic';

export interface BreathingPhase {
  label: string;
  duration: number; // seconds
  type: 'inhale' | 'hold' | 'exhale';
}

export interface BreathingExerciseConfig {
  id: BreathingPattern;
  name: string;
  description: string;
  phases: BreathingPhase[];
  cycles: number;
}

// ─── PMR ────────────────────────────────────────────────────────────────────

export interface PMRStep {
  id: number;
  muscle_group: string;
  instruction_tense: string;
  instruction_release: string;
  tense_seconds: number;
  release_seconds: number;
}

// ─── Racing Thoughts ────────────────────────────────────────────────────────

export type ThoughtCategory =
  | 'work'
  | 'relationships'
  | 'health'
  | 'money'
  | 'tomorrow'
  | 'other';

export interface CapturedThought {
  id: string;
  text: string;
  category: ThoughtCategory;
  actionable: boolean;
  next_step?: string;
  created_at: string;
}

// ─── Settings ───────────────────────────────────────────────────────────────

export interface SleepSettings {
  target_sleep_minutes: number;
  chronotype?: ChronotypeAnimal;
  target_bedtime?: string;
  target_wake_time?: string;
  age_range: string;
}

// ─── Streak ─────────────────────────────────────────────────────────────────

export interface StreakData {
  current: number;
  best: number;
  last_logged_date: string;
  weekly_count: number;
}

// ─── Wind-Down Preferences ──────────────────────────────────────────────────

export interface WindDownPreferences {
  favorite_breathing: BreathingPattern;
  brain_dump_enabled: boolean;
  pmr_enabled: boolean;
}

// ─── Tab Navigation ─────────────────────────────────────────────────────────

export type SleepTab =
  | 'overview'
  | 'diary'
  | 'dashboard'
  | 'tools'
  | 'wind-down'
  | 'insights';
