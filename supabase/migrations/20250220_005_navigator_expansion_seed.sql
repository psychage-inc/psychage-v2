-- ============================================================================
-- Symptom Navigator — Expansion Seed Data
-- Migration: 005 — 15 new conditions with mappings
--
-- This adds:
--   15 conditions (Tier 1: 4, Tier 2: 5, Tier 3: 6)
--   ~240 condition-symptom mappings
--   10 condition red flags
--
-- Condition IDs follow existing convention: short uppercase codes
-- Mapping weights follow existing scale: 1 (associated), 2 (common), 3 (core)
-- All user-facing text is educational, non-diagnostic, non-stigmatizing.
--
-- DEPENDS ON: 20250220_004_navigator_expansion_schema.sql
--   (new categories + 24 new symptom codes must exist first)
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. CONDITIONS (15 new)
-- ============================================================================

INSERT INTO navigator_conditions (id, name, full_name, category, description_for_user, minimum_duration, minimum_duration_display, minimum_symptoms_for_relevance, always_recommend_professional, guide_path, coping_path, provider_questions, clinical_notes, is_active, version) VALUES

-- ─────────────────────────────────────────────────────────────────────────────
-- TIER 1
-- ─────────────────────────────────────────────────────────────────────────────

-- T1-1. SCZ — Schizophrenia / Psychotic Disorders
('SCZ', 'Psychotic Experiences', 'Schizophrenia Spectrum and Other Psychotic Disorders', 'psychotic',
 'Psychotic experiences may include hearing or seeing things others do not, holding beliefs that seem unusual to others, or having difficulty organizing thoughts. These experiences can be distressing, and professional evaluation is strongly recommended. Many effective treatments are available. This information is educational and not a diagnosis.',
 '1_month', 'At least 1 month', 3, TRUE,
 '/learn/psychosis', '/tools/mood-journal',
 ARRAY[
   'Have you been hearing voices or seeing things that others cannot?',
   'Do you hold beliefs that others have told you seem unusual or hard to understand?',
   'Have you noticed your thinking or speech becoming more disorganized?',
   'Have these experiences affected your ability to work, study, or maintain relationships?',
   'Is there a family history of psychosis or schizophrenia?'
 ],
 'Based on DSM-5-TR criteria for Schizophrenia (295.90) and Schizophrenia Spectrum Disorders. Requires 2+ characteristic symptoms (delusions, hallucinations, disorganized speech, disorganized/catatonic behavior, negative symptoms) for a significant portion of 1+ month. ICD-11 code: 6A20.',
 TRUE, '1.0.0'),

-- T1-2. BPD — Borderline Personality Disorder
('BPD', 'Borderline Personality Patterns', 'Borderline Personality Disorder', 'personality',
 'Borderline personality patterns involve intense emotions, unstable relationships, and a shifting sense of self. People experiencing these patterns often describe feeling emotions very deeply and finding it hard to regulate them. With appropriate support — particularly specialized therapy — many people find meaningful improvement. This information is educational and not a diagnosis.',
 '1_year', 'At least 1 year', 5, TRUE,
 '/learn/personality', '/tools/mood-journal',
 ARRAY[
   'Do you experience intense, rapidly changing emotions that feel hard to control?',
   'Do your close relationships tend to swing between extremes of closeness and conflict?',
   'Do you have a shifting or unclear sense of who you are or what you want?',
   'Have you engaged in impulsive behaviors during times of emotional distress?',
   'Do you experience intense fear of being abandoned or left by people close to you?'
 ],
 'Based on DSM-5-TR criteria for Borderline Personality Disorder (301.83). Requires pervasive pattern of instability in interpersonal relationships, self-image, affects, and marked impulsivity, with 5+ of 9 criteria. ICD-11 code: 6D10 with Borderline pattern qualifier.',
 TRUE, '1.0.0'),

-- T1-3. BN — Bulimia Nervosa
('BN', 'Bulimia Nervosa', 'Bulimia Nervosa', 'eating',
 'Bulimia nervosa involves a cycle of eating large amounts of food (binge episodes) followed by attempts to compensate, such as purging, fasting, or excessive exercise. Many people experience this pattern privately and with significant distress. Effective, compassionate treatments are available. This information is educational and not a diagnosis.',
 '3_months', 'At least 3 months', 3, TRUE,
 '/learn/eating-disorders', '/tools/mood-journal',
 ARRAY[
   'Do you experience episodes where you eat a large amount of food and feel unable to stop?',
   'After these episodes, do you try to compensate through vomiting, laxatives, fasting, or intense exercise?',
   'How much does your body shape or weight influence how you feel about yourself?',
   'How often do these binge-purge cycles occur?',
   'Have you noticed any physical effects such as dental problems, sore throat, or fatigue?'
 ],
 'Based on DSM-5-TR criteria for Bulimia Nervosa (307.51). Requires recurrent binge eating episodes with recurrent compensatory behaviors (at least once/week for 3 months) and self-evaluation unduly influenced by body shape and weight. ICD-11 code: 6B81.',
 TRUE, '1.0.0'),

-- T1-4. PGD — Prolonged Grief Disorder
('PGD', 'Prolonged Grief', 'Prolonged Grief Disorder', 'stress',
 'Prolonged grief describes an intense, persistent grief response following the death of someone close that continues well beyond what might be expected given cultural norms. This differs from normal grief by its intensity, duration, and impact on daily life. Specialized grief support can help. This information is educational and not a diagnosis.',
 '1_year', 'At least 12 months', 3, FALSE,
 '/learn/grief', '/tools/mood-journal',
 ARRAY[
   'How long ago did your loved one pass away?',
   'Do you find yourself intensely yearning or longing for the person who died?',
   'Has grief made it difficult to engage in activities or maintain relationships?',
   'Do you feel that life has lost its meaning since the loss?',
   'Have you been able to accept the reality of the death, or does it still feel unreal?'
 ],
 'Based on DSM-5-TR criteria for Prolonged Grief Disorder (newly added in DSM-5-TR, 2022). Requires persistent intense grief and longing for the deceased, with at least 3 of 8 additional symptoms, for at least 12 months after bereavement (6 months in ICD-11). ICD-11 code: 6B42.',
 TRUE, '1.0.0'),

