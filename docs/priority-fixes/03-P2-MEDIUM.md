# P2 - Medium Priority Fixes

These issues are important for quality and maintainability. They should be addressed after MVP launch.

---

## Task 1: Add Unit Tests for Services

**Status**: [ ] Not Started

**Problem**: Only 2 test files exist. Services layer is completely untested.

**Files to Create**:
- `src/services/__tests__/articleService.test.ts`
- `src/services/__tests__/assessmentService.test.ts`
- `src/services/__tests__/authService.test.ts`

### Prompt

```
Create unit tests for the most critical services.

Requirements:
1. Set up testing for services directory:
   - Create src/services/__tests__/ folder
   - Configure mocks for api.ts and supabaseClient.ts

2. Test articleService.ts:
   ```typescript
   // src/services/__tests__/articleService.test.ts
   import { describe, it, expect, vi, beforeEach } from 'vitest';
   import { articleService } from '../articleService';

   // Mock dependencies
   vi.mock('../../lib/api');
   vi.mock('../sanityArticleService');

   describe('articleService', () => {
     beforeEach(() => {
       vi.clearAllMocks();
     });

     describe('getAll', () => {
       it('should fetch articles from Sanity first', async () => {
         // Test Sanity → Supabase → Mock cascade
       });

       it('should fall back to mock data on error', async () => {
         // Test error fallback
       });
     });

     describe('getBySlug', () => {
       it('should return article matching slug', async () => {});
       it('should return null for non-existent slug', async () => {});
     });
   });
   ```

3. Test assessmentService.ts:
   - Test getQuestions() returns valid format
   - Test submitAssessment() calculates scores correctly
   - Test getHistory() returns sorted results
   - Test getStats() calculates trends

4. Test moodService.ts and sleepService.ts:
   - CRUD operations
   - Data mapping from API format
   - Error handling

5. Add test script if not exists:
   ```json
   "test": "vitest",
   "test:coverage": "vitest --coverage"
   ```

Acceptance Criteria:
- At least 3 service files have tests
- Tests cover happy path and error cases
- Coverage report shows tested code
- npm run test passes
```

---

## Task 2: Implement OAuth Sign-In

**Status**: [ ] Not Started

**Problem**: Google and Apple sign-in buttons exist but are non-functional.

**Files to Modify**:
- `src/pages/auth/LoginPage.tsx`
- `src/pages/auth/SignUpPage.tsx`
- `src/context/AuthContext.tsx`
- `src/lib/supabaseClient.ts`

### Prompt

```
Implement OAuth sign-in with Google (and optionally Apple).

Requirements:
1. Configure Supabase OAuth:
   - Go to Supabase Dashboard → Authentication → Providers
   - Enable Google provider
   - Add OAuth credentials from Google Cloud Console
   - Configure redirect URLs

2. Add OAuth methods to AuthContext:
   ```typescript
   const signInWithGoogle = async () => {
     const { error } = await supabase.auth.signInWithOAuth({
       provider: 'google',
       options: {
         redirectTo: `${window.location.origin}/auth/callback`
       }
     });
     if (error) throw error;
   };
   ```

3. Create auth callback route:
   - Create src/pages/auth/AuthCallback.tsx
   - Handle OAuth redirect
   - Exchange code for session
   - Redirect to dashboard

4. Update LoginPage.tsx:
   ```typescript
   const handleGoogleSignIn = async () => {
     try {
       setIsLoading(true);
       await signInWithGoogle();
     } catch (error) {
       setError('Failed to sign in with Google');
     } finally {
       setIsLoading(false);
     }
   };
   ```

5. Update SignUpPage.tsx similarly

6. Add route in App.tsx:
   ```typescript
   <Route path="/auth/callback" element={<AuthCallback />} />
   ```

Acceptance Criteria:
- Google sign-in button works
- User redirected properly after OAuth
- Session persisted correctly
- New users created in database
- Existing users can link accounts
```

---

## Task 3: Add Backend Search API

