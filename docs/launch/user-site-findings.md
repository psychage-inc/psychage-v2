# User Site Launch Readiness — Findings

**Branch:** `launch/user-site-readiness`
**Base:** `main` at `8341612`
**Bar:** Hard launch readiness — would-this-embarrass-us-publicly
**Scope:** Public user site (`psychage.com`). Out of scope: admin panel, auth architecture, Supabase dashboard.

---

## Summary

- Blockers found: 12
- Non-blockers logged for observations: 6
- Operator-handled items (deferred to blockers-remaining): see Phase H

---

## Blockers

### LB-001 — vercel.json missing security headers
- **Category:** security
- **Evidence:** `vercel.json` has `functions`, `redirects`, `rewrites` only. Zero `headers` block. Production responses lack HSTS / X-Content-Type-Options / X-Frame-Options / Referrer-Policy / Permissions-Policy / CSP.
- **Why blocker:** Browser security defaults are off. Mozilla Observatory / securityheaders.com would grade F. Clickjacking via iframe possible. MIME-sniff XSS possible. Fails standard launch security review.
- **Fix shape:** Add `headers` block in `vercel.json` covering all paths with HSTS, nosniff, frame-options=SAMEORIGIN, referrer-policy, permissions-policy, and CSP-Report-Only (hard CSP enforcement deferred to operator).

### LB-002 — robots.txt references sitemap-index.xml that does not exist
- **Category:** seo
- **Evidence:** `public/robots.txt:12` declares `Sitemap: https://psychage.com/sitemap-index.xml`. `ls public/` shows only `sitemap.xml` — no `sitemap-index.xml`. 404 served to crawlers.
- **Why blocker:** Search engines see broken sitemap reference. Indexing slows or fails for new pages.
- **Fix shape:** Update `robots.txt` to point at existing `sitemap.xml`, OR create `sitemap-index.xml` that points to `sitemap.xml`. Use the simpler edit.

### LB-003 — sitemap.xml missing several public routes
- **Category:** seo
- **Evidence:** `public/sitemap.xml` has 18 URLs. Missing routes registered in `src/App.tsx`: `/content-standards`, `/advisory-board`, `/how-we-verify`, `/for-providers/apply`, `/for-providers/claim`, `/tools/relationship-health`, `/tools/medication-tracker`, `/sitemap`. `/tools/thought-reframer` is in sitemap but no route exists in App.tsx (stale entry).
- **Why blocker:** Discoverable pages invisible to crawlers; stale entry returns SPA 200 + client-side 404. Soft-404 is a known SEO penalty.
- **Fix shape:** Reconcile sitemap.xml against `src/App.tsx` route table. Remove stale entries, add missing ones.

