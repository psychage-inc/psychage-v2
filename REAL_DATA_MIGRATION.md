# PsychAge v2 → v1 Backend: Real Data Migration

**Generated**: 2026-03-03
**Status**: Discovery Complete | Implementation In Progress
**Goal**: Replace ALL mock/placeholder data with real data from PsychAge v-1 backend APIs

---

## Executive Summary

PsychAge v2 frontend currently uses a **mix of real API data and mock data**. This document maps:
1. What data sources exist (mock vs real)
2. Which components/pages use which sources
3. What needs to be fixed to eliminate all mock dependencies

**Good News**:
- ✅ API client (`src/lib/api.ts`) is comprehensive and well-structured
- ✅ Dashboard pages already use real backend data
- ✅ Most services have cascading fallback architecture (Sanity/Supabase → Mock)

**Issues**:
- ❌ Some components bypass services and import mock data directly
- ⚠️ Missing API endpoints for videos, categories, assessment questions
- ⚠️ Several services only use Supabase, not the backend API client

---

## Current Architecture

### API Clients

| Client | Location | Purpose | Status |
|--------|----------|---------|--------|
| **Backend API** | `src/lib/api.ts` | PsychAge v-1 REST API (VITE_API_URL) | ✅ Comprehensive |
| **Supabase** | `src/lib/supabaseClient.ts` | Direct PostgreSQL access | ✅ Configured |
| **Sanity CMS** | `src/lib/sanityClient.ts` | Content management (articles) | ✅ Configured |

### Data Flow Strategy

**Ideal Cascading Fallback**:
```
Backend API → Supabase → Sanity CMS → Mock Data (dev only)
    ↓             ↓           ↓            ↓
  Primary    Fallback    Content      Last Resort
```

---

## Service Layer Status

### ✅ GOOD: Services Using Cascading Fallbacks

| Service | File | Data Flow | Status |
|---------|------|-----------|--------|
| Articles | `services/articleService.ts` | Sanity → Supabase → Mock | ✅ **EXCELLENT** |
| Tools | `services/toolService.ts` | Backend API → Mock | ✅ **EXCELLENT** |
| Providers | `services/providerService.ts` | Supabase → Mock | ✅ Good (see note) |
| Bookmarks | `services/bookmarkService.ts` | Supabase only | ✅ OK |
| Mood | `services/moodService.ts` | Supabase only | ✅ OK |
| Sleep | `services/sleepService.ts` | Supabase only | ✅ OK |
| User Profile | `services/userProfileService.ts` | Backend API | ✅ **EXCELLENT** |

**Note on Providers**: Service has Supabase → Mock fallback, but Backend API has provider endpoints that aren't used in the service. Consider adding API → Supabase → Mock cascade.

### ⚠️ NEEDS WORK: Services Missing API Integration

| Service | File | Current Flow | Missing | Priority |
|---------|------|--------------|---------|----------|
| Videos | `services/videoService.ts` | Supabase → Mock | Backend API integration | 🔴 HIGH |
| Categories | `services/categoryService.ts` | Supabase → Mock | Backend API integration | 🟡 MEDIUM |
| Assessment | `services/assessmentService.ts` | Supabase → Mock | Backend API integration | 🟡 MEDIUM |

**Action Required**:
1. Check if v-1 backend has `/api/videos`, `/api/categories`, `/api/assessment/questions` endpoints
2. If yes: Add to `src/lib/api.ts` and update services to use API → Supabase → Mock
3. If no: Keep current Supabase → Mock flow (acceptable fallback)

---

## Component Issues: Direct Mock Imports

### ❌ CRITICAL: Components Bypassing Services

These components import mock data directly instead of using the service layer:

| Component | File | Direct Imports | Fix Required |
|-----------|------|----------------|--------------|
| **CategoryPage** | `components/pages/CategoryPage.tsx` | `articles`, `videos`, `tools` | Use `articleService`, `videoService`, `toolService` |
| **SearchResults** | `components/pages/SearchResults.tsx` | `articles`, `videos`, `tools`, `categories` | Use services + `searchService` |
| **SearchAutocomplete** | `components/search/SearchAutocomplete.tsx` | `articles` | Use `searchService.articles()` |
| **AllCategoriesSection** | `components/home/AllCategoriesSection.tsx` | `categories` | Use `categoryService.getAll()` |

