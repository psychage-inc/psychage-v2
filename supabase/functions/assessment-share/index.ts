/**
 * EDGE FUNCTION: assessment-share
 *
 * POST /functions/v1/assessment/share
 *
 * Generate encrypted, time-limited share link for provider
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { handleCorsPreflightRequest, createCorsResponse } from '../_shared/cors.ts';
import {
  createErrorResponse,
  createRateLimitError,
  handleUnexpectedError,
  logError,
  ERROR_CODES,
} from '../_shared/errors.ts';
import { ShareAssessmentRequestSchema } from '../_shared/validation.ts';
import {
  checkRateLimit,
  getUserRateLimitKey,
  RATE_LIMITS,
} from '../_shared/rate-limiter.ts';
import { encrypt, generateSecureToken, isValidEncryptionKey } from '../_shared/encryption.ts';
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
    const encryptionKey = Deno.env.get('SHARE_ENCRYPTION_KEY')!;

    // Validate encryption key
    if (!isValidEncryptionKey(encryptionKey)) {
      logError('assessment-share', new Error('Invalid encryption key configured'), {});
      return createErrorResponse(
        ERROR_CODES.INTERNAL_ERROR,
        'Server configuration error'
      );
    }

    // Get auth token from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return createErrorResponse(ERROR_CODES.UNAUTHORIZED);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return createErrorResponse(ERROR_CODES.INVALID_TOKEN);
    }

    // Parse and validate request
    const body = await req.json();
    const validation = ShareAssessmentRequestSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        ERROR_CODES.VALIDATION_ERROR,
        'Invalid request body',
        { errors: validation.error.flatten().fieldErrors }
      );
    }

    const { assessment_ids, expiry_hours } = validation.data;

    // Check rate limit
    const serviceSupabase = createClient(supabaseUrl, supabaseServiceKey);
    const rateLimitKey = getUserRateLimitKey(user.id, 'share_create');
    const rateLimit = await checkRateLimit(
      serviceSupabase,
      rateLimitKey,
      RATE_LIMITS.SHARE_CREATE
    );

    if (!rateLimit.allowed) {
      return createRateLimitError(rateLimit.resetAt);
    }

    // Fetch assessments (must all belong to user and be completed)
    const { data: assessments, error: fetchError } = await supabase
      .from('assessments')
      .select(`
        id,
        completed_at,
        total_score,
        score_label,
        domain_emotional,
        domain_vitality,
        domain_social,
        domain_cognitive,
        domain_functioning,
        phq2_raw,
        gad2_raw,
        phq4_total,
        who5_percentage,
        ucla3_raw,
        pss4_raw,
        functioning_raw,
        clinical_flags,
        crisis_detected
      `)
      .in('id', assessment_ids)
      .eq('user_id', user.id)
      .eq('status', 'completed');

    if (fetchError || !assessments) {
      return createErrorResponse(
        ERROR_CODES.DATABASE_ERROR,
        'Failed to fetch assessments'
      );
    }

    // Verify all requested assessments were found
    if (assessments.length !== assessment_ids.length) {
      return createErrorResponse(
        ERROR_CODES.ASSESSMENT_NOT_FOUND,
        'One or more assessments not found or not accessible'
      );
    }

    // Prepare data for encryption
    const shareData = {
      assessments: assessments.map(a => ({
        id: a.id,
        completed_at: a.completed_at,
        total_score: a.total_score,
        score_label: a.score_label,
        domains: {
          emotional: a.domain_emotional,
          vitality: a.domain_vitality,
          social: a.domain_social,
          cognitive: a.domain_cognitive,
          functioning: a.domain_functioning,
        },
        clinical_subscores: {
          phq2: { raw: a.phq2_raw, max: 6, cutoff: 3, positive: a.phq2_raw >= 3 },
          gad2: { raw: a.gad2_raw, max: 6, cutoff: 3, positive: a.gad2_raw >= 3 },
          who5_percentage: { value: a.who5_percentage, poor_threshold: 50, poor: a.who5_percentage <= 50 },
          ucla3: { raw: a.ucla3_raw, max: 9, elevated_threshold: 6, elevated: a.ucla3_raw >= 6 },
          pss4: { raw: a.pss4_raw, max: 16, moderate_threshold: 8, elevated: a.pss4_raw >= 8 },
        },
        clinical_flags: a.clinical_flags || [],
        crisis_detected: a.crisis_detected || false,
      })),
      shared_at: new Date().toISOString(),
    };

    // Encrypt data
    const encryptedData = await encrypt(shareData, encryptionKey);

    // Generate unique token
    const token = generateSecureToken(32);

    // Calculate expiry
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expiry_hours);

    // Store share token (using service role to bypass RLS)
    const { error: insertError } = await serviceSupabase
      .from('share_tokens')
      .insert({
        token,
        encrypted_data: encryptedData,
        created_by: user.id,
        expires_at: expiresAt.toISOString(),
      });

    if (insertError) {
      logError('assessment-share', insertError, {
        user_id_hash: await sha256Hash(user.id),
        action: 'create_share_token_failed',
      });
      return createErrorResponse(
        ERROR_CODES.DATABASE_ERROR,
        'Failed to create share link'
      );
    }

    // Build share URL
    const shareUrl = `${supabaseUrl.replace('/v1', '')}/clarity-score/shared/${token}`;

    // Log success
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      function: 'assessment-share',
      user_id_hash: await sha256Hash(user.id),
      assessment_count: assessments.length,
      expiry_hours,
      action: 'share_link_created',
      status: 201,
    }));

    return createCorsResponse(JSON.stringify({
      share_url: shareUrl,
      expires_at: expiresAt.toISOString(),
      assessment_count: assessments.length,
    }), { status: 201 });

  } catch (error) {
    return handleUnexpectedError('assessment-share', error);
  }
});
