// ============================================================
// Admin Panel Constants
// ============================================================

import type { ContentType, ContentStatus, ContentLanguage, CrisisSeverity, CrisisCategory, VerificationTier, SymptomDomain, ArticleStatus, CommentSeverity, ImagePurpose, ArticleReviewStage, ArticleTemplateType, DerivativeType, DerivativeStatus } from './types';

export const CONTENT_TYPES: { label: string; value: ContentType }[] = [
  { label: 'Article', value: 'article' },
  { label: 'Guide', value: 'guide' },
  { label: 'FAQ', value: 'faq' },
  { label: 'Glossary', value: 'glossary' },
  { label: 'Video Transcript', value: 'video_transcript' },
  { label: 'Infographic', value: 'infographic' },
];

export const CONTENT_STATUSES: { label: string; value: ContentStatus }[] = [
  { label: 'Draft', value: 'draft' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Published', value: 'published' },
];

export const SUPPORTED_LANGUAGES: { label: string; value: ContentLanguage }[] = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'Arabic', value: 'ar' },
  { label: 'Chinese', value: 'zh' },
];

export const SEVERITY_LEVELS: { label: string; value: CrisisSeverity; color: string }[] = [
  { label: 'CRISIS', value: 'CRISIS', color: 'red' },
  { label: 'URGENT', value: 'URGENT', color: 'orange' },
  { label: 'WATCH', value: 'WATCH', color: 'blue' },
];

export const CRISIS_CATEGORIES: { label: string; value: CrisisCategory }[] = [
  { label: 'Suicidal Ideation', value: 'suicidal_ideation' },
  { label: 'Self Harm', value: 'self_harm' },
  { label: 'Harm to Others', value: 'harm_to_others' },
  { label: 'Substance Crisis', value: 'substance_crisis' },
  { label: 'Psychotic Crisis', value: 'psychotic_crisis' },
  { label: 'Domestic Violence', value: 'domestic_violence' },
  { label: 'Child Abuse', value: 'child_abuse' },
  { label: 'Eating Disorder Crisis', value: 'eating_disorder_crisis' },
];

export const VERIFICATION_TIERS: { label: string; value: VerificationTier; color: string }[] = [
  { label: 'Unverified', value: 'unverified', color: 'gray' },
  { label: 'NPI Verified', value: 'npi_verified', color: 'blue' },
  { label: 'Psychage Verified', value: 'psychage_verified', color: 'teal' },
  { label: 'Featured', value: 'featured', color: 'amber' },
];

export const SYMPTOM_DOMAINS: { label: string; value: SymptomDomain; color: string }[] = [
  { label: 'Physical', value: 'physical', color: 'blue' },
  { label: 'Emotional', value: 'emotional', color: 'rose' },
  { label: 'Cognitive', value: 'cognitive', color: 'purple' },
  { label: 'Behavioral', value: 'behavioral', color: 'amber' },
];

export const ADMIN_ROLE_LABELS: Record<string, string> = {
  super_admin: 'Super Admin',
  clinical_admin: 'Clinical Admin',
  viewer: 'Viewer',
};

export const CONFIDENCE_CAP = 0.75;

// Article Command Center
export const ARTICLE_STATUSES: { label: string; value: ArticleStatus; color: string }[] = [
  { label: 'Draft', value: 'draft', color: 'gray' },
  { label: 'In Review', value: 'in_review', color: 'blue' },
  { label: 'Approved', value: 'approved', color: 'emerald' },
  { label: 'Rejected', value: 'rejected', color: 'red' },
  { label: 'Published', value: 'published', color: 'emerald' },
  { label: 'Paused', value: 'paused', color: 'orange' },
  { label: 'Archived', value: 'archived', color: 'gray' },
];

export const COMMENT_SEVERITIES: { label: string; value: CommentSeverity; color: string }[] = [
  { label: 'Suggestion', value: 'suggestion', color: 'blue' },
  { label: 'Needs Fix', value: 'needs_fix', color: 'amber' },
  { label: 'Critical', value: 'critical', color: 'red' },
];

export const IMAGE_PURPOSES: { label: string; value: ImagePurpose }[] = [
  { label: 'Hero', value: 'hero' },
  { label: 'Inline', value: 'inline' },
  { label: 'Infographic', value: 'infographic' },
  { label: 'Thumbnail', value: 'thumbnail' },
];

