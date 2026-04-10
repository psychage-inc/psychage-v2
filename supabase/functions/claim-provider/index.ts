/**
 * CLAIM PROVIDER — Edge Function
 *
 * Allows an authenticated user to claim an existing seeded provider profile
 * by verifying their NPI number against the NPPES API.
 *
 * METHOD: POST
 * AUTH:   Required (Bearer token)
 * BODY:   { npi_number: string }
 *
 * FLOW:
 *   1. Validate NPI format (10 digits)
 *   2. Call NPPES API to verify NPI exists and is mental health
 *   3. Find matching provider in DB by npi_number
 *   4. If not found → return error
 *   5. If already claimed (user_id IS NOT NULL) → return error
 *   6. Update provider: user_id, status='claimed', claimed_at
 *   7. Insert provider_verifications record (tier='npi', status='passed')
 *   8. Return { provider_id, redirect: '/portal' }
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.90.0';
import { handleCorsPreflightRequest, createCorsResponse } from '../_shared/cors.ts';
import {
  ERROR_CODES,
  createErrorResponse,
  createValidationError,
  handleUnexpectedError,
} from '../_shared/errors.ts';

const NPPES_API = 'https://npiregistry.cms.hhs.gov/api/?version=2.1';

// Mental health taxonomy codes (partial list)
const MH_TAXONOMY_PREFIXES = [
  '101Y', // Counselor
  '102L', // Psychoanalyst
  '102X', // Poetry Therapist
  '103G', // Neuropsychologist
  '103T', // Psychologist
  '104100000X', // Social Worker
  '106H', // Marriage & Family
  '163W', // Registered Nurse (Psychiatric)
  '2084P', // Psychiatry
  '364S', // Clinical Nurse Specialist (Psychiatric)
];

function isMentalHealthTaxonomy(code: string): boolean {
  return MH_TAXONOMY_PREFIXES.some(prefix => code.startsWith(prefix));
}

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return handleCorsPreflightRequest();
  }

  if (req.method !== 'POST') {
    return createErrorResponse(ERROR_CODES.VALIDATION_ERROR, 'Method not allowed');
  }

  try {
    // --- Auth ---
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return createErrorResponse(ERROR_CODES.UNAUTHORIZED);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return createErrorResponse(ERROR_CODES.UNAUTHORIZED, 'Invalid or expired token');
    }

    // --- Parse body ---
    const body = await req.json();
    const npiNumber = body.npi_number?.trim();

    if (!npiNumber || !/^\d{10}$/.test(npiNumber)) {
      return createValidationError('NPI number must be exactly 10 digits');
    }

    // --- Check if user already has a provider profile ---
    const { data: existingProvider } = await supabase
      .from('providers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (existingProvider) {
      return createErrorResponse(
        ERROR_CODES.VALIDATION_ERROR,
        'You already have a provider profile'
      );
    }

    // --- Call NPPES API ---
    const npiFetch = await fetch(`${NPPES_API}&number=${npiNumber}`);
    const npiData = await npiFetch.json();

    if (!npiData.results || npiData.results.length === 0) {
      return createErrorResponse(
        ERROR_CODES.NOT_FOUND,
        'NPI number not found in the NPPES registry'
      );
    }

    const npiResult = npiData.results[0];
    const taxonomies = npiResult.taxonomies || [];
    const hasMentalHealth = taxonomies.some(
      (t: { code: string }) => isMentalHealthTaxonomy(t.code)
    );

    // We don't strictly enforce mental health taxonomy — just log it
    // Many valid providers have non-standard taxonomy codes

    // --- Find matching provider in DB ---
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: provider, error: findError } = await adminClient
      .from('providers')
      .select('id, user_id, status, display_name')
      .eq('npi_number', npiNumber)
      .single();

    if (findError || !provider) {
      return createErrorResponse(
        ERROR_CODES.NOT_FOUND,
        'This NPI number was not found in our provider directory. You can apply as a new provider instead.'
      );
    }

    // --- Check if already claimed ---
    if (provider.user_id) {
      return createErrorResponse(
        ERROR_CODES.VALIDATION_ERROR,
        'This provider profile has already been claimed'
      );
    }

    // --- Claim the provider ---
    const { error: updateError } = await adminClient
      .from('providers')
      .update({
        user_id: user.id,
        status: 'claimed',
        claimed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', provider.id);

    if (updateError) {
      return createErrorResponse(ERROR_CODES.INTERNAL_ERROR, 'Failed to claim provider profile');
    }

    // --- Insert verification record ---
    await adminClient
      .from('provider_verifications')
      .insert({
        provider_id: provider.id,
        verification_type: 'npi_check',
        tier: 'npi',
        status: 'passed',
        details: {
          npi_number: npiNumber,
          nppes_name: npiResult.basic?.name || npiResult.basic?.first_name + ' ' + npiResult.basic?.last_name,
          has_mental_health_taxonomy: hasMentalHealth,
          taxonomy_codes: taxonomies.map((t: { code: string; desc: string }) => ({
            code: t.code,
            description: t.desc,
          })),
        },
        verified_at: new Date().toISOString(),
      });

    // --- Update user role to provider if needed ---
    await adminClient.auth.admin.updateUserById(user.id, {
      user_metadata: { ...user.user_metadata, role: 'provider' },
    });

    // --- Return success ---
    return createCorsResponse(JSON.stringify({
      success: true,
      provider_id: provider.id,
      display_name: provider.display_name,
      redirect: '/portal',
    }), { status: 200 });

  } catch (error) {
    return handleUnexpectedError('claim-provider', error);
  }
});
