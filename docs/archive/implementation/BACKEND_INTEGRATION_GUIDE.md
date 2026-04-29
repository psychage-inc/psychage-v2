# Backend Integration Guide

**Status**: Ready for Backend API ⏳
**Phase 1 Complete**: ✅ Component refactoring, service layer, fallback architecture
**Phase 2 Pending**: Backend API deployment and integration

---

## Overview

This guide walks you through integrating the PsychAge v-1 backend API with the PsychAge v2 frontend. The frontend architecture is already prepared with:

- ✅ Service layer with cascading fallbacks (API → Supabase → Mock)
- ✅ All components refactored to use services (no direct mock imports)
- ✅ Comprehensive API client with ~40 endpoints
- ✅ Loading, error, and empty states throughout
- ✅ Verification scripts ready to test backend

---

## Prerequisites

Before starting integration:

- [ ] PsychAge v-1 backend is deployed and accessible
- [ ] You have the backend URL (e.g., `https://psychage-backend.vercel.app`)
- [ ] Backend has CORS configured for frontend domain
- [ ] You have test credentials for authentication endpoints

---

## Integration Steps

### Step 1: Verify Backend API

Before connecting the frontend, test that your backend endpoints are working:

```bash
cd /Users/raiyanabdullah/Desktop/psychage-v2

# Install ts-node if not already installed
npm install -g ts-node

# Run endpoint verification script
ts-node scripts/verify-api-endpoints.ts https://your-backend-url.vercel.app
```

**Expected Output:**
```
Backend API Verification
Testing: https://your-backend-url.vercel.app

Phase 1: Authentication
  ✓ Login (234ms) OK

Phase 2: Critical Endpoints
  ✓ Unified Search (145ms)
  ✓ Article Search (123ms)
  ✓ Get All Tools (167ms)
  ✓ Get Tool by ID (89ms)
  ✓ Get Articles by Category (156ms)
  ✓ Get Article by ID (92ms)

Summary:
  Passed: 7
  Failed: 0
  Total: 7

✓ All endpoints verified successfully!
You can now set VITE_API_URL=https://your-backend-url.vercel.app in your .env file
```

**If tests fail:**
- Check backend logs for errors
- Verify CORS is configured correctly
- Ensure endpoints match the expected API spec (see [REAL_DATA_MIGRATION.md](./REAL_DATA_MIGRATION.md))

---

### Step 2: Configure Environment

Update your `.env` file:

```bash
# Backend API URL (v-1)
VITE_API_URL=https://your-backend-url.vercel.app

# Supabase (Fallback - already configured)
VITE_SUPABASE_URL=https://ozourhqyqtpppvpbhphw.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Sanity CMS (Content - already configured)
VITE_SANITY_PROJECT_ID=w1sh63w6
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

# Google Gemini (MindMate AI)
VITE_GEMINI_API_KEY=your-gemini-api-key
```

**Restart dev server** for changes to take effect:

```bash
npm run dev
```

---

### Step 3: Manual QA Testing

Open your browser to `http://localhost:5173` and test these critical flows:

#### 3.1 Homepage - Categories Loading
- [ ] Navigate to `/`
- [ ] Verify AllCategoriesSection loads categories
- [ ] Check DevTools Console for: `[CategoryService] Fetched X categories from...`
- [ ] No errors or blank screens

#### 3.2 Search Functionality
- [ ] Navigate to `/`
- [ ] Type in search bar - autocomplete suggestions should appear
- [ ] Check Console: `Fetching search suggestions...`
- [ ] Submit search for "anxiety"
- [ ] Navigate to `/search?q=anxiety`
- [ ] Verify results load from backend
- [ ] Check Console: `Unified search returned X results` or `Fallback search...`
- [ ] Filter by category - results should update
- [ ] Sort by date/title - results should reorder

#### 3.3 Category Pages
- [ ] Navigate to `/learn/anxiety`
- [ ] Verify articles, videos, and tools load
- [ ] Check Console:
  - `[ArticleService] Fetched X articles from Sanity`
  - `[ToolService] Fetched X tools from Backend API`
