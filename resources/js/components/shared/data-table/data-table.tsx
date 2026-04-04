'use client';

import { router } from '@inertiajs/react';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useCallback, useState } from 'react';

import { DataTablePagination } from '@/components/shared/data-table/data-table-pagination';
import type { PaginationMeta } from '@/components/shared/data-table/data-table-pagination';
import { cn } from '@/lib/utils';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination?: PaginationMeta;
    filters?: Record<string, any>;
    meta?: any;
    hidePagination?: boolean;
    partialReloadKeys?: string[];
    bulkActions?: (selectedRows: TData[]) => React.ReactNode;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pagination,
    filters = {},
    meta,
    hidePagination = false,
    partialReloadKeys = [],
    bulkActions,
}: DataTableProps<TData, TValue>) {
    const isSSR = !!pagination;
    const [isLoading, setIsLoading] = useState(false);
    const [rowSelection, setRowSelection] = useState({});

    const navigate = useCallback(
        (params: Record<string, string | number | undefined>) => {
            if (!isSSR) {
                return;
            }

            setIsLoading(true);
            router.get(
                window.location.pathname,
                { ...filters, ...params },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only:
                        partialReloadKeys.length > 0
                            ? partialReloadKeys
                            : undefined,
                    onFinish: () => setIsLoading(false),
                },
            );
        },
        [isSSR, filters, partialReloadKeys],
    );

    const [sorting, setSorting] = useState<SortingState>(() =>
        filters?.sort_by
            ? [{ id: filters.sort_by, desc: filters.sort_dir === 'desc' }]
            : [],
    );

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: isSSR,
        manualSorting: isSSR,
        pageCount: pagination?.last_page ?? 1,
        state: {
            sorting,
            rowSelection,
            pagination: isSSR
                ? {
                      pageIndex: (pagination?.current_page ?? 1) - 1,
                      pageSize: pagination?.per_page ?? 10,
                  }
                : undefined,
        },
        onRowSelectionChange: setRowSelection,
        onSortingChange: (updater) => {
            const next =
                typeof updater === 'function' ? updater(sorting) : updater;
            setSorting(next);

            if (isSSR) {
                navigate({
                    sort_by: next[0]?.id ?? '',
                    sort_dir: next[0]?.desc ? 'desc' : 'asc',
                    page: 1,
                });
            }
        },
        onPaginationChange: () => {},
        meta,
    });

    const selectedRows = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.original);

    return (
        <div className="space-y-4">
            {bulkActions && selectedRows.length > 0 && (
                <div className="flex animate-in items-center justify-between rounded-lg border bg-muted/50 p-2 px-4 transition-all fade-in slide-in-from-top-2">
                    <span className="text-sm font-medium text-muted-foreground">
                        {selectedRows.length} item(s) selected
                    </span>
                    <div className="flex items-center gap-2">
                        {bulkActions(selectedRows)}
                    </div>
                </div>
            )}

            <div
                className={cn(
                    'overflow-hidden rounded-md border transition-opacity duration-200',
                    isLoading && 'opacity-50',
                )}
            >
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                    className="transition-colors hover:bg-muted/50"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {isSSR && !hidePagination && pagination && (
                <DataTablePagination
                    pagination={pagination}
                    onPageChange={(page) => navigate({ page })}
                    onPageSizeChange={(size) =>
                        navigate({ per_page: size, page: 1 })
                    }
                />
            )}
        </div>
    );
}
