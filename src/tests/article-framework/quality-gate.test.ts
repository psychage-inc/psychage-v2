 
import { describe, it, expect } from 'vitest';
import { runQualityGate } from '@/lib/article-framework/quality-gate';
import type { QualityGateInput, EnhancedCitation } from '@/lib/article-framework/types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeCitation(
  overrides: Partial<EnhancedCitation> = {},
  index = 0,
): EnhancedCitation {
  return {
    id: `cit-${index}`,
    articleId: 'test-article',
    sourceType: 'peer_reviewed_journal',
    tier: 1,
    title: `Study ${index}`,
    authors: ['Author A'],
    year: 2023,
    sortOrder: index,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

function makeInput(overrides: Partial<QualityGateInput> = {}): QualityGateInput {
  // Build a valid article that passes all checks by default
  const sections = [
    '## Overview\nContent here.',
    '## Signs & Symptoms\nContent here.',
    '## Causes & Risk Factors\nContent here.',
    '## Diagnosis\nContent here.',
    '## Treatment Options\nContent here.',
    '## Living With\nContent here.',
    '## When to Seek Help\nContent here.',
    '## References\nContent here.',
  ];

  // Pad with words to reach 2000+
  const padding = Array(300).fill('This is a simple sentence about mental health.').join(' ');

  return {
    content: sections.join('\n\n') + '\n\n' + padding + '\n\nThis article is for informational purposes only.',
    articleType: 'condition_deep_dive',
    citations: Array.from({ length: 12 }, (_, i) => makeCitation({}, i)),
    authorName: 'Dr. Jane Smith',
    linkedConditionIds: ['MDE'],
    hasDisclaimer: true,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('runQualityGate', () => {
  describe('passing scenario', () => {
    it('passes when all requirements are met for condition_deep_dive', () => {
      const result = runQualityGate(makeInput());
      expect(result.passed).toBe(true);
      expect(result.blockingFailures).toBe(0);
      expect(result.score).toBeGreaterThan(50);
    });
  });

  describe('word count check', () => {
    it('fails when word count is below minimum', () => {
      const result = runQualityGate(makeInput({ content: 'Short article.' }));
      const wordCheck = result.checks.find((c) => c.id === 'word_count');
      expect(wordCheck?.status).toBe('fail');
      expect(wordCheck?.blocking).toBe(true);
      expect(result.passed).toBe(false);
    });
  });

  describe('citation count check', () => {
    it('fails when citation count is below minimum', () => {
      const result = runQualityGate(
        makeInput({ citations: [makeCitation({}, 0), makeCitation({}, 1)] }),
      );
      const citCheck = result.checks.find((c) => c.id === 'citation_count');
      expect(citCheck?.status).toBe('fail');
      expect(citCheck?.blocking).toBe(true);
    });

    it('passes with exact minimum citations', () => {
      // condition_deep_dive needs 12
      const citations = Array.from({ length: 12 }, (_, i) => makeCitation({}, i));
      const result = runQualityGate(makeInput({ citations }));
      const citCheck = result.checks.find((c) => c.id === 'citation_count');
      expect(citCheck?.status).toBe('pass');
    });
  });

  describe('source tier compliance', () => {
    it('fails when Tier 1 percentage is below 40%', () => {
      // 3 Tier 1 out of 12 = 25% (below 40%)
      const citations = [
        ...Array.from({ length: 3 }, (_, i) => makeCitation({ tier: 1, sourceType: 'peer_reviewed_journal' }, i)),
        ...Array.from({ length: 9 }, (_, i) => makeCitation({ tier: 5, sourceType: 'reference' }, i + 3)),
      ];
      const result = runQualityGate(makeInput({ citations }));
      const tierCheck = result.checks.find((c) => c.id === 'source_tier');
      expect(tierCheck?.status).toBe('fail');
    });

    it('fails when Tier 1+2 combined is below 60%', () => {
      // 5 Tier 1 + 1 Tier 2 = 6/12 = 50% (below 60%)
      const citations = [
        ...Array.from({ length: 5 }, (_, i) => makeCitation({ tier: 1 }, i)),
        ...Array.from({ length: 1 }, (_, i) => makeCitation({ tier: 2, sourceType: 'nimh' }, i + 5)),
        ...Array.from({ length: 6 }, (_, i) => makeCitation({ tier: 3, sourceType: 'nami' }, i + 6)),
      ];
      const result = runQualityGate(makeInput({ citations }));
      const tierCheck = result.checks.find((c) => c.id === 'source_tier');
      expect(tierCheck?.status).toBe('fail');
    });

    it('passes with proper tier distribution', () => {
      // 6 Tier 1 + 3 Tier 2 + 3 Tier 3 = 9/12 T1+T2 = 75%
      const citations = [
        ...Array.from({ length: 6 }, (_, i) => makeCitation({ tier: 1 }, i)),
        ...Array.from({ length: 3 }, (_, i) => makeCitation({ tier: 2, sourceType: 'nimh' }, i + 6)),
        ...Array.from({ length: 3 }, (_, i) => makeCitation({ tier: 3, sourceType: 'nami' }, i + 9)),
      ];
      const result = runQualityGate(makeInput({ citations }));
      const tierCheck = result.checks.find((c) => c.id === 'source_tier');
      expect(tierCheck?.status).toBe('pass');
    });

    it('fails with empty citations', () => {
      const result = runQualityGate(makeInput({ citations: [] }));
      const tierCheck = result.checks.find((c) => c.id === 'source_tier');
      expect(tierCheck?.status).toBe('fail');
    });
  });

  describe('citation recency', () => {
    it('warns when too many old citations', () => {
      const citations = Array.from({ length: 12 }, (_, i) =>
        makeCitation({ year: 2010 }, i),
      );
      const result = runQualityGate(makeInput({ citations }));
      const recencyCheck = result.checks.find((c) => c.id === 'citation_recency');
      expect(recencyCheck?.status).toBe('warning');
      expect(recencyCheck?.blocking).toBe(false);
    });

    it('passes when citations are recent', () => {
      const citations = Array.from({ length: 12 }, (_, i) =>
        makeCitation({ year: 2024 }, i),
      );
      const result = runQualityGate(makeInput({ citations }));
      const recencyCheck = result.checks.find((c) => c.id === 'citation_recency');
      expect(recencyCheck?.status).toBe('pass');
    });
  });

  describe('required sections', () => {
    it('fails when sections are missing', () => {
      const result = runQualityGate(
        makeInput({ content: '## Overview\nSome content.\n\n' + Array(300).fill('word').join(' ') }),
      );
      const sectionCheck = result.checks.find((c) => c.id === 'required_sections');
      expect(sectionCheck?.status).toBe('fail');
      expect(sectionCheck?.blocking).toBe(true);
    });
  });

  describe('author check', () => {
    it('fails when no author', () => {
      const result = runQualityGate(makeInput({ authorName: null }));
      const authorCheck = result.checks.find((c) => c.id === 'author');
      expect(authorCheck?.status).toBe('fail');
      expect(authorCheck?.blocking).toBe(true);
    });

    it('fails with empty string author', () => {
      const result = runQualityGate(makeInput({ authorName: '   ' }));
      const authorCheck = result.checks.find((c) => c.id === 'author');
      expect(authorCheck?.status).toBe('fail');
    });

    it('passes with valid author', () => {
      const result = runQualityGate(makeInput({ authorName: 'Dr. Smith' }));
      const authorCheck = result.checks.find((c) => c.id === 'author');
      expect(authorCheck?.status).toBe('pass');
    });
  });

  describe('disclaimer check', () => {
    it('fails for condition_deep_dive without disclaimer', () => {
      const result = runQualityGate(makeInput({ hasDisclaimer: false }));
      const disclaimerCheck = result.checks.find((c) => c.id === 'disclaimer');
      expect(disclaimerCheck?.status).toBe('fail');
      expect(disclaimerCheck?.blocking).toBe(true);
    });

    it('passes for research_digest without disclaimer', () => {
      const sections = [
        '## Key Finding\nContent.',
        '## Study Details\nContent.',
        '## What This Means\nContent.',
        '## Limitations\nContent.',
        "## What's Next\nContent.",
        '## References\nContent.',
      ];
      const padding = Array(200).fill('Simple words here.').join(' ');
      const result = runQualityGate(
        makeInput({
          articleType: 'research_digest',
          hasDisclaimer: false,
          content: sections.join('\n\n') + '\n\n' + padding,
          citations: Array.from({ length: 5 }, (_, i) => makeCitation({}, i)),
        }),
      );
      const disclaimerCheck = result.checks.find((c) => c.id === 'disclaimer');
      expect(disclaimerCheck?.status).toBe('pass');
    });
  });

  describe('sensitivity check', () => {
    it('warns when stigmatizing language is found', () => {
      const input = makeInput();
      input.content = input.content + ' The patient suffers from depression and committed suicide.';
      const result = runQualityGate(input);
      const sensitivityCheck = result.checks.find((c) => c.id === 'sensitivity');
      expect(sensitivityCheck?.status).toBe('warning');
      expect(sensitivityCheck?.blocking).toBe(false);
    });

    it('passes when no flagged terms exist', () => {
      const result = runQualityGate(makeInput());
      const sensitivityCheck = result.checks.find((c) => c.id === 'sensitivity');
      expect(sensitivityCheck?.status).toBe('pass');
    });
  });

  describe('blocked sources check', () => {
    it('fails when citation URLs are from blocked domains', () => {
      const citations = Array.from({ length: 12 }, (_, i) =>
        makeCitation({ url: i === 0 ? 'https://www.wikipedia.org/wiki/Depression' : undefined }, i),
      );
      const result = runQualityGate(makeInput({ citations }));
      const blockedCheck = result.checks.find((c) => c.id === 'blocked_sources');
      expect(blockedCheck?.status).toBe('fail');
      expect(blockedCheck?.blocking).toBe(true);
    });

    it('passes with valid source URLs', () => {
      const citations = Array.from({ length: 12 }, (_, i) =>
        makeCitation({ url: 'https://pubmed.ncbi.nlm.nih.gov/12345678/' }, i),
      );
      const result = runQualityGate(makeInput({ citations }));
      const blockedCheck = result.checks.find((c) => c.id === 'blocked_sources');
      expect(blockedCheck?.status).toBe('pass');
    });
  });

  describe('linked conditions', () => {
    it('warns when no conditions linked', () => {
      const result = runQualityGate(makeInput({ linkedConditionIds: [] }));
      const linkCheck = result.checks.find((c) => c.id === 'linked_conditions');
      expect(linkCheck?.status).toBe('warning');
      expect(linkCheck?.blocking).toBe(false);
    });

    it('passes when conditions are linked', () => {
      const result = runQualityGate(makeInput({ linkedConditionIds: ['MDE', 'GAD'] }));
      const linkCheck = result.checks.find((c) => c.id === 'linked_conditions');
      expect(linkCheck?.status).toBe('pass');
    });
  });

  describe('overall scoring', () => {
    it('returns score between 0 and 100', () => {
      const result = runQualityGate(makeInput());
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    });

    it('returns higher score for fully compliant articles', () => {
      const good = runQualityGate(makeInput());
      const bad = runQualityGate(makeInput({ citations: [], authorName: null, content: 'short' }));
      expect(good.score).toBeGreaterThan(bad.score);
    });

    it('includes timestamp in result', () => {
      const result = runQualityGate(makeInput());
      expect(result.timestamp).toBeTruthy();
      expect(new Date(result.timestamp).getTime()).not.toBeNaN();
    });

    it('counts blocking failures and warnings separately', () => {
      const result = runQualityGate(
        makeInput({
          authorName: null,
          linkedConditionIds: [],
          citations: Array.from({ length: 12 }, (_, i) => makeCitation({ year: 2010 }, i)),
        }),
      );
      // authorName null = 1 blocking failure
      expect(result.blockingFailures).toBeGreaterThanOrEqual(1);
      // linkedConditionIds empty + old citations = warnings
      expect(result.warnings).toBeGreaterThanOrEqual(1);
    });
  });

  describe('different article types', () => {
    it('uses correct template requirements for research_digest', () => {
      const sections = [
        '## Key Finding\nContent.',
        '## Study Details\nContent.',
        '## What This Means\nContent.',
        '## Limitations\nContent.',
        "## What's Next\nContent.",
        '## References\nContent.',
      ];
      const padding = Array(200).fill('Simple sentence here.').join(' ');

      const result = runQualityGate({
        content: sections.join('\n\n') + '\n\n' + padding,
        articleType: 'research_digest',
        citations: Array.from({ length: 5 }, (_, i) => makeCitation({}, i)),
        authorName: 'Dr. Smith',
        linkedConditionIds: ['MDE'],
        hasDisclaimer: false,
      });

      // research_digest only needs 5 citations and 800 words
      const citCheck = result.checks.find((c) => c.id === 'citation_count');
      expect(citCheck?.status).toBe('pass');
    });

    it('requires clinical review for crisis_safety', async () => {
      // crisis_safety template has requiresClinicalReview = true
      const { ARTICLE_TEMPLATES } = await import('@/lib/article-framework/constants');
      expect(ARTICLE_TEMPLATES.crisis_safety.requiresClinicalReview).toBe(true);
      expect(ARTICLE_TEMPLATES.crisis_safety.requiresCrisisDisclaimer).toBe(true);
    });
  });
});
