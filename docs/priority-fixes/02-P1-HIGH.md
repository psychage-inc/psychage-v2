# P1 - High Priority Fixes

These issues are required for MVP launch. They include incomplete features and missing polish.

---

## Task 1: Complete ProviderDashboard Integration

**Status**: [ ] Not Started

**Problem**: Provider dashboard shows stats but may not connect properly to backend API.

**Files to Modify**:
- `src/pages/provider/ProviderDashboard.tsx`
- `src/services/providerService.ts`

### Prompt

```
Complete the ProviderDashboard page integration with the backend API.

Requirements:
1. Review src/pages/provider/ProviderDashboard.tsx

2. Ensure it properly calls:
   - api.provider.getStats() for dashboard statistics
   - api.provider.getActivity() for recent activity

3. Add proper loading states:
   - Show skeleton loader while data fetches
   - Use the existing Skeletons component pattern

4. Add error handling:
   - Show error message if API calls fail
   - Provide retry button
   - Log errors for debugging

5. Add empty states:
   - Handle case when no activity exists
   - Show helpful message for new providers

6. Verify data mapping:
   - Ensure API response matches expected interface
   - Add fallback values for missing fields

7. Add real-time updates consideration:
   - Add refresh button
   - Consider polling for activity updates

Acceptance Criteria:
- Dashboard loads data from API
- Loading skeleton shown during fetch
- Error states handled gracefully
- Empty states have helpful messages
- Stats display correctly formatted numbers
```

---

## Task 2: Complete ProviderProfileEditor

**Status**: [ ] Not Started

**Problem**: Provider profile editor needs form fields and image upload functionality.

**Files to Modify**:
- `src/pages/provider/ProviderProfileEditor.tsx`

### Prompt

```
Complete the ProviderProfileEditor page with full form functionality.

Requirements:
1. Review src/pages/provider/ProviderProfileEditor.tsx

2. Implement profile form with fields:
   - Display name
   - Bio/About (textarea)
   - Specializations (multi-select or tag input)
   - Education (list with add/remove)
   - Languages spoken
   - Years of experience
   - Approach/methodology
   - Office location
   - Accepted insurance (multi-select)
   - Availability hours

3. Add profile photo upload:
   - Use similar pattern to ProfileSettings avatar upload
   - Preview before upload
   - File type/size validation (max 5MB, images only)
   - Progress indicator

4. Form validation:
   - Required fields: name, bio, at least one specialization
   - Minimum bio length (100 chars)
   - Valid insurance selections

5. Save functionality:
   - Call api.provider.updateProfile()
   - Show success toast on save
   - Show error toast on failure
   - Disable form while saving

6. Auto-save draft to localStorage (optional)

Acceptance Criteria:
- All form fields editable
- Photo upload works
- Validation prevents bad submissions
- Changes persist after save
- Success/error feedback shown
```

---

## Task 3: Complete ProviderAnalytics Page

**Status**: [ ] Not Started

**Problem**: Analytics charts may be hardcoded and not connected to real data.

**Files to Modify**:
- `src/pages/provider/ProviderAnalytics.tsx`

### Prompt

```
Complete the ProviderAnalytics page with real data integration.

Requirements:
1. Review src/pages/provider/ProviderAnalytics.tsx

2. Connect to api.provider.getAnalytics() endpoint:
   - Profile views over time
   - View change percentage
   - Conversion rate
   - Top locations

3. Implement date range selector:
   - 7 days, 30 days, 90 days, all time
   - Update charts when range changes

4. Replace any hardcoded data with API data:
   - Check for mock data arrays
   - Map API response to chart format

5. Add charts using Recharts:
   - Line chart for profile views
   - Bar chart for top locations
   - Stat cards for key metrics

6. Handle loading states:
   - Skeleton for charts
   - Loading spinner for stat updates

7. Handle empty data:
   - Show message when no analytics yet
   - Suggest actions to increase visibility

Acceptance Criteria:
- Charts display real data from API
- Date range filter works
- Loading states shown appropriately
- Empty state handled
- Responsive on mobile
```

