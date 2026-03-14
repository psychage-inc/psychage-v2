// ============================================================================
// Psychage Evidence-Based Article Framework (PEAF) — Quality Gate Engine
//
// Validates articles against PEAF requirements before they can transition
// from draft → in_review. Returns a structured result with pass/fail/warning
// for each check, an overall score, and blocking status.
// ============================================================================

import type {
  ArticleTemplate,
  EnhancedCitation,
  QualityCheck,
  QualityGateInput,
  QualityGateResult,
  SensitivityFlag,
  SourceTier,
} from './types';
import {
  ARTICLE_TEMPLATES,
  BLOCKED_SOURCE_DOMAINS,
  QUALITY_GATE,
  SENSITIVITY_TERMS,
  SOURCE_TYPE_TO_TIER,
} from './constants';
import { analyzeReadability } from './readability';

// ---------------------------------------------------------------------------
// Individual Check Functions
// ---------------------------------------------------------------------------

function checkWordCount(content: string, template: ArticleTemplate): QualityCheck {
  const wordCount = content.split(/\s+/).filter((w) => w.length > 0).length;
  const passed = wordCount >= template.minWordCount;

  return {
    id: 'word_count',
    label: 'Word Count',
    status: passed ? 'pass' : 'fail',
    message: passed
      ? `${wordCount} words (minimum: ${template.minWordCount})`
      : `${wordCount} words — needs at least ${template.minWordCount} for ${template.label}`,
    blocking: true,
    value: wordCount,
    target: template.minWordCount,
  };
}

function checkCitationCount(citations: EnhancedCitation[], template: ArticleTemplate): QualityCheck {
  const count = citations.length;
  const passed = count >= template.minCitations;

  return {
    id: 'citation_count',
    label: 'Citation Count',
    status: passed ? 'pass' : 'fail',
    message: passed
      ? `${count} citations (minimum: ${template.minCitations})`
      : `${count} citations — needs at least ${template.minCitations} for ${template.label}`,
    blocking: true,
    value: count,
    target: template.minCitations,
  };
}

function checkSourceTierCompliance(citations: EnhancedCitation[]): QualityCheck {
  if (citations.length === 0) {
    return {
      id: 'source_tier',
      label: 'Source Tier Compliance',
      status: 'fail',
      message: 'No citations to evaluate',
      blocking: true,
    };
  }

  const tierCounts: Record<SourceTier, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const c of citations) {
    const tier = c.tier ?? SOURCE_TYPE_TO_TIER[c.sourceType] ?? 5;
    tierCounts[tier]++;
  }

  const total = citations.length;
  const tier1Pct = (tierCounts[1] / total) * 100;
  const tier12Pct = ((tierCounts[1] + tierCounts[2]) / total) * 100;
  const tier5Pct = (tierCounts[5] / total) * 100;

  const issues: string[] = [];
  if (tier1Pct < QUALITY_GATE.MIN_TIER1_PCT) {
    issues.push(`Tier 1 at ${Math.round(tier1Pct)}% (need ${QUALITY_GATE.MIN_TIER1_PCT}%)`);
  }
  if (tier12Pct < QUALITY_GATE.MIN_TIER1_2_PCT) {
    issues.push(`Tier 1+2 at ${Math.round(tier12Pct)}% (need ${QUALITY_GATE.MIN_TIER1_2_PCT}%)`);
  }
  if (tier5Pct > QUALITY_GATE.MAX_TIER5_PCT) {
    issues.push(`Tier 5 at ${Math.round(tier5Pct)}% (max ${QUALITY_GATE.MAX_TIER5_PCT}%)`);
  }

  const passed = issues.length === 0;

  return {
    id: 'source_tier',
    label: 'Source Tier Compliance',
    status: passed ? 'pass' : 'fail',
    message: passed
      ? `Tier 1: ${Math.round(tier1Pct)}% | Tier 1+2: ${Math.round(tier12Pct)}% | Tier 5: ${Math.round(tier5Pct)}%`
      : issues.join('; '),
    blocking: true,
    value: Math.round(tier12Pct),
    target: QUALITY_GATE.MIN_TIER1_2_PCT,
  };
}

