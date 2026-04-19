import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { UserProfile, AgeGroup, Chronotype } from '../model';

interface ProfileSettingsProps {
  profile: UserProfile;
  onChange: (profile: UserProfile) => void;
}

const AGE_OPTIONS: { value: AgeGroup; label: string }[] = [
  { value: 'teen', label: 'Teen (13–17)' },
  { value: 'adult', label: 'Adult (18–64)' },
  { value: 'older_adult', label: 'Older Adult (65+)' },
];

const CHRONO_OPTIONS: { value: Chronotype; label: string }[] = [
  { value: 'early_bird', label: 'Early Bird' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'night_owl', label: 'Night Owl' },
];

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ profile, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const update = (field: keyof UserProfile, value: string | number) => {
    onChange({ ...profile, [field]: value });
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-sm font-bold text-gray-700 dark:text-neutral-300"
        aria-expanded={expanded}
      >
        <span className="flex items-center gap-2">
          <Settings size={16} className="text-gray-400 dark:text-neutral-500" />
          Profile Settings
        </span>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-4 border border-gray-100 dark:border-neutral-800 space-y-3 mt-1">
              {/* Age Group */}
              <div>
                <label htmlFor="age-group" className="text-xs font-medium text-gray-500 dark:text-neutral-400 block mb-1">
                  Age Group
                </label>
                <select
                  id="age-group"
                  value={profile.ageGroup}
                  onChange={e => update('ageGroup', e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-200 dark:border-neutral-700 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none bg-white dark:bg-neutral-900"
                >
                  {AGE_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Chronotype */}
              <div>
                <label htmlFor="chronotype" className="text-xs font-medium text-gray-500 dark:text-neutral-400 block mb-1">
                  Chronotype
                </label>
                <select
                  id="chronotype"
                  value={profile.chronotype}
                  onChange={e => update('chronotype', e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-200 dark:border-neutral-700 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none bg-white dark:bg-neutral-900"
                >
                  {CHRONO_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Target Sleep */}
              <div>
                <label htmlFor="target-sleep" className="text-xs font-medium text-gray-500 dark:text-neutral-400 block mb-1">
                  Target Sleep Duration (hours)
                </label>
                <input
                  id="target-sleep"
                  type="number"
                  min={4}
                  max={12}
                  step={0.5}
                  value={profile.targetSleepHours}
                  onChange={e => update('targetSleepHours', parseFloat(e.target.value) || 8)}
                  className="w-full p-2 rounded-lg border border-gray-200 dark:border-neutral-700 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                />
              </div>

              {/* Caffeine Cutoff */}
              <div>
                <label htmlFor="caffeine-cutoff" className="text-xs font-medium text-gray-500 dark:text-neutral-400 block mb-1">
                  Caffeine Cutoff Time (optional)
                </label>
                <input
                  id="caffeine-cutoff"
                  type="time"
                  value={profile.caffeineCutoffTime}
                  onChange={e => update('caffeineCutoffTime', e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-200 dark:border-neutral-700 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                />
              </div>

              {/* Exercise Time */}
              <div>
                <label htmlFor="exercise-time" className="text-xs font-medium text-gray-500 dark:text-neutral-400 block mb-1">
                  Exercise Time (optional)
                </label>
                <input
                  id="exercise-time"
                  type="time"
                  value={profile.exerciseTime}
                  onChange={e => update('exerciseTime', e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-200 dark:border-neutral-700 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileSettings;
