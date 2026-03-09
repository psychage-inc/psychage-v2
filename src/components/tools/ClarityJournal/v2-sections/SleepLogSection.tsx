import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import MoodSlider from '../components/MoodSlider';
import type { SleepEntry } from '../types';
import { generateId } from '../dates';

const SLEEP_FACTORS = [
  { id: 'caffeine', label: 'Caffeine', emoji: '☕' },
  { id: 'screen', label: 'Screen time', emoji: '📱' },
  { id: 'exercise', label: 'Exercise', emoji: '🏃' },
  { id: 'stress', label: 'Stress', emoji: '😰' },
  { id: 'alcohol', label: 'Alcohol', emoji: '🍷' },
  { id: 'medication', label: 'Medication', emoji: '💊' },
];

interface SleepLogSectionProps {
  date: string;
  onSave: (entry: SleepEntry) => void;
  existing?: SleepEntry;
}

const SleepLogSection: React.FC<SleepLogSectionProps> = ({ date, onSave, existing }) => {
  const [bedtime, setBedtime] = useState(existing?.bedtime || '23:00');
  const [wakeTime, setWakeTime] = useState(existing?.wakeTime || '07:00');
  const [quality, setQuality] = useState(existing?.sleepQuality || 5);
  const [minutesToSleep, setMinutesToSleep] = useState<string>(existing?.minutesToFallAsleep?.toString() || '');
  const [wakings, setWakings] = useState<string>(existing?.nightWakings?.toString() || '');
  const [factors, setFactors] = useState<string[]>(existing?.factors || []);
  const [note, setNote] = useState(existing?.note || '');
  const [saved, setSaved] = useState(false);

  const toggleFactor = (id: string) => {
    setFactors(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  // Calculate duration
  const calcDuration = (): string => {
    const [bh, bm] = bedtime.split(':').map(Number);
    const [wh, wm] = wakeTime.split(':').map(Number);
    let bedMin = bh * 60 + bm;
    let wakeMin = wh * 60 + wm;
    if (wakeMin <= bedMin) wakeMin += 24 * 60;
    const total = wakeMin - bedMin;
    const hours = Math.floor(total / 60);
    const mins = total % 60;
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
  };

  const handleSave = () => {
    const entry: SleepEntry = {
      id: existing?.id || generateId(),
      date,
      bedtime,
      wakeTime,
      sleepQuality: quality,
      minutesToFallAsleep: minutesToSleep ? Number(minutesToSleep) : undefined,
      nightWakings: wakings ? Number(wakings) : undefined,
      factors: factors.length > 0 ? factors : undefined,
      note: note.trim() || undefined,
    };
    onSave(entry);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500 dark:text-slate-400">Log last night's sleep</p>

      {/* Bedtime & Wake time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Bedtime</label>
          <input
            type="time"
            value={bedtime}
            onChange={e => setBedtime(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Wake time</label>
          <input
            type="time"
            value={wakeTime}
            onChange={e => setWakeTime(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
      <p className="text-xs text-teal-600 dark:text-teal-400 font-medium -mt-3">
        Duration: {calcDuration()}
      </p>

      {/* Sleep quality */}
      <MoodSlider value={quality} onChange={setQuality} label="Sleep quality" />

      {/* Optional details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Minutes to fall asleep <span className="text-slate-400 font-normal">(opt.)</span>
          </label>
          <input
            type="number"
            min={0}
            max={180}
            value={minutesToSleep}
            onChange={e => setMinutesToSleep(e.target.value)}
            placeholder="e.g., 20"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Night wakings <span className="text-slate-400 font-normal">(opt.)</span>
          </label>
          <input
            type="number"
            min={0}
            max={20}
            value={wakings}
            onChange={e => setWakings(e.target.value)}
            placeholder="e.g., 2"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Contributing factors */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Contributing factors</label>
        <div className="flex flex-wrap gap-2">
          {SLEEP_FACTORS.map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => toggleFactor(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                factors.includes(f.id)
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {f.emoji} {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Note */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Note <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="e.g., Vivid dreams, woke up early..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <Button variant="primary" onClick={handleSave} className="w-full" disabled={saved}>
        {saved ? <span className="flex items-center gap-2 justify-center"><Check className="w-4 h-4" /> Saved</span> : 'Save Sleep Log'}
      </Button>
    </div>
  );
};

export default SleepLogSection;