-- ─────────────────────────────────────────────────────────────────────────────
-- TIER 2
-- ─────────────────────────────────────────────────────────────────────────────

-- T2-1. ASD — Autism Spectrum (Adult Presentation)
('ASD', 'Autism Spectrum', 'Autism Spectrum Disorder (Adult Presentation)', 'neurodevelopmental',
 'Autism spectrum describes persistent differences in social communication and interaction, along with restricted or repetitive patterns of behavior or interests. Many adults discover these patterns later in life and find that understanding them helps explain longstanding experiences. A professional assessment can provide clarity. This information is educational and not a diagnosis.',
 '1_year', 'Lifelong pattern', 4, TRUE,
 '/learn/autism', '/tools/mood-journal',
 ARRAY[
   'Have you always found it challenging to read social cues or understand unspoken social rules?',
   'Do you have very focused interests that feel different in intensity from those of your peers?',
   'Are you sensitive to sensory experiences like sounds, textures, or lights?',
   'Do you prefer routines and feel distressed when they change unexpectedly?',
   'Have you developed strategies to appear more socially typical (sometimes called masking)?'
 ],
 'Based on DSM-5-TR criteria for Autism Spectrum Disorder (299.00). Requires persistent deficits in social communication and social interaction, plus restricted/repetitive behaviors. Symptoms must be present from early development (though may not become fully manifest until social demands exceed capacity). ICD-11 code: 6A02.',
 TRUE, '1.0.0'),

-- T2-2. BDD — Body Dysmorphic Disorder
('BDD', 'Body Dysmorphic Concern', 'Body Dysmorphic Disorder', 'obsessive_compulsive',
 'Body dysmorphic concerns involve persistent preoccupation with perceived flaws in physical appearance that others may not notice or consider minor. This preoccupation can lead to repetitive behaviors like mirror checking and significant distress. Effective treatments, including specialized therapy, are available. This information is educational and not a diagnosis.',
 '1_month', 'At least 1 month', 2, FALSE,
 '/learn/body-dysmorphia', '/tools/mood-journal',
 ARRAY[
   'Do you spend significant time thinking about specific aspects of your appearance that you believe are flawed?',
   'Do others tell you the flaw is minor or that they cannot see it?',
   'Do you engage in repetitive behaviors like mirror checking, skin picking, or comparing yourself to others?',
   'How much does this preoccupation affect your daily life, work, or social activities?'
 ],
 'Based on DSM-5-TR criteria for Body Dysmorphic Disorder (300.7). Requires preoccupation with perceived defects in physical appearance that are not observable or appear slight to others, with repetitive behaviors in response. Classified under Obsessive-Compulsive and Related Disorders. ICD-11 code: 6B21.',
 TRUE, '1.0.0'),

-- T2-3. DPDR — Depersonalization/Derealization Disorder
('DPDR', 'Depersonalization/Derealization', 'Depersonalization/Derealization Disorder', 'dissociative',
 'Depersonalization and derealization involve persistent or recurring feelings of being detached from one''s own body or mind (depersonalization) or that the external world is unreal or dreamlike (derealization). These experiences can be distressing but are treatable. This information is educational and not a diagnosis.',
 '1_month', 'At least 1 month', 2, FALSE,
 '/learn/dissociation', '/tools/mood-journal',
 ARRAY[
   'Do you often feel detached from your body, thoughts, or feelings, as if watching yourself from the outside?',
   'Does the world around you sometimes feel unreal, dreamlike, or distorted?',
   'During these experiences, do you maintain awareness that what you are feeling is not literally true?',
   'How often do these episodes occur, and how long do they typically last?',
   'Do these experiences cause significant distress or interfere with your daily functioning?'
 ],
 'Based on DSM-5-TR criteria for Depersonalization/Derealization Disorder (300.6). Requires persistent or recurrent depersonalization, derealization, or both, with intact reality testing. Must cause significant distress or functional impairment. ICD-11 code: 6B66.',
 TRUE, '1.0.0'),

-- T2-4. SPP — Specific Phobias
('SPP', 'Specific Phobia', 'Specific Phobia', 'anxiety',
 'A specific phobia involves an intense, irrational fear of a particular object or situation — such as heights, animals, blood, flying, or enclosed spaces — that leads to active avoidance and significant distress. Specific phobias are among the most treatable anxiety experiences. This information is educational and not a diagnosis.',
 '6_months', 'At least 6 months', 2, FALSE,
 '/learn/phobias', '/tools/mood-journal',
 ARRAY[
   'What specific object, situation, or activity triggers your fear?',
   'Does encountering or thinking about the trigger cause immediate, intense anxiety?',
   'Do you actively avoid the trigger, or endure it with extreme distress?',
   'Is the fear out of proportion to the actual danger involved?',
   'How does this avoidance affect your daily life, work, or relationships?'
 ],
 'Based on DSM-5-TR criteria for Specific Phobia (300.29). Requires marked fear or anxiety about a specific object or situation, almost always provokes immediate anxiety, is actively avoided or endured with intense distress, and lasts 6+ months. ICD-11 code: 6B03.',
 TRUE, '1.0.0'),

-- T2-5. PMDD — Premenstrual Dysphoric Disorder
('PMDD', 'Premenstrual Dysphoric Disorder', 'Premenstrual Dysphoric Disorder', 'mood',
 'Premenstrual dysphoric disorder involves significant mood disturbance — such as marked mood swings, irritability, depression, or anxiety — that reliably occurs during the luteal phase of the menstrual cycle and resolves shortly after menstruation begins. PMDD goes beyond typical premenstrual symptoms. Effective treatments exist. This information is educational and not a diagnosis.',
 '3_months', 'At least 2 consecutive cycles', 4, FALSE,
 '/learn/pmdd', '/tools/mood-journal',
 ARRAY[
   'Do you notice significant mood changes (irritability, sadness, or anxiety) in the 1-2 weeks before your period?',
   'Do these mood symptoms improve within a few days after your period starts?',
   'How do these premenstrual changes affect your relationships, work, or daily activities?',
   'Have you noticed this pattern consistently across multiple menstrual cycles?',
   'Are these symptoms different from how you feel during the rest of your cycle?'
 ],
 'Based on DSM-5-TR criteria for Premenstrual Dysphoric Disorder (625.4). Requires at least 5 of 11 symptoms in the final week before menses, improving within a few days of onset, confirmed prospectively over at least 2 consecutive cycles. ICD-11 code: GA34.41.',
 TRUE, '1.0.0'),

