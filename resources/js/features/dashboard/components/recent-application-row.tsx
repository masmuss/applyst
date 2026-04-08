import { Link } from '@inertiajs/react';
import { JobApplicationStatusBadge } from '@/features/job-applications/components/job-application-status';
import type { JobApplicationRecord } from '@/features/job-applications/types';
import jobApplications from '@/routes/job-applications';

function formatShortDate(value: string | null): string {
    if (!value) {
        return '-';
    }

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value));
}

export function RecentApplicationRow({
    application,
    label,
}: {
    application: JobApplicationRecord;
    label: string;
}) {
    return (
        <Link
            href={jobApplications.show(application.id).url}
            className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 p-4 transition-colors hover:bg-muted/40"
        >
            <div className="min-w-0 space-y-1">
                <p className="truncate font-medium text-foreground">
                    {application.company_name}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                    {application.position}
                </p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-2 text-right">
                <JobApplicationStatusBadge
                    status={application.status}
                    label={label}
                />
                <p className="text-xs text-muted-foreground">
                    Applied {formatShortDate(application.applied_at)}
                </p>
            </div>
        </Link>
    );
}
