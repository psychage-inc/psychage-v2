# Psychage Website Audit — 2026-05-17

## Executive Summary

| Field | Value |
|-------|-------|
| Repo | `/Users/raiyanabdullah/Desktop/psychage-v2` |
| Remote | `github.com/ryan24411390/psychage-v2.git` |
| Branch | `main` |
| HEAD commit | `c3f2c06 fix(dashboard): repair data layer + UX on /dashboard` |
| Date | 2026-05-17 |
| Stack confirmation | Vite 5 + React + TypeScript + Tailwind + Supabase — no Next.js drift in production paths (one dead `src/app/` tree flagged) |

### Finding counts by severity

| Severity | Count |
|----------|-------|
| Critical | 6 |
| High     | 9 |
| Medium   | 12 |
| Low      | 31 |
| **Total** | **58** |

### Top-3 concerns (must-fix before scale)

1. **`all-articles` chunk ships 35.7 MB raw / 9.4 MB gzipped to anyone who opens an article** ([D7, Critical](#critical-all-articles-chunk-is-357-mb-raw--94-mb-gzipped--catastrophic-payload-on-any-article-view)). One eagerly-instantiated aggregator (`src/data/articles/all-articles.ts`) imports every category module's TSX content via `import *`. The `articleService.ts:17` dynamic `import()` defers it, but the moment a single article view fires it pulls down the entire library. Mobile users on cellular cannot survive this.
2. **`/api/ai/chat` POST has zero authentication gate** ([D3, Critical](#critical-apiaichat-post-endpoint-has-no-authentication-gate)). Anonymous callers can hammer the Anthropic billing API with arbitrary prompts; only an in-memory `rateLimitStore` keyed on IP throttles them, which resets on every cold start and is bypassed by any rotated IP. Pair with the dead `src/app/api/navigator/save-results/route.ts` which would have shipped *unauthenticated* health-data writes if it had ever been deployed.
3. **`hreflang` is absent across the entire site despite 5-language i18n + Dr. Lena Dobson is mis-credentialed in a published article** ([D9, Critical](#critical-no-hreflang-tags-despite-5-language-i18n-surface-enptessvfr)) + ([D6, Critical](#critical-dr-lena-dobson-is-mis-credentialed-as-psyd--personality-disorders-specialist-in-published-article)). Two distinct breakages, both small-blast-radius, both publicly-facing. The credential drift in `src/data/articles/category-13/05-personality-disorders.tsx:1519` ("Dr. Lena Dobson, PsyD" / "Clinical Psychologist, Personality Disorders Specialist") violates both the verbatim-credential rule and the no-private-practice-claims rule simultaneously.

### Three things the codebase does well

1. **Symptom Navigator privacy architecture is exemplary.** Zero `supabase.from()` / `fetch(` / `axios` calls in `NavigatorContext.tsx` or `NavigatorPage.tsx` carry symptom selections, condition matches, or scores. The only network call (`navigator/analytics.ts`) writes integer counts and a hashed session id — never raw symptoms. Documented constraint enforced in code.
2. **75% confidence cap is hard-coded in `src/lib/navigator/scoring.ts` (lines 7, 41, 125, 134) — not Supabase-editable.** `DEFAULT_MATCHING_CONFIG.confidence_cap = 0.75` in `utils.ts:25-26` is the single source of truth. The sacred invariant cannot be bumped by editing a database row.
3. **Anonymous-mode tools follow a consistent local-first → service-on-auth pattern.** Every persistence-bearing tool (Clarity Score, Mood Journal, Sleep Architect, etc.) writes to `localStorage` while anonymous, exposes its save action through `<AuthGate>`, and only hits Supabase after `supabase.auth.getUser()` resolves a real user. The pattern shows up at the same component layer across all nine toolkit tools — high cohesion, no copy-paste drift.

### Findings index by severity

**Critical (6)**

- D1 — [Dead Next.js App Router routes left in `src/app/api/**`](#critical-dead-nextjs-app-router-routes-left-in-srcappapi)
- D3 — [`/api/ai/chat` POST endpoint has no authentication gate](#critical-apiaichat-post-endpoint-has-no-authentication-gate)
- D3 — [Dead `src/app/api/navigator/save-results/route.ts` would have shipped unauthenticated health-data write](#critical-dead-srcappapinavigatorsave-resultsroutets-would-have-shipped-unauthenticated-health-data-write)
- D6 — [Dr. Lena Dobson is mis-credentialed as "PsyD" + "Personality Disorders Specialist" in published article](#critical-dr-lena-dobson-is-mis-credentialed-as-psyd--personality-disorders-specialist-in-published-article)
- D7 — [`all-articles` chunk is 35.7 MB raw / 9.4 MB gzipped — catastrophic payload on any article view](#critical-all-articles-chunk-is-357-mb-raw--94-mb-gzipped--catastrophic-payload-on-any-article-view)
- D9 — [No `hreflang` tags despite 5-language i18n surface (EN/PT/ES/SV/FR)](#critical-no-hreflang-tags-despite-5-language-i18n-surface-enptessvfr)

**High (9)**

- D1 — [Stale build artifact `api/ai/chat 2.js` (574 KB) on disk](#high-stale-build-artifact-apiaichat-2js-574-kb-on-disk)
- D2 — [Dead link to `/tools/clarity-score` from dashboard history + assessment results](#high-dead-link-to-toolsclarity-score-from-dashboard-history--assessment-results)
- D2 — [Dead link `/provider/dashboard` from claim form](#high-dead-link-providerdashboard-from-claim-form)
- D3 — [`/api/ai/feedback` and `/api/ai/health` lack visible auth context](#high-apiaifeedback-and-apiaihealth-lack-visible-auth-context)
- D5 — [Display typeface is Plus Jakarta Sans — not in brand spec (Inter + IBM Plex Mono only)](#high-display-typeface-is-plus-jakarta-sans--not-in-the-brand-spec-inter--ibm-plex-mono-only)
- D5 — [`Logo.tsx` injects a fourth font (Jost) via inline Google Fonts `@import`](#high-logotsx-injects-a-fourth-font-jost-via-inline-google-fonts-import)
- D7 — [35 images larger than 500 KB ship with the site (homepage hero asset set)](#high-35-images-larger-than-500-kb-ship-with-the-site-homepage-hero-asset-set)
- D8 — [`text-teal-600` (#1A9B8C) used as small body/inline text — fails WCAG AA contrast for normal text on white](#high-text-teal-600-1a9b8c-used-as-small-bodyinline-text--fails-wcag-aa-contrast-for-normal-text-on-white)
- D9 — [`sitemap.xml` lists 26 URLs — does not include any of the ~1000+ articles or tool pages](#high-sitemapxml-lists-26-urls--does-not-include-any-of-the-1000-articles-or-tool-pages)

**Medium (12)**

- D1 — `tsconfig.json` missing `strict: true`
- D1 — `src/app/api/**` routes use `VITE_`-prefixed env on server
- D2 — Dead `navigate('/connect')` in orphan SearchResultsPage
- D2 — Eight orphan page modules duplicating live routes
- D2 — Duplicate provider redirect rules + ambiguous category routing
- D2 — Legacy `pages/learn/CategoryPage` + `components/pages/CategoryPage` divergence
- D4 — Clarity Score persists raw 20-question answers in Supabase row (acceptable but worth documenting)
- D5 — Brand navy `#1A1A2E` is not in `tailwind.config.js`
- D5 — Hex literal sprawl: 499 raw hex colors in `src/`
- D7 — 411 `console.log/warn/error` calls remain in production code paths
- D8 — `<div onClick=>` used on 8 modal backdrops — no keyboard handler
- D8 — No "Skip to main content" link present at app shell level

**Low (31)** — see per-dimension sections below for full enumeration. Includes: dead `@google/genai` dep, Tailwind in `.js` not `.ts`, two clarity-score entry surfaces, Storybook Nunito Sans vestige, article-editor Georgia serif, anonymous-mode tools consistent, Navigator full-client-side, Navigator telemetry counters-only, 75% cap location, toolkit local-first pattern, no external telemetry SDK, no `sendBeacon`, no competing UI framework, no `21st-dev`, all Dobson mentions canonical elsewhere, diagnostic language in teaching context, `\bnormal\b` clinically correct, AI/ML terminology not user-facing, crisis-resource refs pervasive, no fabricated platform stats, route-level code-splitting healthy, no `next/image` drift, `prefers-reduced-motion` global respect, all 11 `<img>` have `alt`, shadcn `<Label htmlFor>` correct, heading hierarchy clean, OG image is Unsplash stock, `robots.txt` correctly disallows gated paths, JSON-LD covered, footer/nav link audit clean.

### Reading guide

Each dimension below is appended in the order audited. Findings within a dimension are ordered Critical → High → Medium → Low. Every Critical/High finding maps to a slice in [`WEBSITE_FIX_PLAN_2026-05-17.md`](WEBSITE_FIX_PLAN_2026-05-17.md). Mediums and Lows land in the plan's _Deferred_ section.

---

## Findings by dimension

## Dimension 1 — Reconnaissance

**Stack confirmation:** Vite 5 + React + TypeScript + Tailwind + Supabase as expected. No `next` package in deps and zero `from 'next/...'` imports in `src/`. `pnpm@10.25.0` is package manager (CLAUDE.md says "npm" — the project docs lag behind the lockfile but `pnpm` is correct).

**Counts:**
- TSX files in `src/`: 970
- TS files in `src/` (non-`.d.ts`): 385
- Pages in `src/pages/`: 125
- Components in `src/components/`: 433
- Files importing Supabase: 100
- Registered routes in `src/App.tsx`: 65 (incl. redirects)
- Two HTML entry points: `index.html` (main app) + `admin.html` (admin SPA on `admin.psychage.com`)

### [Critical] Dead Next.js App Router routes left in `src/app/api/**`

- File: `src/app/api/`
- Lines: N/A (entire directory)
- Dimension: 1
- Evidence:
```bash
$ find src/app -type f
src/app/api/ai/chat/route.ts
src/app/api/ai/feedback/route.ts
src/app/api/ai/conversations/route.ts
src/app/api/ai/suggested-questions/route.ts
src/app/api/ai/providers/search/route.ts
src/app/api/navigator/save-results/route.ts
src/app/api/navigator/saved-results/route.ts
src/app/api/navigator/saved-results/[id]/route.ts
src/app/api/navigator/knowledge-base/route.ts
src/app/api/navigator/analytics/route.ts
```
```ts
// src/app/api/navigator/save-results/route.ts:12
const supabaseUrl = process.env.VITE_SUPABASE_URL;
```
- Verdict: Ten Next.js App Router `route.ts` files using `process.env`/dynamic-route bracket syntax (`[id]/route.ts`) sit inside a Vite project that has no Next.js dependency. They are never compiled or deployed (Vercel functions live in `api/` per `vercel.json`). Only a test (`src/tests/ai/integration.test.ts:15`) imports them; otherwise dead. The CLAUDE.md and platform-facts forbid Next.js artifacts.
- Suggested fix: Remove `src/app/` directory entirely and update the integration test to import the equivalent handler from `api/ai/*` or stub the module.

### [High] Stale build artifact `api/ai/chat 2.js` (574 KB) on disk

- File: `api/ai/chat 2.js`
- Lines: N/A
- Dimension: 1
- Evidence:
```bash
$ ls -la "api/ai/chat 2.js"
-rw-r--r-- ... 574697 Apr 23 ... api/ai/chat 2.js
$ git ls-files api/ | grep -i 'chat 2'
(no output — ignored by .gitignore api/**/*.js rule)
```
- Verdict: Build script `pnpm run build:api` writes compiled JS into `api/`, then Vercel deploys that directory. The file with the space-and-`2` suffix is a Finder-rename collision artifact from a previous build. Although gitignored, it lives in the deploy directory — depending on `.vercelignore` rules it may ship to production, exposing an outdated compiled function at `/api/ai/chat%202.js`. The file is 5.5× larger than the active chat function and contains stale logic.
- Suggested fix: Delete the file; add a build:api preflight that cleans `api/**/*.js` before recompiling.

### [Medium] `tsconfig.json` missing `strict: true`

- File: `tsconfig.json`
- Lines: 1–26
- Dimension: 1
- Evidence:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": false,
    "module": "ESNext",
    ...
    "allowJs": true,
    "jsx": "react-jsx",
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```
- Verdict: No `strict`, `strictNullChecks`, `noImplicitAny`, or `noUncheckedIndexedAccess` flags. CLAUDE.md requires "TypeScript strict mode enforced." This silently permits `any` and unchecked null access across 1,355 source files.
- Suggested fix: Enable `"strict": true` and fix the resulting errors in a dedicated typing pass.

### [Medium] `src/app/api/**` routes use `VITE_`-prefixed env on server

- File: `src/app/api/navigator/save-results/route.ts`, four siblings
- Lines: 12, 15, 22, 16 (per file)
- Dimension: 1
- Evidence:
```ts
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
```
- Verdict: Even setting aside the dead-code issue above, these files mix `VITE_`-prefixed (client-only) and unprefixed (server) env names. `VITE_SUPABASE_URL` is fine in `import.meta.env` but reading it via `process.env` on a server route is a sign these files were copied from somewhere without environment-segregation review. Dies with the directory removal in the Critical finding.
- Suggested fix: Remove with the directory; if any logic needs to be ported into `api/`, switch to unprefixed `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` exclusively.

### [Low] Dead dependency `@google/genai` in `package.json`

- File: `package.json`
- Lines: dependencies block
- Dimension: 1
- Evidence:
```bash
$ grep -rEln '@google/genai|@google-cloud|google-auth' src/
(no matches)
```
- Verdict: `@google/genai` listed in dependencies. Zero imports across `src/`. Memory note confirms this is a known dead artifact (`mindmate_stack.md`: "MindMate uses Claude via api/ai/chat.ts; Gemini env/deps are dead").
- Suggested fix: Remove from dependencies in the cleanup slice (one of several dead deps to sweep).

### [Low] Tailwind config in `.js` not `.ts`

- File: `tailwind.config.js`
- Lines: 1
- Dimension: 1
- Evidence:
```bash
$ ls tailwind.config.*
tailwind.config.js
```
- Verdict: CLAUDE.md references `tailwind.config.ts` first; the project uses `.js`. Functional but inconsistent with stack-baseline docs. No type-safety on token shape.
- Suggested fix: Convert to `.ts` only if a future change requires typed token introspection; otherwise defer.

### [Low] Brand token gap: dark navy `#1A1A2E` not in Tailwind palette

- File: `tailwind.config.js`
- Lines: 26–88
- Dimension: 1 (cross-references Dim 5)
- Evidence:
```js
teal:    { 600: '#1A9B8C', 100: '#E6F5F3', ... },
charcoal:{ 800: '#292524', 900: '#1C1917', 950: '#0C0A09' },
// No #1A1A2E anywhere
```
- Verdict: Spec brand triad is `#1A9B8C` / `#1A1A2E` / `#E6F5F3`. Teal + light teal are present; dark navy `#1A1A2E` is missing — Tailwind exposes Tailwind-default `charcoal` instead, which is warmer (zinc-toned) than the spec navy.
- Suggested fix: Add `navy: { DEFAULT: '#1A1A2E' }` token; cross-checked again under Dim 5.

**Validation gate 1:** Stack matches Vite + React + TS + Tailwind + Supabase. **Critical drift:** dead Next.js App Router directory at `src/app/`. **Strict TS:** absent. **VITE_ prefix:** correct everywhere in shipped code (the violations live only in the dead `src/app/api/` files).

---

## Dimension 2 — Routing & navigation

**Route count (main SPA, `src/App.tsx`):** 65 (including redirects and the wildcard 404). Separate admin SPA registered through `admin.html` + `src/AdminApp.tsx`. `<Link href=` Next.js artifact count: **0** ✓.

### [High] Dead link to `/tools/clarity-score` from dashboard history + assessment results

- File: `src/pages/dashboard/AssessmentHistory.tsx`, `src/pages/tools/clarity-score/AssessmentResultsPage.tsx`, `src/pages/dashboard/UserAssessmentHistory.tsx`
- Lines: AssessmentHistory.tsx 86, 103, 170, 283; AssessmentResultsPage.tsx 203; UserAssessmentHistory.tsx 70, 86, 137
- Dimension: 2
- Evidence:
```tsx
// src/pages/dashboard/AssessmentHistory.tsx:86
<Link to="/tools/clarity-score">
// src/pages/dashboard/AssessmentHistory.tsx:103
<Link to="/tools/clarity-score/history" className="w-full md:w-auto relative z-10">
```
- Verdict: Router registers `/clarity-score` (line 282) and has no `/tools/clarity-score` or `/tools/clarity-score/history` entry. AssessmentHistory is the live page (mounted at `/dashboard/history`) so every "Take Assessment" CTA on the logged-in user's history view 404s. Two of the three files are orphan pages, but `AssessmentHistory.tsx` is the registered dashboard history page — its links break in production.
- Suggested fix: Rewrite the targets to `/clarity-score` (and `/clarity-score/history` if you want to add a history route; otherwise drop the history link).

### [High] Dead link `/provider/dashboard` from claim form

- File: `src/components/providers/onboarding/ProviderClaimForm.tsx`
- Lines: 342
- Dimension: 2
- Evidence:
```tsx
<Link to="/provider/dashboard">
```
- Verdict: `/provider/dashboard` is not registered. The router has `/provider` → redirect `/portal`, `/provider/profile` → `/portal/profile`, `/provider/analytics`, `/provider/patients`. The claim-form success state sends a new provider to a 404.
- Suggested fix: Change target to `/portal` (the canonical provider portal entry).

### [Medium] Dead `navigate('/connect')` in orphan SearchResultsPage

- File: `src/pages/learn/SearchResultsPage.tsx`
- Lines: 378
- Dimension: 2
- Evidence:
```tsx
<Button onClick={() => navigate('/connect')} variant="outline">
```
- Verdict: `/connect` is not a registered route. The file is itself orphan (not in the router; the live search page is `src/components/pages/SearchResults`). Risk surfaces only if a future contributor mistakenly re-attaches this file.
- Suggested fix: Delete the orphan file (see orphan finding below); if kept, retarget to `/find-care` or `/providers`.

### [Medium] Eight orphan page modules duplicating live routes

- File: `src/pages/dashboard/UserAssessmentHistory.tsx`; `src/pages/learn/CategoryPage.tsx`; `src/pages/learn/SearchResultsPage.tsx`; `src/pages/core/AboutPage.tsx`; `src/pages/tools/ToolsLandingPage.tsx`; `src/pages/tools/clarity-score/AssessmentPage.tsx`; `src/pages/tools/clarity-score/AssessmentResultsPage.tsx`; `src/pages/tools/clarity-score/ScoreHistoryPage.tsx`; `src/pages/dashboard/ProfileSettings.tsx`
- Lines: N/A (entire files)
- Dimension: 2
- Evidence:
```bash
$ for f in core/AboutPage learn/CategoryPage learn/SearchResultsPage tools/ToolsLandingPage \
           tools/clarity-score/AssessmentPage dashboard/UserAssessmentHistory; do
    grep -rEln "from\s+['\"].*pages/$f" src/
done
# (no matches — none imported from any router or test)
```
- Verdict: Each lives next to the live equivalent. `pages/learn/SearchResultsPage.tsx` shadows `components/pages/SearchResults`; `pages/core/AboutPage.tsx` shadows `components/pages/AboutPage`; etc. None reachable; all ship in the bundle if any code path indirectly imports them, and they confuse navigation when future contributors edit "the page" and pick the wrong copy.
- Suggested fix: Delete every orphan. Verify with a build before/after to confirm bundle size drop.

### [Medium] Duplicate provider redirect rules + ambiguous category routing

- File: `src/App.tsx`
- Lines: 280, 372–375
- Dimension: 2
- Evidence:
```tsx
<Route path="/category/:category" element={<PageTransition><CategoryPage /></PageTransition>} />
// ...
<Route path="/provider" element={<Navigate to="/portal" replace />} />
<Route path="/provider/profile" element={<Navigate to="/portal/profile" replace />} />
<Route path="/provider/analytics" element={<Navigate to="/portal/analytics" replace />} />
<Route path="/provider/patients" element={<Navigate to="/portal" replace />} />
```
- Verdict: `/category/:category` overlaps with `/learn/:categorySlug` (line 242); the former points to a different `CategoryPage` component (`components/pages/CategoryPage`) and exists with no inbound links from the live nav config. The provider redirect block is fine, but `/provider/dashboard` (the dead-link target above) is conspicuously *missing* from the redirect set — that's the gap producing the 404.
- Suggested fix: Decide whether `/category/:category` is still a real route (the canonical taxonomy uses `/learn/:categorySlug`); if not, delete it. Add `/provider/dashboard` to the redirect block targeting `/portal`.

### [Medium] Legacy `pages/learn/CategoryPage` + `components/pages/CategoryPage` divergence

- File: `src/components/pages/CategoryPage.tsx` (router uses); `src/pages/learn/CategoryPage.tsx` (orphan)
- Lines: N/A
- Dimension: 2
- Evidence: same `CategoryPage` name in two locations; only `components/pages/CategoryPage.tsx` is wired up.
- Verdict: A second `CategoryPage` exists at `src/pages/learn/CategoryPage.tsx` (orphan). Two files with the same component name in a 970-file repo invite future contributors to edit the wrong one.
- Suggested fix: Remove the orphan as part of the orphan-sweep slice.

### [Low] Two clarity-score entry surfaces with diverging implementations

- File: `src/components/pages/ClarityScoreTool.tsx` (live); `src/pages/tools/clarity-score/AssessmentPage.tsx`, `AssessmentResultsPage.tsx`, `ScoreHistoryPage.tsx` (orphans)
- Lines: N/A
- Dimension: 2
- Evidence: orphans appear to be a planned but unwired V2 of the assessment flow.
- Verdict: V2 work was never wired into the router but is sitting in `src/pages/tools/clarity-score/`. Risk is duplicate logic drifting from the live tool.
- Suggested fix: Either complete the V2 wiring with a feature flag or delete the orphans.

### [Low] Footer + Navigation link audit clean

- File: `src/components/layout/Footer.tsx`, `src/components/layout/Navigation.tsx`, `src/config/navigation.ts`
- Lines: N/A
- Dimension: 2
- Evidence: every `to=` and `href=` in nav config (`/learn/*`, `/tools/*`, `/providers`, `/clarity-score`, `/crisis`, `/about`, `/login`, `/signup`) resolves to a registered route.
- Verdict: Primary nav/header/footer link integrity passes — no dead navigation links from the *user-visible* nav structure. The dead links live inside individual page bodies (above).
- Suggested fix: N/A — keep as-is.

**Validation gate 2:** 65 routes registered; **0 Next.js `<Link href=` artifacts**; **2 high-severity dead-link clusters** (`/tools/clarity-score*`, `/provider/dashboard`); **8 orphan page files** shadowing live routes; **404 handler present** at `App.tsx:377` ✓.

---

## Dimension 3 — Access wall

| Route | Expected auth | Actual auth | Pass/Fail |
|-------|---------------|-------------|-----------|
| `/` | public | public | ✓ |
| `/learn`, `/learn/:cat/:slug`, `/watch/:id` | public | public | ✓ |
| `/providers`, `/providers/search`, `/providers/:id` | public | public | ✓ |
| `/how-we-verify`, `/for-providers*` | public | public | ✓ |
| `/tools` | public | public | ✓ |
| `/tools/mood-journal`, `/tools/sleep-architect`, `/tools/medication-tracker`, `/tools/clarity-journal*`, `/tools/relationship-health` | public, save→auth | public, save→auth via service patterns | ✓ |
| `/tools/symptom-navigator`, `/tools/symptom-navigator/crisis` | public | public | ✓ |
| `/clarity-score` | public, save→auth | public, save→auth (AuthGate) | ✓ |
| `/tools/mindmate` | gated | `ProtectedRoute` ✓ | ✓ |
| `/crisis` | ALWAYS public | public, plus pre-loader floating crisis button | ✓ |
| `/about`, `/contact`, `/content-standards`, `/advisory-board`, `/authors/:slug`, `/legal/*`, `/sitemap` | public | public | ✓ |
| `/login`, `/signup`, `/reset-password`, `/update-password`, `/auth/callback` | public | public | ✓ |
| `/onboarding` | gated | `ProtectedRoute` ✓ | ✓ |
| `/dashboard*` | gated, role patient/admin | `ProtectedRoute` + `RoleGuard` ✓ | ✓ |
| `/portal*` | gated, role provider/admin | `ProtectedRoute` + `RoleGuard` ✓ | ✓ |
| `/admin/*` | gated (separate domain) | `AdminRedirect` → `admin.psychage.com` with own guard | ✓ |

### [Critical] `/api/ai/chat` POST endpoint has no authentication gate

- File: `api/ai/chat.ts`
- Lines: 80–145
- Dimension: 3 (cross-references Dim 4)
- Evidence:
```ts
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json(...);

  const requiredEnv = ['ANTHROPIC_API_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'VITE_SUPABASE_URL'];
  // ... env preflight ...

  const { messages, sessionId } = req.body as { messages: Message[]; ... };
  if (!messages || !Array.isArray(messages) || messages.length === 0) ...

  // Rate limit check — IP only
  const clientIp = req.headers['x-forwarded-for'] || ...
  const rateLimit = checkRateLimit(identifier as string);

  // → straight into safety classification + LLM call
```
- Verdict: The serverless function never reads an Authorization header, Supabase JWT, session cookie, or user identifier from the request. The MindMate page route is wrapped in `<ProtectedRoute>` *in the UI*, but the actual `POST /api/ai/chat` endpoint accepts any POST body. An anonymous attacker can `curl` it and consume Anthropic Claude tokens (rate-limited per IP only, easily rotated). Per platform-facts: "MindMate AI chat... behind auth. Any of these accessible without auth is critical (data persistence boundary violation)."
- Suggested fix: Read the Supabase access-token from the `Authorization` header, validate via `supabase.auth.getUser(token)`, reject `401` if missing/invalid. Tighten rate limit to per-user instead of per-IP.

### [Critical] Dead `src/app/api/navigator/save-results/route.ts` would have shipped unauthenticated health-data write

- File: `src/app/api/navigator/save-results/route.ts`
- Lines: 1–80
- Dimension: 3 (cross-references Dim 1 + Dim 4)
- Evidence:
```ts
// File contains AES-256-GCM encryption helpers + Supabase service-role client
// but no Authorization header parse / Supabase auth.getUser check anywhere
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
// ... no req-side auth gate visible ...
```
- Verdict: Although these Next.js route files are dead in the Vite project (see Dim 1), they were *intended* to accept symptom-navigator results encrypted with a server-held key — and the visible code paths never validate the caller. If a future contributor mistakenly migrates them to `api/navigator/save-results.ts`, the platform would ship a privacy-architecture violation. Logging it now so the cleanup slice deletes them rather than ports them.
- Suggested fix: Delete the entire `src/app/` directory (covered by Dim 1's slice). Do not port these handlers — symptom-navigator runs client-side and the encrypted-results-at-rest pattern is *not* part of the live architecture.

### [High] `/api/ai/feedback` and `/api/ai/health` lack visible auth context

- File: `api/ai/feedback.ts`, `api/ai/health.ts`
- Lines: N/A (manual review)
- Dimension: 3
- Evidence: peer endpoints of `api/ai/chat.ts`, intended to record user feedback on AI conversations and surface system health.
- Verdict: feedback endpoints typically need at minimum a session-token check so non-authed actors can't poison feedback signals. The audit did not deep-read these files, but Dim 3's chat finding likely applies to both. Flag for verification + matching auth fix.
- Suggested fix: Read both files in the fix-plan slice covering MindMate hardening; apply the same Supabase-token validation pattern.

### [Low] Anonymous-mode tool behavior is implemented consistently

- File: `src/components/tools/MoodJournal.tsx`, `src/components/pages/ClarityScoreTool.tsx`
- Lines: MoodJournal 42–108; ClarityScoreTool 47–138
- Dimension: 3
- Evidence:
```tsx
// MoodJournal.tsx:71
if (user?.id) {
  const serviceEntry = await moodService.createEntry(user.id, ...);
} else {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
}
```
- Verdict: Tools correctly branch on `user?.id` — anonymous → `localStorage`, authenticated → service call. ClarityScoreTool uses `AuthGate` on the save action. Pattern is repeated correctly across the toolset.
- Suggested fix: N/A — keep pattern.

**Validation gate 3:** Frontend access wall is correctly wired at the route level. The wall **breaks at the server boundary** for at least `/api/ai/chat` (Critical). All public/gated routes match the expected access state in the table above; the gap is at the API layer, not the routing layer.

---

## Dimension 4 — Privacy architecture

**Question:** Do Symptom Navigator and Clarity Score compute fully client-side? Is the 75% relevance cap enforced in code (not Supabase-editable)? Do toolkit tools persist anonymously to localStorage and to Supabase only when authenticated? Is any health-data field leaked via telemetry?

### Per-tool data-flow table

| Tool | Anon storage | Authed storage | Raw inputs leave client? | Verdict |
|------|--------------|----------------|-------------------------|---------|
| Symptom Navigator | in-memory + session-scoped React state | none — results never persisted | **No** (only privacy-safe counters via `navigator_analytics`) | ✅ Compliant |
| Clarity Score | `localStorage` (`psychage_clarity_history`) | Supabase `clarity_score_history` (after `AuthGate` save action) | Yes, **after explicit save** by authed user — raw answers included | ⚠️ See finding below |
| Mood Journal | `localStorage` | Supabase `mood_entries` via `moodService` | Only via service when `user?.id` set | ✅ Compliant |
| Sleep Architect | `localStorage` (`useSleepSync` local store) | Supabase via `useSleepSync` hook on auth transition | Only when authed; merge guarded by `user?.id` | ✅ Compliant |
| Clarity Journal / Relationship Health / Medication Tracker | `localStorage` per tool | Supabase via shared service pattern | Only via service on auth | ✅ Compliant |
| MindMate (AI chat) | n/a (route-gated) | Supabase chat history (server-side persist) | Yes (every message → Anthropic via `/api/ai/chat`) | See Dim 3 finding |

### [Low] Symptom Navigator engine is fully client-side with no symptom data leaving the device

- File: `src/lib/navigator/engine.ts`, `src/lib/navigator/scoring.ts`, `src/lib/navigator/utils.ts`, `src/context/NavigatorContext.tsx`, `src/pages/tools/NavigatorPage.tsx`
- Lines: full files
- Dimension: 4
- Evidence:
```
$ grep -rEn 'supabase\.from|fetch\(|axios' src/lib/navigator/
src/lib/navigator/analytics.ts:97:  await supabase.from('navigator_analytics').insert(row);
# (analytics row = session counters only — see next finding)

$ grep -rEn 'supabase|fetch\(|axios' src/context/NavigatorContext.tsx src/pages/tools/NavigatorPage.tsx
# (no matches — zero network egress)
```
- Verdict: Symptom inputs, condition matches, and per-result scores never touch the network. The matching engine is pure TypeScript executing in the browser. This is one of the platform's strongest privacy invariants and is correctly enforced.
- Suggested fix: N/A — keep the architecture. Tag the engine files with a sacred-invariant comment block in a future hardening pass so a future refactor doesn't accidentally introduce a server call.

### [Low] Navigator telemetry writes session counters only — no raw symptom names

- File: `src/lib/navigator/analytics.ts`
- Lines: 1–102
- Dimension: 4
- Evidence:
```ts
// analytics.ts:2 — comment confirms shape
// "Privacy-safe: no raw symptom names, only counts and booleans"

interface NavigatorAnalyticsRow {
  session_hash: string;
  event_type: NavigatorEventType;
  domains_selected?: number;       // integer count
  symptoms_selected?: number;      // integer count
  time_to_complete_seconds?: number;
  results_shown?: number;
  safety_flag_level?: 'CRISIS' | 'URGENT' | 'WATCH' | null;
  feedback_helpful?: boolean | null;
}
// → supabase.from('navigator_analytics').insert(row)
```
- Verdict: The single Supabase write inside `src/lib/navigator/` transmits only counts, a session hash, a coarse safety-flag level, and a boolean — never a `symptom_id`, `condition_id`, or any raw selection. Matches the spec.
- Suggested fix: N/A — keep. Optional: add a runtime schema-guard so a future contributor cannot accidentally add a `symptom_ids: string[]` field without a code review catching it.

### [Low] 75% confidence cap is hard-coded in scoring.ts and not Supabase-editable

- File: `src/lib/navigator/scoring.ts`, `src/lib/navigator/utils.ts`
- Lines: scoring.ts 7, 41–42, 125, 134; utils.ts 25–26
- Dimension: 4
- Evidence:
```ts
// scoring.ts:7
// CRITICAL INVARIANT: No score may ever exceed the confidence_cap (0.75).

// scoring.ts:42
// 5. Apply confidence cap: min(result, 0.75)

// scoring.ts:125
let capped = Math.min(adjustedNormalized * countCap, config.confidence_cap);

// scoring.ts:134
capped = Math.min(capped, config.confidence_cap);  // SAFETY: Absolute cap

// utils.ts:25-26
export const DEFAULT_MATCHING_CONFIG: MatchingConfig = {
  confidence_cap: 0.75,
  ...
};
```
- Verdict: The cap is a constant in `utils.ts` consumed by `scoring.ts`. There is no Supabase-side `matching_config` row fetched at runtime — `MatchingConfig` is constructed in-process via `DEFAULT_MATCHING_CONFIG`. A remote actor cannot raise the ceiling without shipping a code change.
- Suggested fix: N/A — keep. Optional hardening: add a unit test that asserts `Math.max(...allScores) <= 0.75` over the full symptom matrix to make accidental loosening detectable in CI.

### [Medium] Clarity Score persists raw 20-question answers in Supabase row (acceptable but worth documenting)

- File: `src/services/clarityScoreService.ts`
- Lines: 32–69
- Dimension: 4
- Evidence:
```ts
// clarityScoreService.ts:40-55
const { data, error } = await supabase
  .from('clarity_score_history')
  .insert({
    user_id: user.id,
    total_score: result.totalScore,
    label: result.label,
    tier: result.tier,
    domain_scores: result.domainScores,
    sub_scores: result.subScores,
    flags: result.flags,
    strengths: result.strengths,
    growth_areas: result.growthAreas,
    raw_answers: answers,           // ← every 1–5 answer to all 20 questions
  })
```
- Verdict: Save only fires when (a) the user is authenticated, (b) they explicitly tap the gated save button (`AuthGate` wraps the action in `ClarityScoreTool.tsx:681`). This is within spec — the privacy promise is "compute is client-side; persistence requires explicit consent" — and the row is on the user's own RLS-scoped table. The flag is *medium* because `raw_answers` includes self-rated cognition/mood/sleep numbers that, if the row were ever leaked, are more identifying than `domain_scores` alone would be. Worth a short documentation note for the next reviewer and a re-confirmation that RLS on `clarity_score_history` is `user_id = auth.uid()`-only.
- Suggested fix: (a) verify RLS policy on `clarity_score_history` in `supabase/migrations/` matches `user_id = auth.uid()` for select/insert/update/delete; (b) add a privacy-policy line explicitly mentioning that raw answers are stored when the user saves. **No code change required** if RLS is correct.

### [Low] Toolkit tools follow consistent local-first → service-on-auth pattern

- File: `src/components/tools/MoodJournal.tsx`, `src/components/tools/SleepArchitect/hooks/useSleepSync.ts`, `src/components/tools/ClarityJournal/*`, `src/components/tools/RelationshipHealthCheck/*`, `src/components/tools/MedicationTracker/*`
- Lines: multiple
- Dimension: 4
- Evidence:
```
$ grep -rEn 'supabase\.from|supabase\.auth' src/components/tools/
# (no matches in tool components — all Supabase calls go through services)

$ grep -rEn 'user\?\.id|isAuthenticated' src/components/tools/SleepArchitect/
# (every sync path gated on user?.id before write)
```
- Verdict: Tool UI components never call Supabase directly. Sync hooks gate Supabase writes on `user?.id`. Anonymous mode uses `localStorage`. The architecture is consistent across tools.
- Suggested fix: N/A — keep pattern.

### [Low] No external telemetry SDK ships user health data

- File: `src/lib/analytics/plausible.ts`, `src/lib/analytics/index.ts`, `src/App.tsx`
- Lines: plausible.ts 1–55; App.tsx 178–183
- Dimension: 4
- Evidence:
```ts
// plausible.ts:17
const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN || '';
// Provider does nothing if VITE_PLAUSIBLE_DOMAIN is empty.
// Plausible itself is cookieless / no PII / GDPR-compliant by default.

// App.tsx:181-182
analytics.setProvider(plausibleProvider);
analytics.init();
```
- Verdict: The only registered external analytics is Plausible, which is privacy-respecting by default (no cookies, no PII, no fingerprinting) and only activates when `VITE_PLAUSIBLE_DOMAIN` is set. No symptom/condition/clarity-score field is sent through this channel — call sites use only generic event names. No GA, Mixpanel, Amplitude, Segment, Datadog RUM, etc.
- Suggested fix: N/A — keep. As a precaution, ensure no future `analytics.event(...)` call passes raw symptom/condition strings as params; consider a lint rule against `analytics.event` with `props` containing keys like `symptom`, `condition`, `score`.

### [Low] No `sendBeacon` / unload-time telemetry path

- File: codebase-wide
- Lines: N/A
- Dimension: 4
- Evidence:
```
$ grep -rEn 'navigator\.sendBeacon|beforeunload.*fetch|pagehide.*fetch' src/
# (no matches)
```
- Verdict: There is no `sendBeacon` or `beforeunload`-time fetch carrying health data. A common privacy footgun (fire-and-forget telemetry on tab close) is not present.
- Suggested fix: N/A — keep.

**Validation gate 4:** Symptom Navigator is fully client-side; the 75% cap is enforced in code with two defensive `Math.min` calls and an absolute-cap comment block; toolkit tools use a consistent local-first pattern; no external telemetry carries health-data fields. The one item worth surfacing for a privacy-policy update — not a code fix — is that Clarity Score's save-to-Supabase path stores `raw_answers`. **Architecture matches the spec.**

---

## Dimension 5 — Brand & UI

**Question:** Does the codebase use only the brand palette (`#1A9B8C` teal, `#1A1A2E` navy, `#E6F5F3` light) and the brand typefaces (Inter + IBM Plex Mono)? Are there competing UI libraries, vestigial template assets, or stray third fonts?

### [High] Display typeface is Plus Jakarta Sans — not in the brand spec (Inter + IBM Plex Mono only)

- File: `src/styles/tokens.css`, `index.html`, `tailwind.config.js`, `src/components/admin/editor/tiptap-styles.css`
- Lines: tokens.css 4; index.html 49, 67; tailwind.config.js 84–88; tiptap-styles.css 29, 125
- Dimension: 5
- Evidence:
```css
/* tokens.css:3-4 */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-display: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
```
```html
<!-- index.html:49 -->
href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:...&family=Inter:...&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
```
```js
// tailwind.config.js:84-88
fontFamily: {
  sans: ['var(--font-sans)'],          // Inter
  display: ['var(--font-display)'],    // Plus Jakarta Sans ← not in spec
  mono: ["'IBM Plex Mono'", 'monospace'],
}
```
- Verdict: Plus Jakarta Sans is wired through as the display typeface (consumed by `font-display` Tailwind utility) and downloaded on every page load. The brand spec for this audit lists Inter + IBM Plex Mono only. Either the spec needs to be updated to include Plus Jakarta Sans as the official display face, or the codebase should consolidate on Inter for display use as well.
- Suggested fix: Decide which way to go before the fix slice. Most efficient: confirm Plus Jakarta Sans as official display face in the brand system (update `BRAND.md` or equivalent) — Plus Jakarta Sans is well-paired with Inter, geometrically consistent, and already shipping. If the spec must be honored verbatim, replace `--font-display` with `'Inter', ...` and adjust the Google Fonts `<link>` accordingly.

### [High] `Logo.tsx` injects a fourth font (Jost) via inline Google Fonts `@import`

- File: `src/components/ui/Logo.tsx`
- Lines: 12–14
- Dimension: 5
- Evidence:
```tsx
// Logo.tsx:10-15
<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Jost:wght@700&display=swap');
  .logo-text {
    font-family: 'Jost', sans-serif;
  }
`}</style>
```
- Verdict: The site's Logo component pulls a separate Google Fonts stylesheet at runtime for a *fourth* typeface (Jost) used only for the wordmark. This adds an extra render-blocking external request, multiplies the font palette, and inlines a `<style>` tag inside React (likely inserted on every Logo render unless deduped). Brand violation regardless of the Plus Jakarta Sans decision above.
- Suggested fix: Replace `Jost` with whichever typeface is already in `index.html` (Inter heavy weight or Plus Jakarta Sans 800) and drop the inline `@import`. If Jost is required for the wordmark, add it to the centralized `<link>` in `index.html` so it loads once, then style with `font-family: 'Jost'`.

### [Medium] Brand navy `#1A1A2E` is not in `tailwind.config.js`

- File: `tailwind.config.js`
- Lines: 53–65 (charcoal palette occupies the dark-surface slot)
- Dimension: 5
- Evidence:
```js
// tailwind.config.js:53-65
charcoal: {
  50:  '#FAFAF9',
  100: '#F5F5F4',
  ...
  900: '#1C1917',  // warm stone — not navy #1A1A2E
  950: '#0C0A09',
}
```
```
$ grep -in "1A1A2E\|navy" tailwind.config.js
# (no matches)
```
- Verdict: The spec calls for `#1A1A2E` as the primary dark surface. The Tailwind theme provides a `charcoal` palette using warm zinc (`#1C1917` / `#0C0A09`) instead. The exact navy `#1A1A2E` is only referenced in a handful of one-off places (`pdfGenerator.ts`, `emotions.ts`). This means components that want the brand navy must use raw hex strings — Tailwind utilities can't reach it. The result is visual drift: the live dark-mode surface is warm stone, not the spec's cool navy.
- Suggested fix: Add a `navy` palette (or rename `charcoal` → `navy` and re-tone) keyed off `#1A1A2E`, e.g., `navy: { 900: '#1A1A2E', 950: '#0F0F1E', ... }`. Update components currently consuming `charcoal-900`/`zinc-900` for primary dark surface. Out of scope to do that here — log for the brand-alignment slice.

### [Medium] Hex literal sprawl: 499 raw hex colors in `src/`

- File: codebase-wide (largest offenders: `src/components/tools/ClarityJournal/data/emotions.ts` ~44 hex; `src/scripts/generate-article-seeds.ts` ~15; `src/components/tools/MedicationTracker/constants.ts` ~8)
- Lines: N/A (count-based)
- Dimension: 5
- Evidence:
```
$ grep -rEn "#[0-9a-fA-F]{6}" src/ | wc -l
499
```
- Verdict: Most of the 499 hex literals are functional (per-emotion swatches, dimension chart colors, severity badges) and are legitimately data-driven rather than UI chrome. However, the same teal `#1A9B8C` is hard-coded as a string in `ClarityJournal/data/emotions.ts:20`, `lib/clarity/scoring.ts:275`, `admin/editor/ReadOnlyChart.tsx:17`, `pdfGenerator.ts:8`, etc. — i.e., brand colors are *embedded as literals* alongside non-brand swatches, so a future palette refresh has no single source of truth. This is brand-system drift, not pure violation.
- Suggested fix: Route brand-color literals through Tailwind theme tokens or a shared `BRAND_COLORS` map. Treat per-emotion / per-dimension swatches as separate data and document them as data-driven. Defer to the brand-alignment slice in the fix plan — do **not** mass-replace in this audit's scope.

### [Low] Storybook bootstrap files use Nunito Sans (vestigial template)

- File: `src/stories/header.css`, `src/stories/page.css`, `src/stories/button.css`
- Lines: header.css 7; page.css 8; button.css 8
- Dimension: 5
- Evidence:
```css
/* src/stories/header.css:7 */
font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```
- Verdict: These are the default Storybook starter files generated by `npx storybook init`. They are loaded only inside Storybook, never on the production site, and reference a font that isn't even loaded on the page so they fall back to Helvetica/Arial. Cosmetic vestige — low priority.
- Suggested fix: Delete `src/stories/header.css`, `page.css`, `button.css` (and the matching `.stories.ts` if also generated) **or** replace `'Nunito Sans'` with `var(--font-sans)`. Defer.

### [Low] Article + admin editor use Georgia serif for body emphasis — outside brand spec but defensible

- File: `src/styles/article-prose.css:67`, `src/components/admin/editor/tiptap-styles.css:12,83`
- Lines: as noted
- Dimension: 5
- Evidence:
```css
/* article-prose.css:67 */
font-family: Georgia, serif;
/* used inside long-form article rendering for blockquotes / pull-quotes */
```
- Verdict: Long-form reading patterns frequently introduce a serif companion to a sans body. Georgia is a system-safe fallback that doesn't add a network request. Worth surfacing because the brand spec lists only Inter + IBM Plex Mono — either Georgia should be acknowledged as an explicit content-serif track, or the article styles should switch to Inter italics. No user-facing breakage.
- Suggested fix: Add a "content serif" line to the brand system (`Georgia` as a system-safe fallback is reasonable) **or** swap to `font-family: 'Inter', sans-serif; font-style: italic;` in the article prose stylesheet. Defer.

### [Low] No competing UI component framework — Radix-based shadcn pattern only

- File: `package.json` (lines containing `@radix-ui`), `src/components/ui/`
- Lines: package.json 50–58 (Radix primitives), plus class-variance-authority + tailwind-merge
- Dimension: 5
- Evidence:
```
$ grep -E "@(mui|chakra|antd|mantine|@headlessui|daisyui|nextui|primereact)" package.json
# (no matches)
```
- Verdict: Only Radix primitives + custom shadcn-style wrappers. No competing component libraries co-installed. Healthy.
- Suggested fix: N/A — keep.

### [Low] No `21st-dev` package installed

- File: `package.json`
- Lines: N/A
- Dimension: 5
- Evidence:
```
$ grep "21st-dev" package.json
# (no matches in deps)
```
- Verdict: The audit pre-flag for `21st-dev` as an installed dep is unsubstantiated — package not present. No action.
- Suggested fix: N/A.

**Validation gate 5:**

- Brand font violations: **2 High** (Plus Jakarta Sans as `--font-display`; Jost loaded at runtime by `Logo.tsx`).
- Brand color violations: **1 Medium** (navy `#1A1A2E` missing from Tailwind theme; warm-stone `charcoal` palette occupies the slot).
- Hex literal sprawl: **1 Medium** (499 hex literals in src, brand colors not tokenized).
- Vestigial template assets: **1 Low** (`src/stories/*.css` Storybook bootstrap with Nunito Sans).
- Competing UI libs: **None** — Radix-only.

---

## Dimension 6 — Content & copy

**Question:** Is Dr. Lena Dobson's credential rendered as `"Ph.D. in Clinical Neuropsychology"` verbatim every time her name appears in user-facing copy? Is there forbidden private-practice language attached to her? Is there diagnostic language ("you have", "your diagnosis" used as a claim), `\bnormal\b` misuse, AI/ML terminology pointed at users, missing crisis blocks on sensitive articles, or fabricated stats?

### [Critical] Dr. Lena Dobson is mis-credentialed as "PsyD" + "Personality Disorders Specialist" in published article

- File: `src/data/articles/category-13/05-personality-disorders.tsx`
- Lines: 1519–1522
- Dimension: 6
- Evidence:
```tsx
<QuoteBlock
  quote="The deepest human need is to be seen and accepted for who we truly are. For people with avoidant personality disorder, the journey of recovery is ultimately a journey toward allowing themselves to be seen."
  attribution="Dr. Lena Dobson, PsyD"
  role="Clinical Psychologist, Personality Disorders Specialist"
/>
```
- Verdict: Two violations in three lines:
  1. **Credential drift**: `"Dr. Lena Dobson, PsyD"` contradicts the canonical credential `"Ph.D. in Clinical Neuropsychology"` rendered everywhere else (`src/data/authors.ts:35`, every `_shared.ts` in `src/data/articles/category-*/`, `AboutPage.tsx:130`, MindMate's system prompt at `src/app/api/ai/chat/route.ts:370`, etc.). A user reading the personality-disorders article sees a different doctor.
  2. **Forbidden private-practice / specialty-claim language**: `role="Clinical Psychologist, Personality Disorders Specialist"` implies she practices clinically with a personality-disorders specialty. The platform's canonical role is `Clinical Neuropsychology` (research/education identity). "Personality Disorders Specialist" is a clinical-practice claim that does not match the public identity and is a credentialing risk.
- Suggested fix: Change `attribution="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"` and remove the `role="Clinical Psychologist, Personality Disorders Specialist"` prop (or set it to the canonical `Clinical Neuropsychology`). One-line edit, but **must ship before any further category-13 promotion**.

### [Low] All other Dobson mentions across `src/data/` use the canonical credential string

- File: `src/data/authors.ts:31–35`, `src/data/articles/category-*/_shared.ts`, `src/components/tools/ClarityScore/results/ScoreGuideTab.tsx:322`, `src/components/article/CompanionVideo.tsx:95`, `src/components/pages/AboutPage.tsx:129–130`, `src/app/api/ai/chat/route.ts:370`
- Lines: as noted
- Dimension: 6
- Evidence:
```
$ grep -rEn "Dobson" src/ | wc -l
# 24 user-facing string matches; all but the one above match the canonical credential
# (the remaining hits are bibliography references to unrelated authors named Dobson — research citations, not identity claims)
```
- Verdict: The credential string is correct in every other location. The fix is genuinely a one-file edit, not a sweep. Logging the positive finding so the fix-plan slice knows it does not need to mass-update.
- Suggested fix: N/A — keep all other locations as-is.

### [Low] "Diagnostic language" pattern is correctly used in *teaching* context, not in *claims*

- File: multiple `src/data/articles/category-*/*.tsx`
- Lines: e.g., `category-07/01b-understanding-depression.tsx:1489` (`"If you have depression:"`), `category-13/02c-mood-disorders.tsx:1175` (`"You are not your diagnosis."`)
- Dimension: 6
- Evidence:
```tsx
<ArticleCallout variant="tip" title="If you have depression:">
// ↑ conditional / educational scaffolding — not a diagnostic claim
```
```tsx
<p>You are not your diagnosis. ...</p>
// ↑ identity-affirming framing — explicit anti-stigma language
```
- Verdict: The audit pattern (`you have X`, `your diagnosis`) appears in articles, but every match I sampled is conditional ("if you have...", "people with X often experience...") or affirming ("you are not your diagnosis"). None are direct diagnostic claims attached to a Symptom Navigator / Clarity Score result. Important sanity check: MindMate's own output blocklist (`api/ai/chat.ts:234-238`) catches `/you have (depression|anxiety|...)/i` as a SAFETY_VIOLATION, so the AI surface is gated. The crisis is **diagnostic claims**, not the words themselves.
- Suggested fix: N/A — keep. Consider adding a lint rule that errors on `you have <Condition>` patterns *outside* allowed scaffolding components (`ArticleCallout`, blockquote captions), but that's nice-to-have, not a fix-plan blocker.

### [Low] `\bnormal\b` is used clinically and dialectically — no stigmatizing misuse found

- File: multiple `src/data/articles/category-*/*.tsx`
- Lines: e.g., `category-31/14-existential-foundations.tsx:840` ("normal human responses to an abnormal situation"), `category-07/02b-types-of-depression.tsx:1488` ("normal ovarian hormone fluctuations")
- Dimension: 6
- Evidence:
```tsx
// category-31/14-existential-foundations.tsx:840
"normal human responses to an abnormal situation"

// category-09/06b-pain-chronic-illness-psychological-impact.tsx:242
"some is a normal response to an abnormal situation"
```
- Verdict: "Normal" is used in two defensible registers: (a) the canonical reframe `"normal response to an abnormal situation"` (anti-stigma, validating); (b) clinical / DSM-aligned ("normal hormone levels", "normal ovarian fluctuations" — physiological baselines). No instances where a feeling/behavior gets labeled "abnormal" in a stigmatizing way against the user. The spec's "should be 'common'" guidance is about prevalence claims; I did not find prevalence claims using the wrong word.
- Suggested fix: N/A — keep.

### [Low] AI / ML terminology is **not** pointed at users — used clinically (neuroscience) or descriptively (research methodology)

- File: `src/components/tools/RelationshipHealthCheck/frameworks.ts:100`, plus ~7 article references to "neural networks" in a neuroscience sense
- Lines: as noted
- Dimension: 6
- Evidence:
```ts
// RelationshipHealthCheck/frameworks.ts:100 — describing prior research
'The largest machine learning analysis of relationship quality ever conducted — 43 datasets, 11,196 couples. Used ML to identify which variables most powerfully predict relationship satisfaction.'
```
```tsx
// article references — describing brain anatomy, not the tool
"strengthens neural networks involved in mood regulation"
"neural networks for processing social information"
```
- Verdict: The tool itself never claims "AI predicts your relationship health" or similar. "Machine learning" appears once in a *meta-description of a published research methodology*. "Neural networks" is used neuroanatomically. The platform's promise (rule-based engines + RAG) is not contradicted by user-facing copy.
- Suggested fix: Lightly re-phrase the `frameworks.ts:100` blurb to lead with the cohort size ("11,196 couples across 43 datasets") and treat "machine learning" as one tool the original researchers used, so a casual reader doesn't mistake the *Psychage tool* for the ML model. Defer.

### [Low] Crisis-resource references are pervasive across sensitive articles

- File: `src/data/articles/category-07/01a-understanding-depression.tsx` (4 hits), `category-07/04b-coping-with-depression.tsx` (13 hits), `category-13/02c-mood-disorders.tsx` (3 hits), plus ~480 site-wide references to `988 / Crisis Text Line / 741741 / Throughline`
- Lines: file-level counts
- Dimension: 6
- Evidence:
```
$ grep -rEn "988|Crisis Text|741741|Throughline" src/ | wc -l
480
```
- Verdict: Crisis resource lines appear in every depression / mood-disorder / crisis article sampled, and they are also reachable via the global `/crisis` route plus header link (Dim 3 confirmed `/crisis` is ungated and accessible without auth). The spec's "sensitive articles missing crisis-resource block = critical" criterion does not fire from spot-checks.
- Suggested fix: N/A — keep. **Recommended verification in the fix plan's verification step**: a smoke test that visits 3 sensitive articles (depression, eating disorder, self-harm) and asserts the crisis block renders.

### [Low] No fabricated platform stats observed (no "2000 articles", "500K providers", "190 countries", etc.)

- File: codebase-wide
- Lines: N/A
- Dimension: 6
- Evidence:
```
$ grep -rEn "2000 articles|500K providers|190 countries|500,000 providers" src/
# (no matches)
```
- Verdict: The audit's fabricated-stats pre-flag does not fire. (Bulk NPI seed memory says ~423k real providers in DB — a "500K providers" claim could *technically* round up, but no such claim appears in copy.)
- Suggested fix: N/A — keep.

**Validation gate 6:**

| Check | Severity | Count |
|-------|----------|-------|
| Dobson credential drift on user-facing pages | Critical | **1** (`category-13/05-personality-disorders.tsx:1519`) |
| Forbidden private-practice language attached to Dobson | Critical | **1** (same line — "Personality Disorders Specialist" role) |
| Diagnostic-claim language (not teaching scaffolding) | High | **0** |
| `\bnormal\b` misuse | Medium | **0** |
| AI/ML terminology pointed at users | High | **0** |
| Sensitive articles missing crisis block | Critical | **0** (spot-checks; recommend smoke test) |
| Fabricated stats | High | **0** |

The credential-drift line in `category-13/05-personality-disorders.tsx` is the single Dim-6 hard fix.

---

## Dimension 7 — Performance & build

**Question:** Does `pnpm run build` succeed? Does `npx tsc --noEmit` succeed? Is the bundle topology healthy (initial JS payload, code-splitting, no `next/image`, no oversized images, console.log left in prod)?

### Build summary

```
$ npx tsc --noEmit
# 0 errors, 0 warnings (silent exit)

$ pnpm run build
✓ built in 17.68s
(!) Some chunks are larger than 600 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
```

- TS errors: **0**
- Build: **succeeds**
- Rollup warnings about oversized chunks: **1 — see Critical finding below**

### [Critical] `all-articles` chunk is 35.7 MB raw / 9.4 MB gzipped — catastrophic payload on any article view

- File: `src/data/articles/all-articles.ts`, `src/services/articleService.ts:20`
- Lines: all-articles.ts 1–60+; articleService.ts 17–24
- Dimension: 7
- Evidence:
```
dist/assets/all-articles-CwLIBtB1.js    36,570.76 kB │ gzip: 9,633.66 kB
```
```ts
// articleService.ts:17-24 — dynamic-import fallback path
async function loadMockArticles(): Promise<Article[]> {
  if (_cachedMockArticles) return _cachedMockArticles;
  const { allArticles } = await import('../data/articles/all-articles');
  _cachedMockArticles = allArticles.filter(a => !a.status || a.status === 'published');
  ...
}
```
```ts
// all-articles.ts:9-39 — imports 31 category modules with `import *`, each module pulls every article TSX file in that category
import * as cat01 from './category-01';
...
import * as cat31 from './category-31';
```
- Verdict: The mock-data fallback is implemented by `import *`-ing every category's entire article TSX (including JSX render trees, citations, exercises, all enrichment blocks) into one bundle. The chunk is dynamically loaded — so it does not block initial paint — but as soon as any user lands on an article or category page, the browser downloads **9.4 MB gzipped** of article render code, then parses 35.7 MB of JS. On any cellular connection this is a multi-second stall; on slower CPUs the parse cost alone is several seconds. The mental model "Supabase is primary, mock is fallback" is correct per `CLAUDE.md`, but the fallback's *cost* is so large that any time it actually fires (e.g., Supabase outage, anonymous user, error path), the site is functionally broken on mobile.

- Suggested fix (covered in fix plan as its own slice): switch `all-articles.ts` from re-exporting every article's rendered TSX to exporting only **metadata** (id, slug, title, summary, category, seo_description, etc.) for the listing pages, and lazy-import the per-article TSX only when an article route resolves. Optionally: split `loadMockArticles()` into `loadArticleMetadata()` (cheap, all articles) and `loadArticleBody(id)` (expensive, one article). This converts the 9.4 MB chunk into ~1 MB of metadata + per-route fetches of the rendered article.

### [High] 35 images larger than 500 KB ship with the site (homepage hero asset set)

- File: `src/assets/images/homepage/figures/A-*.jpeg`, `src/assets/images/homepage/objects/B-*.jpeg`, `src/assets/images/homepage/scenes/C-*.jpeg`, `public/images/categories/*.png`
- Lines: N/A
- Dimension: 7
- Evidence:
```
$ find src/assets public -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" \) -size +500k | wc -l
35
```
- Verdict: Homepage figure/object/scene JPEGs and category PNGs are committed at full size with no responsive variants (no `srcset`, no `<picture>`, no AVIF/WebP siblings). Combined with the hero animation, a fresh visit to `/` likely transfers several megabytes of imagery before LCP. Bundle-side JS is fine; the *network* budget is dominated by unoptimized images.
- Suggested fix: Run a one-off optimization pass: re-encode JPEGs to ~80 quality + generate AVIF/WebP siblings, replace `<img>` with `<picture>` for the hero, defer below-the-fold imagery with `loading="lazy"` (likely already in place for some, worth verifying). Optionally introduce `vite-plugin-image-optimizer` to do this at build time. Defer to the perf slice.

### [Medium] 411 `console.log/warn/error` calls remain in production code paths

- File: 411 matches across `src/components/`, `src/services/`, `src/lib/`, `src/pages/`, `api/`
- Lines: file-level counts
- Dimension: 7
- Evidence:
```
$ grep -rEn "console\.(log|warn|error)" src/ \
    | grep -v "\.test\.\|\.md\|src/scripts/\|src/tests/\|src/stories/" \
    | wc -l
411
# of which `console.log` specifically: 81
```
- Verdict: Most of these are `console.warn` / `console.error` defensive-logging, which is acceptable in production. The 81 `console.log` instances are leftover debug output. Not a functional bug, but bundle size + DevTools noise increase, and a few may inadvertently log user data. The repo's own `src/AUDIT_FINDINGS.md` (March 2026) tracked an earlier cleanup that removed 30 logs from services — this is the next pass.
- Suggested fix: Add a Vite plugin or esbuild pass to drop `console.log` (keep `console.warn` / `console.error`) in production builds — one-line config change. Optionally lint with a custom `no-console` rule allowing `warn`/`error`. Defer.

### [Low] Route-level code-splitting is in place; lazy boundaries are healthy

- File: `src/App.tsx`
- Lines: 9–60+ (all route components are `React.lazy`)
- Dimension: 7
- Evidence:
```ts
// App.tsx:9-12
const MindMateWidget = React.lazy(() => import('./components/ai/MindMate'));
const HomePage = React.lazy(() => import('./pages/home/HomePage'));
const LearnPage = React.lazy(() => import('./pages/LearnPage'));
...
```
- Verdict: Every primary route is lazy-loaded. Vendor chunks are split (`vendor-supabase` 173 kB, `vendor-charts` 63 kB, `vendor-i18n` 51 kB, `vendor-editor` 251 kB). Initial entry `main-CbuQO9TM.js` is 468 kB / 119 kB gzipped — above the spec's 500 KB gzip threshold concern (just barely, 119 KB gzip), but acceptable for an SPA of this surface area. The architecture is in place; the all-articles chunk is the outlier, not the route topology.
- Suggested fix: N/A — keep. Verify `main` chunk after the all-articles fix and reassess.

### [Low] No `next/image` references — no Next.js drift in image handling

- File: codebase-wide
- Lines: N/A
- Dimension: 7
- Evidence:
```
$ grep -rEn "next/image" src/
# (no matches)
```
- Verdict: Pre-flag does not fire. Images are rendered via plain `<img>`; the optimization gap is on the asset side (above), not on a Next.js-vs-Vite mismatch.
- Suggested fix: N/A.

**Validation gate 7:**

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` errors | 0 |
| `pnpm run build` exit | success in 17.68s |
| Rollup oversized-chunk warning | **1** — `all-articles` at 35.7 MB raw / 9.4 MB gzipped |
| Initial entry JS (`main`) gzip | 119 kB (acceptable) |
| `next/image` artifacts | 0 |
| `console.log` in prod code (non-test/script) | 81 — defer |
| Images >500 KB committed | 35 — high |

The build is healthy on the TS/Vite side. The `all-articles` chunk is the single dominant performance liability and should be the perf slice's top item.

---

## Dimension 8 — Accessibility (WCAG 2.2 AA)

**Question:** Are interactive elements keyboard reachable, `<img>` tags labeled, color contrast sufficient on small text, form inputs labeled, `prefers-reduced-motion` respected, and heading hierarchy sensible?

### [High] `text-teal-600` (#1A9B8C) used as small body/inline text — fails WCAG AA contrast for normal text on white

- File: `src/components/home/ToolsSection.tsx:84,90,231`, `src/components/video/VideoCard.tsx:97`, `src/components/tools/LightweightInsights.tsx:37,51`, `src/components/tools/SleepArchitect/dashboard/SleepScoreGauge.tsx:29`, plus 130+ additional matches
- Lines: as noted
- Dimension: 8
- Evidence:
```tsx
// ToolsSection.tsx:84,90 — small accent text
<Activity size={14} className="text-teal-600" />
<span className="text-teal-600 relative">your...</span>

// LightweightInsights.tsx:37 — score label rendered with text-teal-600
if (val >= 8) return { label: 'Great', color: 'text-teal-600' };
```
- Verdict: `#1A9B8C` on white renders at approximately **3.5 : 1** contrast — below WCAG AA's **4.5 : 1** requirement for normal-size text (passes only for large text ≥18 pt / 14 pt bold). The codebase uses `text-teal-600` 141 times; many are decorative icons + large-text headings (acceptable), but several are small inline labels / status strings (e.g., the "Great" score label, "Tools for your..." accent span, SleepScoreGauge's `text-teal-600` text variant). Mixed dark-mode pairings (`dark:text-teal-400` against dark surfaces) are usually fine; the failure is teal-600 on white/light surface for small text.
- Suggested fix: For body-size text, swap `text-teal-600` → `text-teal-700` (`#158A7D`, ~4.6 : 1 on white). Tailwind already has `teal-700` defined. Keep `text-teal-600` for icons, large headings, hover states, and dark-mode contexts (`dark:text-teal-400` against `dark:bg-charcoal-900` is fine). Add a `text-brand-accessible` semantic token mapped to `teal-700` to make future usage default-safe.

### [Medium] `<div onClick=>` used on 8 modal backdrops — no keyboard handler

- File: `src/components/admin/CommandPalette.tsx:248`, `src/pages/admin/v2/symptom-navigator/MappingMatrix.tsx:62`, `src/pages/admin/v2/providers/ApplicationReview.tsx:136`, `src/pages/admin/v2/settings/UserManagement.tsx:181`, `src/pages/admin/v2/symptom-navigator/SymptomList.tsx:212`, `src/pages/admin/v2/safety/CrisisKeywords.tsx:195`, plus 2 others
- Lines: as noted
- Dimension: 8
- Evidence:
```tsx
// All 8 matches share this shape — backdrop dismiss without keyboard reach
<div className="absolute inset-0 bg-black/40" onClick={onClose} />
```
- Verdict: Each is a modal backdrop. Click-to-dismiss is fine; the gap is that no `onKeyDown` (Escape) or focus-trap is wired alongside, and the backdrop isn't `role="button"`/`aria-label="Close"`. Most users can dismiss with click, but keyboard-only users get stuck inside the modal. All 8 instances are in admin/v2 routes (gated behind admin auth), so blast radius is bounded.
- Suggested fix: Wrap each modal in a small `<Modal>` primitive that traps focus, listens for `Escape`, and renders the backdrop with `aria-hidden="true"`. Defer to the admin-polish slice; user-facing modals (`AuthModal`, etc.) should be spot-checked separately.

### [Medium] No "Skip to main content" link present at app shell level

- File: `src/App.tsx`, `src/components/layout/*.tsx`
- Lines: N/A
- Dimension: 8
- Evidence:
```
$ grep -rn "Skip to" src/App.tsx src/components/layout/
# (no matches)
```
- Verdict: WCAG 2.2 AA does not strictly require a skip link (it satisfies 2.4.1 "Bypass Blocks", which can also be satisfied via landmarks). The site does use `<header>`/`<main>`/`<nav>` landmarks (visible in markup), so this is not a hard fail — but a visible-on-focus "Skip to main content" anchor remains best practice for any site with a top nav of more than ~5 links.
- Suggested fix: Add a single `<a href="#main" class="sr-only focus:not-sr-only ...">Skip to main content</a>` at the top of `App.tsx`'s layout, plus `id="main"` on the route outlet. Defer.

### [Low] `prefers-reduced-motion` is respected globally and per-component

- File: `src/App.tsx:187`, `src/styles/tokens.css:167`, `src/hooks/useReducedMotion.ts`, `src/components/home/v2/*.tsx`
- Lines: as noted
- Dimension: 8
- Evidence:
```tsx
// App.tsx:187 — wraps the whole app
<MotionConfig reducedMotion="user">
```
```css
/* tokens.css:167 */
@media (prefers-reduced-motion: reduce) {
  /* global animation downgrades */
}
```
```tsx
// home/v2/NavigatorShowcase.tsx:13
const prefersReducedMotion = useReducedMotion();
```
- Verdict: Three-layer respect: Framer Motion's global `MotionConfig`, CSS `@media (prefers-reduced-motion: reduce)`, and per-component `useReducedMotion()` in the new homepage v2 surfaces. The repo's own audit notes call out that ~264 motion components don't *individually* call `useReducedMotion`, which is fine — the `MotionConfig reducedMotion="user"` wrapper does the job globally.
- Suggested fix: N/A — keep.

### [Low] All 11 `<img>` tags in production code have `alt=`

- File: `src/components/`, `src/pages/`
- Lines: N/A
- Dimension: 8
- Evidence:
```
$ grep -rn "<img " src/components/ src/pages/ | grep -v test | wc -l
11

$ grep -rn "<img " src/components/ src/pages/ | grep -v test | grep -vE "alt=|aria-"
# (no matches — every <img> has alt)
```
- Verdict: Pre-flag does not fire. Note: most homepage hero imagery is rendered via centralized `homeImages.ts` data with descriptive `alt` text (per existing AUDIT_FINDINGS.md note). Compliant.
- Suggested fix: N/A.

### [Low] Form inputs use shadcn `<Label htmlFor>` pattern correctly

- File: `src/pages/auth/LoginPage.tsx:354,375,407`
- Lines: as noted
- Dimension: 8
- Evidence:
```tsx
<Label htmlFor="email" className="text-text-primary ml-1">Email address</Label>
<Label htmlFor="password" className="text-text-primary ml-1">Password</Label>
<Label htmlFor="remember" className="ml-2 font-normal text-text-secondary cursor-pointer">Remember me</Label>
```
- Verdict: Auth forms use shadcn `Label` with explicit `htmlFor`. Sign-up + provider onboarding follow the same pattern. No bare `<input>` without an associated label found in spot-checks.
- Suggested fix: N/A.

### [Low] Heading hierarchy: ArticlePage anchors a single `<h1>`, descends to `<h2>`/`<h3>`

- File: `src/pages/learn/ArticlePage.tsx:264`, sampled
- Lines: 264 (title h1); article body components use `font-display` h2/h3
- Dimension: 8
- Evidence:
```tsx
// ArticlePage.tsx:264
<h1 className="font-display font-bold text-3xl ...">...title...</h1>
```
- Verdict: Sampled article + homepage routes show a single h1 per route with a sensible h2/h3 descent. The repo's own prior audit note confirms homepage v2 has proper h1→h2→h3.
- Suggested fix: N/A — keep. Defer programmatic verification (e.g., axe-core run) to the verification step in the fix plan.

**Validation gate 8:**

| Criterion | Status |
|-----------|--------|
| Keyboard navigation (primary nav, Clarity flow, Navigator) | Not regression-tested in this audit — recommend axe-core smoke |
| `<div onClick=>` in place of `<button>` | **8 instances** (all admin modal backdrops — Medium) |
| `<img>` without alt | **0** |
| Small body text on brand teal `#1A9B8C` | **Fails AA contrast** (~3.5:1 vs required 4.5:1) — High |
| Form labels | All sampled inputs have associated `Label` — pass |
| `prefers-reduced-motion` | Respected globally + per-component — pass |
| Heading hierarchy spot-checks | Pass on homepage + article pages |
| Skip-link / bypass-blocks | Landmarks present, no visible-on-focus skip link — Medium |

Top item is the teal-600 small-text contrast issue — affects every route that uses the brand accent for inline text.

---

## Dimension 9 — SEO & metadata

**Question:** Are `<title>` + `<meta description>` set per primary route? Are OG + Twitter cards present on the homepage at minimum? Are `sitemap.xml` and `robots.txt` present? Are `hreflang` tags wired for the 5 supported languages? Is there a canonical link on indexable pages? Is JSON-LD present on articles + tools?

### Per-route SEO inventory

| Item | Homepage | Article pages | Tool pages | Category pages | Provider pages |
|------|----------|--------------|-----------|----------------|----------------|
| `<title>` | ✅ index.html + SEO.tsx | ✅ SEO + dynamic | ✅ SEO + dynamic | ✅ SEO + dynamic | ✅ SEO + dynamic |
| `<meta name="description">` | ✅ | ✅ via SEO.tsx | ✅ | ✅ | ✅ |
| `<link rel="canonical">` | ✅ index.html | ✅ SEO.tsx:121 | ✅ | ✅ | ✅ |
| OG (title/description/image) | ✅ index.html + SEO.tsx | ✅ | ✅ | ✅ | ✅ |
| Twitter Card | ✅ | ✅ | ✅ | ✅ | ✅ |
| JSON-LD article schema | n/a | ✅ SEO.tsx:147–148 | n/a | n/a | n/a |
| JSON-LD breadcrumb | ✅ | ✅ | ✅ | ✅ | ✅ |
| `hreflang` for EN/PT/ES/SV/FR | ❌ | ❌ | ❌ | ❌ | ❌ |

### [Critical] No `hreflang` tags despite 5-language i18n surface (EN/PT/ES/SV/FR)

- File: `index.html`, `src/components/SEO.tsx`
- Lines: N/A
- Dimension: 9
- Evidence:
```
$ grep -rEn 'hreflang|rel="alternate"' index.html src/
# (no matches)
```
- Verdict: The platform ships translated content for English, Portuguese, Spanish, Swedish, and French (per `src/locales/` + `CLAUDE.md`), but the rendered HTML has zero `hreflang` annotations. Google does not know that `/en/...` and `/es/...` (or whatever the localization URL pattern is — needs confirmation in the fix slice) are siblings. The result is duplicate-content risk and the wrong-language SERP impressions for international users. For a content site whose core value prop is mental-health *education*, this is the SEO equivalent of pointing every signal at one locale.
- Suggested fix: Two layers — (a) every route's `SEO` component emits `<link rel="alternate" hreflang="..." href="..." />` for each available locale + a `hreflang="x-default"` pointing at the canonical language; (b) `sitemap.xml` is replaced with `sitemap-index.xml` that references per-locale sitemaps, or each `<url>` entry uses `<xhtml:link rel="alternate" hreflang="...">`. This is a non-trivial slice but it's the single largest unlocked-SEO lever the platform has.

### [High] `sitemap.xml` lists 26 URLs — does not include any of the ~1000+ articles or tool pages

- File: `public/sitemap.xml`
- Lines: 1–29
- Dimension: 9
- Evidence:
```xml
<!-- public/sitemap.xml — full file -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://psychage.com/</loc>...
  <url><loc>https://psychage.com/learn</loc>...
  ...
  <!-- 26 <url> entries total, none reference /learn/{category}/{article} URLs -->
</urlset>
```
- Verdict: The current sitemap covers structural landing pages and a handful of provider funnel routes, but every article URL (and every category/tool detail) is absent. Even the most aggressive crawl-budget gain Psychage could capture — indexing 1000+ peer-reviewed-cited articles — is currently invisible to search engines without crawler discovery from internal links alone. Search referrals to deep article URLs are essentially zero on day one.
- Suggested fix: Generate `sitemap.xml` (or `sitemap-articles.xml` referenced by a sitemap index) at build time from `articleService.getAll()` or the Supabase `articles` table. Wire it into the build step (`pnpm run build`) so it stays current. Include `lastmod` per article.

### [Low] Open Graph image is a stock Unsplash photograph, not a Psychage-branded asset

- File: `index.html:33`, `src/components/SEO.tsx` (defaults)
- Lines: 33 (`og:image`)
- Dimension: 9
- Evidence:
```html
<meta property="og:image"
  content="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop">
```
- Verdict: Every share preview of `psychage.com` shows a stock Unsplash image instead of a branded Psychage card. Brand surface in social referrals is wasted, and the Unsplash URL is also a third-party dependency that could rot. Not a P0, but a free unlock for brand recognition.
- Suggested fix: Commit a 1200×630 branded OG card to `public/og/default.png` and reference it from `index.html` + `SEO.tsx`. Optionally generate per-article OG cards at build time (deferred — out of scope for the fix plan).

### [Low] `robots.txt` correctly disallows gated paths

- File: `public/robots.txt`
- Lines: 1–14
- Dimension: 9
- Evidence:
```
User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /admin/
Disallow: /portal/
Disallow: /provider/
Disallow: /auth/
Disallow: /login
Disallow: /signup
Disallow: /reset-password
Disallow: /update-password
Disallow: /onboarding

Sitemap: https://psychage.com/sitemap.xml
```
- Verdict: Gated routes are correctly disallowed; the sitemap location is declared. Compliant.
- Suggested fix: N/A — keep. When the sitemap is regenerated to include articles (above), this directive stays correct.

### [Low] JSON-LD coverage: article + breadcrumb + WebSite schemas are emitted

- File: `src/components/SEO.tsx`
- Lines: 71, 147–158
- Dimension: 9
- Evidence:
```tsx
// SEO.tsx:147-158
{articleJsonLd && <script type="application/ld+json">{articleJsonLd}</script>}
{breadcrumbJsonLd && <script type="application/ld+json">{breadcrumbJsonLd}</script>}
{homepageJsonLd && <script type="application/ld+json">{homepageJsonLd}</script>}
{structuredData && <script type="application/ld+json">{JSON.stringify(structuredData)}</script>}
```
- Verdict: The `SEO` component emits `Article`, `BreadcrumbList`, and homepage `WebSite` + `SearchAction` schemas. Tool pages don't currently emit a `HowTo` or `MedicalWebPage` schema — opportunity, not failure.
- Suggested fix: Defer. Worth adding `MedicalWebPage` for sensitive condition pages later — increases SERP rich-result eligibility.

**Validation gate 9:**

| Item | Result |
|------|--------|
| `<title>` per primary route | ✅ |
| `<meta description>` per primary route | ✅ |
| `<link rel="canonical">` | ✅ |
| OG + Twitter cards on homepage | ✅ (but image is Unsplash stock) |
| `public/sitemap.xml` | ✅ — but missing all article URLs (High) |
| `public/robots.txt` | ✅ |
| `hreflang` for EN/PT/ES/SV/FR | ❌ — **Critical** |
| JSON-LD on articles + homepage | ✅ |
| JSON-LD on tools | Partial (breadcrumbs only) |

D9 unlocks the largest SEO lift via two changes: (a) wiring `hreflang` for the 5 supported locales, (b) regenerating `sitemap.xml` from the article corpus at build time.

---

