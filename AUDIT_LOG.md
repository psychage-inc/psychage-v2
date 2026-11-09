# PRODUCTION-READINESS AUDIT LOG — Psychage v2

Audit target: `main` @ `0ebfb4c` (= production, Vercel auto-deploys main).
Branch: `worktree-audit-production-readiness` in isolated git worktree.
Date: 2026-07-04. Mode: fully autonomous; every decision logged here.

## EXECUTION DECISIONS (made before Phase 1)

| # | Decision | Reasoning |
|---|----------|-----------|
| D-01 | Audit `main` HEAD in an isolated git worktree; never touch the main working dir | Main dir holds user's in-progress cover-image work (7 modified files + untracked `src/hooks/useArticleImage.ts`); main dir is shared by concurrent agents (collision hazard). HEAD = what is deployed. |
| D-02 | User's uncommitted work is out of fix-scope; logged as OBSERVATION only | Not mine to commit/alter; it references untracked files that exist only in the main dir. |
| D-03 | Deliver as commits on branch → push → PR. **No merge.** | Merging to main auto-deploys production. Deploy stays a human decision. |
| D-04 | "Strictest viable tsc": inventory `--strict` errors via side config; fix real bugs surfaced; do NOT flip `strict:true` globally if error volume makes the diff non-minimal | Minimal-diff rule; a multi-thousand-error strictness migration is a project, not a fix. Numbers logged in §2A. |
| D-05 | `src/data/articles/` content corpus (~600K of the 723K LOC) is pattern-sampled, not per-file read | It is generated/authored content data, one repeated TSX shape; defects there are data defects tracked separately (see OBS-01). |
| D-06 | Every route gets an error boundary (per brief §B), reusing existing `RouteErrorBoundary` pattern in App.tsx | Mechanical, preserves design, closes 69-route gap. |
| D-07 | Fixes needing backend/infra (distributed rate limit store, admin report API) degrade gracefully + documented, not invented | Brief rule F / no scope invention. |
| D-08 | Vitest: targeted files + `--maxWorkers=2`; 3 known pre-existing local-only failures (taxonomy, 988-link ×2) are baseline, not regressions; full local suite OOMs | Known infra limits; CI is the green reference. |
| D-09 | Viewport render-checks via script driving `playwright` chromium lib directly against `vite preview` | `@playwright/test` runner is broken locally (ESM+pnpm duplication); the library works when driven directly. |
| D-10 | Multi-agent fan-out via Agent tool for audit breadth; no Workflow orchestration | User did not opt into workflow orchestration. |

---

## PHASE 1 — FULL MAP

### 1.1 Scale

| Metric | Value |
|--------|-------|
| TS/TSX files under `src/` | 1,450 (~723K LOC; ~600K is `src/data/articles/` content corpus) |
| Components | ~358 files across 32 dirs in `src/components/` |
| Pages | ~155 files across 14 dirs in `src/pages/` |
| Services | 50 files in `src/services/` |
| Hooks | 31 files in `src/hooks/` |
| Contexts | 7 in `src/context/` |
| Serverless functions | 6 under `api/` |
| Unit test files | 171 (~20.7K LOC) |
| E2E specs | 8 (Playwright; runner broken locally, skipped in CI) |

### 1.2 Route inventory (src/App.tsx — 87 routes)

- 78 pages lazy-loaded via `lazyWithRetry()` (src/lib/lazyWithRetry.ts); global `<Suspense fallback={RouteLoadingIndicator}>`.
- Global `ErrorBoundary` wraps all routes, `resetKeys={[location.pathname]}`.
- Per-route `RouteErrorBoundary`: 18 routes (learn, conditions, providers search, tools hub, toolkits, clarity-score, onboarding, dashboard, portal). **69 routes without** (home, auth ×6, crisis, articles, most tools, search, legal, core pages, 14 legacy redirects, 404).
- Categories: public content 26; auth 6; protected user 7 (RoleGuard); protected provider 7; admin 1 (redirect to admin subdomain — separate `admin.html` entry); legacy redirects 14; catch-all 1.
- Multi-entry build: `index.html` (public) + `admin.html` (admin SPA, host-rewritten via vercel.json for admin.psychage.com).

### 1.3 Component tree (pages → shared)

