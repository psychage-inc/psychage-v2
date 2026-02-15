# P3 - Low Priority Fixes (Nice to Have)

These are enhancements that improve the overall quality but aren't required for launch.

---

## Task 1: Add Storybook Stories for Components

**Status**: [ ] Not Started

**Problem**: Storybook is configured but may not have comprehensive stories for all components.

**Files to Create**:
- `src/components/ui/*.stories.tsx`

### Prompt

```
Create Storybook stories for the core UI components.

Requirements:
1. Check existing Storybook setup in .storybook/

2. Create stories for core components:

   Button.stories.tsx:
   ```typescript
   import type { Meta, StoryObj } from '@storybook/react';
   import { Button } from './Button';

   const meta: Meta<typeof Button> = {
     title: 'UI/Button',
     component: Button,
     tags: ['autodocs'],
     argTypes: {
       variant: {
         control: 'select',
         options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
       },
       size: {
         control: 'select',
         options: ['sm', 'md', 'lg'],
       },
     },
   };

   export default meta;
   type Story = StoryObj<typeof meta>;

   export const Primary: Story = {
     args: {
       children: 'Button',
       variant: 'primary',
     },
   };

   export const AllVariants: Story = {
     render: () => (
       <div className="flex gap-4">
         <Button variant="primary">Primary</Button>
         <Button variant="secondary">Secondary</Button>
         <Button variant="outline">Outline</Button>
         <Button variant="ghost">Ghost</Button>
         <Button variant="danger">Danger</Button>
       </div>
     ),
   };
   ```

3. Create stories for:
   - Button (all variants, sizes, states)
   - Input (with/without error, disabled)
   - Card (all variants)
   - Badge (all colors)
   - Alert (all types)
   - Modal (open/closed states)
   - Toast (all types)
   - Tooltip (positions)

4. Add accessibility addon tests:
   ```typescript
   export const AccessibilityTest: Story = {
     play: async ({ canvasElement }) => {
       // a11y checks run automatically
     },
   };
   ```

5. Document component usage in stories

Acceptance Criteria:
- All UI components have stories
- Variants documented
- Accessibility tests pass
- npm run storybook works
```

---

## Task 2: Implement Request Caching

**Status**: [ ] Not Started

**Problem**: Services don't cache responses, causing unnecessary API calls.

**Files to Create/Modify**:
- `src/lib/cache.ts` (create)
- `src/services/*.ts` (update)

### Prompt

```
Implement request caching for read-heavy endpoints.

Requirements:
1. Create cache utility:
   ```typescript
   // src/lib/cache.ts
   interface CacheEntry<T> {
     data: T;
     timestamp: number;
     ttl: number;
   }

   class RequestCache {
     private cache = new Map<string, CacheEntry<unknown>>();

     get<T>(key: string): T | null {
       const entry = this.cache.get(key);
       if (!entry) return null;

       if (Date.now() - entry.timestamp > entry.ttl) {
         this.cache.delete(key);
         return null;
       }

       return entry.data as T;
     }

     set<T>(key: string, data: T, ttlMs: number = 5 * 60 * 1000): void {
       this.cache.set(key, {
         data,
         timestamp: Date.now(),
         ttl: ttlMs,
       });
     }

     invalidate(pattern?: string): void {
       if (!pattern) {
         this.cache.clear();
         return;
       }
       for (const key of this.cache.keys()) {
         if (key.includes(pattern)) {
           this.cache.delete(key);
         }
       }
     }
   }

   export const requestCache = new RequestCache();
   ```

2. Add caching to read-heavy services:
   ```typescript
   // categoryService.ts
   getAll: async (): Promise<Category[]> => {
     const cacheKey = 'categories:all';
     const cached = requestCache.get<Category[]>(cacheKey);
     if (cached) return cached;

     const data = await fetchCategories();
     requestCache.set(cacheKey, data, 10 * 60 * 1000); // 10 min
     return data;
   }
   ```

3. Cache these endpoints:
   - Categories (long TTL - 10 min)
   - Tools (long TTL - 10 min)
   - Symptoms list (long TTL - 10 min)
   - Articles list (short TTL - 2 min)
   - Provider list (short TTL - 2 min)

4. Invalidate cache on mutations:
   ```typescript
   // After bookmark toggle
   requestCache.invalidate('articles');
   ```

5. Add cache stats for debugging (dev mode only)

Acceptance Criteria:
- Repeated requests use cache
- Cache invalidates on mutations
- TTL appropriate per endpoint
- Memory doesn't grow unbounded
```

---

