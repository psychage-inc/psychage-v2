// =============================================================================
// Provider Directory V2 — Supabase Queries
// =============================================================================

import { supabase } from '@/lib/supabaseClient';
import type {
  ProviderWithDetails,
  ProviderCardData,
  ProviderCardSearchResult,
  ProviderType,
  Specialty,
  LanguageLookup,
  CulturalCompetency,
  InsurancePlan,
  ProviderSearchParams,
  ProviderApplication,
  ProviderLocation,
  ProviderStatus,
  ProviderTier,
} from './types';
import { isProviderVerified } from '@/lib/providers/trust-badge';
import { providers as mockProviders } from '@/data/providers';
import type { Provider } from '@/types/models';

// --- Joined select for provider queries ---
const PROVIDER_SELECT = `
  *,
  provider_type:provider_types(*),
  locations:provider_locations(*),
  specialties:provider_specialties(specialty:specialties(*)),
  languages:provider_languages(language:languages_lookup(*), proficiency),
  cultural_competencies:provider_cultural_competencies(competency:cultural_competencies(*)),
  insurance_plans:provider_insurance(plan:insurance_plans(*))
`;

/**
 * Maps raw Supabase joined row to ProviderWithDetails.
 */
function mapProviderRow(row: Record<string, unknown>): ProviderWithDetails {
  const raw = row as Record<string, unknown>;
  return {
    ...raw,
    provider_type: raw.provider_type as ProviderType,
    locations: (raw.locations as ProviderLocation[]) || [],
    specialties: ((raw.specialties as { specialty: Specialty }[]) || []).map(s => s.specialty),
    languages: ((raw.languages as { language: LanguageLookup; proficiency: string }[]) || []).map(l => ({
      ...l.language,
      proficiency: l.proficiency,
    })),
    cultural_competencies: ((raw.cultural_competencies as { competency: CulturalCompetency }[]) || []).map(c => c.competency),
    insurance_plans: ((raw.insurance_plans as { plan: InsurancePlan }[]) || []).map(i => i.plan),
  } as ProviderWithDetails;
}

// =============================================================================
// SEARCH HELPERS — mapping, filtering, fallback
// =============================================================================

/**
 * Maps a ProviderWithDetails (from direct query) to ProviderCardData (for UI cards).
 */
function mapToCardData(p: ProviderWithDetails): ProviderCardData {
  const loc = p.locations.find(l => l.is_primary) || p.locations[0] || null;
  return {
    id: p.id,
    display_name: p.display_name,
    credentials_suffix: p.credentials_suffix,
    bio: p.bio,
    photo_url: p.photo_url,
    status: p.status,
    tier: p.tier,
    practice_name: p.practice_name,
    phone: p.phone,
    email: p.email,
    website_url: p.website_url,
    appointment_url: p.appointment_url,
    npi_number: p.npi_number,
    telehealth_available: p.telehealth_available,
    in_person_available: p.in_person_available,
    is_accepting_patients: p.is_accepting_patients,
    verified_at: p.verified_at,
    trust_score_cached: p.trust_score_cached ?? null,
    provider_type_slug: p.provider_type?.slug || '',
    provider_type_label: p.provider_type?.label || '',
    primary_city: loc?.city || null,
    primary_state: loc?.state_province || null,
    specialty_tags: (p.specialties || []).map(s => ({ slug: s.slug, label: s.label, category: s.category })),
    language_tags: (p.languages || []).map(l => ({ code: l.code, label: l.label, native_label: l.native_label })),
    competency_tags: (p.cultural_competencies || []).map(c => ({ slug: c.slug, label: c.label })),
    insurance_tags: (p.insurance_plans || []).map(i => ({ name: i.name, carrier: i.carrier })),
  };
}

/**
 * Maps legacy mock Provider to ProviderCardData.
 */
