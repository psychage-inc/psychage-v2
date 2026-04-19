-- =============================================================================
-- ROLLBACK for Phase 0.5 / Finding #056
-- Reverts: 20260419000004_rls_claim_seeded_provider.sql
-- =============================================================================
-- Apply manually only: psql $DATABASE_URL -f supabase/migrations_rollback/20260419000004_rls_claim_seeded_provider.sql
-- This file is NOT auto-applied by `npx supabase db push`.
-- =============================================================================

DROP POLICY IF EXISTS "Claim seeded provider" ON public.providers;