function checkCitationRecency(citations: EnhancedCitation[]): QualityCheck {
  const currentYear = new Date().getFullYear();
  const citationsWithYear = citations.filter((c) => c.year != null);

  if (citationsWithYear.length === 0) {
    return {
      id: 'citation_recency',
      label: 'Citation Recency',
      status: 'warning',
      message: 'No citations have a publication year set',
      blocking: false,
    };
  }

  const recentCount = citationsWithYear.filter(
    (c) => currentYear - c.year! <= QUALITY_GATE.RECENCY_YEARS,
  ).length;
  const recentPct = (recentCount / citationsWithYear.length) * 100;
  const passed = recentPct >= QUALITY_GATE.MIN_RECENT_PCT;

  return {
    id: 'citation_recency',
    label: 'Citation Recency',
    status: passed ? 'pass' : 'warning',
    message: passed
      ? `${Math.round(recentPct)}% of citations within last ${QUALITY_GATE.RECENCY_YEARS} years`
      : `Only ${Math.round(recentPct)}% of citations are within last ${QUALITY_GATE.RECENCY_YEARS} years (target: ${QUALITY_GATE.MIN_RECENT_PCT}%)`,
    blocking: false,
    value: Math.round(recentPct),
    target: QUALITY_GATE.MIN_RECENT_PCT,
  };
}

function checkRequiredSections(content: string, template: ArticleTemplate): QualityCheck {
  // Look for h2-level headings in plain text (## or bold lines or uppercase)
  const headingPatterns = template.requiredSections.map((section) => {
    // Create a flexible regex that matches the section name in headings
    const escaped = section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return {
      section,
      pattern: new RegExp(`(^|\\n)#{1,3}\\s*${escaped}|\\b${escaped}\\b`, 'i'),
    };
  });

  const missing = headingPatterns
    .filter(({ pattern }) => !pattern.test(content))
    .map(({ section }) => section);

  const passed = missing.length === 0;

  return {
    id: 'required_sections',
    label: 'Required Sections',
    status: passed ? 'pass' : 'fail',
    message: passed
      ? `All ${template.requiredSections.length} required sections present`
      : `Missing sections: ${missing.join(', ')}`,
    blocking: true,
    value: template.requiredSections.length - missing.length,
    target: template.requiredSections.length,
  };
}

function checkReadability(content: string): QualityCheck {
  const result = analyzeReadability(content);
  const grade = result.fleschKincaidGrade;

  let status: QualityCheck['status'];
  if (grade <= QUALITY_GATE.MAX_FK_GRADE) {
    status = 'pass';
  } else if (grade <= QUALITY_GATE.HARD_FAIL_FK_GRADE) {
    status = 'warning';
  } else {
    status = 'fail';
  }

  return {
    id: 'readability',
    label: 'Readability (Flesch-Kincaid)',
    status,
    message:
      status === 'pass'
        ? `Grade level ${grade} (target: ≤ ${QUALITY_GATE.MAX_FK_GRADE})`
        : `Grade level ${grade} — target is ≤ ${QUALITY_GATE.MAX_FK_GRADE} (6th–8th grade)`,
    blocking: false,
    value: grade,
    target: QUALITY_GATE.MAX_FK_GRADE,
  };
}

function checkDisclaimer(hasDisclaimer: boolean, template: ArticleTemplate): QualityCheck {
  // Condition deep-dives, treatment guides, and crisis articles need disclaimers
  const requiresDisclaimer =
    template.requiresCrisisDisclaimer ||
    template.type === 'condition_deep_dive' ||
    template.type === 'treatment_guide';

  if (!requiresDisclaimer) {
    return {
      id: 'disclaimer',
      label: 'Medical Disclaimer',
      status: 'pass',
      message: 'Not required for this article type',
      blocking: false,
    };
  }

  return {
    id: 'disclaimer',
    label: 'Medical Disclaimer',
    status: hasDisclaimer ? 'pass' : 'fail',
    message: hasDisclaimer
      ? 'Medical disclaimer present'
      : 'Medical disclaimer required for this article type',
    blocking: true,
  };
}

function checkAuthor(authorName: string | null): QualityCheck {
  const hasAuthor = authorName != null && authorName.trim().length > 0;

  return {
    id: 'author',
    label: 'Author Assigned',
    status: hasAuthor ? 'pass' : 'fail',
    message: hasAuthor ? `Author: ${authorName}` : 'No author assigned',
    blocking: true,
  };
}

function checkLinkedConditions(linkedConditionIds: string[], template: ArticleTemplate): QualityCheck {
  const requiresLink = template.linkedResourceTypes.includes('condition');
  if (!requiresLink) {
    return {
      id: 'linked_conditions',
      label: 'Linked Conditions',
      status: 'pass',
      message: 'Not required for this article type',
      blocking: false,
    };
  }

  const hasLinks = linkedConditionIds.length > 0;
  return {
    id: 'linked_conditions',
    label: 'Linked Conditions',
    status: hasLinks ? 'pass' : 'warning',
    message: hasLinks
      ? `${linkedConditionIds.length} condition(s) linked`
      : 'No conditions linked — consider connecting to symptom navigator',
    blocking: false,
    value: linkedConditionIds.length,
  };
}

