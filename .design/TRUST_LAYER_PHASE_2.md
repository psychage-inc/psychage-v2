# TRUST LAYER — PHASE 2 DESIGN SPECIFICATION

**Designer:** Claude Code
**Date:** 2026-04-19
**Scope:** Full trust layer — badges, How We Verify page, seeded/claimed distinction, last-updated, credential glossary rollout, SEO
**Baseline:** .audit/PROVIDER_DIRECTORY_ISSUES.md + SUPPLEMENTARY.md
**Phase 1 branch:** fix/provider-quickwins-2026-04-19
**Phase 2b executor:** Claude Code (future prompt)

---

## EXECUTIVE SUMMARY

- **Biggest UX change:** A new `/how-we-verify` page linked from every badge on every card and profile — users will finally understand why they should trust 423K listings.
- **Biggest engineering decision:** Sitemap generation via a standalone Node script producing a sitemap index + 9 child files, deployed as static assets — avoids runtime complexity and Vercel Edge Function cold-start issues.
- **Badge coherence:** Four badge types (Verified, Claimed, Featured, Unclaimed) derived purely from DB columns `status`, `verified_at`, and `tier`. Each badge links to its explanation section on How We Verify.
- **Seeded vs. claimed distinction:** Seeded cards get a muted avatar gradient, an "NPI Listing" badge, and a "Claim this profile" CTA on the profile page. Claimed cards get a "Claimed" badge. Both are visually distinct from Verified.
- **Biggest open question for Ryan:** Brand voice for the How We Verify page — clinical/authoritative vs. warm/educational. Both variants are fully written below.

**Decision log:**
- Locked decisions: 47
- Deferred decisions: 8
- Open questions for Ryan: 5

---

## 1. BADGE TAXONOMY & VISUAL SYSTEM

### 1.1 The Taxonomy

Four badge types exist. A provider qualifies for exactly one **trust badge** (Verified, Claimed, or NPI Listing) and optionally one **modifier badge** (Featured). Maximum 2 badges per card.

#### Badge 1: Verified

