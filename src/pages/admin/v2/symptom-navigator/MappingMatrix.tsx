import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Grid3X3, List, Star, AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import { CONFIDENCE_CAP } from '@/lib/admin/constants';
import type { SymptomRecord, ConditionRecord, MappingRecord } from '@/lib/admin/types';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import { type ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';

type ViewMode = 'matrix' | 'list';

// ============================================================
// Matrix Cell Popover
// ============================================================

interface CellPopoverProps {
  conditionId: string;
  symptomId: string;
  mapping: MappingRecord | undefined;
  onClose: () => void;
}

const CellPopover: React.FC<CellPopoverProps> = ({ conditionId, symptomId, mapping, onClose }) => {
  const queryClient = useQueryClient();
  const [weight, setWeight] = useState(mapping?.weight || 0);
  const [isCore, setIsCore] = useState(mapping?.is_core || false);
  const [isRedFlag, setIsRedFlag] = useState(mapping?.is_red_flag || false);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (weight === 0 && mapping) {
        // Remove mapping
        const { error } = await supabase.from('symptom_condition_mappings').delete().eq('id', mapping.id);
        if (error) throw error;
        await logAdminAction({ action: 'delete', resourceType: 'mapping', resourceId: `${conditionId}:${symptomId}` });
      } else if (weight > 0 && mapping) {
        // Update
        const { error } = await supabase.from('symptom_condition_mappings').update({
          weight, is_core: isCore, is_red_flag: isRedFlag, updated_at: new Date().toISOString(),
        }).eq('id', mapping.id);
        if (error) throw error;
        await logAdminAction({ action: 'update', resourceType: 'mapping', resourceId: `${conditionId}:${symptomId}` });
      } else if (weight > 0) {
        // Create
        const { error } = await supabase.from('symptom_condition_mappings').insert({
          condition_id: conditionId, symptom_id: symptomId, weight, is_core: isCore, is_red_flag: isRedFlag,
        });
        if (error) throw error;
        await logAdminAction({ action: 'create', resourceType: 'mapping', resourceId: `${conditionId}:${symptomId}` });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'mappings'] });
      onClose();
    },
  });

  return (
    <div className="absolute z-50 bg-surface border border-border rounded-lg shadow-xl p-4 w-64" onClick={(e) => e.stopPropagation()}>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Weight</label>
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((w) => (
              <button
                key={w}
                onClick={() => setWeight(w as 0 | 1 | 2 | 3)}
                className={cn(
                  'flex-1 py-1.5 text-sm font-medium rounded transition-colors',
                  weight === w
                    ? w === 0 ? 'bg-surface-active text-text-secondary' : 'bg-primary text-white'
                    : 'bg-surface-hover text-text-secondary hover:bg-surface-active'
                )}
              >
                {w === 0 ? 'None' : w}
              </button>
            ))}
          </div>
        </div>
        {weight > 0 && (
          <>
            <label className="flex items-center gap-2 text-sm text-text-secondary">
              <input type="checkbox" checked={isCore} onChange={(e) => setIsCore(e.target.checked)} className="rounded border-border-hover text-primary" />
              Core symptom
            </label>
            <label className="flex items-center gap-2 text-sm text-text-secondary">
              <input type="checkbox" checked={isRedFlag} onChange={(e) => setIsRedFlag(e.target.checked)} className="rounded border-border-hover text-red-600" />
              Red flag
            </label>
          </>
        )}
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-1.5 text-sm bg-surface-hover text-text-secondary rounded hover:bg-surface-active">Cancel</button>
          <button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="flex-1 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary-hover disabled:opacity-50"
          >
            {saveMutation.isPending ? '...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// Main Component
// ============================================================

const AdminMappingMatrix: React.FC = () => {
  const [view, setView] = useState<ViewMode>('list');
  const [activeCell, setActiveCell] = useState<{ conditionId: string; symptomId: string } | null>(null);

  const { data: symptoms } = useQuery({
    queryKey: ['admin', 'symptoms'],
    queryFn: async () => {
      const { data, error } = await supabase.from('symptoms').select('*').eq('is_active', true).order('domain').order('symptom_id');
      if (error) throw error;
      return (data || []) as SymptomRecord[];
    },
  });

  const { data: conditions } = useQuery({
    queryKey: ['admin', 'conditions'],
    queryFn: async () => {
      const { data, error } = await supabase.from('conditions').select('*').eq('is_active', true).order('category').order('condition_id');
      if (error) throw error;
      return (data || []) as ConditionRecord[];
    },
  });

  const { data: mappings, isLoading } = useQuery({
    queryKey: ['admin', 'mappings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('symptom_condition_mappings').select('*');
      if (error) throw error;
      return (data || []) as MappingRecord[];
    },
  });

  const mappingMap = useMemo(() => {
    const map = new Map<string, MappingRecord>();
    (mappings || []).forEach((m) => map.set(`${m.condition_id}:${m.symptom_id}`, m));
    return map;
  }, [mappings]);

  const stats = useMemo(() => ({
    mappings: mappings?.length || 0,
    conditions: conditions?.length || 0,
    symptoms: symptoms?.length || 0,
  }), [mappings, conditions, symptoms]);

  // List view columns
  const listColumns: ColumnDef<MappingRecord, unknown>[] = [
    { accessorKey: 'condition_id', header: 'Condition' },
    { accessorKey: 'symptom_id', header: 'Symptom' },
    {
      accessorKey: 'weight',
      header: 'Weight',
      cell: ({ row }) => (
        <span className={cn(
          'inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold text-white',
          row.original.weight === 1 && 'bg-teal-300',
          row.original.weight === 2 && 'bg-teal-500',
          row.original.weight === 3 && 'bg-teal-700',
        )}>
          {row.original.weight}
        </span>
      ),
    },
    {
      accessorKey: 'is_core',
      header: 'Core',
      cell: ({ row }) => row.original.is_core ? <Star size={14} className="text-amber-500 fill-amber-500" /> : null,
    },
    {
      accessorKey: 'is_red_flag',
      header: 'Red Flag',
      cell: ({ row }) => row.original.is_red_flag ? <AlertTriangle size={14} className="text-red-500" /> : null,
    },
    { accessorKey: 'evidence_reference', header: 'Evidence' },
  ];

  return (
    <div>
      <PageHeader
        title="Mapping Matrix"
        description={`${stats.mappings} mappings across ${stats.conditions} conditions and ${stats.symptoms} symptoms`}
      />

      {/* View toggle */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex gap-1 bg-surface-hover rounded-lg p-1">
          <button
            onClick={() => setView('matrix')}
            className={cn('flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors', view === 'matrix' ? 'bg-surface shadow text-text-primary' : 'text-text-secondary')}
          >
            <Grid3X3 size={14} /> Matrix
          </button>
          <button
            onClick={() => setView('list')}
            className={cn('flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors', view === 'list' ? 'bg-surface shadow text-text-primary' : 'text-text-secondary')}
          >
            <List size={14} /> List
          </button>
        </div>

        {/* Confidence cap reminder */}
        <div className="text-xs text-blue-600 dark:text-blue-400">
          Max confidence cap: {CONFIDENCE_CAP * 100}%
        </div>
      </div>

      {view === 'list' ? (
        <DataTable
          columns={listColumns}
          data={mappings || []}
          isLoading={isLoading}
          emptyMessage="No mappings configured."
          searchPlaceholder="Search mappings..."
          totalCount={mappings?.length}
        />
      ) : (
        /* Matrix View */
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="overflow-auto max-h-[70vh]">
            <table className="text-xs">
              <thead>
                <tr>
                  <th className="sticky left-0 top-0 z-20 bg-surface-hover px-3 py-2 border-b border-r border-border min-w-[160px]">
                    Condition / Symptom
                  </th>
                  {(symptoms || []).map((s) => (
                    <th key={s.symptom_id} className="sticky top-0 z-10 bg-surface-hover px-1 py-2 border-b border-border text-center font-normal">
                      <span className="writing-mode-vertical block -rotate-45 origin-left translate-x-3 translate-y-1 whitespace-nowrap text-text-secondary max-w-[80px] truncate">
                        {s.symptom_id}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(conditions || []).map((c) => (
                  <tr key={c.condition_id}>
                    <td className="sticky left-0 z-10 bg-surface px-3 py-1.5 border-r border-b border-border font-medium text-text-secondary whitespace-nowrap">
                      {c.name?.en || c.condition_id}
                    </td>
                    {(symptoms || []).map((s) => {
                      const key = `${c.condition_id}:${s.symptom_id}`;
                      const mapping = mappingMap.get(key);
                      const isOpen = activeCell?.conditionId === c.condition_id && activeCell?.symptomId === s.symptom_id;

                      return (
                        <td
                          key={key}
                          className="relative border-b border-border p-0"
                        >
                          <button
                            onClick={() => setActiveCell(isOpen ? null : { conditionId: c.condition_id, symptomId: s.symptom_id })}
                            className={cn(
                              'w-full h-7 flex items-center justify-center transition-colors',
                              !mapping && 'hover:bg-surface-hover',
                              mapping?.weight === 1 && 'bg-teal-100 dark:bg-teal-900/30',
                              mapping?.weight === 2 && 'bg-teal-300 dark:bg-teal-800/50',
                              mapping?.weight === 3 && 'bg-teal-600 text-white dark:bg-teal-700',
                            )}
                          >
                            {mapping?.is_core && <Star size={8} className="text-amber-500 fill-amber-500" />}
                            {mapping?.is_red_flag && <AlertTriangle size={8} className="text-red-500" />}
                          </button>
                          {isOpen && (
                            <CellPopover
                              conditionId={c.condition_id}
                              symptomId={s.symptom_id}
                              mapping={mapping}
                              onClose={() => setActiveCell(null)}
                            />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 px-4 py-3 border-t border-border text-xs text-text-secondary">
            <span>Weight:</span>
            <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-teal-100" /> 1</span>
            <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-teal-300" /> 2</span>
            <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-teal-600" /> 3</span>
            <span className="flex items-center gap-1"><Star size={10} className="text-amber-500 fill-amber-500" /> Core</span>
            <span className="flex items-center gap-1"><AlertTriangle size={10} className="text-red-500" /> Red Flag</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMappingMatrix;
