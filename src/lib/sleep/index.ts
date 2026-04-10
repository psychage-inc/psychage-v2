/**
 * Sleep Architect V2 — Library Barrel Export
 */

// Types
export type {
  SleepEntry,
  NapEntry,
  SubstanceLog,
  SleepMetrics,
  SleepScoreBreakdown,
  SleepDebtResult,
  ChronotypeAnimal,
  ChronotypeCategory,
  ChronotypeResult,
  ChronotypeQuestion,
  HygieneCategory,
  HygieneItem,
  HygienePriority,
  SleepMoodCorrelation,
  SleepMetricKey,
  MoodMetricKey,
  CBTICard,
  BreathingPattern,
  BreathingPhase,
  BreathingExerciseConfig,
  PMRStep,
  ThoughtCategory,
  CapturedThought,
  SleepSettings,
  StreakData,
  WindDownPreferences,
  SleepTab,
} from './types';

// Calculations
export {
  parseTime,
  formatTime,
  formatDuration,
  minutesBetween,
  calculateMetrics,
  calculateSleepScore,
  calculateSleepDebt,
  calculateOptimalBedtimes,
  calculateStreak,
  calculateSleepMoodCorrelations,
  detectCrisisContent,
} from './calculations';

export type { BedtimeSuggestion } from './calculations';

// Templates
export { generateWeeklyDigest } from './templates';

// Chronotype
export { scoreChronotype, getCategoryLabel, ANIMAL_PROFILES } from './chronotype';

// Constants
export {
  SLEEP_RECOMMENDATIONS,
  DEFAULT_SLEEP_SETTINGS,
  BREATHING_EXERCISES,
  PMR_STEPS,
  CHRONOTYPE_QUESTIONS,
  HYGIENE_CATEGORIES,
  CBTI_EDUCATION_CARDS,
  CRISIS_KEYWORDS,
  CRISIS_RESOURCES,
  THOUGHT_CATEGORIES,
} from './constants';
