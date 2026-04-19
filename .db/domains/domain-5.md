# Domain 5: Authentication & Authorization

## Code Path Trace

### Entry Points
- `src/context/AuthContext.tsx` — auth state, role mapping, login/signup/logout
- `src/pages/auth/AuthCallback.tsx` — post-auth redirect handling
- `src/pages/auth/LoginPage.tsx`, `SignUpPage.tsx`, `ResetPasswordPage.tsx`, `UpdatePasswordPage.tsx`

### Auth Flow
1. Login: `supabase.auth.signInWithPassword()` → mapSupabaseUser → setState
2. Signup: `supabase.auth.signUp({ options: { data: { role, display_name } } })` → email confirm
3. OAuth: `supabase.auth.signInWithOAuth()` → redirect → `/auth/callback`
4. Password reset: `supabase.auth.resetPasswordForEmail()` → email → `/update-password`
5. Session refresh: handled by Supabase's `onAuthStateChange` listener (line 54-69)

### Role System
- Role stored in `user_metadata.role` (set during signup at line 118)
- Defaults to `'patient'` if not set (line 13)
- Types: `'patient' | 'provider' | 'admin'`
- admin_roles table: separate, maps user_id → role for RLS policies
- admin_roles RLS uses JWT metadata: `(auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'`

### AuthCallback Redirect Logic
- Admin: checks `profiles.onboarding_completed_at` (TIMESTAMPTZ) — line 44
- Patient: checks `profiles.onboarding_completed` (BOOLEAN) — line 67
- Both columns exist in DB (migrations 20260307000001 and 20260410000001)
- Fail-open: missing profile/column → skip onboarding → dashboard

### admin_roles Recursion
- Fixed in migration 20260330000001 — CONFIRMED INTACT
- No self-referencing policy remains

## Issues Found

| id | severity | issue | file | line | proposed_fix |
|---|---|---|---|---|---|
| AUTH-001 | info | Role enum ambiguity: DB table may have `editor` or `clinical_admin` depending on migration order | supabase/migrations | - | Document; both use IF NOT EXISTS so first migration wins (clinical_admin) |
| AUTH-002 | info | OAuth signup doesn't set role in user_metadata — defaults to 'patient' | AuthContext.tsx | 13 | By design — OAuth users are patients |
| AUTH-003 | info | No profiles table write during signup — relies on Supabase auth trigger or manual provisioning | AuthContext.tsx | 111-122 | Document as dependency on DB trigger |
| AUTH-004 | minor | Logout clears state even if signOut fails | AuthContext.tsx | 148 | Acceptable fail-open |
| AUTH-005 | info | deleteAccount delegates to privacyService — not verified in this domain | AuthContext.tsx | 228-243 | Separate verification needed |

## Edge Cases Verified
- ✅ Login with invalid credentials: returns `{ success: false, error: message }`
- ✅ Expired magic link: AuthCallback shows error, redirects to /login after 3s
- ✅ Session persists: onAuthStateChange listener re-maps on page refresh
- ✅ Logout clears state: fail-open pattern (always clears even if signOut errors)
- ✅ AuthCallback handles all roles: provider → /provider, admin → /dashboard, patient → /dashboard
- ✅ Cross-domain redirects: adminUrl/mainUrl used correctly for multi-domain setup
