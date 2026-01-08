import React, { useEffect, useState } from 'react';
import ProviderSidebar from './ProviderSidebar';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import SEO from '@/components/SEO';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';

const ProviderProfileEditor: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        title: '',
        bio: '',
        specialities: [] as string[]
    });
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const res = await api.provider.getProfile();
                if (res.success && res.data) {
                    setFormData({
                        full_name: res.data.full_name || '',
                        title: res.data.title || '',
                        bio: res.data.bio || '',
                        specialities: res.data.specialities || []
                    });
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSpecialtiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            specialities: value.split(',').map(s => s.trim()).filter(Boolean)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        try {
            const res = await api.provider.updateProfile(formData);
            if (res.error) throw new Error(res.error);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to update profile.' });
        } finally {
            setIsSaving(false);
        }
    };

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

                            {message && (
                                <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                    }`}>
                                    {message.text}
                                </div>
                            )}

                            {isLoading ? (
                                <div className="flex justify-center py-12">
                                    <Loader2 className="animate-spin text-primary" size={32} />
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="full_name">Full Name</Label>
                                            <Input
                                                id="full_name"
                                                name="full_name"
                                                value={formData.full_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder="e.g. Licensed Clinical Psychologist"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            className="w-full min-h-[150px] p-3 rounded-xl border border-border bg-surface-hover focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            placeholder="Tell patients about your experience and approach..."
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="specialities">Specialties (Comma separated)</Label>
                                        <Input
                                            id="specialities"
                                            name="specialities"
                                            value={formData.specialities.join(', ')}
                                            onChange={handleSpecialtiesChange}
                                            placeholder="Anxiety, Depression, Trauma, ADHD"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => window.location.reload()}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={isSaving}>
                                            {isSaving ? (
                                                <>
                                                    <Loader2 className="animate-spin mr-2" size={16} />
                                                    Saving...
                                                </>
                                            ) : 'Save Changes'}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderProfileEditor;