## Task 3: Add Analytics Tracking

**Status**: [ ] Not Started

**Problem**: No analytics to track user behavior and engagement.

**Files to Create**:
- `src/lib/analytics.ts`
- `src/hooks/useAnalytics.ts`

### Prompt

```
Implement analytics tracking for key user actions.

Requirements:
1. Create analytics abstraction (supports multiple providers):
   ```typescript
   // src/lib/analytics.ts
   type AnalyticsEvent = {
     name: string;
     properties?: Record<string, unknown>;
   };

   class Analytics {
     private providers: AnalyticsProvider[] = [];

     addProvider(provider: AnalyticsProvider) {
       this.providers.push(provider);
     }

     track(event: AnalyticsEvent) {
       this.providers.forEach(p => p.track(event));
     }

     page(name: string, properties?: Record<string, unknown>) {
       this.providers.forEach(p => p.page(name, properties));
     }

     identify(userId: string, traits?: Record<string, unknown>) {
       this.providers.forEach(p => p.identify(userId, traits));
     }
   }

   export const analytics = new Analytics();
   ```

2. Create useAnalytics hook:
   ```typescript
   // src/hooks/useAnalytics.ts
   export const useAnalytics = () => {
     const track = useCallback((event: string, props?: Record<string, unknown>) => {
       analytics.track({ name: event, properties: props });
     }, []);

     return { track };
   };
   ```

3. Track key events:
   - Page views (automatic with route change)
   - Article reads (with time spent)
   - Assessment completions
   - Tool usage
   - Search queries
   - Provider profile views
   - Bookmark actions
   - Authentication events

4. Add to components:
   ```typescript
   // ArticlePage.tsx
   useEffect(() => {
     analytics.track({
       name: 'article_viewed',
       properties: { articleId, category, readTime }
     });
   }, [articleId]);
   ```

5. Add consent management:
   - Cookie consent banner
   - Opt-out option

Acceptance Criteria:
- Key events tracked
- Works with Google Analytics or similar
- Respects user consent
- No PII in events
```

---

## Task 4: Add Real-Time Notifications

**Status**: [ ] Not Started

**Problem**: No notification system for real-time updates.

**Files to Create**:
- `src/context/NotificationContext.tsx`
- `src/components/notifications/NotificationCenter.tsx`
- `src/hooks/useNotifications.ts`

### Prompt

```
Implement real-time notification system.

Requirements:
1. Create NotificationContext:
   ```typescript
   // src/context/NotificationContext.tsx
   interface Notification {
     id: string;
     type: 'info' | 'success' | 'warning' | 'error';
     title: string;
     message: string;
     read: boolean;
     createdAt: Date;
     action?: {
       label: string;
       href: string;
     };
   }

   interface NotificationContextType {
     notifications: Notification[];
     unreadCount: number;
     markAsRead: (id: string) => void;
     markAllAsRead: () => void;
     clearAll: () => void;
   }
   ```

2. Create NotificationCenter component:
   - Bell icon in navigation
   - Badge with unread count
   - Dropdown with notification list
   - Mark as read on click
   - "Mark all as read" button

3. Implement real-time updates (choose one):

   Option A - Supabase Realtime:
   ```typescript
   useEffect(() => {
     const channel = supabase
       .channel('notifications')
       .on('postgres_changes', {
         event: 'INSERT',
         schema: 'public',
         table: 'notifications',
         filter: `user_id=eq.${userId}`,
       }, (payload) => {
         addNotification(payload.new);
       })
       .subscribe();

     return () => { channel.unsubscribe(); };
   }, [userId]);
   ```

   Option B - Polling:
   ```typescript
   useEffect(() => {
     const interval = setInterval(fetchNotifications, 30000);
     return () => clearInterval(interval);
   }, []);
   ```

4. Notification types:
   - New article in followed category
   - Assessment reminder
   - Provider response
   - System announcements

5. Store read state in localStorage or backend

Acceptance Criteria:
- Notifications appear in real-time
- Unread badge updates
- Notifications persist across sessions
- Mobile-friendly design
```

---

## Task 5: Complete i18n Translations

**Status**: [ ] Not Started

**Problem**: Translation files exist for 5 locales but may be incomplete.

**Files to Modify**:
- `src/locales/*/translation.json`

### Prompt

