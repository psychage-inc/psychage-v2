// =============================================================================
// Provider Directory V2 — NPI Registry API Mappers
// Maps NPPES API responses to the Psychage provider schema.
// =============================================================================

import type { NPIVerificationResult } from './types';

// NPI API response types (subset of what the API returns)
interface NPIResult {
  number: number;
  enumeration_type: string;
  basic: {
    first_name: string;
    last_name: string;
    credential: string;
    sole_proprietor: string;
    gender: string;
    enumeration_date: string;
    last_updated: string;
    name_prefix?: string;
    name_suffix?: string;
    middle_name?: string;
  };
  addresses: Array<{
    country_code: string;
    country_name: string;
    address_purpose: string;
    address_type: string;
    address_1: string;
    address_2?: string;
    city: string;
    state: string;
    postal_code: string;
    telephone_number?: string;
    fax_number?: string;
  }>;
  taxonomies: Array<{
    code: string;
    taxonomy_group: string;
    desc: string;
    state: string;
    license: string;
    primary: boolean;
  }>;
}

interface NPIAPIResponse {
  result_count: number;
  results: NPIResult[];
}

// Mental health taxonomy code prefixes
const MENTAL_HEALTH_TAXONOMY_PREFIXES = [
  '101Y',  // Counselor
  '103T',  // Psychologist
  '1041',  // Social Worker
  '2084P', // Psychiatrist
  '163W',  // Registered Nurse (Psychiatric)
  '364S',  // Psychiatric Nurse Practitioner
];

// Map taxonomy code prefix to provider_type slug
const TAXONOMY_TO_PROVIDER_TYPE: Record<string, string> = {
  '101Y': 'counselor',
  '103T': 'psychologist',
  '1041': 'social_worker',
  '2084': 'psychiatrist',
  '163W': 'therapist',
  '364S': 'therapist',
};

/**
 * Check if an NPI taxonomy code is a mental health provider.
 */
export function isMentalHealthTaxonomy(taxonomyCode: string): boolean {
  return MENTAL_HEALTH_TAXONOMY_PREFIXES.some(prefix => taxonomyCode.startsWith(prefix));
}

/**
 * Get the provider_type slug for a taxonomy code.
 */
export function getProviderTypeSlug(taxonomyCode: string): string {
  for (const [prefix, slug] of Object.entries(TAXONOMY_TO_PROVIDER_TYPE)) {
    if (taxonomyCode.startsWith(prefix)) return slug;
  }
  return 'therapist'; // default fallback
}

/**
 * Verify an NPI number against the NPPES API.
 * Returns verification result with provider data if found.
 */
export async function verifyNPI(npiNumber: string): Promise<NPIVerificationResult> {
  if (!npiNumber || npiNumber.length !== 10 || !/^\d{10}$/.test(npiNumber)) {
    return { verified: false, error: 'NPI must be a 10-digit number' };
  }

  try {
    const response = await fetch(
      `https://npiregistry.cms.hhs.gov/api/?version=2.1&number=${npiNumber}`
    );

    if (!response.ok) {
      return { verified: false, error: 'NPI Registry API unavailable' };
    }

    const data: NPIAPIResponse = await response.json();

    if (!data.results || data.result_count === 0) {
      return { verified: false, error: 'NPI number not found' };
    }

    const result = data.results[0];

    // Check if any taxonomy is mental health
    const mentalHealthTaxonomy = result.taxonomies?.find(t => isMentalHealthTaxonomy(t.code));

    if (!mentalHealthTaxonomy) {
      return {
        verified: false,
        error: 'This NPI is not associated with a mental health provider',
      };
    }

    // Get practice address (address_purpose = 'LOCATION')
    const practiceAddress = result.addresses?.find(a => a.address_purpose === 'LOCATION')
      || result.addresses?.[0];

    return {
      verified: true,
      name: `${result.basic.first_name} ${result.basic.last_name}`,
      credentials: result.basic.credential || undefined,
      taxonomy_description: mentalHealthTaxonomy.desc,
      address: practiceAddress ? {
        address_1: practiceAddress.address_1,
        city: practiceAddress.city,
        state: practiceAddress.state,
        postal_code: practiceAddress.postal_code.substring(0, 5),
      } : undefined,
    };
  } catch (err) {
    console.error('NPI verification failed:', err);
    return { verified: false, error: 'Failed to verify NPI. Please try again.' };
  }
}

/**
 * Map a single NPI result to provider insert data.
 * Used by the seeding script.
 */
export function mapNPIToProvider(
  result: NPIResult,
  providerTypeIdMap: Record<string, string>
): {
  provider: Record<string, unknown>;
  location: Record<string, unknown> | null;
} | null {
  const mentalHealthTaxonomy = result.taxonomies?.find(t => isMentalHealthTaxonomy(t.code));
  if (!mentalHealthTaxonomy) return null;

  const typeSlug = getProviderTypeSlug(mentalHealthTaxonomy.code);
  const providerTypeId = providerTypeIdMap[typeSlug];
  if (!providerTypeId) return null;

  const practiceAddress = result.addresses?.find(a => a.address_purpose === 'LOCATION')
    || result.addresses?.[0];

  const provider = {
    npi_number: String(result.number),
    provider_type_id: providerTypeId,
    status: 'seeded',
    tier: 'free',
    source: 'npi_registry',
    display_name: `${result.basic.first_name} ${result.basic.last_name}`,
    credentials_suffix: result.basic.credential || null,
    is_accepting_patients: true,
    telehealth_available: false,
    in_person_available: true,
  };

  const location = practiceAddress ? {
    address_line1: practiceAddress.address_1,
    address_line2: practiceAddress.address_2 || null,
    city: practiceAddress.city,
    state_province: practiceAddress.state,
    postal_code: practiceAddress.postal_code.substring(0, 5),
    country_code: 'US',
    is_primary: true,
  } : null;

  return { provider, location };
}

/**
 * Taxonomy codes to query for seeding mental health providers.
 */
export const SEED_TAXONOMY_CODES = [
  '101YM0800X', // Mental Health Counselor
  '101YP0001X', // Addiction Counselor
  '103TC0700X', // Clinical Psychologist
  '103T00000X', // Psychologist
  '1041C0700X', // Clinical Social Worker
  '104100000X', // Social Worker
  '2084P0800X', // Psychiatry
  '2084P0802X', // Addiction Psychiatry
  '2084P0804X', // Child & Adolescent Psychiatry
  '364SP0808X', // Psychiatric Nurse Practitioner
];
