-- ============================================================================
-- Symptom Navigator — Schema Expansion (Phase 2/3/4 Conditions)
-- Migration: 004 — Add new condition categories and symptom codes
--
-- BACKWARDS COMPATIBLE: All changes are additive. No existing rows, columns,
-- or constraints are modified. Existing data continues to function exactly
-- as before.
--
-- Changes:
--   1. ALTER navigator_conditions.category CHECK to include new categories:
--      + 'personality', 'psychotic', 'dissociative', 'somatic'
--   2. ALTER navigator_symptoms.category CHECK to include:
--      + 'identity_self_image', 'somatic_health'
--   3. Add 24 new symptoms across existing and new categories
--   4. No existing rows are touched
-- ============================================================================

BEGIN;

-- ─── 1. Expand Condition Category CHECK ──────────────────────────────────────
-- Add: personality, psychotic, dissociative, somatic
-- Keep all existing values intact

ALTER TABLE navigator_conditions
  DROP CONSTRAINT IF EXISTS navigator_conditions_category_check;

ALTER TABLE navigator_conditions
  ADD CONSTRAINT navigator_conditions_category_check
  CHECK (category IN (
    -- Existing
    'mood', 'anxiety', 'trauma', 'obsessive_compulsive',
    'neurodevelopmental', 'stress', 'sleep', 'eating', 'substance',
    -- New
    'personality', 'psychotic', 'dissociative', 'somatic'
  ));

-- ─── 2. Expand Symptom Category CHECK ────────────────────────────────────────
-- Add: identity_self_image (for BPD/AvPD), somatic_health (for SSD/IAD)
-- Keep all existing values intact

ALTER TABLE navigator_symptoms
  DROP CONSTRAINT IF EXISTS navigator_symptoms_category_check;

ALTER TABLE navigator_symptoms
  ADD CONSTRAINT navigator_symptoms_category_check
  CHECK (category IN (
    -- Existing
    'mood', 'anxiety_fear', 'emotional_regulation',
    'body_sensations', 'sleep', 'appetite_weight', 'energy',
    'cognition', 'perception',
    'social', 'coping', 'activity_level',
    -- New
    'identity_self_image', 'somatic_health'
  ));


-- ─── 3. New Symptoms (24 total) ─────────────────────────────────────────────
-- Follows existing ID convention: 3-letter prefix + underscore + 3 digits
-- New prefixes:
--   IDN = Identity/Self-Image (behavioral domain)
--   SOM = Somatic/Health Concerns (physical domain)
--   CPG_009-012 = New coping behaviors
--   PRC_007 = New perception symptom
--   SOC_007 = New social symptom
--   ANX_009-010 = New anxiety symptoms
--   MOD_009 = New mood symptom

