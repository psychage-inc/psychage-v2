# Psychage Auth Audit — Addendum (2026-04-23)

**Parent document:** [auth-audit-2026-04-23.md](./auth-audit-2026-04-23.md)
**Auditor:** Claude Code (read-only supplementary pass)
**Repo commit at addendum time:** `87a7f1abfb07e3bcd6b77989c74070342883b1e3`
**Branch:** `fix/mindmate-client-error-hardening`

This addendum does three things:
1. Applies two severity corrections from reviewer feedback (§A).
2. Adds 7 findings from a targeted gap hunt, AUTH-028 through AUTH-034 (§B).
3. Records two pre-fix investigations — RLS recursion pattern and admin-role migration scope — whose answers feed the upcoming security hotfix prompt (§H).

The original audit's Discovery Map, findings AUTH-001 through AUTH-027, and overall framing remain authoritative. This document only extends and corrects.

---

## A. Corrections

### C-01 — AUTH-003 severity: CRITICAL → HIGH

The original audit labeled [AUTH-003 (AuthCallback emits `state.error`, LoginPage reads `state.message`)](auth-audit-2026-04-23.md#auth-003-authcallback-emits-stateerror-but-loginpage-reads-statemessage) as CRITICAL. The reviewer is correct that this does not meet the CRITICAL bar: no data is leaked, no account is taken over, no crisis content is gated. A silent OAuth failure is user-hostile and degrading, but it is a **material UX defect**, not a security issue. Reclassify as **HIGH**.

### C-02 — AUTH-009 severity: HIGH → CRITICAL

The original audit labeled [AUTH-009 (Password-reset email link lands on `/update-password` but `/update-password` is an unguarded route)](auth-audit-2026-04-23.md#auth-009-password-reset-email-link-lands-on-update-password-but-update-password-is-an-unguarded-route) as HIGH. It meets the CRITICAL bar: any attacker with access to a live session (unlocked shared device) can navigate directly to `/update-password` and change the password without knowing the current password — locking out the legitimate user. The logged-in path through `AccountSettings` requires the current password ([userProfileService.ts:157-164](../../src/services/userProfileService.ts#L157-L164)); this parallel path does not ([UpdatePasswordPage.tsx:127](../../src/pages/auth/UpdatePasswordPage.tsx#L127)). Shared-device scenarios — family devices, college library terminals, residential and clinical programs, pooled tablets — are common in Psychage's target population, so the exploit is both realistic and high-impact. Reclassify as **CRITICAL**.

### Updated Severity Totals (project-wide: original corrected + addendum additions)

| Tier | Original | After C-01/C-02 | Addendum | **Project Total** |
|---|---|---|---|---|
| CRITICAL | 3 | 3 (different members: -AUTH-003, +AUTH-009) | 0 | **3** |
| HIGH | 9 | 9 (different members: +AUTH-003, -AUTH-009) | 3 | **12** |
| MEDIUM | 10 | 10 | 4 | **14** |
| LOW | 4 | 4 | 0 | **4** |
| UNCLEAR | 1 | 1 | 0 | **1** |
| **Total** | 27 | 27 | 7 | **34** |

Note: the original prompt text suggested CRITICAL would increase to 4, but arithmetically C-01 and C-02 swap one finding each — net delta is zero to both CRITICAL and HIGH. Reporting corrected figures.

---

## B. New Findings

### AUTH-028 No email notification when a user's password changes
- **Severity:** HIGH
- **Category:** security
- **Surface(s):** U
- **Evidence:**
  - [src/services/userProfileService.ts:166-175](../../src/services/userProfileService.ts#L166-L175) — `changePassword` returns success immediately after `supabase.auth.updateUser({ password })`. No email-send call, no edge-function invocation.
  - [src/pages/auth/UpdatePasswordPage.tsx:127-138](../../src/pages/auth/UpdatePasswordPage.tsx#L127-L138) — recovery-path password change: same. Signs out and navigates to login, nothing more.
  - Greps for `Resend|Postmark|SendGrid|sendEmail|send_email|notification_email` produced zero hits outside documentation and Sentry unrelated imports.
  - No migration defines a trigger on `auth.users` UPDATE that fires an email.
  - No edge function under [supabase/functions/](../../supabase/functions/) handles password-change notification.
- **What's wrong:** When a password changes — whether by the user or by an attacker who chained into it via AUTH-009 or session-hijack — there is no channel that tells the legitimate account owner. The victim learns about the breach the next time they try to log in (hours or days later), by which point the attacker has had free reign.
- **User/developer impact:** Account-takeover is invisible to the victim. There is no "this wasn't me — recover" affordance because there is no notification to react to.
- **Why this matters for Psychage specifically:** Victims of unauthorized password change on a mental-health platform are disproportionately users in crisis or in controlled environments (inpatient, dependent living) where early detection via another channel is the only recovery path. The platform's trust posture requires a second channel.
- **Cross-references:** AUTH-009 (the exploit path), AUTH-015 (missing session rotation compounds invisibility).
- **Recommendation:** After any successful `updateUser({ password })`, fire-and-forget a Supabase edge function that sends a branded email to the user's registered address: subject "Your Psychage password was just changed"; body contains timestamp, approximate IP if available, a prominent "This wasn't me — recover my account" link that triggers a fresh password reset + signs out all sessions server-side. Do not block the UI on the email result. The sender domain must be verified (see D.1).

### AUTH-029 No CAPTCHA / bot challenge on signup or password-reset endpoints
- **Severity:** HIGH
- **Category:** security
- **Surface(s):** U/P
- **Evidence:**
  - Grep for `hcaptcha|turnstile|recaptcha|captchaToken|captcha` (case-insensitive) across the repo: zero matches in auth code. The only hit is `.audit/PROVIDER_DIRECTORY_ISSUES_SUPPLEMENTARY.md:97` — an unrelated analytics-events finding.
  - [src/context/AuthContext.tsx:109-122](../../src/context/AuthContext.tsx#L109-L122) — `signup` passes `options.data` but never an `options.captchaToken`.
  - [src/context/AuthContext.tsx:175-192](../../src/context/AuthContext.tsx#L175-L192) — `requestPasswordReset` has no captchaToken.
  - No `@hcaptcha/react-hcaptcha`, `react-turnstile`, or `react-google-recaptcha` in `package.json` (verified by grep).
- **What's wrong:** Two public endpoints trigger outbound emails: signup (verification email to any address) and password-reset (reset email to any registered address). Both can be hit in a loop from scripts using the public `VITE_SUPABASE_ANON_KEY`. Without a bot challenge:
  - **Signup abuse:** a spammer can use Psychage's signup endpoint to mass-send verification emails to arbitrary addresses. The emails come from Psychage's verified sender domain. Deliverability reputation degrades; legitimate mail gets filtered.
  - **Reset abuse (email flooding):** an attacker can flood a known victim's inbox with password-reset emails from Psychage — a light DoS that also feels harassing.
- **User/developer impact:** Deliverability damage impairs *all* auth flows for *all* users. Reset-email flooding is a harassment vector.
- **Why this matters for Psychage specifically:** Mental-health-adjacent domains have higher-than-average targeting from bad actors (phishing, pharmaceutical fraud, impersonation). Protecting the sender reputation is not optional if the platform wants email-based verification to function over time.
- **Cross-references:** AUTH-025 (no client-side throttle on reset) — AUTH-025 handles the UI-loop case, this handles the scripted-attack case.
- **Recommendation:** Integrate Cloudflare Turnstile (invisible by default, better privacy than hCaptcha, free at scale). Supabase v2 supports `options.captchaToken` natively in `signUp` and `resetPasswordForEmail`. Wire Turnstile on signup and reset; leave login uninstrumented to avoid friction for the legitimate user (Supabase server-side rate limits cover scripted login attempts well enough for the non-critical-access case). Update the dashboard checklist to include Supabase's CAPTCHA provider setting.

### AUTH-030 Open-redirect via `redirectTo` parameter and cross-domain base URL concatenation
- **Severity:** HIGH
- **Category:** security
- **Surface(s):** U/A
- **Evidence:**
  - [src/pages/auth/LoginPage.tsx:38](../../src/pages/auth/LoginPage.tsx#L38) — `const from = location.state?.from?.pathname || searchParams.get('redirectTo') || null;`
  - [src/pages/auth/LoginPage.tsx:126](../../src/pages/auth/LoginPage.tsx#L126) — `navigate(needsOnboarding ? '/onboarding' : (from || '/dashboard'), { replace: true });` — passes `from` to react-router's `navigate`.
  - [src/pages/auth/LoginPage.tsx:129-131](../../src/pages/auth/LoginPage.tsx#L129-L131) — `window.location.href = needsOnboarding ? adminUrl('/onboarding') : adminUrl(from || '/');` — **concatenates `from` into a cross-domain URL** with no validation.
  - [src/pages/auth/LoginPage.tsx:167](../../src/pages/auth/LoginPage.tsx#L167) — `navigate(from || '/dashboard', { replace: true });` — patient path, same unvalidated `from`.
  - [src/lib/urls.ts:20-27](../../src/lib/urls.ts#L20-L27) — `adminUrl(path)` returns `${ADMIN_URL}${path}` in production. No validation that `path` begins with `/` or is otherwise well-formed.
- **What's wrong:** Three distinct attack surfaces:
  1. **Protocol-relative:** `?redirectTo=//evil.com/harvest` — react-router's `navigate('//evil.com/harvest')` may navigate same-origin to that path, but when it flows through `adminUrl('//evil.com/harvest')` the result is `https://admin.psychage.com//evil.com/harvest` which browsers interpret as scheme-relative to `https://admin.psychage.com//evil.com/harvest` — same-origin in that particular concatenation, but variant concatenations (future code paths using `MAIN_URL + from` without the leading slash) will produce genuine cross-origin navigations.
  2. **Absolute URL:** `?redirectTo=https://evil.com/login` — for the patient navigate path this becomes a 404 (react-router can't match it to a route) but for the admin cross-domain path it produces the malformed `https://admin.psychage.comhttps://evil.com/login`, which most browsers reject but some (older Safari, some mobile webviews) follow.
  3. **Path traversal:** no check for `/../` sequences.
  No validation runs anywhere on `from` between it being read from `searchParams` and it being appended to domain bases or passed to `navigate`. The standard phishing pattern works: attacker sends `https://psychage.com/login?redirectTo=https://psychage-support.com/secure`, victim logs in on the real site, is bounced to the attacker's lookalike which asks for 2FA / SSN / insurance info / card details.
- **User/developer impact:** The legitimate `psychage.com` domain becomes a redirect asset for phishing campaigns targeting Psychage users. Even if the direct exploit is marginal today, any future change to the redirect assembly (e.g., a new cross-domain helper, a new auth surface) reintroduces the hole.
- **Why this matters for Psychage specifically:** Mental-health users are high-value targets for healthcare-fraud and pharmaceutical-scam campaigns (pill mills, fake therapists, "recovery retreat" scams). An open-redirect on the legitimate domain is exactly the asset such campaigns need — the redirect chains from a trusted sender.
- **Cross-references:** AUTH-003 (callback error also navigates with user-influenceable state), AUTH-024 (URL cleanup already nearby).
- **Recommendation:** Validate `from` at the point of read. Introduce a `safeRedirectPath(raw: string | null): string` helper that accepts only strings that (a) begin with `/` and not `//`, (b) contain no `:` before the first `/`, (c) resolve to a whitelisted prefix (`/dashboard`, `/portal`, `/tools`, `/learn`, `/providers`, `/clarity-score`, `/onboarding`, `/account`, `/crisis`), (d) contain no `..` sequences. Return `/dashboard` (or role-appropriate default) for anything else. Route every read of `from` through this helper. Do the same validation inside `adminUrl`/`mainUrl` so even future callers can't bypass it. Do not echo invalid values in error messages.

### AUTH-031 Login error mapping signals intent to leak email existence
- **Severity:** MEDIUM
- **Category:** security
- **Surface(s):** U/A
- **Evidence:** [src/pages/auth/LoginPage.tsx:181-182](../../src/pages/auth/LoginPage.tsx#L181-L182) — `else if (lowerError.includes('not found') || lowerError.includes('no user') || lowerError.includes('does not exist')) { setError('No account found with this email. Would you like to sign up?'); }`
- **What's wrong:** Supabase v2.90 returns "Invalid login credentials" for both wrong-password and non-existent-email, so this branch does not fire today — but the code is *prepared to leak*. Any future change to Supabase's error strings (they have changed between versions), a custom gotrue build, or a server-side error path that does say "no user" causes the client to start disclosing whether an email is registered. Additionally, [src/pages/auth/SignUpPage.tsx](../../src/pages/auth/SignUpPage.tsx) shows raw Supabase errors on signup — "User already registered" is standard-but-still-a-leak. Reset path ([ResetPasswordPage.tsx:30](../../src/pages/auth/ResetPasswordPage.tsx#L30)) also surfaces raw error.
- **User/developer impact:** Email-enumeration is a reconnaissance step for credential-stuffing and targeted phishing. Defense-in-depth fails here — the leak is latent but primed.
- **Why this matters for Psychage specifically:** An attacker enumerating which of a leaked healthcare-database email list has Psychage accounts is building a targeted-phishing list. Users whose mental-health-service membership is outed even as metadata face real-world stigma risks.
- **Cross-references:** AUTH-019 (Supabase error passthrough).
- **Recommendation:** Remove the "no account found" branch from LoginPage. Normalize all login failures to "Incorrect email or password" regardless of underlying cause. Normalize reset-password responses to always say "If an account exists for that email, we've sent reset instructions." Accept signup disclosure as standard (users expect to learn their email is taken) but require CAPTCHA (AUTH-029) before the response.

### AUTH-032 `newsletter_subscribers.email` UNIQUE + email-keyed lookups break for Apple Private Relay rotation
- **Severity:** MEDIUM
- **Category:** data-layer
- **Surface(s):** U
- **Evidence:**
  - [supabase/migrations/20250109000002_create_tools_and_newsletter.sql:79](../../supabase/migrations/20250109000002_create_tools_and_newsletter.sql#L79) — `email VARCHAR(255) NOT NULL UNIQUE` on `newsletter_subscribers`.
  - [src/services/newsletterService.ts:16, 53, 72](../../src/services/newsletterService.ts#L16) — three lookups by email.
  - [src/services/waitlistService.ts:73](../../src/services/waitlistService.ts#L73) — waitlist email lookup.
  - No migration defines `UNIQUE (email)` on profiles or other user-scoped auth tables (confirmed by grep of `supabase/migrations`). Core auth identity correctly keys on `id`/`user_id`.
- **What's wrong:** Apple Sign In with "Hide My Email" generates per-app relay addresses (`xyz@privaterelay.appleid.com`). These are stable per-Supabase-project, but Apple can and does rotate them when the user revokes + re-grants the app. If a user signs up with Apple OAuth (getting relay-A), subscribes to newsletter (relay-A stored as UNIQUE), then later revokes and re-grants (new relay-B), and tries to re-subscribe: the UNIQUE constraint prevents it, and email-keyed lookups find the stale relay-A. The user appears subscribed to a dead address and cannot re-subscribe without manual cleanup.
- **User/developer impact:** Newsletter and waitlist flows break for Apple Private Relay users after a revoke/re-grant cycle — a silent edge case that affects trust with Apple-ecosystem users specifically.
- **Why this matters for Psychage specifically:** Apple users are a meaningful share of the mental-health-tech audience (Apple Health integration, Screen Time awareness, etc.). Quiet breakage for this segment signals misalignment with the platform they care about.
- **Cross-references:** AUTH-032 is downstream of not-linking-by-identity (Supabase's `auth.identities` table is the correct linkage surface).
- **Recommendation:** Treat `email` as a contact attribute, not an identifier. Migrate newsletter_subscribers to key on `user_id` (nullable for anonymous signups) with email as a non-unique attribute; dedupe on (user_id, email) instead. For anonymous subscribers (no auth), keep email-UNIQUE but provide an idempotent "re-subscribe replaces the previous record" flow. If multi-provider account linking is on the roadmap, design it around `auth.identities`, not email matching.

### AUTH-033 Admin audit log has partial coverage; V1 admin surfaces do not call `logAdminAction`
- **Severity:** MEDIUM
- **Category:** security, compliance
- **Surface(s):** A
- **Evidence:**
  - Good: [src/lib/admin/auditLogger.ts:12-29](../../src/lib/admin/auditLogger.ts#L12-L29) — `logAdminAction` helper exists and writes to `admin_audit_log`.
  - Good: [supabase/migrations/20260310000001_admin_panel_foundation.sql:57-66](../../supabase/migrations/20260310000001_admin_panel_foundation.sql#L57-L66) — `admin_audit_log` has SELECT + INSERT policies for admins, and **no UPDATE or DELETE policies** — implicit RLS deny on both, so even admins cannot modify or delete log entries. Tamper-resistant at the RLS layer. ✅
  - Gap: [.audit/PROVIDER_DIRECTORY_ISSUES_SUPPLEMENTARY.md:451](../../.audit/PROVIDER_DIRECTORY_ISSUES_SUPPLEMENTARY.md#L451) — internal note confirms "V1 admin pages perform provider status changes (approve, reject, suspend) and save verification notes, but none of these mutations call `logAdminAction()`."
  - Gap: no database trigger on `admin_roles` writes, so role grants/revokes are only audited if the grant path explicitly calls `logAdminAction`. Seed scripts at [scripts/create-demo-admin.ts:103-105](../../scripts/create-demo-admin.ts#L103-L105) and [scripts/seed-admin.mjs:51-59](../../scripts/seed-admin.mjs#L51-L59) run with service role and bypass RLS — they do not log.
  - Gap: no trigger on `platform_settings` writes.
- **What's wrong:** The *infrastructure* is in place and correctly locked down, but coverage is patchy. When an incident occurs ("who deleted this article", "who downgraded this provider"), the audit log will have entries for the V2 code paths and gaps where V1 paths and service-role-seeded role grants occurred.
- **User/developer impact:** Incident response is harder than it should be. Compliance posture ("we audit everything admins do") is not backed by evidence in every case.
- **Why this matters for Psychage specifically:** Admin accountability is a compliance pillar for health-adjacent data platforms. Audit-log gaps become material during security reviews, insurance underwriting, and any formal compliance attestation.
- **Cross-references:** AUTH-001 (escalation path would slip through audit entirely because it operates via `user_metadata` not `admin_roles`), AUTH-006.
- **Recommendation:** Move audit to database triggers so the coverage question becomes moot. Add triggers on `admin_roles` (all mutations), `platform_settings` (all mutations), `articles` (status changes + delete), `providers` (status changes: `seeded|claimed|submitted|verified|active|suspended|rejected`), and `admin_audit_log` itself must remain no-UPDATE/DELETE. Triggers log actor via `auth.uid()` (or `'system-service-role'` when invoked outside an auth context). Retire the application-layer `logAdminAction` helper after the triggers are confirmed writing correctly.

### AUTH-034 No client-side account lockout; no suspicious-activity email
- **Severity:** MEDIUM
- **Category:** security, ux
- **Surface(s):** U/A/P
- **Evidence:**
  - No lockout state in [LoginPage.tsx](../../src/pages/auth/LoginPage.tsx) — the only gating is `isSubmitting`/`isLoading`, which re-enables immediately on error.
  - [AuthContext.tsx:77-107](../../src/context/AuthContext.tsx#L77-L107) — no attempt counter, no backoff.
  - No email-send on the failed-login path — no "we noticed repeated failed sign-in attempts on your account" message.
  - Supabase has server-side rate limits (default: 30/hour per IP) but these are dashboard-configured and not visible in code.
- **What's wrong:** A user mistyping their password five times gets the same loose cooldown as the attacker. After 5 failed attempts there is no prompt to reset, no exponential backoff, no email to the legitimate owner about the activity. The server-side Supabase rate limit eventually kicks in, producing a "Too many attempts" message that maps to the LoginPage's generic [line 184](../../src/pages/auth/LoginPage.tsx#L184) handler — by which point a confused legitimate user has probably already given up.
- **User/developer impact:** Two failures conflated: legitimate user in distress mistyping vs attacker credential-stuffing. Neither population gets the right response.
- **Why this matters for Psychage specifically:** Crisis-adjacent users are more likely to mistype (anxiety, tremor, urgency). They also benefit most from a "forgot password?" prompt surfacing when they hit the wall.
- **Cross-references:** AUTH-014 (no retry affordance), AUTH-029 (bot protection handles scripted attacks).
- **Recommendation:** After 3 failed attempts from the same tab against any email, surface "Having trouble? Reset your password" as a prominent CTA on the error alert. After 5 failed attempts, disable the submit button for 30 seconds with a visible countdown and send a one-time suspicious-activity email to the target account ("we noticed repeated failed sign-in attempts at <time>, from <approximate location> — if this wasn't you, ..."). This is a UX improvement first and a security feature second; the security value comes from the notification, not the client-side timer (which an attacker bypasses trivially by scripting direct API calls — that's what Supabase server-side rate limits are for).

---

## C. Verified Not-Findings

### NF-01 — `admin_audit_log` UPDATE/DELETE tamper resistance (partial resolution of G-06)
- **Gap investigated:** Can admins modify or delete entries in `admin_audit_log`?
- **Evidence no issue exists:** [supabase/migrations/20260310000001_admin_panel_foundation.sql:57-66](../../supabase/migrations/20260310000001_admin_panel_foundation.sql#L57-L66) defines only `audit_log_read` (SELECT) and `audit_log_insert` (INSERT) policies. RLS is enabled (line 42). PostgreSQL defaults to implicit deny when RLS is enabled and no matching policy exists — so UPDATE and DELETE are rejected for all non-service-role roles. No subsequent migration adds UPDATE or DELETE policies (grep of `admin_audit_log` across all migrations returns only the foundation migration and references from `src/lib/admin/auditLogger.ts` + two admin UI pages, all SELECT/INSERT only).
- **Confidence:** High. The append-only guarantee is enforced by the RLS layer; only service-role code (which is outside the client trust boundary) can modify log entries, and that's the standard exception.

### NF-02 — Cross-domain base URLs are env-derived, not user-influenced (partial resolution of G-08)
- **Gap investigated:** Can user input influence the **host** portion of a cross-domain redirect?
- **Evidence no issue exists:** [src/lib/urls.ts:9-10](../../src/lib/urls.ts#L9-L10) — `MAIN_URL` and `ADMIN_URL` come from `import.meta.env.VITE_MAIN_URL` / `VITE_ADMIN_URL` with `window.location.origin` fallback. Build-time only; no runtime user input alters them. [src/components/auth/RoleGuard.tsx:37, 43, 51, 59](../../src/components/auth/RoleGuard.tsx#L37) — all `adminUrl(...)` / `mainUrl(...)` calls in the role-guard pass hardcoded paths (`'/dashboard'`, `'/provider'`, `'/'`), never user input.
- **Confidence:** High *for the host portion*. The **path portion** however *can* be user-influenced via `LoginPage.tsx:131` — see [AUTH-030](#auth-030-open-redirect-via-redirectto-parameter-and-cross-domain-base-url-concatenation), which is the real finding in this area. G-08 is therefore split: host is safe (NF-02), path is not (AUTH-030).

### NF-03 — Reset-email flood (G-09) already covered by AUTH-025
- **Gap investigated:** Can an attacker flood a victim's inbox via repeated password-reset triggers?
- **Evidence:** [AUTH-025 (No client-side rate limiting on "forgot password" or OAuth buttons)](auth-audit-2026-04-23.md#auth-025-no-client-side-rate-limiting-on-forgot-password-or-oauth-buttons) in the original audit covers the UI-loop case at LOW severity. AUTH-029 in this addendum covers the scripted-attack case at HIGH severity. Together they fully enclose G-09; no new finding needed.
- **Confidence:** High.

---

## D. Updated Dashboard / Config Checklist (additions to original §D)

### D.5 Bot protection
- [ ] **CAPTCHA provider selected** (recommended: Cloudflare Turnstile) and configured in Supabase Auth settings → `Captcha Protection`
- [ ] Turnstile site key propagated to frontend env (`VITE_TURNSTILE_SITE_KEY`); secret key stored only in Supabase dashboard
- [ ] CAPTCHA enabled on `signUp` and `resetPasswordForEmail`; left off login (see AUTH-029 recommendation rationale)

### D.6 Notification emails (beyond transactional auth)
- [ ] Password-change notification template authored (subject, body with timestamp + IP + recover-link, Psychage branding, person-first tone)
- [ ] Suspicious-activity notification template authored (failed-login threshold)
- [ ] Email-change request template (already supported by Supabase, needs branding)
- [ ] Sender domain has **BIMI** record (optional but raises trust signal; inbox clients show the logo next to the sender)

### D.7 Audit and retention
- [ ] `admin_audit_log` retention policy set (legal hold vs compliance minimum) — decide and document
- [ ] Monthly review cadence for audit log — who reviews, what questions, recorded where
- [ ] Supabase point-in-time-recovery enabled (Pro+) to guarantee audit-log durability at the storage layer

### D.8 Rate limits (reference — not code)
- [ ] Supabase Auth rate-limit values reviewed for prod: sign-in (default 30/hour/IP), OTP, password reset. Tighten if legitimate rate is lower; Psychage's expected traffic profile should tolerate defaults comfortably.
- [ ] Per-user rate limit (Pro+ feature) considered for password reset specifically — cap at 3/hour per target email.

---

## E. Updated Manual Verification (additions to original §E)

- **M-16: Open-redirect smoke test (host).** Log out. Visit `/login?redirectTo=https://example.com/harvest`. Log in. Confirm you do NOT land on example.com. Confirm you land on `/dashboard`.
- **M-17: Open-redirect smoke test (protocol-relative).** Log out. Visit `/login?redirectTo=//example.com/harvest`. Confirm same.
- **M-18: Open-redirect smoke test (admin cross-domain).** Log out. On `admin.psychage.com/login?redirectTo=https://evil.com`. Log in as admin. Confirm cross-domain URL is built correctly and does not redirect to evil.com.
- **M-19: Email enumeration — login.** Attempt login with `nobody-fake-xyz@example.com` / any password. Confirm the error is identical to an attempt with an existing email + wrong password.
- **M-20: Email enumeration — reset.** Trigger password reset for `nobody-fake-xyz@example.com`. Confirm the success UI is identical to an attempt with an existing email.
- **M-21: Password-change notification.** In dev, change password via AccountSettings. Confirm the registered email receives a notification within 60 seconds.
- **M-22: Private Relay subscription.** Sign up with Apple using Hide My Email. Subscribe to newsletter. Revoke the Apple grant in iCloud settings; re-grant. Try to re-subscribe newsletter. Confirm UX is graceful, not a UNIQUE-constraint error.
- **M-23: Bot abuse — signup.** Script 20 signups to random addresses at `sink@example.com`. Confirm CAPTCHA blocks them (once AUTH-029 is implemented).
- **M-24: Audit coverage — V1 admin surface.** Approve a provider from the V1 admin page. Check `admin_audit_log` for a corresponding row. If missing, confirms AUTH-033.
- **M-25: Failed-login threshold email.** Attempt 6 wrong passwords against a known account. Confirm the account owner receives the suspicious-activity email (once AUTH-034 is implemented).

---

## F. Updated Open Questions (additions to original §F)

- **Q-09:** Invisible (Turnstile) or interactive (hCaptcha) CAPTCHA? Turnstile is less friction; hCaptcha has stronger track record but visible challenges hurt signup funnel. Mental-health-platform lens favors invisible.
- **Q-10:** Should password-change notification emails include approximate geolocation (IP → city)? Useful for "this wasn't me" detection, but GDPR-sensitive and may surface partner-surveillance concerns in the domestic-violence-adjacent user population. Product decision.
- **Q-11:** Should audit retention be indefinite or age out (e.g., 7 years per HIPAA-analog retention)? Tied to legal-hold and compliance frameworks the platform commits to.
- **Q-12:** For Apple Private Relay users specifically, should the app surface "your Apple relay address may change" as onboarding copy? Or should the data model hide the issue entirely (preferred)?
- **Q-13:** `scripts/seed-admin.mjs` creates a user with `user_metadata.role='admin'` **without** seeding `admin_roles`. Is this intentional for local-dev simplicity, or should it be fixed to match `create-demo-admin.ts`? See I.2 below.

---

## G. Positive Observations (addendum)

- **`admin_audit_log` is append-only at the RLS layer** — only SELECT + INSERT policies defined, implicit-deny on UPDATE/DELETE. Tamper-resistance is structural, not convention-based. ([20260310000001_admin_panel_foundation.sql:57-66](../../supabase/migrations/20260310000001_admin_panel_foundation.sql#L57-L66))
- **`logAdminAction` helper exists and is typed.** The surface for adding audit coverage to V1 pages is a single import + one call per mutation — not a rewrite. ([src/lib/admin/auditLogger.ts](../../src/lib/admin/auditLogger.ts))
- **Service-role seed scripts confirm the correct identity pattern.** [scripts/create-demo-admin.ts:103-105](../../scripts/create-demo-admin.ts#L103-L105) writes to `admin_roles` via the service role, which is the correct pattern — even if it also writes `user_metadata.role` (the part AUTH-001 wants to remove).
- **Cross-domain host separation is real.** `VITE_MAIN_URL` and `VITE_ADMIN_URL` derive from environment, never runtime user input. NF-02 verified.
- **`email_confirm: true` in seed scripts** ([create-demo-admin.ts:51](../../scripts/create-demo-admin.ts#L51), [seed-admin.mjs:54](../../scripts/seed-admin.mjs#L54)) — demo flow correctly bypasses email verification for local dev rather than exposing an email-unverified login path.
- **Admin-roles role enum is consistent across DB + code.** The April 21 migration [20260421000002_rename_editor_to_clinical_admin.sql](../../supabase/migrations/20260421000002_rename_editor_to_clinical_admin.sql) resolved the enum mismatch between `editor` (DB) and `clinical_admin` (TS) — suggests good hygiene about role-related schema drift.

---

## H. Pre-Fix Investigations

### H.1 — RLS recursion analysis (Investigation I-01)

#### The recursion pattern (two variants)

**Variant 1 — table self-reference on `admin_roles`:**

```
admin_roles RLS policy "admin_roles_read"
  USING (EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid()))
                                        ^
                                        This is the same table. When PostgreSQL
                                        evaluates whether the current row passes
                                        the policy, it runs the subquery, which
                                        *itself* is subject to admin_roles RLS,
                                        which runs the subquery again, ad infinitum.
```

Evidence: [supabase/migrations/20260310000001_admin_panel_foundation.sql:46-54](../../supabase/migrations/20260310000001_admin_panel_foundation.sql#L46-L54) is the original offender. The fix at [20260315100001_fix_admin_rls_recursion.sql:14-23](../../supabase/migrations/20260315100001_fix_admin_rls_recursion.sql#L14-L23) replaces the self-referential subquery with a JWT claim read — zero table queries, zero recursion. PostgreSQL error code at the crash site: `42P17` ("infinite recursion detected in policy for relation 'users'").

**Variant 2 — cross-table chain involving `auth.users`:**

```
articles RLS policy "Admin read articles"
  USING (public.is_admin())                       -- [20260316000003:43-44]
         ^
         is_admin() runs: EXISTS (SELECT 1 FROM admin_roles WHERE user_id = auth.uid())
                                                      ^
                                                      admin_roles has its own RLS which
                                                      (at the offending period) also
                                                      queried admin_roles. Plus the
                                                      FK auth.users(id) ON DELETE CASCADE
                                                      brings auth.users RLS into the chain:
                                                      users RLS → checks admin_roles → checks users → ...
```

Evidence: explicit comment at [20260316000006_jwt_only_article_rls.sql:4-7](../../supabase/migrations/20260316000006_jwt_only_article_rls.sql#L4-L7) — "article policy → admin_roles subquery → admin_roles RLS → users table RLS → recurses back." This is why 20260316000007 gave up on table-backed admin checks entirely and set `USING (true)` for any authenticated user.

#### Migration timeline

| # | Migration | Outcome |
|---|---|---|
| 1 | [20260310000001](../../supabase/migrations/20260310000001_admin_panel_foundation.sql) | Creates self-referential policy — triggers Variant 1 |
| 2 | [20260315100001](../../supabase/migrations/20260315100001_fix_admin_rls_recursion.sql) | First fix: JWT claim read on `admin_roles` policies. Variant 1 resolved. |
| 3 | [20260316000003](../../supabase/migrations/20260316000003_fix_article_admin_rls.sql) | Creates `is_admin()` with JWT OR table subquery — introduces Variant 2 potential |
| 4 | [20260316000004](../../supabase/migrations/20260316000004_postgrest_reload_and_rls.sql) | Adds direct JWT policies to articles as belt-and-suspenders |
| 5 | [20260316000006](../../supabase/migrations/20260316000006_jwt_only_article_rls.sql) | JWT-only article RLS — explicit "zero table queries" approach |
| 6 | [20260316000007](../../supabase/migrations/20260316000007_auth_user_article_rls.sql) | Abandons admin check entirely; `USING (true)` for any authenticated user |
| 7 | [20260325000003](../../supabase/migrations/20260325000003_create_admin_roles.sql) | Recreates `admin_roles` with "Super admins can manage roles" policy — reintroduces Variant 1 |
| 8 | [20260330000001](../../supabase/migrations/20260330000001_fix_admin_roles_rls_recursion.sql) | Re-fixes Variant 1 again with JWT fallback (current state) |

#### What the hotfix must rewrite

The policies to rewrite when fixing [AUTH-002](auth-audit-2026-04-23.md#auth-002-any-authenticated-user-can-writedelete-all-articles) without resurrecting either recursion variant:

- On `articles`, `article_citations`, `article_comments`, `article_images`, `article_status_history`: replace the `USING (true)` INSERT/UPDATE/DELETE policies from [20260316000007:31-38](../../supabase/migrations/20260316000007_auth_user_article_rls.sql#L31-L38) with admin-gated policies.
- On `admin_roles`: keep the JWT-claim-based SELECT policy ([20260330000001:17-21](../../supabase/migrations/20260330000001_fix_admin_roles_rls_recursion.sql#L17-L21)) but, per AUTH-001's fix, move the claim source from `user_metadata.role` to `app_metadata.role`. Writes remain service-role-only (`USING (false)` for normal roles).

#### The recursion-safe pattern to use

Two valid approaches, either safe:

**Pattern A — SECURITY DEFINER function with explicit `search_path`:**

```sql
CREATE OR REPLACE FUNCTION public.is_admin_writer()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER          -- runs as function owner, bypassing RLS on queried tables
SET search_path = ''      -- critical: prevents search-path injection
STABLE                    -- cacheable within a statement
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_roles ar
    WHERE ar.user_id = auth.uid()
      AND ar.role IN ('super_admin', 'clinical_admin')
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin_writer() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin_writer() TO authenticated;
```

Because the function runs as SECURITY DEFINER, the `SELECT FROM admin_roles` inside it bypasses `admin_roles` RLS — breaking the recursion chain. The `SET search_path = ''` guard prevents an attacker from shadowing `public.admin_roles` with a malicious table on a user-controlled schema. This is the standard Supabase-documented pattern for "check a gated table from within a policy."

**Pattern B — JWT `app_metadata` claim (no table query at all):**

```sql
CREATE POLICY "Admin write articles" ON public.articles
  FOR ALL USING (
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
  );
```

Zero table access → zero recursion. Requires that `app_metadata.role` is authoritative (which is the AUTH-001 fix: move role storage from user-writable `user_metadata` to server-only `app_metadata`).

**Recommendation for the hotfix:** use Pattern A. It keeps `admin_roles` as the single source of truth and remains correct if JWT claim handling changes. Pattern B is simpler but couples article-write authority to JWT propagation timing — after a role revocation, the old JWT still grants access until refresh (up to 1 hour). Pattern A reflects the current `admin_roles` state immediately.

### H.2 — Admin-role data migration scope (Investigation I-02)

#### Sources where admin role is stored today

| Source | Where written | Where read |
|---|---|---|
| `auth.users.raw_user_meta_data.role` ("user_metadata") | [scripts/seed-admin.mjs:55-58](../../scripts/seed-admin.mjs#L55-L58), [scripts/create-demo-admin.ts:52](../../scripts/create-demo-admin.ts#L52), [src/services/userProfileService.ts:101](../../src/services/userProfileService.ts#L101) (AUTH-001), [supabase/functions/claim-provider/index.ts:185](../../supabase/functions/claim-provider/index.ts#L185) (sets `provider`, not `admin` — still a write-site) | [src/context/AuthContext.tsx:13](../../src/context/AuthContext.tsx#L13), `is_admin()` JWT fallback, `handle_new_user()` trigger |
| `profiles.role` | [supabase/migrations/20250109000000_create_profiles.sql:117-118](../../supabase/migrations/20250109000000_create_profiles.sql#L117) via `handle_new_user()` | [src/services/userProfileService.ts:60](../../src/services/userProfileService.ts#L60) |
| `admin_roles.role` | [scripts/create-demo-admin.ts:103-105](../../scripts/create-demo-admin.ts#L103-L105), bulk INSERTs in [20260316000003:97-101](../../supabase/migrations/20260316000003_fix_article_admin_rls.sql#L97-L101) and [20260316000004:34-39](../../supabase/migrations/20260316000004_postgrest_reload_and_rls.sql#L34-L39) | `is_admin()` table branch, `useAdminAuth`, any policy using `EXISTS (SELECT 1 FROM admin_roles ...)` |
| `app_metadata.role` | **nowhere** (target destination — currently empty) | would become the trusted source post-fix |

#### The three states a current admin may be in

| State | `admin_roles` | `user_metadata.role='admin'` | `profiles.role='admin'` | How they got here | Migration action |
|---|---|---|---|---|---|
| **A** | ✅ | ❌ | ❌ | Manually `INSERT INTO admin_roles` via service role | None — already correct. Double-check `app_metadata.role` gets populated so JWT-based paths (if any kept) work. |
| **B** | ❌ | ✅ | ✅ | `seed-admin.mjs` path OR escalation via AUTH-001 | **Critical to migrate.** Decide per user: promote to admin_roles (set `super_admin`/`clinical_admin`/`viewer`) OR strip (demote to patient). Strip `user_metadata.role`. Reconcile `profiles.role` to 'patient'. |
| **C** | ✅ | ✅ | ✅ | `create-demo-admin.ts` path, or any user who was seeded into `admin_roles` + also got the `user_metadata` flag via `handle_new_user()` | Strip `user_metadata.role` (source of AUTH-001 risk). Reconcile `profiles.role` to 'patient'. Keep `admin_roles` row. |

State B is the danger: a user with `user_metadata.role='admin'` but no `admin_roles` row has *de facto* admin privileges via the JWT-fallback path in `is_admin()`, while being invisible to the `admin_roles`-based revocation flow.

#### Read-only diagnostic query

Before the hotfix writes anything, run this to get exact counts and IDs per state. It only reads; no mutations. Designed to run under the Supabase SQL editor or psql against production.

```sql
-- Requires service-role connection (auth.users is protected).
WITH
  metadata_admins AS (
    SELECT id AS user_id, email
    FROM auth.users
    WHERE raw_user_meta_data ->> 'role' = 'admin'
  ),
  profile_admins AS (
    SELECT id AS user_id
    FROM public.profiles
    WHERE role = 'admin'
  ),
  role_table_admins AS (
    SELECT user_id, role AS granular_role
    FROM public.admin_roles
  )
SELECT
  CASE
    WHEN ra.user_id IS NOT NULL AND ma.user_id IS NULL AND pa.user_id IS NULL
      THEN 'A — admin_roles only (clean)'
    WHEN ra.user_id IS NULL AND ma.user_id IS NOT NULL
      THEN 'B — user_metadata only (ESCALATION RISK)'
    WHEN ra.user_id IS NOT NULL AND ma.user_id IS NOT NULL
      THEN 'C — both (strip user_metadata, keep admin_roles)'
    ELSE 'D — other (investigate)'
  END AS state,
  COALESCE(ra.user_id, ma.user_id, pa.user_id) AS user_id,
  ma.email,
  ra.granular_role,
  (ma.user_id IS NOT NULL) AS has_user_metadata,
  (pa.user_id IS NOT NULL) AS has_profile_role,
  (ra.user_id IS NOT NULL) AS has_admin_roles_row
FROM role_table_admins ra
FULL OUTER JOIN metadata_admins ma USING (user_id)
FULL OUTER JOIN profile_admins pa USING (user_id)
ORDER BY state, email;

-- Summary count per state
SELECT
  CASE
    WHEN ra.user_id IS NOT NULL AND ma.user_id IS NULL
      THEN 'A'
    WHEN ra.user_id IS NULL AND ma.user_id IS NOT NULL
      THEN 'B'
    WHEN ra.user_id IS NOT NULL AND ma.user_id IS NOT NULL
      THEN 'C'
    ELSE 'D'
  END AS state,
  COUNT(*) AS user_count
FROM (
  SELECT id AS user_id FROM auth.users WHERE raw_user_meta_data ->> 'role' = 'admin'
) ma
FULL OUTER JOIN public.admin_roles ra USING (user_id)
GROUP BY 1
ORDER BY 1;
```

#### Migration plan narrative (for the hotfix prompt)

The hotfix script will follow this order. No writes happen in this audit pass — this is scoping.

1. **Snapshot.** `SELECT` full detail of every State B and State C user into a migration-log table (`security_hotfix_2026_04_28_admin_snapshot`). Include their `user_metadata`, `app_metadata`, `profiles.role`, and any `admin_roles` row, so the change is reversible.
2. **Resolve State B.** Per user, a human decides: promote-to-admin-roles (if legitimate admin) or demote (if escalation). For each decision:
   - Promote: `INSERT INTO admin_roles (user_id, role) VALUES (...)` using the appropriate granular role.
   - Demote: no writes to admin_roles; `auth.admin.updateUserById(user_id, { user_metadata: { role: null } })` via service role to strip the stale claim.
   - In both cases: send a notification email to the affected user (especially important for demotes — "your admin access was reconciled; if you think this was a mistake, contact support").
3. **Copy admin authority to `app_metadata` for State A + State C users.** For every user in `admin_roles`: `auth.admin.updateUserById(user_id, { app_metadata: { role: 'admin' } })`. Do this **before** step 4 so the downtime window (if any RLS is temporarily JWT-gated) is covered.
4. **Strip `user_metadata.role` for all remaining users with the key set.** This is the AUTH-001 fix. `UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data - 'role' WHERE raw_user_meta_data ? 'role'` — run via service role SQL. Runs after step 3 so no admin loses JWT-based access in between.
5. **Deploy the RLS migration** (AUTH-002 fix): replace `USING (true)` article policies with Pattern A (`is_admin_writer()` as SECURITY DEFINER).
6. **Deploy the database trigger** that blocks any future writes to `user_metadata.role`. Trigger on `auth.users` BEFORE UPDATE: if `NEW.raw_user_meta_data ->> 'role' IS DISTINCT FROM OLD.raw_user_meta_data ->> 'role'`, strip it back to OLD. Or fail the update. Fail-open is softer; fail-closed is more secure.
7. **Remove `updates.role` handling** from [userProfileService.ts:101](../../src/services/userProfileService.ts#L101).
8. **Fix `scripts/seed-admin.mjs`** to match `create-demo-admin.ts` — write to `admin_roles`, not `user_metadata`.

The migration script itself is out of scope for this pass. This plan gives the reviewer what they need to decide: (a) is there a human-in-the-loop step to resolve State B, or should the script auto-demote everyone not in admin_roles? (b) fail-open vs fail-closed on the user_metadata trigger.

---

## I. Methodology Notes (addendum)

**Searches executed in this pass:** `hcaptcha|turnstile|recaptcha|captchaToken|captcha`; `Resend|Postmark|SendGrid|send_email|notification_email`; `\.eq\('email'`; `UNIQUE.*email`; `admin_audit_log`; `raw_user_meta_data|user_metadata.*role|app_metadata.*role`. Read every RLS migration relevant to admin_roles and article RLS; read both admin-seeding scripts; read UpdatePasswordPage, AuthCallback, LoginPage, ResetPasswordPage, urls.ts, auditLogger.ts in full.

**What I could determine:** every finding AUTH-028 through AUTH-034 with file:line evidence. Full recursion pattern and migration timeline with exact SQL excerpts. State-A/B/C population structure (via code/migration analysis — actual per-state counts need the diagnostic query against prod DB).

**What I could NOT determine without runtime access:**
- Actual counts in State A vs B vs C (requires running H.2's diagnostic query against production).
- Whether Supabase's CAPTCHA provider slot is configured at all (dashboard-only).
- Whether the V1 admin pages referenced by `.audit/PROVIDER_DIRECTORY_ISSUES_SUPPLEMENTARY.md:451` still exist on the current branch, or have been retired in V2 (the surrounding migration commits suggest V2 is the live path but V1 may remain reachable in code — needs verification).
- Supabase's current error-string behavior for non-existent email on login (AUTH-031 claims "Invalid login credentials" is the response today; needs runtime confirmation because Supabase has changed it between versions).

**Surprises:**
- `admin_audit_log` is structurally append-only via RLS — positive unexpected finding (NF-01).
- `scripts/seed-admin.mjs` does **not** write to `admin_roles`, only to `user_metadata`. This is a State B-producer every time a dev runs it. Worth a note in Q-13.
- The RLS recursion had a multi-year back-and-forth: five distinct fix attempts (20260315100001 → 20260316000003 → 000004 → 000006 → 000007 → 20260330000001). The final landing spot (`USING (true)` + JWT fallback) is the opposite of tightening — it *unlocks* rather than *solves*. The hotfix needs to land the tightening that the earlier churn kept bouncing off of.
- The demo credentials in [LoginPage.tsx:239-257](../../src/pages/auth/LoginPage.tsx#L239-L257) are visible dev-only (gated by `import.meta.env.DEV`), but the password `PsychageAdmin2026!` is hardcoded in both the UI and [create-demo-admin.ts:41](../../scripts/create-demo-admin.ts#L41). Not a finding (dev-only gate holds), but worth noting the shared-secret convention.
