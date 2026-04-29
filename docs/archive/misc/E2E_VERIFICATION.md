# End-to-End Verification Guide

**Date:** March 2, 2026
**Architecture:** V2 Frontend → V1 Backend → Supabase

## ✅ Current Status

**Backend (V1):**
- Location: `/Users/raiyanabdullah/Desktop/Project Psychage V1/main_backend`
- Port: 3000
- Status: ✅ **RUNNING**
- Health: ✅ **HEALTHY** (verified at 2026-03-01T20:11:15.124Z)

**Frontend (V2):**
- Location: `/Users/raiyanabdullah/Desktop/psychage-v2`
- Port: 5174 (auto-selected by Vite)
- Status: ✅ **RUNNING**
- Config: ✅ **CONNECTED** to backend at http://localhost:3000

## 🧪 End-to-End Test Scenarios

### Test 1: Authentication Flow

**Endpoint:** `/api/auth/login` (Backend) → Supabase Auth

1. **Open the app:**
   ```
   http://localhost:5174
   ```

2. **Click "Sign In" or navigate to login**

3. **Test login with existing account:**
   - Enter email and password
   - Click "Sign In"
   - **Expected:** Successful login, redirect to dashboard

4. **Verify auth state:**
   - Check user profile appears in header
   - Verify authenticated routes are accessible
   - **Expected:** User session persists across page refreshes

**Flow:**
```
Frontend AuthContext
  → POST http://localhost:3000/api/auth/login
    → Backend validates input + rate limiting
      → Supabase auth.signInWithPassword()
        → Returns JWT tokens
  → Frontend stores session
    → Supabase auth state listener updates UI
```

**Success Criteria:**
- ✅ No CORS errors in console
- ✅ No 404 errors (endpoints exist)
- ✅ Auth tokens stored correctly
- ✅ User redirected to dashboard
- ✅ Protected routes accessible

---

### Test 2: Mood Journal

**Endpoint:** `/api/mood` (Backend) → Supabase `mood_entries` table

1. **Navigate to Mood Journal:**
   ```
   http://localhost:5174/tools/mood-journal
   ```

2. **Log a new mood entry:**
   - Select mood rating (1-5)
   - Add optional notes
   - Add optional tags
   - Click "Save Entry"

3. **Verify entry appears:**
   - Check entry in list
   - Verify timestamp is correct
   - **Expected:** New entry immediately visible

4. **View statistics:**
   - Check average mood
   - View mood trend chart
   - **Expected:** Stats update with new entry

**Flow:**
```
Frontend MoodJournal component
  → POST http://localhost:3000/api/mood
    → Backend validates (mood 1-5, auth required)
      → INSERT into mood_entries table
        → Returns created entry
  → Frontend updates UI + chart
```

**Success Criteria:**
- ✅ Entry saves successfully
- ✅ Statistics calculate correctly
- ✅ Chart updates in real-time
- ✅ Historical entries load on page load

---

### Test 3: Sleep Tracker

**Endpoint:** `/api/sleep` (Backend) → Supabase `sleep_entries` table

1. **Navigate to Sleep Tracker:**
   ```
   http://localhost:5174/tools/sleep-architect
   ```

2. **Log sleep data:**
   - Enter hours slept (0-24)
   - Set sleep quality (1-5)
   - Add optional notes
   - Click "Log Sleep"

3. **Verify sleep stats:**
   - Check average hours
   - View quality trend
   - Read personalized recommendations
   - **Expected:** Stats and recommendations update

**Flow:**
```
Frontend SleepTracker component
  → POST http://localhost:3000/api/sleep
    → Backend validates (hours 0-24, quality 1-5)
      → INSERT into sleep_entries table
        → Returns created entry
  → Frontend calculates stats + recommendations
```

**Success Criteria:**
- ✅ Entry saves with validation
- ✅ Averages calculate correctly
- ✅ Recommendations are personalized
- ✅ Trend chart displays properly

---

### Test 4: Bookmarks

**Endpoint:** `/api/bookmarks` (Backend) → Supabase `bookmarks` table

1. **Navigate to Learn section:**
   ```
   http://localhost:5174/learn
   ```

2. **Bookmark an article:**
   - Click bookmark icon on any article
   - **Expected:** Icon fills in, shows "bookmarked" state

3. **View saved bookmarks:**
   - Navigate to Dashboard → Saved Items
   - **Expected:** Bookmarked article appears

