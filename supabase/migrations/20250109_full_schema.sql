-- =====================================================
-- COMPLETE DATABASE SCHEMA FOR PSYCHAGE
-- Date: 2025-01-09
-- Run this file in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. PROFILES TABLE (must be first - other tables depend on it)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255),
    display_name VARCHAR(255),
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'patient' CHECK (role IN ('patient', 'provider', 'admin')),
    location VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, display_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'patient')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- 2. TOOLS TABLE
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

CREATE INDEX IF NOT EXISTS idx_tools_category ON public.tools(category);
CREATE INDEX IF NOT EXISTS idx_tools_active ON public.tools(is_active);

ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tools are publicly readable"
    ON public.tools FOR SELECT TO public
    USING (is_active = true);

CREATE POLICY "Admins can manage tools"
    ON public.tools FOR ALL TO authenticated
    USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
    )
    WITH CHECK (
        EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
    );

-- Insert default tools
INSERT INTO public.tools (id, name, description, icon_name, category, color, features, route, sort_order) VALUES
(1, 'Clarity Score', 'A comprehensive assessment to understand your current mental well-being and stress levels.', 'BrainCircuit', 'Assessment', 'teal', ARRAY['Free analysis', '10 minutes', 'Immediate results'], '/clarity-score', 1),
(2, 'Mood Journal', 'Track your emotional patterns over time with our intelligent journaling tool that identifies triggers.', 'PenTool', 'Self-Care', 'amber', ARRAY['Daily prompts', 'Mood charts', 'Private & secure'], '/tools/mood-journal', 2),
(3, 'Sleep Architect', 'Optimize your rest with personalized sleep schedules and hygiene recommendations based on your habits.', 'Moon', 'Wellness', 'indigo', ARRAY['Sleep tracking', 'Smart alarm', 'Weekly reports'], '/tools/sleep-architect', 3),
(4, 'Breathwork', 'Guided breathing exercises designed to reduce anxiety, lower blood pressure, and improve focus.', 'Wind', 'Relaxation', 'sky', ARRAY['Visual guides', 'Audio cues', '5 techniques'], '/tools/breathwork', 4),
(5, 'Provider Finder', 'Connect with licensed therapists and psychiatrists who match your specific needs and insurance.', 'Users', 'Professional', 'rose', ARRAY['Verified pros', 'Insurance filter', 'Book online'], '/find-care', 5),
(6, 'Crisis Support', 'Immediate access to emergency resources, hotlines, and safety planning tools for urgent situations.', 'ShieldAlert', 'Emergency', 'red', ARRAY['24/7 Hotlines', 'Safety plan', 'Local resources'], '/crisis', 6)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name, description = EXCLUDED.description, icon_name = EXCLUDED.icon_name,
    category = EXCLUDED.category, color = EXCLUDED.color, features = EXCLUDED.features,
    route = EXCLUDED.route, sort_order = EXCLUDED.sort_order, updated_at = NOW();

SELECT setval('tools_id_seq', (SELECT MAX(id) FROM public.tools));

DROP TRIGGER IF EXISTS tools_updated_at ON public.tools;
CREATE TRIGGER tools_updated_at BEFORE UPDATE ON public.tools FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- 3. NEWSLETTER SUBSCRIBERS TABLE
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

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON public.newsletter_subscribers(status);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can view subscriptions" ON public.newsletter_subscribers FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can update subscriptions" ON public.newsletter_subscribers FOR UPDATE TO public USING (true);

