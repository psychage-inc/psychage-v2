# Psychage v2 — Authoritative Codebase Inventory

> Read-only reconnaissance. Ground truth from `package.json`, the file tree, migrations, and source. Where the two source documents conflict, **the repo wins**. Every classification below cites a file that was actually opened.

---

## 0. Stack & Meta

**Verdict: Vite + React 18 + TypeScript + React Router v7 + Supabase + Tailwind + Radix (shadcn-style). NOT Next.js.**
The "Next.js (App Router)" claim is **false for the main app** — but see the surprise at the bottom: an untracked `clarity-score/` sibling **is** a standalone Next.js 16 app. That is almost certainly what the Next.js document was describing.

Quoted from root `package.json` (`name: "psychage-web"`, `packageManager: pnpm@10.25.0`):

| Concern | Evidence (dependency / script) |
|---|---|
| Framework / build | `"dev": "vite"`, `"build": "tsc && pnpm run verify:routes && pnpm run build:api && vite build"`; `vite.config.ts` present, no `next` dep |
| Router | `"react-router-dom": "^7.13.1"` |
| React / TS | `"react": "^18.3.1"`, `tsconfig.json` present (strict) |
| Tailwind | `tailwind.config.js`, `@tailwindcss/typography`, `postcss.config.js` |
| shadcn/ui | No shadcn registry; **Radix primitives + cva** hand-rolled: `@radix-ui/react-*` (dialog, dropdown, tabs, accordion…), `class-variance-authority`, `tailwind-merge`, `clsx` |
| Supabase | `"@supabase/supabase-js": "^2.90.0"` |
| i18n | `"i18next": "^25.7.3"`, `"react-i18next": "^16.5.0"`, `i18next-browser-languagedetector` |
| Search | **No Algolia.** Search is Supabase/RPC + client-side (`src/services/searchService.ts`) |
| State / data | `"@tanstack/react-query": "^5.90.21"` (+ React Context: Auth, Bookmark, Toast, Navigator); no Redux/Zustand |
| AI SDKs | `"@anthropic-ai/sdk": "^0.78.0"`, `"openai": "^6.25.0"` (embeddings) |
| CMS / editor | `@sanity/client`, `@portabletext/react`, TipTap editor suite |
| Other | `framer-motion`, `lenis`, `recharts`, `d3`, `jspdf`, `@sentry/react`, `@marsidev/react-turnstile` (Cloudflare Turnstile), `sonner` (toasts) |

- **Build tooling:** Vite; API bundled separately via `scripts/build-api.ts` (`tsx`); route manifest verified at build (`verify:routes`).
- **Deploy:** `vercel.json` — SPA rewrite all → `/index.html`; **separate admin app** rewritten to `/admin.html` and redirected to `admin.psychage.com`; one serverless function `api/ai/chat.ts` (maxDuration 60s); strict security headers + CSP (report-only).
- **Node pin:** `.nvmrc` = `22`.
- **CLAUDE.md:** exists at `~/CLAUDE.md` (user-global, not repo root). Conventions in ≤5 lines: Vite dev on 5173; `@/`→`./src/`; content cascade Sanity→Supabase→mock; MindMate needs server-side `ANTHROPIC_API_KEY` + `pnpm run dev:all` (Vite 5173 proxies `/api`→`vercel dev` 3000); accessibility-first, TS strict, Prettier (semi, singleQuote, 100 width).

---

## 1. Route → Screen Map

Single router in `src/App.tsx` (lazy-loaded). `ProtectedRoute` = auth required; `RoleGuard` = role required. Admin panel is a **separate app/domain** (`src/AdminApp.tsx`, `admin.html`) reached via redirect — not in this router.