4. **Remove bookmark:**
   - Click bookmark icon again
   - **Expected:** Bookmark removed, icon unfilled

**Flow:**
```
Frontend BookmarkButton component
  → POST http://localhost:3000/api/bookmarks (toggle)
    → Backend checks if bookmark exists
      → If exists: DELETE from bookmarks table
      → If not: INSERT into bookmarks table
        → Returns new bookmark state
  → Frontend updates icon + localStorage cache
```

**Success Criteria:**
- ✅ Bookmarks toggle correctly
- ✅ State persists across page refreshes
- ✅ Bookmarked items appear in dashboard
- ✅ Works offline with localStorage fallback

---

### Test 5: User Profile

**Endpoint:** `/api/user/profile` (Backend) → Supabase `user_profiles` table + Storage

1. **Navigate to Account Settings:**
   ```
   http://localhost:5174/dashboard/settings
   ```

2. **Update profile:**
   - Change display name
   - Update location
   - Add bio
   - Click "Save Changes"
   - **Expected:** Success message, profile updates

3. **Upload avatar:**
   - Click "Change Avatar"
   - Select image file (max 5MB)
   - **Expected:** Upload progress, new avatar displays

4. **Change password:**
   - Enter current password
   - Enter new password (min 8 chars)
   - Confirm new password
   - Click "Change Password"
   - **Expected:** Password updated, success message

**Flow:**
```
Frontend AccountSettings component
  → PUT http://localhost:3000/api/user/profile
    → Backend validates input
      → UPSERT user_profiles table
      → For avatar: Upload to Supabase Storage
        → Returns public URL
  → Frontend updates user context + UI
```

**Success Criteria:**
- ✅ Profile updates save correctly
- ✅ Avatar uploads to Supabase Storage
- ✅ Password change requires current password
- ✅ Changes reflect immediately in UI

---

### Test 6: Provider Directory

**Endpoint:** `/api/providers` (Backend) → Supabase `providers` table

1. **Navigate to Find Care:**
   ```
   http://localhost:5174/find-care
   ```

2. **Search for providers:**
   - Enter location (e.g., "New York")
   - Select specialty (e.g., "Psychiatrist")
   - Click "Search"
   - **Expected:** Filtered provider list

3. **View provider profile:**
   - Click "View Profile" on a provider
   - **Expected:** Full provider details, reviews, contact info

4. **Favorite a provider:**
   - Click heart icon
   - Navigate to Dashboard → Favorites
   - **Expected:** Provider appears in favorites

**Flow:**
```
Frontend ProviderDirectory component
  → GET http://localhost:3000/api/providers?location=...&specialty=...
    → Backend queries providers table with filters
      → Returns matching providers
  → Frontend displays results
```

**Success Criteria:**
- ✅ Search filters work correctly
- ✅ Provider profiles load with all data
- ✅ Favorites save and persist
- ✅ Verified badge shows for verified providers

---

### Test 7: AI Chat (MindMate)

**Endpoint:** `/api/ai/chat` (Backend) → Google Gemini API

1. **Open MindMate chat:**
   - Click chat icon in bottom-right corner
   - OR navigate to `/tools/mindmate`

2. **Send a message:**
   - Type: "I've been feeling anxious lately"
   - Press Enter
   - **Expected:** AI response appears

3. **Follow-up conversation:**
   - Continue conversation
   - **Expected:** Context-aware responses

**Flow:**
```
Frontend MindMate component
  → POST http://localhost:3000/api/ai/chat
    → Backend rate limits + validates input
      → Calls Google Gemini API
        → Returns AI response
  → Frontend displays response + saves to history
```

**Success Criteria:**
- ✅ Messages send successfully
- ✅ AI responses are relevant and helpful
- ✅ Conversation history persists
- ✅ Rate limiting prevents abuse

---

## 🔍 Browser Console Checks

Open Developer Tools (F12) and verify:

1. **No CORS errors:**
   ```
   ✅ Should NOT see: "Access-Control-Allow-Origin"
   ```

2. **No 404 errors:**
   ```
   ✅ Should NOT see: "404 Not Found" for /api/* endpoints
   ```

3. **Successful API calls:**
   ```
   ✅ Network tab shows 200 OK for:
      - POST /api/auth/login
      - GET /api/mood
      - POST /api/mood
      - GET /api/sleep
      - POST /api/bookmarks
      - GET /api/providers
   ```

