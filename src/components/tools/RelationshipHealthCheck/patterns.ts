/**
 * Pattern Detection Engine for Relationship Health Check v2.
 *
 * 10 rules that analyze domain scores, sub-dimension scores, Four Horsemen,
 * and raw answers to identify clinically meaningful relationship patterns.
 *
 * Priority: concern → warning → info
 * Output cap: maximum 4 patterns returned
 */

import type {
  DomainScores,
  SubDimensionScores,
  FourHorsemenResult,
  DetectedPattern,
  PatternSeverity,
  RelationshipDomain,
} from './types';

// ── Pattern rule definitions ────────────────────────────────────────────────

function checkFourHorsemenCritical(
  fourHorsemen: FourHorsemenResult | null
): DetectedPattern | null {
  if (!fourHorsemen || fourHorsemen.overallRisk !== 'elevated') return null;

  const active = [
    fourHorsemen.criticism.present && 'criticism',
    fourHorsemen.contempt.present && 'contempt',
    fourHorsemen.defensiveness.present && 'defensiveness/stonewalling',
  ].filter(Boolean) as string[];

  return {
    key: 'four_horsemen_critical',
    severity: 'concern',
    title: 'Communication Warning Signs Detected',
    description: `Your responses suggest the presence of ${active.join(' and ')} in your relationship — patterns that relationship researcher John Gottman identified as the most destructive communication behaviors.`,
    frameworkRef: 'gottman_horsemen',
    scienceNote:
      'In Gottman\'s longitudinal research, these four patterns — criticism, contempt, defensiveness, and stonewalling — predicted divorce with 93.6% accuracy. The good news: each has a specific, learnable antidote.',
    triggerItems: ['p_cq_01', 'p_cq_02', 'p_ap_02'],
    interventionKeys: ['gottman_softened_startup', 'gottman_appreciation_audit', 'gottman_repair_attempts'],
  };
}

function checkFourHorsemenWarning(
  fourHorsemen: FourHorsemenResult | null
): DetectedPattern | null {
  if (!fourHorsemen || fourHorsemen.overallRisk !== 'moderate') return null;

  return {
    key: 'four_horsemen_warning',
    severity: 'info',
    title: 'Mild Conflict Pattern',
    description:
      'Your conflict patterns show some mild tendencies that, if left unaddressed, could develop into more entrenched negative cycles over time.',
    frameworkRef: 'gottman_horsemen',
    scienceNote:
      'Gottman found that the difference between stable and unstable relationships is not the absence of conflict, but the ratio of positive to negative interactions — stable couples maintain at least 5 positive interactions for every 1 negative.',
    triggerItems: ['p_cq_01', 'p_cq_02', 'p_ap_02'],
    interventionKeys: ['gottman_turning_toward', 'gottman_appreciation_audit'],
  };
}

function checkIntimateIsolation(
  domainScores: DomainScores,
  skipPartner: boolean
): DetectedPattern | null {
  if (skipPartner) return null;
  if (domainScores.partner < 70) return null;
  if (domainScores.friends >= 40 && domainScores.community >= 40) return null;

  return {
    key: 'intimate_isolation',
    severity: 'warning',
    title: 'Strong Partnership, Weaker Wider Network',
    description:
      'Your romantic relationship is a clear strength, but your connections outside the relationship — friends and community — are comparatively weaker. This pattern can create pressure on a single relationship to meet all your social needs.',
    frameworkRef: 'general_social',
    scienceNote:
      'Research shows that over-reliance on a single relationship for all social support increases vulnerability when that relationship faces stress. Diversifying your connection portfolio builds resilience.',
    triggerItems: [],
    interventionKeys: ['friends_reconnection', 'community_micro_belonging', 'friends_vulnerability_ladder'],
  };
}

function checkBroadDisconnection(
  domainScores: DomainScores,
  skipPartner: boolean
): DetectedPattern | null {
  const active = skipPartner
    ? [domainScores.family, domainScores.friends, domainScores.community]
    : [domainScores.partner, domainScores.family, domainScores.friends, domainScores.community];

  if (active.some((s) => s >= 40)) return null;

  return {
    key: 'broad_disconnection',
    severity: 'concern',
    title: 'Disconnection Across Relationships',
    description:
      'Your scores suggest difficulty across multiple relationship areas. This is more common than you might think, and it does not define you — it describes a current state that can change with the right support.',
    frameworkRef: 'general_social',
    scienceNote:
      'Loneliness researcher Julianne Holt-Lunstad found that social disconnection carries health risks comparable to smoking 15 cigarettes per day. But even small steps toward connection — a single meaningful conversation — begin to reverse this.',
    triggerItems: [],
    interventionKeys: ['community_volunteering', 'friends_reconnection', 'general_professional_support'],
  };
}