export const RATING_DIMENSIONS = [
  { key: 'rating_accuracy', label: 'Clinical Accuracy' },
  { key: 'rating_readability', label: 'Readability' },
  { key: 'rating_completeness', label: 'Completeness' },
  { key: 'rating_sensitivity', label: 'Sensitivity' },
] as const;

export const ARTICLE_STATUS_TRANSITIONS: Record<ArticleStatus, ArticleStatus[]> = {
  draft: ['in_review'],
  in_review: ['approved', 'rejected', 'draft'],
  approved: ['published', 'draft'],
  rejected: ['draft'],
  published: ['paused', 'archived'],
  paused: ['published', 'archived'],
  archived: ['draft'],
};

// PEAF (Psychage Evidence-Based Article Framework)
export { ARTICLE_TYPE_OPTIONS, QUALITY_GATE, SOURCE_TIERS } from '@/lib/article-framework/constants';

// Article Production System
export const ARTICLE_REVIEW_STAGES: { label: string; value: ArticleReviewStage; color: string }[] = [
  { label: 'Planned', value: 'planned', color: 'gray' },
  { label: 'Researched', value: 'researched', color: 'purple' },
  { label: 'Drafted', value: 'drafted', color: 'blue' },
  { label: 'In Review', value: 'in_review', color: 'amber' },
  { label: 'Approved', value: 'approved', color: 'teal' },
  { label: 'Published', value: 'published', color: 'emerald' },
];

export const ARTICLE_TEMPLATE_TYPES: { label: string; value: ArticleTemplateType; description: string }[] = [
  { label: 'Standard Educational', value: 'educational', description: 'Explaining a condition, symptom, concept, or treatment approach.' },
  { label: 'Myth-Buster', value: 'myth_buster', description: 'Correcting a common misconception with evidence.' },
  { label: 'How-To Guide', value: 'how_to', description: 'Teaching a specific skill, technique, or coping strategy.' },
  { label: 'Resource Compilation', value: 'resource_compilation', description: 'Curating and evaluating resources, tools, or options.' },
];

export const DERIVATIVE_TYPES: { label: string; value: DerivativeType }[] = [
  { label: 'Supporting Article', value: 'supporting_article' },
  { label: 'Spark Micro-Content', value: 'spark_micro_content' },
  { label: 'Key Facts Card', value: 'key_facts_card' },
  { label: 'Social Media Post', value: 'social_media_post' },
  { label: 'Email Newsletter Block', value: 'email_newsletter_block' },
  { label: 'Video Script', value: 'video_script' },
  { label: 'FAQ Entry', value: 'faq_entry' },
  { label: 'Pull Quote', value: 'pull_quote' },
];

export const DERIVATIVE_STATUSES: { label: string; value: DerivativeStatus; color: string }[] = [
  { label: 'Planned', value: 'planned', color: 'gray' },
  { label: 'Drafted', value: 'drafted', color: 'blue' },
  { label: 'Reviewed', value: 'reviewed', color: 'amber' },
  { label: 'Published', value: 'published', color: 'emerald' },
];

export const CATEGORY_PREFIXES: Record<string, string> = {
  'anxiety-stress': 'ANX',
  'depression-mood': 'DEP',
  'relationships-social': 'REL',
  'trauma-ptsd': 'TRM',
  'neurodevelopmental': 'NDV',
  'substance-addiction': 'SUB',
  'sleep-circadian': 'SLP',
  'self-esteem-identity': 'EST',
  'therapy-treatment': 'THR',
  'workplace-academic': 'WRK',
  'life-transitions': 'LIF',
  'children-adolescents': 'CHD',
  'eating-body': 'EAT',
  'ocd-related': 'OCD',
  'global-cultural': 'GLB',
};

export const REVIEW_STAGE_TRANSITIONS: Record<ArticleReviewStage, ArticleReviewStage[]> = {
  planned: ['researched'],
  researched: ['drafted', 'planned'],
  drafted: ['in_review', 'researched'],
  in_review: ['approved', 'drafted'],
  approved: ['published', 'in_review'],
  published: [],
};
