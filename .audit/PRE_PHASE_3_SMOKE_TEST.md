# Production Smoke Test — Post Phase 2b

**Date:** 2026-04-19
**Tester:** Ryan
**Estimated time:** ~20 minutes
**Environment:** psychage.com (production) — desktop + mobile viewport

Execute these on production. Mark pass/fail for each.

---

## 1. Homepage loads

**Action:** Visit https://psychage.com
**Expected:** Hero renders, featured sections visible, no console errors, page loads in <3s
**Result:** [ ] pass / [ ] fail
**Notes:**

---

## 2. Directory landing page

**Action:** Visit https://psychage.com/providers
**Expected:** Hero section, trust indicators, browse-by-type cards, how-it-works section all render. "Find Care" or equivalent CTA is visible.
**Result:** [ ] pass / [ ] fail
**Notes:**

---

## 3. Directory search — unfiltered

**Action:** Visit https://psychage.com/providers/search
**Expected:** Results load (should show provider cards), result count visible ("Showing X of Y providers"), filter panel present on left (desktop) or accessible via button (mobile).
**Result:** [ ] pass / [ ] fail
**Notes:**

---

## 4. Directory search — with filters

**Action:** On /providers/search, apply a state filter (e.g., "Florida") and a specialty filter (e.g., "Psychiatry")
**Expected:** Results narrow, filter chips appear above results, result count updates. Cards still render with badges.
**Result:** [ ] pass / [ ] fail
**Notes:**

---

## 5. Trust badges on cards — Unclaimed (seeded)

**Action:** On search results, find any provider card (all should be seeded/unclaimed currently)
**Expected:** Gray "Unclaimed" badge visible on the card with an info icon. Hovering/clicking the badge shows a brief explanation.
**Result:** [ ] pass / [ ] fail
**Notes:**

---

## 6. Trust badges on cards — Verified

**Action:** If verified_at was set on any providers (Stage 4), search for one of them by name.
**Expected:** Teal "Verified" badge visible. Clicking the badge navigates to /how-we-verify#verified.
**Result:** [ ] pass / [ ] fail — or [ ] N/A (if no providers were verified)
**Notes:**

---

## 7. Provider profile page — seeded variant

**Action:** Click into a seeded provider's profile from search results
**Expected:**
- Provider name, credentials, practice name visible
- Credential tooltip works (hover/click the `?` icon next to credentials → shows expansion like "LCSW — Licensed Clinical Social Worker")
- "Unclaimed" TrustBadge in the header
- Seeded info banner visible: "This profile was created from public NPI registry data..."
- Claim CTA visible: "Are you this provider?" linking to /for-providers/claim?npi=...
- Last-updated signal visible (e.g., "Data from NPI registry" or similar)
- JSON-LD present (View Page Source → search for `application/ld+json`)
- Canonical URL in `<head>` (View Page Source → search for `rel="canonical"`)

**Result:** [ ] pass / [ ] fail
**Notes:**

---

## 8. Provider profile page — verified variant

**Action:** If verified_at was set, visit that provider's profile
**Expected:** Teal "Verified" badge in header, no seeded info banner (unless also seeded — verify appropriate messaging)
**Result:** [ ] pass / [ ] fail — or [ ] N/A
**Notes:**

---

## 9. How We Verify page

**Action:** Visit https://psychage.com/how-we-verify
**Expected:**
- Page loads with 7 sections
- Sections 1-5: warm, approachable tone explaining verification tiers
- Section 6: clinical/regulatory details
- Section 7: warm closing with CTA
- TrustBadge examples render inline (Verified, Claimed, Unclaimed variants)
- Page is scrollable, no layout breaks

**Result:** [ ] pass / [ ] fail
**Notes:**

---

## 10. Claim flow entry

**Action:** From a seeded provider's profile, click the "Are you this provider?" / claim CTA
**Expected:** Navigates to /for-providers/claim with NPI pre-filled in the URL. Claim form loads with NPI verification step.
**Result:** [ ] pass / [ ] fail
**Notes:**

---

## 11. For-Providers landing page

**Action:** Visit https://psychage.com/for-providers
**Expected:** Conversion page renders: hero, stats bar, features, pricing with billing toggle, testimonials, FAQ accordion, bottom CTA. All animations smooth.
**Result:** [ ] pass / [ ] fail
**Notes:**

---

## 12. Mobile responsiveness — search page (375px)

**Action:** On Chrome DevTools, set viewport to 375px width. Visit /providers/search.
**Expected:**
- Filter panel collapsed behind a "Filters" button
- Cards stack vertically, readable at small width
- Search bar usable
- Trust badges visible on cards
- No horizontal scroll

**Result:** [ ] pass / [ ] fail
**Notes:**

---

## 13. Mobile responsiveness — How We Verify (375px)

**Action:** At 375px viewport, visit /how-we-verify
**Expected:**
- All 7 sections readable
- TrustBadge examples don't overflow
- No horizontal scroll
- Text wraps properly

**Result:** [ ] pass / [ ] fail
**Notes:**

---

## 14. JSON-LD verification (provider profile)

**Action:** On any provider profile page, right-click → View Page Source. Search for `application/ld+json`.
**Expected:** A `<script type="application/ld+json">` block with provider structured data (name, credentials, @type, address if available).
**Result:** [ ] pass / [ ] fail
**Notes:**

---

## 15. Footer links to How We Verify

**Action:** Scroll to the footer on any page.
**Expected:** A "How We Verify" or equivalent link in the footer navigating to /how-we-verify.
**Result:** [ ] pass / [ ] fail
**Notes:**

---

## Summary

| # | Test | Result |
|---|------|--------|
| 1 | Homepage loads | |
| 2 | Directory landing | |
| 3 | Search — unfiltered | |
| 4 | Search — with filters | |
| 5 | Unclaimed badge on cards | |
| 6 | Verified badge on cards | |
| 7 | Profile — seeded variant | |
| 8 | Profile — verified variant | |
| 9 | How We Verify page | |
| 10 | Claim flow entry | |
| 11 | For-Providers landing | |
| 12 | Mobile — search (375px) | |
| 13 | Mobile — How We Verify (375px) | |
| 14 | JSON-LD on profile | |
| 15 | Footer → How We Verify | |

**Overall: __ / 15 passed** (exclude N/A tests from denominator)
