# PROVIDER DIRECTORY — COMPREHENSIVE AUDIT FINDINGS

**Auditor:** Claude Code
**Date:** 2026-04-18
**Scope:** Full user-facing directory + missing systems from April 10 plan + cross-cutting
**Code version:** 489c8501be082b6eb547bbe6c6ff4cb217724c14
**Branch:** fix/dark-mode-2026-04-16

---

## EXECUTIVE SUMMARY

- **Zero i18n coverage:** Every provider-facing string is hardcoded English across all 18+ components and 6 pages — the platform supports 5 languages but the provider directory is English-only.
- **Trust signals are nearly absent:** No reviews, no ratings, no "how we verify" explainer, no distinction between seeded (NPI-scraped) and claimed profiles. Users have no basis to trust 423K listings.
- **International users dead-end:** The directory is US-only but displayed to global users (the platform is multilingual) with zero acknowledgment, no alternative resources, and no graceful degradation.
- **Stripe is not wired up at all:** Zero Stripe imports in the entire codebase. The 3-tier pricing model (Free/$50/$120) exists only as hardcoded constants; no checkout, webhook, or subscription lifecycle.
- **Portal V2 is 30% built:** Dashboard works, Basic+Practice profile tabs work, but 6 of 8 profile tabs, reviews, analytics, verification, subscription, and settings pages are all stubs or placeholders.
- **Provider analytics events silently lose data on flush failure:** The event queue is spliced before insert — if Supabase rejects the batch, those events are permanently lost.

**Findings count by severity:**
- P0 (critical / broken): 5
- P1 (high / significant UX failure or missing core feature): 18
- P2 (medium / polish or inconsistency): 16
- P3 (low / nice-to-have): 8
- **Total:** 47

---

## 1. CURRENT STATE INVENTORY

### 1.1 Routes

| Route | Component | Auth | Role Guard |
|-------|-----------|------|------------|
| `/providers` | ProvidersLandingPage | No | — |
| `/providers/search` | ProviderSearchPage | No | — |
| `/providers/:id` | ProviderProfilePage | No | — |
| `/for-providers` | ForProvidersLandingPage | No | — |
| `/for-providers/apply` | ProviderApplyPage | No | — |
| `/for-providers/claim` | ProviderClaimPage | No | — |
| `/portal` | PortalLayout > PortalDashboard | Yes | provider, admin |
| `/portal/profile` | PortalProfile | Yes | provider, admin |
| `/portal/reviews` | PortalReviews | Yes | provider, admin |
| `/portal/verification` | PortalVerification | Yes | provider, admin |
| `/portal/subscription` | PortalSubscription | Yes | provider, admin |
| `/portal/analytics` | PortalAnalytics | Yes | provider, admin |
| `/portal/settings` | PortalSettings | Yes | provider, admin |
| `/provider` | Redirect → `/portal` | — | — |
| `/provider/profile` | Redirect → `/portal/profile` | — | — |
| `/provider/analytics` | Redirect → `/portal/analytics` | — | — |
| `/provider/patients` | Redirect → `/portal` | — | — |
| `/find-care` | Redirect → `/providers` | — | — |
| `/providers/register` | Redirect → `/for-providers/apply` | — | — |

### 1.2 Components

**Pages:**
- `src/pages/providers/ProvidersLandingPage.tsx`
- `src/pages/providers/ProviderSearchPage.tsx`
- `src/pages/providers/ProviderProfilePage.tsx`
- `src/pages/providers/ForProvidersLandingPage.tsx`
- `src/pages/providers/ProviderApplyPage.tsx`
- `src/pages/providers/ProviderClaimPage.tsx`

**Portal Pages:**
- `src/pages/portal/PortalDashboard.tsx`
- `src/pages/portal/PortalProfile.tsx`
- `src/pages/portal/PortalReviews.tsx`
- `src/pages/portal/PortalVerification.tsx`
- `src/pages/portal/PortalSubscription.tsx`
- `src/pages/portal/PortalAnalytics.tsx`
- `src/pages/portal/PortalSettings.tsx`

**Cards & Search:**
- `src/components/providers/cards/ProviderCard.tsx` — full card for search results
- `src/components/providers/cards/ProviderCardCompact.tsx` — compact card for quick match
- `src/components/providers/cards/ProviderCardSkeleton.tsx` — loading skeleton
- `src/components/providers/search/ProviderFilterPanel.tsx` — sidebar/mobile filter
- `src/components/providers/search/ProviderResultsGrid.tsx` — results grid
- `src/components/providers/search/ProviderResultsEmpty.tsx` — no results
- `src/components/providers/search/ProviderSearchBar.tsx` — search input
- `src/components/providers/search/ProviderFilterChips.tsx` — active filter chips
- `src/components/providers/search/ProviderSortDropdown.tsx` — sort control
- `src/components/providers/search/VerificationCTA.tsx` — provider recruitment CTA

**Onboarding:**
- `src/components/providers/onboarding/ProviderApplyForm.tsx` — 6-step application
- `src/components/providers/onboarding/ProviderClaimForm.tsx` — NPI claim flow
- `src/components/providers/onboarding/ProviderTierSelector.tsx` — tier picker

**Shared:**
- `src/components/providers/shared/ProviderQuickMatch.tsx` — navigator → provider widget

**Legacy (pre-V2):**
- `src/components/providers/ProviderCard.tsx` — old card with different Provider type
- `src/components/pages/ProviderProfile.tsx` — old profile page
- `src/components/pages/ProviderDirectory.tsx` — old directory page
- `src/components/pages/ProviderOnboarding.tsx` — old onboarding

### 1.3 Services & Hooks

