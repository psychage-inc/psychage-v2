import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    type ColumnDef,
    type SortingState,
} from '@tanstack/react-table';
import { Card } from '@/components/ui/Card';
import Pagination from '@/components/ui/Pagination';
import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminDataTableProps<TData> {
    columns: ColumnDef<TData, unknown>[];
    data: TData[];
    pageSize?: number;
    isLoading?: boolean;
    loadingRows?: number;
    emptyState?: React.ReactNode;
    globalFilter?: string;
}

function AdminDataTable<TData>({
    columns,
    data,
    pageSize = 20,
    isLoading = false,
    loadingRows = 5,
    emptyState,
    globalFilter,
}: AdminDataTableProps<TData>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageSize },
        },
    });

    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1;

    return (
        <div className="space-y-4">
            <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-surface-hover">
                            <tr>
                                {table.getHeaderGroups().map((headerGroup) =>
                                    headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className={cn(
                                                'px-6 py-4 font-bold text-text-secondary text-sm uppercase tracking-wider',
                                                header.column.getCanSort() && 'cursor-pointer select-none hover:text-text-primary transition-colors'
                                            )}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            <div className="flex items-center gap-1.5">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getCanSort() && (
                                                    <ArrowUpDown size={14} className="text-text-tertiary" />
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
                                    <tr key={`skeleton-${i}`}>
                                        {columns.map((_, colIndex) => (
                                            <td key={colIndex} className="px-6 py-4">
                                                <div className="h-4 bg-surface-hover rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="hover:bg-surface-hover transition-colors"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-6 py-4">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-12">
                                        {emptyState}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {totalPages > 1 && !isLoading && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => table.setPageIndex(page - 1)}
                />
            )}
        </div>
    );
}

export default AdminDataTable;
