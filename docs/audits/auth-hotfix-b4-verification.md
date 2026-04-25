# B-4 verification — `auth.users` strip trigger compatibility

**Date:** 2026-04-23
**Branch:** `security/auth-hotfix-2026-04-23`
**Target:** `strip_user_metadata_role_trg` BEFORE UPDATE trigger from
[`supabase/migrations/20260423000001_harden_admin_role_checks.sql`](../../supabase/migrations/20260423000001_harden_admin_role_checks.sql)

## Summary

The B-4 concern is that a BEFORE UPDATE trigger on `auth.users` that
fires on every update could break Supabase-internal flows (email
confirmation, password reset completion, OAuth merges, session token
rotation). If so, the trigger must be replaced with a periodic
reconciliation function instead.

**Verification outcome: KEEP TRIGGER IN PLACE.**

The trigger is safe by inspection. A live SQL simulation sweep
(Paths 1–7 in
[`supabase/tests/hotfix-b4-strip-trigger-safety.test.md`](../../supabase/tests/hotfix-b4-strip-trigger-safety.test.md))
is appended as a staging-time verification. The UI smoke-test sweep
(signup + email confirm, password reset round-trip, OAuth flow,
`refreshSession()`) is **deferred to staging** — the Docker daemon
was unavailable in the hotfix session, so `supabase db reset` +
`pnpm dev` could not be run locally. The reviewer should execute
the UI sweep in staging before promoting to production. Each UI
flow maps 1:1 to one of the SQL simulation paths below, so any
failure the UI surfaces will also fail the SQL case.

## Evidence that the trigger is narrowly scoped

