import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Plus, Shield, UserX, Wifi, WifiOff, Download, Search } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import { downloadCsv } from '@/lib/admin/csv';
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
  primary_city: string | null;
  primary_state: string | null;
}

type TabKey = 'all' | 'pending' | 'suspended';

// The directory holds ~420k seeded providers; an unbounded ordered join over the
// whole table times out (PostgREST 57014). Page the read server-side instead.
const PAGE_SIZE = 50;

// Strip PostgREST ilike reserved characters so search input can't break the filter.
const sanitizeTerm = (s: string) => s.replace(/[%,()*]/g, ' ').trim();

const AdminProviderList: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<TabKey>('all');
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [suspendTarget, setSuspendTarget] = useState<ProviderRow | null>(null);

  // Debounce search; reset to first page when the term changes.
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPageIndex(0);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const suspendedFilter = tab === 'suspended';

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'providers', tab, pageIndex, debouncedSearch],
    queryFn: async () => {
      const from = pageIndex * PAGE_SIZE;
      let query = supabase
        .from('providers')
        .select(
          'id, display_name, credentials_suffix, verification_tier, telehealth_available, is_suspended, verified_at',
          { count: 'exact' },
        )
        .eq('is_suspended', suspendedFilter);

      const term = sanitizeTerm(debouncedSearch);
      if (term) query = query.ilike('display_name', `%${term}%`);

      const { data: providerData, count, error } = await query
        .order('display_name')
        .range(from, from + PAGE_SIZE - 1);
      if (error) throw error;

      // Fetch primary location only for the rows on this page (cheap, by id).
      const ids = (providerData || []).map((p: { id: string }) => p.id);
      const locMap: Record<string, { city: string | null; state_province: string | null }> = {};
      if (ids.length) {
        const { data: locs } = await supabase
          .from('provider_locations')
          .select('provider_id, city, state_province, is_primary')
          .in('provider_id', ids);
        for (const l of (locs || []) as Array<Record<string, unknown>>) {
          const pid = l.provider_id as string;
          if (!locMap[pid] || l.is_primary) {
            locMap[pid] = { city: (l.city as string) || null, state_province: (l.state_province as string) || null };
          }
        }
      }

      const rows = (providerData || []).map((p: Record<string, unknown>) => ({
        id: p.id as string,
        display_name: (p.display_name as string) || '',
        credentials_suffix: (p.credentials_suffix as string) || '',
        verification_tier: (p.verification_tier as string) || 'unverified',
        telehealth_available: (p.telehealth_available as boolean) ?? false,
        is_suspended: (p.is_suspended as boolean) ?? false,
        verified_at: p.verified_at as string | null,
        primary_city: locMap[p.id as string]?.city ?? null,
        primary_state: locMap[p.id as string]?.state_province ?? null,
      })) as ProviderRow[];

      return { rows, count: count ?? 0 };
    },
  });

  const providers = data?.rows ?? [];
  const totalCount = data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

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
    onError: (err: Error) => toast.error(`Update failed: ${err.message}`),
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
        <span className="text-sm text-text-secondary">{row.original.credentials_suffix || '—'}</span>
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
          {[row.original.primary_city, row.original.primary_state].filter(Boolean).join(', ') || '—'}
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

  // CSV export of the current (visible) page. Exporting all ~420k rows client-side
  // is not feasible; the export reflects the loaded page + active filter.
  const exportCsv = () => {
    const rows = providers.map((p) => [
      p.display_name,
      p.credentials_suffix || '',
      p.verification_tier || 'unverified',
      [p.primary_city, p.primary_state].filter(Boolean).join(', '),
      p.telehealth_available ? 'yes' : 'no',
      p.is_suspended ? 'suspended' : 'active',
      p.verified_at || '',
    ]);
    downloadCsv(
      `providers-${tab}-page${pageIndex + 1}-${new Date().toISOString().slice(0, 10)}.csv`,
      ['Name', 'Credentials', 'Verification', 'Location', 'Telehealth', 'Status', 'Verified At'],
      rows,
    );
    toast.success(`Exported ${rows.length} provider(s) from this page`);
  };

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
              onClick={exportCsv}
              className="flex items-center gap-2 px-3 py-2 border border-border-hover text-text-secondary text-sm font-medium rounded-lg hover:bg-surface-hover transition-colors"
            >
              <Download size={16} />
              Export CSV
            </button>
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
                setPageIndex(0);
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

      {/* Server-side name search (the directory is too large for client-side search) */}
      <div className="relative max-w-sm mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      <DataTable
        columns={columns}
        data={providers}
        isLoading={isLoading}
        error={error}
        onRetry={() => refetch()}
        enableSearch={false}
        emptyMessage={debouncedSearch ? 'No providers match your search.' : 'No providers found.'}
        totalCount={totalCount}
        serverPagination={{
          pageIndex,
          pageSize: PAGE_SIZE,
          onPageChange: setPageIndex,
          totalPages,
        }}
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
