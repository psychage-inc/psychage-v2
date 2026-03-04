-- ============================================================================
-- Symptom Navigator — Phase 4 Expansion Seed Data
-- Migration: 20260303000002 — 14 new conditions with ~200 mappings
--
-- This adds:
--   14 conditions (Tier 4: 4, Tier 5: 6, Tier 6: 4)
--   ~205 condition-symptom mappings
--   2 condition red flags (PRC_008 for DID/OSDD)
--
-- Condition IDs follow existing convention: short uppercase codes
-- Mapping weights: 1 (associated), 2 (common), 3 (core)
-- All text is educational, non-diagnostic, non-stigmatizing
--
-- DEPENDS ON: 20260303000001_navigator_expansion_phase4_schema.sql
--   (28 new symptom codes must exist first)
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. CONDITIONS (14 new)
-- ============================================================================

INSERT INTO navigator_conditions (id, name, full_name, category, description_for_user, minimum_duration, minimum_duration_display, minimum_symptoms_for_relevance, always_recommend_professional, guide_path, coping_path, provider_questions, clinical_notes, is_active, version) VALUES

-- ─────────────────────────────────────────────────────────────────────────────
-- TIER 4 (High Clinical Severity)
-- ─────────────────────────────────────────────────────────────────────────────

-- T4-1. NPD — Narcissistic Personality Disorder
('NPD', 'Narcissistic Personality Patterns', 'Narcissistic Personality Disorder', 'personality',
 'Narcissistic personality patterns involve a pervasive pattern of grandiosity, need for admiration, and lack of empathy. People experiencing these patterns may appear confident but often struggle with criticism and maintaining meaningful relationships. Understanding these patterns can be an important first step. This information is educational and not a diagnosis.',
 '1_year', 'At least 1 year', 5, TRUE,
 '/learn/personality', '/tools/mood-journal',
 ARRAY[
   'Do you often feel you are more special or talented than most people?',
   'Do you find it difficult to understand or care about others'' feelings?',
   'Do you need a lot of attention, praise, or admiration from others?',
   'Do people tell you that you come across as arrogant or entitled?',
   'How do you react when someone criticizes you or doesn''t recognize your achievements?'
 ],
 'Based on DSM-5-TR criteria for Narcissistic Personality Disorder (301.81). Requires pervasive pattern of grandiosity, need for admiration, and lack of empathy, with 5+ of 9 criteria. ICD-11 code: 6D10 with Narcissistic pattern qualifier.',
 TRUE, '1.0.0'),

-- T4-2. ASPD — Antisocial Personality Disorder
('ASPD', 'Antisocial Personality Patterns', 'Antisocial Personality Disorder', 'personality',
 'Antisocial personality patterns involve a persistent disregard for the rights of others, impulsivity, and difficulty maintaining stable relationships or employment. Professional evaluation is important for understanding these patterns and exploring interventions. This information is educational and not a diagnosis.',
 '1_year', 'At least 1 year (pattern since age 15)', 5, TRUE,
 '/learn/personality', '/tools/mood-journal',
 ARRAY[
   'Do you often find it difficult to follow rules or social norms?',
   'Have you repeatedly engaged in behaviors that could lead to legal trouble?',
   'Do you find it hard to care about how your actions affect others?',
   'Have you been told you are reckless or irresponsible with money, work, or safety?',
   'Did you have behavioral problems before age 15?'
 ],
 'Based on DSM-5-TR criteria for Antisocial Personality Disorder (301.7). Requires pervasive pattern of disregard for rights of others since age 15, with evidence of conduct disorder before age 15, with 3+ of 7 criteria. ICD-11 code: 6D10 with Dissocial pattern qualifier.',
 TRUE, '1.0.0'),

-- T4-3. CPTSD — Complex PTSD
('CPTSD', 'Complex PTSD', 'Complex Post-Traumatic Stress Disorder', 'trauma',
 'Complex PTSD involves symptoms of PTSD plus additional disturbances in self-organization following prolonged or repeated trauma, particularly during developmental years. These may include emotion regulation difficulties, negative self-concept, and relationship challenges. Professional support is strongly recommended. This information is educational and not a diagnosis.',
 '6_months', 'At least 6 months', 6, TRUE,
 '/learn/trauma', '/tools/mood-journal',
 ARRAY[
   'Have you experienced prolonged or repeated trauma, particularly during childhood or adolescence?',
   'Do you experience flashbacks, nightmares, or intrusive memories of traumatic events?',
   'Do you have difficulty controlling your emotions or experience intense emotional reactions?',
   'Do you struggle with a persistent negative view of yourself or feelings of worthlessness?',
   'Have your past experiences made it difficult to trust others or maintain close relationships?'
 ],
 'Based on ICD-11 criteria for Complex PTSD (6B41). Requires all PTSD symptoms plus disturbances in self-organization: affect dysregulation, negative self-concept, and interpersonal disturbances, following prolonged or repeated trauma.',
 TRUE, '1.0.0'),

