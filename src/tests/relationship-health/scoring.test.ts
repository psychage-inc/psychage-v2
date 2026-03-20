import { describe, it, expect } from 'vitest';
import {
  computeDomainScore,
  computeAllDomainScores,
  computeCompositeScore,
  getTier,
  computeSubDimensionScore,
  computeAllSubDimensionScores,
  computeFourHorsemen,
  computeResult,
} from '@/components/tools/RelationshipHealthCheck/scoring';
import { QUESTIONS } from '@/components/tools/RelationshipHealthCheck/questions';

// ── Helper: create answer map with a uniform value ────────────────────────────

function uniformAnswers(value: number): Record<string, number> {
  const answers: Record<string, number> = {};
  for (const q of QUESTIONS) {
    answers[q.id] = value;
  }
  return answers;
}

function partialAnswers(overrides: Record<string, number>): Record<string, number> {
  const base = uniformAnswers(3); // neutral baseline
  return { ...base, ...overrides };
}

// ── Domain scoring ────────────────────────────────────────────────────────────

describe('computeDomainScore', () => {
  it('returns 0 when all answers are optimal worst (forward=1, reverse=5)', () => {
    // For forward-scored: 1 is worst. For reverse-scored: 5 is worst (6-5=1 effective)
    const answers: Record<string, number> = {};
    for (const q of QUESTIONS) {
      answers[q.id] = q.reverseScored ? 5 : 1;
    }
    expect(computeDomainScore(answers, 'partner')).toBe(0);
    expect(computeDomainScore(answers, 'family')).toBe(0);
    expect(computeDomainScore(answers, 'friends')).toBe(0);
    expect(computeDomainScore(answers, 'community')).toBe(0);
  });

  it('returns 100 when all answers are 5 (highest)', () => {
    // For forward-scored items, 5 is best.
    // For reverse-scored items, 5 maps to 6-5=1 (worst), so all-5 won't be 100
    // unless every item is forward-scored.
    // Instead, test with ideal answers: forward=5, reverse=1
    const answers: Record<string, number> = {};
    for (const q of QUESTIONS) {
      answers[q.id] = q.reverseScored ? 1 : 5;
    }
    expect(computeDomainScore(answers, 'partner')).toBe(100);
    expect(computeDomainScore(answers, 'family')).toBe(100);
  });

  it('returns 50 for neutral (3) answers', () => {
    const answers = uniformAnswers(3);
    const score = computeDomainScore(answers, 'partner');
    expect(score).toBe(50);
  });

  it('handles missing answers by defaulting to 3', () => {
    const score = computeDomainScore({}, 'community');
    expect(score).toBe(50);
  });
});

describe('computeAllDomainScores', () => {
  it('returns scores for all four domains', () => {
    const answers = uniformAnswers(3);
    const scores = computeAllDomainScores(answers);
    expect(scores).toHaveProperty('partner');
    expect(scores).toHaveProperty('family');
    expect(scores).toHaveProperty('friends');
    expect(scores).toHaveProperty('community');
  });
});

describe('computeCompositeScore', () => {
  it('averages all 4 domains when partner is included', () => {
    const domainScores = { partner: 80, family: 60, friends: 40, community: 20 };
    expect(computeCompositeScore(domainScores, false)).toBe(50);
  });

  it('averages only 3 domains when partner is skipped', () => {
    const domainScores = { partner: 0, family: 60, friends: 40, community: 20 };
    expect(computeCompositeScore(domainScores, true)).toBe(40);
  });
});

describe('getTier', () => {
  it('returns correct tier for each threshold', () => {
    expect(getTier(80)).toBe('thriving');
    expect(getTier(95)).toBe('thriving');
    expect(getTier(60)).toBe('healthy');
    expect(getTier(79)).toBe('healthy');
    expect(getTier(40)).toBe('mixed');
    expect(getTier(59)).toBe('mixed');
    expect(getTier(20)).toBe('strained');
    expect(getTier(39)).toBe('strained');
    expect(getTier(19)).toBe('isolated');
    expect(getTier(0)).toBe('isolated');
  });
});

// ── Sub-dimension scoring ─────────────────────────────────────────────────────

describe('computeSubDimensionScore', () => {
  it('computes score for a partner sub-dimension', () => {
    const answers = partialAnswers({
      p_er_01: 5, // forward — max contribution
      p_er_02: 5, // forward — max contribution
    });
    expect(computeSubDimensionScore(answers, 'emotional_responsiveness')).toBe(100);
  });

  it('handles reverse-scored sub-dimension items', () => {
    // f_ab_02 is reverse-scored. Raw 1 → effective 5 (best)
    const answers = partialAnswers({
      f_ab_01: 5, // forward
      f_ab_02: 1, // reverse → effective 5
    });
    expect(computeSubDimensionScore(answers, 'acceptance_belonging')).toBe(100);
  });

  it('returns 0 for worst answers', () => {
    const answers = partialAnswers({
      p_er_01: 1,
      p_er_02: 1,
    });
    expect(computeSubDimensionScore(answers, 'emotional_responsiveness')).toBe(0);
  });
});

