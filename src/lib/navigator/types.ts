/**
 * Symptom Navigator — Type Definitions
 *
 * Complete type system for the client-side matching engine,
 * knowledge base API, and analytics pipeline.
 *
 * IMPORTANT: This tool is educational and non-diagnostic.
 * No type or interface here should imply clinical diagnosis.
 */

// ─── Domain & Category Enums ─────────────────────────────────────────────────

export type SymptomDomain = 'physical' | 'emotional' | 'cognitive' | 'behavioral';

export type SymptomCategory =
  | 'mood'
  | 'anxiety_fear'
  | 'emotional_regulation'
  | 'body_sensations'
  | 'sleep'
  | 'appetite_weight'
  | 'energy'
  | 'cognition'
  | 'perception'
  | 'social'
  | 'coping'
  | 'activity_level'
  | 'identity_self_image'
  | 'somatic_health';

export type ConditionCategory =
  | 'mood'
  | 'anxiety'
  | 'trauma'
  | 'obsessive_compulsive'
  | 'neurodevelopmental'
  | 'stress'
  | 'sleep'
  | 'eating'
  | 'substance'
  | 'personality'
  | 'psychotic'
  | 'dissociative'
  | 'somatic';

export type RedFlagLevel = 'CRISIS' | 'URGENT' | 'WATCH';

export type SymptomRole = 'core' | 'common' | 'associated';

export type RelevanceLevel = 'high' | 'moderate' | 'low' | 'minimal';

export type CrisisResourceType = 'hotline' | 'text' | 'directory';

export type AnalyticsEventType =
  | 'started'
  | 'completed'
  | 'crisis_triggered'
  | 'result_clicked'
  | 'provider_clicked';

// ─── Symptom Types ───────────────────────────────────────────────────────────

export interface Symptom {
  id: string;
  domain: SymptomDomain;
  category: SymptomCategory;
  name: string;
  description: string;
  synonyms: string[];
  ask_duration: boolean;
  ask_severity: boolean;
  ask_frequency: boolean;
  is_red_flag: boolean;
  red_flag_level: RedFlagLevel | null;
  severity_red_flag_threshold: number | null;
  severity_red_flag_level: RedFlagLevel | null;
  display_order: number;
  is_active: boolean;
  version: string;
}

// ─── Condition Types ─────────────────────────────────────────────────────────

export interface Condition {
  id: string;
  name: string;
  full_name: string;
  category: ConditionCategory;
  description_for_user: string;
  minimum_duration: string;
  minimum_duration_display: string;
  minimum_symptoms_for_relevance: number;
  always_recommend_professional: boolean;
  guide_path: string;
  coping_path: string;
  provider_questions: string[];
  clinical_notes: string;
  is_active: boolean;
  version: string;
}

export interface ConditionSymptomMapping {
  id: string;
  condition_id: string;
  symptom_id: string;
  weight: 1 | 2 | 3;
  role: SymptomRole;
  clinical_note: string;
}

export interface ConditionRedFlag {
  condition_id: string;
  symptom_id: string;
  note: string | null;
}

export interface ConditionProfile extends Condition {
  symptom_mappings: ConditionSymptomMapping[];
  red_flags: ConditionRedFlag[];
}

export interface ConditionWithMappings extends Condition {
  symptom_mappings: Array<{
    symptom_id: string;
    weight: 1 | 2 | 3;
    role: SymptomRole;
  }>;
  red_flags: Array<{
    symptom_id: string;
    note: string | null;
  }>;
}

// ─── Crisis Resources ────────────────────────────────────────────────────────

export interface CrisisResource {
  id: string;
  region_code: string;
  name: string;
  type: CrisisResourceType;
  phone: string | null;
  text_instruction: string | null;
  url: string | null;
  email: string | null;
  description: string;
  hours: string;
  languages: string[];
  priority: number;
  condition_specific: string[] | null;
  is_active: boolean;
  last_verified: string;
}

export type CrisisResourcesByRegion = Record<string, CrisisResource[]>;

// ─── Matching Config ─────────────────────────────────────────────────────────

export interface SeverityModifiers {
  '1': number;
  '2-3': number;
  '4-5': number;
  '6-7': number;
  '8-10': number;
}

export interface FrequencyModifiers {
  rarely: number;
  sometimes: number;
  often: number;
  always: number;
}

export interface DurationModifiers {
  below_half: number;
  half_to_full: number;
  meets_or_exceeds: number;
}

export interface RelevanceDisplayTiers {
  high: { min: number; label: string; color: string };
  moderate: { min: number; label: string; color: string };
  low: { min: number; label: string; color: string };
  minimal: { min: number; label: string; color: string };
}

export interface MatchingConfig {
  confidence_cap: number;
  min_relevance_threshold: number;
  below_minimum_penalty: number;
  max_results: number;
  min_results: number;
  max_per_family: number;
  severity_modifiers: SeverityModifiers;
  frequency_modifiers: FrequencyModifiers;
  duration_modifiers: DurationModifiers;
  relevance_display_tiers: RelevanceDisplayTiers;
  version: string;
}

