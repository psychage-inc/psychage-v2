# Admin Login Fix — Remediation Notes

**Date:** 2026-06-07 · **Branch:** `fix/admin-login-role-claim`
**Companion to:** [ADMIN_AUDIT_FINDINGS.md](ADMIN_AUDIT_FINDINGS.md) (kept pristine — this file records the remediation).

## What was fixed (CODE)

| Audit ID | Fix |
|---|---|
| P0-01 | Role value-vocabulary mismatch — client now recognizes `super_admin\|clinical_admin\|viewer` as admin. |
| P0-02 | Split-brain — one helper (`src/lib/adminRole.ts`) is the sole admin-role decision point. |
| P1-01 | Missing `get_user_by_email` RPC added (migration `20260607000002`). |

### Contract (confirmed in recon)
The claim **key already matched** — the trigger writes `raw_app_meta_data.role`
(surfaced as `user.app_metadata.role`), which the client already reads. **Only the value
vocabulary was wrong.** So the DB trigger was **not** rewritten; the new migration only
re-asserts the claim idempotently.

### Single decision point
`src/lib/adminRole.ts` exports `isAdminRole` / `getAdminTier`. Imported by:
`context/AuthContext.tsx`, `components/auth/RoleGuard.tsx`, `hooks/useAdminAuth.ts`,
`pages/auth/LoginPage.tsx`, `services/userProfileService.ts`. Tier preserved on
`User.adminRole`; coarse `User.role` drives binary gating only.

## Scope notes / deviations
- **`userProfileService.ts`** (beyond the audit's named scope) had the identical broken
  `=== 'admin'` pattern on `app_metadata.role` and was routed through the helper too
  (approved scope decision) — otherwise it would remain a 4th independent re-derivation.
- **`AuthCallback.tsx:45-54`** reads the **wrong field** (`user_metadata.role`, stripped by
  the AUTH-001 DB trigger) on the OAuth path. Left as a flagged pre-existing quirk —
  separate from the password-login fix; OAuth admin routing is out of this pass.
- `conventions.md` referenced by the task does not exist in the repo; the two-commit
  structure was followed regardless.
- Pre-existing lint errors in `LoginPage.tsx:14` (`mainUrl` unused) and
  `userProfileService.ts:155,324` were **not** touched (surgical-changes rule); none are in
  the lines this fix added. `tsc --noEmit` is clean.

## HUMAN runbook — required AFTER this code lands (not done by the code)
1. **Apply both new migrations** to the live Supabase DB:
   `20260607000001_align_admin_role_claim.sql` (backfill) and
   `20260607000002_add_get_user_by_email_rpc.sql` (invite RPC).
2. Confirm a `public.admin_roles` row exists for your account. If not, insert it, then
   **log out and back in** so the JWT refreshes with the granular claim.
3. Verify login on the **main origin** first (URL helpers fall back to same-origin when
   `VITE_ADMIN_URL` is unset) — confirms the fix without waiting on DNS.
4. Separately, for prod on `admin.psychage.com`: attach the subdomain in Vercel, add the
   DNS CNAME, set `VITE_ADMIN_URL`. This host-rewrite path is independent of the login fix.