**Services:**
- `src/lib/providers/queries.ts` — V2 search (RPC → direct → mock), getById, lookups, claim, application
- `src/lib/providers/types.ts` — V2 type definitions
- `src/services/providerService.ts` — legacy service (parallel path, different types)
- `src/services/provider-portal.ts` — portal dashboard service (getMyProvider, stats, trust)
- `src/services/provider-analytics.ts` — event tracking (batched inserts, visitor ID)
- `src/lib/provider-tier.ts` — tier constants, access checks, pricing
- `src/lib/ai/providers.ts` — AI-facing search (separate `ai_providers` table)

**Hooks:**
- `src/hooks/useProviderSearch.ts` — URL-param-driven search state
- `src/hooks/useProviderFilters.ts` — thin wrapper on ProviderLookupsContext
- `src/hooks/useProviderProfile.ts` — single provider fetch
- `src/hooks/useProviderPortal.ts` — React Query hooks for portal (myProvider, stats, trustScore)

**Context:**
- `src/context/ProviderLookupsContext.tsx` — app-wide lookup data (types, specialties, languages, competencies, insurance)

### 1.4 Database Objects

**Tables:** providers, provider_types, specialties, languages_lookup, cultural_competencies, insurance_plans, provider_locations, provider_specialties, provider_languages, provider_cultural_competencies, provider_insurance, provider_verifications, provider_applications, provider_favorites, provider_analytics_events, provider_reviews, provider_trust_scores

**RPC Functions:** `search_providers_v2` (14 params, enriched card data + total_count)

**Migrations (provider-related):**
- `20260306000001` — V2 core schema (providers, lookups, junctions, locations, verifications)
- `20260306000002` — Lookup data seed (types, specialties, languages, competencies, insurance)
- `20260306000003` — Fix provider_insurance FK
- `20260306000004` — search_providers_v2 RPC v1
- `20260306000005` — Enriched search_providers_v2 RPC v2
- `20260310000003` — Provider applications table + verification tier system
- `20260316000019` — pg_trgm indexes, composite indexes, performance tuning
- `20260325000002` — provider_favorites table
- `20260411000001` — provider_analytics_events table
- `20260411000002` — provider_reviews table (5-dimension, quarterly rate-limit)
- `20260411000003` — provider_trust_scores table (materialized, nightly compute)
- `20260411000005` — Tier migration: 2-tier → 3-tier (free/pro/elite)

### 1.5 External Integrations

| Integration | Status | Notes |
|-------------|--------|-------|
| NPPES NPI API | Active | Used in NPI verification during claim flow |
| Stripe | **Not present** | Zero imports, zero config, zero edge functions |
| SendGrid/Resend | Not found | No transactional email for provider onboarding |
| Plausible Analytics | Active (site-wide) | No provider-specific custom events |
| Sentry/LogRocket | Not found | No error monitoring |

### 1.6 Static-Check Status

| Check | Result |
|-------|--------|
| `npm run build` | **PASS** — builds in 18.55s |
| `npx tsc --noEmit` | **PASS** — zero type errors |
| `npx eslint` | **FAIL** — ESLint 9 migration needed (no eslint.config.js), `.eslintrc`-based config not recognized |

---

## 2. LAYER 1 FINDINGS — EXISTING USER-FACING DIRECTORY

### 2.1 Search & Filters

#### Finding #001 — Fallback to mock data can silently mislead users

- **Severity:** P1
- **Category:** Search
- **Location:** `src/lib/providers/queries.ts:339-361`
- **Observed behavior:** If both RPC and direct Supabase queries fail, `searchProviders()` falls back to 6 hardcoded mock providers from `src/data/providers.ts` — displayed identically to real providers with no visual distinction.
- **Expected behavior:** Mock fallback should either show a "showing sample results — database unavailable" banner, or the fallback should be disabled in production.
- **User impact:** Users in production could see 6 fake providers and try to contact them. Extremely damaging to trust.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** Yes — modifies cascade behavior (but only adds a visual indicator, not a redesign)

#### Finding #002 — Direct query fallback limited to 1000 rows

- **Severity:** P2
- **Category:** Search
- **Location:** `src/lib/providers/queries.ts:279`
- **Observed behavior:** `searchViaDirectQuery()` caps at `.limit(1000)` then applies client-side filtering. With 423K providers, many valid results are silently excluded.
- **Expected behavior:** If RPC fails and direct query activates, the 1000-row cap should be documented in the UI or use server-side filtering.
- **User impact:** Rare (only triggers if RPC fails), but when it does, results are incomplete with no indication.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #003 — Search debounce at 300ms with no minimum query length

- **Severity:** P2
- **Category:** Search
- **Location:** `src/hooks/useProviderSearch.ts` (debounce logic)
- **Observed behavior:** Search fires on every character after 300ms debounce. A single-character query like "a" triggers a full RPC search across 423K providers.
- **Expected behavior:** Minimum 2-3 character threshold before triggering search, or server-side optimization for short queries.
- **User impact:** Slow results for single-character queries; unnecessary DB load.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #004 — Geolocation error silently swallowed

- **Severity:** P2
- **Category:** Search
- **Location:** `src/components/providers/search/ProviderSearchBar.tsx` (requestLocation function)
- **Observed behavior:** If the browser geolocation API fails (permission denied, timeout), the spinner stops but no error message is shown. The user gets zero feedback.
- **Expected behavior:** Toast or inline message: "Location access denied" or "Unable to determine location."
- **User impact:** Users who deny location permission don't know why "Near me" didn't work.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #005 — Insurance filter silently truncated to 15 options

- **Severity:** P1
- **Category:** Search / Filters
- **Location:** `src/components/providers/search/ProviderFilterPanel.tsx` (insurance section)
- **Observed behavior:** Insurance plans are hardcoded `.slice(0, 15)` with no "Show more" option. The database has 35+ plans. Users with plans 16-35+ cannot filter for their insurance.
- **Expected behavior:** Either show all plans with search/scroll, or add a "Show all" toggle like specialties have.
- **User impact:** ~57% of insurance plans are inaccessible through the filter. Insurance is a primary decision factor for US patients.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #006 — URL state does not persist filter selections

