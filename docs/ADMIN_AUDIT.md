# Admin Panel Audit — Psychage v2

**Scope:** The admin SPA (`admin.psychage.com`) — a CMS/ops surface over ~1,961 published articles. Entry `src/admin-index.tsx` → `src/AdminApp.tsx`; pages under `src/pages/admin/v2/*`; layout `src/components/admin/AdminLayout.tsx`; auth via `ProtectedRoute` + `RoleGuard` + `useAdminAuth`. React Router v7, lazy routes, Supabase backend.

**Method:** Read-only. Static code + migration trace, four parallel investigators, plus `tsc`/`eslint`/spot-verification of load-bearing claims. No source was modified.

**Audience / severity lens:** Dr. Lena Dobson (Clinical Neuropsychology) is the first user; she will **review and approve content within days**. Every finding is tagged **HANDOVER-BLOCKING** (stops her reviewing/approving content, or corrupts the review surface so she can't trust it) or **not**. Internal-admin visual polish is LOW unless it impairs use.

**Date:** 2026-06-22 · **Branch:** `feat/category-posters`

---

## TL;DR — the 8 highest-severity items

| # | Finding | Severity | Handover-blocking? | Evidence |
|---|---|---|---|---|
| 1 | **Citations silently discarded** — Quality tab never loads existing `article_citations` and never saves edits; shows success-shaped UI while persisting nothing | CRITICAL | **YES** | `ArticleDetail.tsx:87`, `CitationManager.tsx:356,378,383`; persistence fns exist but are never imported |
| 2 | **Quality-gate score never persists** — "Run Quality Check" result is ephemeral; `updateArticleQualityScore` never called | HIGH | **YES** (corrupts evidence-review surface) | `QualityGateDashboard.tsx:197-219`; `articleAdminService.ts:732-760` |
| 3 | **Catalog dashboards silently cap at 1,000 of ~1,961 rows** — Quality Map, Citation Report, Pipeline, Category distribution under-count with no indicator | HIGH | **YES** (mis-triage; she'd believe she sees the whole catalog) | `articleAdminService.ts:819,930,1010,1031` |
| 4 | **Article-type change is a no-op** — selector toasts "set to X" but never writes | HIGH | NO (but actively misleading) | `ArticleDetail.tsx:245-250,297-300` |
| 5 | **Providers directory INSERT is owner-gated, not admin-gated** — any authenticated non-admin can inject a self-owned `status='active'` provider into the public directory, unaudited | CRITICAL (security) | NO (not content-review) | `20260306000001_provider_directory_v2.sql:212-213,63,207` |
| 6 | **Admin "create provider" / Bulk Import are broken** — insert without `user_id` is RLS-rejected; Bulk Import also targets the dropped legacy schema | HIGH | NO | `ProviderEditor.tsx:514-516`, `BulkImport.tsx:72-82` |
| 7 | **Approving a provider application does nothing downstream** — flips `status` only; never creates a `providers` row | HIGH | NO | `ApplicationReview.tsx:36-42` |
| 8 | **No UI to edit tags/category after creation; no full public preview** — review-time recategorization and "see it as a reader" are missing | MEDIUM | NO | `ArticleDetail.tsx` (Content tab edits body + type only) |

**Build health is green:** `tsc --noEmit` → 0 errors; `eslint` (admin scope) → 0 errors, 10 non-blocking warnings (React-Compiler "incompatible library" notes for `react-hook-form` `watch()` / TanStack `useReactTable`). No dead lazy chunks; every sidebar link resolves to a registered route.

**Bottom line for handover:** The core approve flow (open → read → edit body → publish) genuinely works against the real `articles` table. What is **not** safe to hand over is the **evidence-quality review surface**: citations and quality scores look editable but persist nothing (#1, #2), and the catalog-wide triage dashboards silently show half the library (#3). Fix #1–#3 before Dr. Dobson relies on the panel for evidence review.

---

## 1. Surface map (routes → components → data → roles)

**Auth model (two layers, both real):**
- **Route gate** — `AdminApp.tsx:91-97` wraps the whole admin layout in `ProtectedRoute` (`src/components/auth/ProtectedRoute.tsx`, requires auth) + `RoleGuard allowedRoles={['admin']}` (`RoleGuard.tsx:47`). Role comes from `AuthContext` → Supabase **`app_metadata.role`** (server-controlled), coarsened to `'admin'` via `src/lib/adminRole.ts` (`AuthContext.tsx:44-65`).
- **Shell/page gate** — `AdminLayout.tsx:11` calls `useAdminAuth()`, which reads the **`admin_roles` table** for the granular tier (`super_admin`/`clinical_admin`/`viewer`) and renders an "Access Denied" screen on `denied` (`AdminLayout.tsx:30-69`, `useAdminAuth.ts:30-34`). A **dev-only bypass** grants `viewer` if `import.meta.env.DEV && user_metadata.role==='admin'` (`useAdminAuth.ts:40-49`) — dead-code-eliminated in prod builds, low risk.

All v2 routes resolve to admin-only access. Data source for **every routed v2 page is live Supabase** (no mock fallback) **except** the Articles surface, which falls back to a 9-row mock on query error (with a visible amber banner).

| Route | Component | Data (table / RPC) | Status |
|---|---|---|---|
| `/dashboard` | `v2/Dashboard` | `profiles`, `clarity_score_history`, `providers`, `content_documents`, `admin_audit_log`, `getArticleStats` | PARTIAL (2 cards hardcoded `null`, 1 chart placeholder) |
| `/articles` | `v2/articles/ArticleList` | `articles`, `article_categories` (via `articleAdminService`) | WORKS (real ~1,961 rows; mock on error) |
| `/articles/new` | `ArticleCreator` | `articles` insert | WORKS |
| `/articles/:id` | `ArticleDetail` | `articles`, `article_comments`, `article_images`+Storage `article-images`, `article_status_history` | WORKS (body/publish/media) · BROKEN (citations, quality, type) |
| `/articles/:id/breakdown` | `ArticleBreakdown` | `articles` | WORKS (decorative drag handles inert) |
| `/articles/categories` | `ArticleCategories` | `article_categories`, `articles` | PARTIAL (1,000-row cap) |
| `/articles/pipeline` | `ArticlePipeline` | `articles` (`updateReviewStage`) | PARTIAL (1,000-row cap; inert drag handles) |
| `/articles/tree` | `ArticleTree` | `articles`, `article_derivatives` | WORKS (lazy child queries) |
| `/articles/quality` | `ArticleQualityMap` | `getArticlesWithTaxonomy` | PARTIAL (1,000-row cap) |
| `/articles/citations` | `ArticleCitationReport` | `articles`, `article_citations` | PARTIAL (1,000-row cap, both queries) |
| `/articles/quality-dashboard` | `ArticleQualityDashboard` | article rewrite service (`flagForRewrite`) | WORKS · **orphaned from nav** |
| `/articles/clusters` | `TopicClusters` | `articles` (`reorderClusterChildren`) | WORKS (only real drag-reorder) · orphaned from sidebar |
| `/content` | `v2/content/ContentList` | `content_documents` | WORKS |
| `/content/new`, `/content/:id/edit` | `ContentEditor` | `content_documents`, `content_versions` | WORKS (see §6 — **not** the public reader) |
| `/providers` | `ProviderList` | `providers`(+`provider_locations`), `provider_applications` | WORKS (suspend); `specialty_labels` always `[]` |
| `/providers/new`, `/:id/edit` | `ProviderEditor` | `providers` + 6 junctions + 5 lookups | UPDATE works · **INSERT RLS-broken** (#6) |
| `/providers/applications` | `ApplicationReview` | `provider_applications` | PARTIAL — approve has no downstream effect (#7) |
| `/providers/import` | `BulkImport` | NPPES API → `providers` | **BROKEN** — legacy schema (#6) |
| `/symptom-navigator/symptoms` | `SymptomList` | `symptoms` | WORKS |
| `/symptom-navigator/conditions` | `ConditionList` | `conditions`, `symptom_condition_mappings` | WORKS |
| `/symptom-navigator/conditions/:id/edit` | `ConditionEditor` | `conditions`, `symptom_condition_mappings`, `symptoms` | WORKS |
| `/symptom-navigator/mappings` | `MappingMatrix` | `symptoms`, `conditions`, `symptom_condition_mappings` | WORKS |
| `/safety` | `SafetyDashboard` | `crisis_keywords` | PARTIAL — "All Clear" banner is hardcoded |
| `/safety/keywords` | `CrisisKeywords` | `crisis_keywords` | WORKS (test panel is client-side substring match) |
| `/safety/conversations` | `ConversationReview` | none | **STUB** — static empty state, no query |
| `/toolkits` | `ToolkitReview` | `toolkits`, `toolkit_items` (`toolkitAdminService`) | WORKS |
| `/settings` | `Settings` | `platform_settings` | WORKS |
| `/settings/users` | `UserManagement` | RPCs `admin_list_roles`/`admin_upsert_role`/`admin_remove_role`/`get_user_by_email` | WORKS (super-admin gated) |
| `/settings/audit-log` | `AuditLog` | `admin_audit_log` | WORKS (CSV export) |
| `/onboarding` | `AdminOnboarding` | none (static 6-step) | WORKS (informational) |

**Service layer:** Articles are abstracted through `src/services/articleAdminService.ts` (+ `articleRewriteService.ts`, `toolkitAdminService.ts`) and `src/lib/admin/auditLogger.ts`. **The other 16 v2 pages call `supabase.from()` directly** — no service boundary, ad-hoc error handling inlined per page. Single anon-key client (`src/lib/supabaseClient.ts`); no service-role key in the bundle.

---

## 2. Content lifecycle status (step by step)

Public site reads the **same `articles` table** (`articleService.ts:196,378-383`), so admin body edits and publishes reach readers. Confirmed.

| # | Step | Status | Evidence |
|---|---|---|---|
| 1 | **List / filter / search** | WORKS | `getArticles` paginates real rows via `fetchAllRows` (`articleAdminService.ts:78-98`); filters/search client-side (`ArticleList.tsx:124-129,401`). Mock (9 rows) only on query error, with amber banner + "Live/Demo" pill (`ArticleList.tsx:377-417`). |
| 2 | **Create** | WORKS | `createArticle` insert (`articleAdminService.ts:115-131`); slug auto-gen + editable (`ArticleCreator.tsx:41-46`); Zod requires title+slug; writes `tags[]`, `category_id`, `article_type`. |
| 3 | **Edit body** | WORKS | Tiptap emits **HTML** (`editor/TiptapEditor.tsx:73`) → `updateArticle(content, content_format:'html', word_count)` (`ArticleDetail.tsx:252-268`). |
| 4 | **Preview** | PARTIAL | In-admin "View Mode" renders the same DOMPurify'd HTML the public site uses (`ArticleDetail.tsx:183-232,379-386`) — faithful **body** preview, but no hero/TOC/related chrome and **no "open public page" link**. |
| 5 | **Publish / unpublish / draft↔published** | WORKS | `updateArticleStatus` validates transitions, writes `status` (text enum, not boolean), sets `published_at`/`reviewed_by`, inserts `article_status_history` (`articleAdminService.ts:156-224`); buttons gated by allowed transitions + unresolved-blocker check (`ArticleDetail.tsx:1065,1125-1199`). |
| 6 | **Tags & categories** | PARTIAL | Set at **create** (`ArticleCreator.tsx:133-137`); categories read live (`articleAdminService.ts:766-809`). **No UI to edit tags/category after creation** — the Content tab edits body + type only. |
| 7 | **Hero image / media** | PARTIAL | Uploads → Supabase Storage `article-images`, then `article_images` insert (`articleAdminService.ts:386-434`); gallery upload/delete/alt/caption wired (`ArticleDetail.tsx:687-800`). **No UI sets the article's `hero_image_url`/`hero_image_alt`** — the `'hero'` purpose exists as an image tag but isn't wired to the article's hero field. Inline editor image upload requires a saved article first (`ImageUploadDialog.tsx:40-43`). |
| 8 | **Search (admin list)** | WORKS | Client-side over the loaded set (`ArticleList.tsx:396-403`) — not a server query. |
| — | **Citations (Quality tab)** | **BROKEN** | See 3.1. |
| — | **Quality score** | **BROKEN** | See 3.2. |
| — | **Article type (Content tab)** | **BROKEN** | See 3.3. |

---

## 3. Critical defects

### 3.1 — Citations silently discarded · CRITICAL · **HANDOVER-BLOCKING**
The Quality tab renders `<CitationManager citations={citations} onChange={setCitations} />` where `citations` is **local React state initialized to `[]` and never loaded from the DB** (`ArticleDetail.tsx:87,171-172`). `CitationManager`'s add/edit/delete handlers only call `onChange(...)` to mutate that local array (`CitationManager.tsx:356,378,383`) — never a service. The persistence functions exist (`saveArticleCitation`, `getArticleCitations`, `deleteArticleCitation`, `articleAdminService.ts:648-730`) but are **never imported anywhere**.

**Effect:** existing citations stored in `article_citations` never display (panel always starts empty), and any citation a reviewer adds is **lost on tab switch / reload** while the UI shows success-shaped feedback. For a clinician whose core job is verifying that mental-health content cites real sources, the evidence-review surface is non-functional and actively misleading. **Root cause:** wiring gap — service exists, UI not connected to it.

### 3.2 — Quality-gate score never persists · HIGH · **HANDOVER-BLOCKING** (corrupts review surface)
`QualityGateDashboard` computes a score in-memory (`runQualityGate`/`setResult`, `QualityGateDashboard.tsx:197-219`) but never writes it; `updateArticleQualityScore` (`articleAdminService.ts:732-760`) is never called. The gate also consumes the same un-persisted `[]` citation state from 3.1, so it effectively always sees **zero citations** unless the reviewer re-enters them in-session. `articles.quality_score`/`readability_grade`/`citation_count` are never updated from this surface.

### 3.3 — Article-type change is a no-op · HIGH · not blocking (but actively misleading)
`handleArticleTypeChange` only fires a toast — no write (verified):
```ts
const handleArticleTypeChange = useCallback((_type: ArticleType) => {
  toast.success(`Article type set to ${_type.replace(/_/g, ' ')}`);
}, []);
```
(`ArticleDetail.tsx:245-250`, wired `:297-300`). Selecting a type shows "Article type set to X" but `articles.article_type` is unchanged on reload. (The same selector in `ArticleCreator` **does** persist.)

### 3.4 — Catalog dashboards silently cap at 1,000 rows · HIGH · **HANDOVER-BLOCKING** (mis-triage)
Several aggregate queries don't use the `fetchAllRows` paginator, so they silently hit Supabase's default 1,000-row ceiling against a ~1,961-row catalog — with **no indicator**: `getCategoryArticleDistribution` (`:819`, Categories), `getArticlesByReviewStage` (`:930`, Pipeline), `getArticlesWithTaxonomy` (`:1010`, Quality Map + Tree), `getCitationDiversityReport` (`:1031`, Citation Report — both the articles and the high-volume `article_citations` query), plus `getQualityStats`/`getQualityArticles` in `articleRewriteService.ts`. A reviewer triaging "which articles need attention" from these surfaces sees roughly **half the library and believes it's the whole**. The main List, Stats, and Categories counts paginate correctly and are unaffected.

### 3.5 — `getArticleById` falls back to mock for a real UUID on transient error · MEDIUM · not blocking
`getArticleById` catches any error and returns `getMockArticles().find(a => a.id === id) || null` (`articleAdminService.ts:100-113`). A real article (UUID not in the 9 mock rows) becomes a "not found" page on a transient failure (`ArticleDetail.tsx:104-112`), and unlike the list there's **no live/mock indicator** on the detail page.

### 3.6 — Providers directory INSERT is owner-gated, not admin-gated · CRITICAL (security) · not content-blocking
The only INSERT policy on `public.providers` is `WITH CHECK (auth.uid() = user_id)` (`20260306000001_provider_directory_v2.sql:212-213`) with **no constraint on `status`/`tier`**; the status CHECK allows `'active'` (`:63`) and public read exposes `status IN ('active','seeded')` (`:207`). So **any authenticated patient/provider can directly `insert` a self-owned, `status='active'`, "verified"-tier provider** into the public mental-health directory, bypassing the application/review flow — and the status-change audit trigger fires only on UPDATE (`20260425000003`), so the injection is **unaudited**. Bounded only by `user_id = auth.uid()` (can't forge ownership). The admin UI hiding is irrelevant; the table is reachable with the shipped anon key. (The "Service role can manage providers" policy is on the *different* `ai_providers` table — `20250220000009:89` — and does not cover this.)

### 3.7 — Admin "create provider" + Bulk Import are broken · HIGH · not blocking
`ProviderEditor.tsx:514-516` and `BulkImport.tsx:72-82` insert into `providers` **without `user_id`**, so `auth.uid() = NULL ≠ user_id` → the only INSERT policy rejects them. Admin provider creation is RLS-broken (no admin INSERT policy exists in any migration). Bulk Import additionally targets the **dropped legacy flat schema** — it inserts `name, credentials, city, state, specialties` which don't exist on the v2 `providers` table (`20260306000001:55-84` uses `display_name`, `credentials_suffix`, `provider_locations`, the `provider_specialties` junction, and `provider_type_id NOT NULL`). Broken since the 2026-03-06 v2 migration.

### 3.8 — Approving a provider application has no downstream effect · HIGH · not blocking
`ApplicationReview.tsx:36-42` flips `provider_applications.status='approved'` only; it **never inserts a `providers` row**, so an approved application produces no directory listing (no materializing trigger found — the only related trigger audits provider status, not application approval). Also a vocabulary split: the page acts on `status='pending'` while the Dashboard counts "pending applications" via `providers.status='submitted'` (`Dashboard.tsx:67`) — different table, different value, so the two counts diverge.

---

## 4. UX issues

- **No full public preview** of an article — only a body-only "View Mode" (`ArticleDetail.tsx:183-232`); a reviewer can't see hero/TOC/related/disclaimer as readers will. MEDIUM.
- **No post-creation tag/category editing** (§2 step 6) — recategorizing during review is impossible without recreating. MEDIUM.
- **Decorative drag handles that don't work** — `GripVertical` in `ArticleBreakdown.tsx:165`, `ArticlePipeline.tsx:46`, and `CitationManager.tsx:263` imply drag-reorder/Kanban but have no handlers (Pipeline advances only via buttons). Only `TopicClusters` actually reorders. LOW (UX trap).
- **Performance tab is a disclosed placeholder** — `"Analytics Integration Pending … once analytics (Plausible/PostHog) are connected"` (`ArticleDetail.tsx:1291-1302`); `view_count` likely 0. LOW (honest stub).
- **Inconsistent information architecture** — only the Articles section has sidebar sub-items (`AdminSidebar.tsx:108-109`); Providers/Safety/Settings/Symptom-Navigator have equally deep trees reachable only via Command Palette / in-page buttons. `/articles/quality-dashboard` is reachable by **no** nav at all (orphaned). LOW.
- **Command Palette is hand-curated and rotting** — omits `quality-dashboard`, `tree`, `pipeline`, `citations`, `categories`, `toolkits` (`CommandPalette.tsx`). LOW.
- **Content editor implies public publishing it doesn't do** — slug field shows `/learn/...` and a "Publish" button sets `is_published=true` (`ContentEditor.tsx:256,380`), but `content_documents` never reaches the public `/learn` site (§6). MEDIUM (confusing, likely to mislead Dr. Dobson about where her edits land).
- **Content editor "Clinical Review Checklist" is cosmetic** — 5 checkboxes with no `checked`/`onChange`, never persisted (`ContentEditor.tsx:346-357`), e.g. "All claims have citations", "Reading level verified". MEDIUM for a clinician who may treat it as a sign-off record.

---

## 5. UI / design-system inconsistencies (LOW unless noted)

The locked tokens **are** defined (`src/styles/tokens.css`: `--color-background:#FBF9F4`, `--color-primary:#1A9B8C`, `--font-display:'Fraunces'`, `--font-sans:'Satoshi'`) and the **inner** shell (`AdminLayout`, `AdminSidebar`, `AdminTopBar`, `DataTable`, `PageHeader`) consistently uses them. Narrow leaks:

- `AdminApp.tsx:48,58` hardcodes `bg-slate-50 dark:bg-neutral-950` + `font-sans` on the outer wrapper instead of `bg-background`; its spinner uses literal `border-t-teal-500` while `AdminLayout.tsx:25` uses token `border-t-primary` — inconsistent within one app. Only shows during Suspense/error. LOW.
- `StatusBadge` (both variants) uses literal `emerald/amber/red/blue` palettes (`src/components/admin/StatusBadge.tsx:47-52`) rather than tokens — defensible (semantic) but not token-driven. LOW.

**A11y (all LOW, none block use):** pagination chevrons (`DataTable.tsx:196-217`) and ArticleList row actions (`:254-268`) are icon-only with `title=` but **no `aria-label`**; TopBar logout uses `title` not `aria-label` (`AdminTopBar.tsx:116`). Touch targets: pagination is 44px (`h-11 w-11`) but TopBar logout (`p-2`) and row actions (`p-1.5`) are ~28-32px, under 44px. Sortable `<th>` are clickable but not `<button>` — not keyboard-operable; no `scope="col"`. CommandPalette lacks `role="dialog"`/`aria-modal` (`CommandPalette.tsx:246-251`).

---

## 6. Missing CMS functionality (what exists but isn't wired)

- **Citation persistence** — service exists (`articleAdminService.ts:648-730`), UI not connected (3.1). Core gap.
- **Quality-score persistence** — `updateArticleQualityScore` exists, never called (3.2).
- **Post-creation tag/category edit** — no UI (§2 step 6).
- **Hero-image assignment** — uploads work, but nothing sets the article's `hero_image_url` (§2 step 7).
- **Article-type edit** — selector is inert on existing articles (3.3).
- **Full public preview** — body-only today (§4).
- **Rewrite workflow advance** — `updateRewriteStatus` exists but no UI advances a flagged article through rewrite stages; `flagForRewrite` writes `original_word_count: undefined` (dropped from payload) (`articleRewriteService.ts:139`).
- **Safety conversation review** — `/safety/conversations` is a static stub (`ConversationReview.tsx:24-27`); Safety Dashboard "All Clear" is hardcoded (`SafetyDashboard.tsx:33-34`), not derived from any flags table.

> Per scope, these are recorded as "exists/wired or not," **not** as feature gap-analysis vs other CMSs.

---

## 7. Security concerns

| Area | Verdict | Evidence |
|---|---|---|
| **Content RLS** (articles, citations, images, status_history, comments, conditions, symptoms, mappings, crisis_keywords, content_documents, platform_settings, audit_log) | **Protected per migrations** — admin writes gated `is_admin_writer()`/super-admin/clinical-admin | `20260423000002_fix_articles_rls.sql:78-165`, `20260610000001` (RLS re-enabled :50-57), `20260310000004:102-116`, `20260310000005:29-32`, `20260310000002:60-85`, `20260310000001:63-78` |
| **admin_roles** | Protected — direct writes `USING(false)`; mutated only via SECURITY DEFINER RPCs with super-admin gates + last-super-admin lockout | `20260330000001:25-26`, `20260612000001:76-172` |
| **Admin RPCs** (`admin_list_roles/upsert_role/remove_role`, `get_user_by_email`) | Trustworthy — all `SECURITY DEFINER, search_path=''`, internal `is_admin()`/super-admin checks, `REVOKE … FROM anon` | `20260612000001:38-172`, `20260607000002:25-49` |
| **Dev bypass** in `useAdminAuth` | Low risk — `import.meta.env.DEV`-gated → DCE'd in prod; grants only `viewer`; all writes still RLS-gated | `useAdminAuth.ts:7,40-49` |
| **Secrets in bundle** | Clean — client uses anon key only; `SERVICE_ROLE`/`ANTHROPIC`/`OPENAI` keys appear only in Node scripts, never imported into the client graph | `supabaseClient.ts:4-11` |
| **`providers` INSERT** | **UNPROTECTED** — non-admin self-insert of `status='active'` listings; unaudited (3.6) | `20260306000001:212-213,63,207` |
| **provider child tables** (`provider_locations`/`specialties`/`languages`/`insurance`/`cultural_competencies`) | Owner-scoped, **no admin policy** — admin edits on non-owned providers RLS-rejected and only `console.error`'d (silent partial save); non-admin can freely manage their own self-inserted provider's children | `20260306000001:221-256`; `ProviderEditor.tsx:568,579,594,605,616` |

> **Caveat:** All RLS verdicts assume migrations reflect the deployed DB. Article RLS was disabled then re-enabled across migrations (`20260316000009` → `20260610000001`), so live `pg_policies` / `relrowsecurity` should be confirmed directly. See Open Questions.

---

## 8. Architecture / tech-debt concerns

- **Entire v1 admin is dead code** — `src/pages/admin/*.tsx` (AdminDashboard, AdminContentPage, AdminAnalyticsPage, UserManagementPage, ProviderManagement, ReportsPage, ReportDetailPage, ProviderDetailAdmin, AdminUserDetailPage, AuditLogPage, AdminSettingsPage) is **not imported by any router** (`AdminApp.tsx` routes only v2 + `AdminOnboarding`). ~270 KB / ~25 files. `src/pages/admin/onboarding/*` is **live** (do not remove). The v1 mock data (`data/adminMockData.ts`, `articleMockData.ts`) is also dead.
- **Duplicate component implementations** — two `AdminLayout` (`src/components/admin/` live vs `src/pages/admin/components/` dead), two `DataTable` (live `components/admin/DataTable.tsx` vs dead `pages/admin/components/AdminDataTable.tsx`), two `StatusBadge` with **different status vocabularies and visual weight**. `src/components/admin/TiptapEditor.tsx` is a harmless 1-line barrel re-export of the real editor.
- **No service boundary for 16 of 18 v2 pages** — articles are abstracted, everything else inlines `supabase.from()` in the page, so schema/RLS changes ripple into components.
- **Two `content_documents` migrations** (`20250220000006`, `20260310000002`) — column drift between them would surface as insert errors; the editor assumes the superset schema (unverified).
- **Duplicate `get_user_by_email`** with the same arg signature but different return types across two migrations — `CREATE OR REPLACE` can't change a return type, so apply order matters; both are admin-gated (no security gap, correctness flag).

---

## 9. Quick wins (≤1 hour each)

1. **Wire the citation panel** (3.1) — load `getArticleCitations` into the Quality tab's state and call `saveArticleCitation`/`deleteArticleCitation` from `CitationManager`'s handlers. Service already exists. *Highest-value single fix.*
2. **Persist article-type** (3.3) — make `handleArticleTypeChange` call `updateArticle(id, { article_type })` instead of just toasting.
3. **Persist quality score** (3.2) — call `updateArticleQualityScore` on "Run Quality Check".
4. **Uncap the dashboards** (3.4) — route `getCategoryArticleDistribution`/`getArticlesByReviewStage`/`getArticlesWithTaxonomy`/`getCitationDiversityReport` through the existing `fetchAllRows` paginator (or add a visible "showing first 1,000" note).
5. **Add a "View on site" link** on `ArticleDetail` to `/learn/:slug` for a real public preview.
6. **Detail-page mock indicator** (3.5) — surface the live/demo state on `ArticleDetail` as the list already does, so a transient failure isn't read as "deleted."
7. **`aria-label`s + 44px targets** on icon-only buttons (`DataTable.tsx:196-217`, `ArticleList.tsx:254-268`, `AdminTopBar.tsx:116`).
8. **Relabel the Content editor** so its `/learn/...` slug + "Publish" don't imply it reaches the public reader (§6), or hide those affordances.

> Provider security/correctness items (3.6–3.8) are **not** quick wins — they require RLS policy changes + a schema-aware rewrite of Bulk Import/approval, and a live-DB policy audit.

---

## 10. Open questions (unverified assumptions)

1. **Live DB vs migrations.** Every "Protected" RLS verdict assumes migrations match the deployed database. Confirm directly: `SELECT relname, relrowsecurity FROM pg_class WHERE relname IN ('articles','providers',…)` and `SELECT * FROM pg_policies WHERE tablename IN (…)`. Article RLS churn (disabled `20260316000009` → re-enabled `20260610000001`) makes this non-academic.
2. **Does the admin session actually read all ~1,961 rows in prod?** If RLS or env blocks the read, ArticleList silently shows the 9-row mock + amber banner. The in-browser `diagnoseConnection` helper (`articleAdminService.ts:1100-1127`) can verify this live.
3. **Are `article_citations` already populated** for the live articles (by seed scripts)? If yes, the public ReferenceList may show citations the admin Quality tab can't display or edit (compounds 3.1). Did not read the seed scripts.
4. **Is hero/cover imagery populated by a script** (the `resolveImageUrl` cover-path convention at `articleService.ts:56` hints yes), given no admin UI sets it?
5. **Provider INSERT (3.6/3.7).** Whether an admin/service INSERT policy exists only in the Supabase dashboard (not migrations) is unverifiable here — confirm via `pg_policies WHERE tablename='providers'`. If absent, the non-admin self-insert is live **and** admin create is broken.
6. **Is the v1 admin intended for deletion**, or kept for a planned re-route? It compiles and pulls in the duplicate component kit; confirm before removal (some `pages/admin/components/*` may still be imported by tests).
7. **`content_documents` two-migration column drift** — not diffed against the live DB; a mismatch would surface as ContentEditor insert errors.

---

*Read-only audit. No source files were modified; the only file created is this report.*
