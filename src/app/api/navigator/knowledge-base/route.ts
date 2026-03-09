/**
 * GET /api/navigator/knowledge-base
 *
 * Returns the COMPLETE knowledge base as a single JSON payload.
 * This is the ONE call the frontend makes on load — everything
 * else (matching, scoring) happens client-side.
 *
 * Cache strategy: CDN-cached for 1 hour, stale-while-revalidate for 24 hours.
 * The `version` field lets the frontend detect when content updates.
 */

import { createClient } from '@supabase/supabase-js';
import type {
  ConditionWithMappings,
  CrisisResourcesByRegion,
  KnowledgeBase,
  MatchingConfig,
  Symptom,
} from '@/lib/navigator/types';

// Initialize Supabase client with service role for read access
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export async function GET(): Promise<Response> {
  try {
    // Fetch all data in parallel for performance
    const [
      symptomsResult,
      conditionsResult,
      mappingsResult,
      redFlagsResult,
      crisisResult,
      configResult,
    ] = await Promise.all([
      supabase
        .from('navigator_symptoms')
        .select('*')
        .eq('is_active', true)
        .order('domain')
        .order('category')
        .order('display_order'),
      supabase
        .from('navigator_conditions')
        .select('*')
        .eq('is_active', true)
        .order('category')
        .order('name'),
      supabase
        .from('navigator_condition_symptoms')
        .select('*'),
      supabase
        .from('navigator_condition_red_flags')
        .select('*'),
      supabase
        .from('navigator_crisis_resources')
        .select('*')
        .eq('is_active', true)
        .order('priority'),
      supabase
        .from('navigator_matching_config')
        .select('*')
        .eq('id', 1)
        .single(),
    ]);

    // Check for errors
    if (symptomsResult.error) throw new Error(`Symptoms: ${symptomsResult.error.message}`);
    if (conditionsResult.error) throw new Error(`Conditions: ${conditionsResult.error.message}`);
    if (mappingsResult.error) throw new Error(`Mappings: ${mappingsResult.error.message}`);
    if (redFlagsResult.error) throw new Error(`Red flags: ${redFlagsResult.error.message}`);
    if (crisisResult.error) throw new Error(`Crisis resources: ${crisisResult.error.message}`);
    if (configResult.error) throw new Error(`Config: ${configResult.error.message}`);

    // Assemble symptoms
    const symptoms: Symptom[] = symptomsResult.data;

    // Assemble conditions with their mappings
    const mappingsByCondition = new Map<string, typeof mappingsResult.data>();
    for (const m of mappingsResult.data) {
      const existing = mappingsByCondition.get(m.condition_id) ?? [];
      existing.push(m);
      mappingsByCondition.set(m.condition_id, existing);
    }

    const redFlagsByCondition = new Map<string, typeof redFlagsResult.data>();
    for (const rf of redFlagsResult.data) {
      const existing = redFlagsByCondition.get(rf.condition_id) ?? [];
      existing.push(rf);
      redFlagsByCondition.set(rf.condition_id, existing);
    }

    const conditions: ConditionWithMappings[] = conditionsResult.data.map((c) => ({
      ...c,
      symptom_mappings: (mappingsByCondition.get(c.id) ?? []).map((m) => ({
        symptom_id: m.symptom_id,
        weight: m.weight,
        role: m.role,
      })),
      red_flags: (redFlagsByCondition.get(c.id) ?? []).map((rf) => ({
        symptom_id: rf.symptom_id,
        note: rf.note,
      })),
    }));

    // Assemble crisis resources grouped by region
    const crisisResources: CrisisResourcesByRegion = {};
    for (const r of crisisResult.data) {
      if (!crisisResources[r.region_code]) {
        crisisResources[r.region_code] = [];
      }
      crisisResources[r.region_code].push(r);
    }

    // Assemble matching config
    const rawConfig = configResult.data;
    const matchingConfig: MatchingConfig = {
      confidence_cap: Number(rawConfig.confidence_cap),
      min_relevance_threshold: Number(rawConfig.min_relevance_threshold),
      below_minimum_penalty: Number(rawConfig.below_minimum_penalty),
      max_results: rawConfig.max_results,
      min_results: rawConfig.min_results,
      max_per_family: rawConfig.max_per_family,
      severity_modifiers: rawConfig.severity_modifiers,
      frequency_modifiers: rawConfig.frequency_modifiers,
      duration_modifiers: rawConfig.duration_modifiers,
      relevance_display_tiers: rawConfig.relevance_display_tiers,
      version: rawConfig.version,
    };

    // Determine knowledge base version from config
    const knowledgeBase: KnowledgeBase = {
      version: matchingConfig.version,
      symptoms,
      conditions,
      matchingConfig,
      crisisResources,
    };

    return new Response(JSON.stringify(knowledgeBase), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('[Navigator KB] Error fetching knowledge base:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to load knowledge base',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
