import { describe, it, expect } from 'vitest';
import { generateBlueprint } from '@/components/tools/RelationshipHealthCheck/narrative';
import type {
  DomainScores,
  SubDimensionScores,
  DetectedPattern,
  FourHorsemenResult,
} from '@/components/tools/RelationshipHealthCheck/types';

function makeSubScores(
  partner = 50,
  family = 50,
  friends = 50,
  community = 50
): SubDimensionScores {
  return {
    partner: {
      emotional_responsiveness: partner,
      conflict_quality: partner,
      trust_safety: partner,
      appreciation: partner,
      growth_meaning: partner,
    },
    family: {
      emotional_support: family,
      acceptance_belonging: family,
      healthy_communication: family,
      autonomy_respect: family,
    },
    friends: {
      depth_authenticity: friends,
      reciprocity_balance: friends,
      connection_presence: friends,
      vulnerability_trust: friends,
    },
    community: {
      belonging_identity: community,
      active_engagement: community,
      social_integration: community,
      purpose_contribution: community,
    },
  };
}

describe('generateBlueprint', () => {
  it('produces a non-empty string', () => {
    const scores: DomainScores = { partner: 60, family: 50, friends: 40, community: 30 };
    const result = generateBlueprint(
      45,
      'mixed',
      scores,
      makeSubScores(60, 50, 40, 30),
      [],
      null,
      false
    );
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(100);
  });

  it('contains multiple paragraphs', () => {
    const scores: DomainScores = { partner: 70, family: 60, friends: 50, community: 40 };
    const result = generateBlueprint(
      55,
      'mixed',
      scores,
      makeSubScores(70, 60, 50, 40),
      [],
      null,
      false
    );
    const paragraphs = result.split('\n\n').filter(Boolean);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
  });

  it('includes pattern paragraph when concern/warning patterns present', () => {
    const scores: DomainScores = { partner: 30, family: 30, friends: 30, community: 30 };
    const patterns: DetectedPattern[] = [
      {
        key: 'broad_disconnection',
        severity: 'concern',
        title: 'Disconnection Across Relationships',
        description: 'Low scores everywhere',
        frameworkRef: 'general_social',
        scienceNote: 'Research shows isolation is harmful.',
        triggerItems: [],
        interventionKeys: [],
      },
    ];
    const result = generateBlueprint(
      30,
      'strained',
      scores,
      makeSubScores(30, 30, 30, 30),
      patterns,
      null,
      false
    );
    const paragraphs = result.split('\n\n').filter(Boolean);
    expect(paragraphs.length).toBeGreaterThanOrEqual(4);
    expect(result.toLowerCase()).toContain('disconnection');
  });

  it('does NOT include pattern paragraph when only info patterns', () => {
    const scores: DomainScores = { partner: 80, family: 60, friends: 50, community: 30 };
    const patterns: DetectedPattern[] = [
      {
        key: 'domain_discrepancy',
        severity: 'info',
        title: 'Uneven Landscape',
        description: 'Gap between domains',
        frameworkRef: 'general_social',
        scienceNote: 'Some note',
        triggerItems: [],
        interventionKeys: [],
      },
    ];
    const result = generateBlueprint(
      55,
      'mixed',
      scores,
      makeSubScores(80, 60, 50, 30),
      patterns,
      null,
      false
    );
    // Info patterns don't get a paragraph
    const paragraphs = result.split('\n\n').filter(Boolean);
    // Opening + strength + growth + closing = 4, no pattern paragraph
    expect(paragraphs.length).toBe(4);
  });

  it('is deterministic — same inputs produce same output', () => {
    const scores: DomainScores = { partner: 70, family: 60, friends: 50, community: 40 };
    const subScores = makeSubScores(70, 60, 50, 40);
    const r1 = generateBlueprint(55, 'mixed', scores, subScores, [], null, false);
    const r2 = generateBlueprint(55, 'mixed', scores, subScores, [], null, false);
    expect(r1).toBe(r2);
  });

  it('works correctly when partner is skipped', () => {
    const scores: DomainScores = { partner: 0, family: 70, friends: 60, community: 40 };
    const result = generateBlueprint(
      57,
      'mixed',
      scores,
      makeSubScores(0, 70, 60, 40),
      [],
      null,
      true
    );
    expect(result).toBeTruthy();
    // Should not reference partner as strongest/weakest
    expect(result.toLowerCase()).not.toContain('romantic partner');
  });

  it('uses thriving opener for high scores', () => {
    const scores: DomainScores = { partner: 90, family: 85, friends: 80, community: 75 };
    const result = generateBlueprint(
      83,
      'thriving',
      scores,
      makeSubScores(90, 85, 80, 75),
      [],
      null,
      false
    );
    expect(
      result.includes('genuine strength') || result.includes('rich network')
    ).toBe(true);
  });
});
