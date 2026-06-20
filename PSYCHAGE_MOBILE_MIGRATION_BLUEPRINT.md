# Psychage V2 — Native Mobile Migration Blueprint

**Web source:** `/Users/raiyanabdullah/Desktop/psychage-v2` (React 18 + TS + Vite + Supabase + Sanity)
**Mobile target:** `/Users/raiyanabdullah/Desktop/psychage app` (Expo SDK 54 · RN 0.81 · React 19 · Expo Router v6 · NativeWind v4 · Zustand · Supabase-js 2.x)
**Date:** 2026-06-15
**Status of mobile app today:** UI shell + Zustand state in place; Supabase **unwired** (empty env); only Hub, Mood History, Profile are real; Learn/auth/assessments/AI/providers absent.

> Companion doc: `MOBILE_ARTICLE_PARITY_AUDIT.md` covers the Learn/article domain in depth. This blueprint covers the **whole platform** and references that audit rather than repeating it.

---

## 0. Critical Pre-Decisions (read first)

These three facts shape everything below. They are surfaced up-front because they change scope materially.

| # | Finding | Impact | Recommended resolution |
|---|---|---|---|
| **D1** | **Design-system divergence.** The existing mobile app ships a *different brand*: forest/sage/lime/cream ("Opal") palette, Domine + Plus Jakarta Sans fonts, black tab tint. Web brand is **teal `#1A9B8C` + charcoal/stone**, Satoshi + Fraunces fonts. | The constraint "replicate the web version as closely as possible" is **violated by the current mobile theme.** | **Re-theme the existing RN shell to web tokens** (Phase 1). Keep the component architecture (glass primitives, Zustand, router) — swap the token layer. Treat current Opal palette as throwaway. *Assumption A1.* |
| **D2** | **Article body content is web JSX.** Rich article bodies live as React/TSX modules in `src/data/articles/category-*/`; RN cannot render them. | Single biggest porting blocker for Learn. | Adopt a content strategy (HTML-in-RN renderer over `articles.content`, or markdown). Decided in §9, Phase 3. |
| **D3** | **No server-side article search; client BM25 over ~6–7k rows.** Web loads up to 6,000 article metadata rows and scores client-side. | Too heavy for mobile memory/bandwidth. | Build a Postgres FTS RPC on `articles` (pattern already exists for `content_documents`) before wiring mobile search. *Backend task, Phase 3.* |

---

## 1. Executive Summary

Psychage V2 web is a **mature, multi-role mental-health platform**: 113 routable paths across public marketing, a patient app, a provider portal, and a separate admin command center. It is backed by a **security-hardened Supabase project** (~92 tables, ~13 edge functions, pgvector RAG, AUTH-001 admin-role isolation, GDPR/DSAR tooling, anonymized analytics) and an **Anthropic Claude** serverless AI endpoint (Sonnet 4.5 chat / Haiku 4.5 safety, RAG, streaming SSE).

The mobile target already exists as an **Expo SDK 54 / RN 0.81 shell** with the correct *stack* but the wrong *brand* and **no backend wiring**. Roughly 80% of product surface area is unbuilt on mobile.

**Migration thesis:** the web data layer is cleanly **service-isolated** and the Supabase backend is **shared and RLS-secured** — mobile can read the same tables and call the same edge functions directly with the anon key. The work is therefore **(a) re-theme the shell to web tokens, (b) port the service/type layer to RN, (c) rebuild each screen natively, (d) solve the three blockers in §0.** No backend migration is required for the patient app; only additive RPCs (article FTS) and confirming anon-key read grants.

**Scope decision:** The mobile app targets the **patient experience only**. Provider portal and admin command center stay web (they are desktop-dense, low-frequency, and out of scope for a phone). This is *Assumption A2* — see §10 Risk R1 if provider-on-mobile is later required.

**Rough size:** ~28 patient-facing screens, ~40 reusable RN components, ~18 ported services, 6 phases. The existing shell saves ~2–3 weeks of foundation work *if* re-themed rather than rebuilt.

---

## 2. Feature Inventory

Legend for **Mobile scope**: ✅ port · ⚠️ port w/ adaptation · 🚫 out of scope (stays web) · 🆕 mobile-only.

### 2.1 Public / Marketing
| Feature | Web route | Data | Mobile scope |
|---|---|---|---|
| Homepage | `/` | static + featured articles | ⚠️ becomes app Hub (already exists) |
| Learn hub | `/learn` | `articles`,`article_categories` | ✅ (see parity audit) |
| Category browse | `/learn/:cat` | `articles`,`article_subcategories` | ✅ |
| Article reader | `/learn/:cat/:slug` | `articles` + JSX body | ⚠️ blocker D2 |
| Search | `/search` | client index + `search_providers` | ⚠️ blocker D3 |
| Video detail | `/watch/:id` | `videos`/derivatives, `increment_video_views` | ⚠️ expo-video |
| About / Contact / Standards / Advisory / Author bio | `/about`,`/contact`,… | static + `contact_submissions` | ⚠️ low priority |
| Legal (privacy/terms/accessibility) | `/legal/*` | static | ✅ simple |
| Crisis hub | `/crisis` | `lib/crisis.ts` region DB | ✅ **P0 safety** |
| Sitemap | `/sitemap` | — | 🚫 web SEO only |

### 2.2 Auth / Onboarding
| Feature | Web | Data | Mobile |
|---|---|---|---|
| Login / Signup | `/login`,`/signup` | Supabase GoTrue | ✅ |
| OAuth (Google, Apple) | AuthContext | Supabase OAuth | ⚠️ native: `expo-auth-session` + Apple sign-in |
| Email verify / reset / update password | `/auth/*`,`/reset-password` | GoTrue | ✅ deep-link callbacks |
| Patient onboarding (4 steps: Welcome → Focus → First Mood → Ready) | `/onboarding` | `profiles.onboarding_completed_at`, wellness focus | ✅ (shell has a welcome stub) |

