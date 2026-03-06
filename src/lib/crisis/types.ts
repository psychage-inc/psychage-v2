// =============================================================================
// Psychage Crisis Resource System — Canonical Types
// =============================================================================

/** How well a country's crisis resources are documented and verified */
export type CoverageLevel =
  | 'VERIFIED_CRISIS_LINE'
  | 'VERIFIED_SUPPORT_LINE'
  | 'EMERGENCY_ONLY'
  | 'REGIONAL_FALLBACK'
  | 'GLOBAL_FALLBACK';

/** Channel through which crisis support is delivered */
export type ResourceType = 'hotline' | 'text' | 'chat' | 'whatsapp' | 'website';

/**
 * Source priority for crisis resource data.
 * 1 = verified global directory (e.g., Find A Helpline / ThroughLine)
 * 2 = official national service or major crisis organization
 * 3 = trusted NGO or recognized national support service
 * 4 = emergency-service fallback
 * 5 = manual-review temporary entry
 */
export type SourcePriority = 1 | 2 | 3 | 4 | 5;

/** Verification status of a resource entry */
export type VerificationStatus = 'verified' | 'unverified' | 'needs_review';

/** Confidence in accuracy of a resource entry */
export type ConfidenceLevel = 'high' | 'medium' | 'low';

/** A single crisis support resource */
export interface CrisisResource {
  name: string;
  type: ResourceType;
  phone: string | null;
  text_instruction: string | null;
  chat_url: string | null;
  web_url: string | null;
  hours: string;
  languages: string[];
  source_name: string;
  source_priority: SourcePriority;
  verification_status: VerificationStatus;
  last_verified_at: string;
  confidence_level: ConfidenceLevel;
  notes: string | null;
}

/** A country's complete crisis resource entry */
export interface CountryEntry {
  country_name: string;
  iso2: string;
  region: string;
  primary_languages: string[];
  emergency_number: string;
  coverage_level: CoverageLevel;
  resources: CrisisResource[];
  fallback_directory_url: string | null;
}

/** The result returned by the resolution engine */
export interface ResolvedCrisisResult {
  country: CountryEntry;
  primary_resource: CrisisResource | null;
  all_resources: CrisisResource[];
  emergency_number: string;
  fallback_used: boolean;
  fallback_source: string | null;
}

/** Options for country resolution */
export interface CountryResolutionOptions {
  explicit_iso2?: string;
  stored_preference?: string;
  vercel_country_header?: string;
  browser_language?: string;
}

/** Coverage report for maintenance */
export interface CoverageReport {
  total_countries: number;
  verified_crisis_line: number;
  verified_support_line: number;
  emergency_only: number;
  regional_fallback: number;
  global_fallback: number;
}

/** Data provider interface for API-ready adapter */
export interface CrisisDataProvider {
  getResourcesForCountry(iso2: string): ResolvedCrisisResult;
  isAvailable(): boolean;
}

/** Severity levels used by the crisis support modal */
export type Severity = 'WATCH' | 'URGENT' | 'CRISIS';
