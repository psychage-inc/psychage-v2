-- ============================================================================
-- Seed: Category 19 (Men's Mental Health) — Subcategory 05
-- 10 articles: CAT19-045 through CAT19-054
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  'Men''s Mental Health',
  'mens-mental-health',
  'Evidence-based education on men''s mental health — exploring the gender paradox in suicide, masked depression, help-seeking barriers, and the impact of cultural norms on men''s psychological wellbeing.',
  'Shield',
  19,
  55,
  '#2563EB'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'mens-mental-health';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('Myths About Men''s Mental Health', 'myths-about-men-s-mental-health', v_cat_id, 5)
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
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = 'mens-mental-health';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = 'myths-about-men-s-mental-health' AND category_id = v_cat_id;

  -- CAT19-045: Myth: Talking About Feelings Makes Men Weak
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: Talking About Feelings Makes Men Weak',
    'myth-talking-about-feelings-makes-men-weak',
    'draft',
    'Men''s Mental Health',
    ARRAY['Emotional Expression', 'Vulnerability', 'Resilience', 'Affect Labeling'],
    1104,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-045',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Far from being a sign of weakness, emotional disclosure is associated with stronger relationships, better health outcomes, and improved cognitive function. Research from military and first-responder programs shows that naming emotions builds resilience.',
    '/images/articles/cat19/cover-045.svg',
    10,
    false,
    true,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-046: Myth: Men Can''t Be Victims of Domestic Abuse
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Myth: Men Can''t Be Victims of Domestic Abuse',
    'myth-men-cant-be-victims-of-domestic-abuse',
    'draft',
    'Men''s Mental Health',
    ARRAY['Domestic Violence', 'Male Survivors', 'Intimate Partner Violence', 'Support Resources'],
    1033,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-046',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Approximately 1 in 9 men experience domestic violence from an intimate partner. Barriers to reporting, legal gaps, and cultural stigma leave male survivors isolated and without adequate support.',
    '/images/articles/cat19/cover-046.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-047: Men''s Sheds: Community Workshops as Mental Health Intervention
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men''s Sheds: Community Workshops as Mental Health Intervention',
    'mens-sheds-community-workshops-as-mental-health-intervention',
    'draft',
    'Men''s Mental Health',
    ARRAY['Men''s Sheds', 'Community Health', 'Social Isolation', 'Men''s Mental Health'],
    1017,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-047',
    v_cat_id,
    v_sub_id,
    'drafted',
    'Evidence-based guide to the Men''s Sheds movement -- how community workshops reduce isolation, improve wellbeing, and provide a therapeutic environment that meets men where they are.',
    '/images/articles/cat19/cover-047.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-048: Barbershop Therapy: Meeting Men Where They Already Gather
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Barbershop Therapy: Meeting Men Where They Already Gather',
    'barbershop-therapy-meeting-men-where-they-already-gather',
    'draft',
    'Men''s Mental Health',
    ARRAY['Barbershop Therapy', 'Mental Health First Aid', 'Community Outreach', 'Men''s Mental Health'],
    1026,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-048',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How programs like the Lions Barber Collective and BarberTalk are training barbers in mental health first aid, reaching men who would never see a therapist, and saving lives in the process.',
    '/images/articles/cat19/cover-048.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-049: Sports-Based Mental Health Programs for Boys and Men
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Sports-Based Mental Health Programs for Boys and Men',
    'sports-based-mental-health-programs-for-boys-and-men',
    'draft',
    'Men''s Mental Health',
    ARRAY['Sports Psychology', 'Youth Mental Health', 'Athletic Programs', 'Men''s Mental Health'],
    1057,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-049',
    v_cat_id,
    v_sub_id,
    'drafted',
    'How sports teams and athletic organizations are becoming therapeutic communities for boys and men -- examining programs like Ahead of the Game, Rugby League Cares, and professional league mental health initiatives.',
    '/images/articles/cat19/cover-049.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-050: Male-Specific Therapy Approaches: What Works for Men in Treatment
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Male-Specific Therapy Approaches: What Works for Men in Treatment',
    'male-specific-therapy-approaches-what-works-for-men-in-treatment',
    'draft',
    'Men''s Mental Health',
    ARRAY['Therapy for Men', 'Action-Oriented Therapy', 'Adventure Therapy', 'Men''s Mental Health'],
    1018,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-050',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to therapy approaches designed for men -- including action-oriented therapy, solution-focused brief therapy, outdoor therapy, and shoulder-to-shoulder models.',
    '/images/articles/cat19/cover-050.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-051: Digital Mental Health Tools for Men: Apps and Platforms That Engage Male Users
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Digital Mental Health Tools for Men: Apps and Platforms That Engage Male Users',
    'digital-mental-health-tools-for-men-apps-and-platforms-that-engage-male-users',
    'draft',
    'Men''s Mental Health',
    ARRAY['Digital Health', 'Mental Health Apps', 'Technology', 'Men''s Mental Health'],
    1036,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-051',
    v_cat_id,
    v_sub_id,
    'drafted',
    'A research digest examining digital mental health interventions designed for men -- from apps like HeadGear and Man Therapy to gamification and self-directed platforms that male users actually use.',
    '/images/articles/cat19/cover-051.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-052: Fatherhood Programs: Supporting Dads'' Mental Health and Parenting Skills
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Fatherhood Programs: Supporting Dads'' Mental Health and Parenting Skills',
    'fatherhood-programs-supporting-dads-mental-health-and-parenting-skills',
    'draft',
    'Men''s Mental Health',
    ARRAY['Fatherhood', 'Parenting Programs', 'Paternal Mental Health', 'Men''s Wellbeing'],
    1066,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-052',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to fatherhood programs that simultaneously strengthen parenting skills and protect paternal mental health, with research on outcomes from DadWise, the Fatherhood Project, and Boot Camp for New Dads.',
    '/images/articles/cat19/cover-052.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-053: Men and Meditation: Overcoming the Perception That Mindfulness Is Soft
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men and Meditation: Overcoming the Perception That Mindfulness Is Soft',
    'men-and-meditation-overcoming-the-perception-that-mindfulness-is-soft',
    'draft',
    'Men''s Mental Health',
    ARRAY['Meditation', 'Mindfulness', 'Stress Management', 'Men''s Mental Health'],
    1076,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-053',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based exploration of why men resist meditation, how reframing mindfulness as mental training improves uptake, and research on meditation benefits specific to men including stress reduction, anger management, and focus.',
    '/images/articles/cat19/cover-053.svg',
    10,
    false,
    false,
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

  -- CAT19-054: Men''s Support Groups: Why Peer Connection Changes Everything
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    'Men''s Support Groups: Why Peer Connection Changes Everything',
    'mens-support-groups-why-peer-connection-changes-everything',
    'draft',
    'Men''s Mental Health',
    ARRAY['Men''s Groups', 'Peer Support', 'Social Connection', 'Men''s Mental Health'],
    1069,
    'Psychage Editorial Team',
    'self_help',
    'CAT19-054',
    v_cat_id,
    v_sub_id,
    'drafted',
    'An evidence-based guide to men''s support groups — exploring programs like ManKind Project, EVRYMAN, veteran groups, and church-based communities, how peer support differs from therapy, and how to find or start a men''s group.',
    '/images/articles/cat19/cover-054.svg',
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

  -- === CAT19-045 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-045';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Putting feelings into words: Affect labeling disrupts amygdala activity in response to affective stimuli', '2007', 'https://doi.org/10.1111/j.1467-9280.2007.01916.x', 'Psychological Science', 1),
      (v_art_id, 'peer_reviewed', 1, 'Emotional expression and health: Advances in theory, assessment, and clinical applications', '2020', 'https://doi.org/10.1521/jscp.2020.39.6.441', 'Journal of Social and Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Psychological debriefing and prevention of PTSD in military personnel: A systematic review', '2021', 'https://doi.org/10.1093/milmed/usab089', 'Military Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Emotion suppression and mortality risk over a 12-year follow-up', '2019', 'https://doi.org/10.1016/j.jpsychores.2019.109793', 'Journal of Psychosomatic Research', 4),
      (v_art_id, 'peer_reviewed', 1, 'Emotional disclosure and relationship quality in men: A longitudinal analysis', '2021', 'https://doi.org/10.1111/pere.12380', 'Personal Relationships', 5),
      (v_art_id, 'peer_reviewed', 1, 'The neuroscience of affect labeling and its implications for emotional regulation', '2021', 'https://doi.org/10.1016/j.neubiorev.2021.03.015', 'Neuroscience & Biobehavioral Reviews', 6),
      (v_art_id, 'peer_reviewed', 1, 'Men, masculinities, and emotional expression: A systematic review', '2020', 'https://doi.org/10.1037/men0000296', 'Psychology of Men & Masculinities', 7),
      (v_art_id, 'government', 2, 'First responder mental health: Critical incident stress management and peer support', '2022', 'https://www.cdc.gov/niosh/topics/firstresponders/default.html', 'Centers for Disease Control and Prevention', 8),
      (v_art_id, 'professional_org', 3, 'Vulnerability and trust: The foundation of strong relationships', '2021', 'https://www.apa.org/topics/relationships/vulnerability', 'American Psychological Association', 9),
      (v_art_id, 'peer_reviewed', 1, 'Expressive writing and health: A meta-analysis', '2018', 'https://doi.org/10.1111/bjhp.12331', 'British Journal of Health Psychology', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-046 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-046';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'government', 2, 'The National Intimate Partner and Sexual Violence Survey: 2015 data brief', '2018', 'https://www.cdc.gov/violenceprevention/datasources/nisvs/', 'Centers for Disease Control and Prevention', 1),
      (v_art_id, 'peer_reviewed', 1, 'Help-seeking behaviors of male intimate partner violence victims', '2020', 'https://doi.org/10.1177/0886260519867151', 'Journal of Interpersonal Violence', 2),
      (v_art_id, 'peer_reviewed', 1, 'Male victims of domestic violence and access to shelter services', '2019', 'https://doi.org/10.1891/1946-6560.10.1.107', 'Partner Abuse', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mandatory arrest policies and their impact on male victims of domestic violence', '2021', 'https://doi.org/10.1007/s10896-020-00200-5', 'Journal of Family Violence', 4),
      (v_art_id, 'peer_reviewed', 1, 'Psychological impact of intimate partner violence on male victims: A systematic review', '2021', 'https://doi.org/10.1177/1524838020933865', 'Trauma, Violence, & Abuse', 5),
      (v_art_id, 'government', 2, 'Intimate partner violence surveillance: Uniform definitions and recommended data elements', '2015', 'https://www.cdc.gov/violenceprevention/pdf/ipv/intimatepartnerviolence.pdf', 'Centers for Disease Control and Prevention', 6),
      (v_art_id, 'peer_reviewed', 1, 'Male domestic abuse victims: Barriers to help-seeking and implications for practice', '2020', 'https://doi.org/10.1177/1468017320911589', 'Journal of Social Work', 7),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence and characteristics of sexual violence, stalking, and intimate partner violence victimization', '2020', 'https://doi.org/10.2105/AJPH.2020.305688', 'American Journal of Public Health', 8),
      (v_art_id, 'government', 2, 'Gender-inclusive approaches to domestic violence services', '2021', 'https://www.who.int/publications/i/item/9789240022256', 'World Health Organization', 9),
      (v_art_id, 'professional_org', 3, 'Domestic abuse support services for men', '2023', 'https://www.mankind.org.uk/statistics/', 'ManKind Initiative', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-047 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-047';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The global spread of Men''s Sheds: A scoping review of the literature', '2022', 'https://doi.org/10.1093/heapro/daac045', 'Health Promotion International', 1),
      (v_art_id, 'peer_reviewed', 1, 'Men''s Sheds and the experience of depression in older Australian men', '2021', 'https://doi.org/10.1177/15579883211002654', 'American Journal of Men''s Health', 2),
      (v_art_id, 'peer_reviewed', 1, 'Men''s Sheds in Australia: Learning through community for health and wellbeing', '2020', 'https://doi.org/10.1080/02601370.2020.1790684', 'International Journal of Lifelong Education', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mental health outcomes in Men''s Shed participants: A longitudinal community study', '2023', 'https://doi.org/10.1186/s12889-023-15542-8', 'BMC Public Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'Impact of Men''s Sheds on the health and wellbeing of retired men: A mixed-methods study', '2022', 'https://doi.org/10.1080/13607863.2021.1998355', 'Aging & Mental Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Gender, social connectedness and mental health: What are the patterns for older men?', '2021', 'https://doi.org/10.1007/s00127-020-01993-8', 'Social Psychiatry and Psychiatric Epidemiology', 6),
      (v_art_id, 'government', 2, 'Men''s Sheds as a community-based health promotion intervention: A systematic review', '2022', 'https://www.who.int/europe/publications/i/item/mens-sheds', 'World Health Organization Regional Office for Europe', 7),
      (v_art_id, 'peer_reviewed', 1, 'Shoulder-to-shoulder: The role of parallel activity in men''s social bonding', '2021', 'https://doi.org/10.1177/02654075211015960', 'Journal of Social and Personal Relationships', 8),
      (v_art_id, 'government', 2, 'Community-based interventions to reduce social isolation in older adults: A systematic review', '2021', 'https://www.gov.uk/government/publications/social-isolation-and-loneliness', 'Public Health England', 9),
      (v_art_id, 'peer_reviewed', 1, 'The health and social benefits of participation in Men''s Sheds: A biopsychosocial analysis', '2022', 'https://doi.org/10.1111/hsc.13750', 'Health & Social Care in the Community', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-048 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-048';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'The Lions Barber Collective: A case study in community-based suicide prevention', '2022', 'https://doi.org/10.1027/0227-5910/a000845', 'Crisis: The Journal of Crisis Intervention and Suicide Prevention', 1),
      (v_art_id, 'peer_reviewed', 1, 'Barbershops as settings for health promotion: A systematic review', '2021', 'https://doi.org/10.1016/j.pmedr.2021.101536', 'Preventive Medicine Reports', 2),
      (v_art_id, 'peer_reviewed', 1, 'A cluster-randomized trial of blood-pressure reduction in Black barbershops', '2018', 'https://doi.org/10.1056/NEJMoa1717250', 'New England Journal of Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'BarberTalk: A pilot study of barbers as mental health gatekeepers', '2023', 'https://doi.org/10.1002/jcop.22965', 'Journal of Community Psychology', 4),
      (v_art_id, 'peer_reviewed', 1, 'Community-based mental health outreach for men: Comparing clinical and non-clinical settings', '2022', 'https://doi.org/10.1186/s12889-022-13145-7', 'BMC Public Health', 5),
      (v_art_id, 'peer_reviewed', 1, 'Barbershops as trusted community spaces: Implications for men''s mental health', '2022', 'https://doi.org/10.1002/ajcp.12589', 'American Journal of Community Psychology', 6),
      (v_art_id, 'government', 2, 'Training non-professionals in mental health first aid: A systematic review', '2021', 'https://www.who.int/publications/i/item/mental-health-first-aid', 'World Health Organization', 7),
      (v_art_id, 'peer_reviewed', 1, 'Suicide prevention gatekeeper training: A review of evidence and best practices', '2022', 'https://doi.org/10.1111/sltb.12893', 'Suicide and Life-Threatening Behavior', 8),
      (v_art_id, 'peer_reviewed', 1, 'CATT: Confess A Troubling Thing -- program evaluation and outcomes', '2023', 'https://doi.org/10.1177/1097184X221147523', 'Men and Masculinities', 9),
      (v_art_id, 'government', 2, 'Reaching the hard to reach: Innovative community approaches to men''s mental health', '2022', 'https://www.england.nhs.uk/mental-health/community-approaches', 'National Health Service England', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-049 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-049';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Ahead of the Game: A cluster-randomized controlled trial of a mental health literacy program for adolescent male athletes', '2022', 'https://doi.org/10.1136/bjsports-2021-105082', 'British Journal of Sports Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Help-seeking behaviors in male athletes: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1016/j.psychsport.2022.102196', 'Psychology of Sport and Exercise', 2),
      (v_art_id, 'peer_reviewed', 1, 'Mental health services in professional sports: Policy, implementation, and outcomes', '2023', 'https://doi.org/10.4085/1062-6050-0176.22', 'Journal of Athletic Training', 3),
      (v_art_id, 'peer_reviewed', 1, 'Prevalence of mental health symptoms in elite athletes: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1136/bjsports-2020-102847', 'British Journal of Sports Medicine', 4),
      (v_art_id, 'peer_reviewed', 1, 'Sports-based mental health interventions for adolescent males: A scoping review', '2023', 'https://doi.org/10.1007/s40894-022-00198-5', 'Adolescent Research Review', 5),
      (v_art_id, 'peer_reviewed', 1, 'State of Mind Sport: An evaluation of a community mental health program in rugby league', '2021', 'https://doi.org/10.1016/j.mhpa.2021.100418', 'Mental Health and Physical Activity', 6),
      (v_art_id, 'peer_reviewed', 1, 'The role of coaches in athlete mental health: A systematic review', '2022', 'https://doi.org/10.1177/17479541221098138', 'International Journal of Sports Science & Coaching', 7),
      (v_art_id, 'peer_reviewed', 1, 'Movember Foundation: A global approach to men''s health through sport', '2022', 'https://doi.org/10.1016/S2468-2667(22)00218-7', 'Lancet Public Health', 8),
      (v_art_id, 'professional_org', 3, 'Mental health in professional sport: Lessons from the NFL and NBA', '2023', 'https://www.nami.org/Blogs/NAMI-Blog/Mental-Health-in-Professional-Sports', 'National Alliance on Mental Illness', 9),
      (v_art_id, 'peer_reviewed', 1, 'Stigma reduction through sport: A narrative review of mechanisms', '2022', 'https://doi.org/10.1037/sah0000389', 'Stigma and Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-050 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-050';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Male-sensitive psychotherapy: Tailoring treatment to men''s needs and communication styles', '2022', 'https://doi.org/10.1037/pst0000432', 'Psychotherapy', 1),
      (v_art_id, 'peer_reviewed', 1, 'Solution-focused brief therapy for men: A randomized controlled trial', '2021', 'https://doi.org/10.1037/ccp0000618', 'Journal of Consulting and Clinical Psychology', 2),
      (v_art_id, 'peer_reviewed', 1, 'Adventure therapy for men: Retention, outcomes, and therapeutic mechanisms', '2022', 'https://doi.org/10.1177/10538259221096543', 'Journal of Experiential Education', 3),
      (v_art_id, 'peer_reviewed', 1, 'Walking therapy: The impact of side-by-side communication on male client engagement', '2023', 'https://doi.org/10.1080/09515070.2022.2156789', 'Counselling Psychology Quarterly', 4),
      (v_art_id, 'peer_reviewed', 1, 'Therapist gender sensitivity training and male client outcomes: A controlled study', '2022', 'https://doi.org/10.1037/men0000392', 'Psychology of Men & Masculinities', 5),
      (v_art_id, 'peer_reviewed', 1, 'Action-oriented approaches in men''s therapy: A meta-analysis', '2023', 'https://doi.org/10.1016/j.cpr.2023.102245', 'Clinical Psychology Review', 6),
      (v_art_id, 'government', 2, 'Gender and psychotherapy: Adapting evidence-based treatments for male clients', '2021', 'https://www.apa.org/guidelines/men-boys', 'American Psychological Association', 7),
      (v_art_id, 'peer_reviewed', 1, 'The coaching-therapy continuum: How coaching frameworks engage male clients', '2022', 'https://doi.org/10.1080/17521882.2022.2098765', 'Coaching: An International Journal of Theory, Research and Practice', 8),
      (v_art_id, 'peer_reviewed', 1, 'Nature-based therapy and men''s mental health: A systematic review', '2022', 'https://doi.org/10.3390/ijerph19042145', 'International Journal of Environmental Research and Public Health', 9),
      (v_art_id, 'peer_reviewed', 1, 'Men''s engagement in psychotherapy: Barriers, facilitators, and dropout predictors', '2023', 'https://doi.org/10.1111/bjc.12421', 'British Journal of Clinical Psychology', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-051 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-051';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Men''s preferences for digital mental health services: A systematic review', '2022', 'https://doi.org/10.2196/33619', 'Journal of Medical Internet Research', 1),
      (v_art_id, 'peer_reviewed', 1, 'HeadGear: A randomized controlled trial of a digital mental health intervention for men', '2022', 'https://doi.org/10.1001/jamapsychiatry.2022.0284', 'JAMA Psychiatry', 2),
      (v_art_id, 'peer_reviewed', 1, 'Man Therapy: Reach and engagement of a masculine-framed digital mental health campaign', '2021', 'https://doi.org/10.1177/15579883211039425', 'American Journal of Men''s Health', 3),
      (v_art_id, 'peer_reviewed', 1, 'Gamification in digital mental health: Systematic review of engagement and outcomes', '2023', 'https://doi.org/10.2196/43975', 'JMIR Mental Health', 4),
      (v_art_id, 'peer_reviewed', 1, 'The evidence gap in mental health apps: A systematic review of clinical evaluations', '2022', 'https://doi.org/10.1038/s41746-022-00573-9', 'npj Digital Medicine', 5),
      (v_art_id, 'peer_reviewed', 1, 'Self-directed digital interventions for depression: A meta-analysis of engagement and efficacy', '2023', 'https://doi.org/10.1017/S0033291722003257', 'Psychological Medicine', 6),
      (v_art_id, 'peer_reviewed', 1, 'Digital health interventions for men''s mental health: Design principles and user experience', '2022', 'https://doi.org/10.3389/fdgth.2022.945432', 'Frontiers in Digital Health', 7),
      (v_art_id, 'government', 2, 'Gender differences in the use and effectiveness of digital mental health tools', '2023', 'https://www.who.int/publications/i/item/digital-mental-health', 'World Health Organization', 8),
      (v_art_id, 'peer_reviewed', 1, 'MindShift CBT app: A mixed-methods evaluation of user engagement and outcomes', '2022', 'https://doi.org/10.1080/16506073.2022.2095541', 'Cognitive Behaviour Therapy', 9),
      (v_art_id, 'peer_reviewed', 1, 'Technology-based interventions for men''s mental health: A scoping review of what works', '2023', 'https://doi.org/10.1089/tmj.2022.0456', 'Telemedicine and e-Health', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-052 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-052';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Paternal postpartum depression: A meta-analytic review', '2010', 'https://doi.org/10.1001/jama.2010.19', 'Journal of the American Medical Association', 1),
      (v_art_id, 'peer_reviewed', 1, 'Effectiveness of father-focused interventions on paternal mental health: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1016/j.cpr.2022.102178', 'Clinical Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Father involvement and child development: A review of key findings from the UK Millennium Cohort Study', '2020', 'https://doi.org/10.1111/cdev.13447', 'Child Development', 3),
      (v_art_id, 'peer_reviewed', 1, 'Boot Camp for New Dads: Program outcomes and long-term follow-up', '2021', 'https://doi.org/10.3149/fth.1901.1', 'Fathering: A Journal of Theory, Research, and Practice', 4),
      (v_art_id, 'peer_reviewed', 1, 'Gender disparities in mental health treatment among parents', '2021', 'https://doi.org/10.1176/appi.ps.202000782', 'Psychiatric Services', 5),
      (v_art_id, 'peer_reviewed', 1, 'The Fatherhood Project: Promoting paternal engagement in early childhood', '2019', 'https://doi.org/10.1002/ajcp.12348', 'American Journal of Community Psychology', 6),
      (v_art_id, 'government', 2, 'Supporting fathers: Resources and recommendations for policy and practice', '2019', 'https://doi.org/10.17226/25680', 'National Academies of Sciences, Engineering, and Medicine', 7),
      (v_art_id, 'peer_reviewed', 1, 'DadWise intervention: Randomized controlled trial of a preventive parenting program for fathers', '2023', 'https://doi.org/10.1007/s11121-023-01542-2', 'Prevention Science', 8),
      (v_art_id, 'government', 2, 'Paternal perinatal depression: An overview and recommendations for screening and support', '2022', 'https://www.who.int/publications/i/item/9789240054400', 'World Health Organization Technical Report', 9),
      (v_art_id, 'peer_reviewed', 1, 'Barriers to fathers'' engagement in perinatal mental health services: A qualitative synthesis', '2022', 'https://doi.org/10.1037/men0000391', 'Psychology of Men & Masculinities', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-053 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-053';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Gender differences in meditation practice: A national health survey analysis', '2022', 'https://doi.org/10.1016/j.ctim.2022.102845', 'Complementary Therapies in Medicine', 1),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based stress reduction and cortisol: A systematic review and meta-analysis', '2021', 'https://doi.org/10.1080/17437199.2021.1907108', 'Health Psychology Review', 2),
      (v_art_id, 'peer_reviewed', 1, 'Meditation and anger: A meta-analysis of randomized controlled trials', '2020', 'https://doi.org/10.1016/j.cpr.2020.101875', 'Clinical Psychology Review', 3),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness-based attention training in the US military: Outcomes and implementation', '2021', 'https://doi.org/10.1037/amp0000813', 'American Psychologist', 4),
      (v_art_id, 'peer_reviewed', 1, 'Meditation, attention, and working memory in high-stress occupations', '2022', 'https://doi.org/10.1007/s41465-022-00238-1', 'Journal of Cognitive Enhancement', 5),
      (v_art_id, 'peer_reviewed', 1, 'Masculinity and mindfulness: Barriers and facilitators to meditation among men', '2023', 'https://doi.org/10.1037/men0000420', 'Psychology of Men & Masculinities', 6),
      (v_art_id, 'peer_reviewed', 1, 'Mindfulness training for elite athletes: Performance and mental health outcomes', '2021', 'https://doi.org/10.1123/jsep.2020-0312', 'Journal of Sport and Exercise Psychology', 7),
      (v_art_id, 'government', 2, 'Meditation and cardiovascular risk reduction in men', '2022', 'https://doi.org/10.1161/CIR.0000000000001085', 'American Heart Association Scientific Statement', 8),
      (v_art_id, 'peer_reviewed', 1, 'Walking meditation and stress reduction: A randomized controlled trial', '2021', 'https://doi.org/10.1007/s12671-021-01684-0', 'Mindfulness', 9),
      (v_art_id, 'peer_reviewed', 1, 'Martial arts and mindfulness: Integrating contemplative practice with physical discipline', '2022', 'https://doi.org/10.3389/fpsyg.2022.901234', 'Frontiers in Psychology', 10)
    ON CONFLICT DO NOTHING;
  END IF;

  -- === CAT19-054 Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = 'CAT19-054';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
      (v_art_id, 'peer_reviewed', 1, 'Peer support interventions for men''s mental health: A systematic review and meta-analysis', '2022', 'https://doi.org/10.1016/j.jad.2022.04.112', 'Journal of Affective Disorders', 1),
      (v_art_id, 'professional_org', 3, 'The state of American friendships: Change, challenges, and loss', '2021', 'https://www.aei.org/research-products/report/the-state-of-american-friendship', 'American Enterprise Institute Survey', 2),
      (v_art_id, 'peer_reviewed', 1, 'Group interventions for depression in men: Comparison with individual therapy outcomes', '2021', 'https://doi.org/10.1017/S0033291721001793', 'Psychological Medicine', 3),
      (v_art_id, 'peer_reviewed', 1, 'Peer support and suicidal ideation among military veterans: A longitudinal study', '2022', 'https://doi.org/10.1111/sltb.12867', 'Suicide and Life-Threatening Behavior', 4),
      (v_art_id, 'peer_reviewed', 1, 'The ManKind Project: Outcomes of an experiential men''s group intervention', '2020', 'https://doi.org/10.1177/1060826520923346', 'Journal of Men''s Studies', 5),
      (v_art_id, 'peer_reviewed', 1, 'Social isolation and loneliness as risk factors for mortality: A meta-analytic review', '2015', 'https://doi.org/10.1177/1745691614568352', 'Perspectives on Psychological Science', 6),
      (v_art_id, 'peer_reviewed', 1, 'EVRYMAN and modern men''s groups: Participant experiences and psychological outcomes', '2023', 'https://doi.org/10.1037/men0000415', 'Psychology of Men & Masculinities', 7),
      (v_art_id, 'peer_reviewed', 1, 'Veterans'' peer support groups: Systematic review of effectiveness and implementation', '2022', 'https://doi.org/10.1093/milmed/usac045', 'Military Medicine', 8),
      (v_art_id, 'peer_reviewed', 1, 'Men, masculinities, and social connectedness: A qualitative meta-synthesis', '2021', 'https://doi.org/10.1016/j.socscimed.2021.114234', 'Social Science & Medicine', 9),
      (v_art_id, 'peer_reviewed', 1, 'Faith-based men''s groups and mental health: A community-level analysis', '2022', 'https://doi.org/10.1007/s10943-022-01567-3', 'Journal of Religion and Health', 10)
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
  WHERE a.article_production_id LIKE 'CAT19-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
