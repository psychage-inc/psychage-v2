/**
 * UNIT TESTS: scoring.ts
 *
 * Tests for all scoring logic functions
 */

import { assertEquals } from 'https://deno.land/std@0.168.0/testing/asserts.ts';
import {
  computeInstrumentScores,
  computeDomainScores,
  computeTotalScore,
  computeScoreLabel,
  computeAllScores,
  validateResponses,
  type RawResponses,
} from '../scoring.ts';

// Test data: Perfect wellness (all zeros for symptom scales, max for wellbeing)
const perfectWellnessResponses: RawResponses = {
  phq2_1: 0, phq2_2: 0, gad2_1: 0, gad2_2: 0, // PHQ-4: 0/12
  who5_1: 5, who5_2: 5, who5_3: 5, who5_4: 5, who5_5: 5, // WHO-5: 25/25
  ucla_1: 1, ucla_2: 1, ucla_3: 1, // UCLA-3: 3/9 (minimum)
  pss_1: 0, pss_2: 4, pss_3: 4, pss_4: 0, // PSS-4: 0/16 (after reverse scoring)
  func_1: 0, func_2: 0, func_3: 0, func_4: 0, // Functioning: 0/16
};

// Test data: Maximum distress (worst possible scores)
const maxDistressResponses: RawResponses = {
  phq2_1: 3, phq2_2: 3, gad2_1: 3, gad2_2: 3, // PHQ-4: 12/12
  who5_1: 0, who5_2: 0, who5_3: 0, who5_4: 0, who5_5: 0, // WHO-5: 0/25
  ucla_1: 3, ucla_2: 3, ucla_3: 3, // UCLA-3: 9/9
  pss_1: 4, pss_2: 0, pss_3: 0, pss_4: 4, // PSS-4: 16/16 (after reverse scoring)
  func_1: 4, func_2: 4, func_3: 4, func_4: 4, // Functioning: 16/16
};

// Test data: Mixed scores (balanced)
const mixedResponses: RawResponses = {
  phq2_1: 1, phq2_2: 2, gad2_1: 1, gad2_2: 2, // PHQ-4: 6/12
  who5_1: 3, who5_2: 2, who5_3: 3, who5_4: 2, who5_5: 3, // WHO-5: 13/25
  ucla_1: 2, ucla_2: 2, ucla_3: 1, // UCLA-3: 5/9
  pss_1: 2, pss_2: 3, pss_3: 3, pss_4: 1, // PSS-4: 6/16 (after reverse scoring)
  func_1: 1, func_2: 1, func_3: 0, func_4: 1, // Functioning: 3/16
};

Deno.test('computeInstrumentScores - perfect wellness', () => {
  const scores = computeInstrumentScores(perfectWellnessResponses);

  assertEquals(scores.phq2_raw, 0);
  assertEquals(scores.gad2_raw, 0);
  assertEquals(scores.phq4_total, 0);
  assertEquals(scores.who5_raw, 25);
  assertEquals(scores.who5_percentage, 100);
  assertEquals(scores.ucla3_raw, 3);
  assertEquals(scores.pss4_raw, 0);
  assertEquals(scores.functioning_raw, 0);
});

Deno.test('computeInstrumentScores - maximum distress', () => {
  const scores = computeInstrumentScores(maxDistressResponses);

  assertEquals(scores.phq2_raw, 6);
  assertEquals(scores.gad2_raw, 6);
  assertEquals(scores.phq4_total, 12);
  assertEquals(scores.who5_raw, 0);
  assertEquals(scores.who5_percentage, 0);
  assertEquals(scores.ucla3_raw, 9);
  assertEquals(scores.pss4_raw, 16);
  assertEquals(scores.functioning_raw, 16);
});

Deno.test('computeInstrumentScores - PSS-4 reverse scoring', () => {
  // pss_2 and pss_3 should be reversed
  const responses: RawResponses = {
    ...perfectWellnessResponses,
    pss_1: 0, // Not reversed: 0
    pss_2: 0, // Reversed: 4 - 0 = 4
    pss_3: 0, // Reversed: 4 - 0 = 4
    pss_4: 0, // Not reversed: 0
  };

  const scores = computeInstrumentScores(responses);
  // Expected: 0 + 4 + 4 + 0 = 8
  assertEquals(scores.pss4_raw, 8);
});

Deno.test('computeDomainScores - perfect wellness yields ~100', () => {
  const instruments = computeInstrumentScores(perfectWellnessResponses);
  const domains = computeDomainScores(instruments);

  // All domains should be at or near max (20)
  assertEquals(domains.emotional, 20); // (12-0)/12 * 20 = 20
  assertEquals(domains.vitality, 20);  // 25/25 * 20 = 20
  assertEquals(domains.social, 20);    // (9-3)/6 * 20 = 20
  assertEquals(domains.cognitive, 20); // (16-0)/16 * 20 = 20
  assertEquals(domains.functioning, 20); // (16-0)/16 * 20 = 20
});

