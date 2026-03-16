-- ============================================================
-- Fix admin_roles RLS infinite recursion
-- ============================================================
-- The original policies referenced admin_roles in their own
-- USING clause, causing PostgreSQL error 42P17.
-- Fix: use JWT user_metadata instead of querying admin_roles.
-- ============================================================

-- 1. Fix admin_roles policies (self-referencing → infinite recursion)
DROP POLICY IF EXISTS "admin_roles_read" ON admin_roles;
DROP POLICY IF EXISTS "admin_roles_write" ON admin_roles;

-- Read: user can read their own row, or all rows if JWT says role=admin
CREATE POLICY "admin_roles_read" ON admin_roles
  FOR SELECT USING (
    auth.uid() = user_id
    OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- Write: only via service role key (bypasses RLS).
-- Frontend never writes to admin_roles directly.
CREATE POLICY "admin_roles_write" ON admin_roles
  FOR ALL USING (false);

-- 2. Fix audit_log policies (referenced admin_roles which now works)
-- These are fine since they reference admin_roles (not their own table),
-- and admin_roles read policy is now non-recursive. No change needed.

-- 3. Fix platform_settings policies (same as audit_log — reference admin_roles, not self)
-- No change needed.