-- T4-4. DID — Dissociative Identity Disorder
('DID', 'Dissociative Identity Patterns', 'Dissociative Identity Disorder', 'dissociative',
 'Dissociative identity patterns involve the presence of two or more distinct personality states accompanied by gaps in memory for everyday events, important personal information, or traumatic events. This is often a response to severe trauma, particularly in childhood. Specialized professional support is strongly recommended. This information is educational and not a diagnosis.',
 '6_months', 'At least 6 months', 4, TRUE,
 '/learn/dissociation', '/tools/mood-journal',
 ARRAY[
   'Do you experience yourself as having different personality states or feel like different people at times?',
   'Do you have significant gaps in your memory for everyday events or personal history?',
   'Have others told you that you act very differently at times or don''t remember things you said or did?',
   'Did you experience severe trauma, particularly during childhood?',
   'Do these experiences cause significant distress or problems in your daily life?'
 ],
 'Based on DSM-5-TR criteria for Dissociative Identity Disorder (300.14). Requires disruption of identity characterized by 2+ distinct personality states, with recurrent gaps in recall, causing significant distress or impairment. ICD-11 code: 6B64.',
 TRUE, '1.0.0'),

-- ─────────────────────────────────────────────────────────────────────────────
-- TIER 5 (Moderate-High Complexity)
-- ─────────────────────────────────────────────────────────────────────────────

-- T5-1. DPD — Dependent Personality Disorder
('DPD', 'Dependent Personality Patterns', 'Dependent Personality Disorder', 'personality',
 'Dependent personality patterns involve a pervasive and excessive need to be taken care of, leading to submissive and clinging behavior and fears of separation. People experiencing these patterns may struggle with decision-making and asserting themselves. This information is educational and not a diagnosis.',
 '1_year', 'At least 1 year', 5, TRUE,
 '/learn/personality', '/tools/mood-journal',
 ARRAY[
   'Do you find it very difficult to make everyday decisions without excessive advice or reassurance from others?',
   'Do you need others to take responsibility for major areas of your life?',
   'Are you afraid to disagree with people because you fear losing their support or approval?',
   'Do you feel helpless or anxious when alone?',
   'Are you preoccupied with fears of being left to take care of yourself?'
 ],
 'Based on DSM-5-TR criteria for Dependent Personality Disorder (301.6). Requires pervasive and excessive need to be cared for with submissive and clinging behavior, with 5+ of 8 criteria. ICD-11 code: 6D10 with Dependent pattern qualifier.',
 TRUE, '1.0.0'),

-- T5-2. SZPD — Schizoid Personality Disorder
('SZPD', 'Schizoid Personality Patterns', 'Schizoid Personality Disorder', 'personality',
 'Schizoid personality patterns involve a pervasive pattern of detachment from social relationships and a restricted range of emotional expression in interpersonal settings. People with these patterns may prefer solitude and appear indifferent to praise or criticism. This information is educational and not a diagnosis.',
 '1_year', 'At least 1 year', 4, FALSE,
 '/learn/personality', '/tools/mood-journal',
 ARRAY[
   'Do you neither desire nor enjoy close relationships, including family?',
   'Do you almost always prefer to do things alone?',
   'Do you have little interest in sexual experiences with others?',
   'Are you generally indifferent to praise or criticism from others?',
   'Do others describe you as cold, aloof, or emotionally distant?'
 ],
 'Based on DSM-5-TR criteria for Schizoid Personality Disorder (301.20). Requires pervasive pattern of detachment from social relationships and restricted emotional expression, with 4+ of 7 criteria. ICD-11 code: 6D10 with Schizoid pattern qualifier.',
 TRUE, '1.0.0'),

-- T5-3. OSDD — Other Specified Dissociative Disorder
('OSDD', 'Other Dissociative Patterns', 'Other Specified Dissociative Disorder', 'dissociative',
 'Other specified dissociative patterns involve significant dissociative symptoms that cause distress or impairment but do not fully meet criteria for a specific dissociative disorder. This may include identity disturbance, episodes of depersonalization, or amnesia. Professional evaluation can provide clarity. This information is educational and not a diagnosis.',
 '1_month', 'At least 1 month', 3, TRUE,
 '/learn/dissociation', '/tools/mood-journal',
 ARRAY[
   'Do you experience significant dissociative symptoms such as feeling detached or memory gaps?',
   'Do these symptoms cause you significant distress or problems in daily life?',
   'Have you experienced trauma or severe stress that may be connected to these symptoms?',
   'Do these experiences feel different from your normal state of mind?'
 ],
 'Based on DSM-5-TR criteria for Other Specified Dissociative Disorder (300.15). Includes presentations such as identity disturbance due to prolonged coercive persuasion, acute dissociative reactions to stress, or dissociative trance. ICD-11 code: 6B6Y.',
 TRUE, '1.0.0'),

-- T5-4. ASD_ACUTE — Acute Stress Disorder
('ASD_ACUTE', 'Acute Stress Disorder', 'Acute Stress Disorder', 'trauma',
 'Acute stress disorder involves distressing symptoms that develop within one month of exposure to a traumatic event. Symptoms may include intrusive memories, dissociation, avoidance, and heightened arousal. Early professional support can prevent the development of longer-term difficulties. This information is educational and not a diagnosis.',
 '3_days', '3 days to 1 month', 4, TRUE,
 '/learn/trauma', '/tools/mood-journal',
 ARRAY[
   'Have you been exposed to a traumatic event within the past month?',
   'Do you experience intrusive memories, flashbacks, or nightmares about the event?',
   'Do you feel detached, numb, or like things aren''t real since the event?',
   'Are you actively avoiding reminders of the traumatic event?',
   'Do you feel on edge, have trouble sleeping, or startle easily since the event?'
 ],
 'Based on DSM-5-TR criteria for Acute Stress Disorder (308.3). Requires exposure to traumatic event with 9+ symptoms from 5 categories (intrusion, negative mood, dissociation, avoidance, arousal), occurring 3 days to 1 month post-trauma. ICD-11 code: 6B40.',
 TRUE, '1.0.0'),

