import React, { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Ban, Search } from 'lucide-react';
import { providerService } from '@/services/providerService';
import { Provider } from '@/types/models';
import AdminSidebar from './AdminSidebar';

const ProviderManagement: React.FC = () => {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [filter, setFilter] = useState<'pending' | 'active' | 'suspended' | 'rejected'>('pending');
    const [isLoading, setIsLoading] = useState(true);

    const fetchProviders = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await providerService.getAdminProviders(filter);
            setProviders(data);
        } catch (error) {
            console.error("Failed to fetch providers", error);
        } finally {
            setIsLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchProviders();
    }, [fetchProviders]);

    const handleStatusUpdate = async (id: string | number, status: string) => { // id can be number or string
        try {
            await providerService.updateProviderStatus(id, status);
            // Optimistic update or refresh
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
                                        <AnimatePresence mode="wait">
                                            {isLoading ? (
                                                [1, 2, 3].map(i => (
                                                    <motion.tr
                                                        key={`skeleton-${i}`}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="border-b border-border"
                                                    >
                                                        <td className="py-4"><div className="h-4 bg-surface-hover w-32 rounded animate-pulse" /></td>
                                                        <td className="py-4"><div className="h-4 bg-surface-hover w-24 rounded animate-pulse" /></td>
                                                        <td className="py-4"><div className="h-6 bg-surface-hover w-16 rounded animate-pulse" /></td>
                                                        <td className="py-4"><div className="h-8 bg-surface-hover w-20 ml-auto rounded animate-pulse" /></td>
                                                    </motion.tr>
                                                ))
                                            ) : providers.length > 0 ? (
                                                providers.map((p, index) => (
                                                    <motion.tr
                                                        key={p.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                                        className="border-b border-border last:border-0 hover:bg-surface-hover"
                                                    >
                                                        <td className="py-4 font-bold text-text-primary">
                                                            <div className="flex items-center gap-3">
                                                                {p.image && <img src={p.image} alt={p.name} className="w-8 h-8 rounded-full object-cover" />}
                                                                <div>
                                                                    <div>{p.name}</div>
                                                                    <div className="text-xs text-text-secondary font-normal">{p.email}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 text-text-secondary">{p.role || 'Provider'}</td>
                                                        <td className="py-4">
                                                            <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${statusColors[p.status as keyof typeof statusColors] || statusColors.pending}`}>
                                                                {p.status || filter}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 text-right flex justify-end gap-2">
                                                            {(p.status === 'pending' || !p.status) && (
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
                                                    </motion.tr>
                                                ))
                                            ) : (
                                                <motion.tr
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                >
                                                    <td colSpan={4} className="py-12 text-center text-text-secondary">
                                                        <div className="flex flex-col items-center justify-center gap-3">
                                                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                                <Search size={24} />
                                                            </div>
                                                            <p>No {filter} providers found.</p>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            )}
                                        </AnimatePresence>
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