**Example Fix** (CategoryPage.tsx):
```typescript
// ❌ BEFORE (Direct mock import)
import { articles } from '../../data/articles';
const categoryArticles = articles.slice(0, 4);

// ✅ AFTER (Service layer)
import { articleService } from '../../services/articleService';
const [categoryArticles, setArticles] = useState([]);

useEffect(() => {
  articleService.getByCategory(category).then(setArticles);
}, [category]);
```

---

## Dashboard Status

### ✅ EXCELLENT: All Dashboards Use Real API Data

| Dashboard | API Endpoints Used | Status |
|-----------|-------------------|--------|
| **User Dashboard** | `api.clarityScore.getStats()`, `api.user.getActivity()`, `api.clarityScore.getHistory()` | ✅ Real Data |
| **Provider Dashboard** | `api.provider.getStats()`, `api.provider.getActivity()`, `api.provider.getAnalytics()` | ✅ Real Data |
| **Admin Dashboard** | `api.admin.getStats()`, `api.admin.getRecentActivity()`, `api.admin.getProviders()` | ✅ Real Data |

**No action required** for dashboards - they are exemplary implementations!

---

## Backend API Endpoints (Available in v-1)

### Authentication
- ✅ `POST /api/auth/login`
- ✅ `POST /api/auth/signup`
- ✅ `POST /api/auth/logout`
- ✅ `GET /api/auth/me`
- ✅ `POST /api/auth/refresh`

### Providers
- ✅ `GET /api/providers` (search, filter by specialty/insurance/location)
- ✅ `GET /api/providers/:id`
- ✅ `POST /api/providers/:id/view` (track view)
- ✅ `POST /api/providers/favorites` (toggle favorite)
- ✅ `GET /api/providers/favorites`
- ✅ `GET /api/providers/dashboard` (provider stats)
- ✅ `GET /api/providers/profile`
- ✅ `PUT /api/providers/profile`

### Articles
- ✅ `GET /api/articles` (filter by category)
- ✅ `GET /api/articles/:id`
- ✅ `POST /api/articles/:id/bookmark`
- ✅ `GET /api/articles/bookmarks`

### Tools
- ✅ `GET /api/tools`
- ✅ `GET /api/tools/:id`
- ✅ `GET /api/tools?category=:category`

### User Profile
- ✅ `GET /api/user/profile`
- ✅ `PUT /api/user/profile`
- ✅ `POST /api/user/password`
- ✅ `POST /api/user/photo`
- ✅ `GET /api/user/activity`

### Clarity Score / Assessment
- ✅ `POST /api/clarity-score` (save assessment)
- ✅ `GET /api/clarity-score` (get history)
- ✅ `GET /api/clarity-score/stats`
- ✅ `GET /api/assessment/questions`

### Mood & Sleep Tracking
- ✅ `GET /api/mood`
- ✅ `POST /api/mood`
- ✅ `GET /api/sleep`
- ✅ `POST /api/sleep`
- ✅ `PUT /api/sleep/:id`
- ✅ `DELETE /api/sleep/:id`
- ✅ `GET /api/sleep/stats`

### Search
- ✅ `GET /api/search` (unified search)
- ✅ `GET /api/search/articles`
- ✅ `GET /api/search/providers`
- ✅ `GET /api/search/tools`
- ✅ `GET /api/search/suggestions`

### Admin
- ✅ `GET /api/admin/stats`
- ✅ `GET /api/admin/activity`
- ✅ `GET /api/admin/providers`
- ✅ `POST /api/admin/providers/:id/status`
- ✅ `GET /api/admin/audit-logs`
- ✅ `GET /api/admin/reports`

### ⚠️ MISSING / UNCLEAR

Need to verify if these exist in v-1 backend:

- ❓ `GET /api/videos` → Check backend
- ❓ `GET /api/videos/:id` → Check backend
- ❓ `GET /api/categories` → Check backend
- ❓ `GET /api/categories/:slug` → Check backend