- **Severity:** P1
- **Category:** Search
- **Location:** `src/hooks/useProviderSearch.ts` (URL param sync)
- **Observed behavior:** `useProviderSearch` reads URL params on mount and updates them via `setParams`, but the sync relies on `searchParams.toString()` in the dependency array. Complex filter states (arrays of IDs for specialties, languages, insurance) may not roundtrip correctly through URL encoding.
- **Expected behavior:** All active filters should be shareable via URL and survive browser refresh.
- **User impact:** Sharing a filtered search link may not reproduce the same results. Back-button may reset filters.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #007 — Premium-first sort order not disclosed to users

- **Severity:** P1
- **Category:** Search / Trust
- **Location:** `src/lib/providers/queries.ts:176-191` (sortProviderCards)
- **Observed behavior:** Default "relevance" sort orders elite > pro > free, then verified, then alphabetical. This is not disclosed anywhere in the UI — no "Sponsored" label, no "Premium listing" badge, no sort explanation.
- **Expected behavior:** FTC guidelines suggest disclosing paid placement. At minimum, premium listings should be labeled "Featured" or the sort should be described.
- **User impact:** Users may believe the first result is the "best" match when it's actually the highest-paying tier.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No (flagging disclosure, not changing sort behavior)

#### Finding #008 — No result count display during active search

- **Severity:** P2
- **Category:** Search
- **Location:** `src/pages/providers/ProviderSearchPage.tsx` (results header)
- **Observed behavior:** The search page shows "Showing X of Y providers" only after results load. During loading, the count disappears.
- **Expected behavior:** Previous count should remain visible during loading to prevent layout shift.
- **User impact:** Minor visual jitter on each search.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

### 2.2 Provider Card & Profile Page

#### Finding #009 — Provider card details grid doesn't collapse on mobile

- **Severity:** P2
- **Category:** Cards / Mobile
- **Location:** `src/components/providers/cards/ProviderCard.tsx` (details grid)
- **Observed behavior:** The details grid uses `grid-cols-2` with no responsive collapse. On 320px screens, the 2-column grid becomes cramped with text truncation.
- **Expected behavior:** `grid-cols-1 sm:grid-cols-2` to stack on small screens.
- **User impact:** Mobile users (likely majority) see cramped, hard-to-read provider details.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #010 — Duplicate ProviderCard components with different types

- **Severity:** P2
- **Category:** Cards
- **Location:** `src/components/providers/ProviderCard.tsx` (root) vs `src/components/providers/cards/ProviderCard.tsx`
- **Observed behavior:** Two files named `ProviderCard.tsx` exist. The root one uses the legacy `Provider` type; the `cards/` one uses `ProviderCardData`. Different rendering, different data models.
- **Expected behavior:** Legacy card should be removed or renamed to prevent confusion.
- **User impact:** None directly, but increases maintenance risk and import confusion.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #011 — Legacy ProviderCard "Book" button has no handler

- **Severity:** P2
- **Category:** Cards
- **Location:** `src/components/providers/ProviderCard.tsx:118`
- **Observed behavior:** The "Book" button renders but has no `onClick` handler. Clicking it does nothing.
- **Expected behavior:** Either wire up booking or remove the dead button.
- **User impact:** Dead UI element if legacy card surfaces anywhere.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #012 — No credential glossary or tooltip

- **Severity:** P1
- **Category:** Cards / Trust
- **Location:** `src/components/providers/cards/ProviderCard.tsx` (credentials display)
- **Observed behavior:** Credentials like "LCSW", "PsyD", "LMHC" are displayed as-is. No tooltip, glossary, or expansion.
- **Expected behavior:** Hover/tap tooltip expanding the credential acronym (e.g., "LCSW — Licensed Clinical Social Worker").
- **User impact:** Most users don't know what these credentials mean. This is a primary trust/decision factor.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #013 — Provider profile page has no structured data / JSON-LD

- **Severity:** P1
- **Category:** Cards / SEO
- **Location:** `src/pages/providers/ProviderProfilePage.tsx`
- **Observed behavior:** Profile pages have dynamic `<title>` and meta description via SEO component but no JSON-LD structured data (`@type: Physician`, `MedicalBusiness`, or `LocalBusiness`).
- **Expected behavior:** Each provider profile should emit JSON-LD for search engine rich results (name, credentials, address, specialties, NPI).
- **User impact:** No rich snippets in Google search. Major SEO miss for 423K indexable pages.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #014 — Skeleton loader missing accessibility attributes

- **Severity:** P3
- **Category:** Cards / A11y
- **Location:** `src/components/providers/cards/ProviderCardSkeleton.tsx`
- **Observed behavior:** Skeleton uses `animate-pulse` but has no `aria-busy="true"`, `role="status"`, or `aria-label`.
- **Expected behavior:** `aria-busy="true" role="status" aria-label="Loading provider card"` on the skeleton container.
- **User impact:** Screen reader users have no indication that content is loading.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #015 — Skeleton doesn't match ProviderCard structure

- **Severity:** P3
- **Category:** Cards
- **Location:** `src/components/providers/cards/ProviderCardSkeleton.tsx`
- **Observed behavior:** Skeleton is missing placeholder bars for cultural competencies, insurance summary, and bio preview sections that exist in the real ProviderCard.
- **Expected behavior:** Skeleton shape should mirror actual card layout to prevent layout shift.
- **User impact:** Visual jitter when skeleton is replaced by real card.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

### 2.3 Empty States

