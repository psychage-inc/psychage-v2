
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Save,
  RotateCcw,
  History,
  ArrowRight,
  Phone,
  TrendingUp,
  Target,
  Shield,
  RefreshCw,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Button from '@/components/ui/Button';
import { TIER_META, DOMAIN_META } from '../types';
import type { RelationshipHealthResult, RelationshipDomain, RelationshipTier } from '../types';
import { DomainCard } from './DomainCard';
import { RadarChart } from './RadarChart';
import { RelationshipMap } from './RelationshipMap';
import { SafetyAlert, SafetyBanner } from './SafetyAlert';
import { ClinicalInsights } from './ClinicalInsights';
import { RelationshipBlueprint } from './RelationshipBlueprint';
import { ActionPlanV2 } from './ActionPlanV2';
import { ScienceSection } from './ScienceSection';
import ToolRecommendation from '../../shared/ToolRecommendation';

interface ResultsDashboardProps {
  result: RelationshipHealthResult;
  onSave: () => void;
  onRetake: () => void;
  onViewHistory: () => void;
}

const DOMAINS: RelationshipDomain[] = ['partner', 'family', 'friends', 'community'];

function useAnimatedCounter(target: number, duration = 1200): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(target);
      return;
    }

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, prefersReducedMotion]);

  return value;
}

