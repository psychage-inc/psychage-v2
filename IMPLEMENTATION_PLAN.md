# Psychage v2 - Missing Pages Implementation Plan

## Overview

This plan covers wiring up **16 existing but unrouted pages** and implementing any missing functionality. All pages are already built - they just need to be connected to the router and have their backend integration completed.

---

## Phase 1: Router & Route Guards Setup

### 1.1 Create Protected Route Components

**File**: `src/components/auth/ProtectedRoute.tsx`

**Requirements**:
- Wrap routes that require authentication
- Check `isAuthenticated` from AuthContext
- Redirect to `/login` if not authenticated
- Show loading state while checking auth status
- Store intended destination for redirect after login

**File**: `src/components/auth/RoleGuard.tsx`

**Requirements**:
- Wrap routes that require specific roles (admin, provider, patient)
- Check `user.role` from AuthContext
- Redirect to appropriate dashboard if wrong role
- Show "Access Denied" for unauthorized access attempts

### 1.2 Update App.tsx Router

**File**: `src/App.tsx`

**Add lazy imports for**:
```
- LoginPage, SignUpPage, ResetPasswordPage, UpdatePasswordPage
- UserDashboard, ProfileSettings, BookmarksPage, UserAssessmentHistory
- AdminDashboard, ProviderManagement, AuditLogPage, ReportsPage
- ProviderDashboard, ProviderProfileEditor, ProviderAnalytics, ProviderPatients
- ProviderRegistrationPage
```

**Add routes**:
```
/login                    → LoginPage (public)
/signup                   → SignUpPage (public)
/reset-password           → ResetPasswordPage (public)
/update-password          → UpdatePasswordPage (public)

/dashboard                → UserDashboard (protected: patient)
/dashboard/profile        → ProfileSettings (protected: patient)
/dashboard/bookmarks      → BookmarksPage (protected: patient)
/dashboard/assessments    → UserAssessmentHistory (protected: patient)

/admin                    → AdminDashboard (protected: admin)
/admin/providers          → ProviderManagement (protected: admin)
/admin/audit              → AuditLogPage (protected: admin)
/admin/reports            → ReportsPage (protected: admin)

/provider                 → ProviderDashboard (protected: provider)
/provider/profile         → ProviderProfileEditor (protected: provider)
/provider/analytics       → ProviderAnalytics (protected: provider)
/provider/patients        → ProviderPatients (protected: provider)

/providers/register       → ProviderRegistrationPage (public)
```

---

## Phase 2: Authentication Pages

### 2.1 LoginPage (`src/pages/auth/LoginPage.tsx`)

**Current State**: Page exists, needs backend wiring

**Requirements**:
- Form fields: email, password
- "Remember me" checkbox (persist token)
- "Forgot password?" link → `/reset-password`
- "Create account" link → `/signup`
- Call `AuthContext.login(email, password)`
- Handle errors: invalid credentials, account locked, unverified email
- On success: redirect to role-based dashboard (`/dashboard`, `/provider`, `/admin`)
- Show loading state during submission

### 2.2 SignUpPage (`src/pages/auth/SignUpPage.tsx`)

**Current State**: Page exists, needs backend wiring

**Requirements**:
- Form fields: email, password, confirm password, display name (optional)
- Password requirements display (min 8 chars, etc.)
- Terms of service checkbox
- Call `AuthContext.signup(email, password, displayName)`
- Handle errors: email already exists, weak password
- On success: show "Check your email" message or auto-login
- "Already have account?" link → `/login`

### 2.3 ResetPasswordPage (`src/pages/auth/ResetPasswordPage.tsx`)

**Current State**: Page exists, needs backend wiring

**Requirements**:
- Form field: email
- Call `AuthContext.requestPasswordReset(email)`
- Show success message: "Check your email for reset link"
- Handle errors: email not found
- "Back to login" link → `/login`

### 2.4 UpdatePasswordPage (`src/pages/auth/UpdatePasswordPage.tsx`)

**Current State**: Page exists, needs backend wiring

**Requirements**:
- Read reset token from URL query params
- Form fields: new password, confirm password
- Call API endpoint to update password with token
- Handle errors: invalid/expired token, weak password
- On success: redirect to `/login` with success message

---

## Phase 3: User Dashboard Pages

