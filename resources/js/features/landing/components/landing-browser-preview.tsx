import { LandingStatusBadge } from '@/features/landing/components/landing-status-badge';
import {
    browserStats,
    mockApplications,
} from '@/features/landing/landing-data';
import { cn } from '@/lib/utils';

export function LandingBrowserPreview() {
    return (
        <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl">
                <div className="flex items-center gap-1.5 border-b border-border/50 bg-muted/30 px-4 py-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                    <div className="ml-3 flex h-5 max-w-48 flex-1 items-center rounded-md bg-muted/60 px-2 text-xs text-muted-foreground/50">
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
                            <span>Perusahaan</span>
                            <span>Posisi</span>
                            <span>Status</span>
                            <span>Tanggal</span>
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
                                <div>
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
                                <LandingStatusBadge
                                    status={application.status}
                                />
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
