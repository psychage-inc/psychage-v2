import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, X, Ban, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import { providerService } from '@/services/providerService';
import { Provider } from '@/types/models';
import { useToast } from '@/context/ToastContext';
import { api } from '@/lib/api';
import AdminLayout from './components/AdminLayout';
import AdminFilterBar from './components/AdminFilterBar';
import AdminDataTable from './components/AdminDataTable';
import AdminEmptyState from './components/AdminEmptyState';
import AdminErrorBanner from './components/AdminErrorBanner';
import StatusBadge from './components/StatusBadge';
import AdminConfirmModal from './components/AdminConfirmModal';
import { useAdminSearch } from '@/hooks/useAdminSearch';
import { type ColumnDef } from '@tanstack/react-table';

type ProviderStatus = 'pending' | 'active' | 'suspended' | 'rejected';

const statusFilters = [
    { key: 'pending', label: 'Pending' },
    { key: 'active', label: 'Active' },
    { key: 'suspended', label: 'Suspended' },
    { key: 'rejected', label: 'Rejected' },
];

const ProviderManagement: React.FC = () => {
    const [searchParams] = useSearchParams();
    const initialStatus = (searchParams.get('status') as ProviderStatus) || 'pending';
    const toast = useToast();

    const [providers, setProviders] = useState<Provider[]>([]);
    const [filter, setFilter] = useState<ProviderStatus>(initialStatus);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { searchTerm, debouncedSearchTerm, setSearchTerm } = useAdminSearch();

    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        providerId: string | number;
        providerName: string;
        action: 'active' | 'rejected' | 'suspended';
    }>({ isOpen: false, providerId: '', providerName: '', action: 'active' });
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchProviders = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await providerService.getAdminProviders(filter);
            setProviders(data);
        } catch (err) {
            console.error("Failed to fetch providers", err);
            setError('Failed to load providers. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchProviders();
    }, [fetchProviders]);

    const openConfirmModal = (id: string | number, name: string, action: 'active' | 'rejected' | 'suspended') => {
        setModalState({ isOpen: true, providerId: id, providerName: name, action });
    };

    const handleStatusUpdate = async (reason?: string) => {
        setIsUpdating(true);
        try {
            await api.admin.updateProviderStatusWithReason(modalState.providerId, modalState.action, reason);
            setModalState(s => ({ ...s, isOpen: false }));
            toast.success(`Provider ${modalState.action === 'active' ? 'approved' : modalState.action} successfully.`);
            fetchProviders();
        } catch (err) {
            console.error("Failed to update status", err);
            toast.error('Failed to update provider status. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    const filteredProviders = useMemo(() => {
        if (!debouncedSearchTerm) return providers;
        const term = debouncedSearchTerm.toLowerCase();
        return providers.filter(
            p => p.name.toLowerCase().includes(term) || (p.email || '').toLowerCase().includes(term)
        );
    }, [providers, debouncedSearchTerm]);

    const columns: ColumnDef<Provider, unknown>[] = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => {
                const p = row.original;
                return (
                    <Link to={`/admin/providers/${p.id}`} className="flex items-center gap-3 group">
                        {p.image && <img src={p.image} alt={p.name} className="w-8 h-8 rounded-full object-cover" />}
                        <div>
                            <div className="font-bold text-text-primary group-hover:text-primary transition-colors">{p.name}</div>
                            <div className="text-xs text-text-secondary font-normal">{p.email}</div>
                        </div>
                    </Link>
                );
            },
        },
        {
            accessorKey: 'role',
            header: 'Type',
            cell: ({ getValue }) => (
                <span className="text-text-secondary">{(getValue() as string) || 'Provider'}</span>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => <StatusBadge status={row.original.status || filter} />,
        },
        {
            id: 'actions',
            header: () => <span className="sr-only">Actions</span>,
            enableSorting: false,
            cell: ({ row }) => {
                const p = row.original;
                const status = p.status || filter;
                return (
                    <div className="flex justify-end gap-2">
                        {status === 'pending' && (
                            <>
                                <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => openConfirmModal(p.id, p.name, 'active')} title="Approve">
                                    <Check size={18} />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => openConfirmModal(p.id, p.name, 'rejected')} title="Reject">
                                    <X size={18} />
                                </Button>
                            </>
                        )}
                        {status === 'active' && (
                            <Button size="sm" variant="ghost" className="text-amber-600 hover:bg-amber-50 hover:text-amber-700" onClick={() => openConfirmModal(p.id, p.name, 'suspended')} title="Suspend">
                                <Ban size={18} />
                            </Button>
                        )}
                        {(status === 'suspended' || status === 'rejected') && (
                            <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => openConfirmModal(p.id, p.name, 'active')} title="Re-activate">
                                <Check size={18} />
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ], [filter]);

    const getModalConfig = () => {
        switch (modalState.action) {
            case 'active':
                return { title: 'Approve Provider', description: `Are you sure you want to approve ${modalState.providerName}?`, confirmText: 'Approve', confirmColor: 'green' as const, reasonRequired: false };
            case 'rejected':
                return { title: 'Reject Provider', description: `Are you sure you want to reject ${modalState.providerName}? Please provide a reason.`, confirmText: 'Reject', confirmColor: 'red' as const, reasonRequired: true };
            case 'suspended':
                return { title: 'Suspend Provider', description: `Are you sure you want to suspend ${modalState.providerName}? Please provide a reason.`, confirmText: 'Suspend', confirmColor: 'amber' as const, reasonRequired: true };
        }
    };

    const modalConfig = getModalConfig();

    return (
        <AdminLayout title="Provider Management">
            {error && <AdminErrorBanner message={error} onRetry={fetchProviders} />}

            <AdminFilterBar
                searchValue={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Search by name or email..."
                filters={statusFilters}
                activeFilter={filter}
                onFilterChange={(key) => setFilter(key as ProviderStatus)}
            />

            <AdminDataTable
                columns={columns}
                data={filteredProviders}
                isLoading={isLoading}
                loadingRows={3}
                pageSize={20}
                emptyState={
                    <AdminEmptyState
                        icon={Search}
                        title={`No ${filter} providers found`}
                        description={debouncedSearchTerm ? 'Try adjusting your search terms.' : undefined}
                    />
                }
            />

            <AdminConfirmModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState(s => ({ ...s, isOpen: false }))}
                onConfirm={handleStatusUpdate}
                title={modalConfig.title}
                description={modalConfig.description}
                confirmText={modalConfig.confirmText}
                confirmColor={modalConfig.confirmColor}
                isLoading={isUpdating}
                showReasonField={modalState.action !== 'active'}
                reasonRequired={modalConfig.reasonRequired}
                reasonPlaceholder={`Reason for ${modalState.action === 'rejected' ? 'rejection' : 'suspension'}...`}
            />
        </AdminLayout>
    );
};

export default ProviderManagement;
