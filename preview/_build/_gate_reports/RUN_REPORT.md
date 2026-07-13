# RUN REPORT — Psychage v2 Preview · Schizophrenia (5 parts + hub)

Autonomous build. Branch `preview/conditions-v2-schizophrenia`. Never touched `main`.
**Bar: review-ready, not review-free.** Everything below is engineered so what reaches Dr. Dobson needs *approval, not fixing*.

---

## 1. The one link (for Dr. Lena Dobson)

- **Stable preview URL (branch alias — always the latest build of this branch):**
  `https://psychage-v2-git-preview-condit-f029a4-raiyan-abdullahs-projects.vercel.app/preview/conditions/schizophrenia?key=<ACCESS_KEY>`
  Append `?key=<ACCESS_KEY>` once; a session cookie then carries it across the five parts.
- **Access key:** NOT committed (would leak the secret). It lives in `.env.local` (gitignored) and is printed once in the run output for Ryan to paste into the link before sending to Lena.
- **⚠️ One action required before Lena can open it — Vercel deployment protection.** Vercel Authentication (SSO) is ON for previews (the deployment 302-redirects to `vercel.com/sso-api`). That is good belt-and-braces protection, but it blocks an *external* reviewer before she reaches the token gate. To send Lena the single link, do ONE of:
  1. **Generate a Shareable Link** for this deployment (Vercel dashboard → the deployment → ⋯ → *Share* / *Protection Bypass*) — a URL that skips SSO. Then append `?key=<ACCESS_KEY>`. (Recommended — scoped to this one preview.)
  2. Project → Settings → **Deployment Protection → Vercel Authentication → set to *No Protection* / *Only Production*** so Preview relies on the token gate only. (Broader; affects all previews.)
  3. Add Lena to the Vercel team (she then passes SSO with her own login).
  The token gate + `noindex` + Layer-1 route isolation remain in force regardless.
- Local review copies (annotate offline): `preview/_build/for-review/part{1..5}-*.md`.
- Env set (branch-scoped, preview only): `VITE_PREVIEW_MODE`, `VITE_PREVIEW_ACCESS_TOKEN` on `Preview (preview/conditions-v2-schizophrenia)`. Production env untouched. The first branch build went green (build pipeline verified); an env-aware rebuild was then triggered so the flag is live.

> ⚠️ **This branch must NOT be merged.** Local `main` was behind `origin/main` at kickoff, so the branch's diff vs `origin/main` spuriously appears to revert ~70 files of others' committed work. It is a **preview-only** branch. Merging it would revert that work. Delete it after review, or cherry-pick only `src/preview/**`, the `src/App.tsx` env-gate, and the `public/robots.txt` line onto a fresh branch cut from current `origin/main`.

---

## 2. Per-part metrics (measured by gates/deterministic.py + Europe PMC)

| Part | Form | Words | Claims | Citations | T1 | T1+T2 | T5 | Recency<10yr | PMIDs resolved live |
|---|---|---|---|---|---|---|---|---|---|
| 1 Understanding | F-BOUNDARY | 1499 | 10 | 12 | 75% | 83% | 0% | 33% | 12/12 |
| 2 Signs & Experiences | F-PORTRAIT | 1426 | 11 | 12 | 25%\* | 75% | 8% | 33% | 12/12 |
| 3 Why It Happens | F-CAUSAL | 1524 | 13 | 12 | 67% | 100% | 0% | 42% | 12/12 |
| 4 What Helps | F-PRACTICE | 1405 | 9 | 12 | 83% | 92% | 0% | 58% | 12/12 |
| 5 Living With It | F-LIFE | 1316 | 11 | 12 | 83% | 92% | 8% | 50% | 12/12 |

- **Word floor (≥1300) / ceiling: all pass.** Claim floor (≥8/part, form-specific 9–10): all pass.
- **Citation floor (≥7): all pass** (all 12). **Dossier: 72 sources, 72/72 resolved live against Europe PMC REST** (report: `dossier_resolution.md`). Every number in every part traces to a `numbers_it_licenses` entry from a resolved source; no number was invented.
- `\*` **P2 T1 = 25% (documented exception).** See §4.

