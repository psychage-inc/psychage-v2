# Admin Panel Launch Readiness — Findings

**Branch:** `launch/admin-readiness`
**Base:** `main` at `d9f61e6` (post-prompt-1 user-site readiness merge)
**Bar:** Hard launch readiness — admin surface privileged; threat is wrong-person-reaches-it OR right-person-does-damage-by-accident
**Scope:** Admin panel served from `admin.psychage.com` via `admin.html` → `src/admin-index.tsx` → `src/AdminApp.tsx`. Out of scope: user site (settled by prompt 1), auth architecture, Supabase dashboard.

---

## Surface inventory

- **Entry HTML:** `admin.html` (separate from `index.html`)
- **Bootstrap:** `src/admin-index.tsx`
- **Routes registry:** `src/AdminApp.tsx` — 32 admin paths under root protected layout
- **Route gates:** `ProtectedRoute` + `RoleGuard allowedRoles={['admin']}` on every non-auth route
- **Role resolution:** `AuthContext.mapSupabaseUser` reads from `app_metadata.role` (post-AUTH-001). `useAdminAuth` reads `admin_roles` table for sub-role (super_admin / clinical_admin / viewer)
- **Audit logger:** `src/lib/admin/auditLogger.ts` → `admin_audit_log` table (RLS: SELECT + INSERT only, no UPDATE/DELETE policies)
- **Audit viewer:** `/settings/audit-log` (`AdminAuditLogV2`)
- **Confirm modal:** `src/components/admin/ConfirmDialog.tsx` (Radix AlertDialog — does not dismiss on overlay click or escape) + legacy `AdminConfirmModal` used by older non-routed pages
- **Cross-domain redirect:** `RoleGuard.tsx` issues `window.location.href = mainUrl(...)` for non-admin role on admin domain, returning `null` to suppress UI flash

## Active vs legacy admin pages

`AdminApp.tsx` only routes `src/pages/admin/v2/**` plus `AdminOnboarding`. Several legacy files in `src/pages/admin/` (`AdminAnalyticsPage`, `AdminContentPage`, `AdminSettingsPage`, `AdminUserDetailPage`, `AuditLogPage`, `ProviderDetailAdmin`, `ProviderManagement`, `ReportDetailPage`, `ReportsPage`, `UserManagementPage`, `AdminDashboard`) are unreachable from the admin app. Treated as out-of-scope (dead code). Logged as observation OB-005.

---

## Summary

- Blockers found: 4
- Non-blockers logged for observations: 7
- Operator-handled items: see Phase G

---

## Blockers

### AB-001 — Admin domain serves no robots.txt
- **Category:** discoverability
- **Evidence:** `vercel.json:21-26` — admin host (`admin.psychage.com`) has rewrite rule `{ "source": "/(.*)", "destination": "/admin.html", "has": [{"type":"host","value":"admin.psychage.com"}] }`. A request to `https://admin.psychage.com/robots.txt` is rewritten to `/admin.html`. Crawlers receive HTML (not text/plain robots.txt) and may treat the admin domain as crawlable.
- **Why blocker:** Admin must NOT be discoverable. `meta robots noindex` in admin.html is mitigation, but malformed/missing robots.txt at the domain root is the protocol-level signal. Crawl budget waste plus risk of admin URLs being indexed via referer leakage.
- **Fix shape:** Add `public/robots-admin.txt` containing `User-agent: *\nDisallow: /`. Insert host-scoped rewrite ahead of catch-all in `vercel.json`: `{ "source": "/robots.txt", "destination": "/robots-admin.txt", "has": [{"type":"host","value":"admin.psychage.com"}] }`.

### AB-002 — admin.html robots meta missing `noarchive`, `nosnippet`
- **Category:** discoverability
- **Evidence:** `admin.html:8` — `<meta name="robots" content="noindex, nofollow">`. Spec D.1 requires `noindex, nofollow, noarchive, nosnippet` to suppress cached snapshots and rich snippets even if noindex is somehow ignored.
- **Why blocker:** Cached snapshot of admin shell could leak from a past indexing accident or third-party crawler that ignores noindex. Defence-in-depth.
- **Fix shape:** Replace the meta tag with `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">`.