-- T5-5. TTM — Trichotillomania
('TTM', 'Hair-Pulling Patterns', 'Trichotillomania (Hair-Pulling Disorder)', 'obsessive_compulsive',
 'Trichotillomania involves recurrent pulling out of one''s own hair resulting in hair loss, accompanied by repeated attempts to decrease or stop the behavior. Many people experience this pattern, and specialized treatments are available. This information is educational and not a diagnosis.',
 '6_months', 'At least 6 months', 2, FALSE,
 '/learn/ocd', '/tools/mood-journal',
 ARRAY[
   'Do you repeatedly pull out your hair, resulting in noticeable hair loss?',
   'Have you tried to stop or reduce the hair pulling but found it difficult?',
   'Do you feel tension or an urge before pulling, or relief afterward?',
   'Does the hair pulling cause you distress or problems in your life?',
   'From which areas do you typically pull hair (scalp, eyebrows, eyelashes, etc.)?'
 ],
 'Based on DSM-5-TR criteria for Trichotillomania (312.39). Requires recurrent hair pulling resulting in hair loss, repeated attempts to decrease/stop, and significant distress or impairment. Classified under Obsessive-Compulsive and Related Disorders. ICD-11 code: 6B25.1.',
 TRUE, '1.0.0'),

-- T5-6. SPD_EXCOR — Excoriation Disorder
('SPD_EXCOR', 'Skin-Picking Patterns', 'Excoriation (Skin-Picking) Disorder', 'obsessive_compulsive',
 'Excoriation disorder involves recurrent skin picking resulting in skin lesions, accompanied by repeated attempts to decrease or stop the behavior. This pattern is more common than many realize, and effective treatments exist. This information is educational and not a diagnosis.',
 '6_months', 'At least 6 months', 2, FALSE,
 '/learn/ocd', '/tools/mood-journal',
 ARRAY[
   'Do you repeatedly pick at your skin, resulting in visible lesions or scars?',
   'Have you tried to stop or reduce the skin picking but found it difficult?',
   'Do you feel tension or an urge before picking, or relief afterward?',
   'Does the skin picking cause you distress or problems in your life?',
   'Which areas of your body do you typically pick?'
 ],
 'Based on DSM-5-TR criteria for Excoriation Disorder (698.4). Requires recurrent skin picking resulting in lesions, repeated attempts to decrease/stop, and significant distress or impairment. Classified under Obsessive-Compulsive and Related Disorders. ICD-11 code: 6B25.2.',
 TRUE, '1.0.0'),

-- ─────────────────────────────────────────────────────────────────────────────
-- TIER 6 (Lower Clinical Urgency)
-- ─────────────────────────────────────────────────────────────────────────────

-- T6-1. IED — Intermittent Explosive Disorder
('IED', 'Intermittent Explosive Patterns', 'Intermittent Explosive Disorder', 'obsessive_compulsive',
 'Intermittent explosive disorder involves recurrent behavioral outbursts representing a failure to control aggressive impulses, manifested as verbal or physical aggression that is grossly out of proportion to the provocation. Professional support can help develop better emotional regulation. This information is educational and not a diagnosis.',
 '3_months', 'At least 3 months', 3, TRUE,
 '/learn/anger', '/tools/mood-journal',
 ARRAY[
   'Do you have recurrent outbursts of anger or aggression that seem out of proportion to the situation?',
   'Are these outbursts verbal (yelling, arguments) or physical (hitting, throwing things)?',
   'How often do these outbursts occur?',
   'Do you feel guilty, remorseful, or embarrassed after these episodes?',
   'Have these outbursts caused problems in your relationships, work, or legal situation?'
 ],
 'Based on DSM-5-TR criteria for Intermittent Explosive Disorder (312.34). Requires recurrent behavioral outbursts (verbal/physical aggression) out of proportion to stressors, occurring 2x/week for 3 months. ICD-11 code: 6C73.',
 TRUE, '1.0.0'),

-- T6-2. HYPER — Hypersomnolence Disorder
('HYPER', 'Hypersomnolence', 'Hypersomnolence Disorder', 'sleep',
 'Hypersomnolence disorder involves excessive sleepiness despite a main sleep period lasting at least 7 hours, with recurrent periods of sleep or lapses into sleep within the same day. This excessive sleepiness causes significant distress or impairment. Professional evaluation can identify causes and treatments. This information is educational and not a diagnosis.',
 '3_months', 'At least 3 months', 3, FALSE,
 '/learn/sleep', '/tools/sleep-architect',
 ARRAY[
   'Do you feel excessively sleepy during the day despite sleeping 7+ hours at night?',
   'Do you take long naps during the day but still feel unrefreshed?',
   'How long do you typically sleep in a 24-hour period?',
   'Does this sleepiness cause problems at work, school, or in relationships?',
   'Have you been evaluated for other sleep disorders like sleep apnea?'
 ],
 'Based on DSM-5-TR criteria for Hypersomnolence Disorder (780.54). Requires self-reported excessive sleepiness despite 7+ hours sleep, with recurrent sleep periods or lapses, occurring 3+ times/week for 3+ months. ICD-11 code: 7A20.',
 TRUE, '1.0.0'),