| Path | Component | Gate | Purpose |
|---|---|---|---|
| `/` | `pages/home/HomePage` | public | Marketing home |
| `/learn` | `pages/LearnPage` | public | Article library landing |
| `/learn/:categorySlug` | `pages/ArticleCategoryPage` | public | Category index |
| `/learn/:categorySlug/:articleSlug` | `pages/learn/ArticlePage` | public | Article reader |
| `/learn/article/:id` | `ArticleRedirect` | public | Legacy slug redirect |
| `/watch/:id` | `components/pages/VideoDetail` | public | Video detail/player |
| `/providers` · `/providers/search` · `/providers/:id` | `pages/providers/*` | public | Directory landing / search / profile |
| `/how-we-verify`, `/for-providers`, `/for-providers/apply`, `/for-providers/claim` | `pages/providers/*` | public | Provider trust + onboarding |
| `/tools` | `components/pages/ToolsPage` | public | Tools hub |
| `/tools/mood-journal` | `components/tools/MoodJournal` | public | Mood tracking |
| `/tools/sleep-architect` | `components/tools/SleepArchitect` | public | Sleep diary + wind-down |
| `/tools/mindmate` | `pages/tools/MindMate` | **auth** | Full-page AI chat |
| `/tools/symptom-navigator` | `components/pages/NavigatorPage` | public | Guided triage (Compass) |
| `/tools/symptom-navigator/crisis` | `components/screens/CrisisResourcesScreen` | public | Crisis off-ramp |
| `/tools/relationship-health` | `components/tools/RelationshipHealthCheck` | public | Relationship self-check |
| `/tools/medication-tracker` | `components/tools/MedicationTracker` | public | Medication tracker |
| `/tools/clarity-journal` + 11 sub-routes | `components/tools/ClarityJournal/*` | public | CBT journal (daily/screening/thought-record/activation/triggers/toolbox/reflection/history/insights + v2 entry/report) |
| `/clarity-score` | `components/pages/ClarityScoreTool` | public | **Flagship self-assessment** |
| `/tools/clarity-score*` | → redirect to `/clarity-score` | public | Legacy alias |
| `/category/:category`, `/search` | `components/pages/CategoryPage`, `SearchResults` | public | Browse / search results |
| `/crisis` | `components/pages/CrisisPage` | public | Crisis resources (localized) |
| `/about`, `/contact`, `/content-standards`, `/advisory-board`, `/authors/:slug`, `/legal/*`, `/sitemap` | `pages/core/*`, `components/pages/LegalPages`, `pages/SitemapPage` | public | Editorial / legal |
| `/login`, `/signup`, `/reset-password`, `/update-password`, `/auth/callback` | `pages/auth/*` | public | Auth flows |
| `/onboarding` | `pages/OnboardingPage` | auth | Post-signup onboarding |
| `/dashboard`, `/dashboard/settings`, `/dashboard/bookmarks`, `/dashboard/privacy`, `/dashboard/history` | `pages/dashboard/*` | auth + role `patient`/`admin` | Patient dashboard |
| `/portal` + `profile/reviews/verification/subscription/analytics/settings` | `pages/portal/*` | auth + role `provider`/`admin` | Provider portal v2 |
| `/admin/*` | `AdminRedirect` | — | Redirects to admin domain/`admin.html` |
| `/provider/*`, `/find-care*`, `/navigator*`, `/providers/register` | redirects | — | Legacy → new paths |
| `*` | `NotFoundPage` | public | 404 |

Globally: persistent **"Need Help Now?"** crisis button (rendered even during preload, `App.tsx`), MindMate widget (hidden on chat/dashboard/portal), cookie consent, deletion-scheduled banner.

---

## 2. Tool Inventory

