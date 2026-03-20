/**
 * Deterministic Relationship Blueprint Narrative Generator.
 *
 * Produces a 3-5 paragraph personalized narrative (150-250 words)
 * using template composition. No LLM dependency.
 *
 * Structure:
 * 1. Opening — tier-based
 * 2. Strength paragraph — highest domain + top sub-dimension
 * 3. Growth paragraph — lowest domain + weakest sub-dimension
 * 4. Pattern paragraph (conditional) — if concern/warning patterns detected
 * 5. Closing — forward-looking with specific next step
 */

import type {
  RelationshipTier,
  RelationshipDomain,
  DomainScores,
  SubDimensionScores,
  DetectedPattern,
  FourHorsemenResult,
} from './types';
import { DOMAIN_META, SUB_DIMENSION_META } from './types';

// ── Template variants ───────────────────────────────────────────────────────

const TIER_OPENERS: Record<RelationshipTier, string[]> = {
  thriving: [
    'Your relationship landscape reflects genuine strength and connection across multiple areas of your life.',
    'Your assessment reveals a rich network of meaningful connections that form a strong foundation for your well-being.',
  ],
  healthy: [
    'Your relationships show a solid foundation with some natural areas where deeper connection could develop.',
    'You have meaningful connections in your life, with opportunities to strengthen certain areas further.',
  ],
  mixed: [
    'Your relationship picture is nuanced — there are genuine strengths alongside areas that may benefit from attention.',
    'Like many people, your relationship landscape has both bright spots and areas where growth could make a real difference.',
  ],
  strained: [
    'Your responses suggest you may be navigating some challenges in your relationships right now.',
    'Several of your relationship areas are showing signs of strain — which is more common than most people realize.',
  ],
  isolated: [
    'Your responses suggest you may be experiencing significant disconnection across your relationships. This is painful, and it matters that you\'re taking stock.',
    'Feeling disconnected is one of the most difficult experiences, and your willingness to reflect on it is a meaningful first step.',
  ],
};

function getStrengthParagraph(
  domain: RelationshipDomain,
  subDimKey: string,
  subDimScore: number,
  domainScore: number
): string {
  const domainName = DOMAIN_META[domain].name.toLowerCase();
  const subMeta = SUB_DIMENSION_META.find((m) => m.key === subDimKey);
  const subName = subMeta?.name ?? subDimKey;

  if (domainScore >= 75) {
    return `Your strongest area is your ${domainName} connections, where ${subName.toLowerCase()} stands out at ${subDimScore}/100. This is a genuine source of resilience — research consistently shows that strong connections in even one domain create a buffer against life's challenges. The patterns you've built here are worth protecting and can serve as a model for strengthening other areas.`;
  }
  return `Among your relationship domains, ${domainName} is your relative strength, particularly in ${subName.toLowerCase()} (${subDimScore}/100). While there's room for growth here too, this area provides a foundation you can build on as you invest in other relationship domains.`;
}

function getGrowthParagraph(
  domain: RelationshipDomain,
  subDimKey: string,
  subDimScore: number,
  domainScore: number
): string {
  const domainName = DOMAIN_META[domain].name.toLowerCase();
  const subMeta = SUB_DIMENSION_META.find((m) => m.key === subDimKey);
  const subName = subMeta?.name ?? subDimKey;

  if (domainScore < 30) {
    return `The area with the most room for growth is your ${domainName} connections, especially around ${subName.toLowerCase()} (${subDimScore}/100). Scores in this range are not a judgment — they often reflect circumstances, transitions, or patterns that developed for good reasons. Even small, consistent steps in this area can create meaningful change over time.`;
  }
  if (domainScore < 50) {
    return `Your ${domainName} domain is where focused attention could yield the biggest returns, particularly around ${subName.toLowerCase()} (${subDimScore}/100). This doesn't require a dramatic overhaul — often one specific behavior change in one relationship can shift the entire dynamic.`;
  }
  return `While your overall profile is generally positive, ${domainName} connections — specifically ${subName.toLowerCase()} (${subDimScore}/100) — represent your best opportunity for growth. Small, intentional investments here could elevate your entire relationship landscape.`;
}

function getPatternParagraph(patterns: DetectedPattern[]): string {
  const concernPatterns = patterns.filter((p) => p.severity === 'concern');
  const warningPatterns = patterns.filter((p) => p.severity === 'warning');

  if (concernPatterns.length > 0) {
    const p = concernPatterns[0];
    return `An important pattern in your profile: ${p.title.toLowerCase()}. ${p.scienceNote} This insight can guide where to focus your energy — addressing this pattern specifically is likely to have the greatest impact.`;
  }
  if (warningPatterns.length > 0) {
    const p = warningPatterns[0];
    return `Your assessment also revealed a notable pattern: ${p.title.toLowerCase()}. ${p.scienceNote}`;
  }
  return '';
}

