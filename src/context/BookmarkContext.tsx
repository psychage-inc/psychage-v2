 
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
        setBookmarks(serverIds);
        persistToLocalStorage(serverIds);
        hydrated.current = true;
      } catch (error) {
        if (!cancelled) console.error('Failed to hydrate bookmarks from Supabase:', error);
      }
    };

    hydrateFromSupabase();
    return () => { cancelled = true; };
  }, [isAuthenticated, user?.id]);

  // Clear bookmarks and reset hydration on logout
  useEffect(() => {
    if (!isAuthenticated) {
      hydrated.current = false;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBookmarks([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [isAuthenticated]);

  const toggleBookmark = useCallback((id: string | number): boolean => {
    // Require authentication for bookmarks
    if (!isAuthenticated || !user?.id) {
      return false;
    }

    const exists = bookmarks.includes(id);
    const newBookmarks = exists
      ? bookmarks.filter(b => b !== id)
      : [...bookmarks, id];

    // Optimistic update. The server call runs outside the state updater so it
    // fires exactly once (a side-effect inside the updater is double-invoked
    // under StrictMode, which would toggle the server row twice).
    setBookmarks(newBookmarks);
    persistToLocalStorage(newBookmarks);

    bookmarkService.toggle(user.id, 'article', String(id)).catch(err => {
      console.error('Failed to sync bookmark to Supabase:', err);
      // Rollback via updater to avoid clobbering concurrent toggles
      setBookmarks(current => {
        const rollback = exists
          ? [...current, id]   // was removed, add back
          : current.filter(b => b !== id); // was added, remove
        persistToLocalStorage(rollback);
        return rollback;
      });
    });

    return true;
  }, [isAuthenticated, user?.id, bookmarks]);

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
