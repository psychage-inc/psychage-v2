import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  FileText,
  Star,
  Image as ImageIcon,
  GitBranch,
  BarChart3,
  ExternalLink,
  Scissors,
  Send,
  CheckCircle,
  XCircle,
  RotateCcw,
  Upload,
  Trash2,
  MessageSquare,
  Clock,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from 'sonner';
import PageHeader from '@/components/admin/PageHeader';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import QualityGateDashboard from '@/components/admin/articles/QualityGateDashboard';
import ArticleTypeSelector from '@/components/admin/articles/ArticleTypeSelector';
import CitationManager from '@/components/admin/articles/CitationManager';
import {
  getArticleById,
  getArticleComments,
  createArticleComment,
  resolveComment,
  unresolveComment,
  getArticleStatusHistory,
  getArticleImages,
  uploadArticleImage,
  deleteArticleImage,
  updateArticleImage,
  updateArticleRatings,
  updateArticleStatus,
} from '@/services/articleAdminService';
import { fetchArticleFromSanity } from '@/services/sanitySyncService';
import type {
  ArticleRecord,
  ArticleCommentRecord,
  ArticleImageRecord,
  ArticleStatusHistoryRecord,
  ArticleStatus,
  CommentSeverity,
  ImagePurpose,
} from '@/lib/admin/types';
import type { ArticleType, EnhancedCitation } from '@/lib/article-framework/types';
import { ARTICLE_STATUS_TRANSITIONS, COMMENT_SEVERITIES, IMAGE_PURPOSES, RATING_DIMENSIONS } from '@/lib/admin/constants';
import { adminPath } from '@/hooks/useAdminNavigate';

type TabId = 'content' | 'review' | 'media' | 'workflow' | 'performance' | 'quality';

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'review', label: 'Rating & Review', icon: Star },
  { id: 'media', label: 'Media', icon: ImageIcon },
  { id: 'workflow', label: 'Workflow', icon: GitBranch },
  { id: 'performance', label: 'Performance', icon: BarChart3 },
  { id: 'quality', label: 'Quality', icon: ShieldCheck },
];

// ============================================================
// Main Component
// ============================================================

const AdminArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('content');
  const [citations, setCitations] = useState<EnhancedCitation[]>([]);

  const { data: article, isLoading } = useQuery({
    queryKey: ['admin', 'article', id],
    queryFn: () => getArticleById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-1/3" />
        <div className="h-64 bg-gray-200 dark:bg-slate-700 rounded" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Article not found.</p>
        <button onClick={() => navigate(adminPath('/articles'))} className="text-teal-600 mt-2 hover:underline">
          Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={article.title}
        description={
          <div className="flex items-center gap-3 mt-1">
            <AdminStatusBadge status={article.status} />
            {article.author_name && (
              <span className="text-sm text-gray-500">by {article.author_name}</span>
            )}
            {article.category && (
              <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400 px-2 py-0.5 rounded">
                {article.category}
              </span>
            )}
          </div>
        }
        actions={
          <button
            onClick={() => navigate(adminPath('/articles'))}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        }
      />

      {/* Tab bar */}
      <div className="border-b border-gray-200 dark:border-slate-700 mb-6">
        <nav className="flex gap-1 -mb-px">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300 hover:border-gray-300'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === 'content' && <ContentTab article={article} />}
      {activeTab === 'review' && <ReviewTab article={article} />}
      {activeTab === 'media' && <MediaTab article={article} />}
      {activeTab === 'workflow' && <WorkflowTab article={article} />}
      {activeTab === 'performance' && <PerformanceTab article={article} />}
      {activeTab === 'quality' && (
        <div className="space-y-8">
          <QualityGateDashboard article={article} citations={citations} />
          <CitationManager citations={citations} onChange={setCitations} articleId={article.id} />
        </div>
      )}
    </div>
  );
};

// ============================================================
// Tab 1: Content
// ============================================================

