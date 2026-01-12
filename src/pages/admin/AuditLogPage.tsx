import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import SEO from '@/components/SEO';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import { FileText, User } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

interface AuditLog {
    id: string;
    created_at: string;
    user_id?: string;
    action: string;
    details: string | Record<string, unknown>;
}

const AuditLogPage: React.FC = () => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            setIsLoading(true);
            try {
                const response = await api.admin.getAuditLogs();
                if (response.success && response.data) {
                    setLogs(response.data as unknown as AuditLog[]);
                }
            } catch (error) {
                console.error("Failed to fetch audit logs", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="System Logs | Admin" />
            <div className="container mx-auto max-w-[1400px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-3">
                        <AdminSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-8">
                        <h1 className="text-3xl font-display font-bold text-text-primary mb-8">System Audit Logs</h1>

                        <Card className="p-0 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-surface-hover">
                                        <tr>
                                            <th className="px-6 py-4 font-bold text-text-secondary text-sm uppercase tracking-wider">Timestamp</th>
                                            <th className="px-6 py-4 font-bold text-text-secondary text-sm uppercase tracking-wider">User</th>
                                            <th className="px-6 py-4 font-bold text-text-secondary text-sm uppercase tracking-wider">Action</th>
                                            <th className="px-6 py-4 font-bold text-text-secondary text-sm uppercase tracking-wider">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {isLoading ? (
                                            [1, 2, 3, 4, 5].map(i => (
                                                <tr key={i}>
                                                    <td className="px-6 py-4"><div className="h-4 bg-surface-hover w-32 rounded animate-pulse" /></td>
                                                    <td className="px-6 py-4"><div className="h-4 bg-surface-hover w-24 rounded animate-pulse" /></td>
                                                    <td className="px-6 py-4"><div className="h-4 bg-surface-hover w-40 rounded animate-pulse" /></td>
                                                    <td className="px-6 py-4"><div className="h-4 bg-surface-hover w-full rounded animate-pulse" /></td>
                                                </tr>
                                            ))
                                        ) : logs.length > 0 ? (
                                            logs.map((log) => (
                                                <tr key={log.id} className="hover:bg-surface-hover transition-colors">
                                                    <td className="px-6 py-4 text-sm text-text-secondary font-mono">
                                                        {format(new Date(log.created_at), 'MMM d, yyyy HH:mm:ss')}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-text-primary font-medium">
                                                        {log.user_id ? (
                                                            <span className="flex items-center gap-2">
                                                                <User size={14} className="text-primary-500" />
                                                                {log.user_id.substring(0, 8)}...
                                                            </span>
                                                        ) : 'System'}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                                            {log.action}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-text-secondary">
                                                        {typeof log.details === 'object' ? JSON.stringify(log.details) : log.details}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-12 text-center text-text-secondary">
                                                    <div className="flex flex-col items-center justify-center gap-2">
                                                        <FileText size={48} className="text-surface-hover" />
                                                        <p>No audit logs found.</p>
                                                    </div>
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

export default AuditLogPage;
