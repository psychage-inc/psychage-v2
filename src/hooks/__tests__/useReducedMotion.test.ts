import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useReducedMotion } from '../useReducedMotion';

describe('useReducedMotion', () => {
    let matchMediaListeners: Array<() => void>;
    let mockMediaQueryList: { matches: boolean; media: string; addEventListener: ReturnType<typeof vi.fn>; removeEventListener: ReturnType<typeof vi.fn> };

    beforeEach(() => {
        matchMediaListeners = [];

        mockMediaQueryList = {
            matches: false,
            media: '(prefers-reduced-motion: reduce)',
            addEventListener: vi.fn((event: string, handler: () => void) => {
                if (event === 'change') matchMediaListeners.push(handler);
            }),
            removeEventListener: vi.fn((event: string, handler: () => void) => {
                matchMediaListeners = matchMediaListeners.filter(h => h !== handler);
            }),
        };

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockReturnValue(mockMediaQueryList),
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return false when prefers-reduced-motion is not set', () => {
        const { result } = renderHook(() => useReducedMotion());
        expect(result.current).toBe(false);
    });

    it('should return true when prefers-reduced-motion: reduce is set', () => {
        mockMediaQueryList.matches = true;
        const { result } = renderHook(() => useReducedMotion());
        expect(result.current).toBe(true);
    });

    it('should update when media query changes', () => {
        const { result } = renderHook(() => useReducedMotion());
        expect(result.current).toBe(false);

        act(() => {
            mockMediaQueryList.matches = true;
            matchMediaListeners.forEach(handler => handler());
        });

        expect(result.current).toBe(true);
    });

    it('should clean up event listener on unmount', () => {
        const { unmount } = renderHook(() => useReducedMotion());
        expect(matchMediaListeners.length).toBe(1);
        unmount();
        expect(matchMediaListeners.length).toBe(0);
    });
});
