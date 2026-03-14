import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BookOpen, AlertTriangle, FileWarning } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import { getCitationDiversityReport } from '@/services/articleAdminService';
import type { CitationDiversityEntry } from '@/lib/admin/types';
import { adminPath } from '@/hooks/useAdminNavigate';

const TIER_COLORS = ['#0D9488', '#6366F1', '#F59E0B', '#EF4444', '#94A3B8'];
const TIER_LABELS = ['T1 Peer-Reviewed', 'T2 Government', 'T3 Organizations', 'T4 Guidelines', 'T5 Reference'];

// ============================================================
// Donut Chart
// ============================================================

function CitationDonut({ data }: { data: CitationDiversityEntry[] }) {
  // Aggregate tiers across all articles
  const tierTotals: Record<number, number> = {};
  let grandTotal = 0;
  for (const entry of data) {
    for (const [tier, count] of Object.entries(entry.tiers)) {
      const t = Number(tier);
      tierTotals[t] = (tierTotals[t] || 0) + count;
      grandTotal += count;
    }
  }

  const chartData = [1, 2, 3, 4, 5].map((tier) => ({
    name: TIER_LABELS[tier - 1],
    value: tierTotals[tier] || 0,
  }));

  if (grandTotal === 0) {
    return (
      <div className="flex items-center justify-center h-52 text-gray-400 dark:text-slate-500 text-sm">
        No citations data
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <div className="w-44 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((_, idx) => (
                <Cell key={idx} fill={TIER_COLORS[idx]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [`${value} (${Math.round((value / grandTotal) * 100)}%)`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {chartData.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: TIER_COLORS[idx] }} />
            <span className="text-gray-600 dark:text-slate-400 flex-1">{item.name}</span>
            <span className="font-medium text-gray-900 dark:text-white tabular-nums">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Tier Breakdown Badges
// ============================================================

function TierBadges({ tiers }: { tiers: Record<number, number> }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((tier) => {
        const count = tiers[tier] || 0;
        if (count === 0) return null;
        return (
          <span
            key={tier}
            className="inline-flex items-center justify-center text-[10px] font-medium px-1.5 py-0.5 rounded text-white min-w-[20px]"
            style={{ backgroundColor: TIER_COLORS[tier - 1] }}
          >
            T{tier}:{count}
          </span>
        );
      })}
    </div>
  );
}

// ============================================================
// Flagged Table
// ============================================================

function FlaggedTable({
  title,
  icon: Icon,
  entries,
  emptyMessage,
}: {
  title: string;
  icon: React.ElementType;
  entries: CitationDiversityEntry[];
  emptyMessage: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700/50 flex items-center gap-2">
        <Icon size={16} className="text-amber-500" />
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
        <span className="ml-auto text-xs text-gray-400 dark:text-slate-500">{entries.length} articles</span>
      </div>

      {entries.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-gray-400 dark:text-slate-500">
          {emptyMessage}
        </div>
      ) : (
        <div className="divide-y divide-gray-50 dark:divide-slate-700/30">
          {entries.map((entry) => (
            <div key={entry.articleId} className="flex items-center gap-3 px-4 py-2.5">
              <Link
                to={adminPath(`/articles/${entry.articleId}`)}
                className="text-sm text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 truncate flex-1"
              >
                {entry.title}
              </Link>
              <TierBadges tiers={entry.tiers} />
              <span className="text-xs text-gray-400 dark:text-slate-500 tabular-nums flex-shrink-0">
                {entry.totalCitations} total
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Main Page
// ============================================================

const AdminArticleCitationReport: React.FC = () => {
  const { data: report, isLoading } = useQuery({
    queryKey: ['admin', 'citation-diversity'],
    queryFn: getCitationDiversityReport,
  });

  const totalCitations = report?.reduce((s, r) => s + r.totalCitations, 0) || 0;
  const avgPerArticle = report?.length ? Math.round(totalCitations / report.length) : 0;
  const articlesWithCitations = report?.length || 0;

  // Flagged articles
  const insufficientDiversity = report?.filter((r) => r.tierCount < 4) || [];
  const lowCitationCount = report?.filter((r) => r.totalCitations < 8) || [];

  return (
    <div>
      <PageHeader
        title="Citation Diversity Report"
        description="Source tier distribution and citation quality analysis"
      />

      {isLoading ? (
        <div className="space-y-4">
          <div className="h-52 bg-gray-100 dark:bg-slate-800 rounded-xl animate-pulse" />
          <div className="h-64 bg-gray-100 dark:bg-slate-800 rounded-xl animate-pulse" />
        </div>
      ) : (
        <>
          {/* Summary row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Donut */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Citation Distribution by Tier
              </h3>
              <CitationDonut data={report || []} />
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-2 gap-4 content-start">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-1">
                  <BookOpen size={14} className="text-teal-500" />
                  Total Citations
                </div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">{totalCitations}</div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-1">
                  <BookOpen size={14} className="text-purple-500" />
                  Avg per Article
                </div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">{avgPerArticle}</div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-1">
                  <BookOpen size={14} className="text-blue-500" />
                  Articles w/ Citations
                </div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">{articlesWithCitations}</div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-1">
                  <AlertTriangle size={14} className="text-amber-500" />
                  Flagged
                </div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {insufficientDiversity.length + lowCitationCount.length}
                </div>
              </div>
            </div>
          </div>

          {/* Flagged tables */}
          <div className="space-y-6">
            <FlaggedTable
              title="Insufficient Diversity (<4 tiers)"
              icon={FileWarning}
              entries={insufficientDiversity}
              emptyMessage="All articles have good tier diversity"
            />
            <FlaggedTable
              title="Low Citation Count (<8 citations)"
              icon={AlertTriangle}
              entries={lowCitationCount}
              emptyMessage="All articles meet the minimum citation count"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminArticleCitationReport;
