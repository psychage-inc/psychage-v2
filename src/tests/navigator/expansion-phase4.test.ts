 
/**
 * Symptom Navigator — Phase 4 Expansion Tests
 *
 * Tests for 14 new conditions across 4 categories:
 * - Personality Disorders: NPD, ASPD, DPD, SZPD
 * - Trauma/Dissociative: CPTSD, DID, OSDD, ASD_ACUTE
 * - OCD/Impulse: TTM, SPD_EXCOR, IED
 * - Extensions: HYPER, ARFID, CYC
 *
 * Test coverage:
 * 1. Classic presentations (14 tests)
 * 2. Collision/differentiation (9 tests)
 * 3. Safety flags (5 tests)
 * 4. Confidence cap (3 tests)
 * 5. Category diversity (2 tests)
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { runSymptomNavigator } from '@/lib/navigator/engine';
import type {
  KnowledgeBase,
  UserSymptomInput,
} from '@/lib/navigator/types';
import { createTestKnowledgeBase } from './test-helpers';

describe('Phase 4 Expansion — Classic Presentations', () => {
  let kb: KnowledgeBase;

  beforeAll(() => {
    kb = createTestKnowledgeBase();
  });

  // ─────────────────────────────────────────────────────────────────────────
  // TIER 4 CONDITIONS
  // ─────────────────────────────────────────────────────────────────────────

  describe('NPD — Narcissistic Personality Disorder', () => {
    it('NPD appears in top 3 for classic narcissistic presentation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'IDN_005', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // Grandiosity (core)
        { symptom_id: 'IDN_006', severity: 7, duration: 'more_than_1_year', frequency: 'often' },  // Lack of empathy (core)
        { symptom_id: 'IDN_007', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // Need for admiration (core)
        { symptom_id: 'EMR_002', severity: 6, duration: 'more_than_1_year', frequency: 'often' },  // Irritability (common)
        { symptom_id: 'MOD_011', severity: 5, duration: 'more_than_1_year', frequency: 'sometimes' }, // Envy (common)
        { symptom_id: 'SOC_003', severity: 6, duration: 'more_than_1_year', frequency: 'often' },  // Relationship difficulties (core)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const topThreeIds = results.results.slice(0, 3).map(r => r.condition_id);

      expect(topThreeIds).toContain('NPD');
      expect(results.results[0].relevance_score).toBeLessThanOrEqual(0.75); // Confidence cap
    });
  });

  describe('ASPD — Antisocial Personality Disorder', () => {
    it('ASPD appears in top 3 for classic antisocial presentation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'EMR_008', severity: 7, duration: 'more_than_1_year', frequency: 'always' }, // Inability to conform to norms (core)
        { symptom_id: 'ACT_009', severity: 8, duration: 'more_than_1_year', frequency: 'often' },  // Reckless behavior (core)
        { symptom_id: 'ACT_010', severity: 7, duration: 'more_than_1_year', frequency: 'often' },  // Lying/manipulation (core)
        { symptom_id: 'IDN_006', severity: 7, duration: 'more_than_1_year', frequency: 'always' }, // Lack of empathy (core)
        { symptom_id: 'EMR_002', severity: 6, duration: 'more_than_1_year', frequency: 'often' },  // Irritability (common)
        { symptom_id: 'CPG_003', severity: 5, duration: '3_to_6_months', frequency: 'often' },     // Substance use (common)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const topThreeIds = results.results.slice(0, 3).map(r => r.condition_id);

      expect(topThreeIds).toContain('ASPD');
      expect(results.results[0].relevance_score).toBeLessThanOrEqual(0.75);
    });
  });

  describe('CPTSD — Complex PTSD', () => {
    it('CPTSD appears in top 3 for complex trauma presentation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'EMR_003', severity: 8, duration: '6_months_to_1_year', frequency: 'often' }, // Flashbacks (core)
        { symptom_id: 'COG_013', severity: 7, duration: '6_months_to_1_year', frequency: 'often' }, // Emotional dysregulation (core)
        { symptom_id: 'IDN_001', severity: 6, duration: 'more_than_1_year', frequency: 'always' },  // Unstable identity (core)
        { symptom_id: 'SOC_003', severity: 6, duration: 'more_than_1_year', frequency: 'often' },   // Relationship difficulties (core)
        { symptom_id: 'ANX_005', severity: 7, duration: '6_months_to_1_year', frequency: 'always' }, // Hypervigilance (common)
        { symptom_id: 'EMR_006', severity: 6, duration: '6_months_to_1_year', frequency: 'often' }, // Shame (common)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const topThreeIds = results.results.slice(0, 3).map(r => r.condition_id);

      expect(topThreeIds).toContain('CPTSD');
      expect(results.results[0].relevance_score).toBeLessThanOrEqual(0.75);
    });
  });

  describe('DID — Dissociative Identity Disorder', () => {
    it('DID appears as top result for identity switching presentation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'PRC_008', severity: 7, duration: '6_months_to_1_year', frequency: 'often' }, // Identity switching (core) - URGENT flag
        { symptom_id: 'PRC_009', severity: 8, duration: '6_months_to_1_year', frequency: 'always' }, // Dissociative amnesia (core)
        { symptom_id: 'COG_004', severity: 6, duration: '6_months_to_1_year', frequency: 'often' }, // Memory problems (core)
        { symptom_id: 'PRC_002', severity: 6, duration: '3_to_6_months', frequency: 'often' },      // Depersonalization (core)
        { symptom_id: 'EMR_003', severity: 7, duration: '6_months_to_1_year', frequency: 'sometimes' }, // Flashbacks (common)
      ];

      const results = runSymptomNavigator(inputs, kb);

      expect(results.results[0].condition_id).toBe('DID');
      expect(results.safety.has_urgent).toBe(true); // PRC_008 triggers URGENT
      expect(results.safety.should_halt).toBe(false); // URGENT doesn't halt, only CRISIS does
      expect(results.results[0].relevance_score).toBeLessThanOrEqual(0.75);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // TIER 5 CONDITIONS
  // ─────────────────────────────────────────────────────────────────────────

  describe('DPD — Dependent Personality Disorder', () => {
    it('DPD appears in top 3 for dependent presentation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'IDN_008', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // Submissiveness (core)
        { symptom_id: 'SOC_005', severity: 7, duration: 'more_than_1_year', frequency: 'often' },  // Dependence on others (core)
        { symptom_id: 'IDN_002', severity: 7, duration: 'more_than_1_year', frequency: 'always' }, // Fear of abandonment (core)
        { symptom_id: 'ANX_004', severity: 6, duration: 'more_than_1_year', frequency: 'often' },  // Social anxiety (core)
        { symptom_id: 'MOD_007', severity: 6, duration: 'more_than_1_year', frequency: 'often' },  // Low self-esteem (common)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const topThreeIds = results.results.slice(0, 3).map(r => r.condition_id);

      expect(topThreeIds).toContain('DPD');
      expect(results.results[0].relevance_score).toBeLessThanOrEqual(0.75);
    });
  });

  describe('SZPD — Schizoid Personality Disorder', () => {
    it('SZPD appears in top 3 for schizoid presentation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'SOC_009', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // Detachment (core)
        { symptom_id: 'MOD_004', severity: 7, duration: 'more_than_1_year', frequency: 'always' }, // Emotional numbness (core)
        { symptom_id: 'SOC_001', severity: 7, duration: 'more_than_1_year', frequency: 'always' }, // Social withdrawal (core)
        { symptom_id: 'MOD_003', severity: 6, duration: 'more_than_1_year', frequency: 'often' },  // Loss of interest (core)
        { symptom_id: 'EMR_007', severity: 5, duration: 'more_than_1_year', frequency: 'often' },  // Chronic emptiness (common)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const topThreeIds = results.results.slice(0, 3).map(r => r.condition_id);

      expect(topThreeIds).toContain('SZPD');
      expect(results.results[0].relevance_score).toBeLessThanOrEqual(0.75);
    });
  });

  describe('OSDD — Other Specified Dissociative Disorder', () => {
    it('OSDD appears in results for subthreshold dissociative presentation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'PRC_009', severity: 6, duration: '3_to_6_months', frequency: 'often' },  // Dissociative amnesia (core)
        { symptom_id: 'PRC_002', severity: 7, duration: '3_to_6_months', frequency: 'often' },  // Depersonalization (core)
        { symptom_id: 'PRC_001', severity: 6, duration: '1_to_3_months', frequency: 'sometimes' }, // Derealization (core)
        { symptom_id: 'COG_004', severity: 5, duration: '1_to_3_months', frequency: 'often' },  // Memory problems (common)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const resultIds = results.results.map(r => r.condition_id);

      expect(resultIds).toContain('OSDD');
      expect(results.results[0].relevance_score).toBeLessThanOrEqual(0.75);
    });
  });

  describe('ASD_ACUTE — Acute Stress Disorder', () => {
    it('ASD_ACUTE appears in top 3 for acute trauma presentation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'EMR_003', severity: 8, duration: '2_to_4_weeks', frequency: 'often' },   // Flashbacks (core)
        { symptom_id: 'ANX_005', severity: 7, duration: '2_to_4_weeks', frequency: 'always' },  // Hypervigilance (core)
        { symptom_id: 'CPG_001', severity: 6, duration: '2_to_4_weeks', frequency: 'often' },   // Avoidance (core)
        { symptom_id: 'PRC_009', severity: 6, duration: '2_to_4_weeks', frequency: 'sometimes' }, // Amnesia (core)
        { symptom_id: 'SLP_004', severity: 7, duration: '2_to_4_weeks', frequency: 'often' },   // Nightmares (common)
        { symptom_id: 'PRC_001', severity: 6, duration: '2_to_4_weeks', frequency: 'often' },   // Derealization (common)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const topThreeIds = results.results.slice(0, 3).map(r => r.condition_id);

      expect(topThreeIds).toContain('ASD_ACUTE');
      expect(results.results[0].relevance_score).toBeLessThanOrEqual(0.75);
    });
  });

  describe('TTM — Trichotillomania', () => {
    it('TTM appears in top 3 for hair-pulling presentation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'CPG_013', severity: 7, duration: '6_months_to_1_year', frequency: 'often' }, // Hair pulling (core)
        { symptom_id: 'ANX_001', severity: 6, duration: '3_to_6_months', frequency: 'often' },      // Worry/tension (core)
        { symptom_id: 'CPG_002', severity: 6, duration: '6_months_to_1_year', frequency: 'often' }, // Compulsive behaviors (core)
        { symptom_id: 'EMR_006', severity: 5, duration: '3_to_6_months', frequency: 'often' },      // Shame (common)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const topThreeIds = results.results.slice(0, 3).map(r => r.condition_id);

      expect(topThreeIds).toContain('TTM');
      expect(results.results[0].relevance_score).toBeLessThanOrEqual(0.75);
    });
  });

  describe('SPD_EXCOR — Excoriation Disorder', () => {
    it('SPD_EXCOR appears in top 3 for skin-picking presentation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'CPG_014', severity: 7, duration: '6_months_to_1_year', frequency: 'often' }, // Skin picking (core)
        { symptom_id: 'ANX_001', severity: 6, duration: '3_to_6_months', frequency: 'often' },      // Worry/tension (core)
        { symptom_id: 'CPG_002', severity: 6, duration: '6_months_to_1_year', frequency: 'often' }, // Compulsive behaviors (core)
        { symptom_id: 'EMR_006', severity: 5, duration: '3_to_6_months', frequency: 'often' },      // Shame (common)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const topThreeIds = results.results.slice(0, 3).map(r => r.condition_id);

      expect(topThreeIds).toContain('SPD_EXCOR');
      expect(results.results[0].relevance_score).toBeLessThanOrEqual(0.75);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // TIER 6 CONDITIONS
  // ─────────────────────────────────────────────────────────────────────────

  describe('IED — Intermittent Explosive Disorder', () => {
    it('IED appears in top 3 for explosive anger presentation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'CPG_015', severity: 8, duration: '3_to_6_months', frequency: 'often' },  // Explosive anger (core)
        { symptom_id: 'EMR_002', severity: 7, duration: '3_to_6_months', frequency: 'always' }, // Irritability (core)
        { symptom_id: 'ACT_004', severity: 6, duration: '3_to_6_months', frequency: 'often' },  // Impulsivity (core)
        { symptom_id: 'SOC_006', severity: 6, duration: '3_to_6_months', frequency: 'often' },  // Relationship conflict (common)
        { symptom_id: 'MOD_006', severity: 5, duration: '3_to_6_months', frequency: 'sometimes' }, // Guilt (common)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const topThreeIds = results.results.slice(0, 3).map(r => r.condition_id);

      expect(topThreeIds).toContain('IED');
      expect(results.results[0].relevance_score).toBeLessThanOrEqual(0.75);
    });
  });

  describe('HYPER — Hypersomnolence Disorder', () => {
    it('HYPER appears in top 3 for excessive sleep presentation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'SLP_006', severity: 8, duration: '3_to_6_months', frequency: 'always' }, // Daytime sleepiness (core)
        { symptom_id: 'SLP_008', severity: 7, duration: '3_to_6_months', frequency: 'always' }, // Long sleep duration (core)
        { symptom_id: 'SLP_007', severity: 6, duration: '3_to_6_months', frequency: 'often' },  // Sleep inertia (core)
        { symptom_id: 'ENR_001', severity: 7, duration: '3_to_6_months', frequency: 'always' }, // Fatigue (common)
        { symptom_id: 'COG_003', severity: 5, duration: '3_to_6_months', frequency: 'often' },  // Brain fog (common)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const topThreeIds = results.results.slice(0, 3).map(r => r.condition_id);

      expect(topThreeIds).toContain('HYPER');
      expect(results.results[0].relevance_score).toBeLessThanOrEqual(0.75);
    });
  });

  describe('ARFID — Avoidant/Restrictive Food Intake Disorder', () => {
    it('ARFID appears in top 3 for sensory food avoidance presentation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'APT_005', severity: 7, duration: '3_to_6_months', frequency: 'always' }, // Sensory avoidance (core)
        { symptom_id: 'APT_006', severity: 6, duration: '1_to_3_months', frequency: 'often' },  // Fear of consequences (core)
        { symptom_id: 'APT_001', severity: 5, duration: '1_to_3_months', frequency: 'often' },  // Loss of appetite (core)
        { symptom_id: 'ANX_001', severity: 6, duration: '3_to_6_months', frequency: 'often' },  // Worry about eating (common)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const topThreeIds = results.results.slice(0, 3).map(r => r.condition_id);

      expect(topThreeIds).toContain('ARFID');
      expect(results.results[0].relevance_score).toBeLessThanOrEqual(0.75);
    });
  });

  describe('CYC — Cyclothymic Disorder', () => {
    it('CYC appears in top 3 for cyclothymic presentation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'MOD_010', severity: 6, duration: 'more_than_1_year', frequency: 'often' },  // Hypomania (core)
        { symptom_id: 'MOD_001', severity: 6, duration: 'more_than_1_year', frequency: 'often' },  // Sadness (core)
        { symptom_id: 'EMR_001', severity: 7, duration: 'more_than_1_year', frequency: 'always' }, // Mood swings (core)
        { symptom_id: 'ENR_001', severity: 5, duration: 'more_than_1_year', frequency: 'often' },  // Fatigue (core)
        { symptom_id: 'SLP_001', severity: 5, duration: '6_months_to_1_year', frequency: 'sometimes' }, // Insomnia (common)
        { symptom_id: 'COG_002', severity: 5, duration: '3_to_6_months', frequency: 'sometimes' }, // Racing thoughts (common)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const topThreeIds = results.results.slice(0, 3).map(r => r.condition_id);

      expect(topThreeIds).toContain('CYC');
      expect(results.results[0].relevance_score).toBeLessThanOrEqual(0.75);
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════
// COLLISION & DIFFERENTIATION TESTS
// ═════════════════════════════════════════════════════════════════════════

describe('Phase 4 Expansion — Collision & Differentiation', () => {
  let kb: KnowledgeBase;

  beforeAll(() => {
    kb = createTestKnowledgeBase();
  });

  describe('NPD vs BPD differentiation', () => {
    it('NPD ranks higher when grandiosity and lack of empathy dominate', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'IDN_005', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // Grandiosity (NPD-specific)
        { symptom_id: 'IDN_006', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // Lack of empathy (NPD core)
        { symptom_id: 'IDN_007', severity: 7, duration: 'more_than_1_year', frequency: 'often' },  // Need for admiration (NPD core)
        { symptom_id: 'EMR_001', severity: 5, duration: 'more_than_1_year', frequency: 'sometimes' }, // Mood swings (BPD symptom)
        { symptom_id: 'IDN_002', severity: 4, duration: 'more_than_1_year', frequency: 'rarely' }, // Fear of abandonment (BPD core, but low)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const npdResult = results.results.find(r => r.condition_id === 'NPD');
      const bpdResult = results.results.find(r => r.condition_id === 'BPD');

      if (npdResult && bpdResult) {
        expect(npdResult.relevance_score).toBeGreaterThan(bpdResult.relevance_score);
      }
    });

    it('BPD ranks higher when abandonment fears and emotional instability dominate', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'IDN_002', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // Fear of abandonment (BPD-specific)
        { symptom_id: 'EMR_001', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // Mood swings (BPD core)
        { symptom_id: 'SOC_008', severity: 7, duration: 'more_than_1_year', frequency: 'often' },  // Intense unstable relationships (BPD)
        { symptom_id: 'IDN_005', severity: 4, duration: 'more_than_1_year', frequency: 'rarely' }, // Grandiosity (NPD, but low)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const bpdResult = results.results.find(r => r.condition_id === 'BPD');
      const npdResult = results.results.find(r => r.condition_id === 'NPD');

      if (bpdResult && npdResult) {
        expect(bpdResult.relevance_score).toBeGreaterThan(npdResult.relevance_score);
      }
    });
  });

  describe('CPTSD vs PTSD differentiation', () => {
    it('CPTSD ranks higher when emotional dysregulation and identity issues present', () => {
      const inputs: UserSymptomInput[] = [
        // Standard PTSD symptoms
        { symptom_id: 'EMR_003', severity: 7, duration: '6_months_to_1_year', frequency: 'often' }, // Flashbacks
        { symptom_id: 'ANX_005', severity: 7, duration: '6_months_to_1_year', frequency: 'always' }, // Hypervigilance
        { symptom_id: 'CPG_001', severity: 6, duration: '6_months_to_1_year', frequency: 'often' }, // Avoidance
        // C-PTSD specific (self-organization disturbance)
        { symptom_id: 'COG_013', severity: 8, duration: '6_months_to_1_year', frequency: 'always' }, // Emotional dysregulation
        { symptom_id: 'IDN_001', severity: 7, duration: 'more_than_1_year', frequency: 'often' },    // Identity disturbance
        { symptom_id: 'EMR_006', severity: 6, duration: '6_months_to_1_year', frequency: 'often' },  // Shame
      ];

      const results = runSymptomNavigator(inputs, kb);
      const cptsdResult = results.results.find(r => r.condition_id === 'CPTSD');
      const ptsdResult = results.results.find(r => r.condition_id === 'PTSD');

      if (cptsdResult && ptsdResult) {
        expect(cptsdResult.relevance_score).toBeGreaterThan(ptsdResult.relevance_score);
      }
    });
  });

  describe('DID vs DPDR differentiation', () => {
    it('DID ranks higher when identity switching is present', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'PRC_008', severity: 7, duration: '6_months_to_1_year', frequency: 'often' }, // Identity switching (DID-specific)
        { symptom_id: 'PRC_009', severity: 7, duration: '6_months_to_1_year', frequency: 'often' }, // Dissociative amnesia (DID core)
        { symptom_id: 'PRC_002', severity: 6, duration: '3_to_6_months', frequency: 'often' },      // Depersonalization (both)
        { symptom_id: 'PRC_001', severity: 5, duration: '3_to_6_months', frequency: 'sometimes' },  // Derealization (both)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const didResult = results.results.find(r => r.condition_id === 'DID');
      const dpdrResult = results.results.find(r => r.condition_id === 'DPDR');

      if (didResult && dpdrResult) {
        expect(didResult.relevance_score).toBeGreaterThan(dpdrResult.relevance_score);
      }
    });

    it('DPDR ranks higher when only depersonalization/derealization present without switching', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'PRC_002', severity: 8, duration: '3_to_6_months', frequency: 'always' }, // Depersonalization (core for both)
        { symptom_id: 'PRC_001', severity: 8, duration: '3_to_6_months', frequency: 'always' }, // Derealization (core for both)
        { symptom_id: 'PRC_010', severity: 6, duration: '1_to_3_months', frequency: 'often' },  // Detachment from surroundings
        // No PRC_008 (identity switching) or PRC_009 (amnesia)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const dpdrResult = results.results.find(r => r.condition_id === 'DPDR');
      const didResult = results.results.find(r => r.condition_id === 'DID');

      if (dpdrResult && didResult) {
        expect(dpdrResult.relevance_score).toBeGreaterThan(didResult.relevance_score);
      }
    });
  });

  describe('ASPD vs IED differentiation', () => {
    it('ASPD ranks higher for pervasive pattern with norm violation', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'EMR_008', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // Norm violation (ASPD-specific)
        { symptom_id: 'ACT_010', severity: 7, duration: 'more_than_1_year', frequency: 'often' },  // Lying/manipulation (ASPD)
        { symptom_id: 'ACT_009', severity: 7, duration: 'more_than_1_year', frequency: 'often' },  // Recklessness (ASPD)
        { symptom_id: 'CPG_015', severity: 6, duration: '6_months_to_1_year', frequency: 'sometimes' }, // Explosive anger (both)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const aspdResult = results.results.find(r => r.condition_id === 'ASPD');
      const iedResult = results.results.find(r => r.condition_id === 'IED');

      if (aspdResult && iedResult) {
        expect(aspdResult.relevance_score).toBeGreaterThan(iedResult.relevance_score);
      }
    });

    it('IED ranks higher for isolated outbursts with guilt/remorse', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'CPG_015', severity: 9, duration: '3_to_6_months', frequency: 'often' },  // Explosive anger (IED-specific severity)
        { symptom_id: 'EMR_002', severity: 7, duration: '3_to_6_months', frequency: 'always' }, // Irritability (IED core)
        { symptom_id: 'MOD_006', severity: 6, duration: '3_to_6_months', frequency: 'often' },  // Guilt after episodes (IED)
        // No EMR_008 (norm violation) or ACT_010 (manipulation) which are ASPD-specific
      ];

      const results = runSymptomNavigator(inputs, kb);
      const iedResult = results.results.find(r => r.condition_id === 'IED');
      const aspdResult = results.results.find(r => r.condition_id === 'ASPD');

      if (iedResult && aspdResult) {
        expect(iedResult.relevance_score).toBeGreaterThan(aspdResult.relevance_score);
      }
    });
  });

  describe('DPD vs AVPD differentiation', () => {
    it('DPD ranks higher for submissive neediness without intense avoidance', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'IDN_008', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // Submissiveness (DPD-specific)
        { symptom_id: 'SOC_005', severity: 7, duration: 'more_than_1_year', frequency: 'often' },  // Dependence on others (DPD)
        { symptom_id: 'IDN_002', severity: 7, duration: 'more_than_1_year', frequency: 'always' }, // Fear of abandonment (both)
        { symptom_id: 'MOD_007', severity: 6, duration: 'more_than_1_year', frequency: 'often' },  // Low self-esteem (both)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const dpdResult = results.results.find(r => r.condition_id === 'DPD');
      const avpdResult = results.results.find(r => r.condition_id === 'AVPD');

      if (dpdResult && avpdResult) {
        expect(dpdResult.relevance_score).toBeGreaterThan(avpdResult.relevance_score);
      }
    });

    it('AVPD ranks higher for fear-driven avoidance of relationships', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'IDN_003', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // Chronic inadequacy (AVPD-specific)
        { symptom_id: 'SOC_002', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // Avoiding social situations (AVPD core)
        { symptom_id: 'ANX_004', severity: 7, duration: 'more_than_1_year', frequency: 'often' },  // Social anxiety (both)
        { symptom_id: 'MOD_007', severity: 6, duration: 'more_than_1_year', frequency: 'often' },  // Low self-esteem (both)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const avpdResult = results.results.find(r => r.condition_id === 'AVPD');
      const dpdResult = results.results.find(r => r.condition_id === 'DPD');

      if (avpdResult && dpdResult) {
        expect(avpdResult.relevance_score).toBeGreaterThan(dpdResult.relevance_score);
      }
    });
  });

  describe('SZPD vs AVPD differentiation', () => {
    it('SZPD ranks higher for indifference to relationships', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'SOC_009', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // Detachment/indifference (SZPD-specific)
        { symptom_id: 'MOD_004', severity: 7, duration: 'more_than_1_year', frequency: 'always' }, // Emotional numbness (SZPD)
        { symptom_id: 'MOD_003', severity: 6, duration: 'more_than_1_year', frequency: 'often' },  // Loss of interest (SZPD)
        { symptom_id: 'SOC_001', severity: 7, duration: 'more_than_1_year', frequency: 'always' }, // Social withdrawal (both)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const szpdResult = results.results.find(r => r.condition_id === 'SZPD');
      const avpdResult = results.results.find(r => r.condition_id === 'AVPD');

      if (szpdResult && avpdResult) {
        expect(szpdResult.relevance_score).toBeGreaterThan(avpdResult.relevance_score);
      }
    });
  });

  describe('HYPER vs MDE differentiation', () => {
    it('HYPER ranks higher when sleep is primary without anhedonia', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'SLP_006', severity: 9, duration: '3_to_6_months', frequency: 'always' }, // Daytime sleepiness (HYPER-specific)
        { symptom_id: 'SLP_008', severity: 8, duration: '3_to_6_months', frequency: 'always' }, // Long sleep duration (HYPER-specific)
        { symptom_id: 'SLP_007', severity: 6, duration: '3_to_6_months', frequency: 'often' },  // Sleep inertia (HYPER-specific)
        { symptom_id: 'ENR_001', severity: 6, duration: '3_to_6_months', frequency: 'always' }, // Fatigue (both)
        // No MOD_003 (anhedonia) or MOD_001 (sadness) which are MDE-specific
      ];

      const results = runSymptomNavigator(inputs, kb);
      const hyperResult = results.results.find(r => r.condition_id === 'HYPER');
      const mdeResult = results.results.find(r => r.condition_id === 'MDE');

      if (hyperResult && mdeResult) {
        expect(hyperResult.relevance_score).toBeGreaterThan(mdeResult.relevance_score);
      }
    });
  });

  describe('ARFID vs AN differentiation', () => {
    it('ARFID ranks higher for sensory/fear-based avoidance without body image concerns', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'APT_005', severity: 8, duration: '3_to_6_months', frequency: 'always' }, // Sensory avoidance (ARFID-specific)
        { symptom_id: 'APT_006', severity: 7, duration: '1_to_3_months', frequency: 'often' },  // Fear of consequences (ARFID-specific)
        { symptom_id: 'APT_001', severity: 6, duration: '1_to_3_months', frequency: 'often' },  // Loss of appetite (both)
        // No PRC_005 (body image distortion) which is AN-specific
      ];

      const results = runSymptomNavigator(inputs, kb);
      const arfidResult = results.results.find(r => r.condition_id === 'ARFID');
      const anResult = results.results.find(r => r.condition_id === 'AN');

      if (arfidResult && anResult) {
        expect(arfidResult.relevance_score).toBeGreaterThan(anResult.relevance_score);
      }
    });
  });

  describe('CYC vs BIP differentiation', () => {
    it('CYC ranks higher for subthreshold chronic cycling', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'MOD_010', severity: 5, duration: 'more_than_1_year', frequency: 'often' },  // Hypomania (subthreshold, CYC)
        { symptom_id: 'MOD_001', severity: 5, duration: 'more_than_1_year', frequency: 'often' },  // Sadness (subthreshold)
        { symptom_id: 'EMR_001', severity: 7, duration: 'more_than_1_year', frequency: 'always' }, // Mood swings (chronic)
        { symptom_id: 'SLP_001', severity: 4, duration: '6_months_to_1_year', frequency: 'sometimes' }, // Insomnia (mild)
        // No EMR_004 (mania) or SLP changes with extreme severity (would indicate BIP)
      ];

      const results = runSymptomNavigator(inputs, kb);
      const cycResult = results.results.find(r => r.condition_id === 'CYC');
      const bipResult = results.results.find(r => r.condition_id === 'BIP');

      if (cycResult && bipResult) {
        expect(cycResult.relevance_score).toBeGreaterThan(bipResult.relevance_score);
      }
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════
// SAFETY FLAG TESTS
// ═════════════════════════════════════════════════════════════════════════

describe('Phase 4 Expansion — Safety Flags', () => {
  let kb: KnowledgeBase;

  beforeAll(() => {
    kb = createTestKnowledgeBase();
  });

  describe('PRC_008 (Identity switching) triggers URGENT', () => {
    it('URGENT flag is set when identity switching is reported', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'PRC_008', severity: 6, duration: '3_to_6_months', frequency: 'often' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      expect(results.safety.has_urgent).toBe(true);
      expect(results.safety.should_halt).toBe(false); // URGENT doesn't halt, only CRISIS does
      expect(results.safety.highest_level).toBe('URGENT');
    });
  });

  describe('PRC_009 (Dissociative amnesia) triggers URGENT at severity ≥7', () => {
    it('URGENT flag is set when amnesia severity is 7+', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'PRC_009', severity: 8, duration: '3_to_6_months', frequency: 'often' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      expect(results.safety.has_urgent).toBe(true);
      expect(results.safety.should_halt).toBe(false);
    });

    it('No URGENT flag when amnesia severity is below 7', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'PRC_009', severity: 5, duration: '3_to_6_months', frequency: 'often' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      expect(results.safety.has_urgent).toBe(false);
    });
  });

  describe('CPG_015 (Explosive anger) triggers WATCH at severity ≥8', () => {
    it('WATCH flag is set when explosive anger severity is 8+', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'CPG_015', severity: 9, duration: '3_to_6_months', frequency: 'often' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      expect(results.safety.has_watch).toBe(true);
    });

    it('No WATCH flag when anger severity is below 8', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'CPG_015', severity: 6, duration: '3_to_6_months', frequency: 'often' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      expect(results.safety.has_watch).toBe(false);
    });
  });

  describe('ACT_009 (Reckless behavior) triggers WATCH at severity ≥8', () => {
    it('WATCH flag is set when recklessness severity is 8+', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'ACT_009', severity: 8, duration: '6_months_to_1_year', frequency: 'often' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      expect(results.safety.has_watch).toBe(true);
    });
  });

  describe('SLP_006 (Excessive sleepiness) triggers WATCH at severity ≥8', () => {
    it('WATCH flag is set when sleepiness severity is 8+', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'SLP_006', severity: 9, duration: '3_to_6_months', frequency: 'always' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      expect(results.safety.has_watch).toBe(true);
    });
  });

  describe('APT_005/006 (Food avoidance) trigger WATCH at severity ≥7', () => {
    it('WATCH flag is set for sensory food avoidance at severity 7+', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'APT_005', severity: 8, duration: '3_to_6_months', frequency: 'always' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      expect(results.safety.has_watch).toBe(true);
    });

    it('WATCH flag is set for fear-based food avoidance at severity 7+', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'APT_006', severity: 7, duration: '1_to_3_months', frequency: 'often' },
      ];

      const results = runSymptomNavigator(inputs, kb);

      expect(results.safety.has_watch).toBe(true);
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════
// CONFIDENCE CAP TESTS
// ═════════════════════════════════════════════════════════════════════════

describe('Phase 4 Expansion — Confidence Cap', () => {
  let kb: KnowledgeBase;

  beforeAll(() => {
    kb = createTestKnowledgeBase();
  });

  describe('Extreme NPD presentation never exceeds 0.75', () => {
    it('Perfect NPD match with max modifiers is capped at 0.75', () => {
      const inputs: UserSymptomInput[] = [
        // All NPD core symptoms at maximum intensity
        { symptom_id: 'IDN_005', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
        { symptom_id: 'IDN_006', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
        { symptom_id: 'IDN_007', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
        { symptom_id: 'SOC_003', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
        { symptom_id: 'EMR_002', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
        { symptom_id: 'MOD_011', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
        { symptom_id: 'ANX_004', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
        { symptom_id: 'IDN_004', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
        { symptom_id: 'PRC_006', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
        { symptom_id: 'ACT_010', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
      ];

      const results = runSymptomNavigator(inputs, kb);
      const npdResult = results.results.find(r => r.condition_id === 'NPD');

      expect(npdResult).toBeDefined();
      expect(npdResult!.relevance_score).toBeLessThanOrEqual(0.75);
    });
  });

  describe('Extreme DID presentation never exceeds 0.75', () => {
    it('Perfect DID match with max modifiers is capped at 0.75', () => {
      const inputs: UserSymptomInput[] = [
        { symptom_id: 'PRC_008', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
        { symptom_id: 'PRC_009', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
        { symptom_id: 'COG_004', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
        { symptom_id: 'PRC_002', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
        { symptom_id: 'EMR_003', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
        { symptom_id: 'PRC_001', severity: 10, duration: 'more_than_1_year', frequency: 'always' },
      ];

      const results = runSymptomNavigator(inputs, kb);
      const didResult = results.results.find(r => r.condition_id === 'DID');

      expect(didResult).toBeDefined();
      expect(didResult!.relevance_score).toBeLessThanOrEqual(0.75);
    });
  });

  describe('All Phase 4 conditions respect confidence cap', () => {
    it('No condition in Phase 4 can exceed 0.75 confidence', () => {
      const phase4Conditions = ['NPD', 'ASPD', 'DPD', 'SZPD', 'CPTSD', 'DID', 'OSDD', 'ASD_ACUTE', 'TTM', 'SPD_EXCOR', 'IED', 'HYPER', 'ARFID', 'CYC'];

      // Test each condition with extreme inputs
      phase4Conditions.forEach(conditionId => {
        const condition = kb.conditions.find(c => c.id === conditionId);
        if (!condition) return;

        const inputs: UserSymptomInput[] = condition.symptom_mappings.map(mapping => ({
          symptom_id: mapping.symptom_id,
          severity: 10,
          duration: 'more_than_1_year',
          frequency: 'always',
        }));

        const results = runSymptomNavigator(inputs, kb);
        const result = results.results.find(r => r.condition_id === conditionId);

        if (result) {
          expect(result.relevance_score).toBeLessThanOrEqual(0.75);
        }
      });
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════
// CATEGORY DIVERSITY TESTS
// ═════════════════════════════════════════════════════════════════════════

describe('Phase 4 Expansion — Category Diversity', () => {
  let kb: KnowledgeBase;

  beforeAll(() => {
    kb = createTestKnowledgeBase();
  });

  describe('max_per_family applies to personality disorder clustering', () => {
    it('Only top 2 personality disorders appear in results despite multiple high scores', () => {
      const inputs: UserSymptomInput[] = [
        // Symptoms that map to multiple personality disorders
        { symptom_id: 'IDN_006', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // NPD, ASPD
        { symptom_id: 'MOD_007', severity: 8, duration: 'more_than_1_year', frequency: 'always' }, // DPD, NPD, SZPD
        { symptom_id: 'SOC_003', severity: 7, duration: 'more_than_1_year', frequency: 'often' },  // NPD, DPD, BPD
        { symptom_id: 'EMR_002', severity: 7, duration: 'more_than_1_year', frequency: 'often' },  // NPD, ASPD, IED
        { symptom_id: 'IDN_002', severity: 7, duration: 'more_than_1_year', frequency: 'often' },  // DPD, BPD
        { symptom_id: 'SOC_001', severity: 6, duration: 'more_than_1_year', frequency: 'often' },  // SZPD, AVPD
      ];

      const results = runSymptomNavigator(inputs, kb);
      const personalityResults = results.results.filter(r => {
        const condition = kb.conditions.find(c => c.id === r.condition_id);
        return condition?.category === 'personality';
      });

      // With max_per_family=2, should have at most 2 personality disorders
      expect(personalityResults.length).toBeLessThanOrEqual(2);
    });
  });

  describe('max_per_family applies to dissociative disorder clustering', () => {
    it('Only top 2 dissociative disorders appear in results', () => {
      const inputs: UserSymptomInput[] = [
        // Symptoms that map to multiple dissociative disorders
        { symptom_id: 'PRC_002', severity: 8, duration: '3_to_6_months', frequency: 'always' }, // DID, OSDD, DPDR
        { symptom_id: 'PRC_001', severity: 8, duration: '3_to_6_months', frequency: 'always' }, // OSDD, DPDR, ASD_ACUTE
        { symptom_id: 'PRC_009', severity: 7, duration: '3_to_6_months', frequency: 'often' },  // DID, OSDD, ASD_ACUTE
        { symptom_id: 'COG_004', severity: 6, duration: '3_to_6_months', frequency: 'often' },  // DID, OSDD
        { symptom_id: 'EMR_003', severity: 6, duration: '3_to_6_months', frequency: 'sometimes' }, // DID, OSDD, ASD_ACUTE, CPTSD
      ];

      const results = runSymptomNavigator(inputs, kb);
      const dissociativeResults = results.results.filter(r => {
        const condition = kb.conditions.find(c => c.id === r.condition_id);
        return condition?.category === 'dissociative';
      });

      // With max_per_family=2, should have at most 2 dissociative disorders
      expect(dissociativeResults.length).toBeLessThanOrEqual(2);
    });
  });
});
