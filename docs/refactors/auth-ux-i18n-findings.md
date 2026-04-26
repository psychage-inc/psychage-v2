# Auth UX + i18n Polish — Findings

**Branch:** `polish/auth-ux-i18n`
**Base:** `main` at `7eb833b` (Merge data-layer refactor)
**Date:** 2026-04-25
**Scope:** AUTH-003, AUTH-004, AUTH-007, AUTH-013, AUTH-014, AUTH-016, AUTH-017, AUTH-018, AUTH-019, AUTH-020, AUTH-021, AUTH-024, AUTH-031, AUTH-032, AUTH-033, AUTH-034 (16 findings)

This branch closes the remaining UX/a11y/i18n + four MEDIUM security cleanups left after the security hotfix and data-layer refactor merged. Goal: make every user-facing string localizable, every error recoverable, and every boundary observable — without re-litigating settled architecture.

---

## Status of Each Finding Post-Prompts-1-and-2

| ID | Severity | Status | File:Line Evidence | Planned Fix Shape |
|----|----------|--------|--------------------|-------------------|
| AUTH-003 | MEDIUM | **Partial** | `AuthCallback.tsx:24,96` sets `state: { error }` on redirect; `LoginPage.tsx:46-53` reads `state.message` only. `state.error` never consumed. | Read `location.state.error` + `searchParams.get('error')` in LoginPage; pipe through error mapper; render via shared alert pattern. |
| AUTH-004 | MEDIUM | **Still applies** | All five auth pages 100% hardcoded EN strings (e.g., `LoginPage.tsx:235,237,290,344,355`). `useTranslation()` not imported anywhere under `src/pages/auth/`. | Add `auth` top-level key to all 5 locales. EN authored from current strings; PT/ES/SV/FR stubbed verbatim. Wire `useTranslation()` in every auth page. |
| AUTH-007 | MEDIUM | **Still applies** | `LoginPage.tsx:292-301` (email), `309-318` (password) — no `autoComplete`/`inputMode`. Same in `SignUpPage.tsx`, `ResetPasswordPage.tsx:138-148`, `UpdatePasswordPage.tsx:345-355,378-388`. AuthModal has `autoComplete` but no `inputMode`/`autoCapitalize`/`spellCheck`. | Add `autoComplete=email/current-password/new-password`, `inputMode=email`, `autoCapitalize=off`, `spellCheck=false` per input role. |
| AUTH-013 | MEDIUM | **Still applies** | `AuthContext.tsx:135-322` — zero Sentry calls anywhere. `lib/sentry.ts:1-60` initializes with PHI-stripping but no auth method touches it. | New `lib/auth/authTelemetry.ts` exporting `logAuthEvent(operation, outcome, details)`. `user_error` → breadcrumb only; `platform_error` → `Sentry.captureMessage` with tags. Wire into 6 auth methods. |
| AUTH-014 | MEDIUM | **Still applies** | `LoginPage.tsx:282-286`, `ResetPasswordPage.tsx:128-132`, AuthCallback error UI — error alerts are read-only. No retry button. | New `RetryAction` component with optional countdown. Used in LoginPage (try again + reset link), ResetPasswordPage (resend in Ns), AuthCallback (try provider again + use email). |
| AUTH-016 | MEDIUM | **Still applies** | `AuthModal.tsx:195-216` renders error/success banners regardless of any loading state — though AuthModal isn't auth-context-loading-aware (it's modal-internal `isLoading` only). The wider issue is consumer components that render `!isAuthenticated` UI before auth hydration completes. | Sweep `useAuth()` consumers; gate `!isAuthenticated` UI on `!isLoading` first. |
| AUTH-017 | MEDIUM | **Partial** | Only `UpdatePasswordPage.tsx:215-216` has `role="alert"`. LoginPage `:282-287`, SignUpPage `:191-196`, ResetPasswordPage `:128-133`, AuthModal `:195-204` lack `role="alert"` and never move focus on error appearance. | New `useAuthErrorFocus(error)` hook returning a ref. Apply to all 5 auth pages + AuthModal with `role="alert"` + `tabIndex={-1}`. Success messages get `aria-live="polite"`. |
| AUTH-018 | MEDIUM | **Partial** | `AuthCallback.tsx:24,96` — two `setTimeout(navigate, 3000)` calls NOT cancelled on unmount (the `isCancelled` guard at `:101` only prevents `setError` calls, not the pending navigation). `UpdatePasswordPage.tsx:182-185` success-redirect setTimeout not cancelled. `UpdatePasswordPage.tsx:138-142` already cancels its `pollTimer`. | Wrap each timer in `useEffect` with `clearTimeout` cleanup, OR move into a guarded ref. |
| AUTH-019 | MEDIUM | **Partial** | `LoginPage.tsx:183-197` does inline string-matching for 6 error categories (good intent, fragile). `SignUpPage.tsx:103`, `ResetPasswordPage.tsx:39`, `UpdatePasswordPage.tsx:165` pass `error.message` straight through. | New `lib/auth/supabaseErrorMessages.ts` with `mapSupabaseAuthError(error)` returning i18n keys. Prefer `error.code` (Supabase v2.90+); fall back to substring matching. **No** "not found" branch (regression-tested). |
| AUTH-020 | MEDIUM | **Still applies** | `ProtectedRoute.tsx:14-15` renders `<GlobalLoading />` immediately whenever `isLoading === true`. Causes flicker on every protected-route navigation since hydration usually completes <50ms. | Defer spinner by 200ms via `setTimeout` + `showLoading` state. Render `null` in the first 200ms. |
| AUTH-021 | MEDIUM | **Still applies** | `profiles.deletion_scheduled_at` exposed only in `PrivacySettings.tsx`. Grep `App.tsx` → zero refs. Banner not visible after navigation. | New `useAccountDeletionStatus` hook + `DeletionScheduledBanner` component. Mount at app root. Banner shows days remaining + cancel CTA → `privacyService.cancelDeletion()` (already exists `:147`). |
| AUTH-024 | LOW | **Still applies** | `LoginPage.tsx:51` uses `window.history.replaceState({}, '')` — legacy API; clears URL but not React Router's `location.state`. | Replace with `navigate(location.pathname + location.search, { replace: true, state: null })`. |
| AUTH-031 | MEDIUM | **Still applies** | `LoginPage.tsx:187-188` heuristic: matches `not found`/`no user`/`does not exist` → "No account found with this email. Would you like to sign up?". Email-enumeration leak even if the upstream Supabase response doesn't currently fire it. | Removed by Commit 4's mapper integration (no enumeration branch). Verified in Commit 7 with regression test. |
| AUTH-032 | MEDIUM | **Still applies + harder than expected** | `supabase/migrations/20250109000002_create_tools_and_newsletter.sql:77-86` — `newsletter_subscribers` schema has `email VARCHAR(255) NOT NULL UNIQUE` but **no `user_id` column at all**. Apple Private Relay address rotation breaks re-subscribe. `waitlistService.ts` shares the same anti-pattern (handles 23505 silently as success). | Migration: ADD `user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL`, drop UNIQUE on email, add partial unique indexes (one per `user_id IS NULL`, one per `user_id IS NOT NULL`). `newsletterService.ts` keys lookup on `user_id` if authenticated, else email. |
| AUTH-033 | MEDIUM | **Partial** | `ProviderDetailAdmin.tsx:88-95` already calls `logAdminAction`. Other admin mutation sites unaudited (need sweep across `src/pages/admin/`). | App-layer: sweep + add `logAdminAction` to any missing sites. DB-layer: trigger on `providers.status` UPDATE → `admin_audit_log` row with `source: 'db_trigger'` (defense-in-depth; only fires if app layer skipped). |
| AUTH-034 | MEDIUM | **Still applies** | `LoginPage.tsx:189-190` matches "too many"/"rate limit" only when Supabase returns it; no client-side counter. No suspicious-activity edge function. | Client: failed-attempt counter in LoginPage state. 3 fails → soft warning + prominent reset link. 5 fails → 30s countdown + disabled submit (uses `RetryAction`). Server: new `suspicious-activity-notification` edge function — unauthenticated caller (legit user is failing to auth), per-email rate limit 1/hour, verifies email in `auth.users` before sending (anti-amplification). |

