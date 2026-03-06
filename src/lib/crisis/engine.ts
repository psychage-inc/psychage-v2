// =============================================================================
// Crisis System — Resource Resolution Engine
// =============================================================================

import type { CountryEntry, CrisisResource, ResolvedCrisisResult } from './types';
import { COUNTRY_DATABASE } from './data/countries';
import { GLOBAL_FALLBACKS, getRegionalFallback } from './data/fallbacks';

/** Default safe entry for completely unknown country codes */
const UNKNOWN_COUNTRY_ENTRY: CountryEntry = {
  country_name: 'International',
  iso2: 'XX',
  region: 'Global',
  primary_languages: ['English'],
  emergency_number: '112',
  coverage_level: 'GLOBAL_FALLBACK',
  resources: [],
  fallback_directory_url: 'https://findahelpline.com',
};

/**
 * Look up a country by ISO2 code. Returns the entry or null.
 */
export function getCountryEntry(iso2: string): CountryEntry | null {
  return COUNTRY_DATABASE[iso2.toUpperCase()] ?? null;
}

/**
 * Rank resources by quality and relevance.
 * Sort order: verification status → source priority → 24/7 availability → type preference.
 */
function rankResources(resources: CrisisResource[]): CrisisResource[] {
  return [...resources].sort((a, b) => {
    // 1. Verified first
    const verificationOrder: Record<string, number> = { verified: 0, unverified: 1, needs_review: 2 };
    const vDiff = (verificationOrder[a.verification_status] ?? 2) - (verificationOrder[b.verification_status] ?? 2);
    if (vDiff !== 0) return vDiff;

    // 2. Lower source_priority number = higher quality
    if (a.source_priority !== b.source_priority) return a.source_priority - b.source_priority;

    // 3. 24/7 availability preferred
    const aIs247 = a.hours.includes('24/7');
    const bIs247 = b.hours.includes('24/7');
    if (aIs247 !== bIs247) return aIs247 ? -1 : 1;

    // 4. Hotline > text > chat > website
    const typeOrder: Record<string, number> = { hotline: 0, text: 1, chat: 2, whatsapp: 3, website: 4 };
    return (typeOrder[a.type] ?? 5) - (typeOrder[b.type] ?? 5);
  });
}

/**
 * Get resolved crisis resources for a country.
 * Always returns a result — never fails. Falls back through:
 * 1. Country-specific verified resources
 * 2. Regional fallback resources
 * 3. Global fallback resources (Find A Helpline, Befrienders, IASP)
 */
export function getResourcesForCountry(iso2: string): ResolvedCrisisResult {
  const upper = iso2.toUpperCase();
  const country = COUNTRY_DATABASE[upper] ?? UNKNOWN_COUNTRY_ENTRY;

  // Gather country-specific resources (ranked first)
  const countryResources: CrisisResource[] = rankResources([...country.resources]);
  let fallbackUsed = false;
  let fallbackSource: string | null = null;

  // If no country-specific resources, add regional fallbacks
  const regionalResources: CrisisResource[] = [];
  if (countryResources.length === 0) {
    const regional = getRegionalFallback(country.region);
    if (regional.length > 0) {
      regionalResources.push(...regional);
      fallbackUsed = true;
      fallbackSource = `Regional: ${country.region}`;
    }
  }

  // Global fallbacks always appended at end (directories, never primary)
  const globalResources = GLOBAL_FALLBACKS.filter(
    (g) => !countryResources.some((r) => r.web_url === g.web_url) &&
           !regionalResources.some((r) => r.web_url === g.web_url)
  );

  if (countryResources.length === 0 && !fallbackUsed) {
    fallbackUsed = true;
    fallbackSource = 'Global directory';
  }

  // Country resources first, then regional, then global directories
  const allResources = [...countryResources, ...regionalResources, ...globalResources];

  // Primary is the best country-specific resource, or first available
  const primary = countryResources[0] ?? regionalResources[0] ?? globalResources[0] ?? null;

  return {
    country,
    primary_resource: primary,
    all_resources: allResources,
    emergency_number: country.emergency_number,
    fallback_used: fallbackUsed,
    fallback_source: fallbackSource,
  };
}

/**
 * Get only the phone-callable resources for a country.
 * Useful for crisis banners and quick-access components.
 */
export function getCallableResources(iso2: string): CrisisResource[] {
  const result = getResourcesForCountry(iso2);
  return result.all_resources.filter((r) => r.phone !== null);
}

/**
 * Get the primary crisis line for a country.
 * Returns the single best resource to show in banners/overlays.
 */
export function getPrimaryCrisisLine(iso2: string): CrisisResource | null {
  const result = getResourcesForCountry(iso2);
  // Prefer a hotline with a phone number
  const hotline = result.all_resources.find((r) => r.type === 'hotline' && r.phone);
  return hotline ?? result.primary_resource;
}

/**
 * Get all countries that have at least one resource available.
 * Useful for populating country selector dropdowns.
 */
export function getCountriesWithResources(): CountryEntry[] {
  return Object.values(COUNTRY_DATABASE).filter(
    (c) => c.coverage_level === 'VERIFIED_CRISIS_LINE' || c.coverage_level === 'VERIFIED_SUPPORT_LINE'
  );
}

/**
 * Get all countries, grouped by region.
 */
export function getCountriesByRegion(): Record<string, CountryEntry[]> {
  const grouped: Record<string, CountryEntry[]> = {};
  for (const country of Object.values(COUNTRY_DATABASE)) {
    if (!grouped[country.region]) {
      grouped[country.region] = [];
    }
    grouped[country.region].push(country);
  }
  // Sort countries within each region alphabetically
  for (const region of Object.keys(grouped)) {
    grouped[region].sort((a, b) => a.country_name.localeCompare(b.country_name));
  }
  return grouped;
}

/**
 * Search countries by name or ISO code.
 */
export function searchCountries(query: string): CountryEntry[] {
  if (!query.trim()) return Object.values(COUNTRY_DATABASE);

  const lower = query.toLowerCase();
  return Object.values(COUNTRY_DATABASE).filter(
    (c) =>
      c.country_name.toLowerCase().includes(lower) ||
      c.iso2.toLowerCase() === lower
  );
}
