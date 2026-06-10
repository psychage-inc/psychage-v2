# AUDIT_FINDINGS.md — Psychage v2 Full-Platform Audit

**Date:** 2026-06-10
**Branch:** `fix/admin-login-role-claim` (audited working-tree state, including ~38 uncommitted modified files)
**Method:** Read-only. Lane A commands executed locally; Lanes B–G via static code inspection of the full repo (src/, api/, supabase/migrations/ — 254 files, dist/ bundle, e2e/, scripts/). No source file modified; this file is the only artifact created.
**Baseline note:** The working tree was already dirty before the audit (48 git-status entries: design-remediation edits in ClarityJournal/MedicationTracker/layout components, untracked prior audit reports). Verified via `git diff` that the uncommitted changes are cosmetic token swaps + tap-target fixes, not logic changes. Audit covers the working tree as found.

---

## Executive summary

| Severity | Count |
|---|---|
| **P0** | 4 |
| **P1** | 17 |
| **P2** | 33 |
| **P3** | 31 |
| **Total** | 85 |

| Lane | P0 | P1 | P2 | P3 |
|---|---|---|---|---|
| A — Build & baseline | 0 | 2 | 1 | 1 |
| B1 — Clarity Score | ½* | 2 | 3 | 7 |
| B2 — Symptom Navigator | 1* | 1 | 6 | 4 |
| B3 — MindMate + Find Care | 0 | 1 | 9 | 4 |
| B4 — Toolkit/Articles/Auth/Admin | 0 | 1 | 2 | 4 |
| C — Sacred Rules & crisis | 2* | 4 | 2 | 3 |
| D — Database & security | 1 | 2 | 2 | 3 |
| E — A11y & design tokens | 0 | 1 | 4 | 3 |
| F — Content & copy | 0 | 2 | 6 | 4 |
| G — i18n | 0 | 1 | 8 | 4 |

\* P0s found independently by multiple lanes are counted once, under the lane that owns the fix. Cross-lane duplicates are merged throughout.

**The four P0s in one breath:** a user flagged as in-crisis in the UK (and 5 other locales) gets an **empty hotline list** in the navigator crisis modal; the Clarity Score "Save to Dashboard" ships **raw item-level PHQ-4/WHO-5/UCLA-3/PSS-4 answers to Supabase where any admin can read them** (SR-4); the Navigator results screen **rescales the sacred 0.75 relevance cap back to "100%"** on screen; and **all 8 article tables run with RLS disabled** — the carefully-written admin-only policies from the AUTH-002 fix are inert.

---

## P0 — Sacred-Rule & security blockers (fix first)

### P0-1 · SR-2 · Crisis overlay shows an empty resource list for non-mapped regions (UK, NZ, IE, ZA, PH, SG)
- **Where:** `src/components/navigator/CrisisOverlay.tsx:63-65`; `src/context/NavigatorContext.tsx:201-205`; `src/data/mock_knowledge_base.ts:766-805`
- **What:** Two stacked key bugs. (1) The overlay's fallback chain is `crisisResources[region] || crisisResources['INT'] || []` — the KB has **no `'INT'` key** (its international key is `'DEFAULT'`), so every region miss yields `[]`. (2) `detectRegion()` returns `'GB'` for UK locales but the KB keys UK resources under `'UK'`; it also returns NZ/IE/ZA/PH/SG which have no KB entries at all. The engine path (`src/lib/navigator/safety.ts:113-118`) falls back to `'DEFAULT'` correctly — the modal does not use it.
- **Why it matters:** A user who just selected suicidal-ideation symptoms sees a focus-trapped "Important Safety Information" modal listing **zero hotlines** (only a static findahelpline.com link survives). This is the single highest-stakes screen on the platform failing for ~6 locales including the UK.
- **Fix direction:** Use `resolveCrisisResources()` from safety.ts in the overlay (or change the fallback key to `'DEFAULT'` and normalize GB→UK); add a region-fallback regression test.

### P0-2 · SR-4 · Clarity Score persists raw item-level assessment answers to Supabase, admin-readable, no user delete path
- **Where:** `src/services/clarityScoreService.ts:40-53`; `src/components/pages/ClarityScoreTool.tsx:120-136`; `supabase/migrations/20260307000003_clarity_score_history.sql`; `20260430000001_fix_clarity_history_rls_recursion.sql` (policy `clarity_history_select_admin`)
- **What:** "Save to Dashboard" inserts `raw_answers` (all 20 item-level PHQ-4/WHO-5/UCLA-3/PSS-4 responses) plus `sub_scores`, `flags`, `domain_scores` into `clarity_score_history` keyed by `user_id`. The admin SELECT policy exposes every user's `raw_answers` to any admin JWT. No DELETE policy exists — users cannot erase saved assessments short of account deletion. Mitigations: explicit user click, auth-gated, disclosed in intro copy ("stay on your device unless you choose to save"). The dashboard only ever reads back `total_score`/`label`/`domain_scores` — `raw_answers` serves no product need.
- **Why it matters:** SR-4 as written ("Clarity Score data stays on-device") has no opt-in carve-out; even granting one, item-level mental-health screening responses linked to identity and readable by admins is a privacy/GDPR exposure far beyond what the feature needs.
- **Fix direction:** Stop persisting `raw_answers` (and arguably `sub_scores`); exclude `raw_answers` from any admin-visible surface; add a delete-own RLS policy. If opt-in persistence of *derived scores* is intended, ratify it as an explicit Sacred-Rule exception in writing.

### P0-3 · Sacred cap · Navigator results display rescales the 0.75 cap to "100%"
- **Where:** `src/components/navigator/ResultCard.tsx:65,70`
- **What:** Displayed relevance is `Math.round((relevance_score / 0.75) * 100)` — a condition at the engine's hard cap renders as **"100%"**. No display clamp exists; the component's own test fixture uses an impossible `relevance_score: 0.85`, which would render 113%.
- **Why it matters:** The 75% cap exists precisely to prevent the appearance of diagnostic certainty. The engine enforces it correctly (`scoring.ts:125,134`, twice); the display layer then undoes it — exactly the framing the Sacred Rule forbids.
- **Fix direction:** Display `relevance_score * 100` (max 75%) or clamp displayed % to ≤75; add a regression test (the cap currently has zero display-layer test coverage).

### P0-4 · Security · All 8 article tables run with RLS disabled; the AUTH-002 fix policies are inert
- **Where:** `supabase/migrations/20260316000008_disable_article_rls.sql:30-34`; `20260316000009_disable_remaining_article_rls.sql:28-30`; vs `20260423000002_fix_articles_rls.sql` (whole file)
- **What:** RLS was disabled on `articles`, `article_citations`, `article_comments`, `article_images`, `article_status_history`, `article_categories`, `article_subcategories`, `article_derivatives` and **never re-enabled**. Verified by direct migration grep: every `ENABLE ROW LEVEL SECURITY` on these tables is in `20260315000001/000003` and `20260316000001` — all *before* the disables — and `20260423000002` (which recreates correct `is_admin_writer()`-gated policies) contains no ENABLE statement. A policy has zero effect while RLS is off.
- **Why it matters:** Per the migration chain, the article corpus — the platform's core product — is open to anon-key reads of drafts/archived content at minimum, and (per Supabase default grants on public tables) potentially open writes/deletes: the exact "any patient can destroy the corpus" hole AUTH-002 was meant to close. *Caveat:* live-DB state could differ if RLS was manually re-enabled in the dashboard — verify in production before/while fixing.
- **Fix direction:** One new migration: `ALTER TABLE … ENABLE ROW LEVEL SECURITY` for all 8 tables (the 20260423000002 policies will activate as-is); then verify no residual broad GRANTs to `anon`/`authenticated`.

---

## Lane A — Build & baseline health

Commands discovered from `package.json` and executed exactly as listed:

| # | Command | Result |
|---|---|---|
| 1 | `pnpm exec tsc --noEmit` | **PASS** (exit 0, zero errors) |
| 2 | `pnpm run lint` (`eslint . --ext ts,tsx --max-warnings 0`, legacy config) | **FAIL** — 499 problems: **257 errors, 242 warnings** across 251 files |
| 3 | `pnpm run test` (`vitest run`) | **FAIL** — 358 failed / 1,349 passed / 4 skipped (1,711 tests, 64 of 162 files failing) |
| 4 | `pnpm run build` (`tsc && verify:routes && build:api && vite build`) | **PASS** (37s) with chunk-size warnings |
| 5 | `pnpm exec playwright test --project=chromium` | **FAIL** — collection error, "two different versions of @playwright/test"; **no tests ran** |

### Findings

- **P1 | A-1 | repo root: `package-lock.json` coexisting with `pnpm-lock.yaml`; `node_modules/react`, `node_modules/react-dom`, `node_modules/playwright`, `node_modules/jsdom` are real npm directories (mtime Jun 6) inside an otherwise pnpm-symlinked tree (Apr 21) | An `npm install` was run over the pnpm-managed `node_modules` on Jun 6, creating **two physical React copies**. All 358 vitest failures share one signature — `Cannot read properties of null (reading 'useState'/'useRef'/'useMemo'/'useContext'/'useReducer')` (728 occurrences) — i.e., hooks called against the wrong React instance. The Playwright e2e suite fails collection for the same duplicate-package reason. **The entire test gate is non-functional in this environment; no feature can currently be verified by tests.** | Delete `node_modules` + `package-lock.json`, `pnpm install`, re-run suite; expected to restore the ~1,700-test baseline. (Likely related: iCloud-synced Desktop has previously corrupted this tree.)
- **P1 | A-2 | 257 lint errors with `--max-warnings 0` (the project's own gate) | Build script doesn't run lint, and pre-commit only checks lockfile sync — so the gate is aspirational. Breakdown: 114 `@typescript-eslint/no-unused-vars` + 35 unused eslint-disable directives + 86 `no-useless-escape` + 6 `prefer-const` + misc. Hotspots in critical paths: `src/App.tsx:16,103-106` (unused lazy-loaded `ProviderDashboard`/`ProviderProfileEditor`/`ProviderAnalytics`/`ProviderPatients` — provider dashboard routes appear de-wired), `src/services/articleAdminService.ts` (16 errors), `src/services/articleService.ts:222,286,350,495`, `src/pages/admin/v2/providers/ProviderEditor.tsx:390-420` (5 unused disable directives) | One mechanical cleanup pass (`--fix` resolves 40), then wire `lint` into CI/pre-commit so it can't drift again.
- **P2 | A-3 | `vite.config.ts:103` sets `chunkSizeWarningLimit: 600` yet the build emits **20+ chunks over 600 kB** (largest 2,107 kB / 629 kB gzip; `main` 471 kB; article-content chunks dominate) | Initial-load and route-load cost on a global, mobile-heavy audience; the limit exists but is purely advisory | Split article TSX content chunks (manualChunks or per-category dynamic import); track the top 5 offenders.
- **P3 | A-4 | 242 `no-explicit-any` warnings; critical-path concentration: `src/services/sleepDiaryService.ts` (9) | `any` in the service layer bypasses the strict-mode guarantees the repo otherwise enforces | Type the Supabase row mappers in sleepDiaryService first; the rest are mostly tests.

---

## Lane B1 — Clarity Score

**Scoring math verified CORRECT against all four published instruments** in the live engine (`src/lib/clarity/scoring.ts`): PHQ-4 (4 items 0–3, GAD-2=q1+q2 / PHQ-2=q3+q4 correctly assigned, cutoffs ≥3), WHO-5 (raw inversion then ×4 → 0–100, ≤28% flag), UCLA-3 (1–3 scale, 3–9, ≥6 cutoff), PSS-4 (items 2&3 reverse-scored `4−v`, 0–16). Composite = 5 equal-weight domains normalized 0–20, sum 0–100; tier bands consistent across scoring, content, and UI. The 5th dimension is a disclosed custom WHODAS-adapted functioning scale.

- **P0-2** (raw_answers persistence) — see P0 section.
- **P1 | B1-1 | `src/components/pages/ClarityScoreTool.tsx:322` | Crisis-modal SMS link is `sms:741741&body=HOME` — missing `?`, so the recipient parses as the invalid string `741741&body=HOME` | Broken Crisis Text Line shortcut on a live crisis interrupt surface | Change to `sms:741741?body=HOME` (CrisisUrgentBanner.tsx:35 already has the correct form).
- **P1 | B1-2 | `src/pages/dashboard/AssessmentHistory.tsx:34` (route `/dashboard/history`, App.tsx:346-352) + `src/lib/api.ts:292-298` | Fetches `api.clarityScore.getHistory()` → `GET ${API_URL}/api/clarity-score`, an endpoint that **does not exist** (api/ contains only ai/, geo-detect/, lib/). In prod the SPA rewrite returns index.html, `.json()` throws, error is swallowed → permanent empty state | Scores the user explicitly saved appear lost; silent data-loss UX on a dashboard page | Swap to `clarityScoreService.getHistory()` (already used correctly by UserDashboard.tsx:209-211).
- **P2 | B1-3 | `src/components/tools/ClarityScore/data/dimensions.ts:42-54,70-82`; `src/lib/clarity/questions.ts:20-45` | WHO-5 (subjective wellbeing) is labeled "Cognitive Clarity"; PSS-4 (perceived stress) is labeled "Physical Vitality" | Dimension names misrepresent what the validated instruments measure — "Physical Vitality 5/20" was computed from stress questions; undermines the "validated instruments" claim | Rename display names to match constructs; keys can stay for DB compat.
- **P2 | B1-4 | `src/lib/clarity/scoring.ts:319-323` + `results/OverviewTab.tsx:126-161` | Top-2 dimensions are always presented as "Core Strengths" with affirmative copy even when all 5 scores are crisis-tier (0–4/20) | A user in across-the-board crisis is shown false-positive strength statements — misleading in a mental-health context | Gate strength insights on an absolute floor (e.g. ≥12/20); neutral message otherwise.
- **P2 | B1-5 | root `clarity-score/` (esp. `lib/api.ts:20-26`, `lib/scoring.ts:12-13`) | Dormant standalone Next.js prototype: submits **raw answers** to a Supabase edge function for all users incl. anonymous, and has PHQ-2/GAD-2 subscales **swapped** (its own test at `__tests__/scoring.test.ts:52-63` asserts the bug). NOT deployed (absent from vercel.json/Vite build) | Dormant SR-4 violation + wrong math, one accidental wiring away from production | Delete or quarantine the prototype directory.
- **P3 | B1-6 | `ClarityScoreTool.tsx:212-235` | Progress key removed at line 214, before the 2s fake "calculating" delay; results never persisted to STORAGE_KEY | Refresh during the window discards all 20 answers | Clear progress only after results render.
- **P3 | B1-7 | `ClarityScoreTool.tsx:224` vs `clarityScoreService.ts:65,143` | Local history stores `toLocaleDateString()`, server stores ISO; streak logic compares `split('T')[0]` keys that never match locale strings; HistoryTab renders the raw mixed strings | Broken streaks, ugly chart labels | Store ISO everywhere; format at render.
- **P3 | B1-8 | `src/lib/clarity/scoring.ts:29-72` | Missing answers silently default to best-case (`|| 0`, `|| 1`, `: 4`) with no completeness validation | Unreachable via UI but the exported function scores tampered/partial localStorage as "Thriving" | Validate all 20 keys present and in-range.
- **P3 | B1-9 | `results/ScoreGuideTab.tsx:321-322` | "All instrument selection and scoring methodology reviewed and approved by Dr. Lena Dobson, Ph.D. …" — Dobson is the site-wide persona author (`src/data/authors.ts:31-34`) | If not a real licensed reviewer, this is a fabricated clinical-review claim on an assessment tool | Verify the review happened or remove the claim.
- **P3 | B1-10 | `results/HistoryTab.tsx:170-172` | Empty state claims "Your data stays on your device" (false for saved-to-dashboard users) and "Your first result has been saved" while `history.length===0` | Contradictory privacy copy | Qualify copy; remove unreachable branch.
- **P3 | B1-11 | `data/phase-protocols.ts:38` | `sms:741741?&body=HOME` — stray `&` after `?` | Inconsistent with correct form | Normalize.
- **P3 | B1-12 | `src/lib/clarity/scoring.ts:335-343` | Crisis trigger (PHQ-4 ≥8 or q4 ≥2) is a custom heuristic documented nowhere; dead AssessmentPage comment miscites "PHQ-9 item 9" | Undocumented safety-relevant tuning | Document the heuristic; remove the PHQ-9 citation.
- **P3 | B1-13 | `src/pages/tools/clarity-score/*`, `src/pages/dashboard/UserAssessmentHistory.tsx`, `src/services/assessmentService.ts`, `src/lib/api.ts:292-298` | ~700 lines of dead parallel implementation with naive math, sharing the live tool's localStorage keys with a different answer format | Confusion + data-format collision hazard | Delete the dead pages/service/API stubs.

**Coverage:** `src/lib/clarity/scoring.ts` has **zero tests** — the only scoring tests in the repo test the dormant prototype's (buggy) engine and are excluded from vitest's include glob. No E2E of answer→crisis modal→results. Smoke-render coverage only.

---

## Lane B2 — Symptom Navigator

**Architecture verified:** KB bundled at build time from `src/data/mock_knowledge_base.ts` (no fetch); engine runs synchronously client-side (`ProcessingScreen.tsx:64` → `src/lib/navigator/engine.ts`). The Next.js-style `src/app/api/navigator/` no longer exists. Raw symptom IDs/severities **never leave the device** in any live code path — verified. The 0.75 cap is enforced twice in scoring (`scoring.ts:125,134`) with no admin/env/DB override path today.

- **P0-3** (display rescale to 100%) — see P0 section. **P0-1** (crisis overlay region keys) — see P0 section.
- **P1 | B2-1 | `src/data/mock_knowledge_base.ts` (whole file) vs spec | Actual bundled counts: **103 symptoms / 40 conditions / 595 mappings** — not the spec'd 106/45/448. Phase 4 is only in `supabase/migrations/20260303000001/2` and the test fixture (`src/tests/navigator/test-helpers.ts`), never shipped to the client. Missing: 9 of 14 Phase 4 conditions (NPD, ASPD, DPD, SZPD, OSDD, TTM, SPD_EXCOR, HYPER, ARFID), **PRC_008 (URGENT — identity switching)**, and severity-triggered WATCH flags CPG_015/ACT_009/SLP_006/APT_005/006. `VITE_NAV_TIER4/5/6_ENABLED` flags partially toggle nothing | Spec'd URGENT/WATCH safety triggers are not live; the 41-test Phase-4 suite validates a fixture production doesn't ship | Sync mock_knowledge_base.ts with the Phase 4 seed, or formally descope and correct spec/comments/tests.
- **P1 | C-1 | `src/lib/navigator/analytics.ts:90-101` (fired from `NavigatorContext.tsx:259-261,316-330`) | Auto-telemetry to `navigator_analytics` with `{session_hash, event_type ('started'/'completed'/'crisis_triggered'), domains_selected, symptoms_selected (counts), time_to_complete_seconds, results_shown, safety_flag_level: CRISIS/URGENT/WATCH}`. No raw symptom IDs (good); `session_hash` is random. But: fires with **no consent gate**, the `enableAnalytics` flag (`src/lib/navigator/config.ts:23`) is **never consulted** (dead config — analytics cannot be turned off), and for logged-in users the Supabase JWT rides the insert, making crisis-state linkable to identity server-side | Derived mental-health inference (crisis classification) leaves the device automatically — in tension with SR-4's letter; needs an explicit owner ruling | Gate `sendEvent` on `enableAnalytics` + cookie consent; drop `safety_flag_level` or strip auth from the insert path.
- **P1 | C-4 | `src/components/providers/shared/ProviderQuickMatch.tsx:30-49` → `src/lib/providers/queries.ts:217` | On results render (no user action), auto-fires `search_providers_v3` RPC with `specialty_slugs` mapped 1:1 from matched condition IDs (`ResultsScreen.tsx:150-155,468`) | Condition-derived health data leaves the device automatically, JWT-linkable for authenticated users | Defer the fetch until the user clicks "Find a Provider," or fetch a generic sample.
- **P2 | B2-2 | `src/lib/navigator/scoring.ts:125,134`; `engine.ts:48` | Cap enforced against `config.confidence_cap` (data) rather than a frozen literal. Safe today (bundled KB hardcodes 0.75; DB config table is service-role-only and read by zero client code) — but any future "load KB from DB" wiring silently makes the cap data-driven | Latent override path on a sacred invariant | Add a final `Math.min(x, 0.75)` clamp against a frozen constant.
- **P2 | B2-3 | `src/pages/admin/v2/symptom-navigator/*.tsx` | Admin panel edits Supabase `symptoms`/`conditions`/`symptom_condition_mappings` — tables the live navigator never reads (KB is compile-time bundled) | Split-brain: admin "deactivating" a condition changes nothing for users — false sense of control over a safety tool | Wire client KB to DB (with the frozen clamp) or label the admin section non-live.
- **P2 | B2-4 | `src/tests/navigator/api.test.ts` | 18 tests validate auth/PII-rejection/rate-limiting for an API deleted from the repo; assertions run against inline constant copies | Green tests imply enforcement that isn't deployed | Retire or retarget at `analytics.ts`.
- **P2 | B2-5 | `scripts/validate-language.ts:48-52` + package.json + `.husky/` | The prohibited-diagnostic-language gate scans only `src/lib/navigator` + `supabase/migrations` and is wired into **no** script, hook, or build step | SR-3 currently holds by discipline, not enforcement; UI copy and KB copy are unscanned | Widen SCAN_DIRS (components/screens, src/data, clarity results copy) and add to the `build` chain.
- **P2 | B2-6 | `NavigatorContext.tsx:316-330`; `analytics.ts:81-87` | `crisis_triggered` fires for WATCH/URGENT too; results effect can re-fire; feedback writes a duplicate `completed` row | Inflates crisis metrics; bad data quality | Fire only on CRISIS; once-ref; distinct feedback event.
- **P2 | B2-7 | `src/components/screens/AgeGateScreen.tsx`; NavigatorContext `age_gate` state | Age-gate step exists in state/config (`VITE_NAVIGATOR_AGE_GATE`) but nothing dispatches it and NavigatorFlow doesn't render it | Setting the flag silently does nothing; COPPA work is dead code | Wire it or document the flag as non-functional.
- **P3 | B2-8 | `SymptomSelectionScreen.tsx:199` | Empty-search copy claims "82 symptoms across 12 categories"; actual 103/14 | Stale copy | Derive from KB.
- **P3 | B2-9 | `scoring.ts:41` vs `:122`; `NavigatorContext.tsx:228-229` | Comment says count cap `/5`, code uses `/3`; KB comment claims 106/45/448 vs actual 103/40/595 | Doc drift on safety-relevant tuning | Fix comments.
- **P3 | B2-10 | `src/services/symptomService.ts:99-101` + `SymptomCheckerPage.tsx` | Deprecated v1 checker would POST raw symptom IDs to a nonexistent endpoint; unrouted | Dead but revivable privacy hazard | Delete per its own deprecation notice.
- **P3 | B2-11 | `ResultsScreen.tsx:157-158`; `lib/navigator/storage.ts` | Condition-derived specialty slugs in `/providers/search?specialty=…` URLs (browser history); raw selections in localStorage 24h unencrypted | Local-device exposure only | Consider state-based handoff; document retention.

**States verified clean:** zero-symptom guard (double), engine-throw error states with role="alert", 24h schema-validated localStorage restore (results always recomputed, never stale), corrupted-state recovery, skeletons + aria-busy.
**Copy verified clean** apart from the P0 display bug ("Likely Patterns" heading and "N possible conditions identified" announce lean probabilistic — P3 at most).
**Coverage:** 134 tests in `src/tests/navigator/` + 22 lib + ~59 component + 3 a11y suites. Cap ≤0.75, crisis halt, determinism, diversity all asserted. **Untested:** ResultCard's /0.75 rescale, CrisisOverlay region fallback, GB/UK mapping, analytics effects, ProviderQuickMatch auto-fetch, production-KB count integrity (floor assertions only).

---

## Lane B3 — MindMate AI + Find Care

- **P1 | B3-1 | `api/ai/chat.ts:237` + `src/lib/ai/llm.ts:83-97,138-153` | Client-supplied messages are spread verbatim with no role allow-listing; AnthropicProvider joins every `role:'system'` message onto the real system prompt. The safety classifier inspects only the last **user** message (`chat.ts:115`), so injected system turns bypass it entirely | Prompt injection: any caller can append "ignore prior rules…" to the system prompt of a mental-health chatbot | Reject/coerce any role other than `user`/`assistant` server-side before building llmMessages.
- **P2 | B3-2 | `api/ai/chat.ts:247-296` | Output safety is 3 inline diagnostic regexes; the full `validateOutputSafety` (`safety.ts:275`) and `analyzeConversationPatterns` are never called in the serving path — and the check runs **after** the token loop has streamed the full text to the client | Violating content is seen before the SAFETY_VIOLATION replacement arrives | Wire validateOutputSafety into the stream with sentence-boundary buffering.
- **P2 | B3-3 | `src/lib/ai/safety.ts:190-196` | Input classifier **fails OPEN**: on LLM error with no keyword match it returns SAFE (conf 0.5) | Nuanced crisis phrasing that misses the Layer-0 regexes passes unflagged whenever the Haiku classifier errors/times out — wrong failure direction for this product | Default to WATCH on classifier failure; surface a soft crisis nudge.
- **P2 | B3-4 | `api/ai/health.ts:44-67` | Unauthenticated, un-rate-limited endpoint fires a real billed Anthropic call per hit | Trivial cost-amplification / token-burn vector | Token-gate or cache the validation result.
- **P2 | B3-5 | `api/ai/chat.ts:21-45,146` | Rate limiting is an in-memory Map — per-lambda, wiped on cold start; the anonymous/hourly/daily/global tiers in `config.ts:46-60` are never used | Effective limit far above nominal 20/min under serverless fan-out | Move to Upstash/Redis (the file's own TODO).
- **P2 | B3-6 | `src/components/ai/MindMate.tsx:28,116-121` + `src/context/AuthContext.tsx:263` | `psychage_ai_chat_history` is written unconditionally (no consent gate) and never cleared on logout | On a shared device the next user reads the previous user's mental-health conversation | Clear the key on SIGNED_OUT; gate the write on the existing chat-history consent.
- **P2 | B3-7 | `supabase/migrations/20250220000009_ai_rls_policies.sql:58-80` | `ai_conversations`/`ai_messages` INSERT policies are `WITH CHECK (TRUE)` — any caller can insert conversations with arbitrary `user_id` or messages into any conversation. Reads are correctly owner-scoped | Spoofing/pollution of users' stored chat history | `WITH CHECK (auth.uid() = user_id)`; messages check parent-conversation ownership.
- **P2 | B3-8 | `src/lib/providers/queries.ts:324-327` | Direct-query fallback interpolates `params.query` raw into `.or(\`display_name.ilike.%${q}%…\`)` — commas/parens inject additional PostgREST conditions (legacy `providerService.getAll:122` sanitizes; this path omits it). Primary RPC path is parameter-bound and safe | Filter injection when the RPC fails and fallback runs | Apply the same `replace(/[%_.*,()\\]/g,'')` sanitization.
- **P2 | B3-9 | `api/ai/chat.ts:59-74,299` | `extractCitations` parses `[SOURCE: …]` from LLM output; the `_searchResults` arg is unused, so emitted URLs are never validated against retrieved sources (the checking variant `llm.ts:589` is unused by the serving path) | Hallucinated citations render as clickable links in a health product | Drop citations not present in searchResults.
- **P3 | B3-10 | `src/lib/ai/retrieval.ts:78,147` vs `api/ai/embed.ts:133` | Retrieval reads `content_chunks`/`match_content_chunks`; every ingestion writer targets `psychage_embeddings`/`search_psychage_content` — no shared table, so RAG likely returns nothing in prod (also fully gated on optional OPENAI_API_KEY) | Citations never appear; RAG effectively dormant | Point retrieval and ingestion at one schema or document RAG as off.
- **P3 | B3-11 | `api/ai/feedback.ts:63` | Hardcodes `rag_used: true` ("we don't know this"); `session_id` not tied to the authed user | Corrupt analytics | Pass real flag; verify ownership.
- **P3 | B3-12 | `src/features/chat/ChatMain.tsx:30,75-80` | Full-page chat never auto-opens CrisisOverlay on `safetyLevel === 'CRISIS'` (manual button only; crisis resources still arrive as markdown text) | Degraded crisis UX vs the widget | Auto-open on CRISIS meta.
- **P3 | B3-13 | `src/lib/providers/queries.ts:297,317` + RPC `…v3.sql:196-198` | Fallback caps (1000/5000 rows) under-return on 423k rows with wrong total_count; unescaped `%`/`_` in p_query widen matches | Degraded-mode correctness only | Surface a degraded flag; escape wildcards.

**Verified clean:** server keys (`ANTHROPIC_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`) unreachable client-side; chat/feedback endpoints enforce Bearer JWT; claim-provider edge function validates NPI/ownership properly; provider rows expose public NPI data only; trust-badge logic sound; `search_providers_v3` parameter-bound with statement timeout; UI error/empty/loading states present on both surfaces.
**Coverage:** good unit coverage of `src/lib/ai/` pure functions; **zero coverage of the actual `api/ai/chat.ts` handler** (`src/tests/ai/safety.test.ts` is stale — wrong payload shape + missing auth, and `describe.skip`s without an API key); no functional Find Care search/claim tests; e2e is render-smoke only.

---

## Lane B4 — Toolkit · Articles · Auth · Admin · Crisis resources

- **P1 | B4-1 | `supabase/migrations/20260330000001_fix_admin_roles_rls_recursion.sql:25-27` + `src/pages/admin/v2/settings/UserManagement.tsx:37,55,72` | Admin User-Management role CRUD is fully RLS-blocked at runtime: `admin_roles_modify FOR ALL USING (false)` blocks all writes from the anon-key client, and the SELECT policy's `user_metadata.role='admin'` branch can never be true post-AUTH-001 strip-trigger. List shows only the admin's own row; invite/change/remove mutations all error. Contradicts `ADMIN_AUDIT_FINDINGS.md` ("role CRUD works") | Security posture is actually good (no client-side escalation), but the feature is dead and the prior audit doc is wrong | SECURITY-DEFINER RPCs gated on `is_admin_writer()` for role mutations, or remove the UI and document service-role provisioning.
- **P2 | B4-2 | `src/context/AuthContext.tsx:47-53` + `20260423000008_b7_extend_role_sync.sql` | Role resolved from `app_metadata.role` only; JWT minted at signup predates the B-7 trigger's metadata write, so a fresh provider's first session maps to `patient` until token refresh; same staleness after admin role changes | Wrong role-based routing window | `refreshSession()` after signup completion and role mutations.
- **P2 | B4-3 | `src/components/screens/CrisisResourcesScreen.tsx:12-22` | The navigator crisis page hardcodes `crisisResources['US']` (comment: "Assuming US") with the dead `'INT'` fallback, and its dynamic `import()` has **no `.catch`** — chunk-load failure leaves an infinite spinner on a crisis page (static "dial 911 (US)" footer always renders, so not fully fail-closed) | Non-US users get US hotlines; failure mode is a spinner on a safety surface | Use `lib/crisis` `getResourcesForCountry(resolveCountry())` like CrisisPage; add `.catch`.
- **P3 | B4-4 | `src/components/tools/MedicationTracker/storage.ts:158-209` | `todayStr()`/`daysAgo()` use UTC dates while weekday/day-of-month checks use local | Late-night negative-UTC-offset users see tomorrow's weekly/monthly doses; adherence-window off-by-ones | Standardize one date basis.
- **P3 | B4-5 | `src/components/tools/MoodJournal.tsx:42-60` | Anonymous localStorage mood entries never migrate on login (SleepArchitect has `useSleepSync` merge; MoodJournal has nothing) | Prior history silently disappears after sign-in | One-time local→Supabase merge.
- **P3 | B4-6 | `src/context/AuthContext.tsx:96-108` | Boot `getSession()` has no `.catch`; a rejection leaves `isLoading` true forever | App-wide hang on the loading gate (low likelihood) | `.catch` → `{isLoading:false, isAuthenticated:false}`.
- **P3 | B4-7 | `src/hooks/useAdminAuth.ts:40-52` | Dev-only `user_metadata.role==='admin'` bypass (DEV-gated) | Not a prod hole; trusts user-writable metadata in dev | Acceptable; keep the guard.

**Verified clean:** open-redirect defense (`validateRedirect.ts` rejects `//`,`://`,`..`, prefix allowlist, applied at every read site; AuthCallback ignores user-supplied redirects); article XSS (DOMPurify before every `dangerouslySetInnerHTML`; iframe widening is admin-authored content only); article cascade Supabase→mock degrades correctly with slug dedup; crisis engine (`lib/crisis/engine.ts`) is pure synchronous bundled data with country→regional→global→UNKNOWN fallback — cannot fail closed; toolkit persistence all client-side localStorage with try/catch + import validation; ClarityJournal screener scores correctly clamped; signup hardening (identities[] obfuscation, metadata allowlist drops injected `role`); `src/lib/adminRole.ts` single-decision-point coherently consumed everywhere — the recent admin-login fix chain checks out. (Email-confirmation-disabled: known deferral, noted, not filed.)

**Coverage gaps (zero tests):** `articleService.ts` cascade, `ArticleHtmlRenderer`/DOMPurify XSS regression, ArticlePage/CategoryPage routing, admin mutation paths, `CrisisResourcesScreen`, `MoodJournal` merge gap, `adminRole.ts` decision point.

---

## Lane C — Sacred Rules & crisis safety

P0-1 (crisis overlay empty list) and P0-2 (raw_answers off-device) above. Additional findings:

- **P1 | C-2 | Five crisis surfaces hardcode US numbers on a 190-country platform: `ClarityScoreTool.tsx:307-332` (tel:988 / sms:741741), `api/ai/chat.ts:172` (`generateCrisisResponse('US','en')` for every MindMate user worldwide — the region param exists at `safety.ts:442` and is ignored), `src/features/chat/components/CrisisOverlay.tsx:27-48`, `src/components/screens/CrisisResourcesScreen.tsx:18`, `src/components/screens/AgeGateScreen.tsx:111-112` | Non-US users in crisis are routed to numbers that don't work in their country, while a fully-built geo-resolution library (`lib/crisis`, used correctly by CrisisBanner and the MindMate widget) sits unused by these five | Route all five through `resolveCountry()`/`getResourcesForCountry()`.
- **P1 | C-3 | `src/components/error/ErrorFallback.tsx` (mounted `src/index.tsx:36`) | The root error boundary's full-screen fallback — which replaces the whole app including the nav crisis button — has **no crisis link or number**, only Try Again / Return Home | A crash above the route level leaves zero crisis access (route-level fallbacks are fine only because Navigation stays mounted) | Add a static `<a href="/crisis">` + one hardcoded-safe international helpline line (component is deliberately dependency-free; plain HTML fits).
- **P1 | C-1, C-4** — navigator telemetry & auto provider-match: filed under Lane B2 above.
- **P2 | C-5 | `src/App.tsx:56,72` | `/crisis` and the navigator crisis page are `React.lazy` chunks with no retry/eager preload — a stale-deploy chunk hash or flaky network can 404 the crisis pages at the worst moment (mitigated: nav button + footer CrisisBanner tel: links ship in the main bundle) | Crisis destination availability | Bundle CrisisPage eagerly (small, static data) or retry-once lazy wrapper.
- **P2 | B2-5** — validate-language gate unwired: filed under Lane B2.
- **P3 | C-6 | `src/AdminApp.tsx` + `src/components/admin/AdminLayout.tsx` | Admin app (separate domain) has zero crisis links in layout/login/error fallback | Staff-facing, but SR-2 says every layout | One sidebar/footer link.
- **P3 | C-7 | `src/lib/sentry.ts:33-55` | `beforeSend` scrubs `query`/`search`/`message` and request-URL params, but not `crumb.data.url` on fetch/XHR breadcrumbs — `/search?q=depression` and Supabase REST URLs survive | Health-adjacent search terms can reach Sentry (no navigator/clarity answers travel in URLs — verified) | Scrub breadcrumb URLs too.
- **P3 | C-8 | `supabase/migrations/20250220000001_navigator_tables.sql:131` | `confidence_cap DECIMAL DEFAULT 0.75` has no `CHECK (<= 0.75)` | Moot today (zero client reads) but the one unguarded future override path | Add the CHECK constraint.

**Verified clean (evidence in agent transcript, spot-confirmed):**
- **SR-2:** `/crisis` ungated (App.tsx:294 — no guard/consent/geo); Navigation with always-visible Crisis button renders on every SPA route incl. auth/onboarding/404 (App.tsx:209) and survives route-level crashes; preloader phase has a dedicated crisis anchor above its z-index (App.tsx:193-203 z-[10000] vs Preloader z-9999); CookieConsent is non-blocking (z-70, no backdrop); age gate is navigator-internal and its underage screen itself lists crisis lines; 404 links Emergency Help → /crisis; CrisisPage renders synchronously from bundled static data with a 190+ country picker — `lib/crisis` contains zero network calls.
- **SR-3:** Navigator and Clarity results consistently framed "not a diagnosis"; MindMate system prompt rule 1 "NEVER diagnose" + server-side diagnostic-regex post-filter on both streaming and non-streaming paths; repo-wide sweeps for diagnostic-assertion patterns hit only educational prose, disclaimers, and the prohibited-phrase lists themselves.
- **SR-4 (navigator core):** engine pure & synchronous; KB compile-time bundled; region detection local; state in localStorage only; no answers/scores in URLs; no server endpoint exists that could receive symptom payloads. ClarityJournal report's "on-device" claim verified true (zero supabase/fetch under `src/components/tools/ClarityJournal/`). Plausible analytics: zero navigator/clarity event calls.
- **75% cap:** hardcoded at `utils.ts:26` and KB `:749`; double-enforced in scoring; admin `CONFIDENCE_CAP` constant is display-only (`MappingMatrix.tsx:214`); DB config table read by zero client code; no env/flag override. **Holds** (modulo the P0-3 display bug and P3 CHECK constraint).

---

## Lane D — Database & security (Supabase)

P0-4 (article RLS disabled) above. Additional findings:

- **P1 | D-1 | `supabase/migrations/20260325000001_create_contact_submissions.sql:24-26` | Policy named "Admins can view contact submissions" actually gates on `auth.role() = 'authenticated'` — every logged-in user | Any patient account can read all contact-form PII (names, emails, message bodies) via REST | Replace condition with `public.is_admin()`.
- **P1 | D-2 | `20260411000002_provider_reviews.sql:67-69` | `public_reads_active` is row-wide `FOR SELECT USING (status='active')` — exposes `feedback_text`, which the file header declares "ALWAYS private — never displayed publicly" (enforced only "at app layer") | Anon clients can `select=feedback_text` and read every reviewer's private free-text feedback | Public view with rating columns only, or move private text to an owner-scoped table.
- **P2 | D-3 | `20260306000001_provider_directory_v2.sql:208-210` (never replaced) | Owner UPDATE policy on `providers` has no column constraints — a provider can set `status='active'`, `verified_at`, `tier='premium'` on their own row; the audit trigger (20260425000003) logs status changes but blocks nothing, and tier changes aren't logged | Self-verification + free tier upgrade bypassing Stripe | Column allow-list via BEFORE UPDATE trigger resetting status/tier/verified_* for non-admins.
- **P2 | D-4 | `20260419040000_fix_newsletter_rls.sql:28-33` | UPDATE policy still `USING (true)` (kept for anon unsubscribe links; acknowledged TODO) | Anyone can mass-tamper all subscriber rows | Token-based unsubscribe via edge function.
- **P3 | D-5 | `20260307000002_consent_and_privacy.sql:171` + `20250109000000:117` | `handle_new_user()` takes `role` from client-controlled signup metadata; `'admin'` blocked by the AUTH-006 CHECK but `'provider'` self-assignment still possible | Low impact (provider powers gate on `providers.user_id` ownership) | Whitelist to `patient` at signup.
- **P3 | D-6 | dead admin policies: `audit_logs` (`…000001:338/348`), `consent_log_select_admin`, `dsar_*_admin`, profiles "Admins can view/update all" — all gate on `profiles.role='admin'`, impossible after AUTH-006 narrowed the CHECK to `patient|provider` | Admin reads of audit/consent/DSAR silently rely on service-role; four different admin-gate idioms coexist (`profiles.role` dead, `user_metadata` defanged, `app_metadata`, canonical `is_admin()`) | Consolidate on `is_admin()`/`is_admin_writer()`.
- **P3 | D-7 | duplicate migrations: `admin_roles` created twice with different role vocab (`20260310000001` `clinical_admin` vs `20260325000003` `editor`); `conditions`/`symptoms`/`symptom_condition_mappings` created in both `20250109000001` and `20260310000004`; `20260413000001_content_feedback.sql:30-32` lets anyone read all anonymous feedback; `provider_analytics_events` has two overlapping INSERT policies (`20260419000001` + `20260419033412`); `20260604000001_archive_empty_articles.sql` is **untracked** in git (CI runners won't apply it — commit or delete) | Migration coherence drift | Tidy in one hygiene migration + commit the stray file.

**Sacred-Rule reconciliation (informational):** tables persisting assessment-adjacent data: `assessments`/`assessment_responses` (legacy), `assessment_results` (`answers` JSONB), `clarity_score_history` (`raw_answers` — the P0-2), `navigator_saved_results` (client-encrypted blob, only ever *read* by the client — no live write path found). All RLS-isolated per `auth.uid()`. Decide explicitly which are ratified opt-in features and document the carve-out.

**Verified clean:** zero dynamic SQL in any SECURITY DEFINER function (no `EXECUTE format`); `is_admin*` recursion-safe with `SET search_path=''`; `get_user_by_email` admin-gated; maintenance RPCs revoked from anon/authenticated; **no service-role keys, JWT secrets, or AI keys anywhere in repo, scripts/, api/, or dist/** (only the public anon JWT appears in the bundle, by design); client uses exclusively `VITE_`-prefixed env vars (full list audited); api/ functions enforce Bearer JWT + rate limiting before service-role use, no CORS wildcards; `.env`/`.env.production` untracked; storage bucket `article-images` public-read/admin-write; Stripe tables service-role-write-only; full table→RLS inventory in the Lane D agent transcript — every user-data table has RLS enabled and own-row scoped **except the 8 article tables (P0-4)**.

---

## Lane E — Accessibility & design tokens

- **P1 | E-1 | `src/styles/tokens.css:94` + `src/components/ui/Button.tsx:20` | `--color-primary: #1A9B8C` feeds the primary Button's `bg-primary text-white` — the locked primary fill is **#157F73**. White body-size labels on #1A9B8C compute ≈3.4:1 (< 4.5:1 AA). Exactly one call-site uses the locked fill (hardcoded `bg-[#157F73]` at `src/pages/core/AdvisoryBoardPage.tsx:78`) | Locked token violated on the most-used interactive element, with an AA contrast failure | Retarget `--color-primary` to #157F73 — **but DESIGN_AUDIT.md assigns all teal-token changes to in-flight Slice 8 ("do not touch tokens.css"); route through Slice 8, don't fix piecemeal.**
- **P2 | E-2 | `src/components/ui/ScrollManager.tsx:49-70,94` | Lenis smooth-scroll initialized unconditionally; JS RAF scrolling ignores the CSS reduced-motion kill-switch; hash-scroll also animates | prefers-reduced-motion violated for scroll | Skip Lenis (or `immediate: true`) when `(prefers-reduced-motion: reduce)` matches.
- **P2 | E-3 | `src/components/Preloader.tsx:56-62` | Full-screen lottie intro autoplays ~3s with no reduced-motion check (lottie-web is JS-driven; CSS can't stop it) | Forced full-viewport motion on first visit | Skip phase / `goToAndStop` final frame under reduced motion.
- **P2 | E-4 | icon-only controls without accessible names on public surfaces: `src/components/booking/BookingModal.tsx:161,167` (calendar prev/next month), `src/components/tools/SleepArchitect/wind-down/BreathingExercise.tsx:103-109` (close X), `RacingThoughtsInterceptor.tsx:133-139` (Plus submit) + `:123-131` (placeholder-only input) | Unreachable by name for screen-reader users in live flows (booking is provider-facing revenue path) | Add `aria-label`s / associate the label.
- **P2 | E-5 | `src/components/tools/ClarityJournal/v2-report/ReportConfigScreen.tsx:164-180,234-251` | `<label>` elements sit beside inputs with no `htmlFor`/`id` (dates, name, therapist name) | No programmatic label association (pre-existing, not introduced by the working-tree diff) | Add id/htmlFor pairs.
- **P3 | E-6 | admin icon-only buttons: `CrisisKeywords.tsx:170,199`, `SymptomList.tsx:218`, `ArticleDetail.tsx:987` (Trash also ~24px) | Admin-only surface | Label when next touched.
- **P3 | E-7 | `tokens.css:101`+`globals.css:51` body text is `#0a0a0a`, not literal stone-900 `#1c1917` (darker than spec — zero user harm); `tokens.css:69,75-76` define 500/700ms duration tokens consumed only by entrance/decorative variants; `modalVariants` 0.35s marginally over the 150–300ms band (`src/lib/animations.ts:170`) | Vocabulary/spec drift only | Align token names/values with the locked spec or update the spec.
- **P3 | E-8 | dead code: `src/components/layout/NavHub.tsx:112` unlabeled X in a component imported nowhere; `three`/`@react-three/*` in package.json with **zero imports in src/** — there is no 3D hero (CLAUDE.md description stale) | Dead-weight deps + stale docs | Remove deps/component or update docs.

**Tracked-open items (status confirmed, not re-investigated):**
- **F-007 teal link contrast — still open.** Small-text `text-primary`/`text-teal-600` call-sites unchanged (`LearnPage.tsx:213`, `AboutPage.tsx:158`, `AuthorProfilePage.tsx:28,78`, `BookmarksPage.tsx:230`, `JournalHistory.tsx:131`; prose links pinned to #1A9B8C in `tailwind.config.js:130`). The `brand-accessible` token (#158A7D, `tailwind.config.js:56`) exists but is unadopted. Awaiting Slice 8.
- **P-1 empty-state pattern — partially fixed.** `src/components/ui/EmptyState.tsx` exists and is adopted across admin pages; the originally-named surfaces (ClarityJournal history/insights, provider search) still use inline text empty states.
- **Dark-mode visual pass (S-1) — still pending.** No dedicated pass in the working tree; modified files carry only incidental `dark:` utilities.

**Regression check on the ~38 uncommitted files: no regressions — the diff is net remediation** (min-h-[44px]/min-h-touch/w-11 h-11 additions, `text-slate-400`→`text-charcoal-600` fine-print fixes, font swaps; zero removed aria-labels/focus states; tokens.css/globals.css diffs are Fraunces font-face only — note Fraunces is a new display face vs the "Satoshi-only" design baseline: design decision, not an a11y issue).

**Verified clean:** reduced-motion 3 of 5 layers (global CSS kill-switch tokens.css:202-209, `<MotionConfig reducedMotion="user">` App.tsx:187, correct `useReducedMotion` hook used by ~40 components); global `*:focus-visible` ring survives all 191 `outline-none` occurrences; Radix Dialog/AlertDialog focus traps; SkipLink → `main#main-content`; header/nav/footer landmarks with labels; Button primitive ≥44px all sizes with string-children aria-label fallback; auth forms fully label-associated with `role="alert"` errors; raw `#1A9B8C` outside the F-007 cluster is exclusively charts/gauges/icons/borders/logo — compliant with the accent-only rule. A11y test coverage is Navigator-centric (5 jest-axe suites); auth/tools/articles/layout have no axe coverage.

---

## Lane F — Content & copy standards

- **P1 | F-1 | `src/components/tools/ClarityScore/data/results-content.ts:127,267,341,415` | "Occasional emotional dips are normal", "Some loneliness is normal", "Moderate stress is normal", "Some functional variability is normal" | Assessment-results copy immediately after PHQ-4/UCLA-3/PSS-4 screening — the highest-stakes surface for the "common not normal" rule (which is codified in the admin checklist at `ContentEditor.tsx:351`) | Swap to "common" phrasing.
- **P1 | F-2 | `src/pages/learn/ArticlePage.tsx:155` | Fallback reviewer credit is `'Dr. Lena Dobson, Ph.D.'` — missing "in Clinical Neuropsychology" | This is the **default reviewer byline on every article without an explicit reviewedBy** | Use the full form.
- **P2 | F-3 (aggregate: ~550 genuine of 633 flagged lines, 220 files) | `src/data/articles/category-*/` | Article body copy tells readers their feelings "are normal" ("this is normal" ×43, "completely normal" ×10, "is a normal response to" ×9, "setbacks are normal" ×8, "normal part of" ×9). Representative: `category-10/03b-online-comparison-cyberbullying.tsx:418,574,892,964,1024,1142,1146,1445,1919`, `category-10/01b-social-media-mental-health.tsx:765,1176`, `category-07/03a-grief-loss-bereavement.tsx:318,324,339,379`, `category-12/04a-immigration-displacement-mental-health.tsx:204,766,1046,1148`, `category-07/02b-types-of-depression.tsx:830,1806`, `category-05/02a-burnout-recognition-recovery.tsx:204`, `category-20/03a-specific-medical-conditions.tsx:115` | Editorial standard violated at corpus scale | Batch regex-assisted editorial pass, preserving clinical-differential usage (e.g. `category-07/02b:1497,1522,1852,1974` are legitimately clinical — do not change).
- **P2 | F-4 (aggregate, 17 lines) | seeded user-facing copy in migrations, incl. two live article **titles**: `20260321080601:224` "Relapse: Why Setbacks Are Normal…" and `20260412000001:1020` "Brain Aging…: What's Normal, What's Not" (the latter is differential-framing — judgment call); seo_descriptions at `20260316000002:337`, `20260412000001:1032`, `20260317000705:152` | Card + SEO surfaces | UPDATE migration (never edit applied migrations).
- **P2 | F-5 (aggregate, 151 lines / 114 files) | `articles/` batch2 markdown sources | Same "is normal" framing; re-propagates on every `convert-batch2-to-tsx.ts` run | Fix at the md source before next conversion.
- **P2 | F-6 | `src/components/tools/ClarityScore/data/phase-protocols.ts:35` | 35-word, 3-acronym sentence (WHO mhGAP / SAMHSA SAFE-T, FK ~16) shown to users whose scores indicate self-harm risk | The audience that most needs plain language gets the least | 2–3 short imperative sentences; protocol names → citation.
- **P2 | F-7 | Dobson short-form defaults that persist into published content: `src/pages/admin/v2/content/ContentEditor.tsx:98`, `src/pages/admin/v2/articles/ArticleCreator.tsx:89` (`'Dr. Lena Dobson'`), `supabase/migrations/20260310000002_content_versioning.sql:14` (column DEFAULT), `src/data/authors.ts:31` (name without credential; rendered standalone at `AuthorProfilePage.tsx:155`) | Every new article seeds the non-compliant short form | Full form in defaults + new migration altering the column default.
- **P2 | F-8 | `articles/batch2/creativity-therapeutic-arts/PSY-CRE-009_flow-creativity.md:9` ("Dr. Lena**:** Dobson…") and `PSY-CRE-058_creative-copying-imitation.md:9` ("Clinical Neuropsych ology") | Frontmatter typos that will propagate to TSX on next pipeline run (verified not yet in src/) | Fix frontmatter.
- **P3 | F-9 | `src/components/tools/RelationshipHealthCheck/frameworks.ts:95,100` | "Machine Learning Meta-Analysis…", "Used ML to identify…" render in the results UI via ScienceSection | AI/ML jargon in user copy | "Large-scale analysis of 11,196 couples…"; keep methodology in the citation.
- **P3 | F-10 | `src/components/ai/MindMate.tsx:377` + `src/features/chat/hooks/useChat.ts:160` | `Something went wrong: ${errorMsg}` interpolates raw server errors into the chat bubble — e.g. "MindMate misconfigured: missing env ANTHROPIC_API_KEY" (`api/ai/chat.ts:95`) | Env-var names leak into user-facing chat | Map to one plain fallback (PsychageAI.tsx:180 pattern).
- **P3 | F-11 | `phase-protocols.ts:63,90,113,135`; `RelationshipHealthCheck/patterns.ts`, `NextStepsBlock.tsx`, `interventions.ts` | More 180+-char multi-clause results-copy sentences ("NICE stepped-care step 3 and the APA Clinical Practice Guideline both recommend…") | Above grade-8 target | Split sentences.
- **P3 | F-12 | `src/lib/ai/llm.ts:26` (SYSTEM_PROMPT) + gap: no readability check covers non-article surface copy (PEAF gate at `readability.ts:104` + `constants.ts:203-205` is article-only and correctly targets FK ≤8) | MindMate output and tool copy ungoverned by the house style rules | Add a "common not normal" style line to the prompt; optional FK lint over locales/tool data.

**Verified clean:** locales (all 5) — zero "normal" framing, zero AI/ML jargon, zero Dobson issues; homepage hero and tool landing copy plain and short; MindMate system prompt jargon-free and mandates plain AI self-identification; 2,036 of 2,072 `Dobson` occurrences already in the exact full form (the 36 deviations classified above; 9 are unrelated cited researchers, 15 are code identifiers — not violations). Adjacent observation (P3): 25 seeded articles carry `author_name: 'Raima'` — a first-name-only published byline (`20260316000002:107` et al.); decide canonical credit.

---

## Lane G — i18n completeness (5 languages)

**Headline:** the platform is functionally English-only outside three islands (provider directory — the one fully-translated, fully-wired namespace; navigator symptom screen; auth error paths). Only 29 of ~1,188 source files call `useTranslation`. EN has 346 keys; ~172 are orphans; of the rest, only `providers` (130 keys) is genuinely translated in all 4 locales. **Every crisis surface (13 components) is hardcoded English** — there is no crisis namespace in any locale file.

- **P1 | G-1 (aggregate, 13 crisis components, zero useTranslation in all) | `src/components/layout/CrisisBanner.tsx:65-67,80,87` ("24/7 Crisis Support", "Call Now", dismiss aria-label); `src/components/pages/CrisisPage.tsx:248,302,350,452` (the entire /crisis page incl. "Tap to call now"); `src/components/screens/CrisisResourcesScreen.tsx:26,41,44`; `src/features/chat/components/CrisisOverlay.tsx:34,46,48`; `src/features/crisis/components/CrisisSupportModalContent.tsx:156,203,210,221,277`; `src/components/navigator/CrisisStickyBanner.tsx:43,35,57`; plus navigator/CrisisOverlay, CrisisResourceCard, layout/CrisisResources:46, article/CrisisResourceBanner:16, ClarityJournal CrisisCallout:10 + v2 CrisisOverlay, ClarityScore CrisisUrgentBanner:18-51, SleepArchitect CrisisAlert | PT/ES/SV/FR users in crisis see English-only safety copy on every crisis touchpoint, sitewide | Create one shared `crisis` namespace, wire all 13 components, commission 4 translations. (Resource names/descriptions in `src/lib/crisis/data/countries.ts` are EN data fields — P2 follow-on.)
- **P2 | G-2 | `src/locales/{pt,es,sv,fr}/translation.json` (`auth.*`) | All 141 auth keys are verbatim English; marker key `auth._meta._translation_status = "PENDING — …EN-only stub"` | The one namespace wired into live pages renders EN in all locales | Commission the pending translations (translator notes exist in docs/refactors/).
- **P2 | G-3 | same files (`navigator.*`) | 33 of 34 navigator keys untranslated (only `content_notice` is translated) | The wired symptom-selection surface renders EN | Translate.
- **P2 | G-4 | `src/config/navigation.ts:15-103+` (48 hardcoded labels) + `src/components/layout/Navigation.tsx:159-374` ("Crisis Support" button, search placeholder, all aria-labels) | Global chrome never localizes | Key references resolved with t() at render.
- **P2 | G-5 | `src/components/layout/Footer.tsx:174-178` | Footer fully hardcoded while a complete translated `footer.*` namespace (20/23 keys translated in all 4 locales) sits unused | Finished translations wasted — cheapest win in the lane | Swap literals for existing keys.
- **P2 | G-6 | `src/pages/auth/LoginPage.tsx:300,355,408,414,460,498`; `SignUpPage.tsx:167,169,220,409`; `ResetPasswordPage.tsx:119,121` | Pages import useTranslation but hardcode labels ("Email address", "Remember me", "Create your account"…) while exact-match keys exist | Split-brain: errors localize, labels don't | Replace literals with the existing keys.
- **P2 | G-7 | `src/components/screens/SymptomSelectionScreen.tsx:260` + all locale files | Legacy v3 `_plural` suffix is dead on i18next 25 (JSON v4 wants `_one`/`_other`); empirically verified `t(…, {count:5})` → "5 symptom selected" | Wrong grammar for every count ≥2 in every language | Rename to `_one`/`_other` (or `compatibilityJSON:'v3'`).
- **P2 | G-8 | `src/components/layout/MobileMenu.tsx:201` (within md:hidden wrapper, :67,76) | LanguageSwitcher renders **only** inside the mobile menu | Desktop users have no way to change language at all | Add switcher to desktop Navigation or Footer.
- **P2 | G-9 | `index.html:2` + no `languageChanged` handler | `<html lang="en">` is static, never updated | Wrong screen-reader voice + SEO lang signal for 4 locales | `i18n.on('languageChanged', l => document.documentElement.lang = l)` in `src/lib/i18n.ts`.
- **P3 | G-10 | ~172 of 346 EN keys are orphans (footer.* 23, language.* 5, auth.* ~113, navigator.* ~27, providers.sort.label, providers.card.loading, providers.a11y.results_announcement{,_zero}) | Half the translation file is dead weight; translators would translate strings no user sees | Wire components to existing keys before adding new ones.
- **P3 | G-11 | `src/i18n/config.ts` | Confirmed still dead (zero importers; real config is `src/lib/i18n.ts` per `src/index.tsx:4`) | Edits there silently do nothing | Delete.
- **P3 | G-12 | 13 `advisoryBoard.*` keys missing from all 4 locales (falls back to EN cleanly); all 5 locales statically imported into the main bundle (~106KB raw) | Minor | Add keys when translating; lazy-load only if files grow.
- **P3 | G-13 | 70 hardcoded-literal toast call-sites (e.g. `src/components/dashboard/QuickMoodCheckIn.tsx:54`) + tools/admin/dashboard/onboarding entirely un-wired (0 useTranslation across ~230 files) | Long-tail EN-only surfaces | Batch after the crisis/auth/nav waves. (`src/data/articles` EN-only is by design — noted once; the navigator's ContentLanguageNotice is the only surface that discloses it.)

**Verified clean:** `fallbackLng:'en'` + `supportedLngs` correct (missing keys render EN, never raw keys — verified empirically); zero referenced keys absent from EN; zero interpolation-variable mismatches across all 4 locales; zero empty-string values; language persistence works (`psychage_lang_v2`); the 3 dynamic-key call sites all resolve; `providers` namespace is the model end-to-end implementation.

---

## Known deferrals — confirmed, not filed

- **Email confirmation disabled in Supabase** — observed in auth flow handling (session-vs-confirm branching present and correct); not filed.
- **Article count backlog** (~304 vs 2,000) — not filed.
- **Resolved design items** (tap targets, off-grid spacing, radius, fine-print color) — no regressions found; the uncommitted working tree is net remediation of exactly these.
- **Tracked-open items** — F-007 still open (awaiting Slice 8; note P1/E-1 primary-button fill is in Slice 8's token territory too), P-1 partially fixed (EmptyState component exists, original surfaces unadopted), dark-mode visual pass still pending.

---

## Cross-cutting observations

1. **The geo-resolution library (`lib/crisis`) is built, correct, and unused by half the crisis surfaces.** P0-1, C-2, and B4-3 are all the same root cause: five+ surfaces hand-roll US-hardcoded or wrong-keyed crisis data instead of calling the engine that CrisisBanner/CrisisPage already use.
2. **Quality gates exist but aren't wired:** lint fails at 257 errors with no CI enforcement; `validate-language.ts` runs nowhere; PEAF readability is article-only; pre-commit checks only lockfile sync. SR-3 and the copy standards currently hold by discipline.
3. **Three "fixed but not actually" cases where a remediation migration/doc claims success the code doesn't deliver:** article RLS (P0-4 — policies written, RLS off), admin role CRUD (B4-1 — ADMIN_AUDIT_FINDINGS.md says it works; it's RLS-blocked), navigator Phase 4 (B2-1 — memory/docs claim 106/45/448 shipped; client bundles 103/40/595).
4. **Stale parallel implementations are a recurring hazard:** dead Clarity pages sharing localStorage keys with different formats (B1-13), the dormant Next.js prototype with swapped subscales (B1-5), the deleted navigator API still "covered" by 18 tests (B2-4), dead `src/i18n/config.ts` (G-11), three.js deps with no 3D code (E-8).

## Top 10 fixes, in order

1. **P0-1** CrisisOverlay region/fallback keys — two one-line key fixes prevent an empty hotline list for in-crisis UK/NZ/IE/ZA/PH/SG users. Highest harm, lowest cost.
2. **P0-4** Re-enable RLS on the 8 article tables — one migration activates already-written policies; closes anon access to the core product (verify live-DB state first).
3. **B1-1** `sms:741741?body=HOME` — one character, on a live crisis modal.
4. **P0-2** Stop persisting `raw_answers` + drop the admin SELECT on them + add delete-own policy — Sacred-Rule and GDPR exposure.
5. **P0-3** Clamp the ResultCard percentage display — one line plus a regression test; restores the 75% cap's purpose.
6. **C-2** Route the five US-hardcoded crisis surfaces through `lib/crisis` — the library already exists; mostly mechanical.
7. **C-3** Crisis link in the root ErrorFallback — a few lines of plain HTML; closes the only SR-2 gap in app chrome.
8. **A-1** Rebuild node_modules with pnpm + delete package-lock.json — restores the entire test/e2e gate; until then nothing is verifiable by tests.
9. **B3-1** Role allow-list on the chat endpoint — closes system-prompt injection on the mental-health chatbot.
10. **D-1 + D-2** `contact_submissions` and `provider_reviews` policy conditions — two one-line policy fixes closing real PII exposure.

(11th worth naming: **G-1** crisis i18n — larger effort, but PT/ES/SV/FR users currently navigate every crisis surface in English.)

## What I could not fully assess

- **E2E suite (Lane A/B):** Playwright fails at collection due to the duplicate-package environment — zero e2e tests ran. Re-run after the pnpm rebuild (fix #8).
- **Live database state (Lane D):** audit is migration-file-based. RLS enable/disable, grants, and the untracked migration's applied-status could differ in the live Supabase project if changed via dashboard. P0-4 specifically should be confirmed against production before/while fixing.
- **Runtime behavior (Lanes B/E):** features were traced statically (every network call, state machine, and math path read), not exercised in a browser; the broken unit-test environment also prevented confirming the ~1,700-test baseline. Dark-mode remains a manual visual pass (per its open tracker).
- **Article corpus copy (Lane F):** 633 "normal"-framing lines were classified by sampling (~10–15% clinically exempt); the per-line split needs the editorial pass itself.

## Lane A — exact commands & results (for reproduction)

```
pnpm exec tsc --noEmit                                 # PASS (exit 0)
pnpm run lint                                          # FAIL — 499 problems (257 errors, 242 warnings)
pnpm run test                                          # FAIL — 358 failed | 1349 passed | 4 skipped (1711)
pnpm run build                                         # PASS (37.05s; 20+ chunks > 600 kB warning)
pnpm exec playwright test --project=chromium           # FAIL — collection error, no tests ran
```

All 358 unit-test failures and the e2e collection failure share one environmental root cause: a Jun 6 `npm install` over the pnpm-managed `node_modules` (real-dir `react`/`react-dom`/`playwright`/`jsdom` shadowing pnpm symlinks; `package-lock.json` coexists with `pnpm-lock.yaml`).