---

## Planned Commit Groups

- **Commit 1 (this doc):** `[POLISH] Audit findings for UX + i18n closeout`
- **Commit 2:** `[POLISH] i18n foundation: auth namespace + Supabase error mapping (AUTH-004, AUTH-019)`
- **Commit 3:** `[POLISH] Form polish: autoComplete, focus management, location state cleanup (AUTH-007, AUTH-017, AUTH-024)`
- **Commit 4:** `[POLISH] Error display, retry affordance, Sentry telemetry (AUTH-003, AUTH-013, AUTH-014, AUTH-019 integration)`
- **Commit 5:** `[POLISH] Loading state discipline: defer flicker, isLoading gates, cancellable timeouts (AUTH-016, AUTH-018, AUTH-020)`
- **Commit 6:** `[POLISH] Account deletion grace banner across app (AUTH-021)`
- **Commit 7:** `[POLISH] MEDIUM security cleanups: error mapping, Apple relay, admin audit, lockout signal (AUTH-031, AUTH-032, AUTH-033, AUTH-034)`
- **Commit 8:** `[POLISH] Reviewer deliverables: summary, dashboard, observations, translation handoff`

---

## Tone Decisions

User-facing copy on a mental-health platform passes a stricter filter than generic SaaS. The Sacred Rules: person-first language, no diagnostic phrasing, warm but not saccharine, honest about what happened, never blames the user.

### Failed-login error
- **Chosen:** "Email or password doesn't match. Try again, or reset your password."
- **Rejected:** "Invalid credentials" — cold, doesn't help recovery
- **Rejected:** "We couldn't sign you in" — too vague, user wants to know what to try
- **Rejected:** "Wrong password" — doesn't disclose which field, but reads as accusatory
- *Why:* Tells the user the pair is wrong (without enumeration), offers a path forward, no blame.

