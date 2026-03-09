import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { Plus, Pencil } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import type { ConditionRecord } from '@/lib/admin/types';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import { cn } from '@/lib/utils';

const AdminConditionList: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: conditions, isLoading } = useQuery({
    queryKey: ['admin', 'conditions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('conditions')
        .select('*')
        .order('category')
        .order('condition_id');
      if (error) throw error;
      return (data || []) as ConditionRecord[];
    },
  });

  // Get mapping counts per condition
  const { data: mappingCounts } = useQuery({
    queryKey: ['admin', 'mapping-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('symptom_condition_mappings')
        .select('condition_id, is_core, is_red_flag');
      if (error) throw error;
      const counts = new Map<string, { total: number; core: number; redFlags: number }>();
      (data || []).forEach((m) => {
        const existing = counts.get(m.condition_id) || { total: 0, core: 0, redFlags: 0 };
        existing.total++;
        if (m.is_core) existing.core++;
        if (m.is_red_flag) existing.redFlags++;
        counts.set(m.condition_id, existing);
      });
      return counts;
    },
  });

  const toggleActive = useMutation({
    mutationFn: async (c: ConditionRecord) => {
      const { error } = await supabase
        .from('conditions')
        .update({ is_active: !c.is_active, updated_at: new Date().toISOString() })
        .eq('id', c.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'conditions'] }),
  });

  const columns: ColumnDef<ConditionRecord, unknown>[] = [
    {
      id: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <Link
          to={`/admin/symptom-navigator/conditions/${row.original.id}/edit`}
          className="font-medium text-gray-900 dark:text-white hover:text-teal-600"
        >
          {row.original.name?.en || row.original.condition_id}
        </Link>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => <AdminStatusBadge status={row.original.category} />,
    },
    {
      id: 'mappings',
      header: 'Symptoms',
      cell: ({ row }) => {
        const counts = mappingCounts?.get(row.original.condition_id);
        return <span className="text-sm text-gray-500">{counts?.total || 0}</span>;
      },
    },
    {
      id: 'core',
      header: 'Core',
      cell: ({ row }) => {
        const counts = mappingCounts?.get(row.original.condition_id);
        return <span className="text-sm text-gray-500">{counts?.core || 0}</span>;
      },
    },
    {
      id: 'red_flags',
      header: 'Red Flags',
      cell: ({ row }) => {
        const counts = mappingCounts?.get(row.original.condition_id);
        return counts?.redFlags ? (
          <span className="text-sm text-red-500 font-medium">{counts.redFlags}</span>
        ) : (
          <span className="text-sm text-gray-300">0</span>
        );
      },
    },
    {
      accessorKey: 'is_active',
      header: 'Active',
      cell: ({ row }) => (
        <button
          onClick={() => toggleActive.mutate(row.original)}
          className={cn(
            'w-8 h-5 rounded-full transition-colors relative',
            row.original.is_active ? 'bg-emerald-500' : 'bg-gray-300'
          )}
        >
          <div className={cn(
            'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all',
            row.original.is_active ? 'left-3.5' : 'left-0.5'
          )} />
        </button>
      ),
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/admin/symptom-navigator/conditions/${row.original.id}/edit`)}
          className="p-1.5 text-gray-400 hover:text-teal-600"
          title="Edit"
        >
          <Pencil size={15} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Conditions"
        description={`${conditions?.length || 0} condition profiles`}
        actions={
          <button
            onClick={() => navigate('/admin/symptom-navigator/conditions/new/edit')}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus size={16} /> Add Condition
          </button>
        }
      />

      <DataTable
        columns={columns}
        data={conditions || []}
        isLoading={isLoading}
        emptyMessage="No conditions configured."
        searchPlaceholder="Search conditions..."
        totalCount={conditions?.length}
      />
    </div>
  );
};

export default AdminConditionList;