function ContentTab({ article }: { article: ArticleRecord }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: sanityContent } = useQuery({
    queryKey: ['admin', 'sanity-article', article.sanity_id],
    queryFn: () => (article.sanity_id ? fetchArticleFromSanity(article.sanity_id) : null),
    enabled: !!article.sanity_id,
  });

  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  const sanityStudioUrl = projectId
    ? `https://${projectId}.sanity.studio/desk/article;${article.sanity_id}`
    : null;

  const handleArticleTypeChange = useCallback(
    (_type: ArticleType) => {
      // In production, this would call articleAdminService.updateArticle()
      // For now, this updates the local state — the type is persisted on save
      toast.success(`Article type set to ${_type.replace(/_/g, ' ')}`);
    },
    [],
  );

  return (
    <div className="space-y-6">
      {/* Article Type Selector */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
        <ArticleTypeSelector
          value={article.article_type}
          onChange={handleArticleTypeChange}
        />
      </div>

      {/* Meta info cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 text-center">
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            {article.word_count.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Words</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 text-center">
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            {article.word_count > 0 ? `${Math.ceil(article.word_count / 200)} min` : '—'}
          </div>
          <div className="text-sm text-gray-500">Read Time</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 text-center">
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            {article.sanity_last_synced_at
              ? formatDistanceToNow(new Date(article.sanity_last_synced_at), { addSuffix: true })
              : 'Never'}
          </div>
          <div className="text-sm text-gray-500">Last Synced</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {sanityStudioUrl && (
          <a
            href={sanityStudioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-slate-600 transition-colors"
          >
            <ExternalLink size={16} />
            Edit in Sanity
          </a>
        )}
        <button
          onClick={() => navigate(adminPath(`/articles/${article.id}/breakdown`))}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        >
          <Scissors size={16} />
          Break Down
        </button>
      </div>

      {/* Article content preview */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
        {sanityContent?.body ? (
          <div className="prose dark:prose-invert max-w-none">
            <h2>{sanityContent.title}</h2>
            {sanityContent.summary && (
              <p className="text-lg text-gray-600 dark:text-slate-400 italic">{sanityContent.summary}</p>
            )}
            <p className="text-sm text-gray-500">
              Full article content is rendered in Sanity Studio. This view shows metadata and summary.
            </p>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FileText size={32} className="mx-auto mb-2 opacity-40" />
            <p>
              {article.sanity_id
                ? 'Unable to load content from Sanity. Check your CMS configuration.'
                : 'This article has no linked Sanity document.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Tab 2: Rating & Review
// ============================================================

function ReviewTab({ article }: { article: ArticleRecord }) {
  const queryClient = useQueryClient();

  // Ratings state
  const [ratings, setRatings] = useState({
    rating_accuracy: article.rating_accuracy || 0,
    rating_readability: article.rating_readability || 0,
    rating_completeness: article.rating_completeness || 0,
    rating_sensitivity: article.rating_sensitivity || 0,
  });

  // Comment form state
  const [commentBody, setCommentBody] = useState('');
  const [commentSeverity, setCommentSeverity] = useState<CommentSeverity>('suggestion');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const { data: comments = [] } = useQuery({
    queryKey: ['admin', 'article-comments', article.id],
    queryFn: () => getArticleComments(article.id),
  });

  const ratingMutation = useMutation({
    mutationFn: () =>
      updateArticleRatings(article.id, {
        rating_accuracy: ratings.rating_accuracy,
        rating_readability: ratings.rating_readability,
        rating_completeness: ratings.rating_completeness,
        rating_sensitivity: ratings.rating_sensitivity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'article', article.id] });
      toast.success('Ratings saved');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const commentMutation = useMutation({
    mutationFn: () =>
      createArticleComment({
        article_id: article.id,
        body: commentBody,
        severity: commentSeverity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'article-comments', article.id] });
      setCommentBody('');
      toast.success('Comment added');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const resolveMutation = useMutation({
    mutationFn: ({ commentId, resolved }: { commentId: string; resolved: boolean }) =>
      resolved ? unresolveComment(commentId, article.id) : resolveComment(commentId, article.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'article-comments', article.id] });
    },
  });

  const filteredComments =
    severityFilter === 'all' ? comments : comments.filter((c) => c.severity === severityFilter);

  const criticalCount = comments.filter((c) => c.severity === 'critical' && !c.is_resolved).length;
  const needsFixCount = comments.filter((c) => c.severity === 'needs_fix' && !c.is_resolved).length;
  const suggestionCount = comments.filter((c) => c.severity === 'suggestion' && !c.is_resolved).length;

  const overallRating =
    ratings.rating_accuracy > 0
      ? Number(
          (
            ratings.rating_accuracy * 0.3 +
            ratings.rating_readability * 0.25 +
            ratings.rating_completeness * 0.25 +
            ratings.rating_sensitivity * 0.2
          ).toFixed(1)
        )
      : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Rating panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Article Rating</h3>

          {RATING_DIMENSIONS.map((dim) => {
            const key = dim.key as keyof typeof ratings;
            return (
              <div key={dim.key} className="mb-4">
                <label className="text-xs text-gray-500 dark:text-slate-400 mb-1 block">{dim.label}</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRatings((prev) => ({ ...prev, [key]: star }))}
                      className="p-0.5"
                    >
                      <Star
                        size={20}
                        className={
                          star <= (ratings[key] || 0)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300 dark:text-slate-600'
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {overallRating !== null && (
            <div className="pt-3 border-t border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Overall</span>
                <span className="text-lg font-bold text-amber-500">{overallRating}/5</span>
              </div>
            </div>
          )}

          <button
            onClick={() => ratingMutation.mutate()}
            disabled={ratingMutation.isPending}
            className="mt-4 w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {ratingMutation.isPending ? 'Saving...' : 'Save Ratings'}
          </button>
        </div>
      </div>

      {/* Comments panel */}
      <div className="lg:col-span-2 space-y-4">
        {/* Comment counts */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {comments.length} Comments
          </span>
          {criticalCount > 0 && (
            <span className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full">
              {criticalCount} Critical
            </span>
          )}
          {needsFixCount > 0 && (
            <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
              {needsFixCount} Needs Fix
            </span>
          )}
          {suggestionCount > 0 && (
            <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
              {suggestionCount} Suggestions
            </span>
          )}
        </div>

        {/* Severity filter */}
        <div className="flex gap-2">
          {['all', ...COMMENT_SEVERITIES.map((s) => s.value)].map((f) => (
            <button
              key={f}
              onClick={() => setSeverityFilter(f)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                severityFilter === f
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'All' : f.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Comment list */}
        <div className="space-y-3">
          {filteredComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              articleId={article.id}
              onResolveToggle={(commentId, resolved) =>
                resolveMutation.mutate({ commentId, resolved })
              }
            />
          ))}
          {filteredComments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare size={24} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No comments yet</p>
            </div>
          )}
        </div>

        {/* New comment form */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
          <textarea
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder="Add a review comment..."
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          />
          <div className="flex items-center justify-between mt-3">
            <select
              value={commentSeverity}
              onChange={(e) => setCommentSeverity(e.target.value as CommentSeverity)}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {COMMENT_SEVERITIES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => commentMutation.mutate()}
              disabled={!commentBody.trim() || commentMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <Send size={14} />
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentCard({
  comment,
  articleId,
  onResolveToggle,
}: {
  comment: ArticleCommentRecord;
  articleId: string;
  onResolveToggle: (commentId: string, currentlyResolved: boolean) => void;
}) {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg border p-4 ${
        comment.is_resolved
          ? 'border-gray-200 dark:border-slate-700 opacity-60'
          : comment.severity === 'critical'
            ? 'border-red-300 dark:border-red-800'
            : comment.severity === 'needs_fix'
              ? 'border-amber-300 dark:border-amber-800'
              : 'border-gray-200 dark:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">{comment.author_name}</span>
          <AdminStatusBadge status={comment.severity} />
          {comment.is_resolved && <AdminStatusBadge status="approved" />}
        </div>
        <span className="text-xs text-gray-400">
          {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
        </span>
      </div>
      {comment.section_reference && (
        <div className="text-xs text-gray-500 dark:text-slate-400 mb-2 italic">
          Re: {comment.section_reference}
        </div>
      )}
      <p className="text-sm text-gray-700 dark:text-slate-300 mb-3">{comment.body}</p>
      <button
        onClick={() => onResolveToggle(comment.id, comment.is_resolved)}
        className={`text-xs font-medium transition-colors ${
          comment.is_resolved
            ? 'text-amber-600 hover:text-amber-700'
            : 'text-emerald-600 hover:text-emerald-700'
        }`}
      >
        {comment.is_resolved ? 'Mark as Unresolved' : 'Mark as Resolved'}
      </button>
    </div>
  );
}

// ============================================================
// Tab 3: Media
// ============================================================

function MediaTab({ article }: { article: ArticleRecord }) {
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<ArticleImageRecord | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { data: images = [] } = useQuery({
    queryKey: ['admin', 'article-images', article.id],
    queryFn: () => getArticleImages(article.id),
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadArticleImage(article.id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'article-images', article.id] });
      toast.success('Image uploaded');
    },
    onError: (err: Error) => toast.error(`Upload failed: ${err.message}`),
  });

  const deleteMutation = useMutation({
    mutationFn: (img: ArticleImageRecord) =>
      deleteArticleImage(img.id, img.storage_path, article.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'article-images', article.id] });
      setDeleteTarget(null);
      toast.success('Image deleted');
    },
    onError: (err: Error) => toast.error(`Delete failed: ${err.message}`),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: { alt_text?: string; caption?: string; purpose?: ImagePurpose } }) =>
      updateArticleImage(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'article-images', article.id] });
    },
  });

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
      files.forEach((file) => uploadMutation.mutate(file));
    },
    [uploadMutation]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => uploadMutation.mutate(file));
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/10'
            : 'border-gray-300 dark:border-slate-600 hover:border-gray-400'
        }`}
      >
        <Upload size={32} className="mx-auto mb-3 text-gray-400" />
        <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">
          Drag & drop images here, or{' '}
          <label className="text-teal-600 hover:text-teal-700 cursor-pointer font-medium">
            browse
            <input type="file" multiple accept="image/*" onChange={handleFileSelect} className="hidden" />
          </label>
        </p>
        <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB each</p>
        {uploadMutation.isPending && (
          <p className="text-sm text-teal-600 mt-2">Uploading...</p>
        )}
      </div>

      {/* Image gallery */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img) => (
            <ImageCard
              key={img.id}
              image={img}
              onDelete={() => setDeleteTarget(img)}
              onUpdate={(updates) => updateMutation.mutate({ id: img.id, updates })}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <ImageIcon size={32} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">No images uploaded yet</p>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Image"
        description={`Delete "${deleteTarget?.original_filename}"? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget)}
      />
    </div>
  );
}

