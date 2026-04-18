// Clarity Journal V2 — Daily Entry Orchestrator
// Modular dashboard for the day — sections can be completed in any order

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Smile, Dumbbell, Moon, AlertCircle, Heart, PenLine, ClipboardCheck,
  ChevronDown, ChevronUp, Check,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import MoodCheckInSection from './MoodCheckInSection';
import ActivityLogSection from './ActivityLogSection';
import SleepLogSection from './SleepLogSection';
import StressorLogSection from './StressorLogSection';
import CopingUseSection from './CopingUseSection';
import FreeFormSection from './FreeFormSection';
import WeeklyScreenerV2 from './WeeklyScreenerV2';
import CrisisOverlay from './CrisisOverlay';
import { useClarityJournal } from '../hooks/useClarityJournal';
import { getToday, formatDate } from '../dates';

const SECTIONS = [
  { id: 'mood', label: 'Mood Check-In', icon: Smile, color: 'teal' },
  { id: 'activity', label: 'Activity Log', icon: Dumbbell, color: 'indigo' },
  { id: 'sleep', label: 'Sleep Log', icon: Moon, color: 'sky' },
  { id: 'stressor', label: 'Stressors', icon: AlertCircle, color: 'amber' },
  { id: 'coping', label: 'Coping Tools', icon: Heart, color: 'rose' },
  { id: 'freeform', label: 'Free Write', icon: PenLine, color: 'violet' },
  { id: 'screener', label: 'Weekly Screener', icon: ClipboardCheck, color: 'emerald' },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

const DailyEntryV2: React.FC = () => {
  const navigate = useNavigate();
  const {
    data,
    todayJournal,
    todaySections,
    todaySectionCount,
    addMoodCheckIn,
    addBehavioralLog,
    addSleepEntry,
    addStressor,
    addCopingUse,
    addFreeFormEntry,
    addScreening,
    addSafetyFlag: addFlag,
  } = useClarityJournal();

  const today = getToday();
  const [expandedSection, setExpandedSection] = useState<SectionId | null>('mood');
  const [crisisOpen, setCrisisOpen] = useState(false);

  const toggleSection = (id: SectionId) => {
    setExpandedSection(prev => (prev === id ? null : id));
  };

  const handleCrisisDetected = () => {
    setCrisisOpen(true);
    addFlag({
      date: today,
      source: 'keyword',
      details: 'Crisis keyword detected in journal entry',
    });
  };

  const handleScreenerCrisis = () => {
    setCrisisOpen(true);
    addFlag({
      date: today,
      source: 'screener',
      details: 'Safety concern flagged during weekly screening',
    });
  };

  const isSectionComplete = (id: SectionId): boolean => {
    switch (id) {
      case 'mood': return todaySections.mood;
      case 'activity': return todaySections.activity;
      case 'sleep': return todaySections.sleep;
      case 'stressor': return todaySections.stressor;
      case 'coping': return todaySections.coping;
      case 'freeform': return todaySections.freeForm;
      case 'screener': return false; // Not tracked per-day
      default: return false;
    }
  };

  // Check if it's the user's screener day
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayDayName = dayNames[new Date().getDay()];
  const isScreenerDay = todayDayName === data.settings.weeklyScreenerDay;

  // Filter sections — only show screener on the designated day
  const visibleSections = SECTIONS.filter(s => {
    if (s.id === 'screener' && !isScreenerDay) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0a0a0a] pt-24 pb-16 px-4 sm:px-6">
      <SEO title="Daily Journal | Clarity Journal" description="Your daily mental health check-in." />
      <CrisisOverlay isOpen={crisisOpen} onClose={() => setCrisisOpen(false)} />

      <div className="container mx-auto max-w-2xl">
        <div className="mb-6"><Breadcrumbs /></div>

        <button
          onClick={() => navigate('/tools/clarity-journal')}
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-neutral-400 hover:text-teal-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight">
            {formatDate(today)}
          </h1>
          <p className="text-slate-500 dark:text-neutral-400 mt-1 text-sm">
            {todaySectionCount > 0
              ? `${todaySectionCount} section${todaySectionCount > 1 ? 's' : ''} completed today`
              : 'Start wherever feels right'}
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-teal-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (todaySectionCount / 6) * 100)}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Collapsible sections */}
        <div className="space-y-3">
          {visibleSections.map((section, i) => {
            const Icon = section.icon;
            const isExpanded = expandedSection === section.id;
            const isComplete = isSectionComplete(section.id);

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-white/10 shadow-sm overflow-hidden"
              >
                {/* Section header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isComplete
                      ? 'bg-teal-100 dark:bg-teal-900/30'
                      : 'bg-slate-100 dark:bg-neutral-800'
                  }`}>
                    {isComplete ? (
                      <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    ) : (
                      <Icon className="w-4 h-4 text-slate-500 dark:text-neutral-400" strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{section.label}</p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 dark:text-neutral-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 dark:text-neutral-500 shrink-0" />
                  )}
                </button>

                {/* Section content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 pt-1 border-t border-slate-100 dark:border-neutral-800">
                        {section.id === 'mood' && (
                          <MoodCheckInSection
                            onSave={(checkIn) => addMoodCheckIn(today, checkIn)}
                            existingCheckIns={todayJournal?.moodCheckIns || []}
                          />
                        )}
                        {section.id === 'activity' && (
                          <ActivityLogSection
                            onSave={(log) => addBehavioralLog(today, log)}
                            existing={todayJournal?.behavioralLog}
                          />
                        )}
                        {section.id === 'sleep' && (
                          <SleepLogSection
                            date={today}
                            onSave={(entry) => addSleepEntry(today, entry)}
                            existing={todayJournal?.sleepEntry}
                          />
                        )}
                        {section.id === 'stressor' && (
                          <StressorLogSection
                            onSave={(stressor) => addStressor(today, stressor)}
                            existingStressors={todayJournal?.stressors || []}
                          />
                        )}
                        {section.id === 'coping' && (
                          <CopingUseSection
                            onSave={(entry) => addCopingUse(today, entry)}
                            existingUses={todayJournal?.copingUses || []}
                          />
                        )}
                        {section.id === 'freeform' && (
                          <FreeFormSection
                            onSave={(entry) => addFreeFormEntry(today, entry)}
                            onCrisisDetected={handleCrisisDetected}
                            showPrompts={data.settings.showGuidedPrompts}
                          />
                        )}
                        {section.id === 'screener' && (
                          <WeeklyScreenerV2
                            onSave={(screening) => addScreening(screening)}
                            onCrisisDetected={handleScreenerCrisis}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyEntryV2;
