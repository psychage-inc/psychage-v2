# Public-site QA audit

`scripts/qa-audit.ts` is a standalone, read-only Playwright crawler that audits the **public** Psychage site on a desktop (1440×900) and a mobile (iPhone 13) viewport, then writes a route-by-route QA report. For each URL on each viewport it records load status, uncaught page errors, console errors, failed network requests, broken content images, mobile horizontal overflow, and best-effort empty-submit form validation. It is **non-destructive**: it never logs in, never submits valid data, and aborts any mutating request a form tries to send. It only reports — it fixes nothing. It is deliberately not a `*.spec.ts`, so the test runner and CI never execute it.

## Run

```bash
pnpm exec playwright install chromium   # once, if the browser binary is missing
pnpm exec tsx scripts/qa-audit.ts        # audits https://psychage.com by default
```

Override the target with `BASE_URL` (e.g. a preview deployment):

```bash
BASE_URL=https://www.psychage.com pnpm exec tsx scripts/qa-audit.ts
```

## Outputs (all git-ignored)

- `qa/report.md` — human-readable report: summary table, failures with evidence, warnings, broken links, coverage.
- `qa/results.json` — raw per-URL / per-viewport records (verbatim console + page-error text, network failures, etc.).
- `qa/screenshots/` — screenshots of every FAIL and every mobile horizontal-overflow WARN.

The article sample size is a constant (`ARTICLE_SAMPLE`) in the script; all condition detail pages are covered.
