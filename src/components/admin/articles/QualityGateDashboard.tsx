import React, { useState, useCallback } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  RefreshCw,
  BookOpen,
} from 'lucide-react';
import type { QualityGateResult, QualityCheck, QualityGateInput, EnhancedCitation } from '@/lib/article-framework/types';
import type { ArticleRecord } from '@/lib/admin/types';
import { runQualityGate } from '@/lib/article-framework/quality-gate';
import { ARTICLE_TEMPLATES, SOURCE_TIERS } from '@/lib/article-framework/constants';
import type { SourceTier } from '@/lib/article-framework/types';

// ---------------------------------------------------------------------------
// Score Ring Component
// ---------------------------------------------------------------------------

const ScoreRing: React.FC<{ score: number; size?: number }> = ({ score, size = 120 }) => {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 80 ? 'text-emerald-500' : score >= 60 ? 'text-amber-500' : 'text-red-500';
  const bgColor =
    score >= 80 ? 'stroke-emerald-100 dark:stroke-emerald-900/30' : score >= 60 ? 'stroke-amber-100 dark:stroke-amber-900/30' : 'stroke-red-100 dark:stroke-red-900/30';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={6}
          className={bgColor}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${color} transition-all duration-700 ease-out`}
          style={{ stroke: 'currentColor' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${color}`}>{score}</span>
        <span className="text-xs text-gray-500 dark:text-slate-400">/ 100</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Check Result Row
// ---------------------------------------------------------------------------