function mapMockToCardData(p: Provider): ProviderCardData {
  const locationParts = p.location.split('(')[0].trim().split(',').map(s => s.trim());
  return {
    id: String(p.id),
    display_name: p.name,
    credentials_suffix: p.role || null,
    bio: p.bio || null,
    photo_url: p.image || null,
    status: 'active' as ProviderStatus,
    tier: 'free' as ProviderTier,
    practice_name: null,
    phone: null,
    email: null,
    website_url: null,
    appointment_url: null,
    npi_number: null,
    telehealth_available: p.isVideoVisit || false,
    in_person_available: !p.isVideoVisit,
    is_accepting_patients: p.availability !== 'Waitlist',
    verified_at: p.verified ? new Date().toISOString() : null,
    trust_score_cached: null,
    provider_type_slug: '',
    provider_type_label: p.role || '',
    primary_city: locationParts[0] || null,
    primary_state: locationParts[1] || null,
    specialty_tags: p.specialties.map(s => ({ slug: s.toLowerCase().replace(/\s+/g, '_'), label: s, category: 'condition' })),
    language_tags: p.languages.map(l => ({ code: l.toLowerCase().slice(0, 2), label: l, native_label: l })),
    competency_tags: [],
    insurance_tags: p.insurance.map(i => ({ name: i, carrier: i })),
  };
}

/**
 * Client-side filter for ProviderCardData.
 * Case-insensitive, partial-match, null-safe.
 */
function filterProviderCards(cards: ProviderCardData[], params: ProviderSearchParams): ProviderCardData[] {
  return cards.filter(p => {
    if (params.query) {
      const q = params.query.toLowerCase();
      const searchable = [
        p.display_name, p.practice_name, p.bio, p.credentials_suffix,
        p.provider_type_label, p.primary_city, p.primary_state,
        ...p.specialty_tags.map(s => s.label),
        ...p.language_tags.map(l => l.label),
        ...p.insurance_tags.map(i => `${i.carrier} ${i.name}`),
      ].filter(Boolean).map(s => s!.toLowerCase());
      if (!searchable.some(s => s.includes(q))) return false;
    }
    if (params.specialty_slugs?.length) {
      const slugs = p.specialty_tags.map(s => s.slug);
      if (!params.specialty_slugs.some(s => slugs.includes(s))) return false;
    }
    if (params.state && !p.primary_state?.toUpperCase().includes(params.state.toUpperCase())) return false;
    if (params.city && !p.primary_city?.toLowerCase().includes(params.city.toLowerCase())) return false;
    if (params.telehealth && !p.telehealth_available) return false;
    if (params.in_person && !p.in_person_available) return false;
    if (params.accepting_patients && !p.is_accepting_patients) return false;

    // Verification status filter — matches RPC logic
    if (params.verification_status === 'verified') {
      if (!isProviderVerified(p.status, p.verified_at)) return false;
    }
    if (params.verification_status === 'listed') {
      if (p.status !== 'seeded' || p.verified_at != null) return false;
    }

    return true;
  });
}

/**
 * Sort ProviderCardData by the requested sort mode.
 */
function sortProviderCards(cards: ProviderCardData[], sortBy?: string): ProviderCardData[] {
  const sorted = [...cards];
  if (sortBy === 'name') {
    sorted.sort((a, b) => a.display_name.localeCompare(b.display_name));
  } else {
    // Relevance: elite > pro > free, then verified, then alphabetical
    const tierRank = (t: string) => t === 'elite' ? 0 : t === 'pro' ? 1 : 2;
    sorted.sort((a, b) => {
      const tierDiff = tierRank(a.tier) - tierRank(b.tier);
      if (tierDiff !== 0) return tierDiff;

      const aVerified = a.verified_at != null || a.status === 'verified' || a.status === 'active';
      const bVerified = b.verified_at != null || b.status === 'verified' || b.status === 'active';
      if (aVerified && !bVerified) return -1;
      if (!aVerified && bVerified) return 1;

      return a.display_name.localeCompare(b.display_name);
    });
  }
  return sorted;
}

// =============================================================================
// SEARCH PROVIDERS — cascading fallback: RPC → direct query → mock data
// =============================================================================

const PAGE_SIZE = 20;

/**
 * Try 1: Supabase RPC (server-side filtered, paginated search).
 */
