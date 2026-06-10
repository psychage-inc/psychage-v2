# Psychage v2 — Mobile-Responsive Audit

**Date:** 2026-06-10 · **Branch:** `fix/admin-login-role-claim` · **Target:** local dev `http://localhost:5173` (Vite)
**Instrument:** Playwright (headless Chromium, scripted sweep in `audit-artifacts/mobile-responsive/capture.mjs`) + live Playwright MCP for interactive verification.
**Scope:** READ-ONLY. The only writes are this file and `audit-artifacts/mobile-responsive/**` (capture script, raw JSONL, screenshots). No source file, token file, or config was modified. See §8.

---

## 1. Run metadata

### Breakpoint matrix
Every route below was loaded at **320 · 360 · 390 · 414 · 768 · 1024** CSS px (heights 568 / 640 / 844 / 896 / 1024 / 768, DPR 2, touch enabled below 1024) in **both light and dark** themes: **44 routes × 6 widths × 2 themes = 528 combos, all rendered without error** (plus targeted interactive sessions at 320 and 390). Raw per-combo metrics: `audit-artifacts/mobile-responsive/raw/results.jsonl`.

### Canonical tokens scored against (repo wins over memory)
- **Tailwind screens** (`tailwind.config.js:10-17` — note: the brief says `tailwind.config.ts`; **only `tailwind.config.js` exists**): xs 375 / sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536.
- **Spacing** (`src/styles/tokens.css:42-57`): 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px.
- **Radius ramp** (`tokens.css:60-64`): 4 / 8 / 12 / 16 / 9999 px.
- **Type:** `--font-display: 'Fraunces', 'Satoshi', …` + `--font-sans: 'Satoshi'` (`tokens.css:38-39`), IBM Plex Mono for mono. **Caveat:** the Fraunces `@font-face`, the `--font-display` change, and `public/fonts/fraunces/Fraunces-Variable.woff2` are **working-tree only — uncommitted/untracked in git**. A deploy from a clean checkout today would silently fall back to Satoshi headings. This audit scores against the working tree (the shipped-slices state), but that commit gap should be closed.
- **Motion:** `--duration-micro/small/medium` 150/200/300ms (`tokens.css:72-76`); global `prefers-reduced-motion` kill switch (`tokens.css:202-209`) plus `MotionConfig` in `App.tsx`.

### Routes audited (full matrix)
`/`, `/learn`, `/learn/anxiety-stress` (resolved category), `/providers`, `/providers/search`, `/how-we-verify`, `/for-providers`, `/for-providers/apply`, `/for-providers/claim`, `/tools`, `/tools/mood-journal`, `/tools/sleep-architect`, `/tools/mindmate`, `/tools/symptom-navigator`, `/tools/symptom-navigator/crisis`, `/tools/relationship-health`, `/tools/medication-tracker`, `/tools/clarity-journal` (+ `/daily /screening /thought-record /activation /triggers /toolbox /reflection /history /insights /entry /report`), `/search`, `/clarity-score`, `/about`, `/contact`, `/content-standards`, `/advisory-board`, `/legal/privacy`, `/legal/terms`, `/legal/accessibility`, `/crisis`, `/sitemap`, `/login`, `/signup`, `/reset-password`, `/update-password`.

Article detail `/learn/anxiety-stress/what-is-anxiety-complete-guide` was audited **interactively** (390px, light + measurements) — article cards navigate via `onClick` with no `href`, so the sweep could not enumerate one.

### Not audited (and why)
- `/dashboard/*`, `/portal/*`, `/onboarding` — gated by `ProtectedRoute` → redirect to `/login`. No test credentials used (consistent with the prior design audit). **Important:** their mobile bottom navs (`UserSidebar.tsx:94`, `PortalNavSidebar.tsx:116`) are `position:fixed` inside `PageTransition` and are **likely affected by MR-001** — verify after the fix.
- `/providers/:id` — provider search returns no rows locally (Supabase RPC empty in this env), so no profile id reachable. `ContactActions` sticky bar (also a fixed-position MR-001 candidate) unverified.
- `/search?q=` results — CSP blocks `localhost:3000/api/tools` without `vercel dev`; page shell audited, live results not.
- `/watch/:id`, `/authors/:slug`, `/category/:category` — no resolvable params locally.
- `/admin/*` — separate entry (`admin.html`, `AdminRedirect`), explicitly out of audit scope.
- Dark mode was measured (computed styles, contrast) at every combo and spot-checked visually; a full visual dark pass remains **owned by S-1**.

