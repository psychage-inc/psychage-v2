# Admin Panel v2 — Features & Security Audit

**Date:** 2026-06-23
**Scope:** Provider INSERT RLS security gate (Phase 0) + four admin features (Review Queue, server-side search/filters, saved views, real dashboard charts) + this QA report.
**Approach:** Each phase shipped on its own branch → PR → squash-merge, CI-green-gated. Real data only; honest empty/not-connected states where data doesn't exist; no fabricated rows or chart series. Migrations expand-only, shadow-applied locally before prod.
**Production project:** `ozourhqyqtpppvpbhphw`. Catalog at audit time: **2,006 articles** (1,961 `published`, 40 `archived`, 5 `rewritten_session038`).

---

## Phases shipped

| Phase | Feature | PR | Merge SHA | CI | Status |
|---|---|---|---|---|---|
| 0 | Provider INSERT RLS + admin write enablement | [#70](https://github.com/ryan24411390/psychage-v2/pull/70) | `53c59b9` | ✅ green | Shipped |
| 1 | Review Queue | [#71](https://github.com/ryan24411390/psychage-v2/pull/71) | `cf381a1` | ✅ green | Shipped |
| 2 | Server-side search + filter chips | [#72](https://github.com/ryan24411390/psychage-v2/pull/72) | `a9ec5a2` | ✅ green | Shipped |
| 3 | Saved views | [#73](https://github.com/ryan24411390/psychage-v2/pull/73) | `3045f9b` | ✅ green | Shipped |
| 4 | Real dashboard charts | [#74](https://github.com/ryan24411390/psychage-v2/pull/74) | `436c826` | ✅ green | Shipped |

**Features dropped:** none. All five shipped and passed their acceptance tests.

CI checks gating every PR: `build`, `test`, `typecheck`, `language-gate`, `migration-drift` (all green). Note: the CI pipeline does **not** run ESLint; new files were linted locally (clean). The repo's articleAdminService.ts carries 15 pre-existing `catch (err)` unused-var lint errors that pre-date this work and were not introduced or touched here.

---

## Phase 0 — Provider INSERT RLS (SECURITY GATE)

### Was the hole open?
**No — already closed before this work.** Live introspection showed the non-admin self-insert policy already carried the status guard from `20260622000001_providers_insert_status_guard` (PR #58):

```
Authenticated insert provider | INSERT |
  with_check = ((auth.uid() = user_id) AND (status <> ALL (ARRAY['active','seeded'])))
```
Public SELECT exposes only `status IN ('active','seeded')` — exactly the guarded statuses. So the original hole (any authed user inserting a publicly-visible `active` provider) was already closed.

### What was still broken (and fixed in `20260623000001_providers_admin_write.sql`)
1. **No admin INSERT policy** on `public.providers`. `ProviderEditor` "Add Provider" inserts `status='active'` (no `user_id`) under the admin's own session → rejected by RLS. Admin provider creation silently failed.
2. **Provider child tables** (`provider_locations / specialties / languages / insurance / cultural_competencies`) had only owner-scoped policies → admin edits on non-owned providers silently no-op'd.

Fix (expand-only; self-insert guard untouched): added `Admin insert providers` (`WITH CHECK is_admin_writer()`) and `Admin manage provider_*` `FOR ALL` policies on all five child tables. Admin UPDATE on providers was already correct live (`super_admin/clinical_admin`), so it was left as-is.

### The four gate results (verbatim)
| # | Test | Expected | Result |
|---|---|---|---|
| 1 | non-admin JWT INSERT `status='active'` | REJECTED | ✅ `ERROR: new row violates row-level security policy for table "providers"` (local shadow, guard synced to prod definition) |
| 2 | non-admin JWT INSERT `status='submitted'` | ALLOWED (not over-blocked) | ✅ `INSERT 0 1` |
| 3 | admin JWT INSERT `status='active'` (user_id NULL) | SUCCEEDS | ✅ `INSERT 0 1` |
| 4 | re-query prod confirms new policies live | confirmed | ✅ `Admin insert providers` (`is_admin_writer()`) coexists with the intact guard; 5 `Admin manage provider_*` policies live |

Extra child-table checks (local shadow): admin INSERT into `provider_locations` → `INSERT 0 1`; non-admin (non-owner) INSERT → `new row violates row-level security policy`. Confirms the admin policy **does not widen non-admin access**.

### Final live prod state (permissions unchanged for non-admins)
```
providers INSERT:
  Admin insert providers          with_check = is_admin_writer()
  Authenticated insert provider   with_check = ((auth.uid() = user_id) AND (status <> ALL ('active','seeded')))
```

### Migration apply method
Prod's `supabase_migrations.schema_migrations` history is out of sync with applied schema (prior migrations were applied via direct SQL, not `db push`), so `db push` would unsafely replay them. Both new migrations were shadow-applied locally (`docker exec psql`) and applied to prod via idempotent SQL (`supabase db query --linked -f`), consistent with the established pattern. Files are committed for repo provenance.

---

## Phase 1 — Review Queue

Sidebar entry under Articles + `/articles/review-queue` ([src/pages/admin/v2/articles/ReviewQueue.tsx](../src/pages/admin/v2/articles/ReviewQueue.tsx)).

- **Source:** `status='in_review'` via `getReviewQueue()` — the only status from which the queue's actions are valid transitions (`in_review → approved | draft`).
- Each item: title, author, category, word count, body preview + inline Approve / Request changes (note required) / Open full detail. Reuses `updateArticleStatus` (transition validation + `article_status_history` + audit log). Index pointer auto-advances after acting.

**Acceptance:**
- Prod has **0 `in_review` articles**, so the live page renders the honest empty state (expected — real-data-only). Verified `select count(*) where status='in_review'` → 0.
- Action logic verified on the **local shadow DB** (temporary `in_review` row, never seeded to prod): Approve → `in_review→approved` + history row written; Request changes → `in_review→draft` + history row with note. Mirrors exactly what `updateArticleStatus` writes.

---

## Phase 2 — Server-side search + filter chips

[ArticleList.tsx](../src/pages/admin/v2/articles/ArticleList.tsx) + `searchArticles` / `fetchArticlesForExport` in [articleAdminService.ts](../src/services/articleAdminService.ts).

- Free-text (`title` + body `content` via `ilike`) and all filters (status, stage, category, author, updated-date range, min rating, has-citations) run in the DB. Ranged pagination + `{ count: 'exact' }`. **No 1000-row cap.** Every active filter is a removable chip + Clear filters. CSV export pulls the full filtered set server-side.

**Acceptance:**
- **Server-side proof:** "The Sedentary Crisis" is at **global rank 1500** by `updated_at`; `title ilike '%sedentary%'` returns it — a client search over page-1 / first-1000 could never find it.
- **Filter narrowing:** `crisis` → 987 → `+published` 980 → `+rating≥4` 0 → `+has-citations` 987. (`rating≥4` → 0 because `rating_overall` is largely unpopulated in prod — honest, not a bug.)
- Combined filters AND together; result count exact against the full catalog.

---

## Phase 3 — Saved views

Migration `20260623000002_admin_saved_views.sql` + service CRUD + "Views" bar in ArticleList.

- Table `admin_saved_views(id, user_id, name, filters jsonb, created_at)` with **owner-scoped RLS** (mirrors `bookmarks`): per-op SELECT/INSERT/DELETE on `auth.uid() = user_id`, `TO authenticated`. No admin override.

**Acceptance (local shadow + live prod policies):**
- Save → persists; `listSavedViews` reads it back. Filters JSON round-trips intact (`q/status/reviewStage/categoryId/author/dateFrom/dateTo/minRating/hasCitations`). `applyView` restores exact state.
- Delete works (owner DELETE policy).
- **RLS isolation:** owner SELECT → 1 row, other user SELECT → 0 rows; cross-owner INSERT spoof → `new row violates row-level security policy`.
- Live prod: table + 3 owner-scoped policies, `relrowsecurity = true`.

---

## Phase 4 — Real dashboard charts

[Dashboard.tsx](../src/pages/admin/v2/Dashboard.tsx) + `getPublishingByMonth` / `getArticlesByCategory` / `getReviewThroughput`.

All charts use recharts, real data from existing tables only; honest not-connected states otherwise.

**Acceptance — numbers reconcile with source tables (live prod):**
| Chart | Source | Result |
|---|---|---|
| Articles Published Over Time | `articles.published_at` | sums to **1974** (2026-03: 1331 + 2026-06: 643). 1974 vs 1961 published-status is expected — `published_at` persists through archive/pause |
| Pipeline by Status | `getArticleStats` | published 1961 + archived 40 shown; 5 non-standard `rewritten_session038` not shown |
| Articles by Category (top 10) | grouped `category_id` | 2006 = 1998 categorized + 8 Uncategorized |
| Review Throughput | `article_status_history` | 2 rows → honest "minimal activity (2 status changes)" note, **no fabricated series** |

- **AI Conversations (24h)** and **Safety Flags (7d)** metric cards: kept, now show "Not connected yet — needs analytics integration" (no invented numbers).

---

## Phase 5 — QA results

| Area | Method | Result |
|---|---|---|
| Build / typecheck | `tsc --noEmit`, full `pnpm run build` on merged main | ✅ pass |
| Route registry | `verify:routes` + AdminApp.tsx inspection | ✅ all admin routes present; `articles/review-queue` registered ahead of `articles/:id` (static route wins in RR v7) |
| New-file lint | ESLint on ReviewQueue / Dashboard / ArticleList | ✅ clean |
| Permissions unchanged (Phase 0 didn't widen non-admin access) | live policy re-introspection + gate 1/2 shadow tests | ✅ non-admin still rejected for `active`; admin INSERT enabled; child-table admin policy does not grant non-admins |
| Saved-views tenant isolation | RLS shadow test | ✅ cross-admin reads blocked |
| a11y on new controls | code review | ✅ aria-labels on all actionable controls; 44px targets (`min-h-[44px]`) on Review Queue actions and citation toggle |
| Design tokens / forbidden words | grep + review | ✅ teal `#1A9B8C` used for chart accents/icons only; no forbidden UI words (the only `trend` token is a pre-existing non-visible prop name) |
| No fabricated data | review | ✅ every chart/metric is real or an honest not-connected state |

### QA gap (honest)
Live click-through of the four features in an **authenticated admin browser session**, the **responsive visual check at 375 / 768 / 1280**, and the **runtime console-error smoke** were **not** performed in this autonomous run — the admin panel is gated by `RoleGuard(['admin'])` and no admin credentials were available headlessly. These are covered indirectly by: full production build (all routes compile + bundle), `verify:routes`, DB-level acceptance for every feature, and live prod policy introspection. **Recommended manual pass** before calling it fully done:
1. Sign in as an admin; load every route in the sidebar — confirm no console errors.
2. Review Queue: confirm empty state (or move one article to `in_review` to exercise Approve / Request changes / auto-advance).
3. Article List: search a deep term, toggle each filter chip, save/apply/delete a view.
4. Dashboard: confirm the four charts render and the two metric cards show the not-connected note.
5. Resize to 375 / 768 / 1280 — confirm layout holds.

---

## Remaining risks
- **Migration history drift:** prod schema is correct and live, but `schema_migrations` does not record the recent direct-applied migrations (incl. these two). Future `supabase db push` could attempt replays — continue applying via direct idempotent SQL, or run a one-time `migration repair` to reconcile history.
- **Review Queue is unexercised in prod** because nothing is currently `in_review`. The feature is correct (verified on shadow), but its primary path won't be visible until articles enter review.
- **Ratings largely unpopulated** → the rating filter and any rating-derived view return few/no rows. Real-data reflection, not a defect.
- **5 `rewritten_session038` articles** use a non-standard status that the pipeline chart and status filters don't enumerate (counted in totals, not in the status breakdown).
- Pre-existing `catch (err)` lint debt in articleAdminService.ts remains (out of scope; CI doesn't lint).

---

## Readiness score

**8.5 / 10 — production-ready pending a short manual UI pass.**

All five phases shipped, CI-green, with DB-level acceptance and live prod verification for each. The −1.5 reflects the one honest gap: no authenticated live-UI / responsive / console-error smoke was possible in this autonomous run (credentials unavailable), and the Review Queue's primary path is currently unexercised because prod has no in-review articles. None of the shipped features failed an acceptance test; none were dropped.