**Action**: Audit v-1 backend to confirm video/category endpoints

---

## Mock Data Files

### Location: `src/data/`

| File | Items | Used By | Status |
|------|-------|---------|--------|
| `providers.ts` | 6 providers | `providerService` (fallback) | ✅ Fallback only |
| `articles.tsx` | 15 articles | `articleService` (fallback), ❌ `CategoryPage` direct | ⚠️ Remove direct imports |
| `tools.ts` | 6 tools | `toolService` (fallback), ❌ `CategoryPage` direct | ⚠️ Remove direct imports |
| `videos.ts` | 6 videos | `videoService` (fallback), ❌ `CategoryPage` direct | ⚠️ Remove direct imports |
| `categories.tsx` | Category definitions | `categoryService` (fallback), ❌ `AllCategoriesSection` direct | ⚠️ Remove direct imports |
| `assessment.ts` | 8 questions | `assessmentService` (fallback) | ✅ Fallback only |
| `symptom-checker.ts` | Symptoms | Navigator system | ✅ OK (navigator-specific) |
| `mock_knowledge_base.ts` | AI knowledge | MindMate AI | ✅ OK (AI-specific) |

**Fallback is OK**: Mock files used as last-resort fallbacks in services are acceptable for development/offline mode.

**Direct imports are NOT OK**: Components should ALWAYS go through services, never import mock data directly.

---

## Implementation Plan

### Phase 1: Fix Component Imports (High Priority) 🔴

**Goal**: All components must use services, not direct mock imports

**Files to Fix**:
1. `src/components/pages/CategoryPage.tsx`
2. `src/components/pages/SearchResults.tsx`
3. `src/components/search/SearchAutocomplete.tsx`
4. `src/components/home/AllCategoriesSection.tsx`

**Pattern**:
```typescript
// Replace direct imports
import { articles } from '../../data/articles';

// With service hooks
import { articleService } from '../../services/articleService';
import { useState, useEffect } from 'react';

const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  articleService.getByCategory(category)
    .then(setArticles)
    .catch(setError)
    .finally(() => setLoading(false));
}, [category]);
```

**Add Loading States**:
- Skeleton loaders while fetching
- Error states with retry buttons
- Empty states when no data

### Phase 2: Add Missing API Integrations (Medium Priority) 🟡

**Goal**: Wire up video/category/assessment services to backend API

**Steps**:

1. **Verify Backend Endpoints**:
   ```bash
   # Check v-1 backend for these endpoints:
   curl $VITE_API_URL/api/videos
   curl $VITE_API_URL/api/categories
   curl $VITE_API_URL/api/assessment/questions
   ```

2. **If Endpoints Exist**:
   - Add to `src/lib/api.ts`:
   ```typescript
   videos: {
     getAll: (params?) => api.get('/api/videos', params),
     getById: (id) => api.get(`/api/videos/${id}`),
     getByCategory: (category) => api.get(`/api/videos?category=${category}`),
     trackView: (id) => api.post(`/api/videos/${id}/view`),
   },
   categories: {
     getAll: () => api.get('/api/categories'),
     getBySlug: (slug) => api.get(`/api/categories/${slug}`),
   }
   ```

3. **Update Services**:
   - Modify `videoService.ts` → Backend API → Supabase → Mock
   - Modify `categoryService.ts` → Backend API → Supabase → Mock

4. **If Endpoints DON'T Exist**:
   - Keep current Supabase → Mock flow (acceptable)
   - Document as "Supabase-first" services

### Phase 3: Enhance Provider Service (Low Priority) 🟢

**Goal**: Use Backend API for provider operations where available

**Current**: `providerService.ts` only uses Supabase
**Available**: `api.providers.*` endpoints exist

**Enhancement**:
```typescript
// Add API → Supabase cascade
getAll: async (params) => {
  try {
    // Try backend API first
    const response = await api.providers.getAll(params);
    if (response.success && response.data) {
      return response.data.map(mapToProvider);
    }
  } catch (error) {
    console.warn('API failed, trying Supabase:', error);
  }

  // Fallback to Supabase (current implementation)
  // ... existing Supabase code ...
}
```

