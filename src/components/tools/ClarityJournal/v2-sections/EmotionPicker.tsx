import React, { useState } from 'react';
import { EMOTIONS, EMOTION_CATEGORIES, type Emotion } from '../data/emotions';
import type { EmotionEntry } from '../types';

interface EmotionPickerProps {
  selected: EmotionEntry[];
  onChange: (emotions: EmotionEntry[]) => void;
  maxSelections?: number;
}

const EmotionPicker: React.FC<EmotionPickerProps> = ({
  selected,
  onChange,
  maxSelections = 5,
}) => {
  const [activeCategory, setActiveCategory] = useState<'positive' | 'negative' | 'neutral'>('negative');

  const isSelected = (id: string) => selected.some(e => e.name === id);

  const toggleEmotion = (emotion: Emotion) => {
    if (isSelected(emotion.id)) {
      onChange(selected.filter(e => e.name !== emotion.id));
    } else if (selected.length < maxSelections) {
      onChange([
        ...selected,
        { name: emotion.id, intensity: 50, category: emotion.category },
      ]);
    }
  };

  const updateIntensity = (name: string, intensity: number) => {
    onChange(selected.map(e => (e.name === name ? { ...e, intensity } : e)));
  };

  const emotions = EMOTIONS.filter(e => e.category === activeCategory);

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-3">
        How are you feeling? <span className="text-slate-400 dark:text-neutral-500 font-normal">(up to {maxSelections})</span>
      </label>

      {/* Category tabs */}
      <div className="flex gap-2 mb-4">
        {EMOTION_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-teal-600 text-white'
                : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Emotion chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {emotions.map(emotion => {
          const sel = isSelected(emotion.id);
          return (
            <button
              key={emotion.id}
              type="button"
              onClick={() => toggleEmotion(emotion)}
              disabled={!sel && selected.length >= maxSelections}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                sel
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed'
              }`}
              aria-label={`${sel ? 'Remove' : 'Add'} ${emotion.name}`}
            >
              <span>{emotion.emoji}</span>
              <span>{emotion.name}</span>
            </button>
          );
        })}
      </div>

      {/* Intensity sliders for selected emotions */}
      {selected.length > 0 && (
        <div className="space-y-3 mt-4 p-4 bg-slate-50 dark:bg-neutral-800/50 rounded-xl">
          <p className="text-xs text-slate-500 dark:text-neutral-400 font-medium mb-2">Adjust intensity</p>
          {selected.map(entry => {
            const emotion = EMOTIONS.find(e => e.id === entry.name);
            return (
              <div key={entry.name} className="flex items-center gap-3">
                <span className="text-sm w-24 truncate text-slate-700 dark:text-neutral-300">
                  {emotion?.emoji} {emotion?.name || entry.name}
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={entry.intensity}
                  onChange={e => updateIntensity(entry.name, Number(e.target.value))}
                  className="flex-1 h-2 accent-teal-600"
                  aria-label={`${emotion?.name || entry.name} intensity`}
                />
                <span className="text-xs text-slate-500 dark:text-neutral-400 w-8 text-right">{entry.intensity}%</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EmotionPicker;
