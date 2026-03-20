import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, LayoutGrid, HelpCircle, History, ChevronDown, FlaskConical } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <SEO
        title="Relationship Health Check | Psychage"
        description="A clinically-grounded assessment of your relationship health across 17 sub-dimensions, backed by Gottman, EFT, Attachment Theory, and relationship science."
      />
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Breadcrumbs />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="15" cy="14" r="5" fill="#e11d48" opacity="0.7" />
              <path d="M8 28c0-4.5 3.2-7 7-7s7 2.5 7 7" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
              <circle cx="33" cy="14" r="5" fill="#e11d48" opacity="0.7" />
              <path d="M26 28c0-4.5 3.2-7 7-7s7 2.5 7 7" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
              <path d="M24 30c-1.5-1.5-5-4-5-6.5a3 3 0 0 1 5-2.2 3 3 0 0 1 5 2.2c0 2.5-3.5 5-5 6.5z" fill="#e11d48" />
              <path d="M14 32c3 6 17 6 20 0" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" strokeDasharray="3 2" />
            </svg>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Relationship Health Check
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-6">
            A clinically-grounded assessment that measures 17 dimensions of your
            relationship health across four key areas of your life — with pattern
            detection, evidence-based insights, and personalized action steps.
          </p>

          {/* Framework attribution */}
          <div className="bg-teal-50 border border-teal-100 rounded-xl p-5 mb-8 text-left">
            <div className="flex items-start gap-3">
              <FlaskConical size={20} className="text-teal-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-teal-800 mb-1">Grounded in clinical research</p>
                <p className="text-sm text-teal-700 leading-relaxed">
                  Built on frameworks from the Gottman Institute, Emotionally Focused Therapy (EFT),
                  Attachment Theory, and relationship science meta-analyses spanning 40+ years and
                  11,000+ couples studied.
                </p>
              </div>
            </div>
          </div>

          {/* What makes this different — expandable */}
          <button
            onClick={() => setScienceOpen((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors mb-6"
          >
            What makes this assessment different
            <motion.div animate={{ rotate: scienceOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} />
            </motion.div>
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
                <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6 text-left">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Sub-dimensional analysis</p>
                        <p className="text-xs text-gray-500">Every domain is broken into specific clinical constructs — emotional responsiveness, conflict quality, trust, appreciation, and more — not just a single flat score.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Pattern detection</p>
                        <p className="text-xs text-gray-500">Identifies dynamics like the Gottman Four Horsemen, pursue-withdraw cycles, intimate isolation, and social withdrawal — patterns that predict relationship outcomes.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Evidence-based action steps</p>
                        <p className="text-xs text-gray-500">Not generic advice — specific behavioral exercises from Gottman Method, EFT, and maintenance behavior research, each with academic citations.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grief/loss note */}
          <p className="text-sm text-gray-400 mb-8">
            If you've recently lost someone close, some questions may feel difficult. You
            can skip any question at any time.
          </p>
        </motion.div>

        {/* Partner selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto mb-10"
        >
          <p className="text-center text-sm font-bold text-gray-700 mb-4">
            Are you currently in a romantic relationship?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleStartAssessment(false)}
              className="bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-sm hover:border-rose-300 hover:shadow-md transition-all text-left group"
            >
              <p className="font-bold text-gray-900 group-hover:text-rose-600 transition-colors">
                Yes, I have a partner
              </p>
              <p className="text-sm text-gray-400 mt-1">34 questions across 4 domains</p>
            </button>
            <button
              onClick={() => handleStartAssessment(true)}
              className="bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-sm hover:border-teal-300 hover:shadow-md transition-all text-left group"
            >
              <p className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                No, not currently
              </p>
              <p className="text-sm text-gray-400 mt-1">24 questions across 3 domains</p>
            </button>
          </div>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
        >
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <LayoutGrid size={18} className="text-gray-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 mb-0.5">4</p>
            <p className="text-xs text-gray-500">Life domains</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <FlaskConical size={18} className="text-gray-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 mb-0.5">17</p>
            <p className="text-xs text-gray-500">Sub-dimensions</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <HelpCircle size={18} className="text-gray-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 mb-0.5">34</p>
            <p className="text-xs text-gray-500">Questions</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <Clock size={18} className="text-gray-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 mb-0.5">5-10</p>
            <p className="text-xs text-gray-500">Minutes</p>
          </div>
        </motion.div>

        {/* View history link */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
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
          transition={{ delay: 0.25 }}
          className="max-w-xl mx-auto mt-12 bg-slate-50 border border-slate-200 rounded-xl p-5"
        >
          <p className="text-xs font-bold text-slate-600 mb-2">Before you begin</p>
          <ul className="text-xs text-slate-500 leading-relaxed space-y-1.5 list-disc list-inside">
            <li>This is <strong>not</strong> a diagnostic tool — it is a clinically-informed self-reflection exercise grounded in validated research frameworks.</li>
            <li>Your responses are processed entirely on your device and are never sent to any server.</li>
            <li>Results are educational and cannot replace a professional clinical assessment.</li>
            <li>If you are experiencing relationship difficulties, domestic violence, or safety concerns, please reach out to a qualified professional or call the National DV Hotline at <strong>1-800-799-7233</strong>.</li>
            <li>Use this tool as a starting point for self-awareness — not as a final answer.</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default RelationshipHealthCheck;
