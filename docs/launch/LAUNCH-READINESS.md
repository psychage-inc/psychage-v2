# Psychage Launch Readiness

**Last updated:** 2026-04-29
**Branch at scaffold time:** `launch/cross-cutting-readiness`
**Base:** `main` at `8028c80` (post user-site readiness `6570ce0` + admin readiness `6ee0e4f`)
**Audience:** the operator (you) on launch day

This document is your go/no-go checklist. Every item is either:

- 🟢 **READY** — confirmed in code or by inspection
- 🟡 **WAITING** — depends on an external action (translator, DNS propagation, dashboard config, etc.)
- 🔴 **BLOCKING** — must be resolved before launch

When all items are 🟢, you are ready to launch. Yellow items each have an explicit dependency. Red items each have an explicit fix.

This document is the consolidated cross-cutting view. It rolls up the operator-handled / dashboard / external-action items from all five prior workstream summary docs (3 auth + 2 launch) and adds cross-cutting concerns that exist outside the codebase entirely.

---

## §1. Operational Items (Dashboard, DNS, Deploy)

This section is consolidated from prior workstream summary docs (3 auth + 2 launch). Each item names its source. Order is rough dependency order: dashboard secrets → DNS/email → deploy → edge functions → migrations → translation.

### 1.1 Supabase Dashboard

- [ ] **Cloudflare Turnstile site key + secret configured**
  - Source: [auth-hotfix-followup-dashboard.md §3](../audits/auth-hotfix-followup-dashboard.md)
  - Status: 🟡 WAITING
  - What: Create Turnstile site (psychage.com, admin.psychage.com, *.vercel.app); set `VITE_TURNSTILE_SITE_KEY` + Supabase Auth secret
  - Why: Without this, signup AUTH-029 abuse-prevention fails to fire and signup may break
  - Verification: open `/signup` in production, complete challenge, observe Turnstile token submitted; check Supabase Auth captcha logs
  - Owner: operator

- [ ] **SMTP provider switched from Supabase default to production provider (Resend / Postmark / SendGrid)**
  - Source: [user-site-blockers-remaining.md OP-006](user-site-blockers-remaining.md), [auth-ux-i18n-followup-dashboard.md §2](../refactors/auth-ux-i18n-followup-dashboard.md)
  - Status: 🟡 WAITING
  - What: Configure Auth → SMTP Settings with production credentials; default sender (e.g., `auth@psychage.com`)
  - Why: Default Supabase SMTP is rate-capped + lands in spam; transactional auth email is a security boundary
  - Verification: trigger password reset → confirm Resend/Postmark dashboard shows delivery
  - Owner: operator

- [ ] **Supabase Site URL set to `https://psychage.com`**
  - Source: [auth-data-layer-followup-dashboard.md](../refactors/auth-data-layer-followup-dashboard.md)
  - Status: 🟡 WAITING
  - What: Auth → URL Configuration → Site URL
  - Why: Magic links, email confirmation, OAuth callback all derive from Site URL; wrong URL = broken links in production email
  - Verification: trigger email confirm; click link → redirects to `psychage.com/auth/callback`
  - Owner: operator

- [ ] **Additional Redirect URLs include all preview + production hosts**
  - Source: [auth-data-layer-followup-dashboard.md](../refactors/auth-data-layer-followup-dashboard.md), [user-site-blockers-remaining.md](user-site-blockers-remaining.md)
  - Status: 🟡 WAITING
  - What: Allowlist `https://psychage.com/**`, `https://admin.psychage.com/**`, `https://*.vercel.app/**`
  - Why: OAuth + magic-link flows fail with "redirect not allowlisted" otherwise; preview deploys silently break
  - Verification: trigger Google OAuth from a preview deploy → callback succeeds
  - Owner: operator

- [ ] **Custom email templates branded for: confirmation, recovery, email-change, magic-link, invite**
  - Source: [auth-ux-i18n-followup-dashboard.md §2](../refactors/auth-ux-i18n-followup-dashboard.md)
  - Status: 🟡 WAITING
  - What: Auth → Email Templates → replace defaults with branded HTML; subject lines reviewed for non-disclosure (AUTH-013)
  - Why: Default Supabase templates leak provider, look like phishing, and break trust pre-launch
  - Verification: trigger each flow; inspect received email for branding + correct copy
  - Owner: operator

- [ ] **HaveIBeenPwned breached-password check enabled**
  - Source: [auth-hotfix-followup-dashboard.md](../audits/auth-hotfix-followup-dashboard.md)
  - Status: 🟡 WAITING
  - What: Auth → Policies → Password → enable "check against HIBP"
  - Why: Mental-health platform; user-account compromise is a high-impact event; HIBP is free
  - Verification: try signing up with `password123` → rejected
  - Owner: operator

