# AUTH-006 — profiles.role canonical states (SQL test scenarios)

Migration under test:
`supabase/migrations/20260425000001_data_layer_profiles_role_cleanup.sql`

Run each scenario in the Supabase SQL editor with **service-role**
context. Reset state between scenarios so the next one starts clean.

Pre-conditions:
- All migrations through 20260423000008 (B-7 extend role sync) applied.
- The migration under test is NOT yet applied at the start of each
  scenario unless the scenario explicitly applies it.

Common setup (per scenario, adjust UUID per run):

```sql
-- Throwaway auth.users row. The handle_new_user trigger seeds a
-- profiles row with role='patient' by default.
INSERT INTO auth.users
  (id, instance_id, email, raw_user_meta_data, raw_app_meta_data,
   created_at, updated_at, aud, role)
VALUES
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000',
   'auth-006-test@example.com', '{}'::jsonb, '{}'::jsonb,
   now(), now(), 'authenticated', 'authenticated')
RETURNING id;
-- Capture as <test_uid>.
```

---

## Scenario 1 — Clean state (no stranded admins): migration succeeds

```sql
-- profiles.role default 'patient'; no admin_roles entry. Apply migration.
\i supabase/migrations/20260425000001_data_layer_profiles_role_cleanup.sql
```

**Expected:** Migration applies cleanly. CHECK constraint is now
`role IN ('patient', 'provider')`. Verify:

```sql
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'public.profiles'::regclass
  AND conname = 'profiles_role_check';
```

Expected `pg_get_constraintdef`:
`CHECK ((role)::text = ANY ((ARRAY['patient'::character varying, 'provider'::character varying])::text[]))`
(or equivalent — the exact rendering varies by Postgres version).

---

## Scenario 2 — Reconciled admin: profiles.role='admin' WITH admin_roles entry

```sql
-- Pre-migration: simulate the pre-B-3 stranded data.
UPDATE public.profiles SET role = 'admin' WHERE id = '<test_uid>';
INSERT INTO public.admin_roles (user_id, role)
VALUES ('<test_uid>', 'super_admin');

-- Apply migration:
\i supabase/migrations/20260425000001_data_layer_profiles_role_cleanup.sql

-- Verify reconciliation:
SELECT pr.role AS profile_role,
       ar.role AS admin_role
FROM public.profiles pr
JOIN public.admin_roles ar ON ar.user_id = pr.id
WHERE pr.id = '<test_uid>';
```

**Expected:** `profile_role = 'patient'` (Step 1 rewrote it),
`admin_role = 'super_admin'` (preserved). The user remains an admin
via admin_roles; profiles.role no longer carries the stranded value.

The B-7 sync trigger fires on the UPDATE OF role and recomputes
auth.users.raw_app_meta_data.role — it should pick admin_roles over
profiles.role, leaving app_metadata.role at 'super_admin':

```sql
SELECT raw_app_meta_data ->> 'role' FROM auth.users WHERE id = '<test_uid>';
```

**Expected:** `'super_admin'`.

---

## Scenario 3 — Stranded admin without admin_roles: migration aborts

```sql
-- Pre-migration: stranded admin (no admin_roles entry).
UPDATE public.profiles SET role = 'admin' WHERE id = '<test_uid>';
DELETE FROM public.admin_roles WHERE user_id = '<test_uid>';

-- Attempt migration:
\i supabase/migrations/20260425000001_data_layer_profiles_role_cleanup.sql
```

**Expected:** Migration ABORTS with:
```
ERROR:  AUTH-006: 1 stranded admin row(s) in public.profiles with no
admin_roles entry. Reconcile manually (promote into admin_roles, or
set profiles.role to patient/provider) before re-running. Affected
ids: <test_uid>
```

Verify nothing was changed:

```sql
SELECT role FROM public.profiles WHERE id = '<test_uid>';

SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'public.profiles'::regclass
  AND conname = 'profiles_role_check';
```

**Expected:** `role = 'admin'` (unchanged), CHECK still permissive
(`patient | provider | admin`). The transaction rolled back.

---

## Scenario 4 — Manual reconcile then re-run: succeeds

Continuing from Scenario 3 (one stranded admin):

Operator decides to demote (the user is not actually an admin):

```sql
UPDATE public.profiles SET role = 'patient' WHERE id = '<test_uid>';

-- Re-run migration:
\i supabase/migrations/20260425000001_data_layer_profiles_role_cleanup.sql
```

**Expected:** Migration applies cleanly. CHECK constraint now narrowed.

OR operator decides to promote:

```sql
INSERT INTO public.admin_roles (user_id, role)
VALUES ('<test_uid>', 'viewer');

-- Re-run migration:
\i supabase/migrations/20260425000001_data_layer_profiles_role_cleanup.sql
```

**Expected:** Step 1 reconciles — profiles.role becomes 'patient',
admin_roles entry preserves admin status. CHECK applied.

---

## Scenario 5 — Post-migration write of role='admin' is rejected

After the migration is applied:

```sql
UPDATE public.profiles SET role = 'admin' WHERE id = '<test_uid>';
```

**Expected:**
```
ERROR:  new row for relation "profiles" violates check constraint "profiles_role_check"
```

```sql
INSERT INTO public.profiles (id, role) VALUES (gen_random_uuid(), 'admin');
```

**Expected:** Same CHECK violation.

---

## Scenario 6 — Idempotent re-run: no-op on clean state

After the migration is already applied (CHECK is narrowed):

```sql
\i supabase/migrations/20260425000001_data_layer_profiles_role_cleanup.sql
```

**Expected:** Applies without error. Step 1 UPDATE matches no rows
(no profiles.role='admin' values exist). Step 2 NOTICE block finds
zero stranded admins. Step 3 drops the (already narrowed) constraint
and re-adds it with the same definition. Net effect: no observable
change; safe to re-run.

---

## Cleanup

```sql
DELETE FROM public.admin_roles WHERE user_id = '<test_uid>';
DELETE FROM public.profiles    WHERE id = '<test_uid>';
DELETE FROM auth.users         WHERE id = '<test_uid>';
```