**Status**: [ ] Not Started

**Problem**: Search is currently client-side only, which won't scale.

**Files to Modify**:
- `src/services/searchService.ts` (create)
- `src/pages/learn/SearchResultsPage.tsx`
- `src/lib/api.ts`

### Prompt

```
Implement backend search API integration.

Requirements:
1. Create searchService.ts:
   ```typescript
   // src/services/searchService.ts
   import { api } from '../lib/api';

   export interface SearchParams {
     query: string;
     type?: 'articles' | 'providers' | 'videos' | 'all';
     category?: string;
     page?: number;
     limit?: number;
   }

   export interface SearchResult {
     articles: Article[];
     providers: Provider[];
     videos: Video[];
     totalResults: number;
   }

   export const searchService = {
     search: async (params: SearchParams): Promise<SearchResult> => {
       try {
         const response = await api.get<SearchResult>(
           `/api/search?q=${encodeURIComponent(params.query)}&type=${params.type || 'all'}`
         );
         return response.data || { articles: [], providers: [], videos: [], totalResults: 0 };
       } catch (error) {
         console.error('Search failed:', error);
         // Fall back to client-side search
         return fallbackClientSearch(params);
       }
     },

     getSuggestions: async (query: string): Promise<string[]> => {
       // Autocomplete suggestions
     }
   };
   ```

2. Add search endpoint to api.ts:
   ```typescript
   search: {
     query: (params: SearchParams) => api.get<SearchResult>(`/api/search`, { params }),
     suggestions: (q: string) => api.get<string[]>(`/api/search/suggestions?q=${q}`),
   }
   ```

3. Update SearchResultsPage.tsx:
   - Use searchService instead of client-side filter
   - Add pagination
   - Add type filter (articles, providers, videos)

4. Update SearchAutocomplete.tsx:
   - Use suggestions API
   - Debounce requests (300ms)

5. Keep client-side fallback for when backend unavailable

Acceptance Criteria:
- Search queries go to backend
- Results paginated
- Autocomplete works
- Falls back to client-side gracefully
```

---

## Task 4: Complete Admin Dashboard

**Status**: [ ] Not Started

**Problem**: Admin pages are mostly stubs/placeholders.

**Files to Modify**:
- `src/pages/admin/AdminDashboard.tsx`
- `src/pages/admin/ProviderManagement.tsx`
- `src/pages/admin/AuditLogPage.tsx`
- `src/pages/admin/ReportsPage.tsx`

### Prompt

```
Complete the admin dashboard functionality.

Requirements:
1. AdminDashboard.tsx:
   - Connect to api.admin.getStats()
   - Show: total users, total providers, pending approvals, active sessions
   - Add charts for user growth, provider signups
   - Recent activity feed

2. ProviderManagement.tsx:
   - List all providers with status filter
   - Search by name/email
   - Actions: Approve, Suspend, Reject
   - View provider details modal
   - Pagination

3. AuditLogPage.tsx:
   - Connect to api.admin.getAuditLogs()
   - Filter by action type, user, date range
   - Sortable columns
   - Export to CSV button

4. ReportsPage.tsx:
   - User engagement report
   - Provider performance report
   - Content popularity report
   - Date range selection
   - Chart visualizations

5. Add proper authorization checks:
   - Verify admin role before data access
   - Show unauthorized message if not admin

6. Add confirmation dialogs for destructive actions:
   - Confirm before suspending provider
   - Confirm before rejecting application

Acceptance Criteria:
- All admin pages functional
- Data loads from API
- Actions work (approve, suspend, etc.)
- Proper authorization
- Audit trail for admin actions
```

---

## Task 5: Add File Validation to Uploads

**Status**: [ ] Not Started

**Problem**: Avatar/image uploads lack file type and size validation.

**Files to Modify**:
- `src/pages/dashboard/ProfileSettings.tsx`
- `src/pages/provider/ProviderProfileEditor.tsx`
- `src/utils/fileValidation.ts` (create)

