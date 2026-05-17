# Psychage Website Fix Plan — 2026-05-17

## Goal

Resolve every **Critical** and **High** finding from [`AUDIT_REPORT_2026-05-17.md`](AUDIT_REPORT_2026-05-17.md) — 6 Critical + 9 High = 15 fixes — in a single second-session execution. Plan is vertical-sliced so each slice can be picked up, verified, and merged independently, and so a cold Claude Code session can run the slices end-to-end without re-deriving context.

## Context

- Repo: `/Users/raiyanabdullah/Desktop/psychage-v2`
- Branch: `main`
- Audit HEAD: `c3f2c06 fix(dashboard): repair data layer + UX on /dashboard`
- Stack: Vite 5 + React 18 + TypeScript + Tailwind + Supabase + Anthropic Claude (server-side via `api/ai/chat.ts`). `pnpm@10.25.0`.
- The audit report is the source of truth — re-read it before starting if any finding's evidence is needed in finer detail.
- Two cf-proxy/ files exist as a Cloudflare Worker reverse proxy and are not in scope.
- The Symptom Navigator (`src/lib/navigator/**`) is a privacy invariant (75% confidence cap hard-coded, zero symptom data leaves the client). Do not touch it.

## Slice ordering rationale

Slices are ordered Criticality → Blast-radius. The first three slices contain the public-facing or privacy-blast risks (auth gate, credential drift, payload catastrophe). The middle three are SEO + brand correctness with measurable impact. The last two are pure perf/a11y polish. **Slice 1 must ship first** — it closes the unauthenticated AI endpoint.

---

## Slice 1 — MindMate API auth gate + dead Next.js cleanup

### Touches

- `api/ai/chat.ts`
- `api/ai/feedback.ts`
- `api/ai/health.ts`
- `src/app/` (entire directory — delete)
- `api/ai/chat 2.js` (stale build artifact — delete)
- `scripts/build-api.*` or equivalent (preflight that cleans `api/**/*.js` before recompile)
- `src/tests/ai/integration.test.ts` — re-point any import that targeted `src/app/api/ai/chat/route.ts` to the live `api/ai/chat.ts` handler
- `package.json` — only if dead deps need to be removed (`@google/genai`); confirm zero imports first

### Does

1. Add a Supabase JWT validation step at the top of `api/ai/chat.ts` (after env preflight, before rate-limit check):
   - Read `Authorization: Bearer <token>` from request headers
   - Initialize a Supabase admin client with `SUPABASE_SERVICE_ROLE_KEY`
   - Call `supabase.auth.getUser(token)` — reject `401` if no user, `401` if `auth.getUser` errors
   - Tighten the existing in-memory `rateLimitStore` to key on `user.id` instead of IP (keep IP fallback only if no token is present and the endpoint must remain anonymous — recommend it does NOT)
2. Apply the same Supabase JWT validation pattern to `api/ai/feedback.ts` and `api/ai/health.ts`. (Feedback must always require a user; health may be left anonymous if it returns no user-scoped data — read the file first.)
3. Update the client-side caller (`src/features/chat/**`, `src/services/chatService.ts`, or whichever module sends the `POST /api/ai/chat`) to attach `Authorization: Bearer ${session.access_token}` from `supabase.auth.getSession()`.
4. Delete the entire `src/app/` directory (10 dead Next.js App Router files using `process.env` + bracket-routing syntax inside a Vite project).
5. Update `src/tests/ai/integration.test.ts:15` to import from `api/ai/chat.ts` instead of the deleted route module, or stub the import.
6. Delete the file literally named `api/ai/chat 2.js` (574 KB Finder-rename collision artifact).
7. Add a one-liner preflight to whichever script compiles serverless functions: clean `api/**/*.js` (and `.map`) before recompiling, so duplicate-named build artifacts cannot persist. If no build script writes JS into `api/`, skip this and just delete the file.
8. **Optional cleanup (only if zero `from '@google/genai'` imports exist):** remove `@google/genai` from `package.json` deps. Verify with `grep -rE "from\\s+['\"]@google/genai" src/`. Do NOT run `pnpm install` — leave the lockfile cleanup for the user.

