import * as Sentry from '@sentry/react';

/**
 * AUTH-013: lightweight Sentry instrumentation for auth flows.
 *
 * Splits outcomes three ways:
 *   - `success`        — happy path; breadcrumb only
 *   - `user_error`     — expected user-side mistake (bad password, "user
 *                        already exists", weak password, missed captcha).
 *                        Breadcrumb only — these are routine and should
 *                        not page on-call.
 *   - `platform_error` — actionable for the team: network failure,
 *                        Supabase 5xx, unrecognized error code. Breadcrumb
 *                        + Sentry.captureMessage with tags.
 *
 * Sentry init at lib/sentry.ts already strips PHI (email, message, query
 * params). Callers MUST NOT pass email/password into `details` here —
 * pass shape data only (provider name, error code, attempt count).
 *
 * When Sentry is not initialized (dev, missing DSN) the calls are no-ops
 * — Sentry's SDK silently no-ops when `init` was never called.
 */

export type AuthOperation =
  | 'login'
  | 'signup'
  | 'logout'
  | 'resetPassword'
  | 'updatePassword'
  | 'oauthGoogle'
  | 'oauthApple'
  | 'verifyEmail'
  | 'deleteAccount';

export type AuthOutcome = 'success' | 'user_error' | 'platform_error';

export function logAuthEvent(
  operation: AuthOperation,
  outcome: AuthOutcome,
  details?: Record<string, unknown>,
): void {
  const level: Sentry.SeverityLevel =
    outcome === 'platform_error' ? 'error' : outcome === 'user_error' ? 'warning' : 'info';

  Sentry.addBreadcrumb({
    category: 'auth',
    message: `${operation}:${outcome}`,
    level,
    data: details,
  });

  if (outcome === 'platform_error') {
    Sentry.captureMessage(`Auth platform error: ${operation}`, {
      level: 'error',
      tags: { auth_operation: operation, auth_outcome: outcome },
      extra: details,
    });
  }
}

/**
 * Heuristic to classify a Supabase auth error. user_error if the error
 * is a known user-side condition (invalid creds, email taken, weak
 * password, captcha missing); platform_error otherwise.
 *
 * Mirrors the branches in mapSupabaseAuthError.ts but at a coarser
 * granularity — we only need success/user/platform here.
 */
export function classifyAuthError(error: { code?: string; message?: string } | null | undefined): AuthOutcome {
  if (!error) return 'platform_error';
  const code = typeof error.code === 'string' ? error.code : '';
  const message = typeof error.message === 'string' ? error.message.toLowerCase() : '';

  const userCodes = new Set([
    'invalid_credentials',
    'invalid_grant',
    'email_not_confirmed',
    'user_already_exists',
    'email_exists',
    'weak_password',
    'over_request_rate_limit',
    'over_email_send_rate_limit',
  ]);
  if (userCodes.has(code)) return 'user_error';

  const userPatterns = [
    'invalid login',
    'invalid credentials',
    'email not confirmed',
    'already registered',
    'already exists',
    'password should be',
    'weak password',
    'rate limit',
    'too many requests',
    'too many',
    'captcha',
  ];
  if (userPatterns.some(p => message.includes(p))) return 'user_error';

  return 'platform_error';
}
