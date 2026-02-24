import React, { useState, useEffect, useRef } from 'react';
import UserSidebar from './UserSidebar';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { User, Mail, MapPin, Camera, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

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
        location: '', // Note: Location is not currently in the User interface, so we might need to store it in metadata if supported, or just mock it for now as it persists locally in form
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

                // Try to fetch full profile with location
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
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Profile Settings | Psychage" />

            <div className="container mx-auto max-w-[1200px]">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8">Profile Settings</h1>

                {notification && (
                    <div className={`fixed top-24 right-6 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        } animate-in slide-in-from-right duration-300`}>
                        {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <p>{notification.message}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <UserSidebar />
                    </div>

                    <div className="lg:col-span-3 space-y-8">
                        {/* Profile Info Card */}
                        <Card className="p-8">
                            <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                                <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {user?.avatar_url ? (
                                        <img
                                            src={user.avatar_url}
                                            alt={user.display_name || 'User'}
                                            className="w-24 h-24 rounded-full object-cover border-4 border-surface shadow-md"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-surface-hover flex items-center justify-center text-3xl font-bold text-text-tertiary border-4 border-surface shadow-md">
                                            {user?.display_name ? user.display_name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="text-white" size={24} />
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold text-text-primary">{user?.display_name || 'User'}</h2>
                                    <p className="text-text-secondary mb-4">{user?.email}</p>
                                    <Button size="sm" variant="outline" onClick={() => setIsEditing(!isEditing)} disabled={isLoading}>
                                        {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                                    </Button>
                                </div>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">First Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                                            <input
                                                className="w-full pl-12 pr-4 py-3 bg-surface-hover rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none disabled:opacity-60"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                disabled={!isEditing || isLoading}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">Last Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                                            <input
                                                className="w-full pl-12 pr-4 py-3 bg-surface-hover rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none disabled:opacity-60"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                disabled={!isEditing || isLoading}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text-secondary">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                                        <input
                                            type="email"
                                            className="w-full pl-12 pr-4 py-3 bg-surface-hover rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none disabled:opacity-60"
                                            value={formData.email}
                                            disabled={true} // Email change usually requires verification, disable for now
                                        />
                                    </div>
                                    <p className="text-xs text-text-tertiary pl-1">Contact support to change email address.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text-secondary">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                                        <input
                                            className="w-full pl-12 pr-4 py-3 bg-surface-hover rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none disabled:opacity-60"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            disabled={!isEditing || isLoading}
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="pt-4 flex justify-end">
                                        <Button type="submit" disabled={isLoading}>
                                            {isLoading ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </Card>

                        {/* Security Card */}
                        <Card className="p-8">
                            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                                <Lock size={20} className="text-primary" />
                                Security
                            </h2>

                            <form onSubmit={handlePasswordChange} className="space-y-6 max-w-2xl">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text-secondary">Current Password</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 bg-surface-hover rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">New Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 bg-surface-hover rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">Confirm New Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 bg-surface-hover rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                </div>
                                <div className="pt-2 flex justify-end">
                                    <Button type="submit" variant="secondary" disabled={isLoading || !passwordData.currentPassword}>
                                        Change Password
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
