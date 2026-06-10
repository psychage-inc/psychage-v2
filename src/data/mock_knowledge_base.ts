import type { KnowledgeBase, Symptom, ConditionWithMappings } from '../lib/navigator/types';

// ─── Symptoms ────────────────────────────────────────────────────────────────

const symptoms: Symptom[] = [
    // ── Mood (MOD_001–MOD_009) ───────────────────────────────────────────────
    { id: 'MOD_001', domain: 'emotional', category: 'mood', name: 'Persistent sadness', description: 'A continuous feeling of sadness or emptiness that lasts most of the day.', synonyms: ['sad', 'depressed', 'down', 'blue'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 1, is_active: true, version: '1.1.0' },
    { id: 'MOD_002', domain: 'emotional', category: 'mood', name: 'Loss of interest or pleasure', description: 'Diminished interest in activities previously enjoyed.', synonyms: ['anhedonia', 'bored', 'apathy', 'no motivation'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 2, is_active: true, version: '1.1.0' },
    { id: 'MOD_003', domain: 'emotional', category: 'mood', name: 'Feelings of worthlessness', description: 'Pervasive sense of being inadequate or without value.', synonyms: ['worthless', 'useless', 'no good', 'failure'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 3, is_active: true, version: '1.1.0' },
    { id: 'MOD_004', domain: 'emotional', category: 'mood', name: 'Excessive guilt', description: 'Disproportionate guilt about minor or imagined issues.', synonyms: ['guilty', 'blame', 'at fault', 'regret'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 4, is_active: true, version: '1.1.0' },
    { id: 'MOD_005', domain: 'emotional', category: 'mood', name: 'Hopelessness', description: 'Feeling that nothing will improve and the future is bleak.', synonyms: ['hopeless', 'no future', 'give up', 'pointless'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 5, is_active: true, version: '1.1.0' },
    { id: 'MOD_006', domain: 'emotional', category: 'mood', name: 'Elevated or euphoric mood', description: 'Abnormally high energy or elation disproportionate to circumstances.', synonyms: ['manic', 'euphoric', 'on top of the world', 'high'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 6, is_active: true, version: '1.1.0' },
    { id: 'MOD_007', domain: 'emotional', category: 'mood', name: 'Irritability', description: 'Increased tendency to become frustrated or angry easily.', synonyms: ['irritable', 'angry', 'short fuse', 'snappy'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 7, is_active: true, version: '1.1.0' },
    { id: 'MOD_008', domain: 'emotional', category: 'mood', name: 'Mood swings', description: 'Rapid, unpredictable shifts in emotional state.', synonyms: ['mood changes', 'unstable mood', 'emotional rollercoaster'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 8, is_active: true, version: '1.1.0' },
    { id: 'MOD_009', domain: 'emotional', category: 'mood', name: 'Emotional numbness', description: 'Feeling emotionally flat or disconnected from feelings.', synonyms: ['numb', 'empty', 'flat', 'detached'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 9, is_active: true, version: '1.1.0' },

    // ── Anxiety/Fear (ANX_001–ANX_010) ───────────────────────────────────────
    { id: 'ANX_001', domain: 'emotional', category: 'anxiety_fear', name: 'Excessive worry', description: 'Uncontrollable worry about multiple areas of life.', synonyms: ['worry', 'anxious', 'nervous', 'stressed'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 10, is_active: true, version: '1.1.0' },
    { id: 'ANX_002', domain: 'emotional', category: 'anxiety_fear', name: 'Panic attacks', description: 'Sudden episodes of intense fear with physical symptoms.', synonyms: ['panic', 'heart racing', 'can\'t breathe', 'terror'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 11, is_active: true, version: '1.1.0' },
    { id: 'ANX_003', domain: 'emotional', category: 'anxiety_fear', name: 'Fear of specific situations', description: 'Intense fear triggered by particular objects or situations.', synonyms: ['phobia', 'scared', 'afraid', 'avoid'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 12, is_active: true, version: '1.1.0' },
    { id: 'ANX_004', domain: 'emotional', category: 'anxiety_fear', name: 'Social anxiety', description: 'Marked fear or anxiety about social situations and being judged.', synonyms: ['shy', 'social fear', 'embarrassment', 'stage fright'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 13, is_active: true, version: '1.1.0' },
    { id: 'ANX_005', domain: 'emotional', category: 'anxiety_fear', name: 'Restlessness or feeling on edge', description: 'Unable to relax, feeling keyed up or tense.', synonyms: ['restless', 'on edge', 'tense', 'can\'t relax'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 14, is_active: true, version: '1.1.0' },
    { id: 'ANX_006', domain: 'physical', category: 'anxiety_fear', name: 'Muscle tension', description: 'Persistent tightness or stiffness in muscles due to anxiety.', synonyms: ['tense', 'tight muscles', 'stiff', 'clenching'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 15, is_active: true, version: '1.1.0' },
    { id: 'ANX_007', domain: 'emotional', category: 'anxiety_fear', name: 'Dread or sense of impending doom', description: 'Persistent feeling that something terrible is about to happen.', synonyms: ['doom', 'dread', 'bad feeling', 'foreboding'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 16, is_active: true, version: '1.1.0' },
    { id: 'ANX_008', domain: 'behavioral', category: 'anxiety_fear', name: 'Avoidance of feared situations', description: 'Actively staying away from places, people, or activities that trigger fear.', synonyms: ['avoidance', 'staying away', 'won\'t go', 'escape'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 17, is_active: true, version: '1.1.0' },
    { id: 'ANX_009', domain: 'emotional', category: 'anxiety_fear', name: 'Fear of losing control or going crazy', description: 'Persistent fear of losing mental control or sanity.', synonyms: ['losing it', 'going crazy', 'losing mind', 'unhinged'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 18, is_active: true, version: '1.1.0' },
    { id: 'ANX_010', domain: 'physical', category: 'anxiety_fear', name: 'Excessive health anxiety', description: 'Persistent preoccupation with having or acquiring a serious illness.', synonyms: ['hypochondria', 'health worry', 'illness anxiety', 'medical fear'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 19, is_active: true, version: '1.1.0' },

    // ── Emotional Regulation (EMR_001–EMR_006) ───────────────────────────────
    { id: 'EMR_001', domain: 'emotional', category: 'emotional_regulation', name: 'Emotional outbursts', description: 'Sudden intense emotional reactions that feel disproportionate.', synonyms: ['outbursts', 'tantrums', 'explosive', 'overreact'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 20, is_active: true, version: '1.1.0' },
    { id: 'EMR_002', domain: 'emotional', category: 'emotional_regulation', name: 'Difficulty managing anger', description: 'Trouble controlling angry responses to frustration.', synonyms: ['anger issues', 'rage', 'fury', 'hostile'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 21, is_active: true, version: '1.1.0' },
    { id: 'EMR_003', domain: 'emotional', category: 'emotional_regulation', name: 'Crying spells', description: 'Frequent episodes of crying that may seem unprovoked.', synonyms: ['crying', 'tearful', 'weepy', 'can\'t stop crying'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 22, is_active: true, version: '1.1.0' },
    { id: 'EMR_004', domain: 'emotional', category: 'emotional_regulation', name: 'Intense fear of abandonment', description: 'Overwhelming anxiety about being left or rejected by others.', synonyms: ['abandonment', 'clingy', 'left alone', 'rejected'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 7, severity_red_flag_level: 'WATCH', display_order: 23, is_active: true, version: '1.1.0' },
    { id: 'EMR_005', domain: 'emotional', category: 'emotional_regulation', name: 'Emotional detachment', description: 'Feeling disconnected from your own emotions or from other people.', synonyms: ['detached', 'disconnected', 'numb', 'removed'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 24, is_active: true, version: '1.1.0' },
    { id: 'EMR_006', domain: 'emotional', category: 'emotional_regulation', name: 'Persistent grief or mourning', description: 'Prolonged grief that significantly impairs daily functioning.', synonyms: ['grief', 'mourning', 'loss', 'bereavement'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 25, is_active: true, version: '1.1.0' },

    // ── Body Sensations (BDY_001–BDY_010) ────────────────────────────────────
    { id: 'BDY_001', domain: 'physical', category: 'body_sensations', name: 'Headaches', description: 'Recurring headaches without clear medical cause.', synonyms: ['head pain', 'migraine', 'head pressure'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 26, is_active: true, version: '1.1.0' },
    { id: 'BDY_002', domain: 'physical', category: 'body_sensations', name: 'Stomach or digestive issues', description: 'Frequent nausea, stomach pain, or digestive discomfort.', synonyms: ['nausea', 'stomach ache', 'GI issues', 'upset stomach'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 27, is_active: true, version: '1.1.0' },
    { id: 'BDY_003', domain: 'physical', category: 'body_sensations', name: 'Rapid heartbeat', description: 'Heart racing or pounding without physical exertion.', synonyms: ['palpitations', 'heart pounding', 'racing heart'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 9, severity_red_flag_level: 'URGENT', display_order: 28, is_active: true, version: '1.1.0' },
    { id: 'BDY_004', domain: 'physical', category: 'body_sensations', name: 'Shortness of breath', description: 'Difficulty breathing not caused by physical activity.', synonyms: ['can\'t breathe', 'breathless', 'gasping'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 29, is_active: true, version: '1.1.0' },
    { id: 'BDY_005', domain: 'physical', category: 'body_sensations', name: 'Dizziness or lightheadedness', description: 'Feeling faint, unsteady, or like the room is spinning.', synonyms: ['dizzy', 'faint', 'lightheaded', 'vertigo'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 30, is_active: true, version: '1.1.0' },
    { id: 'BDY_006', domain: 'physical', category: 'body_sensations', name: 'Unexplained pain', description: 'Chronic pain without identifiable medical cause.', synonyms: ['chronic pain', 'body aches', 'hurting'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 9, severity_red_flag_level: 'URGENT', display_order: 31, is_active: true, version: '1.1.0' },
    { id: 'BDY_007', domain: 'physical', category: 'body_sensations', name: 'Trembling or shaking', description: 'Involuntary shaking or trembling of hands or body.', synonyms: ['shaking', 'trembling', 'tremors', 'shivering'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 32, is_active: true, version: '1.1.0' },
    { id: 'BDY_008', domain: 'physical', category: 'body_sensations', name: 'Sweating excessively', description: 'Sweating more than usual without heat or exercise.', synonyms: ['sweating', 'clammy', 'sweaty palms'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 33, is_active: true, version: '1.1.0' },
    { id: 'BDY_009', domain: 'physical', category: 'body_sensations', name: 'Numbness or tingling', description: 'Physical sensations of numbness or pins and needles.', synonyms: ['tingling', 'pins and needles', 'numb hands'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 34, is_active: true, version: '1.1.0' },
    { id: 'BDY_010', domain: 'physical', category: 'body_sensations', name: 'Psychomotor changes', description: 'Noticeable slowing down or agitation in physical movements.', synonyms: ['slowed down', 'agitated', 'restless body', 'fidgety'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 35, is_active: true, version: '1.1.0' },

    // ── Sleep (SLP_001–SLP_005) ──────────────────────────────────────────────
    { id: 'SLP_001', domain: 'physical', category: 'sleep', name: 'Difficulty falling asleep', description: 'Trouble initiating sleep at bedtime.', synonyms: ['insomnia', 'can\'t sleep', 'lying awake'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 36, is_active: true, version: '1.1.0' },
    { id: 'SLP_002', domain: 'physical', category: 'sleep', name: 'Waking up frequently', description: 'Repeatedly waking during the night.', synonyms: ['night waking', 'broken sleep', 'restless nights'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 37, is_active: true, version: '1.1.0' },
    { id: 'SLP_003', domain: 'physical', category: 'sleep', name: 'Sleeping too much', description: 'Sleeping significantly more than usual.', synonyms: ['hypersomnia', 'oversleeping', 'always tired'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 38, is_active: true, version: '1.1.0' },
    { id: 'SLP_004', domain: 'physical', category: 'sleep', name: 'Nightmares or disturbing dreams', description: 'Recurring distressing dreams that disrupt sleep quality.', synonyms: ['nightmares', 'bad dreams', 'night terrors'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 39, is_active: true, version: '1.1.0' },
    { id: 'SLP_005', domain: 'physical', category: 'sleep', name: 'Reduced need for sleep', description: 'Feeling rested after very little sleep without being tired.', synonyms: ['no sleep needed', 'energized', 'few hours'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 40, is_active: true, version: '1.1.0' },

    // ── Appetite/Weight (APT_001–APT_004) ────────────────────────────────────
    { id: 'APT_001', domain: 'physical', category: 'appetite_weight', name: 'Decreased appetite', description: 'Significant reduction in desire to eat.', synonyms: ['not hungry', 'no appetite', 'skipping meals'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 41, is_active: true, version: '1.1.0' },
    { id: 'APT_002', domain: 'physical', category: 'appetite_weight', name: 'Increased appetite or cravings', description: 'Eating more than usual or craving specific foods.', synonyms: ['overeating', 'cravings', 'binge eating', 'always hungry'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 42, is_active: true, version: '1.1.0' },
    { id: 'APT_003', domain: 'physical', category: 'appetite_weight', name: 'Unintentional weight change', description: 'Significant weight gain or loss without trying.', synonyms: ['weight gain', 'weight loss', 'body change'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 43, is_active: true, version: '1.1.0' },
    { id: 'APT_004', domain: 'behavioral', category: 'appetite_weight', name: 'Restrictive eating', description: 'Deliberately limiting food intake in unhealthy ways.', synonyms: ['dieting', 'restricting', 'not eating', 'food rules'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 44, is_active: true, version: '1.1.0' },

    // ── Energy (ENR_001–ENR_006) ─────────────────────────────────────────────
    { id: 'ENR_001', domain: 'physical', category: 'energy', name: 'Fatigue or low energy', description: 'Persistent tiredness not relieved by rest.', synonyms: ['tired', 'exhausted', 'drained', 'no energy'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 45, is_active: true, version: '1.1.0' },
    { id: 'ENR_002', domain: 'physical', category: 'energy', name: 'Excessive energy or hyperactivity', description: 'Unusually high energy that feels hard to contain.', synonyms: ['hyperactive', 'wired', 'can\'t sit still', 'buzzing'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 46, is_active: true, version: '1.1.0' },
    { id: 'ENR_003', domain: 'physical', category: 'energy', name: 'Feeling physically heavy', description: 'Limbs feel weighted or heavy, making movement effortful.', synonyms: ['heavy', 'leaden', 'weighed down'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 47, is_active: true, version: '1.1.0' },
    { id: 'ENR_004', domain: 'physical', category: 'energy', name: 'Easily fatigued by minor tasks', description: 'Becoming exhausted from activities that used to be easy.', synonyms: ['tired quickly', 'low stamina', 'winded easily'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 48, is_active: true, version: '1.1.0' },
    { id: 'ENR_005', domain: 'behavioral', category: 'energy', name: 'Decreased productivity', description: 'Getting less done at work, school, or home than usual.', synonyms: ['unproductive', 'slacking', 'falling behind'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 49, is_active: true, version: '1.1.0' },
    { id: 'ENR_006', domain: 'physical', category: 'energy', name: 'Seasonal energy changes', description: 'Energy levels that notably change with seasons.', synonyms: ['winter fatigue', 'seasonal', 'low in winter'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 50, is_active: true, version: '1.1.0' },

    // ── Cognition (COG_001–COG_011) ──────────────────────────────────────────
    { id: 'COG_001', domain: 'cognitive', category: 'cognition', name: 'Difficulty concentrating', description: 'Trouble focusing or sustaining attention on tasks.', synonyms: ['can\'t focus', 'distracted', 'brain fog'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 51, is_active: true, version: '1.1.0' },
    { id: 'COG_002', domain: 'cognitive', category: 'cognition', name: 'Indecisiveness', description: 'Difficulty making even simple decisions.', synonyms: ['can\'t decide', 'paralyzed', 'overthinking choices'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 52, is_active: true, version: '1.1.0' },
    { id: 'COG_003', domain: 'cognitive', category: 'cognition', name: 'Racing thoughts', description: 'Thoughts moving so fast they are hard to track.', synonyms: ['racing mind', 'fast thoughts', 'can\'t slow down'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 53, is_active: true, version: '1.1.0' },
    { id: 'COG_004', domain: 'cognitive', category: 'cognition', name: 'Memory problems', description: 'Difficulty remembering recent events or information.', synonyms: ['forgetful', 'memory loss', 'can\'t remember'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 54, is_active: true, version: '1.1.0' },
    { id: 'COG_005', domain: 'cognitive', category: 'cognition', name: 'Intrusive thoughts', description: 'Unwanted distressing thoughts that are hard to dismiss.', synonyms: ['unwanted thoughts', 'disturbing thoughts', 'obsessions'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 55, is_active: true, version: '1.1.0' },
    { id: 'COG_006', domain: 'cognitive', category: 'cognition', name: 'Rumination', description: 'Repetitively going over the same negative thoughts.', synonyms: ['overthinking', 'dwelling', 'can\'t let go', 'looping'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 56, is_active: true, version: '1.1.0' },
    { id: 'COG_007', domain: 'cognitive', category: 'cognition', name: 'Flashbacks', description: 'Vivid re-experiencing of past traumatic events.', synonyms: ['reliving', 'flashback', 'trauma memory', 'triggered'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 57, is_active: true, version: '1.1.0' },
    { id: 'COG_008', domain: 'cognitive', category: 'cognition', name: 'Thoughts of self-harm', description: 'Thoughts about hurting yourself intentionally.', synonyms: ['self-harm', 'cutting', 'hurting myself'], ask_duration: false, ask_severity: false, ask_frequency: false, is_red_flag: true, red_flag_level: 'CRISIS', severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 58, is_active: true, version: '1.1.0' },
    { id: 'COG_009', domain: 'cognitive', category: 'cognition', name: 'Suicidal thoughts', description: 'Thoughts about ending your own life.', synonyms: ['suicide', 'ending it', 'not wanting to live'], ask_duration: false, ask_severity: false, ask_frequency: false, is_red_flag: true, red_flag_level: 'CRISIS', severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 59, is_active: true, version: '1.1.0' },
    { id: 'COG_010', domain: 'cognitive', category: 'cognition', name: 'Thoughts of harming others', description: 'Thoughts about hurting other people.', synonyms: ['violent thoughts', 'harming others', 'homicidal'], ask_duration: false, ask_severity: false, ask_frequency: false, is_red_flag: true, red_flag_level: 'CRISIS', severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 60, is_active: true, version: '1.1.0' },
    { id: 'COG_011', domain: 'cognitive', category: 'cognition', name: 'Paranoid thinking', description: 'Persistent unfounded suspicion that others intend harm.', synonyms: ['paranoid', 'suspicious', 'distrust', 'conspiracy'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 7, severity_red_flag_level: 'URGENT', display_order: 61, is_active: true, version: '1.1.0' },

    // ── Perception (PRC_001–PRC_007) ─────────────────────────────────────────
    { id: 'PRC_001', domain: 'cognitive', category: 'perception', name: 'Hypervigilance', description: 'Being excessively alert and scanning for threats.', synonyms: ['on guard', 'hyperaware', 'scanning', 'startle'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 62, is_active: true, version: '1.1.0' },
    { id: 'PRC_002', domain: 'cognitive', category: 'perception', name: 'Feeling unreal or dreamlike', description: 'Sense that yourself or the world is not real.', synonyms: ['derealization', 'depersonalization', 'dreamlike', 'unreal'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 63, is_active: true, version: '1.1.0' },
    { id: 'PRC_003', domain: 'cognitive', category: 'perception', name: 'Distorted body image', description: 'Perceiving your body or appearance inaccurately.', synonyms: ['body dysmorphia', 'ugly', 'fat', 'distorted'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 7, severity_red_flag_level: 'URGENT', display_order: 64, is_active: true, version: '1.1.0' },
    { id: 'PRC_004', domain: 'cognitive', category: 'perception', name: 'Hallucinations', description: 'Seeing, hearing, or sensing things that are not there.', synonyms: ['hearing voices', 'seeing things', 'hallucinating'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: true, red_flag_level: 'URGENT', severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 65, is_active: true, version: '1.1.0' },
    { id: 'PRC_005', domain: 'cognitive', category: 'perception', name: 'Heightened sensitivity to stimuli', description: 'Over-responsiveness to sound, light, touch, or smell.', synonyms: ['sensitive', 'overstimulated', 'sensory overload'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 66, is_active: true, version: '1.1.0' },
    { id: 'PRC_006', domain: 'cognitive', category: 'perception', name: 'Disorganized thinking', description: 'Thoughts that are jumbled, fragmented, or hard to follow.', synonyms: ['confused', 'scattered', 'incoherent', 'tangential'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 8, severity_red_flag_level: 'URGENT', display_order: 67, is_active: true, version: '1.1.0' },
    { id: 'PRC_007', domain: 'cognitive', category: 'perception', name: 'Delusions', description: 'Fixed false beliefs held despite contrary evidence.', synonyms: ['delusional', 'false beliefs', 'grandiose', 'persecutory'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: true, red_flag_level: 'URGENT', severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 68, is_active: true, version: '1.1.0' },

    // ── Social (SOC_001–SOC_008) ─────────────────────────────────────────────
    { id: 'SOC_001', domain: 'behavioral', category: 'social', name: 'Social withdrawal', description: 'Pulling away from friends, family, and social activities.', synonyms: ['isolating', 'withdrawing', 'hermit', 'alone'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 69, is_active: true, version: '1.1.0' },
    { id: 'SOC_002', domain: 'behavioral', category: 'social', name: 'Relationship difficulties', description: 'Ongoing conflict or strain in close relationships.', synonyms: ['fighting', 'conflict', 'relationship problems'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 70, is_active: true, version: '1.1.0' },
    { id: 'SOC_003', domain: 'behavioral', category: 'social', name: 'Difficulty trusting others', description: 'Persistent suspicion of others\' intentions.', synonyms: ['distrust', 'suspicious', 'guarded', 'wary'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 71, is_active: true, version: '1.1.0' },
    { id: 'SOC_004', domain: 'behavioral', category: 'social', name: 'Feeling misunderstood', description: 'Persistent sense that others do not understand you.', synonyms: ['misunderstood', 'different', 'outsider', 'alienated'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 72, is_active: true, version: '1.1.0' },
    { id: 'SOC_005', domain: 'behavioral', category: 'social', name: 'Difficulty reading social cues', description: 'Trouble interpreting facial expressions, tone, or body language.', synonyms: ['social cues', 'body language', 'misread', 'awkward'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 73, is_active: true, version: '1.1.0' },
    { id: 'SOC_006', domain: 'behavioral', category: 'social', name: 'People-pleasing or over-accommodation', description: 'Consistently prioritizing others\' needs at cost to your own.', synonyms: ['people pleaser', 'doormat', 'can\'t say no'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 74, is_active: true, version: '1.1.0' },
    { id: 'SOC_007', domain: 'behavioral', category: 'social', name: 'Unstable relationships', description: 'Pattern of intense but volatile interpersonal relationships.', synonyms: ['on and off', 'love-hate', 'stormy relationships'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 75, is_active: true, version: '1.1.0' },
    { id: 'SOC_008', domain: 'behavioral', category: 'social', name: 'Extreme sensitivity to rejection', description: 'Disproportionate distress when facing perceived rejection.', synonyms: ['rejection sensitive', 'can\'t handle rejection', 'hurt easily'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 76, is_active: true, version: '1.1.0' },

    // ── Coping (CPG_001–CPG_012) ─────────────────────────────────────────────
    { id: 'CPG_001', domain: 'behavioral', category: 'coping', name: 'Substance use to cope', description: 'Using alcohol or drugs to manage difficult emotions.', synonyms: ['drinking', 'drugs', 'self-medicating', 'numbing'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 77, is_active: true, version: '1.1.0' },
    { id: 'CPG_002', domain: 'behavioral', category: 'coping', name: 'Compulsive behaviors', description: 'Repetitive actions performed to reduce anxiety.', synonyms: ['rituals', 'checking', 'counting', 'washing'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 78, is_active: true, version: '1.1.0' },
    { id: 'CPG_003', domain: 'behavioral', category: 'coping', name: 'Binge eating', description: 'Eating large amounts of food in a short time with loss of control.', synonyms: ['bingeing', 'overeating', 'loss of control eating'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 8, severity_red_flag_level: 'URGENT', display_order: 79, is_active: true, version: '1.1.0' },
    { id: 'CPG_004', domain: 'behavioral', category: 'coping', name: 'Self-harm behaviors', description: 'Intentionally injuring yourself as a coping mechanism.', synonyms: ['cutting', 'burning', 'self-injury', 'hurting self'], ask_duration: false, ask_severity: false, ask_frequency: false, is_red_flag: true, red_flag_level: 'CRISIS', severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 80, is_active: true, version: '1.1.0' },
    { id: 'CPG_005', domain: 'behavioral', category: 'coping', name: 'Excessive reassurance-seeking', description: 'Repeatedly seeking reassurance from others about worries.', synonyms: ['reassurance', 'checking with others', 'needing validation'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 81, is_active: true, version: '1.1.0' },
    { id: 'CPG_006', domain: 'behavioral', category: 'coping', name: 'Procrastination or avoidance', description: 'Consistently putting off tasks or responsibilities.', synonyms: ['procrastinating', 'putting off', 'avoiding tasks'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 82, is_active: true, version: '1.1.0' },
    { id: 'CPG_007', domain: 'behavioral', category: 'coping', name: 'Emotional eating', description: 'Eating in response to emotions rather than hunger.', synonyms: ['comfort eating', 'stress eating', 'eating feelings'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 83, is_active: true, version: '1.1.0' },
    { id: 'CPG_008', domain: 'behavioral', category: 'coping', name: 'Excessive screen time or gaming', description: 'Using screens or games excessively to escape distress.', synonyms: ['gaming addiction', 'doomscrolling', 'screen addiction'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 84, is_active: true, version: '1.1.0' },
    { id: 'CPG_009', domain: 'behavioral', category: 'coping', name: 'Purging behaviors', description: 'Self-induced vomiting, laxative misuse, or excessive exercise to compensate for eating.', synonyms: ['vomiting', 'purging', 'laxatives', 'compensating'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 6, severity_red_flag_level: 'URGENT', display_order: 85, is_active: true, version: '1.1.0' },
    { id: 'CPG_010', domain: 'behavioral', category: 'coping', name: 'Hoarding or difficulty discarding', description: 'Persistent difficulty getting rid of possessions regardless of value.', synonyms: ['hoarding', 'collecting', 'can\'t throw away'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 86, is_active: true, version: '1.1.0' },
    { id: 'CPG_011', domain: 'behavioral', category: 'coping', name: 'Skin picking or hair pulling', description: 'Repetitive body-focused behaviors causing tissue damage.', synonyms: ['picking', 'hair pulling', 'trichotillomania', 'dermatillomania'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 87, is_active: true, version: '1.1.0' },
    { id: 'CPG_012', domain: 'behavioral', category: 'coping', name: 'Compulsive checking of body', description: 'Repeatedly examining body for perceived flaws or illness signs.', synonyms: ['mirror checking', 'body checking', 'symptom checking'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 88, is_active: true, version: '1.1.0' },

    // ── Activity Level (ACT_001–ACT_008) ─────────────────────────────────────
    { id: 'ACT_001', domain: 'behavioral', category: 'activity_level', name: 'Neglecting responsibilities', description: 'Failing to keep up with work, school, or home duties.', synonyms: ['neglecting', 'slipping', 'not caring', 'dropping the ball'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 89, is_active: true, version: '1.1.0' },
    { id: 'ACT_002', domain: 'behavioral', category: 'activity_level', name: 'Impulsive behaviors', description: 'Acting without thinking about consequences.', synonyms: ['impulsive', 'reckless', 'spontaneous', 'hasty'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 90, is_active: true, version: '1.1.0' },
    { id: 'ACT_003', domain: 'behavioral', category: 'activity_level', name: 'Risky or reckless behavior', description: 'Engaging in dangerous activities without regard for safety.', synonyms: ['reckless', 'risky', 'dangerous', 'thrill-seeking'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 91, is_active: true, version: '1.1.0' },
    { id: 'ACT_004', domain: 'behavioral', category: 'activity_level', name: 'Excessive goal-directed activity', description: 'Intense focus on projects, often unrealistic, for extended periods.', synonyms: ['overworking', 'driven', 'obsessed with goals'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 92, is_active: true, version: '1.1.0' },
    { id: 'ACT_005', domain: 'behavioral', category: 'activity_level', name: 'Reckless spending', description: 'Spending money impulsively without regard for consequences.', synonyms: ['overspending', 'shopping spree', 'spending spree'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 8, severity_red_flag_level: 'WATCH', display_order: 93, is_active: true, version: '1.1.0' },
    { id: 'ACT_006', domain: 'behavioral', category: 'activity_level', name: 'Decreased self-care', description: 'Neglecting personal hygiene, grooming, or health routines.', synonyms: ['not showering', 'messy', 'letting go', 'neglect self'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 94, is_active: true, version: '1.1.0' },
    { id: 'ACT_007', domain: 'behavioral', category: 'activity_level', name: 'Repetitive or stereotyped movements', description: 'Recurring motor movements such as rocking, hand-flapping, or spinning.', synonyms: ['stimming', 'rocking', 'hand flapping', 'spinning'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 95, is_active: true, version: '1.1.0' },
    { id: 'ACT_008', domain: 'behavioral', category: 'activity_level', name: 'Rigid adherence to routines', description: 'Extreme distress when routines or rituals are disrupted.', synonyms: ['routine', 'rigid', 'inflexible', 'need sameness'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 96, is_active: true, version: '1.1.0' },

    // ── Identity/Self-Image (IDN_001–IDN_004) [NEW] ─────────────────────────
    { id: 'IDN_001', domain: 'emotional', category: 'identity_self_image', name: 'Unstable sense of self', description: 'Frequently shifting goals, values, or sense of identity.', synonyms: ['identity crisis', 'don\'t know who I am', 'changing self'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 97, is_active: true, version: '1.1.0' },
    { id: 'IDN_002', domain: 'emotional', category: 'identity_self_image', name: 'Chronic feelings of emptiness', description: 'Persistent inner void or hollowness.', synonyms: ['empty', 'hollow', 'void', 'nothing inside'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 98, is_active: true, version: '1.1.0' },
    { id: 'IDN_003', domain: 'emotional', category: 'identity_self_image', name: 'Excessive self-consciousness', description: 'Intense preoccupation with how others perceive you.', synonyms: ['self-conscious', 'embarrassed', 'judged', 'watched'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 99, is_active: true, version: '1.1.0' },
    { id: 'IDN_004', domain: 'emotional', category: 'identity_self_image', name: 'Grandiosity or inflated self-importance', description: 'Unrealistic sense of superiority or special abilities.', synonyms: ['grandiose', 'superior', 'special', 'above others'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 100, is_active: true, version: '1.1.0' },

    // ── Somatic/Health (SOM_001–SOM_003) [NEW] ──────────────────────────────
    { id: 'SOM_001', domain: 'physical', category: 'somatic_health', name: 'Preoccupation with physical symptoms', description: 'Excessive focus on bodily symptoms and their significance.', synonyms: ['body focus', 'symptom worry', 'health obsession'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 101, is_active: true, version: '1.1.0' },
    { id: 'SOM_002', domain: 'physical', category: 'somatic_health', name: 'Conversion symptoms', description: 'Neurological symptoms like weakness or seizures without medical cause.', synonyms: ['weakness', 'seizure-like', 'paralysis', 'loss of function'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 102, is_active: true, version: '1.1.0' },
    { id: 'SOM_003', domain: 'physical', category: 'somatic_health', name: 'Cyclical mood-body symptoms', description: 'Mood and physical symptoms that follow a predictable cycle.', synonyms: ['PMS', 'cyclical', 'monthly pattern', 'hormonal mood'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 103, is_active: true, version: '1.1.0' },

    // ── Phase 4 expansion symptoms (synced from 20260303000001) ──────────────────
    // The seed defines 24 new symptom IDs. IDN_005 (Grandiosity) is intentionally
    // OMITTED here because production already ships that exact symptom as IDN_004
    // ("Grandiosity or inflated self-importance"); seed IDN_005 references are
    // remapped to IDN_004 in the condition mappings below. → 23 added, 126 total.
    // Safety triggers carried verbatim: PRC_008 (URGENT inherent), PRC_009 (URGENT
    // severity≥7), CPG_015/ACT_009/SLP_006 (WATCH severity≥8), APT_005/006 (WATCH severity≥7).
    { id: 'IDN_006', domain: 'behavioral', category: 'identity_self_image', name: 'Lack of empathy or difficulty recognizing others\' feelings', description: 'Difficulty understanding or caring about how others feel; unwillingness or inability to recognize the needs and feelings of others.', synonyms: ['no empathy', 'cant understand others feelings', 'indifferent to others', 'emotionally cold', 'lack of compassion', 'self-centered', 'callous'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 104, is_active: true, version: '1.2.0' },
    { id: 'IDN_007', domain: 'behavioral', category: 'identity_self_image', name: 'Excessive need for admiration', description: 'A constant need for excessive attention, praise, and validation from others to maintain self-esteem.', synonyms: ['need for praise', 'attention seeking', 'validation seeking', 'need to be admired', 'craving recognition', 'needing approval'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 105, is_active: true, version: '1.2.0' },
    { id: 'IDN_008', domain: 'behavioral', category: 'identity_self_image', name: 'Submissiveness or difficulty making decisions without reassurance', description: 'An excessive need for others to assume responsibility for major areas of one\'s life and persistent difficulty making everyday decisions without excessive reassurance.', synonyms: ['cant decide without help', 'need someone to decide', 'submissive', 'passive', 'seeking guidance constantly', 'dependent on others', 'need direction'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 106, is_active: true, version: '1.2.0' },
    { id: 'CPG_013', domain: 'behavioral', category: 'coping', name: 'Hair pulling or plucking', description: 'Recurrent pulling out of one\'s own hair resulting in noticeable hair loss, often accompanied by tension before pulling and relief afterward.', synonyms: ['pulling hair out', 'plucking hair', 'trichotillomania', 'eyebrow pulling', 'eyelash pulling', 'cant stop pulling hair', 'trich'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 107, is_active: true, version: '1.2.0' },
    { id: 'CPG_014', domain: 'behavioral', category: 'coping', name: 'Skin picking or scratching', description: 'Recurrent picking at one\'s own skin resulting in skin lesions, often accompanied by tension before picking and relief afterward.', synonyms: ['picking skin', 'scratching skin', 'excoriation', 'scab picking', 'cant stop picking', 'dermatillomania', 'skin damage'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 108, is_active: true, version: '1.2.0' },
    { id: 'CPG_015', domain: 'behavioral', category: 'coping', name: 'Explosive anger or rage outbursts', description: 'Recurrent behavioral outbursts representing a failure to control aggressive impulses, manifested as verbal or physical aggression grossly out of proportion to the provocation.', synonyms: ['rage attacks', 'explosive anger', 'violent outbursts', 'losing control angry', 'sudden rage', 'blowing up', 'anger explosions'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 8, severity_red_flag_level: 'WATCH', display_order: 109, is_active: true, version: '1.2.0' },
    { id: 'EMR_007', domain: 'emotional', category: 'emotional_regulation', name: 'Chronic feelings of emptiness or boredom', description: 'A persistent sense of inner emptiness, hollowness, or chronic boredom that feels different from situational boredom.', synonyms: ['chronically empty', 'always bored', 'nothing matters', 'inner void', 'persistent emptiness', 'hollow feeling', 'emotional vacuum'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 110, is_active: true, version: '1.2.0' },
    { id: 'EMR_008', domain: 'behavioral', category: 'emotional_regulation', name: 'Inability to conform to social norms or rules', description: 'Persistent failure to conform to social norms with respect to lawful behaviors, as indicated by repeatedly performing acts that are grounds for arrest or violating rules.', synonyms: ['breaking rules', 'disregard for norms', 'lawlessness', 'rule breaking', 'antisocial behavior', 'defiance', 'disregard for law'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 111, is_active: true, version: '1.2.0' },
    { id: 'MOD_010', domain: 'emotional', category: 'mood', name: 'Hypomanic symptoms (elevated mood, increased activity)', description: 'A distinct period of abnormally and persistently elevated, expansive, or irritable mood, and abnormally increased goal-directed activity or energy, less severe than mania.', synonyms: ['hypomania', 'elevated mood', 'increased energy', 'more active than usual', 'high but not manic', 'upbeat period', 'energized mood'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 112, is_active: true, version: '1.2.0' },
    { id: 'MOD_011', domain: 'emotional', category: 'mood', name: 'Envy of others or belief others are envious', description: 'Persistent envy of others\' possessions, achievements, or qualities, or belief that others are envious of oneself.', synonyms: ['envious', 'jealous of others', 'others are jealous of me', 'resentment of others success', 'covetous', 'competitive jealousy'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 113, is_active: true, version: '1.2.0' },
    { id: 'PRC_008', domain: 'cognitive', category: 'perception', name: 'Identity confusion or switching between identities', description: 'Experiencing oneself as having two or more distinct personality states or an experience of possession, with discontinuity in sense of self and agency.', synonyms: ['switching', 'different personalities', 'identity switching', 'alters', 'multiple selves', 'losing time', 'becoming someone else', 'identity states'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: true, red_flag_level: 'URGENT', severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 114, is_active: true, version: '1.2.0' },
    { id: 'PRC_009', domain: 'cognitive', category: 'perception', name: 'Dissociative amnesia or memory gaps', description: 'Recurrent gaps in the recall of everyday events, important personal information, and/or traumatic events that are inconsistent with ordinary forgetting.', synonyms: ['memory gaps', 'losing time', 'cant remember periods', 'blackouts', 'amnesia episodes', 'missing time', 'gaps in memory'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 7, severity_red_flag_level: 'URGENT', display_order: 115, is_active: true, version: '1.2.0' },
    { id: 'PRC_010', domain: 'cognitive', category: 'perception', name: 'Detachment from surroundings (derealization)', description: 'Experiences of unreality or detachment with respect to surroundings (e.g., people or objects are experienced as unreal, dreamlike, or distorted).', synonyms: ['world feels unreal', 'dreamlike state', 'surroundings distorted', 'detached from environment', 'reality feels off', 'living in a fog', 'unreality'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 116, is_active: true, version: '1.2.0' },
    { id: 'COG_012', domain: 'cognitive', category: 'cognition', name: 'Difficulty trusting others or suspiciousness', description: 'A pervasive distrust and suspiciousness of others such that their motives are interpreted as malevolent, without sufficient basis.', synonyms: ['cant trust anyone', 'suspicious', 'distrustful', 'paranoid about others', 'trust issues', 'questioning motives', 'wary of people'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 117, is_active: true, version: '1.2.0' },
    { id: 'COG_013', domain: 'cognitive', category: 'cognition', name: 'Emotional dysregulation or affect instability', description: 'Marked difficulty regulating emotions, resulting in emotional responses that are out of proportion to the situation or rapidly shifting emotional states.', synonyms: ['cant control emotions', 'emotional instability', 'affect dysregulation', 'emotions all over', 'reactive emotions', 'mood volatility', 'emotional chaos'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 118, is_active: true, version: '1.2.0' },
    { id: 'SOC_009', domain: 'behavioral', category: 'social', name: 'Detachment from social relationships or preference for solitude', description: 'A pervasive pattern of detachment from social relationships and a restricted range of expression of emotions in interpersonal settings; neither desires nor enjoys close relationships.', synonyms: ['prefer to be alone', 'no interest in relationships', 'detached from people', 'social indifference', 'loner', 'solitary', 'emotionally distant'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 119, is_active: true, version: '1.2.0' },
    { id: 'ACT_009', domain: 'behavioral', category: 'activity_level', name: 'Reckless or irresponsible behavior', description: 'A pattern of behavior showing disregard for safety of self or others, including reckless driving, unsafe sexual behavior, or financial irresponsibility.', synonyms: ['reckless', 'dangerous behavior', 'unsafe actions', 'irresponsible choices', 'disregard for safety', 'risky behavior', 'careless actions'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 8, severity_red_flag_level: 'WATCH', display_order: 120, is_active: true, version: '1.2.0' },
    { id: 'ACT_010', domain: 'behavioral', category: 'activity_level', name: 'Lying, manipulation, or deceitfulness', description: 'Repeated lying, use of aliases, or conning others for personal profit or pleasure; manipulating others to get one\'s needs met.', synonyms: ['lying', 'deceitful', 'manipulative', 'con artist', 'dishonest', 'using people', 'exploitation'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 121, is_active: true, version: '1.2.0' },
    { id: 'SLP_006', domain: 'physical', category: 'sleep', name: 'Excessive daytime sleepiness or sleep attacks', description: 'Overwhelming need to sleep during the day despite adequate nighttime sleep, including sudden, irresistible sleep episodes.', synonyms: ['always sleepy', 'daytime sleep attacks', 'falling asleep during day', 'constant drowsiness', 'cant stay awake', 'sleep attacks', 'irresistible sleep'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 8, severity_red_flag_level: 'WATCH', display_order: 122, is_active: true, version: '1.2.0' },
    { id: 'SLP_007', domain: 'physical', category: 'sleep', name: 'Difficulty waking or sleep inertia', description: 'Extreme difficulty waking from sleep, prolonged confusion or disorientation upon waking, or taking hours to feel fully alert.', synonyms: ['cant wake up', 'sleep inertia', 'groggy for hours', 'confused when waking', 'prolonged waking', 'sleep drunk', 'hard to rouse'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 123, is_active: true, version: '1.2.0' },
    { id: 'SLP_008', domain: 'physical', category: 'sleep', name: 'Long sleep duration (10+ hours)', description: 'Regularly sleeping 10 or more hours per night yet still feeling unrefreshed or needing naps during the day.', synonyms: ['sleeping too long', 'extended sleep', '10 plus hours sleep', 'long sleep need', 'hypersomnia', 'oversleeping daily'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: null, severity_red_flag_level: null, display_order: 124, is_active: true, version: '1.2.0' },
    { id: 'APT_005', domain: 'physical', category: 'appetite_weight', name: 'Food avoidance due to sensory characteristics', description: 'Avoidance of eating based on sensory characteristics of food (appearance, color, smell, texture, temperature, taste) resulting in nutritional deficiency or dependence on supplements.', synonyms: ['picky eater', 'texture aversion', 'sensory food issues', 'limited food repertoire', 'avoiding foods by texture', 'food selectivity', 'sensory eating'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 7, severity_red_flag_level: 'WATCH', display_order: 125, is_active: true, version: '1.2.0' },
    { id: 'APT_006', domain: 'physical', category: 'appetite_weight', name: 'Fear of aversive consequences of eating', description: 'Avoidance of eating based on concern about aversive consequences of eating, such as choking, vomiting, or gastrointestinal distress, not related to weight or body image concerns.', synonyms: ['fear of choking', 'fear of vomiting', 'eating causes anxiety', 'fear of GI symptoms', 'scared to eat', 'eating phobia', 'avoidance from fear'], ask_duration: true, ask_severity: true, ask_frequency: true, is_red_flag: false, red_flag_level: null, severity_red_flag_threshold: 7, severity_red_flag_level: 'WATCH', display_order: 126, is_active: true, version: '1.2.0' },
];

// ── Conditions (49 total: 40 base + 9 Phase 4) ───────────────────────────────
const conditions: ConditionWithMappings[] = [
    // 1. MDE — Major Depressive Episode
    {
        id: 'MDE', name: 'Depression', full_name: 'Major Depressive Episode', category: 'mood',
        description_for_user: 'A pattern of persistent low mood, reduced energy, and diminished interest that some people experience. These experiences may be related to what mental health professionals call a major depressive episode.',
        minimum_duration: '2_weeks', minimum_duration_display: 'At least 2 weeks', minimum_symptoms_for_relevance: 5,
        always_recommend_professional: true, guide_path: '/learn/conditions/depression', coping_path: '/learn/coping/depression-strategies',
        provider_questions: ['Could my symptoms indicate depression?', 'What treatment options are available for persistent low mood?', 'Would therapy, medication, or a combination be appropriate for me?'],
        clinical_notes: 'Based on DSM-5 criteria for Major Depressive Disorder (296.xx).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'MOD_001', weight: 3, role: 'core' }, { symptom_id: 'MOD_002', weight: 3, role: 'core' }, { symptom_id: 'MOD_003', weight: 3, role: 'core' }, { symptom_id: 'ENR_001', weight: 3, role: 'core' }, { symptom_id: 'SLP_001', weight: 3, role: 'core' },
            { symptom_id: 'MOD_004', weight: 2, role: 'common' }, { symptom_id: 'MOD_006', weight: 2, role: 'common' }, { symptom_id: 'MOD_007', weight: 2, role: 'common' }, { symptom_id: 'COG_001', weight: 2, role: 'common' }, { symptom_id: 'SLP_002', weight: 2, role: 'common' }, { symptom_id: 'APT_001', weight: 2, role: 'common' }, { symptom_id: 'APT_002', weight: 2, role: 'common' },
            { symptom_id: 'MOD_005', weight: 1, role: 'associated' }, { symptom_id: 'MOD_008', weight: 1, role: 'associated' }, { symptom_id: 'ENR_003', weight: 1, role: 'associated' }, { symptom_id: 'COG_003', weight: 1, role: 'associated' }, { symptom_id: 'COG_006', weight: 1, role: 'associated' }, { symptom_id: 'COG_007', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'ACT_001', weight: 1, role: 'associated' }, { symptom_id: 'ENR_004', weight: 1, role: 'associated' }, { symptom_id: 'BDY_002', weight: 1, role: 'associated' }, { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'COG_008', note: 'Self-harm ideation warrants immediate safety assessment' }, { symptom_id: 'COG_009', note: 'Suicidal ideation requires immediate crisis intervention' }],
    },
    // 2. PDD — Persistent Depressive Disorder
    {
        id: 'PDD', name: 'Persistent Low Mood', full_name: 'Persistent Depressive Disorder (Dysthymia)', category: 'mood',
        description_for_user: 'A pattern of chronically low mood lasting for an extended period. While less intense than acute depression, this persistent experience can significantly impact daily life.',
        minimum_duration: '2_years', minimum_duration_display: 'At least 2 years', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: false, guide_path: '/learn/conditions/persistent-depression', coping_path: '/learn/coping/chronic-mood-strategies',
        provider_questions: ['Could my long-term low mood be dysthymia?', 'What treatments work best for persistent depressive symptoms?'],
        clinical_notes: 'Based on DSM-5 criteria for Persistent Depressive Disorder (300.4).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'MOD_001', weight: 3, role: 'core' }, { symptom_id: 'MOD_003', weight: 3, role: 'core' }, { symptom_id: 'ENR_001', weight: 3, role: 'core' },
            { symptom_id: 'MOD_007', weight: 2, role: 'common' }, { symptom_id: 'MOD_004', weight: 2, role: 'common' }, { symptom_id: 'SLP_001', weight: 2, role: 'common' }, { symptom_id: 'SLP_002', weight: 2, role: 'common' }, { symptom_id: 'APT_001', weight: 2, role: 'common' }, { symptom_id: 'COG_001', weight: 2, role: 'common' },
            { symptom_id: 'MOD_002', weight: 1, role: 'associated' }, { symptom_id: 'MOD_008', weight: 1, role: 'associated' }, { symptom_id: 'COG_006', weight: 1, role: 'associated' }, { symptom_id: 'COG_007', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'ACT_001', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'COG_008', note: null }, { symptom_id: 'COG_009', note: null }],
    },
    // 3. GAD — Generalized Anxiety Disorder
    {
        id: 'GAD', name: 'Generalized Anxiety', full_name: 'Generalized Anxiety Disorder', category: 'anxiety',
        description_for_user: 'A pattern of persistent, excessive worry across many areas of life that may feel difficult to control.',
        minimum_duration: '6_months', minimum_duration_display: 'At least 6 months', minimum_symptoms_for_relevance: 4,
        always_recommend_professional: false, guide_path: '/learn/conditions/anxiety', coping_path: '/learn/coping/anxiety-strategies',
        provider_questions: ['Could my persistent worry indicate an anxiety disorder?', 'What are the most effective treatments for generalized anxiety?'],
        clinical_notes: 'Based on DSM-5 criteria for GAD (300.02).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'ANX_001', weight: 3, role: 'core' }, { symptom_id: 'ANX_008', weight: 3, role: 'core' }, { symptom_id: 'EMR_002', weight: 3, role: 'core' },
            { symptom_id: 'BDY_001', weight: 2, role: 'common' }, { symptom_id: 'SLP_001', weight: 2, role: 'common' }, { symptom_id: 'ENR_002', weight: 2, role: 'common' }, { symptom_id: 'COG_001', weight: 2, role: 'common' }, { symptom_id: 'COG_002', weight: 2, role: 'common' },
            { symptom_id: 'BDY_002', weight: 1, role: 'associated' }, { symptom_id: 'BDY_009', weight: 1, role: 'associated' }, { symptom_id: 'ANX_005', weight: 1, role: 'associated' }, { symptom_id: 'COG_003', weight: 1, role: 'associated' }, { symptom_id: 'COG_006', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'ACT_001', weight: 1, role: 'associated' }, { symptom_id: 'ANX_007', weight: 1, role: 'associated' }, { symptom_id: 'BDY_003', weight: 1, role: 'associated' }, { symptom_id: 'EMR_001', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 4. PD — Panic Disorder
    {
        id: 'PD', name: 'Panic', full_name: 'Panic Disorder', category: 'anxiety',
        description_for_user: 'Recurring unexpected episodes of intense fear accompanied by strong physical sensations.',
        minimum_duration: '1_month', minimum_duration_display: 'At least 1 month', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: false, guide_path: '/learn/conditions/panic-disorder', coping_path: '/learn/coping/panic-strategies',
        provider_questions: ['Could my sudden fear episodes be panic attacks?', 'What treatments are most effective for recurrent panic?'],
        clinical_notes: 'Based on DSM-5 criteria for Panic Disorder (300.01).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'ANX_002', weight: 3, role: 'core' }, { symptom_id: 'BDY_003', weight: 3, role: 'core' }, { symptom_id: 'ANX_006', weight: 3, role: 'core' },
            { symptom_id: 'BDY_004', weight: 2, role: 'common' }, { symptom_id: 'BDY_005', weight: 2, role: 'common' }, { symptom_id: 'BDY_006', weight: 2, role: 'common' }, { symptom_id: 'BDY_007', weight: 2, role: 'common' }, { symptom_id: 'BDY_008', weight: 2, role: 'common' },
            { symptom_id: 'ANX_001', weight: 1, role: 'associated' }, { symptom_id: 'CPG_001', weight: 1, role: 'associated' }, { symptom_id: 'SOC_002', weight: 1, role: 'associated' }, { symptom_id: 'ANX_007', weight: 1, role: 'associated' }, { symptom_id: 'BDY_009', weight: 1, role: 'associated' }, { symptom_id: 'COG_001', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 5. SAD — Social Anxiety Disorder
    {
        id: 'SAD', name: 'Social Anxiety', full_name: 'Social Anxiety Disorder', category: 'anxiety',
        description_for_user: 'Intense fear or anxiety about social situations where one might feel scrutinized or judged.',
        minimum_duration: '6_months', minimum_duration_display: 'At least 6 months', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: false, guide_path: '/learn/conditions/social-anxiety', coping_path: '/learn/coping/social-anxiety-strategies',
        provider_questions: ['Could my fear of social situations be social anxiety disorder?', 'What therapies are most effective for social anxiety?'],
        clinical_notes: 'Based on DSM-5 criteria for Social Anxiety Disorder (300.23).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'ANX_004', weight: 3, role: 'core' }, { symptom_id: 'SOC_002', weight: 3, role: 'core' }, { symptom_id: 'ANX_006', weight: 2, role: 'core' },
            { symptom_id: 'MOD_007', weight: 2, role: 'common' }, { symptom_id: 'EMR_006', weight: 2, role: 'common' }, { symptom_id: 'BDY_008', weight: 2, role: 'common' }, { symptom_id: 'BDY_003', weight: 2, role: 'common' }, { symptom_id: 'COG_007', weight: 2, role: 'common' },
            { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'BDY_007', weight: 1, role: 'associated' }, { symptom_id: 'BDY_009', weight: 1, role: 'associated' }, { symptom_id: 'CPG_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_003', weight: 1, role: 'associated' }, { symptom_id: 'ANX_001', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 6. PTSD — Post-Traumatic Stress Disorder
    {
        id: 'PTSD', name: 'Trauma Response', full_name: 'Post-Traumatic Stress Disorder', category: 'trauma',
        description_for_user: 'A pattern of re-experiencing, avoidance, and heightened alertness that can develop after exposure to traumatic events.',
        minimum_duration: '1_month', minimum_duration_display: 'At least 1 month', minimum_symptoms_for_relevance: 4,
        always_recommend_professional: true, guide_path: '/learn/conditions/ptsd', coping_path: '/learn/coping/trauma-strategies',
        provider_questions: ['Could my symptoms be related to a past traumatic experience?', 'What are the most effective evidence-based treatments for trauma?'],
        clinical_notes: 'Based on DSM-5 criteria for PTSD (309.81).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'COG_005', weight: 3, role: 'core' }, { symptom_id: 'EMR_003', weight: 3, role: 'core' }, { symptom_id: 'ANX_005', weight: 3, role: 'core' }, { symptom_id: 'CPG_001', weight: 3, role: 'core' },
            { symptom_id: 'SLP_004', weight: 2, role: 'common' }, { symptom_id: 'SLP_001', weight: 2, role: 'common' }, { symptom_id: 'SLP_003', weight: 2, role: 'common' }, { symptom_id: 'EMR_002', weight: 2, role: 'common' }, { symptom_id: 'MOD_004', weight: 2, role: 'common' }, { symptom_id: 'COG_004', weight: 2, role: 'common' },
            { symptom_id: 'PRC_001', weight: 1, role: 'associated' }, { symptom_id: 'PRC_002', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'BDY_001', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_001', weight: 1, role: 'associated' }, { symptom_id: 'ACT_002', weight: 1, role: 'associated' }, { symptom_id: 'ANX_002', weight: 1, role: 'associated' }, { symptom_id: 'BDY_008', weight: 1, role: 'associated' }, { symptom_id: 'COG_003', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 7. OCD — Obsessive-Compulsive Disorder
    {
        id: 'OCD', name: 'OCD Patterns', full_name: 'Obsessive-Compulsive Disorder', category: 'obsessive_compulsive',
        description_for_user: 'A pattern of unwanted, intrusive thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) performed to reduce distress.',
        minimum_duration: '2_weeks', minimum_duration_display: 'At least 2 weeks', minimum_symptoms_for_relevance: 2,
        always_recommend_professional: false, guide_path: '/learn/conditions/ocd', coping_path: '/learn/coping/ocd-strategies',
        provider_questions: ['Could my repetitive thoughts and behaviors indicate OCD?', 'What is ERP therapy and would it help me?'],
        clinical_notes: 'Based on DSM-5 criteria for OCD (300.3).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'COG_005', weight: 3, role: 'core' }, { symptom_id: 'CPG_002', weight: 3, role: 'core' }, { symptom_id: 'CPG_007', weight: 3, role: 'core' },
            { symptom_id: 'ANX_001', weight: 2, role: 'common' }, { symptom_id: 'ANX_006', weight: 2, role: 'common' }, { symptom_id: 'COG_007', weight: 2, role: 'common' }, { symptom_id: 'CPG_001', weight: 2, role: 'common' },
            { symptom_id: 'SLP_001', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_001', weight: 1, role: 'associated' }, { symptom_id: 'CPG_008', weight: 1, role: 'associated' }, { symptom_id: 'ACT_006', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 8. BIP — Bipolar Disorder
    {
        id: 'BIP', name: 'Bipolar Patterns', full_name: 'Bipolar Disorder', category: 'mood',
        description_for_user: 'A pattern involving significant shifts in mood, energy, and activity levels — including periods of unusually elevated mood and periods of depression.',
        minimum_duration: '1_week', minimum_duration_display: 'At least 1 week for elevated episodes', minimum_symptoms_for_relevance: 4,
        always_recommend_professional: true, guide_path: '/learn/conditions/bipolar', coping_path: '/learn/coping/bipolar-strategies',
        provider_questions: ['Could my mood swings indicate a bipolar spectrum condition?', 'What treatment approaches are most effective for mood instability?'],
        clinical_notes: 'Based on DSM-5 criteria for Bipolar I/II Disorder (296.xx).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'EMR_001', weight: 3, role: 'core' }, { symptom_id: 'EMR_004', weight: 3, role: 'core' }, { symptom_id: 'MOD_001', weight: 3, role: 'core' },
            { symptom_id: 'SLP_001', weight: 2, role: 'common' }, { symptom_id: 'SLP_002', weight: 2, role: 'common' }, { symptom_id: 'COG_002', weight: 2, role: 'common' }, { symptom_id: 'ENR_002', weight: 2, role: 'common' }, { symptom_id: 'ACT_004', weight: 2, role: 'common' }, { symptom_id: 'ACT_005', weight: 2, role: 'common' },
            { symptom_id: 'MOD_003', weight: 1, role: 'associated' }, { symptom_id: 'ANX_002', weight: 1, role: 'associated' }, { symptom_id: 'COG_001', weight: 1, role: 'associated' }, { symptom_id: 'SOC_003', weight: 1, role: 'associated' }, { symptom_id: 'CPG_003', weight: 1, role: 'associated' }, { symptom_id: 'MOD_008', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'ACT_006', weight: 1, role: 'associated' }, { symptom_id: 'COG_003', weight: 1, role: 'associated' }, { symptom_id: 'ACT_002', weight: 1, role: 'associated' }, { symptom_id: 'EMR_002', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'COG_008', note: null }, { symptom_id: 'COG_009', note: null }],
    },
    // 9. ADHD — Attention-Deficit/Hyperactivity Disorder
    {
        id: 'ADHD', name: 'ADHD Patterns', full_name: 'Attention-Deficit/Hyperactivity Disorder', category: 'neurodevelopmental',
        description_for_user: 'A pattern of persistent inattention, impulsivity, and/or hyperactivity that affects daily functioning.',
        minimum_duration: '6_months', minimum_duration_display: 'At least 6 months', minimum_symptoms_for_relevance: 5,
        always_recommend_professional: false, guide_path: '/learn/conditions/adhd', coping_path: '/learn/coping/adhd-strategies',
        provider_questions: ['Could my attention and focus difficulties indicate ADHD?', 'What combination of strategies and treatments work best for ADHD?'],
        clinical_notes: 'Based on DSM-5 criteria for ADHD (314.0x).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'COG_001', weight: 3, role: 'core' }, { symptom_id: 'COG_006', weight: 3, role: 'core' }, { symptom_id: 'ACT_004', weight: 3, role: 'core' },
            { symptom_id: 'COG_003', weight: 2, role: 'common' }, { symptom_id: 'COG_004', weight: 2, role: 'common' }, { symptom_id: 'COG_002', weight: 2, role: 'common' }, { symptom_id: 'ENR_002', weight: 2, role: 'common' }, { symptom_id: 'ACT_001', weight: 2, role: 'common' }, { symptom_id: 'ACT_003', weight: 2, role: 'common' },
            { symptom_id: 'EMR_002', weight: 1, role: 'associated' }, { symptom_id: 'MOD_007', weight: 1, role: 'associated' }, { symptom_id: 'SOC_003', weight: 1, role: 'associated' }, { symptom_id: 'ACT_002', weight: 1, role: 'associated' }, { symptom_id: 'ANX_008', weight: 1, role: 'associated' }, { symptom_id: 'EMR_001', weight: 1, role: 'associated' }, { symptom_id: 'SLP_003', weight: 1, role: 'associated' }, { symptom_id: 'CPG_001', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 10. BUR — Burnout Syndrome
    {
        id: 'BUR', name: 'Burnout', full_name: 'Burnout Syndrome', category: 'stress',
        description_for_user: 'A state of physical, emotional, and mental exhaustion resulting from prolonged stress — often work-related.',
        minimum_duration: '3_months', minimum_duration_display: 'At least 3 months', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: false, guide_path: '/learn/conditions/burnout', coping_path: '/learn/coping/burnout-strategies',
        provider_questions: ['Could my exhaustion be related to professional burnout?', 'What changes can help me recover from burnout?'],
        clinical_notes: 'Based on ICD-11 definition of Burnout (QD85).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'ENR_001', weight: 3, role: 'core' }, { symptom_id: 'ENR_005', weight: 3, role: 'core' }, { symptom_id: 'MOD_003', weight: 3, role: 'core' },
            { symptom_id: 'COG_001', weight: 2, role: 'common' }, { symptom_id: 'COG_003', weight: 2, role: 'common' }, { symptom_id: 'MOD_004', weight: 2, role: 'common' }, { symptom_id: 'SLP_001', weight: 2, role: 'common' }, { symptom_id: 'EMR_002', weight: 2, role: 'common' },
            { symptom_id: 'BDY_002', weight: 1, role: 'associated' }, { symptom_id: 'BDY_001', weight: 1, role: 'associated' }, { symptom_id: 'APT_001', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'ACT_002', weight: 1, role: 'associated' }, { symptom_id: 'ANX_008', weight: 1, role: 'associated' }, { symptom_id: 'MOD_007', weight: 1, role: 'associated' }, { symptom_id: 'ACT_006', weight: 1, role: 'associated' }, { symptom_id: 'MOD_005', weight: 1, role: 'associated' }, { symptom_id: 'COG_007', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 11. INS — Insomnia Disorder
    {
        id: 'INS', name: 'Insomnia', full_name: 'Insomnia Disorder', category: 'sleep',
        description_for_user: 'Persistent difficulty with falling asleep, staying asleep, or experiencing unrefreshing sleep despite adequate opportunity.',
        minimum_duration: '3_months', minimum_duration_display: 'At least 3 months', minimum_symptoms_for_relevance: 2,
        always_recommend_professional: false, guide_path: '/learn/conditions/insomnia', coping_path: '/learn/coping/sleep-strategies',
        provider_questions: ['Could my sleep difficulties indicate insomnia disorder?', 'What is CBT-I and would it help me?'],
        clinical_notes: 'Based on DSM-5 criteria for Insomnia Disorder (780.52).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'SLP_001', weight: 3, role: 'core' }, { symptom_id: 'SLP_003', weight: 3, role: 'core' }, { symptom_id: 'SLP_005', weight: 3, role: 'core' },
            { symptom_id: 'ENR_001', weight: 2, role: 'common' }, { symptom_id: 'COG_001', weight: 2, role: 'common' }, { symptom_id: 'COG_003', weight: 2, role: 'common' }, { symptom_id: 'EMR_002', weight: 2, role: 'common' },
            { symptom_id: 'BDY_002', weight: 1, role: 'associated' }, { symptom_id: 'ANX_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_004', weight: 1, role: 'associated' }, { symptom_id: 'ENR_002', weight: 1, role: 'associated' }, { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 12. BED — Binge Eating Disorder
    {
        id: 'BED', name: 'Binge Eating', full_name: 'Binge Eating Disorder', category: 'eating',
        description_for_user: 'Recurring episodes of eating significantly more food than most people would, accompanied by a feeling of loss of control.',
        minimum_duration: '3_months', minimum_duration_display: 'At least 3 months', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: false, guide_path: '/learn/conditions/binge-eating', coping_path: '/learn/coping/eating-strategies',
        provider_questions: ['Could my eating patterns indicate binge eating disorder?', 'What treatments are available for binge eating episodes?'],
        clinical_notes: 'Based on DSM-5 criteria for Binge Eating Disorder (307.51).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'CPG_005', weight: 3, role: 'core' }, { symptom_id: 'APT_002', weight: 3, role: 'core' }, { symptom_id: 'ANX_006', weight: 2, role: 'core' },
            { symptom_id: 'MOD_006', weight: 2, role: 'common' }, { symptom_id: 'EMR_006', weight: 2, role: 'common' }, { symptom_id: 'PRC_005', weight: 2, role: 'common' }, { symptom_id: 'APT_003', weight: 2, role: 'common' },
            { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_007', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'CPG_001', weight: 1, role: 'associated' }, { symptom_id: 'APT_004', weight: 1, role: 'associated' }, { symptom_id: 'MOD_008', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 13. AN — Anorexia Nervosa
    {
        id: 'AN', name: 'Restrictive Eating', full_name: 'Anorexia Nervosa', category: 'eating',
        description_for_user: 'A pattern of significantly restricted food intake, intense fear of weight gain, and distorted body perception.',
        minimum_duration: '3_months', minimum_duration_display: 'At least 3 months', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: true, guide_path: '/learn/conditions/anorexia', coping_path: '/learn/coping/restrictive-eating-strategies',
        provider_questions: ['Could my eating and body image concerns be related to an eating disorder?', 'What does eating disorder treatment typically involve?'],
        clinical_notes: 'Based on DSM-5 criteria for Anorexia Nervosa (307.1).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'CPG_006', weight: 3, role: 'core' }, { symptom_id: 'PRC_005', weight: 3, role: 'core' }, { symptom_id: 'APT_001', weight: 3, role: 'core' },
            { symptom_id: 'APT_003', weight: 2, role: 'common' }, { symptom_id: 'ANX_001', weight: 2, role: 'common' }, { symptom_id: 'ACT_006', weight: 2, role: 'common' }, { symptom_id: 'MOD_006', weight: 2, role: 'common' },
            { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'BDY_006', weight: 1, role: 'associated' }, { symptom_id: 'SLP_001', weight: 1, role: 'associated' }, { symptom_id: 'EMR_006', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_007', weight: 1, role: 'associated' }, { symptom_id: 'COG_005', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 14. SUD — Substance Use Concern
    {
        id: 'SUD', name: 'Substance Use', full_name: 'Substance Use Concern', category: 'substance',
        description_for_user: 'A pattern of substance use that may be affecting your health, relationships, or daily functioning.',
        minimum_duration: '1_month', minimum_duration_display: 'At least 1 month', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: true, guide_path: '/learn/conditions/substance-use', coping_path: '/learn/coping/substance-use-strategies',
        provider_questions: ['Could my substance use patterns be cause for concern?', 'What treatment options are available for substance use issues?'],
        clinical_notes: 'Based on DSM-5 criteria for Substance Use Disorders.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'CPG_003', weight: 3, role: 'core' }, { symptom_id: 'ACT_004', weight: 3, role: 'core' }, { symptom_id: 'ANX_006', weight: 2, role: 'core' },
            { symptom_id: 'SOC_003', weight: 2, role: 'common' }, { symptom_id: 'ACT_002', weight: 2, role: 'common' }, { symptom_id: 'SLP_001', weight: 2, role: 'common' }, { symptom_id: 'MOD_001', weight: 2, role: 'common' }, { symptom_id: 'EMR_002', weight: 2, role: 'common' },
            { symptom_id: 'COG_004', weight: 1, role: 'associated' }, { symptom_id: 'COG_001', weight: 1, role: 'associated' }, { symptom_id: 'BDY_009', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_006', weight: 1, role: 'associated' }, { symptom_id: 'ACT_005', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 15. AGO — Agoraphobia
    {
        id: 'AGO', name: 'Agoraphobia', full_name: 'Agoraphobia', category: 'anxiety',
        description_for_user: 'Intense anxiety about situations where escape might be difficult or help unavailable.',
        minimum_duration: '6_months', minimum_duration_display: 'At least 6 months', minimum_symptoms_for_relevance: 2,
        always_recommend_professional: false, guide_path: '/learn/conditions/agoraphobia', coping_path: '/learn/coping/agoraphobia-strategies',
        provider_questions: ['Could my avoidance of certain places indicate agoraphobia?', 'What is exposure therapy and how does it work?'],
        clinical_notes: 'Based on DSM-5 criteria for Agoraphobia (300.22).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'ANX_003', weight: 3, role: 'core' }, { symptom_id: 'CPG_001', weight: 3, role: 'core' }, { symptom_id: 'ANX_002', weight: 2, role: 'core' },
            { symptom_id: 'ANX_006', weight: 2, role: 'common' }, { symptom_id: 'SOC_002', weight: 2, role: 'common' }, { symptom_id: 'BDY_003', weight: 2, role: 'common' }, { symptom_id: 'BDY_005', weight: 2, role: 'common' },
            { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'ANX_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_002', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_007', weight: 1, role: 'associated' }, { symptom_id: 'BDY_006', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 16. ADJ — Adjustment Disorder
    {
        id: 'ADJ', name: 'Adjustment Difficulty', full_name: 'Adjustment Disorder', category: 'stress',
        description_for_user: 'Emotional or behavioral responses to a stressful life event that are more intense than typically expected.',
        minimum_duration: '1_month', minimum_duration_display: 'Within 3 months of a stressful event', minimum_symptoms_for_relevance: 2,
        always_recommend_professional: false, guide_path: '/learn/conditions/adjustment-disorder', coping_path: '/learn/coping/stress-coping-strategies',
        provider_questions: ['Could my reaction to a recent event be more than typical stress?', 'What coping strategies are most effective during major life changes?'],
        clinical_notes: 'Based on DSM-5 criteria for Adjustment Disorders (309.x).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'ANX_008', weight: 3, role: 'core' }, { symptom_id: 'MOD_001', weight: 3, role: 'core' },
            { symptom_id: 'ANX_001', weight: 2, role: 'common' }, { symptom_id: 'EMR_002', weight: 2, role: 'common' }, { symptom_id: 'SLP_001', weight: 2, role: 'common' }, { symptom_id: 'COG_001', weight: 2, role: 'common' }, { symptom_id: 'SOC_001', weight: 2, role: 'common' },
            { symptom_id: 'MOD_003', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_005', weight: 1, role: 'associated' }, { symptom_id: 'ACT_001', weight: 1, role: 'associated' }, { symptom_id: 'BDY_001', weight: 1, role: 'associated' }, { symptom_id: 'SOC_003', weight: 1, role: 'associated' }, { symptom_id: 'CPG_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_006', weight: 1, role: 'associated' }, { symptom_id: 'MOD_004', weight: 1, role: 'associated' }, { symptom_id: 'BDY_002', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 17. SCZ — Schizophrenia Spectrum
    {
        id: 'SCZ', name: 'Psychotic Experiences', full_name: 'Schizophrenia Spectrum and Other Psychotic Disorders', category: 'psychotic',
        description_for_user: 'Psychotic experiences may include hearing or seeing things others do not, holding beliefs that seem unusual to others, or having difficulty organizing thoughts.',
        minimum_duration: '1_month', minimum_duration_display: 'At least 1 month', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: true, guide_path: '/learn/psychosis', coping_path: '/tools/mood-journal',
        provider_questions: ['Could my experiences involve psychosis?', 'What treatments are available for psychotic symptoms?'],
        clinical_notes: 'DSM-5-TR 295.90. ICD-11 6A20.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'PRC_004', weight: 3, role: 'core' }, { symptom_id: 'PRC_007', weight: 3, role: 'core' }, { symptom_id: 'COG_011', weight: 3, role: 'core' },
            { symptom_id: 'PRC_006', weight: 2, role: 'common' }, { symptom_id: 'PRC_003', weight: 2, role: 'common' }, { symptom_id: 'SOC_001', weight: 2, role: 'common' }, { symptom_id: 'SOC_004', weight: 2, role: 'common' }, { symptom_id: 'MOD_004', weight: 2, role: 'common' }, { symptom_id: 'MOD_003', weight: 2, role: 'common' },
            { symptom_id: 'COG_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_004', weight: 1, role: 'associated' }, { symptom_id: 'SLP_001', weight: 1, role: 'associated' }, { symptom_id: 'SLP_003', weight: 1, role: 'associated' }, { symptom_id: 'ACT_002', weight: 1, role: 'associated' }, { symptom_id: 'ACT_003', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'ANX_005', weight: 1, role: 'associated' }, { symptom_id: 'EMR_005', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'PRC_004', note: 'Hallucinations require urgent evaluation' }, { symptom_id: 'PRC_007', note: 'Delusions require urgent evaluation' }],
    },
    // 18. BPD — Borderline Personality Disorder
    {
        id: 'BPD', name: 'Borderline Personality Patterns', full_name: 'Borderline Personality Disorder', category: 'personality',
        description_for_user: 'Borderline personality patterns involve intense emotions, unstable relationships, and a shifting sense of self.',
        minimum_duration: '1_year', minimum_duration_display: 'At least 1 year', minimum_symptoms_for_relevance: 5,
        always_recommend_professional: true, guide_path: '/learn/personality', coping_path: '/tools/mood-journal',
        provider_questions: ['Could my emotional patterns indicate BPD?', 'What is dialectical behavior therapy?'],
        clinical_notes: 'DSM-5-TR 301.83. ICD-11 6D10.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'EMR_001', weight: 3, role: 'core' }, { symptom_id: 'IDN_001', weight: 3, role: 'core' }, { symptom_id: 'IDN_002', weight: 3, role: 'core' }, { symptom_id: 'SOC_008', weight: 3, role: 'core' },
            { symptom_id: 'IDN_004', weight: 2, role: 'common' }, { symptom_id: 'MOD_008', weight: 2, role: 'common' }, { symptom_id: 'ACT_004', weight: 2, role: 'common' }, { symptom_id: 'EMR_002', weight: 2, role: 'common' }, { symptom_id: 'EMR_006', weight: 2, role: 'common' }, { symptom_id: 'CPG_004', weight: 2, role: 'common' }, { symptom_id: 'SOC_006', weight: 2, role: 'common' },
            { symptom_id: 'EMR_003', weight: 1, role: 'associated' }, { symptom_id: 'EMR_005', weight: 1, role: 'associated' }, { symptom_id: 'PRC_001', weight: 1, role: 'associated' }, { symptom_id: 'PRC_002', weight: 1, role: 'associated' }, { symptom_id: 'PRC_006', weight: 1, role: 'associated' }, { symptom_id: 'ANX_006', weight: 1, role: 'associated' }, { symptom_id: 'CPG_003', weight: 1, role: 'associated' }, { symptom_id: 'SOC_003', weight: 1, role: 'associated' }, { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, { symptom_id: 'SLP_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_007', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'COG_008', note: 'Self-harm ideation requires safety assessment' }, { symptom_id: 'COG_009', note: 'Suicidal ideation elevated in BPD' }, { symptom_id: 'CPG_004', note: 'Active self-harm requires crisis intervention' }],
    },
    // 19. BN — Bulimia Nervosa
    {
        id: 'BN', name: 'Bulimia Nervosa', full_name: 'Bulimia Nervosa', category: 'eating',
        description_for_user: 'Bulimia nervosa involves a cycle of binge eating followed by compensatory behaviors like purging.',
        minimum_duration: '3_months', minimum_duration_display: 'At least 3 months', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: true, guide_path: '/learn/eating-disorders', coping_path: '/tools/mood-journal',
        provider_questions: ['Could my eating patterns indicate bulimia?', 'What treatments are available?'],
        clinical_notes: 'DSM-5-TR 307.51. ICD-11 6B81.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'CPG_005', weight: 3, role: 'core' }, { symptom_id: 'CPG_009', weight: 3, role: 'core' }, { symptom_id: 'PRC_005', weight: 3, role: 'core' },
            { symptom_id: 'CPG_010', weight: 2, role: 'common' }, { symptom_id: 'ANX_006', weight: 2, role: 'common' }, { symptom_id: 'APT_002', weight: 2, role: 'common' }, { symptom_id: 'MOD_006', weight: 2, role: 'common' }, { symptom_id: 'EMR_006', weight: 2, role: 'common' }, { symptom_id: 'APT_004', weight: 2, role: 'common' },
            { symptom_id: 'BDY_009', weight: 1, role: 'associated' }, { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_007', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'ANX_001', weight: 1, role: 'associated' }, { symptom_id: 'BDY_006', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'CPG_009', note: 'Purging carries medical risks' }],
    },
    // 20. PGD — Prolonged Grief Disorder
    {
        id: 'PGD', name: 'Prolonged Grief', full_name: 'Prolonged Grief Disorder', category: 'stress',
        description_for_user: 'Prolonged grief describes persistent, intense grief following the death of someone close.',
        minimum_duration: '1_year', minimum_duration_display: 'At least 12 months', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: false, guide_path: '/learn/grief', coping_path: '/tools/mood-journal',
        provider_questions: ['Could my grief be prolonged grief disorder?', 'What grief-specific therapies exist?'],
        clinical_notes: 'DSM-5-TR (2022). ICD-11 6B42.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'MOD_009', weight: 3, role: 'core' }, { symptom_id: 'MOD_001', weight: 3, role: 'core' }, { symptom_id: 'CPG_001', weight: 3, role: 'core' },
            { symptom_id: 'MOD_004', weight: 2, role: 'common' }, { symptom_id: 'MOD_003', weight: 2, role: 'common' }, { symptom_id: 'IDN_001', weight: 2, role: 'common' }, { symptom_id: 'MOD_008', weight: 2, role: 'common' }, { symptom_id: 'SOC_001', weight: 2, role: 'common' },
            { symptom_id: 'MOD_002', weight: 1, role: 'associated' }, { symptom_id: 'SLP_001', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_001', weight: 1, role: 'associated' }, { symptom_id: 'ANX_001', weight: 1, role: 'associated' }, { symptom_id: 'EMR_002', weight: 1, role: 'associated' }, { symptom_id: 'MOD_005', weight: 1, role: 'associated' }, { symptom_id: 'COG_003', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'COG_009', note: 'Suicidal ideation may co-occur with prolonged grief' }, { symptom_id: 'COG_008', note: 'Self-harm ideation may co-occur with prolonged grief' }],
    },
    // 21. ASD — Autism Spectrum Disorder
    {
        id: 'ASD', name: 'Autism Spectrum', full_name: 'Autism Spectrum Disorder (Adult Presentation)', category: 'neurodevelopmental',
        description_for_user: 'Autism spectrum describes persistent differences in social communication along with restricted or repetitive patterns.',
        minimum_duration: '1_year', minimum_duration_display: 'Lifelong pattern', minimum_symptoms_for_relevance: 4,
        always_recommend_professional: true, guide_path: '/learn/autism', coping_path: '/tools/mood-journal',
        provider_questions: ['Could my social difficulties be related to autism?', 'What does an adult autism assessment involve?'],
        clinical_notes: 'DSM-5-TR 299.00. ICD-11 6A02.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'SOC_007', weight: 3, role: 'core' }, { symptom_id: 'ACT_007', weight: 3, role: 'core' }, { symptom_id: 'ACT_008', weight: 3, role: 'core' },
            { symptom_id: 'SOC_001', weight: 2, role: 'common' }, { symptom_id: 'SOC_003', weight: 2, role: 'common' }, { symptom_id: 'ACT_003', weight: 2, role: 'common' }, { symptom_id: 'COG_001', weight: 2, role: 'common' }, { symptom_id: 'ANX_001', weight: 2, role: 'common' },
            { symptom_id: 'SOC_002', weight: 1, role: 'associated' }, { symptom_id: 'ENR_005', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'ANX_008', weight: 1, role: 'associated' }, { symptom_id: 'SLP_001', weight: 1, role: 'associated' }, { symptom_id: 'EMR_002', weight: 1, role: 'associated' }, { symptom_id: 'MOD_007', weight: 1, role: 'associated' }, { symptom_id: 'SLP_003', weight: 1, role: 'associated' }, { symptom_id: 'COG_003', weight: 1, role: 'associated' }, { symptom_id: 'ACT_006', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 22. BDD — Body Dysmorphic Disorder
    {
        id: 'BDD', name: 'Body Dysmorphic Concern', full_name: 'Body Dysmorphic Disorder', category: 'obsessive_compulsive',
        description_for_user: 'Body dysmorphic concerns involve persistent preoccupation with perceived appearance flaws that others may not notice.',
        minimum_duration: '1_month', minimum_duration_display: 'At least 1 month', minimum_symptoms_for_relevance: 2,
        always_recommend_professional: false, guide_path: '/learn/body-dysmorphia', coping_path: '/tools/mood-journal',
        provider_questions: ['Could my appearance concerns indicate BDD?', 'What treatments help?'],
        clinical_notes: 'DSM-5-TR 300.7. ICD-11 6B21.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'PRC_005', weight: 3, role: 'core' }, { symptom_id: 'CPG_007', weight: 3, role: 'core' },
            { symptom_id: 'COG_005', weight: 2, role: 'common' }, { symptom_id: 'EMR_006', weight: 2, role: 'common' }, { symptom_id: 'ANX_004', weight: 2, role: 'common' }, { symptom_id: 'SOC_002', weight: 2, role: 'common' }, { symptom_id: 'COG_007', weight: 2, role: 'common' }, { symptom_id: 'ANX_001', weight: 2, role: 'common' },
            { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_007', weight: 1, role: 'associated' }, { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, { symptom_id: 'CPG_001', weight: 1, role: 'associated' }, { symptom_id: 'ACT_006', weight: 1, role: 'associated' }, { symptom_id: 'CPG_002', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 23. DPDR — Depersonalization/Derealization Disorder
    {
        id: 'DPDR', name: 'Depersonalization/Derealization', full_name: 'Depersonalization/Derealization Disorder', category: 'dissociative',
        description_for_user: 'Persistent feelings of being detached from your body or that the world is unreal.',
        minimum_duration: '1_month', minimum_duration_display: 'At least 1 month', minimum_symptoms_for_relevance: 2,
        always_recommend_professional: false, guide_path: '/learn/dissociation', coping_path: '/tools/mood-journal',
        provider_questions: ['Are my detachment experiences a disorder?', 'What treatments help?'],
        clinical_notes: 'DSM-5-TR 300.6. ICD-11 6B66.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'PRC_002', weight: 3, role: 'core' }, { symptom_id: 'PRC_001', weight: 3, role: 'core' }, { symptom_id: 'EMR_005', weight: 3, role: 'core' },
            { symptom_id: 'COG_003', weight: 2, role: 'common' }, { symptom_id: 'PRC_003', weight: 2, role: 'common' }, { symptom_id: 'ANX_001', weight: 2, role: 'common' }, { symptom_id: 'COG_004', weight: 2, role: 'common' },
            { symptom_id: 'ANX_006', weight: 1, role: 'associated' }, { symptom_id: 'MOD_004', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'SLP_001', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 24. SPP — Specific Phobia
    {
        id: 'SPP', name: 'Specific Phobia', full_name: 'Specific Phobia', category: 'anxiety',
        description_for_user: 'Intense irrational fear of a specific object or situation leading to avoidance.',
        minimum_duration: '6_months', minimum_duration_display: 'At least 6 months', minimum_symptoms_for_relevance: 2,
        always_recommend_professional: false, guide_path: '/learn/phobias', coping_path: '/tools/mood-journal',
        provider_questions: ['Could my fear be a specific phobia?', 'How does exposure therapy work?'],
        clinical_notes: 'DSM-5-TR 300.29. ICD-11 6B03.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'ANX_003', weight: 3, role: 'core' }, { symptom_id: 'CPG_001', weight: 3, role: 'core' },
            { symptom_id: 'ANX_002', weight: 2, role: 'common' }, { symptom_id: 'BDY_003', weight: 2, role: 'common' }, { symptom_id: 'BDY_007', weight: 2, role: 'common' }, { symptom_id: 'BDY_008', weight: 2, role: 'common' },
            { symptom_id: 'ANX_007', weight: 1, role: 'associated' }, { symptom_id: 'BDY_005', weight: 1, role: 'associated' }, { symptom_id: 'BDY_009', weight: 1, role: 'associated' }, { symptom_id: 'ANX_001', weight: 1, role: 'associated' }, { symptom_id: 'SOC_002', weight: 1, role: 'associated' }, { symptom_id: 'BDY_006', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 25. PMDD — Premenstrual Dysphoric Disorder
    {
        id: 'PMDD', name: 'Premenstrual Dysphoric Disorder', full_name: 'Premenstrual Dysphoric Disorder', category: 'mood',
        description_for_user: 'Significant mood disturbance reliably occurring during the premenstrual phase.',
        minimum_duration: '3_months', minimum_duration_display: 'At least 2 consecutive cycles', minimum_symptoms_for_relevance: 4,
        always_recommend_professional: false, guide_path: '/learn/pmdd', coping_path: '/tools/mood-journal',
        provider_questions: ['Could my cyclical mood changes be PMDD?', 'What treatments are available?'],
        clinical_notes: 'DSM-5-TR 625.4. ICD-11 GA34.41.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'EMR_001', weight: 3, role: 'core' }, { symptom_id: 'EMR_002', weight: 3, role: 'core' }, { symptom_id: 'MOD_001', weight: 3, role: 'core' },
            { symptom_id: 'ANX_001', weight: 2, role: 'common' }, { symptom_id: 'MOD_003', weight: 2, role: 'common' }, { symptom_id: 'COG_001', weight: 2, role: 'common' }, { symptom_id: 'ENR_001', weight: 2, role: 'common' }, { symptom_id: 'APT_002', weight: 2, role: 'common' }, { symptom_id: 'SLP_001', weight: 2, role: 'common' }, { symptom_id: 'SLP_002', weight: 2, role: 'common' },
            { symptom_id: 'ANX_008', weight: 1, role: 'associated' }, { symptom_id: 'BDY_001', weight: 1, role: 'associated' }, { symptom_id: 'SOC_006', weight: 1, role: 'associated' }, { symptom_id: 'MOD_005', weight: 1, role: 'associated' }, { symptom_id: 'MOD_007', weight: 1, role: 'associated' }, { symptom_id: 'COG_003', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 26. SADD — Seasonal Affective Disorder
    {
        id: 'SADD', name: 'Seasonal Mood Pattern', full_name: 'Major Depressive Disorder with Seasonal Pattern', category: 'mood',
        description_for_user: 'Depressive episodes that reliably occur during specific seasons.',
        minimum_duration: '2_weeks', minimum_duration_display: 'At least 2 weeks (recurring seasonally)', minimum_symptoms_for_relevance: 4,
        always_recommend_professional: false, guide_path: '/learn/seasonal-depression', coping_path: '/tools/mood-journal',
        provider_questions: ['Could my seasonal changes be SAD?', 'Would light therapy help?'],
        clinical_notes: 'DSM-5-TR seasonal specifier for MDE.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'MOD_001', weight: 3, role: 'core' }, { symptom_id: 'ENR_006', weight: 3, role: 'core' }, { symptom_id: 'ENR_001', weight: 3, role: 'core' },
            { symptom_id: 'SLP_002', weight: 2, role: 'common' }, { symptom_id: 'APT_002', weight: 2, role: 'common' }, { symptom_id: 'MOD_003', weight: 2, role: 'common' }, { symptom_id: 'APT_003', weight: 2, role: 'common' }, { symptom_id: 'SOC_001', weight: 2, role: 'common' },
            { symptom_id: 'COG_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_003', weight: 1, role: 'associated' }, { symptom_id: 'MOD_002', weight: 1, role: 'associated' }, { symptom_id: 'MOD_007', weight: 1, role: 'associated' }, { symptom_id: 'BDY_001', weight: 1, role: 'associated' }, { symptom_id: 'ACT_001', weight: 1, role: 'associated' }, { symptom_id: 'ENR_003', weight: 1, role: 'associated' }, { symptom_id: 'MOD_005', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'COG_008', note: null }, { symptom_id: 'COG_009', note: null }],
    },
    // 27. HD — Hoarding Disorder
    {
        id: 'HD', name: 'Hoarding Patterns', full_name: 'Hoarding Disorder', category: 'obsessive_compulsive',
        description_for_user: 'Persistent difficulty discarding possessions leading to cluttered living spaces.',
        minimum_duration: '6_months', minimum_duration_display: 'At least 6 months', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: false, guide_path: '/learn/hoarding', coping_path: '/tools/mood-journal',
        provider_questions: ['Could my difficulty discarding things be hoarding disorder?', 'What treatments help?'],
        clinical_notes: 'DSM-5-TR 300.3. ICD-11 6B24.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'CPG_011', weight: 3, role: 'core' }, { symptom_id: 'CPG_012', weight: 3, role: 'core' }, { symptom_id: 'CPG_008', weight: 3, role: 'core' },
            { symptom_id: 'ANX_001', weight: 2, role: 'common' }, { symptom_id: 'COG_006', weight: 2, role: 'common' }, { symptom_id: 'ACT_001', weight: 2, role: 'common' },
            { symptom_id: 'EMR_006', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'SOC_003', weight: 1, role: 'associated' }, { symptom_id: 'ANX_008', weight: 1, role: 'associated' }, { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, { symptom_id: 'ACT_003', weight: 1, role: 'associated' }, { symptom_id: 'COG_005', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 28. SSD — Somatic Symptom Disorder
    {
        id: 'SSD', name: 'Somatic Symptom Concern', full_name: 'Somatic Symptom Disorder', category: 'somatic',
        description_for_user: 'Persistent physical symptoms with excessive health-related thoughts and behaviors.',
        minimum_duration: '6_months', minimum_duration_display: 'At least 6 months', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: false, guide_path: '/learn/somatic-symptoms', coping_path: '/tools/mood-journal',
        provider_questions: ['Could my symptoms be somatic symptom disorder?', 'How is SSD treated?'],
        clinical_notes: 'DSM-5-TR 300.82. ICD-11 6C20.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'SOM_002', weight: 3, role: 'core' }, { symptom_id: 'SOM_001', weight: 3, role: 'core' }, { symptom_id: 'SOM_003', weight: 3, role: 'core' },
            { symptom_id: 'BDY_010', weight: 2, role: 'common' }, { symptom_id: 'ANX_001', weight: 2, role: 'common' }, { symptom_id: 'CPG_007', weight: 2, role: 'common' },
            { symptom_id: 'BDY_001', weight: 1, role: 'associated' }, { symptom_id: 'BDY_009', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'BDY_002', weight: 1, role: 'associated' }, { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_001', weight: 1, role: 'associated' }, { symptom_id: 'SLP_001', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 29. IAD — Illness Anxiety Disorder
    {
        id: 'IAD', name: 'Illness Anxiety', full_name: 'Illness Anxiety Disorder', category: 'somatic',
        description_for_user: 'Persistent preoccupation with having or developing a serious illness despite minimal symptoms.',
        minimum_duration: '6_months', minimum_duration_display: 'At least 6 months', minimum_symptoms_for_relevance: 2,
        always_recommend_professional: false, guide_path: '/learn/health-anxiety', coping_path: '/tools/mood-journal',
        provider_questions: ['Is my health worry illness anxiety disorder?', 'What treatments help?'],
        clinical_notes: 'DSM-5-TR 300.7. ICD-11 6B23.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'SOM_001', weight: 3, role: 'core' }, { symptom_id: 'SOM_003', weight: 3, role: 'core' },
            { symptom_id: 'ANX_001', weight: 2, role: 'common' }, { symptom_id: 'CPG_007', weight: 2, role: 'common' }, { symptom_id: 'ANX_007', weight: 2, role: 'common' }, { symptom_id: 'CPG_001', weight: 2, role: 'common' },
            { symptom_id: 'SLP_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'BDY_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_007', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 30. AVPD — Avoidant Personality Disorder
    {
        id: 'AVPD', name: 'Avoidant Personality Patterns', full_name: 'Avoidant Personality Disorder', category: 'personality',
        description_for_user: 'Pervasive social inhibition, feelings of inadequacy, and hypersensitivity to negative evaluation.',
        minimum_duration: '1_year', minimum_duration_display: 'At least 1 year', minimum_symptoms_for_relevance: 4,
        always_recommend_professional: false, guide_path: '/learn/personality', coping_path: '/tools/mood-journal',
        provider_questions: ['Could my avoidance be avoidant personality?', 'How is AVPD different from social anxiety?'],
        clinical_notes: 'DSM-5-TR 301.82. ICD-11 6D10.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'IDN_003', weight: 3, role: 'core' }, { symptom_id: 'SOC_002', weight: 3, role: 'core' }, { symptom_id: 'ANX_004', weight: 3, role: 'core' },
            { symptom_id: 'SOC_001', weight: 2, role: 'common' }, { symptom_id: 'MOD_007', weight: 2, role: 'common' }, { symptom_id: 'EMR_006', weight: 2, role: 'common' }, { symptom_id: 'SOC_005', weight: 2, role: 'common' }, { symptom_id: 'CPG_001', weight: 2, role: 'common' },
            { symptom_id: 'MOD_003', weight: 1, role: 'associated' }, { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_007', weight: 1, role: 'associated' }, { symptom_id: 'ANX_001', weight: 1, role: 'associated' }, { symptom_id: 'SOC_003', weight: 1, role: 'associated' }, { symptom_id: 'MOD_004', weight: 1, role: 'associated' }, { symptom_id: 'BDY_003', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 31. SEPA — Separation Anxiety Disorder
    {
        id: 'SEPA', name: 'Separation Anxiety', full_name: 'Separation Anxiety Disorder (Adult)', category: 'anxiety',
        description_for_user: 'Excessive fear or anxiety about separation from attachment figures.',
        minimum_duration: '6_months', minimum_duration_display: 'At least 6 months', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: false, guide_path: '/learn/anxiety', coping_path: '/tools/mood-journal',
        provider_questions: ['Could my separation fears be a disorder?', 'What treatments help?'],
        clinical_notes: 'DSM-5-TR 309.21. ICD-11 6B05.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'ANX_009', weight: 3, role: 'core' }, { symptom_id: 'ANX_001', weight: 3, role: 'core' },
            { symptom_id: 'CPG_001', weight: 2, role: 'common' }, { symptom_id: 'SOC_005', weight: 2, role: 'common' }, { symptom_id: 'SLP_004', weight: 2, role: 'common' }, { symptom_id: 'SLP_001', weight: 2, role: 'common' }, { symptom_id: 'BDY_009', weight: 2, role: 'common' },
            { symptom_id: 'ANX_007', weight: 1, role: 'associated' }, { symptom_id: 'BDY_002', weight: 1, role: 'associated' }, { symptom_id: 'ANX_002', weight: 1, role: 'associated' }, { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, { symptom_id: 'SOC_002', weight: 1, role: 'associated' }, { symptom_id: 'ACT_002', weight: 1, role: 'associated' }, { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 32. CYC — Cyclothymic Disorder
    {
        id: 'CYC', name: 'Cyclothymic Mood Pattern', full_name: 'Cyclothymic Disorder', category: 'mood',
        description_for_user: 'A pattern of chronic mood fluctuations between periods of mild depression and mild elevation. While less intense than bipolar disorder, these ongoing shifts can affect daily life and relationships.',
        minimum_duration: '2_years', minimum_duration_display: 'At least 2 years', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: false, guide_path: '/learn/conditions/cyclothymia', coping_path: '/learn/coping/mood-stability',
        provider_questions: ['Could my mood ups and downs be cyclothymia?', 'How is cyclothymic disorder different from bipolar disorder?', 'What treatments help stabilize mood fluctuations?'],
        clinical_notes: 'Based on DSM-5-TR criteria for Cyclothymic Disorder (301.13). ICD-11 6A62.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'MOD_010', weight: 3, role: 'core' }, { symptom_id: 'MOD_008', weight: 3, role: 'core' }, { symptom_id: 'MOD_006', weight: 3, role: 'core' }, { symptom_id: 'ENR_002', weight: 3, role: 'core' }, // MOD_010: Phase 4 augment — hypomanic symptoms
            { symptom_id: 'MOD_001', weight: 2, role: 'common' }, { symptom_id: 'SLP_001', weight: 2, role: 'common' }, { symptom_id: 'SLP_003', weight: 2, role: 'common' }, { symptom_id: 'COG_003', weight: 2, role: 'common' }, { symptom_id: 'ENR_001', weight: 2, role: 'common' },
            { symptom_id: 'MOD_007', weight: 1, role: 'associated' }, { symptom_id: 'ACT_002', weight: 1, role: 'associated' }, { symptom_id: 'ACT_005', weight: 1, role: 'associated' }, { symptom_id: 'SOC_002', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 33. PPD_M — Peripartum/Postpartum Depression
    {
        id: 'PPD_M', name: 'Postpartum Depression', full_name: 'Major Depressive Disorder with Peripartum Onset', category: 'mood',
        description_for_user: 'A pattern of significant mood changes during pregnancy or after childbirth that goes beyond typical adjustment. Many parents experience this, and effective support is available.',
        minimum_duration: '2_weeks', minimum_duration_display: 'At least 2 weeks', minimum_symptoms_for_relevance: 4,
        always_recommend_professional: true, guide_path: '/learn/conditions/postpartum-depression', coping_path: '/learn/coping/postpartum-strategies',
        provider_questions: ['Could what I am feeling be postpartum depression?', 'What treatments are safe during breastfeeding?', 'How can I get support for peripartum mood changes?'],
        clinical_notes: 'Based on DSM-5-TR Major Depressive Disorder with Peripartum Onset specifier. ICD-11 6E20.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'MOD_001', weight: 3, role: 'core' }, { symptom_id: 'MOD_002', weight: 3, role: 'core' }, { symptom_id: 'ANX_001', weight: 3, role: 'core' },
            { symptom_id: 'SLP_001', weight: 2, role: 'common' }, { symptom_id: 'ENR_001', weight: 2, role: 'common' }, { symptom_id: 'EMR_003', weight: 2, role: 'common' }, { symptom_id: 'MOD_004', weight: 2, role: 'common' }, { symptom_id: 'ANX_007', weight: 2, role: 'common' }, { symptom_id: 'COG_005', weight: 2, role: 'common' },
            { symptom_id: 'MOD_005', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_007', weight: 1, role: 'associated' }, { symptom_id: 'COG_001', weight: 1, role: 'associated' }, { symptom_id: 'APT_001', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'COG_008', note: 'Self-harm ideation in peripartum period requires immediate safety assessment' }, { symptom_id: 'COG_009', note: 'Suicidal ideation in peripartum period requires immediate crisis intervention' }],
    },
    // 34. CPTSD — Complex Post-Traumatic Stress Disorder
    {
        id: 'CPTSD', name: 'Complex Trauma Response', full_name: 'Complex Post-Traumatic Stress Disorder', category: 'trauma',
        description_for_user: 'A pattern that can develop after prolonged or repeated traumatic experiences, especially in childhood. Beyond typical trauma responses, it often includes difficulties with emotional regulation, self-perception, and relationships.',
        minimum_duration: '1_month', minimum_duration_display: 'Following prolonged trauma', minimum_symptoms_for_relevance: 5,
        always_recommend_professional: true, guide_path: '/learn/conditions/complex-ptsd', coping_path: '/learn/coping/trauma-strategies',
        provider_questions: ['Could my experiences be related to complex trauma?', 'What is the difference between PTSD and Complex PTSD?', 'What are the best evidence-based treatments for complex trauma?'],
        clinical_notes: 'Based on ICD-11 criteria for Complex PTSD (6B41). Not a separate diagnosis in DSM-5-TR but recognized clinically.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'COG_007', weight: 3, role: 'core' }, { symptom_id: 'PRC_001', weight: 3, role: 'core' }, { symptom_id: 'MOD_008', weight: 3, role: 'core' }, { symptom_id: 'IDN_001', weight: 3, role: 'core' },
            { symptom_id: 'EMR_004', weight: 2, role: 'common' }, { symptom_id: 'EMR_001', weight: 2, role: 'common' }, { symptom_id: 'MOD_009', weight: 2, role: 'common' }, { symptom_id: 'SOC_003', weight: 2, role: 'common' }, { symptom_id: 'SOC_007', weight: 2, role: 'common' }, { symptom_id: 'PRC_002', weight: 2, role: 'common' }, { symptom_id: 'COG_013', weight: 2, role: 'common' }, // COG_013: Phase 4 augment — ICD-11 affect-dysregulation criterion
            { symptom_id: 'MOD_003', weight: 1, role: 'associated' }, { symptom_id: 'SLP_004', weight: 1, role: 'associated' }, { symptom_id: 'CPG_001', weight: 1, role: 'associated' }, { symptom_id: 'CPG_004', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'ANX_005', weight: 1, role: 'associated' }, { symptom_id: 'PRC_009', weight: 1, role: 'associated' }, // PRC_009: Phase 4 augment — dissociative amnesia
        ],
        red_flags: [{ symptom_id: 'COG_008', note: 'Self-harm ideation requires immediate safety assessment' }, { symptom_id: 'COG_009', note: 'Suicidal ideation requires immediate crisis intervention' }],
    },
    // 35. ASD_ACUTE — Acute Stress Disorder
    {
        id: 'ASD_ACUTE', name: 'Acute Stress Response', full_name: 'Acute Stress Disorder', category: 'trauma',
        description_for_user: 'An intense stress response that can occur within the first month after a traumatic event. Many people experience this initially, and it often resolves with support, though some may benefit from professional guidance.',
        minimum_duration: '1_week', minimum_duration_display: '3 days to 1 month after trauma', minimum_symptoms_for_relevance: 4,
        always_recommend_professional: true, guide_path: '/learn/conditions/acute-stress', coping_path: '/learn/coping/trauma-strategies',
        provider_questions: ['Is what I am experiencing a normal response to trauma?', 'Could this develop into PTSD?', 'What early interventions help after a traumatic event?'],
        clinical_notes: 'Based on DSM-5-TR criteria for Acute Stress Disorder (308.3). ICD-11 QE84.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'COG_007', weight: 3, role: 'core' }, { symptom_id: 'PRC_001', weight: 3, role: 'core' }, { symptom_id: 'PRC_002', weight: 3, role: 'core' },
            { symptom_id: 'ANX_005', weight: 2, role: 'common' }, { symptom_id: 'MOD_009', weight: 2, role: 'common' }, { symptom_id: 'SLP_004', weight: 2, role: 'common' }, { symptom_id: 'SLP_001', weight: 2, role: 'common' }, { symptom_id: 'COG_001', weight: 2, role: 'common' }, { symptom_id: 'PRC_009', weight: 2, role: 'common' }, // PRC_009: Phase 4 augment — dissociative amnesia
            { symptom_id: 'ANX_002', weight: 1, role: 'associated' }, { symptom_id: 'EMR_001', weight: 1, role: 'associated' }, { symptom_id: 'ANX_008', weight: 1, role: 'associated' }, { symptom_id: 'MOD_007', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 36. DID — Dissociative Identity Patterns
    {
        id: 'DID', name: 'Dissociative Identity Patterns', full_name: 'Dissociative Identity Disorder', category: 'dissociative',
        description_for_user: 'A pattern involving the experience of two or more distinct identity states, along with gaps in memory for everyday events. This is often associated with early life trauma and is more common than many people realize.',
        minimum_duration: '1_month', minimum_duration_display: 'Recurrent experiences', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: true, guide_path: '/learn/conditions/dissociative-identity', coping_path: '/learn/coping/dissociation-strategies',
        provider_questions: ['Could my experiences of feeling like different people be related to a dissociative condition?', 'What kind of specialist works with dissociative disorders?', 'How is DID assessed and treated?'],
        clinical_notes: 'Based on DSM-5-TR criteria for Dissociative Identity Disorder (300.14). ICD-11 6B64.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'PRC_008', weight: 3, role: 'core' }, { symptom_id: 'PRC_002', weight: 3, role: 'core' }, { symptom_id: 'COG_004', weight: 3, role: 'core' }, { symptom_id: 'IDN_001', weight: 3, role: 'core' }, // PRC_008: Phase 4 augment — identity switching (URGENT)
            { symptom_id: 'COG_007', weight: 2, role: 'common' }, { symptom_id: 'MOD_009', weight: 2, role: 'common' }, { symptom_id: 'SLP_004', weight: 2, role: 'common' }, { symptom_id: 'PRC_005', weight: 2, role: 'common' }, { symptom_id: 'PRC_009', weight: 2, role: 'common' }, { symptom_id: 'COG_013', weight: 2, role: 'common' }, // PRC_009/COG_013: Phase 4 augments
            { symptom_id: 'EMR_005', weight: 1, role: 'associated' }, { symptom_id: 'SOC_002', weight: 1, role: 'associated' }, { symptom_id: 'MOD_008', weight: 1, role: 'associated' }, { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'COG_008', note: 'Self-harm ideation requires immediate safety assessment' }, { symptom_id: 'PRC_008', note: 'Identity switching warrants prompt specialist assessment' }],
    },
    // 37. IED — Intermittent Explosive Disorder
    {
        id: 'IED', name: 'Explosive Anger Patterns', full_name: 'Intermittent Explosive Disorder', category: 'stress',
        description_for_user: 'A pattern of repeated, sudden episodes of impulsive, aggressive, or violent behavior that is out of proportion to the situation. Many people feel remorseful afterward and may benefit from learning about anger management approaches.',
        minimum_duration: '3_months', minimum_duration_display: 'At least 3 months', minimum_symptoms_for_relevance: 2,
        always_recommend_professional: true, guide_path: '/learn/conditions/intermittent-explosive', coping_path: '/learn/coping/anger-management',
        provider_questions: ['Could my anger outbursts indicate intermittent explosive disorder?', 'What treatments are most effective for impulsive aggression?', 'Are there medications that help with explosive anger?'],
        clinical_notes: 'Based on DSM-5-TR criteria for Intermittent Explosive Disorder (312.34). ICD-11 6C73.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'CPG_015', weight: 3, role: 'core' }, { symptom_id: 'EMR_002', weight: 3, role: 'core' }, { symptom_id: 'EMR_001', weight: 3, role: 'core' }, { symptom_id: 'ACT_002', weight: 3, role: 'core' }, // CPG_015: Phase 4 augment — explosive anger (WATCH)
            { symptom_id: 'MOD_007', weight: 2, role: 'common' }, { symptom_id: 'SOC_002', weight: 2, role: 'common' }, { symptom_id: 'MOD_004', weight: 2, role: 'common' }, { symptom_id: 'ACT_009', weight: 2, role: 'common' }, // ACT_009: Phase 4 augment — reckless behavior (WATCH)
            { symptom_id: 'ANX_005', weight: 1, role: 'associated' }, { symptom_id: 'ACT_003', weight: 1, role: 'associated' }, { symptom_id: 'SOC_007', weight: 1, role: 'associated' }, { symptom_id: 'BDY_003', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'COG_010', note: 'Thoughts of harming others require immediate safety assessment' }],
    },
    // 38. GRIEF — Normal Grief / Bereavement
    {
        id: 'GRIEF', name: 'Grief Response', full_name: 'Normal Grief and Bereavement', category: 'stress',
        description_for_user: 'A natural emotional response to significant loss. Grief affects everyone differently and there is no single right way to grieve. While painful, most people gradually adjust with time and support.',
        minimum_duration: '2_weeks', minimum_duration_display: 'Following a loss', minimum_symptoms_for_relevance: 2,
        always_recommend_professional: false, guide_path: '/learn/conditions/grief', coping_path: '/learn/coping/grief-strategies',
        provider_questions: ['Is what I am experiencing a normal part of grief?', 'When should I seek professional support for grief?', 'What resources can help me through this loss?'],
        clinical_notes: 'ICD-11 QE62. Normal bereavement is not a mental disorder but can benefit from support.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'MOD_001', weight: 3, role: 'core' }, { symptom_id: 'EMR_006', weight: 3, role: 'core' }, { symptom_id: 'EMR_003', weight: 3, role: 'core' },
            { symptom_id: 'SLP_001', weight: 2, role: 'common' }, { symptom_id: 'APT_001', weight: 2, role: 'common' }, { symptom_id: 'COG_006', weight: 2, role: 'common' }, { symptom_id: 'SOC_001', weight: 2, role: 'common' },
            { symptom_id: 'MOD_009', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_007', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'COG_009', note: 'Suicidal thoughts during grief require immediate crisis support' }],
    },
    // 39. GAM — Gambling Disorder
    {
        id: 'GAM', name: 'Gambling Concerns', full_name: 'Gambling Disorder', category: 'substance',
        description_for_user: 'A pattern of persistent gambling behavior that leads to significant distress or problems in daily life. Like substance use concerns, this involves difficulty controlling the behavior despite negative consequences.',
        minimum_duration: '1_year', minimum_duration_display: 'At least 12 months', minimum_symptoms_for_relevance: 4,
        always_recommend_professional: true, guide_path: '/learn/conditions/gambling-disorder', coping_path: '/learn/coping/behavioral-addiction',
        provider_questions: ['Could my gambling habits indicate a gambling disorder?', 'What treatments are available for problem gambling?', 'Are there support groups specifically for gambling?'],
        clinical_notes: 'Based on DSM-5-TR criteria for Gambling Disorder (312.31). ICD-11 6C50.', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'ACT_002', weight: 3, role: 'core' }, { symptom_id: 'ACT_005', weight: 3, role: 'core' },
            { symptom_id: 'ANX_001', weight: 2, role: 'common' }, { symptom_id: 'MOD_001', weight: 2, role: 'common' }, { symptom_id: 'MOD_004', weight: 2, role: 'common' }, { symptom_id: 'SOC_002', weight: 2, role: 'common' },
            { symptom_id: 'ACT_001', weight: 1, role: 'associated' }, { symptom_id: 'SLP_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_007', weight: 1, role: 'associated' }, { symptom_id: 'CPG_001', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'COG_009', note: 'Suicidal thoughts in context of gambling losses require immediate crisis support' }],
    },
    // 40. IGD — Internet/Gaming Disorder
    {
        id: 'IGD', name: 'Internet/Gaming Concerns', full_name: 'Internet Gaming Disorder', category: 'substance',
        description_for_user: 'A pattern of persistent gaming or internet use that takes priority over other activities and continues despite negative consequences. This is increasingly recognized as a concern that can significantly affect daily functioning.',
        minimum_duration: '1_year', minimum_duration_display: 'At least 12 months', minimum_symptoms_for_relevance: 5,
        always_recommend_professional: false, guide_path: '/learn/conditions/gaming-disorder', coping_path: '/learn/coping/behavioral-addiction',
        provider_questions: ['Could my gaming or internet use be problematic?', 'What is the difference between heavy use and a disorder?', 'What strategies help manage excessive screen time?'],
        clinical_notes: 'ICD-11 6C51. DSM-5-TR Section III (conditions for further study).', is_active: true, version: '1.0.0',
        symptom_mappings: [
            { symptom_id: 'CPG_008', weight: 3, role: 'core' }, { symptom_id: 'ACT_001', weight: 3, role: 'core' },
            { symptom_id: 'SOC_001', weight: 2, role: 'common' }, { symptom_id: 'SLP_001', weight: 2, role: 'common' }, { symptom_id: 'ENR_005', weight: 2, role: 'common' }, { symptom_id: 'MOD_007', weight: 2, role: 'common' },
            { symptom_id: 'SOC_002', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'ACT_002', weight: 1, role: 'associated' }, { symptom_id: 'CPG_006', weight: 1, role: 'associated' }, { symptom_id: 'ANX_005', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // Phase 4 conditions (synced from 20260303000002). The seed authored its
    // mappings against the test-fixture symptom vocabulary, which assigns DIFFERENT
    // symptoms to the same IDs than production does. Each mapping below was
    // re-mapped by the seed's clinical NAME comment to the matching PRODUCTION
    // symptom ID. Seed references with no clean production equivalent were DROPPED
    // (flagged inline as "// dropped: <name> — no production symptom"). Full
    // crosswalk + flag list lives in the wave completion report.
    // ═══════════════════════════════════════════════════════════════════════════

    // 41. NPD — Narcissistic Personality Disorder
    {
        id: 'NPD', name: 'Narcissistic Personality Patterns', full_name: 'Narcissistic Personality Disorder', category: 'personality',
        description_for_user: 'A pervasive pattern of grandiosity, a need for admiration, and difficulty empathizing with others. People experiencing these patterns may appear confident but often struggle with criticism and maintaining close relationships. This information is educational and not a diagnosis.',
        minimum_duration: '1_year', minimum_duration_display: 'At least 1 year', minimum_symptoms_for_relevance: 5,
        always_recommend_professional: true, guide_path: '/learn/personality', coping_path: '/tools/mood-journal',
        provider_questions: ['Do I often feel I am more special or talented than most people?', 'Do I find it difficult to understand or care about others\' feelings?', 'How do I react when someone criticizes me or doesn\'t recognize my achievements?'],
        clinical_notes: 'Based on DSM-5-TR criteria for Narcissistic Personality Disorder (301.81). ICD-11 6D10 with Narcissistic pattern qualifier.', is_active: true, version: '1.2.0',
        symptom_mappings: [
            { symptom_id: 'IDN_004', weight: 3, role: 'core' }, { symptom_id: 'IDN_006', weight: 3, role: 'core' }, { symptom_id: 'IDN_007', weight: 3, role: 'core' }, { symptom_id: 'SOC_002', weight: 3, role: 'core' },
            { symptom_id: 'MOD_007', weight: 2, role: 'common' }, { symptom_id: 'MOD_011', weight: 2, role: 'common' }, { symptom_id: 'ANX_004', weight: 2, role: 'common' }, { symptom_id: 'COG_011', weight: 2, role: 'common' }, { symptom_id: 'ACT_010', weight: 2, role: 'common' }, // dropped: Splitting (IDN_004 in seed) — no production symptom
            { symptom_id: 'EMR_007', weight: 1, role: 'associated' }, { symptom_id: 'MOD_003', weight: 1, role: 'associated' }, { symptom_id: 'ACT_002', weight: 1, role: 'associated' }, { symptom_id: 'SOC_007', weight: 1, role: 'associated' }, { symptom_id: 'ANX_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_006', weight: 1, role: 'associated' }, { symptom_id: 'CPG_006', weight: 1, role: 'associated' }, { symptom_id: 'IDN_002', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 42. ASPD — Antisocial Personality Disorder
    {
        id: 'ASPD', name: 'Antisocial Personality Patterns', full_name: 'Antisocial Personality Disorder', category: 'personality',
        description_for_user: 'A persistent pattern of disregard for the rights of others, impulsivity, and difficulty maintaining stable relationships or commitments. Professional evaluation is important for understanding these patterns. This information is educational and not a diagnosis.',
        minimum_duration: '1_year', minimum_duration_display: 'At least 1 year (pattern since age 15)', minimum_symptoms_for_relevance: 5,
        always_recommend_professional: true, guide_path: '/learn/personality', coping_path: '/tools/mood-journal',
        provider_questions: ['Do I often find it difficult to follow rules or social norms?', 'Do I find it hard to care about how my actions affect others?', 'Have I been told I am reckless or irresponsible with money, work, or safety?'],
        clinical_notes: 'Based on DSM-5-TR criteria for Antisocial Personality Disorder (301.7). ICD-11 6D10 with Dissocial pattern qualifier.', is_active: true, version: '1.2.0',
        symptom_mappings: [
            { symptom_id: 'IDN_006', weight: 3, role: 'core' }, { symptom_id: 'EMR_008', weight: 3, role: 'core' }, { symptom_id: 'ACT_009', weight: 3, role: 'core' }, { symptom_id: 'ACT_010', weight: 3, role: 'core' },
            { symptom_id: 'MOD_007', weight: 2, role: 'common' }, { symptom_id: 'ACT_002', weight: 2, role: 'common' }, { symptom_id: 'SOC_007', weight: 2, role: 'common' }, { symptom_id: 'ACT_001', weight: 2, role: 'common' }, { symptom_id: 'CPG_001', weight: 2, role: 'common' }, { symptom_id: 'COG_008', weight: 2, role: 'common' },
            { symptom_id: 'MOD_003', weight: 1, role: 'associated' }, { symptom_id: 'COG_012', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'CPG_015', weight: 1, role: 'associated' }, { symptom_id: 'ANX_009', weight: 1, role: 'associated' }, { symptom_id: 'SLP_001', weight: 1, role: 'associated' }, { symptom_id: 'ACT_003', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'COG_008', note: 'Self-harm ideation requires immediate safety assessment' }, { symptom_id: 'COG_010', note: 'Thoughts of harming others require immediate safety assessment' }],
    },
    // 43. DPD — Dependent Personality Disorder
    {
        id: 'DPD', name: 'Dependent Personality Patterns', full_name: 'Dependent Personality Disorder', category: 'personality',
        description_for_user: 'A pervasive and excessive need to be taken care of, leading to submissive, clinging behavior and fears of separation. People experiencing these patterns may struggle with decision-making and asserting themselves. This information is educational and not a diagnosis.',
        minimum_duration: '1_year', minimum_duration_display: 'At least 1 year', minimum_symptoms_for_relevance: 5,
        always_recommend_professional: true, guide_path: '/learn/personality', coping_path: '/tools/mood-journal',
        provider_questions: ['Do I find it very difficult to make everyday decisions without excessive reassurance?', 'Am I afraid to disagree with people because I fear losing their support?', 'Do I feel helpless or anxious when alone?'],
        clinical_notes: 'Based on DSM-5-TR criteria for Dependent Personality Disorder (301.6). ICD-11 6D10 with Dependent pattern qualifier.', is_active: true, version: '1.2.0',
        symptom_mappings: [
            { symptom_id: 'IDN_008', weight: 3, role: 'core' }, { symptom_id: 'EMR_004', weight: 3, role: 'core' }, { symptom_id: 'ANX_004', weight: 3, role: 'core' }, // dropped: Dependence on decisions (SOC_005 in seed) — remaps to IDN_008, already core
            { symptom_id: 'MOD_003', weight: 2, role: 'common' }, { symptom_id: 'ANX_001', weight: 2, role: 'common' }, { symptom_id: 'ANX_008', weight: 2, role: 'common' }, // dropped: Chronic inadequacy, Feeling overwhelmed — no production symptom
            { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, { symptom_id: 'COG_002', weight: 1, role: 'associated' }, { symptom_id: 'PRC_002', weight: 1, role: 'associated' }, { symptom_id: 'CPG_006', weight: 1, role: 'associated' }, { symptom_id: 'SOC_002', weight: 1, role: 'associated' }, { symptom_id: 'EMR_003', weight: 1, role: 'associated' }, { symptom_id: 'BDY_002', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 44. SZPD — Schizoid Personality Disorder
    {
        id: 'SZPD', name: 'Schizoid Personality Patterns', full_name: 'Schizoid Personality Disorder', category: 'personality',
        description_for_user: 'A pervasive pattern of detachment from social relationships and a restricted range of emotional expression. People with these patterns may prefer solitude and appear indifferent to praise or criticism. This information is educational and not a diagnosis.',
        minimum_duration: '1_year', minimum_duration_display: 'At least 1 year', minimum_symptoms_for_relevance: 4,
        always_recommend_professional: false, guide_path: '/learn/personality', coping_path: '/tools/mood-journal',
        provider_questions: ['Do I neither desire nor enjoy close relationships, including family?', 'Do I almost always prefer to do things alone?', 'Do others describe me as cold, aloof, or emotionally distant?'],
        clinical_notes: 'Based on DSM-5-TR criteria for Schizoid Personality Disorder (301.20). ICD-11 6D10 with Schizoid pattern qualifier.', is_active: true, version: '1.2.0',
        symptom_mappings: [
            { symptom_id: 'SOC_009', weight: 3, role: 'core' }, { symptom_id: 'MOD_009', weight: 3, role: 'core' }, { symptom_id: 'SOC_001', weight: 3, role: 'core' }, { symptom_id: 'MOD_002', weight: 3, role: 'core' },
            { symptom_id: 'EMR_007', weight: 2, role: 'common' }, { symptom_id: 'ANX_003', weight: 2, role: 'common' }, { symptom_id: 'PRC_002', weight: 2, role: 'common' }, // dropped: Reduced speech (SOC_004 in seed) — no production symptom
            { symptom_id: 'COG_001', weight: 1, role: 'associated' }, { symptom_id: 'PRC_003', weight: 1, role: 'associated' }, { symptom_id: 'IDN_002', weight: 1, role: 'associated' }, { symptom_id: 'ANX_001', weight: 1, role: 'associated' }, // dropped: Changes in libido, Restricted interests — no production symptom
        ],
        red_flags: [],
    },
    // 45. OSDD — Other Specified Dissociative Disorder
    {
        id: 'OSDD', name: 'Other Dissociative Patterns', full_name: 'Other Specified Dissociative Disorder', category: 'dissociative',
        description_for_user: 'Significant dissociative symptoms — such as identity disturbance, depersonalization, or memory gaps — that cause distress or impairment but do not fully meet criteria for a specific dissociative disorder. Professional evaluation can provide clarity. This information is educational and not a diagnosis.',
        minimum_duration: '1_month', minimum_duration_display: 'At least 1 month', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: true, guide_path: '/learn/dissociation', coping_path: '/tools/mood-journal',
        provider_questions: ['Do I experience significant dissociative symptoms such as feeling detached or memory gaps?', 'Have I experienced trauma or severe stress that may be connected to these symptoms?', 'Do these experiences feel different from my normal state of mind?'],
        clinical_notes: 'Based on DSM-5-TR criteria for Other Specified Dissociative Disorder (300.15). ICD-11 6B6Y.', is_active: true, version: '1.2.0',
        symptom_mappings: [
            { symptom_id: 'PRC_009', weight: 3, role: 'core' }, { symptom_id: 'PRC_002', weight: 3, role: 'core' }, { symptom_id: 'PRC_010', weight: 3, role: 'core' },
            { symptom_id: 'COG_004', weight: 2, role: 'common' }, { symptom_id: 'COG_007', weight: 2, role: 'common' }, { symptom_id: 'IDN_001', weight: 2, role: 'common' }, { symptom_id: 'COG_013', weight: 2, role: 'common' }, { symptom_id: 'PRC_001', weight: 2, role: 'common' },
            { symptom_id: 'SLP_004', weight: 1, role: 'associated' }, { symptom_id: 'SOC_002', weight: 1, role: 'associated' }, { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, { symptom_id: 'ANX_001', weight: 1, role: 'associated' },
        ],
        red_flags: [{ symptom_id: 'PRC_008', note: 'Identity switching warrants prompt specialist assessment' }],
    },
    // 46. TTM — Trichotillomania (Hair-Pulling Disorder)
    {
        id: 'TTM', name: 'Hair-Pulling Patterns', full_name: 'Trichotillomania (Hair-Pulling Disorder)', category: 'obsessive_compulsive',
        description_for_user: 'Recurrent pulling out of one\'s own hair resulting in hair loss, accompanied by repeated attempts to decrease or stop the behavior. Many people experience this pattern, and specialized treatments are available. This information is educational and not a diagnosis.',
        minimum_duration: '6_months', minimum_duration_display: 'At least 6 months', minimum_symptoms_for_relevance: 2,
        always_recommend_professional: false, guide_path: '/learn/ocd', coping_path: '/tools/mood-journal',
        provider_questions: ['Do I repeatedly pull out my hair, resulting in noticeable hair loss?', 'Have I tried to stop or reduce the hair pulling but found it difficult?', 'Do I feel tension or an urge before pulling, or relief afterward?'],
        clinical_notes: 'Based on DSM-5-TR criteria for Trichotillomania (312.39). Classified under Obsessive-Compulsive and Related Disorders. ICD-11 6B25.1.', is_active: true, version: '1.2.0',
        symptom_mappings: [
            { symptom_id: 'CPG_013', weight: 3, role: 'core' }, { symptom_id: 'ANX_001', weight: 3, role: 'core' }, { symptom_id: 'CPG_002', weight: 3, role: 'core' },
            { symptom_id: 'ANX_009', weight: 2, role: 'common' }, { symptom_id: 'COG_005', weight: 2, role: 'common' }, { symptom_id: 'ANX_008', weight: 2, role: 'common' }, // dropped: Shame (EMR_006 in seed) — no production symptom
            { symptom_id: 'MOD_003', weight: 1, role: 'associated' }, { symptom_id: 'CPG_006', weight: 1, role: 'associated' }, { symptom_id: 'ANX_006', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 47. SPD_EXCOR — Excoriation (Skin-Picking) Disorder
    {
        id: 'SPD_EXCOR', name: 'Skin-Picking Patterns', full_name: 'Excoriation (Skin-Picking) Disorder', category: 'obsessive_compulsive',
        description_for_user: 'Recurrent skin picking resulting in skin lesions, accompanied by repeated attempts to decrease or stop the behavior. This pattern is more common than many realize, and effective treatments exist. This information is educational and not a diagnosis.',
        minimum_duration: '6_months', minimum_duration_display: 'At least 6 months', minimum_symptoms_for_relevance: 2,
        always_recommend_professional: false, guide_path: '/learn/ocd', coping_path: '/tools/mood-journal',
        provider_questions: ['Do I repeatedly pick at my skin, resulting in visible lesions or scars?', 'Have I tried to stop or reduce the skin picking but found it difficult?', 'Do I feel tension or an urge before picking, or relief afterward?'],
        clinical_notes: 'Based on DSM-5-TR criteria for Excoriation Disorder (698.4). Classified under Obsessive-Compulsive and Related Disorders. ICD-11 6B25.2.', is_active: true, version: '1.2.0',
        symptom_mappings: [
            { symptom_id: 'CPG_014', weight: 3, role: 'core' }, { symptom_id: 'ANX_001', weight: 3, role: 'core' }, { symptom_id: 'CPG_002', weight: 3, role: 'core' },
            { symptom_id: 'ANX_009', weight: 2, role: 'common' }, { symptom_id: 'COG_005', weight: 2, role: 'common' }, { symptom_id: 'ANX_008', weight: 2, role: 'common' }, // dropped: Shame (EMR_006 in seed) — no production symptom
            { symptom_id: 'MOD_003', weight: 1, role: 'associated' }, { symptom_id: 'PRC_003', weight: 1, role: 'associated' }, { symptom_id: 'ANX_006', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 48. HYPER — Hypersomnolence Disorder
    {
        id: 'HYPER', name: 'Hypersomnolence', full_name: 'Hypersomnolence Disorder', category: 'sleep',
        description_for_user: 'Excessive sleepiness despite a main sleep period of at least 7 hours, with recurrent lapses into sleep within the same day. This excessive sleepiness causes significant distress or impairment. Professional evaluation can identify causes and treatments. This information is educational and not a diagnosis.',
        minimum_duration: '3_months', minimum_duration_display: 'At least 3 months', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: false, guide_path: '/learn/sleep', coping_path: '/tools/sleep-architect',
        provider_questions: ['Do I feel excessively sleepy during the day despite sleeping 7+ hours at night?', 'Do I take long naps during the day but still feel unrefreshed?', 'Have I been evaluated for other sleep disorders like sleep apnea?'],
        clinical_notes: 'Based on DSM-5-TR criteria for Hypersomnolence Disorder (780.54). ICD-11 7A20.', is_active: true, version: '1.2.0',
        symptom_mappings: [
            { symptom_id: 'SLP_006', weight: 3, role: 'core' }, { symptom_id: 'SLP_008', weight: 3, role: 'core' }, { symptom_id: 'SLP_007', weight: 3, role: 'core' },
            { symptom_id: 'ENR_001', weight: 2, role: 'common' }, { symptom_id: 'COG_001', weight: 2, role: 'common' }, { symptom_id: 'ACT_001', weight: 2, role: 'common' }, // dropped: Brain fog, Unrefreshing sleep — no production symptom
            { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, { symptom_id: 'ANX_001', weight: 1, role: 'associated' }, { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
        ],
        red_flags: [],
    },
    // 49. ARFID — Avoidant/Restrictive Food Intake Disorder
    {
        id: 'ARFID', name: 'Avoidant/Restrictive Food Intake', full_name: 'Avoidant/Restrictive Food Intake Disorder', category: 'eating',
        description_for_user: 'An eating or feeding disturbance marked by persistent failure to meet nutritional or energy needs — due to lack of interest in eating, sensory characteristics of food, or concern about aversive consequences — without concern about body weight or shape. This information is educational and not a diagnosis.',
        minimum_duration: '1_month', minimum_duration_display: 'At least 1 month', minimum_symptoms_for_relevance: 3,
        always_recommend_professional: true, guide_path: '/learn/eating-disorders', coping_path: '/tools/mood-journal',
        provider_questions: ['Do I avoid eating certain foods based on their texture, smell, appearance, or taste?', 'Am I afraid of negative consequences from eating, like choking or vomiting?', 'Has my eating pattern led to weight loss or nutritional deficiencies?'],
        clinical_notes: 'Based on DSM-5-TR criteria for Avoidant/Restrictive Food Intake Disorder (307.59). ICD-11 6B83.', is_active: true, version: '1.2.0',
        symptom_mappings: [
            { symptom_id: 'APT_005', weight: 3, role: 'core' }, { symptom_id: 'APT_006', weight: 3, role: 'core' }, { symptom_id: 'APT_001', weight: 3, role: 'core' },
            { symptom_id: 'APT_003', weight: 2, role: 'common' }, { symptom_id: 'ANX_001', weight: 2, role: 'common' }, { symptom_id: 'BDY_002', weight: 2, role: 'common' }, { symptom_id: 'PRC_005', weight: 2, role: 'common' },
            { symptom_id: 'ANX_008', weight: 1, role: 'associated' }, { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, { symptom_id: 'MOD_003', weight: 1, role: 'associated' }, // dropped: Feeling overwhelmed (ANX_008 in seed, assoc) — already mapped above
        ],
        red_flags: [],
    },
];

// ─── Exported Knowledge Base ─────────────────────────────────────────────────

export const mockKnowledgeBase: KnowledgeBase = {
    version: '1.1.0',
    symptoms,
    conditions,
    matchingConfig: {
        confidence_cap: 0.75,
        min_relevance_threshold: 0.08,
        below_minimum_penalty: 0.6,
        max_results: 5,
        min_results: 1,
        max_per_family: 2,
        severity_modifiers: { '1': 0.6, '2-3': 0.8, '4-5': 1.0, '6-7': 1.2, '8-10': 1.4 },
        frequency_modifiers: { rarely: 0.7, sometimes: 1.0, often: 1.2, always: 1.4 },
        duration_modifiers: { below_half: 0.7, half_to_full: 1.0, meets_or_exceeds: 1.3 },
        relevance_display_tiers: {
            high: { min: 0.45, label: 'Highly Relevant', color: '#2563eb' },
            moderate: { min: 0.25, label: 'Moderately Relevant', color: '#7c3aed' },
            low: { min: 0.12, label: 'Possibly Relevant', color: '#6b7280' },
            minimal: { min: 0, label: 'Worth Exploring', color: '#9ca3af' },
        },
        version: '1.2.0',
    },
    crisisResources: {
        US: [
            { id: 'cr-us-988', region_code: 'US', name: '988 Suicide & Crisis Lifeline', type: 'hotline', phone: '988', text_instruction: 'Text 988', url: 'https://988lifeline.org', email: null, description: 'Free, confidential support 24/7.', hours: '24/7', languages: ['English', 'Spanish'], priority: 1, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
            { id: 'cr-us-ctl', region_code: 'US', name: 'Crisis Text Line', type: 'text', phone: null, text_instruction: 'Text HOME to 741741', url: 'https://www.crisistextline.org', email: null, description: 'Free crisis counseling via text message.', hours: '24/7', languages: ['English', 'Spanish'], priority: 2, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
            { id: 'cr-us-samhsa', region_code: 'US', name: 'SAMHSA Helpline', type: 'hotline', phone: '1-800-662-4357', text_instruction: null, url: 'https://www.samhsa.gov/find-help/national-helpline', email: null, description: 'Free treatment referrals and information 24/7.', hours: '24/7', languages: ['English', 'Spanish'], priority: 3, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
        ],
        UK: [
            { id: 'cr-uk-sam', region_code: 'UK', name: 'Samaritans', type: 'hotline', phone: '116 123', text_instruction: null, url: 'https://www.samaritans.org', email: 'jo@samaritans.org', description: 'Free emotional support for anyone in distress.', hours: '24/7', languages: ['English'], priority: 1, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
            { id: 'cr-uk-shout', region_code: 'UK', name: 'Shout', type: 'text', phone: null, text_instruction: 'Text SHOUT to 85258', url: 'https://giveusashout.org', email: null, description: 'Free, confidential crisis text support.', hours: '24/7', languages: ['English'], priority: 2, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
        ],
        CA: [
            { id: 'cr-ca-988', region_code: 'CA', name: 'Talk Suicide Canada', type: 'hotline', phone: '988', text_instruction: 'Text 988', url: 'https://talksuicide.ca', email: null, description: 'Canada-wide crisis support service.', hours: '24/7', languages: ['English', 'French'], priority: 1, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
        ],
        AU: [
            { id: 'cr-au-lifeline', region_code: 'AU', name: 'Lifeline Australia', type: 'hotline', phone: '13 11 14', text_instruction: 'Text 0477 13 11 14', url: 'https://www.lifeline.org.au', email: null, description: 'Crisis support and suicide prevention.', hours: '24/7', languages: ['English'], priority: 1, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
            { id: 'cr-au-bb', region_code: 'AU', name: 'Beyond Blue', type: 'hotline', phone: '1300 22 4636', text_instruction: null, url: 'https://www.beyondblue.org.au', email: null, description: 'Support for anxiety, depression, and suicide prevention.', hours: '24/7', languages: ['English'], priority: 2, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
        ],
        IN: [
            { id: 'cr-in-icall', region_code: 'IN', name: 'iCall', type: 'hotline', phone: '9152987821', text_instruction: null, url: 'https://icallhelpline.org', email: null, description: 'Psychosocial helpline by TISS Mumbai.', hours: 'Mon-Sat 8am-10pm IST', languages: ['English', 'Hindi', 'Marathi'], priority: 1, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
            { id: 'cr-in-vf', region_code: 'IN', name: 'Vandrevala Foundation', type: 'hotline', phone: '1860-2662-345', text_instruction: null, url: 'https://www.vandrevalafoundation.com', email: null, description: 'Mental health helpline.', hours: '24/7', languages: ['English', 'Hindi'], priority: 2, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
        ],
        BD: [
            { id: 'cr-bd-kpr', region_code: 'BD', name: 'Kaan Pete Roi', type: 'hotline', phone: '01779-554391', text_instruction: null, url: 'https://www.kaanpeteroi.com', email: null, description: 'Emotional support helpline for Bangla speakers.', hours: '6pm-10pm BST', languages: ['Bengali', 'English'], priority: 1, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
        ],
        DE: [
            { id: 'cr-de-ts', region_code: 'DE', name: 'Telefonseelsorge', type: 'hotline', phone: '0800 111 0 111', text_instruction: null, url: 'https://www.telefonseelsorge.de', email: null, description: 'Kostenlose Krisenberatung rund um die Uhr.', hours: '24/7', languages: ['German'], priority: 1, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
        ],
        FR: [
            { id: 'cr-fr-sos', region_code: 'FR', name: 'SOS Amitié', type: 'hotline', phone: '09 72 39 40 50', text_instruction: null, url: 'https://www.sos-amitie.com', email: null, description: "Écoute et soutien émotionnel gratuit.", hours: '24/7', languages: ['French'], priority: 1, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
        ],
        BR: [
            { id: 'cr-br-cvv', region_code: 'BR', name: 'CVV — Centro de Valorização da Vida', type: 'hotline', phone: '188', text_instruction: null, url: 'https://www.cvv.org.br', email: null, description: 'Apoio emocional e prevenção do suicídio.', hours: '24/7', languages: ['Portuguese'], priority: 1, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
        ],
        ES: [
            { id: 'cr-es-te', region_code: 'ES', name: 'Teléfono de la Esperanza', type: 'hotline', phone: '717 003 717', text_instruction: null, url: 'https://www.telefonodelaesperanza.org', email: null, description: 'Línea de atención a la conducta suicida.', hours: '24/7', languages: ['Spanish'], priority: 1, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
        ],
        DEFAULT: [
            { id: 'cr-default-bw', region_code: 'DEFAULT', name: 'Befrienders Worldwide', type: 'directory', phone: null, text_instruction: null, url: 'https://www.befrienders.org', email: null, description: 'International directory of emotional support centers.', hours: 'Varies', languages: ['Multiple'], priority: 1, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
            { id: 'cr-default-iasp', region_code: 'DEFAULT', name: 'IASP Crisis Centres', type: 'directory', phone: null, text_instruction: null, url: 'https://www.iasp.info/resources/Crisis_Centres/', email: null, description: 'International Association for Suicide Prevention — global crisis center directory.', hours: 'Varies', languages: ['Multiple'], priority: 2, condition_specific: null, is_active: true, last_verified: '2026-01-01' },
        ],
    },
};
