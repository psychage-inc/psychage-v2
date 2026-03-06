/**
 * Test Helpers for Symptom Navigator Tests
 *
 * Creates a self-contained in-memory knowledge base for testing.
 * This mirrors the seed data structure without requiring a database.
 */

import type {
  ConditionWithMappings,
  CrisisResourcesByRegion,
  KnowledgeBase,
  Symptom,
  SymptomCategory,
  SymptomDomain,
} from '@/lib/navigator/types';
import { DEFAULT_MATCHING_CONFIG } from '@/lib/navigator/utils';

// ─── Known Red Flag IDs ──────────────────────────────────────────────────────

export const CRISIS_SYMPTOM_IDS = ['COG_008', 'COG_009', 'COG_010', 'CPG_004'];
export const URGENT_SYMPTOM_IDS = ['PRC_004', 'PRC_007', 'PRC_008'];

// ─── Symptom Factory ─────────────────────────────────────────────────────────

let orderCounter = 0;

export function createTestSymptom(
  overrides: Partial<Symptom> & { id: string; domain: SymptomDomain; category: SymptomCategory; name: string }
): Symptom {
  orderCounter++;
  return {
    description: `Description for ${overrides.name}`,
    synonyms: [],
    ask_duration: true,
    ask_severity: true,
    ask_frequency: true,
    is_red_flag: false,
    red_flag_level: null,
    severity_red_flag_threshold: null,
    severity_red_flag_level: null,
    display_order: orderCounter,
    is_active: true,
    version: '1.0.0',
    ...overrides,
  };
}

// ─── Full Test Knowledge Base ────────────────────────────────────────────────

export function createTestKnowledgeBase(): KnowledgeBase {
  const symptoms = createAllTestSymptoms();
  const conditions = createAllTestConditions();
  const crisisResources = createTestCrisisResources();

  return {
    version: '1.0.0',
    symptoms,
    conditions,
    matchingConfig: DEFAULT_MATCHING_CONFIG,
    crisisResources,
  };
}

