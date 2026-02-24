/**
 * Symptom Navigator — Scoring & Matching Tests
 *
 * Tests the core matching algorithm including:
 * - Correct condition ranking for classic presentations
 * - Confidence cap enforcement (NEVER > 0.75)
 * - Below-minimum penalty
 * - Result count bounds
 * - Edge cases (empty input, single symptom, no matches)
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { runSymptomNavigator } from '@/lib/navigator/engine';
import { calculateConditionScore, rankAndDiversify, scoreAllConditions } from '@/lib/navigator/scoring';
import { normalizeSymptoms, DEFAULT_MATCHING_CONFIG } from '@/lib/navigator/utils';
import type {
  KnowledgeBase,
  UserSymptomInput,
} from '@/lib/navigator/types';
import { createTestKnowledgeBase } from './test-helpers';

describe('Scoring Engine — Condition Matching', () => {
  let kb: KnowledgeBase;

  beforeAll(() => {
    kb = createTestKnowledgeBase();
  });

  // ─── Classic Depression ──────────────────────────────────────────────────

  describe('Classic depression presentation', () => {
    it('MDE is the #1 result for classic depression inputs', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'MOD_001', severity: 7, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'MOD_002', severity: 6, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'MOD_003', severity: 8, duration: '1_to_3_months', frequency: 'always' },
        { symptom_id: 'MOD_006', severity: 6, duration: '1_to_3_months', frequency: 'often' }, // Guilt — w2 in MDE, not in PDD
        { symptom_id: 'ENR_001', severity: 7, duration: '1_to_3_months', frequency: 'always' },
        { symptom_id: 'SLP_001', severity: 6, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'COG_001', severity: 5, duration: '2_to_4_weeks', frequency: 'often' },
        { symptom_id: 'APT_001', severity: 5, duration: '2_to_4_weeks', frequency: 'sometimes' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      expect(results.results.length).toBeGreaterThan(0);
      expect(results.results[0].condition_id).toBe('MDE');
    });
  });

  // ─── Classic Anxiety ─────────────────────────────────────────────────────

  describe('Classic anxiety presentation', () => {
    it('GAD is the #1 result for classic anxiety inputs', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'ANX_001', severity: 8, duration: '6_months_to_1_year', frequency: 'always' },
        { symptom_id: 'ANX_008', severity: 7, duration: '6_months_to_1_year', frequency: 'often' },
        { symptom_id: 'EMR_002', severity: 6, duration: '3_to_6_months', frequency: 'often' },
        { symptom_id: 'BDY_001', severity: 6, duration: '3_to_6_months', frequency: 'often' },
        { symptom_id: 'SLP_001', severity: 5, duration: '3_to_6_months', frequency: 'sometimes' },
        { symptom_id: 'COG_001', severity: 5, duration: '3_to_6_months', frequency: 'sometimes' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      expect(results.results.length).toBeGreaterThan(0);
      expect(results.results[0].condition_id).toBe('GAD');
    });
  });

  // ─── Mixed Depression + Anxiety ──────────────────────────────────────────

  describe('Mixed presentations', () => {
    it('Both MDE and GAD appear for mixed depression + anxiety inputs', () => {
      const inputs: UserSymptomInput[] = [
        // Depression symptoms
        { symptom_id: 'MOD_001', severity: 7, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'MOD_003', severity: 6, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'MOD_006', severity: 6, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'ENR_001', severity: 7, duration: '1_to_3_months', frequency: 'always' },
        // Anxiety-specific symptoms
        { symptom_id: 'ANX_001', severity: 7, duration: '6_months_to_1_year', frequency: 'often' },
        { symptom_id: 'ANX_008', severity: 7, duration: '3_to_6_months', frequency: 'often' },
        { symptom_id: 'EMR_002', severity: 6, duration: '3_to_6_months', frequency: 'often' }, // Core in GAD
        { symptom_id: 'BDY_001', severity: 5, duration: '3_to_6_months', frequency: 'often' }, // Common in GAD
        // Shared symptoms
        { symptom_id: 'SLP_001', severity: 5, duration: '2_to_4_weeks', frequency: 'often' },
        { symptom_id: 'COG_001', severity: 5, duration: '2_to_4_weeks', frequency: 'sometimes' },
      ];

      const results = runSymptomNavigator(inputs, kb);
      const resultConditions = results.results.map((r) => ({
        id: r.condition_id,
        category: kb.conditions.find((c) => c.id === r.condition_id)?.category,
      }));

      // Both mood-related and anxiety-related conditions should appear
      const hasMoodCondition = resultConditions.some(
        (c) => c.category === 'mood' || c.category === 'stress'
      );
      const hasAnxietyCondition = resultConditions.some(
        (c) => c.category === 'anxiety'
      );

      expect(hasMoodCondition).toBe(true);
      expect(hasAnxietyCondition).toBe(true);
      expect(results.results.length).toBeGreaterThanOrEqual(2);
    });
  });

  // ─── Confidence Cap — THE SACRED INVARIANT ───────────────────────────────

  describe('Confidence cap enforcement', () => {
    it('Score NEVER exceeds 0.75 — even with maximum inputs', () => {
      // Select ALL symptoms at maximum severity, duration, frequency
      const inputs: UserSymptomInput[] = kb.symptoms
        .filter((s) => !s.is_red_flag) // Exclude crisis symptoms
        .map((s) => ({
          symptom_id: s.id,
          severity: 10,
          duration: 'more_than_1_year' as const,
          frequency: 'always' as const,
        }));

      const results = runSymptomNavigator(inputs, kb);

      for (const result of results.results) {
        expect(result.relevance_score).toBeLessThanOrEqual(0.75);
      }
    });

    it('Score NEVER exceeds 0.75 for any single condition', () => {
      // Test each condition with all its mapped symptoms at max
      for (const condition of kb.conditions) {
        const inputs: UserSymptomInput[] = condition.symptom_mappings.map((m) => ({
          symptom_id: m.symptom_id,
          severity: 10,
          duration: 'more_than_1_year' as const,
          frequency: 'always' as const,
        }));

        const normalized = normalizeSymptoms(inputs, kb.symptoms);
        const score = calculateConditionScore(normalized, condition, {
          confidence_cap: kb.matchingConfig.confidence_cap,
          below_minimum_penalty: kb.matchingConfig.below_minimum_penalty,
          severity_modifiers: kb.matchingConfig.severity_modifiers,
          frequency_modifiers: kb.matchingConfig.frequency_modifiers,
          duration_modifiers: kb.matchingConfig.duration_modifiers,
        });

        expect(score.capped_score).toBeLessThanOrEqual(0.75);
      }
    });
  });

  // ─── Result Count Bounds ─────────────────────────────────────────────────

  describe('Result count constraints', () => {
    it('Results count is always between 1 and 4 when there are matches', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'MOD_001', severity: 7, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'MOD_003', severity: 6, duration: '2_to_4_weeks', frequency: 'often' },
        { symptom_id: 'ENR_001', severity: 6, duration: '1_to_3_months', frequency: 'always' },
        { symptom_id: 'SLP_001', severity: 5, duration: '2_to_4_weeks', frequency: 'often' },
        { symptom_id: 'ANX_001', severity: 5, duration: '1_to_3_months', frequency: 'often' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      expect(results.results.length).toBeGreaterThanOrEqual(1);
      expect(results.results.length).toBeLessThanOrEqual(4);
    });

    it('No more than max_per_family (2) conditions from same category', () => {
      // Input symptoms that match many anxiety conditions
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'ANX_001', severity: 8, duration: '6_months_to_1_year', frequency: 'always' },
        { symptom_id: 'ANX_002', severity: 7, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'ANX_003', severity: 6, duration: '3_to_6_months', frequency: 'often' },
        { symptom_id: 'ANX_004', severity: 6, duration: '3_to_6_months', frequency: 'often' },
        { symptom_id: 'ANX_006', severity: 7, duration: '3_to_6_months', frequency: 'often' },
        { symptom_id: 'SOC_002', severity: 6, duration: '3_to_6_months', frequency: 'often' },
        { symptom_id: 'BDY_003', severity: 6, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'CPG_001', severity: 5, duration: '3_to_6_months', frequency: 'often' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      // Count conditions per category
      const categoryCounts = new Map<string, number>();
      for (const r of results.results) {
        const condition = kb.conditions.find((c) => c.id === r.condition_id);
        if (condition) {
          const count = categoryCounts.get(condition.category) ?? 0;
          categoryCounts.set(condition.category, count + 1);
        }
      }

      for (const [_category, count] of categoryCounts) {
        expect(count).toBeLessThanOrEqual(2);
      }
    });
  });

  // ─── Edge Cases ──────────────────────────────────────────────────────────

  describe('Edge cases', () => {
    it('Single mild symptom produces low relevance', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'SLP_001', severity: 3, duration: 'less_than_1_week', frequency: 'rarely' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      // Should either have no results or very low scores
      for (const result of results.results) {
        expect(result.relevance_score).toBeLessThan(0.35);
      }
    });

    it('Empty inputs produce no results (general wellness fallback)', () => {
      const inputs: UserSymptomInput[] = [];

      const results = runSymptomNavigator(inputs, kb);

      expect(results.results).toHaveLength(0);
      expect(results.general_recommendations.length).toBeGreaterThan(0);
    });

    it('Invalid symptom IDs are silently ignored', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'INVALID_001', severity: 5 },
        { symptom_id: 'MOD_001', severity: 5 },
      ];

      const normalized = normalizeSymptoms(inputs, kb.symptoms);

      expect(normalized).toHaveLength(1);
      expect(normalized[0].symptom_id).toBe('MOD_001');
    });

    it('No matches produces general wellness recommendations', () => {
      // Use a symptom that has very few condition mappings at low severity
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'ENR_004', severity: 2, duration: 'less_than_1_week', frequency: 'rarely' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      if (results.results.length === 0) {
        expect(results.general_recommendations.length).toBeGreaterThan(0);
        expect(results.general_recommendations.some((r) =>
          r.toLowerCase().includes('wellness') || r.toLowerCase().includes('not strongly match')
        )).toBe(true);
      }
    });
  });

  // ─── Below-Minimum Penalty ───────────────────────────────────────────────

  describe('Below-minimum symptom penalty', () => {
    it('Conditions below minimum symptom count receive 0.3x penalty', () => {
      // MDE requires 5 symptoms minimum — provide only 2
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'MOD_001', severity: 8, duration: '1_to_3_months', frequency: 'always' },
        { symptom_id: 'ENR_001', severity: 8, duration: '1_to_3_months', frequency: 'always' },
      ];

      const normalized = normalizeSymptoms(inputs, kb.symptoms);
      const mdeCondition = kb.conditions.find((c) => c.id === 'MDE')!;

      const score = calculateConditionScore(normalized, mdeCondition, {
        confidence_cap: 0.75,
        below_minimum_penalty: 0.3,
        severity_modifiers: kb.matchingConfig.severity_modifiers,
        frequency_modifiers: kb.matchingConfig.frequency_modifiers,
        duration_modifiers: kb.matchingConfig.duration_modifiers,
      });

      expect(score.meets_minimum).toBe(false);
      // The score should be very low due to the 0.3 penalty
      expect(score.capped_score).toBeLessThan(0.2);
    });
  });

  // ─── Modifier Tests ──────────────────────────────────────────────────────

  describe('Modifier effects', () => {
    it('Higher severity produces higher scores', () => {
      const lowInputs: UserSymptomInput[] = [
        { symptom_id: 'MOD_001', severity: 2, duration: '2_to_4_weeks', frequency: 'sometimes' },
        { symptom_id: 'MOD_002', severity: 2, duration: '2_to_4_weeks', frequency: 'sometimes' },
        { symptom_id: 'MOD_003', severity: 2, duration: '2_to_4_weeks', frequency: 'sometimes' },
        { symptom_id: 'ENR_001', severity: 2, duration: '2_to_4_weeks', frequency: 'sometimes' },
        { symptom_id: 'SLP_001', severity: 2, duration: '2_to_4_weeks', frequency: 'sometimes' },
      ];

      const highInputs: UserSymptomInput[] = [
        { symptom_id: 'MOD_001', severity: 9, duration: '2_to_4_weeks', frequency: 'sometimes' },
        { symptom_id: 'MOD_002', severity: 9, duration: '2_to_4_weeks', frequency: 'sometimes' },
        { symptom_id: 'MOD_003', severity: 9, duration: '2_to_4_weeks', frequency: 'sometimes' },
        { symptom_id: 'ENR_001', severity: 9, duration: '2_to_4_weeks', frequency: 'sometimes' },
        { symptom_id: 'SLP_001', severity: 9, duration: '2_to_4_weeks', frequency: 'sometimes' },
      ];

      const lowResults = runSymptomNavigator(lowInputs, kb);
      const highResults = runSymptomNavigator(highInputs, kb);

      const lowMDE = lowResults.results.find((r) => r.condition_id === 'MDE');
      const highMDE = highResults.results.find((r) => r.condition_id === 'MDE');

      // Both should produce MDE, but high severity should score higher
      if (lowMDE && highMDE) {
        expect(highMDE.relevance_score).toBeGreaterThan(lowMDE.relevance_score);
      }
    });

    it('Longer duration meeting condition minimum boosts score', () => {
      const shortInputs: UserSymptomInput[] = [
        { symptom_id: 'MOD_001', severity: 6, duration: 'less_than_1_week', frequency: 'often' },
        { symptom_id: 'MOD_002', severity: 6, duration: 'less_than_1_week', frequency: 'often' },
        { symptom_id: 'MOD_003', severity: 6, duration: 'less_than_1_week', frequency: 'often' },
        { symptom_id: 'ENR_001', severity: 6, duration: 'less_than_1_week', frequency: 'often' },
        { symptom_id: 'SLP_001', severity: 6, duration: 'less_than_1_week', frequency: 'often' },
      ];

      const longInputs: UserSymptomInput[] = [
        { symptom_id: 'MOD_001', severity: 6, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'MOD_002', severity: 6, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'MOD_003', severity: 6, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'ENR_001', severity: 6, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'SLP_001', severity: 6, duration: '1_to_3_months', frequency: 'often' },
      ];

      const shortResults = runSymptomNavigator(shortInputs, kb);
      const longResults = runSymptomNavigator(longInputs, kb);

      const shortMDE = shortResults.results.find((r) => r.condition_id === 'MDE');
      const longMDE = longResults.results.find((r) => r.condition_id === 'MDE');

      if (shortMDE && longMDE) {
        expect(longMDE.relevance_score).toBeGreaterThan(shortMDE.relevance_score);
      }
    });
  });

  // ─── Output Structure ────────────────────────────────────────────────────

  describe('Output structure', () => {
    it('Results contain all required fields', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'MOD_001', severity: 7, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'MOD_003', severity: 6, duration: '2_to_4_weeks', frequency: 'often' },
        { symptom_id: 'ENR_001', severity: 6, duration: '1_to_3_months', frequency: 'always' },
        { symptom_id: 'SLP_001', severity: 5, duration: '2_to_4_weeks', frequency: 'often' },
        { symptom_id: 'COG_001', severity: 5, duration: '2_to_4_weeks', frequency: 'sometimes' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      // Top-level structure
      expect(results).toHaveProperty('safety');
      expect(results).toHaveProperty('results');
      expect(results).toHaveProperty('general_recommendations');
      expect(results).toHaveProperty('disclaimer');
      expect(results).toHaveProperty('version');
      expect(results).toHaveProperty('timestamp');

      // Result item structure
      if (results.results.length > 0) {
        const item = results.results[0];
        expect(item).toHaveProperty('condition_id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('full_name');
        expect(item).toHaveProperty('description_for_user');
        expect(item).toHaveProperty('relevance_score');
        expect(item).toHaveProperty('relevance_level');
        expect(item).toHaveProperty('relevance_label');
        expect(item).toHaveProperty('relevance_color');
        expect(item).toHaveProperty('matched_symptoms');
        expect(item).toHaveProperty('guide_path');
        expect(item).toHaveProperty('coping_path');
        expect(item).toHaveProperty('provider_questions');
        expect(item).toHaveProperty('always_recommend_professional');
      }

      // Disclaimer must exist
      expect(results.disclaimer.length).toBeGreaterThan(50);
    });
  });
});
