import type { RelationshipQuestion, SubDimension } from './types';

/**
 * 34 clinically-grounded questions across 4 domains and 17 sub-dimensions.
 *
 * Each question maps to a validated clinical framework:
 * - Partner (10): Gottman SRH/Horsemen, EFT ARE, Attachment, Joel et al.
 * - Family (8): Social support, Reis & Shaver, PREPARE/ENRICH, DAS
 * - Friends (8): Reis & Shaver, Equity Theory, Stafford & Canary
 * - Community (8): Social Identity, Social Capital, Self-Determination
 */
export const QUESTIONS: RelationshipQuestion[] = [
  // ── Partner Domain (10 items, 5 sub-dimensions × 2) ────────────────────

  // Emotional Responsiveness — EFT Accessibility, Responsiveness, Engagement
  {
    id: 'p_er_01',
    domain: 'partner',
    subDimension: 'emotional_responsiveness',
    text: 'When I\'m upset, my partner notices and tries to comfort me.',
    reverseScored: false,
    frameworkRef: 'eft_are',
    constructNote: 'Measures partner attunement and emotional responsiveness (EFT ARE model)',
  },
  {
    id: 'p_er_02',
    domain: 'partner',
    subDimension: 'emotional_responsiveness',
    text: 'I can count on my partner to be there when I really need them.',
    reverseScored: false,
    frameworkRef: 'attachment_ecr',
    constructNote: 'Taps attachment security — perceived availability of attachment figure',
  },

  // Conflict Quality — Gottman Four Horsemen antidotes
  {
    id: 'p_cq_01',
    domain: 'partner',
    subDimension: 'conflict_quality',
    text: 'We can disagree without it turning into personal attacks.',
    reverseScored: false,
    frameworkRef: 'gottman_horsemen',
    constructNote: 'Anti-criticism marker — healthy conflict uses "I" statements, not character attacks',
  },
  {
    id: 'p_cq_02',
    domain: 'partner',
    subDimension: 'conflict_quality',
    text: 'During conflict, my partner engages with the issue rather than shutting down or getting defensive.',
    reverseScored: false,
    frameworkRef: 'gottman_horsemen',
    constructNote: 'Anti-stonewalling/defensiveness — measures willingness to stay present during disagreement',
  },

  // Trust & Safety — Gottman trust metric, Joel et al. top predictors
  {
    id: 'p_ts_01',
    domain: 'partner',
    subDimension: 'trust_safety',
    text: 'I trust my partner to be honest with me, even about difficult things.',
    reverseScored: false,
    frameworkRef: 'joel_ml',
    constructNote: 'Trust and honesty — #7 predictor in Joel et al. (2020) ML meta-analysis of 11,196 couples',
  },
  {
    id: 'p_ts_02',
    domain: 'partner',
    subDimension: 'trust_safety',
    text: 'I feel physically and emotionally safe in my relationship.',
    reverseScored: false,
    isDistressItem: true,
    frameworkRef: 'gottman_srh',
    constructNote: 'Core safety — critical distress marker; low scores may indicate DV risk',
  },

  // Appreciation — Gottman Level 2 (Fondness & Admiration) + Contempt horseman
  {
    id: 'p_ap_01',
    domain: 'partner',
    subDimension: 'appreciation',
    text: 'My partner regularly expresses appreciation for who I am.',
    reverseScored: false,
    frameworkRef: 'gottman_srh',
    constructNote: 'Fondness & admiration system — Gottman Level 2; #2 predictor in Joel et al.',
  },
  {
    id: 'p_ap_02',
    domain: 'partner',
    subDimension: 'appreciation',
    text: 'I sometimes feel looked down on or dismissed by my partner.',
    reverseScored: true,
    isDistressItem: true,
    frameworkRef: 'gottman_horsemen',
    constructNote: 'Contempt marker — the single strongest predictor of divorce (Gottman & Levenson, 2000)',
  },

  // Growth & Shared Meaning — Gottman Levels 6–7
  {
    id: 'p_gm_01',
    domain: 'partner',
    subDimension: 'growth_meaning',
    text: 'My partner actively supports my personal goals and dreams.',
    reverseScored: false,
    frameworkRef: 'gottman_srh',
    constructNote: 'Gottman Level 6 — "Make Life Dreams Come True"; supporting partner aspirations',
  },
  {
    id: 'p_gm_02',
    domain: 'partner',
    subDimension: 'growth_meaning',
    text: 'We share a sense of purpose or vision for our life together.',
    reverseScored: false,
    frameworkRef: 'gottman_srh',
    constructNote: 'Gottman Level 7 — "Create Shared Meaning"; shared narratives, rituals, and goals',
  },

  // ── Family Domain (8 items, 4 sub-dimensions × 2) ──────────────────────

  // Emotional Support — Social support theory, Reis & Shaver responsiveness
  {
    id: 'f_es_01',
    domain: 'family',
    subDimension: 'emotional_support',
    text: 'I can turn to my family when I need emotional support.',
    reverseScored: false,
    frameworkRef: 'general_social',
    constructNote: 'Perceived availability of family support — strongest protective factor for mental health',
  },
  {
    id: 'f_es_02',
    domain: 'family',
    subDimension: 'emotional_support',
    text: 'My family responds with care when I\'m going through a hard time.',
    reverseScored: false,
    frameworkRef: 'reis_shaver',
    constructNote: 'Perceived responsiveness — Reis & Shaver model: feeling understood, validated, and cared for',
  },

  // Acceptance & Belonging — Attachment security, authenticity
  {
    id: 'f_ab_01',
    domain: 'family',
    subDimension: 'acceptance_belonging',
    text: 'I feel accepted by my family for who I truly am.',
    reverseScored: false,
    frameworkRef: 'attachment_ecr',
    constructNote: 'Unconditional positive regard within family — foundational for secure attachment',
  },
  {
    id: 'f_ab_02',
    domain: 'family',
    subDimension: 'acceptance_belonging',
    text: 'I feel I have to hide important parts of myself around my family.',
    reverseScored: true,
    frameworkRef: 'attachment_ecr',
    constructNote: 'Authenticity deficit — masking identity suggests conditional acceptance or insecure attachment',
  },

  // Healthy Communication — PREPARE/ENRICH, DAS consensus
  {
    id: 'f_hc_01',
    domain: 'family',
    subDimension: 'healthy_communication',
    text: 'My family can discuss difficult topics without it turning into a fight.',
    reverseScored: false,
    frameworkRef: 'prepare_enrich',
    constructNote: 'Constructive family communication — PREPARE/ENRICH core domain',
  },
  {
    id: 'f_hc_02',
    domain: 'family',
    subDimension: 'healthy_communication',
    text: 'There are unresolved tensions in my family that affect my well-being.',
    reverseScored: true,
    frameworkRef: 'prepare_enrich',
    constructNote: 'Unresolved conflict residue — ongoing tensions erode family cohesion over time',
  },

  // Autonomy & Respect — Differentiation theory, PREPARE/ENRICH
  {
    id: 'f_ar_01',
    domain: 'family',
    subDimension: 'autonomy_respect',
    text: 'My family respects my life choices, even when they disagree.',
    reverseScored: false,
    frameworkRef: 'prepare_enrich',
    constructNote: 'Differentiation of self — healthy families support autonomy within connection',
  },
  {
    id: 'f_ar_02',
    domain: 'family',
    subDimension: 'autonomy_respect',
    text: 'I feel pressure from my family to live up to their expectations rather than my own.',
    reverseScored: true,
    frameworkRef: 'prepare_enrich',
    constructNote: 'Boundary violation — enmeshment or over-control patterns in family systems',
  },

  // ── Friends Domain (8 items, 4 sub-dimensions × 2) ─────────────────────

  // Depth & Authenticity — Reis & Shaver intimacy process
  {
    id: 'fr_da_01',
    domain: 'friends',
    subDimension: 'depth_authenticity',
    text: 'I have at least one friend I can be completely honest with.',
    reverseScored: false,
    frameworkRef: 'reis_shaver',
    constructNote: 'Self-disclosure capacity — foundational to Reis & Shaver intimacy process model',
  },
  {
    id: 'fr_da_02',
    domain: 'friends',
    subDimension: 'depth_authenticity',
    text: 'My closest friendships go beyond surface-level conversation.',
    reverseScored: false,
    frameworkRef: 'reis_shaver',
    constructNote: 'Emotional depth — meaningful intimacy requires disclosure beyond factual exchange',
  },

  // Reciprocity & Balance — Equity theory, Stafford & Canary
  {
    id: 'fr_rb_01',
    domain: 'friends',
    subDimension: 'reciprocity_balance',
    text: 'My friendships feel balanced — not mostly one-sided.',
    reverseScored: false,
    frameworkRef: 'equity_theory',
    constructNote: 'Equity perception — both over-benefited and under-benefited partners report lower satisfaction',
  },
  {
    id: 'fr_rb_02',
    domain: 'friends',
    subDimension: 'reciprocity_balance',
    text: 'I feel comfortable asking friends for help when I need it.',
    reverseScored: false,
    frameworkRef: 'stafford_canary',
    constructNote: 'Support-seeking willingness — Stafford & Canary maintenance behavior (networks)',
  },

  // Connection & Presence — Maintenance behaviors
  {
    id: 'fr_cp_01',
    domain: 'friends',
    subDimension: 'connection_presence',
    text: 'I regularly spend meaningful time with friends.',
    reverseScored: false,
    frameworkRef: 'stafford_canary',
    constructNote: 'Routine maintenance — regular positive interactions sustain relationship quality',
  },
  {
    id: 'fr_cp_02',
    domain: 'friends',
    subDimension: 'connection_presence',
    text: 'I often wish I had more close friendships.',
    reverseScored: true,
    frameworkRef: 'general_social',
    constructNote: 'Connection deficit — perceived gap between desired and actual social connection',
  },

  // Vulnerability & Trust — Reis & Shaver, maintenance
  {
    id: 'fr_vt_01',
    domain: 'friends',
    subDimension: 'vulnerability_trust',
    text: 'I can share difficult feelings with friends without fear of judgment.',
    reverseScored: false,
    frameworkRef: 'reis_shaver',
    constructNote: 'Emotional disclosure — being vulnerable deepens intimacy when met with responsiveness',
  },
  {
    id: 'fr_vt_02',
    domain: 'friends',
    subDimension: 'vulnerability_trust',
    text: 'I feel I\'ve drifted apart from people I used to be close to.',
    reverseScored: true,
    frameworkRef: 'stafford_canary',
    constructNote: 'Relationship erosion — absence of maintenance behaviors leads to gradual disconnection',
  },

  // ── Community Domain (8 items, 4 sub-dimensions × 2) ───────────────────

  // Belonging & Identity — Social identity theory
  {
    id: 'c_bi_01',
    domain: 'community',
    subDimension: 'belonging_identity',
    text: 'I feel a genuine sense of belonging in my neighborhood or community.',
    reverseScored: false,
    frameworkRef: 'general_social',
    constructNote: 'Social belonging — fundamental human need; absence is a major risk factor for depression',
  },
  {
    id: 'c_bi_02',
    domain: 'community',
    subDimension: 'belonging_identity',
    text: 'I feel valued and respected in my workplace or school.',
    reverseScored: false,
    frameworkRef: 'joel_ml',
    constructNote: 'Social recognition — feeling valued in daily environments contributes to overall well-being',
  },

  // Active Engagement — Social capital theory
  {
    id: 'c_ae_01',
    domain: 'community',
    subDimension: 'active_engagement',
    text: 'I participate in group activities or organizations that matter to me.',
    reverseScored: false,
    frameworkRef: 'general_social',
    constructNote: 'Bridging social capital — group participation creates diverse connection networks',
  },
  {
    id: 'c_ae_02',
    domain: 'community',
    subDimension: 'active_engagement',
    text: 'I have positive relationships with people I interact with regularly.',
    reverseScored: false,
    frameworkRef: 'stafford_canary',
    constructNote: 'Routine positive interactions — Stafford & Canary positivity maintenance behavior',
  },

  // Social Integration — Social isolation risk
  {
    id: 'c_si_01',
    domain: 'community',
    subDimension: 'social_integration',
    text: 'I feel disconnected from the people in my daily environment.',
    reverseScored: true,
    frameworkRef: 'general_social',
    constructNote: 'Perceived disconnection — subjective isolation is a stronger predictor than objective isolation',
  },
  {
    id: 'c_si_02',
    domain: 'community',
    subDimension: 'social_integration',
    text: 'I rarely interact with my neighbors or local community.',
    reverseScored: true,
    frameworkRef: 'general_social',
    constructNote: 'Social withdrawal — reduced community interaction signals isolation risk',
  },

  // Purpose & Contribution — Self-determination theory
  {
    id: 'c_pc_01',
    domain: 'community',
    subDimension: 'purpose_contribution',
    text: 'I feel I contribute something meaningful to my community or groups.',
    reverseScored: false,
    frameworkRef: 'general_social',
    constructNote: 'Meaningful contribution — sense of mattering and purpose within social groups',
  },
  {
    id: 'c_pc_02',
    domain: 'community',
    subDimension: 'purpose_contribution',
    text: 'Being part of a group or organization gives me a sense of purpose.',
    reverseScored: false,
    frameworkRef: 'general_social',
    constructNote: 'Group-derived purpose — self-determination theory: relatedness as core psychological need',
  },
];

/** Get questions filtered by whether user has a partner */
export function getActiveQuestions(skipPartner: boolean): RelationshipQuestion[] {
  if (skipPartner) {
    return QUESTIONS.filter((q) => q.domain !== 'partner');
  }
  return QUESTIONS;
}

/** Get questions for a specific domain */
export function getDomainQuestions(domain: string): RelationshipQuestion[] {
  return QUESTIONS.filter((q) => q.domain === domain);
}

/** Get questions for a specific sub-dimension */
export function getSubDimensionQuestions(subDimension: SubDimension): RelationshipQuestion[] {
  return QUESTIONS.filter((q) => q.subDimension === subDimension);
}
