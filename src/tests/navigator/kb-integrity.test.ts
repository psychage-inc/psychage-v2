/**
 * Symptom Navigator — Shipped KB Integrity Tests
 *
 * These tests validate the PRODUCTION knowledge base that is actually bundled
 * and shipped to users (`src/data/mock_knowledge_base.ts`) — NOT the test fixture
 * in test-helpers.ts. The fixture uses a divergent symptom-ID vocabulary and is
 * the engine's unit-test substrate; this suite guards the real corpus after the
 * Phase 4 sync (audit B2-1).
 *
 * Exact-count assertions (not floors) are intentional: any drift in the shipped
 * symptom/condition/mapping counts should fail loudly so it can't go unnoticed.
 */

import { describe, it, expect } from 'vitest';
import { mockKnowledgeBase as kb } from '@/data/mock_knowledge_base';
import { runSymptomNavigator } from '@/lib/navigator/engine';
import { normalizeSymptoms } from '@/lib/navigator/utils';
import { screenRedFlags } from '@/lib/navigator/safety';
import type { UserSymptomInput } from '@/lib/navigator/types';

// Post-Phase-4 shipped counts. Prior to the sync: 103 / 40 / 595.
// IDN_005 (Grandiosity) from the seed is intentionally omitted — production
// already ships that symptom as IDN_004 — so 23 (not 24) symptoms were added.
const EXPECTED_SYMPTOMS = 126;
const EXPECTED_CONDITIONS = 49;
const EXPECTED_MAPPINGS = 712;

const NEW_CONDITIONS = ['NPD', 'ASPD', 'DPD', 'SZPD', 'OSDD', 'TTM', 'SPD_EXCOR', 'HYPER', 'ARFID'];

describe('Shipped KB — exact counts', () => {
  it('ships exactly 126 symptoms', () => {
    expect(kb.symptoms.length).toBe(EXPECTED_SYMPTOMS);
  });

  it('ships exactly 49 conditions', () => {
    expect(kb.conditions.length).toBe(EXPECTED_CONDITIONS);
  });

  it('ships exactly 712 condition→symptom mappings', () => {
    const total = kb.conditions.reduce((sum, c) => sum + c.symptom_mappings.length, 0);
    expect(total).toBe(EXPECTED_MAPPINGS);
  });

  it('does NOT ship a duplicate IDN_005 (grandiosity collision resolved to IDN_004)', () => {
    expect(kb.symptoms.find((s) => s.id === 'IDN_005')).toBeUndefined();
    expect(kb.symptoms.find((s) => s.id === 'IDN_004')?.name).toMatch(/grandiosity/i);
  });
});

describe('Shipped KB — referential integrity', () => {
  const symIds = new Set(kb.symptoms.map((s) => s.id));

  it('has no duplicate symptom IDs', () => {
    expect(symIds.size).toBe(kb.symptoms.length);
  });

  it('has no duplicate condition IDs', () => {
    const condIds = new Set(kb.conditions.map((c) => c.id));
    expect(condIds.size).toBe(kb.conditions.length);
  });

  it('every condition mapping references an existing symptom', () => {
    const dangling: string[] = [];
    for (const c of kb.conditions) {
      for (const m of c.symptom_mappings) {
        if (!symIds.has(m.symptom_id)) dangling.push(`${c.id} -> ${m.symptom_id}`);
      }
      for (const r of c.red_flags) {
        if (!symIds.has(r.symptom_id)) dangling.push(`${c.id} red_flag -> ${r.symptom_id}`);
      }
    }
    expect(dangling).toEqual([]);
  });

  it('has no duplicate symptom reference within a single condition', () => {
    const dups: string[] = [];
    for (const c of kb.conditions) {
      const seen = new Set<string>();
      for (const m of c.symptom_mappings) {
        if (seen.has(m.symptom_id)) dups.push(`${c.id}:${m.symptom_id}`);
        seen.add(m.symptom_id);
      }
    }
    expect(dups).toEqual([]);
  });
});

describe('Shipped KB — Phase 4 safety triggers are live', () => {
  it('PRC_008 (identity switching) is an inherent URGENT red flag', () => {
    const s = kb.symptoms.find((x) => x.id === 'PRC_008');
    expect(s).toBeDefined();
    expect(s?.is_red_flag).toBe(true);
    expect(s?.red_flag_level).toBe('URGENT');
  });

  it('PRC_009 (dissociative amnesia) is a severity≥7 URGENT flag', () => {
    const s = kb.symptoms.find((x) => x.id === 'PRC_009');
    expect(s?.severity_red_flag_threshold).toBe(7);
    expect(s?.severity_red_flag_level).toBe('URGENT');
  });

  it('the five severity-triggered WATCH flags ship with correct thresholds', () => {
    const expected: Record<string, number> = {
      CPG_015: 8,
      ACT_009: 8,
      SLP_006: 8,
      APT_005: 7,
      APT_006: 7,
    };
    for (const [id, threshold] of Object.entries(expected)) {
      const s = kb.symptoms.find((x) => x.id === id);
      expect(s, `${id} should exist`).toBeDefined();
      expect(s?.severity_red_flag_threshold, `${id} threshold`).toBe(threshold);
      expect(s?.severity_red_flag_level, `${id} level`).toBe('WATCH');
    }
  });
});

