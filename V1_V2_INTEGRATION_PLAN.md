# Psychage V1-V2 Integration Plan

## ✅ INTEGRATION COMPLETE

**V1** (`/Desktop/Project Psychage V1/main_backend`) = Backend (Next.js API routes + Supabase)
**V2** (`/Desktop/psychage-v2`) = Frontend (Vite + React SPA)

This document outlines the complete integration between V1 backend and V2 frontend.

---

## Quick Start

### Running the Integration

1. **Start V1 Backend** (Terminal 1):
```bash
cd "/Users/raiyanabdullah/Desktop/Project Psychage V1/main_backend"
npm run dev
# Runs on http://localhost:3000
```

2. **Start V2 Frontend** (Terminal 2):
```bash
cd "/Users/raiyanabdullah/Desktop/psychage-v2"
npm run dev
# Runs on http://localhost:5173
```

3. Open `http://localhost:5173` in your browser

### Environment Configuration

**V2 `.env`** already configured:
```
VITE_API_URL=http://localhost:3000
```

**V1 `.env.local`** already configured:
```
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

---

## Completed Phases

### ✅ Phase 1: Standardize V2 Services
All V2 services now use the API client instead of direct Supabase calls:
- `src/services/moodService.ts` - Uses `api.mood.*`
- `src/services/sleepService.ts` - Uses `api.sleep.*`
- `src/services/bookmarkService.ts` - Uses `api.bookmarks.*`
- `src/services/activityService.ts` - Uses `api.activity.*`
- `src/services/toolService.ts` - Uses `api.tools.*`
- `src/services/symptomService.ts` - Uses `api.symptoms.*`
- `src/services/providerService.ts` - Uses `api.providers.*` and `api.admin.*`

### ✅ Phase 2: Fix V2 API Path Mismatches
All API paths in `src/lib/api.ts` aligned with V1 backend:
- `/api/provider/*` → `/api/providers/*`
- `/api/auth/change-password` → `/api/user/password`
- `/api/upload/avatar` → `/api/user/photo`

### ✅ Phase 3: Build V1 Admin Endpoints
Created admin dashboard API routes:
- `app/api/admin/stats/route.ts` - Dashboard statistics
- `app/api/admin/activity/route.ts` - Recent admin activity
- `app/api/admin/providers/route.ts` - Provider list with filtering
- `app/api/admin/providers/[id]/status/route.ts` - Update provider status
- `app/api/admin/audit-logs/route.ts` - System audit logs
- `app/api/admin/reports/route.ts` - Reports by type

### ✅ Phase 4: Build V1 Provider Dashboard Endpoints
Created provider-specific dashboard API routes:
- `app/api/providers/activity/route.ts` - Provider activity feed
- `app/api/providers/analytics/route.ts` - Analytics with chart data
- `app/api/providers/patients/route.ts` - Patient list (from contacts)
- `app/api/providers/appointments/route.ts` - Appointments (placeholder)
- `app/api/providers/availability/route.ts` - Availability settings

### ✅ Phase 5: Build V1 User Endpoints
Created user profile and activity endpoints:
- `app/api/user/profile/route.ts` - GET/PUT user profile
- `app/api/user/activity/route.ts` - GET activity, POST log activity
- `app/api/user/activity/stats/route.ts` - Activity statistics
- `app/api/auth/reset-password/confirm/route.ts` - Password reset confirmation
- `app/api/bookmarks/route.ts` - GET/POST/DELETE bookmarks
- `app/api/bookmarks/toggle/route.ts` - Toggle bookmark
- `app/api/bookmarks/check/route.ts` - Check bookmark status

### ✅ Phase 6: TypeScript Fixes
Fixed all TypeScript errors in both V1 and V2:
- V1 passes `npm run type-check`
- V2 passes `npx tsc --noEmit`

---

## API Endpoints Summary

### Authentication
| Endpoint | Method | Status |
|----------|--------|--------|
| `/api/auth/login` | POST | ✅ |
| `/api/auth/signup` | POST | ✅ |
| `/api/auth/logout` | POST | ✅ |
| `/api/auth/me` | GET | ✅ |
| `/api/auth/refresh` | POST | ✅ |
| `/api/auth/reset-password/confirm` | POST | ✅ NEW |

### User Management
| Endpoint | Method | Status |
|----------|--------|--------|
| `/api/user/profile` | GET/PUT | ✅ NEW |
| `/api/user/activity` | GET/POST | ✅ NEW |
| `/api/user/activity/stats` | GET | ✅ NEW |
| `/api/user/password` | POST | ✅ |
| `/api/user/photo` | POST | ✅ |

### Admin Dashboard
| Endpoint | Method | Status |
|----------|--------|--------|
| `/api/admin/stats` | GET | ✅ NEW |
| `/api/admin/activity` | GET | ✅ NEW |
| `/api/admin/providers` | GET | ✅ NEW |
| `/api/admin/providers/{id}/status` | POST | ✅ NEW |
| `/api/admin/audit-logs` | GET | ✅ NEW |
| `/api/admin/reports` | GET | ✅ NEW |

### Provider Dashboard
| Endpoint | Method | Status |
|----------|--------|--------|
| `/api/providers/dashboard` | GET | ✅ |
| `/api/providers/profile` | GET/PUT | ✅ |
| `/api/providers/activity` | GET | ✅ NEW |
| `/api/providers/analytics` | GET | ✅ NEW |
| `/api/providers/patients` | GET | ✅ NEW |
| `/api/providers/appointments` | GET | ✅ NEW |
| `/api/providers/availability` | GET/PUT | ✅ NEW |

### Provider Directory
| Endpoint | Method | Status |
|----------|--------|--------|
| `/api/providers` | GET | ✅ |
| `/api/providers/{id}` | GET | ✅ |
| `/api/providers/{id}/view` | POST | ✅ |
| `/api/providers/favorites` | GET/POST | ✅ |

### Tools & Tracking
| Endpoint | Method | Status |
|----------|--------|--------|
| `/api/mood` | GET/POST | ✅ |
| `/api/sleep` | GET/POST | ✅ |
| `/api/sleep/{id}` | PUT/DELETE | ✅ |
| `/api/clarity-score` | GET/POST | ✅ |
| `/api/bookmarks` | GET/POST/DELETE | ✅ NEW |
| `/api/bookmarks/toggle` | POST | ✅ NEW |
| `/api/bookmarks/check` | GET | ✅ NEW |

### Content
| Endpoint | Method | Status |
|----------|--------|--------|
| `/api/articles` | GET | ✅ |
| `/api/assessment/questions` | GET | ✅ |

---

## Testing Checklist

### Authentication Flow
- [ ] Login works from V2 → V1
- [ ] Signup creates user in V1 database
- [ ] Token refresh works
- [ ] Logout clears session

### Patient Dashboard
- [ ] User dashboard loads stats
- [ ] Profile settings load/save
- [ ] Activity history shows
- [ ] Bookmarks work

### Provider Dashboard
- [ ] Provider dashboard loads stats
- [ ] Analytics page shows data
- [ ] Patient list loads
- [ ] Profile editor saves changes

### Admin Dashboard
- [ ] Admin stats load
- [ ] Provider management works
- [ ] Audit logs display
- [ ] Reports generate

### Tools
- [ ] Mood journal saves entries
- [ ] Sleep tracker saves entries
- [ ] Clarity score submits and shows history

### Public Pages
- [ ] Provider directory loads
- [ ] Article listing works
- [ ] Search works

---

## Architecture Notes

### Data Flow
```
V2 Frontend (Vite/React)
    ↓
api.ts (API client with auth tokens)
    ↓
V1 Backend (Next.js API Routes)
    ↓
Supabase (PostgreSQL + Auth)
```

### Authentication
- V2 stores tokens in localStorage (`psychage_access_token`, `psychage_refresh_token`)
- V1 validates Bearer tokens via Supabase
- Token refresh happens automatically on 401 responses

### CORS
- V1 allows origins from `FRONTEND_URL` and `ALLOWED_ORIGINS` env vars
- Development mode automatically allows localhost origins

---

## Known Limitations

1. **Mood Tracking**: V1 uses `mood_rating` (1-5) + `entry_date`, V2 expects `value` + `created_at`. Mapping is done in `moodService.ts`.

2. **Appointments**: The appointments endpoint is a placeholder - a full scheduling system would need additional implementation.

3. **Provider Patients**: Currently derives patients from contact clicks. A proper patient-provider relationship system would require additional tables.

4. **Analytics**: Some analytics data (like top locations) uses placeholder values. Full analytics would need view tracking with location data.

---

## Files Created/Modified

### V1 New Files (24 files)
- `app/api/admin/stats/route.ts`
- `app/api/admin/activity/route.ts`
- `app/api/admin/providers/route.ts`
- `app/api/admin/providers/[id]/status/route.ts`
- `app/api/admin/audit-logs/route.ts`
- `app/api/admin/reports/route.ts`
- `app/api/providers/activity/route.ts`
- `app/api/providers/analytics/route.ts`
- `app/api/providers/patients/route.ts`
- `app/api/providers/appointments/route.ts`
- `app/api/providers/availability/route.ts`
- `app/api/user/profile/route.ts`
- `app/api/user/activity/route.ts`
- `app/api/user/activity/stats/route.ts`
- `app/api/auth/reset-password/confirm/route.ts`
- `app/api/bookmarks/route.ts`
- `app/api/bookmarks/toggle/route.ts`
- `app/api/bookmarks/check/route.ts`

### V2 Modified Files
- `src/lib/api.ts` - Extended with all endpoint groups
- `src/services/moodService.ts` - Now uses API
- `src/services/sleepService.ts` - Now uses API
- `src/services/bookmarkService.ts` - Now uses API
- `src/services/activityService.ts` - Now uses API
- `src/services/toolService.ts` - Now uses API
- `src/services/symptomService.ts` - Now uses API
- `src/services/providerService.ts` - Now uses API
