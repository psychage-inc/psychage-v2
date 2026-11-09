import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ArrowLeft, Calendar, User, FileText, Search as SearchIcon, CheckCircle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import AdminLayout from './components/AdminLayout';
import AdminErrorBanner from './components/AdminErrorBanner';
import StatusBadge from './components/StatusBadge';
import AdminConfirmModal from './components/AdminConfirmModal';
import { useToast } from '@/context/ToastContext';
import { api, type AdminReport } from '@/lib/api';

const ReportDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const toast = useToast();
    const [report, setReport] = useState<AdminReport | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        action: 'investigating' | 'resolved';
    }>({ isOpen: false, action: 'investigating' });

    const fetchReport = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.admin.getReport(id);
            if (response.success && response.data) {
                setReport(response.data);
            } else {
                setError(response.error || 'Report not found.');
            }
        } catch (err) {
            console.error("Failed to fetch report", err);
            setError('Failed to load report details.');
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchReport();
    }, [fetchReport]);

    const handleStatusUpdate = async (notes?: string) => {
        if (!id || !report) return;
        setIsUpdating(true);
        try {
            const response = await api.admin.updateReportStatus(id, modalState.action, notes);
            if (!response.success) {
                throw new Error(response.error || 'Update failed');
            }
            setReport(prev => prev ? {
                ...prev,
                status: modalState.action,
                resolution_notes: modalState.action === 'resolved' ? notes : prev.resolution_notes,
                resolved_at: modalState.action === 'resolved' ? new Date().toISOString() : prev.resolved_at,
            } : null);
            setModalState(s => ({ ...s, isOpen: false }));
            toast.success(modalState.action === 'resolved' ? 'Report marked as resolved.' : 'Investigation started.');
        } catch (err) {
            console.error("Failed to update report status", err);
            toast.error('Failed to update report status. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return (
            <AdminLayout title="Report Details">
                <div className="space-y-6">
                    <div className="h-8 w-32 bg-surface-hover animate-pulse rounded" />
                    <Card className="p-8 space-y-4">
                        <div className="h-6 w-3/4 bg-surface-hover rounded animate-pulse" />
                        <div className="h-4 w-1/2 bg-surface-hover rounded animate-pulse" />
                        <div className="h-24 w-full bg-surface-hover rounded animate-pulse" />
                    </Card>
                </div>
            </AdminLayout>
        );
    }

    if (error || !report) {
        return (
            <AdminLayout title="Report Details">
                <AdminErrorBanner message={error || 'Report not found'} onRetry={fetchReport} />
                <Button variant="outline" onClick={() => navigate('/admin/reports')} leftIcon={<ArrowLeft size={16} />}>
                    Back to Reports
                </Button>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Report Details" seoTitle={`Report: ${report.subject} | Admin`}>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/reports')}
                leftIcon={<ArrowLeft size={16} />}
                className="-mt-4"
            >
                Back to Reports
            </Button>

            {/* Report Header */}
            <Card className="p-8">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-xl font-display font-bold text-text-primary">{report.subject}</h2>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <StatusBadge status={report.status} />
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-hover text-text-primary capitalize">
                                {report.type}
                            </span>
                        </div>
                    </div>

                    {/* Status transition buttons */}
                    <div className="flex gap-2 shrink-0">
                        {report.status === 'pending' && (
                            <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white border-none"
                                onClick={() => setModalState({ isOpen: true, action: 'investigating' })}
                                leftIcon={<SearchIcon size={14} />}
                            >
                                Begin Investigation
                            </Button>
                        )}
                        {report.status === 'investigating' && (
                            <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white border-none"
                                onClick={() => setModalState({ isOpen: true, action: 'resolved' })}
                                leftIcon={<CheckCircle size={14} />}
                            >
                                Mark Resolved
                            </Button>
                        )}
                    </div>
                </div>

                {/* Meta info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-surface-hover rounded-xl">
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} className="text-text-tertiary" />
                        <span className="text-text-secondary">
                            Created {format(new Date(report.created_at), 'MMM d, yyyy')} ({formatDistanceToNow(new Date(report.created_at), { addSuffix: true })})
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <User size={14} className="text-text-tertiary" />
                        <span className="text-text-secondary">
                            {report.reporter_email || (report.reporter_id ? `${report.reporter_id.substring(0, 8)}...` : 'Anonymous')}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <FileText size={14} className="text-text-tertiary" />
                        <span className="text-text-secondary font-mono">{report.id}</span>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <h3 className="text-sm font-bold text-text-secondary mb-2">Description</h3>
                    <p className="text-text-primary leading-relaxed">{report.description}</p>
                </div>
            </Card>

            {/* Resolution Notes (if resolved) */}
            {report.status === 'resolved' && report.resolution_notes && (
                <Card className="p-8">
                    <h3 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                        <CheckCircle size={18} className="text-green-600" />
                        Resolution
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-2">{report.resolution_notes}</p>
                    {report.resolved_at && (
                        <p className="text-xs text-text-tertiary">
                            Resolved on {format(new Date(report.resolved_at), 'MMM d, yyyy')}
                        </p>
                    )}
                </Card>
            )}

            <AdminConfirmModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState(s => ({ ...s, isOpen: false }))}
                onConfirm={handleStatusUpdate}
                title={modalState.action === 'investigating' ? 'Begin Investigation' : 'Resolve Report'}
                description={
                    modalState.action === 'investigating'
                        ? 'Mark this report as under investigation?'
                        : 'Mark this report as resolved? Please provide resolution notes.'
                }
                confirmText={modalState.action === 'investigating' ? 'Begin Investigation' : 'Mark Resolved'}
                confirmColor={modalState.action === 'investigating' ? 'amber' : 'green'}
                isLoading={isUpdating}
                showReasonField={modalState.action === 'resolved'}
                reasonRequired={modalState.action === 'resolved'}
                reasonPlaceholder="Resolution notes — what was done to address this report?"
            />
        </AdminLayout>
    );
};

export default ReportDetailPage;