describe('computeAllSubDimensionScores', () => {
  it('returns scores for all 17 sub-dimensions', () => {
    const answers = uniformAnswers(3);
    const scores = computeAllSubDimensionScores(answers);

    // Partner: 5 sub-dimensions
    expect(Object.keys(scores.partner)).toHaveLength(5);
    expect(scores.partner).toHaveProperty('emotional_responsiveness');
    expect(scores.partner).toHaveProperty('conflict_quality');

    // Family: 4 sub-dimensions
    expect(Object.keys(scores.family)).toHaveLength(4);

    // Friends: 4 sub-dimensions
    expect(Object.keys(scores.friends)).toHaveLength(4);

    // Community: 4 sub-dimensions
    expect(Object.keys(scores.community)).toHaveLength(4);
  });
});

// ── Four Horsemen ─────────────────────────────────────────────────────────────

describe('computeFourHorsemen', () => {
  it('returns moderate risk when all answers are neutral (score=3 at mild threshold)', () => {
    const answers = uniformAnswers(3);
    const result = computeFourHorsemen(answers);
    // Neutral (3) → criticism=6-3=3, contempt=3, stonewalling=6-3=3 → all at mild threshold
    expect(result.overallRisk).toBe('moderate');
    expect(result.activeCount).toBe(0);
  });

  it('detects criticism when p_cq_01 is very low', () => {
    const answers = partialAnswers({ p_cq_01: 1 }); // 6-1=5 → high criticism
    const result = computeFourHorsemen(answers);
    expect(result.criticism.score).toBe(5);
    expect(result.criticism.present).toBe(true);
  });

  it('detects contempt when p_ap_02 is very high', () => {
    const answers = partialAnswers({ p_ap_02: 5 }); // raw 5 → contempt present
    const result = computeFourHorsemen(answers);
    expect(result.contempt.score).toBe(5);
    expect(result.contempt.present).toBe(true);
  });

  it('detects stonewalling when p_cq_02 is very low', () => {
    const answers = partialAnswers({ p_cq_02: 1 }); // 6-1=5
    const result = computeFourHorsemen(answers);
    expect(result.stonewalling.score).toBe(5);
    expect(result.stonewalling.present).toBe(true);
  });

  it('returns elevated risk when at least one horseman is present', () => {
    const answers = partialAnswers({ p_cq_01: 1 }); // criticism present
    const result = computeFourHorsemen(answers);
    expect(result.overallRisk).toBe('elevated');
  });

  it('returns moderate risk when scores are at threshold 3', () => {
    // All defaults to 3 → horseman scores = 6-3=3 for criticism/stonewalling, 3 for contempt
    const answers = uniformAnswers(3);
    const result = computeFourHorsemen(answers);
    // Score of 3 is at mild threshold, should be moderate
    expect(result.overallRisk).toBe('moderate');
  });

  it('returns low risk when all conflict items are very positive', () => {
    const answers = partialAnswers({
      p_cq_01: 5, // 6-5=1 → low criticism
      p_cq_02: 5, // 6-5=1 → low stonewalling
      p_ap_02: 1, // raw 1 → low contempt
    });
    const result = computeFourHorsemen(answers);
    expect(result.overallRisk).toBe('low');
    expect(result.activeCount).toBe(0);
  });
});

// ── Full result computation ───────────────────────────────────────────────────

describe('computeResult', () => {
  it('produces a complete result object', () => {
    const answers = uniformAnswers(3);
    const result = computeResult(answers, false);

    expect(result.version).toBe(2);
    expect(result.id).toBeTruthy();
    expect(result.compositeScore).toBeGreaterThanOrEqual(0);
    expect(result.compositeScore).toBeLessThanOrEqual(100);
    expect(result.tier).toBeDefined();
    expect(result.tierLabel).toBeTruthy();
    expect(result.domainScores).toBeDefined();
    expect(result.subDimensionScores).toBeDefined();
    expect(result.patterns).toBeDefined();
    expect(result.blueprint).toBeTruthy();
    expect(result.fourHorsemen).toBeDefined();
    expect(result.dvAlert).toBeDefined();
    expect(result.isolationAlert).toBeDefined();
  });

  it('does not include Four Horsemen when partner is skipped', () => {
    const answers = uniformAnswers(3);
    const result = computeResult(answers, true);
    expect(result.fourHorsemen).toBeNull();
    expect(result.skipPartner).toBe(true);
  });

  it('includes Four Horsemen when partner is included', () => {
    const answers = uniformAnswers(3);
    const result = computeResult(answers, false);
    expect(result.fourHorsemen).not.toBeNull();
    expect(result.skipPartner).toBe(false);
  });
});