### 2.3 Tools / Assessments
| Feature | Web route | Data | Mobile |
|---|---|---|---|
| Clarity Score (20-item PHQ-4/WHO-5/UCLA-3/PSS-4/functioning) | `/clarity-score` | `assessments`,`assessment_responses`, edge fns, localStorage | ✅ **flagship**, crisis-gated |
| Mood Journal | `/tools/mood-journal` | `mood_entries` | ✅ (history exists; needs entry wizard) |
| Sleep Architect | `/tools/sleep-architect` | `sleep_entries`/diary + settings | ✅ |
| Clarity Journal (9 sub-tools: daily check-in, screening, thought record, behavioral activation, trigger log, toolbox, reflection, history, insights, report) | `/tools/clarity-journal/*` | local + Supabase | ⚠️ large sub-app; phase 3 |
| Symptom Navigator | `/tools/symptom-navigator` | `navigator_*` tables | ✅ crisis-aware wizard |
| Relationship Health Check | `/tools/relationship-health` | local | ⚠️ |
| Medication Tracker | `/tools/medication-tracker` (flagged) | local/Supabase | ⚠️ feature-flagged |
| Toolkits (browse + per-item progress, local-first sync, consent gate) | `/toolkits`,`/toolkits/:id` | `toolkits`,`toolkit_items`, local progress | ✅ |
| Tools hub | `/tools` | `tools` | ✅ |

### 2.4 AI — MindMate
| Feature | Web | Data | Mobile |
|---|---|---|---|
| Floating chat widget | `MindMate.tsx` | `/api/ai/chat` SSE | ⚠️ becomes a tab/route, not FAB-over-everything |
| Full-page chat | `/tools/mindmate` + `features/chat` | SSE, RAG, citations | ✅ |
| Safety classifier / crisis bypass | server `api/ai/chat.ts` | Claude Haiku | ✅ unchanged (server-side) |
| Conversation persistence (consent-gated) | `ai_conversations`,`ai_messages` | dual-write | ✅ |

### 2.5 Patient Dashboard
| Feature | Web | Data | Mobile |
|---|---|---|---|
| Dashboard home (greeting, alerts, smart actions, snapshots, multi-metric chart, recommended articles, recent activity) | `/dashboard` | clarity/mood/sleep/onboarding services | ⚠️ becomes the **Hub tab**; chart simplified |
| Assessment history | `/dashboard/history` | `assessments` / `clarity_score_history` | ✅ |
| Bookmarks | `/dashboard/bookmarks` | `bookmarks` | ✅ |
| Account settings | `/dashboard/settings` | `profiles`, GoTrue | ✅ |
| Privacy & data (export, delete, consents) | `/dashboard/privacy` | `dsar_requests`, `consent_log`, edge fns | ✅ legally important |

### 2.6 Provider directory (consumer side)
| Feature | Web | Data | Mobile |
|---|---|---|---|
| Provider landing / search / filters | `/providers`,`/providers/search` | `search_providers_v2` RPC + lookups | ✅ |
| Provider profile | `/providers/:id` | `providers` + joins | ✅ |
| "How we verify" | `/how-we-verify` | static | ✅ |
| Provider apply / claim | `/for-providers/*` | `provider_applications`, `claim-provider` edge fn | ⚠️ deep-link to web (rare on phone) |

### 2.7 Out of scope (stay web)
🚫 **Provider Portal** (`/portal/*` — 7 screens: dashboard, profile, reviews, verification, subscription, analytics, settings).
🚫 **Admin Command Center** (`AdminApp.tsx` — 38 routes: article pipeline, content, providers, symptom-nav admin, safety, toolkit review, settings/users/audit).
🚫 Sanity CMS (dormant on web).

---

## 3. Design System Documentation

**Source of truth = web `tailwind.config.js` + `src/styles/tokens.css`.** Port these verbatim into the mobile `tailwind.config.js` (NativeWind v4). Replace the current Opal palette.

### 3.1 Color tokens (semantic, light → dark)
```js
// nativewind tailwind.config.js — theme.extend.colors
background:        { light:'#FBF9F4', dark:'#0F0F0F' },
surface:          { light:'#FBF9F4', dark:'#171717' },
'surface-hover':  { light:'#F5F5F4', dark:'#1F1F1F' },
'surface-active': { light:'#E7E5E4', dark:'#262626' },
primary:          { light:'#1A9B8C', dark:'#20B8A6' },  // Psychage Teal
'primary-hover':  { light:'#158A7D', dark:'#1A9B8C' },
'primary-light':  { light:'#20B8A6', dark:'#2DD4BF' },
'primary-bg':     '#E6F5F3',
'text-primary':   { light:'#0A0A0A', dark:'#FAFAF9' },
'text-secondary': { light:'#57534E', dark:'#D6D3D1' },
'text-tertiary':  { light:'#6D6762', dark:'#A8A29E' },
border:           { light:'#E7E5E4', dark:'#3F3F46' },
'border-hover':   { light:'#D6D3D1', dark:'#52525B' },
error:            { light:'#DC2626', dark:'#F87171' },
success:          { light:'#16A34A', dark:'#4ADE80' },
warning:          { light:'#CA8A04', dark:'#FACC15' },
// crisis severity
crisis:'#DC2626', urgent:'#D97706', watch:'#2563EB', safe:'#059669',
// brand ramps
teal:{50:'#F0FDFA',100:'#E6F5F3',400:'#2DD4BF',500:'#20B8A6',600:'#1A9B8C',700:'#158A7D',900:'#0D5C54'},
charcoal:{50:'#FAFAF9',100:'#F5F5F4',200:'#E7E5E4',300:'#D6D3D1',400:'#A8A29E',500:'#78716C',600:'#57534E',700:'#44403C',800:'#292524',900:'#1C1917',950:'#0C0A09'},
```
> **NativeWind note:** NativeWind v4 has no `dark:` light/dark *object* nesting like web CSS vars. Implement theme via **CSS-variable strategy in `global.css`** (`:root` + `.dark`) and reference `var(--color-…)` in the config, *or* use NativeWind's `dark:` variant per class. The web already uses CSS vars (`--color-primary` etc.) — port that file; it works under NativeWind v4's CSS-var support. Theme toggled by adding/removing `dark` class on root via `colorScheme` from `nativewind/useColorScheme`.

