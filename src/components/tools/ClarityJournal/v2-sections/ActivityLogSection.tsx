import React, { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import MoodSlider from '../components/MoodSlider';
import type { BehavioralLog, ActivityEntry } from '../types';
import { generateId, nowISO } from '../dates';

const ACTIVITY_CATEGORIES = [
  { value: 'physical' as const, label: 'Physical', emoji: '🏃' },
  { value: 'social' as const, label: 'Social', emoji: '👥' },
  { value: 'creative' as const, label: 'Creative', emoji: '🎨' },
  { value: 'work' as const, label: 'Work', emoji: '💼' },
  { value: 'rest' as const, label: 'Rest', emoji: '😴' },
  { value: 'self-care' as const, label: 'Self-Care', emoji: '🧘' },
  { value: 'other' as const, label: 'Other', emoji: '📌' },
];

const DURATION_PRESETS = [
  { value: 15, label: '15m' },
  { value: 30, label: '30m' },
  { value: 60, label: '1h' },
  { value: 120, label: '2h+' },
];

interface ActivityLogSectionProps {
  onSave: (log: BehavioralLog) => void;
  existing?: BehavioralLog;
}

const ActivityLogSection: React.FC<ActivityLogSectionProps> = ({ onSave, existing }) => {
  const [activities, setActivities] = useState<ActivityEntry[]>(existing?.activities || []);
  const [socialInteractions, setSocialInteractions] = useState(existing?.socialInteractions || 0);
  const [avoidance, setAvoidance] = useState(existing?.avoidanceBehaviors || '');
  const [activityLevel, setActivityLevel] = useState(existing?.overallActivityLevel || 5);
  const [saved, setSaved] = useState(false);

  // New activity form
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<ActivityEntry['category']>('physical');
  const [newDuration, setNewDuration] = useState(30);
  const [newEnjoyment, setNewEnjoyment] = useState(5);
  const [newMastery, setNewMastery] = useState(5);

  const addActivity = () => {
    if (!newName.trim()) return;
    setActivities([...activities, {
      name: newName.trim(),
      category: newCategory,
      duration: newDuration,
      enjoyment: newEnjoyment,
      mastery: newMastery,
    }]);
    setNewName('');
    setNewEnjoyment(5);
    setNewMastery(5);
    setShowAdd(false);
  };

  const removeActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const log: BehavioralLog = {
      id: existing?.id || generateId(),
      timestamp: nowISO(),
      activities,
      socialInteractions,
      avoidanceBehaviors: avoidance.trim() || undefined,
      overallActivityLevel: activityLevel,
    };
    onSave(log);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Activities list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-slate-700 dark:text-neutral-300">Activities today</label>
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1 text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>

        {activities.length === 0 && !showAdd && (
          <p className="text-sm text-slate-400 dark:text-neutral-500 italic">No activities logged yet</p>
        )}

        {activities.map((activity, i) => (
          <div key={i} className="flex items-center gap-3 bg-slate-50 dark:bg-neutral-800/50 rounded-xl p-3 mb-2">
            <span className="text-lg">{ACTIVITY_CATEGORIES.find(c => c.value === activity.category)?.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{activity.name}</p>
              <p className="text-xs text-slate-500 dark:text-neutral-400">{activity.duration}min · Joy {activity.enjoyment}/10 · Mastery {activity.mastery}/10</p>
            </div>
            <button type="button" onClick={() => removeActivity(i)} className="text-slate-400 dark:text-neutral-500 hover:text-red-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Add activity form */}
        {showAdd && (
          <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-xl p-4 space-y-4">
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="What did you do?"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              autoFocus
            />

            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-neutral-400 mb-2">Category</p>
              <div className="flex flex-wrap gap-1.5">
                {ACTIVITY_CATEGORIES.map(cat => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setNewCategory(cat.value)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      newCategory === cat.value
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400'
                    }`}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-neutral-400 mb-2">Duration</p>
              <div className="flex gap-2">
                {DURATION_PRESETS.map(dp => (
                  <button
                    key={dp.value}
                    type="button"
                    onClick={() => setNewDuration(dp.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      newDuration === dp.value
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400'
                    }`}
                  >
                    {dp.label}
                  </button>
                ))}
              </div>
            </div>

            <MoodSlider value={newEnjoyment} onChange={setNewEnjoyment} label="Enjoyment" />
            <MoodSlider value={newMastery} onChange={setNewMastery} label="Sense of accomplishment" />

            <div className="flex gap-2">
              <Button variant="primary" onClick={addActivity} disabled={!newName.trim()} className="flex-1">Add Activity</Button>
              <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </div>

      {/* Social interactions */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">Social interactions today</label>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setSocialInteractions(Math.max(0, socialInteractions - 1))} className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 flex items-center justify-center text-lg font-medium hover:bg-slate-200 dark:hover:bg-neutral-700">−</button>
          <span className="text-lg font-semibold text-slate-900 dark:text-white w-8 text-center">{socialInteractions}</span>
          <button type="button" onClick={() => setSocialInteractions(socialInteractions + 1)} className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 flex items-center justify-center text-lg font-medium hover:bg-slate-200 dark:hover:bg-neutral-700">+</button>
        </div>
      </div>

      {/* Avoidance */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">
          Anything you wanted to do but avoided? <span className="text-slate-400 dark:text-neutral-500 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={avoidance}
          onChange={e => setAvoidance(e.target.value)}
          placeholder="e.g., Going to the gym, calling a friend..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Overall activity level */}
      <MoodSlider value={activityLevel} onChange={setActivityLevel} label="Overall activity level today" />

      <Button variant="primary" onClick={handleSave} className="w-full" disabled={saved}>
        {saved ? <span className="flex items-center gap-2 justify-center"><Check className="w-4 h-4" /> Saved</span> : 'Save Activity Log'}
      </Button>
    </div>
  );
};

export default ActivityLogSection;
