import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save, Send, Globe as GlobeIcon, Clock, ChevronDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import { CONTENT_TYPES, CONTENT_STATUSES, SUPPORTED_LANGUAGES } from '@/lib/admin/constants';
import type { ContentDocument, ContentVersion, ContentStatus } from '@/lib/admin/types';
import TiptapEditor from '@/components/admin/TiptapEditor';
import PageHeader from '@/components/admin/PageHeader';
import { adminPath } from '@/hooks/useAdminNavigate';

// ============================================================
// Validation
// ============================================================

const contentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  type: z.string().min(1),
  status: z.string(),
  language: z.string(),
  author: z.string().min(1),
  summary: z.string().max(500).optional(),
  content_body: z.string().optional(),
  condition_tags: z.array(z.string()).optional(),
  topic_tags: z.array(z.string()).optional(),
  sources: z.array(z.object({
    title: z.string(),
    url: z.string(),
    type: z.string(),
  })).optional(),
});

type ContentFormData = z.infer<typeof contentSchema>;

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ============================================================
// Content Editor Page
// ============================================================

const AdminContentEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNew = !id;
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Fetch existing document
  const { data: document, isLoading } = useQuery({
    queryKey: ['admin', 'content', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('content_documents')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as ContentDocument;
    },
    enabled: !!id,
  });

  // Fetch versions
  const { data: versions } = useQuery({
    queryKey: ['admin', 'content-versions', id],
    queryFn: async () => {
      if (!id) return [];
      const { data, error } = await supabase
        .from('content_versions')
        .select('*')
        .eq('document_id', id)
        .order('version_number', { ascending: false })
        .limit(10);
      if (error) throw error;
      return (data || []) as ContentVersion[];
    },
    enabled: !!id,
  });

  const { register, handleSubmit, watch, setValue, control, formState: { errors, isDirty } } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      title: '',
      slug: '',
      type: 'article',
      status: 'draft',
      language: 'en',
      author: 'Dr. Lena Dobson',
      summary: '',
      content_body: '',
      condition_tags: [],
      topic_tags: [],
      sources: [],
    },
  });

  // Populate form when document loads
  useEffect(() => {
    if (document) {
      setValue('title', document.title);
      setValue('slug', document.slug);
      setValue('type', document.type);
      setValue('status', document.status);
      setValue('language', document.language);
      setValue('author', document.author);
      setValue('summary', document.summary || '');
      setValue('content_body', document.content_body || '');
      setValue('condition_tags', document.condition_tags || []);
      setValue('topic_tags', document.topic_tags || []);
      setValue('sources', document.sources || []);
    }
  }, [document, setValue]);

  // Auto-generate slug from title
  const title = watch('title');
  useEffect(() => {
    if (title && !slugManuallyEdited && isNew) {
      setValue('slug', generateSlug(title));
    }
  }, [title, slugManuallyEdited, isNew, setValue]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (data: ContentFormData & { newStatus?: ContentStatus }) => {
      const status = data.newStatus || data.status;
      const isPublished = status === 'published';
      const payload = {
        title: data.title,
        slug: data.slug,
        type: data.type,
        status,
        language: data.language,
        author: data.author,
        summary: data.summary || '',
        content_body: data.content_body || '',
        condition_tags: data.condition_tags || [],
        topic_tags: data.topic_tags || [],
        sources: data.sources || [],
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      };

      let docId = id;

      if (isNew) {
        const { data: inserted, error } = await supabase
          .from('content_documents')
          .insert(payload)
          .select('id')
          .single();
        if (error) throw error;
        docId = inserted.id;
      } else {
        const { error } = await supabase
          .from('content_documents')
          .update(payload)
          .eq('id', id);
        if (error) throw error;
      }

      // Create version
      if (docId) {
        const nextVersion = (versions?.[0]?.version_number ?? 0) + 1;
        await supabase.from('content_versions').insert({
          document_id: docId,
          version_number: nextVersion,
          content_snapshot: payload,
          change_summary: isNew ? 'Initial creation' : `Saved as ${status}`,
        });
      }

      await logAdminAction({
        action: isNew ? 'create' : 'update',
        resourceType: 'content',
        resourceId: docId || undefined,
        newValue: { title: data.title, status },
      });

      return docId;
    },
    onSuccess: (docId) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'content'] });
      if (isNew && docId) {
        navigate(adminPath(`/content/${docId}/edit`), { replace: true });
      }
    },
  });

  const onSave = useCallback(
    (newStatus?: ContentStatus) => {
      handleSubmit((data) => {
        saveMutation.mutate({ ...data, newStatus });
      })();
    },
    [handleSubmit, saveMutation]
  );

  // Auto-save every 60 seconds when dirty
  useEffect(() => {
    if (isDirty && !isNew) {
      autoSaveTimer.current = setTimeout(() => {
        onSave();
      }, 60_000);
    }
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [isDirty, isNew, onSave]);

  if (isLoading && !isNew) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 rounded-full border-2 border-border border-t-primary animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={isNew ? 'New Content' : 'Edit Content'}
        actions={
          <button
            onClick={() => navigate(adminPath('/content'))}
            className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — Editor (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title */}
          <input
            {...register('title')}
            placeholder="Article title"
            className="w-full text-2xl font-bold border-0 border-b border-border bg-transparent text-text-primary pb-3 outline-none focus:border-primary placeholder:text-text-tertiary"
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

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

          {/* Tiptap Editor */}
          <Controller
            name="content_body"
            control={control}
            render={({ field }) => (
              <TiptapEditor
                content={field.value || ''}
                onChange={field.onChange}
              />
            )}
          />

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Summary</label>
            <textarea
              {...register('summary')}
              placeholder="2-3 sentence summary (used for SEO and AI retrieval)"
              maxLength={500}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary resize-none outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Right column — Metadata (1/3) */}
        <div className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Type</label>
            <select
              {...register('type')}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary"
            >
              {CONTENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
            <select
              {...register('status')}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary"
            >
              {CONTENT_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Language</label>
            <select
              {...register('language')}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Author</label>
            <input
              {...register('author')}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Clinical Review Checklist */}
          <div className="bg-surface-hover border border-border rounded-2xl p-4">
            <h4 className="text-sm font-semibold text-text-primary mb-3">Clinical Review Checklist</h4>
            <div className="space-y-2">
              {[
                'All claims have citations',
                'Reading level verified (8th-10th grade)',
                'No absolute language ("always", "never")',
                'Crisis disclaimer included (if applicable)',
                '"Common" used instead of "normal"',
              ].map((item) => (
                <label key={item} className="flex items-start gap-2 text-sm text-text-secondary cursor-pointer">
                  <input type="checkbox" className="mt-0.5 rounded border-border-hover text-primary focus:ring-primary" />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <button
              onClick={() => onSave()}
              disabled={saveMutation.isPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg text-text-secondary hover:bg-surface-hover transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {saveMutation.isPending ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              onClick={() => onSave('in_review')}
              disabled={saveMutation.isPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-surface-hover text-text-secondary rounded-lg hover:bg-surface-active transition-colors disabled:opacity-50"
            >
              <Send size={16} />
              Submit for Review
            </button>
            <button
              onClick={() => onSave('published')}
              disabled={saveMutation.isPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <GlobeIcon size={16} />
              Publish
            </button>
          </div>

          {/* Version History */}
          {versions && versions.length > 0 && (
            <div className="bg-surface border border-border rounded-2xl p-4">
              <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Clock size={14} />
                Version History
              </h4>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {versions.map((v) => (
                  <div key={v.id} className="text-sm text-text-secondary flex justify-between">
                    <span>v{v.version_number}</span>
                    <span>{formatDistanceToNow(new Date(v.created_at), { addSuffix: true })}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContentEditor;
