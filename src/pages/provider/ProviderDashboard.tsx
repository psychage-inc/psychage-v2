import React from 'react';
import { Users, Calendar, Clock } from 'lucide-react';
import ProviderSidebar from './ProviderSidebar';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';

const ProviderDashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Provider Dashboard | Psychage" />

            <div className="container mx-auto max-w-[1200px]">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8">Provider Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <ProviderSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Active Patients', value: '24', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                                { label: 'Appointments Today', value: '5', icon: Calendar, color: 'text-teal-600', bg: 'bg-teal-50' },
                                { label: 'Pending Requests', value: '3', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
                            ].map((stat, idx) => (
                                <Card key={idx} className="p-6 flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
                                        <p className="text-sm text-text-secondary">{stat.label}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <Card className="p-6">
                            <h2 className="text-xl font-bold text-text-primary mb-6">Recent Activity</h2>
                            <div className="space-y-4">
                                {[
                                    { title: 'New Appointment Request', desc: 'Sarah Johnson requested a consultation.', time: '2 hours ago', type: 'request' },
                                    { title: 'Patient Update', desc: 'Michael Chen updated their mood journal.', time: '4 hours ago', type: 'update' },
                                    { title: 'Appointment Completed', desc: 'Session with Emily Davis.', time: 'Yesterday', type: 'success' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-surface-hover transition-colors border border-border/50">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-text-primary text-sm">{item.title}</h3>
                                            <p className="text-sm text-text-secondary">{item.desc}</p>
                                        </div>
                                        <span className="text-xs text-text-tertiary whitespace-nowrap">{item.time}</span>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="w-full mt-4">View All Activity</Button>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
