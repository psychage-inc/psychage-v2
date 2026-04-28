# Admin Panel Launch Readiness — Blockers Remaining

**Branch:** `launch/admin-readiness`
**Status:** All in-code blockers fixed. The items below cannot be fixed inside this codebase and must be handled by the operator before public traffic hits production.

Each entry: **what** to do, **how to verify**, **likely owner**.

---

## Critical (must be done before launch)

### OP-A01 — Admin domain TLS / certificate / mixed content
- **What:** Verify `admin.psychage.com` serves HTTPS with a valid certificate, HSTS preload-eligible, and no mixed-content warnings on any admin page after login. Vercel typically provisions automatically once the domain is added; confirm by curl + browser inspector.
- **How to verify:** `curl -I https://admin.psychage.com/` shows 200 + valid `Strict-Transport-Security`. Browser dev tools → Security tab on `/dashboard` shows "Connection is secure" and zero mixed-content warnings.
- **Owner:** Platform / DevOps lead.

### OP-A02 — Admin domain serves correct deny-all robots.txt at the edge
- **What:** AB-001 was fixed in `vercel.json` by inserting a host-scoped `/robots.txt` rewrite ahead of the catch-all. After the next production deploy, confirm the rewrite is honoured by the CDN edge — Vercel rewrite ordering in production occasionally lags local builds.
- **How to verify:** `curl -s https://admin.psychage.com/robots.txt` returns exactly `User-agent: *\nDisallow: /\n` (text/plain, not the admin shell HTML). `curl -I https://admin.psychage.com/robots.txt` shows `Content-Type: text/plain; charset=utf-8`.
- **Owner:** Platform lead.

### OP-A03 — Admin Supabase auth session timeout
- **What:** Set the admin-app Supabase auth session lifetime to a tighter value than the user site (suggested: 30 minutes idle, 8 hours absolute). Default Supabase JWT TTL is 1 hour and the refresh token can keep a session alive indefinitely. Configurable in Supabase Dashboard → Authentication → JWT settings, plus client-side idle timer (deferred to operator decision).
- **How to verify:** Log into admin, leave idle 30 minutes, return — expected: redirected to `/login`. Confirm by reading dashboard JWT TTL value and (if added) the client-side idle handler in AdminApp.
- **Owner:** Platform / DevOps lead.

### OP-A04 — `/admin/*` user-site redirect leaks admin domain
- **What:** `vercel.json:7-19` redirects `psychage.com/admin/*` → `https://admin.psychage.com/...` with status 302. The Location header makes admin.psychage.com discoverable to anyone probing `/admin`. This is the canonical pattern for cross-domain admin separation; defence options are operator-level and outside this branch's scope.
- **How to verify:** Decide which mitigation, if any, applies before launch. Options:
  - WAF rule: block requests to `psychage.com/admin/*` from non-allowlisted source IPs
  - DNS: move admin to a non-guessable subdomain (e.g. ops-3kj92.psychage.com)
  - Status quo: accept that the admin domain name is discoverable; rely on auth + RoleGuard for access control
- **Owner:** Security / Platform lead.

### OP-A05 — Admin client-side idle timeout
- **What:** Spec §C.6 recommends admin sessions expire faster than user sessions OR sensitive actions require step-up auth. Neither is implemented. After OP-A03 sets the auth-side TTL, decide whether to add a client-side idle timer (e.g. 30 min of no input → call `supabase.auth.signOut()` and redirect). Belt-and-braces alongside the JWT TTL.
- **How to verify:** Click around admin, leave idle 30 minutes, attempt action — observe automatic sign-out and redirect to `/login`. Verify no admin actions can be taken in the idle window.
- **Owner:** Frontend lead (in collaboration with Platform on TTL choice).

### OP-A06 — Service-role audit writes are not distinguishable from admin writes
- **What:** `admin_audit_log.admin_user_id` is nullable and seed scripts (`scripts/create-demo-admin.ts`, `scripts/seed-admin.mjs`) bypass RLS via service role, so they do not write audit rows when they touch admin tables. When a real admin and a seed script both modify the same row, an investigator cannot tell which was which. Recommend either: extend `logAdminAction` to accept a `system_actor` sentinel and call it from migration-equivalent scripts, or add a dedicated `system_audit_log` table. Not a launch blocker — investigation hygiene only.
- **How to verify:** Decide on remediation, file follow-up issue. No production-time verification needed.
- **Owner:** Backend lead.

### OP-A07 — Admin domain security-headers grade
- **What:** After deploy, run https://securityheaders.com/?q=admin.psychage.com and https://observatory.mozilla.org/analyze/admin.psychage.com. The same `vercel.json` headers block applies to admin host (HSTS, nosniff, frame-options=SAMEORIGIN, referrer-policy, permissions-policy, CSP-Report-Only). Confirm grade A or A+; investigate any drop relative to the user site's grade.
- **How to verify:** Tool reports show A or A+. Failures should match (or improve on) what the user site shows in OP-009.
- **Owner:** Platform lead.

