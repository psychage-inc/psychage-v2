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
} from 'lucide-react';
import { useMedicationTracker } from './hooks/useMedicationTracker';
import { MedicationForm } from './components/MedicationForm';
import { MedicationCard } from './components/MedicationCard';
import { DoseLogger } from './components/DoseLogger';
import { AdherenceChart } from './components/AdherenceChart';
import { HistoryView } from './components/HistoryView';
import { ExportView } from './components/ExportView';
import { nowISO } from './constants';
import type { Medication, DoseStatus } from './types';
import { cn } from '@/lib/utils';

type View = 'dashboard' | 'add' | 'edit' | 'history' | 'insights' | 'export';

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
      <div className="min-h-screen bg-emerald-50/30 dark:bg-slate-950 pt-24 pb-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl">
          <HistoryView
            data={data}
            onDeleteLog={removeDoseLog}
            onBack={() => setView('dashboard')}
          />
        </div>
      </div>
    );
  }

  // Insights
  if (view === 'insights') {
    return (
      <div className="min-h-screen bg-emerald-50/30 dark:bg-slate-950 pt-24 pb-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setView('dashboard')}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
            </button>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Adherence Insights
            </h2>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <AdherenceChart data={data} />
          </div>
        </div>
      </div>
    );
  }

  // Export
  if (view === 'export') {
    return (
      <div className="min-h-screen bg-emerald-50/30 dark:bg-slate-950 pt-24 pb-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl">
          <ExportView
            data={data}
            onExportJson={exportJson}
            onCopyToClipboard={copyToClipboard}
            onBack={() => setView('dashboard')}
          />
        </div>
      </div>
    );
  }

  // ── Dashboard (default) ────────────────────────────────────────────────

  const pendingDoses = todaySchedule.filter((d) => !d.logged);
  const completedDoses = todaySchedule.filter((d) => d.logged);

  return (
    <div className="min-h-screen bg-emerald-50/30 dark:bg-slate-950 pt-24 pb-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-3xl">
        {/* Back + Title */}
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate('/tools')}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Back to tools"
          >
            <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
          </button>
          <div className="flex items-center gap-2">
            <Pill size={24} className="text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Medication Tracker
            </h1>
          </div>
        </div>

        {/* Privacy badge */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 ml-12">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>All data stays on your device</span>
        </div>

        {/* Quick stats */}
        {activeMeds.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-center">
              <p className="text-xl font-bold text-emerald-600">
                {overallAdherence.percentage}%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">7-day adherence</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-center">
              <p className="text-xl font-bold text-emerald-600">
                {overallAdherence.currentStreak}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Day streak</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-center">
              <p className="text-xl font-bold text-emerald-600">
                {pendingDoses.length}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Doses remaining</p>
            </div>
          </div>
        )}

        {/* Today's Schedule */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Today&apos;s Schedule
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <DoseLogger schedule={todaySchedule} onLog={handleLogDose} />

          {completedDoses.length > 0 && pendingDoses.length === 0 && todaySchedule.length > 0 && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-center">
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                All doses logged for today!
              </p>
            </div>
          )}
        </div>

        {/* My Medications */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              My Medications
            </h2>
            <button
              onClick={() => setView('add')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          {data.medications.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Pill size={40} className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">
                No medications added yet
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mb-4">
                Add your first medication to start tracking doses and adherence.
              </p>
              <button
                onClick={() => setView('add')}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
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
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 flex items-center justify-between">
                      <p className="text-sm text-red-700 dark:text-red-400">
                        Delete <strong>{med.name}</strong> and all its logs?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="px-3 py-1 text-sm rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(med.id)}
                          className="px-3 py-1 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
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
        </div>

        {/* Quick navigation */}
        {activeMeds.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setView('history')}
              className={cn(
                'flex flex-col items-center gap-1.5 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
                'hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors'
              )}
            >
              <History size={20} className="text-emerald-600" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                History
              </span>
            </button>
            <button
              onClick={() => setView('insights')}
              className={cn(
                'flex flex-col items-center gap-1.5 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
                'hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors'
              )}
            >
              <BarChart3 size={20} className="text-emerald-600" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Insights
              </span>
            </button>
            <button
              onClick={() => setView('export')}
              className={cn(
                'flex flex-col items-center gap-1.5 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
                'hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors'
              )}
            >
              <Download size={20} className="text-emerald-600" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Export
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationTracker;
