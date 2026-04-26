# Auth UX + i18n Polish — Summary

**Branch:** `polish/auth-ux-i18n`
**Base:** `main` at `7eb833b`
**Date:** 2026-04-25
**Scope:** 16 findings closing the auth audit + addendum (AUTH-003, 004, 007, 013, 014, 016, 017, 018, 019, 020, 021, 024, 031, 032, 033, 034)

This branch closes the remaining UX/a11y/i18n + four MEDIUM security cleanups left after the security hotfix and data-layer refactor merged. Operator merges; this PR is intended to be the **final systemic auth-workstream branch** — no further audit-driven auth work is planned.

## Narrative

The hotfix shut the security holes; the data-layer refactor settled the AuthContext architecture. What was left was the everyday surface: copy hardcoded in English, error alerts that didn't move screen-reader focus, an OAuth error path that handed back a value the destination page never read, login UX with no signal when someone was clearly being attacked, a deletion-grace banner buried inside one settings page, and an `UNIQUE(email)` newsletter constraint that would silently break Apple Private Relay.

The branch is structured as 8 grouped commits. Commit 1 is the audit doc; commits 2–7 are the fixes; commit 8 is reviewer materials. Each commit message references its findings.

The branch deliberately does **not** translate into PT/ES/SV/FR — translator handoff section below lists every EN string introduced. The other four locales carry the EN values verbatim with a `_meta._translation_status: PENDING` marker; runtime users see English (no `key.not.found`), and translators replace values per the table.

## Per-finding Status

