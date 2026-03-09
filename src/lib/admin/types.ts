// ============================================================
// Admin Panel Types
// ============================================================

export type AdminRole = 'super_admin' | 'clinical_admin' | 'viewer';

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
}

export interface AdminRoleRecord {
  id: string;
  user_id: string;
  role: AdminRole;
  granted_by: string | null;
  created_at: string;
}

export interface AuditLogEntry {
  id: string;
  admin_user_id: string;
  action: string;
  resource_type: string;
  resource_id: string | null;
  previous_value: unknown;
  new_value: unknown;
  metadata: unknown;
  created_at: string;
}

export interface PlatformSetting {
  key: string;
  value: unknown;
  updated_by: string | null;
  updated_at: string;
}

// Content management
export type ContentType = 'article' | 'guide' | 'faq' | 'glossary' | 'video_transcript' | 'infographic';
export type ContentStatus = 'draft' | 'in_review' | 'published';
export type ContentLanguage = 'en' | 'es' | 'fr' | 'ar' | 'zh';

export interface ContentDocument {
  id: string;
  type: ContentType;
  title: string;
  slug: string;
  content_body: string;
  summary: string;
  author: string;
  language: ContentLanguage;
  condition_tags: string[];
  topic_tags: string[];
  sources: ContentSource[];
  is_published: boolean;
  status: ContentStatus;
  last_reviewed: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentSource {
  title: string;
  url: string;
  type: 'journal' | 'book' | 'website' | 'government' | 'organization';
}

export interface ContentVersion {
  id: string;
  document_id: string;
  version_number: number;
  content_snapshot: unknown;
  changed_by: string | null;
  change_summary: string | null;
  created_at: string;
}

// Provider management
export type VerificationTier = 'unverified' | 'npi_verified' | 'psychage_verified' | 'featured';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'more_info_requested';

export interface ProviderApplication {
  id: string;
  provider_name: string;
  credentials: string;
  npi_number: string | null;
  npi_verified: boolean;
  npi_verification_data: unknown;
  practice_name: string | null;
  practice_address: unknown;
  specialties: string[];
  languages: string[];
  telehealth_available: boolean;
  license_documents: string[];
  bio: string | null;
  website_url: string | null;
  contact_email: string;
  contact_phone: string | null;
  status: ApplicationStatus;
  reviewed_by: string | null;
  review_notes: string | null;
  rejection_reason: string | null;
  submitted_at: string;
  reviewed_at: string | null;
}

// Symptom Navigator management
export type SymptomDomain = 'physical' | 'emotional' | 'cognitive' | 'behavioral';

export interface SymptomRecord {
  id: string;
  symptom_id: string;
  domain: SymptomDomain;
  category: string;
  clinical_name: string;
  display_names: Record<string, string>;
  synonyms: Record<string, string[]>;
  is_active: boolean;
  related_symptoms: string[];
  created_at: string;
  updated_at: string;
}

export interface ConditionRecord {
  id: string;
  condition_id: string;
  name: Record<string, string>;
  category: string;
  description: Record<string, string>;
  duration_threshold: string | null;
  min_symptom_count: number | null;
  prevalence_data: unknown;
  evidence_sources: unknown;
  educational_content_id: string | null;
  red_flags: string[];
  is_active: boolean;
  clinical_review_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface MappingRecord {
  id: string;
  condition_id: string;
  symptom_id: string;
  weight: 1 | 2 | 3;
  is_core: boolean;
  is_red_flag: boolean;
  evidence_reference: string | null;
  created_at: string;
  updated_at: string;
}

// Safety / Crisis
export type CrisisSeverity = 'CRISIS' | 'URGENT' | 'WATCH';
export type CrisisCategory =
  | 'suicidal_ideation'
  | 'self_harm'
  | 'harm_to_others'
  | 'substance_crisis'
  | 'psychotic_crisis'
  | 'domestic_violence'
  | 'child_abuse'
  | 'eating_disorder_crisis';

export interface CrisisKeyword {
  id: string;
  keyword: string;
  language: string;
  severity: CrisisSeverity;
  category: CrisisCategory;
  is_active: boolean;
  last_reviewed: string | null;
  added_by: string | null;
  created_at: string;
  updated_at: string;
}

// Navigator publish log
export interface NavigatorPublishEntry {
  id: string;
  published_by: string | null;
  symptom_count: number;
  condition_count: number;
  mapping_count: number;
  status: 'success' | 'failed';
  error_message: string | null;
  created_at: string;
}
