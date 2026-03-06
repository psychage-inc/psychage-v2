import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ThoughtRecord } from '../types';

interface StepProps {
  data: ThoughtRecord;
  updateData: (updates: Partial<ThoughtRecord>) => void;
  onNext: () => void;
}

const MAX_CHARS = 500;

export const StepEvidenceFor: React.FC<StepProps> = ({ data, updateData, onNext }) => {
  const [showWhy, setShowWhy] = useState(false);

  const canProceed = data.evidenceFor.trim().length > 0;

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-3">
        What supports this thought?
      </h2>
      <p className="text-gray-500 text-center mb-8 max-w-md">
        Before we challenge anything, let's be fair. Is there any actual evidence that supports your negative thought? List the facts — not feelings.
      </p>

      {/* Reference: the thought */}
      <div className="w-full max-w-md bg-gray-50 rounded-xl p-3 mb-4">
        <p className="text-xs text-gray-400 mb-1">Your thought:</p>
        <p className="text-sm text-gray-700 italic">"{data.automaticThought}"</p>
      </div>

      <div className="w-full max-w-md">
        <textarea
          value={data.evidenceFor}
          onChange={e => {
            if (e.target.value.length <= MAX_CHARS) {
              updateData({ evidenceFor: e.target.value });
            }
          }}
          placeholder="What facts (not feelings) support this thought? Has something like this happened before? Is there objective evidence?"
          rows={5}
          className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900/20 shadow-sm transition-all"
          aria-label="Evidence supporting the thought"
        />
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${data.evidenceFor.length > MAX_CHARS * 0.9 ? 'text-amber-500' : 'text-gray-400'}`}>
            {data.evidenceFor.length}/{MAX_CHARS}
          </span>
        </div>
      </div>

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
          This step is crucial. We're not here to dismiss your thoughts — some negative thoughts do have evidence behind them. Acknowledging that builds trust in the process and makes the reframe more honest.
        </p>
      )}

      <button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full max-w-md py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-black transition-colors focus:ring-4 focus:ring-gray-900/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        Next
      </button>
    </div>
  );
};
