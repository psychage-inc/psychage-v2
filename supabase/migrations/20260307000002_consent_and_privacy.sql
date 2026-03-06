-- =====================================================
-- Migration: Consent & Privacy Infrastructure
-- Date: 2026-03-07
-- Description: GDPR consent audit trail, DSAR requests,
--              soft-delete support, and profile privacy columns
-- =====================================================

-- =====================================================
-- CONSENT LOG TABLE (immutable audit trail)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.consent_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    consent_type VARCHAR(100) NOT NULL CHECK (consent_type IN (
        'terms_of_service',
        'privacy_policy',
        'data_processing',
        'newsletter',
        'analytics_cookies',
        'ai_chat_history',
        'clarity_score_tracking',
        'age_verification'
    )),
    granted BOOLEAN NOT NULL,
    version VARCHAR(50) NOT NULL DEFAULT 'v1.0',
    ip_address INET,
    user_agent TEXT,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    revoked_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_consent_log_user ON public.consent_log(user_id);
CREATE INDEX IF NOT EXISTS idx_consent_log_type ON public.consent_log(consent_type);
CREATE INDEX IF NOT EXISTS idx_consent_log_granted_at ON public.consent_log(granted_at DESC);

ALTER TABLE public.consent_log ENABLE ROW LEVEL SECURITY;

-- Users can read their own consent history
CREATE POLICY "consent_log_select_own"
    ON public.consent_log FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Users can insert their own consents
CREATE POLICY "consent_log_insert_own"
    ON public.consent_log FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Anonymous users can insert (pre-auth cookie consent, user_id = NULL)
CREATE POLICY "consent_log_insert_anon"
    ON public.consent_log FOR INSERT TO anon
    WITH CHECK (user_id IS NULL);

-- Admins can view all consent records
CREATE POLICY "consent_log_select_admin"
    ON public.consent_log FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'admin'
        )
    );

GRANT SELECT, INSERT ON public.consent_log TO anon, authenticated;

-- =====================================================
-- DSAR REQUESTS TABLE (Data Subject Access Requests)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.dsar_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
    request_type VARCHAR(50) NOT NULL CHECK (request_type IN (
        'export',
        'deletion',
        'rectification',
        'restriction'
    )),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN (
        'pending',
        'processing',
        'completed',
        'rejected',
        'cancelled'
    )),
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    download_url TEXT,
    notes TEXT,
    processed_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dsar_user ON public.dsar_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_dsar_status ON public.dsar_requests(status);
CREATE INDEX IF NOT EXISTS idx_dsar_type ON public.dsar_requests(request_type);

ALTER TABLE public.dsar_requests ENABLE ROW LEVEL SECURITY;

-- Users can view their own DSAR requests
CREATE POLICY "dsar_select_own"
    ON public.dsar_requests FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Users can create their own DSAR requests
CREATE POLICY "dsar_insert_own"
    ON public.dsar_requests FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Users can cancel their own pending requests
CREATE POLICY "dsar_update_own"
    ON public.dsar_requests FOR UPDATE TO authenticated
    USING (auth.uid() = user_id AND status = 'pending')
    WITH CHECK (auth.uid() = user_id);

-- Admins can manage all DSAR requests
CREATE POLICY "dsar_select_admin"
    ON public.dsar_requests FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'admin'
        )
    );

CREATE POLICY "dsar_update_admin"
    ON public.dsar_requests FOR UPDATE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'admin'
        )
    );

GRANT SELECT, INSERT, UPDATE ON public.dsar_requests TO authenticated;

-- =====================================================
-- ADD PRIVACY COLUMNS TO PROFILES
-- =====================================================
ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS deletion_scheduled_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS cookie_consent JSONB DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS age_verified BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS consent_version TEXT,
    ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR(50) DEFAULT 'free';

-- Add check constraint for subscription_tier (safe with DO block)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.check_constraints
        WHERE constraint_name = 'profiles_subscription_tier_check'
    ) THEN
        ALTER TABLE public.profiles
            ADD CONSTRAINT profiles_subscription_tier_check
            CHECK (subscription_tier IN ('free', 'spark_plus'));
    END IF;
END $$;

-- Add consent columns to newsletter_subscribers
ALTER TABLE public.newsletter_subscribers
    ADD COLUMN IF NOT EXISTS consent_version VARCHAR(50) DEFAULT 'v1.0',
    ADD COLUMN IF NOT EXISTS consent_recorded_at TIMESTAMPTZ DEFAULT NOW();

-- =====================================================
-- UPDATE handle_new_user() TRIGGER
-- Copy age_verified and consent_version from user metadata
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, display_name, role, age_verified, consent_version)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'patient'),
        COALESCE((NEW.raw_user_meta_data->>'age_verified')::BOOLEAN, FALSE),
        NEW.raw_user_meta_data->>'consent_version'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- UPDATED_AT TRIGGER FOR DSAR
-- =====================================================
DROP TRIGGER IF EXISTS dsar_requests_updated_at ON public.dsar_requests;
CREATE TRIGGER dsar_requests_updated_at
    BEFORE UPDATE ON public.dsar_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
