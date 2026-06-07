// ============================================================
// Admin-role decision point (single source of truth)
// ============================================================
// The DB sync trigger writes the GRANULAR admin role
// (super_admin | clinical_admin | viewer) into
// auth.users.raw_app_meta_data.role, surfaced to the client as
// user.app_metadata.role. Historically the client gate only accepted
// the literal 'admin', so every admin was mis-mapped to 'patient'.
//
// This module is the ONE place that interprets a role value as admin.
// Every client surface that gates on admin status (AuthContext mapper,
// LoginPage, RoleGuard, useAdminAuth, userProfileService) consumes these
// helpers instead of re-deriving admin-ness with its own literal check.
//
// Binary gating only: getAdminTier preserves the tier for display/audit,
// but no access decision in this layer branches on which tier it is.

import type { AdminRole } from './admin/types';

const ADMIN_ROLES: readonly AdminRole[] = ['super_admin', 'clinical_admin', 'viewer'];

/** True if the value is one of the three granular admin roles. */
export function isAdminRole(value: unknown): boolean {
  return typeof value === 'string' && (ADMIN_ROLES as readonly string[]).includes(value);
}

/** Returns the granular admin tier, or null if the value is not an admin role. */
export function getAdminTier(value: unknown): AdminRole | null {
  return isAdminRole(value) ? (value as AdminRole) : null;
}