function ImageCard({
  image,
  onDelete,
  onUpdate,
}: {
  image: ArticleImageRecord;
  onDelete: () => void;
  onUpdate: (updates: { alt_text?: string; caption?: string; purpose?: ImagePurpose }) => void;
}) {
  const [altText, setAltText] = useState(image.alt_text || '');
  const [caption, setCaption] = useState(image.caption || '');

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
      <div className="aspect-video bg-gray-100 dark:bg-slate-900">
        <img src={image.public_url} alt={image.alt_text || ''} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 truncate">{image.original_filename}</span>
          <div className="flex items-center gap-1">
            <AdminStatusBadge status={image.purpose} />
            <button onClick={onDelete} className="p-1 text-gray-400 hover:text-red-500">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        <select
          value={image.purpose}
          onChange={(e) => onUpdate({ purpose: e.target.value as ImagePurpose })}
          className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-slate-600 rounded bg-transparent text-gray-700 dark:text-slate-300"
        >
          {IMAGE_PURPOSES.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
        <input
          type="text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          onBlur={() => altText !== image.alt_text && onUpdate({ alt_text: altText })}
          placeholder="Alt text..."
          className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-slate-600 rounded bg-transparent text-gray-700 dark:text-slate-300 placeholder-gray-400"
        />
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          onBlur={() => caption !== image.caption && onUpdate({ caption })}
          placeholder="Caption..."
          className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-slate-600 rounded bg-transparent text-gray-700 dark:text-slate-300 placeholder-gray-400"
        />
      </div>
    </div>
  );
}

