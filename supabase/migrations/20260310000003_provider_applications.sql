-- ============================================================
-- Provider Application & Verification Tables
-- ============================================================

CREATE TABLE IF NOT EXISTS provider_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_name TEXT NOT NULL,
  credentials TEXT NOT NULL,
  npi_number TEXT,
  npi_verified BOOLEAN DEFAULT FALSE,
  npi_verification_data JSONB,
  practice_name TEXT,
  practice_address JSONB,
  specialties TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  telehealth_available BOOLEAN DEFAULT FALSE,
  license_documents TEXT[] DEFAULT '{}',
  bio TEXT,
  website_url TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'more_info_requested')),
  reviewed_by UUID REFERENCES auth.users(id),
  review_notes TEXT,
  rejection_reason TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- Add verification fields to providers table if not present
ALTER TABLE providers ADD COLUMN IF NOT EXISTS verification_tier TEXT DEFAULT 'unverified'
  CHECK (verification_tier IN ('unverified', 'npi_verified', 'psychage_verified', 'featured'));
ALTER TABLE providers ADD COLUMN IF NOT EXISTS verification_notes TEXT;
ALTER TABLE providers ADD COLUMN IF NOT EXISTS verified_at TIMESTAMPTZ;
ALTER TABLE providers ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES auth.users(id);
ALTER TABLE providers ADD COLUMN IF NOT EXISTS is_suspended BOOLEAN DEFAULT FALSE;
ALTER TABLE providers ADD COLUMN IF NOT EXISTS suspension_reason TEXT;
ALTER TABLE providers ADD COLUMN IF NOT EXISTS application_id UUID REFERENCES provider_applications(id);

-- RLS
ALTER TABLE provider_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_applications_all" ON provider_applications
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_roles ar WHERE ar.user_id = auth.uid() AND ar.role IN ('super_admin', 'clinical_admin'))
  );

-- Public can submit applications
CREATE POLICY "public_applications_insert" ON provider_applications
  FOR INSERT WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_provider_apps_status ON provider_applications(status);
CREATE INDEX IF NOT EXISTS idx_provider_apps_email ON provider_applications(contact_email);