| Tool | Classification | Primary file(s) | Decisive evidence |
|---|---|---|---|
| **a. Clarity Score** | **REAL** | `components/pages/ClarityScoreTool.tsx`, `lib/clarity/{questions,scoring}.ts`, `services/clarityScoreService.ts` | Imports `QUESTIONS`, `calculateClarityScore` from `lib/clarity`; real instrument-based math; `supabase.from('clarity_score_history').insert(...)` |
| **b. MindMate** | **REAL** | `api/ai/chat.ts`, `lib/ai/{llm,safety,retrieval,config}.ts` | Live `AnthropicProvider.streamCompletion`, model `claude-sonnet-4-5-20250929`; pgvector RAG; Haiku safety classifier + crisis keyword pre-check |
| **c. Library / Articles** | **REAL** | `services/articleService.ts`, `pages/learn/ArticlePage.tsx`, `services/sanityArticleService.ts` | `supabase.from('articles').eq('status','published').not('content','is',null)`; cascade Sanity→Supabase→mock |
| **c. "Reviewed by" provenance** | **STUBBED** | `services/articleService.ts` | Author hardcoded `{ name:'Psychage Team', role:'Editor' }`; no per-article clinical-reviewer surfaced in reader UI |
| **c. Read-state** | **REAL (local)** | `components/articles/recentlyRead.ts` | `localStorage('psychage_recently_read')`, last 10; no server read-state |
| **c. Article search** | **REAL** | `services/searchService.ts` | Metadata/title search (not full body); **no Algolia** |
| **d. Videos** | **STUBBED (mock)** | `data/videos.ts`, `components/pages/VideoDetail.tsx`, `services/videoService.ts` | 64 hardcoded objects; `from('videos')` tried but **no seeded `videos` table** in migrations; YouTube/Vimeo URLs + transcript arrays in mock |
| **e. Breathing** | **REAL** | `components/tools/SleepArchitect/wind-down/BreathingExercise.tsx`, `lib/sleep/constants.ts` | Stateful timer, 4-7-8/Box/Diaphragmatic patterns, reduced-motion aware |
| **e. Grounding (5-4-3-2-1)** | **NOT PRESENT** | — | No dedicated grounding component found |
| **e. CBT** | **REAL** | `components/tools/ClarityJournal/sections/ThoughtRecord.tsx` | Structured CBT thought record (local persistence) |
| **e. Meditation** | **NOT PRESENT** (as interactive tool) | — | Referenced only as video content; no guided component |
| **e. Mood Journal** | **REAL** | `components/tools/MoodJournal.tsx`, `services/moodService.ts` | `from('mood_entries')` insert/update + localStorage fallback |
| **e. Sleep Architect** | **REAL** | `components/tools/SleepArchitect/*`, `services/sleepService.ts` | `from('sleep_entries')` / `sleep_diary_entries` persistence |
| **e. Medication Tracker / Relationship Health** | **REAL (lighter)** | `components/tools/MedicationTracker.tsx`, `RelationshipHealthCheck.tsx` | Interactive flows; persistence local/light |
| **f. Symptom Navigator (Compass)** | **REAL (engine), but runs off hardcoded KB** | `components/pages/NavigatorPage.tsx`, `lib/navigator/engine.ts`, `context/NavigatorContext.tsx`, `data/mock_knowledge_base.ts` | Real scoring/branching (`scoreAllConditions`, `screenRedFlags`, `rankAndDiversify`); KB is **`mock_knowledge_base.ts` (984 lines), NOT the seeded `navigator_*` DB tables** |
| **g. Find care — directory** | **REAL** | `pages/providers/*`, `services/providerService.ts` | `from('providers')` + `search_providers` RPC (migrations); seeded provider tables |
| **g. Find care — booking** | **STUBBED** | `services/bookingService.ts`, migration `…_create_bookings_and_messages.sql` | `bookings` table + service defined; **no booking UI flow wired into any route** |
| **h. Check-ins / history (Clarity Journal)** | **REAL but local-only** | `components/tools/ClarityJournal/*` (`useClarityJournal` hook) | Journal entries persisted to **localStorage**, no Supabase table for journal entries |
| **h. Assessment history** | **REAL (server)** | `pages/dashboard/AssessmentHistory.tsx`, `services/clarityScoreService.ts` | Reads `clarity_score_history` from Supabase |
| **i. Crisis / Help-now** | **REAL + localized** | `components/pages/CrisisPage.tsx`, `lib/crisis/data/countries.ts` (~3,300 lines), `App.tsx` button | `COUNTRY_DATABASE` ~195 countries w/ verified hotlines; geo-resolved (`resolveCountry`); not a single hardcoded US list |
| **j. Adaptation engine** | **SPECCED-BUT-UNBUILT** | (absence) `pages/home/HomePage.tsx`, `pages/dashboard/UserDashboard.tsx`, `services/articleService.ts` | No code reads a stored Clarity Score to branch home/Library content (see below) |