### ALREADY RESOLVED — not re-flagged (Slices A–E, shipped in working tree)
Verified present in the working-tree diff before auditing:
- **Slice A** tap targets — `min-h-[44px]/min-w-[44px]/min-h-touch` added across 36 files (e.g. `CrisisBanner.tsx` dismiss).
- **Slice B** button padding/gap snapped to the spacing scale.
- **Slice C** card radius `rounded-3xl → rounded-xl` at the flagged homepage/article call-sites.
- **Slice D** crisis H1 `font-serif → font-display`.
- **Slice E** fine-print `text-slate-400 → text-text-tertiary` (36 call-sites).
Anything below that *resembles* these classes is a **new call-site Slices A–E did not cover**, and is labeled "extends Slice X".

### ALREADY OWNED — flag-and-defer only
- **S-1** dark-mode visual pass (findings tagged, no fixes proposed).
- **F-007 / F-008 (Slice 8)** teal text contrast (`text-teal-600`, `brand-accessible` tuning).
- **P-1** empty-state composition.

### Prior artifacts located
`DESIGN_AUDIT.md` ✓ · `AUDIT_REPORT_2026-05-17.md` ✓ · `WEBSITE_FIX_PLAN_2026-05-17.md` ✓ · `EXECUTION_REPORT_2026-05-17.md` ✓ · `tailwind.config.js` ✓ · `src/styles/tokens.css` ✓. Not found: `tailwind.config.ts` (does not exist), any standalone token JSON (CSS variables are the committed token source).

### Headline results
- **Horizontal overflow: 0 of 528 combos.** No route produces horizontal scroll at any width/theme.
- **SACRED RULE — crisis reachability: PASS at all 528 combos.** A visible crisis affordance (header Crisis button, crisis card, or tel: link) exists at every breakpoint and theme; the header Crisis button never collapses away. `/crisis` and `/tools/symptom-navigator/crisis` render correctly down to 320px in both themes. Two findings *degrade* (not remove) crisis access: MR-002 and MR-003.
- Fraunces renders on H1/H2 site-wide; Satoshi on body; no stray serif headings found.
- The big problem is not reflow — it is **broken `position:fixed` UI inside transitioned pages** (MR-001) and **floating-layer collisions** (MR-002/003).

---

## 2. Findings

Severity: **Critical** (crisis unreachable / core flow broken) · **High** (layout or primary action broken at a common breakpoint) · **Medium** (visible polish/conformance defect) · **Low** (minor / hygiene). Class: **A** visual/UX · **B** code quality.

---

### MR-001 · `PageTransition` leaves `filter: blur(0px)` on every page wrapper — all `position:fixed` UI inside routed pages is broken
- **Severity:** Critical · **Class:** A (root cause B)
- **Routes/breakpoints/themes:** every routed page; user-visible damage confirmed at 320–768, both themes.
- **What happens:** `PageTransition` animates `filter: blur(10px) → blur(0px)` and keeps `filter: blur(0px)` as the resting style (`src/components/ui/PageTransition.tsx:14,20`). A non-`none` filter makes the wrapper a **containing block for fixed-position descendants**, so every `position:fixed` element rendered inside a page positions against the page wrapper instead of the viewport — it scrolls with content and usually sits far off-screen.
- **Confirmed victims (measured live):**
  - `/providers/search` < 1024px: tapping **Filters** opens the dim backdrop, but the bottom sheet renders **~1,700–2,500px below the viewport**. Filtering providers is **impossible on mobile**; the user is left under a backdrop with nothing on screen. (`src/components/providers/search/ProviderFilterPanel.tsx:268`; backdrop `fixed inset-0 z-40` same file). Screenshot: `audit-artifacts/mobile-responsive/providers_search/390-light-filter-sheet.jpeg` (backdrop open, no sheet).
  - Article pages < 1024px: the mobile **table-of-contents pill** (`fixed bottom-20 left-4 z-[100]`, `src/components/article/TableOfContents.tsx:171`) measured at **top = 16,963px** on a 19,860px article — effectively invisible while reading; its bottom sheet (`:194`) is equally broken.