### AB-003 — Admin role grant/revoke fires on dropdown change without confirmation
- **Category:** authorization (destructive action without confirm)
- **Evidence:** `src/pages/admin/v2/settings/UserManagement.tsx:91-103` — role select is rendered for super_admins; `onChange` directly calls `changeRoleMutation.mutate({ id, newRole })`. No `ConfirmDialog`, no typed-confirm, no undo affordance. The action audit-logs (`logAdminAction action: 'update'`), but a slip on the dropdown can promote a viewer to super_admin or demote the only super_admin.
- **Why blocker:** Spec C.3 explicitly enumerates "Role grant / revoke" as requiring confirmation. Removing super_admin from the only super_admin can lock the platform out of admin write capability.
- **Fix shape:** Capture pending role change in local state, render `ConfirmDialog` describing from→to transition, only mutate on confirm. Self-demotion guard already exists for the Remove button (line 119); add equivalent guard for self-role-change.

### AB-004 — User-site /admin redirect leaks admin URL into public network traffic
- **Category:** discoverability (minor)
- **Evidence:** `vercel.json:7-19` — host `psychage.com` redirects `/admin` and `/admin/:path*` to `https://admin.psychage.com/...` with `permanent: false` (302). The Location header makes `admin.psychage.com` discoverable to anyone probing `/admin`. Likewise `src/App.tsx:120-131` routes `/admin/*` to a client-side `AdminRedirect` that calls `adminUrl()`.
- **Why blocker (downgraded → observation OB-006):** This is the canonical pattern for cross-domain admin separation. The admin domain is *intended* to exist; redirecting from a user-discoverable path to it is unavoidable. Mitigation is operator-level (DNS, WAF, IP allowlist) and outside this branch's scope. Reclassified to OB-006.
- **Outcome:** Reclassified — not a blocker. Operator item logged as OP-A04.

---

## Non-blockers (observations)

- **OB-001 — useAdminAuth dev fallback to user_metadata.role.** `src/hooks/useAdminAuth.ts:38-51` grants viewer access when `isDev && session.user.user_metadata.role === 'admin'`. Dead-code-eliminated by Vite in production builds (`import.meta.env.DEV` resolves to `false`), so no production regression of AUTH-001. Pattern smell: future refactor could accidentally widen this. Recommend removing the dev shim entirely in favour of `npx tsx scripts/create-demo-admin.ts` only.

- **OB-002 — No client-side idle session timeout for admin.** Spec C.6: admin sessions should expire faster than user sessions OR sensitive actions require step-up auth. Neither implemented in `AdminApp.tsx`. Supabase auth-side session timeout is dashboard-configured and out of scope. Logged as operator item OP-A05.

- **OB-003 — Admin login lacks visual distinction from user login.** `LoginPage variant="admin"` is reused; no banner, page title difference, or password manager autocomplete-context separation visible from `AdminApp.tsx:75`. Spec F.4 — observation, not strict blocker.

- **OB-004 — X-Frame-Options=SAMEORIGIN globally.** `vercel.json:37` applies to admin domain too. Stricter `DENY` for admin host would prevent any iframe embedding. Not a blocker; CSP `frame-ancestors 'self'` (line 41) provides equivalent enforcement on supporting browsers.

- **OB-005 — Legacy admin pages exist but are not routed.** Files under `src/pages/admin/` outside the `v2/` subtree are not reachable from `AdminApp.tsx`. They still ship in the bundle (lazy-imported elsewhere or via `articleAdminService` glue). Cleanup is post-launch refactor — not a launch concern.

- **OB-006 — Public→admin redirect makes admin domain discoverable.** Reclassification of AB-004 above. Operator item OP-A04.

- **OB-007 — Service-role audit writes not distinguishable from admin writes.** `admin_audit_log.admin_user_id` is nullable but seed scripts (`scripts/create-demo-admin.ts`, `scripts/seed-admin.mjs`) do not call `logAdminAction`. When they do touch admin tables via service role, RLS is bypassed and no audit row is written. Investigation hygiene gap, not a launch blocker. Operator item OP-A06.

---

## Phase plan

| Commit | Title | Findings addressed |
|---|---|---|
| A | `[LAUNCH] Admin panel readiness audit findings` | (this doc) |
| B | `[LAUNCH] Admin runtime + role-guard verification` | AdminApp smoke test, redirect/non-admin flash test |
| C | `[LAUNCH] Admin authorization: route gates, role resolution, destructive actions` | AB-003 |
| D | `[LAUNCH] Admin discoverability: noindex, robots, no public references` | AB-001, AB-002 |
| E | `[LAUNCH] Admin audit trail completeness` | verification only |
| F | `[LAUNCH] Admin client-side security` | verification only |
| G | `[LAUNCH] Admin reviewer deliverables` | summary + blockers-remaining |
