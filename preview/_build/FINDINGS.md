# Phase 0, Repo Recon Findings

_Autonomous run: Psychage v2 conditions-library preview, condition = schizophrenia._
_Branch: `preview/conditions-v2-schizophrenia`. All output under `preview/`._

## HALT check (Phase 0), PASS
- Recognisable design system present (CSS-var token layer + Tailwind). ✓
- **13 / 13 PEAF blocks exist** (floor is ≥6). ✓
- → No Phase-0 HALT. Proceed.

## 1. Stack & build
- React 18.3 + **Vite 5** (pinned via pnpm peer override; devDep says 8 but override wins) + TypeScript 5.5 + `react-router-dom` **v7** + **pnpm 10**.
- Host: **Vercel** (`vercel.json`, `.vercel/`, `api/` serverless). CI `.github/workflows/pr-checks.yml` = typecheck/test/build/lang-gate only; **deploy is Vercel Git integration**, not CI.
- Vercel project link (`.vercel/project.json`): `projectName: psychage-v2`, `projectId: prj_L7OVzM9odyGxi8mKoM6eLvuBZnti`. This is the prod project → a no-`--prod` `vercel` deploy = a **preview deployment** under it (does not touch prod domain). Env must be added with `preview` scope only.
- Build: `tsc && verify:routes && build:api && vite build`. Note `verify:routes` (`scripts/verify-routes.ts`) cross-checks a hardcoded ROUTE_MAP against `src/data/tools.ts`, preview routes are NOT tools, so they must not be added there.
- `python3` = 3.14.5 available (for `gates/deterministic.py`).

## 2. Routing
- Central flat `<Routes>` in `src/App.tsx:257-420`; every page = `lazyWithRetry(() => import('...'))` (`src/lib/lazyWithRetry.ts`), one `<Suspense>`.
- Route shape: `<Route path="/conditions/:slug" element={<PageTransition><RouteErrorBoundary><ConditionDetailPage/></RouteErrorBoundary></PageTransition>} />`.
- **No env-gated route registration exists today** → we introduce one, additive: `import.meta.env.VITE_PREVIEW_MODE === 'true' && <preview routes>`. Because `import.meta.env.VITE_*` is statically string-replaced at build, the dead branch (and its dynamic `import()`) is tree-shaken out of the prod bundle → Layer-1 isolation (routes absent AND not code-split).
- `VITE_` env pattern precedent: `src/lib/navigator/config.ts` reads `import.meta.env.VITE_X === 'true'`.

## 3. Design tokens, spec vs code (CODE WINS; 3 discrepancies logged)
Tokens in `src/styles/tokens.css`, consumed by `tailwind.config.js` (`darkMode: 'class'`).

| Spec claim | Code reality | Verdict |
|---|---|---|
| paper `#FBF9F4` | `--color-background`/`--color-surface` = `#FBF9F4` | ✓ match |
| teal `#1A9B8C` | `--color-primary` = `#1A9B8C` = Tailwind `teal.600` | ✓ match |
| primary `#157F73` | real primary = `#1A9B8C`; WCAG-AA accessible alias = `brand-accessible #158A7D` (`teal.700`). `#157F73` appears once, hardcoded, on one page. | ✗ **DISCREPANCY, code wins**; use `text-primary`/`teal` tokens |
| navy `#1A1A2E` | NOT a global token (only `index.html` splash + one page). Dark canvas is neutral `#0F0F0F`; comment says navy intentionally not introduced. | ✗ **DISCREPANCY, code wins**; no navy token |
| body "stone-900" | body prose = `--color-text-secondary` `#57534e` (stone-600) light / `#d6d3d1` dark, via `.article-prose`; headings = `--color-text-primary` `#0a0a0a`. | ✗ **DISCREPANCY, code wins**; reuse `.article-prose`, do not hardcode stone-900 |

- Fonts: **Satoshi** (sans/body, `--font-sans`) + **Fraunces** (display, `--font-display`), self-hosted woff2. ✓ matches spec. Tailwind `font-sans`/`font-display`.
- Spacing: partial 8pt scale (`--space-*` 4/8/12/16/24/32/48/64). No global 60-75ch measure, article body capped by **`max-w-[720px]`** wrapper (`ArticlePage.tsx:357`) + `.article-prose` (`prose prose-lg max-w-none`). 720px ≈ 68ch at 18px → within the 60-75ch invariant.
- Body prose renderer: **`.article-prose`** class (`src/styles/article-prose.css`) + `@tailwindcss/typography` `.prose`. Full dark-mode rules present. **Reuse verbatim.**
- Dark mode: class-based, `ThemeContext` (`localStorage['psychage_theme']`, default light, no system-detection).
- Audio player exists: `src/components/article/ArticleAudioPlayer.tsx`, rendered top-of-article in `MobileReader.tsx:208`. Reuse at top of preview part page.
- **No mascot component** anywhere (only comments asserting absence + unrelated article text). Nothing to remove.

## 4. The 13 PEAF blocks, all exist; reuse, never reimplement
Location `src/components/article/blocks/*.tsx`, barrel `src/components/article/blocks/index.ts`. **There is NO block dispatcher / discriminated union**, production articles author inline JSX in `Article.content: React.ReactNode` (`src/data/articles/**/*.tsx`). The renderer `src/pages/learn/ArticlePage.tsx:398-409` just renders `content` as-is (ReactNode) or via `ArticleHtmlRenderer` (HTML string). → **We build a preview-only `PreviewBlockRenderer` that maps a JSON block `{type,...props}` union onto these 13 components.** `05_final/*.json` = single source of truth; the JSON→JSX renderer is the projection. This satisfies "one authoring, two projections" without a prod content-store write.