### 3.1 UserDashboard (`src/pages/dashboard/UserDashboard.tsx`)

**Current State**: Page exists with mock data

**Requirements**:
- Fetch user data from `AuthContext.user`
- Display sections:
  - **Clarity Score Card**: Fetch latest from `/api/clarity-score`, show score, date, trend
  - **Recent Activity**: Fetch from `/api/user/activity` (articles read, assessments taken)
  - **Quick Actions**: Links to tools, assessments, bookmarks
  - **Mood Trend**: Fetch from `/api/mood` (last 7 days)
  - **Sleep Stats**: Fetch from `/api/sleep/averages`
- Use `UserSidebar` for navigation
- Handle empty states (no data yet)

### 3.2 ProfileSettings (`src/pages/dashboard/ProfileSettings.tsx`)

**Current State**: Page exists with static form

**Requirements**:
- Fetch current profile from `AuthContext.user`
- Form fields: display name, email (readonly), location, bio
- Avatar upload:
  - Preview before upload
  - Call upload endpoint
  - Update user state after success
- Password change section:
  - Current password, new password, confirm
  - Call `/api/auth/change-password`
- Notification preferences toggles
- Save button calls `/api/user/profile` PUT
- Show success/error toasts

### 3.3 BookmarksPage (`src/pages/dashboard/BookmarksPage.tsx`)

**Current State**: Page exists, needs service integration

**Requirements**:
- Fetch bookmarked articles from `articleService.getBookmarks()`
- Fetch favorited providers from `providerService.getFavorites()`
- Tab navigation: "Articles" | "Providers"
- Display as card grid (reuse existing ArticleCard, ProviderCard)
- Remove bookmark/favorite inline with confirmation
- Empty state: "No bookmarks yet" with CTA to browse
- Search/filter within bookmarks

### 3.4 UserAssessmentHistory (`src/pages/dashboard/UserAssessmentHistory.tsx`)

**Current State**: Page exists, needs service integration

**Requirements**:
- Fetch assessment history from `/api/clarity-score` (all entries)
- Display as timeline/list with:
  - Date taken
  - Overall score
  - Dimension breakdown (anxiety, mood, stress, sleep)
  - Trend indicator (up/down from previous)
- Click to expand: show full results, recommendations
- Chart visualization of score over time
- "Take New Assessment" CTA → `/clarity-score`

---

## Phase 4: Admin Dashboard Pages

### 4.1 AdminDashboard (`src/pages/admin/AdminDashboard.tsx`)

**Current State**: Page exists with mock stats

**Requirements**:
- Fetch stats from admin endpoints:
  - Total users count: `/api/admin/stats/users`
  - Pending provider applications: `/api/admin/providers/pending`
  - System health/alerts: `/api/admin/health`
  - Active sessions: `/api/admin/stats/sessions`
- Display stat cards with numbers and trends
- Recent activity feed: `/api/admin/activity`
- Quick action buttons: Approve providers, View reports, System settings
- Alerts section for system issues

### 4.2 ProviderManagement (`src/pages/admin/ProviderManagement.tsx`)

**Current State**: Page exists, needs full implementation

**Requirements**:
- Fetch providers list with filters: `/api/admin/providers`
- Filters: status (pending, approved, rejected), specialty, search
- Table columns: Name, Email, Specialty, Status, Submitted Date, Actions
- Actions per row:
  - View details (modal or navigate to detail page)
  - Approve (with confirmation)
  - Reject (with reason input)
  - Suspend/Unsuspend
- Bulk actions: Select multiple, bulk approve/reject
- Pagination

### 4.3 AuditLogPage (`src/pages/admin/AuditLogPage.tsx`)

**Current State**: Page exists, needs implementation

**Requirements**:
- Fetch audit logs: `/api/admin/audit`
- Filters: date range, action type, user, severity
- Table columns: Timestamp, User, Action, Resource, IP Address, Details
- Click row to expand full details
- Export to CSV functionality
- Pagination with configurable page size

### 4.4 ReportsPage (`src/pages/admin/ReportsPage.tsx`)

**Current State**: Page exists, needs implementation

**Requirements**:
- Report types:
  - User growth (signups over time)
  - Content engagement (article views, tool usage)
  - Provider metrics (views, favorites, reviews)
  - Assessment completions