### Phase 4: Add Data Source Validation (Dev Tool)

**Goal**: Catch components using mock data in production

**Implementation**:
```typescript
// src/utils/dataSourceValidator.ts
export function validateNoMockImports() {
  if (import.meta.env.PROD) {
    const mockFiles = ['data/articles', 'data/providers', 'data/tools'];
    // Check if any component imported these outside of services
    // Log warnings to console
  }
}
```

### Phase 5: Testing & Validation

**Test Scenarios**:

1. **API Available** (Happy Path):
   - Backend returns data → UI renders correctly
   - No mock data visible in responses

2. **API Unavailable** (Fallback Path):
   - Backend down → Supabase returns data
   - Supabase down → Mock data used
   - User sees "Limited connectivity" notice

3. **Empty State**:
   - Backend returns empty array → Show "No results" UI
   - Not confused with loading state

4. **Partial Data**:
   - Some fields missing → Graceful degradation
   - No null reference errors

**Validation Checklist**:
- [ ] All dashboard pages show real user data
- [ ] Search returns real results (articles, providers, tools)
- [ ] Category pages fetch from services
- [ ] Bookmarks persist to backend
- [ ] Mood/sleep tracking saves to backend
- [ ] Provider directory shows real providers
- [ ] Assessment history syncs with backend

---

## Environment Setup

### Required Variables (`.env`)

```bash
# Backend API (v-1)
VITE_API_URL=https://psychage-backend.vercel.app

# Supabase (Fallback)
VITE_SUPABASE_URL=https://ozourhqyqtpppvpbhphw.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Sanity CMS (Content)
VITE_SANITY_PROJECT_ID=w1sh63w6
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

# Gemini AI (MindMate)
VITE_GEMINI_API_KEY=your-gemini-api-key
```

### Local Development

**Backend must be running**:
```bash
# Start v-1 backend locally (if testing)
cd ../psychage-backend
npm run dev  # Runs on localhost:3000
```

**Then start frontend**:
```bash
cd psychage-v2
npm run dev  # Runs on localhost:5173
```

---

## API Client Features

### Authentication & Token Management

- ✅ Auto-attaches Bearer token to requests
- ✅ Auto-refreshes expired tokens (401 → refresh → retry)
- ✅ Clears tokens on logout
- ✅ Stores in localStorage (`psychage_access_token`, `psychage_refresh_token`)

### Error Handling

- ✅ ApiError class with status codes
- ✅ Network error detection
- ✅ Automatic retry on 401 (token refresh)

### Type Safety

- ✅ TypeScript interfaces for all responses
- ✅ ApiResponse<T> wrapper for consistent structure
- ✅ Strongly typed request parameters

---

## Backend Response Normalization

### Supabase vs Backend API Differences

| Field | Supabase | Backend API | Normalized |
|-------|----------|-------------|------------|
| User ID | `id` (UUID) | `id` or `user_id` | `id` |
| Timestamps | `created_at` (ISO) | `createdAt` (ISO) | `created_at` |
| Nested Data | `{ category: { name } }` | `{ category: "name" }` | Service mappers handle |
| Arrays | `specialties: string[]` | `specialties: string[]` | ✅ Consistent |

**Mappers** in each service handle response normalization:
```typescript
function mapToProvider(data: DBProvider): Provider {
  return {
    id: data.id,
    name: data.full_name,  // Normalize field names
    role: data.role || 'Provider',  // Provide defaults
    // ... rest of mapping
  };
}
```

---

## Known Backend Quirks & Workarounds

### 1. Category Filtering in Articles

**Issue**: Supabase uses `category.slug`, but mock data uses `category` as string
**Fix**: Services normalize both to unified interface

### 2. Provider Status Field

**Issue**: Backend might return `verification_status` or `status`
**Fix**: `providerService` checks both fields

### 3. Video Duration Format

**Issue**: Supabase stores as `"mm:ss"` string, mock uses seconds integer
**Fix**: `videoService.mapToVideo()` converts all to seconds

### 4. Empty vs Null Arrays

