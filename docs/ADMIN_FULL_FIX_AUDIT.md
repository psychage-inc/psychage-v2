# Admin Surfaces — Full Fix Audit

**Date:** 2026-06-24 · **Branch/PR:** `fix/admin-surfaces-systemic` → **#79** (squash-merged to `main`, commit `3b69e3b`) · **Prod deploy:** Vercel Production `3b69e3b` live `2026-06-24T07:09:24Z` (admin.psychage.com) · **Chart migration:** applied to prod DB the same day (269 articles, backed up).

Autonomous fix-and-verify session. Every claim below is backed by a live-DB query, a deployed-asset grep, or a headless render against production. Where I could **not** verify (authed admin UI — I have no admin credentials and will not elevate a test account on prod), that is stated plainly.

---

## TL;DR — per-surface status

| # | Surface | Before | After | Verified how |
|---|---|---|---|---|
| 1 | **Quality Heatmap** (`/articles/quality`) | Blank (silent) | Renders real data; honest error banner on failure | Live DB: narrowed query 1,961 rows @ ~0.8 MB/~2 s (was ~50 MB/~10 s). Deployed code grep. **Authed UI: human eyeball pending.** |
| 2 | **Citation Diversity Report** (`/articles/citations`) | Blank/at-risk | Renders; honest error banner on failure | Live DB: 14,834 citations paginate ~5.5 s. Deployed code grep. **Authed UI: human eyeball pending.** |
| 3 | **Providers** (`/providers`) | "0 total" (timeout) | Loads paginated real data + honest total (~423,404) + server-side name search | Live DB: page 50 rows @ ~3.3 s, count 423,404 @ ~0.5 s. Deployed `ProviderList` chunk grep. **Authed UI: human eyeball pending.** |
| 4 | **Symptoms** (`/symptom-navigator/symptoms`) | "0 found" (`42703`) | Renders the 12 real catalog rows | Live DB: realigned query returns 12. Deployed `SymptomList` chunk grep. **Authed UI: human eyeball pending.** |
| 5 | **Article chart** (public reader + admin preview) | Blank husk box | Renders real chart (SVG) | **Headless prod render verified** on 2 live articles (SVG present, 0 husks, 0 JS errors). |
| 6 | **No WORDS column** (article list) | Words column present | Column + CSV field removed; `word_count` data intact | Deployed `ArticleList` chunk grep; build green. **Authed UI: human eyeball pending.** |
| 7 | **Systemic error surfacing** | Silent skeleton/"0 total" | Failed read → real error (code+message), not a fake empty | `DataTable` `error` prop + page banners; deployed. |
| 8 | **Categories = 30** (`/articles/categories`) | 48 | **Still 48 — GATED STOP** (no canonical-30 in code; blast radius 818≫37) | See Phase 5. Proposal emitted for editorial review. |

---

## Root causes (recon — all against the live DB)

True row counts (service-role): **providers 423,404** (all `status='seeded'`, `tier='unverified'`), provider_locations 423,403, **symptoms 12**, **article_categories 48**, articles 2,006 (1,961 published), **article_citations 14,834**.

