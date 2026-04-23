# Hotfix B-2 — `migrate_admin_role()` service-role lockdown

Verification scenarios for the existing REVOKE statements on
`public.migrate_admin_role(uuid, text, text)` in
`supabase/migrations/20260423000001_harden_admin_role_checks.sql`.

B-2 does NOT ship a new migration — inspection confirmed the REVOKE
is already in place (lines 222 of 20260423000001):

```sql
REVOKE ALL ON FUNCTION public.migrate_admin_role(uuid, text, text)
  FROM PUBLIC, authenticated, anon;
```

These scenarios exist so the reviewer can verify the lockdown holds
after applying the full migration chain. If any scenario fails, the
REVOKE was regressed by a later migration — halt the deploy and
investigate before proceeding.

---

## Case 1 — authenticated non-admin → permission denied

Setup: a test user `:uid_regular` who has no row in `admin_roles`.

Run with their JWT:

```bash
curl -s -X POST \
  -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $USER_JWT_REGULAR" \
  -H "Content-Type: application/json" \
  "$SUPABASE_URL/rest/v1/rpc/migrate_admin_role" \
  -d '{"_user_id":"'$UID_REGULAR'","_action":"promote","_granular_role":"super_admin"}'
```

**Pass criterion:** response body contains an error with code `42501`
(`permission denied for function migrate_admin_role`). No row is
written to `admin_roles`. Verify with service_role:

```sql
SELECT * FROM public.admin_roles WHERE user_id = :uid_regular;
-- Expected: zero rows.
```

---

## Case 2 — authenticated admin → permission denied

Setup: a test user `:uid_admin` who IS in `admin_roles` (as
`super_admin`, via service-role seed). Admin UI status grants RLS
privileges via `is_admin()`, but it does NOT grant the ability to
reconcile roles through this RPC — that authority belongs to the
service-role script.

Run with the admin's JWT:

```bash
curl -s -X POST \
  -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $USER_JWT_ADMIN" \
  -H "Content-Type: application/json" \
  "$SUPABASE_URL/rest/v1/rpc/migrate_admin_role" \
  -d '{"_user_id":"'$UID_TARGET'","_action":"promote","_granular_role":"viewer"}'
```

**Pass criterion:** same as Case 1 — `42501` / permission denied.
The target user `:uid_target` is NOT promoted:

```sql
SELECT * FROM public.admin_roles WHERE user_id = :uid_target;
-- Expected: no row where role='viewer' was just inserted.
```

This scenario is the AUTH-001-reborn defense: even a real admin
cannot use the RPC to escalate a friend, because the RPC is
structurally out of their reach.

---

## Case 3 — service_role → succeeds

Run with the service-role key (same transport pattern as
`scripts/migrate-admin-roles.ts`):

```bash
curl -s -X POST \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  "$SUPABASE_URL/rest/v1/rpc/migrate_admin_role" \
  -d '{"_user_id":"'$UID_TARGET'","_action":"promote","_granular_role":"viewer"}'
```

**Pass criterion:** HTTP 200 with a JSON body containing `user_id`,
`action`, `before`, and `after` keys. `admin_roles` now has a
`viewer` row for `:uid_target`:

```sql
SELECT role FROM public.admin_roles WHERE user_id = :uid_target;
-- Expected: 'viewer'
```

Cleanup after the test:

```sql
DELETE FROM public.admin_roles WHERE user_id = :uid_target;
```

---

## Case 4 — `information_schema` audit query

Run as service_role (once, post-migration). This is the single query
that belongs in the deploy checklist:

```sql
SELECT grantee, privilege_type
FROM information_schema.routine_privileges
WHERE routine_schema = 'public'
  AND routine_name = 'migrate_admin_role';
```

**Pass criterion:** the only grantee is `postgres` (function owner /
service-role internals). No row for `authenticated`, `anon`, or
`PUBLIC`. If any of those three appear, a later migration has
regressed the lockdown — halt and apply a remediation REVOKE before
proceeding.

The equivalent check for the B-1 RPC:

```sql
SELECT grantee, privilege_type
FROM information_schema.routine_privileges
WHERE routine_schema = 'public'
  AND routine_name = 'auth_001_diagnostic_admin_states';
```

Same pass criterion.
