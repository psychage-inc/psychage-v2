/**
 * PSYCHAGE CRISIS DETECTION SYSTEM - TYPE DEFINITIONS
 *
 * This file contains all TypeScript interfaces for the crisis detection and management system.
 * These types are the foundation for a life-saving system — changes must be reviewed carefully.
 *
 * Clinical review: Dr. Lena Dobson
 * Last updated: 2026-03-03
 */

// ==================== CRISIS DETECTION ====================

export type CrisisTier = 0 | 1 | 2 | 3;
// 0 = No crisis detected
// 1 = Mild distress (general emotional difficulty)
// 2 = Elevated distress (hopelessness, worthlessness)
// 3 = Immediate danger (suicidal ideation, self-harm intent)

export type MoodLevel = 0 | 1 | 2 | 3 | 4 | 5;
// 0 = Thriving
// 1 = Good
// 2 = Okay
// 3 = Low
// 4 = Struggling
// 5 = Crisis

export interface CrisisDetectionResult {
  tier: CrisisTier;
  confidence: number; // 0.0 - 1.0
  matchedKeywords: string[]; // For logging only, never shown to user
  language: string; // Detected language of matched keywords
  shouldShowEmergencyModal: boolean;
  shouldShowCrisisBanner: boolean;
  shouldShowGentleCheckin: boolean;
}

export interface CrisisKeyword {
  keyword: string;
  language: string;
  tier: 1 | 2 | 3;
  weight: number; // 1.0 = exact match, 0.7 = partial, 0.4 = semantic proximity
}

// ==================== GEO-LOCATION & RESOURCES ====================

export type GeoConfidence = "high" | "low" | "manual";

export interface GeoLocation {
  countryCode: string; // ISO 3166-1 alpha-2 (e.g., "US", "GB")
  countryName: string;
  region: string;
  confidence: GeoConfidence;
}

export interface CrisisResource {
  id: string;
  organizationName: string;
  countryCode: string;
  countryName: string;
  phoneNumber: string | null;
  textOption: string | null; // e.g., "Text HOME to 741741"
  chatUrl: string | null;
  isAvailable24_7: boolean;
  operatingHours: string | null;
  languages: string[];
  topics: string[]; // e.g., ["suicide", "self-harm", "anxiety"]
  isVerified: boolean; // Always true from ThroughLine
  lastVerified: Date;
  rank: number; // ThroughLine's AI ranking — lower = more relevant
}

// ==================== MOOD TRACKING ====================

export interface MoodLog {
  id: string;
  mood_level: MoodLevel;
  logged_at: Date;
  triggered_alert_type?: string;
}

export type PatternAlertType =
  | "declining_trend"
  | "sustained_low"
  | "sudden_drop"
  | "crisis_level"
  | "re_engagement";

export type PatternSeverity = "low" | "medium" | "high" | "critical";

export type PatternAction =
  | "show_resources"
  | "show_checkin"
  | "trigger_crisis_banner"
  | "trigger_emergency";

export interface PatternAlert {
  type: PatternAlertType;
  severity: PatternSeverity;
  triggerAction: PatternAction;
  message: string; // Human-readable, informs Claude prompt (never shown directly)
}

// ==================== SAFETY PLAN ====================

export interface SafetyPlan {
  id: string;
  user_id: string;
  version: number;
  is_complete: boolean;
  created_at: Date;
  updated_at: Date;
  content: SafetyPlanContent; // Decrypted content
}

export interface SafetyPlanContent {
  warningSign: string[];
  reasonsToLive: string[];
  copingStrategies: string[];
  contacts: SafetyContact[];
  safeEnvironments: string[];
}

export interface SafetyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
  isProfessional: boolean;
}

export interface EncryptedSafetyPlan {
  id: string;
  user_id: string;
  encrypted_content: string; // AES-256-GCM encrypted JSON
  iv: string; // Initialization vector
  version: number;
  created_at: Date;
  updated_at: Date;
  is_complete: boolean;
}

// ==================== CRISIS EVENTS (ANONYMOUS LOGGING) ====================

export interface CrisisEvent {
  id: string;
  tier: CrisisTier;
  country_code: string;
  detected_language: string;
  session_id: string; // SHA-256 hashed
  triggered_at: Date;
  throughline_resource_shown: boolean;
  emergency_modal_dismissed?: boolean;
  dismissal_path?: "called_help" | "safe_now" | null;
}

// ==================== CLAUDE API ====================

export type ClaudePromptTier = "TIER_1" | "TIER_2" | "TIER_3";

export interface CrisisCompanionRequest {
  tier: CrisisTier;
  context: string; // Sanitized context summary, NEVER raw user text
  locale: string;
  countryCode: string;
  sessionTurn: number;
}

export interface CrisisCompanionResponse {
  message: string;
  resources?: CrisisResource[];
  followUpPrompt?: string;
}

// ==================== COMPONENT PROPS ====================

export interface CrisisDetectionWrapperProps {
  children: React.ReactNode;
  onTierDetected?: (result: CrisisDetectionResult) => void;
  locale: string;
  disabled?: boolean; // For admin/testing contexts only
}

export interface EmergencyModalProps {
  isOpen: boolean;
  onDismiss: (path: "called_help" | "safe_now") => void;
  resources: CrisisResource[];
  locale: string;
  emergencyNumber: string;
}

export interface CrisisBannerProps {
  tier: CrisisTier;
  aiResponse?: string;
  resources: CrisisResource[];
  onDismiss: () => void;
}

export interface GentleCheckInProps {
  aiResponse?: string;
  onDismiss: () => void;
}
