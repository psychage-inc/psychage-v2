# Auth Data-Layer Refactor — Reviewer Summary

**Branch:** `refactor/auth-data-layer`
**Base:** `main` at `99d8262`
**Date:** 2026-04-25
**Type:** Quality and correctness refactor — NOT a security incident.

## What changed and why

The security hotfix merged at `99d8262` intentionally deferred a set of data-layer findings: AUTH-005 (re-auth side effects), AUTH-006 (`profiles.role` canonical states), AUTH-011 (cache leak on logout), AUTH-012 (login race), AUTH-015 (no session regeneration), AUTH-022 (logout navigation). It also left one carryover: the inline `AuthModal` was missing Turnstile bot protection that the hotfix added to `/signup` and `/reset-password`.

This branch ships fixes for all seven items as five reviewable commits plus the audit findings commit and the deliverables commit. The largest change is an architectural refactor of `AuthContext` so that the `onAuthStateChange` listener is the sole runtime updater of auth state — eliminating the dual `setState` pattern that caused the AUTH-012 race and giving us a clean place to hang the AUTH-011 cache invalidation. A new edge function (`verify-current-password`) replaces a side-effecting client-side call inside the password-change flow. A small idempotent migration tightens the `public.profiles.role` CHECK constraint. The AuthModal change is a near-mechanical replication of the SignUpPage Turnstile pattern.

## Per-finding table

| ID | Severity | Audit ref | Commit | Files | Tests |
|----|----------|-----------|--------|-------|-------|
| AUTH-011 | HIGH | [auth-audit-2026-04-23.md](../audits/auth-audit-2026-04-23.md) | `5b366af` | `src/context/AuthContext.tsx` | 2 new (direct + cross-tab defensive) |
| AUTH-012 | HIGH | [auth-audit-2026-04-23.md](../audits/auth-audit-2026-04-23.md) | `5b366af` | `src/context/AuthContext.tsx` | 2 new (state-update count + error path) |
| AUTH-022 | MED  | [auth-audit-2026-04-23.md](../audits/auth-audit-2026-04-23.md) | `5b366af` | `src/context/AuthContext.tsx`, `AuthContextDefinition.ts`, 8 caller files | 3 new (default redirect, custom redirect, signOut throws) |
| AUTH-005 | HIGH | [auth-audit-2026-04-23.md](../audits/auth-audit-2026-04-23.md) | `c425268` | `src/services/userProfileService.ts`, `supabase/functions/verify-current-password/index.ts` | 4 new (no signInWithPassword, invoke shape, fail-without-update, error propagation) |
| AUTH-015 | HIGH | [auth-audit-2026-04-23.md](../audits/auth-audit-2026-04-23.md) | `c425268` | `src/services/userProfileService.ts` | 3 new (scope:'others', not on update fail, signOut failure non-fatal) |
| AUTH-006 | HIGH | [auth-audit-2026-04-23.md](../audits/auth-audit-2026-04-23.md) | `37b7c22` | `supabase/migrations/20260425000001_*.sql`, `src/services/userProfileService.ts` (comment) | 6 SQL scenarios in `supabase/tests/data-layer-auth-006-profiles-role.test.md` |
| AuthModal Turnstile | HIGH | [auth-hotfix-observations.md](../audits/auth-hotfix-observations.md) | `bb34b4f` | `src/components/auth/AuthModal.tsx` | 7 new (visibility per view, disable/enable behavior, signup args, reset-on-error) |

## Architectural decisions

### D-01 — AuthContext lifecycle (AUTH-011 + AUTH-012 + AUTH-022)

Three findings, one structural problem: `AuthContext` had two sources of truth for auth state. `login`, `logout`, and `deleteAccount` each called `setState` AFTER `signInWithPassword` / `signOut` / etc., and the `onAuthStateChange` listener also called `setState` for the matching events. The two paths fired in unspecified order, sometimes producing a flicker.

After the refactor:

1. The `onAuthStateChange` listener is the **sole runtime updater** of auth state. The initial `getSession()` call still calls `setState` once during boot — that's intentional and separate. Runtime methods (`login`, `signup`, `logout`, `deleteAccount`, `refreshUser`) return success/failure without touching state directly.
2. `logout` accepts `redirect?: string` (default `/login`). It calls `queryClient.clear()` synchronously before `signOut` and then `navigate(redirect, { replace: true })`. The listener also clears the cache on `SIGNED_OUT` events — belt-and-braces for cross-tab signouts that Supabase broadcasts.
3. `deleteAccount` follows the same lifecycle contract for consistency. Decided in advance with the user — adjacent code path, same anti-pattern.

Caller cleanup (8 files): three sites that previously called `navigate('/')` after `await logout()` now call `await logout('/')`. Five sites that bound the function directly via `onClick={logout}` now wrap as `onClick={() => logout()}` to stop the SyntheticEvent from being passed as the redirect parameter.

### D-02 — Password change flow (AUTH-005 + AUTH-015)

The Supabase JS v2.90 SDK has no client-side `verify-current-password` primitive. The previous implementation called `signInWithPassword` from the client, which had three unwanted side effects: counted toward the per-IP/email rate limit, fired `SIGNED_IN` (which post-D-01 re-triggers the listener), and rotated tokens.

Fix: a new edge function `verify-current-password` performs the verification on a fresh isolated server-side client and returns `{ verified: boolean }`. The function takes only `{ password }` in the body; the caller's identity comes from the verified JWT, never from the body. Per-user 10-second rate limit, same shape as `password-change-notification`.

After a successful `updateUser({ password })`, `changePassword` now calls `signOut({ scope: 'others' })`. This invalidates other-device sessions while preserving the current session — the user just verified their old password and shouldn't be forced through a fresh login. The recovery flow (`UpdatePasswordPage`) already correctly uses `scope: 'global'` (different threat model: user has not authenticated post-recovery).

### D-03 — `profiles.role` canonical states (AUTH-006)

Post-B-3/B-7, admin status lives in `public.admin_roles`. The B-3 sync trigger writes admin role into `auth.users.raw_app_meta_data.role`. Application code reads admin status from `app_metadata`, falling back to `profiles.role` for non-admin users (`patient`, `provider`).

The original CHECK constraint on `profiles.role` (from `20250109000000_create_profiles.sql`) still permitted `'admin'`. This left room for stranded data — rows with `profiles.role='admin'` whose authority was never migrated to `admin_roles`.

Migration `20260425000001_data_layer_profiles_role_cleanup.sql`:

1. Reconciles users who carry `profiles.role='admin'` AND have an `admin_roles` entry: `profiles.role` becomes `'patient'`. Their admin status is preserved via `admin_roles`.
2. **Aborts with `RAISE EXCEPTION`** if any rows have `profiles.role='admin'` but NO `admin_roles` entry. This is the stranded-admin case — the operator must reconcile manually (promote into `admin_roles` or demote `profiles.role` to `patient`/`provider`) before the migration can apply. **Fail-safe by design — no silent data loss.**
3. Drops and re-adds the CHECK constraint with the narrowed allow-list `('patient', 'provider')`.

Compatibility verified: the B-7 sync trigger `sync_user_role_to_app_metadata` already prefers `admin_roles` over `profiles.role` and falls back to `'patient'` if both are absent. Narrowing `profiles.role` does not change effective role calculation for any user.

**TypeScript note (deviation from initial plan):** the plan called for narrowing `UserProfile.role` from `'patient' | 'provider' | 'admin'` to `'patient' | 'provider'`. On closer inspection that's wrong — `UserProfile.role` represents the EFFECTIVE role from `app_metadata.role`, which legitimately CAN be `'admin'`. Narrowing would lose admin recognition for admin users. Instead, added a doc comment on the field explaining the source-priority chain. The DB CHECK constraint is the data-integrity enforcement; `updateProfile()` already excludes `role` from writes via `Partial<Omit<UserProfile, ..., 'role'>>`. Logged in observations as a planning-time correction.

## Migration introduced

`supabase/migrations/20260425000001_data_layer_profiles_role_cleanup.sql` — only DB write on this branch. Idempotent. Fail-safe (aborts on stranded admins).

Apply procedure:

```bash
# Apply locally
supabase db reset
# OR for incremental: supabase migration up

# In production, apply via the standard migration channel.
# If stranded admins are present, the migration aborts with:
#   ERROR: AUTH-006: <N> stranded admin row(s) ... Affected ids: <uuid>, ...
# Operator reconciles each (promote into admin_roles OR set profiles.role
# to 'patient'/'provider') and re-runs.
```

