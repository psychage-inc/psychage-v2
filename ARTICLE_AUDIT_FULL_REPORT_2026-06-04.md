# Article Corpus Audit — Full Report (2026-06-04)

End-to-end audit of every article (presence, render, structural + compliance validity).
Phase 1 read-only; Phase 2 mechanical auto-fix; content/clinical defects flagged, never rewritten.

- **Supabase env audited:** `ozourhqyqtpppvpbhphw.supabase.co` (service-role, read-only)
- **Method:** throwaway Vitest harness (`loadAllArticles()` for the real TSX bodies ⋈ Supabase `articles` rows, joined by slug). Validators reused verbatim: `runQualityGate`, `analyzeReadability`, `SENSITIVITY_TERMS`, `BLOCKED_SOURCE_DOMAINS`, `QUALITY_GATE`, `SOURCE_TYPE_TO_TIER`.
- **Machine-readable outputs:** `article-audit-full.json` (per-article, all checks), `article-audit-full.csv` (per-article pass/fail A–F).

---

## 1. Totals (before → after)

| Metric | Count |
|---|---|
| TSX articles (rendered corpus) | **1,981** |
| Supabase `articles` rows | 2,006 |
| DB published | 1,203 |
| DB published **with** content | 1,203 |
| DB archived (empty placeholders) | 798 |
| **Rendered union (audited set)** | **1,981** |
| DB-only rows (no TSX body) | 511 (archived/legacy stubs) |
| Articles rendering (render-smoke sample) | **93/93 across 31 categories — 0 throwing, 0 empty** |
| Categories rendering | 31/31 (all TSX category slugs resolve to a known taxonomy key) |

**Before vs after is identical for the structural corpus** — the only Phase-2 change is a code-level fallback reorder in the DB mapper (does not alter the article set). Render proven post-fix (`tsc` clean + render smoke green).

---

## 2. Check results A–F (per-article detail in CSV/JSON)

### A. Render / "shows up correctly" — ✅ CLEAN
| Check | Result |
|---|---|
| Body present & non-empty | **0 empty** (all 1,981 have JSX body) |
| Category resolves to known taxonomy key | **0 unresolved** |
| Block type outside the 13 PEAF blocks | **0** (static import scan + in-tree component scan) |
| Appears in listing set (`getAll` merge) | **0 missing** |
| Renders without throwing (sample 93/31 cats) | **0 throwing, 0 thin/empty** |

### B. Data integrity — ✅ structural fields clean; ⚠️ enrichment gaps (flagged)
| Field | Missing/invalid |
|---|---|
| id / title / slug | 0 |
| slug URL-safe (`^[a-z0-9][a-z0-9-]*$`) | 0 |
| slug unique | 10 collisions — **by-design cross-listing** (see §5) |
| seo_description / description | 0 (rendered); 1 published DB row has empty `seo_description` (§4) |
| author | 0 |
| **summary** | **415 missing** |
| **keyFacts = exactly 5** | **620 ≠ 5** (464 have **zero**, 77 have 3, 79 have 4) |
| **sparkMoment** | **575 missing** |
| **practicalExercise** | **406 missing** |
| Fully enriched (all 4 + 5 keyFacts) | **1,219 / 1,981 (62%)** |

### C. PEAF / compliance (flag-only)
Per decision: format-agnostic checks run on TSX-extracted text + inline citations; `required_sections` / `disclaimer` are **N/A for JSX** (no markdown headers) and excluded from fail counts.

| Check | Result |
|---|---|
| Word count <1,500 | **1,099** ( <500: 254 · 500–999: 397 · 1000–1499: 448 · 1500–1999: 655 · 2000+: 227 ) |
| Citation count = 0 | 3 |
| Source-tier non-compliant | **113** (predominantly Tier-5 > 20% — textbook/reference overuse; e.g. `what-are-emotions-beginners-guide` 30% T5) |
| Citation recency <70% within 10yr | **736 warnings** |
| **Blocked-source citation domains** | **2** (both cite `psychologytoday.com`) — see §6 |
| Readability FK > 8 | 1,975 — **LOW CONFIDENCE**, see caveat below |
| **Sensitivity / diagnostic-language hits** | **120 articles** — see §6 |

> **Readability caveat:** FK grade is computed on text extracted from JSX (sentence boundaries between block elements are imperfect, inflating words/sentence), and the ≤8 target is aggressive for clinical prose. Treat the 1,975 figure as indicative only — not an authoritative fail list. Re-run PEAF readability on clean rendered prose before acting.

### D. Link / reference integrity — ✅ CLEAN
- Internal `/learn/...` links resolving to missing articles: **0**
- `practicalExercise.toolLink` malformed: **0**
- Malformed citation URLs (unparseable `link`): **0**
- One **compound/malformed citation** found by inspection: cat-24 `02-creative-modalities` citation #183 packs ~10 references into one `text` blob with an empty `link` (embedded youtube URL) — flagged for review (§6).

