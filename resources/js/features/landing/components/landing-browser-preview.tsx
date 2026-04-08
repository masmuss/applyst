import { JobApplicationStatusBadge } from '@/features/job-applications/components/job-application-status';
import {
    browserStats,
    mockApplications,
} from '@/features/landing/landing-data';
import { cn, toTitleCase } from '@/lib/utils';

export function LandingBrowserPreview() {
    const trafficLights: string[] = [
        'bg-rose-500/60',
        'bg-amber-500/60',
        'bg-emerald-500/60',
    ];

    return (
        <div className="relative mx-auto mt-14 hidden max-w-4xl md:block">
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl">
                <div className="flex items-center gap-1.5 border-b border-border/50 bg-muted/30 px-4 py-3">
                    {trafficLights.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                'h-2.5 w-2.5 rounded-full',
                                trafficLights[index],
                            )}
                        />
                    ))}
                    <div className="ml-3 flex h-5 max-w-full flex-1 items-center rounded-md bg-muted/60 p-4 text-xs text-muted-foreground/50">
                        app.applyst.id
                    </div>
                </div>

                <div className="p-6">
                    <div className="mb-5 grid grid-cols-4 gap-3">
                        {browserStats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-lg border border-border/50 bg-muted/20 p-3 text-left"
                            >
                                <div className="text-xs text-muted-foreground">
                                    {stat.label}
                                </div>
                                <div className="mt-1 text-2xl font-bold">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-muted-foreground/60">
                                    {stat.sub}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="overflow-hidden rounded-lg border border-border/50">
                        <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1fr] border-b border-border/50 bg-muted/30 px-4 py-2.5 text-xs font-medium text-muted-foreground">
                            <span>Company</span>
                            <span>Role</span>
                            <span>Status</span>
                            <span>Applied</span>
                        </div>
                        {mockApplications.map((application, index) => (
                            <div
                                key={application.company}
                                className={cn(
                                    'grid grid-cols-[1.5fr_1.5fr_1fr_1fr] items-center px-4 py-3 text-sm',
                                    index < mockApplications.length - 1 &&
                                        'border-b border-border/30',
                                )}
                            >
                                <div className="text-left">
                                    <div className="font-medium">
                                        {application.company}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {application.source}
                                    </div>
                                </div>
                                <span className="text-muted-foreground">
                                    {application.position}
                                </span>
                                <div>
                                    <JobApplicationStatusBadge
                                        status={application.status}
                                        label={toTitleCase(application.status)}
                                    />
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {application.date}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pointer-events-none absolute -inset-px rounded-xl opacity-20 ring-1 ring-primary/30" />
        </div>
    );
}
