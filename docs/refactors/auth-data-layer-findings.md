# Auth Data-Layer Refactor — Findings

**Branch:** `refactor/auth-data-layer`
**Base:** `main` at `99d8262ccf31d84750658ff9713c139fa61aaf79`
**Date:** 2026-04-25
**Scope:** AUTH-005, AUTH-006, AUTH-011, AUTH-012, AUTH-015, AUTH-022 + AuthModal Turnstile carryover.

This document is the audit ground truth that subsequent commits on this branch reference. It supersedes the per-finding entries in `auth-audit-2026-04-23.md` only insofar as those findings have been re-verified against the post-hotfix state of the codebase. The original audit remains the canonical first-pass record.

---

## 1. Status of Each Finding Post-Hotfix

### AUTH-011 — Cache invalidation on logout (HIGH)

- **Original:** [auth-audit-2026-04-23.md AUTH-011](../audits/auth-audit-2026-04-23.md) — logout clears Supabase session but not TanStack Query cache. Next user can briefly see the previous user's clinical data on a shared device.
- **Current state in code:** **Still applies.** [src/context/AuthContext.tsx:193-205](../../src/context/AuthContext.tsx) — `logout` calls `supabase.auth.signOut()` and clears auth state, but never references `queryClient`. No import of `useQueryClient` anywhere in the file. The hotfix summary makes no mention of AUTH-011.
- **Planned fix shape:** Inject `useQueryClient()` in `AuthProvider`. Call `queryClient.clear()` inside `logout()` *before* `signOut()` so any in-flight queries don't race a half-logged-out state. Add a defensive `SIGNED_OUT` clear in `onAuthStateChange` to cover cross-tab signout. (See **D-01**.)

### AUTH-012 — Login race / dual setState (HIGH)

- **Original:** Both `login()` and the `onAuthStateChange` listener call `setState`, leading to a possible flicker and an unclear single source of truth.
- **Current state:** **Still applies.** [AuthContext.tsx:118-126](../../src/context/AuthContext.tsx) — `login` does `setState({ user, isLoading:false, isAuthenticated:true })` after `signInWithPassword` resolves. [AuthContext.tsx:87-99](../../src/context/AuthContext.tsx) — listener runs the same `setState` for every event. Both paths fire on any successful login.
- **Planned fix shape:** `login`, `signup` return success/failure but never call `setState`. The listener (renamed conceptually to "single source of truth") owns all state mutation. (See **D-01**.)

### AUTH-022 — Logout navigation inconsistency (MEDIUM)

- **Original:** `logout()` does not navigate. Callers must remember to redirect, and they don't all do so consistently.
- **Current state:** **Shape changed; partially mitigated.** [AuthContextDefinition.ts:23](../../src/context/AuthContextDefinition.ts) — signature still `logout: () => Promise<void>`, no redirect parameter. ProtectedRoute auto-redirects when `isAuthenticated=false`, which catches non-navigating callers, but at the cost of a flicker. Caller inventory:
  - Manually navigate after logout: [Navigation.tsx:99](../../src/components/layout/Navigation.tsx), [MobileMenu.tsx:47](../../src/components/layout/MobileMenu.tsx), [ProviderSidebar.tsx:15](../../src/pages/provider/ProviderSidebar.tsx)
  - Rely on ProtectedRoute fallback: [PortalNavSidebar.tsx:105](../../src/components/portal/PortalNavSidebar.tsx), [AdminTopBar.tsx:115](../../src/components/admin/AdminTopBar.tsx), [AdminSidebar.tsx:43](../../src/pages/admin/AdminSidebar.tsx), [UserSidebar.tsx:83](../../src/pages/dashboard/UserSidebar.tsx), [PrivacySettings.tsx:201](../../src/pages/dashboard/PrivacySettings.tsx)
- **Planned fix shape:** Accept `redirect?: string` parameter (default `/login`); `logout` navigates explicitly. Drop the redundant `navigate()` calls at the three manual sites. The five sites that relied on ProtectedRoute now get clean, immediate navigation. (See **D-01**.)

