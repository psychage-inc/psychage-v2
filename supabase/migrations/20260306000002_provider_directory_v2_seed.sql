-- =============================================================================
-- Provider Directory V2 — Seed Data
-- Populates all lookup tables with production data.
-- =============================================================================

-- Fix insurance_plans if it was created with incomplete schema
ALTER TABLE public.insurance_plans ADD COLUMN IF NOT EXISTS carrier text;
ALTER TABLE public.insurance_plans ADD COLUMN IF NOT EXISTS plan_type text;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'insurance_plans_plan_type_check'
  ) THEN
    ALTER TABLE public.insurance_plans ADD CONSTRAINT insurance_plans_plan_type_check
      CHECK (plan_type IN ('commercial', 'medicaid', 'medicare', 'tricare', 'other'));
  END IF;
END $$;

-- =============================================================================
-- PROVIDER TYPES (8 rows)
-- =============================================================================

INSERT INTO public.provider_types (slug, label, description, sort_order) VALUES
  ('therapist', 'Therapist / Counselor', 'Licensed therapists and counselors providing talk therapy', 1),
  ('psychologist', 'Psychologist', 'Doctoral-level clinical or counseling psychologists', 2),
  ('psychiatrist', 'Psychiatrist', 'Medical doctors specializing in mental health, can prescribe medication', 3),
  ('counselor', 'Licensed Counselor', 'Licensed professional counselors and mental health counselors', 4),
  ('social_worker', 'Clinical Social Worker', 'Licensed clinical social workers providing therapy', 5),
  ('clinic', 'Clinic / Treatment Center', 'Mental health clinics and treatment facilities', 6),
  ('support_group', 'Support Group', 'Peer support and group therapy programs', 7),
  ('crisis_service', 'Crisis Service', 'Crisis centers, hotlines, and mobile crisis teams', 8)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- SPECIALTIES (~50 rows across 3 categories)
-- =============================================================================

-- Conditions (mapped to Psychage Navigator condition IDs where applicable)
INSERT INTO public.specialties (slug, label, category, psychage_condition_id, sort_order) VALUES
  ('anxiety', 'Anxiety Disorders', 'condition', 'GAD', 1),
  ('depression', 'Depression', 'condition', 'MDE', 2),
  ('ptsd', 'PTSD / Trauma', 'condition', 'PTSD', 3),
  ('bipolar_disorder', 'Bipolar Disorder', 'condition', 'BPD_II', 4),
  ('ocd', 'OCD', 'condition', 'OCD', 5),
  ('adhd', 'ADHD', 'condition', 'ADHD', 6),
  ('eating_disorders', 'Eating Disorders', 'condition', 'AN', 7),
  ('schizophrenia', 'Schizophrenia & Psychotic Disorders', 'condition', 'SCZ', 8),
  ('personality_disorders', 'Personality Disorders', 'condition', 'NPD', 9),
  ('substance_use', 'Substance Use & Addiction', 'condition', 'SUD', 10),
  ('grief_loss', 'Grief & Loss', 'condition', 'PGD', 11),
  ('sleep_disorders', 'Sleep Disorders', 'condition', 'INS', 12),
  ('autism_spectrum', 'Autism Spectrum', 'condition', 'ASD', 13),
  ('phobias', 'Phobias', 'condition', 'SPP', 14),
  ('panic_disorder', 'Panic Disorder', 'condition', 'PD', 15),
  ('adjustment_disorders', 'Adjustment Disorders', 'condition', NULL, 16),
  ('social_anxiety', 'Social Anxiety', 'condition', 'SAD', 17),
  ('cptsd', 'Complex PTSD', 'condition', 'CPTSD', 18),
  ('dissociative_disorders', 'Dissociative Disorders', 'condition', 'DID', 19),
  ('body_dysmorphia', 'Body Dysmorphic Disorder', 'condition', 'BDD', 20)
ON CONFLICT (slug) DO NOTHING;