### 3.2 Typography
- **Fonts:** web uses **Satoshi** (sans, body) + **Fraunces** (display, variable opsz/SOFT/WONK). *Gap G1:* these font files are **not in the mobile repo** (mobile ships Domine + Plus Jakarta). **Acquire Satoshi + Fraunces `.ttf/.otf`** and load via `expo-font` / `@expo-google-fonts` (Fraunces is on Google Fonts; Satoshi is Fontshare — license check needed). Until then, Plus Jakarta is an acceptable temporary sans.
- **Scale (port):** display H1 36px/800/1.2 · H2 28px/700/1.3 · H3 22px/700/1.35 · H4 18px/600 · body 18px/1.85 (prose) / 16px base. Fluid `clamp()` sizes collapse to fixed RN sizes (pick the mid value).
- **Mono:** IBM Plex Mono (rare; code/citation only).

### 3.3 Spacing / radius / shadow
- **Spacing:** 4/8/12/16/24/32/48/64 (`space-1…16`). Mobile already defines xs–2xl on the same scale — re-map to web names.
- **Radius:** sm 4 · md 8 · lg 12 · xl 16 · 2xl (cards) · full 9999.
- **Shadow:** web shadow-sm/md/lg/glow. RN uses `shadowColor/Opacity/Radius/elevation` — encode as a `shadow` util set; `shadow-glow` (teal `rgba(26,155,140,.12)`) → `shadowColor:'#1A9B8C'`. **iOS shadow + Android elevation differ**; centralize in a `<Surface>` component.
- **Touch target:** min 44px (`min-h-touch` 2.75rem) — already a WCAG requirement; enforce via `MinTouchTarget` (exists in shell).

### 3.4 Component primitives → RN mapping
| Web primitive | Variants | RN port |
|---|---|---|
| Button | primary/secondary/outline/ghost/glass/danger × sm/md/lg/xl; `whileTap scale .97`; leftIcon/rightIcon/isLoading | `Pressable` + Reanimated press scale; shell has `Button.tsx` — extend variants |
| Card | default/glass/outline/ghost; hoverEffect → press/elevation; CardHeader/Body/Footer/Icon | shell `Card.tsx` + `glass/GlassCard.tsx` (expo-blur) |
| Input | h-11, focus ring, error+errorMessage, role=alert | shell `Input.tsx`; focus ring → border color + `accessibilityState` |
| Badge | 11 color variants + outline | shell `Badge.tsx` |
| Alert | default/destructive/success/warning + icon | new |
| Modal/Dialog | Radix → RN: `@gorhom/bottom-sheet` or RN `Modal`; overlay blur | shell `GlassModal.tsx` |
| ConfirmDialog | destructive/default, icon | RN `Alert` for simple; custom for styled |
| Breadcrumbs | chevron trail | **drop** on mobile (use back nav + header title) |
| Pagination | numbered | → **infinite scroll / FlatList** |
| EmptyState | icon+title+desc+action; compact | shell `feedback/EmptyState.tsx` |
| Tabs | Radix tabs | RN segmented control / `react-native-tab-view` |
| Toast | Sonner | `react-native-toast-message` or shell equiv |

### 3.5 Motion
Web uses Framer Motion variants (fadeIn, slideUp, scaleIn, stagger, glassCardHover, spark, navigatorSlide) + Lenis smooth scroll. **RN equivalents:** Reanimated 4 + Moti (both already installed). Map variants 1:1 to Moti `from/animate`. **Respect reduced motion** via `useReducedMotion` (shell has accessibility config). Durations: micro 150 / small 200 / medium 300 / large 500 / xl 700; easing `cubic-bezier(0.4,0,0.2,1)` standard, spring `(0.34,1.56,0.64,1)`. Lenis has no RN analog — native scroll is fine.

### 3.6 Glassmorphism
Web `.glass` = `bg-white/80 backdrop-blur-xl border-white/20`. Mobile shell already has `expo-blur`-based `GlassCard/Button/Modal/TabBar`. **Keep these**, retint to teal/charcoal. `backdrop-blur` is real on iOS, expensive on Android — gate behind `Platform.select` / lower intensity on Android.

---

## 4. Supabase Architecture Map

Full table-by-table audit is in the agent report; condensed map below. **Same project, shared with web.** No schema migration needed for the patient app except additive items flagged 🆕.

### 4.1 Domains, tables, mobile relevance
| Domain | Key tables | RLS (read) | Mobile use |
|---|---|---|---|
| **Auth/Profiles** | `profiles`, `admin_roles`, `admin_audit_log`, `platform_settings` | self / admin | profiles ✅; admin tables 🚫 |
| **Clarity Score** | `assessments`, `assessment_responses`, `clarity_index_contributions`, `retake_gates`, `rate_limits`, `share_tokens` | self only | ✅ via edge fns |
| **Mood/Sleep** | `mood_entries`, `sleep_entries` (+ diary/settings) | self only | ✅ direct CRUD |
| **Symptom Navigator** | `navigator_symptoms`,`navigator_conditions`,`navigator_condition_symptoms`,`navigator_condition_red_flags`,`navigator_crisis_resources`,`navigator_matching_config`,`navigator_analytics`,`navigator_saved_results` | public read; analytics insert-only; saved=self | ✅ |
| **Providers** | `providers`,`provider_locations`,`provider_specialties/languages/cultural_competencies/insurance`,`provider_verifications`,`provider_applications` + lookups | public read (active/seeded) | ✅ consumer side |
| **AI/MindMate** | `content_documents`,`content_chunks`(vector 1536),`ai_conversations`,`ai_messages`,`ai_providers`,`ai_analytics` | published read; convo=self/anon | ✅ via `/api/ai/chat` |
| **Consent/Privacy** | `consent_log`,`dsar_requests` (+ profile soft-delete cols) | self / admin | ✅ |
| **Newsletter/Bookmarks** | `newsletter_subscribers`,`bookmarks` | public insert / self | ✅ |
| **Articles** | `articles`,`article_categories/subcategories/citations/images/...` | public read published | ✅ (parity audit) |
| **Tools/Toolkits** | `tools`,`toolkits`,`toolkit_items`, progress | public read published | ✅ |
| **Activity** | `user_activity`,`provider_analytics`,`audit_logs` | self / provider / admin | ⚠️ optional |