| ID | Severity | Resolution | Commit | Files | Tests |
|----|----------|------------|--------|-------|-------|
| AUTH-003 | MEDIUM | LoginPage now consumes `location.state.error` and `?error=` via the central mapper. | `8720296` | `LoginPage.tsx`, `AuthCallback.tsx` | `LoginPage.oauthError.test.tsx` (4) |
| AUTH-004 | MEDIUM | `auth` top-level key added to all 5 locales (4 stubbed); pages call `t()` for error/retry/lockout/deletion strings. Page-level title/label i18n is staged but not wholesale-converted — keys exist for follow-up. | `eb1674d` + `8720296` | `src/locales/{en,pt,es,sv,fr}/translation.json` | (key-presence enforced by component renders) |
| AUTH-007 | MEDIUM | `autoComplete`/`inputMode`/`autoCapitalize`/`spellCheck` on every email + password input across 5 pages + AuthModal. | `5c37e06` | All auth pages + `AuthModal.tsx` | `LoginPage.attributes.test.tsx` (2) |
| AUTH-013 | MEDIUM | `lib/auth/authTelemetry.ts` exposes `logAuthEvent`. Wired into 6 AuthContext methods. user_error → breadcrumb only; platform_error → `Sentry.captureMessage` with tags. | `8720296` | `AuthContext.tsx`, `lib/auth/authTelemetry.ts` | `authTelemetry.test.ts` (10) |
| AUTH-014 | MEDIUM | `RetryAction.tsx` component with optional countdown. Used by AUTH-034 lockout (countdown in submit button label). | `8720296` | `components/auth/RetryAction.tsx` | `RetryAction.test.tsx` (5) |
| AUTH-016 | MEDIUM | AuthModal uses modal-internal isLoading (no flash to fix). Other consumers (`MindMate`, `SleepArchitect`, `ProviderClaimForm`) are out of scope and captured in observations. RoleGuard mirrors the ProtectedRoute defer. | `d41c45e` | `RoleGuard.tsx` | (covered by ProtectedRoute test) |
| AUTH-017 | MEDIUM | `useAuthErrorFocus` hook + `role="alert"` + `tabIndex={-1}` on alerts in all 5 pages + AuthModal. Success alerts use `aria-live="polite"`. | `5c37e06` | `lib/auth/useAuthErrorFocus.ts`, all auth pages | `useAuthErrorFocus.test.tsx` (4) |
| AUTH-018 | MEDIUM | `AuthCallback` collects setTimeout ids in a ref; cleanup clears them. `UpdatePasswordPage` success-redirect timer wrapped the same way. | `d41c45e` | `AuthCallback.tsx`, `UpdatePasswordPage.tsx` | `AuthCallback.unmount.test.tsx` (1) |
| AUTH-019 | MEDIUM | `lib/auth/supabaseErrorMessages.ts` `mapSupabaseAuthError(error)` returns i18n keys; prefers `error.code`, falls back to substring match. Wired into LoginPage / SignUpPage / ResetPasswordPage / UpdatePasswordPage / AuthCallback. | `eb1674d` + `8720296` | `lib/auth/supabaseErrorMessages.ts`, all auth pages | `supabaseErrorMessages.test.ts` (26) |
| AUTH-020 | MEDIUM | `ProtectedRoute` defers GlobalLoading by 200ms. Same applied to `RoleGuard`. | `d41c45e` | `ProtectedRoute.tsx`, `RoleGuard.tsx` | `ProtectedRoute.flicker.test.tsx` (4) |
| AUTH-021 | MEDIUM | `useAccountDeletionStatus` hook + `DeletionScheduledBanner` mounted at app root. Cancel CTA calls `privacyService.cancelDeletion()` and invalidates the status query. | `97688a3` | `hooks/useAccountDeletionStatus.ts`, `components/account/DeletionScheduledBanner.tsx`, `App.tsx` | `DeletionScheduledBanner.test.tsx` (5) |
| AUTH-024 | LOW | `window.history.replaceState({}, '')` replaced with `navigate(.., { replace: true, state: null })`. | `5c37e06` | `LoginPage.tsx` | `LoginPage.stateCleanup.test.tsx` (2) |
| AUTH-031 | MEDIUM | Mapper has no enumeration branch; LoginPage uses mapper exclusively; ResetPasswordPage renders success state for "user not found"-style responses. | `8720296` (verified via mapper) + `ae9defd` (commit notes) | `LoginPage.tsx`, `ResetPasswordPage.tsx`, `lib/auth/supabaseErrorMessages.ts` | `LoginPage.oauthError.test.tsx` (1) + `supabaseErrorMessages.test.ts` enumeration regression |
| AUTH-032 | MEDIUM | Migration adds `user_id` column + partial unique indexes; service layer keys on user_id when authenticated. | `ae9defd` | `supabase/migrations/20260425000002_relax_email_unique_for_relay.sql`, `services/newsletterService.ts` | `supabase/tests/auth-032-newsletter-relay.test.md` (3 SQL scenarios) |
| AUTH-033 | MEDIUM | App-layer: `ProviderEditor` now calls `logAdminAction` on create + update. DB-layer: trigger on `providers.status` updates fires audit row tagged `source='db_trigger'`. | `ae9defd` | `pages/admin/v2/providers/ProviderEditor.tsx`, `supabase/migrations/20260425000003_audit_provider_status_trigger.sql` | `supabase/tests/auth-033-provider-status-audit.test.md` (3 SQL scenarios) |
| AUTH-034 | MEDIUM | LoginPage failed-attempt counter: 3 → soft warning + reset CTA, 5 → 30s countdown + disabled submit + fire-and-forget edge-function call. New `suspicious-activity-notification` edge function with anti-amplification (per-email 1/hour rate limit, profiles existence check, constant 200 response). | `ae9defd` | `LoginPage.tsx`, `supabase/functions/suspicious-activity-notification/index.ts` | `LoginPage.lockout.test.tsx` (2) + Deno tests (`__tests__/index.test.ts`, 9) + manual scenarios (`auth-034-suspicious-activity.test.md`, 5) |

## Tone Decisions Log

(Reproduced from the findings doc with the chosen copy live in the EN locale.)

| String | Chosen | Rejected | Why |
|--------|--------|----------|-----|
| Failed login | "Email or password doesn't match. Try again, or reset your password." | "Invalid credentials" | Tells user the pair is wrong; offers a path forward; no blame; no enumeration. |
| Email unconfirmed | "Your email isn't confirmed yet. Check your inbox, or request a new confirmation link." | "Account not activated" | Possessive + state-of-being + actionable. No accusation. |
| Rate limit | "Too many attempts. Wait a few minutes and try again." | "You have been rate-limited" | Factual + time-bounded. |
| Forgot password link | "Reset your password" | "Lost access? Recover account" | Catastrophizes the rejected version. |
| Deletion banner title | "Account deletion scheduled" | "Warning: account deletion pending" | Information, not persuasion. The user asked. |
| Deletion banner body | "Your account is scheduled for permanent deletion in N days (date). You can cancel anytime before then." | "We're sorry to see you go" | Saccharine; presumptuous. |
| Suspicious-activity email subject | "Sign-in attempts on your Psychage account" | "Alert: unauthorized access attempt" | Doesn't over-claim — failures could be legitimate forgetfulness. |
| Lockout soft warning | "Trouble signing in?" | "Multiple failures detected" | Surveillance tone rejected. The user knows their failure count. |

