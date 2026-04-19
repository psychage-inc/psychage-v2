import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
    ArrowLeft, MapPin, Mail, Shield, Calendar,
    CheckCircle, XCircle, Ban, Save
} from 'lucide-react';
import { providerService } from '@/services/providerService';
import { Provider } from '@/types/models';
import { useToast } from '@/context/ToastContext';
import { api } from '@/lib/api';
import { logAdminAction } from '@/lib/admin/auditLogger';
import AdminLayout from './components/AdminLayout';
import AdminErrorBanner from './components/AdminErrorBanner';
import StatusBadge from './components/StatusBadge';
import AdminConfirmModal from './components/AdminConfirmModal';

const ProviderDetailAdmin: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const toast = useToast();
    const [provider, setProvider] = useState<Provider | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Notes
    const [verificationNotes, setVerificationNotes] = useState('');
    const [isSavingNotes, setIsSavingNotes] = useState(false);
    const [notesSaved, setNotesSaved] = useState(false);

    // Confirmation modal
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        action: 'active' | 'rejected' | 'suspended';
    }>({ isOpen: false, action: 'active' });
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchProvider = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setError(null);
        try {
            const data = await providerService.getById(id);
            if (data) {
                setProvider(data);
            } else {
                setError('Provider not found.');
            }
        } catch (err) {
            console.error("Failed to fetch provider", err);
            setError('Failed to load provider details.');
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProvider();
    }, [fetchProvider]);

    const handleSaveNotes = async () => {
        if (!id) return;
        setIsSavingNotes(true);
        try {
            await api.admin.saveProviderNotes(id, verificationNotes);
            await logAdminAction({
                action: 'save_provider_notes',
                resourceType: 'provider',
                resourceId: id,
                newValue: { notes: verificationNotes },
            });
            setNotesSaved(true);
            setTimeout(() => setNotesSaved(false), 3000);
        } catch (err) {
            console.error("Failed to save notes", err);
            toast.error('Failed to save verification notes.');
        } finally {
            setIsSavingNotes(false);
        }
    };

    const handleStatusUpdate = async (reason?: string) => {
        if (!id) return;
        setIsUpdating(true);
        try {
            await api.admin.updateProviderStatusWithReason(id, modalState.action, reason);
            await logAdminAction({
                action: modalState.action === 'active' ? 'approve_provider' : `${modalState.action}_provider`,
                resourceType: 'provider',
                resourceId: id,
                previousValue: { status: provider?.status },
                newValue: { status: modalState.action, reason },
            });
            setModalState(s => ({ ...s, isOpen: false }));
            toast.success(`Provider ${modalState.action === 'active' ? 'approved' : modalState.action} successfully.`);
            fetchProvider();
        } catch (err) {
            console.error("Failed to update status", err);
            toast.error('Failed to update provider status. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    const getModalConfig = () => {
        const name = provider?.name || 'this provider';
        switch (modalState.action) {
            case 'active':
                return { title: 'Approve Provider', description: `Approve ${name} and make their profile visible?`, confirmText: 'Approve', confirmColor: 'green' as const, reasonRequired: false, showReason: false };
            case 'rejected':
                return { title: 'Reject Provider', description: `Reject ${name}? A reason is required.`, confirmText: 'Reject', confirmColor: 'red' as const, reasonRequired: true, showReason: true };
            case 'suspended':
                return { title: 'Suspend Provider', description: `Suspend ${name}? A reason is required.`, confirmText: 'Suspend', confirmColor: 'amber' as const, reasonRequired: true, showReason: true };
        }
    };

    const modalConfig = getModalConfig();

    if (isLoading) {
        return (
            <AdminLayout title="Provider Details">
                <div className="space-y-6">
                    <div className="h-8 w-32 bg-surface-hover animate-pulse rounded" />
                    <Card className="p-8">
                        <div className="flex gap-6">
                            <div className="w-20 h-20 bg-surface-hover rounded-full animate-pulse" />
                            <div className="space-y-3 flex-1">
                                <div className="h-6 w-48 bg-surface-hover rounded animate-pulse" />
                                <div className="h-4 w-32 bg-surface-hover rounded animate-pulse" />
                                <div className="h-4 w-64 bg-surface-hover rounded animate-pulse" />
                            </div>
                        </div>
                    </Card>
                </div>
            </AdminLayout>
        );
    }

    if (error || !provider) {
        return (
            <AdminLayout title="Provider Details">
                <AdminErrorBanner message={error || 'Provider not found'} onRetry={fetchProvider} />
                <Button variant="outline" onClick={() => navigate('/admin/providers')} leftIcon={<ArrowLeft size={16} />}>
                    Back to Providers
                </Button>
            </AdminLayout>
        );
    }

    const status = provider.status || 'pending';

    return (
        <AdminLayout title="Provider Details" seoTitle={`${provider.name} | Admin`}>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/providers')}
                leftIcon={<ArrowLeft size={16} />}
                className="-mt-4"
            >
                Back to Providers
            </Button>

            {/* Provider Header */}
            <Card className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {provider.image ? (
                        <img src={provider.image} alt={provider.name} className="w-20 h-20 rounded-full object-cover shrink-0" />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-surface-hover flex items-center justify-center text-text-tertiary text-2xl font-bold shrink-0">
                            {provider.name.charAt(0)}
                        </div>
                    )}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                            <h2 className="text-2xl font-display font-bold text-text-primary">{provider.name}</h2>
                            <StatusBadge status={status} />
                        </div>
                        <div className="space-y-1.5 text-sm text-text-secondary">
                            <div className="flex items-center gap-2"><Mail size={14} /> {provider.email || 'No email provided'}</div>
                            <div className="flex items-center gap-2"><MapPin size={14} /> {provider.location || 'No location'}</div>
                            <div className="flex items-center gap-2"><Shield size={14} /> {provider.role || 'Provider'}</div>
                            <div className="flex items-center gap-2"><Calendar size={14} /> {provider.yearsExperience} years experience</div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 shrink-0">
                        {status === 'pending' && (
                            <>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white border-none" onClick={() => setModalState({ isOpen: true, action: 'active' })} leftIcon={<CheckCircle size={16} />}>
                                    Approve
                                </Button>
                                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white border-none" onClick={() => setModalState({ isOpen: true, action: 'rejected' })} leftIcon={<XCircle size={16} />}>
                                    Reject
                                </Button>
                            </>
                        )}
                        {status === 'active' && (
                            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white border-none" onClick={() => setModalState({ isOpen: true, action: 'suspended' })} leftIcon={<Ban size={16} />}>
                                Suspend
                            </Button>
                        )}
                        {(status === 'suspended' || status === 'rejected') && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white border-none" onClick={() => setModalState({ isOpen: true, action: 'active' })} leftIcon={<CheckCircle size={16} />}>
                                Re-activate
                            </Button>
                        )}
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Credentials & Specialties */}
                <Card className="p-8">
                    <h3 className="text-lg font-bold text-text-primary mb-4">Credentials & Specialties</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-text-secondary mb-1 block">Specialties</label>
                            <div className="flex flex-wrap gap-2">
                                {provider.specialties.length > 0 ? (
                                    provider.specialties.map((s, i) => (
                                        <Badge key={i} variant="teal">{s}</Badge>
                                    ))
                                ) : (
                                    <span className="text-sm text-text-tertiary">None listed</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-text-secondary mb-1 block">Education</label>
                            {provider.education.filter(Boolean).length > 0 ? (
                                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                                    {provider.education.filter(Boolean).map((e, i) => <li key={i}>{e}</li>)}
                                </ul>
                            ) : (
                                <span className="text-sm text-text-tertiary">Not provided</span>
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-bold text-text-secondary mb-1 block">Languages</label>
                            <div className="flex flex-wrap gap-2">
                                {provider.languages.length > 0 ? (
                                    provider.languages.map((l, i) => (
                                        <Badge key={i} variant="neutral">{l}</Badge>
                                    ))
                                ) : (
                                    <span className="text-sm text-text-tertiary">Not specified</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-text-secondary mb-1 block">Treatment Approach</label>
                            <p className="text-sm text-text-secondary">{provider.approach || 'Not specified'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-text-secondary mb-1 block">Insurance</label>
                            <div className="flex flex-wrap gap-2">
                                {provider.insurance.length > 0 ? (
                                    provider.insurance.map((ins, i) => (
                                        <Badge key={i} variant="outline">{ins}</Badge>
                                    ))
                                ) : (
                                    <span className="text-sm text-text-tertiary">Not specified</span>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Bio & Verification Notes */}
                <div className="space-y-8">
                    <Card className="p-8">
                        <h3 className="text-lg font-bold text-text-primary mb-4">Bio</h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            {provider.bio || 'No bio provided.'}
                        </p>
                    </Card>

                    <Card className="p-8">
                        <h3 className="text-lg font-bold text-text-primary mb-4">Verification Notes</h3>
                        <textarea
                            value={verificationNotes}
                            onChange={(e) => {
                                setVerificationNotes(e.target.value);
                                setNotesSaved(false);
                            }}
                            placeholder="Add internal notes about this provider's verification (e.g., credential check status, NPI verification)..."
                            rows={5}
                            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 resize-none mb-3"
                        />
                        <div className="flex items-center gap-3">
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={handleSaveNotes}
                                isLoading={isSavingNotes}
                                disabled={!verificationNotes.trim()}
                                leftIcon={isSavingNotes ? undefined : <Save size={14} />}
                            >
                                Save Notes
                            </Button>
                            {notesSaved && (
                                <span className="text-sm text-green-600 flex items-center gap-1">
                                    <CheckCircle size={14} /> Saved
                                </span>
                            )}
                        </div>
                    </Card>
                </div>
            </div>

            <AdminConfirmModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState(s => ({ ...s, isOpen: false }))}
                onConfirm={handleStatusUpdate}
                title={modalConfig.title}
                description={modalConfig.description}
                confirmText={modalConfig.confirmText}
                confirmColor={modalConfig.confirmColor}
                isLoading={isUpdating}
                showReasonField={modalConfig.showReason}
                reasonRequired={modalConfig.reasonRequired}
                reasonPlaceholder={`Reason for ${modalState.action === 'rejected' ? 'rejection' : 'suspension'}...`}
            />
        </AdminLayout>
    );
};

export default ProviderDetailAdmin;
