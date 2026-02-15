import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';
import { providerService } from '@/services/providerService';
import { Provider } from '@/types/models';
import AdminSidebar from './AdminSidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import {
    ArrowLeft,
    User,
    Mail,
    MapPin,
    Phone,
    Calendar,
    Shield,
    CheckCircle,
    XCircle,
    Ban,
    FileText,
    ExternalLink,
    Clock,
    AlertTriangle,
    Award,
    Briefcase,
    GraduationCap,
    Building
} from 'lucide-react';

interface ProviderDetails extends Omit<Provider, 'education'> {
    phone?: string;
    created_at?: string;
    verified_at?: string;
    license_number?: string;
    license_state?: string;
    license_expiry?: string;
    npi_number?: string;
    title?: string; // Extended field for admin
    education?: string[] | Array<{
        degree: string;
        institution: string;
        year: string;
    }>;
    certifications?: Array<{
        name: string;
        issuer: string;
        year: string;
    }>;
    documents?: Array<{
        type: string;
        url: string;
        verified: boolean;
    }>;
    verification_notes?: string;
}

const ProviderDetailAdmin: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [provider, setProvider] = useState<ProviderDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [verificationNotes, setVerificationNotes] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState<'approve' | 'reject' | 'suspend' | null>(null);

    const fetchProvider = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            const data = await providerService.getById(id);
            if (data) {
                const providerData = data as unknown as ProviderDetails;
                setProvider(providerData);
                setVerificationNotes(providerData.verification_notes || '');
            }
        } catch (error) {
            console.error('Failed to fetch provider:', error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProvider();
    }, [fetchProvider]);

    const handleStatusUpdate = async (newStatus: string) => {
        if (!id) return;
        setIsUpdating(true);
        try {
            await providerService.updateProviderStatus(id, newStatus);
            // Update local state
            setProvider(prev => prev ? { ...prev, status: newStatus } : null);
            setShowConfirmModal(null);
        } catch (error) {
            console.error('Failed to update status:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const getStatusBadge = (status?: string) => {
        const styles = {
            pending: 'bg-amber-100 text-amber-700 border-amber-200',
            active: 'bg-green-100 text-green-700 border-green-200',
            suspended: 'bg-red-100 text-red-700 border-red-200',
            rejected: 'bg-gray-100 text-gray-700 border-gray-200',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium border uppercase ${styles[status as keyof typeof styles] || styles.pending}`}>
                {status || 'pending'}
            </span>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20 px-6">
                <SEO title="Provider Details | Admin" />
                <div className="container mx-auto max-w-[1400px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-3">
                            <AdminSidebar />
                        </div>
                        <div className="lg:col-span-9">
                            <div className="animate-pulse space-y-6">
                                <div className="h-8 bg-surface-hover rounded w-1/3" />
                                <div className="h-64 bg-surface-hover rounded-2xl" />
                                <div className="h-48 bg-surface-hover rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!provider) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20 px-6">
                <SEO title="Provider Not Found | Admin" />
                <div className="container mx-auto max-w-[1400px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-3">
                            <AdminSidebar />
                        </div>
                        <div className="lg:col-span-9">
                            <Card className="p-12 text-center">
                                <AlertTriangle size={48} className="mx-auto mb-4 text-amber-500" />
                                <h2 className="text-2xl font-bold text-text-primary mb-2">Provider Not Found</h2>
                                <p className="text-text-secondary mb-6">
                                    The provider you're looking for doesn't exist or has been removed.
                                </p>
                                <Button onClick={() => navigate('/admin/providers')}>
                                    Back to Providers
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title={`${provider.name} | Provider Verification`} />
            <div className="container mx-auto max-w-[1400px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-3">
                        <AdminSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => navigate('/admin/providers')}
                                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                            >
                                <ArrowLeft size={20} />
                                Back to Providers
                            </button>
                            {getStatusBadge(provider.status)}
                        </div>

                        {/* Provider Profile Card */}
                        <Card className="p-8">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    {provider.image ? (
                                        <img
                                            src={provider.image}
                                            alt={provider.name}
                                            className="w-32 h-32 rounded-2xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-2xl bg-primary/10 flex items-center justify-center">
                                            <User size={48} className="text-primary" />
                                        </div>
                                    )}
                                </div>

                                {/* Basic Info */}
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold text-text-primary mb-1">{provider.name}</h1>
                                    {provider.title && (
                                        <p className="text-lg text-text-secondary mb-4">{provider.title}</p>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {provider.email && (
                                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                                <Mail size={16} className="text-primary" />
                                                <a href={`mailto:${provider.email}`} className="hover:text-primary">
                                                    {provider.email}
                                                </a>
                                            </div>
                                        )}
                                        {provider.phone && (
                                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                                <Phone size={16} className="text-primary" />
                                                {provider.phone}
                                            </div>
                                        )}
                                        {provider.location && (
                                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                                <MapPin size={16} className="text-primary" />
                                                {provider.location}
                                            </div>
                                        )}
                                        {provider.created_at && (
                                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                                <Calendar size={16} className="text-primary" />
                                                Applied: {format(new Date(provider.created_at), 'MMM d, yyyy')}
                                            </div>
                                        )}
                                    </div>

                                    {/* Specialties */}
                                    {provider.specialties && provider.specialties.length > 0 && (
                                        <div className="mt-4">
                                            <div className="flex flex-wrap gap-2">
                                                {provider.specialties.map((spec, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-surface-hover rounded-full text-sm text-text-secondary"
                                                    >
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bio */}
                            {provider.bio && (
                                <div className="mt-6 pt-6 border-t border-border">
                                    <h3 className="font-bold text-text-primary mb-2">About</h3>
                                    <p className="text-text-secondary">{provider.bio}</p>
                                </div>
                            )}
                        </Card>

                        {/* Credentials Section */}
                        <Card className="p-8">
                            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                                <Shield size={20} className="text-primary" />
                                Credentials & Verification
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* License Info */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-text-primary flex items-center gap-2">
                                        <Award size={16} />
                                        License Information
                                    </h3>
                                    <div className="bg-surface-hover rounded-xl p-4 space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-text-secondary">License Number</span>
                                            <span className="text-sm font-medium text-text-primary">
                                                {provider.license_number || 'Not provided'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-text-secondary">License State</span>
                                            <span className="text-sm font-medium text-text-primary">
                                                {provider.license_state || 'Not provided'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-text-secondary">Expiration</span>
                                            <span className="text-sm font-medium text-text-primary">
                                                {provider.license_expiry
                                                    ? format(new Date(provider.license_expiry), 'MMM d, yyyy')
                                                    : 'Not provided'}
                                            </span>
                                        </div>
                                        {provider.npi_number && (
                                            <div className="flex justify-between">
                                                <span className="text-sm text-text-secondary">NPI Number</span>
                                                <span className="text-sm font-medium text-text-primary">
                                                    {provider.npi_number}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Education */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-text-primary flex items-center gap-2">
                                        <GraduationCap size={16} />
                                        Education
                                    </h3>
                                    <div className="bg-surface-hover rounded-xl p-4">
                                        {provider.education && provider.education.length > 0 ? (
                                            <ul className="space-y-3">
                                                {provider.education.map((edu, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <Building size={14} className="mt-1 text-primary shrink-0" />
                                                        <div>
                                                            {typeof edu === 'string' ? (
                                                                <p className="text-sm font-medium text-text-primary">{edu}</p>
                                                            ) : (
                                                                <>
                                                                    <p className="text-sm font-medium text-text-primary">{edu.degree}</p>
                                                                    <p className="text-xs text-text-secondary">
                                                                        {edu.institution} • {edu.year}
                                                                    </p>
                                                                </>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-text-secondary">No education information provided</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Certifications */}
                            {provider.certifications && provider.certifications.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                        <Briefcase size={16} />
                                        Certifications
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {provider.certifications.map((cert, i) => (
                                            <div key={i} className="bg-surface-hover rounded-xl p-4 flex items-start gap-3">
                                                <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-medium text-text-primary">{cert.name}</p>
                                                    <p className="text-sm text-text-secondary">
                                                        {cert.issuer} • {cert.year}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Documents */}
                            {provider.documents && provider.documents.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-border">
                                    <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                        <FileText size={16} />
                                        Submitted Documents
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {provider.documents.map((doc, i) => (
                                            <a
                                                key={i}
                                                href={doc.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between bg-surface-hover rounded-xl p-4 hover:bg-surface transition-colors group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <FileText size={20} className="text-primary" />
                                                    <span className="font-medium text-text-primary capitalize">{doc.type}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {doc.verified ? (
                                                        <CheckCircle size={16} className="text-green-500" />
                                                    ) : (
                                                        <Clock size={16} className="text-amber-500" />
                                                    )}
                                                    <ExternalLink size={16} className="text-text-secondary group-hover:text-primary" />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Card>

                        {/* Verification Notes */}
                        <Card className="p-8">
                            <h2 className="text-xl font-bold text-text-primary mb-4">Verification Notes</h2>
                            <textarea
                                value={verificationNotes}
                                onChange={(e) => setVerificationNotes(e.target.value)}
                                placeholder="Add notes about the verification process..."
                                className="w-full h-32 px-4 py-3 bg-surface-hover border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary text-text-primary placeholder-text-tertiary"
                            />
                        </Card>

                        {/* Action Buttons */}
                        <Card className="p-8">
                            <h2 className="text-xl font-bold text-text-primary mb-4">Actions</h2>
                            <div className="flex flex-wrap gap-4">
                                {(provider.status === 'pending' || !provider.status) && (
                                    <>
                                        <Button
                                            onClick={() => setShowConfirmModal('approve')}
                                            className="bg-green-600 hover:bg-green-700"
                                            leftIcon={<CheckCircle size={18} />}
                                        >
                                            Approve Provider
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowConfirmModal('reject')}
                                            className="border-red-300 text-red-600 hover:bg-red-50"
                                            leftIcon={<XCircle size={18} />}
                                        >
                                            Reject Application
                                        </Button>
                                    </>
                                )}
                                {provider.status === 'active' && (
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowConfirmModal('suspend')}
                                        className="border-amber-300 text-amber-600 hover:bg-amber-50"
                                        leftIcon={<Ban size={18} />}
                                    >
                                        Suspend Provider
                                    </Button>
                                )}
                                {(provider.status === 'suspended' || provider.status === 'rejected') && (
                                    <Button
                                        onClick={() => setShowConfirmModal('approve')}
                                        className="bg-green-600 hover:bg-green-700"
                                        leftIcon={<CheckCircle size={18} />}
                                    >
                                        Re-activate Provider
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showConfirmModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowConfirmModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-surface rounded-2xl p-8 max-w-md w-full shadow-2xl border border-border"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center">
                                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                                    showConfirmModal === 'approve'
                                        ? 'bg-green-100'
                                        : showConfirmModal === 'reject'
                                        ? 'bg-red-100'
                                        : 'bg-amber-100'
                                }`}>
                                    {showConfirmModal === 'approve' && <CheckCircle size={32} className="text-green-600" />}
                                    {showConfirmModal === 'reject' && <XCircle size={32} className="text-red-600" />}
                                    {showConfirmModal === 'suspend' && <Ban size={32} className="text-amber-600" />}
                                </div>

                                <h3 className="text-xl font-bold text-text-primary mb-2">
                                    {showConfirmModal === 'approve' && 'Approve Provider?'}
                                    {showConfirmModal === 'reject' && 'Reject Application?'}
                                    {showConfirmModal === 'suspend' && 'Suspend Provider?'}
                                </h3>

                                <p className="text-text-secondary mb-6">
                                    {showConfirmModal === 'approve' &&
                                        'This will allow the provider to appear in search results and accept patients.'}
                                    {showConfirmModal === 'reject' &&
                                        'This will permanently reject the application. The provider will be notified.'}
                                    {showConfirmModal === 'suspend' &&
                                        'This will temporarily hide the provider from search results and prevent new patient connections.'}
                                </p>

                                <div className="flex gap-3 justify-center">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowConfirmModal(null)}
                                        disabled={isUpdating}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => handleStatusUpdate(
                                            showConfirmModal === 'approve' ? 'active' :
                                            showConfirmModal === 'reject' ? 'rejected' : 'suspended'
                                        )}
                                        disabled={isUpdating}
                                        className={
                                            showConfirmModal === 'approve'
                                                ? 'bg-green-600 hover:bg-green-700'
                                                : showConfirmModal === 'reject'
                                                ? 'bg-red-600 hover:bg-red-700'
                                                : 'bg-amber-600 hover:bg-amber-700'
                                        }
                                    >
                                        {isUpdating ? 'Processing...' : 'Confirm'}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProviderDetailAdmin;
