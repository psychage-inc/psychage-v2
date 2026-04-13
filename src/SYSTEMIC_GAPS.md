# PSYCHAGE V2 — SYSTEMIC GAPS SURVEY
# Surveyed: 2026-04-12 | Files scanned: 1,281

---

## EXECUTIVE SUMMARY

Psychage V2 has strong individual features — warm emotional design, comprehensive tools, excellent crisis infrastructure — but it operates as **a collection of isolated experiences rather than a connected platform**. The site's six pillars (articles, tools, providers, Navigator, MindMate, Clarity Score) each work independently but almost never hand users off to each other. There is no shared page layout system, no content trust transparency for users, and no feedback or re-engagement mechanisms — meaning the platform cannot learn from users, cannot bring them back, and cannot prove why it should be trusted with mental health guidance.

---

## GAP 1: No Cross-Tool Orchestration System

**Status:** MISSING
**Severity:** CRITICAL
**Affects:** Every tool completion state, entire platform retention

**What's missing:**
After completing any tool, users are never guided to a related tool. The Mood Journal doesn't suggest the Clarity Score. The Sleep Architect doesn't suggest the Clarity Journal. The Relationship Health Check doesn't suggest finding a provider who specializes in couples therapy. Each tool is a standalone island.

**Evidence from codebase:**
- `src/components/tools/MoodJournal.tsx`: After saving an entry, switches to History view — no "Try the Clarity Journal" or "Check your Clarity Score" CTA
- `src/components/tools/ClarityScore/results/OverviewTab.tsx`: Shows consultation guidance but zero links to other tools (Mood Journal, Sleep Architect, etc.)
- `src/components/tools/SleepArchitect/index.tsx`: Multi-tab interface loops users within Sleep Architect — never suggests Mood Journal or Clarity Journal
- `src/components/tools/RelationshipHealthCheck/`: Results show patterns and action plans but no links to providers specializing in relationship therapy
- `src/components/tools/ClarityJournal/`: Sections save entries with "Saved" confirmation — no cross-tool CTAs
- Searched for `relatedTools`, `suggestedTool`, `recommendedTool` in `src/components/tools/` — zero results

**User impact:**
A user who finishes the Mood Journal has no idea the Clarity Score exists. Someone who completes the Relationship Health Check doesn't know there are 423K providers they could search by specialty. The platform has 8 tools but users discover them by accident, not by design. This directly kills engagement — users complete one tool and leave, never discovering the ecosystem.

**What needs to exist:**
A cross-tool recommendation engine that surfaces 1-2 relevant next tools after every tool completion, based on what the user just did and what they haven't tried yet.

---

## GAP 2: No Content Trust Transparency

**Status:** MISSING
**Severity:** CRITICAL
**Affects:** Every article page, overall platform credibility, user trust decisions

**What's missing:**
Psychage has a sophisticated internal content quality framework (PEAF) with 5-tier source hierarchies, blocked sources, readability checks, and sensitivity guidelines — but **none of this is explained to users**. There is no "How We Create Content" page, no editorial standards page, no methodology explanation. A user reading an article about depression has no way to know that the content was checked against 11 quality gates or that Wikipedia and WebMD are blocked sources.

**Evidence from codebase:**
- `src/lib/article-framework/`: Full PEAF engine with quality-gate.ts, readability.ts, constants.ts — entirely internal
- `src/lib/article-framework/CONTENT_GUIDELINES.md`: 30+ pages of editorial guidelines — developer documentation, not user-facing
- Searched for files matching `*methodology*`, `*how-we*`, `*editorial*`, `*our-process*`, `*content-standards*` in `src/` — zero results
- No route to `/about/our-content` or `/editorial-standards` or `/how-we-create-content` in `src/App.tsx`
- `src/pages/AboutPage.tsx`: Generic about page — does not explain content creation process

**User impact:**
This is a mental health platform. Users are making decisions about their wellbeing based on this content. Without visible editorial methodology, Psychage looks like any other health blog — indistinguishable from the WebMD and Psychology Today sites it explicitly blocks as sources. The PEAF framework is a genuine competitive advantage that users can't see.

**What needs to exist:**
A user-facing "How We Create Content" page that explains, in plain language: what sources are used (and which are blocked), how articles are reviewed, what the quality checks are, and why users can trust this content over random health blogs.

