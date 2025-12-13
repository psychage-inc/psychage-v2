import React, { useState } from 'react';
import UserSidebar from './UserSidebar';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { User, Mail, MapPin, Camera } from 'lucide-react';
import SEO from '@/components/SEO';

const ProfileSettings: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Profile Settings | Psychage" />

            <div className="container mx-auto max-w-[1200px]">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8">Profile Settings</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <UserSidebar />
                    </div>

                    <div className="lg:col-span-3">
                        <Card className="p-8">
                            <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                                <div className="relative group cursor-pointer">
                                    <div className="w-24 h-24 rounded-full bg-surface-hover flex items-center justify-center text-3xl font-bold text-text-tertiary border-4 border-surface shadow-md">
                                        JD
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="text-white" size={24} />
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold text-text-primary">Jane Doe</h2>
                                    <p className="text-text-secondary mb-4">Member since Dec 2024</p>
                                    <Button size="sm" variant="outline" onClick={() => setIsEditing(!isEditing)}>
                                        {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                                    </Button>
                                </div>
                            </div>

                            <form className="space-y-6 max-w-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">First Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                                            <input
                                                className="w-full pl-12 pr-4 py-3 bg-surface-hover rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none disabled:opacity-60"
                                                defaultValue="Jane"
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">Last Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                                            <input
                                                className="w-full pl-12 pr-4 py-3 bg-surface-hover rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none disabled:opacity-60"
                                                defaultValue="Doe"
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text-secondary">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                                        <input
                                            className="w-full pl-12 pr-4 py-3 bg-surface-hover rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none disabled:opacity-60"
                                            defaultValue="jane.doe@example.com"
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text-secondary">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                                        <input
                                            className="w-full pl-12 pr-4 py-3 bg-surface-hover rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none disabled:opacity-60"
                                            defaultValue="San Francisco, CA"
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="pt-4 flex justify-end">
                                        <Button>Save Changes</Button>
                                    </div>
                                )}
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
