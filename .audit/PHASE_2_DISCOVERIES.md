# Phase 2b Discoveries

Findings discovered during Phase 2b build that are not in the existing audits or Phase 2a spec.

## D1: `isProviderVerified` imported by queries.ts

The Phase 2a spec noted 3 import sites for `VerificationBadge`. During build, `queries.ts:21` was found to also import `isProviderVerified` (the utility function, not the component). This was handled in Commit 2's grep sweep by creating `trust-badge.ts` with a re-exported `isProviderVerified()` using the corrected AND logic.

**Impact:** The AND correction (Correction 1) now also affects the direct-query fallback filter logic in `queries.ts:158`. Previously, providers with `status='active'` but `verified_at=null` would pass the filter — now they don't. This is the correct behavior per the spec.

## D2: credentials.ts existed in Phase 1 but was missed during exploration

The file `src/lib/providers/credentials.ts` was created in Phase 1 (commit `a1d14b1`) with 31 credentials using `{ full: string }` object format and an `explainCredential()` that returned `"LCSW — Licensed Clinical Social Worker"` format. Phase 2b Commit 3 overwrote it with a simplified API (plain string values, comma-separated output). This lost 9 Phase 1 credentials (LICSW, LISW, LPC-S, LCMHC, PA-C, BCBA, CAC, CADC, CASAC) and removed the HelpCircle tooltip from ProviderCard. Fixed in a follow-up commit restoring the missing credentials and the card tooltip.

## D3: Pre-commit hook rejects package.json changes without lockfile diff

The husky pre-commit hook (`check-lockfile-sync`) requires `pnpm-lock.yaml` to be staged whenever `package.json` is staged, even if the lockfile is genuinely unchanged (e.g., when only adding a `scripts` entry). This prevented including the `generate:sitemap` npm script in Commit 9. The script can be run directly via `npx tsx scripts/generate-sitemaps.ts`. The npm script should be added when the lockfile next changes naturally (e.g., a dependency update).

## D4: ProfileHeader uses hardcoded Tailwind colors

`ProfileHeader.tsx` uses `text-slate-900`, `text-slate-500`, `text-slate-400` instead of semantic tokens like `text-text-primary`, `text-text-secondary`. This was noted in Phase 2a spec §9.3 but not fixed (out of scope). Still present after Phase 2b.