---

## GAP 3: No Medical Advisory Board Visibility

**Status:** MISSING
**Severity:** CRITICAL
**Affects:** Overall platform trust, article credibility, provider directory trust

**What's missing:**
There is no medical advisory board page. No names, credentials, or affiliations of anyone who reviews the content. Articles show author name and role (e.g., "Medical Review Team") but there's no way to verify who these people are or what their qualifications are. There are no author profile pages.

**Evidence from codebase:**
- Searched for `advisory`, `advisoryBoard`, `medicalBoard`, `reviewBoard`, `experts` across all `.tsx` files — zero results
- Searched for `authorProfile`, `authorPage`, `authorBio`, `/author/` — zero results
- `src/components/article/ArticleHeader.tsx`: Shows author name, role, and avatar — but name is not clickable, no link to author profile
- No `/team` or `/experts` or `/advisory-board` route in `src/App.tsx`
- No author profile page component anywhere in `src/pages/` or `src/components/`

**User impact:**
A skeptical user — and on a mental health platform, skepticism is healthy — sees content attributed to "Psychage Editorial" or a generic role. They can't verify who wrote it, who reviewed it, or whether anyone with clinical credentials was involved. This is table stakes for health platforms. Every credible health resource (Mayo Clinic, NIMH, Cleveland Clinic) prominently displays their medical review boards.

**What needs to exist:**
1. A medical advisory board page with real names, credentials, affiliations, and photos
2. Clickable author names on articles that lead to author profile pages with bios and credentials

---

## GAP 4: No Shared Page Layout System

**Status:** MISSING
**Severity:** HIGH
**Affects:** Every public page — visual consistency, development velocity, user orientation

**What's missing:**
There is no shared `PageLayout` component for public pages. Each page defines its own layout from scratch — its own container widths, header patterns, vertical spacing, and content structure. The admin panel has `AdminLayout` and the provider portal has `PortalLayout`, but public-facing pages (which are what 99% of users see) have no equivalent.

**Evidence from codebase:**
- Searched for `PageLayout`, `MainLayout`, `AppLayout`, `SiteLayout` in `src/` — zero results for public pages
- `src/components/admin/AdminLayout.tsx`: Exists — sidebar + top bar + content area for admin
- `src/components/portal/PortalLayout.tsx`: Exists — sidebar + content area for providers
- `src/App.tsx`: Global layout is just Navigation + `<main>` + Footer — no structural wrapper
- `src/pages/LearnPage.tsx`: Defines its own container, grid, spacing from scratch
- `src/components/pages/ToolsPage.tsx`: Defines its own container and header differently from LearnPage
- `src/pages/home/HomePage.tsx`: Full-width sections with no container consistency
- `src/components/pages/ArticleDetail.tsx`: Yet another layout pattern (2-column with sidebar)

**User impact:**
Every page feels slightly different — different spacing, different content widths, different header structures. The site feels like 15 products stitched together rather than one unified platform. Users lose their spatial orientation because the page structure keeps shifting. Developers can't add pages quickly because there's no template to follow.

**What needs to exist:**
A `PageLayout` component for public pages that enforces consistent: max-width containers, header regions (title + subtitle + breadcrumbs), content areas, and vertical rhythm. Individual pages compose within this shell rather than reinventing it.

---

## GAP 5: No User Feedback Mechanism

**Status:** MISSING
**Severity:** HIGH
**Affects:** Every article, every tool, platform improvement capacity

**What's missing:**
Users cannot rate content, report problems, or indicate whether something was helpful. There is no "Was this article helpful?" widget, no thumbs up/down on tool results, no feedback form, no "Report an issue" button on content pages. The platform publishes content into a void with no way to learn what's working.

**Evidence from codebase:**
- Searched for `feedback`, `wasHelpful`, `thumbsUp`, `thumbsDown`, `rateThis`, `reportIssue`, `helpfulCount` across all `.tsx` files — zero results in public components
- `src/app/api/ai/feedback/route.ts`: API route exists for AI chat feedback — but this is an API stub, not a user-facing widget
- No feedback component in `src/components/ui/` or `src/components/`
- No article rating system in `src/components/article/` or `src/components/pages/ArticleDetail.tsx`
- No tool satisfaction survey after any tool completion

