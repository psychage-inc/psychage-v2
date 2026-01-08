import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';
import { Check, X, Ban, MoreHorizontal } from 'lucide-react';
import { api } from '@/lib/api';
import AdminSidebar from './AdminSidebar';

const ProviderManagement: React.FC = () => {
    const [providers, setProviders] = useState<any[]>([]);
    const [filter, setFilter] = useState<'pending' | 'active' | 'suspended' | 'rejected'>('pending');
    const [isLoading, setIsLoading] = useState(true);

    const fetchProviders = async () => {
        setIsLoading(true);
        try {
            const response = await api.admin.getProviders({ status: filter });
            if (response.success && response.data) {
                setProviders(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch providers", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProviders();
    }, [filter]);

    const handleStatusUpdate = async (id: string, status: 'active' | 'suspended' | 'rejected') => {
        try {
            await api.admin.updateProviderStatus(id, status);
            // Refresh list
            fetchProviders();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const statusColors = {
        pending: 'bg-amber-100 text-amber-700',
        active: 'bg-green-100 text-green-700',
        suspended: 'bg-red-100 text-red-700',
        rejected: 'bg-gray-100 text-gray-700'
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Manage Providers | Admin" />
            <div className="container mx-auto max-w-[1400px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-3">
                        <AdminSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h1 className="text-3xl font-display font-bold text-text-primary">Provider Management</h1>

                            <div className="flex gap-2">
                                {(['pending', 'active', 'suspended', 'rejected'] as const).map(status => (
                                    <Button
                                        key={status}
                                        variant={filter === status ? 'primary' : 'outline'}
                                        size="sm"
                                        onClick={() => setFilter(status)}
                                        className="capitalize"
                                    >
                                        {status}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <Card className="p-8">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="pb-4 font-bold text-text-secondary">Name</th>
                                            <th className="pb-4 font-bold text-text-secondary">Type</th>
                                            <th className="pb-4 font-bold text-text-secondary">Status</th>
                                            <th className="pb-4 font-bold text-text-secondary text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading ? (
                                            [1, 2, 3].map(i => (
                                                <tr key={i} className="border-b border-border">
                                                    <td className="py-4"><div className="h-4 bg-surface-hover w-32 rounded animate-pulse" /></td>
                                                    <td className="py-4"><div className="h-4 bg-surface-hover w-24 rounded animate-pulse" /></td>
                                                    <td className="py-4"><div className="h-6 bg-surface-hover w-16 rounded animate-pulse" /></td>
                                                    <td className="py-4"><div className="h-8 bg-surface-hover w-20 ml-auto rounded animate-pulse" /></td>
                                                </tr>
                                            ))
                                        ) : providers.length > 0 ? (
                                            providers.map(p => (
                                                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surface-hover">
                                                    <td className="py-4 font-bold text-text-primary">{p.display_name || p.email}</td>
                                                    <td className="py-4 text-text-secondary">{p.role || 'Provider'}</td>
                                                    <td className="py-4">
                                                        <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${statusColors[p.status as keyof typeof statusColors] || statusColors.pending}`}>
                                                            {p.status || 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 text-right flex justify-end gap-2">
                                                        {p.status === 'pending' && (
                                                            <>
                                                                <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => handleStatusUpdate(p.id, 'active')} title="Approve">
                                                                    <Check size={18} />
                                                                </Button>
                                                                <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleStatusUpdate(p.id, 'rejected')} title="Reject">
                                                                    <X size={18} />
                                                                </Button>
                                                            </>
                                                        )}
                                                        {p.status === 'active' && (
                                                            <Button size="sm" variant="ghost" className="text-amber-600 hover:bg-amber-50 hover:text-amber-700" onClick={() => handleStatusUpdate(p.id, 'suspended')} title="Suspend">
                                                                <Ban size={18} />
                                                            </Button>
                                                        )}
                                                        {(p.status === 'suspended' || p.status === 'rejected') && (
                                                            <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => handleStatusUpdate(p.id, 'active')} title="Re-activate">
                                                                <Check size={18} />
                                                            </Button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="py-8 text-center text-text-secondary">
                                                    No {filter} providers found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderManagement;
