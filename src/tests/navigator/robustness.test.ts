/**
 * Symptom Navigator — Robustness & Resilience Tests
 *
 * Tests that verify:
 * - CRISIS red flag always halts matching (no condition results)
 * - Confidence cap NEVER exceeds 0.75
 * - Determinism: same input → same output
 * - Default values are valid (not bypassing validation via `as`)
 * - Engine handles edge cases without throwing
 * - KB loads without network fetch (bundled data)
 */

import { describe, it, expect, beforeAll, vi } from 'vitest';
import { runSymptomNavigator } from '@/lib/navigator/engine';
import type { KnowledgeBase, UserSymptomInput } from '@/lib/navigator/types';
import { createTestKnowledgeBase, CRISIS_SYMPTOM_IDS } from './test-helpers';
import { SYMPTOM_DEFAULTS } from '@/lib/navigator/defaults';
import { mockKnowledgeBase } from '@/data/mock_knowledge_base';

describe('Robustness & Resilience', () => {
  let kb: KnowledgeBase;

  beforeAll(() => {
    kb = createTestKnowledgeBase();
  });

  // ─── CRISIS Halt ────────────────────────────────────────────────────────

  describe('CRISIS red flag halts matching', () => {
    it('returns zero condition results when CRISIS symptom is selected', () => {
      for (const crisisId of CRISIS_SYMPTOM_IDS) {
        const inputs: UserSymptomInput[] = [
          { symptom_id: crisisId },
          { symptom_id: 'MOD_001', severity: 7, duration: '1_to_3_months', frequency: 'often' },
        ];

        const results = runSymptomNavigator(inputs, kb);

        expect(results.safety.should_halt).toBe(true);
        expect(results.safety.has_crisis).toBe(true);
        expect(results.results).toHaveLength(0);
      }
    });
  });

  // ─── Confidence Cap ──────────────────────────────────────────────────────

  describe('Confidence cap enforcement', () => {
    it('no result ever exceeds 0.75 relevance score', () => {
      // Flood with many high-severity, high-frequency symptoms
      const allSymptomIds = kb.symptoms
        .filter(s => !s.is_red_flag)
        .map(s => s.id);

      const inputs: UserSymptomInput[] = allSymptomIds.map(id => ({
        symptom_id: id,
        severity: 10,
        duration: 'more_than_1_year',
        frequency: 'always',
      }));

      const results = runSymptomNavigator(inputs, kb);

      for (const result of results.results) {
        expect(result.relevance_score).toBeLessThanOrEqual(0.75);
      }
    });

    it('cap holds even for a perfectly matching condition', () => {
      // Select ALL core symptoms for MDE with max severity
      const mde = kb.conditions.find(c => c.id === 'MDE');
      if (!mde) return; // skip if test KB doesn't have MDE

      const coreSymptoms = mde.symptom_mappings
        .filter(m => m.role === 'core')
        .map(m => m.symptom_id);

      const inputs: UserSymptomInput[] = coreSymptoms.map(id => ({
        symptom_id: id,
        severity: 10,
        duration: 'more_than_1_year',
        frequency: 'always',
      }));

      const results = runSymptomNavigator(inputs, kb);

      for (const result of results.results) {
        expect(result.relevance_score).toBeLessThanOrEqual(0.75);
      }
    });
  });

  // ─── Determinism ──────────────────────────────────────────────────────────

  describe('Determinism', () => {
    it('same input produces identical output across 10 runs', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'MOD_001', severity: 7, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'ANX_001', severity: 6, duration: '2_to_4_weeks', frequency: 'sometimes' },
        { symptom_id: 'SLP_001', severity: 5, duration: '1_to_2_weeks', frequency: 'often' },
      ];

      const baseline = runSymptomNavigator(inputs, kb);

      for (let i = 0; i < 10; i++) {
        const run = runSymptomNavigator(inputs, kb);

        expect(run.results.length).toBe(baseline.results.length);
        for (let j = 0; j < run.results.length; j++) {
          expect(run.results[j].condition_id).toBe(baseline.results[j].condition_id);
          expect(run.results[j].relevance_score).toBe(baseline.results[j].relevance_score);
        }
      }
    });
  });

  // ─── Default Values Validation ────────────────────────────────────────────

  describe('SYMPTOM_DEFAULTS are valid', () => {
    const VALID_DURATIONS = new Set([
      'less_than_1_week', '1_to_2_weeks', '2_to_4_weeks',
      '1_to_3_months', '3_to_6_months', '6_months_to_1_year', 'more_than_1_year',
    ]);

    const VALID_FREQUENCIES = new Set([
      'rarely', 'sometimes', 'often', 'always',
    ]);

    it('default duration is a valid UserDuration value', () => {
      expect(VALID_DURATIONS.has(SYMPTOM_DEFAULTS.duration)).toBe(true);
    });

    it('default frequency is a valid UserFrequency value', () => {
      expect(VALID_FREQUENCIES.has(SYMPTOM_DEFAULTS.frequency)).toBe(true);
    });

    it('default severity is between 1 and 10', () => {
      expect(SYMPTOM_DEFAULTS.severity).toBeGreaterThanOrEqual(1);
      expect(SYMPTOM_DEFAULTS.severity).toBeLessThanOrEqual(10);
    });
  });

  // ─── Engine Edge Cases ────────────────────────────────────────────────────

  describe('Engine edge cases do not throw', () => {
    it('handles empty symptom list', () => {
      const results = runSymptomNavigator([], kb);
      expect(results.results).toBeDefined();
      expect(results.safety).toBeDefined();
    });

    it('handles single symptom with no details', () => {
      const results = runSymptomNavigator([{ symptom_id: 'MOD_001' }], kb);
      expect(results.results).toBeDefined();
    });

    it('handles unknown symptom IDs gracefully', () => {
      const results = runSymptomNavigator(
        [{ symptom_id: 'NONEXISTENT_999' }],
        kb
      );
      expect(results.results).toBeDefined();
    });

    it('handles all symptoms selected at once', () => {
      const inputs = kb.symptoms
        .filter(s => !s.is_red_flag)
        .map(s => ({ symptom_id: s.id, severity: 5 }));

      const results = runSymptomNavigator(inputs, kb);
      expect(results.results.length).toBeLessThanOrEqual(5); // max_results cap
    });
  });

  // ─── No Symptom Data Leakage ──────────────────────────────────────────────

  describe('No symptom data in network calls', () => {
    it('engine does not call fetch', () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch');

      const inputs: UserSymptomInput[] = [
        { symptom_id: 'MOD_001', severity: 7, duration: '1_to_3_months', frequency: 'often' },
      ];

      runSymptomNavigator(inputs, kb);

      expect(fetchSpy).not.toHaveBeenCalled();
      fetchSpy.mockRestore();
    });
  });

  // ─── Bundled KB Integrity ─────────────────────────────────────────────────

  describe('Bundled knowledge base integrity', () => {
    it('mockKnowledgeBase has all required fields', () => {
      expect(mockKnowledgeBase.symptoms).toBeDefined();
      expect(mockKnowledgeBase.conditions).toBeDefined();
      expect(mockKnowledgeBase.matchingConfig).toBeDefined();
      expect(mockKnowledgeBase.crisisResources).toBeDefined();
    });

    it('has expected data counts', () => {
      expect(mockKnowledgeBase.symptoms.length).toBeGreaterThanOrEqual(80);
      expect(mockKnowledgeBase.conditions.length).toBeGreaterThanOrEqual(15);
    });

    it('confidence cap is set to 0.75', () => {
      expect(mockKnowledgeBase.matchingConfig.confidence_cap).toBe(0.75);
    });

    it('contains crisis resources for US and DEFAULT regions', () => {
      expect(mockKnowledgeBase.crisisResources.US).toBeDefined();
      expect(mockKnowledgeBase.crisisResources.DEFAULT).toBeDefined();
    });
  });
});