function checkOverReliance(
  domainScores: DomainScores,
  skipPartner: boolean
): DetectedPattern | null {
  const entries: [RelationshipDomain, number][] = skipPartner
    ? [['family', domainScores.family], ['friends', domainScores.friends], ['community', domainScores.community]]
    : [['partner', domainScores.partner], ['family', domainScores.family], ['friends', domainScores.friends], ['community', domainScores.community]];

  const sorted = entries.sort((a, b) => b[1] - a[1]);
  const highest = sorted[0];
  const others = sorted.slice(1);

  if (highest[1] < 75) return null;
  if (others.some(([, s]) => s >= 45)) return null;

  const domainName = highest[0] === 'partner' ? 'romantic relationship'
    : highest[0] === 'family' ? 'family'
    : highest[0] === 'friends' ? 'friendships'
    : 'community';

  return {
    key: 'over_reliance',
    severity: 'warning',
    title: `Heavy Investment in ${domainName.charAt(0).toUpperCase() + domainName.slice(1)}`,
    description:
      `Your ${domainName} connections are strong, but other relationship areas are significantly weaker. Spreading your social investment across multiple domains creates a more resilient support network.`,
    frameworkRef: 'general_social',
    scienceNote:
      'Research on social support portfolios shows that people with diverse connection sources cope better with stress, transitions, and loss than those who rely primarily on one relationship domain.',
    triggerItems: [],
    interventionKeys: ['general_connection_audit', 'community_micro_belonging'],
  };
}

function checkFamilyEstrangement(
  domainScores: DomainScores,
  skipPartner: boolean
): DetectedPattern | null {
  if (domainScores.family >= 30) return null;

  const others = skipPartner
    ? [domainScores.friends, domainScores.community]
    : [domainScores.partner, domainScores.friends, domainScores.community];

  if (!others.some((s) => s >= 50)) return null;

  return {
    key: 'family_estrangement',
    severity: 'warning',
    title: 'Family Relationships Under Strain',
    description:
      'While your other relationships show strength, your family connections are significantly strained. Family dynamics are complex, and difficulty here is not a reflection of personal failure.',
    frameworkRef: 'prepare_enrich',
    scienceNote:
      'Family therapist Murray Bowen demonstrated that healthy "differentiation of self" — maintaining your identity while staying emotionally connected to family — is key to navigating difficult family dynamics.',
    triggerItems: ['f_es_01', 'f_es_02', 'f_hc_02', 'f_ar_02'],
    interventionKeys: ['family_boundary_script', 'family_differentiation', 'general_professional_support'],
  };
}

function checkSocialWithdrawal(
  domainScores: DomainScores
): DetectedPattern | null {
  if (domainScores.friends >= 35 || domainScores.community >= 35) return null;

  return {
    key: 'social_withdrawal',
    severity: 'warning',
    title: 'Social Withdrawal Pattern',
    description:
      'Both your friendship and community connections are low, suggesting a pattern of social withdrawal. This is often gradual — and equally gradual to reverse, starting with one small step.',
    frameworkRef: 'stafford_canary',
    scienceNote:
      'Stafford & Canary\'s maintenance research shows that relationships require active investment to sustain. Without routine positive interactions, even strong bonds erode over time — but re-engagement can quickly rebuild them.',
    triggerItems: ['fr_cp_01', 'fr_cp_02', 'fr_vt_02', 'c_si_01', 'c_si_02'],
    interventionKeys: ['friends_reconnection', 'community_volunteering', 'community_third_place'],
  };
}

