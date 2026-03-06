import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ThoughtRecord } from '../types';

interface StepProps {
  data: ThoughtRecord;
  updateData: (updates: Partial<ThoughtRecord>) => void;
  onNext: () => void;
}

const MAX_CHARS = 500;

export const StepSituation: React.FC<StepProps> = ({ data, updateData, onNext }) => {
  const [showExample, setShowExample] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  const canProceed = data.situation.trim().length > 0;

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-3">
        What happened?
      </h2>
      <p className="text-gray-500 text-center mb-8 max-w-md">
        Briefly describe the situation that triggered your negative feelings. Be specific — what, where, when, who was involved?
      </p>

      <div className="w-full max-w-md">
        <textarea
          value={data.situation}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) {
              updateData({ situation: e.target.value });
            }
          }}
          placeholder="Describe the triggering situation..."
          rows={4}
          className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900/20 shadow-sm transition-all"
          aria-label="Describe the triggering situation"
        />
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${data.situation.length > MAX_CHARS * 0.9 ? 'text-amber-500' : 'text-gray-400'}`}>
            {data.situation.length}/{MAX_CHARS}
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
          "My manager gave critical feedback on my presentation in front of the whole team this morning."
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
          Pinpointing the exact moment helps separate the event from your interpretation of it. This clarity is the foundation for everything that follows.
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
