-- =============================================================================
-- Phase 0.5 / Finding #050: rate-limit provider_analytics_events INSERTs
-- =============================================================================
-- Previous policy: WITH CHECK (true) — unrestricted INSERT for any role.
-- Any client could flood events, corrupting analytics dashboards and trust scores.
--
-- Fix: rate-limit to 60 events per (visitor_id, provider_id) per hour.
-- Event type validation is already enforced by the CHECK constraint on the column,
-- so we do NOT duplicate it in the RLS policy.
-- =============================================================================

DROP POLICY IF EXISTS "insert_analytics_events" ON public.provider_analytics_events;

CREATE POLICY "insert_analytics_events_rate_limited"
  ON public.provider_analytics_events
  FOR INSERT
  WITH CHECK (
    (
      SELECT COUNT(*)
      FROM public.provider_analytics_events e
      WHERE e.visitor_id = provider_analytics_events.visitor_id
        AND e.provider_id = provider_analytics_events.provider_id
        AND e.created_at > (now() - interval '1 hour')
    ) < 60
  );

COMMENT ON POLICY "insert_analytics_events_rate_limited" ON public.provider_analytics_events IS
  'Phase 0.5 fix for Finding #050. Rate-limits INSERTs to 60/hr per (visitor_id, provider_id) to prevent event flooding.';
