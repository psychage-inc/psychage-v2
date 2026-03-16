// ============================================================================
// Content Plan — Categories 1–3
// ============================================================================

import { CategoryPlan, planId } from './types';

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY 1: Emotional Regulation & Self-Awareness (80 articles)
// ═══════════════════════════════════════════════════════════════════════════

export const CATEGORY_01: CategoryPlan = {
  category: 1,
  name: 'Emotional Regulation & Self-Awareness',
  slug: 'emotional-regulation',
  target: 80,
  subtopics: [
    // -----------------------------------------------------------------------
    // 1.1 Understanding Your Emotions (001–010) ✅ WRITTEN
    // -----------------------------------------------------------------------
    {
      number: 1,
      name: 'Understanding Your Emotions',
      range: '001–010',
      articles: [
        { id: planId(1, 1), title: "What Are Emotions, Really? A Beginner's Guide to How Feelings Work", type: 'self_help' },
        { id: planId(1, 2), title: 'The Emotion Spectrum: Why Your Feelings Exist on a Continuum, Not in Boxes', type: 'self_help' },
        { id: planId(1, 3), title: "Primary vs. Secondary Emotions: What You Feel First vs. What Shows Up Next", type: 'self_help' },
        { id: planId(1, 4), title: 'The Purpose of Uncomfortable Emotions: Why Pain, Fear, and Sadness Matter', type: 'self_help' },
        { id: planId(1, 5), title: "Emotional Granularity: Why 'I Feel Bad' Isn't Enough", type: 'self_help' },
        { id: planId(1, 6), title: 'How Emotions Form: The Brain-Body Loop That Creates Your Feelings', type: 'research_digest' },
        { id: planId(1, 7), title: 'The Difference Between Feelings, Moods, and Temperaments', type: 'self_help' },
        { id: planId(1, 8), title: "Why You Feel Things More Intensely Than Others (And Why That's Okay)", type: 'self_help' },
        { id: planId(1, 9), title: 'Emotional Suppression vs. Emotional Expression: Finding the Middle Path', type: 'self_help' },
        { id: planId(1, 10), title: "Your Emotional Baseline: Understanding Your Personal 'Normal'", type: 'self_help' },
      ],
    },

    // -----------------------------------------------------------------------
    // 1.2 Everyday Emotional Regulation Strategies (011–020)
    // -----------------------------------------------------------------------
    {
      number: 2,
      name: 'Everyday Emotional Regulation Strategies',
      range: '011–020',
      articles: [
        { id: planId(1, 11), title: '10 Evidence-Based Techniques to Regulate Your Emotions in the Moment', type: 'self_help' },
        { id: planId(1, 12), title: 'The STOP Technique: A 60-Second Reset When Emotions Overwhelm You', type: 'self_help' },
        { id: planId(1, 13), title: 'Breathing Exercises That Actually Work for Emotional Regulation', type: 'self_help' },
        { id: planId(1, 14), title: 'Grounding Techniques: How to Come Back to the Present When Feelings Take Over', type: 'self_help' },
        { id: planId(1, 15), title: 'Cognitive Reappraisal: How to Change What You Feel by Changing How You Think', type: 'self_help' },
        { id: planId(1, 16), title: 'The Power of Naming Your Emotions: Why Labeling Feelings Calms the Brain', type: 'research_digest' },
        { id: planId(1, 17), title: 'Emotional First Aid: What to Do in the First 5 Minutes of a Strong Emotion', type: 'self_help' },
        { id: planId(1, 18), title: 'How to Sit with Uncomfortable Emotions Without Numbing or Avoiding', type: 'self_help' },
        { id: planId(1, 19), title: 'Using Movement to Regulate Your Nervous System', type: 'self_help' },
        { id: planId(1, 20), title: 'Building an Emotional Regulation Toolkit: Your Personalized Plan', type: 'self_help' },
      ],
    },

    // -----------------------------------------------------------------------
    // 1.3 Self-Awareness & Reflection (021–030)
    // -----------------------------------------------------------------------
    {
      number: 3,
      name: 'Self-Awareness & Reflection',
      range: '021–030',
      articles: [
        { id: planId(1, 21), title: 'What Is Self-Awareness? The Skill That Changes Everything', type: 'self_help' },
        { id: planId(1, 22), title: "Journaling for Self-Awareness: Prompts That Go Beyond 'How Was Your Day'", type: 'self_help' },
        { id: planId(1, 23), title: 'Body Awareness: Learning to Read the Physical Signals of Your Emotions', type: 'self_help' },
        { id: planId(1, 24), title: 'How Your Thoughts Shape Your Feelings (And How to Notice the Pattern)', type: 'self_help' },
        { id: planId(1, 25), title: 'The Observer Self: Learning to Watch Your Emotions Without Being Consumed', type: 'self_help' },
        { id: planId(1, 26), title: 'Mindfulness for Emotional Awareness: A Practical Starting Guide', type: 'self_help' },
        { id: planId(1, 27), title: "Common Blind Spots: Emotions You Might Not Realize You're Feeling", type: 'self_help' },
        { id: planId(1, 28), title: 'How to Ask for Honest Feedback About Your Emotional Patterns', type: 'self_help' },
        { id: planId(1, 29), title: 'The Role of Values in Emotional Self-Awareness', type: 'self_help' },
        { id: planId(1, 30), title: 'Self-Awareness Without Self-Judgment: A Compassionate Approach', type: 'self_help' },
      ],
    },

    // -----------------------------------------------------------------------
    // 1.4 Emotional Intelligence in Practice (031–040)
    // -----------------------------------------------------------------------
    {
      number: 4,
      name: 'Emotional Intelligence in Practice',
      range: '031–040',
      articles: [
        { id: planId(1, 31), title: 'What Is Emotional Intelligence? Beyond the Buzzword', type: 'self_help' },
        { id: planId(1, 32), title: "Reading Other People's Emotions: Empathy, Attunement, and Social Cues", type: 'self_help' },
        { id: planId(1, 33), title: 'Emotional Intelligence in Conversations: Listening Beyond Words', type: 'self_help' },
        { id: planId(1, 34), title: 'How to Respond (Not React) in Emotionally Charged Situations', type: 'self_help' },
        { id: planId(1, 35), title: 'Emotional Intelligence at Work: Managing Feelings in Professional Settings', type: 'self_help' },
        { id: planId(1, 36), title: 'The Empathy Spectrum: From Cognitive to Affective to Compassionate', type: 'research_digest' },
        { id: planId(1, 37), title: "Emotional Contagion: Why Other People's Moods Affect Yours", type: 'research_digest' },
        { id: planId(1, 38), title: 'Setting Emotional Boundaries While Staying Connected', type: 'self_help' },
        { id: planId(1, 39), title: 'How to Have Difficult Conversations with Emotional Intelligence', type: 'self_help' },
        { id: planId(1, 40), title: 'Teaching Emotional Intelligence: Skills for Parents, Teachers, and Mentors', type: 'self_help' },
      ],
    },

    // -----------------------------------------------------------------------
    // 1.5 Emotional Patterns & Habits (041–050)
    // -----------------------------------------------------------------------
    {
      number: 5,
      name: 'Emotional Patterns & Habits',
      range: '041–050',
      articles: [
        { id: planId(1, 41), title: 'Emotional Habits: How Repetitive Feeling Patterns Form and Stick', type: 'self_help' },
        { id: planId(1, 42), title: 'Why You Always React the Same Way: Understanding Emotional Triggers', type: 'self_help' },
        { id: planId(1, 43), title: 'The Cycle of Emotional Avoidance: Why Running from Feelings Makes Them Louder', type: 'self_help' },
        { id: planId(1, 44), title: 'Emotional Eating, Shopping, and Scrolling: Understanding Coping Mechanisms', type: 'self_help' },
        { id: planId(1, 45), title: 'How Childhood Experiences Shape Your Adult Emotional Patterns', type: 'self_help' },
        { id: planId(1, 46), title: "The Anger Iceberg: What's Really Underneath Your Frustration", type: 'self_help' },
        { id: planId(1, 47), title: 'Shame vs. Guilt: Two Very Different Emotions with Very Different Effects', type: 'self_help' },
        { id: planId(1, 48), title: 'Rumination: Why Your Brain Replays Painful Moments (And How to Stop)', type: 'self_help' },
        { id: planId(1, 49), title: "Emotional Perfectionism: The Hidden Pressure to Always Feel 'Good'", type: 'self_help' },
        { id: planId(1, 50), title: 'Breaking the Pattern: How to Build New Emotional Responses', type: 'self_help' },
      ],
    },

    // -----------------------------------------------------------------------
    // 1.6 The Neuroscience of Emotions (051–060)
    // -----------------------------------------------------------------------
    {
      number: 6,
      name: 'The Neuroscience of Emotions',
      range: '051–060',
      articles: [
        { id: planId(1, 51), title: 'Your Brain on Emotions: A Tour of the Neural Networks That Create Feelings', type: 'research_digest' },
        { id: planId(1, 52), title: "The Amygdala's Role: How Your Brain Detects Threat (Sometimes Too Quickly)", type: 'research_digest' },
        { id: planId(1, 53), title: 'Neuroplasticity and Emotional Change: Can You Rewire Your Feeling Patterns?', type: 'research_digest' },
        { id: planId(1, 54), title: "The Vagus Nerve: Your Body's Built-In Calm-Down System", type: 'research_digest' },
        { id: planId(1, 55), title: 'How Stress Hormones Hijack Your Emotional Regulation', type: 'research_digest' },
        { id: planId(1, 56), title: 'The Neuroscience of Emotional Contagion: Mirror Neurons and Empathy', type: 'research_digest' },
        { id: planId(1, 57), title: 'Why Sleep Deprivation Makes Everything Feel Worse: The Brain Science', type: 'research_digest' },
        { id: planId(1, 58), title: 'How Exercise Changes Your Brain Chemistry and Emotional Baseline', type: 'research_digest' },
        { id: planId(1, 59), title: "The Default Mode Network: What Your Brain Does When You're Lost in Thought", type: 'research_digest' },
        { id: planId(1, 60), title: "Polyvagal Theory in Plain Language: Your Nervous System's Three States", type: 'research_digest' },
      ],
    },

    // -----------------------------------------------------------------------
    // 1.7 Emotions Across Life Stages (061–070)
    // -----------------------------------------------------------------------
    {
      number: 7,
      name: 'Emotions Across Life Stages',
      range: '061–070',
      articles: [
        { id: planId(1, 61), title: 'Emotional Development in Children: What Parents Need to Know', type: 'self_help' },
        { id: planId(1, 62), title: 'Adolescent Emotions: Why Teenage Feelings Are So Intense', type: 'self_help' },
        { id: planId(1, 63), title: 'Emotional Challenges of Your 20s: Identity, Comparison, and Uncertainty', type: 'self_help' },
        { id: planId(1, 64), title: 'Midlife Emotional Shifts: What Changes in Your 40s and 50s', type: 'self_help' },
        { id: planId(1, 65), title: 'Emotional Wellbeing in Older Adulthood: Resilience, Loss, and Wisdom', type: 'self_help' },
        { id: planId(1, 66), title: 'How Major Life Transitions Reshape Your Emotional Landscape', type: 'self_help' },
        { id: planId(1, 67), title: 'Emotional Regulation During Pregnancy and Postpartum', type: 'self_help' },
        { id: planId(1, 68), title: 'Emotions and Menopause: Understanding Hormonal Emotional Changes', type: 'self_help' },
        { id: planId(1, 69), title: 'Retirement and Emotional Identity: Who Are You Without Your Role?', type: 'self_help' },
        { id: planId(1, 70), title: 'Teaching Kids Emotional Regulation: Age-Appropriate Strategies', type: 'self_help' },
      ],
    },

    // -----------------------------------------------------------------------
    // 1.8 Advanced: Emotional Complexity & Growth (071–080)
    // -----------------------------------------------------------------------
    {
      number: 8,
      name: 'Advanced: Emotional Complexity & Growth',
      range: '071–080',
      articles: [
        { id: planId(1, 71), title: 'Emotional Agility: Moving Flexibly Through Complex Feelings', type: 'self_help' },
        { id: planId(1, 72), title: 'Holding Two Feelings at Once: The Skill of Emotional Dialectics', type: 'self_help' },
        { id: planId(1, 73), title: 'Post-Traumatic Growth and Emotional Transformation', type: 'self_help' },
        { id: planId(1, 74), title: 'The Role of Positive Emotions in Building Resilience', type: 'research_digest' },
        { id: planId(1, 75), title: 'Emotional Wisdom: What Research Says About Growing Through Difficulty', type: 'research_digest' },
        { id: planId(1, 76), title: "Alexithymia: When You Can't Identify or Describe Your Emotions", type: 'condition_deep_dive' },
        { id: planId(1, 77), title: 'Emotion-Focused Therapy: What It Is and Who It Helps', type: 'treatment_guide' },
        { id: planId(1, 78), title: 'Radical Acceptance: Letting Go of the Fight Against Your Feelings', type: 'self_help' },
        { id: planId(1, 79), title: 'Emotional Mastery vs. Emotional Control: Why the Difference Matters', type: 'self_help' },
        { id: planId(1, 80), title: 'Your Emotional Future: Building a Lifelong Practice of Emotional Awareness', type: 'self_help' },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY 2: Anxiety, Stress & Overwhelm (90 articles)
// ═══════════════════════════════════════════════════════════════════════════

export const CATEGORY_02: CategoryPlan = {
  category: 2,
  name: 'Anxiety, Stress & Overwhelm',
  slug: 'anxiety-stress',
  target: 90,
  subtopics: [
    {
      number: 1,
      name: 'Understanding Anxiety',
      range: '001–010',
      articles: [
        { id: planId(2, 1), title: "What Is Anxiety? A Complete Guide to Your Body's Alarm System", type: 'self_help' },
        { id: planId(2, 2), title: 'Normal Worry vs. Anxiety Disorder: How to Tell the Difference', type: 'self_help' },
        { id: planId(2, 3), title: 'The Anxiety Cycle: How Avoidance Feeds Fear', type: 'self_help' },
        { id: planId(2, 4), title: 'Why Anxiety Feels So Physical: Understanding the Mind-Body Connection', type: 'self_help' },
        { id: planId(2, 5), title: 'Types of Anxiety Disorders: A Clear Overview', type: 'self_help' },
        { id: planId(2, 6), title: 'What Causes Anxiety? Genetics, Environment, and the Brain', type: 'research_digest' },
        { id: planId(2, 7), title: 'How Anxiety Develops Over Time: From First Episode to Chronic Pattern', type: 'self_help' },
        { id: planId(2, 8), title: "Anxiety in Numbers: What the Research Tells Us About Who's Affected", type: 'research_digest' },
        { id: planId(2, 9), title: 'The Evolutionary Purpose of Anxiety: Why Your Brain Is Wired to Worry', type: 'research_digest' },
        { id: planId(2, 10), title: 'Anxiety vs. Excitement: How Your Brain Processes Both the Same Way', type: 'research_digest' },
      ],
    },
    {
      number: 2,
      name: 'Panic, Physical Anxiety & Somatic Symptoms',
      range: '011–020',
      articles: [
        { id: planId(2, 11), title: 'Panic Attacks Explained: What Happens in Your Brain and Body', type: 'self_help' },
        { id: planId(2, 12), title: "'Am I Having a Heart Attack?' — How to Tell the Difference from a Panic Attack", type: 'self_help' },
        { id: planId(2, 13), title: 'Hyperventilation and Anxiety: Why Breathing Goes Wrong and How to Fix It', type: 'self_help' },
        { id: planId(2, 14), title: "Chest Tightness, Tingling, and Dizziness: Understanding Anxiety's Physical Symptoms", type: 'self_help' },
        { id: planId(2, 15), title: 'Health Anxiety: When Worry About Illness Becomes the Illness', type: 'condition_deep_dive' },
        { id: planId(2, 16), title: 'The Nervous Stomach: Why Anxiety Targets Your Gut', type: 'self_help' },
        { id: planId(2, 17), title: 'Panic Disorder: When Panic Attacks Become a Pattern', type: 'condition_deep_dive' },
        { id: planId(2, 18), title: 'Interoception and Anxiety: How Body Awareness Can Help or Hurt', type: 'research_digest' },
        { id: planId(2, 19), title: 'Agoraphobia: When the Fear of Panic Shrinks Your World', type: 'condition_deep_dive' },
        { id: planId(2, 20), title: 'Night Panic: Why Anxiety Wakes You Up and What to Do About It', type: 'self_help' },
      ],
    },
    {
      number: 3,
      name: 'Social Anxiety & Fear of Judgment',
      range: '021–030',
      articles: [
        { id: planId(2, 21), title: 'Social Anxiety Disorder: More Than Just Shyness', type: 'condition_deep_dive' },
        { id: planId(2, 22), title: 'The Inner Critic in Social Anxiety: Why You Assume the Worst', type: 'self_help' },
        { id: planId(2, 23), title: 'Performance Anxiety: Stage Fright, Test Anxiety, and Public Speaking Fear', type: 'self_help' },
        { id: planId(2, 24), title: 'Social Anxiety at Work: Managing Fear in Professional Settings', type: 'self_help' },
        { id: planId(2, 25), title: 'Social Media and Social Anxiety: How Digital Comparison Fuels Fear', type: 'self_help' },
        { id: planId(2, 26), title: 'Dating with Social Anxiety: A Practical Guide', type: 'self_help' },
        { id: planId(2, 27), title: 'Why Social Anxiety Makes You Avoid Eye Contact, Phone Calls, and Small Talk', type: 'self_help' },
        { id: planId(2, 28), title: 'Selective Mutism in Adults: When Anxiety Steals Your Voice', type: 'condition_deep_dive' },
        { id: planId(2, 29), title: 'Social Anxiety in College: Navigating Campus Life When Connection Feels Threatening', type: 'self_help' },
        { id: planId(2, 30), title: 'Recovery from Social Anxiety: What Treatment Looks Like', type: 'treatment_guide' },
      ],
    },
    {
      number: 4,
      name: 'Chronic Stress & Overwhelm',
      range: '031–040',
      articles: [
        { id: planId(2, 31), title: 'What Is Chronic Stress? How Ongoing Pressure Changes Your Brain and Body', type: 'self_help' },
        { id: planId(2, 32), title: 'The Stress Response System: Understanding Cortisol, Adrenaline, and Your Nervous System', type: 'research_digest' },
        { id: planId(2, 33), title: 'Overwhelm: When Everything Feels Like Too Much at Once', type: 'self_help' },
        { id: planId(2, 34), title: 'Decision Fatigue: Why Too Many Choices Drain Your Mental Energy', type: 'self_help' },
        { id: planId(2, 35), title: "Stress and Memory: Why You Can't Think Clearly Under Pressure", type: 'research_digest' },
        { id: planId(2, 36), title: 'Chronic Stress and Physical Health: The Long-Term Consequences', type: 'research_digest' },
        { id: planId(2, 37), title: 'Financial Stress and Mental Health: Breaking the Worry Cycle', type: 'self_help' },
        { id: planId(2, 38), title: 'Caregiver Stress: When Taking Care of Others Depletes You', type: 'self_help' },
        { id: planId(2, 39), title: 'How Stress Accumulates: Understanding Allostatic Load', type: 'research_digest' },
        { id: planId(2, 40), title: 'Stress Inoculation: How Controlled Exposure Builds Resilience', type: 'self_help' },
      ],
    },
    {
      number: 5,
      name: 'Burnout & Emotional Exhaustion',
      range: '041–050',
      articles: [
        { id: planId(2, 41), title: 'What Is Burnout? The Three Dimensions of Emotional Exhaustion', type: 'self_help' },
        { id: planId(2, 42), title: 'Am I Burned Out or Just Tired? How to Tell the Difference', type: 'self_help' },
        { id: planId(2, 43), title: "The 12 Stages of Burnout: Recognizing the Progression Before It's Too Late", type: 'self_help' },
        { id: planId(2, 44), title: 'Burnout in Healthcare Workers: A Crisis Within a Crisis', type: 'self_help' },
        { id: planId(2, 45), title: 'Academic Burnout: When the Pressure to Perform Breaks Students Down', type: 'self_help' },
        { id: planId(2, 46), title: 'Parental Burnout: When Raising Children Depletes Your Capacity', type: 'self_help' },
        { id: planId(2, 47), title: 'Recovery from Burnout: What Science Says About How Long It Actually Takes', type: 'self_help' },
        { id: planId(2, 48), title: 'Burnout and Cynicism: When Exhaustion Changes How You See the World', type: 'self_help' },
        { id: planId(2, 49), title: 'Preventing Burnout: Organizational vs. Individual Strategies', type: 'self_help' },
        { id: planId(2, 50), title: "Why Rest Alone Doesn't Fix Burnout: The Missing Pieces", type: 'self_help' },
      ],
    },
    {
      number: 6,
      name: 'Phobias & Specific Fears',
      range: '051–060',
      articles: [
        { id: planId(2, 51), title: 'What Are Phobias? Understanding Irrational but Powerful Fears', type: 'self_help' },
        { id: planId(2, 52), title: 'Common Phobias Explained: From Heights to Needles to Flying', type: 'self_help' },
        { id: planId(2, 53), title: 'How Phobias Develop: Classical Conditioning and Fear Learning', type: 'research_digest' },
        { id: planId(2, 54), title: 'Exposure Therapy for Phobias: How Facing Fear Rewires the Brain', type: 'treatment_guide' },
        { id: planId(2, 55), title: 'Needle Phobia: When Fear of Medical Procedures Becomes Dangerous', type: 'self_help' },
        { id: planId(2, 56), title: 'Claustrophobia: Understanding the Fear of Enclosed Spaces', type: 'self_help' },
        { id: planId(2, 57), title: 'Animal Phobias: Why Some Fears Feel Hardwired', type: 'self_help' },
        { id: planId(2, 58), title: 'Emetophobia: The Little-Known Fear That Controls Daily Life', type: 'self_help' },
        { id: planId(2, 59), title: 'Blood-Injection-Injury Phobia: The Only Phobia That Makes You Faint', type: 'research_digest' },
        { id: planId(2, 60), title: "When Your Child Has a Phobia: A Parent's Guide to Helping", type: 'self_help' },
      ],
    },
    {
      number: 7,
      name: 'Evidence-Based Coping Strategies',
      range: '061–070',
      articles: [
        { id: planId(2, 61), title: '12 Coping Strategies for Anxiety That Research Actually Supports', type: 'self_help' },
        { id: planId(2, 62), title: 'The 5-4-3-2-1 Grounding Technique: How Sensory Focus Calms Anxiety', type: 'self_help' },
        { id: planId(2, 63), title: 'Progressive Muscle Relaxation: A Step-by-Step Guide', type: 'self_help' },
        { id: planId(2, 64), title: 'Box Breathing and Other Breathwork Techniques for Anxiety Relief', type: 'self_help' },
        { id: planId(2, 65), title: 'Cognitive Restructuring: How to Challenge Anxious Thoughts', type: 'self_help' },
        { id: planId(2, 66), title: 'Worry Time: The Counterintuitive Strategy That Reduces Anxious Thinking', type: 'self_help' },
        { id: planId(2, 67), title: 'Behavioral Activation: Why Doing Something (Anything) Helps When Anxiety Paralyzes', type: 'self_help' },
        { id: planId(2, 68), title: 'Mindfulness-Based Stress Reduction: What the Evidence Shows', type: 'treatment_guide' },
        { id: planId(2, 69), title: 'Cold Water Therapy and the Dive Reflex: Does It Really Help Anxiety?', type: 'research_digest' },
        { id: planId(2, 70), title: 'Building Your Anxiety Management Plan: A Personalized Approach', type: 'self_help' },
      ],
    },
    {
      number: 8,
      name: 'Anxiety in Relationships, Work & Daily Life',
      range: '071–080',
      articles: [
        { id: planId(2, 71), title: 'How Anxiety Affects Your Relationships (And What to Do About It)', type: 'self_help' },
        { id: planId(2, 72), title: 'Anxious Attachment: When Fear of Abandonment Drives Your Behavior', type: 'self_help' },
        { id: planId(2, 73), title: 'Workplace Anxiety: Managing Fear in Meetings, Emails, and Deadlines', type: 'self_help' },
        { id: planId(2, 74), title: "Parenting with Anxiety: How to Keep Your Worry from Becoming Their Worry", type: 'self_help' },
        { id: planId(2, 75), title: 'Anxiety and Intimacy: How Fear Shows Up in Your Closest Relationships', type: 'self_help' },
        { id: planId(2, 76), title: 'Morning Anxiety: Why You Wake Up Worried and How to Start Your Day Differently', type: 'self_help' },
        { id: planId(2, 77), title: 'Anxiety and Procrastination: The Connection Most People Miss', type: 'self_help' },
        { id: planId(2, 78), title: 'Travel Anxiety: How to Manage Fear of Flying, Driving, and New Places', type: 'self_help' },
        { id: planId(2, 79), title: 'How to Support a Partner with Anxiety Without Becoming Their Therapist', type: 'self_help' },
        { id: planId(2, 80), title: 'Living Well with Anxiety: What Long-Term Management Really Looks Like', type: 'self_help' },
      ],
    },
    {
      number: 9,
      name: 'Treatment Approaches & Recovery',
      range: '081–090',
      articles: [
        { id: planId(2, 81), title: 'CBT for Anxiety: How the Gold-Standard Treatment Works', type: 'treatment_guide' },
        { id: planId(2, 82), title: 'Exposure and Response Prevention: The Treatment for OCD and Phobias', type: 'treatment_guide' },
        { id: planId(2, 83), title: 'ACT for Anxiety: Acceptance and Commitment Therapy Explained', type: 'treatment_guide' },
        { id: planId(2, 84), title: 'Medication for Anxiety: SSRIs, SNRIs, and Benzodiazepines Compared', type: 'treatment_guide' },
        { id: planId(2, 85), title: 'When Should You Seek Professional Help for Anxiety?', type: 'self_help' },
        { id: planId(2, 86), title: 'Online Therapy for Anxiety: What the Research Says About Effectiveness', type: 'treatment_guide' },
        { id: planId(2, 87), title: 'The Role of Exercise in Anxiety Treatment: More Than Just a Mood Boost', type: 'research_digest' },
        { id: planId(2, 88), title: 'Combining Therapy and Medication: What the Evidence Shows', type: 'treatment_guide' },
        { id: planId(2, 89), title: 'Relapse Prevention: How to Maintain Your Progress After Treatment', type: 'self_help' },
        { id: planId(2, 90), title: 'Recovery Is Not Linear: What to Expect on the Path from Anxiety', type: 'self_help' },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY 3: Relationships & Communication (80 articles)
// ═══════════════════════════════════════════════════════════════════════════

export const CATEGORY_03: CategoryPlan = {
  category: 3,
  name: 'Relationships & Communication',
  slug: 'relationships-communication',
  target: 80,
  subtopics: [
    {
      number: 1,
      name: 'Attachment Styles & Relationship Patterns',
      range: '001–010',
      articles: [
        { id: planId(3, 1), title: 'The Four Attachment Styles: How Early Bonds Shape Adult Love', type: 'self_help' },
        { id: planId(3, 2), title: 'Anxious Attachment: When Fear of Abandonment Drives Your Relationships', type: 'self_help' },
        { id: planId(3, 3), title: 'Avoidant Attachment: When Closeness Feels Like a Threat', type: 'self_help' },
        { id: planId(3, 4), title: 'Disorganized Attachment: The Push-Pull Pattern That Confuses Everyone', type: 'self_help' },
        { id: planId(3, 5), title: 'Can You Change Your Attachment Style? What the Research Says', type: 'research_digest' },
        { id: planId(3, 6), title: 'How to Identify Your Attachment Style: A Self-Assessment Guide', type: 'self_help' },
        { id: planId(3, 7), title: "Attachment Styles in Friendships: It's Not Just About Romance", type: 'self_help' },
        { id: planId(3, 8), title: 'When Two Insecure Attachment Styles Meet: The Anxious-Avoidant Trap', type: 'self_help' },
        { id: planId(3, 9), title: 'Earned Secure Attachment: How Healing Happens Through New Relationships', type: 'self_help' },
        { id: planId(3, 10), title: 'Attachment Theory for Parents: How Your Style Affects Your Children', type: 'self_help' },
      ],
    },
    {
      number: 2,
      name: 'Setting & Maintaining Boundaries',
      range: '011–020',
      articles: [
        { id: planId(3, 11), title: 'What Are Boundaries? A Clear, Practical Guide', type: 'self_help' },
        { id: planId(3, 12), title: "Why Setting Boundaries Feels So Uncomfortable (And Why It's Worth It)", type: 'self_help' },
        { id: planId(3, 13), title: 'Types of Boundaries: Physical, Emotional, Digital, and Time', type: 'self_help' },
        { id: planId(3, 14), title: 'How to Say No Without Guilt: Scripts and Strategies', type: 'self_help' },
        { id: planId(3, 15), title: 'Boundaries with Family: Navigating the Hardest People to Set Limits With', type: 'self_help' },
        { id: planId(3, 16), title: 'Boundaries at Work: Professional Limits Without Career Consequences', type: 'self_help' },
        { id: planId(3, 17), title: "When Someone Doesn't Respect Your Boundaries: What to Do Next", type: 'self_help' },
        { id: planId(3, 18), title: 'Boundaries vs. Walls: How to Protect Yourself Without Shutting People Out', type: 'self_help' },
        { id: planId(3, 19), title: 'Digital Boundaries: Managing Availability, Social Media, and Screen Time', type: 'self_help' },
        { id: planId(3, 20), title: 'Teaching Children About Boundaries: Age-Appropriate Conversations', type: 'self_help' },
      ],
    },
    {
      number: 3,
      name: 'Communication Skills for Connection',
      range: '021–030',
      articles: [
        { id: planId(3, 21), title: 'Active Listening: How to Make People Feel Truly Heard', type: 'self_help' },
        { id: planId(3, 22), title: 'Nonviolent Communication: Expressing Needs Without Blame or Judgment', type: 'self_help' },
        { id: planId(3, 23), title: 'The Four Horsemen of Communication: What Kills Relationships (Gottman Research)', type: 'research_digest' },
        { id: planId(3, 24), title: 'How to Ask for What You Need: Assertive Communication Basics', type: 'self_help' },
        { id: planId(3, 25), title: 'Validation: The Most Underrated Communication Skill', type: 'self_help' },
        { id: planId(3, 26), title: "Why 'I' Statements Work: Taking Ownership of Your Experience", type: 'self_help' },
        { id: planId(3, 27), title: 'Communication Styles: Passive, Aggressive, Passive-Aggressive, and Assertive', type: 'self_help' },
        { id: planId(3, 28), title: 'How to Give Feedback Without Triggering Defensiveness', type: 'self_help' },
        { id: planId(3, 29), title: "The Art of Apology: What Makes 'I'm Sorry' Actually Work", type: 'self_help' },
        { id: planId(3, 30), title: 'Communicating Across Different Emotional Languages', type: 'self_help' },
      ],
    },
    {
      number: 4,
      name: 'Navigating Conflict & Repair',
      range: '031–040',
      articles: [
        { id: planId(3, 31), title: "Why Conflict Isn't the Enemy: The Role of Disagreement in Healthy Relationships", type: 'self_help' },
        { id: planId(3, 32), title: "The Gottman Repair Attempt: How to De-Escalate Before It's Too Late", type: 'self_help' },
        { id: planId(3, 33), title: 'Fighting Fair: Rules of Engagement for Productive Conflict', type: 'self_help' },
        { id: planId(3, 34), title: 'Stonewalling: What Happens When Someone Shuts Down During Conflict', type: 'self_help' },
        { id: planId(3, 35), title: 'How to Resolve an Argument When Neither Person Wants to Back Down', type: 'self_help' },
        { id: planId(3, 36), title: "The Silent Treatment: Why It's Harmful and What to Do Instead", type: 'self_help' },
        { id: planId(3, 37), title: 'Conflict Styles: Compete, Avoid, Accommodate, Compromise, and Collaborate', type: 'self_help' },
        { id: planId(3, 38), title: 'After the Fight: How to Reconnect When Things Were Said in Anger', type: 'self_help' },
        { id: planId(3, 39), title: 'When Conflict Becomes Abuse: Recognizing the Line', type: 'crisis_safety' },
        { id: planId(3, 40), title: 'Teaching Kids Healthy Conflict Resolution Skills', type: 'self_help' },
      ],
    },
    {
      number: 5,
      name: 'Romantic Relationships & Intimacy',
      range: '041–050',
      articles: [
        { id: planId(3, 41), title: 'What Makes a Relationship Healthy? Evidence-Based Markers', type: 'self_help' },
        { id: planId(3, 42), title: 'The Science of Attraction: What Draws Us to Certain People', type: 'research_digest' },
        { id: planId(3, 43), title: 'Emotional Intimacy: How to Build Closeness Beyond Physical Connection', type: 'self_help' },
        { id: planId(3, 44), title: 'Relationship Stages: From Honeymoon to Deep Partnership', type: 'self_help' },
        { id: planId(3, 45), title: 'Love Languages Revisited: What the Research Actually Supports', type: 'research_digest' },
        { id: planId(3, 46), title: "Managing Jealousy in Relationships: When It's Normal and When It's Not", type: 'self_help' },
        { id: planId(3, 47), title: 'Long-Distance Relationships: Strategies That Help Couples Survive the Gap', type: 'self_help' },
        { id: planId(3, 48), title: 'Relationship Check-Ins: A Weekly Practice for Staying Connected', type: 'self_help' },
        { id: planId(3, 49), title: 'When Partners Have Different Needs: Navigating Incompatibility', type: 'self_help' },
        { id: planId(3, 50), title: 'Couples Therapy: When to Go, What to Expect, and How It Helps', type: 'treatment_guide' },
      ],
    },
    {
      number: 6,
      name: 'Friendships & Social Circles',
      range: '051–060',
      articles: [
        { id: planId(3, 51), title: 'The Psychology of Friendship: Why We Need Close Connections', type: 'self_help' },
        { id: planId(3, 52), title: "Making Friends as an Adult: Why It's Hard and How to Do It", type: 'self_help' },
        { id: planId(3, 53), title: 'Friendship Breakups: Why They Hurt as Much as Romantic Ones', type: 'self_help' },
        { id: planId(3, 54), title: 'Maintaining Friendships When Life Gets Busy', type: 'self_help' },
        { id: planId(3, 55), title: 'Quality vs. Quantity: How Many Friends Do You Actually Need?', type: 'research_digest' },
        { id: planId(3, 56), title: "One-Sided Friendships: When You're Always the One Reaching Out", type: 'self_help' },
        { id: planId(3, 57), title: 'How to Deepen a Surface-Level Friendship Into a Meaningful Bond', type: 'self_help' },
        { id: planId(3, 58), title: 'Friendship and Mental Health: How Your Social Circle Affects Your Wellbeing', type: 'self_help' },
        { id: planId(3, 59), title: 'Navigating Friend Groups: Cliques, Exclusion, and Social Dynamics', type: 'self_help' },
        { id: planId(3, 60), title: 'Online Friendships: Are Digital Connections as Valuable as In-Person Ones?', type: 'research_digest' },
      ],
    },
    {
      number: 7,
      name: 'Toxic Dynamics & Relationship Red Flags',
      range: '061–070',
      articles: [
        { id: planId(3, 61), title: 'Recognizing Toxic Relationship Patterns: A Research-Based Guide', type: 'self_help' },
        { id: planId(3, 62), title: 'Emotional Manipulation: Gaslighting, Love-Bombing, and Other Tactics', type: 'self_help' },
        { id: planId(3, 63), title: 'Codependency: When Helping Becomes Harmful', type: 'self_help' },
        { id: planId(3, 64), title: 'Narcissistic Relationship Patterns: What They Look Like From the Inside', type: 'self_help' },
        { id: planId(3, 65), title: 'Trauma Bonding: Why Leaving Harmful Relationships Feels Impossible', type: 'self_help' },
        { id: planId(3, 66), title: 'Enabling: How Good Intentions Keep Unhealthy Patterns Alive', type: 'self_help' },
        { id: planId(3, 67), title: 'Enmeshment: When Closeness Crosses the Line Into Control', type: 'self_help' },
        { id: planId(3, 68), title: 'Power Imbalances in Relationships: Age, Money, Status, and Influence', type: 'self_help' },
        { id: planId(3, 69), title: 'How to Protect Your Mental Health in a Difficult Relationship', type: 'self_help' },
        { id: planId(3, 70), title: "When Love Isn't Enough: Recognizing When It's Time to Leave", type: 'self_help' },
      ],
    },
    {
      number: 8,
      name: 'Breakups, Endings & Moving Forward',
      range: '071–080',
      articles: [
        { id: planId(3, 71), title: 'The Psychology of Heartbreak: Why Breakups Hurt So Much', type: 'self_help' },
        { id: planId(3, 72), title: 'Stages of a Breakup: What to Expect Emotionally', type: 'self_help' },
        { id: planId(3, 73), title: 'How to Heal After a Breakup: Evidence-Based Strategies', type: 'self_help' },
        { id: planId(3, 74), title: 'No-Contact Rules: What the Research Says About Post-Breakup Boundaries', type: 'self_help' },
        { id: planId(3, 75), title: 'Social Media After a Breakup: The Stalking Trap and How to Avoid It', type: 'self_help' },
        { id: planId(3, 76), title: 'Rebuilding Your Identity After a Long-Term Relationship Ends', type: 'self_help' },
        { id: planId(3, 77), title: 'When a Friendship Ends: Processing the Loss of a Close Connection', type: 'self_help' },
        { id: planId(3, 78), title: "Co-Parenting After a Breakup: Keeping Children's Mental Health First", type: 'self_help' },
        { id: planId(3, 79), title: "How to Know When You're Ready to Date Again", type: 'self_help' },
        { id: planId(3, 80), title: 'Starting Over: Building New Connections After Loss', type: 'self_help' },
      ],
    },
  ],
};