-- T6-3. ARFID — Avoidant/Restrictive Food Intake Disorder
('ARFID', 'Avoidant/Restrictive Food Intake', 'Avoidant/Restrictive Food Intake Disorder', 'eating',
 'ARFID involves an eating or feeding disturbance as manifested by persistent failure to meet appropriate nutritional and/or energy needs. This may be due to lack of interest in eating, sensory characteristics of food, or concern about aversive consequences of eating, without concern about body weight or shape. This information is educational and not a diagnosis.',
 '1_month', 'At least 1 month', 3, TRUE,
 '/learn/eating-disorders', '/tools/mood-journal',
 ARRAY[
   'Do you avoid eating certain foods based on their texture, smell, appearance, or taste?',
   'Are you afraid of negative consequences from eating, like choking or vomiting?',
   'Do you have a general lack of interest in food or eating?',
   'Has your eating pattern led to weight loss or nutritional deficiencies?',
   'Are your eating concerns related to worries about body weight or shape, or something else?'
 ],
 'Based on DSM-5-TR criteria for Avoidant/Restrictive Food Intake Disorder (307.59). Requires eating/feeding disturbance with failure to meet nutritional needs, not better explained by food scarcity, cultural practices, or other disorders. ICD-11 code: 6B83.',
 TRUE, '1.0.0'),

-- T6-4. CYC — Cyclothymic Disorder
('CYC', 'Cyclothymic Patterns', 'Cyclothymic Disorder', 'mood',
 'Cyclothymic disorder involves chronic, fluctuating mood disturbance involving numerous periods with hypomanic symptoms and numerous periods with depressive symptoms, but not meeting full criteria for a hypomanic or depressive episode. This information is educational and not a diagnosis.',
 '2_years', 'At least 2 years', 4, FALSE,
 '/learn/bipolar', '/tools/mood-journal',
 ARRAY[
   'Have you experienced frequent mood swings for at least 2 years?',
   'Do you have periods of elevated or energized mood that are less intense than full mania?',
   'Do you also have periods of low mood or sadness that are less intense than major depression?',
   'During these 2 years, have you been without these symptoms for more than 2 months at a time?',
   'Do these mood fluctuations cause problems in your life or relationships?'
 ],
 'Based on DSM-5-TR criteria for Cyclothymic Disorder (301.13). Requires numerous periods of hypomanic and depressive symptoms for 2+ years (1+ year in children/adolescents), without symptom-free period >2 months. ICD-11 code: 6A62.',
 TRUE, '1.0.0');

-- ============================================================================
-- 2. CONDITION-SYMPTOM MAPPINGS (~205 mappings)
-- ============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- NPD — Narcissistic Personality Disorder (18 mappings)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role) VALUES
-- Core symptoms (weight 3)
('NPD', 'IDN_005', 3, 'core'),        -- Grandiosity (DSM-5 Criterion 1)
('NPD', 'IDN_006', 3, 'core'),        -- Lack of empathy (DSM-5 Criterion 7)
('NPD', 'IDN_007', 3, 'core'),        -- Need for admiration (DSM-5 Criterion 5)
('NPD', 'SOC_003', 3, 'core'),        -- Relationship difficulties (exploitation)
-- Common symptoms (weight 2)
('NPD', 'EMR_002', 2, 'common'),      -- Irritability (response to criticism)
('NPD', 'MOD_011', 2, 'common'),      -- Envy (DSM-5 Criterion 8)
('NPD', 'ANX_004', 2, 'common'),      -- Social anxiety (fear of not being special)
('NPD', 'IDN_004', 2, 'common'),      -- Splitting (idealization/devaluation)
('NPD', 'PRC_006', 2, 'common'),      -- Paranoid thinking (vulnerability)
('NPD', 'ACT_010', 2, 'common'),      -- Lying/manipulation (exploitation)
-- Associated symptoms (weight 1)
('NPD', 'EMR_007', 1, 'associated'),  -- Chronic emptiness (behind facade)
('NPD', 'MOD_007', 1, 'associated'),  -- Low self-esteem (fragile)
('NPD', 'ACT_004', 1, 'associated'),  -- Impulsivity (grandiose plans)
('NPD', 'SOC_006', 1, 'associated'),  -- Relationship conflict (entitlement)
('NPD', 'ANX_001', 1, 'associated'),  -- Excessive worry (about status)
('NPD', 'COG_007', 1, 'associated'),  -- Rumination (on perceived slights)
('NPD', 'ACT_001', 1, 'associated'),  -- Procrastination (tasks don't match self-image)
('NPD', 'MOD_008', 1, 'associated');  -- Emptiness (internal void)

-- ─────────────────────────────────────────────────────────────────────────────
-- ASPD — Antisocial Personality Disorder (17 mappings)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role) VALUES
-- Core symptoms (weight 3)
('ASPD', 'IDN_006', 3, 'core'),       -- Lack of empathy
('ASPD', 'EMR_008', 3, 'core'),       -- Inability to conform to norms (DSM-5 Criterion 1)
('ASPD', 'ACT_009', 3, 'core'),       -- Reckless behavior (DSM-5 Criterion 5)
('ASPD', 'ACT_010', 3, 'core'),       -- Lying/manipulation (DSM-5 Criterion 2)
-- Common symptoms (weight 2)
('ASPD', 'EMR_002', 2, 'common'),     -- Irritability/anger (DSM-5 Criterion 4)
('ASPD', 'ACT_004', 2, 'common'),     -- Impulsivity (DSM-5 Criterion 3)
('ASPD', 'SOC_006', 2, 'common'),     -- Relationship conflict
('ASPD', 'ACT_002', 2, 'common'),     -- Neglecting responsibilities
('ASPD', 'CPG_003', 2, 'common'),     -- Substance use (associated pattern)
('ASPD', 'COG_008', 2, 'common'),     -- Self-harm thoughts (impulsivity)
-- Associated symptoms (weight 1)
('ASPD', 'MOD_007', 1, 'associated'), -- Low self-esteem (despite appearance)
('ASPD', 'COG_012', 1, 'associated'), -- Difficulty trusting (projection)
('ASPD', 'SOC_001', 1, 'associated'), -- Social withdrawal (after consequences)
('ASPD', 'CPG_015', 1, 'associated'), -- Explosive anger
('ASPD', 'ANX_006', 1, 'associated'), -- Fear of losing control (rare insight)
('ASPD', 'SLP_001', 1, 'associated'), -- Insomnia (hyperarousal)
('ASPD', 'ACT_005', 1, 'associated'); -- Risk-taking (DSM-5 Criterion 5)