-- ─── IDN (Identity/Self-Image) — behavioral domain ──────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('IDN_001', 'behavioral', 'identity_self_image', 'Unstable sense of identity', 'A shifting or uncertain sense of who one is, including frequent changes in values, goals, career interests, or personal identity.', ARRAY['identity confusion','don''t know who I am','changing self-image','unstable self','shifting identity','identity crisis','who am I','self-concept confusion'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 1, TRUE, '1.0.0'),
('IDN_002', 'behavioral', 'identity_self_image', 'Fear of abandonment', 'An intense, pervasive fear of being left, rejected, or abandoned by important people, often leading to frantic efforts to prevent real or imagined separation.', ARRAY['abandonment fear','fear of being left','clingy','separation anxiety','don''t leave me','fear of rejection','desperate to keep people','attachment panic'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 2, TRUE, '1.0.0'),
('IDN_003', 'behavioral', 'identity_self_image', 'Chronic feelings of inadequacy', 'A deep, persistent belief of being socially inept, personally unappealing, or inferior to others that leads to avoidance of social interaction.', ARRAY['feeling inadequate','not good enough for people','socially inept','inferior to others','unappealing','fear of criticism','avoiding people due to shame','shrinking back'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 3, TRUE, '1.0.0'),
('IDN_004', 'behavioral', 'identity_self_image', 'Splitting or black-and-white thinking', 'A pattern of seeing people and situations in extremes — all good or all bad — with rapid shifts between idealization and devaluation.', ARRAY['all or nothing thinking','idealization then devaluation','love-hate','black and white','extreme opinions of people','perfect then terrible','polarized views','no middle ground'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 4, TRUE, '1.0.0');

-- ─── SOM (Somatic/Health) — physical domain ─────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('SOM_001', 'physical', 'somatic_health', 'Excessive worry about health or illness', 'Persistent preoccupation with having or developing a serious medical condition, often despite reassurance from healthcare providers.', ARRAY['health anxiety','hypochondria','illness worry','disease fear','medical anxiety','health obsession','fear of being sick','something is wrong with me'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 1, TRUE, '1.0.0'),
('SOM_002', 'physical', 'somatic_health', 'Persistent physical symptoms causing distress', 'Ongoing physical symptoms (pain, fatigue, GI distress) that cause significant worry and lead to excessive time and energy devoted to health concerns.', ARRAY['unexplained symptoms','physical complaints','body symptoms with no cause','somatic distress','constant symptoms','medical mystery','symptoms wont go away','bodily preoccupation'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 2, TRUE, '1.0.0'),
('SOM_003', 'physical', 'somatic_health', 'Frequent medical visits or health checking', 'Repeatedly visiting doctors, requesting tests, or checking one''s body for signs of illness far beyond what is medically recommended.', ARRAY['doctor shopping','constant medical tests','body checking','googling symptoms','health reassurance seeking','medical visits','scanning body for illness','requesting tests'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 3, TRUE, '1.0.0');

-- ─── New CPG (Coping) additions ──────────────────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('CPG_009', 'behavioral', 'coping', 'Purging behaviors', 'Self-induced vomiting, misuse of laxatives, diuretics, or other methods to compensate for food intake, driven by concerns about weight or body shape.', ARRAY['making myself throw up','vomiting after eating','laxative use','purging','compensatory behavior','getting rid of food','self-induced vomiting','diet pill misuse'], TRUE, TRUE, TRUE, FALSE, NULL, 6, 'URGENT', 9, TRUE, '1.0.0'),
('CPG_010', 'behavioral', 'coping', 'Excessive exercise to compensate for eating', 'Exercising intensely or compulsively to "burn off" calories consumed, often despite injury, illness, or exhaustion.', ARRAY['compulsive exercise','exercise to burn calories','over-exercising','punishing exercise','exercise obsession','cant stop exercising','compensatory exercise','exercise purging'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 10, TRUE, '1.0.0'),
('CPG_011', 'behavioral', 'coping', 'Collecting or difficulty discarding possessions', 'Acquiring excessive items and persistent difficulty discarding them regardless of value, leading to cluttered living spaces that compromise intended use.', ARRAY['cant throw things away','collecting too much','cluttered home','saving everything','hoarding','pack rat','running out of space','emotional attachment to objects'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 11, TRUE, '1.0.0'),
('CPG_012', 'behavioral', 'coping', 'Distress when discarding possessions', 'Significant emotional distress or anxiety experienced at the thought of getting rid of possessions, even items others would consider worthless.', ARRAY['anxiety about throwing away','cant let go of things','distressed by decluttering','emotional about possessions','need to save everything','upset about discarding','keeping just in case','separation from objects'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 12, TRUE, '1.0.0');

-- ─── New PRC (Perception) additions ──────────────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('PRC_007', 'cognitive', 'perception', 'Delusions or strongly held false beliefs', 'Firmly held beliefs that are not based in reality and persist despite contradictory evidence, such as believing one has special powers or is being persecuted.', ARRAY['false beliefs','delusions','paranoid beliefs','grandiose beliefs','believing things others dont','ideas of reference','magical thinking','unshakeable beliefs'], TRUE, TRUE, TRUE, TRUE, 'URGENT', NULL, NULL, 7, TRUE, '1.0.0');

-- ─── New SOC (Social) additions ──────────────────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('SOC_007', 'behavioral', 'social', 'Difficulty understanding social cues', 'Persistent challenges in reading facial expressions, body language, tone of voice, or understanding implied meanings in conversations.', ARRAY['missing social cues','not reading the room','misunderstanding tone','body language confusion','taking things literally','social confusion','not getting hints','misreading people'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 7, TRUE, '1.0.0'),
('SOC_008', 'behavioral', 'social', 'Intense but unstable relationships', 'A pattern of relationships that quickly become very close and intense, but are marked by frequent conflict, idealization, and devaluation.', ARRAY['love-hate relationships','intense then cold','relationship turbulence','push-pull dynamic','stormy relationships','cant keep stable relationships','extreme attachment','hot and cold with people'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 8, TRUE, '1.0.0');

-- ─── New ANX (Anxiety) additions ─────────────────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('ANX_009', 'emotional', 'anxiety_fear', 'Separation anxiety', 'Excessive fear or anxiety about being separated from attachment figures, leading to reluctance to leave home, go to work, or be alone.', ARRAY['cant be away from loved ones','scared when alone','fear of separation','needing someone close','panic when apart','wont leave home','attachment anxiety','fear of being alone'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 9, TRUE, '1.0.0'),
('ANX_010', 'emotional', 'anxiety_fear', 'Fear of contamination or germs', 'Persistent, excessive fear of becoming contaminated by germs, dirt, or environmental substances, leading to avoidance or washing rituals.', ARRAY['germ fear','contamination fear','dirty feeling','washing hands too much','avoiding touching things','clean obsession','disgust sensitivity','fear of getting sick from germs'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 10, TRUE, '1.0.0');

-- ─── New MOD (Mood) additions ────────────────────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('MOD_009', 'emotional', 'mood', 'Intense yearning or longing for deceased', 'A deep, persistent pining or longing for someone who has died that dominates daily life and feels different from normal grief.', ARRAY['missing someone deeply','pining','yearning for deceased','grief that wont end','longing for the dead','preoccupied with loss','consumed by grief','aching for them'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 9, TRUE, '1.0.0');

-- ─── New COG (Cognition) additions ───────────────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('COG_011', 'cognitive', 'cognition', 'Disorganized thinking or speech', 'Difficulty organizing thoughts in a logical sequence, resulting in speech that may be tangential, hard to follow, or incoherent.', ARRAY['confused speech','jumping between topics','tangential thinking','cant organize thoughts','word salad','loose associations','incoherent','thought disorder'], TRUE, TRUE, TRUE, FALSE, NULL, 7, 'URGENT', 11, TRUE, '1.0.0');

-- ─── New ACT (Activity Level) additions ──────────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('ACT_007', 'behavioral', 'activity_level', 'Repetitive behaviors or restricted interests', 'A strong, focused pattern of repetitive movements, insistence on sameness, or highly restricted interests that may interfere with flexibility.', ARRAY['repetitive movements','stimming','special interests','insistence on routine','same thing over and over','rigid behavior','narrow focus','ritualistic behavior'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 7, TRUE, '1.0.0'),
('ACT_008', 'behavioral', 'activity_level', 'Sensory sensitivity', 'Heightened or diminished reactions to sensory input such as sounds, textures, lights, or smells that cause distress or avoidance.', ARRAY['sensitive to noise','light sensitivity','texture aversion','overwhelmed by stimuli','sensory overload','cant stand loud sounds','tactile defensiveness','smell sensitivity'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 8, TRUE, '1.0.0');

-- ─── New ENR (Energy) addition ───────────────────────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('ENR_006', 'physical', 'energy', 'Seasonal energy and mood changes', 'A noticeable pattern of lower energy, increased sleep need, and mood changes that reliably occurs during specific seasons, typically fall/winter.', ARRAY['winter blues','seasonal pattern','dark months','less energy in winter','hibernation mode','seasonal changes','worse in winter','light-dependent mood'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 6, TRUE, '1.0.0');

COMMIT;
