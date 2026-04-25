/**
 * AUTH-030 — open-redirect defense.
 *
 * Validate any user-influenced redirect path (LoginPage `?redirectTo=`,
 * post-OAuth navigation state, etc.) before passing it to navigate() or
 * concatenating into a cross-domain URL.
 *
 * Rejection rules (defense in depth):
 *   - must start with `/`
 *   - must NOT start with `//` (protocol-relative URL)
 *   - must NOT contain `://` (absolute URL)
 *   - must NOT contain `..` (path traversal)
 *   - must match one of the allowlisted top-level prefixes
 *
 * Anything that fails returns the safe default (`/dashboard`).
 *
 * The allowlist enumerates top-level path prefixes the app actually
 * exposes. Adding a new top-level area means updating the array
 * intentionally — that friction is the point.
 */

const ALLOWED_PREFIXES: ReadonlyArray<string> = [
    '/dashboard',
    '/portal',
    '/tools',
    '/learn',
    '/providers',
    '/provider',         // legacy provider area (RoleGuard, AuthCallback)
    '/find-care',
    '/clarity-score',
    '/onboarding',
    '/account',
    '/crisis',
    '/admin',
];

const DEFAULT_REDIRECT = '/dashboard';

// Literal paths that are safe but don't fit a prefix scheme — usually
// the home page. Kept as an explicit allowlist for clarity.
const ALLOWED_LITERAL_PATHS: ReadonlySet<string> = new Set(['/']);

export function safeRedirectPath(raw: string | null | undefined): string {
    if (typeof raw !== 'string') return DEFAULT_REDIRECT;
    const trimmed = raw.trim();
    if (trimmed === '') return DEFAULT_REDIRECT;

    // Must begin with single slash, not protocol-relative
    if (!trimmed.startsWith('/') || trimmed.startsWith('//')) {
        return DEFAULT_REDIRECT;
    }

    // Reject any embedded scheme separator
    if (trimmed.includes('://')) return DEFAULT_REDIRECT;

    // Reject path traversal segments
    const segments = trimmed.split(/[/?#]/);
    if (segments.some((s) => s === '..')) return DEFAULT_REDIRECT;

    // Reject control characters / newlines / NULs
    if (/[\x00-\x1f\x7f]/.test(trimmed)) return DEFAULT_REDIRECT;

    // Must match an allowlisted literal or prefix.
    // Compare against just the path portion (drop ?query and #hash).
    const pathOnly = trimmed.split(/[?#]/, 1)[0];
    if (ALLOWED_LITERAL_PATHS.has(pathOnly)) return trimmed;
    const allowed = ALLOWED_PREFIXES.some((prefix) => {
        return pathOnly === prefix || pathOnly.startsWith(`${prefix}/`);
    });
    if (!allowed) return DEFAULT_REDIRECT;

    return trimmed;
}
