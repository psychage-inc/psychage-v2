import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Check, X, MessageSquare, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import type { ProviderApplication } from '@/lib/admin/types';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

const AdminApplicationReview: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedApp, setSelectedApp] = useState<ProviderApplication | null>(null);
  const [rejectDialog, setRejectDialog] = useState<ProviderApplication | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const { data: applications, isLoading } = useQuery({
    queryKey: ['admin', 'provider-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_applications')
        .select('*')
        .order('submitted_at', { ascending: false });
      if (error) throw error;
      return (data || []) as ProviderApplication[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status, reason }: { id: string; status: string; reason?: string }) => {
      const { error } = await supabase
        .from('provider_applications')
        .update({
          status,
          reviewed_at: new Date().toISOString(),
          rejection_reason: reason || null,
        })
        .eq('id', id);
      if (error) throw error;
      await logAdminAction({
        action: status === 'approved' ? 'approve' : 'reject',
        resourceType: 'provider_application',
        resourceId: id,
        newValue: { status, reason },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'provider-applications'] });
      setSelectedApp(null);
      setRejectDialog(null);
    },
  });

  const columns: ColumnDef<ProviderApplication, unknown>[] = [
    {
      accessorKey: 'provider_name',
      header: 'Name',
      cell: ({ row }) => (
        <button
          onClick={() => setSelectedApp(row.original)}
          className="font-medium text-gray-900 dark:text-white hover:text-teal-600 text-left"
        >
          {row.original.provider_name}
        </button>
      ),
    },
    { accessorKey: 'credentials', header: 'Credentials' },
    { accessorKey: 'contact_email', header: 'Email' },
    {
      accessorKey: 'npi_number',
      header: 'NPI',
      cell: ({ row }) => row.original.npi_number || '\u2014',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <AdminStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'submitted_at',
      header: 'Submitted',
      cell: ({ row }) => (
        <span className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(row.original.submitted_at), { addSuffix: true })}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      cell: ({ row }) => {
        const app = row.original;
        if (app.status !== 'pending') return null;
        return (
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateStatus.mutate({ id: app.id, status: 'approved' })}
              className="p-1.5 text-gray-400 hover:text-emerald-600 transition-colors"
              title="Approve"
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => setRejectDialog(app)}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              title="Reject"
            >
              <X size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader title="Provider Applications" description="Review pending provider applications" />

      <DataTable
        columns={columns}
        data={applications || []}
        isLoading={isLoading}
        emptyMessage="No applications to review."
        searchPlaceholder="Search applications..."
        totalCount={applications?.length}
      />

      {/* Application detail panel */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedApp(null)} />
          <div className="relative ml-auto w-full max-w-lg bg-white dark:bg-slate-900 h-full overflow-y-auto shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedApp.provider_name}</h2>
              <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Credentials</label>
                <p className="text-sm text-gray-900 dark:text-white">{selectedApp.credentials}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Email</label>
                <p className="text-sm text-gray-900 dark:text-white">{selectedApp.contact_email}</p>
              </div>
              {selectedApp.npi_number && (
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">NPI Number</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedApp.npi_number}</p>
                </div>
              )}
              {selectedApp.practice_name && (
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Practice</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedApp.practice_name}</p>
                </div>
              )}
              {selectedApp.specialties?.length > 0 && (
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Specialties</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedApp.specialties.map((s) => (
                      <span key={s} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-slate-800 rounded">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {selectedApp.bio && (
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Bio</label>
                  <p className="text-sm text-gray-700 dark:text-slate-300 mt-1">{selectedApp.bio}</p>
                </div>
              )}
              <AdminStatusBadge status={selectedApp.status} />

              {selectedApp.status === 'pending' && (
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={() => updateStatus.mutate({ id: selectedApp.id, status: 'approved' })}
                    disabled={updateStatus.isPending}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => { setRejectDialog(selectedApp); setSelectedApp(null); }}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject dialog */}
      <ConfirmDialog
        open={!!rejectDialog}
        onOpenChange={(open) => { if (!open) { setRejectDialog(null); setRejectionReason(''); } }}
        title="Reject Application"
        description={`Reject the application from ${rejectDialog?.provider_name}?`}
        confirmLabel="Reject"
        destructive
        onConfirm={() => rejectDialog && updateStatus.mutate({ id: rejectDialog.id, status: 'rejected', reason: rejectionReason })}
      />
    </div>
  );
};

export default AdminApplicationReview;
