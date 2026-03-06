import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import ScreeningQuestion from '../components/ScreeningQuestion';
import ScoreIndicator from '../components/ScoreIndicator';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { useClarityJournal } from '../hooks/useClarityJournal';
import {
  PHQ2_QUESTIONS, GAD2_QUESTIONS, PSS4_QUESTIONS, WHO5_QUESTIONS,
  FREQUENCY_OPTIONS, STRESS_OPTIONS, WELLBEING_OPTIONS,
  SCREENING_DISCLAIMER,
} from '../constants';
import { scorePHQ2, scoreGAD2, scorePSS4, scoreWHO5, classifyPHQ2, classifyGAD2, classifyPSS4, classifyWHO5 } from '../scoring';
import { getToday, getWeekStart, generateId, nowISO } from '../dates';
import type { WeeklyScreening as WeeklyScreeningType } from '../types';

const WeeklyScreening: React.FC = () => {
  const navigate = useNavigate();
  const { addScreening } = useClarityJournal();

  const [phq1, setPhq1] = useState<number | null>(null);
  const [phq2, setPhq2] = useState<number | null>(null);
  const [gad1, setGad1] = useState<number | null>(null);
  const [gad2, setGad2] = useState<number | null>(null);
  const [pss1, setPss1] = useState<number | null>(null);
  const [pss2, setPss2] = useState<number | null>(null);
  const [who1, setWho1] = useState<number | null>(null);
  const [who2, setWho2] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const allAnswered = [phq1, phq2, gad1, gad2, pss1, pss2, who1, who2].every(v => v !== null);

  const handleSubmit = () => {
    if (!allAnswered) return;

    const phqTotal = scorePHQ2(phq1!, phq2!);
    const gadTotal = scoreGAD2(gad1!, gad2!);
    const pssTotal = scorePSS4(pss1!, pss2!);
    const whoTotal = scoreWHO5(who1!, who2!);

    const entry: WeeklyScreeningType = {
      id: generateId(),
      weekStartDate: getWeekStart(getToday()),
      phq2: { q1: phq1!, q2: phq2!, total: phqTotal },
      gad2: { q1: gad1!, q2: gad2!, total: gadTotal },
      pss4: { q1: pss1!, q2: pss2!, total: pssTotal },
      who5: { q1: who1!, q2: who2!, total: whoTotal },
      createdAt: nowISO(),
    };

    addScreening(entry);
    setShowResults(true);
  };

  if (showResults && allAnswered) {
    const phqTotal = scorePHQ2(phq1!, phq2!);
    const gadTotal = scoreGAD2(gad1!, gad2!);
    const pssTotal = scorePSS4(pss1!, pss2!);
    const whoTotal = scoreWHO5(who1!, who2!);

    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
        <SEO title="Screening Results | Clarity Journal" description="Your weekly screening results." />
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8"><Breadcrumbs /></div>
          <button onClick={() => navigate('/tools/clarity-journal')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </button>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-3">
                <Check className="w-7 h-7" />
              </div>
              <h2 className="font-display font-semibold text-xl text-slate-900">Your Scores This Week</h2>
              <p className="text-sm text-slate-500 mt-1">Remember: these help you notice patterns, not diagnose anything.</p>
            </div>

            <div className="space-y-3 mb-8">
              <ScoreIndicator label="Depression (PHQ-2)" score={phqTotal} maxScore={6} level={classifyPHQ2(phqTotal)} />
              <ScoreIndicator label="Anxiety (GAD-2)" score={gadTotal} maxScore={6} level={classifyGAD2(gadTotal)} />
              <ScoreIndicator label="Stress (PSS-4)" score={pssTotal} maxScore={8} level={classifyPSS4(pssTotal)} />
              <ScoreIndicator label="Well-being (WHO-5)" score={whoTotal} maxScore={10} level={classifyWHO5(whoTotal)} invertedDescription />
            </div>

            {(classifyPHQ2(phqTotal) === 'elevated' || classifyGAD2(gadTotal) === 'elevated') && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
                One or more of your scores is elevated this week. This might be a good time to talk to a mental health professional.{' '}
                <a href="/providers" className="underline font-medium">Find a provider</a> or visit{' '}
                <a href="/crisis" className="underline font-medium">crisis resources</a>.
              </div>
            )}

            <Button variant="primary" className="w-full" onClick={() => navigate('/tools/clarity-journal')}>
              Back to Journal
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <SEO title="Weekly Screening | Clarity Journal" description="Brief validated screening for depression, anxiety, stress, and well-being." />
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8"><Breadcrumbs /></div>
        <button onClick={() => navigate('/tools/clarity-journal')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </button>

        <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-2">Weekly Screening Snapshot</h1>
        <p className="text-slate-500 mb-6">A quick pulse check, backed by research.</p>

        <DisclaimerBanner text={SCREENING_DISCLAIMER} />

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-8">
          {/* PHQ-2 */}
          <div>
            <h2 className="font-display font-semibold text-slate-800 mb-4">Depression Screen (PHQ-2)</h2>
            <ScreeningQuestion question={PHQ2_QUESTIONS[0]} options={FREQUENCY_OPTIONS} value={phq1} onChange={setPhq1} />
            <ScreeningQuestion question={PHQ2_QUESTIONS[1]} options={FREQUENCY_OPTIONS} value={phq2} onChange={setPhq2} />
          </div>

          <hr className="border-slate-100" />

          {/* GAD-2 */}
          <div>
            <h2 className="font-display font-semibold text-slate-800 mb-4">Anxiety Screen (GAD-2)</h2>
            <ScreeningQuestion question={GAD2_QUESTIONS[0]} options={FREQUENCY_OPTIONS} value={gad1} onChange={setGad1} />
            <ScreeningQuestion question={GAD2_QUESTIONS[1]} options={FREQUENCY_OPTIONS} value={gad2} onChange={setGad2} />
          </div>

          <hr className="border-slate-100" />

          {/* PSS-4 */}
          <div>
            <h2 className="font-display font-semibold text-slate-800 mb-4">Stress Check (PSS-4)</h2>
            <ScreeningQuestion question={PSS4_QUESTIONS[0]} options={STRESS_OPTIONS} value={pss1} onChange={setPss1} />
            <ScreeningQuestion question={PSS4_QUESTIONS[1]} options={STRESS_OPTIONS} value={pss2} onChange={setPss2} />
          </div>

          <hr className="border-slate-100" />

          {/* WHO-5 */}
          <div>
            <h2 className="font-display font-semibold text-slate-800 mb-4">Well-being Check (WHO-5)</h2>
            <ScreeningQuestion question={WHO5_QUESTIONS[0]} options={WELLBEING_OPTIONS} value={who1} onChange={setWho1} />
            <ScreeningQuestion question={WHO5_QUESTIONS[1]} options={WELLBEING_OPTIONS} value={who2} onChange={setWho2} />
          </div>

          <Button variant="primary" size="lg" onClick={handleSubmit} disabled={!allAnswered} className="w-full">
            See My Scores
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyScreening;
