// =============================================================================
// Provider Directory V2 — TypeScript Types
// =============================================================================

// --- Database Row Types (match Supabase schema) ---

export interface ProviderType {
  id: string;
  slug: string;
  label: string;
  description: string | null;
  sort_order: number;
}

export interface Specialty {
  id: string;
  slug: string;
  label: string;
  category: 'condition' | 'treatment_approach' | 'population';
  psychage_condition_id: string | null;
  sort_order: number;
}

export interface LanguageLookup {
  id: string;
  code: string;
  label: string;
  native_label: string;
}

export interface CulturalCompetency {
  id: string;
  slug: string;
  label: string;
  description: string | null;
}

export interface InsurancePlan {
  id: string;
  name: string;
  carrier: string;
  plan_type: 'commercial' | 'medicaid' | 'medicare' | 'tricare' | 'other' | null;
}

export interface ProviderRow {
  id: string;
  user_id: string | null;
  npi_number: string | null;
  license_number: string | null;
  license_state: string | null;
  provider_type_id: string;
  status: ProviderStatus;
  tier: ProviderTier;
  source: ProviderSource;
  display_name: string;
  credentials_suffix: string | null;
  bio: string | null;
  photo_url: string | null;
  practice_name: string | null;
  practice_type: string | null;
  website_url: string | null;
  phone: string | null;
  email: string | null;
  appointment_url: string | null;
  is_accepting_patients: boolean;
  telehealth_available: boolean;
  in_person_available: boolean;
  verified_at: string | null;
  taxonomy_code: string | null;
  taxonomy_description: string | null;
  facility_type: string | null;
  sliding_fee_scale: boolean;
  emergency_services: boolean;
  data_last_synced_at: string | null;
  claimed_at: string | null;
  trust_score_cached: number;
  created_at: string;
  updated_at: string;
}

export interface ProviderLocation {
  id: string;
  provider_id: string;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state_province: string | null;
  postal_code: string | null;
  country_code: string;
  latitude: number | null;
  longitude: number | null;
  is_primary: boolean;
}

export interface ProviderVerification {
  id: string;
  provider_id: string;
  verification_type: 'npi_check' | 'license_check' | 'email' | 'manual';
  status: 'passed' | 'failed' | 'pending';
  tier: 'npi' | 'license' | 'certified';
  details: Record<string, unknown> | null;
  license_number: string | null;
  license_state: string | null;
  license_expiry: string | null;
  certification_application: Record<string, unknown> | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  expires_at: string | null;
  verified_at: string | null;
  created_at: string;
}

// --- Enum Types ---

export type ProviderStatus = 'seeded' | 'claimed' | 'submitted' | 'verified' | 'active' | 'suspended' | 'rejected';
import type { ProviderTier as _ProviderTier } from '@/lib/provider-tier';
export type ProviderTier = _ProviderTier;
export type ProviderSource = 'npi_registry' | 'samhsa' | 'hrsa_hc' | 'manual' | 'claim';

// --- Joined / Enriched Types ---

export interface ProviderWithDetails extends ProviderRow {
  provider_type: ProviderType;
  locations: ProviderLocation[];
  specialties: Specialty[];
  languages: (LanguageLookup & { proficiency: string })[];
  cultural_competencies: CulturalCompetency[];
  insurance_plans: InsurancePlan[];
}

// --- Rich card type (from search RPC) ---

export interface ProviderCardData {
  id: string;
  display_name: string;
  credentials_suffix: string | null;
  bio: string | null;
  photo_url: string | null;
  status: ProviderStatus;
  tier: ProviderTier;
  practice_name: string | null;
  phone: string | null;
  email: string | null;
  website_url: string | null;
  appointment_url: string | null;
  npi_number: string | null;
  telehealth_available: boolean;
  in_person_available: boolean;
  is_accepting_patients: boolean;
  verified_at: string | null;
  trust_score_cached: number | null;
  provider_type_slug: string;
  provider_type_label: string;
  primary_city: string | null;
  primary_state: string | null;
  specialty_tags: { slug: string; label: string; category: string }[];
  language_tags: { code: string; label: string; native_label: string }[];
  competency_tags: { slug: string; label: string }[];
  insurance_tags: { name: string; carrier: string }[];
}

export interface ProviderCardSearchResult {
  providers: ProviderCardData[];
  total_count: number;
  page: number;
  per_page: number;
  has_more: boolean;
}

// --- Search Types ---

export interface ProviderSearchParams {
  query?: string;
  latitude?: number;
  longitude?: number;
  radius_miles?: number;
  provider_type_ids?: string[];
  specialty_ids?: string[];
  specialty_slugs?: string[];
  language_ids?: string[];
  competency_ids?: string[];
  insurance_plan_ids?: string[];
  state?: string;
  city?: string;
  telehealth?: boolean;
  in_person?: boolean;
  accepting_patients?: boolean;
  verification_status?: 'verified' | 'listed';
  sort_by?: 'relevance' | 'distance' | 'name';
  page?: number;
  per_page?: number;
}

export interface ProviderSearchResult {
  providers: ProviderWithDetails[];
  total_count: number;
  page: number;
  per_page: number;
  has_more: boolean;
}

// --- Onboarding Types ---

export interface ProviderApplication {
  npi_number?: string;
  license_number?: string;
  license_state?: string;
  provider_type_id: string;
  display_name: string;
  credentials_suffix: string;
  bio: string;
  practice_name?: string;
  practice_type?: string;
  phone?: string;
  email: string;
  website_url?: string;
  appointment_url?: string;
  telehealth_available: boolean;
  in_person_available: boolean;
  location: {
    address_line1?: string;
    address_line2?: string;
    city?: string;
    state_province?: string;
    postal_code?: string;
  };
  specialty_ids: string[];
  language_ids: string[];
  competency_ids?: string[];
  insurance_plan_ids?: string[];
  tier: ProviderTier;
}

export interface NPIVerificationResult {
  verified: boolean;
  name?: string;
  credentials?: string;
  taxonomy_description?: string;
  address?: {
    address_1: string;
    city: string;
    state: string;
    postal_code: string;
  };
  error?: string;
}

// --- Helper for primary location ---

export function getPrimaryLocation(provider: ProviderWithDetails): ProviderLocation | null {
  return provider.locations.find(l => l.is_primary) || provider.locations[0] || null;
}

export function formatProviderLocation(location: ProviderLocation | null): string {
  if (!location) return '';
  const parts = [location.city, location.state_province].filter(Boolean);
  return parts.join(', ');
}
