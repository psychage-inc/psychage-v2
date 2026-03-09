// ============================================================
// Admin Panel Constants
// ============================================================

import type { ContentType, ContentStatus, ContentLanguage, CrisisSeverity, CrisisCategory, VerificationTier, SymptomDomain } from './types';

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
