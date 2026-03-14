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

// Quality Gate Engine
export { runQualityGate } from './quality-gate';

// Readability
export { analyzeReadability } from './readability';