- [ ] Loading skeletons appear briefly
- [ ] No undefined/blank sections

#### 3.4 Dashboard (Requires Auth)
- [ ] Log in with test account
- [ ] Navigate to `/dashboard`
- [ ] Verify user data loads
- [ ] Check mood journal, sleep tracker work
- [ ] No 401 Unauthorized errors

---

### Step 4: Test Fallback Behavior

Verify the cascading fallback system works correctly:

#### Test A: API Available ✅
1. Start with correct `VITE_API_URL` in `.env`
2. Open DevTools → Network tab
3. Navigate to `/search?q=test`
4. **Expected**:
   - Requests to your backend API visible in Network tab
   - Console: `Unified search returned X results`
   - Data loads successfully

#### Test B: API Unavailable → Supabase Fallback ⚠️
1. Set `VITE_API_URL=https://fake-url-does-not-exist.com`
2. Restart dev server
3. Navigate to `/learn/anxiety`
4. **Expected**:
   - Console: `API failed, trying Supabase`
   - Articles still load from Sanity CMS
   - Tools fall back to mock data
   - No crashes or blank pages

#### Test C: Both Down → Mock Data 🔵
1. Set invalid `VITE_API_URL` and disconnect internet
2. Navigate to any page
3. **Expected**:
   - Console: `Using mock data`
   - Mock data displays (6 providers, 15 articles, etc.)
   - App still functional

---

### Step 5: Console Log Verification

Your browser console should show clear data source indicators:

**✅ With API working:**
```
[ArticleService] Fetched 10 articles from Sanity
[ToolService] Fetched 6 tools from Backend API
[SearchService] Unified search returned 15 results
[CategoryService] Fetched 12 categories from Backend API
```

**⚠️ With API down:**
```
[ArticleService] Sanity failed, trying Supabase
[ToolService] API failed, using mock data
[SearchService] Fallback search mode
```

**🔴 Errors to watch for:**
```
❌ CORS error - Fix backend CORS configuration
❌ 401 Unauthorized - Check auth token in localStorage
❌ Undefined is not an object - Check response mapping
❌ Network request failed - Backend may be down
```

---

### Step 6: Network Tab Verification

Open DevTools → Network tab and verify:

#### API Requests
- [ ] `GET https://your-backend-url.vercel.app/api/search?q=...` - Status 200
- [ ] `GET https://your-backend-url.vercel.app/api/articles?category=...` - Status 200
- [ ] `GET https://your-backend-url.vercel.app/api/tools` - Status 200

#### Headers Present
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...  (for auth endpoints)
Content-Type: application/json
Accept: application/json
```

#### Response Structure
```json
{
  "success": true,
  "data": [...],
  "meta": {
    "total": 15,
    "page": 1
  }
}
```

---

## Troubleshooting

### Issue: CORS Errors

**Symptom:** Console shows `Access to fetch at '...' has been blocked by CORS policy`

**Solution:**
```javascript
// In your backend (Express example):
app.use(cors({
  origin: [
    'http://localhost:5173',  // Dev
    'https://psychage.vercel.app'  // Production
  ],
  credentials: true
}));
```

---

### Issue: 401 Unauthorized

**Symptom:** API requests fail with 401 status

**Possible causes:**
1. No token in localStorage
2. Token expired
3. Token not included in request headers

**Solution:**
```bash
# Check localStorage in DevTools Console:
localStorage.getItem('psychage_access_token')

