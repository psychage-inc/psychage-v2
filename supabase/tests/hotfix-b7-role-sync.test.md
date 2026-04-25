# B-7 Phase D — extend role sync to profiles.role (SQL test scenarios)

Migration under test:
`supabase/migrations/20260423000008_b7_extend_role_sync.sql`

Run each scenario in the Supabase SQL editor with **service-role**
context. Reset state between scenarios so the next one starts from a
known position.

Pre-conditions:
- 20260423000001 (strip trigger), 20260423000004 (B-3 admin sync),
  20260423000005/006 (B-7 diagnostic), 20260423000007 (B-7 narrow
  strip), 20260423000008 (this) all applied in order.

Common setup (per scenario):

```sql
-- Create or pick a throwaway user. Capture the returned id.
INSERT INTO auth.users (id, instance_id, email, raw_user_meta_data, raw_app_meta_data, created_at, updated_at, aud, role)
VALUES (gen_random_uuid(), '00000000-0000-0000-0000-000000000000',
        'b7-sync-test@example.com', '{}'::jsonb, '{}'::jsonb,
        now(), now(), 'authenticated', 'authenticated')
RETURNING id;
-- handle_new_user trigger fires AFTER INSERT and creates the
-- profiles row with role = 'patient' by default.
```

---

## Scenario 1 — profiles.role flows into app_metadata.role

```sql
-- User has no admin_roles row; profiles.role exists at default 'patient'.
SELECT public.sync_user_role_to_app_metadata('<test_uid>');

SELECT raw_app_meta_data ->> 'role' AS app_role
FROM auth.users WHERE id = '<test_uid>';
```

**Expected:** `app_role = 'patient'`. The fall-through to
profiles.role hit the default seeded by handle_new_user.

---

## Scenario 2 — profiles.role transition fires the new trigger

```sql
UPDATE public.profiles SET role = 'provider' WHERE id = '<test_uid>';

SELECT raw_app_meta_data ->> 'role' AS app_role
FROM auth.users WHERE id = '<test_uid>';
```

**Expected:** `app_role = 'provider'`. The new
sync_profile_role_to_app_metadata_trg fired on the UPDATE OF role
and propagated the new effective role.

---

## Scenario 3 — profile UPDATE without role change does NOT recompute

This is observability rather than correctness — verify the trigger
short-circuits when role is unchanged.

```sql
-- Capture the current app_metadata to compare:
SELECT raw_app_meta_data FROM auth.users WHERE id = '<test_uid>';

UPDATE public.profiles
SET display_name = 'Avery Test'
WHERE id = '<test_uid>';

SELECT raw_app_meta_data FROM auth.users WHERE id = '<test_uid>';
```

**Expected:** `raw_app_meta_data` is byte-identical before and after.
The `IS NOT DISTINCT FROM OLD.role` guard prevented a no-op UPDATE
on auth.users.

(Note: AFTER UPDATE OF role *only* fires if the update statement
mentions role in its SET list, which a `SET display_name = ...`
does not — so the guard is belt-and-braces.)

---

## Scenario 4 — admin_role wins over profiles.role

```sql
-- Promote to super_admin. Profiles still has 'provider' from Scenario 2.
INSERT INTO public.admin_roles (user_id, role)
VALUES ('<test_uid>', 'super_admin');

SELECT raw_app_meta_data ->> 'role' AS app_role
FROM auth.users WHERE id = '<test_uid>';
```

**Expected:** `app_role = 'super_admin'`. The B-3 admin trigger
fired, called sync_user_role_to_app_metadata, which picked
admin_roles over profiles.role.

---

## Scenario 5 — admin_role removal falls back to profiles.role

```sql
DELETE FROM public.admin_roles WHERE user_id = '<test_uid>';

SELECT raw_app_meta_data ->> 'role' AS app_role
FROM auth.users WHERE id = '<test_uid>';
```