async function searchViaRPC(params: ProviderSearchParams, page: number, perPage: number): Promise<ProviderCardSearchResult | null> {
  const offset = (page - 1) * perPage;

  const { data, error } = await supabase.rpc('search_providers_v2', {
    p_query: params.query || null,
    p_provider_type_ids: params.provider_type_ids?.length ? params.provider_type_ids : null,
    p_specialty_slugs: params.specialty_slugs?.length ? params.specialty_slugs : null,
    p_language_ids: params.language_ids?.length ? params.language_ids : null,
    p_competency_ids: params.competency_ids?.length ? params.competency_ids : null,
    p_insurance_plan_ids: params.insurance_plan_ids?.length ? params.insurance_plan_ids : null,
    p_telehealth: params.telehealth ?? null,
    p_in_person: params.in_person ?? null,
    p_accepting: params.accepting_patients ?? null,
    p_state: params.state || null,
    p_city: params.city || null,
    p_verification_status: params.verification_status || null,
    p_sort: params.sort_by === 'name' ? 'name' : 'relevance',
    p_limit: perPage,
    p_offset: offset,
  });

  if (error) {
    console.warn('RPC search_providers_v2 failed, will try fallback:', error.message);
    return null;
  }

  const rows = (data || []) as Array<ProviderCardData & { total_count: number }>;
  const totalCount = rows[0]?.total_count ?? 0;

  const providers: ProviderCardData[] = rows.map(row => ({
    id: row.id,
    display_name: row.display_name,
    credentials_suffix: row.credentials_suffix,
    bio: row.bio,
    photo_url: row.photo_url,
    status: row.status,
    tier: row.tier,
    practice_name: row.practice_name,
    phone: row.phone,
    email: row.email,
    website_url: row.website_url,
    appointment_url: row.appointment_url,
    npi_number: row.npi_number,
    telehealth_available: row.telehealth_available,
    in_person_available: row.in_person_available,
    is_accepting_patients: row.is_accepting_patients,
    verified_at: row.verified_at,
    trust_score_cached: row.trust_score_cached ?? null,
    provider_type_slug: row.provider_type_slug,
    provider_type_label: row.provider_type_label,
    primary_city: row.primary_city,
    primary_state: row.primary_state,
    specialty_tags: row.specialty_tags || [],
    language_tags: row.language_tags || [],
    competency_tags: row.competency_tags || [],
    insurance_tags: row.insurance_tags || [],
  }));

  return {
    providers,
    total_count: totalCount,
    page,
    per_page: perPage,
    has_more: offset + perPage < totalCount,
  };
}

/**
 * Try 2: Direct Supabase query with server-side filters where possible,
 * then client-side filtering for the rest.
 */
async function searchViaDirectQuery(params: ProviderSearchParams, page: number, perPage: number): Promise<ProviderCardSearchResult | null> {
  let query = supabase
    .from('providers')
    .select(PROVIDER_SELECT)
    .in('status', ['active', 'seeded'])
    .order('display_name')
    .limit(1000);

  // Apply server-side filters where Supabase query builder supports them
  if (params.query) {
    query = query.or(
      `display_name.ilike.%${params.query}%,practice_name.ilike.%${params.query}%,credentials_suffix.ilike.%${params.query}%`
    );
  }
  if (params.telehealth) query = query.eq('telehealth_available', true);
  if (params.in_person) query = query.eq('in_person_available', true);
  if (params.accepting_patients) query = query.eq('is_accepting_patients', true);
  if (params.provider_type_ids?.length === 1) {
    query = query.eq('provider_type_id', params.provider_type_ids[0]);
  }

  const { data, error } = await query;

  if (error || !data || data.length === 0) {
    if (error) console.warn('Direct provider query failed, will try mock data:', error.message);
    return null;
  }

  const allCards = data.map(row => mapToCardData(mapProviderRow(row)));
  const filtered = filterProviderCards(allCards, params);
  const sorted = sortProviderCards(filtered, params.sort_by);
  const offset = (page - 1) * perPage;
  const paged = sorted.slice(offset, offset + perPage);

  return {
    providers: paged,
    total_count: filtered.length,
    page,
    per_page: perPage,
    has_more: offset + perPage < filtered.length,
  };
}