#### Finding #016 — International users dead-end with no acknowledgment

- **Severity:** P0
- **Category:** Empty States
- **Location:** `src/components/providers/search/ProviderResultsEmpty.tsx`, `src/pages/providers/ProvidersLandingPage.tsx`
- **Observed behavior:** The platform supports 5 languages (EN, PT, ES, SV, FR) targeting users in Bangladesh, Brazil, Sweden, Portugal, and France. The directory contains exclusively US providers (423K NPI-seeded). A non-US user searching for providers sees generic "No results found" with no explanation that the directory is US-only, no alternative resources, and no international crisis lines.
- **Expected behavior:** Detect non-US user context (locale, explicit country filter) and show: "The Psychage Provider Directory currently covers the United States. For international mental health resources, see [country-specific links]." Include international crisis lines per the existing crisis resources.
- **User impact:** Every non-US user. Platform's multilingual investment is undermined by a US-only directory with no acknowledgment.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #017 — No filter-bottleneck indication

- **Severity:** P2
- **Category:** Empty States
- **Location:** `src/components/providers/search/ProviderResultsEmpty.tsx`
- **Observed behavior:** When 0 results match, the empty state says "No providers match your filters" and offers "Clear all filters." It doesn't tell the user WHICH filter is the bottleneck.
- **Expected behavior:** "No providers matched your filters. Try removing: [Insurance: Cigna] or [State: Wyoming]" — show which filters are most restrictive.
- **User impact:** Users clear all filters instead of adjusting one, losing their other selections.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #018 — Default landing shows no providers (requires search)

- **Severity:** P2
- **Category:** Empty States
- **Location:** `src/pages/providers/ProvidersLandingPage.tsx`
- **Observed behavior:** The landing page shows a hero, trust indicators, browse-by-type cards, and how-it-works section — but no actual providers. Users must click through to `/providers/search` to see any results.
- **Expected behavior:** Show a curated "Featured providers" or "Providers near you" section on the landing page to demonstrate that real providers exist.
- **User impact:** First-time visitors don't see any evidence of real provider data until they actively search.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

### 2.4 Mobile Experience

#### Finding #019 — ProvidersLandingPage animations ignore prefers-reduced-motion

- **Severity:** P2
- **Category:** Mobile / A11y
- **Location:** `src/pages/providers/ProvidersLandingPage.tsx`
- **Observed behavior:** Framer Motion animations (`initial/animate/whileInView`) are always applied. Only `ForProvidersLandingPage.tsx` checks `useReducedMotion()`. The landing and search pages do not.
- **Expected behavior:** All provider pages should respect `prefers-reduced-motion` by either disabling or reducing animations.
- **User impact:** Users with motion sensitivity see animations they explicitly opted out of.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #020 — Sort dropdown has no keyboard navigation

- **Severity:** P2
- **Category:** Mobile / A11y
- **Location:** `src/components/providers/search/ProviderSortDropdown.tsx`
- **Observed behavior:** The dropdown has correct `role="listbox"` and `aria-expanded` but does not support arrow key navigation between options. Only mouse/touch click works.
- **Expected behavior:** Arrow keys should move between options; Enter/Space should select; Escape should close.
- **User impact:** Keyboard-only and screen reader users cannot change sort order.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #021 — Filter panel missing aria-expanded on collapsible sections

- **Severity:** P3
- **Category:** Mobile / A11y
- **Location:** `src/components/providers/search/ProviderFilterPanel.tsx` (More filters toggle)
- **Observed behavior:** The "More filters" / "Fewer filters" button toggles visibility but lacks `aria-expanded` attribute.
- **Expected behavior:** `aria-expanded={showMore}` on the toggle button.
- **User impact:** Screen reader users don't know if the section is expanded.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

### 2.5 Performance

#### Finding #022 — All-articles chunk is 36.5 MB (blocks initial load)

- **Severity:** P0
- **Category:** Performance
- **Location:** `dist/assets/all-articles-Dko6dB6l.js` (36,560.52 kB)
- **Observed behavior:** Vite build produces a single 36.5 MB chunk for all articles. While this is code-split, any route that imports article data (including provider pages that reference article categories for specialty mapping) may pull in this chunk.
- **Expected behavior:** Article data should be lazy-loaded per-category, not bundled monolithically.
- **User impact:** If any provider page transitively imports article data, users download 36.5 MB before seeing providers.
- **Fix complexity:** L
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #023 — No list virtualization for large result sets

- **Severity:** P1
- **Category:** Performance
- **Location:** `src/components/providers/search/ProviderResultsGrid.tsx`
- **Observed behavior:** Results render via `.map()` into DOM nodes. With pagination at 20 per page this is acceptable, but if `loadMore()` is clicked repeatedly (e.g., 10 times = 200 cards), all 200 DOM nodes are rendered simultaneously.
- **Expected behavior:** Either paginate with page replacement (not append) or virtualize the list (e.g., `@tanstack/react-virtual`).
- **User impact:** After several "Load More" clicks, scrolling becomes janky on low-end mobile devices.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #024 — ProviderLookupsContext uses Promise.all — one failure kills all filters

- **Severity:** P1
- **Category:** Performance / Reliability
- **Location:** `src/context/ProviderLookupsContext.tsx`
- **Observed behavior:** All 5 lookup queries (types, specialties, languages, competencies, insurance) are fetched via `Promise.all()`. If any single query fails (e.g., transient network error on `cultural_competencies`), all lookups fail and the entire filter panel shows loading skeletons indefinitely.
- **Expected behavior:** Use `Promise.allSettled()` so partial results are still usable. If specialties load but insurance doesn't, show available filters.
- **User impact:** Transient error on one lookup table disables all filtering.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #025 — No React Query caching for search results