### OP-A08 — Manual cross-domain smoke
- **What:** With three real browser profiles (clean cookies):
  1. **Logged-out:** visit `https://admin.psychage.com/dashboard` directly. Expect immediate redirect to `/login` on admin domain. No admin shell flash.
  2. **Patient credentials:** log in on user site, then navigate to `https://admin.psychage.com/dashboard`. Expect redirect back to `https://psychage.com/dashboard`. No admin shell flash.
  3. **Admin credentials:** log in via `https://admin.psychage.com/login`. Confirm dashboard loads, audit-log viewer reachable, role-change confirm dialog opens for super_admin actions.
- **How to verify:** Screen recording or live walkthrough with the operator. Document any flash, race, or unexpected redirect.
- **Owner:** Operator + frontend lead.

---

## High priority (do during launch week)

### OP-A09 — Admin audit log retention policy
- **What:** Decide retention period for `admin_audit_log`. RLS prevents UPDATE/DELETE so the table only grows. For investigation purposes 2-3 years is typical; for storage/cost control, archive to cold storage after 90 days. Configure via Supabase scheduled function or pgcron.
- **How to verify:** Retention policy documented; if archival job exists, verify it has run at least once.
- **Owner:** Backend lead.

### OP-A10 — Admin login visual distinction
- **What:** OB-003 — admin login reuses `LoginPage variant="admin"` but the `variant` flag's actual visual effect is shallow. Add a distinct admin banner (e.g. yellow ribbon "Admin sign-in"), separate `<title>` in `admin.html` is already "Psychage Admin" which is good. Ensures users never confuse the login surface and password managers do not auto-fill user-site credentials into admin login.
- **How to verify:** Visit `https://admin.psychage.com/login` and `https://psychage.com/login` side-by-side; the difference should be visually obvious within 1 second.
- **Owner:** Frontend lead.

### OP-A11 — Admin login Turnstile / CAPTCHA
- **What:** Admin login is a credential-stuffing target. The user-site signup uses Turnstile (per AUTH-007). Admin login should too. Currently inherits whatever the shared `LoginPage` does; confirm Turnstile fires on the admin variant or add it explicitly.
- **How to verify:** Open admin login in dev tools → Network → submit form → confirm Cloudflare challenge call OR Supabase rate-limit headers visible.
- **Owner:** Frontend / auth lead.

### OP-A12 — Remove dev-only user_metadata fallback in useAdminAuth
- **What:** OB-001 — `src/hooks/useAdminAuth.ts:38-51` keeps a dev-mode fallback that reads `user_metadata.role`. Vite tree-shakes this in production, but the pattern is fragile. Replace with the documented `npx tsx scripts/create-demo-admin.ts` flow only.
- **How to verify:** Grep for `user_metadata` in `src/hooks/useAdminAuth.ts` returns no matches. Dev environment continues to work via the seed script.
- **Owner:** Frontend lead.

### OP-A13 — Stricter X-Frame-Options for admin host
- **What:** OB-004 — `vercel.json` ships `X-Frame-Options: SAMEORIGIN` globally. CSP `frame-ancestors 'self'` (in the same headers block) covers modern browsers; `X-Frame-Options: DENY` on admin would be defence-in-depth for legacy browsers. Requires host-scoped headers block in `vercel.json`.
- **How to verify:** `curl -I https://admin.psychage.com/` shows `X-Frame-Options: DENY` once added.
- **Owner:** Platform lead.

---

## Nice to have (post-launch)

### OP-A14 — Remove legacy unrouted admin pages
- **What:** OB-005 — files under `src/pages/admin/` outside the `v2/` subtree (`AdminContentPage.tsx`, `AdminSettingsPage.tsx`, `AdminUserDetailPage.tsx`, `AuditLogPage.tsx`, `ProviderManagement.tsx`, `ProviderDetailAdmin.tsx`, `ReportDetailPage.tsx`, `ReportsPage.tsx`, `UserManagementPage.tsx`, `AdminAnalyticsPage.tsx`, `AdminDashboard.tsx`) are unreachable from `AdminApp.tsx`. Removing them shrinks the admin bundle and eliminates a vector where future code accidentally re-imports a stale flow.
- **Owner:** Frontend lead.

### OP-A15 — Surface own-recent-actions in audit-log viewer
- **What:** The `/settings/audit-log` viewer shows the global feed. A "my recent actions" filter (`WHERE admin_user_id = auth.uid()`) would help an admin self-investigate without scrolling.
- **Owner:** Frontend lead.

### OP-A16 — Step-up auth for super-destructive actions
- **What:** Spec §C.6 mentioned step-up auth as an alternative to short session timeout. For irreversible actions (article hard delete, super_admin grant, platform setting changes), require password re-entry within the last 5 minutes. Defence-in-depth for stolen-session scenarios.
- **Owner:** Auth / frontend lead.

---

## Out of scope (handled elsewhere)

- User site readiness → `docs/launch/user-site-blockers-remaining.md` (prompt 1 of 3)
- Auth architecture, RLS, edge functions → settled by AUTH workstream
- Supabase dashboard configuration → operator's existing checklist
- Provider portal / signed-in-only readiness → covered by prompt 3 of 3
