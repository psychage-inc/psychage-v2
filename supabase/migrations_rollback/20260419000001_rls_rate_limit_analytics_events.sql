-- =============================================================================
-- ROLLBACK for Phase 0.5 / Finding #050
-- Reverts: 20260419000001_rls_rate_limit_analytics_events.sql
-- =============================================================================
-- Apply manually only: psql $DATABASE_URL -f supabase/migrations_rollback/20260419000001_rls_rate_limit_analytics_events.sql
-- This file is NOT auto-applied by `npx supabase db push`.
-- =============================================================================

DROP POLICY IF EXISTS "insert_analytics_events_rate_limited" ON public.provider_analytics_events;

CREATE POLICY "insert_analytics_events"
  ON public.provider_analytics_events
  FOR INSERT
  WITH CHECK (true);

COMMENT ON POLICY "insert_analytics_events" ON public.provider_analytics_events IS
  'ROLLBACK: restored original unrestricted INSERT policy (pre-Phase 0.5).';
