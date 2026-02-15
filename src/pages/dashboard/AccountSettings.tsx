import React, { useState, useEffect, useRef } from 'react';
import UserSidebar from './UserSidebar';
import InteractiveCard from '@/components/ui/InteractiveCard';
import Button from '@/components/ui/Button';
import MeshGradient from '@/components/ui/MeshGradient';
import { User, Mail, MapPin, Camera, Lock, AlertCircle, CheckCircle, Save, X } from 'lucide-react';
import SEO from '@/components/SEO';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { validateFileComplete } from '@/utils/fileValidation';

const ProfileSettings: React.FC = () => {
    const { user, refreshUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Profile Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        location: '',
    });

    // Password Form State
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Notification State
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            if (user) {
                // Split display_name into first and last name for the form
                const names = (user.display_name || '').split(' ');
                const firstName = names[0] || '';
                const lastName = names.slice(1).join(' ') || '';

                try {
                    const profileRes = await api.user.getProfile();
                    if (profileRes.success && profileRes.data) {
                        setFormData({
                            firstName,
                            lastName,
                            email: user.email || '',
                            location: profileRes.data.location || '',
                        });
                        return;
                    }
                } catch {
                    // Fall back to user data if profile fetch fails
                }

                setFormData({
                    firstName,
                    lastName,
                    email: user.email || '',
                    location: '',
                });
            }
        };
        loadProfile();
    }, [user]);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file before upload
        const validation = await validateFileComplete(file, 'avatar');
        if (!validation.valid) {
            setNotification({ type: 'error', message: validation.error || 'Invalid file' });
            return;
        }

        setIsLoading(true);
        try {
            await api.user.uploadAvatar(file);
            await refreshUser();
            setNotification({ type: 'success', message: 'Avatar updated successfully' });
        } catch (error) {
            console.error('Failed to upload avatar', error);
            setNotification({ type: 'error', message: 'Failed to upload avatar' });
        } finally {
            setIsLoading(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setNotification(null);

        try {
            const displayName = `${formData.firstName} ${formData.lastName}`.trim();
            const response = await api.user.updateProfile({
                display_name: displayName,
                location: formData.location,
            });

            if (response.success) {
                await refreshUser();
                setNotification({ type: 'success', message: 'Profile updated successfully' });
                setIsEditing(false);
            } else {
                throw new Error(response.error || 'Failed to update profile');
            }
        } catch (error) {
            setNotification({ type: 'error', message: error instanceof Error ? error.message : 'Failed to update profile' });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setNotification({ type: 'error', message: 'New passwords do not match' });
            return;
        }

        setIsLoading(true);
        setNotification(null);

        try {
            const response = await api.user.changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });

            if (response.success) {
                setNotification({ type: 'success', message: 'Password changed successfully' });
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                throw new Error(response.error || 'Failed to change password');
            }
        } catch (error) {
            setNotification({ type: 'error', message: error instanceof Error ? error.message : 'Failed to change password' });
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-dismiss notification
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <div className="min-h-screen bg-background relative pt-24 pb-20 px-6 transition-colors duration-300">
            <SEO title="Profile Settings | Psychage" />

            {/* Subtle Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <MeshGradient className="opacity-30" />
            </div>

            <div className="container mx-auto max-w-[1200px] relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
                >
                    <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight">Profile Settings</h1>
                    {/* Status Message */}
                    <AnimatePresence>
                        {notification && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm ${notification.type === 'success'
                                        ? 'bg-success/10 text-success border border-success/20'
                                        : 'bg-error/10 text-error border border-error/20'
                                    }`}
                            >
                                {notification.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                {notification.message}
                            </motion.div>
                        )}
                    </AnimatePresence>
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
                        {/* Profile Info Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <InteractiveCard className="p-8 bg-surface/50 backdrop-blur-md border-white/5">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 border-b border-border/50 pb-8">
                                    <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-surface shadow-xl ring-2 ring-transparent group-hover:ring-primary/50 transition-all duration-300">
                                            {user?.avatar_url ? (
                                                <img
                                                    src={user.avatar_url}
                                                    alt={user.display_name || 'User'}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-4xl font-bold text-primary">
                                                    {user?.display_name ? user.display_name.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                                                <Camera className="text-white drop-shadow-md" size={32} />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-1 right-1 bg-surface rounded-full p-1.5 shadow-md border border-border group-hover:scale-110 transition-transform">
                                            <Camera size={14} className="text-text-secondary" />
                                        </div>
                                    </div>

                                    <div className="flex-grow text-center md:text-left">
                                        <h2 className="text-2xl font-bold text-text-primary mb-1">{user?.display_name || 'User'}</h2>
                                        <p className="text-text-secondary mb-4 font-medium">{user?.email}</p>
                                        <Button
                                            size="sm"
                                            variant={isEditing ? "secondary" : "outline"}
                                            onClick={() => setIsEditing(!isEditing)}
                                            disabled={isLoading}
                                            className="gap-2"
                                        >
                                            {isEditing ? <X size={16} /> : null}
                                            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                                        </Button>
                                    </div>
                                </div>

                                <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl mx-auto md:mx-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-bold uppercase tracking-wider text-text-tertiary ml-1 group-focus-within:text-primary transition-colors">First Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-primary transition-colors" size={18} />
                                                <input
                                                    className="w-full pl-12 pr-4 py-3 bg-surface-hover/50 rounded-xl border border-transparent focus:border-primary/30 focus:bg-surface focus:ring-4 focus:ring-primary/10 outline-none disabled:opacity-60 transition-all font-medium text-text-primary placeholder:text-text-tertiary"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    disabled={!isEditing || isLoading}
                                                    required
                                                    placeholder="Enter first name"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-bold uppercase tracking-wider text-text-tertiary ml-1 group-focus-within:text-primary transition-colors">Last Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-primary transition-colors" size={18} />
                                                <input
                                                    className="w-full pl-12 pr-4 py-3 bg-surface-hover/50 rounded-xl border border-transparent focus:border-primary/30 focus:bg-surface focus:ring-4 focus:ring-primary/10 outline-none disabled:opacity-60 transition-all font-medium text-text-primary placeholder:text-text-tertiary"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    disabled={!isEditing || isLoading}
                                                    required
                                                    placeholder="Enter last name"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 group">
                                        <label className="text-xs font-bold uppercase tracking-wider text-text-tertiary ml-1 group-focus-within:text-primary transition-colors">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-primary transition-colors" size={18} />
                                            <input
                                                type="email"
                                                className="w-full pl-12 pr-4 py-3 bg-surface-hover/30 rounded-xl border border-transparent focus:border-primary/30 focus:bg-surface focus:ring-4 focus:ring-primary/10 outline-none disabled:opacity-60 transition-all font-medium text-text-primary placeholder:text-text-tertiary"
                                                value={formData.email}
                                                disabled={true}
                                            />
                                        </div>
                                        <p className="text-xs text-text-tertiary pl-1 mt-1 flex items-center gap-1">
                                            <AlertCircle size={12} />
                                            Contact support to change email address.
                                        </p>
                                    </div>

                                    <div className="space-y-2 group">
                                        <label className="text-xs font-bold uppercase tracking-wider text-text-tertiary ml-1 group-focus-within:text-primary transition-colors">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-primary transition-colors" size={18} />
                                            <input
                                                className="w-full pl-12 pr-4 py-3 bg-surface-hover/50 rounded-xl border border-transparent focus:border-primary/30 focus:bg-surface focus:ring-4 focus:ring-primary/10 outline-none disabled:opacity-60 transition-all font-medium text-text-primary placeholder:text-text-tertiary"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                disabled={!isEditing || isLoading}
                                                placeholder="e.g. New York, USA"
                                            />
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {isEditing && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="pt-4 flex justify-end"
                                            >
                                                <Button type="submit" disabled={isLoading} className="gap-2 shadow-lg shadow-primary/20">
                                                    <Save size={18} />
                                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                                </Button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </InteractiveCard>
                        </motion.div>

                        {/* Security Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <InteractiveCard className="p-8 bg-surface/50 backdrop-blur-md border-white/5">
                                <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Lock size={18} />
                                    </div>
                                    Security & Password
                                </h2>

                                <form onSubmit={handlePasswordChange} className="space-y-6 max-w-2xl mx-auto md:mx-0">
                                    <div className="space-y-2 group">
                                        <label className="text-xs font-bold uppercase tracking-wider text-text-tertiary ml-1 group-focus-within:text-primary transition-colors">Current Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 bg-surface-hover/50 rounded-xl border border-transparent focus:border-primary/30 focus:bg-surface focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-tertiary"
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                            required
                                            placeholder="Enter current password"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-bold uppercase tracking-wider text-text-tertiary ml-1 group-focus-within:text-primary transition-colors">New Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-3 bg-surface-hover/50 rounded-xl border border-transparent focus:border-primary/30 focus:bg-surface focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-tertiary"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                required
                                                minLength={8}
                                                placeholder="Min. 8 characters"
                                            />
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-bold uppercase tracking-wider text-text-tertiary ml-1 group-focus-within:text-primary transition-colors">Confirm New Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-3 bg-surface-hover/50 rounded-xl border border-transparent focus:border-primary/30 focus:bg-surface focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-tertiary"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                required
                                                minLength={8}
                                                placeholder="Re-enter new password"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-2 flex justify-end">
                                        <Button type="submit" variant="secondary" disabled={isLoading || !passwordData.currentPassword}>
                                            Change Password
                                        </Button>
                                    </div>
                                </form>
                            </InteractiveCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