---

## Task 4: Implement Share/PDF Buttons or Remove

**Status**: [ ] Not Started

**Problem**: Multiple pages have non-functional share and PDF export buttons.

**Files to Modify**:
- `src/pages/learn/ArticlePage.tsx`
- `src/pages/tools/clarity-score/AssessmentResultsPage.tsx`

### Prompt

```
Either implement share/PDF functionality or remove the non-functional buttons.

Option A - Implement (Recommended):

1. For Share Button:
   - Use Web Share API if available: navigator.share()
   - Fallback to copy link to clipboard
   - Show toast confirmation

   ```typescript
   const handleShare = async () => {
     const shareData = {
       title: article.title,
       text: article.description,
       url: window.location.href,
     };

     if (navigator.share) {
       await navigator.share(shareData);
     } else {
       await navigator.clipboard.writeText(window.location.href);
       toast.success('Link copied to clipboard!');
     }
   };
   ```

2. For PDF Export (Assessment Results):
   - Use browser print with print-specific CSS
   - Or use html2pdf.js library
   - Include score, breakdown, recommendations

   ```typescript
   const handleExportPDF = () => {
     window.print(); // Simple approach with @media print CSS
   };
   ```

3. Add print styles to index.css:
   ```css
   @media print {
     .no-print { display: none; }
     .print-only { display: block; }
   }
   ```

Option B - Remove Buttons:
1. Remove share button from ArticlePage.tsx
2. Remove share/PDF buttons from AssessmentResultsPage.tsx
3. This is acceptable if timeline is tight

Acceptance Criteria (if implementing):
- Share button works on mobile and desktop
- PDF/print creates readable output
- User gets feedback on action
```

---

## Task 5: Add Loading Skeletons to UserDashboard

**Status**: [ ] Not Started

**Problem**: UserDashboard doesn't show loading state while fetching data.

**Files to Modify**:
- `src/pages/dashboard/UserDashboard.tsx`

### Prompt

```
Add loading skeleton to UserDashboard for better perceived performance.

Requirements:
1. Review src/pages/dashboard/UserDashboard.tsx

2. Add isLoading state:
   ```typescript
   const [isLoading, setIsLoading] = useState(true);
   ```

3. Create dashboard-specific skeleton:
   - 4 stat card skeletons in a grid
   - Activity list skeleton (3-4 items)
   - Recent assessments skeleton

4. Use existing Skeleton patterns from src/components/ui/Skeletons.tsx:
   ```typescript
   const DashboardSkeleton = () => (
     <div className="space-y-6">
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[...Array(4)].map((_, i) => (
           <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse" />
         ))}
       </div>
       <div className="space-y-3">
         {[...Array(3)].map((_, i) => (
           <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse" />
         ))}
       </div>
     </div>
   );
   ```

5. Show skeleton while data loads:
   ```typescript
   if (isLoading) return <DashboardSkeleton />;
   ```

6. Set isLoading to false after all data fetched

Acceptance Criteria:
- Skeleton appears immediately on page load
- Skeleton matches dashboard layout
- Smooth transition to real content
- No layout shift when content loads
```

---

## Task 6: Complete Provider Service Stubs

**Status**: [ ] Not Started

**Problem**: Two functions in providerService.ts are stubs waiting for backend.

**Files to Modify**:
- `src/services/providerService.ts`

### Prompt

