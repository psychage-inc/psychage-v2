 
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BookmarkProvider, useBookmarks } from '../BookmarkContext';

// Default mock: unauthenticated
const mockUseAuth = vi.fn().mockReturnValue({
    isAuthenticated: false,
    user: null,
});

vi.mock('../AuthContext', () => ({
    useAuth: () => mockUseAuth(),
}));

// Mock bookmarkService to avoid Supabase calls
vi.mock('../../services/bookmarkService', () => ({
    bookmarkService: {
        getAll: vi.fn().mockResolvedValue([]),
        toggle: vi.fn().mockResolvedValue({ bookmarked: true }),
        add: vi.fn().mockResolvedValue(undefined),
    },
    Bookmark: {},
}));

describe('BookmarkContext', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.spyOn(console, 'error').mockImplementation(() => {});
        mockUseAuth.mockReturnValue({
            isAuthenticated: false,
            user: null,
        });
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BookmarkProvider>{children}</BookmarkProvider>
    );

    it('should throw when used outside provider', () => {
        expect(() => {
            renderHook(() => useBookmarks());
        }).toThrow('useBookmarks must be used within a BookmarkProvider');
    });

    it('should initialize with empty bookmarks when unauthenticated', () => {
        const { result } = renderHook(() => useBookmarks(), { wrapper });
        expect(result.current.bookmarks).toEqual([]);
    });

    it('should return false (auth required) when toggling while unauthenticated', () => {
        const { result } = renderHook(() => useBookmarks(), { wrapper });

        let toggled: boolean;
        act(() => {
            toggled = result.current.toggleBookmark('article-1');
        });

        expect(toggled!).toBe(false);
        expect(result.current.bookmarks).toEqual([]);
        expect(result.current.isBookmarked('article-1')).toBe(false);
    });

    describe('when authenticated', () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                isAuthenticated: true,
                user: { id: 'user-1', email: 'test@test.com', role: 'patient', display_name: '', avatar_url: '' },
            });
        });

        it('should toggle bookmark on and return true', () => {
            const { result } = renderHook(() => useBookmarks(), { wrapper });

            let toggled: boolean;
            act(() => {
                toggled = result.current.toggleBookmark('article-1');
            });

            expect(toggled!).toBe(true);
            expect(result.current.bookmarks).toContain('article-1');
            expect(result.current.isBookmarked('article-1')).toBe(true);
        });

        it('should toggle bookmark off', () => {
            const { result } = renderHook(() => useBookmarks(), { wrapper });

            act(() => {
                result.current.toggleBookmark('article-1');
            });
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
    });

    it('should return false for non-bookmarked items', () => {
        const { result } = renderHook(() => useBookmarks(), { wrapper });
        expect(result.current.isBookmarked('nonexistent')).toBe(false);
    });
});