### AUTH-005 — Re-auth side effects in changePassword (HIGH)

- **Original:** [userProfileService.ts:166](../../src/services/userProfileService.ts) calls `supabase.auth.signInWithPassword` to verify the current password before changing it. Side effects: counts toward Supabase rate limit, fires a `SIGNED_IN` event on the client (which post-AUTH-012-fix would re-trigger the listener), and rotates tokens unnecessarily.
- **Current state:** **Still applies.** Verified at [userProfileService.ts:166-174](../../src/services/userProfileService.ts).
- **SDK note:** The installed `@supabase/supabase-js` v2.90.0 has no `reauthenticate(email, password)` primitive. The SDK's `reauthenticate()` method exists but sends an OTP via email — wrong UX shape for "verify the password the user just typed." There is no isolated client-side verify-current-password method.
- **Planned fix shape:** Server-side edge function `verify-current-password` that does the verification with a fresh, isolated Supabase client (no event broadcast, no client-side rate-limit). `changePassword` invokes the function and treats its `{ verified: boolean }` return as gospel. (See **D-02**.)

### AUTH-015 — No session regeneration after password change (HIGH)

- **Original:** After a successful password change, `changePassword` does nothing to invalidate other-device sessions. If the user is changing their password specifically because their phone was stolen, the thief's session is preserved.
- **Current state:** **Still applies.** [userProfileService.ts:182-200](../../src/services/userProfileService.ts) updates the password and dispatches a notification but never calls `signOut`. Note: [UpdatePasswordPage.tsx:181](../../src/pages/auth/UpdatePasswordPage.tsx) (the recovery flow, a separate code path) already correctly uses `signOut({ scope: 'global' })` and is not affected.
- **Planned fix shape:** After a successful `updateUser({ password })` in `changePassword`, call `await supabase.auth.signOut({ scope: 'others' })`. This invalidates other-device sessions while preserving the current session — appropriate for in-session password change. (See **D-02**.)

### AUTH-006 — `profiles.role` canonical states (HIGH)

- **Original:** Post-B-3/B-7, admin status lives only in `admin_roles`. `profiles.role` should be limited to `'patient'` and `'provider'`. The DB constraint and TypeScript types still allow `'admin'`.
- **Current state:** **Still applies.** [supabase/migrations/20250109000000_create_profiles.sql:15](../../supabase/migrations/20250109000000_create_profiles.sql) — `CHECK (role IN ('patient', 'provider', 'admin'))`. No subsequent migration tightens this. [userProfileService.ts:16](../../src/services/userProfileService.ts) — `UserProfile.role: 'patient' | 'provider' | 'admin'`. The B-3 sync trigger ([20260423000004_sync_admin_roles_to_app_metadata.sql](../../supabase/migrations/20260423000004_sync_admin_roles_to_app_metadata.sql)) writes admin status only to `app_metadata.role`, never to `profiles.role`, so any `profiles.role='admin'` value is stale data.
- **Planned fix shape:** New migration that (1) reconciles users with `profiles.role='admin'` who *are* in `admin_roles` (set their `profiles.role` to `'patient'`), (2) aborts with a NOTICE if any stranded admins exist (i.e. `profiles.role='admin'` but no `admin_roles` entry — operator must reconcile manually), (3) drops and replaces the CHECK constraint to permit only `'patient' | 'provider'`. Tighten `UserProfile.role` TypeScript type. Leave `mapSupabaseUser` admin recognition alone — admin recognition reads from `app_metadata.role`, not `profiles.role`. (See **D-03**.)

### AuthModal Turnstile carryover (HIGH)