### Maps to findings

- [Critical, D1] Dead Next.js App Router routes left in `src/app/api/**`
- [Critical, D3] `/api/ai/chat` POST endpoint has no authentication gate
- [Critical, D3] Dead `src/app/api/navigator/save-results/route.ts` would have shipped unauthenticated health-data write
- [High, D1] Stale build artifact `api/ai/chat 2.js` (574 KB) on disk
- [High, D3] `/api/ai/feedback` and `/api/ai/health` lack visible auth context
- [Low, D1] Dead dependency `@google/genai` in `package.json` (optional)

### Verifies

1. `pnpm run build` succeeds; `npx tsc --noEmit` returns 0 errors.
2. `curl -X POST https://<staging>/api/ai/chat -H "Content-Type: application/json" -d '{"messages":[{"role":"user","content":"hi"}]}'` returns `401` (or the agreed code) — no Anthropic call fires.
3. The same curl with a valid `Authorization: Bearer <session_token>` returns a streamed reply.
4. `find src/app -type f` returns nothing.
5. `ls "api/ai/chat 2.js" 2>&1` returns "No such file or directory".
6. In the UI: log in → open MindMate → receive a reply (regression-test the streaming path).

### Out of scope

- Switching the in-memory rate-limit store to Redis/Upstash — the existing in-memory store is acceptable for now; only the *key* changes to per-user.
- Auditing whether `SUPABASE_SERVICE_ROLE_KEY` is required by every retrieval call inside `api/ai/chat.ts` (it currently is — keep as-is).
- Rewriting the Anthropic streaming SSE encoder — leave `encodeSSE` and `lastStreamUsage` untouched.

---

## Slice 2 — Dr. Lena Dobson credential fix

### Touches

- `src/data/articles/category-13/05-personality-disorders.tsx` (line 1519 region)

### Does

Replace the two violating props on the `<QuoteBlock>`:

```tsx
// BEFORE (lines ~1519-1522)
<QuoteBlock
  quote="The deepest human need is to be seen and accepted for who we truly are..."
  attribution="Dr. Lena Dobson, PsyD"
  role="Clinical Psychologist, Personality Disorders Specialist"
/>

// AFTER
<QuoteBlock
  quote="The deepest human need is to be seen and accepted for who we truly are..."
  attribution="Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology"
  role="Clinical Neuropsychology"
/>
```

Only edit this single block. Do not sweep "Dobson" elsewhere — every other reference in the codebase already uses the canonical credential (audit verified via the Low-severity counter-finding `src/data/authors.ts:31-35` and 22 other locations).

### Maps to findings

- [Critical, D6] Dr. Lena Dobson is mis-credentialed as "PsyD" + "Personality Disorders Specialist" in published article

### Verifies

1. `grep -nE 'Dobson, PsyD|Personality Disorders Specialist' src/` returns 0 matches.
2. `grep -rn "Lena Dobson" src/data/articles/category-13/05-personality-disorders.tsx` shows only the canonical credential.
3. In the UI: open the personality-disorders article, scroll to the avoidant-personality-disorder quote, confirm "Ph.D. in Clinical Neuropsychology" renders.

### Out of scope