### Prompt

```
Add proper file validation for all image uploads.

Requirements:
1. Create fileValidation.ts utility:
   ```typescript
   // src/utils/fileValidation.ts
   export const FILE_LIMITS = {
     avatar: {
       maxSize: 5 * 1024 * 1024, // 5MB
       allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
       maxWidth: 1000,
       maxHeight: 1000,
     },
     document: {
       maxSize: 10 * 1024 * 1024, // 10MB
       allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
     }
   };

   export interface ValidationResult {
     valid: boolean;
     error?: string;
   }

   export const validateFile = (
     file: File,
     limits: typeof FILE_LIMITS.avatar
   ): ValidationResult => {
     if (file.size > limits.maxSize) {
       return {
         valid: false,
         error: `File too large. Maximum size is ${limits.maxSize / 1024 / 1024}MB`
       };
     }

     if (!limits.allowedTypes.includes(file.type)) {
       return {
         valid: false,
         error: `Invalid file type. Allowed: ${limits.allowedTypes.join(', ')}`
       };
     }

     return { valid: true };
   };

   export const validateImageDimensions = async (
     file: File,
     maxWidth: number,
     maxHeight: number
   ): Promise<ValidationResult> => {
     return new Promise((resolve) => {
       const img = new Image();
       img.onload = () => {
         if (img.width > maxWidth || img.height > maxHeight) {
           resolve({
             valid: false,
             error: `Image too large. Maximum dimensions: ${maxWidth}x${maxHeight}px`
           });
         } else {
           resolve({ valid: true });
         }
       };
       img.src = URL.createObjectURL(file);
     });
   };
   ```

2. Update ProfileSettings.tsx:
   - Validate before upload
   - Show error message if invalid
   - Show file size in preview

3. Update ProviderProfileEditor.tsx similarly

4. Add visual feedback:
   - File type icons
   - Size display
   - Progress bar during upload

Acceptance Criteria:
- Files validated before upload
- Clear error messages shown
- Large files rejected client-side
- Only allowed types accepted
```

---

## Task 6: Optimize Bundle Size

**Status**: [ ] Not Started

**Problem**: Two chunks exceed 500KB (Recharts 382KB, main bundle 849KB).

**Files to Modify**:
- `vite.config.ts`

### Prompt

```
Optimize the bundle size to improve loading performance.

Requirements:
1. Update vite.config.ts with manual chunks:
   ```typescript
   build: {
     rollupOptions: {
       output: {
         manualChunks: {
           'vendor-react': ['react', 'react-dom', 'react-router-dom'],
           'vendor-ui': ['framer-motion', 'lucide-react', 'class-variance-authority'],
           'vendor-charts': ['recharts', 'd3'],
           'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
           'vendor-supabase': ['@supabase/supabase-js'],
           'vendor-sanity': ['@sanity/client', '@sanity/image-url'],
         }
       }
     }
   }
   ```

2. Lazy load heavy components:
   - Charts only when visible
   - 3D backgrounds only on home page
   - Rich text editor only when editing

3. Tree-shake unused Recharts components:
   ```typescript
   // Instead of:
   import { LineChart, Line, ... } from 'recharts';

   // Use:
   import { LineChart } from 'recharts/es6/chart/LineChart';
   import { Line } from 'recharts/es6/cartesian/Line';
   ```

4. Analyze bundle with visualizer:
   ```bash
   npm install -D rollup-plugin-visualizer
   ```

   Add to vite.config.ts:
   ```typescript
   import { visualizer } from 'rollup-plugin-visualizer';

   plugins: [
     visualizer({ open: true, filename: 'bundle-analysis.html' })
   ]
   ```

5. Consider alternatives:
   - Replace Recharts with lightweight charts if possible
   - Use CSS animations instead of Three.js where appropriate

Acceptance Criteria:
- No chunks over 500KB
- Initial bundle under 300KB gzipped
- Charts lazy loaded
- Build still works correctly
```

---

