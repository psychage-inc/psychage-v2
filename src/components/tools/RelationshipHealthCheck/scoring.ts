import type {
  RelationshipDomain,
  RelationshipTier,
  DomainScores,
  SubDimensionScores,
  SubDimension,
  FourHorsemenResult,
  RelationshipHealthResult,
} from './types';
import { QUESTIONS, getSubDimensionQuestions } from './questions';
import { SUB_DIMENSION_META } from './types';
import { checkDVSafety, checkSocialIsolation } from './alerts';
import { detectPatterns } from './patterns';
import { generateBlueprint } from './narrative';

const DOMAINS: RelationshipDomain[] = ['partner', 'family', 'friends', 'community'];

// ── Domain scoring (preserved logic) ────────────────────────────────────────

/**
 * Compute the score for a single domain (0–100).
 * Reverse-scored items are inverted (6 - rawValue).
 */
export function computeDomainScore(
  answers: Record<string, number>,
  domain: RelationshipDomain
): number {
  const domainQuestions = QUESTIONS.filter((q) => q.domain === domain);
  if (domainQuestions.length === 0) return 0;

  let total = 0;
  for (const q of domainQuestions) {
    const raw = answers[q.id] ?? 3; // neutral default if somehow missing
    const value = q.reverseScored ? 6 - raw : raw;
    total += value;
  }

  const min = domainQuestions.length; // all 1s
  const max = domainQuestions.length * 5; // all 5s
  return Math.round(((total - min) / (max - min)) * 100);
}

/**
 * Compute all domain scores.
 */
export function computeAllDomainScores(answers: Record<string, number>): DomainScores {
  return {
    partner: computeDomainScore(answers, 'partner'),
    family: computeDomainScore(answers, 'family'),
    friends: computeDomainScore(answers, 'friends'),
    community: computeDomainScore(answers, 'community'),
  };
}

/**
 * Compute the composite score (average of active domains).
 */
export function computeCompositeScore(
  domainScores: DomainScores,
  skipPartner: boolean
): number {
  const activeDomains: RelationshipDomain[] = skipPartner
    ? ['family', 'friends', 'community']
    : DOMAINS;

  const sum = activeDomains.reduce((acc, d) => acc + domainScores[d], 0);
  return Math.round(sum / activeDomains.length);
}

/**
 * Assign a tier based on the composite score.
 */
export function getTier(compositeScore: number): RelationshipTier {
  if (compositeScore >= 80) return 'thriving';
  if (compositeScore >= 60) return 'healthy';
  if (compositeScore >= 40) return 'mixed';
  if (compositeScore >= 20) return 'strained';
  return 'isolated';
}

// ── Sub-dimension scoring (new) ─────────────────────────────────────────────

/**
 * Compute the score for a single sub-dimension (0–100).
 * Each sub-dimension has exactly 2 items.
 */
export function computeSubDimensionScore(
  answers: Record<string, number>,
  subDimension: SubDimension
): number {
  const items = getSubDimensionQuestions(subDimension);
  if (items.length === 0) return 0;

  let total = 0;
  for (const q of items) {
    const raw = answers[q.id] ?? 3;
    const value = q.reverseScored ? 6 - raw : raw;
    total += value;
  }

  const min = items.length; // all 1s
  const max = items.length * 5; // all 5s
  return Math.round(((total - min) / (max - min)) * 100);
}

/**
 * Compute all sub-dimension scores grouped by domain.
 */
export function computeAllSubDimensionScores(
  answers: Record<string, number>
): SubDimensionScores {
  const result: Record<string, Record<string, number>> = {
    partner: {},
    family: {},
    friends: {},
    community: {},
  };

  for (const meta of SUB_DIMENSION_META) {
    result[meta.domain][meta.key] = computeSubDimensionScore(answers, meta.key);
  }

  return result as unknown as SubDimensionScores;
}

// ── Four Horsemen scoring (new, partner only) ───────────────────────────────

