
import React, { useEffect, useState, useRef } from 'react';
import ProviderSidebar from './ProviderSidebar';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';
import { Search, MoreVertical, Loader2, AlertCircle, UserPlus, Mail, Calendar, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const ProviderPatients: React.FC = () => {
    interface Patient {
        id: string | number;
        full_name: string;
        avatar_url?: string;
        next_appointment?: string;
        status?: 'active' | 'inactive';
    }

    const [patients, setPatients] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchPatients = async () => {
            setIsLoading(true);
            try {
                const res = await api.provider.getPatients({ search: searchQuery });
                if (res.success && Array.isArray(res.data)) {
                    setPatients(res.data as unknown as Patient[]);
                } else {
                    setPatients([]);
                }
            } catch (error) {
                console.error("Failed to fetch patients", error);
                setPatients([]);
            } finally {
                setIsLoading(false);
            }
        };

        const debounce = setTimeout(() => {
            fetchPatients();
        }, 500);

        return () => clearTimeout(debounce);
    }, [searchQuery]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleViewProfile = (patient: Patient) => {
        // In a real app, this would navigate to patient detail page
        console.log('Viewing patient:', patient.id);
        setActiveMenu(null);
    };

    const handleSendMessage = (patient: Patient) => {
        // In a real app, this would open messaging interface
        console.log('Sending message to:', patient.id);
        setActiveMenu(null);
    };

    const handleScheduleAppointment = (patient: Patient) => {
        // In a real app, this would open scheduling modal
        console.log('Scheduling appointment for:', patient.id);
        setActiveMenu(null);
    };

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
                                <Input
                                    placeholder="Search patients..."
                                    className="pl-10 h-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button onClick={() => setShowAddModal(true)}>
                                <UserPlus size={18} className="mr-2" />
                                Add Patient
                            </Button>
                        </div>

                        {/* Patient List */}
                        <div className="space-y-4">
                            {isLoading ? (
                                <div className="flex justify-center py-12">
                                    <Loader2 className="animate-spin text-primary" size={32} />
                                </div>
                            ) : patients.length > 0 ? (
                                patients.map((patient, idx) => (
                                    <Card key={idx} className="p-4 flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-surface-hover flex items-center justify-center font-bold text-text-secondary group-hover:bg-primary group-hover:text-white transition-colors overflow-hidden">
                                                {patient.avatar_url ? (
                                                    <img src={patient.avatar_url} alt={patient.full_name} className="w-full h-full object-cover" />
                                                ) : (
                                                    (patient.full_name || 'U').charAt(0).toUpperCase()
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-text-primary">{patient.full_name || 'Unknown Patient'}</h3>
                                                <p className="text-sm text-text-secondary">
                                                    {patient.next_appointment ?
                                                        `Next Appointment: ${format(new Date(patient.next_appointment), 'MMM d, p')}` :
                                                        'No upcoming appointments'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-xs font-bold",
                                                patient.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                            )}>
                                                {patient.status || 'Active'}
                                            </span>
                                            <div className="relative" ref={activeMenu === idx ? menuRef : null}>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveMenu(activeMenu === idx ? null : idx);
                                                    }}
                                                >
                                                    <MoreVertical size={18} />
                                                </Button>
                                                {activeMenu === idx && (
                                                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-border py-1 z-50">
                                                        <button
                                                            onClick={() => handleViewProfile(patient)}
                                                            className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface-hover flex items-center gap-2"
                                                        >
                                                            <Search size={16} />
                                                            View Profile
                                                        </button>
                                                        <button
                                                            onClick={() => handleSendMessage(patient)}
                                                            className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface-hover flex items-center gap-2"
                                                        >
                                                            <Mail size={16} />
                                                            Send Message
                                                        </button>
                                                        <button
                                                            onClick={() => handleScheduleAppointment(patient)}
                                                            className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface-hover flex items-center gap-2"
                                                        >
                                                            <Calendar size={16} />
                                                            Schedule Appointment
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center py-12 text-text-secondary flex flex-col items-center">
                                    <AlertCircle className="mb-4 text-surface-active" size={48} />
                                    <p className="text-lg font-medium">No patients found.</p>
                                    <p className="text-sm">Try adjusting your search or add a new patient.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Patient Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary"
                        >
                            <X size={20} />
                        </button>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserPlus className="text-primary" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-2">Add a Patient</h3>
                            <p className="text-text-secondary mb-6">
                                Patients can connect with you through the Psychage platform. Share your profile link or wait for connection requests.
                            </p>
                            <div className="space-y-3">
                                <div className="p-4 bg-surface rounded-lg text-left">
                                    <p className="text-sm font-medium text-text-primary mb-1">Your Profile Link</p>
                                    <div className="flex items-center gap-2">
                                        <code className="text-xs text-text-secondary bg-surface-hover px-2 py-1 rounded flex-1 truncate">
                                            {window.location.origin}/find-care/provider/me
                                        </code>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                navigator.clipboard.writeText(`${window.location.origin}/find-care/provider/me`);
                                            }}
                                        >
                                            Copy
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-xs text-text-tertiary">
                                    When patients find your profile and request a connection, they'll appear in your patient list.
                                </p>
                            </div>
                            <Button className="w-full mt-6" onClick={() => setShowAddModal(false)}>
                                Got it
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ProviderPatients;
