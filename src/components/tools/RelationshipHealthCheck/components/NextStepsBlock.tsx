import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Phone,
  Calendar,
  Compass,
  Shield,
  ArrowRight,
  Info,
  ChevronDown,
} from 'lucide-react';
import type { RelationshipTier } from '../types';

interface NextStepsBlockProps {
  tier: RelationshipTier;
  compositeScore: number;
}

interface TierGuidance {
  urgency: 'urgent' | 'soon' | 'this-month' | 'maintain' | 'protect';
  urgencyLabel: string;
  title: string;
  subtitle: string;
  colorHex: string;
  icon: React.ElementType;
  protocolSource: string;
  protocolSummary: string;
  primaryAction: { label: string; href: string; external?: boolean };
  supportingActions: { label: string; href: string; external?: boolean }[];
  recommendedSteps: string[];
  callout?: string;
}

const TIER_GUIDANCE: Record<RelationshipTier, TierGuidance> = {
  isolated: {
    urgency: 'urgent',
    urgencyLabel: 'Reach out this week',
    title: 'Your connections need attention first',
    subtitle:
      'Relationship isolation is a strong predictor of both mental and physical health outcomes. Start with one specific connection this week.',
    colorHex: '#e11d48', // rose-600
    icon: AlertTriangle,
    protocolSource:
      'Holt-Lunstad (2015) loneliness meta-analysis · NICE guidance on social isolation · Gottman "Small Things Often"',
    protocolSummary:
      'Large-scale meta-analyses show the mortality impact of chronic loneliness is comparable to smoking 15 cigarettes a day. Evidence-based responses prioritize one structured contact per week, a clinician conversation, and small repeated relational "bids" over grand gestures.',
    primaryAction: { label: 'Find a provider', href: '/providers' },
    supportingActions: [
      { label: 'See your action plan', href: '#action-plan' },
      { label: '988 if in crisis', href: 'tel:988', external: true },
    ],
    recommendedSteps: [
      'Reach out to one person this week — a short text counts as connection',
      'Schedule an intake with a therapist or counselor; isolation responds well to guided support',
      'If distress feels overwhelming, call or text 988 — loneliness and crisis often overlap',
      'Practice Gottman\'s "Small Things Often": one low-stakes, positive interaction per day',
      'Join one ongoing activity (class, group, volunteer shift) where seeing the same people weekly is built in',
    ],
    callout:
      'Your composite score overlaps with isolation risk. Loneliness has a mortality impact comparable to smoking 15 cigarettes/day (Holt-Lunstad, 2015) — and it is highly modifiable.',
  },
  strained: {
    urgency: 'soon',
    urgencyLabel: 'Within 2 weeks',
    title: 'Start with the patterns that predict outcomes',
    subtitle:
      'Your score suggests meaningful strain. Gottman research shows four specific communication patterns — the "Four Horsemen" — predict relational outcomes with ~94% accuracy. Addressing them is the highest-leverage starting point.',
    colorHex: '#ea580c', // orange-600
    icon: Phone,
    protocolSource: 'Gottman Institute research · Emotionally Focused Therapy (Johnson) · APA couples guidance',
    protocolSummary:
      'When strain is patterned, Gottman Method and EFT both recommend targeting communication patterns before general relationship coaching. Low-intensity self-guided practice (antidotes, gentle start-up, physiological self-soothing) is often enough early on; therapy accelerates it when the pattern is entrenched.',
    primaryAction: { label: 'See your action plan', href: '#action-plan' },
    supportingActions: [
      { label: 'Review Four Horsemen', href: '#clinical-insights' },
      { label: 'Find a couples counselor', href: '/providers' },
    ],
    recommendedSteps: [
      'Review the Four Horsemen section below and identify your most frequent pattern',
      'Pick one antidote to practice this week (gentle start-up, appreciation, taking responsibility, self-soothing)',
      'Book a counselor or couples therapist intake if patterns are entrenched (>2 years)',
      'Retake this assessment in 4 weeks to see whether practice is moving the pattern',
    ],
  },
  mixed: {
    urgency: 'this-month',
    urgencyLabel: 'This month',
    title: 'Strengthen the relationships you want to grow',
    subtitle:
      'A mixed picture with room to grow. Maintenance behaviors, not crisis response, are the right frame here.',
    colorHex: '#d97706', // amber-600
    icon: Calendar,
    protocolSource: 'Stafford & Canary relationship maintenance research · Positive Psychology',
    protocolSummary:
      'Relationship maintenance research (Stafford & Canary) identifies five behaviors — positivity, openness, assurances, social networks, sharing tasks — that protect relationships over time. Targeting the weakest domain with one small behavior is more effective than broad change.',
    primaryAction: { label: 'Review your action plan', href: '#action-plan' },
    supportingActions: [
      { label: 'Read about connection', href: '/learn/relationships-social' },
      { label: 'Explore tools', href: '/tools' },
    ],
    recommendedSteps: [
      'Pick your weakest domain above and add one maintenance behavior for 2 weeks',
      'Schedule a recurring low-stakes ritual with one key person (weekly call, shared meal)',
      'Notice where appreciation has dropped off and rebuild it explicitly',
      'Retake this assessment in 4 weeks to confirm the trend is improving',
    ],
  },
  healthy: {
    urgency: 'maintain',
    urgencyLabel: 'Keep the trend',
    title: 'Protect your foundation and keep building',
    subtitle:
      'A solid foundation with areas to nurture. The task here is protection and selective growth.',
    colorHex: '#0d9488', // teal-600
    icon: Compass,
    protocolSource: 'Gottman Sound Relationship House · Stafford & Canary maintenance research',
    protocolSummary:
      'Gottman\'s Sound Relationship House framework shows that sustained health comes from consistent "love maps", turning toward bids, and shared meaning — routines more than interventions.',
    primaryAction: { label: 'Review growth area', href: '#action-plan' },
    supportingActions: [
      { label: 'Read about connection', href: '/learn/relationships-social' },
      { label: 'Explore tools', href: '/tools' },
    ],
    recommendedSteps: [
      'Protect the rituals and routines that are working — do not let them erode during busy periods',
      'Add one "turning toward" behavior (short check-in, shared curiosity) in the area scoring lowest',
      'Retake this assessment in 6–8 weeks for maintenance tracking',
      'Share one thing that works with someone earlier in their journey',
    ],
  },
  thriving: {
    urgency: 'protect',
    urgencyLabel: 'Protect the floor',
    title: 'Keep the practices that got you here',
    subtitle:
      'Strong connections across your life. The task is protection and continued investment, not reinvention.',
    colorHex: '#059669', // emerald-600
    icon: Shield,
    protocolSource: 'Gottman Sound Relationship House · Positive Psychology (Seligman, Fredrickson)',
    protocolSummary:
      'Protective-factor research consistently shows the strongest predictor of continued thriving is maintaining the routines that built it, plus periodic reassessment to catch early drift.',
    primaryAction: { label: 'Retake in 90 days', href: '/relationship-health' },
    supportingActions: [
      { label: 'Explore advanced tools', href: '/tools' },
      { label: 'Read about connection', href: '/learn/relationships-social' },
    ],
    recommendedSteps: [
      'Maintain the rituals and relational habits that are working',
      'Set a 90-day calendar reminder to retake this assessment',
      'Invest in the single domain scoring lowest — even thriving benefits from selective depth',
      'Consider mentoring or supporting someone earlier in their journey',
    ],
  },
};

