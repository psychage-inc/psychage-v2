// ============================================================================
// Psychage Evidence-Based Article Framework (PEAF) — Constants
// ============================================================================

import type { ArticleTemplate, ArticleType, ExpandedSourceType, SourceTier } from './types';

// ---------------------------------------------------------------------------
// Source Tier Definitions
// ---------------------------------------------------------------------------

export const SOURCE_TIERS: Record<SourceTier, { label: string; color: string; description: string }> = {
  1: { label: 'Peer-Reviewed Research', color: 'amber', description: 'Peer-reviewed journals, meta-analyses, systematic reviews' },
  2: { label: 'Government / Institutional', color: 'blue', description: 'NIMH, NIH, WHO, CDC, SAMHSA' },
  3: { label: 'Professional Organizations', color: 'teal', description: 'APA (Psychiatric/Psychological), NAMI, MHA' },
  4: { label: 'Clinical Guidelines', color: 'purple', description: 'DSM-5-TR, ICD-11, Cochrane, practice guidelines' },
  5: { label: 'Educational / Reference', color: 'gray', description: 'Mayo Clinic, textbooks, reference works' },
};

export const SOURCE_TYPE_TO_TIER: Record<ExpandedSourceType, SourceTier> = {
  // Tier 1
  peer_reviewed_journal: 1,
  meta_analysis: 1,
  systematic_review: 1,
  // Tier 2
  nimh: 2,
  nih: 2,
  who: 2,
  cdc: 2,
  samhsa: 2,
  // Tier 3
  apa_psychiatric: 3,
  apa_psychological: 3,
  nami: 3,
  mha: 3,
  // Tier 4
  dsm: 4,
  icd: 4,
  cochrane: 4,
  clinical_guideline: 4,
  // Tier 5
  mayo_clinic: 5,
  textbook: 5,
  reference: 5,
};

/** Maps the legacy SanityCitation.sourceType to the expanded type */
export const LEGACY_SOURCE_TYPE_MAP: Record<string, ExpandedSourceType> = {
  WHO: 'who',
  CDC: 'cdc',
  APA: 'apa_psychiatric',
  NIMH: 'nimh',
  PeerReviewed: 'peer_reviewed_journal',
  Book: 'textbook',
};

export const EXPANDED_SOURCE_TYPES: { label: string; value: ExpandedSourceType; tier: SourceTier }[] = [
  // Tier 1
  { label: 'Peer-Reviewed Journal', value: 'peer_reviewed_journal', tier: 1 },
  { label: 'Meta-Analysis', value: 'meta_analysis', tier: 1 },
  { label: 'Systematic Review', value: 'systematic_review', tier: 1 },
  // Tier 2
  { label: 'NIMH', value: 'nimh', tier: 2 },
  { label: 'NIH', value: 'nih', tier: 2 },
  { label: 'WHO', value: 'who', tier: 2 },
  { label: 'CDC', value: 'cdc', tier: 2 },
  { label: 'SAMHSA', value: 'samhsa', tier: 2 },
  // Tier 3
  { label: 'APA (Psychiatric)', value: 'apa_psychiatric', tier: 3 },
  { label: 'APA (Psychological)', value: 'apa_psychological', tier: 3 },
  { label: 'NAMI', value: 'nami', tier: 3 },
  { label: 'MHA', value: 'mha', tier: 3 },
  // Tier 4
  { label: 'DSM-5-TR', value: 'dsm', tier: 4 },
  { label: 'ICD-11', value: 'icd', tier: 4 },
  { label: 'Cochrane Review', value: 'cochrane', tier: 4 },
  { label: 'Clinical Guideline', value: 'clinical_guideline', tier: 4 },
  // Tier 5
  { label: 'Mayo Clinic', value: 'mayo_clinic', tier: 5 },
  { label: 'Textbook', value: 'textbook', tier: 5 },
  { label: 'Reference', value: 'reference', tier: 5 },
];

// ---------------------------------------------------------------------------
// Article Templates
// ---------------------------------------------------------------------------

export const ARTICLE_TEMPLATES: Record<ArticleType, ArticleTemplate> = {
  condition_deep_dive: {
    type: 'condition_deep_dive',
    label: 'Condition Deep-Dive',
    description: 'Comprehensive guide to a mental health condition — symptoms, causes, diagnosis, treatment, and daily living.',
    requiredSections: [
      'Overview',
      'Signs & Symptoms',
      'Causes & Risk Factors',
      'Diagnosis',
      'Treatment Options',
      'Living With',
      'When to Seek Help',
      'References',
    ],
    minCitations: 12,
    minWordCount: 2000,
    requiresCrisisDisclaimer: false,
    requiresClinicalReview: false,
    linkedResourceTypes: ['condition', 'crisis'],
  },
  treatment_guide: {
    type: 'treatment_guide',
    label: 'Treatment & Therapy Guide',
    description: 'Evidence-based explanation of a treatment modality — how it works, effectiveness data, and what to expect.',
    requiredSections: [
      'What Is',
      'How It Works',
      'What to Expect',
      'Effectiveness',
      'Who It\'s For',
      'Finding a Provider',
      'References',
    ],
    minCitations: 10,
    minWordCount: 1500,
    requiresCrisisDisclaimer: false,
    requiresClinicalReview: false,
    linkedResourceTypes: ['condition', 'provider'],
  },
  research_digest: {
    type: 'research_digest',
    label: 'Research Digest',
    description: 'Plain-language breakdown of a recent study — key finding, methodology, implications, and limitations.',
    requiredSections: [
      'Key Finding',
      'Study Details',
      'What This Means',
      'Limitations',
      'What\'s Next',
      'References',
    ],
    minCitations: 5,
    minWordCount: 800,
    requiresCrisisDisclaimer: false,
    requiresClinicalReview: false,
    linkedResourceTypes: ['condition'],
  },
  self_help: {
    type: 'self_help',
    label: 'Self-Help & Coping',
    description: 'Actionable, evidence-backed strategies for managing symptoms or improving wellbeing.',
    requiredSections: [
      'Understanding the Challenge',
      'Evidence-Based Strategies',
      'How to Get Started',
      'When Self-Help Isn\'t Enough',
      'References',
    ],
    minCitations: 8,
    minWordCount: 1200,
    requiresCrisisDisclaimer: false,
    requiresClinicalReview: false,
    linkedResourceTypes: ['condition', 'tool'],
  },
  crisis_safety: {
    type: 'crisis_safety',
    label: 'Crisis & Safety',
    description: 'Urgent mental health content — recognizing crises, immediate steps, hotlines, and safety planning.',
    requiredSections: [
      'Recognizing the Signs',
      'Immediate Steps',
      'Resources',
      'Supporting Someone',
      'Long-Term Safety Planning',
      'References',
    ],
    minCitations: 6,
    minWordCount: 1000,
    requiresCrisisDisclaimer: true,
    requiresClinicalReview: true,
    linkedResourceTypes: ['condition', 'crisis'],
  },
};

