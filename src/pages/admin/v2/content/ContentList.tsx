import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus, Eye, Pencil, Trash2, Globe } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import type { ContentDocument } from '@/lib/admin/types';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { adminPath } from '@/hooks/useAdminNavigate';

const AdminContentList: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<ContentDocument | null>(null);

  const { data: content, isLoading } = useQuery({
    queryKey: ['admin', 'content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_documents')
        .select('*')
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return (data || []) as ContentDocument[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('content_documents').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'content'] });
      logAdminAction({ action: 'delete', resourceType: 'content', resourceId: id });
      setDeleteTarget(null);
    },
  });

  const togglePublish = useMutation({
    mutationFn: async ({ id, isPublished }: { id: string; isPublished: boolean }) => {
      const newStatus = isPublished ? 'draft' : 'published';
      const { error } = await supabase
        .from('content_documents')
        .update({ is_published: !isPublished, status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'content'] });
    },
  });

  const columns: ColumnDef<ContentDocument, unknown>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <Link
          to={adminPath(`/content/${row.original.id}/edit`)}
          className="font-medium text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400"
        >
          {row.original.title}
        </Link>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => <AdminStatusBadge status={row.original.type} />,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <AdminStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'language',
      header: 'Lang',
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-1 text-xs text-gray-500 uppercase">
          <Globe size={12} /> {row.original.language}
        </span>
      ),
    },
    {
      accessorKey: 'author',
      header: 'Author',
    },
    {
      accessorKey: 'updated_at',
      header: 'Updated',
      cell: ({ row }) => (
        <span className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(row.original.updated_at), { addSuffix: true })}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      cell: ({ row }) => {
        const doc = row.original;
        return (
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate(adminPath(`/content/${doc.id}/edit`))}
              className="p-1.5 text-gray-400 hover:text-teal-600 transition-colors"
              title="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => togglePublish.mutate({ id: doc.id, isPublished: doc.is_published })}
              className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
              title={doc.is_published ? 'Unpublish' : 'Publish'}
            >
              <Eye size={15} />
            </button>
            <button
              onClick={() => setDeleteTarget(doc)}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 size={15} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader
        title="Content"
        description="Manage articles, guides, and educational content"
        actions={
          <button
            onClick={() => navigate(adminPath('/content/new'))}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus size={16} />
            New Content
          </button>
        }
      />

      <DataTable
        columns={columns}
        data={content || []}
        isLoading={isLoading}
        emptyMessage="No content yet. Click 'New Content' to create your first article."
        searchPlaceholder="Search content..."
        totalCount={content?.length}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Content"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        destructive
        confirmText={deleteTarget?.title}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
      />
    </div>
  );
};

export default AdminContentList;
