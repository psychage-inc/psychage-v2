import type { ScoreTier } from '@/lib/clarity/types';

export type Urgency = 'urgent' | 'soon' | 'this-month' | 'maintain' | 'protect';

export interface PhaseAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface PhaseProtocol {
  phase: ScoreTier;
  urgency: Urgency;
  urgencyLabel: string;
  title: string;
  subtitle: string;
  protocolSource: string;
  protocolSummary: string;
  primaryAction: PhaseAction;
  supportingActions: PhaseAction[];
  recommendedSteps: string[];
  whatNotToDo?: string[];
}

export const PHASE_PROTOCOLS: Record<ScoreTier, PhaseProtocol> = {
  crisis: {
    phase: 'crisis',
    urgency: 'urgent',
    urgencyLabel: 'Act now',
    title: 'Right now: reach out for immediate support',
    subtitle:
      'Your score suggests you may need help today. These are the steps international crisis protocols ask first.',
    protocolSource: 'WHO mhGAP 2.0 · SAMHSA SAFE-T · 988 Lifeline Guidelines',
    protocolSummary:
      'The WHO mhGAP self-harm module and SAMHSA SAFE-T protocol both prioritize immediate contact with a trained responder, reducing access to means of self-harm, and telling one trusted person within the same day.',
    primaryAction: { label: 'Call 988 now', href: 'tel:988', external: true },
    supportingActions: [
      { label: 'Text HOME to 741741', href: 'sms:741741?&body=HOME', external: true },
      { label: 'Crisis resources', href: '/crisis' },
    ],
    recommendedSteps: [
      'Call 988 — the Suicide & Crisis Lifeline is free, 24/7, confidential (U.S.)',
      'Text HOME to 741741 for the Crisis Text Line if you prefer not to speak',
      'If you or someone near you is in immediate danger, call 911 or go to the nearest ER',
      'Remove access to means of self-harm from your immediate environment tonight',
      'Tell one person you trust what you are going through today — even a single sentence',
    ],
    whatNotToDo: [
      'Do not wait "to see if it gets better" — mhGAP recommends same-day contact at this level',
      'Do not use alcohol or recreational drugs to cope right now — they sharply raise risk',
      'Do not isolate — stay in contact with at least one person until you feel safer',
    ],
  },
  distressed: {
    phase: 'distressed',
    urgency: 'soon',
    urgencyLabel: 'Within 7 days',
    title: 'This week: book professional support',
    subtitle:
      'Your score lands in a range where stepped-care guidelines call for licensed clinician review.',
    protocolSource: 'NICE CG90 (depression) · NICE CG113 (anxiety) · APA Clinical Practice Guideline',
    protocolSummary:
      'NICE stepped-care step 3 and the APA Clinical Practice Guideline both recommend contact with a licensed clinician within a week at this severity, with emphasis on sleep stabilization and early safety-planning alongside treatment.',
    primaryAction: { label: 'Find a provider', href: '/providers' },
    supportingActions: [
      { label: 'Crisis resources', href: '/crisis' },
      { label: 'Explore wellness tools', href: '/tools' },
    ],
    recommendedSteps: [
      'Book a licensed clinician (therapist, PCP, or psychiatrist) within the next 7 days',
      'Ask whether a medication evaluation is appropriate given the severity',
      'Protect basic sleep, nutrition, and hydration — these are biological stabilizers',
      'Check in with yourself weekly using this assessment to track trend, not just score',
      'Tell one trusted person where you are at — isolation worsens distressed-range symptoms',
    ],
    whatNotToDo: [
      'Do not push through untreated — NICE guidance is explicit that self-management alone is under-powered here',
      'Do not wait for the next crisis to act — early treatment sharply improves outcomes',
    ],
  },
  struggling: {
    phase: 'struggling',
    urgency: 'this-month',
    urgencyLabel: 'Within 2–4 weeks',
    title: 'This month: get guided support',
    subtitle:
      'Your score suggests meaningful difficulty. Low-intensity, evidence-based support is indicated at this stage.',
    protocolSource: 'APA Clinical Practice Guideline · NICE stepped care step 2',
    protocolSummary:
      'APA and NICE both recommend low-intensity interventions at this level: guided self-help CBT, structured behavioral activation, or a brief counselor consultation — often effective before medication is needed.',
    primaryAction: { label: 'Schedule a counselor intake', href: '/providers' },
    supportingActions: [
      { label: 'Explore wellness tools', href: '/tools' },
      { label: 'Read about next steps', href: '/learn' },
    ],
    recommendedSteps: [
      'Book an intake with a counselor or coach for low-intensity CBT or guided self-help',
      'Use a Psychage wellness tool aligned with your weakest dimension this week',
      'Retake this assessment every two weeks to detect trend, not just noise',
      'Start a short daily log of mood, sleep, and one stressor for early pattern recognition',
      'Identify one person you can reach out to if things worsen',
    ],
  },
  balanced: {
    phase: 'balanced',
    urgency: 'maintain',
    urgencyLabel: 'Keep the trend',
    title: 'Maintain: protect what is working',
    subtitle:
      'Your score reflects a solid foundation. Maintenance and growth — not crisis response — are the right frame.',
    protocolSource: 'APA preventive guidance · WHO mental health promotion framework',
    protocolSummary:
      'APA preventive guidance and the WHO mental health promotion framework emphasize habit protection, routine check-ins, and skill-building as the best predictors of sustained wellbeing in this range.',
    primaryAction: { label: 'Explore wellness tools', href: '/tools' },
    supportingActions: [
      { label: 'Find a provider for optimization', href: '/providers' },
      { label: 'Read about your growth area', href: '/learn' },
    ],
    recommendedSteps: [
      'Retake this assessment in 2–4 weeks to confirm the trend is holding',
      'Pick the weakest dimension and add one specific habit for it this month',
      'Consider a periodic professional check-in (optional but protective)',
      'Share one strategy that works for you with someone who could benefit',
    ],
  },
  thriving: {
    phase: 'thriving',
    urgency: 'protect',
    urgencyLabel: 'Protect the floor',
    title: 'Protect: keep the practices that got you here',
    subtitle:
      'Your score suggests strong psychological functioning. The task is protection and continued growth.',
    protocolSource: 'APA preventive guidance · Positive Psychology research (Seligman, Fredrickson)',
    protocolSummary:
      'Protective-factor research consistently shows the strongest predictor of sustained thriving is maintaining existing routines rather than adding new ones — plus periodic reassessment to catch early drift.',
    primaryAction: { label: 'Retake in 30 days', href: '/clarity-score' },
    supportingActions: [
      { label: 'Explore advanced tools', href: '/tools' },
      { label: 'Read about mental fitness', href: '/learn' },
    ],
    recommendedSteps: [
      'Protect the routines that are working — do not let them erode during busy periods',
      'Retake this assessment in 30 days; set a calendar reminder',
      'Consider mentoring or supporting someone who is earlier in their journey',
      'Book a quarterly professional check-in for maintenance and perspective',
    ],
  },
};

export function getPhaseProtocol(tier: ScoreTier): PhaseProtocol {
  return PHASE_PROTOCOLS[tier];
}
