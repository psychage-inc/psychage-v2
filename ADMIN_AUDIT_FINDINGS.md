# Admin Panel — Forensic Audit Findings

**Repo:** `psychage-v2` (web) · **Branch:** `design/web-fraunces-display` · **Date:** 2026-06-05
**Mode:** READ-ONLY. No source file was modified. Only this report was created.
**Verification run:** `tsc --noEmit` → exit 0 · `eslint` (admin scope) → 0 errors / 10 benign warnings · full `eslint` → 257 errors / 242 warnings (all non-admin).

---

## 1. Summary

**Severity counts:** P0 = 2 · P1 = 1 · P2 = 4 · P3 = 3 (CODE: 7 · HUMAN: 3).

**State of the panel.** The admin panel is, in code, surprisingly complete: a separate Vite entry (`admin.html` → `src/admin-index.tsx` → `src/AdminApp.tsx`), ~37 routes, real Supabase-backed CRUD across Dashboard, Articles, Content, Providers, Symptom-Navigator, Safety, and Settings, with loading/empty/error states and audit logging throughout. TypeScript compiles clean and admin code has zero lint errors. **Yet the panel cannot be logged into.** The cause is not a missing feature — it is a single, fully-verified **role value-vocabulary mismatch**: the database stores admin roles as `super_admin | clinical_admin | viewer` and syncs that *granular literal* into the JWT (`app_metadata.role`), while the entire client-side gate only recognizes the literal string `'admin'`. Every admin — including the demo admin the project's own script provisions — is therefore mapped to `'patient'`, rejected at the admin login screen with "This account does not have admin access," and signed out. Compounding this, the codebase contains **two independent admin-auth mechanisms with different sources of truth** (a JWT-claim route gate that is broken, and a live `admin_roles` table query that is correct), so the bug is masked in some surfaces and fatal in others.

**Single most important thing to fix first:** **P0-01** — make the client's coarse admin gate recognize the three `admin_roles` sub-roles as "admin" (normalize `super_admin|clinical_admin|viewer` → `admin` in `mapSupabaseUser`, and mirror the check in `LoginPage`). One small change unblocks the entire panel.

---

## 2. Login Root-Cause Analysis

The admin auth chain is: **LoginPage (variant=admin)** → `signInWithPassword` → reads `app_metadata.role` → if not `'admin'`, signs out · then **ProtectedRoute** (auth-only) → **RoleGuard** (`allowedRoles={['admin']}`, reads `user.role` from **AuthContext**, which maps from `app_metadata.role`). The role claim itself is written into `auth.users.raw_app_meta_data.role` by a DB trigger fed from `public.admin_roles`. Candidates, ranked by likelihood:

### RC-1 — Role value mismatch (granular DB role vs. coarse client role) — `[CODE]` · **CONFIRMED**
- **Write side (DB):** `admin_roles.role` is constrained to `super_admin | clinical_admin | viewer` — [20260310000001_admin_panel_foundation.sql:10](supabase/migrations/20260310000001_admin_panel_foundation.sql#L10). The authoritative sync function writes that exact value into the JWT claim: `_effective_role := _admin_role; … jsonb_build_object('role', _effective_role)` — [20260423000008_b7_extend_role_sync.sql:80-93](supabase/migrations/20260423000008_b7_extend_role_sync.sql#L80-L93). The reconciliation `UPDATE` does the same — [20260423000008:267-289](supabase/migrations/20260423000008_b7_extend_role_sync.sql#L267-L289) — and the migration's own drift check asserts `app_metadata.role` **equals** `admin_roles.role` — [20260423000008:313-322](supabase/migrations/20260423000008_b7_extend_role_sync.sql#L313-L322). So by design the claim is **never** the literal `'admin'`.
- **Read side (client):** `mapSupabaseUser` accepts only `'admin' | 'provider' | 'patient'` and **defaults everything else to `'patient'`** — [AuthContext.tsx:42-45](src/context/AuthContext.tsx#L42-L45). `LoginPage` reads the claim directly and gates on `role === 'admin'` — [LoginPage.tsx:164-166](src/pages/auth/LoginPage.tsx#L164-L166); a non-match falls to the admin-variant rejection + `signOut()` — [LoginPage.tsx:196-205](src/pages/auth/LoginPage.tsx#L196-L205). `RoleGuard` then requires `user.role ∈ ['admin']` — [RoleGuard.tsx:46](src/components/auth/RoleGuard.tsx#L46), wired at [AdminApp.tsx:90-95](src/AdminApp.tsx#L90-L95).
- **Net effect:** a `super_admin` logs in → JWT `app_metadata.role = 'super_admin'` → `LoginPage` sees `'super_admin' !== 'admin'` → **rejected + signed out**. Even if it reached the router, `mapSupabaseUser` would mark them `'patient'` and `RoleGuard` would bounce them.
- **Demo admin is also affected:** `scripts/create-demo-admin.ts` inserts `admin_roles.role='super_admin'` (its `user_metadata.role='admin'` at line 54 is ignored — the client reads `app_metadata`, not `user_metadata`). So the documented "first run" admin cannot log in either.
- **Confirm-step:** none needed in code (verified). In the live DB: `select raw_app_meta_data->>'role' from auth.users where email='demo@psychage.com';` → expect `super_admin`, which the client rejects.

### RC-2 — `admin.` subdomain / cross-domain env not configured in production — `[HUMAN]` · **INFERRED**
- Production serving is a **host-based rewrite** keyed to `admin.psychage.com` in `vercel.json` (`/(.*) → /admin.html` with `host = admin.psychage.com`; redirects send `psychage.com/admin*` → `admin.psychage.com`). If that subdomain isn't attached/resolving, the panel is unreachable on the main domain.
- The cross-domain URL helpers default `ADMIN_URL`/`MAIN_URL` to `window.location.origin` when `VITE_ADMIN_URL`/`VITE_MAIN_URL` are unset → `_sameOrigin = true` and `isAdminDomain()` is **always false** — [urls.ts:16-19,39-42](src/lib/urls.ts#L16-L42). If those vars aren't set on the Vercel admin project, the basename/redirect logic in [admin-index.tsx:15-22](src/admin-index.tsx#L15-L22) and the post-login cross-domain redirect in [LoginPage.tsx:186-191](src/pages/auth/LoginPage.tsx#L186-L191) misbehave.
- **Confirm-step:** in Vercel — verify `admin.psychage.com` is attached to the project and DNS resolves; verify `VITE_ADMIN_URL`/`VITE_MAIN_URL` are set for the production build. (Out of repo.)

### RC-3 — Migrations not applied / no `admin_roles` row for the user in the live DB — `[HUMAN]` · **INFERRED**
- If `20260423000004` / `20260423000008` never ran, or the user has no `admin_roles` row, `app_metadata.role` is absent → `mapSupabaseUser` → `'patient'` → rejected. (Same symptom as RC-1, different cause.)
- **Confirm-step (live DB):** `select * from admin_roles where user_id = '<uid>';` and `select tgname from pg_trigger where tgrelid='public.admin_roles'::regclass;` (expect `sync_admin_role_to_app_metadata_trg`).

### RC-4 — JWT staleness on role change — `[CODE]` · **CONFIRMED (secondary)**
- The trigger updates `auth.users` but a **live session keeps its old JWT** until refresh/re-login; the client has no forced `refreshSession()` after provisioning. `supabaseClient` is created with defaults (no custom refresh) — [supabaseClient.ts:11](src/lib/supabaseClient.ts#L11). A user promoted mid-session stays "patient" in the UI until their token refreshes. (A *fresh* login mints a current JWT, so this is secondary to RC-1.)
- **Confirm-step:** promote a logged-in user, observe the UI doesn't update until re-login/refresh.

### RC-5 — Supabase Auth redirect-URL allowlist missing the admin origin — `[HUMAN]` · **INFERRED**
- `signup`/OAuth/reset use `${window.location.origin}/auth/callback` and `/update-password` — [AuthContext.tsx:188,286,315](src/context/AuthContext.tsx#L188). Each origin must be in the Supabase Redirect-URLs allowlist; if the admin origin is absent, OAuth/email-confirmation callbacks fail. Lower priority — password login (the primary path) doesn't depend on it.
- **Confirm-step:** Supabase Dashboard → Auth → URL Configuration → confirm admin origin is allow-listed.

**Top 3 blockers:** RC-1 `[CODE]` (the bug), RC-2 `[HUMAN]` (reachability), RC-3 `[HUMAN]` (provisioning/migrations).

---

## 3. Inventory

**Entry chain:** [admin.html:65](admin.html#L65) loads `/src/admin-index.tsx` → [admin-index.tsx](src/admin-index.tsx) mounts `AdminApp` inside `ErrorBoundary → ThemeProvider → QueryClientProvider → BrowserRouter (basename '/' prod, '/admin' dev, L15-22) → AuthProvider` → [AdminApp.tsx](src/AdminApp.tsx) defines routes (L73-139).

**Serving (`vercel.json`):** host-rewrite `admin.psychage.com/(.*) → /admin.html`; path fallback `/admin/:path* → /admin.html`; redirects `/admin*` on `psychage.com` → `admin.psychage.com`. Build registers dual entries `index.html` + `admin.html` — [vite.config.ts:66-110](vite.config.ts#L66-L110); dev uses an `adminFallbackPlugin` for `/admin/*`.

**Stack (`package.json`, verified):** React 18.3.1 · react-router-dom **7.13.1** · @supabase/supabase-js 2.90 · @tanstack/react-query 5.90 · @tanstack/react-table 8.21 · react-hook-form 7.71 · zod 4.3 · TipTap 3 · Vite 5.4 · Vitest 4. (CLAUDE.md's "React Router v7" claim holds; no Next.js in the admin app.)

**Auth gates:** [ProtectedRoute.tsx](src/components/auth/ProtectedRoute.tsx) (auth-only, 200ms deferred spinner, redirects unauth → `/login?redirectTo=`) and [RoleGuard.tsx](src/components/auth/RoleGuard.tsx) (`allowedRoles={['admin']}`, cross-domain redirects). A **separate** granular gate, [useAdminAuth.ts](src/hooks/useAdminAuth.ts), live-queries `admin_roles` (see P3-01).

**Routes & verdicts** (all gated by RoleGuard, so all are *practically unreachable* until P0-01 is fixed; verdicts below describe the component in isolation):

| Route(s) | Component | Verdict |
|---|---|---|
| `/login` (variant=admin), `/auth/callback`, `/reset-password`, `/update-password` | auth pages | **Working** (but admin login rejects valid admins — P0-01) |
| `/onboarding` | AdminOnboarding | Working |
| `/dashboard` | v2/Dashboard | **Working** — real queries, states present |
| `/articles` (+ /new, /categories, /pipeline, /tree, /quality, /citations, /quality-dashboard, /clusters, /:id, /:id/breakdown) | v2/articles/* | **Working** — full CRUD via `articleAdminService` |
| `/content`, `/content/new`, `/content/:id/edit` | v2/content/* | **Working** — CRUD on `content_documents`, publish toggle, delete confirm |
| `/providers` (+ /new, /applications, /import, /:id/edit) | v2/providers/* | **Working** — list w/ joins + fallback, suspend, applications, 1022-line editor |
| `/symptom-navigator/{symptoms,conditions,conditions/:id/edit,mappings}` | v2/symptom-navigator/* | **Working** — CRUD on conditions/symptoms/mappings |
| `/safety` , `/safety/keywords` | v2/safety/{SafetyDashboard,CrisisKeywords} | **Working** — keyword CRUD + test panel |
| `/safety/conversations` | v2/safety/ConversationReview | **Stub-only** — static empty state, no data (P2-02) |
| `/settings`, `/settings/audit-log` | v2/settings/{Settings,AuditLog} | **Working** |
| `/settings/users` | v2/settings/UserManagement | **Working (list/grant/revoke)** — *the original "role CRUD works" claim was wrong*: `admin_roles_modify` is `USING(false)`, so the page's direct `.from('admin_roles')` writes all errored. As of `20260612000001` the page routes through SECURITY DEFINER RPCs (`admin_list_roles` / `admin_upsert_role` / `admin_remove_role`); list = any-admin, mutations = super_admin-only, last-super_admin demote/remove refused. **Invite** still depends on `get_user_by_email` (see P1-01). |
| `*` | → `/dashboard` | Working (redirect) |

---

## 4. Findings

### P0-01 — Admin role value mismatch blocks all admin login
- **Severity:** P0 · **Category:** auth · **Type:** `[CODE]`
- **Location:** [AuthContext.tsx:42-45](src/context/AuthContext.tsx#L42-L45), [LoginPage.tsx:164-166](src/pages/auth/LoginPage.tsx#L164-L166), [RoleGuard.tsx:46](src/components/auth/RoleGuard.tsx#L46) ⟂ [20260423000008:80-93](supabase/migrations/20260423000008_b7_extend_role_sync.sql#L80-L93)
- **Evidence:** Observed (verified across both sides — see RC-1).
- **Impact:** No admin provisioned via `admin_roles` (the only path) can log in; they are rejected and signed out. The entire panel is inaccessible.
- **Proposed fix:** In `mapSupabaseUser`, treat `super_admin|clinical_admin|viewer` as `role='admin'`; apply the same normalization at `LoginPage.tsx:164-166`.
- **Effort:** S

### P0-02 — Two divergent admin-auth sources of truth (route gate broken, table gate correct)
- **Severity:** P0 · **Category:** auth · **Type:** `[CODE]`
- **Location:** [RoleGuard.tsx](src/components/auth/RoleGuard.tsx) + [AuthContext.tsx:38-54](src/context/AuthContext.tsx#L38-L54) (JWT-claim, coarse) vs. [useAdminAuth.ts:29-33](src/hooks/useAdminAuth.ts#L29-L33) (live `admin_roles` query, granular)
- **Evidence:** Observed. `RoleGuard` (active gate at [AdminApp.tsx:90-95](src/AdminApp.tsx#L90-L95)) reads the JWT coarse role and fails (P0-01); `useAdminAuth` reads the table and would correctly recognize the admin — but the user never reaches it because RoleGuard rejects first. The two systems also disagree on vocabulary (`'admin'` vs `super_admin|clinical_admin|viewer`).
- **Impact:** Architectural split-brain. Fixing P0-01 unblocks login but leaves two parallel auth systems that can drift again; server `is_admin()` ([20260423000001:45-57](supabase/migrations/20260423000001_harden_admin_role_checks.sql#L45-L57)) is a *third* source (table-based) — RLS works while the client doesn't, exactly the "split brain" the B-3 migration's header describes.
- **Proposed fix:** Pick one source of truth for the client (recommend deriving the coarse gate from the same `admin_roles`/JWT mapping `useAdminAuth` trusts) and retire the duplicate path.
- **Effort:** M

### P1-01 — "Invite admin" calls a non-existent RPC (`get_user_by_email`)
- **Severity:** P1 · **Category:** data · **Type:** `[CODE]`
- **Location:** [UserManagement.tsx:69](src/pages/admin/v2/settings/UserManagement.tsx#L69) — `supabase.rpc('get_user_by_email', …)`
- **Evidence:** Observed. `rg "get_user_by_email" supabase/` → **no `CREATE FUNCTION`** anywhere in the repo's SQL. The mutation comment even admits it (L67-68: "In a real implementation, this would use Supabase Auth admin invite. For now…"). The call returns a PostgREST error → the invite mutation throws.
- **Impact:** The only way to add a new admin from the UI is broken at runtime. Admins can only be created via the `create-demo-admin.ts`/`migrate-admin-roles.ts` scripts or raw SQL.
- **Proposed fix:** Add the `get_user_by_email(email_input text)` SECURITY DEFINER RPC (service-role-guarded) or move invite to an Edge Function using `auth.admin`.
- **Effort:** M
- **Update (2026-06-12):** The role-grant half of invite now goes through `admin_upsert_role` (migration `20260612000001`), so invite no longer writes `admin_roles` directly. The email→user_id lookup still calls `get_user_by_email`, which remains **absent from committed migrations** — `grep get_user_by_email supabase/migrations` is still empty. Whether it exists in the live DB (applied out-of-band) is unverified in-repo and must be confirmed against prod; until it is in a committed migration, the invite lookup is not reproducible from `supabase db reset`/shadow.

### P2-01 — JWT staleness after role change (no forced refresh)
- **Severity:** P2 · **Category:** auth · **Type:** `[CODE]`
- **Location:** [supabaseClient.ts:11](src/lib/supabaseClient.ts#L11), [AuthContext.tsx:265-281](src/context/AuthContext.tsx#L265-L281)
- **Evidence:** Observed. Trigger updates `auth.users`, but the live JWT is only refreshed on Supabase's schedule; no `refreshSession()` is invoked after a role grant.
- **Impact:** A user promoted mid-session sees no admin affordances until re-login/token refresh.
- **Proposed fix:** Call `supabase.auth.refreshSession()` after `admin_roles` mutations, or document re-login as required.
- **Effort:** S

### P2-02 — Conversation Review is a static stub
- **Severity:** P2 · **Category:** incomplete · **Type:** `[CODE]`
- **Location:** [ConversationReview.tsx](src/pages/admin/v2/safety/ConversationReview.tsx) (33 lines, no query/handlers)
- **Evidence:** Observed — renders a hardcoded "No flagged conversations" empty state; no Supabase read, no controls.
- **Impact:** The `/safety/conversations` nav item leads to a non-functional placeholder.
- **Proposed fix:** Wire to the flagged-conversation source or hide the nav entry until implemented.
- **Effort:** M

### P2-03 — `.env.example` could not be read to confirm required auth vars
- **Severity:** P2 · **Category:** ux-state/config · **Type:** `[HUMAN]`
- **Location:** `.env.example` (repo root) — **not readable in this environment** (permission denied)
- **Evidence:** INFERRED. Code requires `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` ([supabaseClient.ts:3-8](src/lib/supabaseClient.ts#L3-L8), throws if missing) and reads optional `VITE_ADMIN_URL`/`VITE_MAIN_URL` ([urls.ts:16-17](src/lib/urls.ts#L16-L17)). Whether all four are documented in `.env.example` was not verifiable here.
- **Impact:** If the cross-domain vars are undocumented, deployers won't set them → RC-2.
- **Proposed fix:** Confirm `.env.example` lists `VITE_ADMIN_URL`/`VITE_MAIN_URL`; add if absent.
- **Effort:** S

### P2-04 — Admin form components trip React Compiler memoization warnings
- **Severity:** P2 · **Category:** ux-state · **Type:** `[CODE]`
- **Location:** `react-hooks/incompatible-library` warnings: [ArticleCreator.tsx:99](src/pages/admin/v2/articles/ArticleCreator.tsx#L99), [ContentEditor.tsx:125](src/pages/admin/v2/content/ContentEditor.tsx#L125), [ProviderEditor.tsx:701](src/pages/admin/v2/providers/ProviderEditor.tsx#L701), and a TanStack Table `useReactTable` site.
- **Evidence:** Observed in scoped `eslint` (10 warnings, 0 errors). RHF `watch()` / TanStack Table return non-memoizable functions; React Compiler skips memoization for these components.
- **Impact:** Low — potential stale-UI risk if these values are passed into memoized children; not a current failure.
- **Proposed fix:** Acknowledge as known (library limitation) or restructure `watch()` usage; no action required for correctness.
- **Effort:** S

### P3-01 — Orphaned admin page with mock data (`ReportDetailPage`)
- **Severity:** P3 · **Category:** broken-dead · **Type:** `[CODE]`
- **Location:** [ReportDetailPage.tsx:26,81,105](src/pages/admin/ReportDetailPage.tsx#L26) (`// TODO: Wire to api.admin.getReport(id) — using mock data`)
- **Evidence:** Observed. `rg "ReportDetailPage" src/` returns only its own definition/export — **not imported by `AdminApp` or any router**. Dead code carrying mock data and TODOs.
- **Impact:** None at runtime (unreachable); maintenance noise / drift.
- **Proposed fix:** Remove, or route it and wire the real API.
- **Effort:** S

### P3-02 — `useAdminAuth` dev bypass trusts `user_metadata.role`
- **Severity:** P3 · **Category:** drift · **Type:** `[CODE]`
- **Location:** [useAdminAuth.ts:38-51](src/hooks/useAdminAuth.ts#L38-L51)
- **Evidence:** Observed — `if (isDev && session.user.user_metadata?.role === 'admin') { grant viewer }`. Guarded by `import.meta.env.DEV`, so it can't ship to prod, but `user_metadata` is the user-writable field the AUTH-001 hardening deliberately stopped trusting.
- **Impact:** Dev-only; harmless in production builds. Inconsistent with the app-wide "never trust user_metadata for role" rule.
- **Proposed fix:** Base the dev bypass on a non-user-writable signal, or remove it.
- **Effort:** S

### P3-03 — Two admin layout implementations coexist
- **Severity:** P3 · **Category:** drift · **Type:** `[CODE]`
- **Location:** [AdminLayout.tsx](src/components/admin/AdminLayout.tsx) (uses `useAdminAuth`) vs. `AdminLayoutV2` (used by `AdminApp`, gated by RoleGuard).
- **Evidence:** Observed — `AdminApp` mounts the V2 layout under RoleGuard; the v1 `AdminLayout` (with the service-role-key setup note at L44, which is **instructional text only — not a key leak**) uses the table-query hook. Parallel implementations of the same shell.
- **Impact:** Duplication; the inactive path can rot.
- **Proposed fix:** Consolidate to one layout + one auth path.
- **Effort:** M

**Security note (no finding):** The service-role key is **never bundled client-side.** All `SUPABASE_SERVICE_ROLE_KEY` references are Node scripts reading `process.env` ([src/lib/providers/seed*.ts](src/lib/providers/), [src/scripts/*.ts](src/scripts/)) or instructional JSX text ([AdminLayout.tsx:44](src/components/admin/AdminLayout.tsx#L44)). No client `import.meta.env` service-key usage. ✔

---

## 5. Out-of-repo checklist (`[HUMAN]` items)

- [ ] **DNS/Vercel:** `admin.psychage.com` attached to the Vercel project and resolving (RC-2).
- [ ] **Vercel env:** `VITE_ADMIN_URL` / `VITE_MAIN_URL` set on the production admin build (RC-2). `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` present.
- [ ] **Live DB — migrations applied:** confirm `20260423000004` and `20260423000008` ran; trigger `sync_admin_role_to_app_metadata_trg` exists on `public.admin_roles` (RC-3).
- [ ] **Live DB — admin row:** a `admin_roles` row exists for the intended admin user; `select raw_app_meta_data->>'role' from auth.users where email=…` returns a sub-role (RC-3). *Note: until P0-01 ships, that value is exactly what the client rejects.*
- [ ] **Supabase Auth:** admin origin in the Redirect-URLs allowlist (RC-5).
- [ ] **`.env.example`:** confirm it documents `VITE_ADMIN_URL`/`VITE_MAIN_URL` (P2-03 — unreadable in this audit env).

---

## 6. Suggested fix order (recommendation only — not acted on)

1. **P0-01** (S) — normalize admin sub-roles → `'admin'` in `mapSupabaseUser` + `LoginPage`. Unblocks login immediately. *Independent of all HUMAN items.*
2. **RC-2 / RC-3 `[HUMAN]`** — in parallel, verify subdomain + env + migrations + `admin_roles` row so a real admin exists to test P0-01 against.
3. **P0-02** (M) — converge on a single client auth source of truth to prevent regression.
4. **P1-01** (M) — implement `get_user_by_email` (or Edge-Function invite) so admins can be added from the UI.
5. **P2-01** (S) — forced session refresh after role changes.
6. **P2-02 / P3-01 / P3-02 / P3-03** — stub completion + dead-code/drift cleanup as capacity allows.

---

## Appendix — read-only verification

- **Repo root:** `/Users/raiyanabdullah/Desktop/psychage-v2` (confirmed via `git rev-parse --show-toplevel`).
- **Typecheck:** `npx tsc --noEmit` → **exit 0** (no errors).
- **Lint (admin scope):** `eslint src/pages/admin src/components/admin src/AdminApp.tsx src/admin-index.tsx` → **10 problems, 0 errors, 10 warnings** (all `react-hooks/incompatible-library`).
- **Lint (full repo):** **499 problems (257 errors, 242 warnings)** — none in admin files; errors are `no-unused-vars`/`no-explicit-any` in services and tests.
- **`git status --short`** at audit end (the `M` files pre-existed this audit — they are the in-flight `design/web-fraunces-display` branch work and were **not** touched; the audit added only the untracked report):

```
?? ADMIN_AUDIT_FINDINGS.md
(plus pre-existing, untouched: M src/components/article/ArticleCard.tsx, M src/components/articles/FlatArticleCard.tsx, … — see full list below)
```
