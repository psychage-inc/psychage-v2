# API Endpoint Status

This document tracks the connectivity status of all API endpoints used by the Psychage frontend.

## Configuration

- **Base URL (Dev)**: `http://localhost:3000`
- **Base URL (Production)**: `https://psychage-backend.vercel.app`
- **Auth Method**: Bearer token (JWT)

---

## Endpoint Categories

### Authentication (`/api/auth/*`)

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/api/auth/login` | POST | Implemented | Returns tokens + user |
| `/api/auth/signup` | POST | Implemented | Creates user account |
| `/api/auth/logout` | POST | Implemented | Clears session |
| `/api/auth/me` | GET | Implemented | Returns current user |
| `/api/auth/refresh` | POST | Implemented | Refreshes access token |
| `/api/auth/reset-password/confirm` | POST | Implemented | Confirms password reset |

### Providers (`/api/providers/*`)

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/api/providers` | GET | Implemented | List all providers |
| `/api/providers/:id` | GET | Implemented | Get provider by ID |
| `/api/providers?specializations=true` | GET | Implemented | Get specializations list |
| `/api/providers?insurance=true` | GET | Implemented | Get insurance providers |
| `/api/providers/:id/view` | POST | Implemented | Track profile view |
| `/api/providers/favorites` | GET/POST | Implemented | Get/toggle favorites |
| `/api/providers/profile/submit` | POST | Implemented | Provider registration |

### Provider Dashboard (`/api/providers/*`)

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/api/providers/dashboard` | GET | Implemented | Provider stats |
| `/api/providers/activity` | GET | Implemented | Provider activity feed |
| `/api/providers/analytics` | GET | Implemented | Analytics data |
| `/api/providers/patients` | GET | Implemented | Patient list |
| `/api/providers/appointments` | GET | Implemented | Appointments |
| `/api/providers/profile` | GET/PUT | Implemented | Profile CRUD |
| `/api/providers/availability` | PUT | Implemented | Update availability |

### Articles (`/api/articles/*`)

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/api/articles` | GET | Implemented | List articles (with Sanity fallback) |
| `/api/articles/:id` | GET | Implemented | Get article by ID |
| `/api/articles/:id/bookmark` | POST | Implemented | Bookmark article |
| `/api/articles/bookmarks` | GET | Implemented | Get bookmarked articles |

### Clarity Score (`/api/clarity-score/*`)

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/api/clarity-score` | GET | Implemented | Get score history |
| `/api/clarity-score` | POST | Implemented | Save assessment |
| `/api/clarity-score/stats` | GET | Implemented | Get statistics |

### User (`/api/user/*`)

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/api/user/profile` | GET | Implemented | Get user profile |
| `/api/user/profile` | PUT | Implemented | Update profile |
| `/api/user/activity` | GET | Implemented | Get user activity |
| `/api/user/password` | POST | Implemented | Change password |
| `/api/user/photo` | POST | Implemented | Upload avatar (FormData) |

### Mood Tracking (`/api/mood/*`)

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/api/mood` | GET | Implemented | Get mood entries |
| `/api/mood` | POST | Implemented | Create mood entry |

### Sleep Tracking (`/api/sleep/*`)

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/api/sleep` | GET | Implemented | Get sleep entries |
| `/api/sleep` | POST | Implemented | Create sleep entry |
| `/api/sleep/:id` | PUT | Implemented | Update sleep entry |
| `/api/sleep/:id` | DELETE | Implemented | Delete sleep entry |
| `/api/sleep/averages` | GET | Implemented | Get averages |
| `/api/sleep/stats` | GET | Implemented | Get statistics |

### Tools (`/api/tools/*`)

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/api/tools` | GET | Implemented | List all tools |
| `/api/tools/:id` | GET | Implemented | Get tool by ID |
| `/api/tools?category=X` | GET | Implemented | Filter by category |

### Symptoms (`/api/symptoms/*`)

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/api/symptoms` | GET | Implemented | List symptoms |
| `/api/symptoms/check` | POST | Implemented | Check symptoms |
| `/api/conditions` | GET | Implemented | List conditions |
| `/api/crisis-resources` | GET | Implemented | Get crisis resources |

### Bookmarks (`/api/bookmarks/*`)

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/api/bookmarks` | GET | Implemented | Get all bookmarks |
| `/api/bookmarks?type=X` | GET | Implemented | Filter by type |
| `/api/bookmarks` | POST | Implemented | Add bookmark |
| `/api/bookmarks?type=X&id=Y` | DELETE | Implemented | Remove bookmark |
| `/api/bookmarks/toggle` | POST | Implemented | Toggle bookmark |
| `/api/bookmarks/check` | GET | Implemented | Check if bookmarked |

### Admin (`/api/admin/*`)

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/api/admin/stats` | GET | Implemented | Admin dashboard stats |
| `/api/admin/activity` | GET | Implemented | Recent admin activity |
| `/api/admin/providers` | GET | Implemented | List providers for admin |
| `/api/admin/providers/:id/status` | POST | Implemented | Update provider status |
| `/api/admin/audit-logs` | GET | Implemented | Get audit logs |
| `/api/admin/reports` | GET | Implemented | Generate reports |

### Assessment (`/api/assessment/*`)

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| `/api/assessment/questions` | GET | Implemented | Get assessment questions |

---

## Fallback Strategy

The frontend implements fallback strategies for when the backend is unavailable:

1. **Articles**: Falls back to Sanity CMS direct queries
2. **Providers**: Falls back to mock data from `src/data/providers.ts`
3. **Tools**: Falls back to mock data from `src/data/tools.ts`
4. **Contact Form**: Queues submissions in localStorage for later sync
5. **Reviews**: Queues locally when API unavailable

---

## Testing API Connectivity

To verify API connectivity, run:

```bash
# Check if backend is running
curl https://psychage-backend.vercel.app/api/health

# Test auth endpoint
curl -X POST https://psychage-backend.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass"}'

# Test public endpoints
curl https://psychage-backend.vercel.app/api/providers
curl https://psychage-backend.vercel.app/api/tools
```

---

## Known Issues

1. None currently identified - all endpoints have implementations with fallbacks.

---

## Last Updated

February 2026
