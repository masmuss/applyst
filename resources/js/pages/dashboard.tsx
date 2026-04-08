import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, CircleHelp } from 'lucide-react';
import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from '@/components/ui/empty';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { JobApplicationCreateDialog } from '@/features/job-applications/components/job-application-create-dialog';
import { JobApplicationStatusBadge } from '@/features/job-applications/components/job-application-status';
import type {
    JobApplicationRecord,
    JobApplicationStatusLabels,
} from '@/features/job-applications/types';
import { dashboard } from '@/routes';
import jobApplications from '@/routes/job-applications';

type DashboardStats = {
    responseRate: {
        value: number;
        matchingApplications: number;
        totalApplications: number;
    };
    conversionRate: {
        value: number;
        matchingApplications: number;
        totalApplications: number;
    };
    oldestActive: {
        days: number | null;
        company_name: string | null;
        position: string | null;
        applied_at: string | null;
        activeApplications: number;
    };
};

type Props = {
    stats: DashboardStats;
    recentApplications: JobApplicationRecord[];
    statuses: JobApplicationStatusLabels;
};

function formatPercent(value: number): string {
    return `${new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 1,
    }).format(value)}%`;
}

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

function formatDays(value: number): string {
    return `${value} day${value === 1 ? '' : 's'}`;
}

function DashboardStatCard({
    title,
    description,
    tooltip,
    value,
    supportingText,
}: {
    title: string;
    description: string;
    tooltip: string;
    value: string;
    supportingText: string;
}) {
    return (
        <Card className="border-sidebar-border/70 bg-linear-to-br from-background via-background to-muted/30 shadow-sm dark:border-sidebar-border">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <CardAction>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                className="rounded-full"
                            >
                                <span className="sr-only">More details</span>
                                <CircleHelp className="size-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs text-left">{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </CardAction>
            </CardHeader>
            <CardContent className="flex items-end justify-between gap-4">
                <div className="space-y-1">
                    <p className="text-3xl font-semibold tracking-tight">
                        {value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {supportingText}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function RecentApplicationRow({
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

export default function Dashboard({
    stats,
    recentApplications,
    statuses,
}: Props) {
    const hasRecentApplications = recentApplications.length > 0;
    const oldestActiveDescription = stats.oldestActive.company_name
        ? `${stats.oldestActive.company_name} • ${stats.oldestActive.position} • applied ${formatShortDate(stats.oldestActive.applied_at)}`
        : 'No active applications yet';

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <Heading
                        title="Dashboard"
                        description="A quick view of your job search effectiveness and latest activity."
                    />

                    <JobApplicationCreateDialog statuses={statuses} />
                </div>

                <div className="grid gap-4 xl:grid-cols-3">
                    <DashboardStatCard
                        title="Response rate"
                        description="Applications that received a response, including rejections."
                        tooltip="Calculated as applications that moved beyond Applied, divided by total submitted applications."
                        value={formatPercent(stats.responseRate.value)}
                        supportingText={`${stats.responseRate.matchingApplications} out of ${stats.responseRate.totalApplications} applications received a response.`}
                    />

                    <DashboardStatCard
                        title="Conversion rate apply → interview"
                        description="Applications that reached interview stage or beyond."
                        tooltip="Calculated as applications that reached Interview, Offering, or Accepted, divided by total submitted applications."
                        value={formatPercent(stats.conversionRate.value)}
                        supportingText={`${stats.conversionRate.matchingApplications} out of ${stats.conversionRate.totalApplications} applications reached interview or beyond.`}
                    />

                    <DashboardStatCard
                        title="Oldest active application"
                        description="The longest-running application still in Applied status."
                        tooltip="Use this as your first follow-up priority signal."
                        value={
                            stats.oldestActive.days === null
                                ? '-'
                                : formatDays(stats.oldestActive.days)
                        }
                        supportingText={
                            stats.oldestActive.activeApplications > 0
                                ? `${stats.oldestActive.activeApplications} active application${stats.oldestActive.activeApplications === 1 ? '' : 's'} waiting for a response since ${formatShortDate(stats.oldestActive.applied_at)}.`
                                : 'No active applications yet.'
                        }
                    />
                </div>

                <Card className="border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
                    <CardHeader>
                        <CardTitle>Recent applications</CardTitle>
                        <CardDescription>
                            Your five latest applications with status and
                            applied date.
                        </CardDescription>
                        <CardAction>
                            <Button asChild variant="outline" size="sm">
                                <Link href={jobApplications.index().url}>
                                    View all
                                    <ArrowUpRight />
                                </Link>
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        {hasRecentApplications ? (
                            <div className="space-y-4">
                                {recentApplications.map((application) => (
                                    <RecentApplicationRow
                                        key={application.id}
                                        application={application}
                                        label={statuses[application.status]}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Empty className="border-border/60 bg-muted/10 py-14">
                                <EmptyContent>
                                    <EmptyHeader>
                                        <EmptyTitle>
                                            No applications yet
                                        </EmptyTitle>
                                        <EmptyDescription>
                                            Add your first application to start
                                            tracking response and conversion
                                            rates.
                                        </EmptyDescription>
                                    </EmptyHeader>

                                    <JobApplicationCreateDialog
                                        statuses={statuses}
                                    />
                                </EmptyContent>
                            </Empty>
                        )}
                    </CardContent>
                </Card>

                <div className="rounded-3xl border border-dashed border-border/70 bg-muted/20 p-4 text-sm text-muted-foreground">
                    Follow-up target for the oldest active application:{' '}
                    {oldestActiveDescription}
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