### 4.2 Edge functions (mobile calls these directly, anon/Bearer)
| Function | Mobile use |
|---|---|
| `assessment-start` / `assessment-submit` / `assessment-detail` / `assessment-history` / `assessment-share` / `assessment-shared` | ✅ Clarity Score |
| `account-deletion`, `data-export` | ✅ Privacy screen |
| `claim-provider` | ⚠️ web deep-link |
| `verify-current-password`, password/suspicious-activity notifications | ✅ settings flows |
| `sanity-webhook`, `health` | 🚫 / infra |

### 4.3 RPCs
`search_providers_v2` ✅ · `match_content_chunks` + `search_content_documents` (RAG, server-side only via `/api/ai/chat`) · `increment_video_views` ✅ · admin RPCs 🚫.
🆕 **`search_articles` FTS RPC** — does not exist; build it (blocker D3).

### 4.4 Realtime / Storage / Auth
- **Realtime:** not enabled anywhere. Mobile uses request/response + local cache; no subscriptions needed (matches web). *Optional 🆕:* could enable on `mood_entries` for multi-device, but not required for parity.
- **Storage:** one public bucket `article-images` (public read). Confirm anon-key read (Risk). No upload from patient mobile.
- **Auth:** GoTrue JWT; role in `app_metadata.role` (server-set). Trigger `on_auth_user_created` auto-creates profile from `raw_user_meta_data`. AUTH-001: admin role lives only in `admin_roles`. Mobile auth = patient only; never needs admin/provider role logic.

### 4.5 Anon-key read grants to confirm (blocking checklist)
`articles`, `article_categories`, `article_subcategories`, `article_citations`, `navigator_*` (public), `providers` + join/lookup tables, `content_documents`(published), `tools`, `toolkits`+`toolkit_items`(published), `article-images` bucket. Everything self-scoped (`mood_entries`, `sleep_entries`, `assessments`, `bookmarks`, `consent_log`, `dsar_requests`, `navigator_saved_results`, `ai_conversations`) needs an authenticated session.

---

## 5. Mobile Architecture

### 5.1 Folder structure (Expo Router v6, extends current shell)
```
app/
  _layout.tsx                  # root: fonts, theme, auth gate, SafeArea, QueryClient
  (auth)/                      # 🆕 unauthenticated stack
    _layout.tsx
    login.tsx  signup.tsx  forgot-password.tsx  callback.tsx
  onboarding/                  # exists; expand to 4 steps
    _layout.tsx  index.tsx  focus.tsx  first-mood.tsx  ready.tsx
  (tabs)/
    _layout.tsx                # 5 tabs (see 5.3)
    index.tsx                  # Hub (exists)
    learn/                     # 🆕 nested stack
      index.tsx  [categorySlug].tsx  [categorySlug]/[articleSlug].tsx  search.tsx
    tools/                     # 🆕
      index.tsx  clarity-score.tsx  mood-journal.tsx  sleep.tsx
      symptom-navigator.tsx  toolkits.tsx  toolkits/[id].tsx
    mindmate.tsx               # 🆕 AI chat
    profile/                   # exists; expand
      index.tsx  settings.tsx  bookmarks.tsx  history.tsx  privacy.tsx
  providers/                   # 🆕 (pushed, not a tab)
    index.tsx  search.tsx  [id].tsx
  crisis.tsx                   # 🆕 P0, reachable from everywhere
features/                      # domain modules (exists pattern)
  auth/ hub/ mood/ sleep/ clarity/ navigator/ learn/ chat/ toolkits/
  providers/ crisis/ onboarding/ profile/ ui/
  <feature>/{components,hooks,slices,services,types}
lib/
  supabase/{client.ts,queries/}   # wire env
  api/chat.ts                      # SSE client to /api/ai/chat
  crisis.ts                        # region DB (port from web)
  theme/tokens.css                 # ported web CSS vars
  query.ts                         # react-query client
components/ui/                      # shared primitives (exists; retheme)
mocks/                              # delete as services go live
```

### 5.2 State management
Hybrid, mirrors web intent:
- **Zustand** (exists, persisted to AsyncStorage) → session/auth, theme, onboarding, *local-first* tool drafts (clarity progress, toolkit progress, recently-read), offline queue.
- **TanStack React Query** 🆕 → all server reads/writes (articles, providers, assessments history, mood/sleep lists, bookmarks). Web uses react-query for provider search/portal; mobile should use it broadly for caching + offline persistence (`@tanstack/react-query-persist-client` + AsyncStorage). Replaces web's ad-hoc `useAsyncData`.
- **Context** → only ToastProvider + a thin AuthProvider wrapping the Zustand session (so router guards can read it).

> Rule: **server truth → React Query; device-local/optimistic → Zustand.** Don't duplicate server lists in Zustand.

### 5.3 Navigation (tab bar — 5 tabs)
`Hub` (home) · `Learn` · `Tools` · `MindMate` · `Profile`. Providers + Crisis + article reader are **pushed routes**, not tabs. Crisis also reachable via a persistent header affordance on every screen (web parity: floating crisis banner). Deep links: `psychage://learn/<cat>/<slug>`, auth callback `psychage://auth/callback`.