-- ─────────────────────────────────────────────────────────────────────────────
-- TIER 3
-- ─────────────────────────────────────────────────────────────────────────────

-- T3-1. SADD — Seasonal Affective Disorder (MDE specifier)
('SADD', 'Seasonal Mood Pattern', 'Major Depressive Disorder with Seasonal Pattern', 'mood',
 'Seasonal mood pattern describes depressive episodes that reliably occur during specific seasons — most commonly fall and winter — and remit during other seasons. The pattern typically involves increased sleep, carbohydrate cravings, weight gain, and low energy alongside low mood. Effective approaches including light therapy are available. This information is educational and not a diagnosis.',
 '2_weeks', 'At least 2 weeks (recurring seasonally)', 4, FALSE,
 '/learn/seasonal-depression', '/tools/mood-journal',
 ARRAY[
   'Do you notice your mood consistently drops during a particular season?',
   'Do you experience more sleep, more appetite, and less energy during these periods?',
   'Does your mood improve when the seasons change?',
   'Has this pattern occurred for at least two consecutive years?'
 ],
 'Based on DSM-5-TR specifier for Major Depressive Disorder with Seasonal Pattern (296.xx with seasonal specifier). Requires temporal relationship between onset of MDE and a particular time of year, with full remissions at a characteristic time, for 2+ years. ICD-11 uses qualifier 6A70.4.',
 TRUE, '1.0.0'),

-- T3-2. HD — Hoarding Disorder
('HD', 'Hoarding Patterns', 'Hoarding Disorder', 'obsessive_compulsive',
 'Hoarding patterns involve persistent difficulty discarding or parting with possessions, regardless of their actual value, due to a perceived need to save them and distress associated with discarding them. This can lead to cluttered living spaces and significant distress. Understanding these patterns can be a first step toward change. This information is educational and not a diagnosis.',
 '6_months', 'At least 6 months', 3, FALSE,
 '/learn/hoarding', '/tools/mood-journal',
 ARRAY[
   'Do you find it very difficult to throw away or part with possessions?',
   'Do you feel distressed at the thought of getting rid of items?',
   'Have possessions accumulated to the point of cluttering your living spaces?',
   'Does the clutter make it difficult to use rooms for their intended purpose?',
   'Do you acquire more items than you have space for?'
 ],
 'Based on DSM-5-TR criteria for Hoarding Disorder (300.3). Requires persistent difficulty discarding possessions, perceived need to save items, distress associated with discarding, and accumulation of clutter that compromises intended use of living areas. Classified under Obsessive-Compulsive and Related Disorders. ICD-11 code: 6B24.',
 TRUE, '1.0.0'),

-- T3-3. SSD — Somatic Symptom Disorder
('SSD', 'Somatic Symptom Concern', 'Somatic Symptom Disorder', 'somatic',
 'Somatic symptom concerns involve one or more persistent physical symptoms accompanied by excessive thoughts, feelings, or behaviors related to those symptoms. The distress experienced is real and significant, regardless of whether a medical explanation is found. Professional support can help manage both the physical symptoms and the distress they cause. This information is educational and not a diagnosis.',
 '6_months', 'At least 6 months', 3, FALSE,
 '/learn/somatic-symptoms', '/tools/mood-journal',
 ARRAY[
   'Do you have persistent physical symptoms that cause you significant concern?',
   'Do you find yourself spending excessive time and energy worrying about these symptoms?',
   'Have medical evaluations not fully explained your symptoms?',
   'How do these symptoms and the worry about them affect your daily life?'
 ],
 'Based on DSM-5-TR criteria for Somatic Symptom Disorder (300.82). Requires one or more somatic symptoms that are distressing or result in significant disruption of daily life, with excessive thoughts, feelings, or behaviors related to the symptoms, for 6+ months. ICD-11 code: 6C20.',
 TRUE, '1.0.0'),

-- T3-4. IAD — Illness Anxiety Disorder
('IAD', 'Illness Anxiety', 'Illness Anxiety Disorder', 'somatic',
 'Illness anxiety involves a persistent preoccupation with having or developing a serious, undiagnosed medical condition. Physical symptoms, if present, are mild, yet the worry about illness is disproportionate and difficult to control. This concern is different from normal health awareness. Professional support can help develop a healthier relationship with health worries. This information is educational and not a diagnosis.',
 '6_months', 'At least 6 months', 2, FALSE,
 '/learn/health-anxiety', '/tools/mood-journal',
 ARRAY[
   'Are you frequently worried about having or developing a serious illness?',
   'Do you frequently check your body for signs of illness or research health symptoms?',
   'Does reassurance from doctors provide only temporary relief before the worry returns?',
   'How much time per day do you spend thinking about your health?',
   'Are your physical symptoms mild or absent, yet the worry feels overwhelming?'
 ],
 'Based on DSM-5-TR criteria for Illness Anxiety Disorder (300.7). Requires preoccupation with having or acquiring a serious illness, somatic symptoms mild or absent, high level of health anxiety, and excessive health-related behaviors, for 6+ months. ICD-11 code: 6B23.',
 TRUE, '1.0.0'),

-- T3-5. AVPD — Avoidant Personality Disorder
('AVPD', 'Avoidant Personality Patterns', 'Avoidant Personality Disorder', 'personality',
 'Avoidant personality patterns involve a pervasive pattern of social inhibition, feelings of inadequacy, and hypersensitivity to negative evaluation. People experiencing these patterns deeply desire connection but are held back by intense fear of criticism and rejection. Understanding these patterns can be an important first step. This information is educational and not a diagnosis.',
 '1_year', 'At least 1 year', 4, FALSE,
 '/learn/personality', '/tools/mood-journal',
 ARRAY[
   'Do you avoid social or occupational activities because of a fear of criticism or rejection?',
   'Do you hold back in relationships due to fear of being ridiculed or shamed?',
   'Do you see yourself as socially inept, personally unappealing, or inferior?',
   'Are you reluctant to try new activities or take personal risks for fear of embarrassment?',
   'Has this pattern been present for as long as you can remember?'
 ],
 'Based on DSM-5-TR criteria for Avoidant Personality Disorder (301.82). Requires pervasive pattern of social inhibition, feelings of inadequacy, and hypersensitivity to negative evaluation with 4+ of 7 criteria. ICD-11 code: 6D10 with Avoidant pattern qualifier.',
 TRUE, '1.0.0'),