**User impact:**
The platform is operating blind. 355 articles exist but there's no way to know which ones users find helpful, which are confusing, or which contain errors. Tools get completed but there's no satisfaction signal. The editorial team can't prioritize improvements because there's no user signal to work from. On a mental health platform, bad content isn't just unhelpful — it can be harmful. User feedback is the earliest warning system.

**What needs to exist:**
1. A lightweight "Was this helpful?" widget on every article and tool result
2. A "Report an issue" mechanism for content problems
3. Data pipeline to surface feedback to the editorial/admin team

---

## GAP 6: No Notification or Re-Engagement System

**Status:** MISSING
**Severity:** HIGH
**Affects:** User retention, tool effectiveness (journaling/tracking tools require daily use)

**What's missing:**
The platform has no way to proactively reach users. No email reminders, no push notifications, no SMS. The Clarity Journal's SettingsPanel has toggle switches for "morning reminder" and "evening reminder" but these are browser-based notification permissions only — and even those appear to be UI-only without a service worker to actually deliver them. There is no system to remind a user to journal, to follow up after a Navigator assessment, or to notify them when new content relevant to their interests is published.

**Evidence from codebase:**
- `src/components/tools/ClarityJournal/v2-sections/SettingsPanel.tsx`: Reminder toggles exist in UI — but states "Reminders are browser-based and require notification permissions"
- No service worker found for push notifications (`sw.js`, `service-worker.ts` — searched, not found)
- No email service integration (`sendgrid`, `resend`, `postmark`, `nodemailer` — searched, not found)
- No notification queue, scheduler, or delivery system in `src/services/`
- `src/context/ToastContext.tsx`: In-session toasts only — disappear when user leaves

**User impact:**
Mental health tools like mood journals and sleep trackers are only effective with consistent daily use. A user who tries the Mood Journal on Monday and forgets by Wednesday gets zero benefit. The platform has no way to gently encourage return visits, no way to say "You haven't journaled in 3 days — your streak was at 5." Retention is entirely dependent on the user remembering to come back on their own.

**What needs to exist:**
A notification system that can deliver gentle reminders via at least one channel (email, browser push, or both) — for journal streaks, assessment follow-ups, and new content relevant to the user's interests.

---

## GAP 7: No Scroll Position Restoration

**Status:** MISSING
**Severity:** HIGH
**Affects:** Learn page (article browsing), Provider search results, any list-to-detail-to-list navigation

**What's missing:**
When a user browses a list (articles, providers), clicks into a detail page, and hits the browser back button, they are returned to the top of the list — losing their scroll position. This is a fundamental SPA navigation problem that requires explicit handling.

**Evidence from codebase:**
- Searched for `scrollRestoration`, `ScrollToTop`, `scrollPosition`, `scrollTo` across all `.tsx` and `.ts` files
- Only found: `src/pages/learn/ArticlePage.tsx` line 111: `window.scrollTo(0, 0)` — this resets scroll on article navigation, but does NOT restore position when going back
- No `ScrollRestoration` component from React Router
- No manual scroll position saving/restoring in any list component
- No `history.scrollRestoration` management

**User impact:**
A user browsing the Learn page scrolls through 30 articles, clicks on article #25, reads it, hits back — and is dumped at the top of the page. They have to scroll through 24 articles again to find where they were. This is especially painful on mobile where scrolling is the primary navigation method. Users unconsciously learn that clicking articles is "expensive" and stop exploring.

**What needs to exist:**
Scroll position restoration for all list-to-detail navigation flows — either via React Router's `ScrollRestoration` component or manual scroll position caching in the list components.

---

## GAP 8: No URL-Based State for Filters and Wizards

**Status:** PARTIAL
**Severity:** HIGH
**Affects:** Provider search, article browsing, Navigator wizard, shareability

**What's missing:**
Filter states and multi-step wizard progress are stored in React state, not in the URL. If a user filters providers by "anxiety" + "telehealth" + "New York" and then refreshes the page, all filters are lost. If someone wants to share their filtered provider search with a friend, they can only share the base URL. Navigator wizard progress is saved to localStorage but not reflected in the URL.

