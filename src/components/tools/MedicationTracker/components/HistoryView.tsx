import React, { useState, useMemo } from 'react';
import { ArrowLeft, Trash2, Filter } from 'lucide-react';
import type { MedicationTrackerData, DoseStatus } from '../types';
import { cn } from '@/lib/utils';

interface Props {
  data: MedicationTrackerData;
  onDeleteLog: (id: string) => void;
  onBack: () => void;
}

const STATUS_COLORS: Record<DoseStatus, string> = {
  taken: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  skipped: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  missed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export const HistoryView: React.FC<Props> = ({ data, onDeleteLog, onBack }) => {
  const [filterMed, setFilterMed] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const medMap = useMemo(() => {
    const map = new Map<string, { name: string; color: string }>();
    for (const m of data.medications) {
      map.set(m.id, { name: m.name, color: m.color });
    }
    return map;
  }, [data.medications]);

  const filtered = useMemo(() => {
    let logs = [...data.doseLog];
    if (filterMed !== 'all') {
      logs = logs.filter((d) => d.medicationId === filterMed);
    }
    if (filterStatus !== 'all') {
      logs = logs.filter((d) => d.status === filterStatus);
    }
    // Sort newest first
    logs.sort((a, b) => b.scheduledTime.localeCompare(a.scheduledTime));
    return logs;
  }, [data.doseLog, filterMed, filterStatus]);

  // Group by date
  const grouped = useMemo(() => {
    const groups = new Map<string, typeof filtered>();
    for (const log of filtered) {
      const date = log.scheduledTime.slice(0, 10);
      if (!groups.has(date)) groups.set(date, []);
      groups.get(date)!.push(log);
    }
    return groups;
  }, [filtered]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={20} className="text-slate-600 dark:text-neutral-400" />
        </button>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Dose History
        </h2>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400 dark:text-neutral-500" />
          <select
            value={filterMed}
            onChange={(e) => setFilterMed(e.target.value)}
            className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All medications</option>
            {data.medications.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">All statuses</option>
          <option value="taken">Taken</option>
          <option value="skipped">Skipped</option>
          <option value="missed">Missed</option>
        </select>
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-500 dark:text-neutral-400 text-sm">
          No dose logs found.
        </div>
      ) : (
        <div className="space-y-6">
          {Array.from(grouped.entries()).map(([date, logs]) => (
            <div key={date}>
              <h3 className="text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                {new Date(date + 'T00:00:00').toLocaleDateString(undefined, {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                })}
              </h3>
              <div className="space-y-2">
                {logs.map((log) => {
                  const med = medMap.get(log.medicationId);
                  return (
                    <div
                      key={log.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-neutral-800 border border-slate-100 dark:border-neutral-700"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: med?.color ?? '#94a3b8' }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {med?.name ?? 'Unknown'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-neutral-400">
                          Scheduled: {log.scheduledTime.slice(11, 16)}
                          {log.takenAt && ` · Taken: ${new Date(log.takenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                        </p>
                        {log.notes && (
                          <p className="text-xs text-slate-400 dark:text-neutral-500 italic mt-0.5">
                            {log.notes}
                          </p>
                        )}
                      </div>
                      <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', STATUS_COLORS[log.status])}>
                        {log.status}
                      </span>
                      <button
                        onClick={() => onDeleteLog(log.id)}
                        className="p-1.5 text-slate-300 dark:text-neutral-600 hover:text-red-500 transition-colors"
                        aria-label="Delete log"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