function getClosing(
  tier: RelationshipTier,
  weakestDomain: RelationshipDomain,
  weakestSubDimKey: string
): string {
  const subMeta = SUB_DIMENSION_META.find((m) => m.key === weakestSubDimKey);
  const subName = subMeta?.name?.toLowerCase() ?? 'this area';

  if (tier === 'thriving' || tier === 'healthy') {
    return `Continue doing what works, and consider how you might gently invest in ${subName}. Even at your level, intentional growth deepens the connections that sustain you.`;
  }
  if (tier === 'mixed') {
    return `Focus your energy on one specific action in ${subName} this week. Relationship research consistently shows that small, consistent changes compound into meaningful transformation over time.`;
  }
  return `You don't have to change everything at once. Start with one step — perhaps reaching out to one person, or exploring professional support. Even small movements toward connection begin to shift the larger pattern.`;
}

// ── Main generator ──────────────────────────────────────────────────────────

/**
 * Simple hash for deterministic template variant selection.
 */
function simpleHash(answers: Record<string, number>): number {
  let hash = 0;
  const keys = Object.keys(answers).sort();
  for (const key of keys) {
    hash = ((hash << 5) - hash + (answers[key] ?? 0)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Find highest and lowest scoring domain/sub-dimension pairs.
 */
function findExtremes(
  domainScores: DomainScores,
  subDimensionScores: SubDimensionScores,
  skipPartner: boolean
) {
  const domains: RelationshipDomain[] = skipPartner
    ? ['family', 'friends', 'community']
    : ['partner', 'family', 'friends', 'community'];

  let highestDomain = domains[0];
  let lowestDomain = domains[0];

  for (const d of domains) {
    if (domainScores[d] > domainScores[highestDomain]) highestDomain = d;
    if (domainScores[d] < domainScores[lowestDomain]) lowestDomain = d;
  }

  // Find best sub-dimension in highest domain
  const highSubDims = DOMAIN_META[highestDomain].subDimensions;
  let bestSubDim = highSubDims[0];
  let bestSubScore = 0;
  for (const sd of highSubDims) {
    const score = (subDimensionScores[highestDomain] as Record<string, number>)[sd] ?? 0;
    if (score > bestSubScore) {
      bestSubScore = score;
      bestSubDim = sd;
    }
  }

  // Find worst sub-dimension in lowest domain
  const lowSubDims = DOMAIN_META[lowestDomain].subDimensions;
  let worstSubDim = lowSubDims[0];
  let worstSubScore = 100;
  for (const sd of lowSubDims) {
    const score = (subDimensionScores[lowestDomain] as Record<string, number>)[sd] ?? 100;
    if (score < worstSubScore) {
      worstSubScore = score;
      worstSubDim = sd;
    }
  }

  return {
    highestDomain,
    bestSubDim,
    bestSubScore,
    lowestDomain,
    worstSubDim,
    worstSubScore,
  };
}

export function generateBlueprint(
  _compositeScore: number,
  tier: RelationshipTier,
  domainScores: DomainScores,
  subDimensionScores: SubDimensionScores,
  patterns: DetectedPattern[],
  _fourHorsemen: FourHorsemenResult | null,
  skipPartner: boolean
): string {
  const extremes = findExtremes(domainScores, subDimensionScores, skipPartner);

  // Select opener variant (deterministic via score values)
  const openers = TIER_OPENERS[tier];
  const variantIdx = (domainScores.family + domainScores.friends) % openers.length;
  const opening = openers[variantIdx];

  const strength = getStrengthParagraph(
    extremes.highestDomain,
    extremes.bestSubDim,
    extremes.bestSubScore,
    domainScores[extremes.highestDomain]
  );

  const growth = getGrowthParagraph(
    extremes.lowestDomain,
    extremes.worstSubDim,
    extremes.worstSubScore,
    domainScores[extremes.lowestDomain]
  );

  const patternText = getPatternParagraph(patterns);
  const closing = getClosing(tier, extremes.lowestDomain, extremes.worstSubDim);

  const paragraphs = [opening, strength, growth];
  if (patternText) paragraphs.push(patternText);
  paragraphs.push(closing);

  return paragraphs.join('\n\n');
}
