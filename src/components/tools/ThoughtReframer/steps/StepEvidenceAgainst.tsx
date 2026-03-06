import React, { useState } from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';
import type { ThoughtRecord } from '../types';
import { SOCRATIC_PROMPTS } from '../types';

interface StepProps {
  data: ThoughtRecord;
  updateData: (updates: Partial<ThoughtRecord>) => void;
  onNext: () => void;
}

const MAX_CHARS = 500;

export const StepEvidenceAgainst: React.FC<StepProps> = ({ data, updateData, onNext }) => {
  const [showWhy, setShowWhy] = useState(false);
  const [promptOffset, setPromptOffset] = useState(0);

  const visiblePrompts = SOCRATIC_PROMPTS.slice(promptOffset, promptOffset + 3);
  const canShowMore = promptOffset + 3 < SOCRATIC_PROMPTS.length;

  const rotatePrompts = () => {
    setPromptOffset(prev =>
      prev + 3 >= SOCRATIC_PROMPTS.length ? 0 : prev + 3
    );
  };

  const insertPrompt = (prompt: string) => {
    const prefix = data.evidenceAgainst.trim() ? data.evidenceAgainst + '\n\n' : '';
    const newValue = prefix + prompt + '\n';
    if (newValue.length <= MAX_CHARS) {
      updateData({ evidenceAgainst: newValue });
    }
  };

  const canProceed = data.evidenceAgainst.trim().length > 0;

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-3">
        What contradicts this thought?
      </h2>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        Now let's look at the other side. What evidence suggests this thought might not be the complete picture?
      </p>

      {/* Socratic prompt chips */}
      <div className="w-full max-w-md mb-4">
        <p className="text-xs text-gray-400 mb-2 text-center">Tap a prompt to add it as a starting point:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {visiblePrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => insertPrompt(prompt)}
              className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-xs font-medium hover:bg-teal-100 transition-colors border border-teal-100"
            >
              {prompt}
            </button>
          ))}
          <button
            onClick={rotatePrompts}
            className="px-3 py-1.5 bg-gray-50 text-gray-500 rounded-full text-xs font-medium hover:bg-gray-100 transition-colors border border-gray-100 flex items-center gap-1"
            aria-label={canShowMore ? 'Show more prompts' : 'Show first prompts'}
          >
            <RefreshCw size={12} />
            More
          </button>
        </div>
      </div>

      {/* Reference: the thought */}
      <div className="w-full max-w-md bg-gray-50 rounded-xl p-3 mb-4">
        <p className="text-xs text-gray-400 mb-1">Your thought:</p>
        <p className="text-sm text-gray-700 italic">"{data.automaticThought}"</p>
      </div>

      <div className="w-full max-w-md">
        <textarea
          value={data.evidenceAgainst}
          onChange={e => {
            if (e.target.value.length <= MAX_CHARS) {
              updateData({ evidenceAgainst: e.target.value });
            }
          }}
          placeholder="What evidence contradicts this thought? What would you tell a friend in this situation?"
          rows={5}
          className="w-full px-5 py-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900/20 shadow-sm transition-all"
          aria-label="Evidence contradicting the thought"
        />
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${data.evidenceAgainst.length > MAX_CHARS * 0.9 ? 'text-amber-500' : 'text-gray-400'}`}>
            {data.evidenceAgainst.length}/{MAX_CHARS}
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
          The "friend test" is one of the most powerful techniques in therapy. We're almost always kinder and more rational when advising a friend than when talking to ourselves.
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
