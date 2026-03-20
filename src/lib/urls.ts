/**
 * Cross-domain URL helpers for main site / admin panel separation.
 *
 * When VITE_MAIN_URL and VITE_ADMIN_URL are unset (local dev),
 * admin is at /admin/* on the same origin. adminUrl() returns
 * paths like "/admin/dashboard" so Vite middleware serves admin.html.
 */

export const MAIN_URL = import.meta.env.VITE_MAIN_URL || window.location.origin;
export const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || window.location.origin;

const _sameOrigin = ADMIN_URL === MAIN_URL;

/** Build a full URL on the main site */
export function mainUrl(path: string): string {
  return `${MAIN_URL}${path}`;
}

/** Build a full URL on the admin site */
export function adminUrl(path: string): string {
  if (_sameOrigin) {
    // Local dev: admin lives at /admin/* on the same origin
    const normalized = path.replace(/^\/admin/, '');
    return `/admin${normalized || '/'}`;
  }
  return `${ADMIN_URL}${path}`;
}

/** Check if we are currently running on the admin domain (production only — used for basename) */
export function isAdminDomain(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.origin === ADMIN_URL && !_sameOrigin;
}

/** Check if we are inside the admin app (production admin domain OR dev /admin/* path) */
export function isInAdminApp(): boolean {
  if (typeof window === 'undefined') return false;
  if (isAdminDomain()) return true;
  // Dev (same origin): admin app runs at /admin/* paths
  if (_sameOrigin) return window.location.pathname.startsWith('/admin');
  return false;
}
