import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Download, Filter } from 'lucide-react';
import { formatDistanceToNow, format, subDays } from 'date-fns';
import { supabase } from '@/lib/supabaseClient';
import type { AuditLogEntry } from '@/lib/admin/types';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import AdminStatusBadge from '@/components/admin/StatusBadge';

const ACTION_TYPES = ['all', 'create', 'update', 'delete', 'publish', 'approve', 'reject', 'status_change', 'rating_update', 'comment', 'setting_change'];
const RESOURCE_TYPES = ['all', 'article', 'content', 'provider', 'symptom', 'condition', 'mapping', 'setting'];
const DATE_RANGES = [
  { label: 'All Time', value: 'all' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
];

const AdminAuditLogV2: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [actionFilter, setActionFilter] = useState('all');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const { data: logs, isLoading } = useQuery({
    queryKey: ['admin', 'audit-log'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);
      if (error) throw error;
      return (data || []) as AuditLogEntry[];
    },
  });

  const filteredLogs = useMemo(() => {
    if (!logs) return [];
    let result = logs;

    if (actionFilter !== 'all') {
      result = result.filter((l) => l.action === actionFilter);
    }
    if (resourceFilter !== 'all') {
      result = result.filter((l) => l.resource_type === resourceFilter);
    }
    if (dateFilter !== 'all') {
      const days = dateFilter === '7d' ? 7 : dateFilter === '30d' ? 30 : 90;
      const cutoff = subDays(new Date(), days).toISOString();
      result = result.filter((l) => l.created_at >= cutoff);
    }

    return result;
  }, [logs, actionFilter, resourceFilter, dateFilter]);

  const exportCSV = () => {
    if (!filteredLogs || filteredLogs.length === 0) return;
    const headers = ['Timestamp', 'Action', 'Resource Type', 'Resource ID', 'Admin User', 'Details'];
    const rows = filteredLogs.map((log) => [
      format(new Date(log.created_at), 'yyyy-MM-dd HH:mm:ss'),
      log.action,
      log.resource_type,
      log.resource_id || '',
      log.admin_user_id,
      log.new_value ? JSON.stringify(log.new_value) : '',
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns: ColumnDef<AuditLogEntry, unknown>[] = [
    {
      accessorKey: 'created_at',
      header: 'Timestamp',
      cell: ({ row }) => (
        <span className="text-sm text-text-secondary cursor-help" title={format(new Date(row.original.created_at), 'PPpp')}>
          {formatDistanceToNow(new Date(row.original.created_at), { addSuffix: true })}
        </span>
      ),
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => <AdminStatusBadge status={row.original.action} />,
    },
    {
      accessorKey: 'resource_type',
      header: 'Resource Type',
      cell: ({ row }) => (
        <span className="text-sm text-text-secondary">
          {row.original.resource_type.replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      accessorKey: 'resource_id',
      header: 'Resource',
      cell: ({ row }) => row.original.resource_id ? (
        <code className="text-xs font-mono text-text-secondary">{row.original.resource_id.slice(0, 12)}</code>
      ) : (
        <span className="text-gray-300 dark:text-neutral-600">{'\u2014'}</span>
      ),
    },
    {
      accessorKey: 'admin_user_id',
      header: 'Admin',
      cell: ({ row }) => (
        <code className="text-xs font-mono text-text-secondary">{row.original.admin_user_id?.slice(0, 8)}...</code>
      ),
    },
    {
      id: 'details',
      header: '',
      enableSorting: false,
      cell: ({ row }) => {
        const hasDetails = row.original.previous_value || row.original.new_value;
        if (!hasDetails) return null;
        const isExpanded = expandedRow === row.original.id;
        return (
          <button
            onClick={() => setExpandedRow(isExpanded ? null : row.original.id)}
            className="text-xs text-primary hover:text-primary-hover"
          >
            {isExpanded ? 'Hide' : 'Details'}
          </button>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader
        title="Audit Log"
        description="View all admin actions"
        actions={
          <button
            onClick={exportCSV}
            disabled={!logs || logs.length === 0}
            className="flex items-center gap-2 px-4 py-2 border border-border text-text-secondary text-sm font-medium rounded-lg hover:bg-surface-hover transition-colors disabled:opacity-50"
          >
            <Download size={16} /> Export CSV
          </button>
        }
      />

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <Filter size={14} />
          Filters:
        </div>
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="px-3 py-1.5 text-xs border border-border-hover rounded-lg bg-surface text-text-secondary"
        >
          {ACTION_TYPES.map((a) => (
            <option key={a} value={a}>{a === 'all' ? 'All Actions' : a.replace(/_/g, ' ')}</option>
          ))}
        </select>
        <select
          value={resourceFilter}
          onChange={(e) => setResourceFilter(e.target.value)}
          className="px-3 py-1.5 text-xs border border-border-hover rounded-lg bg-surface text-text-secondary"
        >
          {RESOURCE_TYPES.map((r) => (
            <option key={r} value={r}>{r === 'all' ? 'All Resources' : r}</option>
          ))}
        </select>
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-3 py-1.5 text-xs border border-border-hover rounded-lg bg-surface text-text-secondary"
        >
          {DATE_RANGES.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
        {(actionFilter !== 'all' || resourceFilter !== 'all' || dateFilter !== 'all') && (
          <button
            onClick={() => { setActionFilter('all'); setResourceFilter('all'); setDateFilter('all'); }}
            className="text-xs text-primary hover:text-primary-hover font-medium"
          >
            Clear filters
          </button>
        )}
        <span className="text-xs text-text-tertiary ml-auto">
          {filteredLogs.length} of {logs?.length || 0} entries
        </span>
      </div>

      <DataTable
        columns={columns}
        data={filteredLogs}
        isLoading={isLoading}
        emptyMessage="No audit log entries matching filters."
        searchPlaceholder="Search audit log..."
        totalCount={filteredLogs.length}
      />

      {/* Expanded detail view */}
      {expandedRow && filteredLogs && (() => {
        const entry = filteredLogs.find((l) => l.id === expandedRow);
        if (!entry) return null;
        return (
          <div className="mt-2 bg-surface-hover border border-border rounded-2xl p-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              {entry.previous_value && (
                <div>
                  <p className="text-xs font-medium text-text-secondary mb-1">Previous Value</p>
                  <pre className="text-xs font-mono text-text-secondary bg-surface p-2 rounded overflow-auto max-h-40">
                    {JSON.stringify(entry.previous_value, null, 2)}
                  </pre>
                </div>
              )}
              {entry.new_value && (
                <div>
                  <p className="text-xs font-medium text-text-secondary mb-1">New Value</p>
                  <pre className="text-xs font-mono text-text-secondary bg-surface p-2 rounded overflow-auto max-h-40">
                    {JSON.stringify(entry.new_value, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default AdminAuditLogV2;