function checkSensitivity(content: string): QualityCheck {
  const flags: SensitivityFlag[] = [];
  const lowerContent = content.toLowerCase();

  for (const { term, suggestion } of SENSITIVITY_TERMS) {
    const lowerTerm = term.toLowerCase();
    let pos = lowerContent.indexOf(lowerTerm);

    while (pos !== -1) {
      // Extract context (20 chars before and after)
      const start = Math.max(0, pos - 20);
      const end = Math.min(content.length, pos + term.length + 20);
      const context = content.slice(start, end);

      flags.push({ term, suggestion, position: pos, context });
      pos = lowerContent.indexOf(lowerTerm, pos + 1);
    }
  }

  return {
    id: 'sensitivity',
    label: 'Sensitivity Language',
    status: flags.length === 0 ? 'pass' : 'warning',
    message:
      flags.length === 0
        ? 'No flagged terms found'
        : `${flags.length} flagged term(s): ${[...new Set(flags.map((f) => `"${f.term}"`))].join(', ')}`,
    blocking: false,
    value: flags.length,
  };
}

function checkBlockedSources(citations: EnhancedCitation[]): QualityCheck {
  const blocked: string[] = [];

  for (const c of citations) {
    if (!c.url) continue;
    try {
      const hostname = new URL(c.url).hostname.replace(/^www\./, '');
      if (BLOCKED_SOURCE_DOMAINS.some((d) => hostname === d || hostname.endsWith(`.${d}`))) {
        blocked.push(`"${c.title}" (${hostname})`);
      }
    } catch {
      // Invalid URL — will be caught by other validation
    }
  }

  return {
    id: 'blocked_sources',
    label: 'Blocked Source Domains',
    status: blocked.length === 0 ? 'pass' : 'fail',
    message:
      blocked.length === 0
        ? 'No blocked source domains found'
        : `${blocked.length} citation(s) from blocked domains: ${blocked.join('; ')}`,
    blocking: true,
    value: blocked.length,
  };
}

// ---------------------------------------------------------------------------
// Quality Score Calculation
// ---------------------------------------------------------------------------

/**
 * Calculates a 0–100 quality score based on check results.
 *
 * Weighting:
 *   - Pass on a blocking check: full points
 *   - Pass on a warning check: full points
 *   - Warning status: half points
 *   - Fail on any check: 0 points
 *
 * Checks are weighted by importance:
 *   - source_tier, citation_count, required_sections: 15 each
 *   - readability, word_count: 10 each
 *   - citation_recency, sensitivity, blocked_sources: 8 each
 *   - disclaimer, author, linked_conditions: 5 each
 */
const CHECK_WEIGHTS: Record<string, number> = {
  source_tier: 15,
  citation_count: 15,
  required_sections: 15,
  readability: 10,
  word_count: 10,
  citation_recency: 8,
  sensitivity: 8,
  blocked_sources: 8,
  disclaimer: 5,
  author: 5,
  linked_conditions: 1,
};

function calculateScore(checks: QualityCheck[]): number {
  let earned = 0;
  let possible = 0;

  for (const check of checks) {
    const weight = CHECK_WEIGHTS[check.id] ?? 5;
    possible += weight;

    if (check.status === 'pass') {
      earned += weight;
    } else if (check.status === 'warning') {
      earned += weight * 0.5;
    }
    // fail = 0 points
  }

  return possible > 0 ? Math.round((earned / possible) * 100) : 0;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Runs the full quality gate on an article.
 *
 * @returns QualityGateResult with pass/fail status, individual checks, and score
 */
export function runQualityGate(input: QualityGateInput): QualityGateResult {
  const template = ARTICLE_TEMPLATES[input.articleType];

  const checks: QualityCheck[] = [
    checkWordCount(input.content, template),
    checkCitationCount(input.citations, template),
    checkSourceTierCompliance(input.citations),
    checkCitationRecency(input.citations),
    checkRequiredSections(input.content, template),
    checkReadability(input.content),
    checkDisclaimer(input.hasDisclaimer, template),
    checkAuthor(input.authorName),
    checkLinkedConditions(input.linkedConditionIds, template),
    checkSensitivity(input.content),
    checkBlockedSources(input.citations),
  ];

  const blockingFailures = checks.filter((c) => c.blocking && c.status === 'fail').length;
  const warnings = checks.filter((c) => c.status === 'warning').length;
  const score = calculateScore(checks);

  return {
    passed: blockingFailures === 0,
    score,
    checks,
    blockingFailures,
    warnings,
    timestamp: new Date().toISOString(),
  };
}