### Email-not-confirmed error
- **Chosen:** "Your email isn't confirmed yet. Check your inbox, or request a new confirmation link."
- **Rejected:** "Account not activated" — implies the user is broken
- **Rejected:** "You haven't verified your email" — second-person blame
- *Why:* Possessive ("your") + state-of-being ("isn't yet") + actionable next step. No accusation.

### Rate-limit error
- **Chosen:** "Too many attempts. Wait a few minutes and try again."
- **Rejected:** "You have been rate-limited" — punitive, jargon
- **Rejected:** "Account locked due to suspicious activity" — alarming, implies wrongdoing
- *Why:* Factual + time-bounded + clear unblock condition.

### Forgot-password link copy
- **Chosen:** "Reset your password" (links from "Forgot password?" prompt)
- **Rejected:** "Lost access? Recover account" — catastrophizes
- **Rejected:** "Forgot? Click here" — too casual

### Account-deletion grace banner
- **Chosen title:** "Account deletion scheduled"
- **Chosen body:** "Your account is scheduled for permanent deletion in {days} days ({date}). You can cancel anytime before then."
- **Chosen CTA:** "Cancel deletion"
- **Rejected title:** "Warning: account deletion pending" — alarming
- **Rejected body:** "We're sorry to see you go" — saccharine, presumptuous
- **Rejected CTA:** "Stop the countdown" — over-dramatic
- *Why:* User asked to be deleted; the banner is information + affordance, not persuasion. Factual countdown, easy cancel.

### Suspicious-activity email
- **Chosen subject:** "Sign-in attempts on your Psychage account"
- **Chosen body intro:** "We noticed multiple sign-in attempts on your account at {time}. If this was you, no action needed. If not, [reset your password] and consider checking your email security."
- **Rejected:** "Alert: unauthorized access attempt" — implies confirmed breach
- **Rejected:** "Someone tried to break into your account" — alarmist
- *Why:* The alerts will fire for both legitimate forgetfulness and real attacks. The copy must not over-claim (we don't know which it is) and must not under-warn.

### Lockout warning (after 3 failures)
- **Chosen:** "Trouble signing in? Reset your password."
- **Rejected:** "Multiple failures detected" — surveillance tone
- *Why:* Promotes recovery without naming the failure count to the user (the user knows; surfacing it adds nothing).

### Lockout countdown (after 5 failures)
- **Chosen:** "Too many attempts. Try again in {seconds}s."
- *Why:* Same shape as Supabase rate-limit copy — keeps the vocabulary consistent.

---

## Out-of-Scope Observations

Surfaced during the audit. Real but outside this prompt's scope. Logged here, NOT fixed.

1. **AuthModal vs auth pages drift** — AuthModal (`src/components/auth/AuthModal.tsx`) is a parallel implementation of the login/signup/reset flows used elsewhere in the app. It doesn't share components with the auth pages. After this branch, both will use the i18n keys + error mapper, but the duplication itself is technical debt. Consolidating would touch product surface and is a separate decision.
2. **`requestPasswordReset` in AuthModal lacks captcha token argument** — `AuthModal.tsx:103` calls `requestPasswordReset(email)` without a captchaToken; `ResetPasswordPage.tsx:34` passes one. AuthModal probably should too, but adding it requires Turnstile widget integration in the modal — a small but separate piece of work.
3. **Password strength is duplicated** — UpdatePasswordPage (`:357-373`) and SignUpPage (`:314-342`) both render an inline strength meter with the same logic. Should be a shared component. Out of scope.
4. **OAuth error pathway is naive** — even after Commit 4 reads `state.error`, the OAuth flow itself just hands back whatever Supabase says. Apple "user_cancelled_authorize" in particular doesn't have a real i18n key in this prompt's keyset; it'll fall through to "unknown" → "Something went wrong". Fine for ship; deeper provider-specific handling later.
5. **`waitlistService.ts` Apple Private Relay** — same vulnerability as newsletter (`UNIQUE(email)`). Migration in Commit 7 will audit and apply the same fix if the constraint exists. If the table schema differs significantly, fixing it expands scope; will be deferred to a follow-up if so.
6. **`password-change-notification 2`** directory exists in `supabase/functions/` — likely a typo or merge artifact from a copy-paste. Not touching, but flagging.
7. **The 5 locale files use a single `translation` namespace** with dot-notation paths. Prompt's spec says "add an `auth` namespace" — semantically this becomes a top-level `auth` key under the existing `translation` namespace (i.e., calls become `t('auth.login.title')`). Not a deviation in user-facing behavior, just a naming clarification.
8. **Sentry init is gated to production** (`lib/sentry.ts:13`: `if (!DSN || IS_DEV) return;`) — telemetry calls in dev will be no-ops because `Sentry.captureMessage` etc. silently no-op when not initialized. Tests will mock the module, not the init.