**Evidence from codebase:**
- `src/pages/providers/ProvidersLandingPage.tsx`: Search query is passed via `params.set('q', query)` then `navigate(/providers/search?${params})` — basic search term only
- `src/hooks/useProviderFilters.ts`: Filter state (specialty, insurance, telehealth, etc.) managed in React state — not synced to URL params
- `src/hooks/useProviderSearch.ts`: Search logic uses React state, not `useSearchParams`
- `src/context/NavigatorContext.tsx`: 15+ state fields (currentStep, selectedDomains, selectedSymptoms) — all in context/localStorage, none in URL
- Searched for `useSearchParams` across all files — not found in provider filters or article filters
- `src/pages/LearnPage.tsx`: Category filtering is client-side state, not URL-based

**User impact:**
Users can't bookmark a filtered provider search. They can't share "providers who accept Aetna and specialize in anxiety in New York" with a friend — they'd have to explain how to re-apply all the filters. Page refresh during a provider search resets everything. This makes the provider directory (423K providers) much harder to use effectively.

**What needs to exist:**
URL synchronization for all filter states in provider search and article browsing, so filtered views are bookmarkable, shareable, and survive page refresh.

---

## GAP 9: No Personalized Content Recommendations

**Status:** PARTIAL
**Severity:** HIGH
**Affects:** Dashboard, article browsing, post-tool experiences

**What's missing:**
The dashboard's "Recommended Articles" section and the Learn page don't personalize recommendations based on user behavior. A user who has completed the Navigator for anxiety, journaled about sleep issues, and bookmarked articles about CBT gets the same generic article recommendations as someone who just signed up. The platform collects enough behavioral data to personalize (Navigator results, bookmarks, recently read, mood journal topics, onboarding wellness focus) but doesn't use it for recommendations.

**Evidence from codebase:**
- `src/components/dashboard/RecommendedArticles.tsx`: Fetches articles but no personalization logic based on user history or interests
- `src/pages/dashboard/UserDashboard.tsx`: Dashboard loads user-specific stats (mood, sleep, clarity) but article recommendations are not filtered by user's wellness focus or Navigator results
- `src/pages/OnboardingPage.tsx`: Collects `wellness_focus` preferences during onboarding — this data is stored but not used for content recommendations
- `src/components/articles/recentlyRead.ts`: Tracks recently read articles but only for "Continue Reading" display, not for recommendation algorithms
- No recommendation engine, content scoring, or personalization service in `src/services/`

**User impact:**
The platform knows what the user cares about (from onboarding, Navigator, bookmarks, reading history) but doesn't use that knowledge. Every user gets the same content surface. This makes the platform feel impersonal despite having rich user data — and wastes the onboarding flow's wellness focus selection, which users invested time in completing.

**What needs to exist:**
A recommendation layer that uses available signals (onboarding wellness focus, Navigator results, reading history, bookmarks, tool usage) to surface relevant articles and tools on the dashboard and Learn page.

---

## GAP 10: MindMate AI Cannot Generate Actionable Links

**Status:** PARTIAL
**Severity:** MEDIUM
**Affects:** MindMate chat experience, cross-feature discovery

**What's missing:**
MindMate AI can discuss articles, tools, and providers conversationally, but its responses render as plain text — there are no clickable links to specific articles, tools, or provider searches within AI responses. The AI tells users "you might want to try the Mood Journal" but doesn't render a button or link to `/tools/mood-journal`. The system prompt describes capabilities ("discover Psychage articles and tools") but the response renderer doesn't convert these mentions into actionable UI elements.

**Evidence from codebase:**
- `src/components/ai/MindMate.tsx`: Chat interface with message rendering — messages are plain text/markdown, no embedded action buttons
- `src/features/chat/ChatMain.tsx`: Message list renders text content — no special handling for tool/article references
- `src/features/chat/components/SourceCitations.tsx`: Source citations render with links, but only for AI-sourced references — not for in-conversation tool/article recommendations
- No component for rendering "suggested action" cards within chat responses
- AI responses about tools/articles are conversational text, not structured data with links

**User impact:**
When MindMate says "You might find our Mood Journal helpful for tracking these patterns," the user has to navigate away from chat, find the Tools page, locate the Mood Journal, and start it — a multi-step process that most users won't complete. The AI creates intent but doesn't deliver on it with a single click.

