// Clarity Journal V2 — Settings Panel
// Reminder toggles, screener day picker, data management, storage usage

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Trash2, Download, AlertTriangle, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import type { JournalSettings } from '../types';
import { getStorageUsage, exportAllData } from '../storage';

interface SettingsPanelProps {
  settings: JournalSettings;
  onUpdate: (settings: Partial<JournalSettings>) => void;
  onClear: () => void;
  onClose: () => void;
}

const DAYS = [
  { value: 'monday' as const, label: 'Monday' },
  { value: 'tuesday' as const, label: 'Tuesday' },
  { value: 'wednesday' as const, label: 'Wednesday' },
  { value: 'thursday' as const, label: 'Thursday' },
  { value: 'friday' as const, label: 'Friday' },
  { value: 'saturday' as const, label: 'Saturday' },
  { value: 'sunday' as const, label: 'Sunday' },
];

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onUpdate, onClear, onClose }) => {
  const [confirmClear, setConfirmClear] = useState(false);
  const [exported, setExported] = useState(false);

  const usage = getStorageUsage();
  const usageMB = (usage.usedBytes / (1024 * 1024)).toFixed(2);
  const usageWarning = usage.percentage > 80;

  const handleExport = () => {
    const json = exportAllData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clarity-journal-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const handleClearConfirmed = () => {
    onClear();
    setConfirmClear(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div className="flex items-center gap-2 mb-1">
        <Settings className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        <h2 className="font-semibold text-lg text-slate-900 dark:text-white">Journal Settings</h2>
      </div>

      {/* Reminders */}
      <div className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/60 dark:border-white/10 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Check-In Reminders</h3>
        <p className="text-xs text-slate-500 dark:text-neutral-400">
          Reminders are browser-based and require notification permissions.
        </p>

        <label className="flex items-center justify-between gap-3 cursor-pointer">
          <span className="text-sm text-slate-700 dark:text-neutral-300">Morning reminder</span>
          <button
            type="button"
            onClick={() => onUpdate({ reminderMorning: !settings.reminderMorning })}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              settings.reminderMorning ? 'bg-teal-600' : 'bg-slate-300 dark:bg-neutral-600'
            }`}
            aria-label="Toggle morning reminder"
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-neutral-900 shadow transition-transform ${
              settings.reminderMorning ? 'translate-x-5' : ''
            }`} />
          </button>
        </label>

        {settings.reminderMorning && (
          <div className="ml-1">
            <label className="text-xs text-slate-500 dark:text-neutral-400">Time</label>
            <input
              type="time"
              value={settings.reminderMorningTime}
              onChange={e => onUpdate({ reminderMorningTime: e.target.value })}
              className="ml-2 px-2 py-1 rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        )}

        <label className="flex items-center justify-between gap-3 cursor-pointer">
          <span className="text-sm text-slate-700 dark:text-neutral-300">Evening reminder</span>
          <button
            type="button"
            onClick={() => onUpdate({ reminderEvening: !settings.reminderEvening })}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              settings.reminderEvening ? 'bg-teal-600' : 'bg-slate-300 dark:bg-neutral-600'
            }`}
            aria-label="Toggle evening reminder"
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-neutral-900 shadow transition-transform ${
              settings.reminderEvening ? 'translate-x-5' : ''
            }`} />
          </button>
        </label>

        {settings.reminderEvening && (
          <div className="ml-1">
            <label className="text-xs text-slate-500 dark:text-neutral-400">Time</label>
            <input
              type="time"
              value={settings.reminderEveningTime}
              onChange={e => onUpdate({ reminderEveningTime: e.target.value })}
              className="ml-2 px-2 py-1 rounded-lg border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        )}
      </div>

      {/* Screener Day */}
      <div className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/60 dark:border-white/10 shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Weekly Screener</h3>
        <p className="text-xs text-slate-500 dark:text-neutral-400">
          Choose the day your weekly wellness screener appears.
        </p>
        <select
          value={settings.weeklyScreenerDay}
          onChange={e => onUpdate({ weeklyScreenerDay: e.target.value as JournalSettings['weeklyScreenerDay'] })}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {DAYS.map(d => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>

      {/* Guided Prompts */}
      <div className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/60 dark:border-white/10 shadow-sm">
        <label className="flex items-center justify-between gap-3 cursor-pointer">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Guided Prompts</h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
              Show a daily writing prompt in free-form entries.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onUpdate({ showGuidedPrompts: !settings.showGuidedPrompts })}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
              settings.showGuidedPrompts ? 'bg-teal-600' : 'bg-slate-300 dark:bg-neutral-600'
            }`}
            aria-label="Toggle guided prompts"
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-neutral-900 shadow transition-transform ${
              settings.showGuidedPrompts ? 'translate-x-5' : ''
            }`} />
          </button>
        </label>
      </div>

      {/* Default Report Period */}
      <div className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/60 dark:border-white/10 shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Default Report Period</h3>
        <div className="flex gap-2">
          {([7, 14, 30] as const).map(days => (
            <button
              key={days}
              type="button"
              onClick={() => onUpdate({ defaultReportPeriod: days })}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                settings.defaultReportPeriod === days
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700'
              }`}
            >
              {days} days
            </button>
          ))}
        </div>
      </div>

      {/* Storage Usage */}
      <div className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/60 dark:border-white/10 shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Storage</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-500 dark:text-neutral-400">
            <span>{usageMB} MB used</span>
            <span>{usage.percentage.toFixed(0)}% of 5 MB</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                usageWarning ? 'bg-amber-500' : 'bg-teal-500'
              }`}
              style={{ width: `${Math.min(usage.percentage, 100)}%` }}
            />
          </div>
          {usageWarning && (
            <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Storage is filling up. Consider exporting and clearing old data.
            </p>
          )}
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/60 dark:border-white/10 shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Data Management</h3>
        <p className="text-xs text-slate-500 dark:text-neutral-400">
          All journal data is stored on your device only. Nothing is sent to any server.
        </p>

        <Button
          variant="outline"
          onClick={handleExport}
          className="w-full flex items-center justify-center gap-2"
        >
          {exported ? (
            <><Check className="w-4 h-4" /> Exported</>
          ) : (
            <><Download className="w-4 h-4" /> Export Backup (JSON)</>
          )}
        </Button>

        {!confirmClear ? (
          <Button
            variant="outline"
            onClick={() => setConfirmClear(true)}
            className="w-full flex items-center justify-center gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" /> Clear All Data
          </Button>
        ) : (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 space-y-3">
            <p className="text-sm text-red-700 dark:text-red-300 font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              This will permanently delete all journal entries. This cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setConfirmClear(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <button
                onClick={handleClearConfirmed}
                className="flex-1 px-4 py-2 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Yes, Delete Everything
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Close */}
      <Button
        variant="outline"
        onClick={onClose}
        className="w-full"
      >
        Done
      </Button>
    </motion.div>
  );
};

export default SettingsPanel;