- **Likely victims (same mechanism — verify after fix):** navigator footer bars `SymptomSelectionScreen.tsx:253` and `DurationSeverityScreen.tsx:388` (z-[65]), provider profile `ContactActions.tsx:70`, `ClarityResultsDashboard.tsx`, dashboard/portal mobile navs `UserSidebar.tsx:94`, `PortalNavSidebar.tsx:116` (gated, not audited).
- **Not affected:** anything mounted outside `PageTransition` — header/`MobileMenu`, `CookieConsent`, `CrisisBanner` (mounted via `Footer.tsx:80`), MindMate FAB, homepage mobile CTA (`App.tsx:402`). This is why the bug survived: the most-tested floating UI lives in the app shell.
- **Locked-spec rule violated:** none directly — this is a correctness bug breaking core flows (find-care filtering, article TOC).
- **Recommended fix (do not implement):** in `PageTransition.tsx`, clear the filter at rest (e.g. `transitionEnd: { filter: 'none' }` on the `enter` variant, or drop the blur axis entirely); then re-verify every fixed-position victim above.
- **Owner:** new.

---

### MR-002 · MindMate FAB (z-[100]) overlaps cookie-consent "Accept All" and crisis-banner "Resources" at mobile widths
- **Severity:** High · **Class:** A
- **Routes:** site-wide (FAB renders on all non-chat routes) · **Breakpoints:** ≤414 confirmed at 320/390 · **Themes:** both.
- **Measured:** FAB 56×56 at `fixed bottom-6 right-6 z-[100]` (`src/components/ai/MindMate.tsx:398`) overlaps the cookie banner's **Accept All** button by ~43×44px (`CookieConsent.tsx:98` card is z-[70]); on scrolled pages it sits directly on the **Resources** button of the floating crisis card (`CrisisBanner.tsx:47` is also `fixed bottom-6 right-6 z-[100]`, mounted in `Footer.tsx:80` — same coordinates, DOM order puts the FAB on top). A thumb tap aimed at a crisis or consent action can open the AI chat instead.
- **Screenshots:** `learn_anxiety-stress_what-is-anxiety-complete-guide/390-light-cookie-fab-overlap.jpeg`, `tools_symptom-navigator/320-light-step2.jpeg` (FAB on "Resources"), `crisis/320-dark.png`.
- **Locked-spec rule violated:** WCAG 2.5.8 adjacent-target spacing; crisis-access non-negotiable (degraded, not removed).
- **Recommended fix:** give the floating layer a stacking contract — offset the FAB upward when the cookie banner or crisis card is visible (e.g. bottom offset chain), and put crisis UI strictly above the FAB.
- **Owner:** new.

### MR-003 · Cookie-consent card covers ~75% of a 320×568 viewport — including on `/crisis`
- **Severity:** High · **Class:** A
- **Routes:** every route on first visit; worst on `/crisis` and the navigator · **Breakpoints:** 320/360 worst, still heavy at 390 · **Themes:** both.
- **Measured:** the consent card (`CookieConsent.tsx:98-…`, `fixed bottom-0 z-[70] p-4` + full copy + 2 stacked buttons + "Customize") occupies ~430 of 568px at 320 wide. On `/crisis` it sits directly over the EMERGENCY LINE card; a person in crisis on a small phone must process a privacy dialog first, and the most prominent dismiss button has the FAB sitting on it (MR-002). Screenshot: `crisis/320-dark.png`.
- Also: the card has no `env(safe-area-inset-bottom)` padding (home-indicator overlap on notched phones), and its description runs ~85ch wide at 768+ (measure ceiling is 75ch).
- **Locked-spec rule violated:** crisis-ungated principle (obstruction, not gating); safe-area handling; 60–75ch measure.
- **Recommended fix:** compact variant below `sm` (one-line copy + two inline buttons), add safe-area padding, and suppress or auto-collapse the banner on `/crisis` and `/tools/symptom-navigator/crisis` if legal review allows.
- **Owner:** new (the `/crisis` suppression question is a Ryan call — flagged in §3).