```
Complete internationalization setup and translations.

Requirements:
1. Audit existing translation files:
   - src/locales/en/translation.json (English - base)
   - src/locales/es/translation.json (Spanish)
   - src/locales/fr/translation.json (French)
   - src/locales/pt/translation.json (Portuguese)
   - src/locales/sv/translation.json (Swedish)

2. Find all hardcoded strings in components:
   ```bash
   # Search for hardcoded text
   grep -r "\"[A-Z][a-z]" src/components --include="*.tsx"
   ```

3. Replace hardcoded strings with translation keys:
   ```typescript
   // Before
   <h1>Welcome to Psychage</h1>

   // After
   import { useTranslation } from 'react-i18next';
   const { t } = useTranslation();
   <h1>{t('home.welcome')}</h1>
   ```

4. Create translation extraction script:
   ```bash
   # Or use i18next-parser
   npx i18next-parser
   ```

5. Complete translations for all locales:
   - Use translation service or AI assistance
   - Ensure medical terms are accurate
   - Include plural forms where needed

6. Add language persistence:
   ```typescript
   // Save language preference
   localStorage.setItem('i18nextLng', language);
   ```

7. Add missing LanguageSwitcher if not functional

Acceptance Criteria:
- All visible text uses t() function
- All 5 locales have complete translations
- Language persists across sessions
- No broken text when switching languages
```

---

## Task 6: Add Bulk Bookmark Actions

**Status**: [ ] Not Started

**Problem**: Bookmarks page lacks bulk actions for managing many items.

**Files to Modify**:
- `src/pages/dashboard/BookmarksPage.tsx`

### Prompt

```
Add bulk action functionality to the bookmarks page.

Requirements:
1. Add multi-select mode:
   ```typescript
   const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
   const [isSelectMode, setIsSelectMode] = useState(false);

   const toggleSelect = (id: string) => {
     const newSelected = new Set(selectedIds);
     if (newSelected.has(id)) {
       newSelected.delete(id);
     } else {
       newSelected.add(id);
     }
     setSelectedIds(newSelected);
   };
   ```

2. Add bulk action toolbar:
   ```typescript
   {isSelectMode && selectedIds.size > 0 && (
     <div className="sticky top-0 bg-white p-4 border-b flex items-center gap-4">
       <span>{selectedIds.size} selected</span>
       <Button onClick={handleRemoveSelected}>Remove Selected</Button>
       <Button variant="outline" onClick={handleSelectAll}>
         {selectedIds.size === bookmarks.length ? 'Deselect All' : 'Select All'}
       </Button>
       <Button variant="ghost" onClick={() => setIsSelectMode(false)}>
         Cancel
       </Button>
     </div>
   )}
   ```

3. Add checkbox to each bookmark card:
   ```typescript
   <div className="relative">
     {isSelectMode && (
       <Checkbox
         checked={selectedIds.has(bookmark.id)}
         onChange={() => toggleSelect(bookmark.id)}
         className="absolute top-2 left-2"
       />
     )}
     <BookmarkCard ... />
   </div>
   ```

4. Implement bulk remove:
   ```typescript
   const handleRemoveSelected = async () => {
     const confirmed = window.confirm(
       `Remove ${selectedIds.size} bookmarks?`
     );
     if (!confirmed) return;

     await Promise.all(
       Array.from(selectedIds).map(id =>
         bookmarkService.remove('article', id)
       )
     );

     setBookmarks(prev => prev.filter(b => !selectedIds.has(b.id)));
     setSelectedIds(new Set());
     setIsSelectMode(false);
   };
   ```

5. Add entry point button:
   ```typescript
   <Button
     variant="outline"
     onClick={() => setIsSelectMode(!isSelectMode)}
   >
     {isSelectMode ? 'Done' : 'Select'}
   </Button>
   ```

6. Consider adding:
   - Move to folder/category
   - Export bookmarks
   - Sort options

Acceptance Criteria:
- Can select multiple bookmarks
- Bulk remove works
- Select all/deselect all
- Visual feedback on selection
- Confirmation before destructive actions
```

---

## Task 7: Add Custom 404 and Error Pages

**Status**: [ ] Not Started

**Problem**: Generic error pages could be more helpful and on-brand.

**Files to Modify**:
- `src/components/pages/NotFoundPage.tsx`
- `src/components/error/ErrorFallback.tsx`

### Prompt

