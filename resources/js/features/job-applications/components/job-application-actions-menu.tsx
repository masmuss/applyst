import { Link } from '@inertiajs/react';
import { Ellipsis, Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { JobApplicationUpdateDialog } from '@/features/job-applications/components/job-application-update-dialog';
import type {
    JobApplicationRecord,
    JobApplicationStatusLabels,
} from '@/features/job-applications/types';
import jobApplications from '@/routes/job-applications';
import { JobApplicationDeleteDialog } from '@/features/job-applications/components/job-application-delete-dialog';

type Props = {
    jobApplication: JobApplicationRecord;
    statuses: JobApplicationStatusLabels;
    includeView?: boolean;
};

export function JobApplicationActionsMenu({
    jobApplication,
    statuses,
    includeView = false,
}: Props) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon-sm">
                    <Ellipsis />
                    <span className="sr-only">Open actions</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
                {includeView ? (
                    <>
                        <DropdownMenuItem asChild>
                            <Link
                                href={
                                    jobApplications.show(jobApplication.id).url
                                }
                                className="block w-full cursor-pointer"
                            >
                                <Eye />
                                View
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                    </>
                ) : null}

                <JobApplicationUpdateDialog
                    jobApplication={jobApplication}
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
                    jobApplication={jobApplication}
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
    );
}
