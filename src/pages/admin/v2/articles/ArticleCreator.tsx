import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save, PenLine } from 'lucide-react';
import { toast } from 'sonner';
import TiptapEditor from '@/components/admin/TiptapEditor';
import ArticleTypeSelector from '@/components/admin/articles/ArticleTypeSelector';
import PageHeader from '@/components/admin/PageHeader';
import { createArticle, getArticleCategories, getSubcategoriesForCategory } from '@/services/articleAdminService';
import { ARTICLE_TEMPLATE_TYPES } from '@/lib/admin/constants';
import type { ArticleType } from '@/lib/article-framework/types';
import type { ArticleCategoryRecord, ArticleSubcategoryRecord } from '@/lib/admin/types';
import { adminPath } from '@/hooks/useAdminNavigate';

// ============================================================
// Validation
// ============================================================

const articleCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string(),
  content_format: z.enum(['markdown', 'html']),
  article_type: z.string().nullable(),
  category_id: z.string().nullable(),
  subcategory_id: z.string().nullable(),
  template_type: z.string().nullable(),
  author_name: z.string(),
  tags: z.string(),
  linked_condition_ids: z.string(),
  seo_description: z.string().max(300),
  is_cornerstone: z.boolean(),
  has_crisis_disclaimer: z.boolean(),
});

type ArticleCreateFormData = z.infer<typeof articleCreateSchema>;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ============================================================
// Article Creator Page
// ============================================================

