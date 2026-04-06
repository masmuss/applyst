import { Link } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Ellipsis, ExternalLink, Eye, Pencil, Trash2 } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/shared/data-table/data-table-column-header';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { JobApplicationStatusBadge } from '@/features/job-applications/components/job-application-status';
import { JobApplicationUpdateDialog } from '@/features/job-applications/components/job-application-update-dialog';
import type {
    JobApplicationRecord,
    JobApplicationStatusLabels,
} from '@/features/job-applications/types';
import jobApplications from '@/routes/job-applications';
import { JobApplicationDeleteDialog } from '@/features/job-applications/components/job-application-delete-dialog';

function formatAppliedAt(value: string): string {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value));
}

export function defineJobApplicationsTableColumns(
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
                    <JobApplicationStatusBadge
                        status={status}
                        label={statuses[status]}
                    />
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
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="mx-auto flex items-center justify-start gap-2">
                    <div className="hidden items-center gap-2 md:flex">
                        <Button asChild variant="outline" size="sm">
                            <Link
                                href={jobApplications.show(row.original.id).url}
                            >
                                <Eye />
                                View
                            </Link>
                        </Button>

                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon-sm">
                                    <Ellipsis />
                                    <span className="sr-only">
                                        Open actions
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-44">
                                <JobApplicationUpdateDialog
                                    jobApplication={row.original}
                                    statuses={statuses}
                                    trigger={
                                        <DropdownMenuItem
                                            onSelect={(event) => {
                                                event.preventDefault();
                                            }}
                                        >
                                            <Pencil />
                                            Edit
                                        </DropdownMenuItem>
                                    }
                                />

                                <JobApplicationDeleteDialog
                                    jobApplication={row.original}
                                    trigger={
                                        <DropdownMenuItem
                                            variant="destructive"
                                            onSelect={(event) => {
                                                event.preventDefault();
                                            }}
                                        >
                                            <Trash2 />
                                            Delete
                                        </DropdownMenuItem>
                                    }
                                />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="md:hidden">
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon-sm">
                                    <Ellipsis />
                                    <span className="sr-only">
                                        Open actions
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-44">
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={
                                            jobApplications.show(
                                                row.original.id,
                                            ).url
                                        }
                                        className="block w-full cursor-pointer"
                                    >
                                        <Eye />
                                        View
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <JobApplicationUpdateDialog
                                    jobApplication={row.original}
                                    statuses={statuses}
                                    trigger={
                                        <DropdownMenuItem
                                            onSelect={(event) => {
                                                event.preventDefault();
                                            }}
                                        >
                                            <Pencil />
                                            Edit
                                        </DropdownMenuItem>
                                    }
                                />

                                <JobApplicationDeleteDialog
                                    jobApplication={row.original}
                                    trigger={
                                        <DropdownMenuItem
                                            variant="destructive"
                                            onSelect={(event) => {
                                                event.preventDefault();
                                            }}
                                        >
                                            <Trash2 />
                                            Delete
                                        </DropdownMenuItem>
                                    }
                                />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            ),
        },
    ];
}
