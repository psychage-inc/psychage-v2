import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProviderProfile } from '../useProviderProfile';

vi.mock('@/lib/providers/queries', () => ({
    getProviderById: vi.fn(),
}));

import { getProviderById } from '@/lib/providers/queries';

const mockProvider = {
    id: 'provider-1',
    name: 'Dr. Test',
    specialty: 'Psychology',
};

describe('useProviderProfile', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should fetch provider by ID', async () => {
        vi.mocked(getProviderById).mockResolvedValue(mockProvider as any);

        const { result } = renderHook(() => useProviderProfile('provider-1'));

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.provider).toEqual(mockProvider);
        expect(result.current.error).toBeNull();
    });

    it('should handle undefined ID', async () => {
        const { result } = renderHook(() => useProviderProfile(undefined));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.error).toBe('No provider ID provided');
        expect(result.current.provider).toBeNull();
    });

    it('should handle provider not found', async () => {
        vi.mocked(getProviderById).mockResolvedValue(null as any);

        const { result } = renderHook(() => useProviderProfile('nonexistent'));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.error).toBe('Provider not found');
    });

    it('should handle fetch error', async () => {
        vi.mocked(getProviderById).mockRejectedValue(new Error('Network error'));

        const { result } = renderHook(() => useProviderProfile('provider-1'));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.error).toBe('Failed to load provider profile');
    });

    it('should re-fetch when ID changes', async () => {
        vi.mocked(getProviderById).mockResolvedValue(mockProvider as any);

        const { result, rerender } = renderHook(
            ({ id }) => useProviderProfile(id),
            { initialProps: { id: 'provider-1' } }
        );

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(getProviderById).toHaveBeenCalledWith('provider-1');

        rerender({ id: 'provider-2' });

        await waitFor(() => {
            expect(getProviderById).toHaveBeenCalledWith('provider-2');
        });
    });
});
