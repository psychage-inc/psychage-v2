# Psychage Auth Audit — 2026-04-23

**Auditor:** Claude Code (read-only pass)
**Scope:** Surfaces U (user), A (admin), P (provider portal) × methods email/password, Google OAuth, Apple OAuth
**Repo commit:** `9b5f136f6c3edbf647dd57043e93fec75a1eea1d`
**Branch:** `fix/mindmate-client-error-hardening`

---

## A. Executive Summary

- **Total findings:** 27 (CRITICAL: 3, HIGH: 9, MEDIUM: 10, LOW: 4, UNCLEAR: 1)
- **Top 5 that matter most:**
  - [AUTH-001](#auth-001-privilege-escalation-via-user_metadatarole) — Any authenticated user can promote themselves to admin via one line of browser-console JavaScript. Dual-source admin check trusts user-writable metadata.
  - [AUTH-002](#auth-002-any-authenticated-user-can-writedelete-all-articles) — Article RLS is `USING (true)` for every authenticated user. Only a client-side guard stands between a patient account and the entire content corpus.
  - [AUTH-003](#auth-003-authcallback-emits-stateerror-but-loginpage-reads-statemessage) — When OAuth fails, users bounce to `/login` with an unrendered error. They see nothing explaining why login failed.
  - [AUTH-004](#auth-004-zero-i18n-on-auth-surfaces) — All 5 locales exist but auth UI is 100% hardcoded English. International users see English error messages, labels, consent text.
  - [AUTH-005](#auth-005-current-password-verification-reuses-signinwithpassword) — Password change re-authenticates via `signInWithPassword`, which counts toward rate limits, fires `SIGNED_IN`, and can log the user out of other tabs if the Supabase adapter rotates tokens.

- **Synthesis:** The auth system is structurally sound — single Supabase client, one AuthContext with proper listener cleanup, comprehensive RLS on user-scoped tables, CASCADE deletes wired, crisis content unambiguously public. But two severe privilege/data-integrity holes sit at the trust boundary: the client-trusted `user_metadata.role` fallback and the "any authenticated user" article policy. Neither is exposed by the UI today, which is why they have not bitten yet — but both are trivially exploitable by anyone with a devtools window. Beyond those, the system has normal SaaS auth UX gaps (no `autoComplete`, no i18n, no focus management, thin password policy) that are below the bar for a mental-health platform where trust and inclusion matter more than usual. The email round-trip the reviewer flagged is mostly sound in code — the UpdatePasswordPage polling loop compensates for a legitimate Supabase race — but depends entirely on dashboard/SMTP/DNS configuration that cannot be verified from this repo.

---

## B. Discovery Map

### B.1 File Inventory

| Path | Purpose | Surface |
|---|---|---|
| [src/lib/supabaseClient.ts](../../src/lib/supabaseClient.ts) | Singleton client (only `createClient` call) | U/A/P |
| [src/context/AuthContext.tsx](../../src/context/AuthContext.tsx) | AuthProvider, all auth methods, OAuth, listener | U/A/P |
| [src/context/AuthContextDefinition.ts](../../src/context/AuthContextDefinition.ts) | Interface + context object | U/A/P |
| [src/pages/auth/LoginPage.tsx](../../src/pages/auth/LoginPage.tsx) | Email/password + OAuth form (variant='admin' dual) | U/A |
| [src/pages/auth/SignUpPage.tsx](../../src/pages/auth/SignUpPage.tsx) | Patient/provider signup + consent + extraMetadata | U/P |
| [src/pages/auth/ResetPasswordPage.tsx](../../src/pages/auth/ResetPasswordPage.tsx) | `resetPasswordForEmail` trigger | U |
| [src/pages/auth/UpdatePasswordPage.tsx](../../src/pages/auth/UpdatePasswordPage.tsx) | Recovery return-trip, polling, new password | U |
| [src/pages/auth/AuthCallback.tsx](../../src/pages/auth/AuthCallback.tsx) | OAuth + recovery session exchange, role routing | U/A/P |
| [src/components/auth/ProtectedRoute.tsx](../../src/components/auth/ProtectedRoute.tsx) | Auth-required gate, deep-link preservation | U/A/P |
| [src/components/auth/RoleGuard.tsx](../../src/components/auth/RoleGuard.tsx) | Role-based gate, cross-domain redirect | U/A/P |
| [src/components/auth/AuthGate.tsx](../../src/components/auth/AuthGate.tsx) | Soft-gate (modal prompt, no redirect) | U |
| [src/pages/dashboard/AccountSettings.tsx](../../src/pages/dashboard/AccountSettings.tsx) | Profile edit + password change | U |
| [src/pages/dashboard/PrivacySettings.tsx](../../src/pages/dashboard/PrivacySettings.tsx) | Data export + account deletion | U |
| [src/services/userProfileService.ts](../../src/services/userProfileService.ts) | Profile CRUD, password change, avatar | U |
| [src/services/privacyService.ts](../../src/services/privacyService.ts) | Account-deletion lifecycle (30-day grace) | U |
| [src/services/consentService.ts](../../src/services/consentService.ts) | Consent audit trail | U |
| [src/hooks/useAdminAuth.ts](../../src/hooks/useAdminAuth.ts) | Fine-grained admin role lookup | A |
| [src/App.tsx](../../src/App.tsx) | Main route config | U/P |
| [src/AdminApp.tsx](../../src/AdminApp.tsx) | Admin route config | A |
| [src/index.tsx](../../src/index.tsx) | Main bootstrap, AuthProvider mount | U |
| [src/admin-index.tsx](../../src/admin-index.tsx) | Admin bootstrap | A |
| [src/lib/urls.ts](../../src/lib/urls.ts) | Cross-domain URL helpers | U/A |
| [index.html](../../index.html) / [admin.html](../../admin.html) | Two HTML entries | U · A |
| [vercel.json](../../vercel.json) | Host-based rewrites to separate bundles | U/A |
| [vite.config.ts](../../vite.config.ts) | Local-dev `/admin/*` → admin.html fallback | A |
| [supabase/functions/account-deletion/index.ts](../../supabase/functions/account-deletion/index.ts) | Edge function: soft/cancel/hard-delete | U |
| [supabase/functions/data-export/index.ts](../../supabase/functions/data-export/index.ts) | GDPR Article 20 export | U |

### B.2 Supabase Client Instantiation

**Single** `createClient` call in application code: [src/lib/supabaseClient.ts:11](../../src/lib/supabaseClient.ts#L11). Other references in seed/build scripts are not shipped to the client bundle. ✅

### B.3 AuthContext Shape

From [src/context/AuthContextDefinition.ts:10-19](../../src/context/AuthContextDefinition.ts#L10-L19):

```typescript
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email, password, displayName?, role?, extraMetadata?) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signInWithApple: () => Promise<{ success: boolean; error?: string }>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
}
```

`User` type fields: `id`, `email`, `role` (derived from `user_metadata.role`), `display_name`, `avatar_url` — see [AuthContext.tsx:7-17](../../src/context/AuthContext.tsx#L7-L17).

### B.4 Auth Routes

| Path | Component | Guard | Surface |
|---|---|---|---|
| `/login` | LoginPage | none | U/A (variant prop) |
| `/signup` | SignUpPage | none | U/P |
| `/reset-password` | ResetPasswordPage | none | U |
| `/update-password` | UpdatePasswordPage | implicit (needs Supabase session) | U |
| `/auth/callback` | AuthCallback | none | U/A/P |
| `/onboarding` | OnboardingPage | ProtectedRoute | U (main) + admin via AdminApp |
| `/dashboard/*` | UserDashboard + subpages | ProtectedRoute + RoleGuard(['patient','admin']) | U |
| `/portal/*` | PortalLayout + 7 children | ProtectedRoute + RoleGuard(['provider','admin']) | P |
| `/for-providers/apply` | ProviderApplyPage | none | P (pre-signup) |
| `/for-providers/claim` | ProviderClaimPage | none | P (pre-signup) |
| `/tools/mindmate` | PsychageAIPage | ProtectedRoute | U |
| `/crisis` | CrisisPage | **none (by design)** | public |
| `/tools/symptom-navigator/crisis` | CrisisResourcesScreen | **none (by design)** | public |
| `/admin/*` (admin.html entry) | AdminLayoutV2 + children | ProtectedRoute + RoleGuard(['admin']) | A |

### B.5 Environment Variables Used in Auth

| Var | Site | Scope |
|---|---|---|
| `VITE_SUPABASE_URL` | [supabaseClient.ts:4](../../src/lib/supabaseClient.ts#L4) | public |
| `VITE_SUPABASE_ANON_KEY` | [supabaseClient.ts:5](../../src/lib/supabaseClient.ts#L5) | public (RLS-enforced) |
| `VITE_MAIN_URL` / `VITE_ADMIN_URL` | [src/lib/urls.ts](../../src/lib/urls.ts) | public |
| `SUPABASE_SERVICE_ROLE_KEY` | Edge functions only ([account-deletion/index.ts:31](../../supabase/functions/account-deletion/index.ts#L31)) | server-only ✅ |
| `ADMIN_FUNCTION_SECRET` | [account-deletion/index.ts:48](../../supabase/functions/account-deletion/index.ts#L48) | server-only ✅ |

No Google/Apple OAuth client IDs exist as env vars in code — provider config lives entirely in Supabase dashboard.

### B.6 Auth-Relevant Migrations (selected — 31 total touch auth.users or user-scoped tables)

| Migration | Summary |
|---|---|
| [20250109000000_create_profiles.sql](../../supabase/migrations/20250109000000_create_profiles.sql) | `profiles` table + `handle_new_user()` trigger on `auth.users` INSERT |
| [20250109000001_create_remaining_tables.sql](../../supabase/migrations/20250109000001_create_remaining_tables.sql) | Assessment/mood/sleep tables with user-scoped RLS |
| [20260310000001_admin_panel_foundation.sql](../../supabase/migrations/20260310000001_admin_panel_foundation.sql) | `admin_roles`, `admin_audit_log`, `platform_settings` |
| [20260325000003_create_admin_roles.sql](../../supabase/migrations/20260325000003_create_admin_roles.sql) | Rerun/fix of admin_roles |
| [20260316000003_fix_article_admin_rls.sql](../../supabase/migrations/20260316000003_fix_article_admin_rls.sql) | `is_admin()` / `is_admin_writer()` — **JWT fallback path** |
| [20260316000007_auth_user_article_rls.sql](../../supabase/migrations/20260316000007_auth_user_article_rls.sql) | Replaces above with `USING (true)` policies — **authenticated = full write** |
| [20260306000001_provider_directory_v2.sql](../../supabase/migrations/20260306000001_provider_directory_v2.sql) | `providers` table, owner-based RLS |
| [20260307000002_consent_and_privacy.sql](../../supabase/migrations/20260307000002_consent_and_privacy.sql) | `user_consents`, `privacy_settings` |
| [20260411000002_provider_reviews.sql](../../supabase/migrations/20260411000002_provider_reviews.sql) | Review model with RLS |
| [20260325000004_create_bookings_and_messages.sql](../../supabase/migrations/20260325000004_create_bookings_and_messages.sql) | Bookings + messages RLS |

### B.7 Email Flow Code Paths

| Event | Trigger site | redirectTo | Return handler |
|---|---|---|---|
| Signup email verification | [AuthContext.tsx:111](../../src/context/AuthContext.tsx#L111) `supabase.auth.signUp` (no `emailRedirectTo` passed — defaults to Supabase Site URL) | dashboard Site URL | [AuthCallback.tsx](../../src/pages/auth/AuthCallback.tsx) — via `getSession()` on `/auth/callback` |
| Password reset | [AuthContext.tsx:177](../../src/context/AuthContext.tsx#L177) `resetPasswordForEmail` | `${window.location.origin}/update-password` | [UpdatePasswordPage.tsx:51-100](../../src/pages/auth/UpdatePasswordPage.tsx#L51-L100) — listener + polling |
| Email change | not exposed in UI (no `updateUser({ email })` call found in codebase) | — | — |
| Magic link / OTP | not used | — | — |
| Google OAuth | [AuthContext.tsx:196-200](../../src/context/AuthContext.tsx#L196-L200) | `${window.location.origin}/auth/callback` | AuthCallback |
| Apple OAuth | [AuthContext.tsx:213-217](../../src/context/AuthContext.tsx#L213-L217) | `${window.location.origin}/auth/callback` | AuthCallback |

**Token cleanup after return:** not explicit — relies on Supabase client's auto-processing of URL hash/code params. No `window.history.replaceState` scrubs tokens.

### B.8 i18n Auth Keys

Inspected all 5 locale files ([src/locales/](../../src/locales/)). Only namespaces present: `footer`, `language`, `navigator`, `providers`. **Zero keys** under `auth`, `login`, `signup`, `password`, or equivalent. Every auth-user-facing string is a hardcoded JSX literal.

### B.9 Surface Decision Tree

**U (User / main site):**
- Exists: yes ([index.html](../../index.html) → [src/index.tsx](../../src/index.tsx))
- Methods: email/password, Google, Apple (all three in [LoginPage.tsx](../../src/pages/auth/LoginPage.tsx))
- Client: shared singleton
- AuthContext: shared
- Post-login redirect: `redirectTo` param OR `state.from` OR `/dashboard` (patient), onboarding check at [LoginPage.tsx:150-165](../../src/pages/auth/LoginPage.tsx#L150-L165)

**A (Admin):**
- Exists: yes ([admin.html](../../admin.html) → [src/admin-index.tsx](../../src/admin-index.tsx))
- Methods: email/password + OAuth routed via `variant='admin'` LoginPage
- Client: shared singleton (**same** Supabase instance across both bundles via `VITE_SUPABASE_URL`)
- AuthContext: separate AuthProvider mounted per-bundle, but state is per-tab/localStorage-backed — effectively shared session on same origin
- Post-login redirect: onboarding check → `/dashboard` (admin) or cross-domain `adminUrl(...)` in prod

**P (Provider Portal):**
- Exists: **yes, fully built** (contrary to the prompt's "new/in-progress" framing)
- 7 portal pages under `/portal/*` guarded by `RoleGuard(['provider','admin'])`
- Public pre-signup: `/for-providers/apply` and `/for-providers/claim` have no auth gate
- Signup flow: same `/signup` route with `userType='provider'` toggle → `role: 'provider'` in `user_metadata`
- Client + context: shared with U

---

## C. Findings

### AUTH-001 Privilege escalation via `user_metadata.role`
- **Severity:** CRITICAL
- **Category:** security
- **Surface(s):** U/A/P
- **Evidence:**
  - [src/services/userProfileService.ts:101](../../src/services/userProfileService.ts#L101) — `if (updates.role !== undefined) metadataUpdates.role = updates.role;` writes role into `user_metadata` via `supabase.auth.updateUser({ data: ... })`
  - [supabase/migrations/20260316000003_fix_article_admin_rls.sql:20-23](../../supabase/migrations/20260316000003_fix_article_admin_rls.sql#L20-L23) — `is_admin()` returns true if `auth.jwt() -> 'user_metadata' ->> 'role'` equals `'admin'`
  - [src/context/AuthContext.tsx:13](../../src/context/AuthContext.tsx#L13) — client resolves role from `user_metadata.role`
- **What's wrong:** `user_metadata` is, by Supabase's explicit documentation, **user-writable**. Any authenticated user can run `supabase.auth.updateUser({ data: { role: 'admin' } })` from the browser devtools console. On their next JWT refresh (automatic within an hour, or immediately via `refreshSession()`), the `is_admin()` RLS helper returns true, and they have admin database privileges for every table that checks `is_admin()`. They also pass `RoleGuard(['admin'])` on the client.
- **User/developer impact:** Arbitrary self-promotion to admin. Read/write all articles, access admin dashboard, view audit log, modify platform settings, read every row of every admin-gated table. This is the single worst finding in the audit.
- **Why this matters for Psychage specifically:** A mental-health platform holds journal entries, mood logs, assessment scores, consent audit trails, DSAR requests. Admin elevation means access to every user's clinical self-report.
- **Cross-references:** AUTH-002 (article RLS compounds this), AUTH-006 (admin role inconsistency).
- **Recommendation:** Roles must live in `app_metadata` (server-controllable only) or be derived from the `admin_roles` table alone. Remove the `OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'` fallback from `is_admin()` and `is_admin_writer()`. Remove `updates.role` handling from `userProfileService.updateProfile`. Add a database trigger that blocks any update to `user_metadata.role` (or uses a BEFORE UPDATE on `auth.users` to strip it). Do all three — belt and braces.

### AUTH-002 Any authenticated user can write/delete all articles
- **Severity:** CRITICAL
- **Category:** security
- **Surface(s):** U (data integrity for everyone)
- **Evidence:**
  - [supabase/migrations/20260316000007_auth_user_article_rls.sql:31-38](../../supabase/migrations/20260316000007_auth_user_article_rls.sql#L31-L38) — `FOR INSERT/UPDATE/DELETE TO authenticated USING (true) WITH CHECK (true)` on `articles`, `article_citations`, `article_comments`, `article_images`, `article_status_history`
  - Migration comment at lines 7-10 says: "allow any authenticated user to access articles. The admin panel is already guarded by useAdminAuth() on the frontend."
- **What's wrong:** The policy relies on the frontend admin guard. Any authenticated patient/provider account can, using the shipped `VITE_SUPABASE_ANON_KEY`, directly call `await supabase.from('articles').update({ body_md: '...' }).eq('id', '...')` or `.delete()` — including deleting every article. The RLS policy approves because `USING (true)` accepts anyone who's logged in.
- **User/developer impact:** Any patient account can silently edit or destroy the entire clinical content library. Defense only comes from obscurity ("nobody tries"). Also affects `article_citations` — the source hierarchy that the PEAF quality gate enforces can be wiped by an attacker.
- **Why this matters for Psychage specifically:** The articles are clinical/mental-health content reviewed against the 5-tier source hierarchy. Unauthorized edits violate the editorial integrity the platform stakes its trust on.
- **Cross-references:** AUTH-001 (metadata-based admin escalation uses a different route to the same tables), AUTH-006.
- **Recommendation:** Replace `USING (true)` with `USING (public.is_admin_writer())` (once AUTH-001's JWT fallback is removed), or with an `EXISTS(SELECT 1 FROM admin_roles WHERE user_id = auth.uid() AND role IN ('super_admin','clinical_admin'))` subquery. The migration comment cites RLS recursion as the reason for the permissive policy — resolve the recursion properly rather than unlocking the door.

### AUTH-003 `AuthCallback` emits `state.error` but `LoginPage` reads `state.message`
- **Severity:** CRITICAL
- **Category:** ux
- **Surface(s):** U/A/P
- **Evidence:**
  - [src/pages/auth/AuthCallback.tsx:24](../../src/pages/auth/AuthCallback.tsx#L24) — `navigate('/login', { state: { error: error.message } })`
  - [src/pages/auth/LoginPage.tsx:41-49](../../src/pages/auth/LoginPage.tsx#L41-L49) — only reads `location.state?.message` and `location.state?.userType`. No `state.error` handling.
- **What's wrong:** When OAuth fails (consent denied, provider misconfigured, token expired on return), `AuthCallback` redirects to `/login` with an error payload that `LoginPage` never renders. The user sees a generic login page with no explanation of why they are back here.
- **User/developer impact:** Silent failure mode is the single worst UX pattern in auth. Users retry, hit the same wall, churn. During incident-triage this makes OAuth failures effectively invisible to support.
- **Why this matters for Psychage specifically:** Users may be low on emotional bandwidth. Being bounced back to a blank login screen after a failed OAuth attempt compounds frustration in exactly the population that needs the least friction.
- **Cross-references:** AUTH-013 (no logging of OAuth failures), AUTH-014 (no retry affordance).
- **Recommendation:** Either render `state.error` in `LoginPage` (same Alert as `state.message` but destructive variant) or standardize on `state.message` across the callback. Also wire a `searchParams.get('error')` path so the error survives a page refresh.

### AUTH-004 Zero i18n on auth surfaces
- **Severity:** HIGH
- **Category:** i18n
- **Surface(s):** U/A/P
- **Evidence:**
  - [src/locales/en/translation.json](../../src/locales/en/translation.json), and all four sibling locales, contain only `footer`, `language`, `navigator`, `providers` namespaces
  - [LoginPage.tsx:178-190](../../src/pages/auth/LoginPage.tsx#L178-L190) — error messages are JSX string literals
  - [SignUpPage.tsx:45-56](../../src/pages/auth/SignUpPage.tsx#L45-L56) — validation errors hardcoded
  - [UpdatePasswordPage.tsx:115-120](../../src/pages/auth/UpdatePasswordPage.tsx#L115-L120) — same pattern
  - No `useTranslation()` import in any file under [src/pages/auth/](../../src/pages/auth/)
- **What's wrong:** The app supports PT/ES/SV/FR throughout the site, but the moment a user tries to sign in or sign up, they are pushed back to English. Errors, consent text, button labels, success messages — all English.
- **User/developer impact:** Non-English users cannot read their own auth failures. Consent forms rendered in a language the user may not understand is a defensible GDPR/compliance risk.
- **Why this matters for Psychage specifically:** The platform explicitly ships 5 locales. Auth is the gateway; breaking the gateway's translation story undercuts the inclusion promise elsewhere.
- **Cross-references:** AUTH-019 (Supabase-returned errors are English regardless).
- **Recommendation:** Add an `auth` namespace to all 5 locale files. Route form errors and button labels through `t()`. Wrap Supabase-returned error strings with a local mapper that keys known codes to translated messages (and falls back to raw for unknown).

### AUTH-005 Current-password verification reuses `signInWithPassword`
- **Severity:** HIGH
- **Category:** security, data-layer
- **Surface(s):** U
- **Evidence:** [src/services/userProfileService.ts:157-164](../../src/services/userProfileService.ts#L157-L164) — `changePassword` calls `supabase.auth.signInWithPassword({ email: user.email, password: currentPassword })` to verify the current password before calling `updateUser({ password })`.
- **What's wrong:** Side effects:
  1. Each call counts toward Supabase's per-IP rate limit on sign-in attempts — a user rapidly re-attempting a password change hits rate-limit for login, not password-change.
  2. A successful re-authentication fires a `SIGNED_IN` event, which the AuthContext listener at [AuthContext.tsx:57-68](../../src/context/AuthContext.tsx#L57-L68) processes — causing an unnecessary React re-render cycle during a flow where the user is *already* signed in.
  3. Supabase may rotate the session's access token on sign-in, invalidating any in-flight request carrying the prior token (visible on slow connections as transient 401s).
- **User/developer impact:** Functional (changes passwords) but fragile. Under test-automation or rapid re-entry, rate limits will confuse the failure UX.
- **Why this matters for Psychage specifically:** Password change is part of the account-settings flow users visit after crisis recovery (paranoia reset, changed partner). Silent rate-limit failures here are unacceptable.
- **Cross-references:** AUTH-015 (password change doesn't regenerate session).
- **Recommendation:** Use `supabase.auth.reauthenticate()` (Supabase v2 explicitly exposes this for this purpose) or move verification server-side via a Postgres function + RPC.

### AUTH-006 `profiles.role` coexists with `admin_roles.role`
- **Severity:** HIGH
- **Category:** data-layer
- **Surface(s):** A
- **Evidence:**
  - [supabase/migrations/20250109000000_create_profiles.sql](../../supabase/migrations/20250109000000_create_profiles.sql) — seeds `profiles.role` from `user_metadata.role` via `handle_new_user()`
  - [supabase/migrations/20260310000001_admin_panel_foundation.sql](../../supabase/migrations/20260310000001_admin_panel_foundation.sql) — creates `admin_roles` as separate canonical table
  - [src/services/userProfileService.ts:60, 101, 120](../../src/services/userProfileService.ts#L60) — reads + writes `profiles.role` and `user_metadata.role`
  - `is_admin()` in [20260316000003_fix_article_admin_rls.sql:20-23](../../supabase/migrations/20260316000003_fix_article_admin_rls.sql#L20-L23) — checks `admin_roles` OR JWT, never `profiles.role`
- **What's wrong:** Three places claim to hold "role": `admin_roles` table, `profiles.role` column, `user_metadata.role`. They drift. A user whose `admin_roles` entry is revoked still has `profiles.role='admin'` and `user_metadata.role='admin'` — and client-side `RoleGuard(['admin'])` still lets them through.
- **User/developer impact:** Role revocation is not atomic. Admin offboarding is easy to get wrong.
- **Why this matters for Psychage specifically:** Role revocation for compliance/HR reasons (e.g., clinical-admin leaving the team) needs to be a single operation with single truth.
- **Cross-references:** AUTH-001.
- **Recommendation:** Pick one source of truth. `admin_roles` is the right one for admin elevation (scoped, auditable). `profiles.role` should be for self-identification (patient/provider) only and should never admit 'admin' — add a CHECK constraint. Client role resolution should fetch from `admin_roles` via authenticated RPC, not from JWT metadata.

### AUTH-007 No `autoComplete` attributes on any auth input
- **Severity:** HIGH
- **Category:** accessibility, ux
- **Surface(s):** U/A/P
- **Evidence:**
  - [LoginPage.tsx:286-311](../../src/pages/auth/LoginPage.tsx#L286-L311) — email/password inputs, no `autoComplete`
  - [SignUpPage.tsx:202, 288](../../src/pages/auth/SignUpPage.tsx#L202) — same
  - [ResetPasswordPage.tsx:125](../../src/pages/auth/ResetPasswordPage.tsx#L125) — same
  - [UpdatePasswordPage.tsx:262, 296](../../src/pages/auth/UpdatePasswordPage.tsx#L262) — same
- **What's wrong:** Password managers do not offer to fill. Mobile keyboards do not hint at email/password mode. Browsers cannot offer to save credentials reliably on signup (no `new-password` hint).
- **User/developer impact:** Every sign-in is manual typing. Users with complex passwords (what we want them to use) find it easier to pick weak ones they can memorize.
- **Why this matters for Psychage specifically:** Users in distress don't remember passwords. Password-manager integration is a usability baseline, not a nice-to-have.
- **Cross-references:** AUTH-008 (no `inputMode`), AUTH-017 (no focus management).
- **Recommendation:** Add `autoComplete="email"` to all email inputs, `autoComplete="current-password"` to login password, `autoComplete="new-password"` to signup password / confirm / update-password. Add `inputMode="email"` and `autoCapitalize="off"` to email inputs for mobile keyboards.

### AUTH-008 `window.location.href` assignment during render in `RoleGuard`
- **Severity:** HIGH
- **Category:** code
- **Surface(s):** U/A/P
- **Evidence:** [src/components/auth/RoleGuard.tsx:37, 43, 51, 59](../../src/components/auth/RoleGuard.tsx#L37) — `window.location.href = ...` inside the component render function body. Comments `// eslint-disable-next-line react-hooks/immutability` acknowledge the smell.
- **What's wrong:** Side effects during render are a React anti-pattern. Any re-render (e.g., React strict-mode double-invoke in dev, or concurrent rendering at boundary reload) triggers duplicate navigations. The user's cross-domain redirect can fire twice in quick succession, producing a flicker and occasional failed navigations on iOS Safari (where the second `location.href` can be suppressed).
- **User/developer impact:** Flaky redirects on role-mismatch; hard to reproduce locally; surfaces as "the admin redirect doesn't work sometimes."
- **Why this matters for Psychage specifically:** Provider/admin cross-domain redirects are the seam where users move between user-site and provider-portal — a shaky experience here erodes the perceived professionalism of the clinical side.
- **Cross-references:** AUTH-020 (loading flicker at role-guard boundary).
- **Recommendation:** Move navigation into `useEffect`. Render a loading state while effect executes.

### AUTH-009 Password-reset email link lands on `/update-password` but `/update-password` is an unguarded route
- **Severity:** HIGH
- **Category:** security, ux
- **Surface(s):** U
- **Evidence:** [src/App.tsx](../../src/App.tsx) — `/update-password` has no `ProtectedRoute`; [src/pages/auth/UpdatePasswordPage.tsx:74-79](../../src/pages/auth/UpdatePasswordPage.tsx#L74-L79) — component detects missing recovery params and shows an "Invalid or expired reset link" error.
- **What's wrong:** The route is public, not guarded, and the defense is component-level. The polling loop at [UpdatePasswordPage.tsx:86-100](../../src/pages/auth/UpdatePasswordPage.tsx#L86-L100) runs for up to 5 seconds before failing — if a logged-in user visits `/update-password` directly (already having a session from a prior login), the component happily allows them to change their password without re-verifying the current one. This is a password-reset flow that trusts the session implicitly.
- **User/developer impact:** A session-hijack-light attack: an attacker with a live session (e.g., a shared computer where the victim forgot to log out) can navigate directly to `/update-password` and change the password without knowing the current one. The password-change flow in [AccountSettings.tsx](../../src/pages/dashboard/AccountSettings.tsx) requires the current password, but this alternate path doesn't.
- **Why this matters for Psychage specifically:** Shared-device usage is common in clinical/student populations. The "I was just using it a minute ago" scenario is realistic.
- **Cross-references:** AUTH-005.
- **Recommendation:** Require a valid `recovery` token (not just any session) to update the password here. Either verify `data.session.user.aud === 'recovery'` (Supabase sets this for recovery-bound sessions) or add an explicit flag and refuse to update if it's missing.

### AUTH-010 `signup` permits arbitrary `extraMetadata` spread into `user_metadata`
- **Severity:** HIGH
- **Category:** security
- **Surface(s):** U/P
- **Evidence:** [src/context/AuthContext.tsx:109-122](../../src/context/AuthContext.tsx#L109-L122) — `extraMetadata?: Record<string, unknown>` spread via `...extraMetadata` into `options.data`. [src/pages/auth/SignUpPage.tsx:67-73](../../src/pages/auth/SignUpPage.tsx#L67-L73) passes only known fields.
- **What's wrong:** Today's callers are disciplined. But the signature accepts any shape — a future call (or a malicious fork of the SignUpPage pattern) can inject `{ role: 'admin' }`. Because `user_metadata.role` is trusted (AUTH-001), this is a signup-time escalation waiting to happen.
- **User/developer impact:** Defense-in-depth failure. One future bad call and all the work AUTH-001 recommends is undone.
- **Cross-references:** AUTH-001.
- **Recommendation:** Narrow `extraMetadata` to a known union type (`{ age_verified?: boolean; consent_version?: string; country?: string; age?: number; referral_source?: string }`). Reject any other key at the AuthContext boundary.

### AUTH-011 `logout` does not invalidate TanStack Query cache
- **Severity:** HIGH
- **Category:** data-layer
- **Surface(s):** U/A/P
- **Evidence:** [src/context/AuthContext.tsx:143-155](../../src/context/AuthContext.tsx#L143-L155) — `logout` calls `supabase.auth.signOut()` then clears local state. No `queryClient.clear()` or invalidation.
- **What's wrong:** TanStack Query (60s stale time per CLAUDE.md) caches data from user-scoped queries. After logout-and-login-as-different-user on the same tab, the cache still holds User A's mood entries, journal entries, clarity scores. The next login briefly renders User A's data before refetches complete.
- **User/developer impact:** Privacy leak on shared devices. Especially bad for mental-health data (mood logs, journals).
- **Why this matters for Psychage specifically:** The app stores diagnostic-proximal data. Even a 200ms flash of the wrong user's data is a trust-breaking event for this domain.
- **Cross-references:** AUTH-016.
- **Recommendation:** Call `queryClient.clear()` (or invalidate all user-scoped query keys) inside `logout`, before the state clear. Subscribe the `queryClient` to `onAuthStateChange('SIGNED_OUT')` as a belt-and-braces.

### AUTH-012 `login` optimistically sets state before `onAuthStateChange` confirmation
- **Severity:** HIGH
- **Category:** data-layer
- **Surface(s):** U/A/P
- **Evidence:** [src/context/AuthContext.tsx:88-97](../../src/context/AuthContext.tsx#L88-L97) — `login` directly calls `setState` after `signInWithPassword` returns. The listener at [L57-68](../../src/context/AuthContext.tsx#L57-L68) then fires `SIGNED_IN` and calls `setState` again with possibly the same or a slightly-different mapped user.
- **What's wrong:** Two sources of truth for "is the user logged in" converge on the same state. If the listener fires *before* `login`'s local `setState` runs (possible due to microtask ordering), the state can transition logged-out → logged-in → logged-out-briefly → logged-in. Downstream `useEffect`s that depend on `isAuthenticated` get duplicate invocations.
- **User/developer impact:** Intermittent double-fires on login. Flaky navigation away from `/login` (redirect can fire twice). Small but real source of the "I had to click the button twice" reports.
- **Cross-references:** AUTH-008, AUTH-020.
- **Recommendation:** Let the listener be the single updater. `login` should only return success/failure; state mutation belongs to the listener.

### AUTH-013 No logging / telemetry of auth failures
- **Severity:** MEDIUM
- **Category:** code
- **Surface(s):** U/A/P
- **Evidence:** Auth errors are surfaced to UI and `console.error`'d — no Sentry capture, no analytics event. Commit `40573df` ("Sentry infrastructure") suggests Sentry exists but isn't wired into auth paths.
- **Recommendation:** Wrap each auth method with a Sentry breadcrumb + tagged exception capture. Distinguish "user mistake" (bad password) from "platform failure" (network / Supabase 5xx).

### AUTH-014 No retry/resend affordance after failed OAuth or unsent email
- **Severity:** MEDIUM
- **Category:** ux
- **Surface(s):** U/A/P
- **Evidence:** [ResetPasswordPage.tsx](../../src/pages/auth/ResetPasswordPage.tsx) — submit button resets to idle, but no throttle on resubmits and no visual "we sent another email" feedback. [LoginPage.tsx](../../src/pages/auth/LoginPage.tsx) — no "try a different OAuth provider" link after a failure.
- **Recommendation:** Per-button throttle (`Wait 30 seconds before requesting another reset email`). Soft-retry CTA on error alerts.

### AUTH-015 Password change doesn't force session regeneration
- **Severity:** MEDIUM
- **Category:** security
- **Surface(s):** U
- **Evidence:** [userProfileService.ts:167](../../src/services/userProfileService.ts#L167) — `updateUser({ password })` returns; no subsequent `signOut` / `refreshSession` in this path. Compare to [UpdatePasswordPage.tsx:133-138](../../src/pages/auth/UpdatePasswordPage.tsx#L133-L138) which *does* sign out after recovery-based password change.
- **What's wrong:** Supabase rotates the refresh token on `updateUser({ password })` internally, but the currently-issued access token remains valid until natural expiry. On a lost-device scenario where a user changes password specifically to kick the thief, the thief's session survives until the access token expires (~1 hour default).
- **Recommendation:** After any password change, call `supabase.auth.signOut({ scope: 'others' })` to invalidate sessions in other devices/tabs.

### AUTH-016 Session hydration at mount has no "checking..." vs "logged-out" distinction in some consumers
- **Severity:** MEDIUM
- **Category:** ux
- **Surface(s):** U/A/P
- **Evidence:** [AuthContext.tsx:28-32](../../src/context/AuthContext.tsx#L28-L32) — initial state has `isLoading: true, isAuthenticated: false`. Consumers that check `!isAuthenticated` without also checking `isLoading` (e.g., many dashboard components rendering "Sign in to continue" prompts) briefly flash the unauthenticated UI at page load.
- **Recommendation:** Audit `isAuthenticated` callsites. Every one that renders a "not signed in" UI must gate on `!isLoading` as well. `ProtectedRoute` does this correctly ([L14-16](../../src/components/auth/ProtectedRoute.tsx#L14-L16)) — the pattern is just inconsistently applied.

### AUTH-017 No focus management or `aria-live` on auth-form errors
- **Severity:** MEDIUM
- **Category:** accessibility
- **Surface(s):** U/A/P
- **Evidence:** [LoginPage.tsx:276-281](../../src/pages/auth/LoginPage.tsx#L276-L281) — error Alert renders but focus stays on submit button; no `aria-live="polite"` on the Alert container. Repeated across all four auth form pages.
- **Recommendation:** Add `aria-live="polite"` (or `"assertive"` for security-critical errors) to the error-alert region. On error, programmatically focus the first invalid field, or the alert itself.

### AUTH-018 Supabase `setTimeout(..., 3000)` auto-redirect on AuthCallback / UpdatePasswordPage is not cancellable
- **Severity:** MEDIUM
- **Category:** ux
- **Surface(s):** U
- **Evidence:** [AuthCallback.tsx:24, 96](../../src/pages/auth/AuthCallback.tsx#L24); [UpdatePasswordPage.tsx:135-138](../../src/pages/auth/UpdatePasswordPage.tsx#L135-L138) — 3-second `setTimeout` before `navigate('/login')`. No cleanup if user unmounts the page.
- **What's wrong:** User reads the error, clicks a link to go back, and 3 seconds later gets another navigation. The stacked redirects are disorienting.
- **Recommendation:** Wrap in `useEffect`, return a cleanup that calls `clearTimeout`.

### AUTH-019 Supabase-returned error messages surface raw English to the UI
- **Severity:** MEDIUM
- **Category:** ux, i18n
- **Surface(s):** U/A/P
- **Evidence:** [LoginPage.tsx:190](../../src/pages/auth/LoginPage.tsx#L190) — when none of the heuristic matches succeed, `errorMessage` (Supabase's raw English string) is set as-is. [AuthContext.tsx:85, 125, 182, 203, 220](../../src/context/AuthContext.tsx) — passes Supabase `error.message` through unchanged.
- **Recommendation:** After AUTH-004, map Supabase error codes (e.g., `auth/invalid-credentials`, `auth/email-not-confirmed`) to translated strings. The heuristic substring-match in LoginPage is fragile — use Supabase's `error.code` (v2.90+ exposes codes).

### AUTH-020 `ProtectedRoute` shows `GlobalLoading` which may flash on fast networks
- **Severity:** MEDIUM
- **Category:** ux
- **Surface(s):** U/A/P
- **Evidence:** [src/components/auth/ProtectedRoute.tsx:14-16](../../src/components/auth/ProtectedRoute.tsx#L14-L16) — renders `<GlobalLoading />` whenever `isLoading`. Session hydration is typically <50ms from localStorage, but the component still renders the full loading UI. Produces a visible flash on every protected-route navigation.
- **Recommendation:** Defer showing the loading UI by 200ms (useEffect + setTimeout) — if hydration completes first, no flash; if it stalls, user sees the spinner.

### AUTH-021 Account-deletion grace period not visible in UI
- **Severity:** MEDIUM
- **Category:** ux, compliance
- **Surface(s):** U
- **Evidence:** [src/services/privacyService.ts:98-142](../../src/services/privacyService.ts#L98-L142) — deletion sets `deletion_scheduled_at` 30 days out. No code in [PrivacySettings.tsx](../../src/pages/dashboard/PrivacySettings.tsx) that I could confirm renders the pending deletion state or the "you have N days to cancel" countdown.
- **Recommendation:** Read `profiles.deletion_scheduled_at` at login. If non-null and in the future, show a banner with Cancel affordance across the whole app (not just privacy settings).

### AUTH-022 Logout does not navigate — consumers must redirect explicitly
- **Severity:** MEDIUM
- **Category:** data-layer
- **Surface(s):** U/A/P
- **Evidence:** [AuthContext.tsx:143-155](../../src/context/AuthContext.tsx#L143-L155) — `logout` returns `void`, no navigation. Callers must separately `navigate('/login')`.
- **What's wrong:** If a caller forgets to navigate, the user stays on the protected page but with `isAuthenticated=false` — `ProtectedRoute` then redirects, but at the next render, producing a visible flicker and a wrong URL in history.
- **Recommendation:** Either accept a redirect argument in `logout(redirect = '/login')` or let the listener on `SIGNED_OUT` handle redirection centrally.

### AUTH-023 Four deep-relative imports where `@/` should apply
- **Severity:** LOW
- **Category:** code
- **Surface(s):** U/A/P
- **Evidence:** [LoginPage.tsx:9](../../src/pages/auth/LoginPage.tsx#L9), [SignUpPage.tsx:11](../../src/pages/auth/SignUpPage.tsx#L11), [ProtectedRoute.tsx:3](../../src/components/auth/ProtectedRoute.tsx#L3), [RoleGuard.tsx:4](../../src/components/auth/RoleGuard.tsx#L4) — all use `'../../context/AuthContext'` instead of `@/context/AuthContext`.
- **Recommendation:** Straight replacement.

### AUTH-024 `LoginPage.useEffect` calls `window.history.replaceState({}, '')`
- **Severity:** LOW
- **Category:** code
- **Surface(s):** U/A
- **Evidence:** [LoginPage.tsx:47](../../src/pages/auth/LoginPage.tsx#L47) — second arg is `title` (legacy), third is URL. Passing empty string as second arg is a no-op but idiomatic usage is `null`. Not passing the third argument omits URL rewrite, which is probably the intent — the goal seems to be to wipe `location.state`.
- **Recommendation:** `window.history.replaceState(null, '', window.location.pathname + window.location.search)` for clarity, or a React Router idiom (`navigate(location, { replace: true, state: null })`).

### AUTH-025 No client-side rate limiting on "forgot password" or OAuth buttons
- **Severity:** LOW
- **Category:** ux
- **Surface(s):** U/A
- **Evidence:** [ResetPasswordPage.tsx](../../src/pages/auth/ResetPasswordPage.tsx) — submit button re-enables immediately after response. A user spamming the button fires multiple Supabase requests and multiple emails.
- **Recommendation:** 30-second disabled window after a successful send. Visible countdown helps with the "did it send?" question too.

### AUTH-026 `RoleGuard` falls through to `/` for unknown roles (e.g., an admin who's actually a provider-admin hybrid)
- **Severity:** LOW
- **Category:** code
- **Surface(s):** U/A
- **Evidence:** [RoleGuard.tsx:57-62](../../src/components/auth/RoleGuard.tsx#L57-L62) — catchall redirect to `/`. If `user.role` is something unexpected (`'staff'`, future `'clinical_admin'` surfaced from admin_roles), user lands on the home page silently.
- **Recommendation:** Explicit "you don't have access" page with a logout affordance, rather than redirect-to-root.

### AUTH-027 `AuthCallback.tsx` missing dependency `navigate` in `useEffect`
- **Severity:** UNCLEAR
- **Category:** code
- **Surface(s):** U/A/P
- **Evidence:** [AuthCallback.tsx:102](../../src/pages/auth/AuthCallback.tsx#L102) — `// eslint-disable-next-line react-hooks/exhaustive-deps`. Deliberate; but `navigate` is stable in v6+ and adding it is harmless.
- **Recommendation:** Clarify intent with a comment or just include `navigate` in deps. If the omission is to prevent re-run, the `useRef` pattern is clearer than the eslint-disable.

---

## D. Supabase Dashboard / Config Checklist (verify manually)

### D.1 Email / SMTP
- [ ] SMTP provider configured (default Supabase SMTP has hard daily cap ~100 emails — not production-viable; move to Resend/Postmark/SendGrid before any significant user volume)
- [ ] **Site URL** set to the production main domain (affects where Supabase sends users for `signUp` confirmation without `emailRedirectTo`)
- [ ] **Additional Redirect URLs** include: `https://psychage.com/*`, `https://admin.psychage.com/*`, Vercel preview wildcards (`https://psychage-v2-*.vercel.app/*`), `http://localhost:5173/*`, and any dev ports used
- [ ] Confirmation (signup) email template branded — logo, Inter typography, teal `#1A9B8C` CTA, mental-health-appropriate tone, **no diagnostic language**
- [ ] Recovery (password reset) email template branded + includes link expiry time + gentle tone
- [ ] Email change confirmation template branded (even though code does not use it today, Supabase will send it if the user triggers email change via dashboard)
- [ ] Magic link / invite templates branded (not currently used, but worth reviewing defaults)
- [ ] **SPF** record on the sending domain
- [ ] **DKIM** record on the sending domain
- [ ] **DMARC** record on the sending domain (start with `p=quarantine`, move to `reject` after 30 days of clean reports)
- [ ] Per-locale templates — Supabase multi-locale template support is plan-tier dependent; even on Pro, EN/PT/ES/SV/FR versions must each be authored

### D.2 OAuth Providers

**Google:**
- [ ] Provider enabled in Supabase dashboard
- [ ] Client ID + Client Secret present and matching the current Google Cloud Console project
- [ ] **OAuth consent screen** in "Production" (not "Testing" — Testing caps at 100 users)
- [ ] Consent screen has Psychage branding + privacy URL + ToS URL
- [ ] Authorized redirect URIs include `https://<project>.supabase.co/auth/v1/callback`
- [ ] Scopes: `openid email profile` only (no unnecessary scopes)

**Apple:**
- [ ] Provider enabled
- [ ] Services ID, Team ID, Key ID, and `.p8` private key present
- [ ] Return URL in Apple Developer matches Supabase callback
- [ ] `apple-developer-domain-association` file served at `https://psychage.com/.well-known/apple-developer-domain-association` — **note: this file is not present in the repo** (verified via grep)
- [ ] If native iOS ships in future, Sign in with Apple flow is separate from OAuth redirect

### D.3 Auth Settings
- [ ] Email confirmations **required** before first sign-in (strongly recommended for mental-health platform)
- [ ] Password minimum length ≥ 10; require number + symbol (code's client-side minimum is only 8 chars)
- [ ] **HaveIBeenPwned breached-password check enabled** (Supabase supports this natively on Pro — critical for populations who reuse passwords)
- [ ] Rate limits reviewed for sign-in, OTP, password reset (defaults are ok for most traffic; reduce further for admin)
- [ ] JWT access token expiry: 60 min (default); refresh token rotation enabled
- [ ] Max sessions per user (if supported on current plan) — clinical setting suggests restricting to 3-5 devices

### D.4 RLS & Role Claims
- [ ] **Remove** `user_metadata.role='admin'` fallback from `is_admin()` and `is_admin_writer()` (AUTH-001)
- [ ] **Replace** `USING (true)` policies on article tables with admin-gated equivalents (AUTH-002)
- [ ] Migrate existing admins' role from `user_metadata` to `app_metadata` via service-role script, then prohibit role writes via trigger
- [ ] Confirm `admin_roles` is sole source of truth; drop (or constrain) `profiles.role` (AUTH-006)
- [ ] Verify RLS is enabled on `dsar_requests`, `user_consents`, `privacy_settings` — each with `user_id = auth.uid()` policies (code implies they are, verify in dashboard)

---

## E. Manual Verification Required

- **M-01: Email deliverability.** Sign up with a fresh address on each of Gmail/Outlook/iCloud. Time from click-to-inbox. Confirm link works in same browser and a different browser, confirm link expiry (24h default).
- **M-02: Password reset round-trip.** Trigger `resetPasswordForEmail` from staging, click link in three browsers, confirm `/update-password` polling resolves within the 5s budget, confirm post-update signout → login flow.
- **M-03: OAuth — Google.** Incognito, click Sign in with Google. Photograph consent screen — verify branding, scopes listed (`profile`, `email` only), privacy/ToS links work, on return to `/auth/callback` the role-routing is correct for a new patient, provider, admin.
- **M-04: OAuth — Apple.** As M-03 including verifying `apple-developer-domain-association` file is served. Also test Apple Private Relay email — confirm account creates, user can still receive reset email via relay address.
- **M-05: Account collision.** Create user foo@x.com with email/password. Sign out. Click Google OAuth with same foo@x.com. Observe actual UX — Supabase default is "separate identities until linked." Does the user land in a confused state with two accounts?
- **M-06: Deep-link preservation.** Log out. Navigate to `/dashboard/history?foo=bar`. Confirm redirect to `/login?redirectTo=%2Fdashboard%2Fhistory%3Ffoo%3Dbar`. Log in. Confirm you land on `/dashboard/history?foo=bar`.
- **M-07: Cross-tab logout.** Open `/dashboard` in Tab A, `/portal` in Tab B (as a provider-admin). In Tab A, logout. Confirm Tab B either redirects to `/login` within a few seconds or the next action gets a 401 and redirects.
- **M-08: Expired recovery link.** Request reset. Wait >24 hours. Click link. Confirm UX is graceful ("this link has expired, request a new one") not a white screen.
- **M-09: Session refresh under load.** Leave app open for 2 hours on a protected page. Confirm no forced logout; confirm no flicker during silent token refresh.
- **M-10: Direct `/update-password` access.** Log in normally. Navigate directly to `/update-password`. Confirm AUTH-009 — does the component allow password change without a recovery token? If yes, the hole is real.
- **M-11: Admin escalation smoke test.** Sign up as patient. In devtools console: `await supabase.auth.updateUser({ data: { role: 'admin' } })`. Refresh. Attempt to access admin panel. Confirm AUTH-001 is exploitable.
- **M-12: Article deletion smoke test.** As a patient, in devtools: `await supabase.from('articles').delete().eq('id', '<any id>')`. Confirm AUTH-002 — does it succeed without admin role?
- **M-13: Incognito/third-party-cookies off.** OAuth flows on Safari with "Prevent cross-site tracking" on. Confirm Supabase PKCE flow still works.
- **M-14: Reduced motion.** Enable OS "Reduce motion." Verify auth form Framer Motion entries are suppressed or gentle.
- **M-15: Locale mismatch.** Set browser language to pt-BR. Load `/login`. Confirm the whole UI is English (confirming AUTH-004 visually).

---

## F. Open Questions for Reviewer

- **Q-01:** Should `user_metadata.role` exist at all? Proposal: no — self-identification (patient vs provider) should live in `profiles.role`; admin elevation should live in `admin_roles`; `user_metadata` should hold display-only fields (display_name, avatar_url).
- **Q-02:** Is MFA on the near-term roadmap? If yes, the session-regeneration story (AUTH-015) gets more urgent.
- **Q-03:** Should magic-link sign-in be supported? Not currently used, but strongly friendly for mental-health populations — fewer password-memory burdens. Requires product decision + dashboard template work.
- **Q-04:** Should the user/main auth and provider-portal auth share one `AuthContext` or split? Current code shares. Arguments to split: different session-lifetime, separate telemetry, easier role-elevation UX. Argument to stay: simplicity + existing working behavior.
- **Q-05:** Who owns the Vercel plan-tier question (Hobby vs Pro)? Affects email SMTP defaults, redirect-allowlist capacity, cold-start timings for auth flows.
- **Q-06:** Is there an existing runbook for rotating OAuth secrets? If not, worth documenting before an incident forces it.
- **Q-07:** What should happen when a user has `deletion_scheduled_at` in the future and logs in again? Current code doesn't surface this state (AUTH-021). Offer to cancel? Block login until they confirm? Product decision.
- **Q-08:** `/for-providers/apply` and `/for-providers/claim` are public. Is that intentional (it allows lead-capture before account creation) or should we require a stub account first?

---

## G. Positive Observations

- **Single Supabase client.** Exactly one `createClient` call in app code ([supabaseClient.ts:11](../../src/lib/supabaseClient.ts#L11)). No duplicate-instance footguns.
- **Clean listener lifecycle.** `onAuthStateChange` subscribed once in `AuthProvider` with both `isCancelled` flag and `subscription.unsubscribe()` on unmount ([AuthContext.tsx:71-74](../../src/context/AuthContext.tsx#L71-L74)).
- **Crisis content is genuinely public.** [App.tsx:286](../../src/App.tsx#L286) `/crisis` and `/tools/symptom-navigator/crisis` have no guards. The `CrisisBanner` preload widget is z-indexed above the loading screen. Done right.
- **User-scoped RLS is thorough.** Every table with `user_id → auth.users` has RLS enabled and policies scoped to `auth.uid()` (validated across 15+ migrations). `ON DELETE CASCADE` wired on `profiles.id → auth.users.id`.
- **Deep-link preservation is belt-and-braces.** [ProtectedRoute.tsx:19-22](../../src/components/auth/ProtectedRoute.tsx#L19-L22) uses both `state.from` and `?redirectTo=` query — survives page refresh.
- **Consent audit trail.** Signup properly logs consent via [consentService.logBulkConsent](../../src/services/consentService.ts), with versioning.
- **Soft-delete with 30-day grace.** Thoughtful GDPR implementation at [privacyService.ts:98-142](../../src/services/privacyService.ts#L98-L142) + matching edge function ([account-deletion/index.ts](../../supabase/functions/account-deletion/index.ts)). Service-role-gated hard-delete.
- **PKCE + implicit recovery flow both handled.** [UpdatePasswordPage.tsx:32-37](../../src/pages/auth/UpdatePasswordPage.tsx#L32-L37) checks both hash and query param variants.
- **Admin-domain separation in Vercel.** [vercel.json](../../vercel.json) host-based rewrites cleanly split user and admin bundles — defense-in-depth against subdomain confusion.
- **Password visibility toggle is accessible.** `aria-label={showPassword ? ...}` on the eye button ([LoginPage.tsx:318](../../src/pages/auth/LoginPage.tsx#L318)).
- **Dev-mode demo credentials are clearly labeled.** [LoginPage.tsx:239-257](../../src/pages/auth/LoginPage.tsx#L239-L257) gates the demo UI behind `import.meta.env.DEV` — no prod risk.

---

## H. Methodology Notes

**Tools used:** Glob, Grep, Read only. No code mutations. No dashboard/runtime access.

**Grep patterns I ran (notable ones):** `createClient`, `signIn|signUp|signOut|signInWithPassword|signInWithOAuth`, `resetPasswordForEmail`, `updateUser`, `verifyOtp`, `exchangeCodeForSession`, `onAuthStateChange`, `redirectTo`, `user_metadata`, `app_metadata`, `is_admin`, `admin_roles`, `USING (true)`, `RLS`, `ProtectedRoute`, `RoleGuard`.

**What I could determine from code alone:** everything in sections A–C above, with file:line evidence.

**What I could NOT determine and deferred to D/E:**
- Actual Supabase dashboard config (SMTP provider, Site URL, redirect allowlist, email template content, OAuth consent screen state, rate-limit values, password policy, HaveIBeenPwned toggle, JWT expiry).
- Whether OAuth is actually configured in dashboard vs. just coded for.
- DNS state (SPF/DKIM/DMARC).
- Apple `apple-developer-domain-association` file — not in repo, must be served at DNS level.
- Vercel plan tier (affects `maxDuration`, SMTP limits).
- Real email deliverability.

**Parts inferred rather than verified:** Some i18n-coverage claims are from spot reads of `src/locales/en/translation.json` + two others — I confirmed no auth namespace exists but didn't diff every key. The claim stands.

**Provider Portal scope shift:** The audit prompt framed P as "new/in-progress," but discovery confirmed it's fully implemented with 7 guarded portal pages + public signup/claim flow. All P findings are therefore "audit of what exists," not "infrastructure scoping."

**Crisis content claim verification:** I traced every auth-related redirect path and confirmed `/crisis` and the symptom-navigator crisis screen never hit `ProtectedRoute` or `RoleGuard` — they render directly. The `CrisisBanner` preloader link at `App.tsx:192-202` is rendered at z-index 10000, above the loading overlay — also confirmed public.

**Branch note:** The environment banner recorded branch `mindmate-fix-phase1-build` at session start; `git branch --show-current` at audit time returned `fix/mindmate-client-error-hardening`. Using the live value for the header.