- Touching any other `category-*/*.tsx` (audit confirms they're clean).
- Updating the system prompt that mentions Dr. Dobson — `src/app/api/ai/chat/route.ts:370` is in the directory being deleted by Slice 1; live MindMate prompt lives in `src/lib/ai/llm.ts` (verify before assuming it needs an edit).

---

## Slice 3 — `all-articles` bundle decomposition

### Touches

- `src/data/articles/all-articles.ts` (rewrite as metadata-only export)
- `src/services/articleService.ts:17-24` (`loadMockArticles`)
- Possibly `src/data/articles/category-NN/index.ts` files (only if they currently re-export every article body and need to be split into `meta.ts` + `body.ts`)
- `src/services/articleService.ts` — add a new `loadArticleBodyById(id: string)` function that lazy-imports a single article's TSX module

### Does

1. Decompose `src/data/articles/all-articles.ts` from the current `import * as cat01 from './category-01'; ... allArticles = [...]` pattern into a metadata-only export. Each article entry should be `{ id, slug, title, summary, category, seoDescription, status, publishedAt, ... }` — anything used by listing UIs, breadcrumbs, search, and the admin panel — but **not** the `body` / `content` / rendered `<JSX />` tree.
2. Add a new lazy-loader in `articleService.ts` that imports a single article's body on demand:
   ```ts
   // Pseudocode — the actual key depends on how category modules export
   async function loadArticleBodyById(id: string) {
     const [, cat, slug] = id.match(/^CAT(\d+)-(\d+)/) || []; // or whatever the ID convention is — verify against article-architecture.ts
     const mod = await import(`../data/articles/category-${cat}/${slug}.tsx`);
     return mod.default;
   }
   ```
   Vite supports dynamic-import string interpolation with explicit prefixes; verify by reading any existing dynamic-import patterns in the repo.
3. Update the `ArticleDetail` / `ArticleBreakdown` / `ArticleList` consumers so listing pages use metadata only and the detail view triggers `loadArticleBodyById` after route resolution.
4. Confirm with `pnpm run build` that the post-fix `dist/assets/*.js` no longer shows any chunk above 1 MB gzipped (target: largest article-body chunk < 500 KB gzipped).
5. **Do NOT delete the per-category `index.ts` aggregators yet** — they may still be referenced by admin panel pages. Verify with `grep -rE "from\s+['\"].*data/articles/category-[0-9]+'" src/` before deciding to slim them down.

### Maps to findings

- [Critical, D7] `all-articles` chunk is 35.7 MB raw / 9.4 MB gzipped — catastrophic payload on any article view

### Verifies

1. `pnpm run build` succeeds; Rollup's "Some chunks are larger than 600 kB" warning either disappears or names a chunk under 1.5 MB raw.
2. `ls -la dist/assets/ | sort -k5 -n -r | head -10` — confirm no entry exceeds 2 MB raw or 600 KB gzipped (run `gzip -l` per file to confirm).
3. Open the build's `dist/assets/all-articles-*.js` (or whatever the new metadata chunk is named): confirm the file does **not** contain rendered JSX strings like `React.createElement` for article body content.
4. In the UI: open `/learn` → listing renders → open one article → article body renders. Confirm via the Network tab that the article-body chunk is fetched only after route resolution.
5. Run the existing E2E test (`pnpm run test:e2e`) if it covers article navigation, or hand-test 3 articles across 3 different categories.

### Out of scope

- Migrating the article store from TSX files to MDX / Supabase / Sanity. The cascade stays `Supabase → mock`. This slice changes only the *loader shape*.
- Touching the PEAF quality framework in `src/lib/article-framework/`.
- Editing any individual article's content.

---

## Slice 4 — `hreflang` + sitemap regeneration

### Touches

- `src/components/SEO.tsx` (emit `<link rel="alternate" hreflang="..." />` per locale)
- `public/sitemap.xml` → regenerate from article corpus at build time
- A new build script: `scripts/generate-sitemap.ts` (or extend the existing build pipeline)
- `package.json` — add a `prebuild` or `build` step that runs the sitemap generator
- `index.html` (if homepage-level `hreflang` is also needed — most setups also do it server-side per page, so SEO.tsx is sufficient)

### Does

1. **Determine the locale URL pattern first.** Read `src/locales/`, the i18next config, and the router. Most likely options:
   - Path prefix: `/en/...`, `/es/...` (cleanest for SEO)
   - Subdomain: `es.psychage.com` (more infra, not assumed here)
   - Query param: `?lang=es` (not SEO-ideal)
   If no per-locale URL pattern exists in routing, the audit's "5-language i18n" claim is *client-side language switching only*, in which case `hreflang` is not the right fix — the right fix is to introduce a per-locale URL pattern first, which is a separate slice. **Read the router before designing this slice's emission shape.**
2. Once the URL shape is confirmed, update `SEO.tsx` to render one `<link rel="alternate" hreflang="en|pt|es|sv|fr" href="..." />` per locale, plus `hreflang="x-default"` pointing at the EN canonical.
3. Write a Node/TS script that:
   - Reads the article corpus (Supabase via service-role key in build env, or the now-metadata-only `all-articles.ts` from Slice 3)
   - Emits `<url><loc>https://psychage.com/learn/{cat}/{slug}</loc><lastmod>{updatedAt}</lastmod>{<xhtml:link rel="alternate" hreflang="..." href="..." />}*</url>` for every published article
   - Adds tool URLs (`/tools/*`), category landing pages, and the existing 26 structural URLs
   - Writes the result to `public/sitemap.xml`
4. Add the script to `pnpm run build` as a prebuild step so the sitemap stays current.
5. Keep `robots.txt`'s `Sitemap: https://psychage.com/sitemap.xml` directive — it remains correct.

### Maps to findings

- [Critical, D9] No `hreflang` tags despite 5-language i18n surface (EN/PT/ES/SV/FR)
- [High, D9] `sitemap.xml` lists 26 URLs — does not include any of the ~1000+ articles or tool pages

### Verifies

1. After build: `grep -c "<url>" public/sitemap.xml` returns ≥ 1000.
2. `xmllint --noout public/sitemap.xml` (or any XML validator) reports valid XML.
3. View-source on a rendered article: 5 `<link rel="alternate" hreflang="...">` tags + 1 `hreflang="x-default"`.
4. Google Search Console's URL inspection (manual, after deploy) recognizes the alternates — not testable from the second Claude session; document for the user.
5. `pnpm run build` exits clean with the new prebuild step.

### Out of scope

- Translating any content (i18n strings already exist).
- Migrating the router to a per-locale path prefix if it currently uses only client-side language switching — that is a separate, larger slice.
- Generating per-article OG cards.
- Implementing structured-data enhancements (the audit logged JSON-LD as Low — defer).

---

## Slice 5 — Dead-link repair (clarity-score + provider/dashboard)

### Touches

- `src/components/dashboard/*.tsx` — wherever `to="/tools/clarity-score"` is rendered in dashboard history + assessment-results UI (audit will have named the exact files; re-grep before editing)
- `src/components/providers/ClaimForm.tsx` or the file containing the `/provider/dashboard` link
- `src/App.tsx` — add `/provider/dashboard` → `/portal` redirect to the existing redirect block at line 372

### Does

1. `grep -rEn 'to="/tools/clarity-score"' src/` — replace every match with `to="/clarity-score"` (the live route).
2. `grep -rEn 'to="/provider/dashboard"' src/` — replace every match with `to="/portal"`.
3. In `src/App.tsx`, inside the existing redirect block (`/provider` → `/portal`, `/provider/profile` → `/portal/profile`, etc.), add the missing entry: `<Route path="/provider/dashboard" element={<Navigate to="/portal" replace />} />`. This is a belt-and-suspenders fix that also covers external inbound traffic.
4. Verify no other dead `to=` / `href=` exists by running `grep -rEn '<(Link|NavLink|a)[^>]+(to|href)="/' src/` and cross-checking each unique target against the route table in `src/App.tsx`.

### Maps to findings

- [High, D2] Dead link to `/tools/clarity-score` from dashboard history + assessment results
- [High, D2] Dead link `/provider/dashboard` from claim form

### Verifies

1. `grep -rEn 'to="/tools/clarity-score"|to="/provider/dashboard"' src/` returns 0 matches.
2. In the UI: log in as a patient → dashboard → click the clarity-score history card → lands on `/clarity-score`.
3. In the UI: visit the provider claim form, click the "go to dashboard" link → lands on `/portal`.

### Out of scope

- The 8 orphan page modules listed in Dim 2 — those are Medium severity and live in the Deferred section.
- The duplicate `/category/:category` route — Medium, deferred.

---

## Slice 6 — Brand typography reconciliation

### Touches

- `src/styles/tokens.css` (`--font-display` line)
- `index.html` (Google Fonts `<link>` and CSP `connect-src` for font hosts)
- `tailwind.config.js` (`fontFamily.display`)
- `src/components/ui/Logo.tsx` (remove inline Jost `@import`)
- Optionally `BRAND.md` / `docs/brand.md` — document the final font set (defer if no such doc exists)

### Does

This slice has two decisions the user must confirm before execution. **Do not start coding until the user picks a path.**

**Decision A — Display typeface:**
Option A1: **Keep Plus Jakarta Sans** and update the brand spec to acknowledge it as the official display face. (Recommended — it's already shipped, well-paired with Inter, and reverting would be a regression.) → Only Slice 6's *Jost* removal is needed.
Option A2: **Drop Plus Jakarta Sans** and consolidate on Inter for display use. → Remove from `tokens.css`, `tailwind.config.js`, `index.html`'s Google Fonts URL; replace `font-display` usages with `font-sans` weight variants.

**Decision B — Logo wordmark:**
Option B1: **Drop Jost, use the existing display face for the wordmark.** (Recommended — eliminates the runtime `@import` and the fourth font.) → Replace `Logo.tsx`'s inline `<style>` with a Tailwind class using the existing display family at the chosen weight.
Option B2: **Keep Jost as a deliberate wordmark.** → Move the Jost font load from `Logo.tsx`'s inline `@import` to the centralized `<link>` in `index.html` so it loads once and is preconnected.

Once decisions land, execute the corresponding edits. Make no other typography changes.

### Maps to findings

- [High, D5] Display typeface is Plus Jakarta Sans — not in brand spec (Inter + IBM Plex Mono only)
- [High, D5] `Logo.tsx` injects a fourth font (Jost) via inline Google Fonts `@import`

### Verifies

1. `grep -rEn "@import\s+url\\('https://fonts" src/` returns 0 matches.
2. After build + serve, Network tab shows fonts loading exclusively via the centralized `<link>` in `index.html` — no inline `@import` requests after first paint.
3. View `/`, `/learn`, an article page, and the logo in the nav — confirm typography is consistent and renders cleanly.
4. Lighthouse "Best Practices" audit does not flag font-load warnings (pre/post compare).

### Out of scope

- The 499 raw hex colors finding (Medium — deferred).
- The brand navy `#1A1A2E` Tailwind palette gap (Medium — deferred).
- Storybook `src/stories/*.css` Nunito Sans vestige (Low — deferred).

---

## Slice 7 — Image asset optimization

### Touches

- `src/assets/images/homepage/figures/A-*.jpeg`
- `src/assets/images/homepage/objects/B-*.jpeg`
- `src/assets/images/homepage/scenes/C-*.jpeg`
- `public/images/categories/*.png`
- Any `<img src={...}>` wrappers in `src/components/home/**` that should become `<picture>`
- Optionally `vite.config.ts` — install + configure `vite-plugin-image-optimizer` (only if the user approves a new build-time dep)

### Does

1. Re-encode the 35 oversized images:
   - JPEGs: 80 quality target (`cwebp`, `cjpeg`, or a one-off `sharp` script). Generate AVIF + WebP siblings.
   - PNGs (category icons): re-export from source at the actual display size; generate WebP siblings.
2. Replace `<img src="...jpeg">` on hero/figure components with `<picture>` blocks:
   ```tsx
   <picture>
     <source srcSet="...avif" type="image/avif" />
     <source srcSet="...webp" type="image/webp" />
     <img src="...jpeg" alt="..." loading="lazy" decoding="async" />
   </picture>
   ```
3. Add `loading="lazy"` and `decoding="async"` to every below-the-fold `<img>` (audit confirmed all 11 production `<img>` tags have `alt`, so only the loading attrs need adding).
4. **Optional:** add `vite-plugin-image-optimizer` to automate (1) at build time — requires user approval to install a new dep.

### Maps to findings

- [High, D7] 35 images larger than 500 KB ship with the site (homepage hero asset set)

### Verifies

1. `find src/assets public -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" \) -size +500k | wc -l` drops from 35 to ≤ 5 (any remaining are explicit exceptions documented in the slice's commit message).
2. After build: total `dist/` image weight drops measurably (target: > 50% reduction).
3. Lighthouse "Largest Contentful Paint" on homepage improves; spot-check with `pnpm run preview`.
4. Visually compare homepage pre/post for any quality regression on the hero.

### Out of scope

- Adopting a CDN-based image transformation service (Cloudflare Images, imgix, etc.).
- Generating per-article OG cards.
- Redesigning the homepage hero.

---

## Slice 8 — WCAG AA contrast fix on brand teal

### Touches

- A new semantic Tailwind class addition in `tailwind.config.js` OR a single utility migration across components:
  - `src/components/home/ToolsSection.tsx`
  - `src/components/video/VideoCard.tsx`
  - `src/components/tools/LightweightInsights.tsx`
  - `src/components/tools/SleepArchitect/dashboard/SleepScoreGauge.tsx`
  - Plus any of the other ~137 `text-teal-600` matches that render at body-text size on a light background

### Does

1. Add a semantic token `text-brand-accessible` in `tailwind.config.js` mapped to `teal-700` (`#158A7D` — passes AA on white at ~4.6:1).
2. For each `text-teal-600` usage, classify:
   - **Icon / decorative SVG**: keep `text-teal-600` (icon contrast is a separate WCAG criterion and usually exempt).
   - **Large heading (≥ 18 pt / 14 pt bold)**: keep `text-teal-600` (AA large-text threshold is 3:1).
   - **Small body text / status label / inline accent**: change to `text-brand-accessible` (or `text-teal-700` directly).
   - **Dark-mode pair (`dark:text-teal-400`)**: keep — runs on dark surface, contrast is fine.
3. Do *not* mass-`replace_all` — classification matters. The audit listed the high-confidence body-text offenders; spot-check the rest by opening each call site.

### Maps to findings

- [High, D8] `text-teal-600` (#1A9B8C) used as small body/inline text — fails WCAG AA contrast for normal text on white

### Verifies

1. Use an automated tool (`axe-core` via Playwright accessibility test, or Lighthouse a11y audit, or `pa11y`) on `/`, `/learn`, `/tools/sleep-architect`, `/clarity-score` — confirm zero "insufficient color contrast" violations.
2. Spot-check each modified component visually — the new green is darker but should remain recognizably brand.
3. Hand-check with WebAIM's contrast checker for one example (`#158A7D` on `#FFFFFF` → ≥ 4.5:1).

### Out of scope

- `<div onClick=>` modal backdrop fixes (Medium — deferred).
- Adding a "Skip to main content" link (Medium — deferred).
- Auditing dark-mode contrast pairings (separate slice if needed).

---

## Files explicitly out of scope for the entire fix plan

- `src/lib/navigator/**` — sacred privacy invariant; 75% confidence cap; client-side architecture. Do not touch.
- `src/lib/article-framework/**` — PEAF quality engine; separately governed and tested.
- `supabase/migrations/**` — no schema changes in this plan. RLS verification for the Medium Clarity-Score finding happens elsewhere if at all.
- `cf-proxy/**` — Cloudflare Worker reverse proxy; out of audit scope.
- `src/data/articles/category-*/*.tsx` (other than the one Slice 2 file) — content edits beyond the Dobson credential are out of scope.
- `src/components/article/Citation.tsx`, `ReferenceList.tsx` — citation rendering is correct per memory.
- `src/components/tools/**` core component logic — only typography/contrast utility classes (Slices 6 + 8) may touch tool components.
- Lockfile (`pnpm-lock.yaml`) — do not run `pnpm install`. If a slice requires a new dep, stage the `package.json` change and tell the user to install themselves.
- Git operations — do not commit, push, or branch. The user will commit slice-by-slice or as a single PR after review.

## Constraints (apply to every slice)

- **No new patterns.** Reuse existing services, hooks, components, and config conventions.
- **No adjacent-code refactor.** If a slice's file has a nearby smell, log it as a follow-up — do not fix it inline.
- **No new dependencies** unless the slice explicitly justifies one and the user approves. Slices 3, 4, 7 may need new build-time tooling — flag and ask.
- **One slice = one coherent unit.** Don't pad. If a slice's three-line task balloons into a refactor, stop and ask.
- **Two verifications minimum per slice.** Every slice above specifies its verification commands; run them before reporting the slice complete.
- **Match existing style.** TypeScript strict mode is not yet enabled (Medium, deferred) — do not enable it as part of any slice.
- **Read before editing.** Every slice assumes a fresh re-grep of the named patterns; the audit's line numbers are accurate as of `c3f2c06` but minor drift is possible.

## Verification at plan completion

After all 8 slices land, run these 4 user-journey smoke tests before reporting "fix plan complete":

1. **Anonymous → article reader path:**
   - Open `/` cold (cleared cache).
   - Navigate to `/learn` → pick any article → confirm body renders.
   - Network tab: no chunk over 600 KB gzipped is fetched before the article body.
   - Console: zero errors.

2. **Authed → MindMate path:**
   - Sign up or log in.
   - Open `/tools/mindmate` → send a message → confirm streaming reply.
   - In a separate tab, send the same `curl` POST to `/api/ai/chat` without an Authorization header — confirm `401`.

3. **Tool persistence path:**
   - Anonymous: open `/tools/mood-journal` → create entry → confirm it persists across reload (localStorage).
   - Log in → existing local entry merges or syncs to Supabase → reload → entry still visible.
   - Log out → reload → local entry remains; server-only entries hide.

4. **Crisis path:**
   - Open `/crisis` while logged out → confirm 988 and Crisis Text Line numbers render.
   - In MindMate, send a crisis-laden test message → confirm crisis response renders without invoking the LLM (the `safetyCheck.level === 'CRISIS'` branch at `api/ai/chat.ts:158`).

If any of the four fails, the corresponding slice's verification missed something — return to that slice before declaring the plan complete.

## If you get stuck — stop-protocol

If any slice's verification fails twice and you cannot identify the cause within ~10 minutes of debugging:

1. **Stop coding.** Do not continue to the next slice.
2. **Write a stop-context dump** to `STOP_CONTEXT_<slice-N>_<date>.md` at the repo root, containing:
   - The slice's name + the failing verification command.
   - The exact error output (full stack trace, not summarized).
   - What you tried (each attempt + result, brief).
   - The list of files you've edited so far in the slice.
   - Any state the user needs to clean up (uncommitted edits, partial migrations).
   - Your best hypothesis for the cause and the next investigation step.
3. **Report back to the user** with the stop-context path. Do not silently move on to a different slice. Do not roll back unless explicitly asked.

## Deferred (Medium + Low findings)

Resolved here only if a critical/high slice naturally absorbs them. Otherwise they are out of scope for the fix plan and become future-session backlog items.

### Medium (12)

- [D1] `tsconfig.json` missing `strict: true` — enable in a dedicated typing pass; will surface implicit-any errors.
- [D1] `src/app/api/**` routes use `VITE_`-prefixed env on server — resolved automatically by Slice 1 (directory deletion).
- [D2] Dead `navigate('/connect')` in orphan SearchResultsPage — delete with the orphan-page sweep.
- [D2] Eight orphan page modules duplicating live routes — sweep: `src/pages/learn/SearchResultsPage.tsx`, `src/pages/core/AboutPage.tsx`, `src/pages/tools/clarity-score/{AssessmentPage,AssessmentResultsPage,ScoreHistoryPage}.tsx`, `src/pages/learn/CategoryPage.tsx`, plus 2 others. Delete after confirming zero `import` references.
- [D2] Duplicate provider redirect rules + ambiguous category routing — clean up `src/App.tsx:280` (`/category/:category`) once the orphan `components/pages/CategoryPage` is removed.
- [D2] Legacy `pages/learn/CategoryPage` + `components/pages/CategoryPage` divergence — same orphan sweep.
- [D4] Clarity Score persists raw 20-question answers in Supabase row — verify RLS policy on `clarity_score_history` matches `user_id = auth.uid()`; update privacy policy copy. No code change.
- [D5] Brand navy `#1A1A2E` not in `tailwind.config.js` — add a `navy` palette in a brand-system slice.
- [D5] 499 raw hex colors — tokenize brand colors via a shared `BRAND_COLORS` map.
- [D7] 411 `console.log/warn/error` calls — add Vite plugin to drop `console.log` in prod builds; keep `warn`/`error`.
- [D8] `<div onClick=>` on 8 modal backdrops — extract a `<Modal>` primitive with focus-trap + Escape handler.
- [D8] No "Skip to main content" link — add `<a href="#main" class="sr-only focus:not-sr-only">` at app shell.

### Low (31)

- [D1] Dead dependency `@google/genai` in `package.json` — Slice 1 may pick this up.
- [D1] Tailwind config in `.js` not `.ts` — migrate if/when other Tailwind work happens.
- [D1] Brand token gap (navy missing) — duplicates Medium above.
- [D2] Two clarity-score entry surfaces with diverging implementations — orphan sweep.
- [D2] Footer + nav link audit clean — keep.
- [D3] Anonymous-mode tool behavior consistent — keep.
- [D4] Symptom Navigator engine fully client-side — keep; consider sacred-invariant comment block.
- [D4] Navigator telemetry counters-only — keep; consider runtime schema guard.
- [D4] 75% cap hard-coded in scoring.ts — keep; consider adding a unit test asserting `Math.max(...allScores) <= 0.75`.
- [D4] Toolkit tools follow consistent local-first pattern — keep.
- [D4] No external telemetry SDK ships health data — keep; consider lint rule against health-data event props.
- [D4] No `sendBeacon` / unload-time telemetry — keep.
- [D5] Storybook bootstrap files use Nunito Sans — delete `src/stories/*.css` or replace font.
- [D5] Article + admin editor use Georgia serif — document as content-serif track or swap to Inter italics.
- [D5] No competing UI component framework — keep.
- [D5] No `21st-dev` package — keep.
- [D6] All other Dobson mentions use canonical credential — keep.
- [D6] Diagnostic language used in teaching context — keep; optional lint rule.
- [D6] `\bnormal\b` used clinically/dialectically — keep.
- [D6] AI/ML terminology not user-facing — keep; lightly rephrase `RelationshipHealthCheck/frameworks.ts:100`.
- [D6] Crisis-resource references pervasive — keep; add E2E smoke test that asserts crisis block renders on 3 sensitive articles.
- [D6] No fabricated platform stats — keep.
- [D7] Route-level code-splitting healthy — keep; verify after Slice 3.
- [D7] No `next/image` references — keep.
- [D8] `prefers-reduced-motion` respected globally — keep.
- [D8] All 11 `<img>` tags have `alt` — keep.
- [D8] Form inputs use shadcn `<Label htmlFor>` correctly — keep.
- [D8] Heading hierarchy clean — keep.
- [D9] OG image is Unsplash stock — replace with branded 1200×630 card at `public/og/default.png`.
- [D9] `robots.txt` correctly disallows gated paths — keep; re-verify after Slice 4 sitemap regeneration.
- [D9] JSON-LD article + breadcrumb + WebSite emitted — keep; consider adding `MedicalWebPage` for condition pages.
