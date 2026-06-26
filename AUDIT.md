# Psychage — Situational Audit (read-only)

**Date:** 2026-06-20
**Auditor role:** Staff Engineer, read-only situational audit. No application code, schema, or data was changed.
**Repo:** `/Users/raiyanabdullah/Desktop/psychage-v2`
**Branch audited:** `feat/article-drafts-batch` (working tree) — **7 commits ahead of `main`**, plus uncommitted changes.
**Production:** `https://psychage.com`

## How to read this report

Every material claim is backed by a file:line, a live database query result, an observed HTTP response, or a build artifact. Where I could not prove something, it is marked **UNKNOWN** with the reason. Claims found in existing repo docs (`AUDIT_*.md`, `PSYCHAGE_INVENTORY_REPORT.md`, commit messages, etc.) were **not trusted** and are not cited as evidence.

**Two facts dominate everything below and must be read first:**

1. **The stack is NOT Next.js.** It is a **Vite + React 18 SPA** with React Router v7, deployed to Vercel as static assets. The audit brief's "Next.js" premise is incorrect. Evidence: `package.json` `"dev": "vite"` / `"build": "tsc && … vite build"`; no `next.config.*` exists; `vite.config.ts` present; `vercel.json` rewrites `/(.*) → /index.html` (classic SPA fallback).

2. **There is a large local-vs-production gap.** The branch `feat/article-drafts-batch` contains the canonical-taxonomy refactor, the grouped Learn index, and the entire conditions directory — **none of which exist on `main`** and therefore **none of which are deployed**. Production runs the older code. Several findings below differ between "what's deployed" and "what's in the working tree," and are labelled accordingly.

A third fact: **the database is shared.** Local dev and production both point at the same Supabase project (`ozourhqyqtpppvpbhphw.supabase.co`, from `.env` `VITE_SUPABASE_URL`). So all article/category **data** counts in this report are true for production as well; only the **rendering code** differs between branch and prod.

### Production verification limit (stated explicitly per brief)

Production is a client-rendered SPA. A static fetch of `https://psychage.com` returns only the HTML shell (`<title>Psychage | Understand Your Mind</title>`) — the content is rendered by JavaScript at runtime, which a non-browser fetch cannot execute. I verified production **hosting and transport** (below) and the **shared database**, but I did **not** drive a real browser against production, so I could not directly observe the deployed rendered DOM. Where I describe "what production shows," it is derived from reading the exact code on `main` (which builds the deployed bundle), and is labelled as such.

Production transport verified:
- `curl -I https://psychage.com` → `HTTP/2 307` redirect to `https://www.psychage.com/` → `HTTP/2 200`, `server: Vercel`, `x-vercel-id: bom1::…`. Site is live and served by Vercel with a strict CSP and HSTS.

---

## 1. Inventory and build

### Stack (confirmed)
- **Frontend:** Vite 5 + React 18 + TypeScript, React Router v7, Tailwind. `package.json`, `vite.config.ts`, `src/App.tsx`.
- **Content:** Supabase (Postgres + RLS) as the live article store; Sanity CMS configured (`VITE_SANITY_*` in `.env`) as an alternate source; hardcoded TSX/mock data as a last-resort fallback (`src/data/`).
- **AI:** Anthropic Claude via `api/ai/chat.ts` Vercel function (`vercel.json` sets `maxDuration: 60` for it).
- **Auth:** Supabase Auth (see §6).
- **Hosting:** Vercel. `vercel.json` redirects `psychage.com/admin* → admin.psychage.com` and rewrites everything else to the SPA shell. A separate `admin.html` SPA is served on the `admin.psychage.com` host.
- **Mobile app:** **ABSENT.** There is no Expo/React Native project in this repo — no `app.json`, no `expo`/`react-native` dependency in `package.json`, no mobile package. What exists are *planning documents only*: `MOBILE_MIGRATION_BLUEPRINT.md`, `PSYCHAGE_MOBILE_MIGRATION_BLUEPRINT.md`, `MOBILE_ARTICLE_PARITY_AUDIT.md`, `MOBILE_RESPONSIVE_AUDIT.md`. The brief's "mobile app: Expo/React Native" does not exist as code. **The mobile app is not started.**

