import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  HelpCircle,
  History,
  ChevronDown,
  FlaskConical,
  Heart,
  Home,
  Users,
  Globe,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import { QuestionWizard } from './components/QuestionWizard';
import { ResultsDashboard } from './components/ResultsDashboard';
import { HistoryView } from './components/HistoryView';
import { computeResult } from './scoring';
import { saveResult, loadHistory, deleteResult } from './storage';
import type { RelationshipHealthResult, RelationshipHistoryItem } from './types';

type View = 'landing' | 'wizard' | 'results' | 'history';

const DOMAIN_PREVIEW = [
  {
    icon: Heart,
    name: 'Partner',
    description: 'Emotional responsiveness, conflict patterns, appreciation',
  },
  {
    icon: Home,
    name: 'Family',
    description: 'Boundaries, emotional support, intergenerational patterns',
  },
  {
    icon: Users,
    name: 'Friends',
    description: 'Reciprocity, vulnerability, social maintenance',
  },
  {
    icon: Globe,
    name: 'Community',
    description: 'Belonging, civic engagement, social identity',
  },
];

const RelationshipHealthCheck: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [skipPartner, setSkipPartner] = useState(false);
  const [currentResult, setCurrentResult] = useState<RelationshipHealthResult | null>(null);
  const [history, setHistory] = useState<RelationshipHistoryItem[]>(() => loadHistory());
  const [scienceOpen, setScienceOpen] = useState(false);

  const handleStartAssessment = useCallback((skip: boolean) => {
    setSkipPartner(skip);
    setView('wizard');
  }, []);

  const handleWizardComplete = useCallback(
    (answers: Record<string, number>) => {
      const result = computeResult(answers, skipPartner);
      setCurrentResult(result);
      setView('results');
    },
    [skipPartner]
  );

  const handleSaveResult = useCallback(() => {
    if (!currentResult) return;
    saveResult(currentResult);
    setHistory(loadHistory());
  }, [currentResult]);

  const handleRetake = useCallback(() => {
    setCurrentResult(null);
    setView('landing');
  }, []);

  const handleDeleteHistory = useCallback((id: string) => {
    const updated = deleteResult(id);
    setHistory(updated);
  }, []);

  // --- Wizard view ---
  if (view === 'wizard') {
    return (
      <QuestionWizard
        skipPartner={skipPartner}
        onComplete={handleWizardComplete}
        onCancel={() => setView('landing')}
      />
    );
  }

  // --- Results view ---
  if (view === 'results' && currentResult) {
    return (
      <ResultsDashboard
        result={currentResult}
        onSave={handleSaveResult}
        onRetake={handleRetake}
        onViewHistory={() => {
          setView('history');
        }}
      />
    );
  }

  // --- History view ---
  if (view === 'history') {
    return (
      <HistoryView
        history={history}
        onBack={() => setView('landing')}
        onDelete={handleDeleteHistory}
        onStartNew={() => setView('landing')}
      />
    );
  }

  // --- Landing view ---
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 transition-colors duration-300">
      <SEO
        title="Relationship Health Check | Psychage"
        description="A clinically-grounded assessment of your relationship health across 17 sub-dimensions, backed by Gottman, EFT, Attachment Theory, and relationship science."
      />
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <Breadcrumbs />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-4 tracking-tight">
            Relationship Health Check
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed">
            A structured assessment grounded in validated relationship science
            frameworks. Understand the health of your connections across four
            life domains.
          </p>
        </motion.div>

        {/* Three info cards — matches Clarity Score pattern */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12"
        >
          <div className="bg-surface rounded-2xl border border-border p-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <FlaskConical size={20} className="text-primary" />
            </div>
            <h3 className="font-display font-semibold text-base text-text-primary mb-2">
              What it measures
            </h3>
            <p className="text-sm text-text-tertiary leading-relaxed">
              17 clinical sub-dimensions across four relationship domains, drawn
              from the Gottman Institute, EFT, and Attachment Theory research.
            </p>
          </div>
          <div className="bg-surface rounded-2xl border border-border p-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <HelpCircle size={20} className="text-primary" />
            </div>
            <h3 className="font-display font-semibold text-base text-text-primary mb-2">
              How it works
            </h3>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Up to 34 questions rated on a simple scale. Pattern detection
              identifies dynamics like the Four Horsemen and pursue-withdraw
              cycles.
            </p>
          </div>
          <div className="bg-surface rounded-2xl border border-border p-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Clock size={20} className="text-primary" />
            </div>
            <h3 className="font-display font-semibold text-base text-text-primary mb-2">
              What to expect
            </h3>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Takes 5-10 minutes. You will receive a composite score, domain
              breakdowns, detected patterns, and evidence-based action steps.
            </p>
          </div>
        </motion.div>

        {/* Four domains preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="font-display font-semibold text-sm uppercase tracking-wider text-text-tertiary mb-5 text-center">
            Four Relationship Domains
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DOMAIN_PREVIEW.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.name}
                  className="flex flex-col items-center gap-2 bg-surface rounded-xl border border-border px-3 py-4 text-center"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {d.name}
                  </span>
                  <span className="text-[11px] text-text-tertiary leading-snug">
                    {d.description}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Assessment roadmap — 3 step chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mb-6"
          aria-label="Assessment roadmap"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { n: '1', label: 'Pick your context' },
              { n: '2', label: 'Answer 24–34 questions' },
              { n: '3', label: 'Get your results' },
            ].map((step, i) => (
              <div
                key={step.n}
                className={`flex items-center gap-2.5 bg-surface border border-border rounded-xl px-3 py-2.5 ${
                  i === 0 ? 'ring-1 ring-primary/20' : ''
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    i === 0
                      ? 'bg-primary text-white'
                      : 'bg-surface-active text-text-tertiary'
                  }`}
                >
                  {step.n}
                </span>
                <span className="text-xs font-medium text-text-secondary">{step.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Partner selection — wrapped in a "Begin Here" stepped container */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-12 rounded-2xl bg-primary/5 border-2 border-primary/20 p-6 sm:p-7"
          aria-labelledby="begin-assessment-heading"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary text-white">
              Begin Here
            </span>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-text-tertiary">
              Step 1 of 2
            </span>
          </div>
          <h2
            id="begin-assessment-heading"
            className="font-display font-bold text-xl text-text-primary mb-1"
          >
            Choose your path to start
          </h2>
          <p className="text-sm text-text-secondary mb-5 leading-relaxed">
            This determines which relationship domains you'll be rated on.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleStartAssessment(false)}
              className="bg-surface rounded-xl p-5 border-2 border-border hover:border-primary transition-all text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <p className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                Yes, I have a partner
              </p>
              <p className="text-sm text-text-tertiary mt-1">34 questions across 4 domains</p>
            </button>
            <button
              onClick={() => handleStartAssessment(true)}
              className="bg-surface rounded-xl p-5 border-2 border-border hover:border-primary transition-all text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <p className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                No, not currently
              </p>
              <p className="text-sm text-text-tertiary mt-1">24 questions across 3 domains</p>
            </button>
          </div>
        </motion.section>

        {/* Science expandable */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <button
            onClick={() => setScienceOpen((prev) => !prev)}
            className="w-full bg-surface rounded-2xl border border-border p-5 text-left hover:bg-surface-hover transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FlaskConical size={18} className="text-text-tertiary" />
                <span className="text-sm font-semibold text-text-primary">
                  What makes this assessment different
                </span>
              </div>
              <motion.div animate={{ rotate: scienceOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} className="text-text-tertiary" />
              </motion.div>
            </div>
          </button>
          <AnimatePresence>
            {scienceOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-surface border border-t-0 border-border rounded-b-2xl p-5 space-y-3">
                  {[
                    {
                      num: '1',
                      title: 'Sub-dimensional analysis',
                      desc: 'Every domain is broken into specific clinical constructs -- emotional responsiveness, conflict quality, trust, appreciation, and more -- not just a single flat score.',
                    },
                    {
                      num: '2',
                      title: 'Pattern detection',
                      desc: 'Identifies dynamics like the Gottman Four Horsemen, pursue-withdraw cycles, intimate isolation, and social withdrawal -- patterns that predict relationship outcomes.',
                    },
                    {
                      num: '3',
                      title: 'Evidence-based action steps',
                      desc: 'Not generic advice -- specific behavioral exercises from Gottman Method, EFT, and maintenance behavior research, each with academic citations.',
                    },
                  ].map((item) => (
                    <div key={item.num} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {item.num}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                        <p className="text-xs text-text-tertiary leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* View history link */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-center mb-8"
          >
            <Button
              variant="ghost"
              leftIcon={<History size={18} />}
              onClick={() => setView('history')}
            >
              View Past Results ({history.length})
            </Button>
          </motion.div>
        )}

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-surface rounded-2xl border border-border p-6"
        >
          <p className="text-xs font-semibold text-text-secondary mb-2">Before you begin</p>
          <ul className="text-xs text-text-tertiary leading-relaxed space-y-1.5 list-disc list-inside">
            <li>This is <strong className="text-text-secondary">not</strong> a diagnostic tool -- it is a clinically-informed self-reflection exercise grounded in validated research frameworks.</li>
            <li>Your responses are processed entirely on your device and are never sent to any server.</li>
            <li>Results are educational and cannot replace a professional clinical assessment.</li>
            <li>If you are experiencing relationship difficulties, domestic violence, or safety concerns, please reach out to a qualified professional or call the National DV Hotline at <strong className="text-text-secondary">1-800-799-7233</strong>.</li>
            <li>Use this tool as a starting point for self-awareness -- not as a final answer.</li>
          </ul>
          <p className="text-xs text-text-tertiary mt-3">
            If you've recently lost someone close, some questions may feel difficult. You
            can skip any question at any time.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RelationshipHealthCheck;
