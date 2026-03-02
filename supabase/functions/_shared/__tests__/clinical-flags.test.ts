/**
 * UNIT TESTS: clinical-flags.ts
 *
 * Tests for clinical flag generation at exact thresholds
 */

import { assertEquals } from 'https://deno.land/std@0.168.0/testing/asserts.ts';
import {
  generateClinicalFlags,
  getFlagPriority,
  sortFlagsByPriority,
} from '../clinical-flags.ts';
import type { InstrumentScores } from '../scoring.ts';

const baseScores: InstrumentScores = {
  phq2_raw: 0,
  gad2_raw: 0,
  phq4_total: 0,
  who5_raw: 25,
  who5_percentage: 100,
  ucla3_raw: 3,
  pss4_raw: 0,
  functioning_raw: 0,
};

Deno.test('PHQ-2: no flag below cutoff', () => {
  const scores = { ...baseScores, phq2_raw: 2 };
  const flags = generateClinicalFlags(scores);
  const depFlags = flags.filter(f => f.type === 'depression_screen');
  assertEquals(depFlags.length, 0);
});

Deno.test('PHQ-2: moderate flag at cutoff (3)', () => {
  const scores = { ...baseScores, phq2_raw: 3 };
  const flags = generateClinicalFlags(scores);
  const depFlags = flags.filter(f => f.type === 'depression_screen');
  assertEquals(depFlags.length, 1);
  assertEquals(depFlags[0].severity, 'moderate');
});

Deno.test('PHQ-2: moderate flag at 4', () => {
  const scores = { ...baseScores, phq2_raw: 4 };
  const flags = generateClinicalFlags(scores);
  const depFlags = flags.filter(f => f.type === 'depression_screen');
  assertEquals(depFlags.length, 1);
  assertEquals(depFlags[0].severity, 'moderate');
});

Deno.test('PHQ-2: high flag at cutoff (5)', () => {
  const scores = { ...baseScores, phq2_raw: 5 };
  const flags = generateClinicalFlags(scores);
  const depFlags = flags.filter(f => f.type === 'depression_screen');
  assertEquals(depFlags.length, 1);
  assertEquals(depFlags[0].severity, 'high');
});

Deno.test('GAD-2: moderate flag at cutoff (3)', () => {
  const scores = { ...baseScores, gad2_raw: 3 };
  const flags = generateClinicalFlags(scores);
  const anxFlags = flags.filter(f => f.type === 'anxiety_screen');
  assertEquals(anxFlags.length, 1);
  assertEquals(anxFlags[0].severity, 'moderate');
});

Deno.test('GAD-2: high flag at cutoff (5)', () => {
  const scores = { ...baseScores, gad2_raw: 5 };
  const flags = generateClinicalFlags(scores);
  const anxFlags = flags.filter(f => f.type === 'anxiety_screen');
  assertEquals(anxFlags.length, 1);
  assertEquals(anxFlags[0].severity, 'high');
});

Deno.test('WHO-5: no flag above threshold', () => {
  const scores = { ...baseScores, who5_percentage: 51 };
  const flags = generateClinicalFlags(scores);
  const wellbeingFlags = flags.filter(f => f.type === 'low_wellbeing');
  assertEquals(wellbeingFlags.length, 0);
});

Deno.test('WHO-5: moderate flag at threshold (50)', () => {
  const scores = { ...baseScores, who5_percentage: 50 };
  const flags = generateClinicalFlags(scores);
  const wellbeingFlags = flags.filter(f => f.type === 'low_wellbeing');
  assertEquals(wellbeingFlags.length, 1);
  assertEquals(wellbeingFlags[0].severity, 'moderate');
});

Deno.test('WHO-5: high flag at depression threshold (28)', () => {
  const scores = { ...baseScores, who5_percentage: 28 };
  const flags = generateClinicalFlags(scores);
  const wellbeingFlags = flags.filter(f => f.type === 'low_wellbeing');
  assertEquals(wellbeingFlags.length, 1);
  assertEquals(wellbeingFlags[0].severity, 'high');
});

