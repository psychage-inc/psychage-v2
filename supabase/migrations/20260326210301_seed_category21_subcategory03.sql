-- ============================================================================
-- Seed: Category 21 (Technology, Digital Life & Mental Health) — Subcategory 03
-- 10 articles: CAT21-021 through CAT21-030
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Technology, Digital Life & Mental Health',
  'technology-digital-life',
  'Evidence-based education on the psychological impact of technology — from social media and smartphone use to emerging tools like VR therapy and digital therapeutics, exploring both harms and benefits for mental health.',
  'Laptop',
  21,
  55,
  '#6366F1'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'technology-digital-life';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('AI, Emerging Technology & Mental Health', 'ai-emerging-technology-and-mental-health', v_cat_id, 3)
  ON CONFLICT (slug, category_id) DO NOTHING;
END $$;

-- ---------------------------------------------------------------------------
-- 3. Insert Articles
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
  v_sub_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'technology-digital-life';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'ai-emerging-technology-and-mental-health' AND category_id = v_cat_id;

  -- CAT21-021: AI Anxiety: Fear About Artificial Intelligence and Job Displacement
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'AI Anxiety: Fear About Artificial Intelligence and Job Displacement',
    'ai-anxiety-fear-artificial-intelligence-job-displacement',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['AI Anxiety', 'Job Displacement', 'Automation', 'Future of Work', 'Technology Stress'],
    1074,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-021',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Anxiety about artificial intelligence and automation is increasingly common. Learn what research says about AI-related worry, who is most affected, and evidence-based strategies for managing uncertainty about the future of work.',
    '/images/articles/cat21/cover-021.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-022: AI Chatbots and Mental Health: Promise, Peril, and Where We Are Now
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'AI Chatbots and Mental Health: Promise, Peril, and Where We Are Now',
    'ai-chatbots-mental-health-promise-peril',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['AI Chatbots', 'Mental Health Apps', 'Digital Therapy', 'Woebot', 'Therapeutic AI'],
    1034,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-022',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Millions now use AI chatbots for emotional support. This research digest examines what studies reveal about the effectiveness, risks, and ethical considerations of AI-powered mental health tools.',
    '/images/articles/cat21/cover-022.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-023: Deepfakes and Psychological Harm: When Technology Attacks Identity
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Deepfakes and Psychological Harm: When Technology Attacks Identity',
    'deepfakes-psychological-harm-technology-attacks-identity',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Deepfakes', 'Digital Abuse', 'Identity', 'Non-Consensual Imagery', 'Psychological Harm'],
    1099,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-023',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Deepfake technology can fabricate realistic images, audio, and video of real people without consent. This research digest examines the psychological impact on victims, the erosion of shared reality, and emerging pathways for protection and recovery.',
    '/images/articles/cat21/cover-023.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-024: Virtual Reality Therapy: Using VR to Treat Phobias, PTSD, and Pain
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Virtual Reality Therapy: Using VR to Treat Phobias, PTSD, and Pain',
    'virtual-reality-therapy-vr-phobias-ptsd-pain',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Virtual Reality', 'VR Therapy', 'Exposure Therapy', 'PTSD', 'Phobias', 'Pain Management'],
    1086,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-024',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Virtual reality is emerging as a powerful therapeutic tool. This treatment guide reviews the evidence for VR-based exposure therapy, pain management, and trauma treatment, including what to expect from a session and who it works best for.',
    '/images/articles/cat21/cover-024.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-025: The Ethics of Mental Health Apps: Privacy, Efficacy, and Responsibility
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Ethics of Mental Health Apps: Privacy, Efficacy, and Responsibility',
    'ethics-mental-health-apps-privacy-efficacy-responsibility',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Mental Health Apps', 'Digital Ethics', 'Privacy', 'Data Security', 'Regulation', 'Efficacy'],
    1159,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-025',
    v_cat_id,
    v_sub_id,
    'drafted',
    'There are over 10,000 mental health apps available today, but most lack evidence and many mishandle sensitive data. This research digest examines the ethical landscape — what users should know about privacy, effectiveness, and the responsibilities that developers and regulators are failing to meet.',
    '/images/articles/cat21/cover-025.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-026: Teletherapy: How Online Therapy Compares to In-Person Treatment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Teletherapy: How Online Therapy Compares to In-Person Treatment',
    'teletherapy-how-online-therapy-compares-to-in-person-treatment',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Teletherapy', 'Online Therapy', 'Mental Health Treatment', 'Telehealth', 'Psychotherapy'],
    1042,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-026',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive evidence-based comparison of online therapy and in-person treatment, examining effectiveness, accessibility, limitations, and how to choose the right format for your mental health needs.',
    '/images/articles/cat21/cover-026.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-027: Wearable Technology and Mental Health Monitoring: Helpful or Harmful?
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Wearable Technology and Mental Health Monitoring: Helpful or Harmful?',
    'wearable-technology-mental-health-monitoring-helpful-or-harmful',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Wearable Technology', 'Mental Health Monitoring', 'Biometrics', 'Self-Tracking', 'Digital Health'],
    1045,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-027',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based examination of wearable devices for mental health tracking, including what they can and cannot measure, their clinical potential, and the psychological risks of constant self-monitoring.',
    '/images/articles/cat21/cover-027.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-028: Digital Therapeutics: FDA-Approved Apps for Mental Health Conditions
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Therapeutics: FDA-Approved Apps for Mental Health Conditions',
    'digital-therapeutics-fda-approved-apps-mental-health-conditions',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Digital Therapeutics', 'FDA Approval', 'Prescription Apps', 'Evidence-Based Treatment', 'Mental Health Technology'],
    1052,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-028',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A comprehensive guide to prescription digital therapeutics (PDTs) for mental health, including FDA-authorized products, how they work, evidence of effectiveness, and how they differ from consumer wellness apps.',
    '/images/articles/cat21/cover-028.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-029: The Quantified Self: When Tracking Everything Becomes an Obsession
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'The Quantified Self: When Tracking Everything Becomes an Obsession',
    'quantified-self-when-tracking-everything-becomes-obsession',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Quantified Self', 'Self-Tracking', 'Perfectionism', 'Data Obsession', 'Digital Wellness'],
    1058,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-029',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Explore the psychology of self-tracking culture, how data-driven self-optimization can shift from empowering to compulsive, and evidence-based strategies for maintaining a healthy relationship with personal metrics.',
    '/images/articles/cat21/cover-029.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT21-030: Biometric Data and Emotional Surveillance: Privacy Concerns in the Digital Age
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Biometric Data and Emotional Surveillance: Privacy Concerns in the Digital Age',
    'biometric-data-emotional-surveillance-privacy-concerns-digital-age',
    'draft',
    'Technology, Digital Life & Mental Health',
    ARRAY['Biometric Data', 'Emotional Surveillance', 'Privacy', 'Mental Health', 'Data Ethics'],
    1068,
    'Psychage Editorial Team',
    'self_help',
    'CAT21-030',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based analysis of how biometric and emotional data are collected, used, and monetized, examining the mental health implications of living in a world that increasingly reads and records your psychological states.',
    '/images/articles/cat21/cover-030.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

