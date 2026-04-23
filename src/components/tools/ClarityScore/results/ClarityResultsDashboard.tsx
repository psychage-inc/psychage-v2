import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCw,
} from 'lucide-react';
import type {
  ClarityScoreResult,
  ClarityHistoryItem,
  Recommendation,
  DomainKey,
} from '@/lib/clarity/types';
import { getScoreTierColor } from '@/lib/clarity/scoring';
import TierBadge from './components/TierBadge';
import CrisisUrgentBanner from './components/CrisisUrgentBanner';
import OverviewTab from './OverviewTab';
import DimensionsTab from './DimensionsTab';
import ScoreGuideTab from './ScoreGuideTab';
import HistoryTab from './HistoryTab';

// ─── Tab Configuration ──────────────────────────────────────────────

type TabId = 'overview' | 'dimensions' | 'guide' | 'history';

interface TabDef {
  id: TabId;
  label: string;
}

const TABS: TabDef[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'dimensions', label: 'Dimensions' },
  { id: 'guide', label: 'Score Guide' },
  { id: 'history', label: 'History' },
];

// ─── Props ──────────────────────────────────────────────────────────

interface ClarityResultsDashboardProps {
  results: ClarityScoreResult;
  recommendations: Recommendation[];
  history: ClarityHistoryItem[];
  onRetake: () => void;
}

// ─── Component ──────────────────────────────────────────────────────

const ClarityResultsDashboard: React.FC<ClarityResultsDashboardProps> = ({
  results,
  recommendations,
  history,
  onRetake,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [selectedDimension, setSelectedDimension] = useState<
    DomainKey | undefined
  >();

  const tabListRef = useRef<HTMLDivElement>(null);

  // Cross-tab navigation: Overview dimension bar → Dimensions tab
  const handleNavigateToDimension = useCallback((key: DomainKey) => {
    setSelectedDimension(key);
    setActiveTab('dimensions');
  }, []);

  // Keyboard navigation for tabs
  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = TABS.findIndex((t) => t.id === activeTab);
      let nextIndex = currentIndex;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % TABS.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = TABS.length - 1;
      } else {
        return;
      }

      setActiveTab(TABS[nextIndex].id);

      // Focus the new tab button
      const tabList = tabListRef.current;
      if (tabList) {
        const buttons = tabList.querySelectorAll<HTMLButtonElement>(
          '[role="tab"]'
        );
        buttons[nextIndex]?.focus();
      }
    },
    [activeTab]
  );

  const tierColors = getScoreTierColor(results.tier);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-0"
    >
      {/* ─── Score Banner Header ─── */}
      <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-t-2xl">
        <div className="px-8 py-10 md:px-10 md:py-12">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
            {/* Score display */}
            <div className="flex items-end gap-6">
              <div className="text-center md:text-left">
                <p className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-neutral-500 mb-2">
                  Your Clarity Score
                </p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-7xl md:text-8xl font-display font-bold tracking-tight ${tierColors.text}`}>
                    {results.totalScore}
                  </span>
                  <span className="text-lg text-gray-300 dark:text-neutral-600 font-light">
                    / 100
                  </span>
                </div>
              </div>
              <div className="hidden md:block w-px h-14 bg-gray-200 dark:bg-neutral-700 mx-2" />
              <div className="hidden md:flex flex-col pb-2">
                <TierBadge tier={results.tier} label={results.label} size="lg" />
                <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
                  Assessment complete
                </p>
              </div>
            </div>

            {/* Retake button */}
            <button
              onClick={onRetake}
              type="button"
              className="text-gray-400 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-neutral-300 font-medium flex items-center gap-2 transition-colors text-sm"
            >
              <RefreshCw size={14} />
              Retake
            </button>
          </div>

          {/* Mobile tier badge */}
          <div className="mt-4 md:hidden">
            <TierBadge tier={results.tier} label={results.label} size="md" />
          </div>

          {results.tier === 'crisis' && <CrisisUrgentBanner />}
        </div>
      </div>

      {/* ─── Tab Bar ─── */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Results sections"
        className="bg-white dark:bg-neutral-900 border-x border-b border-gray-200 dark:border-neutral-800 flex"
        onKeyDown={handleTabKeyDown}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-gray-400 dark:focus-visible:ring-neutral-500 focus-visible:ring-inset focus-visible:outline-none ${
                isActive
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-400'
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="clarity-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ─── Tab Content ─── */}
      <div className="pt-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <div
              key="overview"
              role="tabpanel"
              id="panel-overview"
              aria-labelledby="tab-overview"
            >
              <OverviewTab
                results={results}
                recommendations={recommendations}
                onNavigateToDimension={handleNavigateToDimension}
              />
            </div>
          )}

          {activeTab === 'dimensions' && (
            <div
              key="dimensions"
              role="tabpanel"
              id="panel-dimensions"
              aria-labelledby="tab-dimensions"
            >
              <DimensionsTab
                results={results}
                initialDimension={selectedDimension}
              />
            </div>
          )}

          {activeTab === 'guide' && (
            <div
              key="guide"
              role="tabpanel"
              id="panel-guide"
              aria-labelledby="tab-guide"
            >
              <ScoreGuideTab currentTier={results.tier} />
            </div>
          )}

          {activeTab === 'history' && (
            <div
              key="history"
              role="tabpanel"
              id="panel-history"
              aria-labelledby="tab-history"
            >
              <HistoryTab history={history} currentResult={results} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ClarityResultsDashboard;