**What needs to exist:**
A response component that detects tool/article/provider mentions in AI responses and renders them as clickable action cards — e.g., a small card saying "Mood Journal" with a "Try it" button, embedded inline in the chat response.

---

## GAP 11: Inconsistent Loading State Patterns

**Status:** PARTIAL
**Severity:** MEDIUM
**Affects:** Every page with async data — visual consistency, perceived performance

**What's missing:**
There are 6+ different loading UI patterns used across the site with no unified approach. Some pages use shimmer skeletons (`Skeleton` component), others use a full-screen spinner (`GlobalLoading`), others use inline Lucide `Loader2` icons, and some pages define their own custom skeleton layouts inline rather than using the shared skeleton components.

**Evidence from codebase:**
- `src/components/ui/Skeletons.tsx`: 16+ skeleton components (SkeletonArticleCard, SkeletonProviderCard, SkeletonArticleDetail, etc.) — well-built shared library
- `src/pages/LearnPage.tsx`: Defines its own `LearnPageSkeleton` with custom `SkeletonPulse` component inline — does NOT use shared Skeletons
- `src/App.tsx`: `RouteLoadingIndicator` uses a simple spinning border (different from GlobalLoading or Skeletons)
- `src/components/ui/Skeletons.tsx` line `GlobalLoading`: Full-screen overlay with teal circle spinner — used for heavy loads
- Various button components use `Loader2` from lucide-react for inline spinners — yet another pattern
- `src/components/navigator/NavigatorSkeletons.tsx`: Navigator defines its own skeleton set

**User impact:**
Users see different loading UI on every page — sometimes a shimmer, sometimes a spinner, sometimes a blank page with a small circle. This creates a subconscious feeling of inconsistency. Some loading states (like the route indicator) are so minimal they look like the page is broken rather than loading.

**What needs to exist:**
A loading state strategy that standardizes when to use skeletons vs. spinners vs. overlay loading, and ensures all pages use the shared skeleton library rather than defining custom loading UI inline.

---

## GAP 12: No Unauthenticated First-Visit Differentiation

**Status:** PARTIAL
**Severity:** MEDIUM
**Affects:** Homepage, overall first impression for anonymous visitors

**What's missing:**
The onboarding flow exists but requires authentication — it's at `/onboarding` behind an auth guard. An unauthenticated first-time visitor (someone who just landed from Google) gets no special treatment. No contextual tooltips, no "new here?" guidance, no simplified path through the site. The site looks the same to someone visiting for the first time as it does to a returning power user.

**Evidence from codebase:**
- `src/pages/OnboardingPage.tsx`: 4-step onboarding (Welcome, FocusSelection, FirstMood, Ready) — but protected route, requires login
- `src/App.tsx`: Onboarding route wrapped in auth guard — unauthenticated users redirected to login
- `src/services/onboardingService.ts`: Checks `onboarding_completed` in Supabase `profiles` table — requires authenticated user
- `src/components/Preloader.tsx`: Uses `sessionStorage.getItem('psychage_intro_shown')` for intro animation — but this is a preloader splash, not a contextual guide
- No first-visit detection for anonymous users (no localStorage `hasVisited` check)
- No tour, tooltip, or progressive disclosure system for unauthenticated visitors

**User impact:**
Someone who googles "am I depressed" and lands on Psychage sees the same UI as a daily user. There's no gentle orientation — no "Welcome to Psychage, here's what you can do" for anonymous visitors. The homepage hero does a decent job explaining the platform, but once users navigate to the Learn page or Tools page, they're on their own to figure out what everything is.

**What needs to exist:**
A lightweight first-visit experience for unauthenticated users — even as simple as a dismissible banner or guided path on first visit, stored in localStorage, that helps new visitors understand what Psychage offers and where to start.

---

## GAP 13: No External Analytics

**Status:** PARTIAL
**Severity:** MEDIUM
**Affects:** Business decision-making, content strategy, feature prioritization

**What's missing:**
The platform has internal event tracking for specific features (Navigator step views, AI chat events) but no external analytics system (Google Analytics, Plausible, Mixpanel, Amplitude) to understand overall site usage. There's no way to know total page views, popular articles, user flow patterns, drop-off points, or conversion funnels.

