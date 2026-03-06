// =============================================================================
// Crisis System — Data Maintenance Utilities
// =============================================================================

import type { CountryEntry, CoverageReport, CrisisResource } from './types';
import { COUNTRY_DATABASE } from './data/countries';

/**
 * Generate a coverage report showing how many countries are at each level.
 */
export function getCoverageReport(): CoverageReport {
  const entries = Object.values(COUNTRY_DATABASE);
  return {
    total_countries: entries.length,
    verified_crisis_line: entries.filter((c) => c.coverage_level === 'VERIFIED_CRISIS_LINE').length,
    verified_support_line: entries.filter((c) => c.coverage_level === 'VERIFIED_SUPPORT_LINE').length,
    emergency_only: entries.filter((c) => c.coverage_level === 'EMERGENCY_ONLY').length,
    regional_fallback: entries.filter((c) => c.coverage_level === 'REGIONAL_FALLBACK').length,
    global_fallback: entries.filter((c) => c.coverage_level === 'GLOBAL_FALLBACK').length,
  };
}

/**
 * Get resources that haven't been verified in over 6 months.
 */
export function getStaleEntries(): Array<{ country: CountryEntry; resource: CrisisResource }> {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const cutoff = sixMonthsAgo.toISOString().split('T')[0];

  const stale: Array<{ country: CountryEntry; resource: CrisisResource }> = [];
  for (const country of Object.values(COUNTRY_DATABASE)) {
    for (const resource of country.resources) {
      if (resource.last_verified_at < cutoff) {
        stale.push({ country, resource });
      }
    }
  }
  return stale;
}

/**
 * Get countries that are at EMERGENCY_ONLY or below (need resource sourcing).
 */
export function getMissingResources(): CountryEntry[] {
  return Object.values(COUNTRY_DATABASE).filter(
    (c) =>
      c.coverage_level === 'EMERGENCY_ONLY' ||
      c.coverage_level === 'REGIONAL_FALLBACK' ||
      c.coverage_level === 'GLOBAL_FALLBACK'
  );
}

/**
 * Get resources marked as needs_review.
 */
export function getReviewQueue(): Array<{ country: CountryEntry; resource: CrisisResource }> {
  const queue: Array<{ country: CountryEntry; resource: CrisisResource }> = [];
  for (const country of Object.values(COUNTRY_DATABASE)) {
    for (const resource of country.resources) {
      if (resource.verification_status === 'needs_review') {
        queue.push({ country, resource });
      }
    }
  }
  return queue;
}

/**
 * Get countries grouped by coverage level for dashboard display.
 */
export function getCountriesByCoverage(): Record<string, CountryEntry[]> {
  const grouped: Record<string, CountryEntry[]> = {
    VERIFIED_CRISIS_LINE: [],
    VERIFIED_SUPPORT_LINE: [],
    EMERGENCY_ONLY: [],
    REGIONAL_FALLBACK: [],
    GLOBAL_FALLBACK: [],
  };

  for (const country of Object.values(COUNTRY_DATABASE)) {
    grouped[country.coverage_level]?.push(country);
  }

  return grouped;
}
