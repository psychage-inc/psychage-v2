/**
 * EDGE FUNCTION: verify-current-password
 *
 * POST /functions/v1/verify-current-password
 *
 * Verifies the caller's current password without producing the side effects
 * of a client-side signInWithPassword call. Replaces the previous in-context
 * verification path in userProfileService.changePassword (AUTH-005).
 *
 * AUTH CONTRACT:
 *   - Request MUST include Authorization: Bearer <user_jwt>.
 *   - The function authenticates the caller via getUser(jwt) and derives the
 *     email from the verified session — never from the request body.
 *   - The body MUST include { password: string }. Anything else is ignored.
 *
 * WHY THIS EXISTS (AUTH-005):
 *   The Supabase JS SDK has no client-side `verify-current-password`
 *   primitive. The previous implementation called signInWithPassword on the
 *   client, which:
 *     1. Counts toward the per-IP/email sign-in rate limit, slowing down a
 *        legitimate user who mistypes once.
 *     2. Fires a SIGNED_IN event on the client. Post-AUTH-012 (the lifecycle
 *        refactor where onAuthStateChange is the sole state updater), this
 *        re-triggers the auth state listener mid-password-change.
 *     3. Rotates the access token unnecessarily.
 *
 *   This edge function performs the equivalent verification on a fresh,
 *   isolated Supabase client so none of those side effects propagate back
 *   to the caller's primary session.
 *
 * Rate limit: per-user, 10-second sliding window, in-memory Map. Same shape
 * as password-change-notification. Per-instance only — durable rate-limiting
 * would require a Postgres-backed counter and is out of scope for this
 * refactor (AUTH-006 work focuses on profiles.role, separate concern).
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { handleCorsPreflightRequest, createCorsResponse } from '../_shared/cors.ts';

const RATE_LIMIT_WINDOW_MS = 10_000;
const lastInvocationByUser = new Map<string, number>();

function checkRateLimit(userId: string, nowMs: number): boolean {
    const last = lastInvocationByUser.get(userId);
    if (last !== undefined && nowMs - last < RATE_LIMIT_WINDOW_MS) {
        return false;
    }
    lastInvocationByUser.set(userId, nowMs);
    return true;
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return handleCorsPreflightRequest();
    }
    if (req.method !== 'POST') {
        return createCorsResponse(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405 },
        );
    }

    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
        if (!supabaseUrl || !supabaseAnonKey) {
            return createCorsResponse(
                JSON.stringify({ error: 'Server misconfigured: missing Supabase credentials' }),
                { status: 500 },
            );
        }

        // AUTH CHECK — require a bearer token and verify it against
        // Supabase. We bind a client to the caller's JWT (NOT the service
        // role) so getUser() validates the token.
        const authHeader = req.headers.get('Authorization') ?? req.headers.get('authorization');
        if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
            return createCorsResponse(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401 },
            );
        }
        const jwt = authHeader.slice('Bearer '.length).trim();
        if (!jwt) {
            return createCorsResponse(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401 },
            );
        }

        const userClient = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: `Bearer ${jwt}` } },
        });
        const { data: { user }, error: authError } = await userClient.auth.getUser();
        if (authError || !user?.id || !user.email) {
            return createCorsResponse(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401 },
            );
        }

        // Per-user rate limit. Gate after auth so unauthenticated callers
        // can't probe which user_ids exist. A user trying to verify their
        // password is throttled to one attempt per 10 seconds — this is the
        // re-auth flow, not a bulk login surface, so the throttle is tight
        // on purpose.
        if (!checkRateLimit(user.id, Date.now())) {
            return createCorsResponse(
                JSON.stringify({ error: 'Rate limited. Please wait before retrying.' }),
                { status: 429 },
            );
        }

        // Read password from body. We only ever read this one field —
        // identity comes from the verified JWT above.
        let password: string | undefined;
        try {
            const body = await req.json();
            if (body && typeof body === 'object' && typeof body.password === 'string') {
                password = body.password;
            }
        } catch {
            // Body parse failure handled below.
        }
        if (!password) {
            return createCorsResponse(
                JSON.stringify({ error: 'Missing password in request body' }),
                { status: 400 },
            );
        }

        // Fresh, isolated client for the verification attempt. No session
        // persistence, no event subscription. The client used above for
        // getUser is bound to the caller's JWT, which would mutate the
        // caller's session if reused for signInWithPassword. We need a
        // sterile, throwaway client here.
        const verificationClient = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
            },
        });
        const { data: verifyData, error: verifyError } = await verificationClient.auth.signInWithPassword({
            email: user.email,
            password,
        });

        // Treat any sign-in error as "not verified". Don't propagate the
        // raw error message — it leaks whether the email exists or whether
        // the password is wrong (the SDK distinguishes these). For a
        // re-auth flow we only need a boolean.
        const verified = !verifyError && !!verifyData?.user && verifyData.user.id === user.id;

        // Diagnostic breadcrumb — user_id only, never the password or email.
        console.log(
            JSON.stringify({
                event: 'verify-current-password.attempt',
                user_id: user.id,
                verified,
                timestamp: new Date().toISOString(),
            }),
        );

        return createCorsResponse(
            JSON.stringify({ verified }),
            { status: 200 },
        );
    } catch (err) {
        console.error('verify-current-password: unexpected error', err);
        return createCorsResponse(
            JSON.stringify({ error: 'Internal error' }),
            { status: 500 },
        );
    }
});

// Exported for testing only. Not used outside the test harness.
export const __testing__ = {
    checkRateLimit,
    lastInvocationByUser,
    RATE_LIMIT_WINDOW_MS,
};
