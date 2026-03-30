-- ============================================================
-- Fix admin_roles RLS infinite recursion (again)
-- ============================================================
-- Migration 20260325000003 re-introduced a self-referencing
-- policy "Super admins can manage roles" that causes error 42P17.
-- Drop all conflicting policies and create clean, non-recursive ones.
-- ============================================================

-- Drop ALL existing policies on admin_roles to start clean
DROP POLICY IF EXISTS "admin_roles_read" ON admin_roles;
DROP POLICY IF EXISTS "admin_roles_write" ON admin_roles;
DROP POLICY IF EXISTS "Admins can view roles" ON admin_roles;
DROP POLICY IF EXISTS "Super admins can manage roles" ON admin_roles;

-- SELECT: authenticated users can read their own row,
-- or all rows if their JWT user_metadata.role = 'admin'
CREATE POLICY "admin_roles_select" ON admin_roles
  FOR SELECT USING (
    auth.uid() = user_id
    OR (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- INSERT/UPDATE/DELETE: only via service_role key (bypasses RLS).
-- The app never writes to admin_roles from the client.
CREATE POLICY "admin_roles_modify" ON admin_roles
  FOR ALL USING (false);
