import React, { useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { bookmarkService, Bookmark } from '../services/bookmarkService';

interface BookmarkContextType {
  bookmarks: (string | number)[];
  toggleBookmark: (id: string | number) => void;
  isBookmarked: (id: string | number) => boolean;
}

const STORAGE_KEY = 'psychage_bookmarks';

const BookmarkContext = React.createContext<BookmarkContextType | undefined>(undefined);
export { BookmarkContext };

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [bookmarks, setBookmarks] = useState<(string | number)[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse bookmarks from storage', e);
    }
    return [];
  });
  const hydrated = useRef(false);

  // Hydrate from Supabase when user logs in
  useEffect(() => {
    if (!isAuthenticated || !user?.id || hydrated.current) return;

    const hydrateFromSupabase = async () => {
      try {
        const serverBookmarks = await bookmarkService.getAll(user.id);
        const serverIds = serverBookmarks.map((b: Bookmark) => b.resource_id);

        // Merge: local bookmarks that aren't on server get synced up
        const localOnly = bookmarks.filter(id => !serverIds.includes(String(id)));
        for (const id of localOnly) {
          await bookmarkService.add(user.id, 'article', String(id));
        }

        // Use server as source of truth (plus any just-synced locals)
        const merged = [...new Set([...serverIds, ...localOnly.map(String)])];
        setBookmarks(merged);
        persistToLocalStorage(merged);
        hydrated.current = true;
      } catch (error) {
        console.error('Failed to hydrate bookmarks from Supabase:', error);
      }
    };

    hydrateFromSupabase();
  }, [isAuthenticated, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset hydration flag on logout
  useEffect(() => {
    if (!isAuthenticated) {
      hydrated.current = false;
    }
  }, [isAuthenticated]);

  const toggleBookmark = useCallback((id: string | number) => {
    setBookmarks(prev => {
      const exists = prev.includes(id);
      const newBookmarks = exists
        ? prev.filter(b => b !== id)
        : [...prev, id];

      persistToLocalStorage(newBookmarks);

      // Sync to Supabase in the background when authenticated
      if (isAuthenticated && user?.id) {
        bookmarkService.toggle(user.id, 'article', String(id)).catch(err => {
          console.error('Failed to sync bookmark to Supabase:', err);
        });
      }

      return newBookmarks;
    });
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
