import React, { useState } from 'react';
import { Check, Shuffle } from 'lucide-react';
import Button from '@/components/ui/Button';
import type { FreeFormEntry } from '../types';
import { generateId, nowISO } from '../dates';
import { getDailyPrompt, getRandomPrompt } from '../data/prompts';
import { scanForCrisisKeywords } from '@/lib/safety/crisisKeywords';

interface FreeFormSectionProps {
  onSave: (entry: FreeFormEntry) => void;
  onCrisisDetected: () => void;
  showPrompts: boolean;
}

const FreeFormSection: React.FC<FreeFormSectionProps> = ({ onSave, onCrisisDetected, showPrompts }) => {
  const [prompt, setPrompt] = useState(showPrompts ? getDailyPrompt() : null);
  const [content, setContent] = useState('');
  const [includeInReport, setIncludeInReport] = useState(false);
  const [saved, setSaved] = useState(false);

  const shufflePrompt = () => {
    setPrompt(getRandomPrompt());
  };

  const handleContentChange = (text: string) => {
    setContent(text);
    // Crisis keyword detection
    if (text.length > 10) {
      const result = scanForCrisisKeywords(text);
      if (result.detected) {
        onCrisisDetected();
      }
    }
  };

  const handleSave = () => {
    if (!content.trim()) return;
    const entry: FreeFormEntry = {
      id: generateId(),
      timestamp: nowISO(),
      content: content.trim(),
      prompt: prompt?.text,
      includeInReport,
    };
    onSave(entry);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setContent('');
      setIncludeInReport(false);
    }, 2000);
  };

  return (
    <div className="space-y-5">
      {/* Guided prompt */}
      {prompt && showPrompts && (
        <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-teal-600 dark:text-teal-400 mb-1 uppercase tracking-wide">{prompt.category}</p>
              <p className="text-sm text-teal-800 dark:text-teal-200 font-medium">{prompt.text}</p>
            </div>
            <button
              type="button"
              onClick={shufflePrompt}
              className="p-1.5 rounded-lg text-teal-500 hover:bg-teal-100 dark:hover:bg-teal-800/50 transition-colors shrink-0"
              aria-label="Get a different prompt"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Text area */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Write freely
        </label>
        <textarea
          value={content}
          onChange={e => handleContentChange(e.target.value)}
          placeholder="What's on your mind..."
          rows={6}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y min-h-[120px]"
        />
        <p className="text-xs text-slate-400 mt-1">{content.length} characters</p>
      </div>

      {/* Include in report toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIncludeInReport(!includeInReport)}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            includeInReport ? 'bg-teal-600 border-teal-600' : 'border-slate-300 dark:border-slate-600'
          }`}
          aria-label="Toggle include in therapist report"
        >
          {includeInReport && <Check className="w-3 h-3 text-white" />}
        </button>
        <span className="text-sm text-slate-700 dark:text-slate-300">Include this in my therapist report</span>
      </div>

      <Button variant="primary" onClick={handleSave} className="w-full" disabled={!content.trim() || saved}>
        {saved ? <span className="flex items-center gap-2 justify-center"><Check className="w-4 h-4" /> Saved</span> : 'Save Reflection'}
      </Button>
    </div>
  );
};

export default FreeFormSection;