export const NextStepsBlock: React.FC<NextStepsBlockProps> = ({ tier, compositeScore }) => {
  const guidance = TIER_GUIDANCE[tier];
  const Icon = guidance.icon;
  const [showWhy, setShowWhy] = useState(false);

  const renderAction = (
    action: { label: string; href: string; external?: boolean },
    primary = false
  ) => {
    const baseClasses =
      'inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
    const styles = primary
      ? { backgroundColor: guidance.colorHex, color: '#fff' }
      : undefined;
    const classes = primary
      ? `${baseClasses} hover:opacity-90 shadow-sm`
      : `${baseClasses} bg-surface-active text-text-primary hover:bg-surface-hover border border-border`;

    if (action.external) {
      return (
        <a key={action.href} href={action.href} className={classes} style={styles}>
          {action.label}
          <ArrowRight size={14} />
        </a>
      );
    }
    if (action.href.startsWith('#')) {
      return (
        <a key={action.href} href={action.href} className={classes} style={styles}>
          {action.label}
          <ArrowRight size={14} />
        </a>
      );
    }
    return (
      <Link key={action.href} to={action.href} className={classes} style={styles}>
        {action.label}
        <ArrowRight size={14} />
      </Link>
    );
  };

  return (
    <section
      aria-labelledby="rhc-next-steps-heading"
      className="rounded-2xl overflow-hidden border border-border bg-surface mb-8"
    >
      <div
        className="px-6 py-5 md:px-8 md:py-6 flex items-start gap-4 border-b border-border"
        style={{ backgroundColor: `${guidance.colorHex}0D` }}
      >
        <div
          className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: guidance.colorHex, color: '#fff' }}
          aria-hidden="true"
        >
          <Icon size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider"
              style={{ backgroundColor: guidance.colorHex, color: '#fff' }}
            >
              {guidance.urgencyLabel}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-text-tertiary font-medium">
              What to do next · Score {compositeScore}/100
            </span>
          </div>
          <h2
            id="rhc-next-steps-heading"
            className="font-display font-bold text-lg md:text-xl text-text-primary leading-snug"
          >
            {guidance.title}
          </h2>
          <p className="text-sm text-text-secondary mt-1 leading-relaxed">
            {guidance.subtitle}
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {guidance.callout && (
          <div
            className="rounded-xl p-4 border text-sm leading-relaxed"
            style={{
              backgroundColor: `${guidance.colorHex}0D`,
              borderColor: `${guidance.colorHex}33`,
              color: 'inherit',
            }}
          >
            <p className="text-text-primary">{guidance.callout}</p>
          </div>
        )}

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-3">
            Recommended actions
          </h3>
          <ol className="space-y-2.5">
            {guidance.recommendedSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: guidance.colorHex, color: '#fff' }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="text-sm text-text-primary leading-relaxed pt-0.5">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-wrap gap-3">
          {renderAction(guidance.primaryAction, true)}
          {guidance.supportingActions.map((a) => renderAction(a, false))}
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowWhy((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-tertiary hover:text-text-secondary transition-colors"
            aria-expanded={showWhy}
          >
            <Info size={13} />
            Why these recommendations
            <ChevronDown
              size={13}
              className={`transition-transform ${showWhy ? 'rotate-180' : ''}`}
            />
          </button>
          {showWhy && (
            <div className="mt-3 rounded-xl p-4 border border-border bg-surface-hover space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                Source
              </p>
              <p className="text-sm font-semibold text-text-primary">
                {guidance.protocolSource}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {guidance.protocolSummary}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NextStepsBlock;