### 5.4 API layer
- **Supabase client** (`lib/supabase/client.ts`, already scaffolded with AsyncStorage + auto-refresh) — fill `EXPO_PUBLIC_SUPABASE_URL` / `_ANON_KEY`.
- **Service modules** ported 1:1 from web `src/services/*` with two swaps: `localStorage`→AsyncStorage, `resolveImageUrl` DOM logic→pure string mapping. Keep method signatures identical to ease porting.
- **AI chat** — POST `${VITE/EXPO AI_URL}/api/ai/chat` with `Authorization: Bearer <supabase jwt>`; parse SSE with a RN-safe reader (`fetch` + `ReadableStream` polyfill or `react-native-sse` / `expo/fetch` streaming). Server unchanged.

### 5.5 Authentication architecture
GoTrue session persisted by supabase-js in AsyncStorage; auto-refresh on. Root `_layout` reads session → redirects: no session + protected route → `(auth)/login`; session + onboarding incomplete → `/onboarding`. Apple Sign-In (required by App Store if Google offered) via `expo-apple-authentication`; Google via `expo-auth-session`. Password reset / email verify via deep-linked GoTrue redirect to `callback.tsx`.

### 5.6 Offline strategy
- **Reads:** React Query cache persisted to AsyncStorage → app opens with last data offline.
- **Writes (mood, sleep, clarity progress, toolkit progress):** local-first — write to Zustand/AsyncStorage immediately, enqueue a sync mutation; flush on reconnect (`@react-native-community/netinfo`). Web is already local-first for these, so semantics match.
- **Anonymous use:** Clarity Score, Mood, Sleep, Navigator, Toolkits all work logged-out on web (localStorage) → preserve on mobile (AsyncStorage), sync to Supabase on login.

### 5.7 Performance
FlatList/SectionList virtualization for article/provider lists · `expo-image` (caching, blurhash) for hero images · lazy route loading (Expo Router automatic) · memoize chart data · debounce search · Hermes engine (default) · avoid Android blur overuse · React Query staleTime tuning (articles 10m, providers 5m, lookups 1h). Target cold start < 2.5s, list scroll 60fps.

---

## 6. Screen Inventory

Each screen: purpose · components · data · interactions · edge cases · acceptance. (~28 patient screens.)

### Auth & Onboarding
**Login** — purpose: authenticate. Components: Input×2, Button, OAuth buttons, error Alert, link to signup/reset. Data: GoTrue. Interactions: submit, OAuth, validation. Edge: wrong creds, unverified email, network. Accept: valid creds → session + route to Hub/onboarding; errors shown inline; OAuth round-trips via deep link.
**Signup** — fields email/password/display_name (+ allowlisted metadata: age_verified, consent_version, country). Edge: weak password, existing email, age-gate, consent required. Accept: creates auth user → profile auto-created by trigger → email-verify screen.
**Forgot/Update password, Auth callback** — GoTrue flows via deep link. Accept: reset email sent; deep link sets session.
**Onboarding (4 steps)** — Welcome → Focus multi-select → First Mood (mood wizard) → Ready. Data: `profiles.onboarding_completed_at` + wellness focus. Edge: already complete → skip. Accept: completing writes focus + timestamp, routes to Hub, personalizes recommendations.

### Hub
**Hub (tab)** — greeting (time-of-day), wellness alert banner (crisis/anomaly), smart-action buttons, quick mood check-in, snapshot cards (avg mood 7d, avg sleep 7d, clarity trend), recommended articles carousel, MindMate entry, recent activity. Data: clarity/mood/sleep/onboarding services merged by date. Edge: new user empty states; partial service failures degrade per-card. Accept: each card loads independently; alert banner shows when crisis keyword/anomaly present; reduced-motion respected.

### Learn (see parity audit for depth)
**Learn hub** — Editor's pick hero + trending, category pills, My Reading Plan (auth), Continue Reading (AsyncStorage), Recommended, category sections. Data: `articles`,`article_categories`,`bookmarks`. Accept: sections render with image fallbacks; "see all" → category.
**Category** — list by category/subcategory, sort Recent/Quick/Deep. **Article reader** — hero (expo-image), summary, key facts, body (D2 strategy), companion video/audio (expo-video/av + TTS expo-speech), citations, related ×3, bookmark, share, reading progress, crisis banner. Edge: article lacking mock body renders thin (D2); offline cached. **Search** — debounced query over FTS RPC (D3). Accept: results < 500ms via RPC; empty/error states.

### Tools
**Tools hub** — grid from `tools`. **Clarity Score** — intro → 20 Q loop (progress, domain banners, 4-option scale) → PHQ-2 crisis check after Q4 → computing → results (gauge, radar, bar, history tabs); save (auth) / local (anon); 7-day retake gate. Data: `assessment-start/submit` edge fns, localStorage mirror. Edge: retake-gated, rate-limited, crisis modal blocks Escape, offline → local-only. Accept: scores computed server-side; crisis path shows region hotline + `/crisis`; results persist.
**Mood Journal** — entry wizard (valence 1–10, emotion tags, impact areas, note) + history list + insights sidebar. Data: `mood_entries` / AsyncStorage. Accept: optimistic insert; trend/streak compute; delete works.
**Sleep Architect** — diary entry (date, bed/wake, quality, note) + dashboard (score gauge, duration bar, efficiency, quality trend, weekly digest; 7d free / >7d auth). Data: `sleep_entries`/diary. Accept: charts render; auth gate on ranges.
**Symptom Navigator** — welcome → domain select → symptom multi-select (search, grouped) → duration/severity → processing → results (ranked conditions, article links, crisis banner). Data: `navigator_*`. Edge: red-flag symptom → crisis; a11y live regions. Accept: matches per `navigator_matching_config`; crisis routes correctly; anonymous analytics insert (session_hash only).
**Toolkits** — index grid (published) + detail (disclaimer, sync toggle, item list by kind, per-item open/done/helpful). Data: `toolkits`,`toolkit_items` + local progress, opt-in Supabase sync. Accept: local-first progress; sync only after consent toggle; coming-soon items disabled.
**Clarity Journal (9 sub-tools)** — phase-3 sub-app; each is a structured form + history. Accept: per-tool save local+optional sync; insights aggregate.

