# API Integration Checklist

**Status**: Phase 1 Complete ✅ | Ready for API Integration

When you're ready to connect the PsychAge v-1 backend API, follow this checklist:

---

## Prerequisites

- [ ] PsychAge v-1 backend is deployed and running
- [ ] Backend URL is accessible (e.g., `https://psychage-backend.vercel.app`)
- [ ] Backend has CORS configured for frontend domain

---

## Step 1: Configure Environment Variables

Update your `.env` file:

```bash
# Backend API (v-1)
VITE_API_URL=https://your-backend-url.vercel.app

# Supabase (Fallback - already configured)
VITE_SUPABASE_URL=https://ozourhqyqtpppvpbhphw.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Sanity CMS (Content - already configured)
VITE_SANITY_PROJECT_ID=w1sh63w6
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

**That's it!** No code changes needed.

---

## Step 2: Test API Endpoints

Verify your backend has these endpoints working:

### Authentication
```bash
curl -X POST $VITE_API_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Search (Used by SearchResults & SearchAutocomplete)
```bash
curl "$VITE_API_URL/api/search?q=anxiety&type=all&limit=10"
curl "$VITE_API_URL/api/search/articles?q=anxiety&limit=5"
```

### Tools (Used by CategoryPage & ToolsLandingPage)
```bash
curl "$VITE_API_URL/api/tools"
curl "$VITE_API_URL/api/tools/1"
```

### Articles (Used by CategoryPage & LearnPage)
```bash
curl "$VITE_API_URL/api/articles?category=anxiety"
curl "$VITE_API_URL/api/articles/1"
```

### User Dashboard
```bash
curl "$VITE_API_URL/api/user/profile" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Step 3: Verify Data Flow

After setting `VITE_API_URL`, test these pages:

### Homepage
- [ ] `/` - AllCategoriesSection loads categories
- [ ] Search autocomplete shows suggestions as you type
- [ ] Check console: Should see `[CategoryService] Fetched X categories from...`

### Search
- [ ] `/search?q=anxiety` - Shows real search results
- [ ] Filter by category works
- [ ] Sort by date/title/relevance works
- [ ] Check console: Should see `Unified search` or `Fallback search` messages

### Category Pages
- [ ] `/learn/anxiety` - Loads articles, videos, tools
- [ ] Loading skeletons appear briefly
- [ ] Empty states show if no content
- [ ] Check console: Should see `[ArticleService] Fetched X articles from...`

### Dashboards
- [ ] `/dashboard` - User dashboard shows real stats
- [ ] `/provider` - Provider dashboard shows real data
- [ ] `/admin` - Admin dashboard shows real metrics

---

## Step 4: Test Fallback Behavior

**Scenario A: API Available**
1. Start with `VITE_API_URL` set correctly
2. Open browser DevTools → Network tab
3. Navigate to `/search?q=test`
4. ✅ Should see requests to your backend API
5. ✅ Data loads from API (check console logs)

**Scenario B: API Unavailable**
1. Set `VITE_API_URL=https://fake-url-does-not-exist.com`
2. Navigate to `/learn/anxiety`
3. ✅ Should see "API failed, trying Supabase" in console
4. ✅ Data loads from Supabase
5. ✅ No blank pages or crashes

**Scenario C: Both Down (Dev Mode)**
1. Set invalid `VITE_API_URL` and disconnect internet
2. Navigate to any page
3. ✅ Should see "Using mock data" in console
4. ✅ Mock data displays (dev fallback)

---

## Step 5: Check Console Logs

Each service logs its data source. You should see:

**With API working:**
```
[ArticleService] Fetched 10 articles from Sanity
[ToolService] Fetched 6 tools from Backend API
[SearchService] Unified search returned 15 results
```

**With API down:**
```
[ArticleService] Sanity failed, trying Supabase
[ToolService] API failed, using mock data
```

---

## Optional: Add Missing API Endpoints

If your backend doesn't have these yet, add them:

### Videos API
```typescript
// In your backend:
GET /api/videos
GET /api/videos/:id
GET /api/videos?category=wellness
```

Then update frontend `src/lib/api.ts`:
```typescript
videos: {
  getAll: (params?: { category?: string; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    return api.get<unknown[]>(`/api/videos?${searchParams.toString()}`);
  },
  getById: (id: string | number) => api.get<unknown>(`/api/videos/${id}`),
},
```

Then update `src/services/videoService.ts` to use API first:
```typescript
getAll: async (params) => {
  try {
    // Try API first
    const response = await api.videos.getAll(params);
    if (response.success && response.data) {
      return response.data.map(mapToVideo);
    }
  } catch (error) {
    console.warn('API failed, trying Supabase');
  }

  // Fallback to Supabase (existing code)
  // ...
}
```

### Categories API
Same pattern for categories if needed.

---

## Troubleshooting

### "API requests failing with CORS errors"
- Add your frontend URL to backend CORS whitelist
- In production: `https://psychage.vercel.app`
- In dev: `http://localhost:5173`

### "API returns 401 Unauthorized"
- Check if `tokenStorage.getAccessToken()` has valid token
- Try logging in again
- Check backend logs for auth errors

### "Some data shows, some doesn't"
- This is normal with cascading fallbacks
- Articles from Sanity, Tools from API, Videos from Supabase = working as designed
- Check console logs to see which source provided what data

### "Mock data still showing with API URL set"
- Clear browser cache and localStorage
- Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
- Check `.env` file is actually being read (restart dev server)

---

## Success Criteria

You know it's working when:

- ✅ No direct mock imports in components (we fixed this!)
- ✅ Console logs show data sources (API/Supabase/Mock)
- ✅ Search returns results from backend
- ✅ Dashboard shows real user data
- ✅ Fallbacks work when API is down
- ✅ No `undefined` or blank pages
- ✅ Loading states appear briefly
- ✅ Error states show retry buttons

---

## Reference Files

- **API Client**: [`src/lib/api.ts`](src/lib/api.ts) - All backend endpoints
- **Services**: [`src/services/`](src/services/) - Data fetching with fallbacks
- **Migration Guide**: [`REAL_DATA_MIGRATION.md`](REAL_DATA_MIGRATION.md) - Full documentation

---

**Last Updated**: 2026-03-03
**Phase**: 1 Complete ✅ | Ready for API Integration