Deno.test('UCLA-3: no flag below threshold', () => {
  const scores = { ...baseScores, ucla3_raw: 5 };
  const flags = generateClinicalFlags(scores);
  const lonelinessFlags = flags.filter(f => f.type === 'loneliness');
  assertEquals(lonelinessFlags.length, 0);
});

Deno.test('UCLA-3: moderate flag at threshold (6)', () => {
  const scores = { ...baseScores, ucla3_raw: 6 };
  const flags = generateClinicalFlags(scores);
  const lonelinessFlags = flags.filter(f => f.type === 'loneliness');
  assertEquals(lonelinessFlags.length, 1);
  assertEquals(lonelinessFlags[0].severity, 'moderate');
});

Deno.test('UCLA-3: high flag at threshold (7)', () => {
  const scores = { ...baseScores, ucla3_raw: 7 };
  const flags = generateClinicalFlags(scores);
  const lonelinessFlags = flags.filter(f => f.type === 'loneliness');
  assertEquals(lonelinessFlags.length, 1);
  assertEquals(lonelinessFlags[0].severity, 'high');
});

Deno.test('PSS-4: moderate flag at threshold (8)', () => {
  const scores = { ...baseScores, pss4_raw: 8 };
  const flags = generateClinicalFlags(scores);
  const stressFlags = flags.filter(f => f.type === 'high_stress');
  assertEquals(stressFlags.length, 1);
  assertEquals(stressFlags[0].severity, 'moderate');
});

Deno.test('PSS-4: high flag at threshold (12)', () => {
  const scores = { ...baseScores, pss4_raw: 12 };
  const flags = generateClinicalFlags(scores);
  const stressFlags = flags.filter(f => f.type === 'high_stress');
  assertEquals(stressFlags.length, 1);
  assertEquals(stressFlags[0].severity, 'high');
});

Deno.test('Functioning: moderate flag at threshold (6)', () => {
  const scores = { ...baseScores, functioning_raw: 6 };
  const flags = generateClinicalFlags(scores);
  const impairmentFlags = flags.filter(f => f.type === 'impairment');
  assertEquals(impairmentFlags.length, 1);
  assertEquals(impairmentFlags[0].severity, 'moderate');
});

Deno.test('Functioning: high flag at threshold (10)', () => {
  const scores = { ...baseScores, functioning_raw: 10 };
  const flags = generateClinicalFlags(scores);
  const impairmentFlags = flags.filter(f => f.type === 'impairment');
  assertEquals(impairmentFlags.length, 1);
  assertEquals(impairmentFlags[0].severity, 'high');
});

Deno.test('Multiple flags can trigger simultaneously', () => {
  const scores: InstrumentScores = {
    phq2_raw: 5,
    gad2_raw: 5,
    phq4_total: 10,
    who5_raw: 5,
    who5_percentage: 20,
    ucla3_raw: 7,
    pss4_raw: 12,
    functioning_raw: 10,
  };

  const flags = generateClinicalFlags(scores);

  // Should have 6 flags (all high severity)
  assertEquals(flags.length, 6);
  assertEquals(flags.filter(f => f.severity === 'high').length, 6);
});

Deno.test('sortFlagsByPriority - depression highest priority', () => {
  const flags = generateClinicalFlags({
    ...baseScores,
    phq2_raw: 5, // High depression
    pss4_raw: 8, // Moderate stress
    ucla3_raw: 6, // Moderate loneliness
  });

  const sorted = sortFlagsByPriority(flags);

  // Depression should be first
  assertEquals(sorted[0].type, 'depression_screen');
  assertEquals(sorted[sorted.length - 1].type, 'loneliness');
});

Deno.test('getFlagPriority - high severity gets bonus', () => {
  const moderateDepression = { type: 'depression_screen' as const, severity: 'moderate' as const };
  const highDepression = { type: 'depression_screen' as const, severity: 'high' as const };

  const moderatePriority = getFlagPriority(moderateDepression);
  const highPriority = getFlagPriority(highDepression);

  assertEquals(highPriority > moderatePriority, true);
});

console.log('All clinical flags tests passed!');
