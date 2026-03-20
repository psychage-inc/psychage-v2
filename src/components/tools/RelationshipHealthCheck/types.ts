// ── Core domain types ───────────────────────────────────────────────────────
export type RelationshipDomain = 'partner' | 'family' | 'friends' | 'community';

export type RelationshipTier = 'thriving' | 'healthy' | 'mixed' | 'strained' | 'isolated';

// ── Sub-dimension keys (2 items each) ───────────────────────────────────────
export type PartnerSubDimension =
  | 'emotional_responsiveness'
  | 'conflict_quality'
  | 'trust_safety'
  | 'appreciation'
  | 'growth_meaning';

export type FamilySubDimension =
  | 'emotional_support'
  | 'acceptance_belonging'
  | 'healthy_communication'
  | 'autonomy_respect';

export type FriendsSubDimension =
  | 'depth_authenticity'
  | 'reciprocity_balance'
  | 'connection_presence'
  | 'vulnerability_trust';

export type CommunitySubDimension =
  | 'belonging_identity'
  | 'active_engagement'
  | 'social_integration'
  | 'purpose_contribution';

export type SubDimension =
  | PartnerSubDimension
  | FamilySubDimension
  | FriendsSubDimension
  | CommunitySubDimension;

// ── Clinical framework keys ─────────────────────────────────────────────────
export type FrameworkKey =
  | 'gottman_srh'
  | 'gottman_horsemen'
  | 'eft_are'
  | 'attachment_ecr'
  | 'reis_shaver'
  | 'equity_theory'
  | 'joel_ml'
  | 'stafford_canary'
  | 'prepare_enrich'
  | 'general_social';

// ── Question interface ──────────────────────────────────────────────────────
export interface RelationshipQuestion {
  id: string;
  domain: RelationshipDomain;
  subDimension: SubDimension;
  text: string;
  reverseScored: boolean;
  isDistressItem?: boolean;
  /** Clinical framework this item is grounded in */
  frameworkRef: FrameworkKey;
  /** Short note on what construct this item taps */
  constructNote: string;
}

// ── Likert scale ────────────────────────────────────────────────────────────
export interface LikertOption {
  value: number;
  label: string;
}

export const LIKERT_OPTIONS: LikertOption[] = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

// ── Domain scores ───────────────────────────────────────────────────────────
export interface DomainScores {
  partner: number;
  family: number;
  friends: number;
  community: number;
}

// ── Sub-dimension scores ────────────────────────────────────────────────────
export type PartnerSubScores = Record<PartnerSubDimension, number>;
export type FamilySubScores = Record<FamilySubDimension, number>;
export type FriendsSubScores = Record<FriendsSubDimension, number>;
export type CommunitySubScores = Record<CommunitySubDimension, number>;

export interface SubDimensionScores {
  partner: PartnerSubScores;
  family: FamilySubScores;
  friends: FriendsSubScores;
  community: CommunitySubScores;
}

// ── Sub-dimension metadata ──────────────────────────────────────────────────
export interface SubDimensionMeta {
  key: SubDimension;
  name: string;
  domain: RelationshipDomain;
  description: string;
  frameworkRef: FrameworkKey;
}

export const SUB_DIMENSION_META: SubDimensionMeta[] = [
  // Partner
  { key: 'emotional_responsiveness', name: 'Emotional Responsiveness', domain: 'partner', description: 'How attuned and responsive your partner is to your emotional needs', frameworkRef: 'eft_are' },
  { key: 'conflict_quality', name: 'Conflict Quality', domain: 'partner', description: 'How constructively you navigate disagreements together', frameworkRef: 'gottman_horsemen' },
  { key: 'trust_safety', name: 'Trust & Safety', domain: 'partner', description: 'The foundation of honesty and feeling safe in your relationship', frameworkRef: 'gottman_srh' },
  { key: 'appreciation', name: 'Appreciation', domain: 'partner', description: 'Mutual respect, fondness, and expressed gratitude', frameworkRef: 'gottman_srh' },
  { key: 'growth_meaning', name: 'Growth & Shared Meaning', domain: 'partner', description: 'Supporting each other\'s dreams and building a shared life vision', frameworkRef: 'gottman_srh' },
  // Family
  { key: 'emotional_support', name: 'Emotional Support', domain: 'family', description: 'How available and responsive your family is during difficult times', frameworkRef: 'general_social' },
  { key: 'acceptance_belonging', name: 'Acceptance & Belonging', domain: 'family', description: 'Feeling accepted for who you truly are within your family', frameworkRef: 'attachment_ecr' },
  { key: 'healthy_communication', name: 'Healthy Communication', domain: 'family', description: 'The ability to discuss difficult topics constructively', frameworkRef: 'prepare_enrich' },
  { key: 'autonomy_respect', name: 'Autonomy & Respect', domain: 'family', description: 'Having your independence and life choices respected', frameworkRef: 'prepare_enrich' },
  // Friends
  { key: 'depth_authenticity', name: 'Depth & Authenticity', domain: 'friends', description: 'How genuine and emotionally deep your friendships are', frameworkRef: 'reis_shaver' },
  { key: 'reciprocity_balance', name: 'Reciprocity & Balance', domain: 'friends', description: 'The give-and-take balance in your friendships', frameworkRef: 'equity_theory' },
  { key: 'connection_presence', name: 'Connection & Presence', domain: 'friends', description: 'How regularly you engage in meaningful time with friends', frameworkRef: 'stafford_canary' },
  { key: 'vulnerability_trust', name: 'Vulnerability & Trust', domain: 'friends', description: 'Your ability to be open and vulnerable with friends', frameworkRef: 'reis_shaver' },
  // Community
  { key: 'belonging_identity', name: 'Belonging & Identity', domain: 'community', description: 'Your sense of belonging and being valued in your community', frameworkRef: 'general_social' },
  { key: 'active_engagement', name: 'Active Engagement', domain: 'community', description: 'Your participation in groups and regular social interactions', frameworkRef: 'stafford_canary' },
  { key: 'social_integration', name: 'Social Integration', domain: 'community', description: 'How connected you feel to the people in your daily environment', frameworkRef: 'general_social' },
  { key: 'purpose_contribution', name: 'Purpose & Contribution', domain: 'community', description: 'Feeling that you contribute meaningfully and have purpose in groups', frameworkRef: 'general_social' },
];

