import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import MoodSlider from '../components/MoodSlider';
import type { StressorEntry } from '../types';
import { generateId, nowISO } from '../dates';

const STRESSOR_CATEGORIES = [
  { value: 'work' as const, label: 'Work' },
  { value: 'relationship' as const, label: 'Relationship' },
  { value: 'health' as const, label: 'Health' },
  { value: 'financial' as const, label: 'Financial' },
  { value: 'family' as const, label: 'Family' },
  { value: 'social' as const, label: 'Social' },
  { value: 'academic' as const, label: 'Academic' },
  { value: 'other' as const, label: 'Other' },
];

interface StressorLogSectionProps {
  onSave: (stressor: StressorEntry) => void;
  existingStressors: StressorEntry[];
}

const StressorLogSection: React.FC<StressorLogSectionProps> = ({ onSave, existingStressors }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<StressorEntry['category']>('work');
  const [intensity, setIntensity] = useState(5);
  const [isRecurring, setIsRecurring] = useState(false);
  const [copingUsed, setCopingUsed] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!description.trim()) return;
    const stressor: StressorEntry = {
      id: generateId(),
      timestamp: nowISO(),
      description: description.trim(),
      category,
      intensity,
      isRecurring,
      copingUsed: copingUsed.trim() || undefined,
    };
    onSave(stressor);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setDescription('');
      setIntensity(5);
      setIsRecurring(false);
      setCopingUsed('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Existing stressors */}
      {existingStressors.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 space-y-2">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Today's stressors ({existingStressors.length})</p>
          {existingStressors.map(s => (
            <div key={s.id} className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 border border-slate-100 dark:border-slate-700">
              <span className="font-medium">{s.description}</span> — {s.category}, intensity {s.intensity}/10
            </div>
          ))}
        </div>
      )}

      {/* New stressor */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">What's stressing you?</label>
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Brief description..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
        <div className="flex flex-wrap gap-2">
          {STRESSOR_CATEGORIES.map(cat => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategory(cat.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                category === cat.value
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <MoodSlider value={intensity} onChange={setIntensity} label="How intense is this stressor?" />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsRecurring(!isRecurring)}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            isRecurring ? 'bg-teal-600 border-teal-600' : 'border-slate-300 dark:border-slate-600'
          }`}
          aria-label="Toggle recurring"
        >
          {isRecurring && <Check className="w-3 h-3 text-white" />}
        </button>
        <span className="text-sm text-slate-700 dark:text-slate-300">This is a recurring stressor</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          What did you do about it? <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={copingUsed}
          onChange={e => setCopingUsed(e.target.value)}
          placeholder="e.g., Talked to a friend, went for a walk..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <Button variant="primary" onClick={handleSave} className="w-full" disabled={!description.trim() || saved}>
        {saved ? <span className="flex items-center gap-2 justify-center"><Check className="w-4 h-4" /> Saved</span> : 'Log Stressor'}
      </Button>
    </div>
  );
};

export default StressorLogSection;