Top-level: `App.tsx` → QueryClientProvider → MotionConfig → BookmarkProvider → ProviderLookupsProvider → `main#main-content` → ErrorBoundary → Suspense → Routes. Chrome: `components/layout/` (Navigation, Footer, MobileCrisisHeader, ResponsiveRoute — route-level mobile/desktop branching, PageTransition).

| components/ dir | files | role |
|---|---|---|
| tools | 184 | MoodJournal, SleepArchitect, ClarityJournal v1+v2, MedicationTracker, RelationshipHealthCheck, ClarityScore |
| providers | 43 | directory cards/filters/search |
| ui | 36 | primitives (buttons, inputs, modals, tabs) |
| article | 35 | ArticleHtmlRenderer (DOMPurify), cards, comments |
| navigator | 32 | Symptom Navigator + NavigatorErrorBoundary |
| admin | 26 | admin v2 dashboard |
| mobile | 22 | Mobile* screens, bottom nav |
| dashboard 17 · pages 15 · layout 12 · auth 11 (ProtectedRoute, RoleGuard, TierGuard) · home 9 · ai 9 (MindMate) · conditions 7 · articles 6 · onboarding 5 · error 4 · toolkits 4 · content 4 · a11y 3 · others 7 | | |

### 1.4 State management

- **Contexts (7)**: AuthContext (17KB; user, role from `app_metadata`, admin tier via `src/lib/adminRole.ts`), NavigatorContext (localStorage-persisted), BookmarkContext (localStorage + Supabase sync), ThemeContext, ProviderLookupsContext, ToastContext, AuthContextDefinition (types).
- **Server state**: @tanstack/react-query ^5.90.21 — 195 useQuery/useMutation sites; central `src/lib/queryClient.ts`.
- No Zustand/Recoil/Jotai.

### 1.5 API call sites

- **Services (50)**: ~40% cascading fallback (Sanity→Supabase→mock via `src/lib/withFallback.ts` helpers: `withFallback`, `queryWithFallback`, `queryOneWithFallback`) — articleService, videoService, toolkitService, etc. ~50% Supabase-only CRUD (mood, sleep, clarity, bookmarks, messaging, …). Specialized: chatPersistenceService (localStorage+Supabase).
- **Direct fetches outside services: 6** — notable: `src/pages/admin/v2/providers/BulkImport.tsx:55` → external NPPES registry API, no timeout/validation.
- **Serverless (`api/`)**: `ai/chat.ts` (streaming RAG chat, Anthropic + safety classifier, JWT-gated, in-memory rate limiter L24), `ai/embed.ts` (Sanity webhook, HMAC-validated, OpenAI embeddings), `ai/feedback.ts` (JWT + enum validation), `ai/health.ts` (env presence booleans, unauthenticated), `geo-detect/` (Vercel/CF headers, no IP logging), `lib/supabase.ts` (shared server client).

### 1.6 Data models / validation

- Types in `src/types/` (Provider, Article, Video, …). Zod in 13 files — admin forms only (zodResolver).
- Supabase/Sanity responses **cast, not validated**: ~12.5K `as ` casts total, 34 `as unknown as`, 70 `as any`, ~3,213 `any` annotations (bulk in scripts/tests/content tooling; boundary-relevant subset audited in §2C).

### 1.7 Env vars

Client (`VITE_*`, typed in `src/vite-env.d.ts`): SUPABASE_URL/ANON_KEY, SANITY_PROJECT_ID/DATASET/API_VERSION, API_URL, feature flags (ENABLE_AI_CHAT, PROVIDER_DIRECTORY, MOOD_JOURNAL, SLEEP_TRACKER, CLARITY_SCORE). Server-only: ANTHROPIC_API_KEY, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY (optional, RAG), SANITY_* webhook secrets. No secrets in repo (verified by grep sweep).

### 1.8 Styling

Tailwind 3.4.6, class-based dark mode, Inter + Plus Jakarta Sans, class-variance-authority variants, Framer Motion + Lenis, `prefers-reduced-motion` respected via MotionConfig/useReducedMotion.

### 1.9 Build tooling

