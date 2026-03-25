// ============================================================================
// Content Plan — Categories 19–22 (Batch 2: Articles #1201–#1400)
// ============================================================================

import { CategoryPlan, planId } from './types';

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY 19: Men's Mental Health (62 articles, MMH-005 to MMH-066)
// ═══════════════════════════════════════════════════════════════════════════

export const CATEGORY_19: CategoryPlan = {
  category: 19,
  name: "Men's Mental Health",
  slug: 'mens-mental-health',
  target: 66, // 4 from Batch 1 + 62 from Batch 2
  subtopics: [
    // Subtopic 1 partially from Batch 1 (MMH-001–004), continued here (MMH-005–010)
    {
      number: 1,
      name: "Understanding Men's Mental Health",
      range: '005–010',
      articles: [
        { id: planId(19, 5), title: 'Emotional Literacy for Men: Learning the Language You Were Never Taught', type: 'self_help' },
        { id: planId(19, 6), title: 'Men and Loneliness: The Friendship Crisis in Adult Males', type: 'research_digest' },
        { id: planId(19, 7), title: 'Male Body Image Issues: The Rise of Muscle Dysmorphia', type: 'condition_deep_dive' },
        { id: planId(19, 8), title: "Men and Alcohol: Why Substance Use Is Often Men's First Coping Strategy", type: 'research_digest' },
        { id: planId(19, 9), title: "Retirement and Men's Identity: When Your Job Was Your Whole Self", type: 'self_help' },
        { id: planId(19, 10), title: 'Men and Grief: Cultural Permission to Mourn', type: 'self_help' },
      ],
    },
    {
      number: 2,
      name: "Men's Relationships and Family",
      range: '011–020',
      articles: [
        { id: planId(19, 11), title: "Fatherhood and Mental Health: The Emotional Transition Most Men Don't Discuss", type: 'self_help' },
        { id: planId(19, 12), title: 'Paternal Postnatal Depression: The Condition No One Talks About', type: 'condition_deep_dive' },
        { id: planId(19, 13), title: 'Men After Divorce: The Mental Health Impact of Separation', type: 'self_help' },
        { id: planId(19, 14), title: 'Men and Custody Battles: The Psychological Toll of Legal Conflict', type: 'self_help' },
        { id: planId(19, 15), title: "Boys Don't Cry: How Childhood Messaging Shapes Adult Emotional Health", type: 'research_digest' },
        { id: planId(19, 16), title: "Men's Friendships: Building Real Connection Beyond Sports and Beer", type: 'self_help' },
        { id: planId(19, 17), title: 'Men as Caregivers: The Hidden Population of Male Family Carers', type: 'research_digest' },
        { id: planId(19, 18), title: 'Men and Romantic Vulnerability: Why Opening Up Feels Like Weakness', type: 'self_help' },
        { id: planId(19, 19), title: 'Father-Son Relationships and Emotional Inheritance', type: 'self_help' },
        { id: planId(19, 20), title: 'Men and Dating Anxiety: Performance Pressure and Fear of Rejection', type: 'self_help' },
      ],
    },
    {
      number: 3,
      name: "Men's Physical and Mental Health",
      range: '021–030',
      articles: [
        { id: planId(19, 21), title: "Testosterone and Mood: What Hormonal Changes Mean for Men's Mental Health", type: 'research_digest' },
        { id: planId(19, 22), title: 'Prostate Cancer and Mental Health: The Psychological Impact of Diagnosis', type: 'condition_deep_dive' },
        { id: planId(19, 23), title: 'Erectile Dysfunction and Mental Health: The Mind-Body Connection', type: 'condition_deep_dive' },
        { id: planId(19, 24), title: 'Heart Disease and Depression in Men: The Deadly Overlap', type: 'research_digest' },
        { id: planId(19, 25), title: 'Men, Pain, and Stoicism: Why Ignoring Physical Symptoms Is a Mental Health Problem', type: 'self_help' },
        { id: planId(19, 26), title: 'Exercise Addiction in Men: When Fitness Becomes a Disorder', type: 'condition_deep_dive' },
        { id: planId(19, 27), title: 'Men and Sleep: Why Sleep Problems Hit Men Differently', type: 'research_digest' },
        { id: planId(19, 28), title: 'Anger Management for Men: Understanding and Channeling Rage', type: 'self_help' },
        { id: planId(19, 29), title: 'Men and Chronic Pain: Suffering in Silence', type: 'self_help' },
        { id: planId(19, 30), title: 'The Male Midlife Crisis: Separating Myth From Psychological Reality', type: 'research_digest' },
      ],
    },
    {
      number: 4,
      name: 'Men in Specific Contexts',
      range: '031–040',
      articles: [
        { id: planId(19, 31), title: 'Men in High-Pressure Careers: Finance, Law, and Medicine', type: 'self_help' },
        { id: planId(19, 32), title: 'Male Athletes and Mental Health: The Breaking Point of Performance', type: 'research_digest' },
        { id: planId(19, 33), title: 'Incarcerated Men and Mental Health: Inside the Prison System', type: 'condition_deep_dive' },
        { id: planId(19, 34), title: 'LGBTQ+ Men\'s Mental Health: Homophobia, Minority Stress, and Resilience', type: 'condition_deep_dive' },
        { id: planId(19, 35), title: 'Men of Color and Mental Health: Intersecting Stigmas', type: 'research_digest' },
        { id: planId(19, 36), title: 'Rural Men and Mental Health: Geographic Isolation and Limited Access', type: 'self_help' },
        { id: planId(19, 37), title: 'Young Men and Social Media: Comparison, Radicalization, and Identity', type: 'self_help' },
        { id: planId(19, 38), title: 'Men in the Military: Service, Sacrifice, and Psychological Impact', type: 'condition_deep_dive' },
        { id: planId(19, 39), title: "Blue-Collar Men's Mental Health: Physical Demands and Emotional Silence", type: 'self_help' },
        { id: planId(19, 40), title: 'Unemployed Men and Self-Worth: When Providing Defines Identity', type: 'self_help' },
      ],
    },
    {
      number: 5,
      name: "Myths About Men's Mental Health",
      range: '041–046',
      articles: [
        { id: planId(19, 41), title: "Myth: Real Men Don't Need Therapy", type: 'self_help' },
        { id: planId(19, 42), title: "Myth: Men Don't Get Eating Disorders", type: 'self_help' },
        { id: planId(19, 43), title: 'Myth: Men Are Naturally Better at Handling Stress', type: 'self_help' },
        { id: planId(19, 44), title: 'Myth: Depression in Men Is Just Laziness or Lack of Motivation', type: 'self_help' },
        { id: planId(19, 45), title: 'Myth: Talking About Feelings Makes Men Weak', type: 'self_help' },
        { id: planId(19, 46), title: "Myth: Men Can't Be Victims of Domestic Abuse", type: 'self_help' },
      ],
    },
    {
      number: 6,
      name: "Men's Health Interventions Part 1",
      range: '047–056',
      articles: [
        { id: planId(19, 47), title: "Men's Sheds: Community Workshops as Mental Health Intervention", type: 'treatment_guide' },
        { id: planId(19, 48), title: 'Barbershop Therapy: Meeting Men Where They Already Gather', type: 'treatment_guide' },
        { id: planId(19, 49), title: 'Sports-Based Mental Health Programs for Boys and Men', type: 'treatment_guide' },
        { id: planId(19, 50), title: 'Male-Specific Therapy Approaches: What Works for Men in Treatment', type: 'treatment_guide' },
        { id: planId(19, 51), title: 'Digital Mental Health Tools for Men: Apps and Platforms That Engage Male Users', type: 'research_digest' },
        { id: planId(19, 52), title: "Fatherhood Programs: Supporting Dads' Mental Health and Parenting Skills", type: 'treatment_guide' },
        { id: planId(19, 53), title: 'Men and Meditation: Overcoming the Perception That Mindfulness Is Soft', type: 'self_help' },
        { id: planId(19, 54), title: "Men's Support Groups: Why Peer Connection Changes Everything", type: 'self_help' },
        { id: planId(19, 55), title: 'Adventure Therapy for Men: Using Outdoor Challenges for Emotional Growth', type: 'treatment_guide' },
        { id: planId(19, 56), title: 'Male Mentorship and Mental Health: The Protective Power of Role Models', type: 'self_help' },
      ],
    },
    {
      number: 7,
      name: "Men's Health Interventions Part 2",
      range: '057–066',
      articles: [
        { id: planId(19, 57), title: 'Workplace Mental Health Programs Designed for Male-Dominated Industries', type: 'treatment_guide' },
        { id: planId(19, 58), title: 'Men and Journaling: Writing as an Unexpected Tool for Emotional Processing', type: 'self_help' },
        { id: planId(19, 59), title: 'Grief Retreats for Men: Structured Programs That Honor Male Mourning', type: 'treatment_guide' },
        { id: planId(19, 60), title: 'Men and Cooking: How Kitchen Skills Build Emotional Competence and Community', type: 'self_help' },
        { id: planId(19, 61), title: 'Reducing Male Suicide: Evidence-Based Prevention Strategies That Work', type: 'crisis_safety' },
        { id: planId(19, 62), title: 'Men and Volunteering: The Mental Health Benefits of Service', type: 'self_help' },
        { id: planId(19, 63), title: "Anger as a Gateway Emotion: Helping Men Access What's Underneath", type: 'self_help' },
        { id: planId(19, 64), title: 'Challenging the Provider Mandate: Redefining Masculinity for Mental Health', type: 'self_help' },
        { id: planId(19, 65), title: 'Men and Creative Expression: Music, Art, and Writing as Emotional Outlets', type: 'self_help' },
        { id: planId(19, 66), title: "The Role of Humor in Men's Mental Health: When Laughter Helps and When It Hides", type: 'research_digest' },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY 20: Chronic Illness, Pain & Medical Psychology (68 articles)
// ═══════════════════════════════════════════════════════════════════════════

export const CATEGORY_20: CategoryPlan = {
  category: 20,
  name: 'Chronic Illness, Pain & Medical Psychology',
  slug: 'chronic-illness-pain',
  target: 68,
  subtopics: [
    {
      number: 1,
      name: 'Psychology of Chronic Illness',
      range: '001–010',
      articles: [
        { id: planId(20, 1), title: 'The Emotional Stages of a Chronic Illness Diagnosis', type: 'self_help' },
        { id: planId(20, 2), title: 'Identity After Diagnosis: Who Are You When Your Body Changes?', type: 'self_help' },
        { id: planId(20, 3), title: 'Medical Gaslighting: When Doctors Dismiss Your Symptoms', type: 'self_help' },
        { id: planId(20, 4), title: 'The Grief of Chronic Illness: Mourning the Life You Expected', type: 'self_help' },
        { id: planId(20, 5), title: 'Invisible Illness: The Mental Toll of Looking Fine While Suffering', type: 'self_help' },
        { id: planId(20, 6), title: 'Health Anxiety vs. Legitimate Concern: Navigating Worry After Diagnosis', type: 'self_help' },
        { id: planId(20, 7), title: 'The Boom-and-Bust Cycle: Why People With Chronic Illness Overdo It', type: 'self_help' },
        { id: planId(20, 8), title: 'Fatigue and Mental Health: When Exhaustion Becomes Your Whole Identity', type: 'condition_deep_dive' },
        { id: planId(20, 9), title: 'The Financial Toxicity of Chronic Illness: When Healthcare Costs Destroy Wellbeing', type: 'research_digest' },
        { id: planId(20, 10), title: 'Advocacy and Assertiveness in Healthcare: Speaking Up for Yourself', type: 'self_help' },
      ],
    },
    {
      number: 2,
      name: 'Chronic Pain and the Mind',
      range: '011–022',
      articles: [
        { id: planId(20, 11), title: 'The Neuroscience of Chronic Pain: Why Your Brain Gets Stuck on Pain Signals', type: 'research_digest' },
        { id: planId(20, 12), title: 'Central Sensitization: When Your Nervous System Amplifies Pain', type: 'condition_deep_dive' },
        { id: planId(20, 13), title: 'Pain Catastrophizing: How Thoughts Make Pain Worse and How to Stop', type: 'self_help' },
        { id: planId(20, 14), title: 'Acceptance and Commitment Therapy for Chronic Pain', type: 'treatment_guide' },
        { id: planId(20, 15), title: 'Mindfulness-Based Pain Management: What the Evidence Shows', type: 'treatment_guide' },
        { id: planId(20, 16), title: 'Cognitive Behavioral Therapy for Chronic Pain: Rewiring Your Response', type: 'treatment_guide' },
        { id: planId(20, 17), title: 'Fibromyalgia and Mental Health: The Condition Doctors Struggled to Believe', type: 'condition_deep_dive' },
        { id: planId(20, 18), title: 'Complex Regional Pain Syndrome: When Pain Becomes Neurological', type: 'condition_deep_dive' },
        { id: planId(20, 19), title: 'Opioids, Pain, and Mental Health: Navigating Treatment Without Addiction', type: 'research_digest' },
        { id: planId(20, 20), title: 'Pain and Sleep: The Vicious Cycle and How to Break It', type: 'self_help' },
        { id: planId(20, 21), title: 'The Relationship Between Chronic Pain and Depression', type: 'research_digest' },
        { id: planId(20, 22), title: 'Movement and Chronic Pain: Why Gentle Exercise Helps', type: 'self_help' },
      ],
    },
    {
      number: 3,
      name: 'Specific Medical Conditions and Mental Health',
      range: '023–034',
      articles: [
        { id: planId(20, 23), title: 'Cancer and Mental Health: Psychological Support Through Diagnosis and Treatment', type: 'condition_deep_dive' },
        { id: planId(20, 24), title: 'Diabetes and Depression: Managing Two Conditions Together', type: 'condition_deep_dive' },
        { id: planId(20, 25), title: 'Heart Disease and Anxiety: The Cardiac-Mental Health Connection', type: 'condition_deep_dive' },
        { id: planId(20, 26), title: 'Multiple Sclerosis and Mental Health: Neurological and Emotional Challenges', type: 'condition_deep_dive' },
        { id: planId(20, 27), title: 'Epilepsy and Mental Health: Seizures, Stigma, and Psychological Impact', type: 'condition_deep_dive' },
        { id: planId(20, 28), title: 'Autoimmune Conditions and Mental Health: When Your Body Attacks Itself', type: 'condition_deep_dive' },
        { id: planId(20, 29), title: 'HIV/AIDS and Mental Health: Stigma, Treatment, and Thriving', type: 'condition_deep_dive' },
        { id: planId(20, 30), title: 'Chronic Kidney Disease and Psychological Wellbeing', type: 'condition_deep_dive' },
        { id: planId(20, 31), title: 'Inflammatory Bowel Disease and Mental Health: The Gut-Brain Axis in Action', type: 'research_digest' },
        { id: planId(20, 32), title: 'Chronic Respiratory Disease and Anxiety: When Breathing Becomes Frightening', type: 'condition_deep_dive' },
        { id: planId(20, 33), title: 'Stroke Recovery and Mental Health: Rebuilding After Brain Injury', type: 'condition_deep_dive' },
        { id: planId(20, 34), title: 'Long COVID and Mental Health: The Psychological Aftermath of Persistent Symptoms', type: 'research_digest' },
      ],
    },
    {
      number: 4,
      name: 'Medical Trauma and Healthcare Experiences',
      range: '035–042',
      articles: [
        { id: planId(20, 35), title: 'Medical Trauma: When Healthcare Experiences Leave Psychological Scars', type: 'condition_deep_dive' },
        { id: planId(20, 36), title: 'ICU Delirium and Post-ICU PTSD: The Hidden Epidemic', type: 'condition_deep_dive' },
        { id: planId(20, 37), title: 'Surgery and Mental Health: Preparing for and Recovering From Operations', type: 'self_help' },
        { id: planId(20, 38), title: 'Needle Phobia and Medical Avoidance: When Fear Prevents Healthcare', type: 'condition_deep_dive' },
        { id: planId(20, 39), title: 'Pediatric Medical Trauma: How Hospital Experiences Affect Children', type: 'research_digest' },
        { id: planId(20, 40), title: 'The Psychology of Waiting for Test Results: Managing Medical Uncertainty', type: 'self_help' },
        { id: planId(20, 41), title: 'Terminal Diagnosis and Mental Health: Finding Meaning at the End', type: 'crisis_safety' },
        { id: planId(20, 42), title: 'Organ Transplant Psychology: The Emotional Journey of Receiving a New Organ', type: 'self_help' },
      ],
    },
    {
      number: 5,
      name: 'Supporting Wellbeing Alongside Illness',
      range: '043–050',
      articles: [
        { id: planId(20, 43), title: 'Pacing and Energy Management for People With Chronic Conditions', type: 'self_help' },
        { id: planId(20, 44), title: 'Building a Medical Support Team That Addresses Mind and Body', type: 'self_help' },
        { id: planId(20, 45), title: 'The Spoonie Community: Finding Connection Through Shared Illness Experience', type: 'self_help' },
        { id: planId(20, 46), title: "When Your Partner Has a Chronic Illness: The Healthy Partner's Mental Health", type: 'self_help' },
        { id: planId(20, 47), title: 'Return to Work After Serious Illness: Psychological Readjustment', type: 'self_help' },
        { id: planId(20, 48), title: 'Self-Compassion When Your Body Lets You Down', type: 'self_help' },
        { id: planId(20, 49), title: 'Navigating Disability Benefits: The Mental Health Impact of the Application Process', type: 'self_help' },
        { id: planId(20, 50), title: "Complementary Approaches to Chronic Illness: What Helps and What's Hype", type: 'research_digest' },
      ],
    },
    {
      number: 6,
      name: 'Psychological Resilience in Medical Settings',
      range: '051–068',
      articles: [
        { id: planId(20, 51), title: 'Health Literacy and Mental Health: Understanding Your Condition Reduces Anxiety', type: 'self_help' },
        { id: planId(20, 52), title: 'Support Groups for Chronic Illness: In-Person and Online Communities', type: 'self_help' },
        { id: planId(20, 53), title: 'Mindfulness-Based Cognitive Therapy for Recurrent Medical Conditions', type: 'treatment_guide' },
        { id: planId(20, 54), title: 'Pain Psychology: A Growing Field at the Intersection of Medicine and Mental Health', type: 'research_digest' },
        { id: planId(20, 55), title: 'Clinical Health Psychology: What It Is and How It Helps Medical Patients', type: 'treatment_guide' },
        { id: planId(20, 56), title: 'Writing About Illness: Expressive Writing as a Tool for Medical Coping', type: 'self_help' },
        { id: planId(20, 57), title: "Children With Chronic Illness: Supporting Young Patients' Mental Health", type: 'self_help' },
        { id: planId(20, 58), title: 'Chronic Illness and Parenting: Managing Health While Raising Children', type: 'self_help' },
        { id: planId(20, 59), title: 'The Role of Palliative Psychology in Non-Terminal Chronic Conditions', type: 'treatment_guide' },
        { id: planId(20, 60), title: 'Rehabilitation Psychology: Mental Health Support Through Physical Recovery', type: 'treatment_guide' },
        { id: planId(20, 61), title: 'Chronic Illness and Travel: Managing Anxiety About Being Far From Medical Care', type: 'self_help' },
        { id: planId(20, 62), title: 'The Spoon Theory Explained: A Framework for Understanding Energy Limitation', type: 'self_help' },
        { id: planId(20, 63), title: "Chronic Illness and Body Image: When Your Body Doesn't Look or Function as Expected", type: 'self_help' },
        { id: planId(20, 64), title: 'Healthcare Navigators: The Mental Health Value of Having Someone Guide Your Care', type: 'self_help' },
        { id: planId(20, 65), title: "Medical Decision-Making When You're Overwhelmed: Frameworks for Clarity", type: 'self_help' },
        { id: planId(20, 66), title: 'Medication Adherence and Mental Health: Why People Stop Taking Prescribed Treatments', type: 'research_digest' },
        { id: planId(20, 67), title: 'Chronic Illness Online Communities: Benefits and Risks of Health Forums', type: 'self_help' },
        { id: planId(20, 68), title: 'Integrated Care Models: When Mental Health and Medical Treatment Work Together', type: 'treatment_guide' },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY 21: Technology, Digital Life & Mental Health (64 articles)
// ═══════════════════════════════════════════════════════════════════════════

export const CATEGORY_21: CategoryPlan = {
  category: 21,
  name: 'Technology, Digital Life & Mental Health',
  slug: 'technology-digital-life',
  target: 64,
  subtopics: [
    {
      number: 1,
      name: 'Social Media and Psychological Impact',
      range: '001–010',
      articles: [
        { id: planId(21, 1), title: 'The Psychology of Social Media: Dopamine, Comparison, and Connection', type: 'research_digest' },
        { id: planId(21, 2), title: 'Instagram, TikTok, and Self-Image: How Visual Platforms Shape Self-Worth', type: 'research_digest' },
        { id: planId(21, 3), title: "Doomscrolling: Why You Can't Stop Consuming Bad News", type: 'self_help' },
        { id: planId(21, 4), title: 'FOMO and JOMO: The Fear and Joy of Missing Out', type: 'self_help' },
        { id: planId(21, 5), title: 'Online Outrage and Mental Health: How Anger Culture Drains You', type: 'self_help' },
        { id: planId(21, 6), title: 'The Paradox of Connection: Why Social Media Can Make You Feel More Alone', type: 'research_digest' },
        { id: planId(21, 7), title: 'Social Media Detox: Does It Actually Improve Your Mental Health?', type: 'research_digest' },
        { id: planId(21, 8), title: 'Influencer Culture and Mental Health: The Hidden Cost of Curated Lives', type: 'self_help' },
        { id: planId(21, 9), title: 'Misinformation and Mental Health: When Online Content Causes Harm', type: 'self_help' },
        { id: planId(21, 10), title: 'Positive Uses of Social Media for Mental Health: Support, Community, and Education', type: 'self_help' },
      ],
    },
    {
      number: 2,
      name: 'Digital Addiction and Compulsive Use',
      range: '011–020',
      articles: [
        { id: planId(21, 11), title: 'Smartphone Addiction: Is It Real and What Can You Do About It?', type: 'condition_deep_dive' },
        { id: planId(21, 12), title: 'Gaming Disorder: When Play Becomes a Compulsion', type: 'condition_deep_dive' },
        { id: planId(21, 13), title: 'Binge-Watching and Mental Health: The Psychology of Streaming', type: 'self_help' },
        { id: planId(21, 14), title: 'Online Shopping and Compulsive Buying: The Dopamine Hit of Add to Cart', type: 'condition_deep_dive' },
        { id: planId(21, 15), title: 'Pornography and Mental Health: Navigating a Complex Landscape', type: 'research_digest' },
        { id: planId(21, 16), title: 'Notification Anxiety: Why Your Phone Keeps You on Edge', type: 'self_help' },
        { id: planId(21, 17), title: 'The Attention Economy: How Tech Companies Design for Addiction', type: 'research_digest' },
        { id: planId(21, 18), title: 'Digital Minimalism: Reclaiming Your Mental Space', type: 'self_help' },
        { id: planId(21, 19), title: 'Screen Time Guidelines: What Actually Makes Sense for Adults', type: 'self_help' },
        { id: planId(21, 20), title: 'App-Based Gambling: The Hidden Mental Health Crisis', type: 'condition_deep_dive' },
      ],
    },
    {
      number: 3,
      name: 'AI, Emerging Technology & Mental Health',
      range: '021–030',
      articles: [
        { id: planId(21, 21), title: 'AI Anxiety: Fear About Artificial Intelligence and Job Displacement', type: 'self_help' },
        { id: planId(21, 22), title: 'AI Chatbots and Mental Health: Promise, Peril, and Where We Are Now', type: 'research_digest' },
        { id: planId(21, 23), title: 'Deepfakes and Psychological Harm: When Technology Attacks Identity', type: 'research_digest' },
        { id: planId(21, 24), title: 'Virtual Reality Therapy: Using VR to Treat Phobias, PTSD, and Pain', type: 'treatment_guide' },
        { id: planId(21, 25), title: 'The Ethics of Mental Health Apps: Privacy, Efficacy, and Responsibility', type: 'research_digest' },
        { id: planId(21, 26), title: 'Teletherapy: How Online Therapy Compares to In-Person Treatment', type: 'treatment_guide' },
        { id: planId(21, 27), title: 'Wearable Technology and Mental Health Monitoring: Helpful or Harmful?', type: 'research_digest' },
        { id: planId(21, 28), title: 'Digital Therapeutics: FDA-Approved Apps for Mental Health Conditions', type: 'treatment_guide' },
        { id: planId(21, 29), title: 'The Quantified Self: When Tracking Everything Becomes an Obsession', type: 'self_help' },
        { id: planId(21, 30), title: 'Biometric Data and Emotional Surveillance: Privacy Concerns in the Digital Age', type: 'research_digest' },
      ],
    },
    {
      number: 4,
      name: 'Online Relationships and Community',
      range: '031–038',
      articles: [
        { id: planId(21, 31), title: 'Online Dating and Mental Health: Rejection, Ghosting, and Connection', type: 'self_help' },
        { id: planId(21, 32), title: 'Cyberbullying in Adults: Harassment Beyond the Schoolyard', type: 'condition_deep_dive' },
        { id: planId(21, 33), title: 'Online Support Groups: Finding Community for Rare and Stigmatized Conditions', type: 'self_help' },
        { id: planId(21, 34), title: "Parasocial Relationships: Emotional Bonds With People Who Don't Know You Exist", type: 'research_digest' },
        { id: planId(21, 35), title: 'Online Radicalization and Mental Health: How Extremism Preys on Vulnerability', type: 'research_digest' },
        { id: planId(21, 36), title: 'Remote Work and Social Isolation: Building Connection Without an Office', type: 'self_help' },
        { id: planId(21, 37), title: 'Digital Identity: How Your Online Persona Affects Your Real-Life Mental Health', type: 'self_help' },
        { id: planId(21, 38), title: 'Catfishing and Romance Scams: The Psychological Devastation of Online Deception', type: 'self_help' },
      ],
    },
    {
      number: 5,
      name: 'Healthy Digital Life',
      range: '039–044',
      articles: [
        { id: planId(21, 39), title: 'Creating a Healthy Relationship With Technology: A Practical Guide', type: 'self_help' },
        { id: planId(21, 40), title: 'Digital Boundaries: How to Set Limits Without Going Off-Grid', type: 'self_help' },
        { id: planId(21, 41), title: 'Mindful Technology Use: Bringing Awareness to Your Digital Habits', type: 'self_help' },
        { id: planId(21, 42), title: 'The Right to Disconnect: Why Unplugging Is a Mental Health Necessity', type: 'self_help' },
        { id: planId(21, 43), title: 'Teaching Children About Technology: A Mental Health-Informed Approach', type: 'self_help' },
        { id: planId(21, 44), title: 'Building Tech-Free Rituals for Better Sleep and Connection', type: 'self_help' },
      ],
    },
    {
      number: 6,
      name: 'Digital Culture and Society',
      range: '045–064',
      articles: [
        { id: planId(21, 45), title: 'Cancel Culture and Mental Health: The Psychological Impact of Public Shaming', type: 'research_digest' },
        { id: planId(21, 46), title: 'Information Overload: How Constant News Consumption Affects Your Brain', type: 'self_help' },
        { id: planId(21, 47), title: 'The Filter Bubble: How Algorithms Shape Your Worldview and Mood', type: 'research_digest' },
        { id: planId(21, 48), title: "Digital Hoarding: When You Can't Delete Files, Photos, or Accounts", type: 'condition_deep_dive' },
        { id: planId(21, 49), title: 'The Psychology of Going Viral: What Sudden Online Fame Does to Mental Health', type: 'research_digest' },
        { id: planId(21, 50), title: 'Revenge Porn and Non-Consensual Intimate Images: Psychological Devastation and Recovery', type: 'crisis_safety' },
        { id: planId(21, 51), title: 'Work-From-Home Technology Fatigue: Zoom Burnout and Digital Exhaustion', type: 'self_help' },
        { id: planId(21, 52), title: 'Online Therapy Platforms: Comparing BetterHelp, Talkspace, and Similar Services', type: 'treatment_guide' },
        { id: planId(21, 53), title: 'The Dark Web and Mental Health: Vulnerability, Exploitation, and Danger', type: 'research_digest' },
        { id: planId(21, 54), title: "Children's Privacy Online: The Mental Health Implications of Digital Footprints", type: 'self_help' },
        { id: planId(21, 55), title: 'Digital Grief: Navigating Loss in an Online World', type: 'self_help' },
        { id: planId(21, 56), title: 'Algorithmic Anxiety: When Recommendation Systems Control What You See and Feel', type: 'self_help' },
        { id: planId(21, 57), title: 'The Right to Be Forgotten: Mental Health and Digital Permanence', type: 'self_help' },
        { id: planId(21, 58), title: 'Technology and Autism: How Digital Tools Can Support Neurodivergent Users', type: 'self_help' },
        { id: planId(21, 59), title: 'Smart Speakers and Mental Health: Privacy Concerns and Ambient Computing', type: 'research_digest' },
        { id: planId(21, 60), title: 'The Metaverse and Mental Health: Virtual Worlds, Real Psychological Impact', type: 'research_digest' },
        { id: planId(21, 61), title: 'Technology-Facilitated Abuse: How Devices Become Tools of Control', type: 'crisis_safety' },
        { id: planId(21, 62), title: 'Digital Wellness in Schools: Teaching Students Healthy Tech Habits', type: 'self_help' },
        { id: planId(21, 63), title: 'Open-Source Mental Health Tools: Community-Built Resources for Wellbeing', type: 'self_help' },
        { id: planId(21, 64), title: 'The Future of Mental Health Technology: What\'s Coming and What to Watch For', type: 'research_digest' },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY 22: Spirituality, Meaning & Existential Mental Health (6 articles)
// ═══════════════════════════════════════════════════════════════════════════

export const CATEGORY_22: CategoryPlan = {
  category: 22,
  name: 'Spirituality, Meaning & Existential Mental Health',
  slug: 'spirituality-meaning',
  target: 6,
  subtopics: [
    {
      number: 1,
      name: 'Existential Psychology',
      range: '001–006',
      articles: [
        { id: planId(22, 1), title: 'Existential Anxiety: Confronting Mortality, Freedom, and Meaninglessness', type: 'condition_deep_dive' },
        { id: planId(22, 2), title: "The Search for Meaning: Viktor Frankl's Logotherapy and Modern Applications", type: 'treatment_guide' },
        { id: planId(22, 3), title: 'Death Anxiety: Why Thinking About Mortality Affects Your Daily Life', type: 'self_help' },
        { id: planId(22, 4), title: 'Existential Loneliness: The Type of Isolation That No Relationship Can Fix', type: 'self_help' },
        { id: planId(22, 5), title: 'Freedom and Responsibility: When Too Many Choices Cause Paralysis', type: 'self_help' },
        { id: planId(22, 6), title: 'The Absurd: What Camus Can Teach Us About Living Without Guaranteed Meaning', type: 'research_digest' },
      ],
    },
  ],
};