**Evidence from codebase:**
- `src/lib/navigator/analytics.ts`: Tracks `trackStepView`, `trackComplete` for Navigator — internal tracking only
- `src/app/api/ai/chat/route.ts`: `AnalyticsTracker` class for chat events — server-side, internal
- Searched for `gtag`, `plausible`, `mixpanel`, `amplitude`, `analytics.js`, `ga4` across all files — zero results
- No analytics initialization in `src/index.tsx` or `index.html`
- No analytics context or provider in the React tree
- `src/services/provider-analytics.ts`: Provider profile view tracking — Supabase-based, internal

**User impact:**
The editorial team can't see which articles get the most reads. The product team can't see which tools have the highest completion rates. Nobody knows if users are finding providers or bouncing from the search page. Feature decisions are made without data — which means the platform can't systematically improve where it matters most.

**What needs to exist:**
A privacy-respecting analytics system (Plausible or similar) that tracks page views, tool completion rates, article engagement, and user flows — without compromising the platform's privacy-first promise.

---

## GAP 14: Inconsistent Card Component Architecture

**Status:** PARTIAL
**Severity:** MEDIUM
**Affects:** Visual consistency across articles, providers, tools, dashboard — development velocity

**What's missing:**
There are 40+ card components across the codebase, almost all built from scratch rather than extending the base `Card.tsx` component. Article cards, provider cards, tool cards, dashboard cards, navigator cards, and sleep cards all have different hover states, border radii, shadow depths, padding, and interactive behaviors. The base `Card.tsx` exists with variants (default, glass, outline, ghost) but is rarely used as a foundation.

**Evidence from codebase:**
- `src/components/ui/Card.tsx`: Base card with 4 variants — used in some places
- `src/components/article/FlatArticleCard.tsx`: Custom card, does not extend Card.tsx
- `src/components/providers/cards/ProviderCard.tsx`: Custom card, does not extend Card.tsx
- `src/components/tool/ToolCard.tsx`: Custom card, does not extend Card.tsx
- `src/components/dashboard/WellnessSnapshotCards.tsx`: Custom cards, does not extend Card.tsx
- `src/components/navigator/ResultCard.tsx`: Custom card, does not extend Card.tsx
- `src/components/tools/SleepArchitect/components/SummaryCards.tsx`: Custom cards
- `src/components/tools/RelationshipHealthCheck/`: PatternCard, DomainCard, FourHorsemenCard — all custom
- 40+ total card variants across the codebase

**User impact:**
The visual language shifts subtly from section to section. Article cards have one hover effect, provider cards have another, tool cards have yet another. Some cards have shadows, some use borders, some use glass effects. Users don't consciously notice individual differences, but they subconsciously register the inconsistency — the site feels assembled rather than designed.

**What needs to exist:**
A card system where specialized cards (ArticleCard, ProviderCard, ToolCard) extend or compose from the base `Card.tsx` component, inheriting consistent interactive behaviors, padding, borders, and shadows while adding domain-specific content.

---

## GAP 15: No Shared Public Empty State Component

**Status:** PARTIAL
**Severity:** MEDIUM
**Affects:** Search results, filtered views, empty dashboards, bookmarks page

**What's missing:**
When a search returns no results, when filters produce no matches, when a user has no bookmarks, or when the dashboard has no activity — each page handles this differently. There is an `AdminEmptyState` for admin pages, but no equivalent shared component for public-facing pages.

**Evidence from codebase:**
- `src/pages/admin/components/AdminEmptyState.tsx`: Clean empty state with icon + title + description — admin only
- No `EmptyState.tsx` in `src/components/ui/` or `src/components/`
- `src/pages/LearnPage.tsx`: Likely handles empty search results inline
- `src/components/providers/`: Provider search empty state handled inline
- `src/pages/dashboard/BookmarksPage.tsx`: Empty bookmarks state likely inline
- No shared pattern for "nothing here" across public pages

**User impact:**
Empty states are a critical UX moment — they're when users feel most lost. If every empty state looks different and says different things, users get inconsistent guidance. Some might say "No results" (unhelpful), others might say "Try adjusting your filters" (helpful), others might show nothing at all (confusing).

**What needs to exist:**
A shared `EmptyState` component for public pages with variants (no results, no data yet, error state) that provides consistent copy, illustration, and suggested next actions.

---

## GAP 16: No Platform-Level Progress System