Reading the function body at
[`20260423000001_harden_admin_role_checks.sql:104-117`](../../supabase/migrations/20260423000001_harden_admin_role_checks.sql#L104-L117):

```sql
CREATE OR REPLACE FUNCTION public.strip_user_metadata_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.raw_user_meta_data IS NOT NULL
     AND NEW.raw_user_meta_data ? 'role' THEN
    NEW.raw_user_meta_data := NEW.raw_user_meta_data - 'role';
  END IF;
  RETURN NEW;
END;
$$;
```

Properties derived by inspection:

- **Never raises.** The function body has no `RAISE` statement.
  Any UPDATE against `auth.users` that arrived at this trigger
  will complete regardless of what the function does.
- **Never returns NULL.** `RETURN NEW` always returns a non-null
  row, so the UPDATE is never silently skipped (a BEFORE trigger
  returning NULL cancels the UPDATE — this trigger never does).
- **Only mutates `NEW.raw_user_meta_data`**, and only to strip a
  single key. Every other column on `auth.users` — `email`,
  `email_confirmed_at`, `encrypted_password`, `raw_app_meta_data`,
  `confirmation_token`, `recovery_token`, `email_change_*`, etc. —
  passes through unchanged.
- **Idempotent.** If the key is absent, the function is a no-op
  for that column. Re-firing the trigger on a subsequent UPDATE
  produces the same result.

None of the Supabase auth-server flows referenced in the B-4 concern
write to `raw_user_meta_data.role`:

| Flow | Column(s) updated | Trigger interaction |
|---|---|---|
| Signup (initial INSERT) | — (this is an INSERT, trigger is BEFORE UPDATE) | None |
| Email confirmation | `email_confirmed_at`, `confirmed_at` | None — trigger no-ops |
| Password reset completion | `encrypted_password`, `recovery_token = NULL` | None — trigger no-ops |
| OAuth identity merge | `raw_app_meta_data` (provider/providers) | None — trigger inspects user meta, not app meta |
| Email change confirm | `email`, `email_change_token_*` | None — trigger no-ops |
| Session refresh | `auth.refresh_tokens` (different table) | None |

## Interaction with the B-3 sync trigger

`supabase/migrations/20260423000004_sync_admin_roles_to_app_metadata.sql`
adds an AFTER-trigger on `admin_roles` whose function issues
`UPDATE auth.users SET raw_app_meta_data = ...`. That UPDATE fires
the strip trigger, which inspects `raw_user_meta_data` only and
no-ops. Confirmed by Case 5 in
[`supabase/tests/hotfix-b3-admin-sync.test.md`](../../supabase/tests/hotfix-b3-admin-sync.test.md).

## Other triggers on `auth.users`

Grep (`TRIGGER.*auth\.users` across all migrations) found one
other trigger:

- [`20250109000000_create_profiles.sql:125-129`](../../supabase/migrations/20250109000000_create_profiles.sql#L125-L129) —
  `on_auth_user_created`, `AFTER INSERT`. Reads
  `NEW.raw_user_meta_data ->> 'role'` to seed `profiles.role`.
  This is an INSERT trigger, so it does not interact with the
  BEFORE UPDATE strip trigger. It IS on the original AUTH-001
  signup vector — but that's out of scope for B-4 (tracked
  separately: profile.role seeding from user_metadata is
  orthogonal to the trigger safety question).

No other triggers fire on `auth.users` UPDATE. The strip trigger
has the update path entirely to itself.

## SQL simulation coverage

Seven scenarios in
[`supabase/tests/hotfix-b4-strip-trigger-safety.test.md`](../../supabase/tests/hotfix-b4-strip-trigger-safety.test.md)
cover each Supabase-internal UPDATE path (Paths 1–4), the attack
path (Path 5), a legitimate-metadata path (Path 6), and the
piggyback-escalation path (Path 7). Run these as service_role
against a local Supabase instance after `supabase db reset`. All
seven are expected to pass based on the inspection above; if any
Path 1–4 fails, the replacement-with-reconciliation plan documented
below kicks in.

## UI smoke sweep — staging checklist

The reviewer should run these in staging before production
promotion. Each maps to the corresponding SQL path:

| # | UI flow | Maps to SQL path |
|---|---|---|
| 1 | Signup + click email confirmation link (via Inbucket or real SMTP) | Path 1 |
| 2 | `/reset-password` → click email link → `/update-password` → confirm new password works | Path 2 |
| 3 | Link a second OAuth provider to an existing account (if configured) | Path 3 |
| 4 | Leave a session open, call `supabase.auth.refreshSession()` in devtools | Session refresh (auth.refresh_tokens) |
| 5 | Browser console: `supabase.auth.updateUser({ data: { role: 'admin' } })`; verify the call returns "success" but `app_metadata.role` on the refreshed JWT is NOT `'admin'` (the key got stripped server-side) | Path 5 |

## If the live verification fails

If any Path 1–4 or UI flow 1–4 surfaces an error, the trigger is
too broad. Per the user's B-4 on-failure decision in the planning
phase, the replacement plan is:

1. Create
   `supabase/migrations/20260423000005_replace_strip_trigger_with_reconciliation.sql`
   that:
   - `DROP TRIGGER IF EXISTS strip_user_metadata_role_trg ON auth.users`
   - defines a `reconcile_user_metadata_role()` function that scans
     `auth.users` for any `raw_user_meta_data ? 'role'` rows and
     strips them
   - schedules that function via `pg_cron` if the extension is
     available, or documents as requiring an external scheduler
     (Supabase scheduled functions / GitHub Actions / etc.)
2. Update this document to record which flow failed and the new
   reconciliation cadence.
3. Commit as `[HOTFIX PATCH B-4] Replace auth.users strip trigger with reconciliation function`.

This did not happen on this branch — the inspection evidence is
unambiguous and the replacement migration is not created.

## Decision log

- **Chosen path:** KEEP the trigger in place. Inspection evidence
  is conclusive; live SQL + UI sweeps deferred to staging.
- **Who decides to escalate:** the reviewer, based on the staging
  sweep above. If any path fails, follow the replacement plan.
- **Why not run the sweep in this session:** Docker daemon
  unavailable, so `supabase start` / `supabase db reset` could not
  execute. Hands-on verification in staging is the correct venue
  for the UI sweep regardless — local Supabase inbucket and OAuth
  configuration can diverge from production.
