 
// @vitest-environment jsdom
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it('should debounce function calls', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useDebounce(callback, 300));

        // Call multiple times rapidly
        act(() => {
            result.current('call 1');
            result.current('call 2');
            result.current('call 3');
        });

        // Callback should not have been called yet
        expect(callback).not.toHaveBeenCalled();

        // Fast forward time
        act(() => {
            vi.advanceTimersByTime(300);
        });

        // Callback should have been called only once with the last argument
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith('call 3');
    });

    it('should use custom delay', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useDebounce(callback, 500));

        act(() => {
            result.current('test');
        });

        // Should not be called before delay
        act(() => {
            vi.advanceTimersByTime(400);
        });
        expect(callback).not.toHaveBeenCalled();

        // Should be called after delay
        act(() => {
            vi.advanceTimersByTime(100);
        });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should reset timer on subsequent calls', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useDebounce(callback, 300));

        act(() => {
            result.current('call 1');
        });

        act(() => {
            vi.advanceTimersByTime(200);
        });

        // Call again before timer completes
        act(() => {
            result.current('call 2');
        });

        // Advance only 200ms more (total 400ms from first call, but only 200ms from second)
        act(() => {
            vi.advanceTimersByTime(200);
        });

        // Should not have been called yet (timer was reset)
        expect(callback).not.toHaveBeenCalled();

        // Advance remaining time
        act(() => {
            vi.advanceTimersByTime(100);
        });

        // Should be called with second argument
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith('call 2');
    });

    it('should cleanup timeout on unmount', () => {
        const callback = vi.fn();
        const { result, unmount } = renderHook(() => useDebounce(callback, 300));

        act(() => {
            result.current('test');
        });

        unmount();

        act(() => {
            vi.advanceTimersByTime(300);
        });

        // Callback should not be called after unmount
        expect(callback).not.toHaveBeenCalled();
    });

    it('should handle multiple arguments', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useDebounce(callback, 300));

        act(() => {
            result.current('arg1', 'arg2', 'arg3');
        });

        act(() => {
            vi.advanceTimersByTime(300);
        });

        expect(callback).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
    });
});