### Clarity Score — the real instrument & algorithm
Live route `/clarity-score` → `ClarityScoreTool.tsx` imports from `lib/clarity`. The instrument is **20 questions across 5 domains built from validated scales**: PHQ-4 (emotional, q1–4), WHO-5 (vitality/wellbeing, q5–9, inverted), UCLA-3 loneliness (social, q10–12), PSS-4 (stress, q13–16, with reverse-scoring on q14/q15), plus 4 custom functioning items (q17–20). `calculateClarityScore` (`lib/clarity/scoring.ts`) normalizes each instrument to a 0–20 domain score, sums to a 0–100 composite, and bins into tiers (`thriving`/`balanced`/`struggling`/`distressed`/`crisis`). Results persist via `clarityScoreService.saveResult` → `supabase.from('clarity_score_history').insert(...)` (auth users only); records are immutable (INSERT/SELECT only, no UPDATE policy). This is a genuine algorithm, not placeholder — but note it is a **wellbeing self-report composite, not a diagnostic instrument**, and the constituent scales are repurposed/recombined rather than scored per their original validated cutoffs.

### MindMate — RAG vs mock
**Real, not canned.** `api/ai/chat.ts` instantiates `AnthropicProvider(ANTHROPIC_API_KEY)` and streams from `claude-sonnet-4-5-20250929` via SSE. RAG is real but **conditional on `OPENAI_API_KEY`**: when present, the user message is embedded (OpenAI `text-embedding-3-small`, 1536-dim), vector-searched against `psychage_embeddings` (pgvector, HNSW cosine), optionally hybridized with full-text, re-ranked/deduped, and the top chunks are injected into the system prompt (`SYSTEM_PROMPT.replace('{retrieved_chunks}', …)`). If `OPENAI_API_KEY` is absent, retrieval is skipped gracefully (chat still works, ungrounded). Crisis detection is **three-layer**: regex keyword pre-check (`lib/ai/safety.ts` `CRISIS_KEYWORDS`/`URGENT_KEYWORDS`), then a Haiku classifier (`claude-haiku-4-5-20251001`) returning `SAFE|CRISIS|URGENT|WATCH|OUT_OF_SCOPE|HARMFUL_REQUEST`; on `CRISIS` the LLM is **never called** — `generateCrisisResponse(region)` returns region-specific hotlines directly. A `crisis_keywords` table also exists in migrations.

### Adaptation engine — the highest-value question
**No implementing code exists.** "Adaptive operating system" is marketing copy (`pages/core/AboutPage.tsx`). Concretely:
- `HomePage.tsx` reads `useAuth().user` but renders an identical static section list for everyone — no score read, no conditional/"recommended-for-you" branch.
- `UserDashboard.tsx` fetches `clarityScoreService.getDashboardStats()`/`getHistory()` but uses them **only for charts/summary display** — never to alter surfaced content.
- The only personalization is `getRecommendations(domainScores)` in `lib/clarity/scoring.ts`, whose output is shown **only on the assessment results screen** and is never consumed by `articleService`, the home page, or the Library.
- No service method like `getRecommendedFor(score)`; grep for `useAdaptation|adaptContent|personalizByScore|getRecommendedFor` → zero hits; no DB relationship between `clarity_score_history` and content tables.
Verdict: the adaptive layer is **aspirational with no runtime**. This is the single largest gap between stated ambition and code.

---

## 3. Data Model (Supabase)

~258 migration files; the overwhelming majority are bulk article seeds (`seed_categoryNN_subcategoryNN`). Distinct schema tables (~40), grouped. **No generated `database.types.ts`** — types are hand-written in `src/types/` and `src/lib/admin/types.ts`.

