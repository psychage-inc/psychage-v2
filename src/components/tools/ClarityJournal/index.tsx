import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, BookOpen, BarChart3, Clock, Settings2, ChevronRight, Sparkles,
  Smile, FileText, Shield,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import PrivacyNotice from './components/PrivacyNotice';
import StreakTracker from './components/StreakTracker';
import SectionCard from './components/SectionCard';
import TrendChart from './components/TrendChart';
import ExportImportControls from './components/ExportImportControls';
import { useClarityJournal } from './hooks/useClarityJournal';
import { JOURNAL_SECTIONS } from './constants';
import { formatDate } from './dates';
import { Link } from 'react-router-dom';

const ClarityJournal: React.FC = () => {
  const _navigate = useNavigate();
  const {
    data,
    streak,
    todayCheckIn,
    todayJournal,
    todaySections,
    todaySectionCount,
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

  // Get last entry dates for V1 section cards
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

  // Mood sparkline data — combine V1 check-ins + V2 mood data
  const v1Moods = [...data.dailyCheckIns]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14)
    .map(c => ({ key: c.date.slice(0, 10), label: formatDate(c.date), value: c.mood }));

  const v2Moods = [...(data.dailyJournals || [])]
    .filter(j => j.moodCheckIns.length > 0)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14)
    .map(j => ({
      key: j.date.slice(0, 10),
      label: formatDate(j.date),
      value: Math.round(j.moodCheckIns.reduce((s, m) => s + m.overallMood, 0) / j.moodCheckIns.length),
    }));

  // Merge by ISO date key, preferring V2 data
  const moodMap = new Map<string, { label: string; value: number }>();
  for (const m of v1Moods) moodMap.set(m.key, { label: m.label, value: m.value });
  for (const m of v2Moods) moodMap.set(m.key, { label: m.label, value: m.value });
  const recentMoods = [...moodMap.values()].slice(-14);

  // Thought record count (legacy — kept for backwards compat)
  const thoughtRecordCount = 0;

  // V2 today's status
  const hasTodayV2Data = todaySectionCount > 0;
  const todayLabel = hasTodayV2Data
    ? `${todaySectionCount} section${todaySectionCount > 1 ? 's' : ''} today`
    : todayCheckIn ? 'Completed today' : 'Not yet today';

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0a0a0a] pt-24 pb-16 px-4 sm:px-6">
      <SEO title="Clarity Journal | Psychage" description="A structured, evidence-based journal with therapist reports. Everything stays on your device." />

      <div className="container mx-auto max-w-3xl">
        <div className="mb-6">
          <Breadcrumbs />
        </div>

        {/* Header */}
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
                Your space between sessions.
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

        {/* Welcome Banner */}
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
                  Your Clarity Journal is a private space to track how you're doing between therapy sessions — or just for yourself.
                  Everything stays on your device.
                </p>
                <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                  Check in with your mood, log activities, note stressors, and complete weekly check-ups.
                  When you're ready, generate a summary report to share with your therapist.
                </p>
                <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  <Shield className="w-3.5 h-3.5 inline -mt-0.5 mr-1 text-teal-500" />
                  Everything you write stays on your device. Psychage never sees your data.
                </p>
                <Button
                  variant="primary"
                  onClick={handleDismissWelcome}
                  className="rounded-full h-11 px-7 text-sm font-semibold bg-teal-600 hover:bg-teal-700 shadow-sm"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Today's Entry — prominent CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="mb-6"
        >
          <Link
            to="/tools/clarity-journal/entry"
            className="group relative overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-900/20 dark:to-teal-800/10 backdrop-blur-xl rounded-2xl p-5 border border-teal-200/60 dark:border-teal-700/30 shadow-sm hover:shadow-md transition-all duration-300 block"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-600 dark:bg-teal-500 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Smile className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-lg text-slate-900 dark:text-white">Today's Journal</p>
                <p className="text-sm text-teal-700 dark:text-teal-400 mt-0.5">{todayLabel}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-teal-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>
          </Link>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10"
        >
          {[
            {
              icon: FileText,
              title: 'Therapist Report',
              subtitle: 'Generate wellness summary',
              route: '/tools/clarity-journal/report',
              color: 'teal' as const,
            },
            {
              icon: BookOpen,
              title: 'Thought Record',
              subtitle: thoughtRecordCount > 0 ? `${thoughtRecordCount} records` : 'Challenge negative thoughts',
              route: '/tools/clarity-journal/thought-record',
              color: 'indigo' as const,
            },
            {
              icon: ShieldCheck,
              title: 'Safety Plan',
              subtitle: 'Your crisis plan',
              route: '/tools/clarity-journal/toolbox',
              color: 'rose' as const,
            },
          ].map((action) => {
            const Icon = action.icon;
            const colorMap = {
              teal: { bg: 'bg-teal-50 dark:bg-teal-900/20', icon: 'text-teal-600 dark:text-teal-400' },
              indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', icon: 'text-indigo-600 dark:text-indigo-400' },
              rose: { bg: 'bg-rose-50 dark:bg-rose-900/20', icon: 'text-rose-600 dark:text-rose-400' },
            };
            const colors = colorMap[action.color];
            return (
              <Link
                key={action.title}
                to={action.route}
                className="group relative overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/60 dark:border-white/10 shadow-sm shadow-black/[0.03] hover:shadow-md hover:shadow-black/[0.06] transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${colors.bg} transition-transform duration-300 group-hover:scale-105`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[15px] text-slate-900 dark:text-white leading-tight">{action.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{action.subtitle}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* V1 Journal Sections */}
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

        {/* Trends preview */}
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

        {/* Data Management */}
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

        {/* Educational disclaimer */}
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-8 max-w-md mx-auto leading-relaxed">
          The Clarity Journal is an educational wellness tool, not a medical record or clinical assessment.
          All data stays on your device.
        </p>
      </div>
    </div>
  );
};

export default ClarityJournal;
