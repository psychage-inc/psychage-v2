-- Admin Onboarding Support
-- Adds onboarding tracking to profiles and admin invite management

-- 1. Add onboarding completion tracking to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ DEFAULT NULL;

-- Partial index for efficient admin onboarding queries
CREATE INDEX IF NOT EXISTS idx_profiles_admin_onboarding
ON public.profiles(role, onboarding_completed_at)
WHERE role = 'admin';

-- 2. Backfill existing admins so they skip onboarding
UPDATE public.profiles
SET onboarding_completed_at = NOW()
WHERE role = 'admin' AND onboarding_completed_at IS NULL;

-- 3. Admin invites table
CREATE TABLE IF NOT EXISTS public.admin_invites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    invited_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    display_name VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'revoked')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    accepted_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days')
);

ALTER TABLE public.admin_invites ENABLE ROW LEVEL SECURITY;

-- Only admins can view and manage invites
CREATE POLICY "Admins can view invites"
    ON public.admin_invites FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'admin'
        )
    );

CREATE POLICY "Admins can create invites"
    ON public.admin_invites FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'admin'
        )
    );

CREATE POLICY "Admins can update invites"
    ON public.admin_invites FOR UPDATE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid() AND p.role = 'admin'
        )
    );

-- Index for lookup by email
CREATE INDEX IF NOT EXISTS idx_admin_invites_email ON public.admin_invites(email);
CREATE INDEX IF NOT EXISTS idx_admin_invites_status ON public.admin_invites(status);