-- ─────────────────────────────────────────────────────────────────────────────
-- DPD — Dependent Personality Disorder (16 mappings)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role) VALUES
-- Core symptoms (weight 3)
('DPD', 'IDN_008', 3, 'core'),        -- Submissiveness (DSM-5 Criterion 1)
('DPD', 'SOC_005', 3, 'core'),        -- Dependence on others for decisions
('DPD', 'IDN_002', 3, 'core'),        -- Fear of abandonment (DSM-5 Criterion 5)
('DPD', 'ANX_004', 3, 'core'),        -- Social anxiety (fear of disapproval)
-- Common symptoms (weight 2)
('DPD', 'MOD_007', 2, 'common'),      -- Low self-esteem (inadequacy belief)
('DPD', 'ANX_001', 2, 'common'),      -- Excessive worry (about being alone)
('DPD', 'IDN_003', 2, 'common'),      -- Chronic inadequacy
('DPD', 'SOC_002', 2, 'common'),      -- Avoiding situations (self-sufficiency required)
('DPD', 'ANX_008', 2, 'common'),      -- Feeling overwhelmed (when alone)
-- Associated symptoms (weight 1)
('DPD', 'MOD_001', 1, 'associated'),  -- Persistent sadness (when threatened)
('DPD', 'COG_006', 1, 'associated'),  -- Indecisiveness (without reassurance)
('DPD', 'EMR_005', 1, 'associated'),  -- Depersonalization (in isolation)
('DPD', 'ACT_001', 1, 'associated'),  -- Procrastination (independence tasks)
('DPD', 'SOC_003', 1, 'associated'),  -- Relationship difficulties (clinginess)
('DPD', 'MOD_005', 1, 'associated'),  -- Unexplained crying (separation anxiety)
('DPD', 'BDY_009', 1, 'associated');  -- Nausea (anxiety symptoms)

-- ─────────────────────────────────────────────────────────────────────────────
-- SZPD — Schizoid Personality Disorder (14 mappings)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role) VALUES
-- Core symptoms (weight 3)
('SZPD', 'SOC_009', 3, 'core'),       -- Detachment from relationships (DSM-5 Criterion 1)
('SZPD', 'MOD_004', 3, 'core'),       -- Emotional numbness (restricted affect)
('SZPD', 'SOC_001', 3, 'core'),       -- Social withdrawal (preference for solitary)
('SZPD', 'MOD_003', 3, 'core'),       -- Loss of interest (activities and people)
-- Common symptoms (weight 2)
('SZPD', 'EMR_007', 2, 'common'),     -- Chronic emptiness (emotional flatness)
('SZPD', 'ANX_003', 2, 'common'),     -- Fear of situations (social contact)
('SZPD', 'PRC_002', 2, 'common'),     -- Depersonalization (detachment from self)
('SZPD', 'SOC_004', 2, 'common'),     -- Reduced speech (minimal communication)
-- Associated symptoms (weight 1)
('SZPD', 'ENR_004', 1, 'associated'), -- Changes in libido (little interest)
('SZPD', 'ACT_007', 1, 'associated'), -- Restricted interests (solitary activities)
('SZPD', 'COG_001', 1, 'associated'), -- Difficulty concentrating (on social tasks)
('SZPD', 'PRC_005', 1, 'associated'), -- Distorted body image (indifference)
('SZPD', 'MOD_008', 1, 'associated'), -- Emptiness (internal landscape)
('SZPD', 'ANX_001', 1, 'associated'); -- Excessive worry (minimal response)

