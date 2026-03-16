/**
 * Admin path helper for domain-aware navigation.
 *
 * Returns paths relative to admin BrowserRouter's basename.
 * BrowserRouter handles the /admin prefix automatically in local dev.
 *
 * Usage:
 *   import { adminPath } from '@/hooks/useAdminNavigate';
 *   <Link to={adminPath('/dashboard')} />
 *   navigate(adminPath('/articles'));
 */

/** Convert an admin path to be usable within admin BrowserRouter */
export function adminPath(path: string): string {
  // Strip /admin prefix if present — BrowserRouter basename handles it
  return path.replace(/^\/admin/, '') || '/';
}
