# Tech Debt Inventory — 2026-04-19

**Context:** Consolidation of known debt after shipping Phases 0.5, 1, 0.6, and 2b.
**Sources:** .audit/PROVIDER_DIRECTORY_ISSUES.md (#001-#047), .audit/PROVIDER_DIRECTORY_ISSUES_SUPPLEMENTARY.md (#048-#075), Phase 2b discoveries.

---

## 1. Phase 2 Discoveries (Not Fixed)

| ID | Description | Blast Radius | Recommended Phase |
|----|-------------|-------------|-------------------|
| D4 | ProfileHeader uses hardcoded Tailwind color classes instead of semantic tokens (e.g., `text-teal-600` instead of `text-primary`) | Low — cosmetic, but makes theme changes harder | Phase 4 |
| — | `VerificationBadge.test.tsx` deleted but test coverage for `TrustBadge.test.tsx` is minimal (78 lines, happy-path only) | Low — badge logic is simple | Phase 4 |
| — | ForProvidersLandingPage testimonials reference specific provider names and photos — unclear if real or placeholder | Medium — trust risk if fake testimonials | Phase 4 (verify with Ryan) |

---

## 2. P0/P1 Findings — Resolved by Shipped Phases

These are closed and included only for audit trail:

| Finding | Resolution |
|---------|-----------|
| #012 — No credential glossary | Phase 2b Commit 7 (explainCredential + tooltip) |
| #013 — No JSON-LD | Phase 2b Commit 8 (generateProviderJsonLd) |
| #026 — No "How We Verify" page | Phase 2b Commit 4 (HowWeVerifyPage) |
| #027 — No seeded/claimed distinction | Phase 2b Commit 5 (TrustBadge + seeded banner) |
| #030 — No last-updated date | Phase 2b Commit 6 (formatLastUpdated) |
| #045 — No sitemap for providers | Phase 2b Commit 9 (generate-sitemaps.ts) |
| #048 — Admin UPDATE RLS missing | Phase 0.5 migration 20260419000003 |
| #049 — cultural_competencies RLS missing | Phase 0.5 migration 20260419000002 |
| #050 — Analytics INSERT flooding | Phase 0.5 migration 20260419000001 |
| #056 — Claim flow RLS blocked | Phase 0.5 migration 20260419000004 |

---

## 3. P0/P1 Findings — Phase 3 Scope (Integration Repair)

| Finding | Description | Blast Radius | Phase 3 Inclusion |
|---------|-------------|-------------|-------------------|
| #017 | Filter bottleneck indication — empty state doesn't say which filter is the bottleneck | Medium — users clear all filters unnecessarily | Yes |
| #018 | No providers on landing page — requires search to see any data | Medium — first-time visitors see no providers | Yes (featured providers) |
| #025 | No React Query caching — back-navigation re-fetches | Medium — slow UX on back button | Yes |
| #032 | MindMate has no provider search integration | High — AI can't help find providers | Yes |
| #053 | `ai_providers` table is unsynced silo — MindMate may recommend stale data | High — trust/safety | Yes (as part of #032) |

---

## 4. P0/P1 Findings — Deferred to Phase 4+

### Phase 4 — UX Polish + Security Hardening

| Finding | Description | Blast Radius |
|---------|-------------|-------------|
| #001 | Mock data fallback shows fake providers as real (no visual distinction) | High — trust damage if triggered |
| #005 | Insurance filter truncated to 15 of 35+ plans | Medium — 57% of plans hidden |
| #006 | URL filter state doesn't roundtrip correctly for complex filters | Medium — shared links broken |
| #007 | Premium-first sort undisclosed (FTC concern) | Medium — regulatory risk |
| #024 | Promise.all on lookups — one failure kills all filters | Medium — intermittent total filter loss |
| #031 | Navigator → provider handoff broken (no CTA after assessment) | High — key flow severed |
| #033 | No "Find Care" link in main navigation | Medium — directory undiscoverable |
| #034 | Legacy /find-care/:id redirect loses provider ID | Low — only affects old bookmarks |
| #035 | Favorites silently fail when logged out (no login prompt) | Low — minor UX annoyance |
| #046 | Analytics event queue splices before insert — data loss on failure | Medium — unreliable metrics |
| #051 | Providers can self-insert verification records | Medium — gaming risk |
| #055 | NPI verification endpoint has no rate limiting (client-side NPPES calls) | Low — NPPES is public anyway |
| #068 | Admin role RLS depends on JWT metadata that may not be set | High — admin panel may silently fail |
| #069 | Conflicting admin role enum (clinical_admin vs editor) | Medium — role mismatch |
| #071 | V1 admin pages don't write audit logs | Medium — compliance gap |
| #075 | useProviderSearch exhaustive-deps suppression — potential stale closure | Low — edge case |

### Phase 5+ — i18n + Reviews + Portal

| Finding | Description | Blast Radius |
|---------|-------------|-------------|
| #016 | International users dead-end with no acknowledgment | High — all non-US users |
| #022/#073 | 36.5 MB article chunk (not on provider routes, but still large) | Medium — article page perf |
| #028 | No reviews visible despite schema being ready | High — no social proof |
| #036 | Portal profile editor: 6 of 8 tabs are stubs | High — providers can't complete profiles |
| #038 | Review submission UI missing entirely | High — blocks review ecosystem |
| #039 | Trust score Edge Function missing — scores stuck at 0 | Medium — portal shows 0/100 forever |
| #042 | Zero i18n across all provider components (100+ strings) | High — English-only in 5-lang platform |
| #070 | No review moderation queue in admin | Medium — blocks review launch |

### Phase 6+ — Monetization

| Finding | Description | Blast Radius |
|---------|-------------|-------------|
| #040/#074 | Stripe completely absent (schema exists, client code missing) | Critical — entire monetization blocked |

---

## 5. Cross-Cutting Gaps

### Accessibility (14 findings from supplementary audit)

| Finding | Description | Recommended Phase |
|---------|-------------|-------------------|
| #057 | Search result count not aria-live announced | Phase 4 |
| #058 | Sort dropdown missing keyboard arrow navigation | Phase 4 |
| #059 | 6+ elements missing focus-visible styles | Phase 4 |
| #060 | 5 color combinations fail WCAG AA contrast | Phase 4 (design system sweep) |
| #061 | Portal toggle switches missing aria-label | Phase 5 (portal build) |
| #062 | Portal tab buttons missing aria-selected | Phase 5 (portal build) |
| #063 | Portal dashboard chart not accessible | Phase 5 (portal build) |
| #064 | ProviderCardSkeleton missing aria-busy | Phase 4 |
| #065 | ProviderCard bio uses low-contrast text-text-tertiary at text-xs | Phase 4 |
| #066 | Filter panel mobile drawer doesn't trap focus | Phase 4 |
| #067 | Error banner missing role="alert" | Phase 4 |

### Infrastructure / DX

| Item | Description | Recommended Phase |
|------|-------------|-------------------|
| ESLint 9 migration | ESLint 9 installed but config still uses .eslintrc (not eslint.config.js) — `npm run lint` fails | Phase 4 |
| Plausible custom events | No provider-specific custom events tracked | Phase 4 |
| Transactional email | No email service configured for provider onboarding notifications | Phase 5 |
| Error monitoring | No Sentry/LogRocket configured | Phase 4 |
| `ai_providers` parallel table | Unsynced silo — same data as `providers` but can diverge | Phase 3 (MindMate integration) |
| `verification_tier` column | Exists in schema, never updated by UI beyond claim flow | Phase 5 (verification engine) |
| Admin v1/v2 parallel pages | Two admin implementations exist side-by-side | Phase 4 (consolidate) |
| Provider photo hosting | `photo_url` column exists but no upload/storage strategy | Phase 5 (portal build) |

---

## 6. Summary

| Category | Count | Phase 3 | Phase 4 | Phase 5+ | Phase 6+ |
|----------|-------|---------|---------|----------|----------|
| Phase 3 scope | 5 | 5 | — | — | — |
| UX/flow | 9 | — | 9 | — | — |
| Security hardening | 4 | — | 4 | — | — |
| Accessibility | 11 | — | 8 | 3 | — |
| i18n | 1 | — | — | 1 | — |
| Reviews/trust | 4 | — | — | 4 | — |
| Portal | 2 | — | — | 2 | — |
| Monetization | 1 | — | — | — | 1 |
| Infrastructure/DX | 8 | 1 | 4 | 3 | — |
| **Total** | **45** | **6** | **25** | **13** | **1** |
