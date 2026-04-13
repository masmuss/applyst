import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

interface DataTablePaginationProps {
    pagination: PaginationMeta;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export function DataTablePagination({
    pagination,
    onPageChange,
    onPageSizeChange,
}: DataTablePaginationProps) {
    const { current_page, last_page, per_page, from, to, total } = pagination;
    const displayFrom = from ?? 0;
    const displayTo = to ?? 0;

    const isFirstPage = current_page <= 1;
    const isLastPage = current_page >= last_page;

    return (
        <div className="flex flex-col justify-between md:flex-row md:items-center md:px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                Showing {displayFrom} to {displayTo} of {total} results
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-xs font-medium md:text-sm">
                        Rows per page
                    </p>
                    <Select
                        value={`${per_page}`}
                        onValueChange={(value) =>
                            onPageSizeChange(Number(value))
                        }
                    >
                        <SelectTrigger className="h-8 w-17.5">
                            <SelectValue placeholder={per_page} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 25, 30, 40, 50].map((size) => (
                                <SelectItem key={size} value={`${size}`}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-25 min-w-0 items-center justify-center text-xs font-medium md:text-sm">
                    Page {current_page} of {last_page}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden size-8 lg:flex"
                        onClick={() => onPageChange(1)}
                        disabled={isFirstPage}
                    >
                        <span className="sr-only">Go to first page</span>
                        <HugeiconsIcon icon={ChevronsLeft} />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => onPageChange(current_page - 1)}
                        disabled={isFirstPage}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <HugeiconsIcon icon={ChevronLeft} />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => onPageChange(current_page + 1)}
                        disabled={isLastPage}
                    >
                        <span className="sr-only">Go to next page</span>
                        <HugeiconsIcon icon={ChevronRight} />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden size-8 lg:flex"
                        onClick={() => onPageChange(last_page)}
                        disabled={isLastPage}
                    >
                        <span className="sr-only">Go to last page</span>
                        <HugeiconsIcon icon={ChevronsRight} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
