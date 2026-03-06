import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api, type AdminReport } from '@/lib/api';
import { format, formatDistanceToNow } from 'date-fns';
import { AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminLayout from './components/AdminLayout';
import AdminFilterBar from './components/AdminFilterBar';
import AdminDataTable from './components/AdminDataTable';
import AdminEmptyState from './components/AdminEmptyState';
import AdminErrorBanner from './components/AdminErrorBanner';
import StatusBadge from './components/StatusBadge';
import { useAdminSearch } from '@/hooks/useAdminSearch';
import { type ColumnDef } from '@tanstack/react-table';

const typeFilters = [
    { key: 'all', label: 'All Types' },
    { key: 'content', label: 'Content' },
    { key: 'user', label: 'User' },
    { key: 'system', label: 'System' },
];

const statusFilters = [
    { key: 'all', label: 'All Status' },
    { key: 'pending', label: 'Pending' },
    { key: 'investigating', label: 'Investigating' },
    { key: 'resolved', label: 'Resolved' },
];

const ReportsPage: React.FC = () => {
    const [reports, setReports] = useState<AdminReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const { searchTerm, debouncedSearchTerm, setSearchTerm } = useAdminSearch();

    const fetchReports = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.admin.getReports(typeFilter);
            if (response.success && response.data) {
                setReports(response.data);
            }
        } catch (err) {
            console.error("Failed to fetch reports", err);
            setError('Failed to load reports. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [typeFilter]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    const filteredReports = useMemo(() => {
        let result = reports;

        if (statusFilter !== 'all') {
            result = result.filter(r => r.status === statusFilter);
        }

        if (debouncedSearchTerm) {
            const term = debouncedSearchTerm.toLowerCase();
            result = result.filter(r =>
                (r.subject || '').toLowerCase().includes(term)
            );
        }

        return result;
    }, [reports, statusFilter, debouncedSearchTerm]);

    const columns: ColumnDef<AdminReport, unknown>[] = useMemo(() => [
        {
            accessorKey: 'created_at',
            header: 'Date',
            cell: ({ getValue }) => (
                <span className="text-sm text-text-secondary">
                    {format(new Date(getValue() as string), 'MMM d, yyyy')}
                </span>
            ),
        },
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ getValue }) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-hover text-text-primary capitalize">
                    {getValue() as string}
                </span>
            ),
        },
        {
            accessorKey: 'subject',
            header: 'Subject',
            cell: ({ row }) => (
                <Link
                    to={`/admin/reports/${row.original.id}`}
                    className="text-sm font-medium text-text-primary hover:text-primary transition-colors"
                >
                    {row.original.subject || 'No subject'}
                </Link>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
        },
        {
            id: 'age',
            header: 'Age',
            cell: ({ row }) => (
                <span className="text-sm text-text-tertiary">
                    {formatDistanceToNow(new Date(row.original.created_at), { addSuffix: true })}
                </span>
            ),
        },
        {
            accessorKey: 'reporter_id',
            header: 'Reporter',
            cell: ({ getValue }) => {
                const reporterId = getValue() as string | undefined;
                return (
                    <span className="text-sm text-text-secondary">
                        {reporterId ? `${reporterId.substring(0, 8)}...` : 'Anonymous'}
                    </span>
                );
            },
        },
    ], []);

    return (
        <AdminLayout title="User Reports" seoTitle="User Reports | Admin">
            {error && <AdminErrorBanner message={error} onRetry={fetchReports} />}

            <AdminFilterBar
                searchValue={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Search by subject..."
                filters={typeFilters}
                activeFilter={typeFilter}
                onFilterChange={setTypeFilter}
            />

            {/* Status filter row */}
            <div className="flex gap-2 -mt-4">
                {statusFilters.map(sf => (
                    <Button
                        key={sf.key}
                        variant={statusFilter === sf.key ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setStatusFilter(sf.key)}
                    >
                        {sf.label}
                    </Button>
                ))}
            </div>

            <AdminDataTable
                columns={columns}
                data={filteredReports}
                isLoading={isLoading}
                loadingRows={3}
                pageSize={20}
                emptyState={
                    <AdminEmptyState
                        icon={AlertTriangle}
                        title="No reports found"
                        description="Adjust your filters or check back later."
                    />
                }
            />
        </AdminLayout>
    );
};

export default ReportsPage;