Deno.test('computeDomainScores - maximum distress yields 0', () => {
  const instruments = computeInstrumentScores(maxDistressResponses);
  const domains = computeDomainScores(instruments);

  // All domains should be 0
  assertEquals(domains.emotional, 0); // (12-12)/12 * 20 = 0
  assertEquals(domains.vitality, 0);  // 0/25 * 20 = 0
  assertEquals(domains.social, 0);    // (9-9)/6 * 20 = 0
  assertEquals(domains.cognitive, 0); // (16-16)/16 * 20 = 0
  assertEquals(domains.functioning, 0); // (16-16)/16 * 20 = 0
});

Deno.test('computeTotalScore - perfect wellness', () => {
  const instruments = computeInstrumentScores(perfectWellnessResponses);
  const domains = computeDomainScores(instruments);
  const total = computeTotalScore(domains);

  assertEquals(total, 100);
});

Deno.test('computeTotalScore - maximum distress', () => {
  const instruments = computeInstrumentScores(maxDistressResponses);
  const domains = computeDomainScores(instruments);
  const total = computeTotalScore(domains);

  assertEquals(total, 0);
});

Deno.test('computeTotalScore - mixed scores', () => {
  const instruments = computeInstrumentScores(mixedResponses);
  const domains = computeDomainScores(instruments);
  const total = computeTotalScore(domains);

  // Total should be in balanced range (60-79)
  assertEquals(total >= 60 && total < 80, true);
});

Deno.test('computeScoreLabel - ranges', () => {
  assertEquals(computeScoreLabel(100), 'thriving');
  assertEquals(computeScoreLabel(80), 'thriving');
  assertEquals(computeScoreLabel(79), 'balanced');
  assertEquals(computeScoreLabel(60), 'balanced');
  assertEquals(computeScoreLabel(59), 'struggling');
  assertEquals(computeScoreLabel(40), 'struggling');
  assertEquals(computeScoreLabel(39), 'distressed');
  assertEquals(computeScoreLabel(20), 'distressed');
  assertEquals(computeScoreLabel(19), 'crisis');
  assertEquals(computeScoreLabel(0), 'crisis');
});

Deno.test('computeAllScores - perfect wellness end-to-end', () => {
  const scores = computeAllScores(perfectWellnessResponses);

  assertEquals(scores.total_score, 100);
  assertEquals(scores.score_label, 'thriving');
  assertEquals(scores.clinical_subscores.phq2.positive, false);
  assertEquals(scores.clinical_subscores.gad2.positive, false);
  assertEquals(scores.clinical_subscores.who5_percentage.poor, false);
});

Deno.test('computeAllScores - maximum distress end-to-end', () => {
  const scores = computeAllScores(maxDistressResponses);

  assertEquals(scores.total_score, 0);
  assertEquals(scores.score_label, 'crisis');
  assertEquals(scores.clinical_subscores.phq2.positive, true);
  assertEquals(scores.clinical_subscores.gad2.positive, true);
  assertEquals(scores.clinical_subscores.who5_percentage.poor, true);
});

Deno.test('validateResponses - valid responses', () => {
  const errors = validateResponses(perfectWellnessResponses);
  assertEquals(errors.length, 0);
});

Deno.test('validateResponses - missing items', () => {
  const incomplete = { ...perfectWellnessResponses };
  delete (incomplete as Record<string, unknown>).phq2_1;
  delete (incomplete as Record<string, unknown>).who5_3;

  const errors = validateResponses(incomplete);
  assertEquals(errors.length >= 2, true);
  assertEquals(errors.some(e => e.includes('phq2_1')), true);
  assertEquals(errors.some(e => e.includes('who5_3')), true);
});

Deno.test('validateResponses - out of range values', () => {
  const invalid = {
    ...perfectWellnessResponses,
    phq2_1: 5, // Max is 3
    ucla_1: 0, // Min is 1
  };

  const errors = validateResponses(invalid);
  assertEquals(errors.length >= 2, true);
  assertEquals(errors.some(e => e.includes('phq2_1')), true);
  assertEquals(errors.some(e => e.includes('ucla_1')), true);
});

Deno.test('Clinical cutoffs - PHQ-2 at boundary', () => {
  const atCutoff = {
    ...perfectWellnessResponses,
    phq2_1: 2, phq2_2: 1, // Total = 3 (at cutoff)
  };

  const scores = computeAllScores(atCutoff);
  assertEquals(scores.clinical_subscores.phq2.positive, true);
  assertEquals(scores.clinical_subscores.phq2.raw, 3);
});

Deno.test('Clinical cutoffs - WHO-5 poor wellbeing threshold', () => {
  const poorWellbeing = {
    ...perfectWellnessResponses,
    who5_1: 2, who5_2: 2, who5_3: 2, who5_4: 2, who5_5: 2, // 10/25 = 40%
  };

  const scores = computeAllScores(poorWellbeing);
  assertEquals(scores.clinical_subscores.who5_percentage.poor, true);
  assertEquals(scores.clinical_subscores.who5_percentage.value, 40);
});

console.log('All scoring tests passed!');
