import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  AlertTriangle,
  Phone,
  Calendar,
  Compass,
  ArrowRight,
  ChevronDown,
  Info,
} from 'lucide-react';
import type { ScoreTier } from '@/lib/clarity/types';
import { getTierHexColor } from '@/lib/clarity/scoring';
import { getPhaseProtocol } from '../../data/phase-protocols';
import { TIER_DESCRIPTIONS } from '../../data/results-content';

interface PhaseNextStepsProps {
  tier: ScoreTier;
}

const URGENCY_ICONS: Record<string, React.ElementType> = {
  urgent: AlertTriangle,
  soon: Phone,
  'this-month': Calendar,
  maintain: Compass,
  protect: Shield,
};

const PhaseNextSteps: React.FC<PhaseNextStepsProps> = ({ tier }) => {
  const protocol = getPhaseProtocol(tier);
  const tierDesc = TIER_DESCRIPTIONS[tier];
  const tierColor = getTierHexColor(tier);
  const UrgencyIcon = URGENCY_ICONS[protocol.urgency] ?? Compass;

  const [showWhy, setShowWhy] = useState(false);
  const [showDonts, setShowDonts] = useState(false);

  const renderAction = (
    action: { label: string; href: string; external?: boolean },
    primary = false
  ) => {
    const baseClasses =
      'inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
    const styles = primary
      ? { backgroundColor: tierColor, color: '#fff' }
      : undefined;
    const classes = primary
      ? `${baseClasses} hover:opacity-90 shadow-sm`
      : `${baseClasses} bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-200 hover:bg-gray-200 dark:hover:bg-neutral-700`;

    if (action.external) {
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
      aria-labelledby="phase-next-steps-heading"
      className="rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
    >
      {/* Header band — uses tier color at low opacity for recognition */}
      <div
        className="px-6 py-5 md:px-8 md:py-6 flex items-start gap-4 border-b border-gray-100 dark:border-neutral-800"
        style={{ backgroundColor: `${tierColor}10` }}
      >
        <div
          className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: tierColor, color: '#fff' }}
          aria-hidden="true"
        >
          <UrgencyIcon size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider"
              style={{ backgroundColor: tierColor, color: '#fff' }}
            >
              {protocol.urgencyLabel}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-neutral-500 font-medium">
              Next Steps
            </span>
          </div>
          <h3
            id="phase-next-steps-heading"
            className="font-bold text-gray-900 dark:text-white text-lg leading-snug"
          >
            {protocol.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-neutral-300 mt-1 leading-relaxed">
            {protocol.subtitle}
          </p>
        </div>
      </div>

      {/* Body: steps */}
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-neutral-500 mb-3">
            Recommended actions
          </h4>
          <ol className="space-y-2.5">
            {protocol.recommendedSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: tierColor, color: '#fff' }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700 dark:text-neutral-200 leading-relaxed pt-0.5">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          {renderAction(protocol.primaryAction, true)}
          {protocol.supportingActions.map((a) => renderAction(a, false))}
        </div>

        {/* What NOT to do — only when defined */}
        {protocol.whatNotToDo && protocol.whatNotToDo.length > 0 && (
          <div className="rounded-xl border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800/40">
            <button
              type="button"
              onClick={() => setShowDonts((v) => !v)}
              className="w-full px-4 py-3 flex items-center justify-between text-left"
              aria-expanded={showDonts}
            >
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                What to avoid right now
              </span>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${showDonts ? 'rotate-180' : ''}`}
              />
            </button>
            {showDonts && (
              <ul className="px-4 pb-4 space-y-2">
                {protocol.whatNotToDo.map((d, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed pl-3 border-l-2 border-gray-200 dark:border-neutral-700"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* What's working / Watch for — surfaces unrendered TIER_DESCRIPTIONS (Task 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-4 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-900/10">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1.5">
              What's working
            </p>
            <p className="text-sm text-gray-700 dark:text-neutral-200 leading-relaxed">
              {tierDesc.whatsWorking}
            </p>
          </div>
          <div className="rounded-xl p-4 border border-amber-100 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-900/10">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1.5">
              Watch for
            </p>
            <p className="text-sm text-gray-700 dark:text-neutral-200 leading-relaxed">
              {tierDesc.watchFor}
            </p>
          </div>
        </div>

        {/* Protocol attribution — collapsible "why these recs" */}
        <div>
          <button
            type="button"
            onClick={() => setShowWhy((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200 transition-colors"
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
            <div className="mt-3 rounded-xl p-4 border border-gray-100 dark:border-neutral-800 bg-gray-50/70 dark:bg-neutral-800/30 space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
                Source
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {protocol.protocolSource}
              </p>
              <p className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed">
                {protocol.protocolSummary}
              </p>
              <p className="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed pt-1">
                {tierDesc.professionalGuidance}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PhaseNextSteps;