describe('Shipped KB — Phase 4 conditions present and wired', () => {
  it('all 9 new conditions ship', () => {
    for (const id of NEW_CONDITIONS) {
      expect(kb.conditions.find((c) => c.id === id), `${id} should ship`).toBeDefined();
    }
  });

  it('DID maps PRC_008 (URGENT) as a core symptom and as a red flag', () => {
    const did = kb.conditions.find((c) => c.id === 'DID');
    expect(did?.symptom_mappings.some((m) => m.symptom_id === 'PRC_008' && m.role === 'core')).toBe(true);
    expect(did?.red_flags.some((r) => r.symptom_id === 'PRC_008')).toBe(true);
  });

  it('IED maps CPG_015 (explosive anger WATCH) as a core symptom', () => {
    const ied = kb.conditions.find((c) => c.id === 'IED');
    expect(ied?.symptom_mappings.some((m) => m.symptom_id === 'CPG_015' && m.role === 'core')).toBe(true);
  });

  it('OSDD references PRC_008 as a red flag', () => {
    const osdd = kb.conditions.find((c) => c.id === 'OSDD');
    expect(osdd?.red_flags.some((r) => r.symptom_id === 'PRC_008')).toBe(true);
  });
});

describe('Shipped KB — safety triggers fire end-to-end through the engine', () => {
  it('selecting PRC_008 routes URGENT (and never halts the flow)', () => {
    const inputs: UserSymptomInput[] = [{ symptom_id: 'PRC_008', severity: 5 }];
    const normalized = normalizeSymptoms(inputs, kb.symptoms);
    const result = screenRedFlags(normalized, kb.symptoms, kb.crisisResources);

    expect(result.has_urgent).toBe(true);
    expect(result.highest_level).toBe('URGENT');
    expect(result.should_halt).toBe(false); // URGENT shows resources alongside results, never halts
  });

  it('selecting PRC_008 surfaces DID/OSDD as relevant patterns', () => {
    const inputs: UserSymptomInput[] = [
      { symptom_id: 'PRC_008', severity: 7, duration: '1_to_3_months', frequency: 'often' },
      { symptom_id: 'PRC_009', severity: 7, duration: '1_to_3_months', frequency: 'often' },
      { symptom_id: 'PRC_002', severity: 6, duration: '1_to_3_months', frequency: 'often' },
      { symptom_id: 'COG_004', severity: 6, duration: '1_to_3_months', frequency: 'often' },
    ];
    const results = runSymptomNavigator(inputs, kb);
    expect(results.safety.has_urgent).toBe(true);
    expect(results.results.some((r) => r.condition_id === 'DID' || r.condition_id === 'OSDD')).toBe(true);
  });

  it('CPG_015 at severity ≥8 fires a WATCH flag', () => {
    const inputs: UserSymptomInput[] = [{ symptom_id: 'CPG_015', severity: 9 }];
    const normalized = normalizeSymptoms(inputs, kb.symptoms);
    const result = screenRedFlags(normalized, kb.symptoms, kb.crisisResources);
    expect(result.has_watch).toBe(true);
  });

  it('CPG_015 below its threshold does NOT fire a WATCH flag', () => {
    const inputs: UserSymptomInput[] = [{ symptom_id: 'CPG_015', severity: 5 }];
    const normalized = normalizeSymptoms(inputs, kb.symptoms);
    const result = screenRedFlags(normalized, kb.symptoms, kb.crisisResources);
    expect(result.has_watch).toBe(false);
  });
});

describe('Shipped KB — sacred cap holds across the real corpus', () => {
  it('no condition can exceed 0.75 even with all its symptoms maxed out', () => {
    for (const condition of kb.conditions) {
      const inputs: UserSymptomInput[] = condition.symptom_mappings.map((m) => ({
        symptom_id: m.symptom_id,
        severity: 10,
        duration: 'more_than_1_year' as const,
        frequency: 'always' as const,
      }));
      const results = runSymptomNavigator(inputs, kb);
      for (const r of results.results) {
        expect(r.relevance_score).toBeLessThanOrEqual(0.75);
      }
    }
  });
});