### E. Asset integrity — soft (expected)
- Local image file present: **0/1,981** — **expected.** Article `image` paths (`/images/articles/catNN/cover-NNN.svg`) are rewritten at runtime by `resolveImageUrl()` to Supabase Storage URLs (`covers/CATNN-NNN.jpeg`); they are intentionally not in `public/`. Marked "may be expected" (clay-figure commission deferred). Not a hard failure. Live-URL crawling was not performed (per scope).

### F. Translation coverage — coverage gap (not error)
- **All 1,981 articles are English-only.** `loadAllArticles()` loads only `category-*/index.ts` + `eating-body` (all EN). PT/ES/SV/FR article bodies do not exist; the 5-language i18n covers UI strings, not article prose.
- **Finding:** `src/data/articles/en.tsx` and `es.tsx` are **orphans** — not imported by `loadAllArticles()`, so their content (a handful of legacy demo articles, e.g. `understanding-anxiety-guide`) never renders. Dead data.

---

## 3. Defect summary by type & severity

| Severity | Defect | Count | Disposition |
|---|---|---|---|
| 🔴 High | Sensitivity / diagnostic-language hits | 120 | **Flag** (human triage — substring matches incl. false positives) |
| 🔴 High | Blocked-source citations (psychologytoday.com) | 2 | **Flag** |
| 🟠 Med | keyFacts ≠ 5 (464 have zero) | 620 | **Flag** (enrichment = content) |
| 🟠 Med | Missing sparkMoment | 575 | **Flag** |
| 🟠 Med | Missing summary | 415 | **Flag** |
| 🟠 Med | Missing practicalExercise | 406 | **Flag** |
| 🟠 Med | Word count <1,500 | 1,099 | **Flag** |
| 🟠 Med | Source-tier non-compliant | 113 | **Flag** |
| 🟡 Low | Citation recency warnings | 736 | **Flag** |
| 🟡 Low | Articles with 0 citations | 3 | **Flag** |
| 🟡 Low | Published DB row w/ empty `seo_description` | 1 | **Flag** |
| 🟡 Low | DB rows w/ null `category_id` | 8 (all archived) | **Flag** (ambiguous) |
| ⚪ Info | Duplicate slugs (eating-disorder cross-list) | 10 | **By-design** |
| ⚪ Info | Local images absent (served from Storage) | 1,981 | **Expected** |
| ⚪ Info | English-only corpus / orphan locale files | all | **Coverage gap** |

---

## 4. Auto-fixes applied

### 4.1 Code — `src/services/articleService.ts` (mapper made `seo_description`-canonical)
Data-confirmed safe: the legacy `description` column is **near-dead** — populated on only **7/2,006** rows, **none** of which also have `seo_description`, and **zero** rows where the two differ. `seo_description` is the real field (1,997/2,006). Reordered the two DB-read fallbacks so the canonical field wins, with `description` kept only as a last-resort fallback (no row loses data):

```diff
- description: data.description || data.seo_description || '',
+ description: data.seo_description || data.description || '',
- content: data.content || data.description,
+ content: data.content || data.seo_description || data.description,
```
(The list query `getAll` already selected only `seo_description`.) Verified: `tsc --noEmit` clean.
> Note: `articleService.ts` also carries pre-existing uncommitted branch work (pagination/dedupe in `getAll`) — those lines are **not** part of this audit's change; only the two `description` lines above are.

### 4.2 Database — **no migration written** (nothing qualified as mechanical fill-null)
Dry-run counts (read-only, against `ozourhqyqtpppvpbhphw`):

