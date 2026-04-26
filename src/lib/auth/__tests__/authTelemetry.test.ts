import { describe, it, expect, beforeEach, vi } from 'vitest';

const addBreadcrumbMock = vi.fn();
const captureMessageMock = vi.fn();

vi.mock('@sentry/react', () => ({
    addBreadcrumb: (...args: unknown[]) => addBreadcrumbMock(...args),
    captureMessage: (...args: unknown[]) => captureMessageMock(...args),
}));

import { logAuthEvent, classifyAuthError } from '../authTelemetry';

describe('logAuthEvent — AUTH-013', () => {
    beforeEach(() => {
        addBreadcrumbMock.mockReset();
        captureMessageMock.mockReset();
    });

    it('records a breadcrumb on success at info level', () => {
        logAuthEvent('login', 'success');
        expect(addBreadcrumbMock).toHaveBeenCalledOnce();
        expect(addBreadcrumbMock.mock.calls[0][0]).toMatchObject({
            category: 'auth',
            level: 'info',
            message: 'login:success',
        });
        expect(captureMessageMock).not.toHaveBeenCalled();
    });

    it('records a breadcrumb on user_error at warning level (NO captureMessage)', () => {
        logAuthEvent('signup', 'user_error', { code: 'weak_password' });
        expect(addBreadcrumbMock).toHaveBeenCalledOnce();
        expect(addBreadcrumbMock.mock.calls[0][0]).toMatchObject({
            category: 'auth',
            level: 'warning',
            message: 'signup:user_error',
            data: { code: 'weak_password' },
        });
        expect(captureMessageMock).not.toHaveBeenCalled();
    });

    it('records a breadcrumb AND captureMessage on platform_error at error level', () => {
        logAuthEvent('oauthGoogle', 'platform_error', { code: 'unknown_xyz' });
        expect(addBreadcrumbMock).toHaveBeenCalledOnce();
        expect(addBreadcrumbMock.mock.calls[0][0]).toMatchObject({
            level: 'error',
            message: 'oauthGoogle:platform_error',
        });
        expect(captureMessageMock).toHaveBeenCalledOnce();
        expect(captureMessageMock.mock.calls[0][0]).toBe('Auth platform error: oauthGoogle');
        expect(captureMessageMock.mock.calls[0][1]).toMatchObject({
            level: 'error',
            tags: { auth_operation: 'oauthGoogle', auth_outcome: 'platform_error' },
            extra: { code: 'unknown_xyz' },
        });
    });
});

describe('classifyAuthError — AUTH-013 outcome heuristic', () => {
    it('returns user_error for invalid_credentials code', () => {
        expect(classifyAuthError({ code: 'invalid_credentials', message: 'x' })).toBe('user_error');
    });

    it('returns user_error for weak_password code', () => {
        expect(classifyAuthError({ code: 'weak_password' })).toBe('user_error');
    });

    it('returns user_error for "Invalid login credentials" message', () => {
        expect(classifyAuthError({ message: 'Invalid login credentials' })).toBe('user_error');
    });

    it('returns user_error for "User already registered"', () => {
        expect(classifyAuthError({ message: 'User already registered' })).toBe('user_error');
    });

    it('returns user_error for "captcha required"', () => {
        expect(classifyAuthError({ message: 'captcha challenge required' })).toBe('user_error');
    });

    it('returns platform_error for unknown error', () => {
        expect(classifyAuthError({ message: 'Some weird internal 500' })).toBe('platform_error');
    });

    it('returns platform_error for null/undefined', () => {
        expect(classifyAuthError(null)).toBe('platform_error');
        expect(classifyAuthError(undefined)).toBe('platform_error');
    });
});
