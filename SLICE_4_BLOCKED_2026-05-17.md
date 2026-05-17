# Slice 4 — Blocked

**Date**: 2026-05-17
**Slice**: hreflang + sitemap regeneration
**Status**: BLOCKED — preflight gate failed

## Block reason

Slice 4 of `WEBSITE_FIX_PLAN_2026-05-17.md` requires adding `hreflang` annotations and per-locale sitemap entries for the 5 supported languages (EN, PT, ES, SV, FR).

`hreflang` only carries SEO weight when each locale has a distinct URL. The codebase does not have per-locale URLs.

## Evidence

### 1. Routing is flat — no locale segment

`src/App.tsx` declares 77 routes. None contain a `:lang`, `:locale`, or equivalent dynamic segment. Sample:

```tsx
<Route path="/learn" element={<LearnPage />} />
<Route path="/learn/:categorySlug/:articleSlug" element={<ArticlePage />} />
<Route path="/providers" element={<ProvidersLandingPage />} />
<Route path="/tools/mindmate" element={<PsychageAIPage />} />
```

`grep` for `/:lang`, `/:locale`, `i18nRouter`, `LocalizedRoute` across `src/**/*.{ts,tsx}` returns zero matches.

### 2. i18next is client-side only

Language is held in i18next runtime state. Switching languages does not change the URL. The same URL serves all 5 locales — Google sees one indexable variant per route.

### 3. Existing sitemap has no hreflang

`public/sitemap.xml` (29 lines, 26 URLs) uses bare `<url><loc>https://psychage.com/…</loc>` entries with no `xmlns:xhtml` namespace and no `<xhtml:link rel="alternate" hreflang="…">` children.

### 4. `index.html` has no hreflang head links

`grep -n hreflang index.html` → no matches.

## Why we cannot proceed in scope

To produce meaningful hreflang annotations, every primary route would need a per-locale URL such as `/en/learn`, `/pt/learn`, `/es/learn`, etc. That requires:

1. A locale-prefixed route layer in `App.tsx` (or a wrapping `<Route path="/:lang">`).
2. A redirect strategy for legacy unprefixed URLs (`/learn` → `/en/learn`) plus canonical handling.
3. i18next-managed URL synchronization (`i18next-browser-languagedetector` switched to `path` detector + URL push on `changeLanguage`).
4. Per-locale `<title>`, `<meta description>`, OG tags driven by translated content (not just UI strings).
5. Per-locale sitemap generation reflecting actual locale-prefixed URLs.

Each item above is itself a multi-file architectural change. They lie outside the surgical-fix mandate of the current plan and outside Slice 4's stated touch list (`public/sitemap.xml`, `index.html`).

Adding `hreflang` without per-locale URLs would either:

- Point every locale variant to the same canonical URL (search engines treat as duplicate, no benefit), or
- Reference non-existent URLs (e.g., `https://psychage.com/pt/learn`) and create 404s.

Both outcomes are net-negative for SEO.

## Recommendation for next session

Promote multilingual SEO from a surgical fix to a dedicated work stream:

- **Phase 1**: Decide locale URL strategy — subpath (`/en/`, `/pt/`), subdomain (`pt.psychage.com`), or ccTLD. Subpath is cheapest given the existing Vercel SPA setup.
- **Phase 2**: Introduce `<Route path="/:lang">` wrapper, redirect legacy URLs, update `<Link>` callers to be locale-aware (helper or context).
- **Phase 3**: Synchronize i18next with URL (`path` detector + URL writer middleware).
- **Phase 4**: Localize SEO surface — `<title>`, meta, OG tags, JSON-LD per locale. Translated article slugs handled separately (slug-per-locale or slug-after-en).
- **Phase 5**: Sitemap generator emits one URL per (route × locale) pair with sibling `xhtml:link` entries. Then — and only then — Slice 4's stated scope makes sense.

Estimated scope: 1–2 weeks engineering, not a single-slice surgical fix.

## Files inspected (read-only)

- `src/App.tsx` (lines 1–80 + route declarations 232–308)
- `public/sitemap.xml`
- `public/robots.txt` (not modified)
- `index.html` (head section)
- `src/main.tsx`, `src/lib/i18n*` (no per-locale router detected)

## Files NOT modified

This slice produced zero edits to existing files. The only write was this block doc.

## Recovery

When per-locale routing exists, re-open `WEBSITE_FIX_PLAN_2026-05-17.md` Slice 4 and execute against the new URL structure.
