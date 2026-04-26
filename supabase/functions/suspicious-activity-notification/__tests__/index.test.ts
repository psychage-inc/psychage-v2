/**
 * Deno unit tests for suspicious-activity-notification edge function.
 *
 * Run with:
 *   deno test --allow-env --allow-net supabase/functions/suspicious-activity-notification/__tests__/index.test.ts
 *
 * Scope: unit coverage of rate-limit, email validation, and hash
 * fingerprinting. Integration coverage (auth.users existence check,
 * Resend dispatch, anti-amplification timing) belongs to the SQL/staging
 * manual test document supabase/tests/auth-034-suspicious-activity.test.md.
 */

import {
    assertEquals,
    assertStrictEquals,
} from 'https://deno.land/std@0.168.0/testing/asserts.ts';
import { __testing__ } from '../index.ts';

const { checkRateLimit, lastInvocationByEmail, isValidEmail, RATE_LIMIT_WINDOW_MS, hashEmail } = __testing__;

Deno.test('checkRateLimit — first call for an email passes', () => {
    lastInvocationByEmail.clear();
    const passed = checkRateLimit('attacked@example.com', 1_000_000);
    assertStrictEquals(passed, true);
});

Deno.test('checkRateLimit — second call within the 1-hour window is rejected', () => {
    lastInvocationByEmail.clear();
    checkRateLimit('attacked@example.com', 1_000_000);
    const passed = checkRateLimit('attacked@example.com', 1_000_000 + 30 * 60 * 1000);
    assertStrictEquals(passed, false);
});

Deno.test('checkRateLimit — call AFTER 1 hour is accepted', () => {
    lastInvocationByEmail.clear();
    checkRateLimit('attacked@example.com', 1_000_000);
    const passed = checkRateLimit('attacked@example.com', 1_000_000 + RATE_LIMIT_WINDOW_MS + 1);
    assertStrictEquals(passed, true);
});

Deno.test('checkRateLimit — different emails do not share the window', () => {
    lastInvocationByEmail.clear();
    const a = checkRateLimit('alice@example.com', 1_000_000);
    const b = checkRateLimit('bob@example.com', 1_000_000 + 1_000);
    assertEquals([a, b], [true, true]);
});

Deno.test('RATE_LIMIT_WINDOW_MS is 1 hour', () => {
    assertStrictEquals(RATE_LIMIT_WINDOW_MS, 60 * 60 * 1000);
});

Deno.test('isValidEmail accepts a normal email', () => {
    assertStrictEquals(isValidEmail('user@example.com'), true);
});

Deno.test('isValidEmail rejects empty / non-string / oversized', () => {
    assertStrictEquals(isValidEmail(''), false);
    assertStrictEquals(isValidEmail(123 as unknown as string), false);
    assertStrictEquals(isValidEmail(null as unknown as string), false);
    assertStrictEquals(isValidEmail(undefined as unknown as string), false);
    // RFC 5321 max length 254
    assertStrictEquals(isValidEmail('x'.repeat(255) + '@example.com'), false);
});

Deno.test('isValidEmail rejects malformed shapes', () => {
    assertStrictEquals(isValidEmail('not-an-email'), false);
    assertStrictEquals(isValidEmail('@example.com'), false);
    assertStrictEquals(isValidEmail('user@'), false);
    assertStrictEquals(isValidEmail('user@example'), false);
});

Deno.test('hashEmail produces a deterministic non-empty fingerprint', () => {
    const a = hashEmail('user@example.com');
    const b = hashEmail('user@example.com');
    const c = hashEmail('different@example.com');
    assertStrictEquals(a, b);
    assertStrictEquals(a !== c, true);
    assertStrictEquals(typeof a, 'string');
    assertStrictEquals(a.length > 1, true);
});