**Expected:** `app_role = 'provider'` (back to the profiles.role
value from Scenario 2). Admin trigger fired on DELETE, recomputed,
picked profiles.role since admin_roles is now empty for this user.

---

## Scenario 6 — DELETE profile falls back to 'patient' default

```sql
DELETE FROM public.profiles WHERE id = '<test_uid>';

SELECT raw_app_meta_data ->> 'role' AS app_role
FROM auth.users WHERE id = '<test_uid>';
```

**Expected:** `app_role = 'patient'`. Profile trigger fired on
DELETE, recomputed, both admin_roles and profiles return nothing,
default 'patient' applied.

(Note: the auth.users row remains; only profiles row is gone. If
your local DB has ON DELETE CASCADE from auth.users → profiles,
delete the auth.users row last.)

---

## Scenario 7 — backfill RPC sets profiles.role and propagates

```sql
-- Reset: ensure profiles row exists with non-provider role.
INSERT INTO public.profiles (id, role) VALUES ('<test_uid>', 'patient')
ON CONFLICT (id) DO UPDATE SET role = 'patient';

SELECT public.backfill_provider_role(ARRAY['<test_uid>']::uuid[]);

SELECT pr.role AS profile_role,
       u.raw_app_meta_data ->> 'role' AS app_role
FROM auth.users u JOIN public.profiles pr ON pr.id = u.id
WHERE u.id = '<test_uid>';
```

**Expected:** `profile_role = 'provider'` AND `app_role = 'provider'`.
RPC returns 1 (one user changed). The profiles trigger then propagated
the change into app_metadata.

---

## Scenario 8 — backfill RPC is idempotent (already at provider)

```sql
-- Run twice in a row:
SELECT public.backfill_provider_role(ARRAY['<test_uid>']::uuid[]);
SELECT public.backfill_provider_role(ARRAY['<test_uid>']::uuid[]);
```

**Expected:** First call returns 1 (changed); second returns 0
(already at provider, ON CONFLICT WHERE clause skipped the update,
audit row not written).

Then verify exactly one audit row was written for this user:

```sql
SELECT count(*) FROM public.admin_audit_log
WHERE action = 'B-7-backfill' AND resource_id = '<test_uid>';
```

**Expected:** 1.

---

## Scenario 9 — backfill creates profiles row when missing (defensive)

```sql
DELETE FROM public.profiles WHERE id = '<test_uid>';

SELECT public.backfill_provider_role(ARRAY['<test_uid>']::uuid[]);

SELECT pr.role FROM public.profiles pr WHERE pr.id = '<test_uid>';
```

**Expected:** `role = 'provider'`. The INSERT branch of the upsert
created the profiles row from scratch.

---

## Scenario 10 — backfill RPC is service-role only (defense-in-depth)

```sql
-- As an authenticated, non-service-role session:
SELECT public.backfill_provider_role(ARRAY['<some_uuid>']::uuid[]);
```

**Expected:** ERROR — `permission denied for function backfill_provider_role`.
REVOKEs in the migration block all non-service-role invocation.

---

## Scenario 11 — reconciliation drift is zero post-migration

This is the verification block from the migration's tail comment.
Run once, immediately after applying 20260423000008.

```sql
SELECT count(*) AS sync_drift
FROM auth.users u
LEFT JOIN public.admin_roles ar ON ar.user_id = u.id
LEFT JOIN public.profiles    p  ON p.id       = u.id
WHERE COALESCE(ar.role, p.role, 'patient')
  IS DISTINCT FROM (u.raw_app_meta_data ->> 'role');
```

**Expected:** `sync_drift = 0`. Every auth.users row reflects the
new effective-role definition.

---

## Cleanup

```sql
DELETE FROM public.admin_audit_log
 WHERE action = 'B-7-backfill' AND resource_id = '<test_uid>';
DELETE FROM public.profiles    WHERE id = '<test_uid>';
DELETE FROM auth.users         WHERE id = '<test_uid>';
```
