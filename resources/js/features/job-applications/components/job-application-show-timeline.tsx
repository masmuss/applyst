import type { IconSvgElement } from '@hugeicons/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    JobApplicationStatusBadge,
    getJobApplicationStatusMeta,
} from '@/features/job-applications/components/job-application-status';
import type { JobApplicationStatusLog } from '@/features/job-applications/types';
import { formatDate } from '@/features/job-applications/utils';
import { cn } from '@/lib/utils';

type JobApplicationShowTimelineProps = {
    statusLogs: JobApplicationStatusLog[];
    processDurationLabel: string | null;
};

function TimelineIcon({ icon }: { icon: IconSvgElement }) {
    return <HugeiconsIcon icon={icon} className="size-4" />;
}

export function JobApplicationShowTimeline({
    statusLogs,
    processDurationLabel,
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
                    {statusLogs.map((log, index) => {
                        const statusMeta = getJobApplicationStatusMeta(
                            log.to_status,
                        );

                        return (
                            <li key={log.id} className="relative pl-12">
                                {index < statusLogs.length - 1 ? (
                                    <span className="absolute top-10 left-[1.18rem] h-[calc(100%+1.2rem)] w-px bg-border/70" />
                                ) : null}

                                <span
                                    className={cn(
                                        'absolute top-0 left-0 flex size-9 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground shadow-sm',
                                    )}
                                >
                                    <TimelineIcon icon={statusMeta.icon} />
                                </span>

                                <div className="space-y-3">
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
