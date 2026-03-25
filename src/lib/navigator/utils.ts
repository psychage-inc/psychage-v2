/**
 * Symptom Navigator — Utility Functions
 *
 * Pure helper functions used by safety screening and scoring.
 * No side effects, no external dependencies beyond types.
 */

import type {
  DurationModifiers,
  FrequencyModifiers,
  MatchingConfig,
  NormalizedSymptom,
  RelevanceDisplayTiers,
  RelevanceLevel,
  SeverityModifiers,
  Symptom,
  UserDuration,
  UserFrequency,
  UserSymptomInput,
} from './types';
import { DURATION_TO_DAYS as durationMap } from './types';

// ─── Default Matching Config ─────────────────────────────────────────────────

export const DEFAULT_MATCHING_CONFIG: MatchingConfig = {
  confidence_cap: 0.75,
  min_relevance_threshold: 0.08,
  below_minimum_penalty: 0.6,
  max_results: 5,
  min_results: 1,
  max_per_family: 2,
  severity_modifiers: {
    '1': 0.6,
    '2-3': 0.8,
    '4-5': 1.0,
    '6-7': 1.2,
    '8-10': 1.4,
  },
  frequency_modifiers: {
    rarely: 0.7,
    sometimes: 1.0,
    often: 1.2,
    always: 1.4,
  },
  duration_modifiers: {
    below_half: 0.7,
    half_to_full: 1.0,
    meets_or_exceeds: 1.3,
  },
  relevance_display_tiers: {
    high: { min: 0.45, label: 'Highly Relevant', color: '#2563eb' },
    moderate: { min: 0.25, label: 'Moderately Relevant', color: '#7c3aed' },
    low: { min: 0.12, label: 'Possibly Relevant', color: '#6b7280' },
    minimal: { min: 0, label: 'Worth Exploring', color: '#9ca3af' },
  },
  version: '1.2.0',
};

// ─── Input Validation ───────────────────────────────────────────────────────

const VALID_DURATIONS: Set<string> = new Set([
  'less_than_1_week', '1_to_2_weeks', '2_to_4_weeks',
  '1_to_3_months', '3_to_6_months', '6_months_to_1_year', 'more_than_1_year',
]);

const VALID_FREQUENCIES: Set<string> = new Set([
  'rarely', 'sometimes', 'often', 'always',
]);

/** Sanitize a single user input, clamping/defaulting invalid values. */
function sanitizeInput(input: UserSymptomInput): UserSymptomInput {
  return {
    symptom_id: input.symptom_id,
    severity: input.severity !== undefined
      ? Math.max(1, Math.min(10, Math.round(input.severity)))
      : undefined,
    duration: input.duration && VALID_DURATIONS.has(input.duration)
      ? input.duration
      : undefined,
    frequency: input.frequency && VALID_FREQUENCIES.has(input.frequency)
      ? input.frequency
      : undefined,
  };
}

// ─── Symptom Normalization ───────────────────────────────────────────────────

/**
 * Normalize user inputs against the symptom knowledge base.
 * Sanitizes out-of-range values, resolves synonyms, and fills in defaults.
 */
export function normalizeSymptoms(
  inputs: UserSymptomInput[],
  symptoms: Symptom[]
): NormalizedSymptom[] {
  const symptomMap = new Map<string, Symptom>();
  for (const s of symptoms) {
    symptomMap.set(s.id, s);
  }

  return inputs
    .map((rawInput) => {
      const input = sanitizeInput(rawInput);
      const symptom = symptomMap.get(input.symptom_id);
      if (!symptom || !symptom.is_active) return null;

      return {
        symptom_id: input.symptom_id,
        symptom,
        severity: input.severity ?? 5,
        duration: input.duration ?? '2_to_4_weeks',
        frequency: input.frequency ?? 'sometimes',
      } satisfies NormalizedSymptom;
    })
    .filter((s): s is NormalizedSymptom => s !== null);
}

// ─── Modifier Calculations ───────────────────────────────────────────────────

/** Get severity modifier based on user's severity rating (1-10) */
export function getSeverityModifier(
  severity: number,
  modifiers: SeverityModifiers
): number {
  if (severity >= 8) return modifiers['8-10'];
  if (severity >= 6) return modifiers['6-7'];
  if (severity >= 4) return modifiers['4-5'];
  if (severity >= 2) return modifiers['2-3'];
  return modifiers['1'];
}

/** Get frequency modifier */
export function getFrequencyModifier(
  frequency: UserFrequency,
  modifiers: FrequencyModifiers
): number {
  return modifiers[frequency] ?? 1.0;
}

/**
 * Get duration modifier by comparing user's duration to condition's minimum.
 * Uses day-approximation for comparison.
 */
export function getDurationModifier(
  userDuration: UserDuration,
  conditionMinDuration: string,
  modifiers: DurationModifiers
): number {
  const userDays = durationMap[userDuration] ?? 21;
  const conditionDays = durationMap[conditionMinDuration] ?? 14;

  if (userDays >= conditionDays) return modifiers.meets_or_exceeds;
  if (userDays >= conditionDays * 0.5) return modifiers.half_to_full;
  return modifiers.below_half;
}

/**
 * Combine three modifiers using geometric mean (cube root of product).
 * This prevents any single extreme modifier from dominating.
 */
export function combinedModifier(
  durationMod: number,
  severityMod: number,
  frequencyMod: number
): number {
  return Math.pow(durationMod * severityMod * frequencyMod, 1 / 3);
}

// ─── Relevance Tier Helpers ──────────────────────────────────────────────────

/** Determine the relevance level for a given score */
export function getRelevanceLevel(
  score: number,
  tiers: RelevanceDisplayTiers
): RelevanceLevel {
  if (score >= tiers.high.min) return 'high';
  if (score >= tiers.moderate.min) return 'moderate';
  if (score >= tiers.low.min) return 'low';
  return 'minimal';
}

/** Get the display label for a relevance level */
export function getRelevanceLabel(
  level: RelevanceLevel,
  tiers: RelevanceDisplayTiers
): string {
  return tiers[level].label;
}

/** Get the display color for a relevance level */
export function getRelevanceColor(
  level: RelevanceLevel,
  tiers: RelevanceDisplayTiers
): string {
  return tiers[level].color;
}

// ─── Disclaimer ──────────────────────────────────────────────────────────────

export const NAVIGATOR_DISCLAIMER =
  'This tool provides educational information only and is not a substitute for professional ' +
  'medical advice, diagnosis, or treatment. The results shown are based on general patterns ' +
  'and may not reflect your individual situation. Always consult a qualified healthcare ' +
  'provider for personal medical concerns. If you are in crisis, please contact emergency ' +
  'services or a crisis helpline immediately.';

// ─── Prohibited Language ─────────────────────────────────────────────────────

/**
 * Phrases that must NEVER appear in any user-facing string.
 * Used by the build-time validation script.
 */
export const PROHIBITED_PHRASES = [
  'you have',
  'you are diagnosed',
  'diagnosis:',
  'you suffer from',
  'you are suffering from',
  'your condition is',
  'this confirms',
  'this proves',
  'you definitely have',
  'clinical diagnosis',
  'we can confirm',
  'test results show you have',
  'based on your results, you have',
  'you meet the criteria for',
  'positive for',
  'negative for',
  'diagnostic result',
  'your diagnosis',
  'diagnosed with',
  'prescription',
  'prescribe',
  'take this medication',
  'you need medication',
  'guaranteed',
  '100% accurate',
  'certainty',
  'with certainty',
  'conclusive',
  'definitive diagnosis',
  'confirmed diagnosis',
];
