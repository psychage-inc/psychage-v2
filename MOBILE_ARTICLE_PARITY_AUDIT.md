# Psychage V2 — Article & Educational Content Audit (Web → Mobile Parity)

**Date:** 2026-06-15
**Web app:** `/Users/raiyanabdullah/Desktop/psychage-v2`
**Mobile app:** `/Users/raiyanabdullah/Desktop/psychage app` (Expo / React Native — **Learn tab is an empty stub**)
**Goal:** 100% map of how articles work on web so mobile can reach feature parity.

---

## 0. Executive Summary

The web platform has a **mature, production-grade article system**: ~6,500–7,000 seeded articles across 15 DB categories / ~91 subcategories, a 3-tier content cascade (Supabase → mock JSX → Sanity), a full editorial pipeline (review stages, ratings, citations, derivatives, media), and a rich Learn experience (hero/trending/recommended/continue-reading/category browse/search/reader).

The mobile app has **almost none of it**. `app/(tabs)/learn.tsx` is a 14-line placeholder. There is no article service, no Article type, no category/search/bookmark logic, and Supabase is configured but unused (empty env vars). Only a mock "Daily Insight" (5–6 hardcoded JSON entries) exists.

**Parity gap: essentially the entire Learn domain must be built on mobile.** The good news: the web data layer is cleanly service-isolated and the Supabase backend is shared and RLS-secured for public read of published articles — mobile can read the same tables directly.

---

## 1. Article Architecture Report

### 1.1 Content cascade (web)
```
Supabase (authoritative metadata)  →  Mock JSX (rich interactive body)  →  Sanity CMS (configured, NOT wired into main flow)
```
- Metadata (title, slug, status, category, tags, ratings, media URLs) comes from Supabase `articles`.
- Rich body content (charts, tabs, accordions, callouts) lives in lazy-loaded mock TSX chunks under `src/data/articles/category-*/`; `getBySlug` merges Supabase metadata + mock JSX.
- Sanity (`sanityArticleService.ts`) exists but is bypassed; `sanity-webhook` edge fn syncs Sanity → `articles` metadata.

### 1.2 Supabase tables (article domain)

| Table | Role | Key columns / FKs |
|---|---|---|
| `articles` | Master record (~70 cols) | PK uuid; FKs: `category_id`→article_categories, `subcategory_id`→article_subcategories, `parent_article_id`→self, `created_by/reviewed_by/assigned_reviewer_id`→auth.users. Fields: slug, title, status, content, tags[], featured, is_parent/cluster_order, review_stage, ratings (accuracy/readability/completeness/sensitivity/overall), SEO, hero_image_url, video_*/audio_*, related_article_ids, citation_count, article_production_id |
| `article_categories` | 15 root categories | name, slug, description, icon, color, display_order, article_target |
| `article_subcategories` | ~91 subcategories | FK category_id (CASCADE), name, slug, display_order |
| `article_citations` | PEAF 5-tier sources | FK article_id (CASCADE), tier, title, authors, year, url, doi, sort_order |
| `article_comments` | Editorial review threads | FK article_id, author_id, parent_comment_id, severity, is_resolved |
| `article_images` | Media metadata | FK article_id, storage_path, public_url, purpose (hero/inline/infographic/thumbnail), alt_text |
| `article_status_history` | Append-only audit | FK article_id, from_status, to_status, changed_by |
| `article_derivatives` | Repurposed content (8 types) | FK source_article_id (CASCADE), derivative_type, platform, status |
| `bookmarks` | Saved items (generic) | FK user_id (CASCADE); UNIQUE(user_id, resource_type, resource_id); resource_type ∈ article/video/provider/tool |
| `content_documents` | RAG source library + FTS | tsvector `fts` (GIN), condition_tags/topic_tags (GIN), is_published |
| `content_chunks` | Vector embeddings (1536-d) | FK document_id (CASCADE), embedding (HNSW cosine) — powers MindMate RAG |
| `content_versions` | Snapshots of content_documents | FK document_id |
| `admin_roles` | Gates admin writes | user_id, role (super_admin/clinical_admin) |

**Storage bucket:** `article-images` (public read; admin upload/delete).

**RPCs:** `match_content_chunks` (vector RAG), `search_content_documents` (FTS), `generate_article_production_id`, `increment_video_views`, `search_providers`.
*Note:* there is **no dedicated article-search RPC** — article search is **client-side** (tokenize + BM25-ish scoring over a metadata index). FTS/vector RPCs target `content_documents`, not `articles`.

**Edge functions:** `sanity-webhook` (Sanity publish → articles sync). No other article-specific edge fns.

