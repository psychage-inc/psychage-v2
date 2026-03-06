import React, { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import type { ThoughtRecord, EmotionRating } from '../types';
import { EMOTION_PRESETS } from '../types';

interface StepProps {
  data: ThoughtRecord;
  updateData: (updates: Partial<ThoughtRecord>) => void;
  onNext: () => void;
}

export const StepEmotions: React.FC<StepProps> = ({ data, updateData, onNext }) => {
  const [customEmotion, setCustomEmotion] = useState('');
  const [showWhy, setShowWhy] = useState(false);

  const selectedNames = data.emotions.map(e => e.name);

  const toggleEmotion = (name: string) => {
    if (selectedNames.includes(name)) {
      updateData({ emotions: data.emotions.filter(e => e.name !== name) });
    } else if (data.emotions.length < 5) {
      updateData({ emotions: [...data.emotions, { name, intensity: 50 }] });
    }
  };

  const addCustomEmotion = () => {
    const trimmed = customEmotion.trim();
    if (trimmed && !selectedNames.includes(trimmed) && data.emotions.length < 5) {
      updateData({ emotions: [...data.emotions, { name: trimmed, intensity: 50 }] });
      setCustomEmotion('');
    }
  };

  const updateIntensity = (name: string, intensity: number) => {
    updateData({
      emotions: data.emotions.map(e =>
        e.name === name ? { ...e, intensity } : e
      ),
    });
  };

  const canProceed = data.emotions.length > 0;

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-3">
        How did you feel?
      </h2>
      <p className="text-gray-500 text-center mb-8 max-w-md">
        Select the emotions you experienced. You can choose up to 5.
      </p>

      {/* Emotion chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-lg">
        {EMOTION_PRESETS.map(emotion => (
          <button
            key={emotion}
            onClick={() => toggleEmotion(emotion)}
            aria-pressed={selectedNames.includes(emotion)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedNames.includes(emotion)
                ? 'bg-gray-900 text-white shadow-md scale-105'
                : 'bg-white/60 text-gray-700 hover:bg-white border border-white/40 shadow-sm hover:scale-[1.02]'
            } focus:outline-none focus:ring-2 focus:ring-gray-900/20`}
          >
            {emotion}
          </button>
        ))}
      </div>

      {/* Custom emotion input */}
      <div className="flex gap-2 w-full max-w-xs mb-8">
        <input
          type="text"
          value={customEmotion}
          onChange={e => setCustomEmotion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addCustomEmotion()}
          placeholder="Add your own..."
          className="flex-1 px-4 py-2.5 bg-white/60 backdrop-blur-md border border-white/40 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 shadow-sm"
          aria-label="Add custom emotion"
        />
        <button
          onClick={addCustomEmotion}
          disabled={!customEmotion.trim() || data.emotions.length >= 5}
          className="p-2.5 bg-white/60 border border-white/40 rounded-full hover:bg-white transition-colors disabled:opacity-50 shadow-sm"
          aria-label="Add emotion"
        >
          <Plus size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Intensity sliders */}
      {data.emotions.length > 0 && (
        <div className="w-full max-w-md space-y-4 mb-6">
          <p className="text-sm text-gray-500 text-center">Rate each emotion's intensity:</p>
          {data.emotions.map((emotion: EmotionRating) => (
            <div key={emotion.name} className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">{emotion.name}</span>
                <span className="text-sm text-gray-500">{emotion.intensity}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={emotion.intensity}
                onChange={e => updateIntensity(emotion.name, Number(e.target.value))}
                className="w-full accent-gray-900"
                aria-label={`${emotion.name} intensity: ${emotion.intensity} out of 100`}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Not at all</span>
                <span>Moderate</span>
                <span>Extremely</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Why this matters */}
      <button
        onClick={() => setShowWhy(!showWhy)}
        className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 mt-2 mb-6 transition-colors"
      >
        Why this matters
        <ChevronDown size={14} className={`transition-transform ${showWhy ? 'rotate-180' : ''}`} />
      </button>
      {showWhy && (
        <p className="text-sm text-gray-500 mb-6 max-w-md text-center">
          Naming your emotions precisely is the first step to understanding them. Research shows that labeling emotions actually reduces their intensity — a process called "affect labeling."
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
