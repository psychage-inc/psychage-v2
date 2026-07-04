import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Check, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
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

  // FP-04: approving an application must actually create/activate a provider —
  // previously it only flipped the application's status, so an approved
  // applicant never appeared in the directory. Standard admin convention:
  // approve == admit to the directory. (DECISION_MADE_UNVERIFIED: approve
  // creates an ACTIVE, psychage_verified provider linked via application_id.)
  const createProviderFromApplication = async (app: ProviderApplication): Promise<void> => {
    // Idempotent: if a provider already links to this application, do nothing.
    const { data: existing } = await supabase
      .from('providers')
      .select('id')
      .eq('application_id', app.id)
      .maybeSingle();
    if (existing) return;

    // provider_type_id is NOT NULL. Applications carry no structured type, so
    // bucket from credentials + specialties, defaulting to therapist.
    const { data: typeRows, error: typeErr } = await supabase.from('provider_types').select('id, slug');
    if (typeErr || !typeRows?.length) throw typeErr || new Error('Could not load provider types');
    const hay = `${app.credentials} ${(app.specialties || []).join(' ')}`.toLowerCase();
    const slug =
      /psychiatr/.test(hay) ? 'psychiatrist'
      : /psycholog/.test(hay) ? 'psychologist'
      : /social work/.test(hay) ? 'social_worker'
      : /counsel/.test(hay) ? 'counselor'
      : 'therapist';
    const typeId = (typeRows.find((t) => t.slug === slug) ?? typeRows.find((t) => t.slug === 'therapist') ?? typeRows[0]).id;

    const { data: { user } } = await supabase.auth.getUser();
    const { data: inserted, error: provErr } = await supabase
      .from('providers')
      .insert({
        display_name: app.provider_name,
        credentials_suffix: app.credentials || null,
        npi_number: app.npi_number || null,
        provider_type_id: typeId,
        practice_name: app.practice_name || null,
        bio: app.bio || null,
        website_url: app.website_url || null,
        email: app.contact_email || null,
        phone: app.contact_phone || null,
        telehealth_available: !!app.telehealth_available,
        verification_tier: 'psychage_verified',
        verified_at: new Date().toISOString(),
        verified_by: user?.id ?? null,
        status: 'active',
        // providers.source CHECK allows npi_registry|samhsa|hrsa_hc|manual|claim.
        // An admin-approved application is a manual admission.
        source: 'manual',
        application_id: app.id,
      })
      .select('id')
      .single();
    if (provErr) throw provErr;

    // Primary location from practice_address JSON, if present.
    const addr = (app.practice_address ?? {}) as { city?: string; state?: string; state_province?: string };
    if (addr.city || addr.state || addr.state_province) {
      const { error: locErr } = await supabase.from('provider_locations').insert({
        provider_id: inserted.id,
        city: addr.city || null,
        state_province: addr.state_province || addr.state || null,
        is_primary: true,
      });
      if (locErr) throw locErr;
    }
  };

  const updateStatus = useMutation({
    mutationFn: async ({ app, status, reason }: { app: ProviderApplication; status: string; reason?: string }) => {
      // Create the provider BEFORE flipping status, so a failed creation leaves
      // the application pending (not falsely marked approved).
      if (status === 'approved') {
        await createProviderFromApplication(app);
      }
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase
        .from('provider_applications')
        .update({
          status,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id ?? null,
          rejection_reason: reason || null,
        })
        .eq('id', app.id);
      if (error) throw error;
      await logAdminAction({
        action: status === 'approved' ? 'approve' : 'reject',
        resourceType: 'provider_application',
        resourceId: app.id,
        newValue: { status, reason },
      });
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'provider-applications'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'providers'] });
      if (vars.status === 'approved') toast.success('Application approved — provider added to the directory');
      setSelectedApp(null);
      setRejectDialog(null);
    },
    onError: (err: Error) => toast.error(`Update failed: ${err.message}`),
  });

  const columns: ColumnDef<ProviderApplication, unknown>[] = [
    {
      accessorKey: 'provider_name',
      header: 'Name',
      cell: ({ row }) => (
        <button
          onClick={() => setSelectedApp(row.original)}
          className="font-medium text-text-primary hover:text-primary text-left"
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
        <span className="text-sm text-text-secondary">
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
              onClick={() => updateStatus.mutate({ app, status: 'approved' })}
              className="p-1.5 text-text-tertiary hover:text-emerald-600 transition-colors"
              title="Approve"
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => setRejectDialog(app)}
              className="p-1.5 text-text-tertiary hover:text-red-500 transition-colors"
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
          <div className="relative ml-auto w-full max-w-lg bg-surface h-full overflow-y-auto shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">{selectedApp.provider_name}</h2>
              <button onClick={() => setSelectedApp(null)} className="text-text-tertiary hover:text-text-secondary">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-text-secondary uppercase">Credentials</label>
                <p className="text-sm text-text-primary">{selectedApp.credentials}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary uppercase">Email</label>
                <p className="text-sm text-text-primary">{selectedApp.contact_email}</p>
              </div>
              {selectedApp.npi_number && (
                <div>
                  <label className="text-xs font-medium text-text-secondary uppercase">NPI Number</label>
                  <p className="text-sm text-text-primary">{selectedApp.npi_number}</p>
                </div>
              )}
              {selectedApp.practice_name && (
                <div>
                  <label className="text-xs font-medium text-text-secondary uppercase">Practice</label>
                  <p className="text-sm text-text-primary">{selectedApp.practice_name}</p>
                </div>
              )}
              {selectedApp.specialties?.length > 0 && (
                <div>
                  <label className="text-xs font-medium text-text-secondary uppercase">Specialties</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedApp.specialties.map((s) => (
                      <span key={s} className="px-2 py-0.5 text-xs bg-surface-hover rounded">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {selectedApp.bio && (
                <div>
                  <label className="text-xs font-medium text-text-secondary uppercase">Bio</label>
                  <p className="text-sm text-text-secondary mt-1">{selectedApp.bio}</p>
                </div>
              )}
              <AdminStatusBadge status={selectedApp.status} />

              {selectedApp.status === 'pending' && (
                <div className="flex gap-2 pt-4 border-t border-border">
                  <button
                    onClick={() => updateStatus.mutate({ app: selectedApp, status: 'approved' })}
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
        onConfirm={() => rejectDialog && updateStatus.mutate({ app: rejectDialog, status: 'rejected', reason: rejectionReason })}
      />
    </div>
  );
};

export default AdminApplicationReview;
