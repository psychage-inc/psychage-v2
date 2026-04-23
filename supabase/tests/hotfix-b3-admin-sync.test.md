# Hotfix B-3 — `admin_roles` → `app_metadata.role` sync trigger

Manual SQL test cases for
`supabase/migrations/20260423000004_sync_admin_roles_to_app_metadata.sql`.

Run against a local Supabase instance after `supabase db reset`.
Execute via the Supabase SQL editor or `psql` with service-role
privileges — these scenarios both read and write `auth.users`.

## Setup

```sql
-- Pick a test user that has NO admin_roles row and NO app_metadata.role
-- at the start.
--   :uid = UUID of a fresh test user
DELETE FROM public.admin_roles WHERE user_id = :uid;
UPDATE auth.users
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) - 'role'
WHERE id = :uid;
```

---

## Case 1 — INSERT into admin_roles populates app_metadata.role

```sql
INSERT INTO public.admin_roles (user_id, role) VALUES (:uid, 'viewer');

SELECT raw_app_meta_data ->> 'role' AS role
FROM auth.users WHERE id = :uid;
```

**Pass criterion:** `role = 'viewer'`. The AFTER INSERT trigger fired
and wrote the denormalized key.

---

## Case 2 — UPDATE role is reflected

```sql
UPDATE public.admin_roles SET role = 'super_admin' WHERE user_id = :uid;

SELECT raw_app_meta_data ->> 'role' AS role
FROM auth.users WHERE id = :uid;
```

**Pass criterion:** `role = 'super_admin'`.

---

## Case 3 — DELETE strips the key

```sql
DELETE FROM public.admin_roles WHERE user_id = :uid;

SELECT raw_app_meta_data ? 'role' AS still_has_key
FROM auth.users WHERE id = :uid;
```

**Pass criterion:** `still_has_key = false`. The demoted admin loses
client-side UI affordances on their next JWT refresh.

---

## Case 4 — Post-migration reconciliation covered existing admins

Run against a database that had admins BEFORE this migration landed
(e.g., a copy of production restored locally):

```sql
SELECT
  COUNT(*) FILTER (WHERE u.raw_app_meta_data ->> 'role' IS NULL) AS unsynced,
  COUNT(*) AS total
FROM auth.users u
JOIN public.admin_roles a ON u.id = a.user_id;
```

**Pass criterion:** `unsynced = 0`. Every `admin_roles` row has a
matching `raw_app_meta_data.role` after the one-time reconciliation
DO block executed.

---

## Case 5 — Strip trigger from 20260423000001 does not interfere

The sync function issues `UPDATE auth.users`. That fires the
`strip_user_metadata_role_trg` BEFORE UPDATE trigger, which touches
`raw_user_meta_data` only. Verify the sync write is not corrupted:

```sql
-- Plant a stale role claim in raw_user_meta_data (attacker-ish, but
-- could also be legacy data from before the hotfix).
ALTER TABLE auth.users DISABLE TRIGGER strip_user_metadata_role_trg;
UPDATE auth.users
SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
WHERE id = :uid;
ALTER TABLE auth.users ENABLE TRIGGER strip_user_metadata_role_trg;

-- Trigger the sync via admin_roles INSERT:
INSERT INTO public.admin_roles (user_id, role) VALUES (:uid, 'clinical_admin')
ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role;

-- Assert: app_metadata got the clinical_admin value AND user_metadata
-- was stripped by the strip trigger during the sync's UPDATE.
SELECT
  raw_app_meta_data ->> 'role' AS app_role,
  raw_user_meta_data ? 'role' AS user_has_role
FROM auth.users WHERE id = :uid;
```

**Pass criterion:** `app_role = 'clinical_admin'` AND `user_has_role = false`.

This confirms the two triggers cooperate:
  - B-3 sync writes the correct value into `raw_app_meta_data`.
  - B-1-era strip opportunistically removes the stale role from
    `raw_user_meta_data` as a side effect of the same UPDATE.

---

## Case 6 — Priority ordering for multi-role (schema-forward test)

Under the current `UNIQUE(user_id)` constraint this case is NOT
executable — the INSERT would fail the constraint. It documents the
expected behavior if UNIQUE is ever relaxed:

```sql
-- Conceptually: if admin_roles had (user_id, role) UNIQUE instead of
-- (user_id) UNIQUE, and a user held both 'clinical_admin' and 'viewer',
-- the sync should pick 'clinical_admin' (priority 2 < priority 3).
--
-- Not runnable today. Retained as a design note so future schema
-- changes preserve the priority intent.
```

**Pass criterion:** not applicable under current schema. Documented
for schema evolution only.

---

## Cleanup

```sql
DELETE FROM public.admin_roles WHERE user_id = :uid;
UPDATE auth.users
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) - 'role'
WHERE id = :uid;
```