4. **Auth headers present:**
   ```
   ✅ Requests to /api/* include Authorization: Bearer <token>
   ```

---

## 🐛 Troubleshooting

### Issue: CORS Errors

**Symptom:**
```
Access to fetch at 'http://localhost:3000/api/...' from origin
'http://localhost:5174' has been blocked by CORS policy
```

**Fix:**
1. Check backend CORS configuration in `/Users/raiyanabdullah/Desktop/Project Psychage V1/main_backend`
2. Ensure `ALLOWED_ORIGINS` includes `http://localhost:5174`
3. Restart backend server

---

### Issue: 401 Unauthorized

**Symptom:**
```
{"error": "Authentication required"}
```

**Fix:**
1. Verify user is logged in (check AuthContext state)
2. Check that JWT token is in localStorage
3. Token may have expired - try logging out and back in

---

### Issue: 404 Not Found

**Symptom:**
```
GET http://localhost:3000/api/mood 404 (Not Found)
```

**Fix:**
1. Verify backend is running: `curl http://localhost:3000/api/health`
2. Check that endpoint exists in backend `/app/api/` directory
3. Restart backend if routes were recently added

---

### Issue: Database Connection Errors

**Symptom:**
```
{"error": "Database query failed"}
```

**Fix:**
1. Check Supabase credentials in backend `.env.local`
2. Verify Supabase project is not paused
3. Check RLS policies allow the operation
4. Review backend logs for detailed error

---

## ✅ Success Checklist

After running all tests, verify:

- [ ] Authentication works (login/logout/signup)
- [ ] Mood journal entries save and load
- [ ] Sleep tracker entries save and calculate stats
- [ ] Bookmarks toggle and persist
- [ ] User profile updates save
- [ ] Avatar uploads to Supabase Storage
- [ ] Password changes work
- [ ] Provider search filters correctly
- [ ] Provider favorites save
- [ ] AI chat responds (if enabled)
- [ ] No CORS errors in console
- [ ] No 404 errors for API endpoints
- [ ] All protected routes require auth
- [ ] Session persists across page refreshes

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    OPTION B: INTENDED ARCHITECTURE          │
│                          (IMPLEMENTED)                       │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐
│  Browser         │
│  localhost:5174  │
└────────┬─────────┘
         │
         │ HTTP requests
         │ (CORS enabled)
         ▼
┌──────────────────┐
│  Frontend (V2)   │
│  React + Vite    │
│  Port: 5174      │
│                  │
│  • Components    │
│  • Services      │
│  • Context       │
│  • Routing       │
└────────┬─────────┘
         │
         │ REST API calls
         │ /api/auth/*, /api/mood, etc.
         │ + Authorization: Bearer <token>
         ▼
┌──────────────────┐
│  Backend (V1)    │
│  Next.js API     │
│  Port: 3000      │
│                  │
│  • Validation    │
│  • Rate limiting │
│  • Business logic│
│  • CORS handling │
└────────┬─────────┘
         │
         │ Supabase SDK calls
         │ (server-side, secure)
         ▼
┌──────────────────┐
│  Supabase Cloud  │
│                  │
│  • PostgreSQL    │
│  • Auth          │
│  • Storage       │
│  • RLS policies  │
└──────────────────┘

┌────────────────────────────────────────┐
│  FALLBACK MODE (No backend running)    │
└────────────────────────────────────────┘

Frontend → Supabase (direct client calls)
         → localStorage (offline cache)
         → Mock data (last resort)
```

---

## 🚀 Quick Start Commands

**Terminal 1 - Backend:**
```bash
cd "/Users/raiyanabdullah/Desktop/Project Psychage V1/main_backend"
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd "/Users/raiyanabdullah/Desktop/psychage-v2"
npm run dev
```

**Browser:**
```
http://localhost:5174
```

**Health Check:**
```bash
curl http://localhost:3000/api/health
```

---

## 📝 Next Steps

1. **Run through all test scenarios above** ✓
2. **Fix any failing tests**
3. **Optional: Add automated E2E tests** (Playwright)
4. **Deploy to production:**
   - Deploy backend to Vercel
   - Deploy frontend to Vercel
   - Update `VITE_API_URL` to production backend URL
   - Configure CORS for production domain

---

**Status:** Ready for testing!
**Architecture:** V2 → V1 Backend → Supabase ✅
**Last Updated:** March 2, 2026