## Task 7: Fix Assessment Details Button

**Status**: [ ] Not Started

**Problem**: "Details" button in UserAssessmentHistory doesn't work.

**Files to Modify**:
- `src/pages/dashboard/UserAssessmentHistory.tsx`

### Prompt

```
Implement the details functionality for assessment history.

Requirements:
1. Review UserAssessmentHistory.tsx

2. Option A - Modal approach:
   - Create AssessmentDetailModal component
   - Show full breakdown on click
   - Include: all dimension scores, recommendations, date/time

   ```typescript
   const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

   <Button onClick={() => setSelectedAssessment(assessment)}>
     Details
   </Button>

   {selectedAssessment && (
     <AssessmentDetailModal
       assessment={selectedAssessment}
       onClose={() => setSelectedAssessment(null)}
     />
   )}
   ```

3. Option B - Expandable row:
   - Click row to expand inline
   - Show details in collapsible section

4. Option C - Navigate to detail page:
   - Create /dashboard/assessments/:id route
   - Navigate on click
   - Full page detail view

5. Details to show:
   - Overall score with visual gauge
   - Dimension breakdown (anxiety, mood, stress, sleep)
   - Score interpretation
   - Recommendations based on scores
   - Comparison to previous assessment

Acceptance Criteria:
- Details button is functional
- User can see full assessment breakdown
- Works on mobile
- Smooth animations
```

---

## Task 8: Standardize Error Handling

**Status**: [ ] Not Started

**Problem**: Inconsistent error handling across pages and services.

**Files to Create/Modify**:
- `src/utils/errorHandling.ts` (create)
- `src/hooks/useAsyncData.ts` (create)
- Various pages

### Prompt

```
Create standardized error handling patterns across the application.

Requirements:
1. Create error handling utilities:
   ```typescript
   // src/utils/errorHandling.ts
   export class AppError extends Error {
     constructor(
       message: string,
       public code: string,
       public statusCode?: number,
       public recoverable: boolean = true
     ) {
       super(message);
       this.name = 'AppError';
     }
   }

   export const errorMessages: Record<string, string> = {
     NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
     AUTH_EXPIRED: 'Your session has expired. Please log in again.',
     NOT_FOUND: 'The requested resource was not found.',
     SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
     VALIDATION_ERROR: 'Please check your input and try again.',
   };

   export const handleApiError = (error: unknown): AppError => {
     if (error instanceof ApiError) {
       // Map API errors to user-friendly messages
     }
     return new AppError(errorMessages.SERVER_ERROR, 'UNKNOWN');
   };
   ```

2. Create useAsyncData hook:
   ```typescript
   // src/hooks/useAsyncData.ts
   export function useAsyncData<T>(
     fetchFn: () => Promise<T>,
     deps: unknown[] = []
   ) {
     const [data, setData] = useState<T | null>(null);
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState<AppError | null>(null);

     const refetch = useCallback(async () => {
       setIsLoading(true);
       setError(null);
       try {
         const result = await fetchFn();
         setData(result);
       } catch (e) {
         setError(handleApiError(e));
       } finally {
         setIsLoading(false);
       }
     }, deps);

     useEffect(() => { refetch(); }, [refetch]);

     return { data, isLoading, error, refetch };
   }
   ```

3. Update pages to use standardized hook

4. Create ErrorDisplay component:
   - Consistent error UI
   - Retry button
   - Link to support

Acceptance Criteria:
- All errors use consistent format
- User-friendly error messages
- Retry functionality where appropriate
- Error logging maintained
```

---

## Completion Checklist

When all P2 tasks are complete:

- [ ] Core services have unit tests
- [ ] OAuth sign-in works
- [ ] Search uses backend API
- [ ] Admin dashboard fully functional
- [ ] File uploads validated
- [ ] Bundle size optimized
- [ ] Assessment details work
- [ ] Error handling standardized

**Next Step**: Move to [04-P3-LOW.md](./04-P3-LOW.md)
