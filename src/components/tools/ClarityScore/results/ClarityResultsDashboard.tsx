import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2,
  Layers,
  BookOpen,
  Clock,
  RefreshCw,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type {
  ClarityScoreResult,
  ClarityHistoryItem,
  Recommendation,
  DomainKey,
} from '@/lib/clarity/types';
import { getScoreTierColor, getTierHexColor } from '@/lib/clarity/scoring';
import TierBadge from './components/TierBadge';
import OverviewTab from './OverviewTab';
import DimensionsTab from './DimensionsTab';
import ScoreGuideTab from './ScoreGuideTab';
import HistoryTab from './HistoryTab';

// ─── Tab Configuration ──────────────────────────────────────────────

type TabId = 'overview' | 'dimensions' | 'guide' | 'history';

interface TabDef {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

const TABS: TabDef[] = [
  { id: 'overview', label: 'Overview', icon: BarChart2 },
  { id: 'dimensions', label: 'Dimensions', icon: Layers },
  { id: 'guide', label: 'Score Guide', icon: BookOpen },
  { id: 'history', label: 'History', icon: Clock },
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

  const _tierColors = getScoreTierColor(results.tier);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-0"
    >
      {/* ─── Score Banner Header ─── */}
      <div
        className="text-white rounded-t-3xl overflow-hidden relative"
        style={{
          background: `linear-gradient(135deg, ${getTierHexColor(results.tier)}dd, ${getTierHexColor(results.tier)}88)`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-white/20 to-transparent" />
        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                {results.totalScore}
              </div>
              <p className="text-xs text-white/60 mt-1">Clarity Score</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/20" />
            <div>
              <TierBadge tier={results.tier} label={results.label} size="lg" />
            </div>
          </div>

          <button
            onClick={onRetake}
            type="button"
            className="text-white/70 hover:text-white font-medium flex items-center gap-2 transition-colors text-sm"
          >
            <RefreshCw size={16} />
            Retake Assessment
          </button>
        </div>
      </div>

      {/* ─── Tab Bar ─── */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Results sections"
        className="bg-surface border-b border-border rounded-b-none flex overflow-x-auto"
        onKeyDown={handleTabKeyDown}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const TabIcon = tab.icon;
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
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
                isActive
                  ? 'border-teal-500 text-primary'
                  : 'border-transparent text-text-tertiary hover:text-text-secondary hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <TabIcon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── Tab Content ─── */}
      <div className="pt-6">
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