const CheckRow: React.FC<{ check: QualityCheck }> = ({ check }) => {
  const icon =
    check.status === 'pass' ? (
      <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
    ) : check.status === 'warning' ? (
      <AlertTriangle size={16} className="text-amber-500 flex-shrink-0" />
    ) : (
      <XCircle size={16} className="text-red-500 flex-shrink-0" />
    );

  const bgClass =
    check.status === 'fail' && check.blocking
      ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
      : check.status === 'warning'
        ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800'
        : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700';

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${bgClass}`}>
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">{check.label}</span>
          {check.blocking && check.status === 'fail' && (
            <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
              Blocking
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{check.message}</p>
        {check.value !== undefined && check.target !== undefined && (
          <div className="mt-1.5">
            <div className="h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  check.status === 'pass' ? 'bg-emerald-500' : check.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(100, (check.value / check.target) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Tier Distribution Bar
// ---------------------------------------------------------------------------

const TierDistribution: React.FC<{ citations: EnhancedCitation[] }> = ({ citations }) => {
  if (citations.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-slate-400 italic">No citations to analyze</p>
    );
  }

  const tierCounts: Record<SourceTier, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const c of citations) {
    tierCounts[c.tier]++;
  }

  const total = citations.length;
  const tiers: SourceTier[] = [1, 2, 3, 4, 5];

  const tierColors: Record<SourceTier, string> = {
    1: 'bg-amber-500',
    2: 'bg-blue-500',
    3: 'bg-teal-500',
    4: 'bg-purple-500',
    5: 'bg-gray-400',
  };

  return (
    <div className="space-y-2">
      <div className="flex h-4 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-700">
        {tiers.map((tier) => {
          const pct = (tierCounts[tier] / total) * 100;
          if (pct === 0) return null;
          return (
            <div
              key={tier}
              className={`${tierColors[tier]} transition-all`}
              style={{ width: `${pct}%` }}
              title={`Tier ${tier}: ${tierCounts[tier]} (${Math.round(pct)}%)`}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3 text-xs">
        {tiers.map((tier) => (
          <div key={tier} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${tierColors[tier]}`} />
            <span className="text-gray-600 dark:text-slate-400">
              T{tier}: {tierCounts[tier]} ({Math.round((tierCounts[tier] / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mt-1">
        {tiers.map((tier) => (
          <span key={tier} className="text-gray-400 dark:text-slate-500">
            {SOURCE_TIERS[tier].label}
          </span>
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Dashboard
// ---------------------------------------------------------------------------

interface QualityGateDashboardProps {
  article: ArticleRecord;
  citations: EnhancedCitation[];
  articleContent?: string;
}

const QualityGateDashboard: React.FC<QualityGateDashboardProps> = ({
  article,
  citations,
  articleContent = '',
}) => {
  const [result, setResult] = useState<QualityGateResult | null>(null);
  const [running, setRunning] = useState(false);

  const handleRunCheck = useCallback(() => {
    if (!article.article_type) {
      return;
    }

    setRunning(true);

    // Small delay for visual feedback
    setTimeout(() => {
      const input: QualityGateInput = {
        content: articleContent,
        articleType: article.article_type!,
        citations,
        authorName: article.author_name,
        linkedConditionIds: article.linked_condition_ids ?? [],
        hasDisclaimer: articleContent.toLowerCase().includes('informational purposes only'),
      };

      const gateResult = runQualityGate(input);
      setResult(gateResult);
      setRunning(false);
    }, 300);
  }, [article, citations, articleContent]);

  const template = article.article_type ? ARTICLE_TEMPLATES[article.article_type] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldCheck size={20} />
            Quality Gate
          </h3>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            PEAF compliance check — all blocking checks must pass before submission
          </p>
        </div>
        <button
          onClick={handleRunCheck}
          disabled={running || !article.article_type}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 dark:disabled:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <RefreshCw size={14} className={running ? 'animate-spin' : ''} />
          {running ? 'Running...' : 'Run Quality Check'}
        </button>
      </div>

      {/* No article type selected */}
      {!article.article_type && (
        <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg">
          <Info size={18} className="text-amber-500 flex-shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Select an article type to enable quality gate checks.
          </p>
        </div>
      )}

      {/* Template requirements summary */}
      {template && !result && (
        <div className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2 mb-3">
            <BookOpen size={14} />
            {template.label} Requirements
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div>
              <p className="text-gray-500 dark:text-slate-400">Min Words</p>
              <p className="font-semibold text-gray-900 dark:text-white">{template.minWordCount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-slate-400">Min Citations</p>
              <p className="font-semibold text-gray-900 dark:text-white">{template.minCitations}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-slate-400">Sections</p>
              <p className="font-semibold text-gray-900 dark:text-white">{template.requiredSections.length}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-slate-400">Clinical Review</p>
              <p className="font-semibold text-gray-900 dark:text-white">{template.requiresClinicalReview ? 'Required' : 'Optional'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <>
          {/* Score + Summary */}
          <div className="flex items-center gap-6 p-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg">
            <ScoreRing score={result.score} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {result.passed ? (
                  <>
                    <ShieldCheck size={20} className="text-emerald-500" />
                    <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                      Gate Passed
                    </span>
                  </>
                ) : (
                  <>
                    <ShieldX size={20} className="text-red-500" />
                    <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                      Gate Failed
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {result.blockingFailures > 0 && (
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    {result.blockingFailures} blocking issue{result.blockingFailures !== 1 ? 's' : ''}
                  </span>
                )}
                {result.blockingFailures > 0 && result.warnings > 0 && ' · '}
                {result.warnings > 0 && (
                  <span className="text-amber-600 dark:text-amber-400">
                    {result.warnings} warning{result.warnings !== 1 ? 's' : ''}
                  </span>
                )}
                {result.blockingFailures === 0 && result.warnings === 0 && (
                  <span className="text-emerald-600 dark:text-emerald-400">All checks passed</span>
                )}
              </p>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                Last checked: {new Date(result.timestamp).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Tier Distribution */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Source Tier Distribution
            </h4>
            <TierDistribution citations={citations} />
          </div>

          {/* Individual Checks */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Individual Checks ({result.checks.filter((c) => c.status === 'pass').length}/{result.checks.length} passed)
            </h4>
            {result.checks.map((check) => (
              <CheckRow key={check.id} check={check} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QualityGateDashboard;
