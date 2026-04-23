# Hotfix B-4 — `auth.users` BEFORE UPDATE strip trigger safety

SQL simulation scenarios for the
`strip_user_metadata_role_trg` BEFORE UPDATE trigger installed by
`supabase/migrations/20260423000001_harden_admin_role_checks.sql`.

Goal: exercise the internal UPDATE paths Supabase runs against
`auth.users` during ordinary auth flows and confirm the trigger does
not break them. Each path is a standalone UPDATE that simulates what
the Supabase Auth server does server-side during the corresponding
user flow.

Run against a local Supabase instance as **service_role** (the
`SUPABASE_SERVICE_ROLE_KEY`). Create a test user first:

```sql
-- :uid = UUID of a test user created via the Supabase dashboard or
-- the admin API. Assumed to exist for every case below.
```

---

## Path 1 — Email confirmation

Supabase sets `email_confirmed_at` after the user clicks the
verification link:

```sql
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE id = :uid;

SELECT email_confirmed_at IS NOT NULL AS confirmed
FROM auth.users WHERE id = :uid;
```

**Pass criterion:** 1 row affected, no error, `confirmed = true`.
The strip trigger inspects `NEW.raw_user_meta_data` only; since we
did not touch that column, no modification happens in the trigger
body and the UPDATE proceeds normally.

---

## Path 2 — Password reset completion

Supabase updates `encrypted_password` after the user completes the
recovery flow on `/update-password`:

```sql
UPDATE auth.users
SET encrypted_password = '$2a$10$placeholder_for_testing'
WHERE id = :uid;
```

**Pass criterion:** 1 row affected, no error. Same rationale as
Path 1 — `encrypted_password` is a different column, trigger no-ops.

---

## Path 3 — OAuth identity merge / provider link

When a user links a second OAuth provider to their account, Supabase
merges the provider metadata into `raw_app_meta_data`:

```sql
UPDATE auth.users
SET raw_app_meta_data =
  COALESCE(raw_app_meta_data, '{}'::jsonb)
  || jsonb_build_object('provider', 'google', 'providers', '["email","google"]'::jsonb)
WHERE id = :uid;

SELECT raw_app_meta_data ->> 'provider' AS provider
FROM auth.users WHERE id = :uid;
```

**Pass criterion:** 1 row affected, no error, `provider = 'google'`.
The strip trigger only mutates `raw_user_meta_data`; `raw_app_meta_data`
passes through untouched (critical for B-3's sync trigger to work).

---

## Path 4 — Recovery-token issuance

Supabase sets `confirmation_token` / `recovery_token` / `email_change_token_new`
during the email-change and password-reset flows:

```sql
UPDATE auth.users
SET recovery_token = 'simulated_recovery_token_hash',
    recovery_sent_at = NOW()
WHERE id = :uid;
```

**Pass criterion:** 1 row affected, no error.

---

## Path 5 — The attack path (this is what the trigger exists for)

A client writes `raw_user_meta_data.role = 'admin'` via
`supabase.auth.updateUser({ data: { role: 'admin' } })`. The strip
trigger should silently remove the key.

```sql
UPDATE auth.users
SET raw_user_meta_data =
  COALESCE(raw_user_meta_data, '{}'::jsonb)
  || jsonb_build_object('role', 'admin')
WHERE id = :uid;

SELECT raw_user_meta_data ? 'role' AS attack_succeeded
FROM auth.users WHERE id = :uid;
```

**Pass criterion:** 1 row affected, no error, `attack_succeeded = false`.
This is the AUTH-001 defense working.

---

## Path 6 — Writing a legitimate non-role metadata field

A user updates their display name. The trigger must NOT strip
unrelated metadata keys:

```sql
UPDATE auth.users
SET raw_user_meta_data =
  COALESCE(raw_user_meta_data, '{}'::jsonb)
  || jsonb_build_object('display_name', 'Test User')
WHERE id = :uid;

SELECT raw_user_meta_data ->> 'display_name' AS display_name
FROM auth.users WHERE id = :uid;
```

**Pass criterion:** 1 row affected, `display_name = 'Test User'`.
The trigger only touches the `role` key — other keys survive.

---

## Path 7 — Combined: legitimate metadata AND malicious role in one UPDATE

The attacker might try to piggyback the escalation on a legitimate
update:

```sql
UPDATE auth.users
SET raw_user_meta_data =
  COALESCE(raw_user_meta_data, '{}'::jsonb)
  || jsonb_build_object('display_name', 'Sneaky', 'role', 'admin')
WHERE id = :uid;

SELECT
  raw_user_meta_data ->> 'display_name' AS display_name,
  raw_user_meta_data ? 'role' AS has_role
FROM auth.users WHERE id = :uid;
```

**Pass criterion:** `display_name = 'Sneaky'` AND `has_role = false`.
The legitimate part lands, the escalation is stripped.

---

## Interpretation

- **If all 7 pass:** the trigger is narrowly scoped to its target
  and safe to keep in place.
- **If any of Paths 1–4 raise an error or drop data:** the trigger
  is interfering with a Supabase-internal flow. Replace with the
  reconciliation-function variant (see
  `auth-hotfix-b4-verification.md` for the replacement decision
  and the corresponding migration file).
- **If Path 5 does not strip:** the AUTH-001 defense is broken —
  DO NOT deploy. Investigate trigger binding and function ownership.
