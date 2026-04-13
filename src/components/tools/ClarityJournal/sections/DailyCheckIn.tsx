 
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import MoodSlider from '../components/MoodSlider';
import StreakTracker from '../components/StreakTracker';
import { useClarityJournal } from '../hooks/useClarityJournal';
import { DAILY_TAGS, SLEEP_QUALITY_OPTIONS } from '../constants';
import { getToday, isToday, isFuture, generateId, nowISO, formatDate } from '../dates';
import type { DailyCheckIn as DailyCheckInType } from '../types';

const DailyCheckIn: React.FC = () => {
  const navigate = useNavigate();
  const { addCheckIn, streak, data } = useClarityJournal();

  const [date, setDate] = useState(getToday());
  const [mood, setMood] = useState(5);
  const [sleepHours, setSleepHours] = useState(7);
  const [sleepQuality, setSleepQuality] = useState<DailyCheckInType['sleepQuality']>('good');
  const [energy, setEnergy] = useState(5);
  const [oneSentence, setOneSentence] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const justSaved = useRef(false);

  // Load existing entry for selected date
  useEffect(() => {
    // Skip resetting form right after a save — the data change from addCheckIn
    // would otherwise immediately reset `saved` and flash away the success screen
    if (justSaved.current) {
      justSaved.current = false;
      return;
    }
    const existing = data.dailyCheckIns.find(e => e.date === date);
    if (existing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMood(existing.mood);
      setSleepHours(existing.sleepHours);
      setSleepQuality(existing.sleepQuality);
      setEnergy(existing.energy);
      setOneSentence(existing.oneSentence);
      setTags(existing.tags);
    } else {
      setMood(5);
      setSleepHours(7);
      setSleepQuality('good');
      setEnergy(5);
      setOneSentence('');
      setTags([]);
    }
    setSaved(false);
  }, [date, data.dailyCheckIns]);

  const toggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleSave = () => {
    if (isFuture(date)) return;

    const entry: DailyCheckInType = {
      id: generateId(),
      date,
      mood,
      sleepHours,
      sleepQuality,
      energy,
      oneSentence,
      tags,
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    justSaved.current = true;
    addCheckIn(entry);
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <SEO title="Daily Check-In | Clarity Journal" description="Track your mood, sleep, and energy daily." />
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <Breadcrumbs />
        </div>

        <button
          onClick={() => navigate('/tools/clarity-journal')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Daily Check-In</h1>
            <p className="text-slate-500 mt-1">The weather check for your mind.</p>
          </div>
          <StreakTracker streak={streak} />
        </div>

        {saved ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="font-display font-semibold text-xl text-slate-900 mb-2">Noted.</h2>
            <p className="text-slate-500 mb-6">
              {isToday(date) ? 'See you tomorrow.' : `Entry saved for ${formatDate(date)}.`}
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="primary" onClick={() => navigate('/tools/clarity-journal')}>
                Back to Journal
              </Button>
              <Button variant="outline" onClick={() => setSaved(false)}>
                Edit Entry
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-8"
          >
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
              <input
                type="date"
                value={date}
                max={getToday()}
                onChange={e => setDate(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Mood */}
            <MoodSlider value={mood} onChange={setMood} label="How would you rate your overall mood today?" />

            {/* Sleep */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Hours of sleep</label>
                <input
                  type="number"
                  min={0}
                  max={24}
                  step={0.5}
                  value={sleepHours}
                  onChange={e => setSleepHours(Math.min(24, Math.max(0, Number(e.target.value))))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label="Hours of sleep"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sleep quality</label>
                <div className="flex gap-2">
                  {SLEEP_QUALITY_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSleepQuality(opt.value)}
                      aria-pressed={sleepQuality === opt.value}
                      className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        sleepQuality === opt.value
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Energy */}
            <MoodSlider value={energy} onChange={setEnergy} label="How is your energy level today?" />

            {/* One Sentence */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">In one sentence, how are you today?</label>
              <input
                type="text"
                value={oneSentence}
                onChange={e => setOneSentence(e.target.value)}
                placeholder="Tired but okay. / I don't know. / Feeling hopeful."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">How would you describe today? (optional)</label>
              <div className="flex flex-wrap gap-2">
                {DAILY_TAGS.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      tags.includes(tag)
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Save */}
            <Button variant="primary" size="lg" onClick={handleSave} className="w-full">
              Save Check-In
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DailyCheckIn;
