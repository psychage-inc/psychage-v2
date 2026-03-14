import type { DomainKey, ScoreTier } from '@/lib/clarity/types';

// ─── TIER DESCRIPTIONS (composite 0–100) ────────────────────────────────

export interface TierDescription {
  label: string;
  range: string;
  description: string;
  whatsWorking: string;
  watchFor: string;
  professionalGuidance: string;
  consultationLevel: 'none' | 'optional' | 'recommended' | 'strongly-recommended' | 'urgent';
}

export const TIER_DESCRIPTIONS: Record<ScoreTier, TierDescription> = {
  thriving: {
    label: 'Thriving',
    range: '80–100',
    description:
      'Strong mental wellness across most dimensions. Your clarity is high and your daily life reflects balance and resilience.',
    whatsWorking:
      'Most dimensions are strong. Protective habits are in place and you are managing well overall.',
    watchFor:
      'Overextension or ignoring small signals. Even high scorers benefit from rest and ongoing self-awareness.',
    professionalGuidance:
      'Optional. Consider a periodic check-in for maintenance or personal growth.',
    consultationLevel: 'none',
  },
  balanced: {
    label: 'Balanced',
    range: '60–79',
    description:
      'Generally good mental wellness with some areas that could benefit from attention. You have a solid foundation to build on.',
    whatsWorking:
      'A solid foundation exists. Some dimensions are performing well, giving you resources to draw on.',
    watchFor:
      'Growth areas that persist across multiple assessments. Patterns that gradually worsen over time.',
    professionalGuidance:
      'Optional but beneficial. A counselor can help optimize what is already good and address emerging patterns.',
    consultationLevel: 'optional',
  },
  struggling: {
    label: 'Concerning',
    range: '40–59',
    description:
      'Noticeable difficulties in several areas. Proactive steps and guided support can make a meaningful difference.',
    whatsWorking:
      'Resilience is present. Your awareness of difficulty is itself a strength that many people lack.',
    watchFor:
      'Declining scores in any single dimension. Withdrawal from activities or relationships you once valued.',
    professionalGuidance:
      'Recommended. A therapist can provide tools and strategies tailored to the areas where you are experiencing difficulty.',
    consultationLevel: 'recommended',
  },
  distressed: {
    label: 'Distressed',
    range: '20–39',
    description:
      'Significant challenges affecting daily life. Speaking with a mental health professional is strongly encouraged.',
    whatsWorking:
      'You are still reaching out and engaging with your wellness. That matters more than you may realize.',
    watchFor:
      'Worsening symptoms. Changes in sleep, appetite, or energy. Increasing feelings of hopelessness or isolation.',
    professionalGuidance:
      'Strongly encouraged. Professional support is the most effective path forward at this level.',
    consultationLevel: 'strongly-recommended',
  },
  crisis: {
    label: 'Crisis',
    range: '0–19',
    description:
      'Your responses suggest you may need immediate support. Please reach out to a crisis resource or mental health professional.',
    whatsWorking:
      'Seeking clarity is the most important step you can take. You are not alone in this.',
    watchFor:
      'Any thoughts of self-harm or harming others. Complete social withdrawal. Inability to carry out basic daily tasks.',
    professionalGuidance:
      'Urgent. Please connect with a crisis resource or mental health professional as soon as possible.',
    consultationLevel: 'urgent',
  },
};

// ─── DIMENSION × TIER CONTENT BLOCKS (25 total) ──────────────────────

export interface DimensionTierContent {
  strengths?: string[];
  concerns?: string[];
  actions: string[];
  toolLink?: { label: string; path: string };
  context?: string;
}

export const DIMENSION_CONTENT: Record<
  DomainKey,
  Record<ScoreTier, DimensionTierContent>