### 1.3 Relationship graph
```
auth.users ─┬─ articles.created_by / reviewed_by / assigned_reviewer_id
            ├─ bookmarks.user_id
            ├─ article_comments.author_id / resolved_by
            └─ article_images.uploaded_by / article_status_history.changed_by

article_categories (15) ─< article_subcategories (~91) ─< articles
articles ─< article_citations
articles ─< article_comments (self-ref threads)
articles ─< article_images
articles ─< article_status_history
articles ─< article_derivatives
articles ─ self (parent_article_id → topic clusters)
articles ─ related_article_ids[] (JSON internal links)
articles >─< auth.users  via  bookmarks (resource_type='article')   [many-to-many]
content_documents ─< content_chunks  (RAG, parallel to articles)
content_documents ─< content_versions
```
Many-to-many: **articles ↔ users via `bookmarks`**. (Tags are an array column on `articles`, not a join table; categories are 1-to-many via FK, not M2M.)

### 1.4 RLS summary (re-enabled 2026-06-10)

| Table | SELECT | Writes |
|---|---|---|
| articles | public: `status='published'`; admin: all | admin-writer only |
| article_categories / article_subcategories | public `USING(true)` | admin-writer |
| article_citations | public if parent article published | admin-writer |
| article_comments / images / status_history / derivatives | admin only | admin-writer |
| content_documents | public `is_published=true` | admin-writer |
| bookmarks | self only (`auth.uid()=user_id`) | self only |

**Mobile implication:** anon/auth users can read published articles, categories, subcategories, and published-article citations directly. Bookmarks require auth. Comments/images/history/derivatives are admin-only (not needed for mobile reader).

---

## 2. Supabase Dependency Report (Screen → Hook → Service → Query → Table)

| Web Screen | Hook | Service method | Supabase op | Table/RPC |
|---|---|---|---|---|
| `/learn` hub | `useArticleService` | `articleService.getAll()` | select (paginated, `status=published`, content not null) | `articles` (+ join `article_categories`) |
| `/learn` hub | `useCategoryService` | `categoryService.getAll()` | select order display_order | `article_categories` |
| `/learn` hub (search box) | `useSearch` | `searchService.searchArticles()` | client-side over `getAllIndexable()` | `articles` (metadata) |
| `/learn` My Reading Plan | `useBookmarks` | `bookmarkService.getAll(userId)` | select | `bookmarks` → per-id getById |
| `/learn` Continue Reading | — | localStorage `psychage_recently_read` | none | (local only) |
| `/learn/:cat` | `useCategoryService` / `useArticleService` | `getBySlug`, `getAll({category})` | select | `article_categories`, `articles` |
| `/learn/:cat/:slug` reader | `useArticleService` | `getBySlug(slug)` | select single + merge mock JSX | `articles` |
| reader Related | — | `getRelatedArticles(id,cat,tags)` | select same-category, tag-ranked | `articles` |
| reader Bookmark btn | `useBookmarks` | `toggleBookmark` → `bookmarkService.toggle` | select/insert/delete | `bookmarks` |
| reader video view | — | `videoService.trackView` | rpc | `increment_video_views` |
| `/search` | — | `searchService.search()` | client index; providers via rpc | `articles` (client), `search_providers` (rpc) |
| Admin command center | — | `articleAdminService.*` (CRUD, status, ratings, comments, images, citations, derivatives, clusters, taxonomy, stats) | select/insert/update/delete/upsert/storage | all `article_*` tables + `article-images` bucket |

Full per-method query map (with file:line) is in the source services: `articleService.ts`, `articleAdminService.ts`, `categoryService.ts`, `searchService.ts`, `bookmarkService.ts`, `videoService.ts`.

---

## 3. Learn Tab Dependency Audit (web)

Routes (`src/App.tsx`):
- `/learn` → `LearnPage`
- `/learn/:categorySlug` → `ArticleCategoryPage`
- `/learn/:categorySlug/:articleSlug` → `ArticlePage`
- `/learn/article/:id` → `ArticleRedirect` (legacy id→slug)
- `/search` → `SearchResults`

Learn hub sections (`src/pages/LearnPage.tsx`):

| Section | Data source | Logic |
|---|---|---|
| Editor's Picks (hero + trending) | `articles` filtered by `tags.includes('featured')` + priority categories | 1 hero + 6 trending, one per priority category, image required |
| Search + category pills | `useUrlFilterState(q,category,sort)` → `searchService.searchArticles` | client token scoring |
| My Reading Plan | `bookmarks` ∩ `articles` | auth-only carousel |
| Continue Reading | localStorage `psychage_recently_read` (max 10) | recency order |
| Recommended for You | category-diversified sample (image required) | 6 picks |
| Category tabs + sections | `groupBy(articles, category.slug)`, priority-ordered | 6/category in tab, 12/section, "See all" → category page; sort Recent/Quick/Deep |
| Newsletter CTA | `newsletterService.subscribe` + `consentService` | — |
| Clarity Score CTA | static link `/clarity-score` | — |

