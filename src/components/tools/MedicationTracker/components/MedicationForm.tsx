 
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Medication, MedicationFrequency } from '../types';
import {
  DOSAGE_UNITS,
  FREQUENCY_LABELS,
  DEFAULT_TIMES,
  MEDICATION_COLORS,
} from '../constants';
import { cn } from '@/lib/utils';

interface Props {
  initial?: Medication;
  onSave: (med: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const MedicationForm: React.FC<Props> = ({ initial, onSave, onCancel }) => {
  const [name, setName] = useState(initial?.name ?? '');
  const [dosage, setDosage] = useState(initial?.dosage ?? '');
  const [unit, setUnit] = useState(initial?.unit ?? 'mg');
  const [frequency, setFrequency] = useState<MedicationFrequency>(
    initial?.frequency ?? 'once-daily'
  );
  const [timesOfDay, setTimesOfDay] = useState<string[]>(
    initial?.timesOfDay ?? DEFAULT_TIMES['once-daily']
  );
  const [startDate, setStartDate] = useState(
    initial?.startDate ?? new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(initial?.endDate ?? '');
  const [prescriber, setPrescriber] = useState(initial?.prescriber ?? '');
  const [pharmacy, setPharmacy] = useState(initial?.pharmacy ?? '');
  const [supplyCount, setSupplyCount] = useState<string>(
    initial?.supplyCount?.toString() ?? ''
  );
  const [refillDate, setRefillDate] = useState(initial?.refillDate ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [color, setColor] = useState(
    initial?.color ?? MEDICATION_COLORS[0].hex
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-update times when frequency changes (only for new medications)
  useEffect(() => {
    if (!initial) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimesOfDay(DEFAULT_TIMES[frequency]);
    }
  }, [frequency, initial]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Medication name is required';
    if (!dosage.trim()) errs.dosage = 'Dosage is required';
    if (frequency !== 'as-needed' && timesOfDay.length === 0) {
      errs.times = 'At least one time of day is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      name: name.trim(),
      dosage: dosage.trim(),
      unit,
      frequency,
      timesOfDay: frequency === 'as-needed' ? [] : timesOfDay,
      startDate,
      endDate: endDate || undefined,
      prescriber: prescriber.trim() || undefined,
      pharmacy: pharmacy.trim() || undefined,
      supplyCount: supplyCount ? parseInt(supplyCount, 10) : undefined,
      refillDate: refillDate || undefined,
      notes: notes.trim() || undefined,
      color,
      isActive: initial?.isActive ?? true,
    });
  };

  const updateTime = (index: number, value: string) => {
    setTimesOfDay((prev) => prev.map((t, i) => (i === index ? value : t)));
  };

  const addTime = () => setTimesOfDay((prev) => [...prev, '12:00']);
  const removeTime = (index: number) =>
    setTimesOfDay((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {initial ? 'Edit Medication' : 'Add Medication'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Medication Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sertraline"
              className={cn(
                'w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500',
                errors.name ? 'border-red-400' : 'border-slate-300 dark:border-slate-600'
              )}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1" role="alert">{errors.name}</p>
            )}
          </div>

          {/* Dosage + Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Dosage *
              </label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g. 50"
                className={cn(
                  'w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500',
                  errors.dosage ? 'border-red-400' : 'border-slate-300 dark:border-slate-600'
                )}
              />
              {errors.dosage && (
                <p className="text-sm text-red-500 mt-1" role="alert">{errors.dosage}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {DOSAGE_UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as MedicationFrequency)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {Object.entries(FREQUENCY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Times of Day */}
          {frequency !== 'as-needed' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Times of Day
              </label>
              <div className="space-y-2">
                {timesOfDay.map((time, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => updateTime(idx, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    {timesOfDay.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTime(idx)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        aria-label="Remove time"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addTime}
                className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                + Add time
              </button>
              {errors.times && (
                <p className="text-sm text-red-500 mt-1" role="alert">{errors.times}</p>
              )}
            </div>
          )}

          {/* Start / End Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Prescriber */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Prescriber
            </label>
            <input
              type="text"
              value={prescriber}
              onChange={(e) => setPrescriber(e.target.value)}
              placeholder="Dr. Smith"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Pharmacy */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Pharmacy
            </label>
            <input
              type="text"
              value={pharmacy}
              onChange={(e) => setPharmacy(e.target.value)}
              placeholder="e.g. CVS Pharmacy"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Supply / Refill */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Supply Count
              </label>
              <input
                type="number"
                min="0"
                value={supplyCount}
                onChange={(e) => setSupplyCount(e.target.value)}
                placeholder="e.g. 30"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Refill Date
              </label>
              <input
                type="date"
                value={refillDate}
                onChange={(e) => setRefillDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Color picker */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Color Label
            </label>
            <div className="flex gap-2 flex-wrap">
              {MEDICATION_COLORS.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setColor(c.hex)}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 transition-all',
                    color === c.hex
                      ? 'border-slate-900 dark:border-white scale-110'
                      : 'border-transparent hover:scale-105'
                  )}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.label}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Take with food, avoid alcohol..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors font-medium"
            >
              {initial ? 'Save Changes' : 'Add Medication'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