-- T3-6. SEPA — Separation Anxiety (Adult)
('SEPA', 'Separation Anxiety', 'Separation Anxiety Disorder (Adult)', 'anxiety',
 'Separation anxiety involves developmentally excessive fear or anxiety about being separated from attachment figures. While often associated with childhood, many adults also experience this pattern, which can affect work, relationships, and daily independence. Effective treatments are available. This information is educational and not a diagnosis.',
 '6_months', 'At least 6 months', 3, FALSE,
 '/learn/anxiety', '/tools/mood-journal',
 ARRAY[
   'Do you experience excessive worry or distress about being separated from people you are close to?',
   'Do you worry about harm befalling your attachment figures when you are apart?',
   'Does fear of separation make it difficult for you to leave home, go to work, or travel?',
   'Do you have physical symptoms (headaches, nausea) when separation occurs or is anticipated?',
   'How long have you experienced these fears?'
 ],
 'Based on DSM-5-TR criteria for Separation Anxiety Disorder (309.21). Requires developmentally inappropriate and excessive anxiety concerning separation from attachment figures, with 3+ of 8 criteria, lasting 6+ months in adults. ICD-11 code: 6B05.',
 TRUE, '1.0.0');


-- ============================================================================
-- 2. CONDITION–SYMPTOM MAPPINGS (~240 total)
-- ============================================================================

-- ─── SCZ — Schizophrenia / Psychotic (18 mappings) ──────────────────────────
-- Source: DSM-5-TR 295.90, APA (2022). Core = positive symptoms + disorganization
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SCZ', 'PRC_004', 3, 'core', 'Auditory hallucinations are the most common positive symptom (DSM-5-TR Criterion A)'),
('SCZ', 'PRC_007', 3, 'core', 'Delusions are a hallmark positive symptom (DSM-5-TR Criterion A)'),
('SCZ', 'COG_011', 3, 'core', 'Disorganized speech/thinking is a Criterion A symptom');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SCZ', 'PRC_006', 2, 'common', 'Paranoid ideation is among the most common delusion types'),
('SCZ', 'PRC_003', 2, 'common', 'Visual disturbances/hallucinations may co-occur'),
('SCZ', 'SOC_001', 2, 'common', 'Social withdrawal reflects negative symptom domain (avolition)'),
('SCZ', 'SOC_004', 2, 'common', 'Reduced speech (alogia) is a negative symptom'),
('SCZ', 'MOD_004', 2, 'common', 'Flat affect/emotional blunting is a negative symptom'),
('SCZ', 'MOD_003', 2, 'common', 'Avolition/anhedonia reflects negative symptom domain');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SCZ', 'COG_001', 1, 'associated', 'Cognitive impairment is common in schizophrenia spectrum'),
('SCZ', 'COG_004', 1, 'associated', 'Working memory deficits frequently accompany psychosis'),
('SCZ', 'SLP_001', 1, 'associated', 'Sleep disturbance is common in psychotic episodes'),
('SCZ', 'SLP_003', 1, 'associated', 'Fragmented sleep during acute episodes'),
('SCZ', 'ACT_002', 1, 'associated', 'Functional decline from negative symptoms'),
('SCZ', 'ACT_003', 1, 'associated', 'Difficulty maintaining routines during episodes'),
('SCZ', 'ENR_001', 1, 'associated', 'Fatigue from medication side effects or negative symptoms'),
('SCZ', 'ANX_005', 1, 'associated', 'Hypervigilance may accompany paranoid symptoms'),
('SCZ', 'EMR_005', 1, 'associated', 'Depersonalization may occur during psychotic states');

-- ─── BPD — Borderline Personality Disorder (22 mappings) ────────────────────
-- Source: DSM-5-TR 301.83, APA (2022). 9 diagnostic criteria mapped to symptoms
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BPD', 'EMR_001', 3, 'core', 'Affective instability (Criterion 6: rapid mood shifts lasting hours)'),
('BPD', 'IDN_001', 3, 'core', 'Identity disturbance — markedly unstable self-image (Criterion 3)'),
('BPD', 'IDN_002', 3, 'core', 'Frantic efforts to avoid abandonment (Criterion 1)'),
('BPD', 'SOC_008', 3, 'core', 'Unstable, intense interpersonal relationships (Criterion 2)');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BPD', 'IDN_004', 2, 'common', 'Splitting/idealization-devaluation is characteristic (Criterion 2)'),
('BPD', 'MOD_008', 2, 'common', 'Chronic feelings of emptiness (Criterion 7)'),
('BPD', 'ACT_004', 2, 'common', 'Impulsivity in potentially self-damaging areas (Criterion 4)'),
('BPD', 'EMR_002', 2, 'common', 'Intense anger or difficulty controlling anger (Criterion 8)'),
('BPD', 'EMR_006', 2, 'common', 'Pervasive shame is a core emotional experience in BPD'),
('BPD', 'CPG_004', 2, 'common', 'Recurrent self-harm is common (Criterion 5)'),
('BPD', 'SOC_006', 2, 'common', 'Interpersonal conflict from emotional intensity and impulsivity');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BPD', 'EMR_003', 1, 'associated', 'Emotional flashbacks may occur from developmental trauma'),
('BPD', 'EMR_005', 1, 'associated', 'Transient dissociative symptoms (Criterion 9)'),
('BPD', 'PRC_001', 1, 'associated', 'Derealization during stress (Criterion 9)'),
('BPD', 'PRC_002', 1, 'associated', 'Depersonalization during stress (Criterion 9)'),
('BPD', 'PRC_006', 1, 'associated', 'Stress-related paranoid ideation (Criterion 9)'),
('BPD', 'ANX_006', 1, 'associated', 'Fear of losing control during emotional episodes'),
('BPD', 'CPG_003', 1, 'associated', 'Substance use as impulsive coping (Criterion 4)'),
('BPD', 'SOC_003', 1, 'associated', 'Chronic difficulty maintaining stable relationships'),
('BPD', 'MOD_001', 1, 'associated', 'Depressive episodes frequently co-occur with BPD'),
('BPD', 'SLP_001', 1, 'associated', 'Sleep disruption from emotional dysregulation'),
('BPD', 'MOD_007', 1, 'associated', 'Low self-worth intertwined with identity disturbance');

