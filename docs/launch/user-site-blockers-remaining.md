# User Site Launch Readiness — Blockers Remaining

**Branch:** `launch/user-site-readiness`
**Status:** All in-code blockers fixed. The items below cannot be fixed inside this codebase and must be handled by the operator before public traffic hits production.

Each entry: **what** to do, **how to verify**, **likely owner**.

---

## Critical (must be done before launch)

### OP-001 — Hard CSP enforcement (LB-001 / LB-010 follow-up)
- **What:** The vercel.json header block ships `Content-Security-Policy-Report-Only`. Once production traffic has been observed for 1–7 days and the report-uri / Sentry CSP reports show no false positives, switch the header key from `Content-Security-Policy-Report-Only` to `Content-Security-Policy` in `vercel.json` and redeploy.
- **How to verify:** `curl -I https://psychage.com/` shows `Content-Security-Policy:` (not `-Report-Only`). Run https://observatory.mozilla.org/analyze/psychage.com — target grade A or better. Confirm no console violations on homepage, signup, navigator, article reader, crisis page.
- **Owner:** Platform / DevOps lead.

### OP-002 — Real-device QA pass
- **What:** Manually exercise the critical paths on real iOS Safari (latest + n-1) and real Android Chrome. Critical paths: homepage hero scroll, signup, login, navigator full flow, article reader scroll, crisis page tap-to-call.
- **How to verify:** No layout breakage. Tap targets feel right (≥44pt). Forms submit and produce visible feedback. Crisis phone numbers initiate calls.
- **Owner:** Operator + QA volunteer pool.

### OP-003 — Edge function CORS audit
- **What:** Audit every function under `supabase/functions/` for `Access-Control-Allow-Origin: *`. Replace with a strict allowlist of `https://psychage.com` and any explicitly-needed admin-subdomain origin.
- **How to verify:** `grep -rn "Access-Control-Allow-Origin" supabase/functions` shows no `*` outside development. Trigger each function from production and confirm browser console shows the strict-origin response.
- **Owner:** Backend lead.

### OP-004 — Supabase dashboard verification
- **What:** Carry out the operator dashboard checklist already established in `docs/audits/auth-hotfix-followup-dashboard.md` (Turnstile site key, SMTP config, RLS sanity, role migration).
- **How to verify:** That doc enumerates each step. Do not duplicate here.
- **Owner:** Operator (existing assignee from auth workstream).

