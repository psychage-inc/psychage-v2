# AUTH-001 — Role hardening verification

Manual SQL test cases for `supabase/migrations/20260423000001_harden_admin_role_checks.sql`.

Run against a local Supabase instance after `supabase db reset`. Each
case can be executed via the Supabase SQL editor or `psql` against the
local instance.

## Setup

```sql
-- Create a test user via supabase CLI, e.g.:
--   supabase functions invoke admin-create-user --no-verify-jwt \
--     --body '{"email":"test-auth001@example.com","password":"test1234"}'
-- Or via the seed-admin script (which now writes to admin_roles, not
-- user_metadata, post-A.4 fix). For these tests we assume:
--   :test_user_id = the UUID of test-auth001@example.com
```

---

## Case 1 — `user_metadata.role` writes are stripped by the trigger

```sql
-- Plant a stale role marker (simulates pre-migration state OR an
-- attacker attempting escalation via supabase.auth.updateUser).
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role":"admin"}'::jsonb
WHERE id = :test_user_id;

-- Verify: role key is NOT present after the update.
SELECT raw_user_meta_data ? 'role' AS still_has_role
FROM auth.users
WHERE id = :test_user_id;
-- Expected: still_has_role = false
```

**Pass criterion:** `still_has_role = false`. The BEFORE UPDATE trigger
removed the key during the same statement.

---

## Case 2 — `is_admin()` returns false without an `admin_roles` row

```sql
-- Ensure no admin_roles row exists for the test user.
DELETE FROM public.admin_roles WHERE user_id = :test_user_id;

-- Plant a (stripped-on-write) attempt at user_metadata escalation,
-- just to demonstrate it has no effect on is_admin() either.
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role":"admin"}'::jsonb
WHERE id = :test_user_id;

-- Sign in as the test user (or simulate by setting the role context).
-- Then evaluate is_admin() in their context.
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = ':test_user_id';
SELECT public.is_admin() AS is_admin_result;
-- Expected: is_admin_result = false
RESET ROLE;
```

**Pass criterion:** `is_admin_result = false`. AUTH-001's JWT fallback
is gone; the only path to admin is an `admin_roles` row.

---

## Case 3 — `is_admin()` reflects `admin_roles` immediately

```sql
-- Insert admin_roles row.
INSERT INTO public.admin_roles (user_id, role)
VALUES (:test_user_id, 'super_admin');

SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = ':test_user_id';
SELECT public.is_admin() AS is_admin_now,
       public.is_admin_writer() AS is_writer_now;
-- Expected: both true
RESET ROLE;

-- Remove the row.
DELETE FROM public.admin_roles WHERE user_id = :test_user_id;

SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = ':test_user_id';
SELECT public.is_admin() AS is_admin_after_revoke;
-- Expected: false (no JWT cached, no fallback)
RESET ROLE;
```

**Pass criterion:** revocation is immediate, with no JWT lag — because
the function reads the table directly, not the JWT.

---

## Case 4 — `migrate_admin_role` RPC: promote → reconcile → demote

```sql
-- (As service_role / superuser.)
-- Promote
SELECT public.migrate_admin_role(:test_user_id, 'promote', 'clinical_admin');
-- Expected: jsonb result, admin_roles row inserted, audit row appended

SELECT * FROM public.admin_roles WHERE user_id = :test_user_id;
-- Expected: 1 row, role='clinical_admin'

-- Reconcile (no admin_roles change, just metadata strip)
SELECT public.migrate_admin_role(:test_user_id, 'reconcile');
-- Expected: success, admin_roles unchanged, second audit row appended

-- Demote
SELECT public.migrate_admin_role(:test_user_id, 'demote');
SELECT * FROM public.admin_roles WHERE user_id = :test_user_id;
-- Expected: 0 rows, third audit row appended

-- Audit trail
SELECT action, resource_type, resource_id, metadata
FROM public.admin_audit_log
WHERE resource_id = :test_user_id::text
  AND action = 'AUTH-001-migration'
ORDER BY created_at;
-- Expected: 3 rows, metadata->>'action' values: promote, reconcile, demote
```

**Pass criterion:** all three actions succeed and produce one audit row
each.

---

## Case 5 — `migrate_admin_role` rejects bad input

```sql
-- Invalid action
SELECT public.migrate_admin_role(:test_user_id, 'bogus');
-- Expected: ERROR: migrate_admin_role: invalid action bogus, ...

-- Promote without granular role
SELECT public.migrate_admin_role(:test_user_id, 'promote');
-- Expected: ERROR: ... promote requires _granular_role in (...)

-- Promote with bad granular role
SELECT public.migrate_admin_role(:test_user_id, 'promote', 'godmode');
-- Expected: same error
```

**Pass criterion:** each call raises the documented exception.
