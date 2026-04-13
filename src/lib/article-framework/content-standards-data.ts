/**
 * User-facing transforms of PEAF constants for the Content Standards page.
 * This file keeps the page component clean by providing display-ready objects.
 */

import { SOURCE_TIERS, QUALITY_GATE, ARTICLE_TEMPLATES, SENSITIVITY_TERMS, BLOCKED_SOURCE_DOMAINS } from './constants';
import type { SourceTier, ArticleType } from './types';

export interface TierCard {
  tier: SourceTier;
  label: string;
  color: string;
  description: string;
  examples: string;
  requirement: string;
}

export const tierCards: TierCard[] = [
  {
    tier: 1,
    ...SOURCE_TIERS[1],
    examples: 'Nature, JAMA Psychiatry, The Lancet Psychiatry, Molecular Psychiatry',
    requirement: `At least ${QUALITY_GATE.MIN_TIER1_PCT}% of every article's sources`,
  },
  {
    tier: 2,
    ...SOURCE_TIERS[2],
    examples: 'National Institute of Mental Health, WHO, CDC, SAMHSA',
    requirement: `Combined with Tier 1: at least ${QUALITY_GATE.MIN_TIER1_2_PCT}% of sources`,
  },
  {
    tier: 3,
    ...SOURCE_TIERS[3],
    examples: 'American Psychiatric Association, American Psychological Association, NAMI',
    requirement: 'Supplements peer-reviewed and government sources',
  },
  {
    tier: 4,
    ...SOURCE_TIERS[4],
    examples: 'DSM-5-TR, ICD-11, Cochrane Reviews, clinical practice guidelines',
    requirement: 'Used for diagnostic criteria and treatment protocols',
  },
  {
    tier: 5,
    ...SOURCE_TIERS[5],
    examples: 'Mayo Clinic, textbooks, educational reference materials',
    requirement: `Maximum ${QUALITY_GATE.MAX_TIER5_PCT}% of any article's sources`,
  },
];

export interface QualityCheck {
  name: string;
  description: string;
  blocking: boolean;
}

export const qualityChecks: QualityCheck[] = [
  { name: 'Peer-Reviewed Minimum', description: `At least ${QUALITY_GATE.MIN_TIER1_PCT}% of citations must come from peer-reviewed journals`, blocking: true },
  { name: 'Evidence Base', description: `Combined Tier 1 + 2 sources must reach ${QUALITY_GATE.MIN_TIER1_2_PCT}%`, blocking: true },
  { name: 'Reference Cap', description: `Educational and reference sources limited to ${QUALITY_GATE.MAX_TIER5_PCT}% maximum`, blocking: true },
  { name: 'Citation Count', description: 'Each article must cite between 5 and 12 sources depending on type', blocking: true },
  { name: 'Recency', description: `At least ${QUALITY_GATE.MIN_RECENT_PCT}% of sources published within the last ${QUALITY_GATE.RECENCY_YEARS} years`, blocking: false },
  { name: 'Required Sections', description: 'Every article must include all sections required by its type', blocking: true },
  { name: 'Readability', description: `Written at or below an 8th-grade reading level so anyone can understand it`, blocking: true },
  { name: 'Medical Disclaimer', description: 'Articles about conditions and treatments must include a medical disclaimer', blocking: true },
  { name: 'Author Attribution', description: 'Every article must have an attributed author with credentials', blocking: true },
  { name: 'Inclusive Language', description: 'Flagged terms are replaced with person-first, strength-based alternatives', blocking: false },
  { name: 'Blocked Sources', description: 'Prevents citations from unreliable or ad-supported health sites', blocking: true },
];

export interface BlockedSourceGroup {
  category: string;
  reason: string;
  domains: string[];
}

export const blockedSourceGroups: BlockedSourceGroup[] = [
  {
    category: 'User-Generated Content',
    reason: 'Anyone can post — no editorial review or clinical vetting',
    domains: BLOCKED_SOURCE_DOMAINS.filter((d) =>
      ['wikipedia.org', 'reddit.com', 'quora.com', 'medium.com'].includes(d)
    ),
  },
  {
    category: 'Ad-Supported Health Sites',
    reason: 'Revenue model incentivizes engagement over accuracy',
    domains: BLOCKED_SOURCE_DOMAINS.filter((d) =>
      ['webmd.com', 'healthline.com', 'verywellmind.com', 'medicalnewstoday.com', 'psychologytoday.com'].includes(d)
    ),
  },
  {
    category: 'Social Media',
    reason: 'No editorial oversight, optimized for virality not accuracy',
    domains: BLOCKED_SOURCE_DOMAINS.filter((d) =>
      ['facebook.com', 'twitter.com', 'x.com', 'instagram.com', 'tiktok.com'].includes(d)
    ),
  },
];

export interface SensitivityExample {
  before: string;
  after: string;
}

export const sensitivityExamples: SensitivityExample[] = [
  { before: SENSITIVITY_TERMS[0].term, after: SENSITIVITY_TERMS[0].suggestion },
  { before: SENSITIVITY_TERMS[9].term, after: SENSITIVITY_TERMS[9].suggestion },
  { before: SENSITIVITY_TERMS[16].term, after: SENSITIVITY_TERMS[16].suggestion },
  { before: SENSITIVITY_TERMS[22].term, after: SENSITIVITY_TERMS[22].suggestion },
  { before: SENSITIVITY_TERMS[25].term, after: SENSITIVITY_TERMS[25].suggestion },
  { before: SENSITIVITY_TERMS[28].term, after: SENSITIVITY_TERMS[28].suggestion },
];

export interface ArticleTypeCard {
  type: ArticleType;
  label: string;
  description: string;
  minCitations: number;
  minWords: number;
  sectionCount: number;
}

export const articleTypeCards: ArticleTypeCard[] = (Object.keys(ARTICLE_TEMPLATES) as ArticleType[]).map((key) => {
  const t = ARTICLE_TEMPLATES[key];
  return {
    type: t.type,
    label: t.label,
    description: t.description,
    minCitations: t.minCitations,
    minWords: t.minWordCount,
    sectionCount: t.requiredSections.length,
  };
});

export const reviewSteps = [
  { label: 'Draft', description: 'Author creates the article following the required template' },
  { label: 'Quality Gate', description: 'Automated 11-point check validates sources, readability, and structure' },
  { label: 'Editorial Review', description: 'Editor reviews for accuracy, tone, and inclusive language' },
  { label: 'Clinical Review', description: 'For sensitive topics, a clinical reviewer verifies medical accuracy' },
  { label: 'Published', description: 'Article goes live with full citations and medical disclaimers' },
];
