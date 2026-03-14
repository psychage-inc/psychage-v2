/**
 * Cross-domain URL helpers for main site / admin panel separation.
 *
 * When VITE_MAIN_URL and VITE_ADMIN_URL are unset (local dev),
 * everything resolves to the current origin — zero behavioral change.
 */

export const MAIN_URL = import.meta.env.VITE_MAIN_URL || window.location.origin;
export const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || window.location.origin;

/** Build a full URL on the main site */
export function mainUrl(path: string): string {
  return `${MAIN_URL}${path}`;
}

/** Build a full URL on the admin site */
export function adminUrl(path: string): string {
  return `${ADMIN_URL}${path}`;
}

/** Check if we are currently running on the admin domain */
export function isAdminDomain(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.origin === ADMIN_URL && ADMIN_URL !== MAIN_URL;
}