| Candidate | Count | Why no auto-fix |
|---|---|---|
| Null/empty `slug` | **0** | nothing to backfill |
| Null `category_id` | 8 | all **archived** legacy stubs; no unambiguous category → **flag** (don't guess) |
| Unresolved `category_id` (non-null) | 0 | all resolve |
| Null `seo_description` | 9 (1 published) | editorial text → **flag** (don't fabricate) |

No category-value normalization was needed (every non-null `category_id` already resolves; every TSX `category.slug` is a known taxonomy key). No internal-link repair was needed (0 broken).

---

## 5. Flagged for review — grouped (NEVER auto-fixed)

### Compliance (PEAF)
- **2 blocked-source citations** → switch to a primary source:
  - `the-12-stages-of-burnout-…` — `category-02/05a-burnout-emotional-exhaustion.tsx:785` → `psychologytoday.com/us/basics/burnout`
  - `holiday-depression-…` — `category-07/05b-seasonal-patterns-mood-cycles.tsx:54` → `psychologytoday.com/holiday-stress-survey`
- **113 source-tier failures** (mostly Tier-5 > 20%), **736 recency warnings**, **3 zero-citation** articles, **1,099 under 1,500 words**. Full lists in CSV.
- **Secondary, non-citation blocked-domain references** (informational): `category-14/03a` body prose shows `psychologytoday.com/us/therapists`; `category-24/02` citation #183 is a malformed compound blob (10 refs concatenated, empty `link`, embedded `youtube.com`).

### Sensitivity / diagnostic language (120 articles) — **triage required**
Validator uses substring matching, so this list mixes true hits with false positives. Top terms flagged: `a psychotic` ×25, `the disabled` ×18, `a depressive` ×14, `victim of` ×12, `attention-seeking` ×12, `alcoholic` ×10, `suffers/suffering from` ×12, `is bipolar` ×6, `just a phase` ×4, `the mentally ill` ×3, `a schizophrenic` ×3, `committed suicide` ×2, `failed suicide` ×1.
- **Likely true positives** to fix: `committed suicide`, `failed suicide`, `a schizophrenic`, `the mentally ill`, `drug addict`, `attention-seeking`, `just a phase`, `suffers from`, `is bipolar`.
- **Likely false positives** (substring): `alcoholic` (matches "non-alcoholic"), `a depressive` (matches "a depressive episode"), `a psychotic` (matches "a psychotic episode/disorder"). Verify in context before editing.
- Per-article slug + matched terms in `article-audit-full.json` (`.sensitivityHits`).

### Enrichment (content — do not fabricate)
464 articles with **zero keyFacts**; 415 missing summary; 575 missing sparkMoment; 406 missing practicalExercise. These overlap heavily with the <1,500-word set and are best addressed by the existing `/rewrite` pipeline, not the audit.

### Navigation / category surfacing (editorial — flag-only per decision)
23 categories have rendered articles but are **not surfaced** in the LearnPage priority tabs or the nav mega-menu. Root cause: the mega-menu links use **alias slugs** (`depression-mood`, `trauma-ptsd`, `sleep-circadian`, …) that do **not** match the real content-architecture category slugs (`depression-grief`, `trauma-healing`, `sleep-body-connection`, …). Largest unsurfaced: `life-skills-practical-psychology` (110), `family-parenting` (75), `depression-grief` (70), `spirituality-meaning` (69), `brain-neuroscience` (66). Articles remain reachable via direct URL (`/learn/:slug`), but the curated nav points at slugs with no rows. Recommend reconciling `src/config/navigation.ts` + `LearnPage` priority list against the taxonomy.

### Empty-body articles
**0** in the rendered corpus. The 798 archived DB rows (empty placeholders) were already correctly excluded by `getAll` and archived by migration `20260604000001`.

---

## 6. Verification

| Step | Result |
|---|---|
| `npx tsc --noEmit` (real code; scripts/tests excluded) | ✅ clean |
| Render smoke — `renderToStaticMarkup` of sampled bodies under MemoryRouter | ✅ **93 articles / 31 categories, 0 throwing, 0 thin/empty** |
| Slug uniqueness | ✅ only the 10 by-design eating-disorder cross-lists collide; runtime dedupes by slug |
| Every category with rows resolves to a known taxonomy key | ✅ 0 unresolved |
| Test suite cleanliness | ✅ throwaway harness deleted — no audit tests left in the `src/**/*.test.ts` glob (would otherwise hit live DB in CI/pre-commit) |

(Full `vite build` / Playwright e2e not run here; `tsc` compiles all 1,981 articles + every block's props, and the render smoke exercises the actual block render path. For full browser verification use the repo's existing `npm run test:e2e`.)

---

## 7. Decisions made (beyond/clarifying the spec)

1. **Audit harness = Vitest, not `tsx`.** `loadAllArticles()` relies on Vite-only `import.meta.glob`; Vitest provides the Vite transform, `@/` alias, jsdom, and safe block-component import.
2. **`seo_description` kept canonical with `description` as fallback** (not a hard swap). A hard swap would blank the 7 legacy `description`-only rows. Data probe proved zero divergence, so canonical-first + fallback is lossless and satisfies "use `seo_description`."
3. **No DB migration produced.** Every write candidate was either empty (slugs) or non-mechanical (ambiguous category, editorial seo_description). Reported dry-run counts instead. Nothing was executed against Supabase.
4. **Readability reported as low-confidence** due to JSX text-extraction limits + an aggressive ≤8 target; not presented as an authoritative fail list.
5. **Sensitivity hits reported raw** (the existing validator's substring rule) with a true/false-positive triage note — detection only, no edits.
6. **Image + translation findings = soft.** Local image absence is the expected Storage-served pattern; English-only is a coverage gap, not an error.
7. **Throwaway scripts deleted** after harvesting outputs (they matched the vitest suite glob and would have hit the live DB during `npm test`/pre-commit). Deliverable reports (`article-audit-full.json/.csv`) retained.

### Out of scope (untouched)
Sanity (no `@sanity/*`), provider directory, Symptom Navigator, auth, crisis flow, renderer/PEAF-block redesign, all article prose/citations/enrichment.
