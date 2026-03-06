import React, { useContext, useState, ReactNode } from 'react';

interface BookmarkContextType {
  bookmarks: (string | number)[];
  toggleBookmark: (id: string | number) => void;
  isBookmarked: (id: string | number) => boolean;
}

const BookmarkContext = React.createContext<BookmarkContextType | undefined>(undefined);
export { BookmarkContext };

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<(string | number)[]>(() => {
    try {
      const saved = localStorage.getItem('psychage_bookmarks');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse bookmarks from storage', e);
    }
    return [];
  });

  const toggleBookmark = (id: string | number) => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(id)
        ? prev.filter(b => b !== id)
        : [...prev, id];

      try {
        localStorage.setItem('psychage_bookmarks', JSON.stringify(newBookmarks));
      } catch {
        // QuotaExceededError — degrade gracefully, state still updates in memory
      }
      return newBookmarks;
    });
  };

  const isBookmarked = (id: string | number) => bookmarks.includes(id);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
