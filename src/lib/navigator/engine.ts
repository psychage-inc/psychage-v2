/**
 * Symptom Navigator — Main Engine
 *
 * Orchestrates the complete navigation flow:
 * 1. Normalize user inputs
 * 2. Screen for red flags (SAFETY FIRST)
 * 3. Filter conditions by feature flags (phased rollout)
 * 4. Score all conditions
 * 5. Rank, cap, and diversify results
 * 6. Generate safe, non-diagnostic output
 *
 * This module runs ENTIRELY client-side. No symptom data is
 * transmitted to any server in the default (anonymous) flow.
 */

import type {
  KnowledgeBase,
  NavigatorResultItem,
  NavigatorResults,
  NormalizedSymptom,
  SafetyResult,
  UserSymptomInput,
} from './types';
import { filterByFeatureFlags } from './featureFlags';
import { screenRedFlags } from './safety';
import { rankAndDiversify, scoreAllConditions } from './scoring';
import {
  DEFAULT_MATCHING_CONFIG,
  getRelevanceColor,
  getRelevanceLabel,
  NAVIGATOR_DISCLAIMER,
  normalizeSymptoms,
} from './utils';

/**
 * Main entry point for the Symptom Navigator engine.
 *
 * @param userInputs - Array of symptoms the user selected with optional severity/duration/frequency
 * @param knowledgeBase - Complete knowledge base from the API
 * @param userRegion - Optional region code for crisis resource localization
 * @returns Complete navigator results including safety screening and condition matches
 */
export function runSymptomNavigator(
  userInputs: UserSymptomInput[],
  knowledgeBase: KnowledgeBase,
  userRegion?: string
): NavigatorResults {
  const config = knowledgeBase.matchingConfig ?? DEFAULT_MATCHING_CONFIG;

  // Step 1: Normalize symptoms
  const normalized = normalizeSymptoms(userInputs, knowledgeBase.symptoms);

  // Step 2: Red flag screening — SAFETY FIRST
  const safetyResult = screenRedFlags(
    normalized,
    knowledgeBase.symptoms,
    knowledgeBase.crisisResources,
    userRegion
  );

  // If CRISIS detected, return immediately with safety info only
  if (safetyResult.should_halt) {
    return generateSafeResults([], normalized, safetyResult, config);
  }

  // Step 3: Filter conditions by feature flags (phased rollout)
  const enabledConditions = filterByFeatureFlags(knowledgeBase.conditions);

  // Step 4: Score each condition
  const rawScores = scoreAllConditions(normalized, enabledConditions, {
    confidence_cap: config.confidence_cap,
    below_minimum_penalty: config.below_minimum_penalty,
    severity_modifiers: config.severity_modifiers,
    frequency_modifiers: config.frequency_modifiers,
    duration_modifiers: config.duration_modifiers,
  });

  // Step 5: Rank, cap confidence, diversify
  const ranked = rankAndDiversify(rawScores, config);

  // Step 6: Generate safe, non-diagnostic results
  return generateSafeResults(ranked, normalized, safetyResult, config);
}

/**
 * Generate the final, safe output structure.
 *
 * All user-facing text in this function has been reviewed to ensure
 * it contains no diagnostic language. The results are educational
 * suggestions, never diagnoses.
 */
function generateSafeResults(
  rankedConditions: ReturnType<typeof rankAndDiversify>,
  userSymptoms: NormalizedSymptom[],
  safetyResult: SafetyResult,
  config: KnowledgeBase['matchingConfig']
): NavigatorResults {
  const results: NavigatorResultItem[] = rankedConditions.map((score) => ({
    condition_id: score.condition_id,
    name: score.condition.name,
    full_name: score.condition.full_name,
    description_for_user: score.condition.description_for_user,
    relevance_score: score.capped_score,
    relevance_level: score.relevance_level,
    relevance_label: getRelevanceLabel(
      score.relevance_level,
      config.relevance_display_tiers
    ),
    relevance_color: getRelevanceColor(
      score.relevance_level,
      config.relevance_display_tiers
    ),
    matched_symptoms: score.matched_symptoms.map((ms) => ({
      name: ms.symptom_name,
      role: ms.role,
    })),
    guide_path: score.condition.guide_path,
    coping_path: score.condition.coping_path,
    provider_questions: score.condition.provider_questions,
    always_recommend_professional: score.condition.always_recommend_professional,
  }));

  const recommendations = buildGeneralRecommendations(
    userSymptoms,
    safetyResult,
    results
  );

  return {
    safety: safetyResult,
    results,
    general_recommendations: recommendations,
    disclaimer: NAVIGATOR_DISCLAIMER,
    version: config.version,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Build general recommendations based on the user's symptom profile.
 * These are always educational and never prescriptive.
 */
function buildGeneralRecommendations(
  symptoms: NormalizedSymptom[],
  safety: SafetyResult,
  results: NavigatorResultItem[]
): string[] {
  const recommendations: string[] = [];

  // Always recommend professional consultation
  if (results.length > 0) {
    const hasStrongMatches = results.some(
      (r) => r.relevance_level === 'high' || r.relevance_level === 'moderate'
    );
    if (hasStrongMatches) {
      recommendations.push(
        'Consider sharing these results with a healthcare provider who can offer personalized guidance.'
      );
    } else {
      recommendations.push(
        'The patterns identified are exploratory starting points. A healthcare provider can help determine ' +
          'whether these areas are relevant to your experience and guide next steps.'
      );
    }
  }

  // If no results matched, provide general wellness
  if (results.length === 0 && !safety.should_halt) {
    recommendations.push(
      'Your selected experiences did not strongly match specific patterns in our knowledge base. ' +
        'This does not mean your concerns are not valid — many experiences are unique to the individual.'
    );
    recommendations.push(
      'General wellness strategies like regular exercise, quality sleep, balanced nutrition, ' +
        'and social connection can benefit mental wellbeing for everyone.'
    );
    recommendations.push(
      'If your experiences are causing distress, speaking with a healthcare provider can help. ' +
        'You might also try selecting additional symptoms or providing more detailed severity and duration information.'
    );
  }

  // High severity symptoms present
  const highSeverity = symptoms.filter((s) => s.severity >= 7);
  if (highSeverity.length > 0 && !safety.has_crisis) {
    recommendations.push(
      'Some of the experiences you described are rated at a higher intensity. ' +
        'A mental health professional can help you develop strategies to manage them.'
    );
  }

  // Long duration symptoms
  const longDuration = symptoms.filter(
    (s) =>
      s.duration === 'more_than_1_year' || s.duration === '6_months_to_1_year'
  );
  if (longDuration.length > 0) {
    recommendations.push(
      'Some experiences you described have been present for an extended period. ' +
        'Professional support can be especially helpful for persistent concerns.'
    );
  }

  // Safety-related recommendations
  if (safety.has_watch) {
    recommendations.push(
      'Some of your responses suggest experiences worth monitoring. Consider keeping a journal ' +
        'to track patterns and share with a healthcare provider.'
    );
  }

  if (safety.has_urgent) {
    recommendations.push(
      'Based on some of your responses, we recommend scheduling an appointment with a healthcare ' +
        'provider in the near future for a thorough evaluation.'
    );
  }

  // Recommend professional if any condition says so
  const needsProfessional = results.some((r) => r.always_recommend_professional);
  if (needsProfessional) {
    recommendations.push(
      'The areas identified often benefit significantly from professional evaluation and guidance. ' +
        'A qualified provider can help determine the best path forward for you.'
    );
  }

  return recommendations;
}
