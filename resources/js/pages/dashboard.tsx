import { Head } from '@inertiajs/react';
import Heading from '@/components/shared/heading';
import { DashboardFollowUpAlert } from '@/features/dashboard/components/dashboard-follow-up-alert';
import { DashboardStatCard } from '@/features/dashboard/components/dashboard-stat-card';
import { RecentApplicationsCard } from '@/features/dashboard/components/recent-applications-card';
import type { DashboardPageProps } from '@/features/dashboard/types';
import {
    formatDays,
    formatPercent,
    formatShortDate,
} from '@/features/dashboard/utils';
import { JobApplicationCreateDialog } from '@/features/job-applications/components/job-application-create-dialog';
import { dashboard } from '@/routes';

export default function Dashboard({
    stats,
    recentApplications,
    statuses,
}: DashboardPageProps) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <Heading
                        title="Dashboard"
                        description="A quick view of your job search effectiveness and latest activity."
                    />

                    <JobApplicationCreateDialog statuses={statuses} />
                </div>

                <div className="grid gap-4 xl:grid-cols-3">
                    <DashboardStatCard
                        title="Response rate"
                        description="Applications that received a response, including rejections."
                        tooltip="Calculated as applications that moved beyond Applied, divided by total submitted applications."
                        value={formatPercent(stats.responseRate.value)}
                        supportingText={`${stats.responseRate.matchingApplications} out of ${stats.responseRate.totalApplications} applications received a response.`}
                    />

                    <DashboardStatCard
                        title="Conversion rate apply → interview"
                        description="Applications that reached interview stage or beyond."
                        tooltip="Calculated as applications that reached Interview, Offering, or Accepted, divided by total submitted applications."
                        value={formatPercent(stats.conversionRate.value)}
                        supportingText={`${stats.conversionRate.matchingApplications} out of ${stats.conversionRate.totalApplications} applications reached interview or beyond.`}
                    />

                    <DashboardStatCard
                        title="Oldest active application"
                        description="The longest-running application still in Applied status."
                        tooltip="Use this as your first follow-up priority signal."
                        value={
                            stats.oldestActive.days === null
                                ? '-'
                                : formatDays(stats.oldestActive.days)
                        }
                        supportingText={
                            stats.oldestActive.activeApplications > 0
                                ? `${stats.oldestActive.activeApplications} active application${stats.oldestActive.activeApplications === 1 ? '' : 's'} waiting for a response since ${formatShortDate(stats.oldestActive.applied_at)}.`
                                : 'No active applications yet.'
                        }
                    />
                </div>

                <DashboardFollowUpAlert oldestActive={stats.oldestActive} />

                <RecentApplicationsCard
                    recentApplications={recentApplications}
                    statuses={statuses}
                />
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