### Does it build?
**Yes.** `pnpm run build` (which runs `tsc && pnpm run verify:routes && pnpm run build:api && vite build`) completed with **exit code 0** in ~8.6s. TypeScript type-check passed, route verification passed, the API bundle built, and Vite produced `dist/`.

**But the build emits a serious size warning.** The article corpus is *also* hardcoded as large TSX files compiled into the client bundle, producing per-category chunks far above the 600 kB limit:
- `category-21` → **2,129 kB** (gzip 632 kB), `category-30` → 2,091 kB, `category-20` → 1,791 kB, `category-02` → 1,753 kB, … a dozen chunks over 1 MB.
- Vite warning: *"Some chunks are larger than 600 kB after minification."*

This means article content exists in **two places** — the Supabase DB (the live source) and giant in-repo TSX files (the mock/fallback corpus, `src/data/articles/category-*/`). The TSX corpus inflates the bundle and is a maintenance/perf liability.

### Does it run locally?
Local dev is `vite` on :5173, with `dev:all` running Vite + `vercel dev` (:3000) concurrently so `/api/ai/chat` works (per `package.json` scripts and project CLAUDE.md). The build succeeds, so the app compiles and serves. I did not script a full interactive browser session of the local dev server in this audit; the build + code analysis are the basis for runtime claims, and any claim requiring live DOM observation is flagged UNKNOWN/needs-repro below.

### The concrete local-vs-production gap
`feat/article-drafts-batch` is 7 commits ahead of `main` and carries uncommitted work. The following are **on the branch but NOT on `main` / not deployed** (verified with `git cat-file -e main:<path>`):
- `src/config/taxonomy.ts` — the canonical category contract (untracked `??`).
- The grouped Learn index (`categoryService.getGrouped` does not exist on `main`).
- The entire conditions directory (`src/pages/conditions/ConditionsIndexPage.tsx`, `ConditionDetailPage.tsx`, `conditionsService.ts`, `/conditions` routes, the "Conditions" nav link — all absent on `main`).
- `supabase/migrations/20260620000004_reconcile_category_slugs.sql` (untracked) and `…20260620000003_conditions_reference.sql`.

**Implication:** the most important recent work (taxonomy fix that repairs broken category navigation, and the conditions feature) is **unmerged and undeployed**. Production is running the pre-fix code.

---

## 2. Articles and categories (the client's gate)

All counts below are from **live PostgREST queries** against the shared Supabase project, on 2026-06-20, using both the service-role key (bypasses RLS = ground truth) and the anon key (= what the public actually sees).

### Real article count (the disputed ~2,000)

| Metric | Count | Query |
|---|---|---|
| **Total `articles` rows** | **2,006** | service-role, `count=exact` |
| status = `published` | **1,203** | `status=eq.published` |
| status = `draft` | **643** | `status=eq.draft` |
| status = `archived` | **155** | `status=eq.archived` |
| (other/unaccounted) | ~5 | (sums to ~2,001 of 2,006) |
| rows with empty body | 8 | `or=(content.is.null,content.eq.)` |
| **Anon-visible (RLS)** | **1,203** | anon key sees exactly the published set |