export type ScoringConfig = Pick<
  MatchingConfig,
  | 'confidence_cap'
  | 'below_minimum_penalty'
  | 'severity_modifiers'
  | 'frequency_modifiers'
  | 'duration_modifiers'
>;

export type SafetyConfig = {
  symptoms: Symptom[];
};

export type ResultsConfig = Pick<
  MatchingConfig,
  | 'min_relevance_threshold'
  | 'max_results'
  | 'min_results'
  | 'max_per_family'
  | 'relevance_display_tiers'
>;

// ─── User Input Types ────────────────────────────────────────────────────────

export type UserDuration =
  | 'less_than_1_week'
  | '1_to_2_weeks'
  | '2_to_4_weeks'
  | '1_to_3_months'
  | '3_to_6_months'
  | '6_months_to_1_year'
  | 'more_than_1_year';

export type UserFrequency = 'rarely' | 'sometimes' | 'often' | 'always';

export interface UserSymptomInput {
  symptom_id: string;
  severity?: number; // 1-10
  duration?: UserDuration;
  frequency?: UserFrequency;
}

// ─── Engine Internal Types ───────────────────────────────────────────────────

export interface NormalizedSymptom {
  symptom_id: string;
  symptom: Symptom;
  severity: number;
  duration: UserDuration;
  frequency: UserFrequency;
}

export interface RedFlag {
  symptom_id: string;
  symptom_name: string;
  level: RedFlagLevel;
  trigger: 'inherent' | 'severity_threshold';
  message: string;
}

export interface SafetyResult {
  has_crisis: boolean;
  has_urgent: boolean;
  has_watch: boolean;
  highest_level: RedFlagLevel | null;
  flags: RedFlag[];
  should_halt: boolean;
  crisis_resources: CrisisResource[];
}

export interface MatchedSymptomDetail {
  symptom_id: string;
  symptom_name: string;
  weight: 1 | 2 | 3;
  role: SymptomRole;
  raw_contribution: number;
  modified_contribution: number;
}

export interface ConditionScore {
  condition_id: string;
  condition: Condition;
  raw_score: number;
  normalized_score: number;
  capped_score: number;
  matched_count: number;
  total_mapped: number;
  matched_symptoms: MatchedSymptomDetail[];
  meets_minimum: boolean;
  relevance_level: RelevanceLevel;
}

// ─── Result Types ────────────────────────────────────────────────────────────

export interface NavigatorResultItem {
  condition_id: string;
  name: string;
  full_name: string;
  description_for_user: string;
  relevance_score: number;
  relevance_level: RelevanceLevel;
  relevance_label: string;
  relevance_color: string;
  matched_symptoms: Array<{
    name: string;
    role: SymptomRole;
  }>;
  guide_path: string;
  coping_path: string;
  provider_questions: string[];
  always_recommend_professional: boolean;
}

export interface NavigatorResults {
  safety: SafetyResult;
  results: NavigatorResultItem[];
  general_recommendations: string[];
  disclaimer: string;
  version: string;
  timestamp: string;
}

// ─── Knowledge Base (API Response) ───────────────────────────────────────────

export interface KnowledgeBase {
  version: string;
  symptoms: Symptom[];
  conditions: ConditionWithMappings[];
  matchingConfig: MatchingConfig;
  crisisResources: CrisisResourcesByRegion;
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export interface AnalyticsEvent {
  session_hash: string;
  event_type: AnalyticsEventType;
  domains_selected?: number;
  symptoms_selected?: number;
  time_to_complete_seconds?: number;
  results_shown?: number;
  safety_flag_level?: RedFlagLevel | null;
  feedback_helpful?: boolean;
}

// ─── Saved Results ───────────────────────────────────────────────────────────

export interface SavedResult {
  id: string;
  user_id: string;
  encrypted_results: string;
  created_at: string;
}

export interface SaveResultsRequest {
  results: NavigatorResults;
}

export interface SavedResultsResponse {
  results: SavedResult[];
  cursor: string | null;
  has_more: boolean;
}

// ─── Duration Mapping Utilities ──────────────────────────────────────────────

/** Maps duration strings to approximate days for comparison */
export const DURATION_TO_DAYS: Record<string, number> = {
  less_than_1_week: 4,
  '1_to_2_weeks': 10,
  '2_to_4_weeks': 21,
  '1_to_3_months': 60,
  '3_to_6_months': 135,
  '6_months_to_1_year': 270,
  more_than_1_year: 500,
  // Condition minimum durations
  '1_week': 7,
  '2_weeks': 14,
  '1_month': 30,
  '3_months': 90,
  '6_months': 180,
  '1_year': 365,
  '2_years': 730,
};
