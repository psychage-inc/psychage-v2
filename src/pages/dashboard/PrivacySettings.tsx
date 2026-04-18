import React, { useState, useEffect, useCallback } from 'react';
import UserSidebar from './UserSidebar';
import InteractiveCard from '@/components/ui/InteractiveCard';
import Button from '@/components/ui/Button';
import {
    Shield,
    Download,
    Trash2,
    Cookie,
    MessageSquare,
    BarChart2,
    Mail,
    AlertTriangle,
    CheckCircle,
    Clock,
    XCircle,
    Loader2,
} from 'lucide-react';
import SEO from '@/components/SEO';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { consentService, type ConsentType } from '@/services/consentService';
import { privacyService, type DSARRequest } from '@/services/privacyService';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Consent Toggle Item ──────────────────────────────────────────

interface ConsentToggleProps {
    icon: React.ReactNode;
    label: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

const ConsentToggle: React.FC<ConsentToggleProps> = ({
    icon,
    label,
    description,
    checked,
    onChange,
    disabled,
}) => (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-hover/30 hover:bg-surface-hover/50 transition-colors">
        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <div className="font-semibold text-text-primary text-sm">{label}</div>
            <p className="text-xs text-text-tertiary mt-0.5 leading-relaxed">{description}</p>
        </div>
        <button
            role="switch"
            aria-checked={checked}
            aria-label={`Toggle ${label}`}
            disabled={disabled}
            onClick={() => onChange(!checked)}
            className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none ${
                checked ? 'bg-primary' : 'bg-gray-300 dark:bg-neutral-600'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-neutral-200 shadow-sm transition-transform duration-200 ${
                    checked ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
        </button>
    </div>
);

// ─── DSAR Status Badge ────────────────────────────────────────────

const DSARStatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const config: Record<string, { color: string; icon: React.ReactNode }> = {
        pending: { color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400', icon: <Clock size={12} /> },
        processing: { color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400', icon: <Loader2 size={12} className="animate-spin" /> },
        completed: { color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400', icon: <CheckCircle size={12} /> },
        rejected: { color: 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400', icon: <XCircle size={12} /> },
        cancelled: { color: 'text-gray-500 bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400', icon: <XCircle size={12} /> },
    };
    const { color, icon } = config[status] || config.pending;

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
            {icon}
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

// ─── Main Component ───────────────────────────────────────────────

const PrivacySettings: React.FC = () => {
    const { user, logout } = useAuth();
    const { addToast } = useToast();

    // Consent states
    const [consents, setConsents] = useState({
        newsletter: false,
        analytics_cookies: false,
        ai_chat_history: false,
        clarity_score_tracking: false,
    });
    const [loadingConsents, setLoadingConsents] = useState(true);

    // DSAR history
    const [dsarHistory, setDsarHistory] = useState<DSARRequest[]>([]);

    // Privacy settings
    const [deletionScheduled, setDeletionScheduled] = useState<string | null>(null);

    // Loading / action states
    const [exporting, setExporting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [cancellingDeletion, setCancellingDeletion] = useState(false);

    // Load initial data
    useEffect(() => {
        const load = async () => {
            setLoadingConsents(true);
            try {
                const [activeConsents, privacy, dsars] = await Promise.all([
                    consentService.getActiveConsents(),
                    privacyService.getPrivacySettings(),
                    privacyService.getDSARHistory(),
                ]);

                setConsents({
                    newsletter: activeConsents.newsletter,
                    analytics_cookies: activeConsents.analytics_cookies,
                    ai_chat_history: activeConsents.ai_chat_history,
                    clarity_score_tracking: activeConsents.clarity_score_tracking,
                });

                if (privacy) {
                    setDeletionScheduled(privacy.deletion_scheduled_at);
                }

                setDsarHistory(dsars);
            } catch (error) {
                console.error('Failed to load privacy settings:', error);
            } finally {
                setLoadingConsents(false);
            }
        };

        if (user) load();
    }, [user]);

    // Toggle consent
    const handleConsentToggle = useCallback(async (type: ConsentType, granted: boolean) => {
        const prev = consents[type as keyof typeof consents];
        setConsents(c => ({ ...c, [type]: granted }));

        try {
            if (granted) {
                await consentService.logConsent(type, true);
            } else {
                await consentService.revokeConsent(type);
            }
            addToast('success', `${granted ? 'Enabled' : 'Disabled'} ${type.replace(/_/g, ' ')}`);
        } catch {
            setConsents(c => ({ ...c, [type]: prev }));
            addToast('error', 'Failed to update consent. Please try again.');
        }
    }, [consents, addToast]);

    // Data export
    const handleDataExport = useCallback(async () => {
        setExporting(true);
        try {
            const result = await privacyService.requestDataExport();
            if (result) {
                addToast('success', 'Data export request submitted. You will be notified when it is ready.');
                setDsarHistory(prev => [result, ...prev]);
            } else {
                addToast('error', 'Failed to request data export.');
            }
        } catch {
            addToast('error', 'Failed to request data export.');
        } finally {
            setExporting(false);
        }
    }, [addToast]);

    // Account deletion
    const handleDeleteAccount = useCallback(async () => {
        if (deleteConfirmText !== 'DELETE') return;
        setDeleting(true);
        try {
            const result = await privacyService.requestAccountDeletion();
            if (result.success) {
                addToast('success', 'Account deletion scheduled. You have 30 days to cancel.');
                setDeletionScheduled(result.scheduledAt);
                setShowDeleteConfirm(false);
                setDeleteConfirmText('');
                // Sign out after scheduling deletion
                setTimeout(() => logout(), 2000);
            } else {
                addToast('error', 'Failed to schedule account deletion.');
            }
        } catch {
            addToast('error', 'Failed to schedule account deletion.');
        } finally {
            setDeleting(false);
        }
    }, [deleteConfirmText, addToast, logout]);

    // Cancel deletion
    const handleCancelDeletion = useCallback(async () => {
        setCancellingDeletion(true);
        try {
            const success = await privacyService.cancelDeletion();
            if (success) {
                addToast('success', 'Account deletion cancelled. Your data is safe.');
                setDeletionScheduled(null);
            } else {
                addToast('error', 'Failed to cancel deletion.');
            }
        } catch {
            addToast('error', 'Failed to cancel deletion.');
        } finally {
            setCancellingDeletion(false);
        }
    }, [addToast]);

    return (
        <div className="min-h-screen bg-background relative pt-24 pb-20 px-6 transition-colors duration-300">
            <SEO title="Privacy & Data | Psychage" />

            <div className="fixed inset-0 z-0 pointer-events-none">
                            </div>

            <div className="container mx-auto max-w-dashboard relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight">
                        Privacy & Data
                    </h1>
                    <p className="text-text-secondary mt-2">
                        Manage your data preferences, export your data, or delete your account.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-1"
                    >
                        <UserSidebar />
                    </motion.div>

                    <div className="lg:col-span-3 space-y-8">
                        {/* Deletion Warning Banner */}
                        {deletionScheduled && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                            >
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" size={20} />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-red-800 dark:text-red-300">
                                            Account Deletion Scheduled
                                        </h3>
                                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                            Your account and all data will be permanently deleted on{' '}
                                            <strong>{new Date(deletionScheduled).toLocaleDateString()}</strong>.
                                            You can cancel this before the deadline.
                                        </p>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="mt-3 border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/30"
                                            onClick={handleCancelDeletion}
                                            disabled={cancellingDeletion}
                                        >
                                            {cancellingDeletion ? 'Cancelling...' : 'Cancel Deletion'}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Consent Management */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <InteractiveCard className="p-8 bg-surface/50 backdrop-blur-md border-white/5">
                                <h2 className="text-xl font-bold text-text-primary mb-1 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Shield size={18} />
                                    </div>
                                    Consent Management
                                </h2>
                                <p className="text-sm text-text-tertiary mb-6">
                                    Control which optional data processing you consent to. Required consents (terms, data processing, age verification) cannot be toggled here.
                                </p>

                                {loadingConsents ? (
                                    <div className="flex items-center justify-center py-8 text-text-tertiary">
                                        <Loader2 size={20} className="animate-spin mr-2" />
                                        Loading preferences...
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <ConsentToggle
                                            icon={<MessageSquare size={16} />}
                                            label="AI Chat History"
                                            description="Store your MindMate conversations in the cloud so they persist across sessions and devices."
                                            checked={consents.ai_chat_history}
                                            onChange={(v) => handleConsentToggle('ai_chat_history', v)}
                                        />
                                        <ConsentToggle
                                            icon={<BarChart2 size={16} />}
                                            label="Clarity Score Tracking"
                                            description="Save your Clarity Score results to track trends over time in your dashboard."
                                            checked={consents.clarity_score_tracking}
                                            onChange={(v) => handleConsentToggle('clarity_score_tracking', v)}
                                        />
                                        <ConsentToggle
                                            icon={<Cookie size={16} />}
                                            label="Analytics Cookies"
                                            description="Help us improve Psychage by allowing anonymous usage analytics."
                                            checked={consents.analytics_cookies}
                                            onChange={(v) => handleConsentToggle('analytics_cookies', v)}
                                        />
                                        <ConsentToggle
                                            icon={<Mail size={16} />}
                                            label="Newsletter & Updates"
                                            description="Receive Psychage updates and mental health insights via email."
                                            checked={consents.newsletter}
                                            onChange={(v) => handleConsentToggle('newsletter', v)}
                                        />
                                    </div>
                                )}
                            </InteractiveCard>
                        </motion.div>

                        {/* Data Export */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <InteractiveCard className="p-8 bg-surface/50 backdrop-blur-md border-white/5">
                                <h2 className="text-xl font-bold text-text-primary mb-1 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Download size={18} />
                                    </div>
                                    Download My Data
                                </h2>
                                <p className="text-sm text-text-tertiary mb-6">
                                    Export a copy of all your personal data stored on Psychage in JSON format.
                                    This includes your profile, mood entries, sleep data, assessments, bookmarks, and chat history.
                                </p>

                                <Button
                                    onClick={handleDataExport}
                                    disabled={exporting}
                                    variant="outline"
                                    className="gap-2"
                                >
                                    {exporting ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Preparing Export...
                                        </>
                                    ) : (
                                        <>
                                            <Download size={16} />
                                            Request Data Export
                                        </>
                                    )}
                                </Button>

                                {/* DSAR History */}
                                {dsarHistory.length > 0 && (
                                    <div className="mt-6 border-t border-border/50 pt-4">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-3">
                                            Request History
                                        </h3>
                                        <div className="space-y-2">
                                            {dsarHistory.slice(0, 5).map((dsar) => (
                                                <div
                                                    key={dsar.id}
                                                    className="flex items-center justify-between p-3 rounded-lg bg-surface-hover/30 text-sm"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-text-secondary capitalize">
                                                            {dsar.request_type}
                                                        </span>
                                                        <span className="text-text-tertiary">
                                                            {new Date(dsar.requested_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <DSARStatusBadge status={dsar.status} />
                                                        {dsar.download_url && dsar.status === 'completed' && (
                                                            <a
                                                                href={dsar.download_url}
                                                                className="text-primary hover:text-primary-hover text-xs font-medium"
                                                                download
                                                            >
                                                                Download
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </InteractiveCard>
                        </motion.div>

                        {/* Account Deletion */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <InteractiveCard className="p-8 bg-surface/50 backdrop-blur-md border-white/5 border-red-200/20 dark:border-red-900/20">
                                <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-1 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                                        <Trash2 size={18} />
                                    </div>
                                    Delete Account
                                </h2>
                                <p className="text-sm text-text-tertiary mb-6">
                                    Permanently delete your account and all associated data. This action has a 30-day grace period
                                    during which you can log back in to cancel the deletion.
                                </p>

                                {!showDeleteConfirm ? (
                                    <Button
                                        onClick={() => setShowDeleteConfirm(true)}
                                        variant="outline"
                                        className="gap-2 border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                                        disabled={!!deletionScheduled}
                                    >
                                        <Trash2 size={16} />
                                        {deletionScheduled ? 'Deletion Already Scheduled' : 'Delete My Account'}
                                    </Button>
                                ) : (
                                    <AnimatePresence>
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-4 p-4 rounded-xl bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50"
                                        >
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" size={20} />
                                                <div>
                                                    <h3 className="font-bold text-red-800 dark:text-red-300 text-sm">
                                                        This cannot be undone after 30 days
                                                    </h3>
                                                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                                        All your data including mood entries, sleep logs, clarity scores,
                                                        bookmarks, and chat history will be permanently deleted.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-red-700 dark:text-red-400">
                                                    Type DELETE to confirm
                                                </label>
                                                <input
                                                    type="text"
                                                    value={deleteConfirmText}
                                                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                                                    placeholder="DELETE"
                                                    className="w-full px-4 py-2.5 rounded-lg border border-red-300 dark:border-red-700 bg-surface text-text-primary text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                                                />
                                            </div>

                                            <div className="flex gap-3">
                                                <Button
                                                    onClick={handleDeleteAccount}
                                                    disabled={deleteConfirmText !== 'DELETE' || deleting}
                                                    className="gap-2 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                                                >
                                                    {deleting ? (
                                                        <>
                                                            <Loader2 size={16} className="animate-spin" />
                                                            Scheduling...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Trash2 size={16} />
                                                            Confirm Deletion
                                                        </>
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setShowDeleteConfirm(false);
                                                        setDeleteConfirmText('');
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                )}
                            </InteractiveCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacySettings;
