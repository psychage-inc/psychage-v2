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

_Filled in Phase C._

### 2.2 Bundle secrets check

_Filled in Phase C._

### 2.3 Security scanner results

_Filled in Phase C._

### 2.4 OAuth provider production posture

_Filled in Phase C._

---

## §3. Legal & Compliance

### 3.1 Required public pages

_Filled in Phase D._

### 3.2 Cookie & consent

_Filled in Phase D._

### 3.3 Mental-health-platform copy compliance

_Filled in Phase D._

### 3.4 Accessibility statement

_Filled in Phase D._

### 3.5 GDPR / CCPA basics

_Filled in Phase D._

---

## §4. Performance Baseline

### 4.1 Lighthouse scores

_Filled in Phase E._

### 4.2 Bundle size budget

_Filled in Phase E._

### 4.3 Slow-network simulation

_Filled in Phase E._

### 4.4 Database query baselines

_Filled in Phase E._

---

## §5. Monitoring & Observability

### 5.1 Sentry capture

_Filled in Phase F._

### 5.2 Alerts & paging

_Filled in Phase F._

### 5.3 Error budgets

_Filled in Phase F._

### 5.4 Uptime monitoring

_Filled in Phase F._

---

## §6. Incident Readiness

### 6.1 Rollback rehearsal

_Filled in Phase G._

### 6.2 On-call & escalation

_Filled in Phase G._

### 6.3 Status page

_Filled in Phase G._

### 6.4 Communication templates

_Filled in Phase G._

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
