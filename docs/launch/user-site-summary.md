# User Site Launch Readiness — Summary

**Branch:** `launch/user-site-readiness`
**Base:** `main` at `8341612`
**Scope:** Public user site only. Admin panel + auth architecture out of scope.

---

## Narrative

This branch carries out the launch-readiness sweep specified in
`docs/launch/user-site-findings.md`. The bar applied was hard launch
readiness: would shipping this today be embarrassing, illegal, broken,
or unsafe? Twelve candidate blockers were enumerated in Phase A. Eight
required code or config fixes; two required a dedicated test artifact
to prevent regression; two were verified to be already covered by
existing project conventions and reclassified as observations.

Crisis surfaces (`/crisis`, `/tools/symptom-navigator/crisis`) remain
fully public, and a smoke-level drift detector now asserts they stay
in the public route table.

The largest behavior change in the branch is the new HTTP-level
security headers in `vercel.json`. CSP is shipped in
**Report-Only** mode so production traffic can be observed before hard
enforcement; this is captured as operator follow-up OP-001.

---

## Per-blocker table

| ID | Severity | Status | Commit | Files touched |
|---|---|---|---|---|
| LB-001 | Critical | Fixed | `201c446` | `vercel.json` |
| LB-002 | High | Fixed | `2895c4f` | `public/robots.txt` |
| LB-003 | High | Fixed | `2895c4f` | `public/sitemap.xml` |
| LB-004 | High | Fixed | `2895c4f` | `public/manifest.webmanifest`, `index.html` |
| LB-005 | High | Fixed | `2895c4f` | `public/apple-touch-icon.png`, `index.html` |
| LB-006 | Medium | Fixed | `2895c4f` | `index.html` |
| LB-007 | High (preventive) | Fixed | `e1d50c1` | `src/tests/test-utils.tsx`, `src/tests/launch/public-routes.smoke.test.tsx` |
| LB-008 | High | Fixed | `06f7e05` | `src/components/layout/Footer.tsx` |
| LB-009 | High | Fixed | `06f7e05` | `src/components/pages/LegalPages.tsx`, `src/App.tsx`, `src/tests/launch/public-routes.smoke.test.tsx` |
| LB-010 | Critical | Fixed | `201c446` | `vercel.json` |
| LB-011 | — | Reclassified | `62b91f9` | `docs/launch/user-site-findings.md` (now OB-007) |
| LB-012 | — | Reclassified | `62b91f9` | `docs/launch/user-site-findings.md` (now OB-008) |

---

## Manual verification (operator, post-merge)

After this branch is merged and a fresh production deploy lands:

1. **Headers** — `curl -sI https://psychage.com/ | grep -iE 'strict-transport|x-content|x-frame|referrer|permissions|content-security'` shows all six headers.
2. **Manifest** — `curl https://psychage.com/manifest.webmanifest` returns valid JSON with `application/manifest+json` content type. Open homepage; in DevTools → Application → Manifest the parsed manifest renders without warnings.
3. **Robots** — `curl https://psychage.com/robots.txt` returns the new file pointing at `sitemap.xml` (not the old `sitemap-index.xml`).
4. **Sitemap** — `curl https://psychage.com/sitemap.xml` returns the expanded URL list. Submit the URL via Google Search Console.
5. **Favicon** — Visit homepage in a fresh-profile browser; the SVG favicon renders in the tab. `/favicon.svg` and `/apple-touch-icon.png` both return 200.
6. **Public routes smoke** — `pnpm vitest run src/tests/launch/public-routes.smoke.test.tsx` passes 41/41 locally.
7. **Crisis stays public** — `https://psychage.com/crisis` and `https://psychage.com/tools/symptom-navigator/crisis` render without sign-in. Footer crisis link is reachable from every public page.
8. **Footer legal row** — Privacy / Terms / Cookies / Accessibility / Sitemap all link correctly. `/legal/accessibility` renders the new statement.
9. **Privacy #cookies anchor** — `https://psychage.com/legal/privacy#cookies` scrolls to the new cookies section.
10. **No secrets in bundle** — `pnpm build` then `grep -rE '(SUPABASE_)?SERVICE_ROLE_KEY' dist/` returns nothing.
11. **CSP report-only** — Open homepage with DevTools console; check that no errors are thrown but `[Report Only]` warnings may appear. Aggregate CSP reports for one week before flipping to hard enforcement (see OP-001).

---

## Per-commit rollback plan

Each commit is independent and can be reverted in isolation; the smoke
test commit and the SEO commit do not depend on later commits.

| Commit | Rollback effect |
|---|---|
| `2c0f2ce` Phase A — findings doc | Removes the audit document. No code impact. |
| `e1d50c1` Phase B — smoke test + test-utils | Removes the launch smoke test. Other tests unaffected. |
| `2895c4f` Phase C — manifest / icons / sitemap / robots | Reverts to previous robots/sitemap; manifest disappears; favicon link points back at logo.png. |
| `62b91f9` Phase D — verification only | Doc-only revert. No behavior change. |
| `201c446` Phase E — vercel.json headers | Production loses HSTS / X-Frame-Options / CSP-Report-Only / etc. |
| `06f7e05` Phase F — legal / accessibility | `/legal/accessibility` route 404s; footer cookie + accessibility links go away; Privacy `#cookies` section disappears. |

If a single commit must be rolled back, prefer `git revert <sha>` over
`git reset` to keep the audit history clean.

---

## What changed about deploy

**`vercel.json`** — new `headers` block. Vercel applies this on the next deploy. No build flag changes; no environment variables added.

**`public/`** — new files: `manifest.webmanifest`, `apple-touch-icon.png`. Modified: `robots.txt`, `sitemap.xml`. Vercel serves these as static assets at the documented paths.

**`index.html`** — three new `<link>` elements (manifest, apple-touch-icon, alternate icon) plus updated icon reference. Build pipeline unaffected; Vite copies index.html as-is.

No new dependencies. No build-script changes. No env vars added.

---

## Test results (Phase I — final verification)

- `pnpm vitest run src/tests/launch/public-routes.smoke.test.tsx`: **41/41 pass**
- `pnpm tsc --noEmit`: **clean**
- Full Vitest suite: **1622 passed / 79 failed / 4 skipped** of 1714 total. Failure count matches the documented baseline (79); no regression introduced by this branch. The +41 in passing count corresponds to the new launch smoke test cases.
- `pnpm build`: **clean**, `✓ built in 17.82s`. The pre-existing 36MB `all-articles-*.js` chunk warning is out of scope.
- Bundle secret scan: `grep -rE 'service_role|SUPABASE_SERVICE_ROLE_KEY|ANTHROPIC_API_KEY' dist` — **0 matches** ✅. `VITE_GEMINI_API_KEY` is in the bundle by Vite convention (intentional client-side use); operator must restrict by HTTP referrer in Google Cloud Console — see OP-019.

---

## Documents

- `docs/launch/user-site-findings.md` — Per-finding detail with evidence and fix shape.
- `docs/launch/user-site-blockers-remaining.md` — Operator-handled work, prioritized.
- `docs/launch/user-site-summary.md` — This document.
