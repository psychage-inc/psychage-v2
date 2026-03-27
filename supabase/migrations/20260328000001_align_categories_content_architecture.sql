-- ============================================================================
-- Align article_categories to content-architecture slugs
-- Ensures all 18 active content-architecture categories exist in the DB
-- with correct display_order for frontend rendering
-- ============================================================================

-- Insert all 18 content-architecture categories (skip if slug already exists)
INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES
  ('Emotional Regulation & Self-Awareness', 'emotional-regulation', 'Foundational emotional literacy — identifying, naming, and modulating emotions.', 'Flame', 1, 80, '#F43F5E'),
  ('Anxiety, Stress & Overwhelm', 'anxiety-stress', 'Understanding and managing various forms of anxiety, panic, and chronic stress.', 'Brain', 2, 90, '#0D9488'),
  ('Relationships & Communication', 'relationships-communication', 'Building deeper connections, navigating conflict, setting boundaries, and strengthening communication.', 'Users', 3, 80, '#EC4899'),
  ('Self-Worth, Confidence & Identity', 'self-worth-identity', 'Building self-worth, confidence, body image, and authentic identity.', 'Heart', 4, 70, '#F97316'),
  ('Work, Productivity & Burnout', 'work-productivity', 'Navigating burnout, professional growth, work-life balance, and academic stress.', 'Briefcase', 5, 75, '#3B82F6'),
  ('Family, Parenting & Childhood Patterns', 'family-parenting', 'Understanding family systems, parenting challenges, and breaking intergenerational patterns.', 'Home', 6, 75, '#10B981'),
  ('Depression, Grief & Loss', 'depression-grief', 'Resources for depression, grief, bereavement, and emotional regulation.', 'CloudRain', 7, 70, '#6366F1'),
  ('Habits, Motivation & Behavior Change', 'habits-behavior-change', 'The psychology of habits, motivation, and behavior change.', 'Target', 8, 65, '#22C55E'),
  ('Sleep, Body & Mind-Body Connection', 'sleep-body-connection', 'Sleep science, exercise psychology, nutrition, and somatic awareness.', 'Moon', 9, 60, '#8B5CF6'),
  ('Digital Life, Social Media & Modern Stressors', 'digital-life', 'Managing digital life, social media impact, and modern stressors.', 'Smartphone', 10, 50, '#06B6D4'),
  ('Trauma-Informed Education & Healing', 'trauma-healing', 'Understanding trauma and evidence-based paths to healing and recovery.', 'Shield', 11, 55, '#EF4444'),
  ('Cultural Perspectives, Inclusion & Global Wellness', 'cultural-global', 'Cultural perspectives on mental health, reducing stigma, and inclusive approaches.', 'Globe', 12, 50, '#06B6D4'),
  ('Aging, Dementia & Late-Life Mental Health', 'aging-dementia-late-life', 'Mental health challenges unique to older adults, dementia, caregiving, and healthy aging.', 'Clock', 13, 55, '#F59E0B'),
  ('Women''s Mental Health', 'womens-mental-health', 'Mental health issues affecting women across the lifespan.', 'Flower2', 14, 50, '#D946EF'),
  ('Men''s Mental Health', 'mens-mental-health', 'Evidence-based education on men''s mental health and help-seeking barriers.', 'UserCheck', 15, 50, '#2563EB'),
  ('Chronic Illness, Pain & Medical Psychology', 'chronic-illness-pain', 'Psychological dimensions of chronic illness, pain neuroscience, and resilience.', 'Activity', 16, 50, '#65A30D'),
  ('Technology, Digital Life & Mental Health', 'technology-digital-life', 'Psychological impact of technology, from social media to digital therapeutics.', 'Monitor', 17, 50, '#64748B'),
  ('Spirituality, Meaning & Existential Mental Health', 'spirituality-meaning', 'Existential psychology — meaning, mortality, freedom, and isolation.', 'Sunrise', 18, 50, '#EAB308')
ON CONFLICT (slug) DO UPDATE SET
  display_order = EXCLUDED.display_order,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color;
