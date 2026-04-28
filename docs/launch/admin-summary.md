# Admin Panel Launch Readiness — Reviewer Summary

**Branch:** `launch/admin-readiness`
**Base:** `main` at `d9f61e6` (post-prompt-1 user-site readiness merge)
**Scope:** Admin panel (`admin.psychage.com`). Out of scope: user site, auth architecture, Supabase dashboard, provider portal.

---

## Per-blocker outcomes

| ID | Title | Outcome | Commit | Files |
|---|---|---|---|---|
| AB-001 | Admin domain serves no robots.txt | Fixed | `91d47db` | `vercel.json`, `public/robots-admin.txt` |
| AB-002 | admin.html robots meta missing `noarchive`, `nosnippet` | Fixed | `91d47db` | `admin.html` |
| AB-003 | Role grant/revoke fires on dropdown change without confirmation | Fixed | `2f219d5` | `src/pages/admin/v2/settings/UserManagement.tsx`, `src/pages/admin/v2/settings/__tests__/UserManagement.roleChange.test.tsx` |
| AB-004 | Public→admin redirect leaks admin domain | Reclassified to OB-006 / OP-A04 | — | — |

7 non-blocker observations (OB-001 — OB-007) recorded in `admin-findings.md`. Operator items OP-A01 — OP-A16 in `admin-blockers-remaining.md`.

---

## Commit map

| Phase | SHA | Title |
|---|---|---|
| A | `8ab07d2` | `[LAUNCH] Admin panel readiness audit findings` |
| B | `9e0fcc1` | `[LAUNCH] Admin runtime + role-guard verification` |
| C | `2f219d5` | `[LAUNCH] Admin authorization: confirm role grant/revoke (AB-003)` |
| D | `91d47db` | `[LAUNCH] Admin discoverability: noindex floor + admin-host robots.txt (AB-001, AB-002)` |
| E + F | (no fixes) | Audit trail completeness and admin-specific security verified — no code changes required. Findings recorded in `admin-findings.md` §B and the operator items in `admin-blockers-remaining.md`. |
| G | (this commit) | `[LAUNCH] Admin reviewer deliverables` |

---

## What changed about admin deploy

1. **`vercel.json` rewrites grew one host-scoped rule.** A new entry sits ahead of the admin catch-all so `/robots.txt` on `admin.psychage.com` returns the deny-all `public/robots-admin.txt` rather than the rewritten admin shell HTML. User-site `/robots.txt` is unaffected.
2. **`admin.html` `<meta robots>` widened.** `noindex, nofollow` → `noindex, nofollow, noarchive, nosnippet`. Defence-in-depth against crawlers that ignore noindex or surface cached snippets.
3. **`UserManagement.tsx` role-change flow gained a confirmation step.** Previously the dropdown's `onChange` fired the mutation directly; now it stages the pending change in local state and requires explicit ConfirmDialog approval. Mutation also now records `previousValue` alongside `newValue` so the audit row preserves the full transition.
4. **One new test file** — `src/pages/admin/v2/settings/__tests__/UserManagement.roleChange.test.tsx`. Locks in the no-immediate-mutate contract (other-user promote and self-demote paths). 2 cases.
5. **One new launch smoke test** — `src/tests/launch/admin-routes.smoke.test.tsx`. Asserts every admin route module from `AdminApp.tsx` imports cleanly (38 cases) and that no non-public path falls under the public auth prefix.

No production migrations added. No environment variables added. No new dependencies. No edits to user-site files, AuthContext, RoleGuard, RLS, or any auth migration.

---

## Manual verification

Items OP-A01 — OP-A08 in `admin-blockers-remaining.md` cannot be verified from the codebase. Operator must walk through each before public traffic on the admin host.

**Highest priority:** OP-A02 (admin domain robots.txt at the edge), OP-A07 (security-headers grade on admin domain), OP-A08 (manual cross-domain smoke with three real browser profiles).

---

## Rollback

Each commit is independent. To roll back any single fix:

- **AB-001 / AB-002 (`91d47db`):** `git revert 91d47db`. Restores the previous `vercel.json` rewrite ordering and the original 2-directive robots meta. Re-introduces the discoverability gap.
- **AB-003 (`2f219d5`):** `git revert 2f219d5`. Removes the role-change ConfirmDialog and the regression test. Re-introduces the silent-promote risk.
- **Smoke test (`9e0fcc1`):** `git revert 9e0fcc1`. Removes the admin route inventory check. Build will not fail; only loses the catch-net for future broken lazy imports.

The findings doc (`8ab07d2`) is documentation; reverting it loses the audit trail without functional impact.

To roll back the entire branch: `git revert 91d47db 2f219d5 9e0fcc1 8ab07d2` (in that order, leaf-first), or `git reset --hard d9f61e6` if the branch has not been pushed/merged.

---

## Verification snapshot at branch HEAD

- `pnpm build` — green
- `npx tsc --noEmit` — clean
- `npx vitest run src/tests/launch/admin-routes.smoke.test.tsx` — 38/38 pass
- `npx vitest run src/pages/admin/v2/settings/__tests__/UserManagement.roleChange.test.tsx` — 2/2 pass
- Bundle scan: zero occurrences of `service_role` / `SUPABASE_SERVICE_ROLE_KEY` in `dist/assets/main-*.js` and `dist/assets/admin-*.js`

Full vitest run results captured in the final commit (Phase G).
