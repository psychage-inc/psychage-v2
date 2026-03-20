import { describe, it, expect } from 'vitest';
import { detectPatterns } from '@/components/tools/RelationshipHealthCheck/patterns';
import type {
  DomainScores,
  SubDimensionScores,
  FourHorsemenResult,
} from '@/components/tools/RelationshipHealthCheck/types';

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeSubScores(overrides?: Partial<SubDimensionScores>): SubDimensionScores {
  return {
    partner: {
      emotional_responsiveness: 50,
      conflict_quality: 50,
      trust_safety: 50,
      appreciation: 50,
      growth_meaning: 50,
    },
    family: {
      emotional_support: 50,
      acceptance_belonging: 50,
      healthy_communication: 50,
      autonomy_respect: 50,
    },
    friends: {
      depth_authenticity: 50,
      reciprocity_balance: 50,
      connection_presence: 50,
      vulnerability_trust: 50,
    },
    community: {
      belonging_identity: 50,
      active_engagement: 50,
      social_integration: 50,
      purpose_contribution: 50,
    },
    ...overrides,
  };
}

function makeHorsemen(overrides?: Partial<FourHorsemenResult>): FourHorsemenResult {
  return {
    criticism: { score: 2, present: false },
    contempt: { score: 2, present: false },
    defensiveness: { score: 2, present: false },
    stonewalling: { score: 2, present: false },
    overallRisk: 'low',
    activeCount: 0,
    ...overrides,
  };
}

const neutralAnswers: Record<string, number> = {};

// ── Pattern detection tests ──────────────────────────────────────────────────

