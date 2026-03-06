import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { api, type AdminAuditLog } from '@/lib/api';
import { format } from 'date-fns';
import { FileText, User, ChevronDown, ChevronUp } from 'lucide-react';
import AdminLayout from './components/AdminLayout';
import AdminFilterBar from './components/AdminFilterBar';
import AdminDataTable from './components/AdminDataTable';
import AdminEmptyState from './components/AdminEmptyState';
import AdminErrorBanner from './components/AdminErrorBanner';
import StatusBadge from './components/StatusBadge';
import { getActionBadgeStatus, humanizeAction } from './components/adminUtils';
import { useAdminSearch } from '@/hooks/useAdminSearch';
import { type ColumnDef } from '@tanstack/react-table';

const actionFilters = [
    { key: 'all', label: 'All' },
    { key: 'provider', label: 'Provider' },
    { key: 'user', label: 'User' },
    { key: 'report', label: 'Report' },
    { key: 'system', label: 'System' },
];

function formatDetails(details: string | Record<string, unknown>): React.ReactNode {
    if (typeof details === 'string') return details;
    if (!details || typeof details !== 'object') return '—';

    const entries = Object.entries(details).filter(([, v]) => v !== null && v !== undefined && v !== '');
    if (entries.length === 0) return '—';

    return (
        <div className="space-y-1">
            {entries.map(([key, value]) => (
                <div key={key} className="flex gap-2 text-sm">
                    <span className="text-text-tertiary font-mono text-xs">{key}:</span>
                    <span className="text-text-secondary">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
                </div>
            ))}
        </div>
    );
}

const AuditLogPage: React.FC = () => {
    const [logs, setLogs] = useState<AdminAuditLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionFilter, setActionFilter] = useState('all');
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
    const { searchTerm, debouncedSearchTerm, setSearchTerm } = useAdminSearch();

    const fetchLogs = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.admin.getAuditLogs();
            if (response.success && response.data) {
                setLogs(response.data);
            }
        } catch (err) {
            console.error("Failed to fetch audit logs", err);
            setError('Failed to load audit logs. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const toggleRow = (id: string) => {
        setExpandedRows(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const filteredLogs = useMemo(() => {
        let result = logs;

        if (actionFilter !== 'all') {
            result = result.filter(log =>
                (log.action || '').toLowerCase().includes(actionFilter.toLowerCase())
            );
        }

        if (debouncedSearchTerm) {
            const term = debouncedSearchTerm.toLowerCase();
            result = result.filter(log =>
                (log.action || '').toLowerCase().includes(term) ||
                (typeof log.details === 'string' && log.details.toLowerCase().includes(term)) ||
                (log.user_id || '').toLowerCase().includes(term)
            );
        }

        return result;
    }, [logs, actionFilter, debouncedSearchTerm]);

    const columns: ColumnDef<AdminAuditLog, unknown>[] = useMemo(() => [
        {
            accessorKey: 'created_at',
            header: 'Timestamp',
            cell: ({ getValue }) => (
                <span className="text-sm text-text-secondary font-mono">
                    {format(new Date(getValue() as string), 'MMM d, yyyy HH:mm:ss')}
                </span>
            ),
        },
        {
            accessorKey: 'user_id',
            header: 'User',
            cell: ({ getValue }) => {
                const userId = getValue() as string | undefined;
                return userId ? (
                    <span className="flex items-center gap-2 text-sm text-text-primary font-medium">
                        <User size={14} className="text-primary" />
                        {userId.substring(0, 8)}...
                    </span>
                ) : (
                    <span className="text-sm text-text-tertiary">System</span>
                );
            },
        },
        {
            accessorKey: 'action',
            header: 'Action',
            cell: ({ getValue }) => {
                const raw = (getValue() as string) || 'unknown';
                return <StatusBadge status={getActionBadgeStatus(raw)} className="normal-case">{humanizeAction(raw)}</StatusBadge>;
            },
        },
        {
            id: 'details',
            header: 'Details',
            enableSorting: false,
            cell: ({ row }) => {
                const log = row.original;
                const isExpanded = expandedRows.has(log.id);
                const hasComplexDetails = typeof log.details === 'object' && log.details !== null;

                if (!hasComplexDetails) {
                    return <span className="text-sm text-text-secondary">{typeof log.details === 'string' ? log.details : '—'}</span>;
                }

                return (
                    <div>
                        <button
                            onClick={() => toggleRow(log.id)}
                            className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover transition-colors"
                        >
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            {isExpanded ? 'Hide' : 'View'} details
                        </button>
                        {isExpanded && (
                            <div className="mt-2 p-3 bg-surface-hover rounded-lg">
                                {formatDetails(log.details)}
                            </div>
                        )}
                    </div>
                );
            },
        },
    ], [expandedRows]);

    return (
        <AdminLayout title="System Audit Logs" seoTitle="System Logs | Admin">
            {error && <AdminErrorBanner message={error} onRetry={fetchLogs} />}

            <AdminFilterBar
                searchValue={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Search logs..."
                filters={actionFilters}
                activeFilter={actionFilter}
                onFilterChange={setActionFilter}
            />

            <AdminDataTable
                columns={columns}
                data={filteredLogs}
                isLoading={isLoading}
                loadingRows={5}
                pageSize={25}
                emptyState={
                    <AdminEmptyState
                        icon={FileText}
                        title="No audit logs found"
                        description={debouncedSearchTerm || actionFilter !== 'all' ? 'Try adjusting your filters.' : undefined}
                    />
                }
            />
        </AdminLayout>
    );
};

export default AuditLogPage;
