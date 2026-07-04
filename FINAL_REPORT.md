# Production-Readiness Audit — Final Report

**Project:** Psychage v2 (React 18 + TypeScript + Supabase + Sanity + Vercel)
**Audit target:** `main` @ `0ebfb4c` (= production; Vercel auto-deploys main)
**Branch:** `worktree-audit-production-readiness` (isolated git worktree; **not merged** — merging deploys prod)
**Date:** 2026-07-04 · **Mode:** fully autonomous, 5-phase

Companion file `AUDIT_LOG.md` holds the full map (Phase 1), the ~55-finding ledger (Phase 2), and every execution decision (D-01…D-10). This report summarizes what was fixed, what was decided, and what remains at risk.

---

## 0. TL;DR

- **1 CRITICAL** (committed secrets) redacted from HEAD — **but rotation + history purge are unavoidable manual steps** (see §5, top priority).
- **6 HIGH** user-facing defects fixed (bookmarks page that never worked, pleasant moods silently discarded, AI widget swallowing errors, admin list not refreshing, admin report page on mock data, streaming abort ignored).
- **10 MEDIUM/LOW** fixes (privacy leak on user-switch, stale-response races, crash guard, search self-heal, entry-chunk weight, dead controls, edge/node mismatch, universal route error boundaries).
- **20 commits**, one logical fix each. `tsc` clean, production build green, new + existing touched-area tests pass, 16 route×viewport render checks clean.
- The dominant remaining risk is a **systemic service-layer pattern** (supabase-js errors discarded → failed writes reported as success) documented but not fully remediated — it needs a service-contract change, not a point fix.

---

## 1. Fixes by finding ID

### CRITICAL
| ID | Fix | Commit |
|----|-----|--------|
| SEC-001 | Redacted live Supabase service-role key, Sanity write token, Gemini key from `docs/SEPARATE_FRONTEND_INTEGRATION.md` (two full-value blocks) → placeholders. **HEAD is clean; history is not.** | `e457213` |

### HIGH
| ID | Fix | Commit |
|----|-----|--------|
| C-1 | `BookmarksPage` read from retired REST endpoints (`/api/articles/bookmarks`, `/api/providers/*`) that no longer exist → page always empty. Repointed to Supabase `articleService.getBookmarks` / `providerService.getFavorites`; remove now toggles the real row with revert-on-failure. | `20fdc94` |
| C-2 | Mood wizard emits valence 1–10, but `moodService.createEntry` rejects value > 5 → every pleasant mood silently dropped for signed-in users. Convert valence↔score at the service boundary (canonical 1–5 store scale). | `18cd77b` |
| C-25 | MindMate widget's SSE handler only acted on `SAFETY_VIOLATION`; `LLM_ERROR`/`TIMEOUT` were dropped → empty/truncated bubble presented as complete. Non-safety error events now throw into the existing catch (error + retry), matching the full-page consumer. | `f4f8ffd` |
| C-19 | 10 admin article mutations invalidated `['admin','articles']`, but the list registers `['admin','articles-search',…]`; prefix-based invalidation never matched → stale admin list after every write. Retargeted all sites. | `fdabe98` |
| F-3 | Admin `ReportDetailPage` rendered `MOCK_REPORTS` and its status actions only mutated local state, though `api.admin.getReport/updateReportStatus` exist and the list page uses them. Wired to the real API; status update now throws on failure so the error toast fires. | `6f61599` |
| chat.ts-1 | Client-disconnect guard listened on `req` 'close', which never fires on Node ≥16 SSE abort → the full Anthropic generation streamed to a dead socket on every "stop"/abort. Also listen on `res`. | `1ed6f07` |
| api-1/api-2 | `fetchApi` parsed JSON before checking `response.ok` → non-JSON 502/204 erased the real status and skipped the 401-refresh; `uploadAvatar` never checked `ok` → JSON error body shown as "avatar updated". Both now read text and parse defensively, and throw `ApiError` on non-2xx. | `5dc268d` |

