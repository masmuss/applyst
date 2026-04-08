import type {
    JobApplicationRecord,
    JobApplicationStatusLabels,
} from '@/features/job-applications/types';

export type DashboardStats = {
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

export type DashboardPageProps = {
    stats: DashboardStats;
    recentApplications: JobApplicationRecord[];
    statuses: JobApplicationStatusLabels;
};
