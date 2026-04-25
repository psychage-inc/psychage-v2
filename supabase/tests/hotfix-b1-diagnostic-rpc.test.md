# Hotfix B-1 — `auth_001_diagnostic_admin_states()` RPC

Manual SQL test cases for
`supabase/migrations/20260423000003_auth_001_diagnostic_rpc.sql`.

Run against a local Supabase instance after `supabase db reset`.
Execute via the Supabase SQL editor, `psql`, or the service-role REST
client. Scenarios marked `as service_role` must be run with the
`SUPABASE_SERVICE_ROLE_KEY` (the local CLI exposes it as
`supabase status` → `service_role key`).

## Setup

```sql
-- Create three test users. Use placeholders below:
--   :uid_a = user in admin_roles only (State A)
--   :uid_b = user with raw_user_meta_data.role='admin' only (State B)
--   :uid_c = user in both (State C)
--   :uid_d = user with raw_user_meta_data.role='viewer' (State D — non-admin key)

-- State A: ensure admin_roles row exists, no metadata
INSERT INTO public.admin_roles (user_id, role) VALUES (:uid_a, 'viewer')
ON CONFLICT (user_id) DO NOTHING;
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data - 'role' WHERE id = :uid_a;

-- State B: metadata only (NB: the AUTH-001 strip trigger strips this
-- on next UPDATE, so insert with a direct auth.admin API or disable the
-- trigger for setup: ALTER TABLE auth.users DISABLE TRIGGER strip_user_metadata_role_trg;)
DELETE FROM public.admin_roles WHERE user_id = :uid_b;
ALTER TABLE auth.users DISABLE TRIGGER strip_user_metadata_role_trg;
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"role":"admin"}'::jsonb WHERE id = :uid_b;
ALTER TABLE auth.users ENABLE TRIGGER strip_user_metadata_role_trg;

-- State C: both
INSERT INTO public.admin_roles (user_id, role) VALUES (:uid_c, 'super_admin')
ON CONFLICT (user_id) DO NOTHING;
ALTER TABLE auth.users DISABLE TRIGGER strip_user_metadata_role_trg;
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"role":"admin"}'::jsonb WHERE id = :uid_c;
ALTER TABLE auth.users ENABLE TRIGGER strip_user_metadata_role_trg;

-- State D: metadata has 'role' but value is not 'admin'
ALTER TABLE auth.users DISABLE TRIGGER strip_user_metadata_role_trg;
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"role":"viewer"}'::jsonb WHERE id = :uid_d;
ALTER TABLE auth.users ENABLE TRIGGER strip_user_metadata_role_trg;
```

---

## Case 1 — State B detection (the reason this RPC exists)

Run **as service_role**:

```sql
SELECT state, user_count, user_ids
FROM public.auth_001_diagnostic_admin_states()
WHERE state = 'B_user_metadata_only';
```

**Pass criterion:** `user_count >= 1` and `:uid_b = ANY(user_ids)`.

If State B users are missing from the output, the script's assumption
that it can enumerate escalation-risk users via this RPC is broken —
`scripts/migrate-admin-roles.ts` would auto-demote nobody and the
AUTH-001 remediation would silently skip the population it targets.

---

## Case 2 — All four states present

Run **as service_role**:

```sql
SELECT state, user_count
FROM public.auth_001_diagnostic_admin_states()
ORDER BY state;
```

**Pass criterion:** four rows returned — `A_admin_roles_only`,
`B_user_metadata_only`, `C_both_sources`, `D_metadata_role_non_admin` —
each with `user_count >= 1` (given the setup above).

---

## Case 3 — Permission denied to `anon`

Run **as anon** (public REST call with no JWT):

```bash
curl -s -X POST \
  -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  "$SUPABASE_URL/rest/v1/rpc/auth_001_diagnostic_admin_states" \
  -d '{}'
```

**Pass criterion:** response is an error with code `42501`
(`permission denied for function auth_001_diagnostic_admin_states`)
or PostgREST equivalent. Must **not** return the state rows.

---

## Case 4 — Permission denied to `authenticated`

Run **as authenticated** (with a valid user JWT, any role, even an
admin — admin UI status does not grant RPC execute):

```bash
curl -s -X POST \
  -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $USER_JWT" \
  -H "Content-Type: application/json" \
  "$SUPABASE_URL/rest/v1/rpc/auth_001_diagnostic_admin_states" \
  -d '{}'
```

**Pass criterion:** same as Case 3 — `42501` / permission denied.
The ability to see who has admin metadata is *itself* sensitive
(reconnaissance for targeted escalation), so it cannot leak to
authenticated sessions even if the caller happens to be an admin.

---

## Case 5 — Empty result shape when no admins exist

Run **as service_role** against an empty DB (fresh `supabase db reset`
with no seeded admins):

```sql
SELECT state, user_count, user_ids
FROM public.auth_001_diagnostic_admin_states()
ORDER BY state;
```

**Pass criterion:** four rows, each with `user_count = 0` and
`user_ids = '{}'`. The RPC must be well-defined on empty data — the
`COALESCE(ARRAY_AGG(...), ARRAY[]::uuid[])` in the function body
guarantees this.
