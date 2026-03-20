import React, { useState } from 'react';
import { Check, X, Clock, MessageSquare } from 'lucide-react';
import type { ScheduledDose, DoseStatus } from '../types';
import { FREQUENCY_LABELS } from '../constants';
import { cn } from '@/lib/utils';

interface Props {
  schedule: ScheduledDose[];
  onLog: (medicationId: string, scheduledISO: string, status: DoseStatus, notes?: string) => void;
}

export const DoseLogger: React.FC<Props> = ({ schedule, onLog }) => {
  const [noteFor, setNoteFor] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  if (schedule.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        <Clock size={32} className="mx-auto mb-2 opacity-50" />
        <p className="text-sm">No doses scheduled for today.</p>
        <p className="text-xs mt-1">Add a medication to start tracking.</p>
      </div>
    );
  }

  const handleLog = (dose: ScheduledDose, status: DoseStatus) => {
    const notes = noteFor === dose.scheduledISO ? noteText.trim() || undefined : undefined;
    onLog(dose.medication.id, dose.scheduledISO, status, notes);
    if (noteFor === dose.scheduledISO) {
      setNoteFor(null);
      setNoteText('');
    }
  };

  const now = new Date();
  const currentHHMM = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return (
    <div className="space-y-3">
      {schedule.map((dose) => {
        const isLogged = !!dose.logged;
        const isPast = dose.scheduledTime < currentHHMM;
        const showNote = noteFor === dose.scheduledISO;

        return (
          <div
            key={dose.scheduledISO}
            className={cn(
              'rounded-xl border p-4 transition-all',
              isLogged
                ? dose.logged!.status === 'taken'
                  ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800'
                  : dose.logged!.status === 'skipped'
                    ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800'
                    : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
            )}
          >
            <div className="flex items-center gap-3">
              {/* Color dot */}
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: dose.medication.color }}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 dark:text-white text-sm truncate">
                  {dose.medication.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {dose.medication.dosage} {dose.medication.unit} &middot; {dose.scheduledTime}
                  {' '}&middot; {FREQUENCY_LABELS[dose.medication.frequency]}
                </p>
              </div>

              {/* Status / Actions */}
              {isLogged ? (
                <span
                  className={cn(
                    'text-xs font-medium px-2.5 py-1 rounded-full',
                    dose.logged!.status === 'taken' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
                    dose.logged!.status === 'skipped' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                    dose.logged!.status === 'missed' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  )}
                >
                  {dose.logged!.status === 'taken' && 'Taken'}
                  {dose.logged!.status === 'skipped' && 'Skipped'}
                  {dose.logged!.status === 'missed' && 'Missed'}
                </span>
              ) : (
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleLog(dose, 'taken')}
                    className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                    aria-label="Mark as taken"
                    title="Taken"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => handleLog(dose, 'skipped')}
                    className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                    aria-label="Mark as skipped"
                    title="Skipped"
                  >
                    <X size={16} />
                  </button>
                  {isPast && (
                    <button
                      onClick={() => handleLog(dose, 'missed')}
                      className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      aria-label="Mark as missed"
                      title="Missed"
                    >
                      <Clock size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setNoteFor(showNote ? null : dose.scheduledISO);
                      setNoteText('');
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Add note"
                    title="Add note"
                  >
                    <MessageSquare size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Note input */}
            {showNote && !isLogged && (
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Optional note (e.g. took with food)"
                  className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
              </div>
            )}

            {/* Display logged note */}
            {isLogged && dose.logged!.notes && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
                {dose.logged!.notes}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
