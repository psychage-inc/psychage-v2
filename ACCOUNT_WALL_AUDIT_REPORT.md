# Account Wall Audit Report

**Date**: 2026-03-14
**Scope**: Full authentication boundary audit of Psychage v2
**Principle**: The login wall = the data persistence boundary. Client-side-only features stay free. Features that write personal data to Supabase require authentication.

---

## 1. Auth Infrastructure

### 1.1 Supabase Client

- **File**: `src/lib/supabaseClient.ts`
- **Pattern**: `createClient()` from `@supabase/supabase-js` (NOT `@supabase/ssr`)
- **Env vars**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (Vite prefix, correct)
- **Auth options**: Default (autoRefreshToken: true, persistSession: true, detectSessionInUrl: true — all implicit)
- **Status**: CORRECT

### 1.2 Auth Context/Provider

- **Files**: `src/context/AuthContextDefinition.ts`, `src/context/AuthContext.tsx`
- **Wraps app**: `src/index.tsx:37`
- **Exposes**: `user`, `isAuthenticated`, `isLoading`, `login`, `signup`, `logout`, `refreshUser`, `requestPasswordReset`, `signInWithGoogle`, `signInWithApple`, `deleteAccount`
- **Listeners**: `onAuthStateChange` subscription (lines 52-65)
- **Session hydration**: `supabase.auth.getSession()` on mount (line 38)
- **User mapping**: Maps Supabase user to app `User` type with `id`, `email`, `role`, `display_name`, `avatar_url`
- **Status**: CORRECT — complete and functional

### 1.3 Auth Pages

| Page | File | Functional | Supabase Methods | redirectTo Support |
|---|---|---|---|---|
| Login | `src/pages/auth/LoginPage.tsx` | YES | `signInWithPassword`, `signInWithOAuth` | Via `location.state?.from` only |
| Signup | `src/pages/auth/SignUpPage.tsx` | YES | `signUp` with metadata | Navigates to `/login` on success |
| Auth Callback | `src/pages/auth/AuthCallback.tsx` | YES | `getSession` | Role-based redirect |
| Reset Password | `src/pages/auth/ResetPasswordPage.tsx` | YES | `resetPasswordForEmail` | N/A |
| Update Password | `src/pages/auth/UpdatePasswordPage.tsx` | YES | `updateUser` | N/A |

### 1.4 Session Persistence

- Supabase client uses default localStorage persistence
- Session auto-refreshes via Supabase client
- `onAuthStateChange` listener updates React state on auth events
- **Status**: CORRECT

### 1.5 Logout

- **Implementation**: `AuthContext.logout()` calls `supabase.auth.signOut()` then clears React state
- **UI triggers**: Navigation.tsx, MobileMenu.tsx, AdminTopBar.tsx, AdminSidebar.tsx, ProviderSidebar.tsx, PrivacySettings.tsx
- **Status**: CORRECT

---

## 2. Route Protection

### 2.1 Auth Guard Components

| Component | File | Purpose |
|---|---|---|
| `ProtectedRoute` | `src/components/auth/ProtectedRoute.tsx` | Page-level auth check → redirect to `/login` |
| `RoleGuard` | `src/components/auth/RoleGuard.tsx` | Role-based access (patient/provider/admin) |
| `AuthGate` | `src/components/auth/AuthGate.tsx` | Inline feature gating (no redirect, preserves page) |
| `AuthModal` | `src/components/auth/AuthModal.tsx` | In-page login/signup/reset modal |
| `TierGuard` | `src/components/auth/TierGuard.tsx` | Subscription tier enforcement |
| `useAdminAuth` | `src/hooks/useAdminAuth.ts` | Admin-specific auth (checks `admin_roles` table) |

### 2.2 Protected Routes (CORRECT)

| Route | Protection |
|---|---|
| `/dashboard` | ProtectedRoute + RoleGuard(['patient', 'admin']) |
| `/dashboard/settings` | ProtectedRoute + RoleGuard(['patient', 'admin']) |
| `/dashboard/bookmarks` | ProtectedRoute + RoleGuard(['patient', 'admin']) |
| `/dashboard/privacy` | ProtectedRoute + RoleGuard(['patient', 'admin']) |
| `/dashboard/history` | ProtectedRoute + RoleGuard(['patient', 'admin']) |
| `/provider` | ProtectedRoute + RoleGuard(['provider', 'admin']) |
| `/provider/profile` | ProtectedRoute + RoleGuard(['provider', 'admin']) |
| `/provider/analytics` | ProtectedRoute + RoleGuard(['provider', 'admin']) |
| `/provider/patients` | ProtectedRoute + RoleGuard(['provider', 'admin']) |
| `/admin/onboarding` | ProtectedRoute + RoleGuard(['admin']) |

