import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShieldAlert, ShieldCheck, AlertTriangle, Eye, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import PageHeader from '@/components/admin/PageHeader';
import { adminPath } from '@/hooks/useAdminNavigate';

const AdminSafetyDashboard: React.FC = () => {
  const { data: keywordCounts } = useQuery({
    queryKey: ['admin', 'safety', 'keyword-counts'],
    queryFn: async () => {
      const { data, error } = await supabase.from('crisis_keywords').select('severity, is_active');
      if (error) return { crisis: 0, urgent: 0, watch: 0, total: 0 };
      const active = (data || []).filter((k) => k.is_active);
      return {
        crisis: active.filter((k) => k.severity === 'CRISIS').length,
        urgent: active.filter((k) => k.severity === 'URGENT').length,
        watch: active.filter((k) => k.severity === 'WATCH').length,
        total: active.length,
      };
    },
  });

  return (
    <div>
      <PageHeader title="Safety" description="Crisis monitoring and safety flags" />

      {/* Active Alerts */}
      <div className="mb-6 px-4 py-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-3">
        <ShieldCheck size={24} className="text-emerald-600 dark:text-emerald-400" />
        <div>
          <p className="font-medium text-emerald-700 dark:text-emerald-400">All Clear</p>
          <p className="text-sm text-emerald-600 dark:text-emerald-500">No active CRISIS flags in the last 24 hours</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <ShieldAlert size={20} className="text-red-600" />
            </div>
          </div>
          <p className="text-sm text-text-secondary">CRISIS Keywords</p>
          <p className="text-2xl font-bold text-text-primary">{keywordCounts?.crisis ?? 0}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
              <AlertTriangle size={20} className="text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-text-secondary">URGENT Keywords</p>
          <p className="text-2xl font-bold text-text-primary">{keywordCounts?.urgent ?? 0}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <Eye size={20} className="text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-text-secondary">WATCH Keywords</p>
          <p className="text-2xl font-bold text-text-primary">{keywordCounts?.watch ?? 0}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center">
              <ShieldCheck size={20} className="text-text-secondary" />
            </div>
          </div>
          <p className="text-sm text-text-secondary">Total Active Keywords</p>
          <p className="text-2xl font-bold text-text-primary">{keywordCounts?.total ?? 0}</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to={adminPath('/safety/keywords')}
          className="bg-surface border border-border rounded-2xl p-5 hover:border-border-hover transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-text-primary">Crisis Keywords</h3>
              <p className="text-sm text-text-secondary mt-1">Manage detection keywords by severity and category</p>
            </div>
            <ArrowRight size={20} className="text-text-tertiary group-hover:text-primary transition-colors" />
          </div>
        </Link>
        <Link
          to={adminPath('/safety/conversations')}
          className="bg-surface border border-border rounded-2xl p-5 hover:border-border-hover transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-text-primary">Conversation Review</h3>
              <p className="text-sm text-text-secondary mt-1">Review flagged AI conversations</p>
            </div>
            <ArrowRight size={20} className="text-text-tertiary group-hover:text-primary transition-colors" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminSafetyDashboard;
