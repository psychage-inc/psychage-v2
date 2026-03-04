/**
 * Symptom Navigator — Scoring Engine
 *
 * Implements the weighted matching algorithm that scores conditions
 * against user-selected symptoms. Runs entirely client-side.
 *
 * CRITICAL INVARIANT: No score may ever exceed the confidence_cap (0.75).
 * This is enforced at multiple levels to prevent diagnostic appearance.
 */

import type {
  ConditionScore,
  ConditionWithMappings,
  MatchedSymptomDetail,
  MatchingConfig,
  NormalizedSymptom,
  RelevanceLevel,
  ScoringConfig,
} from './types';
import {
  combinedModifier,
  getDurationModifier,
  getFrequencyModifier,
  getRelevanceColor,
  getRelevanceLabel,
  getRelevanceLevel,
  getSeverityModifier,
} from './utils';

/**
 * Score a single condition against the user's symptoms.
 *
 * Algorithm:
 * 1. For each symptom in the condition's profile that the user selected:
 *    - Start with the symptom's weight (1, 2, or 3)
 *    - Apply duration modifier (comparing user duration to condition minimum)
 *    - Apply severity modifier (based on user's severity rating)
 *    - Apply frequency modifier (based on user's frequency rating)
 *    - Combine modifiers via geometric mean
 *    - Multiply weight by combined modifier
 * 2. Sum all matched symptom scores → raw_score
 * 3. Normalize: raw_score / max_possible_score
 * 4. Apply count cap: min(1.0, matched_count / 5)
 * 5. Apply confidence cap: min(result, 0.75)
 * 6. If below minimum symptom count: multiply by penalty (0.3)
 */
export function calculateConditionScore(
  userSymptoms: NormalizedSymptom[],
  condition: ConditionWithMappings,
  config: ScoringConfig
): ConditionScore {
  const userSymptomMap = new Map<string, NormalizedSymptom>();
  for (const s of userSymptoms) {
    userSymptomMap.set(s.symptom_id, s);
  }

  let rawScore = 0;
  let maxPossibleScore = 0;
  const matchedSymptoms: MatchedSymptomDetail[] = [];

  for (const mapping of condition.symptom_mappings) {
    // Calculate max possible score for normalization
    const maxModifier = combinedModifier(
      config.duration_modifiers.meets_or_exceeds,
      config.severity_modifiers['8-10'],
      config.frequency_modifiers.always
    );
    maxPossibleScore += mapping.weight * maxModifier;

    const userSymptom = userSymptomMap.get(mapping.symptom_id);
    if (!userSymptom) continue;

    const baseScore = mapping.weight;

    const durationMod = getDurationModifier(
      userSymptom.duration,
      condition.minimum_duration,
      config.duration_modifiers
    );

    const severityMod = getSeverityModifier(
      userSymptom.severity,
      config.severity_modifiers
    );

    const frequencyMod = getFrequencyModifier(
      userSymptom.frequency,
      config.frequency_modifiers
    );

    const combined = combinedModifier(durationMod, severityMod, frequencyMod);
    const symptomScore = baseScore * combined;
    rawScore += symptomScore;

    matchedSymptoms.push({
      symptom_id: mapping.symptom_id,
      symptom_name: userSymptom.symptom.name,
      weight: mapping.weight,
      role: mapping.role,
      raw_contribution: baseScore,
      modified_contribution: symptomScore,
    });
  }

  const matchedCount = matchedSymptoms.length;
  const totalMapped = condition.symptom_mappings.length;

  // Normalize to 0-1 range
  const normalized = maxPossibleScore > 0 ? rawScore / maxPossibleScore : 0;

  // Coverage adjustment: conditions with fewer total mappings get inflated
  // normalized scores due to smaller denominators (e.g. PDD 15 mappings vs
  // MDE 23 mappings — same symptoms produce a 57% higher PDD score without
  // this correction). Apply a log-scaled dampening factor for conditions
  // below the reference mapping count.
  const COVERAGE_REFERENCE = 20;
  const coverageFactor = totalMapped >= COVERAGE_REFERENCE
    ? 1.0
    : Math.log2(totalMapped + 1) / Math.log2(COVERAGE_REFERENCE + 1);
  const adjustedNormalized = normalized * coverageFactor;

  // Count cap: prevents high scores from just 1-2 symptoms
  const countCap = Math.min(1.0, matchedCount / 5);

  // Apply count cap, then absolute confidence cap
  let capped = Math.min(adjustedNormalized * countCap, config.confidence_cap);

  // Below-minimum penalty
  const meetsMinimum = matchedCount >= condition.minimum_symptoms_for_relevance;
  if (!meetsMinimum) {
    capped *= config.below_minimum_penalty;
  }

  // SAFETY: Absolute cap enforcement — this must NEVER be removed
  capped = Math.min(capped, config.confidence_cap);

  return {
    condition_id: condition.id,
    condition,
    raw_score: rawScore,
    normalized_score: normalized,
    capped_score: capped,
    matched_count: matchedCount,
    total_mapped: totalMapped,
    matched_symptoms: matchedSymptoms,
    meets_minimum: meetsMinimum,
    relevance_level: 'minimal' as RelevanceLevel, // Set during ranking
  };
}

/**
 * Rank conditions by score, apply diversity constraints, and assign relevance tiers.
 *
 * Diversity rules:
 * - Maximum `max_per_family` conditions from the same category
 * - Results capped at `max_results`
 * - Minimum `min_results` if any scores above threshold
 * - Filter out scores below `min_relevance_threshold`
 */
export function rankAndDiversify(
  scores: ConditionScore[],
  config: MatchingConfig
): ConditionScore[] {
  // Sort by capped score descending
  const sorted = [...scores].sort((a, b) => b.capped_score - a.capped_score);

  // Filter by minimum relevance
  const relevant = sorted.filter(
    (s) => s.capped_score >= config.min_relevance_threshold
  );

  // Apply category diversity
  const categoryCounts = new Map<string, number>();
  const diversified: ConditionScore[] = [];

  for (const score of relevant) {
    const category = score.condition.category;
    const count = categoryCounts.get(category) ?? 0;

    if (count >= config.max_per_family) continue;
    if (diversified.length >= config.max_results) break;

    categoryCounts.set(category, count + 1);

    // Assign relevance level
    const relevanceLevel = getRelevanceLevel(
      score.capped_score,
      config.relevance_display_tiers
    );

    diversified.push({
      ...score,
      relevance_level: relevanceLevel,
    });
  }

  return diversified;
}

/**
 * Score all conditions against user symptoms.
 * Returns raw scores before ranking/diversification.
 */
export function scoreAllConditions(
  userSymptoms: NormalizedSymptom[],
  conditions: ConditionWithMappings[],
  config: ScoringConfig
): ConditionScore[] {
  return conditions
    .filter((c) => c.is_active)
    .map((condition) => calculateConditionScore(userSymptoms, condition, config));
}
