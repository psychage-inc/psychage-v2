# Cross-Cutting Launch Readiness — Observations

Drafted 2026-04-29 during the cross-cutting launch readiness sweep on branch `launch/cross-cutting-readiness`. Captures findings that did not fit cleanly into the readiness doc's blocker list, plus context that future-you will want when reading the readiness checklist alone.

---

## 1. The two confirmed 🔴 BLOCKING items

### 1.1 `all-articles-*.js` chunk = 9.4 MB gzipped

- **Where**: built artifact `dist/assets/all-articles-*.js` after `npm run build` on commit `8028c80`
- **Cause**: [src/services/articleService.ts](../../src/services/articleService.ts) does `await import('../data/articles/all-articles')` which pulls every TSX article in `src/data/articles/category-*/` into one chunk. After the article rewrite system landed, that's >1,200 articles' worth of JSX in one module.
- **Why this is a hard-launch blocker rather than a yellow**: 9.4 MB gzipped on the first article view will fail Lighthouse Performance, kill the article-reader bounce rate on mobile (>60s on 3G), and torpedo any SEO momentum the user-site sweep set up.
- **Out of scope to fix here** because the fix touches user-site service code, which the cross-cutting prompt forbids.
- **Recommended fix path** (operator decides timing):
  1. Convert `src/data/articles/all-articles.ts` from a single barrel re-export into 16 per-category barrels (`src/data/articles/category-01/index.ts` … `category-15/index.ts`).
  2. Have `articleService.ts` `await import('...category-NN')` keyed by article-ID prefix (`CAT01-…` → category 01).
  3. Verify each category chunk lands < 1 MB gzipped.
- **Sequencing**: best done before the next user-site polish window, not during launch.

### 1.2 `initSentry()` not called in admin-index.tsx

- **Where**: [src/admin-index.tsx](../../src/admin-index.tsx) lacks `import { initSentry } from './lib/sentry';` and the call.
- **Why**: marketing launch with zero error visibility on the admin surface is unacceptable. Admin actions have the highest blast radius (provider approvals, role grants, article edits).
- **Fix is two lines** in the admin entry — but admin surface is settled per prompts 1+2; operator must wire it in a follow-up branch.
- **PHI scrubbing** in [src/lib/sentry.ts](../../src/lib/sentry.ts) `beforeSend` already covers admin payloads, so no additional scrubbing work is required.

---

## 2. Non-blocker observations worth recording

### 2.1 Stale macOS Finder duplicate in `supabase/functions/`

There is a directory literally named `password-change-notification 2` (with the trailing space + "2") sitting next to the real `password-change-notification`. Almost certainly a Finder copy that got committed. Should be removed before deploy so it doesn't accidentally get deployed as an additional function.

### 2.2 Redundant CSP meta tag in index.html

[index.html](../../index.html) has a `<meta http-equiv="Content-Security-Policy">` (around line 25) that does NOT match the CSP-Report-Only header set in [vercel.json](../../vercel.json). The header takes precedence in a real browser, so the meta is dead weight, but it confused the cross-cutting sweep on first read. Cleaning it up is a one-liner; not blocking.

### 2.3 No frontend CI/CD pipeline

`.github/workflows/clarity-score-backend.yml` covers the Supabase functions but there is no frontend pipeline. Vercel auto-deploy on push is presumably configured at the Vercel-dashboard level. This means `npm run lint`, `npm run build`, and `npm test` are not run in PR-gating. Recommend adding a minimal `frontend-ci.yml` post-launch that gates merge on those three.

### 2.4 `VITE_SENTRY_DSN` was missing from `.env.example`

Sentry was wired into the user-site build (good) but the env var was undocumented (bad). Fixed in this sweep — added to [.env.example](../../.env.example) alongside `VITE_GIT_SHA` so contributors know how to wire local Sentry and how the release tag is populated.

### 2.5 i18n: admin is English-only

Per [src/admin-index.tsx](../../src/admin-index.tsx) and absence of `import './lib/i18n'`, the admin surface skips i18n entirely. This is fine for the operator audience but worth noting in case translation team asks.

### 2.6 Cookie consent state is host-scoped

`localStorage psychage_cookie_consent` is per-host. A user accepting on `psychage.com` will be re-prompted on `admin.psychage.com`. For an admin-only audience this is acceptable; document in the admin login UX that admin host treats only essential cookies (no analytics, no marketing) and skips the banner. Decision pending operator choice; out of scope to fix here.

### 2.7 No `.well-known/` directory

If Apple OAuth is enabled, the domain association file must exist at `/.well-known/apple-developer-domain-association`. Currently missing from [public/](../../public/). Listed as 🟡 in §1.2 of the readiness doc but worth re-flagging here since the absence is invisible from the file tree at a glance.

### 2.8 OG default image still references Unsplash

[user-site-blockers-remaining.md OP-013](user-site-blockers-remaining.md) noted this; remains unresolved. Post-launch task; not blocking.

---

## 3. Items that did not need cross-cutting work

These were checked during the sweep and confirmed already-addressed by prior workstreams. Listed for completeness so future-you doesn't re-investigate.

- HSTS header live in vercel.json (LB-001 done in user-site sweep)
- `noindex` on admin.html + admin-host robots.txt at edge (AB-001/AB-002 done in admin sweep)
- Cookie consent banner with GPC awareness (LB-008 done)
- Accessibility statement live (LB-009 done)
- Vitest baseline matched at admin sweep close (8028c80 captures it)
- Bundle scan for service-role / API-key leaks: clean

---

## 4. Final go/no-go logic

The readiness doc §8 reflects this:

- 2 🔴 items must be cleared by operator (admin Sentry wire-up, articles chunk split)
- 80-ish 🟡 items each have explicit dependency + owner
- 43-ish 🟢 items are confirmed in-code

**Status counts include legend lines and inline status references, so the precise denominator is fuzzy but the 🔴 = 2 figure is exact.** Operator should treat the doc as the authoritative checklist, not the rolled-up totals.