- **Severity:** P2
- **Category:** Performance
- **Location:** `src/hooks/useProviderSearch.ts`
- **Observed behavior:** Search results are stored in React component state, not React Query. When a user navigates to a provider profile and hits "Back," the search re-executes from scratch.
- **Expected behavior:** Wrap search in React Query with appropriate `staleTime` so back-navigation is instant.
- **User impact:** Every "back to results" navigation triggers a fresh API call with loading spinner.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

### 2.6 Trust Signals

#### Finding #026 — No "How we verify providers" explanation anywhere

- **Severity:** P0
- **Category:** Trust
- **Location:** All provider pages
- **Observed behavior:** There is no page, modal, tooltip, or section anywhere in the directory that explains where the 423K listings come from, how NPI verification works, or what "verified" means on Psychage.
- **Expected behavior:** A prominent "How we verify" section on the landing page and a link on every provider card. Content: "All providers are sourced from the federal NPI Registry maintained by CMS. NPI verification confirms the provider holds an active National Provider Identifier and practices in a mental health taxonomy."
- **User impact:** Zero trust foundation. Users have no reason to believe these listings are real or vetted. This is the single biggest UX gap in the directory.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #027 — No visual distinction between seeded and claimed providers

- **Severity:** P1
- **Category:** Trust
- **Location:** `src/components/providers/cards/ProviderCard.tsx`
- **Observed behavior:** Seeded providers (NPI-scraped, unclaimed, minimal data) and claimed providers (verified, enriched profiles) look identical in search results. The only difference is a subtle border-left color that users can't interpret.
- **Expected behavior:** Claimed profiles should show a prominent "Verified Profile" badge. Seeded profiles should show "Information from federal NPI registry — this provider has not verified their profile on Psychage."
- **User impact:** Users can't distinguish auto-imported listings from provider-curated profiles. Undermines the entire claim-incentive story.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #028 — No reviews or ratings visible anywhere

