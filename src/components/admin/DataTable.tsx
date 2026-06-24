import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  type OnChangeFn,
} from '@tanstack/react-table';
import { ArrowUpDown, Search, ChevronLeft, ChevronRight, AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Normalize an unknown thrown value into a human-readable, PostgREST-aware message. */
export function formatQueryError(error: unknown): string {
  if (!error) return 'Unknown error';
  if (typeof error === 'string') return error;
  const e = error as { message?: string; details?: string; hint?: string; code?: string };
  const parts = [e.message || String(error)];
  if (e.code) parts.push(`code ${e.code}`);
  if (e.details) parts.push(e.details);
  if (e.hint) parts.push(`hint: ${e.hint}`);
  return parts.filter(Boolean).join(' · ');
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  pageSize?: number;
  isLoading?: boolean;
  loadingRows?: number;
  emptyMessage?: string;
  /**
   * Real failure of the underlying query. When set (and not loading), the table
   * shows the actual error instead of a misleading empty state, so a failed read
   * is never mistaken for "0 results". Pass the `error` from react-query/useQuery.
   */
  error?: unknown;
  /** Optional retry handler shown alongside the error (e.g. refetch). */
  onRetry?: () => void;
  searchPlaceholder?: string;
  enableSearch?: boolean;
  enableRowSelection?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  getRowId?: (originalRow: TData, index: number) => string;
  bulkActions?: React.ReactNode;
  totalCount?: number;
  serverPagination?: {
    pageIndex: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    totalPages: number;
  };
}

function DataTable<TData>({
  columns,
  data,
  pageSize = 25,
  isLoading = false,
  loadingRows = 5,
  emptyMessage = 'No results found.',
  searchPlaceholder = 'Search...',
  enableSearch = true,
  enableRowSelection = false,
  rowSelection,
  onRowSelectionChange,
  getRowId,
  bulkActions,
  totalCount,
  serverPagination,
  error,
  onRetry,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [internalRowSelection, setInternalRowSelection] = useState<RowSelectionState>({});

  const effectiveRowSelection = rowSelection ?? internalRowSelection;
  const effectiveOnRowSelectionChange = onRowSelectionChange ?? setInternalRowSelection;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection: effectiveRowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: enableRowSelection ? effectiveOnRowSelectionChange : undefined,
    enableRowSelection,
    ...(getRowId ? { getRowId } : {}),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(serverPagination ? {} : { getPaginationRowModel: getPaginationRowModel() }),
    initialState: {
      pagination: { pageSize },
    },
  });

  const selectedCount = Object.keys(effectiveRowSelection).length;
  const totalPages = serverPagination?.totalPages ?? table.getPageCount();
  const currentPage = serverPagination
    ? serverPagination.pageIndex + 1
    : table.getState().pagination.pageIndex + 1;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        {enableSearch && (
          <div className="relative max-w-sm flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-surface text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        )}
        {totalCount !== undefined && !error && (
          <span className="text-sm text-text-secondary flex-shrink-0">
            {totalCount.toLocaleString()} total
          </span>
        )}
      </div>

      {/* Bulk actions bar */}
      {selectedCount > 0 && bulkActions && (
        <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium text-primary">
            {selectedCount} selected
          </span>
          {bulkActions}
        </div>
      )}

      {/* Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-surface-hover border-b border-border">
              <tr>
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        'px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary',
                        header.column.getCanSort() && 'cursor-pointer select-none hover:text-text-primary'
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1.5">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <ArrowUpDown size={12} className="text-text-tertiary" />
                        )}
                      </div>
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                Array.from({ length: loadingRows }).map((_, i) => (
                  <tr key={i}>
                    {columns.map((_, ci) => (
                      <td key={ci} className="px-4 py-3">
                        <div className="h-4 bg-surface-hover rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-10">
                    <div className="mx-auto max-w-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-5 py-4 rounded-xl flex items-start gap-3">
                      <AlertTriangle size={20} className="shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold">Couldn’t load data</p>
                        <p className="text-xs font-mono break-words mt-1 text-red-600 dark:text-red-300">
                          {formatQueryError(error)}
                        </p>
                      </div>
                      {onRetry && (
                        <button
                          onClick={onRetry}
                          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <RefreshCw size={13} /> Retry
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-text-secondary">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      'hover:bg-surface-hover transition-colors',
                      row.getIsSelected() && 'bg-primary/5'
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm text-text-secondary">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <span className="text-sm text-text-secondary">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() =>
                  serverPagination
                    ? serverPagination.onPageChange(serverPagination.pageIndex - 1)
                    : table.previousPage()
                }
                disabled={serverPagination ? serverPagination.pageIndex === 0 : !table.getCanPreviousPage()}
                aria-label="Previous page"
                className="h-11 w-11 flex items-center justify-center text-text-tertiary hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() =>
                  serverPagination
                    ? serverPagination.onPageChange(serverPagination.pageIndex + 1)
                    : table.nextPage()
                }
                disabled={serverPagination ? currentPage >= totalPages : !table.getCanNextPage()}
                aria-label="Next page"
                className="h-11 w-11 flex items-center justify-center text-text-tertiary hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataTable;