Reader features (`ArticlePage.tsx`): reading progress bar, accessibility bar (text size/TTS/dark), hero image (`resolveImageUrl`), medical disclaimer, summary box, key facts, companion video + transcript, HTML/JSX body (`ArticleHtmlRenderer` + blocks: Tabs/Callout/Chart/Accordion), spark moment, practical exercise + toolkit CTA, citations (`ReferenceList`), feedback widget, share buttons, desktop TOC + mobile TOC, related articles (3), crisis banner, toolkit grid, back-to-top.

Priority category slugs (LearnPage): `emotional-regulation, anxiety-stress, relationships-communication, self-worth-identity, work-productivity, mens-mental-health, chronic-illness-pain`.

---

## 4. Content Parity Analysis — Web vs Mobile

Mobile = `/Users/raiyanabdullah/Desktop/psychage app` (Expo ~54, RN 0.81, expo-router, supabase-js, zustand, nativewind). Article domain status below.

| Feature | Web | Mobile | Gap |
|---|---|---|---|
| Learn hub screen | full | 14-line stub | **missing** |
| Article list / browse | yes | none | **missing** |
| Article detail/reader | rich | none | **missing** |
| Category browse | yes | none | **missing** |
| Subcategories | yes | none | **missing** |
| Search (articles) | client index | none | **missing** |
| Related articles | yes | none | **missing** |
| Bookmarks / saved | Supabase + local | none | **missing** |
| Reading progress / continue reading | localStorage | none | **missing** |
| Recently viewed | localStorage | none | **missing** |
| Recommended / featured / trending | yes | none | **missing** |
| Citations / sources | yes | none | **missing** |
| Companion video / audio / TTS | yes | none | **missing** |
| Article rich blocks (chart/tabs/accordion) | yes | none | **missing** |
| Authors / advisory board | mock `authors.ts` | none | **missing** |
| Article service + Article type | yes | none | **missing** |
| Supabase wired | yes | **configured, empty env, unused** | **blocked** |
| "Daily Insight" | n/a (mobile-only) | mock JSON (5–6) | mobile-only, replace with real articles |

What powers each missing piece (where to copy from):
- Data layer: `src/services/{articleService,categoryService,searchService,bookmarkService,videoService}.ts`, `src/lib/{supabaseClient,recommendations}.ts`, `src/lib/article-category-to-specialty.ts`
- Types: `src/types/models.ts` (Article/Category/Citation), `src/types/author.ts`, `src/lib/article-framework/types.ts`
- UI reference: `src/pages/LearnPage.tsx`, `src/pages/learn/ArticlePage.tsx`, `src/pages/ArticleCategoryPage.tsx`, `src/components/pages/SearchResults.tsx`, `src/components/article*/*`
- Backend (shared, no migration needed): same Supabase project — tables/RLS/bucket already exist.

---

## 5. Migration Checklist (mobile)