### MR-004 · Mobile nav drawer is not a modal: background scrolls, no Escape, no focus trap, no dialog role; close button 40px
- **Severity:** High · **Class:** A
- **Routes:** site-wide · **Breakpoints:** <768 (drawer is `md:hidden`) · **Themes:** both.
- **Measured live at 390:** with the drawer open, wheel/touch scrolls the page behind it (scrollY 0 → 656); **Escape does not close it**; focus stays on the hamburger and is never trapped (Tab does enter the drawer because it is last in DOM, but continues out the other side); no `role="dialog"`/`aria-modal`. Close button is `p-2` + 24px icon = **40px** (`src/components/layout/MobileMenu.tsx:57-97`; close at `:90-96`). The drawer does contain the crisis link (3rd tab stop — good).
- **Locked-spec rule violated:** WCAG 2.4.3/2.1.2 (focus order/no trap), 2.5.8 (close target); accessibility-first house rule.
- **Recommended fix:** add `role="dialog" aria-modal`, body scroll lock while open, Escape-to-close, focus-on-open + return-focus-on-close, and `min-h-[44px] min-w-[44px]` on the close button (same pattern Slice A used).
- **Owner:** new (extends Slice A for the close button).

### MR-005 · Crisis tap targets below 44px: header Crisis button 38px wide on mobile; crisis-card "Call Now"/"Resources" 32–34px tall
- **Severity:** High · **Class:** A
- **Routes:** site-wide · **Breakpoints:** <768 for the header button (icon-only mode); all for the card buttons · **Themes:** both.
- **Measured:** header Crisis button is `h-11` (44px ✓) but only **38px wide** in icon-only mobile mode (`px-2.5` + 16px icon — `src/components/layout/Navigation.tsx:245-253`). Floating crisis card actions "Call Now" / "Resources" are `px-4 py-2 text-xs` → **32–34px tall** (`src/components/layout/CrisisBanner.tsx:75-87`). These are the two highest-stakes touch targets on the site.
- **Locked-spec rule violated:** WCAG 2.5.8 ≥44px minimum dimension (the Slice A target).
- **Recommended fix:** `min-w-[44px]` on the header crisis button; bump the card actions to `py-3`/`min-h-[44px]` (token values).
- **Owner:** new (extends Slice A — call-sites Slice A did not touch; the only CrisisBanner control it fixed was the dismiss X).

---

### MR-006 · Form inputs render at 14px — iOS zooms the viewport on focus
- **Severity:** Medium · **Class:** A
- **Routes + cites (all <16px, measured at 320–414):** provider search name + location inputs (`src/components/providers/search/…` rendered `py-3.5` inputs), `/providers` hero search, `/search` "Search again…", signup `select#country` / `select#referralSource`, `/for-providers/apply` `select#license_state` / `select#provider_type_id`, homepage `input#closing-email`, and the Clarity Journal suite (`/daily`, `/entry`, `/reflection`, `/report` inputs + textareas).
- **Locked-spec rule violated:** mobile input convention (≥16px to prevent iOS zoom-on-focus); type-scale floor.
- **Recommended fix:** `text-base` (16px) on form controls at mobile, optionally `md:text-sm` where density matters.
- **Owner:** new.

### MR-007 · White-on-teal primary buttons fail AA: 3.44:1 (light) / 2.48:1 (dark)
- **Severity:** Medium (High frequency — every primary CTA) · **Class:** A
- **Routes:** site-wide ("Accept All", "Open Tool", "Search", "Save Check-In", "Start Free Assessment", "Start the Navigator", "Subscribe", "Find a provider"…) · **Breakpoints:** all · **Themes:** both (worse in dark: white on `#20B8A6` = 2.48:1).
- White 14–16px semibold text on `--color-primary` (`#1A9B8C` light / `#20B8A6` dark) measures 3.44:1 / 2.48:1 against the 4.5:1 small-text floor. Related: `brand-accessible` (`#158A7D`) as *text* measures ~4.23:1 on white in this sweep — marginally below 4.5 for small text (e.g. the "Add" button in Clarity Journal).
- **Owner: rolls into F-007 / Slice 8 (teal-contrast family) + S-1 for the dark half.** Not fixed here per instructions. Note for that work: the *button-background* variant (white-on-teal) and the `brand-accessible` small-text tuning are additional scope beyond the original teal-text findings — needs Ryan's palette decision.
- Excluded as intentional/artifact: the giant `psychage` watermark (decorative, noted in DESIGN_AUDIT §5) and active-tab labels measured against the page bg behind an animated pill (tool artifact).

