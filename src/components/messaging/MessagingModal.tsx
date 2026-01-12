import React, { useState } from 'react';
import { Send, Paperclip, AlertCircle } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Provider } from '@/types/models';
import { useAuth } from '@/context/AuthContext';

interface MessagingModalProps {
    isOpen: boolean;
    onClose: () => void;
    provider: Provider;
    onSend: (message: MessageDetails) => void;
}

export interface MessageDetails {
    providerId: string | number;
    providerName: string;
    subject: string;
    message: string;
    urgent: boolean;
}

const subjectOptions = [
    'General Inquiry',
    'Appointment Question',
    'Treatment Question',
    'Insurance/Billing',
    'Prescription Refill',
    'Follow-up Question',
    'Other'
];

const MessagingModal: React.FC<MessagingModalProps> = ({ isOpen, onClose, provider, onSend }) => {
    const { user } = useAuth();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [urgent, setUrgent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!user) {
            setError('You must be logged in to send messages');
            return;
        }

        if (!subject.trim()) {
            setError('Please select a subject');
            return;
        }

        if (!message.trim()) {
            setError('Please enter a message');
            return;
        }

        if (message.trim().length < 10) {
            setError('Message must be at least 10 characters');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const messageDetails: MessageDetails = {
            providerId: provider.id,
            providerName: provider.name,
            subject,
            message: message.trim(),
            urgent
        };

        onSend(messageDetails);
        setIsSubmitting(false);

        // Reset form
        setSubject('');
        setMessage('');
        setUrgent(false);
    };

    const handleClose = () => {
        setSubject('');
        setMessage('');
        setUrgent(false);
        setError(null);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={`Message ${provider.name}`} maxWidth="lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Provider Info */}
                <div className="flex items-center gap-4 p-4 bg-surface-hover rounded-xl">
                    <img
                        src={provider.image}
                        alt={provider.name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-bold text-text-primary">{provider.name}</div>
                        <div className="text-sm text-text-secondary">{provider.role}</div>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {/* Not Logged In Warning */}
                {!user && (
                    <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm">
                        <AlertCircle size={18} />
                        Please log in to send messages to providers.
                    </div>
                )}

                {/* Subject */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary">Subject</label>
                    <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 outline-none appearance-none cursor-pointer"
                        required
                    >
                        <option value="">Select a subject...</option>
                        {subjectOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary">Your Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        className="w-full px-4 py-3 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                        rows={5}
                        required
                        minLength={10}
                    />
                    <div className="flex justify-between text-xs text-text-tertiary">
                        <span>{message.length} characters</span>
                        <span>Minimum 10 characters</span>
                    </div>
                </div>

                {/* Urgent Flag */}
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={urgent}
                        onChange={(e) => setUrgent(e.target.checked)}
                        className="w-5 h-5 rounded border-border text-primary focus:ring-primary/20"
                    />
                    <div>
                        <span className="font-medium text-text-primary">Mark as urgent</span>
                        <p className="text-xs text-text-secondary">
                            For time-sensitive medical questions only
                        </p>
                    </div>
                </label>

                {/* Response Time Notice */}
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <p className="text-sm text-blue-800">
                        <strong>Expected Response:</strong> {provider.name.split(' ')[1]} typically responds within 24-48 hours during business days.
                        For emergencies, please call 911 or go to your nearest emergency room.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-2">
                    <button
                        type="button"
                        className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <Paperclip size={18} />
                        Attach File
                    </button>
                    <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting || !user}>
                            {isSubmitting ? (
                                'Sending...'
                            ) : (
                                <>
                                    <Send size={16} className="mr-2" />
                                    Send Message
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default MessagingModal;
