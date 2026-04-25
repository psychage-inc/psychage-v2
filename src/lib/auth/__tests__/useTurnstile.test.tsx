import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

/**
 * Coverage for AUTH-029: useTurnstile hook gracefully degrades when
 * VITE_TURNSTILE_SITE_KEY is not configured (dev/CI/no-key
 * environments). The hook returns a non-null token sentinel + no
 * widget so forms can submit, and warns once.
 */

vi.mock('@marsidev/react-turnstile', () => ({
    Turnstile: () => null,
}));

import { useTurnstile } from '../useTurnstile';

describe('useTurnstile — AUTH-029', () => {
    beforeEach(() => {
        vi.unstubAllEnvs();
        // Clear the per-window warn-once flag between tests.
        delete (window as unknown as { __turnstileWarned?: boolean }).__turnstileWarned;
        vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    it('returns the disabled-mode sentinel when VITE_TURNSTILE_SITE_KEY is unset', () => {
        vi.stubEnv('VITE_TURNSTILE_SITE_KEY', '');

        const { result } = renderHook(() => useTurnstile());

        expect(result.current.widget).toBeNull();
        expect(result.current.token).toBe('__turnstile_disabled__');
        expect(typeof result.current.reset).toBe('function');
    });

    it('renders the widget and starts with null token when site key is set', () => {
        vi.stubEnv('VITE_TURNSTILE_SITE_KEY', 'test-site-key');

        const { result } = renderHook(() => useTurnstile());

        expect(result.current.widget).not.toBeNull();
        expect(result.current.token).toBeNull();
    });

    it('reset() is callable and stable across calls', () => {
        vi.stubEnv('VITE_TURNSTILE_SITE_KEY', '');

        const { result } = renderHook(() => useTurnstile());

        expect(() => result.current.reset()).not.toThrow();
        expect(result.current.token).toBe('__turnstile_disabled__');
    });
});