```
Enhance error pages with better UX and branding.

Requirements:
1. Improve NotFoundPage.tsx:
   ```typescript
   const NotFoundPage = () => {
     const [searchQuery, setSearchQuery] = useState('');

     return (
       <div className="min-h-[60vh] flex items-center justify-center">
         <div className="text-center max-w-lg">
           {/* Fun illustration */}
           <div className="text-8xl mb-4">🧭</div>

           <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
           <p className="text-gray-600 mb-6">
             The page you're looking for doesn't exist or has been moved.
           </p>

           {/* Search to help find what they wanted */}
           <div className="mb-6">
             <Input
               placeholder="Search for content..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
             />
           </div>

           {/* Helpful links */}
           <div className="flex flex-wrap justify-center gap-3">
             <Link to="/">
               <Button variant="primary">Go Home</Button>
             </Link>
             <Link to="/learn">
               <Button variant="outline">Browse Articles</Button>
             </Link>
             <Link to="/tools">
               <Button variant="outline">Explore Tools</Button>
             </Link>
           </div>

           {/* Report if this shouldn't be 404 */}
           <p className="text-sm text-gray-500 mt-8">
             Think this is a mistake?{' '}
             <Link to="/contact" className="underline">Let us know</Link>
           </p>
         </div>
       </div>
     );
   };
   ```

2. Improve ErrorFallback.tsx:
   - Add support contact information
   - Add error ID for support reference
   - Add "What happened" explanation
   - Offer clear recovery paths

3. Add specific error pages:
   - 403 Forbidden (unauthorized)
   - 500 Server Error
   - Network Error (offline)

4. Add offline detection:
   ```typescript
   const [isOnline, setIsOnline] = useState(navigator.onLine);

   useEffect(() => {
     const handleOnline = () => setIsOnline(true);
     const handleOffline = () => setIsOnline(false);

     window.addEventListener('online', handleOnline);
     window.addEventListener('offline', handleOffline);

     return () => {
       window.removeEventListener('online', handleOnline);
       window.removeEventListener('offline', handleOffline);
     };
   }, []);
   ```

Acceptance Criteria:
- 404 page is helpful and on-brand
- Error pages offer recovery paths
- Offline state handled gracefully
- Support contact available
```

---

## Task 8: Add Keyboard Shortcuts

**Status**: [ ] Not Started

**Problem**: Power users would benefit from keyboard navigation.

**Files to Create**:
- `src/hooks/useKeyboardShortcuts.ts`
- `src/components/ui/ShortcutsModal.tsx`

### Prompt

```
Implement keyboard shortcuts for common actions.

Requirements:
1. Create keyboard shortcuts hook:
   ```typescript
   // src/hooks/useKeyboardShortcuts.ts
   interface Shortcut {
     key: string;
     ctrl?: boolean;
     shift?: boolean;
     alt?: boolean;
     action: () => void;
     description: string;
   }

   export const useKeyboardShortcuts = (shortcuts: Shortcut[]) => {
     useEffect(() => {
       const handler = (e: KeyboardEvent) => {
         // Don't trigger in input fields
         if (e.target instanceof HTMLInputElement) return;
         if (e.target instanceof HTMLTextAreaElement) return;

         shortcuts.forEach(shortcut => {
           const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
           const ctrlMatch = shortcut.ctrl ? e.ctrlKey || e.metaKey : true;
           const shiftMatch = shortcut.shift ? e.shiftKey : true;
           const altMatch = shortcut.alt ? e.altKey : true;

           if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
             e.preventDefault();
             shortcut.action();
           }
         });
       };

       window.addEventListener('keydown', handler);
       return () => window.removeEventListener('keydown', handler);
     }, [shortcuts]);
   };
   ```

2. Add global shortcuts:
   - `/` - Focus search
   - `?` - Show shortcuts help
   - `Escape` - Close modals
   - `g h` - Go home
   - `g l` - Go to learn
   - `g t` - Go to tools
   - `g d` - Go to dashboard (if logged in)

3. Create ShortcutsModal:
   - List all available shortcuts
   - Grouped by category
   - Open with `?` key

4. Add to navigation:
   ```typescript
   // Already has Cmd+K for search
   // Add indicator showing available shortcuts
   <span className="text-xs text-gray-400">
     Press ? for shortcuts
   </span>
   ```

5. Consider vim-like navigation for lists:
   - `j` - Next item
   - `k` - Previous item
   - `Enter` - Open item

Acceptance Criteria:
- Shortcuts work globally
- Help modal shows all shortcuts
- Shortcuts don't interfere with form input
- Works on Mac (Cmd) and Windows (Ctrl)
```

---

## Completion Checklist

When all P3 tasks are complete:

- [ ] Storybook has component stories
- [ ] API requests are cached
- [ ] Analytics tracking implemented
- [ ] Real-time notifications work
- [ ] All languages fully translated
- [ ] Bulk bookmark actions work
- [ ] Error pages are polished
- [ ] Keyboard shortcuts available

**Congratulations! The project is now fully polished.**
