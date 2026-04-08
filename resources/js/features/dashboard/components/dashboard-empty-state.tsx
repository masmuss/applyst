import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from '@/components/ui/empty';
import { JobApplicationCreateDialog } from '@/features/job-applications/components/job-application-create-dialog';
import type { JobApplicationStatusLabels } from '@/features/job-applications/types';

type Props = {
    statuses: JobApplicationStatusLabels;
};

export function DashboardEmptyState({ statuses }: Props) {
    return (
        <Empty className="border-border/60 bg-muted/10 py-14">
            <EmptyContent>
                <EmptyHeader>
                    <EmptyTitle>No applications yet</EmptyTitle>
                    <EmptyDescription>
                        Add your first application to start tracking response
                        and conversion rates.
                    </EmptyDescription>
                </EmptyHeader>

                <JobApplicationCreateDialog statuses={statuses} />
            </EmptyContent>
        </Empty>
    );
}