// ── Domain metadata ─────────────────────────────────────────────────────────
export const DOMAIN_META: Record<
  RelationshipDomain,
  {
    name: string;
    color: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
    description: string;
    subDimensions: SubDimension[];
  }
> = {
  partner: {
    name: 'Romantic Partner',
    color: 'rose',
    bgColor: 'bg-rose-100',
    textColor: 'text-rose-600',
    borderColor: 'border-rose-200',
    description: 'Emotional responsiveness, conflict quality, trust, appreciation, and shared growth in your romantic relationship',
    subDimensions: ['emotional_responsiveness', 'conflict_quality', 'trust_safety', 'appreciation', 'growth_meaning'],
  },
  family: {
    name: 'Family',
    color: 'indigo',
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-600',
    borderColor: 'border-indigo-200',
    description: 'Emotional support, acceptance, communication, and autonomy within your family',
    subDimensions: ['emotional_support', 'acceptance_belonging', 'healthy_communication', 'autonomy_respect'],
  },
  friends: {
    name: 'Friends',
    color: 'amber',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-200',
    description: 'Depth, reciprocity, presence, and vulnerability in your friendships',
    subDimensions: ['depth_authenticity', 'reciprocity_balance', 'connection_presence', 'vulnerability_trust'],
  },
  community: {
    name: 'Community',
    color: 'teal',
    bgColor: 'bg-teal-100',
    textColor: 'text-teal-600',
    borderColor: 'border-teal-200',
    description: 'Belonging, engagement, social integration, and purpose within your broader community',
    subDimensions: ['belonging_identity', 'active_engagement', 'social_integration', 'purpose_contribution'],
  },
};

// ── Tier metadata ───────────────────────────────────────────────────────────
export const TIER_META: Record<RelationshipTier, { label: string; color: string }> = {
  thriving: { label: 'Strong connections across your life', color: 'text-emerald-600' },
  healthy: { label: 'Solid foundation with areas to nurture', color: 'text-teal-600' },
  mixed: { label: 'A mixed picture with room to grow', color: 'text-amber-600' },
  strained: { label: 'There are some areas to explore', color: 'text-orange-600' },
  isolated: { label: 'Reaching out could make a real difference', color: 'text-rose-600' },
};

// ── Pattern types ───────────────────────────────────────────────────────────
export type PatternKey =
  | 'four_horsemen_critical'
  | 'four_horsemen_warning'
  | 'intimate_isolation'
  | 'broad_disconnection'
  | 'over_reliance'
  | 'family_estrangement'
  | 'social_withdrawal'
  | 'hidden_self'
  | 'pursue_withdraw'
  | 'domain_discrepancy';

export type PatternSeverity = 'info' | 'warning' | 'concern';

export interface DetectedPattern {
  key: PatternKey;
  severity: PatternSeverity;
  title: string;
  description: string;
  frameworkRef: FrameworkKey;
  scienceNote: string;
  triggerItems: string[];
  interventionKeys: string[];
}

// ── Four Horsemen ───────────────────────────────────────────────────────────
export type HorsemanKey = 'criticism' | 'contempt' | 'defensiveness' | 'stonewalling';

export interface FourHorsemenResult {
  criticism: { score: number; present: boolean };
  contempt: { score: number; present: boolean };
  defensiveness: { score: number; present: boolean };
  stonewalling: { score: number; present: boolean };
  overallRisk: 'low' | 'moderate' | 'elevated';
  activeCount: number;
}

// ── Intervention library types ──────────────────────────────────────────────
export interface Intervention {
  id: string;
  title: string;
  description: string;
  frameworkRef: FrameworkKey;
  citation: string;
  domain: RelationshipDomain | 'general';
  difficulty: 'easy' | 'moderate' | 'challenging';
  timeEstimate: string;
  steps: string[];
}

// ── DV / Safety alert types ─────────────────────────────────────────────────
export interface DVAlertResult {
  triggered: boolean;
  severity: 'warning' | 'critical';
}

export interface IsolationAlertResult {
  triggered: boolean;
  severity: 'moderate' | 'severe';
}

// ── Result types ────────────────────────────────────────────────────────────
export interface RelationshipHealthResult {
  id: string;
  version: 2;
  createdAt: string;
  compositeScore: number;
  domainScores: DomainScores;
  subDimensionScores: SubDimensionScores;
  tier: RelationshipTier;
  tierLabel: string;
  skipPartner: boolean;
  answers: Record<string, number>;
  dvAlert: DVAlertResult;
  isolationAlert: IsolationAlertResult;
  patterns: DetectedPattern[];
  fourHorsemen: FourHorsemenResult | null;
  blueprint: string;
}

export interface RelationshipHistoryItem {
  id: string;
  version: 2;
  date: string;
  compositeScore: number;
  domainScores: DomainScores;
  subDimensionScores: SubDimensionScores;
  tier: RelationshipTier;
  skipPartner: boolean;
  patternKeys: PatternKey[];
}
