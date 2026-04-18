import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import WeekSummaryMini from '../components/WeekSummaryMini';
import { useClarityJournal } from '../hooks/useClarityJournal';
import { getToday, getWeekStart, getWeekEnd, formatDateRange, generateId, nowISO } from '../dates';
import type { WeeklyReflection as WeeklyReflectionType } from '../types';

const WeeklyReflection: React.FC = () => {
  const navigate = useNavigate();
  const { data, addReflection } = useClarityJournal();

  const weekStart = getWeekStart(getToday());
  const weekEnd = getWeekEnd(getToday());

  // Get this week's daily check-ins
  const weekCheckIns = data.dailyCheckIns.filter(c => c.date >= weekStart && c.date <= weekEnd);

  // Load existing reflection for this week
  const existing = data.weeklyReflections.find(r => r.weekStartDate === weekStart);

  const [wentWell, setWentWell] = useState(existing?.wentWell || '');
  const [wasDifficult, setWasDifficult] = useState(existing?.wasDifficult || '');
  const [patterns, setPatterns] = useState(existing?.patterns || '');
  const [doNext, setDoNext] = useState(existing?.doNext || '');
  const [gratitude, setGratitude] = useState(existing?.gratitude || '');
  const [clarityScore, setClarityScore] = useState<number | undefined>(existing?.clarityScore);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const entry: WeeklyReflectionType = {
      id: existing?.id || generateId(),
      weekStartDate: weekStart,
      wentWell,
      wasDifficult,
      patterns,
      doNext,
      gratitude,
      clarityScore,
      createdAt: existing?.createdAt || nowISO(),
    };
    addReflection(entry);
    setSaved(true);
  };

  const textAreaClass = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none min-h-[80px]";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-24 pb-12 px-6">
      <SEO title="Weekly Reflection | Clarity Journal" description="Review your week and spot patterns." />
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8"><Breadcrumbs /></div>
        <button onClick={() => navigate('/tools/clarity-journal')} className="flex items-center gap-2 text-sm text-slate-500 dark:text-neutral-400 hover:text-teal-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </button>

        <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 dark:text-neutral-100 mb-1">Weekly Reflection</h1>
        <p className="text-slate-500 dark:text-neutral-400 mb-2">Step back. See the bigger picture.</p>
        <p className="text-sm text-slate-400 dark:text-neutral-500 mb-6">{formatDateRange(weekStart, weekEnd)}</p>

        {/* Week summary */}
        <WeekSummaryMini checkIns={weekCheckIns} />

        {saved ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-neutral-800 text-center">
            <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7" />
            </div>
            <h2 className="font-display font-semibold text-xl text-slate-900 dark:text-neutral-100 mb-2">Reflection saved.</h2>
            <p className="text-slate-500 dark:text-neutral-400 mb-6">Nice work looking back on your week.</p>
            <div className="flex justify-center gap-3">
              <Button variant="primary" onClick={() => navigate('/tools/clarity-journal')}>Back to Journal</Button>
              <Button variant="outline" onClick={() => setSaved(false)}>Edit</Button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-neutral-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-neutral-800 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">What went well this week?</label>
              <textarea value={wentWell} onChange={e => setWentWell(e.target.value)} placeholder="Even small things count." className={textAreaClass} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">What was difficult this week?</label>
              <textarea value={wasDifficult} onChange={e => setWasDifficult(e.target.value)} placeholder="No judgment — just noticing." className={textAreaClass} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">Did you notice any patterns in your mood, energy, or sleep?</label>
              <textarea value={patterns} onChange={e => setPatterns(e.target.value)} placeholder="Any connections between how you felt and what happened?" className={textAreaClass} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">Is there one thing you want to do differently next week?</label>
              <textarea value={doNext} onChange={e => setDoNext(e.target.value)} placeholder="One small change." className={textAreaClass} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">What is one thing you are grateful for, or one moment of clarity you experienced?</label>
              <textarea value={gratitude} onChange={e => setGratitude(e.target.value)} placeholder="" className={textAreaClass} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">Clarity Score (optional)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={clarityScore ?? ''}
                onChange={e => setClarityScore(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Enter your Clarity Score if you took the assessment"
                className="w-full sm:w-48 px-4 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <Button variant="primary" size="lg" onClick={handleSave} className="w-full">
              Save Reflection
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WeeklyReflection;
