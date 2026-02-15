# P0 - Critical Priority Fixes

These issues **MUST** be fixed before any production deployment. They include broken functionality and missing critical features.

---

## Task 1: Fix ContactPage Form Submission

**Status**: [ ] Not Started

**Problem**: The contact form in `ContactPage.tsx` doesn't actually submit data anywhere - it only simulates submission with `setTimeout`.

**Files to Modify**:
- `src/pages/core/ContactPage.tsx`
- `src/services/contactService.ts` (create new)
- `src/lib/api.ts` (add contact endpoint)

### Prompt

```
Fix the ContactPage form submission. Currently it's fake (uses setTimeout simulation).

Requirements:
1. Create a new contactService.ts in src/services/ with:
   - submitContactForm(data: {name, email, subject, message}) function
   - Should call the backend API or Supabase directly
   - Include proper error handling

2. Add contact endpoint to src/lib/api.ts:
   - api.contact.submit() method

3. Update src/pages/core/ContactPage.tsx:
   - Replace setTimeout simulation with actual service call
   - Show proper loading state during submission
   - Show success message only on actual success
   - Show error message on failure
   - Add basic form validation (email format, required fields)
   - Consider adding spam protection (honeypot field)

4. If no backend endpoint exists, implement Supabase direct insert:
   - Create 'contact_submissions' table logic
   - Fall back to email service if needed

Acceptance Criteria:
- Form data is actually saved/sent
- User sees appropriate feedback
- Form validates before submission
- Errors are handled gracefully
```

---

## Task 2: Fix ToolsLandingPage Dynamic Tailwind Classes

**Status**: [ ] Not Started

**Problem**: Dynamic Tailwind classes like `bg-${tool.color}-100` don't work because Tailwind purges unused classes at build time.

**Files to Modify**:
- `src/pages/tools/ToolsLandingPage.tsx`

### Prompt

```
Fix the ToolsLandingPage dynamic Tailwind classes. The current code uses template literals like `bg-${tool.color}-100` which don't work with Tailwind's purge system.

Requirements:
1. Open src/pages/tools/ToolsLandingPage.tsx

2. Create a color mapping object that maps tool.color values to full Tailwind classes:
   ```typescript
   const colorClasses: Record<string, { bg: string; bgLight: string; text: string; border: string }> = {
     teal: { bg: 'bg-teal-500', bgLight: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-200' },
     amber: { bg: 'bg-amber-500', bgLight: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' },
     indigo: { bg: 'bg-indigo-500', bgLight: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200' },
     sky: { bg: 'bg-sky-500', bgLight: 'bg-sky-100', text: 'text-sky-600', border: 'border-sky-200' },
     rose: { bg: 'bg-rose-500', bgLight: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-200' },
     red: { bg: 'bg-red-500', bgLight: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
   };
   ```

3. Replace all dynamic class usages with the mapping:
   - Instead of: `bg-${tool.color}-100`
   - Use: `colorClasses[tool.color]?.bgLight || 'bg-gray-100'`

4. Ensure fallback for unknown colors

Acceptance Criteria:
- All tool cards display correct colors
- No broken styling in production build
- Run `npm run build` to verify no runtime errors
```

---

## Task 3: Add Basic E2E Tests for Authentication

**Status**: [ ] Not Started

**Problem**: Only 2 test files exist in the entire project. Critical auth flows are untested.

**Files to Create**:
- `e2e/auth.spec.ts`
- `playwright.config.ts` (if not exists)

### Prompt

```
Set up Playwright E2E tests for the authentication flow.

Requirements:
1. Check if playwright.config.ts exists, if not create it with:
   - baseURL pointing to localhost:5173
   - Chromium browser configuration
   - Screenshot on failure

2. Create e2e/auth.spec.ts with tests for:

   a) Login Flow:
   - Visit /login page
   - Fill in email and password
   - Click submit
   - Verify redirect to dashboard or error message

   b) Signup Flow:
   - Visit /signup page
   - Fill in all required fields
   - Accept terms checkbox
   - Submit and verify success/redirect

   c) Password Reset Flow:
   - Visit /reset-password
   - Enter email
   - Verify success message shown

   d) Protected Route:
   - Try to visit /dashboard without auth
   - Verify redirect to login

   e) Logout Flow:
   - Login first
   - Click logout
   - Verify redirect and token cleared

3. Add test script to package.json:
   "test:e2e": "playwright test"

4. Create a test user in your test environment or use mocking

Acceptance Criteria:
- All 5 test scenarios pass
- Tests can run in CI environment
- npm run test:e2e executes successfully
```

---

## Task 4: Verify Backend API Connectivity

**Status**: [ ] Not Started

**Problem**: Need to verify all API endpoints in `src/lib/api.ts` are working with the actual backend.

**Files to Check**:
- `src/lib/api.ts`
- `.env` / `.env.production`

### Prompt

```
Create an API connectivity verification script and document any broken endpoints.

Requirements:
1. Create a temporary test file or script that:
   - Imports the api object from src/lib/api.ts
   - Tests each major endpoint group (auth, providers, articles, etc.)
   - Logs success/failure for each

2. Test the following endpoints (with proper auth where needed):

   Public endpoints (no auth):
   - GET /api/providers
   - GET /api/articles
   - GET /api/tools
   - GET /api/symptoms
   - GET /api/categories

   Auth endpoints:
   - POST /api/auth/login
   - POST /api/auth/signup
   - GET /api/auth/me

   Protected endpoints (need valid token):
   - GET /api/user/profile
   - GET /api/bookmarks
   - GET /api/clarity-score
   - GET /api/mood
   - GET /api/sleep

3. Document any endpoints that:
   - Return 404 (not implemented in backend)
   - Return 500 (server error)
   - Return unexpected data format
   - Timeout

4. Create a report file: docs/api-status.md with:
   - Working endpoints
   - Broken endpoints with error details
   - Endpoints that need backend implementation

Acceptance Criteria:
- Clear documentation of what works and what doesn't
- Action items for backend team if endpoints missing
- Fallback strategies identified for broken endpoints
```

---

## Task 5: Configure Production Environment

**Status**: [ ] Not Started

**Problem**: Need to verify `.env.production` has all required values for deployment.

**Files to Check**:
- `.env.example`
- `.env.production`
- `vercel.json`

### Prompt

```
Verify and configure the production environment setup.

Requirements:
1. Read .env.example and document all required variables

2. Check .env.production has values for:
   - VITE_API_URL (production backend URL)
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
   - VITE_SANITY_PROJECT_ID
   - VITE_SANITY_DATASET
   - VITE_SANITY_API_VERSION
   - VITE_GEMINI_API_KEY (if AI chat enabled)

3. Verify vercel.json configuration:
   - Check SPA routing is configured
   - Check build settings are correct

4. Create docs/deployment-checklist.md with:
   - Pre-deployment checklist
   - Environment variable requirements
   - Post-deployment verification steps
   - Rollback procedure

5. Test production build locally:
   - npm run build
   - npm run preview
   - Verify app works with production settings

Acceptance Criteria:
- All env variables documented
- Production build runs locally
- Deployment checklist created
- No console errors in production build
```

---

## Completion Checklist

When all P0 tasks are complete:

- [ ] ContactPage form actually submits data
- [ ] ToolsLandingPage displays correct colors in production
- [ ] E2E auth tests pass
- [ ] API connectivity documented
- [ ] Production environment configured

**Next Step**: Move to [02-P1-HIGH.md](./02-P1-HIGH.md)