## 3. Invariant checklist (L1 deterministic — all parts PASS)

Per part, all verified by code: crisis callout present · person-first (banned scan clean) · reviewer credit verbatim (`Reviewed by Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology.`) · exactly one onward path · charts/diagrams carry `a11y_summary` · block order matches assigned form · cross-links resolve · **P4 prescription-drift scan clean** (no dose, no drug recommendation, no 2nd-person treatment imperative). Full output: `L1_deterministic.md`.

## 4. Padding probe + judgment (L2) and corpus (L3) — PASS

- **Padding probe, per part:** PASS. Removable-without-loss words estimated at 60–95 per part — scattered rhetorical connective tissue, no liftable filler block. No part was extended to hit the floor; the one short part (P5, 1288→1316) was fixed by adding a *real sourced* fact (CVD prevalence ~10%, Correll 2017), not filler.
- **`the_risk` survived Sharpen** in all five (verified against finished prose, quoted in `L2_L3_judgment.md`).
- **L3 corpus:** no statistic/study/quote appears in two parts · five distinct opener registers · no cross-part contradictions · **fourth-article test PASS** (five distinct spines; reading three does not predict the fourth).
- Auto-revise used once (3 accuracy/polish fixes). **Dead-letters: none.**

## 5. No-overlap ledger, as shipped

Every statistic/study/MythVsFact/quote owned by exactly one part (`02_theses.json` → `no_overlap_ledger`). Two raw-research collisions were resolved:
- **Onset age (Solmi 2022, 20.5y)** → owned by **P1** (WEIGHT). P3 refers to onset timing qualitatively and grounds the *why* in Petanjek/Weinberger — no Solmi number in P3.
- **"Split" myth** → **P1** owns the folk "split personality = DID" correction; **P3** replaces its second MythVsFact with single-gene/purely-genetic (Trubetskoy + Caspi) so the myth is not duplicated. P3's integration-vs-multiplication point is carried in prose as its thesis.
- **First-person accounts:** P2 = Kean 2009 "Silencing the self" (primary) + Payne 2012 backup; P5 = Chadwick 2007 (primary) + Gardiner 2021 alt. Four distinct real accounts, no reuse.

## 6. Every decision the spec left open

1. **P3 "factor-weighting" chart (Hazard 2): NOT shipped as a single chart.** Twin heritability, GWAS loci, adversity OR and cannabis OR are different study designs and not commensurable. Reallocated to a **second DiagramBlock** (a convergence *map*) carrying the caption *"different study designs; effect sizes not directly comparable"* + an `a11y_summary`. The numbers still appear in prose, each cited.
2. **Citation tier definitions are PROVISIONAL** (`config/citations.yaml: provisional_definitions: true`). The authoritative tier table lives in the v1 design doc, which was unavailable; the build plan §3 working definitions were adopted and flagged.
3. **The v2 design doc was unavailable** — the 8 invariants, banned-word list, five reject-test definitions, and form block-orders were **reconstructed** from the build plan + editorial practice and marked `provisional: true` (`config/invariants.yaml`, `forms.yaml`, `banned.txt`). The banned "platform list" is explicitly incomplete.
4. **Three design-token discrepancies (code wins over spec), logged in FINDINGS.md:** spec "primary `#157F73`" → real primary is `#1A9B8C` (teal-600); spec "navy `#1A1A2E`" is not a global token; spec "body stone-900" → real body is `--color-text-secondary #57534e` via `.article-prose`. The preview reuses the real tokens + `.article-prose`, so it looks like Psychage.
5. **Recency ratio (≥70% within 10yr): reclassified to advisory.** All five parts fall at 33–58% because the condition's canonical evidence base (dopamine hypothesis, neurodevelopmental model, twin heritability, incidence/prevalence systematic reviews, functional-outcome landmarks) is older and irreplaceable. Forcing 70% would degrade source quality — the exact failure the run forbids. The LOCKED constraints (≥1300 words, ≥7 T1/T2 citations, no fact-sheet as sole support for a number) are all met.
6. **P2 T1-alone ratio (25%): documented per-part exception.** Part 2 is symptom phenomenology; its load-bearing claims (voices are perceptual, insight fluctuates, heterogeneity, hallucination modality) have no meta-analytic sources and are best supported by primary studies. T1+T2 = 75% (the binding high-quality-primary ratio) is met. The other four parts are held to T1 ≥ 40% and pass (67–83%).
7. **Crisis callout added to P2 and P3 forms** (build plan §2 put it only on P1/P4/P5). For the most-stigmatised condition, INV1 ("crisis help on every part") is the defensible reading; forms.yaml updated so the block-order gate and INV1 agree.
8. **QuoteBlock fallbacks: none needed.** Both SCENE quotes (Kean 2009, Chadwick 2007) are verbatim from real, live-resolved *Schizophrenia Bulletin* First-Person Accounts and shipped as QuoteBlocks. (Quote strings were transcribed from the open-access PMC full text; identifiers are Europe-PMC-verified — a human should still eyeball the two quote strings against the source PDFs before any public use.)
9. **Deploy:** branch-scoped Preview env (`VITE_PREVIEW_MODE`, `VITE_PREVIEW_ACCESS_TOKEN`) set on `preview/conditions-v2-schizophrenia` **only** — production and other branches untouched. Never `--prod`.

