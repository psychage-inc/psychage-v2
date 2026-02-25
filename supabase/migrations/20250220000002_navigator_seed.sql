-- ============================================================================
-- Symptom Navigator — Seed Data
-- Migration: 002 — Populate all navigator knowledge-base tables
--
-- This inserts the complete clinical knowledge base:
--   82 symptoms across 4 domains and 12 categories
--   16 condition profiles with DSM-5 / ICD-11 references
--   257 condition-symptom mappings with weights and roles
--   Condition red flags
--   29 crisis resources across 11 regions
--   Default matching configuration
--
-- IMPORTANT:
--   All user-facing text is educational and non-diagnostic.
--   Language avoids "you have" / "you are diagnosed" phrasing.
--   Clinical notes reference DSM-5 or ICD-11 codes for professional context.
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. SYMPTOMS  (82 total)
-- ============================================================================

-- ─── MOD (Mood) — emotional domain, 8 symptoms ──────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('MOD_001', 'emotional', 'mood', 'Persistent sadness', 'A deep, lasting feeling of sadness or low mood that persists beyond normal ups and downs.', ARRAY['feeling down','depressed mood','unhappy','blue','melancholy','gloom','sorrow','despondent'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 1, TRUE, '1.0.0'),
('MOD_002', 'emotional', 'mood', 'Hopelessness', 'A pervasive sense that things will not improve, or that the future holds nothing positive.', ARRAY['no hope','despair','bleak outlook','pessimism','futility','pointlessness','giving up','defeated'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 2, TRUE, '1.0.0'),
('MOD_003', 'emotional', 'mood', 'Loss of interest or pleasure', 'A noticeable reduction in enjoyment or motivation for activities that were once engaging.', ARRAY['anhedonia','lost interest','nothing is fun','no motivation','boredom','apathy','disinterest','lack of pleasure'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 3, TRUE, '1.0.0'),
('MOD_004', 'emotional', 'mood', 'Emotional numbness', 'Feeling emotionally flat or unable to experience a normal range of feelings.', ARRAY['numb','flat affect','no feelings','emotionally shut down','detached emotions','empty emotions','blunted affect','deadened'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 4, TRUE, '1.0.0'),
('MOD_005', 'emotional', 'mood', 'Unexplained crying', 'Episodes of crying that seem disproportionate to the situation or occur without a clear trigger.', ARRAY['crying spells','tearfulness','sudden crying','weeping','crying for no reason','watery eyes','uncontrollable tears','breaking down'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 5, TRUE, '1.0.0'),
('MOD_006', 'emotional', 'mood', 'Guilt or excessive self-blame', 'Persistent feelings of guilt or a tendency to blame oneself disproportionately for negative events.', ARRAY['self-blame','feeling guilty','remorse','shame about actions','regret','self-reproach','fault-finding','blaming myself'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 6, TRUE, '1.0.0'),
('MOD_007', 'emotional', 'mood', 'Low self-esteem or worthlessness', 'A persistent belief that one is inadequate, unworthy, or has little value.', ARRAY['worthlessness','not good enough','inferior','low confidence','self-doubt','feeling useless','inadequacy','undeserving'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 7, TRUE, '1.0.0'),
('MOD_008', 'emotional', 'mood', 'Emptiness or feeling hollow', 'A chronic inner void or hollowness that feels different from sadness.', ARRAY['void','hollow','inner emptiness','blank inside','feeling vacant','nothing inside','empty shell','emotional vacuum'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 8, TRUE, '1.0.0');

-- ─── ANX (Anxiety/Fear) — emotional domain, 8 symptoms ─────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('ANX_001', 'emotional', 'anxiety_fear', 'Excessive worry', 'Persistent, hard-to-control worry about multiple aspects of daily life that feels disproportionate to the actual situation.', ARRAY['worrying too much','anxious thoughts','overthinking','apprehension','dread','fretting','nervous anticipation','constant concern'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 1, TRUE, '1.0.0'),
('ANX_002', 'emotional', 'anxiety_fear', 'Panic attacks', 'Sudden, intense episodes of fear accompanied by physical symptoms such as racing heart, sweating, or difficulty breathing.', ARRAY['panic','anxiety attack','sudden fear','terror episodes','overwhelming dread','fight or flight','intense anxiety wave','acute panic'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 2, TRUE, '1.0.0'),
('ANX_003', 'emotional', 'anxiety_fear', 'Fear of specific situations or objects', 'An intense, irrational fear triggered by a particular object, place, or situation that leads to avoidance.', ARRAY['phobia','specific fear','irrational fear','avoidance of triggers','scared of','terrified of','dreading specific thing','phobic reaction'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 3, TRUE, '1.0.0'),
('ANX_004', 'emotional', 'anxiety_fear', 'Social anxiety or fear of judgment', 'Intense fear or discomfort in social situations driven by worry about being evaluated or judged negatively.', ARRAY['social fear','fear of embarrassment','performance anxiety','self-conscious','shy','fear of rejection','stage fright','social phobia'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 4, TRUE, '1.0.0'),
('ANX_005', 'emotional', 'anxiety_fear', 'Feeling on edge or hypervigilance', 'A heightened state of alertness or watchfulness, as if danger could appear at any moment.', ARRAY['on guard','hyperalert','startle response','jumpy','tense','keyed up','scanning for danger','wired'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 5, TRUE, '1.0.0'),
('ANX_006', 'emotional', 'anxiety_fear', 'Fear of losing control', 'A distressing worry about losing control over one''s actions, emotions, or mental state.', ARRAY['losing it','going crazy','losing my mind','out of control','fear of breakdown','snapping','unraveling','falling apart'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 6, TRUE, '1.0.0'),
('ANX_007', 'emotional', 'anxiety_fear', 'Catastrophic thinking', 'A pattern of automatically imagining the worst possible outcome in any situation.', ARRAY['worst-case thinking','doom thinking','expecting disaster','what-if spirals','doomsday thoughts','expecting the worst','magnifying','awfulizing'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 7, TRUE, '1.0.0'),
('ANX_008', 'emotional', 'anxiety_fear', 'Feeling overwhelmed', 'A sense of being unable to cope with the demands or pressures of daily life.', ARRAY['too much','can''t cope','drowning','overloaded','stressed out','at breaking point','swamped','burdened'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 8, TRUE, '1.0.0');

-- ─── EMR (Emotional Regulation) — emotional domain, 6 symptoms ─────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('EMR_001', 'emotional', 'emotional_regulation', 'Mood swings', 'Rapid or unpredictable shifts between emotional states, such as going from happy to angry or sad without clear cause.', ARRAY['emotional ups and downs','roller coaster moods','unpredictable emotions','fluctuating mood','labile mood','rapid mood changes','hot and cold','emotional instability'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 1, TRUE, '1.0.0'),
('EMR_002', 'emotional', 'emotional_regulation', 'Irritability or anger', 'A heightened tendency toward frustration, annoyance, or anger that may seem disproportionate to the situation.', ARRAY['short temper','easily annoyed','agitation','snapping','rage','frustrated','cranky','hostile'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 2, TRUE, '1.0.0'),
('EMR_003', 'emotional', 'emotional_regulation', 'Emotional flashbacks', 'Sudden, intense re-experiencing of emotions from a past distressing event, sometimes without a clear visual memory.', ARRAY['trauma flashback','emotional re-experiencing','triggered feelings','reliving emotions','past feelings resurfacing','emotional time travel','overwhelming memories','trauma response'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 3, TRUE, '1.0.0'),
('EMR_004', 'emotional', 'emotional_regulation', 'Euphoria or unusually elevated mood', 'An abnormally elevated, expansive, or energized mood that feels distinctly different from normal happiness.', ARRAY['feeling high','elevated mood','grandiosity','on top of the world','manic energy','invincible feeling','extreme happiness','elation'], TRUE, TRUE, TRUE, FALSE, NULL, 7, 'WATCH', 4, TRUE, '1.0.0'),
('EMR_005', 'emotional', 'emotional_regulation', 'Feeling detached or depersonalization', 'A sense of being disconnected from one''s own body, thoughts, or identity, as if observing oneself from the outside.', ARRAY['out of body','unreal self','watching myself','disconnected from self','robot-like','autopilot','not real','floating away'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 5, TRUE, '1.0.0'),
('EMR_006', 'emotional', 'emotional_regulation', 'Shame', 'A deep, painful feeling of being fundamentally flawed or defective as a person.', ARRAY['deep shame','feeling defective','self-loathing','humiliation','disgrace','feeling exposed','mortification','unworthiness'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 6, TRUE, '1.0.0');

-- ─── BDY (Body Sensations) — physical domain, 10 symptoms ──────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('BDY_001', 'physical', 'body_sensations', 'Muscle tension or body aches', 'Persistent tightness, stiffness, or pain in muscles that may worsen during periods of stress.', ARRAY['tight muscles','sore body','stiff neck','back pain','body tension','clenched jaw','tense shoulders','aching muscles'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 1, TRUE, '1.0.0'),
('BDY_002', 'physical', 'body_sensations', 'Headaches', 'Recurring head pain, including tension-type headaches or migraines, that may be connected to emotional distress.', ARRAY['head pain','migraine','tension headache','pounding head','throbbing head','pressure in head','head pressure','splitting headache'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 2, TRUE, '1.0.0'),
('BDY_003', 'physical', 'body_sensations', 'Heart palpitations or racing heart', 'A noticeable awareness of the heartbeat, which may feel like it is pounding, racing, or skipping beats.', ARRAY['racing heart','pounding heart','heart fluttering','rapid heartbeat','heart skipping','tachycardia','chest pounding','heart racing'], TRUE, TRUE, TRUE, FALSE, NULL, 9, 'URGENT', 3, TRUE, '1.0.0'),
('BDY_004', 'physical', 'body_sensations', 'Chest tightness', 'A sensation of pressure, constriction, or discomfort in the chest area, often linked to anxiety.', ARRAY['tight chest','chest pressure','chest pain','heavy chest','constricted chest','chest discomfort','band around chest','chest squeezing'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 4, TRUE, '1.0.0'),
('BDY_005', 'physical', 'body_sensations', 'Shortness of breath', 'Difficulty breathing or a feeling of not getting enough air, often occurring during periods of anxiety or panic.', ARRAY['can''t breathe','breathlessness','air hunger','gasping','labored breathing','difficulty breathing','suffocating feeling','hyperventilation'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 5, TRUE, '1.0.0'),
('BDY_006', 'physical', 'body_sensations', 'Dizziness or lightheadedness', 'A sensation of unsteadiness, faintness, or feeling as though the room is spinning.', ARRAY['dizzy','lightheaded','faint','vertigo','unsteady','woozy','off balance','spinning sensation'], TRUE, TRUE, TRUE, FALSE, NULL, 9, 'URGENT', 6, TRUE, '1.0.0'),
('BDY_007', 'physical', 'body_sensations', 'Trembling or shaking', 'Involuntary shaking or trembling in the hands, legs, or entire body, often triggered by anxiety or fear.', ARRAY['shaky','tremors','shivering','quivering','vibrating','unsteady hands','nervous shaking','quaking'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 7, TRUE, '1.0.0'),
('BDY_008', 'physical', 'body_sensations', 'Excessive sweating', 'Sweating that is noticeably more than normal and may occur without physical exertion or heat.', ARRAY['sweaty palms','night sweats','cold sweat','perspiration','clammy hands','drenched in sweat','hot flashes','stress sweating'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 8, TRUE, '1.0.0'),
('BDY_009', 'physical', 'body_sensations', 'Nausea or stomach problems', 'Gastrointestinal discomfort such as nausea, stomach cramps, or digestive issues that may be connected to emotional states.', ARRAY['upset stomach','nauseous','butterflies in stomach','stomach cramps','digestive issues','queasy','gut problems','nervous stomach'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 9, TRUE, '1.0.0'),
('BDY_010', 'physical', 'body_sensations', 'Chronic pain without clear cause', 'Ongoing physical pain in various parts of the body that does not have a clear medical explanation.', ARRAY['unexplained pain','psychosomatic pain','persistent ache','functional pain','pain with no cause','mysterious pain','somatic pain','widespread pain'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 10, TRUE, '1.0.0');

-- ─── SLP (Sleep) — physical domain, 5 symptoms ─────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('SLP_001', 'physical', 'sleep', 'Insomnia or difficulty falling asleep', 'Trouble initiating sleep, lying awake for extended periods before falling asleep.', ARRAY['can''t sleep','trouble sleeping','lying awake','tossing and turning','sleep onset difficulty','wide awake at night','unable to fall asleep','wired at bedtime'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 1, TRUE, '1.0.0'),
('SLP_002', 'physical', 'sleep', 'Oversleeping or excessive sleep', 'Sleeping significantly more than usual or feeling an overwhelming need to sleep during the day.', ARRAY['hypersomnia','sleeping too much','always tired','excessive napping','can''t get out of bed','sleeping all day','prolonged sleep','oversleeping'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 2, TRUE, '1.0.0'),
('SLP_003', 'physical', 'sleep', 'Disrupted sleep or frequent waking', 'Waking up multiple times during the night or having fragmented, interrupted sleep.', ARRAY['broken sleep','waking up at night','interrupted sleep','restless night','fragmented sleep','light sleep','middle-of-night waking','sleep maintenance issues'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 3, TRUE, '1.0.0'),
('SLP_004', 'physical', 'sleep', 'Nightmares or night terrors', 'Disturbing, vivid dreams or episodes of intense fear during sleep that may cause waking.', ARRAY['bad dreams','disturbing dreams','sleep terrors','vivid nightmares','waking up screaming','frightening dreams','trauma dreams','dream disturbance'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 4, TRUE, '1.0.0'),
('SLP_005', 'physical', 'sleep', 'Restless or unrefreshing sleep', 'Sleep that does not feel restorative, leaving a person feeling tired despite having slept.', ARRAY['poor sleep quality','tired after sleeping','unrestorative sleep','not rested','fitful sleep','waking up exhausted','sleep not helping','groggy mornings'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 5, TRUE, '1.0.0');

-- ─── APT (Appetite/Weight) — physical domain, 4 symptoms ───────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('APT_001', 'physical', 'appetite_weight', 'Loss of appetite', 'A noticeable decrease in hunger or desire to eat, sometimes leading to skipped meals or weight loss.', ARRAY['not hungry','no appetite','skipping meals','food aversion','eating less','lost interest in food','forgetting to eat','reduced hunger'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 1, TRUE, '1.0.0'),
('APT_002', 'physical', 'appetite_weight', 'Increased appetite or overeating', 'A heightened desire to eat, often involving larger portions or more frequent eating, sometimes as a way of coping.', ARRAY['eating too much','comfort eating','binge eating','always hungry','stress eating','emotional eating','cravings','overeating'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 2, TRUE, '1.0.0'),
('APT_003', 'physical', 'appetite_weight', 'Unexplained weight changes', 'Significant weight gain or loss that occurs without intentional dietary changes or exercise.', ARRAY['weight gain','weight loss','body changes','fluctuating weight','sudden weight change','clothes don''t fit','unintentional weight change','body weight shift'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 3, TRUE, '1.0.0'),
('APT_004', 'physical', 'appetite_weight', 'Distorted relationship with food', 'An unhealthy preoccupation with food, eating, calories, or body shape that causes distress.', ARRAY['food obsession','calorie counting','food guilt','eating disorder thoughts','diet fixation','fear of food','food rules','orthorexia'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 4, TRUE, '1.0.0');

-- ─── ENR (Energy) — physical domain, 5 symptoms ────────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('ENR_001', 'physical', 'energy', 'Fatigue or low energy', 'A persistent feeling of tiredness or lack of energy that is not fully relieved by rest or sleep.', ARRAY['exhaustion','no energy','drained','worn out','lethargic','wiped out','sluggish','depleted'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 1, TRUE, '1.0.0'),
('ENR_002', 'physical', 'energy', 'Restlessness or inability to sit still', 'A feeling of being driven to move, fidget, or pace, making it difficult to remain calm or seated.', ARRAY['fidgety','can''t sit still','agitated','pacing','restless legs','hyperactive','wired','antsy'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 2, TRUE, '1.0.0'),
('ENR_003', 'physical', 'energy', 'Psychomotor slowing', 'A visible slowing of physical movements, reactions, or speech that others may notice.', ARRAY['slowed down','moving slowly','slow reactions','heavy body','sluggish movements','weighted down','dragging','leaden feeling'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 3, TRUE, '1.0.0'),
('ENR_004', 'physical', 'energy', 'Changes in libido', 'A noticeable increase or decrease in sexual desire or interest that feels different from one''s baseline.', ARRAY['low sex drive','high sex drive','loss of desire','sexual changes','intimacy issues','no interest in sex','libido changes','sexual dysfunction'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 4, TRUE, '1.0.0'),
('ENR_005', 'physical', 'energy', 'Physical exhaustion', 'A deep bodily tiredness that goes beyond normal fatigue and may feel like the body simply cannot function.', ARRAY['body exhaustion','physically drained','bone tired','body shutdown','complete fatigue','somatic exhaustion','total depletion','bodily fatigue'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 5, TRUE, '1.0.0');

-- ─── COG (Cognition) — cognitive domain, 10 symptoms ────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('COG_001', 'cognitive', 'cognition', 'Difficulty concentrating', 'Trouble sustaining attention, staying focused on tasks, or following conversations and written material.', ARRAY['can''t focus','distracted','poor concentration','zoning out','attention problems','mind wandering','unfocused','scattered'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 1, TRUE, '1.0.0'),
('COG_002', 'cognitive', 'cognition', 'Racing thoughts', 'A rapid, continuous flow of thoughts that feels uncontrollable, making it hard to focus or relax.', ARRAY['thoughts won''t stop','rapid thinking','mind racing','thought spiral','mental chatter','busy mind','thought overload','whirlwind of thoughts'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 2, TRUE, '1.0.0'),
('COG_003', 'cognitive', 'cognition', 'Brain fog or mental confusion', 'A sense of mental cloudiness, reduced clarity, or difficulty processing information.', ARRAY['foggy thinking','mental haze','confused','cloudy mind','fuzzy thinking','spaced out','cognitive haze','unclear thinking'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 3, TRUE, '1.0.0'),
('COG_004', 'cognitive', 'cognition', 'Memory problems', 'Difficulty recalling recent events, conversations, or information that would normally be remembered.', ARRAY['forgetful','memory loss','can''t remember','blanking out','poor recall','short-term memory issues','absent-minded','memory lapses'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 4, TRUE, '1.0.0'),
('COG_005', 'cognitive', 'cognition', 'Intrusive or unwanted thoughts', 'Recurring, distressing thoughts or images that enter the mind uninvited and are difficult to dismiss.', ARRAY['unwanted thoughts','obsessive thoughts','stuck thoughts','disturbing images','mental intrusions','thought loops','repetitive thoughts','persistent ideas'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 5, TRUE, '1.0.0'),
('COG_006', 'cognitive', 'cognition', 'Indecisiveness', 'Difficulty making decisions, even about minor matters, often accompanied by fear of making the wrong choice.', ARRAY['can''t decide','paralyzed by choice','decision fatigue','second-guessing','uncertainty','wavering','analysis paralysis','frozen by options'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 6, TRUE, '1.0.0'),
('COG_007', 'cognitive', 'cognition', 'Negative self-talk or rumination', 'A pattern of repetitive, negative thoughts focused on perceived failures, shortcomings, or problems.', ARRAY['ruminating','negative thinking','mental replay','dwelling on problems','self-criticism loop','overthinking past','beating myself up','stuck in negative thoughts'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 7, TRUE, '1.0.0'),
('COG_008', 'cognitive', 'cognition', 'Thoughts of self-harm', 'Recurring thoughts about intentionally hurting oneself, which may or may not include a specific plan.', ARRAY['self-harm thoughts','hurting myself','cutting thoughts','wanting to hurt myself','self-injury urges','self-destructive thoughts','harming myself','pain-seeking thoughts'], TRUE, TRUE, TRUE, TRUE, 'CRISIS', NULL, NULL, 8, TRUE, '1.0.0'),
('COG_009', 'cognitive', 'cognition', 'Suicidal thoughts', 'Thoughts about ending one''s own life, ranging from passive wishes to active planning.', ARRAY['suicidal ideation','wanting to die','ending it','death wish','not wanting to live','thoughts of suicide','planning suicide','life not worth living'], TRUE, TRUE, TRUE, TRUE, 'CRISIS', NULL, NULL, 9, TRUE, '1.0.0'),
('COG_010', 'cognitive', 'cognition', 'Thoughts of harming others', 'Recurring thoughts about causing harm to other people, which may be distressing and unwanted.', ARRAY['violent thoughts','harm others','aggressive thoughts','homicidal ideation','hurting someone','dangerous thoughts','violent urges','thoughts of violence'], TRUE, TRUE, TRUE, TRUE, 'CRISIS', NULL, NULL, 10, TRUE, '1.0.0');

-- ─── PRC (Perception) — cognitive domain, 6 symptoms ────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('PRC_001', 'cognitive', 'perception', 'Derealization', 'A feeling that the external world is unreal, dreamlike, or distorted, as if looking through a fog or glass.', ARRAY['world feels unreal','dreamlike state','foggy reality','things look strange','surreal surroundings','distorted reality','everything seems fake','alien world'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 1, TRUE, '1.0.0'),
('PRC_002', 'cognitive', 'perception', 'Depersonalization', 'A persistent feeling of being detached from one''s own body, thoughts, or sense of self.', ARRAY['feeling detached from self','out of body','not real','watching myself','robot-like','disconnected from body','identity confusion','self feels strange'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 2, TRUE, '1.0.0'),
('PRC_003', 'cognitive', 'perception', 'Visual disturbances', 'Unusual visual experiences such as seeing spots, light trails, or visual distortions that are not explained by an eye condition.', ARRAY['visual anomalies','seeing things','light sensitivity','visual snow','distorted vision','blurred vision','flashing lights','visual artifacts'], TRUE, TRUE, TRUE, FALSE, NULL, 7, 'URGENT', 3, TRUE, '1.0.0'),
('PRC_004', 'cognitive', 'perception', 'Hearing voices or sounds', 'Hearing sounds, voices, or noises that others do not hear, which may range from vague sounds to clear speech.', ARRAY['auditory hallucinations','hearing things','voices in head','phantom sounds','internal voices','hearing noises','sound distortions','auditory experiences'], TRUE, TRUE, TRUE, TRUE, 'URGENT', NULL, NULL, 4, TRUE, '1.0.0'),
('PRC_005', 'cognitive', 'perception', 'Distorted body image', 'A persistent, inaccurate perception of one''s own body size, shape, or appearance.', ARRAY['body dysmorphia','feeling fat','body dissatisfaction','distorted self-image','ugly feeling','body hatred','wrong body size','appearance obsession'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 5, TRUE, '1.0.0'),
('PRC_006', 'cognitive', 'perception', 'Paranoid thinking', 'A tendency to interpret other people''s actions as deliberately threatening, hostile, or demeaning without sufficient basis.', ARRAY['paranoia','suspicion','distrust','people are against me','conspiracy thinking','feeling watched','everyone is out to get me','hypervigilant suspicion'], TRUE, TRUE, TRUE, FALSE, NULL, 8, 'URGENT', 6, TRUE, '1.0.0');

-- ─── SOC (Social) — behavioral domain, 6 symptoms ──────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('SOC_001', 'behavioral', 'social', 'Social withdrawal or isolation', 'A pattern of pulling away from friends, family, or social activities, preferring to be alone.', ARRAY['isolating','avoiding people','hermit','staying home','no socializing','cutting off friends','becoming reclusive','shutting people out'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 1, TRUE, '1.0.0'),
('SOC_002', 'behavioral', 'social', 'Avoiding social situations', 'Deliberately avoiding events, gatherings, or interactions due to discomfort or anxiety.', ARRAY['skipping events','avoiding crowds','ducking plans','canceling plans','social avoidance','staying away from people','declining invitations','dodging gatherings'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 2, TRUE, '1.0.0'),
('SOC_003', 'behavioral', 'social', 'Difficulty maintaining relationships', 'Ongoing challenges in sustaining close relationships, which may involve conflict, distance, or instability.', ARRAY['relationship problems','pushing people away','trust issues','codependency','unstable relationships','friendship difficulties','interpersonal conflict','connection struggles'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 3, TRUE, '1.0.0'),
('SOC_004', 'behavioral', 'social', 'Reduced speech or communication', 'Speaking noticeably less than usual, giving brief responses, or finding it difficult to express oneself.', ARRAY['quiet','not talking','short answers','withdrawn speech','alogia','minimal communication','hard to express','silent'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 4, TRUE, '1.0.0'),
('SOC_005', 'behavioral', 'social', 'Dependence on others for decisions', 'An excessive reliance on other people to make decisions or provide reassurance about everyday choices.', ARRAY['needing reassurance','can''t decide alone','dependent','clingy','seeking approval','needing validation','relying on others','unable to choose alone'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 5, TRUE, '1.0.0'),
('SOC_006', 'behavioral', 'social', 'Conflict or aggression in relationships', 'A pattern of frequent arguments, hostility, or aggressive behavior within interpersonal relationships.', ARRAY['fighting','arguing','hostile','confrontational','aggressive','verbally abusive','explosive conflicts','relationship tension'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 6, TRUE, '1.0.0');

-- ─── CPG (Coping) — behavioral domain, 8 symptoms ──────────────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('CPG_001', 'behavioral', 'coping', 'Avoidance of triggers or situations', 'Deliberately staying away from places, people, or activities that might bring up distressing feelings or memories.', ARRAY['avoiding triggers','staying away','escape behavior','protective avoidance','trigger avoidance','dodging reminders','steering clear','evasion'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 1, TRUE, '1.0.0'),
('CPG_002', 'behavioral', 'coping', 'Compulsive or ritualistic behaviors', 'Repetitive actions performed according to rigid rules, often to reduce anxiety or prevent a feared outcome.', ARRAY['rituals','compulsions','repetitive behavior','must-do actions','habitual checking','counting','ordering','repeating actions'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 2, TRUE, '1.0.0'),
('CPG_003', 'behavioral', 'coping', 'Substance use to cope', 'Using alcohol, drugs, or other substances as a way to manage emotional pain, stress, or difficult feelings.', ARRAY['drinking to cope','drug use','self-medicating','numbing with substances','alcohol dependence','recreational drugs','substance abuse','chemical coping'], TRUE, TRUE, TRUE, FALSE, NULL, 8, 'URGENT', 3, TRUE, '1.0.0'),
('CPG_004', 'behavioral', 'coping', 'Self-harm behaviors', 'Intentional acts of physically hurting oneself as a way to cope with emotional pain, without suicidal intent.', ARRAY['cutting','self-injury','burning','scratching','hitting self','self-mutilation','hurting myself','non-suicidal self-injury'], TRUE, TRUE, TRUE, TRUE, 'CRISIS', NULL, NULL, 4, TRUE, '1.0.0'),
('CPG_005', 'behavioral', 'coping', 'Binge eating episodes', 'Consuming unusually large amounts of food in a short period, often feeling unable to stop or control the eating.', ARRAY['binge eating','eating a lot','out-of-control eating','food binge','stuffing','gorging','compulsive eating','uncontrolled eating'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 5, TRUE, '1.0.0'),
('CPG_006', 'behavioral', 'coping', 'Restricting food intake', 'Deliberately limiting food consumption well below normal needs, often driven by fears about weight or body shape.', ARRAY['not eating','starving','food restriction','skipping meals','fasting','calorie restriction','eating too little','dietary restriction'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 6, TRUE, '1.0.0'),
('CPG_007', 'behavioral', 'coping', 'Excessive checking or reassurance seeking', 'Repeatedly checking things (locks, appliances, health symptoms) or seeking reassurance from others far beyond what is reasonable.', ARRAY['constant checking','reassurance seeking','double-checking','verification rituals','need for certainty','asking repeatedly','health checking','safety checking'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 7, TRUE, '1.0.0'),
('CPG_008', 'behavioral', 'coping', 'Hoarding behaviors', 'Persistent difficulty discarding possessions regardless of their actual value, leading to clutter that disrupts living spaces.', ARRAY['can''t throw away','collecting things','cluttering','accumulating','saving everything','difficulty discarding','pack rat','excessive collecting'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 8, TRUE, '1.0.0');

-- ─── ACT (Activity Level) — behavioral domain, 6 symptoms ──────────────────

INSERT INTO navigator_symptoms (id, domain, category, name, description, synonyms, ask_duration, ask_severity, ask_frequency, is_red_flag, red_flag_level, severity_red_flag_threshold, severity_red_flag_level, display_order, is_active, version) VALUES
('ACT_001', 'behavioral', 'activity_level', 'Procrastination or avoidance', 'Repeatedly putting off tasks or responsibilities, often due to feeling overwhelmed, anxious, or unmotivated.', ARRAY['putting things off','delaying','avoiding tasks','task avoidance','can''t start','deferring','stalling','dragging feet'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 1, TRUE, '1.0.0'),
('ACT_002', 'behavioral', 'activity_level', 'Neglecting responsibilities', 'Failing to meet obligations at work, school, or home that were previously managed without difficulty.', ARRAY['dropping the ball','forgetting duties','letting things slide','missing deadlines','ignoring tasks','irresponsible','falling behind','abandoning obligations'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 2, TRUE, '1.0.0'),
('ACT_003', 'behavioral', 'activity_level', 'Difficulty maintaining routines', 'Trouble sticking to daily habits, schedules, or structured activities that provide stability.', ARRAY['no routine','inconsistent schedule','chaotic days','can''t stick to plans','erratic schedule','disorganized','unstable habits','routine breakdown'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 3, TRUE, '1.0.0'),
('ACT_004', 'behavioral', 'activity_level', 'Impulsive decisions', 'Acting on sudden urges without considering consequences, such as impulsive spending, quitting jobs, or risky choices.', ARRAY['acting without thinking','snap decisions','reckless choices','spontaneous actions','impulsivity','hasty decisions','knee-jerk reactions','unplanned actions'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 4, TRUE, '1.0.0'),
('ACT_005', 'behavioral', 'activity_level', 'Risk-taking behavior', 'Engaging in activities that carry a higher-than-normal risk of harm, often driven by thrill-seeking or reduced concern for safety.', ARRAY['reckless behavior','thrill seeking','dangerous activities','daredevil','gambling','unsafe choices','living on the edge','adrenaline chasing'], TRUE, TRUE, TRUE, FALSE, NULL, 8, 'WATCH', 5, TRUE, '1.0.0'),
('ACT_006', 'behavioral', 'activity_level', 'Excessive working or perfectionism', 'An unrelenting drive to work, achieve, or meet impossibly high standards, often at the expense of well-being and relationships.', ARRAY['workaholic','perfectionist','overworking','can''t stop working','unrealistic standards','driven to perfection','never good enough','obsessive achievement'], TRUE, TRUE, TRUE, FALSE, NULL, NULL, NULL, 6, TRUE, '1.0.0');


-- ============================================================================
-- 2. CONDITIONS  (16 total)
-- ============================================================================

INSERT INTO navigator_conditions (id, name, full_name, category, description_for_user, minimum_duration, minimum_duration_display, minimum_symptoms_for_relevance, always_recommend_professional, guide_path, coping_path, provider_questions, clinical_notes, is_active, version) VALUES

-- 1. MDE
('MDE', 'Major Depressive Episode', 'Major Depressive Episode', 'mood',
 'A major depressive episode involves a period of persistently low mood or loss of interest that affects daily functioning. Many people experience episodes like this at some point in their lives, and professional support can make a meaningful difference. This information is educational and not a diagnosis.',
 '2_weeks', 'At least 2 weeks', 5, TRUE,
 '/learn/depression', '/tools/mood-journal',
 ARRAY[
   'How long have you been experiencing these feelings of low mood or loss of interest?',
   'Have these symptoms affected your ability to work, study, or maintain relationships?',
   'Have you noticed changes in your sleep, appetite, or energy levels?',
   'Have you had any thoughts of self-harm or suicide?',
   'Is there a history of depression in your family?'
 ],
 'Based on DSM-5 criteria for Major Depressive Disorder (296.xx). Requires at least 5 of 9 criteria for 2+ weeks, with significant distress or functional impairment. Must rule out medical causes and substance effects.',
 TRUE, '1.0.0'),

-- 2. PDD
('PDD', 'Persistent Depressive Disorder', 'Persistent Depressive Disorder (Dysthymia)', 'mood',
 'Persistent depressive disorder describes a long-lasting pattern of low mood that continues for an extended period. While it may feel less intense than a major depressive episode, its chronic nature can significantly affect quality of life. This information is educational and not a diagnosis.',
 '2_years', 'At least 2 years', 3, FALSE,
 '/learn/depression', '/tools/mood-journal',
 ARRAY[
   'How long have you been feeling this low-level sadness or lack of enjoyment?',
   'Have you had periods of feeling better, or has it been fairly continuous?',
   'How do these feelings affect your daily routines and relationships?',
   'Have you tried any treatments or coping strategies in the past?'
 ],
 'Based on DSM-5 criteria for Persistent Depressive Disorder (300.4). Requires depressed mood for most of the day, more days than not, for at least 2 years in adults. Must include 2+ additional criteria.',
 TRUE, '1.0.0'),

-- 3. GAD
('GAD', 'Generalized Anxiety', 'Generalized Anxiety Disorder', 'anxiety',
 'Generalized anxiety involves persistent, excessive worry about a variety of everyday matters that feels difficult to control. Many people experience this pattern, and effective strategies and professional support are available. This information is educational and not a diagnosis.',
 '6_months', 'At least 6 months', 4, FALSE,
 '/learn/anxiety', '/tools/mood-journal',
 ARRAY[
   'What kinds of things do you find yourself worrying about most?',
   'How much of your day is typically spent worrying?',
   'Do you find it difficult to control or stop the worry once it starts?',
   'Have you noticed physical symptoms like muscle tension, restlessness, or trouble sleeping?',
   'How is the worry affecting your daily life and relationships?'
 ],
 'Based on DSM-5 criteria for Generalized Anxiety Disorder (300.02). Requires excessive anxiety and worry occurring more days than not for 6+ months, with difficulty controlling worry and 3+ associated symptoms.',
 TRUE, '1.0.0'),

-- 4. PD
('PD', 'Panic Disorder', 'Panic Disorder', 'anxiety',
 'Panic disorder involves recurring, unexpected episodes of intense fear accompanied by strong physical sensations. These episodes can feel overwhelming, but they are a recognized pattern that responds well to treatment. This information is educational and not a diagnosis.',
 '1_month', 'At least 1 month', 3, FALSE,
 '/learn/anxiety', '/tools/mood-journal',
 ARRAY[
   'Can you describe what happens during one of these intense fear episodes?',
   'Do the episodes come on unexpectedly, or are they triggered by specific situations?',
   'Between episodes, do you worry about having another one?',
   'Have you started avoiding places or situations because of these episodes?'
 ],
 'Based on DSM-5 criteria for Panic Disorder (300.01). Requires recurrent unexpected panic attacks with at least 1 month of persistent concern about additional attacks or maladaptive behavioral change.',
 TRUE, '1.0.0'),

-- 5. SAD
('SAD', 'Social Anxiety', 'Social Anxiety Disorder', 'anxiety',
 'Social anxiety involves an intense fear of social situations where one might be judged, embarrassed, or scrutinized by others. It goes beyond normal shyness and can significantly limit participation in everyday activities. This information is educational and not a diagnosis.',
 '6_months', 'At least 6 months', 3, FALSE,
 '/learn/anxiety', '/tools/mood-journal',
 ARRAY[
   'What social situations cause you the most anxiety?',
   'What are you most afraid might happen in these situations?',
   'Do you avoid social events, speaking up, or meeting new people because of this fear?',
   'How is this affecting your work, school, or personal relationships?'
 ],
 'Based on DSM-5 criteria for Social Anxiety Disorder (300.23). Requires marked fear or anxiety about social situations involving possible scrutiny, lasting 6+ months, with avoidance or intense distress.',
 TRUE, '1.0.0'),

-- 6. PTSD
('PTSD', 'PTSD', 'Post-Traumatic Stress Disorder', 'trauma',
 'Post-traumatic stress involves a pattern of symptoms that may develop after experiencing or witnessing a deeply distressing event. These symptoms can include intrusive memories, avoidance, mood changes, and heightened reactivity. Professional support is strongly recommended. This information is educational and not a diagnosis.',
 '1_month', 'At least 1 month', 4, TRUE,
 '/learn/trauma', '/tools/mood-journal',
 ARRAY[
   'Have you experienced or witnessed an event that was deeply distressing or life-threatening?',
   'Do you have unwanted memories, flashbacks, or nightmares about the event?',
   'Do you find yourself avoiding reminders of the event?',
   'Have you noticed changes in your mood, outlook, or how you relate to others since the event?',
   'Do you feel more on edge, easily startled, or have trouble sleeping?'
 ],
 'Based on DSM-5 criteria for PTSD (309.81). Requires exposure to actual or threatened death, serious injury, or sexual violence, with symptoms from each of 4 clusters lasting 1+ month.',
 TRUE, '1.0.0'),

-- 7. OCD
('OCD', 'OCD', 'Obsessive-Compulsive Disorder', 'obsessive_compulsive',
 'Obsessive-compulsive patterns involve persistent unwanted thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) performed to reduce anxiety. These patterns are more common than many realize, and effective treatments exist. This information is educational and not a diagnosis.',
 '2_weeks', 'At least 2 weeks', 2, FALSE,
 '/learn/ocd', '/tools/mood-journal',
 ARRAY[
   'What kinds of unwanted or intrusive thoughts do you experience?',
   'Do you perform any repetitive behaviors or mental rituals to cope with these thoughts?',
   'How much time per day do these thoughts and behaviors take up?',
   'How do these patterns affect your daily life and relationships?'
 ],
 'Based on DSM-5 criteria for OCD (300.3). Requires presence of obsessions, compulsions, or both that are time-consuming (1+ hour/day) or cause significant distress or functional impairment.',
 TRUE, '1.0.0'),

-- 8. BIP
('BIP', 'Bipolar Disorder', 'Bipolar Disorder', 'mood',
 'Bipolar patterns involve distinct episodes of unusually elevated mood and energy (mania or hypomania) that alternate with periods of depression. These mood shifts go beyond normal fluctuations and can significantly affect functioning. Professional evaluation is strongly recommended. This information is educational and not a diagnosis.',
 '1_week', 'At least 1 week', 4, TRUE,
 '/learn/bipolar', '/tools/mood-journal',
 ARRAY[
   'Have you experienced periods of unusually elevated mood, energy, or irritability?',
   'During these elevated periods, did you need less sleep, talk more than usual, or take on many projects?',
   'Have you also experienced periods of depression or low mood?',
   'How long do these mood episodes typically last?',
   'Have these mood changes affected your relationships, work, or finances?'
 ],
 'Based on DSM-5 criteria for Bipolar I/II Disorder (296.xx). Bipolar I requires at least one manic episode (7+ days or hospitalization). Bipolar II requires hypomania (4+ days) and major depression.',
 TRUE, '1.0.0'),

-- 9. ADHD
('ADHD', 'ADHD', 'Attention-Deficit/Hyperactivity Disorder', 'neurodevelopmental',
 'ADHD involves persistent patterns of inattention, hyperactivity, or impulsivity that affect functioning in multiple areas of life. Many people discover these patterns in adulthood, and understanding them can open doors to helpful strategies. This information is educational and not a diagnosis.',
 '6_months', 'At least 6 months', 5, FALSE,
 '/learn/adhd', '/tools/mood-journal',
 ARRAY[
   'Do you find it difficult to sustain attention on tasks, especially ones that require extended focus?',
   'Do you often feel restless, fidgety, or driven to move?',
   'Do you frequently act on impulse or have difficulty waiting your turn?',
   'Have these patterns been present since childhood, or are they more recent?',
   'How do these difficulties affect your work, studies, or relationships?'
 ],
 'Based on DSM-5 criteria for ADHD (314.0x). Requires 6+ symptoms of inattention and/or hyperactivity-impulsivity for 6+ months, with onset before age 12 and impairment in 2+ settings.',
 TRUE, '1.0.0'),

-- 10. BUR
('BUR', 'Burnout', 'Burnout Syndrome', 'stress',
 'Burnout is a state of emotional, physical, and mental exhaustion caused by prolonged and excessive stress. It develops gradually and can affect motivation, sense of purpose, and overall well-being. Recognizing it early can help in finding effective ways to recover. This information is educational and not a diagnosis.',
 '3_months', 'At least 3 months', 3, FALSE,
 '/learn/stress', '/tools/mood-journal',
 ARRAY[
   'Do you feel emotionally drained or exhausted by your work or responsibilities?',
   'Have you noticed a growing sense of detachment or cynicism toward your work?',
   'Do you feel less effective or accomplished in your daily tasks?',
   'How long have you been feeling this way?'
 ],
 'Based on ICD-11 definition of Burnout (QD85), classified under problems associated with employment or unemployment. Characterized by energy depletion, increased mental distance from work, and reduced professional efficacy.',
 TRUE, '1.0.0'),

-- 11. INS
('INS', 'Insomnia', 'Insomnia Disorder', 'sleep',
 'Insomnia disorder involves persistent difficulty with falling asleep, staying asleep, or waking too early, despite having adequate opportunity for sleep. Poor sleep can significantly affect daytime functioning and overall health. This information is educational and not a diagnosis.',
 '3_months', 'At least 3 months', 2, FALSE,
 '/learn/sleep', '/tools/sleep-architect',
 ARRAY[
   'How long does it typically take you to fall asleep?',
   'Do you wake frequently during the night, or too early in the morning?',
   'How does poor sleep affect your daytime energy, mood, or concentration?',
   'Have you tried any sleep strategies or treatments in the past?'
 ],
 'Based on DSM-5 criteria for Insomnia Disorder (780.52). Requires dissatisfaction with sleep quantity or quality with difficulty initiating or maintaining sleep, occurring 3+ nights/week for 3+ months.',
 TRUE, '1.0.0'),

-- 12. BED
('BED', 'Binge Eating Disorder', 'Binge Eating Disorder', 'eating',
 'Binge eating disorder involves recurring episodes of eating unusually large amounts of food in a short period, accompanied by a feeling of loss of control. Many people experience this pattern, and compassionate, effective treatment is available. This information is educational and not a diagnosis.',
 '3_months', 'At least 3 months', 3, FALSE,
 '/learn/eating-disorders', '/tools/mood-journal',
 ARRAY[
   'How often do you eat an unusually large amount of food in a single sitting?',
   'During these episodes, do you feel unable to stop or control your eating?',
   'Do you eat rapidly, eat until uncomfortably full, or eat when not physically hungry?',
   'How do you feel emotionally after these episodes?'
 ],
 'Based on DSM-5 criteria for Binge Eating Disorder (307.51). Requires recurrent episodes of binge eating (at least once/week for 3 months) with marked distress, without regular compensatory behaviors.',
 TRUE, '1.0.0'),

-- 13. AN
('AN', 'Anorexia Nervosa', 'Anorexia Nervosa', 'eating',
 'Anorexia nervosa involves persistent restriction of food intake, an intense fear of gaining weight, and a distorted perception of body weight or shape. Early professional support is important and can make a significant difference. This information is educational and not a diagnosis.',
 '3_months', 'At least 3 months', 3, TRUE,
 '/learn/eating-disorders', '/tools/mood-journal',
 ARRAY[
   'Do you restrict your food intake significantly below what your body needs?',
   'Do you have an intense fear of gaining weight or becoming larger?',
   'Do you feel that your body shape or weight strongly influences how you see yourself?',
   'Have others expressed concern about your eating habits or weight?',
   'Have you noticed any physical effects like dizziness, fatigue, or feeling cold?'
 ],
 'Based on DSM-5 criteria for Anorexia Nervosa (307.1). Requires restriction of energy intake leading to significantly low body weight, intense fear of weight gain, and disturbance in body image.',
 TRUE, '1.0.0'),

-- 14. SUD
('SUD', 'Substance Use Concern', 'Substance Use Concern', 'substance',
 'Substance use concerns describe a pattern where alcohol, drugs, or other substances are used in ways that may be affecting health, relationships, or daily functioning. Many people benefit from exploring these patterns with professional support. This information is educational and not a diagnosis.',
 '1_month', 'At least 1 month', 3, TRUE,
 '/learn/substance-use', '/tools/mood-journal',
 ARRAY[
   'What substances have you been using, and how frequently?',
   'Have you noticed that you need more of the substance to achieve the same effect?',
   'Have you tried to cut down or stop, and found it difficult?',
   'How has substance use affected your relationships, work, or health?',
   'Do you use substances to cope with stress, anxiety, or emotional pain?'
 ],
 'Based on DSM-5 criteria for Substance Use Disorders, generalized framework. Severity is based on number of criteria met: 2-3 mild, 4-5 moderate, 6+ severe. Applies across substance classes.',
 TRUE, '1.0.0'),

-- 15. AGO
('AGO', 'Agoraphobia', 'Agoraphobia', 'anxiety',
 'Agoraphobia involves marked fear or anxiety about situations where escape might be difficult or help unavailable, such as public transportation, open spaces, enclosed places, crowds, or being outside alone. This information is educational and not a diagnosis.',
 '6_months', 'At least 6 months', 2, FALSE,
 '/learn/anxiety', '/tools/mood-journal',
 ARRAY[
   'What specific situations or places cause you the most fear or anxiety?',
   'Do you avoid these situations, or endure them with intense distress?',
   'What do you fear might happen in these situations?',
   'How does this avoidance affect your daily life, work, or relationships?'
 ],
 'Based on DSM-5 criteria for Agoraphobia (300.22). Requires marked fear/anxiety about 2+ of 5 situation types, lasting 6+ months, with active avoidance or need for companion.',
 TRUE, '1.0.0'),

-- 16. ADJ
('ADJ', 'Adjustment Disorder', 'Adjustment Disorder', 'stress',
 'An adjustment disorder describes emotional or behavioral symptoms that develop in response to an identifiable life stressor. The response may feel more intense than expected and can affect daily functioning. With appropriate support, most people find relief. This information is educational and not a diagnosis.',
 '1_month', 'At least 1 month', 2, FALSE,
 '/learn/stress', '/tools/mood-journal',
 ARRAY[
   'Can you identify a specific life event or change that triggered these feelings?',
   'How soon after the event did you start noticing these symptoms?',
   'How are these feelings affecting your work, relationships, or daily routines?',
   'Have you experienced similar reactions to stressful events in the past?'
 ],
 'Based on DSM-5 criteria for Adjustment Disorders (309.x). Requires emotional/behavioral symptoms within 3 months of an identifiable stressor, out of proportion to the stressor, with significant functional impairment.',
 TRUE, '1.0.0');


-- ============================================================================
-- 3. CONDITION–SYMPTOM MAPPINGS  (257 total)
-- ============================================================================

-- ─── MDE — Major Depressive Episode (23 mappings) ───────────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('MDE', 'MOD_001', 3, 'core', 'Depressed mood is one of two gateway criteria for MDE'),
('MDE', 'MOD_002', 3, 'core', 'Hopelessness strongly associated with depressive severity'),
('MDE', 'MOD_003', 3, 'core', 'Anhedonia is one of two gateway criteria for MDE'),
('MDE', 'ENR_001', 3, 'core', 'Fatigue or loss of energy nearly every day'),
('MDE', 'SLP_001', 3, 'core', 'Insomnia is a DSM-5 criterion for MDE');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('MDE', 'MOD_004', 2, 'common', 'Emotional numbness frequently co-occurs with depression'),
('MDE', 'MOD_006', 2, 'common', 'Excessive guilt is a DSM-5 criterion for MDE'),
('MDE', 'MOD_007', 2, 'common', 'Feelings of worthlessness are a DSM-5 criterion for MDE'),
('MDE', 'COG_001', 2, 'common', 'Diminished ability to concentrate is a DSM-5 criterion'),
('MDE', 'SLP_002', 2, 'common', 'Hypersomnia is an alternative sleep criterion for MDE'),
('MDE', 'APT_001', 2, 'common', 'Decreased appetite is a DSM-5 criterion for MDE'),
('MDE', 'APT_002', 2, 'common', 'Increased appetite is an alternative appetite criterion');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('MDE', 'MOD_005', 1, 'associated', 'Crying spells commonly accompany depressed mood'),
('MDE', 'MOD_008', 1, 'associated', 'Feelings of emptiness may characterize depressed mood'),
('MDE', 'ENR_003', 1, 'associated', 'Psychomotor retardation is a DSM-5 criterion'),
('MDE', 'COG_003', 1, 'associated', 'Brain fog frequently accompanies depression'),
('MDE', 'COG_006', 1, 'associated', 'Indecisiveness is a DSM-5 criterion for MDE'),
('MDE', 'COG_007', 1, 'associated', 'Rumination is a cognitive feature of depression'),
('MDE', 'SOC_001', 1, 'associated', 'Social withdrawal is common in depressive episodes'),
('MDE', 'ACT_001', 1, 'associated', 'Procrastination often accompanies low motivation in depression'),
('MDE', 'ENR_004', 1, 'associated', 'Libido changes are common in depression'),
('MDE', 'BDY_002', 1, 'associated', 'Headaches may co-occur with depression'),
('MDE', 'BDY_001', 1, 'associated', 'Somatic complaints including body aches are common');

-- ─── PDD — Persistent Depressive Disorder (15 mappings) ─────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PDD', 'MOD_001', 3, 'core', 'Chronic depressed mood is the defining feature of PDD'),
('PDD', 'MOD_003', 3, 'core', 'Diminished interest is common in persistent depression'),
('PDD', 'ENR_001', 3, 'core', 'Low energy or fatigue is a DSM-5 criterion for PDD');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PDD', 'MOD_007', 2, 'common', 'Low self-esteem is a DSM-5 criterion for PDD'),
('PDD', 'MOD_004', 2, 'common', 'Emotional flatness often develops with chronic depression'),
('PDD', 'SLP_001', 2, 'common', 'Insomnia is a DSM-5 criterion for PDD'),
('PDD', 'SLP_002', 2, 'common', 'Hypersomnia is an alternative sleep criterion for PDD'),
('PDD', 'APT_001', 2, 'common', 'Poor appetite is a DSM-5 criterion for PDD'),
('PDD', 'COG_001', 2, 'common', 'Difficulty concentrating is a DSM-5 criterion for PDD');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PDD', 'MOD_002', 1, 'associated', 'Hopelessness is a DSM-5 criterion for PDD'),
('PDD', 'MOD_008', 1, 'associated', 'Chronic emptiness may characterize persistent depression'),
('PDD', 'COG_006', 1, 'associated', 'Indecisiveness may develop with chronic low mood'),
('PDD', 'COG_007', 1, 'associated', 'Rumination is common in persistent depression'),
('PDD', 'SOC_001', 1, 'associated', 'Gradual social withdrawal often accompanies PDD'),
('PDD', 'ACT_001', 1, 'associated', 'Chronic procrastination may accompany persistent low motivation');

-- ─── GAD — Generalized Anxiety Disorder (18 mappings) ───────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('GAD', 'ANX_001', 3, 'core', 'Excessive worry is the central feature of GAD'),
('GAD', 'ANX_008', 3, 'core', 'Feeling overwhelmed is a hallmark of GAD'),
('GAD', 'EMR_002', 3, 'core', 'Irritability is a DSM-5 criterion for GAD');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('GAD', 'BDY_001', 2, 'common', 'Muscle tension is a DSM-5 criterion for GAD'),
('GAD', 'SLP_001', 2, 'common', 'Sleep disturbance is a DSM-5 criterion for GAD'),
('GAD', 'ENR_002', 2, 'common', 'Restlessness is a DSM-5 criterion for GAD'),
('GAD', 'COG_001', 2, 'common', 'Difficulty concentrating is a DSM-5 criterion for GAD'),
('GAD', 'COG_002', 2, 'common', 'Racing thoughts often accompany excessive worry');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('GAD', 'BDY_002', 1, 'associated', 'Tension headaches commonly accompany GAD'),
('GAD', 'BDY_009', 1, 'associated', 'GI symptoms are common in anxiety disorders'),
('GAD', 'ANX_005', 1, 'associated', 'Hypervigilance may be present in severe GAD'),
('GAD', 'COG_003', 1, 'associated', 'Mental fatigue and brain fog can result from chronic worry'),
('GAD', 'COG_006', 1, 'associated', 'Indecisiveness often accompanies anxiety'),
('GAD', 'SOC_001', 1, 'associated', 'Social withdrawal may develop from chronic anxiety'),
('GAD', 'ACT_001', 1, 'associated', 'Procrastination may result from worry-driven avoidance'),
('GAD', 'ANX_007', 1, 'associated', 'Catastrophic thinking is common in GAD'),
('GAD', 'BDY_003', 1, 'associated', 'Palpitations may accompany anxious arousal'),
('GAD', 'EMR_001', 1, 'associated', 'Mood variability can accompany chronic anxiety');

-- ─── PD — Panic Disorder (14 mappings) ──────────────────────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PD', 'ANX_002', 3, 'core', 'Recurrent panic attacks are the defining feature'),
('PD', 'BDY_003', 3, 'core', 'Palpitations are one of the most common panic symptoms'),
('PD', 'ANX_006', 3, 'core', 'Fear of losing control is a common cognitive panic symptom');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PD', 'BDY_004', 2, 'common', 'Chest discomfort is a DSM-5 panic attack specifier'),
('PD', 'BDY_005', 2, 'common', 'Shortness of breath is a DSM-5 panic attack specifier'),
('PD', 'BDY_006', 2, 'common', 'Dizziness is a DSM-5 panic attack specifier'),
('PD', 'BDY_007', 2, 'common', 'Trembling is a DSM-5 panic attack specifier'),
('PD', 'BDY_008', 2, 'common', 'Sweating is a DSM-5 panic attack specifier');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PD', 'ANX_001', 1, 'associated', 'Anticipatory anxiety about future attacks is common'),
('PD', 'CPG_001', 1, 'associated', 'Avoidance of situations associated with panic may develop'),
('PD', 'SOC_002', 1, 'associated', 'Avoidance of social situations where panic may occur'),
('PD', 'ANX_007', 1, 'associated', 'Catastrophic interpretation of panic symptoms'),
('PD', 'BDY_009', 1, 'associated', 'Nausea is a DSM-5 panic attack specifier'),
('PD', 'COG_001', 1, 'associated', 'Concentration difficulties may follow panic episodes');

-- ─── SAD — Social Anxiety Disorder (14 mappings) ────────────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SAD', 'ANX_004', 3, 'core', 'Fear of social judgment is the central feature of SAD'),
('SAD', 'SOC_002', 3, 'core', 'Avoidance of social situations is a key behavioral marker');
-- Core symptoms (weight 2) — note: specification lists ANX_006 as core/2 for SAD
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SAD', 'ANX_006', 2, 'core', 'Fear of losing control in social settings');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SAD', 'MOD_007', 2, 'common', 'Low self-esteem often co-occurs with social anxiety'),
('SAD', 'EMR_006', 2, 'common', 'Shame about perceived social failures'),
('SAD', 'BDY_008', 2, 'common', 'Visible sweating is a feared physical symptom in SAD'),
('SAD', 'BDY_003', 2, 'common', 'Heart palpitations are common in social anxiety'),
('SAD', 'COG_007', 2, 'common', 'Negative self-talk and post-event rumination');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SAD', 'SOC_001', 1, 'associated', 'Social withdrawal to avoid feared situations'),
('SAD', 'BDY_007', 1, 'associated', 'Trembling may be a feared or experienced physical symptom'),
('SAD', 'BDY_009', 1, 'associated', 'Nausea may occur before or during social situations'),
('SAD', 'CPG_001', 1, 'associated', 'Avoidance is a primary coping mechanism in SAD'),
('SAD', 'MOD_003', 1, 'associated', 'Loss of pleasure in social activities due to anxiety'),
('SAD', 'ANX_001', 1, 'associated', 'Anticipatory worry about upcoming social events');

-- ─── PTSD — Post-Traumatic Stress Disorder (20 mappings) ────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PTSD', 'COG_005', 3, 'core', 'Intrusive memories/thoughts are a Cluster B criterion'),
('PTSD', 'EMR_003', 3, 'core', 'Emotional flashbacks are a Cluster B criterion'),
('PTSD', 'ANX_005', 3, 'core', 'Hypervigilance is a Cluster E arousal criterion'),
('PTSD', 'CPG_001', 3, 'core', 'Avoidance of trauma reminders is a Cluster C criterion');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PTSD', 'SLP_004', 2, 'common', 'Trauma-related nightmares are a Cluster B criterion'),
('PTSD', 'SLP_001', 2, 'common', 'Sleep onset difficulty is a Cluster E criterion'),
('PTSD', 'SLP_003', 2, 'common', 'Fragmented sleep is common in PTSD'),
('PTSD', 'EMR_002', 2, 'common', 'Irritability/anger is a Cluster E criterion'),
('PTSD', 'MOD_004', 2, 'common', 'Emotional numbing is a Cluster D criterion'),
('PTSD', 'COG_004', 2, 'common', 'Dissociative amnesia is a Cluster D criterion');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('PTSD', 'PRC_001', 1, 'associated', 'Derealization may occur as a dissociative response'),
('PTSD', 'PRC_002', 1, 'associated', 'Depersonalization may occur as a dissociative response'),
('PTSD', 'SOC_001', 1, 'associated', 'Social detachment is a Cluster D criterion'),
('PTSD', 'BDY_001', 1, 'associated', 'Chronic muscle tension from sustained hyperarousal'),
('PTSD', 'ENR_001', 1, 'associated', 'Fatigue from chronic hyperarousal state'),
('PTSD', 'COG_001', 1, 'associated', 'Concentration difficulties are a Cluster E criterion'),
('PTSD', 'ACT_002', 1, 'associated', 'Functional impairment may lead to neglected duties'),
('PTSD', 'ANX_002', 1, 'associated', 'Panic attacks may co-occur with PTSD'),
('PTSD', 'BDY_008', 1, 'associated', 'Excessive sweating during trauma responses'),
('PTSD', 'COG_003', 1, 'associated', 'Cognitive fog from chronic stress and sleep disruption');

-- ─── OCD — Obsessive-Compulsive Disorder (13 mappings) ──────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('OCD', 'COG_005', 3, 'core', 'Intrusive, unwanted thoughts are the hallmark obsession'),
('OCD', 'CPG_002', 3, 'core', 'Compulsive rituals performed to neutralize anxiety'),
('OCD', 'CPG_007', 3, 'core', 'Excessive checking is a common compulsion type');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('OCD', 'ANX_001', 2, 'common', 'Anxiety drives the obsession-compulsion cycle'),
('OCD', 'ANX_006', 2, 'common', 'Fear of losing control is common in OCD'),
('OCD', 'COG_007', 2, 'common', 'Rumination often intertwines with obsessive thinking'),
('OCD', 'CPG_001', 2, 'common', 'Avoidance of triggers is common in OCD');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('OCD', 'SLP_001', 1, 'associated', 'Sleep disruption from nighttime rituals or obsessions'),
('OCD', 'ENR_001', 1, 'associated', 'Mental exhaustion from the obsession-compulsion cycle'),
('OCD', 'SOC_001', 1, 'associated', 'Social withdrawal from shame or time spent on rituals'),
('OCD', 'COG_001', 1, 'associated', 'Difficulty concentrating when obsessions are intrusive'),
('OCD', 'CPG_008', 1, 'associated', 'Hoarding may be a related OCD spectrum behavior'),
('OCD', 'ACT_006', 1, 'associated', 'Perfectionism may drive obsessive standards');

-- ─── BIP — Bipolar Disorder (20 mappings) ───────────────────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BIP', 'EMR_001', 3, 'core', 'Distinct mood episodes with marked shifts'),
('BIP', 'EMR_004', 3, 'core', 'Elevated/expansive mood is the hallmark of mania'),
('BIP', 'MOD_001', 3, 'core', 'Depressive episodes are common in bipolar disorder');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BIP', 'SLP_001', 2, 'common', 'Insomnia during depressive episodes'),
('BIP', 'SLP_002', 2, 'common', 'Hypersomnia during depressive phases'),
('BIP', 'COG_002', 2, 'common', 'Racing thoughts are a DSM-5 mania criterion'),
('BIP', 'ENR_002', 2, 'common', 'Psychomotor agitation during manic episodes'),
('BIP', 'ACT_004', 2, 'common', 'Impulsive decisions during manic episodes'),
('BIP', 'ACT_005', 2, 'common', 'Risk-taking behavior is a DSM-5 mania criterion');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BIP', 'MOD_003', 1, 'associated', 'Anhedonia during depressive episodes'),
('BIP', 'ANX_002', 1, 'associated', 'Panic attacks may co-occur with mood episodes'),
('BIP', 'COG_001', 1, 'associated', 'Distractibility is a DSM-5 mania criterion'),
('BIP', 'SOC_003', 1, 'associated', 'Relationship difficulties from mood instability'),
('BIP', 'CPG_003', 1, 'associated', 'Substance use may increase during manic episodes'),
('BIP', 'MOD_008', 1, 'associated', 'Emptiness during depressive phases'),
('BIP', 'ENR_001', 1, 'associated', 'Fatigue during depressive episodes'),
('BIP', 'ACT_006', 1, 'associated', 'Excessive goal-directed activity during mania'),
('BIP', 'COG_003', 1, 'associated', 'Cognitive impairment may persist between episodes'),
('BIP', 'ACT_002', 1, 'associated', 'Neglecting responsibilities during mood episodes'),
('BIP', 'EMR_002', 1, 'associated', 'Irritable mood is an alternative gateway criterion for mania');

-- ─── ADHD — Attention-Deficit/Hyperactivity Disorder (17 mappings) ──────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('ADHD', 'COG_001', 3, 'core', 'Difficulty sustaining attention is a core inattention criterion'),
('ADHD', 'COG_006', 3, 'core', 'Difficulty with decisions due to executive dysfunction'),
('ADHD', 'ACT_004', 3, 'core', 'Impulsivity is a core hyperactive-impulsive criterion');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('ADHD', 'COG_003', 2, 'common', 'Brain fog from executive function challenges'),
('ADHD', 'COG_004', 2, 'common', 'Working memory deficits are common in ADHD'),
('ADHD', 'COG_002', 2, 'common', 'Racing thoughts from cognitive hyperactivity'),
('ADHD', 'ENR_002', 2, 'common', 'Physical restlessness is a hyperactivity criterion'),
('ADHD', 'ACT_001', 2, 'common', 'Procrastination from executive dysfunction'),
('ADHD', 'ACT_003', 2, 'common', 'Difficulty with routines reflects executive challenges');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('ADHD', 'EMR_002', 1, 'associated', 'Emotional dysregulation is common in ADHD'),
('ADHD', 'MOD_007', 1, 'associated', 'Low self-esteem from chronic underperformance'),
('ADHD', 'SOC_003', 1, 'associated', 'Social difficulties from impulsivity and inattention'),
('ADHD', 'ACT_002', 1, 'associated', 'Neglecting responsibilities due to inattention'),
('ADHD', 'ANX_008', 1, 'associated', 'Feeling overwhelmed by tasks and demands'),
('ADHD', 'EMR_001', 1, 'associated', 'Mood variability may accompany ADHD'),
('ADHD', 'SLP_003', 1, 'associated', 'Disrupted sleep is common in ADHD'),
('ADHD', 'CPG_001', 1, 'associated', 'Avoidance of tasks requiring sustained effort');

-- ─── BUR — Burnout Syndrome (18 mappings) ───────────────────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BUR', 'ENR_001', 3, 'core', 'Energy depletion/exhaustion is a core burnout dimension'),
('BUR', 'ENR_005', 3, 'core', 'Physical exhaustion is characteristic of burnout'),
('BUR', 'MOD_003', 3, 'core', 'Mental distance from work reflects depersonalization dimension');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BUR', 'COG_001', 2, 'common', 'Reduced concentration from cognitive exhaustion'),
('BUR', 'COG_003', 2, 'common', 'Brain fog from chronic overload'),
('BUR', 'MOD_004', 2, 'common', 'Emotional numbness as a protective response'),
('BUR', 'SLP_001', 2, 'common', 'Sleep difficulties from chronic stress'),
('BUR', 'EMR_002', 2, 'common', 'Irritability from depleted coping resources');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BUR', 'BDY_002', 1, 'associated', 'Stress headaches are common in burnout'),
('BUR', 'BDY_001', 1, 'associated', 'Muscle tension from chronic stress response'),
('BUR', 'APT_001', 1, 'associated', 'Appetite changes may accompany burnout'),
('BUR', 'SOC_001', 1, 'associated', 'Withdrawal from colleagues and social connections'),
('BUR', 'ACT_002', 1, 'associated', 'Declining performance and neglect of duties'),
('BUR', 'ANX_008', 1, 'associated', 'Feeling overwhelmed by work demands'),
('BUR', 'MOD_007', 1, 'associated', 'Reduced sense of professional efficacy'),
('BUR', 'ACT_006', 1, 'associated', 'Perfectionism may contribute to burnout cycle'),
('BUR', 'MOD_005', 1, 'associated', 'Unexplained crying from emotional exhaustion'),
('BUR', 'COG_007', 1, 'associated', 'Rumination about work failures and demands');

-- ─── INS — Insomnia Disorder (13 mappings) ──────────────────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('INS', 'SLP_001', 3, 'core', 'Difficulty falling asleep is a primary insomnia criterion'),
('INS', 'SLP_003', 3, 'core', 'Frequent waking is a primary insomnia criterion'),
('INS', 'SLP_005', 3, 'core', 'Unrefreshing sleep indicates poor sleep quality');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('INS', 'ENR_001', 2, 'common', 'Daytime fatigue is a key consequence of insomnia'),
('INS', 'COG_001', 2, 'common', 'Impaired concentration from sleep deprivation'),
('INS', 'COG_003', 2, 'common', 'Brain fog resulting from poor sleep'),
('INS', 'EMR_002', 2, 'common', 'Irritability from sleep deprivation');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('INS', 'BDY_002', 1, 'associated', 'Headaches from sleep deprivation'),
('INS', 'ANX_001', 1, 'associated', 'Worry about not sleeping perpetuates insomnia'),
('INS', 'MOD_001', 1, 'associated', 'Low mood frequently co-occurs with insomnia'),
('INS', 'COG_004', 1, 'associated', 'Memory consolidation is impaired by poor sleep'),
('INS', 'ENR_002', 1, 'associated', 'Restlessness may prevent sleep onset'),
('INS', 'BDY_001', 1, 'associated', 'Physical tension may interfere with sleep');

-- ─── BED — Binge Eating Disorder (13 mappings) ─────────────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BED', 'CPG_005', 3, 'core', 'Recurrent binge eating episodes are the defining feature'),
('BED', 'APT_002', 3, 'core', 'Excessive eating is central to BED');
-- Core symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BED', 'ANX_006', 2, 'core', 'Loss of control during eating episodes');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BED', 'MOD_006', 2, 'common', 'Guilt after binge episodes is a diagnostic marker'),
('BED', 'EMR_006', 2, 'common', 'Shame about eating behavior'),
('BED', 'PRC_005', 2, 'common', 'Body image distortion commonly accompanies BED'),
('BED', 'APT_003', 2, 'common', 'Weight changes from binge eating patterns');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('BED', 'MOD_001', 1, 'associated', 'Depressed mood frequently co-occurs with BED'),
('BED', 'MOD_007', 1, 'associated', 'Low self-worth related to body and eating'),
('BED', 'SOC_001', 1, 'associated', 'Social withdrawal due to shame about eating'),
('BED', 'CPG_001', 1, 'associated', 'Avoidance of situations involving food or eating with others'),
('BED', 'APT_004', 1, 'associated', 'Distorted relationship with food underlies BED'),
('BED', 'MOD_008', 1, 'associated', 'Emptiness may trigger binge episodes');

-- ─── AN — Anorexia Nervosa (14 mappings) ────────────────────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('AN', 'CPG_006', 3, 'core', 'Food restriction is the defining behavioral feature'),
('AN', 'PRC_005', 3, 'core', 'Distorted body image is a DSM-5 criterion'),
('AN', 'APT_001', 3, 'core', 'Significantly reduced food intake');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('AN', 'APT_003', 2, 'common', 'Weight loss from food restriction'),
('AN', 'ANX_001', 2, 'common', 'Intense anxiety around food and weight'),
('AN', 'ACT_006', 2, 'common', 'Perfectionism often underlies anorexia'),
('AN', 'MOD_006', 2, 'common', 'Guilt around eating or perceived dietary failures');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('AN', 'ENR_001', 1, 'associated', 'Fatigue from caloric deficit'),
('AN', 'BDY_006', 1, 'associated', 'Dizziness from malnutrition'),
('AN', 'SLP_001', 1, 'associated', 'Sleep disruption from hunger and anxiety'),
('AN', 'EMR_006', 1, 'associated', 'Shame about body or eating behavior'),
('AN', 'SOC_001', 1, 'associated', 'Withdrawal from social eating situations'),
('AN', 'MOD_007', 1, 'associated', 'Self-worth excessively tied to body shape/weight'),
('AN', 'COG_005', 1, 'associated', 'Intrusive thoughts about food, calories, and body');

-- ─── SUD — Substance Use Concern (15 mappings) ─────────────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SUD', 'CPG_003', 3, 'core', 'Substance use as primary coping mechanism'),
('SUD', 'ACT_004', 3, 'core', 'Impulsive use despite known consequences');
-- Core symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SUD', 'ANX_006', 2, 'core', 'Fear of losing control over substance use');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SUD', 'SOC_003', 2, 'common', 'Relationship problems from substance use'),
('SUD', 'ACT_002', 2, 'common', 'Neglecting responsibilities due to substance use'),
('SUD', 'SLP_001', 2, 'common', 'Sleep disruption from substance effects'),
('SUD', 'MOD_001', 2, 'common', 'Depressed mood may drive or result from substance use'),
('SUD', 'EMR_002', 2, 'common', 'Irritability during withdrawal or between use');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('SUD', 'COG_004', 1, 'associated', 'Memory impairment from substance effects'),
('SUD', 'COG_001', 1, 'associated', 'Cognitive impairment from chronic use'),
('SUD', 'BDY_009', 1, 'associated', 'GI symptoms from substance use or withdrawal'),
('SUD', 'ENR_001', 1, 'associated', 'Fatigue from substance effects on the body'),
('SUD', 'MOD_006', 1, 'associated', 'Guilt about substance use behaviors'),
('SUD', 'ACT_005', 1, 'associated', 'Risk-taking behavior while under the influence'),
('SUD', 'SOC_001', 1, 'associated', 'Social isolation from shame or lifestyle changes');

-- ─── AGO — Agoraphobia (13 mappings) ────────────────────────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('AGO', 'ANX_003', 3, 'core', 'Fear of specific situations is the defining feature'),
('AGO', 'CPG_001', 3, 'core', 'Active avoidance of feared situations');
-- Core symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('AGO', 'ANX_002', 2, 'core', 'Panic attacks may occur in feared situations');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('AGO', 'ANX_006', 2, 'common', 'Fear of losing control or being unable to escape'),
('AGO', 'SOC_002', 2, 'common', 'Avoiding social situations that involve feared places'),
('AGO', 'BDY_003', 2, 'common', 'Palpitations when confronting feared situations'),
('AGO', 'BDY_005', 2, 'common', 'Shortness of breath in feared environments');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('AGO', 'SOC_001', 1, 'associated', 'Increasing isolation from avoidance patterns'),
('AGO', 'ANX_001', 1, 'associated', 'Anticipatory worry about leaving safe environments'),
('AGO', 'MOD_002', 1, 'associated', 'Hopelessness about ever overcoming the avoidance'),
('AGO', 'ENR_001', 1, 'associated', 'Fatigue from chronic anxiety and avoidance'),
('AGO', 'COG_007', 1, 'associated', 'Rumination about feared scenarios'),
('AGO', 'BDY_006', 1, 'associated', 'Dizziness when entering feared situations');

-- ─── ADJ — Adjustment Disorder (17 mappings) ───────────────────────────────
-- Core symptoms (weight 3)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('ADJ', 'ANX_008', 3, 'core', 'Feeling overwhelmed by a life stressor'),
('ADJ', 'MOD_001', 3, 'core', 'Low mood in response to identifiable stressor');
-- Common symptoms (weight 2)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('ADJ', 'ANX_001', 2, 'common', 'Worry about the stressor and its consequences'),
('ADJ', 'EMR_002', 2, 'common', 'Irritability as a stress response'),
('ADJ', 'SLP_001', 2, 'common', 'Sleep disruption from stress'),
('ADJ', 'COG_001', 2, 'common', 'Difficulty concentrating due to preoccupation with stressor'),
('ADJ', 'SOC_001', 2, 'common', 'Withdrawal from usual social activities');
-- Associated symptoms (weight 1)
INSERT INTO navigator_condition_symptoms (condition_id, symptom_id, weight, role, clinical_note) VALUES
('ADJ', 'MOD_003', 1, 'associated', 'Reduced interest in activities as a stress response'),
('ADJ', 'ENR_001', 1, 'associated', 'Fatigue from the emotional burden of adjustment'),
('ADJ', 'MOD_005', 1, 'associated', 'Crying in response to the stressor'),
('ADJ', 'ACT_001', 1, 'associated', 'Procrastination from feeling overwhelmed'),
('ADJ', 'BDY_001', 1, 'associated', 'Physical tension from stress response'),
('ADJ', 'SOC_003', 1, 'associated', 'Strain on relationships during adjustment'),
('ADJ', 'CPG_001', 1, 'associated', 'Avoidance of stressor reminders'),
('ADJ', 'COG_006', 1, 'associated', 'Difficulty making decisions under stress'),
('ADJ', 'MOD_004', 1, 'associated', 'Emotional numbing as a protective response'),
('ADJ', 'BDY_002', 1, 'associated', 'Stress headaches during adjustment period');


-- ============================================================================
-- 4. CONDITION RED FLAGS
-- ============================================================================

INSERT INTO navigator_condition_red_flags (condition_id, symptom_id) VALUES
-- MDE red flags
('MDE', 'COG_008'),
('MDE', 'COG_009'),
-- PDD red flags
('PDD', 'COG_008'),
('PDD', 'COG_009'),
-- BIP red flags
('BIP', 'COG_008'),
('BIP', 'COG_009');


-- ============================================================================
-- 5. CRISIS RESOURCES  (29 entries across 11 regions)
-- ============================================================================

-- ─── US — United States ─────────────────────────────────────────────────────

INSERT INTO navigator_crisis_resources (region_code, name, type, phone, text_instruction, url, email, description, hours, languages, priority, condition_specific, is_active, last_verified) VALUES
('US', '988 Suicide & Crisis Lifeline', 'hotline', '988', 'Call or text 988', 'https://988lifeline.org', NULL,
 'Free, confidential support for people in suicidal crisis or emotional distress. Available 24/7 across the United States.',
 '24/7', ARRAY['English','Spanish'], 1, ARRAY['MDE','PDD','BIP','PTSD','SUD'], TRUE, NOW()),

('US', 'Crisis Text Line', 'text', NULL, 'Text HOME to 741741', 'https://www.crisistextline.org', NULL,
 'Free, 24/7 text-based crisis support. Trained crisis counselors available via text message.',
 '24/7', ARRAY['English','Spanish'], 2, NULL, TRUE, NOW()),

('US', 'SAMHSA National Helpline', 'hotline', '1-800-662-4357', NULL, 'https://www.samhsa.gov/find-help/national-helpline', NULL,
 'Free, confidential treatment referral and information service for substance use and mental health disorders.',
 '24/7', ARRAY['English','Spanish'], 3, ARRAY['SUD'], TRUE, NOW()),

('US', 'NEDA Helpline', 'hotline', '1-800-931-2237', 'Text NEDA to 741741', 'https://www.nationaleatingdisorders.org/help-support/contact-helpline', NULL,
 'Support, resources, and treatment options for eating disorders and body image concerns.',
 'Mon-Thu 11am-9pm ET, Fri 11am-5pm ET', ARRAY['English'], 4, ARRAY['BED','AN'], TRUE, NOW());

-- ─── GB — United Kingdom ────────────────────────────────────────────────────

INSERT INTO navigator_crisis_resources (region_code, name, type, phone, text_instruction, url, email, description, hours, languages, priority, condition_specific, is_active, last_verified) VALUES
('GB', 'Samaritans', 'hotline', '116 123', NULL, 'https://www.samaritans.org', 'jo@samaritans.org',
 'Emotional support for anyone in distress, struggling to cope, or at risk of suicide. Free to call from any phone.',
 '24/7', ARRAY['English','Welsh'], 1, NULL, TRUE, NOW()),

('GB', 'Shout 85258', 'text', NULL, 'Text SHOUT to 85258', 'https://giveusashout.org', NULL,
 'Free, confidential, 24/7 text-based mental health support for anyone in crisis.',
 '24/7', ARRAY['English'], 2, NULL, TRUE, NOW()),

('GB', 'Mind Infoline', 'hotline', '0300 123 3393', 'Text 86463', 'https://www.mind.org.uk/information-support/helplines', 'info@mind.org.uk',
 'Information and support for mental health problems. Can help find local services.',
 'Mon-Fri 9am-6pm', ARRAY['English'], 3, NULL, TRUE, NOW());

-- ─── CA — Canada ────────────────────────────────────────────────────────────

INSERT INTO navigator_crisis_resources (region_code, name, type, phone, text_instruction, url, email, description, hours, languages, priority, condition_specific, is_active, last_verified) VALUES
('CA', '988 Suicide Crisis Helpline', 'hotline', '988', 'Call or text 988', 'https://988.ca', NULL,
 'Canada''s national suicide crisis helpline providing immediate support in English and French.',
 '24/7', ARRAY['English','French'], 1, NULL, TRUE, NOW()),

('CA', 'Crisis Text Line Canada', 'text', NULL, 'Text CONNECT to 686868', 'https://www.crisistextline.ca', NULL,
 'Free, 24/7 text-based crisis support for Canadians from trained volunteer crisis responders.',
 '24/7', ARRAY['English','French'], 2, NULL, TRUE, NOW()),

('CA', 'Kids Help Phone', 'hotline', '1-800-668-6868', 'Text CONNECT to 686868', 'https://kidshelpphone.ca', NULL,
 'Professional counseling and crisis support for young people. Available by phone, text, and online chat.',
 '24/7', ARRAY['English','French'], 3, NULL, TRUE, NOW());

-- ─── AU — Australia ─────────────────────────────────────────────────────────

INSERT INTO navigator_crisis_resources (region_code, name, type, phone, text_instruction, url, email, description, hours, languages, priority, condition_specific, is_active, last_verified) VALUES
('AU', 'Lifeline Australia', 'hotline', '13 11 14', 'Text 0477 13 11 14', 'https://www.lifeline.org.au', NULL,
 'Crisis support and suicide prevention services for all Australians.',
 '24/7', ARRAY['English'], 1, NULL, TRUE, NOW()),

('AU', 'Beyond Blue', 'hotline', '1300 22 4636', NULL, 'https://www.beyondblue.org.au', NULL,
 'Support for anxiety, depression, and suicide prevention. Webchat also available.',
 '24/7', ARRAY['English'], 2, ARRAY['MDE','PDD','GAD','PD','SAD'], TRUE, NOW()),

('AU', 'Kids Helpline', 'hotline', '1800 55 1800', NULL, 'https://kidshelpline.com.au', NULL,
 'Free, private, and confidential counseling for young people aged 5 to 25.',
 '24/7', ARRAY['English'], 3, NULL, TRUE, NOW());

-- ─── BD — Bangladesh ────────────────────────────────────────────────────────

INSERT INTO navigator_crisis_resources (region_code, name, type, phone, text_instruction, url, email, description, hours, languages, priority, condition_specific, is_active, last_verified) VALUES
('BD', 'Kaan Pete Roi', 'hotline', '01779-554391', NULL, 'https://www.kaanpeteroi.org', NULL,
 'Emotional support helpline for Bangla-speaking individuals worldwide. Trained volunteers provide non-judgmental listening.',
 'Daily 6pm-10pm BST', ARRAY['Bengali','English'], 1, NULL, TRUE, NOW()),

('BD', 'National Mental Health Helpline', 'hotline', '16789', NULL, NULL, NULL,
 'Government-operated mental health support line for Bangladesh providing guidance and referrals.',
 '24/7', ARRAY['Bengali'], 2, NULL, TRUE, NOW());

-- ─── IN — India ─────────────────────────────────────────────────────────────

INSERT INTO navigator_crisis_resources (region_code, name, type, phone, text_instruction, url, email, description, hours, languages, priority, condition_specific, is_active, last_verified) VALUES
('IN', 'iCall', 'hotline', '9152987821', NULL, 'https://icallhelpline.org', NULL,
 'Psychosocial helpline by Tata Institute of Social Sciences providing free counseling and emotional support.',
 'Mon-Sat 8am-10pm IST', ARRAY['English','Hindi','Marathi'], 1, NULL, TRUE, NOW()),

('IN', 'Vandrevala Foundation', 'hotline', '1860-2662-345', NULL, 'https://www.vandrevalafoundation.com', NULL,
 'Free, 24/7 mental health support helpline staffed by trained clinical psychologists and counselors.',
 '24/7', ARRAY['English','Hindi','Gujarati','Marathi','Tamil','Telugu','Kannada','Malayalam','Bengali'], 2, NULL, TRUE, NOW()),

('IN', 'AASRA', 'hotline', '91-22-27546669', NULL, 'http://www.aasra.info', NULL,
 'Crisis intervention center providing emotional support and counseling for those in distress.',
 '24/7', ARRAY['English','Hindi'], 3, NULL, TRUE, NOW());

-- ─── DE — Germany ───────────────────────────────────────────────────────────

INSERT INTO navigator_crisis_resources (region_code, name, type, phone, text_instruction, url, email, description, hours, languages, priority, condition_specific, is_active, last_verified) VALUES
('DE', 'Telefonseelsorge', 'hotline', '0800 111 0 111', NULL, 'https://www.telefonseelsorge.de', NULL,
 'Free, anonymous crisis counseling available by phone, chat, and email. No caller ID recorded.',
 '24/7', ARRAY['German'], 1, NULL, TRUE, NOW()),

('DE', 'Telefonseelsorge (alt)', 'hotline', '0800 111 0 222', NULL, 'https://www.telefonseelsorge.de', NULL,
 'Alternative free crisis line for the Telefonseelsorge network. Both numbers provide the same service.',
 '24/7', ARRAY['German'], 2, NULL, TRUE, NOW());

-- ─── FR — France ────────────────────────────────────────────────────────────

INSERT INTO navigator_crisis_resources (region_code, name, type, phone, text_instruction, url, email, description, hours, languages, priority, condition_specific, is_active, last_verified) VALUES
('FR', '3114 - Numero National de Prevention du Suicide', 'hotline', '3114', NULL, 'https://www.3114.fr', NULL,
 'France''s national suicide prevention hotline providing free, confidential support to anyone in distress.',
 '24/7', ARRAY['French'], 1, NULL, TRUE, NOW()),

('FR', 'SOS Amitie', 'hotline', '09 72 39 40 50', NULL, 'https://www.sos-amitie.com', NULL,
 'Listening and emotional support for people experiencing loneliness, distress, or suicidal thoughts.',
 '24/7', ARRAY['French','English'], 2, NULL, TRUE, NOW());

-- ─── BR — Brazil ────────────────────────────────────────────────────────────

INSERT INTO navigator_crisis_resources (region_code, name, type, phone, text_instruction, url, email, description, hours, languages, priority, condition_specific, is_active, last_verified) VALUES
('BR', 'CVV - Centro de Valorizacao da Vida', 'hotline', '188', NULL, 'https://www.cvv.org.br', NULL,
 'Free emotional support and suicide prevention for all Brazilians. Also available via chat on the website.',
 '24/7', ARRAY['Portuguese'], 1, NULL, TRUE, NOW()),

('BR', 'CAPS - Centro de Atencao Psicossocial', 'directory', NULL, NULL, 'https://www.gov.br/saude/pt-br', NULL,
 'Network of community-based mental health centers across Brazil providing free psychosocial care and crisis support through the public health system (SUS).',
 'Mon-Fri 8am-5pm', ARRAY['Portuguese'], 2, NULL, TRUE, NOW());

-- ─── SE — Sweden ────────────────────────────────────────────────────────────

INSERT INTO navigator_crisis_resources (region_code, name, type, phone, text_instruction, url, email, description, hours, languages, priority, condition_specific, is_active, last_verified) VALUES
('SE', 'Mind Sjalvmordslinjen', 'hotline', '90101', NULL, 'https://mind.se/sjalvmordslinjen', NULL,
 'Suicide prevention hotline operated by the Swedish organization Mind. Free and anonymous.',
 '24/7', ARRAY['Swedish'], 1, NULL, TRUE, NOW()),

('SE', 'Jourhavande Medmanniska', 'hotline', '08-702 16 80', NULL, 'https://www.jourhavande-medmanniska.se', NULL,
 'Volunteer listening service for anyone who needs someone to talk to during difficult times.',
 'Daily 9pm-6am', ARRAY['Swedish'], 2, NULL, TRUE, NOW());

-- ─── DEFAULT — International / Fallback ─────────────────────────────────────

INSERT INTO navigator_crisis_resources (region_code, name, type, phone, text_instruction, url, email, description, hours, languages, priority, condition_specific, is_active, last_verified) VALUES
('DEFAULT', 'Befrienders Worldwide', 'directory', NULL, NULL, 'https://www.befrienders.org/find-a-helpline', NULL,
 'International directory of emotional support centers. Find a helpline in your country.',
 '24/7', ARRAY['English'], 1, NULL, TRUE, NOW()),

('DEFAULT', 'International Association for Suicide Prevention (IASP)', 'directory', NULL, NULL, 'https://www.iasp.info/resources/Crisis_Centres/', NULL,
 'Global directory of crisis centers maintained by the IASP in collaboration with the WHO.',
 '24/7', ARRAY['English'], 2, NULL, TRUE, NOW()),

('DEFAULT', 'Findahelpline.com', 'directory', NULL, NULL, 'https://findahelpline.com', NULL,
 'Free, worldwide directory of mental health helplines searchable by country and issue.',
 '24/7', ARRAY['English'], 3, NULL, TRUE, NOW());


-- ============================================================================
-- 6. DEFAULT MATCHING CONFIGURATION
-- ============================================================================

INSERT INTO navigator_matching_config (
    id,
    confidence_cap,
    min_relevance_threshold,
    below_minimum_penalty,
    max_results,
    min_results,
    max_per_family,
    severity_modifiers,
    frequency_modifiers,
    duration_modifiers,
    relevance_display_tiers,
    version
) VALUES (
    1,
    0.75,
    0.15,
    0.3,
    4,
    1,
    2,
    '{"1": 0.6, "2-3": 0.8, "4-5": 1.0, "6-7": 1.2, "8-10": 1.4}'::JSONB,
    '{"rarely": 0.7, "sometimes": 1.0, "often": 1.2, "always": 1.4}'::JSONB,
    '{"below_half": 0.7, "half_to_full": 1.0, "meets_or_exceeds": 1.3}'::JSONB,
    '{
        "high": {"min": 0.55, "label": "Highly Relevant", "color": "#2563eb"},
        "moderate": {"min": 0.35, "label": "Moderately Relevant", "color": "#7c3aed"},
        "low": {"min": 0.15, "label": "Possibly Relevant", "color": "#6b7280"},
        "minimal": {"min": 0, "label": "Low Relevance", "color": "#9ca3af"}
    }'::JSONB,
    '1.0.0'
);


COMMIT;
