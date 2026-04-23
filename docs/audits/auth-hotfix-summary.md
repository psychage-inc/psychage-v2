# Auth Hotfix — Reviewer Summary

Branch: `security/auth-hotfix-2026-04-23`
Base: `main` at `566a276`
Scope: CRITICAL/HIGH security findings from
[auth-audit-2026-04-23.md](./auth-audit-2026-04-23.md) +
[addendum](./auth-audit-2026-04-23-addendum.md).

This summary is the entry point for review. Details are in the
per-finding commits, the SQL test markdown files under
`supabase/tests/`, and the Vitest tests alongside the touched code.
The two follow-up docs are:
- [auth-hotfix-followup-dashboard.md](./auth-hotfix-followup-dashboard.md)
  — what the reviewer must do in Supabase / Cloudflare / Vercel /
  DNS dashboards after merge
- [auth-hotfix-observations.md](./auth-hotfix-observations.md) — out-
  of-scope items noticed during the work

---

## 1. Narrative

Two structural holes drove the CRITICAL bucket: any authenticated
user could promote themselves to admin via one line of devtools
JavaScript (AUTH-001), and any authenticated user could destroy the
entire article corpus via the public anon key (AUTH-002). The fix
moves role authority to server-only `app_metadata` / the
`admin_roles` table, removes the JWT fallback in `is_admin()`,
plants a defensive trigger that strips role keys from
`auth.users.raw_user_meta_data`, and replaces the permissive
`USING (true)` article RLS with admin-gated policies built on a
recursion-safe SECURITY DEFINER pattern.

The `/update-password` page (AUTH-009) was also CRITICAL after
the addendum's severity correction: it accepted an existing
`SIGNED_IN` event as proof of a recovery flow, letting any logged-in
user (or anyone with access to a logged-in session on a shared
device) change the password without supplying the current one. The
fix tightens to require either a `PASSWORD_RECOVERY` event OR a
"no prior session, session now present" pattern, and moves the
post-success signOut to global scope to kill concurrent sessions.

The remaining HIGH findings cover defense-in-depth: signup
extraMetadata locked to a named allowlist (AUTH-010), password-
change notification email (AUTH-028), Cloudflare Turnstile on
signup + password reset (AUTH-029), and an open-redirect validator
applied at every consumer of `redirectTo` (AUTH-030).

The admin role data migration (`scripts/migrate-admin-roles.ts`) is
generated but **not executed**. The reviewer runs it after merge
with a Supabase backup and service-role credentials. The dashboard
checklist covers SMTP/Turnstile/post-migration verification.

---

## 2. Per-finding table

| ID | Sev | Commit | Files touched | Test coverage |
|---|---|---|---|---|
| AUTH-001 (A.1) | CRITICAL | `761d034` | `src/services/userProfileService.ts` | `src/services/__tests__/userProfileService.test.ts` (2 tests) |
| AUTH-001 (A.2) | CRITICAL | `123da4b` | `src/context/AuthContext.tsx`, `src/pages/auth/LoginPage.tsx`, `src/services/userProfileService.ts` | `src/context/__tests__/AuthContext.test.tsx` (3 tests) |
| AUTH-001 (A.3) | CRITICAL | `182f491` | `supabase/migrations/20260423000001_harden_admin_role_checks.sql` | `supabase/tests/auth-001-role-hardening.test.md` (5 SQL scenarios) |
| AUTH-001 (A.4) | CRITICAL | `6108ecf` | `scripts/migrate-admin-roles.ts`, `scripts/seed-admin.mjs`, `vitest.config.ts` | `scripts/__tests__/migrate-admin-roles.test.ts` (9 tests) |
| AUTH-002 | CRITICAL | `0c0b03c` | `supabase/migrations/20260423000002_fix_articles_rls.sql` | `supabase/tests/auth-002-articles-rls.test.md` (6 SQL scenarios) |
| AUTH-009 | CRITICAL | `837a582` | `src/pages/auth/UpdatePasswordPage.tsx` | `src/pages/auth/__tests__/UpdatePasswordPage.test.tsx` (4 tests) |
| AUTH-010 | HIGH | `4b2b939` | `src/context/AuthContext.tsx`, `src/context/AuthContextDefinition.ts` | `src/context/__tests__/AuthContext.signup.test.tsx` (3 tests) |
| AUTH-028 | HIGH | `b400991` | `supabase/functions/password-change-notification/index.ts`, `src/services/userProfileService.ts`, `src/pages/auth/UpdatePasswordPage.tsx` | `src/services/__tests__/userProfileService.changePassword.test.ts` (3 tests) |
| AUTH-029 | HIGH | `5b8c37f` | `src/lib/auth/useTurnstile.tsx`, `src/context/AuthContext.tsx`, `src/pages/auth/SignUpPage.tsx`, `src/pages/auth/ResetPasswordPage.tsx`, `package.json`, `.env.example` | `src/lib/auth/__tests__/useTurnstile.test.tsx` (3 tests) |
| AUTH-030 | HIGH | `47f96f4` | `src/lib/auth/validateRedirect.ts`, `src/lib/urls.ts`, `src/pages/auth/LoginPage.tsx` | `src/lib/auth/__tests__/validateRedirect.test.ts` (16 tests) |

