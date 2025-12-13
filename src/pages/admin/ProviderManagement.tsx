import React from 'react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';
import { Check, X } from 'lucide-react';

const ProviderManagement: React.FC = () => {
    const providers = [
        { id: 1, name: 'Dr. Alice Smith', status: 'Pending', type: 'Psychologist' },
        { id: 2, name: 'John Doe, LCSW', status: 'Approved', type: 'Social Worker' },
    ];

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="Manage Providers | Admin" />
            <div className="container mx-auto max-w-[1400px]">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8">Provider Management</h1>

                <Card className="p-8">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="pb-4 font-bold text-text-secondary">Name</th>
                                <th className="pb-4 font-bold text-text-secondary">Type</th>
                                <th className="pb-4 font-bold text-text-secondary">Status</th>
                                <th className="pb-4 font-bold text-text-secondary text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {providers.map(p => (
                                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surface-hover">
                                    <td className="py-4 font-bold text-text-primary">{p.name}</td>
                                    <td className="py-4 text-text-secondary">{p.type}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${p.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right flex justify-end gap-2">
                                        <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50"><Check size={16} /></Button>
                                        <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50"><X size={16} /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
};

export default ProviderManagement;