- [ ] **Auth rate limits reviewed (sign-in, OTP, reset)**
  - Source: [auth-hotfix-followup-dashboard.md](../audits/auth-hotfix-followup-dashboard.md), [admin-blockers-remaining.md OP-A11](admin-blockers-remaining.md)
  - Status: 🟡 WAITING
  - What: Auth → Rate Limits → confirm sign-in (e.g., 30/hr), OTP (e.g., 5/hr), reset (e.g., 5/hr) — tighter than defaults if defaults are too permissive
  - Why: Credential stuffing protection; admin host is a high-value target
  - Verification: rate-limit a test account; confirm 429 after threshold
  - Owner: operator

- [ ] **Captcha Protection enabled in Auth settings**
  - Source: [auth-ux-i18n-followup-dashboard.md](../refactors/auth-ux-i18n-followup-dashboard.md)
  - Status: 🟡 WAITING
  - What: Auth → Bot and Abuse Protection → enable Cloudflare Turnstile; paste secret key
  - Why: Belt-and-braces with Turnstile site key (1.1 above)
  - Verification: signup attempt without token → rejected by Supabase
  - Owner: operator

- [ ] **JWT TTL configured (admin tighter than user)**
  - Source: [admin-blockers-remaining.md OP-A03](admin-blockers-remaining.md)
  - Status: 🟡 WAITING
  - What: Auth → Sessions → set JWT expiry; admin-only sessions targeted at 30min idle / 8hr absolute (separate Supabase project required for true separation, otherwise enforce via client policy)
  - Why: Admin sessions are high-value; default 1hr is too loose
  - Verification: sign in to admin → idle 31 min → next privileged call returns 401
  - Owner: operator

- [ ] **Admin login Turnstile/CAPTCHA**
  - Source: [admin-blockers-remaining.md OP-A11](admin-blockers-remaining.md)
  - Status: 🟡 WAITING
  - What: Confirm Turnstile fires on admin variant of LoginPage (or add explicitly)
  - Why: Admin login is credential-stuffing target; user signup already protected
  - Verification: open `admin.psychage.com/login`; confirm Turnstile widget rendered
  - Owner: operator

### 1.2 Domain & DNS (psychage.com + admin.psychage.com)

- [ ] **SPF record on sending domain**
  - Source: [user-site-blockers-remaining.md OP-006](user-site-blockers-remaining.md)
  - Status: 🟡 WAITING
  - What: TXT `psychage.com` includes `v=spf1 include:<your-mail-provider> ~all`
  - Verification: `dig TXT psychage.com +short | grep spf1`
  - Owner: operator

- [ ] **DKIM record on sending domain**
  - Source: [user-site-blockers-remaining.md OP-006](user-site-blockers-remaining.md)
  - Status: 🟡 WAITING
  - What: DKIM selector record per provider (Resend / Postmark)
  - Verification: provider dashboard "verified" status; mail-tester.com gets ≥9/10
  - Owner: operator

- [ ] **DMARC record (start `p=quarantine`, plan to `p=reject`)**
  - Source: [user-site-blockers-remaining.md OP-006](user-site-blockers-remaining.md)
  - Status: 🟡 WAITING
  - What: TXT `_dmarc.psychage.com` `v=DMARC1; p=quarantine; rua=mailto:dmarc@psychage.com`
  - Verification: `dig TXT _dmarc.psychage.com +short`
  - Owner: operator

- [ ] **TLS certificates valid for `psychage.com` and `admin.psychage.com`**
  - Source: [admin-blockers-remaining.md OP-A01](admin-blockers-remaining.md)
  - Status: 🟡 WAITING
  - What: Vercel-managed certs with valid SAN; HSTS preload-eligible
  - Verification: `curl -sI https://psychage.com/`, `curl -sI https://admin.psychage.com/` — no cert warnings
  - Owner: operator

- [ ] **Apple OAuth domain association file at `/.well-known/apple-developer-domain-association`**
  - Source: cross-cutting; Apple OAuth requirement
  - Status: 🟡 WAITING (only if Apple OAuth enabled)
  - What: file served at exact path; matches Services ID config
  - Verification: `curl https://psychage.com/.well-known/apple-developer-domain-association` returns plaintext content (not 404 / not HTML)
  - Owner: operator

- [ ] **Google OAuth consent screen in "Production" status (not "Testing")**
  - Source: [user-site-blockers-remaining.md OP-008](user-site-blockers-remaining.md)
  - Status: 🟡 WAITING
  - What: Google Cloud Console → OAuth consent screen → Production; branding, privacy URL, ToS URL filled
  - Why: "Testing" mode caps users at 100 and shows scary warning
  - Verification: open Google sign-in flow; confirm no "unverified app" banner
  - Owner: operator

- [ ] **HSTS preload submission (post-launch, after 2 weeks of stable HSTS header)**
  - Source: [user-site-blockers-remaining.md OP-006](user-site-blockers-remaining.md)
  - Status: 🟡 WAITING
  - What: submit at https://hstspreload.org after observing header in production for 2 weeks
  - Owner: operator