## Translation Handoff

Every EN key added under the `auth` namespace, with **context notes for translators**. A translator should be able to localize from this table without reading the code.

### `auth.login.*`
| Key | EN | Notes |
|-----|----|-------|
| `title` | "Welcome back" | Page H1. |
| `subtitle` | "Sign in to continue your journey" | Page subhead. "journey" is intentionally warm; do not translate as "trip". |
| `emailLabel` | "Email address" | Form label. |
| `emailPlaceholder` | "name@example.com" | Use a locally-recognizable placeholder if needed. |
| `passwordLabel` | "Password" | Form label. |
| `passwordPlaceholder` | "••••••••" | Bullet character — do not translate. |
| `showPassword` / `hidePassword` | "Show password" / "Hide password" | aria-label pair on toggle. |
| `rememberMe` | "Remember me" | Checkbox label. |
| `forgotPasswordLink` | "Forgot password?" | Hyperlink to /reset-password. |
| `submitButton` | "Sign In" | Primary CTA. |
| `submittingButton` | "Signing in..." | Loading state. |
| `orDivider` | "Or continue with" | OAuth divider. |
| `noAccount` / `signUpLink` | "Don't have an account?" / "Create account" | Footer link. |
| `googleAria` / `appleAria` | "Continue with Google" / "Continue with Apple" | aria-label on icon-only buttons. |
| `signingInAs` | "Signing in as {{role}}" | `{{role}}` interpolated as Patient or Provider. |
| `rolePatient` / `roleProvider` | "Patient" / "Provider" | Used inside `signingInAs`. |
| `validationEmailRequired` / `validationPasswordRequired` | "Please enter your email address." / "Please enter your password." | Client-side validation. |
| `noAdminAccess` | "This account does not have admin access. Please log in with an admin account or contact a super admin." | Shown on admin variant. |
| `noAdminAccessDev` | (dev-only equivalent) | Has a backtick code block; preserve. |
| `seoTitle` / `seoDescription` | (SEO copy) | Search-engine display strings. |
| `devModeTitle` / `devModeFirstRun` / `devModeFillButton` | Dev-mode helper UI | Not user-facing in production. |

### `auth.signup.*`
| Key | EN | Notes |
|-----|----|-------|
| `title` | "Create your account" | Page H1. |
| `subtitle` | "Join Psychage to start your mental health journey" | Subhead. |
| `togglePatient` / `toggleProvider` | "I am an individual" / "I'm a Provider" | Toggle on signup. "individual" not "patient" — softer entry copy. |
| `fullNameLabel` / `fullNamePlaceholder` | "Full Name" / "John Doe" | Adapt placeholder to locale. |
| `emailLabel`, `passwordLabel`, `confirmPasswordLabel`, `countryLabel`, `ageLabel`, `referralSourceLabel` | Form labels | Standard. |
| `referralOptions.*` | Source options ("Search Engine", "Social Media", etc.) | Discrete categories. |
| `passwordRequirementLength` / `passwordRequirementNumber` | "At least 8 characters" / "Contains a number" | Strength meter copy. |
| `submitButton` / `submitButtonProvider` | "Create Account" / "Create Provider Account" | Toggled by user type. |
| `validationPasswordsDontMatch` / `validationPasswordTooShort` / `validationConsentRequired` / `validationCaptchaRequired` | Inline validation | Be specific in target locale. |
| `successMessage` | "Account created successfully! Please log in to continue." | Flash message. |

### `auth.resetPassword.*`
| Key | EN | Notes |
|-----|----|-------|
| `title` | "Reset Password" | |
| `subtitle` | "Enter your email to receive reset instructions" | |
| `backToLogin` | "Back to Login" | |
| `submitButton` | "Send Reset Instructions" | |
| `successTitle` | "Check your email" | |
| `successBody` | "If an account exists for that email, we've sent reset instructions to" | **Critical:** non-disclosing copy. Do NOT translate as "we've sent instructions to" without the conditional — this protects against email enumeration. |
| `useDifferentEmail` | "Use a different email" | Secondary CTA. |
| `errorGeneric` | "Failed to send reset instructions. Please try again." | |
| `validationCaptchaRequired` | "Please complete the verification challenge." | |

