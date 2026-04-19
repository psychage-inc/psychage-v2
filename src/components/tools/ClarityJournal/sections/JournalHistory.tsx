import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useClarityJournal } from '../hooks/useClarityJournal';
import { formatDate } from '../dates';
import { MOOD_EMOJIS } from '../constants';

type FilterType = 'all' | 'daily' | 'screening' | 'activation' | 'reflection';

const JournalHistory: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useClarityJournal();
  const [filter, setFilter] = useState<FilterType>('all');

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'daily', label: 'Check-Ins' },
    { value: 'screening', label: 'Screenings' },
    { value: 'activation', label: 'Activities' },
    { value: 'reflection', label: 'Reflections' },
  ];

  // Build unified timeline
  type TimelineEntry = { type: string; date: string; content: React.ReactNode; id: string };
  const entries: TimelineEntry[] = [];

  if (filter === 'all' || filter === 'daily') {
    data.dailyCheckIns.forEach(c => {
      entries.push({
        type: 'Check-In',
        date: c.date,
        id: `daily-${c.id}`,
        content: (
          <div>
            <span className="mr-2">{MOOD_EMOJIS[c.mood] || ''}</span>
            Mood: {c.mood}/10 | Energy: {c.energy}/10 | Sleep: {c.sleepHours}h ({c.sleepQuality})
            {c.oneSentence && <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 italic">"{c.oneSentence}"</p>}
          </div>
        ),
      });
    });
  }

  if (filter === 'all' || filter === 'screening') {
    data.weeklyScreenings.forEach(s => {
      entries.push({
        type: 'Screening',
        date: s.weekStartDate,
        id: `screening-${s.id}`,
        content: (
          <div className="flex flex-wrap gap-3 text-xs">
            <span>PHQ-2: {s.phq2.total}/6</span>
            <span>GAD-2: {s.gad2.total}/6</span>
            <span>Stress: {s.pss4.total}/8</span>
            <span>Well-being: {s.who5.total}/10</span>
          </div>
        ),
      });
    });
  }

  if (filter === 'all' || filter === 'activation') {
    data.behavioralActivation.forEach(a => {
      entries.push({
        type: 'Activity',
        date: a.date,
        id: `activation-${a.id}`,
        content: (
          <div>
            {a.activity} — Predicted: {a.predictedMood} → Actual: {a.actualMood}
          </div>
        ),
      });
    });
  }

  if (filter === 'all' || filter === 'reflection') {
    data.weeklyReflections.forEach(r => {
      entries.push({
        type: 'Reflection',
        date: r.weekStartDate,
        id: `reflection-${r.id}`,
        content: (
          <div>
            {r.wentWell && <p className="text-xs"><strong>Went well:</strong> {r.wentWell}</p>}
            {r.wasDifficult && <p className="text-xs mt-1"><strong>Difficult:</strong> {r.wasDifficult}</p>}
          </div>
        ),
      });
    });
  }

  // Sort by date descending
  entries.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-24 pb-12 px-6">
      <SEO title="History | Clarity Journal" description="View your complete journal history." />
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8"><Breadcrumbs /></div>
        <button onClick={() => navigate('/tools/clarity-journal')} className="flex items-center gap-2 text-sm text-slate-500 dark:text-neutral-400 hover:text-teal-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </button>

        <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 dark:text-neutral-100 mb-6">Journal History</h1>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                filter === f.value ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-12 text-slate-400 dark:text-neutral-500 text-sm">No entries yet.</div>
        ) : (
          <div className="space-y-3">
            {entries.map(entry => (
              <div key={entry.id} className="bg-white dark:bg-neutral-900 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-neutral-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{entry.type}</span>
                  <span className="text-xs text-slate-400 dark:text-neutral-500">{formatDate(entry.date)}</span>
                </div>
                <div className="text-sm text-slate-700 dark:text-neutral-300">{entry.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalHistory;
