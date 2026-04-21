-- Security: Rename 'editor' role to 'clinical_admin' across the system
-- Domain: Admin
-- Date: 2026-04-21
-- Issues: Finding #068 (admin role JWT mismatch), Finding #069 (enum reconciliation)
-- Problem: DB CHECK constraint defines 'editor' but TypeScript code uses 'clinical_admin'.
--          RLS policies check for 'editor', which never matches the TS-sent 'clinical_admin'.
-- Fix: Migrate DB to use 'clinical_admin' to match the application layer.
-- Safe for production: YES (coordinated with TypeScript — TS already uses clinical_admin)

BEGIN;

-- Step 1: Update existing rows
UPDATE public.admin_roles SET role = 'clinical_admin' WHERE role = 'editor';

-- Step 2: Drop old CHECK constraint and create new one
ALTER TABLE public.admin_roles DROP CONSTRAINT IF EXISTS admin_roles_role_check;
ALTER TABLE public.admin_roles
    ADD CONSTRAINT admin_roles_role_check
    CHECK (role IN ('super_admin', 'clinical_admin', 'viewer'));

-- Step 3: Recreate the "Admin update providers" RLS policy with 'clinical_admin'
DROP POLICY IF EXISTS "Admin update providers" ON public.providers;

CREATE POLICY "Admin update providers"
    ON public.providers
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_roles ar
            WHERE ar.user_id = auth.uid()
              AND ar.role IN ('super_admin', 'clinical_admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_roles ar
            WHERE ar.user_id = auth.uid()
              AND ar.role IN ('super_admin', 'clinical_admin')
        )
    );

COMMENT ON POLICY "Admin update providers" ON public.providers IS
    'Phase 4 fix for Findings #068/#069. Allows super_admin and clinical_admin roles to UPDATE any provider row.';

COMMIT;
