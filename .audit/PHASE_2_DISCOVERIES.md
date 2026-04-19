# Phase 2b Discoveries

Findings discovered during Phase 2b build that are not in the existing audits or Phase 2a spec.

## D1: `isProviderVerified` imported by queries.ts

The Phase 2a spec noted 3 import sites for `VerificationBadge`. During build, `queries.ts:21` was found to also import `isProviderVerified` (the utility function, not the component). This was handled in Commit 2's grep sweep by creating `trust-badge.ts` with a re-exported `isProviderVerified()` using the corrected AND logic.

**Impact:** The AND correction (Correction 1) now also affects the direct-query fallback filter logic in `queries.ts:158`. Previously, providers with `status='active'` but `verified_at=null` would pass the filter — now they don't. This is the correct behavior per the spec.

## D2: credentials.ts did not exist

The Phase 2a spec and Phase 1 audit referenced a credential glossary utility at `src/lib/providers/credentials.ts`. This file did not exist on the main branch. It was created fresh in Commit 3 with 40 credential abbreviations (31 from Phase 1 spec + 9 Phase 2 additions).

## D3: Pre-commit hook rejects package.json changes without lockfile diff

The husky pre-commit hook (`check-lockfile-sync`) requires `pnpm-lock.yaml` to be staged whenever `package.json` is staged, even if the lockfile is genuinely unchanged (e.g., when only adding a `scripts` entry). This prevented including the `generate:sitemap` npm script in Commit 9. The script can be run directly via `npx tsx scripts/generate-sitemaps.ts`. The npm script should be added when the lockfile next changes naturally (e.g., a dependency update).

## D4: ProfileHeader uses hardcoded Tailwind colors

`ProfileHeader.tsx` uses `text-slate-900`, `text-slate-500`, `text-slate-400` instead of semantic tokens like `text-text-primary`, `text-text-secondary`. This was noted in Phase 2a spec §9.3 but not fixed (out of scope). Still present after Phase 2b.