### 2.3 Public Routes (CORRECT)

| Route | Notes |
|---|---|
| `/` | Home page |
| `/learn`, `/learn/:categorySlug`, `/learn/article/:id` | Articles |
| `/watch/:id` | Videos |
| `/providers`, `/providers/search`, `/providers/:id` | Provider directory |
| `/for-providers`, `/for-providers/apply`, `/for-providers/claim` | Provider onboarding |
| `/tools` | Tools listing |
| `/tools/mood-journal` | Client-side + localStorage |
| `/tools/sleep-architect` | Client-side + localStorage |
| `/tools/thought-reframer` | Client-side + localStorage |
| `/tools/clarity-journal/*` (9 sub-routes) | Fully localStorage |
| `/tools/symptom-navigator` | Client-side only, ZERO server calls |
| `/clarity-score` | Client-side assessment |
| `/crisis` | Crisis resources — NO AUTH (P0 safety) |
| `/tools/symptom-navigator/crisis` | Crisis resources — NO AUTH |
| `/navigator/crisis` | Crisis resources — NO AUTH |
| `/about`, `/contact` | Static pages |
| `/legal/privacy`, `/legal/terms` | Legal pages |
| `/login`, `/signup`, `/reset-password`, `/update-password`, `/auth/callback` | Auth pages |

---

## 3. Component-Level Auth Gates

### 3.1 Clarity Score

- **Assessment**: Fully client-side, no auth required — CORRECT
- **Save to Dashboard**: Wrapped with `<AuthGate inline>` at `ClarityScoreTool.tsx:587-623` — CORRECT
- **Share/Save PDF**: Client-side export, no auth needed — CORRECT
- **History**: At `/dashboard/history`, protected by ProtectedRoute — CORRECT

### 3.2 Symptom Navigator

- **Engine**: `src/lib/navigator/engine.ts` — runs ENTIRELY client-side
- **Zero server calls**: Confirmed — no fetch/axios/HTTP calls for matching
- **Knowledge base**: Bundled/mocked, normalized client-side
- **Status**: CORRECT — no auth needed

### 3.3 Crisis Resources

- **P0 SAFETY CHECK**: PASSED
- `src/components/pages/CrisisPage.tsx` — ZERO auth imports, ZERO auth checks
- `src/components/screens/CrisisResourcesScreen.tsx` — ZERO auth imports
- Routes `/crisis`, `/tools/symptom-navigator/crisis`, `/navigator/crisis` — all public, no wrappers

### 3.4 Navigation Header

- **File**: `src/components/layout/Navigation.tsx`
- **Unauthenticated**: Shows "Sign In" and "Get Started" buttons — CORRECT
- **Authenticated**: Shows user avatar, dropdown with Dashboard/Settings/Sign Out — CORRECT

---

## 4. Supabase RLS Policies

### 4.1 Profiles (`supabase/migrations/20250109000000_create_profiles.sql`)
- Users can SELECT/UPDATE/INSERT their own profile only (`auth.uid() = id`)
- Admins can SELECT/UPDATE all profiles
- Auto-create trigger on `auth.users` INSERT

### 4.2 Bookmarks (`supabase/migrations/20250109000001_create_remaining_tables.sql`)
- Users can SELECT/INSERT/DELETE their own bookmarks only (`user_id` isolation)

### 4.3 Assessment Results
- Users can SELECT/INSERT their own results only

### 4.4 Navigator Knowledge Base (`supabase/migrations/20250220000003_navigator_rls.sql`)
- Public READ access for all tables (anon + authenticated)
- Service role only for writes

### 4.5 Navigator Analytics
- INSERT-only for users (no read access)
- SELECT + ALL for service_role

### 4.6 Navigator Saved Results
- Authenticated users: SELECT/INSERT/DELETE own rows only (`auth.uid() = user_id`)

---

## 5. Gaps Found

| # | Gap | Severity | Status |
|---|---|---|---|
| 1 | ProtectedRoute redirect uses React Router state (lost on page refresh) | MEDIUM | FIXED |
| 2 | Admin routes lack route-level ProtectedRoute wrapper | LOW | FIXED |
| 3 | MindMate AI accessible without auth (makes server API calls) | MEDIUM | FIXED |
| 4 | Bookmarks allow anonymous usage via localStorage | LOW | FIXED |
| 5 | This audit report not yet written | LOW | FIXED |

---

## 6. Summary

The Psychage v2 auth infrastructure is comprehensive and well-architected. The core data persistence boundary is correctly enforced for dashboard, provider, and admin routes. Crisis resources and the Symptom Navigator correctly have zero auth barriers. The Clarity Score save action is properly gated with AuthGate. Five gaps were identified and addressed in the implementation phase.
