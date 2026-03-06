import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, ShieldCheck, BookOpen, BarChart3, Clock, Settings2 } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import PrivacyNotice from './components/PrivacyNotice';
import StreakTracker from './components/StreakTracker';
import QuickActionCard from './components/QuickActionCard';
import SectionCard from './components/SectionCard';
import TrendChart from './components/TrendChart';
import ExportImportControls from './components/ExportImportControls';
import { useClarityJournal } from './hooks/useClarityJournal';
import { JOURNAL_SECTIONS, PRIVACY_NOTICE } from './constants';
import { formatDate } from './dates';

const ClarityJournal: React.FC = () => {
  const navigate = useNavigate();
  const {
    data,
    streak,
    todayCheckIn,
    updatePreferences,
    exportData,
    importData,
    clearData,
  } = useClarityJournal();

  const [showWelcome, setShowWelcome] = useState(!data.preferences.firstVisitCompleted);
  const [showExport, setShowExport] = useState(false);

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    updatePreferences({ firstVisitCompleted: true });
  };

  const handleDismissPrivacy = () => {
    updatePreferences({ privacyNoticeDismissed: true });
  };

  // Get last entry dates for section cards
  const getLastEntry = (sectionId: string): string | undefined => {
    switch (sectionId) {
      case 'daily-checkin':
        return data.dailyCheckIns[0]?.date ? formatDate(data.dailyCheckIns[0].date) : undefined;
      case 'weekly-screening':
        return data.weeklyScreenings[0]?.weekStartDate ? formatDate(data.weeklyScreenings[0].weekStartDate) : undefined;
      case 'thought-record':
        return undefined; // Linked to ThoughtReframer
      case 'behavioral-activation':
        return data.behavioralActivation[0]?.date ? formatDate(data.behavioralActivation[0].date) : undefined;
      case 'trigger-log':
        return data.triggerLog.length > 0 ? `${data.triggerLog.length} items` : undefined;
      case 'wellness-toolbox':
        return data.wellnessToolbox.length > 0 || data.safetyPlan.some(s => s.items.length > 0) ? 'Active' : undefined;
      case 'weekly-reflection':
        return data.weeklyReflections[0]?.weekStartDate ? formatDate(data.weeklyReflections[0].weekStartDate) : undefined;
      default:
        return undefined;
    }
  };

  // Mood sparkline data for preview
  const recentMoods = [...data.dailyCheckIns]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14)
    .map(c => ({ label: formatDate(c.date), value: c.mood }));

  // Thought record count from ThoughtReframer localStorage
  let thoughtRecordCount = 0;
  try {
    const raw = localStorage.getItem('psychage_thought_reframer_v1');
    if (raw) thoughtRecordCount = (JSON.parse(raw) as unknown[]).filter((r: any) => r.completed).length;
  } catch { /* ignore */ }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <SEO title="Clarity Journal | Psychage" description="A structured, evidence-based journal for tracking your mental health." />
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Breadcrumbs />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900">Clarity Journal</h1>
            <p className="text-slate-500 mt-1">Your personal guide to understanding your mind.</p>
          </div>
          <StreakTracker streak={streak} />
        </div>

        {/* Privacy Notice */}
        <PrivacyNotice
          dismissed={data.preferences.privacyNoticeDismissed}
          onDismiss={handleDismissPrivacy}
        />

        {/* Welcome Banner (first visit) */}
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6"
          >
            <h2 className="font-display font-semibold text-xl text-slate-900 mb-3">Welcome to Your Clarity Journal</h2>
            <p className="text-sm text-slate-600 mb-3 leading-relaxed">
              This journal belongs to you. It is a space where you can pay attention to how you are feeling,
              notice what is helping and what is not, and build a clear picture of your mental health over time.
            </p>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Start with just the Daily Check-In. Add sections as they feel natural. Building a habit works
              best when you do not try to do everything at once.
            </p>
            <div className="flex gap-3">
              <Button variant="primary" onClick={handleDismissWelcome}>Get Started</Button>
              <Button variant="outline" onClick={handleDismissWelcome}>Dismiss</Button>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <QuickActionCard
            icon={Sun}
            title="Daily Check-In"
            subtitle={todayCheckIn ? 'Completed today' : 'Not yet today'}
            route="/tools/clarity-journal/daily-checkin"
            completed={!!todayCheckIn}
          />
          <QuickActionCard
            icon={BookOpen}
            title="Thought Record"
            subtitle={thoughtRecordCount > 0 ? `${thoughtRecordCount} records` : 'Challenge negative thoughts'}
            route="/tools/clarity-journal/thought-record"
          />
          <QuickActionCard
            icon={ShieldCheck}
            title="Safety Plan"
            subtitle="Your crisis plan"
            route="/tools/clarity-journal/wellness-toolbox"
            accent="red"
          />
        </div>

        {/* Section Grid */}
        <h2 className="font-display font-semibold text-lg text-slate-800 mb-4">Journal Sections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {JOURNAL_SECTIONS.map(section => (
            <SectionCard
              key={section.id}
              section={section}
              lastEntry={getLastEntry(section.id)}
            />
          ))}
        </div>

        {/* Utilities row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <QuickActionCard
            icon={Clock}
            title="History"
            subtitle="View all entries"
            route="/tools/clarity-journal/history"
          />
          <QuickActionCard
            icon={BarChart3}
            title="Insights & Trends"
            subtitle={recentMoods.length >= 2 ? 'View your patterns' : 'Need more data'}
            route="/tools/clarity-journal/insights"
          />
        </div>

        {/* Trends preview */}
        {recentMoods.length >= 2 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
            <TrendChart data={recentMoods} label="Recent Mood Trend" />
          </div>
        )}

        {/* Export/Import */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <button
            onClick={() => setShowExport(!showExport)}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            <Settings2 className="w-4 h-4" />
            Data Management
          </button>
          {showExport && (
            <div className="mt-4">
              <ExportImportControls
                onExport={exportData}
                onImport={importData}
                onClear={clearData}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClarityJournal;
