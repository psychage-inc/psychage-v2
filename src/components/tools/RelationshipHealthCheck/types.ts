export type RelationshipDomain = 'partner' | 'family' | 'friends' | 'community';

export type RelationshipTier = 'thriving' | 'healthy' | 'mixed' | 'strained' | 'isolated';

export interface RelationshipQuestion {
  id: string;
  domain: RelationshipDomain;
  text: string;
  reverseScored: boolean;
  /** Marks distress items used for DV safety check */
  isDistressItem?: boolean;
}

export interface LikertOption {
  value: number;
  label: string;
}

export interface DomainScores {
  partner: number;
  family: number;
  friends: number;
  community: number;
}

export interface RelationshipHealthResult {
  id: string;
  createdAt: string;
  compositeScore: number;
  domainScores: DomainScores;
  tier: RelationshipTier;
  tierLabel: string;
  skipPartner: boolean;
  answers: Record<string, number>;
  dvAlert: { triggered: boolean; severity: 'warning' | 'critical' };
  lonelinessAlert: boolean;
}

export interface RelationshipHistoryItem {
  id: string;
  date: string;
  compositeScore: number;
  domainScores: DomainScores;
  tier: RelationshipTier;
  skipPartner: boolean;
}

export const LIKERT_OPTIONS: LikertOption[] = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

export const DOMAIN_META: Record<
  RelationshipDomain,
  { name: string; color: string; bgColor: string; textColor: string; description: string }
> = {
  partner: {
    name: 'Romantic Partner',
    color: 'rose',
    bgColor: 'bg-rose-100',
    textColor: 'text-rose-600',
    description: 'Trust, communication, and safety in your romantic relationship',
  },
  family: {
    name: 'Family',
    color: 'indigo',
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-600',
    description: 'Support, understanding, and connection within your family',
  },
  friends: {
    name: 'Friends',
    color: 'amber',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-600',
    description: 'Quality, reciprocity, and depth of friendships',
  },
  community: {
    name: 'Community',
    color: 'teal',
    bgColor: 'bg-teal-100',
    textColor: 'text-teal-600',
    description: 'Belonging, participation, and social integration',
  },
};

export const TIER_META: Record<RelationshipTier, { label: string; color: string }> = {
  thriving: { label: 'Strong connections across your life', color: 'text-emerald-600' },
  healthy: { label: 'Solid foundation with areas to nurture', color: 'text-teal-600' },
  mixed: { label: 'A mixed picture with room to grow', color: 'text-amber-600' },
  strained: { label: 'There are some areas to explore', color: 'text-orange-600' },
  isolated: { label: 'Reaching out could make a real difference', color: 'text-rose-600' },
};
