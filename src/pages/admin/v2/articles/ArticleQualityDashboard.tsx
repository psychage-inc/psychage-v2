import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    BarChart3,
    AlertTriangle,
    CheckCircle,
    Clock,
    Film,
    Headphones,
    Flag,
    ArrowRight,
    RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import PageHeader from '@/components/admin/PageHeader';
import { adminPath } from '@/hooks/useAdminNavigate';
import { useNavigate } from 'react-router-dom';
import {
    getQualityStats,
    getQualityArticles,
    flagForRewrite,
    type RewriteStats,
    type QualityArticleSummary,
} from '@/services/articleRewriteService';

// ============================================================
// Stat Card
// ============================================================

function StatCard({
    label,
    value,
    icon: Icon,
    color = 'text-primary',
    bgColor = 'bg-primary/10',
}: {
    label: string;
    value: string | number;
    icon: React.ElementType;
    color?: string;
    bgColor?: string;
}) {
    return (
        <div className="bg-surface border border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', bgColor)}>
                    <Icon size={18} className={color} />
                </div>
                <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">{label}</span>
            </div>
            <p className={cn('text-2xl font-bold', color)}>{value}</p>
        </div>
    );
}

// ============================================================
// Word Count Status Badge
// ============================================================

function WordCountBadge({ wordCount }: { wordCount: number }) {
    if (wordCount >= 2000)
        return <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">Passing</span>;
    if (wordCount >= 1500)
        return <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">Below Standard</span>;
    if (wordCount >= 500)
        return <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">Failing</span>;
    return <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">Critical</span>;
}

// ============================================================
// Quality Score Badge
// ============================================================

function QualityBadge({ score }: { score: number | null }) {
    if (score == null) return <span className="text-xs text-text-tertiary">-</span>;
    const color = score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-600' : 'text-red-600';
    return <span className={cn('text-sm font-bold tabular-nums', color)}>{score}</span>;
}

// ============================================================
// Main Dashboard
// ============================================================