function createAllTestSymptoms(): Symptom[] {
  orderCounter = 0;

  return [
    // ─── Mood (emotional) ──────────────────────────────────────────────────
    createTestSymptom({ id: 'MOD_001', domain: 'emotional', category: 'mood', name: 'Persistent sadness', synonyms: ['feeling sad', 'down', 'depressed mood', 'low mood'] }),
    createTestSymptom({ id: 'MOD_002', domain: 'emotional', category: 'mood', name: 'Hopelessness', synonyms: ['no hope', 'feeling hopeless', 'despair'] }),
    createTestSymptom({ id: 'MOD_003', domain: 'emotional', category: 'mood', name: 'Loss of interest or pleasure', synonyms: ['anhedonia', 'nothing feels good', 'lost interest'] }),
    createTestSymptom({ id: 'MOD_004', domain: 'emotional', category: 'mood', name: 'Emotional numbness', synonyms: ['feeling nothing', 'numb', 'flat affect'] }),
    createTestSymptom({ id: 'MOD_005', domain: 'emotional', category: 'mood', name: 'Unexplained crying', synonyms: ['crying spells', 'tearfulness'] }),
    createTestSymptom({ id: 'MOD_006', domain: 'emotional', category: 'mood', name: 'Guilt or excessive self-blame', synonyms: ['feeling guilty', 'self-blame', 'shame'] }),
    createTestSymptom({ id: 'MOD_007', domain: 'emotional', category: 'mood', name: 'Low self-esteem', synonyms: ['worthlessness', 'feeling worthless', 'low confidence'] }),
    createTestSymptom({ id: 'MOD_008', domain: 'emotional', category: 'mood', name: 'Emptiness', synonyms: ['feeling hollow', 'void', 'empty inside'] }),

    // ─── Anxiety/Fear (emotional) ──────────────────────────────────────────
    createTestSymptom({ id: 'ANX_001', domain: 'emotional', category: 'anxiety_fear', name: 'Excessive worry', synonyms: ['worrying too much', 'constant worry', 'anxious thoughts'] }),
    createTestSymptom({ id: 'ANX_002', domain: 'emotional', category: 'anxiety_fear', name: 'Panic attacks', synonyms: ['panic episode', 'sudden fear', 'anxiety attack'] }),
    createTestSymptom({ id: 'ANX_003', domain: 'emotional', category: 'anxiety_fear', name: 'Fear of specific situations', synonyms: ['phobia', 'irrational fear', 'specific fear'] }),
    createTestSymptom({ id: 'ANX_004', domain: 'emotional', category: 'anxiety_fear', name: 'Social anxiety', synonyms: ['fear of judgment', 'social phobia', 'performance anxiety'] }),
    createTestSymptom({ id: 'ANX_005', domain: 'emotional', category: 'anxiety_fear', name: 'Feeling on edge', synonyms: ['hypervigilance', 'on guard', 'alert', 'startle response'] }),
    createTestSymptom({ id: 'ANX_006', domain: 'emotional', category: 'anxiety_fear', name: 'Fear of losing control', synonyms: ['loss of control', 'going crazy', 'losing grip'] }),
    createTestSymptom({ id: 'ANX_007', domain: 'emotional', category: 'anxiety_fear', name: 'Catastrophic thinking', synonyms: ['worst case scenario', 'doomscrolling', 'expecting disaster'] }),
    createTestSymptom({ id: 'ANX_008', domain: 'emotional', category: 'anxiety_fear', name: 'Feeling overwhelmed', synonyms: ['too much', 'overwhelm', 'cant cope'] }),

    // ─── Emotional Regulation (emotional) ──────────────────────────────────
    createTestSymptom({ id: 'EMR_001', domain: 'emotional', category: 'emotional_regulation', name: 'Mood swings', synonyms: ['emotional ups and downs', 'mood changes', 'unstable mood'] }),
    createTestSymptom({ id: 'EMR_002', domain: 'emotional', category: 'emotional_regulation', name: 'Irritability or anger', synonyms: ['easily annoyed', 'short temper', 'angry', 'snapping'] }),
    createTestSymptom({ id: 'EMR_003', domain: 'emotional', category: 'emotional_regulation', name: 'Emotional flashbacks', synonyms: ['re-experiencing emotions', 'triggered feelings', 'old feelings returning'] }),
    createTestSymptom({ id: 'EMR_004', domain: 'emotional', category: 'emotional_regulation', name: 'Euphoria or unusually elevated mood', synonyms: ['extremely happy', 'manic energy', 'on top of the world'], severity_red_flag_threshold: 7, severity_red_flag_level: 'WATCH' }),
    createTestSymptom({ id: 'EMR_005', domain: 'emotional', category: 'emotional_regulation', name: 'Feeling detached', synonyms: ['depersonalization', 'not real', 'out of body'] }),
    createTestSymptom({ id: 'EMR_006', domain: 'emotional', category: 'emotional_regulation', name: 'Shame', synonyms: ['feeling ashamed', 'deep shame', 'mortified'] }),

    // ─── Body Sensations (physical) ────────────────────────────────────────
    createTestSymptom({ id: 'BDY_001', domain: 'physical', category: 'body_sensations', name: 'Muscle tension or body aches', synonyms: ['tense muscles', 'body pain', 'stiffness'] }),
    createTestSymptom({ id: 'BDY_002', domain: 'physical', category: 'body_sensations', name: 'Headaches', synonyms: ['head pain', 'tension headache', 'migraine'] }),
    createTestSymptom({ id: 'BDY_003', domain: 'physical', category: 'body_sensations', name: 'Heart palpitations', synonyms: ['racing heart', 'pounding heart', 'heart beating fast'], severity_red_flag_threshold: 9, severity_red_flag_level: 'URGENT' }),
    createTestSymptom({ id: 'BDY_004', domain: 'physical', category: 'body_sensations', name: 'Chest tightness', synonyms: ['tight chest', 'chest pressure', 'constricted chest'] }),
    createTestSymptom({ id: 'BDY_005', domain: 'physical', category: 'body_sensations', name: 'Shortness of breath', synonyms: ['cant breathe', 'breathless', 'difficulty breathing'] }),
    createTestSymptom({ id: 'BDY_006', domain: 'physical', category: 'body_sensations', name: 'Dizziness', synonyms: ['lightheaded', 'vertigo', 'woozy'], severity_red_flag_threshold: 9, severity_red_flag_level: 'URGENT' }),
    createTestSymptom({ id: 'BDY_007', domain: 'physical', category: 'body_sensations', name: 'Trembling or shaking', synonyms: ['shaky hands', 'tremors', 'quivering'] }),
    createTestSymptom({ id: 'BDY_008', domain: 'physical', category: 'body_sensations', name: 'Excessive sweating', synonyms: ['sweaty palms', 'cold sweat', 'night sweats'] }),
    createTestSymptom({ id: 'BDY_009', domain: 'physical', category: 'body_sensations', name: 'Nausea or stomach problems', synonyms: ['upset stomach', 'butterflies', 'GI distress'] }),
    createTestSymptom({ id: 'BDY_010', domain: 'physical', category: 'body_sensations', name: 'Chronic pain without clear cause', synonyms: ['unexplained pain', 'psychosomatic pain'] }),

    // ─── Sleep (physical) ──────────────────────────────────────────────────
    createTestSymptom({ id: 'SLP_001', domain: 'physical', category: 'sleep', name: 'Insomnia', synonyms: ['cant sleep', 'difficulty falling asleep', 'sleepless'] }),
    createTestSymptom({ id: 'SLP_002', domain: 'physical', category: 'sleep', name: 'Oversleeping', synonyms: ['sleeping too much', 'hypersomnia', 'excessive sleep'] }),
    createTestSymptom({ id: 'SLP_003', domain: 'physical', category: 'sleep', name: 'Disrupted sleep', synonyms: ['waking up at night', 'broken sleep', 'fragmented sleep'] }),
    createTestSymptom({ id: 'SLP_004', domain: 'physical', category: 'sleep', name: 'Nightmares', synonyms: ['bad dreams', 'night terrors', 'disturbing dreams'] }),
    createTestSymptom({ id: 'SLP_005', domain: 'physical', category: 'sleep', name: 'Restless or unrefreshing sleep', synonyms: ['tired after sleeping', 'poor sleep quality'] }),

    // ─── Appetite/Weight (physical) ────────────────────────────────────────
    createTestSymptom({ id: 'APT_001', domain: 'physical', category: 'appetite_weight', name: 'Loss of appetite', synonyms: ['not hungry', 'no appetite', 'eating less'] }),
    createTestSymptom({ id: 'APT_002', domain: 'physical', category: 'appetite_weight', name: 'Increased appetite', synonyms: ['overeating', 'eating more', 'always hungry'] }),
    createTestSymptom({ id: 'APT_003', domain: 'physical', category: 'appetite_weight', name: 'Unexplained weight changes', synonyms: ['weight gain', 'weight loss', 'body changes'] }),
    createTestSymptom({ id: 'APT_004', domain: 'physical', category: 'appetite_weight', name: 'Distorted relationship with food', synonyms: ['food anxiety', 'food obsession', 'disordered eating'] }),

    // ─── Energy (physical) ─────────────────────────────────────────────────
    createTestSymptom({ id: 'ENR_001', domain: 'physical', category: 'energy', name: 'Fatigue or low energy', synonyms: ['tired', 'exhausted', 'no energy', 'drained'] }),
    createTestSymptom({ id: 'ENR_002', domain: 'physical', category: 'energy', name: 'Restlessness', synonyms: ['cant sit still', 'fidgety', 'agitated'] }),
    createTestSymptom({ id: 'ENR_003', domain: 'physical', category: 'energy', name: 'Psychomotor slowing', synonyms: ['moving slowly', 'sluggish', 'slowed down'] }),
    createTestSymptom({ id: 'ENR_004', domain: 'physical', category: 'energy', name: 'Changes in libido', synonyms: ['low sex drive', 'sexual changes'] }),
    createTestSymptom({ id: 'ENR_005', domain: 'physical', category: 'energy', name: 'Physical exhaustion', synonyms: ['burnout fatigue', 'completely drained', 'bone-tired'] }),

    // ─── Cognition (cognitive) ─────────────────────────────────────────────
    createTestSymptom({ id: 'COG_001', domain: 'cognitive', category: 'cognition', name: 'Difficulty concentrating', synonyms: ['cant focus', 'distracted', 'attention problems'] }),
    createTestSymptom({ id: 'COG_002', domain: 'cognitive', category: 'cognition', name: 'Racing thoughts', synonyms: ['mind racing', 'thoughts wont stop', 'mental overload'] }),
    createTestSymptom({ id: 'COG_003', domain: 'cognitive', category: 'cognition', name: 'Brain fog', synonyms: ['mental confusion', 'foggy thinking', 'unclear mind'] }),
    createTestSymptom({ id: 'COG_004', domain: 'cognitive', category: 'cognition', name: 'Memory problems', synonyms: ['forgetful', 'cant remember', 'memory lapses'] }),
    createTestSymptom({ id: 'COG_005', domain: 'cognitive', category: 'cognition', name: 'Intrusive thoughts', synonyms: ['unwanted thoughts', 'obsessive thoughts', 'disturbing thoughts'] }),
    createTestSymptom({ id: 'COG_006', domain: 'cognitive', category: 'cognition', name: 'Indecisiveness', synonyms: ['cant make decisions', 'paralyzed by choices', 'decision fatigue'] }),
    createTestSymptom({ id: 'COG_007', domain: 'cognitive', category: 'cognition', name: 'Negative self-talk', synonyms: ['rumination', 'inner critic', 'self-criticism'] }),
    createTestSymptom({ id: 'COG_008', domain: 'cognitive', category: 'cognition', name: 'Thoughts of self-harm', synonyms: ['hurting myself', 'self-injury thoughts'], is_red_flag: true, red_flag_level: 'CRISIS' }),
    createTestSymptom({ id: 'COG_009', domain: 'cognitive', category: 'cognition', name: 'Suicidal thoughts', synonyms: ['wanting to die', 'suicidal ideation', 'ending life'], is_red_flag: true, red_flag_level: 'CRISIS' }),
    createTestSymptom({ id: 'COG_010', domain: 'cognitive', category: 'cognition', name: 'Thoughts of harming others', synonyms: ['violent thoughts', 'hurting someone'], is_red_flag: true, red_flag_level: 'CRISIS' }),

    // ─── Perception (cognitive) ────────────────────────────────────────────
    createTestSymptom({ id: 'PRC_001', domain: 'cognitive', category: 'perception', name: 'Derealization', synonyms: ['world feels unreal', 'dreamlike state', 'nothing seems real'] }),
    createTestSymptom({ id: 'PRC_002', domain: 'cognitive', category: 'perception', name: 'Depersonalization', synonyms: ['detached from self', 'watching from outside', 'not real'] }),
    createTestSymptom({ id: 'PRC_003', domain: 'cognitive', category: 'perception', name: 'Visual disturbances', synonyms: ['seeing things', 'visual hallucinations'], severity_red_flag_threshold: 7, severity_red_flag_level: 'URGENT' }),
    createTestSymptom({ id: 'PRC_004', domain: 'cognitive', category: 'perception', name: 'Hearing voices or sounds', synonyms: ['auditory hallucinations', 'hearing things'], is_red_flag: true, red_flag_level: 'URGENT' }),
    createTestSymptom({ id: 'PRC_005', domain: 'cognitive', category: 'perception', name: 'Distorted body image', synonyms: ['body dysmorphia', 'body perception', 'dont like body'] }),
    createTestSymptom({ id: 'PRC_006', domain: 'cognitive', category: 'perception', name: 'Paranoid thinking', synonyms: ['paranoia', 'feeling watched', 'people are against me'], severity_red_flag_threshold: 8, severity_red_flag_level: 'URGENT' }),

    // ─── Social (behavioral) ──────────────────────────────────────────────
    createTestSymptom({ id: 'SOC_001', domain: 'behavioral', category: 'social', name: 'Social withdrawal', synonyms: ['isolation', 'avoiding people', 'staying home'] }),
    createTestSymptom({ id: 'SOC_002', domain: 'behavioral', category: 'social', name: 'Avoiding social situations', synonyms: ['social avoidance', 'skipping events'] }),
    createTestSymptom({ id: 'SOC_003', domain: 'behavioral', category: 'social', name: 'Difficulty maintaining relationships', synonyms: ['relationship problems', 'pushing people away'] }),
    createTestSymptom({ id: 'SOC_004', domain: 'behavioral', category: 'social', name: 'Reduced speech', synonyms: ['not talking', 'quiet', 'withdrawn communication'] }),
    createTestSymptom({ id: 'SOC_005', domain: 'behavioral', category: 'social', name: 'Dependence on others', synonyms: ['clingy', 'needing reassurance', 'codependent'] }),
    createTestSymptom({ id: 'SOC_006', domain: 'behavioral', category: 'social', name: 'Conflict in relationships', synonyms: ['fighting', 'arguments', 'aggressive interactions'] }),

    // ─── Coping (behavioral) ──────────────────────────────────────────────
    createTestSymptom({ id: 'CPG_001', domain: 'behavioral', category: 'coping', name: 'Avoidance of triggers', synonyms: ['trigger avoidance', 'avoiding reminders'] }),
    createTestSymptom({ id: 'CPG_002', domain: 'behavioral', category: 'coping', name: 'Compulsive or ritualistic behaviors', synonyms: ['rituals', 'compulsions', 'repetitive behaviors'] }),
    createTestSymptom({ id: 'CPG_003', domain: 'behavioral', category: 'coping', name: 'Substance use to cope', synonyms: ['drinking to cope', 'drug use', 'self-medicating'], severity_red_flag_threshold: 8, severity_red_flag_level: 'URGENT' }),
    createTestSymptom({ id: 'CPG_004', domain: 'behavioral', category: 'coping', name: 'Self-harm behaviors', synonyms: ['cutting', 'self-injury', 'hurting oneself'], is_red_flag: true, red_flag_level: 'CRISIS' }),
    createTestSymptom({ id: 'CPG_005', domain: 'behavioral', category: 'coping', name: 'Binge eating episodes', synonyms: ['binge eating', 'eating too much at once', 'uncontrolled eating'] }),
    createTestSymptom({ id: 'CPG_006', domain: 'behavioral', category: 'coping', name: 'Restricting food intake', synonyms: ['not eating', 'food restriction', 'skipping meals'] }),
    createTestSymptom({ id: 'CPG_007', domain: 'behavioral', category: 'coping', name: 'Excessive checking or reassurance seeking', synonyms: ['double-checking', 'seeking reassurance', 'need to verify'] }),
    createTestSymptom({ id: 'CPG_008', domain: 'behavioral', category: 'coping', name: 'Hoarding behaviors', synonyms: ['collecting things', 'cant throw away', 'accumulating'] }),

    // ─── Activity Level (behavioral) ──────────────────────────────────────
    createTestSymptom({ id: 'ACT_001', domain: 'behavioral', category: 'activity_level', name: 'Procrastination', synonyms: ['putting things off', 'avoidance', 'delaying tasks'] }),
    createTestSymptom({ id: 'ACT_002', domain: 'behavioral', category: 'activity_level', name: 'Neglecting responsibilities', synonyms: ['letting things slide', 'not doing tasks', 'ignoring duties'] }),
    createTestSymptom({ id: 'ACT_003', domain: 'behavioral', category: 'activity_level', name: 'Difficulty maintaining routines', synonyms: ['no routine', 'inconsistent habits', 'disorganized'] }),
    createTestSymptom({ id: 'ACT_004', domain: 'behavioral', category: 'activity_level', name: 'Impulsive decisions', synonyms: ['acting without thinking', 'impulsivity', 'rash choices'] }),
    createTestSymptom({ id: 'ACT_005', domain: 'behavioral', category: 'activity_level', name: 'Risk-taking behavior', synonyms: ['reckless behavior', 'dangerous activities'], severity_red_flag_threshold: 8, severity_red_flag_level: 'WATCH' }),
    createTestSymptom({ id: 'ACT_006', domain: 'behavioral', category: 'activity_level', name: 'Excessive working or perfectionism', synonyms: ['workaholic', 'perfectionist', 'overworking'] }),

    // ─── Identity/Self-Image (behavioral) ───────────────────────────────
    createTestSymptom({ id: 'IDN_001', domain: 'behavioral', category: 'identity_self_image', name: 'Unstable sense of identity', synonyms: ['identity confusion', 'who am I', 'shifting self'] }),
    createTestSymptom({ id: 'IDN_002', domain: 'behavioral', category: 'identity_self_image', name: 'Fear of abandonment', synonyms: ['abandonment anxiety', 'fear of being left', 'clingy'] }),
    createTestSymptom({ id: 'IDN_003', domain: 'behavioral', category: 'identity_self_image', name: 'Chronic feelings of inadequacy', synonyms: ['not good enough', 'inadequate', 'inferior'] }),
    createTestSymptom({ id: 'IDN_004', domain: 'behavioral', category: 'identity_self_image', name: 'Splitting or black-and-white thinking', synonyms: ['all or nothing', 'black and white', 'idealization'] }),

    // ─── Somatic/Health (physical) ──────────────────────────────────────
    createTestSymptom({ id: 'SOM_001', domain: 'physical', category: 'somatic_health', name: 'Excessive worry about health or illness', synonyms: ['health anxiety', 'hypochondria', 'illness worry'] }),
    createTestSymptom({ id: 'SOM_002', domain: 'physical', category: 'somatic_health', name: 'Persistent physical symptoms causing distress', synonyms: ['somatic symptoms', 'unexplained symptoms', 'body distress'] }),
    createTestSymptom({ id: 'SOM_003', domain: 'physical', category: 'somatic_health', name: 'Frequent medical visits or health checking', synonyms: ['doctor shopping', 'health checking', 'medical reassurance'] }),

    // ─── New Coping (behavioral) ────────────────────────────────────────
    createTestSymptom({ id: 'CPG_009', domain: 'behavioral', category: 'coping', name: 'Purging behaviors', synonyms: ['purging', 'self-induced vomiting', 'laxative misuse'], severity_red_flag_threshold: 6, severity_red_flag_level: 'URGENT' }),
    createTestSymptom({ id: 'CPG_010', domain: 'behavioral', category: 'coping', name: 'Excessive exercise to compensate for eating', synonyms: ['compulsive exercise', 'exercise purging', 'over-exercising'] }),
    createTestSymptom({ id: 'CPG_011', domain: 'behavioral', category: 'coping', name: 'Collecting or difficulty discarding possessions', synonyms: ['accumulating', 'collecting compulsion', 'keeping everything'] }),
    createTestSymptom({ id: 'CPG_012', domain: 'behavioral', category: 'coping', name: 'Distress when discarding possessions', synonyms: ['discard anxiety', 'throwing away distress', 'letting go anxiety'] }),

    // ─── New Perception (cognitive) ─────────────────────────────────────
    createTestSymptom({ id: 'PRC_007', domain: 'cognitive', category: 'perception', name: 'Delusions or strongly held false beliefs', synonyms: ['delusional thinking', 'false beliefs', 'fixed beliefs'], is_red_flag: true, red_flag_level: 'URGENT' }),

    // ─── New Social (behavioral) ────────────────────────────────────────
    createTestSymptom({ id: 'SOC_007', domain: 'behavioral', category: 'social', name: 'Difficulty understanding social cues', synonyms: ['social cue difficulty', 'reading people', 'social blindness'] }),
    createTestSymptom({ id: 'SOC_008', domain: 'behavioral', category: 'social', name: 'Intense but unstable relationships', synonyms: ['turbulent relationships', 'unstable bonds', 'love-hate'] }),

    // ─── New Anxiety (emotional) ────────────────────────────────────────
    createTestSymptom({ id: 'ANX_009', domain: 'emotional', category: 'anxiety_fear', name: 'Separation anxiety', synonyms: ['fear of separation', 'separation distress', 'attachment anxiety'] }),
    createTestSymptom({ id: 'ANX_010', domain: 'emotional', category: 'anxiety_fear', name: 'Fear of contamination or germs', synonyms: ['germophobia', 'contamination fear', 'mysophobia'] }),

    // ─── New Mood (emotional) ───────────────────────────────────────────
    createTestSymptom({ id: 'MOD_009', domain: 'emotional', category: 'mood', name: 'Intense yearning or longing for deceased', synonyms: ['grief yearning', 'missing deceased', 'longing for loved one'] }),

    // ─── New Cognition (cognitive) ──────────────────────────────────────
    createTestSymptom({ id: 'COG_011', domain: 'cognitive', category: 'cognition', name: 'Disorganized thinking or speech', synonyms: ['thought disorder', 'incoherent speech', 'disorganized thoughts'], severity_red_flag_threshold: 7, severity_red_flag_level: 'URGENT' }),

    // ─── New Activity (behavioral) ──────────────────────────────────────
    createTestSymptom({ id: 'ACT_007', domain: 'behavioral', category: 'activity_level', name: 'Repetitive behaviors or restricted interests', synonyms: ['restricted interests', 'repetitive patterns', 'special interests'] }),
    createTestSymptom({ id: 'ACT_008', domain: 'behavioral', category: 'activity_level', name: 'Sensory sensitivity', synonyms: ['sensory overload', 'hypersensitivity', 'sensory issues'] }),

    // ─── New Energy (physical) ──────────────────────────────────────────
    createTestSymptom({ id: 'ENR_006', domain: 'physical', category: 'energy', name: 'Seasonal energy and mood changes', synonyms: ['seasonal changes', 'winter blues', 'seasonal pattern'] }),

    // ═══════════════════════════════════════════════════════════════════════
    // PHASE 4 EXPANSION — New Symptoms
    // ═══════════════════════════════════════════════════════════════════════

    // ─── Identity/Self-Image (behavioral) — Phase 4 ─────────────────────
    createTestSymptom({ id: 'IDN_005', domain: 'behavioral', category: 'identity_self_image', name: 'Grandiosity', synonyms: ['inflated self-importance', 'superiority', 'grandiose beliefs'] }),
    createTestSymptom({ id: 'IDN_006', domain: 'behavioral', category: 'identity_self_image', name: 'Lack of empathy', synonyms: ['empathy deficit', 'inability to empathize', 'callousness'] }),
    createTestSymptom({ id: 'IDN_007', domain: 'behavioral', category: 'identity_self_image', name: 'Need for admiration', synonyms: ['attention seeking', 'validation seeking', 'admiration craving'] }),
    createTestSymptom({ id: 'IDN_008', domain: 'behavioral', category: 'identity_self_image', name: 'Submissiveness', synonyms: ['excessive compliance', 'inability to disagree', 'deferential'] }),

    // ─── Emotional Regulation (emotional) — Phase 4 ─────────────────────
    createTestSymptom({ id: 'EMR_007', domain: 'emotional', category: 'emotional_regulation', name: 'Chronic emptiness', synonyms: ['persistent void', 'emotional vacuum', 'inner emptiness'] }),
    createTestSymptom({ id: 'EMR_008', domain: 'emotional', category: 'emotional_regulation', name: 'Inability to conform to social norms', synonyms: ['norm violation', 'rule breaking', 'disregard for rules'] }),

    // ─── Mood (emotional) — Phase 4 ─────────────────────────────────────
    createTestSymptom({ id: 'MOD_010', domain: 'emotional', category: 'mood', name: 'Hypomania', synonyms: ['mild mania', 'elevated mood episodes', 'subthreshold mania'] }),
    createTestSymptom({ id: 'MOD_011', domain: 'emotional', category: 'mood', name: 'Envy', synonyms: ['jealousy', 'envious feelings', 'covetousness'] }),

    // ─── Cognition (cognitive) — Phase 4 ────────────────────────────────
    createTestSymptom({ id: 'COG_013', domain: 'cognitive', category: 'cognition', name: 'Emotional dysregulation', synonyms: ['difficulty regulating emotions', 'emotional instability', 'affect dysregulation'] }),

    // ─── Activity Level (behavioral) — Phase 4 ──────────────────────────
    createTestSymptom({ id: 'ACT_009', domain: 'behavioral', category: 'activity_level', name: 'Reckless behavior', synonyms: ['recklessness', 'dangerous choices', 'disregard for safety'], severity_red_flag_threshold: 8, severity_red_flag_level: 'WATCH' }),
    createTestSymptom({ id: 'ACT_010', domain: 'behavioral', category: 'activity_level', name: 'Lying or manipulation', synonyms: ['deceitfulness', 'manipulative behavior', 'pathological lying'] }),

    // ─── Perception (cognitive) — Phase 4 ───────────────────────────────
    createTestSymptom({ id: 'PRC_008', domain: 'cognitive', category: 'perception', name: 'Identity switching', synonyms: ['alter switching', 'identity shifts', 'personality switching'], is_red_flag: true, red_flag_level: 'URGENT' }),
    createTestSymptom({ id: 'PRC_009', domain: 'cognitive', category: 'perception', name: 'Dissociative amnesia', synonyms: ['memory gaps', 'lost time', 'blackouts'], severity_red_flag_threshold: 7, severity_red_flag_level: 'URGENT' }),
    createTestSymptom({ id: 'PRC_010', domain: 'cognitive', category: 'perception', name: 'Detachment from surroundings', synonyms: ['environmental detachment', 'feeling disconnected', 'surreal surroundings'] }),

    // ─── Coping (behavioral) — Phase 4 ──────────────────────────────────
    createTestSymptom({ id: 'CPG_013', domain: 'behavioral', category: 'coping', name: 'Hair pulling', synonyms: ['trichotillomania', 'pulling hair out', 'hair pulling urge'] }),
    createTestSymptom({ id: 'CPG_014', domain: 'behavioral', category: 'coping', name: 'Skin picking', synonyms: ['excoriation', 'picking at skin', 'skin picking urge'] }),
    createTestSymptom({ id: 'CPG_015', domain: 'behavioral', category: 'coping', name: 'Explosive anger episodes', synonyms: ['rage outbursts', 'explosive outbursts', 'uncontrollable anger'], severity_red_flag_threshold: 8, severity_red_flag_level: 'WATCH' }),

    // ─── Social (behavioral) — Phase 4 ──────────────────────────────────
    createTestSymptom({ id: 'SOC_009', domain: 'behavioral', category: 'social', name: 'Emotional detachment from relationships', synonyms: ['relational indifference', 'social indifference', 'interpersonal detachment'] }),

    // ─── Sleep (physical) — Phase 4 ─────────────────────────────────────
    createTestSymptom({ id: 'SLP_006', domain: 'physical', category: 'sleep', name: 'Excessive daytime sleepiness', synonyms: ['daytime drowsiness', 'constant sleepiness', 'hypersomnia'], severity_red_flag_threshold: 8, severity_red_flag_level: 'WATCH' }),
    createTestSymptom({ id: 'SLP_007', domain: 'physical', category: 'sleep', name: 'Sleep inertia', synonyms: ['difficulty waking', 'groggy upon waking', 'sleep drunkenness'] }),
    createTestSymptom({ id: 'SLP_008', domain: 'physical', category: 'sleep', name: 'Long sleep duration', synonyms: ['sleeping too long', 'extended sleep', 'prolonged sleep'] }),

    // ─── Appetite/Weight (physical) — Phase 4 ───────────────────────────
    createTestSymptom({ id: 'APT_005', domain: 'physical', category: 'appetite_weight', name: 'Sensory-based food avoidance', synonyms: ['texture aversion', 'food texture sensitivity', 'sensory food issues'], severity_red_flag_threshold: 7, severity_red_flag_level: 'WATCH' }),
    createTestSymptom({ id: 'APT_006', domain: 'physical', category: 'appetite_weight', name: 'Fear of aversive food consequences', synonyms: ['choking fear', 'fear of vomiting from food', 'food phobia'], severity_red_flag_threshold: 7, severity_red_flag_level: 'WATCH' }),
  ];
}

