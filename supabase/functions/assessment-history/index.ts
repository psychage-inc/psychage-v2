/**
 * EDGE FUNCTION: assessment-history
 *
 * GET /functions/v1/assessment/history?limit=20&offset=0
 *
 * Retrieves user's assessment history with trend analysis
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { handleCorsPreflightRequest, createCorsResponse } from '../_shared/cors.ts';
import {
  createErrorResponse,
  handleUnexpectedError,
  ERROR_CODES,
} from '../_shared/errors.ts';
import { HistoryQuerySchema } from '../_shared/validation.ts';

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

    // Parse query parameters
    const url = new URL(req.url);
    const queryParams = {
      limit: url.searchParams.get('limit'),
      offset: url.searchParams.get('offset'),
    };

    const validation = HistoryQuerySchema.safeParse(queryParams);
    if (!validation.success) {
      return createErrorResponse(
        ERROR_CODES.VALIDATION_ERROR,
        'Invalid query parameters',
        { errors: validation.error.flatten().fieldErrors }
      );
    }

    const { limit, offset } = validation.data;

    // Fetch assessments
    const { data: assessments, error: fetchError, count } = await supabase
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
        clinical_flags,
        crisis_detected
      `, { count: 'exact' })
      .eq('user_id', user.id)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (fetchError) {
      return createErrorResponse(
        ERROR_CODES.DATABASE_ERROR,
        'Failed to fetch assessment history'
      );
    }

    // Get retake gate info
    const { data: retakeGate } = await supabase
      .from('retake_gates')
      .select('next_available_at')
      .eq('user_id', user.id)
      .single();

    const nextAvailableAt = retakeGate?.next_available_at
      ? new Date(retakeGate.next_available_at)
      : new Date(); // Can take immediately if no gate

    const daysUntilAvailable = Math.max(
      0,
      Math.ceil((nextAvailableAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    );

    // Format assessments for response
    const formattedAssessments = (assessments || []).map(a => ({
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
      clinical_flags: a.clinical_flags || [],
      crisis_detected: a.crisis_detected || false,
    }));

    // Calculate trends (if at least 2 assessments)
    let trends = undefined;
    if (formattedAssessments.length >= 2) {
      const latest = formattedAssessments[0];
      const previous = formattedAssessments[1];

      const totalChange = latest.total_score - previous.total_score;

      const domainChanges = {
        emotional: latest.domains.emotional - previous.domains.emotional,
        vitality: latest.domains.vitality - previous.domains.vitality,
        social: latest.domains.social - previous.domains.social,
        cognitive: latest.domains.cognitive - previous.domains.cognitive,
        functioning: latest.domains.functioning - previous.domains.functioning,
      };

      const improving: string[] = [];
      const declining: string[] = [];
      const stable: string[] = [];

      // Threshold for "stable": change < 2 points
      const stableThreshold = 2;

      for (const [domain, change] of Object.entries(domainChanges)) {
        if (Math.abs(change) < stableThreshold) {
          stable.push(domain);
        } else if (change > 0) {
          improving.push(domain);
        } else {
          declining.push(domain);
        }
      }

      trends = {
        total_change: totalChange,
        improving_domains: improving,
        declining_domains: declining,
        stable_domains: stable,
      };
    }

    return createCorsResponse(JSON.stringify({
      assessments: formattedAssessments,
      total_count: count || 0,
      retake: {
        next_available_at: nextAvailableAt.toISOString(),
        days_until_available: daysUntilAvailable,
      },
      ...(trends && { trends }),
    }), { status: 200 });

  } catch (error) {
    return handleUnexpectedError('assessment-history', error);
  }
});
