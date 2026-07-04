 
import React, { useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { bookmarkService, Bookmark } from '../services/bookmarkService';

interface BookmarkContextType {
  bookmarks: (string | number)[];
  /** Returns true if the bookmark was toggled. Returns false if auth is required. */
  toggleBookmark: (id: string | number) => boolean;
  isBookmarked: (id: string | number) => boolean;
}

const STORAGE_KEY = 'psychage_bookmarks';

const BookmarkContext = React.createContext<BookmarkContextType | undefined>(undefined);
export { BookmarkContext };

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [bookmarks, setBookmarks] = useState<(string | number)[]>([]);
  const hydrated = useRef(false);
  // Mirror of `bookmarks` updated synchronously, so a rapid second toggle in
  // the same tick reads the first toggle's result (state hasn't re-rendered
  // yet) — the decision can't go stale. Keep it in sync wherever bookmarks change.
  const bookmarksRef = useRef<(string | number)[]>([]);
  const applyBookmarks = useCallback((next: (string | number)[]) => {
    bookmarksRef.current = next;
    setBookmarks(next);
    persistToLocalStorage(next);
  }, []);

  // Hydrate from Supabase when user logs in
  useEffect(() => {
    if (!isAuthenticated || !user?.id || hydrated.current) return;

    let cancelled = false;
    const hydrateFromSupabase = async () => {
      try {
        const serverBookmarks = await bookmarkService.getAll(user.id);
        // Guard against a late resolution after logout / user switch, which
        // would otherwise restore the previous user's bookmarks and set
        // hydrated=true, blocking the next user's hydration.
        if (cancelled) return;
        const serverIds = serverBookmarks.map((b: Bookmark) => b.resource_id);
        applyBookmarks(serverIds);
        hydrated.current = true;
      } catch (error) {
        if (!cancelled) console.error('Failed to hydrate bookmarks from Supabase:', error);
      }
    };

    hydrateFromSupabase();
    return () => { cancelled = true; };
  }, [isAuthenticated, user?.id, applyBookmarks]);

  // Clear bookmarks and reset hydration on logout
  useEffect(() => {
    if (!isAuthenticated) {
      hydrated.current = false;
      bookmarksRef.current = [];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBookmarks([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [isAuthenticated]);

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const toggleBookmark = useCallback((id: string | number): boolean => {
    // Require authentication for bookmarks
    if (!isAuthenticated || !user?.id) {
      return false;
    }

    // Decide from the synchronous ref, not the render-cycle `bookmarks`, so a
    // rapid double-toggle sees the prior toggle. The server call runs outside a
    // state updater so it fires exactly once (a side-effect inside the updater
    // would be double-invoked under StrictMode).
    const current = bookmarksRef.current;
    const exists = current.includes(id);
    const newBookmarks = exists
      ? current.filter(b => b !== id)
      : [...current, id];

    applyBookmarks(newBookmarks);

    bookmarkService.toggle(user.id, 'article', String(id)).catch(err => {
      console.error('Failed to sync bookmark to Supabase:', err);
      // Rollback from the latest ref value so we don't clobber a concurrent toggle
      const latest = bookmarksRef.current;
      applyBookmarks(
        exists
          ? [...latest, id]              // was removed, add back
          : latest.filter(b => b !== id) // was added, remove
      );
    });

    return true;
  }, [isAuthenticated, user?.id, applyBookmarks]);

  const isBookmarked = useCallback((id: string | number) => bookmarks.includes(id), [bookmarks]);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

function persistToLocalStorage(bookmarks: (string | number)[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch {
    // QuotaExceededError — degrade gracefully
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
