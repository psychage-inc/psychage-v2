-- ============================================================
-- Admin Panel Foundation Tables
-- admin_roles, admin_audit_log, platform_settings
-- ============================================================

-- Admin roles (granular: super_admin, clinical_admin, viewer)
CREATE TABLE IF NOT EXISTS admin_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'clinical_admin', 'viewer')),
  granted_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Audit log for all admin actions
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  previous_value JSONB,
  new_value JSONB,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Platform settings (key-value store)
CREATE TABLE IF NOT EXISTS platform_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

-- Admin roles: any admin can read, only super_admin can write
CREATE POLICY "admin_roles_read" ON admin_roles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid())
  );

CREATE POLICY "admin_roles_write" ON admin_roles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role = 'super_admin')
  );

-- Audit log: all admins can read
CREATE POLICY "audit_log_read" ON admin_audit_log
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid())
  );

-- Audit log: all admins can insert (write via app code)
CREATE POLICY "audit_log_insert" ON admin_audit_log
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid())
  );

-- Platform settings: all admins can read
CREATE POLICY "settings_read" ON platform_settings
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid())
  );

-- Platform settings: super_admin and clinical_admin can write
CREATE POLICY "settings_write" ON platform_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role IN ('super_admin', 'clinical_admin'))
  );

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX idx_audit_log_created_at ON admin_audit_log(created_at DESC);
CREATE INDEX idx_audit_log_resource ON admin_audit_log(resource_type, resource_id);
CREATE INDEX idx_audit_log_admin ON admin_audit_log(admin_user_id);

-- ============================================================
-- Seed default platform settings
-- ============================================================

INSERT INTO platform_settings (key, value) VALUES
  ('maintenance_mode', 'false'::jsonb),
  ('ai_chat_enabled', 'true'::jsonb),
  ('max_ai_messages_anon', '300'::jsonb),
  ('max_ai_messages_auth', '1000'::jsonb),
  ('clarity_score_retake_days', '7'::jsonb),
  ('supported_languages', '["en", "es", "fr", "ar", "zh"]'::jsonb),
  ('crisis_banner_enabled', 'true'::jsonb),
  ('provider_applications_open', 'true'::jsonb)
ON CONFLICT (key) DO NOTHING;
