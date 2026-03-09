import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Download } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { supabase } from '@/lib/supabaseClient';
import type { AuditLogEntry } from '@/lib/admin/types';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import AdminStatusBadge from '@/components/admin/StatusBadge';

const AdminAuditLogV2: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const { data: logs, isLoading } = useQuery({
    queryKey: ['admin', 'audit-log'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data || []) as AuditLogEntry[];
    },
  });

  const exportCSV = () => {
    if (!logs || logs.length === 0) return;
    const headers = ['Timestamp', 'Action', 'Resource Type', 'Resource ID', 'Admin User'];
    const rows = logs.map((log) => [
      format(new Date(log.created_at), 'yyyy-MM-dd HH:mm:ss'),
      log.action,
      log.resource_type,
      log.resource_id || '',
      log.admin_user_id,
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
        <span className="text-sm text-gray-500 cursor-help" title={format(new Date(row.original.created_at), 'PPpp')}>
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
        <span className="text-sm text-gray-600 dark:text-slate-400">
          {row.original.resource_type.replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      accessorKey: 'resource_id',
      header: 'Resource',
      cell: ({ row }) => row.original.resource_id ? (
        <code className="text-xs font-mono text-gray-500">{row.original.resource_id.slice(0, 12)}</code>
      ) : (
        <span className="text-gray-300">\u2014</span>
      ),
    },
    {
      accessorKey: 'admin_user_id',
      header: 'Admin',
      cell: ({ row }) => (
        <code className="text-xs font-mono text-gray-500">{row.original.admin_user_id?.slice(0, 8)}...</code>
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
            className="text-xs text-teal-600 hover:text-teal-700"
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
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <Download size={16} /> Export CSV
          </button>
        }
      />

      <DataTable
        columns={columns}
        data={logs || []}
        isLoading={isLoading}
        emptyMessage="No audit log entries."
        searchPlaceholder="Search audit log..."
        totalCount={logs?.length}
      />

      {/* Expanded detail view */}
      {expandedRow && logs && (() => {
        const entry = logs.find((l) => l.id === expandedRow);
        if (!entry) return null;
        return (
          <div className="mt-2 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              {entry.previous_value && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Previous Value</p>
                  <pre className="text-xs font-mono text-gray-600 bg-white dark:bg-slate-900 p-2 rounded overflow-auto max-h-40">
                    {JSON.stringify(entry.previous_value, null, 2)}
                  </pre>
                </div>
              )}
              {entry.new_value && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">New Value</p>
                  <pre className="text-xs font-mono text-gray-600 bg-white dark:bg-slate-900 p-2 rounded overflow-auto max-h-40">
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
