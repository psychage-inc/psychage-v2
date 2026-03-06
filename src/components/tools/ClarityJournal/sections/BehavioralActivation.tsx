import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import MoodSlider from '../components/MoodSlider';
import PredictionGapIndicator from '../components/PredictionGapIndicator';
import { useClarityJournal } from '../hooks/useClarityJournal';
import { ACTIVATION_TYPES } from '../constants';
import { getToday, generateId, nowISO, formatDate } from '../dates';
import type { BehavioralActivationEntry } from '../types';

const BehavioralActivation: React.FC = () => {
  const navigate = useNavigate();
  const { data, addActivation, deleteActivation } = useClarityJournal();

  const [showForm, setShowForm] = useState(false);
  const [activity, setActivity] = useState('');
  const [predicted, setPredicted] = useState(5);
  const [actual, setActual] = useState(5);
  const [type, setType] = useState<BehavioralActivationEntry['type']>('pleasure');

  const handleSave = () => {
    if (!activity.trim()) return;
    const entry: BehavioralActivationEntry = {
      id: generateId(),
      date: getToday(),
      activity: activity.trim(),
      predictedMood: predicted,
      actualMood: actual,
      type,
      createdAt: nowISO(),
    };
    addActivation(entry);
    setActivity('');
    setPredicted(5);
    setActual(5);
    setType('pleasure');
    setShowForm(false);
  };

  const entries = data.behavioralActivation;

  // Best activities this week
  const weekEntries = entries.filter(e => {
    const diff = (new Date(getToday()).getTime() - new Date(e.date).getTime()) / 86400000;
    return diff <= 7;
  });
  const bestActivities = [...weekEntries]
    .sort((a, b) => b.actualMood - a.actualMood)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <SEO title="Behavioral Activation | Clarity Journal" description="Track activities and their mood impact." />
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8"><Breadcrumbs /></div>
        <button onClick={() => navigate('/tools/clarity-journal')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Behavioral Activation</h1>
            <p className="text-slate-500 mt-1">Do more of what helps. Do less of what does not.</p>
          </div>
          {!showForm && (
            <Button variant="primary" size="sm" onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          )}
        </div>

        {/* Add form */}
        {showForm && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">What did you do?</label>
              <input
                type="text"
                value={activity}
                onChange={e => setActivity(e.target.value)}
                placeholder="e.g., Went for a 20-minute walk"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <MoodSlider value={predicted} onChange={setPredicted} label="How did you think this would make you feel? (predicted)" />
            <MoodSlider value={actual} onChange={setActual} label="How did it actually make you feel? (actual)" />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
              <div className="flex gap-2">
                {ACTIVATION_TYPES.map(t => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setType(t.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      type === t.value ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t.label} ({t.shortLabel})
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="primary" onClick={handleSave} disabled={!activity.trim()}>Save</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </motion.div>
        )}

        {/* Weekly summary */}
        {bestActivities.length > 0 && (
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-6">
            <p className="text-sm font-semibold text-teal-800 mb-2">Activities that boosted your mood this week:</p>
            <ul className="space-y-1">
              {bestActivities.map(a => (
                <li key={a.id} className="text-sm text-teal-700">
                  {a.activity} — mood: {a.actualMood}/10
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Entry list */}
        {entries.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-sm">No entries yet. Start by tracking an activity.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map(entry => (
              <div key={entry.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{entry.activity}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-400">{formatDate(entry.date)}</span>
                    <span className="text-xs text-slate-400">Predicted: {entry.predictedMood} → Actual: {entry.actualMood}</span>
                    <PredictionGapIndicator predicted={entry.predictedMood} actual={entry.actualMood} />
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full shrink-0">
                  {ACTIVATION_TYPES.find(t => t.value === entry.type)?.shortLabel || entry.type}
                </span>
                <button onClick={() => deleteActivation(entry.id)} className="text-slate-300 hover:text-red-500 transition-colors shrink-0" aria-label="Delete entry">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BehavioralActivation;
