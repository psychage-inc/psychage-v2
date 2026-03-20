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

    const hydrateFromSupabase = async () => {
      try {
        const serverBookmarks = await bookmarkService.getAll(user.id);
        const serverIds = serverBookmarks.map((b: Bookmark) => b.resource_id);
        setBookmarks(serverIds);
        persistToLocalStorage(serverIds);
        hydrated.current = true;
      } catch (error) {
        console.error('Failed to hydrate bookmarks from Supabase:', error);
      }
    };

    hydrateFromSupabase();
  }, [isAuthenticated, user?.id]);

  // Clear bookmarks and reset hydration on logout
  useEffect(() => {
    if (!isAuthenticated) {
      hydrated.current = false;
      setBookmarks([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [isAuthenticated]);

  const toggleBookmark = useCallback((id: string | number): boolean => {
    // Require authentication for bookmarks
    if (!isAuthenticated || !user?.id) {
      return false;
    }

    setBookmarks(prev => {
      const exists = prev.includes(id);
      const newBookmarks = exists
        ? prev.filter(b => b !== id)
        : [...prev, id];

      persistToLocalStorage(newBookmarks);

      // Optimistic update with rollback on server failure
      bookmarkService.toggle(user.id, 'article', String(id)).catch(err => {
        console.error('Failed to sync bookmark to Supabase:', err);
        // Rollback: restore previous state
        setBookmarks(prev);
        persistToLocalStorage(prev);
      });

      return newBookmarks;
    });

    return true;
  }, [isAuthenticated, user?.id]);

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