### 1.3 Vercel Deploy

- [ ] **Production domain points correctly (psychage.com → user app, admin.psychage.com → admin entry)**
  - Source: existing [vercel.json](../../vercel.json) host-routing
  - Status: 🟡 WAITING
  - Verification: `curl -sI https://admin.psychage.com/ | grep -i x-robots` should reflect admin.html noindex; `curl https://psychage.com/admin/foo` redirects to admin host
  - Owner: operator

- [ ] **Preview-host pattern in Supabase redirect allowlist**
  - Source: [auth-data-layer-followup-dashboard.md](../refactors/auth-data-layer-followup-dashboard.md)
  - Status: 🟡 WAITING (covered also in 1.1 but verified deploy-side here)
  - Owner: operator

- [ ] **Vercel production env vars set (client-side only)**
  - Status: 🟡 WAITING
  - What: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL`, `VITE_SANITY_*`, `VITE_TURNSTILE_SITE_KEY`, `VITE_SENTRY_DSN`, `VITE_GIT_SHA` (auto-populated), feature-flag `VITE_*` keys
  - Why: anon key + Sanity public IDs are safe in client; nothing service-role-scoped
  - Owner: operator
  - **MUST NOT include**: `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `ANTHROPIC_API_KEY`, `OPENAI_API_KEY` — those are server-only (edge functions or `/api/ai/chat.ts`)

- [ ] **Vercel server-side env vars set (for `/api/ai/chat.ts` edge function in vercel.json)**
  - Status: 🟡 WAITING
  - What: `ANTHROPIC_API_KEY` and/or `OPENAI_API_KEY`, `LLM_PROVIDER`
  - Owner: operator

- [ ] **Build command + output directory match Vite config**
  - Status: 🟢 READY (verified locally; Vercel auto-detects via Vite preset)

- [ ] **vercel.json security headers reach production**
  - Source: [user-site-blockers-remaining.md OP-001](user-site-blockers-remaining.md)
  - Status: 🟡 WAITING
  - What: post-deploy curl HEAD on both hosts; verify HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, Content-Security-Policy-Report-Only
  - Owner: operator (curl commands in §2.1)

- [ ] **CSP-Report-Only flipped to enforced `Content-Security-Policy`**
  - Source: [user-site-blockers-remaining.md OP-001](user-site-blockers-remaining.md)
  - Status: 🟡 WAITING
  - What: observe Sentry CSP violation reports for 1–7 days post-deploy; once clean, change `vercel.json` header key
  - Why: enforced-from-day-1 risks blocking legitimate requests; learning mode catches them first
  - Owner: operator

- [ ] **`X-Frame-Options: DENY` host-scoped on admin.psychage.com**
  - Source: [admin-blockers-remaining.md OP-A13](admin-blockers-remaining.md)
  - Status: 🟡 WAITING
  - What: add admin-host-scoped header block to vercel.json (currently global SAMEORIGIN)
  - Why: admin should never be iframed even by same-origin
  - Owner: operator

- [ ] **`VITE_GEMINI_API_KEY` HTTP-referrer restriction in Google Cloud Console**
  - Source: [user-site-blockers-remaining.md OP-019](user-site-blockers-remaining.md)
  - Status: 🟡 WAITING
  - What: Google Cloud Console → Credentials → key → restrict to `psychage.com/*` + preview origins
  - Why: client-bundled key is liftable; referrer restriction prevents quota abuse
  - Owner: operator

### 1.4 Edge Functions

14 functions live under [supabase/functions/](../../supabase/functions/) (excluding `_shared` and a stale macOS-Finder duplicate `password-change-notification 2` flagged in cross-cutting-observations).

For **each** function below, verify:
- [ ] deployed to production: `supabase functions deploy <name> --project-ref <ref>`
- [ ] required env secrets set in Supabase dashboard for that function
- [ ] CORS origins limited to `https://psychage.com` + `https://admin.psychage.com` + preview pattern (no `*` in production)
- [ ] auth posture verified (caller-authenticated where required; unauthenticated only where intentional)