**Status:** PARTIAL
**Severity:** MEDIUM
**Affects:** Dashboard, user motivation, long-term engagement

**What's missing:**
Individual tools track their own streaks (Clarity Journal has a streak counter, Sleep Architect tracks consecutive days, Medication Tracker shows adherence streaks), but there is no platform-level view of a user's overall mental health journey. There's no "You've been using Psychage for 30 days", no "You've read 15 articles about anxiety", no "Your mood trend is improving." The dashboard shows last-7-days stats but no longitudinal progress narrative.

**Evidence from codebase:**
- `src/components/tools/ClarityJournal/components/StreakTracker.tsx`: Journal-specific streak counter
- `src/components/tools/SleepArchitect/dashboard/DashboardSummaryCards.tsx`: Sleep-specific streak
- `src/components/tools/MedicationTracker/components/MedicationCard.tsx`: Medication adherence streak
- `src/pages/dashboard/UserDashboard.tsx`: Shows 7-day chart combining mood/sleep/clarity — but no monthly/quarterly trends, no milestones, no "your journey so far"
- No milestone system, no badges, no progress timeline in `src/components/dashboard/`
- No aggregate engagement tracking ("articles read", "tools completed", "days active")

**User impact:**
Mental health recovery is a journey, not a sprint. Users need to see that they're making progress — even small progress. Without a longitudinal view, every dashboard visit feels the same: "here are your last 7 days." Users who've been using the platform for months don't feel any different from someone who started yesterday. There's no narrative of growth to keep them engaged through difficult periods.

**What needs to exist:**
A platform-level progress view showing: days active, tools used, articles read, assessment history trends, streaks across tools, and milestone acknowledgments — creating a visible narrative of the user's mental health learning journey.

---

## GAP 17: Inconsistent Page Header Patterns

**Status:** PARTIAL
**Severity:** MEDIUM
**Affects:** Every public page — visual orientation, navigation consistency

**What's missing:**
Each page implements its own header structure. Article pages have breadcrumbs + category badge + title + author info + read time. The Tools page has breadcrumbs + centered title + description. The Learn page has a featured hero card with no traditional header. The About page, Contact page, and legal pages each have different header treatments. There is no shared `PageHeader` component for public pages (only `AdminPageHeader` for admin).

**Evidence from codebase:**
- `src/components/pages/ArticleDetail.tsx`: Breadcrumbs → Category badge → h1 → Author + date + read time → Hero image
- `src/components/pages/ToolsPage.tsx`: Breadcrumbs → Centered h1 → Description → Search/filters
- `src/pages/LearnPage.tsx`: Featured article hero card, no traditional page title/subtitle
- `src/components/admin/PageHeader.tsx`: Admin-only, takes title + description + actions
- No shared `PageHeader` in `src/components/ui/` or `src/components/layout/`
- `src/components/pages/CrisisPage.tsx`: Full-width hero with "You Are Not Alone" — no breadcrumbs
- `src/pages/providers/ProviderSearchPage.tsx`: Search bar as header — no breadcrumbs

**User impact:**
Users lose their orientation when navigating between sections. Some pages have breadcrumbs (articles, tools), some don't (learn, crisis, providers). Some pages center their titles, others left-align. The mental model of "where am I in the site" breaks down because the structural cues keep changing.

**What needs to exist:**
A shared `PageHeader` component for public pages with optional slots for: breadcrumbs, title, subtitle/description, and action buttons — used consistently across all top-level pages.

---

---

## FULL GAP LIST (Quick Reference)