### MindMate
**Chat** — message list (user/assistant, streaming cursor, markdown, thinking blocks), source citations, suggested follow-ups, crisis overlay, provider suggestion cards, input. Auth required. Data: `/api/ai/chat` SSE; persistence consent-gated to `ai_conversations/messages`. Edge: unavailable→retry card, crisis→inline call card, offline→disabled with notice. Accept: tokens stream; citations validated server-side; crisis bypass shows hotline; consent respected for history.

### Profile
**Profile home** — sections (account, preferences, security, about), theme toggle, sign out. **Settings** — edit profile, change password (`verify-current-password`), language. **Bookmarks** — `bookmarks` grouped by type. **Assessment history** — `assessments`/`clarity_score_history` list + detail/share. **Privacy & data** — consent toggles (`consent_log`), data export (`data-export`), delete account (`account-deletion`, 30-day countdown). Accept: legally-required flows complete; deletion shows countdown + cancel.

### Providers (pushed)
**Search** — query + location ("near me" via expo-location), filter sheet (specialty/type/language/competency/insurance/modality/accepting/verification), sort, infinite results, US-only banner, verification explainer. Data: `search_providers_v2`. Edge: dropped state filter notice, empty, geolocation denied. **Profile** — header, verification badge, trust score, contact actions (tel/mail/booking), about, specialties/languages/insurance, locations, reviews, related. Accept: filters map to RPC params; contact deep-links work.

### Crisis (P0)
**Crisis hub** — country selector (GeoIP default + override), resource cards (hotline/text/chat/emergency), tel:/sms:/web links, verification marks. **Crisis modal** (WATCH/URGENT/CRISIS tiers) — grounding exercise, region resources, trusted-contact opt-in, emergency badge. Data: `lib/crisis.ts` region DB (+ optional `navigator_crisis_resources`). Accept: reachable from every screen; offline-capable (bundle region data); correct tier content.

---

## 7. Component Inventory

**Primitives (retheme existing shell → web tokens):** Button, Card, Input, Badge, Alert, Modal/BottomSheet, ConfirmDialog, EmptyState, Toast, Avatar, Separator, Skeleton, MinTouchTarget, GlassCard/Button/Modal/TabBar, Surface(shadow), Tabs/SegmentedControl, Chip/FilterChip, ProgressBar.

**Charts (🆕 — web uses Recharts/D3; pick RN lib):** GaugeChart (clarity/sleep score), RadarChart (clarity domains), BarChart (sleep duration, mood dist), LineChart (multi-metric trend, quality), Sparkline/StatBadge. → **`react-native-gifted-charts`** or **Victory Native XL** (Skia). *Gap G2: chart parity needs a chosen lib + Skia (`@shopify/react-native-skia`).*

**Domain components:**
- Learn: ArticleCard, CategoryPill, HeroArticle, ReadingProgressBar, ArticleBody renderer (D2), CitationList, RelatedArticles, VideoPlayer (expo-video), TTSButton (expo-speech), BookmarkButton, ContinueReadingRow.
- Clarity: QuestionCard, ScaleSelector, DomainBanner, CrisisModal, ScoreGauge, DomainRadar, HistoryPills, ResultsTabs.
- Mood: MoodWizard (valence/tags/impact/note), MoodTimelineItem, EmotionCloud, TrendArrow, EntryDetailModal (exists).
- Sleep: SleepDiaryForm, SleepScoreGauge, DurationChart, EfficiencyChart, QualityTrend, WeeklyDigest.
- Navigator: DomainCard, SymptomSearch, SymptomGroup, DurationSeverityStep, ConditionResultCard, CrisisBanner.
- Chat: MessageList, AssistantMessage, UserMessage, ChatInput, StreamingCursor, ThinkingBlock, SourceCitations, CrisisOverlay, ProviderSuggestionCard, SuggestedFollowUps, MarkdownRenderer.
- Toolkits: ToolkitCard, ToolkitItemRow, ProgressStrip, HelpfulRating, SyncToggle, ComingSoonPill.
- Providers: ProviderCard, FilterSheet, LocationInput, VerificationBadge, TrustScore, ReviewCard, ContactActions.
- Profile: SettingsItem (exists), ProfileSection (exists), ConsentToggle, DataExportCard, DeleteAccountFlow.
- Layout: TabBar (glass, exists), AppHeader (+ crisis affordance), SafeScreen, ScreenLayout (exists).

---

## 8. Database Mapping (web → mobile dependency)

| Mobile screen | Service (ported) | Supabase op | Table / RPC / edge fn |
|---|---|---|---|
| Hub | clarity/mood/sleep/onboarding | select | `clarity_score_history`,`mood_entries`,`sleep_entries`,`profiles` |
| Learn hub | articleService, categoryService, bookmarkService | select | `articles`,`article_categories`,`bookmarks` |
| Category | categoryService, articleService | select | `article_subcategories`,`articles` |
| Article reader | articleService, videoService | select + rpc | `articles`,`article_citations`, `increment_video_views` |
| Search | searchService | rpc 🆕 | `search_articles` (build) |
| Clarity Score | (edge fns) | POST/GET | `assessment-start/submit/detail/history/share` |
| Mood Journal | moodService | CRUD | `mood_entries` |
| Sleep | sleepService/sleepDiaryService | CRUD | `sleep_entries`(+settings/diary) |
| Symptom Navigator | navigator queries | select + insert | `navigator_*` (+ analytics insert) |
| Toolkits | toolkitService, toolkitProgressService | select / upsert | `toolkits`,`toolkit_items`,`toolkit_progress` |
| MindMate | chatService | SSE + insert | `/api/ai/chat`, `ai_conversations`,`ai_messages` |
| Bookmarks | bookmarkService | CRUD | `bookmarks` |
| Assessment history | clarityScoreService | GET | `assessment-history` / `assessments` |
| Privacy | privacyService, consentService | POST/select | `account-deletion`,`data-export`,`dsar_requests`,`consent_log` |
| Settings | userProfileService | update / rpc | `profiles`, `verify-current-password` |
| Providers search | providerService | rpc | `search_providers_v2` (+ lookups via ProviderLookups) |
| Provider profile | providerService | select | `providers`+joins |
| Crisis | (local) | none | `lib/crisis.ts` (+ optional `navigator_crisis_resources`) |

