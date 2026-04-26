-- =====================================================
-- Migration: AUTH-033 — DB-level audit trigger for provider status changes
-- Date: 2026-04-25
-- =====================================================
-- App-layer auditing via logAdminAction is the primary control. This
-- trigger is defense-in-depth: it catches any provider.status mutation
-- that bypasses the application layer (raw SQL, future admin pages
-- that forget the call, service-role automation). Trigger rows are
-- tagged with metadata.source = 'db_trigger' so they're distinguishable
-- from app-layer rows.
--
-- Scope: AFTER UPDATE OF status. Insert/delete are intentionally not
-- audited here; admin_audit_log is for "who changed what and when",
-- and provider creation is already audited at the app layer (see
-- ProviderEditor.tsx commit 7).
-- =====================================================

CREATE OR REPLACE FUNCTION public.audit_provider_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    IF NEW.status IS DISTINCT FROM OLD.status THEN
        INSERT INTO public.admin_audit_log (
            admin_user_id,
            action,
            resource_type,
            resource_id,
            previous_value,
            new_value,
            metadata
        )
        VALUES (
            auth.uid(),
            'provider_status_change',
            'providers',
            NEW.id::text,
            jsonb_build_object('status', OLD.status),
            jsonb_build_object('status', NEW.status),
            jsonb_build_object('source', 'db_trigger')
        );
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS audit_provider_status_change_trg ON public.providers;
CREATE TRIGGER audit_provider_status_change_trg
    AFTER UPDATE OF status ON public.providers
    FOR EACH ROW
    EXECUTE FUNCTION public.audit_provider_status_change();

COMMENT ON FUNCTION public.audit_provider_status_change() IS
    'AUTH-033: defense-in-depth audit for providers.status changes. ' ||
    'App-layer logAdminAction() calls remain primary; this fires for ' ||
    'any update that bypasses the application layer.';

-- =====================================================
-- ROLLBACK (incident only):
--   DROP TRIGGER IF EXISTS audit_provider_status_change_trg ON public.providers;
--   DROP FUNCTION IF EXISTS public.audit_provider_status_change();
-- =====================================================