-- ─── BN — Bulimia Nervosa (16 mappings) ─────────────────────────────────────
-- Source: DSM-5-TR 307.51, APA (2022). Binge-purge cycle with body image distortion
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BN', 'CPG_005', 3, 'core', 'Recurrent binge eating episodes (Criterion A)'),
('BN', 'CPG_009', 3, 'core', 'Recurrent compensatory purging behaviors (Criterion B)'),
('BN', 'PRC_005', 3, 'core', 'Self-evaluation unduly influenced by body shape/weight (Criterion D)');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BN', 'CPG_010', 2, 'common', 'Excessive exercise as compensatory behavior'),
('BN', 'ANX_006', 2, 'common', 'Loss of control during binge episodes'),
('BN', 'APT_002', 2, 'common', 'Increased appetite/eating during binge episodes'),
('BN', 'MOD_006', 2, 'common', 'Guilt and self-blame following binge-purge episodes'),
('BN', 'EMR_006', 2, 'common', 'Shame about eating behavior and body'),
('BN', 'APT_004', 2, 'common', 'Distorted relationship with food underlies the binge-purge cycle');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BN', 'BDY_009', 1, 'associated', 'GI distress from binge-purge behaviors'),
('BN', 'MOD_001', 1, 'associated', 'Depressed mood frequently co-occurs with BN'),
('BN', 'MOD_007', 1, 'associated', 'Self-worth overly tied to body shape and weight'),
('BN', 'SOC_001', 1, 'associated', 'Social withdrawal from shame about eating behavior'),
('BN', 'ENR_001', 1, 'associated', 'Fatigue from nutritional disruption'),
('BN', 'ANX_001', 1, 'associated', 'Anxiety about weight, food, and body'),
('BN', 'BDY_006', 1, 'associated', 'Dizziness from electrolyte imbalance or purging');

-- ─── PGD — Prolonged Grief Disorder (16 mappings) ───────────────────────────
-- Source: DSM-5-TR (2022), newly added. ICD-11 6B42
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PGD', 'MOD_009', 3, 'core', 'Intense yearning/longing for the deceased (Criterion B)'),
('PGD', 'MOD_001', 3, 'core', 'Intense emotional pain/sorrow (Criterion C)'),
('PGD', 'CPG_001', 3, 'core', 'Avoidance of reminders of the loss (Criterion C)');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PGD', 'MOD_004', 2, 'common', 'Emotional numbness since the loss (Criterion C)'),
('PGD', 'MOD_003', 2, 'common', 'Difficulty engaging in life or activities since the loss (Criterion C)'),
('PGD', 'IDN_001', 2, 'common', 'Sense of identity confusion since the loss (Criterion C)'),
('PGD', 'MOD_008', 2, 'common', 'Feelings of meaninglessness or emptiness (Criterion C)'),
('PGD', 'SOC_001', 2, 'common', 'Social withdrawal and loneliness since the loss (Criterion C)');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PGD', 'MOD_002', 1, 'associated', 'Hopelessness about the future without the deceased'),
('PGD', 'SLP_001', 1, 'associated', 'Sleep disruption from grief-related distress'),
('PGD', 'ENR_001', 1, 'associated', 'Fatigue from prolonged emotional burden'),
('PGD', 'COG_001', 1, 'associated', 'Difficulty concentrating from preoccupation with loss'),
('PGD', 'ANX_001', 1, 'associated', 'Worry about the future without the deceased'),
('PGD', 'EMR_002', 1, 'associated', 'Anger or bitterness about the loss'),
('PGD', 'MOD_005', 1, 'associated', 'Frequent crying related to the loss'),
('PGD', 'COG_003', 1, 'associated', 'Brain fog from chronic grief state');

-- ─── ASD — Autism Spectrum (18 mappings) ────────────────────────────────────
-- Source: DSM-5-TR 299.00, APA (2022). Two criterion domains: social + RRB
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('ASD', 'SOC_007', 3, 'core', 'Difficulty with social-emotional reciprocity (Criterion A1)'),
('ASD', 'ACT_007', 3, 'core', 'Restricted, repetitive patterns of behavior or interests (Criterion B1-2)'),
('ASD', 'ACT_008', 3, 'core', 'Hyper- or hypo-reactivity to sensory input (Criterion B4)');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('ASD', 'SOC_001', 2, 'common', 'Difficulty with social relationships and maintaining friendships (Criterion A3)'),
('ASD', 'SOC_003', 2, 'common', 'Challenges adjusting behavior to social contexts (Criterion A3)'),
('ASD', 'ACT_003', 2, 'common', 'Insistence on sameness/inflexible adherence to routines (Criterion B2)'),
('ASD', 'COG_001', 2, 'common', 'Executive function challenges affecting sustained attention'),
('ASD', 'ANX_001', 2, 'common', 'Anxiety is a highly prevalent co-occurring experience in autistic adults');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('ASD', 'SOC_002', 1, 'associated', 'Social avoidance from difficulty navigating social norms'),
('ASD', 'ENR_005', 1, 'associated', 'Exhaustion from social masking/camouflaging'),
('ASD', 'ENR_001', 1, 'associated', 'Chronic fatigue from sensory and social demands'),
('ASD', 'ANX_008', 1, 'associated', 'Feeling overwhelmed by sensory/social demands'),
('ASD', 'SLP_001', 1, 'associated', 'Sleep difficulties are highly prevalent in autistic adults'),
('ASD', 'EMR_002', 1, 'associated', 'Irritability from sensory overload or change'),
('ASD', 'MOD_007', 1, 'associated', 'Low self-esteem from long-term social difficulties'),
('ASD', 'SLP_003', 1, 'associated', 'Disrupted sleep patterns common in autistic adults'),
('ASD', 'COG_003', 1, 'associated', 'Brain fog from sensory or cognitive overload'),
('ASD', 'ACT_006', 1, 'associated', 'Perfectionism in areas of focused interest');

