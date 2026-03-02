# Psychage V2 - Quick Start Guide

## Architecture Overview

```
V2 Frontend (psychage-v2)          V1 Backend (main_backend)
Port: 5173                    →    Port: 3000
Vite + React                      Next.js + API Routes
                                       ↓
                                  Supabase DB
```

## Running the Application

### 1. Start Backend (Terminal 1)
```bash
cd "/Users/raiyanabdullah/Desktop/Project Psychage V1/main_backend"
npm run dev
# ✓ Ready in ~2s
# Listening on http://localhost:3000
```

### 2. Start Frontend (Terminal 2)
```bash
cd "/Users/raiyanabdullah/Desktop/psychage-v2"
npm run dev
# Runs on http://localhost:5173
```

### 3. Open Browser
```
http://localhost:5173
```

## Environment Setup

### Frontend (.env) - Already Configured ✅
```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=https://ozourhqyqtpppvpbhphw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### Backend (.env.local) - Already Configured ✅
Located in: `/Users/raiyanabdullah/Desktop/Project Psychage V1/main_backend/.env.local`

## API Endpoints Available

**Backend serves these routes:**
- `/api/auth/*` - Authentication (login, signup, logout, etc.)
- `/api/mood/*` - Mood journal
- `/api/sleep/*` - Sleep tracker
- `/api/user/*` - User profile & settings
- `/api/providers/*` - Provider directory
- `/api/bookmarks/*` - Bookmarks
- `/api/admin/*` - Admin panel
- `/api/articles/*` - Articles
- `/api/clarity-score/*` - Clarity Score assessment

## Current Implementation Status

### ✅ Using Backend API (Hybrid Approach)
- **Auth**: Client-side Supabase auth (faster, better UX)
- **Mood/Sleep/Bookmarks**: Can use either backend API or direct Supabase
- **User Profile**: Can use either backend API or direct Supabase
- **Providers**: Can use either backend API or direct Supabase

### Architecture Notes
The V2 frontend has been refactored to work **both** with and without the backend:
- **With Backend**: Full validation, rate limiting, business logic
- **Without Backend**: Direct Supabase queries (simpler deployment)

Frontend services include fallback logic to handle both scenarios gracefully.

## Troubleshooting

### Backend won't start
```bash
cd "/Users/raiyanabdullah/Desktop/Project Psychage V1/main_backend"
rm -rf .next  # Clear cache
npm run dev
```

### Port 3000 already in use
```bash
lsof -ti:3000 | xargs kill -9
```

### Frontend can't connect to backend
Check `.env` file has:
```env
VITE_API_URL=http://localhost:3000
```

### CORS errors
Backend has CORS configured for `localhost:5173` - should work automatically

## Production Deployment

### Option A: Both Servers (Full Architecture)
1. Deploy backend to Vercel (main_backend folder)
2. Deploy frontend to Vercel (psychage-v2 folder)
3. Update `VITE_API_URL` in frontend to point to deployed backend

### Option B: Frontend Only (Simplified)
1. Deploy only frontend (psychage-v2 folder)
2. Uses direct Supabase queries (already implemented)
3. No backend server needed

## Testing

```bash
# Test backend is running
curl http://localhost:3000/api/health

# Should return:
# {"status":"healthy","version":"dev",...}
```

## Notes

- Backend requires `.env.local` to be configured
- Frontend requires `.env` to be configured
- Both already set up in your environment
- Just run `npm run dev` in each folder