**Services to port from `src/services/`:** articleService, categoryService, videoService, searchService, moodService, sleepService, sleepDiaryService, clarityScoreService, bookmarkService, providerService, toolService, toolkitService, toolkitProgressService, userProfileService, activityService, consentService, privacyService, newsletterService, onboardingService, feedbackService, chatPersistenceService + `features/chat/services/chatService`. Each: swap localStorage→AsyncStorage, DOM image resolve→string map, keep cascade (Supabase→cache; drop Sanity).

---

## 9. Implementation Roadmap (6 phases)

Dependencies flow downward; each phase ends shippable to TestFlight/internal track.

### Phase 1 — Foundation (re-theme + wire backend)
**Goal:** correct brand + live Supabase + auth.
- Port web design tokens → `tailwind.config.js` + `global.css`; delete Opal palette. Acquire Satoshi+Fraunces (G1) or interim Plus Jakarta. (D1)
- Retheme existing primitives (Button/Card/Input/Badge/Glass*) to teal/charcoal.
- Fill `EXPO_PUBLIC_SUPABASE_*`; verify anon-key read grants (§4.5 checklist).
- Port types (`models.ts`, author, citation, navigator, provider) → RN.
- Add React Query + AsyncStorage persistence; AuthProvider over Zustand session.
- Build `(auth)` stack (login/signup/reset/callback) + root redirect guards; Apple+Google sign-in.
- Expand onboarding to 4 steps.
**Exit:** user signs up, profile auto-created, lands on themed Hub.

### Phase 2 — Core features (Hub, Learn, Mood, Profile, Crisis)
- Hub tab: real snapshots from ported services.
- Learn: hub + category + reader (interim body = `articles.content` HTML via `react-native-render-html`, blocker D2 partial) + bookmarks + continue-reading.
- Build `search_articles` FTS RPC (D3) + Search screen.
- Mood Journal: entry wizard + history (history exists) + insights.
- Profile: settings, bookmarks, theme, sign out.
- **Crisis hub + banner (P0 safety)** — ship early, region data bundled.
**Exit:** logged-in user reads articles, logs mood, reaches crisis help offline.

### Phase 3 — Assessments & journals
- Clarity Score full flow (edge fns, crisis gate, charts G2, retake/rate limits, save/anon).
- Sleep Architect (diary + dashboard charts).
- Symptom Navigator (full wizard + crisis + anonymized analytics).
- Toolkits (index + detail + local-first progress + consent sync).
- Assessment history + share.
- Finalize D2 body strategy (decide HTML vs markdown vs server-rendered; backfill rich blocks: callout/tabs/accordion/chart as RN components).
**Exit:** all assessment/journal tools at parity; charts render.

### Phase 4 — AI (MindMate)
- SSE chat client (RN streaming), message UI, citations, crisis overlay, provider cards, suggested follow-ups, thinking blocks.
- Consent-gated persistence to `ai_conversations/messages`.
- Output safety surfaced (server already classifies).
**Exit:** streaming chat with RAG citations + crisis bypass works on device.

### Phase 5 — Provider & health tools
- Provider search (RPC + filter sheet + geolocation) + profile + contact deep-links.
- Clarity Journal 9 sub-tools.
- Relationship Health, Medication Tracker (feature-flagged).
- Video/audio/TTS polish in reader.
**Exit:** find-care + remaining tools shipped.

### Phase 6 — QA, optimization, launch
- A11y pass (VoiceOver/TalkBack, touch targets, reduced motion, contrast AA).
- Performance (list virtualization, image cache, cold start, Android blur).
- i18n (port EN/PT/ES/SV/FR via i18next-rn or `expo-localization` + `i18next`).
- E2E (Maestro/Detox), unit (Jest exists), beta (TestFlight/Play internal).
- Store assets, privacy nutrition labels, ATT, crash reporting (Sentry RN), deep-link config.
**Exit:** store-ready builds, sign-off.

**Priority order if compressed:** Crisis → Auth/theme → Learn → Mood/Clarity → MindMate → Providers → polish.

---

## 10. Risk Analysis

