import { describe, it, expect } from 'vitest';
import { safeRedirectPath } from '../validateRedirect';

/**
 * Coverage for AUTH-030: open-redirect defense.
 */

describe('safeRedirectPath — AUTH-030', () => {
    const DEFAULT = '/dashboard';

    describe('rejection rules', () => {
        it('rejects null and undefined', () => {
            expect(safeRedirectPath(null)).toBe(DEFAULT);
            expect(safeRedirectPath(undefined)).toBe(DEFAULT);
        });

        it('rejects empty / whitespace-only', () => {
            expect(safeRedirectPath('')).toBe(DEFAULT);
            expect(safeRedirectPath('   ')).toBe(DEFAULT);
        });

        it('rejects protocol-relative URLs', () => {
            expect(safeRedirectPath('//evil.com/harvest')).toBe(DEFAULT);
            expect(safeRedirectPath('//evil.com')).toBe(DEFAULT);
        });

        it('rejects absolute URLs', () => {
            expect(safeRedirectPath('https://evil.com/harvest')).toBe(DEFAULT);
            expect(safeRedirectPath('http://evil.com')).toBe(DEFAULT);
            expect(safeRedirectPath('javascript:alert(1)')).toBe(DEFAULT);
        });

        it('rejects path-traversal sequences', () => {
            expect(safeRedirectPath('/dashboard/../admin/secret')).toBe(DEFAULT);
            expect(safeRedirectPath('/../etc/passwd')).toBe(DEFAULT);
        });

        it('rejects paths not starting with /', () => {
            expect(safeRedirectPath('dashboard')).toBe(DEFAULT);
            expect(safeRedirectPath('relative/path')).toBe(DEFAULT);
        });

        it('rejects paths outside the allowlist', () => {
            expect(safeRedirectPath('/random-area')).toBe(DEFAULT);
            expect(safeRedirectPath('/some-marketing-page')).toBe(DEFAULT);
            expect(safeRedirectPath('/api/secret')).toBe(DEFAULT);
        });

        it('rejects control characters', () => {
            expect(safeRedirectPath('/dashboard\nLocation: //evil')).toBe(DEFAULT);
            expect(safeRedirectPath('/dashboard\x00')).toBe(DEFAULT);
        });

        it('rejects malformed leading-slash sequences', () => {
            expect(safeRedirectPath('/\\evil.com')).toBe(DEFAULT);
        });
    });

    describe('happy paths', () => {
        it('accepts allowlisted top-level prefixes', () => {
            expect(safeRedirectPath('/dashboard')).toBe('/dashboard');
            expect(safeRedirectPath('/portal')).toBe('/portal');
            expect(safeRedirectPath('/tools')).toBe('/tools');
            expect(safeRedirectPath('/find-care')).toBe('/find-care');
        });

        it('accepts allowlisted prefixes with subpaths', () => {
            expect(safeRedirectPath('/dashboard/history')).toBe('/dashboard/history');
            expect(safeRedirectPath('/portal/bookings/123')).toBe('/portal/bookings/123');
            expect(safeRedirectPath('/tools/mood-journal')).toBe('/tools/mood-journal');
        });

        it('preserves query strings on allowed paths', () => {
            expect(safeRedirectPath('/dashboard/history?foo=bar')).toBe('/dashboard/history?foo=bar');
        });

        it('preserves hash fragments on allowed paths', () => {
            expect(safeRedirectPath('/learn#section')).toBe('/learn#section');
        });

        it('does NOT match a non-allowed prefix that happens to start with an allowed one', () => {
            // "/dashboardx" must not be accepted just because "/dashboard" is allowed
            expect(safeRedirectPath('/dashboardx')).toBe(DEFAULT);
        });

        it('accepts the root path explicitly (literal allowlist)', () => {
            expect(safeRedirectPath('/')).toBe('/');
        });

        it('accepts the legacy /provider area used by RoleGuard', () => {
            expect(safeRedirectPath('/provider')).toBe('/provider');
            expect(safeRedirectPath('/provider/onboarding')).toBe('/provider/onboarding');
        });
    });
});
