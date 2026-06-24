/**
 * Crisis Service — read-only access to the CT3 crisis dataset.
 *
 * Backs the crisis screens S11 (region/helpline view) and S12 (country picker).
 * PUBLIC REFERENCE DATA, not SR-4 — served via the public anon client. Only
 * 'verified' helplines are ever returned (RLS enforces this independently; the
 * explicit filter here is belt-and-braces and documents intent).
 */

import { supabase } from '../lib/supabaseClient';

/**
 * A single helpline row, shaped exactly to the S11 design-library binding.
 * No DB-only fields (verification_status, availability, source_url, …) leak here.
 */
export interface HelplineRow {
  name: string;
  description: string;
  callNumber: string | null;
  textCapable: boolean;
  textNumber: string | null;
  region: string; // iso2
}

export interface CrisisResources {
  emergencyNumber: string;
  emergencyNote: string | null;
  hasVerifiedHelplines: boolean;
  helplines: HelplineRow[];
}

export interface CrisisCountrySummary {
  iso2: string;
  name: string;
}

/**
 * Resources for one country: emergency number/note, the gap-state flag, and the
 * ordered list of verified helplines. A country with no verified helplines (e.g.
 * 'ET') returns `hasVerifiedHelplines: false` and an empty `helplines` array —
 * the S11 gap state.
 */
export async function getCrisisResources(iso2: string): Promise<CrisisResources> {
  const region = (iso2 || '').toUpperCase();
  const empty: CrisisResources = {
    emergencyNumber: '',
    emergencyNote: null,
    hasVerifiedHelplines: false,
    helplines: [],
  };

  try {
    const { data: country, error: countryErr } = await supabase
      .from('crisis_countries')
      .select('emergency_number, emergency_note, has_verified_helplines')
      .eq('iso2', region)
      .maybeSingle();

    if (countryErr) {
      console.error('Error fetching crisis country:', countryErr);
      return empty;
    }
    if (!country) {
      return empty;
    }

    const { data: helplines, error: helplinesErr } = await supabase
      .from('crisis_helplines')
      .select('name, description, call_number, text_capable, text_number')
      .eq('country_iso2', region)
      .eq('verification_status', 'verified')
      .order('display_order', { ascending: true });

    if (helplinesErr) {
      console.error('Error fetching crisis helplines:', helplinesErr);
    }

    return {
      emergencyNumber: country.emergency_number,
      emergencyNote: country.emergency_note ?? null,
      hasVerifiedHelplines: country.has_verified_helplines,
      helplines: (helplines || []).map((h) => ({
        name: h.name,
        description: h.description,
        callNumber: h.call_number ?? null,
        textCapable: h.text_capable,
        textNumber: h.text_number ?? null,
        region,
      })),
    };
  } catch (error) {
    console.error('Failed to fetch crisis resources:', error);
    return empty;
  }
}

/**
 * Every country (iso2 + name), ordered by name — for the S12 country picker.
 * Returns all countries, including those with no verified helplines, so the
 * picker can route to the gap state.
 */
export async function listCrisisCountries(): Promise<CrisisCountrySummary[]> {
  try {
    const { data, error } = await supabase
      .from('crisis_countries')
      .select('iso2, country_name')
      .order('country_name', { ascending: true });

    if (error) {
      console.error('Error listing crisis countries:', error);
      return [];
    }

    return (data || []).map((c) => ({ iso2: c.iso2, name: c.country_name }));
  } catch (error) {
    console.error('Failed to list crisis countries:', error);
    return [];
  }
}
