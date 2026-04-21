// =============================================================================
// Psychage AI Help — Provider Directory Integration
// =============================================================================
// Queries the main `providers` table (not `ai_providers`) to ensure
// suspended/removed providers are never recommended by MindMate.

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  ProviderResult,
  ProviderSearchCriteria,
  ProviderSuggestion,
} from './types';

// Joined select matching the provider directory pattern (queries.ts)
// Aliases map schema column names to the field names consumers expect:
//   credentials_suffix → credentials, telehealth_available → telehealth,
//   website_url → website, state_province → state, country_code → country
const AI_PROVIDER_SELECT = `
  id,
  display_name,
  credentials:credentials_suffix,
  bio,
  website:website_url,
  phone,
  telehealth:telehealth_available,
  tier,
  status,
  provider_type:provider_types(name),
  locations:provider_locations(city, state:state_province, country:country_code),
  specialties:provider_specialties(specialty:specialties(name, slug)),
  languages:provider_languages(language:languages_lookup(name, code))
`;

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
    .from('providers')
    .select(AI_PROVIDER_SELECT, { count: 'exact' })
    .in('status', ['active', 'seeded']);

  // Filter by location (city/state from provider_locations)
  if (criteria.location) {
    const { country, city } = parseLocation(criteria.location);

    if (country || city) {
      // We need to filter on the joined locations — use a subquery approach
      // For simplicity, filter after fetch for location (Supabase nested filters are limited)
    }
  }

  // Sort: tier (premium first), then alphabetical
  query = query
    .order('tier', { ascending: false })
    .order('display_name')
    .range(offset, offset + limit * 3 - 1); // Fetch extra to allow post-filtering

  const { data, error, count } = await query;

  if (error) {
    console.error('Provider search error:', error);
    return {
      providers: [],
      searchCriteria: criteria,
      totalMatches: 0,
    };
  }

  // Map and post-filter results
  let providers: ProviderResult[] = (data ?? []).map((row: Record<string, unknown>) => {
    const locations = (row.locations as { city: string; state: string | null; country: string }[]) || [];
    const primaryLocation = locations[0] || { city: '', state: null, country: '' };
    const specialties = ((row.specialties as { specialty: { name: string; slug: string } }[]) || [])
      .map(s => s.specialty?.name)
      .filter(Boolean);
    const languages = ((row.languages as { language: { name: string; code: string } }[]) || [])
      .map(l => l.language?.name)
      .filter(Boolean);
    const providerType = (row.provider_type as { name: string } | null)?.name || 'therapist';

    return {
      id: row.id as string,
      name: (row.display_name as string) || 'Provider',
      credentials: (row.credentials as string) || '',
      providerType: providerType as ProviderResult['providerType'],
      specialties,
      city: primaryLocation.city,
      state: primaryLocation.state,
      country: primaryLocation.country,
      telehealthAvailable: (row.telehealth as boolean) || false,
      languages,
      bio: (row.bio as string) || null,
      website: (row.website as string) || null,
      isVerified: (row.tier as string) !== 'free',
      listingTier: ((row.tier as string) === 'premium' ? 'premium' : 'basic') as ProviderResult['listingTier'],
    };
  });

  // Apply post-filters that can't be done in the Supabase query
  if (criteria.location) {
    const { country, city } = parseLocation(criteria.location);
    providers = providers.filter(p => {
      if (country && p.country !== country) return false;
      if (city && !p.city.toLowerCase().includes(city.toLowerCase())) return false;
      return true;
    });
  }

  if (criteria.specialty) {
    const spec = criteria.specialty.toLowerCase();
    providers = providers.filter(p =>
      p.specialties.some(s => s.toLowerCase().includes(spec))
    );
  }

  if (criteria.providerType) {
    providers = providers.filter(p =>
      p.providerType === criteria.providerType
    );
  }

  if (criteria.telehealth) {
    providers = providers.filter(p => p.telehealthAvailable);
  }

  if (criteria.language) {
    const lang = criteria.language.toLowerCase();
    providers = providers.filter(p =>
      p.languages.some(l => l.toLowerCase().includes(lang))
    );
  }

  // Trim to requested limit
  const trimmed = providers.slice(0, limit);

  return {
    providers: trimmed,
    searchCriteria: criteria,
    totalMatches: count ?? trimmed.length,
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