-- ─────────────────────────────────────────────────────────────────────────────
-- CPTSD — Complex PTSD (22 mappings)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role) VALUES
-- Core symptoms (weight 3)
('CPTSD', 'EMR_003', 3, 'core'),      -- Emotional flashbacks (re-experiencing)
('CPTSD', 'COG_013', 3, 'core'),      -- Emotional dysregulation (ICD-11 criterion)
('CPTSD', 'IDN_001', 3, 'core'),      -- Unstable identity (negative self-concept)
('CPTSD', 'SOC_003', 3, 'core'),      -- Relationship difficulties (interpersonal disturbance)
-- Common symptoms (weight 2)
('CPTSD', 'ANX_005', 2, 'common'),    -- Hypervigilance (altered arousal)
('CPTSD', 'CPG_001', 2, 'common'),    -- Avoidance (PTSD criterion)
('CPTSD', 'SLP_004', 2, 'common'),    -- Nightmares (re-experiencing)
('CPTSD', 'MOD_007', 2, 'common'),    -- Low self-esteem (negative self-concept)
('CPTSD', 'EMR_006', 2, 'common'),    -- Shame (deep-rooted from trauma)
('CPTSD', 'COG_012', 2, 'common'),    -- Difficulty trusting (interpersonal disturbance)
('CPTSD', 'SOC_001', 2, 'common'),    -- Social withdrawal (relationship difficulties)
('CPTSD', 'EMR_001', 2, 'common'),    -- Mood swings (affect dysregulation)
-- Associated symptoms (weight 1)
('CPTSD', 'COG_005', 1, 'associated'),-- Intrusive thoughts (re-experiencing)
('CPTSD', 'PRC_009', 1, 'associated'),-- Dissociative amnesia (traumatic gaps)
('CPTSD', 'BDY_001', 1, 'associated'),-- Muscle tension (hyperarousal)
('CPTSD', 'SLP_001', 1, 'associated'),-- Insomnia (hyperarousal)
('CPTSD', 'EMR_002', 1, 'associated'),-- Irritability (dysregulation)
('CPTSD', 'MOD_001', 1, 'associated'),-- Persistent sadness (mood disturbance)
('CPTSD', 'CPG_003', 1, 'associated'),-- Substance use (coping)
('CPTSD', 'ANX_001', 1, 'associated');-- Excessive worry (hyperarousal)

-- ─────────────────────────────────────────────────────────────────────────────
-- DID — Dissociative Identity Disorder (15 mappings)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role) VALUES
-- Core symptoms (weight 3)
('DID', 'PRC_008', 3, 'core'),        -- Identity switching (DSM-5 Criterion A)
('DID', 'PRC_009', 3, 'core'),        -- Dissociative amnesia (DSM-5 Criterion B)
('DID', 'COG_004', 3, 'core'),        -- Memory problems (gaps in recall)
('DID', 'PRC_002', 3, 'core'),        -- Depersonalization (identity disruption)
-- Common symptoms (weight 2)
('DID', 'EMR_003', 2, 'common'),      -- Emotional flashbacks (trauma history)
('DID', 'PRC_001', 2, 'common'),      -- Derealization (dissociative symptom)
('DID', 'COG_013', 2, 'common'),      -- Emotional dysregulation (identity-related)
('DID', 'SOC_003', 2, 'common'),      -- Relationship difficulties (identity confusion)
('DID', 'ANX_005', 2, 'common'),      -- Hypervigilance (trauma-related)
('DID', 'SLP_004', 2, 'common'),      -- Nightmares (trauma memories)
-- Associated symptoms (weight 1)
('DID', 'MOD_001', 1, 'associated'),  -- Persistent sadness (depressive states)
('DID', 'CPG_004', 1, 'associated'),  -- Self-harm behaviors (alters in distress)
('DID', 'BDY_002', 1, 'associated'),  -- Headaches (switching-related)
('DID', 'ANX_001', 1, 'associated'),  -- Excessive worry (about losing control)
('DID', 'EMR_001', 1, 'associated');  -- Mood swings (different identity states)

-- ─────────────────────────────────────────────────────────────────────────────
-- OSDD — Other Specified Dissociative Disorder (12 mappings)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role) VALUES
-- Core symptoms (weight 3)
('OSDD', 'PRC_009', 3, 'core'),       -- Dissociative amnesia (significant)
('OSDD', 'PRC_002', 3, 'core'),       -- Depersonalization (core feature)
('OSDD', 'PRC_001', 3, 'core'),       -- Derealization (core feature)
-- Common symptoms (weight 2)
('OSDD', 'COG_004', 2, 'common'),     -- Memory problems (dissociative gaps)
('OSDD', 'EMR_003', 2, 'common'),     -- Emotional flashbacks (trauma-related)
('OSDD', 'IDN_001', 2, 'common'),     -- Unstable identity (disturbance)
('OSDD', 'COG_013', 2, 'common'),     -- Emotional dysregulation (dissociation-related)
('OSDD', 'ANX_005', 2, 'common'),     -- Hypervigilance (trauma response)
-- Associated symptoms (weight 1)
('OSDD', 'SLP_004', 1, 'associated'), -- Nightmares (trauma memories)
('OSDD', 'SOC_003', 1, 'associated'), -- Relationship difficulties (from dissociation)
('OSDD', 'MOD_001', 1, 'associated'), -- Persistent sadness (associated mood)
('OSDD', 'ANX_001', 1, 'associated'); -- Excessive worry (about symptoms)

