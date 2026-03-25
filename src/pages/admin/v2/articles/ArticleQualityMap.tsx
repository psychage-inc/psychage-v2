import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  CloudRain,
  Users,
  Shield,
  Zap,
  AlertTriangle,
  Moon,
  Heart,
  MessageCircle,
  Briefcase,
  Compass,
  Baby,
  Apple,
  RefreshCw,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import PageHeader from '@/components/admin/PageHeader';
import {
  getArticleCategories,
  getArticlesWithTaxonomy,
} from '@/services/articleAdminService';
import type { ArticleRecord, ArticleCategoryRecord } from '@/lib/admin/types';
import { adminPath } from '@/hooks/useAdminNavigate';

// Icon map
const iconMap: Record<string, React.ElementType> = {
  Brain, CloudRain, Users, Shield, Zap, AlertTriangle, Moon, Heart,
  MessageCircle, Briefcase, Compass, Baby, Apple, RefreshCw, Globe,
};

function getScoreColor(score: number | null): string {
  if (score === null) return 'bg-surface-active';
  if (score < 50) return 'bg-red-400';
  if (score < 75) return 'bg-amber-400';
  return 'bg-emerald-400';
}

function _getScoreLabel(score: number | null): string {
  if (score === null) return 'Not scored';
  if (score < 50) return 'Poor';
  if (score < 75) return 'Fair';
  return 'Good';
}

// ============================================================
// Quality Cell
// ============================================================

function QualityCell({ article }: { article: ArticleRecord }) {
  const navigate = useNavigate();
  const score = article.quality_score;

  return (
    <button
      onClick={() => navigate(adminPath(`/articles/${article.id}`))}
      title={`${article.title}\nScore: ${score !== null ? `${score}/100` : 'Not scored'}`}
      className={cn(
        'w-8 h-8 rounded-md transition-all hover:scale-125 hover:z-10 relative cursor-pointer',
        getScoreColor(score)
      )}
    />
  );
}

// ============================================================
// Category Row
// ============================================================

function CategoryRow({
  category,
  articles,
}: {
  category: ArticleCategoryRecord;
  articles: ArticleRecord[];
}) {
  const Icon = (category.icon && iconMap[category.icon]) || Brain;

  return (
    <div className="flex items-start gap-4 py-3 border-b border-border last:border-0">
      {/* Category label */}
      <div className="w-48 flex-shrink-0 flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${category.color}20`, color: category.color || '#6B7280' }}
        >
          <Icon size={14} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">{category.name}</p>
          <p className="text-[11px] text-text-tertiary">{articles.length} articles</p>
        </div>
      </div>

      {/* Quality cells */}
      <div className="flex items-center gap-1 flex-wrap flex-1">
        {articles.length === 0 ? (
          <span className="text-xs text-text-tertiary">No articles</span>
        ) : (
          articles.map((article) => (
            <QualityCell key={article.id} article={article} />
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================
// Main Page
// ============================================================

const AdminArticleQualityMap: React.FC = () => {
  const { data: categories, isLoading: catLoading } = useQuery({
    queryKey: ['admin', 'article-categories'],
    queryFn: getArticleCategories,
  });

  const { data: articles, isLoading: artLoading } = useQuery({
    queryKey: ['admin', 'articles-with-taxonomy'],
    queryFn: () => getArticlesWithTaxonomy(),
  });

  const isLoading = catLoading || artLoading;

  // Group articles by category
  const articlesByCategory: Record<string, ArticleRecord[]> = {};
  for (const a of articles || []) {
    const catId = a.category_id || 'uncategorized';
    if (!articlesByCategory[catId]) articlesByCategory[catId] = [];
    articlesByCategory[catId].push(a);
  }

  // Compute stats
  const scored = articles?.filter((a) => a.quality_score !== null) || [];
  const avgScore = scored.length
    ? Math.round(scored.reduce((s, a) => s + (a.quality_score || 0), 0) / scored.length)
    : null;
  const poorCount = scored.filter((a) => (a.quality_score || 0) < 50).length;
  const goodCount = scored.filter((a) => (a.quality_score || 0) >= 75).length;

  return (
    <div>
      <PageHeader
        title="Quality Heatmap"
        description="Article quality scores visualized by category"
      />

      {/* Legend + summary */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span className="w-3 h-3 rounded bg-red-400" /> 0-49 Poor
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span className="w-3 h-3 rounded bg-amber-400" /> 50-74 Fair
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span className="w-3 h-3 rounded bg-emerald-400" /> 75-100 Good
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span className="w-3 h-3 rounded bg-surface-active" /> Not scored
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-text-secondary">
            Avg: <strong className="text-text-primary">{avgScore ?? '—'}</strong>
          </span>
          <span className="text-emerald-600 dark:text-emerald-400">
            {goodCount} good
          </span>
          <span className="text-red-600 dark:text-red-400">
            {poorCount} poor
          </span>
          <span className="text-text-secondary">
            {(articles?.length || 0) - scored.length} unscored
          </span>
        </div>
      </div>

      {/* Heatmap */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-12 bg-surface-hover rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-2xl border border-border px-5 py-3">
          {(categories as ArticleCategoryRecord[] | undefined)?.map((cat) => (
            <CategoryRow
              key={cat.id}
              category={cat}
              articles={articlesByCategory[cat.id] || []}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminArticleQualityMap;
