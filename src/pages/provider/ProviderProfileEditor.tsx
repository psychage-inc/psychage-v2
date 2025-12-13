import React from 'react';
import ProviderSidebar from './ProviderSidebar';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import SEO from '@/components/SEO';

const ProviderProfileEditor: React.FC = () => {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Edit Profile | Psychage" />

            <div className="container mx-auto max-w-[1200px]">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8">Profile Management</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <ProviderSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card className="p-8">
                            <h2 className="text-xl font-bold text-text-primary mb-6">Professional Information</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input defaultValue="Dr. Sarah Smith" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Title</Label>
                                        <Input defaultValue="Licensed Clinical Psychologist" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Bio</Label>
                                    <textarea
                                        className="w-full min-h-[150px] p-3 rounded-xl border border-border bg-surface-hover focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        defaultValue="Dr. Smith has over 15 years of experience in cognitive behavioral therapy..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Specialties (Comma separated)</Label>
                                    <Input defaultValue="Anxiety, Depression, Trauma, ADHD" />
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Save Changes</Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderProfileEditor;
