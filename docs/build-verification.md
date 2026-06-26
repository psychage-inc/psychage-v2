# Build Verification — Read-Only State Audit

**Date:** 2026-06-20 (post-republish; see baseline-drift note)
**Scope:** psychage-v2 (web), "psychage app" (psychage-mobile, Expo), shared Supabase `ozourhqyqtpppvpbhphw`.
**Mode:** READ-ONLY. No writes, migrations, status flips, or fixes were made. This file is the only artifact written.
**Centerpiece:** the Conditions reference section.

---

## Phase 0 — read paths (all confirmed)

| Path | Status | Evidence |
|---|---|---|
| psychage-v2 repo | ✅ | cwd, branch `feat/article-drafts-batch` |
| Mobile repo | ✅ | `/Users/raiyanabdullah/Desktop/psychage app` — `package.json` name `psychage-mobile`, `main: expo-router/entry` (NOT named `psychage-master-app`) |
| Shared Supabase, service-role | ✅ | `.env` `SUPABASE_SERVICE_ROLE_KEY` present; queried via PostgREST. Project ref `ozourhqyqtpppvpbhphw` |

Query method: PostgREST REST with service-role (ground truth) and anon (public view) keys. Counts via `Prefer: count=exact` + `Range` content-range. RLS tested by anon-vs-service comparison.

---

## ⚠️ Baseline drift — read this first

A **republish script ran today at 16:36** (`archive-manifests/republished-2026-06-20T16-36-07-663Z.json`, count 115), flipping 115 previously-published-then-archived articles back to `published`. This happened **after** both the task baseline AND the existing `AUDIT.md` were written, so their article counts are stale.

| Metric | Task baseline | AUDIT.md (earlier today) | **Live now** | Note |
|---|---|---|---|---|
| published | 1,203 | 1,203 | **1,318** | +115 from republish |
| archived | 798 | 155 | **40** | drops as skeletons → draft/republish |
| draft | 0 | 643 | **643** | article-drafts batch ran |
| article_categories | 48 | 48 | **48** | unchanged ✅ |
| articles total | — | 2,006 | **2,006** | unchanged ✅ |

Reconciliation (exact): old 798 archived → 643 became drafts-with-content + 115 republished = 758; 40 remain archived (8 null-category + 32 womens-mental-health). 643 + 115 = 758 ✅.

---

## A. Conditions section — PARTIAL (built in code, **not live to the public**)

### A1. DB — ❌ spec table NOT deployed (name collision)

- The spec migration `supabase/migrations/20260620000003_conditions_reference.sql` does `CREATE TABLE IF NOT EXISTS public.conditions` with the full spec shape (slug, icd11_code, icd11_grouping, four definition fields, crisis_flag, provenance, verification_status, reading_level) + RLS (`conditions_public_read_verified` = verified-only; `conditions_admin_all`).
- **Live `conditions` table is a LEGACY 5-row table** with columns `id, name, description, recommended_action, article_id, created_at, category, is_active` — no slug/icd11/verification. Rows: `anxiety, depression, …` (5).
- `conditions_reference` table **does not exist** (PostgREST `PGRST205`).
- **Net:** the migration is NOT applied to the shared DB, and as written it cannot be applied cleanly — `CREATE TABLE IF NOT EXISTS` no-ops against the pre-existing legacy `conditions`, then the `CREATE INDEX … (slug)` / `(icd11_grouping)` statements would error on columns that don't exist on the legacy table. **Blocker: table-name collision between legacy `conditions` and the spec table.**
- DB definition completeness: N/A — 0 spec rows exist. crisis_flag, verification_status splits: N/A.
- RLS: legacy `conditions` is anon-readable (5 rows, no verification gate) — irrelevant table. The spec RLS exists only in the unapplied migration.

### A2. Web (psychage-v2) — ✅ fully built in the working tree

