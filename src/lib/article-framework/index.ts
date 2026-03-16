// ============================================================================
// Psychage Evidence-Based Article Framework (PEAF) — Public API
// ============================================================================

// Types
export type {
  SourceTier,
  ExpandedSourceType,
  ArticleType,
  ArticleTemplate,
  EnhancedCitation,
  QualityGateResult,
  QualityCheck,
  QualityGateInput,
  ReadabilityResult,
  SensitivityFlag,
} from './types';

// Constants
export {
  SOURCE_TIERS,
  SOURCE_TYPE_TO_TIER,
  LEGACY_SOURCE_TYPE_MAP,
  EXPANDED_SOURCE_TYPES,
  ARTICLE_TEMPLATES,
  ARTICLE_TYPE_OPTIONS,
  QUALITY_GATE,
  SENSITIVITY_TERMS,
  BLOCKED_SOURCE_DOMAINS,
} from './constants';

// Content Architecture (15 Categories × 1,000 Articles)
export type { ContentCategory, ClarityInstrument } from './content-architecture';
export {
  CONTENT_CATEGORIES,
  TOTAL_ARTICLE_TARGET,
  getCategoryByNumber,
  getCategoryBySlug,
  getCategoriesForInstrument,
  getCategoriesForCondition,
  GAP_CLOSER_CATEGORIES,
  FOUNDATION_CATEGORIES,
} from './content-architecture';

// Quality Gate Engine
export { runQualityGate } from './quality-gate';

// Readability
export { analyzeReadability } from './readability';