- **Profiles/auth:** `profiles` (PK→auth.users, `role` CHECK patient|provider|admin; RLS: self r/w, admin all) · `admin_roles` (`role` super_admin|clinical_admin|viewer; RLS: authed read, super_admin manage).
- **Articles/content:** `articles` (status workflow draft→published, category/subcategory FKs, review/approval flags, `featured`, `is_cornerstone`; RLS: public read published, admin write) · `article_categories` · `article_subcategories` · `article_comments` · `article_derivatives`. All RLS-enabled (public read / admin write).
- **Assessment/clarity:** `clarity_score_history` (**live** — user_id, total_score, label, tier, domain_scores JSONB; RLS self, immutable) · `assessment_questions` + `assessment_results` (**orphaned** older model, anxiety/mood/stress/sleep — see surprises).
- **Symptom navigator:** `navigator_symptoms`, `navigator_conditions`, `navigator_condition_symptoms`, `navigator_condition_red_flags`, `navigator_crisis_resources`, `navigator_matching_config`, `navigator_analytics` (insert-only, anonymized), `navigator_saved_results` (RLS self). **Seeded but not read at runtime** by the flow (client uses `mock_knowledge_base.ts`); only `navigator_analytics` is written (`lib/navigator/analytics.ts`).
- **Mood/sleep:** `mood_entries`, `sleep_entries`, `sleep_diary_entries`, `sleep_user_settings` — all RLS self-CRUD.
- **Providers:** `providers` (status seeded→active, tier free|premium, NPI), `provider_locations`, `provider_specialties`, `provider_languages`, `provider_cultural_competencies`, `provider_insurance`, `provider_verifications`, plus lookups `provider_types`/`specialties`/`languages_lookup`/`cultural_competencies`/`insurance_plans`; `provider_analytics`, `provider_reviews`, trust scores. Public read active, admin/owner write.
- **Bookings/messaging:** `bookings` (patient↔provider, status), `messages`. RLS scoped to participants. **No UI consumer for bookings.**
- **Consent/privacy:** `consent_log` (GDPR consent types incl. `clarity_score_tracking`, `ai_chat_history`), `dsar_requests` (export/deletion). RLS self + admin.
- **AI/MindMate:** `psychage_embeddings` (vector(1536), no RLS — RAG corpus), `mindmate_events` (anon analytics), `ai_conversations` + `ai_messages` (RLS self).
- **Admin/audit:** `audit_logs`, `user_activity`.
- **Tools/newsletter/bookmarks/payments:** `tools`, `newsletter_subscribers`, `bookmarks` (article|video|provider|tool), `stripe_customers`, `stripe_events_log`.

**Migration-vs-client gaps:**
- `navigator_*` content tables — seeded, but runtime flow ignores them (uses mock KB). Effectively unused except analytics.
- `assessment_questions`/`assessment_results` — only the **orphaned** `assessmentService.ts` queries them; the live Clarity Score uses `clarity_score_history` instead.
- `bookings`/`messages` — tables + service exist; no wired UI.
- `videos` — client `videoService` queries it but **no migration creates/seeds it**; mock is the de facto source.

RLS posture overall: user-owned tables enforce `auth.uid()` self-access; public-content tables are public-read/admin-write. (The article-RLS migration history shows a long thrash — many disable/re-enable cycles ending in `20260610000001_reenable_article_rls_and_policy_fixes.sql`.)

---

## 4. Auth & i18n

**Auth:** Supabase. Client in `src/lib/supabaseClient.ts`; state in `src/context/AuthContext.tsx`. Role is resolved from **JWT `app_metadata.role`** (server-controlled), explicitly *not* user-writable metadata (security note AUTH-001 in code). Live vocabulary is two-tier:
- **App roles** (profiles + guards `components/auth/RoleGuard.tsx`/`ProtectedRoute.tsx`): `patient | provider | admin`.
- **Admin sub-roles** (`admin_roles` table, admin app): `super_admin | clinical_admin | viewer`. Migration `20260421000002_rename_editor_to_clinical_admin.sql` renamed `editor`→`clinical_admin`; confirmed used in `src/lib/admin/types.ts` (`type AdminRole`) and `src/components/admin/StatusBadge.tsx`. So **`super_admin`/`clinical_admin`/`viewer` is the live admin vocabulary; `editor` is dead.**
- **Email confirmation:** not disabled in code; governed by the Supabase project's auth config (not in repo). Code comments assume confirmation may be required. Signup uses Turnstile (`@marsidev/react-turnstile`).

**i18n:** `react-i18next`, 5 locales (EN, PT, ES, SV, FR) in `src/locales/<lang>/translation.json`; config in `src/i18n/config.ts` (note: `src/i18n/` shows as untracked in git status — an in-flight move). **Only UI chrome is translated.** The `articles` table has **no language/locale column**; article bodies (Sanity/Supabase/mock) are English-only. PT ~575 keys vs EN ~589 (~98% chrome coverage); ES/SV/FR exist, completeness unverified. So clinical/article content is **not** localized — only navigation/buttons/labels.

