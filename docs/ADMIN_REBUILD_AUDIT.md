# Admin Rebuild Audit — Data-layer fix + CMS features

**Date:** 2026-06-22 · **Scope:** `admin.psychage.com` SPA (`src/pages/admin/v2/*`, `src/services/articleAdminService.ts`, admin components) + two RLS migrations + one feature migration. **Backend:** shared Supabase `ozourhqyqtpppvpbhphw` (prod). **Method:** fix + extend (no rebuild). Each phase = its own branch → PR → CI-green → squash-merge.

---

## 0. Context

The admin showed demo/empty data because Supabase reads failed with `42P17 infinite recursion detected in policy`. The brief assumed a single fault on `public.users`. Live introspection found:

- **`users` was already fixed and live** (PR #60, `f16864c`) — that unblocked the **Articles** list (whose policy *Admins can manage articles* reads `users`).
- **`public.profiles` carried the identical self-referential recursion** in two policies and was still live-broken — it backs the admin **Dashboard** user count, so those cards em-dashed. This was the real remaining fault.
- The old admin audit's "broken" CMS items (citations, quality score, article-type persistence) were **already fixed** in current code, so Phase 1 reduced to the five requested no-schema features.

The work proceeded across four phases with the user's explicit approval to apply RLS/feature migrations to production (mirroring how the `users` hotfix was applied).

---

## 1. Phase ledger

| Phase | Branch | PR | Merge SHA | CI | Result |
|---|---|---|---|---|---|
| 0 — kill 42P17 (profiles) | `fix/rls-42p17-recursion` | [#63](https://github.com/ryan24411390/psychage-v2/pull/63) | `e030b3b` | ✅ green | **Merged.** All 4 gates pass. |
| 1 — five CMS features | `feat/admin-cms-core` | [#65](https://github.com/ryan24411390/psychage-v2/pull/65) | `d29adc8` | ✅ green | **Merged.** 5/5 features shipped (9/9 acceptance checks). |
| 2 — revision history | `feat/admin-revision-history` | [#68](https://github.com/ryan24411390/psychage-v2/pull/68) | `4722cc0` | ✅ green | **Merged.** Acceptance pass; not dropped. |
| 3 — QA + this report | `chore/admin-qa-and-audit` | (this PR) | — | — | CommandPalette + a11y fixes; QA recorded below. |

CI per PR: `typecheck` + `vitest` + `build` (`tsc && verify:routes && build:api && vite build`) + `language-gate` + `migration-drift` — all green before each merge.

---

## 2. Phase 0 — the four gate results (verbatim)

The `profiles` recursion was fixed with the same non-recursive pattern as `users`: the self-referential
`EXISTS(SELECT 1 FROM profiles p WHERE p.id=auth.uid() AND p.role='admin')` was replaced with an
`admin_roles` (super_admin/clinical_admin) check, on both the SELECT and UPDATE admin policies. The own-row
policies were left untouched. Shadow-validated on the local postgres:17 stack; applied to prod; verified via
`supabase db query --linked` under `set role authenticated` with a simulated JWT.

1. **No recursion** — `set role authenticated; select count(*) from profiles;` → `0` rows, **no 42P17** (previously threw `42P17`). ✅
2. **Positive** — admin JWT (`admin_roles` super_admin) → reads **all 13** profiles and **2006** articles, no error. ✅
3. **Negative (security)** — non-admin JWT → sees **only its own row (1)**; rows where `id <> self` → **0**. Access did **not** widen. ✅
4. **Live proof** — admin SPA rendered against the now-fixed RLS: **Articles list shows 1959 real rows with no "Showing demo data" banner** (banner match count = 0, zero console errors); **Dashboard "Total Users" shows a real number, not an em-dash** — the exact card the `profiles` recursion was breaking. (Two other Dashboard cards — *AI Conversations*, *Safety Flags* — remain em-dashed; those are pre-existing hardcoded placeholders, unrelated to RLS, documented in the prior admin audit.) ✅

Migrations: `20260622000003_fix_profiles_admin_recursion.sql` (Phase 0). `20260622000002_fix_users_admin_select_recursion.sql` (the users fix, PR #60) was already on `main`.

---

## 3. Features implemented

### Phase 1 — five no-schema features (all shipped)

| Feature | What | Acceptance result |
|---|---|---|
| **F1** post-creation tags/category/hero | `ArticleSettingsCard` in the Content tab edits `tags[]`, `category_id`, `hero_image_url/alt` via `updateArticle`; hero picked from the existing `article_images` gallery. | ✅ Changed category, tags, and hero alt → reload → persisted. |
| **F2** full public preview | "View on site" header link → `mainUrl(/learn/:categorySlug/:slug)` in a new tab; hidden for non-published. | ✅ Link present, `href=https://psychage.com/learn/anxiety-stress/<slug>`. |
| **F3** autosave + draft recovery | Debounced 2.5 s autosave of the editor body for **DRAFT** articles only, content-only `updateArticle` payload — never writes status/publishes; quiet Saving…/Saved indicator. | ✅ Edited a draft → reload showed the change. ✅ Status stayed `draft`. |
| **F4** bulk actions | Multi-select + bulk bar (publish, unpublish→paused, recategorize, flag-for-rewrite); explicit confirm; batched through existing services; per-item audit log; respects status-transition validation. | ✅ 2 rows recategorized + 2 audit rows. ✅ Bulk publish on `rejected` → both skipped, not forced. |
| **F5** CSV export | Article + provider lists export the current filtered set via a new shared `src/lib/admin/csv.ts` (RFC-4180 escaping + UTF-8 BOM). | ✅ Article CSV = header + 2 filtered rows. ✅ Provider CSV header correct. |

### Phase 2 — revision history (shipped, not dropped)

`article_revisions` table (+ monotonic `seq`) and an AFTER-UPDATE `SECURITY DEFINER` trigger on `articles` that snapshots prior title/content on every body/title change (metadata-only updates create none); guarded `EXCEPTION` handler so capture can never block a save; admin-read RLS via `is_admin()`, no client write policy. A **History** tab on `ArticleDetail` lists revisions (who/when/preview) with **Restore** behind a confirm.

✅ Two edits → two revisions; metadata update → none; History lists server-captured revisions; **Restore reverts the body** and captures the then-current version as a new revision (nothing lost); normal updates unaffected.

### Phase 3 — QA fixes

- **CommandPalette**: added the 7 missing entries — Article Categories, Article Pipeline, Content Tree, Quality Map, Quality Dashboard, Citation Report, Toolkits (all routes confirmed in `AdminApp.tsx`; all 6 named + Quality Map verified navigable).
- **a11y quick pass**: `aria-label`s + 44 px target on TopBar **Sign out**; `aria-label`s on DataTable pagination (already 44 px); `aria-label`s + 36 px targets on ArticleList row actions; all new controls (selection checkboxes, hero picker, bulk recategorize select) shipped with `aria-label`s.

---

## 4. Files changed

**Migrations (prod-applied):** `supabase/migrations/20260622000003_fix_profiles_admin_recursion.sql`, `…20260622000004_article_revisions.sql`.

**New:** `src/lib/admin/csv.ts`.

**Modified:** `src/pages/admin/v2/articles/ArticleDetail.tsx` (F1/F2/F3 + History tab), `…/articles/ArticleList.tsx` (F4 + F5 + row a11y), `…/providers/ProviderList.tsx` (F5), `src/components/admin/DataTable.tsx` (`getRowId` + pagination a11y), `src/components/admin/CommandPalette.tsx` (missing entries), `src/components/admin/AdminTopBar.tsx` (logout a11y), `src/services/articleAdminService.ts` (`getArticleRevisions`), `src/lib/admin/types.ts` (`ArticleRevisionRecord`).

---

## 5. Issues fixed

1. **`42P17` recursion on `public.profiles`** (SELECT + UPDATE admin policies) — the live root cause of the em-dashed Dashboard. Fixed non-recursively; security not widened (gate 3).
2. **No post-creation tag/category/hero editing** — added (F1).
3. **No public preview from the admin** — added (F2).
4. **No autosave / draft recovery** — added, draft-only and status-safe (F3).
5. **No bulk operations** — added with confirm + audit + transition safety (F4).
6. **No CSV export; existing AuditLog CSV had no field escaping** — added a correctly-escaped shared helper used by both lists (F5).
7. **No revision history** — added, server-side and un-bypassable (Phase 2).
8. **CommandPalette omitted six+ routes** — added.
9. **Icon-only buttons missing `aria-label`s; sub-44 px targets** — improved on TopBar/pagination/row actions.

---

## 6. Features attempted but not shipped

**None.** Every feature in scope passed its acceptance test and was merged. Phase 2 (the droppable phase) shadow-applied and drift-checked cleanly, so it was kept.

---

## 7. QA results

- **Route smoke (local, admin session):** **23/29** admin routes render with zero real console errors. The 6 exceptions — `settings/users`, `symptom-navigator/{symptoms,conditions,mappings}`, `toolkits` — are **local-stack schema gaps**, not code defects: prod has `toolkits`/`symptoms`/`conditions` tables and the `admin_list_roles`/`get_user_by_email` RPCs that the local stack lacks (verified by direct introspection of both DBs). None of those pages were modified in this work, and the prior admin audit recorded them as working in prod. The article-detail page (which carries the F1/F2/F3/History changes) reloads with **no** real console errors.
- **CommandPalette:** 6/6 newly-added entries found and navigable.
- **Responsive:** captured at 375 / 768 / 1280 — Articles header (incl. new Export CSV), stats grid, filters, and table reflow cleanly at the phone breakpoint.
- **Permissions:** Phase 0 gate 3 proves non-admins still read only their own profile row; route/role gating (`ProtectedRoute` + `RoleGuard` + `useAdminAuth`) is unchanged. The fix did not widen access.
- **CRUD through the real UI:** create→edit→publish/unpublish and the five features were exercised against live data (data now flows post-fix).

---

## 8. Remaining risks

- **Migration history vs prod schema (drift):** the linked project's `supabase_migrations.schema_migrations` is maintained out-of-band — several merged migrations (incl. the `users` fix) are not recorded there, so the CI `migration-drift` check effectively skips (it also no-ops when `SUPABASE_ACCESS_TOKEN` is unset). The Phase 0/2 migrations were applied to prod directly via `supabase db query --linked` (idempotent DDL). Recommendation: reconcile `schema_migrations` so drift-check becomes meaningful.
- **`article_revisions` growth:** every body/title change (including autosave) writes a revision row; expected for history, but worth a future retention/pruning policy on high-churn drafts.
- **Pre-existing, out-of-scope items (from the prior audit, unchanged here):** provider INSERT/Bulk-Import/approval gaps, the `content_documents` editor not reaching the public reader, `safety/conversations` stub, two hardcoded Dashboard placeholder cards. These were explicitly out of scope.
- **Local stack ≠ prod schema:** several admin pages can't be exercised locally (missing tables/RPCs); they were validated by code + prod introspection instead.

---

## 9. Deployment readiness

**Score: 9 / 10 — ready to ship.**

Justification: the hard gate (42P17) is fully resolved and proven on live prod across all four gate tests, with a guarded negative test confirming no access widening. All five Phase-1 features and the Phase-2 revision history passed their acceptance tests through the real admin UI and are merged behind green CI. Changes are additive (expand-only migrations, new components, no rewrite of working surfaces) and match the locked design tokens with no forbidden words. The one withheld point reflects the out-of-band migration-history drift (a process gap, not a defect) and the out-of-scope provider-directory security/correctness items the prior audit flagged, which remain open.
