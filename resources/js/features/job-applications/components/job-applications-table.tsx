import { DataTable } from '@/components/shared/data-table/data-table';
import { defineJobApplicationsTableColumns } from '@/features/job-applications/components/job-applications-table-columns';
import type {
    JobApplicationStatusLabels,
    JobApplicationsFilters,
    PaginatedJobApplications,
} from '@/features/job-applications/types';
import jobApplications from '@/routes/job-applications';

type Props = {
    applications: PaginatedJobApplications;
    filters: JobApplicationsFilters;
    statuses: JobApplicationStatusLabels;
};

export function JobApplicationsTable({
    applications,
    filters,
    statuses,
}: Props) {
    return (
        <DataTable
            columns={defineJobApplicationsTableColumns(statuses)}
            data={applications.data}
            pagination={applications}
            filters={filters}
            routePath={jobApplications.index.url()}
            partialReloadKeys={['applications']}
        />
    );
}
