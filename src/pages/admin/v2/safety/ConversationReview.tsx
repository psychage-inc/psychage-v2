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

      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-12 text-center">
        <ShieldAlert size={48} className="mx-auto text-gray-300 dark:text-slate-600 mb-4" />
        <p className="text-gray-500 dark:text-slate-400 font-medium">No flagged conversations</p>
        <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">
          Flagged conversations will appear here when the AI chat safety system detects crisis-level messages.
        </p>
      </div>
    </div>
  );
};

export default AdminConversationReview;