DROP TRIGGER IF EXISTS newsletter_subscribers_updated_at ON public.newsletter_subscribers;
CREATE TRIGGER newsletter_subscribers_updated_at BEFORE UPDATE ON public.newsletter_subscribers FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- 4. ASSESSMENT QUESTIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.assessment_questions (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    dimension VARCHAR(50) NOT NULL CHECK (dimension IN ('anxiety', 'mood', 'stress', 'sleep')),
    options JSONB NOT NULL DEFAULT '[]',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assessment_questions_dimension ON public.assessment_questions(dimension);

ALTER TABLE public.assessment_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Assessment questions are publicly readable"
    ON public.assessment_questions FOR SELECT TO public USING (is_active = true);

INSERT INTO public.assessment_questions (id, text, dimension, options, sort_order) VALUES
(1, 'Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?', 'anxiety', '[{"text": "Not at all", "value": 0}, {"text": "Several days", "value": 1}, {"text": "More than half the days", "value": 2}, {"text": "Nearly every day", "value": 3}]', 1),
(2, 'Have you not been able to stop or control worrying?', 'anxiety', '[{"text": "Not at all", "value": 0}, {"text": "Several days", "value": 1}, {"text": "More than half the days", "value": 2}, {"text": "Nearly every day", "value": 3}]', 2),
(3, 'Little interest or pleasure in doing things?', 'mood', '[{"text": "Not at all", "value": 0}, {"text": "Several days", "value": 1}, {"text": "More than half the days", "value": 2}, {"text": "Nearly every day", "value": 3}]', 3),
(4, 'Feeling down, depressed, or hopeless?', 'mood', '[{"text": "Not at all", "value": 0}, {"text": "Several days", "value": 1}, {"text": "More than half the days", "value": 2}, {"text": "Nearly every day", "value": 3}]', 4),
(5, 'Trouble falling or staying asleep, or sleeping too much?', 'sleep', '[{"text": "Not at all", "value": 0}, {"text": "Several days", "value": 1}, {"text": "More than half the days", "value": 2}, {"text": "Nearly every day", "value": 3}]', 5),
(6, 'Feeling overwhelmed by your daily responsibilities?', 'stress', '[{"text": "Not at all", "value": 0}, {"text": "Several days", "value": 1}, {"text": "More than half the days", "value": 2}, {"text": "Nearly every day", "value": 3}]', 6),
(7, 'Feeling tired or having little energy?', 'sleep', '[{"text": "Not at all", "value": 0}, {"text": "Several days", "value": 1}, {"text": "More than half the days", "value": 2}, {"text": "Nearly every day", "value": 3}]', 7),
(8, 'Poor appetite or overeating?', 'stress', '[{"text": "Not at all", "value": 0}, {"text": "Several days", "value": 1}, {"text": "More than half the days", "value": 2}, {"text": "Nearly every day", "value": 3}]', 8)
ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, dimension = EXCLUDED.dimension, options = EXCLUDED.options, sort_order = EXCLUDED.sort_order, updated_at = NOW();

SELECT setval('assessment_questions_id_seq', (SELECT MAX(id) FROM public.assessment_questions));

DROP TRIGGER IF EXISTS assessment_questions_updated_at ON public.assessment_questions;
CREATE TRIGGER assessment_questions_updated_at BEFORE UPDATE ON public.assessment_questions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- 5. ASSESSMENT RESULTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.assessment_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    breakdown JSONB NOT NULL DEFAULT '{}',
    answers JSONB NOT NULL DEFAULT '{}',
    recommendations TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assessment_results_user ON public.assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_created ON public.assessment_results(created_at DESC);

ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own results" ON public.assessment_results FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own results" ON public.assessment_results FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- 6. SYMPTOMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.symptoms (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    is_crisis BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_symptoms_category ON public.symptoms(category);
CREATE INDEX IF NOT EXISTS idx_symptoms_crisis ON public.symptoms(is_crisis);

ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Symptoms are publicly readable" ON public.symptoms FOR SELECT TO public USING (true);

INSERT INTO public.symptoms (id, name, category, is_crisis, sort_order) VALUES
('anxiety-general', 'Feeling anxious or worried', 'Anxiety', false, 1),
('anxiety-panic', 'Panic attacks', 'Anxiety', false, 2),
('anxiety-social', 'Social anxiety', 'Anxiety', false, 3),
('mood-sad', 'Persistent sadness', 'Mood', false, 4),
('mood-hopeless', 'Feeling hopeless', 'Mood', false, 5),
('mood-irritable', 'Irritability', 'Mood', false, 6),
('sleep-insomnia', 'Difficulty sleeping', 'Sleep', false, 7),
('sleep-oversleep', 'Sleeping too much', 'Sleep', false, 8),
('stress-overwhelmed', 'Feeling overwhelmed', 'Stress', false, 9),
('stress-burnout', 'Burnout symptoms', 'Stress', false, 10),
('suicidal-thoughts', 'Thoughts of self-harm or suicide', 'Crisis', true, 100),
('self-harm', 'Self-harm behaviors', 'Crisis', true, 101)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 7. CONDITIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.conditions (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    recommended_action TEXT,
    article_id INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.conditions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Conditions are publicly readable" ON public.conditions FOR SELECT TO public USING (true);

INSERT INTO public.conditions (id, name, description, recommended_action, article_id) VALUES
('anxiety', 'Generalized Anxiety Disorder', 'Persistent and excessive worry about various aspects of daily life that is difficult to control.', 'Consider speaking with a mental health professional for proper evaluation and treatment options.', 1),
('depression', 'Major Depressive Disorder', 'A mood disorder characterized by persistent feelings of sadness, hopelessness, and loss of interest.', 'Schedule an appointment with a psychiatrist or psychologist for comprehensive assessment.', 2),
('stress', 'Chronic Stress', 'Long-term activation of the stress response system that can impact physical and mental health.', 'Explore stress management techniques and consider lifestyle changes.', 3),
('insomnia', 'Insomnia Disorder', 'Persistent difficulty falling asleep, staying asleep, or waking too early.', 'Practice good sleep hygiene and consider consulting a sleep specialist.', NULL),
('ptsd', 'Post-Traumatic Stress Disorder', 'A condition triggered by experiencing or witnessing a traumatic event.', 'Seek specialized trauma-focused therapy such as EMDR or CPT.', NULL)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 8. CONDITION-SYMPTOM MAPPING TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.condition_symptoms (
    condition_id VARCHAR(100) REFERENCES public.conditions(id) ON DELETE CASCADE,
    symptom_id VARCHAR(100) REFERENCES public.symptoms(id) ON DELETE CASCADE,
    weight DECIMAL(3,2) DEFAULT 1.0,
    PRIMARY KEY (condition_id, symptom_id)
);

ALTER TABLE public.condition_symptoms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Condition symptoms are publicly readable" ON public.condition_symptoms FOR SELECT TO public USING (true);

INSERT INTO public.condition_symptoms (condition_id, symptom_id, weight) VALUES
('anxiety', 'anxiety-general', 1.0), ('anxiety', 'anxiety-panic', 0.9), ('anxiety', 'anxiety-social', 0.8),
('depression', 'mood-sad', 1.0), ('depression', 'mood-hopeless', 0.95), ('depression', 'sleep-insomnia', 0.7), ('depression', 'sleep-oversleep', 0.7),
('stress', 'stress-overwhelmed', 1.0), ('stress', 'stress-burnout', 0.9), ('stress', 'mood-irritable', 0.7),
('insomnia', 'sleep-insomnia', 1.0)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 9. CRISIS RESOURCES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.crisis_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    description TEXT,
    available VARCHAR(100) DEFAULT '24/7',
    country VARCHAR(10) DEFAULT 'US',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.crisis_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Crisis resources are publicly readable" ON public.crisis_resources FOR SELECT TO public USING (is_active = true);

INSERT INTO public.crisis_resources (name, phone, description, available, sort_order) VALUES
('988 Suicide & Crisis Lifeline', '988', 'Free, confidential support for people in distress', '24/7', 1),
('Crisis Text Line', 'Text HOME to 741741', 'Free crisis counseling via text message', '24/7', 2),
('National Domestic Violence Hotline', '1-800-799-7233', 'Support for domestic violence survivors', '24/7', 3),
('SAMHSA National Helpline', '1-800-662-4357', 'Treatment referral service for mental health and substance use', '24/7', 4),
('Veterans Crisis Line', '988 (Press 1)', 'Support for veterans and their families', '24/7', 5)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 10. MOOD ENTRIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.mood_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    value INTEGER NOT NULL CHECK (value >= 1 AND value <= 10),
    notes TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mood_entries_user ON public.mood_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_entries_created ON public.mood_entries(created_at DESC);

ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own mood" ON public.mood_entries FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert mood" ON public.mood_entries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update mood" ON public.mood_entries FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete mood" ON public.mood_entries FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- =====================================================
-- 11. SLEEP ENTRIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.sleep_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    hours DECIMAL(4,2) NOT NULL CHECK (hours >= 0 AND hours <= 24),
    quality INTEGER NOT NULL CHECK (quality >= 1 AND quality <= 10),
    bed_time TIME,
    wake_time TIME,
    notes TEXT,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sleep_entries_user ON public.sleep_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_sleep_entries_date ON public.sleep_entries(date DESC);

ALTER TABLE public.sleep_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own sleep" ON public.sleep_entries FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert sleep" ON public.sleep_entries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update sleep" ON public.sleep_entries FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete sleep" ON public.sleep_entries FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- =====================================================
-- 12. USER ACTIVITY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_activity (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    action_type VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id VARCHAR(255),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_activity_user ON public.user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_created ON public.user_activity(created_at DESC);

ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own activity" ON public.user_activity FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert activity" ON public.user_activity FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- 13. PROVIDER ANALYTICS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.provider_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    provider_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    profile_views INTEGER DEFAULT 0,
    contact_clicks INTEGER DEFAULT 0,
    booking_requests INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(provider_id, date)
);

CREATE INDEX IF NOT EXISTS idx_provider_analytics_provider ON public.provider_analytics(provider_id);
CREATE INDEX IF NOT EXISTS idx_provider_analytics_date ON public.provider_analytics(date DESC);

ALTER TABLE public.provider_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Providers can view own analytics" ON public.provider_analytics FOR SELECT TO authenticated USING (auth.uid() = provider_id);

-- =====================================================
-- 14. AUDIT LOGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    target_type VARCHAR(100),
    target_id VARCHAR(255),
    old_value JSONB,
    new_value JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_admin ON public.audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON public.audit_logs(created_at DESC);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT TO authenticated
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
CREATE POLICY "Admins can insert audit logs" ON public.audit_logs FOR INSERT TO authenticated
    WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- =====================================================
-- 15. BOOKMARKS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    resource_type VARCHAR(50) NOT NULL CHECK (resource_type IN ('article', 'video', 'provider', 'tool')),
    resource_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, resource_type, resource_id)
);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_resource ON public.bookmarks(resource_type, resource_id);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own bookmarks" ON public.bookmarks FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert bookmarks" ON public.bookmarks FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete bookmarks" ON public.bookmarks FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================
CREATE OR REPLACE FUNCTION public.increment_provider_views(p_provider_id UUID)
RETURNS void AS $$
BEGIN
    INSERT INTO public.provider_analytics (provider_id, date, profile_views)
    VALUES (p_provider_id, CURRENT_DATE, 1)
    ON CONFLICT (provider_id, date)
    DO UPDATE SET profile_views = provider_analytics.profile_views + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.log_user_activity(
    p_user_id UUID, p_action_type VARCHAR, p_resource_type VARCHAR DEFAULT NULL,
    p_resource_id VARCHAR DEFAULT NULL, p_metadata JSONB DEFAULT '{}'
) RETURNS UUID AS $$
DECLARE v_id UUID;
BEGIN
    INSERT INTO public.user_activity (user_id, action_type, resource_type, resource_id, metadata)
    VALUES (p_user_id, p_action_type, p_resource_type, p_resource_id, p_metadata)
    RETURNING id INTO v_id;
    RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================
GRANT SELECT ON public.profiles TO authenticated;
GRANT INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.tools TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.newsletter_subscribers TO anon, authenticated;
GRANT SELECT ON public.assessment_questions TO anon, authenticated;
GRANT SELECT, INSERT ON public.assessment_results TO authenticated;
GRANT SELECT ON public.symptoms TO anon, authenticated;
GRANT SELECT ON public.conditions TO anon, authenticated;
GRANT SELECT ON public.condition_symptoms TO anon, authenticated;
GRANT SELECT ON public.crisis_resources TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mood_entries TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sleep_entries TO authenticated;
GRANT SELECT, INSERT ON public.user_activity TO authenticated;
GRANT SELECT ON public.provider_analytics TO authenticated;
GRANT SELECT, INSERT ON public.audit_logs TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.bookmarks TO authenticated;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================
DO $$ BEGIN RAISE NOTICE 'Schema created successfully! All 15 tables are ready.'; END $$;
