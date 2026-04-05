import type { ColumnDef } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';
import { DataTable } from '@/components/shared/data-table/data-table';
import { DataTableColumnHeader } from '@/components/shared/data-table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type {
    JobApplicationRecord,
    JobApplicationStatus,
    JobApplicationStatusLabels,
    JobApplicationsFilters,
    PaginatedJobApplications,
} from '@/features/job-applications/types';
import jobApplications from '@/routes/job-applications';

type Props = {
    applications: PaginatedJobApplications;
    filters: JobApplicationsFilters;
    statuses: JobApplicationStatusLabels;
};

function getStatusBadgeVariant(status: JobApplicationStatus) {
    switch (status) {
        case 'rejected':
            return 'destructive' as const;
        case 'accepted':
        case 'interview':
            return 'default' as const;
        case 'offering':
            return 'secondary' as const;
        default:
            return 'outline' as const;
    }
}

function formatAppliedAt(value: string): string {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value));
}

function createColumns(
    statuses: JobApplicationStatusLabels,
): ColumnDef<JobApplicationRecord>[] {
    return [
        {
            accessorKey: 'company_name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Company" />
            ),
            cell: ({ row }) => (
                <div className="space-y-1">
                    <div className="font-medium text-foreground">
                        {row.original.company_name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {row.original.source ?? 'Direct application'}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'position',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Position" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">{row.original.position}</span>
            ),
        },
        {
            accessorKey: 'status',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status = row.original.status;

                return (
                    <Badge variant={getStatusBadgeVariant(status)}>
                        {statuses[status]}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'applied_at',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Applied" />
            ),
            cell: ({ row }) => formatAppliedAt(row.original.applied_at),
        },
        {
            accessorKey: 'job_url',
            header: 'Posting',
            cell: ({ row }) =>
                row.original.job_url ? (
                    <Button asChild variant="ghost" size="sm">
                        <a
                            href={row.original.job_url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Open
                            <ExternalLink />
                        </a>
                    </Button>
                ) : (
                    <span className="text-muted-foreground">Unavailable</span>
                ),
        },
    ];
}

export function JobApplicationsTable({
    applications,
    filters,
    statuses,
}: Props) {
    return (
        <DataTable
            columns={createColumns(statuses)}
            data={applications.data}
            pagination={applications}
            filters={filters}
            routePath={jobApplications.index.url()}
            partialReloadKeys={['applications']}
        />
    );
}
