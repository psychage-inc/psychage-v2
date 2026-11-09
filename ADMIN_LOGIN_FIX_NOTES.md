# Admin Login Fix — Remediation Notes

**Date:** 2026-06-07 · **Branch:** `fix/admin-login-role-claim`
**Companion to:** [ADMIN_AUDIT_FINDINGS.md](ADMIN_AUDIT_FINDINGS.md) (kept pristine — this file records the remediation).

## What was fixed (CODE)

| Audit ID | Fix |
|---|---|
| P0-01 | Role value-vocabulary mismatch — client now recognizes `super_admin\|clinical_admin\|viewer` as admin. |
| P0-02 | Split-brain — one helper (`src/lib/adminRole.ts`) is the sole admin-role decision point. |
| P1-01 | Missing `get_user_by_email` RPC added (migration `20260607000002`). |
| P0-01 (OAuth) | `AuthCallback` now routes from `app_metadata.role` via the helper, not the user-writable `user_metadata.role` — OAuth / email-confirm admin login works (follow-up `9e469d4`). |

### Contract (confirmed in recon)
The claim **key already matched** — the trigger writes `raw_app_meta_data.role`
(surfaced as `user.app_metadata.role`), which the client already reads. **Only the value
vocabulary was wrong.** So the DB trigger was **not** rewritten; the new migration only
re-asserts the claim idempotently.

### Single decision point
`src/lib/adminRole.ts` exports `isAdminRole` / `getAdminTier`. Imported by:
`context/AuthContext.tsx`, `components/auth/RoleGuard.tsx`, `hooks/useAdminAuth.ts`,
`pages/auth/LoginPage.tsx`, `services/userProfileService.ts`, `pages/auth/AuthCallback.tsx`.
Tier preserved on `User.adminRole`; coarse `User.role` drives binary gating only.

`isAdminRole` accepts the three granular tiers **and** the legacy coarse `'admin'` — the
predicate runs on both raw `app_metadata.role` claims and the app's own coarse `user.role`
(e.g. `RoleGuard`), and it keeps a legacy/manual `'admin'` claim from silently mapping to
`'patient'`. `getAdminTier` stays granular-only (a coarse `'admin'` has no tier).

## Scope notes / deviations
- **`userProfileService.ts`** (beyond the audit's named scope) had the identical broken
  `=== 'admin'` pattern on `app_metadata.role` and was routed through the helper too
  (approved scope decision) — otherwise it would remain a 4th independent re-derivation.
- **`AuthCallback.tsx`** now routes from `app_metadata.role` via `isAdminRole` (follow-up
  `9e469d4`). Previously read the user-writable `user_metadata.role` (stripped by the
  AUTH-001 trigger), which mis-routed admins **and** providers on the OAuth / email-confirm
  path. Included this pass per explicit scope decision.
- **`useAdminAuth.ts:40` dev bypass** still reads `user_metadata.role === 'admin'` — left
  intentionally. It fires only when no `admin_roles` row exists yet (dev convenience, seeded
  by `create-demo-admin.ts`), where `app_metadata.role` would not yet be an admin tier;
  routing it through the helper on `app_metadata` would defeat its purpose. `isDev`-gated,
  prod unaffected (P3-02).
- `conventions.md` referenced by the task does not exist in the repo; the two-commit
  structure was followed regardless.
- **Tests:** `tsc --noEmit` is clean and pure-logic vitest suites pass. The React-rendering
  suites (`AuthContext.test.tsx`, `RoleGuard.test.tsx`) are **unrunnable locally** — a
  pre-existing duplicate-React / `useRef of null` env fault (corrupted node_modules), not a
  logic failure. The backward-compat `'admin'` keeps `AuthContext.test.tsx` logically green
  once the env is repaired.
- Pre-existing lint errors in `LoginPage.tsx:14` (`mainUrl` unused) and
  `userProfileService.ts:155,324` were **not** touched (surgical-changes rule); none are in
  the lines this fix added.

## HUMAN runbook — required AFTER this code lands (not done by the code)
1. **Apply both new migrations** to the live Supabase DB:
   `20260607000001_align_admin_role_claim.sql` (backfill) and
   `20260607000002_add_get_user_by_email_rpc.sql` (invite RPC).
2. Confirm a `public.admin_roles` row exists for your account. If not, insert it, then
   **log out and back in** so the JWT refreshes with the granular claim.
3. Verify login on the **main origin** first (URL helpers fall back to same-origin when
   `VITE_ADMIN_URL` is unset) — confirms the fix without waiting on DNS.
4. Separately, for prod on `admin.psychage.com`: attach the subdomain in Vercel, add the
   DNS CNAME, set `VITE_ADMIN_URL`. This host-rewrite path is independent of the login fix.

## Provisioning / resetting a REAL admin (when a person's password or email "won't work")

The login *code* is correct; "password/email not working" is almost always an
account-data problem in the live DB, not a UI bug. The hard-coded
`create-demo-admin.ts` / `seed-admin.mjs` only handle the demo/test emails.
Use `scripts/provision-admin.mjs` for any real account — it is idempotent and
safe to run against production:

```bash
# Point your shell at PRODUCTION first. VITE_SUPABASE_URL MUST be the same
# project the live admin site talks to (Vercel → Settings → Env Vars):
export VITE_SUPABASE_URL=https://<project>.supabase.co
export SUPABASE_SERVICE_ROLE_KEY=<prod service-role key>   # never commit this
export VITE_SUPABASE_ANON_KEY=<prod anon key>              # enables the real login test

# Create-or-repair the account (resets password, confirms email, grants role,
# verifies the synced app_metadata.role claim, and then actually SIGNS IN to
# prove the credentials work — look for "LOGIN TEST PASSED"):
node scripts/provision-admin.mjs --email lena@psychage.com --password 'NewStrongPass123!'

# Non-super-admin tiers:
node scripts/provision-admin.mjs --email lena@psychage.com --password '...' --role clinical_admin
```

**If the live site still rejects the password after the script reports
success**, you ran it against the wrong Supabase project. The script's
service-role steps will happily succeed on a dev/local project while prod is
untouched. Confirm `VITE_SUPABASE_URL` above is byte-for-byte the value baked
into the deployed app, then re-run. The built-in `LOGIN TEST` (enabled by the
anon key) is the decisive proof — if it prints `LOGIN TEST PASSED`, those exact
credentials will work in the browser against that project.

It handles all three failure modes behind "can't log in":
- **wrong/never-set password or unconfirmed email** → resets password + `email_confirm`;
- **no `admin_roles` row** (panel rejects with "does not have admin access") → upserts it;
- **stale JWT claim** → the `admin_roles` trigger re-syncs `app_metadata.role`, and the
  script reads the user back to confirm the claim landed.

After running, have the person **log out and back in** so their JWT refreshes.