describe('detectPatterns', () => {
  it('returns empty array when no patterns match', () => {
    const scores: DomainScores = { partner: 60, family: 60, friends: 60, community: 60 };
    const result = detectPatterns(scores, makeSubScores(), makeHorsemen(), neutralAnswers, false);
    expect(result).toHaveLength(0);
  });

  it('caps results at 4 patterns', () => {
    // Create conditions for many patterns: all low scores
    const scores: DomainScores = { partner: 20, family: 20, friends: 20, community: 20 };
    const subScores = makeSubScores({
      partner: {
        emotional_responsiveness: 80,
        conflict_quality: 20,
        trust_safety: 20,
        appreciation: 20,
        growth_meaning: 20,
      },
    });
    const horsemen = makeHorsemen({
      criticism: { score: 5, present: true },
      contempt: { score: 5, present: true },
      overallRisk: 'elevated',
      activeCount: 2,
    });
    const answers = { f_ab_02: 5, f_ar_02: 5, p_ap_02: 5 };
    const result = detectPatterns(scores, subScores, horsemen, answers, false);
    expect(result.length).toBeLessThanOrEqual(4);
  });

  it('sorts patterns by severity (concern first)', () => {
    const scores: DomainScores = { partner: 15, family: 15, friends: 15, community: 15 };
    const horsemen = makeHorsemen({
      criticism: { score: 5, present: true },
      overallRisk: 'elevated',
      activeCount: 1,
    });
    const result = detectPatterns(scores, makeSubScores(), horsemen, neutralAnswers, false);

    if (result.length > 1) {
      const severityOrder = { concern: 0, warning: 1, info: 2 };
      for (let i = 1; i < result.length; i++) {
        expect(severityOrder[result[i].severity]).toBeGreaterThanOrEqual(
          severityOrder[result[i - 1].severity]
        );
      }
    }
  });

  describe('four_horsemen_critical', () => {
    it('detects when horsemen risk is elevated', () => {
      const scores: DomainScores = { partner: 50, family: 50, friends: 50, community: 50 };
      const horsemen = makeHorsemen({
        criticism: { score: 5, present: true },
        overallRisk: 'elevated',
        activeCount: 1,
      });
      const result = detectPatterns(scores, makeSubScores(), horsemen, neutralAnswers, false);
      expect(result.some((p) => p.key === 'four_horsemen_critical')).toBe(true);
    });

    it('has concern severity', () => {
      const scores: DomainScores = { partner: 50, family: 50, friends: 50, community: 50 };
      const horsemen = makeHorsemen({
        criticism: { score: 5, present: true },
        overallRisk: 'elevated',
        activeCount: 1,
      });
      const result = detectPatterns(scores, makeSubScores(), horsemen, neutralAnswers, false);
      const pattern = result.find((p) => p.key === 'four_horsemen_critical');
      expect(pattern?.severity).toBe('concern');
    });
  });

  describe('broad_disconnection', () => {
    it('triggers when all domains are below 40', () => {
      const scores: DomainScores = { partner: 30, family: 30, friends: 30, community: 30 };
      const result = detectPatterns(scores, makeSubScores(), makeHorsemen(), neutralAnswers, false);
      expect(result.some((p) => p.key === 'broad_disconnection')).toBe(true);
    });

    it('does not trigger if any domain is ≥ 40', () => {
      const scores: DomainScores = { partner: 30, family: 40, friends: 30, community: 30 };
      const result = detectPatterns(scores, makeSubScores(), makeHorsemen(), neutralAnswers, false);
      expect(result.some((p) => p.key === 'broad_disconnection')).toBe(false);
    });
  });

  describe('intimate_isolation', () => {
    it('triggers with strong partner but weak friends/community', () => {
      const scores: DomainScores = { partner: 80, family: 60, friends: 30, community: 30 };
      const result = detectPatterns(scores, makeSubScores(), makeHorsemen(), neutralAnswers, false);
      expect(result.some((p) => p.key === 'intimate_isolation')).toBe(true);
    });

    it('does not trigger when partner is skipped', () => {
      const scores: DomainScores = { partner: 80, family: 60, friends: 30, community: 30 };
      const result = detectPatterns(scores, makeSubScores(), makeHorsemen(), neutralAnswers, true);
      expect(result.some((p) => p.key === 'intimate_isolation')).toBe(false);
    });
  });

  describe('social_withdrawal', () => {
    it('triggers when both friends and community are below 35', () => {
      const scores: DomainScores = { partner: 60, family: 60, friends: 30, community: 30 };
      const result = detectPatterns(scores, makeSubScores(), makeHorsemen(), neutralAnswers, false);
      expect(result.some((p) => p.key === 'social_withdrawal')).toBe(true);
    });
  });

  describe('pursue_withdraw', () => {
    it('triggers with high emotional responsiveness and low conflict quality', () => {
      const scores: DomainScores = { partner: 50, family: 50, friends: 50, community: 50 };
      const subScores = makeSubScores({
        partner: {
          emotional_responsiveness: 80,
          conflict_quality: 25,
          trust_safety: 50,
          appreciation: 50,
          growth_meaning: 50,
        },
      });
      const result = detectPatterns(scores, subScores, makeHorsemen(), neutralAnswers, false);
      expect(result.some((p) => p.key === 'pursue_withdraw')).toBe(true);
    });

    it('does not trigger when partner is skipped', () => {
      const scores: DomainScores = { partner: 50, family: 50, friends: 50, community: 50 };
      const subScores = makeSubScores({
        partner: {
          emotional_responsiveness: 80,
          conflict_quality: 25,
          trust_safety: 50,
          appreciation: 50,
          growth_meaning: 50,
        },
      });
      const result = detectPatterns(scores, subScores, makeHorsemen(), neutralAnswers, true);
      expect(result.some((p) => p.key === 'pursue_withdraw')).toBe(false);
    });
  });

  describe('domain_discrepancy', () => {
    it('triggers when gap between highest and lowest is ≥ 40', () => {
      const scores: DomainScores = { partner: 80, family: 80, friends: 80, community: 30 };
      const result = detectPatterns(scores, makeSubScores(), makeHorsemen(), neutralAnswers, false);
      expect(result.some((p) => p.key === 'domain_discrepancy')).toBe(true);
    });

    it('does not trigger when gap is < 40', () => {
      const scores: DomainScores = { partner: 60, family: 50, friends: 55, community: 45 };
      const result = detectPatterns(scores, makeSubScores(), makeHorsemen(), neutralAnswers, false);
      expect(result.some((p) => p.key === 'domain_discrepancy')).toBe(false);
    });
  });

  describe('hidden_self', () => {
    it('triggers when hiding items are strongly endorsed in 2+ domains', () => {
      const scores: DomainScores = { partner: 50, family: 50, friends: 50, community: 50 };
      const answers = {
        f_ab_02: 5, // hiding from family
        f_ar_02: 4, // pressure from family
        p_ap_02: 4, // dismissed by partner
      };
      const result = detectPatterns(scores, makeSubScores(), makeHorsemen(), answers, false);
      expect(result.some((p) => p.key === 'hidden_self')).toBe(true);
    });
  });
});