---

## 5. Conventions

- **Component org:** shared UI in `src/components/ui/` (~37 components: Button, Card, Modal, Input, Badge, Alert, Breadcrumbs…), hand-rolled on Radix + cva (not shadcn copy-paste). Feature components under `src/components/<domain>/` and `src/components/tools/`; route pages split between `src/pages/` and `src/components/pages/` (both used — mild inconsistency).
- **Loading state:** **skeletons** primary (`src/components/ui/Skeletons.tsx` — SkeletonArticleCard etc.), with a small spinner fallback for Suspense route transitions (`RouteLoadingIndicator` in `App.tsx`); ~200ms deferral patterns to avoid flicker.
- **Data/server calls (no Next server actions — it's Vite):** a **service layer** in `src/services/` (~44 files) wraps the Supabase client with cascading fallbacks (Sanity→Supabase→mock), often via a `queryWithFallback` helper (`src/lib/withFallback.ts`); consumed through **TanStack React Query** (`QueryClientProvider` in `App.tsx`, `src/lib/queryClient.ts`). The only server-side function is `api/ai/chat.ts` (Vercel). No tRPC/GraphQL.
- **Design tokens:** CSS custom properties in `src/styles/tokens.css` (`--color-primary`, `--color-surface`, `--font-sans` Satoshi / `--font-display` Fraunces, spacing/radius scales), mapped into `tailwind.config.js` (`colors.primary: 'var(--color-primary)'`, plus semantic `crisis`/`urgent`/`watch`/`safe` and Navigator `relevance` palettes). Dark mode = `class`. **Tokens are well enforced** — color/typography flow through Tailwind-mapped vars rather than ad-hoc hex.

---

## The 5 most surprising / divergent findings

1. **Three parallel, competing Clarity Score implementations — only one is wired.** Live: `ClarityScoreTool.tsx` + `lib/clarity` + `clarity_score_history`. **Orphan A:** untracked `src/services/assessmentService.ts` + `src/pages/tools/clarity-score/{AssessmentPage,AssessmentResultsPage,ScoreHistoryPage}.tsx` using the older `assessment_questions`/`assessment_results` model — *not referenced in `App.tsx`*. **Orphan B:** an untracked **`clarity-score/` at repo root that is a complete standalone Next.js 16 + React 19 + Tailwind 4 app** (own `package.json`, `app/`, `middleware.ts`, `node_modules`). This is almost certainly the source of the "Next.js App Router" document claim — a separate rewrite of one feature, not the architecture of the product.

2. **The Symptom Navigator's seeded knowledge base is dead weight at runtime.** Large `navigator_*` tables (symptoms/conditions/mappings/crisis resources, with `..._navigator_seed.sql` files in the tens of KB) exist, but `NavigatorContext` imports `src/data/mock_knowledge_base.ts` (984 lines) instead. The engine logic is genuinely real; the DB content powering it is bypassed. Only `navigator_analytics` is actually written.

3. **"Adaptive" is the headline product claim and has zero implementing code.** Scores are computed, persisted, and charted — but nothing reads them to change what's surfaced anywhere. The product's central differentiator is, today, a display feature.

4. **Booking and Videos are façades.** `bookings`/`messages` tables + `bookingService` exist with no UI flow; `videos` is queried by `videoService` but **no migration ever creates the table**, so 64 hardcoded mock objects are the real data. Both read as "built" from the table list but aren't reachable/real end-to-end.

5. **Clinical content is monolingually English despite a 5-language i18n setup, and article RLS has a long thrash history.** i18n covers chrome only (no `language` column on `articles`); meanwhile the article-RLS migrations cycle through disable/re-enable/"jwt-only"/"simplify"/"reenable" many times — a sign content-access policy was repeatedly unstable. Also note `assessment_results`/`bookings`/`videos` discrepancies above all point to a codebase mid-migration with several half-replaced subsystems.

> One open ambiguity worth a single question for the planning session: **is the root `clarity-score/` Next.js app the intended go-forward direction (i.e., is the team migrating features out of the Vite monolith into standalone Next apps), or is it an abandoned spike?** The answer reframes nearly every "orphan" finding above.