function createAllTestConditions(): ConditionWithMappings[] {
  return [
    // 1. MDE — Major Depressive Episode (23 mappings)
    {
      id: 'MDE',
      name: 'Depression',
      full_name: 'Major Depressive Episode',
      category: 'mood',
      description_for_user:
        'A pattern of persistent low mood, reduced energy, and diminished interest that some people experience. ' +
        'These experiences may be related to what mental health professionals call a major depressive episode. ' +
        'Many effective approaches exist for managing these experiences.',
      minimum_duration: '2_weeks',
      minimum_duration_display: 'At least 2 weeks',
      minimum_symptoms_for_relevance: 5,
      always_recommend_professional: true,
      guide_path: '/learn/conditions/depression',
      coping_path: '/learn/coping/depression-strategies',
      provider_questions: [
        'Could my symptoms indicate depression?',
        'What treatment options are available for persistent low mood?',
        'Would therapy, medication, or a combination be appropriate for me?',
        'How can I differentiate between normal sadness and clinical depression?',
        'Are there lifestyle changes that could help alongside treatment?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for Major Depressive Disorder (296.xx). Requires 5+ symptoms during the same 2-week period with at least one being depressed mood or loss of interest.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'MOD_001', weight: 3, role: 'core' },
        { symptom_id: 'MOD_002', weight: 3, role: 'core' },
        { symptom_id: 'MOD_003', weight: 3, role: 'core' },
        { symptom_id: 'ENR_001', weight: 3, role: 'core' },
        { symptom_id: 'SLP_001', weight: 3, role: 'core' },
        // Common (weight 2)
        { symptom_id: 'MOD_004', weight: 2, role: 'common' },
        { symptom_id: 'MOD_006', weight: 2, role: 'common' },
        { symptom_id: 'MOD_007', weight: 2, role: 'common' },
        { symptom_id: 'COG_001', weight: 2, role: 'common' },
        { symptom_id: 'SLP_002', weight: 2, role: 'common' },
        { symptom_id: 'APT_001', weight: 2, role: 'common' },
        { symptom_id: 'APT_002', weight: 2, role: 'common' },
        // Associated (weight 1)
        { symptom_id: 'MOD_005', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_008', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_003', weight: 1, role: 'associated' },
        { symptom_id: 'COG_003', weight: 1, role: 'associated' },
        { symptom_id: 'COG_006', weight: 1, role: 'associated' },
        { symptom_id: 'COG_007', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_001', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_004', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_002', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
      ],
      red_flags: [
        { symptom_id: 'COG_008', note: 'Self-harm ideation warrants immediate safety assessment' },
        { symptom_id: 'COG_009', note: 'Suicidal ideation requires immediate crisis intervention' },
      ],
    },

    // 2. PDD — Persistent Depressive Disorder (15 mappings)
    {
      id: 'PDD',
      name: 'Persistent Low Mood',
      full_name: 'Persistent Depressive Disorder (Dysthymia)',
      category: 'mood',
      description_for_user:
        'A pattern of chronically low mood lasting for an extended period. While less intense than acute depression, ' +
        'this persistent experience can significantly impact daily life and wellbeing.',
      minimum_duration: '2_years',
      minimum_duration_display: 'At least 2 years',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: false,
      guide_path: '/learn/conditions/persistent-depression',
      coping_path: '/learn/coping/chronic-mood-strategies',
      provider_questions: [
        'Could my long-term low mood be dysthymia?',
        'What treatments work best for persistent depressive symptoms?',
        'How is persistent depression different from major depression?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for Persistent Depressive Disorder (300.4). Requires depressed mood for most of the day, more days than not, for at least 2 years.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'MOD_001', weight: 3, role: 'core' },
        { symptom_id: 'MOD_003', weight: 3, role: 'core' },
        { symptom_id: 'ENR_001', weight: 3, role: 'core' },
        { symptom_id: 'MOD_007', weight: 2, role: 'common' },
        { symptom_id: 'MOD_004', weight: 2, role: 'common' },
        { symptom_id: 'SLP_001', weight: 2, role: 'common' },
        { symptom_id: 'SLP_002', weight: 2, role: 'common' },
        { symptom_id: 'APT_001', weight: 2, role: 'common' },
        { symptom_id: 'COG_001', weight: 2, role: 'common' },
        { symptom_id: 'MOD_002', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_008', weight: 1, role: 'associated' },
        { symptom_id: 'COG_006', weight: 1, role: 'associated' },
        { symptom_id: 'COG_007', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_001', weight: 1, role: 'associated' },
      ],
      red_flags: [
        { symptom_id: 'COG_008', note: null },
        { symptom_id: 'COG_009', note: null },
      ],
    },

    // 3. GAD — Generalized Anxiety Disorder (18 mappings)
    {
      id: 'GAD',
      name: 'Generalized Anxiety',
      full_name: 'Generalized Anxiety Disorder',
      category: 'anxiety',
      description_for_user:
        'A pattern of persistent, excessive worry across many areas of life that may feel difficult to control. ' +
        'Many people find that anxiety management strategies and professional support can make a meaningful difference.',
      minimum_duration: '6_months',
      minimum_duration_display: 'At least 6 months',
      minimum_symptoms_for_relevance: 4,
      always_recommend_professional: false,
      guide_path: '/learn/conditions/anxiety',
      coping_path: '/learn/coping/anxiety-strategies',
      provider_questions: [
        'Could my persistent worry indicate an anxiety disorder?',
        'What are the most effective treatments for generalized anxiety?',
        'Would CBT or medication be recommended for my situation?',
        'How can I manage anxiety in my daily routine?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for Generalized Anxiety Disorder (300.02). Requires excessive anxiety and worry for more days than not, for at least 6 months.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'ANX_001', weight: 3, role: 'core' },
        { symptom_id: 'ANX_008', weight: 3, role: 'core' },
        { symptom_id: 'EMR_002', weight: 3, role: 'core' },
        { symptom_id: 'BDY_001', weight: 2, role: 'common' },
        { symptom_id: 'SLP_001', weight: 2, role: 'common' },
        { symptom_id: 'ENR_002', weight: 2, role: 'common' },
        { symptom_id: 'COG_001', weight: 2, role: 'common' },
        { symptom_id: 'COG_002', weight: 2, role: 'common' },
        { symptom_id: 'BDY_002', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_009', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_005', weight: 1, role: 'associated' },
        { symptom_id: 'COG_003', weight: 1, role: 'associated' },
        { symptom_id: 'COG_006', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_001', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_007', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_003', weight: 1, role: 'associated' },
        { symptom_id: 'EMR_001', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 4. PD — Panic Disorder (14 mappings)
    {
      id: 'PD',
      name: 'Panic',
      full_name: 'Panic Disorder',
      category: 'anxiety',
      description_for_user:
        'Recurring unexpected episodes of intense fear accompanied by strong physical sensations. ' +
        'These episodes, sometimes called panic attacks, are treatable and many people find significant relief with support.',
      minimum_duration: '1_month',
      minimum_duration_display: 'At least 1 month',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: false,
      guide_path: '/learn/conditions/panic-disorder',
      coping_path: '/learn/coping/panic-strategies',
      provider_questions: [
        'Could my sudden fear episodes be panic attacks?',
        'What is the difference between a panic attack and a heart condition?',
        'What treatments are most effective for recurrent panic?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for Panic Disorder (300.01). Requires recurrent unexpected panic attacks with at least 1 month of concern about additional attacks.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'ANX_002', weight: 3, role: 'core' },
        { symptom_id: 'BDY_003', weight: 3, role: 'core' },
        { symptom_id: 'ANX_006', weight: 3, role: 'core' },
        { symptom_id: 'BDY_004', weight: 2, role: 'common' },
        { symptom_id: 'BDY_005', weight: 2, role: 'common' },
        { symptom_id: 'BDY_006', weight: 2, role: 'common' },
        { symptom_id: 'BDY_007', weight: 2, role: 'common' },
        { symptom_id: 'BDY_008', weight: 2, role: 'common' },
        { symptom_id: 'ANX_001', weight: 1, role: 'associated' },
        { symptom_id: 'CPG_001', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_002', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_007', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_009', weight: 1, role: 'associated' },
        { symptom_id: 'COG_001', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 5. SAD — Social Anxiety Disorder (14 mappings)
    {
      id: 'SAD',
      name: 'Social Anxiety',
      full_name: 'Social Anxiety Disorder',
      category: 'anxiety',
      description_for_user:
        'Intense fear or anxiety about social situations where one might feel scrutinized or judged. ' +
        'This experience is more common than many realize, and effective treatments are available.',
      minimum_duration: '6_months',
      minimum_duration_display: 'At least 6 months',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: false,
      guide_path: '/learn/conditions/social-anxiety',
      coping_path: '/learn/coping/social-anxiety-strategies',
      provider_questions: [
        'Could my fear of social situations be social anxiety disorder?',
        'What therapies are most effective for social anxiety?',
        'How can I gradually become more comfortable in social settings?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for Social Anxiety Disorder (300.23). Requires marked fear or anxiety about social situations for at least 6 months.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'ANX_004', weight: 3, role: 'core' },
        { symptom_id: 'SOC_002', weight: 3, role: 'core' },
        { symptom_id: 'ANX_006', weight: 2, role: 'core' },
        { symptom_id: 'MOD_007', weight: 2, role: 'common' },
        { symptom_id: 'EMR_006', weight: 2, role: 'common' },
        { symptom_id: 'BDY_008', weight: 2, role: 'common' },
        { symptom_id: 'BDY_003', weight: 2, role: 'common' },
        { symptom_id: 'COG_007', weight: 2, role: 'common' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_007', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_009', weight: 1, role: 'associated' },
        { symptom_id: 'CPG_001', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_003', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_001', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 6. PTSD — Post-Traumatic Stress Disorder (20 mappings)
    {
      id: 'PTSD',
      name: 'Trauma Response',
      full_name: 'Post-Traumatic Stress Disorder',
      category: 'trauma',
      description_for_user:
        'A pattern of re-experiencing, avoidance, and heightened alertness that can develop after exposure to ' +
        'traumatic events. Recovery is possible and many evidence-based treatments can help.',
      minimum_duration: '1_month',
      minimum_duration_display: 'At least 1 month',
      minimum_symptoms_for_relevance: 4,
      always_recommend_professional: true,
      guide_path: '/learn/conditions/ptsd',
      coping_path: '/learn/coping/trauma-strategies',
      provider_questions: [
        'Could my symptoms be related to a past traumatic experience?',
        'What are the most effective evidence-based treatments for trauma?',
        'Would EMDR or trauma-focused CBT be appropriate for me?',
        'How can I feel safe while processing difficult memories?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for PTSD (309.81). Requires exposure to traumatic event and symptoms in four clusters: intrusion, avoidance, cognition/mood changes, arousal/reactivity.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'COG_005', weight: 3, role: 'core' },
        { symptom_id: 'EMR_003', weight: 3, role: 'core' },
        { symptom_id: 'ANX_005', weight: 3, role: 'core' },
        { symptom_id: 'CPG_001', weight: 3, role: 'core' },
        { symptom_id: 'SLP_004', weight: 2, role: 'common' },
        { symptom_id: 'SLP_001', weight: 2, role: 'common' },
        { symptom_id: 'SLP_003', weight: 2, role: 'common' },
        { symptom_id: 'EMR_002', weight: 2, role: 'common' },
        { symptom_id: 'MOD_004', weight: 2, role: 'common' },
        { symptom_id: 'COG_004', weight: 2, role: 'common' },
        { symptom_id: 'PRC_001', weight: 1, role: 'associated' },
        { symptom_id: 'PRC_002', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
        { symptom_id: 'COG_001', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_002', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_002', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_008', weight: 1, role: 'associated' },
        { symptom_id: 'COG_003', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 7. OCD — Obsessive-Compulsive Disorder (13 mappings)
    {
      id: 'OCD',
      name: 'OCD Patterns',
      full_name: 'Obsessive-Compulsive Disorder',
      category: 'obsessive_compulsive',
      description_for_user:
        'A pattern of unwanted, intrusive thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) ' +
        'performed to reduce distress. Specialized therapies like ERP are highly effective.',
      minimum_duration: '2_weeks',
      minimum_duration_display: 'At least 2 weeks',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: false,
      guide_path: '/learn/conditions/ocd',
      coping_path: '/learn/coping/ocd-strategies',
      provider_questions: [
        'Could my repetitive thoughts and behaviors indicate OCD?',
        'What is ERP therapy and would it help me?',
        'How do I find a therapist who specializes in OCD?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for OCD (300.3). Requires presence of obsessions, compulsions, or both that are time-consuming or cause significant distress.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'COG_005', weight: 3, role: 'core' },
        { symptom_id: 'CPG_002', weight: 3, role: 'core' },
        { symptom_id: 'CPG_007', weight: 3, role: 'core' },
        { symptom_id: 'ANX_001', weight: 2, role: 'common' },
        { symptom_id: 'ANX_006', weight: 2, role: 'common' },
        { symptom_id: 'COG_007', weight: 2, role: 'common' },
        { symptom_id: 'CPG_001', weight: 2, role: 'common' },
        { symptom_id: 'SLP_001', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'COG_001', weight: 1, role: 'associated' },
        { symptom_id: 'CPG_008', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_006', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 8. BIP — Bipolar Disorder (20 mappings)
    {
      id: 'BIP',
      name: 'Bipolar Patterns',
      full_name: 'Bipolar Disorder',
      category: 'mood',
      description_for_user:
        'A pattern involving significant shifts in mood, energy, and activity levels — including periods of ' +
        'unusually elevated mood and periods of depression. Professional evaluation is important for management.',
      minimum_duration: '1_week',
      minimum_duration_display: 'At least 1 week for elevated episodes',
      minimum_symptoms_for_relevance: 4,
      always_recommend_professional: true,
      guide_path: '/learn/conditions/bipolar',
      coping_path: '/learn/coping/bipolar-strategies',
      provider_questions: [
        'Could my mood swings indicate a bipolar spectrum condition?',
        'What is the difference between unipolar depression and bipolar disorder?',
        'What treatment approaches are most effective for mood instability?',
        'How important is mood tracking for managing bipolar patterns?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for Bipolar I/II Disorder (296.xx). Manic episode requires distinct period of elevated/irritable mood lasting at least 1 week.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'EMR_001', weight: 3, role: 'core' },
        { symptom_id: 'EMR_004', weight: 3, role: 'core' },
        { symptom_id: 'MOD_001', weight: 3, role: 'core' },
        { symptom_id: 'SLP_001', weight: 2, role: 'common' },
        { symptom_id: 'SLP_002', weight: 2, role: 'common' },
        { symptom_id: 'COG_002', weight: 2, role: 'common' },
        { symptom_id: 'ENR_002', weight: 2, role: 'common' },
        { symptom_id: 'ACT_004', weight: 2, role: 'common' },
        { symptom_id: 'ACT_005', weight: 2, role: 'common' },
        { symptom_id: 'MOD_003', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_002', weight: 1, role: 'associated' },
        { symptom_id: 'COG_001', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_003', weight: 1, role: 'associated' },
        { symptom_id: 'CPG_003', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_008', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_006', weight: 1, role: 'associated' },
        { symptom_id: 'COG_003', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_002', weight: 1, role: 'associated' },
        { symptom_id: 'EMR_002', weight: 1, role: 'associated' },
      ],
      red_flags: [
        { symptom_id: 'COG_008', note: null },
        { symptom_id: 'COG_009', note: null },
      ],
    },

    // 9. ADHD — Attention-Deficit/Hyperactivity Disorder (17 mappings)
    {
      id: 'ADHD',
      name: 'ADHD Patterns',
      full_name: 'Attention-Deficit/Hyperactivity Disorder',
      category: 'neurodevelopmental',
      description_for_user:
        'A pattern of persistent inattention, impulsivity, and/or hyperactivity that affects daily functioning. ' +
        'Many people with these experiences benefit from structured strategies and professional support.',
      minimum_duration: '6_months',
      minimum_duration_display: 'At least 6 months',
      minimum_symptoms_for_relevance: 5,
      always_recommend_professional: false,
      guide_path: '/learn/conditions/adhd',
      coping_path: '/learn/coping/adhd-strategies',
      provider_questions: [
        'Could my attention and focus difficulties indicate ADHD?',
        'What does an ADHD evaluation involve?',
        'What combination of strategies and treatments work best for ADHD?',
        'How does adult ADHD differ from childhood ADHD?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for ADHD (314.0x). Requires several symptoms present before age 12, persisting for at least 6 months, in two or more settings.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'COG_001', weight: 3, role: 'core' },
        { symptom_id: 'COG_006', weight: 3, role: 'core' },
        { symptom_id: 'ACT_004', weight: 3, role: 'core' },
        { symptom_id: 'COG_003', weight: 2, role: 'common' },
        { symptom_id: 'COG_004', weight: 2, role: 'common' },
        { symptom_id: 'COG_002', weight: 2, role: 'common' },
        { symptom_id: 'ENR_002', weight: 2, role: 'common' },
        { symptom_id: 'ACT_001', weight: 2, role: 'common' },
        { symptom_id: 'ACT_003', weight: 2, role: 'common' },
        { symptom_id: 'EMR_002', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_007', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_003', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_002', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_008', weight: 1, role: 'associated' },
        { symptom_id: 'EMR_001', weight: 1, role: 'associated' },
        { symptom_id: 'SLP_003', weight: 1, role: 'associated' },
        { symptom_id: 'CPG_001', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 10. BUR — Burnout Syndrome (18 mappings)
    {
      id: 'BUR',
      name: 'Burnout',
      full_name: 'Burnout Syndrome',
      category: 'stress',
      description_for_user:
        'A state of physical, emotional, and mental exhaustion resulting from prolonged stress — often work-related. ' +
        'Burnout is increasingly recognized and manageable with appropriate changes and support.',
      minimum_duration: '3_months',
      minimum_duration_display: 'At least 3 months',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: false,
      guide_path: '/learn/conditions/burnout',
      coping_path: '/learn/coping/burnout-strategies',
      provider_questions: [
        'Could my exhaustion be related to professional burnout?',
        'What changes can help me recover from burnout?',
        'When should I seek professional help for burnout symptoms?',
      ],
      clinical_notes: 'Based on ICD-11 definition of Burnout (QD85). WHO classifies it as an occupational phenomenon with three dimensions: exhaustion, cynicism, reduced efficacy.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'ENR_001', weight: 3, role: 'core' },
        { symptom_id: 'ENR_005', weight: 3, role: 'core' },
        { symptom_id: 'MOD_003', weight: 3, role: 'core' },
        { symptom_id: 'COG_001', weight: 2, role: 'common' },
        { symptom_id: 'COG_003', weight: 2, role: 'common' },
        { symptom_id: 'MOD_004', weight: 2, role: 'common' },
        { symptom_id: 'SLP_001', weight: 2, role: 'common' },
        { symptom_id: 'EMR_002', weight: 2, role: 'common' },
        { symptom_id: 'BDY_002', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
        { symptom_id: 'APT_001', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_002', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_008', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_007', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_006', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_005', weight: 1, role: 'associated' },
        { symptom_id: 'COG_007', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 11. INS — Insomnia Disorder (13 mappings)
    {
      id: 'INS',
      name: 'Insomnia',
      full_name: 'Insomnia Disorder',
      category: 'sleep',
      description_for_user:
        'Persistent difficulty with falling asleep, staying asleep, or experiencing unrefreshing sleep despite adequate ' +
        'opportunity. Sleep-focused interventions like CBT-I are highly effective.',
      minimum_duration: '3_months',
      minimum_duration_display: 'At least 3 months',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: false,
      guide_path: '/learn/conditions/insomnia',
      coping_path: '/learn/coping/sleep-strategies',
      provider_questions: [
        'Could my sleep difficulties indicate insomnia disorder?',
        'What is CBT-I and would it help me?',
        'Are there medical causes that should be ruled out for my sleep issues?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for Insomnia Disorder (780.52). Requires sleep difficulty at least 3 nights per week for at least 3 months despite adequate sleep opportunity.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'SLP_001', weight: 3, role: 'core' },
        { symptom_id: 'SLP_003', weight: 3, role: 'core' },
        { symptom_id: 'SLP_005', weight: 3, role: 'core' },
        { symptom_id: 'ENR_001', weight: 2, role: 'common' },
        { symptom_id: 'COG_001', weight: 2, role: 'common' },
        { symptom_id: 'COG_003', weight: 2, role: 'common' },
        { symptom_id: 'EMR_002', weight: 2, role: 'common' },
        { symptom_id: 'BDY_002', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_001', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_001', weight: 1, role: 'associated' },
        { symptom_id: 'COG_004', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_002', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 12. BED — Binge Eating Disorder (13 mappings)
    {
      id: 'BED',
      name: 'Binge Eating',
      full_name: 'Binge Eating Disorder',
      category: 'eating',
      description_for_user:
        'Recurring episodes of eating significantly more food than most people would in a similar time period, ' +
        'accompanied by a feeling of loss of control. This is a recognized condition with effective treatments.',
      minimum_duration: '3_months',
      minimum_duration_display: 'At least 3 months',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: false,
      guide_path: '/learn/conditions/binge-eating',
      coping_path: '/learn/coping/eating-strategies',
      provider_questions: [
        'Could my eating patterns indicate binge eating disorder?',
        'What treatments are available for binge eating episodes?',
        'How can I develop a healthier relationship with food?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for Binge Eating Disorder (307.51). Requires binge episodes at least once a week for 3 months, not followed by purging.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'CPG_005', weight: 3, role: 'core' },
        { symptom_id: 'APT_002', weight: 3, role: 'core' },
        { symptom_id: 'ANX_006', weight: 2, role: 'core' },
        { symptom_id: 'MOD_006', weight: 2, role: 'common' },
        { symptom_id: 'EMR_006', weight: 2, role: 'common' },
        { symptom_id: 'PRC_005', weight: 2, role: 'common' },
        { symptom_id: 'APT_003', weight: 2, role: 'common' },
        { symptom_id: 'MOD_001', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_007', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'CPG_001', weight: 1, role: 'associated' },
        { symptom_id: 'APT_004', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_008', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 13. AN — Anorexia Nervosa (14 mappings)
    {
      id: 'AN',
      name: 'Restrictive Eating',
      full_name: 'Anorexia Nervosa',
      category: 'eating',
      description_for_user:
        'A pattern of significantly restricted food intake, intense fear of weight gain, and distorted body perception. ' +
        'This condition can have serious physical effects and professional support is strongly recommended.',
      minimum_duration: '3_months',
      minimum_duration_display: 'At least 3 months',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: true,
      guide_path: '/learn/conditions/anorexia',
      coping_path: '/learn/coping/restrictive-eating-strategies',
      provider_questions: [
        'Could my eating and body image concerns be related to an eating disorder?',
        'What physical effects should I be concerned about?',
        'What does eating disorder treatment typically involve?',
        'How can my family support my recovery?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for Anorexia Nervosa (307.1). Requires restriction of energy intake, intense fear of gaining weight, disturbance in body image.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'CPG_006', weight: 3, role: 'core' },
        { symptom_id: 'PRC_005', weight: 3, role: 'core' },
        { symptom_id: 'APT_001', weight: 3, role: 'core' },
        { symptom_id: 'APT_003', weight: 2, role: 'common' },
        { symptom_id: 'ANX_001', weight: 2, role: 'common' },
        { symptom_id: 'ACT_006', weight: 2, role: 'common' },
        { symptom_id: 'MOD_006', weight: 2, role: 'common' },
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_006', weight: 1, role: 'associated' },
        { symptom_id: 'SLP_001', weight: 1, role: 'associated' },
        { symptom_id: 'EMR_006', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_007', weight: 1, role: 'associated' },
        { symptom_id: 'COG_005', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 14. SUD — Substance Use Concern (15 mappings)
    {
      id: 'SUD',
      name: 'Substance Use',
      full_name: 'Substance Use Concern',
      category: 'substance',
      description_for_user:
        'A pattern of substance use that may be affecting your health, relationships, or daily functioning. ' +
        'Many people benefit from professional guidance, and effective treatment options are available.',
      minimum_duration: '1_month',
      minimum_duration_display: 'At least 1 month',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: true,
      guide_path: '/learn/conditions/substance-use',
      coping_path: '/learn/coping/substance-use-strategies',
      provider_questions: [
        'Could my substance use patterns be cause for concern?',
        'What treatment options are available for substance use issues?',
        'Is harm reduction an option I should consider?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for Substance Use Disorders, generalized framework. Severity determined by number of criteria met: mild (2-3), moderate (4-5), severe (6+).',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'CPG_003', weight: 3, role: 'core' },
        { symptom_id: 'ACT_004', weight: 3, role: 'core' },
        { symptom_id: 'ANX_006', weight: 2, role: 'core' },
        { symptom_id: 'SOC_003', weight: 2, role: 'common' },
        { symptom_id: 'ACT_002', weight: 2, role: 'common' },
        { symptom_id: 'SLP_001', weight: 2, role: 'common' },
        { symptom_id: 'MOD_001', weight: 2, role: 'common' },
        { symptom_id: 'EMR_002', weight: 2, role: 'common' },
        { symptom_id: 'COG_004', weight: 1, role: 'associated' },
        { symptom_id: 'COG_001', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_009', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_006', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_005', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 15. AGO — Agoraphobia (13 mappings)
    {
      id: 'AGO',
      name: 'Agoraphobia',
      full_name: 'Agoraphobia',
      category: 'anxiety',
      description_for_user:
        'Intense anxiety about situations where escape might be difficult or help unavailable — such as open spaces, ' +
        'crowds, or public transport. Gradual exposure therapy is a highly effective treatment.',
      minimum_duration: '6_months',
      minimum_duration_display: 'At least 6 months',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: false,
      guide_path: '/learn/conditions/agoraphobia',
      coping_path: '/learn/coping/agoraphobia-strategies',
      provider_questions: [
        'Could my avoidance of certain places indicate agoraphobia?',
        'What is exposure therapy and how does it work for agoraphobia?',
        'Can medication help alongside therapy for agoraphobia?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for Agoraphobia (300.22). Requires marked fear/anxiety about 2+ situations for at least 6 months.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'ANX_003', weight: 3, role: 'core' },
        { symptom_id: 'CPG_001', weight: 3, role: 'core' },
        { symptom_id: 'ANX_002', weight: 2, role: 'core' },
        { symptom_id: 'ANX_006', weight: 2, role: 'common' },
        { symptom_id: 'SOC_002', weight: 2, role: 'common' },
        { symptom_id: 'BDY_003', weight: 2, role: 'common' },
        { symptom_id: 'BDY_005', weight: 2, role: 'common' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_001', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_002', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
        { symptom_id: 'COG_007', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_006', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 16. ADJ — Adjustment Disorder (17 mappings)
    {
      id: 'ADJ',
      name: 'Adjustment Difficulty',
      full_name: 'Adjustment Disorder',
      category: 'stress',
      description_for_user:
        'Emotional or behavioral responses to a stressful life event that are more intense than typically expected. ' +
        'These responses often improve with time and appropriate coping strategies or professional support.',
      minimum_duration: '1_month',
      minimum_duration_display: 'Within 3 months of a stressful event',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: false,
      guide_path: '/learn/conditions/adjustment-disorder',
      coping_path: '/learn/coping/stress-coping-strategies',
      provider_questions: [
        'Could my reaction to a recent event be more than typical stress?',
        'When should I seek professional help for stress-related symptoms?',
        'What coping strategies are most effective during major life changes?',
      ],
      clinical_notes: 'Based on DSM-5 criteria for Adjustment Disorders (309.x). Symptoms develop within 3 months of an identifiable stressor.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'ANX_008', weight: 3, role: 'core' },
        { symptom_id: 'MOD_001', weight: 3, role: 'core' },
        { symptom_id: 'ANX_001', weight: 2, role: 'common' },
        { symptom_id: 'EMR_002', weight: 2, role: 'common' },
        { symptom_id: 'SLP_001', weight: 2, role: 'common' },
        { symptom_id: 'COG_001', weight: 2, role: 'common' },
        { symptom_id: 'SOC_001', weight: 2, role: 'common' },
        { symptom_id: 'MOD_003', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_005', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_001', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_003', weight: 1, role: 'associated' },
        { symptom_id: 'CPG_001', weight: 1, role: 'associated' },
        { symptom_id: 'COG_006', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_004', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_002', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 17. SCZ — Schizophrenia (18 mappings)
    {
      id: 'SCZ',
      name: 'Psychotic Experiences',
      full_name: 'Schizophrenia Spectrum and Other Psychotic Disorders',
      category: 'psychotic',
      description_for_user:
        'Psychotic experiences may include hearing or seeing things others do not, holding beliefs that seem unusual to others, or having difficulty organizing thoughts. These experiences can be distressing, and professional evaluation is strongly recommended.',
      minimum_duration: '1_month',
      minimum_duration_display: 'At least 1 month',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: true,
      guide_path: '/learn/psychosis',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my experiences involve psychosis?',
        'What treatments are available for psychotic symptoms?',
      ],
      clinical_notes: 'DSM-5-TR 295.90. ICD-11 6A20.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'PRC_004', weight: 3, role: 'core' },
        { symptom_id: 'PRC_007', weight: 3, role: 'core' },
        { symptom_id: 'COG_011', weight: 3, role: 'core' },
        { symptom_id: 'PRC_006', weight: 2, role: 'common' },
        { symptom_id: 'PRC_003', weight: 2, role: 'common' },
        { symptom_id: 'SOC_001', weight: 2, role: 'common' },
        { symptom_id: 'SOC_004', weight: 2, role: 'common' },
        { symptom_id: 'MOD_004', weight: 2, role: 'common' },
        { symptom_id: 'MOD_003', weight: 2, role: 'common' },
        { symptom_id: 'COG_001', weight: 1, role: 'associated' },
        { symptom_id: 'COG_004', weight: 1, role: 'associated' },
        { symptom_id: 'SLP_001', weight: 1, role: 'associated' },
        { symptom_id: 'SLP_003', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_002', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_003', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_005', weight: 1, role: 'associated' },
        { symptom_id: 'EMR_005', weight: 1, role: 'associated' },
      ],
      red_flags: [
        { symptom_id: 'PRC_004', note: 'Hallucinations require urgent evaluation' },
        { symptom_id: 'PRC_007', note: 'Delusions require urgent evaluation' },
      ],
    },

    // 18. BPD — Borderline Personality (22 mappings)
    {
      id: 'BPD',
      name: 'Borderline Personality Patterns',
      full_name: 'Borderline Personality Disorder',
      category: 'personality',
      description_for_user:
        'Borderline personality patterns involve intense emotions, unstable relationships, and a shifting sense of self.',
      minimum_duration: '1_year',
      minimum_duration_display: 'At least 1 year',
      minimum_symptoms_for_relevance: 5,
      always_recommend_professional: true,
      guide_path: '/learn/personality',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my emotional patterns indicate BPD?',
        'What is dialectical behavior therapy?',
      ],
      clinical_notes: 'DSM-5-TR 301.83. ICD-11 6D10.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'EMR_001', weight: 3, role: 'core' },
        { symptom_id: 'IDN_001', weight: 3, role: 'core' },
        { symptom_id: 'IDN_002', weight: 3, role: 'core' },
        { symptom_id: 'SOC_008', weight: 3, role: 'core' },
        { symptom_id: 'IDN_004', weight: 2, role: 'common' },
        { symptom_id: 'MOD_008', weight: 2, role: 'common' },
        { symptom_id: 'ACT_004', weight: 2, role: 'common' },
        { symptom_id: 'EMR_002', weight: 2, role: 'common' },
        { symptom_id: 'EMR_006', weight: 2, role: 'common' },
        { symptom_id: 'CPG_004', weight: 2, role: 'common' },
        { symptom_id: 'SOC_006', weight: 2, role: 'common' },
        { symptom_id: 'EMR_003', weight: 1, role: 'associated' },
        { symptom_id: 'EMR_005', weight: 1, role: 'associated' },
        { symptom_id: 'PRC_001', weight: 1, role: 'associated' },
        { symptom_id: 'PRC_002', weight: 1, role: 'associated' },
        { symptom_id: 'PRC_006', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_006', weight: 1, role: 'associated' },
        { symptom_id: 'CPG_003', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_003', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_001', weight: 1, role: 'associated' },
        { symptom_id: 'SLP_001', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_007', weight: 1, role: 'associated' },
      ],
      red_flags: [
        { symptom_id: 'COG_008', note: 'Self-harm ideation requires safety assessment' },
        { symptom_id: 'COG_009', note: 'Suicidal ideation elevated in BPD' },
        { symptom_id: 'CPG_004', note: 'Active self-harm requires crisis intervention' },
      ],
    },

    // 19. BN — Bulimia Nervosa (16 mappings)
    {
      id: 'BN',
      name: 'Bulimia Nervosa',
      full_name: 'Bulimia Nervosa',
      category: 'eating',
      description_for_user:
        'Bulimia nervosa involves a cycle of binge eating followed by compensatory behaviors like purging.',
      minimum_duration: '3_months',
      minimum_duration_display: 'At least 3 months',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: true,
      guide_path: '/learn/eating-disorders',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my eating patterns indicate bulimia?',
        'What treatments are available?',
      ],
      clinical_notes: 'DSM-5-TR 307.51. ICD-11 6B81.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'CPG_005', weight: 3, role: 'core' },
        { symptom_id: 'CPG_009', weight: 3, role: 'core' },
        { symptom_id: 'PRC_005', weight: 3, role: 'core' },
        { symptom_id: 'CPG_010', weight: 2, role: 'common' },
        { symptom_id: 'ANX_006', weight: 2, role: 'common' },
        { symptom_id: 'APT_002', weight: 2, role: 'common' },
        { symptom_id: 'MOD_006', weight: 2, role: 'common' },
        { symptom_id: 'EMR_006', weight: 2, role: 'common' },
        { symptom_id: 'APT_004', weight: 2, role: 'common' },
        { symptom_id: 'BDY_009', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_001', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_007', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_001', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_006', weight: 1, role: 'associated' },
      ],
      red_flags: [
        { symptom_id: 'CPG_009', note: 'Purging carries medical risks' },
      ],
    },

    // 20. PGD — Prolonged Grief (16 mappings)
    {
      id: 'PGD',
      name: 'Prolonged Grief',
      full_name: 'Prolonged Grief Disorder',
      category: 'stress',
      description_for_user:
        'Prolonged grief describes persistent, intense grief following the death of someone close.',
      minimum_duration: '1_year',
      minimum_duration_display: 'At least 12 months',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: false,
      guide_path: '/learn/grief',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my grief be prolonged grief disorder?',
        'What grief-specific therapies exist?',
      ],
      clinical_notes: 'DSM-5-TR (2022). ICD-11 6B42.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'MOD_009', weight: 3, role: 'core' },
        { symptom_id: 'MOD_001', weight: 3, role: 'core' },
        { symptom_id: 'CPG_001', weight: 3, role: 'core' },
        { symptom_id: 'MOD_004', weight: 2, role: 'common' },
        { symptom_id: 'MOD_003', weight: 2, role: 'common' },
        { symptom_id: 'IDN_001', weight: 2, role: 'common' },
        { symptom_id: 'MOD_008', weight: 2, role: 'common' },
        { symptom_id: 'SOC_001', weight: 2, role: 'common' },
        { symptom_id: 'MOD_002', weight: 1, role: 'associated' },
        { symptom_id: 'SLP_001', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
        { symptom_id: 'COG_001', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_001', weight: 1, role: 'associated' },
        { symptom_id: 'EMR_002', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_005', weight: 1, role: 'associated' },
        { symptom_id: 'COG_003', weight: 1, role: 'associated' },
      ],
      red_flags: [
        { symptom_id: 'COG_009', note: 'Suicidal ideation may co-occur with prolonged grief' },
        { symptom_id: 'COG_008', note: 'Self-harm ideation may co-occur with prolonged grief' },
      ],
    },

    // 21. ASD — Autism Spectrum (18 mappings)
    {
      id: 'ASD',
      name: 'Autism Spectrum',
      full_name: 'Autism Spectrum Disorder (Adult Presentation)',
      category: 'neurodevelopmental',
      description_for_user:
        'Autism spectrum describes persistent differences in social communication along with restricted or repetitive patterns.',
      minimum_duration: '1_year',
      minimum_duration_display: 'Lifelong pattern',
      minimum_symptoms_for_relevance: 4,
      always_recommend_professional: true,
      guide_path: '/learn/autism',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my social difficulties be related to autism?',
        'What does an adult autism assessment involve?',
      ],
      clinical_notes: 'DSM-5-TR 299.00. ICD-11 6A02.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'SOC_007', weight: 3, role: 'core' },
        { symptom_id: 'ACT_007', weight: 3, role: 'core' },
        { symptom_id: 'ACT_008', weight: 3, role: 'core' },
        { symptom_id: 'SOC_001', weight: 2, role: 'common' },
        { symptom_id: 'SOC_003', weight: 2, role: 'common' },
        { symptom_id: 'ACT_003', weight: 2, role: 'common' },
        { symptom_id: 'COG_001', weight: 2, role: 'common' },
        { symptom_id: 'ANX_001', weight: 2, role: 'common' },
        { symptom_id: 'SOC_002', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_005', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_008', weight: 1, role: 'associated' },
        { symptom_id: 'SLP_001', weight: 1, role: 'associated' },
        { symptom_id: 'EMR_002', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_007', weight: 1, role: 'associated' },
        { symptom_id: 'SLP_003', weight: 1, role: 'associated' },
        { symptom_id: 'COG_003', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_006', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 22. BDD — Body Dysmorphic (14 mappings)
    {
      id: 'BDD',
      name: 'Body Dysmorphic Concern',
      full_name: 'Body Dysmorphic Disorder',
      category: 'obsessive_compulsive',
      description_for_user:
        'Body dysmorphic concerns involve persistent preoccupation with perceived appearance flaws that others may not notice.',
      minimum_duration: '1_month',
      minimum_duration_display: 'At least 1 month',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: false,
      guide_path: '/learn/body-dysmorphia',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my appearance concerns indicate BDD?',
        'What treatments help?',
      ],
      clinical_notes: 'DSM-5-TR 300.7. ICD-11 6B21.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'PRC_005', weight: 3, role: 'core' },
        { symptom_id: 'CPG_007', weight: 3, role: 'core' },
        { symptom_id: 'COG_005', weight: 2, role: 'common' },
        { symptom_id: 'EMR_006', weight: 2, role: 'common' },
        { symptom_id: 'ANX_004', weight: 2, role: 'common' },
        { symptom_id: 'SOC_002', weight: 2, role: 'common' },
        { symptom_id: 'COG_007', weight: 2, role: 'common' },
        { symptom_id: 'ANX_001', weight: 2, role: 'common' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_007', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_001', weight: 1, role: 'associated' },
        { symptom_id: 'CPG_001', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_006', weight: 1, role: 'associated' },
        { symptom_id: 'CPG_002', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 23. DPDR — Depersonalization/Derealization (14 mappings)
    {
      id: 'DPDR',
      name: 'Depersonalization/Derealization',
      full_name: 'Depersonalization/Derealization Disorder',
      category: 'dissociative',
      description_for_user:
        'Persistent feelings of being detached from your body or that the world is unreal.',
      minimum_duration: '1_month',
      minimum_duration_display: 'At least 1 month',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: false,
      guide_path: '/learn/dissociation',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Are my detachment experiences a disorder?',
        'What treatments help?',
      ],
      clinical_notes: 'DSM-5-TR 300.6. ICD-11 6B66.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'PRC_002', weight: 3, role: 'core' },
        { symptom_id: 'PRC_001', weight: 3, role: 'core' },
        { symptom_id: 'EMR_005', weight: 3, role: 'core' },
        { symptom_id: 'COG_003', weight: 2, role: 'common' },
        { symptom_id: 'PRC_003', weight: 2, role: 'common' },
        { symptom_id: 'ANX_001', weight: 2, role: 'common' },
        { symptom_id: 'COG_004', weight: 2, role: 'common' },
        { symptom_id: 'ANX_006', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_004', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'COG_001', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_001', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
        { symptom_id: 'SLP_001', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 24. SPP — Specific Phobia (12 mappings)
    {
      id: 'SPP',
      name: 'Specific Phobia',
      full_name: 'Specific Phobia',
      category: 'anxiety',
      description_for_user:
        'Intense irrational fear of a specific object or situation leading to avoidance.',
      minimum_duration: '6_months',
      minimum_duration_display: 'At least 6 months',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: false,
      guide_path: '/learn/phobias',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my fear be a specific phobia?',
        'How does exposure therapy work?',
      ],
      clinical_notes: 'DSM-5-TR 300.29. ICD-11 6B03.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'ANX_003', weight: 3, role: 'core' },
        { symptom_id: 'CPG_001', weight: 3, role: 'core' },
        { symptom_id: 'ANX_002', weight: 2, role: 'common' },
        { symptom_id: 'BDY_003', weight: 2, role: 'common' },
        { symptom_id: 'BDY_007', weight: 2, role: 'common' },
        { symptom_id: 'BDY_008', weight: 2, role: 'common' },
        { symptom_id: 'ANX_007', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_005', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_009', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_001', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_002', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_006', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 25. PMDD — Premenstrual Dysphoric Disorder (16 mappings)
    {
      id: 'PMDD',
      name: 'Premenstrual Dysphoric Disorder',
      full_name: 'Premenstrual Dysphoric Disorder',
      category: 'mood',
      description_for_user:
        'Significant mood disturbance reliably occurring during the premenstrual phase.',
      minimum_duration: '3_months',
      minimum_duration_display: 'At least 2 consecutive cycles',
      minimum_symptoms_for_relevance: 4,
      always_recommend_professional: false,
      guide_path: '/learn/pmdd',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my cyclical mood changes be PMDD?',
        'What treatments are available?',
      ],
      clinical_notes: 'DSM-5-TR 625.4. ICD-11 GA34.41.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'EMR_001', weight: 3, role: 'core' },
        { symptom_id: 'EMR_002', weight: 3, role: 'core' },
        { symptom_id: 'MOD_001', weight: 3, role: 'core' },
        { symptom_id: 'ANX_001', weight: 2, role: 'common' },
        { symptom_id: 'MOD_003', weight: 2, role: 'common' },
        { symptom_id: 'COG_001', weight: 2, role: 'common' },
        { symptom_id: 'ENR_001', weight: 2, role: 'common' },
        { symptom_id: 'APT_002', weight: 2, role: 'common' },
        { symptom_id: 'SLP_001', weight: 2, role: 'common' },
        { symptom_id: 'SLP_002', weight: 2, role: 'common' },
        { symptom_id: 'ANX_008', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_006', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_005', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_007', weight: 1, role: 'associated' },
        { symptom_id: 'COG_003', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 26. SADD — Seasonal Affective (16 mappings)
    {
      id: 'SADD',
      name: 'Seasonal Mood Pattern',
      full_name: 'Major Depressive Disorder with Seasonal Pattern',
      category: 'mood',
      description_for_user:
        'Depressive episodes that reliably occur during specific seasons.',
      minimum_duration: '2_weeks',
      minimum_duration_display: 'At least 2 weeks (recurring seasonally)',
      minimum_symptoms_for_relevance: 4,
      always_recommend_professional: false,
      guide_path: '/learn/seasonal-depression',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my seasonal changes be SAD?',
        'Would light therapy help?',
      ],
      clinical_notes: 'DSM-5-TR seasonal specifier for MDE.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'MOD_001', weight: 3, role: 'core' },
        { symptom_id: 'ENR_006', weight: 3, role: 'core' },
        { symptom_id: 'ENR_001', weight: 3, role: 'core' },
        { symptom_id: 'SLP_002', weight: 2, role: 'common' },
        { symptom_id: 'APT_002', weight: 2, role: 'common' },
        { symptom_id: 'MOD_003', weight: 2, role: 'common' },
        { symptom_id: 'APT_003', weight: 2, role: 'common' },
        { symptom_id: 'SOC_001', weight: 2, role: 'common' },
        { symptom_id: 'COG_001', weight: 1, role: 'associated' },
        { symptom_id: 'COG_003', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_002', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_007', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_001', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_003', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_005', weight: 1, role: 'associated' },
      ],
      red_flags: [
        { symptom_id: 'COG_008', note: null },
        { symptom_id: 'COG_009', note: null },
      ],
    },

    // 27. HD — Hoarding (13 mappings)
    {
      id: 'HD',
      name: 'Hoarding Patterns',
      full_name: 'Hoarding Disorder',
      category: 'obsessive_compulsive',
      description_for_user:
        'Persistent difficulty discarding possessions leading to cluttered living spaces.',
      minimum_duration: '6_months',
      minimum_duration_display: 'At least 6 months',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: false,
      guide_path: '/learn/hoarding',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my difficulty discarding things be hoarding disorder?',
        'What treatments help?',
      ],
      clinical_notes: 'DSM-5-TR 300.3. ICD-11 6B24.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'CPG_011', weight: 3, role: 'core' },
        { symptom_id: 'CPG_012', weight: 3, role: 'core' },
        { symptom_id: 'CPG_008', weight: 3, role: 'core' },
        { symptom_id: 'ANX_001', weight: 2, role: 'common' },
        { symptom_id: 'COG_006', weight: 2, role: 'common' },
        { symptom_id: 'ACT_001', weight: 2, role: 'common' },
        { symptom_id: 'EMR_006', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_003', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_008', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_001', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_003', weight: 1, role: 'associated' },
        { symptom_id: 'COG_005', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 28. SSD — Somatic Symptom (14 mappings)
    {
      id: 'SSD',
      name: 'Somatic Symptom Concern',
      full_name: 'Somatic Symptom Disorder',
      category: 'somatic',
      description_for_user:
        'Persistent physical symptoms with excessive health-related thoughts and behaviors.',
      minimum_duration: '6_months',
      minimum_duration_display: 'At least 6 months',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: false,
      guide_path: '/learn/somatic-symptoms',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my symptoms be somatic symptom disorder?',
        'How is SSD treated?',
      ],
      clinical_notes: 'DSM-5-TR 300.82. ICD-11 6C20.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'SOM_002', weight: 3, role: 'core' },
        { symptom_id: 'SOM_001', weight: 3, role: 'core' },
        { symptom_id: 'SOM_003', weight: 3, role: 'core' },
        { symptom_id: 'BDY_010', weight: 2, role: 'common' },
        { symptom_id: 'ANX_001', weight: 2, role: 'common' },
        { symptom_id: 'CPG_007', weight: 2, role: 'common' },
        { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_009', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_002', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_001', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'COG_001', weight: 1, role: 'associated' },
        { symptom_id: 'SLP_001', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 29. IAD — Illness Anxiety (12 mappings)
    {
      id: 'IAD',
      name: 'Illness Anxiety',
      full_name: 'Illness Anxiety Disorder',
      category: 'somatic',
      description_for_user:
        'Persistent preoccupation with having or developing a serious illness despite minimal symptoms.',
      minimum_duration: '6_months',
      minimum_duration_display: 'At least 6 months',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: false,
      guide_path: '/learn/health-anxiety',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Is my health worry illness anxiety disorder?',
        'What treatments help?',
      ],
      clinical_notes: 'DSM-5-TR 300.7. ICD-11 6B23.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'SOM_001', weight: 3, role: 'core' },
        { symptom_id: 'SOM_003', weight: 3, role: 'core' },
        { symptom_id: 'ANX_001', weight: 2, role: 'common' },
        { symptom_id: 'CPG_007', weight: 2, role: 'common' },
        { symptom_id: 'ANX_007', weight: 2, role: 'common' },
        { symptom_id: 'CPG_001', weight: 2, role: 'common' },
        { symptom_id: 'SLP_001', weight: 1, role: 'associated' },
        { symptom_id: 'COG_001', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_001', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
        { symptom_id: 'COG_007', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 30. AVPD — Avoidant Personality (16 mappings)
    {
      id: 'AVPD',
      name: 'Avoidant Personality Patterns',
      full_name: 'Avoidant Personality Disorder',
      category: 'personality',
      description_for_user:
        'Pervasive social inhibition, feelings of inadequacy, and hypersensitivity to negative evaluation.',
      minimum_duration: '1_year',
      minimum_duration_display: 'At least 1 year',
      minimum_symptoms_for_relevance: 4,
      always_recommend_professional: false,
      guide_path: '/learn/personality',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my avoidance be avoidant personality?',
        'How is AVPD different from social anxiety?',
      ],
      clinical_notes: 'DSM-5-TR 301.82. ICD-11 6D10.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'IDN_003', weight: 3, role: 'core' },
        { symptom_id: 'SOC_002', weight: 3, role: 'core' },
        { symptom_id: 'ANX_004', weight: 3, role: 'core' },
        { symptom_id: 'SOC_001', weight: 2, role: 'common' },
        { symptom_id: 'MOD_007', weight: 2, role: 'common' },
        { symptom_id: 'EMR_006', weight: 2, role: 'common' },
        { symptom_id: 'SOC_005', weight: 2, role: 'common' },
        { symptom_id: 'CPG_001', weight: 2, role: 'common' },
        { symptom_id: 'MOD_003', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_001', weight: 1, role: 'associated' },
        { symptom_id: 'COG_007', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_001', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_003', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_004', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_003', weight: 1, role: 'associated' },
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // 31. SEPA — Separation Anxiety (14 mappings)
    {
      id: 'SEPA',
      name: 'Separation Anxiety',
      full_name: 'Separation Anxiety Disorder (Adult)',
      category: 'anxiety',
      description_for_user:
        'Excessive fear or anxiety about separation from attachment figures.',
      minimum_duration: '6_months',
      minimum_duration_display: 'At least 6 months',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: false,
      guide_path: '/learn/anxiety',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my separation fears be a disorder?',
        'What treatments help?',
      ],
      clinical_notes: 'DSM-5-TR 309.21. ICD-11 6B05.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        { symptom_id: 'ANX_009', weight: 3, role: 'core' },
        { symptom_id: 'ANX_001', weight: 3, role: 'core' },
        { symptom_id: 'CPG_001', weight: 2, role: 'common' },
        { symptom_id: 'SOC_005', weight: 2, role: 'common' },
        { symptom_id: 'SLP_004', weight: 2, role: 'common' },
        { symptom_id: 'SLP_001', weight: 2, role: 'common' },
        { symptom_id: 'BDY_009', weight: 2, role: 'common' },
        { symptom_id: 'ANX_007', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_002', weight: 1, role: 'associated' },
        { symptom_id: 'ANX_002', weight: 1, role: 'associated' },
        { symptom_id: 'MOD_001', weight: 1, role: 'associated' },
        { symptom_id: 'SOC_002', weight: 1, role: 'associated' },
        { symptom_id: 'ACT_002', weight: 1, role: 'associated' },
        { symptom_id: 'BDY_001', weight: 1, role: 'associated' },
      ],
      red_flags: [],
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHASE 4 EXPANSION — 14 New Conditions
    // ═══════════════════════════════════════════════════════════════════════

    // ─────────────────────────────────────────────────────────────────────
    // TIER 4: Personality Disorders
    // ─────────────────────────────────────────────────────────────────────

    // 32. NPD — Narcissistic Personality Disorder (10 mappings)
    {
      id: 'NPD',
      name: 'Narcissistic Personality Patterns',
      full_name: 'Narcissistic Personality Disorder',
      category: 'personality',
      description_for_user:
        'A pattern of grandiosity, need for admiration, and lack of empathy. ' +
        'These patterns are pervasive and can significantly affect relationships.',
      minimum_duration: '1_year',
      minimum_duration_display: 'At least 1 year',
      minimum_symptoms_for_relevance: 4,
      always_recommend_professional: true,
      guide_path: '/learn/personality',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my interpersonal patterns indicate narcissistic traits?',
        'What therapies address narcissistic personality patterns?',
      ],
      clinical_notes: 'DSM-5-TR 301.81. ICD-11 6D11.0.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'IDN_005', weight: 3, role: 'core' },   // Grandiosity
        { symptom_id: 'IDN_006', weight: 3, role: 'core' },   // Lack of empathy
        { symptom_id: 'IDN_007', weight: 3, role: 'core' },   // Need for admiration
        { symptom_id: 'SOC_003', weight: 3, role: 'core' },   // Relationship difficulties
        // Common (weight 2)
        { symptom_id: 'EMR_002', weight: 2, role: 'common' }, // Irritability
        { symptom_id: 'MOD_011', weight: 2, role: 'common' }, // Envy
        { symptom_id: 'ANX_004', weight: 2, role: 'common' }, // Social anxiety (fragile self-esteem)
        // Associated (weight 1)
        { symptom_id: 'IDN_004', weight: 1, role: 'associated' }, // Splitting/black-and-white thinking
        { symptom_id: 'PRC_006', weight: 1, role: 'associated' }, // Paranoid thinking
        { symptom_id: 'ACT_010', weight: 1, role: 'associated' }, // Lying/manipulation
      ],
      red_flags: [],
    },

    // 33. ASPD — Antisocial Personality Disorder (10 mappings)
    {
      id: 'ASPD',
      name: 'Antisocial Personality Patterns',
      full_name: 'Antisocial Personality Disorder',
      category: 'personality',
      description_for_user:
        'A pattern of disregard for and violation of the rights of others, often with impulsivity and deceit. ' +
        'Professional evaluation can help understand these patterns.',
      minimum_duration: '1_year',
      minimum_duration_display: 'At least 1 year',
      minimum_symptoms_for_relevance: 4,
      always_recommend_professional: true,
      guide_path: '/learn/personality',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my behavioral patterns indicate antisocial traits?',
        'What treatments are available for antisocial personality patterns?',
      ],
      clinical_notes: 'DSM-5-TR 301.7. ICD-11 6D11.2.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'EMR_008', weight: 3, role: 'core' },   // Inability to conform to norms
        { symptom_id: 'ACT_009', weight: 3, role: 'core' },   // Reckless behavior
        { symptom_id: 'ACT_010', weight: 3, role: 'core' },   // Lying/manipulation
        { symptom_id: 'IDN_006', weight: 3, role: 'core' },   // Lack of empathy
        // Common (weight 2)
        { symptom_id: 'EMR_002', weight: 2, role: 'common' }, // Irritability
        { symptom_id: 'CPG_003', weight: 2, role: 'common' }, // Substance use
        { symptom_id: 'ACT_004', weight: 2, role: 'common' }, // Impulsivity
        // Associated (weight 1)
        { symptom_id: 'SOC_006', weight: 1, role: 'associated' }, // Relationship conflict
        { symptom_id: 'CPG_015', weight: 1, role: 'associated' }, // Explosive anger
        { symptom_id: 'SOC_003', weight: 1, role: 'associated' }, // Relationship difficulties
      ],
      red_flags: [],
    },

    // 34. DPD — Dependent Personality Disorder (9 mappings)
    {
      id: 'DPD',
      name: 'Dependent Personality Patterns',
      full_name: 'Dependent Personality Disorder',
      category: 'personality',
      description_for_user:
        'A pervasive and excessive need to be taken care of, leading to submissive and clinging behavior. ' +
        'Therapy can help develop greater independence and self-confidence.',
      minimum_duration: '1_year',
      minimum_duration_display: 'At least 1 year',
      minimum_symptoms_for_relevance: 4,
      always_recommend_professional: false,
      guide_path: '/learn/personality',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my need for reassurance indicate dependent personality patterns?',
        'What therapies help develop greater independence?',
      ],
      clinical_notes: 'DSM-5-TR 301.6. ICD-11 6D10.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'IDN_008', weight: 3, role: 'core' },   // Submissiveness
        { symptom_id: 'SOC_005', weight: 3, role: 'core' },   // Dependence on others
        { symptom_id: 'IDN_002', weight: 3, role: 'core' },   // Fear of abandonment
        { symptom_id: 'ANX_004', weight: 3, role: 'core' },   // Social anxiety
        // Common (weight 2)
        { symptom_id: 'MOD_007', weight: 2, role: 'common' }, // Low self-esteem
        { symptom_id: 'ANX_001', weight: 2, role: 'common' }, // Excessive worry
        // Associated (weight 1)
        { symptom_id: 'SOC_003', weight: 1, role: 'associated' }, // Relationship difficulties
        { symptom_id: 'MOD_001', weight: 1, role: 'associated' }, // Sadness
        { symptom_id: 'COG_006', weight: 1, role: 'associated' }, // Indecisiveness
      ],
      red_flags: [],
    },

    // 35. SZPD — Schizoid Personality Disorder (9 mappings)
    {
      id: 'SZPD',
      name: 'Schizoid Personality Patterns',
      full_name: 'Schizoid Personality Disorder',
      category: 'personality',
      description_for_user:
        'A pattern of detachment from social relationships and a restricted range of emotional expression. ' +
        'Understanding these patterns can help clarify personal needs and preferences.',
      minimum_duration: '1_year',
      minimum_duration_display: 'At least 1 year',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: false,
      guide_path: '/learn/personality',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my social preferences indicate schizoid personality patterns?',
        'Is my emotional detachment a concern?',
      ],
      clinical_notes: 'DSM-5-TR 301.20. ICD-11 6D10.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'SOC_009', weight: 3, role: 'core' },   // Emotional detachment from relationships
        { symptom_id: 'MOD_004', weight: 3, role: 'core' },   // Emotional numbness
        { symptom_id: 'SOC_001', weight: 3, role: 'core' },   // Social withdrawal
        { symptom_id: 'MOD_003', weight: 3, role: 'core' },   // Loss of interest
        // Common (weight 2)
        { symptom_id: 'EMR_007', weight: 2, role: 'common' }, // Chronic emptiness
        { symptom_id: 'MOD_007', weight: 2, role: 'common' }, // Low self-esteem
        // Associated (weight 1)
        { symptom_id: 'SOC_002', weight: 1, role: 'associated' }, // Avoiding social situations
        { symptom_id: 'ACT_003', weight: 1, role: 'associated' }, // Difficulty maintaining routines
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, // Fatigue
      ],
      red_flags: [],
    },

    // ─────────────────────────────────────────────────────────────────────
    // TIER 4: Trauma/Dissociative
    // ─────────────────────────────────────────────────────────────────────

    // 36. CPTSD — Complex PTSD (12 mappings)
    {
      id: 'CPTSD',
      name: 'Complex Trauma Response',
      full_name: 'Complex Post-Traumatic Stress Disorder',
      category: 'trauma',
      description_for_user:
        'In addition to classic trauma symptoms, complex PTSD includes difficulties with emotional regulation, ' +
        'self-concept, and relationships — often arising from prolonged or repeated trauma.',
      minimum_duration: '6_months',
      minimum_duration_display: 'At least 6 months',
      minimum_symptoms_for_relevance: 4,
      always_recommend_professional: true,
      guide_path: '/learn/conditions/complex-ptsd',
      coping_path: '/learn/coping/trauma-strategies',
      provider_questions: [
        'Could my symptoms indicate complex trauma?',
        'What is the difference between PTSD and complex PTSD?',
        'What therapies are most effective for complex trauma?',
      ],
      clinical_notes: 'ICD-11 6B41. Not in DSM-5-TR as separate diagnosis but recognized clinically. Requires PTSD symptoms plus disturbances in self-organization.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'EMR_003', weight: 3, role: 'core' },   // Flashbacks
        { symptom_id: 'COG_013', weight: 3, role: 'core' },   // Emotional dysregulation
        { symptom_id: 'IDN_001', weight: 3, role: 'core' },   // Unstable identity
        { symptom_id: 'SOC_003', weight: 3, role: 'core' },   // Relationship difficulties
        // Common (weight 2)
        { symptom_id: 'ANX_005', weight: 2, role: 'common' }, // Hypervigilance
        { symptom_id: 'EMR_006', weight: 2, role: 'common' }, // Shame
        { symptom_id: 'CPG_001', weight: 2, role: 'common' }, // Avoidance
        { symptom_id: 'MOD_004', weight: 2, role: 'common' }, // Emotional numbness
        // Associated (weight 1)
        { symptom_id: 'SLP_004', weight: 1, role: 'associated' }, // Nightmares
        { symptom_id: 'SLP_001', weight: 1, role: 'associated' }, // Insomnia
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, // Social withdrawal
        { symptom_id: 'MOD_002', weight: 1, role: 'associated' }, // Hopelessness
      ],
      red_flags: [
        { symptom_id: 'COG_008', note: 'Self-harm ideation may co-occur with complex trauma' },
        { symptom_id: 'COG_009', note: 'Suicidal ideation requires immediate crisis intervention' },
      ],
    },

    // 37. DID — Dissociative Identity Disorder (6 mappings)
    {
      id: 'DID',
      name: 'Dissociative Identity',
      full_name: 'Dissociative Identity Disorder',
      category: 'dissociative',
      description_for_user:
        'A complex condition involving disruption of identity characterized by two or more distinct personality states. ' +
        'Professional evaluation and specialized treatment are strongly recommended.',
      minimum_duration: '3_months',
      minimum_duration_display: 'At least 3 months',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: true,
      guide_path: '/learn/dissociation',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my experiences indicate dissociative identity disorder?',
        'What specialized treatments are available for DID?',
        'How can I find a dissociation specialist?',
      ],
      clinical_notes: 'DSM-5-TR 300.14. ICD-11 6B64. Requires disruption of identity with two or more distinct personality states.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'PRC_008', weight: 3, role: 'core' },   // Identity switching (URGENT red flag)
        { symptom_id: 'PRC_009', weight: 3, role: 'core' },   // Dissociative amnesia
        { symptom_id: 'COG_004', weight: 3, role: 'core' },   // Memory problems
        { symptom_id: 'PRC_002', weight: 3, role: 'core' },   // Depersonalization
        // Common (weight 2)
        { symptom_id: 'EMR_003', weight: 2, role: 'common' }, // Flashbacks
        // Associated (weight 1)
        { symptom_id: 'PRC_001', weight: 1, role: 'associated' }, // Derealization
      ],
      red_flags: [
        { symptom_id: 'PRC_008', note: 'Identity switching requires urgent specialized evaluation' },
      ],
    },

    // 38. OSDD — Other Specified Dissociative Disorder (7 mappings)
    {
      id: 'OSDD',
      name: 'Other Dissociative Experiences',
      full_name: 'Other Specified Dissociative Disorder',
      category: 'dissociative',
      description_for_user:
        'Dissociative experiences that cause significant distress but do not fully meet criteria for a specific ' +
        'dissociative disorder. Professional evaluation can help clarify these experiences.',
      minimum_duration: '1_month',
      minimum_duration_display: 'At least 1 month',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: true,
      guide_path: '/learn/dissociation',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my dissociative experiences indicate OSDD?',
        'What is the difference between OSDD and DID?',
      ],
      clinical_notes: 'DSM-5-TR 300.15. ICD-11 6B6Y. Subthreshold dissociative presentations.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'PRC_009', weight: 3, role: 'core' },   // Dissociative amnesia
        { symptom_id: 'PRC_002', weight: 3, role: 'core' },   // Depersonalization
        { symptom_id: 'PRC_001', weight: 3, role: 'core' },   // Derealization
        // Common (weight 2)
        { symptom_id: 'COG_004', weight: 2, role: 'common' }, // Memory problems
        { symptom_id: 'EMR_003', weight: 2, role: 'common' }, // Flashbacks
        // Associated (weight 1)
        { symptom_id: 'EMR_005', weight: 1, role: 'associated' }, // Feeling detached
        { symptom_id: 'MOD_004', weight: 1, role: 'associated' }, // Emotional numbness
      ],
      red_flags: [],
    },

    // 39. ASD_ACUTE — Acute Stress Disorder (9 mappings)
    {
      id: 'ASD_ACUTE',
      name: 'Acute Stress Response',
      full_name: 'Acute Stress Disorder',
      category: 'trauma',
      description_for_user:
        'A short-term condition that can develop after exposure to a traumatic event, lasting from 3 days to 1 month. ' +
        'Early intervention can prevent progression to PTSD.',
      minimum_duration: '1_week',
      minimum_duration_display: '3 days to 1 month after trauma',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: true,
      guide_path: '/learn/conditions/acute-stress',
      coping_path: '/learn/coping/trauma-strategies',
      provider_questions: [
        'Could my reaction to a recent event be acute stress disorder?',
        'How can early treatment prevent PTSD?',
      ],
      clinical_notes: 'DSM-5-TR 308.3. ICD-11 QE84. Duration 3 days to 1 month post-trauma.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'EMR_003', weight: 3, role: 'core' },   // Flashbacks
        { symptom_id: 'ANX_005', weight: 3, role: 'core' },   // Hypervigilance
        { symptom_id: 'CPG_001', weight: 3, role: 'core' },   // Avoidance
        { symptom_id: 'PRC_009', weight: 3, role: 'core' },   // Dissociative amnesia
        // Common (weight 2)
        { symptom_id: 'SLP_004', weight: 2, role: 'common' }, // Nightmares
        { symptom_id: 'PRC_001', weight: 2, role: 'common' }, // Derealization
        { symptom_id: 'PRC_002', weight: 2, role: 'common' }, // Depersonalization
        // Associated (weight 1)
        { symptom_id: 'EMR_002', weight: 1, role: 'associated' }, // Irritability
        { symptom_id: 'COG_001', weight: 1, role: 'associated' }, // Difficulty concentrating
      ],
      red_flags: [],
    },

    // ─────────────────────────────────────────────────────────────────────
    // TIER 5: OCD/Impulse Control
    // ─────────────────────────────────────────────────────────────────────

    // 40. TTM — Trichotillomania (7 mappings)
    {
      id: 'TTM',
      name: 'Hair-Pulling',
      full_name: 'Trichotillomania (Hair-Pulling Disorder)',
      category: 'obsessive_compulsive',
      description_for_user:
        'Recurrent pulling out of hair resulting in hair loss, despite repeated attempts to stop. ' +
        'Behavioral therapies like habit reversal training are effective treatments.',
      minimum_duration: '3_months',
      minimum_duration_display: 'At least 3 months',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: false,
      guide_path: '/learn/conditions/trichotillomania',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my hair-pulling be trichotillomania?',
        'What is habit reversal training?',
      ],
      clinical_notes: 'DSM-5-TR 312.39. ICD-11 6B25.0. Body-focused repetitive behavior disorder.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'CPG_013', weight: 3, role: 'core' },   // Hair pulling
        { symptom_id: 'ANX_001', weight: 3, role: 'core' },   // Worry/tension
        { symptom_id: 'CPG_002', weight: 3, role: 'core' },   // Compulsive behaviors
        // Common (weight 2)
        { symptom_id: 'EMR_006', weight: 2, role: 'common' }, // Shame
        { symptom_id: 'ANX_006', weight: 2, role: 'common' }, // Fear of losing control
        // Associated (weight 1)
        { symptom_id: 'SOC_002', weight: 1, role: 'associated' }, // Avoiding social situations
        { symptom_id: 'MOD_007', weight: 1, role: 'associated' }, // Low self-esteem
      ],
      red_flags: [],
    },

    // 41. SPD_EXCOR — Excoriation (Skin-Picking) Disorder (7 mappings)
    {
      id: 'SPD_EXCOR',
      name: 'Skin-Picking',
      full_name: 'Excoriation (Skin-Picking) Disorder',
      category: 'obsessive_compulsive',
      description_for_user:
        'Recurrent picking at skin resulting in skin lesions, despite repeated attempts to stop. ' +
        'Behavioral therapies like habit reversal training are effective treatments.',
      minimum_duration: '3_months',
      minimum_duration_display: 'At least 3 months',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: false,
      guide_path: '/learn/conditions/excoriation',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my skin-picking be excoriation disorder?',
        'What treatments are available for skin-picking?',
      ],
      clinical_notes: 'DSM-5-TR 698.4. ICD-11 6B25.1. Body-focused repetitive behavior disorder.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'CPG_014', weight: 3, role: 'core' },   // Skin picking
        { symptom_id: 'ANX_001', weight: 3, role: 'core' },   // Worry/tension
        { symptom_id: 'CPG_002', weight: 3, role: 'core' },   // Compulsive behaviors
        // Common (weight 2)
        { symptom_id: 'EMR_006', weight: 2, role: 'common' }, // Shame
        { symptom_id: 'ANX_006', weight: 2, role: 'common' }, // Fear of losing control
        // Associated (weight 1)
        { symptom_id: 'SOC_002', weight: 1, role: 'associated' }, // Avoiding social situations
        { symptom_id: 'MOD_007', weight: 1, role: 'associated' }, // Low self-esteem
      ],
      red_flags: [],
    },

    // 42. IED — Intermittent Explosive Disorder (8 mappings)
    {
      id: 'IED',
      name: 'Intermittent Explosive Disorder',
      full_name: 'Intermittent Explosive Disorder',
      category: 'obsessive_compulsive',
      description_for_user:
        'Recurrent behavioral outbursts representing a failure to control aggressive impulses. ' +
        'The outbursts are out of proportion to the situation and may be followed by remorse.',
      minimum_duration: '3_months',
      minimum_duration_display: 'At least 3 months',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: true,
      guide_path: '/learn/conditions/impulse-control',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my explosive outbursts indicate IED?',
        'What treatments help manage explosive anger?',
      ],
      clinical_notes: 'DSM-5-TR 312.34. ICD-11 6C73. Requires recurrent outbursts over 3 months.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'CPG_015', weight: 3, role: 'core' },   // Explosive anger
        { symptom_id: 'EMR_002', weight: 3, role: 'core' },   // Irritability
        { symptom_id: 'ACT_004', weight: 3, role: 'core' },   // Impulsivity
        // Common (weight 2)
        { symptom_id: 'SOC_006', weight: 2, role: 'common' }, // Relationship conflict
        { symptom_id: 'MOD_006', weight: 2, role: 'common' }, // Guilt
        // Associated (weight 1)
        { symptom_id: 'SOC_003', weight: 1, role: 'associated' }, // Relationship difficulties
        { symptom_id: 'ACT_009', weight: 1, role: 'associated' }, // Reckless behavior
        { symptom_id: 'ENR_002', weight: 1, role: 'associated' }, // Restlessness
      ],
      red_flags: [],
    },

    // ─────────────────────────────────────────────────────────────────────
    // TIER 6: Extensions
    // ─────────────────────────────────────────────────────────────────────

    // 43. HYPER — Hypersomnolence Disorder (8 mappings)
    {
      id: 'HYPER',
      name: 'Hypersomnolence',
      full_name: 'Hypersomnolence Disorder',
      category: 'sleep',
      description_for_user:
        'Excessive sleepiness despite a main sleep period lasting at least 7 hours. ' +
        'Characterized by difficulty waking, daytime sleepiness, or prolonged nonrestorative naps.',
      minimum_duration: '3_months',
      minimum_duration_display: 'At least 3 months',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: true,
      guide_path: '/learn/conditions/hypersomnolence',
      coping_path: '/tools/sleep-architect',
      provider_questions: [
        'Could my excessive sleepiness indicate hypersomnolence disorder?',
        'Should I have a sleep study?',
      ],
      clinical_notes: 'DSM-5-TR 780.54. ICD-11 7A20. Requires excessive sleepiness at least 3 times/week for 3+ months.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'SLP_006', weight: 3, role: 'core' },   // Excessive daytime sleepiness
        { symptom_id: 'SLP_008', weight: 3, role: 'core' },   // Long sleep duration
        { symptom_id: 'SLP_007', weight: 3, role: 'core' },   // Sleep inertia
        // Common (weight 2)
        { symptom_id: 'ENR_001', weight: 2, role: 'common' }, // Fatigue
        { symptom_id: 'COG_003', weight: 2, role: 'common' }, // Brain fog
        // Associated (weight 1)
        { symptom_id: 'COG_001', weight: 1, role: 'associated' }, // Difficulty concentrating
        { symptom_id: 'MOD_003', weight: 1, role: 'associated' }, // Loss of interest
        { symptom_id: 'ACT_002', weight: 1, role: 'associated' }, // Neglecting responsibilities
      ],
      red_flags: [],
    },

    // 44. ARFID — Avoidant/Restrictive Food Intake Disorder (7 mappings)
    {
      id: 'ARFID',
      name: 'Avoidant/Restrictive Eating',
      full_name: 'Avoidant/Restrictive Food Intake Disorder',
      category: 'eating',
      description_for_user:
        'An eating disturbance based on sensory sensitivity, fear of aversive consequences of eating, or lack of interest ' +
        'in food — not driven by body image concerns. Professional evaluation is recommended.',
      minimum_duration: '1_month',
      minimum_duration_display: 'At least 1 month',
      minimum_symptoms_for_relevance: 2,
      always_recommend_professional: true,
      guide_path: '/learn/conditions/arfid',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my food avoidance be ARFID?',
        'How is ARFID different from anorexia?',
        'What treatments are available for ARFID?',
      ],
      clinical_notes: 'DSM-5-TR 307.59. ICD-11 6B83. Distinguished from AN by absence of body image disturbance.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'APT_005', weight: 3, role: 'core' },   // Sensory-based food avoidance
        { symptom_id: 'APT_006', weight: 3, role: 'core' },   // Fear of aversive consequences
        { symptom_id: 'APT_001', weight: 3, role: 'core' },   // Loss of appetite
        // Common (weight 2)
        { symptom_id: 'ANX_001', weight: 2, role: 'common' }, // Worry about eating
        { symptom_id: 'APT_003', weight: 2, role: 'common' }, // Weight changes
        // Associated (weight 1)
        { symptom_id: 'ENR_001', weight: 1, role: 'associated' }, // Fatigue
        { symptom_id: 'SOC_001', weight: 1, role: 'associated' }, // Social withdrawal (around food)
      ],
      red_flags: [],
    },

    // 45. CYC — Cyclothymic Disorder (10 mappings)
    {
      id: 'CYC',
      name: 'Cyclothymia',
      full_name: 'Cyclothymic Disorder',
      category: 'mood',
      description_for_user:
        'A chronic pattern of mood instability involving numerous periods of hypomanic and depressive symptoms ' +
        'that do not meet criteria for full manic or depressive episodes.',
      minimum_duration: '2_years',
      minimum_duration_display: 'At least 2 years',
      minimum_symptoms_for_relevance: 3,
      always_recommend_professional: false,
      guide_path: '/learn/conditions/cyclothymia',
      coping_path: '/tools/mood-journal',
      provider_questions: [
        'Could my mood cycling be cyclothymia?',
        'How is cyclothymia different from bipolar disorder?',
        'What treatments are effective for cyclothymic patterns?',
      ],
      clinical_notes: 'DSM-5-TR 301.13. ICD-11 6A62. Chronic fluctuating mood for at least 2 years with numerous hypomanic and depressive periods.',
      is_active: true,
      version: '1.0.0',
      symptom_mappings: [
        // Core (weight 3)
        { symptom_id: 'MOD_010', weight: 3, role: 'core' },   // Hypomania
        { symptom_id: 'MOD_001', weight: 3, role: 'core' },   // Sadness
        { symptom_id: 'EMR_001', weight: 3, role: 'core' },   // Mood swings
        { symptom_id: 'ENR_001', weight: 3, role: 'core' },   // Fatigue
        // Common (weight 2)
        { symptom_id: 'SLP_001', weight: 2, role: 'common' }, // Insomnia
        { symptom_id: 'COG_002', weight: 2, role: 'common' }, // Racing thoughts
        { symptom_id: 'SLP_002', weight: 2, role: 'common' }, // Oversleeping
        // Associated (weight 1)
        { symptom_id: 'COG_001', weight: 1, role: 'associated' }, // Difficulty concentrating
        { symptom_id: 'MOD_003', weight: 1, role: 'associated' }, // Loss of interest
        { symptom_id: 'SOC_003', weight: 1, role: 'associated' }, // Relationship difficulties
      ],
      red_flags: [],
    },
  ];
}

function createTestCrisisResources(): CrisisResourcesByRegion {
  return {
    US: [
      {
        id: 'cr-us-988',
        region_code: 'US',
        name: '988 Suicide & Crisis Lifeline',
        type: 'hotline',
        phone: '988',
        text_instruction: 'Text 988',
        url: 'https://988lifeline.org',
        email: null,
        description: 'Free, confidential support for people in distress. Available 24/7 via call or text.',
        hours: '24/7',
        languages: ['English', 'Spanish'],
        priority: 1,
        condition_specific: null,
        is_active: true,
        last_verified: '2025-01-01T00:00:00Z',
      },
      {
        id: 'cr-us-ctl',
        region_code: 'US',
        name: 'Crisis Text Line',
        type: 'text',
        phone: null,
        text_instruction: 'Text HOME to 741741',
        url: 'https://www.crisistextline.org',
        email: null,
        description: 'Free crisis counseling via text message. Trained crisis counselors available 24/7.',
        hours: '24/7',
        languages: ['English', 'Spanish'],
        priority: 2,
        condition_specific: null,
        is_active: true,
        last_verified: '2025-01-01T00:00:00Z',
      },
    ],
    GB: [
      {
        id: 'cr-gb-sam',
        region_code: 'GB',
        name: 'Samaritans',
        type: 'hotline',
        phone: '116 123',
        text_instruction: null,
        url: 'https://www.samaritans.org',
        email: 'jo@samaritans.org',
        description: 'Emotional support for anyone in distress. Free to call, 24 hours a day, 365 days a year.',
        hours: '24/7',
        languages: ['English'],
        priority: 1,
        condition_specific: null,
        is_active: true,
        last_verified: '2025-01-01T00:00:00Z',
      },
    ],
    DEFAULT: [
      {
        id: 'cr-default-bw',
        region_code: 'DEFAULT',
        name: 'Befrienders Worldwide',
        type: 'directory',
        phone: null,
        text_instruction: null,
        url: 'https://www.befrienders.org',
        email: null,
        description: 'International directory of emotional support centers. Find a helpline in your country.',
        hours: 'Varies by location',
        languages: ['Multiple'],
        priority: 1,
        condition_specific: null,
        is_active: true,
        last_verified: '2025-01-01T00:00:00Z',
      },
      {
        id: 'cr-default-iasp',
        region_code: 'DEFAULT',
        name: 'IASP Crisis Centre Directory',
        type: 'directory',
        phone: null,
        text_instruction: null,
        url: 'https://www.iasp.info/resources/Crisis_Centres/',
        email: null,
        description: 'International Association for Suicide Prevention — global directory of crisis centers.',
        hours: 'Varies by location',
        languages: ['Multiple'],
        priority: 2,
        condition_specific: null,
        is_active: true,
        last_verified: '2025-01-01T00:00:00Z',
      },
    ],
  };
}
