// =============================================================================
// Psychage AI Help — Provider Directory Integration
// =============================================================================

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  ProviderResult,
  ProviderSearchCriteria,
  ProviderSuggestion,
  Provider,
} from './types';

// =============================================================================
// Provider Search
// =============================================================================

export async function searchProviders(
  criteria: ProviderSearchCriteria,
  supabase: SupabaseClient
): Promise<ProviderSuggestion> {
  const limit = criteria.limit ?? 5;
  const page = criteria.page ?? 1;
  const offset = (page - 1) * limit;

  let query = supabase
    .from('ai_providers')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .eq('is_verified', true);

  // Filter by country (inferred from location string)
  if (criteria.location) {
    const { country, city } = parseLocation(criteria.location);

    if (country) {
      query = query.eq('location_country', country);
    }

    if (city) {
      query = query.ilike('location_city', `%${city}%`);
    }
  }

  // Filter by specialty
  if (criteria.specialty) {
    query = query.contains('specialties', [criteria.specialty.toLowerCase()]);
  }

  // Filter by provider type
  if (criteria.providerType) {
    query = query.eq('provider_type', criteria.providerType);
  }

  // Filter by telehealth
  if (criteria.telehealth) {
    query = query.eq('telehealth_available', true);
  }

  // Filter by language
  if (criteria.language) {
    query = query.contains('languages', [criteria.language.toLowerCase()]);
  }

  // Sort: verified first, then premium tier, then alphabetical
  query = query
    .order('listing_tier', { ascending: false }) // 'premium' > 'basic'
    .order('name')
    .range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('Provider search error:', error);
    return {
      providers: [],
      searchCriteria: criteria,
      totalMatches: 0,
    };
  }

  const providers: ProviderResult[] = (data ?? []).map(
    (p: Provider) => ({
      id: p.id,
      name: p.name,
      credentials: p.credentials,
      providerType: p.provider_type,
      specialties: p.specialties,
      city: p.location_city,
      state: p.location_state,
      country: p.location_country,
      telehealthAvailable: p.telehealth_available,
      languages: p.languages,
      bio: p.bio,
      website: p.website,
      isVerified: p.is_verified,
      listingTier: p.listing_tier,
    })
  );

  return {
    providers,
    searchCriteria: criteria,
    totalMatches: count ?? providers.length,
  };
}

// =============================================================================
// NLP-Based Criteria Extraction from Natural Language
// =============================================================================

export function extractProviderCriteria(
  query: string,
  entities: { location?: string; providerType?: string; conditions?: string[] }
): ProviderSearchCriteria {
  const criteria: ProviderSearchCriteria = {};

  // Location from entities
  if (entities.location) {
    criteria.location = entities.location;
  }

  // Provider type from entities
  if (entities.providerType) {
    criteria.providerType = entities.providerType as ProviderSearchCriteria['providerType'];
  }

  // Map conditions to specialties
  if (entities.conditions && entities.conditions.length > 0) {
    criteria.specialty = entities.conditions[0]; // Primary condition
  }

  // Check for telehealth keywords
  if (/\b(online|telehealth|virtual|remote|video)\b/i.test(query)) {
    criteria.telehealth = true;
  }

  // Check for language preferences
  const languageMatch = query.match(
    /\b(spanish|french|portuguese|swedish|arabic|mandarin|chinese|hindi|korean|japanese|german)[\s-]?speaking\b/i
  );
  if (languageMatch) {
    criteria.language = mapLanguageToCode(languageMatch[1]);
  }

  return criteria;
}

// =============================================================================
// Format Provider Results for AI Response
// =============================================================================

export function formatProviderSuggestion(suggestion: ProviderSuggestion): string {
  if (suggestion.providers.length === 0) {
    return "I wasn't able to find providers matching your criteria in our directory. You can browse all providers at [Find Care](/providers), or try broadening your search criteria.";
  }

  const lines = [
    `I found ${suggestion.totalMatches} provider${suggestion.totalMatches === 1 ? '' : 's'} matching your criteria. Here are some top matches:\n`,
  ];

  for (const p of suggestion.providers) {
    const details = [
      `**${p.name}**, ${p.credentials}`,
      `  - Type: ${formatProviderType(p.providerType)}`,
      `  - Specialties: ${p.specialties.join(', ')}`,
      `  - Location: ${p.city}${p.state ? `, ${p.state}` : ''}, ${p.country}`,
    ];

    if (p.telehealthAvailable) {
      details.push('  - Telehealth available');
    }

    if (p.languages.length > 1) {
      details.push(`  - Languages: ${p.languages.join(', ')}`);
    }

    lines.push(details.join('\n'));
    lines.push('');
  }

  lines.push(
    'You can view full profiles and more providers at [Find Care](/providers).'
  );

  return lines.join('\n');
}

// =============================================================================
// Helpers
// =============================================================================

const COUNTRY_CODES: Record<string, string> = {
  'united states': 'US',
  us: 'US',
  usa: 'US',
  america: 'US',
  'united kingdom': 'GB',
  uk: 'GB',
  england: 'GB',
  britain: 'GB',
  canada: 'CA',
  australia: 'AU',
  sweden: 'SE',
  brazil: 'BR',
  spain: 'ES',
  india: 'IN',
  germany: 'DE',
  france: 'FR',
  portugal: 'PT',
};

const CITY_COUNTRY_MAP: Record<string, string> = {
  'new york': 'US',
  'los angeles': 'US',
  chicago: 'US',
  'san francisco': 'US',
  austin: 'US',
  london: 'GB',
  manchester: 'GB',
  toronto: 'CA',
  montreal: 'CA',
  sydney: 'AU',
  melbourne: 'AU',
  stockholm: 'SE',
  'são paulo': 'BR',
  'sao paulo': 'BR',
  madrid: 'ES',
  mumbai: 'IN',
};

function parseLocation(location: string): {
  country: string | null;
  city: string | null;
} {
  const lower = location.toLowerCase().trim();

  // Check if it's a known country
  const countryCode = COUNTRY_CODES[lower];
  if (countryCode) {
    return { country: countryCode, city: null };
  }

  // Check if it's a known city
  for (const [city, country] of Object.entries(CITY_COUNTRY_MAP)) {
    if (lower.includes(city)) {
      return { country, city: location.trim() };
    }
  }

  // Try "city, country" format
  const parts = location.split(',').map((p) => p.trim());
  if (parts.length >= 2) {
    const lastPart = parts[parts.length - 1].toLowerCase();
    const code = COUNTRY_CODES[lastPart] ?? lastPart.toUpperCase();
    return { country: code.length <= 3 ? code : null, city: parts[0] };
  }

  // Best guess: treat as city name
  return { country: null, city: location.trim() };
}

const LANGUAGE_MAP: Record<string, string> = {
  spanish: 'es',
  french: 'fr',
  portuguese: 'pt',
  swedish: 'sv',
  arabic: 'ar',
  mandarin: 'zh',
  chinese: 'zh',
  hindi: 'hi',
  korean: 'ko',
  japanese: 'ja',
  german: 'de',
};

function mapLanguageToCode(language: string): string {
  return LANGUAGE_MAP[language.toLowerCase()] ?? language.toLowerCase().slice(0, 2);
}

function formatProviderType(type: string): string {
  const map: Record<string, string> = {
    psychologist: 'Psychologist',
    therapist: 'Therapist',
    counselor: 'Counselor',
    psychiatrist: 'Psychiatrist',
    social_worker: 'Social Worker',
  };
  return map[type] ?? type;
}
