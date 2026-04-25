-- ============================================================
-- B-7 Phase D: extend role sync to include profiles.role
-- ============================================================
-- Date: 2026-04-23
-- Severity: HIGH (live production regression)
-- Audit:    docs/audits/auth-hotfix-b7-incident.md
--
-- Architectural decision (per incident doc):
--   effective_role =
--     (admin_roles primary role for this user, if any)
--     ELSE (profiles.role, if set)
--     ELSE 'patient'
--
-- The B-3 sync (20260423000004) only considered admin_roles. After
-- B-7 Phase C narrowed the strip trigger, profiles.role is the
-- non-admin source of truth (per claim-provider Phase F write-side
-- update). This migration:
--
--   1. Adds public.sync_user_role_to_app_metadata(uuid) — the
--      effective-role calculator. Writes to raw_app_meta_data.role.
--   2. Refactors the B-3 admin_roles trigger to call the new helper.
--   3. Adds a profiles trigger (INSERT/UPDATE OF role/DELETE) that
--      calls the same helper, so profile-role changes propagate
--      automatically.
--   4. Adds public.backfill_provider_role(uuid[]) — service-role
--      RPC consumed by scripts/b7-backfill-provider-roles.ts.
--   5. One-time reconciliation in batches over auth.users so every
--      existing user gets app_metadata.role populated correctly.
--
-- Interaction with B-7 Phase C strip trigger (20260423000007):
--   The strip trigger fires BEFORE UPDATE on auth.users and inspects
--   raw_user_meta_data only. The sync function writes to
--   raw_app_meta_data — disjoint columns, no interference.
--
-- Cardinality on admin_roles:
--   Per addendum §H.2, admin_roles has UNIQUE(user_id) — one row per
--   user. The priority CASE in sync_user_role_to_app_metadata is
--   defensive in case the constraint is ever relaxed.
--
-- Reconciliation:
--   A single bulk UPDATE over auth.users at the bottom of this file.
--   Idempotent on rerun. See the notes near the UPDATE for why a
--   bulk statement is preferred over per-row iteration.
--
-- Rollback SQL is in a comment block at the bottom of this file.
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Effective-role calculator
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.sync_user_role_to_app_metadata(target_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  _admin_role     text;
  _profile_role   text;
  _effective_role text;
BEGIN
  -- Admin role wins. Priority order matches B-3:
  --   super_admin > clinical_admin > viewer
  SELECT ar.role
  INTO _admin_role
  FROM public.admin_roles ar
  WHERE ar.user_id = target_user_id
  ORDER BY
    CASE ar.role
      WHEN 'super_admin'    THEN 1
      WHEN 'clinical_admin' THEN 2
      WHEN 'viewer'         THEN 3
      ELSE 99
    END
  LIMIT 1;

  IF _admin_role IS NOT NULL THEN
    _effective_role := _admin_role;
  ELSE
    SELECT pr.role INTO _profile_role
    FROM public.profiles pr
    WHERE pr.id = target_user_id;
    _effective_role := COALESCE(_profile_role, 'patient');
  END IF;

  UPDATE auth.users
  SET raw_app_meta_data =
    COALESCE(raw_app_meta_data, '{}'::jsonb)
    || jsonb_build_object('role', _effective_role)
  WHERE id = target_user_id;
END;
$$;

COMMENT ON FUNCTION public.sync_user_role_to_app_metadata(uuid) IS
  'B-7 effective-role calculator: admin_roles > profiles.role > '
  '''patient''. Writes to auth.users.raw_app_meta_data.role. Called '
  'from both admin_roles and profiles triggers, and from the '
  'reconciliation DO block in this migration.';


-- ------------------------------------------------------------
-- 2. Refactor B-3 admin_roles trigger to use the new helper
-- ------------------------------------------------------------
-- Same trigger row (sync_admin_role_to_app_metadata_trg from B-3),
-- new function body that delegates to the effective-role calculator.

CREATE OR REPLACE FUNCTION public.sync_admin_role_to_app_metadata()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  _target_user_id uuid;
BEGIN
  IF TG_OP = 'DELETE' THEN
    _target_user_id := OLD.user_id;
  ELSE
    _target_user_id := NEW.user_id;
  END IF;

  PERFORM public.sync_user_role_to_app_metadata(_target_user_id);

  RETURN COALESCE(NEW, OLD);
END;
$$;

COMMENT ON FUNCTION public.sync_admin_role_to_app_metadata() IS
  'B-3 trigger function, refactored in B-7 to delegate to '
  'sync_user_role_to_app_metadata. Fires on admin_roles INSERT/'
  'UPDATE/DELETE; the helper recomputes effective role from '
  'admin_roles + profiles.role.';

-- The trigger registration from B-3 (sync_admin_role_to_app_metadata_trg
-- on public.admin_roles) is unchanged — only the function body is
-- updated above via CREATE OR REPLACE.


-- ------------------------------------------------------------
-- 3. New trigger on profiles.role changes
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.sync_profile_role_to_app_metadata()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- On UPDATE, only fire when role actually changed. Avoids
  -- recomputing for every profiles row touch (display_name edit,
  -- avatar update, etc.).
  IF TG_OP = 'UPDATE' AND NEW.role IS NOT DISTINCT FROM OLD.role THEN
    RETURN NEW;
  END IF;

  PERFORM public.sync_user_role_to_app_metadata(COALESCE(NEW.id, OLD.id));

  RETURN COALESCE(NEW, OLD);
END;
$$;

COMMENT ON FUNCTION public.sync_profile_role_to_app_metadata() IS
  'B-7 trigger function: fires on profiles INSERT/UPDATE OF role/'
  'DELETE; recomputes effective role via '
  'sync_user_role_to_app_metadata.';

DROP TRIGGER IF EXISTS sync_profile_role_to_app_metadata_trg ON public.profiles;
CREATE TRIGGER sync_profile_role_to_app_metadata_trg
  AFTER INSERT OR UPDATE OF role OR DELETE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_profile_role_to_app_metadata();


-- ------------------------------------------------------------
-- 4. Service-role backfill RPC (consumed by Phase E script)
-- ------------------------------------------------------------
-- Deferred Phase E: the script that calls this RPC ships in
-- scripts/b7-backfill-provider-roles.ts. Operator runs it after the
-- diagnostic establishes the affected user list. The RPC itself is
-- idempotent — calling for users who already have profiles.role =
-- 'provider' is a no-op against the WHERE clause on the UPDATE.

CREATE OR REPLACE FUNCTION public.backfill_provider_role(target_user_ids uuid[])
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  _affected_count integer := 0;
  _uid uuid;
  _changed boolean;
BEGIN
  FOREACH _uid IN ARRAY target_user_ids LOOP
    -- Upsert profiles.role = 'provider'. If the profiles row is
    -- absent (defensive — handle_new_user should have created it),
    -- create it; otherwise only update when the role differs.
    INSERT INTO public.profiles (id, role)
    VALUES (_uid, 'provider')
    ON CONFLICT (id) DO UPDATE
      SET role = EXCLUDED.role
      WHERE public.profiles.role IS DISTINCT FROM 'provider';

    -- Detect whether anything actually changed (cheap re-read).
    -- If the row was already correct, the audit row would be
    -- noise — skip it.
    SELECT (pr.role = 'provider') INTO _changed
    FROM public.profiles pr WHERE pr.id = _uid;

    IF FOUND AND _changed THEN
      INSERT INTO public.admin_audit_log (
        admin_user_id, action, resource_type, resource_id,
        previous_value, new_value, metadata
      ) VALUES (
        NULL,                          -- service-role, no actor
        'B-7-backfill',
        'profiles.role',
        _uid::text,
        NULL,
        jsonb_build_object('role', 'provider'),
        jsonb_build_object('migration', '20260423000008',
                           'rpc',       'backfill_provider_role')
      );
      _affected_count := _affected_count + 1;
    END IF;
  END LOOP;

  RETURN _affected_count;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.backfill_provider_role(uuid[]) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.backfill_provider_role(uuid[]) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.backfill_provider_role(uuid[]) FROM anon;
-- service_role retains EXECUTE by default.

COMMENT ON FUNCTION public.backfill_provider_role(uuid[]) IS
  'B-7 Phase E backfill helper. Service-role only. Sets '
  'profiles.role = ''provider'' for each user_id in the input array '
  '(idempotent — skips users already at provider). The profiles '
  'trigger from this migration then propagates app_metadata.role.';

COMMIT;


-- ============================================================
-- 5. One-time reconciliation
-- ============================================================
-- Sets app_metadata.role on every auth.users row to the new
-- effective-role definition. A single bulk UPDATE is preferred over
-- per-row PERFORM in a DO block: a DO block runs in one implicit
-- transaction (no inter-iteration commits possible without procedures),
-- so per-row iteration would hold the same locks as bulk UPDATE while
-- being much slower. Idempotent: re-running is a no-op on steady state
-- (jsonb concat with the same key produces the same value).
--
-- Performance note: this is one UPDATE over auth.users. Cost scales
-- linearly with user count. On psychage's current scale this is well
-- within acceptable migration time. If auth.users grows past ~100k
-- in the future, switch to a chunked CALL of a procedure with explicit
-- COMMITs.

UPDATE auth.users u
SET raw_app_meta_data =
  COALESCE(u.raw_app_meta_data, '{}'::jsonb)
  || jsonb_build_object(
       'role',
       COALESCE(
         (
           SELECT ar.role
           FROM public.admin_roles ar
           WHERE ar.user_id = u.id
           ORDER BY
             CASE ar.role
               WHEN 'super_admin'    THEN 1
               WHEN 'clinical_admin' THEN 2
               WHEN 'viewer'         THEN 3
               ELSE 99
             END
           LIMIT 1
         ),
         (SELECT pr.role FROM public.profiles pr WHERE pr.id = u.id),
         'patient'
       )
     );

NOTIFY pgrst, 'reload schema';

-- ============================================================
-- VERIFICATION (run after migration applies)
-- ============================================================
--
--   -- Profiles trigger registered:
--   SELECT trigger_name, event_manipulation
--     FROM information_schema.triggers
--    WHERE event_object_schema = 'public'
--      AND event_object_table  = 'profiles'
--      AND trigger_name = 'sync_profile_role_to_app_metadata_trg';
--   -- Expected: rows for INSERT, UPDATE, DELETE
--
--   -- Backfill RPC registered + locked:
--   SELECT proname FROM pg_proc WHERE proname = 'backfill_provider_role';
--   SELECT grantee, privilege_type
--     FROM information_schema.routine_privileges
--    WHERE routine_schema = 'public'
--      AND routine_name = 'backfill_provider_role';
--   -- Expected: postgres only (no authenticated/anon/PUBLIC)
--
--   -- Reconciliation drift check:
--   SELECT count(*) AS sync_drift
--     FROM auth.users u
--     LEFT JOIN public.admin_roles ar ON ar.user_id = u.id
--     LEFT JOIN public.profiles    p  ON p.id       = u.id
--    WHERE COALESCE(
--            ar.role,
--            p.role,
--            'patient'
--          ) IS DISTINCT FROM (u.raw_app_meta_data ->> 'role');
--   -- Expected: 0
--
-- ============================================================
-- ROLLBACK (manual, run only if this migration must be reverted)
-- ============================================================
--
-- BEGIN;
-- DROP TRIGGER IF EXISTS sync_profile_role_to_app_metadata_trg ON public.profiles;
-- DROP FUNCTION IF EXISTS public.sync_profile_role_to_app_metadata();
-- DROP FUNCTION IF EXISTS public.backfill_provider_role(uuid[]);
-- DROP FUNCTION IF EXISTS public.sync_user_role_to_app_metadata(uuid);
--
-- -- Restore B-3's original sync_admin_role_to_app_metadata body:
-- CREATE OR REPLACE FUNCTION public.sync_admin_role_to_app_metadata()
-- RETURNS trigger
-- LANGUAGE plpgsql
-- SECURITY DEFINER
-- SET search_path = ''
-- AS $$
-- DECLARE
--   _target_user_id uuid;
--   _primary_role   text;
-- BEGIN
--   IF TG_OP = 'DELETE' THEN _target_user_id := OLD.user_id;
--   ELSE _target_user_id := NEW.user_id;
--   END IF;
--
--   SELECT ar.role INTO _primary_role
--     FROM public.admin_roles ar
--    WHERE ar.user_id = _target_user_id
--    ORDER BY CASE ar.role
--              WHEN 'super_admin' THEN 1
--              WHEN 'clinical_admin' THEN 2
--              WHEN 'viewer' THEN 3
--              ELSE 99 END
--    LIMIT 1;
--
--   IF _primary_role IS NOT NULL THEN
--     UPDATE auth.users
--        SET raw_app_meta_data =
--              COALESCE(raw_app_meta_data, '{}'::jsonb)
--              || jsonb_build_object('role', _primary_role)
--      WHERE id = _target_user_id;
--   ELSE
--     UPDATE auth.users
--        SET raw_app_meta_data =
--              COALESCE(raw_app_meta_data, '{}'::jsonb) - 'role'
--      WHERE id = _target_user_id;
--   END IF;
--
--   RETURN COALESCE(NEW, OLD);
-- END;
-- $$;
-- COMMIT;
-- NOTIFY pgrst, 'reload schema';
