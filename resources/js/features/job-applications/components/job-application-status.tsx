import {
    BadgeCheck,
    CircleX,
    ClipboardCheck,
    HandCoins,
    MessagesSquare,
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Badge } from '@/components/ui/badge';
import { SelectGroup, SelectItem } from '@/components/ui/select';
import type {
    JobApplicationStatus,
    JobApplicationStatusLabels,
} from '@/features/job-applications/types';

type JobApplicationStatusMeta = {
    icon: IconSvgElement;
    badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline';
};

const jobApplicationStatusMeta = {
    applied: {
        icon: ClipboardCheck,
        badgeVariant: 'outline',
    },
    interview: {
        icon: MessagesSquare,
        badgeVariant: 'default',
    },
    offering: {
        icon: HandCoins,
        badgeVariant: 'secondary',
    },
    accepted: {
        icon: BadgeCheck,
        badgeVariant: 'default',
    },
    rejected: {
        icon: CircleX,
        badgeVariant: 'destructive',
    },
} satisfies Record<JobApplicationStatus, JobApplicationStatusMeta>;

export function getJobApplicationStatusMeta(
    status: JobApplicationStatus,
): JobApplicationStatusMeta {
    return jobApplicationStatusMeta[status];
}

type JobApplicationStatusBadgeProps = {
    status: JobApplicationStatus;
    label: string;
};

export function JobApplicationStatusBadge({
    status,
    label,
}: JobApplicationStatusBadgeProps) {
    const meta = getJobApplicationStatusMeta(status);

    return (
        <Badge variant={meta.badgeVariant}>
            <HugeiconsIcon icon={meta.icon} className="size-4" />
            {label}
        </Badge>
    );
}

type JobApplicationStatusSelectOptionsProps = {
    statuses: JobApplicationStatusLabels;
    includeAllOption?: boolean;
    allOptionLabel?: string;
    allOptionValue?: string;
};

export function JobApplicationStatusSelectOptions({
    statuses,
    includeAllOption = false,
    allOptionLabel = 'All statuses',
    allOptionValue = '__all__',
}: JobApplicationStatusSelectOptionsProps) {
    return (
        <SelectGroup>
            {includeAllOption ? (
                <SelectItem value={allOptionValue}>{allOptionLabel}</SelectItem>
            ) : null}

            {Object.entries(statuses).map(([value, label]) => {
                const status = value as JobApplicationStatus;
                const meta = getJobApplicationStatusMeta(status);

                return (
                    <SelectItem key={value} value={value}>
                        <span className="flex items-center gap-2">
                            <span className="size-4 shrink-0">
                                <HugeiconsIcon
                                    icon={meta.icon}
                                    className="size-full"
                                />
                            </span>
                            <span>{label}</span>
                        </span>
                    </SelectItem>
                );
            })}
        </SelectGroup>
    );
}