const ArticleQualityDashboard: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState<'all' | 'critical' | 'failing' | 'below' | 'passing'>('all');

    const { data: stats, isLoading: statsLoading } = useQuery<RewriteStats>({
        queryKey: ['quality-stats'],
        queryFn: getQualityStats,
    });

    const { data: articles = [], isLoading: articlesLoading } = useQuery<QualityArticleSummary[]>({
        queryKey: ['quality-articles'],
        queryFn: getQualityArticles,
    });

    const flagMutation = useMutation({
        mutationFn: (articleId: string) => flagForRewrite(articleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quality-articles'] });
            queryClient.invalidateQueries({ queryKey: ['quality-stats'] });
        },
    });

    const filteredArticles = articles.filter((a) => {
        if (filter === 'all') return true;
        const wc = a.word_count || 0;
        if (filter === 'critical') return wc < 500;
        if (filter === 'failing') return wc >= 500 && wc < 1500;
        if (filter === 'below') return wc >= 1500 && wc < 2000;
        if (filter === 'passing') return wc >= 2000;
        return true;
    });

    const isLoading = statsLoading || articlesLoading;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Article Quality Dashboard"
                description="Track content quality, flag articles for rewrite, and monitor video/audio coverage."
            />

            {/* Stats Grid */}
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <StatCard label="Total Articles" value={stats.total} icon={BarChart3} />
                    <StatCard
                        label="Passing (2000+)"
                        value={stats.passing}
                        icon={CheckCircle}
                        color="text-emerald-600"
                        bgColor="bg-emerald-100"
                    />
                    <StatCard
                        label="Failing (<1500)"
                        value={stats.failing + stats.critical}
                        icon={AlertTriangle}
                        color="text-red-600"
                        bgColor="bg-red-100"
                    />
                    <StatCard
                        label="Avg Quality"
                        value={`${stats.avgQualityScore}/100`}
                        icon={BarChart3}
                        color="text-primary"
                        bgColor="bg-primary/10"
                    />
                    <StatCard
                        label="Rewrite Queue"
                        value={stats.rewriteQueue}
                        icon={RefreshCw}
                        color="text-amber-600"
                        bgColor="bg-amber-100"
                    />
                </div>
            )}

            {/* Media Coverage */}
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard
                        label="With Video"
                        value={`${stats.videoCount} (${stats.total > 0 ? Math.round((stats.videoCount / stats.total) * 100) : 0}%)`}
                        icon={Film}
                        color="text-indigo-600"
                        bgColor="bg-indigo-100"
                    />
                    <StatCard
                        label="With Audio"
                        value={`${stats.audioCount} (${stats.total > 0 ? Math.round((stats.audioCount / stats.total) * 100) : 0}%)`}
                        icon={Headphones}
                        color="text-violet-600"
                        bgColor="bg-violet-100"
                    />
                    <StatCard
                        label="Below Standard"
                        value={stats.belowStandard}
                        icon={Clock}
                        color="text-amber-600"
                        bgColor="bg-amber-100"
                    />
                    <StatCard
                        label="Critical (<500)"
                        value={stats.critical}
                        icon={AlertTriangle}
                        color="text-red-600"
                        bgColor="bg-red-100"
                    />
                </div>
            )}

            {/* Rewrite Pipeline */}
            {stats && stats.rewriteQueue > 0 && (
                <div className="bg-surface border border-border rounded-xl p-5">
                    <h3 className="text-sm font-bold text-text-primary mb-3 uppercase tracking-wider">Rewrite Pipeline</h3>
                    <div className="grid grid-cols-4 gap-3 text-center">
                        {[
                            { label: 'Flagged', count: stats.rewriteByStatus.flagged, color: 'bg-amber-400' },
                            { label: 'In Progress', count: stats.rewriteByStatus.inProgress, color: 'bg-blue-400' },
                            { label: 'Review', count: stats.rewriteByStatus.review, color: 'bg-violet-400' },
                            { label: 'Complete', count: stats.rewriteByStatus.complete, color: 'bg-emerald-400' },
                        ].map((stage) => (
                            <div key={stage.label}>
                                <div className={cn('h-2 rounded-full mb-2', stage.color)} style={{ width: '100%' }} />
                                <p className="text-lg font-bold text-text-primary">{stage.count}</p>
                                <p className="text-xs text-text-tertiary">{stage.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-border pb-1">
                {[
                    { key: 'all' as const, label: 'All' },
                    { key: 'critical' as const, label: 'Critical' },
                    { key: 'failing' as const, label: 'Failing' },
                    { key: 'below' as const, label: 'Below Standard' },
                    { key: 'passing' as const, label: 'Passing' },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={cn(
                            'px-3 py-2 text-sm font-medium rounded-t transition-colors',
                            filter === tab.key
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-text-tertiary hover:text-text-primary',
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Article Table */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-surface-hover text-text-tertiary text-xs uppercase tracking-wider">
                                <th className="text-left px-4 py-3 font-medium">Title</th>
                                <th className="text-left px-4 py-3 font-medium">Category</th>
                                <th className="text-center px-4 py-3 font-medium">Words</th>
                                <th className="text-center px-4 py-3 font-medium">Quality</th>
                                <th className="text-center px-4 py-3 font-medium">Status</th>
                                <th className="text-center px-4 py-3 font-medium">Video</th>
                                <th className="text-center px-4 py-3 font-medium">Audio</th>
                                <th className="text-right px-4 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={8} className="px-4 py-12 text-center text-text-tertiary">
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredArticles.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-4 py-12 text-center text-text-tertiary">
                                        No articles match this filter.
                                    </td>
                                </tr>
                            ) : (
                                filteredArticles.map((article) => (
                                    <tr key={article.id} className="hover:bg-surface-hover/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => navigate(adminPath(`articles/${article.id}`))}
                                                className="text-left font-medium text-text-primary hover:text-primary transition-colors line-clamp-1 max-w-[300px]"
                                            >
                                                {article.title}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-text-tertiary text-xs">{article.category_name}</td>
                                        <td className="px-4 py-3 text-center">
                                            <WordCountBadge wordCount={article.word_count} />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <QualityBadge score={article.quality_score} />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {article.rewrite_needed ? (
                                                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                                                    {article.rewrite_status}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-text-tertiary">-</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={cn(
                                                'text-xs',
                                                article.video_status === 'published' ? 'text-emerald-600' : 'text-text-tertiary',
                                            )}>
                                                {article.video_status === 'published' ? 'Yes' : article.video_status === 'none' ? '-' : article.video_status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={cn(
                                                'text-xs',
                                                article.audio_status === 'published' ? 'text-emerald-600' : 'text-text-tertiary',
                                            )}>
                                                {article.audio_status === 'published' ? 'Yes' : article.audio_status === 'tts_only' ? 'TTS' : article.audio_status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center gap-2 justify-end">
                                                {!article.rewrite_needed && article.word_count < 2000 && (
                                                    <button
                                                        onClick={() => flagMutation.mutate(article.id)}
                                                        disabled={flagMutation.isPending}
                                                        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded transition-colors"
                                                        title="Flag for rewrite"
                                                    >
                                                        <Flag size={12} />
                                                        Flag
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => navigate(adminPath(`articles/${article.id}`))}
                                                    className="p-1 text-text-tertiary hover:text-primary transition-colors"
                                                    title="View article"
                                                >
                                                    <ArrowRight size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ArticleQualityDashboard;
