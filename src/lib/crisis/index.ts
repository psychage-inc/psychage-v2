// =============================================================================
// Psychage Crisis Resource System — Public API
// =============================================================================

// Types
export type {
  CoverageLevel,
  ResourceType,
  SourcePriority,
  VerificationStatus,
  ConfidenceLevel,
  CrisisResource,
  CountryEntry,
  ResolvedCrisisResult,
  CountryResolutionOptions,
  CoverageReport,
  CrisisDataProvider,
  Severity,
} from './types';

// Engine — resource resolution
export {
  getResourcesForCountry,
  getCallableResources,
  getPrimaryCrisisLine,
  getCountryEntry,
  getCountriesWithResources,
  getCountriesByRegion,
  searchCountries,
} from './engine';

// Geo — country detection
export {
  resolveCountry,
  saveCountryPreference,
  loadCountryPreference,
  clearCountryPreference,
} from './geo';

// Adapter — API-ready provider
export { getResources, setProvider, resetProvider } from './adapter';

// Maintenance — data quality
export {
  getCoverageReport,
  getStaleEntries,
  getMissingResources,
  getReviewQueue,
  getCountriesByCoverage,
} from './maintenance';

// Data — direct access (for advanced use)
export { COUNTRY_DATABASE, ALL_COUNTRY_CODES } from './data/countries';
export { GLOBAL_FALLBACKS, REGIONAL_FALLBACKS } from './data/fallbacks';
