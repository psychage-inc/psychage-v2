 
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useNPIVerification } from '../useNPIVerification';

vi.mock('@/lib/providers/npiMappers', () => ({
    verifyNPI: vi.fn(),
}));

import { verifyNPI } from '@/lib/providers/npiMappers';

const mockResult = {
    valid: true,
    npi: '1234567890',
    providerName: 'Dr. Test',
};

describe('useNPIVerification', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize with null result and not loading', () => {
        const { result } = renderHook(() => useNPIVerification());

        expect(result.current.result).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });

    it('should verify NPI number and return result', async () => {
        vi.mocked(verifyNPI).mockResolvedValue(mockResult as any);

        const { result } = renderHook(() => useNPIVerification());

        let verifyResult: any;
        await act(async () => {
            verifyResult = await result.current.verify('1234567890');
        });

        expect(verifyNPI).toHaveBeenCalledWith('1234567890');
        expect(result.current.result).toEqual(mockResult);
        expect(result.current.isLoading).toBe(false);
        expect(verifyResult).toEqual(mockResult);
    });

    it('should set loading state during verification', async () => {
        let resolvePromise: (v: any) => void;
        vi.mocked(verifyNPI).mockReturnValue(
            new Promise(resolve => { resolvePromise = resolve; })
        );

        const { result } = renderHook(() => useNPIVerification());

        act(() => {
            result.current.verify('1234567890');
        });

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            resolvePromise!(mockResult);
        });

        expect(result.current.isLoading).toBe(false);
    });

    it('should reset state', async () => {
        vi.mocked(verifyNPI).mockResolvedValue(mockResult as any);

        const { result } = renderHook(() => useNPIVerification());

        await act(async () => {
            await result.current.verify('1234567890');
        });

        expect(result.current.result).not.toBeNull();

        act(() => {
            result.current.reset();
        });

        expect(result.current.result).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });
});