- **Severity:** P1
- **Category:** Trust
- **Location:** All provider pages
- **Observed behavior:** The `provider_reviews` table exists with 5-dimension ratings and the `provider_trust_scores` table exists with composite scoring, but there is zero review UI in the public directory. No stars, no review counts, no social proof.
- **Expected behavior:** Display composite rating (communication, empathy, professionalism, helpfulness, recommendation averages) on provider cards and profile pages. Show review count.
- **User impact:** The strongest trust signal (peer reviews) is invisible despite the schema being ready.
- **Fix complexity:** M
- **Blocked by:** Review submission UI (#038) must exist for reviews to accumulate
- **Touches sacred items?** No

#### Finding #029 — No "Report incorrect information" link on provider cards

- **Severity:** P2
- **Category:** Trust
- **Location:** `src/components/providers/cards/ProviderCard.tsx`
- **Observed behavior:** Provider profile pages have a "Report a concern" mailto link, but the provider cards in search results do not. Users must open the full profile to report issues.
- **Expected behavior:** A subtle "Report" link or icon on cards for quickly flagging stale NPI data.
- **User impact:** Users who spot incorrect info in search results have no quick way to report it.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #030 — No last-updated date visible

- **Severity:** P2
- **Category:** Trust
- **Location:** `src/pages/providers/ProviderProfilePage.tsx`
- **Observed behavior:** The profile page shows a verification date in the footer but no "last updated" timestamp. For seeded providers, users can't tell if the NPI data is current.
- **Expected behavior:** Show "Data last verified: [date]" or "Profile last updated: [date]" using `data_last_synced_at` or `updated_at`.
- **User impact:** Stale data erodes trust over time.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

### 2.7 End-to-End User Flow

#### Finding #031 — Navigator has no handoff to provider directory

- **Severity:** P1
- **Category:** Flow
- **Location:** `src/components/navigator/ProviderQuestions.tsx`
- **Observed behavior:** After completing the Symptom Navigator, the `ProviderQuestions` component shows questions to ask a provider but has no CTA to actually find a provider. Users are given questions but no way to find someone to ask them to.
- **Expected behavior:** A prominent "Find providers who specialize in [matched conditions]" button linking to `/providers/search?specialty_slugs=[matched-slugs]`.
- **User impact:** The Navigator → Provider flow is completely broken. Users who complete the Navigator have to manually navigate to the directory and re-enter their conditions.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No (Navigator output, not Navigator internals)

#### Finding #032 — MindMate has no provider search integration

- **Severity:** P1
- **Category:** Flow
- **Location:** `src/components/ai/MindMate.tsx`
- **Observed behavior:** An API endpoint exists at `/api/ai/providers/search/route.ts` but MindMate's chat handler never calls it. Users asking "find me a therapist" get no provider results from the AI.
- **Expected behavior:** MindMate should detect provider-search intent and query the same directory data.
- **User impact:** The AI chatbot — a primary engagement feature — cannot help users find providers.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #033 — No provider link in main navigation

- **Severity:** P1
- **Category:** Flow
- **Location:** `src/components/layout/Navigation.tsx`
- **Observed behavior:** The main desktop/mobile navigation has no "Find Care" or "Providers" link. The directory is only discoverable via: homepage hero section, footer links, or direct URL.
- **Expected behavior:** A top-level nav item "Find Care" linking to `/providers`.
- **User impact:** Users who arrive on any non-homepage page (article, tool, dashboard) have no nav path to the directory.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #034 — Legacy /find-care/:id redirect loses provider ID

- **Severity:** P2
- **Category:** Flow
- **Location:** `src/App.tsx:243`
- **Observed behavior:** `<Route path="/find-care/provider/:id" element={<Navigate to="/providers" replace />} />` redirects to `/providers` (landing page), not `/providers/:id`. Any old links to specific provider profiles land on the directory homepage instead of the actual profile.
- **Expected behavior:** Redirect should preserve the ID: `/find-care/provider/:id` → `/providers/:id`.
- **User impact:** All legacy bookmarks and external links to specific providers are broken.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #035 — Favorites require login but no graceful prompt

- **Severity:** P2
- **Category:** Flow
- **Location:** `src/services/providerService.ts` (toggleFavorite)
- **Observed behavior:** `toggleFavorite()` calls `supabase.auth.getUser()` and returns `{ favorited: false }` if not authenticated. There's no UI prompt to log in — the action silently fails.
- **Expected behavior:** If user clicks favorite while logged out, show a login modal that returns them to the same provider after authentication.
- **User impact:** Logged-out users think favorites are broken because nothing happens.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

---

## 3. LAYER 2 FINDINGS — MISSING SYSTEMS

### 3.1 Provider Portal & Dashboard

#### Finding #036 — Portal profile editor: 6 of 8 tabs are stubs

- **Severity:** P1
- **Category:** Portal
- **Location:** `src/pages/portal/PortalProfile.tsx`
- **Observed behavior:** Only Basic Info and Practice tabs are functional. The remaining 6 tabs (Locations, Specialties, Languages, Cultural Competencies, Insurance, Credentials) show "Coming soon" placeholder text.
- **Expected behavior:** All 8 tabs should be functional for providers to manage their complete profile.
- **User impact:** Claimed providers cannot add specialties, languages, insurance, or locations to their profile — making their listing bare and uncompetitive.
- **Fix complexity:** L
- **Blocked by:** —
- **Touches sacred items?** No

**Status: PARTIALLY BUILT**
- PortalDashboard: Real, complete (profile completeness ring, stats, trust score, quick actions)
- PortalProfile: Basic+Practice done, 6 tabs stubbed
- PortalLayout: Complete layout with sidebar navigation
- All other portal pages: stubs/placeholders

### 3.2 Verification Engine

#### Finding #037 — Verification page is static UI with hardcoded status

- **Severity:** P1
- **Category:** Verification
- **Location:** `src/pages/portal/PortalVerification.tsx`
- **Observed behavior:** Displays 3 verification tiers (NPI, License, Psychage Certified) as a visual progression, but all status values are hardcoded in the component. No backend integration. No verification submission workflow. No state license number validation.
- **Expected behavior:** Tier 1 (NPI) should show verified status from `provider_verifications` table. Tier 2 should have a license number submission form. Tier 3 should show eligibility criteria.
- **User impact:** Providers cannot advance their verification beyond NPI check. The verification_tier column in the DB is never updated by UI.
- **Fix complexity:** L
- **Blocked by:** —
- **Touches sacred items?** Yes — touches NPI verification (flags only, doesn't modify)

**Status: ENTIRELY MISSING** (UI shell exists but non-functional)

### 3.3 Trust Score & Reviews

#### Finding #038 — Review submission UI does not exist

- **Severity:** P1
- **Category:** Trust Score
- **Location:** (missing)
- **Observed behavior:** The `provider_reviews` table supports 5-dimension ratings with quarterly rate-limiting. The `provider_trust_scores` table exists for composite scoring. But there is no review submission form anywhere in the app. No way for patients to leave reviews.
- **Expected behavior:** A review submission form on provider profile pages (authenticated users only), gated to one review per provider per quarter.
- **User impact:** The review system is schema-complete but UI-absent. Trust scores will always be zero.
- **Fix complexity:** L
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #039 — Trust score computation edge function does not exist

- **Severity:** P1
- **Category:** Trust Score
- **Location:** `supabase/migrations/20260411000003_provider_trust_scores.sql` (references "compute-trust-scores" Edge Function)
- **Observed behavior:** The migration comment references a nightly "compute-trust-scores" Edge Function that should compute `overall_score = 0.4*verification + 0.25*profile + 0.25*reviews + 0.1*engagement`. This Edge Function is not present in the codebase.
- **Expected behavior:** Edge Function or cron job that materializes trust scores nightly.
- **User impact:** All trust scores remain at 0. The PortalDashboard trust score card shows 0/100 forever.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

**Status: PARTIALLY BUILT** (schema complete, UI absent, computation absent)

### 3.4 Payment Infrastructure

#### Finding #040 — Stripe is completely absent from the codebase

- **Severity:** P0
- **Category:** Payments
- **Location:** (searched entire `src/` directory — zero matches for "stripe" or "@stripe")
- **Observed behavior:** Zero Stripe imports, zero Stripe packages in package.json, zero checkout session creators, zero webhook handlers, zero `stripe_customers` table, zero `provider_subscriptions` table. The tier column exists (free/pro/elite) and tier pricing is hardcoded in `src/lib/provider-tier.ts` ($50/mo pro, $120/mo elite), but there is no payment flow.
- **Expected behavior:** Stripe Billing integration with checkout session creation, webhook handling, subscription lifecycle management, and tier upgrade/downgrade.
- **User impact:** The entire monetization model for the provider directory is non-functional. Providers cannot upgrade to pro/elite. The `ForProvidersLandingPage` pricing section shows prices with "Get Started" buttons that lead to the free apply page regardless of tier selected.
- **Fix complexity:** L
- **Blocked by:** —
- **Touches sacred items?** No

**Status: ENTIRELY MISSING**

### 3.5 Provider Landing / Conversion Page

#### Finding #041 — ForProvidersLandingPage exists and is well-built

- **Severity:** (informational — not a finding, confirming status)
- **Category:** Landing
- **Location:** `src/pages/providers/ForProvidersLandingPage.tsx`
- **Observed behavior:** Full conversion page with: hero, stats bar, 6 platform features, how-it-works, 3 feature deep-dives, pricing with billing toggle, 3 testimonials, 10-item FAQ accordion, bottom CTA. Well-designed, respects `prefers-reduced-motion`, good accessibility on FAQ.
- **Expected behavior:** N/A — this is the one well-executed piece.
- **User impact:** Positive.

**Status: FULLY BUILT** (but pricing CTAs lead to free-only apply flow due to Finding #040)

---

## 4. CROSS-CUTTING FINDINGS

### 4.1 Internationalization

#### Finding #042 — Zero i18n coverage across all provider components

- **Severity:** P0
- **Category:** i18n
- **Location:** All 18+ provider components and 6 pages
- **Observed behavior:** Every user-facing string in the provider directory is hardcoded English. No `t()` calls. Searched all 5 locale files (`en`, `pt`, `es`, `sv`, `fr`) for "provider" — zero matches.
- **Expected behavior:** All strings should use `react-i18next` with translation keys. Provider namespace should exist in all 5 locale files.
- **User impact:** The platform supports 5 languages but the provider directory is English-only. PT/ES/SV/FR users see English UI mixed with their translated navigation/footer.
- **Fix complexity:** L (100+ strings across 18+ files)
- **Blocked by:** —
- **Touches sacred items?** No

### 4.2 Accessibility

#### Finding #043 — Primary teal on white may fail WCAG AA contrast

- **Severity:** P2
- **Category:** A11y
- **Location:** All provider components using `text-teal-600` or `bg-teal-600 text-white`
- **Observed behavior:** The brand primary teal `#1A9B8C` has a contrast ratio of ~3.5:1 against white (`#FFFFFF`), which fails WCAG AA (requires 4.5:1 for normal text). Multiple provider components use teal text on white backgrounds.
- **Expected behavior:** Text should meet WCAG AA. Use a darker teal shade for text (e.g., `teal-700` or `teal-800`) or ensure teal is only used on large text (3:1 threshold).
- **User impact:** Users with low vision or color blindness may struggle to read teal text.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #044 — Provider card contact buttons are 14px icons

- **Severity:** P3
- **Category:** A11y / Mobile
- **Location:** `src/components/providers/cards/ProviderCard.tsx` (footer action buttons)
- **Observed behavior:** Phone, email, and website buttons use `size={14}` Lucide icons. While the button itself may be larger, the icon target appears small.
- **Expected behavior:** Touch targets should be at least 44x44px per WCAG 2.5.5.
- **User impact:** Mobile users may mis-tap the small icon buttons.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

### 4.3 SEO

#### Finding #045 — No sitemap generation for 423K provider profiles

- **Severity:** P1
- **Category:** SEO
- **Location:** `src/pages/SitemapPage.tsx`
- **Observed behavior:** The sitemap page includes 4 static provider routes (`/providers`, `/providers/search`, `/for-providers`, `/for-providers/apply`) but does not include individual provider profile URLs (`/providers/:id`). With 423K providers, there is no sitemap strategy for these indexable pages.
- **Expected behavior:** Generate a sitemap index with paginated sitemap files (50K URLs per file per Google's limit) via a server-side script or Vercel edge function. The `SitemapPage` is a user-facing HTML page, not an XML sitemap.
- **User impact:** Search engines cannot discover individual provider profiles. 423K potential landing pages are invisible to Google.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

### 4.4 Analytics & Observability

#### Finding #046 — Analytics event queue silently loses data on flush failure

- **Severity:** P0
- **Category:** Analytics
- **Location:** `src/services/provider-analytics.ts` (flushEvents function)
- **Observed behavior:** `flushEvents()` splices events from the queue BEFORE attempting the Supabase insert. If the insert fails, those events are permanently lost. No retry, no dead-letter queue, no error logging.
- **Expected behavior:** Splice events AFTER successful insert. On failure, push events back into the queue or log to console. Add retry with exponential backoff.
- **User impact:** Provider analytics (the foundation for the portal dashboard's visibility metrics) are unreliable. Providers may see undercounted profile views.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #047 — No Plausible custom events for provider actions

- **Severity:** P2
- **Category:** Analytics
- **Location:** `src/lib/analytics/plausible.ts`
- **Observed behavior:** Plausible is initialized for page views but no custom events exist for: provider search initiation, filter usage, profile view, contact click-through, favorite toggle, application submission, or claim completion.
- **Expected behavior:** Custom Plausible events for key provider funnel steps to inform product decisions.
- **User impact:** Ryan cannot measure provider directory engagement from Plausible dashboard.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

---

## 5. PRIORITIZED FIX RECOMMENDATIONS

Ordered by (user impact × prevalence) ÷ fix complexity:

| # | Finding | Sev | Complexity | Rationale |
|---|---------|-----|-----------|-----------|
| 1 | #042 — Zero i18n coverage | P0 | L | Platform is multilingual; directory is English-only. Affects all non-EN users. |
| 2 | #026 — No "how we verify" explanation | P0 | M | Biggest trust gap. Users have zero basis to trust 423K listings. |
| 3 | #016 — International users dead-end | P0 | M | Non-US users hit a wall with no acknowledgment. |
| 4 | #046 — Analytics event data loss | P0 | S | Silent data loss undermines portal dashboard metrics. Quick fix. |
| 5 | #040 — Stripe completely absent | P0 | L | Entire monetization model is non-functional. |
| 6 | #027 — No seeded vs claimed distinction | P1 | M | Undermines claim incentive and user trust. |
| 7 | #033 — No nav link to directory | P1 | S | Directory undiscoverable from non-homepage pages. Quick fix. |
| 8 | #031 — Navigator → provider handoff broken | P1 | S | Key user flow is severed. Quick fix. |
| 9 | #005 — Insurance filter truncated to 15 | P1 | S | 57% of insurance plans hidden. Quick fix. |
| 10 | #012 — No credential glossary | P1 | S | Users can't decode "LCSW" etc. Quick fix. |
| 11 | #007 — Premium sort undisclosed | P1 | S | FTC disclosure concern. Quick fix. |
| 12 | #028 — No reviews visible | P1 | M | Schema ready, UI absent. |
| 13 | #013 — No JSON-LD structured data | P1 | M | 423K pages missing rich snippets. |
| 14 | #045 — No XML sitemap for providers | P1 | M | 423K pages invisible to search engines. |
| 15 | #032 — MindMate has no provider search | P1 | M | AI chatbot can't help find providers. |
| 16 | #036 — 6 portal profile tabs are stubs | P1 | L | Claimed providers can't complete profiles. |
| 17 | #038 — Review submission UI missing | P1 | L | Schema ready, no submission path. |
| 18 | #039 — Trust score Edge Function missing | P1 | M | All scores stuck at 0. |
| 19 | #001 — Mock data fallback misleads users | P1 | S | Fake providers shown as real. |
| 20 | #024 — Promise.all kills all filters on one failure | P1 | S | Quick fix to Promise.allSettled. |
| 21 | #006 — URL filter state fragile | P1 | M | Search results not shareable. |
| 22 | #034 — Legacy redirect loses provider ID | P2 | S | Old bookmarks broken. Quick fix. |
| 23 | #025 — No React Query cache for search | P2 | M | Back-navigation re-fetches every time. |
| 24 | #022 — 36.5 MB article chunk | P0 (perf) | L | May affect load time if transitively imported. |

---

## 6. OPEN QUESTIONS FOR RYAN

1. **Stripe provider:** Has a Stripe account been created for Psychage? Is the plan to use Stripe Billing (subscriptions) or Stripe Checkout (one-time)?

2. **Transactional email:** What email service (SendGrid, Resend, Postmark?) is planned for provider onboarding notifications, application status updates, and review alerts? No email service env vars exist.

3. **Trust score computation:** The migration references a nightly Edge Function `compute-trust-scores`. Is this planned as a Supabase Edge Function, a Vercel cron, or an external service?

4. **International expansion timeline:** The directory is US-only (NPI-based). Is international provider data planned? If not near-term, how should we handle non-US users (redirect to crisis resources, waitlist signup, or something else)?

5. **`ai_providers` table:** `src/lib/ai/providers.ts` queries a separate `ai_providers` table that doesn't appear in the provider V2 migrations. Is this a legacy table? Is it synced with `providers`? Can MindMate use the main `providers` table via the existing search RPC instead?

6. **Admin panel architecture:** There are two admin implementations — v1 (`ProviderManagement.tsx`, `ProviderDetailAdmin.tsx`) and v2 (`ProviderList.tsx`, `ProviderEditor.tsx`). Which is canonical? Should v1 be removed?

7. **ESLint migration:** ESLint 9 is installed but no `eslint.config.js` exists (still using `.eslintrc`). Should we migrate the ESLint config as part of this work or separately?

8. **Review moderation:** The `provider_reviews` table has `moderated_by` and `flagged_reason` columns. Is moderation manual (admin panel) or automated (keyword filter)? Who is the moderation team?

9. **Provider photo hosting:** Provider `photo_url` column exists but where are photos stored? Supabase Storage? External CDN? Most seeded providers have no photo — is there a plan to source photos?

10. **Testimonial content on ForProvidersLandingPage:** The 3 testimonials reference specific providers ("Dr. Sarah Chen", "Dr. Michael Torres", "Rebecca Martinez") with photos at `/images/providers/provider-*.jpg`. Are these real testimonials from real providers, or placeholder content?

---

## 7. SACRED ITEMS STATUS

| Sacred Item | Status | Notes |
|-------------|--------|-------|
| `search_providers_v2` RPC | ✅ Present | Defined in migration `20260306000005`. Enriched v2 with 21 return columns. No bugs found in RPC itself. Integration issue: UI passes `p_verification_status` but this param is not in the original v1 RPC — confirmed it was added in enriched v2. |
| NPI seed data path | ✅ Intact | `src/lib/providers/seed-bulk.ts` exists. 423,404 providers seeded. Not re-running. |
| Cascading fallback | ✅ Intact | RPC → direct query → mock data. Finding #001 flags mock data trust issue (disclosure, not redesign). |
| NPI verification against NPPES | ✅ Intact | Used in claim flow (`ProviderClaimForm.tsx`). 10-digit validation, NPPES API lookup. |
| Database schema core | ✅ Intact | All tables present. `provider_reviews` and `provider_trust_scores` added per April 10 plan. 3-tier migration applied. |
| 0.75 Navigator confidence cap | ✅ Not violated | Provider code does not touch Navigator scoring. `ProviderQuickMatch.tsx` maps condition IDs to specialty slugs without modifying confidence. |
| Crisis detection | ✅ Reachable | CrisisBanner remains in layout on all provider pages. Crisis link available during preloader. Footer crisis link present. Finding #016 notes international users need country-specific crisis resources. |

---

## 8. AUDIT VALIDATION

**Zero files modified outside `.audit/`:**
- ✅ Confirmed. Only `.audit/PROVIDER_DIRECTORY_ISSUES.md` created/modified.

**`git status` output:**
```
?? .ux/
?? src/lib/article-category-to-specialty.ts
```
(`.audit/` existed prior to this audit with a `sacred-keeps.txt` file — the only new file is this report.)

**Build status:**
- ✅ `npm run build` — PASS (18.55s)
- ✅ `npx tsc --noEmit` — PASS (zero type errors)
- ⚠️ `npx eslint` — FAIL (ESLint 9 config migration needed — pre-existing issue, not caused by audit)

**Files read during audit:** ~65 files
**Total lines of code reviewed:** ~8,000+ lines (services, hooks, components, pages, migrations, types)