- **Original:** [auth-hotfix-observations.md](../audits/auth-hotfix-observations.md) — AUTH-029 added Turnstile to `/signup` and `/reset-password` but missed the inline `AuthModal`, leaving one bot-accessible signup surface.
- **Current state:** **Still applies.** [AuthModal.tsx:62-71](../../src/components/auth/AuthModal.tsx) calls `signup(email, password, displayName, 'patient', metadata)` with five arguments — no `captchaToken`. `signup` signature already accepts an optional sixth arg ([AuthContextDefinition.ts:22](../../src/context/AuthContextDefinition.ts) — added during AUTH-029), so no interface change is required.
- **Planned fix shape:** Wire `useTurnstile()` into AuthModal, render the widget, disable submit until `token` is non-null, pass `captchaToken` to `signup(...)`, reset captcha on signup error. Mirrors the [SignUpPage.tsx](../../src/pages/auth/SignUpPage.tsx) pattern exactly.

---

## 2. Architectural Decisions

### D-01 — AuthContext lifecycle: single source of truth + cache + navigation

The current AuthContext has three intertwined defects: dual setState (AUTH-012), no cache invalidation on logout (AUTH-011), and inconsistent post-logout navigation (AUTH-022). Fixing them together as one architectural change is cleaner than three independent patches because all three affect the same set of methods (`login`, `logout`, `deleteAccount`) and the same `onAuthStateChange` listener.

**Invariants after the refactor:**