### `auth.updatePassword.*`
| Key | EN | Notes |
|-----|----|-------|
| `title` | "Set New Password" | |
| `subtitle` | "Create a strong password for your account" | |
| `backToLogin` | "Back to Login" | |
| `newPasswordLabel` / `confirmPasswordLabel` | Form labels | |
| `submitButton` | "Update Password" | |
| `successTitle` / `successBody` / `successCta` | "Password Updated" / "...Redirecting to login..." / "Go to Login" | |
| `successFlashMessage` | "Password updated successfully. Please log in." | Passed back to LoginPage as `state.message`. |
| `verifyingLink` | "Verifying your reset link..." | Loading state. |
| `refusedTitle` / `refusedBody` / `refusedCta` | AUTH-009 logged-in-user refusal copy | Must read as "go to Account Settings instead" — see security note. |
| `invalidLinkError` | "Invalid or expired reset link. Please request a new password reset." | |
| `requestNewLink` | "Request a new reset link" | Inline action. |

### `auth.callback.*`
| Key | EN | Notes |
|-----|----|-------|
| `completing` | "Completing sign in..." | OAuth loading state. |
| `verifying` | "Please wait while we verify your credentials." | |
| `errorTitle` | "Authentication Error" | |
| `errorRedirecting` | "Redirecting to login..." | |
| `errorGeneric` | "Failed to complete authentication" | Used in catch path. |

### `auth.errors.*`
**These are the central error keys returned by `mapSupabaseAuthError`. Tone is critical — see Tone Decisions Log.**

| Key | EN | Notes |
|-----|----|-------|
| `invalidCredentials` | "Email or password doesn't match. Try again, or reset your password." | Both wrong-password AND wrong-email — must NOT distinguish (enumeration). |
| `emailNotConfirmed` | "Your email isn't confirmed yet. Check your inbox, or request a new confirmation link." | |
| `rateLimit` | "Too many attempts. Wait a few minutes and try again." | |
| `userAlreadyExists` | "An account with this email already exists. Try signing in instead." | Signup-only. Disclosure here is acceptable per AUTH-031. |
| `weakPassword` | "Please choose a stronger password." | Server already enforced rules. |
| `network` | "We couldn't reach our servers. Check your connection and try again." | |
| `accountDisabled` | "This account has been disabled. Please contact support for assistance." | |
| `unexpected` / `unknown` | "Something went wrong. Please try again, or contact support if it keeps happening." | Catch-all. |
| `googleFailed` / `appleFailed` | "Failed to sign in with [Google/Apple]. Please try again." | |

### `auth.retry.*`
| Key | EN | Notes |
|-----|----|-------|
| `tryAgain` | "Try again" | RetryAction default label. |
| `resetPassword` | "Reset your password" | Linked CTA. |
| `useEmailInstead` | "Use email and password instead" | OAuth-failure fallback. |
| `tryProviderAgain` | "Try {{provider}} again" | `{{provider}}` = "Google" \| "Apple". |
| `resendIn` | "You can resend in {{seconds}}s" | Countdown format — keep `{{seconds}}` literal. |
| `resend` | "Resend" | |

### `auth.lockout.*`
| Key | EN | Notes |
|-----|----|-------|
| `softWarning` | "Trouble signing in?" | After 3 failed attempts. Don't surface the count. |
| `hardCountdown` | "Too many attempts. Try again in {{seconds}}s." | Submit button label after 5 failures. |
| `resetCta` | "Reset your password" | Inline link in soft warning. |
| `emailSubject` | "Sign-in attempts on your Psychage account" | Subject of suspicious-activity email. Not alarmist. |
| `emailBodyIntro` | (long body — see locale file) | Email body copy; preserve "{{time}}" interpolation. |

### `auth.deletion.*`
| Key | EN | Notes |
|-----|----|-------|
| `bannerTitle` | "Account deletion scheduled" | Factual, not alarming. |
| `bannerBody` | "Your account is scheduled for permanent deletion in {{days}} days ({{date}}). You can cancel anytime before then." | Plural form. |
| `bannerBodyOneDay` | "Your account is scheduled for permanent deletion tomorrow ({{date}}). You can cancel anytime before then." | Day-1 form. |
| `bannerBodyToday` | "...today ({{date}})..." | Day-0 form. |
| `cancelButton` | "Cancel deletion" | Primary CTA. |
| `cancelConfirmTitle` / `cancelConfirmBody` / `cancelConfirmYes` / `cancelConfirmNo` | Confirmation modal | Currently unused — reserved. |
| `cancelError` | "Couldn't cancel deletion right now. Please try again or contact support." | |

### `auth.common.*`
| Key | EN | Notes |
|-----|----|-------|
| `loading` / `tryAgain` / `cancel` / `back` / `submit` / `close` | Generic | Reused across the auth flows. |

