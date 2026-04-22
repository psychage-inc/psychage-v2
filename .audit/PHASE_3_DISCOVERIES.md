# Phase 3 Discoveries

**Date:** 2026-04-21
**Branch:** fix/provider-integration-repair-2026-04-20

---

## Discovery 1: Pre-existing Vite build failure (framer-motion)

**Severity:** P2 (build infra)
**Found during:** Pre-commit build validation

The production build (`npm run build`) fails on both main and this branch with:

```
Could not resolve "./render/store.mjs" from "node_modules/.pnpm/framer-motion@11.18.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/framer-motion/dist/es/index.mjs"
```

This is a rollup resolution issue with framer-motion@11.18.2. TypeScript (`tsc --noEmit`) passes cleanly. The build failure predates Phase 3 — confirmed by checking out main and running the same build.

**Recommendation:** Upgrade framer-motion or pin to a known-good version. This should be addressed before the next production deploy.

## Discovery 2: `ai_providers` table is dead code

**Severity:** P3 (tech debt)
**Found during:** Commit 4 investigation

The `ai_providers` table exists in migration `20250220000006_ai_tables.sql` but has zero active references. `src/lib/ai/providers.ts` already queries the main `providers` table directly (line 44: `.from('providers')`). The consolidation described in Finding #053 was already completed at some prior point.

**Recommendation:** Phase 4 cleanup — drop the `ai_providers` table and its RLS policy after confirming no external consumers.

## Discovery 3: Dual API handler architecture

**Severity:** P2 (architecture)
**Found during:** Commit 4 investigation

Two chat API handlers exist:
1. `api/ai/chat.ts` — Production Vercel serverless function (what MindMate.tsx actually calls)
2. `src/app/api/ai/chat/route.ts` — Reference implementation with full 11-step flow (not served in production)

The reference implementation has features (full intent classification, vector retrieval with conditionTags, conversation-level monitoring, analytics) that the production handler lacks. Phase 3 wired intent classification + provider search into the production handler, but the two files will continue to diverge.

**Recommendation:** Decide on a single handler. Either migrate production to the route.ts architecture (requires Vercel adapter work) or backport remaining route.ts features into the Vercel function.

## Discovery 4: `AI_PROVIDER_SELECT` column name mismatch risk

**Severity:** P3 (potential bug)
**Found during:** Commit 4 review

`src/lib/ai/providers.ts` line 15-29 uses column names (`credentials`, `telehealth`, `website`, `phone`) in its select string that may not match the actual `providers` table schema (which uses `credentials_suffix`, `telehealth_available`, `website_url`). Supabase returns null for mismatched columns rather than erroring. This could cause provider results to show missing data (e.g., no credentials, no telehealth flag).

**Recommendation:** Audit `AI_PROVIDER_SELECT` against the actual schema and fix column names.