- Date range selector
- Chart visualizations (line, bar charts)
- Export reports as PDF/CSV
- Schedule automated reports (future feature flag)

---

## Phase 5: Provider Dashboard Pages

### 5.1 ProviderDashboard (`src/pages/provider/ProviderDashboard.tsx`)

**Current State**: Page exists with mock data

**Requirements**:
- Fetch provider profile from `/api/providers/me`
- Display sections:
  - **Stats Cards**: Profile views, Favorites count, Review average, Total reviews
  - **Recent Activity**: New favorites, new reviews, profile views
  - **Quick Actions**: Edit profile, View analytics, Respond to reviews
- Profile completeness indicator (% complete)
- Alerts: Incomplete profile fields, pending reviews to respond

### 5.2 ProviderProfileEditor (`src/pages/provider/ProviderProfileEditor.tsx`)

**Current State**: Page exists, needs form integration

**Requirements**:
- Fetch current profile: `/api/providers/me`
- Form sections:
  - **Basic Info**: Name, title/role, bio, years experience
  - **Photo**: Upload/change profile photo
  - **Specialties**: Multi-select from available specialties
  - **Insurance**: Multi-select insurance providers accepted
  - **Location**: Address, city, state, zip
  - **Availability**: Days/hours available, video visit option
  - **Education**: Add/remove education entries
  - **Languages**: Multi-select languages spoken
  - **Approach**: Text field for treatment approach
- Auto-save or explicit save button
- Validation: required fields, format checks
- Preview mode: see profile as patients see it

### 5.3 ProviderAnalytics (`src/pages/provider/ProviderAnalytics.tsx`)

**Current State**: Page exists, needs implementation

**Requirements**:
- Fetch analytics: `/api/providers/me/analytics`
- Metrics:
  - Profile views over time (chart)
  - Search appearances
  - Favorites added/removed
  - Review ratings distribution
  - Click-through rate (profile view → contact)
- Date range selector (7d, 30d, 90d, custom)
- Comparison to previous period
- Export data option

### 5.4 ProviderPatients (`src/pages/provider/ProviderPatients.tsx`)

**Current State**: Page exists, needs implementation

**Requirements**:
- Fetch connected patients: `/api/providers/me/patients`
- List view with: Name, Last activity, Status
- Search patients by name
- Click to view patient details (limited info based on permissions)
- Note: This may be a future feature - implement as "Coming Soon" if no backend
- Connection request management (if applicable)

---

## Phase 6: Provider Registration

### 6.1 ProviderRegistrationPage (`src/pages/connect/ProviderRegistrationPage.tsx`)

**Current State**: Page exists, needs full form implementation

**Requirements**:
- Multi-step form wizard:
  1. **Account**: Email, password, confirm password
  2. **Personal**: Name, title, years experience
  3. **Professional**: Specialties, license number, NPI (if applicable)
  4. **Practice**: Location, insurance accepted, availability
  5. **Verification**: Upload credentials, license documents
  6. **Review**: Summary of all info before submit
- Progress indicator showing current step
- Save draft functionality (localStorage or API)
- Validation per step before proceeding
- Submit creates pending provider application
- Success: "Application submitted, pending review" message
- Terms of service agreement checkbox

---

## Phase 7: Navigation Updates

### 7.1 Header Navigation

**File**: `src/components/layout/Navigation.tsx`

**Requirements**:
- Show different nav items based on auth state:
  - **Logged out**: Login, Sign Up buttons
  - **Logged in (patient)**: Dashboard link, Profile dropdown (Settings, Bookmarks, Logout)
  - **Logged in (provider)**: Provider Dashboard link, similar dropdown
  - **Logged in (admin)**: Admin Dashboard link
- Mobile menu updates to include auth items

### 7.2 Footer Updates

**File**: `src/components/layout/Footer.tsx`

**Requirements**:
- Add "For Providers" section with registration link
- Update links based on auth state

### 7.3 Sidebar Components

**Files**: `UserSidebar.tsx`, `ProviderSidebar.tsx`, `AdminSidebar.tsx`

**Requirements**:
- Consistent sidebar pattern across dashboards
- Active state highlighting for current route
- Collapsible on mobile
- User info display at top (avatar, name, role)
- Logout button at bottom

---

## Phase 8: API Endpoints Needed