### LB-004 — Missing manifest.webmanifest + manifest link in index.html
- **Category:** seo/PWA
- **Evidence:** `index.html` has no `<link rel="manifest">`. `public/` does not contain `manifest.json` or `manifest.webmanifest`. Add-to-home-screen on iOS/Android falls back to ugly defaults.
- **Why blocker:** Mobile install/share prompts fail. Theme-color + maskable icon not defined for native shell.
- **Fix shape:** Create `public/manifest.webmanifest` with name, short_name, theme_color (#1A9B8C), background_color, icons (192/512), display=standalone, start_url=/. Add `<link rel="manifest" href="/manifest.webmanifest">` to `index.html`.

### LB-005 — Missing apple-touch-icon
- **Category:** mobile
- **Evidence:** `index.html` has no `<link rel="apple-touch-icon">`. `public/` has no `apple-touch-icon.png`. iOS Safari "Add to Home Screen" produces a low-res screenshot.
- **Why blocker:** Visible bad first impression for any user pinning the site to iOS home screen.
- **Fix shape:** Add `public/apple-touch-icon.png` (180×180) generated from existing brand asset. Add `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">` to `index.html`.

### LB-006 — Favicon points at 62KB logo.png
- **Category:** seo
- **Evidence:** `index.html:12` — `<link rel="icon" type="image/png" href="/images/logo.png">`. `public/images/logo.png` is 62KB. No `.ico` fallback. Existing `public/favicon.svg` is unused.
- **Why blocker:** Wasted bandwidth on every cold load; older browsers without SVG support fall back nowhere; `/favicon.ico` requests served as 404 from Vercel.
- **Fix shape:** Add small `public/favicon.ico`. Update `index.html` to reference `favicon.svg` (modern) + `favicon.ico` (fallback). Drop logo.png as favicon.

### LB-007 — No public-routes smoke test
- **Category:** build/runtime (preventive)
- **Evidence:** `src/tests/` has no test that asserts every public route from `App.tsx` renders without throw or `console.error`. Each test file inlines its own provider wrapper.
- **Why blocker:** A single broken lazy import or runtime crash on a public route ships unnoticed. The launch bar is "no white screen on any public route" — must be enforceable.
- **Fix shape:** Create `src/tests/test-utils.tsx` with `renderWithProviders` (HelmetProvider, QueryClient, MemoryRouter, AuthProvider, I18nProvider). Create `src/tests/launch/public-routes.smoke.test.tsx` iterating the public route table.

### LB-008 — Footer missing Cookie Policy + Accessibility Statement links
- **Category:** legal
- **Evidence:** `src/components/layout/Footer.tsx:170-174` legal row lists only Privacy / Terms / Sitemap. No Cookie Policy. No Accessibility Statement.
- **Why blocker:** GDPR/CCPA expectation for explicit cookie disclosure surface. ADA + EU Accessibility Act expect a published accessibility statement. Both are standard footer expectations for a public-launching mental-health platform.
- **Fix shape:** Add Cookie Policy link (anchor into Privacy `#cookies` section) and Accessibility Statement link (`/legal/accessibility`) to footer legal row.

### LB-009 — No Accessibility Statement page
- **Category:** legal/a11y
- **Evidence:** No `/legal/accessibility` route in `src/App.tsx`. `LegalPages.tsx` switch handles only `privacy` + `terms` types.
- **Why blocker:** ADA + EAA expect a published accessibility statement covering compliance target (WCAG 2.1 AA), known issues, and contact path for complaints.
- **Fix shape:** Extend `LegalPages.tsx` with `accessibility` type. Register `/legal/accessibility` route in `App.tsx`. Same shape as existing privacy/terms pages.

### LB-010 — index.html CSP meta tag insufficient for hard launch
- **Category:** security
- **Evidence:** `index.html:22` ships `<meta http-equiv="Content-Security-Policy">` with `script-src 'self' 'unsafe-inline'` and no `frame-ancestors` (the latter cannot be set via meta tag at all). Header-level CSP missing.
- **Why blocker:** `unsafe-inline` script-src allows XSS payloads. `frame-ancestors` not enforceable from meta. Clickjacking protection only via X-Frame-Options. Security review will flag this.
- **Fix shape:** Move CSP to HTTP header in `vercel.json` (Report-Only initially while validating). Tighten script-src or pair with nonce/hash strategy. Hard enforcement deferred to operator.

### LB-011 — User-public images missing alt text (RESOLVED — not a blocker)
- **Category:** a11y
- **Evidence:** Verification sweep across `src/pages/{home,core,learn,providers}` and `src/components/{home,article,pages,screens,landing}` found every `<img>` already has `alt`, including correct decorative `alt="" aria-hidden="true"` (e.g., `ToolsEcosystem.tsx:272`). The 33 missing-alt instances flagged in Phase 1 are all admin/dashboard/provider/portal — out of scope.
- **Outcome:** Reclassified as observation OB-007.

### LB-012 — LearnPage outline-none without focus-visible replacement (RESOLVED — not a blocker)
- **Category:** a11y
- **Evidence:** `src/styles/globals.css:55-60` applies `*:focus-visible { outline: none; @apply ring-2 ring-primary ring-offset-2 ring-offset-background; }` globally. The two LearnPage instances at `224, 592` use `focus:outline-none` (focus pseudo-class), and the global rule supplies the keyboard-focus ring via `:focus-visible`. Pattern is correct: mouse focus suppresses ring, keyboard focus shows it.
- **Outcome:** Reclassified as observation OB-008.

---

## Non-blockers (observations)

- **OB-001** — `og:image` and SEO component default image point at Unsplash CDN URL. Fragile if Unsplash de-indexes the photo. Recommend self-hosted OG image post-launch.
- **OB-002** — `Content-Security-Policy` meta in index.html includes `connect-src https://generativelanguage.googleapis.com` (Gemini direct). Confirm nothing else needed for new providers.
- **OB-003** — `meta name="keywords"` in index.html is mostly ignored by modern engines but harmless.
- **OB-004** — Lighthouse Performance / chunk size policing — out of blocker bar at launch.
- **OB-005** — Centralized test-utils factory only being created for smoke test scope. Wider adoption is a refactor for post-launch.
- **OB-006** — `lang="en"` on `<html>` — i18next switches client-side but `<html lang>` does not update. Acceptable for launch; revisit for hreflang strategy.
- **OB-007** — Image alt coverage on user-public surfaces is complete (verification result of LB-011). Missing-alt instances exist only in admin/dashboard/provider/portal (out of scope for this sweep). Operator should plan a follow-up sweep for those surfaces before they go public.
- **OB-008** — Global `*:focus-visible` rule in `src/styles/globals.css:55-60` provides keyboard-focus rings for every focusable element via Tailwind `ring-2 ring-primary ring-offset-2`. The 330 `outline-none` patterns across the codebase are correctly paired with this global rule (verification result of LB-012).

---

## Phase plan

| Commit | Title | Findings addressed |
|---|---|---|
| 1 | `[LAUNCH] User site readiness audit findings` | (this doc) |
| 2 | `[LAUNCH] Build + runtime: smoke test for public routes` | LB-007 |
| 3 | `[LAUNCH] SEO + discoverability: manifest, icons, sitemap, robots` | LB-002, LB-003, LB-004, LB-005, LB-006 |
| 4 | `[LAUNCH] A11y floor: alts + focus rings` | LB-011, LB-012 |
| 5 | `[LAUNCH] Client-side security: vercel.json headers + CSP` | LB-001, LB-010 |
| 6 | `[LAUNCH] Legal surface: footer links + accessibility page` | LB-008, LB-009 |
| 7 | `[LAUNCH] Mobile + responsive sanity` | (verification only) |
| 8 | `[LAUNCH] Reviewer deliverables` | summary + blockers-remaining |

Final commit SHAs filled in at Phase H.
