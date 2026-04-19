-- =============================================================================
-- ROLLBACK for Phase 0.5 / Finding #048
-- Reverts: 20260419000003_rls_admin_update_providers.sql
-- =============================================================================
-- Apply manually only: psql $DATABASE_URL -f supabase/migrations_rollback/20260419000003_rls_admin_update_providers.sql
-- This file is NOT auto-applied by `npx supabase db push`.
-- =============================================================================

DROP POLICY IF EXISTS "Admin update providers" ON public.providers;
