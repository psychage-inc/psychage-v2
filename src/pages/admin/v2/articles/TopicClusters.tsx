import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  GripVertical,
  Rocket,
  Network,
} from 'lucide-react';
import { toast } from 'sonner';
import PageHeader from '@/components/admin/PageHeader';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import {
  getTopicClusters,
  getClusterChildren,
  reorderClusterChildren,
  updateArticleStatus,
} from '@/services/articleAdminService';
import type { ArticleRecord, ArticleStatus } from '@/lib/admin/types';
import { adminPath } from '@/hooks/useAdminNavigate';

// ============================================================
// Cluster Card
// ============================================================

function ClusterCard({ parent }: { parent: ArticleRecord }) {
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const { data: children = [], isLoading } = useQuery({
    queryKey: ['admin', 'cluster-children', parent.id],
    queryFn: () => getClusterChildren(parent.id),
    enabled: expanded,
  });

  const reorderMutation = useMutation({
    mutationFn: (orderedIds: string[]) => reorderClusterChildren(parent.id, orderedIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'cluster-children', parent.id] });
    },
  });

  const publishMutation = useMutation({
    mutationFn: async () => {
      const approvedChildren = children.filter((c) => c.status === 'approved');
      for (const child of approvedChildren) {
        await updateArticleStatus(child.id, 'published');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'cluster-children', parent.id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'articles'] });
      toast.success('Approved articles published');
      setShowPublishConfirm(false);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;

    const reordered = [...children];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);

    setDragIndex(index);
    reorderMutation.mutate(reordered.map((c) => c.id));
  };

  const publishedCount = children.filter((c) => c.status === 'published').length;
  const approvedCount = children.filter((c) => c.status === 'approved').length;
  const completionPct = children.length > 0 ? Math.round((publishedCount / children.length) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
      {/* Cluster header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-slate-750 transition-colors rounded-t-lg"
      >
        <div className="flex items-center gap-3">
          {expanded ? (
            <ChevronDown size={18} className="text-gray-400" />
          ) : (
            <ChevronRight size={18} className="text-gray-400" />
          )}
          <div>
            <Link
              to={adminPath(`/articles/${parent.id}`)}
              onClick={(e) => e.stopPropagation()}
              className="font-medium text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400"
            >
              {parent.title}
            </Link>
            <div className="flex items-center gap-2 mt-1">
              <AdminStatusBadge status={parent.status} />
              <span className="text-xs text-gray-500">{parent.category || 'Uncategorized'}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          {expanded && children.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{completionPct}%</span>
            </div>
          )}
          <span className="text-xs text-gray-400">
            {expanded ? children.length : '...'} sub-articles
          </span>
        </div>
      </button>

      {/* Expanded children */}
      {expanded && (
        <div className="border-t border-gray-200 dark:border-slate-700">
          {isLoading ? (
            <div className="p-4 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-gray-100 dark:bg-slate-700 rounded animate-pulse" />
              ))}
            </div>
          ) : children.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500">No sub-articles yet.</div>
          ) : (
            <>
              <div className="divide-y divide-gray-100 dark:divide-slate-700">
                {children.map((child, index) => (
                  <div
                    key={child.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={() => setDragIndex(null)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-750 cursor-move"
                  >
                    <GripVertical size={14} className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs font-mono text-gray-400 w-6">{index + 1}.</span>
                    <Link
                      to={adminPath(`/articles/${child.id}`)}
                      className="flex-1 text-sm text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400"
                    >
                      {child.title}
                    </Link>
                    <AdminStatusBadge status={child.status} />
                  </div>
                ))}
              </div>

              {approvedCount > 0 && (
                <div className="p-3 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={() => setShowPublishConfirm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <Rocket size={16} />
                    Publish {approvedCount} Approved
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <ConfirmDialog
        open={showPublishConfirm}
        onOpenChange={(open) => !open && setShowPublishConfirm(false)}
        title="Publish Cluster Articles"
        description={`This will publish ${approvedCount} approved sub-article${approvedCount !== 1 ? 's' : ''} in the "${parent.title}" cluster.`}
        confirmLabel="Publish All"
        onConfirm={() => publishMutation.mutate()}
      />
    </div>
  );
}

// ============================================================
// Main Page
// ============================================================

const AdminTopicClusters: React.FC = () => {
  const navigate = useNavigate();

  const { data: clusters = [], isLoading } = useQuery({
    queryKey: ['admin', 'topic-clusters'],
    queryFn: getTopicClusters,
  });

  return (
    <div>
      <PageHeader
        title="Topic Clusters"
        description="Manage article groups and their sub-articles"
        actions={
          <button
            onClick={() => navigate(adminPath('/articles'))}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            All Articles
          </button>
        }
      />

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 dark:bg-slate-700 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : clusters.length === 0 ? (
        <div className="text-center py-16">
          <Network size={48} className="mx-auto mb-4 text-gray-300 dark:text-slate-600" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-slate-300 mb-2">No Topic Clusters</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
            Topic clusters are created when you break down an article into sub-articles. Go to any article
            and use the "Break Down" button to get started.
          </p>
          <button
            onClick={() => navigate(adminPath('/articles'))}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Browse Articles
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {clusters.map((cluster) => (
            <ClusterCard key={cluster.id} parent={cluster} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTopicClusters;