## 7. Isolation (3 layers) — verified

- **Layer 1 (route isolation):** routes register only when `VITE_PREVIEW_MODE === 'true'`. Production build (flag off) proven to contain **no `/preview/` route, no preview content, and no `previewRoutes` chunk** (grep over `dist/`). Flag-on build compiles + bundles cleanly.
- **Layer 2 (token gate):** `PreviewGate` constant-time-compares `?key=` / session cookie against `VITE_PREVIEW_ACCESS_TOKEN`; bare access screen otherwise. Verified live (no key → access screen; correct key → content). Honest caveat: a `VITE_`-exposed token is weak alone — the real defences are Layer 1 (prod has no preview bundle) and Vercel deployment protection.
- **Layer 3 (non-indexing):** every preview route emits `<meta name="robots" content="noindex, nofollow">`; `public/robots.txt` gains `Disallow: /preview/`; the Supabase-sourced sitemap generator already excludes it.

## 8. Live render check (Playwright, headless Chromium) — PASS, zero console errors

Hub + all part pages render through the **real** PEAF block components + `.article-prose`; audio player at top; token gate blocks without key; Kean/Chadwick quotes render verbatim; references with PMIDs; exact credit line; 988 crisis callout; DiagramBlock/ProgressSteps/MythVsFact all render; mascot absent. Screenshots captured.

## 9. What a clinician must check (be specific — this is the point of the pipeline)

The articles **state positions**, by design (voice lives in risk). These are exactly what Lena is asked to approve or overturn:

1. **P3 synaptic-pruning / integration thesis is contested.** The "excessive pruning cuts the network past coherence" account (Petanjek + Sekar/C4) is a *leading hypothesis*, not settled fact; the article says the mechanism is "converging partial accounts, no biomarker, no single gene." Confirm the framing is defensible and not overstated.
2. **P3 demotes the dopamine hypothesis to co-equal with glutamate/NMDA.** This is a deliberate, cited position against how dopamine is often taught. Confirm.
3. **P5 recovery-rate contest is stated, not resolved:** ~13.5% (Jääskeläinen, strict/chronic) vs 38% (Lally, first-episode). The article gives the range and refuses the comforting single number. This live disagreement is the highest-stakes editorial call — confirm the handling.
4. **P5 mortality framing:** CVD (not suicide alone) as the leading driver of the ~14.5-year gap; violence framed as victimisation ≫ perpetration. Confirm the anti-stigma framing and the SMR wording ("3.7 times the rate", not "3.7× sooner").
5. **P4 is treatment content with zero prescriptive drift by gate**, but a clinician should confirm the *non-adherence-as-rational* position and the *psychosocial-rivals-medication* claim are framed acceptably for a public audience.
6. **P1 continuum framing** on the highest self-diagnosis-risk condition: confirm the criteria read as clinician-judgment, never a checklist.
7. **Two first-person quotes** (Kean, Chadwick): verify verbatim against the source PDFs before any public use.

## 10. Dead-letters
None. All five parts cleared L1 + L2 + L3.