### New Backend Endpoints Required

```
# User
GET    /api/user/activity          - Recent user activity
PUT    /api/user/profile           - Update profile
POST   /api/auth/change-password   - Change password

# Admin
GET    /api/admin/stats/users      - User statistics
GET    /api/admin/stats/sessions   - Active sessions
GET    /api/admin/providers        - All providers (admin view)
GET    /api/admin/providers/pending - Pending applications
POST   /api/admin/providers/:id/approve
POST   /api/admin/providers/:id/reject
GET    /api/admin/audit            - Audit logs
GET    /api/admin/health           - System health
GET    /api/admin/activity         - Admin activity feed

# Provider (authenticated as provider)
GET    /api/providers/me           - Current provider profile
PUT    /api/providers/me           - Update own profile
GET    /api/providers/me/analytics - Provider analytics
GET    /api/providers/me/patients  - Connected patients
POST   /api/providers/register     - Submit registration

# File uploads
POST   /api/upload/avatar          - User avatar
POST   /api/upload/credentials     - Provider credentials
```

---

## Implementation Order

**Recommended sequence** (Provider features are HIGH PRIORITY):

1. **Phase 1**: Router & Guards (foundation for everything)
2. **Phase 8**: Backend API endpoints (build alongside frontend)
3. **Phase 2**: Auth pages (enables login/signup)
4. **Phase 7.1**: Navigation updates (shows auth UI)
5. **Phase 6**: Provider registration (HIGH PRIORITY - allows new providers)
6. **Phase 5**: Provider dashboard (HIGH PRIORITY - provider experience)
7. **Phase 3**: User dashboard (patient experience)
8. **Phase 4**: Admin dashboard (management tools)

**Note**: No mock data fallbacks - each page requires real backend integration before being functional.

---

## File Structure Summary

```
src/
├── components/
│   └── auth/
│       ├── ProtectedRoute.tsx    [CREATE]
│       └── RoleGuard.tsx         [CREATE]
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx         [UPDATE - wire backend]
│   │   ├── SignUpPage.tsx        [UPDATE - wire backend]
│   │   ├── ResetPasswordPage.tsx [UPDATE - wire backend]
│   │   └── UpdatePasswordPage.tsx[UPDATE - wire backend]
│   ├── dashboard/
│   │   ├── UserDashboard.tsx     [UPDATE - wire backend]
│   │   ├── ProfileSettings.tsx   [UPDATE - wire backend]
│   │   ├── BookmarksPage.tsx     [UPDATE - wire backend]
│   │   └── UserAssessmentHistory.tsx [UPDATE - wire backend]
│   ├── admin/
│   │   ├── AdminDashboard.tsx    [UPDATE - wire backend]
│   │   ├── ProviderManagement.tsx[UPDATE - full implementation]
│   │   ├── AuditLogPage.tsx      [UPDATE - full implementation]
│   │   └── ReportsPage.tsx       [UPDATE - full implementation]
│   ├── provider/
│   │   ├── ProviderDashboard.tsx [UPDATE - wire backend]
│   │   ├── ProviderProfileEditor.tsx [UPDATE - form integration]
│   │   ├── ProviderAnalytics.tsx [UPDATE - full implementation]
│   │   └── ProviderPatients.tsx  [UPDATE - implementation]
│   └── connect/
│       └── ProviderRegistrationPage.tsx [UPDATE - multi-step form]
├── App.tsx                        [UPDATE - add routes]
└── components/layout/
    └── Navigation.tsx             [UPDATE - auth nav items]
```

---

## Testing Checklist

Per page, verify:
- [ ] Route accessible at correct path
- [ ] Protected routes redirect when not authenticated
- [ ] Role-based routes redirect wrong roles
- [ ] Loading states display correctly
- [ ] Error states handled gracefully
- [ ] Forms validate input
- [ ] API calls succeed/fail gracefully
- [ ] Success/error toasts appear
- [ ] Navigation between pages works
- [ ] Mobile responsive layout
- [ ] Dark mode support

---

## Backend Endpoints Required (For Your Backend Team)

The frontend is now complete, but requires these backend API endpoints to function. These should be implemented in your Node.js/Express backend or equivalent.

