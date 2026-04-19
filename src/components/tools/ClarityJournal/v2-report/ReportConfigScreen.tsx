// Clarity Journal V2 — Report Configuration & Download Screen

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Printer, FileText, Check } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import type { ReportConfig } from '../types';
import { getToday, addDays, formatDateRange } from '../dates';
import { generateReportData } from '../lib/reportEngine';
import { generateTherapistReportPDF } from '../lib/pdfGenerator';

const PERIOD_PRESETS = [
  { label: '7 days', days: 7 },
  { label: '14 days', days: 14 },
  { label: '30 days', days: 30 },
];

const SECTION_TOGGLES = [
  { key: 'moodTrends', label: 'Mood Trends & Patterns' },
  { key: 'screenerScores', label: 'Validated Screener Scores (PHQ-2, GAD-2)' },
  { key: 'thoughtRecords', label: 'Thought Record Summary' },
  { key: 'behavioralActivity', label: 'Behavioral Activity Summary' },
  { key: 'sleepPatterns', label: 'Sleep Patterns' },
  { key: 'stressorSummary', label: 'Stressor & Trigger Summary' },
  { key: 'copingEffectiveness', label: 'Coping Strategy Effectiveness' },
  { key: 'freeFormExcerpts', label: 'Journal Excerpts (opted-in only)' },
  { key: 'safetyFlags', label: 'Safety Flag Summary' },
  { key: 'sessionPrepPrompts', label: 'Session Preparation Prompts' },
] as const;

const ReportConfigScreen: React.FC = () => {
  const navigate = useNavigate();
  const today = getToday();

  const [periodDays, setPeriodDays] = useState(7);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const [sections, setSections] = useState<Record<string, boolean>>({
    moodTrends: true,
    screenerScores: true,
    thoughtRecords: true,
    behavioralActivity: true,
    sleepPatterns: true,
    stressorSummary: true,
    copingEffectiveness: true,
    freeFormExcerpts: false,
    safetyFlags: true,
    sessionPrepPrompts: true,
  });

  const [clientName, setClientName] = useState('');
  const [therapistName, setTherapistName] = useState('');
  const [nextSessionDate, setNextSessionDate] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const periodStart = useCustom && customStart ? customStart : addDays(today, -periodDays);
  const periodEnd = useCustom && customEnd ? customEnd : today;

  const toggleSection = (key: string) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const buildConfig = (): ReportConfig => ({
    periodStart,
    periodEnd,
    includeSections: sections as ReportConfig['includeSections'],
    clientName: clientName.trim() || undefined,
    therapistName: therapistName.trim() || undefined,
    nextSessionDate: nextSessionDate || undefined,
  });

  const handleDownloadPDF = async () => {
    setGenerating(true);
    try {
      const config = buildConfig();
      const reportData = generateReportData(config);
      await generateTherapistReportPDF(reportData, config);
      setGenerated(true);
      setTimeout(() => setGenerated(false), 3000);
    } catch (err) {
      console.error('Report generation failed:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0a0a0a] pt-24 pb-16 px-4 sm:px-6">
      <SEO title="Generate Report | Clarity Journal" description="Create a therapist summary report from your journal data." />

      <div className="container mx-auto max-w-2xl">
        <div className="mb-6"><Breadcrumbs /></div>

        <button
          onClick={() => navigate('/tools/clarity-journal')}
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-neutral-400 hover:text-teal-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </button>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight">
              Therapist Report
            </h1>
          </div>
          <p className="text-slate-500 dark:text-neutral-400 text-sm mb-8">
            Generate a wellness summary to share with your therapist. You control exactly what's included.
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Reporting Period */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/60 dark:border-white/10 shadow-sm"
          >
            <h2 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Reporting Period</h2>

            <div className="flex gap-2 mb-3">
              {PERIOD_PRESETS.map(p => (
                <button
                  key={p.days}
                  type="button"
                  onClick={() => { setPeriodDays(p.days); setUseCustom(false); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    !useCustom && periodDays === p.days
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setUseCustom(true)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  useCustom
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700'
                }`}
              >
                Custom
              </button>
            </div>

            {useCustom && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 dark:text-neutral-400 mb-1">Start</label>
                  <input
                    type="date"
                    value={customStart}
                    max={today}
                    onChange={e => setCustomStart(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-neutral-400 mb-1">End</label>
                  <input
                    type="date"
                    value={customEnd}
                    max={today}
                    onChange={e => setCustomEnd(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            )}

            <p className="text-xs text-teal-600 dark:text-teal-400 mt-2">
              {formatDateRange(periodStart, periodEnd)}
            </p>
          </motion.div>

          {/* Section Toggles */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/60 dark:border-white/10 shadow-sm"
          >
            <h2 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Include in Report</h2>
            <div className="space-y-2">
              {SECTION_TOGGLES.map(toggle => (
                <label
                  key={toggle.key}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(toggle.key)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
                      sections[toggle.key] ? 'bg-teal-600 border-teal-600' : 'border-slate-300 dark:border-neutral-600'
                    }`}
                    aria-label={`Toggle ${toggle.label}`}
                  >
                    {sections[toggle.key] && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <span className="text-sm text-slate-700 dark:text-neutral-300">{toggle.label}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Optional Fields */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/60 dark:border-white/10 shadow-sm space-y-4"
          >
            <h2 className="font-semibold text-sm text-slate-900 dark:text-white">Optional Details</h2>

            <div>
              <label className="block text-xs text-slate-500 dark:text-neutral-400 mb-1">Your name (for report header)</label>
              <input
                type="text"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="Defaults to 'Client'"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-500 dark:text-neutral-400 mb-1">Therapist name</label>
              <input
                type="text"
                value={therapistName}
                onChange={e => setTherapistName(e.target.value)}
                placeholder="Optional"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-500 dark:text-neutral-400 mb-1">Next session date</label>
              <input
                type="date"
                value={nextSessionDate}
                onChange={e => setNextSessionDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleDownloadPDF}
              disabled={generating}
              className="w-full flex items-center justify-center gap-2"
            >
              {generating ? (
                'Generating...'
              ) : generated ? (
                <><Check className="w-4 h-4" /> Downloaded</>
              ) : (
                <><Download className="w-4 h-4" /> Download PDF Report</>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print Report
            </Button>
          </motion.div>

          {/* Disclaimer */}
          <p className="text-xs text-slate-400 dark:text-neutral-500 text-center leading-relaxed px-4">
            This report is generated from a self-directed educational wellness tool. It is not a clinical assessment, diagnosis, or medical record. All data is processed on your device — nothing is sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportConfigScreen;