Total: 10 commits + this docs commit. 43 hotfix-added Vitest tests +
11 SQL test scenarios. All 43 Vitest tests pass.

---

## 3. Migrations introduced (apply in this order)

1. `supabase/migrations/20260423000001_harden_admin_role_checks.sql`
   - Replaces `is_admin()` and `is_admin_writer()` with recursion-
     safe SECURITY DEFINER variants (no JWT fallback)
   - Adds `auth.users` BEFORE UPDATE trigger that strips
     `raw_user_meta_data.role`
   - Adds `migrate_admin_role(uuid, text, text)` RPC consumed by
     the migration script
2. `supabase/migrations/20260423000002_fix_articles_rls.sql`
   - Drops `USING(true)` on five article tables
   - Recreates write/update/delete policies gated by
     `is_admin_writer()`; preserves public read of published
     articles + their citations

Both migrations have rollback SQL in trailing comments.

---

## 4. Manual reviewer verification

Run these against staging (or local via `supabase db reset` followed
by the seed scripts) before merging.

### Exploit-attempt smoke tests

**T-1 — AUTH-001 escalation no longer works:**
1. Sign in as a patient
2. In devtools console: `await supabase.auth.updateUser({ data: { role: 'admin' } })`
3. Reload the page
4. Confirm: still routed to the patient dashboard, not admin
5. SQL check: `SELECT raw_user_meta_data ? 'role' FROM auth.users WHERE id = '<that user>';` → false
6. SQL check: `SELECT public.is_admin();` (with that user's session) → false

**T-2 — AUTH-002 article destruction no longer works:**
1. Sign in as a patient
2. Pick any published article id
3. In devtools console:
   `await supabase.from('articles').delete().eq('id', '<that id>')`
4. Confirm: response.data is null OR `count: 0` (RLS silently filters)
5. Check the article still exists in the UI

**T-3 — AUTH-009 in-session password change blocked:**
1. Sign in normally
2. Navigate directly to `/update-password`
3. Confirm: form does NOT render; the "go to Account Settings"
   message renders instead

**T-4 — AUTH-009 legitimate recovery still works:**
1. Sign out
2. Trigger password reset from `/reset-password`
3. Click the link in the recovery email
4. Confirm: form renders; complete the change; confirm the success
   screen + auto-redirect to login

**T-5 — AUTH-030 open-redirect blocked:**
1. Sign out
2. Visit `/login?redirectTo=https://example.com/harvest`
3. Sign in
4. Confirm: lands on `/dashboard`, NOT example.com
5. Repeat with `?redirectTo=//example.com` (protocol-relative) — same result
6. Repeat with `?redirectTo=/dashboard/../admin/secret` — same result

### Functional regression tests

- Sign in as admin → confirm admin panel still loads (via
  `admin_roles` row, which `is_admin()` now reads exclusively)
- Submit signup with the Turnstile widget unfilled → submit button
  disabled
- Submit signup with the widget completed → succeeds
- Reset password flow end-to-end → email received (when SMTP is
  configured), recovery link works

---

## 5. Per-change rollback plan

| Commit | How to revert |
|---|---|
| `761d034` (AUTH-001 A.1) | `git revert 761d034` |
| `123da4b` (AUTH-001 A.2) | `git revert 123da4b`. App-level callers must continue reading `app_metadata.role` if A.3's trigger has already stripped `user_metadata` in production. |
| `182f491` (AUTH-001 A.3) | `git revert 182f491` AND apply rollback SQL in the trailing comment of the migration file. WARNING: rolling back loses the trigger-based defense and re-introduces the JWT fallback — don't do this without coordinated app rollback. |
| `6108ecf` (AUTH-001 A.4) | Pure tooling commit; revert is safe. Re-running the migration script after revert is a no-op since admin_roles is the source of truth. |
| `0c0b03c` (AUTH-002) | `git revert 0c0b03c` AND apply rollback SQL in the migration's trailing comment. |
| `837a582` (AUTH-009) | `git revert 837a582`. Restores the (insecure) lenient mode; only do this if a critical recovery-flow regression is uncovered AND the AccountSettings password-change path remains as the in-session change route. |
| `4b2b939` (AUTH-010) | `git revert 4b2b939`. Restores blind-spread behavior. |
| `b400991` (AUTH-028) | `git revert b400991`. Edge function can stay deployed (unused). |
| `5b8c37f` (AUTH-029) | `git revert 5b8c37f` AND `pnpm install` to drop the Turnstile dep. Disable Captcha Protection in Supabase Auth settings BEFORE reverting (otherwise signup/reset rejects all requests because no token is forwarded). |
| `47f96f4` (AUTH-030) | `git revert 47f96f4`. Be aware: hardcoded RoleGuard / AuthCallback redirects continue to work (they pass paths that would pass validation anyway). |

For SQL migrations, include a forward-only "revert" migration in
production rather than dropping the existing file — the migration
log must be append-only.

---

## 6. Test status

```
$ pnpm test
Test Files  15 failed | 127 passed | 1 skipped (145)
     Tests  83 failed | 1446 passed | 4 skipped (1542)
```

**The 83 failures are pre-existing and in areas this hotfix did not
touch:** `src/services/__tests__/activityService.test.ts`,
`src/services/__tests__/newsletterService.test.ts`,
`src/tests/a11y/Navigator*`, `src/tests/navigator/expansion-phase4.test.ts`,
`src/components/dashboard/__tests__/NavigatorAwarenessCard.test.tsx`,
`src/components/dashboard/__tests__/QuickMoodCheckIn.test.tsx`,
several others in dashboard/navigator areas. None reference
`AuthContext`, `userProfileService`, `UpdatePasswordPage`, or any
new file added by the hotfix.

Hotfix-added tests, run in isolation, all pass:

```
$ npx vitest run \
    src/services/__tests__/userProfileService.test.ts \
    src/services/__tests__/userProfileService.changePassword.test.ts \
    src/context/__tests__/AuthContext.test.tsx \
    src/context/__tests__/AuthContext.signup.test.tsx \
    src/pages/auth/__tests__/UpdatePasswordPage.test.tsx \
    src/lib/auth/__tests__/useTurnstile.test.tsx \
    src/lib/auth/__tests__/validateRedirect.test.ts \
    scripts/__tests__/migrate-admin-roles.test.ts

Test Files  8 passed (8)
     Tests  43 passed (43)
```

Pre-existing failures should be picked up by the data-layer or UX
follow-up prompts; they're flagged in
`auth-hotfix-observations.md`.

---

## 7. Reminder

`scripts/migrate-admin-roles.ts` is **not** executed as part of this
branch. Reviewer runs it post-merge against production after taking a
backup. See `auth-hotfix-followup-dashboard.md` §2.

---

## 8. Patch-up commits (B-1 through B-6)

Post-review, six blocking concerns were raised and closed as additive
commits on this branch. No existing commit was amended or reverted.

| Item | Commit | Files touched | Test coverage |
|---|---|---|---|
| B-1 | `28b71d2` | `supabase/migrations/20260423000003_auth_001_diagnostic_rpc.sql`, `scripts/migrate-admin-roles.ts` | `supabase/tests/hotfix-b1-diagnostic-rpc.test.md` (5 SQL scenarios), `scripts/__tests__/migrate-admin-roles.test.ts` (+11 Vitest tests = 19 total) |
| B-2 | docs-only in `G` | (no code change — REVOKEs already in 20260423000001) | `supabase/tests/hotfix-b2-migrate-admin-role-lockdown.test.md` (4 SQL scenarios + `information_schema` audit) |
| B-3 | `f451023` | `supabase/migrations/20260423000004_sync_admin_roles_to_app_metadata.sql` | `supabase/tests/hotfix-b3-admin-sync.test.md` (6 SQL scenarios) |
| B-4 | `9b17aed` | `docs/audits/auth-hotfix-b4-verification.md`, `supabase/tests/hotfix-b4-strip-trigger-safety.test.md` | 7 SQL paths + inspection-based evidence + staging UI smoke checklist |
| B-5 | `e995165` | `supabase/functions/password-change-notification/index.ts`, callsites in `src/services/userProfileService.ts` + `src/pages/auth/UpdatePasswordPage.tsx` | `src/services/__tests__/userProfileService.changePassword.test.ts` (+1 test = 4 total), `src/pages/auth/__tests__/UpdatePasswordPage.test.tsx` (+1 test = 5 total), `supabase/functions/password-change-notification/__tests__/index.test.ts` (Deno), `supabase/tests/hotfix-b5-edge-function.test.md` (6 integration scenarios) |
| B-6 | `c38879a` | `docs/audits/auth-hotfix-b6-verification.md` | baseline-vs-hotfix diff (empty — 83 failures match) |

### What the reviewer must run that is new

The migration-apply order (updated §1 of
`auth-hotfix-followup-dashboard.md`):

```
20260423000001_harden_admin_role_checks.sql   (existing)
20260423000002_fix_articles_rls.sql           (existing)
20260423000003_auth_001_diagnostic_rpc.sql    (B-1)
20260423000004_sync_admin_roles_to_app_metadata.sql  (B-3)
```

The timestamp gap (no `000005` / `000006`) is intentional: B-2
needed no migration (REVOKEs already present), and B-4 inspection
concluded the strip trigger is safe as-is. If the staging UI sweep
in B-4 surfaces a failure, the fallback replacement migration would
land at `000005` as a separate follow-up.

### New reviewer-facing items

- **Post-migration admin-session refresh (§2.5 of dashboard):**
  after 20260423000004 runs, existing admins must log out/in (or
  call `refreshSession()`) within ~1h to pick up
  `app_metadata.role`. New logins are unaffected.
- **B-1 + B-2 information_schema audit queries** (§1 of dashboard)
  are now mandatory post-apply verifications.
- **B-5 spoof + unauthenticated tests** (§4 of dashboard) — two new
  curl-based smoke tests against the edge function.

### Test count delta

| Suite | Before patch-up | After patch-up |
|---|---|---|
| `scripts/__tests__/migrate-admin-roles.test.ts` | 9 | 19 (+10) |
| `src/services/__tests__/userProfileService.changePassword.test.ts` | 3 | 4 (+1) |
| `src/pages/auth/__tests__/UpdatePasswordPage.test.tsx` | 4 | 5 (+1) |
| **Hotfix-added Vitest total** | 43 | 55 (+12) |
| Full `pnpm test` failure count | 83 (baseline = 83, no regressions) | 83 (baseline = 83, no regressions) |

Full B-6 verification in
[`auth-hotfix-b6-verification.md`](./auth-hotfix-b6-verification.md).
