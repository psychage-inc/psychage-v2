import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import MoodSlider from '../components/MoodSlider';
import type { CopingUseEntry } from '../types';
import { generateId, nowISO } from '../dates';

const COPING_TOOLS = [
  { value: 'breathwork', label: 'Breathwork', emoji: '🌬️' },
  { value: 'grounding', label: 'Grounding', emoji: '🌿' },
  { value: 'cognitive-restructuring', label: 'Cognitive Restructuring', emoji: '💡' },
  { value: 'journaling', label: 'Journaling', emoji: '📝' },
  { value: 'exercise', label: 'Exercise', emoji: '🏃' },
  { value: 'social-support', label: 'Social Support', emoji: '💬' },
  { value: 'medication', label: 'Medication', emoji: '💊' },
  { value: 'other', label: 'Other', emoji: '🔧' },
];

interface CopingUseSectionProps {
  onSave: (entry: CopingUseEntry) => void;
  existingUses: CopingUseEntry[];
}

const CopingUseSection: React.FC<CopingUseSectionProps> = ({ onSave, existingUses }) => {
  const [tool, setTool] = useState('breathwork');
  const [distressBefore, setDistressBefore] = useState(7);
  const [distressAfter, setDistressAfter] = useState(4);
  const [helpful, setHelpful] = useState(true);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const entry: CopingUseEntry = {
      id: generateId(),
      timestamp: nowISO(),
      tool,
      distressBefore,
      distressAfter,
      helpful,
      note: note.trim() || undefined,
    };
    onSave(entry);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setDistressBefore(7);
      setDistressAfter(4);
      setNote('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Existing uses */}
      {existingUses.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 space-y-2">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Today's coping ({existingUses.length})</p>
          {existingUses.map(u => {
            const t = COPING_TOOLS.find(ct => ct.value === u.tool);
            const reduction = u.distressBefore - u.distressAfter;
            return (
              <div key={u.id} className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span>{t?.emoji} {t?.label || u.tool}</span>
                <span className={reduction > 0 ? 'text-green-600' : 'text-slate-400'}>
                  {reduction > 0 ? `↓${reduction}` : '→0'} distress
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Tool selection */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">What did you use?</label>
        <div className="grid grid-cols-2 gap-2">
          {COPING_TOOLS.map(ct => (
            <button
              key={ct.value}
              type="button"
              onClick={() => setTool(ct.value)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                tool === ct.value
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <span>{ct.emoji}</span> {ct.label}
            </button>
          ))}
        </div>
      </div>

      <MoodSlider value={distressBefore} onChange={setDistressBefore} label="Distress before (1 = low, 10 = high)" />
      <MoodSlider value={distressAfter} onChange={setDistressAfter} label="Distress after" />

      {/* Helpful toggle */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Was this helpful?</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setHelpful(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              helpful ? 'bg-green-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setHelpful(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              !helpful ? 'bg-red-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            No
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Note <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Any reflections..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <Button variant="primary" onClick={handleSave} className="w-full" disabled={saved}>
        {saved ? <span className="flex items-center gap-2 justify-center"><Check className="w-4 h-4" /> Saved</span> : 'Log Coping Tool'}
      </Button>
    </div>
  );
};

export default CopingUseSection;
