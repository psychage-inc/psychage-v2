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
  ProviderTier,
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
 * Strip leading/trailing junk punctuation from raw NPI-sourced display names
 * (e.g. "/STALBURN VANSLUYTMAN, L.C.S.W" → "STALBURN VANSLUYTMAN, L.C.S.W").
 */
function cleanDisplayName(name: string | null | undefined): string {
  if (!name) return '';
  return name
    .replace(/^[\s/:.\-]+|[\s/:.\-]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

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
// SEARCH HELPERS — mapping
// =============================================================================

// =============================================================================
// SEARCH PROVIDERS — database search (search_providers_v3) only
// =============================================================================

const PAGE_SIZE = 20;

/**
 * One page of results from the search_providers_v3 RPC. Throws on failure:
 * the caller shows an error state, never substitute data.
 */
async function searchViaRPC(params: ProviderSearchParams, page: number, perPage: number): Promise<ProviderCardSearchResult> {
  const offset = (page - 1) * perPage;

  const { data, error } = await supabase.rpc('search_providers_v3', {
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
    throw new Error(`Provider search failed: ${error.message}`);
  }

  const rows = (data || []) as Array<ProviderCardData & { total_count: number }>;
  const totalCount = rows[0]?.total_count ?? 0;

  const providers: ProviderCardData[] = rows.map(row => ({
    id: row.id,
    display_name: cleanDisplayName(row.display_name) || row.display_name,
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
 * Main search entry point. Throws when the database search fails.
 * If city+state combo yields zero, auto-drops state and retries with city only —
 * surfaces `dropped_filters: ['state']` so UI can show the recovery.
 */
export async function searchProviders(params: ProviderSearchParams): Promise<ProviderCardSearchResult> {
  const page = params.page || 1;
  const perPage = params.per_page || PAGE_SIZE;
  const result = await searchViaRPC(params, page, perPage);

  if (
    params.city &&
    params.state &&
    result.total_count === 0
  ) {
    const retry = await searchViaRPC({ ...params, state: undefined }, page, perPage);
    if (retry.total_count > 0) {
      return { ...retry, dropped_filters: ['state'] };
    }
  }

  return result;
}

// =============================================================================
// FILTER BOTTLENECK ANALYSIS
// =============================================================================

export interface FilterBottleneck {
  filterKey: string;
  filterLabel: string;
  filterValue: string;
  countWithout: number;
  removeParams: Partial<ProviderSearchParams>;
}

const FILTER_LABELS: Record<string, string> = {
  query: 'Search text',
  specialty_slugs: 'Specialties',
  provider_type_ids: 'Provider type',
  language_ids: 'Languages',
  competency_ids: 'Cultural competencies',
  insurance_plan_ids: 'Insurance',
  state: 'State',
  city: 'City',
  telehealth: 'Telehealth',
  in_person: 'In-person',
  accepting_patients: 'Accepting patients',
  verification_status: 'Verification',
};

/**
 * When a filtered search returns 0 results, analyze which filters are the
 * biggest bottlenecks by issuing count queries with each filter removed.
 * Returns the top 3 filters whose removal yields the most results.
 */
export async function analyzeFilterBottlenecks(
  params: ProviderSearchParams
): Promise<FilterBottleneck[]> {
  try {
    // Build list of active filters and their "removed" variants
    const candidates: {
      key: string;
      label: string;
      value: string;
      paramsWithout: ProviderSearchParams;
      removeParams: Partial<ProviderSearchParams>;
    }[] = [];

    if (params.query) {
      candidates.push({
        key: 'query',
        label: FILTER_LABELS.query,
        value: params.query,
        paramsWithout: { ...params, query: undefined },
        removeParams: { query: undefined },
      });
    }
    if (params.specialty_slugs?.length) {
      candidates.push({
        key: 'specialty_slugs',
        label: FILTER_LABELS.specialty_slugs,
        value: params.specialty_slugs.join(', '),
        paramsWithout: { ...params, specialty_slugs: undefined },
        removeParams: { specialty_slugs: undefined },
      });
    }
    if (params.provider_type_ids?.length) {
      candidates.push({
        key: 'provider_type_ids',
        label: FILTER_LABELS.provider_type_ids,
        value: params.provider_type_ids.join(', '),
        paramsWithout: { ...params, provider_type_ids: undefined },
        removeParams: { provider_type_ids: undefined },
      });
    }
    if (params.language_ids?.length) {
      candidates.push({
        key: 'language_ids',
        label: FILTER_LABELS.language_ids,
        value: params.language_ids.join(', '),
        paramsWithout: { ...params, language_ids: undefined },
        removeParams: { language_ids: undefined },
      });
    }
    if (params.competency_ids?.length) {
      candidates.push({
        key: 'competency_ids',
        label: FILTER_LABELS.competency_ids,
        value: params.competency_ids.join(', '),
        paramsWithout: { ...params, competency_ids: undefined },
        removeParams: { competency_ids: undefined },
      });
    }
    if (params.insurance_plan_ids?.length) {
      candidates.push({
        key: 'insurance_plan_ids',
        label: FILTER_LABELS.insurance_plan_ids,
        value: params.insurance_plan_ids.join(', '),
        paramsWithout: { ...params, insurance_plan_ids: undefined },
        removeParams: { insurance_plan_ids: undefined },
      });
    }
    if (params.state) {
      candidates.push({
        key: 'state',
        label: FILTER_LABELS.state,
        value: params.state,
        paramsWithout: { ...params, state: undefined },
        removeParams: { state: undefined },
      });
    }
    if (params.city) {
      candidates.push({
        key: 'city',
        label: FILTER_LABELS.city,
        value: params.city,
        paramsWithout: { ...params, city: undefined },
        removeParams: { city: undefined },
      });
    }
    if (params.telehealth) {
      candidates.push({
        key: 'telehealth',
        label: FILTER_LABELS.telehealth,
        value: 'Yes',
        paramsWithout: { ...params, telehealth: undefined },
        removeParams: { telehealth: undefined },
      });
    }
    if (params.in_person) {
      candidates.push({
        key: 'in_person',
        label: FILTER_LABELS.in_person,
        value: 'Yes',
        paramsWithout: { ...params, in_person: undefined },
        removeParams: { in_person: undefined },
      });
    }
    if (params.accepting_patients) {
      candidates.push({
        key: 'accepting_patients',
        label: FILTER_LABELS.accepting_patients,
        value: 'Yes',
        paramsWithout: { ...params, accepting_patients: undefined },
        removeParams: { accepting_patients: undefined },
      });
    }
    if (params.verification_status) {
      candidates.push({
        key: 'verification_status',
        label: FILTER_LABELS.verification_status,
        value: params.verification_status,
        paramsWithout: { ...params, verification_status: undefined },
        removeParams: { verification_status: undefined },
      });
    }

    if (candidates.length === 0) return [];

    // Run count queries in parallel (per_page: 1 to minimize data transfer)
    const results = await Promise.allSettled(
      candidates.map(c =>
        searchProviders({ ...c.paramsWithout, per_page: 1, page: 1 })
      )
    );

    const bottlenecks: FilterBottleneck[] = [];
    for (let i = 0; i < candidates.length; i++) {
      const result = results[i];
      if (result.status === 'fulfilled' && result.value.total_count > 0) {
        bottlenecks.push({
          filterKey: candidates[i].key,
          filterLabel: candidates[i].label,
          filterValue: candidates[i].value,
          countWithout: result.value.total_count,
          removeParams: candidates[i].removeParams,
        });
      }
    }

    // Sort by count descending, return top 3
    bottlenecks.sort((a, b) => b.countWithout - a.countWithout);
    return bottlenecks.slice(0, 3);
  } catch (err) {
    console.warn('Filter bottleneck analysis failed:', err);
    return [];
  }
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

// Only the individual-clinician types backed by an NPI/NPPES mental-health
// taxonomy (see TAXONOMY_TO_PROVIDER_TYPE in npiMappers.ts) are browsable as
// provider-type cards. clinic / support_group / crisis_service aren't individual
// NPPES taxonomies, so they're excluded (crisis is surfaced via /crisis).
const NPI_PROVIDER_TYPE_SLUGS: ReadonlySet<string> = new Set([
  'therapist',
  'psychologist',
  'psychiatrist',
  'counselor',
  'social_worker',
]);

export async function getProviderTypes(): Promise<ProviderType[]> {
  const { data, error } = await supabase
    .from('provider_types')
    .select('*')
    .order('sort_order');

  if (error) {
    console.error('Error fetching provider types:', error);
    return [];
  }
  return (data || []).filter(t => NPI_PROVIDER_TYPE_SLUGS.has(t.slug));
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

  // Child-table inserts. PostgREST has no cross-table transaction, so a failure
  // here previously left a provider row with no location/specialties, invisible
  // to admins and search. Check each error; on failure, roll back the provider
  // row (best-effort) and report the failure instead of a false success.
  const childError = await (async (): Promise<string | null> => {
    if (application.location.city || application.location.address_line1) {
      const { error } = await supabase.from('provider_locations').insert({
        provider_id: providerId,
        address_line1: application.location.address_line1 || null,
        address_line2: application.location.address_line2 || null,
        city: application.location.city || null,
        state_province: application.location.state_province || null,
        postal_code: application.location.postal_code || null,
        is_primary: true,
      });
      if (error) return error.message;
    }

    if (application.specialty_ids.length > 0) {
      const { error } = await supabase.from('provider_specialties').insert(
        application.specialty_ids.map(sid => ({ provider_id: providerId, specialty_id: sid }))
      );
      if (error) return error.message;
    }

    if (application.language_ids.length > 0) {
      const { error } = await supabase.from('provider_languages').insert(
        application.language_ids.map(lid => ({ provider_id: providerId, language_id: lid }))
      );
      if (error) return error.message;
    }

    if (application.competency_ids?.length) {
      const { error } = await supabase.from('provider_cultural_competencies').insert(
        application.competency_ids.map(cid => ({ provider_id: providerId, competency_id: cid }))
      );
      if (error) return error.message;
    }

    if (application.insurance_plan_ids?.length) {
      const { error } = await supabase.from('provider_insurance').insert(
        application.insurance_plan_ids.map(iid => ({ provider_id: providerId, insurance_plan_id: iid }))
      );
      if (error) return error.message;
    }

    return null;
  })();

  if (childError) {
    // Compensating rollback so a retry starts clean (no orphaned provider).
    await supabase.from('providers').delete().eq('id', providerId);
    console.error('Error saving provider application details:', childError);
    return { error: `Failed to save application details: ${childError}` };
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

  // Record verification — surface a failure so a claim isn't reported as
  // verified when the verification row was never written.
  const { error: verificationError } = await supabase.from('provider_verifications').insert({
    provider_id: providerId,
    verification_type: 'npi_check',
    status: 'passed',
    details: { npi_number: npiNumber, claimed_by: userId },
    verified_at: new Date().toISOString(),
  });

  if (verificationError) {
    return { success: false, error: `Claim recorded but verification failed: ${verificationError.message}` };
  }

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