-- ─── BDD — Body Dysmorphic Disorder (14 mappings) ──────────────────────────
-- Source: DSM-5-TR 300.7, APA (2022). OCD spectrum
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BDD', 'PRC_005', 3, 'core', 'Preoccupation with perceived appearance flaws (Criterion A)'),
('BDD', 'CPG_007', 3, 'core', 'Repetitive behaviors — mirror checking, comparing, reassurance seeking (Criterion B)');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BDD', 'COG_005', 2, 'common', 'Intrusive thoughts about perceived flaw'),
('BDD', 'EMR_006', 2, 'common', 'Intense shame about appearance'),
('BDD', 'ANX_004', 2, 'common', 'Social anxiety driven by appearance concerns'),
('BDD', 'SOC_002', 2, 'common', 'Avoidance of social situations due to appearance fears'),
('BDD', 'COG_007', 2, 'common', 'Rumination about perceived defect'),
('BDD', 'ANX_001', 2, 'common', 'Excessive worry about how others perceive the flaw');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BDD', 'SOC_001', 1, 'associated', 'Social withdrawal from appearance-related distress'),
('BDD', 'MOD_007', 1, 'associated', 'Low self-esteem tied to perceived flaws'),
('BDD', 'MOD_001', 1, 'associated', 'Depressed mood frequently co-occurs with BDD'),
('BDD', 'CPG_001', 1, 'associated', 'Avoidance of mirrors, photos, or situations exposing the flaw'),
('BDD', 'ACT_006', 1, 'associated', 'Perfectionism about appearance'),
('BDD', 'CPG_002', 1, 'associated', 'Ritualistic behaviors around appearance (grooming, camouflaging)');

-- ─── DPDR — Depersonalization/Derealization (14 mappings) ───────────────────
-- Source: DSM-5-TR 300.6, APA (2022)
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('DPDR', 'PRC_002', 3, 'core', 'Depersonalization — detachment from self (Criterion A1)'),
('DPDR', 'PRC_001', 3, 'core', 'Derealization — world feels unreal (Criterion A2)'),
('DPDR', 'EMR_005', 3, 'core', 'Feeling detached from emotions, body, or identity');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('DPDR', 'COG_003', 2, 'common', 'Brain fog/cognitive cloudiness during episodes'),
('DPDR', 'PRC_003', 2, 'common', 'Visual distortions during dissociative episodes'),
('DPDR', 'ANX_001', 2, 'common', 'Anxiety about the dissociative experiences'),
('DPDR', 'COG_004', 2, 'common', 'Memory difficulties — gaps or sense of lost time');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('DPDR', 'ANX_006', 1, 'associated', 'Fear of losing grip on reality'),
('DPDR', 'MOD_004', 1, 'associated', 'Emotional numbness during depersonalized states'),
('DPDR', 'SOC_001', 1, 'associated', 'Social withdrawal from distress about experiences'),
('DPDR', 'COG_001', 1, 'associated', 'Difficulty concentrating during dissociative episodes'),
('DPDR', 'MOD_001', 1, 'associated', 'Depressed mood may co-occur'),
('DPDR', 'ENR_001', 1, 'associated', 'Fatigue from chronic dissociative states'),
('DPDR', 'SLP_001', 1, 'associated', 'Sleep disruption from anxiety about episodes');

-- ─── SPP — Specific Phobia (12 mappings) ────────────────────────────────────
-- Source: DSM-5-TR 300.29, APA (2022)
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SPP', 'ANX_003', 3, 'core', 'Marked fear of a specific object or situation (Criterion A)'),
('SPP', 'CPG_001', 3, 'core', 'Active avoidance of the phobic stimulus (Criterion D)');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SPP', 'ANX_002', 2, 'common', 'Immediate anxiety response resembling panic on exposure (Criterion B)'),
('SPP', 'BDY_003', 2, 'common', 'Heart palpitations when confronting or anticipating the stimulus'),
('SPP', 'BDY_007', 2, 'common', 'Trembling when exposed to phobic stimulus'),
('SPP', 'BDY_008', 2, 'common', 'Sweating when exposed to or anticipating phobic stimulus');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SPP', 'ANX_007', 1, 'associated', 'Catastrophic thinking about encountering the stimulus'),
('SPP', 'BDY_005', 1, 'associated', 'Shortness of breath during phobic exposure'),
('SPP', 'BDY_009', 1, 'associated', 'Nausea from intense anxiety response'),
('SPP', 'ANX_001', 1, 'associated', 'Anticipatory worry about encountering the stimulus'),
('SPP', 'SOC_002', 1, 'associated', 'Avoidance of situations where stimulus might be present'),
('SPP', 'BDY_006', 1, 'associated', 'Dizziness during phobic exposure');

-- ─── PMDD — Premenstrual Dysphoric Disorder (16 mappings) ──────────────────
-- Source: DSM-5-TR 625.4, APA (2022). Cyclical pattern is key differentiator
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PMDD', 'EMR_001', 3, 'core', 'Marked affective lability — mood swings (Criterion A1)'),
('PMDD', 'EMR_002', 3, 'core', 'Marked irritability or anger (Criterion A2)'),
('PMDD', 'MOD_001', 3, 'core', 'Marked depressed mood or hopelessness (Criterion A3)');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PMDD', 'ANX_001', 2, 'common', 'Marked anxiety, tension (Criterion A4)'),
('PMDD', 'MOD_003', 2, 'common', 'Decreased interest in activities (Criterion B1)'),
('PMDD', 'COG_001', 2, 'common', 'Subjective difficulty concentrating (Criterion B2)'),
('PMDD', 'ENR_001', 2, 'common', 'Lethargy/fatigue/marked lack of energy (Criterion B3)'),
('PMDD', 'APT_002', 2, 'common', 'Overeating or food cravings (Criterion B4)'),
('PMDD', 'SLP_001', 2, 'common', 'Insomnia during luteal phase (Criterion B5)'),
('PMDD', 'SLP_002', 2, 'common', 'Hypersomnia during luteal phase (Criterion B5)');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PMDD', 'ANX_008', 1, 'associated', 'Sense of being overwhelmed during premenstrual phase (Criterion B6)'),
('PMDD', 'BDY_001', 1, 'associated', 'Physical symptoms — breast tenderness, bloating (Criterion B7)'),
('PMDD', 'SOC_006', 1, 'associated', 'Interpersonal conflict from irritability and mood lability'),
('PMDD', 'MOD_005', 1, 'associated', 'Crying spells during premenstrual phase'),
('PMDD', 'MOD_007', 1, 'associated', 'Self-deprecating thoughts during premenstrual phase'),
('PMDD', 'COG_003', 1, 'associated', 'Brain fog during luteal phase');

