/**
 * POST /api/navigator/analytics
 *
 * Accepts anonymous analytics events from the Symptom Navigator.
 * Validates payload shape and rejects anything containing PII patterns.
 *
 * PRIVACY: This endpoint stores ONLY aggregate counts and booleans.
 * No symptom IDs, condition IDs, or user identifiers are accepted.
 *
 * Rate limit: 10 events per session_hash per minute.
 */

import { createClient } from '@supabase/supabase-js';
import type { AnalyticsEvent, AnalyticsEventType, RedFlagLevel } from '@/lib/navigator/types';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// In-memory rate limiter (per-instance; for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const VALID_EVENT_TYPES: AnalyticsEventType[] = [
  'started',
  'completed',
  'crisis_triggered',
  'result_clicked',
  'provider_clicked',
];

const VALID_FLAG_LEVELS: (RedFlagLevel | null)[] = ['CRISIS', 'URGENT', 'WATCH', null];

// PII detection patterns
const PII_PATTERNS = [
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email
  /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/, // Phone (US)
  /\b\d{3}[-]?\d{2}[-]?\d{4}\b/, // SSN
  /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})\b/, // Credit card
];

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.session_hash || typeof body.session_hash !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing or invalid session_hash' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!body.event_type || !VALID_EVENT_TYPES.includes(body.event_type)) {
      return new Response(
        JSON.stringify({
          error: 'Invalid event_type',
          valid: VALID_EVENT_TYPES,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Rate limiting: 10 events per session_hash per minute
    const now = Date.now();
    const rateKey = body.session_hash;
    const rateEntry = rateLimitMap.get(rateKey);

    if (rateEntry) {
      if (now < rateEntry.resetAt) {
        if (rateEntry.count >= 10) {
          return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '60',
            },
          });
        }
        rateEntry.count++;
      } else {
        rateLimitMap.set(rateKey, { count: 1, resetAt: now + 60_000 });
      }
    } else {
      rateLimitMap.set(rateKey, { count: 1, resetAt: now + 60_000 });
    }

    // PII screening — scan all string values
    const jsonStr = JSON.stringify(body);
    for (const pattern of PII_PATTERNS) {
      if (pattern.test(jsonStr)) {
        return new Response(
          JSON.stringify({ error: 'Payload rejected: potential PII detected' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Reject any fields that shouldn't exist (symptom IDs, condition IDs, user data)
    const FORBIDDEN_FIELDS = [
      'symptom_ids',
      'symptom_id',
      'condition_ids',
      'condition_id',
      'user_id',
      'email',
      'name',
      'ip',
      'user_agent',
    ];
    for (const field of FORBIDDEN_FIELDS) {
      if (field in body) {
        return new Response(
          JSON.stringify({ error: `Forbidden field in payload: ${field}` }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Validate optional fields
    const event: Record<string, unknown> = {
      session_hash: String(body.session_hash).slice(0, 64),
      event_type: body.event_type,
    };

    if (typeof body.domains_selected === 'number' && body.domains_selected >= 0) {
      event.domains_selected = Math.min(body.domains_selected, 4);
    }
    if (typeof body.symptoms_selected === 'number' && body.symptoms_selected >= 0) {
      event.symptoms_selected = Math.min(body.symptoms_selected, 100);
    }
    if (typeof body.time_to_complete_seconds === 'number' && body.time_to_complete_seconds >= 0) {
      event.time_to_complete_seconds = Math.min(body.time_to_complete_seconds, 3600);
    }
    if (typeof body.results_shown === 'number' && body.results_shown >= 0) {
      event.results_shown = Math.min(body.results_shown, 10);
    }
    if (VALID_FLAG_LEVELS.includes(body.safety_flag_level)) {
      event.safety_flag_level = body.safety_flag_level;
    }
    if (typeof body.feedback_helpful === 'boolean') {
      event.feedback_helpful = body.feedback_helpful;
    }

    // Insert into database
    const { error } = await supabase.from('navigator_analytics').insert(event);

    if (error) {
      console.error('[Navigator Analytics] Insert error:', error);
      return new Response(null, { status: 500 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('[Navigator Analytics] Error:', error);
    return new Response(null, { status: 500 });
  }
}