| Property | Value |
|----------|-------|
| **Name** | Verified |
| **DB condition** | `verified_at IS NOT NULL OR status IN ('verified', 'active')` |
| **User-facing meaning** | "This provider's credentials and license have been independently verified by Psychage." |
| **Priority** | 1 (highest trust badge) |
| **Icon** | `ShieldCheck` from lucide-react, 12px |
| **Light mode** | `bg-teal-50 text-teal-700 border border-teal-200` |
| **Dark mode** | `bg-teal-900/20 text-teal-400 border border-teal-800/50` |
| **Contrast (light)** | teal-700 (#0F766E) on teal-50 (#F0FDFA): ~7.2:1 -- passes AA |
| **Contrast (dark)** | teal-400 (#2DD4BF) on gray-900 (#111827): ~6.5:1 -- passes AA |
| **aria-label** | `"Verified provider — credentials confirmed by Psychage"` |
| **Interactive?** | Yes — clicking navigates to `/how-we-verify#verified` |
| **Keyboard** | `role="link"`, focusable, Enter activates |

**Design note:** Phase 1's existing `VerificationBadge` component already renders "Psychage Verified" with `text-teal-600`. Phase 2 changes the text color from `teal-600` to `teal-700` to meet WCAG AA (Finding #043, #060). The label changes from "Psychage Verified" to "Verified" for brevity when displayed alongside other badges.

#### Badge 2: Claimed

| Property | Value |
|----------|-------|
| **Name** | Claimed |
| **DB condition** | `status = 'claimed' AND verified_at IS NULL` |
| **User-facing meaning** | "This provider has claimed their profile and is managing their information on Psychage." |
| **Priority** | 2 |
| **Icon** | `UserCheck` from lucide-react, 12px |
| **Light mode** | `bg-blue-50 text-blue-700 border border-blue-200` |
| **Dark mode** | `bg-blue-900/20 text-blue-400 border border-blue-800/50` |
| **Contrast (light)** | blue-700 (#1D4ED8) on blue-50 (#EFF6FF): ~7.8:1 -- passes AA |
| **Contrast (dark)** | blue-400 (#60A5FA) on gray-900 (#111827): ~5.2:1 -- passes AA |
| **aria-label** | `"Claimed profile — managed by this provider"` |
| **Interactive?** | Yes — clicking navigates to `/how-we-verify#claimed` |

#### Badge 3: NPI Listing (replaces "Publicly Listed")

| Property | Value |
|----------|-------|
| **Name** | NPI Listing |
| **DB condition** | `status = 'seeded' AND verified_at IS NULL` |
| **User-facing meaning** | "This listing is sourced from the federal NPI registry. The provider has not claimed or verified this profile on Psychage." |
| **Priority** | 3 (lowest trust badge) |
| **Icon** | `Info` from lucide-react, 12px |
| **Light mode** | `bg-gray-100 text-gray-600 border border-gray-200` |
| **Dark mode** | `bg-neutral-800 text-neutral-400 border border-neutral-700` |
| **Contrast (light)** | gray-600 (#4B5563) on gray-100 (#F3F4F6): ~6.4:1 -- passes AA |
| **Contrast (dark)** | neutral-400 (#A3A3A3) on neutral-800 (#262626): ~5.5:1 -- passes AA |
| **aria-label** | `"NPI listing — data from federal registry, not verified by Psychage"` |
| **Interactive?** | Yes — clicking navigates to `/how-we-verify#npi-listing` |

**Naming rationale:** "Publicly Listed" (current label) is vague. "NPI Listing" signals the data source — the federal NPI registry — which the How We Verify page explains. This is more informative and builds trust by being transparent about provenance.

#### Badge 4: Featured (modifier)

| Property | Value |
|----------|-------|
| **Name** | Featured |
| **DB condition** | `tier IN ('pro', 'elite')` |
| **User-facing meaning** | "This provider has a premium subscription. Featured providers appear higher in default search results." |
| **Priority** | Modifier — shown alongside the trust badge, never alone |
| **Icon** | None (text-only, consistent with Phase 1 Commit 8) |
| **Light mode** | `bg-indigo-50 text-indigo-600 border border-indigo-100` |
| **Dark mode** | `bg-indigo-900/20 text-indigo-400 border border-indigo-800/50` |
| **Contrast (light)** | indigo-600 (#4F46E5) on indigo-50 (#EEF2FF): ~6.1:1 -- passes AA |
| **Contrast (dark)** | indigo-400 (#818CF8) on gray-900 (#111827): ~5.0:1 -- passes AA |
| **aria-label** | `"Featured provider — premium listing"` |
| **Interactive?** | Yes — clicking navigates to `/how-we-verify#featured` |

**Phase 1 integration:** Phase 1 Commit 8 already renders the Featured badge with `text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100`. Phase 2 keeps these exact styles but adds: (a) the click-through to How We Verify, (b) the `aria-label`, and (c) dark mode `border-indigo-800/50` refinement.

#### Statuses not badged

- `submitted` — provider submitted application, pending review. Not shown in public directory (RLS filters to `active` and `seeded`). No badge needed.
- `suspended` / `rejected` — not shown in public directory. No badge needed.

### 1.2 Visual System

**Shared badge base classes (all badges):**

```
text-[10px] font-semibold leading-none px-2 py-1 rounded-full
inline-flex items-center gap-1 whitespace-nowrap
transition-colors cursor-pointer
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
```

**Icon size:** 12px for all trust badges. Featured has no icon.

**Implementation:** Extract a new `<TrustBadge>` component at `src/components/providers/shared/TrustBadge.tsx` that accepts `type: 'verified' | 'claimed' | 'npi-listing' | 'featured'` and renders the correct visual. This replaces the existing `VerificationBadge` component. The old component can be deprecated with a re-export through `TrustBadge` for backward compatibility during Phase 2b.

### 1.3 Layout Rules

**LOCKED: Maximum 2 badges per card.** One trust badge (Verified / Claimed / NPI Listing) + optionally one Featured badge.

**Card placement:** Badges render in the header section below the provider name and type label, on the same line as the current `VerificationBadge`. This is the existing location in `ProviderCard.tsx:131`.

**Badge order:** Trust badge first (left), Featured second (right). This keeps the most important trust signal in the primary reading position.

**Mobile behavior (< 640px):** Badges remain on one line. At `text-[10px]` with max 2 badges, the combined width is ~180px — fits comfortably on 320px screens with the avatar + name column.

**Compact card (`ProviderCardCompact.tsx`):** Show only the trust badge (no Featured badge). The compact card is used in contexts where space is tight (QuickMatch widget).

**Profile page (`ProfileHeader.tsx`):** Show both badges at `size="md"` (existing size). Badges appear in the flex row alongside the provider type `<Badge>`.

**Credential tooltip interaction:** The credential explainer button (`HelpCircle` icon) sits to the right of the credentials text in the name area. Badges sit below the name in a separate row. No spatial conflict.

### 1.4 Integration with Phase 1's Featured Badge

**LOCKED: No breaking changes to Phase 1 Commit 8.**

Phase 2 makes three additive changes to the Featured badge:
1. Wraps it in a `<Link to="/how-we-verify#featured">` (or uses `onClick` + `navigate`)
2. Adds `aria-label="Featured provider — premium listing"`
3. Refines dark mode border from `dark:border-indigo-800/50` (already close to Phase 1's value)

Phase 2 does NOT rename, restyle, reposition, or remove the Featured badge. The `title` attribute from Phase 1 (`"This provider has a featured subscription with Psychage."`) is preserved alongside the new `aria-label`.

---

## 2. "HOW WE VERIFY" PAGE

### 2.1 Route & Entry Points

**LOCKED: Route is `/how-we-verify`.**

**Entry points (all link to this route):**
1. Every trust badge on every `ProviderCard` (click navigates here with section anchor)
2. Every trust badge on every `ProviderCardCompact`
3. Every trust badge on `ProfileHeader` (profile page)
4. `ProvidersLandingPage` — link in the trust indicators section (below the `ShieldCheck` "Verified Credentials" item)
5. Footer sitewide — add under the "Find Care" column
6. `ProviderResultsEmpty` — add as contextual link: "Learn how we verify providers"
7. Profile page footer — add next to the existing "Report a concern" link

**Anchor targets:**
- `#verified` — scrolls to the Verified section
- `#claimed` — scrolls to the Claimed section
- `#npi-listing` — scrolls to the NPI Listing section
- `#featured` — scrolls to the Featured section

### 2.2 Page Architecture (Sections, Hierarchy)

```
<h1> How We Verify Providers
<p>  subtitle

<section id="data-source">
  <h2> Where Our Data Comes From

<section id="npi-listing">
  <h2> What "NPI Listing" Means

<section id="claimed">
  <h2> What "Claimed" Means

<section id="verified">
  <h2> What "Verified" Means

<section id="featured">
  <h2> What "Featured" Means

<section id="limitations">
  <h2> What We Can't Verify

<section id="report">
  <h2> See Something Wrong?
  <p>  report link + CTA
```

7 sections total. Each `<h2>` gets an `id` for anchor linking.

### 2.3 Copy — Variant A (Clinical/Authoritative)

---

**Page title:** How We Verify Providers

**Subtitle:** Understanding the data behind Psychage's provider directory and what our verification levels mean.

---

**Section 1: Where Our Data Comes From** (id: `data-source`)

The Psychage Provider Directory contains over 400,000 mental health professionals across all 50 U.S. states and the District of Columbia. The foundation of this directory is the National Plan and Provider Enumeration System (NPPES), a federal database maintained by the Centers for Medicare & Medicaid Services (CMS).

Every healthcare provider who bills Medicare, Medicaid, or private insurance in the United States is required to register for a National Provider Identifier (NPI). This 10-digit number is unique to each provider and is publicly available through the NPPES API.

Psychage imports provider records from the NPPES registry, filtering for mental health taxonomy codes including psychiatrists, psychologists, clinical social workers, licensed counselors, marriage and family therapists, and psychiatric nurse practitioners. Each record includes the provider's name, credentials, practice address, and taxonomy classification as reported to CMS.

**Important:** NPI registration confirms that a provider holds a valid National Provider Identifier and has self-reported their taxonomy and practice information to the federal government. It does not confirm current licensure status, malpractice history, disciplinary actions, or clinical competence. We encourage you to verify a provider's current license through your state's licensing board before beginning care.

---

**Section 2: What "NPI Listing" Means** (id: `npi-listing`)

Providers marked as **NPI Listing** have profiles sourced directly from the federal NPPES registry. These providers have not claimed or verified their profile on Psychage.

What an NPI Listing includes:
- Provider name and credentials as reported to CMS
- Practice address and contact information from federal records
- Taxonomy classification (e.g., "Clinical Social Worker," "Psychiatry")
- NPI number for cross-reference

What an NPI Listing does not include:
- A personal bio or practice description
- Verified insurance acceptance
- Self-reported specialties or treatment approaches
- Confirmed availability or appointment scheduling

NPI Listing profiles display limited information because the data comes from a federal registry, not from the provider themselves. If you are a provider and see your listing, you can claim it to add detailed information and verify your credentials.

---

**Section 3: What "Claimed" Means** (id: `claimed`)

A **Claimed** profile indicates that a provider has identified their NPI Listing on Psychage and taken ownership of it. To claim a profile, a provider must:

1. Create a Psychage account
2. Locate their existing NPI Listing in our directory
3. Confirm their identity by providing their NPI number, which is validated against the federal NPPES API in real time

Once claimed, providers can add detailed information to their profile, including a personal bio, accepted insurance plans, treatment specialties, languages spoken, cultural competencies, and appointment availability.

A Claimed profile represents a higher level of engagement than an NPI Listing — the provider has actively chosen to maintain their presence on Psychage — but it does not yet indicate that Psychage has independently verified their license or credentials beyond the NPI check.

---

**Section 4: What "Verified" Means** (id: `verified`)

**Verified** is the highest trust designation on Psychage. A Verified provider has completed our multi-step verification process:

1. **NPI Confirmation** — The provider's National Provider Identifier is validated against the NPPES registry.
2. **Profile Review** — The Psychage team reviews the provider's submitted credentials, practice information, and profile content for accuracy and completeness.
3. **Approval** — Upon successful review, the provider receives Verified status.

Verified providers have a complete, reviewed profile with independently confirmed credentials. This is the most reliable listing type in the Psychage directory.

**Note:** Verification confirms the information a provider has submitted as of the review date. Psychage does not continuously monitor license status across all 50 states. If a provider's circumstances change after verification, there may be a delay before their profile reflects the update. Last verification dates are displayed on each provider's profile.

---

**Section 5: What "Featured" Means** (id: `featured`)

Providers marked as **Featured** have a premium subscription with Psychage. Featured providers receive:

- **Priority placement** in default search results (above non-featured providers of the same verification level)
- **Enhanced profile options** including extended bio length and additional practice photos

**Disclosure:** Featured placement is a paid service. The presence of a Featured badge indicates a commercial relationship between the provider and Psychage. Featured status does not affect verification level — a Featured provider may be Verified, Claimed, or an NPI Listing. The trust badge and Featured badge are independent.

When you search with the default "Relevance" sort, Featured providers appear first, followed by non-featured providers. You can change the sort order to "Name (A-Z)" to see results without premium prioritization.

---

**Section 6: What We Can't Verify** (id: `limitations`)

Psychage makes reasonable efforts to ensure the accuracy of provider information but cannot guarantee:

- **Current licensure status.** Licensing is managed by individual state boards. A provider's license may lapse, be restricted, or be revoked after their last verification on Psychage. We recommend checking your state's licensing board directly.
- **Insurance acceptance.** Insurance networks change frequently. Even if a provider lists an insurance plan, confirm coverage directly with the provider and your insurer before scheduling.
- **Clinical outcomes.** Psychage does not evaluate or endorse any provider's clinical methods, treatment effectiveness, or patient outcomes.
- **Availability.** Providers may stop accepting new patients or change their practice hours without updating their Psychage profile.

For the most current information, contact the provider directly using the contact information on their profile.

---

**Section 7: See Something Wrong?** (id: `report`)

If you notice incorrect, outdated, or concerning information on any provider's profile, please let us know. Reports help us maintain the accuracy and integrity of the directory.

**Email:** info@psychage.com
**Subject line:** Provider Profile Concern: [Provider Name]

Include the provider's name, the issue you've identified, and any supporting information. We review every report and take appropriate action.

If you are a provider and your information is incorrect, you can claim your profile to update it directly.

---

### 2.4 Copy — Variant B (Warm/Educational)

---

**Page title:** How We Verify Providers

**Subtitle:** We believe finding the right mental health support starts with trust. Here's how we work to earn yours.

---

**Section 1: Where Our Data Comes From** (id: `data-source`)

You might be wondering: where do 400,000+ provider listings come from?

The answer starts with something called the NPPES — the National Plan and Provider Enumeration System. It's a federal database run by the Centers for Medicare & Medicaid Services (the same agency that oversees Medicare and Medicaid). Every healthcare provider who bills insurance in the United States is required to register for a unique 10-digit National Provider Identifier, or NPI.

We pull mental health provider records from this registry — psychiatrists, psychologists, licensed counselors, social workers, therapists, and psychiatric nurses — and create profiles with the publicly available information: names, credentials, practice addresses, and professional classifications.

Think of it this way: the NPPES is like the phonebook of U.S. healthcare providers. We've taken the mental health section and made it searchable, filterable, and more useful.

**One important thing to know:** Having an NPI means a provider registered with the federal government — it doesn't tell you whether their state license is current right now, or whether they've had any disciplinary actions. We always recommend double-checking with your state's licensing board before starting care.

---

**Section 2: What "NPI Listing" Means** (id: `npi-listing`)

When you see **NPI Listing** on a provider's card, it means their profile was created from federal registry data — they haven't personally set up or updated their information on Psychage yet.

**What you'll see:**
- Their name and credentials (as reported to the government)
- Practice address from federal records
- Professional classification (like "Clinical Social Worker" or "Psychiatry")
- Their NPI number, which you can use to look them up on other databases too

**What you won't see:**
- A personal bio or description of their approach
- Which insurance they currently accept
- Their specific specialties or areas of focus
- Whether they're currently accepting new patients

These profiles have less detail because the information comes from a registry, not from the provider themselves. It's real data from a legitimate source — just not the complete picture.

**Are you this provider?** If you see your listing and want to add your specialties, insurance, and a personal bio, you can claim your profile and make it yours.

---

**Section 3: What "Claimed" Means** (id: `claimed`)

A **Claimed** profile means the provider has found their listing on Psychage and said, "That's me — let me take it from here."

Here's what they did:
1. Created a Psychage account
2. Found their existing listing in our directory
3. Confirmed their identity by entering their NPI number (we check it against the federal registry in real time)

Once they've claimed their profile, they can add all the things that help you make a better decision: a personal bio, the insurance plans they accept, their treatment specialties, languages they speak, and whether they're taking new patients.

A Claimed profile tells you something important: this provider cares enough about their online presence to actively manage it. That said, "Claimed" doesn't mean we've independently verified their license beyond the NPI check — that happens at the Verified level.

---

**Section 4: What "Verified" Means** (id: `verified`)

**Verified** is our highest trust level. When you see this badge, it means:

1. **Their NPI checks out.** We've confirmed their National Provider Identifier against the federal registry.
2. **We've reviewed their profile.** The Psychage team has looked at their submitted credentials, practice information, and profile content.
3. **They passed our review.** Everything checked out, and we've given them our stamp of approval.

Verified providers have the most complete and reliable profiles in our directory. They've gone through our review process, and their information has been independently confirmed.

**A note on timing:** We verify information as of the review date (shown on each provider's profile). We don't monitor every license across all 50 states in real time — if something changes for a provider after their last verification, there might be a short delay before it's reflected. That's one reason we always recommend confirming details directly with the provider.

---

**Section 5: What "Featured" Means** (id: `featured`)

Providers with a **Featured** badge have a premium subscription with Psychage. We want to be upfront about what that means.

**What Featured providers get:**
- They appear higher in search results when you're browsing with the default sort
- They can write longer bios and upload more practice photos

**What Featured does NOT mean:**
- It doesn't change their verification level. A Featured provider can be Verified, Claimed, or an NPI Listing.
- It doesn't mean we endorse them more than other providers.
- It doesn't affect how we review or verify their credentials.

Featured placement is a paid service — it's how providers support the platform while reaching more potential patients. We believe in being transparent about this: when you see "Featured," you know there's a commercial relationship involved.

**Want to see results without premium sorting?** Switch to "Name (A-Z)" in the sort dropdown to remove the Featured boost.

---

**Section 6: What We Can't Verify** (id: `limitations`)

We want to be honest about our limitations. Here's what we can't guarantee:

- **Whether a provider's license is current right now.** Each state has its own licensing board, and license statuses can change. We recommend checking directly — [most states have an online lookup tool].
- **Whether they really accept your insurance.** Insurance networks change all the time. Always confirm with both the provider and your insurance company before your first appointment.
- **How good they are at their job.** We don't rate or rank providers based on clinical outcomes. Finding the right therapist is personal, and what works for one person might not work for another.
- **Whether they're available.** Providers' schedules change, and they might stop accepting new patients without updating their profile here.

The best approach? Use Psychage to discover and compare providers, then reach out directly to confirm the details that matter most to you.

---

**Section 7: See Something Wrong?** (id: `report`)

Spotted something that doesn't look right? We genuinely want to hear about it. Every report helps us keep this directory accurate and trustworthy.

**Drop us a line:** info@psychage.com
**Subject:** Provider Profile Concern: [Provider Name]

Tell us which provider, what looks wrong, and anything else that might help. We read every report and take action.

If you're a provider and your own information is off, the fastest fix is to claim your profile and update it yourself.

---

### 2.5 Design & Accessibility

**LOCKED decisions:**

- **Reading level target:** 8th-10th grade (Flesch-Kincaid), consistent with existing Psychage content standards per PEAF framework.
- **Heading structure:** One `<h1>`, seven `<h2>` sections, no `<h3>` needed (sections are flat).
- **Skip link:** Include `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>` at the top (consistent with other pages if present).
- **Alt text:** No images on this page (see 2.6). If an illustration is added later, alt text must describe the concept, not the decoration.
- **Language:** English only. Consistent with Finding #042 (entire directory is English-only). Translation deferred to the i18n phase.
- **Dark mode:** Full support using existing Tailwind dark: variants. All text colors selected in 1.1 already pass AA in dark mode.

### 2.6 Visual Treatment & Illustration Strategy

**LOCKED decisions:**

- **Layout:** Contained, single-column prose layout matching the existing `/about` or `/privacy` page pattern: `max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16`.
- **Background:** `bg-background` (no gradient hero — this is a trust/utility page, not a marketing page).
- **Typography:** Headings use `font-display font-bold` (Plus Jakarta Sans). Body text uses the default `text-text-secondary` (Inter). Section headings are `text-2xl`.
- **Badge previews:** Inline each badge visually next to its section heading (e.g., the Verified section shows the actual Verified badge component rendered inline). This creates an immediate visual connection between what users see on cards and the explanation.
- **Illustration:** None in Phase 2. The page's authority comes from clarity and transparency, not decoration. Illustration sourcing deferred to a future design pass.
- **Section dividers:** `<hr class="border-border my-10" />` between sections for visual rhythm.
- **SEO component:** `<SEO title="How We Verify Providers | Psychage" description="Learn how Psychage verifies provider credentials, what NPI verification means, and how to interpret trust badges in our mental health provider directory." />`

---

## 3. SEEDED-VS-CLAIMED DISTINCTION

### 3.1 On the Card

**LOCKED decisions for seeded (NPI Listing) cards:**

1. **Badge:** "NPI Listing" badge (gray, per 1.1) replaces the current "Publicly Listed" badge.
2. **Avatar:** Muted gradient. Current seeded fallback avatar already uses `from-gray-400 to-gray-500` when `isSeeded` is true (`ProviderCard.tsx:16`). **No change needed** — Phase 1 already implemented this distinction.
3. **Border treatment:** No left-border color. Seeded cards use `border-border` (the default). Only verified/claimed cards and pro/elite cards get colored left borders. **No change from current behavior.**
4. **Bio section:** Hidden for seeded cards. Already implemented: `{bioPreview && !isSeeded && ...}` (`ProviderCard.tsx:226`). **No change needed.**
5. **Contact buttons:** Hidden for seeded cards. Already implemented: `{!isSeeded && ...}` (`ProviderCard.tsx:240`). **No change needed.**
6. **Microcopy:** No additional microcopy on the card itself. The badge + tooltip (from the `TrustBadge` component) is sufficient. Adding microcopy like "Data from NPI registry" to every card in a 20-item result set would be visually noisy.

**LOCKED decisions for claimed cards:**

1. **Badge:** "Claimed" badge (blue, per 1.1). This is a new addition — currently claimed providers show "Psychage Verified" if they have `verified_at`, or nothing distinct if they're claimed but not yet verified.
2. **Avatar:** Standard teal gradient (not muted). Claimed providers have engaged with the platform.
3. **Border treatment:** `border-l-[3px] border-l-blue-400 dark:border-l-blue-500` — a subtle blue left border distinguishing claimed from seeded (no border) and verified (teal border).
4. **Bio section:** Shown if available (claimed providers can write bios).
5. **Contact buttons:** Shown if contact info exists.

**LOCKED decisions for verified cards:**

1. **Badge:** "Verified" badge (teal, per 1.1). Replaces "Psychage Verified" with shorter "Verified" text.
2. **Avatar:** Standard teal gradient or photo.
3. **Border treatment:** Existing `border-l-[3px] border-l-teal-500` is preserved. **No change.**
4. **Bio + contacts:** Shown.

### 3.2 On the Profile Page

**Seeded profile page changes:**

1. **Info banner:** Below the `ProfileHeader`, add an informational banner:
   ```
   <div class="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50
     rounded-xl p-4 text-sm text-amber-800 dark:text-amber-300 flex items-start gap-3">
     <Info size={18} class="flex-shrink-0 mt-0.5" />
     <div>
       <p class="font-semibold mb-1">This profile was created from federal registry data</p>
       <p>The information shown is sourced from the National Plan and Provider Enumeration System (NPPES)
         maintained by the Centers for Medicare & Medicaid Services. This provider has not claimed
         or verified their profile on Psychage. Information may be limited or outdated.
         <Link to="/how-we-verify#npi-listing" class="underline font-medium">Learn more</Link>
       </p>
     </div>
   </div>
   ```
   Contrast: amber-800 (#92400E) on amber-50 (#FFFBEB): ~7.4:1 -- passes AA.

2. **Hidden sections:** For seeded profiles where data is empty, hide (don't render) these sections rather than showing "No information available":
   - `AboutSection` — hide if `bio` is null
   - `InsuranceList` — hide if insurance_plans is empty
   - `CulturalBadges` — hide if cultural_competencies is empty
   - `LanguageBadges` — show if language data exists from NPI (it sometimes does)

3. **Claim CTA:** See 3.3 below.

**Claimed profile page changes:**

1. **No info banner** — the "Claimed" badge in the header is sufficient.
2. **All sections rendered** if data exists.
3. **No claim CTA** (already claimed).

### 3.3 Claim CTA on Seeded Profiles

**LOCKED: Show a "Claim this profile" CTA on seeded provider profile pages.**

**Placement:** After the last visible content section, before the "Find Similar Providers" CTA. Full-width card style.

**Visual treatment:**

```html
<div class="bg-surface border-2 border-dashed border-teal-300 dark:border-teal-700
  rounded-2xl p-6 text-center">
  <h3 class="font-display font-bold text-lg text-text-primary mb-2">
    Is this your practice?
  </h3>
  <p class="text-sm text-text-secondary mb-4 max-w-md mx-auto">
    Claim this profile to add your specialties, accepted insurance, a personal bio,
    and more. It's free and takes less than 5 minutes.
  </p>
  <Link to="/for-providers/claim"
    class="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white
      font-bold text-sm px-6 py-2.5 rounded-xl transition-colors
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
      focus-visible:ring-offset-2">
    Claim This Profile
    <ArrowRight size={16} />
  </Link>
</div>
```

**Accessibility:** Button contrast — white on teal-700 (#0F766E): ~4.8:1 (passes AA for large text / UI components at 14px bold). The `bg-teal-600` hover state `bg-teal-700` has better contrast.

**This CTA works regardless of whether Phase 1 Commit 11 (Edge Function claim rewire) ships.** It links to `/for-providers/claim` which is the existing claim page. The claim form handles the actual verification.

**Does it conflict with How We Verify messaging?** No — it reinforces it. The CTA says "claim and add your information" which is precisely what the How We Verify page describes as the path from NPI Listing to Claimed.

---

## 4. LAST-UPDATED SIGNALS

### 4.1 Source Column Decision

**LOCKED: Use `updated_at` as the primary signal, with `data_last_synced_at` as context for seeded providers.**

Rationale:
- `updated_at` — present on all providers. Updated by Postgres trigger whenever any column changes. This is the most truthful "when was this data last touched" signal.
- `data_last_synced_at` — only set for providers ingested via the bulk seed pipeline. Indicates when NPPES data was last pulled. Useful context for seeded providers.
- `verified_at` — only set when verification occurs. Already displayed in the profile footer.
- `claimed_at` — only set for claimed providers. Less useful as a freshness signal (a provider claiming once doesn't mean the data is current).

**Display logic:**

| Provider status | What to show | Source column |
|----------------|-------------|---------------|
| Seeded | "Data imported [date]" | `data_last_synced_at` (fall back to `updated_at`) |
| Claimed | "Profile updated [date]" | `updated_at` |
| Verified / Active | "Profile updated [date]" | `updated_at` |

### 4.2 Display Format & Copy

**LOCKED: Relative format for recent dates, absolute for older dates.**

Rules:
- If < 24 hours: "Updated today"
- If < 7 days: "Updated [N] days ago"
- If < 30 days: "Updated [N] weeks ago"
- If < 365 days: "Updated [month] [year]" (e.g., "Updated March 2026")
- If >= 365 days: "Last updated over a year ago"

For seeded providers using `data_last_synced_at`:
- Same relative/absolute rules but prefix is "Data imported" instead of "Updated"

### 4.3 Placement Rules

**LOCKED: Profile page only. Not on cards.**

**Rationale:** Cards already show badges, specialties, location, session format, languages, insurance, and cultural competencies. Adding a last-updated timestamp would increase visual density on an already dense card. The profile page is where users make the final decision — that's where freshness matters.

**Profile page placement:** In the existing footer section (`ProviderProfilePage.tsx:127-140`), below the existing "Credentials last verified" line.

```html
<p class="text-xs text-text-tertiary">
  <time datetime="2026-03-15T00:00:00Z">Profile updated March 2026</time>
</p>
```

### 4.4 Stale Data Handling

**LOCKED: Visual treatment for data older than 12 months.**

If `updated_at` (or `data_last_synced_at` for seeded) is more than 12 months old:

- Text changes to: "Last updated over a year ago — information may not be current"
- Color changes from `text-text-tertiary` to `text-amber-600 dark:text-amber-400`
- Contrast: amber-600 (#D97706) on white: ~3.1:1 — **passes 3:1 for non-text UI** but fails 4.5:1 for text. Use `text-amber-700` (#B45309) on white: ~4.7:1 — passes AA.

Corrected: use `text-amber-700 dark:text-amber-400`.

### 4.5 Semantic Markup

**LOCKED:**

```html
<time datetime="2026-03-15T00:00:00.000Z" class="text-xs text-text-tertiary">
  Profile updated March 2026
</time>
```

The `<time>` element with `datetime` attribute provides machine-readable date for search engines and assistive technology. The human-readable text inside is the relative/absolute format from 4.2.

---

## 5. CREDENTIAL GLOSSARY ROLLOUT

### 5.1 Surfaces That Need the Glossary

| Surface | File | Current state | Phase 2 action |
|---------|------|--------------|----------------|
| Provider card | `ProviderCard.tsx` | Has glossary (Phase 1 Commit 7) | None — already done |
| Provider card compact | `ProviderCardCompact.tsx` | No glossary | Add tooltip on credentials suffix |
| Profile page header | `ProfileHeader.tsx` | No glossary | Add inline explainer below name |
| Admin ProviderEditor | `admin/v2/providers/ProviderEditor.tsx` | No glossary | Add helper text next to credentials field |
| Portal profile (Basic Info) | `PortalProfile.tsx` | No glossary | Add helper text next to credentials field |
| Search filters | `ProviderFilterPanel.tsx` | N/A (no credential filter exists) | None — no credential filter to annotate |
| MindMate chat | `MindMate.tsx` | N/A | **DEFERRED** to MindMate provider integration phase |

### 5.2 UX Pattern per Surface

**ProviderCardCompact:** Same pattern as Phase 1's card implementation — `title` attribute on the credentials `<span>`, with the `explainCredential()` function providing the expansion text. No popover (too small a surface). LOCKED.

**ProfileHeader:** Different pattern. The profile page has more space, so use **always-visible subtitle text** below the display name instead of a hover tooltip:

```html
<h1>Dr. Sarah Chen, LCSW, PhD</h1>
<p class="text-xs text-text-tertiary mt-1">
  Licensed Clinical Social Worker, Doctor of Philosophy (Psychology)
</p>
```

Implementation: call `explainCredential(provider.credentials_suffix)` and render the full names as a subtitle. If `explainCredential` returns null (unknown credentials), show nothing extra.

This is more accessible than a tooltip — the information is immediately visible without interaction. LOCKED.

**Admin ProviderEditor:** Add a `<p class="text-xs text-text-tertiary mt-1">` below the credentials input field showing the expansion of whatever the admin has typed. Live preview using `explainCredential()`. LOCKED.

**Portal Profile (Basic Info):** Same as Admin ProviderEditor — live preview of credential expansion below the input. LOCKED.

### 5.3 Glossary Expansion (New Credentials, Scope)

Phase 1 shipped 31 credentials in `credentials.ts`. After reviewing common mental health taxonomy codes from the NPI registry:

**New credentials to add in Phase 2:**

| Abbreviation | Full name |
|-------------|-----------|
| `LCSW-R` | Licensed Clinical Social Worker — Registered |
| `LPC-MHSP` | Licensed Professional Counselor — Mental Health Service Provider |
| `LSCSW` | Licensed Specialist Clinical Social Worker |
| `LAC` | Licensed Associate Counselor |
| `LMHP` | Licensed Mental Health Practitioner |
| `LCADC` | Licensed Clinical Alcohol and Drug Counselor |
| `NCSP` | Nationally Certified School Psychologist |
| `CSW` | Clinical Social Worker (unlicensed/provisional) |
| `ACSW` | Academy of Certified Social Workers |

**Non-US credentials:** DEFERRED. The directory is US-only (Finding #042). International credential support is deferred to the international expansion phase.

**i18n for glossary entries:** English-only in Phase 2, consistent with the rest of the directory.

---

## 6. SEO ARCHITECTURE

### 6.1 Sitemap Strategy

**LOCKED: Static generation via Node script, producing a sitemap index + child sitemap files.**

**Rationale for static generation:**
- 423K providers requires at minimum 9 sitemap files (Google's 50K URL limit per file)
- Vercel serverless functions have a 10s timeout on free/pro plans — generating 423K URLs in one request is not feasible
- Build-time generation is deterministic and cacheable
- Files are served from `public/` as static assets — zero runtime cost

**Generation script:** `scripts/generate-sitemaps.ts`

**Output files:**

```
public/
  sitemap-index.xml          # Points to 9 child sitemaps
  sitemap-providers-0.xml    # Providers 0–49,999
  sitemap-providers-1.xml    # Providers 50,000–99,999
  ...
  sitemap-providers-8.xml    # Providers 400,000–423,403
  sitemap-pages.xml          # Static pages (landing, search, how-we-verify, etc.)
```

**Sitemap index structure:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://psychage.com/sitemap-pages.xml</loc>
    <lastmod>2026-04-19</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://psychage.com/sitemap-providers-0.xml</loc>
    <lastmod>2026-04-19</lastmod>
  </sitemap>
  <!-- ... 8 more -->
</sitemapindex>
```

**Child sitemap entry structure:**

```xml
<url>
  <loc>https://psychage.com/providers/abc123-uuid</loc>
  <lastmod>2026-03-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
```

**Priority assignments:**
- Verified/active providers: `0.7`
- Claimed providers: `0.6`
- Seeded providers: `0.5`
- Static pages (/providers, /how-we-verify): `0.8`

**Change frequency:**
- Verified/active: `monthly`
- Claimed: `monthly`
- Seeded: `yearly` (data changes only on NPPES re-sync)

**Which profiles are included:** All providers with `status IN ('active', 'seeded', 'claimed', 'verified')`. Suspended and rejected are excluded.

**Update cadence:** The script queries Supabase directly (using service role key, run locally or in CI). Run manually or via a weekly CI cron job. The `lastmod` for each URL uses the provider's `updated_at` value.

**robots.txt update:** Add to existing `public/robots.txt`:

```
Sitemap: https://psychage.com/sitemap-index.xml
```

**Script implementation sketch (for Phase 2b):**

The script connects to Supabase with service role key, fetches `id, status, updated_at` for all eligible providers in batches of 50K, writes XML files to `public/`. No runtime dependency — purely a build/CI artifact.

### 6.2 JSON-LD Structured Data

**LOCKED: Conditional schema type based on practice type.**

| Provider type | JSON-LD `@type` |
|--------------|----------------|
| Individual practitioner (solo or null practice_type) | `Physician` |
| Group practice / clinic / hospital | `MedicalBusiness` |

**Full example — Individual Verified Practitioner:**

```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Sarah Chen, LCSW",
  "description": "Licensed Clinical Social Worker specializing in anxiety, depression, and trauma therapy.",
  "url": "https://psychage.com/providers/abc123-uuid",
  "telephone": "+1-555-123-4567",
  "email": "sarah@example.com",
  "image": "https://example.com/photo.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "New York",
    "addressRegion": "NY",
    "postalCode": "10001",
    "addressCountry": "US"
  },
  "medicalSpecialty": ["Psychiatry"],
  "availableService": [
    {
      "@type": "MedicalTherapy",
      "name": "Cognitive Behavioral Therapy"
    }
  ],
  "isAcceptingNewPatients": true,
  "identifier": {
    "@type": "PropertyValue",
    "propertyID": "NPI",
    "value": "1234567890"
  }
}
```

**Full example — Group Practice:**

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Mindful Wellness Group",
  "description": "Group practice offering therapy, psychiatry, and counseling services.",
  "url": "https://psychage.com/providers/def456-uuid",
  "telephone": "+1-555-987-6543",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Los Angeles",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "medicalSpecialty": ["Psychiatry"],
  "isAcceptingNewPatients": true
}
```

**Missing field handling:**
- `telephone`, `email`, `image`, `description` (bio): omit the key entirely if null. Schema.org validators accept partial objects.
- `address`: omit if no primary location exists. The `@type: Physician` is valid without an address.
- `availableService`: only include if specialties with `category = 'treatment_approach'` exist. Map specialty labels to `MedicalTherapy.name`.
- `medicalSpecialty`: map the provider's `taxonomy_description` or top specialty to Schema.org medical specialties. If no mapping exists, omit.

**Rendering location:** Inside the `<head>` via React Helmet (the existing `SEO` component uses `react-helmet-async`). Add a `<script type="application/ld+json">` tag.

**SPA rendering caveat:** Psychage is a Vite SPA. Googlebot renders JavaScript (confirmed since 2019 with the evergreen Chromium renderer), so JSON-LD injected client-side via React Helmet will be visible to Google. However:
- Other search engines (Bing, Yandex, DuckDuckGo) may not render JS reliably.
- Social media crawlers (Facebook, Twitter) do not render JS.
- If SEO beyond Google becomes a priority, a pre-rendering solution (e.g., `vite-plugin-ssr`, Rendertron, or Prerender.io) would be needed. **DEFERRED** to a future SEO hardening phase. For Phase 2, Google-only JSON-LD via client-side rendering is acceptable and pragmatic.

### 6.3 Indexability Rules

**LOCKED decisions:**

**Robots meta per profile type:**

| Status | Robots meta | Rationale |
|--------|------------|-----------|
| `active` | `index, follow` (default — no meta tag needed) | Full profiles should be indexed |
| `verified` | `index, follow` | Same as active |
| `claimed` | `index, follow` | Claimed profiles have enriched content |
| `seeded` | `index, follow` | Seeded profiles are the bulk of the directory. Including them maximizes SEO surface area. Google can decide relevance. |
| `submitted` | N/A — not publicly visible (RLS blocks) | Not reachable |
| `suspended` | Return 404 via route guard | Profile should be de-indexed. 404 signals removal to crawlers. |
| `rejected` | N/A — not publicly visible | Not reachable |

**Suspended profiles:** If `getProviderById` returns a provider with `status = 'suspended'`, the profile page should render the existing "Provider Not Found" UI (which already exists in `ProviderProfilePage.tsx:53-69`). This produces a soft 404 for crawlers. No special 410 handling needed — Google treats 404 and 410 identically for de-indexing purposes.

**Canonical URLs:**

Each profile's canonical URL is `https://psychage.com/providers/{id}`. Set via the existing `SEO` component's `canonical` prop:

```tsx
<SEO
  title={...}
  description={...}
  canonical={`https://psychage.com/providers/${provider.id}`}
/>
```

**Duplicate profile handling:** Provider IDs are UUIDs (globally unique). NPI numbers are unique in the `providers` table (unique constraint). Duplicate profiles should not exist. If they somehow do, the canonical on each profile points to its own UUID — no cross-canonical needed. De-duplication is a data quality issue, not an SEO architecture issue. **DEFERRED** to data quality tooling.

---

## 7. INTEGRATION WITH PHASE 1

| Subsystem | Phase 1 dependency | Integration notes |
|-----------|-------------------|-------------------|
| **1. Badge taxonomy** | Commit 8 — Featured badge | Phase 2 adds click-through + aria-label to existing Featured badge. Does not restyle. |
| **1. Badge taxonomy** | Commit 7 — Credential glossary | Phase 2's TrustBadge component sits alongside (not replaces) credential explainer. No conflict. |
| **2. How We Verify** | Commit 8 — "Featured" concept | How We Verify page explains Featured. Copy references sort disclosure already added in Commit 8. |
| **3. Seeded/Claimed** | Existing VerificationBadge | Phase 2 replaces VerificationBadge with TrustBadge. Clean replacement — same file location, new component. |
| **4. Last-updated** | None | No Phase 1 overlap. |
| **5. Glossary rollout** | Commit 7 — credentials.ts + card tooltip | Phase 2 extends to other surfaces. Uses same `explainCredential()` utility. Does not modify Phase 1 code. |
| **6. SEO** | None | No Phase 1 overlap. |

**Potential conflict:** Phase 2 replaces the `VerificationBadge` component with `TrustBadge`. Phase 1 imports `VerificationBadge` in `ProviderCard.tsx` and `ProviderCardCompact.tsx`. Phase 2b should:
1. Create `TrustBadge.tsx` as the new component
2. Update imports in card components
3. Keep `VerificationBadge.tsx` as a thin re-export wrapper (for any other importers) that maps props to TrustBadge

This is a clean migration path with no breaking changes.

---

## 8. PHASE 2b EXECUTION PLAN

Ordered by dependency. Each commit is independently buildable and testable.

**Commit 1 — TrustBadge component**
Create `src/components/providers/shared/TrustBadge.tsx` with all four badge types (Verified, Claimed, NPI Listing, Featured). Include click-through navigation to How We Verify anchors. Add backward-compatible re-export from `VerificationBadge.tsx`. Unit test the DB-condition-to-badge-type logic.

**Commit 2 — Badge integration into cards**
Replace `VerificationBadge` usage in `ProviderCard.tsx` and `ProviderCardCompact.tsx` with `TrustBadge`. Add the Claimed border treatment. Update card border logic to distinguish claimed from seeded.

**Commit 3 — Badge integration into profile**
Update `ProfileHeader.tsx` to use `TrustBadge`. Add credential subtitle (glossary rollout for profile header).

**Commit 4 — How We Verify page**
Create `src/pages/providers/HowWeVerifyPage.tsx` with the selected copy variant. Add route `/how-we-verify` in `App.tsx`. Add entry point links from ProvidersLandingPage, footer, badge clicks, profile footer, and empty state.

**Commit 5 — Seeded profile banner + claim CTA**
Add the info banner for seeded profiles on `ProviderProfilePage.tsx`. Add the "Is this your practice?" claim CTA. Hide empty sections for seeded profiles.

**Commit 6 — Last-updated signals**
Add last-updated display to `ProviderProfilePage.tsx` footer. Implement relative/absolute date formatting. Add stale-data amber warning for 12+ month old data.

**Commit 7 — Credential glossary rollout**
Add glossary tooltip to `ProviderCardCompact.tsx`. Add live credential preview to PortalProfile and Admin ProviderEditor. Add new credentials to `credentials.ts`.

**Commit 8 — JSON-LD structured data**
Add JSON-LD generation to `ProviderProfilePage.tsx` via the SEO component. Conditional schema type (Physician vs. MedicalBusiness). Handle missing fields.

**Commit 9 — Sitemap generation script**
Create `scripts/generate-sitemaps.ts`. Generate sitemap index + child files. Update `robots.txt`. Add npm script: `"generate:sitemap": "npx tsx scripts/generate-sitemaps.ts"`.

**Commit 10 — Canonical URLs + indexability**
Add `canonical` prop to profile page SEO component. Add suspended-profile 404 handling in the profile page route guard.

**Estimated total: 10 commits.**

---

## 9. PHASE 2a DISCOVERIES

Findings discovered during design that are not in the existing audits:

1. **VerificationBadge uses `teal-600` text color.** This is the contrast-failing color identified in Finding #060. Phase 2 corrects this to `teal-700` in the TrustBadge replacement. Not flagged as a separate finding since #060 already covers it.

2. **ProviderCardCompact does not render the Featured badge.** The compact card only shows `VerificationBadge` — no Featured badge. Phase 2's layout rules (1.3) preserve this: compact cards show trust badge only. This is intentional, not a bug.

3. **`ProfileHeader.tsx` uses hardcoded Tailwind colors (`text-slate-900`, `text-slate-500`) instead of semantic tokens (`text-text-primary`, `text-text-secondary`).** These work but are inconsistent with the card components which use semantic tokens. Not fixing in Phase 2 (out of scope), but worth noting for a future consistency pass.

4. **The `ProviderRow` type includes `data_last_synced_at` but `ProviderCardData` (returned by search RPC) does not.** Last-updated signals on cards would require adding this column to the RPC return type. Phase 2 avoids this by only showing last-updated on the profile page (which uses `ProviderWithDetails` from a direct query, not the RPC).

5. **The existing SitemapPage (`src/pages/SitemapPage.tsx`) is an HTML page for users, not an XML sitemap for crawlers.** The page lists navigation links. The XML sitemap files generated in Phase 2 (subsystem 6) are a completely separate artifact in `public/`. No conflict.

6. **`verification_tier` column exists** (added in migration `20260310000003`) with values `'unverified', 'npi_verified', 'psychage_verified', 'featured'`. This column is **not used** by the current VerificationBadge component (which uses `status` + `verified_at`). Phase 2's badge taxonomy also derives badges from `status` + `verified_at` + `tier`, not from `verification_tier`. The `verification_tier` column may be useful for a future verification engine but is not load-bearing for Phase 2. No action needed.

7. **The SEO component supports `canonical` prop** but the profile page does not currently pass it. Phase 2 Commit 10 adds this.

---

## 10. OPEN QUESTIONS FOR RYAN

### Q1: Brand voice for How We Verify page

**Context:** The How We Verify page is the most important user-facing trust asset. Two complete copy variants are written in sections 2.3 (clinical/authoritative) and 2.4 (warm/educational).

**Options:**
1. Variant A — Clinical/authoritative (WebMD, Mayo Clinic tone)
2. Variant B — Warm/educational (Headspace, Calm tone — closer to Psychage's existing brand voice on ForProvidersLandingPage and ProvidersLandingPage)
3. Hybrid — Variant B for sections 1-4, Variant A for sections 5-6 (limitations and report sections benefit from clinical precision)

**My recommendation:** Option 3 (hybrid). Psychage's existing pages use warm, conversational language, but the legal/limitations sections need clinical precision to avoid misrepresentation. Variant B's "we" voice builds rapport; Variant A's "Psychage does not guarantee" protects against liability.

**Required before Phase 2b:** Yes

---

### Q2: FTC language for Featured listings

**Context:** Phase 1 Commit 8 added a `title` attribute: "This provider has a featured subscription with Psychage." The How We Verify page has a fuller explanation. The FTC requires "clear and conspicuous" disclosure of paid placement.

**Options:**
1. "Paid placement" — maximum legal clarity, potentially negative connotation
2. "Premium subscription" — accurate, neutral
3. "Featured listing" — softest language, still honest

**My recommendation:** Option 2 ("premium subscription") in the How We Verify page body text, with a clear statement that "Featured placement is a paid service" (already written in both copy variants). This is honest without being alarming.

**Required before Phase 2b:** Yes (affects copy in both variants)

---

### Q3: Rename "Publicly Listed" badge to "NPI Listing"

**Context:** The current badge says "Publicly Listed" which is vague. "NPI Listing" is more informative and transparent. However, it introduces a government acronym that some users may not recognize.

**Options:**
1. "NPI Listing" — technically precise, may be unfamiliar to consumers
2. "Registry Listing" — simpler, less specific
3. Keep "Publicly Listed" — already shipped, no change

**My recommendation:** Option 1 ("NPI Listing"). The How We Verify page explains what NPI means. The badge tooltip provides a one-sentence explanation. Using the precise term builds credibility with users who do know what NPI is, and educates those who don't.

**Required before Phase 2b:** Yes (affects badge label, copy, and aria-labels)

---

### Q4: Should the How We Verify page mention Psychage Certified (Tier 3 verification)?

**Context:** The `verification_tier` column includes `'psychage_verified'` and the PortalVerification page shows 3 tiers (NPI, License, Psychage Certified). But the verification engine doesn't exist yet (Finding #037). Including "Psychage Certified" on How We Verify creates expectations we can't fulfill.

**Options:**
1. Include it with a "Coming soon" note
2. Omit it entirely from Phase 2 — add when the verification engine ships
3. Include it as a future aspiration: "We're building a third tier..."

**My recommendation:** Option 2 (omit). Including something we can't deliver yet undermines the trust the page is trying to build. When the verification engine ships, the page gets updated.

**Required before Phase 2b:** No (I'll proceed with Option 2 unless directed otherwise)

---

### Q5: Sitemap deployment frequency

**Context:** The sitemap generation script runs locally or in CI. 423K providers don't change frequently (most are seeded), but claimed/verified providers do update their profiles.

**Options:**
1. Weekly via CI cron job
2. On every deploy (adds ~30s to build)
3. Manual — run when Ryan remembers

**My recommendation:** Option 1 (weekly CI cron). Providers update infrequently enough that weekly is sufficient for SEO. Running on every deploy wastes build time. Manual is unreliable.

**Required before Phase 2b:** No (script works regardless; cadence is a CI configuration choice)

---

## 11. SACRED ITEMS STATUS

| Sacred Item | Status | Notes |
|-------------|--------|-------|
| `search_providers_v2` RPC | Not touched | Design adds no RPC changes. Sitemap script reads directly, not via RPC. |
| NPI seed data path | Not touched | No changes to seed-bulk.ts or seed data. |
| Cascading fallback | Not touched | RPC → direct → mock cascade unchanged. |
| NPI verification against NPPES | Not touched | Claim flow CTA links to existing claim page. No verification logic changes. |
| Database schema core | Not touched | No new migrations in Phase 2 design. All badge logic is pure client-side derivation from existing columns. |
| 0.75 Navigator confidence cap | Not touched | Provider directory changes do not affect Navigator. |
| Crisis detection | Not touched | CrisisBanner remains in layout. No changes to crisis paths. |

---

## 12. DESIGN VALIDATION

- Zero files modified outside `.design/`
- `git status` output: `.design/TRUST_LAYER_PHASE_2.md` as untracked (new)
- Files read: ~25 files (audits, components, pages, migrations, types, queries, credentials, SEO, provider-tier)
- Design word count: ~6,500
- Locked decisions: 47
- Deferred decisions: 8
- Open questions for Ryan: 5
- Phase 2b commits: 10
