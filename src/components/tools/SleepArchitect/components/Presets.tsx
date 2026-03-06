import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { PRESETS, SleepPlanInputs } from '../model';

interface PresetsProps {
  currentInputs: SleepPlanInputs;
  onApply: (partial: Partial<SleepPlanInputs>) => void;
}

const Presets: React.FC<PresetsProps> = ({ currentInputs, onApply }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
        <Sparkles size={16} className="text-indigo-500" />
        Quick Presets
      </label>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset, i) => (
          <motion.button
            key={preset.id}
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => onApply(preset.apply(currentInputs))}
            className="px-3 py-1.5 rounded-full text-xs font-bold border border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
            title={preset.description}
          >
            {preset.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Presets;
