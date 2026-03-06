// =============================================================================
// Crisis System — API-Ready Adapter
// =============================================================================
//
// This adapter provides a clean interface for switching between local data
// and a future external API (e.g., ThroughLine). When the API becomes available:
//
// 1. Implement ThroughLineProvider implementing CrisisDataProvider
// 2. Register it via setProvider()
// 3. The engine will try the API first, falling back to local data on failure
//
// No UI changes needed — the adapter exposes the same ResolvedCrisisResult.
// =============================================================================

import type { CrisisDataProvider, ResolvedCrisisResult } from './types';
import { getResourcesForCountry as getLocalResources } from './engine';

/** Local data provider — always available, reads from countries.ts */
class LocalDataProvider implements CrisisDataProvider {
  getResourcesForCountry(iso2: string): ResolvedCrisisResult {
    return getLocalResources(iso2);
  }

  isAvailable(): boolean {
    return true;
  }
}

// Active provider defaults to local
let activeProvider: CrisisDataProvider = new LocalDataProvider();
const localFallback = new LocalDataProvider();

/**
 * Set a custom data provider (e.g., when API becomes available).
 * The local provider is always kept as a fallback.
 */
export function setProvider(provider: CrisisDataProvider): void {
  activeProvider = provider;
}

/** Reset to local data provider */
export function resetProvider(): void {
  activeProvider = localFallback;
}

/**
 * Get crisis resources through the active provider.
 * Falls back to local data if the active provider fails or is unavailable.
 */
export function getResources(iso2: string): ResolvedCrisisResult {
  if (activeProvider.isAvailable()) {
    try {
      return activeProvider.getResourcesForCountry(iso2);
    } catch {
      // Provider failed — fall back to local
      return localFallback.getResourcesForCountry(iso2);
    }
  }
  return localFallback.getResourcesForCountry(iso2);
}