/**
 * Try 3: Mock data fallback with client-side filtering.
 */
function searchViaMockData(params: ProviderSearchParams, page: number, perPage: number): ProviderCardSearchResult {
  const allCards = mockProviders.map(mapMockToCardData);
  const filtered = filterProviderCards(allCards, params);
  const sorted = sortProviderCards(filtered, params.sort_by);
  const offset = (page - 1) * perPage;
  const paged = sorted.slice(offset, offset + perPage);

  return {
    providers: paged,
    total_count: filtered.length,
    page,
    per_page: perPage,
    has_more: offset + perPage < filtered.length,
  };
}

/**
 * Main search entry point — cascades: RPC → direct query → mock data.
 * Always returns results (never silently fails).
 */
export async function searchProviders(params: ProviderSearchParams): Promise<ProviderCardSearchResult> {
  const page = params.page || 1;
  const perPage = params.per_page || PAGE_SIZE;

  // Try 1: RPC
  try {
    const rpcResult = await searchViaRPC(params, page, perPage);
    if (rpcResult) return rpcResult;
  } catch (err) {
    console.warn('RPC search threw:', err);
  }

  // Try 2: Direct query
  try {
    const directResult = await searchViaDirectQuery(params, page, perPage);
    if (directResult) return directResult;
  } catch (err) {
    console.warn('Direct query threw:', err);
  }

  // Try 3: Mock data (always succeeds)
  return searchViaMockData(params, page, perPage);
}

// =============================================================================
// GET SINGLE PROVIDER
// =============================================================================

export async function getProviderById(id: string): Promise<ProviderWithDetails | null> {
  const { data, error } = await supabase
    .from('providers')
    .select(PROVIDER_SELECT)
    .eq('id', id)
    .maybeSingle();

  if (error || !data) {
    console.error('Provider fetch error:', error);
    return null;
  }

  return mapProviderRow(data);
}

// =============================================================================
// GET PROVIDER BY NPI (for claim flow)
// =============================================================================

export async function getProviderByNPI(npi: string): Promise<ProviderWithDetails | null> {
  const { data, error } = await supabase
    .from('providers')
    .select(PROVIDER_SELECT)
    .eq('npi_number', npi)
    .in('status', ['seeded', 'active'])
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapProviderRow(data);
}

// =============================================================================
// LOOKUP TABLE FETCHERS
// =============================================================================

export async function getProviderTypes(): Promise<ProviderType[]> {
  const { data, error } = await supabase
    .from('provider_types')
    .select('*')
    .order('sort_order');

  if (error) {
    console.error('Error fetching provider types:', error);
    return [];
  }
  return data || [];
}

export async function getSpecialties(): Promise<Specialty[]> {
  const { data, error } = await supabase
    .from('specialties')
    .select('*')
    .order('sort_order');

  if (error) {
    console.error('Error fetching specialties:', error);
    return [];
  }
  return data || [];
}

