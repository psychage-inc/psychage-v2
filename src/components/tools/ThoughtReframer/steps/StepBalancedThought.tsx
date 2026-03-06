import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import type { ThoughtRecord, EmotionRating } from '../types';

interface StepProps {
  data: ThoughtRecord;
  updateData: (updates: Partial<ThoughtRecord>) => void;
  onNext: () => void;
}

const MAX_CHARS = 500;

export const StepBalancedThought: React.FC<StepProps> = ({ data, updateData, onNext }) => {
  const [showExample, setShowExample] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  // Initialize emotionsAfter from emotions if not yet set
  React.useEffect(() => {
    if (data.emotionsAfter.length === 0 && data.emotions.length > 0) {
      updateData({
        emotionsAfter: data.emotions.map(e => ({ ...e })),
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateAfterIntensity = (name: string, intensity: number) => {
    updateData({
      emotionsAfter: data.emotionsAfter.map(e =>
        e.name === name ? { ...e, intensity } : e
      ),
    });
  };

  const canProceed = data.balancedThought.trim().length > 0;

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-3">
        What's a more balanced way to see this?
      </h2>
      <p className="text-gray-500 text-center mb-8 max-w-md">
        Using the evidence from both sides, write a thought that's realistic — not overly positive, not overly negative. Just balanced.
      </p>

      {/* Side-by-side comparison */}
      <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {/* Original thought */}
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
          <p className="text-xs text-rose-400 font-medium mb-2">Original thought</p>
          <p className="text-sm text-rose-800 italic">"{data.automaticThought}"</p>
        </div>

        {/* Arrow (desktop only) */}
        <div className="hidden sm:flex items-center justify-center absolute left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true">
          {/* This is intentionally hidden on mobile where cards stack */}
        </div>

        {/* Balanced thought */}
        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4">
          <p className="text-xs text-teal-500 font-medium mb-2">Balanced thought</p>
          <textarea
            value={data.balancedThought}
            onChange={e => {
              if (e.target.value.length <= MAX_CHARS) {
                updateData({ balancedThought: e.target.value });
              }
            }}
            placeholder="Write a more balanced perspective..."
            rows={3}
            className="w-full bg-transparent text-sm text-teal-900 placeholder-teal-400 resize-none focus:outline-none"
            aria-label="Write your balanced thought"
          />
        </div>
      </div>

      {/* Arrow between cards on mobile */}
      <div className="sm:hidden flex justify-center -mt-1 mb-4">
        <ArrowRight size={16} className="text-gray-300 rotate-90" />
      </div>

      {/* Collapsible example */}
      <button
        onClick={() => setShowExample(!showExample)}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-4 transition-colors"
      >
        See an example
        <ChevronDown size={14} className={`transition-transform ${showExample ? 'rotate-180' : ''}`} />
      </button>
      {showExample && (
        <div className="w-full max-w-md bg-gray-50 rounded-xl p-3 mb-4 text-center">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Instead of:</span> "I'm terrible at my job."
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-medium">Balanced:</span> "I got critical feedback on one presentation. That's one area I can improve, but it doesn't define my entire ability."
          </p>
        </div>
      )}

      {/* Re-rate emotions */}
      {data.emotionsAfter.length > 0 && (
        <div className="w-full max-w-md mt-4">
          <p className="text-sm text-gray-600 font-medium text-center mb-3">
            How do you feel now? Re-rate your emotions:
          </p>
          <div className="space-y-3">
            {data.emotionsAfter.map((emotion: EmotionRating) => {
              const original = data.emotions.find(e => e.name === emotion.name);
              return (
                <div key={emotion.name} className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{emotion.name}</span>
                    <span className="text-sm text-gray-500">
                      {original ? `${original.intensity}%` : ''} → {emotion.intensity}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={emotion.intensity}
                    onChange={e => updateAfterIntensity(emotion.name, Number(e.target.value))}
                    className="w-full accent-teal-600"
                    aria-label={`${emotion.name} intensity after reframing: ${emotion.intensity} out of 100`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Why this matters */}
      <button
        onClick={() => setShowWhy(!showWhy)}
        className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 mt-4 mb-6 transition-colors"
      >
        Why this matters
        <ChevronDown size={14} className={`transition-transform ${showWhy ? 'rotate-180' : ''}`} />
      </button>
      {showWhy && (
        <p className="text-sm text-gray-500 mb-6 max-w-md text-center">
          The goal isn't toxic positivity. It's accuracy. A balanced thought accounts for the full picture — good and bad. Over time, this becomes automatic.
        </p>
      )}

      <button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full max-w-md py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-black transition-colors focus:ring-4 focus:ring-gray-900/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        Complete
      </button>
    </div>
  );
};
