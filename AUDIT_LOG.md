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