### MR-008 · Footer touch cluster below 44px: social icons 18×18, link columns 28px, legal links 16px, "Back to Top" 20px
- **Severity:** Medium · **Class:** A
- **Routes:** site-wide (footer) · **Breakpoints:** all, matters most <768 · **Themes:** both.
- **Cites:** `src/components/ui/SocialIcons.tsx:51-59` (bare 18px icon anchors); `src/components/layout/Footer.tsx:149` (28px nav links), `:171` (Back to Top, 20px), `:174-176` (Privacy/Terms/Cookies, 16px). Also `SkipLink.tsx:7` is 36px tall (and white-on-teal-600, see MR-007 family). Screenshots: `root/320-light.png`, `tools_symptom-navigator/320-light-step2.jpeg`.
- **Recommended fix:** Slice-A pattern — `min-h-[44px]`/padded hit areas on footer links and icon anchors (glyphs can stay 18px).
- **Owner:** new (extends Slice A; Footer/SocialIcons were not in the Slice A file set).

### MR-009 · Micro-type off the scale: `text-[9px]`/`text-[10px]` (81 uses)/`text-[11px]` (66 uses)
- **Severity:** Medium · **Class:** A + B
- **Routes:** tool surfaces (SleepArchitect diary/components ~24 uses, ProviderCard, ClarityScore results, RelationshipHealthCheck, MedicationTracker, ForProvidersLandingPage…); themes both; all breakpoints (worst on mobile).
- 9–11px arbitrary values bypass the type scale (floor `text-xs` = 12px). The 9px "Required" badge also fails contrast (teal on cream, 3.21:1 — `span.ml-2.text-[9px]` in provider onboarding/apply forms). At phone sizes this is functionally unreadable fine print.
- **Locked-spec rule violated:** type ramp (no sub-12px step exists); AA for the teal instances.
- **Recommended fix:** sweep `text-[9-11px]` → `text-xs` with weight/tracking for hierarchy. Flag any label that *must* stay smaller as a Ryan decision (none found that justify it).
- **Owner:** new.

### MR-010 · `Picture` sets ship a single 1024–1376w source — mobile downloads 3–4× the pixels it renders
- **Severity:** Medium · **Class:** B
- **Routes:** `/`, `/for-providers`, tools pages using `Picture` · **Breakpoints:** ≤414 measured.
- **Measured:** e.g. `C-1.avif` natural 1376w rendered at 270–366px; `A-5.avif`/`C-2.avif`/`C-3.avif` 1024w at 272–312px (`results.jsonl` imgs). `Picture.tsx:21-23` emits one URL per format with no `srcset` width descriptors / `sizes`.
- **Recommended fix:** add width variants to the existing image bundles (`homeImages.ts`) and `srcset`/`sizes` in `Picture.tsx` — no new component.
- **Owner:** new (Slice 7 added formats + lazy ✓; responsive widths were never in its scope).

### MR-011 · Image hygiene: 22 `<img>` without width/height at 390px; `logo.png` (1024px) rendered at 48px without srcset
- **Severity:** Low · **Class:** A/B
- Measured CLS on throttled mobile homepage load was **0** (dev server), so this is prevention, not an observed shift: 22 distinct images lack intrinsic dimensions (see `results.jsonl`, `hasWH:false`), and `/about` ships the 1024px logo PNG into a 48px slot.
- **Recommended fix:** width/height attrs (or aspect-ratio classes) on the 22; a small logo rendition.
- **Owner:** new.

### MR-012 · No `<link rel="preload">` for Satoshi/Fraunces; IBM Plex Mono via Google CDN
- **Severity:** Low · **Class:** B
- `index.html` preconnects to Google Fonts (`:46-49`) but never preloads the two local variable fonts that paint all text (`Satoshi-Variable.woff2` 42KB, `Fraunces-Variable.woff2` 118KB, both `font-display: swap` → FOUT window on slow mobile; Fraunces↔Satoshi metric mismatch makes the heading swap visible). IBM Plex Mono still loads from the CDN, the one external render-path dependency (house style prefers local assets).
- **Recommended fix:** preload both local woff2 files; consider self-hosting Plex Mono later.
- **Owner:** new.

### MR-013 · Prose measure over 75ch at 768/1024 on info callouts
- **Severity:** Low · **Class:** A
- `/how-we-verify` callout paragraphs measure ~85–90 real ch at 768–1024 (`p.bg-surface…rounded-xl`, `p.bg-amber-50…`), and the cookie-consent description ~85ch (also in MR-003). Article prose itself is fine (~34ch at 390; constrained at desktop).
- **Recommended fix:** `max-w-prose`-equivalent (65ch) on long-copy callouts at md+.
- **Owner:** new.

---

