/**
 * EDGE FUNCTION: password-change-notification
 *
 * POST /functions/v1/password-change-notification
 *
 * Sends a security-notification email after a successful password change.
 * Invoked fire-and-forget by the client immediately after a successful
 * supabase.auth.updateUser({ password }) — see AUTH-028.
 *
 * AUTH CONTRACT (hotfix B-5):
 *   - Request MUST include Authorization: Bearer <user_jwt>.
 *   - The function authenticates the caller via getUser(jwt) and
 *     derives both user_id and email from the verified session.
 *   - The request BODY is ignored. An earlier (pre-B-5) version read
 *     user_id from the body; that created a spam-amplification vector
 *     where any authenticated caller could send a password-change
 *     notification to any user. The body is now discarded — callers
 *     may pass {} or omit it entirely.
 *
 * Email delivery itself depends on a configured transactional provider
 * (Resend via RESEND_API_KEY today; see renderEmail for the template).
 * If no transport is configured we log a warning instead of failing —
 * the password-change UX must NOT depend on the email actually arriving.
 * The dashboard checklist documents the SMTP / Resend requirement.
 *
 * Rate limit: per-user, 10-second sliding window, in-memory Map. This
 * is per-instance only; under heavy scale-out the same user could
 * still hit separate instances, but the common single-user abuse case
 * (a script loop from one browser session) is covered. Durable
 * rate-limiting would require a Postgres-backed counter; accepted as
 * out-of-scope per the planning decision for this patch-up.
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
        // Supabase. We create a client bound to the caller's JWT (NOT
        // the service role) so auth.getUser() validates the token and
        // returns the authenticated user or null.
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

        // Authenticated from here on. Derive identity from the session —
        // never from the request body.
        const targetUserId = user.id;
        const targetEmail = user.email;

        // Per-user rate limit. Gate happens AFTER auth so unauthenticated
        // callers can't probe which user_ids have been seen recently.
        if (!checkRateLimit(targetUserId, Date.now())) {
            return createCorsResponse(
                JSON.stringify({ error: 'Rate limited. Please wait before retrying.' }),
                { status: 429 },
            );
        }

        const timestamp = new Date().toISOString();

        const resendApiKey = Deno.env.get('RESEND_API_KEY');
        if (resendApiKey) {
            const fromAddress = Deno.env.get('NOTIFICATION_FROM_EMAIL') ?? 'security@psychage.com';
            const resp = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: fromAddress,
                    to: targetEmail,
                    subject: 'Your Psychage password was just changed',
                    html: renderEmail(targetEmail, timestamp),
                }),
            });
            if (!resp.ok) {
                const text = await resp.text();
                console.error('password-change-notification: resend send failed', text);
                // Do NOT return error to client — the password change
                // has already succeeded. Log and return 200.
            }
        } else {
            // No transactional provider configured. Fall back to
            // logging only; the dashboard checklist covers wiring up
            // SMTP/Resend before this is production-meaningful.
            console.warn(
                'password-change-notification: no RESEND_API_KEY configured; ' +
                    'notification not delivered to ' + targetEmail,
            );
        }

        // Invocation breadcrumb for operational visibility. user_id
        // only — email is intentionally not logged (PII minimization
        // in structured logs).
        console.log(
            JSON.stringify({
                event: 'password-change-notification.invoked',
                user_id: targetUserId,
                timestamp,
            }),
        );

        return createCorsResponse(
            JSON.stringify({ ok: true, sent_at: timestamp }),
            { status: 200 },
        );
    } catch (err) {
        console.error('password-change-notification: unexpected error', err);
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

function renderEmail(email: string, timestamp: string): string {
    return `<!doctype html>
<html>
  <body style="margin:0;padding:0;font-family:'Inter',system-ui,sans-serif;background:#f5f7f7;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7f7;padding:32px 0;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.05);">
          <tr><td style="padding:32px;">
            <h1 style="margin:0 0 16px;font-size:20px;font-weight:600;color:#0f172a;">
              Your Psychage password was just changed
            </h1>
            <p style="margin:0 0 16px;color:#334155;line-height:1.6;">
              We're letting you know because keeping your account secure matters to us.
            </p>
            <p style="margin:0 0 16px;color:#334155;line-height:1.6;">
              <strong>When:</strong> ${timestamp}<br/>
              <strong>Account:</strong> ${email}
            </p>
            <p style="margin:24px 0 16px;color:#334155;line-height:1.6;">
              If this was you, no further action is needed.
            </p>
            <p style="margin:0 0 24px;color:#334155;line-height:1.6;">
              If you don't recognize this change, secure your account now:
            </p>
            <p style="margin:0 0 24px;">
              <a
                href="https://psychage.com/reset-password"
                style="display:inline-block;background:#1A9B8C;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;"
              >This wasn't me — secure my account</a>
            </p>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0;"/>
            <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">
              You can also reach the support team at
              <a href="mailto:support@psychage.com" style="color:#1A9B8C;">support@psychage.com</a>.
              We'll never ask for your password by email.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}