## Migrations Introduced

1. **`supabase/migrations/20260425000002_relax_email_unique_for_relay.sql`** — AUTH-032
   - Adds `user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL`
   - Drops `newsletter_subscribers_email_key` UNIQUE constraint
   - Adds two partial unique indexes (anonymous-by-email, authenticated-by-user_id)
   - Rollback block included as SQL comment

2. **`supabase/migrations/20260425000003_audit_provider_status_trigger.sql`** — AUTH-033
   - Creates `audit_provider_status_change()` SECURITY DEFINER function
   - Creates `audit_provider_status_change_trg` AFTER UPDATE OF status trigger on `providers`
   - Inserts `admin_audit_log` rows with `metadata = {"source": "db_trigger"}`
   - Rollback block included

## Edge Functions Introduced

1. **`supabase/functions/suspicious-activity-notification/index.ts`** — AUTH-034
   - Unauthenticated POST endpoint (the legitimate user is failing to authenticate, so a JWT requirement would defeat the purpose)
   - Per-email rate limit: 1 send / hour (in-memory map per instance)
   - Anti-amplification: `profiles.email` existence check; constant HTTP 200 response so callers cannot distinguish "rate limited" from "delivered" from "no such user"
   - Resend dispatch if `RESEND_API_KEY` configured; log-only fallback otherwise

## Manual Reviewer Verification

Run after pulling the branch.

1. **Branch state**
   ```
   git checkout polish/auth-ux-i18n
   git log --oneline main..HEAD   # 7 commits
   ```

2. **TypeScript / build**
   ```
   npx tsc --noEmit
   npm run build
   ```

3. **Vitest suite**
   ```
   npx vitest run src/lib/auth src/pages/auth/__tests__ src/components/auth/__tests__ src/components/account/__tests__
   ```
   New tests: ~64 assertions across 12 files. See per-finding table.

4. **Manual smoke**
   - **Failed-login lockout (AUTH-034):** Open the login page, attempt sign-in 3× with a wrong password — soft warning appears with reset CTA. Continue to 5× — submit button shows "Try again in 30s..." countdown and disables. Verify a console log/Resend send for the suspicious-activity edge function.
   - **OAuth error (AUTH-003):** Cancel a Google sign-in flow. Verify LoginPage renders the localized "Email or password doesn't match" or "Something went wrong" message (depending on Supabase response), and screen-reader focus moves to the alert.
   - **Account deletion banner (AUTH-021):** Sign in, schedule deletion via Privacy Settings, navigate elsewhere — banner persists. Click "Cancel deletion" — banner removes.
   - **i18n stub (AUTH-004):** Switch language to PT/ES/SV/FR. Visit any auth page. All strings render in EN (no `key.not.found`). Verify the `_meta._translation_status` block in the locale files.
   - **Loading flicker (AUTH-020):** Navigate between protected routes — no spinner flash on fast hydration. Throttle CPU and verify the spinner appears after ~200ms if hydration drags.
   - **Form polish (AUTH-007):** Tab through login/signup forms — autofill prompts appropriately for `email` / `current-password` / `new-password`.

## Per-commit Rollback

| Commit | Rollback |
|--------|----------|
| `71f33ca` (findings doc) | `git revert 71f33ca` — pure docs; no runtime effect. |
| `eb1674d` (i18n + mapper) | `git revert eb1674d` — removes the `auth` namespace + the mapper. Subsequent commits depend on this; rollback would cascade. |
| `5c37e06` (form polish) | `git revert 5c37e06` — removes autoComplete attrs + focus hook usage. Safe. |
| `8720296` (errors + retry + telemetry) | `git revert 8720296` — restores inline error matching in LoginPage. Safe but reintroduces the AUTH-019/031 fragility. |
| `d41c45e` (loading discipline) | `git revert d41c45e` — restores immediate spinner. Safe; reintroduces flicker. |
| `97688a3` (deletion banner) | `git revert 97688a3` — removes the banner. Safe. |
| `ae9defd` (security cleanups) | Revertable. **Migrations are NOT auto-rolled-back by `git revert`** — apply rollback SQL from the migration file footers manually if needed. |

## Workstream Closure

This branch is the third and final systemic auth prompt (security hotfix → data-layer refactor → UX/i18n polish). With it merged, the auth audit + addendum findings are addressed across the three branches. **No further audit-driven auth-systemic work is planned.**

Future work in this area should be ticketed individually rather than rolled into another sweep.