**Verdict on "~2,000":** Literally, **2,006 article rows exist** — so the "~2,000" figure is technically defensible as a *row count*. But it is **misleading as a count of real, readable, public articles**. Only **1,203 are published** (and visible to the public). The remaining ~800 are **643 drafts** (AI-generated skeletons pending real citations — corroborated by the project's own memory note "Article drafts: citations pending… finish 283, blocked on Anthropic credits") plus **155 archived** (empties, per migration `20260604000001_archive_empty_articles.sql`). **The honest headline number a client should be told is ~1,200 published articles, not ~2,000.** RLS is working correctly: anon sees only the 1,203 published rows, no draft leakage.

### How articles relate to categories
- `articles.category_id` is a FK to `article_categories.id`. The UI reads the category via an embedded join (`articleService.getAll` selects `category:article_categories!category_id(...)` — `src/services/articleService.ts`).
- Article list/category queries filter on the **joined category slug** (`query.eq('category.slug', params.category)`), and the new Learn index groups by `category.slug` normalized through `resolveCanonicalSlug()` (`src/services/categoryService.ts:103-141`).

### Where the relationship is malformed / stale
This is **both** "renamed but not relinked" **and** structural drift:

1. **48 category rows in the DB** vs **31 canonical categories** in the code contract (`src/config/taxonomy.ts`) vs the nav menu's hardcoded list. The DB carries **duplicate/legacy category rows**: e.g. both `relationships-social` AND `relationships-communication`, both `depression-mood` AND `depression-grief`, both `self-esteem-identity` AND `self-worth-identity` exist as separate rows. Articles are still attached to the *old* slugs.
2. The untracked migration `20260620000004_reconcile_category_slugs.sql` is an attempt to fix exactly this — **but it has not been applied** (the live DB still has 48 category rows and articles still carry legacy slugs).
3. The code papers over the DB drift at runtime via `LEGACY_SLUG_ALIASES` in `taxonomy.ts:112-121` (e.g. `depression-mood → depression-grief`). **But that aliasing only exists on the branch, not on `main`** — so production has the drift with no compensation (see §4, the deployed nav dead-ends).

### Per-category resolution table

Article counts are by the FK-joined category slug. "Published" is what the public can actually reach. Status legend:
- **RESOLVES** — has published articles; renders with content.
- **DRAFT-LOCKED** — has real article content but **0 published** (all stuck in `draft`); the Learn index drops it, so it shows as nothing.
- **EMPTY** — zero articles of any status; never built.

**Canonical categories (the 31 in `taxonomy.ts`):**

| Group | Category (slug) | Published | Total | Status |
|---|---|---:|---:|---|
| Conditions | anxiety-stress | 82 | 87 | RESOLVES |
| Conditions | depression-grief *(via `depression-mood`)* | 70 | 70 | RESOLVES |
| Conditions | trauma-healing | 55 | 55 | RESOLVES |
| Conditions | mental-health-conditions | 50 | 50 | RESOLVES |
| Conditions | chronic-illness-pain | 68 | 68 | RESOLVES |
| Conditions | aging-dementia-late-life | 50 | 65 | RESOLVES |
| Conditions | **psychosis-schizophrenia** | **0** | 65 | **DRAFT-LOCKED** |
| Conditions | **eating-body** | **0** | 70 | **DRAFT-LOCKED** |
| Behavior | emotional-regulation | 80 | 80 | RESOLVES |
| Behavior | habits-behavior-change | 64 | 65 | RESOLVES |
| Behavior | sleep-body-connection | 60 | 60 | RESOLVES |
| Behavior | self-worth-identity *(via `self-esteem-identity`)* | 66 | 66 | RESOLVES |
| Behavior | therapy-navigation | 50 | 50 | RESOLVES |
| Behavior | **creativity-therapeutic-arts** | **0** | 65 | **DRAFT-LOCKED** |
| Behavior | **life-skills-practical-psychology** | **0** | 110 | **DRAFT-LOCKED** |
| Behavior | **brain-neuroscience** | **0** | 0 | **EMPTY** |
| Life | relationships-communication *(via `relationships-social`)* | 155 | 155 | RESOLVES |
| Life | work-productivity *(via `workplace-academic`)* | 75 | 75 | RESOLVES |
| Life | loneliness-connection | 46 | 50 | RESOLVES |
| Life | digital-life | 50 | 50 | RESOLVES |
| Life | technology-digital-life | 64 | 64 | RESOLVES *(near-duplicate of digital-life)* |
| Life | cultural-global | 50 | 50 | RESOLVES |
| Life | mens-mental-health | 62 | 62 | RESOLVES |
| Life | spirituality-meaning | 6 | 64 | RESOLVES *(only 6 of 64 published)* |
| Life | **womens-mental-health** | **0** | 66 | **DRAFT-LOCKED** |
| Life | **environmental-eco-psychology** | **0** | 66 | **DRAFT-LOCKED** |
| Life | **family-parenting** | **0** | 0 | **EMPTY** |
| Life | **sexuality-intimacy** | **0** | 0 | **EMPTY** |
| Life | **disability-accessibility** | **0** | 0 | **EMPTY** |
| Life | **forensic-legal-justice** | **0** | 0 | **EMPTY** |
| Life | **military-veterans-firstresponder** | **0** | 0 | **EMPTY** |

**Summary: of 31 canonical categories — 19 RESOLVE, 6 are DRAFT-LOCKED (have content, 0 published), 6 are EMPTY (never built).**

**Orphaned content — articles with no canonical home (NOT in the table above):** these are tagged to slugs that are neither canonical nor aliased, so even when published they will not render in the Learn index or resolve to a category page until the taxonomy/migration is fixed:

| Orphan slug | Articles | Status |
|---|---:|---|
| neurodivergence-adhd-autism | 70 | all draft |
| chronic-illness-disability | 70 | all draft |
| financial-wellness | 65 | all draft |
| sports-exercise-psychology | 65 | all draft |
| (null/unlinked category) | 8 | — |

**~278 articles are orphaned.** Notably this includes the entire **neurodivergence / ADHD / autism** body of work — a flagship mental-health topic — which has no canonical category and is invisible.

### Is the taxonomy consistent between DB and UI?
**No, on production.** The problem is **both** "renamed but not relinked" **and** malformed relationships:
- The DB holds 48 rows including stale duplicates; articles still point at old slugs.
- The branch code reconciles this at runtime (aliases) and via an unapplied migration; **production has neither**, so the deployed UI labels and the article slugs disagree for every renamed category.

---

## 3. The four known regressions (diagnosis only — no fixes applied)

### 3.1 Search input loses focus on each keystroke — **ROOT CAUSE UNCONFIRMED (needs live browser repro)**
I could not confirm a code-level root cause by static analysis, and I am flagging this honestly rather than asserting a wrong one.
- The LearnPage search input (`src/pages/LearnPage.tsx:600-609`) is a **controlled input inside a non-conditional `<section>`**. Its query is stored in the URL via `useUrlFilterState` → `useSearchParams(..., { replace: true })` (`src/hooks/useUrlFilterState.ts`), so every keystroke rewrites the URL.
- A tempting theory — that the conditional hero block above it (`{!isSearching && …}` at `LearnPage.tsx:557`) "shifts siblings" and remounts the input — **is incorrect**: React preserves the position of an `&&`-false child, so the following `<section>` does not change index and is not remounted.
- `<Routes location={location}>` (`src/App.tsx:230`) is **not** wrapped in an `AnimatePresence` keyed on `location.key`/`location.search`, and `PageTransition` is a bare `motion.div` with no `key` (`src/components/ui/PageTransition.tsx`). A query-only URL change keeps the matched route (`/learn`) identical, so React Router does not remount `LearnPage`. The `ErrorBoundary` resets only on `location.pathname` (`App.tsx:215`), which doesn't change.
- **Net:** in both `main` and the branch, static analysis shows **no remount path** that would drop focus. The symptom is real per the client, but pinning the mechanism requires a live keystroke repro in a browser (DevTools "highlight re-renders"/React Profiler). **Marked UNKNOWN; do not ship a fix based on the sibling-shift theory.**

### 3.2 "ESC" shown instead of a submit affordance — **CONFIRMED**
The header search overlay (Cmd/Ctrl-K palette) renders a static **"ESC"** keyboard-hint chip in the slot where a submit/search button would normally be, and there is **no submit button** — submission works only via Enter (`<form onSubmit>`).
- Evidence: `src/components/layout/Navigation.tsx:380` — `<span … >ESC</span>` in the input's right slot; the surrounding `<form onSubmit={handleSearchSubmit}>` (line 368) has no `<button type="submit">`. The overlay opens on Cmd/Ctrl-K and closes on Escape (key handlers ~lines 57-87), so "ESC" is a *close* hint occupying the submit position. To a user it reads as a broken/absent search button.

### 3.3 Search relevance — "bipolar" returns autism articles — **CONFIRMED**
Two compounding causes:
1. **Substring metadata scoring, no topical gating.** `src/services/searchService.ts` scores articles by counting query-token **substring** hits across title/subtitle/tags/**category**/**keyFacts**/**summary**/**description** (`scoreArticle`, lines 164-186). Category name+slug are weighted ×12 and `keyFacts` ×8 (lines 175-179). There is no fuzzy threshold and no body-topical relevance model.
2. **One giant catch-all category.** Autism, ADHD, bipolar, eating, and psychotic-disorder articles are all filed under the single `mental-health-conditions` category, and many neurodevelopmental/autism articles **mention "bipolar"** as a comorbidity in their indexed `keyFacts`/`summary`/`description`. A "bipolar" query therefore scores those autism articles and surfaces them.
- Honest scope note: a *pure* autism article with no "bipolar" anywhere in its metadata scores 0 and would not appear; the contamination is the co-condition/comorbidity articles in the shared category. The architectural fix is real relevance (topical/embedding-based) plus splitting the mega-category.

### 3.4 Back navigation from Tools fails — **MOUNTING CONFIRMED; exact failure UNCONFIRMED**
- **How Tools is mounted (this drives the fix):** `/tools` is a **real in-app React Router v7 route**, *not* an iframe, separate SPA, or external build. `src/App.tsx:258` routes `/tools` to a lazy-imported `ToolsPage`; tool cards navigate with React Router `<Link>` (`src/components/pages/ToolsPage.tsx`); `vercel.json` serves the single SPA shell for all non-admin paths. There is no `iframe` and no `window.location` navigation in the Tools pages (the only hard `window.location.href` is the unrelated admin-domain redirect, `App.tsx:127`). **So browser Back operates on normal SPA history and does change the route.**
- **Most likely cause of the *perceived* failure (flagged unconfirmed):** scroll-restoration, not routing. `src/components/ui/ScrollManager.tsx` restores a saved scroll position on `POP` and then **deletes** that saved entry (so a second back/forward to the same path no longer restores), and its restore is deferred behind a `setTimeout(50ms)` that races the lazy `Suspense` mount of the tool page; `/tools/symptom-navigator` is in `ALWAYS_TOP_ROUTES` and is forced to scroll-to-top even on Back. The combination can leave the user visually "stuck"/at the top, reading as "Back didn't work."
- A literal "URL does not change on Back" was **not reproduced** in code; it needs a live browser repro to distinguish routing failure from scroll-restoration. Marked accordingly.

---

## 4. Navigation and IA (Learn → article)

- **Working tree (branch): the path WORKS end-to-end.** Home → header "Learn" mega-menu → `/learn` (`LearnPage`) → click a topic card → `/learn/:categorySlug` (`ArticleCategoryPage`) → click an article → `/learn/:categorySlug/:articleSlug` (`ArticlePage`, body from Supabase `articles.content`). Multiple redundant paths exist (featured hero is one click to an article; category filter pills; "See all"). Empty categories are pre-filtered from the index so a browsing user doesn't hit "0 articles." Breadcrumbs are correct. A first-time, non-technical user **can** reach an article without instructions — *in the branch*.

- **Production (`main`): the nav path is BROKEN.** The deployed Learn mega-menu **hardcodes category slugs that no longer match the corpus** — e.g. `/learn/depression-mood`, `/learn/trauma-ptsd`, `/learn/neurodevelopmental`, `/learn/ocd-related`, `/learn/substance-addiction`, `/learn/life-transitions`, `/learn/children-adolescents`, `/learn/self-esteem-identity`, `/learn/workplace-academic`, `/learn/global-cultural`, `/learn/relationships-social`, `/learn/therapy-treatment` (`git show main:src/config/navigation.ts`). On `main` there is **no `resolveCanonicalSlug` redirect** (`taxonomy.ts` is absent on `main`), so clicking these menu items lands on a category page that resolves to **"Articles Coming Soon" / not found** — a dead end straight from the primary nav. The branch's taxonomy refactor (canonical-slug nav + `ArticleCategoryPage` legacy redirect + `LEGACY_SLUG_ALIASES`) is exactly the fix, but **is uncommitted/unmerged**.

- **Minor IA confusions (both versions):** two near-duplicate categories (`digital-life` vs `technology-digital-life`); a separate top-level "Conditions" entry distinct from the Learn "mental-health-conditions" category (two plausible homes for "depression"); the article-detail URL's `:categorySlug` segment is decorative (the page resolves by article slug alone), so a wrong prefix neither 404s nor redirects.

---

## 5. Condition directory

**Present as code on the branch; effectively ABSENT to a real user.**

- **Built (branch only):** A full directory exists on `feat/article-drafts-batch` (commit `b8e5137`) — an A–Z browse index (`src/pages/conditions/ConditionsIndexPage.tsx`, with search, alphabet rail, ICD-11 grouping), a detail page (`ConditionDetailPage.tsx`), routes `/conditions` and `/conditions/:slug` (`App.tsx:243-244`), a header nav link with no flag/role gate (`src/config/navigation.ts:209-215`), a service layer (`src/services/conditionsService.ts`), and a hardcoded corpus of **113 ICD-11 Chapter 6 conditions** (`src/data/conditions/icd11Chapter6.ts` + `families/`).
- **NOT on `main` / not deployed:** all of the above fail `git cat-file -e main:…`. Production has no `/conditions` route and no nav link.
- **Even on the branch, the public surface is empty.** Two reasons:
  1. Every corpus row is forced `verification_status: 'unverified'` (`icd11Chapter6.ts:45`), and `conditionsService` gates unverified rows off the public surface (`applyGate`). So the 113 conditions only render behind `?preview=1`.
  2. The service queries a Supabase table named `conditions`, but the live `conditions` table is an **unrelated 5-row legacy schema** (columns `id, name, description, recommended_action, article_id, category, is_active` — a Symptom-Navigator table) with **no `slug`/`verification_status`**, so the query errors (`column conditions.slug does not exist`) and falls back to the gated-off corpus. The migration intends a table named `conditions_reference` (which does not exist — PostgREST 404), and because it's `CREATE TABLE IF NOT EXISTS public.conditions`, applying it would not replace the legacy table.
- **Net:** a real anonymous visitor clicking "Conditions" today (even on the branch) sees an **empty A–Z index**. The condition structure is **authored but not live**.

---

## 6. Auth / login

**Solid; no broken flow found in code.** (I did not perform a live login.)
- Supabase Auth: email/password (`AuthContext.tsx` `signInWithPassword`), Google + Apple OAuth (`signInWithOAuth`, redirect `…/auth/callback`), signup with email confirmation, password reset. **No magic-link sign-in.**
- Role is read from `app_metadata.role` (server-controlled), not user-writable metadata — a deliberate hardening.
- **Return/redirect flow is correct:** `ProtectedRoute` sends unauthenticated users to `/login?redirectTo=<path>` and also passes `state.from`; `LoginPage` reads both, runs the target through an allowlist (`safeRedirectPath`), and navigates with `{ replace: true }` so Back does not bounce the user into `/login`. Public routes (`/learn`, `/conditions`, `/providers`, most of `/tools`) are not gated.
- **One maintenance trap (not a current break):** `safeRedirectPath` allowlists path prefixes; a new top-level area not added to the list would silently drop a legitimate post-login return to `/dashboard`.
- **UNKNOWN:** the cross-domain admin/main hops (`window.location.href` to `adminUrl()`/`mainUrl()`) depend on `src/lib/urls.ts` runtime config and the Supabase redirect-URL allowlist; I did not exercise them. On a single-domain deploy they are no-ops.

---

## 7. Honest completion assessment

**Handover gate (client's words):** a first-time user can browse categories and read articles with no guidance; a condition structure exists; web and app are functional with no broken navigation.

### Buckets

**Built and verified working**
- Production hosting/transport (Vercel, HTTPS, CSP/HSTS). *(HTTP verified)*
- The build pipeline (`tsc` + route verify + Vite) — exit 0.
- ~1,203 published articles with real bodies in Supabase; RLS correctly shows only published to anon. *(live query)*
- Article reading path Home→Learn→category→article — **in the working tree.** *(code-traced)*
- Auth/login + post-login redirect/back handling. *(code-traced)*
- 19 of 31 canonical categories resolve to published articles. *(live query)*

**Built but broken / broken when deployed**
- **Production category navigation** — Learn mega-menu links to renamed slugs with no redirect on `main` → dead-end "Articles Coming Soon." *(code-diff main vs branch)*
- **Search relevance** ("bipolar"→autism) and the **missing submit affordance** ("ESC"). *(code-confirmed)*
- **Search focus loss** — symptom real, root cause unconfirmed. *(needs live repro)*
- **Tools Back** — routing is sound; perceived failure most likely scroll-restoration. *(needs live repro)*
- **6 DRAFT-LOCKED categories** (~442 articles written but unpublished, including all of eating-body, psychosis, women's MH, environmental, creativity, life-skills).
- **~278 orphaned articles** with no canonical category (incl. all ADHD/autism/neurodivergence). *(live query)*

**Claimed-but-not-actually-present (in production / to a real user)**
- **"~2,000 articles"** — only ~1,203 are published/public; ~800 are drafts/archived. *(live query)*
- **Condition directory** — exists only on an unmerged branch and renders empty on the public surface even there. *(code + live query)*
- **The taxonomy reconciliation / grouped Learn index** — branch-only, undeployed. *(git)*

**Not started**
- **Mobile app** — no Expo/React Native code exists; only blueprint markdown. *(filesystem)*
- **6 EMPTY canonical categories** (brain-neuroscience, family-parenting, sexuality-intimacy, disability-accessibility, forensic-legal-justice, military-veterans) — zero articles. *(live query)*
- Verified, live condition data (corpus is 100% unverified; live table is a legacy schema). *(code + live query)*

### Blunt overall completion: ~60%

Not inflated, and here's the reasoning. The genuinely hard, high-value substrate **is** built: ~1,200 real published articles, working auth, a working build, live hosting, and a reading path that works in the branch. That's most of the engineering mass. But against the **client's actual gate**, the deployed product falls short on every clause:
- **Browse with no guidance:** broken on production (nav dead-ends); only fixed in unmerged code.
- **Condition structure exists:** not deployed, and empty even where it exists.
- **Web functional, no broken nav:** search is broken (relevance + affordance), and prod category nav is broken.
- **App functional:** there is no app (0%).

Roughly: web content+infra ~75% done, web IA/nav/search ~50% (fixes exist but unshipped + search unsolved), conditions ~30% (authored, unverified, undeployed, schema-blocked), mobile 0%. Weighted, ~60%.

---

## Appendix A — "Claimed done but not working" list

1. **"~2,000 articles."** Reality: 2,006 rows, **1,203 published**; ~800 are drafts/archived.
2. **Conditions directory shipped.** Reality: branch-only, undeployed; empty on the public surface (all rows unverified + live table schema mismatch).
3. **Categories renamed/cleaned up.** Reality: DB still has 48 rows with stale duplicates; reconcile migration unapplied; production nav links to dead slugs.
4. **Taxonomy is the single source of truth and slugs "can never drift again."** Reality: the contract file (`taxonomy.ts`) is untracked and undeployed; production still drifts.
5. **Search works.** Reality: relevance is broken (substring scoring + mega-category bleed) and there's no visible submit control.
6. **Mobile app.** Reality: not started — planning docs only.
7. **Full corpus published.** Reality: ~442 written articles are DRAFT-LOCKED and ~278 are orphaned from any category.

## Appendix B — Gap to handover, prioritized by impact on the core gate (browse → read)

**P0 — restore the deployed browse-to-read path**
1. **Merge `feat/article-drafts-batch` to `main` and deploy.** This alone repairs production category navigation (canonical slugs + legacy redirects) and ships the grouped Learn index. Without it, the live site's primary nav dead-ends.
2. **Apply the slug-reconciliation migration** (`20260620000004_…`) to the live DB and verify the 48 category rows collapse to the canonical set with articles relinked. Today it is unapplied.

**P1 — make the content the client paid for actually visible**
3. **Publish the 6 DRAFT-LOCKED categories** (~442 articles: eating-body, psychosis-schizophrenia, women's MH, environmental, creativity, life-skills) once citations land (memory: blocked on Anthropic credits).
4. **Give the ~278 orphaned articles a canonical home** (esp. ADHD/autism/neurodivergence, chronic-illness-disability, financial-wellness, sports-exercise) — add canonical slugs/aliases or re-bucket, then publish.

**P2 — fix the search the client will test immediately**
5. **Relevance:** replace substring metadata scoring with real topical/embedding search and split the `mental-health-conditions` mega-category so "bipolar" stops matching autism comorbidity mentions.
6. **Submit affordance:** add a visible search button (keep Enter); the lone "ESC" chip reads as broken.
7. **Search focus loss:** reproduce live in a browser and pin the actual cause before fixing (the obvious-looking sibling-shift explanation is wrong).

**P3 — conditions directory as a real feature**
8. Resolve the table-name collision (`conditions` vs `conditions_reference`), seed and flip rows to `verification_status='verified'`, then merge/deploy so `/conditions` shows content publicly.

**P4 — Tools Back + mobile**
9. Reproduce the Tools Back issue live; if it's scroll-restoration (most likely), fix `ScrollManager` POP handling. Routing itself is fine.
10. **Mobile app** is a from-scratch build, not a fix — scope it separately; nothing exists yet.

---
*End of audit. No application code, schema, or data was modified. Images were out of scope and not assessed.*
