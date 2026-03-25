 
import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface AdminConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason?: string) => void;
    title: string;
    description: string;
    confirmText?: string;
    confirmColor?: 'green' | 'red' | 'amber';
    isLoading?: boolean;
    showReasonField?: boolean;
    reasonRequired?: boolean;
    reasonPlaceholder?: string;
}

const confirmColorStyles: Record<string, string> = {
    green: 'bg-green-600 hover:bg-green-700 text-white',
    red: 'bg-red-600 hover:bg-red-700 text-white',
    amber: 'bg-amber-600 hover:bg-amber-700 text-white',
};

const AdminConfirmModal: React.FC<AdminConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirm',
    confirmColor = 'green',
    isLoading = false,
    showReasonField = false,
    reasonRequired = false,
    reasonPlaceholder = 'Enter reason...',
}) => {
    const [reason, setReason] = useState('');

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (isOpen) setReason('');
    }, [isOpen]);

    const handleConfirm = () => {
        onConfirm(showReasonField ? reason : undefined);
    };

    const handleClose = () => {
        onClose();
    };

    const isConfirmDisabled = isLoading || (showReasonField && reasonRequired && !reason.trim());

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={title} maxWidth="md">
            <div className="space-y-4">
                <p className="text-text-secondary">{description}</p>

                {showReasonField && (
                    <div>
                        <label className="block text-sm font-bold text-text-primary mb-1.5">
                            Reason {reasonRequired && <span className="text-red-500">*</span>}
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder={reasonPlaceholder}
                            rows={3}
                            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 resize-none"
                        />
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" size="sm" onClick={handleClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleConfirm}
                        isLoading={isLoading}
                        disabled={isConfirmDisabled}
                        className={cn(confirmColorStyles[confirmColor], 'border-none')}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default AdminConfirmModal;
