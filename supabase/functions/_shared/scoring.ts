/**
 * CLARITY SCORE SCORING ENGINE
 *
 * Pure functions for computing all assessment scores.
 * This module is deterministic - same inputs always produce same outputs.
 * Can be safely used in both server-side and client-side code.
 */

export interface RawResponses {
  phq2_1: number;
  phq2_2: number;
  gad2_1: number;
  gad2_2: number;
  who5_1: number;
  who5_2: number;
  who5_3: number;
  who5_4: number;
  who5_5: number;
  ucla_1: number;
  ucla_2: number;
  ucla_3: number;
  pss_1: number;
  pss_2: number;
  pss_3: number;
  pss_4: number;
  func_1: number;
  func_2: number;
  func_3: number;
  func_4: number;
}

export interface InstrumentScores {
  phq2_raw: number;
  gad2_raw: number;
  phq4_total: number;
  who5_raw: number;
  who5_percentage: number;
  ucla3_raw: number;
  pss4_raw: number;
  functioning_raw: number;
}

export interface DomainScores {
  emotional: number;    // 0-20
  vitality: number;     // 0-20
  social: number;       // 0-20
  cognitive: number;    // 0-20
  functioning: number;  // 0-20
}

export interface ClinicalSubscores {
  phq2: {
    raw: number;
    max: number;
    cutoff: number;
    positive: boolean;
  };
  gad2: {
    raw: number;
    max: number;
    cutoff: number;
    positive: boolean;
  };
  who5_percentage: {
    value: number;
    poor_threshold: number;
    poor: boolean;
  };
  ucla3: {
    raw: number;
    max: number;
    elevated_threshold: number;
    elevated: boolean;
  };
  pss4: {
    raw: number;
    max: number;
    moderate_threshold: number;
    elevated: boolean;
  };
}

export interface ComputedScores {
  instruments: InstrumentScores;
  domains: DomainScores;
  total_score: number;
  score_label: 'thriving' | 'balanced' | 'struggling' | 'distressed' | 'crisis';
  clinical_subscores: ClinicalSubscores;
}

/**
 * Compute raw instrument scores from individual item responses
 */
export function computeInstrumentScores(responses: RawResponses): InstrumentScores {
  // PHQ-2: items 1-2, range 0-6
  const phq2_raw = responses.phq2_1 + responses.phq2_2;

  // GAD-2: items 3-4, range 0-6
  const gad2_raw = responses.gad2_1 + responses.gad2_2;

  // PHQ-4: combined, range 0-12
  const phq4_total = phq2_raw + gad2_raw;

  // WHO-5: 5 items, range 0-25, percentage = raw * 4
  const who5_raw =
    responses.who5_1 +
    responses.who5_2 +
    responses.who5_3 +
    responses.who5_4 +
    responses.who5_5;
  const who5_percentage = who5_raw * 4;

  // UCLA-3: 3 items, range 3-9 (minimum is 3, not 0)
  const ucla3_raw = responses.ucla_1 + responses.ucla_2 + responses.ucla_3;

  // PSS-4: items 2 & 3 are reverse-scored
  // Reverse scoring: 0→4, 1→3, 2→2, 3→1, 4→0
  const pss_2_reversed = 4 - responses.pss_2;
  const pss_3_reversed = 4 - responses.pss_3;
  const pss4_raw =
    responses.pss_1 +
    pss_2_reversed +
    pss_3_reversed +
    responses.pss_4;

  // Functioning (WHODAS-adapted): 4 items, range 0-16
  const functioning_raw =
    responses.func_1 +
    responses.func_2 +
    responses.func_3 +
    responses.func_4;

  return {
    phq2_raw,
    gad2_raw,
    phq4_total,
    who5_raw,
    who5_percentage,
    ucla3_raw,
    pss4_raw,
    functioning_raw,
  };
}

/**
 * Normalize instrument scores to domain scores (0-20 each)
 *
 * Symptom scales (PHQ-4, UCLA-3, PSS-4, Functioning) are INVERTED:
 *   domain = ((maxRaw - raw) / (maxRaw - minRaw)) × 20
 *   Higher raw score = worse symptoms = lower wellness = lower domain score
 *
 * Wellbeing scales (WHO-5) are DIRECT:
 *   domain = ((raw - minRaw) / (maxRaw - minRaw)) × 20
 *   Higher raw score = better wellbeing = higher domain score
 */
