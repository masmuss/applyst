import {
    UnavailableIcon,
    CheckCircle,
    Layers,
    Loader,
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { JobApplicationsSummary } from '@/features/job-applications/types';

type Props = {
    summary: JobApplicationsSummary;
};

const statusCardMeta: Array<{
    key: keyof JobApplicationsSummary['statuses'] | 'total';
    label: string;
    description: string;
    icon: IconSvgElement;
}> = [
    {
        key: 'total',
        label: 'Total',
        description: 'All tracked applications in the current view.',
        icon: Layers,
    },
    {
        key: 'process',
        label: 'Process',
        description: 'Applied, interview, and offering stages.',
        icon: Loader,
    },
    {
        key: 'accepted',
        label: 'Accepted',
        description: 'Roles that have already been won.',
        icon: CheckCircle,
    },
    {
        key: 'rejected',
        label: 'Rejected',
        description: 'Applications that have been closed out.',
        icon: UnavailableIcon,
    },
];

export function JobApplicationsOverview({ summary }: Props) {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {statusCardMeta.map((card) => {
                const value =
                    card.key === 'total'
                        ? summary.total
                        : summary.statuses[card.key];

                return (
                    <Card key={card.key}>
                        <CardHeader className="flex items-center justify-between gap-3">
                            <CardTitle className="flex items-center gap-2">
                                <HugeiconsIcon
                                    icon={card.icon}
                                    className="size-4"
                                />
                                {card.label}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1">
                            <div className="text-3xl font-semibold tracking-tight text-foreground">
                                {value}
                            </div>
                        </CardContent>
                        <CardFooter className="text-xs text-muted-foreground">
                            {card.description}
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