| # | Step | Assets to port | Complexity |
|---|---|---|---|
| 1 | Wire Supabase | fill `EXPO_PUBLIC_SUPABASE_URL` / `_ANON_KEY`; reuse `src/lib/supabaseClient.ts` pattern | **Low** |
| 2 | Article + Category + Citation types | port `types/models.ts`, `types/author.ts` | **Low** |
| 3 | `articleService` (RN) | port `getAll/getById/getBySlug/getAllIndexable/getRelatedArticles/getFeatured`; **swap `resolveImageUrl` DOM logic**, **drop mock-JSX merge** (RN can't render web JSX — see Risk) | **High** |
| 4 | `categoryService` | port getAll/getBySlug/getSubcategories | **Low** |
| 5 | Body rendering strategy | decide HTML-in-RN (e.g. react-native-render-html) vs server-delivered content vs markdown — **JSX mock content does not port** | **Critical** |
| 6 | `searchService` (articles) | port client tokenizer/scorer over indexable metadata | **Medium** |
| 7 | `bookmarkService` | port toggle/getAll; AsyncStorage instead of localStorage; needs Supabase auth | **Medium** |
| 8 | Recently-read / continue-reading | reimplement on AsyncStorage (`psychage_recently_read`) | **Low** |
| 9 | Recommendations | port `lib/recommendations` | **Medium** |
| 10 | Learn hub screen | rebuild sections in RN (hero/trending/recommended/reading-plan/continue/category) | **High** |
| 11 | Category browse screen | new route `learn/[categorySlug]` | **Medium** |
| 12 | Article reader screen | new route `learn/[categorySlug]/[articleSlug]`: hero, summary, body, key facts, citations, related, bookmark, video/audio | **High** |
| 13 | Search screen | new route + UI | **Medium** |
| 14 | Citations / ReferenceList | port renderer | **Low** |
| 15 | Companion video / audio / TTS | RN players (expo-av / expo-speech) | **Medium** |
| 16 | Replace mock Daily Insight | feed from real `articles` (featured/cornerstone) | **Low** |
| 17 | Auth gate for bookmarks | reuse mobile auth + AuthModal equivalent | **Low** |

---

## 6. Risk Report

1. **CRITICAL — Body content is web JSX.** Rich article bodies live as React/TSX in `src/data/articles/category-*/` and merge in at `getBySlug`. React Native cannot render these. Mobile needs a content strategy: store/serve HTML or markdown, or render `articles.content` (HTML) via a RN HTML renderer. This is the single biggest porting blocker.
2. **HIGH — No server-side article search.** Web search is client-side over a full metadata index (loads up to ~6,000 rows). On mobile this is heavy (memory/bandwidth). Recommend building a Postgres FTS RPC on `articles` (pattern exists for `content_documents`) before mobile search.
3. **MEDIUM — Taxonomy slug mismatch risk.** LearnPage priority slugs (`emotional-regulation`, `relationships-communication`, `self-worth-identity`, `work-productivity`, `mens-mental-health`, `chronic-illness-pain`) do **not** match DB seed category slugs reported (`anxiety-stress`, `depression-mood`, `relationships-social`, `self-esteem-identity`, `workplace-academic`, …). Mock-categories file lists 18; DB seeds 15. Verify which taxonomy is live before mobile hard-codes category slugs/order.
4. **MEDIUM — Image URL resolution is web-specific.** `resolveImageUrl` rewrites `/images/articles/...` placeholders to the `article-images` bucket public URL. Port the mapping; verify bucket paths/casing (`covers/CAT01-001.jpeg`).
5. **MEDIUM — Pagination ceiling.** `getAll` caps at 6 pages × 1000 = 6000 rows; corpus is ~6.5–7k. Mobile should paginate/lazy-load, not bulk-fetch.
6. **LOW — RLS depends on `is_admin`/`is_admin_writer` SECURITY DEFINER fns.** Fine for mobile reads (public published), but confirm anon key has read on `articles`/`article_categories`/`article_subcategories`/`article_citations`.
7. **LOW — Dual content systems.** `articles` (editorial) vs `content_documents`+`content_chunks` (RAG for MindMate). Don't conflate; mobile Learn reads `articles`, mobile chat (if ported) uses RAG RPCs.
8. **LOW — Sanity is dormant.** Configured but bypassed on web; ignore for mobile unless reactivated.

---

## 7. Missing / Inconsistent Integrations

- Mobile Supabase env vars are **empty** → all backend dead until filled.
- Mobile `lib/supabase/queries/` is an empty placeholder; no article queries exist.
- No article-search RPC anywhere (web compensates client-side) — build one for mobile.
- Web `getBySlug` depends on mock JSX presence; pure-Supabase articles render thinner — mobile will hit this for any article lacking a mock chunk.
- Confirm `article-images` bucket is genuinely public-read for the anon key used by mobile.

---

## Appendix — Key files

**Web services:** `src/services/articleService.ts`, `articleAdminService.ts`, `sanityArticleService.ts`, `categoryService.ts`, `searchService.ts`, `bookmarkService.ts`, `videoService.ts`
**Web lib:** `src/lib/supabaseClient.ts`, `sanityClient.ts`, `api.ts`, `recommendations/*`, `article-framework/*`, `article-category-to-specialty.ts`, `articleUrl.ts`
**Web data:** `src/data/articles/*`, `categories.tsx`, `authors.ts`
**Web pages:** `src/pages/LearnPage.tsx`, `src/pages/learn/ArticlePage.tsx`, `src/pages/ArticleCategoryPage.tsx`, `src/components/pages/SearchResults.tsx`
**Migrations:** `20260315000001_article_command_center.sql`, `20260316000001_article_production_system.sql`, `20260315000003_article_quality_framework.sql`, `20260326000001_article_media_and_rewrite.sql`, `20250220000006_ai_tables.sql`, `20260610000001_reenable_article_rls_and_policy_fixes.sql`, + ~139 `seed_category*_subcategory*.sql`
**Edge fn:** `supabase/functions/sanity-webhook/`
**Mobile:** `/Users/raiyanabdullah/Desktop/psychage app` — `app/(tabs)/learn.tsx` (stub), `lib/supabase/`, `features/hub/hooks/useDailyInsight.ts`, `mocks/insights.json`
</content>
</invoke>
