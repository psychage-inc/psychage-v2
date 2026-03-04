-- ============================================================================
-- Symptom Navigator — Phase 4 Expansion Schema
-- Migration: 20260303000001 — Add 28 new symptoms for Phase 4 conditions
--
-- BACKWARDS COMPATIBLE: All changes are additive. No existing rows, columns,
-- or constraints are modified. Existing data continues to function exactly
-- as before.
--
-- Changes:
--   1. Add 28 new symptoms across existing categories (no schema changes needed)
--   2. New symptoms support: Personality Disorders (NPD, ASPD, DPD, SZPD),
--      Trauma/Dissociative (C-PTSD, DID, OSDD, ASD), OCD/Impulse (TTM, SPD, IED),
--      Sleep/Eating/Bipolar extensions (HYPER, ARFID, CYC)
--   3. New red flags: PRC_008 (URGENT inherent), PRC_009 (URGENT severity≥7),
--      CPG_015, ACT_009, SLP_006 (WATCH severity≥8), APT_005/006 (WATCH severity≥7)
--
-- Symptom ID Ranges:
--   IDN_005-008 (4) — Identity/self-image (grandiosity, empathy, admiration, submissiveness)
--   CPG_013-015 (3) — Coping (hair pulling, skin picking, explosive anger)
--   EMR_007-008 (2) — Emotional regulation (emptiness, norm violation)
--   MOD_010-011 (2) — Mood (hypomania, envy)
--   PRC_008-010 (3) — Perception (identity switching, amnesia, derealization)
--   COG_012-013 (2) — Cognition (trust issues, dysregulation)
--   SOC_009 (1) — Social (detachment/solitude preference)
--   ACT_009-010 (2) — Activity (recklessness, lying/manipulation)
--   SLP_006-008 (3) — Sleep (daytime sleepiness, sleep inertia, long duration)
--   APT_005-006 (2) — Appetite (sensory avoidance, fear of eating consequences)
-- ============================================================================

BEGIN;

