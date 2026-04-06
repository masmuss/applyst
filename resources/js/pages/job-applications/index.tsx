import { Head } from '@inertiajs/react';
import Heading from '@/components/shared/heading';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { JobApplicationCreateDialog } from '@/features/job-applications/components/job-application-create-dialog';
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

            <div className="flex h-full flex-col gap-4 p-4 lg:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <Heading
                        title="Job applications"
                        description="Track and manage your job applications in one place."
                    />
                </div>

                <div className="space-y-6">
                    <JobApplicationsOverview summary={summary} />

                    <JobApplicationsFilters
                        filters={filters}
                        statuses={statuses}
                    />

                    <Card>
                        <CardHeader className="flex w-full flex-col items-center justify-between md:flex-row">
                            <div>
                                <CardTitle>Applications table</CardTitle>
                                <CardDescription>
                                    Sort, paginate, and inspect the current
                                    pipeline without leaving the page.
                                </CardDescription>
                            </div>
                            <JobApplicationCreateDialog statuses={statuses} />
                        </CardHeader>

                        <CardContent>
                            <JobApplicationsTable
                                applications={applications}
                                filters={filters}
                                statuses={statuses}
                            />
                        </CardContent>
                    </Card>
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