```
Complete the stub functions in providerService.ts or add proper fallback behavior.

Requirements:
1. Review src/services/providerService.ts

2. Find and complete verifyProvider():
   - Currently marked as "Admin only - placeholder"
   - Should call api.admin.updateProviderStatus() or similar
   - Add proper error handling
   - Return success/failure status

   ```typescript
   verifyProvider: async (providerId: string, status: 'active' | 'rejected'): Promise<boolean> => {
     try {
       const response = await api.admin.updateProviderStatus(providerId, status);
       return response.success;
     } catch (error) {
       console.error('Failed to verify provider:', error);
       return false;
     }
   }
   ```

3. Find and complete submitReview():
   - Currently marked "Placeholder - implement when API is ready"
   - Should post review data to backend
   - Include rating, comment, provider ID

   ```typescript
   submitReview: async (providerId: string, review: { rating: number; comment: string }): Promise<boolean> => {
     try {
       // If API exists:
       const response = await api.post(`/api/providers/${providerId}/reviews`, review);
       return response.success;
     } catch (error) {
       console.error('Failed to submit review:', error);
       // Optionally store locally for later sync
       return false;
     }
   }
   ```

4. If backend endpoints don't exist:
   - Add TODO comment with expected endpoint
   - Implement localStorage queue for later sync
   - Show user appropriate message

Acceptance Criteria:
- No more placeholder/stub comments
- Functions either work or fail gracefully
- Clear error messages for users
```

---

## Task 7: Add Error UI States to Pages

**Status**: [ ] Not Started

**Problem**: Some pages log errors but don't show them to users (LearnPage, etc.).

**Files to Modify**:
- `src/pages/LearnPage.tsx`
- `src/pages/dashboard/UserAssessmentHistory.tsx`
- Other pages that only console.error

### Prompt

```
Add user-facing error states to pages that currently only log errors.

Requirements:
1. Search for pages with console.error but no error UI:
   - LearnPage.tsx
   - UserAssessmentHistory.tsx
   - Any others found

2. For each page, add:
   - error state: `const [error, setError] = useState<string | null>(null);`
   - Set error message in catch block
   - Display error UI when error exists

3. Create reusable error component or use Alert:
   ```typescript
   {error && (
     <Alert variant="destructive" className="mb-4">
       <AlertTriangle className="h-4 w-4" />
       <AlertTitle>Error</AlertTitle>
       <AlertDescription>
         {error}
         <Button variant="link" onClick={refetch}>Try again</Button>
       </AlertDescription>
     </Alert>
   )}
   ```

4. Add retry functionality:
   - Button to retry failed request
   - Clear error on retry attempt

5. Consider partial error states:
   - If one section fails but others succeed
   - Show what loaded, error for what didn't

Acceptance Criteria:
- Users see friendly error messages
- Retry option available
- No silent failures
- Errors are still logged for debugging
```

---

## Task 8: Add aria-live to Toast Component

**Status**: [ ] Not Started

**Problem**: Toast notifications don't announce to screen readers.

**Files to Modify**:
- `src/components/ui/Toast.tsx`

### Prompt

```
Add accessibility attributes to the Toast component for screen reader support.

Requirements:
1. Review src/components/ui/Toast.tsx

2. Add ARIA attributes:
   - role="status" for informational toasts
   - role="alert" for error toasts
   - aria-live="polite" for non-urgent
   - aria-live="assertive" for errors/urgent

3. Implementation:
   ```typescript
   const Toast: React.FC<ToastProps> = ({ type, message, ... }) => {
     const isError = type === 'error' || type === 'destructive';

     return (
       <div
         role={isError ? 'alert' : 'status'}
         aria-live={isError ? 'assertive' : 'polite'}
         className={...}
       >
         {message}
       </div>
     );
   };
   ```

4. Test with screen reader:
   - VoiceOver on Mac: Cmd + F5
   - Verify toast content is announced
   - Verify urgency is appropriate

5. Also add aria-label to close button if exists:
   ```typescript
   <button aria-label="Dismiss notification" onClick={onClose}>
     <X />
   </button>
   ```

Acceptance Criteria:
- Screen readers announce toasts
- Error toasts are more urgent
- Close button is accessible
- Meets WCAG 2.1 AA requirements
```

---

## Completion Checklist

When all P1 tasks are complete:

- [ ] Provider dashboard shows real data with loading states
- [ ] Provider profile editor fully functional
- [ ] Provider analytics connected to API
- [ ] Share/PDF buttons work or removed
- [ ] UserDashboard has loading skeleton
- [ ] Provider service has no stubs
- [ ] All pages show error states to users
- [ ] Toast component is accessible

**Next Step**: Move to [03-P2-MEDIUM.md](./03-P2-MEDIUM.md)
