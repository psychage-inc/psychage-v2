// ============================================================================
// Psychage Evidence-Based Article Framework (PEAF) — Type Definitions
// ============================================================================

// ---------------------------------------------------------------------------
// Source Tier System
// ---------------------------------------------------------------------------

/** Evidence source credibility tier (1 = highest) */
export type SourceTier = 1 | 2 | 3 | 4 | 5;

/** Expanded source type covering all acceptable citation origins */
export type ExpandedSourceType =
  // Tier 1 — Peer-Reviewed Research
  | 'peer_reviewed_journal'
  | 'meta_analysis'
  | 'systematic_review'
  // Tier 2 — Government / Institutional
  | 'nimh'
  | 'nih'
  | 'who'
  | 'cdc'
  | 'samhsa'
  // Tier 3 — Professional Organizations
  | 'apa_psychiatric'
  | 'apa_psychological'
  | 'nami'
  | 'mha'
  // Tier 4 — Clinical Guidelines & Reviews
  | 'dsm'
  | 'icd'
  | 'cochrane'
  | 'clinical_guideline'
  // Tier 5 — Educational / Reference
  | 'mayo_clinic'
  | 'textbook'
  | 'reference';

// ---------------------------------------------------------------------------
// Article Template System
// ---------------------------------------------------------------------------

/** The 5 canonical article types in Psychage */
export type ArticleType =
  | 'condition_deep_dive'
  | 'treatment_guide'
  | 'research_digest'
  | 'self_help'
  | 'crisis_safety';

/** Defines the structural requirements for one article type */
export interface ArticleTemplate {
  type: ArticleType;
  label: string;
  description: string;
  requiredSections: string[];
  minCitations: number;
  minWordCount: number;
  requiresCrisisDisclaimer: boolean;
  requiresClinicalReview: boolean;
  linkedResourceTypes: ('condition' | 'crisis' | 'provider' | 'tool')[];
}

// ---------------------------------------------------------------------------
// Enhanced Citation
// ---------------------------------------------------------------------------

/** A structured citation with tier metadata (used in article_citations table) */
export interface EnhancedCitation {
  id: string;
  articleId: string;
  sourceType: ExpandedSourceType;
  tier: SourceTier;
  title: string;
  authors: string[];
  year: number | null;
  url?: string;
  doi?: string;
  journalName?: string;
  publisher?: string;
  accessDate?: string;
  sortOrder: number;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Quality Gate
// ---------------------------------------------------------------------------

/** Result of running the full quality gate on an article */
export interface QualityGateResult {
  passed: boolean;
  score: number; // 0–100
  checks: QualityCheck[];
  blockingFailures: number;
  warnings: number;
  timestamp: string;
}

/** Individual quality check outcome */
export interface QualityCheck {
  id: string;
  label: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  blocking: boolean;
  /** Optional numeric detail (e.g. actual word count, readability grade) */
  value?: number;
  /** Optional target (e.g. minimum word count) */
  target?: number;
}

// ---------------------------------------------------------------------------
// Quality Gate Input
// ---------------------------------------------------------------------------

/** The data needed to run the quality gate */
export interface QualityGateInput {
  /** Plain text content of the article (no HTML/markdown) */
  content: string;
  /** The article type (determines which template to validate against) */
  articleType: ArticleType;
  /** All citations attached to this article */
  citations: EnhancedCitation[];
  /** Author name (checked for presence) */
  authorName: string | null;
  /** Linked condition IDs from the symptom navigator */
  linkedConditionIds: string[];
  /** Whether a medical disclaimer is present in the content */
  hasDisclaimer: boolean;
}

// ---------------------------------------------------------------------------
// Readability
// ---------------------------------------------------------------------------

/** Readability analysis result */
export interface ReadabilityResult {
  /** Flesch-Kincaid Reading Ease score (0–100, higher = easier) */
  fleschReadingEase: number;
  /** Flesch-Kincaid Grade Level (US school grade) */
  fleschKincaidGrade: number;
  /** Total word count */
  wordCount: number;
  /** Total sentence count */
  sentenceCount: number;
  /** Total syllable count */
  syllableCount: number;
  /** Average words per sentence */
  avgWordsPerSentence: number;
  /** Average syllables per word */
  avgSyllablesPerWord: number;
}

// ---------------------------------------------------------------------------
// Sensitivity
// ---------------------------------------------------------------------------

/** A flagged term found during sensitivity scanning */
export interface SensitivityFlag {
  term: string;
  suggestion: string;
  position: number;
  context: string; // surrounding ~40 chars for reviewer context
}