-- ─── SADD — Seasonal Affective Disorder (16 mappings) ──────────────────────
-- Source: DSM-5-TR seasonal specifier for MDE. Shares MDE criteria but with seasonal pattern
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SADD', 'MOD_001', 3, 'core', 'Depressed mood with seasonal onset'),
('SADD', 'ENR_006', 3, 'core', 'Seasonal energy/mood changes are the defining feature'),
('SADD', 'ENR_001', 3, 'core', 'Significant fatigue during seasonal depressive episodes');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SADD', 'SLP_002', 2, 'common', 'Hypersomnia — increased sleep need (atypical feature common in SAD)'),
('SADD', 'APT_002', 2, 'common', 'Carbohydrate craving and overeating (atypical feature common in SAD)'),
('SADD', 'MOD_003', 2, 'common', 'Loss of interest during seasonal episode'),
('SADD', 'APT_003', 2, 'common', 'Weight gain during seasonal episode (atypical feature)'),
('SADD', 'SOC_001', 2, 'common', 'Social withdrawal during seasonal episode ("hibernation")');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SADD', 'COG_001', 1, 'associated', 'Difficulty concentrating during seasonal episode'),
('SADD', 'COG_003', 1, 'associated', 'Brain fog during darker months'),
('SADD', 'MOD_002', 1, 'associated', 'Hopelessness during seasonal episode'),
('SADD', 'MOD_007', 1, 'associated', 'Low self-esteem during seasonal episode'),
('SADD', 'BDY_001', 1, 'associated', 'Physical aches during seasonal episode'),
('SADD', 'ACT_001', 1, 'associated', 'Procrastination during seasonal episode'),
('SADD', 'ENR_003', 1, 'associated', 'Psychomotor slowing during seasonal episode'),
('SADD', 'MOD_005', 1, 'associated', 'Crying spells during seasonal episode');

-- ─── HD — Hoarding Disorder (13 mappings) ───────────────────────────────────
-- Source: DSM-5-TR 300.3, APA (2022). OCD spectrum but distinct
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('HD', 'CPG_011', 3, 'core', 'Persistent difficulty discarding possessions (Criterion A)'),
('HD', 'CPG_012', 3, 'core', 'Distress associated with discarding (Criterion B)'),
('HD', 'CPG_008', 3, 'core', 'Accumulation of clutter that congests living areas (Criterion C)');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('HD', 'ANX_001', 2, 'common', 'Anxiety about the need to save items or about losing them'),
('HD', 'COG_006', 2, 'common', 'Indecisiveness about what to keep vs. discard'),
('HD', 'ACT_001', 2, 'common', 'Procrastination about organizing or discarding');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('HD', 'EMR_006', 1, 'associated', 'Shame about cluttered living spaces'),
('HD', 'SOC_001', 1, 'associated', 'Social isolation from embarrassment about home'),
('HD', 'SOC_003', 1, 'associated', 'Relationship conflict over possessions and clutter'),
('HD', 'ANX_008', 1, 'associated', 'Feeling overwhelmed by the volume of possessions'),
('HD', 'MOD_001', 1, 'associated', 'Depressed mood from the impact of hoarding on life quality'),
('HD', 'ACT_003', 1, 'associated', 'Difficulty maintaining daily routines due to clutter'),
('HD', 'COG_005', 1, 'associated', 'Intrusive thoughts about the need to acquire or keep items');

-- ─── SSD — Somatic Symptom Disorder (14 mappings) ──────────────────────────
-- Source: DSM-5-TR 300.82, APA (2022)
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SSD', 'SOM_002', 3, 'core', 'Persistent somatic symptoms causing distress (Criterion A)'),
('SSD', 'SOM_001', 3, 'core', 'Excessive health-related thoughts/worry (Criterion B)'),
('SSD', 'SOM_003', 3, 'core', 'Excessive time/energy devoted to health concerns (Criterion B)');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SSD', 'BDY_010', 2, 'common', 'Chronic pain without clear medical cause'),
('SSD', 'ANX_001', 2, 'common', 'Persistent anxiety about health or symptoms'),
('SSD', 'CPG_007', 2, 'common', 'Excessive checking of body or reassurance seeking');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SSD', 'BDY_001', 1, 'associated', 'Various musculoskeletal complaints'),
('SSD', 'BDY_009', 1, 'associated', 'GI symptoms as presenting complaint'),
('SSD', 'ENR_001', 1, 'associated', 'Fatigue as a prominent somatic symptom'),
('SSD', 'BDY_002', 1, 'associated', 'Headaches as a presenting symptom'),
('SSD', 'MOD_001', 1, 'associated', 'Depressed mood from the burden of symptoms'),
('SSD', 'SOC_001', 1, 'associated', 'Social withdrawal from symptom burden'),
('SSD', 'COG_001', 1, 'associated', 'Difficulty concentrating from preoccupation with symptoms'),
('SSD', 'SLP_001', 1, 'associated', 'Sleep disruption from worry about symptoms');

-- ─── IAD — Illness Anxiety Disorder (12 mappings) ──────────────────────────
-- Source: DSM-5-TR 300.7, APA (2022). Distinguished from SSD by minimal symptoms
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('IAD', 'SOM_001', 3, 'core', 'Preoccupation with having or acquiring a serious illness (Criterion A)'),
('IAD', 'SOM_003', 3, 'core', 'Excessive health-related behaviors — checking, doctor visits (Criterion D)');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('IAD', 'ANX_001', 2, 'common', 'High level of anxiety about health (Criterion C)'),
('IAD', 'CPG_007', 2, 'common', 'Excessive reassurance seeking about health'),
('IAD', 'ANX_007', 2, 'common', 'Catastrophic thinking about health symptoms'),
('IAD', 'CPG_001', 2, 'common', 'Avoidance of health information or medical settings (avoidance subtype)');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('IAD', 'SLP_001', 1, 'associated', 'Sleep disruption from health worry'),
('IAD', 'COG_001', 1, 'associated', 'Difficulty concentrating due to health preoccupation'),
('IAD', 'MOD_001', 1, 'associated', 'Depressed mood from chronic health anxiety'),
('IAD', 'SOC_001', 1, 'associated', 'Social withdrawal from health-related avoidance'),
('IAD', 'BDY_001', 1, 'associated', 'Muscle tension from chronic anxiety state'),
('IAD', 'COG_007', 1, 'associated', 'Rumination about health symptoms and worst-case outcomes');

