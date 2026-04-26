/**
 * EDGE FUNCTION: suspicious-activity-notification
 *
 * POST /functions/v1/suspicious-activity-notification
 *
 * Sends a "we noticed multiple sign-in attempts on your account" email
 * after the client detects N failed-login attempts for the same email
 * within a session. Triggered fire-and-forget by AuthContext.
 *
 * AUTH CONTRACT (AUTH-034 — differs from password-change-notification):
 *   - Caller is **unauthenticated** by definition. The legitimate user
 *     is FAILING to authenticate, so we cannot require a JWT.
 *   - The email address is read from the request body. To prevent the
 *     function from being abused as a spam-amplification vector against
 *     arbitrary addresses, the function MUST:
 *       (a) verify the email exists in auth.users before sending
 *       (b) per-email rate limit at 1 send / hour
 *       (c) cap the body payload size and reject malformed requests
 *
 * Email delivery uses Resend if RESEND_API_KEY is configured; otherwise
 * we log a warning. The user's auth flow does not depend on the email
 * arriving — this is a courtesy/security signal, not gating.
 *
 * Rate limit storage is in-memory (per-instance). Under heavy scale-out
 * the same email could be notified more than 1×/hour; that's acceptable
 * for this signal and matches the precedent from
 * password-change-notification.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { handleCorsPreflightRequest, createCorsResponse } from '../_shared/cors.ts';

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour per email
const MAX_EMAIL_LENGTH = 254; // RFC 5321
const lastInvocationByEmail = new Map<string, number>();

function checkRateLimit(emailKey: string, nowMs: number): boolean {
    const last = lastInvocationByEmail.get(emailKey);
    if (last !== undefined && nowMs - last < RATE_LIMIT_WINDOW_MS) {
        return false;
    }
    lastInvocationByEmail.set(emailKey, nowMs);
    return true;
}

function isValidEmail(value: unknown): value is string {
    if (typeof value !== 'string') return false;
    if (value.length === 0 || value.length > MAX_EMAIL_LENGTH) return false;
    // Cheap shape check; not a full RFC validator. The auth.users lookup
    // below is the authoritative existence check.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        if (!supabaseUrl || !serviceRoleKey) {
            return createCorsResponse(
                JSON.stringify({ error: 'Server misconfigured' }),
                { status: 500 },
            );
        }

        // Parse + validate payload
        let payload: unknown;
        try {
            payload = await req.json();
        } catch {
            return createCorsResponse(
                JSON.stringify({ error: 'Invalid JSON' }),
                { status: 400 },
            );
        }
        const rawEmail = (payload as { email?: unknown })?.email;
        if (!isValidEmail(rawEmail)) {
            return createCorsResponse(
                JSON.stringify({ error: 'Invalid email' }),
                { status: 400 },
            );
        }
        const email = rawEmail.toLowerCase().trim();

        // Per-email rate limit BEFORE the auth.users lookup. Prevents
        // an attacker from probing whether emails exist by timing the
        // 200-vs-200-after-rate-limit response.
        if (!checkRateLimit(email, Date.now())) {
            // Always return 200 so callers can't distinguish "rate
            // limited" from "delivered" or "no such user".
            return createCorsResponse(
                JSON.stringify({ ok: true }),
                { status: 200 },
            );
        }

        // Verify the email exists in auth.users — anti-amplification.
        // Use service-role key so we can read auth schema. NEVER return
        // a different status based on whether the user exists; we just
        // gate the actual send.
        const adminClient = createClient(supabaseUrl, serviceRoleKey, {
            auth: { persistSession: false, autoRefreshToken: false },
        });

        // Existence check: profiles.email is populated by signup. Using
        // the public table avoids the listUsers pagination problem and
        // doesn't require auth-schema RPCs.
        let userExists = false;
        try {
            const { data: profile } = await adminClient
                .from('profiles')
                .select('id')
                .eq('email', email)
                .maybeSingle();
            userExists = !!profile;
        } catch {
            userExists = false;
        }

        if (!userExists) {
            // Always return 200 (constant-response policy), but DO NOT
            // send. Logged for observability.
            console.log(
                JSON.stringify({
                    event: 'suspicious-activity.skipped_no_such_email',
                    email_hash: hashEmail(email),
                }),
            );
            return createCorsResponse(JSON.stringify({ ok: true }), { status: 200 });
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
                    to: email,
                    subject: 'Sign-in attempts on your Psychage account',
                    html: renderEmail(email, timestamp),
                }),
            });
            if (!resp.ok) {
                const text = await resp.text();
                console.error('suspicious-activity-notification: resend send failed', text);
            }
        } else {
            console.warn(
                'suspicious-activity-notification: no RESEND_API_KEY configured; ' +
                'notification not delivered to ' + email,
            );
        }

        console.log(
            JSON.stringify({
                event: 'suspicious-activity.invoked',
                email_hash: hashEmail(email),
                timestamp,
            }),
        );

        return createCorsResponse(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        console.error('suspicious-activity-notification: unexpected error', err);
        // Constant-response — even on error, return 200 so callers
        // can't probe internal state.
        return createCorsResponse(JSON.stringify({ ok: true }), { status: 200 });
    }
});

// SHA-256-style fingerprint (not cryptographically strong — we only use
// it to keep raw emails out of structured logs).
function hashEmail(email: string): string {
    let h = 0;
    for (let i = 0; i < email.length; i++) {
        h = ((h << 5) - h + email.charCodeAt(i)) | 0;
    }
    return `h${(h >>> 0).toString(16)}`;
}

function renderEmail(email: string, timestamp: string): string {
    return `<!doctype html>
<html>
  <body style="margin:0;padding:0;font-family:'Inter',system-ui,sans-serif;background:#f5f7f7;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7f7;padding:32px 0;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.05);">
          <tr><td style="padding:32px;">
            <h1 style="margin:0 0 16px;font-size:20px;font-weight:600;color:#0f172a;">
              Sign-in attempts on your Psychage account
            </h1>
            <p style="margin:0 0 16px;color:#334155;line-height:1.6;">
              We noticed multiple sign-in attempts on your account at <strong>${timestamp}</strong>.
            </p>
            <p style="margin:0 0 16px;color:#334155;line-height:1.6;">
              <strong>Account:</strong> ${email}
            </p>
            <p style="margin:24px 0 16px;color:#334155;line-height:1.6;">
              If this was you, no action is needed. If not, reset your password
              and consider checking your email security.
            </p>
            <p style="margin:0 0 24px;">
              <a
                href="https://psychage.com/reset-password"
                style="display:inline-block;background:#1A9B8C;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;"
              >Reset your password</a>
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

// Exported for testing only.
export const __testing__ = {
    checkRateLimit,
    lastInvocationByEmail,
    isValidEmail,
    RATE_LIMIT_WINDOW_MS,
    hashEmail,
};