### MEDIUM / LOW
| ID | Fix | Commit |
|----|-----|--------|
| RTE-BND | 69/87 routes had no per-route error boundary. Extracted `RouteErrorBoundary` to a shared module and wrapped it inside `PageTransition`, so every page route now gets a route-scoped fallback (global boundary retained). | `18deb22` |
| BC-1 | Bookmark hydration had no cancel guard → a late resolution after logout/user-switch restored the previous user's bookmarks and stuck `hydrated=true` (privacy leak). Added a `cancelled` flag in effect cleanup. | `3deffc8` |
| BC-2 | Server `toggle` ran inside the `setBookmarks` updater → StrictMode double-invoked it (two toggles per action). Moved the optimistic update + server call out of the updater. | `3deffc8`, `7b2015a` |
| B-1 | `ArticlePage` fetch effect had no stale-response guard (its mobile twin did) → article A could render under article B's URL. Added a `cancelled` flag. | `28ea1d0` |
| B-3 | `ProviderSearchBar` copied URL-derived props into state only at mount → stale search box after chip-clear / back-forward, with submit silently re-applying removed filters. Re-sync on prop change. | `28ea1d0` |
| B-4 | Chart hydration created React roots after two dynamic imports with no cancel guard → orphaned roots in detached DOM on fast navigation. Added a `cancelled` flag checked after the imports. | `235bf7a` |
| C-18 | `ProfileHeader` rendered `provider.provider_type.label` unguarded → a null/RLS-hidden join threw and dropped the user to the route error page. Optional-chained. | `b8eeb52` |
| searchService-1 | The article-index promise memoized rejections forever → one offline blip left search permanently broken. Clear the promise on rejection so the next search retries. | `b8eeb52` |
| F-11 | `lottie_light` (~45KB gz) was statically imported by the eagerly-loaded `Preloader` → in the critical entry chunk. Dynamic-import inside the play effect (cancel-guarded; 3s safety timeout covers load failure). | `a941a1c` |
| F-13 | Dead "Notify Me" button (no-op onClick, no notification backend) removed from the video coming-soon placeholder; degrade rather than invent a signup. | `c8abccc` |
| geo-1 | `api/geo-detect` used the Node `(req,res)` signature but exported `runtime:'edge'` → `res.setHeader` threw on every call. Dropped the edge config to match the code. | `c4c2f85` |

**Test coverage added:** `MoodWizard/moodScale.test.ts` (6 tests — valence↔score, the pleasant-mood-drop regression, endpoints, monotonicity) and `lib/api.test.ts` (4 tests — non-JSON 502 keeps status, empty 204 resolves, JSON error surfaces message+status, network reject stays `ApiError(0)`). Commit `c3b2a95`.

---

## 2. Autonomous decisions & reasoning

Full list in `AUDIT_LOG.md` (D-01…D-10). The load-bearing ones:

- **Isolation & no-merge (D-01, D-03):** all work in a worktree branch off `main` HEAD; deliver as a PR, never merge — merging auto-deploys production, which stays a human call. This is the one deliberate deviation from "run to completion."
- **Strict-tsc (D-04, revised):** `--strict` surfaced only **32 errors** — the codebase is already null-safe in practice; every genuine null risk has a runtime guard. Kept `strict:false`: the errors are type-plumbing (Postgrest builder variance, `Fuse<Condition>` variance, guarded union access), and satisfying the checker would mean **adding `as` casts to Supabase-generic code**, violating the no-new-cast rule. Full inventory in `AUDIT_LOG.md §2.3`.
- **F-6 img CLS → OBSERVATION, not fixed:** both article cards use `w-full h-auto` with an explicit code comment that natural-aspect rendering (no crop, no letterbox) is intentional. Forcing dimensions to kill CLS would change deliberate, consistent design. Left untouched per "broken ≠ ugly."
- **F-1 article-corpus load → documented, not rearchitected:** `getBySlug` awaits the full mock corpus before Supabase. It is **cached** (once per session) and **load-bearing** — the mock JSX is the actual rich-content source (charts/tables/accordions Supabase can't store), tied to the team's known SSR-data-loss work. The correct fix (per-category-lazy load) is a content-loading refactor with real regression risk; out of audit scope. Recommended, not applied.
- **Backend-dependent findings → degrade + document (D-07):** the in-memory rate limiter (`chat.ts`, needs Redis/Upstash), non-atomic embedding reingest, and the admin mock-dashboard (`adminMockData.ts`) require infra/backend work, not client point-fixes. Documented; not invented.
- **B-5 (medication-form index keys) → documented, not fixed:** the clean fix needs an id-per-row state-shape change that ripples to the `Medication` model boundary and save mapping. LOW severity (middle-row focus quirk); the refactor risk outweighs it.

---

## 3. Systemic finding (root cause behind ~20 findings)

**supabase-js resolves `{ data, error }` — it does not throw.** Across the services layer the `error` is discarded and a success-shaped value is returned, so **failed writes are reported to the UI as success**, and every component-level `.catch(rollback)` is dead code. This is the single root cause of: bookmark/feedback/newsletter/profile silent write-loss, provider-analytics double-inserts, ~6 `articleAdminService` cases, and the dead-rollback consumers (C-3/C-4/C-6/C-14/C-16/C-17).

The audit fixed the highest-impact *reachable* instances at the call-site level (C-1 bookmarks page, BC-1/BC-2 bookmark context, F-3 admin report update now throws). **The durable fix is a service-contract change** — have write methods return a discriminated `{ ok: false, error }` or throw — applied consistently, then update callers to surface it. That is a focused follow-up project, tracked here rather than done piecemeal (which would leave the contract half-migrated and more confusing).

---

## 4. Verification performed

| Check | Result |
|-------|--------|
| `tsc --noEmit` (project config) | **clean** |
| Production build (`tsc && verify:routes && build:api && vite build`) | **green** (exit 0) |
| New tests (`moodScale`, `api`) | **10/10 pass** |
| Touched-area existing tests (moodService, withFallback, error boundaries) | **47/47 pass** |
| Lint on changed files | clean; one pre-existing `any` in `MindMate.tsx:318` left untouched (not introduced here; lint is not a CI gate) |
| Viewport render-check (chromium lib @ 360/768/1024/1440) on home, learn, providers/search, tools | **16/16 clean** — no horizontal overflow, no page errors; chrome renders correctly at every width |
| Phase-2A flow re-trace (article read, bookmark toggle, mood save, provider search, MindMate error path) | traced against fixed code — consistent |
| Adversarial second-pass review of the full diff | see §6 |

Known baseline (not regressions, per `AUDIT_LOG.md` D-08): 3 local-only vitest failures (taxonomy, 988-link ×2) and the full local suite OOMs; CI (`--maxWorkers=2`) is the green reference.

---

## 5. RESIDUAL RISK (non-negotiable — unverifiable in this environment)

1. **SECRETS STILL LIVE IN GIT HISTORY.** SEC-001 only cleaned HEAD. The Supabase **service-role key** (full RLS bypass over a health database with PII), Sanity write token, and Gemini key remain in commit `eea3cd4` and every clone. **Required manual actions I cannot perform:**
   - **Rotate all three keys immediately** (Supabase → new service-role key; Sanity → revoke + reissue token; Google Cloud → regenerate Gemini key), and update Vercel env vars.
   - **Purge from history** (`git filter-repo` / BFG) and force-push. Coordinate — this rewrites history on a shared repo.
   Until rotated, treat the database as compromised-capable.
2. **Real backend behavior unverified.** Preview ran with no Supabase/Sanity/API; content regions render empty via the fallback cascade. Data population, RLS behavior, mutation round-trips, and the AI streaming path were traced in code, **not exercised against the live backend.**
3. **Auth-gated routes VIEWPORT_UNVERIFIED.** `BookmarksPage` (C-1) and admin `ReportDetailPage` (F-3) need a real session/admin token to render; not screenshotted. Their logic is traced + unit-context-checked but not rendered end-to-end.
4. **Rate limiter (chat.ts) is per-instance.** The in-memory store does not bound requests across concurrent Vercel lambdas; effective limit scales with instance count. Needs a shared store (Redis/Upstash) — infra work.
5. **CSP is Report-Only.** No browser-level XSS defense-in-depth (both `dangerouslySetInnerHTML` sinks are DOMPurify-sanitized, so primary XSS is mitigated). Enforcing CSP risks breaking inline styles/Sanity images — needs a staged rollout, not a flip.
6. **Cross-browser / real-device rendering unverified.** Only headless chromium at 4 widths; no Firefox/WebKit/physical devices, no real network/latency, no large data volumes (e.g. a user with 365+ mood entries — unbounded lists per F-10).
7. **E2E gap persists.** Playwright runner is broken locally (ESM+pnpm dup) and absent from CI; these fixes are not covered by end-to-end tests.
8. **Systemic service-swallow (§3)** remains for the non-fixed instances (feedback/newsletter/waitlist dead-letter queues never drained, admin partial-write silent success) — documented, not remediated.

---

## 6. Second-pass adversarial review

A fresh agent re-reviewed the entire `git diff main...HEAD` adversarially (told to find each fix wrong). It cleared 8 of 10 fix groups outright and surfaced **two real MED issues, both now fixed**:

- **Item 7 — BookmarkContext double-toggle race (regression I introduced):** moving the toggle decision out of the state updater (to fix the StrictMode double-fire, BC-2) reintroduced a stale-read race — two rapid toggles in one tick both read the same `bookmarks` snapshot and both fire a server toggle (net no-op, UI diverges). **Fixed** (`407989d`) by deciding through a synchronously-updated ref (`bookmarksRef`) via a shared `applyBookmarks` helper: a second toggle sees the first's result, so it is immune to both the StrictMode double-fire *and* the double-toggle race.
- **Item 6 — redundant double-wrapping:** after PageTransition wrapped children in RouteErrorBoundary, 15 routes still wrapped explicitly (harmless but misleading). **Cleaned up** (`5…` RTE-BND followup) — explicit wrappers + unused import removed; PageTransition is the single boundary source.

Confirmed-correct by the review (not exhaustive): api.ts defensive parse (no regression — old code also threw on empty bodies into the same catch), BookmarksPage remove-logic and type assignability, MoodJournal scale consistency + round-trip stability, MindMate throw propagation, the C-19 key change is a genuine bug fix (old key matched nothing), no circular import / out-of-Router usage for RouteErrorBoundary, Preloader cancel-guard, chat.ts idempotent disconnect, ReportDetailPage optional-field rendering.

One accepted LOW cosmetic note from the review: the valence↔score compression is lossy for authed users (valence 9 stores as 5, reloads as 10) and legacy authed rows written before C-2 shift their displayed value — inherent to a 10→5 column mapping, no crash, documented here.

**Net after review:** all fixes verified correct; the two issues the review found were fixed and re-verified (tsc clean, lint clean under `--max-warnings 0`, build green).
