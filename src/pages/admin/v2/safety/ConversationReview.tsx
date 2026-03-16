import React from 'react';
import { ShieldAlert } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';

const AdminConversationReview: React.FC = () => {
  return (
    <div>
      <PageHeader title="Conversation Review" description="Review flagged AI conversations" />

      {/* Privacy notice */}
      <div className="mb-6 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-3">
        <ShieldAlert size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-700 dark:text-amber-400">
          <p className="font-medium">Privacy Notice</p>
          <p className="mt-1">
            Conversation content shown here is from users who have consented to conversation storage.
            Anonymous conversations are not retained. Never export or share conversation content.
          </p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-12 text-center">
        <ShieldAlert size={48} className="mx-auto text-text-tertiary mb-4" />
        <p className="text-text-secondary font-medium">No flagged conversations</p>
        <p className="text-sm text-text-tertiary mt-1">
          Flagged conversations will appear here when the AI chat safety system detects crisis-level messages.
        </p>
      </div>
    </div>
  );
};

export default AdminConversationReview;
