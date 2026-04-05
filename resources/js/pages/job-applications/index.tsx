import { Head } from '@inertiajs/react';
import Heading from '@/components/shared/heading';
import { JobApplicationsFilters } from '@/features/job-applications/components/job-applications-filters';
import { JobApplicationsOverview } from '@/features/job-applications/components/job-applications-overview';
import { JobApplicationsTable } from '@/features/job-applications/components/job-applications-table';
import type {
    JobApplicationStatusLabels,
    JobApplicationsFilters as JobApplicationsFiltersType,
    JobApplicationsSummary as JobApplicationsSummaryType,
    PaginatedJobApplications,
} from '@/features/job-applications/types';
import { dashboard } from '@/routes';
import jobApplications from '@/routes/job-applications';

type Props = {
    applications: PaginatedJobApplications;
    filters: JobApplicationsFiltersType;
    statuses: JobApplicationStatusLabels;
    summary: JobApplicationsSummaryType;
};

export default function JobApplicationsIndex({
    applications,
    filters,
    statuses,
    summary,
}: Props) {
    return (
        <>
            <Head title="Job applications" />

            <h1 className="sr-only">Job applications</h1>

            <div className="space-y-6">
                <section className="relative overflow-hidden rounded-4xl border border-border/70 bg-stone-950 p-6 text-stone-50 shadow-sm">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.10),transparent_30%)]" />
                    <div className="relative max-w-3xl space-y-3">
                        <p className="text-xs font-medium tracking-[0.24em] text-stone-300 uppercase">
                            Pipeline command center
                        </p>
                        <Heading
                            variant="small"
                            title="Job applications"
                            description="Follow every application from first touch to outcome, then sort the table with the same controls you already use elsewhere in the app."
                        />
                    </div>
                    <div className="relative flex flex-wrap gap-2 text-sm text-stone-300">
                        <span>Feature-driven layout</span>
                        <span>•</span>
                        <span>Composable sections</span>
                        <span>•</span>
                        <span>Wayfinder-powered filters</span>
                    </div>
                </section>

                <JobApplicationsOverview
                    summary={summary}
                    statuses={statuses}
                />

                <JobApplicationsFilters filters={filters} statuses={statuses} />

                <div className="rounded-4xl border border-border/70 bg-card p-4 shadow-sm md:p-6">
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Applications table
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Sort, paginate, and inspect the current pipeline
                                without leaving the page.
                            </p>
                        </div>
                    </div>

                    <JobApplicationsTable
                        applications={applications}
                        filters={filters}
                        statuses={statuses}
                    />
                </div>
            </div>
        </>
    );
}

JobApplicationsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Job applications',
            href: jobApplications.index(),
        },
    ],
};
