# Functional Verification — Live Production (www.psychage.com)

**Date:** 2026-06-13 · **Target:** https://www.psychage.com (apex redirects → www) ·
**Verifier:** Claude Code (automated Playwright harness + targeted manual driving) ·
**Method:** Hybrid — env-driven Playwright suite against prod + a dedicated test account, plus direct API/SQL probes.

## Deployment state

| | Before | After |
|---|---|---|
| Prod app (Vercel, from `main`) | `7c1e473` | `9ada65f` (PR #13 gates merged → redeployed); not stale |
| Prod Supabase DB | migration `20260612000001` **absent** | **applied** (admin role RPCs live) |
| CI gates | only Deno clarity-score CI on `main` | **`pr-checks.yml` (5 gates) merged to `main`** |

- **AI health:** `GET /api/ai/health` → 200, ANTHROPIC/SUPABASE keys set, OPENAI absent (RAG dormant per ledger).
- **Anthropic spend:** ~4 calls total (2 chat generations + 2 safety classifications).
- **Test account:** `e2e-verify+20260613@psychage.com` — created, used, **fully purged** (auth user + rows; prod user count 9→8, all row tables 0).

## Checklist matrix

| # | Flow | Verdict | Evidence |
|---|------|---------|----------|
| 1 | **Auth** | **PASS** (1 finding) | Logout clears `psychage_ai_chat_history` ✓ (B3-6); wrong-pw rejected (stays on /login) ✓; session replay → /dashboard ✓; redirect handling ✓. Signup = **Finding B**. Password-reset request not driven (SMTP deferred). |
| 2 | **Clarity Score** | **PASS (core)** | Anonymous 20-Q run → results render, tier **"Thriving"** (correct for all-best answers), **0 DB writes** (correctly client-side) ✓. Authed save→history→delete and crisis-interrupt **not driven** (partial). |
| 3 | **Symptom Navigator** | **PARTIAL** | Renders (h1, no error boundary) ✓; engine unit-tested (confidence_cap ≤ 0.75, crisis screening). Deep welcome→domains→symptoms→results flow + URGENT/WATCH triggers **not driven to completion**. |
| 4 | **MindMate** | **PASS** | Benign → substantive GAD answer (`SAFE`) ✓; hopelessness probe → **`URGENT`** care-first response ✓ (safety classifier works). Non-stream JSON path verified; UI streaming not separately driven. |
| 5 | **Tools** | **PARTIAL** | All tool pages render with correct content (Mood valence slider, Sleep, Medication, ClarityJournal, Relationship) ✓. Mood→`mood_entries` persistence **not driven to completion** (multi-step UI). |
| 6 | **Articles & Search** | **PASS** | `/learn` renders ~130 KB of content (Editor's Picks, article cards) ✓; search returns **anxiety=485 / depression=444 / sleep=151** results ✓ (async — needs wait). |
| 7 | **Find Care** | **PARTIAL** (Finding D) | Landing + search UI render (search box, location, verification badges, sort) ✓; **provider results stuck "Searching…"** (Finding D). Booking modal not reached. |
| 8 | **Crisis** | **PASS** | `/crisis` renders ("You Are Not Alone"); geo auto-detect works (BD→16789); **country picker → GB → Samaritans/116 123/999**; all `tel:` links well-formed ✓ (verify-only). |
| 9 | **i18n** | **PASS** (1 finding) | Mobile switcher works; **`<html lang>` updates EN→PT→ES→SV→FR** ✓; no raw keys; `providers` namespace genuinely translated (PT verified in locale files + `t()` usage). Desktop = **Finding E**. |
| 10 | **Dashboard** | **PASS** | Authed `/dashboard` renders personalized "Good afternoon, E2E" + content ✓. |
| 11 | **Admin** | **PASS (neg) + hand-off** | Patient hitting `/admin` → bounced to /dashboard, no admin UI ✓ (denied). Positive: post-migration RPCs verified at the DB layer (`admin_list_roles` returns; upsert/remove gates reject non-super_admin). **Full admin-UI verification needs your super_admin account.** |
| 12 | **Chrome** | **PASS** (findings C/F) | 404 page correct; protected routes gate to /login; skip-link present; mobile viewport renders. Console = benign CSP `upgrade-insecure-requests` warning (Finding F) + tools-hub error (Finding C). |

## Findings (all class B — config / infra / product / perf; no class-A code bugs found)

- **(B) Email confirmation ENABLED in prod** (ledger said "disabled/instant-login"). Signup creates an *unconfirmed* account; app shows "Account created — please log in" (`SignUpPage.tsx:100`), login then blocked until confirmed. Most existing users are confirmed; **SMTP delivery unverified**. **You classified this a real bug.** *Ready plan:* disable "Confirm email" in Supabase Auth settings to restore instant-login, **or** keep it on + verify SMTP delivery and reword the post-signup message to "check your email." (Auth config — not a code change; Hard Stop 2.)
- **(C) Tools hub fetches a dead backend.** `toolService.getAll` → `api.get('/api/tools')` → `${VITE_API_URL}/api/tools` where prod `VITE_API_URL = https://psychage-v1.vercel.app` → **CSP-blocked → silent fallback to local data**. *Ready plan:* unset/repoint the `VITE_API_URL` Vercel env var (the app already falls back gracefully; impact = a console error + one wasted request). Infra change.
- **(D) Provider search never returns** (stuck "Searching…" ≥6 s) over a **423,404-row** `providers` table (data + anon RLS are fine). *Ready plan:* root-cause the default/empty-query search path — confirm a `.limit()` + indexes, confirm a name/specialty query returns, check geo-gating ("US-based professionals only"). Likely perf, possibly a one-file query fix once reproduced.
- **(E) Desktop has no language switcher** — `LanguageSwitcher` renders only in `MobileMenu.tsx` in deployed code. Likely intended/WIP (untracked `src/i18n/` exists locally). *Ready plan:* if desktop switching is wanted, render it in `Navigation`/`Footer` (product decision).
- **(F) Benign CSP warning** on every page: `upgrade-insecure-requests` ignored in a report-only policy. Cosmetic. *Ready plan:* drop that directive from the report-only CSP or move to an enforcing CSP. Low priority.

## Hard Stops encountered

- **Hard Stop 5 (CI gates):** the 5-gate workflow lived in unmerged PR #13. **Resolved** — you approved merging it; gates now on `main` and verified running+passing on PR #15.
- **Hard Stop 1 (new migration):** `get_user_by_email` is **absent in prod AND the repo**. The admin **"Add Admin" (invite)** sub-flow depends on it and **remains broken** after `20260612000001`. *Ready plan (not authored, per Hard Stop 1):* a new migration defining `public.get_user_by_email(email_input text) RETURNS TABLE(id uuid)` as a SECURITY DEFINER, admin-gated lookup over `auth.users` — matching the contract at `UserManagement.tsx:80`.

## Migration applied

`20260612000001_admin_role_rpcs.sql` — pushed to prod with full discipline:
- **Dry-run:** exactly this file (a phantom editorial migration was an untracked Finder-duplicate `…corrected 2.sql`, moved to `/tmp/psychage-junk-migration-dup.sql` — identical to the tracked file; recommend deleting it).
- **Shadow battery** (docker pg16, prod-shaped stubs): 3 RPCs created; list/upsert/remove behave; **last-super_admin lockout guard fires (P0001)**.
- **Post-push (prod):** `admin_list_roles` EXISTS; `admin_upsert_role`/`admin_remove_role` exist and correctly reject non-super_admin (42501).

## Deviations / notes

- The collection failure that blocked e2e was a **committed dependency skew** (`@vitest/browser-playwright` pulls `playwright@1.57.0` while `@playwright/test` resolves to `1.58.2`). Worked around by invoking the matched 1.58.2 CLI. The local `node_modules` is additionally polluted by uncommitted WIP (`vite@8`), so all verification ran in an **isolated git worktree off clean `origin/main`** to protect the user's workspace.
- Navigator deep-flow, clarity authed save→delete, and mood persistence were **not driven to completion** (multi-step UIs vs. budget); render + engine/service layers are verified.
- Cleanup script (`scripts/e2e-cleanup.mjs`) has a few table names that don't match prod schema (`assessment_results`, `sleep_entries`, `bookmarks`); irrelevant here (the account wrote 0 rows) — flagged for a follow-up correction.

## Update — Hard Stop 1 resolved (same session)

The `get_user_by_email` gap was subsequently closed: migration `20260613000001_admin_get_user_by_email_rpc.sql` was authored (mirroring `20260612000001`, `is_admin()` read-gate, case-insensitive, `RETURNS TABLE (id uuid)`), shadow-battery tested (resolves email→id; non-admin gate → 0 rows), **applied to prod**, and merged via **PR #16** (the `migration-drift` gate confirmed local == remote). The admin **"Add Admin" invite** flow now has every server-side dependency. Admin item 11 is therefore **fully restored at the DB layer** (load + role change/remove + invite); the only remaining check is a UI spot-check with a super_admin session.