-- Treatment Approaches
INSERT INTO public.specialties (slug, label, category, sort_order) VALUES
  ('cbt', 'Cognitive Behavioral Therapy (CBT)', 'treatment_approach', 1),
  ('dbt', 'Dialectical Behavior Therapy (DBT)', 'treatment_approach', 2),
  ('emdr', 'EMDR', 'treatment_approach', 3),
  ('psychodynamic', 'Psychodynamic Therapy', 'treatment_approach', 4),
  ('humanistic', 'Humanistic / Person-Centered', 'treatment_approach', 5),
  ('family_systems', 'Family Systems Therapy', 'treatment_approach', 6),
  ('art_therapy', 'Art Therapy', 'treatment_approach', 7),
  ('play_therapy', 'Play Therapy', 'treatment_approach', 8),
  ('group_therapy', 'Group Therapy', 'treatment_approach', 9),
  ('couples_therapy', 'Couples Therapy', 'treatment_approach', 10),
  ('trauma_focused', 'Trauma-Focused Therapy', 'treatment_approach', 11),
  ('mindfulness_based', 'Mindfulness-Based Therapy', 'treatment_approach', 12),
  ('acceptance_commitment', 'Acceptance & Commitment Therapy (ACT)', 'treatment_approach', 13),
  ('motivational_interviewing', 'Motivational Interviewing', 'treatment_approach', 14),
  ('solution_focused', 'Solution-Focused Brief Therapy', 'treatment_approach', 15),
  ('somatic', 'Somatic Experiencing', 'treatment_approach', 16),
  ('narrative', 'Narrative Therapy', 'treatment_approach', 17)
ON CONFLICT (slug) DO NOTHING;

-- Populations
INSERT INTO public.specialties (slug, label, category, sort_order) VALUES
  ('children', 'Children (6-12)', 'population', 1),
  ('adolescents', 'Adolescents (13-17)', 'population', 2),
  ('adults', 'Adults (18-64)', 'population', 3),
  ('elderly', 'Older Adults (65+)', 'population', 4),
  ('couples', 'Couples', 'population', 5),
  ('families', 'Families', 'population', 6),
  ('lgbtq', 'LGBTQ+', 'population', 7),
  ('veterans', 'Veterans & Military', 'population', 8),
  ('first_responders', 'First Responders', 'population', 9),
  ('college_students', 'College Students', 'population', 10),
  ('perinatal', 'Perinatal / Postpartum', 'population', 11),
  ('men', 'Men', 'population', 12),
  ('women', 'Women', 'population', 13)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- LANGUAGES (20+ rows)
-- =============================================================================

INSERT INTO public.languages_lookup (code, label, native_label) VALUES
  ('en', 'English', 'English'),
  ('es', 'Spanish', 'Español'),
  ('zh', 'Mandarin Chinese', '中文'),
  ('ar', 'Arabic', 'العربية'),
  ('pt', 'Portuguese', 'Português'),
  ('fr', 'French', 'Français'),
  ('hi', 'Hindi', 'हिन्दी'),
  ('bn', 'Bengali', 'বাংলা'),
  ('ru', 'Russian', 'Русский'),
  ('ja', 'Japanese', '日本語'),
  ('ko', 'Korean', '한국어'),
  ('vi', 'Vietnamese', 'Tiếng Việt'),
  ('tl', 'Tagalog', 'Tagalog'),
  ('de', 'German', 'Deutsch'),
  ('it', 'Italian', 'Italiano'),
  ('pl', 'Polish', 'Polski'),
  ('ht', 'Haitian Creole', 'Kreyòl Ayisyen'),
  ('asl', 'American Sign Language', 'ASL'),
  ('fa', 'Farsi / Persian', 'فارسی'),
  ('ur', 'Urdu', 'اردو'),
  ('he', 'Hebrew', 'עברית'),
  ('tr', 'Turkish', 'Türkçe'),
  ('th', 'Thai', 'ไทย'),
  ('sw', 'Swahili', 'Kiswahili')
ON CONFLICT (code) DO NOTHING;

-- =============================================================================
-- CULTURAL COMPETENCIES (15 rows)
-- =============================================================================

