import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import {
    getJobApplicationStatusMeta,
    JobApplicationStatusBadge,
} from '@/features/job-applications/components/job-application-status';
import type {
    JobApplicationDetail,
    JobApplicationStatusLabels,
    JobApplicationStatusLog,
} from '@/features/job-applications/types';
import { dashboard } from '@/routes';
import jobApplications from '@/routes/job-applications';

type Props = {
    jobApplication: JobApplicationDetail;
    statusLogs: JobApplicationStatusLog[];
    statuses: JobApplicationStatusLabels;
};

function formatDate(value: string | null): string {
    if (!value) {
        return '-';
    }

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(value));
}

function formatShortDate(value: string): string {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value));
}

export default function JobApplicationsShow({
    jobApplication,
    statusLogs,
    statuses,
}: Props) {
    const currentStatusLabel = statuses[jobApplication.status];

    return (
        <>
            <Head title={`${jobApplication.company_name} - Job application`} />

            <div className="flex h-full flex-col gap-4 p-4 lg:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <Heading
                            title={jobApplication.company_name}
                            description={`${jobApplication.position} • Applied ${formatShortDate(jobApplication.applied_at)}`}
                        />

                        <div className="-mt-4 flex flex-wrap items-center gap-3">
                            <JobApplicationStatusBadge
                                status={jobApplication.status}
                                label={currentStatusLabel}
                            />
                            <span className="text-sm text-muted-foreground">
                                Source:{' '}
                                {jobApplication.source ?? 'Direct application'}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button asChild variant="outline" size="sm">
                            <Link href={jobApplications.index().url}>
                                <ArrowLeft />
                                Back to list
                            </Link>
                        </Button>

                        {jobApplication.job_url ? (
                            <Button asChild size="sm">
                                <a
                                    href={jobApplication.job_url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Open posting
                                    <ExternalLink />
                                </a>
                            </Button>
                        ) : null}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                    <Card>
                        <CardHeader>
                            <CardTitle>Application notes</CardTitle>
                            <CardDescription>
                                Additional context and reminders for this
                                application.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-lg border bg-muted/20 p-4 text-sm leading-relaxed text-foreground">
                                {jobApplication.notes?.trim()
                                    ? jobApplication.notes
                                    : 'No notes yet for this application.'}
                            </div>

                            <Separator />

                            <div className="grid gap-3 text-sm text-muted-foreground">
                                <div className="flex items-center justify-between gap-4">
                                    <span>Applied on</span>
                                    <span className="font-medium text-foreground">
                                        {formatShortDate(
                                            jobApplication.applied_at,
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span>Created at</span>
                                    <span className="font-medium text-foreground">
                                        {formatDate(jobApplication.created_at)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span>Last updated</span>
                                    <span className="font-medium text-foreground">
                                        {formatDate(jobApplication.updated_at)}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Status timeline</CardTitle>
                            <CardDescription>
                                History of stage changes for this application.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ol className="space-y-4">
                                {statusLogs.map((log, index) => {
                                    const statusMeta =
                                        getJobApplicationStatusMeta(
                                            log.to_status,
                                        );

                                    return (
                                        <li
                                            key={log.id}
                                            className="relative pl-10"
                                        >
                                            {index < statusLogs.length - 1 ? (
                                                <span className="absolute top-8 left-4 h-[calc(100%+0.5rem)] w-px bg-border" />
                                            ) : null}

                                            <span className="absolute top-1 left-0 flex size-8 items-center justify-center rounded-full border bg-background text-muted-foreground">
                                                <Icon
                                                    iconNode={statusMeta.icon}
                                                    className="size-4"
                                                />
                                            </span>

                                            <div className="space-y-2 rounded-lg border p-3">
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <JobApplicationStatusBadge
                                                        status={log.to_status}
                                                        label={log.to_label}
                                                    />
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatDate(
                                                            log.changed_at ??
                                                                log.created_at,
                                                        )}
                                                    </span>
                                                </div>

                                                {log.from_label ? (
                                                    <p className="text-sm text-muted-foreground">
                                                        Changed from{' '}
                                                        {log.from_label} to{' '}
                                                        {log.to_label}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground">
                                                        Initial application
                                                        status: {log.to_label}
                                                    </p>
                                                )}

                                                {log.notes ? (
                                                    <p className="text-sm text-foreground">
                                                        {log.notes}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

JobApplicationsShow.layout = (props: Props) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Job applications',
            href: jobApplications.index(),
        },
        {
            title: props.jobApplication.company_name,
            href: jobApplications.show(props.jobApplication.id),
        },
    ],
});