### Authentication Endpoints (Likely Already Implemented)
```
POST   /api/auth/login              - Login with email/password, return tokens
POST   /api/auth/signup             - Create new user account
POST   /api/auth/logout             - Logout and invalidate tokens
GET    /api/auth/me                 - Get current authenticated user
POST   /api/auth/refresh            - Refresh access token
POST   /api/auth/reset-password     - Request password reset email
POST   /api/auth/reset-password/confirm - Confirm password reset with token
POST   /api/auth/change-password    - Change password (authenticated)
```

### User Endpoints
```
GET    /api/user/profile            - Get user profile (includes location field)
PUT    /api/user/profile            - Update profile (display_name, location)
GET    /api/user/activity           - Get user's recent activity
POST   /api/upload/avatar           - Upload user avatar (multipart/form-data)
```

### Provider Dashboard Endpoints (for logged-in providers)
```
GET    /api/provider/stats          - Get provider stats (activePatients, pendingRequests, views, profileCompleteness)
GET    /api/provider/activity       - Get provider's recent activity feed
GET    /api/provider/profile        - Get provider's own profile
PUT    /api/provider/profile        - Update provider profile
GET    /api/provider/patients       - Get provider's connected patients
                                      Query params: search, page, limit
GET    /api/provider/appointments   - Get provider's appointments
                                      Query params: start, end
PUT    /api/provider/availability   - Update availability schedule
GET    /api/provider/analytics      - Get provider analytics data
                                      Query params: range (7d, 30d, 90d, all)
                                      Returns: {
                                        profileViews: number[],
                                        viewLabels: string[],
                                        totalViews: number,
                                        viewsChange: number,
                                        conversionRate: number,
                                        conversionChange: number,
                                        profileCompleteness: number,
                                        topLocations: { location: string, percentage: number }[]
                                      }
```

### Provider Directory (public)
```
GET    /api/providers               - List all providers
                                      Query params: state, specialization, insurance, page, limit
GET    /api/providers/:id           - Get provider by ID
POST   /api/providers/:id/view      - Track provider profile view
POST   /api/providers/favorites     - Toggle favorite (body: { providerId })
GET    /api/providers/favorites     - Get user's favorite providers
POST   /api/providers/register      - Submit provider registration application
```

### Admin Endpoints
```
GET    /api/admin/stats             - Get admin dashboard stats
                                      Returns: { totalUsers, pendingProviders, systemAlerts, activeSessions }
GET    /api/admin/activity          - Get admin activity feed
GET    /api/admin/providers         - List all providers (admin view)
                                      Query params: status (pending, active, suspended, rejected), page, limit
POST   /api/admin/providers/:id/status - Update provider status
                                      Body: { status: 'active' | 'suspended' | 'rejected' }
GET    /api/admin/audit-logs        - Get audit logs
                                      Query params: page, limit
GET    /api/admin/reports           - Get reports data
                                      Query params: type (all, content, user, system)
```

### Clarity Score / Assessment
```
GET    /api/assessment/questions    - Get assessment questions
POST   /api/clarity-score           - Submit assessment answers
GET    /api/clarity-score           - Get user's assessment history
GET    /api/clarity-score/stats     - Get user's clarity score stats
```

### Articles
```
GET    /api/articles                - List articles
                                      Query params: category, page, limit
GET    /api/articles/:id            - Get article by ID
POST   /api/articles/:id/bookmark   - Toggle bookmark
GET    /api/articles/bookmarks      - Get user's bookmarked articles
```

### Mood & Sleep Tracking
```
GET    /api/mood                    - Get mood entries
POST   /api/mood                    - Create mood entry
GET    /api/sleep                   - Get sleep entries
POST   /api/sleep                   - Create sleep entry
GET    /api/sleep/averages          - Get sleep averages
```

---

## Database Schema Requirements

### Users Table (extend if needed)
```sql
ALTER TABLE users ADD COLUMN location VARCHAR(255);
```

### Provider Analytics Table (new)
```sql
CREATE TABLE provider_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES providers(id),
  date DATE NOT NULL,
  views INT DEFAULT 0,
  favorites_added INT DEFAULT 0,
  favorites_removed INT DEFAULT 0,
  contact_clicks INT DEFAULT 0,
  viewer_location VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Audit Logs Table (new)
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  resource_type VARCHAR(100),
  resource_id UUID,
  details JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);
```