Verification post-apply:

```sql
SELECT pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'public.profiles'::regclass
  AND conname = 'profiles_role_check';
-- Expected: CHECK (role IN ('patient', 'provider'))

SELECT count(*) FROM public.profiles WHERE role = 'admin';
-- Expected: 0
```

## Manual reviewer verification

1. **AUTH-011** (cache leak): Log in as User A locally, navigate to a page that fetches user-scoped data (mood journal, dashboard). Log out via any sidebar button, then log in as User B. The first render must NOT contain User A's data. Network tab should show fresh queries on User B's first render, not cached values.
2. **AUTH-012** (login race): Open React DevTools → Profiler. Log in. The auth state should update exactly once during the login flow.
3. **AUTH-022** (logout): Click "Log Out" on the top nav, the user sidebar, the admin sidebar, the provider sidebar, the portal sidebar, and the mobile menu. All should redirect immediately without flicker. Top-nav and mobile-menu redirect to `/`; the rest redirect to `/login`.
4. **AUTH-005** (re-auth no side effects): Open Privacy Settings → Change Password. The current-password verification should hit the `verify-current-password` edge function (visible in network tab). It must NOT call Supabase's `signInWithPassword` from the browser. No `SIGNED_IN` event should fire.
5. **AUTH-015** (session regeneration): Log into the same account from two browser profiles. From profile 1, change password via Privacy Settings. Profile 2's next privileged action should fail with an auth error (its session was invalidated).
6. **AUTH-006** (profiles.role CHECK): As service role: `INSERT INTO public.profiles (id, role) VALUES (gen_random_uuid(), 'admin');` — must reject with CHECK violation.
7. **AuthModal Turnstile**: Open the inline auth modal, switch to signup. The Turnstile widget renders. The submit button is disabled until the challenge completes. Once completed, signup succeeds.

## Per-commit rollback plan

| Commit | Effect | Rollback shape |
|--------|--------|----------------|
| `131442c` audit findings | Documentation only | `git revert 131442c` — no code/data impact |
| `5b366af` AuthContext lifecycle | Code change to AuthContext + 8 callers + tests | `git revert 5b366af` — restores dual-setState pattern; AUTH-011/012/022 re-emerge but no regressions |
| `c425268` password change | Service code + edge function + tests | `git revert c425268` — restores client-side signInWithPassword path. Edge function deployment can be left in place (no traffic). |
| `37b7c22` profiles.role | Migration + comment | `git revert 37b7c22` for code side. For DB: see rollback block at the bottom of the migration file. |
| `bb34b4f` AuthModal Turnstile | AuthModal + new test file | `git revert bb34b4f` — modal becomes unprotected again |
| `<final>` deliverables | Documentation only | `git revert <sha>` — no code/data impact |

The migration's rollback block restores the permissive CHECK but does NOT restore reconciled `profiles.role='admin'` values (those users still have `admin_roles` entries — Step 1 was a deliberate reconciliation, not data loss).

## Deferred to prompt 3 of 3

All UX / i18n findings (AUTH-003, AUTH-004, AUTH-007, AUTH-013, AUTH-014, AUTH-016 through AUTH-021) and MEDIUM-or-below security items (AUTH-031, AUTH-032, AUTH-033, AUTH-034) are out of scope here. The next branch will pick those up. Out-of-scope items noticed during this refactor are logged in [auth-data-layer-observations.md](auth-data-layer-observations.md).

## Pre-deploy checklist

Before merging this branch:

- [ ] Apply migration `20260425000001_data_layer_profiles_role_cleanup.sql`. If it aborts with `RAISE EXCEPTION`, reconcile stranded admins and re-run.
- [ ] Deploy the new edge function: `supabase functions deploy verify-current-password`.
- [ ] Verify `verify-current-password` is invokable: `curl -X POST $SUPABASE_URL/functions/v1/verify-current-password -H "Authorization: Bearer <user_jwt>" -d '{"password":"…"}' -H "Content-Type: application/json"`.
- [ ] Smoke-test the seven manual scenarios above.

See [auth-data-layer-followup-dashboard.md](auth-data-layer-followup-dashboard.md) for the full operator checklist.