INSERT INTO public.cultural_competencies (slug, label, description) VALUES
  ('lgbtq_affirming', 'LGBTQ+ Affirming', 'Affirming and knowledgeable about LGBTQ+ identities and experiences'),
  ('veterans', 'Veterans & Active Military', 'Experience working with veterans and active-duty military personnel'),
  ('military_families', 'Military Families', 'Specializes in challenges unique to military families'),
  ('faith_based', 'Faith-Integrated', 'Incorporates faith and spirituality into the therapeutic process when desired'),
  ('immigrant_refugee', 'Immigrant & Refugee Communities', 'Experienced working with immigrants, refugees, and asylum seekers'),
  ('black_african_american', 'Black / African American', 'Culturally competent care for Black and African American communities'),
  ('hispanic_latinx', 'Hispanic / Latinx', 'Culturally competent care for Hispanic and Latinx communities'),
  ('asian_american', 'Asian American / Pacific Islander', 'Culturally competent care for Asian American and Pacific Islander communities'),
  ('native_american', 'Native American / Indigenous', 'Culturally competent care for Native American and Indigenous communities'),
  ('deaf_hard_of_hearing', 'Deaf / Hard of Hearing', 'Experienced working with deaf and hard-of-hearing individuals'),
  ('neurodivergent', 'Neurodivergent-Affirming', 'Affirming approach to neurodivergent individuals including autism and ADHD'),
  ('disability', 'Disability-Informed', 'Experienced working with individuals with physical or intellectual disabilities'),
  ('womens_issues', 'Women''s Issues', 'Specializes in challenges unique to women including reproductive health'),
  ('mens_issues', 'Men''s Issues', 'Specializes in challenges unique to men including masculinity and identity'),
  ('older_adults', 'Older Adult Specialists', 'Experienced with aging-related mental health challenges')
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- INSURANCE PLANS (~35 rows)
-- =============================================================================

INSERT INTO public.insurance_plans (name, carrier, plan_type) VALUES
  -- Aetna
  ('Aetna PPO', 'Aetna', 'commercial'),
  ('Aetna HMO', 'Aetna', 'commercial'),
  ('Aetna EAP', 'Aetna', 'commercial'),
  -- Anthem / BCBS
  ('Anthem Blue Cross PPO', 'Anthem / BCBS', 'commercial'),
  ('Anthem Blue Cross HMO', 'Anthem / BCBS', 'commercial'),
  ('Blue Cross Blue Shield PPO', 'Blue Cross Blue Shield', 'commercial'),
  ('Blue Cross Blue Shield HMO', 'Blue Cross Blue Shield', 'commercial'),
  ('Blue Shield of California', 'Blue Shield of CA', 'commercial'),
  -- Cigna
  ('Cigna PPO', 'Cigna', 'commercial'),
  ('Cigna HMO', 'Cigna', 'commercial'),
  ('Cigna EAP', 'Cigna', 'commercial'),
  -- Humana
  ('Humana PPO', 'Humana', 'commercial'),
  ('Humana HMO', 'Humana', 'commercial'),
  -- Kaiser
  ('Kaiser Permanente', 'Kaiser Permanente', 'commercial'),
  -- UnitedHealthcare
  ('UnitedHealthcare PPO', 'UnitedHealthcare', 'commercial'),
  ('UnitedHealthcare HMO', 'UnitedHealthcare', 'commercial'),
  ('UnitedHealthcare EAP', 'UnitedHealthcare', 'commercial'),
  ('Optum / UBH', 'UnitedHealthcare', 'commercial'),
  -- Government
  ('Medicare Part B', 'Medicare', 'medicare'),
  ('Medicare Advantage', 'Medicare', 'medicare'),
  ('Medicaid', 'Medicaid', 'medicaid'),
  ('TRICARE', 'TRICARE', 'tricare'),
  ('TRICARE Select', 'TRICARE', 'tricare'),
  -- Other major carriers
  ('Magellan Health', 'Magellan', 'commercial'),
  ('Molina Healthcare', 'Molina', 'commercial'),
  ('Centene / Wellcare', 'Centene', 'commercial'),
  ('AmeriHealth', 'AmeriHealth', 'commercial'),
  ('EmblemHealth', 'EmblemHealth', 'commercial'),
  ('Oxford Health Plans', 'Oxford', 'commercial'),
  ('Health Net', 'Health Net', 'commercial'),
  -- Behavioral health specific
  ('Beacon Health Options', 'Beacon', 'commercial'),
  ('ComPsych EAP', 'ComPsych', 'commercial'),
  ('Lyra Health', 'Lyra', 'commercial'),
  ('Spring Health', 'Spring Health', 'commercial'),
  -- Self-pay
  ('Self-Pay / Out of Network', 'Self-Pay', 'other'),
  ('Sliding Scale Available', 'Self-Pay', 'other')
ON CONFLICT DO NOTHING;
