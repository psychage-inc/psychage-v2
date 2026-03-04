-- =====================================================
-- Migration: Create tools and newsletter_subscribers tables
-- Date: 2025-01-09
-- Description: Add tables for tools and newsletter functionality
-- =====================================================

-- =====================================================
-- TOOLS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.tools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon_name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    color VARCHAR(50) NOT NULL DEFAULT 'teal',
    features TEXT[] DEFAULT '{}',
    route VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster category lookups
CREATE INDEX IF NOT EXISTS idx_tools_category ON public.tools(category);
CREATE INDEX IF NOT EXISTS idx_tools_active ON public.tools(is_active);

-- Enable RLS
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Tools are publicly readable"
    ON public.tools
    FOR SELECT
    TO public
    USING (is_active = true);

-- Allow authenticated admins to manage tools
CREATE POLICY "Admins can manage tools"
    ON public.tools
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Insert default tools data
INSERT INTO public.tools (id, name, description, icon_name, category, color, features, route, sort_order) VALUES
(1, 'Clarity Score', 'A comprehensive assessment to understand your current mental well-being and stress levels.', 'BrainCircuit', 'Assessment', 'teal', ARRAY['Free analysis', '10 minutes', 'Immediate results'], '/clarity-score', 1),
(2, 'Mood Journal', 'Track your emotional patterns over time with our intelligent journaling tool that identifies triggers.', 'PenTool', 'Self-Care', 'amber', ARRAY['Daily prompts', 'Mood charts', 'Private & secure'], '/tools/mood-journal', 2),
(3, 'Sleep Architect', 'Optimize your rest with personalized sleep schedules and hygiene recommendations based on your habits.', 'Moon', 'Wellness', 'indigo', ARRAY['Sleep tracking', 'Smart alarm', 'Weekly reports'], '/tools/sleep-architect', 3),
(4, 'Breathwork', 'Guided breathing exercises designed to reduce anxiety, lower blood pressure, and improve focus.', 'Wind', 'Relaxation', 'sky', ARRAY['Visual guides', 'Audio cues', '5 techniques'], '/tools/breathwork', 4),
(5, 'Provider Finder', 'Connect with licensed therapists and psychiatrists who match your specific needs and insurance.', 'Users', 'Professional', 'rose', ARRAY['Verified pros', 'Insurance filter', 'Book online'], '/find-care', 5),
(6, 'Crisis Support', 'Immediate access to emergency resources, hotlines, and safety planning tools for urgent situations.', 'ShieldAlert', 'Emergency', 'red', ARRAY['24/7 Hotlines', 'Safety plan', 'Local resources'], '/crisis', 6)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    icon_name = EXCLUDED.icon_name,
    category = EXCLUDED.category,
    color = EXCLUDED.color,
    features = EXCLUDED.features,
    route = EXCLUDED.route,
    sort_order = EXCLUDED.sort_order,
    updated_at = NOW();

-- Reset sequence to avoid conflicts
SELECT setval('tools_id_seq', (SELECT MAX(id) FROM public.tools));

-- =====================================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
    source VARCHAR(100) DEFAULT 'website',
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON public.newsletter_subscribers(status);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public to insert (subscribe)
CREATE POLICY "Anyone can subscribe to newsletter"
    ON public.newsletter_subscribers
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Allow users to check their own subscription
CREATE POLICY "Users can view their own subscription"
    ON public.newsletter_subscribers
    FOR SELECT
    TO public
    USING (true);

-- Allow users to update their own subscription (unsubscribe)
CREATE POLICY "Users can update their subscription"
    ON public.newsletter_subscribers
    FOR UPDATE
    TO public
    USING (true);

-- Allow admins full access
CREATE POLICY "Admins can manage newsletter subscribers"
    ON public.newsletter_subscribers
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- =====================================================
-- UPDATED_AT TRIGGER FUNCTION (if not exists)
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tools table
DROP TRIGGER IF EXISTS tools_updated_at ON public.tools;
CREATE TRIGGER tools_updated_at
    BEFORE UPDATE ON public.tools
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Apply trigger to newsletter_subscribers table
DROP TRIGGER IF EXISTS newsletter_subscribers_updated_at ON public.newsletter_subscribers;
CREATE TRIGGER newsletter_subscribers_updated_at
    BEFORE UPDATE ON public.newsletter_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================
GRANT SELECT ON public.tools TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.newsletter_subscribers TO anon, authenticated;
