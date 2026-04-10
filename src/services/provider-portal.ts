import { supabase } from '@/lib/supabaseClient';
import type { ProviderWithDetails } from '@/lib/providers/types';

// =============================================================================
// Portal Service — data layer for the provider portal
// =============================================================================

/** Fetch the current authenticated user's provider record with all relations */
export async function getMyProvider(): Promise<ProviderWithDetails | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('providers')
    .select(`
      *,
      provider_type:provider_types(*),
      locations:provider_locations(*),
      specialties:provider_specialties(specialty:specialties(*)),
      languages:provider_languages(language:languages_lookup(*), proficiency),
      cultural_competencies:provider_cultural_competencies(competency:cultural_competencies(*)),
      insurance_plans:provider_insurance(plan:insurance_plans(*))
    `)
    .eq('user_id', user.id)
    .single();

  if (error || !data) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = data as any;
  return {
    ...raw,
    provider_type: raw.provider_type,
    locations: raw.locations || [],
    specialties: (raw.specialties || []).map((s: { specialty: Record<string, unknown> }) => s.specialty),
    languages: (raw.languages || []).map((l: { language: Record<string, unknown>; proficiency: string }) => ({
      ...l.language,
      proficiency: l.proficiency,
    })),
    cultural_competencies: (raw.cultural_competencies || []).map((c: { competency: Record<string, unknown> }) => c.competency),
    insurance_plans: (raw.insurance_plans || []).map((i: { plan: Record<string, unknown> }) => i.plan),
  } as ProviderWithDetails;
}

/** Update partial provider fields */
export async function updateMyProvider(
  providerId: string,
  updates: Record<string, unknown>
): Promise<void> {
  const { error } = await supabase
    .from('providers')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', providerId);

  if (error) throw new Error(error.message);
}

/** Get provider dashboard stats (profile views, etc.) */
export async function getDashboardStats(providerId: string) {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('provider_analytics_events')
    .select('event_type')
    .eq('provider_id', providerId)
    .gte('created_at', thirtyDaysAgo);

  if (error) return { profileViews: 0, searchImpressions: 0, contactClicks: 0, favorites: 0 };

  const events = data || [];
  return {
    profileViews: events.filter(e => e.event_type === 'profile_view').length,
    searchImpressions: events.filter(e => e.event_type === 'search_impression').length,
    contactClicks: events.filter(e => ['phone_click', 'email_click', 'website_click'].includes(e.event_type)).length,
    favorites: events.filter(e => e.event_type === 'favorite_add').length,
  };
}

/** Calculate profile completeness as a percentage (0-100) */
export function calculateProfileCompleteness(provider: ProviderWithDetails): number {
  const checks = [
    !!provider.display_name,
    !!provider.bio && provider.bio.length > 50,
    !!provider.photo_url,
    !!provider.phone || !!provider.email,
    !!provider.website_url,
    provider.locations.length > 0,
    provider.specialties.length > 0,
    provider.languages.length > 0,
    provider.insurance_plans.length > 0,
    !!provider.credentials_suffix,
  ];

  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
}

/** Get provider's trust score */
export async function getTrustScore(providerId: string) {
  const { data, error } = await supabase
    .from('provider_trust_scores')
    .select('*')
    .eq('provider_id', providerId)
    .single();

  if (error) return null;
  return data;
}