-- ─────────────────────────────────────────────────────────────────────────────
-- ASD_ACUTE — Acute Stress Disorder (17 mappings)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role) VALUES
-- Core symptoms (weight 3)
('ASD_ACUTE', 'EMR_003', 3, 'core'),      -- Emotional flashbacks (intrusion)
('ASD_ACUTE', 'ANX_005', 3, 'core'),      -- Hypervigilance (arousal)
('ASD_ACUTE', 'CPG_001', 3, 'core'),      -- Avoidance (avoidance criterion)
('ASD_ACUTE', 'PRC_009', 3, 'core'),      -- Dissociative amnesia (dissociation)
-- Common symptoms (weight 2)
('ASD_ACUTE', 'SLP_004', 2, 'common'),    -- Nightmares (intrusion)
('ASD_ACUTE', 'PRC_001', 2, 'common'),    -- Derealization (dissociation)
('ASD_ACUTE', 'PRC_002', 2, 'common'),    -- Depersonalization (dissociation)
('ASD_ACUTE', 'MOD_004', 2, 'common'),    -- Emotional numbness (negative mood)
('ASD_ACUTE', 'ANX_001', 2, 'common'),    -- Excessive worry (hyperarousal)
('ASD_ACUTE', 'SLP_001', 2, 'common'),    -- Insomnia (arousal)
('ASD_ACUTE', 'EMR_002', 2, 'common'),    -- Irritability (arousal)
-- Associated symptoms (weight 1)
('ASD_ACUTE', 'COG_005', 1, 'associated'),-- Intrusive thoughts
('ASD_ACUTE', 'BDY_007', 1, 'associated'),-- Trembling (hyperarousal)
('ASD_ACUTE', 'BDY_001', 1, 'associated'),-- Muscle tension (hyperarousal)
('ASD_ACUTE', 'ANX_008', 1, 'associated'),-- Feeling overwhelmed (acute distress)
('ASD_ACUTE', 'COG_001', 1, 'associated'),-- Difficulty concentrating
('ASD_ACUTE', 'MOD_001', 1, 'associated');-- Persistent sadness (negative mood)

-- ─────────────────────────────────────────────────────────────────────────────
-- TTM — Trichotillomania (10 mappings)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role) VALUES
-- Core symptoms (weight 3)
('TTM', 'CPG_013', 3, 'core'),        -- Hair pulling (defining behavior)
('TTM', 'ANX_001', 3, 'core'),        -- Excessive worry (tension before pulling)
('TTM', 'CPG_002', 3, 'core'),        -- Compulsive behaviors (repetitive pattern)
-- Common symptoms (weight 2)
('TTM', 'EMR_006', 2, 'common'),      -- Shame (about hair loss)
('TTM', 'ANX_006', 2, 'common'),      -- Fear of losing control (over urge)
('TTM', 'COG_005', 2, 'common'),      -- Intrusive thoughts (urges to pull)
('TTM', 'SOC_002', 2, 'common'),      -- Avoiding situations (due to hair loss)
-- Associated symptoms (weight 1)
('TTM', 'MOD_007', 1, 'associated'),  -- Low self-esteem (appearance concerns)
('TTM', 'ACT_001', 1, 'associated'),  -- Procrastination (avoiding situations)
('TTM', 'BDY_001', 1, 'associated');  -- Muscle tension (physical tension)

-- ─────────────────────────────────────────────────────────────────────────────
-- SPD_EXCOR — Excoriation Disorder (10 mappings)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role) VALUES
-- Core symptoms (weight 3)
('SPD_EXCOR', 'CPG_014', 3, 'core'),        -- Skin picking (defining behavior)
('SPD_EXCOR', 'ANX_001', 3, 'core'),        -- Excessive worry (tension before picking)
('SPD_EXCOR', 'CPG_002', 3, 'core'),        -- Compulsive behaviors (repetitive)
-- Common symptoms (weight 2)
('SPD_EXCOR', 'EMR_006', 2, 'common'),      -- Shame (about skin damage)
('SPD_EXCOR', 'ANX_006', 2, 'common'),      -- Fear of losing control
('SPD_EXCOR', 'COG_005', 2, 'common'),      -- Intrusive thoughts (urges to pick)
('SPD_EXCOR', 'SOC_002', 2, 'common'),      -- Avoiding situations (due to lesions)
-- Associated symptoms (weight 1)
('SPD_EXCOR', 'MOD_007', 1, 'associated'),  -- Low self-esteem (appearance)
('SPD_EXCOR', 'PRC_005', 1, 'associated'),  -- Distorted body image (skin focus)
('SPD_EXCOR', 'BDY_001', 1, 'associated');  -- Muscle tension (before picking)

-- ─────────────────────────────────────────────────────────────────────────────
-- IED — Intermittent Explosive Disorder (13 mappings)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role) VALUES
-- Core symptoms (weight 3)
('IED', 'CPG_015', 3, 'core'),        -- Explosive anger (defining feature)
('IED', 'EMR_002', 3, 'core'),        -- Irritability (baseline)
('IED', 'ACT_004', 3, 'core'),        -- Impulsivity (failure to resist)
-- Common symptoms (weight 2)
('IED', 'SOC_006', 2, 'common'),      -- Conflict in relationships (from outbursts)
('IED', 'ACT_009', 2, 'common'),      -- Reckless behavior (during outbursts)
('IED', 'ANX_001', 2, 'common'),      -- Excessive worry (between episodes)
('IED', 'MOD_006', 2, 'common'),      -- Guilt (after outbursts)
('IED', 'COG_007', 2, 'common'),      -- Rumination (on triggering events)
-- Associated symptoms (weight 1)
('IED', 'BDY_001', 1, 'associated'),  -- Muscle tension (chronic)
('IED', 'SLP_001', 1, 'associated'),  -- Insomnia (from agitation)
('IED', 'SOC_003', 1, 'associated'),  -- Relationship difficulties (from aggression)
('IED', 'CPG_003', 1, 'associated'),  -- Substance use (to control anger)
('IED', 'BDY_003', 1, 'associated');  -- Heart palpitations (during arousal)

