# Release Audit — psychage.com v2 web finalization

**Date:** 2026-06-26
**Release branch:** `release/v2-finalize` (cut from `origin/main` @ 30d9fb4)
**Production branch:** `main` (Vercel auto-deploys `main` → https://psychage.com)
**Status:** in progress — Phases 1–2 complete; Phases 3–5 (verify on preview, ship) pending.

---

## 1. Branch state & consolidation (Phase 1)

### Topology at start
- Local `main` was **stale**: 15 commits behind `origin/main`, **fully contained** (`git log origin/main..main` empty → pure fast-forward, no divergence).
- `origin/main` (30d9fb4) is the production branch and **already auto-deploys to psychage.com**. All approved work is already consolidated and live there.
- 3 uncommitted in-flight UI edits sat on top of the stale local checkout (the only un-shipped approved work).

### Nothing approved was dropped
All four remote feature branches are **already patch-merged** into `origin/main` — verified with `git cherry origin/main <branch>` (every commit shows `-` = applied):

| Branch | Unique commit | Merged via | `git cherry` |
|---|---|---|---|
| `origin/feat/category-poster-family` | bebd42f | PR #102 (03c0e17) | `-` applied |
| `origin/fix/article-accordion-husk-strip` | 1408454 | PR #103 (ff4ac10) | `-` applied |
| `origin/fix/stat-zero-husk-strip` | 2100583 | PR #104 (30d9fb4) | `-` applied |
| `fix/seed-slugs-filter` | 86d2dc2 | PR #101 (1b070ac) | `-` applied |

They are stale post-squash tips; no unmerged approved content exists on any branch.

### What merged into the release branch
1. Fast-forwarded the consolidated `origin/main` into `release/v2-finalize`.
2. Re-applied + committed the 3 in-flight UI fixes (commit `6a81f80`):
   - `FeaturedHeroCard.tsx` — hero poster uses its natural aspect ratio (`block w-full h-auto`, no `object-cover` crop/letterbox); icon fallback keeps `aspect-video`.
   - `EnhancedProgressBar.tsx` — Navigator progress bar pinned below the site header (`top-14 sm:top-20`, `z-40`) instead of overlapping at `top-0`/`z-50`.
   - `NavigatorFlow.tsx` — top padding aligned to the repositioned bar (`pt-24`).

### Conflicts
- One merge blocker: `origin/main` **tracks** `scripts/poster-batch-960/` (added in PR #81), but the local checkout had it as untracked leftovers, causing the ff-merge to abort. Resolved by moving the local untracked copy aside to `/tmp/psychage-local-bak/` (preserved) and resetting the release branch to `origin/main`, which restored the authoritative tracked copy. Local-only diffs were generation artifacts (`.tmp/`, `authoring/_input/`, `gen-category-covers.ts`) — dev tooling only, no app code or clinical content.

### Existed on a branch but never merged
- None. The only un-shipped approved work was the 3 uncommitted UI edits (now committed). The local untracked poster tooling is superseded by `origin/main`'s tracked copy.

### Untracked working-tree artifacts (not part of the release)
- `AUDIT.md`, `docs/ADMIN_AUDIT.md`, `docs/build-verification.md` — pre-existing local audit notes; `AUDIT.md` (2026-06-20) is **stale** (see §3).
- `scripts/publish-ex-published-archived.ts`, `scripts/publish-womens-mental-health.ts` — one-off data scripts; not needed (see §2).
- `scripts/poster-batch-960/` — already tracked on `origin/main`; local untracked copy moved aside.

---

## 2. Content state (Phase 2) — already published; no DB writes performed

User authorized running both content-publish scripts. Investigation of the **current shared production DB** (read-only, service role) showed the work is **already done** — the scripts are moot:

| Article status | Count |
|---|---|
| published | **1,993** |
| draft | **0** |
| archived | **8** |
| **total** | **2,006** |

- The audit's 643 drafts / 155 archived are gone. A republish already ran on 2026-06-20 (`archive-manifests/republished-2026-06-20T16-36-07-663Z.json`, count 115, reason: "User: publish only the ex-published archived articles"). So `publish-ex-published-archived.ts`'s work is complete (and it currently crashes on its archive manifest anyway).
- **women's-mental-health is already fully live**: 66 published, 0 draft, 0 archived → `publish-womens-mental-health.ts` has **0 targets**.
- The only **8 remaining archived rows are empty husks** (`content` length 0, `category` null): `part-1-`, `understanding-anxiety`, `breathing-techniques`, `science-panic-attacks`, `sleep-mental-health`, `nutrition-brain`, `mindfulness-101`, `managing-burnout`. These are legacy seed stubs and must stay archived — publishing them would surface 8 blank articles. Both scripts' safety filters skip empty content, so even executing them would not publish these.

**Decision:** no DB writes performed. The user's intent (surface approved clinical content) is already satisfied in the live data. This also honors the ground rule against surfacing blank/un-cited clinical content. No clinical text or data was modified, reworded, or invented.

---

## 3. In-scope surface completeness (Phase 2 verification)

`AUDIT.md` (2026-06-20) is **stale** — most of its P0–P4 items were fixed in the 15 commits between the audit and this release (search #94, routing #96, taxonomy/orphan-homing, conditions merge, SSR husk fixes #99/#103/#104, posters #81/#102). Three parallel code audits against `origin/main` confirmed every in-scope surface is **built, wired, and complete**:

| Surface | Verdict | Notes |
|---|---|---|
| Learn / Browse (`/learn`, `/learn/topics`) | COMPLETE | desktop + mobile; empty/0-article categories filtered from nav |
| Category pages (`/learn/:categorySlug`) | COMPLETE | canonical taxonomy single-source; legacy slugs redirect via `resolveCanonicalSlug` |
| Article reader (`/learn/:categorySlug/:articleSlug`) | COMPLETE | resolves by article slug; decorative category prefix; 404 on miss |
| Condition family (`/conditions`, `/:slug`, `/:slug/articles`) | COMPLETE | public via `conditions_reference_public` view + 113-condition fallback (no longer empty/gated) |
| Tools (`/tools` + all sub-routes incl. 13 clarity-journal pages) | COMPLETE | no stubs / "coming soon" |
| Guided "not sure where to start" (`/tools/symptom-navigator`) | COMPLETE | 6-step flow + crisis branch; bar offset fixed this release |
| Find Care (`/providers`, `/search`, `/:id`) | COMPLETE | wired to provider data + filters |
| Crisis (`/crisis`, navigator crisis) | COMPLETE | + persistent header Crisis button (global) |
| AI assistant (`/tools/mindmate` + global widget) | COMPLETE | widget mounted globally; `/api/ai/chat` |
| Search (`/search` + Cmd/K overlay) | COMPLETE | Fuse.js weighted relevance + visible submit affordance (both old bugs fixed) |
| Header / mega-menu | COMPLETE | links built from taxonomy; no dead links |
| Footer | COMPLETE | all links resolve |
| 404 (`*` → NotFoundPage) | COMPLETE | styled, real back-links |
| SEO / meta | COMPLETE | per-route Helmet + JSON-LD; OG/Twitter/canonical/manifest/favicon present |
| Bundle | OK | routes lazy-loaded (`lazyWithRetry`); article TSX corpus lazy-loaded, not in main bundle |

### Data integrity
- Single source of truth: `src/config/taxonomy.ts` (canonical slugs + `LEGACY_SLUG_ALIASES` + `resolveCanonicalSlug`).
- Nav links generated from taxonomy → no dead category links. Empty categories filtered at the service layer (`categoryService.getGrouped` drops `articleCount===0`).
- Orphan articles homed via aliases (e.g. `neurodevelopmental`→`neurodivergence-adhd-autism`, `children-adolescents`→`family-parenting`). Residual risk only if a DB row carries a slug that is neither canonical nor aliased.

### Items left as-is (deferred / low-risk, with rationale)
- **Legacy `/category/:category` route** — NOT a dead-end: it's wired into the live mega-menu (`Navigation.tsx` `NavMenu onCategorySelect`) and `CategoryPage` renders real articles. Architecturally redundant with `/learn/:slug` but functional; changing routing wired into live nav was deemed a regression risk for a finalize pass. Verified on preview instead (see §4). Deferred.
- **Static sitemap** — `public/sitemap.xml` lists 26 static routes; dynamic article/condition/provider URLs are not enumerated. `scripts/generate-sitemaps.ts` produces a *different*, gitignored split-sitemap set not wired into the build, so wiring it in would mean changing the build pipeline. Static sitemap + per-route JSON-LD is acceptable for an SPA. Deferred as an optional SEO enhancement.
- **5 categories without posters** (brain-neuroscience, sexuality-intimacy, disability-accessibility, forensic-legal-justice, military-veterans) — these are the still-empty 0-article categories already filtered from nav, so they never render a public card. No action; verified live.

---

## 4. Verification on preview (Phase 4) — PENDING

_(to be filled in: build/lint/typecheck results, preview URL, per-path walk results)_

## 5. Ship to production (Phase 5) — PENDING

_(to be filled in: merge, prod deploy, prod path re-walk, residual risks)_
