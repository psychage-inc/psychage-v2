import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Save, RotateCcw, History, ArrowRight, Phone } from 'lucide-react';
import SEO from '@/components/SEO';
import Button from '@/components/ui/Button';
import { TIER_META, DOMAIN_META } from '../types';
import type { RelationshipHealthResult, RelationshipDomain } from '../types';
import { DomainCard } from './DomainCard';
import { RelationshipMap } from './RelationshipMap';
import { SafetyAlert, SafetyBanner } from './SafetyAlert';

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
      setValue(target);
      return;
    }

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
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

  // SVG arc for the score gauge
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (result.compositeScore / 100) * circumference * 0.75;

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

      <div className="container mx-auto max-w-4xl">
        {/* Persistent DV banner after dismissal */}
        {dvDismissed && <SafetyBanner />}

        {/* Section 1: Composite Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-[135deg]">
              {/* Background arc */}
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * 0.25}
                strokeLinecap="round"
              />
              {/* Score arc */}
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#14b8a6"
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
                className="text-5xl font-bold text-gray-900"
                aria-label={`Your Relationship Wellness Score is ${result.compositeScore} out of 100`}
              >
                {animatedScore}
              </span>
              <span className="text-sm text-gray-400">out of 100</span>
            </div>
          </div>

          <h1 className="font-display font-bold text-2xl text-gray-900 mb-2">
            Your Relationship Health Score
          </h1>
          <p className={`text-lg font-medium ${tierMeta.color}`}>{tierMeta.label}</p>
        </motion.div>

        {/* Section 2: Relationship Map */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="font-display font-bold text-xl text-gray-900 text-center mb-6">
            Your Relationship Map
          </h2>
          <RelationshipMap
            domainScores={result.domainScores}
            skipPartner={result.skipPartner}
          />
        </motion.div>

        {/* Section 3: Domain Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="font-display font-bold text-xl text-gray-900 mb-6">
            Domain Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOMAINS.map((domain) => (
              <DomainCard
                key={domain}
                domain={domain}
                score={result.domainScores[domain]}
                skipped={domain === 'partner' && result.skipPartner}
              />
            ))}
          </div>
        </motion.div>

        {/* Section 4: Loneliness Alert */}
        {result.lonelinessAlert && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
            role="alert"
          >
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">
                Connection matters
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Your responses suggest you may be feeling quite disconnected right now. Loneliness
                is a common experience, and reaching out — even in small ways — can make a real
                difference. You don't have to navigate this alone.
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

        {/* Section 5: Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
        >
          <Button
            onClick={handleSave}
            leftIcon={<Save size={18} />}
            disabled={saved}
          >
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
            Results are based on self-reported responses and may not reflect clinical assessments.
            If you're concerned about any aspect of your relationships, please consult a
            qualified professional.
          </p>
        </div>
      </div>
    </div>
  );
};