**Issue**: Backend sometimes returns `null` for arrays instead of `[]`
**Fix**: All mappers use `data.field || []` fallback

---

## Success Criteria

### Definition of Done

- [ ] **Zero direct mock imports** in components (except services)
- [ ] **All pages load real data** when backend is available
- [ ] **Graceful fallbacks** when backend is down (Supabase → Mock)
- [ ] **Loading states** on all data-fetching components
- [ ] **Error states** with retry buttons
- [ ] **Empty states** for no results
- [ ] **Type safety** maintained (no `any` types)
- [ ] **No console errors** in production builds
- [ ] **Performance**: No unnecessary re-fetches (proper caching)

### Acceptance Testing

**Scenario 1: Fresh User Login**
1. User logs in with credentials
2. Dashboard shows real user data (name, streak, scores)
3. No "undefined" or mock placeholder names visible
4. Activity feed shows real user actions

**Scenario 2: Provider Search**
1. User navigates to /find-care
2. Provider list loads from backend (not mock 6 providers)
3. Filters work (specialty, insurance, location)
4. Clicking provider shows real profile

**Scenario 3: Article Browse**
1. User navigates to /learn
2. Articles load from Sanity CMS (with real content)
3. Category filter works
4. Bookmark syncs to backend

**Scenario 4: Offline Graceful Degradation**
1. Backend API goes down
2. App falls back to Supabase data
3. Supabase goes down → Mock data shows
4. User sees "Limited connectivity" banner

---

## Monitoring & Debugging

### Console Logging Pattern

Each service logs its data source:
```typescript
console.log(`[ArticleService] Fetched ${articles.length} articles from Sanity`);
console.warn('[ArticleService] Sanity failed, trying Supabase');
console.error('[ArticleService] All sources failed, using mock data');
```

### Data Source Detection

Add `_source` field to responses:
```typescript
export interface ArticleWithContent extends Article {
  _source?: 'sanity' | 'supabase' | 'mock';
}
```

### Production Alerts

**Add to Sentry/logging**:
- Alert when mock data is served in production
- Track API failure rates
- Monitor fallback usage

---

## Rollout Strategy

### Phase 1: Internal Testing (Week 1)
- Deploy to staging with full backend integration
- Test all user flows manually
- Fix critical bugs

### Phase 2: Beta Users (Week 2)
- Deploy to subset of production users (10%)
- Monitor error rates, API performance
- Gather user feedback

### Phase 3: Full Rollout (Week 3)
- Deploy to 100% of users
- Continuous monitoring
- Hotfix rapid response ready

---

## Rollback Plan

**If critical issues arise**:

1. **Quick Rollback**: Revert to previous deployment (mock data version)
2. **Partial Rollback**: Use feature flags to disable specific API integrations
3. **Emergency Fix**: Force all services to use mock data:
   ```typescript
   // Add to .env for emergency
   VITE_FORCE_MOCK_DATA=true
   ```

---

## Contact & Support

**For Backend API Issues**:
- Check backend logs: [Vercel Dashboard](https://vercel.com/dashboard)
- Restart backend service if needed

**For Frontend Integration Issues**:
- Check browser console for `[Service]` prefixed logs
- Verify `.env` variables are set correctly
- Test API endpoints with curl/Postman first

---

## Appendix: Quick Reference

### Import Cheat Sheet

```typescript
// ✅ GOOD: Always use services
import { articleService } from '@/services/articleService';
import { providerService } from '@/services/providerService';
import { toolService } from '@/services/toolService';

// ❌ BAD: Never import mock data directly (except in services)
import { articles } from '@/data/articles';  // NO!
import { providers } from '@/data/providers';  // NO!
```

### Service Call Pattern

```typescript
// Standard pattern for all data fetching
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await articleService.getAll({ category: 'anxiety' });
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [/* dependencies */]);

// Render with states
if (loading) return <Skeleton />;
if (error) return <ErrorState message={error} onRetry={fetchData} />;
if (data.length === 0) return <EmptyState />;
return <DataList items={data} />;
```

---

**Document Version**: 1.0
**Last Updated**: 2026-03-03
**Next Review**: After Phase 1 completion
