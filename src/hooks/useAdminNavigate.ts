/**
 * Admin path helper for domain-aware navigation.
 *
 * On admin domain (admin.psychage.com): routes have no /admin prefix.
 * On main domain (psychage.com): routes keep /admin prefix.
 *
 * Usage:
 *   import { adminPath } from '@/hooks/useAdminNavigate';
 *   <Link to={adminPath('/dashboard')} />
 *   navigate(adminPath('/articles'));
 */

import { isAdminDomain } from '@/lib/urls';

const PREFIX = isAdminDomain() ? '' : '/admin';

/** Convert an admin path to be domain-appropriate */
export function adminPath(path: string): string {
  // Strip /admin prefix if present, then re-add the correct prefix
  const normalized = path.replace(/^\/admin/, '');
  return `${PREFIX}${normalized}`;
}
