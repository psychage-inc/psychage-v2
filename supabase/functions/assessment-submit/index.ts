/**
 * EDGE FUNCTION: assessment-submit
 *
 * POST /functions/v1/assessment/submit
 *
 * Submits all 20 responses, computes scores server-side, saves everything
 * Handles crisis detection and Clarity Index opt-in
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { handleCorsPreflightRequest, createCorsResponse } from '../_shared/cors.ts';
import {
  createErrorResponse,
  handleUnexpectedError,
  logError,
  ERROR_CODES,
} from '../_shared/errors.ts';
import { SubmitAssessmentRequestSchema } from '../_shared/validation.ts';
import { computeAllScores } from '../_shared/scoring.ts';
import { generateClinicalFlags, sortFlagsByPriority } from '../_shared/clinical-flags.ts';
import { detectCrisis, prepareCrisisLogData } from '../_shared/crisis-detection.ts';
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

    // Create client with user's token
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
    const validation = SubmitAssessmentRequestSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        ERROR_CODES.VALIDATION_ERROR,
        'Invalid request body',
        { errors: validation.error.flatten().fieldErrors }
      );
    }

    const { assessment_id, responses } = validation.data;

    // Verify assessment exists, belongs to user, and is in_progress
    const { data: assessment, error: fetchError } = await supabase
      .from('assessments')
      .select('id, user_id, status')
      .eq('id', assessment_id)
      .single();

    if (fetchError || !assessment) {
      return createErrorResponse(ERROR_CODES.ASSESSMENT_NOT_FOUND);
    }

    if (assessment.user_id !== user.id) {
      return createErrorResponse(ERROR_CODES.FORBIDDEN);
    }

    if (assessment.status !== 'in_progress') {
      return createErrorResponse(
        ERROR_CODES.ASSESSMENT_ALREADY_COMPLETED,
        'This assessment has already been completed'
      );
    }

    // CRITICAL: Server-side scoring (never trust client)
    const scores = computeAllScores(responses);

    // Generate clinical flags
    const clinicalFlags = sortFlagsByPriority(
      generateClinicalFlags(scores.instruments)
    );

    // Detect crisis
    const crisisResult = detectCrisis(scores.instruments);

    // Log crisis anonymously if detected
    if (crisisResult.detected) {
      const crisisLogData = prepareCrisisLogData(crisisResult);
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        function: 'assessment-submit',
        action: 'crisis_detected',
        ...crisisLogData,
        // NEVER log user_id or assessment_id for crisis events
      }));
    }

    // Save individual responses
    const responseRecords = Object.entries(responses).map(([item_id, value]) => {
      // Determine instrument for this item
      let instrument = 'phq4';
      if (item_id.startsWith('who5_')) instrument = 'who5';
      else if (item_id.startsWith('ucla_')) instrument = 'ucla3';
      else if (item_id.startsWith('pss_')) instrument = 'pss4';
      else if (item_id.startsWith('func_')) instrument = 'functioning';

      return {
        assessment_id,
        item_id,
        instrument,
        value,
      };
    });

    const { error: responsesError } = await supabase
      .from('assessment_responses')
      .insert(responseRecords);

    if (responsesError) {
      logError('assessment-submit', responsesError, {
        user_id_hash: await sha256Hash(user.id),
        assessment_id,
        action: 'save_responses_failed',
      });
      return createErrorResponse(
        ERROR_CODES.DATABASE_ERROR,
        'Failed to save assessment responses'
      );
    }

    // Update assessment with scores
    const completedAt = new Date().toISOString();
    const { error: updateError } = await supabase
      .from('assessments')
      .update({
        completed_at: completedAt,
        status: 'completed',
        // Raw scores
        phq2_raw: scores.instruments.phq2_raw,
        gad2_raw: scores.instruments.gad2_raw,
        phq4_total: scores.instruments.phq4_total,
        who5_raw: scores.instruments.who5_raw,
        who5_percentage: scores.instruments.who5_percentage,
        ucla3_raw: scores.instruments.ucla3_raw,
        pss4_raw: scores.instruments.pss4_raw,
        functioning_raw: scores.instruments.functioning_raw,
        // Domain scores
        domain_emotional: scores.domains.emotional,
        domain_vitality: scores.domains.vitality,
        domain_social: scores.domains.social,
        domain_cognitive: scores.domains.cognitive,
        domain_functioning: scores.domains.functioning,
        // Composite
        total_score: scores.total_score,
        score_label: scores.score_label,
        clinical_flags: clinicalFlags,
        crisis_detected: crisisResult.detected,
      })
      .eq('id', assessment_id);

    if (updateError) {
      logError('assessment-submit', updateError, {
        user_id_hash: await sha256Hash(user.id),
        assessment_id,
        action: 'update_assessment_failed',
      });
      return createErrorResponse(
        ERROR_CODES.DATABASE_ERROR,
        'Failed to save assessment scores'
      );
    }

    // Update retake gate
    const nextAvailableAt = new Date();
    nextAvailableAt.setDate(nextAvailableAt.getDate() + 7); // 7 days

    const { error: retakeError } = await supabase
      .from('retake_gates')
      .upsert({
        user_id: user.id,
        last_completed_at: completedAt,
        next_available_at: nextAvailableAt.toISOString(),
      }, {
        onConflict: 'user_id',
      });

    if (retakeError) {
      logError('assessment-submit', retakeError, {
        user_id_hash: await sha256Hash(user.id),
        action: 'update_retake_gate_failed',
      });
      // Non-fatal - continue
    }

    // Check if user opted into Clarity Index
    const { data: profile } = await supabase
      .from('profiles')
      .select('clarity_index_opt_in, age_range, region, language')
      .eq('id', user.id)
      .single();

    if (profile?.clarity_index_opt_in) {
      // Insert anonymized data into Clarity Index (using service role)
      const serviceSupabase = createClient(supabaseUrl, supabaseServiceKey);

      const contributedAt = new Date();
      const quarter = `${contributedAt.getFullYear()}-Q${Math.ceil((contributedAt.getMonth() + 1) / 3)}`;

      const { error: indexError } = await serviceSupabase
        .from('clarity_index_contributions')
        .insert({
          // NO user_id - fully anonymized
          age_range: profile.age_range,
          region: profile.region,
          language: profile.language,
          total_score: scores.total_score,
          domain_emotional: scores.domains.emotional,
          domain_vitality: scores.domains.vitality,
          domain_social: scores.domains.social,
          domain_cognitive: scores.domains.cognitive,
          domain_functioning: scores.domains.functioning,
          phq2_raw: scores.instruments.phq2_raw,
          gad2_raw: scores.instruments.gad2_raw,
          who5_percentage: scores.instruments.who5_percentage,
          ucla3_raw: scores.instruments.ucla3_raw,
          pss4_raw: scores.instruments.pss4_raw,
          quarter,
        });

      if (indexError) {
        logError('assessment-submit', indexError, {
          action: 'clarity_index_contribution_failed',
        });
        // Non-fatal - continue
      }
    }

    // Calculate recommended retake date (14 days)
    const recommendedAt = new Date();
    recommendedAt.setDate(recommendedAt.getDate() + 14);

    // Log success
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      function: 'assessment-submit',
      user_id_hash: await sha256Hash(user.id),
      assessment_id,
      total_score: scores.total_score,
      score_label: scores.score_label,
      crisis_detected: crisisResult.detected,
      action: 'assessment_completed',
      status: 200,
    }));

    // Return complete results
    return createCorsResponse(JSON.stringify({
      assessment_id,
      completed_at: completedAt,
      scores: {
        total: scores.total_score,
        label: scores.score_label,
        domains: {
          emotional: { score: scores.domains.emotional, max: 20 },
          vitality: { score: scores.domains.vitality, max: 20 },
          social: { score: scores.domains.social, max: 20 },
          cognitive: { score: scores.domains.cognitive, max: 20 },
          functioning: { score: scores.domains.functioning, max: 20 },
        },
        clinical_subscores: scores.clinical_subscores,
        clinical_flags: clinicalFlags,
        crisis_detected: crisisResult.detected,
      },
      retake: {
        next_available_at: nextAvailableAt.toISOString(),
        recommended_at: recommendedAt.toISOString(),
      },
    }), { status: 200 });

  } catch (error) {
    return handleUnexpectedError('assessment-submit', error);
  }
});
