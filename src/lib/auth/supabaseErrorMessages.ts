import type { AuthError } from '@supabase/supabase-js';

/**
 * Maps Supabase auth errors to i18n keys under the `auth.errors` namespace.
 *
 * Prefers `error.code` (Supabase v2.90+); falls back to substring matching
 * on `error.message` for older error shapes. Returned strings are i18n keys —
 * pass them to `t()` to render the user-facing copy.
 *
 * AUTH-031: deliberately NO branch for "user not found" / "no user" /
 * "does not exist". Mapping that to a unique message would let an
 * unauthenticated caller distinguish registered emails from unregistered
 * ones (email enumeration). Unrecognized errors fall through to the
 * generic invalid-credentials response.
 */
export function mapSupabaseAuthError(error: AuthError | Error | null | undefined): string {
  if (!error) return 'auth.errors.unknown';

  if ('code' in error && typeof error.code === 'string') {
    switch (error.code) {
      case 'invalid_credentials':
      case 'invalid_grant':
        return 'auth.errors.invalidCredentials';
      case 'email_not_confirmed':
        return 'auth.errors.emailNotConfirmed';
      case 'over_request_rate_limit':
      case 'over_email_send_rate_limit':
        return 'auth.errors.rateLimit';
      case 'user_already_exists':
      case 'email_exists':
        return 'auth.errors.userAlreadyExists';
      case 'weak_password':
        return 'auth.errors.weakPassword';
      case 'user_banned':
        return 'auth.errors.accountDisabled';
    }
  }

  const message = (error as { message?: unknown }).message;
  if (typeof message !== 'string') return 'auth.errors.unknown';
  const lower = message.toLowerCase();

  if (lower.includes('email not confirmed') || lower.includes('not confirmed')) {
    return 'auth.errors.emailNotConfirmed';
  }
  if (
    lower.includes('invalid login') ||
    lower.includes('invalid credentials') ||
    lower.includes('invalid_grant')
  ) {
    return 'auth.errors.invalidCredentials';
  }
  if (lower.includes('rate limit') || lower.includes('too many requests') || lower.includes('too many')) {
    return 'auth.errors.rateLimit';
  }
  if (lower.includes('already registered') || lower.includes('already exists')) {
    return 'auth.errors.userAlreadyExists';
  }
  if (lower.includes('weak password') || lower.includes('password should be')) {
    return 'auth.errors.weakPassword';
  }
  if (lower.includes('disabled') || lower.includes('banned') || lower.includes('blocked')) {
    return 'auth.errors.accountDisabled';
  }
  if (lower.includes('network') || lower.includes('connection') || lower.includes('fetch failed')) {
    return 'auth.errors.network';
  }

  return 'auth.errors.unknown';
}