- pnpm 10.25.0, Node 22 (.nvmrc). Build: `tsc && verify:routes && build:api && vite build`. Vite 8.0.16, manual chunks (React dedup across index/admin entries), 600KB chunk warn limit.
- tsconfig: ES2022, `strict: false` (individual flags), isolatedModules, skipLibCheck. `tsc --noEmit` **clean** at current settings.
- ESLint (.eslintrc.cjs, legacy): **386 problems (272 errors / 114 warnings)**, `--max-warnings 0` policy; lint is NOT a CI job.
- CI (pr-checks.yml): typecheck, vitest (`--maxWorkers=2`), build, language-gate, migration-drift. E2E absent.
- Husky pre-commit: lockfile-sync check only.
- vercel.json: 60s timeout for ai/chat; admin host rewrites; HSTS, nosniff, SAMEORIGIN, Permissions-Policy; **CSP Report-Only** (not enforced); sw.js no-cache.

### 1.10 Dependencies (healthy; no red flags)

React 18.3.1, Router 7.13.1, TS 5.5.3, Vite 8.0.16, Vitest 4.0.15, Playwright 1.57.0, TanStack Query 5.90.21, Supabase 2.90.0, Sanity 7.14.0, Tiptap 3.20.2, Tailwind 3.4.6, i18next 25.7.3, Anthropic SDK 0.78.0, OpenAI 6.25.0, Sentry 10.49.0, Radix UI 1.x, DOMPurify. Quick grep cross-check found no obviously unused deps. `peerDependencyRules` allows vite:5 for one plugin (known hack).

### 1.11 Dead code / markers / suspicious files

| Item | Location | Class |
|---|---|---|
| `TierGuard.tsx` — zero imports, self-labeled unused (Phase 2 feature) | src/components/auth/TierGuard.tsx:22 | dead code (kept: planned feature, per no-deletion rule) |
| `src/tests/setup 2.ts`, `src/lib/highlightText 2.ts` | rename artifacts, not imported | dead files (tracked → candidates for removal) |
| `*.tsx.backup` ×3 + `article-rewrite-manifest.json.backup` | data layer / root | inert backups |
| `MobileBrowseAllArticles.tsx` + " 2"/" 3" copies | main dir only (untracked) | OBS — user WIP, not in this worktree |
| TODO markers: 7 total, 0 FIXME/HACK | TierGuard:22; lib/providers/queries.ts:763 (Stripe tier); lib/navigator/config.ts:2,27 (age-gate legal review); pages/admin/ReportDetailPage.tsx:26,81,105 (mock-data stub) | tracked in §2F |

### OBSERVATIONS (design/intentional or out-of-scope — untouched)

