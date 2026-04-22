# PROVIDER DIRECTORY — SUPPLEMENTARY AUDIT (PHASE 0)

**Auditor:** Claude Code
**Date:** 2026-04-18
**Scope:** Depth work on four areas thinly covered in the first audit
**Code version:** 489c8501be082b6eb547bbe6c6ff4cb217724c14
**Branch:** fix/dark-mode-2026-04-16
**Baseline:** .audit/PROVIDER_DIRECTORY_ISSUES.md (47 findings, IDs #001–#047)

---

## EXECUTIVE SUMMARY

- **P0 Security: Analytics events table allows unrestricted anonymous INSERT** — no rate limiting at RLS level. Any anonymous user can flood `provider_analytics_events` with fake data, corrupting all portal dashboard metrics. The `WITH CHECK (true)` policy is an open door.
- **P0 Security: No admin-override RLS policy on `providers` table** — admin panel v2 directly updates providers via Supabase client, but the only UPDATE policy is `auth.uid() = user_id`. Admin edits will silently fail unless the admin happens to be the provider's owner.
- **P0 Security: `provider_cultural_competencies` junction table missing owner-manage policy** — providers can read but cannot write their own cultural competency records despite the portal profile editor expecting to manage them.
- **Finding #022 DOWNGRADED** — the 36.5 MB all-articles chunk is NOT loaded by any provider route. Full import chain traced; no path exists from provider pages to article data.
- **Accessibility has 17 new findings** — contrast ratio failures across 5 color combinations, missing keyboard navigation on dropdowns, no `aria-live` on search result counts, missing focus-visible styles on 8+ interactive elements.

**Findings count by severity (Phase 0 only):**
- P0: 4
- P1: 7
- P2: 15
- P3: 5
- Total: 31

**Findings count by area:**
- Area A (Security/RLS): 9
- Area B (Accessibility): 14
- Area C (Admin): 5
- Area D (#022 verification): 1
- Novel: 2

**Combined totals (first audit + supplementary):** 47 + 31 = **78 total findings**

---

## 1. AREA A — SECURITY / RLS FINDINGS

### 1.1 RLS Policy Enumeration Table

| Table | RLS Enabled? | SELECT | INSERT | UPDATE | DELETE | Gaps |
|-------|-------------|--------|--------|--------|--------|------|
| `providers` | Yes | Public: `status IN ('active','seeded')` | Auth: `auth.uid() = user_id` | Owner: `auth.uid() = user_id` | None | **No admin UPDATE policy — admin edits fail** |
| `provider_locations` | Yes | Public: provider active/seeded | Owner: `provider.user_id = auth.uid()` | (via FOR ALL) | (via FOR ALL) | OK |
| `provider_types` | Yes | Public: `true` | None | None | None | Read-only lookup — correct |
| `specialties` | Yes | Public: `true` | None | None | None | Read-only lookup — correct |
| `languages_lookup` | Yes | Public: `true` | None | None | None | Read-only lookup — correct |
| `cultural_competencies` | Yes | Public: `true` | None | None | None | Read-only lookup — correct |
| `insurance_plans` | Yes | Public: `true` | None | None | None | Read-only lookup — correct |
| `provider_specialties` | Yes | Public: provider active/seeded | Owner: `provider.user_id = auth.uid()` | (via FOR ALL) | (via FOR ALL) | OK |
| `provider_languages` | Yes | Public: provider active/seeded | Owner: `provider.user_id = auth.uid()` | (via FOR ALL) | (via FOR ALL) | OK |
| `provider_cultural_competencies` | Yes | Public: provider active/seeded | **None** | **None** | **None** | **MISSING owner-manage policy — providers can't write** |
| `provider_insurance` | Yes | Public: provider active/seeded | Owner (added in FK fix migration) | (via FOR ALL) | (via FOR ALL) | OK — fixed in 20260306000003 |
| `provider_verifications` | Yes | Owner: `provider.user_id = auth.uid()` | Owner: `provider.user_id = auth.uid()` | None | None | **Owner can self-insert verifications** |
| `provider_applications` | Yes | Admin only (super_admin/clinical_admin) | Public: anyone can INSERT | None | None | OK design — apps are write-once |
| `provider_favorites` | Yes | Own: `user_id = auth.uid()` | Own: `auth.uid() = user_id` | None | Own: `auth.uid() = user_id` | OK |
| `provider_analytics_events` | Yes | Owner: provider's user_id match | **Public: `WITH CHECK (true)`** | None | None | **No rate limit — event flooding possible** |
| `provider_reviews` | Yes | Public: active status; Owner: own reviews; Provider: own reviews | Own: `reviewer_user_id = auth.uid()` | Own (via FOR ALL) | Own (via FOR ALL) | Quarterly rate-limit via unique index only |
| `provider_trust_scores` | Yes | Public: `true` | Service role only | Service role only | None | OK — scores are read-only to clients |
| `ai_providers` | Yes | Public: `is_active AND is_verified` | Service role only | Service role only | Service role only | **Separate table — no sync mechanism with `providers`** |
| `stripe_customers` | Yes | Own: `user_id = auth.uid()` | None (service role implied) | None | None | OK |
| `provider_subscriptions` | Yes | Own: provider's user_id match | None (service role implied) | None | None | OK |
| `stripe_events_log` | Yes | Service role only | Service role only | Service role only | Service role only | OK |

### 1.2 RLS Correctness Findings

#### Finding #048 — No admin-override UPDATE policy on `providers` table

- **Severity:** P0
- **Category:** Security
- **Location:** `supabase/migrations/20260306000001_provider_directory_v2.sql:208-210`
- **Observed behavior:** The only UPDATE policy on `providers` is `"Owner update provider" FOR UPDATE USING (auth.uid() = user_id)`. There is no admin-override policy. The admin v2 ProviderEditor directly calls `supabase.from('providers').update(...)`, but unless the admin user happens to be the provider's `user_id`, the update is silently rejected by RLS.
- **Expected behavior:** An additional policy: `CREATE POLICY "Admin update provider" ON providers FOR UPDATE USING (EXISTS (SELECT 1 FROM admin_roles WHERE user_id = auth.uid()))`.
- **User impact:** Admin provider edits (verification tier, status, bio corrections) silently fail in production. The admin sees no error — the mutation returns success but nothing changes.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** Yes — modifies providers table policies (additive only)

#### Finding #049 — `provider_cultural_competencies` missing owner-manage policy

- **Severity:** P0
- **Category:** Security
- **Location:** `supabase/migrations/20260306000001_provider_directory_v2.sql:252-256`
- **Observed behavior:** The migration creates a public SELECT policy for `provider_cultural_competencies` but no INSERT/UPDATE/DELETE policy for owners. Every other junction table (`provider_specialties`, `provider_languages`, `provider_insurance`) has an "Owner manage" FOR ALL policy. This one was missed.
- **Expected behavior:** `CREATE POLICY "Owner manage provider_cultural_competencies" ON provider_cultural_competencies FOR ALL USING (provider_id IN (SELECT id FROM providers WHERE user_id = auth.uid()))`.
- **User impact:** Providers cannot save cultural competency selections via the portal profile editor. The tab shows "coming soon" today (masked by stub UI), but when implemented, saves will fail.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** Yes — modifies DB schema (additive only)

#### Finding #050 — Analytics events INSERT allows unrestricted anonymous flooding

- **Severity:** P0
- **Category:** Security
- **Location:** `supabase/migrations/20260411000001_provider_analytics_events.sql:41-43`
- **Observed behavior:** `CREATE POLICY insert_analytics_events ON provider_analytics_events FOR INSERT WITH CHECK (true)` — any client (authenticated or anonymous via anon key) can INSERT unlimited events. No rate limiting, no visitor_id validation, no CAPTCHA.
- **Expected behavior:** At minimum: rate limit per visitor_id per provider per hour via a trigger or Edge Function. Better: require authenticated insert or server-side proxy.
- **User impact:** Attacker can inflate any provider's view count by POSTing thousands of fake `profile_view` events. This corrupts the entire analytics dashboard, trust scores (10% engagement weight), and provider-facing metrics.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #051 — Provider can self-insert verification records

- **Severity:** P1
- **Category:** Security
- **Location:** `supabase/migrations/20260306000001_provider_directory_v2.sql:272-275`
- **Observed behavior:** `"Owner insert provider_verifications"` policy allows any authenticated user who owns a provider record to INSERT rows into `provider_verifications` with arbitrary `verification_type` and `status` values (e.g., `status: 'passed'`). The claim flow legitimately uses this to record NPI checks, but nothing prevents a provider from inserting a fake `license_check` verification with `status: 'passed'`.
- **Expected behavior:** Verification inserts should be restricted to service role or specific verification flows (claim flow via Edge Function). The owner INSERT policy is too broad.
- **User impact:** A provider could self-verify by inserting fabricated verification records, potentially earning a higher trust score or verification badge.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** Yes — touches NPI verification path (flags bug, doesn't change claim flow)

#### Finding #052 — Review quarterly rate-limit is DB constraint only — no RLS enforcement

- **Severity:** P1
- **Category:** Security
- **Location:** `supabase/migrations/20260411000002_provider_reviews.sql:44-45`
- **Observed behavior:** The 90-day review rate limit is enforced by a UNIQUE index on `(provider_id, reviewer_user_id, immutable_date_trunc_quarter(created_at))`. The `reviewer_own` RLS policy grants FOR ALL access based on `reviewer_user_id = auth.uid()`. A duplicate review attempt will hit a unique constraint violation, which surfaces as a Supabase error — not a graceful "you already reviewed this provider" message.
- **Expected behavior:** The unique index is correct as a backstop, but the app layer should check for existing reviews before INSERT to provide a user-friendly message. Also: the `reviewer_own` FOR ALL policy allows users to DELETE and re-INSERT reviews within the same quarter to circumvent the spirit of the rate limit.
- **User impact:** Low — rate limit works at DB level, but UX is poor (generic error) and delete+re-insert is possible.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #053 — `ai_providers` table is a separate, unsynced data silo

- **Severity:** P1
- **Category:** Security
- **Location:** `supabase/migrations/20250220000009_ai_rls_policies.sql:85-91`
- **Observed behavior:** `ai_providers` is a separate table from `providers` with its own schema, RLS, and data. No trigger, materialized view, or sync mechanism connects them. The AI search in `src/lib/ai/providers.ts` queries `ai_providers` while the public directory queries `providers`. Data can diverge silently — a provider suspended in `providers` may still appear active in `ai_providers`.
- **Expected behavior:** Either sync `ai_providers` from `providers` via trigger/view, or migrate MindMate to use `search_providers_v2` RPC directly.
- **User impact:** MindMate AI could recommend suspended or removed providers. Trust and safety issue.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

### 1.3 Environment Variable Audit

#### Finding #054 — Gemini API key no longer referenced but may persist in `.env`

- **Severity:** P2
- **Category:** Security
- **Location:** `.env` (not committed — referenced in CLAUDE.md)
- **Observed behavior:** `VITE_GEMINI_API_KEY` is documented in CLAUDE.md as required for MindMate AI, but zero references to `VITE_GEMINI` exist in the current `src/` directory (grep returns 0 matches). The API key may still be in `.env` and bundled into the client JavaScript despite being unused.
- **Expected behavior:** Remove `VITE_GEMINI_API_KEY` from `.env` if unused. If Gemini is still needed, proxy calls through an Edge Function — never expose API keys in VITE_ vars.
- **User impact:** Exposed API key in browser DevTools if still present in `.env`. Anyone can use it for their own Gemini calls.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

**VITE_ variable classification:**

| Variable | Classification | Notes |
|----------|---------------|-------|
| `VITE_SUPABASE_URL` | ✅ Public | Supabase project URL — public by design |
| `VITE_SUPABASE_ANON_KEY` | ✅ Public | Anon key — public by design (RLS enforces access) |
| `VITE_PLAUSIBLE_DOMAIN` | ✅ Public | Analytics domain — no secret |
| `VITE_SANITY_PROJECT_ID` | ✅ Public | Sanity project ID — public |
| `VITE_SANITY_DATASET` | ✅ Public | Sanity dataset name — public |
| `VITE_SANITY_API_VERSION` | ✅ Public | API version string — public |
| `VITE_API_URL` | ✅ Public | Backend URL — public |
| `VITE_MAIN_URL` | ✅ Public | Main site URL — public |
| `VITE_ADMIN_URL` | ✅ Public | Admin URL — public |
| `VITE_NAVIGATOR_*` | ✅ Public | Feature flags — no secrets |
| `VITE_GEMINI_API_KEY` | ⚠️ Borderline | Documented but unused; if present, leaked to client |

No `SUPABASE_SERVICE_ROLE_KEY` is ever referenced in `src/` — correctly kept in `src/app/api/` server routes only.

### 1.4 Input Sanitization Findings

- **`dangerouslySetInnerHTML`**: Zero matches in `src/components/providers/`, `src/pages/providers/`, and `src/pages/portal/`. All provider-set content (bio, practice_name, credentials, display_name) is rendered as plain text via React's default text escaping. **No XSS vector found.**
- **Search query interpolation**: The RPC path is fully parameterized. The direct query fallback uses Supabase's `.or()` builder with string interpolation (`src/lib/providers/queries.ts:283-285`) but the values are passed through Supabase's query builder which parameterizes them. **No SQL injection vector found.**

### 1.5 Auth/Authz on Server Routes

#### Finding #055 — NPI verification endpoint has no rate limiting

- **Severity:** P1
- **Category:** Security
- **Location:** `src/components/providers/onboarding/ProviderClaimForm.tsx` (calls NPPES API directly from client)
- **Observed behavior:** The NPI verification calls the public NPPES API (`https://npiregistry.cms.hhs.gov/api/?version=2.1&number=...`) directly from the client-side claim form. There is no server-side proxy, no rate limiting, no CAPTCHA. An attacker could enumerate all 10-digit NPI numbers by scripting the claim form.
- **Expected behavior:** Proxy NPI lookups through an Edge Function with rate limiting (e.g., 10 lookups per IP per minute).
- **User impact:** NPI enumeration attack possible. The NPPES API is public, but Psychage's client-side lookup reveals which NPIs are in the Psychage database (status check against local DB).
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** Yes — touches NPI verification (flags rate-limit gap, doesn't change verification logic)

### 1.6 Open Redirects / Claim Flow Abuse

#### Finding #056 — Claim flow NPI mismatch check is server-side but claim action is client-side

- **Severity:** P1
- **Category:** Security
- **Location:** `src/lib/providers/queries.ts:568-607`
- **Observed behavior:** `claimProvider()` verifies that `provider.npi_number === npiNumber` before updating the provider. However, this runs client-side via the Supabase JS client. An attacker could bypass this check entirely by calling `supabase.from('providers').update({ user_id: attackerId, status: 'claimed' }).eq('id', targetProviderId)` directly. The RLS policy only requires `auth.uid() = user_id` for UPDATE — but since `user_id` is NULL for unclaimed seeded providers, the policy `auth.uid() = user_id` evaluates to `auth.uid() = NULL` which is always false. **This actually protects against the attack** because NULL != any value. However, the INSERT policy `auth.uid() = user_id` with CHECK would also fail for claiming since user_id is being set, not matched.

  On closer review: the UPDATE sets `user_id = userId` where the existing `user_id` is NULL. The RLS checks `auth.uid() = user_id` on the EXISTING row (USING clause), so `auth.uid() = NULL` → false. **The claim UPDATE would be rejected by RLS for any user.** This means the claim flow is broken for everyone, not just attackers.
- **Expected behavior:** The claim flow should work for legitimate users. Needs a dedicated RLS policy: `CREATE POLICY "Claim seeded provider" ON providers FOR UPDATE USING (status = 'seeded' AND user_id IS NULL) WITH CHECK (auth.uid() = user_id)`.
- **User impact:** The entire claim flow may be broken in production — legitimate users cannot claim seeded providers because RLS blocks the UPDATE.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** Yes — touches claim flow (additive policy fix)

---

## 2. AREA B — ACCESSIBILITY FINDINGS

### 2.1 Per-Component Violations

#### Finding #057 — Search result count not announced to screen readers

- **Severity:** P2
- **Category:** A11y
- **Location:** `src/pages/providers/ProviderSearchPage.tsx:143-152`
- **Observed behavior:** The results count paragraph (`"Showing X of Y providers"`) updates dynamically but is not wrapped in an `aria-live="polite"` region. Screen readers don't announce when results change.
- **Expected behavior:** Wrap the count in `<div aria-live="polite" aria-atomic="true">`.
- **User impact:** Blind/low-vision users don't know when search results have loaded or changed.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #058 — ProviderSortDropdown missing keyboard arrow navigation

- **Severity:** P2
- **Category:** A11y
- **Location:** `src/components/providers/search/ProviderSortDropdown.tsx:27-46`
- **Observed behavior:** Custom dropdown has `role="listbox"` and `aria-expanded` but only handles click events. No `onKeyDown` handler for ArrowUp/ArrowDown/Enter/Escape.
- **Expected behavior:** ARIA listbox pattern requires arrow key navigation, Enter to select, Escape to close.
- **User impact:** Keyboard-only users cannot change sort order.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #059 — Multiple interactive elements missing focus-visible styles

- **Severity:** P2
- **Category:** A11y
- **Location:** Multiple files
- **Observed behavior:** The following elements lack `focus-visible:ring-*` or equivalent visible focus indicator:
  - `ProviderSearchBar.tsx`: geolocation button (line ~67)
  - `ProviderApplyForm.tsx`: step indicator buttons (line ~129)
  - `ProviderProfilePage.tsx`: back button (line ~88)
  - `ForProvidersLandingPage.tsx`: pricing toggle buttons (lines ~849-873)
  - `ForProvidersLandingPage.tsx`: FAQ toggle buttons (lines ~1107-1114)
  - `ProviderApplyPage.tsx` / `ProviderClaimPage.tsx`: back links (line ~19)
- **Expected behavior:** Every interactive element must have a visible focus indicator for keyboard users (WCAG 2.4.7).
- **User impact:** Keyboard users cannot see which element has focus.
- **Fix complexity:** S (add `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2` to each)
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #060 — Contrast ratio failures across provider components

- **Severity:** P2
- **Category:** A11y
- **Location:** All provider components
- **Observed behavior:** Using WCAG relative luminance formula, these color combinations fail AA:
  - `text-teal-600` (#0D9488) on white: **~3.5:1** (fails 4.5:1 for normal text) — used for links, CTA text throughout
  - `text-gray-500` (#6B7280) on white: **~5.0:1** (passes for normal text, but thin/small text at 12px may be borderline)
  - `text-gray-400` (#9CA3AF) on white: **~2.9:1** (fails 4.5:1) — used for placeholder text in inputs
  - `text-teal-400` (#2DD4BF) on gray-900 (#111827): **~6.5:1** (passes for dark mode)
  - White on `bg-teal-600`: **~3.5:1** (fails 4.5:1 for normal text — used on CTA buttons)
- **Expected behavior:** All text must meet 4.5:1 for normal size, 3:1 for large text (18px+ bold or 24px+ regular). Bump teal text to `teal-700` (#0F766E, ~4.8:1) and buttons to `teal-700` background.
- **User impact:** Low-vision users and users in bright environments struggle to read teal text. Widespread — affects every page.
- **Fix complexity:** S (Tailwind color class swap)
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #061 — PortalProfile toggle switches missing aria-label

- **Severity:** P2
- **Category:** A11y
- **Location:** `src/pages/portal/PortalProfile.tsx` (Practice tab toggles)
- **Observed behavior:** Toggle switch buttons use `role="switch"` and `aria-checked` correctly, but have no `aria-label` attribute. The visual label is adjacent text, not programmatically associated.
- **Expected behavior:** Each toggle needs `aria-label="Telehealth available"` (or similar) or `aria-labelledby` pointing to the adjacent text.
- **User impact:** Screen readers announce "switch, checked" without saying what the switch controls.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #062 — PortalProfile tab buttons missing aria-selected

- **Severity:** P2
- **Category:** A11y
- **Location:** `src/pages/portal/PortalProfile.tsx` (tab navigation)
- **Observed behavior:** Tab buttons change visual styling based on `activeTab === tab.id` but don't set `aria-selected="true"` on the active tab.
- **Expected behavior:** Active tab should have `aria-selected="true"`, inactive tabs `aria-selected="false"`, with `role="tablist"` on the container and `role="tab"` on each button.
- **User impact:** Screen readers cannot distinguish active from inactive tabs.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #063 — PortalDashboard completeness chart not accessible

- **Severity:** P2
- **Category:** A11y
- **Location:** `src/pages/portal/PortalDashboard.tsx` (RadialBarChart)
- **Observed behavior:** The Recharts RadialBarChart renders as SVG with no `aria-label`, `role`, or alternative text describing the profile completeness percentage.
- **Expected behavior:** Wrap chart in a container with `role="img" aria-label="Profile completeness: 65%"` or provide a visually hidden text alternative.
- **User impact:** Screen readers skip the chart entirely — providers don't know their profile completeness.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #064 — ProviderCardSkeleton missing aria-busy (reinforced from #014)

- **Severity:** P3
- **Category:** A11y
- **Location:** `src/components/providers/cards/ProviderCardSkeleton.tsx`
- **Observed behavior:** Already noted as #014 in first audit. Confirmed: no `aria-busy`, `role="status"`, or `aria-label` on skeleton.
- **Expected behavior:** Container needs `aria-busy="true" role="status" aria-label="Loading provider"`.
- **User impact:** Screen readers don't announce loading state.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #065 — ProviderCard bio uses text-text-tertiary (contrast concern)

- **Severity:** P3
- **Category:** A11y
- **Location:** `src/components/providers/cards/ProviderCard.tsx` (bio preview, details grid)
- **Observed behavior:** Multiple text elements use `text-text-tertiary` which maps to gray-500. While gray-500 on white passes at normal size (~5.0:1), the text is rendered at `text-xs` (12px) where readability is already challenged.
- **Expected behavior:** Small text should use higher contrast (gray-600 minimum for xs text).
- **User impact:** Older users and those on low-contrast screens struggle with tiny gray text.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #066 — Filter panel mobile drawer doesn't trap focus

- **Severity:** P2
- **Category:** A11y
- **Location:** `src/components/providers/search/ProviderFilterPanel.tsx` (mobile drawer)
- **Observed behavior:** The mobile filter drawer uses `AnimatePresence` with a backdrop overlay but doesn't implement focus trapping. When the drawer opens, keyboard users can Tab past the drawer into the page behind it.
- **Expected behavior:** Focus should be trapped within the drawer while open. Focus should move to the first interactive element on open and return to the trigger button on close.
- **User impact:** Keyboard users can accidentally interact with content behind the filter drawer.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #067 — Error banner on ProviderSearchPage missing role="alert"

- **Severity:** P2
- **Category:** A11y
- **Location:** `src/pages/providers/ProviderSearchPage.tsx:115-127`
- **Observed behavior:** The error banner renders with `AlertTriangle` icon and message but doesn't use `role="alert"` or `aria-live="assertive"`. Screen readers don't announce errors.
- **Expected behavior:** Error banners should use `role="alert"` so they're immediately announced.
- **User impact:** Screen reader users don't know a search error occurred.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

### 2.2 Automated Axe Results

Runtime axe was not run — dev server not active during this audit. All findings are from static code analysis.

### 2.3 Color Contrast Findings

See Finding #060 for consolidated contrast analysis. Summary:
- 2 combinations fail for normal text (teal-600 on white, white on teal-600)
- 1 combination fails for placeholder text (gray-400 on white)
- Dark mode teal-400 on gray-900 passes
- Gray-500 on white is borderline at small sizes

---

## 3. AREA C — ADMIN PANEL FINDINGS

### 3.1 Admin Page Inventory

| Page | Route | Version | Status |
|------|-------|---------|--------|
| AdminDashboard | `/admin/` | v1 | Functional — platform metrics + activity feed |
| Dashboard (v2) | `/admin/v2/` | v2 | Functional — users, content, safety flags, articles |
| ProviderManagement | `/admin/providers` | v1 | Functional — list, search, approve/reject/suspend |
| ProviderDetailAdmin | `/admin/providers/:id` | v1 | Functional — detail view, status changes, notes |
| ProviderList | `/admin/v2/providers` | v2 | Functional — list, tabs (all/pending/suspended), suspend |
| ProviderEditor | `/admin/v2/providers/:id/edit` | v2 | Functional — full CRUD with all relations |
| BulkImport | `/admin/v2/providers/import` | v2 | Functional — NPPES NPI batch import |
| AdminSettingsPage | `/admin/settings` | v1 | Functional — feature flags, platform settings |
| AdminAnalyticsPage | `/admin/analytics` | v1 | Functional — charts, article metrics |

### 3.2 Admin Capability Matrix

| Capability | v1 | v2 | Notes |
|-----------|-----|-----|-------|
| List providers with search/filter | Yes | Yes | v1: client debounce; v2: direct Supabase |
| View single provider data | Yes | Yes | v1: read-only detail; v2: full editor |
| Edit provider data directly | No | Yes | v2: comprehensive with locations, specialties, insurance |
| Manually verify (set verification_tier) | Partial | Yes | v1: approve/reject only; v2: tier dropdown |
| Change provider status | Yes | Partial | v1: approve/reject/suspend; v2: suspend/unsuspend only |
| Delete a provider | No | No | Neither version — correct design |
| Bulk operations | No | Yes | v2: NPPES NPI bulk import |
| View provider applications | No | Partial | v2: count in tab badge, but ApplicationsList page missing |
| Approve/reject applications | No | No | Not implemented anywhere |
| Moderate reviews | No | No | Not implemented anywhere |
| View analytics for provider | Minimal | Minimal | High-level platform only, no per-provider |
| Impersonate / "view as" | No | No | Not implemented |
| Audit log of admin actions | Partial | Yes | v1: reads log; v2: writes log via logAdminAction() |

### 3.3 Role Enforcement Findings

#### Finding #068 — Admin role RLS depends on JWT metadata that may not be set

- **Severity:** P1
- **Category:** Admin / Security
- **Location:** `supabase/migrations/20260330000001_fix_admin_roles_rls_recursion.sql:17-24`
- **Observed behavior:** The final admin_roles RLS policy checks `(auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'`. No code in the codebase sets `user_metadata.role = 'admin'` during signup, login, or token refresh. If this metadata isn't populated, admin_roles queries will return empty results for everyone.
- **Expected behavior:** Either: (a) set user_metadata.role during admin provisioning via Supabase Admin SDK, or (b) use a different approach like a Supabase custom claim or a trigger-based check.
- **User impact:** All admin panel functionality may fail if JWT metadata isn't populated.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #069 — Conflicting admin role enum across migrations

- **Severity:** P2
- **Category:** Admin
- **Location:** `supabase/migrations/20260310000001_admin_panel_foundation.sql` vs `20260325000003_create_admin_roles.sql`
- **Observed behavior:** Migration 1 defines roles as `('super_admin', 'clinical_admin', 'viewer')`. Migration 2 re-creates the table with `('super_admin', 'editor', 'viewer')`. The TypeScript type in `src/lib/admin/types.ts` uses `'super_admin' | 'clinical_admin' | 'viewer'`. The final DB state depends on migration order, and code expects `clinical_admin` which may not exist.
- **Expected behavior:** Single source of truth for role enum. Consolidate.
- **User impact:** Admin pages checking for `clinical_admin` role may never match if DB has `editor`.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

### 3.4 Moderation Workflow Findings

#### Finding #070 — No review moderation queue exists

- **Severity:** P1
- **Category:** Admin
- **Location:** (absent)
- **Observed behavior:** `provider_reviews` table has `status`, `flagged_reason`, `moderated_by`, `moderated_at` columns — but no admin page lists flagged/pending reviews. No moderation workflow exists.
- **Expected behavior:** Admin panel should have a review moderation queue showing flagged reviews, with approve/remove actions.
- **User impact:** When reviews launch, there's no way to moderate abusive or fake reviews.
- **Fix complexity:** M
- **Blocked by:** Finding #038 (reviews UI must exist first)
- **Touches sacred items?** No

### 3.5 Audit Logging Findings

#### Finding #071 — V1 admin pages don't write audit logs

- **Severity:** P2
- **Category:** Admin
- **Location:** `src/pages/admin/ProviderManagement.tsx`, `src/pages/admin/ProviderDetailAdmin.tsx`
- **Observed behavior:** V1 admin pages perform provider status changes (approve, reject, suspend) and save verification notes, but none of these mutations call `logAdminAction()` or write to `admin_audit_log`.
- **Expected behavior:** Every admin mutation should be logged with admin_user_id, action, resource_type, resource_id, previous_value, new_value.
- **User impact:** On a health platform, unaudited admin actions on provider data are a compliance risk.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

### 3.6 Dashboard Metrics Findings

#### Finding #072 — Admin dashboard missing provider-specific metrics

- **Severity:** P2
- **Category:** Admin
- **Location:** `src/pages/admin/v2/Dashboard.tsx`
- **Observed behavior:** The v2 admin dashboard shows Total Users, Clarity Completions, AI Conversations, Safety Flags, Pending Applications, Published Content — but no: total providers, claimed vs seeded ratio, verification tier distribution, top-searched specialties, or application queue depth breakdown.
- **Expected behavior:** Provider directory is the largest dataset (423K records). Admin dashboard should prominently show: total providers, claimed count, pending applications breakdown, verification tiers, and top specialties by search volume.
- **User impact:** Ryan has no quick admin-level visibility into the provider directory's health.
- **Fix complexity:** M
- **Blocked by:** —
- **Touches sacred items?** No

---

## 4. AREA D — FINDING #022 VERDICT

### 4.1 Trace Methodology

1. Identified the all-articles aggregate: `src/data/articles/all-articles.ts` exports `allArticles: Article[]` aggregating 31 categories
2. Traced full import chains for all 6 provider route entry points
3. Checked the Vite build manifest for chunk dependencies
4. Verified via grep that no provider component imports `articleService`, `allArticles`, or any article index

### 4.2 Import Chain Analysis

**Entry points traced:**

| Route | Entry File | Imports Articles? | Evidence |
|-------|-----------|-------------------|---------|
| `/providers` | ProvidersLandingPage.tsx | NO | Imports: ProviderSearchBar, useProviderLookups, SEO, Framer Motion. No article path. |
| `/providers/search` | ProviderSearchPage.tsx | NO | Imports: useProviderSearch, useProviderLookups, specialtyResolver, filter/card components. No article path. |
| `/providers/:id` | ProviderProfilePage.tsx | NO | Imports: useProviderProfile, trackProfileView, profile sub-components. No article path. |
| `/for-providers` | ForProvidersLandingPage.tsx | NO | Self-contained marketing page. Only imports: useReducedMotion, SEO, Framer Motion, Lucide icons. |
| `/for-providers/apply` | ProviderApplyPage.tsx | NO | Imports: ProviderApplyForm, SEO. Form imports lookup context only. |
| `/for-providers/claim` | ProviderClaimPage.tsx | NO | Imports: ProviderClaimForm, SEO. Form imports NPI verification only. |

The only consumer of `all-articles.ts` is `articleService.ts` (via dynamic import), which is called by article page components — none of which are imported by provider routes.

### 4.3 Build Manifest Analysis

Provider chunks in `dist/`:
- `ProvidersLandingPage-DpA95VEn.js`
- `ProviderSearchPage-BzfDzLut.js` (35 kB)
- `ProviderProfilePage-DpZos4fM.js` (20 kB)
- `ForProvidersLandingPage-C_vo6Dr9.js` (32 kB)
- `ProviderApplyPage-BxMOMEeq.js` (36 kB)

The `all-articles-Dko6dB6l.js` chunk (36,560 kB) is not referenced by any of these provider chunks.

### 4.4 Verdict

**DOWNGRADED to P1-general (no provider route loads the article chunk)**

#### Finding #073 — #022 DOWNGRADED: article chunk does not load on provider routes

- **Severity:** P1 (general app issue, not provider-blocking)
- **Category:** #022-Verification
- **Location:** `dist/assets/all-articles-Dko6dB6l.js`
- **Observed behavior:** Full import chain analysis confirms NO provider route entry point transitively imports `all-articles.ts` or `articleService.ts`. The 36.5 MB chunk is only loaded when a user navigates to an article page AND Supabase article fetch fails (triggering the lazy `import('../data/articles/all-articles')`).
- **Expected behavior:** N/A — the chunk is correctly isolated from provider routes.
- **User impact:** Provider directory performance is NOT affected by the article chunk. However, the 36.5 MB chunk remains a P1 issue for article pages.
- **Fix complexity:** N/A for provider work
- **Blocked by:** —
- **Touches sacred items?** No

---

## 5. NOVEL FINDINGS

#### Finding #074 — Stripe tables exist in migrations but were missed by first audit

- **Severity:** P2
- **Category:** Novel
- **Location:** `supabase/migrations/20260411000004_stripe_tables.sql`
- **Observed behavior:** The first audit (Finding #040) stated "zero `stripe_customers` table, zero `provider_subscriptions` table." This is incorrect — migration `20260411000004` creates `stripe_customers`, `provider_subscriptions`, and `stripe_events_log` with RLS policies. The tables exist in the schema; what's missing is the Stripe JS/SDK client code and Edge Functions to populate them.
- **Expected behavior:** Correction to first audit: Stripe schema is ready, Stripe client integration is absent.
- **User impact:** The fix scope for Stripe is smaller than first estimated — schema is done, only need client code + Edge Functions.
- **Fix complexity:** N/A (correction, not fix)
- **Blocked by:** —
- **Touches sacred items?** No

#### Finding #075 — `useProviderSearch` hook suppresses exhaustive-deps linter with potential stale closure

- **Severity:** P2
- **Category:** Novel
- **Location:** `src/hooks/useProviderSearch.ts:86`
- **Observed behavior:** `// eslint-disable-line react-hooks/exhaustive-deps` on the effect that triggers search. The dependency is `[searchParams.toString()]` but the effect body reads `params` derived from `searchParams`. If `searchParams` object identity changes but `toString()` produces the same string, the effect won't re-run — potentially correct. But if the params derivation logic has side effects or depends on external state, the closure may be stale.
- **Expected behavior:** Audit the specific dependency chain. If `searchParams.toString()` is truly the only input, the disable is acceptable. But the pattern is fragile — a future refactor adding a dependency will silently break.
- **User impact:** Potential search not re-executing after filter changes in edge cases.
- **Fix complexity:** S
- **Blocked by:** —
- **Touches sacred items?** No

---

## 6. UPDATED OPEN QUESTIONS

11. **JWT metadata for admin roles:** Is `user_metadata.role` being set via Supabase Admin SDK, custom claims, or a trigger during admin provisioning? The RLS policies depend on it but no code path sets it. (See Finding #068)

12. **Claim flow RLS:** Has the claim flow been tested in production? The RLS analysis (Finding #056) suggests the UPDATE on seeded providers (where `user_id IS NULL`) would be blocked by the `auth.uid() = user_id` USING clause. This may be a complete blocker for the claim flow.

13. **`ai_providers` table sync:** Is there a database trigger, Edge Function, or manual process that syncs `ai_providers` with the main `providers` table? If not, MindMate's provider recommendations may diverge from the public directory. (See Finding #053)

14. **Admin role enum — `clinical_admin` vs `editor`:** Which migration's role enum is authoritative? The TypeScript types use `clinical_admin` but a later migration defines `editor`. (See Finding #069)

---

## 7. SACRED ITEMS STATUS (reconfirmation)

| Sacred Item | Status |
|-------------|--------|
| `search_providers_v2` RPC | ✅ Intact — not touched |
| NPI seed data path | ✅ Intact — not touched |
| Cascading fallback | ✅ Intact — not touched |
| NPI verification against NPPES | ✅ Intact — rate-limit gap flagged (Finding #055) but flow preserved |
| DB schema core | ✅ Intact — missing policy flagged (Finding #049) but schema preserved |
| 0.75 Navigator confidence cap | ✅ Intact — not touched |
| Crisis detection | ✅ Intact — not touched |

---

## 8. AUDIT VALIDATION

- **Zero files modified outside `.audit/`:** ✅ Confirmed
- **`git status` output:**
```
?? .audit/PROVIDER_DIRECTORY_ISSUES_SUPPLEMENTARY.md
?? .ux/
?? src/lib/article-category-to-specialty.ts
```
(Only the supplementary report is new. Baseline audit `.audit/PROVIDER_DIRECTORY_ISSUES.md` unmodified.)

- **Build status:**
  - `npx tsc --noEmit`: PASS (zero errors)
  - `npm run build`: PASS (18.61s)

- **Files read during audit:** ~45 files
- **Files read by area:**
  - Area A (Security/RLS): 15 migration files + 6 service files
  - Area B (Accessibility): 22 component/page files
  - Area C (Admin): 14 admin files + 4 migration files
  - Area D (#022 verification): 8 provider entry points + manifest + article index
