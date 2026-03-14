import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  Scissors,
  Plus,
  Trash2,
  GripVertical,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import PageHeader from '@/components/admin/PageHeader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { getArticleById, createBreakdownArticles } from '@/services/articleAdminService';
import { fetchArticleFromSanity } from '@/services/sanitySyncService';
import { adminPath } from '@/hooks/useAdminNavigate';

interface BreakdownSection {
  id: string;
  title: string;
  slug: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

const AdminArticleBreakdown: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [sections, setSections] = useState<BreakdownSection[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const { data: article } = useQuery({
    queryKey: ['admin', 'article', id],
    queryFn: () => getArticleById(id!),
    enabled: !!id,
  });

  const { data: sanityContent } = useQuery({
    queryKey: ['admin', 'sanity-article', article?.sanity_id],
    queryFn: () => (article?.sanity_id ? fetchArticleFromSanity(article.sanity_id) : null),
    enabled: !!article?.sanity_id,
  });

  const breakdownMutation = useMutation({
    mutationFn: () =>
      createBreakdownArticles(
        id!,
        sections.map((s) => ({ title: s.title, slug: s.slug }))
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'articles'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'article', id] });
      toast.success(`Created ${sections.length} sub-articles`);
      navigate(adminPath('/articles/clusters'));
    },
    onError: (err: Error) => toast.error(`Breakdown failed: ${err.message}`),
  });

  const addSection = () => {
    const num = sections.length + 1;
    const title = `Part ${num}: `;
    setSections((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, slug: generateSlug(title) },
    ]);
  };

  const updateSection = (sectionId: string, field: 'title' | 'slug', value: string) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== sectionId) return s;
        if (field === 'title') {
          return { ...s, title: value, slug: generateSlug(value) };
        }
        return { ...s, [field]: value };
      })
    );
  };

  const removeSection = (sectionId: string) => {
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
  };

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
        title="Article Breakdown"
        description={`Breaking down: "${article.title}"`}
        actions={
          <button
            onClick={() => navigate(adminPath(`/articles/${id}`))}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Article
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source content */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Source Article</h3>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-5">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{article.title}</h4>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span>{article.word_count.toLocaleString()} words</span>
              <span>{Math.ceil(article.word_count / 200)} min read</span>
            </div>
            {sanityContent?.summary ? (
              <p className="text-sm text-gray-600 dark:text-slate-400">{sanityContent.summary}</p>
            ) : (
              <p className="text-sm text-gray-400 italic">No summary available from Sanity.</p>
            )}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-400">
                Define sub-articles below. Each section will become a new article linked to this parent as a topic cluster.
              </p>
            </div>
          </div>
        </div>

        {/* Breakdown editor */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Sub-Articles</h3>
            <button
              onClick={addSection}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
            >
              <Plus size={14} />
              Add Section
            </button>
          </div>

          {sections.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600 p-8 text-center">
              <Scissors size={32} className="mx-auto mb-3 text-gray-400" />
              <p className="text-sm text-gray-500">
                Click "Add Section" to define sub-articles for the breakdown.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 mt-2">
                      <GripVertical size={16} className="text-gray-400" />
                      <span className="text-xs font-mono text-gray-400 w-5">{index + 1}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                        placeholder="Sub-article title..."
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <input
                        type="text"
                        value={section.slug}
                        onChange={(e) => updateSection(section.id, 'slug', e.target.value)}
                        placeholder="slug"
                        className="w-full px-3 py-1.5 text-xs font-mono border border-gray-200 dark:border-slate-700 rounded bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    <button
                      onClick={() => removeSection(section.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors mt-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sections.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {sections.length} sub-article{sections.length !== 1 ? 's' : ''} will be created
              </p>
              <button
                onClick={() => setShowConfirm(true)}
                disabled={sections.some((s) => !s.title.trim())}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                <CheckCircle size={16} />
                Confirm Breakdown
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={showConfirm}
        onOpenChange={(open) => !open && setShowConfirm(false)}
        title="Confirm Article Breakdown"
        description={`This will create ${sections.length} new sub-articles and mark "${article.title}" as a topic cluster parent. This action cannot be easily reversed.`}
        confirmLabel="Create Sub-Articles"
        onConfirm={() => breakdownMutation.mutate()}
      />
    </div>
  );
};

export default AdminArticleBreakdown;