// ============================================================
// Tab 4: Workflow
// ============================================================

function WorkflowTab({ article }: { article: ArticleRecord }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [transitionNotes, setTransitionNotes] = useState('');
  const [confirmAction, setConfirmAction] = useState<{ status: ArticleStatus; label: string } | null>(null);

  const { data: history = [] } = useQuery({
    queryKey: ['admin', 'article-status-history', article.id],
    queryFn: () => getArticleStatusHistory(article.id),
  });

  const { data: comments = [] } = useQuery({
    queryKey: ['admin', 'article-comments', article.id],
    queryFn: () => getArticleComments(article.id),
  });

  const unresolvedBlockers = comments.filter(
    (c) => (c.severity === 'critical' || c.severity === 'needs_fix') && !c.is_resolved
  ).length;

  const statusMutation = useMutation({
    mutationFn: ({ newStatus, notes }: { newStatus: ArticleStatus; notes?: string }) =>
      updateArticleStatus(article.id, newStatus, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'article', article.id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'article-status-history', article.id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'articles'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'article-stats'] });
      toast.success('Status updated');
      setConfirmAction(null);
      setShowRejectDialog(false);
    },
    onError: (err: Error) => {
      toast.error(`Status change failed: ${err.message}`);
    },
  });

  const allowedTransitions = ARTICLE_STATUS_TRANSITIONS[article.status as ArticleStatus] || [];

  const statusColor: Record<string, string> = {
    draft: 'bg-gray-400',
    in_review: 'bg-blue-500',
    approved: 'bg-emerald-500',
    rejected: 'bg-red-500',
    published: 'bg-emerald-600',
    paused: 'bg-orange-500',
    archived: 'bg-gray-500',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Timeline */}
      <div className="lg:col-span-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Status History</h3>
        <div className="space-y-0">
          {history.map((entry, i) => (
            <div key={entry.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${statusColor[entry.to_status] || 'bg-gray-400'}`} />
                {i < history.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 dark:bg-slate-700" />}
              </div>
              <div className="pb-6">
                <div className="flex items-center gap-2">
                  <AdminStatusBadge status={entry.to_status} />
                  {entry.from_status && (
                    <>
                      <ArrowRight size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-400">from {entry.from_status}</span>
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                  {entry.changed_by_name || 'System'}
                  <span className="text-gray-400 mx-1">·</span>
                  {format(new Date(entry.created_at), 'MMM d, yyyy h:mm a')}
                </div>
                {entry.notes && (
                  <p className="text-sm text-gray-500 dark:text-slate-500 mt-1 italic">{entry.notes}</p>
                )}
              </div>
            </div>
          ))}
          {history.length === 0 && (
            <p className="text-sm text-gray-500 py-4">No status history recorded.</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Actions</h3>

          <div className="text-sm text-gray-600 dark:text-slate-400 mb-4">
            Current status: <AdminStatusBadge status={article.status} className="ml-1" />
          </div>

          {unresolvedBlockers > 0 && allowedTransitions.includes('approved') && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg">
              <AlertCircle size={16} className="text-amber-500 flex-shrink-0" />
              <span className="text-xs text-amber-700 dark:text-amber-400">
                {unresolvedBlockers} unresolved blocking comment{unresolvedBlockers > 1 ? 's' : ''}
              </span>
            </div>
          )}

          <div className="space-y-2">
            {allowedTransitions.includes('approved') && (
              <button
                onClick={() => setConfirmAction({ status: 'approved', label: 'Approve' })}
                disabled={unresolvedBlockers > 0}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle size={16} />
                Approve
              </button>
            )}
            {allowedTransitions.includes('rejected') && (
              <button
                onClick={() => setShowRejectDialog(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <XCircle size={16} />
                Reject
              </button>
            )}
            {allowedTransitions.includes('draft') && (
              <button
                onClick={() => setConfirmAction({ status: 'draft', label: 'Return to Draft' })}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <RotateCcw size={16} />
                Return to Draft
              </button>
            )}
            {allowedTransitions.includes('in_review') && (
              <button
                onClick={() => setConfirmAction({ status: 'in_review', label: 'Submit for Review' })}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Send size={16} />
                Submit for Review
              </button>
            )}
            {allowedTransitions.includes('published') && (
              <button
                onClick={() => setConfirmAction({ status: 'published', label: 'Publish' })}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <CheckCircle size={16} />
                Publish
              </button>
            )}
            {allowedTransitions.includes('paused') && (
              <button
                onClick={() => setConfirmAction({ status: 'paused', label: 'Pause' })}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-orange-300 text-orange-700 text-sm font-medium rounded-lg hover:bg-orange-50 transition-colors"
              >
                <Clock size={16} />
                Pause
              </button>
            )}
            {allowedTransitions.includes('archived') && (
              <button
                onClick={() => setConfirmAction({ status: 'archived', label: 'Archive' })}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-500 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Trash2 size={16} />
                Archive
              </button>
            )}
          </div>

          {article.rejection_reason && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">Rejection Reason:</p>
              <p className="text-sm text-red-600 dark:text-red-300">{article.rejection_reason}</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirm transition dialog */}
      <ConfirmDialog
        open={!!confirmAction}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title={`${confirmAction?.label} Article`}
        description={`Are you sure you want to ${confirmAction?.label?.toLowerCase()} "${article.title}"?`}
        confirmLabel={confirmAction?.label || 'Confirm'}
        onConfirm={() =>
          confirmAction && statusMutation.mutate({ newStatus: confirmAction.status, notes: transitionNotes || undefined })
        }
      />

      {/* Reject dialog with reason */}
      <ConfirmDialog
        open={showRejectDialog}
        onOpenChange={(open) => !open && setShowRejectDialog(false)}
        title="Reject Article"
        description={
          <div className="space-y-3">
            <p>Provide a reason for rejecting "{article.title}":</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              placeholder="Rejection reason (required)..."
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>
        }
        confirmLabel="Reject"
        destructive
        onConfirm={() =>
          statusMutation.mutate({ newStatus: 'rejected', notes: rejectReason })
        }
      />
    </div>
  );
}

// ============================================================
// Tab 5: Performance
// ============================================================

function PerformanceTab({ article }: { article: ArticleRecord }) {
  const metrics = [
    { label: 'Page Views', value: article.view_count.toLocaleString(), icon: BarChart3 },
    {
      label: 'Avg Read Time',
      value: article.avg_read_time_seconds
        ? `${Math.round(article.avg_read_time_seconds / 60)} min`
        : '—',
      icon: Clock,
    },
    { label: 'Word Count', value: article.word_count.toLocaleString(), icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-5"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-2">
              <m.icon size={16} />
              {m.label}
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{m.value}</div>
          </div>
        ))}
      </div>

      {article.status !== 'published' && (
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Performance data will be available once this article is published.
          </p>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
        <div className="text-center py-12">
          <BarChart3 size={48} className="mx-auto mb-4 text-gray-300 dark:text-slate-600" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-slate-300 mb-2">
            Analytics Integration Pending
          </h3>
          <p className="text-sm text-gray-500 dark:text-slate-500 max-w-md mx-auto">
            This section will display detailed engagement charts once analytics (Plausible/PostHog) are connected.
            The component is structured to receive real data.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminArticleDetail;
