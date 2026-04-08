import { Clock3 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { DashboardStats } from '@/features/dashboard/types';
import { formatShortDate } from '@/features/dashboard/utils';

type Props = {
    oldestActive: DashboardStats['oldestActive'];
};

export function DashboardFollowUpAlert({ oldestActive }: Props) {
    const description = oldestActive.company_name
        ? `${oldestActive.company_name} • ${oldestActive.position} • applied ${formatShortDate(oldestActive.applied_at)}`
        : 'No active applications yet';

    return (
        <Alert className="border-amber-400 bg-amber-100 text-amber-900 dark:border-amber-900/80 dark:bg-amber-950/40 dark:text-amber-50">
            <Clock3 className="size-4" />
            <AlertTitle>Follow-up target</AlertTitle>
            <AlertDescription>
                Oldest active application: {description}
            </AlertDescription>
        </Alert>
    );
}
