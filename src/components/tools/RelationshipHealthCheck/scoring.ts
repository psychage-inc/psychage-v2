import type {
  RelationshipDomain,
  RelationshipTier,
  DomainScores,
  RelationshipHealthResult,
} from './types';
import { QUESTIONS } from './questions';
import { checkDVSafety, checkSevereLoneliness } from './alerts';

const DOMAINS: RelationshipDomain[] = ['partner', 'family', 'friends', 'community'];

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

/**
 * Compute the full assessment result from raw answers.
 */
export function computeResult(
  answers: Record<string, number>,
  skipPartner: boolean
): RelationshipHealthResult {
  const domainScores = computeAllDomainScores(answers);
  const compositeScore = computeCompositeScore(domainScores, skipPartner);
  const tier = getTier(compositeScore);
  const dvAlert = skipPartner
    ? { triggered: false, severity: 'warning' as const }
    : checkDVSafety(answers, domainScores.partner);
  const lonelinessAlert = checkSevereLoneliness(compositeScore);

  const tierLabels: Record<RelationshipTier, string> = {
    thriving: 'Strong connections across your life',
    healthy: 'Solid foundation with areas to nurture',
    mixed: 'A mixed picture with room to grow',
    strained: 'There are some areas to explore',
    isolated: 'Reaching out could make a real difference',
  };

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    compositeScore,
    domainScores,
    tier,
    tierLabel: tierLabels[tier],
    skipPartner,
    answers,
    dvAlert,
    lonelinessAlert,
  };
}