| Item | Status | Evidence |
|---|---|---|
| `/conditions` index | ✅ | `src/pages/conditions/ConditionsIndexPage.tsx`; routed `src/App.tsx:243`. A–Z groups (`letterOf`), alphabet rail + scroll-spy (`AlphabetRailWithSpy`), search input (name + ICD-11 code), ICD-11 family filter chips (`ConditionFilters.tsx`) |
| `/conditions/:slug` detail | ✅ | `src/pages/conditions/ConditionDetailPage.tsx`; routed `App.tsx:244`. Renders all 4 fields (`SECTIONS` 17-22), ICD-11 code chip (95-97) + grouping pill, fixed disclaimer `<DisclaimerFooter/>` (149), per-field + whole-page "in review" states for NULLs |
| Read-aloud "Listen" | ✅ | `ConditionListenControl` → `ArticleAudioPlayer` uses Web Speech API (`SpeechSynthesisUtterance`, feature-detected) |
| Verification gate | ✅ | `conditionsService.applyGate` (68-73): public = `verification_status==='verified'` only; `?preview=1` (read in both pages) passes `includeUnverified` |
| Data source | ✅ cascade | `conditionsService` queries Supabase `conditions` → on error/missing, supplements/falls back to bundled corpus by slug |
| Bundled corpus | ✅ 113 conditions | `src/data/conditions/icd11Chapter6.ts` aggregates 5 family files (21+32+23+16+21=113); 20 ICD-11 families (`groupings.ts`) |
| Field completeness (corpus) | ✅ 113/113 | all four fields + provenance filled on every entry; **crisis_flag = 0/113** (seed forces `false`, by design "left for review"); verification_status = unverified on all 113 |
| No mascot / disclaimer | ✅ | no mascot refs in conditions surfaces; disclaimer on index + detail |
| Nav entry | ✅ | `src/config/navigation.ts:209-215` — top-level "Conditions" → `/conditions` |

**Critical consequence:** all 113 corpus rows are `unverified` AND the DB has no verified rows → the **public `/conditions` surface renders EMPTY**. The 113 conditions only appear behind `?preview=1`. The feature is authored but not publicly live, even on the branch.

### A3. Mobile (psychage-mobile) — ❌ NOT started

- No conditions index, no detail, no data layer, no read-aloud. Route tree is Hub/History/Learn/Profile only (`app/(tabs)/_layout.tsx`); Learn tab is a stub `<ScreenContent title="Learn"/>`.
- No `expo-speech` dependency; grep for the 4 field names / `icd11` = 0 hits.
- Supabase client = anon key only (`lib/supabase/client.ts`); schema types declare 5 tables (users, mood_entries, streaks, assessments, crisis_events) — no conditions.
- No naming collision (no Symptom Navigator / "Browse conditions" exists either).
- `.env` is value-less (key names only) — project ref not committed.

---

## B. Categories + menu — PARTIAL

| Item | Status | Evidence |
|---|---|---|
| Menu points only at populated slugs | ⚠️ depends on runtime alias | Mega-menu is generated from `CANONICAL_CATEGORIES` (`navigation.ts:64-72` → `/learn/${slug}`). Links target canonical slugs. Of the 8 renamed pairs, content lives under the **drift** slug for 4 (depression-mood 70, relationships-social 155, workplace-academic 75, self-esteem-identity 66) and under the **canonical** slug for 4 (trauma-healing 55, sleep-body-connection 60, cultural-global 50, therapy-navigation 50). The 4 drift-held ones resolve only via `resolveCanonicalSlug` + `LEGACY_SLUG_ALIASES` (`taxonomy.ts:112-121`) at the service layer — branch-only |
| Empty-category guard | ✅ | `categoryService.getGrouped()` folds drift→canonical (`:111`) and `.filter(c => c.articleCount > 0)` (`:139`) |
| Dedup/republish migration applied | ❌ | `20260620000004_reconcile_category_slugs.sql` is **untracked** and **not applied**; DB still has 48 rows incl. both drift + canonical twins. Its guarded renames (`WHERE NOT EXISTS canonical`) are a **no-op** against this DB because the canonical rows already exist |
| psychosis-schizophrenia republished | ✅ | 65 published (was archived; in republish manifest) |
| womens-mental-health republished | ⚠️ partial | 30 published + **32 still archived** + 4 draft (manifest republished only 30) |
| New nav category tab | ✅ | top-level "Conditions" nav link (new vs main) + in-page LearnPage `TabMenu` + grouped "Browse by topic" |
| Taxonomy contract | ✅ | `src/config/taxonomy.ts` (untracked) freezes 3 groups + 31 canonical categories + 8 aliases; `taxonomy.contract.test.ts` guards uniqueness/aliases/no-orphans/no-unexpected-empties (`ALLOWED_EMPTY={'eating-body'}`) — **test not executed in this audit** |

Live published count: **1,318**. 48 category rows confirmed (matches baseline).

---

## C. Article-drafts batch — DONE (generation); republish flagged but safe

