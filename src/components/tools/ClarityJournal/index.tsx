import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, ShieldCheck, BookOpen, BarChart3, Clock, Settings2, ChevronRight, Check, Sparkles } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import PrivacyNotice from './components/PrivacyNotice';
import StreakTracker from './components/StreakTracker';
import SectionCard from './components/SectionCard';
import TrendChart from './components/TrendChart';
import ExportImportControls from './components/ExportImportControls';
import { useClarityJournal } from './hooks/useClarityJournal';
import { JOURNAL_SECTIONS, PRIVACY_NOTICE } from './constants';
import { formatDate } from './dates';
import { Link } from 'react-router-dom';

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
        return undefined;
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

  const quickActions = [
    {
      icon: Sun,
      title: 'Daily Check-In',
      subtitle: todayCheckIn ? 'Completed today' : 'Not yet today',
      route: '/tools/clarity-journal/daily',
      completed: !!todayCheckIn,
      color: 'teal' as const,
    },
    {
      icon: BookOpen,
      title: 'Thought Record',
      subtitle: thoughtRecordCount > 0 ? `${thoughtRecordCount} records` : 'Challenge negative thoughts',
      route: '/tools/clarity-journal/thought-record',
      completed: false,
      color: 'indigo' as const,
    },
    {
      icon: ShieldCheck,
      title: 'Safety Plan',
      subtitle: 'Your crisis plan',
      route: '/tools/clarity-journal/toolbox',
      completed: false,
      color: 'rose' as const,
    },
  ];

  const colorMap = {
    teal: { bg: 'bg-teal-50 dark:bg-teal-900/20', icon: 'text-teal-600 dark:text-teal-400', ring: 'ring-teal-500/20' },
    indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', icon: 'text-indigo-600 dark:text-indigo-400', ring: 'ring-indigo-500/20' },
    rose: { bg: 'bg-rose-50 dark:bg-rose-900/20', icon: 'text-rose-600 dark:text-rose-400', ring: 'ring-rose-500/20' },
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0a0a0a] pt-24 pb-16 px-4 sm:px-6">
      <SEO title="Clarity Journal | Psychage" description="A structured, evidence-based journal for tracking your mental health." />

      <div className="container mx-auto max-w-3xl">
        <div className="mb-6">
          <Breadcrumbs />
        </div>

        {/* Header — Apple-style large title */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight leading-[1.05]">
                Clarity Journal
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-light">
                Your personal guide to understanding your mind.
              </p>
            </div>
            <StreakTracker streak={streak} />
          </div>
        </motion.div>

        {/* Privacy Notice */}
        <PrivacyNotice
          dismissed={data.preferences.privacyNoticeDismissed}
          onDismiss={handleDismissPrivacy}
        />

        {/* Welcome Banner — frosted glass */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative overflow-hidden bg-white/70 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-7 shadow-sm shadow-black/[0.03] border border-white/60 dark:border-white/10 mb-8"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-teal-100/40 dark:from-teal-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/4" />
              <div className="relative">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-2xl bg-teal-500/10 dark:bg-teal-400/10 flex items-center justify-center">
                    <Sparkles className="w-4.5 h-4.5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h2 className="font-display font-semibold text-xl text-slate-900 dark:text-white">Welcome to Your Journal</h2>
                </div>
                <p className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                  This journal belongs to you. Pay attention to how you're feeling,
                  notice what's helping and what isn't, and build a clear picture of your mental health over time.
                </p>
                <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  Start with just the Daily Check-In. Add sections as they feel natural.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    onClick={handleDismissWelcome}
                    className="rounded-full h-11 px-7 text-sm font-semibold bg-teal-600 hover:bg-teal-700 shadow-sm"
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDismissWelcome}
                    className="rounded-full h-11 px-7 text-sm font-semibold border-slate-200 dark:border-slate-700"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions — pill-shaped cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10"
        >
          {quickActions.map((action) => {
            const Icon = action.icon;
            const colors = colorMap[action.color];
            return (
              <Link
                key={action.title}
                to={action.route}
                className="group relative overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/60 dark:border-white/10 shadow-sm shadow-black/[0.03] hover:shadow-md hover:shadow-black/[0.06] transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${colors.bg} transition-transform duration-300 group-hover:scale-105`}>
                    {action.completed ? (
                      <Check className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    ) : (
                      <Icon className={`w-5 h-5 ${colors.icon}`} strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[15px] text-slate-900 dark:text-white leading-tight">{action.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{action.subtitle}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-400 dark:group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* Journal Sections — clean grid with frosted cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h2 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-5 tracking-tight">
            Journal Sections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {JOURNAL_SECTIONS.map(section => (
              <SectionCard
                key={section.id}
                section={section}
                lastEntry={getLastEntry(section.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Utilities — History & Insights */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
        >
          {[
            { icon: Clock, title: 'History', subtitle: 'View all entries', route: '/tools/clarity-journal/history' },
            { icon: BarChart3, title: 'Insights & Trends', subtitle: recentMoods.length >= 2 ? 'View your patterns' : 'Need more data', route: '/tools/clarity-journal/insights' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.route}
                className="group bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/60 dark:border-white/10 shadow-sm shadow-black/[0.03] hover:shadow-md hover:shadow-black/[0.06] transition-all duration-300 flex items-center gap-3.5"
              >
                <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 transition-colors">
                  <Icon className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[15px] text-slate-900 dark:text-white leading-tight">{item.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.subtitle}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            );
          })}
        </motion.div>

        {/* Trends preview — glass card */}
        {recentMoods.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-6 shadow-sm shadow-black/[0.03] border border-white/60 dark:border-white/10 mb-10"
          >
            <TrendChart data={recentMoods} label="Recent Mood Trend" />
          </motion.div>
        )}

        {/* Data Management — minimal accordion */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-6 shadow-sm shadow-black/[0.03] border border-white/60 dark:border-white/10"
        >
          <button
            onClick={() => setShowExport(!showExport)}
            className="flex items-center gap-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors w-full"
          >
            <Settings2 className="w-4 h-4" strokeWidth={1.5} />
            Data Management
            <ChevronRight className={`w-3.5 h-3.5 ml-auto transition-transform duration-200 ${showExport ? 'rotate-90' : ''}`} />
          </button>
          <AnimatePresence>
            {showExport && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-5 border-t border-slate-100 dark:border-slate-800 mt-4">
                  <ExportImportControls
                    onExport={exportData}
                    onImport={importData}
                    onClear={clearData}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ClarityJournal;
