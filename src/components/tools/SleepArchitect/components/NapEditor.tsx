import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Coffee, AlertTriangle, Bed } from 'lucide-react';
import { Nap, NapAnalysis } from '../model';

interface NapEditorProps {
  naps: Nap[];
  napAnalysis: NapAnalysis[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: 'startTime' | 'durationMinutes', value: string | number) => void;
}

function classColor(classification: string): string {
  switch (classification) {
    case 'power_nap': return 'bg-emerald-100 text-emerald-700';
    case 'short_nap': return 'bg-sky-100 text-sky-700';
    case 'deep_risk': return 'bg-amber-100 text-amber-700';
    case 'full_cycle': return 'bg-violet-100 text-violet-700';
    default: return 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300';
  }
}

const NapEditor: React.FC<NapEditorProps> = ({ naps, napAnalysis, onAdd, onRemove, onUpdate }) => {
  const getAnalysis = (napId: string) => napAnalysis.find(a => a.nap.id === napId);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-700 dark:text-neutral-300 flex items-center gap-2">
          <Coffee size={16} className="text-indigo-500" />
          Naps
        </label>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors px-2 py-1 rounded-lg hover:bg-indigo-50"
          aria-label="Add nap"
        >
          <Plus size={14} />
          Add Nap
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {naps.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-gray-400 dark:text-neutral-500 text-center py-4 bg-gray-50 dark:bg-neutral-900 rounded-xl border border-dashed border-gray-200 dark:border-neutral-700"
          >
            <Bed size={20} className="mx-auto mb-1.5 text-gray-300 dark:text-neutral-600" />
            No naps scheduled. Use presets or add one.
          </motion.div>
        )}

        {naps.map(nap => {
          const analysis = getAnalysis(nap.id);
          return (
            <motion.div
              key={nap.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-3 border border-gray-100 dark:border-neutral-800"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor={`nap-time-${nap.id}`} className="text-[10px] font-medium text-gray-500 dark:text-neutral-400 block mb-0.5">
                      Start Time
                    </label>
                    <input
                      id={`nap-time-${nap.id}`}
                      type="time"
                      value={nap.startTime}
                      onChange={e => onUpdate(nap.id, 'startTime', e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-neutral-700 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor={`nap-dur-${nap.id}`} className="text-[10px] font-medium text-gray-500 dark:text-neutral-400 block mb-0.5">
                      Duration (min)
                    </label>
                    <input
                      id={`nap-dur-${nap.id}`}
                      type="number"
                      min={5}
                      max={180}
                      value={nap.durationMinutes}
                      onChange={e => onUpdate(nap.id, 'durationMinutes', parseInt(e.target.value) || 0)}
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-neutral-700 text-sm font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(nap.id)}
                  className="text-gray-300 dark:text-neutral-600 hover:text-red-500 transition-colors p-1 self-start mt-4"
                  aria-label="Remove nap"
                >
                  <X size={16} />
                </button>
              </div>

              {analysis && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${classColor(analysis.classification)}`}>
                    {analysis.label}
                  </span>
                  {analysis.inertiaRisk && (
                    <span className="text-[10px] font-medium text-amber-600 flex items-center gap-0.5">
                      <AlertTriangle size={10} /> Sleep inertia risk
                    </span>
                  )}
                  {analysis.tooCloseToSleep && (
                    <span className="text-[10px] font-medium text-red-500 flex items-center gap-0.5">
                      <AlertTriangle size={10} /> Too close to bedtime
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default NapEditor;