# If null, log in again:
# Navigate to /login and sign in
```

The API client automatically handles token refresh, but you may need to log in again if refresh token is also expired.

---

### Issue: Some Data Shows, Some Doesn't

**Symptom:** Articles load but tools don't, or vice versa

**This is normal!** With cascading fallbacks:
- Articles from Sanity CMS ✅
- Tools from Backend API (if available) or Mock ⚠️
- Videos from Supabase ✅

**Solution:** Check console logs to see which source provided what data. This is working as designed.

---

### Issue: Mock Data Still Showing

**Symptom:** Even with `VITE_API_URL` set, seeing mock providers/tools

**Solution:**
1. Verify `.env` file is actually being read:
   ```bash
   cat .env | grep VITE_API_URL
   ```
2. Restart dev server (Vite doesn't hot-reload env changes):
   ```bash
   npm run dev
   ```
3. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
4. Clear localStorage:
   ```javascript
   localStorage.clear();
   window.location.reload();
   ```

---

### Issue: Response Structure Mismatch

**Symptom:** Console errors like `Cannot read property 'map' of undefined`

**Cause:** Backend response structure differs from expected format

**Solution:** Check response mapping in services. Backend may return:
```json
// Option A: Direct array
[{...}, {...}]

// Option B: Wrapped in data
{ "data": [{...}, {...}] }

// Option C: Success wrapper
{ "success": true, "data": [{...}] }
```

Services should handle all three formats. If not, update mapping in `src/services/`.

---

## Performance Optimization (Optional)

After basic integration works, consider these optimizations:

### 1. Request Debouncing ✅
Already implemented in SearchAutocomplete (300ms debounce)

### 2. Response Caching
Add caching to frequently accessed endpoints:

```typescript
// In src/lib/api.ts
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function cachedGet<T>(url: string): Promise<T> {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await api.get<T>(url);
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}
```

### 3. Pagination
For large result sets, implement pagination:

```typescript
// Example: Paginated article search
api.search.articles(query, 20, page);
```

### 4. Bundle Size Analysis
```bash
npm run build
npm run analyze  # If analyzer is configured
```

---

## Monitoring & Logging

### Development
- Watch browser console for service logs
- Check Network tab for request/response details
- Use React DevTools to inspect component state

### Production
Consider adding:
- Error tracking (Sentry, LogRocket)
- Analytics (Google Analytics, Plausible)
- Performance monitoring (Vercel Analytics, Web Vitals)

---

## Success Criteria

You know the integration is successful when:

- ✅ No direct mock imports in components
- ✅ Console logs show data sources (API/Supabase/Mock)
- ✅ Search returns results from backend
- ✅ Dashboard shows real user data
- ✅ Fallbacks work when API is down (no crashes)
- ✅ No `undefined` or blank pages
- ✅ Loading states appear briefly before data
- ✅ Error states show retry buttons
- ✅ All critical flows work end-to-end

---

## Scripts Reference

### Endpoint Verification
```bash
ts-node scripts/verify-api-endpoints.ts https://your-backend-url.vercel.app
```

### Fallback Testing
```bash
ts-node scripts/test-fallback-behavior.ts
```

### Production Build
```bash
npm run build
npm run preview  # Test production build locally
```

---

## Related Documentation

- [API_INTEGRATION_CHECKLIST.md](./API_INTEGRATION_CHECKLIST.md) - Step-by-step checklist
- [REAL_DATA_MIGRATION.md](./REAL_DATA_MIGRATION.md) - Complete technical reference
- [src/lib/api.ts](./src/lib/api.ts) - API client implementation
- [src/services/](./src/services/) - Service layer with fallbacks

---

## Next Steps After Integration

Once backend integration is complete:

1. **Commit Changes**
   ```bash
   git add .env
   git commit -m "feat: Integrate PsychAge v-1 backend API"
   ```

2. **Deploy to Production**
   ```bash
   # Set environment variables in Vercel dashboard
   vercel env add VITE_API_URL production

   # Deploy
   git push origin main
   ```

3. **Monitor Production**
   - Check error logs
   - Monitor API latency
   - Track user-reported issues

4. **Optimize & Iterate**
   - Add caching where needed
   - Optimize slow queries
   - Improve error messages based on user feedback

---

**Last Updated**: 2026-03-03
**Status**: Ready for Backend API Integration
**Contact**: Raiyan Abdullah
