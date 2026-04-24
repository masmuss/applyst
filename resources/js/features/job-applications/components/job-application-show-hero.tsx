import { ArrowLeft, ExternalLink } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { JobApplicationStatusBadge } from '@/features/job-applications/components/job-application-status';
import type { JobApplicationDetail } from '@/features/job-applications/types';

type JobApplicationShowHeroProps = {
    jobApplication: JobApplicationDetail;
    statusLabel: string;
    appliedLabel: string;
    sourceLabel: string;
    backHref: string;
};

export function JobApplicationShowHero({
    jobApplication,
    statusLabel,
    appliedLabel,
    sourceLabel,
    backHref,
}: JobApplicationShowHeroProps) {
    return (
        <Card className="border-border/60 bg-card/75 shadow-sm backdrop-blur-sm">
            <CardContent className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                                {jobApplication.company_name}
                            </h1>
                            <p className="text-base text-muted-foreground">
                                {jobApplication.position}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                            Applied {appliedLabel}
                        </span>
                        <JobApplicationStatusBadge
                            status={jobApplication.status}
                            label={statusLabel}
                        />
                        <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                            Source: {sourceLabel}
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm">
                        <Link href={backHref}>
                            <HugeiconsIcon icon={ArrowLeft} />
                            Back to list
                        </Link>
                    </Button>

                    {jobApplication.job_url ? (
                        <Button asChild size="sm" className="shadow-sm">
                            <a
                                href={jobApplication.job_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Open posting
                                <HugeiconsIcon icon={ExternalLink} />
                            </a>
                        </Button>
                    ) : null}
                </div>
            </CardContent>
        </Card>
    );
}