export async function getLanguages(): Promise<LanguageLookup[]> {
  const { data, error } = await supabase
    .from('languages_lookup')
    .select('*')
    .order('label');

  if (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
  return data || [];
}

export async function getCulturalCompetencies(): Promise<CulturalCompetency[]> {
  const { data, error } = await supabase
    .from('cultural_competencies')
    .select('*')
    .order('label');

  if (error) {
    console.error('Error fetching cultural competencies:', error);
    return [];
  }
  return data || [];
}

export async function getInsurancePlans(): Promise<InsurancePlan[]> {
  const { data, error } = await supabase
    .from('insurance_plans')
    .select('*')
    .order('carrier')
    .order('name');

  if (error) {
    console.error('Error fetching insurance plans:', error);
    return [];
  }
  return data || [];
}

// =============================================================================
// PROVIDER APPLICATION (ONBOARDING)
// =============================================================================

export async function submitProviderApplication(
  application: ProviderApplication,
  userId: string
): Promise<{ id: string } | { error: string }> {
  // Insert provider
  const { data: provider, error: providerError } = await supabase
    .from('providers')
    .insert({
      user_id: userId,
      npi_number: application.npi_number || null,
      license_number: application.license_number || null,
      license_state: application.license_state || null,
      provider_type_id: application.provider_type_id,
      status: 'submitted',
      // TODO: Allow application.tier once Stripe payment is verified (Phase 2).
      // Until then, all providers start on 'free' to prevent unpaid premium claims.
      tier: 'free' as ProviderTier,
      source: 'manual',
      display_name: application.display_name,
      credentials_suffix: application.credentials_suffix,
      bio: application.bio,
      practice_name: application.practice_name || null,
      practice_type: application.practice_type || null,
      phone: application.phone || null,
      email: application.email,
      website_url: application.website_url || null,
      appointment_url: application.appointment_url || null,
      telehealth_available: application.telehealth_available,
      in_person_available: application.in_person_available,
    })
    .select('id')
    .single();

  if (providerError || !provider) {
    console.error('Error creating provider:', providerError);
    return { error: providerError?.message || 'Failed to create provider' };
  }

  const providerId = provider.id;

  // Insert location
  if (application.location.city || application.location.address_line1) {
    await supabase.from('provider_locations').insert({
      provider_id: providerId,
      address_line1: application.location.address_line1 || null,
      address_line2: application.location.address_line2 || null,
      city: application.location.city || null,
      state_province: application.location.state_province || null,
      postal_code: application.location.postal_code || null,
      is_primary: true,
    });
  }

  // Insert specialties
  if (application.specialty_ids.length > 0) {
    await supabase.from('provider_specialties').insert(
      application.specialty_ids.map(sid => ({ provider_id: providerId, specialty_id: sid }))
    );
  }

  // Insert languages
  if (application.language_ids.length > 0) {
    await supabase.from('provider_languages').insert(
      application.language_ids.map(lid => ({ provider_id: providerId, language_id: lid }))
    );
  }

  // Insert cultural competencies
  if (application.competency_ids?.length) {
    await supabase.from('provider_cultural_competencies').insert(
      application.competency_ids.map(cid => ({ provider_id: providerId, competency_id: cid }))
    );
  }

  // Insert insurance plans
  if (application.insurance_plan_ids?.length) {
    await supabase.from('provider_insurance').insert(
      application.insurance_plan_ids.map(iid => ({ provider_id: providerId, insurance_plan_id: iid }))
    );
  }

  return { id: providerId };
}

// =============================================================================
// CLAIM PROVIDER (for NPI-seeded profiles)
// DEPRECATED: use claim-provider Edge Function via supabase.functions.invoke().
// Kept for compatibility. See Phase 0.5 Discovery #1.
// =============================================================================

export async function claimProvider(
  providerId: string,
  userId: string,
  npiNumber: string
): Promise<{ success: boolean; error?: string }> {
  // Verify the provider exists, is seeded, and matches the NPI
  const { data: provider, error: fetchError } = await supabase
    .from('providers')
    .select('id, npi_number, status')
    .eq('id', providerId)
    .eq('status', 'seeded')
    .maybeSingle();

  if (fetchError || !provider) {
    return { success: false, error: 'Provider not found or already claimed' };
  }

  if (provider.npi_number !== npiNumber) {
    return { success: false, error: 'NPI number does not match this provider' };
  }

  // Claim it
  const { error: updateError } = await supabase
    .from('providers')
    .update({
      user_id: userId,
      status: 'claimed',
      source: 'claim',
    })
    .eq('id', providerId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  // Record verification
  await supabase.from('provider_verifications').insert({
    provider_id: providerId,
    verification_type: 'npi_check',
    status: 'passed',
    details: { npi_number: npiNumber, claimed_by: userId },
    verified_at: new Date().toISOString(),
  });

  return { success: true };
}

// =============================================================================
// PROVIDER COUNT (for landing page, etc.)
// =============================================================================

export async function getProviderCount(): Promise<number> {
  const { count, error } = await supabase
    .from('providers')
    .select('id', { count: 'exact', head: true })
    .in('status', ['active', 'seeded']);

  if (error) {
    console.error('Error fetching provider count:', error);
    return 0;
  }
  return count ?? 0;
}