| Function | Auth posture | Required secrets |
|---|---|---|
| `account-deletion` | authenticated; admin-secret for execute path | `SUPABASE_SERVICE_ROLE_KEY`, `ACCOUNT_DELETION_ADMIN_SECRET` |
| `assessment-detail` | authenticated | `SUPABASE_SERVICE_ROLE_KEY` |
| `assessment-history` | authenticated | `SUPABASE_SERVICE_ROLE_KEY` |
| `assessment-share` | authenticated | `SUPABASE_SERVICE_ROLE_KEY` |
| `assessment-shared` | unauthenticated (read-only by share token) | `SUPABASE_SERVICE_ROLE_KEY` |
| `assessment-start` | authenticated | `SUPABASE_SERVICE_ROLE_KEY` |
| `assessment-submit` | authenticated | `SUPABASE_SERVICE_ROLE_KEY` |
| `claim-provider` | authenticated | `SUPABASE_SERVICE_ROLE_KEY` |
| `data-export` | authenticated (user requests own) | `SUPABASE_SERVICE_ROLE_KEY` |
| `health` | unauthenticated; uptime probe | (none) |
| `password-change-notification` | service-role-callable from Supabase trigger; spoof-guarded | `RESEND_API_KEY`, `NOTIFICATION_FROM_EMAIL` |
| `sanity-webhook` | webhook-signature verified | `SANITY_WEBHOOK_SECRET` |
| `suspicious-activity-notification` | unauthenticated (called pre-auth) — rate-limited 1/hr/email | `RESEND_API_KEY`, `NOTIFICATION_FROM_EMAIL`, `SUPABASE_SERVICE_ROLE_KEY` |
| `verify-current-password` | authenticated (caller's session) | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |

Each row needs an explicit operator check pre-launch.

### 1.5 Migrations & Data

- [ ] **All `supabase/migrations/` applied to production in timestamp order**
  - Status: 🟡 WAITING
  - Source: [auth-hotfix-followup-dashboard.md §1](../audits/auth-hotfix-followup-dashboard.md), [auth-data-layer-followup-dashboard.md §1](../refactors/auth-data-layer-followup-dashboard.md), [auth-ux-i18n-followup-dashboard.md §1](../refactors/auth-ux-i18n-followup-dashboard.md)
  - Verification: `supabase db remote diff` empty against production

- [ ] **`scripts/migrate-admin-roles.ts` dry-run reviewed, then executed post-backup**
  - Source: [auth-hotfix-followup-dashboard.md §2](../audits/auth-hotfix-followup-dashboard.md)
  - Status: 🟡 WAITING
  - Why: cuts admin authority over from JWT metadata to server-only `admin_roles` table; cutover required before any admin action post-deploy

- [ ] **`scripts/b7-backfill-provider-roles.ts` dry-run reviewed, then executed if needed**
  - Source: [auth-hotfix-followup-dashboard.md §2.7](../audits/auth-hotfix-followup-dashboard.md)
  - Status: 🟡 WAITING

- [ ] **Diagnostic queries showing zero stranded users / zero orphan roles**
  - Source: [auth-data-layer-followup-dashboard.md §1](../refactors/auth-data-layer-followup-dashboard.md)
  - Status: 🟡 WAITING

- [ ] **Database backup taken pre-launch**
  - Status: 🟡 WAITING
  - Verification: Supabase dashboard → Database → Backups → on-demand backup

- [ ] **Point-in-time recovery enabled (Supabase Pro+)**
  - Status: 🟡 WAITING

### 1.6 Translation

- [ ] **EN strings authored under `auth` namespace and any user-site additions**
  - Source: [auth-ux-i18n-summary.md](../refactors/auth-ux-i18n-summary.md)
  - Status: 🟢 READY (EN authored; verified in [src/locales/en/](../../src/locales/en/))

- [ ] **PT/ES/SV/FR EN-stubs handed to human translator with translation table**
  - Source: [auth-ux-i18n-followup-dashboard.md §3](../refactors/auth-ux-i18n-followup-dashboard.md)
  - Status: 🟡 WAITING

- [ ] **Translated strings ingested into `src/locales/{pt,es,sv,fr}/`**
  - Status: 🟡 WAITING

- [ ] **Locale fallback verified: PT user with incomplete translations sees EN, never key-not-found**
  - Status: 🟡 WAITING
  - Verification: set browser to `pt-BR`; navigate auth flow; no raw keys visible

- [ ] **Decide: ship legal pages translated or accept EN fallback gracefully**
  - Source: [user-site-blockers-remaining.md OP-011](user-site-blockers-remaining.md)
  - Status: 🟡 WAITING

---

## §2. Security Verification (System-Level)

### 2.1 Headers as deployed

- [ ] **vercel.json headers actually serve in production**
  - Status: 🟡 WAITING (post-deploy operator verification)
  - Run from operator shell after staging deploy:

  ```bash
  curl -sI https://psychage.com/ | grep -iE '(strict-transport-security|x-content-type|x-frame|content-security-policy|referrer-policy|permissions-policy|cross-origin-opener)'
  curl -sI https://admin.psychage.com/ | grep -iE '(strict-transport-security|x-content-type|x-frame|content-security-policy|referrer-policy|permissions-policy|cross-origin-opener)'
  ```

  - Expected (both hosts):
    - `strict-transport-security: max-age=63072000; includeSubDomains; preload`
    - `x-content-type-options: nosniff`
    - `x-frame-options: SAMEORIGIN` (admin should be `DENY` once 1.3 host-scoped block is added)
    - `referrer-policy: strict-origin-when-cross-origin`
    - `permissions-policy: camera=(), microphone=(), geolocation=(self), payment=()` (or whatever vercel.json sets)
    - `content-security-policy-report-only: ...` (until enforced; see 1.3 cutover item)
    - `cross-origin-opener-policy: same-origin-allow-popups`
  - Owner: operator

### 2.2 Bundle secrets check

Static check.

```bash
npm run build
grep -rE 'service_role|SERVICE_ROLE|SUPABASE_SERVICE_ROLE_KEY' dist/
grep -rE 'RESEND_API_KEY|ANTHROPIC_API_KEY|OPENAI_API_KEY|SANITY_WEBHOOK_SECRET|ACCOUNT_DELETION_ADMIN_SECRET' dist/
```

- [x] **No service-role / server-secret references in `dist/`**
  - Status: 🟢 READY
  - Verified: 2026-04-29 against `launch/cross-cutting-readiness` build (both greps returned zero matches)
  - Re-run before final deploy: 🟡 (operator should re-grep against the actual production build artifact)

### 2.3 Security scanner results

- [ ] **Mozilla Observatory grade ≥ B+**
  - Status: 🟡 WAITING (post-deploy operator step)
  - Run: https://observatory.mozilla.org/analyze/psychage.com and the same for admin.psychage.com
  - Source: [user-site-blockers-remaining.md OP-009](user-site-blockers-remaining.md), [admin-blockers-remaining.md OP-A07](admin-blockers-remaining.md)

- [ ] **securityheaders.com grade ≥ A-**
  - Status: 🟡 WAITING
  - Run: https://securityheaders.com/?q=psychage.com&followRedirects=on (and admin host)

- [ ] **SSL Labs grade ≥ A**
  - Status: 🟡 WAITING
  - Run: https://www.ssllabs.com/ssltest/analyze.html?d=psychage.com (and admin host)

### 2.4 OAuth provider production posture

- [ ] **Google OAuth: consent screen Production, branding + privacy + ToS URLs filled, scopes minimal**
  - Status: 🟡 WAITING
  - Verification: Google Cloud Console → APIs & Services → OAuth consent screen → Status = "In production"

- [ ] **Apple OAuth: domain verification file served, Services ID matches Supabase config**
  - Status: 🟡 WAITING (only if Apple OAuth enabled)
  - Verification: `curl https://psychage.com/.well-known/apple-developer-domain-association` returns plaintext

- [ ] **Both providers' redirect URIs include `<project>.supabase.co/auth/v1/callback`**
  - Status: 🟡 WAITING

- [ ] **Live OAuth flow test against production URIs**
  - Source: [user-site-blockers-remaining.md OP-008](user-site-blockers-remaining.md)
  - Status: 🟡 WAITING
  - Verification: complete sign-in via Google + Apple; session persists; profile row created; redirect lands on expected post-login route

---

## §3. Legal & Compliance

### 3.1 Required public pages

Content audit confirmed real (not placeholder) for all pages below; lawyer-review flag remains 🟡 until external counsel signs off. See [user-site-findings.md](user-site-findings.md) and [LegalPages.tsx](../../src/components/pages/LegalPages.tsx).

- [ ] **Privacy Policy** at `/legal/privacy` — 🟢 content complete; 🟡 lawyer review (per [user-site-blockers-remaining.md OP-005](user-site-blockers-remaining.md))
  - Covers data collection, storage (Supabase, Sanity), third parties, user rights, contact
  - Health-data clauses must pass HIPAA + WA My Health My Data Act review

- [ ] **Terms of Service** at `/legal/terms` — 🟢 content complete; 🟡 lawyer review
  - Acceptable use, account termination, liability limits, governing law, embedded medical disclaimer

- [ ] **Cookie Policy** in `/legal/privacy#cookies` — 🟢 (linked from banner; see 3.2)

- [ ] **Medical Disclaimer** — 🟢 prominent in Terms section 2 (highlighted callout); footer also references "does not provide medical advice, diagnosis, or treatment"

- [ ] **Crisis Resources** at `/crisis` — 🟢 ([CrisisPage.tsx](../../src/components/pages/CrisisPage.tsx), country geo-detection, 30+ resources, US 988 + international); publicly reachable without auth

- [ ] **Accessibility Statement** at `/legal/accessibility` — 🟢 (WCAG 2.1 AA target, 7 implementation areas, known limitations, contact `accessibility@psychage.com`); 🟡 lawyer / a11y consultant review optional

- [ ] **Contact / Support** at `/contact` — 🟢 ([ContactPage.tsx](../../src/pages/core/ContactPage.tsx)); operator must monitor delivery channel

- [ ] **Lawyer review pass on Privacy + Terms + Accessibility**
  - Source: [user-site-blockers-remaining.md OP-005](user-site-blockers-remaining.md)
  - Status: 🟡 WAITING
  - Why: Health data platform; ADA + EAA + GDPR + CCPA + WA-MHMDA all apply
  - Owner: outside counsel

### 3.2 Cookie & consent

- [ ] **Cookie banner appears on first visit before non-essential cookies fire**
  - Status: 🟢 ([CookieConsent.tsx](../../src/components/ui/CookieConsent.tsx) — 1s show delay, GPC-aware auto-reject of non-essential)

- [ ] **Banner has accept/decline (not just "OK"); decline actually blocks non-essential**
  - Status: 🟢 (3-toggle UI: essential required, analytics + marketing user-toggleable; gated via `consentService.logConsent()`)

- [ ] **Settings persist across sessions (localStorage `psychage_cookie_consent`)** — 🟢

- [ ] **Authenticated users sync consent to profile via `privacyService.updateCookieConsent()`** — 🟢

- [ ] **Consent records auditable (timestamp, choice)** — 🟢 (logged via `consentService`)

### 3.3 Mental-health-platform copy compliance

Sacred Rule. Spot-check 5 prominent pages for: no diagnostic language ("you have anxiety," "diagnosis confirmed"), no medical advice ("take this medication if…"), person-first language, crisis content one tap away.

- [ ] **Homepage `/`** — 🟡 WAITING (operator manual review pre-launch)
- [ ] **`/about`** — 🟡 WAITING
- [ ] **`/tools`** — 🟡 WAITING
- [ ] **`/providers`** — 🟡 WAITING
- [ ] **One sample article reader page** — 🟡 WAITING

Any violation = 🔴 BLOCKING. No diagnostic tooling claims its results are diagnostic; navigator must consistently route to /crisis on safety triggers (already enforced in code per Symptom Navigator memory).

### 3.4 Accessibility statement

- [ ] **Linked from footer** — 🟢 ([Footer.tsx](../../src/components/layout/Footer.tsx) line 174)
- [ ] **States WCAG 2.1 AA target** — 🟢
- [ ] **Provides contact for accessibility issues** — 🟢 (`accessibility@psychage.com`)
- [ ] **Acknowledges known gaps with timeline** — 🟢

### 3.5 GDPR / CCPA basics

- [ ] **Data export available**
  - Status: 🟢 in code ([supabase/functions/data-export/](../../supabase/functions/data-export/)); 🟡 WAITING on production deploy + smoke test
  - Verification: authenticated user requests export; receives JSON bundle within SLA

- [ ] **Account deletion available**
  - Status: 🟢 in code ([supabase/functions/account-deletion/](../../supabase/functions/account-deletion/) — 3-action lifecycle: request → 30-day countdown → execute); 🟡 WAITING on production deploy
  - Verification: request deletion; cancellation works within 30 days; execute hard-deletes after grace period

- [ ] **"Do not sell my data" disclosure for CCPA**
  - Status: 🟡 WAITING (Privacy Policy must explicitly state Psychage does not sell; verify in lawyer-review pass)

- [ ] **GPC honored for non-essential cookies**
  - Status: 🟢 ([CookieConsent.tsx:46](../../src/components/ui/CookieConsent.tsx#L46) auto-rejects non-essential when `navigator.globalPrivacyControl === true`)

---

## §4. Performance Baseline

### 4.1 Lighthouse scores

Targets for hard launch (mobile + desktop, against staging environment):

- Performance: 75+ (90+ ideal)
- Accessibility: 95+ (high bar — a11y is a Sacred Rule for this audience)
- Best Practices: 95+
- SEO: 95+ (user site only; admin excluded since `noindex`)

```bash
# Operator runs after staging deploy
npx lighthouse https://staging.psychage.com/ --view
npx lighthouse https://staging.psychage.com/ --preset=desktop --view
npx lighthouse https://staging.psychage.com/learn/depression-anxiety-mood/managing-your-mental-health-when-loneliness-hits --view
npx lighthouse https://staging.psychage.com/tools/symptom-navigator --view
npx lighthouse https://staging.psychage.com/crisis --view
```

- [ ] Homepage scores recorded — 🟡 WAITING
- [ ] Article reader scores recorded — 🟡 WAITING
- [ ] Symptom Navigator scores recorded — 🟡 WAITING
- [ ] Crisis page scores recorded — 🟡 WAITING

Source: [user-site-blockers-remaining.md OP-010](user-site-blockers-remaining.md) (Lighthouse CI setup is post-launch).

### 4.2 Bundle size budget

Budget: no single chunk > 500KB gzipped; total initial-load < 1.5MB gzipped.

**Local build measured 2026-04-29 against `launch/cross-cutting-readiness`:**

| Chunk | Raw | Gzipped | Budget |
|---|---|---|---|
| `all-articles-*.js` | 35.7 MB | **9.4 MB** | 🔴 **OVER** (18× budget) |
| `main-*.js` | 455 KB | 115 KB | 🟢 |
| `jspdf.es.min-*.js` | 381 KB | 124 KB | 🟢 |
| `generateCategoricalChart-*.js` | 280 KB | 75 KB | 🟢 |
| `globals-*.js` | 263 KB | 83 KB | 🟢 |
| `vendor-editor-*.js` | 244 KB | 75 KB | 🟢 |
| `TiptapEditor-*.js` | 237 KB | 72 KB | 🟢 |
| `html2canvas.esm-*.js` | 197 KB | 46 KB | 🟢 |
| `vendor-supabase-*.js` | 168 KB | 43 KB | 🟢 |
| `index.es-*.js` | 147 KB | 50 KB | 🟢 |

- [ ] **`all-articles-*.js` chunk = 9.4 MB gzipped — 🔴 BLOCKING for hard launch**
  - Source: bundle scan during this sweep
  - Why: lazy-loaded via [`await import('../data/articles/all-articles')`](../../src/services/articleService.ts) — but the import fires on the first article request, dropping a 9.4 MB payload on the user. On 3G this is ≥ 60 seconds; on 4G mobile ≥ 12 seconds; will fail Lighthouse Performance audit and cause article-reader bounce.
  - Fix path (operator decision; out of scope for this sweep — no surface code edits allowed):
    1. Split `src/data/articles/all-articles.ts` per category (16 chunks instead of 1)
    2. Service `articleService.ts` dynamically-imports only the relevant category by article ID prefix (CAT01, CAT02 …)
    3. Each category chunk targets < 1 MB gzipped
  - Logged in [cross-cutting-observations.md](cross-cutting-observations.md) for action

- [x] All other chunks within 500 KB gzipped budget — 🟢
- [x] Total initial-load (main + supabase + globals + vendor-*) ≈ 400 KB gzipped — 🟢 (well under 1.5 MB initial budget)

### 4.3 Slow-network simulation

- [ ] **DevTools throttle "Slow 3G", load homepage → article**
  - Status: 🟡 WAITING (operator manual)
  - Target: usable within 5 seconds on homepage
  - Note: with 4.2 unresolved, article-reader test will fail; do this AFTER chunk split lands

### 4.4 Database query baselines

Walk top-traffic queries; verify no sequential scans on large tables; no queries > 100ms p95.

Queries to `EXPLAIN ANALYZE` against production-scale data:

- [ ] `search_providers_v2` RPC (per Provider Directory memory: 423,404 rows; pg_trgm GIN indexes; 15s statement timeout)
- [ ] Article list with filters (categories + tags)
- [ ] Provider search with city + specialty filter
- [ ] Mood-journal entries by user_id + date range
- [ ] Sleep tracker entries by user_id + week
- [ ] Navigator `condition_symptom_mappings` join (Tier 4-6 conditions; ~448 mappings)

Status: 🟡 WAITING (operator runs against production-snapshot DB)

---

## §5. Monitoring & Observability

### 5.1 Sentry capture

- [x] **`@sentry/react@10.49.0` installed** — 🟢 (`package.json`)

- [x] **`initSentry()` called from user-site entrypoint** — 🟢
  - Verified: [src/index.tsx:3,7](../../src/index.tsx#L3) imports + invokes from [src/lib/sentry.ts](../../src/lib/sentry.ts)
  - DSN read from `VITE_SENTRY_DSN`; no-op when unset or in dev

- [ ] **`initSentry()` NOT called from admin entrypoint** — 🔴 **BLOCKING**
  - Verified gap: [src/admin-index.tsx](../../src/admin-index.tsx) does not import or call `initSentry`. Admin errors are uncaptured.
  - Why launch-impact: marketing-driven launch with zero error visibility on the admin surface is unacceptable. Admin actions are highest-value (provider approvals, article edits, role grants) — silent failures here cause data integrity drift with no signal.
  - Fix: add `import { initSentry } from './lib/sentry';` and `initSentry();` to [src/admin-index.tsx](../../src/admin-index.tsx) before `createRoot`. PHI scrubbing in [src/lib/sentry.ts](../../src/lib/sentry.ts) `beforeSend` already covers admin payloads.
  - Out of scope for this sweep (admin surface settled per prompts 1+2). Operator must wire pre-launch.
  - Logged in [cross-cutting-observations.md](cross-cutting-observations.md)

- [x] **PHI stripping enabled** — 🟢 (`beforeSend` in [src/lib/sentry.ts](../../src/lib/sentry.ts) removes user email, username, query params `q`/`query`/`specialty`, search/message breadcrumbs)

- [x] **`VITE_SENTRY_DSN` documented in `.env.example`** — 🟢 (added in this sweep alongside `VITE_GIT_SHA`)

- [ ] **DSN configured in Vercel production env** — 🟡 WAITING (operator)

- [ ] **Source maps uploaded as part of build (Sentry can resolve stack traces)**
  - Status: 🟡 WAITING
  - Verification: trigger a known error in staging; Sentry issue shows symbolicated stack with file/line, not minified

- [ ] **Sample rate configured** — 🟡 WAITING (currently 1.0 for errors / 0.1 traces; operator confirms appropriate for traffic volume)

### 5.2 Alerts & paging

- [ ] **Sentry alerts configured for: new errors, error rate spikes, performance regressions**
  - Status: 🟡 WAITING (operator dashboard step)
  - Source: [auth-ux-i18n-followup-dashboard.md §4](../refactors/auth-ux-i18n-followup-dashboard.md) (auth_operation tag routing)

- [ ] **Auth telemetry tags routing verified**
  - Status: 🟡 WAITING
  - What: `auth_operation` tag — `user_error` (breadcrumb-only) vs `platform_error` (alert-enabled) routing per AUTH-013 design
  - Verification: synthetic platform_error fires page; user_error does not

- [ ] **Alerts route to a human-monitored channel (Slack / email / PagerDuty)**
  - Status: 🟡 WAITING

- [ ] **On-call rotation defined** — see §6.2

### 5.3 Error budgets

- [x] **Error budgets defined** — 🟢
  - Acceptable error rate: < 0.5% of requests (Sentry "issues per session")
  - Acceptable downtime: 99.9% (≈ 43 min/month allowance)
  - Acceptable performance regression: p95 latency increase > 25% triggers investigation
  - Crisis-content / `/crisis` route: 99.99% target (≤ 4 min/month) — Sacred Rule, must always reach users

### 5.4 Uptime monitoring

- [ ] **External uptime monitor (UptimeRobot / BetterStack / Pingdom) configured**
  - Status: 🟡 WAITING (no SDK installed; operator picks provider)
  - Probes: homepage, `/crisis` (highest priority), `/login`, `admin.psychage.com/login`
  - Frequency: 1–5 minutes
  - Alert: 2 consecutive failures → page on-call

---

## §6. Incident Readiness

### 6.1 Rollback rehearsal

Documented procedure per surface; rehearsal pending operator action.

- [ ] **Frontend deploy rollback (Vercel)**
  - Procedure: Vercel dashboard → Deployments → previous successful → "Promote to Production"
  - Rollback time: < 30 seconds (instant)
  - Pre-launch rehearsal: 🟡 WAITING (operator runs once against staging)

- [ ] **Database migration rollback**
  - Procedure: per-migration rollback SQL exists in trailing `-- ROLLBACK:` comments
  - Verification: 🟡 WAITING — operator must walk last 5 migrations and confirm each has rollback comment AND that comment is exec-safe
  - Risk: data-altering migrations (`migrate-admin-roles.ts`, `b7-backfill-provider-roles.ts`) are not trivially reversible — backup-restore is the real fallback

- [ ] **Edge function rollback**
  - Procedure: redeploy previous git SHA: `git checkout <sha> && supabase functions deploy <name>`
  - Pre-launch rehearsal: 🟡 WAITING

- [ ] **Sentry-monitored rollback dry-run against staging**
  - Status: 🟡 WAITING (combined with rollback rehearsal — push a known-broken commit, observe Sentry alert, rollback, observe alert clear)

### 6.2 On-call & escalation

- [x] **Sole on-call defined** — 🟢 (in this sweep)
  - Primary on-call: **Ryan (operator)** for the first 30 days post-launch
  - Coverage: best-effort 24/7; Sentry alerts route to email + push
  - Escalation paths to fill in by operator before launch:
    - Infrastructure / Vercel / Supabase: <name + contact>
    - Content / clinical-tone issues: <name + contact>
    - Legal / regulatory: <outside-counsel contact>
    - Security incidents: <named responder + contact>

- [ ] **All four escalation slots above filled in launch-day** — 🟡 WAITING

### 6.3 Status page

- [ ] **Public status page exists and reachable**
  - Status: 🟡 WAITING (no SDK installed; operator picks Statuspage / BetterStack / static page at status.psychage.com)
  - Linked from footer or `status.psychage.com`
  - Auto-update from uptime monitor where supported
  - Acceptable timeline: post-launch, before week-1 ends

### 6.4 Communication templates

- [x] **Templates drafted** — 🟢
  - Six scenarios covered in [docs/launch/incident-templates.md](incident-templates.md):
    1. Auth incident (sign-in / signup / password reset)
    2. Data incident (article reader, dashboard, tools)
    3. Provider directory incident
    4. Email delivery incident
    5. Security incident (data accessed) — lawyer-gated before publish
    6. Crisis content unavailable — Sev 0, hotlines surfaced inline
  - Each has INVESTIGATING / IDENTIFIED / RESOLVED states and tone rules

- [ ] **Operator pre-fills `<name>`, `<contact>`, `status.psychage.com` placeholders** — 🟡 WAITING

- [ ] **Templates reviewed for sacred-rule compliance** — 🟡 WAITING (operator: spot-check on each before publish-day)

---

## §7. Critical Path Smoke Tests

### 7.1 User-site critical paths

_Filled in Phase H._

### 7.2 Admin critical paths

_Filled in Phase H._

### 7.3 Cross-domain flows

_Filled in Phase H._

---

## §8. Final Go/No-Go

When this section is filled in with 🟢 across all sections above, you are ready.

Totals computed in Phase I.

**Operator sign-off:** _______________ Date: _______________
