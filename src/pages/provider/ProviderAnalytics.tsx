import React from 'react';
import ProviderSidebar from './ProviderSidebar';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { TrendingUp, Users, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import SEO from '@/components/SEO';

const ProviderAnalytics: React.FC = () => {
    // Mock Analytics Data
    const metrics = [
        { label: 'Profile Views', value: '1,245', change: '+12%', trend: 'up', icon: Eye },
        { label: 'Search Appearances', value: '4,521', change: '+5%', trend: 'up', icon: Users },
        { label: 'Appointment Requests', value: '42', change: '-2%', trend: 'down', icon: CalendarIcon },
        { label: 'Conversion Rate', value: '3.4%', change: '+0.5%', trend: 'up', icon: TrendingUp },
    ];

    // Simple bar chart visualization (CSS-based for now)
    const monthlyViews = [65, 59, 80, 81, 56, 55, 40, 70, 90, 100, 85, 95];
    const maxView = Math.max(...monthlyViews);

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Analytics | Provider Dashboard" />

            <div className="container mx-auto max-w-[1400px]">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-display font-bold text-text-primary">Practice Analytics</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">Last 30 Days</Button>
                        <Button variant="outline" size="sm">Download Report</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-1">
                        <ProviderSidebar />
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {metrics.map((metric, idx) => (
                                <Card key={idx} className="p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="p-2 bg-surface-hover rounded-lg text-text-secondary">
                                            <metric.icon size={18} />
                                        </div>
                                        <div className={`flex items-center text-xs font-bold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                            {metric.trend === 'up' ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
                                            {metric.change}
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-text-primary mb-1">{metric.value}</div>
                                    <div className="text-xs text-text-tertiary">{metric.label}</div>
                                </Card>
                            ))}
                        </div>

                        {/* Charts Area */}
                        <Card className="p-8">
                            <h3 className="text-lg font-bold text-text-primary mb-6">Profile Views (Last 12 Months)</h3>
                            <div className="h-64 flex items-end justify-between gap-2">
                                {monthlyViews.map((val, i) => (
                                    <div key={i} className="w-full flex flex-col justify-end items-center group">
                                        <div
                                            className="w-full bg-primary/20 hover:bg-primary transition-all rounded-t-sm relative group-hover:shadow-lg"
                                            style={{ height: `${(val / maxView) * 100}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-text-primary text-background text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                {val}
                                            </div>
                                        </div>
                                        <div className="text-xs text-text-tertiary mt-2">
                                            {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="p-6">
                                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                    <Users size={18} /> Top Locations
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { loc: 'San Francisco, CA', count: '45%' },
                                        { loc: 'Oakland, CA', count: '20%' },
                                        { loc: 'San Jose, CA', count: '15%' },
                                        { loc: 'Remote / Video', count: '20%' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between text-sm">
                                            <span className="text-text-secondary">{item.loc}</span>
                                            <span className="font-bold text-text-primary">{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                    <Eye size={18} /> Profile Completeness
                                </h3>
                                <div className="flex items-center justify-center my-4">
                                    <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-primary/20">
                                        <div className="text-2xl font-bold text-primary">85%</div>
                                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-primary truncate" strokeDasharray={`${85 * 2.89} 289`} />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-center text-sm text-text-secondary mb-4">Add a video introduction to reach 100%.</p>
                                <Button variant="outline" className="w-full">Improve Profile</Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Icon
const CalendarIcon = ({ size, className }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

export default ProviderAnalytics;