/**
 * Compute Four Horsemen risk indicators from partner conflict/appreciation items.
 *
 * Mapping:
 * - Criticism: p_cq_01 (forward) — low score = criticism present
 * - Stonewalling: p_cq_02 (forward) — low score = stonewalling present
 * - Contempt: p_ap_02 (reverse) — high raw = contempt present
 * - Defensiveness: derived from p_cq_02 (shares item with stonewalling)
 *
 * Score interpretation: 1-2 = not detected, 3 = mild, 4-5 = present
 */
export function computeFourHorsemen(
  answers: Record<string, number>
): FourHorsemenResult {
  // Raw values (defaulting to 3 = neutral)
  const criticismRaw = answers['p_cq_01'] ?? 3;
  const stonewallingRaw = answers['p_cq_02'] ?? 3;
  const contemptRaw = answers['p_ap_02'] ?? 3;

  // Transform: for forward-scored items, lower response = higher horseman risk
  const criticismScore = 6 - criticismRaw;
  const stonewallingScore = 6 - stonewallingRaw;
  const contemptScore = contemptRaw; // already reverse in question bank — raw high = contempt
  // Defensiveness shares signal with stonewalling (same item captures both)
  const defensivenessScore = stonewallingScore;

  const scores = [criticismScore, contemptScore, defensivenessScore, stonewallingScore];
  const presentThreshold = 4;
  const mildThreshold = 3;

  const activeCount = scores.filter((s) => s >= presentThreshold).length;
  const mildCount = scores.filter((s) => s >= mildThreshold).length;

  let overallRisk: 'low' | 'moderate' | 'elevated' = 'low';
  if (activeCount > 0 || contemptScore >= presentThreshold) {
    overallRisk = 'elevated';
  } else if (mildCount > 0) {
    overallRisk = 'moderate';
  }

  return {
    criticism: { score: criticismScore, present: criticismScore >= presentThreshold },
    contempt: { score: contemptScore, present: contemptScore >= presentThreshold },
    defensiveness: { score: defensivenessScore, present: defensivenessScore >= presentThreshold },
    stonewalling: { score: stonewallingScore, present: stonewallingScore >= presentThreshold },
    overallRisk,
    activeCount,
  };
}

// ── Full result computation ─────────────────────────────────────────────────

const TIER_LABELS: Record<RelationshipTier, string> = {
  thriving: 'Strong connections across your life',
  healthy: 'Solid foundation with areas to nurture',
  mixed: 'A mixed picture with room to grow',
  strained: 'There are some areas to explore',
  isolated: 'Reaching out could make a real difference',
};

/**
 * Compute the full assessment result from raw answers.
 */
export function computeResult(
  answers: Record<string, number>,
  skipPartner: boolean
): RelationshipHealthResult {
  const domainScores = computeAllDomainScores(answers);
  const subDimensionScores = computeAllSubDimensionScores(answers);
  const compositeScore = computeCompositeScore(domainScores, skipPartner);
  const tier = getTier(compositeScore);

  const fourHorsemen = skipPartner ? null : computeFourHorsemen(answers);

  const dvAlert = skipPartner
    ? { triggered: false, severity: 'warning' as const }
    : checkDVSafety(answers, domainScores.partner, subDimensionScores.partner.trust_safety, fourHorsemen);

  const isolationAlert = checkSocialIsolation(
    compositeScore,
    domainScores,
    skipPartner
  );

  const patterns = detectPatterns(
    domainScores,
    subDimensionScores,
    fourHorsemen,
    answers,
    skipPartner
  );

  const blueprint = generateBlueprint(
    compositeScore,
    tier,
    domainScores,
    subDimensionScores,
    patterns,
    fourHorsemen,
    skipPartner
  );

  return {
    id: crypto.randomUUID(),
    version: 2,
    createdAt: new Date().toISOString(),
    compositeScore,
    domainScores,
    subDimensionScores,
    tier,
    tierLabel: TIER_LABELS[tier],
    skipPartner,
    answers,
    dvAlert,
    isolationAlert,
    patterns,
    fourHorsemen,
    blueprint,
  };
}
