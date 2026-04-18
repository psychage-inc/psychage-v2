import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import Breadcrumbs from '../../ui/Breadcrumbs';
import AuthModal from '../../auth/AuthModal';
import SEO from '@/components/SEO';
import { useSleepEntries } from './hooks/useSleepEntries';
import SyncBanner from './shared/SyncBanner';
import type { SleepTab } from '@/lib/sleep/types';

// Lazy-loaded tab contents
const SleepOverview = lazy(() => import('./overview/SleepOverview'));
const SleepDiary = lazy(() => import('./diary/SleepDiary'));
const SleepDashboard = lazy(() => import('./dashboard/SleepDashboard'));
const SleepTools = lazy(() => import('./tools/SleepTools'));
const WindDown = lazy(() => import('./wind-down/WindDown'));
const SleepInsights = lazy(() => import('./insights/SleepInsights'));

const TABS: { id: SleepTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'diary', label: 'Diary' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'tools', label: 'Tools' },
  { id: 'wind-down', label: 'Wind-Down' },
  { id: 'insights', label: 'Insights' },
];

const TabSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-8 bg-gray-200 dark:bg-neutral-700 rounded-xl w-1/3" />
    <div className="h-48 bg-gray-100 dark:bg-neutral-800 rounded-2xl" />
    <div className="h-32 bg-gray-100 dark:bg-neutral-800 rounded-2xl" />
  </div>
);

const SleepArchitect: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<SleepTab>('overview');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const sleepData = useSleepEntries();

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <SleepOverview
            sleepData={sleepData}
            onNavigateTab={setActiveTab}
            onSignIn={() => setShowAuthModal(true)}
          />
        );
      case 'diary':
        return <SleepDiary sleepData={sleepData} />;
      case 'dashboard':
        return (
          <SleepDashboard
            sleepData={sleepData}
            onSignIn={() => setShowAuthModal(true)}
          />
        );
      case 'tools':
        return <SleepTools sleepData={sleepData} />;
      case 'wind-down':
        return <WindDown />;
      case 'insights':
        return <SleepInsights sleepData={sleepData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50/30 dark:bg-neutral-900 pt-24 pb-12 px-4 sm:px-6">
      <SEO title="Sleep Architect | Psychage" description="Build better sleep habits with guided tracking, diary entries, and evidence-based insights." />
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Breadcrumbs />
        </div>
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/tools')}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 dark:hover:text-white font-bold text-sm uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={16} /> Back to Tools
          </button>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center">
              <Moon size={28} />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 dark:text-white">
                Sleep Architect
              </h1>
              <p className="text-gray-500 dark:text-neutral-400 text-sm mt-1">
                Track, understand, and improve your sleep
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sync Banner */}
        <div className="mb-4">
          <SyncBanner
            isAuthenticated={isAuthenticated}
            syncStatus={sleepData.syncStatus}
            syncedCount={sleepData.syncedCount}
            onSignIn={() => setShowAuthModal(true)}
          />
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 min-w-max bg-white dark:bg-neutral-800 rounded-2xl p-1.5 shadow-sm border border-gray-100 dark:border-neutral-700">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200 hover:bg-gray-50 dark:hover:bg-neutral-700/50'
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="sleep-tab-bg"
                    className="absolute inset-0 bg-indigo-600 dark:bg-indigo-500 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Suspense fallback={<TabSkeleton />}>
              {renderTab()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default SleepArchitect;
