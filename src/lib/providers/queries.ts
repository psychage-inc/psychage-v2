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
} from './types';

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
// SEARCH PROVIDERS (uses server-side RPC — 20 rows max, all filtering in SQL)
// =============================================================================

const PAGE_SIZE = 20;

export async function searchProviders(params: ProviderSearchParams): Promise<ProviderCardSearchResult> {
  const page = params.page || 1;
  const perPage = params.per_page || PAGE_SIZE;
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
    p_sort: params.sort_by === 'name' ? 'name' : 'relevance',
    p_limit: perPage,
    p_offset: offset,
  });

  if (error) {
    console.error('Provider search error:', error);
    return { providers: [], total_count: 0, page, per_page: perPage, has_more: false };
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
      tier: application.tier,
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
