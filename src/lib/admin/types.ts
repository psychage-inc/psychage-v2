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

// Article Command Center
export type ArticleStatus = 'draft' | 'in_review' | 'approved' | 'rejected' | 'published' | 'paused' | 'archived';
export type CommentSeverity = 'suggestion' | 'needs_fix' | 'critical';
export type ImagePurpose = 'hero' | 'inline' | 'infographic' | 'thumbnail';

export interface ArticleRecord {
  id: string;
  sanity_id: string | null;
  title: string;
  slug: string;
  status: ArticleStatus;
  category: string | null;
  tags: string[];
  rating_accuracy: number | null;
  rating_readability: number | null;
  rating_completeness: number | null;
  rating_sensitivity: number | null;
  rating_overall: number | null;
  assigned_reviewer_id: string | null;
  assigned_reviewer_name: string | null;
  reviewed_by: string | null;
  reviewed_by_name: string | null;
  reviewed_at: string | null;
  rejection_reason: string | null;
  parent_article_id: string | null;
  cluster_order: number;
  is_parent: boolean;
  view_count: number;
  avg_read_time_seconds: number | null;
  word_count: number;
  author_name: string | null;
  created_by: string | null;
  sanity_last_synced_at: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  // PEAF fields
  article_type: import('@/lib/article-framework/types').ArticleType | null;
  linked_condition_ids: string[];
  quality_score: number | null;
  readability_grade: number | null;
  citation_count: number;
  tier1_citation_pct: number | null;
  // Production system fields
  category_id: string | null;
  subcategory_id: string | null;
  template_type: ArticleTemplateType | null;
  article_production_id: string | null;
  review_stage: ArticleReviewStage;
  is_cornerstone: boolean;
  has_spark_moment: boolean;
  has_practical_exercise: boolean;
  has_crisis_disclaimer: boolean;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[];
  hero_image_url: string | null;
  hero_image_alt: string | null;
  internal_links: string[];
  tool_links: string[];
  related_article_ids: string[];
  fact_checked: boolean;
  fact_checked_by: string | null;
  fact_checked_at: string | null;
  clinical_approved: boolean;
  clinical_approved_at: string | null;
  legal_approved: boolean;
  seo_approved: boolean;
  final_approved: boolean;
  final_approved_by: string | null;
  final_approved_at: string | null;
  featured: boolean;
  // Joined fields (from queries)
  unresolved_comment_count?: number;
  child_count?: number;
  category_record?: ArticleCategoryRecord;
  subcategory_record?: ArticleSubcategoryRecord;
  derivatives_count?: number;
}

export interface ArticleCommentRecord {
  id: string;
  article_id: string;
  author_id: string;
  author_name: string;
  parent_comment_id: string | null;
  body: string;
  severity: CommentSeverity;
  section_reference: string | null;
  is_resolved: boolean;
  resolved_by: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
  replies?: ArticleCommentRecord[];
}

export interface ArticleImageRecord {
  id: string;
  article_id: string;
  storage_path: string;
  public_url: string;
  original_filename: string | null;
  purpose: ImagePurpose;
  alt_text: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  size_bytes: number | null;
  mime_type: string | null;
  sort_order: number;
  uploaded_by: string | null;
  uploaded_by_name: string | null;
  created_at: string;
}

export interface ArticleStatusHistoryRecord {
  id: string;
  article_id: string;
  from_status: string | null;
  to_status: string;
  changed_by: string | null;
  changed_by_name: string | null;
  notes: string | null;
  created_at: string;
}

export interface ArticleStats {
  total: number;
  draft: number;
  in_review: number;
  approved: number;
  rejected: number;
  published: number;
  paused: number;
  archived: number;
  avg_rating: number | null;
}

// Article Production System
export type ArticleReviewStage = 'planned' | 'researched' | 'drafted' | 'in_review' | 'approved' | 'published';
export type ArticleTemplateType = 'educational' | 'myth_buster' | 'how_to' | 'resource_compilation';
export type DerivativeType = 'supporting_article' | 'spark_micro_content' | 'key_facts_card' | 'social_media_post' | 'email_newsletter_block' | 'video_script' | 'faq_entry' | 'pull_quote';
export type DerivativeStatus = 'planned' | 'drafted' | 'reviewed' | 'published';

export interface ArticleCategoryRecord {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string | null;
  display_order: number;
  article_target: number;
  color: string | null;
  created_at: string;
  updated_at: string;
  // Computed / joined
  article_count?: number;
  published_count?: number;
}

export interface ArticleSubcategoryRecord {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  display_order: number;
  created_at: string;
  updated_at: string;
  // Joined
  article_count?: number;
}

export interface ArticleDerivativeRecord {
  id: string;
  source_article_id: string;
  derivative_type: DerivativeType;
  title: string | null;
  content: string | null;
  platform: string | null;
  word_count: number;
  status: DerivativeStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CategoryArticleDistribution {
  category: ArticleCategoryRecord;
  totalCount: number;
  publishedCount: number;
  byStage: Record<ArticleReviewStage, number>;
}

export interface CitationDiversityEntry {
  articleId: string;
  title: string;
  tiers: Record<number, number>;
  totalCitations: number;
  tierCount: number;
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
