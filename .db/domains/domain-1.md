# Domain 1: Article Cascade (Supabase → TSX Fallback)

## Code Path Trace

### Service: src/services/articleService.ts

**getBySlug(slug):**
1. Check mock TSX content first (rich interactive articles)
2. If mock exists: merge with Supabase metadata (title, category, dates)
3. If no mock: full Supabase query `articles WHERE slug = ? AND status = 'published'`
4. If Supabase fails: fallback to mock data only

**getAll(filters):**
1. Supabase: `articles WHERE status = 'published'` with LIMIT 1500
2. Mock: supplement with non-overlapping slugs
3. Slug-based deduplication — Supabase wins on conflict

**getRelatedArticles(articleId, categoryId, tags):**
1. Same-category articles from Supabase
2. Tag-scoring for relevance
3. Other categories if needed
4. Mock fallback

### Status Filter
- All public queries use `eq('status', 'published')` — verified ✓
- Draft, paused, archived articles correctly excluded

### seo_description
- Query fetches `seo_description` explicitly (line 163)
- Maps to `description` in article object: `data.description || data.seo_description || ''`
- No reference to non-existent `description` DB column — correct ✓

### RLS Status
- Article tables have RLS DISABLED (recursion workaround)
- Frontend protection via useAdminAuth() for mutations
- Public reads rely on status filter in queries

## Issues Found

| id | severity | issue | file | line | proposed_fix |
|---|---|---|---|---|---|
| ART-001 | info | No TanStack Query integration — plain useState + useEffect | ArticlePage.tsx | - | Performance: no staleTime caching. Not a bug. |
| ART-002 | info | Sanity service files still in codebase (dormant) | sanityArticleService.ts | - | Dead code. Safe to archive. |
| ART-003 | info | Article RLS disabled — frontend-only protection for admin CRUD | migrations | - | Documented. Risk accepted for recursion workaround. |

## Edge Cases Verified
- ✅ Published articles return from Supabase correctly
- ✅ Draft/paused/archived articles do NOT return (status filter works)
- ✅ If Supabase unreachable: TSX fallback activates (not white screen)
- ✅ Article list queries cascade correctly
- ✅ seo_description used everywhere (not `description`)
- ✅ Article with no citations: ReferenceList returns null (line 51: `if (!citations || citations.length === 0) return null`)
- ✅ Multiple articles with same slug: Supabase wins in merge
