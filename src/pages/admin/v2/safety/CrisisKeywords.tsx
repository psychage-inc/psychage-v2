import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus, Pencil, X, Search } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import { SEVERITY_LEVELS, CRISIS_CATEGORIES, SUPPORTED_LANGUAGES } from '@/lib/admin/constants';
import type { CrisisKeyword, CrisisSeverity, CrisisCategory } from '@/lib/admin/types';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import { cn } from '@/lib/utils';

const AdminCrisisKeywords: React.FC = () => {
  const queryClient = useQueryClient();
  const [drawer, setDrawer] = useState<{ open: boolean; editing: CrisisKeyword | null }>({ open: false, editing: null });
  const [testInput, setTestInput] = useState('');
  const [testResults, setTestResults] = useState<CrisisKeyword[]>([]);

  // Form state
  const [keyword, setKeyword] = useState('');
  const [language, setLanguage] = useState('en');
  const [severity, setSeverity] = useState<CrisisSeverity>('WATCH');
  const [category, setCategory] = useState<CrisisCategory>('suicidal_ideation');
  const [isActive, setIsActive] = useState(true);

  const { data: keywords, isLoading } = useQuery({
    queryKey: ['admin', 'crisis-keywords'],
    queryFn: async () => {
      const { data, error } = await supabase.from('crisis_keywords').select('*').order('severity').order('keyword');
      if (error) throw error;
      return (data || []) as CrisisKeyword[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { keyword, language, severity, category, is_active: isActive, updated_at: new Date().toISOString() };
      if (drawer.editing) {
        const { error } = await supabase.from('crisis_keywords').update(payload).eq('id', drawer.editing.id);
        if (error) throw error;
        await logAdminAction({ action: 'update', resourceType: 'crisis_keyword', resourceId: drawer.editing.id });
      } else {
        const { error } = await supabase.from('crisis_keywords').insert(payload);
        if (error) throw error;
        await logAdminAction({ action: 'create', resourceType: 'crisis_keyword', newValue: { keyword, severity } });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'crisis-keywords'] });
      closeDrawer();
    },
  });

  const toggleActive = useMutation({
    mutationFn: async (kw: CrisisKeyword) => {
      const { error } = await supabase.from('crisis_keywords').update({ is_active: !kw.is_active }).eq('id', kw.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'crisis-keywords'] }),
  });

  const openDrawer = (editing?: CrisisKeyword) => {
    if (editing) {
      setKeyword(editing.keyword);
      setLanguage(editing.language);
      setSeverity(editing.severity);
      setCategory(editing.category);
      setIsActive(editing.is_active);
    } else {
      setKeyword('');
      setLanguage('en');
      setSeverity('WATCH');
      setCategory('suicidal_ideation');
      setIsActive(true);
    }
    setDrawer({ open: true, editing: editing || null });
  };

  const closeDrawer = () => setDrawer({ open: false, editing: null });

  const runTestDetection = () => {
    if (!testInput.trim() || !keywords) {
      setTestResults([]);
      return;
    }
    const lower = testInput.toLowerCase();
    const matches = keywords.filter(
      (kw) => kw.is_active && lower.includes(kw.keyword.toLowerCase())
    );
    setTestResults(matches);
  };

  const columns: ColumnDef<CrisisKeyword, unknown>[] = [
    { accessorKey: 'keyword', header: 'Keyword / Phrase' },
    {
      accessorKey: 'language',
      header: 'Lang',
      cell: ({ row }) => <span className="text-xs uppercase text-gray-500">{row.original.language}</span>,
    },
    {
      accessorKey: 'severity',
      header: 'Severity',
      cell: ({ row }) => <AdminStatusBadge status={row.original.severity} />,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        const cat = CRISIS_CATEGORIES.find((c) => c.value === row.original.category);
        return <span className="text-sm text-gray-600">{cat?.label || row.original.category}</span>;
      },
    },
    {
      accessorKey: 'is_active',
      header: 'Active',
      cell: ({ row }) => (
        <button
          onClick={() => toggleActive.mutate(row.original)}
          className={cn('w-8 h-5 rounded-full transition-colors relative', row.original.is_active ? 'bg-emerald-500' : 'bg-gray-300')}
        >
          <div className={cn('absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all', row.original.is_active ? 'left-3.5' : 'left-0.5')} />
        </button>
      ),
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      cell: ({ row }) => (
        <button onClick={() => openDrawer(row.original)} className="p-1.5 text-gray-400 hover:text-teal-600" title="Edit">
          <Pencil size={15} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Crisis Keywords"
        description="Manage crisis detection keywords by severity and category"
        actions={
          <button onClick={() => openDrawer()} className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus size={16} /> Add Keyword
          </button>
        }
      />

      <DataTable
        columns={columns}
        data={keywords || []}
        isLoading={isLoading}
        emptyMessage="No crisis keywords configured."
        searchPlaceholder="Search keywords..."
        totalCount={keywords?.length}
      />

      {/* Test Detection Panel */}
      <div className="mt-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Test Detection</h3>
        <p className="text-xs text-gray-500 mb-3">Type a sample message to test which keywords would trigger. No safety action is taken.</p>
        <div className="flex gap-2 mb-4">
          <input
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Type a sample message..."
            className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={runTestDetection}
            className="px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700"
          >
            <Search size={16} />
          </button>
        </div>
        {testResults.length > 0 ? (
          <div className="space-y-2">
            {testResults.map((r) => (
              <div key={r.id} className="flex items-center gap-3 text-sm px-3 py-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AdminStatusBadge status={r.severity} />
                <span className="font-medium">{r.keyword}</span>
                <span className="text-gray-500">({CRISIS_CATEGORIES.find((c) => c.value === r.category)?.label})</span>
              </div>
            ))}
          </div>
        ) : testInput.trim() ? (
          <p className="text-sm text-emerald-600">No keywords matched.</p>
        ) : null}
      </div>

      {/* Add/Edit Drawer */}
      {drawer.open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={closeDrawer} />
          <div className="relative ml-auto w-full max-w-md bg-white dark:bg-slate-900 h-full overflow-y-auto shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">{drawer.editing ? 'Edit Keyword' : 'Add Keyword'}</h2>
              <button onClick={closeDrawer} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Keyword / Phrase</label>
                <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500">
                  {SUPPORTED_LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Severity</label>
                <select value={severity} onChange={(e) => setSeverity(e.target.value as CrisisSeverity)} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500">
                  {SEVERITY_LEVELS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value as CrisisCategory)} className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500">
                  {CRISIS_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded border-gray-300 text-teal-600" />
                Active
              </label>
              <button
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending || !keyword.trim()}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg disabled:opacity-50"
              >
                {saveMutation.isPending ? 'Saving...' : drawer.editing ? 'Save Changes' : 'Add Keyword'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCrisisKeywords;
