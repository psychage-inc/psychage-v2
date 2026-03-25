 
import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAsyncData } from '../useAsyncData';

describe('useAsyncData', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should start in loading state when immediate is true (default)', () => {
        const fetcher = vi.fn(() => new Promise<string>(() => {})); // never resolves
        const { result } = renderHook(() => useAsyncData(fetcher));

        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();
    });

    it('should fetch data on mount and set data', async () => {
        const fetcher = vi.fn().mockResolvedValue('test data');
        const { result } = renderHook(() => useAsyncData(fetcher));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.data).toBe('test data');
        expect(result.current.error).toBeNull();
    });

    it('should handle fetch error', async () => {
        const fetcher = vi.fn().mockRejectedValue(new Error('fetch failed'));
        const { result } = renderHook(() => useAsyncData(fetcher));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.data).toBeNull();
        expect(result.current.error).not.toBeNull();
    });

    it('should not fetch when immediate is false', () => {
        const fetcher = vi.fn().mockResolvedValue('data');
        const { result } = renderHook(() =>
            useAsyncData(fetcher, [], { immediate: false })
        );

        expect(result.current.loading).toBe(false);
        expect(fetcher).not.toHaveBeenCalled();
    });

    it('should call onSuccess callback', async () => {
        const onSuccess = vi.fn();
        const fetcher = vi.fn().mockResolvedValue('success data');
        renderHook(() => useAsyncData(fetcher, [], { onSuccess }));

        await waitFor(() => {
            expect(onSuccess).toHaveBeenCalledWith('success data');
        });
    });

    it('should call onError callback on failure', async () => {
        const onError = vi.fn();
        const fetcher = vi.fn().mockRejectedValue(new Error('oops'));
        renderHook(() => useAsyncData(fetcher, [], { onError }));

        await waitFor(() => {
            expect(onError).toHaveBeenCalled();
        });
    });

    it('should support refetch', async () => {
        let callCount = 0;
        const fetcher = vi.fn().mockImplementation(() => {
            callCount++;
            return Promise.resolve(`data-${callCount}`);
        });

        const { result } = renderHook(() => useAsyncData(fetcher));

        await waitFor(() => {
            expect(result.current.data).toBe('data-1');
        });

        await act(async () => {
            await result.current.refetch();
        });

        expect(result.current.data).toBe('data-2');
    });

    it('should support reset', async () => {
        const fetcher = vi.fn().mockResolvedValue('data');
        const { result } = renderHook(() => useAsyncData(fetcher));

        await waitFor(() => {
            expect(result.current.data).toBe('data');
        });

        act(() => {
            result.current.reset();
        });

        expect(result.current.data).toBeNull();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });
});
