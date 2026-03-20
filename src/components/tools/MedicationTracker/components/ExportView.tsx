import React, { useState } from 'react';
import { ArrowLeft, Download, Copy, Check } from 'lucide-react';
import type { MedicationTrackerData } from '../types';
import { buildSummaryText } from '../storage';

interface Props {
  data: MedicationTrackerData;
  onExportJson: () => void;
  onCopyToClipboard: () => Promise<boolean>;
  onBack: () => void;
}

export const ExportView: React.FC<Props> = ({
  data,
  onExportJson,
  onCopyToClipboard,
  onBack,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await onCopyToClipboard();
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const summary = buildSummaryText(data);
  const activeMeds = data.medications.filter((m) => m.isActive);
  const totalLogs = data.doseLog.length;
  const totalSideEffects = data.sideEffectLog.length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
        </button>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Export Data
        </h2>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{activeMeds.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Active Meds</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{totalLogs}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Dose Logs</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{totalSideEffects}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Side Effects</p>
        </div>
      </div>

      {/* Export actions */}
      <div className="space-y-3 mb-6">
        <button
          onClick={onExportJson}
          className="w-full flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors text-left"
        >
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
            <Download size={20} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white text-sm">Download JSON</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Full backup of all medications, dose logs, and side effects
            </p>
          </div>
        </button>

        <button
          onClick={handleCopy}
          className="w-full flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors text-left"
        >
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
            {copied ? (
              <Check size={20} className="text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy size={20} className="text-emerald-600 dark:text-emerald-400" />
            )}
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white text-sm">
              {copied ? 'Copied!' : 'Copy Summary to Clipboard'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Text summary to share with your care team
            </p>
          </div>
        </button>
      </div>

      {/* Preview */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Summary Preview
        </h3>
        <pre className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 overflow-x-auto whitespace-pre-wrap font-mono max-h-64 overflow-y-auto">
          {summary}
        </pre>
      </div>

      {/* Privacy note */}
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 text-center">
        All data is stored locally on your device. Exports contain your medication data — share only with trusted care providers.
      </p>
    </div>
  );
};