> = {
  // ─── EMOTIONAL WELLNESS (PHQ-4) ────────────────────────────────────
  emotional: {
    thriving: {
      strengths: [
        'Strong emotional regulation and stability',
        'Consistent sense of hope and optimism',
        'Able to experience joy and pleasure regularly',
      ],
      actions: [
        'Continue practices that support emotional balance',
        'Consider sharing your strategies with others who may benefit',
      ],
      context:
        'The PHQ-4 screens for both depression and anxiety. Your low scores indicate strong emotional regulation — a protective factor across all areas of wellness.',
    },
    balanced: {
      strengths: [
        'Generally stable mood with good recovery',
        'Functional emotional awareness',
      ],
      concerns: ['Occasional emotional dips may go unaddressed'],
      actions: [
        'Explore journaling to track emotional patterns over time',
        'Practice naming and sitting with emotions when they arise',
      ],
      toolLink: {
        label: 'Try the Clarity Journal for daily emotional tracking',
        path: '/tools/clarity-journal',
      },
      context:
        'Your PHQ-4 scores are in the mild range. Occasional emotional dips are normal, but monitoring patterns helps catch early signals.',
    },
    struggling: {
      strengths: ['Awareness that emotions are difficult right now is a strength'],
      concerns: [
        'Mood may feel unpredictable or flat',
        'Joy or pleasure may feel distant or hard to access',
      ],
      actions: [
        'Consider trying guided breathing exercises daily',
        'Speaking with a counselor about emotional regulation tools may help',
      ],
      toolLink: {
        label: 'Use the Thought Reframer to identify unhelpful thought patterns',
        path: '/tools/thought-reframer',
      },
      context:
        'Moderate PHQ-4 scores suggest meaningful emotional difficulty. These symptoms often respond well to structured interventions.',
    },
    distressed: {
      concerns: [
        'Persistent low mood or emotional numbness',
        'Difficulty finding pleasure in activities',
        'Emotional overwhelm affecting daily life',
      ],
      actions: [
        'A mental health professional can help identify what is driving this',
        'Crisis resources are available if you need immediate support',
        'Small daily routines can provide anchoring stability',
      ],
      context:
        'Your PHQ-4 scores indicate significant depressive or anxiety symptoms. Professional assessment can help clarify next steps.',
    },
    crisis: {
      concerns: ['Severe emotional distress requiring immediate attention'],
      actions: [
        'Please reach out to a crisis helpline or trusted person now',
        'You do not have to navigate this alone — support is available',
      ],
      context:
        'PHQ-4 scores at this level warrant immediate professional attention. Crisis support is available 24/7.',
    },
  },

  // ─── COGNITIVE CLARITY (WHO-5) — key: 'vitality' ──────────────────
  vitality: {
    thriving: {
      strengths: [
        'Feeling cheerful and in good spirits consistently',
        'Waking up feeling rested and refreshed',
        'Daily life filled with engaging interests',
      ],
      actions: [
        'Maintain the routines that support your well-being',
        'Consider exploring new interests to keep engagement high',
      ],
      context:
        'The WHO-5 is one of the most sensitive measures of subjective wellbeing. Your high score reflects genuine psychological wellness.',
    },
    balanced: {
      strengths: [
        'Generally positive outlook with some variability',
        'Adequate energy and engagement most days',
      ],
      concerns: ['Occasional low energy or disengagement days'],
      actions: [
        'Track which activities boost your well-being and prioritize them',
        'Consider whether sleep quality might be a factor on low days',
      ],
      toolLink: {
        label: 'Try the Sleep Architect to optimize your rest',
        path: '/tools/sleep-architect',
      },
      context:
        'Your WHO-5 suggests adequate wellbeing with some variability. Tracking which days feel better can reveal useful patterns.',
    },
    struggling: {
      strengths: ['Still engaging with daily tasks despite difficulty'],
      concerns: [
        'Reduced interest in activities that used to matter',
        'Feeling less calm or more restless than usual',
      ],
      actions: [
        'Consider scheduling one enjoyable activity each day, even something small',
        'Mindfulness or relaxation exercises may help restore a sense of calm',
      ],
      context:
        'A WHO-5 percentage below 50% often signals the need for clinical screening. This does not mean something is wrong — it means attention is warranted.',
    },
    distressed: {
      concerns: [
        'Persistent lack of energy and motivation',
        'Feeling neither cheerful nor rested most of the time',
        'Daily life may feel empty or uninteresting',
      ],
      actions: [
        'Speaking with a professional can help identify what has changed',
        'Gentle physical activity, even a short walk, can improve well-being scores',
        'Consider whether your environment supports your well-being',
      ],
      context:
        'WHO-5 scores at this level are associated with risk of clinical depression. This is a signal, not a diagnosis.',
    },
    crisis: {
      concerns: ['Severely low well-being across multiple indicators'],
      actions: [
        'Please connect with a mental health professional or crisis resource',
        'You deserve support — reaching out is a sign of strength',
      ],
      context:
        'Severely low WHO-5 scores require professional assessment. Your wellbeing matters and support is available.',
    },
  },

  // ─── SOCIAL CONNECTION (UCLA-3) ───────────────────────────────────
  social: {
    thriving: {
      strengths: [
        'Rarely feeling lonely or left out',
        'Strong sense of companionship and belonging',
        'Satisfaction with current relationships',
      ],
      actions: [
        'Continue nurturing the connections that matter to you',
        'Consider mentoring or supporting someone who may be isolated',
      ],
      context:
        'The UCLA Loneliness Scale measures perceived social isolation. Your low score indicates meaningful social connection — a key protective factor for mental health.',
    },
    balanced: {
      strengths: [
        'Adequate social connections with room to grow',
        'Generally feeling included and supported',
      ],
      concerns: ['May experience occasional loneliness or disconnection'],
      actions: [
        'Explore one new social activity or community group',
        'Deepen existing friendships by reaching out more intentionally',
      ],
      context:
        'Some loneliness is normal and temporary. Your UCLA-3 scores suggest adequate connection with room to deepen relationships.',
    },
    struggling: {
      strengths: ['Awareness of social needs is an important first step'],
      concerns: [
        'Feeling left out or disconnected more often than not',
        'May be withdrawing from social situations',
      ],
      actions: [
        'Consider joining a support group or online community related to your interests',
        'Try reaching out to one trusted person this week',
      ],
      toolLink: {
        label: 'Track your social patterns in the Clarity Journal',
        path: '/tools/clarity-journal',
      },
      context:
        'UCLA-3 scores in this range indicate genuine feelings of disconnection. Social isolation is a modifiable risk factor — small changes can help.',
    },
    distressed: {
      concerns: [
        'Significant feelings of isolation and loneliness',
        'Feeling like you lack people who understand you',
        'Social withdrawal may be reinforcing isolation',
      ],
      actions: [
        'A therapist can help address barriers to connection',
        'Community resources and peer support groups can provide a low-pressure starting point',
        'Consider whether past experiences are making connection feel unsafe',
      ],
      context:
        'Significant loneliness affects mental and physical health. Research shows that even one close connection can meaningfully reduce these effects.',
    },
    crisis: {
      concerns: ['Severe social isolation requiring immediate attention'],
      actions: [
        'Please reach out to a helpline or trusted person — you are not alone',
        'Crisis text lines and chat services provide anonymous connection',
      ],
      context:
        'Severe social isolation requires active intervention. Crisis lines provide immediate human connection while longer-term support is arranged.',
    },
  },

  // ─── PHYSICAL VITALITY (PSS-4) — key: 'cognitive' ────────────────
  cognitive: {
    thriving: {
      strengths: [
        'Low perceived stress and strong sense of control',
        'Confident in handling personal problems',
        'Feeling that things are going your way',
      ],
      actions: [
        'Continue stress management practices that work for you',
        'Consider exploring advanced relaxation or mindfulness techniques',
      ],
      context:
        'The PSS-4 measures perceived stress rather than counting stressors. Your low score suggests strong coping mechanisms and sense of control.',
    },
    balanced: {
      strengths: [
        'Manageable stress levels overall',
        'Some confidence in problem-solving ability',
      ],
      concerns: ['Occasional feelings of being overwhelmed or out of control'],
      actions: [
        'Build a consistent stress-relief routine (exercise, meditation, nature)',
        'Notice which situations trigger stress spikes and prepare strategies',
      ],
      toolLink: {
        label: 'Try the Sleep Architect to reduce stress-related sleep issues',
        path: '/tools/sleep-architect',
      },
      context:
        'Moderate stress is normal and can be motivating. Your PSS-4 suggests manageable levels with occasional overwhelm.',
    },
    struggling: {
      strengths: ['Still managing core responsibilities despite stress'],
      concerns: [
        'Feeling unable to control important things in life',
        'Difficulties may feel like they are piling up',
      ],
      actions: [
        'Consider speaking with a counselor about stress management strategies',
        'Break overwhelming tasks into smaller, more manageable steps',
      ],
      toolLink: {
        label: 'Use the Thought Reframer to challenge stress-driven thinking',
        path: '/tools/thought-reframer',
      },
      context:
        'Elevated PSS-4 scores mean stress is starting to feel unmanageable. Stress management interventions are among the most effective in mental health.',
    },
    distressed: {
      concerns: [
        'High perceived stress affecting multiple areas of life',
        'Feeling that difficulties are beyond your ability to manage',
        'Reduced confidence in handling personal problems',
      ],
      actions: [
        'A mental health professional can help you develop a stress management plan',
        'Prioritize sleep, nutrition, and physical activity — these reduce stress biologically',
        'Consider whether your current commitments are sustainable',
      ],
      context:
        'High perceived stress affects cognition, sleep, and physical health. Professional guidance can help build a sustainable stress management plan.',
    },
    crisis: {
      concerns: ['Overwhelming stress requiring immediate support'],
      actions: [
        'Please reach out to a crisis resource or mental health professional',
        'Even one conversation with a trusted person can help reduce the weight',
      ],
      context:
        'Overwhelming stress at this level needs immediate support. No one should navigate this alone.',
    },
  },

  // ─── DAILY FUNCTIONING (Custom) ───────────────────────────────────
  functioning: {
    thriving: {
      strengths: [
        'Symptoms rarely interfere with daily life',
        'Maintaining personal relationships well',
        'Fulfilling responsibilities consistently',
      ],
      actions: [
        'Continue routines that support your daily functioning',
        'Consider whether there are areas you want to grow into, not just maintain',
      ],
      context:
        'Your daily functioning is well-maintained. Strong functioning is both a result of and a contributor to overall wellness.',
    },
    balanced: {
      strengths: [
        'Managing daily responsibilities with occasional difficulty',
        'Relationships are generally maintained',
      ],
      concerns: ['Some days may feel harder to manage than others'],
      actions: [
        'Build buffer time into your schedule for harder days',
        'Notice which responsibilities feel most draining and explore why',
      ],
      toolLink: {
        label: 'Use the Clarity Journal to track daily functioning patterns',
        path: '/tools/clarity-journal',
      },
      context:
        'Some functional variability is normal. Tracking harder days can reveal whether specific dimensions are driving the difficulty.',
    },
    struggling: {
      strengths: ['Still showing up despite functional challenges'],
      concerns: [
        'Daily responsibilities feel harder to maintain',
        'Relationships may be strained by reduced capacity',
      ],
      actions: [
        'Consider simplifying your routine to focus on essentials',
        'Speaking with a professional can help identify what is getting in the way',
      ],
      context:
        'When functioning is impacted, it often reflects underlying challenges in other dimensions. Addressing root causes typically restores functioning.',
    },
    distressed: {
      concerns: [
        'Significant interference with daily life and responsibilities',
        'Difficulty maintaining personal relationships',
        'Mental state noticeably affecting physical health',
      ],
      actions: [
        'Professional support is strongly encouraged at this level',
        'Focus on basic self-care: sleep, nutrition, hygiene',
        'Let trusted people know you need support — accepting help is not weakness',
      ],
      context:
        'Significant functional impairment suggests that symptoms are affecting your ability to live the life you want. Professional support can help.',
    },
    crisis: {
      concerns: ['Severe functional impairment requiring immediate support'],
      actions: [
        'Please connect with a mental health professional or crisis resource now',
        'Basic safety and self-care are the priority — everything else can wait',
      ],
      context:
        'Severe functional impairment requires immediate professional attention. Focus on safety and basic needs first.',
    },
  },
};
