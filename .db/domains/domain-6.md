# Domain 6: Bookmarks

## Code Path Trace

### Dual Persistence
- **localStorage**: `psychage_bookmarks` — array of resource IDs
- **Supabase**: `bookmarks` table (columns: id, user_id, resource_type, resource_id, created_at)
- **Pattern**: Hydrate from Supabase on login → optimistic update → fire-and-forget sync

### BookmarkContext.tsx
1. On auth: `bookmarkService.getAll(user.id)` → setBookmarks(serverIds)
2. Toggle: optimistic update → `bookmarkService.toggle()` → rollback on failure
3. Logout: clear state + remove localStorage

### bookmarkService.ts
- `getAll(userId)` → Supabase SELECT with localStorage fallback
- `toggle(userId, type, resourceId)` → check exists → add or remove
- `add()` → Supabase INSERT, localStorage fallback with `local_` prefix IDs
- `remove()` → Supabase DELETE, always removes from localStorage

## Issues Found

| id | severity | issue | file | line | proposed_fix |
|---|---|---|---|---|---|
| BK-001 | minor | Rollback closure captures `prev` correctly BUT doesn't use updater function — rapid toggles of different items can cause state loss | BookmarkContext.tsx | 71 | Use updater: `setBookmarks(cur => exists ? [...cur, id] : cur.filter(...))` |
| BK-002 | minor | Hard-coded `'article'` resource type in toggle call — assumes all bookmarks are articles | BookmarkContext.tsx | 68 | Info — currently only articles are bookmarkable |
| BK-003 | minor | Local bookmarks with `local_` prefix never sync back to Supabase | bookmarkService.ts | ~110 | Info — edge case for offline-created bookmarks |

## RLS Verified
- ✅ SELECT: auth.uid() = user_id (own only)
- ✅ INSERT: auth.uid() = user_id (own only)
- ✅ DELETE: auth.uid() = user_id (own only)
- ✅ No UPDATE policy — correct (toggle = delete + insert)
- ✅ No anon access

## Edge Cases Verified
- ✅ Add bookmark works (logged in) — Supabase INSERT + localStorage
- ✅ Remove bookmark works — Supabase DELETE + localStorage
- ✅ Bookmark persists across page refresh (localStorage)
- ✅ Duplicate bookmarks: UNIQUE constraint on (user_id, resource_type, resource_id) prevents DB duplicates
- ✅ Logout clears bookmarks and resets hydration flag
- ⚠️ Rapid toggles: rollback closure issue (BK-001) — low impact, edge case
