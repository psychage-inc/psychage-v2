# Auth UX + i18n Polish — Out-of-Scope Observations

Things noticed during the branch but deliberately left alone. Each is real but doesn't fit the scope of this prompt. Capture for future ticketing.

## 1. AuthModal vs auth-page duplication

`src/components/auth/AuthModal.tsx` and `src/pages/auth/{LoginPage,SignUpPage,ResetPasswordPage}.tsx` implement parallel login/signup/reset flows with mostly-overlapping logic. After this branch, both surfaces use the i18n keys + error mapper, but the duplication itself remains.

A consolidation effort would either:
- Make AuthModal a thin wrapper that mounts the corresponding page component in modal chrome, or
- Extract the shared form logic into hooks (`useLoginForm`, `useSignupForm`)

Either way, scope is product-affecting (modal vs page nav UX). Defer.

## 2. AuthModal lacks Turnstile token on `requestPasswordReset`

`AuthModal.tsx:103` calls `requestPasswordReset(email)` without `captchaToken`; `ResetPasswordPage.tsx` passes one. Adding it requires Turnstile widget integration in the modal — small but separate work.

## 3. Password strength meter is duplicated

`UpdatePasswordPage.tsx` (lines ~358-373) and `SignUpPage.tsx` (lines ~315-342) both render an inline strength meter with the same logic. Should be a shared component. Out of scope for UX polish.

## 4. OAuth provider-specific error keys are minimal

Apple's "user_cancelled_authorize" and Google's "popup_closed_by_user" pathways don't have dedicated i18n keys — they fall through to `auth.errors.unknown` → "Something went wrong". Acceptable for ship; deeper provider-specific handling is a follow-up.

## 5. Other `!isAuthenticated` UI consumers not retrofitted

The grep in commit 5's commit message lists:
- `MindMate.tsx:402` — `{isOpen && !isAuthenticated && ...}` shows a sign-in prompt; could flash before hydration completes
- `SleepArchitect/overview/SleepOverview.tsx:264` — `{!isAuthenticated && onSignIn && ...}`
- `SleepArchitect/dashboard/SleepDashboard.tsx:105`
- `ProviderClaimForm.tsx:113`

The `RoleGuard` and `ProtectedRoute` defer fixes don't reach these. Each consumer would need its own `if (isLoading) return null;` gate. Each is its own product surface; defer.

## 6. AdminApp doesn't mount `DeletionScheduledBanner`

`AdminApp.tsx` doesn't include the deletion banner. Admin self-deletion isn't a primary flow (admin accounts are typically managed via super-admin, not self-service). If admins start using the self-deletion path, mount the banner inside `AdminLayoutV2`.

## 7. `password-change-notification 2/` directory in supabase/functions

Likely a typo or merge-artifact dupe. Not touched. Worth a 30-second cleanup PR.

## 8. Single-namespace i18n is awkward for "namespaces"

`src/lib/i18n.ts` uses one `translation` namespace for everything. Calls become `t('auth.login.title')` (a deep key under `translation`). i18next supports proper multi-namespace setups (`{ defaultNS: 'auth' }` per page) which would clean up the call sites. Refactor is mechanical but spans every i18n call site in the app — out of scope.

## 9. `notifiedEmailsRef` idempotency in lockout is best-effort

`LoginPage.tsx`'s `notifiedEmailsRef` gates the suspicious-activity edge function call to once-per-email per session. The ref persists across renders within a single mount, but a refresh / route remount would re-fire. This is acceptable because the edge function itself rate-limits per-email at 1/hour — the client guard is a courtesy to avoid pointless requests, not a security boundary.

## 10. Sentry `extra: details` could leak data

`logAuthEvent`'s `details` parameter is passed to Sentry as `extra`. Callers must not put email or password into `details`. Currently the only callers in `AuthContext.tsx` only pass `{ code: error.code }` or `{ thrown: true }` — safe. Future callers should be reminded; the function header has a comment but a runtime guard would be more durable. Defer.

## 11. Edge function in-memory rate limit doesn't survive restart

`suspicious-activity-notification`'s rate-limit map is in-memory. A function-instance restart resets all counters. Acceptable for the threat model (the per-email 1/hour check is the floor, not the security ceiling). If sustained abuse becomes visible, move to Postgres-backed counters. Same constraint applies to `password-change-notification` (precedent).

## 12. `useAccountDeletionStatus` doesn't auto-refresh

5-minute stale time means a user who cancels deletion in tab A may still see the banner in tab B for up to 5 minutes. Acceptable; tab B will eventually rehydrate. A real-time subscription via Supabase realtime is overkill for this signal.

## 13. The `_meta._translation_status` key may emit i18next dev warnings

i18next sometimes warns about non-leaf keys. The `_meta` block is a dict, not a leaf string. If warnings are noisy, consider moving the marker to a sibling JSON file or a comment in the locale file. Not blocking.
