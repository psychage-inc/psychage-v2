# Psychage Mobile — Implementation Blueprint (Expo SDK 54 / RN 0.81 / Expo Router v6 / NativeWind v4 / Supabase / Zustand)

> Authoritative migration plan to recreate the Psychage v2 web platform as a native mobile app with pixel-perfect design fidelity and complete feature parity. Ground truth = the repository at `/Users/raiyanabdullah/Desktop/psychage-v2` (audited 2026-06-15). Where prior audit docs and source conflict, **source wins**. Every "missing information" item is flagged explicitly rather than guessed.
>
> **Conventions in this doc:** ✅ = live/wired in web, 🟡 = exists but local-only, ⛔ = seeded/specced but not wired at runtime, ❓ = missing info requiring a product decision.

---

# Executive Summary

Psychage v2 is a Vite + React 18 + TypeScript SPA (NOT Next.js — a root `clarity-score/` Next.js spike exists but is an orphan) backed by Supabase (Postgres + Auth + Edge Functions + pgvector), Sanity CMS for article content, and Anthropic Claude (via Vercel serverless `api/ai/chat.ts`) for the MindMate assistant. Role-based access spans `patient | provider | admin`, with admin sub-roles (`super_admin | clinical_admin | viewer`) living in a **separate admin app on a separate domain** (`admin.psychage.com`).

**Migration thesis:** the backend (Supabase schema, RLS, Edge Functions, the `api/ai/chat.ts` serverless endpoint) is framework-agnostic and is **retained unchanged**. The mobile app is a new Expo client that reuses the existing Supabase project, Edge Functions, and AI endpoint. The web service layer (`src/services/*`, `src/lib/*`) is ~90% portable TypeScript — the only platform couplings are `localStorage` (→ AsyncStorage/MMKV/SecureStore), the Supabase browser client config (→ RN client with AsyncStorage session adapter), SSE consumption (→ `expo/fetch` streaming or XHR polyfill), Framer Motion (→ Reanimated/Moti), and CSS variables/Tailwind (→ NativeWind v4 + a theme object).

**Scope tiers for mobile v1 parity (recommendation):**
- **In-scope (patient app):** Auth, Onboarding, Home, Learn (articles), Tools/Compass tab (all 11 tools), Provider Finder, Crisis, Dashboard (settings/privacy/history/bookmarks), MindMate.
- **Defer or web-only:** Provider Portal (`/portal/*`), Admin app (separate domain), Sanity-authored editorial pages, video player (videos are mock data, ⛔), booking flow (⛔ no UI exists), Stripe subscription management (provider-side).

**Single biggest product decision blocking a clean build (❓):** the **Clarity Score has two competing live data paths** — (a) the wired web tool `ClarityScoreTool.tsx` → client `clarityScoreService` → `clarity_score_history`, and (b) a complete server-authoritative Edge Function suite (`assessment-start/submit/detail/history/share`) writing to `assessments` + `assessment_responses` with server-side scoring, rate limits, retake gates, and AES-256 share links. The mobile app should adopt the **Edge Function path** (it is the more secure, more complete, server-scored design) — but this must be confirmed (see Database Migration Plan).

---

# Current Web Platform Audit

## Stack (from `package.json`, `vite.config.ts`)
| Concern | Web | Mobile target |
|---|---|---|
| Framework | Vite + React 18.3 + React Router v7 (lazy) | Expo SDK 54 + RN 0.81 + Expo Router v6 |
| Language | TypeScript (strict) | TypeScript (strict) — reuse types verbatim |
| Styling | Tailwind 3.4 + CSS custom-property tokens, `darkMode: class` | NativeWind v4 + token theme object |
| State | React Context (Auth/Theme/Bookmark/Toast/Navigator/ProviderLookups) + TanStack Query v5 | Zustand (replaces Contexts) + TanStack Query v5 (retained) |
| Backend | Supabase JS 2.90, Sanity, Anthropic SDK, OpenAI (embeddings) | Same Supabase project + same Edge Functions + same `api/ai/chat` |
| Animation | Framer Motion + Lenis smooth scroll | Reanimated 3 + Moti; Lenis dropped (native scroll) |
| Charts | Recharts + D3 | `react-native-svg` + `victory-native` / `react-native-gifted-charts` |
| i18n | i18next (EN/PT/ES/SV/FR), chrome-only | i18next + `expo-localization` (chrome-only parity) |
| Icons | lucide-react | `lucide-react-native` |
| Fonts | Satoshi (sans), Fraunces (display), IBM Plex Mono | `expo-font` with same WOFF/TTF files |
| Bot defense | Cloudflare Turnstile (`@marsidev/react-turnstile`) | ❓ Turnstile has no first-class RN SDK — see Security |

## Deployment & topology
- SPA on Vercel; `vercel.json` rewrites all → `/index.html`, admin → `/admin.html`, redirect to `admin.psychage.com`.
- One serverless function: `api/ai/chat.ts` (maxDuration 60s) plus `api/ai/{embed,feedback,health}.ts` and `api/geo-detect`.
- Supabase Edge Functions (Deno) for assessments, account deletion, data export, provider claim, Sanity webhook, notifications.
- Node pinned to 22; pnpm 10.25.

## Known web gaps carried into mobile planning (from inventory)
- ⛔ **Adaptation engine** ("adaptive OS") has no implementing code — scores are computed/charted but never alter surfaced content. Mobile should not promise adaptive behavior beyond what exists.
- ⛔ **Symptom Navigator** runs off `src/data/mock_knowledge_base.ts` (984 lines), NOT the seeded `navigator_*` tables. Only `navigator_analytics` is written.
- ⛔ **Videos** queried by `videoService` but no migration creates the table — 64 hardcoded mock objects are the real source.
- ⛔ **Bookings/messages** tables + service exist; no UI wired.
- 🟡 **Clarity Journal, Relationship Health, Medication Tracker** are localStorage-only (no server tables).
- Clinical/article content is English-only (no `language` column on `articles`); i18n covers UI chrome only.

---

# Feature Inventory

| # | Feature | Web route(s) | Status | Mobile v1 |
|---|---|---|---|---|
| 1 | Marketing Home | `/` | ✅ | Adapt to mobile Home tab |
| 2 | Learn / Articles | `/learn`, `/learn/:cat`, `/learn/:cat/:slug` | ✅ (Sanity→Supabase→mock cascade) | In |
| 3 | Article search | `/search` | ✅ metadata search (no Algolia) | In |
| 4 | Video detail/player | `/watch/:id` | ⛔ mock data | Defer |
| 5 | Provider directory | `/providers`, `/providers/search`, `/providers/:id` | ✅ `search_providers_v3` RPC | In |
| 6 | Provider trust/verify pages | `/how-we-verify`, `/for-providers*` | ✅ marketing | Optional |
| 7 | Tools hub | `/tools` | ✅ | → Compass tab root |
| 8 | Clarity Score | `/clarity-score` | ✅ (+ Edge Function suite) | In |
| 9 | Mood Journal | `/tools/mood-journal` | ✅ `mood_entries` | In |
| 10 | Sleep Architect | `/tools/sleep-architect` | ✅ `sleep_diary_entries`+settings | In |
| 11 | Breathwork | inside Sleep Architect wind-down | ✅ session-only | In (also surface standalone) |
| 12 | Symptom Navigator (Compass engine) | `/tools/symptom-navigator` | ✅ engine, ⛔ DB KB | In (bundle KB) |
| 13 | Relationship Health Check | `/tools/relationship-health` | 🟡 local-only | In |
| 14 | Medication Tracker | `/tools/medication-tracker` | 🟡 local-only | In |
| 15 | Clarity Journal (CBT suite, 11 sub-routes) | `/tools/clarity-journal/*` | 🟡 local-only | In |
| 16 | MindMate AI chat | `/tools/mindmate` (full page) + floating widget | ✅ streaming + RAG + safety | In |
| 17 | Crisis support | `/crisis` + global button + modals | ✅ ~195-country DB | In (always-available) |
| 18 | Auth flows | `/login`, `/signup`, `/reset-password`, `/update-password`, `/auth/callback` | ✅ Supabase + Turnstile | In |
| 19 | Onboarding | `/onboarding` | ✅ | In |
| 20 | Patient dashboard | `/dashboard`, `/settings`, `/bookmarks`, `/history`, `/privacy` | ✅ | In |
| 21 | Assessment history | `/dashboard/history` | ✅ reads `clarity_score_history`/`assessments` | In |
| 22 | Privacy / GDPR (export, delete) | `/dashboard/privacy` | ✅ Edge Functions | In |
| 23 | Bookmarks | context + `/dashboard/bookmarks` | ✅ `bookmarks` table + local | In |
| 24 | Toolkits | `/toolkits`, `/toolkits/:id` | ✅ (seeded `review` only) | Optional |
| 25 | Provider portal | `/portal/*` | ✅ | Defer (separate provider app later) |
| 26 | Admin panel | `admin.psychage.com` | ✅ separate app | Out of scope |
| 27 | Newsletter / Contact | footer / `/contact` | ✅ | Optional |
| 28 | Booking | (tables only) | ⛔ | Out |