- OBS-01: Known content-data defects (baked stat=0 ~110 articles, empty accordions ~312) — data re-seed tracked separately (PR #99 fixed components); not re-audited here.
- OBS-02: User's in-progress cover-image work in main working dir (7 modified files + `useArticleImage.ts`): excluded per D-02. The 2 duplicate `MobileBrowseAllArticles 2/3.tsx` files live only there; flagged for user cleanup, not deleted by audit.
- OBS-03: CSP is Report-Only. Enforcing is a behavior change with real breakage risk (inline styles/scripts from Vite, Sanity images) — needs staged rollout; logged as residual risk, not auto-fixed.
- OBS-04: Storybook has only 3 sample stories — minimal adoption is a choice, not a defect.

---

## PHASE 2 — DEFECT AUDIT

(Findings recorded below as they are verified. ID scheme: TS-/REACT-/API-/SEC-/UX-/PERF-. Severity: CRITICAL/HIGH/MEDIUM/LOW.)

### 2.0 Method

Phase 2 ran 5 category auditors (async/effect, React patterns, data/API boundary, security, perf/completeness) plus a strict-`tsc` inventory, over the worktree at HEAD. Each candidate was verified against source before listing. ~55 real findings; severities below reflect production user-impact, not lint pedantry.

### 2.1 SYSTEMIC PATTERN (root cause behind ~20 findings)

**supabase-js does not throw on DB errors** — it resolves `{ data, error }`. Across the services layer the `error` object is discarded and a success-shaped value is returned, so **failed writes are reported to the UI as success** and every component-level `.catch(rollback)` is dead code. This one contract mistake is the root of: bookmarkService-1, feedbackService-1, newsletterService-1, userProfileService-1, provider-analytics-1/2, auditLogger-1, queries-1/2, articleAdminService-1..6, providerService-1, privacyService-1, chatPersistenceService-1, waitlistService-1, and the dead-rollback consumers BookmarkContext-2, C-3, C-4, C-6, C-14, C-16, C-17. Remediation targets the highest user-impact instances; the rest are logged with the shared fix contract.

### 2.2 FINDINGS LEDGER

Legend: [F]=fixed this branch · [D]=documented decision / degrade · [L]=logged latent (no live caller) · [O]=observation.

| ID | Sev | File | Defect | Disposition |
|----|-----|------|--------|-------------|
| SEC-001 | CRITICAL | docs/SEPARATE_FRONTEND_INTEGRATION.md | Live Supabase service-role + Sanity + Gemini secrets committed (2 full-value blocks), in history since eea3cd4 | [F] redacted HEAD; **rotation + history purge = manual** |
| C-1 | HIGH | pages/dashboard/BookmarksPage.tsx:26 | Bookmarks page reads dead legacy REST `/api/articles/bookmarks` (route doesn't exist), not Supabase `bookmarkService`; empty catch | [F] |
| C-2 | HIGH | services/moodService.ts:78 + tools/MoodJournal | Valence slider emits 1–10 but `createEntry` returns null for value>5 → pleasant moods silently discarded for all signed-in users | [F] |
| C-25 | HIGH | components/ai/MindMate.tsx:303 | SSE error handler only covers SAFETY_VIOLATION; LLM_ERROR/TIMEOUT silently dropped → empty/truncated bubble, no retry | [F] |
| C-19 | HIGH | pages/admin/v2/articles/* (10 sites) | Mutations invalidate `['admin','articles']` but list registers `['admin','articles-search',...]` → invalidations are no-ops, stale admin list | [F] |
| F-3 | HIGH | pages/admin/ReportDetailPage.tsx:26/81/105 | Report detail + status actions run on MOCK_REPORTS though real `api.admin.getReport/updateReportStatus` exist and are used by the list | [F] wire to real API |
| chat.ts-1 | HIGH | api/ai/chat.ts:291 | Disconnect guard listens on `req` 'close' (never fires on Node≥16 SSE abort) → full LLM gen streamed to dead socket every abort | [F] listen on `res` |
| api-1 | MED | lib/api.ts:150 | `response.json()` before `response.ok` → non-JSON 502/204 erases real status, skips 401-refresh | [F] |
| api-2 | MED | lib/api.ts:315 | `uploadAvatar` never checks `response.ok` → JSON error body shown as "avatar updated" | [F] |
| RTE-BND | MED | App.tsx | 69 of 87 routes lack a per-route error boundary (rely on global) | [F] wrap remaining routes |
| BC-1 | MED | context/BookmarkContext.tsx:27 | Hydration fetch has no cancel guard → after logout/user-switch, User A's bookmarks restore for User B; `hydrated` sticks (privacy leak) | [F] |
| BC-2/C-6 | MED | context/BookmarkContext.tsx:59-78 | Server toggle inside setState updater (StrictMode double-fire) + dead rollback (`toggle` never rejects) | [F] move side-effect out of updater; surface failure |
| B-1 | MED | pages/learn/ArticlePage.tsx:86 | Article fetch effect has no stale-response guard (mobile twin has one) → article A renders under B's URL | [F] |
| B-2 | MED | pages/learn/CategoryPage.tsx:22 | Same stale race + `isLoading` not reset on slug change | [D] CategoryPage is unrouted dead code (C: "dead code — unrouted"); logged, low value |
| B-3 | MED | components/providers/search/ProviderSearchBar.tsx:21 | Input state copied from URL props at mount, never re-synced → stale search box after chip clear / back-forward | [F] |
| C-20 | MED | pages/admin/v2/providers/ProviderEditor.tsx:629 | Save invalidates only list key, not detail/relation keys → re-open shows pre-save cache, re-save reverts | [F] |
| C-21 | MED | pages/admin/v2/providers/ProviderEditor.tsx:605 | Relation delete-then-insert swallows insert error, still toasts success → wipes relations silently | [D] shares supabase-swallow contract; documented (admin, non-transactional needs RPC) |
| B-4 | LOW | components/article/ArticleHtmlRenderer.tsx:117 | Chart hydration createRoots in un-cancelled async closure → orphaned roots on fast nav | [F] |
| B-5 | LOW | components/tools/MedicationTracker/components/MedicationForm.tsx:192 | index-as-key on removable time rows with focusable inputs → focus sticks to wrong row | [F] |
| F-6 | MED | components/articles/FlatArticleCard.tsx, FeaturedHeroCard.tsx | Loaded `<img>` has no width/height/aspect → CLS on /learn LCP + up to 40 cards | [F] |
| F-11 | MED | components/Preloader.tsx:3 | `lottie_light` statically imported by eager Preloader → ~45KB gz in entry/critical path | [F] dynamic import |
| F-12 | MED | pages/learn/CategoryPage.tsx:120 | Sort `<select>` has no value/onChange (dead control) | [D] CategoryPage unrouted dead code; logged |
| F-13 | MED | components/article/CompanionVideo.tsx:99 | "Notify Me" button no-op onClick on coming-soon placeholder | [F] degrade: remove dead button / show static note |
| geo-1 | MED | api/geo-detect/index.ts:44 | Declares `runtime:'edge'` but uses Node (req,res) → `res.setHeader` throws every call; no live caller | [D] no live caller (crisis reads meta tag); fix trivial but latent → documented |
| embed-1 | MED | api/ai/embed.ts:132 | Non-atomic delete-then-reinsert of embeddings; partial on timeout/429 | [D] backend/ingestion robustness; degrade doc |
| llm-1 | MED | src/lib/ai/llm.ts:179 | `streamCompletion` no AbortSignal/try-finally → upstream stream leaks on early break | [D] paired w/ chat.ts-1; documented (token-spend, not user-facing) |
| C-18 | MED | lib/providers/queries.ts:52 + ProfileHeader.tsx:62 | `provider_type` cast without null guard, rendered unguarded → TypeError on null join | [F] guard render |
| searchService-1/C-8 | MED | services/searchService.ts:271 | Rejected index promise memoized forever → search permanently broken after one offline blip | [F] clear promise on reject |
| searchService-2/C-19b | MED | services/searchService.ts:753 + SearchResults/Autocomplete | No request-ordering guard → stale results overwrite newer | [D] documented; guard pattern noted (multiple call sites, higher risk) |
| svc-swallow-user | MED | bookmarkService, feedbackService, newsletterService, userProfileService | User-facing writes mask failure as success (dead-letter queues never drained) | [D] documented under §2.1 contract; BookmarkContext path fixed via BC-2 |
| F-1/C-7 | HIGH→D | services/articleService.ts:356 | `getBySlug` awaits full mock corpus (~31 chunks) before Supabase; cached but blocks 1st article view + turns a chunk-import failure into false 404 | [D] cached+load-bearing for rich JSX (tied to known SSR issue); per-category-lazy load recommended, not rearchitected here |
| F-2 | HIGH→D | components/dashboard/RecommendedArticles.tsx:58 | Sequential per-category awaits, each falls to full corpus on empty | [D] documented; parallelize recommended |
| F-4 | HIGH→D | pages/admin/data/adminMockData.ts | Admin dashboard health/stats/charts 100% mock | [D] partial real endpoints; large scope, documented |
| F-10 | MED | components/tools/MoodJournal.tsx:46 | `getEntries` unlimited + unpaginated render → grows unbounded | [D] service supports limit; documented (grows slowly) |
| rate-limit | LOW→D | api/ai/chat.ts:24 | In-memory limiter per-instance, no eviction | [D] needs Redis/Upstash — backend infra; documented |
| chat-history-priv | LOW | components/ai/PsychageAI.tsx:108 | Persists chat history to localStorage without the consent gate MindMate uses | [D] privacy inconsistency; documented for review |
| CSP-report-only | MED→O | vercel.json | CSP is Report-Only (no enforcement); sanitizer allows iframe | [O] enforcing risks breakage; staged rollout = residual risk |
| strict-tsc (32) | LOW→D | see §2.3 | 32 strict-mode errors, all with runtime guards / type-plumbing | [D] keep `strict:false`; flipping forces casts on Supabase generics (violates no-new-cast) |
| latent-* | LOW | waitlistService, providerService.toggleFavorite, TierGuard, analytics.ts, context.ts, ingestion.ts, NavigatorContext-1, useAsyncData-1, useNPIVerification-1, seed-bulk/cities pagination | No live callers or dev-tooling only | [L] logged, not fixed (no reachable user impact) |

### 2.3 Strict-tsc inventory (D-04)

32 errors under `--strict`. Buckets: 16×TS2322 (assignability, mostly Postgrest builder variance in articleAdminService/articleRewriteService + Fuse<Condition> variance in searchService), 7×TS2339 (KeyFacts union access — guarded), 3×TS7006 (implicit-any setState updater params in ClarityScoreTool), plus TS2345/2769/2589/2538/2352 singletons. All have runtime guards or are generic-plumbing. Decision: keep `strict:false` — every genuine null risk already has a guard, and satisfying the checker on the Supabase-generic errors would require adding `as` casts, violating remediation rule 5 (no new casts). Full list captured in scratchpad.

---

## PHASE 3 — REMEDIATION (what was actually done)

20 commits on branch, one logical fix each (finding ID + summary). Fixed: SEC-001, C-1, C-2, C-25, C-19, F-3, chat.ts-1, api-1/api-2, RTE-BND, BC-1, BC-2, B-1, B-3, B-4, C-18, searchService-1, F-11, F-13, geo-1 + tests.

**Disposition reconciliation (supersedes §2.2 table where they differ):**
- **F-6 (img CLS) → OBSERVATION, NOT changed.** Both cards use `w-full h-auto` with an explicit code comment that natural-aspect (no crop/letterbox) is intentional. Forcing dimensions would alter deliberate, consistent design → left untouched per "broken ≠ ugly."
- **B-5 (medication index keys) → documented, NOT fixed.** Clean fix needs an id-per-row state-shape change rippling to the Medication model + save mapping; LOW severity (middle-row focus quirk) < refactor risk.
- **F-1/F-2/F-4, C-21, embed-1, llm-1, rate-limit, svc-swallow family → documented.** Either load-bearing/cached (F-1), backend/infra (rate-limit, embed-1), or a systemic service-contract change (svc-swallow) rather than a point fix. See FINAL_REPORT §3.
- **strict-tsc → kept `strict:false`** (D-04); 32 errors are type-plumbing with runtime guards; fixing would add casts (violates no-new-cast). Side config removed after inventory.

## PHASE 4 — SELF-VERIFICATION

- `tsc --noEmit`: **clean**.
- Production build (full chain): **green (exit 0)** after all fixes.
- New tests: `MoodWizard/moodScale.test.ts` (6) + `lib/api.test.ts` (4) → **10/10 pass**. Touched-area existing tests (moodService, withFallback, error boundaries) → **47/47 pass**.
- Lint (changed files): clean; the one flagged `any` (MindMate.tsx:318) is pre-existing on `main`, not introduced here (lint is not a CI gate). BC-2 rewrite's dropped react-compiler disable directive was restored (`7b2015a`).
- Viewport render-check (playwright chromium lib, driven directly per D-09, vs `vite preview`) at 360/768/1024/1440 on home, /learn, /providers/search, /tools: **16/16 clean** — zero horizontal overflow, zero page errors, chrome renders correctly. Content regions empty (no backend in preview) → RESIDUAL_RISK. Auth-gated modified routes (BookmarksPage, admin ReportDetailPage) → VIEWPORT_UNVERIFIED.
- Phase-2A flow re-trace against fixed code: article read, bookmark toggle, mood save, provider search, MindMate error path — consistent.
- Adversarial second-pass review of full diff: see FINAL_REPORT §6.

---

## PHASE 6 — FOLLOW-UP REMEDIATION (systemic write-swallowing + MED/LOW)

Per user request after the audit, the systemic write-error swallowing (§2.1) and the remaining client-fixable MED/LOW findings were completed on this branch. New helper `src/lib/supabaseError.ts` (`throwOnError`); write methods across bookmark/newsletter/feedback/profile/provider-application/articleAdmin/waitlist/providerService now throw or return truthfully, activating callers' existing catch/rollback/onError (only FeedbackWidget needed a new error state). MED/LOW: C-20/C-21 (ProviderEditor invalidations + throws), searchService-2 (latest-request guards ×4), B-5 (medication stable keys), F-2 (parallel recommendations), embed-1 (validate-before-delete), llm-1 (reader cleanup). 9 new tests + updated newsletter/waitlist tests; tsc/build green; only pre-existing taxonomy.contract fails locally (green in CI). See FINAL_REPORT §7.
