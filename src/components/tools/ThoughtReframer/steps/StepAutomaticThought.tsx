import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ThoughtRecord } from '../types';
import { scanForCrisisKeywords } from '../crisisDetection';

interface StepProps {
  data: ThoughtRecord;
  updateData: (updates: Partial<ThoughtRecord>) => void;
  onNext: () => void;
  onCrisisDetected: () => void;
}

const MAX_CHARS = 300;

export const StepAutomaticThought: React.FC<StepProps> = ({
  data,
  updateData,
  onNext,
  onCrisisDetected,
}) => {
  const [showExample, setShowExample] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const canProceed = data.automaticThought.trim().length > 0;

  const handleChange = (value: string) => {
    if (value.length <= MAX_CHARS) {
      updateData({ automaticThought: value });

      // Debounced crisis keyword scanning
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const result = scanForCrisisKeywords(value);
        if (result.detected) {
          onCrisisDetected();
        }
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-3">
        What went through your mind?
      </h2>
      <p className="text-gray-500 text-center mb-8 max-w-md">
        Write down the thought exactly as it came to you. Don't filter it or make it "nicer" — the raw thought is what we need.
      </p>

      <div className="w-full max-w-md">
        <textarea
          value={data.automaticThought}
          onChange={e => handleChange(e.target.value)}
          placeholder="Write the thought exactly as it occurred..."
          rows={3}
          className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900/20 shadow-sm transition-all"
          aria-label="Write your automatic thought"
        />
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${data.automaticThought.length > MAX_CHARS * 0.9 ? 'text-amber-500' : 'text-gray-400'}`}>
            {data.automaticThought.length}/{MAX_CHARS}
          </span>
        </div>
      </div>

      {/* Collapsible example */}
      <button
        onClick={() => setShowExample(!showExample)}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mt-4 transition-colors"
      >
        See an example
        <ChevronDown size={14} className={`transition-transform ${showExample ? 'rotate-180' : ''}`} />
      </button>
      {showExample && (
        <p className="text-sm text-gray-500 italic mt-2 max-w-md text-center bg-gray-50 rounded-xl p-3">
          "I'm terrible at my job. Everyone thinks I'm incompetent."
        </p>
      )}

      {/* Why this matters */}
      <button
        onClick={() => setShowWhy(!showWhy)}
        className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 mt-3 transition-colors"
      >
        Why this matters
        <ChevronDown size={14} className={`transition-transform ${showWhy ? 'rotate-180' : ''}`} />
      </button>
      {showWhy && (
        <p className="text-sm text-gray-500 mt-2 max-w-md text-center">
          These "automatic thoughts" happen so fast we barely notice them. But they have a huge impact on how we feel. Writing them down is how we slow down and examine them.
        </p>
      )}

      <button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full max-w-md mt-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-black transition-colors focus:ring-4 focus:ring-gray-900/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        Next
      </button>
    </div>
  );
};
