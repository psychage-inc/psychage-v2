import React, { useState } from 'react';
import { Check } from 'lucide-react';
import MoodSlider from '../components/MoodSlider';
import EmotionPicker from './EmotionPicker';
import Button from '@/components/ui/Button';
import type { MoodCheckIn, EmotionEntry } from '../types';
import { generateId, nowISO } from '../dates';

interface MoodCheckInSectionProps {
  onSave: (checkIn: MoodCheckIn) => void;
  existingCheckIns: MoodCheckIn[];
}

const MoodCheckInSection: React.FC<MoodCheckInSectionProps> = ({ onSave, existingCheckIns }) => {
  const hour = new Date().getHours();
  const defaultTimeOfDay = hour < 12 ? 'morning' : hour < 18 ? 'anytime' : 'evening';

  const [mood, setMood] = useState(5);
  const [emotions, setEmotions] = useState<EmotionEntry[]>([]);
  const [energy, setEnergy] = useState(5);
  const [note, setNote] = useState('');
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'evening' | 'anytime'>(defaultTimeOfDay);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const checkIn: MoodCheckIn = {
      id: generateId(),
      timestamp: nowISO(),
      timeOfDay,
      overallMood: mood,
      emotions,
      energyLevel: energy,
      note: note.trim() || undefined,
    };
    onSave(checkIn);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setMood(5);
      setEmotions([]);
      setEnergy(5);
      setNote('');
    }, 2000);
  };

  const timeOptions = [
    { value: 'morning' as const, label: 'Morning', prompt: 'How are you starting your day?' },
    { value: 'anytime' as const, label: 'Midday', prompt: 'How are you doing right now?' },
    { value: 'evening' as const, label: 'Evening', prompt: 'How are you ending your day?' },
  ];

  const currentPrompt = timeOptions.find(t => t.value === timeOfDay)?.prompt || 'How are you feeling?';

  return (
    <div className="space-y-6">
      {/* Time of day selector */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">When</label>
        <div className="flex gap-2">
          {timeOptions.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTimeOfDay(opt.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                timeOfDay === opt.value
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mood slider */}
      <MoodSlider value={mood} onChange={setMood} label={currentPrompt} />

      {/* Emotion picker */}
      <EmotionPicker selected={emotions} onChange={setEmotions} />

      {/* Energy level */}
      <MoodSlider value={energy} onChange={setEnergy} label="Energy level" />

      {/* Quick note */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">
          Quick note <span className="text-slate-400 dark:text-neutral-500 font-normal">(optional)</span>
        </label>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value.slice(0, 500))}
          placeholder="Anything on your mind..."
          rows={2}
          maxLength={500}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
        />
        <p className="text-xs text-slate-400 dark:text-neutral-500 mt-1 text-right">{note.length}/500</p>
      </div>

      {/* Previous check-ins today */}
      {existingCheckIns.length > 0 && (
        <div className="bg-slate-50 dark:bg-neutral-800/50 rounded-xl p-3">
          <p className="text-xs font-medium text-slate-500 dark:text-neutral-400 mb-2">
            Earlier today ({existingCheckIns.length} check-in{existingCheckIns.length > 1 ? 's' : ''})
          </p>
          <div className="flex gap-2">
            {existingCheckIns.map(ci => (
              <div key={ci.id} className="bg-white dark:bg-neutral-900 rounded-lg px-3 py-1.5 text-xs text-slate-600 dark:text-neutral-400 border border-slate-100 dark:border-neutral-700">
                {ci.timeOfDay} — mood {ci.overallMood}/10
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save */}
      <Button
        variant="primary"
        onClick={handleSave}
        className="w-full"
        disabled={saved}
      >
        {saved ? (
          <span className="flex items-center gap-2 justify-center">
            <Check className="w-4 h-4" /> Saved
          </span>
        ) : (
          'Save Check-In'
        )}
      </Button>
    </div>
  );
};

export default MoodCheckInSection;