-- ─── AVPD — Avoidant Personality Disorder (16 mappings) ────────────────────
-- Source: DSM-5-TR 301.82, APA (2022)
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('AVPD', 'IDN_003', 3, 'core', 'Views self as socially inept, unappealing, or inferior (Criterion 4)'),
('AVPD', 'SOC_002', 3, 'core', 'Avoidance of social/occupational activities due to fear of criticism (Criterion 1)'),
('AVPD', 'ANX_004', 3, 'core', 'Fear of being judged or criticized in social settings (Criterion 5)');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('AVPD', 'SOC_001', 2, 'common', 'Social withdrawal from fear of rejection (Criterion 2-3)'),
('AVPD', 'MOD_007', 2, 'common', 'Deep-seated low self-esteem and inferiority (Criterion 4)'),
('AVPD', 'EMR_006', 2, 'common', 'Shame about perceived social inadequacy'),
('AVPD', 'SOC_005', 2, 'common', 'Reluctance to engage unless certain of being liked (Criterion 3)'),
('AVPD', 'CPG_001', 2, 'common', 'Avoidance of new activities/risks from fear of embarrassment (Criterion 7)');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('AVPD', 'MOD_003', 1, 'associated', 'Reduced engagement in activities from social avoidance'),
('AVPD', 'MOD_001', 1, 'associated', 'Depressed mood from chronic isolation'),
('AVPD', 'COG_007', 1, 'associated', 'Rumination about social interactions and perceived failings'),
('AVPD', 'ANX_001', 1, 'associated', 'Pervasive worry about social evaluation'),
('AVPD', 'SOC_003', 1, 'associated', 'Difficulty forming close relationships'),
('AVPD', 'MOD_004', 1, 'associated', 'Emotional constriction as self-protection'),
('AVPD', 'BDY_003', 1, 'associated', 'Physiological anxiety response in social situations'),
('AVPD', 'ENR_001', 1, 'associated', 'Fatigue from chronic avoidance and anxiety');

-- ─── SEPA — Separation Anxiety (Adult) (14 mappings) ───────────────────────
-- Source: DSM-5-TR 309.21, APA (2022). Now recognized in adults
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SEPA', 'ANX_009', 3, 'core', 'Excessive fear/anxiety about separation from attachment figures (Criterion A)'),
('SEPA', 'ANX_001', 3, 'core', 'Persistent worry about harm befalling attachment figures (Criterion A2-3)');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SEPA', 'CPG_001', 2, 'common', 'Reluctance to leave home or go places due to separation fear (Criterion A5)'),
('SEPA', 'SOC_005', 2, 'common', 'Need for proximity to attachment figure'),
('SEPA', 'SLP_004', 2, 'common', 'Nightmares involving themes of separation (Criterion A7)'),
('SEPA', 'SLP_001', 2, 'common', 'Reluctance to go to sleep without attachment figure nearby (Criterion A6)'),
('SEPA', 'BDY_009', 2, 'common', 'Physical symptoms (nausea, headaches) when separation anticipated (Criterion A8)');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SEPA', 'ANX_007', 1, 'associated', 'Catastrophic thinking about separation events'),
('SEPA', 'BDY_002', 1, 'associated', 'Headaches when separation anticipated'),
('SEPA', 'ANX_002', 1, 'associated', 'Panic attacks upon actual or anticipated separation'),
('SEPA', 'MOD_001', 1, 'associated', 'Depressed mood when separated from attachment figures'),
('SEPA', 'SOC_002', 1, 'associated', 'Avoidance of situations requiring separation'),
('SEPA', 'ACT_002', 1, 'associated', 'Neglecting responsibilities due to reluctance to leave home'),
('SEPA', 'BDY_001', 1, 'associated', 'Physical tension from chronic separation anxiety');


-- ============================================================================
-- 3. CONDITION RED FLAGS
-- ============================================================================

INSERT INTO navigator_condition_red_flags (condition_id, symptom_id, note) VALUES
-- SCZ: psychotic symptoms always warrant urgent evaluation
('SCZ', 'PRC_004', 'Hallucinations require urgent professional evaluation'),
('SCZ', 'PRC_007', 'Delusions require urgent professional evaluation'),
-- BPD: self-harm and suicidal behavior are elevated risks
('BPD', 'COG_008', 'Self-harm ideation is common and requires safety assessment'),
('BPD', 'COG_009', 'Suicidal ideation risk is elevated in BPD — requires immediate assessment'),
('BPD', 'CPG_004', 'Active self-harm requires crisis intervention'),
-- BN: purging is a medical risk
('BN', 'CPG_009', 'Purging behaviors carry medical risks (electrolyte imbalance, dental erosion)'),
-- PGD: grief can co-occur with suicidality
('PGD', 'COG_009', 'Suicidal ideation may co-occur with prolonged grief'),
('PGD', 'COG_008', 'Self-harm ideation may co-occur with prolonged grief'),
-- SADD: seasonal depression carries same risks as MDE
('SADD', 'COG_008', 'Self-harm ideation during seasonal episode requires assessment'),
('SADD', 'COG_009', 'Suicidal ideation during seasonal episode requires crisis intervention');


-- ============================================================================
-- 4. UPDATE MATCHING CONFIG — Increase max_results to 5
-- ============================================================================
-- With 31 total conditions, 4 results becomes overly restrictive.
-- Bump to 5 to improve coverage while keeping output manageable.
-- Also bump max_per_family to 2 (unchanged) to maintain diversity.

UPDATE navigator_matching_config
SET max_results = 5,
    version = '1.1.0'
WHERE id = 1;


COMMIT;
