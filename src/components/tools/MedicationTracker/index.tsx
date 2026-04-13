import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Pill,
  History,
  BarChart3,
  Download,
  ShieldCheck,
  CalendarDays,
} from 'lucide-react';
import { useMedicationTracker } from './hooks/useMedicationTracker';
import { MedicationForm } from './components/MedicationForm';
import { MedicationCard } from './components/MedicationCard';
import { DoseLogger } from './components/DoseLogger';
import { AdherenceChart } from './components/AdherenceChart';
import { HistoryView } from './components/HistoryView';
import { ExportView } from './components/ExportView';
import { nowISO } from './constants';
import ToolRecommendation from '../shared/ToolRecommendation';
import SEO from '@/components/SEO';
import type { Medication, DoseStatus } from './types';
import { cn } from '@/lib/utils';

type View = 'dashboard' | 'add' | 'edit' | 'history' | 'insights' | 'export';

/** Shared page shell -- clean white bg, centered content, navbar clearance */
const PageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16 px-4 sm:px-6">
    <div className="mx-auto w-full max-w-2xl">{children}</div>
  </div>
);

const MedicationTracker: React.FC = () => {
  const navigate = useNavigate();
  const {
    data,
    activeMeds,
    todaySchedule,
    overallAdherence,
    addMedication,
    editMedication,
    removeMedication,
    addDoseLog,
    removeDoseLog,
    getMedAdherence,
    exportJson,
    copyToClipboard,
  } = useMedicationTracker();

  const [view, setView] = useState<View>('dashboard');
  const [editingMed, setEditingMed] = useState<Medication | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // ── Handlers ───────────────────────────────────────────────────────────

  const handleSaveNew = (med: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>) => {
    addMedication(med);
    setView('dashboard');
  };

  const handleSaveEdit = (med: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingMed) {
      editMedication(editingMed.id, med);
      setEditingMed(null);
      setView('dashboard');
    }
  };

  const handleDelete = (id: string) => {
    removeMedication(id);
    setConfirmDelete(null);
  };

  const handleLogDose = (
    medicationId: string,
    scheduledISO: string,
    status: DoseStatus,
    notes?: string
  ) => {
    addDoseLog({
      medicationId,
      scheduledTime: scheduledISO,
      status,
      takenAt: status === 'taken' ? nowISO() : undefined,
      notes,
    });
  };

  // ── Views ──────────────────────────────────────────────────────────────

  // Add / Edit medication form
  if (view === 'add') {
    return (
      <MedicationForm
        onSave={handleSaveNew}
        onCancel={() => setView('dashboard')}
      />
    );
  }

  if (view === 'edit' && editingMed) {
    return (
      <MedicationForm
        initial={editingMed}
        onSave={handleSaveEdit}
        onCancel={() => {
          setEditingMed(null);
          setView('dashboard');
        }}
      />
    );
  }

  // History
  if (view === 'history') {
    return (
      <PageShell>
        <HistoryView
          data={data}
          onDeleteLog={removeDoseLog}
          onBack={() => setView('dashboard')}
        />
      </PageShell>
    );
  }

  // Insights
  if (view === 'insights') {
    return (
      <PageShell>
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setView('dashboard')}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
          </button>
          <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
            Adherence Insights
          </h2>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <AdherenceChart data={data} />
        </div>
      </PageShell>
    );
  }

  // Export
  if (view === 'export') {
    return (
      <PageShell>
        <ExportView
          data={data}
          onExportJson={exportJson}
          onCopyToClipboard={copyToClipboard}
          onBack={() => setView('dashboard')}
        />
      </PageShell>
    );
  }

  // ── Dashboard (default) ────────────────────────────────────────────────

  const pendingDoses = todaySchedule.filter((d) => !d.logged);
  const completedDoses = todaySchedule.filter((d) => d.logged);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16 px-4 sm:px-6">
      <SEO title="Medication Tracker | Psychage" description="Track your medication schedule, log doses, and monitor adherence over time." />
      <div className="mx-auto w-full max-w-2xl">

        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/tools')}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Tools
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Pill size={20} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Medication Tracker
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mt-2 ml-[52px]">
            <ShieldCheck size={13} className="text-emerald-500/70" />
            <span>All data stays on your device</span>
          </div>
        </div>

        {/* ── Stats Overview ────────────────────────────────────────── */}
        {activeMeds.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {overallAdherence.percentage}%
              </p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 uppercase tracking-wide">
                7-day adherence
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {overallAdherence.currentStreak}
              </p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 uppercase tracking-wide">
                Day streak
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {pendingDoses.length}
              </p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 uppercase tracking-wide">
                Remaining
              </p>
            </div>
          </div>
        )}

        {/* ── Today's Schedule ──────────────────────────────────────── */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-slate-400 dark:text-slate-500" />
              <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                Today&apos;s Schedule
              </h2>
            </div>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              {new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <DoseLogger schedule={todaySchedule} onLog={handleLogDose} />
          </div>

          {completedDoses.length > 0 && pendingDoses.length === 0 && todaySchedule.length > 0 && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/50 text-center">
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                All doses logged for today!
              </p>
            </div>
          )}

          <ToolRecommendation
            signal={{
              toolSlug: 'medication-tracker',
              medAdherence: overallAdherence.percentage,
              medStreak: overallAdherence.currentStreak,
            }}
            className="mt-6"
          />
        </section>

        {/* ── My Medications ────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Pill size={16} className="text-slate-400 dark:text-slate-500" />
              <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                My Medications
              </h2>
            </div>
            <button
              onClick={() => setView('add')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <Plus size={14} />
              Add
            </button>
          </div>

          {data.medications.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Pill size={28} className="text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium mb-1">
                No medications added yet
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mb-6 max-w-xs mx-auto">
                Add your first medication to start tracking doses and adherence.
              </p>
              <button
                onClick={() => setView('add')}
                className="px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Add Medication
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {data.medications.map((med) => (
                <React.Fragment key={med.id}>
                  <MedicationCard
                    medication={med}
                    adherence={getMedAdherence(med.id)}
                    onEdit={() => {
                      setEditingMed(med);
                      setView('edit');
                    }}
                    onDelete={() => setConfirmDelete(med.id)}
                  />
                  {/* Inline delete confirmation */}
                  {confirmDelete === med.id && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 flex items-center justify-between gap-4">
                      <p className="text-sm text-red-700 dark:text-red-400">
                        Delete <strong>{med.name}</strong> and all its logs?
                      </p>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(med.id)}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </section>

        {/* ── Quick Navigation ──────────────────────────────────────── */}
        {activeMeds.length > 0 && (
          <section>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setView('history')}
                className={cn(
                  'flex flex-col items-center gap-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm',
                  'hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all'
                )}
              >
                <History size={20} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  History
                </span>
              </button>
              <button
                onClick={() => setView('insights')}
                className={cn(
                  'flex flex-col items-center gap-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm',
                  'hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all'
                )}
              >
                <BarChart3 size={20} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Insights
                </span>
              </button>
              <button
                onClick={() => setView('export')}
                className={cn(
                  'flex flex-col items-center gap-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm',
                  'hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all'
                )}
              >
                <Download size={20} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Export
                </span>
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MedicationTracker;
