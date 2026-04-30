-- =====================================================
-- Migration: Fix clarity_score_history RLS recursion
-- Date: 2026-04-30
-- Description: The "clarity_history_select_admin" policy queries public.profiles
--              which itself has RLS that references profiles, causing
--              "infinite recursion detected in policy for relation profiles" (42P17)
--              on every SELECT against clarity_score_history.
--              Fix: read role from JWT app_metadata instead of joining profiles.
--              Sync between profiles.role and JWT app_metadata.role is handled by
--              20260423000004_sync_admin_roles_to_app_metadata.sql + 20260423000008.
-- =====================================================

DROP POLICY IF EXISTS "clarity_history_select_admin" ON public.clarity_score_history;

CREATE POLICY "clarity_history_select_admin"
    ON public.clarity_score_history FOR SELECT TO authenticated
    USING (
        coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), '') = 'admin'
    );
