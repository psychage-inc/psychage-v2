-- =============================================================================
-- Migration 006: Seed AI provider directory with sample data
-- =============================================================================

INSERT INTO ai_providers (name, credentials, provider_type, specialties, location_city, location_state, location_country, telehealth_available, languages, bio, is_verified, listing_tier) VALUES

-- United States
('Dr. Sarah Chen', 'Ph.D., Licensed Clinical Psychologist', 'psychologist',
 ARRAY['depression', 'anxiety', 'trauma', 'ptsd'],
 'New York', 'NY', 'US', TRUE, ARRAY['en', 'zh'],
 'Specializing in evidence-based treatments for depression and anxiety disorders with over 15 years of clinical experience.',
 TRUE, 'premium'),

('Dr. Marcus Williams', 'MD, Board-Certified Psychiatrist', 'psychiatrist',
 ARRAY['depression', 'bipolar', 'schizophrenia', 'adhd'],
 'Los Angeles', 'CA', 'US', TRUE, ARRAY['en', 'es'],
 'Board-certified psychiatrist offering comprehensive medication management and psychotherapy integration.',
 TRUE, 'premium'),

('Emily Rodriguez, LCSW', 'LCSW, Certified Trauma Specialist', 'social_worker',
 ARRAY['trauma', 'ptsd', 'grief', 'domestic_violence'],
 'Chicago', 'IL', 'US', TRUE, ARRAY['en', 'es'],
 'Trauma-informed therapist specializing in EMDR and somatic experiencing for survivors of violence and loss.',
 TRUE, 'basic'),

('Dr. James Park', 'Psy.D., Licensed Clinical Psychologist', 'psychologist',
 ARRAY['ocd', 'anxiety', 'phobias', 'panic_disorder'],
 'San Francisco', 'CA', 'US', TRUE, ARRAY['en', 'ko'],
 'Expert in exposure and response prevention therapy for OCD and related anxiety disorders.',
 TRUE, 'premium'),

('Lisa Thompson, LPC', 'LPC, National Certified Counselor', 'counselor',
 ARRAY['depression', 'relationship_issues', 'self_esteem', 'life_transitions'],
 'Austin', 'TX', 'US', TRUE, ARRAY['en'],
 'Warm, collaborative approach to counseling for adults navigating life changes and emotional challenges.',
 TRUE, 'basic'),

-- United Kingdom
('Dr. Amara Okafor', 'DClinPsy, HCPC Registered', 'psychologist',
 ARRAY['depression', 'anxiety', 'eating_disorders', 'body_image'],
 'London', NULL, 'GB', TRUE, ARRAY['en'],
 'Clinical psychologist specializing in the intersection of eating disorders, body image, and mood disorders.',
 TRUE, 'premium'),

('Tom Mitchell, MBACP', 'MBACP Accredited Counsellor', 'counselor',
 ARRAY['anxiety', 'stress', 'workplace_burnout', 'mens_health'],
 'London', NULL, 'GB', TRUE, ARRAY['en'],
 'Person-centred counsellor with particular focus on workplace stress, burnout, and men''s mental health.',
 TRUE, 'basic'),

('Dr. Priya Sharma', 'MRCPsych, Consultant Psychiatrist', 'psychiatrist',
 ARRAY['bipolar', 'depression', 'psychosis', 'medication_management'],
 'Manchester', NULL, 'GB', TRUE, ARRAY['en', 'hi'],
 'Consultant psychiatrist providing expert medication management and holistic treatment planning.',
 TRUE, 'premium'),

-- Canada
('Dr. Marie-Claire Dubois', 'Ph.D., Registered Psychologist', 'psychologist',
 ARRAY['trauma', 'ptsd', 'anxiety', 'depression'],
 'Montreal', 'QC', 'CA', TRUE, ARRAY['en', 'fr'],
 'Bilingual psychologist specializing in trauma recovery using EMDR, CPT, and mindfulness-based approaches.',
 TRUE, 'premium'),

('Dr. Ryan Nakamura', 'MD, FRCPC', 'psychiatrist',
 ARRAY['adhd', 'depression', 'anxiety', 'substance_use'],
 'Toronto', 'ON', 'CA', TRUE, ARRAY['en'],
 'Psychiatrist specializing in ADHD and co-occurring conditions across the lifespan.',
 TRUE, 'basic'),

-- Australia
('Dr. Kate Murray', 'MAPS, Clinical Psychologist', 'psychologist',
 ARRAY['anxiety', 'depression', 'perinatal_mental_health', 'sleep'],
 'Sydney', 'NSW', 'AU', TRUE, ARRAY['en'],
 'Clinical psychologist with expertise in perinatal mental health, sleep disorders, and anxiety management.',
 TRUE, 'premium'),

('Dr. Aiden O''Brien', 'FRANZCP, Psychiatrist', 'psychiatrist',
 ARRAY['depression', 'bipolar', 'anxiety', 'ptsd'],
 'Melbourne', 'VIC', 'AU', TRUE, ARRAY['en'],
 'Consultant psychiatrist offering evidence-based pharmacotherapy and psychoeducation for mood disorders.',
 TRUE, 'basic'),

-- Sweden
('Dr. Erik Lindström', 'Legitimerad Psykolog', 'psychologist',
 ARRAY['depression', 'anxiety', 'stress', 'burnout'],
 'Stockholm', NULL, 'SE', TRUE, ARRAY['sv', 'en'],
 'Licensed psychologist specializing in CBT for depression, anxiety, and workplace burnout.',
 TRUE, 'premium'),

-- Brazil
('Dra. Fernanda Costa', 'CRP, Psicóloga Clínica', 'psychologist',
 ARRAY['anxiety', 'depression', 'relationship_issues', 'self_esteem'],
 'São Paulo', 'SP', 'BR', TRUE, ARRAY['pt', 'en'],
 'Clinical psychologist with expertise in cognitive behavioral therapy and interpersonal therapy.',
 TRUE, 'basic'),

-- Spain
('Dr. Miguel Ángel Torres', 'Psicólogo Sanitario Colegiado', 'psychologist',
 ARRAY['anxiety', 'ptsd', 'phobias', 'ocd'],
 'Madrid', NULL, 'ES', TRUE, ARRAY['es', 'en'],
 'Licensed health psychologist specializing in anxiety spectrum disorders and trauma-focused treatment.',
 TRUE, 'premium'),

-- India
('Dr. Ananya Krishnan', 'MRCPsych, Consultant Psychiatrist', 'psychiatrist',
 ARRAY['depression', 'anxiety', 'schizophrenia', 'bipolar'],
 'Mumbai', 'MH', 'IN', TRUE, ARRAY['en', 'hi'],
 'Consultant psychiatrist providing culturally sensitive mental healthcare with international training.',
 TRUE, 'basic'),

-- Online-only / Telehealth specialists
('Jordan Blake, LMFT', 'LMFT, Certified Gottman Therapist', 'therapist',
 ARRAY['relationship_issues', 'couples_therapy', 'family_conflict', 'communication'],
 'Remote', NULL, 'US', TRUE, ARRAY['en'],
 'Licensed marriage and family therapist offering evidence-based couples and family therapy exclusively via telehealth.',
 TRUE, 'premium'),

('Dr. Fatima Al-Hassan', 'Ph.D., Clinical Psychologist', 'psychologist',
 ARRAY['trauma', 'cultural_adjustment', 'anxiety', 'depression'],
 'Remote', NULL, 'US', TRUE, ARRAY['en', 'ar'],
 'Specializing in culturally responsive therapy for immigrant and refugee communities.',
 TRUE, 'premium');
