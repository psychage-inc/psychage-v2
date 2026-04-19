-- Fix: newsletter_subscribers RLS allows anonymous SELECT of all records
-- Domain: 8 (Newsletter/Contact)
-- Date: 2026-04-19
-- Issue: NL-001 — any anonymous user can read all subscriber emails
-- Safe for production: YES (tightens SELECT, preserves INSERT/UPDATE for public forms)

-- =============================================================================
-- Drop overly permissive SELECT policy
-- Problem: USING (true) on SELECT lets any anonymous client enumerate
--          all subscriber emails via the Supabase REST API.
-- =============================================================================

DROP POLICY IF EXISTS "Users can view their own subscription" ON public.newsletter_subscribers;

-- =============================================================================
-- Replace with authenticated-only email-scoped SELECT
-- Users can only see their own subscription status (matched by auth email).
-- Anonymous subscribe flow will still work — it uses INSERT (unchanged)
-- and falls through to unique constraint for duplicate detection.
-- =============================================================================

CREATE POLICY "Authenticated users can view own subscription"
    ON public.newsletter_subscribers
    FOR SELECT
    TO authenticated
    USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- =============================================================================
-- UPDATE policy kept for public (unsubscribe links from emails)
-- The existing "Users can update their subscription" USING (true) policy
-- is overly broad but needed for anonymous unsubscribe flows.
-- TODO: Replace with token-based unsubscribe via Edge Function.
-- =============================================================================
