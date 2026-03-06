import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import type { ThoughtRecord } from '../types';
import { COGNITIVE_DISTORTIONS } from '../types';

interface StepProps {
  data: ThoughtRecord;
  updateData: (updates: Partial<ThoughtRecord>) => void;
  onNext: () => void;
  onOpenLibrary: () => void;
}

export const StepDistortionPicker: React.FC<StepProps> = ({
  data,
  updateData,
  onNext,
  onOpenLibrary,
}) => {
  const [showWhy, setShowWhy] = useState(false);

  const toggleDistortion = (id: string) => {
    if (data.distortions.includes(id)) {
      updateData({ distortions: data.distortions.filter(d => d !== id) });
    } else if (data.distortions.length < 4) {
      updateData({ distortions: [...data.distortions, id] });
    }
  };

  const canProceed = data.distortions.length >= 1;

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-3">
        What thinking pattern might this be?
      </h2>
      <p className="text-gray-500 text-center mb-4 max-w-md">
        Look at your thought. Does it match any of these common thinking traps? Select all that apply (up to 4).
      </p>

      <button
        onClick={onOpenLibrary}
        className="flex items-center gap-1.5 text-sm text-teal-600 font-medium hover:text-teal-700 mb-6 transition-colors"
      >
        <Info size={14} />
        View all distortions in detail
      </button>

      {/* Your thought for reference */}
      <div className="w-full max-w-2xl bg-gray-50 rounded-xl p-3 mb-6">
        <p className="text-xs text-gray-400 mb-1">Your thought:</p>
        <p className="text-sm text-gray-700 italic">"{data.automaticThought}"</p>
      </div>

      {/* Distortion cards grid */}
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {COGNITIVE_DISTORTIONS.map(d => {
          const isSelected = data.distortions.includes(d.id);
          return (
            <button
              key={d.id}
              onClick={() => toggleDistortion(d.id)}
              aria-pressed={isSelected}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-teal-500 bg-teal-50 shadow-md'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
              } focus:outline-none focus:ring-2 focus:ring-teal-500/30`}
            >
              <h4 className={`font-semibold text-sm mb-1 ${isSelected ? 'text-teal-900' : 'text-gray-900'}`}>
                {d.name}
              </h4>
              <p className="text-xs text-gray-500 mb-2">{d.description}</p>
              <p className="text-xs text-gray-400 italic">{d.doesThisFit}</p>
            </button>
          );
        })}
      </div>

      {data.distortions.length > 0 && (
        <p className="text-sm text-gray-500 mb-4">
          Selected: {data.distortions.length}/4
        </p>
      )}

      {/* Why this matters */}
      <button
        onClick={() => setShowWhy(!showWhy)}
        className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 mb-6 transition-colors"
      >
        Why this matters
        <ChevronDown size={14} className={`transition-transform ${showWhy ? 'rotate-180' : ''}`} />
      </button>
      {showWhy && (
        <p className="text-sm text-gray-500 mb-6 max-w-md text-center">
          Everyone falls into thinking traps — they're called "cognitive distortions." Recognizing them is like learning to spot optical illusions for your mind. Once you see the pattern, it loses its power.
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
