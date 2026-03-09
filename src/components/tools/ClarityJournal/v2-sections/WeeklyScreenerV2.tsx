import React, { useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';
import ScreeningQuestion from '../components/ScreeningQuestion';
import ScoreIndicator from '../components/ScoreIndicator';
import DisclaimerBanner from '../components/DisclaimerBanner';
import type { WeeklyScreening } from '../types';
import {
  PHQ2_QUESTIONS, GAD2_QUESTIONS,
  FREQUENCY_OPTIONS,
  SCREENING_DISCLAIMER,
} from '../constants';
import { scorePHQ2, scoreGAD2, classifyPHQ2, classifyGAD2 } from '../scoring';
import { getToday, getWeekStart, generateId, nowISO } from '../dates';

interface WeeklyScreenerV2Props {
  onSave: (screening: WeeklyScreening) => void;
  onCrisisDetected: () => void;
}

const WeeklyScreenerV2: React.FC<WeeklyScreenerV2Props> = ({ onSave, onCrisisDetected }) => {
  const [phq1, setPhq1] = useState<number | null>(null);
  const [phq2, setPhq2] = useState<number | null>(null);
  const [gad1, setGad1] = useState<number | null>(null);
  const [gad2, setGad2] = useState<number | null>(null);

  // Safety check
  const [selfHarm, setSelfHarm] = useState<boolean | null>(null);
  const [suicidal, setSuicidal] = useState<boolean | null>(null);

  const [showResults, setShowResults] = useState(false);

  const screenerAnswered = [phq1, phq2, gad1, gad2].every(v => v !== null);
  const safetyAnswered = selfHarm !== null && suicidal !== null;
  const allAnswered = screenerAnswered && safetyAnswered;

  const handleSafetyResponse = (field: 'selfHarm' | 'suicidal', value: boolean) => {
    if (field === 'selfHarm') setSelfHarm(value);
    else setSuicidal(value);
    if (value) {
      onCrisisDetected();
    }
  };

  const handleSubmit = () => {
    if (!allAnswered) return;

    const phqTotal = scorePHQ2(phq1!, phq2!);
    const gadTotal = scoreGAD2(gad1!, gad2!);
    const crisisTriggered = selfHarm === true || suicidal === true;

    const entry: WeeklyScreening = {
      id: generateId(),
      weekStartDate: getWeekStart(getToday()),
      phq2: { q1: phq1!, q2: phq2!, total: phqTotal },
      gad2: { q1: gad1!, q2: gad2!, total: gadTotal },
      pss4: { q1: 0, q2: 0, total: 0 },
      who5: { q1: 0, q2: 0, total: 0 },
      safetyCheck: {
        selfHarmThoughts: selfHarm!,
        suicidalThoughts: suicidal!,
        crisisTriggered,
      },
      createdAt: nowISO(),
    };

    onSave(entry);
    setShowResults(true);
  };

  if (showResults && allAnswered) {
    const phqTotal = scorePHQ2(phq1!, phq2!);
    const gadTotal = scoreGAD2(gad1!, gad2!);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto mb-3">
            <Check className="w-7 h-7" />
          </div>
          <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">Your Scores This Week</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">These help you notice patterns, not diagnose anything.</p>
        </div>

        <div className="space-y-3">
          <ScoreIndicator label="Depression (PHQ-2)" score={phqTotal} maxScore={6} level={classifyPHQ2(phqTotal)} />
          <ScoreIndicator label="Anxiety (GAD-2)" score={gadTotal} maxScore={6} level={classifyGAD2(gadTotal)} />
        </div>

        {(classifyPHQ2(phqTotal) === 'elevated' || classifyGAD2(gadTotal) === 'elevated') && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-200">
            One or more of your scores is elevated this week. This might be a good time to talk to a mental health professional.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DisclaimerBanner text={SCREENING_DISCLAIMER} />

      {/* PHQ-2 */}
      <div>
        <h3 className="font-display font-semibold text-slate-800 dark:text-slate-200 mb-3">Depression Screen (PHQ-2)</h3>
        <ScreeningQuestion question={PHQ2_QUESTIONS[0]} options={FREQUENCY_OPTIONS} value={phq1} onChange={setPhq1} />
        <ScreeningQuestion question={PHQ2_QUESTIONS[1]} options={FREQUENCY_OPTIONS} value={phq2} onChange={setPhq2} />
      </div>

      <hr className="border-slate-100 dark:border-slate-800" />

      {/* GAD-2 */}
      <div>
        <h3 className="font-display font-semibold text-slate-800 dark:text-slate-200 mb-3">Anxiety Screen (GAD-2)</h3>
        <ScreeningQuestion question={GAD2_QUESTIONS[0]} options={FREQUENCY_OPTIONS} value={gad1} onChange={setGad1} />
        <ScreeningQuestion question={GAD2_QUESTIONS[1]} options={FREQUENCY_OPTIONS} value={gad2} onChange={setGad2} />
      </div>

      <hr className="border-slate-100 dark:border-slate-800" />

      {/* Safety Check */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <h3 className="font-display font-semibold text-slate-800 dark:text-slate-200">Safety Check</h3>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              In the past week, have you had thoughts of hurting yourself?
            </p>
            <div className="flex gap-2">
              {[{ value: false, label: 'No' }, { value: true, label: 'Yes' }].map(opt => (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => handleSafetyResponse('selfHarm', opt.value)}
                  className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                    selfHarm === opt.value
                      ? opt.value ? 'bg-red-500 text-white' : 'bg-teal-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              In the past week, have you had thoughts that you would be better off dead, or of hurting yourself in some way?
            </p>
            <div className="flex gap-2">
              {[{ value: false, label: 'No' }, { value: true, label: 'Yes' }].map(opt => (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => handleSafetyResponse('suicidal', opt.value)}
                  className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                    suicidal === opt.value
                      ? opt.value ? 'bg-red-500 text-white' : 'bg-teal-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button variant="primary" size="lg" onClick={handleSubmit} disabled={!allAnswered} className="w-full">
        See My Scores
      </Button>
    </div>
  );
};

export default WeeklyScreenerV2;
