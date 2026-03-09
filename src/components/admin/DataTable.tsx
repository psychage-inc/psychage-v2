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
import { ArrowUpDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  pageSize?: number;
  isLoading?: boolean;
  loadingRows?: number;
  emptyMessage?: string;
  searchPlaceholder?: string;
  enableSearch?: boolean;
  enableRowSelection?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
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
  bulkActions,
  totalCount,
  serverPagination,
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
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        )}
        {totalCount !== undefined && (
          <span className="text-sm text-gray-500 dark:text-slate-400 flex-shrink-0">
            {totalCount.toLocaleString()} total
          </span>
        )}
      </div>

      {/* Bulk actions bar */}
      {selectedCount > 0 && bulkActions && (
        <div className="flex items-center gap-3 px-4 py-2 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg">
          <span className="text-sm font-medium text-teal-700 dark:text-teal-400">
            {selectedCount} selected
          </span>
          {bulkActions}
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700">
              <tr>
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        'px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400',
                        header.column.getCanSort() && 'cursor-pointer select-none hover:text-gray-700 dark:hover:text-slate-200'
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1.5">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <ArrowUpDown size={12} className="text-gray-400" />
                        )}
                      </div>
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {isLoading ? (
                Array.from({ length: loadingRows }).map((_, i) => (
                  <tr key={i}>
                    {columns.map((_, ci) => (
                      <td key={ci} className="px-4 py-3">
                        <div className="h-4 bg-gray-100 dark:bg-slate-800 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-gray-500 dark:text-slate-400">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      'hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors',
                      row.getIsSelected() && 'bg-teal-50/50 dark:bg-teal-900/10'
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm text-gray-700 dark:text-slate-300">
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
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-slate-700">
            <span className="text-sm text-gray-500 dark:text-slate-400">
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
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
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
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
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
