-- Create admin_roles table
-- Referenced by articleAdminService.ts and UserManagement.tsx

CREATE TABLE IF NOT EXISTS public.admin_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('super_admin', 'editor', 'viewer')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id)
);

ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;

-- Admins can view all roles
CREATE POLICY "Admins can view roles"
    ON public.admin_roles FOR SELECT
    USING (auth.role() = 'authenticated');

-- Only super_admins can manage roles
CREATE POLICY "Super admins can manage roles"
    ON public.admin_roles FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_roles ar
            WHERE ar.user_id = auth.uid() AND ar.role = 'super_admin'
        )
    );

CREATE INDEX idx_admin_roles_user ON public.admin_roles (user_id);
CREATE INDEX idx_admin_roles_role ON public.admin_roles (role);