### MR-014 · z-index sprawl: 12 ad-hoc values, two layers tied at z-[100]
- **Severity:** Low · **Class:** B
- Inventory across `src`: `z-30/40/50`, `z-[60] z-[65] z-[70] z-[100] z-[101] z-[110] z-[120] z-[150] z-[200] z-[201] z-[999] z-[9999]`. Header, MindMate FAB and CrisisBanner all sit at `z-[100]`, which is how MR-002 happens; crisis overlays correctly top out (`CrisisSupportModalContent.tsx:241` z-[9999], `CrisisOverlay.tsx:15` z-[999]).
- **Recommended fix:** document a 5–6 step layer ramp (content < sticky < drawer < toast < crisis) as comments/constants; align call-sites opportunistically. No new tokens required.
- **Owner:** new.

### MR-015 · JS-side breakpoint duplication
- **Severity:** Low · **Class:** B
- `src/features/chat/ChatLayout.tsx:24-26` hand-rolls `window.innerWidth >= 1024` with its own resize listener instead of the existing `useMediaQuery` hook; `src/components/article/AccessibilityBar.tsx:30` and `src/components/article/blocks/ComparisonTable.tsx:60` embed the magic string `'(max-width: 639px)'` (sm−1). Values agree with the Tailwind scale today but drift silently if `screens` ever changes.
- **Recommended fix:** route all three through `useMediaQuery` with a shared breakpoint constant.
- **Owner:** new.

### MR-016 · Inline `<style>` media query in `ToolsEcosystem`
- **Severity:** Low · **Class:** B
- `src/components/home/v2/ToolsEcosystem.tsx:295-307` injects a `<style>` tag with `@media (min-width: 1024px)` to flip a mask direction. Works, but it is the only responsive CSS outside Tailwind/the two CSS files, and re-injects per render.
- **Recommended fix:** Tailwind arbitrary properties with the `lg:` variant, or move to a CSS file.
- **Owner:** new.

### MR-017 · `article-prose.css` off-token values: Georgia drop-cap + stock-teal rgba
- **Severity:** Low · **Class:** B
- `src/styles/article-prose.css:67` drop-cap hardcodes `font-family: Georgia, serif` — now that Fraunces is the display face, the article drop-cap is the one serif glyph not using it. `:78` blockquote background uses `rgba(13, 148, 136, …)` (stock Tailwind teal-600 `#0D9488`, not brand `#1A9B8C`).
- **Recommended fix:** `var(--font-display)` and a `color-mix`/rgba of the brand teal.
- **Owner:** new.

### MR-018 · `BloomVisualization` ellipses render with `rx/ry = undefined` first frame — 25 console errors per visit
- **Severity:** Low · **Class:** B
- `src/components/tools/MoodWizard/BloomVisualization.tsx:45-52, 63-71` — `rx/ry` are only supplied via the framer `animate` prop, so the initial SVG attribute is `undefined` (`/tools/mood-journal`, every combo logged `<ellipse> attribute rx: Expected length, "undefined"`).
- **Recommended fix:** static initial `rx`/`ry` attributes alongside the animation.
- **Owner:** new.

### MR-019 · Off-ramp radii outside Slice C's scope: 67× `rounded-3xl`, 25× `rounded-[2rem]`, 2× `rounded-[2.5rem]`, 1× `rounded-t-3xl`
- **Severity:** Low · **Class:** B
- Slice C fixed the flagged homepage/article cards; these remain elsewhere (top files: `ui/Skeletons.tsx` ×7, `ForProvidersLandingPage.tsx` ×4, `ProviderProfile.tsx` ×4, `home/v2/HeroSection.tsx` ×4, `ProviderFilterPanel.tsx:268` sheet `rounded-t-3xl`…). 24/32/40px are not on the {4,8,12,16,full} ramp.
- **Owner:** extends Slice C — whether the ramp applies to these surfaces (esp. hero/marketing cards) is **Ryan's scope call**, not auto-fixed.

### MR-020 · Off-palette `slate` text sprawl: 338 instances survive
- **Severity:** Low · **Class:** B
- `text-slate-500` ×93, `-900` ×85, `-700` ×72, `-600` ×49, `-400` ×29, `-800` ×10 — concentrated in MedicationTracker, ClarityJournal and dashboard surfaces. Slice E swapped only the 36 flagged fine-print sites. `slate` is not in the token palette (`charcoal`/`stone`/`text-*`); a few measured borderline ("Back to Journal" slate-500 at 4.37:1).
- **Owner:** cross-ref the prior code audit's deferred "raw hex sprawl" item — same migration, do together; not re-flagged as new scope.

