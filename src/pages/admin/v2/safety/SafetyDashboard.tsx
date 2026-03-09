import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShieldAlert, ShieldCheck, AlertTriangle, Eye, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import PageHeader from '@/components/admin/PageHeader';

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
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <ShieldAlert size={20} className="text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">CRISIS Keywords</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{keywordCounts?.crisis ?? 0}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
              <AlertTriangle size={20} className="text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">URGENT Keywords</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{keywordCounts?.urgent ?? 0}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <Eye size={20} className="text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">WATCH Keywords</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{keywordCounts?.watch ?? 0}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-slate-800 flex items-center justify-center">
              <ShieldCheck size={20} className="text-gray-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Total Active Keywords</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{keywordCounts?.total ?? 0}</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/admin/safety/keywords"
          className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-5 hover:border-teal-300 dark:hover:border-teal-700 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Crisis Keywords</h3>
              <p className="text-sm text-gray-500 mt-1">Manage detection keywords by severity and category</p>
            </div>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-teal-600 transition-colors" />
          </div>
        </Link>
        <Link
          to="/admin/safety/conversations"
          className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-5 hover:border-teal-300 dark:hover:border-teal-700 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Conversation Review</h3>
              <p className="text-sm text-gray-500 mt-1">Review flagged AI conversations</p>
            </div>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-teal-600 transition-colors" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminSafetyDashboard;