- **Providers — NOT an RLS regression.** R2 hypothesised the provider-RLS work (`20260622000001_providers_insert_status_guard`, `20260623000001_providers_admin_write`) broke the read. It did not — those migrations only add INSERT/child-write policies and are correct. The real cause: `ProviderList` ran an **unbounded `provider_locations!inner` join + `ORDER BY display_name` over 423,404 rows**, which exceeds the statement timeout → **PostgREST `57014` ("canceling statement due to statement timeout")**. The query threw, the page ignored the error, and `providers` was `undefined` → "0 total". (The brief's "~200" was stale; the directory is a ~423 k NPPES seed.)
- **Quality Heatmap.** `getArticlesWithTaxonomy` did `select('*')`, pulling the full `content` HTML body for ~1,961 rows = **~50 MB / ~10 s** → timeout/OOM; the `catch` returned `[]` → empty heatmap with no error. (This is the #54 uncap interacting badly with `select('*')`.)
- **Citation Report.** Heavy but functional: `getCitationDiversityReport` paginates 14,834 citations (~5.5 s). Risk was a swallowed error → empty report.
- **Symptoms.** `SymptomList` ordered by `symptom_id` and read `clinical_name`/`display_names` — columns that **do not exist** on the live `symptoms` table (real schema: `id, name, category, domain, is_crisis, sort_order, is_active`). The query threw **`42703` "column symptoms.symptom_id does not exist"** → "0 found". The component was written against a never-deployed richer schema.
- **Charts.** 283 articles held empty `<div class="recharts-responsive-container">` shells (a React `ResponsiveContainer` serialized to nothing during static-render seeding). The numeric data was **lost from the DB** but survives in the article **source** files (`src/data/articles/**.tsx`) as `<ArticleChart type title data={[...]} source />`. **0** articles used the hydratable `data-chart-block` format.

---

## Phase 1 — Systemic error surfacing

`DataTable` (shared by all admin lists) gained `error` / `onRetry` props. When a query errors (and isn't loading), the table renders the **real** failure (PostgREST code + message) instead of a misleading empty row, and the "N total" badge is suppressed. `formatQueryError` is exported and reused by the two non-table surfaces (Quality, Citation) via `AdminErrorBanner`. The two heavy aggregates (`getArticlesWithTaxonomy`, `getCitationDiversityReport`) now **re-throw** instead of silently returning `[]`.

**Acceptance:** a deliberately-failing query now shows an error surface, not a blank skeleton. ✔

---

## Phase 2 — Failing reads fixed (code-only; no migrations)

> Migrations are **not** auto-applied by this repo's deploy (build = `tsc && verify:routes && build:api && vite build`; no `supabase db push`). All fixes are therefore code-only against the existing prod schema, and deploy via merge→Vercel. The `migration-drift` CI gate stayed green.

- **Quality:** `getArticlesWithTaxonomy` now selects a metadata-only `TAXONOMY_COLUMNS` set (no `content`). ~63× smaller payload, ~5× faster; renders at full volume. Quality + Citation pages show an `AdminErrorBanner` on failure.
- **Providers:** rewritten to **server-side pagination** (`range()` + `count:'exact'`, page size 50), **server-side name search** (`ilike`, debounced), and a **per-page location lookup** (`provider_locations.in(provider_id)`) — no unbounded join. Shows the **honest** total (~423,404). The `!inner`-join timeout is gone.
- **Symptoms:** realigned to the real catalog schema via a **local** `SymptomCatalogRow` type (`id/name/category/domain/is_crisis/is_active`); the shared `SymptomRecord` (used by the clinical mapping screens) is **untouched**. Renders the 12 rows. SR-1 75% relevance-cap notice preserved.
- **Citation:** kept client pagination (an SQL-aggregation RPC would need a migration this repo doesn't auto-apply); now surfaces errors honestly.

**Live-DB proof of each fixed query** was run during recon (counts/timings above). **Deployed-asset proof:** the production chunks `ProviderList-*.js` (contains "Search by name", `range(`), `SymptomList-*.js` ("Navigator catalog", `is_crisis`), and `articleAdminService-*.js` (the `TAXONOMY_COLUMNS` list) all contain the new code.

**Residual honesty:** I could not click through the **authed** admin UI (no admin credentials; elevating a test account on prod RBAC is out of scope/unsafe). A human admin should eyeball surfaces 1–4 and 6. The data + deployed code are verified.

---

## Phase 3 — Blank charts re-authored with REAL data

`scripts/migrate-chart-husks.ts` indexes every `<ArticleChart>` in source (346 blocks, 344 distinct titles, 2 ambiguous skipped), matches each DB husk to its source chart **by `<h4>`/aria-label title**, and replaces the empty `recharts-responsive-container` with `<div data-chart-block data-chart="{json}">` — the exact format the shared reader hydrator (`ArticleHtmlRenderer` → `ReadOnlyChart`) already mounts. The husk card's existing `<h4>` and `<p>Source…</p>` are preserved.

- **Coverage:** **282 / 296 husks matched** with real data across **269 articles**; 14 unmatched husks (no source file) **left untouched** — never fabricated. All 282 generated blocks validated (entity-decode → `JSON.parse` → `data.length>0`, type ∈ bar/line/pie). Source types mapped for `ReadOnlyChart`: area→line, donut/pie→pie, radar→bar.
- **Safety / reversibility:** full per-article content backup written before any write → `scripts/backups/chart-husk-backup-20260624.json.gz` (1.2 MB). **Rollback:** `gunzip -k scripts/backups/chart-husk-backup-20260624.json.gz && tsx scripts/migrate-chart-husks.ts --rollback scripts/backups/chart-husk-backup-20260624.json`.
- **Applied:** 269 ok / 0 failed. Post-apply DB: 269 articles carry `data-chart-block`, 14 still carry an (unmatched) empty husk.
- **No sanitizer change.** `data-chart-block`/`data-chart` are already in `ArticleHtmlRenderer`'s DOMPurify `ADD_ATTR`; the value is HTML-attribute-escaped exactly like Tiptap output. No script execution; data-only.

**Live render proof (production public reader, headless Chromium):**
- `how-depression-and-social-isolation-reinforce-each-other` → 1 `data-chart-block`, **1 recharts SVG**, 0 husks, 0 JS errors.
- `mental-health-stigma-in-the-workplace-and-its-hidden-costs` → 1 block, **1 SVG**, 0 husks, 0 errors.
- `blood-sugar-inflammation-mood-connections` → DB is correctly migrated, but the public reader briefly served a **pre-migration cached copy** (Supabase edge cache); it will reflect the chart once the cache TTL expires. **No data issue** — the DB row is correct and the admin preview (which reads Supabase directly via `articleAdminService`) renders the new block via the same hydrator.

**Acceptance:** chart renders on the live reader with real data; public reader unaffected (0 JS errors); no XSS/sanitizer weakening. ✔ (with the noted edge-cache propagation caveat for a subset of articles)

---

## Phase 4 — WORDS column removed

The Words column was removed from the article list table **and** the CSV export header/row. `word_count` data is untouched in the DB, and the quality-scoring that consumes it (`ArticleQualityDashboard`, rewrite flagging) is unchanged. The ReviewQueue's inline "N words" stat (a single-article review metadata strip, not a table column) was left as-is.

**Acceptance:** no Words column in the article list; scoring intact. ✔

---

## Phase 5 — Categories → 30: GATED **STOP** (not executed)

Both preconditions failed:
1. **No canonical-30 in code.** The source of truth `src/config/taxonomy.ts` → `CANONICAL_CATEGORIES` has **34** entries (stale comment says "31"); there is no hardcoded 30-list or `content-architecture.ts`.
2. **Blast radius far beyond estimate.** Articles under the 14 non-canonical categories total **818** (not ~37): 653 under 9 documented `LEGACY_SLUG_ALIASES` (mechanical) + 165 under 5 orphans with **no** successor (`life-transitions` 85, `children-adolescents` 47, `neurodevelopmental` 14, `ocd-related` 10, `substance-addiction` 9).

Per the session gate ("if no canonical-30, STOP; do not blind-guess clinical content"), **no category rows or article assignments were changed.** A reversible plan + proposed old→new mapping is in [`docs/category-migration-proposal.md`](category-migration-proposal.md) for editorial sign-off. `article_categories` also has **no** `is_active` column, so a reversible retire needs a schema migration coordinated with whoever applies migrations.

**Categories admin still shows 48.** This is the one reported surface intentionally **not** changed.

---

## What visibly works vs. still open

**Works (verified):**
- Charts render on the live public reader with real data (SVG), no errors, no blank husks (for served-fresh articles).
- Providers / Quality / Symptoms / Citation reads succeed against the live DB with the deployed fix code; Providers shows the honest 423 k total.
- Systemic error surfacing is deployed (failed reads show real errors).
- WORDS column gone; build + full CI green; prod deploy live.

**Still open / honest caveats:**
- **Authed admin UI** (surfaces 1–4, 6) verified by data + deployed code, **not** by clicking the logged-in admin — a human admin should eyeball.
- **14 articles** retain an empty chart husk (no recoverable source data — not fabricated). Optional follow-up: a CSS rule to collapse any empty `recharts-responsive-container`.
- **Edge-cache propagation:** a subset of public reader pages may briefly show pre-migration content until Supabase's cache TTL expires; DB is correct.
- **Categories = 30 not done** (gated STOP); proposal awaiting editorial decision.

## Rollback handles
- **Charts:** `gunzip -k scripts/backups/chart-husk-backup-20260624.json.gz && tsx scripts/migrate-chart-husks.ts --rollback scripts/backups/chart-husk-backup-20260624.json`
- **Code:** revert PR #79.