### OP-005 — Lawyer review of legal copy
- **What:** Send `/legal/privacy`, `/legal/terms`, `/legal/accessibility` to outside counsel for review. The accessibility statement and cookies section were drafted in this branch and have not been reviewed by counsel. Health-data privacy paragraph in particular needs verification against HIPAA + state-level health-privacy laws (Washington's My Health My Data Act in particular).
- **How to verify:** Counsel sign-off email or redline merged.
- **Owner:** Operator + counsel.

### OP-006 — DNS / email auth records
- **What:** Confirm SPF, DKIM, DMARC are configured for psychage.com mail-sending domain. Confirm the production domain has TLS (HSTS preload submission worth doing once preloaded HTTP header has been live for two weeks).
- **How to verify:** `dig TXT psychage.com +short` shows SPF, DKIM, DMARC. `https://hstspreload.org/?domain=psychage.com` accepts the submission.
- **Owner:** Platform / DevOps lead.

### OP-007 — Email deliverability test
- **What:** Send each transactional email type from Supabase auth (signup confirmation, password reset, magic link, email change) to inboxes at gmail.com, outlook.com, yahoo.com, and an iCloud Apple Private Relay address. Confirm delivery to Inbox (not Spam) and that links resolve to production, not localhost.
- **How to verify:** Inbox-reach screenshots from each provider.
- **Owner:** Operator + auth workstream.

### OP-008 — OAuth flow live test
- **What:** Each enabled OAuth provider (Google, Apple if enabled) needs a full live end-to-end test against production redirect URIs. Confirm session persists, profile is created, redirect lands on the expected post-login route.
- **How to verify:** Manual sign-in from a clean browser profile.
- **Owner:** Auth workstream operator.

---

## High priority (do during launch week)

### OP-009 — securityheaders.com + observatory.mozilla.org runs
- **What:** After the next production deploy with vercel.json headers active, run https://securityheaders.com/?q=psychage.com and https://observatory.mozilla.org/analyze/psychage.com.
- **Target:** A or A+ on securityheaders.com. B or A on Mozilla Observatory (A requires hard CSP per OP-001).
- **Owner:** Platform lead.

### OP-010 — Lighthouse CI
- **What:** Wire Lighthouse into CI for the homepage, navigator, article reader, crisis page. Track Performance ≥75, Accessibility ≥95, Best Practices ≥90, SEO ≥95 on every PR.
- **How to verify:** First CI run on a PR after this lands shows a Lighthouse report attached.
- **Owner:** DevOps.

### OP-011 — Translation completion review (PT/ES/SV/FR)
- **What:** Two of the auth workstream summaries note that translations were stubbed in EN where strings were new. The legal pages added in this branch (`/legal/accessibility`, Privacy `#cookies` section) are EN-only. Decide whether to commission translations for launch or to ship EN-fallback gracefully in the other locales.
- **How to verify:** Open `/legal/accessibility` with each locale set; confirm no broken layout, even if copy stays in EN.
- **Owner:** Localization / content lead.

### OP-012 — Public admin sweep
- **What:** Out of scope for this branch by directive, but the Phase 1 audit found ~33 admin/dashboard/provider/portal `<img>` instances without alt. Operator should plan a follow-up sweep before any of those surfaces becomes publicly reachable.
- **How to verify:** Grep `<img` in `src/pages/{admin,dashboard,portal,provider}` and `src/components/admin`; confirm alt coverage.
- **Owner:** Frontend lead.

### OP-013 — Self-hosted OG image
- **What:** Replace the Unsplash photo URL used as the default OG image (`SEO.tsx:34` and `index.html` og:image) with a self-hosted image at `public/og-default.png` (1200×630). Keeps OG previews stable if Unsplash de-indexes.
- **How to verify:** `curl https://psychage.com/og-default.png` returns 200 with image data. og:image meta on homepage points at this URL.
- **Owner:** Brand / design.

### OP-014 — Replace 1024×1024 PNG apple-touch-icon with proper 180×180
- **What:** This branch copied the existing 1024×1024 logo.png to `public/apple-touch-icon.png` (62KB). iOS will resize it correctly but a purpose-built 180×180 (~10–20KB) is the right artifact.
- **How to verify:** `file public/apple-touch-icon.png` shows 180×180, not 1024×1024. Bytes < 30000.
- **Owner:** Brand / design.

### OP-015 — Replace favicon.svg fallback with a small favicon.ico
- **What:** The branch points the icon link at `favicon.svg` (490 bytes) with `logo.png` as alternate. Older browsers without SVG support look for `/favicon.ico` and currently get 404. Add a small (~5KB) `public/favicon.ico` (16+32+48 px multi-size).
- **How to verify:** `curl -I https://psychage.com/favicon.ico` returns 200, not 404.
- **Owner:** Brand / design.

---

## Nice to have (post-launch)

### OP-016 — Sitemap auto-generation
- **What:** The `public/sitemap.xml` checked in this branch is hand-curated against `src/App.tsx`. Adding new public routes will require updating both. Consider a build-time generator that walks the route table.
- **Owner:** Frontend lead.

### OP-017 — Centralized test-utils adoption
- **What:** `src/tests/test-utils.tsx` was introduced for the smoke test. Existing tests inline their own provider wrappers. Plan a follow-up refactor to migrate them.
- **Owner:** Frontend lead.

### OP-018 — Remove inline-script CSP allowance
- **What:** The HTTP-header CSP and the meta CSP both ship `'unsafe-inline'` for script-src. Long term, replace with nonce-based or hash-based allowance, especially once hard CSP enforcement is on (OP-001).
- **Owner:** Platform lead.

### OP-019 — Restrict VITE_GEMINI_API_KEY by HTTP referrer
- **What:** Phase I bundle audit confirmed `VITE_GEMINI_API_KEY` is shipped in the client bundle (intentional per Vite `VITE_*` convention; Gemini SDK is invoked from the browser). The key value `AIzaSy...` is therefore visible to anyone inspecting the bundle. Mitigate by restricting the API key in Google Cloud Console to HTTP referrer `https://psychage.com/*` (and any preview-deploy domain). Without this, the key can be lifted and abused against your quota.
- **How to verify:** In Google Cloud Console → APIs & Services → Credentials → the key in question → Application restrictions → HTTP referrers → confirm allowlist matches production + preview origins only.
- **Owner:** Platform lead.

---

## Out of scope (handled elsewhere or already tracked)

- Supabase Auth hotfix migration follow-ups → `docs/audits/auth-hotfix-followup-dashboard.md`
- AUTH UX i18n polish remaining items → `docs/refactors/auth-ux-i18n-summary.md`
- Admin panel readiness → covered by prompt 2 of 3 (separate sweep)
- Provider portal / signed-in-only readiness → covered by prompt 3 of 3 (separate sweep)