---

# Tool Inventory

Authoritative per-tool spec is in **Tools/Compass Tab Build Plan** below. Quick map:

| Tool | Persistence (web, reconciled w/ DB audit) | Scoring/engine | Mobile storage |
|---|---|---|---|
| Clarity Score | Edge Functions → `assessments`/`assessment_responses` (server-scored); legacy client path → `clarity_score_history`; anon → `localStorage psychage_clarity_progress`/`psychage_clarity_history` | `_shared/scoring.ts` (server) + `lib/clarity/scoring.ts` (client mirror); PHQ-4/WHO-5/UCLA-3/PSS-4 + 4 functioning items → 5 domains 0–20 → composite 0–100 → tier | Edge Functions + SecureStore drafts |
| Mood Journal | `mood_entries` + `localStorage psychage_mood_journal` | avg/trend/streak; color bins | `mood_entries` + MMKV fallback |
| Sleep Architect | `sleep_diary_entries` + `sleep_user_settings` + `localStorage psychage_sleep_architect_v2` | `lib/sleep/calculations.ts` efficiency/score; rMEQ chronotype | tables + MMKV |
| Breathwork | session-only | 4-7-8 / box / diaphragmatic phase timer | session-only (Reanimated) |
| Provider Finder | `search_providers_v3` RPC; URL-param state | server RPC, geo radius | RPC; Zustand filter state |
| Crisis | static `lib/crisis/data/countries.ts` + `localStorage psychage_country_pref` | geo resolution, severity matching | bundled JSON + SecureStore pref |
| Symptom Navigator | `localStorage` session + `navigator_analytics` insert; KB = bundled mock | `lib/navigator/engine.ts` weighted scoring, red-flag screen | bundled KB + MMKV session |
| Relationship Health | 🟡 `localStorage psychage_relationship_health_*` | per-domain Likert avg → 0–100 | MMKV (or new table — see DB plan) |
| Medication Tracker | 🟡 `localStorage psychage_medication_tracker_data` | adherence % | MMKV (or new table) |
| Clarity Journal | 🟡 `localStorage psychage_clarity_journal_v2`(+v1 migrate) | streak, sparkline merge | MMKV (or new table) |
| MindMate | `ai_conversations`/`ai_messages` (server) + `localStorage psychage_ai_chat_history` | `/api/ai/chat` SSE + RAG + 3-layer safety | server + SecureStore |

---

# User Journey Mapping

**J1 — New anonymous user → assessment → signup.** Home → "Start Free Assessment" CTA → Clarity Score (anonymous, localStorage draft) → results screen → prompt to create account to save → Signup (Turnstile) → email confirm → Onboarding → Dashboard (history now persisted server-side via Edge Function on auth).

**J2 — Returning patient daily loop.** Open app → Home/Compass → Mood check-in (`mood_entries`) or Sleep diary or Clarity Journal entry → streak updates → optional MindMate question.

**J3 — Crisis path (highest priority, must work offline).** Any screen → persistent crisis affordance → `/crisis` equivalent → geo-resolved country resources → call/text/chat deep links. Also auto-triggered: (a) Clarity Score crisis pattern (PHQ4 ≥ 8 or q4 ≥ 2), (b) Navigator red-flag screen, (c) MindMate Layer-0 keyword + Haiku classifier returning CRISIS (LLM bypassed, region hotlines returned directly).

**J4 — Symptom exploration.** Compass → Symptom Navigator → age gate → domain select → symptom select → optional severity/duration/frequency → engine → ranked educational conditions + provider/article links + disclaimer.

**J5 — Find care.** Compass/Home → Provider Finder → free-text + location ("near me" = geolocation) → filters (specialty/type/language/competency/insurance/telehealth) → results (infinite scroll) → provider profile → contact deep links (call/website/appointment URL). Booking ⛔.

**J6 — Account & data rights.** Dashboard → Settings/Privacy → consent toggles (`consent_log`), data export (Edge Function `data-export`), account deletion (30-day soft delete + banner, Edge Function `account-deletion`).

**J7 — MindMate session.** Compass/Home → MindMate → suggested questions → streaming answer with citations → thumbs feedback (`api/ai/feedback`) → conversation history (`ai_conversations`).

---

# Information Architecture

Web IA is a top-nav mega-menu (Learn / Tools / Find Care) + utility (search, crisis, theme, user menu) + role dashboards via sidebars. Mobile collapses this into a **bottom tab bar** (native pattern) + stack navigation per tab + global modals.

**Content domains:** Editorial (Learn, articles, authors, legal) · Tools/Compass (11 tools) · Care (provider directory) · Account (dashboard, settings, privacy, bookmarks, history) · Safety (crisis, always reachable) · Assistant (MindMate).

---

# Mobile Navigation Architecture

**Bottom tab bar (5 tabs) — patient app:**
1. **Home** — personalized landing, quick actions, recent activity, CTAs.
2. **Learn** — article library, categories, search, article reader, bookmarks entry.
3. **Compass** *(center, emphasized)* — Tools hub → all 11 tools. This is the product's core.
4. **Care** — Provider Finder (landing → search → profile).
5. **Me** — Dashboard: profile, assessment history, settings, privacy/data, bookmarks, theme.

