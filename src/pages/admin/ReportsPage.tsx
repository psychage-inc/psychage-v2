import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import SEO from '@/components/SEO';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminSidebar from './AdminSidebar';

interface Report {
    id: string;
    created_at: string;
    type: 'content' | 'user' | 'system';
    subject?: string;
    status: 'resolved' | 'investigating' | 'pending';
    reporter_id?: string;
}

const ReportsPage: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchReports = async () => {
            setIsLoading(true);
            try {
                const response = await api.admin.getReports(filter);
                if (response.success && response.data) {
                    // Assuming API returns array of reports but typed as Record<string, unknown> by cleaner
                    // We need to cast it properly if it's actually an array
                    setReports(response.data as unknown as Report[]);
                }
            } catch (error) {
                console.error("Failed to fetch reports", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReports();
    }, [filter]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'resolved': return <CheckCircle size={18} className="text-green-500" />;
            case 'investigating': return <Clock size={18} className="text-amber-500" />;
            default: return <AlertTriangle size={18} className="text-red-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="User Reports | Admin" />
            <div className="container mx-auto max-w-[1400px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-3">
                        <AdminSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <h1 className="text-3xl font-display font-bold text-text-primary">User Reports</h1>
                            <div className="flex gap-2">
                                {['all', 'content', 'user', 'system'].map(type => (
                                    <Button
                                        key={type}
                                        variant={filter === type ? 'primary' : 'outline'}
                                        size="sm"
                                        onClick={() => setFilter(type)}
                                        className="capitalize"
                                    >
                                        {type}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <Card className="p-0 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-surface-hover">
                                        <tr>
                                            <th className="px-6 py-4 font-bold text-text-secondary text-sm uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 font-bold text-text-secondary text-sm uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-4 font-bold text-text-secondary text-sm uppercase tracking-wider">Subject</th>
                                            <th className="px-6 py-4 font-bold text-text-secondary text-sm uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 font-bold text-text-secondary text-sm uppercase tracking-wider">Reporter</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {isLoading ? (
                                            [1, 2, 3].map(i => (
                                                <tr key={i}>
                                                    <td className="px-6 py-4"><div className="h-4 bg-surface-hover w-24 rounded animate-pulse" /></td>
                                                    <td className="px-6 py-4"><div className="h-4 bg-surface-hover w-20 rounded animate-pulse" /></td>
                                                    <td className="px-6 py-4"><div className="h-4 bg-surface-hover w-48 rounded animate-pulse" /></td>
                                                    <td className="px-6 py-4"><div className="h-4 bg-surface-hover w-24 rounded animate-pulse" /></td>
                                                    <td className="px-6 py-4"><div className="h-4 bg-surface-hover w-32 rounded animate-pulse" /></td>
                                                </tr>
                                            ))
                                        ) : reports.length > 0 ? (
                                            reports.map((report) => (
                                                <tr key={report.id} className="hover:bg-surface-hover transition-colors">
                                                    <td className="px-6 py-4 text-sm text-text-secondary">
                                                        {format(new Date(report.created_at), 'MMM d, yyyy')}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-hover text-text-primary capitalize">
                                                            {report.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-text-primary font-medium">
                                                        {report.subject || 'No subject'}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            {getStatusIcon(report.status)}
                                                            <span className="text-sm capitalize">{report.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-text-secondary">
                                                        {report.reporter_id ? report.reporter_id.substring(0, 8) + '...' : 'Anonymous'}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-text-secondary">
                                                    <div className="flex flex-col items-center justify-center gap-2">
                                                        <AlertTriangle size={48} className="text-surface-hover" />
                                                        <p>No reports found.</p>
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

export default ReportsPage;
