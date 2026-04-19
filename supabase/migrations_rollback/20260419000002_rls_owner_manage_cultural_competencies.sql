-- =============================================================================
-- ROLLBACK for Phase 0.5 / Finding #049
-- Reverts: 20260419000002_rls_owner_manage_cultural_competencies.sql
-- =============================================================================
-- Apply manually only: psql $DATABASE_URL -f supabase/migrations_rollback/20260419000002_rls_owner_manage_cultural_competencies.sql
-- This file is NOT auto-applied by `npx supabase db push`.
-- =============================================================================

DROP POLICY IF EXISTS "Owner manage provider_cultural_competencies" ON public.provider_cultural_competencies;
