/**
 * UNIT TESTS: crisis-detection.ts
 *
 * Tests for crisis detection at exact thresholds
 */

import { assertEquals } from 'https://deno.land/std@0.168.0/testing/asserts.ts';
import { detectCrisis, getCrisisMessage } from '../crisis-detection.ts';
import type { InstrumentScores } from '../scoring.ts';

const safeScores: InstrumentScores = {
  phq2_raw: 0,
  gad2_raw: 0,
  phq4_total: 0,
  who5_raw: 25,
  who5_percentage: 100,
  ucla3_raw: 3,
  pss4_raw: 0,
  functioning_raw: 0,
};

Deno.test('No crisis - all safe scores', () => {
  const result = detectCrisis(safeScores);
  assertEquals(result.detected, false);
  assertEquals(result.triggers.length, 0);
  assertEquals(result.severity, 'none');
});

Deno.test('Trigger 1: PHQ-2 = 4 (no crisis)', () => {
  const scores = { ...safeScores, phq2_raw: 4, phq4_total: 4 };
  const result = detectCrisis(scores);
  assertEquals(result.detected, false);
});

Deno.test('Trigger 1: PHQ-2 = 5 (crisis)', () => {
  const scores = { ...safeScores, phq2_raw: 5, phq4_total: 5 };
  const result = detectCrisis(scores);
  assertEquals(result.detected, true);
  assertEquals(result.triggers.includes('severe_depression_symptoms'), true);
  assertEquals(result.severity, 'severe');
});

Deno.test('Trigger 1: PHQ-2 = 6 (maximum, crisis)', () => {
  const scores = { ...safeScores, phq2_raw: 6, phq4_total: 6 };
  const result = detectCrisis(scores);
  assertEquals(result.detected, true);
  assertEquals(result.triggers.includes('severe_depression_symptoms'), true);
  assertEquals(result.severity, 'severe');
});

Deno.test('Trigger 2: WHO-5% = 17 (no crisis)', () => {
  const scores = { ...safeScores, who5_percentage: 17 };
  const result = detectCrisis(scores);
  assertEquals(result.detected, false);
});

Deno.test('Trigger 2: WHO-5% = 16 (crisis)', () => {
  const scores = { ...safeScores, who5_percentage: 16 };
  const result = detectCrisis(scores);
  assertEquals(result.detected, true);
  assertEquals(result.triggers.includes('critical_low_wellbeing'), true);
  assertEquals(result.severity, 'severe');
});

Deno.test('Trigger 2: WHO-5% = 0 (worst case, crisis)', () => {
  const scores = { ...safeScores, who5_percentage: 0 };
  const result = detectCrisis(scores);
  assertEquals(result.detected, true);
  assertEquals(result.triggers.includes('critical_low_wellbeing'), true);
  assertEquals(result.severity, 'severe');
});

Deno.test('Trigger 3: PHQ-4 total = 9 (no crisis)', () => {
  const scores = { ...safeScores, phq2_raw: 4, gad2_raw: 5, phq4_total: 9 };
  const result = detectCrisis(scores);
  assertEquals(result.detected, false);
});

Deno.test('Trigger 3: PHQ-4 total = 10 (crisis)', () => {
  const scores = { ...safeScores, phq2_raw: 4, gad2_raw: 6, phq4_total: 10 };
  const result = detectCrisis(scores);
  assertEquals(result.detected, true);
  assertEquals(result.triggers.includes('severe_emotional_distress'), true);
  assertEquals(result.severity, 'severe');
});

Deno.test('Trigger 3: PHQ-4 total = 12 (maximum, crisis)', () => {
  const scores = { ...safeScores, phq2_raw: 6, gad2_raw: 6, phq4_total: 12 };
  const result = detectCrisis(scores);
  assertEquals(result.detected, true);
  assertEquals(result.triggers.includes('severe_emotional_distress'), true);
  assertEquals(result.severity, 'severe');
});

Deno.test('Multiple triggers fire simultaneously', () => {
  const scores: InstrumentScores = {
    phq2_raw: 6, // Trigger 1
    gad2_raw: 6,
    phq4_total: 12, // Trigger 3
    who5_raw: 0,
    who5_percentage: 0, // Trigger 2
    ucla3_raw: 9,
    pss4_raw: 16,
    functioning_raw: 16,
  };

  const result = detectCrisis(scores);
  assertEquals(result.detected, true);
  assertEquals(result.triggers.length, 3);
  assertEquals(result.triggers.includes('severe_depression_symptoms'), true);
  assertEquals(result.triggers.includes('critical_low_wellbeing'), true);
  assertEquals(result.triggers.includes('severe_emotional_distress'), true);
  assertEquals(result.severity, 'severe');
});

Deno.test('PHQ-4 = 8 sets high severity but not crisis', () => {
  const scores = { ...safeScores, phq2_raw: 4, gad2_raw: 4, phq4_total: 8 };
  const result = detectCrisis(scores);
  assertEquals(result.detected, false);
  assertEquals(result.severity, 'high'); // Elevated but not crisis
});

Deno.test('Crisis message for severe', () => {
  const result = detectCrisis({
    ...safeScores,
    phq2_raw: 5,
    phq4_total: 5,
  });
  const message = getCrisisMessage(result);
  assertEquals(message.includes('significant distress'), true);
  assertEquals(message.includes('immediately'), true);
});

Deno.test('No message when no crisis', () => {
  const result = detectCrisis(safeScores);
  const message = getCrisisMessage(result);
  assertEquals(message, '');
});

console.log('All crisis detection tests passed!');
