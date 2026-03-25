 
/**
 * Symptom Navigator — Safety Tests
 *
 * MUST be 100% pass rate. These tests verify that:
 * - CRISIS symptoms always trigger CRISIS level
 * - URGENT symptoms always trigger URGENT level
 * - Severity thresholds correctly trigger flags
 * - Mild symptoms do NOT trigger false flags
 * - Safety screening runs before matching
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { screenRedFlags } from '@/lib/navigator/safety';
import { normalizeSymptoms } from '@/lib/navigator/utils';
import { runSymptomNavigator } from '@/lib/navigator/engine';
import type {
  CrisisResourcesByRegion,
  KnowledgeBase,
  Symptom,
  UserSymptomInput,
} from '@/lib/navigator/types';
import {
  createTestKnowledgeBase,
  CRISIS_SYMPTOM_IDS,
} from './test-helpers';

describe('Safety Screening — Red Flag Detection', () => {
  let kb: KnowledgeBase;
  let symptoms: Symptom[];
  let crisisResources: CrisisResourcesByRegion;

  beforeAll(() => {
    kb = createTestKnowledgeBase();
    symptoms = kb.symptoms;
    crisisResources = kb.crisisResources;
  });

  // ─── CRISIS-Level Tests ──────────────────────────────────────────────────

  describe('CRISIS-level red flags', () => {
    it('COG_008 (self-harm thoughts) triggers CRISIS', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'COG_008', severity: 5 },
      ];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources);

      expect(result.has_crisis).toBe(true);
      expect(result.should_halt).toBe(true);
      expect(result.highest_level).toBe('CRISIS');
      expect(result.flags.some((f) => f.symptom_id === 'COG_008')).toBe(true);
    });

    it('COG_009 (suicidal thoughts) triggers CRISIS', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'COG_009', severity: 3 },
      ];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources);

      expect(result.has_crisis).toBe(true);
      expect(result.should_halt).toBe(true);
      expect(result.highest_level).toBe('CRISIS');
    });

    it('COG_010 (thoughts of harming others) triggers CRISIS', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'COG_010', severity: 4 },
      ];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources);

      expect(result.has_crisis).toBe(true);
      expect(result.should_halt).toBe(true);
      expect(result.highest_level).toBe('CRISIS');
    });

    it('CPG_004 (active self-harm) triggers CRISIS', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'CPG_004', severity: 6 },
      ];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources);

      expect(result.has_crisis).toBe(true);
      expect(result.should_halt).toBe(true);
      expect(result.highest_level).toBe('CRISIS');
    });

    it('CRISIS triggers at ANY severity level (even 1)', () => {
      for (const id of CRISIS_SYMPTOM_IDS) {
        const inputs: UserSymptomInput[] = [{ symptom_id: id, severity: 1 }];
        const normalized = normalizeSymptoms(inputs, symptoms);
        const result = screenRedFlags(normalized, symptoms, crisisResources);

        expect(result.has_crisis).toBe(true);
        expect(result.should_halt).toBe(true);
      }
    });
  });

  // ─── URGENT-Level Tests ──────────────────────────────────────────────────

  describe('URGENT-level red flags', () => {
    it('PRC_004 (hearing voices) triggers URGENT', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'PRC_004', severity: 5 },
      ];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources);

      expect(result.has_urgent).toBe(true);
      expect(result.should_halt).toBe(false); // URGENT does not halt
      expect(result.highest_level).toBe('URGENT');
    });

    it('BDY_003 severity 9 triggers URGENT via severity threshold', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'BDY_003', severity: 9 },
      ];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources);

      expect(result.has_urgent).toBe(true);
      expect(result.highest_level).toBe('URGENT');
      expect(result.flags.some(
        (f) => f.symptom_id === 'BDY_003' && f.trigger === 'severity_threshold'
      )).toBe(true);
    });

    it('BDY_003 severity 8 does NOT trigger URGENT (threshold is 9)', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'BDY_003', severity: 8 },
      ];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources);

      expect(result.has_urgent).toBe(false);
      expect(result.highest_level).toBe(null);
    });
  });

  // ─── WATCH-Level Tests ───────────────────────────────────────────────────

  describe('WATCH-level red flags', () => {
    it('EMR_004 (euphoria) severity 7+ triggers WATCH', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'EMR_004', severity: 7 },
      ];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources);

      expect(result.has_watch).toBe(true);
      expect(result.highest_level).toBe('WATCH');
    });

    it('ACT_005 (risk-taking) severity 8+ triggers WATCH', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'ACT_005', severity: 8 },
      ];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources);

      expect(result.has_watch).toBe(true);
      expect(result.highest_level).toBe('WATCH');
    });
  });

  // ─── No False Flags ──────────────────────────────────────────────────────

  describe('No false flags for mild symptoms', () => {
    it('Mild symptoms only produce NO safety flags', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'MOD_001', severity: 3, duration: '1_to_2_weeks', frequency: 'sometimes' },
        { symptom_id: 'SLP_001', severity: 4, duration: '1_to_2_weeks', frequency: 'sometimes' },
        { symptom_id: 'ENR_001', severity: 2, duration: 'less_than_1_week', frequency: 'rarely' },
      ];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources);

      expect(result.has_crisis).toBe(false);
      expect(result.has_urgent).toBe(false);
      expect(result.has_watch).toBe(false);
      expect(result.highest_level).toBe(null);
      expect(result.flags).toHaveLength(0);
      expect(result.should_halt).toBe(false);
    });

    it('Non-red-flag symptoms at high severity do NOT trigger flags', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'MOD_001', severity: 10 }, // Sadness at 10 is not a red flag
        { symptom_id: 'COG_001', severity: 10 }, // Concentration at 10 is not a red flag
      ];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources);

      expect(result.has_crisis).toBe(false);
      expect(result.has_urgent).toBe(false);
      expect(result.flags).toHaveLength(0);
    });
  });

  // ─── Hierarchy Tests ─────────────────────────────────────────────────────

  describe('Red flag hierarchy', () => {
    it('CRISIS takes priority over URGENT when both present', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'COG_009', severity: 5 }, // CRISIS
        { symptom_id: 'PRC_004', severity: 5 }, // URGENT
      ];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources);

      expect(result.highest_level).toBe('CRISIS');
      expect(result.has_crisis).toBe(true);
      expect(result.has_urgent).toBe(true);
      expect(result.should_halt).toBe(true);
    });

    it('URGENT takes priority over WATCH when both present', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'PRC_004', severity: 5 }, // URGENT
        { symptom_id: 'EMR_004', severity: 8 }, // WATCH
      ];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources);

      expect(result.highest_level).toBe('URGENT');
    });
  });

  // ─── Engine Integration: Safety Before Matching ──────────────────────────

  describe('Safety screening halts matching', () => {
    it('CRISIS symptom halts engine — no condition results returned', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'COG_009', severity: 5 },
        { symptom_id: 'MOD_001', severity: 7, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'MOD_002', severity: 6, duration: '2_to_4_weeks', frequency: 'often' },
        { symptom_id: 'ENR_001', severity: 6, duration: '1_to_3_months', frequency: 'always' },
      ];

      const results = runSymptomNavigator(inputs, kb, 'US');

      expect(results.safety.should_halt).toBe(true);
      expect(results.safety.has_crisis).toBe(true);
      expect(results.results).toHaveLength(0); // No condition results
      expect(results.safety.crisis_resources.length).toBeGreaterThan(0);
    });

    it('URGENT does NOT halt engine — results are still returned', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'PRC_004', severity: 5 }, // URGENT
        { symptom_id: 'MOD_001', severity: 7, duration: '1_to_3_months', frequency: 'often' },
        { symptom_id: 'MOD_002', severity: 6, duration: '2_to_4_weeks', frequency: 'often' },
        { symptom_id: 'ENR_001', severity: 6, duration: '1_to_3_months', frequency: 'always' },
        { symptom_id: 'SLP_001', severity: 5, duration: '2_to_4_weeks', frequency: 'often' },
      ];

      const results = runSymptomNavigator(inputs, kb, 'US');

      expect(results.safety.should_halt).toBe(false);
      expect(results.safety.has_urgent).toBe(true);
      expect(results.results.length).toBeGreaterThan(0);
    });
  });

  // ─── Crisis Resources ────────────────────────────────────────────────────

  describe('Crisis resources', () => {
    it('Returns region-specific resources when available', () => {
      const inputs: UserSymptomInput[] = [{ symptom_id: 'COG_009', severity: 5 }];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources, 'US');

      expect(result.crisis_resources.length).toBeGreaterThan(0);
      expect(result.crisis_resources.every((r) => r.region_code === 'US')).toBe(true);
    });

    it('Falls back to DEFAULT when region not found', () => {
      const inputs: UserSymptomInput[] = [{ symptom_id: 'COG_009', severity: 5 }];
      const normalized = normalizeSymptoms(inputs, symptoms);
      const result = screenRedFlags(normalized, symptoms, crisisResources, 'XX');

      expect(result.crisis_resources.length).toBeGreaterThan(0);
      expect(result.crisis_resources.every((r) => r.region_code === 'DEFAULT')).toBe(true);
    });
  });
});
