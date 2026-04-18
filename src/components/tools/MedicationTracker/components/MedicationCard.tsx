 
import React from 'react';
import { Edit2, Trash2, Clock, TrendingUp } from 'lucide-react';
import type { Medication, AdherenceStats } from '../types';
import { FREQUENCY_LABELS } from '../constants';
import { cn } from '@/lib/utils';

interface Props {
  medication: Medication;
  adherence: AdherenceStats;
  onEdit: () => void;
  onDelete: () => void;
}

export const MedicationCard: React.FC<Props> = ({
  medication,
  adherence,
  onEdit,
  onDelete,
}) => {
  const pct = adherence.percentage;
  // SVG circular progress
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const adherenceColor =
    pct >= 80 ? 'text-emerald-500' : pct >= 50 ? 'text-amber-500' : 'text-red-500';

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        {/* Color accent + adherence ring */}
        <div className="relative flex-shrink-0">
          <svg width="52" height="52" className="transform -rotate-90">
            <circle
              cx="26"
              cy="26"
              r={radius}
              fill="none"
              strokeWidth="4"
              className="stroke-slate-200 dark:stroke-slate-700"
            />
            <circle
              cx="26"
              cy="26"
              r={radius}
              fill="none"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={cn('transition-all duration-500', adherenceColor.replace('text-', 'stroke-'))}
            />
          </svg>
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: medication.color }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900 dark:text-white truncate">
              {medication.name}
            </h3>
            {!medication.isActive && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-700 text-slate-500 dark:text-neutral-400">
                Inactive
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 dark:text-neutral-400">
            {medication.dosage} {medication.unit} &middot; {FREQUENCY_LABELS[medication.frequency]}
          </p>
          {medication.timesOfDay.length > 0 && (
            <div className="flex items-center gap-1 mt-1 text-xs text-slate-500 dark:text-neutral-500">
              <Clock size={12} />
              <span>{medication.timesOfDay.join(', ')}</span>
            </div>
          )}
          {adherence.total > 0 && (
            <div className="flex items-center gap-1 mt-1 text-xs">
              <TrendingUp size={12} className={adherenceColor} />
              <span className={adherenceColor}>
                {pct}% adherence
              </span>
              {adherence.currentStreak > 0 && (
                <span className="text-slate-400 dark:text-neutral-500">
                  &middot; {adherence.currentStreak}-day streak
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={onEdit}
            className="p-2 rounded-lg text-slate-400 dark:text-neutral-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
            aria-label={`Edit ${medication.name}`}
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg text-slate-400 dark:text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            aria-label={`Delete ${medication.name}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Prescriber / refill warnings */}
      {medication.prescriber && (
        <p className="text-xs text-slate-400 dark:text-neutral-500 mt-2">
          Prescribed by {medication.prescriber}
        </p>
      )}
      {medication.refillDate && (
        (() => {
          const daysUntil = Math.ceil(
            // eslint-disable-next-line react-hooks/purity
            (new Date(medication.refillDate + 'T00:00:00').getTime() - Date.now()) / 86_400_000
          );
          if (daysUntil <= 7 && daysUntil >= 0) {
            return (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium">
                Refill due in {daysUntil} day{daysUntil !== 1 ? 's' : ''}
              </p>
            );
          }
          if (daysUntil < 0) {
            return (
              <p className="text-xs text-red-500 mt-1 font-medium">
                Refill overdue by {Math.abs(daysUntil)} day{Math.abs(daysUntil) !== 1 ? 's' : ''}
              </p>
            );
          }
          return null;
        })()
      )}
    </div>
  );
};
