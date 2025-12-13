import React from 'react';
import { Card } from '@/components/ui/Card';
import { Users, FileText, AlertTriangle, Activity } from 'lucide-react';
import SEO from '@/components/SEO';

const AdminDashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Admin Dashboard | Psychage" />
            <div className="container mx-auto max-w-[1400px]">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8">System Administration</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total Users', value: '12,340', icon: Users, color: 'text-blue-600' },
                        { label: 'Pending Providers', value: '14', icon: FileText, color: 'text-amber-600' },
                        { label: 'System Alerts', value: '3', icon: AlertTriangle, color: 'text-red-600' },
                        { label: 'Active Sessions', value: '450', icon: Activity, color: 'text-green-600' },
                    ].map((stat, i) => (
                        <Card key={i} className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-text-secondary">{stat.label}</span>
                                <stat.icon className={stat.color} size={20} />
                            </div>
                            <div className="text-3xl font-bold text-text-primary">{stat.value}</div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-text-primary mb-4">Recent Activity</h2>
                        <ul className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <li key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                    <span className="text-text-secondary">New user registration</span>
                                    <span className="text-xs text-text-tertiary">2 mins ago</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-text-primary mb-4">Pending Approvals</h2>
                        <p className="text-text-secondary">No pending approvals requiring immediate action.</p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