function checkHiddenSelf(
  answers: Record<string, number>,
  skipPartner: boolean
): DetectedPattern | null {
  // Check authenticity-related reverse items across domains
  const hidingItems = [
    { id: 'f_ab_02', threshold: 4 },  // hiding parts of self from family
    { id: 'f_ar_02', threshold: 4 },  // pressure to meet expectations
  ];

  // Add partner contempt item if applicable
  if (!skipPartner) {
    hidingItems.push({ id: 'p_ap_02', threshold: 4 }); // felt dismissed
  }

  const hidingCount = hidingItems.filter(
    (item) => (answers[item.id] ?? 1) >= item.threshold
  ).length;

  if (hidingCount < 2) return null;

  return {
    key: 'hidden_self',
    severity: 'info',
    title: 'Identity Masking Pattern',
    description:
      'Your responses suggest you may be hiding important parts of yourself across multiple relationships. This is often a protective response, but over time it can prevent the deep connection you may be seeking.',
    frameworkRef: 'attachment_ecr',
    scienceNote:
      'Attachment research shows that feeling unable to be authentic in relationships is often rooted in early experiences of conditional acceptance. The intimacy process model (Reis & Shaver) demonstrates that vulnerability — revealing your true self — is the pathway to genuine closeness.',
    triggerItems: hidingItems.map((i) => i.id),
    interventionKeys: ['friends_vulnerability_ladder', 'general_professional_support'],
  };
}

function checkPursueWithdraw(
  subDimensionScores: SubDimensionScores,
  skipPartner: boolean
): DetectedPattern | null {
  if (skipPartner) return null;
  if (subDimensionScores.partner.emotional_responsiveness <= 70) return null;
  if (subDimensionScores.partner.conflict_quality >= 35) return null;

  return {
    key: 'pursue_withdraw',
    severity: 'warning',
    title: 'Pursue-Withdraw Dynamic',
    description:
      'You strongly value emotional connection (high emotional responsiveness), but conflict engagement is very low — suggesting a possible pursue-withdraw cycle where one partner seeks closeness while the other withdraws during disagreement.',
    frameworkRef: 'eft_are',
    scienceNote:
      'EFT therapist Sue Johnson found that the pursue-withdraw cycle is the most common pattern in distressed couples (~70%). It is an attachment dance — the pursuer seeks reassurance, the withdrawer self-protects. Both are driven by the same underlying fear of disconnection.',
    triggerItems: ['p_er_01', 'p_er_02', 'p_cq_01', 'p_cq_02'],
    interventionKeys: ['gottman_stress_reducing', 'gottman_repair_attempts', 'general_professional_support'],
  };
}

function checkDomainDiscrepancy(
  domainScores: DomainScores,
  skipPartner: boolean
): DetectedPattern | null {
  const scores = skipPartner
    ? [domainScores.family, domainScores.friends, domainScores.community]
    : [domainScores.partner, domainScores.family, domainScores.friends, domainScores.community];

  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);

  if (maxScore - minScore < 40) return null;

  return {
    key: 'domain_discrepancy',
    severity: 'info',
    title: 'Uneven Relationship Landscape',
    description:
      `There's a significant gap (${maxScore - minScore} points) between your strongest and weakest relationship areas. This imbalance is worth noticing — strengthening weaker areas can create a more resilient overall support network.`,
    frameworkRef: 'general_social',
    scienceNote:
      'Research on social support diversification shows that people with balanced connection across multiple domains are more resilient to stress and life transitions than those with uneven social portfolios.',
    triggerItems: [],
    interventionKeys: ['general_connection_audit'],
  };
}

// ── Main detection function ─────────────────────────────────────────────────

const SEVERITY_ORDER: Record<PatternSeverity, number> = {
  concern: 0,
  warning: 1,
  info: 2,
};

const MAX_PATTERNS = 4;

/**
 * Run all pattern detection rules and return up to 4 patterns,
 * sorted by severity (concern → warning → info).
 */
export function detectPatterns(
  domainScores: DomainScores,
  subDimensionScores: SubDimensionScores,
  fourHorsemen: FourHorsemenResult | null,
  answers: Record<string, number>,
  skipPartner: boolean
): DetectedPattern[] {
  const candidates: (DetectedPattern | null)[] = [
    checkFourHorsemenCritical(fourHorsemen),
    checkFourHorsemenWarning(fourHorsemen),
    checkBroadDisconnection(domainScores, skipPartner),
    checkPursueWithdraw(subDimensionScores, skipPartner),
    checkIntimateIsolation(domainScores, skipPartner),
    checkOverReliance(domainScores, skipPartner),
    checkFamilyEstrangement(domainScores, skipPartner),
    checkSocialWithdrawal(domainScores),
    checkHiddenSelf(answers, skipPartner),
    checkDomainDiscrepancy(domainScores, skipPartner),
  ];

  const detected = candidates.filter((p): p is DetectedPattern => p !== null);

  // Sort by severity (concern first)
  detected.sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);

  return detected.slice(0, MAX_PATTERNS);
}
