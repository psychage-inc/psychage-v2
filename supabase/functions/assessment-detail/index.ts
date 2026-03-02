/**
 * EDGE FUNCTION: assessment-detail
 *
 * GET /functions/v1/assessment/:id
 *
 * Get full detail for a single assessment (must be owner)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { handleCorsPreflightRequest, createCorsResponse } from '../_shared/cors.ts';
import {
  createErrorResponse,
  handleUnexpectedError,
  ERROR_CODES,
} from '../_shared/errors.ts';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return handleCorsPreflightRequest();
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return createErrorResponse(
      ERROR_CODES.VALIDATION_ERROR,
      'Method not allowed. Use GET.'
    );
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

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

    // Extract assessment ID from URL
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const assessmentId = pathParts[pathParts.length - 1];

    if (!assessmentId) {
      return createErrorResponse(
        ERROR_CODES.INVALID_ASSESSMENT_ID,
        'Assessment ID is required'
      );
    }

    // Fetch assessment (RLS ensures user owns it)
    const { data: assessment, error: fetchError } = await supabase
      .from('assessments')
      .select(`
        id,
        completed_at,
        status,
        phq2_raw,
        gad2_raw,
        phq4_total,
        who5_raw,
        who5_percentage,
        ucla3_raw,
        pss4_raw,
        functioning_raw,
        domain_emotional,
        domain_vitality,
        domain_social,
        domain_cognitive,
        domain_functioning,
        total_score,
        score_label,
        clinical_flags,
        crisis_detected
      `)
      .eq('id', assessmentId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !assessment) {
      return createErrorResponse(ERROR_CODES.ASSESSMENT_NOT_FOUND);
    }

    // Fetch individual responses
    const { data: responses, error: responsesError } = await supabase
      .from('assessment_responses')
      .select('item_id, value')
      .eq('assessment_id', assessmentId)
      .order('item_id');

    if (responsesError) {
      return createErrorResponse(
        ERROR_CODES.DATABASE_ERROR,
        'Failed to fetch assessment responses'
      );
    }

    // Format responses as object
    const responsesObject = (responses || []).reduce((acc, r) => {
      acc[r.item_id] = r.value;
      return acc;
    }, {} as Record<string, number>);

    // Build clinical subscores from raw scores
    const clinicalSubscores = {
      phq2: {
        raw: assessment.phq2_raw,
        max: 6,
        cutoff: 3,
        positive: assessment.phq2_raw >= 3,
      },
      gad2: {
        raw: assessment.gad2_raw,
        max: 6,
        cutoff: 3,
        positive: assessment.gad2_raw >= 3,
      },
      who5_percentage: {
        value: assessment.who5_percentage,
        poor_threshold: 50,
        poor: assessment.who5_percentage <= 50,
      },
      ucla3: {
        raw: assessment.ucla3_raw,
        max: 9,
        elevated_threshold: 6,
        elevated: assessment.ucla3_raw >= 6,
      },
      pss4: {
        raw: assessment.pss4_raw,
        max: 16,
        moderate_threshold: 8,
        elevated: assessment.pss4_raw >= 8,
      },
    };

    return createCorsResponse(JSON.stringify({
      assessment_id: assessment.id,
      completed_at: assessment.completed_at,
      scores: {
        total: assessment.total_score,
        label: assessment.score_label,
        domains: {
          emotional: { score: assessment.domain_emotional, max: 20 },
          vitality: { score: assessment.domain_vitality, max: 20 },
          social: { score: assessment.domain_social, max: 20 },
          cognitive: { score: assessment.domain_cognitive, max: 20 },
          functioning: { score: assessment.domain_functioning, max: 20 },
        },
        clinical_subscores: clinicalSubscores,
        clinical_flags: assessment.clinical_flags || [],
        crisis_detected: assessment.crisis_detected || false,
      },
      responses: responsesObject,
    }), { status: 200 });

  } catch (error) {
    return handleUnexpectedError('assessment-detail', error);
  }
});
