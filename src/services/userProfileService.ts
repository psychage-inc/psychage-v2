/**
 * User Profile Service - Manages user profile and account settings
 *
 * Handles profile updates, password changes, and avatar uploads using Supabase.
 */

import { supabase } from '../lib/supabaseClient';

export interface UserProfile {
    id: string;
    email: string;
    display_name?: string;
    full_name?: string;
    avatar_url?: string;
    location?: string;
    role: 'patient' | 'provider' | 'admin';
    created_at?: string;
    updated_at?: string;
}

export interface UserActivity {
    id: string;
    user_id: string;
    action_type: string;
    resource_type?: string;
    resource_id?: string;
    metadata?: Record<string, unknown>;
    created_at: string;
}

export const userProfileService = {
    /**
     * Get current user's profile
     */
    getProfile: async (): Promise<UserProfile | null> => {
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                console.error('Error getting authenticated user:', authError);
                return null;
            }

            // Check if user_profiles table exists and has data
            const { data: profileData, error: profileError } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', user.id)
                .maybeSingle();

            // Resolve role from app_metadata (server-controlled), then fall back
            // to profiles.role (also server-controlled via DB trigger). Never
            // read user_metadata.role — see AUTH-001.
            const appRole = (user.app_metadata as { role?: unknown } | undefined)?.role;
            const resolveRole = (raw: unknown): 'patient' | 'provider' | 'admin' =>
                raw === 'admin' || raw === 'provider' || raw === 'patient' ? raw : 'patient';

            // If profile table exists and has data, merge with auth user
            if (!profileError && profileData) {
                return {
                    id: user.id,
                    email: user.email || '',
                    display_name: profileData.display_name || user.user_metadata?.display_name || '',
                    full_name: profileData.full_name || user.user_metadata?.full_name || '',
                    avatar_url: profileData.avatar_url || user.user_metadata?.avatar_url || '',
                    location: profileData.location,
                    role: resolveRole(appRole ?? profileData.role),
                    created_at: user.created_at,
                    updated_at: profileData.updated_at,
                };
            }

            // Fallback to auth user metadata only
            return {
                id: user.id,
                email: user.email || '',
                display_name: user.user_metadata?.display_name || user.user_metadata?.full_name || '',
                full_name: user.user_metadata?.full_name || '',
                avatar_url: user.user_metadata?.avatar_url || '',
                location: user.user_metadata?.location,
                role: resolveRole(appRole),
                created_at: user.created_at,
            };
        } catch (error) {
            console.error('Failed to get user profile:', error);
            return null;
        }
    },

    /**
     * Update user profile.
     *
     * `role` is intentionally excluded from the accepted update shape: roles
     * must be set server-side via admin tooling, never from a client-trusted
     * call. See AUTH-001 in docs/audits/auth-audit-2026-04-23.md.
     */
    updateProfile: async (updates: Partial<Omit<UserProfile, 'id' | 'email' | 'created_at' | 'role'>>): Promise<UserProfile | null> => {
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                console.error('Error getting authenticated user:', authError);
                return null;
            }

            // Update auth user metadata (display fields only — never role)
            const metadataUpdates: Record<string, unknown> = {};
            if (updates.display_name !== undefined) metadataUpdates.display_name = updates.display_name;
            if (updates.full_name !== undefined) metadataUpdates.full_name = updates.full_name;
            if (updates.avatar_url !== undefined) metadataUpdates.avatar_url = updates.avatar_url;
            if (updates.location !== undefined) metadataUpdates.location = updates.location;

            const { error: updateError } = await supabase.auth.updateUser({
                data: metadataUpdates,
            });

            if (updateError) {
                console.error('Error updating auth user:', updateError);
            }

            // Try to update user_profiles table if it exists
            try {
                const profileUpdates: Record<string, unknown> = {
                    updated_at: new Date().toISOString(),
                };
                if (updates.display_name !== undefined) profileUpdates.display_name = updates.display_name;
                if (updates.full_name !== undefined) profileUpdates.full_name = updates.full_name;
                if (updates.avatar_url !== undefined) profileUpdates.avatar_url = updates.avatar_url;
                if (updates.location !== undefined) profileUpdates.location = updates.location;

                // Upsert to user_profiles table
                await supabase
                    .from('user_profiles')
                    .upsert({
                        id: user.id,
                        ...profileUpdates,
                    });
            } catch (_profileError) {
                // user_profiles table might not exist, that's okay
            }

            // Return updated profile
            return await userProfileService.getProfile();
        } catch (error) {
            console.error('Failed to update user profile:', error);
            return null;
        }
    },

    /**
     * Change user password
     */
    changePassword: async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
        try {
            // Validate new password
            if (newPassword.length < 8) {
                return { success: false, error: 'Password must be at least 8 characters long' };
            }

            // Verify current password by attempting to sign in
            const { data: { user } } = await supabase.auth.getUser();
            if (!user?.email) {
                return { success: false, error: 'No authenticated user found' };
            }

            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: currentPassword,
            });

            if (signInError) {
                return { success: false, error: 'Current password is incorrect' };
            }

            // Update password
            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (updateError) {
                return { success: false, error: updateError.message };
            }

            return { success: true };
        } catch (error) {
            console.error('Failed to change password:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred'
            };
        }
    },

    /**
     * Upload avatar image to Supabase Storage
     */
    uploadAvatar: async (file: File): Promise<{ success: boolean; url?: string; error?: string }> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return { success: false, error: 'No authenticated user found' };
            }

            // Validate file
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                return { success: false, error: 'File size must be less than 5MB' };
            }

            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                return { success: false, error: 'File must be an image (JPEG, PNG, WebP, or GIF)' };
            }

            // Create unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Date.now()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('user-uploads')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true,
                });

            if (uploadError) {
                console.error('Error uploading avatar:', uploadError);
                return { success: false, error: uploadError.message };
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('user-uploads')
                .getPublicUrl(filePath);

            // Update user profile with new avatar URL
            await userProfileService.updateProfile({ avatar_url: publicUrl });

            return { success: true, url: publicUrl };
        } catch (error) {
            console.error('Failed to upload avatar:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to upload avatar'
            };
        }
    },

    /**
     * Remove user avatar
     */
    removeAvatar: async (): Promise<{ success: boolean; error?: string }> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return { success: false, error: 'No authenticated user found' };
            }

            // Extract file path from current avatar URL if exists
            const currentProfile = await userProfileService.getProfile();
            if (currentProfile?.avatar_url) {
                try {
                    const url = new URL(currentProfile.avatar_url);
                    const pathMatch = url.pathname.match(/\/user-uploads\/(.+)$/);
                    if (pathMatch) {
                        // Delete from storage
                        await supabase.storage
                            .from('user-uploads')
                            .remove([pathMatch[1]]);
                    }
                } catch (_e) {
                    // URL parsing failed or file doesn't exist, continue anyway
                }
            }

            // Update profile to remove avatar URL
            await userProfileService.updateProfile({ avatar_url: '' });

            return { success: true };
        } catch (error) {
            console.error('Failed to remove avatar:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to remove avatar'
            };
        }
    },

    /**
     * Get user activity log
     */
    getActivity: async (limit: number = 20): Promise<UserActivity[]> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return [];
            }

            const { data, error } = await supabase
                .from('user_activity')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) {
                console.error('Error fetching user activity:', error);
                return [];
            }

            return (data || []) as UserActivity[];
        } catch (error) {
            console.error('Failed to get user activity:', error);
            return [];
        }
    },

    /**
     * Log user activity
     */
    logActivity: async (
        actionType: string,
        resourceType?: string,
        resourceId?: string,
        metadata?: Record<string, unknown>
    ): Promise<boolean> => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return false;
            }

            const { error } = await supabase
                .from('user_activity')
                .insert({
                    user_id: user.id,
                    action_type: actionType,
                    resource_type: resourceType,
                    resource_id: resourceId,
                    metadata,
                    created_at: new Date().toISOString(),
                });

            if (error) {
                console.error('Error logging activity:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Failed to log activity:', error);
            return false;
        }
    },
};