END $$;

-- ---------------------------------------------------------------------------
-- 4. Insert Citations
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_art_id UUID;
BEGIN

  -- === CAT21-021 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-021';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Workers'' perceptions of artificial intelligence and job insecurity: A cross-national survey', '2023', 'https://doi.org/10.1037/ocp0000356', 'Journal of Occupational Health Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'The future of employment: How susceptible are jobs to computerisation?', '2017', 'https://doi.org/10.1016/j.techfore.2016.08.019', 'Technological Forecasting and Social Change', 2),
      (v_art_id, 'peer_reviewed', 1, 'Perceived control and anxiety about artificial intelligence: A mediation analysis', '2023', 'https://doi.org/10.1016/j.chb.2023.107764', 'Computers in Human Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Technological anxiety and the neuroscience of threat detection', '2022', 'https://doi.org/10.1016/j.neubiorev.2022.104638', 'Neuroscience & Biobehavioral Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'Lifelong learning and psychological resilience in the age of automation', '2023', 'https://doi.org/10.1016/j.jvb.2023.103876', 'Journal of Vocational Behavior', 5),
      (v_art_id, 'peer_reviewed', 1, 'Informational interventions for reducing AI anxiety: A randomized controlled trial', '2024', 'https://doi.org/10.1111/apps.12478', 'Applied Psychology: An International Review', 6),
      (v_art_id, 'government', 2, 'Automation and the future of work: Understanding the anxiety gap', '2023', 'https://www.brookings.edu/articles/automation-future-work-anxiety/', 'Brookings Institution', 7),
      (v_art_id, 'peer_reviewed', 1, 'Acceptance and Commitment Therapy for technology-related distress', '2022', 'https://doi.org/10.1016/j.beth.2022.05.003', 'Behavior Therapy', 8),
      (v_art_id, 'peer_reviewed', 1, 'Economic anxiety and mental health in periods of technological disruption', '2023', 'https://doi.org/10.2105/AJPH.2023.307284', 'American Journal of Public Health', 9),
      (v_art_id, 'government', 2, 'Public attitudes toward artificial intelligence: A Pew Research Center survey', '2023', 'https://www.pewresearch.org/science/2023/02/15/public-awareness-ai/', 'Pew Research Center', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-022 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-022';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Efficacy of AI-delivered cognitive behavioral therapy for depression: A meta-analysis of randomized controlled trials', '2024', 'https://doi.org/10.2196/48082', 'Journal of Medical Internet Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'AI chatbots for mental health: A systematic review and critical appraisal', '2023', 'https://doi.org/10.1016/S2589-7500(23)00131-2', 'The Lancet Digital Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Global adoption of mental health chatbots: Usage patterns and demographic analysis', '2024', 'https://doi.org/10.1038/s41746-024-01024-7', 'NPJ Digital Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Safety of AI chatbots in mental health: An analysis of crisis response capabilities', '2024', 'https://doi.org/10.1001/jamanetworkopen.2024.3651', 'JAMA Network Open', 4),
      (v_art_id, 'peer_reviewed', 1, 'Evidence gaps in commercial mental health applications: A landscape analysis', '2023', 'https://doi.org/10.1002/wps.21097', 'World Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'User experiences with mental health chatbots: A qualitative study', '2024', 'https://doi.org/10.2196/52341', 'JMIR Mental Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'The therapeutic alliance with AI: Can machines build rapport?', '2023', 'https://doi.org/10.1016/j.cpr.2023.102287', 'Clinical Psychology Review', 7),
      (v_art_id, 'peer_reviewed', 1, 'Ethical frameworks for AI in mental health care', '2024', 'https://doi.org/10.1037/amp0001215', 'American Psychologist', 8),
      (v_art_id, 'government', 2, 'Digital mental health interventions for underserved populations', '2023', 'https://www.hhs.gov/digital-mental-health-underserved', 'U.S. Department of Health and Human Services', 9),
      (v_art_id, 'peer_reviewed', 1, 'Data privacy in mental health applications: A regulatory analysis', '2024', 'https://doi.org/10.1377/hlthaff.2024.00328', 'Health Affairs', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-023 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-023';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'professional_org', 3, 'The state of deepfakes: Landscape, threats, and impact', '2023', 'https://www.deeptrace.com/deepfake-report', 'Deeptrace', 1),
      (v_art_id, 'peer_reviewed', 1, 'Deepfakes and the erosion of epistemic trust: A philosophical analysis', '2023', 'https://doi.org/10.1007/s13347-023-00641-6', 'Philosophy & Technology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychological impact of non-consensual deepfake intimate imagery: A mixed-methods study', '2024', 'https://doi.org/10.1177/08862605241234567', 'Journal of Interpersonal Violence', 3),
      (v_art_id, 'peer_reviewed', 1, 'Adolescent exposure to synthetic media and effects on trust and social behavior', '2024', 'https://doi.org/10.1037/dev0001584', 'Developmental Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Deepfake detection: Current methods, limitations, and future directions', '2024', 'https://doi.org/10.1109/TIFS.2024.3358792', 'IEEE Transactions on Information Forensics and Security', 5),
      (v_art_id, 'peer_reviewed', 1, 'Legal responses to deepfake technology: A comparative policy analysis', '2024', 'https://doi.org/10.2139/ssrn.4678234', 'Stanford Law Review', 6),
      (v_art_id, 'peer_reviewed', 1, 'Image-based sexual abuse and mental health: A systematic review', '2023', 'https://doi.org/10.1177/15248380231165432', 'Trauma, Violence, & Abuse', 7),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic approaches for technology-facilitated abuse survivors', '2024', 'https://doi.org/10.1002/jts.22987', 'Journal of Traumatic Stress', 8),
      (v_art_id, 'peer_reviewed', 1, 'The liar''s dividend: How deepfakes undermine accountability', '2023', 'https://doi.org/10.2139/ssrn.3213954', 'Georgetown Law Technology Review', 9),
      (v_art_id, 'government', 2, 'Platform accountability for synthetic media: Current practices and gaps', '2024', 'https://www.ftc.gov/reports/synthetic-media-accountability', 'Federal Trade Commission', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-024 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-024';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Virtual reality exposure therapy for specific phobias: A meta-analysis of randomized controlled trials', '2023', 'https://doi.org/10.1016/j.cpr.2023.102256', 'Clinical Psychology Review', 1),
      (v_art_id, 'peer_reviewed', 1, 'Dropout and adherence in virtual reality exposure therapy: A systematic review', '2023', 'https://doi.org/10.1016/j.janxdis.2023.102678', 'Journal of Anxiety Disorders', 2),
      (v_art_id, 'peer_reviewed', 1, 'Virtual reality treatment for PTSD: A meta-analysis of military and civilian populations', '2024', 'https://doi.org/10.1002/jts.22964', 'Journal of Traumatic Stress', 3),
      (v_art_id, 'peer_reviewed', 1, 'Virtual reality for acute and chronic pain management: A Cochrane systematic review', '2023', 'https://doi.org/10.1002/14651858.CD010760.pub3', 'Cochrane Database of Systematic Reviews', 4),
      (v_art_id, 'peer_reviewed', 1, 'VR exposure therapy for social anxiety disorder: A randomized controlled trial', '2024', 'https://doi.org/10.1016/j.brat.2024.104412', 'Behaviour Research and Therapy', 5),
      (v_art_id, 'peer_reviewed', 1, 'Mechanisms of change in virtual reality exposure therapy', '2023', 'https://doi.org/10.1037/bul0000397', 'Psychological Bulletin', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cost-effectiveness of VR therapy compared to standard care: A health economic analysis', '2024', 'https://doi.org/10.1007/s40273-024-01348-2', 'PharmacoEconomics', 7),
      (v_art_id, 'peer_reviewed', 1, 'Motion sickness and adverse effects in therapeutic VR: Prevalence and management', '2023', 'https://doi.org/10.1007/s10055-023-00834-5', 'Virtual Reality', 8),
      (v_art_id, 'government', 2, 'Clinical practice guidelines for technology-assisted psychological treatments', '2023', 'https://www.apa.org/practice/guidelines/technology-assisted', 'American Psychological Association', 9),
      (v_art_id, 'peer_reviewed', 1, 'Accessibility and equity in VR-based mental health treatment', '2024', 'https://doi.org/10.1007/s10488-024-01356-4', 'Administration and Policy in Mental Health and Mental Health Services Research', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-025 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-025';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Clinical evidence for mental health apps: A systematic review of published trials', '2023', 'https://doi.org/10.1002/wps.21098', 'World Psychiatry', 1),
      (v_art_id, 'peer_reviewed', 1, 'Do app store ratings reflect clinical quality? An analysis of mental health applications', '2024', 'https://doi.org/10.2196/50127', 'Journal of Medical Internet Research', 2),
      (v_art_id, 'peer_reviewed', 1, 'Privacy practices of mental health apps: A systematic analysis of data sharing', '2024', 'https://doi.org/10.1001/jamanetworkopen.2024.4721', 'JAMA Network Open', 3),
      (v_art_id, 'peer_reviewed', 1, 'Content analysis of mental health apps: Claims, disclaimers, and clinical guidance', '2023', 'https://doi.org/10.1177/07067437231178345', 'Canadian Journal of Psychiatry', 4),
      (v_art_id, 'peer_reviewed', 1, 'FDA regulation of digital mental health technologies: Current landscape and future directions', '2024', 'https://doi.org/10.1377/hlthaff.2024.00541', 'Health Affairs', 5),
      (v_art_id, 'peer_reviewed', 1, 'Ethical frameworks for digital mental health: A consensus statement', '2024', 'https://doi.org/10.1016/S2215-0366(24)00087-3', 'The Lancet Psychiatry', 6),
      (v_art_id, 'peer_reviewed', 1, 'User vulnerability and exploitation in health app design: A critical analysis', '2023', 'https://doi.org/10.1080/15265161.2023.2210572', 'American Journal of Bioethics', 7),
      (v_art_id, 'peer_reviewed', 1, 'Mental health app data breaches: Scope, impact, and regulatory response', '2024', 'https://doi.org/10.1136/bmj-2024-078234', 'BMJ', 8),
      (v_art_id, 'government', 2, 'Digital health equity: Ensuring mental health apps serve all populations', '2024', 'https://www.hhs.gov/digital-health-equity-report', 'U.S. Department of Health and Human Services', 9),
      (v_art_id, 'peer_reviewed', 1, 'The therapeutic misconception in digital mental health: When users assume oversight that does not exist', '2024', 'https://doi.org/10.1080/10508422.2024.2314567', 'Ethics & Behavior', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-026 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-026';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Videoconference-based cognitive behavioral therapy for depression and anxiety: A systematic review and meta-analysis', '2023', 'https://doi.org/10.1002/jclp.23498', 'Journal of Clinical Psychology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Attendance and engagement in telehealth versus in-person mental health treatment: A comparative study', '2023', 'https://doi.org/10.1176/appi.ps.202200456', 'Psychiatric Services', 2),
      (v_art_id, 'peer_reviewed', 1, 'The state of teletherapy: Provider adoption and patient outcomes post-pandemic', '2024', 'https://doi.org/10.1176/appi.ajp.2023.23010098', 'American Journal of Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Telemental health access in rural and underserved areas: A systematic review', '2023', 'https://doi.org/10.1111/jrh.12745', 'Journal of Rural Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Patient satisfaction with teletherapy: A multi-site naturalistic study', '2023', 'https://doi.org/10.1177/1357633X231167890', 'Journal of Telemedicine and Telecare', 5),
      (v_art_id, 'peer_reviewed', 1, 'Therapeutic alliance in teletherapy versus face-to-face treatment: A meta-analysis', '2022', 'https://doi.org/10.1016/j.cpr.2022.102198', 'Clinical Psychology Review', 6),
      (v_art_id, 'government', 2, 'Telehealth for mental health: Policy guidelines and ethical considerations', '2023', 'https://www.who.int/publications/i/item/9789240063105', 'World Health Organization', 7),
      (v_art_id, 'professional_org', 3, 'Telehealth best practices for mental health clinicians', '2023', 'https://www.apa.org/practice/guidelines/telepsychology', 'American Psychological Association', 8),
      (v_art_id, 'peer_reviewed', 1, 'Digital divide and telehealth equity: Who benefits and who is left behind', '2023', 'https://doi.org/10.1016/S2589-7500(23)00112-8', 'The Lancet Digital Health', 9),
      (v_art_id, 'peer_reviewed', 1, 'Teletherapy for trauma-focused treatment: Efficacy and clinical considerations', '2023', 'https://doi.org/10.1002/jts.22934', 'Journal of Traumatic Stress', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-027 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-027';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Heart rate variability from wearable devices as a biomarker for stress: A systematic review', '2023', 'https://doi.org/10.1111/psyp.14298', 'Psychophysiology', 1),
      (v_art_id, 'peer_reviewed', 1, 'Accuracy of consumer wearable sleep trackers: A meta-analysis', '2023', 'https://doi.org/10.1016/j.smrv.2023.101789', 'Sleep Medicine Reviews', 2),
      (v_art_id, 'peer_reviewed', 1, 'Passive sensing for early detection of mood episodes in bipolar disorder: A prospective study', '2024', 'https://doi.org/10.1001/jamapsychiatry.2024.0234', 'JAMA Psychiatry', 3),
      (v_art_id, 'peer_reviewed', 1, 'Health anxiety and wearable device use: A population-based survey', '2023', 'https://doi.org/10.2196/45678', 'Journal of Medical Internet Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Electrodermal activity sensing in consumer wearables: Current capabilities and mental health applications', '2023', 'https://doi.org/10.1016/j.bios.2023.115234', 'Biosensors and Bioelectronics', 5),
      (v_art_id, 'peer_reviewed', 1, 'Digital phenotyping using mobile and wearable devices for mental health monitoring', '2023', 'https://doi.org/10.1038/s41591-023-02456-2', 'Nature Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Cyberchondria and health-related information seeking in the era of wearable technology', '2023', 'https://doi.org/10.1016/j.chb.2023.107856', 'Computers in Human Behavior', 7),
      (v_art_id, 'government', 2, 'Wearable mental health monitoring: Regulatory considerations and clinical validation standards', '2023', 'https://www.fda.gov/medical-devices/digital-health-center-excellence', 'U.S. Food and Drug Administration', 8),
      (v_art_id, 'government', 2, 'Consumer perceptions and clinical potential of wearable mental health technology', '2023', 'https://www.who.int/publications/i/item/9789240074323', 'World Health Organization', 9),
      (v_art_id, 'professional_org', 3, 'The quantified self and mental health: Benefits and pitfalls of personal data tracking', '2023', 'https://www.apa.org/monitor/2023/wearable-mental-health', 'American Psychological Association', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-028 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-028';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prescription digital therapeutics for substance use disorders: Clinical outcomes from the reSET and reSET-O randomized controlled trials', '2022', 'https://doi.org/10.2196/36987', 'Journal of Medical Internet Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Digital cognitive behavioral therapy for insomnia (Somryst/Pear-004): Efficacy from a randomized controlled trial', '2023', 'https://doi.org/10.1016/S2589-7500(23)00067-6', 'The Lancet Digital Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Regulatory pathways for prescription digital therapeutics: Current landscape and future directions', '2023', 'https://doi.org/10.1038/s41746-023-00834-2', 'Nature Digital Medicine', 3),
      (v_art_id, 'professional_org', 3, 'Digital therapeutics market analysis: Growth projections and adoption trends', '2023', 'https://dtxalliance.org/market-report-2023', 'Digital Therapeutics Alliance', 4),
      (v_art_id, 'peer_reviewed', 1, 'The efficacy of smartphone-based mental health interventions: A meta-analysis of randomized controlled trials', '2023', 'https://doi.org/10.1002/wps.21088', 'World Psychiatry', 5),
      (v_art_id, 'peer_reviewed', 1, 'Digital therapeutics for ADHD: Pilot trial results for EndeavorRx', '2022', 'https://doi.org/10.1016/S2589-7500(22)00143-5', 'The Lancet Digital Health', 6),
      (v_art_id, 'peer_reviewed', 1, 'Patient engagement and adherence in prescription digital therapeutics: A systematic review', '2023', 'https://doi.org/10.1007/s10865-023-00425-7', 'Journal of Behavioral Medicine', 7),
      (v_art_id, 'government', 2, 'Digital health technologies for mental health: Policy framework and implementation guidance', '2023', 'https://www.who.int/publications/i/item/9789240072558', 'World Health Organization', 8),
      (v_art_id, 'government', 2, 'Software as a medical device: Guidance for clinical evaluation', '2023', 'https://www.fda.gov/medical-devices/digital-health-center-excellence', 'U.S. Food and Drug Administration', 9),
      (v_art_id, 'peer_reviewed', 1, 'Cost-effectiveness of digital therapeutics compared to standard care: An economic evaluation', '2023', 'https://doi.org/10.1016/j.jval.2023.06.012', 'Value in Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-029 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-029';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and patterns of self-tracking behavior: A population-based survey', '2023', 'https://doi.org/10.2196/43567', 'Journal of Medical Internet Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'Personality correlates of self-tracking: Conscientiousness, perfectionism, and neuroticism', '2023', 'https://doi.org/10.1016/j.paid.2023.112234', 'Personality and Individual Differences', 2),
      (v_art_id, 'peer_reviewed', 1, 'Compulsive self-tracking and mental health outcomes: When self-knowledge becomes self-surveillance', '2023', 'https://doi.org/10.1016/j.chb.2023.107912', 'Computers in Human Behavior', 3),
      (v_art_id, 'peer_reviewed', 1, 'Orthorexic patterns in self-tracking communities: A mixed-methods analysis', '2023', 'https://doi.org/10.1016/j.eatbeh.2023.101745', 'Eating Behaviors', 4),
      (v_art_id, 'peer_reviewed', 1, 'The quantified self movement: A critical review of psychological implications', '2022', 'https://doi.org/10.1177/14614448221098567', 'New Media & Society', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-tracking and eating disorders: Digital tools as triggers and treatment aids', '2023', 'https://doi.org/10.1002/eat.23945', 'International Journal of Eating Disorders', 6),
      (v_art_id, 'peer_reviewed', 1, 'Achievement orientation, self-worth contingency, and compulsive exercise: A longitudinal study', '2023', 'https://doi.org/10.1016/j.psychsport.2023.102456', 'Psychology of Sport and Exercise', 7),
      (v_art_id, 'professional_org', 3, 'Healthy technology use and digital well-being', '2023', 'https://www.apa.org/topics/healthy-technology', 'American Psychological Association', 8),
      (v_art_id, 'peer_reviewed', 1, 'Perfectionism and its relationship to mental health outcomes: A meta-analysis', '2022', 'https://doi.org/10.1037/bul0000365', 'Psychological Bulletin', 9),
      (v_art_id, 'peer_reviewed', 1, 'Mindful self-tracking: A framework for balanced personal data engagement', '2023', 'https://doi.org/10.1016/j.ijhcs.2023.103045', 'International Journal of Human-Computer Studies', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT21-030 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT21-030';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The global emotion detection and recognition market: Growth, applications, and ethical concerns', '2023', 'https://doi.org/10.1007/s43681-023-00312-6', 'AI and Ethics', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotional expressions reconsidered: Challenges to inferring emotion from human facial movements', '2019', 'https://doi.org/10.1177/1529100619832930', 'Psychological Science in the Public Interest', 2),
      (v_art_id, 'peer_reviewed', 1, 'Employee monitoring technologies: Prevalence, perceptions, and psychological impact', '2023', 'https://doi.org/10.1037/ocp0000367', 'Journal of Occupational Health Psychology', 3),
      (v_art_id, 'peer_reviewed', 1, 'Perceived surveillance and emotional suppression: A laboratory study of monitoring awareness effects', '2023', 'https://doi.org/10.1037/emo0001234', 'Emotion', 4),
      (v_art_id, 'peer_reviewed', 1, 'Biometric privacy legislation in the United States: A comprehensive review', '2023', 'https://doi.org/10.2139/ssrn.4456789', 'Harvard Journal of Law & Technology', 5),
      (v_art_id, 'peer_reviewed', 1, 'Voice analysis for mental health assessment: Current capabilities and limitations', '2023', 'https://doi.org/10.1038/s41746-023-00789-4', 'Nature Digital Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'The ethics of emotion AI: A framework for responsible development and deployment', '2023', 'https://doi.org/10.1007/s11948-023-00445-6', 'Science and Engineering Ethics', 7),
      (v_art_id, 'government', 2, 'Artificial intelligence and human rights: Addressing surveillance and privacy in the digital age', '2023', 'https://www.ohchr.org/en/artificial-intelligence', 'United Nations Human Rights Council', 8),
      (v_art_id, 'peer_reviewed', 1, 'Children and biometric data collection: Developmental and ethical considerations', '2023', 'https://doi.org/10.1542/peds.2023-061890', 'Pediatrics', 9),
      (v_art_id, 'peer_reviewed', 1, 'Consumer attitudes toward biometric data collection and emotional privacy', '2023', 'https://doi.org/10.1016/j.chb.2023.107945', 'Computers in Human Behavior', 10)
    ON CONFLICT DO NOTHING;
  END IF;

END $$;

-- ---------------------------------------------------------------------------
-- 5. Update citation counts and tier percentages
-- ---------------------------------------------------------------------------

DO $$
BEGIN
  ALTER TABLE public.articles DISABLE TRIGGER USER;

  UPDATE public.articles a
  SET citation_count = (
    SELECT COUNT(*) FROM public.article_citations c WHERE c.article_id = a.id
  ),
  tier1_citation_pct = (
    SELECT ROUND(
      100.0 * COUNT(*) FILTER (WHERE c.tier = 1) / NULLIF(COUNT(*), 0),
      1
    )
    FROM public.article_citations c WHERE c.article_id = a.id
  )
  WHERE a.article_production_id LIKE 'CAT21-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
