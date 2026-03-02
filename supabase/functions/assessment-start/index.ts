/**
 * EDGE FUNCTION: assessment-start
 *
 * POST /functions/v1/assessment/start
 *
 * Creates a new assessment session for authenticated user
 * Checks retake gate and rate limits before creating
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { handleCorsPreflightRequest, createCorsResponse } from '../_shared/cors.ts';
import {
  createErrorResponse,
  createRetakeTooSoonError,
  createRateLimitError,
  handleUnexpectedError,
  logError,
  ERROR_CODES,
} from '../_shared/errors.ts';
import { StartAssessmentRequestSchema } from '../_shared/validation.ts';
import {
  checkRateLimit,
  getUserRateLimitKey,
  RATE_LIMITS,
} from '../_shared/rate-limiter.ts';
import { getInstrumentDefinitions } from '../_shared/instruments.ts';
import { sha256Hash } from '../_shared/encryption.ts';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return handleCorsPreflightRequest();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return createErrorResponse(
      ERROR_CODES.VALIDATION_ERROR,
      'Method not allowed. Use POST.'
    );
  }

  try {
    // Initialize Supabase clients
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Get auth token from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return createErrorResponse(ERROR_CODES.UNAUTHORIZED);
    }

    // Create client with user's token for auth
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return createErrorResponse(
        ERROR_CODES.INVALID_TOKEN,
        'Invalid or expired authentication token'
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validation = StartAssessmentRequestSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        ERROR_CODES.VALIDATION_ERROR,
        'Invalid request body',
        { errors: validation.error.flatten().fieldErrors }
      );
    }

    const { language } = validation.data;

    // Check rate limit (using service role client for rate_limits table)
    const serviceSupabase = createClient(supabaseUrl, supabaseServiceKey);
    const rateLimitKey = getUserRateLimitKey(user.id, 'assessment_start');
    const rateLimit = await checkRateLimit(
      serviceSupabase,
      rateLimitKey,
      RATE_LIMITS.ASSESSMENT_START_USER
    );

    if (!rateLimit.allowed) {
      return createRateLimitError(rateLimit.resetAt);
    }

    // Check retake gate
    const { data: retakeGate } = await supabase
      .from('retake_gates')
      .select('next_available_at')
      .eq('user_id', user.id)
      .single();

    if (retakeGate?.next_available_at) {
      const nextAvailable = new Date(retakeGate.next_available_at);
      if (nextAvailable > new Date()) {
        return createRetakeTooSoonError(nextAvailable);
      }
    }

    // Create assessment record
    const { data: assessment, error: insertError } = await supabase
      .from('assessments')
      .insert({
        user_id: user.id,
        language,
        status: 'in_progress',
      })
      .select('id, started_at')
      .single();

    if (insertError || !assessment) {
      logError('assessment-start', insertError, { user_id: await sha256Hash(user.id) });
      return createErrorResponse(
        ERROR_CODES.DATABASE_ERROR,
        'Failed to create assessment'
      );
    }

    // Log success
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      function: 'assessment-start',
      user_id_hash: await sha256Hash(user.id),
      assessment_id: assessment.id,
      action: 'assessment_created',
      status: 201,
    }));

    // Return assessment ID and instrument definitions
    return createCorsResponse(JSON.stringify({
      assessment_id: assessment.id,
      started_at: assessment.started_at,
      instruments: getInstrumentDefinitions(),
    }), { status: 201 });

  } catch (error) {
    return handleUnexpectedError('assessment-start', error);
  }
});
