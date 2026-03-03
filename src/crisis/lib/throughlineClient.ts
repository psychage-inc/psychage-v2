/**
 * THROUGHLINE API CLIENT
 *
 * ThroughLine (throughlinecare.com): World's largest verified crisis helpline database.
 * Used by IASP, Meta, YouTube, Reddit.
 *
 * 1,300+ helplines across 175+ countries, maintained daily.
 *
 * Caching: 24hr TTL in Supabase to reduce API calls and improve performance.
 */

import type { CrisisResource } from '../types/crisis.types';
import { getFallbackResourcesByCountry } from '../data/fallbackResources';

interface ThroughLineAPIResponse {
  resources: ThroughLineResource[];
  meta: {
    country: string;
    total: number;
  };
}

interface ThroughLineResource {
  id: string;
  name: string;
  country_code: string;
  phone?: string;
  text?: string;
  chat_url?: string;
  available_24_7: boolean;
  hours?: string;
  languages: string[];
  topics: string[];
  rank: number;
  verified_date: string;
}

/**
 * Fetch crisis resources from ThroughLine API (via our proxy)
 */
export async function fetchCrisisResources(
  countryCode: string,
  options?: {
    topic?: string;
    language?: string;
  }
): Promise<CrisisResource[]> {
  try {
    // TODO: Replace with actual API call when keys are available
    // const response = await fetch('/api/throughline', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ countryCode, ...options }),
    // });

    // if (!response.ok) {
    //   throw new Error('ThroughLine API request failed');
    // }

    // const data: ThroughLineAPIResponse = await response.json();
    // return normalizeThroughLineResources(data.resources);

    // For now, use fallback resources
    return getFallbackResourcesByCountry(countryCode);
  } catch (error) {
    console.error('[ThroughLine Client Error]', error);
    // Always fall back to static resources — never fail
    return getFallbackResourcesByCountry(countryCode);
  }
}

/**
 * Normalize ThroughLine API response to our internal format
 */
function normalizeThroughLineResources(resources: ThroughLineResource[]): CrisisResource[] {
  return resources.map((r) => ({
    id: r.id,
    organizationName: r.name,
    countryCode: r.country_code,
    countryName: '', // TODO: Map country code to name
    phoneNumber: r.phone || null,
    textOption: r.text || null,
    chatUrl: r.chat_url || null,
    isAvailable24_7: r.available_24_7,
    operatingHours: r.hours || null,
    languages: r.languages,
    topics: r.topics,
    isVerified: true,
    lastVerified: new Date(r.verified_date),
    rank: r.rank,
  }));
}

/**
 * Check if cached resources exist and are fresh (<24 hours old)
 */
export async function getCachedResources(countryCode: string): Promise<CrisisResource[] | null> {
  try {
    // TODO: Query Supabase crisis_resources_cache table
    // Check if expires_at > NOW()
    // Return cached resources if fresh, null if stale
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Cache resources in Supabase with 24hr TTL
 */
export async function cacheResources(
  countryCode: string,
  resources: CrisisResource[]
): Promise<void> {
  try {
    // TODO: Upsert to Supabase crisis_resources_cache
    // Set expires_at = NOW() + INTERVAL '24 hours'
  } catch (error) {
    // Silent failure — caching is optimization, not critical path
    console.error('[Resource Cache Error]', error);
  }
}