1. **`onAuthStateChange` listener is the SOLE updater of auth state.** `login`, `signup`, `logout`, `deleteAccount`, `refreshUser`-after-update never call `setState` directly. They invoke Supabase, return success/failure, and rely on the listener to propagate state.
2. **`logout` always clears the TanStack Query cache.** Belt-and-braces: synchronous `queryClient.clear()` inside the function (covers same-tab logout) plus `SIGNED_OUT` listener cleanup (covers cross-tab logout via Supabase's broadcast).
3. **`logout` always navigates.** `logout(redirect?: string)` accepts an optional path, defaulting to `/login`. The function calls `navigate(redirect, { replace: true })` after `signOut`. Listener-based redirect is rejected because a `SIGNED_OUT` event can fire from a different tab and shouldn't navigate the current tab unexpectedly.

**Why include `deleteAccount`:** [AuthContext.tsx:281-296](../../src/context/AuthContext.tsx) has the same setState-after-supabase anti-pattern as `logout`. Refactoring `login`/`logout` but leaving `deleteAccount` would put two competing models in the same file. User confirmed inclusion.

**QueryClient injection:** `useQueryClient()` resolves cleanly because both [src/index.tsx:38-44](../../src/index.tsx) and `src/admin-index.tsx` mount `QueryClientProvider` outside `AuthProvider`. No re-nesting required.

**Navigation:** `useNavigate()` from `react-router-dom` resolves because `AuthProvider` is mounted inside `BrowserRouter`.

### D-02 — Password change: server-side verification + selective session regeneration

The reauth side effect (AUTH-005) and the missing session rotation (AUTH-015) are two halves of the same flow. Fixing them in one commit lets the reviewer evaluate the password-change story end-to-end.

**Verification path:** A new edge function `verify-current-password` accepts `{ password }`, identifies the calling user via the bearer token, instantiates a fresh Supabase client (no session persistence), calls `signInWithPassword({ email, password })` server-side, and returns `{ verified: boolean }`. Side effects (rate-limit hits, SIGNED_IN events) stay on the server. The client never sees them.

**Why edge function over in-context flag suppression:** A flag-based approach (a ref that says "ignore the next SIGNED_IN") would create a stateful side-channel inside the AuthContext listener, fragile under reorderings or unrelated SIGNED_IN events. The edge function adds one deploy step but yields a clean separation.

**Session regeneration:** `signOut({ scope: 'others' })` after a successful in-session password change. Preserves the current session (the user just authenticated by typing their old password); kicks out everything else. The recovery flow ([UpdatePasswordPage.tsx:181](../../src/pages/auth/UpdatePasswordPage.tsx)) already uses `scope: 'global'` correctly because the user has not yet authenticated post-recovery — different threat model, different scope.

### D-03 — `profiles.role` canonical states

Post-B-3/B-7, the system has two role storage locations: `admin_roles` (admin status, source of truth) and `profiles.role` (non-admin user type). The B-3 sync trigger writes admin role to `app_metadata.role`. Application code reads admin status from `app_metadata` first.

The bug: nothing prevents `profiles.role='admin'` from existing and being interpreted by code paths that fall back to `profiles.role` when `app_metadata.role` is missing. The CHECK constraint allows it, the TypeScript type allows it.

**Fix:** Tighten the DB CHECK (`'patient' | 'provider'` only); narrow the TypeScript `UserProfile.role` type. The migration is fail-safe: stranded admins (`profiles.role='admin'` with no `admin_roles` entry) abort the migration with a `RAISE EXCEPTION`, forcing manual operator decision before the constraint can apply. No silent data loss.

**What stays:** [AuthContext.tsx:35-38](../../src/context/AuthContext.tsx) `mapSupabaseUser` keeps `'admin'` in the User.role union — admin recognition flows from `app_metadata.role`, not `profiles.role`. Narrowing here would break admin login.

---

## 3. Per-Finding Fix Plan Cross-Reference

| Finding | Architectural Decision | Files Touched (this branch) |
|---------|------------------------|------------------------------|
| AUTH-011 | D-01 | `src/context/AuthContext.tsx`, `src/context/__tests__/AuthContext.lifecycle.test.tsx` (new) |
| AUTH-012 | D-01 | `src/context/AuthContext.tsx`, existing AuthContext tests (mock harness) |
| AUTH-022 | D-01 | `src/context/AuthContext.tsx`, `src/context/AuthContextDefinition.ts`, 8 caller files |
| AUTH-005 | D-02 | `src/services/userProfileService.ts`, `supabase/functions/verify-current-password/index.ts` (new), `src/services/__tests__/userProfileService.changePassword.test.ts` |
| AUTH-015 | D-02 | `src/services/userProfileService.ts`, same test file as AUTH-005 |
| AUTH-006 | D-03 | `supabase/migrations/<timestamp>_data_layer_profiles_role_cleanup.sql` (new), `src/services/userProfileService.ts`, `src/context/AuthContext.tsx` (comment), `supabase/tests/data-layer-auth-006-profiles-role.test.md` (new) |
| AuthModal Turnstile | (no D — straightforward) | `src/components/auth/AuthModal.tsx`, `src/components/auth/__tests__/AuthModal.test.tsx` (new) |

---

## 4. Out-of-Scope Observations

Recorded here, not fixed on this branch. Will be triaged into `auth-data-layer-observations.md` at the end of the refactor for the reviewer.

- **`useAdminAuth` dev bypass.** [src/hooks/useAdminAuth.ts:39-50](../../src/hooks/useAdminAuth.ts) reads `session.user.user_metadata?.role === 'admin'` in dev mode. After AUTH-001/B-3, `user_metadata.role` is no longer trustworthy — the canonical admin source is `admin_roles` / `app_metadata.role`. The dev bypass is a convenience that drifted out of sync with the security model. Belongs in a follow-up.
- **`useTurnstile` hook lacks invisible mode.** Configures `size: 'flexible'` only ([src/lib/auth/useTurnstile.tsx:53](../../src/lib/auth/useTurnstile.tsx)). Acceptable for current modal width; a future change might want the invisible/managed variant for tighter UX. Not in scope.
- **`getSession()` initial load also calls `setState`.** [AuthContext.tsx:70-82](../../src/context/AuthContext.tsx) — the initial session fetch path mirrors the listener but is separate. Post-D-01 it remains a setState site (boot path), but it's intentionally distinct from the runtime listener and not part of the AUTH-012 race. Logged for awareness only.
- **`refreshUser` calls `setState` directly.** [AuthContext.tsx:207-223](../../src/context/AuthContext.tsx) — used by callers that explicitly want to re-pull from `supabase.auth.getUser()`. Could be made listener-only by calling `getUser()` and letting the listener pick it up via Supabase's internal mechanisms — but this is fragile and not an audit finding. Leave alone.
- **No tests on `AuthModal`.** The component had no test file before this refactor. Phase E adds one, but coverage of the rest of AuthModal's behavior (login flow, view switching, consent modal) remains thin. Not in scope; logged.
