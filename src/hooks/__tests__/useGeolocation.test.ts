 
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGeolocation } from '../useGeolocation';

describe('useGeolocation', () => {
    const mockGetCurrentPosition = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(navigator, 'geolocation', {
            value: { getCurrentPosition: mockGetCurrentPosition },
            writable: true,
            configurable: true,
        });
    });

    it('should initialize with default state', () => {
        const { result } = renderHook(() => useGeolocation());

        expect(result.current.latitude).toBeNull();
        expect(result.current.longitude).toBeNull();
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.isSupported).toBe(true);
    });

    it('should set coordinates on successful location request', async () => {
        mockGetCurrentPosition.mockImplementation((success) => {
            success({ coords: { latitude: 40.7128, longitude: -74.006 } });
        });

        const { result } = renderHook(() => useGeolocation());

        act(() => {
            result.current.requestLocation();
        });

        expect(result.current.latitude).toBe(40.7128);
        expect(result.current.longitude).toBe(-74.006);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should handle permission denied error', () => {
        mockGetCurrentPosition.mockImplementation((_success, error) => {
            error({ code: 1, PERMISSION_DENIED: 1 });
        });

        const { result } = renderHook(() => useGeolocation());

        act(() => {
            result.current.requestLocation();
        });

        expect(result.current.error).toContain('denied');
        expect(result.current.isLoading).toBe(false);
    });

    it('should handle position unavailable error', () => {
        mockGetCurrentPosition.mockImplementation((_success, error) => {
            error({ code: 2, POSITION_UNAVAILABLE: 2 });
        });

        const { result } = renderHook(() => useGeolocation());

        act(() => {
            result.current.requestLocation();
        });

        expect(result.current.error).toContain('unavailable');
    });

    it('should handle timeout error', () => {
        mockGetCurrentPosition.mockImplementation((_success, error) => {
            error({ code: 3, TIMEOUT: 3 });
        });

        const { result } = renderHook(() => useGeolocation());

        act(() => {
            result.current.requestLocation();
        });

        expect(result.current.error).toContain('timed out');
    });

    it('should clear location data', () => {
        mockGetCurrentPosition.mockImplementation((success) => {
            success({ coords: { latitude: 40.7128, longitude: -74.006 } });
        });

        const { result } = renderHook(() => useGeolocation());

        act(() => {
            result.current.requestLocation();
        });

        expect(result.current.latitude).toBe(40.7128);

        act(() => {
            result.current.clearLocation();
        });

        expect(result.current.latitude).toBeNull();
        expect(result.current.longitude).toBeNull();
        expect(result.current.error).toBeNull();
    });
});