### MR-021 · Safe-area gaps in fixed-bottom surfaces
- **Severity:** Low · **Class:** B
- `viewport-fit=cover` is set (`index.html:6`) and most bars handle `env(safe-area-inset-bottom)` (App CTA, navigator screens, sidebars). Missing: `CookieConsent.tsx:98` (see MR-003), `ContactActions.tsx:70`, `ProviderFilterPanel.tsx:268` sheet, `TableOfContents.tsx:194` sheet. On notched phones the bottom-most controls in those surfaces sit in the home-indicator zone.
- **Recommended fix:** add the same `pb-[env(safe-area-inset-bottom)]` pattern used in `App.tsx:402`.
- **Owner:** new (fixes ride along with MR-001/MR-003 file work).

### MR-022 · Page transition runs 400ms (budget 150–300ms)
- **Severity:** Low · **Class:** B
- `PageTransition.tsx:21` enter duration 0.4s (+ blur/scale), vs the token motion ramp micro/small/medium 150/200/300ms. Reduced motion is respected globally (CSS kill switch + `MotionConfig`). Since MR-001 already requires editing this file's variants, the duration question can be settled in the same review.
- **Owner:** new (tunable judgment call — flag, Ryan decides 300ms vs keep).

---

### Pass 7 — dark-mode at mobile (all OWNED by S-1, listed for the S-1 worklist; no fixes proposed)
- White-on-teal CTAs drop to **2.48:1** in dark (MR-007's dark half).
- Near-miss grays at 320–414 dark: "Not started" / "Once a week" chips 3.78:1, "All data stays on your device" 4.18:1 (tool cards).
- Dark full-page screenshots for `/`, `/learn`, `/crisis`, `/providers/search`, `/tools`, `/clarity-score`, `/login`, navigator crisis at 320/390/768 are saved under `audit-artifacts/mobile-responsive/<route>/<bp>-dark.png` for the S-1 visual pass.
- No dark-specific layout breaks found (layout metrics identical across themes in all 528 combos).

### Notes, not findings
- `CrisisStickyBanner.tsx` is dead code (no consumers) — mentioning only; do not fix in this scope.
- Article-view chunk confirmed post-decomposition: largest per-category chunk **2.06MB raw / 615KB gz**, first-paint JS ≈ 262KB gz — matches the prior audit's accepted state (D7), no regression; still heavy for mobile long-term.
- Console noise in this env: CSP blocks `localhost:3000/api/tools` without `vercel dev` (graceful fallback observed) — environment, not product.
- The Fraunces font file + token change are uncommitted (see §1) — commit before any deploy or headings silently lose Fraunces.

---

## 3. OPEN PROPOSALS for Ryan (under-specified by the locked system — decisions, not fixes)
1. **Cookie consent on crisis surfaces** (MR-003): may the banner be suppressed/auto-collapsed on `/crisis` and the navigator crisis screen? Legal vs. crisis-first tension — system doesn't specify.
2. **Primary-button contrast strategy** (MR-007): white-on-teal fails AA in both themes; fixing it means either a darker button teal (palette change → Slice 8 territory) or dark text on teal. Locked palette doesn't currently contain a compliant button pair.
3. **Radius-ramp scope** (MR-019): do hero/marketing cards get ramp exemption, or does Slice C extend?
4. **Page-transition duration** (MR-022): 400ms+blur vs. the 300ms ceiling.

---

## 4. Totals

| Severity | Class A | Class B | Total |
|---|---|---|---|
| Critical | 1 (MR-001) | — | **1** |
| High | 4 (MR-002–005) | — | **4** |
| Medium | 4 (MR-006–009) | 1 (MR-010) | **5** |
| Low | 2 (MR-011, 013) | 10 (MR-012, 014–022) | **12** |
| **Total** | **11** | **11** | **22** |

(+ S-1-owned dark items and 4 open proposals, not counted.)

---

## 5. PROPOSED FIX-SLICE PLAN (for approval — nothing built)

Slices are file-ownership-isolated so they can run in parallel sessions without colliding. Order = severity.

| # | Slice | Closes | Files touched |
|---|---|---|---|
| **MR-A** | **Un-break fixed UI** — clear resting `filter` in PageTransition; re-verify all fixed-position victims (incl. gated dashboards/portal + provider profile once reachable) | MR-001 (+MR-022 decision in same file) | `src/components/ui/PageTransition.tsx` (only) |
| **MR-B** | **Floating-layer choreography** — FAB offset contract vs cookie/crisis cards; compact cookie banner < sm + safe-area; crisis card buttons ≥44px | MR-002, MR-003, MR-005 (CrisisBanner half), MR-021 (cookie part) | `src/components/ai/MindMate.tsx`, `src/components/ui/CookieConsent.tsx`, `src/components/layout/CrisisBanner.tsx` |
| **MR-C** | **Drawer modality + header crisis width** — dialog semantics, scroll lock, Escape, focus trap, 44px close; `min-w-[44px]` crisis button | MR-004, MR-005 (Navigation half) | `src/components/layout/MobileMenu.tsx`, `src/components/layout/Navigation.tsx` |
| **MR-D** | **16px input floor** — mobile `text-base` on all flagged form controls | MR-006 | provider search inputs, signup/apply selects, `SearchResults`, homepage closing email, ClarityJournal `daily/entry/reflection/report` sections |
| **MR-E** | **Footer touch targets** — 44px hit areas on socials/links/back-to-top/legal; skip-link size | MR-008 | `src/components/layout/Footer.tsx`, `src/components/ui/SocialIcons.tsx`, `src/components/ui/SkipLink.tsx` |
| **MR-F** | **Responsive media & code hygiene** — srcset widths in Picture bundles; img width/height ×22; font preloads; ellipse initial attrs; useMediaQuery consolidation; ToolsEcosystem style block; article-prose tokens; safe-area on ContactActions/TOC sheet | MR-010, 011, 012, 015, 016, 017, 018, 021 (rest) | `Picture.tsx`, `homeImages.ts`, `index.html`, `BloomVisualization.tsx`, `ChatLayout.tsx`, `AccessibilityBar.tsx`, `ComparisonTable.tsx`, `ToolsEcosystem.tsx`, `article-prose.css`, `ContactActions.tsx`, `TableOfContents.tsx` |
| **MR-G** | **Micro-type sweep** — `text-[9-11px]` → `text-xs` (after Ryan approves wholesale swap) | MR-009, MR-013 | SleepArchitect, ProviderCard, ClarityScore results, RelationshipHealthCheck, MedicationTracker, ForProvidersLandingPage + 2 callout pages |
| *deferred* | owned elsewhere | MR-007 → F-007/Slice 8 + S-1 · MR-014 (doc) · MR-019 → Slice C scope call · MR-020 → prior-audit palette migration · dark items → S-1 | — |

Suggested verification per slice: re-run `node audit-artifacts/mobile-responsive/capture.mjs "<routes>" "<widths>"` for the touched routes and diff against `raw/results.jsonl`, plus the interactive drawer/sheet checks for MR-A/MR-C.

---

## 6. What could not be audited
Listed in §1 "Not audited": gated dashboard/portal/onboarding (auth), provider profile (no local data), live search results (CSP/env), `watch`/`authors`/`category` params, admin (out of scope), full visual dark pass (S-1). The biggest blind spot tied to a finding: **MR-001's effect on dashboard/portal mobile bottom navs** is inferred from identical code patterns, not observed.

## 7. Instruments
`audit-artifacts/mobile-responsive/capture.mjs` (sweep: overflow, offenders, tap targets, input font-size, fixed/sticky inventory, heading fonts, measure, images, crisis-link presence, opaque-on-opaque contrast, console errors), `raw/results.jsonl` (530 rows incl. 2 smoke rows), screenshots under `audit-artifacts/mobile-responsive/<route>/<bp>-<theme>.png` plus 3 labeled interactive captures. Contrast methodology matches DESIGN_AUDIT: only opaque text on opaque backgrounds asserted; gradient/translucent contexts excluded; sr-only and decorative watermark excluded.

## 8. Read-only proof
The only working-tree additions from this audit are `MOBILE_RESPONSIVE_AUDIT.md` and `audit-artifacts/mobile-responsive/**`. Pre-existing modifications (Slices A–E + admin-auth work) were present before this audit started. Verify:

```
git status --porcelain | grep -v "audit-artifacts/\|MOBILE_RESPONSIVE_AUDIT.md"   # = pre-audit baseline
git diff --stat -- src/ tailwind.config.js index.html                              # unchanged by this audit
```
