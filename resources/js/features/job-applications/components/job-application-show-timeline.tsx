import type { IconSvgElement } from '@hugeicons/react';
import { HugeiconsIcon } from '@hugeicons/react';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { getJobApplicationStatusMeta } from '@/features/job-applications/components/job-application-status';
import type {
    JobApplicationStatus,
    JobApplicationStatusLog,
} from '@/features/job-applications/types';
import { formatDate } from '@/features/job-applications/utils';
import { cn } from '@/lib/utils';

type JobApplicationShowTimelineProps = {
    statusLogs: JobApplicationStatusLog[];
    processDurationLabel: string | null;
    topAction?: ReactNode;
};

function TimelineIcon({ icon }: { icon: IconSvgElement }) {
    return <HugeiconsIcon icon={icon} className="size-4" />;
}

function getTimelineIconTone(status: JobApplicationStatus): string {
    if (status === 'rejected') {
        return 'border-destructive/45 bg-destructive/20 text-destructive';
    }

    if (status === 'accepted') {
        return 'border-emerald-500/45 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400';
    }

    if (status === 'offering') {
        return 'border-sky-500/45 bg-sky-500/20 text-sky-600 dark:text-sky-400';
    }

    if (status === 'interview') {
        return 'border-primary/45 bg-primary/20 text-primary';
    }

    return 'border-border/60 bg-muted/70 text-muted-foreground';
}

function getTimelineStatusTextTone(status: JobApplicationStatus): string {
    if (status === 'rejected') {
        return 'text-destructive';
    }

    if (status === 'accepted') {
        return 'text-emerald-600 dark:text-emerald-400';
    }

    if (status === 'offering') {
        return 'text-sky-600 dark:text-sky-400';
    }

    if (status === 'interview') {
        return 'text-primary';
    }

    return 'text-foreground';
}

export function JobApplicationShowTimeline({
    statusLogs,
    processDurationLabel,
    topAction,
}: JobApplicationShowTimelineProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Status timeline</CardTitle>
                <CardDescription>
                    Journey across every stage in this application.
                </CardDescription>

                {processDurationLabel ? (
                    <CardAction>
                        <Badge variant="outline">{processDurationLabel}</Badge>
                    </CardAction>
                ) : null}
            </CardHeader>

            <CardContent>
                <ol className="space-y-8">
                    {topAction ? (
                        <li className="relative pl-12">
                            <span className="absolute top-0 left-0 z-10 flex size-9 items-center justify-center rounded-full border border-dashed border-border/70 bg-background text-muted-foreground">
                                +
                            </span>

                            <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-3">
                                {topAction}
                            </div>

                            <span className="absolute top-10 left-4.5 h-[calc(100%+1.2rem)] w-px bg-border/70" />
                        </li>
                    ) : null}

                    {statusLogs.map((log, index) => {
                        const statusMeta = getJobApplicationStatusMeta(
                            log.to_status,
                        );

                        return (
                            <li key={log.id} className="relative pl-12">
                                {index < statusLogs.length - 1 ? (
                                    <span className="absolute top-0 left-4.5 h-[calc(100%+2rem)] w-px bg-border/70" />
                                ) : null}

                                <span
                                    className={cn(
                                        'absolute top-0 left-0 z-10 flex size-9 items-center justify-center rounded-full border border-border/70 bg-background shadow-sm',
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'flex size-7 items-center justify-center rounded-full border',
                                            getTimelineIconTone(log.to_status),
                                        )}
                                    >
                                        <TimelineIcon icon={statusMeta.icon} />
                                    </span>
                                </span>

                                <div className="space-y-3">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <p
                                            className={cn(
                                                'text-sm font-semibold tracking-tight',
                                                getTimelineStatusTextTone(
                                                    log.to_status,
                                                ),
                                            )}
                                        >
                                            {log.to_label}
                                        </p>
                                        <span className="text-xs text-muted-foreground">
                                            {formatDate(
                                                log.changed_at ??
                                                    log.created_at,
                                            )}
                                        </span>
                                    </div>

                                    <div
                                        className={cn(
                                            'space-y-2 rounded-xl border p-4',
                                            index === 0
                                                ? 'border-border/80 bg-card shadow-sm'
                                                : 'border-border/60 bg-muted/30',
                                        )}
                                    >
                                        <p className="text-sm text-muted-foreground">
                                            {log.from_label
                                                ? `Changed from ${log.from_label} to ${log.to_label}`
                                                : `Initial application status: ${log.to_label}`}
                                        </p>

                                        {log.notes ? (
                                            <p className="text-sm leading-relaxed text-foreground">
                                                {log.notes}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </CardContent>
        </Card>
    );
}
