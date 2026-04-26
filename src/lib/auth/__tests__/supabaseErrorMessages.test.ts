import { describe, it, expect } from 'vitest';
import { mapSupabaseAuthError } from '../supabaseErrorMessages';

/**
 * Coverage for AUTH-019 (consistent error mapping) and the AUTH-031
 * email-enumeration regression — make sure no "user not found" branch
 * exists that would let an attacker discriminate registered emails.
 */

describe('mapSupabaseAuthError — AUTH-019 + AUTH-031', () => {
    describe('null / undefined / unknown', () => {
        it('returns unknown for null', () => {
            expect(mapSupabaseAuthError(null)).toBe('auth.errors.unknown');
        });

        it('returns unknown for undefined', () => {
            expect(mapSupabaseAuthError(undefined)).toBe('auth.errors.unknown');
        });

        it('returns unknown for an unrecognized error', () => {
            const err = new Error('Some weird brand-new Supabase error');
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.unknown');
        });

        it('returns unknown when message is missing', () => {
            const err = { code: 'totally_unknown_code_xyz' } as unknown as Error;
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.unknown');
        });
    });

    describe('error.code branch (Supabase v2.90+)', () => {
        it('maps invalid_credentials', () => {
            const err = { code: 'invalid_credentials', message: 'whatever' } as unknown as Error;
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.invalidCredentials');
        });

        it('maps invalid_grant', () => {
            const err = { code: 'invalid_grant', message: 'whatever' } as unknown as Error;
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.invalidCredentials');
        });

        it('maps email_not_confirmed', () => {
            const err = { code: 'email_not_confirmed', message: 'whatever' } as unknown as Error;
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.emailNotConfirmed');
        });

        it('maps over_request_rate_limit', () => {
            const err = { code: 'over_request_rate_limit', message: 'whatever' } as unknown as Error;
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.rateLimit');
        });

        it('maps over_email_send_rate_limit', () => {
            const err = { code: 'over_email_send_rate_limit', message: 'whatever' } as unknown as Error;
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.rateLimit');
        });

        it('maps user_already_exists', () => {
            const err = { code: 'user_already_exists', message: 'whatever' } as unknown as Error;
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.userAlreadyExists');
        });

        it('maps email_exists (alias)', () => {
            const err = { code: 'email_exists', message: 'whatever' } as unknown as Error;
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.userAlreadyExists');
        });

        it('maps weak_password', () => {
            const err = { code: 'weak_password', message: 'whatever' } as unknown as Error;
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.weakPassword');
        });

        it('maps user_banned', () => {
            const err = { code: 'user_banned', message: 'whatever' } as unknown as Error;
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.accountDisabled');
        });
    });

    describe('substring fallback (older error shapes without code)', () => {
        it('matches "Email not confirmed"', () => {
            const err = new Error('Email not confirmed');
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.emailNotConfirmed');
        });

        it('matches "Invalid login credentials"', () => {
            const err = new Error('Invalid login credentials');
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.invalidCredentials');
        });

        it('matches "Too many requests"', () => {
            const err = new Error('Too many requests, please try later');
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.rateLimit');
        });

        it('matches "User already registered"', () => {
            const err = new Error('User already registered');
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.userAlreadyExists');
        });

        it('matches "Password should be at least 6 characters"', () => {
            const err = new Error('Password should be at least 6 characters');
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.weakPassword');
        });

        it('matches "Network request failed"', () => {
            const err = new Error('Network request failed');
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.network');
        });

        it('matches "fetch failed"', () => {
            const err = new Error('fetch failed: ECONNREFUSED');
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.network');
        });

        it('matches "user disabled"', () => {
            const err = new Error('Account has been disabled');
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.accountDisabled');
        });
    });

    describe('AUTH-031 regression — no enumeration branch', () => {
        it('maps "User not found" to unknown, NOT a unique key', () => {
            const err = new Error('User not found');
            const key = mapSupabaseAuthError(err);
            // Must NOT be a unique "no account exists" key — we treat it
            // identically to other unrecognized errors.
            expect(key).toBe('auth.errors.unknown');
        });

        it('maps "no user with that email" to unknown', () => {
            const err = new Error('no user with that email');
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.unknown');
        });

        it('maps "User does not exist" to unknown', () => {
            const err = new Error('User does not exist');
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.unknown');
        });

        it('makes sure the source code has no enumeration branches', async () => {
            // Vite ?raw import — read the source as a string so we can
            // assert on its text. The mapper purposely lacks branches
            // mapping "user not found"-style messages to a unique key;
            // this guard catches future drift. Strip comments first so
            // the prose explaining the rule doesn't trip the check.
            const src: string = (await import('../supabaseErrorMessages.ts?raw')).default;
            const stripped = src
                .replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/\/\/.*$/gm, '')
                .toLowerCase();
            expect(stripped).not.toMatch(/['"]not found['"]/);
            expect(stripped).not.toMatch(/['"]no user['"]/);
            expect(stripped).not.toMatch(/['"]does not exist['"]/);
        });
    });

    describe('precedence', () => {
        it('prefers error.code over message substring when both present', () => {
            const err = {
                code: 'invalid_credentials',
                message: 'Email not confirmed', // would map differently via substring
            } as unknown as Error;
            expect(mapSupabaseAuthError(err)).toBe('auth.errors.invalidCredentials');
        });
    });
});