function getTierColorClasses(tier: RelationshipTier): { text: string; bg: string; border: string } {
  switch (tier) {
    case 'thriving':
      return { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800' };
    case 'healthy':
      return { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' };
    case 'mixed':
      return { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800' };
    case 'strained':
      return { text: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800' };
    case 'isolated':
      return { text: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800' };
  }
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 60) return 'text-primary';
  if (score >= 40) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

function getBarColor(score: number): string {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-primary';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-red-500';
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result,
  onSave,
  onRetake,
  onViewHistory,
}) => {
  const [saved, setSaved] = useState(false);
  const [dvAlertVisible, setDvAlertVisible] = useState(result.dvAlert.triggered);
  const [dvDismissed, setDvDismissed] = useState(false);
  const animatedScore = useAnimatedCounter(result.compositeScore);
  const tierMeta = TIER_META[result.tier];
  const tierColors = getTierColorClasses(result.tier);

  const handleSave = () => {
    onSave();
    setSaved(true);
  };

  const handleDismissDV = () => {
    setDvAlertVisible(false);
    setDvDismissed(true);
  };

  // Get active domains
  const activeDomains = result.skipPartner
    ? DOMAINS.filter((d) => d !== 'partner')
    : DOMAINS;

  // Find strongest and weakest
  const sortedDomains = [...activeDomains].sort(
    (a, b) => result.domainScores[b] - result.domainScores[a]
  );
  const strongest = sortedDomains[0];
  const weakest = sortedDomains[sortedDomains.length - 1];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 transition-colors duration-300">
      <SEO
        title="Your Results | Relationship Health Check | Psychage"
        description="View your relationship health assessment results."
      />

      {/* DV Safety Alert Overlay */}
      {result.dvAlert.triggered && (
        <SafetyAlert
          severity={result.dvAlert.severity}
          visible={dvAlertVisible}
          onDismiss={handleDismissDV}
        />
      )}

      <div className="container mx-auto max-w-5xl space-y-0">
        {/* Persistent DV banner after dismissal */}
        {dvDismissed && <SafetyBanner />}

        {/* ── Section 1: Score Banner ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-t-2xl"
        >
          <div className="px-8 py-10 md:px-10 md:py-12">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
              {/* Score display */}
              <div className="flex items-end gap-6">
                <div className="text-center md:text-left">
                  <p className="text-xs font-medium uppercase tracking-widest text-text-tertiary mb-2">
                    Your Relationship Health Score
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-7xl md:text-8xl font-display font-bold tracking-tight ${tierColors.text}`}
                      aria-label={`Your score is ${result.compositeScore} out of 100`}
                    >
                      {animatedScore}
                    </span>
                    <span className="text-lg text-text-tertiary font-light">
                      / 100
                    </span>
                  </div>
                </div>
                <div className="hidden md:block w-px h-14 bg-border mx-2" />
                <div className="hidden md:flex flex-col gap-1.5 pb-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${tierColors.bg} ${tierColors.text} border ${tierColors.border}`}>
                    {tierMeta.label}
                  </span>
                  <p className="text-xs text-text-tertiary">
                    Based on {activeDomains.length} domains, 17 sub-dimensions
                  </p>
                </div>
              </div>

              {/* Retake button */}
              <button
                onClick={onRetake}
                type="button"
                className="text-text-tertiary hover:text-text-secondary font-medium flex items-center gap-2 transition-colors text-sm"
              >
                <RefreshCw size={14} />
                Retake
              </button>
            </div>

            {/* Mobile tier badge */}
            <div className="mt-4 md:hidden">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${tierColors.bg} ${tierColors.text} border ${tierColors.border}`}>
                {tierMeta.label}
              </span>
            </div>

            {/* Quick insight badges */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-border">
              <div className="inline-flex items-center gap-1.5 bg-surface-hover rounded-full px-3 py-1.5 text-sm text-text-secondary border border-border">
                <TrendingUp size={14} className="text-text-tertiary" />
                <span>Strongest: {DOMAIN_META[strongest].name}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-surface-hover rounded-full px-3 py-1.5 text-sm text-text-secondary border border-border">
                <Target size={14} className="text-text-tertiary" />
                <span>Focus area: {DOMAIN_META[weakest].name}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-surface-hover rounded-full px-3 py-1.5 text-sm text-text-secondary border border-border">
                <Shield size={14} className="text-text-tertiary" />
                <span>10 validated frameworks</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Domain Score Summary Bar ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border-x border-b border-border"
        >
          <div className="px-8 py-6 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {DOMAINS.map((domain) => {
                const score = result.domainScores[domain];
                const meta = DOMAIN_META[domain];
                const isSkipped = domain === 'partner' && result.skipPartner;

                return (
                  <div key={domain} className={`text-center ${isSkipped ? 'opacity-30' : ''}`}>
                    <div className={`text-3xl font-display font-bold ${isSkipped ? 'text-text-tertiary' : getScoreColor(score)}`}>
                      {isSkipped ? '--' : score}
                    </div>
                    <div className="text-xs font-medium text-text-tertiary mt-1">{meta.name}</div>
                    {!isSkipped && (
                      <div className="mt-2 h-1.5 bg-surface-active rounded-full overflow-hidden mx-4">
                        <motion.div
                          className={`h-full rounded-full ${getBarColor(score)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Spacer between header block and content */}
        <div className="h-8" />

        {/* ── Section 2: Isolation Alert ──────────────────────────── */}
        {result.isolationAlert.triggered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
            role="alert"
          >
            <div className={`rounded-2xl p-6 border ${result.isolationAlert.severity === 'severe' ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900' : 'bg-surface border-border'}`}>
              <h3 className="font-display font-semibold text-text-primary mb-2">
                {result.isolationAlert.severity === 'severe'
                  ? 'You deserve connection'
                  : 'Connection matters'}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {result.isolationAlert.severity === 'severe'
                  ? 'Your responses suggest significant disconnection across your relationships. This is painful, and it matters that you\'re here. Loneliness is as impactful on health as smoking -- but even one meaningful connection can begin to change this.'
                  : 'Your responses suggest you may be feeling quite disconnected right now. Loneliness is a common experience, and reaching out -- even in small ways -- can make a real difference.'}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/providers">
                  <Button size="sm" variant="primary">
                    Find a provider
                  </Button>
                </Link>
                <Link to="/learn/relationships-social">
                  <Button size="sm" variant="outline">
                    Read about connection
                  </Button>
                </Link>
                <a
                  href="tel:988"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover px-3 transition-colors"
                >
                  <Phone size={14} />
                  988 Lifeline
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Section 3: Clinical Insights ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ClinicalInsights
            fourHorsemen={result.fourHorsemen}
            patterns={result.patterns}
            skipPartner={result.skipPartner}
          />
        </motion.div>

        {/* ── Section 4: Radar Chart + Network Map ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-surface rounded-2xl border border-border p-6">
            <h2 className="font-display font-semibold text-base text-text-primary mb-4 text-center">
              Domain Overview
            </h2>
            <RadarChart
              domainScores={result.domainScores}
              skipPartner={result.skipPartner}
            />
          </div>
          <div className="bg-surface rounded-2xl border border-border p-6">
            <h2 className="font-display font-semibold text-base text-text-primary mb-4 text-center">
              Your Connection Map
            </h2>
            <RelationshipMap
              domainScores={result.domainScores}
              skipPartner={result.skipPartner}
            />
          </div>
        </motion.div>

        {/* ── Section 5: Domain Breakdown (expandable cards) ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="font-display font-bold text-xl text-text-primary mb-2">
            Domain Breakdown
          </h2>
          <p className="text-sm text-text-tertiary mb-6">
            Click any domain to see your sub-dimensional breakdown and evidence-based insights
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOMAINS.map((domain) => (
              <DomainCard
                key={domain}
                domain={domain}
                score={result.domainScores[domain]}
                subDimensionScores={result.subDimensionScores}
                skipped={domain === 'partner' && result.skipPartner}
                answers={result.answers}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Section 6: Relationship Blueprint ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-8"
        >
          <RelationshipBlueprint blueprint={result.blueprint} />
        </motion.div>

        {/* ── Section 7: Evidence-Based Action Plan ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <ActionPlanV2 patterns={result.patterns} />
        </motion.div>

        {/* ── Section 8: Understanding the Science ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-8"
        >
          <ScienceSection patterns={result.patterns} />
        </motion.div>

        {/* ── Cross-Tool Recommendations ──────────────────────────── */}
        <ToolRecommendation
          signal={{
            toolSlug: 'relationship-health',
            relationshipScore: result.compositeScore,
            relationshipTier: result.tier,
          }}
          className="mb-8"
        />

        {/* ── Section 9: Action Buttons ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
        >
          <Button onClick={handleSave} leftIcon={<Save size={18} />} disabled={saved}>
            {saved ? 'Saved' : 'Save Results'}
          </Button>
          <Button variant="outline" onClick={onRetake} leftIcon={<RotateCcw size={18} />}>
            Retake Assessment
          </Button>
          <Button variant="ghost" onClick={onViewHistory} leftIcon={<History size={18} />}>
            View Past Results
          </Button>
        </motion.div>

        <div className="text-center">
          <Link
            to="/tools"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Explore other tools
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-12">
          <p className="text-xs text-text-tertiary text-center leading-relaxed">
            This tool is for educational purposes only and does not provide a diagnosis.
            Results are based on self-reported responses and grounded in peer-reviewed
            relationship science frameworks. If you're concerned about any aspect of your
            relationships, please consult a qualified professional.
          </p>
        </div>
      </div>
    </div>
  );
};
