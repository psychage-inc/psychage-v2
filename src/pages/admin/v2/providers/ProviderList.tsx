import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Plus, Shield, UserX, Wifi, WifiOff } from 'lucide-react';
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
  display_name: string;
  credentials_suffix: string;
  verification_tier: string;
  telehealth_available: boolean;
  is_suspended: boolean;
  verified_at: string | null;
  // Joined from provider_locations
  primary_city: string | null;
  primary_state: string | null;
  // Joined from provider_specialties → specialties
  specialty_labels: string[];
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
      // Fetch providers with primary location
      const { data: providerData, error } = await supabase
        .from('providers')
        .select(`
          id,
          display_name,
          credentials_suffix,
          verification_tier,
          telehealth_available,
          is_suspended,
          verified_at,
          provider_locations!inner (city, state_province, is_primary)
        `)
        .order('display_name');

      if (error) {
        // Fallback: query without join if provider_locations join fails
        const { data: fallbackData, error: fbErr } = await supabase
          .from('providers')
          .select('id, display_name, credentials_suffix, verification_tier, telehealth_available, is_suspended, verified_at')
          .order('display_name')
          .limit(200);
        if (fbErr) throw fbErr;
        return (fallbackData || []).map((p: Record<string, unknown>) => ({
          id: p.id as string,
          display_name: (p.display_name as string) || '',
          credentials_suffix: (p.credentials_suffix as string) || '',
          verification_tier: (p.verification_tier as string) || 'unverified',
          telehealth_available: (p.telehealth_available as boolean) ?? false,
          is_suspended: (p.is_suspended as boolean) ?? false,
          verified_at: p.verified_at as string | null,
          primary_city: null,
          primary_state: null,
          specialty_labels: [],
        })) as ProviderRow[];
      }

      return (providerData || []).map((p: Record<string, unknown>) => {
        const locs = (p.provider_locations as Record<string, unknown>[]) || [];
        const primary = locs.find((l) => l.is_primary) || locs[0] || {};
        return {
          id: p.id as string,
          display_name: (p.display_name as string) || '',
          credentials_suffix: (p.credentials_suffix as string) || '',
          verification_tier: (p.verification_tier as string) || 'unverified',
          telehealth_available: (p.telehealth_available as boolean) ?? false,
          is_suspended: (p.is_suspended as boolean) ?? false,
          verified_at: p.verified_at as string | null,
          primary_city: (primary.city as string) || null,
          primary_state: (primary.state_province as string) || null,
          specialty_labels: [],
        };
      }) as ProviderRow[];
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
      accessorKey: 'display_name',
      header: 'Name',
      cell: ({ row }) => (
        <Link to={adminPath(`/providers/${row.original.id}/edit`)} className="font-medium text-text-primary hover:text-primary">
          {row.original.display_name}
        </Link>
      ),
    },
    {
      accessorKey: 'credentials_suffix',
      header: 'Credentials',
      cell: ({ row }) => (
        <span className="text-sm text-text-secondary">{row.original.credentials_suffix || '\u2014'}</span>
      ),
    },
    {
      accessorKey: 'verification_tier',
      header: 'Verification',
      cell: ({ row }) => <AdminStatusBadge status={row.original.verification_tier || 'unverified'} />,
    },
    {
      id: 'location',
      header: 'Location',
      cell: ({ row }) => (
        <span className="text-sm text-text-secondary">
          {[row.original.primary_city, row.original.primary_state].filter(Boolean).join(', ') || '\u2014'}
        </span>
      ),
    },
    {
      accessorKey: 'telehealth_available',
      header: 'Telehealth',
      cell: ({ row }) => row.original.telehealth_available ? (
        <Wifi size={16} className="text-emerald-500" />
      ) : (
        <WifiOff size={16} className="text-gray-300 dark:text-neutral-600" />
      ),
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <button onClick={() => navigate(adminPath(`/providers/${row.original.id}/edit`))} className="p-1.5 text-text-tertiary hover:text-primary" title="Edit">
            <Pencil size={15} />
          </button>
          <button onClick={() => setSuspendTarget(row.original)} className="p-1.5 text-text-tertiary hover:text-orange-500" title={row.original.is_suspended ? 'Unsuspend' : 'Suspend'}>
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(adminPath('/providers/import'))}
              className="flex items-center gap-2 px-3 py-2 border border-border-hover text-text-secondary text-sm font-medium rounded-lg hover:bg-surface-hover transition-colors"
            >
              <Shield size={16} />
              Bulk Import
            </button>
            <button
              onClick={() => navigate(adminPath('/providers/new'))}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Plus size={16} />
              Add Provider
            </button>
          </div>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-border">
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
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-secondary'
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
        description={`${suspendTarget?.is_suspended ? 'Unsuspend' : 'Suspend'} ${suspendTarget?.display_name}? ${suspendTarget?.is_suspended ? 'They will be visible in the directory again.' : 'They will be hidden from the provider directory.'}`}
        confirmLabel={suspendTarget?.is_suspended ? 'Unsuspend' : 'Suspend'}
        destructive={!suspendTarget?.is_suspended}
        onConfirm={() => suspendTarget && toggleSuspend.mutate(suspendTarget)}
      />
    </div>
  );
};

export default AdminProviderList;
