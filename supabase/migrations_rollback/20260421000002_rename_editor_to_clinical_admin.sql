-- Rollback: Revert 'clinical_admin' back to 'editor'
BEGIN;

UPDATE public.admin_roles SET role = 'editor' WHERE role = 'clinical_admin';

ALTER TABLE public.admin_roles DROP CONSTRAINT IF EXISTS admin_roles_role_check;
ALTER TABLE public.admin_roles
    ADD CONSTRAINT admin_roles_role_check
    CHECK (role IN ('super_admin', 'editor', 'viewer'));

DROP POLICY IF EXISTS "Admin update providers" ON public.providers;

CREATE POLICY "Admin update providers"
    ON public.providers
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_roles ar
            WHERE ar.user_id = auth.uid()
              AND ar.role IN ('super_admin', 'editor')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_roles ar
            WHERE ar.user_id = auth.uid()
              AND ar.role IN ('super_admin', 'editor')
        )
    );

COMMIT;