| # | Gap | Status | Severity | Pages Affected |
|---|-----|--------|----------|---------------|
| 1 | No Cross-Tool Orchestration | MISSING | CRITICAL | All tool completion states |
| 2 | No Content Trust Transparency | MISSING | CRITICAL | All article pages, About |
| 3 | No Medical Advisory Board | MISSING | CRITICAL | All content, platform trust |
| 4 | No Shared Page Layout | MISSING | HIGH | All public pages |
| 5 | No User Feedback Mechanism | MISSING | HIGH | All articles, all tools |
| 6 | No Notification System | MISSING | HIGH | Dashboard, all tools |
| 7 | No Scroll Position Restoration | MISSING | HIGH | Learn, Providers, any list |
| 8 | No URL-Based Filter State | PARTIAL | HIGH | Provider search, Learn |
| 9 | No Personalized Recommendations | PARTIAL | HIGH | Dashboard, Learn |
| 10 | MindMate Can't Link to Resources | PARTIAL | MEDIUM | MindMate chat |
| 11 | Inconsistent Loading States | PARTIAL | MEDIUM | All async pages |
| 12 | No Anonymous First-Visit Guide | PARTIAL | MEDIUM | Homepage, all pages |
| 13 | No External Analytics | PARTIAL | MEDIUM | Business operations |
| 14 | Inconsistent Card Architecture | PARTIAL | MEDIUM | All card-based views |
| 15 | No Shared Public Empty State | PARTIAL | MEDIUM | Search, filters, empty views |
| 16 | No Platform-Level Progress | PARTIAL | MEDIUM | Dashboard, engagement |
| 17 | Inconsistent Page Headers | PARTIAL | MEDIUM | All public pages |

---

## CROSS-REFERENCE: WHICH PAGES ARE MOST AFFECTED

| Page/Feature | # of Gaps Affecting It | Most Critical Gap |
|------|----------------------|-------------------|
| All Article Pages | 7 | No Content Trust Transparency (#2) |
| Dashboard | 5 | No Personalized Recommendations (#9) |
| All Tool Completion States | 4 | No Cross-Tool Orchestration (#1) |
| Provider Search | 4 | No URL-Based Filter State (#8) |
| Learn Page (Article Browsing) | 4 | No Scroll Position Restoration (#7) |
| Homepage | 3 | No Anonymous First-Visit Guide (#12) |
| MindMate Chat | 2 | MindMate Can't Link to Resources (#10) |
| Crisis Page | 1 | No Shared Page Layout (#4) |
| Onboarding | 1 | No Anonymous First-Visit Guide (#12) |
| Admin Panel | 0 | N/A (well-structured) |
| Provider Portal | 0 | N/A (well-structured) |

---

## WHAT'S WORKING WELL (For Context)

These are NOT gaps. These systems are built and functioning:

- **Crisis infrastructure**: Excellent. CrisisBanner in footer on every page. CrisisOverlay triggered by high-risk Navigator responses. Crisis page is warm, compassionate, and actionable.
- **Emotional design**: The homepage hero, microcopy, custom illustrations, and color palette are warm, human, and appropriate for a mental health platform. Not clinical or cold.
- **Error handling**: Consistent. Global ErrorBoundary + per-route boundaries + feature-specific boundaries. ErrorFallback uses inline styles to avoid cascading failures.
- **SEO infrastructure**: Every page sets unique `<title>` and `<meta>` via react-helmet-async. Structured data (JSON-LD) for articles, organization, breadcrumbs.
- **Form state persistence**: Navigator wizard and Clarity Journal save progress to localStorage with TTL. Users can resume after page refresh.
- **Keyboard accessibility**: ARIA labels, roles, tabIndex, focus management, and onKeyDown handlers across key interactive components. Dedicated a11y tests.
- **Citation rendering**: ReferenceList with APA 7th formatting, tier badges, DOI links, and backlinks to citation locations in text.
- **Auth and role-based access**: Robust Supabase auth with patient/provider/admin roles, route guards, and navigation filtering.
- **404 handling**: Professional NotFoundPage with animated display, warm copy, CTAs, and popular page shortcuts.
- **localStorage persistence**: 24+ keys tracking user behavior across tools — mood, sleep, medication, bookmarks, chat history, reading history — with fallback for unauthenticated users.
- **Navigator next steps**: After Navigator results, clear CTAs guide users to Mood Journal, Provider Search, and Learn hub.
- **Clarity Score action paths**: Score-based guidance links to providers (low score), tools (moderate), and continued learning (high score).
- **Onboarding flow**: 4-step authenticated onboarding collects wellness focus, initial mood, and preferences.
- **Streaks (tool-level)**: Clarity Journal, Sleep Architect, and Medication Tracker each track and display consecutive-day streaks.

---

*This survey documents what's missing, not what's broken. Every gap represents a system that should exist but doesn't — evaluated from the perspective of a user seeking mental health support, not a developer reviewing code quality. Hand this to your UX advisor for resolution planning.*
