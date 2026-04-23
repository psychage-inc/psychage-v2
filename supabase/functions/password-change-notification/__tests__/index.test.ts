/**
 * Deno unit tests for password-change-notification edge function.
 *
 * Run with:
 *   deno test --allow-env --allow-net supabase/functions/password-change-notification/__tests__/index.test.ts
 *
 * These tests do NOT run under `pnpm test` (Vitest) — they target the
 * Deno runtime the edge function executes in. The Vitest suite covers
 * the callsites (src/services/__tests__/userProfileService.changePassword.test.ts
 * and src/pages/auth/__tests__/UpdatePasswordPage.test.tsx).
 *
 * Scope: unit coverage of the rate-limit map and the exported internals.
 * Integration coverage (JWT verification, spoofed user_id ignored,
 * email routed to session user) belongs to the SQL/staging manual
 * test document supabase/tests/hotfix-b5-edge-function.test.md.
 */

import {
    assertEquals,
    assertStrictEquals,
} from 'https://deno.land/std@0.168.0/testing/asserts.ts';
import { __testing__ } from '../index.ts';

const { checkRateLimit, lastInvocationByUser, RATE_LIMIT_WINDOW_MS } = __testing__;

Deno.test('checkRateLimit — first call for a user passes', () => {
    lastInvocationByUser.clear();
    const passed = checkRateLimit('user-a', 1_000_000);
    assertStrictEquals(passed, true);
});

Deno.test('checkRateLimit — second call within the window is rejected', () => {
    lastInvocationByUser.clear();
    checkRateLimit('user-a', 1_000_000);
    const passed = checkRateLimit('user-a', 1_000_000 + 5_000);
    assertStrictEquals(passed, false);
});

Deno.test('checkRateLimit — call AFTER the window elapses is accepted', () => {
    lastInvocationByUser.clear();
    checkRateLimit('user-a', 1_000_000);
    const passed = checkRateLimit('user-a', 1_000_000 + RATE_LIMIT_WINDOW_MS + 1);
    assertStrictEquals(passed, true);
});

Deno.test('checkRateLimit — different users do not share the window', () => {
    lastInvocationByUser.clear();
    const passedA = checkRateLimit('user-a', 1_000_000);
    const passedB = checkRateLimit('user-b', 1_000_000 + 1_000);
    assertEquals([passedA, passedB], [true, true]);
});

Deno.test('RATE_LIMIT_WINDOW_MS is 10 seconds', () => {
    assertStrictEquals(RATE_LIMIT_WINDOW_MS, 10_000);
});