| ID | Risk | Sev | Mitigation |
|---|---|---|---|
| **R1** | Provider portal / admin assumed out of scope (A2). If required on mobile, large rebuild. | Med | Confirm scope with stakeholders before Phase 1; keep web responsive as fallback. |
| **R2** | Article bodies are web JSX (D2) — won't render in RN. | **High** | Decide content strategy Phase 3; interim render `articles.content` HTML; long-term store markdown/structured blocks. Articles without mock chunks render thin. |
| **R3** | Client-side article search too heavy on mobile (D3). | High | Build `search_articles` Postgres FTS RPC before wiring Search. |
| **R4** | Brand divergence (D1) — current mobile theme is wrong; re-theme touches every component. | Med | Centralize tokens; do it first; existing components already use NativeWind classes. |
| **R5** | Fonts missing (Satoshi/Fraunces not in repo, G1) + license. | Med | Source files + verify license; interim Plus Jakarta + Fraunces (Google). |
| **R6** | RN SSE streaming for AI chat is finicky (`fetch` streaming support varies). | Med | Use `expo/fetch` streaming or `react-native-sse`; fallback to non-stream JSON path (server supports both). |
| **R7** | OAuth + Apple Sign-In native config (redirect URIs, entitlements). | Med | Use `expo-apple-authentication` + `expo-auth-session`; App Store requires Apple if Google present. |
| **R8** | Anon-key read grants may be missing on some public tables. | Med | Run §4.5 checklist against live project early. |
| **R9** | Chart parity (Recharts→RN) — radar/gauge need Skia. | Low-Med | Victory Native XL / gifted-charts + Skia; simplify multi-metric chart if needed. |
| **R10** | Crisis correctness — region resolution, offline availability, tel: links. | **High (safety)** | Bundle region DB; ship crisis early (Phase 2); manual test tel:/sms: on real devices per region; never gate behind network. |
| **R11** | Edge-function CORS/auth from native (Bearer + anon). | Low | Edge fns already serve web; confirm native `Authorization` headers accepted. |
| **R12** | GDPR/DSAR + consent flows must be exact (legal). | Med | Port `consent_log`/`dsar_requests`/`account-deletion`/`data-export` faithfully; legal review. |
| **R13** | Taxonomy slug mismatch (LearnPage priority slugs vs DB seeds — see parity audit R3). | Med | Verify live taxonomy before hard-coding category slugs/order. |
| **R14** | Pagination ceiling (web caps 6000 rows). | Low | Mobile paginates/lazy-loads, never bulk-fetches. |

---

## 11. Testing Strategy

- **Unit (Jest + @testing-library/react-native, exists):** ported services (mock supabase-js), scoring (`clarity/scoring`), reducers/Zustand slices, helpers (mood/date), crisis region resolution.
- **Component:** primitives across light/dark + reduced-motion; charts render with empty/partial data; forms validation.
- **Integration:** auth flow (signup→profile trigger→onboarding→Hub); offline write→reconnect sync; React Query cache hydration; SSE chat parse incl. crisis bypass + unavailable fallback.
- **E2E (Maestro or Detox 🆕):** golden paths — onboard, log mood, take Clarity Score (incl. crisis modal), read+bookmark article, chat, find provider, reach crisis hub offline, delete account.
- **Safety tests (must-pass):** PHQ-2 crisis trigger after Q4; navigator red-flag → crisis; MindMate CRISIS classification → hotline card; crisis hub reachable with network off; tel:/sms: links open dialer on iOS+Android.
- **A11y:** VoiceOver/TalkBack labels, 44px targets, focus order, live regions (navigator/chat), contrast AA in both themes.
- **Perf:** cold start, 60fps list scroll on mid Android, image cache hit, memory under long article/provider lists.
- **Backend:** RLS probes with anon vs auth key per §4.5; FTS RPC correctness; edge-fn auth from native.
- **Devices:** iPhone SE→Pro Max, Pixel mid-range, tablet layout sanity. Beta via TestFlight + Play internal.

---

## 12. Launch Checklist

**Functional**
- [ ] All Phase 1–5 exit criteria met; safety tests green.
- [ ] Auth (email + Apple + Google), reset, verify, delete account, data export.
- [ ] Crisis reachable everywhere + offline; tel:/sms: verified per region.
- [ ] Offline read cache + write queue sync verified.

**Backend**
- [ ] `EXPO_PUBLIC_SUPABASE_*` set per env (dev/prod).
- [ ] Anon read grants confirmed (§4.5); `search_articles` RPC live.
- [ ] Edge functions accept native Bearer/anon; AI endpoint reachable + rate-limited.

**Design / Content**
- [ ] Web tokens fully applied; Opal palette gone; Satoshi/Fraunces (or approved interim) loaded.
- [ ] Light + dark parity; reduced-motion honored.
- [ ] Article body strategy (D2) finalized; thin-content fallback acceptable.

**Compliance / Privacy**
- [ ] Consent flows + `consent_log` recording; GDPR DSAR; soft-delete countdown.
- [ ] App Store privacy nutrition labels + ATT prompt; Play data-safety form.
- [ ] Medical disclaimers present (non-diagnostic) on assessments/toolkits/navigator.
- [ ] Legal review of crisis + assessment + data flows.

**Quality / Ops**
- [ ] A11y audit pass (VoiceOver/TalkBack, AA contrast, 44px).
- [ ] Perf budgets met (cold start <2.5s, 60fps lists).
- [ ] Sentry RN crash reporting; analytics (anonymized, parity with web).
- [ ] i18n: 5 locales loaded; RTL N/A.
- [ ] Deep links + universal links configured; app icons/splash/store screenshots.
- [ ] EAS build + submit pipeline; OTA update channel (expo-updates) policy set.
- [ ] Versioning + release notes; rollback plan.

---

## Appendix — Assumptions & Gaps

**Assumptions**
- **A1** Re-theme existing RN shell to web tokens (vs rebuild) — keep architecture, swap brand.
- **A2** Mobile = **patient app only**; provider portal + admin stay web.
- **A3** Same Supabase project shared with web; no schema migration except additive `search_articles` RPC + grant confirmation.
- **A4** AI chat server (`api/ai/chat.ts`) stays as-is; mobile is a new client.
- **A5** Sanity CMS remains dormant; ignored for mobile.

**Gaps / missing assets**
- **G1** Satoshi + Fraunces font files not in mobile repo; license check (Satoshi = Fontshare).
- **G2** No RN chart library chosen; Recharts/D3 don't port — need Victory Native XL / gifted-charts + Skia.
- **G3** `search_articles` FTS RPC does not exist.
- **G4** Article rich blocks (callout/tabs/accordion/chart) have no RN renderer yet.
- **G5** RN SSE streaming approach unproven in this repo.
- **G6** Live taxonomy (category slugs/order) unverified vs hard-coded web priority slugs.
- **G7** Mobile `.env` empty; deep-link scheme + OAuth redirect URIs unconfigured.
- **G8** No crisis UI / assessment UI on mobile yet (schema-aware but unbuilt).
