import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2, Shield, UserX, Wifi, WifiOff } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { cn } from '@/lib/utils';
import { adminPath } from '@/hooks/useAdminNavigate';

interface ProviderRow {
  id: string;
  name: string;
  credentials: string;
  verification_tier: string;
  specialties: string[];
  city: string;
  state: string;
  telehealth: boolean;
  is_suspended: boolean;
  verified_at: string | null;
}

type TabKey = 'all' | 'pending' | 'suspended';

const AdminProviderList: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<TabKey>('all');
  const [suspendTarget, setSuspendTarget] = useState<ProviderRow | null>(null);

  const { data: providers, isLoading } = useQuery({
    queryKey: ['admin', 'providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('providers')
        .select('id, name, credentials, verification_tier, specialties, city, state, telehealth, is_suspended, verified_at')
        .order('name');
      if (error) throw error;
      return (data || []) as ProviderRow[];
    },
  });

  const { data: pendingApps } = useQuery({
    queryKey: ['admin', 'provider-applications', 'pending-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('provider_applications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      if (error) return 0;
      return count || 0;
    },
  });

  const toggleSuspend = useMutation({
    mutationFn: async (provider: ProviderRow) => {
      const { error } = await supabase
        .from('providers')
        .update({ is_suspended: !provider.is_suspended })
        .eq('id', provider.id);
      if (error) throw error;
      await logAdminAction({
        action: provider.is_suspended ? 'unsuspend' : 'suspend',
        resourceType: 'provider',
        resourceId: provider.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'providers'] });
      setSuspendTarget(null);
    },
  });

  const filteredProviders = (providers || []).filter((p) => {
    if (tab === 'suspended') return p.is_suspended;
    return !p.is_suspended;
  });

  const columns: ColumnDef<ProviderRow, unknown>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <Link to={adminPath(`/providers/${row.original.id}/edit`)} className="font-medium text-gray-900 dark:text-white hover:text-teal-600">
          {row.original.name}
        </Link>
      ),
    },
    { accessorKey: 'credentials', header: 'Credentials' },
    {
      accessorKey: 'verification_tier',
      header: 'Verification',
      cell: ({ row }) => <AdminStatusBadge status={row.original.verification_tier || 'unverified'} />,
    },
    {
      accessorKey: 'specialties',
      header: 'Specialties',
      cell: ({ row }) => {
        const specs = row.original.specialties || [];
        return (
          <span className="text-sm text-gray-500 truncate block max-w-[200px]">
            {specs.length > 0 ? specs.slice(0, 3).join(', ') : '\u2014'}
            {specs.length > 3 && ` +${specs.length - 3}`}
          </span>
        );
      },
    },
    {
      id: 'location',
      header: 'Location',
      cell: ({ row }) => (
        <span className="text-sm text-gray-500">
          {[row.original.city, row.original.state].filter(Boolean).join(', ') || '\u2014'}
        </span>
      ),
    },
    {
      accessorKey: 'telehealth',
      header: 'Telehealth',
      cell: ({ row }) => row.original.telehealth ? (
        <Wifi size={16} className="text-emerald-500" />
      ) : (
        <WifiOff size={16} className="text-gray-300" />
      ),
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <button onClick={() => navigate(adminPath(`/providers/${row.original.id}/edit`))} className="p-1.5 text-gray-400 hover:text-teal-600" title="Edit">
            <Pencil size={15} />
          </button>
          <button onClick={() => setSuspendTarget(row.original)} className="p-1.5 text-gray-400 hover:text-orange-500" title={row.original.is_suspended ? 'Unsuspend' : 'Suspend'}>
            <UserX size={15} />
          </button>
        </div>
      ),
    },
  ];

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    { key: 'all', label: 'All Providers' },
    { key: 'pending', label: 'Pending Applications', count: pendingApps || 0 },
    { key: 'suspended', label: 'Suspended' },
  ];

  return (
    <div>
      <PageHeader
        title="Providers"
        description="Manage provider directory and applications"
        actions={
          <button
            onClick={() => navigate(adminPath('/providers/import'))}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Shield size={16} />
            Bulk Import
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-gray-200 dark:border-slate-700">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              if (t.key === 'pending') {
                navigate(adminPath('/providers/applications'));
              } else {
                setTab(t.key);
              }
            }}
            className={cn(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px',
              tab === t.key
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            {t.label}
            {t.count !== undefined && t.count > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">{t.count}</span>
            )}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filteredProviders}
        isLoading={isLoading}
        emptyMessage="No providers found."
        searchPlaceholder="Search providers..."
        totalCount={filteredProviders.length}
      />

      <ConfirmDialog
        open={!!suspendTarget}
        onOpenChange={(open) => !open && setSuspendTarget(null)}
        title={suspendTarget?.is_suspended ? 'Unsuspend Provider' : 'Suspend Provider'}
        description={`${suspendTarget?.is_suspended ? 'Unsuspend' : 'Suspend'} ${suspendTarget?.name}? ${suspendTarget?.is_suspended ? 'They will be visible in the directory again.' : 'They will be hidden from the provider directory.'}`}
        confirmLabel={suspendTarget?.is_suspended ? 'Unsuspend' : 'Suspend'}
        destructive={!suspendTarget?.is_suspended}
        onConfirm={() => suspendTarget && toggleSuspend.mutate(suspendTarget)}
      />
    </div>
  );
};

export default AdminProviderList;
