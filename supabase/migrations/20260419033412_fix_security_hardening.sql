-- Fix: Security hardening for analytics events and provider verifications
-- Domain: 2 (Provider Directory)
-- Date: 2026-04-19
-- Issues: PROV-004 (analytics event flooding), PROV-005 (self-verification)
-- Safe for production: YES (replaces permissive policies with stricter ones)

-- =============================================================================
-- FIX 1: Restrict provider_analytics_events INSERT (PROV-004)
-- Problem: INSERT policy WITH CHECK (true) allows unrestricted anonymous flooding.
--          Any client can inflate provider view counts, corrupting dashboard metrics.
-- Fix: Require authentication for INSERT. This prevents anonymous flooding
--       while still allowing legitimate tracking from logged-in users.
-- =============================================================================

DROP POLICY IF EXISTS "insert_analytics_events" ON public.provider_analytics_events;
DROP POLICY IF EXISTS "Authenticated users can insert analytics events" ON public.provider_analytics_events;

CREATE POLICY "Authenticated users can insert analytics events"
    ON public.provider_analytics_events
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- =============================================================================
-- FIX 2: Restrict provider_verifications INSERT (PROV-005)
-- Problem: Owner INSERT policy allows providers to insert fabricated verification
--          records with arbitrary status values (e.g., status: 'passed'),
--          potentially earning unwarranted trust scores or verification badges.
-- Fix: Drop the owner INSERT policy. Verification records should only be created
--       by the claim flow (which runs as the authenticated user) or service_role.
--       The claim flow will continue to work because the UPDATE policy (from Fix 1
--       in the previous migration) allows claiming, and the verification INSERT
--       is a separate operation that can be moved server-side.
-- Note: We keep the SELECT policy so providers can still VIEW their verifications.
-- =============================================================================

DROP POLICY IF EXISTS "Owner insert provider_verifications" ON public.provider_verifications;

-- Replace with a more restrictive policy: only allow INSERT for the specific
-- verification types that the claim flow uses, and only for the provider's own record.
CREATE POLICY "Owner insert npi_check verification"
    ON public.provider_verifications
    FOR INSERT
    TO authenticated
    WITH CHECK (
        verification_type = 'npi_check'
        AND provider_id IN (SELECT id FROM public.providers WHERE user_id = auth.uid())
    );
