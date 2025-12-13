import React from 'react';
import ProviderSidebar from './ProviderSidebar';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';
import { Search, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/Input';

const ProviderPatients: React.FC = () => {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="My Patients | Psychage" />

            <div className="container mx-auto max-w-[1200px]">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8">My Patients</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <ProviderSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Filter Bar */}
                        <div className="flex items-center gap-4 bg-surface p-4 rounded-xl border border-border">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                                <Input placeholder="Search patients..." className="pl-10 h-10" />
                            </div>
                            <Button>Add Patient</Button>
                        </div>

                        {/* Patient List */}
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <Card key={item} className="p-4 flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-surface-hover flex items-center justify-center font-bold text-text-secondary group-hover:bg-primary group-hover:text-white transition-colors">
                                            JD
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text-primary">John Doe</h3>
                                            <p className="text-sm text-text-secondary">Next Appointment: Oct {12 + item}, 10:00 AM</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Active</span>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreVertical size={18} />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderPatients;