-- ─────────────────────────────────────────────────────────────────────────────
-- HYPER — Hypersomnolence Disorder (12 mappings)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role) VALUES
-- Core symptoms (weight 3)
('HYPER', 'SLP_006', 3, 'core'),      -- Excessive daytime sleepiness (DSM-5 Criterion A)
('HYPER', 'SLP_008', 3, 'core'),      -- Long sleep duration (main sleep period)
('HYPER', 'SLP_007', 3, 'core'),      -- Difficulty waking (sleep inertia)
-- Common symptoms (weight 2)
('HYPER', 'ENR_001', 2, 'common'),    -- Fatigue (despite long sleep)
('HYPER', 'COG_003', 2, 'common'),    -- Brain fog (from sleep inertia)
('HYPER', 'COG_001', 2, 'common'),    -- Difficulty concentrating (daytime impairment)
('HYPER', 'SLP_005', 2, 'common'),    -- Unrefreshing sleep (quality issue)
('HYPER', 'ACT_002', 2, 'common'),    -- Neglecting responsibilities (from sleepiness)
-- Associated symptoms (weight 1)
('HYPER', 'MOD_001', 1, 'associated'),-- Persistent sadness (associated mood)
('HYPER', 'ANX_001', 1, 'associated'),-- Excessive worry (about dysfunction)
('HYPER', 'SOC_001', 1, 'associated'),-- Social withdrawal (from sleep needs)
('HYPER', 'BDY_002', 1, 'associated');-- Headaches (sleep-related)

-- ─────────────────────────────────────────────────────────────────────────────
-- ARFID — Avoidant/Restrictive Food Intake Disorder (11 mappings)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role) VALUES
-- Core symptoms (weight 3)
('ARFID', 'APT_005', 3, 'core'),      -- Food avoidance - sensory (DSM-5 presentation 1)
('ARFID', 'APT_006', 3, 'core'),      -- Fear of consequences (DSM-5 presentation 2)
('ARFID', 'APT_001', 3, 'core'),      -- Loss of appetite (low interest presentation)
-- Common symptoms (weight 2)
('ARFID', 'APT_003', 2, 'common'),    -- Weight changes (nutritional consequence)
('ARFID', 'ANX_001', 2, 'common'),    -- Excessive worry (about eating)
('ARFID', 'BDY_009', 2, 'common'),    -- Nausea (eating-related distress)
('ARFID', 'ACT_008', 2, 'common'),    -- Sensory sensitivity (underlying factor)
-- Associated symptoms (weight 1)
('ARFID', 'SOC_002', 1, 'associated'),-- Avoiding situations (meals with others)
('ARFID', 'ENR_001', 1, 'associated'),-- Fatigue (nutritional deficiency)
('ARFID', 'MOD_007', 1, 'associated'),-- Low self-esteem (from differences)
('ARFID', 'ANX_008', 1, 'associated');-- Feeling overwhelmed (by food choices)

-- ─────────────────────────────────────────────────────────────────────────────
-- CYC — Cyclothymic Disorder (16 mappings)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role) VALUES
-- Core symptoms (weight 3)
('CYC', 'MOD_010', 3, 'core'),        -- Hypomanic symptoms (elevated periods)
('CYC', 'MOD_001', 3, 'core'),        -- Persistent sadness (depressive periods)
('CYC', 'EMR_001', 3, 'core'),        -- Mood swings (chronic fluctuation)
('CYC', 'ENR_001', 3, 'core'),        -- Fatigue (during depressive periods)
-- Common symptoms (weight 2)
('CYC', 'SLP_001', 2, 'common'),      -- Insomnia (during hypomania)
('CYC', 'SLP_002', 2, 'common'),      -- Oversleeping (during depression)
('CYC', 'ENR_002', 2, 'common'),      -- Restlessness (hypomanic energy)
('CYC', 'COG_002', 2, 'common'),      -- Racing thoughts (during elevated mood)
('CYC', 'MOD_003', 2, 'common'),      -- Loss of interest (depressive symptom)
('CYC', 'ACT_004', 2, 'common'),      -- Impulsivity (during hypomania)
-- Associated symptoms (weight 1)
('CYC', 'ANX_001', 1, 'associated'),  -- Excessive worry (mixed features)
('CYC', 'EMR_002', 1, 'associated'),  -- Irritability (irritable hypomania)
('CYC', 'COG_001', 1, 'associated'),  -- Difficulty concentrating (both phases)
('CYC', 'SOC_003', 1, 'associated'),  -- Relationship difficulties (from instability)
('CYC', 'APT_002', 1, 'associated'),  -- Increased appetite (during depression)
('CYC', 'ACT_001', 1, 'associated');  -- Procrastination (depressive phase)

-- ============================================================================
-- 3. RED FLAG ASSOCIATIONS
-- ============================================================================

INSERT INTO navigator_condition_red_flags (condition_id, symptom_id) VALUES
('DID', 'PRC_008'),      -- Identity switching (URGENT inherent flag)
('OSDD', 'PRC_008');     -- Identity switching (URGENT inherent flag)

COMMIT;

-- ============================================================================
-- End of Phase 4 Seed Data
-- Total: 14 conditions, 205 mappings, 2 red flag associations
-- ============================================================================
