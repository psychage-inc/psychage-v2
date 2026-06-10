# Psychage v2 — Design-Conformance Audit (Phase 1)

**Date:** 2026-06-05 · **Branch:** `fix/auth-signup-truthfulness` · **Instrument:** Playwright (headless Chromium) + live Playwright MCP for visual verification · **Target:** local dev `http://localhost:5173`
**Scope:** read-only. The only writes from this phase are this file + `audit-artifacts/` (capture scripts, raw JSON, screenshots). No source file was modified — see [§7 Read-only proof](#7-read-only-proof).

This is a **conformance-and-polish** audit, not a redesign. Every surface is scored against the committed token source — **[src/styles/tokens.css](src/styles/tokens.css)**, **[tailwind.config.js](tailwind.config.js)**, **[src/styles/globals.css](src/styles/globals.css)** — never against memory or the stale May-2026 audit docs. Typography is scored against **Satoshi + IBM Plex Mono** (the committed reality; *Fraunces is not in the repo* — see note below). No copy, no crisis-gating, no logic touched.

> **Stop and read before triaging.** The automated capture produced ~15,000 raw "flags". Most are **capture artifacts**, not defects — icons measured separately from their ≥44px parent button, and text over gradients/images/colored chips where the tool can't see the real backdrop. I adversarially filtered and **visually verified** the survivors. Only the **Confirmed Findings (§4)** are asserted. The leads I *refuted or downgraded* are in **§5** for transparency. Trust §4; treat §5 as "checked, not a defect (or needs manual dark-mode pass)".

---

## 1. Run metadata
- **Routes captured:** 45 (44 static public + 1 resolved article detail). Param routes (article, category) resolved at runtime; provider-profile could not be reached locally (no seeded DB — see §3).
- **Matrix:** each route × {mobile 375×812, desktop 1440×900} × {light, dark} = **180 combos**. 0 combos threw a page render error; the only console errors were backend/CSP (local-env, see §3).
- **Capture method:** `getComputedStyle` per visible element across 6 categories (text, cta, card, input, link, icon); WCAG relative-luminance contrast vs effective background; `getBoundingClientRect` for true tap-target size. Scripts: `audit-artifacts/capture.mjs`, `score.mjs`, `analyze.mjs`. Raw per-combo data: `audit-artifacts/raw/*.json`. Light full-page screenshots (90): `audit-artifacts/shots/`.

> **Typography reality note (was a planning decision):** the original brief named "Fraunces + Satoshi." **Fraunces has zero matches in the repo.** The committed type system is **Satoshi** (`--font-sans`/`--font-display`, variable 300–900) + **IBM Plex Mono**. Audit scored against Satoshi. The single serif heading found (F-005) is therefore a deviation, not Fraunces. Whether to *introduce* Fraunces is a separate design decision, out of this conformance pass.

---

## 2. Summary by severity

| Severity | Count | Meaning | Items |
|---|---|---|---|
| **P0** (confirmed, un-owned a11y/non-negotiable blocker) | **0** | The dark-mode "invisible text" P0 candidates were **refuted** on visual check (§5, S-1). | — |
| **P1** (clear deviation on primary surface) | **2** + 1 deferred | Site-wide tap-target shortfall; teal body-contrast (deferred to Slice 8) | F-001, F-002 · *(F-007 defer)* |
| **P2** (secondary deviation / glance-visible sloppiness) | **4** | Button spacing off-scale, card radius off-ramp, crisis serif H1, off-palette fine print | F-003, F-004, F-005, F-006 |
| **P3** (minor / decorative) | **0 asserted** | Border-color dividers + giant "psychage" watermark are intentional low-contrast — noted, not flagged (§5) | — |
| **PROPOSAL** (under-defined flow) | **1** | Empty-state composition not specified by the system | P-1 |

**Net:** a tight, reviewable set — **6 confirmed findings** + 1 deferred + 1 proposal. No sprawling 60-file diff. The site is *largely conformant*: radius, font-family, durations, and most colors pass; the real signal is concentrated in tap targets and a few one-offs.

---

## 3. Coverage

| Surface group | Status | Note |
|---|---|---|
| Static public routes (44) | ✅ COVERED | mobile+desktop, light+dark |
| Article detail `/learn/:cat/:slug` | ✅ COVERED | resolved 1 representative article (cards reached via onClick, no href) |
| Homepage `/`, `/for-providers` mid-page | ⚠️ PARTIAL | lazy / 3D / IntersectionObserver sections did **not** mount in headless capture (large empty bands in shots). Top + bottom audited; mid-page needs a headed re-pass |
| `/providers/search`, `/providers/:id` | ⚠️ BLOCKED (data) | local has no seeded Supabase → search RPC returns **500**, no provider cards → **provider-profile not audited**. Needs seeded DB or staging |
| `/search?q=` results | ⚠️ BLOCKED (env) | CSP blocks `localhost:3000/api/tools` (no `vercel dev` locally) → results not audited |
| `/dashboard/*`, `/portal/*`, `/admin/*` | ⛔ BLOCKED (auth) | per plan decision — public-only this pass; `ProtectedRoute` redirects to `/login`. Logged, not bypassed |
| Dark mode | ◑ DATA-ONLY | computed styles captured for all routes in dark; only **light** full-page screenshots saved. Dark visual triage pending for §5 S-1 |

---

## 4. Confirmed findings

### F-001 · Interactive controls render 36–42px tall (below 44px min)
- **Type:** DEVIATION (WCAG 2.5.8) · **Severity:** P1 · **Cluster:** Button / CTA · **Viewports:** both · **Themes:** both
- **Routes:** site-wide (45/45)
- **Computed:** primary button `px-5 py-2.5 rounded-xl bg-primary` → **40px** tall; secondary `px-5 py-2.5 border` → **42px**; nav pill `px-4 py-2 rounded-full font-bold` → **36px**; circular icon button `w-10 h-10` → **40px**; `h-10 rounded-full` → **38px**.
- **Target:** min dimension **≥ 44px** (`globals.css` `.min-h-touch` = 2.75rem already exists — these call-sites just don't use it). The `Button.tsx` primitive enforces `min-h-[44px]`; the offenders are **ad-hoc header/nav/CTA buttons** that bypass the primitive.
- **Evidence:** `audit-artifacts/confirmed.json#tap`; shots `root__desktop.png`, `about__desktop.png`. **Triage:** `[ ] approve  [ ] reject  [ ] defer` → **Slice A**

### F-002 · Icon-only buttons 24–40px (dismiss / circular controls)
- **Type:** DEVIATION (WCAG 2.5.8) · **Severity:** P1 · **Cluster:** Icons / tap-targets · **Viewports:** both · **Themes:** both
- **Computed:** close/dismiss `absolute top-3 right-3 p-1 rounded-full` → **24px** (45 routes); icon button `p-1.5 rounded-full` → **28px** (2 routes, high frequency); `w-10 h-10` circular → **40px**.
- **Target:** wrap icon in a ≥44px hit-area (icon glyph can stay 16–24px). Checkbox `w-4 h-4` (16px) needs a label-extended hit area.
- **Evidence:** `confirmed.json#tap`. **Triage:** `[ ] approve  [ ] reject  [ ] defer` → **Slice A**

### F-003 · Core button padding/gap off the token spacing scale
- **Type:** DEVIATION / SLOPPINESS · **Severity:** P2 · **Cluster:** Button / CTA · **Routes:** site-wide (45/45)
- **Computed:** primary/secondary buttons `px-5 py-2.5` = **20px / 10px**; `px-4 py-2.5` = 16/**10**; `gap-1.5` = **6px**. None of {10, 20, 6} are on the token scale **{4,8,12,16,24,32,48,64}** (the 16→24 gap is intentional).
- **Target:** snap to scale (e.g. `px-4 py-2` = 16/8, or `px-6 py-3` = 24/12; `gap-2` = 8). Token values only — no new tokens.
- **Evidence:** `confirmed.json#spacing`. **Triage:** `[ ] approve  [ ] reject  [ ] defer` → **Slice B**

### F-004 · Card radius `rounded-3xl` (24px) off the radius ramp
- **Type:** DEVIATION · **Severity:** P2 · **Cluster:** Card · **Routes:** `/`, `/learn/:cat/:slug` (feature/article cards)
- **Computed:** `rounded-3xl` → **24px**. Radius ramp is **{4,8,12,16,9999}** (`--radius-sm/md/lg/xl/full`); 24 is not a token.
- **Target:** `rounded-xl` (16px = `--radius-xl`) or `rounded-full`. (Radius is otherwise highly conformant — this is the only off-ramp value found.)
- **Evidence:** `confirmed.json#radius`; shot `root__desktop.png`. **Triage:** `[ ] approve  [ ] reject  [ ] defer` → **Slice C**

### F-005 · Crisis page H1 uses a serif font (off the Satoshi-only system)
- **Type:** DEVIATION · **Severity:** P2 · **Cluster:** Typography · **Route:** `/tools/symptom-navigator/crisis`
- **Computed:** H1 "Crisis & Emergency Support" → `font-serif` → **`ui-serif, Georgia, "Times New Roman", serif`**. Every sibling heading correctly uses **Satoshi**. This is the only serif heading on the site; the system defines no serif token.
- **Target:** `font-display` (Satoshi). **Visual-only** — H1 text/copy unchanged, crisis surface stays ungated.
- **Evidence:** verified live via MCP (`getComputedStyle().fontFamily`); shot `crisis__desktop.png`. **Triage:** `[ ] approve  [ ] reject  [ ] defer` → **Slice D**

### F-006 · Fine print uses off-palette `text-slate-400` at ~2.3–2.45:1 (light)
- **Type:** DEVIATION (palette + AA) · **Severity:** P2 · **Cluster:** Body-text / color-token · **Themes:** light
- **Computed:** `text-slate-400` = `rgb(148,163,184)` on light surfaces → **2.34–2.45:1** (need 4.5). Used for disclaimers / empty-state copy ("educational website…", "No entries yet…", footer counters). `slate` is **not** in the token palette (system uses `charcoal`/`stone`/`text-tertiary`).
- **Target:** `text-text-tertiary` (`#6D6762`, tuned to AA 5.2:1) or `text-charcoal-500`. Fixes both the off-palette token **and** the contrast in one swap. Not teal → **not** owned by Slice 8.
- **Evidence:** `confirmed.json#contrastConfirmed` (opaque-on-opaque, tool-reliable). **Triage:** `[ ] approve  [ ] reject  [ ] defer` → **Slice E**

### F-007 · teal-600 body links fail AA on light *(DEFER — owned by Slice 8)*
- **Type:** DEVIATION (AA) · **Severity:** P1 · **Cluster:** Body-text contrast · **Owner:** **in-flight Slice 8 — DEFER, do not fix here**
- **Computed:** `text-primary`/`text-teal-600` (`#1A9B8C`) body links → **3.15–3.44:1**: "Contact us" (9 routes), "info@psychage.com", "Create listing", category badges.
- **Target (Slice 8):** `text-brand-accessible` (`#158A7D`, ≥4.6:1) + `dark:text-teal-400`.
- **Evidence:** `confirmed.json#contrastConfirmed` (teal-600 filter). **Triage:** `[x] defer (Slice 8)`

### F-008 · teal-400 large heading/accent on light ~1.74:1 *(SUSPECTED → DEFER Slice 8)*
- **Type:** DEVIATION (AA, large) · **Severity:** P2 · **Cluster:** teal contrast · **Owner:** likely **Slice 8 — DEFER**
- **Computed:** `text-teal-400` (`#2DD4BF`) 48px heading on `#F9F7F3` → **1.74:1** (need 3.0). `/for-providers` CTA band. *Suspected:* may sit over a gradient the tool can't read — confirm visually before fixing.
- **Triage:** `[ ] approve  [ ] reject  [x] defer (Slice 8 + visual confirm)`

---

## 5. Refuted / downgraded leads (transparency — checked, NOT asserted)

The automated pass flagged these; verification removed or downgraded them. Listed so the triage isn't misled by raw counts.

- **S-1 · Dark-mode "invisible" dark text (gray-900 #111827 on dark, 20+ routes) — REFUTED (sample) / NEEDS MANUAL DARK PASS.** Visual check of `/how-we-verify` in real dark mode renders **correctly** (see `verify-howweverify-dark.jpeg`). The leads trace to **dark text on light status chips** (Unclaimed / Claimed / Verified / Featured badges) where the tool's background-walk missed the chip's local light bg and reported the dark page bg. A *few* (journal card text, section eyebrow labels) may be genuine — **flagged for a manual dark-mode visual pass**, not asserted as defects.
- **S-2 · White text on crisis cards (Trevor Project, helpline numbers) ~1.0:1 — REFUTED.** Visually correct: white on red/teal solid/gradient cards (`crisis__desktop.png`). The "suspected" contrast bucket (62 groups / 593 instances) is dominated by these — correctly excluded.
- **S-3 · White-on-light heroes ("Grow Your Practice", "Create a Safety Plan") — SUSPECTED.** Text sits over gradient/image backdrops the luminance tool can't read; likely fine. Confirm in a headed dark/light pass before any action.
- **Decorative low-contrast — INTENTIONAL, not defects:** the giant `psychage` watermark (`text-border`, 216px) and `|` divider pipes (`text-border`). Left as-is.
- **Raw tap-target count (11,691) — mostly artifact.** Filtered to genuine `cta`/`input` controls (F-001/F-002); standalone icons and inline text links (WCAG inline exception) were excluded.

---

## 6. Under-defined flow — PROPOSAL (no build)

### P-1 · Empty-state composition is not specified by the design system
- **Where:** `/tools/clarity-journal/history`, `/insights` ("No entries yet…"), and provider-search empty results. The system tokenizes color/space but defines no empty-state pattern; current states use off-palette `slate-400` (F-006) and sparse layout.
- **Mobbin reference pattern** (centered icon/illustration + heading + one-line subtext + single primary action): [Amplitude](https://mobbin.com/screens/42def5a9-49be-470e-8a05-1dba5f8d1ffe) · [HubSpot](https://mobbin.com/screens/32daa003-a324-469d-bc44-b371cce765fd) · [Current](https://mobbin.com/screens/dfa4fdfa-abf4-4dc0-9f60-f9aa4e3c628a) · [Podia](https://mobbin.com/screens/f6e387ee-1e3b-4c00-994e-42b021ac46c2).
- **Proposal:** define one reusable empty-state block (existing tokens only) and apply it. **This is a design decision for you — not a polish slice, not auto-built.**

---

## 7. Read-only proof

Baseline working tree (pre-audit) = 4 known items: `M src/services/articleService.ts`, `M supabase/.temp/cli-latest`, `?? ARTICLE_AUDIT_FULL_REPORT_2026-06-04.md`, `?? supabase/migrations/20260604000001_archive_empty_articles.sql`.
After Phase 1, the only additions are `DESIGN_AUDIT.md`, `audit-artifacts/`, and the MCP-verification screenshots. Verify with:
```
git diff --quiet -- src/styles tailwind.config.js && echo TOKENS_UNTOUCHED
git diff -- src/App.tsx           # empty → MotionConfig reduced-motion line intact
git status --porcelain            # baseline 4 + DESIGN_AUDIT.md + audit-artifacts/ only
```
(Note: `pnpm-lock.yaml`/`package.json` are unchanged — the iCloud node_modules repair re-fetched files only.)

---

## 8. Proposed polish slices (Phase 2…N — after you triage §4)

| Slice | Findings | Scope | Constraints |
|---|---|---|---|
| **A — Tap targets** | F-001, F-002 | route ≥44px hit areas via existing `.min-h-touch` / Button primitive; wrap icon buttons | no new tokens/deps; visual-only |
| **B — Button spacing** | F-003 | snap button padding/gap to token scale | token values only |
| **C — Card radius** | F-004 | `rounded-3xl` → `rounded-xl` | one ramp value |
| **D — Crisis H1 type** | F-005 | `font-serif` → `font-display`, single file | no copy change; crisis stays ungated |
| **E — Fine-print color** | F-006 | `text-slate-400` → `text-text-tertiary` | fixes palette + AA together |
| *DEFER* | F-007, F-008 | teal contrast | **owned by Slice 8 — do not touch tokens.css / tailwind.config.js / teal call-sites** |
| *MANUAL* | S-1 | dark-mode visual triage | headed dark pass |
| *PROPOSAL* | P-1 | empty-state pattern | design decision, no build |

Each slice: one branch off `main` (`design/polish-slice-<x>`), Playwright re-capture asserts the flagged properties now conform + no-regression diff vs the Phase-1 baseline JSON, `pnpm lint` + `pnpm build` green, in-flight files untouched.
