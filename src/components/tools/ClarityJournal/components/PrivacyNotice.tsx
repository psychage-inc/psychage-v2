import React from 'react';
import { Shield, X } from 'lucide-react';
import { PRIVACY_NOTICE } from '../constants';

interface PrivacyNoticeProps {
  dismissed: boolean;
  onDismiss: () => void;
}

const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({ dismissed, onDismiss }) => {
  if (dismissed) return null;

  return (
    <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
      <Shield className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-teal-800 mb-1">Privacy First</p>
        <p className="text-sm text-teal-700">{PRIVACY_NOTICE}</p>
      </div>
      <button
        onClick={onDismiss}
        className="text-teal-500 hover:text-teal-700 p-1 rounded-lg transition-colors"
        aria-label="Dismiss privacy notice"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PrivacyNotice;
