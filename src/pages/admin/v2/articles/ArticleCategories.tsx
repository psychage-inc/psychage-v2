/* eslint-disable react-hooks/static-components */
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
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
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import PageHeader from '@/components/admin/PageHeader';
import {
  getCategoryArticleDistribution,
  getSubcategoriesForCategory,
} from '@/services/articleAdminService';
import { ARTICLE_REVIEW_STAGES } from '@/lib/admin/constants';
import type { ArticleReviewStage, CategoryArticleDistribution, ArticleSubcategoryRecord } from '@/lib/admin/types';

// Map icon names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Brain, CloudRain, Users, Shield, Zap, AlertTriangle, Moon, Heart,
  MessageCircle, Briefcase, Compass, Baby, Apple, RefreshCw, Globe,
};

function getIcon(name: string | null): React.ElementType {
  return (name && iconMap[name]) || Brain;
}

// Stage color dots
const stageColors: Record<string, string> = {
  planned: 'bg-gray-400',
  researched: 'bg-purple-500',
  drafted: 'bg-blue-500',
  in_review: 'bg-amber-500',
  approved: 'bg-teal-500',
  published: 'bg-emerald-500',
};

// ============================================================
// Subcategory Drawer
// ============================================================

function SubcategoryDrawer({ categoryId }: { categoryId: string }) {
  const { data: subcategories, isLoading } = useQuery({
    queryKey: ['admin', 'subcategories', categoryId],
    queryFn: () => getSubcategoriesForCategory(categoryId),
  });

  if (isLoading) {
    return (
      <div className="px-4 py-3 text-sm text-text-tertiary">Loading subcategories...</div>
    );
  }

  if (!subcategories?.length) {
    return (
      <div className="px-4 py-3 text-sm text-text-tertiary">No subcategories</div>
    );
  }

  return (
    <div className="border-t border-border">
      {subcategories.map((sub: ArticleSubcategoryRecord) => (
        <div
          key={sub.id}
          className="flex items-center justify-between px-4 py-2.5 text-sm border-b border-border last:border-0"
        >
          <span className="text-text-secondary">{sub.name}</span>
          <span className="text-xs text-text-tertiary tabular-nums">
            {sub.article_count ?? 0} articles
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Category Card
// ============================================================

function CategoryCard({ dist }: { dist: CategoryArticleDistribution }) {
  const [expanded, setExpanded] = useState(false);
  const { category, totalCount, publishedCount, byStage } = dist;
  const target = category.article_target || 1;
  const pct = Math.min(100, Math.round((totalCount / target) * 100));
  const Icon = useMemo(() => getIcon(category.icon), [category.icon]);

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden">
      {/* Color accent bar */}
      <div className="h-1" style={{ backgroundColor: category.color || '#6B7280' }} />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${category.color}20`, color: category.color || '#6B7280' }}
          >
<Icon size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm text-text-primary truncate">
              {category.name}
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              {totalCount} / {target} articles
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-text-secondary">{publishedCount} published</span>
            <span className="font-medium text-text-secondary">{pct}%</span>
          </div>
          <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                backgroundColor: category.color || '#6B7280',
              }}
            />
          </div>
        </div>

        {/* Stage breakdown */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {ARTICLE_REVIEW_STAGES.map((stage) => {
            const count = byStage[stage.value as ArticleReviewStage] || 0;
            if (count === 0) return null;
            return (
              <span
                key={stage.value}
                className="inline-flex items-center gap-1 text-[11px] text-text-secondary"
              >
                <span className={cn('w-2 h-2 rounded-full', stageColors[stage.value])} />
                {count} {stage.label.toLowerCase()}
              </span>
            );
          })}
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-1 py-2 text-xs text-text-tertiary hover:text-text-secondary hover:bg-surface-hover transition-colors border-t border-border"
      >
        {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        {expanded ? 'Hide' : 'Show'} subcategories
      </button>

      {expanded && <SubcategoryDrawer categoryId={category.id} />}
    </div>
  );
}

// ============================================================
// Main Page
// ============================================================

const AdminArticleCategories: React.FC = () => {
  const { data: distribution, isLoading } = useQuery({
    queryKey: ['admin', 'category-distribution'],
    queryFn: getCategoryArticleDistribution,
  });

  const totalArticles = distribution?.reduce((sum, d) => sum + d.totalCount, 0) || 0;
  const totalTarget = distribution?.reduce((sum, d) => sum + (d.category.article_target || 0), 0) || 0;
  const totalPublished = distribution?.reduce((sum, d) => sum + d.publishedCount, 0) || 0;

  return (
    <div>
      <PageHeader
        title="Category Progress"
        description={`${totalArticles} articles across ${distribution?.length || 0} categories (${totalPublished} published, ${totalTarget} target)`}
      />

      {/* Stage legend */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        {ARTICLE_REVIEW_STAGES.map((stage) => (
          <span key={stage.value} className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
            <span className={cn('w-2.5 h-2.5 rounded-full', stageColors[stage.value])} />
            {stage.label}
          </span>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-surface rounded-2xl border border-border h-48 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {distribution?.map((dist) => (
            <CategoryCard key={dist.category.id} dist={dist} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminArticleCategories;