const AdminArticleCreator: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Load categories
  const { data: categories } = useQuery({
    queryKey: ['admin', 'article-categories'],
    queryFn: getArticleCategories,
  });

  // Load subcategories when category changes
  const { data: subcategories } = useQuery({
    queryKey: ['admin', 'article-subcategories', selectedCategoryId],
    queryFn: () => getSubcategoriesForCategory(selectedCategoryId!),
    enabled: !!selectedCategoryId,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ArticleCreateFormData>({
    resolver: zodResolver(articleCreateSchema),
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      content_format: 'html',
      article_type: null,
      category_id: null,
      subcategory_id: null,
      template_type: null,
      author_name: 'Dr. Lena Dobson',
      tags: '',
      linked_condition_ids: '',
      seo_description: '',
      is_cornerstone: false,
      has_crisis_disclaimer: false,
    },
  });

  // Auto-generate slug from title
  const title = watch('title');
  useEffect(() => {
    if (title && !slugManuallyEdited) {
      setValue('slug', generateSlug(title));
    }
  }, [title, slugManuallyEdited, setValue]);

  // Track category changes for subcategory loading
  const watchedCategoryId = watch('category_id');
  useEffect(() => {
    setSelectedCategoryId(watchedCategoryId);
    if (watchedCategoryId !== selectedCategoryId) {
      setValue('subcategory_id', null);
    }
  }, [watchedCategoryId, selectedCategoryId, setValue]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (data: ArticleCreateFormData & { reviewStage?: string }) => {
      const tagsArray = data.tags
        ? data.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [];
      const conditionIds = data.linked_condition_ids
        ? data.linked_condition_ids.split(',').map((c) => c.trim()).filter(Boolean)
        : [];

      const payload: Record<string, unknown> = {
        title: data.title,
        slug: data.slug,
        content: data.content || '',
        content_format: data.content_format,
        status: 'draft',
        review_stage: data.reviewStage || 'planned',
        article_type: data.article_type || null,
        category_id: data.category_id || null,
        subcategory_id: data.subcategory_id || null,
        template_type: data.template_type || null,
        author_name: data.author_name,
        tags: tagsArray,
        linked_condition_ids: conditionIds,
        seo_description: data.seo_description || '',
        is_cornerstone: data.is_cornerstone,
        has_crisis_disclaimer: data.has_crisis_disclaimer,
      };

      return createArticle(payload);
    },
    onSuccess: (article) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'articles'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'article-stats'] });
      toast.success('Article created');
      navigate(adminPath(`/articles/${article.id}`));
    },
    onError: (err: Error) => {
      toast.error(`Failed to create article: ${err.message}`);
    },
  });

  const onSave = useCallback(
    (reviewStage?: string) => {
      handleSubmit((data) => {
        saveMutation.mutate({ ...data, reviewStage });
      })();
    },
    [handleSubmit, saveMutation]
  );

  return (
    <div>
      <PageHeader
        title="New Article"
        description="Create a new article for the platform"
        actions={
          <button
            onClick={() => navigate(adminPath('/articles'))}
            className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — Content (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title */}
          <input
            {...register('title')}
            placeholder="Article title"
            className="w-full text-2xl font-bold border-0 border-b border-border bg-transparent text-text-primary pb-3 outline-none focus:border-primary placeholder:text-text-tertiary"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}

          {/* Slug */}
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span>/learn/</span>
            <input
              {...register('slug')}
              onChange={(e) => {
                setSlugManuallyEdited(true);
                setValue('slug', e.target.value);
              }}
              className="text-sm bg-transparent border-b border-dashed border-border-hover outline-none focus:border-primary text-text-secondary"
            />
          </div>

          {/* Article Type Selector */}
          <Controller
            name="article_type"
            control={control}
            render={({ field }) => (
              <ArticleTypeSelector
                value={field.value as ArticleType | null}
                onChange={(type) => field.onChange(type)}
              />
            )}
          />

          {/* Tiptap Editor */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Content
            </label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TiptapEditor
                  content={field.value || ''}
                  onChange={field.onChange}
                  placeholder="Start writing your article content..."
                />
              )}
            />
          </div>

          {/* SEO Description */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              SEO Description
            </label>
            <textarea
              {...register('seo_description')}
              placeholder="2-3 sentence description for search engines (max 300 chars)"
              maxLength={300}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary resize-none outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-text-tertiary mt-1">
              {(watch('seo_description') || '').length}/300
            </p>
          </div>
        </div>

        {/* Right column — Metadata (1/3) */}
        <div className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Category
            </label>
            <select
              {...register('category_id')}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select category...</option>
              {(categories as ArticleCategoryRecord[] | undefined)?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          {selectedCategoryId && (
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Subcategory
              </label>
              <select
                {...register('subcategory_id')}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select subcategory...</option>
                {(subcategories as ArticleSubcategoryRecord[] | undefined)?.map(
                  (sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          {/* Template Type */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Template Type
            </label>
            <select
              {...register('template_type')}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select template...</option>
              {ARTICLE_TEMPLATE_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Author
            </label>
            <input
              {...register('author_name')}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Tags
            </label>
            <input
              {...register('tags')}
              placeholder="Comma-separated tags"
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-text-tertiary mt-1">
              e.g., anxiety, coping-strategies, mindfulness
            </p>
          </div>

          {/* Linked Conditions */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Linked Condition IDs
            </label>
            <input
              {...register('linked_condition_ids')}
              placeholder="Comma-separated condition IDs"
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-text-tertiary mt-1">
              e.g., GAD, MDE, PTSD
            </p>
          </div>

          {/* Checkboxes */}
          <div className="bg-surface border border-border rounded-2xl p-4 space-y-3">
            <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                {...register('is_cornerstone')}
                className="rounded border-border-hover text-primary focus:ring-primary"
              />
              Cornerstone article
            </label>
            <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                {...register('has_crisis_disclaimer')}
                className="rounded border-border-hover text-primary focus:ring-primary"
              />
              Requires crisis disclaimer
            </label>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => onSave('planned')}
              disabled={saveMutation.isPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border border-border rounded-lg text-text-secondary hover:bg-surface-hover transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {saveMutation.isPending ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              type="button"
              onClick={() => onSave('drafted')}
              disabled={saveMutation.isPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <PenLine size={16} />
              Save & Start Writing
            </button>
          </div>

          {/* Info box */}
          <div className="bg-surface-hover border border-border rounded-2xl p-4">
            <p className="text-xs text-text-secondary">
              After creating the article, you&apos;ll be redirected to the full
              editor where you can add images, citations, manage workflow status,
              and run quality checks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminArticleCreator;
