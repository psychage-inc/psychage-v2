import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Plus, Clock, Trash2, ChevronRight } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import { ThoughtReframerWizard } from './ThoughtReframerWizard';
import type { ThoughtRecord } from './types';
import { COGNITIVE_DISTORTIONS } from './types';
import { loadRecords, saveRecords, deleteRecord, getRuminationCount, incrementRuminationCount } from './storage';

const getInitialRuminationCount = (): number => {
  const rum = getRuminationCount();
  const today = new Date().toDateString();
  return rum.date === today ? rum.count : 0;
};

const ThoughtReframer: React.FC = () => {
  const [view, setView] = useState<'landing' | 'wizard' | 'history'>('landing');
  const [records, setRecords] = useState<ThoughtRecord[]>(() => loadRecords());
  const [ruminationCount, setRuminationCount] = useState(() => getInitialRuminationCount());
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);

  const handleComplete = (record: ThoughtRecord) => {
    const updated = [record, ...records.filter(r => r.id !== record.id)];
    setRecords(updated);
    saveRecords(updated);
  };

  const handleDelete = (id: string) => {
    const updated = deleteRecord(id);
    setRecords(updated);
    if (expandedRecord === id) setExpandedRecord(null);
  };

  const handleStartWizard = () => {
    const count = incrementRuminationCount();
    setRuminationCount(count);
    setView('wizard');
  };

  const completedRecords = records.filter(r => r.completed);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  if (view === 'wizard') {
    return (
      <ThoughtReframerWizard
        onComplete={handleComplete}
        onCancel={() => setView('landing')}
        ruminationCount={ruminationCount}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <SEO
        title="Thought Reframer | Psychage"
        description="Learn to identify and reframe negative thought patterns with this guided CBT-based exercise."
      />
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Breadcrumbs />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Lightbulb size={40} className="text-amber-600" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Thought Reframer
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-8">
            Challenge negative thought patterns using a guided CBT-based exercise trusted by therapists worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleStartWizard}
              leftIcon={<Plus size={20} />}
              className="bg-gray-900 hover:bg-black text-white"
              size="lg"
            >
              New Thought Record
            </Button>
            {completedRecords.length > 0 && (
              <Button
                onClick={() => setView(view === 'history' ? 'landing' : 'history')}
                variant="outline"
                leftIcon={<Clock size={18} />}
                size="lg"
              >
                {view === 'history' ? 'Hide History' : `View History (${completedRecords.length})`}
              </Button>
            )}
          </div>
        </motion.div>

        {/* History section */}
        {view === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">
              Your Thought Records
            </h2>

            {completedRecords.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <Clock size={32} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No saved records yet</p>
                <p className="text-sm text-gray-400">
                  Complete your first thought record exercise to start building your history.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {completedRecords.map(record => {
                  const isExpanded = expandedRecord === record.id;
                  const distortionNames = record.distortions
                    .map(id => COGNITIVE_DISTORTIONS.find(d => d.id === id)?.name)
                    .filter(Boolean);

                  return (
                    <div
                      key={record.id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                      {/* Summary row */}
                      <button
                        onClick={() => setExpandedRecord(isExpanded ? null : record.id)}
                        className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                        aria-expanded={isExpanded}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 mb-1">{formatDate(record.createdAt)}</p>
                          <p className="text-sm text-gray-700 truncate">{record.situation}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {distortionNames.slice(0, 2).map(name => (
                              <span
                                key={name}
                                className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-xs"
                              >
                                {name}
                              </span>
                            ))}
                            {distortionNames.length > 2 && (
                              <span className="px-2 py-0.5 bg-gray-50 text-gray-400 rounded-full text-xs">
                                +{distortionNames.length - 2}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Emotion change indicator */}
                        {record.emotions.length > 0 && record.emotionsAfter.length > 0 && (
                          <div className="text-right shrink-0">
                            {(() => {
                              const avgBefore = record.emotions.reduce((s, e) => s + e.intensity, 0) / record.emotions.length;
                              const avgAfter = record.emotionsAfter.reduce((s, e) => s + e.intensity, 0) / record.emotionsAfter.length;
                              const diff = Math.round(avgAfter - avgBefore);
                              return (
                                <span className={`text-sm font-medium ${diff < 0 ? 'text-teal-600' : diff > 0 ? 'text-rose-500' : 'text-gray-400'}`}>
                                  {diff > 0 ? '+' : ''}{diff}%
                                </span>
                              );
                            })()}
                          </div>
                        )}

                        <ChevronRight
                          size={16}
                          className={`text-gray-300 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      </button>

                      {/* Expanded details */}
                      {isExpanded && (
                        <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-3">
                          <div>
                            <p className="text-xs text-rose-400 mb-1">Original thought</p>
                            <p className="text-sm text-gray-700 italic">"{record.automaticThought}"</p>
                          </div>
                          <div>
                            <p className="text-xs text-teal-500 mb-1">Balanced thought</p>
                            <p className="text-sm text-gray-700">"{record.balancedThought}"</p>
                          </div>
                          {record.evidenceFor && (
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Evidence for</p>
                              <p className="text-sm text-gray-600">{record.evidenceFor}</p>
                            </div>
                          )}
                          {record.evidenceAgainst && (
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Evidence against</p>
                              <p className="text-sm text-gray-600">{record.evidenceAgainst}</p>
                            </div>
                          )}
                          {record.actionableStep && (
                            <div>
                              <p className="text-xs text-amber-500 mb-1">Next step</p>
                              <p className="text-sm text-gray-600">{record.actionableStep}</p>
                            </div>
                          )}
                          {record.mantra && (
                            <div>
                              <p className="text-xs text-purple-500 mb-1">Mantra</p>
                              <p className="text-sm text-gray-700 italic">"{record.mantra}"</p>
                            </div>
                          )}
                          <div className="pt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(record.id);
                              }}
                              className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={14} />
                              Delete record
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* Landing: feature cards when no history shown */}
        {view === 'landing' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-gray-900 mb-1">7</p>
              <p className="text-sm text-gray-500">Guided steps</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-gray-900 mb-1">12</p>
              <p className="text-sm text-gray-500">Thinking traps</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-gray-900 mb-1">5-10</p>
              <p className="text-sm text-gray-500">Minutes per session</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ThoughtReframer;
