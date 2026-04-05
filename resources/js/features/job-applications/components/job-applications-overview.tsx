import { Badge } from '@/components/ui/badge';
import type {
    JobApplicationStatusLabels,
    JobApplicationsSummary,
} from '@/features/job-applications/types';

type Props = {
    summary: JobApplicationsSummary;
    statuses: JobApplicationStatusLabels;
};

const statusCardMeta: Array<{
    key: keyof JobApplicationsSummary['statuses'] | 'total';
    label: string;
    description: string;
    dot: string;
}> = [
    {
        key: 'total',
        label: 'Total',
        description: 'All tracked applications in the current view.',
        dot: 'bg-stone-700',
    },
    {
        key: 'applied',
        label: 'Applied',
        description: 'New applications waiting for a response.',
        dot: 'bg-amber-500',
    },
    {
        key: 'interview',
        label: 'Interview',
        description: 'Conversations that are already in motion.',
        dot: 'bg-sky-500',
    },
    {
        key: 'offering',
        label: 'Offering',
        description: 'Offers and compensation discussions.',
        dot: 'bg-emerald-500',
    },
    {
        key: 'accepted',
        label: 'Accepted',
        description: 'Roles that have already been won.',
        dot: 'bg-lime-500',
    },
    {
        key: 'rejected',
        label: 'Rejected',
        description: 'Applications that have been closed out.',
        dot: 'bg-rose-500',
    },
];

export function JobApplicationsOverview({ summary, statuses }: Props) {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {statusCardMeta.map((card) => {
                const value =
                    card.key === 'total'
                        ? summary.total
                        : summary.statuses[card.key];

                return (
                    <div
                        key={card.key}
                        className="rounded-4xl border border-border/70 bg-card p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`h-2.5 w-2.5 rounded-full ${card.dot}`}
                                />
                                <p className="text-sm font-medium text-muted-foreground">
                                    {card.key === 'total'
                                        ? card.label
                                        : statuses[card.key]}
                                </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                                {card.key === 'total' ? 'Overview' : card.key}
                            </Badge>
                        </div>
                        <div className="mt-4 space-y-1">
                            <div className="text-3xl font-semibold tracking-tight text-foreground">
                                {value}
                            </div>
                            <p className="max-w-sm text-sm text-muted-foreground">
                                {card.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
