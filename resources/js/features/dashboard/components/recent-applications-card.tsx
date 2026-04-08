import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { DashboardEmptyState } from '@/features/dashboard/components/dashboard-empty-state';
import { RecentApplicationRow } from '@/features/dashboard/components/recent-application-row';
import type { DashboardPageProps } from '@/features/dashboard/types';
import jobApplications from '@/routes/job-applications';

type Props = Pick<DashboardPageProps, 'recentApplications' | 'statuses'>;

export function RecentApplicationsCard({
    recentApplications,
    statuses,
}: Props) {
    return (
        <Card className="border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
            <CardHeader>
                <CardTitle>Recent applications</CardTitle>
                <CardDescription>
                    Your five latest applications with status and applied date.
                </CardDescription>
                <CardAction>
                    <Button asChild variant="outline" size="sm">
                        <Link href={jobApplications.index().url}>
                            View all
                            <ArrowUpRight />
                        </Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                {recentApplications.length > 0 ? (
                    <div className="space-y-4">
                        {recentApplications.map((application) => (
                            <RecentApplicationRow
                                key={application.id}
                                application={application}
                                label={statuses[application.status]}
                            />
                        ))}
                    </div>
                ) : (
                    <DashboardEmptyState statuses={statuses} />
                )}
            </CardContent>
        </Card>
    );
}