export function computeDomainScores(instruments: InstrumentScores): DomainScores {
  // Emotional (PHQ-4): inverted, max=12, min=0
  const emotional = ((12 - instruments.phq4_total) / 12) * 20;

  // Vitality (WHO-5): direct, max=25, min=0
  const vitality = (instruments.who5_raw / 25) * 20;

  // Social (UCLA-3): inverted, max=9, min=3
  const social = ((9 - instruments.ucla3_raw) / 6) * 20;

  // Cognitive (PSS-4): inverted, max=16, min=0
  const cognitive = ((16 - instruments.pss4_raw) / 16) * 20;

  // Functioning: inverted, max=16, min=0
  const functioning = ((16 - instruments.functioning_raw) / 16) * 20;

  // Round to 1 decimal place
  return {
    emotional: Math.round(emotional * 10) / 10,
    vitality: Math.round(vitality * 10) / 10,
    social: Math.round(social * 10) / 10,
    cognitive: Math.round(cognitive * 10) / 10,
    functioning: Math.round(functioning * 10) / 10,
  };
}

/**
 * Compute composite Clarity Score (0-100)
 */
export function computeTotalScore(domains: DomainScores): number {
  const sum =
    domains.emotional +
    domains.vitality +
    domains.social +
    domains.cognitive +
    domains.functioning;

  // Round to nearest integer, clamp to 0-100
  return Math.max(0, Math.min(100, Math.round(sum)));
}

/**
 * Determine score label based on total score
 */
export function computeScoreLabel(total: number): ComputedScores['score_label'] {
  if (total >= 80) return 'thriving';
  if (total >= 60) return 'balanced';
  if (total >= 40) return 'struggling';
  if (total >= 20) return 'distressed';
  return 'crisis';
}

/**
 * Compute clinical subscores with cutoff interpretations
 */
export function computeClinicalSubscores(instruments: InstrumentScores): ClinicalSubscores {
  return {
    phq2: {
      raw: instruments.phq2_raw,
      max: 6,
      cutoff: 3,
      positive: instruments.phq2_raw >= 3,
    },
    gad2: {
      raw: instruments.gad2_raw,
      max: 6,
      cutoff: 3,
      positive: instruments.gad2_raw >= 3,
    },
    who5_percentage: {
      value: instruments.who5_percentage,
      poor_threshold: 50,
      poor: instruments.who5_percentage <= 50,
    },
    ucla3: {
      raw: instruments.ucla3_raw,
      max: 9,
      elevated_threshold: 6,
      elevated: instruments.ucla3_raw >= 6,
    },
    pss4: {
      raw: instruments.pss4_raw,
      max: 16,
      moderate_threshold: 8,
      elevated: instruments.pss4_raw >= 8,
    },
  };
}

/**
 * MAIN FUNCTION: Compute all scores from raw responses
 *
 * This is the single source of truth for scoring logic.
 * Use this function in both client and server code to ensure consistency.
 */
export function computeAllScores(responses: RawResponses): ComputedScores {
  // Step 1: Compute raw instrument scores
  const instruments = computeInstrumentScores(responses);

  // Step 2: Normalize to domain scores
  const domains = computeDomainScores(instruments);

  // Step 3: Compute total score
  const total_score = computeTotalScore(domains);

  // Step 4: Determine score label
  const score_label = computeScoreLabel(total_score);

  // Step 5: Compute clinical subscores
  const clinical_subscores = computeClinicalSubscores(instruments);

  return {
    instruments,
    domains,
    total_score,
    score_label,
    clinical_subscores,
  };
}

/**
 * Validate that all responses are present and within valid ranges
 * Returns array of validation errors (empty if valid)
 */
export function validateResponses(responses: Partial<RawResponses>): string[] {
  const errors: string[] = [];

  // Required items
  const requiredItems: (keyof RawResponses)[] = [
    'phq2_1', 'phq2_2', 'gad2_1', 'gad2_2',
    'who5_1', 'who5_2', 'who5_3', 'who5_4', 'who5_5',
    'ucla_1', 'ucla_2', 'ucla_3',
    'pss_1', 'pss_2', 'pss_3', 'pss_4',
    'func_1', 'func_2', 'func_3', 'func_4',
  ];

  // Check all required items are present
  for (const item of requiredItems) {
    if (responses[item] === undefined || responses[item] === null) {
      errors.push(`Missing response for ${item}`);
    }
  }

  // Range validation
  const rangeChecks: Array<{ items: (keyof RawResponses)[]; min: number; max: number }> = [
    { items: ['phq2_1', 'phq2_2', 'gad2_1', 'gad2_2'], min: 0, max: 3 },
    { items: ['who5_1', 'who5_2', 'who5_3', 'who5_4', 'who5_5'], min: 0, max: 5 },
    { items: ['ucla_1', 'ucla_2', 'ucla_3'], min: 1, max: 3 },
    { items: ['pss_1', 'pss_2', 'pss_3', 'pss_4'], min: 0, max: 4 },
    { items: ['func_1', 'func_2', 'func_3', 'func_4'], min: 0, max: 4 },
  ];

  for (const { items, min, max } of rangeChecks) {
    for (const item of items) {
      const value = responses[item];
      if (value !== undefined && value !== null) {
        if (!Number.isInteger(value) || value < min || value > max) {
          errors.push(`${item} must be an integer between ${min} and ${max}, got ${value}`);
        }
      }
    }
  }

  return errors;
}
