import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BookmarkProvider, useBookmarks } from '../BookmarkContext';

// Mock AuthContext — BookmarkProvider calls useAuth() internally
vi.mock('../AuthContext', () => ({
    useAuth: () => ({
        isAuthenticated: false,
        user: null,
        session: null,
        loading: false,
        signIn: vi.fn(),
        signOut: vi.fn(),
        signUp: vi.fn(),
    }),
}));

describe('BookmarkContext', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BookmarkProvider>{children}</BookmarkProvider>
    );

    it('should throw when used outside provider', () => {
        expect(() => {
            renderHook(() => useBookmarks());
        }).toThrow('useBookmarks must be used within a BookmarkProvider');
    });

    it('should initialize with empty bookmarks', () => {
        const { result } = renderHook(() => useBookmarks(), { wrapper });
        expect(result.current.bookmarks).toEqual([]);
    });

    it('should load bookmarks from localStorage', () => {
        localStorage.setItem('psychage_bookmarks', JSON.stringify(['id-1', 'id-2']));
        const { result } = renderHook(() => useBookmarks(), { wrapper });
        expect(result.current.bookmarks).toEqual(['id-1', 'id-2']);
    });

    it('should handle corrupted localStorage data', () => {
        localStorage.setItem('psychage_bookmarks', 'not-json');
        const { result } = renderHook(() => useBookmarks(), { wrapper });
        expect(result.current.bookmarks).toEqual([]);
    });

    it('should handle non-array localStorage data', () => {
        localStorage.setItem('psychage_bookmarks', JSON.stringify({ not: 'array' }));
        const { result } = renderHook(() => useBookmarks(), { wrapper });
        expect(result.current.bookmarks).toEqual([]);
    });

    it('should toggle bookmark on', () => {
        const { result } = renderHook(() => useBookmarks(), { wrapper });

        act(() => {
            result.current.toggleBookmark('article-1');
        });

        expect(result.current.bookmarks).toContain('article-1');
        expect(result.current.isBookmarked('article-1')).toBe(true);
    });

    it('should toggle bookmark off', () => {
        localStorage.setItem('psychage_bookmarks', JSON.stringify(['article-1']));
        const { result } = renderHook(() => useBookmarks(), { wrapper });

        expect(result.current.isBookmarked('article-1')).toBe(true);

        act(() => {
            result.current.toggleBookmark('article-1');
        });

        expect(result.current.isBookmarked('article-1')).toBe(false);
    });

    it('should persist bookmarks to localStorage', () => {
        const { result } = renderHook(() => useBookmarks(), { wrapper });

        act(() => {
            result.current.toggleBookmark('article-1');
        });

        const stored = JSON.parse(localStorage.getItem('psychage_bookmarks')!);
        expect(stored).toContain('article-1');
    });

    it('should handle numeric IDs', () => {
        const { result } = renderHook(() => useBookmarks(), { wrapper });

        act(() => {
            result.current.toggleBookmark(42);
        });

        expect(result.current.isBookmarked(42)).toBe(true);
        expect(result.current.isBookmarked('42')).toBe(false);
    });

    it('should return false for non-bookmarked items', () => {
        const { result } = renderHook(() => useBookmarks(), { wrapper });
        expect(result.current.isBookmarked('nonexistent')).toBe(false);
    });
});
