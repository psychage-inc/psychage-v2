 
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

function getTierGradient(tier: RelationshipTier): string {
  switch (tier) {
    case 'thriving':
      return 'from-emerald-500 to-teal-600';
    case 'healthy':
      return 'from-teal-500 to-cyan-600';
    case 'mixed':
      return 'from-amber-500 to-orange-500';
    case 'strained':
      return 'from-orange-500 to-red-500';
    case 'isolated':
      return 'from-red-500 to-rose-600';
  }
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-teal-600';
  if (score >= 40) return 'text-amber-600';
  return 'text-rose-600';
}

function getStrokeColor(tier: RelationshipTier): string {
  switch (tier) {
    case 'thriving':
      return '#10b981';
    case 'healthy':
      return '#14b8a6';
    case 'mixed':
      return '#f59e0b';
    case 'strained':
      return '#f97316';
    case 'isolated':
      return '#ef4444';
  }
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

  // SVG arc for the score gauge
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset =
    circumference - (result.compositeScore / 100) * circumference * 0.75;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
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

      <div className="container mx-auto max-w-5xl">
        {/* Persistent DV banner after dismissal */}
        {dvDismissed && <SafetyBanner />}

        {/* ── Section 1: Score Hero ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getTierGradient(result.tier)} p-8 md:p-12 text-white text-center mb-10`}
        >
          <div className="relative z-10">
            {/* Score gauge */}
            <div className="relative w-44 h-44 mx-auto mb-6">
              <svg viewBox="0 0 160 160" className="w-full h-full -rotate-[135deg]">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * 0.25}
                  strokeLinecap="round"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-5xl font-bold"
                  aria-label={`Your Relationship Wellness Score is ${result.compositeScore} out of 100`}
                >
                  {animatedScore}
                </span>
                <span className="text-sm text-white/70">out of 100</span>
              </div>
            </div>

            <h1 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Your Relationship Health Score
            </h1>
            <p className="text-lg text-white/80 font-medium">{tierMeta.label}</p>

            {/* Quick insight badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm">
                <TrendingUp size={14} />
                <span>Strongest: {DOMAIN_META[strongest].name}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm">
                <Target size={14} />
                <span>Focus area: {DOMAIN_META[weakest].name}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm">
                <Shield size={14} />
                <span>Grounded in 10 validated frameworks</span>
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white translate-y-1/3 -translate-x-1/3" />
          </div>
        </motion.div>

        {/* ── Section 2: Isolation Alert ──────────────────────────── */}
        {result.isolationAlert.triggered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-10"
            role="alert"
          >
            <div className={`rounded-xl p-6 border ${result.isolationAlert.severity === 'severe' ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'}`}>
              <h3 className="font-bold text-gray-900 mb-2">
                {result.isolationAlert.severity === 'severe'
                  ? 'You deserve connection'
                  : 'Connection matters'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {result.isolationAlert.severity === 'severe'
                  ? 'Your responses suggest significant disconnection across your relationships. This is painful, and it matters that you\'re here. Loneliness is as impactful on health as smoking — but even one meaningful connection can begin to change this.'
                  : 'Your responses suggest you may be feeling quite disconnected right now. Loneliness is a common experience, and reaching out — even in small ways — can make a real difference.'}
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
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 px-3"
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
          className="mb-10"
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4 text-center">
              Domain Overview
            </h2>
            <RadarChart
              domainScores={result.domainScores}
              skipPartner={result.skipPartner}
            />
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4 text-center">
              Your Connection Map
            </h2>
            <RelationshipMap
              domainScores={result.domainScores}
              skipPartner={result.skipPartner}
            />
          </div>
        </motion.div>

        {/* ── Section 5: Domain Score Summary Bar ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DOMAINS.map((domain) => {
              const score = result.domainScores[domain];
              const meta = DOMAIN_META[domain];
              const isSkipped = domain === 'partner' && result.skipPartner;

              return (
                <div key={domain} className={`text-center ${isSkipped ? 'opacity-40' : ''}`}>
                  <div className={`text-3xl font-bold ${isSkipped ? 'text-gray-300' : getScoreColor(score)}`}>
                    {isSkipped ? '—' : score}
                  </div>
                  <div className="text-xs font-medium text-gray-500 mt-1">{meta.name}</div>
                  {!isSkipped && (
                    <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden mx-4">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: getStrokeColor(score >= 80 ? 'thriving' : score >= 60 ? 'healthy' : score >= 40 ? 'mixed' : score >= 20 ? 'strained' : 'isolated') }}
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
        </motion.div>

        {/* ── Section 6: Domain Breakdown (expandable cards) ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-10"
        >
          <h2 className="font-display font-bold text-xl text-gray-900 mb-2">
            Domain Breakdown
          </h2>
          <p className="text-sm text-gray-500 mb-6">
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

        {/* ── Section 7: Relationship Blueprint ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <RelationshipBlueprint blueprint={result.blueprint} />
        </motion.div>

        {/* ── Section 8: Evidence-Based Action Plan ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-10"
        >
          <ActionPlanV2 patterns={result.patterns} />
        </motion.div>

        {/* ── Section 9: Understanding the Science ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <ScienceSection patterns={result.patterns} />
        </motion.div>

        {/* ── Section 10: Action Buttons ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
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
            className="inline-flex items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors"
          >
            Explore other tools
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-12">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
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
