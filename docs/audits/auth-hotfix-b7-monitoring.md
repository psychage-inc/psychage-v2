# B-7 Post-Deploy Monitoring

Run these queries daily for **7 days** after the B-7 backfill executes.
Any non-zero result is a red flag and warrants immediate inspection.

Service-role connection required (auth.users access).

---

## Q1 — Providers with broken role resolution

A claimed provider whose `profiles.role` is missing or non-`'provider'`
is invisible to RoleGuard and will be denied `/portal/*`.

```sql
SELECT count(*) AS broken_providers
FROM public.providers p
JOIN auth.users u ON u.id = p.user_id
LEFT JOIN public.profiles pr ON pr.id = u.id
WHERE p.user_id IS NOT NULL
  AND p.status   <> 'seeded'
  AND (pr.role IS NULL OR pr.role <> 'provider');
```

**Expected:** `0`.

If non-zero: a new claim flow path exists that does not write
`profiles.role`, OR a user's profiles row was manually edited. Run
the diagnostic for the per-user list:

```sql
SELECT * FROM public.b7_provider_regression_diagnostic();
```

---

## Q2 — Drift between profiles.role and app_metadata.role

Indicates the Phase D sync trigger failed to fire for some user, or
a manual `UPDATE public.profiles SET role` bypassed the trigger
(possible if RLS lets a user write their own profile but the trigger
is somehow disabled).

```sql
SELECT count(*) AS sync_drift
FROM auth.users u
LEFT JOIN public.admin_roles ar ON ar.user_id = u.id
LEFT JOIN public.profiles    p  ON p.id       = u.id
WHERE COALESCE(ar.role, p.role, 'patient')
  IS DISTINCT FROM (u.raw_app_meta_data ->> 'role');
```

**Expected:** `0`.

If non-zero: re-run the reconciliation block from
`20260423000008_b7_extend_role_sync.sql` (the bulk UPDATE inside the
migration is idempotent — copy and run it standalone). If drift
returns: the sync trigger may be disabled. Check:

```sql
SELECT tgname, tgenabled
FROM pg_trigger
WHERE tgname IN (
  'sync_admin_role_to_app_metadata_trg',
  'sync_profile_role_to_app_metadata_trg'
);
-- tgenabled must be 'O' (origin/default firing) for both.
```

---

## Q3 — Admin metadata escapees (AUTH-001 strip trigger active?)

Any non-zero result means the narrowed strip trigger from Phase C is
either disabled or its body has reverted to a permissive form.

```sql
SELECT count(*) AS stray_admin_metadata
FROM auth.users
WHERE raw_user_meta_data ->> 'role' = 'admin';
```

**Expected:** `0`.

If non-zero: inspect the trigger:

```sql
SELECT tgname, tgenabled FROM pg_trigger
WHERE tgname = 'strip_user_metadata_role_trg';
-- tgenabled must be 'O'

SELECT pg_get_functiondef('public.strip_user_metadata_role()'::regprocedure);
-- Body must contain: NEW.raw_user_meta_data ->> 'role' = 'admin'
```

---

## Q4 — B-7 backfill audit activity (one-time post-execute check)

Run once, immediately after `scripts/b7-backfill-provider-roles.ts
--execute` completes. Should match the script's reported
affected_count, and `latest` should be on the execution day.

```sql
SELECT action, count(*) AS rows_written, max(created_at) AS latest
FROM public.admin_audit_log
WHERE action = 'B-7-backfill'
GROUP BY action;
```

**Expected:** one row with `rows_written = <affected_count from
script output>` and `latest` matching the script's run timestamp
within seconds.

---

## Daily monitoring log template

Record results below for the 7-day window. Any non-zero in Q1, Q2,
or Q3 — open an investigation immediately and pause further role
changes until the cause is understood.

| Day | Q1 broken | Q2 drift | Q3 admin meta | Notes |
|---|---|---|---|---|
| Day 1 (backfill day) | | | | |
| Day 2 | | | | |
| Day 3 | | | | |
| Day 4 | | | | |
| Day 5 | | | | |
| Day 6 | | | | |
| Day 7 | | | | |

---

## Beyond Day 7

If all four queries return zero on every day, mark the incident
closed in `auth-hotfix-b7-incident.md` §6 and retire this monitoring
schedule. The diagnostic RPC and backfill RPC remain in place
permanently as cheap re-verification tools.
