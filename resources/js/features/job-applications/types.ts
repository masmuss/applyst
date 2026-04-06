import type { PaginationMeta } from '@/components/shared/data-table/data-table-pagination';

export type JobApplicationStatus =
    | 'applied'
    | 'interview'
    | 'offering'
    | 'accepted'
    | 'rejected';

export type JobApplicationRecord = {
    id: number;
    company_name: string;
    position: string;
    status: JobApplicationStatus;
    source: string | null;
    applied_at: string;
    job_url: string | null;
    notes: string | null;
};

export type JobApplicationDetail = JobApplicationRecord & {
    created_at: string | null;
    updated_at: string | null;
};

export type JobApplicationStatusLog = {
    id: number;
    from_status: JobApplicationStatus | null;
    from_label: string | null;
    to_status: JobApplicationStatus;
    to_label: string;
    notes: string | null;
    changed_at: string | null;
    created_at: string | null;
};

export type JobApplicationStatusLabels = Record<JobApplicationStatus, string>;

export type JobApplicationsFilters = {
    search?: string;
    status?: string;
    source?: string;
    sort_by?: string;
    sort_dir?: string;
    per_page?: string | number;
};

export type JobApplicationsSummary = {
    total: number;
    statuses: {
        process: number;
        accepted: number;
        rejected: number;
    };
};

export type PaginatedJobApplications = PaginationMeta & {
    data: JobApplicationRecord[];
};