**Global, tab-independent:**
- **Crisis affordance** — a persistent header/floating button present on every screen (mirrors web's always-rendered crisis button). Opens a crisis modal/route that works offline.
- **MindMate** — floating action button (FAB) on Home/Learn/Compass/Care (hidden on the full-screen MindMate route and inside crisis flows), mirroring web's widget visibility rules. Full-screen chat is a stacked route.
- **Auth modals** — login/signup presented as a stack or modal group; protected routes redirect to login with `redirectTo`.

**Visibility rules ported from web (`App.tsx`):** Footer/MindMate hidden on `mindmate`, dashboard, portal, onboarding. Crisis button always visible (even during preload). FAB ↔ crisis-card collision contract (`[data-floating]`) becomes explicit z-order/anchor logic in RN.

**Role routing:** `patient` → tabs above. `provider`/`admin` → mobile v1 shows a "Manage on web" interstitial linking to `portal`/admin domain (portal is deferred). Role resolved from JWT `app_metadata.role` (server-controlled — never `user_metadata`, per AUTH-001).

---

# Expo Router Structure

```
app/
├─ _layout.tsx                      # Root: providers (QueryClient, Zustand hydration, Theme, fonts), SafeArea, status bar
├─ index.tsx                        # Boot/splash → redirect by auth+role
├─ +not-found.tsx
│
├─ (auth)/                          # Public auth group (no tab bar)
│  ├─ _layout.tsx
│  ├─ login.tsx
│  ├─ signup.tsx
│  ├─ check-email.tsx
│  ├─ reset-password.tsx
│  ├─ update-password.tsx
│  └─ callback.tsx                  # deep-link OAuth/email handler
│
├─ onboarding/
│  └─ index.tsx                     # auth-gated, no tab bar
│
├─ (tabs)/                          # Main patient shell (bottom tabs)
│  ├─ _layout.tsx                   # Tabs.Navigator (Home/Learn/Compass/Care/Me) + global Crisis btn + MindMate FAB
│  ├─ index.tsx                     # Home
│  │
│  ├─ learn/
│  │  ├─ _layout.tsx                # Stack
│  │  ├─ index.tsx                  # library landing
│  │  ├─ [category].tsx             # category index
│  │  ├─ [category]/[slug].tsx      # article reader (PortableText/markdown)
│  │  └─ search.tsx
│  │
│  ├─ compass/                      # === Tools / Compass tab ===
│  │  ├─ _layout.tsx                # Stack
│  │  ├─ index.tsx                  # Tools hub grid
│  │  ├─ clarity-score/
│  │  │  ├─ index.tsx               # intro
│  │  │  ├─ assessment.tsx          # 20-question runner
│  │  │  └─ results.tsx
│  │  ├─ mood-journal/
│  │  │  ├─ index.tsx               # history
│  │  │  └─ new.tsx                 # 4-step wizard
│  │  ├─ sleep-architect/
│  │  │  ├─ _layout.tsx             # top tabs: overview/diary/dashboard/tools/wind-down/insights
│  │  │  ├─ overview.tsx
│  │  │  ├─ diary.tsx
│  │  │  ├─ dashboard.tsx
│  │  │  ├─ tools.tsx               # chronotype quiz, bedtime calc, debt tracker, hygiene audit
│  │  │  ├─ wind-down.tsx           # breathing + PMR + brain dump
│  │  │  └─ insights.tsx
│  │  ├─ breathwork/index.tsx       # standalone surface of wind-down breathing
│  │  ├─ symptom-navigator/
│  │  │  ├─ index.tsx               # state-machine flow (welcome→agegate→domains→symptoms→details→processing→results)
│  │  │  └─ crisis.tsx              # crisis off-ramp
│  │  ├─ clarity-journal/
│  │  │  ├─ index.tsx               # hub (streak, sparkline, 7 section cards)
│  │  │  ├─ daily.tsx  screening.tsx  thought-record.tsx  activation.tsx
│  │  │  ├─ triggers.tsx  toolbox.tsx  reflection.tsx  history.tsx  insights.tsx
│  │  │  ├─ entry.tsx               # V2 daily entry
│  │  │  └─ report.tsx              # therapist report
│  │  ├─ relationship-health/
│  │  │  ├─ index.tsx  wizard.tsx  results.tsx  history.tsx
│  │  └─ medication-tracker/
│  │     ├─ index.tsx  add.tsx  log.tsx  history.tsx  insights.tsx  export.tsx
│  │
│  ├─ care/
│  │  ├─ _layout.tsx
│  │  ├─ index.tsx                  # landing
│  │  ├─ search.tsx                 # filters + infinite list
│  │  └─ [id].tsx                   # provider profile
│  │
│  └─ me/
│     ├─ _layout.tsx
│     ├─ index.tsx                  # dashboard
│     ├─ history.tsx                # assessment history
│     ├─ bookmarks.tsx
│     ├─ settings.tsx
│     └─ privacy.tsx                # consent, export, delete
│
├─ mindmate.tsx                     # full-screen chat (modal/stack, hides FAB & tab bar)
├─ crisis.tsx                       # global crisis route (works offline)
└─ (modals)/
   ├─ crisis-support.tsx            # severity-aware crisis modal (WATCH/URGENT/CRISIS)
   └─ cookie-consent.tsx            # first-run consent
```

**Routing libs:** `expo-router` v6 (file-based), `expo-linking` for deep links (`auth/callback`, crisis, share-token assessment links). Native stack for transitions; `react-native-screens` enabled.

---

# Design System Specification

Recreate exactly — do not redesign. Source: `tailwind.config.js`, `src/styles/tokens.css`, `src/lib/animations.ts`.

## Color tokens (CSS vars → NativeWind theme + `useTheme()` object)
**Light** (`html.light` / default):
```
background #FBF9F4   surface #FBF9F4   surface-hover #F5F5F4   surface-active #E7E5E4
primary #1A9B8C      primary-hover #158A7D   primary-light #20B8A6
text-primary #0A0A0A text-secondary #57534E  text-tertiary #6D6762
border #E7E5E4       border-hover #D6D3D1
error #DC2626        success #16A34A         warning #CA8A04
homepage-bg #FBF9F4  homepage-content #F5F3EF  homepage-closing #F0F7F6  homepage-provider #0D5A52
```
**Dark** (`html.dark`):
```
background #0F0F0F   surface #171717   surface-hover #1F1F1F   surface-active #262626
primary #20B8A6      primary-hover #1A9B8C   primary-light #2DD4BF
text-primary #FAFAF9 text-secondary #D6D3D1  text-tertiary #A8A29E
border #3F3F46       border-hover #52525B
error #F87171        success #4ADE80         warning #FACC15
homepage-bg #0F0F0F  homepage-content #141414  homepage-closing #111614  homepage-provider #0A3D38
```
**Brand scales (static, both modes):** teal `{50 #F0FDFA,100 #E6F5F3,400 #2DD4BF,500 #20B8A6,600 #1A9B8C,700 #158A7D,900 #0D5C54}`; `brand-accessible #158A7D` (WCAG AA body text on light); charcoal `{50→950}`; semantic safety palette `crisis.red #DC2626`, `urgent.amber #D97706`, `watch.blue #2563EB`, `safe.green #059669`, `relevance.high #1A9B8C`.
**Navigator glass tokens:** light/dark `navigator-{bg-overlay,border,card-bg,card-hover,glass-bg,glass-border,floating-bar-bg}` (rgba — port to RN with explicit alpha; glass = `BlurView` on iOS, translucent overlay on Android).

## Typography
- `--font-sans` = **Satoshi** (variable 300–900 + italic), `--font-display` = **Fraunces** (variable 100–900, opsz/SOFT/WONK axes), mono = IBM Plex Mono. Ship the same WOFF2/TTF via `expo-font`. RN lacks variable-axis control — register discrete weights (300/400/500/600/700/900) as named families (`Satoshi-Regular`, `Fraunces-Bold`, etc.).
- Components: `Display` (Fraunces bold, h1, tracking-tight), `Heading` (Fraunces semibold, h2), `Text` (Satoshi, text-secondary), `GradientText` (Fraunces bold + masked gradient — use `MaskedView` + `expo-linear-gradient`).
- Fluid sizes (clamp on web) → resolve to fixed RN scale by breakpoint: `fluid-3xl` 30–40px, `fluid-4xl` 36–48px, `fluid-5xl` 48–72px. Pick value from device width buckets (xs 375 / sm 640 / md 768).

## Spacing / radius / shadow
- Spacing scale (rem→pt): 1=4, 2=8, 3=12, 4=16, 6=24, 8=32, 12=48, 16=64.
- Radius: sm 4, md 8, lg 12, xl 16, full 9999.
- Shadows (light): sm `0 1 2 /0.04`; md `0 4 6 /0.08`; lg `0 10 15 /0.08`; glow `0 0 20 rgba(26,155,140,0.12)`. (dark): deeper alphas (.3/.4/.5), glow `0 0 30 /0.3`. RN: iOS `shadowColor/Offset/Opacity/Radius`, Android `elevation` approximations; glow via colored shadow.
- Max-width containers (web) are irrelevant on phone; use full-width with horizontal padding 16/24. Keep them for tablet/landscape.

## Motion (`src/lib/animations.ts` → Reanimated/Moti)
- Durations: micro 150ms, small 200, medium 300, large 500, xl 700.
- Easings: standard `[0.4,0,0.2,1]`, decelerate `[0,0,0.2,1]`, accelerate `[0.4,0,1,1]`, spring `[0.34,1.56,0.64,1]` → `Easing.bezier(...)` / `withSpring`.
- Variants to port: `fadeIn, slideUp(y16), slideDown(y-16), scaleIn(0.95), slideInRight(x24), staggerContainer(stagger .06/delay .1), staggerItem(y12), glassCardHover(scale1.02,y-5), spark(scale .8→1 spring), orbitReveal(rotate -8), navigatorSlide(direction-aware x±60), navigatorFade(reduced-motion), hoverLift/hoverGlow/hoverScale/pressDown(tap scale .97), fadeTranslate(y14, .8s)`. Tap/press → `Pressable` + Reanimated scale. Scroll-reveal → `react-native-reanimated` + on-viewport (FlashList `onViewableItemsChanged`).
- **Reduced motion:** honor `AccessibilityInfo.isReduceMotionEnabled()` (mirrors `prefers-reduced-motion`). Global rule: collapse durations to ~0.

## Iconography
- `lucide-react-native` (same icon set as web `lucide-react`), stroke ~2, default 24, decorative `aria-hidden` → `accessibilityElementsHidden`. Touch targets ≥ 44pt.

## Accessibility (port web WCAG posture)
- Min 44pt touch targets; focus rings → focus/selected visual states; `accessibilityRole`/`accessibilityLabel` on all interactive elements; color-plus-shape (search highlight underline + bg); dynamic type support via scalable font sizes; VoiceOver/TalkBack labels on charts (data summaries).

---

# Component Library Specification

Rebuild `src/components/ui/*` (~27 primitives) as NativeWind components, preserving variant APIs. Catalog (variants quoted from source):

| Component | Variants | Sizes | Notes for RN |
|---|---|---|---|
| **Button** | primary / secondary / outline / ghost / glass / danger | sm h36 / md h44 / lg h56 / xl h64 | `Pressable` + Reanimated tap scale 0.97; `isLoading` spinner (Loader2); left/right icon; forwardRef |
| **Card** | default / glass / outline / ghost | — | compound `CardHeader/Body/Footer/Icon`; rounded-xl p-16; hoverEffect→press lift; glass=BlurView |
| **Modal** | — | sm/md/lg/xl/2xl maxWidth | RN `Modal` or `@gorhom/bottom-sheet`; backdrop blur; Esc→hardware back |
| **Input** | — | h44 | error state border-error + ring; `aria-*`→`accessibilityLabel`/`accessibilityState`; secure entry |
| **Label** | — | — | text-sm font-medium |
| **Badge** | neutral/success/warning/error/info/teal/amber/indigo/sky/rose/red/outline | — | rounded-full px-10 py-2 text-xs semibold |
| **Alert** | default/destructive/success/warning | — | role=alert→`accessibilityLiveRegion` |
| **Breadcrumbs** | — | — | rarely needed on mobile; keep for tablet |
| **Pagination** | — | sm | replace with infinite scroll on mobile |
| **Skeletons** | Article/Video/Provider/Detail/Directory/Topic/Tool/Global | — | shimmer via Reanimated; `animate-pulse` → opacity loop |
| **Typography** | Display/Heading/Text/GradientText | — | see Design System |
| **ConfirmDialog** | default/destructive | — | AlertDialog → RN Modal; dark canvas |
| **PageTransition** | — | — | screen transition via stack animation (opacity+y20+scale .98, 0.3s, `[0.16,1,0.3,1]`) |
| **EmptyState** | (compact) | — | icon circle + title + desc + action |
| **InteractiveCard** | — | — | spotlight pointer effect → drop or use press highlight |
| **ThemeToggle** | — | — | Sun/Moon; writes Zustand+SecureStore |
| **Logo / LogoIcon** | — | — | SVG (`react-native-svg`): "PSY" teal #1A9B8C + "CHAGE" currentColor |
| **SocialIcons** | — | 18 | 44pt targets; `Linking.openURL` |
| **HighlightedText** | — | — | `<mark>`→ styled `Text` bg teal-400/30 + underline |
| **CookieConsent** | — | — | first-run modal; SecureStore flag; maps to `consent_log` |
| **LanguageSwitcher / SkipLink / ScrollManager / Picture / NotificationPrompt** | — | — | LanguageSwitcher→i18next+expo-localization; Picture→`expo-image`; NotificationPrompt→`expo-notifications` perm prompt |

**Glass utility:** light `bg-white/80 + blur-xl + border-white/20`; dark `surface/80 + border-white/10`. iOS `expo-blur` `BlurView`; Android fallback semi-opaque surface.

**Forms:** reuse the web Input error pattern (border-error, message `role=alert`). Recommend `react-hook-form` + Zod (Zod schemas already exist in Edge Functions `_shared/validation.ts` — reuse).

---

# Supabase Database Audit

Backend is **retained as-is**. ~117 schema migrations (≈138 article-seed files ignored). No generated `database.types.ts` — generate one for mobile via `supabase gen types typescript`. Grouped tables (full column/RLS detail captured during audit; summary + mobile notes here):

### (a) Profiles / auth / admin
- `profiles` (PK→auth.users; `role` patient|provider|admin; privacy cols `deleted_at, deletion_scheduled_at, cookie_consent, age_verified, consent_version, subscription_tier`). RLS: self r/w; admin via `is_admin()`. Trigger `handle_new_user` on auth signup.
- `admin_roles` (super_admin|clinical_admin|viewer) — admin app only; not used by mobile patient app. RPCs `admin_upsert_role/admin_list_roles/admin_remove_role`.
- `admin_audit_log`, `platform_settings` — admin only.
- Security: `strip_user_metadata_role()` trigger blocks role escalation via `user_metadata`; `is_admin()`/`is_admin_writer()` SECURITY DEFINER.

### (b) Articles / content
- `articles` (status workflow draft→published, `content` markdown, `sanity_id`, ratings, category, `view_count`). RLS public-read published / admin-write. `article_comments`, `article_images` (+ `article-images` public storage bucket), `article_status_history`.

### (c) Clarity / assessment — **two models coexist**
- ✅ Server suite: `assessments` (raw + normalized domain scores 0–20, `total_score` 0–100, `score_label`, `clinical_flags` JSONB, `crisis_detected`), `assessment_responses` (per-item), `retake_gates` (7-day), `rate_limits` (token bucket), `share_tokens` (AES-256 encrypted), `clarity_index_contributions` (anonymized population aggregate, NO user_id). RLS self-owned; rate_limits/contributions service-role only.
- Legacy/minimal: `clarity_score_history` (used by client `clarityScoreService`).
- ⛔ Orphan older `assessment_questions`/`assessment_results`.

### (d) Navigator (⛔ seeded, runtime uses bundled mock KB)
- `navigator_symptoms`, `navigator_conditions`, `navigator_condition_symptoms`, `navigator_condition_red_flags`, `navigator_crisis_resources`, `navigator_matching_config` (singleton), `navigator_analytics` (✅ written, anonymous session_hash), `navigator_saved_results` (self RLS).

### (e) Mood / sleep
- `mood_entries` (value 1–10, tags[]), `sleep_entries` (legacy), `sleep_diary_entries` (✅ v2 rich diary, unique per user/date, computed `total_sleep_minutes`/`sleep_efficiency`), `sleep_user_settings`. All self-CRUD RLS.

### (f) Providers
- `providers` (status seeded|claimed|…|active, tier free|premium, NPI, GIN name search), `provider_locations` (geo), junctions `provider_specialties/languages/cultural_competencies/insurance`, lookups `provider_types/specialties/languages_lookup/cultural_competencies/insurance_plans`, `provider_verifications`, `provider_analytics_events` (session-hashed visitor_id), `provider_reviews` (1/quarter, feedback_text private), `provider_trust_scores`. RLS public-read active/seeded, owner-write. **RPC `search_providers_v3`** (geo radius, 15s timeout, total_count cap 10k).

### (g) Bookings / messages — ⛔ no UI
- `bookings`, `messages`. Participant-scoped RLS.

### (h) Consent / GDPR
- `consent_log` (8 consent types incl. `ai_chat_history`, `clarity_score_tracking`, `age_verification`; anon insert pre-auth), `dsar_requests` (export/deletion/rectification/restriction).

### (i) AI / MindMate
- `content_documents` (RAG library, FTS tsvector), `content_chunks` (vector(1536), **HNSW** cosine m=16 ef=64), `ai_conversations` (anon via session_id or self), `ai_messages`, `ai_providers` (separate AI-facing directory), `ai_analytics` (session-hashed). RPC **`match_content_chunks`** (threshold 0.72, topK 5). Legacy `psychage_embeddings`, `mindmate_events`.

### (j) Audit
- `audit_logs`, `user_activity` (self). RPC `log_user_activity`, `increment_provider_views`.

### (k) Tools / newsletter / bookmarks / Stripe / toolkits
- `tools`, `newsletter_subscribers`, `bookmarks` (article|video|provider|tool, unique per user/type/id), `contact_submissions`, `content_feedback`, `provider_favorites`, `provider_applications`. Stripe: `stripe_customers`, `provider_subscriptions`, `stripe_events_log`. Toolkits: `toolkits`/`toolkit_items` (seeded `review` only) + `toolkit_progress`.

**No-RLS / service-role-only:** `rate_limits`, `stripe_events_log`, `clarity_index_contributions`, content RAG tables (public-read). pgvector extension + HNSW index present. Storage bucket: `article-images` (public). Cron: `cleanup_expired_share_tokens()` referenced (no pg_cron deploy visible — ❓ verify schedule).

---

# API & Integration Audit

## Service layer (`src/services/*`, ~44 files) — portability
All services wrap Supabase via `withFallback`/`queryWithFallback`/`queryOneWithFallback` (`src/lib/withFallback.ts`) and are consumed through TanStack Query (`src/lib/queryClient.ts`, staleTime 60s, retry 1, no refetchOnWindowFocus). **Portable verbatim** except the Supabase client init and `localStorage` fallbacks. Key services: `moodService, sleepService, articleService, sanityArticleService, providerService, clarityScoreService, chatPersistenceService, bookmarkService, consentService, privacyService, onboardingService, searchService, toolkitService, contactService, newsletterService`.

## Supabase client (mobile)
Replace `src/lib/supabaseClient.ts` browser client with:
```ts
createClient(url, anonKey, {
  auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false }
})
```
Add `AppState` listener to start/stop `autoRefreshToken` on foreground/background (RN-specific). Keep anon key only; service-role stays server-side.

## AI endpoints (retained — Vercel)
- `POST /api/ai/chat` — Bearer-auth, rate-limited (20/min user), SSE stream. Events: `metadata, safety, token, citations, done, error`. Body `{messages, sessionId?, stream?, region?}`. 3-layer safety: Layer-0 regex keywords → Layer-1 Haiku classifier (`claude-haiku-4-5-20251001`, SAFE/CRISIS/URGENT/WATCH/OUT_OF_SCOPE/HARMFUL_REQUEST) → Layer-2 per-sentence output validation. On CRISIS the LLM is bypassed; `generateCrisisResponse(region)` returns hotlines. Chat model `claude-sonnet-4-5-20250929`. RAG via `match_content_chunks` (skipped gracefully if `OPENAI_API_KEY` absent).
- `POST /api/ai/embed` — Sanity webhook → chunk → embed → `content_chunks`.
- `POST /api/ai/feedback` — thumbs → `mindmate_events`/`ai_analytics`.
- `GET /api/ai/health`, `api/geo-detect` (region for crisis).
- **Mobile SSE:** use `expo/fetch` (streaming `Response.body` ReadableStream) or `react-native-sse`; reuse web `parseSSEStream`. Pass Supabase access token as Bearer.

## Supabase Edge Functions (Deno, retained)
`assessment-start/submit/detail/history/share/shared`, `account-deletion`, `data-export`, `claim-provider`, `sanity-webhook`, `password-change-notification`, `suspicious-activity-notification`, `verify-current-password`, `health`. Shared utils: `scoring.ts` (authoritative server scoring), `clinical-flags.ts` (validated cutoffs), `crisis-detection.ts` (PHQ-2≥5 / WHO-5%≤16 / PHQ-4≥10), `rate-limiter.ts`, `validation.ts` (Zod — reuse on client), `encryption.ts` (AES-256-GCM share links), `cors.ts`, `errors.ts`, `instruments.ts`. **Mobile calls these directly** with the user JWT.

## Third-party
- **Sanity** (article content cascade) — `@sanity/client` works in RN; render PortableText with `@portabletext/react-native`.
- **Turnstile** (signup bot defense) — ❓ no official RN SDK. Options: WebView-embedded Turnstile, switch to a mobile-friendly attestation (App Attest / Play Integrity), or relax for app builds. Decision required.
- **Sentry** — `@sentry/react-native`.
- **Geolocation** — `expo-location` (replaces `navigator.geolocation`).

---

# AI Systems Audit

| Concern | Implementation | Mobile |
|---|---|---|
| Chat model | `claude-sonnet-4-5-20250929`, streaming SSE | unchanged (server) |
| Safety model | `claude-haiku-4-5-20251001` classifier | unchanged |
| Embeddings | OpenAI `text-embedding-3-small` (1536) | unchanged (server) |
| RAG | `match_content_chunks` cosine ≥0.72 topK5 + hybrid FTS, dedupe by doc | unchanged |
| Crisis (chat) | 3-layer; CRISIS bypasses LLM, returns region hotlines | reuse; pass `region` from `expo-location`/`geo-detect` |
| System prompt | server-side `SYSTEM_PROMPT` (educator, never diagnose/prescribe, identify as AI); client system msgs stripped (`sanitizeMessages`) | unchanged — never send system prompt from client |
| Conversation persistence | `ai_conversations`/`ai_messages` (auth) or `localStorage` (anon) | server + SecureStore; clear on logout (AUTH-011) |
| Feedback | thumbs → `api/ai/feedback` | unchanged |
| Rate limit | 20/min/200/hr authed; 10/min/100/hr/300/day anon (in-memory; Upstash for prod) | unchanged; surface limit UI |

**Mobile AI architecture:** thin client → `POST /api/ai/chat` with Bearer JWT + `region`; stream tokens into message list with typing cursor; render citations as tappable cards (deep-link to Learn article or external); abort via `AbortController`; offline → queue/disable send with banner. All safety logic stays server-side; the client only renders crisis responses prominently and surfaces the global crisis route.

---

# State Management Architecture

Web uses React Context + TanStack Query. Mobile target: **Zustand (global/UI/session state) + TanStack Query (server cache)** — keep Query for all Supabase/REST reads; Zustand replaces the Context providers.

| Web Context | → Zustand store | Persisted? |
|---|---|---|
| `AuthContext` | `useAuthStore` (session, user, role, adminRole, signup status) | session via Supabase AsyncStorage adapter |
| `ThemeContext` | `useThemeStore` (theme, resolvedTheme, isDark) | SecureStore/MMKV `psychage_theme` |
| `BookmarkContext` | `useBookmarkStore` (ids, hydrate-on-login, toggle) | MMKV + `bookmarks` table sync |
| `ToastContext` | `useToastStore` (or `burnt`/`react-native-toast-message`) | no |
| `NavigatorContext` | `useNavigatorStore` (state machine, announcements, KB prefetch, restore/corrupt flags) | MMKV `psychage_navigator_session` |
| `ProviderLookupsContext` | TanStack Query (lookups are server data) | Query cache |

**Local tool state (localStorage → native):**
- Drafts/in-progress & sensitive health data → **`expo-secure-store`** (encrypted) for clarity progress, chat history; **MMKV** (fast, larger) for journals, medication, sleep cache, navigator session, bookmarks, mood fallback.
- Keys to port: `psychage_clarity_progress`, `psychage_clarity_history`, `psychage_mood_journal`, `psychage_sleep_architect_v2`, `psychage_country_pref`, `psychage_navigator_session`/`_kb`, `psychage_ai_chat_history`, `psychage_clarity_journal_v2`(+v1 migrate), `psychage_relationship_health_results`/`_prefs`, `psychage_medication_tracker_data`, `psychage_theme`, `psychage_bookmarks`, `cookieConsent`.

**Cross-user isolation (AUTH-011):** on `SIGNED_OUT`, clear Query cache + chat history + bookmark store.

---

# Offline Architecture

Offline-first matters because crisis resources and local-only tools must work without network.

- **Always offline:** Crisis resources (`lib/crisis/data/countries.ts` bundled), Symptom Navigator KB (bundled mock), Breathwork, and all 🟡 local-only tools (Clarity Journal, Relationship Health, Medication Tracker) — these already need no network.
- **Local-first write-through:** Mood Journal & Sleep Architect — write to MMKV immediately, sync to `mood_entries`/`sleep_diary_entries` when online (queue + `updated_at` conflict resolution, mirroring web sync banner states `idle/syncing/synced/error/offline`).
- **Server-authoritative (queue or block offline):** Clarity Score submit (Edge Function scoring — cannot score offline; allow answering offline, submit on reconnect), Provider search (network required — cached last results via Query persistence), MindMate (network required — disable send offline).
- **Query persistence:** `@tanstack/query-async-storage-persister` for article/provider read caches.
- **Connectivity:** `expo-network` / `@react-native-community/netinfo` → drives banners and send-gating.

---

# Security Architecture

- **Auth:** Supabase JWT; role strictly from `app_metadata.role` (server-controlled). Never trust `user_metadata` (AUTH-001; `strip_user_metadata_role` trigger enforces server-side). Signup metadata allowlisted (`age_verified, consent_version, country, age, referral_source`).
- **Session storage:** AsyncStorage adapter; consider `expo-secure-store` for refresh token at rest on device. Biometric lock (`expo-local-authentication`) recommended for a health app (optional gate before Dashboard/journals).
- **RLS:** unchanged — every user-owned table enforces `auth.uid()`. Mobile uses anon key only; service-role never ships to device.
- **PHI handling:** health data (assessments, journals, meds, mood) encrypted at rest on device (SecureStore/MMKV-with-encryption); no PHI in analytics (session-hashed only, mirroring web `*_analytics` tables).
- **Crisis data integrity:** crisis hotlines bundled & verified; never gated behind auth or network.
- **Bot defense:** Turnstile ❓ (see API audit) — pick App Attest/Play Integrity or WebView Turnstile.
- **Share links:** assessment AES-256-GCM tokens handled by Edge Functions; mobile deep-links `assessment/shared/:token`.
- **Transport:** TLS only; certificate pinning optional. CSP not applicable; rely on RN sandbox.
- **Deletion:** 30-day soft-delete (`deletion_scheduled_at`) + in-app banner + Edge Function `account-deletion` (request/cancel/execute).

---

# Analytics Architecture

Mirror web's anonymized posture. Tables already exist: `navigator_analytics`, `provider_analytics_events`, `ai_analytics`, `mindmate_events`, `user_activity`. All use `session_hash`/`visitor_id`, never raw user_id for behavioral events.

- **Client SDK:** keep it thin. Recommend a single analytics module wrapping (a) Supabase inserts for the existing anonymized event tables and (b) optional `expo-firebase-analytics`/PostHog for funnels — ❓ confirm whether a product analytics vendor is desired (web doesn't appear to use one beyond Sentry + Supabase).
- **Consent-gated:** analytics events fire only if `analytics_cookies` consent granted (`consent_log`).
- **Events to port:** assessment started/completed/crisis, navigator started/completed/crisis/result_clicked/provider_clicked, ai conversation_started/message_sent/crisis_detected/feedback, provider profile_view/contact_click.
- **Crash/perf:** `@sentry/react-native`.

---

# Notification Architecture

Web has only a browser `NotificationPrompt` stub + email notifications via Edge Functions (`password-change-notification`, `suspicious-activity-notification`). Mobile adds native push as **new capability** (allowed — it's the platform-native equivalent of existing email nudges, not a net-new product feature beyond reminders).

- **Library:** `expo-notifications` + push tokens stored server-side (❓ needs a new `device_tokens` table — see DB plan). APNs/FCM.
- **Local notifications (no backend):** medication dose reminders (from `scheduledTimes`), sleep wind-down/bedtime reminders (from `sleep_user_settings.target_bedtime`), journaling streak nudges, assessment retake availability (`retake_gates.next_available_at`).
- **Transactional (existing email functions):** password change, suspicious activity — optionally also push.
- **Consent & quiet hours:** respect notification permission + user prefs; never push crisis-adjacent content uninvited.

---

# Screen-by-Screen Build Plan

Format per screen: Purpose · Route · UI · Data deps · Supabase queries · Loading/Empty/Error/Success · Nav. (Non-tool screens here; tools in next section.)

### Home — `(tabs)/index`
Purpose: personalized landing + entry to assessment & tools. UI: hero, "Start Free Assessment" CTA (→ clarity-score), quick-action grid, recent activity (if auth). Data: `useAuthStore`, clarity dashboard stats (`clarityScoreService.getDashboardStats`). Queries: `assessments`/`clarity_score_history` (auth only). Loading: skeleton hero+cards. Empty: generic marketing (anon). Error: render static fallback. Success: render. Nav: tab root; deep links to compass tools, crisis FAB, MindMate FAB. (Note: no real adaptive branching — parity = static + stats display.)

### Learn library — `(tabs)/learn/index`
Purpose: browse articles. UI: category chips, featured/cornerstone, search entry, article cards. Data: `articleService` (Sanity→Supabase→mock cascade), `categoryService`. Queries: `articles` published; Sanity GROQ. Loading: `SkeletonArticleCard` grid. Empty: "no articles". Error: fallback to mock. Success: FlashList grid. Nav → `[category]`, `[category]/[slug]`, `search`.

### Category — `learn/[category]`
Purpose: category index. UI: header + article list + pagination→infinite. Data: `articleService.getByCategory`. Queries: `articles` filtered. States: skeleton/empty/error/list. Nav → article.

### Article reader — `learn/[category]/[slug]`
Purpose: read article. UI: hero image (`expo-image`), title (Fraunces), reading-time, PortableText/markdown body (`article-prose` styles ported), bookmark toggle, related, "reviewed by" (hardcoded `Psychage Team` — ⛔ no per-article reviewer in web). Data: `articleService.getBySlug` + `recentlyRead` (local last-10). Queries: `articles` by slug. Loading: `SkeletonArticleDetail`. Empty/404: not-found. Error: retry. Success: render + log read-state local. Nav: bookmark→`bookmarks` table, citations.

### Article search — `learn/search`
Purpose: metadata/title search. UI: search bar, `HighlightedText` results. Data: `searchService` (Supabase/RPC + client filter; no Algolia). Loading/empty/error/list. 

### Provider landing — `care/index`
Marketing + CTA to search. Static + lookups prefetch (`useProviderLookups`→Query). 

### Provider search — `care/search`
Purpose: find providers. UI: search bar + location ("near me"=`expo-location`), filter sheet (specialty/type/language/competency/insurance/telehealth/in-person/accepting/verification/sort), results FlashList infinite, "filters loosened" banner (RPC `dropped_filters`). Data: `useProviderSearch` (TanStack `useInfiniteQuery`). Query: RPC `search_providers_v3(...)`. Loading: skeleton cards. LoadingMore: footer spinner. Empty: suggestions. Error: retry toast. Success: list. State: Zustand filter store mirrored to nav params for shareable deep links.

### Provider profile — `care/[id]`
Purpose: provider detail. UI: header, credentials, specialties/languages/competencies, telehealth/in-person, reviews (text hidden publicly per RLS), contact buttons (call/website/appointment URL via `Linking`), favorite. Data: `providerService.getById` + reviews. Queries: `providers`+joins, `provider_reviews` (ratings only). Analytics: insert `provider_analytics_events` profile_view/contact_click (session-hashed). Booking ⛔. States: skeleton/notfound/error/detail.

### Auth: login / signup / check-email / reset / update-password / callback
Purpose: Supabase auth. UI: forms (`react-hook-form`+Zod), Turnstile ❓, error mapping (`authTelemetry.classifyAuthError`). Data: `useAuthStore` (`supabase.auth.*`). Signup metadata allowlisted. `callback` handles email/OAuth deep link (`expo-linking`). States: idle/submitting/error/success→redirect (`redirectTo`). Email confirmation governed by Supabase project config (❓ confirm enabled).

### Onboarding — `onboarding/index`
Purpose: post-signup profile setup + consents. UI: multi-step, consent toggles. Data: `onboardingService`, `consentService`→`consent_log`. Auth-gated. States: stepper. Nav → tabs.

### Dashboard — `me/index`
Purpose: patient home. UI: stats cards, charts (sleep/mood/clarity trends via victory-native), shortcuts, deletion banner if scheduled. Data: `clarityScoreService.getDashboardStats/getHistory`, mood/sleep stats. Queries: `assessments`/`clarity_score_history`, `mood_entries`, `sleep_diary_entries`. States: skeleton/empty(no data)/error/loaded.

### Assessment history — `me/history`
Purpose: past clarity results. UI: timeline list, trend, detail, share (Edge `assessment-share`). Queries: Edge `assessment-history` (or `clarity_score_history`). States: skeleton/empty/error/list. (Resolve which path — see DB plan.)

### Bookmarks — `me/bookmarks`
Purpose: saved items. UI: tabbed by type (article/provider/tool). Data: `useBookmarkStore` + `bookmarks` table. States: empty/list.

### Settings — `me/settings`
Purpose: profile/account. UI: name/avatar/email, password change (Edge `verify-current-password`), theme toggle, language, notifications prefs. Data: `userProfileService`. States: form.

### Privacy — `me/privacy`
Purpose: GDPR. UI: consent toggles (`consent_log`), data export (Edge `data-export` → download), delete account (Edge `account-deletion` request → 30-day countdown banner; cancel). States: toggles + confirm dialogs.

### Crisis — `crisis` (global)
Purpose: resources, offline. UI: country selector (search), emergency number prominent, resource cards (call/text/chat/visit via `Linking`), educational content. Data: bundled `COUNTRY_DATABASE` + `resolveCountry` (SecureStore `psychage_country_pref` → device locale → 'US'). No network required. States: always success; fallbacks (`GLOBAL_FALLBACKS`/`REGIONAL_FALLBACKS`) if country missing.

### MindMate — `mindmate` (full-screen)
Purpose: AI chat. UI: welcome + suggested questions, message list (user/assistant), streaming cursor, stop, citations cards, conversation history drawer, feedback thumbs. Data: `useChat`/`chatService` → `/api/ai/chat` SSE; persistence `ai_conversations`/`ai_messages` (auth) or SecureStore (anon). Auth-gated (web requires auth for full page). States: welcome/loading/streaming/idle/error(retry)/rate-limited. Hides tab bar + FAB.

---

# Tools / Compass Tab Build Plan

Compass tab root (`compass/index`) = Tools hub grid (cards: icon, name, description from `tools` table or static). Below: each tool, screens, data model, scoring, states, permissions.

### 1. Clarity Score — `compass/clarity-score/*`
- **Screens:** intro → assessment (20 questions, progress, per-question scale) → calculating → results (tier badge, domain radar, breakdown, clinical flags, strengths/growth, recommendations, save/share/export).
- **Instrument:** PHQ-4 (q1–4 emotional), WHO-5 (q5–9 vitality, inverted), UCLA-3 (q10–12 social), PSS-4 (q13–16 stress, reverse q14/q15), 4 functioning items (q17–20). Domains normalized 0–20 → composite 0–100 → tier {thriving≥80, balanced 60–79, struggling 40–59, distressed 20–39, crisis <20}. (Note: web `getScoreLabel` thresholds differ slightly from edge labels — use server `_shared/scoring.ts` as authoritative.)
- **Crisis pattern:** after PHQ-4, `checkCrisisPattern` (PHQ4≥8 or q4≥2) → crisis modal. Server `detectCrisis`: PHQ-2≥5 / WHO-5%≤16 / PHQ-4≥10.
- **Data:** `assessment-start`→`assessment-submit` (server-scored) → `assessments`+`assessment_responses`; retake gate 7 days; anon → SecureStore `psychage_clarity_progress`/`psychage_clarity_history`. **Reuse Zod `RawResponsesSchema`.**
- **Permissions:** anon allowed (local); auth required to persist server-side. Rate limit: 10 starts/day (user), 3/hr (anon).
- **States:** intro/answering(persist draft)/calculating/results; crisis overlay; error→partial result fallback.

### 2. Mood Journal — `compass/mood-journal/*`
- **Screens:** history list (+ sparkline) → new entry wizard (4 steps: valence 1–10 slider, emotion multi-select, impact areas multi-select, review).
- **Data:** `mood_entries` (value, notes, tags[]) + MMKV `psychage_mood_journal` fallback. `moodService` CRUD + stats (avg, trend last3 vs prior3 ±0.3, streak). Color bins 8–10 teal / 5–7 amber / 1–4 rose.
- **States:** loading/empty(first check-in)/error(local fallback)/list. Offline write-through.

### 3. Sleep Architect — `compass/sleep-architect/*` (top tabs)
- **Tabs:** overview / diary / dashboard / tools / wind-down / insights.
- **Diary fields:** bedtime, lights_out(≥bedtime), wake_time, sleep_quality 1–5, morning_mood 1–5, night_wakings, dream_recall/notes, naps[], substances{caffeine_time,alcohol,screens_min,exercise_time}, notes; future-date blocked.
- **Calc (`lib/sleep/calculations.ts`):** time_in_bed, total_sleep, efficiency %, latency, WASO; sleep score 0–100 (duration Gaussian@8h, efficiency, quality×20, consistency stddev penalty, latency penalty). Chronotype rMEQ → Lion/Bear/Wolf/Dolphin. Sleep-debt rolling.
- **Data:** `sleep_diary_entries` (unique/user/date) + `sleep_user_settings` + MMKV `psychage_sleep_architect_v2`. Charts → victory-native. Sync banner states.
- **States:** skeleton/empty/error(toast+local)/syncing/loaded.

### 4. Breathwork — `compass/breathwork` (+ inside wind-down)
- Patterns 4-7-8 / box / diaphragmatic (`lib/sleep/constants.ts`). Animated circle (Reanimated scale 1→1.4 inhale, hold, →1 exhale), phase label + countdown, cycle counter, play/pause/reset, completion. Honor reduced-motion. No persistence.

### 5. Symptom Navigator (Compass) — `compass/symptom-navigator/*`
- **State machine:** welcome → age gate (18+; underage notice/exit; `VITE_NAVIGATOR_AGE_GATE`) → domain select (mental core + conditional physical/substance) → symptom select (per domain) → optional details (severity 1–5, duration, frequency, notes) → processing → results (ranked conditions, relevance gauges, learn-more, provider/article links, "educational not diagnostic").
- **Engine (`lib/navigator/engine.ts`):** normalize inputs → red-flag screen (`safety.ts`; CRISIS halts → crisis off-ramp `symptom-navigator/crisis`) → weighted symptom-condition scoring with severity/duration/frequency modifiers → rank/cap (confidence cap 0.85, top ≤4, diversify families) → safe output.
- **Data:** **KB bundled from `mock_knowledge_base.ts`** (NOT `navigator_*` tables — preserve this). Session persisted MMKV `psychage_navigator_session` (restore/corrupt handling). Analytics → `navigator_analytics` (anonymous session_hash; consent-gated).
- **States:** per step; crisis overlay; restore-from-saved.

### 6. Clarity Journal — `compass/clarity-journal/*` (🟡 local-only)
- **Hub:** first-visit modal, privacy banner, streak (current/best), 14-day mood sparkline (merge V1+V2), 7 section cards, export/import.
- **Sections:** Daily Check-In, Weekly Screening, Thought Record (CBT), Behavioral Activation, Trigger Log, Wellness Toolbox, Weekly Reflection; V2 Daily Entry; Therapist Report.
- **Data model:** `ClarityJournalData` (v1 sections + v2 dailyJournals + preferences + settings). Storage MMKV `psychage_clarity_journal_v2` (migrate v1). Streak/sparkline/today logic (`storage.ts`,`dates.ts`). Multi-tab → not applicable; use store subscription. Export JSON.
- **States:** loading/empty(onboarding)/error(corrupt recovery)/hub. (DB plan proposes optional server table — see migration plan; default keep local for parity.)

### 7. Relationship Health Check — `compass/relationship-health/*` (🟡 local-only)
- Landing (4 domain previews: Partner/Family/Friends/Community; skip-partner toggle) → wizard (8–10 Likert 0–5 per surveyed domain) → results (overall 0–100, radar, per-domain insights, recommendations) → history (timeline, trend, delete).
- Scoring: per-domain avg → weighted overall; insight thresholds <30/30–60/60–80/80+. Storage MMKV `psychage_relationship_health_results`/`_prefs`. Radar → victory-native.

### 8. Medication Tracker — `compass/medication-tracker/*` (🟡 local-only)
- Dashboard (active meds, today schedule, log buttons, adherence gauge) → add/edit (name, dosage, frequency daily|every_2_days|weekly|as_needed, scheduledTimes[], indication, notes) → dose logger (taken|skipped|not_applicable + notes) → history → insights (adherence %, 30-day trend, patterns) → export (JSON/CSV/print).
- Data: `MedicationTrackerData` MMKV `psychage_medication_tracker_data`. Adherence = taken/expected. **Local notifications** for dose reminders (new mobile capability from `scheduledTimes`). Charts → victory-native.

### 9. MindMate — see Screen-by-Screen (full-screen route).
### 10. Provider Finder — see Care screens.
### 11. Crisis Support — see Crisis screen (global, offline).

**Compass nav hierarchy:** `compass/index` (hub) → tool stacks. Sleep Architect uses nested top-tab layout. Each tool deep-linkable. Crisis FAB + MindMate FAB available within Compass.

---

# Database Migration Plan

**Principle:** no schema rewrite. Reuse the existing Supabase project, RLS, Edge Functions. Mobile-specific additions only.

### Per-resource mobile strategy (decisions)
| Resource | Current | Mobile strategy | Risk |
|---|---|---|---|
| Clarity assessment | **Two paths** (Edge `assessments` vs client `clarity_score_history`) ❓ | **Adopt Edge Function path** (server-scored, retake gates, rate limits, share). Deprecate client `clarity_score_history` writes or keep read-only for legacy history merge. | Medium — must confirm which path web is moving to; history merge logic needed |
| Mood/Sleep | `mood_entries`, `sleep_diary_entries` | Direct + offline write-through | Low |
| Navigator | bundled mock KB; `navigator_analytics` write | Bundle same KB in app assets; write analytics | Low (preserve mock-KB decision) |
| Clarity Journal / Relationship / Medication | 🟡 local-only | **Default: keep local** (MMKV) for parity. **Optional v2:** new tables `clarity_journal_entries`, `relationship_health_results`, `medication_*` with self-RLS for cross-device sync | Low if local; Medium if syncing PHI (RLS + encryption review) |
| Providers | `providers`+`search_providers_v3` | Direct RPC | Low |
| MindMate | `ai_conversations`/`ai_messages` + RAG tables | Direct + `/api/ai/chat` | Low |
| Consent/GDPR | `consent_log`, `dsar_requests`, Edge funcs | Direct | Low |
| Bookmarks | `bookmarks` | Direct + store | Low |

### New migrations required for mobile
1. `device_tokens` (user_id FK, expo_push_token, platform, created_at; self-RLS) — for push.
2. (Optional) sync tables for the 3 local-only tools (above).
3. Generate `database.types.ts` (`supabase gen types`) for type-safe client.
4. Verify/add pg_cron for `cleanup_expired_share_tokens()` (❓ not visibly deployed).

### Edge Function changes
- None required functionally; verify CORS allows the app (mobile uses no Origin — CORS is permissive already). Confirm `SHARE_ENCRYPTION_KEY`, `ADMIN_FUNCTION_SECRET` set in the shared Supabase project.

---

# Development Roadmap

Effort in engineer-weeks (team of 2–3 RN engineers + 1 designer + part-time backend). Estimates assume backend is reused.

### Phase 1 — Foundation (3 wk)
- **Objectives:** Expo SDK 54 app boots; NativeWind v4 theme = web tokens; fonts (Satoshi/Fraunces) loaded; design-system primitives ported; Expo Router skeleton; Zustand + TanStack Query wired; Supabase RN client with AsyncStorage session.
- **Tasks:** theme object + dark mode; port ~27 UI primitives w/ variants; animations module (Reanimated/Moti); tab + stack layouts; icon set; storage abstraction (SecureStore/MMKV) with the keyed migration map.
- **Deps:** none. **Risks:** font variable-axis fidelity; glass/blur on Android. **Acceptance:** Storybook-equivalent screen renders every primitive in both themes matching web within tolerance; navigation shell works. **Effort:** 3wk.

### Phase 2 — Authentication (1.5 wk)
- **Obj:** full Supabase auth parity. **Tasks:** login/signup/reset/update/check-email/callback (deep link), role resolution from `app_metadata`, signup metadata allowlist, protected-route gating, Turnstile decision ❓, session refresh on AppState, logout cache clear (AUTH-011). **Deps:** P1. **Risks:** Turnstile RN; email-confirm config. **Acceptance:** all auth flows + role redirects + deep-link callback verified on device. **Effort:** 1.5wk.

### Phase 3 — Core Infrastructure (2 wk)
- **Obj:** offline, caching, errors, analytics, notifications scaffolding. **Tasks:** Query async-storage persistence; NetInfo banners + send-gating; error boundaries + Sentry RN; analytics module (consent-gated) → existing anonymized tables; `expo-notifications` setup + `device_tokens` migration; crisis route bundled + offline-verified. **Deps:** P1–2. **Risks:** push provisioning (APNs/FCM). **Acceptance:** app works airplane-mode for crisis + local tools; errors reported; permission prompts. **Effort:** 2wk.

### Phase 4 — Assessments (2.5 wk)
- **Obj:** Clarity Score end-to-end via Edge Functions. **Tasks:** 20-q runner + draft persistence; server submit/scoring; results (radar/flags/recommendations); crisis pattern → modal; retake gate; share link deep link; history merge. **Deps:** P2–3, DB decision. **Risks:** dual-path reconciliation; chart fidelity. **Acceptance:** scores match server golden values; crisis triggers correctly; history persists. **Effort:** 2.5wk.

### Phase 5 — Journaling (3 wk)
- **Obj:** Mood, Sleep Architect, Clarity Journal, Relationship Health, Medication Tracker, Breathwork. **Tasks:** port each tool's screens/scoring/storage; offline write-through for mood/sleep; local notifications for meds/sleep; charts. **Deps:** P3. **Risks:** Sleep Architect complexity (6 sub-tabs); chart parity. **Acceptance:** each tool matches web flows + computed values; offline works. **Effort:** 3wk.

### Phase 6 — AI Systems (2 wk)
- **Obj:** MindMate parity. **Tasks:** SSE streaming client (`expo/fetch`), message UI + citations + stop + feedback, conversation persistence, crisis rendering, rate-limit UI, region from geo. **Deps:** P2–3. **Risks:** RN SSE reliability; abort. **Acceptance:** streaming, citations, crisis bypass, persistence verified. **Effort:** 2wk.

### Phase 7 — Provider Features (2 wk)
- **Obj:** Provider Finder (directory only; portal deferred). **Tasks:** landing, search w/ filters + geolocation + infinite scroll, profile, contact deep links, favorites, analytics events. **Deps:** P3. **Risks:** RPC param surface; geo permission. **Acceptance:** search returns parity results; filters/sort/loosening work. **Effort:** 2wk.

### Phase 8 — Wellness Tools polish + Learn + Home (2 wk)
- **Obj:** Symptom Navigator, Learn library/reader, Home, Toolkits(optional). **Tasks:** Navigator state machine + bundled KB + analytics + crisis off-ramp; article cascade + PortableText RN reader + bookmarks + read-state; Home stats. **Deps:** P3–4. **Risks:** PortableText RN rendering. **Acceptance:** Navigator parity; articles render with prose styles. **Effort:** 2wk.

### Phase 9 — Notifications & Account/Privacy (1.5 wk)
- **Obj:** push + local reminders live; GDPR flows. **Tasks:** push token registration + server send hook; med/sleep/streak/retake reminders; settings, privacy (export/delete + banner), consent management. **Deps:** P3,5. **Acceptance:** reminders fire; export/delete via Edge Functions work. **Effort:** 1.5wk.

### Phase 10 — QA & Production (3 wk)
- **Obj:** ship. **Tasks:** Detox/Maestro E2E for critical journeys (J1–J7, crisis offline), accessibility audit (VoiceOver/TalkBack), perf (FlashList, image caching), pixel-diff vs web, EAS Build + submit (App Store/Play), store assets, privacy nutrition labels, beta (TestFlight/Internal). **Deps:** all. **Risks:** store review (health app data-use disclosures, crisis content). **Acceptance:** E2E green, a11y pass, builds accepted to beta. **Effort:** 3wk.

**Total ≈ 24.5 engineer-weeks** (~6 calendar months for a small team with overlap). Critical path: Foundation → Auth → Core Infra → Assessments → AI.

---

# QA Strategy

- **Unit:** scoring parity tests — run web `lib/clarity/scoring.ts`, `lib/sleep/calculations.ts`, `lib/navigator/engine.ts`, relationship/medication scoring against the same fixtures used in `supabase/functions/_shared/__tests__` (clinical-flags, crisis-detection, scoring). Mobile must produce identical outputs.
- **Integration:** Supabase RLS tests (already in `supabase/tests`); verify mobile anon-key client cannot read others' rows; Edge Function contract tests reused.
- **E2E (Detox or Maestro):** J1 anon→assessment→signup; J3 crisis offline (airplane mode); J4 navigator incl. red-flag crisis; J5 provider search; J7 MindMate streaming + crisis bypass; offline write-through for mood/sleep.
- **Accessibility:** automated (a11y lint) + manual VoiceOver/TalkBack on every screen; 44pt targets; reduced-motion; dynamic type; chart alt-summaries.
- **Visual parity:** screenshot diff key screens vs web reference in both themes.
- **Safety regression:** crisis detection must never regress — golden-set tests for keyword + classifier paths; crisis resources reachable offline and without auth.
- **Devices:** iPhone SE→Pro Max, common Android (Pixel, Samsung mid-range), tablet sanity.

---

# Launch Strategy

- **Build/CD:** EAS Build + EAS Submit; OTA updates via `expo-updates` for JS-only fixes (not for native/permission changes).
- **Phased rollout:** internal (TestFlight/Play Internal) → closed beta (existing users) → staged production (Play %, App Store phased release). Feature-flag tools (reuse `VITE_ENABLE_*` concept via remote config) to dark-launch.
- **Store compliance:** health-app data disclosures, privacy nutrition labels (PHI on device, anonymized analytics), crisis-content disclaimers, "educational not diagnostic" language, age rating, account-deletion in-app (App Store requirement — already supported via Edge Function).
- **Backend readiness:** confirm Supabase rate limits scale (assessment Edge Functions in-memory rate limiter → consider durable store for mobile traffic); confirm `/api/ai/chat` capacity (in-memory rate limit → Upstash recommended before scale).
- **Rollback:** OTA revert; staged-release halt; server unchanged so no DB rollback risk.

---

# Post-Launch Maintenance Plan

- **Monitoring:** Sentry RN (crashes/ANRs), Supabase logs, AI endpoint latency/error dashboards, crisis-path synthetic monitor (must always work).
- **Content sync:** Sanity webhook → `api/ai/embed` keeps RAG fresh; verify on mobile release cadence. Crisis country DB is bundled — schedule periodic verification + ship updates via app/OTA.
- **Dependency cadence:** Expo SDK upgrades (yearly), Supabase JS, model-id updates (Claude/embeddings live server-side — update without app release).
- **Data/PHI hygiene:** periodic review of on-device encryption, token rotation, RLS audits; honor deletion cron (`cleanup_expired_share_tokens`, account-deletion execute).
- **Backlog (deferred features → roadmap):** Provider Portal mobile app, booking flow (requires building the missing UI server-side first), video player (requires real `videos` table), the unbuilt adaptation engine, cross-device sync for local-only tools, article localization.

---

# Missing Information / Decisions Required (❓)

1. **Clarity Score canonical path** — Edge Functions (`assessments`) vs client (`clarity_score_history`). Recommend Edge Functions; confirm and define history-merge.
2. **Root `clarity-score/` Next.js app** — go-forward direction or abandoned spike? Reframes the assessment decision.
3. **Turnstile on mobile** — WebView vs App Attest/Play Integrity vs relax. 
4. **Email confirmation** — is it enabled in the Supabase project? (governs signup flow UX).
5. **Local-only tools sync** — keep local (parity) or add synced tables (PHI/RLS review)?
6. **Product analytics vendor** — Supabase-only anonymized events, or add PostHog/Firebase?
7. **Provider Portal mobile** — deferred to a separate provider app, or web-only indefinitely?
8. **`cleanup_expired_share_tokens` cron** — is pg_cron actually scheduled?
9. **Push notification scope** — which reminders are in v1 (med/sleep/streak/retake)?
10. **Biometric app-lock** — desired for a health app? (recommended, optional).

---

*Generated from a full read-only audit of psychage-v2 @ feature/toolkits-slice-3, 2026-06-15. Backend (Supabase schema/RLS/Edge Functions/`api/ai/chat`) is retained unchanged; this plan covers the new Expo client only.*