-- ─── IDN (Identity/Self-Image) — behavioral domain ──────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('IDN_005', 'behavioral', 'identity_self_image', 'Grandiosity or inflated self-importance', 'An exaggerated sense of self-importance, superiority, or uniqueness; believing one is special and can only be understood by or associate with other special people.', ARRAY['inflated ego','sense of superiority','special status','entitled','better than others','exceptional','unique importance','grandiose self-view'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 5, TRUE, '1.0.0'),
('IDN_006', 'behavioral', 'identity_self_image', 'Lack of empathy or difficulty recognizing others feelings', 'Difficulty understanding or caring about how others feel; unwillingness or inability to recognize the needs and feelings of others.', ARRAY['no empathy','cant understand others feelings','indifferent to others','unaware of impact on others','emotionally cold','lack of compassion','self-centered','callous'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 6, TRUE, '1.0.0'),
('IDN_007', 'behavioral', 'identity_self_image', 'Excessive need for admiration', 'A constant need for excessive attention, praise, and validation from others to maintain self-esteem.', ARRAY['need for praise','attention seeking','validation seeking','need to be admired','craving recognition','fishing for compliments','needing approval','fame seeking'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 7, TRUE, '1.0.0'),
('IDN_008', 'behavioral', 'identity_self_image', 'Submissiveness or difficulty making decisions without reassurance', 'An excessive need for others to assume responsibility for major areas of one''s life and persistent difficulty making everyday decisions without excessive reassurance.', ARRAY['cant decide without help','need someone to decide','submissive','passive','seeking guidance constantly','avoiding responsibility','dependent on others','need direction'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 8, TRUE, '1.0.0');

-- ─── CPG (Coping Behaviors) — behavioral domain ─────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('CPG_013', 'behavioral', 'coping', 'Hair pulling or plucking', 'Recurrent pulling out of one''s own hair resulting in noticeable hair loss, often accompanied by tension before pulling and relief afterward.', ARRAY['pulling hair out','plucking hair','trichotillomania','eyebrow pulling','eyelash pulling','cant stop pulling hair','hair removal','trich'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 13, TRUE, '1.0.0'),
('CPG_014', 'behavioral', 'coping', 'Skin picking or scratching', 'Recurrent picking at one''s own skin resulting in skin lesions, often accompanied by tension before picking and relief afterward.', ARRAY['picking skin','scratching skin','excoriation','scab picking','cant stop picking','digging at skin','dermatillomania','skin damage'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 14, TRUE, '1.0.0'),
('CPG_015', 'behavioral', 'coping', 'Explosive anger or rage outbursts', 'Recurrent behavioral outbursts representing a failure to control aggressive impulses, manifested as verbal or physical aggression grossly out of proportion to the provocation.', ARRAY['rage attacks','explosive anger','violent outbursts','losing control angry','sudden rage','blowing up','aggressive episodes','anger explosions'], TRUE, TRUE, TRUE, FALSE, NULL, 8, 'WATCH', 15, TRUE, '1.0.0');

-- ─── EMR (Emotional Regulation) — emotional/behavioral domain ───────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('EMR_007', 'emotional', 'emotional_regulation', 'Chronic feelings of emptiness or boredom', 'A persistent sense of inner emptiness, hollowness, or chronic boredom that feels different from situational boredom.', ARRAY['chronically empty','always bored','nothing matters','inner void','persistent emptiness','existential boredom','hollow feeling','emotional vacuum'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 7, TRUE, '1.0.0'),
('EMR_008', 'behavioral', 'emotional_regulation', 'Inability to conform to social norms or rules', 'Persistent failure to conform to social norms with respect to lawful behaviors, as indicated by repeatedly performing acts that are grounds for arrest or violating rules.', ARRAY['breaking rules','disregard for norms','lawlessness','rule breaking','antisocial behavior','defiance','norm violation','disregard for law'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 8, TRUE, '1.0.0');

-- ─── MOD (Mood) — emotional domain ──────────────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('MOD_010', 'emotional', 'mood', 'Hypomanic symptoms (elevated mood, increased activity)', 'A distinct period of abnormally and persistently elevated, expansive, or irritable mood, and abnormally increased goal-directed activity or energy, less severe than mania.', ARRAY['hypomania','elevated mood','increased energy','more active than usual','high but not manic','upbeat period','productive burst','energized mood'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 10, TRUE, '1.0.0'),
('MOD_011', 'emotional', 'mood', 'Envy of others or belief others are envious', 'Persistent envy of others'' possessions, achievements, or qualities, or belief that others are envious of oneself.', ARRAY['envious','jealous of others','others are jealous of me','resentment of others success','covetous','green with envy','competitive jealousy','begrudging'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 11, TRUE, '1.0.0');

-- ─── PRC (Perception) — cognitive domain ────────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('PRC_008', 'cognitive', 'perception', 'Identity confusion or switching between identities', 'Experiencing oneself as having two or more distinct personality states or an experience of possession, with discontinuity in sense of self and agency.', ARRAY['switching','different personalities','identity switching','alters','multiple selves','losing time','becoming someone else','identity states'], TRUE, TRUE, TRUE, TRUE, 'URGENT', NULL, NULL, 8, TRUE, '1.0.0'),
('PRC_009', 'cognitive', 'perception', 'Dissociative amnesia or memory gaps', 'Recurrent gaps in the recall of everyday events, important personal information, and/or traumatic events that are inconsistent with ordinary forgetting.', ARRAY['memory gaps','losing time','cant remember periods','blackouts','amnesia episodes','missing time','memory loss','gaps in memory'], TRUE, TRUE, TRUE, FALSE, NULL, 7, 'URGENT', 9, TRUE, '1.0.0'),
('PRC_010', 'cognitive', 'perception', 'Detachment from surroundings (derealization)', 'Experiences of unreality or detachment with respect to surroundings (e.g., people or objects are experienced as unreal, dreamlike, or distorted).', ARRAY['world feels unreal','dreamlike state','surroundings distorted','detached from environment','reality feels off','things seem fake','living in a fog','unreality'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 10, TRUE, '1.0.0');

-- ─── COG (Cognition) — cognitive domain ─────────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('COG_012', 'cognitive', 'cognition', 'Difficulty trusting others or suspiciousness', 'A pervasive distrust and suspiciousness of others such that their motives are interpreted as malevolent, without sufficient basis.', ARRAY['cant trust anyone','suspicious','distrustful','paranoid about others','everyone has ulterior motives','trust issues','questioning motives','wary of people'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 12, TRUE, '1.0.0'),
('COG_013', 'cognitive', 'cognition', 'Emotional dysregulation or affect instability', 'Marked difficulty regulating emotions, resulting in emotional responses that are out of proportion to the situation or rapidly shifting emotional states.', ARRAY['cant control emotions','emotional instability','affect dysregulation','emotions all over','reactive emotions','intense emotions','mood volatility','emotional chaos'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 13, TRUE, '1.0.0');

-- ─── SOC (Social) — behavioral domain ───────────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('SOC_009', 'behavioral', 'social', 'Detachment from social relationships or preference for solitude', 'A pervasive pattern of detachment from social relationships and a restricted range of expression of emotions in interpersonal settings; neither desires nor enjoys close relationships.', ARRAY['prefer to be alone','no interest in relationships','detached from people','social indifference','loner','solitary','no need for others','emotionally distant'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 9, TRUE, '1.0.0');

-- ─── ACT (Activity Level) — behavioral domain ───────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('ACT_009', 'behavioral', 'activity_level', 'Reckless or irresponsible behavior', 'A pattern of behavior showing disregard for safety of self or others, including reckless driving, unsafe sexual behavior, or financial irresponsibility.', ARRAY['reckless','dangerous behavior','unsafe actions','irresponsible choices','disregard for safety','risky behavior','impulsive danger','careless actions'], TRUE, TRUE, TRUE, FALSE, NULL, 8, 'WATCH', 9, TRUE, '1.0.0'),
('ACT_010', 'behavioral', 'activity_level', 'Lying, manipulation, or deceitfulness', 'Repeated lying, use of aliases, or conning others for personal profit or pleasure; manipulating others to get one''s needs met.', ARRAY['lying','deceitful','manipulative','con artist','dishonest','using people','conning','exploitation'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 10, TRUE, '1.0.0');

-- ─── SLP (Sleep) — physical domain ──────────────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('SLP_006', 'physical', 'sleep', 'Excessive daytime sleepiness or sleep attacks', 'Overwhelming need to sleep during the day despite adequate nighttime sleep, including sudden, irresistible sleep episodes.', ARRAY['always sleepy','daytime sleep attacks','falling asleep during day','constant drowsiness','cant stay awake','sleep attacks','narcolepsy-like','irresistible sleep'], TRUE, TRUE, TRUE, FALSE, NULL, 8, 'WATCH', 6, TRUE, '1.0.0'),
('SLP_007', 'physical', 'sleep', 'Difficulty waking or sleep inertia', 'Extreme difficulty waking from sleep, prolonged confusion or disorientation upon waking, or taking hours to feel fully alert.', ARRAY['cant wake up','sleep inertia','groggy for hours','confused when waking','prolonged waking','sleep drunk','hard to rouse','waking difficulty'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 7, TRUE, '1.0.0'),
('SLP_008', 'physical', 'sleep', 'Long sleep duration (10+ hours)', 'Regularly sleeping 10 or more hours per night yet still feeling unrefreshed or needing naps during the day.', ARRAY['sleeping too long','extended sleep','10 plus hours sleep','long sleep need','hypersomnia','excessive sleep hours','prolonged sleep periods','oversleeping daily'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 8, TRUE, '1.0.0');

-- ─── APT (Appetite/Weight) — physical domain ────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('APT_005', 'physical', 'appetite_weight', 'Food avoidance due to sensory characteristics', 'Avoidance of eating based on sensory characteristics of food (appearance, color, smell, texture, temperature, taste) resulting in nutritional deficiency or dependence on supplements.', ARRAY['picky eater','texture aversion','sensory food issues','limited food repertoire','avoiding foods by texture','taste sensitive','food selectivity','sensory eating'], TRUE, TRUE, TRUE, FALSE, NULL, 7, 'WATCH', 5, TRUE, '1.0.0'),
('APT_006', 'physical', 'appetite_weight', 'Fear of aversive consequences of eating', 'Avoidance of eating based on concern about aversive consequences of eating, such as choking, vomiting, or gastrointestinal distress, not related to weight or body image concerns.', ARRAY['fear of choking','fear of vomiting','eating causes anxiety','fear of GI symptoms','scared to eat','eating phobia','food fear not weight','avoidance from fear'], TRUE, TRUE, TRUE, FALSE, NULL, 7, 'WATCH', 6, TRUE, '1.0.0');

COMMIT;

-- ============================================================================
-- End of Phase 4 Schema Expansion
-- ============================================================================