export const ARTICLE_TYPE_OPTIONS: { label: string; value: ArticleType; description: string }[] = Object.values(ARTICLE_TEMPLATES).map((t) => ({
  label: t.label,
  value: t.type,
  description: t.description,
}));

// ---------------------------------------------------------------------------
// Quality Gate Thresholds
// ---------------------------------------------------------------------------

export const QUALITY_GATE = {
  /** Minimum percentage of citations from Tier 1 sources */
  MIN_TIER1_PCT: 40,
  /** Minimum percentage of citations from Tier 1 + Tier 2 combined */
  MIN_TIER1_2_PCT: 60,
  /** Maximum percentage of citations from Tier 5 sources */
  MAX_TIER5_PCT: 20,
  /** Minimum percentage of citations published within the last N years */
  MIN_RECENT_PCT: 70,
  /** Number of years considered "recent" for citation recency */
  RECENCY_YEARS: 10,
  /** Maximum acceptable Flesch-Kincaid grade level (warning threshold) */
  MAX_FK_GRADE: 8,
  /** Flesch-Kincaid grade level that triggers a hard fail */
  HARD_FAIL_FK_GRADE: 12,
} as const;

// ---------------------------------------------------------------------------
// Sensitivity Language
// ---------------------------------------------------------------------------

/**
 * Terms to flag during sensitivity scanning, with preferred alternatives.
 * Based on APA, NIMH, and Mental Health First Aid language guidelines.
 */
export const SENSITIVITY_TERMS: { term: string; suggestion: string }[] = [
  // Suicide language
  { term: 'committed suicide', suggestion: 'died by suicide' },
  { term: 'commit suicide', suggestion: 'die by suicide' },
  { term: 'commits suicide', suggestion: 'dies by suicide' },
  { term: 'committing suicide', suggestion: 'dying by suicide' },
  { term: 'successful suicide', suggestion: 'death by suicide' },
  { term: 'failed suicide', suggestion: 'suicide attempt' },
  { term: 'unsuccessful suicide', suggestion: 'survived a suicide attempt' },

  // Stigmatizing identity labels
  { term: 'the mentally ill', suggestion: 'people with mental illness' },
  { term: 'a schizophrenic', suggestion: 'a person with schizophrenia' },
  { term: 'an anorexic', suggestion: 'a person with anorexia' },
  { term: 'a bulimic', suggestion: 'a person with bulimia' },
  { term: 'a depressive', suggestion: 'a person with depression' },
  { term: 'a psychotic', suggestion: 'a person experiencing psychosis' },
  { term: 'the disabled', suggestion: 'people with disabilities' },
  { term: 'substance abuser', suggestion: 'person with substance use disorder' },
  { term: 'drug addict', suggestion: 'person with substance use disorder' },
  { term: 'alcoholic', suggestion: 'person with alcohol use disorder' },

  // Suffering/victimhood framing
  { term: 'suffers from', suggestion: 'lives with / is diagnosed with' },
  { term: 'suffering from', suggestion: 'living with / diagnosed with' },
  { term: 'victim of', suggestion: 'person affected by / survivor of' },
  { term: 'afflicted with', suggestion: 'diagnosed with' },
  { term: 'stricken with', suggestion: 'diagnosed with' },
  { term: 'plagued by', suggestion: 'experiences' },

  // Minimizing language
  { term: 'just a phase', suggestion: '[remove — dismisses lived experience]' },
  { term: 'attention seeking', suggestion: 'expressing a need for support' },
  { term: 'attention-seeking', suggestion: 'expressing a need for support' },

  // Clinical-jargon-as-adjective
  { term: 'is bipolar', suggestion: 'has bipolar disorder' },
  { term: 'is OCD', suggestion: 'has OCD' },
  { term: 'is ADHD', suggestion: 'has ADHD' },
  { term: 'is autistic', suggestion: 'is autistic / has autism (respect community preference)' },
];

// ---------------------------------------------------------------------------
// Blocked Source Domains
// ---------------------------------------------------------------------------

/** Domains that should never appear in article citations */
export const BLOCKED_SOURCE_DOMAINS: string[] = [
  'wikipedia.org',
  'psychologytoday.com',
  'webmd.com',
  'healthline.com',
  'verywellmind.com',
  'medicalnewstoday.com',
  'reddit.com',
  'quora.com',
  'medium.com',
  'facebook.com',
  'twitter.com',
  'x.com',
  'instagram.com',
  'tiktok.com',
  'youtube.com',
];