| Item | Status | Evidence |
|---|---|---|
| Skeleton generation ran | ✅ | 643 drafts, **all with content** (0 null-content drafts) |
| Draft quality | ✅ | word_count avg 1,488 (range 1,400–1,726), median 1,482 |
| Draft citations | ⚠️ | 630/643 have citations (13 without); `article_citations` total 14,240. Memory note "citations pending" largely resolved |
| Remaining archived skeletons | — | 8 archived null-category + 32 archived womens-mental-health |
| **Drafts flipped to published** | ✅ **0** | **No draft → published. All 643 drafts are still `status=draft`.** |

**CRITICAL check result (loud):** the +115 published rows are **NOT** unapproved draft publishes. They are restores of articles whose archive manifest `previous_status='published'` (script `scripts/publish-ex-published-archived.ts`, manifest-backed + reversible). Breakdown: psychosis 65, womens 30, aging 15, loneliness 4, habits 1. ⚠️ Caveat: `clinical_approved=false` on all 1,318 published rows — but that is the pre-existing norm across the whole table, not introduced by this run.

---

## D. Web bugs from clinical review

| Bug | Status | Evidence |
|---|---|---|
| Category tile navigation | ✅ FIXED | `LearnPage.tsx:688-693` → `navigate(getCategoryUrl(slug))`; `ArticleCategoryPage.tsx:22-29` resolves stale→canonical and redirects |
| Search — substring relevance | ✅ FIXED | weighted scoring in `searchService.ts:164-186` (title 40 / subtitle 20 / tags 15 / category 12 / phrase +25 / slug fast-path). NOTE: separate branches `fix/search-relevance` (Fuse.js) + `fix/search-ui` exist, unmerged/unpushed |
| Search — keyboard focus loss | ❌ NOT-ADDRESSED | `SearchAutocomplete.tsx` has no `onKeyDown`/arrow-nav/focus mgmt; LearnPage input uses a 200ms blur timeout workaround. AUDIT.md marks root cause UNCONFIRMED (needs live browser repro) |
| Search — ESC-vs-Enter label | ⚠️ confirmed in header palette | `Navigation.tsx:380` renders an "ESC" chip in the submit slot; form has no `<button type=submit>`. Public `SearchAutocomplete` has no such label |
| Back-nav from tool sub-apps | ⚠️ partial | tool sub-apps hardcode `navigate('/tools')` (works). Dedicated stale-chunk fix `lazyWithRetry` is on unmerged branch `fix/back-nav` (`82b4e70`), **absent from current tree**. AUDIT.md: likely scroll-restoration, needs live repro |
| Missing category images | ⚠️ graceful fallback | `CategoryCard.tsx:23-44` renders color band + icon, ignores `image` → no broken imgs. ~13 categories lack `CATEGORY_IMAGES` entries; tracked in `audits/IMAGE_AUDIT_REPORT.md` (PR #34 merged) |
| "Join the movement" button | ✅ FIXED | `Footer.tsx:110` → `<Link to="/about">`, not dead |

---

## E. Build health + branches

### Web (psychage-v2, feat/article-drafts-batch)
- **typecheck `tsc --noEmit`: ✅ PASS** (exit 0, 0 errors). No `typecheck` script; `build` = `tsc && verify:routes && build:api && vite build`.
- **lint: ❌ FAIL** — 517 problems (269 errors, 248 warnings); `lint` script uses `--max-warnings 0`. Top: `no-explicit-any` 229, `no-unused-vars` 135, `no-useless-escape` 86 (generated article data), `react-hooks/set-state-in-effect` 19. 53 auto-fixable.
- **build: not run** (typecheck passed; AUDIT.md separately recorded a prior `pnpm build` exit 0 with large-chunk warnings).
- **tests: not run** (`vitest run`) — incl. the taxonomy contract test, so its pass/fail is UNKNOWN.

### Mobile (psychage-mobile)
- **typecheck: ✅ PASS** (`node node_modules/typescript/bin/tsc --noEmit` exit 0). Expo ~54, RN 0.81.5, React 19, expo-router 6.

### Branches / PRs (web)
| Branch | Local/Remote | Merged | Ahead | Note |
|---|---|---|---|---|
| feat/article-drafts-batch | L+R | no | 7 | current; carries conditions commit + 6 draft commits |
| feat/conditions-full | L+R | **YES** | 0 | misnamed — equals main, has OLD icd11 file only, NO migration/pages |
| feat/conditions-ui | L only | no | 1 | = commit b8e5137 (conditions feature) |
| feat/conditions-icd11-reference | R only | no | 1 | = b8e5137; **PR #33 OPEN** |
| fix/back-nav | L only | no | 2 | not pushed, no PR |
| fix/search-relevance | L only | no | 2 | not pushed, no PR |
| fix/search-ui | L only | no | 2 | not pushed, no PR |
| feat/ui-polish-navigator-expansion | L+R | YES | 0 | PR #5 merged |

Open PRs: **#33** conditions, **#32** article-drafts, #23 db, #21 ai-rename. Merged & relevant: #34 image audit, #31 nav align to keeper slugs, #5 navigator, #2 search category mapping.
**The conditions feature + taxonomy refactor are UNMERGED to `main` → not deployed. Production runs pre-fix code.**

---

## Conditions — what's left to ship (ordered)

1. **Resolve the table-name collision.** The spec table can't deploy as written: legacy `conditions` (5 rows) blocks `CREATE TABLE IF NOT EXISTS public.conditions`, and the index DDL would error. Decide: rename/retire legacy table, or target a distinct name and update `conditionsService`. (DB)
2. **Apply the (fixed) `20260620000003_conditions_reference` migration** to the shared DB so the spec table + RLS exist.
3. **Seed the 113 corpus rows** into the table (no seed in the migration; data lives only in `src/data/conditions/`).
4. **Clinical verification pass:** review copy and set `verification_status='verified'` (currently 0 verified → public sees nothing). This is the gate that makes `/conditions` non-empty.
5. **Set `crisis_flag`** on the conditions that warrant it (currently 0/113; deliberately deferred to review).
6. **Merge PR #33** (or `feat/article-drafts-batch`) to `main` and deploy — routes, nav link, service, pages are branch-only today.
7. **Mobile conditions** — build from scratch: index + detail screens, `expo-speech` "Listen", read-only Supabase `conditions` fetch (anon, verified-only). Nothing exists yet.
8. (Optional) Verify `?preview=1` reviewer path against the real DB once the table exists (today it only works off the bundled corpus).

---

## Overall — remaining to finish everything (ordered)

**P0 — restore deployed browse-to-read**
1. Merge `feat/article-drafts-batch` → `main` + deploy (ships taxonomy fix, grouped Learn index, conditions, nav). Production nav currently dead-ends on renamed slugs.
2. Fix + apply `20260620000004_reconcile_category_slugs` (current form is a no-op against the live DB — canonical twins already exist; needs to merge/relink, not just rename).

**P1 — make paid-for content visible**
3. Publish DRAFT-LOCKED categories once citations land: eating-body (70), creativity-therapeutic-arts (65), life-skills-practical-psychology (110), environmental-eco-psychology (66) — all draft, 0 published.
4. Give orphaned draft slugs a canonical home + publish: neurodivergence-adhd-autism (70), chronic-illness-disability (70), financial-wellness (65), sports-exercise-psychology (65).
5. Finish womens-mental-health: 32 still archived, 4 draft.
6. Add citations to the 13 drafts without them.

**P2 — conditions** (see dedicated punch list above).

**P3 — search / nav polish**
7. Land search fixes: focus-loss (needs live repro), submit affordance vs "ESC" chip, decide between in-tree weighted scoring and the unmerged Fuse.js branch.
8. Land `fix/back-nav` (`lazyWithRetry`) — not pushed.

**P4 — quality gates**
9. Lint: 517 problems block `lint --max-warnings 0`.
10. Run the test suite (taxonomy contract test status unknown).

**P5 — mobile** — Expo app has no conditions, no Learn content; from-scratch build.

---

## Divergences from baseline / spec, and surprises

1. **Republish ran at 16:36 today** (+115 published) — published 1,203→1,318, archived 798→40. Postdates the task baseline and `AUDIT.md`.
2. **`conditions` is a legacy table, not the spec table** — name collision is a real deployment blocker for the conditions migration.
3. **Baseline said canonical twins sit at 0** — true for 4 pairs, but 4 canonical slugs already hold the published content (trauma-healing, sleep-body-connection, cultural-global, therapy-navigation).
4. **0 unexpected publishes** — all 643 drafts remain draft; the +115 are reversible restores of ex-published rows (manifest-backed). Critical check PASSED.
5. **A prior `AUDIT.md` exists** (thorough, same day) but its article counts predate the republish; this report supersedes them.
6. **`feat/conditions-full` is misnamed** — it equals `main` and lacks the migration + pages; the real feature is commit `b8e5137` (PR #33, open).
7. **Mobile repo exists** (`psychage app` / `psychage-mobile`) — contradicts AUDIT.md's "mobile app absent" (AUDIT.md only looked inside psychage-v2). But it has no conditions/Learn content.
8. **All 1,318 published rows have `clinical_approved=false`** — pre-existing norm, not a new regression, but worth noting for any "published = clinically approved" assumption.
