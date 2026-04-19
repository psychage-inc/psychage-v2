/**
 * Morning Check-In — Multi-step sleep diary entry wizard.
 * Designed to feel like a 30-second ritual, not a medical form.
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Moon,
  Sun,
  Clock,
  Coffee,
  Dumbbell,
  Pill,
  Smartphone,
  Wine,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SleepEntry, SubstanceLog } from '@/lib/sleep/types';

interface MorningCheckInProps {
  initialDate?: string;
  existingEntry?: SleepEntry | null;
  onSave: (entry: SleepEntry) => void;
  onClose: () => void;
}

const STEPS = [
  { label: 'Sleep Times', icon: Moon },
  { label: 'Sleep Quality', icon: Clock },
  { label: 'Rating', icon: Sparkles },
  { label: 'Habits', icon: Coffee },
  { label: 'Notes', icon: Sun },
];

const QUALITY_EMOJIS = ['😫', '😕', '😐', '🙂', '😴'];
const MOOD_EMOJIS = ['😩', '😔', '😐', '🙂', '😊'];

const MorningCheckIn: React.FC<MorningCheckInProps> = ({
  initialDate,
  existingEntry,
  onSave,
  onClose,
}) => {
  const [step, setStep] = useState(0);
  const today = initialDate || new Date().toISOString().split('T')[0];

  // Form state
  const [bedtime, setBedtime] = useState(existingEntry?.bedtime || '23:00');
  const [lightsOut, setLightsOut] = useState(existingEntry?.lights_out || '23:15');
  const [wakeTime, setWakeTime] = useState(existingEntry?.wake_time || '07:00');
  const [outOfBed, setOutOfBed] = useState(existingEntry?.out_of_bed_time || '07:15');
  const [onsetMinutes, setOnsetMinutes] = useState(existingEntry?.sleep_onset_minutes || 15);
  const [nightWakings, setNightWakings] = useState(existingEntry?.night_wakings || 0);
  const [wakingDuration, setWakingDuration] = useState(existingEntry?.night_waking_duration_minutes || 0);
  const [quality, setQuality] = useState<1 | 2 | 3 | 4 | 5>(existingEntry?.sleep_quality || 3);
  const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5>(existingEntry?.morning_mood || 3);
  const [dreamRecall, setDreamRecall] = useState(existingEntry?.dream_recall || false);
  const [dreamNotes, setDreamNotes] = useState(existingEntry?.dream_notes || '');
  const [notes, setNotes] = useState(existingEntry?.notes || '');

  // Substances
  const [caffeine, setCaffeine] = useState(existingEntry?.substances.caffeine_last_time || '');
  const [alcohol, setAlcohol] = useState(existingEntry?.substances.alcohol || false);
  const [exercise, setExercise] = useState(existingEntry?.substances.exercise || false);
  const [screens, setScreens] = useState(existingEntry?.substances.screens_before_bed_minutes || 0);
  const [medication, setMedication] = useState(existingEntry?.substances.medication_sleep_aid || false);

  const handleSave = useCallback(() => {
    const substances: SubstanceLog = {
      caffeine_last_time: caffeine || undefined,
      alcohol,
      screens_before_bed_minutes: screens || undefined,
      exercise,
      medication_sleep_aid: medication,
    };

    const entry: SleepEntry = {
      id: existingEntry?.id || crypto.randomUUID(),
      date: today,
      bedtime,
      lights_out: lightsOut,
      sleep_onset_minutes: onsetMinutes,
      wake_time: wakeTime,
      out_of_bed_time: outOfBed,
      night_wakings: nightWakings,
      night_waking_duration_minutes: wakingDuration,
      sleep_quality: quality,
      morning_mood: mood,
      dream_recall: dreamRecall,
      dream_notes: dreamRecall ? dreamNotes : undefined,
      naps: existingEntry?.naps || [],
      substances,
      notes: notes || undefined,
      created_at: existingEntry?.created_at || new Date().toISOString(),
    };

    onSave(entry);
  }, [
    today, bedtime, lightsOut, onsetMinutes, wakeTime, outOfBed,
    nightWakings, wakingDuration, quality, mood, dreamRecall, dreamNotes,
    notes, caffeine, alcohol, exercise, screens, medication, existingEntry, onSave,
  ]);

  const canProceed = step < STEPS.length - 1;
  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-[2rem] p-6 md:p-8 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-neutral-700 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[80px] rounded-full" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
              Morning Check-In
            </h3>
            <p className="text-xs text-gray-500 dark:text-neutral-400">{today}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-200 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {STEPS.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setStep(i)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all',
                i === step
                  ? 'bg-indigo-600 dark:bg-indigo-400 w-6'
                  : i < step
                    ? 'bg-indigo-300 dark:bg-indigo-700'
                    : 'bg-gray-200 dark:bg-neutral-600'
              )}
              aria-label={`Step ${i + 1}: ${s.label}`}
            />
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="min-h-[280px]"
          >
            {/* Step 0: Sleep Times */}
            {step === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700 dark:text-neutral-300 block mb-1.5">
                      Bedtime
                    </label>
                    <input
                      type="time"
                      value={bedtime}
                      onChange={(e) => setBedtime(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none font-display font-bold text-lg"
                    />
                    <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-1">
                      When you got into bed
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 dark:text-neutral-300 block mb-1.5">
                      Lights Out
                    </label>
                    <input
                      type="time"
                      value={lightsOut}
                      onChange={(e) => setLightsOut(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none font-display font-bold text-lg"
                    />
                    <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-1">
                      When you tried to sleep
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700 dark:text-neutral-300 block mb-1.5">
                      Wake Time
                    </label>
                    <input
                      type="time"
                      value={wakeTime}
                      onChange={(e) => setWakeTime(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none font-display font-bold text-lg"
                    />
                    <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-1">
                      First woke up
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 dark:text-neutral-300 block mb-1.5">
                      Out of Bed
                    </label>
                    <input
                      type="time"
                      value={outOfBed}
                      onChange={(e) => setOutOfBed(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none font-display font-bold text-lg"
                    />
                    <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-1">
                      Actually got up
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Sleep Onset & Wakings */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-bold text-gray-700 dark:text-neutral-300 block mb-2">
                    Time to fall asleep
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={90}
                    step={5}
                    value={onsetMinutes}
                    onChange={(e) => setOnsetMinutes(parseInt(e.target.value))}
                    aria-label={`Time to fall asleep: ${onsetMinutes} minutes`}
                    className="w-full accent-indigo-600 dark:accent-indigo-400"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 dark:text-neutral-500 mt-1">
                    <span>0 min</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                      {onsetMinutes} min
                    </span>
                    <span>90 min</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700 dark:text-neutral-300 block mb-1.5">
                      Night Wakings
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setNightWakings(Math.max(0, nightWakings - 1))}
                        className="w-10 h-10 rounded-xl border border-gray-200 dark:border-neutral-600 flex items-center justify-center text-gray-500 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-700"
                      >
                        -
                      </button>
                      <span className="text-xl font-bold font-display text-gray-900 dark:text-white w-8 text-center">
                        {nightWakings}
                      </span>
                      <button
                        type="button"
                        onClick={() => setNightWakings(nightWakings + 1)}
                        className="w-10 h-10 rounded-xl border border-gray-200 dark:border-neutral-600 flex items-center justify-center text-gray-500 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {nightWakings > 0 && (
                    <div>
                      <label className="text-sm font-bold text-gray-700 dark:text-neutral-300 block mb-1.5">
                        Total awake (min)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={240}
                        step={5}
                        value={wakingDuration}
                        onChange={(e) => setWakingDuration(parseInt(e.target.value) || 0)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Quality & Mood Rating */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-gray-700 dark:text-neutral-300 block mb-3">
                    How did you sleep?
                  </label>
                  <div className="flex justify-center gap-3">
                    {QUALITY_EMOJIS.map((emoji, i) => {
                      const val = (i + 1) as 1 | 2 | 3 | 4 | 5;
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setQuality(val)}
                          className={cn(
                            'w-14 h-14 rounded-2xl text-2xl flex items-center justify-center transition-all border-2',
                            quality === val
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 scale-110'
                              : 'border-gray-200 dark:border-neutral-600 hover:border-gray-300 dark:hover:border-neutral-500'
                          )}
                          aria-label={`Quality ${val} of 5`}
                        >
                          {emoji}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 dark:text-neutral-300 block mb-3">
                    How do you feel this morning?
                  </label>
                  <div className="flex justify-center gap-3">
                    {MOOD_EMOJIS.map((emoji, i) => {
                      const val = (i + 1) as 1 | 2 | 3 | 4 | 5;
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setMood(val)}
                          className={cn(
                            'w-14 h-14 rounded-2xl text-2xl flex items-center justify-center transition-all border-2',
                            mood === val
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 scale-110'
                              : 'border-gray-200 dark:border-neutral-600 hover:border-gray-300 dark:hover:border-neutral-500'
                          )}
                          aria-label={`Mood ${val} of 5`}
                        >
                          {emoji}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Substances & Habits */}
            {step === 3 && (
              <div className="space-y-3">
                <ToggleItem
                  icon={<Coffee size={16} />}
                  label="Had caffeine"
                  active={!!caffeine}
                  onToggle={() => setCaffeine(caffeine ? '' : '14:00')}
                />
                {caffeine && (
                  <div className="ml-9">
                    <label className="text-[10px] text-gray-500 dark:text-neutral-400 block mb-1">
                      Last caffeine at
                    </label>
                    <input
                      type="time"
                      value={caffeine}
                      onChange={(e) => setCaffeine(e.target.value)}
                      className="w-32 p-2 rounded-lg border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-sm outline-none"
                    />
                  </div>
                )}
                <ToggleItem
                  icon={<Wine size={16} />}
                  label="Had alcohol"
                  active={alcohol}
                  onToggle={() => setAlcohol(!alcohol)}
                />
                <ToggleItem
                  icon={<Dumbbell size={16} />}
                  label="Exercised"
                  active={exercise}
                  onToggle={() => setExercise(!exercise)}
                />
                <ToggleItem
                  icon={<Pill size={16} />}
                  label="Sleep medication"
                  active={medication}
                  onToggle={() => setMedication(!medication)}
                />
                <div>
                  <label className="text-sm font-bold text-gray-700 dark:text-neutral-300 flex items-center gap-2 mb-2">
                    <Smartphone size={16} className="text-gray-400 dark:text-neutral-500" />
                    Screen time before bed
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={120}
                    step={10}
                    value={screens}
                    onChange={(e) => setScreens(parseInt(e.target.value))}
                    aria-label={`Screen time before bed: ${screens} minutes`}
                    className="w-full accent-indigo-600 dark:accent-indigo-400"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 dark:text-neutral-500 mt-0.5">
                    <span>None</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                      {screens} min
                    </span>
                    <span>2 hours</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Notes */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-700 dark:text-neutral-300 block mb-1.5">
                    Notes (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Anything notable about last night's sleep..."
                    aria-label="Sleep notes"
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none h-24"
                  />
                </div>
                <div>
                  <ToggleItem
                    icon={<Sparkles size={16} />}
                    label="Remember any dreams?"
                    active={dreamRecall}
                    onToggle={() => setDreamRecall(!dreamRecall)}
                  />
                  {dreamRecall && (
                    <textarea
                      value={dreamNotes}
                      onChange={(e) => setDreamNotes(e.target.value)}
                      placeholder="Describe your dream..."
                      aria-label="Dream notes"
                      className="w-full mt-2 p-3 rounded-xl border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none h-20"
                    />
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-neutral-700">
          <button
            type="button"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className={cn(
              'flex items-center gap-1.5 text-sm font-bold transition-colors',
              step === 0
                ? 'text-gray-300 dark:text-neutral-600 cursor-not-allowed'
                : 'text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200'
            )}
          >
            <ChevronLeft size={16} />
            Back
          </button>

          {isLastStep ? (
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors"
            >
              <Check size={16} />
              Save Entry
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
            >
              Next
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Toggle item sub-component
const ToggleItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onToggle: () => void;
}> = ({ icon, label, active, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className={cn(
      'w-full p-3 rounded-xl flex items-center gap-3 transition-all text-sm border',
      active
        ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
        : 'bg-gray-50 dark:bg-neutral-700/50 border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700'
    )}
    role="checkbox"
    aria-checked={active}
  >
    <div
      className={cn(
        'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0',
        active
          ? 'border-indigo-500 bg-indigo-500'
          : 'border-gray-300 dark:border-neutral-500'
      )}
    >
      {active && <Check size={10} className="text-white" />}
    </div>
    <span className="flex items-center gap-2 font-medium">
      {icon}
      {label}
    </span>
  </button>
);

export default MorningCheckIn;