| # | Component | Import (`@/components/article/blocks`) | Key props (accepts loose aliases) |
|---|---|---|---|
| 1 | ComparisonTable | `ComparisonTable` | `columns?`, `items?`/`data?`/`headers`+`rows`, `title?`, `caption?`, `highlightColumn?` |
| 2 | ArticleCallout | `ArticleCallout` | `variant`/`type` (info·warning·tip·clinical-note·crisis·danger·science·research·key-takeaway…), `title?`, `children`/`content` |
| 3 | ArticleChart | `ArticleChart` | `type` (bar·line·pie·area·radar·donut), `data`, `title?`, `caption?`, `source?`, `xKey?`/`yKey?`, `lines?` |
| 4 | StatCard | `StatCard` | `stats[]` `{value,prefix?,suffix?,label,description?,source?,citation?}` OR flat `value/label/source` |
| 5 | MythVsFactBlock | `MythVsFactBlock` | `myth`, `fact`, `source?` |
| 6 | ArticleAccordion | `ArticleAccordion` | `items[]` `{id?,title,content/description,icon?}`, `type?` single/multiple |
| 7 | RelatedToolsBlock | `RelatedToolsBlock` | `tools[]` `{name,path?/link?,description,icon?}` |
| 8 | QuoteBlock | `QuoteBlock` | `quote`, `attribution?`/`author?`, `role?`/`context?`, `source?`, `sourceLink?`, `variant?` |
| 9 | ArticleTabs | `ArticleTabs` | `tabs[]` `{id?,label,content,icon?}`, `defaultTab?` |
| 10 | BeforeAfter | `BeforeAfter` | `before`/`after` `{title,content?/points?/items?}` |
| 11 | HighlightBox | `HighlightBox` | `children`, `variant?` stat/quote/emphasis, `align?` |
| 12 | ProgressSteps | `ProgressSteps` | `steps[]` `{title,description/content,icon?}`, `variant?` |
| 13 | DiagramBlock | `DiagramBlock` | `type` flowchart/cycle/hierarchy/venn/mindmap/process, `title`, `nodes?`+`connections?` OR `items?`, `source?` |

Enrich fields are **top-level `Article` fields** (not blocks), rendered at fixed slots in `ArticlePage.tsx`: `summary`→SummaryBox, `keyFacts`→KeyFacts (`KeyFact{text,citationIndex?}`), `sparkMoment`→SparkMoment, `practicalExercise`→PracticalExercise. Components `SummaryBox`/`KeyFacts`/`SparkMoment`/`PracticalExercise` re-exported from the blocks barrel. `a11y_summary` field does NOT exist → we add it to the preview block/JSON shape (chart degradation), preview-only.

## 5. Content store, stay OUT
- Conditions: Supabase `conditions_reference` table / `conditions_reference_public` masking view (public sees only `verification_status='verified'`) + Sanity + on-disk `src/data/conditions/taxonomy.ts` fallback. Service `src/services/conditionsService.ts`.
- Articles: Supabase (primary) + Sanity `production` dataset + on-disk `src/data/articles/**`.
- **Preview writes NONE of these.** All artifacts live in `preview/_build/`; the render surface imports local JSON. Zero DB/CMS writes.

## 6. Isolation surface plan (3 layers)
- **Layer 1 route isolation:** env-gated registration `VITE_PREVIEW_MODE==='true'` (routes absent + tree-shaken in prod).
- **Layer 2 token gate:** `PreviewGate` reads `VITE_PREVIEW_ACCESS_TOKEN`, constant-time compare, `?key=` → session cookie. Caveat: a `VITE_`-exposed token is readable in the preview bundle, weak alone; real defence = Layer-1 (prod has no preview bundle) + Vercel deployment protection. Token value never committed → `.env.local` (already gitignored: `.gitignore` has `.env.local`, `*.local`).
- **Layer 3 non-indexing:** `<SEO robots="noindex, nofollow">` per route (SEO component `src/components/SEO.tsx` renders `<meta name=robots>` from `robots` prop); add `Disallow: /preview/` to `public/robots.txt`; sitemap generator (`scripts/generate-sitemaps.ts`, Supabase-sourced) already excludes `/preview/`.

## 7. Existing weaker precedent (noted, not used)
`?preview=1` query pattern on `/conditions/:slug` (`ConditionDetailPage.tsx`) flips `noindex` and reads unverified drafts, routes always registered, no token. Build plan mandates the stronger bespoke 3-layer surface above; we build that instead of extending this.

## 8. Git / deploy rules honored
- Branch `preview/conditions-v2-schizophrenia` off `main`. Pre-existing uncommitted user changes (ArticleCard.tsx, MobileReader.tsx, categoryPosters.ts, etc.) travel on the working tree, **untouched, never staged**. All commits use explicit `preview/` + `src/preview/` paths, never `git add -A`.
- Additive prod-file touches, env-inert: `src/App.tsx` (env-gated route block), `public/robots.txt` (Disallow line), plus new `src/preview/` dir. Nothing else in prod source is modified.
